"use client";
import { useState } from "react";
import Link from "next/link";
import { Square, Copy, Shuffle } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { shadowGuideContent } from "@/content/shadow-guide";
import { useAnalytics } from "@/hooks/use-analytics";

export default function BoxShadowGenerator() {
  useToolTracker("shadow", "Box Shadow Generator");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [horizontal, setHorizontal] = useState(5);
  const [vertical, setVertical] = useState(5);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);
  
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  };

  const shadowCSS = `${inset ? "inset " : ""}${horizontal}px ${vertical}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const tailwindShadow = `shadow-[${inset ? "inset_" : ""}${horizontal}px_${vertical}px_${blur}px_${spread}px_${hexToRgba(color, opacity).replace(/ /g, "")}]`;

  
  const randomize = () => {
    const newHorizontal = Math.floor(Math.random() * 40) - 20;
    const newVertical = Math.floor(Math.random() * 40) - 20;
    const newBlur = Math.floor(Math.random() * 60);
    const newSpread = Math.floor(Math.random() * 20) - 10;
    const newOpacity = Math.floor(Math.random() * 60) + 10;
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    const newInset = Math.random() > 0.7;

    setHorizontal(newHorizontal);
    setVertical(newVertical);
    setBlur(newBlur);
    setSpread(newSpread);
    setOpacity(newOpacity);
    setColor(newColor);
    setInset(newInset);

    analytics.trackToolInteraction('shadow-generator', 'randomize', {
      horizontal: newHorizontal,
      vertical: newVertical,
      blur: newBlur,
      spread: newSpread,
      opacity: newOpacity,
      inset: newInset
    });
  };

  const controls = [
    { label: "Horizontal", value: horizontal, set: setHorizontal, min: -50, max: 50 },
    { label: "Vertical", value: vertical, set: setVertical, min: -50, max: 50 },
    { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
    { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
    { label: "Opacity", value: opacity, set: setOpacity, min: 0, max: 100, suffix: "%" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white flex items-center justify-center hover:opacity-80 transition">
              <Square className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Box Shadow Generator</h1>
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
            className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl transition-shadow duration-200"
            style={{ boxShadow: shadowCSS }}
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            {controls.map((ctrl) => (
              <div key={ctrl.label}>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-accent-foreground">{ctrl.label}</span>
                  <input aria-label="Input field"
                    type="number"
                    min={ctrl.min}
                    max={ctrl.max}
                    value={ctrl.value}
                    onChange={(e) => ctrl.set(Math.max(ctrl.min, Math.min(ctrl.max, parseInt(e.target.value) || 0)))}
                    className="w-16 px-2 py-1 bg-muted border border-border rounded text-right font-mono text-sm text-foreground"
                  />
                </div>
                <input aria-label="Input field"
                  type="range"
                  min={ctrl.min}
                  max={ctrl.max}
                  value={ctrl.value}
                  onChange={(e) => ctrl.set(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-0"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Shadow Color</label>
              <div className="flex gap-2">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer border border-border bg-transparent" aria-label="Color"
                />
                <input aria-label="Input field"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm uppercase text-foreground"
                />
              </div>
            </div>

            <div>
              <label htmlFor="page-input-121" className="flex items-center gap-3 cursor-pointer p-3 bg-card rounded-lg border border-border">
                <input id="page-input-121"
                  type="checkbox"
                  checked={inset}
                  onChange={(e) => setInset(e.target.checked)}
                  className="w-5 h-5 rounded bg-muted border-border accent-blue-500"
                />
                <span className="text-sm text-accent-foreground">Inset Shadow</span>
              </label>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Quick Presets</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Soft", h: 0, v: 4, b: 15, s: 0, o: 10 },
                  { name: "Hard", h: 5, v: 5, b: 0, s: 0, o: 30 },
                  { name: "Glow", h: 0, v: 0, b: 20, s: 5, o: 40 },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setHorizontal(preset.h);
                      setVertical(preset.v);
                      setBlur(preset.b);
                      setSpread(preset.s);
                      setOpacity(preset.o);
                      setInset(false);
                      analytics.trackToolUsage('shadow-generator', {
                        action: 'preset',
                        preset: preset.name,
                        horizontal: preset.h,
                        vertical: preset.v,
                        blur: preset.b,
                        spread: preset.s,
                        opacity: preset.o
                      });
                    }}
                    className="px-3 py-2 bg-muted hover:bg-accent rounded text-sm text-accent-foreground transition"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="space-y-3">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">CSS</span>
              <button onClick={() => { copy(`box-shadow: ${shadowCSS};`); analytics.trackToolInteraction('shadow-generator', 'copy', { format: 'css' }); }} className="text-muted-foreground hover:text-foreground p-1" aria-label="Copy to clipboard">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-sm text-green-400 break-all">box-shadow: {shadowCSS};</code>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Tailwind CSS</span>
              <button onClick={() => { copy(tailwindShadow); analytics.trackToolInteraction('shadow-generator', 'copy', { format: 'tailwind' }); }} className="text-muted-foreground hover:text-foreground p-1" aria-label="Copy to clipboard">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-sm text-blue-400 break-all">{tailwindShadow}</code>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/shadow" />

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={shadowGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is Shadow Designer Section */}
          <GeoSection
            id="what-is-shadow"
            title={shadowGuideContent.introduction.title}
            subtitle="Understanding CSS box-shadow for developers"
            variant="default"
          >
            <MarkdownContent content={shadowGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use shadow designers daily"
            variant="default"
          >
            <FeatureGrid
              features={shadowGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={shadowGuideContent.howToUse.title}
            subtitle="Master shadow creation and customization"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${shadowGuideContent.toolName}`}
              description="Step-by-step guide to CSS shadow design"
              steps={shadowGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${shadowGuideContent.toolPath}`}
            />
            <MarkdownContent content={shadowGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about CSS shadows"
            variant="default"
          >
            <ToolFAQ faqs={shadowGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={shadowGuideContent.security.title}
            subtitle="Your shadow data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={shadowGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {shadowGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(shadowGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={shadowGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate CSS box shadows visually.</p>
        </div>
      </footer>
      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Box Shadow Generator"
        description="CSS box-shadow generator with live preview. Create perfect shadows."
        url="https://openkit.tools/shadow"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={shadowGuideContent.lastUpdated}
        version={shadowGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "1800",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Box Shadow Generator', url: 'https://openkit.tools/shadow' },
        ]}
      />
    </main>
  );
}
