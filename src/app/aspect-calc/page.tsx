"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Maximize2, Copy, Lock, Unlock, Check } from "lucide-react";
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
import { aspectCalcGuideContent } from "@/content/aspect-calc-guide";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

type Preset = {
  name: string;
  desc: string;
  w: number;
  h: number;
  category: "video" | "portrait" | "photo" | "paper";
};

const presets: Preset[] = [
  // Video/Display
  { name: "16:9", desc: "HD Video", w: 16, h: 9, category: "video" },
  { name: "4:3", desc: "Classic TV", w: 4, h: 3, category: "video" },
  { name: "1:1", desc: "Square", w: 1, h: 1, category: "video" },
  { name: "21:9", desc: "Ultrawide", w: 21, h: 9, category: "video" },

  // Portrait
  { name: "9:16", desc: "Mobile Video", w: 9, h: 16, category: "portrait" },
  { name: "3:4", desc: "Portrait Classic", w: 3, h: 4, category: "portrait" },

  // Photo
  { name: "3:2", desc: "35mm Film", w: 3, h: 2, category: "photo" },
  { name: "2:3", desc: "Portrait Photo", w: 2, h: 3, category: "photo" },

  // Paper
  { name: "A4", desc: "210 × 297 mm", w: 210, h: 297, category: "paper" },
  { name: "Letter", desc: "8.5 × 11 in", w: 85, h: 110, category: "paper" },
];

const categoryColors = {
  video: "from-blue-500 to-blue-600",
  portrait: "from-purple-500 to-purple-600",
  photo: "from-pink-500 to-pink-600",
  paper: "from-orange-500 to-orange-600"};

export default function AspectRatioCalculator() {
  useToolTracker("aspect-calc", "Aspect Ratio Calculator");
  const analytics = useAnalytics();
  const { isCopied, copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [locked, setLocked] = useState(true);
  const [baseRatio, setBaseRatio] = useState({ w: 16, h: 9 });

  // Calculate ratio info
  const ratioInfo = useMemo(() => {
    const w = parseInt(width) || 0;
    const h = parseInt(height) || 0;
    if (w === 0 || h === 0) return { simplified: "—", decimal: "0", percentage: 0 };

    const divisor = gcd(w, h);
    const simplified = `${w / divisor}:${h / divisor}`;
    const decimal = (w / h).toFixed(4);
    const percentage = (w / h) * 100;

    return { simplified, decimal, percentage };
  }, [width, height]);

  // Calculate current ratio (used when unlocked)
  const currentRatio = useMemo(() => {
    const w = parseInt(width) || 1;
    const h = parseInt(height) || 1;
    const divisor = gcd(w, h);
    return { w: w / divisor, h: h / divisor };
  }, [width, height]);

  const handleWidthChange = (value: string) => {
    const w = parseInt(value) || 0;
    setWidth(value);

    if (locked && w > 0) {
      const newHeight = Math.round((w * baseRatio.h) / baseRatio.w);
      setHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (value: string) => {
    const h = parseInt(value) || 0;
    setHeight(value);

    if (locked && h > 0) {
      const newWidth = Math.round((h * baseRatio.w) / baseRatio.h);
      setWidth(newWidth.toString());
    }
  };

  const toggleLock = () => {
    if (!locked) {
      // Locking: save current ratio
      setBaseRatio(currentRatio);
    }
    setLocked(!locked);
    
    analytics.trackToolInteraction('aspect-calc', 'toggle-lock', {
      locked: !locked,
      ratio: `${currentRatio.w}:${currentRatio.h}`,
    });
  };

  const applyPreset = (preset: Preset) => {
    const currentWidth = parseInt(width) || 1920;
    const newHeight = Math.round((currentWidth * preset.h) / preset.w);

    setWidth(currentWidth.toString());
    setHeight(newHeight.toString());
    setBaseRatio({ w: preset.w, h: preset.h });
    setLocked(true);
    
    analytics.trackToolUsage('aspect-calc', {
      action: 'apply-preset',
      preset: preset.name,
      ratio: `${preset.w}:${preset.h}`,
      category: preset.category,
    });
  };


  // Calculate preview box dimensions (scaled to fit container)
  const previewDimensions = useMemo(() => {
    const w = parseInt(width) || 16;
    const h = parseInt(height) || 9;
    const maxSize = 200;

    const ratio = w / h;
    let boxWidth = maxSize;
    let boxHeight = maxSize / ratio;

    if (boxHeight > maxSize) {
      boxHeight = maxSize;
      boxWidth = maxSize * ratio;
    }

    return { width: boxWidth, height: boxHeight };
  }, [width, height]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Maximize2 className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Aspect Ratio Calculator</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Calculate dimensions while maintaining aspect ratio</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Inputs & Controls */}
          <div className="space-y-6">
            {/* Dimensions Input */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-refined">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-medium text-accent-foreground">Dimensions</h3>
                <button
                  onClick={toggleLock}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition ${
                    locked
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-muted text-foreground border border-border hover:border-border"
                  }`}
                >
                  {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  {locked ? "Locked" : "Unlocked"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="page-input-167" className="text-xs text-muted-foreground mb-2 block">Width (px)</label>
                  <input id="page-input-167"
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground text-2xl font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="1920"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-full h-px bg-muted"></div>
                  <span className="px-3 text-muted-foreground/70 text-sm">×</span>
                  <div className="w-full h-px bg-muted"></div>
                </div>

                <div>
                  <label htmlFor="page-input-184" className="text-xs text-muted-foreground mb-2 block">Height (px)</label>
                  <input id="page-input-184"
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground text-2xl font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="1080"
                  />
                </div>
              </div>

              {locked && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-xs text-blue-400">
                    🔒 Ratio locked to <span className="font-mono font-semibold">{baseRatio.w}:{baseRatio.h}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Ratio Display */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => copy(ratioInfo.simplified)}
                className="p-4 bg-card border border-border rounded-xl shadow-refined-sm hover:border-border transition group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Simplified Ratio</span>
                    <Copy className="w-3 h-3 text-muted-foreground/70 group-hover:text-muted-foreground transition" />
                  </div>
                  <div className="text-2xl font-mono text-blue-600 dark:text-blue-400 font-bold">{ratioInfo.simplified}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 group-hover:to-blue-500/10 transition"></div>
              </button>

              <button
                onClick={() => copy(ratioInfo.decimal)}
                className="p-4 bg-card border border-border rounded-xl shadow-refined-sm hover:border-border transition group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Decimal</span>
                    <Copy className="w-3 h-3 text-muted-foreground/70 group-hover:text-muted-foreground transition" />
                  </div>
                  <div className="text-2xl font-mono text-purple-600 dark:text-purple-400 font-bold">{ratioInfo.decimal}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 group-hover:to-purple-500/10 transition"></div>
              </button>
            </div>

            {/* Copy Dimensions */}
            <button
              onClick={() => copy(`${width}×${height}`)}
              className="w-full p-4 bg-card border border-border rounded-xl shadow-refined-sm hover:border-border transition group"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-xs text-muted-foreground mb-1">Copy Dimensions</div>
                  <div className="text-xl font-mono text-green-600 dark:text-green-400">
                    {width} × {height}
                  </div>
                </div>
                {copiedText === "dimensions" ? (
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground/70 group-hover:text-muted-foreground transition" />
                )}
              </div>
            </button>
          </div>

          {/* Right Column: Visual Preview */}
          <div className="space-y-6">
            {/* Visual Preview */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-refined">
              <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-4">Visual Preview</h3>
              <div className="flex items-center justify-center p-8 bg-background rounded-lg border border-border min-h-[280px]">
                <div className="relative">
                  <div
                    className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-xl transition-all duration-300"
                    style={{
                      width: `${previewDimensions.width}px`,
                      height: `${previewDimensions.height}px`}}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white/90">
                        <div className="text-xs font-mono mb-1">{ratioInfo.simplified}</div>
                        <div className="text-[10px] font-mono text-white/60">{width}×{height}</div>
                      </div>
                    </div>
                  </div>

                  {/* Dimension labels */}
                  <div className="absolute -top-6 left-0 right-0 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-mono">{previewDimensions.width.toFixed(0)}px</span>
                  </div>
                  <div className="absolute top-0 bottom-0 -right-8 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-mono transform rotate-90 whitespace-nowrap">{previewDimensions.height.toFixed(0)}px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 bg-card/50 border border-border rounded-xl shadow-refined-sm">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">💡 How to use</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Enter width or height to calculate the other dimension</li>
                <li>• Click the lock icon to lock/unlock the aspect ratio</li>
                <li>• Click any ratio or preset to apply it instantly</li>
                <li>• Click values to copy them to clipboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-accent-foreground mb-4">Common Aspect Ratios</h3>

          <div className="space-y-4">
            {["video", "portrait", "photo", "paper"].map((category) => {
              const categoryPresets = presets.filter((p) => p.category === category);
              const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

              return (
                <div key={category}>
                  <h4 className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]}`}></div>
                    {categoryName}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categoryPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className={`p-3 bg-card border rounded-lg text-left transition group hover:border-border ${
                          ratioInfo.simplified === `${preset.w}:${preset.h}`
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`w-6 h-6 rounded bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} flex items-center justify-center shrink-0`}>
                            <Maximize2 className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-mono text-foreground text-sm">{preset.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{preset.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Copied notification */}
        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2">
            <Check className="w-4 h-4" />
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/aspect-calc" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={aspectCalcGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-aspect-calc" title={aspectCalcGuideContent.introduction.title} subtitle="Understanding aspect ratio calculations" variant="default">
            <MarkdownContent content={aspectCalcGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use aspect ratio calculators" variant="default">
            <FeatureGrid features={aspectCalcGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={aspectCalcGuideContent.howToUse.title} subtitle="Master dimension calculations" variant="minimal">
            <HowToSchema name={`How to use ${aspectCalcGuideContent.toolName}`} description="Step-by-step guide to aspect ratio calculation" steps={aspectCalcGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${aspectCalcGuideContent.toolPath}`} />
            <MarkdownContent content={aspectCalcGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={aspectCalcGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={aspectCalcGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={aspectCalcGuideContent.security.content} />
          </GeoSection>

          {aspectCalcGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(aspectCalcGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={aspectCalcGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate and maintain aspect ratios for images, videos, and designs.</p>
        </div>
      </footer>
      <StructuredData
        type="WebApplication"
        name="Aspect Ratio Calculator - Resize Images & Videos"
        description="Calculate aspect ratios and dimensions for images and videos. Maintain proportions when resizing content."
        url="https://openkit.tools/aspect-calc"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={aspectCalcGuideContent.lastUpdated}
        version={aspectCalcGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Aspect Ratio Calculator', url: 'https://openkit.tools/aspect-calc' },
        ]}
      />
    </main>
  );
}
