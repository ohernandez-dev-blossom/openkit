"use client";
import { useState, useMemo, useEffect } from "react";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Receipt } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { tipGuideContent } from "@/content/tip-guide";

export default function TipCalculator() {
  useToolTracker("tip", "Tip Calculator");
  const analytics = useAnalytics();
  const [bill, setBill] = useState("50");
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState("1");
  const [hasTracked, setHasTracked] = useState(false);

  // Track when user changes values
  useEffect(() => {
    if (!hasTracked && parseFloat(bill) > 0) {
      analytics.trackToolUsage('tip-calculator', { 
        action: 'calculate',
        tipPercent,
        splitCount: parseInt(people) || 1
      });
      setHasTracked(true);
    }
  }, [bill, tipPercent, people, analytics, hasTracked]);

  const result = useMemo(() => {
    const billAmount = parseFloat(bill) || 0;
    const numPeople = parseInt(people) || 1;

    const tipAmount = billAmount * (tipPercent / 100);
    const total = billAmount + tipAmount;
    const perPerson = total / numPeople;
    const tipPerPerson = tipAmount / numPeople;

    return { tipAmount, total, perPerson, tipPerPerson };
  }, [bill, tipPercent, people]);

  const presets = [10, 15, 18, 20, 25];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Receipt className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Tip Calculator</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Bill Amount */}
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Bill Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xl">$</span>
              <input aria-label="Input field"
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-card border border-border rounded-lg text-foreground text-2xl font-mono focus:outline-none focus:border-amber-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Tip Percentage */}
          <div>
            <label htmlFor="page-input-57" className="text-sm font-medium text-accent-foreground mb-2 block">Tip: {tipPercent}%</label>
            <input id="page-input-57"
              type="range"
              min="0"
              max="30"
              value={tipPercent}
              onChange={(e) => setTipPercent(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between mt-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setTipPercent(p)}
                  className={`px-3 py-1 rounded text-sm ${
                    tipPercent === p ? "bg-amber-600 text-white" : "bg-muted text-foreground"
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          {/* Split */}
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Split Between</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPeople(String(Math.max(1, (parseInt(people) || 1) - 1)))}
                className="w-10 h-10 bg-muted text-foreground rounded-lg text-lg font-bold hover:bg-accent"
              >
                -
              </button>
              <input aria-label="Input field"
                type="number"
                min="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-16 px-3 py-2 bg-card border border-border rounded-lg text-center text-xl font-mono text-foreground"
              />
              <button
                onClick={() => setPeople(String((parseInt(people) || 1) + 1))}
                className="w-10 h-10 bg-muted text-foreground rounded-lg text-lg font-bold hover:bg-accent"
              >
                +
              </button>
              <span className="text-muted-foreground text-sm">people</span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tip Amount</span>
              <span className="font-mono text-lg">${result.tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-mono text-lg">${result.total.toFixed(2)}</span>
            </div>
            {parseInt(people) > 1 && (
              <>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tip per person</span>
                    <span className="font-mono">${result.tipPerPerson.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-accent-foreground font-medium">Per person</span>
                    <span className="font-mono text-xl text-amber-400 font-bold">${result.perPerson.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <RelatedTools currentPath="/tip" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={tipGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-tip" title={tipGuideContent.introduction.title} subtitle="Understanding tip and bill splitting calculations" variant="default">
            <MarkdownContent content={tipGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use tip calculations" variant="default">
            <FeatureGrid features={tipGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={tipGuideContent.howToUse.title} subtitle="Master tip and bill splitting calculations" variant="minimal">
            <HowToSchema name={`How to use ${tipGuideContent.toolName}`} description="Step-by-step guide to tip calculation" steps={tipGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${tipGuideContent.toolPath}`} />
            <MarkdownContent content={tipGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={tipGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={tipGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={tipGuideContent.security.content} />
          </GeoSection>

          {tipGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(tipGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={tipGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate tips and split bills easily.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Tip Calculator"
        description="Calculate tips and split bills easily. Free tip calculator with percentage options."
        url="https://openkit.tools/tip"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={tipGuideContent.lastUpdated}
        version={tipGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1654", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Tip Calculator', url: 'https://openkit.tools/tip' },
        ]}
      />
    </main>
  );
}
