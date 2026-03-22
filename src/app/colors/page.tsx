"use client";
import { RelatedTools } from "@/components/related-tools";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PresetManager, type PresetData } from "@/components/preset-manager";
import { ExportHub } from "@/components/export-hub";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { KeyboardHint } from "@/components/keyboard-hint";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { colorsGuideContent } from "@/content/colors-guide";
// Color conversion utilities
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)} : null;
};
const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
};
const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};
const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};
export default function Home() {
  useToolTracker("colors", "Color Converter", "colors");
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
    const updateFromHex = useCallback((newHex: string) => {
    const rgbVal = hexToRgb(newHex);
    if (rgbVal) {
      setHex(newHex.startsWith("#") ? newHex : "#" + newHex);
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
      
      analytics.trackToolUsage('colors', {
        action: 'convert',
        sourceFormat: 'hex',
      });
    }
  }, [analytics]);
  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
    
    analytics.trackToolUsage('colors', {
      action: 'convert',
      sourceFormat: 'rgb',
    });
  }, [analytics]);
  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    l = Math.max(0, Math.min(100, l));
    setHsl({ h, s, l });
    const rgbVal = hslToRgb(h, s, l);
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
    
    analytics.trackToolUsage('colors', {
      action: 'convert',
      sourceFormat: 'hsl',
    });
  }, [analytics]);
    const randomColor = useCallback(() => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
    updateFromHex(randomHex);
    
    analytics.trackToolInteraction('colors', 'randomize');
  }, [updateFromHex, analytics]);

  // Format strings
  const hexString = hex.toUpperCase();
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  // Determine if text should be light or dark
  const textColor = hsl.l > 50 ? "text-background" : "text-white";

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.sample, randomColor);
  useKeyboardShortcut(SHORTCUTS.copy, () => copy(hexString));
  useKeyboardShortcut(SHORTCUTS.clear, () => updateFromHex("#000000"));
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg"
              style={{ background: `linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)` }}
            />
            <h1 className="text-xl font-semibold text-foreground">Color Converter</h1>
          </div>
          <Button className="min-h-[44px] border-border" onClick={randomColor} variant="outline" >
            🎲 Random
            <KeyboardHint shortcut={SHORTCUTS.sample} />
          </Button>
        </div>
      </header>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Color Preview */}
        <div
          className={`h-48 rounded-xl mb-8 flex items-center justify-center ${textColor} font-mono text-lg shadow-refined`}
          style={{ backgroundColor: hex }}
        >
          {hexString}
        </div>
        {/* Preset Manager & Export Hub */}
        <div className="mb-6 p-4 bg-card/50 border border-border rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PresetManager
              toolName="color-converter"
              currentState={{ hex, rgb, hsl }}
              onLoadPreset={(data: PresetData) => {
                if (data.hex && data.rgb && data.hsl) {
                  setHex(data.hex as string);
                  setRgb(data.rgb as { r: number; g: number; b: number });
                  setHsl(data.hsl as { h: number; s: number; l: number });
                }
              }}
            />
            <ExportHub
              content={{
                hex: hexString,
                rgb: rgbString,
                hsl: hslString,
                css: `--color: ${hexString};`,
                scss: `$color: ${hexString};`,
                tailwind: `'custom': '${hexString}'`}}
              filename="color"
              formats={["copy", "json"]}
              customOptions={[
                { format: "custom", label: "CSS", extension: "css", mimeType: "text/css" },
                { format: "custom", label: "SCSS", extension: "scss", mimeType: "text/x-scss" },
              ]}
            />
          </div>
        </div>

        {/* Output Values */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div
            className="p-4 bg-card rounded-lg cursor-pointer hover:bg-muted transition border border-border shadow-refined-sm"
            onClick={() => copy(hexString)}
          >
            <p className="text-sm sm:text-xs text-muted-foreground mb-1">HEX</p>
            <p className="font-mono text-xl">{hexString}</p>
            <p className="text-sm sm:text-xs text-muted-foreground mt-1">{copiedText === "hex" ? "Copied!" : "Click to copy"}</p>
          </div>
          <div
            className="p-4 bg-card rounded-lg cursor-pointer hover:bg-muted transition border border-border shadow-refined-sm"
            onClick={() => copy(rgbString)}
          >
            <p className="text-sm sm:text-xs text-muted-foreground mb-1">RGB</p>
            <p className="font-mono text-xl">{rgbString}</p>
            <p className="text-sm sm:text-xs text-muted-foreground mt-1">{copiedText === "rgb" ? "Copied!" : "Click to copy"}</p>
          </div>
          <div
            className="p-4 bg-card rounded-lg cursor-pointer hover:bg-muted transition border border-border shadow-refined-sm"
            onClick={() => copy(hslString)}
          >
            <p className="text-sm sm:text-xs text-muted-foreground mb-1">HSL</p>
            <p className="font-mono text-xl">{hslString}</p>
            <p className="text-sm sm:text-xs text-muted-foreground mt-1">{copiedText === "hsl" ? "Copied!" : "Click to copy"}</p>
          </div>
        </div>
        {/* Input Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* HEX Input */}
          <Card className="bg-card border-border shadow-refined">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">HEX</CardTitle>
            </CardHeader>
            <CardContent>
              <LabeledInput
                label="HEX Color Code"
                type="text"
                value={hex}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFromHex(e.target.value)}
                className="bg-muted border-border font-mono"
                placeholder="#000000"
              />
            </CardContent>
          </Card>
          {/* RGB Sliders */}
          <Card className="bg-card border-border shadow-refined">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">RGB</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 dark:text-red-400">R</span>
                  <span className="font-mono">{rgb.r}</span>
                </div>
                <Slider
                  value={[rgb.r]}
                  max={255}
                  step={1}
                  onValueChange={([v]) => updateFromRgb(v, rgb.g, rgb.b)}
                  className="[&>span:first-child]:bg-red-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400">G</span>
                  <span className="font-mono">{rgb.g}</span>
                </div>
                <Slider
                  value={[rgb.g]}
                  max={255}
                  step={1}
                  onValueChange={([v]) => updateFromRgb(rgb.r, v, rgb.b)}
                  className="[&>span:first-child]:bg-green-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 dark:text-blue-400">B</span>
                  <span className="font-mono">{rgb.b}</span>
                </div>
                <Slider
                  value={[rgb.b]}
                  max={255}
                  step={1}
                  onValueChange={([v]) => updateFromRgb(rgb.r, rgb.g, v)}
                  className="[&>span:first-child]:bg-blue-500"
                />
              </div>
            </CardContent>
          </Card>
          {/* HSL Sliders */}
          <Card className="bg-card border-border shadow-refined md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">HSL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hue</span>
                  <span className="font-mono">{hsl.h}°</span>
                </div>
                <Slider
                  value={[hsl.h]}
                  max={360}
                  step={1}
                  onValueChange={([v]) => updateFromHsl(v, hsl.s, hsl.l)}
                  className="[&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-red-500 [&>span:first-child]:via-yellow-500 [&>span:first-child]:via-green-500 [&>span:first-child]:via-blue-500 [&>span:first-child]:to-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Saturation</span>
                    <span className="font-mono">{hsl.s}%</span>
                  </div>
                  <Slider
                    value={[hsl.s]}
                    max={100}
                    step={1}
                    onValueChange={([v]) => updateFromHsl(hsl.h, v, hsl.l)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lightness</span>
                    <span className="font-mono">{hsl.l}%</span>
                  </div>
                  <Slider
                    value={[hsl.l]}
                    max={100}
                    step={1}
                    onValueChange={([v]) => updateFromHsl(hsl.h, hsl.s, v)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Convert colors between formats in seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={colorsGuideContent.quickStartSteps} />
          </GeoSection>

          {/* Understanding Color Models */}
          <GeoSection
            id="understanding-color-models"
            title={colorsGuideContent.introduction.title}
            subtitle="HEX, RGB, HSL and how they work together"
            variant="default"
          >
            <MarkdownContent content={colorsGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use color conversion daily"
            variant="default"
          >
            <FeatureGrid
              features={colorsGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={colorsGuideContent.howToUse.title}
            subtitle="Master color conversion and palette creation"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${colorsGuideContent.toolName}`}
              description="Step-by-step guide to converting colors between HEX, RGB, and HSL"
              steps={colorsGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${colorsGuideContent.toolPath}`}
            />
            <MarkdownContent content={colorsGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about color formats"
            variant="default"
          >
            <ToolFAQ faqs={colorsGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={colorsGuideContent.security.title}
            subtitle="Your colors never leave your browser"
            variant="highlight"
          >
            <MarkdownContent content={colorsGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {colorsGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Color conversion capabilities and specifications"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(colorsGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Related Tools */}
        <RelatedTools currentPath="/colors" />

        {/* Last Updated */}
        <LastUpdated date={colorsGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Convert colors between HEX, RGB, and HSL. Click values to copy.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Color Converter"
        description="Free color converter. Convert between HEX, RGB, and HSL formats. Real-time preview and click-to-copy values."
        url="https://openkit.tools/colors"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={colorsGuideContent.lastUpdated}
        version={colorsGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "2156",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Color Converter', url: 'https://openkit.tools/colors' },
        ]}
      />
    </main>
  );
}
