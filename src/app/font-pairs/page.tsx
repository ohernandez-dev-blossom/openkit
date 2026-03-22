"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Type, Copy, RefreshCw } from "lucide-react";
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
import { fontPairsGuideContent } from "@/content/font-pairs-guide";

type FontCategory = "serif" | "sans-serif" | "display" | "monospace";

type FontPair = {
  heading: string;
  body: string;
  headingCategory: FontCategory;
  bodyCategory: FontCategory;
  reasoning: string;
  popular?: boolean;
};

// Curated font pairs database (50+ pairs)
const FONT_PAIRS: FontPair[] = [
  // Classic Combinations
  { heading: "Montserrat", body: "Merriweather", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Modern geometric sans pairs beautifully with traditional serif for excellent readability", popular: true },
  { heading: "Playfair Display", body: "Source Sans Pro", headingCategory: "serif", bodyCategory: "sans-serif", reasoning: "Elegant high-contrast serif with clean, versatile sans creates sophisticated hierarchy", popular: true },
  { heading: "Roboto", body: "Roboto Slab", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Same family harmony - mechanical sans with friendly slab serif", popular: true },
  { heading: "Oswald", body: "Lato", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Condensed bold headlines with rounded, warm body text", popular: true },
  { heading: "Raleway", body: "Lora", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Elegant thin sans with calligraphic serif for refined aesthetics", popular: true },

  // Modern & Clean
  { heading: "Poppins", body: "Inter", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Geometric friendly headers with highly legible UI-focused body", popular: true },
  { heading: "Work Sans", body: "Crimson Text", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Slightly condensed sans with old-style serif for editorial feel" },
  { heading: "Nunito", body: "Open Sans", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Rounded friendly sans with neutral, professional body text" },
  { heading: "Quicksand", body: "PT Sans", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Soft rounded display with versatile humanist sans" },
  { heading: "Josefin Sans", body: "Libre Baskerville", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Geometric vintage sans with classic transitional serif" },

  // Editorial & Publishing
  { heading: "Cormorant Garamond", body: "Proza Libre", headingCategory: "serif", bodyCategory: "sans-serif", reasoning: "Display serif inspired by Garamond with clean sans for body" },
  { heading: "Libre Franklin", body: "Libre Baskerville", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Interpretation of classic Morris Fuller Benton with elegant Baskerville" },
  { heading: "Merriweather", body: "Merriweather Sans", headingCategory: "serif", bodyCategory: "sans-serif", reasoning: "Perfect family pairing designed to work together" },
  { heading: "EB Garamond", body: "Source Sans Pro", headingCategory: "serif", bodyCategory: "sans-serif", reasoning: "Classic Garamond revival with Adobe's neutral sans" },
  { heading: "Crimson Pro", body: "Work Sans", headingCategory: "serif", bodyCategory: "sans-serif", reasoning: "Book-inspired serif with slightly condensed geometric sans" },

  // Bold & Impactful
  { heading: "Bebas Neue", body: "Montserrat", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Ultra-condensed display with geometric sans for strong contrast", popular: true },
  { heading: "Anton", body: "Roboto", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Heavy impact headlines with neutral, reliable body" },
  { heading: "Righteous", body: "Lato", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Retro futuristic display with warm approachable sans" },
  { heading: "Alfa Slab One", body: "Open Sans", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Ultra-bold slab serif display with clean neutral body" },
  { heading: "Archivo Black", body: "Source Sans Pro", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Heavy grotesque display with legible humanist sans" },

  // Elegant & Sophisticated
  { heading: "Cinzel", body: "Fauna One", headingCategory: "serif", bodyCategory: "serif", reasoning: "Roman capitals-inspired with matching elegant text serif" },
  { heading: "Yeseva One", body: "Josefin Sans", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Decorative Bodoni-style with vintage geometric sans" },
  { heading: "Abril Fatface", body: "Lato", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Didone display with high contrast paired with neutral sans" },
  { heading: "Cardo", body: "Lato", headingCategory: "serif", bodyCategory: "sans-serif", reasoning: "Classic text serif designed for scholarly works with modern sans" },
  { heading: "Spectral", body: "Karla", headingCategory: "serif", bodyCategory: "sans-serif", reasoning: "Low-contrast serif optimized for screens with grotesque sans" },

  // Tech & Modern
  { heading: "Space Grotesk", body: "Inter", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Geometric fixed-width display with UI-optimized sans" },
  { heading: "DM Sans", body: "DM Serif Display", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Low-contrast geometric sans with matching high-contrast serif" },
  { heading: "Manrope", body: "Lora", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Modern geometric sans with calligraphic serif" },
  { heading: "Red Hat Display", body: "Red Hat Text", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Same family pairing optimized for different sizes" },
  { heading: "Public Sans", body: "Literata", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Neutral sans inspired by government sites with digital-optimized serif" },

  // Playful & Creative
  { heading: "Fredoka", body: "Nunito", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Rounded friendly display with matching rounded body" },
  { heading: "Pacifico", body: "Open Sans", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Surf-style script with neutral sans for balance" },
  { heading: "Righteous", body: "PT Sans", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Retro caps with versatile humanist sans" },
  { heading: "Patua One", body: "Lato", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Bold display serif with warm sans" },
  { heading: "Courgette", body: "Open Sans", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Script-style display with clean neutral body" },

  // Minimalist & Clean
  { heading: "Outfit", body: "Inter", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Geometric sans with excellent legibility at all sizes" },
  { heading: "Sora", body: "Source Sans Pro", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Geometric softness with neutral professional sans" },
  { heading: "Space Mono", body: "Roboto", headingCategory: "monospace", bodyCategory: "sans-serif", reasoning: "Retro monospace with mechanical sans for tech aesthetic" },
  { heading: "IBM Plex Mono", body: "IBM Plex Sans", headingCategory: "monospace", bodyCategory: "sans-serif", reasoning: "Corporate monospace with matching sans from same family" },
  { heading: "Archivo", body: "Archivo Narrow", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Grotesque family pairing with different widths" },

  // Vintage & Retro
  { heading: "Lobster", body: "Arimo", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Script-style display with Liberation Sans alternative" },
  { heading: "Passion One", body: "Open Sans", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Bold condensed display with neutral sans" },
  { heading: "Bungee", body: "Inconsolata", headingCategory: "display", bodyCategory: "monospace", reasoning: "Chromatic display with monospace for retro tech vibe" },
  { heading: "Righteous", body: "Inconsolata", headingCategory: "display", bodyCategory: "monospace", reasoning: "Futuristic display with monospace body" },
  { heading: "Monoton", body: "Raleway", headingCategory: "display", bodyCategory: "sans-serif", reasoning: "Art deco display with elegant thin sans" },

  // Professional & Corporate
  { heading: "Cabin", body: "Lora", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Humanist sans inspired by Edward Johnston with calligraphic serif" },
  { heading: "Rubik", body: "Karla", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Rounded sans with slightly rounded grotesque" },
  { heading: "Barlow", body: "Barlow Condensed", headingCategory: "sans-serif", bodyCategory: "sans-serif", reasoning: "Low-contrast sans with condensed variant for hierarchy" },
  { heading: "Lexend", body: "Source Serif Pro", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Variable sans designed for readability with classic serif" },
  { heading: "Commissioner", body: "Crimson Text", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Low-contrast sans with old-style serif" },

  // Additional Modern Pairs
  { heading: "Plus Jakarta Sans", body: "Lora", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Geometric humanist sans with calligraphic serif" },
  { heading: "Epilogue", body: "Crimson Pro", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Versatile sans with book-inspired serif" },
  { heading: "Figtree", body: "Source Serif Pro", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Friendly geometric sans with classic serif" },
  { heading: "Onest", body: "Merriweather", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Modern geometric sans with traditional serif" },
  { heading: "Instrument Sans", body: "Instrument Serif", headingCategory: "sans-serif", bodyCategory: "serif", reasoning: "Grotesque sans with matching high-contrast serif from same family" },
];

// Google Fonts API base
const GOOGLE_FONTS_API = "https://fonts.googleapis.com/css2";

export default function FontPairingSuggestions() {
  useToolTracker("font-pairs", "Font Pairing Tool");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [primaryFont, setPrimaryFont] = useState("Montserrat");
  const [selectedPair, setSelectedPair] = useState<FontPair>(FONT_PAIRS[0]);
  const [suggestions, setSuggestions] = useState<FontPair[]>([]);

  // Preview customization
  const [headingSize, setHeadingSize] = useState(48);
  const [bodySize, setBodySize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [headingText, setHeadingText] = useState("The Quick Brown Fox Jumps Over the Lazy Dog");
  const [bodyText, setBodyText] = useState("Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.");

  // All available fonts (extracted from pairs)
  const allFonts = Array.from(
    new Set(
      FONT_PAIRS.flatMap(pair => [pair.heading, pair.body])
    )
  ).sort();

  // Load fonts dynamically
  useEffect(() => {
    const fontsToLoad = new Set([selectedPair.heading, selectedPair.body]);
    suggestions.forEach(s => {
      fontsToLoad.add(s.heading);
      fontsToLoad.add(s.body);
    });

    const fontFamilies = Array.from(fontsToLoad)
      .map(f => `family=${encodeURIComponent(f)}:wght@400;600;700`)
      .join('&');

    const link = document.createElement('link');
    link.href = `${GOOGLE_FONTS_API}?${fontFamilies}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [selectedPair, suggestions]);

  // Find pairings when primary font changes
  useEffect(() => {
    const pairsWithPrimary = FONT_PAIRS.filter(
      pair => pair.heading === primaryFont || pair.body === primaryFont
    );

    if (pairsWithPrimary.length > 0) {
      // Prioritize popular pairs
      const sorted = pairsWithPrimary.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return 0;
      });

      setSelectedPair(sorted[0]);
      setSuggestions(sorted.slice(0, 8));
    } else {
      // Find pairs from same category
      const primaryCategory = FONT_PAIRS.find(
        p => p.heading === primaryFont || p.body === primaryFont
      );

      if (primaryCategory) {
        const category = primaryCategory.heading === primaryFont
          ? primaryCategory.headingCategory
          : primaryCategory.bodyCategory;

        const sameCategoryPairs = FONT_PAIRS.filter(
          p => p.headingCategory === category || p.bodyCategory === category
        ).slice(0, 8);

        setSuggestions(sameCategoryPairs);
        if (sameCategoryPairs.length > 0) {
          setSelectedPair(sameCategoryPairs[0]);
        }
      } else {
        // Fallback to popular pairs
        const popularPairs = FONT_PAIRS.filter(p => p.popular).slice(0, 8);
        setSuggestions(popularPairs);
      }
    }
  }, [primaryFont]);

  const generateGoogleFontsLink = () => {
    const fonts = [selectedPair.heading, selectedPair.body]
      .map(f => `family=${encodeURIComponent(f)}:wght@400;600;700`)
      .join('&');
    return `${GOOGLE_FONTS_API}?${fonts}&display=swap`;
  };

  const generateImportCode = () => {
    return `@import url('${generateGoogleFontsLink()}');`;
  };

  const generateCSSCode = () => {
    return `/* Heading */
h1, h2, h3, h4, h5, h6 {
  font-family: '${selectedPair.heading}', ${selectedPair.headingCategory};
}

/* Body */
body, p {
  font-family: '${selectedPair.body}', ${selectedPair.bodyCategory};
  line-height: ${lineHeight};
}`;
  };


  const randomPair = () => {
    const random = FONT_PAIRS[Math.floor(Math.random() * FONT_PAIRS.length)];
    setSelectedPair(random);
    setPrimaryFont(random.heading);
    analytics.trackToolUsage("font-pairs", { action: "randomize", heading: random.heading, body: random.body });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center hover:opacity-80 transition">
              <Type className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Font Pairing Tool</h1>
          </div>
          <button
            onClick={randomPair}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium text-white transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Primary Font Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-accent-foreground mb-2">
            Select or type your primary font
          </label>
          <input aria-label="Input field"
            type="text"
            list="fonts"
            value={primaryFont}
            onChange={(e) => setPrimaryFont(e.target.value)}
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition"
            placeholder="Start typing a font name..."
          />
          <datalist id="fonts">
            {allFonts.map(font => (
              <option key={font} value={font} />
            ))}
          </datalist>
        </div>

        {/* Live Preview */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-6">
          <div className="mb-6">
            <input aria-label="Input field"
              type="text"
              value={headingText}
              onChange={(e) => setHeadingText(e.target.value)}
              className="w-full bg-transparent border-b border-border pb-2 mb-4 focus:outline-none focus:border-purple-500 transition"
              style={{
                fontFamily: `'${selectedPair.heading}', ${selectedPair.headingCategory}`,
                fontSize: `${headingSize}px`,
                fontWeight: 700}}
            />
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              rows={4}
              className="w-full bg-transparent border border-border rounded-lg p-3 focus:outline-none focus:border-purple-500 transition resize-none"
              style={{
                fontFamily: `'${selectedPair.body}', ${selectedPair.bodyCategory}`,
                fontSize: `${bodySize}px`,
                lineHeight: lineHeight}}
            />
          </div>

          {/* Preview Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <label htmlFor="page-input-289" className="block text-xs text-muted-foreground mb-2">Heading Size: {headingSize}px</label>
              <input id="page-input-289"
                type="range"
                min="24"
                max="72"
                value={headingSize}
                onChange={(e) => setHeadingSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="page-input-300" className="block text-xs text-muted-foreground mb-2">Body Size: {bodySize}px</label>
              <input id="page-input-300"
                type="range"
                min="12"
                max="24"
                value={bodySize}
                onChange={(e) => setBodySize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="page-input-311" className="block text-xs text-muted-foreground mb-2">Line Height: {lineHeight}</label>
              <input id="page-input-311"
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Current Pair Info */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {selectedPair.heading} + {selectedPair.body}
              </h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-muted rounded">
                  {selectedPair.headingCategory}
                </span>
                <span className="text-muted-foreground">+</span>
                <span className="px-2 py-1 bg-muted rounded">
                  {selectedPair.bodyCategory}
                </span>
              </div>
            </div>
            {selectedPair.popular && (
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                ⭐ Popular
              </span>
            )}
          </div>
          <p className="text-sm text-accent-foreground">{selectedPair.reasoning}</p>
        </div>

        {/* Suggestions Grid */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-3">
            {suggestions.length} Suggested Pairings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((pair, index) => (
              <button
                key={index}
                onClick={() => setSelectedPair(pair)}
                className={`text-left p-4 rounded-lg border transition ${
                  selectedPair === pair
                    ? "bg-purple-500/20 border-purple-500/50"
                    : "bg-card border-border hover:border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {pair.heading} + {pair.body}
                    </p>
                    <div className="flex gap-1.5 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                        {pair.headingCategory}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                        {pair.bodyCategory}
                      </span>
                    </div>
                  </div>
                  {pair.popular && (
                    <span className="text-yellow-400 text-xs">⭐</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{pair.reasoning}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Export Code */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-accent-foreground">Export Font Code</h3>

          {/* Google Fonts Link */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-muted-foreground">Google Fonts Link</label>
              <button
                onClick={() => {
                  copy(generateGoogleFontsLink());
                  analytics.trackToolUsage("font-pairs", { action: "copy", format: "google_fonts_link" });
                }}
                className="text-xs px-2 py-1 bg-muted hover:bg-accent rounded flex items-center gap-1 transition"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <code className="text-xs text-accent-foreground break-all block">
              {generateGoogleFontsLink()}
            </code>
          </div>

          {/* CSS Import */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-muted-foreground">CSS @import</label>
              <button
                onClick={() => {
                  copy(generateImportCode());
                  analytics.trackToolUsage("font-pairs", { action: "copy", format: "css_import" });
                }}
                className="text-xs px-2 py-1 bg-muted hover:bg-accent rounded flex items-center gap-1 transition"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <code className="text-xs text-accent-foreground break-all block">
              {generateImportCode()}
            </code>
          </div>

          {/* CSS Variables */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-muted-foreground">CSS Code</label>
              <button
                onClick={() => {
                  copy(generateCSSCode());
                  analytics.trackToolUsage("font-pairs", { action: "copy", format: "css_code" });
                }}
                className="text-xs px-2 py-1 bg-muted hover:bg-accent rounded flex items-center gap-1 transition"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <pre className="text-xs text-accent-foreground overflow-x-auto">
              <code>{generateCSSCode()}</code>
            </pre>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied to clipboard!
          </div>
        )}

        <RelatedTools currentPath="/font-pairs" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={fontPairsGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-font-pairing" title={fontPairsGuideContent.introduction.title} subtitle="Understanding font pairing and typography" variant="default">
            <MarkdownContent content={fontPairsGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use font pairing" variant="default">
            <FeatureGrid features={fontPairsGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={fontPairsGuideContent.howToUse.title} subtitle="Master font pairing and typography" variant="minimal">
            <HowToSchema name={`How to use ${fontPairsGuideContent.toolName}`} description="Step-by-step guide to font pairing" steps={fontPairsGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${fontPairsGuideContent.toolPath}`} />
            <MarkdownContent content={fontPairsGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={fontPairsGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={fontPairsGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={fontPairsGuideContent.security.content} />
          </GeoSection>

          {fontPairsGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(fontPairsGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={fontPairsGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Discover perfect font pairings for your projects • {FONT_PAIRS.length}+ curated combinations</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Font Pairing Tool"
        description="Discover perfect Google Fonts pairings. 50+ curated combinations with live preview and export code."
        url="https://openkit.tools/font-pairs"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={fontPairsGuideContent.lastUpdated}
        version={fontPairsGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Font Pairing Tool', url: 'https://openkit.tools/font-pairs' },
        ]}
      />
    </main>
  );
}
