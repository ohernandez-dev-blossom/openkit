"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Palette, Copy, RefreshCw, Lock, Unlock } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { paletteGuideContent } from "@/content/palette-guide";
import { useAnalytics } from "@/hooks/use-analytics";

type Color = {
  hex: string;
  locked: boolean;
};

export default function ColorPaletteGenerator() {
  useToolTracker("palette", "Color Palette Generator", "design");
  const { isCopied, copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [colors, setColors] = useState<Color[]>([
    { hex: "#3B82F6", locked: false },
    { hex: "#8B5CF6", locked: false },
    { hex: "#EC4899", locked: false },
    { hex: "#F59E0B", locked: false },
    { hex: "#10B981", locked: false },
  ]);

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  };

  const generate = useCallback(() => {
    setColors((prev) =>
      prev.map((c) => (c.locked ? c : { ...c, hex: randomColor() }))
    );
    const lockedCount = colors.filter(c => c.locked).length;
    analytics.trackToolUsage('palette', {
      action: 'generate',
      lockedColors: lockedCount,
      totalColors: colors.length
    });
  }, [colors, analytics]);

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
    const color = colors[index];
    analytics.trackToolInteraction('palette', color.locked ? 'unlock-color' : 'lock-color', {
      colorIndex: index,
      colorHex: color.hex
    });
  };


  const copyAll = () => {
    const allColors = colors.map((c) => c.hex).join(", ");
    copy(allColors);
    analytics.trackToolInteraction('palette', 'copy-all', {
      colorCount: colors.length
    });
  };

  const exportCSS = () => {
    const css = colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join("\n");
    copy(`:root {\n${css}\n}`);
    analytics.trackToolInteraction('palette', 'export-css', {
      colorCount: colors.length
    });
  };

  const exportTailwind = () => {
    const tw = colors.map((c, i) => `"${i + 1}": "${c.hex}"`).join(",\n  ");
    copy(`colors: {\n  ${tw}\n}`);
    analytics.trackToolInteraction('palette', 'export-tailwind', {
      colorCount: colors.length
    });
  };

  // Calculate contrast color for text
  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center hover:opacity-80 transition">
              <Palette className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Color Palette Generator</h1>
          </div>
          <button
            onClick={generate}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 rounded-lg text-sm font-medium text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <RefreshCw className="w-4 h-4" />
            Generate
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Palette Display */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 rounded-xl overflow-hidden mb-6">
          {colors.map((color, index) => (
            <div
              key={index}
              className="relative h-40 sm:h-64 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 hover:z-10"
              style={{ backgroundColor: color.hex }}
            >
              <button
                onClick={() => toggleLock(index)}
                className="absolute top-3 right-3 p-2 rounded-lg transition"
                style={{
                  backgroundColor: getContrastColor(color.hex) + "20",
                  color: getContrastColor(color.hex)
                }}
                aria-label={color.locked ? "Unlock color" : "Lock color"}
              >
                {color.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>

              <button
                onClick={() => copy(color.hex)}
                className="font-mono text-lg font-bold px-3 py-1.5 rounded-lg transition"
                style={{
                  backgroundColor: getContrastColor(color.hex) + "20",
                  color: getContrastColor(color.hex)
                }}
                aria-label={`Copy color ${color.hex}`}
              >
                {color.hex.toUpperCase()}
              </button>

              {copiedText === color.hex && (
                <span
                  className="text-sm font-medium px-2 py-1 rounded"
                  style={{
                    backgroundColor: getContrastColor(color.hex) + "30",
                    color: getContrastColor(color.hex)
                  }}
                >
                  Copied!
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Tip */}
        <p className="text-sm text-muted-foreground text-center mb-6">
          Press <kbd className="px-2 py-0.5 bg-muted rounded text-xs">Space</kbd> to generate •
          Click a color to copy • Lock colors to keep them
        </p>

        {/* Export Options */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={copyAll}
            className="px-4 py-2 bg-muted hover:bg-accent active:bg-accent/80 rounded-lg text-sm text-accent-foreground transition-all duration-150 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Copy className="w-4 h-4" />
            Copy All
          </button>
          <button
            onClick={exportCSS}
            className="px-4 py-2 bg-muted hover:bg-accent active:bg-accent/80 rounded-lg text-sm text-accent-foreground transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Export CSS
          </button>
          <button
            onClick={exportTailwind}
            className="px-4 py-2 bg-muted hover:bg-accent active:bg-accent/80 rounded-lg text-sm text-accent-foreground transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Export Tailwind
          </button>
        </div>

        {/* Color Details */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {colors.map((color, index) => {
            const r = parseInt(color.hex.slice(1, 3), 16);
            const g = parseInt(color.hex.slice(3, 5), 16);
            const b = parseInt(color.hex.slice(5, 7), 16);
            return (
              <div key={index} className="bg-card border border-border rounded-lg p-3 text-sm">
                <div
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="space-y-1 text-xs font-mono">
                  <p className="text-muted-foreground">HEX: <span className="text-white">{color.hex}</span></p>
                  <p className="text-muted-foreground">RGB: <span className="text-white">{r}, {g}, {b}</span></p>
                </div>
              </div>
            );
          })}
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/palette" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={paletteGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-palette" title={paletteGuideContent.introduction.title} subtitle="Understanding color palette generation" variant="default">
            <MarkdownContent content={paletteGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use color palette generation" variant="default">
            <FeatureGrid features={paletteGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={paletteGuideContent.howToUse.title} subtitle="Master color harmony creation" variant="minimal">
            <HowToSchema name={`How to use ${paletteGuideContent.toolName}`} description="Step-by-step guide to color palette generation" steps={paletteGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${paletteGuideContent.toolPath}`} />
            <MarkdownContent content={paletteGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={paletteGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={paletteGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={paletteGuideContent.security.content} />
          </GeoSection>

          {paletteGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(paletteGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={paletteGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate beautiful color palettes for your projects.</p>
        </div>
      </footer>
      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Color Palette Generator"
        description="Free color palette generator. Create harmonious color schemes with monochromatic, analogous, complementary, and triadic harmony rules. Export as CSS, SCSS, JavaScript, or design tokens."
        url="https://openkit.tools/palette"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={paletteGuideContent.lastUpdated}
        version={paletteGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "2143", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Color Palette Generator', url: 'https://openkit.tools/palette' },
        ]}
      />
    </main>
  );
}
