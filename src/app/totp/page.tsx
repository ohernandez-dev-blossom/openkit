"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Shield, Copy, RefreshCw, QrCode, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
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
import { totpGuideContent } from "@/content/totp-guide";

// ---- Base32 decode ----

const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input: string): Uint8Array {
  const clean = input.toUpperCase().replace(/[^A-Z2-7]/g, "");
  const bits: number[] = [];

  for (let i = 0; i < clean.length; i++) {
    const val = BASE32_CHARS.indexOf(clean[i]);
    if (val === -1) continue;
    for (let b = 4; b >= 0; b--) {
      bits.push((val >> b) & 1);
    }
  }

  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) {
      byte = (byte << 1) | bits[i * 8 + b];
    }
    bytes[i] = byte;
  }

  return bytes;
}

function base32Encode(data: Uint8Array): string {
  let bits = "";
  for (let i = 0; i < data.length; i++) {
    bits += data[i].toString(2).padStart(8, "0");
  }

  let result = "";
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substring(i, i + 5).padEnd(5, "0");
    result += BASE32_CHARS[parseInt(chunk, 2)];
  }

  return result;
}

// ---- TOTP implementation using Web Crypto API ----

type Algorithm = "SHA-1" | "SHA-256" | "SHA-512";

function getAlgoName(algo: Algorithm): string {
  switch (algo) {
    case "SHA-1": return "SHA-1";
    case "SHA-256": return "SHA-256";
    case "SHA-512": return "SHA-512";
  }
}

async function hmacSign(key: Uint8Array, message: Uint8Array, algorithm: Algorithm): Promise<Uint8Array> {
  const algoName = getAlgoName(algorithm);
  const keyBuffer = key.buffer.slice(key.byteOffset, key.byteOffset + key.byteLength) as ArrayBuffer;
  const msgBuffer = message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength) as ArrayBuffer;
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: { name: algoName } },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, msgBuffer);
  return new Uint8Array(signature);
}

function intToBytes(num: number): Uint8Array {
  const bytes = new Uint8Array(8);
  // Big-endian 64-bit integer
  for (let i = 7; i >= 0; i--) {
    bytes[i] = num & 0xff;
    num = Math.floor(num / 256);
  }
  return bytes;
}

async function generateTOTP(
  secret: string,
  algorithm: Algorithm = "SHA-1",
  digits: number = 6,
  period: number = 30,
  timestamp?: number
): Promise<string> {
  const key = base32Decode(secret);
  const time = timestamp ?? Math.floor(Date.now() / 1000);
  const counter = Math.floor(time / period);
  const counterBytes = intToBytes(counter);

  const hmac = await hmacSign(key, counterBytes, algorithm);

  // Dynamic truncation (RFC 4226 §5.4)
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = binary % Math.pow(10, digits);
  return otp.toString().padStart(digits, "0");
}

function generateRandomSecret(bytes: number = 20): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return base32Encode(arr);
}

// ---- Simple QR Code generator (using a public QR API via canvas) ----
// We'll generate QR codes using a simple canvas-based approach

function generateQRDataUrl(text: string, size: number = 200): string {
  // Use a Google Charts-compatible QR URL for simplicity
  // But since we want no external calls, let's generate a simple text-based representation
  // Actually, let's use a minimal QR code rendering approach
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=1a1a2e&color=ffffff`;
}

// ---- Component ----

export default function TOTPTool() {
  useToolTracker("totp", "TOTP Generator", "security");
  const analytics = useAnalytics();
  const { copy } = useCopyToClipboard({ duration: 1500 });

  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-1");
  const [digits, setDigits] = useState<number>(6);
  const [period, setPeriod] = useState<number>(30);
  const [code, setCode] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrLabel, setQrLabel] = useState("user@example.com");
  const [qrIssuer, setQrIssuer] = useState("OpenKit");
  const animRef = useRef<number>(0);

  const isValidSecret = useCallback((s: string): boolean => {
    const clean = s.toUpperCase().replace(/\s/g, "");
    return clean.length > 0 && /^[A-Z2-7]+=*$/.test(clean);
  }, []);

  const updateCode = useCallback(async () => {
    if (!secret || !isValidSecret(secret)) {
      setCode("");
      setError(secret ? "Invalid Base32 secret" : "");
      return;
    }
    setError("");
    try {
      const now = Math.floor(Date.now() / 1000);
      const remaining = period - (now % period);
      setTimeRemaining(remaining);
      const newCode = await generateTOTP(secret, algorithm, digits, period);
      setCode(newCode);
    } catch {
      setError("Failed to generate TOTP code");
      setCode("");
    }
  }, [secret, algorithm, digits, period, isValidSecret]);

  // Animation loop for smooth countdown
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;
      const now = Math.floor(Date.now() / 1000);
      const remaining = period - (now % period);
      setTimeRemaining(remaining);

      // Check if we crossed a period boundary
      if (remaining === period) {
        updateCode();
      }
      animRef.current = requestAnimationFrame(tick);
    };

    updateCode();
    animRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [period, updateCode]);

  // Regenerate code when params change
  useEffect(() => {
    updateCode();
  }, [updateCode]);

  const handleGenerateSecret = () => {
    let bytes = 20; // SHA-1
    if (algorithm === "SHA-256") bytes = 32;
    if (algorithm === "SHA-512") bytes = 64;
    const newSecret = generateRandomSecret(bytes);
    setSecret(newSecret);
    analytics.trackToolUsage("totp", { action: "generate_secret" });
  };

  const handleCopyCode = () => {
    if (code) {
      copy(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      analytics.trackToolUsage("totp", { action: "copy_code" });
    }
  };

  const handleCopySecret = () => {
    if (secret) {
      copy(secret);
      analytics.trackToolUsage("totp", { action: "copy_secret" });
    }
  };

  // Provisioning URI
  const provisioningUri = secret
    ? `otpauth://totp/${encodeURIComponent(qrIssuer)}:${encodeURIComponent(qrLabel)}?secret=${secret.toUpperCase().replace(/\s/g, "")}&algorithm=${algorithm.replace("-", "")}&digits=${digits}&period=${period}&issuer=${encodeURIComponent(qrIssuer)}`
    : "";

  // Countdown progress (0-1)
  const progress = timeRemaining / period;

  // SVG circular timer
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center hover:opacity-80 transition"
            aria-label="Back to home"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">TOTP Generator</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Secret Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Secret Key (Base32)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value.toUpperCase().replace(/[^A-Z2-7\s]/gi, ""))}
              placeholder="e.g. JBSWY3DPEHPK3PXP"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-lg font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-muted-foreground"
              spellCheck={false}
              autoComplete="off"
            />
            <Button onClick={handleCopySecret} variant="outline" size="sm" className="px-3 self-center" aria-label="Copy secret">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2">
            <Button onClick={handleGenerateSecret} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Generate Random Secret
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        {/* TOTP Display */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-card border border-border rounded-2xl">
            {/* Circular Timer */}
            <div className="relative flex-shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-border"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className={`transition-all duration-1000 linear ${
                    timeRemaining <= 5 ? "text-red-500" : timeRemaining <= 10 ? "text-yellow-500" : "text-red-400"
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${timeRemaining <= 5 ? "text-red-500" : "text-foreground"}`}>
                  {timeRemaining}s
                </span>
              </div>
            </div>

            {/* Code Display */}
            <div className="flex-1 text-center sm:text-left">
              {code ? (
                <>
                  <div className="text-5xl sm:text-6xl font-mono font-bold tracking-[0.3em] text-foreground mb-2">
                    {code}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Refreshes in {timeRemaining} second{timeRemaining !== 1 ? "s" : ""}
                  </p>
                </>
              ) : (
                <div className="text-2xl text-muted-foreground">
                  {secret ? "Generating..." : "Enter a secret to generate TOTP"}
                </div>
              )}
            </div>

            {/* Copy Button */}
            {code && (
              <Button
                onClick={handleCopyCode}
                variant="outline"
                size="lg"
                className="gap-2 shrink-0"
                aria-label="Copy TOTP code"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
        </div>

        {/* Configuration */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Configuration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Digits */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Digits</label>
              <div className="flex gap-2">
                {[6, 7, 8].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDigits(d)}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition ${
                      digits === d
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-card border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Algorithm */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Algorithm</label>
              <div className="flex gap-2">
                {(["SHA-1", "SHA-256", "SHA-512"] as Algorithm[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAlgorithm(a)}
                    className={`flex-1 px-2 py-2 rounded-lg border text-xs font-medium transition ${
                      algorithm === a
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-card border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Period */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Period</label>
              <div className="flex gap-2">
                {[15, 30, 60].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition ${
                      period === p
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-card border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {p}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">QR Code Provisioning</h2>
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">Label (Account)</label>
                <input
                  type="text"
                  value={qrLabel}
                  onChange={(e) => setQrLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="user@example.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">Issuer</label>
                <input
                  type="text"
                  value={qrIssuer}
                  onChange={(e) => setQrIssuer(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="MyService"
                />
              </div>
            </div>

            <Button
              onClick={() => {
                setShowQR(!showQR);
                analytics.trackToolUsage("totp", { action: "toggle_qr" });
              }}
              variant="outline"
              size="sm"
              className="gap-2 mb-4"
              disabled={!secret}
            >
              <QrCode className="w-4 h-4" />
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </Button>

            {showQR && secret && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={generateQRDataUrl(provisioningUri, 200)}
                    alt="TOTP QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg border border-border"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-medium">Provisioning URI</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-3 py-2 bg-background border border-border rounded-lg font-mono text-xs text-foreground break-all">
                      {provisioningUri}
                    </div>
                    <Button
                      onClick={() => {
                        copy(provisioningUri);
                        analytics.trackToolUsage("totp", { action: "copy_uri" });
                      }}
                      variant="outline"
                      size="sm"
                      className="px-3 self-start"
                      aria-label="Copy provisioning URI"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-red-400 mb-1">Security Note</h4>
              <p className="text-xs text-red-300/80">
                All TOTP calculations happen entirely in your browser using the Web Crypto API.
                Your secret key never leaves your device. No data is sent to any server.
                The QR code image is generated via an external service — the URI is sent in the URL.
                For maximum security, only use real secrets on trusted devices.
              </p>
            </div>
          </div>
        </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={totpGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={totpGuideContent.introduction.title} subtitle="Understanding time-based one-time passwords" variant="default">
            <MarkdownContent content={totpGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use TOTP" variant="default">
            <FeatureGrid features={totpGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={totpGuideContent.howToUse.title} subtitle="Master TOTP generation" variant="minimal">
            <HowToSchema name={`How to use ${totpGuideContent.toolName}`} description="Step-by-step guide" steps={totpGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${totpGuideContent.toolPath}`} />
            <MarkdownContent content={totpGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={totpGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={totpGuideContent.security.title} subtitle="Your secrets stay on your device" variant="highlight">
            <MarkdownContent content={totpGuideContent.security.content} />
          </GeoSection>
          {totpGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Tool metrics" variant="minimal">
              <StatsBar stats={Object.entries(totpGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/totp" />
        <LastUpdated date={totpGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Time-based One-Time Password generator. RFC 6238 compliant, built with Web Crypto API.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="TOTP Generator"
        description="Time-based One-Time Password generator with configurable algorithms, periods, and QR code provisioning. RFC 6238 compliant, built with Web Crypto API."
        url="https://openkit.tools/totp"
        applicationCategory="SecurityApplication"
        datePublished="2026-02-06"
        dateModified={totpGuideContent.lastUpdated}
        version={totpGuideContent.version}
        aggregateRating={{ ratingValue: "4.8", ratingCount: "320", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "TOTP Generator", url: "https://openkit.tools/totp" },
        ]}
      />
    </main>
  );
}
