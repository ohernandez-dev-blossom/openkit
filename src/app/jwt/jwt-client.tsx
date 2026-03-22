"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { jwtGuideContent } from "@/content/jwt-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";

function decodeJWT(token: string): { header: object | null; payload: object | null; signature: string; error?: string } {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { header: null, payload: null, signature: "", error: "Invalid JWT format. Expected 3 parts separated by dots." };
    }

    const decodeBase64 = (str: string) => {
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
      return JSON.parse(atob(padded));
    };

    const header = decodeBase64(parts[0]);
    const payload = decodeBase64(parts[1]);
    const signature = parts[2];

    return { header, payload, signature };
  } catch {
    return { header: null, payload: null, signature: "", error: "Failed to decode JWT. Check if it's a valid token." };
  }
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function ExpirationStatus({ payload, currentTime }: { payload: Record<string, unknown> | null; currentTime: number }) {
  if (!payload) return null;

  const exp = typeof payload.exp === "number" ? payload.exp : null;

  if (!exp) {
    return (
      <div className="p-4 bg-muted border border-border rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">⚠️ No Expiration</p>
        <p className="text-xs text-muted-foreground mt-1">This token does not have an expiration claim (exp)</p>
      </div>
    );
  }

  const isExpired = exp * 1000 < currentTime;
  
  return (
    <div className={`p-4 border rounded-lg ${
      isExpired 
        ? 'bg-red-500/10 border-red-500/30' 
        : 'bg-green-500/10 border-green-500/30'
    }`}>
      <p className={`text-sm font-medium ${isExpired ? 'text-red-400' : 'text-green-400'}`}>
        {isExpired ? '❌ Expired' : '✅ Valid'}
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        {isExpired ? 'Expired' : 'Expires'} on {formatDate(exp)}
      </p>
    </div>
  );
}

function ClaimsDisplay({ payload }: { payload: Record<string, unknown> | null }) {
  if (!payload) return null;
  
  const exp = typeof payload.exp === "number" ? payload.exp : null;
  const iat = typeof payload.iat === "number" ? payload.iat : null;
  const sub = payload.sub ? String(payload.sub) : null;
  
  if (!exp && !iat && !sub) return null;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {exp && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Expires (exp)</p>
          <p className="text-sm font-medium">{formatDate(exp)}</p>
        </div>
      )}
      {iat && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Issued At (iat)</p>
          <p className="text-sm font-medium">{formatDate(iat)}</p>
        </div>
      )}
      {sub && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Subject (sub)</p>
          <p className="text-sm font-medium font-mono">{sub}</p>
        </div>
      )}
    </div>
  );
}

export default function JWTDecoder() {
  useToolTracker("jwt", "JWT Decoder", "security");
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [token, setToken] = useState("");
  const [currentTime] = useState(() => Date.now());

  const decoded = useMemo(() => decodeJWT(token), [token]);

  // Track JWT decoding
  useEffect(() => {
    if (token && decoded.header && decoded.payload) {
      const payload = decoded.payload as Record<string, unknown>;
      const header = decoded.header as Record<string, unknown>;
      const exp = typeof payload.exp === "number" ? payload.exp : null;
      const isExpired = exp ? exp * 1000 < currentTime : false;
      
      analytics.trackToolUsage('jwt-decoder', {
        action: 'decode',
        algorithm: typeof header.alg === 'string' ? header.alg : 'unknown',
        hasExpiration: !!exp,
        isExpired,
        tokenLength: token.length
      });
    } else if (token && decoded.error) {
      analytics.trackError('jwt-decode-error', {
        tool: 'jwt-decoder',
        errorType: 'invalid-format'
      });
    }
  }, [decoded, token, currentTime, analytics]);

  const sampleTokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkFsaWNlIFNtaXRoIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjEzMjM5MDIyLCJleHAiOjE4MTMyMzkwMjJ9.dGVzdF9zaWduYXR1cmVfaGVyZQ",
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJib2I0NTYiLCJlbWFpbCI6ImJvYkBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxODE2MjM5MDIyfQ.test_signature_384"
  ];
  const sampleToken = sampleTokens[0];

  const randomize = () => {
    const randomToken = sampleTokens[Math.floor(Math.random() * sampleTokens.length)];
    setToken(randomToken);
    analytics.trackToolInteraction('jwt-decoder', 'randomize');
  };

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.sample, randomize, { enabled: true });
  useKeyboardShortcut(SHORTCUTS.clear, () => setToken(""), { enabled: !!token });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              🔓
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold">JWT Decoder</h1>
          </div>
          <button
            onClick={randomize}
            aria-label="Load random sample JWT token"
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Input */}
        <Card className="bg-card border-border mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Paste JWT Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={token}
              onChange={(e) => setToken(e.target.value.trim())}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="h-24 bg-muted border-border font-mono text-sm resize-none"
            />
            <div className="flex gap-3">
              <Button
                onClick={() => setToken(sampleToken)}
                variant="outline"
                className="border-border"
              >
                Load Sample
              </Button>
              <Button
                onClick={() => setToken("")}
                variant="ghost"
                className="text-muted-foreground"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {decoded.error && (
          <div className="p-4 mb-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {decoded.error}
          </div>
        )}

        {decoded.header && decoded.payload && (
          <div className="space-y-6">
            {/* Expiration Status */}
            <ExpirationStatus payload={decoded.payload as Record<string, unknown>} currentTime={currentTime} />

            {/* Header */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base text-blue-400">Header</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copy(JSON.stringify(decoded.header, null, 2))}
                    aria-label="Copy JWT header to clipboard"
                    className="text-xs"
                  >
                    {copiedText === "header" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="p-3 bg-muted rounded-lg overflow-x-auto text-sm font-mono">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              </CardContent>
            </Card>

            {/* Payload */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base text-green-400">Payload</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copy(JSON.stringify(decoded.payload, null, 2))}
                    aria-label="Copy JWT payload to clipboard"
                    className="text-xs"
                  >
                    {copiedText === "payload" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="p-3 bg-muted rounded-lg overflow-x-auto text-sm font-mono">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
                
                {/* Common claims */}
                <ClaimsDisplay payload={decoded.payload as Record<string, unknown>} />
              </CardContent>
            </Card>

            {/* Signature */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base text-red-400">Signature</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copy(decoded.signature)}
                    aria-label="Copy JWT signature to clipboard"
                    className="text-xs"
                  >
                    {copiedText === "signature" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-muted rounded-lg">
                  <code className="text-sm font-mono break-all text-muted-foreground">
                    {decoded.signature}
                  </code>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠️ Signature cannot be verified without the secret key
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8 p-4 bg-card border border-border rounded-lg">
          <h3 className="font-medium mb-2">About JWT Tokens</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong className="text-accent-foreground">Structure:</strong> JWTs have 3 parts: Header, Payload, and Signature, separated by dots.</p>
            <p><strong className="text-accent-foreground">Header:</strong> Contains the algorithm (alg) and token type (typ).</p>
            <p><strong className="text-accent-foreground">Payload:</strong> Contains claims like subject (sub), expiration (exp), and custom data.</p>
            <p><strong className="text-accent-foreground">Security:</strong> Never trust JWT claims without verifying the signature server-side.</p>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/jwt" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={jwtGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is JWT Decoder Section */}
          <GeoSection
            id="what-is-jwt"
            title={jwtGuideContent.introduction.title}
            subtitle="Understanding JWT tokens for developers"
            variant="default"
          >
            <MarkdownContent content={jwtGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use JWT decoders daily"
            variant="default"
          >
            <FeatureGrid
              features={jwtGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={jwtGuideContent.howToUse.title}
            subtitle="Master JWT decoding and analysis"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${jwtGuideContent.toolName}`}
              description="Step-by-step guide to JWT decoding"
              steps={jwtGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${jwtGuideContent.toolPath}`}
            />
            <MarkdownContent content={jwtGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about JWT tokens"
            variant="default"
          >
            <ToolFAQ faqs={jwtGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={jwtGuideContent.security.title}
            subtitle="Your JWT data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={jwtGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {jwtGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(jwtGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={jwtGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Decode JWT tokens instantly. All processing happens in your browser.</p>
          <p className="mt-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JWT Decoder | OpenKit.tools"
        description="Decode and inspect JWT (JSON Web Token) headers, payloads, and signatures. Verify expiration and validate token claims instantly."
        url="https://openkit.tools/jwt"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={jwtGuideContent.lastUpdated}
        version={jwtGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "1800",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://openkit.tools' },
          { name: 'JWT Decoder', url: 'https://openkit.tools/jwt' },
        ]}
      />
    </main>
  );
}
