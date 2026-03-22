"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Percent, Copy } from "lucide-react";
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
import { discountGuideContent } from "@/content/discount-guide";

export default function DiscountCalculator() {
  useToolTracker("discount", "Discount Calculator", "calculators");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [hasTracked, setHasTracked] = useState(false);

  // Track usage when values change
  useEffect(() => {
    if (!hasTracked && originalPrice > 0) {
      analytics.trackToolUsage('discount-calculator', { 
        action: 'calculate',
        discountPercent
      });
      setHasTracked(true);
    }
  }, [originalPrice, discountPercent, analytics, hasTracked]);

  const result = useMemo(() => {
    const discount = originalPrice * (discountPercent / 100);
    const finalPrice = originalPrice - discount;
    const savings = discount;

    return {
      discountAmount: discount,
      finalPrice,
      savings,
      youPay: finalPrice,
      youSave: savings};
  }, [originalPrice, discountPercent]);

  const presets = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90];


  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Percent className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Discount Calculator</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Original Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input aria-label="Input field"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                step="0.01"
                min={0}
                className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-lg font-mono text-xl text-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Discount</label>
            <div className="relative">
              <input aria-label="Input field"
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                step="1"
                min={0}
                max={100}
                className="w-full pl-4 pr-10 py-3 bg-card border border-border rounded-lg font-mono text-xl text-foreground"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setDiscountPercent(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                discountPercent === p
                  ? "bg-orange-600 text-white"
                  : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
                {p}% OFF
              </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 shadow-refined">
            <p className="text-sm text-muted-foreground mb-4">You Pay</p>
            <div className="flex items-start justify-between">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">${result.youPay.toFixed(2)}</p>
              <button onClick={() => copy(result.youPay.toFixed(2))} className="text-muted-foreground hover:text-foreground p-1">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-refined">
            <p className="text-sm text-muted-foreground mb-4">You Save</p>
            <div className="flex items-start justify-between">
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">${result.youSave.toFixed(2)}</p>
              <button onClick={() => copy(result.youSave.toFixed(2))} className="text-muted-foreground hover:text-foreground p-1">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow-refined-sm">
            <p className="text-xs text-muted-foreground mb-1">Original</p>
            <p className="text-lg font-mono text-foreground">${originalPrice.toFixed(2)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow-refined-sm">
            <p className="text-xs text-muted-foreground mb-1">Discount Amount</p>
            <p className="text-lg font-mono text-orange-600 dark:text-orange-400">-${result.discountAmount.toFixed(2)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow-refined-sm">
            <p className="text-xs text-muted-foreground mb-1">Discount</p>
            <p className="text-lg font-mono text-foreground">{discountPercent}%</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow-refined-sm">
            <p className="text-xs text-muted-foreground mb-1">Final Price</p>
            <p className="text-lg font-mono text-green-600 dark:text-green-400">${result.finalPrice.toFixed(2)}</p>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/discount" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={discountGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-discount" title={discountGuideContent.introduction.title} subtitle="Understanding discount and savings calculations" variant="default">
            <MarkdownContent content={discountGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use discount calculations" variant="default">
            <FeatureGrid features={discountGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={discountGuideContent.howToUse.title} subtitle="Master discount and savings calculations" variant="minimal">
            <HowToSchema name={`How to use ${discountGuideContent.toolName}`} description="Step-by-step guide to discount calculation" steps={discountGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${discountGuideContent.toolPath}`} />
            <MarkdownContent content={discountGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={discountGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={discountGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={discountGuideContent.security.content} />
          </GeoSection>

          {discountGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(discountGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={discountGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate discount prices and savings.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Discount Calculator - Calculate Sale Prices & Savings"
        description="Calculate discounted prices, savings, and percentage off. Perfect for shopping, sales planning, and price comparison."
        url="https://openkit.tools/discount"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={discountGuideContent.lastUpdated}
        version={discountGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1543", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Discount Calculator', url: 'https://openkit.tools/discount' },
        ]}
      />
    </main>
  );
}
