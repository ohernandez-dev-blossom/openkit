"use client";

import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { KeyboardHint } from "@/components/keyboard-hint";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { BatchMode, BatchResult } from "@/components/batch-mode";
import { ShareButton } from "@/components/share-button";
import { useSharedData } from "@/hooks/use-shared-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { base64GuideContent } from "@/content/base64-guide";
import { useAnalytics } from "@/hooks/use-analytics";

type EncoderType = "base64" | "url" | "html";

const encoders: Record<EncoderType, { encode: (s: string) => string; decode: (s: string) => string; name: string; description: string }> = {
  base64: {
    name: "Base64",
    description: "Encode/decode Base64 strings",
    encode: (s: string) => {
      try {
        return btoa(unescape(encodeURIComponent(s)));
      } catch {
        return "Error: Invalid input for Base64 encoding";
      }
    },
    decode: (s: string) => {
      try {
        return decodeURIComponent(escape(atob(s)));
      } catch {
        return "Error: Invalid Base64 string";
      }
    },
  },
  url: {
    name: "URL",
    description: "Encode/decode URL components",
    encode: (s: string) => encodeURIComponent(s),
    decode: (s: string) => {
      try {
        return decodeURIComponent(s);
      } catch {
        return "Error: Invalid URL encoded string";
      }
    },
  },
  html: {
    name: "HTML",
    description: "Encode/decode HTML entities",
    encode: (s: string) => {
      const el = document.createElement("div");
      el.innerText = s;
      return el.innerHTML;
    },
    decode: (s: string) => {
      const el = document.createElement("div");
      el.innerHTML = s;
      return el.innerText;
    },
  },
};

export default function Home() {
    // Track tool usage for recent tools feature
  useToolTracker("base64", "Base64", "encoders");
  const analytics = useAnalytics();

  // Load shared data from URL
  const sharedData = useSharedData();

  // Initialize state with shared data if available
  const [encoderType, setEncoderType] = useState<EncoderType>(() => {
    if (sharedData && sharedData.tool === "base64") {
      const data = sharedData.data as { encoderType?: EncoderType };
      return data.encoderType || "base64";
    }
    return "base64";
  });

  const [input, setInput] = useState(() => {
    if (sharedData && sharedData.tool === "base64") {
      const data = sharedData.data as { input?: string };
      return data.input || "";
    }
    return "";
  });

  const [output, setOutput] = useState(() => {
    if (sharedData && sharedData.tool === "base64") {
      const data = sharedData.data as { output?: string };
      return data.output || "";
    }
    return "";
  });

  const [mode, setMode] = useState<"encode" | "decode">(() => {
    if (sharedData && sharedData.tool === "base64") {
      const data = sharedData.data as { mode?: "encode" | "decode" };
      return data.mode || "encode";
    }
    return "encode";
  });

  const [batchMode, setBatchMode] = useState(false);

  const encoder = encoders[encoderType];

  const doEncode = useCallback(() => {
    setMode("encode");
    const encoded = encoder.encode(input);
    setOutput(encoded);
    analytics.trackToolUsage('base64-encoder', {
      action: 'encode',
      encoderType,
      inputLength: input.length
    });
  }, [input, encoder, encoderType, analytics]);

  const doDecode = useCallback(() => {
    setMode("decode");
    const decoded = encoder.decode(input);
    setOutput(decoded);
    analytics.trackToolUsage('base64-encoder', {
      action: 'decode',
      encoderType,
      inputLength: input.length
    });
  }, [input, encoder, encoderType, analytics]);

  const swap = useCallback(() => {
    setInput(output);
    setOutput(input);
    setMode(mode === "encode" ? "decode" : "encode");
  }, [input, output, mode]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(output);
  }, [output]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.execute, mode === "encode" ? doEncode : doDecode, { enabled: !!input });
  useKeyboardShortcut(SHORTCUTS.swap, swap, { enabled: !!output });
  useKeyboardShortcut(SHORTCUTS.clear, clear);
  useKeyboardShortcut(SHORTCUTS.copy, copyOutput, { enabled: !!output });
  
  const randomize = () => {
    const samples = [
      "Hello World!",
      crypto.randomUUID(),
      `Random data: ${Math.random().toString(36).substring(2)}`,
      "The quick brown fox jumps over the lazy dog",
      `Generated at ${new Date().toISOString()}`,
    ];
    const randomText = samples[Math.floor(Math.random() * samples.length)];
    setInput(randomText);
    setMode("encode");
    setOutput(encoder.encode(randomText));
  };

  const handleBatchProcess = useCallback(async (inputs: string[]): Promise<BatchResult[]> => {
    const batchResults: BatchResult[] = [];

    for (const input of inputs) {
      try {
        const result = mode === "encode" 
          ? encoder.encode(input)
          : encoder.decode(input);
        
        batchResults.push({
          input,
          output: result});
      } catch (error) {
        batchResults.push({
          input,
          output: "",
          error: error instanceof Error ? error.message : "Processing failed"});
      }
    }

    return batchResults;
  }, [mode, encoder]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-sm">
              {"</>"}
            </div>
            <h1 className="text-xl font-semibold text-foreground">Encoder/Decoder</h1>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Batch Mode */}
        <div className="mb-6">
          <BatchMode
            enabled={batchMode}
            onToggle={setBatchMode}
            onProcess={handleBatchProcess}
            placeholder={`Enter multiple texts to ${mode} (one per line)...`}
            label="Batch Mode"
            description={`${mode === "encode" ? "Encode" : "Decode"} multiple inputs at once and export results`}
          />
        </div>

        {!batchMode && (
          <>
        {/* Encoder Type Tabs */}
        <Tabs value={encoderType} onValueChange={(v) => setEncoderType(v as EncoderType)} className="mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="base64" className="data-[state=active]:bg-green-600">
              Base64
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-green-600">
              URL
            </TabsTrigger>
            <TabsTrigger value="html" className="data-[state=active]:bg-green-600">
              HTML
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <p className="text-muted-foreground mb-6">{encoder.description}</p>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button
            onClick={doEncode}
            className={mode === "encode" ? "bg-green-600 hover:bg-green-700" : "bg-zinc-600 hover:bg-zinc-700"}
          >
            Encode
            {mode === "encode" && <KeyboardHint shortcut={SHORTCUTS.execute} />}
          </Button>
          <Button
            onClick={doDecode}
            className={mode === "decode" ? "bg-green-600 hover:bg-green-700" : "bg-zinc-600 hover:bg-zinc-700"}
          >
            Decode
            {mode === "decode" && <KeyboardHint shortcut={SHORTCUTS.execute} />}
          </Button>
          <Button className="min-h-[44px] border-border hover:bg-muted" onClick={swap} variant="outline">
            ⇅ Swap
            <KeyboardHint shortcut={SHORTCUTS.swap} />
          </Button>
          <Button className="min-h-[44px] border-border hover:bg-muted" onClick={copyOutput} variant="outline" disabled={!output}>
            Copy
            {output && <KeyboardHint shortcut={SHORTCUTS.copy} />}
          </Button>
          <ShareButton
            toolId="base64"
            data={{ input, output, mode, encoderType }}
            variant="outline"
            className="min-h-[44px] border-border hover:bg-muted"
            disabled={!input && !output}
          />
          <Button className="min-h-[44px] text-muted-foreground hover:text-foreground" onClick={clear} variant="ghost">
            Clear
            <KeyboardHint shortcut={SHORTCUTS.clear} />
          </Button>
        </div>

        {/* Editor Panels */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {mode === "encode" ? "Plain Text" : "Encoded Text"}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter text to decode..."}
              className="h-[400px] bg-card border-border font-mono text-sm resize-none focus:border-green-500"
            />
            <p className="text-sm sm:text-xs text-muted-foreground">{input.length} characters</p>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {mode === "encode" ? "Encoded Output" : "Decoded Output"}
            </label>
            <Textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="h-[400px] bg-card border-border font-mono text-sm resize-none"
            />
            <p className="text-sm sm:text-xs text-muted-foreground">{output.length} characters</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 p-4 rounded-lg bg-card border border-border shadow-refined-sm">
          <h3 className="font-medium mb-2">About {encoder.name} Encoding</h3>
          {encoderType === "base64" && (
            <p className="text-sm text-muted-foreground">
              Base64 encodes binary data into ASCII text. Commonly used for embedding images in HTML/CSS, 
              encoding data in URLs, and storing complex data in JSON. Output is ~33% larger than input.
            </p>
          )}
          {encoderType === "url" && (
            <p className="text-sm text-muted-foreground">
              URL encoding (percent-encoding) converts special characters to %XX format for safe use in URLs. 
              Spaces become %20, & becomes %26, etc. Essential for query parameters and form data.
            </p>
          )}
          {encoderType === "html" && (
            <p className="text-sm text-muted-foreground">
              HTML encoding converts special characters to HTML entities. &lt; becomes &amp;lt;, 
              &gt; becomes &amp;gt;, etc. Prevents XSS attacks and displays code in HTML pages.
            </p>
          )}
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/base64" />

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={base64GuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is Base64 Section */}
          <GeoSection
            id="what-is-base64"
            title={base64GuideContent.introduction.title}
            subtitle="Understanding binary-to-text encoding for web APIs"
            variant="default"
          >
            <MarkdownContent content={base64GuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use Base64 encoding daily"
            variant="default"
          >
            <FeatureGrid
              features={base64GuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={base64GuideContent.howToUse.title}
            subtitle="Master encoding, decoding, and advanced options"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${base64GuideContent.toolName}`}
              description="Step-by-step guide to Base64 encoding and decoding"
              steps={base64GuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${base64GuideContent.toolPath}`}
            />
            <MarkdownContent content={base64GuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Base64"
            variant="default"
          >
            <ToolFAQ faqs={base64GuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={base64GuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={base64GuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {base64GuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(base64GuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={base64GuideContent.lastUpdated} />
        </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private encoding. No data leaves your browser.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link> •{" "}
            <Link href="/about" className="hover:text-foreground transition">About</Link> •{" "}
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
          </p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Base64 Encoder & Decoder"
        description="Free Base64, URL, and HTML encoder/decoder. Fast, private encoding and decoding. No data leaves your browser."
        url="https://openkit.tools/base64"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={base64GuideContent.lastUpdated}
        version={base64GuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "1923",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Base64 Encoder', url: 'https://openkit.tools/base64' },
        ]}
      />
    </main>
  );
}
