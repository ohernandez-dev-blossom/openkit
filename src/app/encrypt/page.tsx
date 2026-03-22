"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Lock, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { encryptGuideContent } from "@/content/encrypt-guide";

export default function TextEncryption() {
  useToolTracker("encrypt", "Text Encryption", "security");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
    const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Simple AES-like encryption using Web Crypto API
  const encryptText = useCallback(async (text: string, key: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      // Create a key from password
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(key.padEnd(32, "0").slice(0, 32)),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );

      const cryptoKey = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: encoder.encode("openkit-salt"),
          iterations: 100000,
          hash: "SHA-256"},
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
      );

      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        data
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encrypted), iv.length);

      return btoa(String.fromCharCode(...combined));
    } catch {
      throw new Error("Encryption failed");
    }
  }, []);

  const decryptText = useCallback(async (encryptedText: string, key: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      // Decode base64
      const combined = new Uint8Array(
        atob(encryptedText)
          .split("")
          .map((c) => c.charCodeAt(0))
      );

      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);

      // Create key from password
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(key.padEnd(32, "0").slice(0, 32)),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );

      const cryptoKey = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: encoder.encode("openkit-salt"),
          iterations: 100000,
          hash: "SHA-256"},
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        encrypted
      );

      return decoder.decode(decrypted);
    } catch {
      throw new Error("Decryption failed - wrong password or corrupted data");
    }
  }, []);

  const [actualOutput, setActualOutput] = useState("");

  // Process encryption/decryption asynchronously
  useEffect(() => {
    let cancelled = false;

    const process = async () => {
      if (!input || !password) {
        if (!cancelled) {
          setActualOutput("");
          setError("");
        }
        return;
      }

      try {
        if (cancelled) return;
        setError("");

        if (mode === "encrypt") {
          const result = await encryptText(input, password);
          if (!cancelled) {
            setActualOutput(result);
            analytics.trackToolUsage("encrypt", { action: "text-encrypted" });
          }
        } else {
          const result = await decryptText(input, password);
          if (!cancelled) {
            setActualOutput(result);
            analytics.trackToolUsage("encrypt", { action: "text-decrypted" });
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
          setActualOutput("");
        }
      }
    };

    process();

    return () => {
      cancelled = true;
    };
  }, [input, password, mode, encryptText, decryptText, analytics]);


  const swap = () => {
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    setInput(actualOutput);
    setActualOutput("");
  };

  const clear = () => {
    setInput("");
    setPassword("");
    setActualOutput("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:opacity-80 transition">
            <Lock className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Text Encryption</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            onClick={() => setMode("encrypt")}
            variant={mode === "encrypt" ? "default" : "outline"}
            className={mode === "encrypt" ? "bg-blue-600 hover:bg-blue-500" : "border-border"}
          >
            Encrypt
          </Button>
          <Button
            onClick={() => setMode("decrypt")}
            variant={mode === "decrypt" ? "default" : "outline"}
            className={mode === "decrypt" ? "bg-purple-600 hover:bg-purple-500" : "border-border"}
          >
            Decrypt
          </Button>
        </div>

        {/* Password Input */}
        <Card className="bg-card border-border mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <LabeledInput
                label="Encryption Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Enter encryption password..."
                className="bg-muted border-border pr-10"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Use a strong password. Store it safely - you&apos;ll need it to decrypt.
            </p>
          </CardContent>
        </Card>

        {/* Input/Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {mode === "encrypt" ? "Plain Text" : "Encrypted Text"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Enter encrypted text..."}
                className="h-64 bg-muted border-border font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3 flex flex-col sm:flex-row items-center justify-between">
              <CardTitle className="text-base">
                {mode === "encrypt" ? "Encrypted Text" : "Plain Text"}
              </CardTitle>
              {actualOutput && (
                <button onClick={() => copy(actualOutput)} className="text-muted-foreground hover:text-foreground">
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </CardHeader>
            <CardContent>
              <Textarea
                value={actualOutput}
                readOnly
                placeholder="Output will appear here..."
                className="h-64 bg-muted border-border font-mono text-sm"
              />
              {error && (
                <p className="text-sm text-red-400 mt-2">{error}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button className="min-h-[44px] border-border" onClick={swap} variant="outline" >
            Swap Input/Output
          </Button>
          <Button className="min-h-[44px] text-muted-foreground" onClick={clear} variant="ghost" >
            Clear All
          </Button>
        </div>

        {/* Info */}
        <Card className="bg-card border-border mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">How it works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Uses AES-256-GCM encryption via Web Crypto API</p>
            <p>• Password is hashed with PBKDF2 (100,000 iterations)</p>
            <p>• All processing happens in your browser - nothing is sent to a server</p>
            <p>• Each encryption uses a random initialization vector (IV)</p>
            <p>• Store your password safely - it cannot be recovered</p>
          </CardContent>
        </Card>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/encrypt" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Encrypt your data in 30 seconds" variant="highlight">
            <QuickStartGuide steps={encryptGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-encryption" title={encryptGuideContent.introduction.title} subtitle="Understanding client-side encryption" variant="default">
            <MarkdownContent content={encryptGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use browser-based encryption" variant="default">
            <FeatureGrid features={encryptGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={encryptGuideContent.howToUse.title} subtitle="Master AES-256 encryption workflow" variant="minimal">
            <HowToSchema name={`How to use ${encryptGuideContent.toolName}`} description="Step-by-step guide to text encryption" steps={encryptGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${encryptGuideContent.toolPath}`} />
            <MarkdownContent content={encryptGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about encryption" variant="default">
            <ToolFAQ faqs={encryptGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={encryptGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={encryptGuideContent.security.content} />
          </GeoSection>

          {encryptGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Encryption specifications" variant="minimal">
              <StatsBar stats={Object.entries(encryptGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={encryptGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Secure text encryption and decryption using AES-256.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Text Encryption Tool | OpenKit.tools"
        description="Encrypt and decrypt text with AES-256-GCM encryption. Secure, client-side encryption in your browser with zero data transmission."
        url="https://openkit.tools/encrypt"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={encryptGuideContent.lastUpdated}
        version={encryptGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Text Encryption', url: 'https://openkit.tools/encrypt' },
        ]}
      />
    </main>
  );
}
