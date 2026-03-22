"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCcw, Shield, Key } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid } from "@/components/geo-content-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HMAC_ALGORITHMS = [
  { value: "SHA-256", label: "SHA-256 (Recommended)", description: "Industry standard for API authentication" },
  { value: "SHA-512", label: "SHA-512 (High Security)", description: "Maximum security, larger output" },
  { value: "SHA-1", label: "SHA-1 (Legacy)", description: "Legacy compatibility only" },
  { value: "MD5", label: "MD5 (Legacy)", description: "Not recommended for security" },
] as const;

const OUTPUT_FORMATS = [
  { value: "hex", label: "Hexadecimal" },
  { value: "base64", label: "Base64" },
] as const;

async function generateHmac(
  message: string,
  secret: string,
  algorithm: string
): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"]
  );

  return crypto.subtle.sign("HMAC", cryptoKey, messageData);
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function HmacTool() {
  useToolTracker("hmac", "HMAC Generator", "generators");
  const { isCopied, copy } = useCopyToClipboard({ duration: 2000 });
  const analytics = useAnalytics();

  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<string>("SHA-256");
  const [outputFormat, setOutputFormat] = useState<string>("hex");
  const [result, setResult] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!message || !secret) {
      return;
    }

    setIsGenerating(true);
    try {
      const hmacBuffer = await generateHmac(message, secret, algorithm);
      const output = outputFormat === "hex" 
        ? bufferToHex(hmacBuffer) 
        : bufferToBase64(hmacBuffer);
      setResult(output);
      analytics.trackToolUsage("hmac", { action: "generate", algorithm, format: outputFormat });
    } catch {
      setResult("Error: Failed to generate HMAC");
    } finally {
      setIsGenerating(false);
    }
  }, [message, secret, algorithm, outputFormat, analytics]);

  const handleCopy = () => {
    if (result && !result.startsWith("Error")) {
      copy(result);
    }
  };

  const handleClear = () => {
    setMessage("");
    setSecret("");
    setResult("");
    analytics.trackToolInteraction("hmac", "clear", {});
  };

  useKeyboardShortcut(
    { key: "Enter", ctrl: true, meta: true, description: "Generate HMAC" },
    handleGenerate,
    { enabled: !!message && !!secret && !isGenerating }
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData 
        type="WebApplication" 
        name="HMAC Generator" 
        description="Generate HMAC (Hash-based Message Authentication Code) signatures with MD5, SHA1, SHA256, and SHA512. Test API authentication and secure message signing."
        applicationCategory="DeveloperApplication"
        url="https://openkit.tools/hmac"
      />
      <BreadcrumbStructuredData items={[
        { name: "Home", url: "/" },
        { name: "HMAC Generator", url: "/hmac" }
      ]} />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">HMAC Generator</h1>
          </div>
          <LastUpdated date="2026-02-05" />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <QuickStartGuide
          steps={[
            { icon: "edit", title: "Enter Message", description: "Type the message to sign" },
            { icon: "key", title: "Add Secret", description: "Enter your secret key" },
            { icon: "copy", title: "Get HMAC", description: "Copy the generated signature" },
          ]}
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5" />
              Generate HMAC Signature
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Enter message to sign..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Secret Key</label>
                <Textarea
                  placeholder="Enter secret key..."
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="min-h-[120px] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Algorithm</label>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HMAC_ALGORITHMS.map((algo) => (
                      <SelectItem key={algo.value} value={algo.value}>
                        <div className="flex flex-col">
                          <span>{algo.label}</span>
                          <span className="text-xs text-muted-foreground">{algo.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Output Format</label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OUTPUT_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !message || !secret}
                className="flex-1"
              >
                <Shield className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate HMAC"}
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={!message && !secret}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>

            {result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">HMAC Result</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    disabled={result.startsWith("Error")}
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <Textarea
                  value={result}
                  readOnly
                  className={`font-mono text-xs min-h-[80px] ${result.startsWith("Error") ? "border-red-500" : "bg-muted"}`}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <RelatedTools currentPath="/hmac" maxVisible={8} />
      </section>

      <GeoContentLayout>
        <GeoSection title="What is HMAC?">
          <MarkdownContent content={`HMAC (Hash-based Message Authentication Code) is a specific construction for creating a message authentication code (MAC) involving a cryptographic hash function and a secret key. It provides both data integrity and authenticity, allowing you to verify that a message comes from a trusted sender and hasn't been tampered with.`} />
        </GeoSection>

        <GeoSection title="How to Use">
          <FeatureGrid features={[
            { title: "1. Enter Message", description: "Type or paste the message you want to sign" },
            { title: "2. Enter Secret", description: "Input your secret key (keep this secure!)" },
            { title: "3. Select Algorithm", description: "Choose SHA-256 for most applications" },
            { title: "4. Generate", description: "Copy the HMAC signature for your API request" },
          ]} />
        </GeoSection>

        <GeoSection title="Common Use Cases">
          <MarkdownContent content={`- **API Authentication**: Sign API requests to verify sender identity
- **Webhook Verification**: Validate incoming webhooks from services like Stripe, GitHub
- **Token Signing**: Create signed tokens for stateless authentication
- **Message Integrity**: Ensure messages haven't been modified in transit`} />
        </GeoSection>

        <HowToSchema
          name="How to Generate HMAC Signatures"
          description="Generate secure HMAC signatures for API authentication"
          steps={[
            { name: "Enter message", text: "Type or paste the message you want to sign" },
            { name: "Enter secret key", text: "Input your secret key" },
            { name: "Choose algorithm", text: "Select SHA-256 for most use cases" },
            { name: "Generate HMAC", text: "Click the button to generate your signature" },
          ]}
        />

        <LastUpdated date="2026-02-05" />
      </GeoContentLayout>
    </main>
  );
}
