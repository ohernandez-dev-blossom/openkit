"use client";

import { RelatedTools } from "@/components/related-tools";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { Check, X, ArrowLeftRight, Lightbulb } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { contrastGuideContent } from "@/content/contrast-guide";

// WCAG Contrast Calculation
// https://www.w3.org/TR/WCAG20-TECHS/G17.html

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)}
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
};

// Calculate relative luminance (WCAG formula)
const getRelativeLuminance = (r: number, g: number, b: number): number => {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const R = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const G = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const B = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

// Calculate contrast ratio
const getContrastRatio = (hex1: string, hex2: string): number => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

// WCAG compliance levels
const WCAG_LEVELS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5};

type WCAGLevel = {
  name: string;
  ratio: number;
  passes: boolean;
  description: string;
};

// Color presets
const COLOR_PRESETS = [
  { name: "Black on White", fg: "#000000", bg: "#FFFFFF" },
  { name: "White on Black", fg: "#FFFFFF", bg: "#000000" },
  { name: "Blue on White", fg: "#0066CC", bg: "#FFFFFF" },
  { name: "Dark Gray on Light", fg: "#333333", bg: "#F5F5F5" },
  { name: "Green on White", fg: "#008000", bg: "#FFFFFF" },
  { name: "Navy on Cream", fg: "#001F3F", bg: "#FFF8DC" },
];

export default function ContrastChecker() {
  useToolTracker("contrast", "Color Contrast Checker", "colors");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");

  // Calculate contrast ratio
  const contrastRatio = useMemo(() => {
    const ratio = getContrastRatio(foreground, background);
    analytics.trackToolUsage('contrast', {
      action: 'check',
      ratio: ratio.toFixed(2),
      passesAA: ratio >= 4.5,
    });
    return ratio;
  }, [foreground, background, analytics]);

  // Check WCAG compliance
  const wcagLevels: WCAGLevel[] = useMemo(() => {
    return [
      {
        name: "AA Normal Text",
        ratio: WCAG_LEVELS.AA_NORMAL,
        passes: contrastRatio >= WCAG_LEVELS.AA_NORMAL,
        description: "Minimum contrast for body text (14pt and below)"},
      {
        name: "AA Large Text",
        ratio: WCAG_LEVELS.AA_LARGE,
        passes: contrastRatio >= WCAG_LEVELS.AA_LARGE,
        description: "Minimum contrast for large text (18pt+ or 14pt+ bold)"},
      {
        name: "AAA Normal Text",
        ratio: WCAG_LEVELS.AAA_NORMAL,
        passes: contrastRatio >= WCAG_LEVELS.AAA_NORMAL,
        description: "Enhanced contrast for body text"},
      {
        name: "AAA Large Text",
        ratio: WCAG_LEVELS.AAA_LARGE,
        passes: contrastRatio >= WCAG_LEVELS.AAA_LARGE,
        description: "Enhanced contrast for large text"},
    ];
  }, [contrastRatio]);

  // Swap colors
  const swapColors = useCallback(() => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  }, [foreground, background]);

  // Apply preset
  const applyPreset = useCallback((fg: string, bg: string) => {
    setForeground(fg);
    setBackground(bg);
  }, []);

  // Generate suggestion to pass AA Normal
  const getSuggestion = useCallback(() => {
    if (contrastRatio >= WCAG_LEVELS.AA_NORMAL) return null;

    const fgRgb = hexToRgb(foreground);
    const bgRgb = hexToRgb(background);
    if (!fgRgb || !bgRgb) return null;

    const bgLum = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    // Try making foreground darker or lighter
    let suggestedFg: string | null = null;

    for (let brightness = 0; brightness <= 255; brightness += 5) {
      const testRgb = { r: brightness, g: brightness, b: brightness };
      const testLum = getRelativeLuminance(testRgb.r, testRgb.g, testRgb.b);

      const lighter = Math.max(testLum, bgLum);
      const darker = Math.min(testLum, bgLum);
      const ratio = (lighter + 0.05) / (darker + 0.05);

      if (ratio >= WCAG_LEVELS.AA_NORMAL) {
        suggestedFg = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
        break;
      }
    }

    return suggestedFg;
  }, [foreground, background, contrastRatio]);

  const suggestion = getSuggestion();

  // Apply suggestion
  const applySuggestion = useCallback(() => {
    if (suggestion) {
      setForeground(suggestion);
    }
  }, [suggestion]);

  // Copy contrast ratio
  const copyRatio = useCallback(() => {
    navigator.clipboard.writeText(contrastRatio.toFixed(2) + ":1");
  }, [contrastRatio]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Color Contrast Checker</h1>
          </div>
          <Button
            onClick={swapColors}
            variant="outline"
            className="border-border flex items-center gap-2"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Swap
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Color Inputs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Foreground Color */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Foreground (Text)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-2 border-border" aria-label="Foreground color picker" />
                <div className="flex-1">
                  <input aria-label="Input field"
                    type="text"
                    value={foreground.toUpperCase()}
                    onChange={(e) => setForeground(e.target.value)}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background Color */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-2 border-border" aria-label="Background color picker" />
                <div className="flex-1">
                  <input aria-label="Input field"
                    type="text"
                    value={background.toUpperCase()}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contrast Ratio Display */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="py-6 sm:py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Contrast Ratio</p>
              <div
                onClick={copyRatio}
                className="text-5xl font-bold mb-2 cursor-pointer hover:text-pink-400 transition"
                title="Click to copy"
              >
                {contrastRatio.toFixed(2)}:1
              </div>
              <p className="text-sm sm:text-xs text-muted-foreground">
                {isCopied ? "Copied!" : "Click to copy"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: background, color: foreground }}
            >
              <h2 className="text-2xl font-bold mb-2">Normal Text (16px)</h2>
              <p className="mb-4">
                The quick brown fox jumps over the lazy dog. This is a sample
                paragraph to demonstrate how text appears with the selected
                color combination.
              </p>
              <h3 className="text-xl font-bold mb-2">Large Text (18px+)</h3>
              <p className="text-lg">
                This is large text. WCAG considers text to be &quot;large&quot; if it is at
                least 18pt (24px) or 14pt (18.66px) and bold.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* WCAG Compliance */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">WCAG Compliance Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {wcagLevels.map((level) => (
                <div
                  key={level.name}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {level.passes ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                      <span className="font-semibold">{level.name}</span>
                      <span className="text-sm sm:text-xs text-muted-foreground">
                        (≥ {level.ratio}:1)
                      </span>
                    </div>
                    <p className="text-sm sm:text-xs text-muted-foreground ml-7">
                      {level.description}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      level.passes
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {level.passes ? "PASS" : "FAIL"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggestion */}
        {suggestion && (
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 mb-8">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <CardTitle className="text-base text-yellow-300">
                  Suggestion
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-2">
                    Try this foreground color to pass AA Normal Text:
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-lg border-2 border-border"
                      style={{ backgroundColor: suggestion }}
                    />
                    <span className="font-mono text-sm">{suggestion.toUpperCase()}</span>
                  </div>
                </div>
                <Button
                  onClick={applySuggestion}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Color Presets */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Common Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COLOR_PRESETS.map((preset) => {
                const ratio = getContrastRatio(preset.fg, preset.bg);
                const passes = ratio >= WCAG_LEVELS.AA_NORMAL;

                return (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset.fg, preset.bg)}
                    className="p-4 bg-muted hover:bg-accent rounded-lg text-left transition border border-border"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: preset.bg,
                          color: preset.fg}}
                      >
                        Aa
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {preset.name}
                        </p>
                        <p className="text-sm sm:text-xs text-muted-foreground">
                          {ratio.toFixed(2)}:1
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${
                        passes
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {passes ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      {passes ? "AA Pass" : "AA Fail"}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Tools */}
      <RelatedTools currentPath="/contrast" />

      {/* GEO Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={contrastGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-contrast" title={contrastGuideContent.introduction.title} subtitle="Understanding WCAG contrast requirements" variant="default">
            <MarkdownContent content={contrastGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers ensure accessibility" variant="default">
            <FeatureGrid features={contrastGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={contrastGuideContent.howToUse.title} subtitle="Master WCAG contrast validation" variant="minimal">
            <HowToSchema name={`How to use ${contrastGuideContent.toolName}`} description="Step-by-step guide to contrast checking" steps={contrastGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${contrastGuideContent.toolPath}`} />
            <MarkdownContent content={contrastGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={contrastGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={contrastGuideContent.security.title} subtitle="Your color data never leaves your browser" variant="highlight">
            <MarkdownContent content={contrastGuideContent.security.content} />
          </GeoSection>

          {contrastGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(contrastGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={contrastGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Check color contrast ratios for WCAG compliance. Ensure your text is
            readable and accessible.
          </p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Color Contrast Checker"
        description="Free WCAG color contrast checker. Test accessibility compliance for AA and AAA levels. Real-time preview and color suggestions."
        url="https://openkit.tools/contrast"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={contrastGuideContent.lastUpdated}
        version={contrastGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Color Contrast Checker", url: "https://openkit.tools/contrast" },
        ]}
      />
    </main>
  );
}
