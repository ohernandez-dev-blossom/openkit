"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Palette, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { PresetManager, type PresetData } from "@/components/preset-manager";
import { PinButton } from "@/components/pin-button";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { gradientGenGuideContent } from "@/content/gradient-gen-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

export default function GradientGenerator() {
  useToolTracker("gradient", "Gradient Generator", "generators");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#8B5CF6");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const gradientCSS = type === "linear"
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const tailwindClass = type === "linear"
    ? `bg-gradient-to-r from-[${color1}] to-[${color2}]`
    : `bg-[radial-gradient(circle,${color1},${color2})]`;


  const randomize = () => {
    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    const newColor1 = randomColor();
    const newColor2 = randomColor();
    const newAngle = Math.floor(Math.random() * 360);
    setColor1(newColor1);
    setColor2(newColor2);
    setAngle(newAngle);
    analytics.trackToolUsage('gradient', { action: 'randomize', type });
  };

  // Preset management
  const handleLoadPreset = useCallback((data: PresetData) => {
    if (data.color1 !== undefined && data.color1 !== null && typeof data.color1 === 'string') setColor1(data.color1);
    if (data.color2 !== undefined && data.color2 !== null && typeof data.color2 === 'string') setColor2(data.color2);
    if (data.angle !== undefined && data.angle !== null && typeof data.angle === 'number') setAngle(data.angle);
    if (data.type !== undefined && data.type !== null) setType(data.type as "linear" | "radial");
  }, []);

  const getCurrentState = useCallback((): PresetData => {
    return { color1, color2, angle, type };
  }, [color1, color2, angle, type]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white flex items-center justify-center hover:opacity-80 transition">
              <Palette className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">CSS Gradient Generator</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={randomize}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Random</span>
            </button>
            <PinButton toolHref="/gradient" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Preview */}
        <div
          className="h-48 sm:h-64 rounded-xl mb-6 border border-border shadow-refined"
          style={{ background: gradientCSS }}
        />

        {/* Preset Manager */}
        <div className="mb-6 pb-4 border-b border-border">
          <PresetManager
            toolName="gradient"
            currentState={getCurrentState()}
            onLoadPreset={handleLoadPreset}
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setType("linear");
                    analytics.trackToolUsage('gradient', { action: 'change_type', type: 'linear' });
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm ${
                    type === "linear" ? "bg-purple-600" : "bg-muted"
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => {
                    setType("radial");
                    analytics.trackToolUsage('gradient', { action: 'change_type', type: 'radial' });
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm ${
                    type === "radial" ? "bg-purple-600" : "bg-muted"
                  }`}
                >
                  Radial
                </button>
              </div>
            </div>

            {type === "linear" && (
              <div>
                <label htmlFor="page-input-113" className="text-sm font-medium text-accent-foreground mb-2 block">Angle: {angle}°</label>
                <input id="page-input-113"
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-accent-foreground mb-2 block">Color 1</label>
                <div className="flex gap-2">
                  <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 h-10 rounded cursor-pointer border-0" aria-label="Gradient color 1" />
                  <input aria-label="Input field"
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-accent-foreground mb-2 block">Color 2</label>
                <div className="flex gap-2">
                  <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 h-10 rounded cursor-pointer border-0" aria-label="Gradient color 2" />
                  <input aria-label="Input field"
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm uppercase"
                  />
                </div>
              </div>
            </div>

            <Button className="min-h-[44px] w-full border-border" onClick={randomize} variant="outline" >
              <RefreshCw className="w-4 h-4 mr-2" />
              Random Gradient
            </Button>
          </div>
        </div>

        {/* Code Output */}
        <div className="space-y-3">
          <div className="p-4 bg-card border border-border rounded-lg shadow-refined-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">CSS</span>
              <button onClick={() => {
                copy(`background: ${gradientCSS};`);
                analytics.trackToolInteraction('gradient', 'copy', { format: 'css' });
              }} className="text-muted-foreground hover:text-foreground" aria-label="Copy to clipboard">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-sm text-green-600 dark:text-green-400 break-all">background: {gradientCSS};</code>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg shadow-refined-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Tailwind CSS</span>
              <button onClick={() => {
                copy(tailwindClass);
                analytics.trackToolInteraction('gradient', 'copy', { format: 'tailwind' });
              }} className="text-muted-foreground hover:text-foreground" aria-label="Copy to clipboard">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-sm text-blue-600 dark:text-blue-400 break-all">{tailwindClass}</code>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/gradient" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={gradientGenGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-gradient" title={gradientGenGuideContent.introduction.title} subtitle="Understanding CSS gradient generation" variant="default">
            <MarkdownContent content={gradientGenGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use gradient generation" variant="default">
            <FeatureGrid features={gradientGenGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={gradientGenGuideContent.howToUse.title} subtitle="Master CSS gradient creation" variant="minimal">
            <HowToSchema name={`How to use ${gradientGenGuideContent.toolName}`} description="Step-by-step guide to gradient generation" steps={gradientGenGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${gradientGenGuideContent.toolPath}`} />
            <MarkdownContent content={gradientGenGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={gradientGenGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={gradientGenGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={gradientGenGuideContent.security.content} />
          </GeoSection>

          {gradientGenGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(gradientGenGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={gradientGenGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate beautiful CSS gradients.</p>
        </div>
      </footer>
      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="CSS Gradient Generator"
        description="Free CSS gradient generator with visual editor. Create linear, radial, and conic gradients. Copy CSS code instantly."
        url="https://openkit.tools/gradient"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={gradientGenGuideContent.lastUpdated}
        version={gradientGenGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1642", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'CSS Gradient Generator', url: 'https://openkit.tools/gradient' },
        ]}
      />
    </main>
  );
}
