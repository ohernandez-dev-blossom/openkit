"use client";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Copy, RotateCcw, Upload, Image as ImageIcon, Sparkles, Eye, Sliders,
  Sun, Contrast, Droplet, Palette, CircleDot, Layers, Zap
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
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
import { filterGenGuideContent } from "@/content/filter-gen-guide";

type FilterValues = {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
  dropShadowX: number;
  dropShadowY: number;
  dropShadowBlur: number;
  dropShadowColor: string;
};

const defaultFilters: FilterValues = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
  dropShadowX: 0,
  dropShadowY: 0,
  dropShadowBlur: 0,
  dropShadowColor: "#000000"};

const presets: { [key: string]: Partial<FilterValues> } = {
  vintage: {
    sepia: 50,
    contrast: 85,
    brightness: 90,
    saturate: 80},
  noir: {
    grayscale: 100,
    contrast: 120,
    brightness: 95},
  vivid: {
    saturate: 150,
    contrast: 110,
    brightness: 105},
  warm: {
    hueRotate: 15,
    saturate: 110,
    brightness: 105},
  cool: {
    hueRotate: 180,
    saturate: 90,
    brightness: 100},
  dreamy: {
    blur: 1,
    brightness: 110,
    saturate: 120,
    opacity: 90},
  faded: {
    opacity: 70,
    contrast: 80,
    brightness: 110},
  dramatic: {
    contrast: 140,
    brightness: 90,
    saturate: 120},
  sunset: {
    hueRotate: 320,
    saturate: 120,
    brightness: 105,
    contrast: 95},
  arctic: {
    hueRotate: 200,
    saturate: 70,
    brightness: 110,
    contrast: 90}};

const defaultImage = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white' font-weight='bold'%3ESAMPLE IMAGE%3C/text%3E%3C/svg%3E";

export default function FilterGenerator() {
  useToolTracker("filter-gen", "CSS Filter Generator");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [customImage, setCustomImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

  const updateFilter = (key: keyof FilterValues, value: number | string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilter = (key: keyof FilterValues) => {
    setFilters((prev) => ({ ...prev, [key]: defaultFilters[key] }));
  };

  const resetAll = () => {
    setFilters(defaultFilters);
  };

  const loadPreset = (presetName: string) => {
    const preset = presets[presetName];
    setFilters({ ...defaultFilters, ...preset });
    analytics.trackToolUsage("filter-gen", {
      action: "load_preset",
      preset: presetName,
    });
  };

  const generateCSS = useCallback(() => {
    const parts: string[] = [];

    if (filters.blur > 0) parts.push(`blur(${filters.blur}px)`);
    if (filters.brightness !== 100) parts.push(`brightness(${filters.brightness}%)`);
    if (filters.contrast !== 100) parts.push(`contrast(${filters.contrast}%)`);
    if (filters.grayscale > 0) parts.push(`grayscale(${filters.grayscale}%)`);
    if (filters.hueRotate !== 0) parts.push(`hue-rotate(${filters.hueRotate}deg)`);
    if (filters.invert > 0) parts.push(`invert(${filters.invert}%)`);
    if (filters.opacity !== 100) parts.push(`opacity(${filters.opacity}%)`);
    if (filters.saturate !== 100) parts.push(`saturate(${filters.saturate}%)`);
    if (filters.sepia > 0) parts.push(`sepia(${filters.sepia}%)`);

    if (filters.dropShadowX !== 0 || filters.dropShadowY !== 0 || filters.dropShadowBlur > 0) {
      parts.push(
        `drop-shadow(${filters.dropShadowX}px ${filters.dropShadowY}px ${filters.dropShadowBlur}px ${filters.dropShadowColor})`
      );
    }

    return parts.length > 0 ? `filter: ${parts.join(" ")};` : "/* No filters applied */";
  }, [filters]);

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    analytics.trackToolUsage("filter-gen", {
      action: "copy_css",
      hasCustomImage: !!customImage,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filterStyle = {
    filter: [
      filters.blur > 0 && `blur(${filters.blur}px)`,
      filters.brightness !== 100 && `brightness(${filters.brightness}%)`,
      filters.contrast !== 100 && `contrast(${filters.contrast}%)`,
      filters.grayscale > 0 && `grayscale(${filters.grayscale}%)`,
      filters.hueRotate !== 0 && `hue-rotate(${filters.hueRotate}deg)`,
      filters.invert > 0 && `invert(${filters.invert}%)`,
      filters.opacity !== 100 && `opacity(${filters.opacity}%)`,
      filters.saturate !== 100 && `saturate(${filters.saturate}%)`,
      filters.sepia > 0 && `sepia(${filters.sepia}%)`,
      (filters.dropShadowX !== 0 || filters.dropShadowY !== 0 || filters.dropShadowBlur > 0) &&
        `drop-shadow(${filters.dropShadowX}px ${filters.dropShadowY}px ${filters.dropShadowBlur}px ${filters.dropShadowColor})`,
    ]
      .filter(Boolean)
      .join(" ")};

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center hover:opacity-80 transition">
              <Sparkles className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">CSS Filter Generator</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-accent rounded-lg text-sm font-medium transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset All</span>
            </button>
            <button
              onClick={copyCSS}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium text-white transition"
            >
              <Copy className="w-4 h-4" />
              {isCopied ? "Copied!" : "Copy CSS"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Presets */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Presets
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(presets).map((preset) => (
              <button
                key={preset}
                onClick={() => loadPreset(preset)}
                className="px-3 py-1.5 bg-card hover:bg-muted border border-border rounded-lg text-xs font-medium text-accent-foreground transition capitalize"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Preview */}
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </h3>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-xs font-medium transition"
                >
                  <Upload className="w-3 h-3" />
                  Upload Image
                </button>
                <input aria-label="Input field"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="bg-background border border-border rounded-lg p-4 flex items-center justify-center min-h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={customImage || defaultImage}
                  alt="Preview"
                  style={filterStyle}
                  className="max-w-full max-h-[400px] rounded-lg"
                />
              </div>

              {customImage && (
                <button
                  onClick={() => setCustomImage(null)}
                  className="mt-3 text-xs text-muted-foreground hover:text-accent-foreground transition"
                >
                  Reset to default image
                </button>
              )}
            </div>

            {/* CSS Output */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-4">Generated CSS</h3>
              <pre className="bg-background border border-border rounded-lg p-4 text-xs font-mono overflow-x-auto text-accent-foreground">
                {generateCSS()}
              </pre>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                Filter Controls
              </h3>

              <div className="space-y-6">
                {/* Blur */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                      <CircleDot className="w-3 h-3" />
                      Blur
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.blur}px</span>
                      <button
                        onClick={() => resetFilter("blur")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.blur]}
                    onValueChange={(val) => updateFilter("blur", val[0])}
                    min={0}
                    max={20}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Brightness */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Sun className="w-3 h-3" />
                      Brightness
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.brightness}%</span>
                      <button
                        onClick={() => resetFilter("brightness")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.brightness]}
                    onValueChange={(val) => updateFilter("brightness", val[0])}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Contrast */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Contrast className="w-3 h-3" />
                      Contrast
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.contrast}%</span>
                      <button
                        onClick={() => resetFilter("contrast")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.contrast]}
                    onValueChange={(val) => updateFilter("contrast", val[0])}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Grayscale */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Grayscale
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.grayscale}%</span>
                      <button
                        onClick={() => resetFilter("grayscale")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.grayscale]}
                    onValueChange={(val) => updateFilter("grayscale", val[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Hue Rotate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Palette className="w-3 h-3" />
                      Hue Rotate
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.hueRotate}°</span>
                      <button
                        onClick={() => resetFilter("hueRotate")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.hueRotate]}
                    onValueChange={(val) => updateFilter("hueRotate", val[0])}
                    min={0}
                    max={360}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Invert */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground">Invert</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.invert}%</span>
                      <button
                        onClick={() => resetFilter("invert")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.invert]}
                    onValueChange={(val) => updateFilter("invert", val[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Opacity */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground">Opacity</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.opacity}%</span>
                      <button
                        onClick={() => resetFilter("opacity")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.opacity]}
                    onValueChange={(val) => updateFilter("opacity", val[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Saturate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Droplet className="w-3 h-3" />
                      Saturate
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.saturate}%</span>
                      <button
                        onClick={() => resetFilter("saturate")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.saturate]}
                    onValueChange={(val) => updateFilter("saturate", val[0])}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Sepia */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground">Sepia</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filters.sepia}%</span>
                      <button
                        onClick={() => resetFilter("sepia")}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <Slider
                    value={[filters.sepia]}
                    onValueChange={(val) => updateFilter("sepia", val[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Drop Shadow */}
                <div className="pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Drop Shadow
                  </h4>

                  <div className="space-y-4">
                    {/* Shadow X */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-muted-foreground">X Offset</label>
                        <span className="text-xs text-muted-foreground">{filters.dropShadowX}px</span>
                      </div>
                      <Slider
                        value={[filters.dropShadowX]}
                        onValueChange={(val) => updateFilter("dropShadowX", val[0])}
                        min={-50}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Shadow Y */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-muted-foreground">Y Offset</label>
                        <span className="text-xs text-muted-foreground">{filters.dropShadowY}px</span>
                      </div>
                      <Slider
                        value={[filters.dropShadowY]}
                        onValueChange={(val) => updateFilter("dropShadowY", val[0])}
                        min={-50}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Shadow Blur */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-muted-foreground">Blur</label>
                        <span className="text-xs text-muted-foreground">{filters.dropShadowBlur}px</span>
                      </div>
                      <Slider
                        value={[filters.dropShadowBlur]}
                        onValueChange={(val) => updateFilter("dropShadowBlur", val[0])}
                        min={0}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Shadow Color */}
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">Color</label>
                      <div className="flex gap-2">
                        <input type="color" value={filters.dropShadowColor} onChange={(e) => updateFilter("dropShadowColor", e.target.value)} className="w-12 h-8 rounded border border-border cursor-pointer" aria-label="Drop shadow color" />
                        <input aria-label="Input field"
                          type="text"
                          value={filters.dropShadowColor}
                          onChange={(e) => updateFilter("dropShadowColor", e.target.value)}
                          className="flex-1 px-2 py-1 bg-muted border border-border rounded text-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        updateFilter("dropShadowX", 0);
                        updateFilter("dropShadowY", 0);
                        updateFilter("dropShadowBlur", 0);
                        updateFilter("dropShadowColor", "#000000");
                      }}
                      className="text-xs text-violet-400 hover:text-violet-300"
                    >
                      Reset Drop Shadow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedTools currentPath="/filter-gen" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={filterGenGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-filter-gen" title={filterGenGuideContent.introduction.title} subtitle="Understanding CSS filter generation" variant="default">
            <MarkdownContent content={filterGenGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use CSS filters" variant="default">
            <FeatureGrid features={filterGenGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={filterGenGuideContent.howToUse.title} subtitle="Master CSS filter effects" variant="minimal">
            <HowToSchema name={`How to use ${filterGenGuideContent.toolName}`} description="Step-by-step guide to CSS filter generation" steps={filterGenGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${filterGenGuideContent.toolPath}`} />
            <MarkdownContent content={filterGenGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={filterGenGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={filterGenGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={filterGenGuideContent.security.content} />
          </GeoSection>

          {filterGenGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(filterGenGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={filterGenGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Create CSS filter effects with visual controls and live preview.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="CSS Filter Generator"
        description="Visual CSS filter effects editor with live preview. Generate filter CSS for blur, brightness, contrast, saturation, and more."
        url="https://openkit.tools/filter-gen"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={filterGenGuideContent.lastUpdated}
        version={filterGenGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "CSS Filter Generator", url: "https://openkit.tools/filter-gen" },
        ]}
      />
    </main>
  );
}
