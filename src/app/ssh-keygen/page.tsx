"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RelatedTools } from "@/components/related-tools";
import { Key, Copy, Check, Download, RefreshCw, Shield, AlertTriangle } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { sshKeygenGuideContent } from "@/content/ssh-keygen-guide";

type KeyType = "rsa-2048" | "rsa-4096" | "ed25519";

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function formatPEM(b64: string, label: string): string {
  const lines = b64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----`;
}

function encodeSSHString(str: string): Uint8Array {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const buf = new Uint8Array(4 + data.length);
  new DataView(buf.buffer).setUint32(0, data.length);
  buf.set(data, 4);
  return buf;
}

function encodeSSHMPInt(arr: Uint8Array): Uint8Array {
  let start = 0;
  while (start < arr.length - 1 && arr[start] === 0) start++;
  const needsPadding = arr[start] & 0x80;
  const len = arr.length - start + (needsPadding ? 1 : 0);
  const buf = new Uint8Array(4 + len);
  new DataView(buf.buffer).setUint32(0, len);
  if (needsPadding) {
    buf[4] = 0;
    buf.set(arr.subarray(start), 5);
  } else {
    buf.set(arr.subarray(start), 4);
  }
  return buf;
}

function concatArrays(...arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((sum, a) => sum + a.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    result.set(a, offset);
    offset += a.length;
  }
  return result;
}

async function generateRSAKeyPair(bits: number): Promise<{ publicKey: string; privateKey: string; fingerprint: string }> {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: bits,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );

  // Export private key as PKCS8 PEM
  const privDer = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  const privateKey = formatPEM(arrayBufferToBase64(privDer), "PRIVATE KEY");

  // Export public key in OpenSSH format
  const pubJwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const n = new Uint8Array(
    atob(pubJwk.n!.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map((c) => c.charCodeAt(0))
  );
  const e = new Uint8Array(
    atob(pubJwk.e!.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map((c) => c.charCodeAt(0))
  );

  const keyTypeStr = encodeSSHString("ssh-rsa");
  const eEnc = encodeSSHMPInt(e);
  const nEnc = encodeSSHMPInt(n);
  const pubBlob = concatArrays(keyTypeStr, eEnc, nEnc);
  const pubBlobBuffer = pubBlob.buffer.slice(pubBlob.byteOffset, pubBlob.byteOffset + pubBlob.byteLength) as ArrayBuffer;
  const publicKey = `ssh-rsa ${arrayBufferToBase64(pubBlobBuffer)} generated@openkit.tools`;

  // Fingerprint
  const hashBuf = await crypto.subtle.digest("SHA-256", pubBlobBuffer);
  const fingerprint = `SHA256:${arrayBufferToBase64(hashBuf).replace(/=+$/, "")}`;

  return { publicKey, privateKey, fingerprint };
}

async function generateEd25519KeyPair(): Promise<{ publicKey: string; privateKey: string; fingerprint: string }> {
  // Use Web Crypto Ed25519 (available in modern browsers)
  try {
    const keyPair = await crypto.subtle.generateKey(
      { name: "Ed25519" } as EcKeyGenParams,
      true,
      ["sign", "verify"]
    );

    const privRaw = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
    const privateKey = formatPEM(arrayBufferToBase64(privRaw), "PRIVATE KEY");

    const pubRaw = await crypto.subtle.exportKey("raw", keyPair.publicKey);
    const pubBytes = new Uint8Array(pubRaw);

    const keyTypeStr = encodeSSHString("ssh-ed25519");
    const keyLen = new Uint8Array(4);
    new DataView(keyLen.buffer as ArrayBuffer).setUint32(0, pubBytes.length);
    const pubBlob = concatArrays(keyTypeStr, keyLen, pubBytes);
    const pubBlobBuffer = pubBlob.buffer.slice(pubBlob.byteOffset, pubBlob.byteOffset + pubBlob.byteLength) as ArrayBuffer;
    const publicKey = `ssh-ed25519 ${arrayBufferToBase64(pubBlobBuffer)} generated@openkit.tools`;

    const hashBuf = await crypto.subtle.digest("SHA-256", pubBlobBuffer);
    const fingerprint = `SHA256:${arrayBufferToBase64(hashBuf).replace(/=+$/, "")}`;

    return { publicKey, privateKey, fingerprint };
  } catch {
    throw new Error("Ed25519 is not supported in this browser. Try Chrome 113+, Edge 113+, or Firefox 128+.");
  }
}

export default function SSHKeygen() {
  useToolTracker("ssh-keygen", "SSH Key Generator", "devtools");
  const analytics = useAnalytics();
  const { copy: copyPub, isCopied: isPubCopied } = useCopyToClipboard({ duration: 1500 });
  const { copy: copyPriv, isCopied: isPrivCopied } = useCopyToClipboard({ duration: 1500 });
  const { copy: copyFp, isCopied: isFpCopied } = useCopyToClipboard({ duration: 1500 });

  const [keyType, setKeyType] = useState<KeyType>("ed25519");
  const [comment, setComment] = useState("generated@openkit.tools");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateKey = useCallback(async () => {
    setGenerating(true);
    setError("");
    try {
      let result;
      if (keyType === "ed25519") {
        result = await generateEd25519KeyPair();
      } else {
        const bits = keyType === "rsa-4096" ? 4096 : 2048;
        result = await generateRSAKeyPair(bits);
      }

      if (comment && comment !== "generated@openkit.tools") {
        result.publicKey = result.publicKey.replace(/generated@openkit\.tools$/, comment);
      }

      setPublicKey(result.publicKey);
      setPrivateKey(result.privateKey);
      setFingerprint(result.fingerprint);
      analytics.trackToolUsage("ssh-keygen", { action: "generate", keyType });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate key pair");
    } finally {
      setGenerating(false);
    }
  }, [keyType, comment, analytics]);

  const downloadKey = useCallback(
    (content: string, filename: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      analytics.trackToolUsage("ssh-keygen", { action: "download", filename });
    },
    [analytics]
  );

  const guide = sshKeygenGuideContent;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <StructuredData
        type="WebApplication"
        name="SSH Key Generator"
        description="Generate SSH key pairs (RSA 2048/4096, Ed25519) securely in your browser."
        url="https://openkit.tools/ssh-keygen"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-06"
        dateModified={guide.lastUpdated}
        version={guide.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "SSH Key Generator", url: "https://openkit.tools/ssh-keygen" },
        ]}
      />
      <HowToSchema
        name={guide.howToUse.title}
        description="Generate SSH key pairs securely in your browser"
        steps={guide.howToUse.steps}
      />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Key className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">SSH Key Generator</h1>
            <p className="text-muted-foreground">
              Generate RSA & Ed25519 SSH key pairs securely in your browser
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-700 dark:text-green-400 mb-4">
          <Shield className="h-4 w-4 flex-shrink-0" />
          <span>100% client-side — private keys never leave your device</span>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Key Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { value: "ed25519", label: "Ed25519", desc: "Modern, fast" },
                  { value: "rsa-2048", label: "RSA 2048", desc: "Compatible" },
                  { value: "rsa-4096", label: "RSA 4096", desc: "Strong RSA" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setKeyType(opt.value)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    keyType === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs text-muted-foreground">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="comment" className="text-sm font-medium mb-1 block">
              Comment (optional)
            </Label>
            <input
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="user@hostname"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
            />
          </div>

          <Button onClick={generateKey} disabled={generating} className="w-full">
            <RefreshCw className={`h-4 w-4 mr-2 ${generating ? "animate-spin" : ""}`} />
            {generating ? "Generating..." : "Generate Key Pair"}
          </Button>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-700 dark:text-red-400">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {publicKey && (
        <>
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Public Key</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyPub(publicKey)}
                >
                  {isPubCopied ? (
                    <Check className="h-3 w-3 mr-1" />
                  ) : (
                    <Copy className="h-3 w-3 mr-1" />
                  )}
                  {isPubCopied ? "Copied" : "Copy"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    downloadKey(publicKey, `id_${keyType.replace("-", "")}.pub`)
                  }
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={publicKey}
                readOnly
                rows={3}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Add this to <code>~/.ssh/authorized_keys</code> on your server
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Private Key</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyPriv(privateKey)}
                >
                  {isPrivCopied ? (
                    <Check className="h-3 w-3 mr-1" />
                  ) : (
                    <Copy className="h-3 w-3 mr-1" />
                  )}
                  {isPrivCopied ? "Copied" : "Copy"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    downloadKey(privateKey, `id_${keyType.replace("-", "")}`)
                  }
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={privateKey}
                readOnly
                rows={6}
                className="font-mono text-xs"
              />
              <div className="flex items-center gap-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-700 dark:text-yellow-400 mt-2">
                <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                <span>
                  Keep this private! Save to <code>~/.ssh/id_{keyType.replace("-", "")}</code> with{" "}
                  <code>chmod 600</code>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Fingerprint</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyFp(fingerprint)}
              >
                {isFpCopied ? (
                  <Check className="h-3 w-3 mr-1" />
                ) : (
                  <Copy className="h-3 w-3 mr-1" />
                )}
                {isFpCopied ? "Copied" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {fingerprint}
              </code>
            </CardContent>
          </Card>
        </>
      )}

      <GeoContentLayout>
        <GeoSection title={guide.introduction.title}>
          <MarkdownContent content={guide.introduction.content} />
        </GeoSection>

        <QuickStartGuide steps={guide.quickStartSteps} />

        <StatsBar
          stats={[
            { label: "Key Types", value: "3" },
            { label: "Browser-based", value: "100%" },
            { label: "Cost", value: "Free" },
          ]}
        />

        <GeoSection title={guide.howToUse.title}>
          <MarkdownContent content={guide.howToUse.content} />
        </GeoSection>

        <FeatureGrid
          features={[
            { title: "Ed25519 Support", description: "Modern elliptic curve keys — smaller, faster, more secure than RSA" },
            { title: "RSA 2048/4096", description: "Traditional RSA keys for maximum compatibility with older systems" },
            { title: "Client-Side Only", description: "Keys are generated in your browser using Web Crypto API — nothing sent to any server" },
            { title: "OpenSSH Format", description: "Public keys in standard OpenSSH format, ready for authorized_keys" },
            { title: "Download & Copy", description: "One-click download or copy to clipboard for both public and private keys" },
            { title: "SHA-256 Fingerprint", description: "Verify your key identity with standard SHA-256 fingerprint" },
          ]}
        />

        <GeoSection title={guide.security.title}>
          <MarkdownContent content={guide.security.content} />
        </GeoSection>

        <ToolFAQ faqs={guide.faqs} />
        <LastUpdated date={guide.lastUpdated} />
      </GeoContentLayout>

      <RelatedTools currentPath="/ssh-keygen" />
    </main>
  );
}
