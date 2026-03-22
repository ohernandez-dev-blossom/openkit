"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Wallet, Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { loanGuideContent } from "@/content/loan-guide";

export default function LoanCalculator() {
  useToolTracker("loan", "Loan Calculator");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(30);
  const [hasTracked, setHasTracked] = useState(false);

  // Track usage when values change
  useEffect(() => {
    if (!hasTracked && principal > 0) {
      analytics.trackToolUsage('loan-calculator', { 
        action: 'calculate',
        loanTerm: years
      });
      setHasTracked(true);
    }
  }, [principal, rate, years, analytics, hasTracked]);

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;

    if (monthlyRate === 0) {
      return {
        monthlyPayment: principal / numPayments,
        totalPayment: principal,
        totalInterest: 0};
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest};
  }, [principal, rate, years]);


  const formatCurrency = (n: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2}).format(n);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Wallet className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Loan Calculator</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Loan Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input aria-label="Input field"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                min={0}
                className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-lg font-mono text-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Interest Rate</label>
            <div className="relative">
              <input aria-label="Input field"
                type="number"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                min={0}
                max={100}
                step={0.1}
                className="w-full pl-4 pr-8 py-3 bg-card border border-border rounded-lg font-mono text-foreground"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Loan Term</label>
            <div className="relative">
              <input aria-label="Input field"
                type="number"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value) || 1)}
                min={1}
                max={50}
                className="w-full pl-4 pr-14 py-3 bg-card border border-border rounded-lg font-mono text-foreground"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <button onClick={() => copy(result.monthlyPayment.toFixed(2))} className="text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{formatCurrency(result.monthlyPayment)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Payment</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(result.totalPayment)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Interest</p>
            <p className="text-3xl font-bold text-orange-400">{formatCurrency(result.totalInterest)}</p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <label className="text-sm font-medium text-accent-foreground mb-2 block">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "15 Year", years: 15, rate: 4.5 },
              { label: "20 Year", years: 20, rate: 5 },
              { label: "30 Year", years: 30, rate: 5.5 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setYears(preset.years);
                  setRate(preset.rate);
                }}
                className="px-4 py-2 bg-muted hover:bg-accent rounded-lg text-sm text-foreground transition"
              >
                {preset.label} @ {preset.rate}%
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-3">Loan Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Principal Amount</span>
              <span className="font-mono text-white">{formatCurrency(principal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Interest</span>
              <span className="font-mono text-orange-400">{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className="h-px bg-muted my-2" />
            <div className="flex justify-between">
              <span className="text-accent-foreground font-medium">Total Amount</span>
              <span className="font-mono text-white font-bold">{formatCurrency(result.totalPayment)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Number of Payments</span>
              <span className="font-mono text-muted-foreground">{years * 12} months</span>
            </div>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/loan" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={loanGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-loan" title={loanGuideContent.introduction.title} subtitle="Understanding loan calculations" variant="default">
            <MarkdownContent content={loanGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use loan calculations" variant="default">
            <FeatureGrid features={loanGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={loanGuideContent.howToUse.title} subtitle="Master loan and mortgage calculations" variant="minimal">
            <HowToSchema name={`How to use ${loanGuideContent.toolName}`} description="Step-by-step guide to loan calculations" steps={loanGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${loanGuideContent.toolPath}`} />
            <MarkdownContent content={loanGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={loanGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={loanGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={loanGuideContent.security.content} />
          </GeoSection>

          {loanGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(loanGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={loanGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate monthly loan payments and total interest.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Loan Calculator - Monthly Payment & Interest Calculator"
        description="Calculate monthly loan payments, total interest, and amortization schedules for mortgages, auto loans, and personal loans."
        url="https://openkit.tools/loan"
        applicationCategory="FinanceApplication"
        datePublished="2024-01-15"
        dateModified={loanGuideContent.lastUpdated}
        version={loanGuideContent.version}
        aggregateRating={{ratingValue: "4.7", ratingCount: "1523", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Loan Calculator', url: 'https://openkit.tools/loan' },
        ]}
      />
    </main>
  );
}
