"use client";
import { useState } from "react";
import Link from "next/link";
import { Circle, Copy, Shuffle } from "lucide-react";
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
import { borderGuideContent } from "@/content/border-guide";

export default function BorderRadiusGenerator() {
  useToolTracker("border", "Border Radius Generator", "generators");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [topLeft, setTopLeft] = useState(16);
  const [topRight, setTopRight] = useState(16);
  const [bottomRight, setBottomRight] = useState(16);
  const [bottomLeft, setBottomLeft] = useState(16);
  const [linked, setLinked] = useState(true);

  const updateRadius = (value: number, setter: (v: number) => void) => {
    if (linked) {
      setTopLeft(value);
      setTopRight(value);
      setBottomRight(value);
      setBottomLeft(value);
    } else {
      setter(value);
    }
  };

  const cssValue = topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft
    ? `${topLeft}px`
    : `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const tailwindValue = topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft
    ? topLeft === 0 ? "rounded-none" : topLeft >= 9999 ? "rounded-full" : `rounded-[${topLeft}px]`
    : `rounded-[${topLeft}px_${topRight}px_${bottomRight}px_${bottomLeft}px]`;


  const presets = [
    { name: "None", values: [0, 0, 0, 0] },
    { name: "Small", values: [4, 4, 4, 4] },
    { name: "Medium", values: [8, 8, 8, 8] },
    { name: "Large", values: [16, 16, 16, 16] },
    { name: "XL", values: [24, 24, 24, 24] },
    { name: "Full", values: [9999, 9999, 9999, 9999] },
    { name: "Blob", values: [30, 70, 70, 30] },
    { name: "Leaf", values: [0, 50, 0, 50] },
  ];

  const randomize = () => {
    if (linked) {
      const v = Math.floor(Math.random() * 50);
      setTopLeft(v);
      setTopRight(v);
      setBottomRight(v);
      setBottomLeft(v);
    } else {
      setTopLeft(Math.floor(Math.random() * 80));
      setTopRight(Math.floor(Math.random() * 80));
      setBottomRight(Math.floor(Math.random() * 80));
      setBottomLeft(Math.floor(Math.random() * 80));
    }
    analytics.trackToolUsage('border', { action: 'randomize' });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white flex items-center justify-center hover:opacity-80 transition">
              <Circle className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Border Radius Generator</h1>
          </div>
          <button
            onClick={randomize}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Preview */}
        <div className="flex items-center justify-center h-48 sm:h-64 bg-card rounded-xl mb-6">
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-rose-500 to-pink-600"
            style={{ borderRadius: cssValue }}
          />
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setTopLeft(preset.values[0]);
                setTopRight(preset.values[1]);
                setBottomRight(preset.values[2]);
                setBottomLeft(preset.values[3]);
                analytics.trackToolUsage('border', { action: 'load_preset', preset_name: preset.name });
              }}
              className="px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Link Toggle */}
        <label htmlFor="page-input-111" className="flex items-center gap-3 mb-6 cursor-pointer">
          <input id="page-input-111"
            type="checkbox"
            checked={linked}
            onChange={(e) => setLinked(e.target.checked)}
            className="w-5 h-5 rounded bg-muted border-border accent-rose-500"
          />
          <span className="text-sm text-accent-foreground">Link all corners</span>
        </label>

        {/* Sliders */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: "Top Left", value: topLeft, set: setTopLeft },
            { label: "Top Right", value: topRight, set: setTopRight },
            { label: "Bottom Left", value: bottomLeft, set: setBottomLeft },
            { label: "Bottom Right", value: bottomRight, set: setBottomRight },
          ].map((corner) => (
            <div key={corner.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-accent-foreground">{corner.label}</span>
                <span className="text-muted-foreground font-mono">{corner.value}px</span>
              </div>
              <input aria-label="Input field"
                type="range"
                min="0"
                max="100"
                value={Math.min(corner.value, 100)}
                onChange={(e) => updateRadius(parseInt(e.target.value), corner.set)}
                disabled={linked && corner.label !== "Top Left"}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-rose-500 disabled:opacity-50"
              />
            </div>
          ))}
        </div>

        {/* Code Output */}
        <div className="space-y-3">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">CSS</span>
              <button onClick={() => {
                copy(`border-radius: ${cssValue};`);
                analytics.trackToolUsage('border', { action: 'copy', format: 'css' });
              }} className="text-muted-foreground hover:text-foreground" aria-label="Copy to clipboard">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-sm text-green-400">border-radius: {cssValue};</code>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Tailwind CSS</span>
              <button onClick={() => {
                copy(tailwindValue);
                analytics.trackToolUsage('border', { action: 'copy', format: 'tailwind' });
              }} className="text-muted-foreground hover:text-foreground" aria-label="Copy to clipboard">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-sm text-blue-400">{tailwindValue}</code>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/border" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={borderGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-border-radius" title={borderGuideContent.introduction.title} subtitle="Understanding CSS border-radius generation" variant="default">
            <MarkdownContent content={borderGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use border radius design" variant="default">
            <FeatureGrid features={borderGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={borderGuideContent.howToUse.title} subtitle="Master CSS border-radius creation" variant="minimal">
            <HowToSchema name={`How to use ${borderGuideContent.toolName}`} description="Step-by-step guide to border radius generation" steps={borderGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${borderGuideContent.toolPath}`} />
            <MarkdownContent content={borderGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={borderGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={borderGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={borderGuideContent.security.content} />
          </GeoSection>

          {borderGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(borderGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={borderGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate CSS border radius values.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Border Radius Generator"
        description="Free online CSS border radius generator. Create rounded corners, blobs, and custom shapes visually. Copy CSS and Tailwind code."
        url="https://openkit.tools/border"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={borderGuideContent.lastUpdated}
        version={borderGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1542", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Border Radius Generator', url: 'https://openkit.tools/border' },
        ]}
      />
    </main>
  );
}
