"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, StatsBar } from "@/components/geo-content-layout";
import { ShareButton } from "@/components/share-button";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { fibonacciGuideContent as fibonacciTradingGuideContent } from "@/content/fibonacci-trading-guide";

interface FibLevel {
  label: string;
  ratio: number;
  price: number;
  type: "retracement" | "extension";
}

export default function FibonacciTradingPage() {
  useToolTracker("fibonacci-trading", "Fibonacci Retracement Calculator", "trading");
  const analytics = useAnalytics();

  const [swingHigh, setSwingHigh] = useState("");
  const [swingLow, setSwingLow] = useState("");
  const [direction, setDirection] = useState<"uptrend" | "downtrend">("uptrend");
  const [levels, setLevels] = useState<FibLevel[]>([]);
  const [showGuide, setShowGuide] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const retracementRatios = [
    { label: "0%", ratio: 0 },
    { label: "23.6%", ratio: 0.236 },
    { label: "38.2%", ratio: 0.382 },
    { label: "50%", ratio: 0.5 },
    { label: "61.8%", ratio: 0.618 },
    { label: "78.6%", ratio: 0.786 },
    { label: "100%", ratio: 1 },
  ];

  const extensionRatios = [
    { label: "127.2%", ratio: 1.272 },
    { label: "161.8%", ratio: 1.618 },
    { label: "200%", ratio: 2.0 },
    { label: "261.8%", ratio: 2.618 },
  ];

  const calculate = useCallback(() => {
    const high = parseFloat(swingHigh);
    const low = parseFloat(swingLow);

    if (!high || !low || high <= low) return;

    const range = high - low;
    const allLevels: FibLevel[] = [];

    // Retracement levels
    for (const r of retracementRatios) {
      const price = direction === "uptrend"
        ? high - range * r.ratio
        : low + range * r.ratio;
      allLevels.push({ label: r.label, ratio: r.ratio, price, type: "retracement" });
    }

    // Extension levels
    for (const r of extensionRatios) {
      const price = direction === "uptrend"
        ? high - range * r.ratio
        : low + range * r.ratio;
      allLevels.push({ label: r.label, ratio: r.ratio, price, type: "extension" });
    }

    setLevels(allLevels);

    analytics.trackToolUsage("fibonacci-trading", {
      action: "calculate",
      direction,
    });
  }, [swingHigh, swingLow, direction, analytics]);

  const copyPrice = useCallback((price: number, index: number) => {
    navigator.clipboard.writeText(price.toFixed(4));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }, []);

  const fmt = (n: number): string => {
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  const getLevelColor = (ratio: number, type: string): string => {
    if (type === "extension") return "text-purple-400";
    if (ratio === 0 || ratio === 1) return "text-muted-foreground";
    if (ratio <= 0.382) return "text-green-400";
    if (ratio <= 0.5) return "text-yellow-400";
    return "text-orange-400";
  };

  const getLevelBg = (ratio: number, type: string): string => {
    if (type === "extension") return "bg-purple-500/10 border-purple-500/20";
    if (ratio === 0.618) return "bg-amber-500/10 border-amber-500/20";
    if (ratio === 0.5) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-background border-border";
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              🌀
            </div>
            <h1 className="text-xl font-semibold">Fibonacci Retracement</h1>
          </div>
          <ShareButton
            toolId="fibonacci-trading"
            data={{ swingHigh, swingLow, direction }}
            variant="outline"
            className="border-border"
          />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Calculator Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">Swing Points</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Swing High</label>
                <Input
                  type="number"
                  placeholder="1.2500"
                  value={swingHigh}
                  onChange={(e) => setSwingHigh(e.target.value)}
                  className="bg-background border-border font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Swing Low</label>
                <Input
                  type="number"
                  placeholder="1.2000"
                  value={swingLow}
                  onChange={(e) => setSwingLow(e.target.value)}
                  className="bg-background border-border font-mono"
                />
              </div>
            </div>

            {/* Direction Toggle */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Direction</label>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setDirection("uptrend")}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                    direction === "uptrend"
                      ? "bg-green-600 text-white"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  ▲ Uptrend
                </button>
                <button
                  onClick={() => setDirection("downtrend")}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                    direction === "downtrend"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  ▼ Downtrend
                </button>
              </div>
            </div>

            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
              Calculate Fibonacci Levels
            </Button>
          </CardContent>
        </Card>

        {/* Results — Price Ladder */}
        {levels.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Price Levels</h2>
                <span className="text-xs text-muted-foreground">Click a price to copy</span>
              </div>
            </CardHeader>
            <CardContent>
              {/* Retracement Levels */}
              <div className="space-y-1.5 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Retracement Levels</h3>
                {levels
                  .filter((l) => l.type === "retracement")
                  .map((level, i) => (
                    <button
                      key={`ret-${i}`}
                      onClick={() => copyPrice(level.price, i)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50 ${getLevelBg(level.ratio, level.type)}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-16 text-left ${getLevelColor(level.ratio, level.type)}`}>
                          {level.label}
                        </span>
                        <div
                          className={`h-1.5 rounded-full ${level.ratio === 0.618 ? "bg-amber-500" : level.ratio === 0.5 ? "bg-yellow-500" : "bg-muted-foreground/30"}`}
                          style={{ width: `${Math.max(20, (1 - level.ratio) * 100)}px` }}
                        />
                      </div>
                      <span className="font-mono text-sm font-medium">
                        {copiedIndex === i ? (
                          <span className="text-green-500">Copied!</span>
                        ) : (
                          fmt(level.price)
                        )}
                      </span>
                    </button>
                  ))}
              </div>

              {/* Extension Levels */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Extension Levels</h3>
                {levels
                  .filter((l) => l.type === "extension")
                  .map((level, i) => {
                    const idx = i + 7;
                    return (
                      <button
                        key={`ext-${i}`}
                        onClick={() => copyPrice(level.price, idx)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50 ${getLevelBg(level.ratio, level.type)}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-bold w-16 text-left ${getLevelColor(level.ratio, level.type)}`}>
                            {level.label}
                          </span>
                          <div className="h-1.5 rounded-full bg-purple-500/30" style={{ width: `${Math.max(20, level.ratio * 30)}px` }} />
                        </div>
                        <span className="font-mono text-sm font-medium">
                          {copiedIndex === idx ? (
                            <span className="text-green-500">Copied!</span>
                          ) : (
                            fmt(level.price)
                          )}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Tools */}
        <RelatedTools currentPath="/fibonacci-trading" />

        {/* Learn More Toggle */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => setShowGuide(!showGuide)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showGuide ? "Hide guide ▲" : "Learn more about Fibonacci trading ▼"}
          </Button>
        </div>

        {showGuide && (
          <GeoContentLayout>
            <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
              <QuickStartGuide steps={fibonacciTradingGuideContent.quickStartSteps} />
            </GeoSection>
            <GeoSection id="introduction" title={fibonacciTradingGuideContent.introduction.title} subtitle="Understanding Fibonacci in trading" variant="default">
              <MarkdownContent content={fibonacciTradingGuideContent.introduction.content} />
            </GeoSection>
            <GeoSection id="how-to-use" title={fibonacciTradingGuideContent.howToUse.title} subtitle="Step-by-step instructions" variant="minimal">
              <HowToSchema
                name={`How to use ${fibonacciTradingGuideContent.toolName}`}
                description="Step-by-step guide to Fibonacci retracement"
                steps={fibonacciTradingGuideContent.howToUse.steps}
                toolUrl={`https://openkit.tools${fibonacciTradingGuideContent.toolPath}`}
              />
              <MarkdownContent content={fibonacciTradingGuideContent.howToUse.content} />
            </GeoSection>
            <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Common questions about Fibonacci" variant="default">
              <ToolFAQ faqs={fibonacciTradingGuideContent.faqs} />
            </GeoSection>
            <GeoSection id="security" title={fibonacciTradingGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
              <MarkdownContent content={fibonacciTradingGuideContent.security.content} />
            </GeoSection>
            {fibonacciTradingGuideContent.stats && (
              <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
                <StatsBar stats={Object.entries(fibonacciTradingGuideContent.stats).map(([label, value]) => ({ label, value }))} />
              </GeoSection>
            )}
          </GeoContentLayout>
        )}

        <LastUpdated date={fibonacciTradingGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate Fibonacci levels instantly. 100% client-side — no data leaves your browser.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link> •{" "}
            <Link href="/about" className="hover:text-foreground transition">About</Link> •{" "}
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Fibonacci Retracement Calculator"
        description="Calculate Fibonacci retracement and extension levels for any price move. Free, private, client-side."
        url="https://openkit.tools/fibonacci-trading"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={fibonacciTradingGuideContent.lastUpdated}
        version={fibonacciTradingGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Fibonacci Retracement", url: "https://openkit.tools/fibonacci-trading" },
        ]}
      />
    </main>
  );
}
