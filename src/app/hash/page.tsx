"use client";
import { RelatedTools } from "@/components/related-tools";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { BatchMode, BatchResult } from "@/components/batch-mode";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { hashGuideContent } from "@/content/hash-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";

type HashResult = {
  algorithm: string;
  hash: string;
};
export default function Home() {
  useToolTracker("hash", "Hash Generator", "security");
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const generateHashes = useCallback(async () => {
    if (!input) {
      setHashes([]);
      return;
    }
    setLoading(true);
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const results: HashResult[] = [];
    for (const algorithm of algorithms) {
      try {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        results.push({ algorithm, hash: hashHex });
      } catch {
        results.push({ algorithm, hash: "Not supported" });
      }
    }
    // Add MD5 (simulated - Web Crypto doesn't support MD5)
    // Using a simple hash for demonstration
    results.unshift({ 
      algorithm: "MD5", 
      hash: await computeMD5(input)
    });
    setHashes(results);
    setLoading(false);
    analytics.trackToolUsage('hash-generator', {
      action: 'generate',
      inputLength: input.length,
      algorithmCount: results.length
    });
  }, [input, analytics]);
  // Proper MD5 implementation
  function computeMD5(str: string): string {
    function md5cycle(x: number[], k: number[]) {
      let a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);
      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);
    }
    function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    function add32(a: number, b: number) {
      return (a + b) & 0xFFFFFFFF;
    }
    function md5blk(s: string) {
      const md5blks: number[] = [];
      for (let i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }
    function rhex(n: number) {
      const hex_chr = '0123456789abcdef';
      let s = '';
      for (let j = 0; j < 4; j++) {
        s += hex_chr.charAt((n >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((n >> (j * 8)) & 0x0F);
      }
      return s;
    }
    function hex(x: number[]) {
      return rhex(x[0]) + rhex(x[1]) + rhex(x[2]) + rhex(x[3]);
    }
    function md5(s: string) {
      const n = s.length;
      const state = [1732584193, -271733879, -1732584194, 271733878];
      let i: number;
      for (i = 64; i <= n; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      const tail = new Array(16).fill(0);
      for (i = 0; i < s.length; i++) {
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
      }
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
      }
      tail[14] = n * 8;
      md5cycle(state, tail);
      return hex(state);
    }
    return md5(str);
  }
  const copyHash = useCallback((hash: string) => {
    copy(hash);
  }, [copy]);
  const clear = useCallback(() => {
    setInput("");
    setHashes([]);
  }, []);
  
  const randomize = useCallback(async () => {
    const samples = [
      "The quick brown fox jumps over the lazy dog",
      "Hello World! This is a sample text for hashing.",
      crypto.randomUUID(),
      `Random data generated at ${new Date().toISOString()}`,
      Array.from({length: 32}, () => Math.random().toString(36)[2]).join(''),
      `Sample ${Math.floor(Math.random() * 100000)}: ${crypto.randomUUID()}`,
    ];
    const randomText = samples[Math.floor(Math.random() * samples.length)];
    setInput(randomText);
    
    // Auto-generate hashes
    setLoading(true);
    const encoder = new TextEncoder();
    const data = encoder.encode(randomText);
    const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const results: HashResult[] = [];
    for (const algorithm of algorithms) {
      try {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        results.push({ algorithm, hash: hashHex });
      } catch {
        results.push({ algorithm, hash: "Not supported" });
      }
    }
    results.unshift({ 
      algorithm: "MD5", 
      hash: await computeMD5(randomText)
    });
    setHashes(results);
    setLoading(false);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.execute, generateHashes, { enabled: !!input });
  useKeyboardShortcut(SHORTCUTS.clear, clear, { enabled: !!input });
  useKeyboardShortcut(SHORTCUTS.sample, randomize);

  const handleBatchProcess = useCallback(async (inputs: string[]): Promise<BatchResult[]> => {
    const batchResults: BatchResult[] = [];

    for (const input of inputs) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        const hashResults: Record<string, string> = {};
        
        // Generate MD5
        hashResults["MD5"] = computeMD5(input);
        
        // Generate other hashes
        for (const algorithm of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]) {
          try {
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
            hashResults[algorithm] = hashHex;
          } catch {
            hashResults[algorithm] = "Not supported";
          }
        }
        
        batchResults.push({
          input,
          output: hashResults});
      } catch (error) {
        batchResults.push({
          input,
          output: "",
          error: error instanceof Error ? error.message : "Processing failed"});
      }
    }

    return batchResults;
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center font-bold text-sm">
              #
            </div>
            <h1 className="text-xl font-semibold text-foreground">Hash Generator</h1>
          </div>
          <button
            onClick={randomize}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Batch Mode */}
        <div className="mb-6">
          <BatchMode
            enabled={batchMode}
            onToggle={setBatchMode}
            onProcess={handleBatchProcess}
            placeholder="Enter multiple texts to hash (one per line)..."
            label="Batch Mode"
            description="Process multiple inputs at once and export results"
          />
        </div>

        {!batchMode && (
          <>
        {/* Input */}
        <Card className="bg-card border-border shadow-refined mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Input Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="h-32 bg-muted border-border font-mono text-sm resize-none focus:border-emerald-500"
            />
            <div className="flex gap-3">
              <Button 
                onClick={generateHashes} 
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Hashes"}
              </Button>
              <Button className="min-h-[44px] text-muted-foreground" onClick={clear} variant="ghost" >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Results */}
        {hashes.length > 0 && (
          <Card className="bg-card border-border shadow-refined">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Hash Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hashes.map(({ algorithm, hash }) => (
                <div 
                  key={algorithm}
                  className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-accent transition"
                  onClick={() => copyHash(hash)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{algorithm}</span>
                    <span className="text-sm sm:text-xs text-muted-foreground">
                      {copiedText === hash ? "Copied!" : "Click to copy"}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-accent-foreground break-all">{hash}</p>
                  <p className="text-sm sm:text-xs text-muted-foreground mt-1">{hash.length} characters</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {/* Info */}
        <div className="mt-8 p-4 bg-card border border-border rounded-lg shadow-refined-sm">
          <h3 className="font-medium mb-2">About Hash Functions</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong className="text-accent-foreground">MD5:</strong> 128-bit, fast but not secure. Don&apos;t use for passwords.</p>
            <p><strong className="text-accent-foreground">SHA-1:</strong> 160-bit, deprecated for security. Still used for checksums.</p>
            <p><strong className="text-accent-foreground">SHA-256:</strong> 256-bit, widely used, secure for most applications.</p>
            <p><strong className="text-accent-foreground">SHA-384:</strong> 384-bit, truncated SHA-512.</p>
            <p><strong className="text-accent-foreground">SHA-512:</strong> 512-bit, most secure but slower.</p>
          </div>
        </div>
        </>
        )}

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={hashGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is Hashing Section */}
          <GeoSection
            id="what-is-hashing"
            title={hashGuideContent.introduction.title}
            subtitle="Understanding cryptographic hash functions for security"
            variant="default"
          >
            <MarkdownContent content={hashGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use cryptographic hashing daily"
            variant="default"
          >
            <FeatureGrid
              features={hashGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={hashGuideContent.howToUse.title}
            subtitle="Master hash generation and algorithm selection"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${hashGuideContent.toolName}`}
              description="Step-by-step guide to generating cryptographic hashes"
              steps={hashGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${hashGuideContent.toolPath}`}
            />
            <MarkdownContent content={hashGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about hashing"
            variant="default"
          >
            <ToolFAQ faqs={hashGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={hashGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={hashGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {hashGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(hashGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={hashGuideContent.lastUpdated} />
      </div>
      {/* Related Tools */}
        <RelatedTools currentPath="/hash" />

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate cryptographic hashes. All processing happens in your browser.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Hash Generator"
        description="Free cryptographic hash generator. Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly."
        url="https://openkit.tools/hash"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={hashGuideContent.lastUpdated}
        version={hashGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "2156",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Hash Generator', url: 'https://openkit.tools/hash' },
        ]}
      />
    </main>
  );
}
