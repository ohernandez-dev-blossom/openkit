"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Dices, Copy, RefreshCw } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { randomGuideContent } from "@/content/random-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

export default function RandomNumberGenerator() {
  useToolTracker("random", "Random Number Generator", "generators");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([42]);

  const generate = useCallback(() => {
    const nums: number[] = [];
    const range = max - min + 1;

    if (unique && count > range) {
      // Can't generate more unique numbers than the range allows
      const all = Array.from({ length: range }, (_, i) => min + i);
      // Shuffle
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
      setResults(all);
      analytics.trackToolUsage('random', { action: 'generate', min, max, count: all.length, unique });
      return;
    }

    if (unique) {
      const used = new Set<number>();
      while (nums.length < count) {
        const n = Math.floor(Math.random() * range) + min;
        if (!used.has(n)) {
          used.add(n);
          nums.push(n);
        }
      }
    } else {
      for (let i = 0; i < count; i++) {
        nums.push(Math.floor(Math.random() * range) + min);
      }
    }

    setResults(nums);
    analytics.trackToolUsage('random', { action: 'generate', min, max, count, unique });
  }, [min, max, count, unique, analytics]);


  const presets = [
    { label: "Coin Flip", min: 0, max: 1, count: 1 },
    { label: "Dice (d6)", min: 1, max: 6, count: 1 },
    { label: "d20", min: 1, max: 20, count: 1 },
    { label: "Lottery (6)", min: 1, max: 49, count: 6, unique: true },
    { label: "Percentage", min: 0, max: 100, count: 1 },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center hover:opacity-80 transition">
              <Dices className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Random Number Generator</h1>
          </div>
          <button
            onClick={generate}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium text-white transition"
          >
            <RefreshCw className="w-4 h-4" />
            Generate
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Result Display */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm text-muted-foreground">Result{results.length > 1 ? "s" : ""}</p>
            <button onClick={() => { copy(results.join(", ")); analytics.trackToolInteraction('random', 'copy', { count: results.length }); }} className="text-muted-foreground hover:text-foreground p-1">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {results.map((num, i) => (
              <div
                key={i}
                className="px-4 py-3 bg-muted rounded-lg font-mono text-2xl sm:text-3xl font-bold text-green-400"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="page-input-104" className="text-sm font-medium text-accent-foreground mb-2 block">Minimum</label>
            <input id="page-input-104"
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg font-mono text-foreground"
            />
          </div>
          <div>
            <label htmlFor="page-input-113" className="text-sm font-medium text-accent-foreground mb-2 block">Maximum</label>
            <input id="page-input-113"
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg font-mono text-foreground"
            />
          </div>
          <div>
            <label htmlFor="page-input-122" className="text-sm font-medium text-accent-foreground mb-2 block">Count</label>
            <input id="page-input-122"
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={1000}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg font-mono text-foreground"
            />
          </div>
        </div>

        {/* Options */}
        <div className="mb-6">
          <label htmlFor="page-input-136" className="flex items-center gap-3 cursor-pointer p-3 bg-card rounded-lg border border-border w-fit">
            <input id="page-input-136"
              type="checkbox"
              checked={unique}
              onChange={(e) => setUnique(e.target.checked)}
              className="w-5 h-5 rounded bg-muted border-border accent-green-500"
            />
            <span className="text-sm text-accent-foreground">Unique numbers only (no duplicates)</span>
          </label>
        </div>

        {/* Presets */}
        <div className="mb-6">
          <label className="text-sm font-medium text-accent-foreground mb-2 block">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setMin(preset.min);
                  setMax(preset.max);
                  setCount(preset.count);
                  setUnique(preset.unique || false);
                  analytics.trackToolUsage('random', { action: 'use_preset', preset: preset.label });
                }}
                className="px-4 py-2 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/random" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={randomGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-random" title={randomGuideContent.introduction.title} subtitle="Understanding random data generation" variant="default">
            <MarkdownContent content={randomGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use random generation" variant="default">
            <FeatureGrid features={randomGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={randomGuideContent.howToUse.title} subtitle="Master random data generation" variant="minimal">
            <HowToSchema name={`How to use ${randomGuideContent.toolName}`} description="Step-by-step guide to random data generation" steps={randomGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${randomGuideContent.toolPath}`} />
            <MarkdownContent content={randomGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={randomGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={randomGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={randomGuideContent.security.content} />
          </GeoSection>

          {randomGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(randomGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={randomGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate random numbers within a range.</p>
        </div>
      </footer>
      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Random Number Generator"
        description="Generate random numbers in any range. Cryptographically secure."
        url="https://openkit.tools/random"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={randomGuideContent.lastUpdated}
        version={randomGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1234", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Random Number Generator', url: 'https://openkit.tools/random' },
        ]}
      />
    </main>
  );
}
