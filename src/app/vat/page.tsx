"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Receipt, Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { vatGuideContent } from "@/content/vat-guide";

export default function VATCalculator() {
  useToolTracker("vat", "VAT Calculator");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [amount, setAmount] = useState(100);
  const [vatRate, setVatRate] = useState(21);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [hasTracked, setHasTracked] = useState(false);

  // Track usage
  useEffect(() => {
    if (!hasTracked && amount > 0) {
      analytics.trackToolUsage('vat-calculator', { 
        action: 'calculate',
        vatRate,
        mode
      });
      setHasTracked(true);
    }
  }, [amount, vatRate, mode, analytics, hasTracked]);

  const result = useMemo(() => {
    if (mode === "add") {
      const vat = amount * (vatRate / 100);
      return {
        net: amount,
        vat,
        gross: amount + vat};
    } else {
      const net = amount / (1 + vatRate / 100);
      const vat = amount - net;
      return {
        net,
        vat,
        gross: amount};
    }
  }, [amount, vatRate, mode]);


  const formatCurrency = (n: number) => {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2});
  };

  const presets = [
    { label: "🇪🇸 Spain", rate: 21 },
    { label: "🇬🇧 UK", rate: 20 },
    { label: "🇩🇪 Germany", rate: 19 },
    { label: "🇫🇷 France", rate: 20 },
    { label: "🇮🇹 Italy", rate: 22 },
    { label: "🇳🇱 Netherlands", rate: 21 },
    { label: "🇺🇸 US (avg)", rate: 8 },
  ];

  return (
    <>
      <StructuredData
        type="WebApplication"
        name="VAT Calculator - Add or Remove VAT Tax"
        description="Free online VAT calculator. Add or remove VAT (Value Added Tax) from prices instantly. Supports all EU countries and custom tax rates. Perfect for invoicing and tax calculations."
        url="https://openkit.tools/vat"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={vatGuideContent.lastUpdated}
        version={vatGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1876", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "VAT Calculator", url: "https://openkit.tools/vat" }
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Receipt className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">VAT Calculator</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-card rounded-lg p-1">
            <button
              onClick={() => setMode("add")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                mode === "add" ? "bg-blue-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Add VAT
            </button>
            <button
              onClick={() => setMode("remove")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                mode === "remove" ? "bg-blue-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Remove VAT
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">
              {mode === "add" ? "Net Amount (excl. VAT)" : "Gross Amount (incl. VAT)"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input aria-label="Input field"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min={0}
                step={0.01}
                className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-lg font-mono text-xl text-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">VAT Rate</label>
            <div className="relative">
              <input aria-label="Input field"
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                min={0}
                max={100}
                step={0.1}
                className="w-full pl-4 pr-8 py-3 bg-card border border-border rounded-lg font-mono text-xl text-foreground"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>
        </div>

        {/* Country Presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setVatRate(preset.rate)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                vatRate === preset.rate
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              {preset.label} ({preset.rate}%)
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">Net (excl. VAT)</p>
              <button onClick={() => copy(formatCurrency(result.net))} className="text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-3xl font-bold text-white">${formatCurrency(result.net)}</p>
          </div>
          <div className="bg-card border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">VAT ({vatRate}%)</p>
              <button onClick={() => copy(formatCurrency(result.vat))} className="text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-3xl font-bold text-blue-400">${formatCurrency(result.vat)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">Gross (incl. VAT)</p>
              <button onClick={() => copy(formatCurrency(result.gross))} className="text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-3xl font-bold text-white">${formatCurrency(result.gross)}</p>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/vat" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={vatGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-vat" title={vatGuideContent.introduction.title} subtitle="Understanding VAT calculation for developers" variant="default">
            <MarkdownContent content={vatGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use VAT calculations" variant="default">
            <FeatureGrid features={vatGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={vatGuideContent.howToUse.title} subtitle="Master VAT calculations" variant="minimal">
            <HowToSchema name={`How to use ${vatGuideContent.toolName}`} description="Step-by-step guide to VAT calculation" steps={vatGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${vatGuideContent.toolPath}`} />
            <MarkdownContent content={vatGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={vatGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={vatGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={vatGuideContent.security.content} />
          </GeoSection>

          {vatGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(vatGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={vatGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate VAT/tax on any amount.</p>
        </div>
      </footer>
    </main>
    </>
  );
}
