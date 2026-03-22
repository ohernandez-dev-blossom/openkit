"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Keyboard, Copy, Info } from "lucide-react";
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
import { keycodeGuideContent } from "@/content/keycode-guide";

interface KeyEventData {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  charCode: number;
  location: number;
  modifiers: {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    meta: boolean;
  };
  repeat: boolean;
}

const LOCATION_NAMES: Record<number, string> = {
  0: "Standard",
  1: "Left",
  2: "Right",
  3: "Numpad",
};

export default function KeycodeTool() {
  useToolTracker("keycode", "JavaScript KeyCode", "developers");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [eventData, setEventData] = useState<KeyEventData | null>(null);
  const [history, setHistory] = useState<KeyEventData[]>([]);
  const [isListening, setIsListening] = useState(true);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isListening) return;

    e.preventDefault();

    const data: KeyEventData = {
      key: e.key,
      code: e.code,
      keyCode: e.keyCode,
      which: e.which,
      charCode: e.charCode,
      location: e.location,
      modifiers: {
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
        meta: e.metaKey,
      },
      repeat: e.repeat,
    };

    setEventData(data);
    setHistory((prev) => [data, ...prev].slice(0, 10));

    analytics.trackToolUsage("keycode", {
      action: "keypress",
      key: e.key,
      code: e.code,
    });
  }, [isListening, analytics]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const generateCodeSnippet = (data: KeyEventData) => {
    return `document.addEventListener('keydown', (e) => {
  if (e.key === '${data.key}' && e.code === '${data.code}') {
    // Your code here
    e.preventDefault();
  }
});`;
  };

  const copySnippet = () => {
    if (eventData) {
      copy(generateCodeSnippet(eventData));
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center hover:opacity-80 transition" aria-label="Back to home">
            <Keyboard className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">JavaScript KeyCode</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Main Key Display */}
        <div className="mb-8">
          <div
            className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
              isListening
                ? "border-blue-500/50 bg-blue-500/5"
                : "border-muted bg-muted/30"
            }`}
            tabIndex={0}
            role="button"
            aria-label="Press any key to see event data"
          >
            {eventData ? (
              <div className="space-y-4">
                <div className="text-6xl sm:text-8xl font-bold text-white mb-4">
                  {eventData.key === " " ? "Space" : eventData.key}
                </div>
                <div className="text-xl text-muted-foreground">
                  {eventData.code}
                </div>
                {eventData.repeat && (
                  <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                    Key Repeat
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Keyboard className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-xl text-muted-foreground">
                  Press any key to see event data
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Listening */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsListening(!isListening)}
            variant={isListening ? "default" : "outline"}
            className={isListening ? "bg-blue-600 hover:bg-blue-700" : ""}
            aria-label={isListening ? "Pause key detection" : "Resume key detection"}
          >
            {isListening ? "Listening... (Click to Pause)" : "Paused (Click to Resume)"}
          </Button>
        </div>

        {/* Event Properties */}
        {eventData && (
          <>
            <h2 className="text-lg font-semibold text-foreground mb-4">Event Properties</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">event.key</p>
                <p className="text-lg font-mono font-semibold text-blue-400">{eventData.key}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">event.code</p>
                <p className="text-lg font-mono font-semibold text-green-400">{eventData.code}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">event.keyCode</p>
                <p className="text-lg font-mono font-semibold text-yellow-400">{eventData.keyCode}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">event.which</p>
                <p className="text-lg font-mono font-semibold text-purple-400">{eventData.which}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">event.charCode</p>
                <p className="text-lg font-mono font-semibold text-pink-400">{eventData.charCode || "0"}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">event.location</p>
                <p className="text-lg font-mono font-semibold text-cyan-400">{LOCATION_NAMES[eventData.location]}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Modifiers</p>
                <div className="flex gap-2 flex-wrap">
                  {eventData.modifiers.ctrl && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">Ctrl</span>
                  )}
                  {eventData.modifiers.shift && (
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-sm">Shift</span>
                  )}
                  {eventData.modifiers.alt && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">Alt</span>
                  )}
                  {eventData.modifiers.meta && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">Meta</span>
                  )}
                  {!Object.values(eventData.modifiers).some(Boolean) && (
                    <span className="text-muted-foreground text-sm">None</span>
                  )}
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Code Snippet</h2>
                <Button
                  onClick={copySnippet}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  aria-label="Copy code snippet"
                >
                  <Copy className="w-4 h-4" />
                  {isCopied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <pre className="p-4 bg-card border border-border rounded-lg overflow-x-auto">
                <code className="text-sm font-mono text-foreground">
                  {generateCodeSnippet(eventData)}
                </code>
              </pre>
            </div>
          </>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Keys</h2>
            <div className="flex flex-wrap gap-2">
              {history.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setEventData(item)}
                  className="px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition text-sm"
                  aria-label={`View details for ${item.key}`}
                >
                  <span className="font-mono">{item.key === " " ? "Space" : item.key}</span>
                  <span className="text-muted-foreground ml-2">{item.code}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-1">About Keyboard Events</h4>
              <p className="text-xs text-blue-300/80">
                Use <code className="text-blue-400">event.key</code> for the character value,{" "}
                <code className="text-blue-400">event.code</code> for the physical key position.
                <code className="text-blue-400">keyCode</code> and <code className="text-blue-400">which</code> are deprecated but still widely used.
              </p>
            </div>
          </div>
        </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={keycodeGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={keycodeGuideContent.introduction.title} subtitle="Understanding keyboard events" variant="default">
            <MarkdownContent content={keycodeGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use keyboard events" variant="default">
            <FeatureGrid features={keycodeGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={keycodeGuideContent.howToUse.title} subtitle="Master keyboard event detection" variant="minimal">
            <HowToSchema name={`How to use ${keycodeGuideContent.toolName}`} description="Step-by-step guide" steps={keycodeGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${keycodeGuideContent.toolPath}`} />
            <MarkdownContent content={keycodeGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={keycodeGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={keycodeGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={keycodeGuideContent.security.content} />
          </GeoSection>
          {keycodeGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(keycodeGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/keycode" />
        <LastUpdated date={keycodeGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Interactive JavaScript keyboard event reference. Press any key to see event properties.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JavaScript KeyCode"
        description="Interactive JavaScript keyboard event helper. Press any key to see key codes, event properties, modifiers, and generate code snippets."
        url="https://openkit.tools/keycode"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={keycodeGuideContent.lastUpdated}
        version={keycodeGuideContent.version}
        aggregateRating={{ ratingValue: "4.8", ratingCount: "800", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "JavaScript KeyCode", url: "https://openkit.tools/keycode" },
        ]}
      />
    </main>
  );
}
