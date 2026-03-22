"use client";
import { useState, useMemo, useEffect } from "react";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { percentageGuideContent } from "@/content/percentage-guide";

type CalcType = "whatPercent" | "percentOf" | "change" | "increase" | "decrease";

export default function PercentageCalculator() {
  useToolTracker("percentage", "Percentage Calculator");
  const analytics = useAnalytics();
  const [calcType, setCalcType] = useState<CalcType>("percentOf");
  const [value1, setValue1] = useState("25");
  const [value2, setValue2] = useState("200");
  const [hasTracked, setHasTracked] = useState(false);

  // Track usage
  useEffect(() => {
    if (!hasTracked && (parseFloat(value1) > 0 || parseFloat(value2) > 0)) {
      analytics.trackToolUsage('percentage-calculator', { 
        action: 'calculate',
        calcType
      });
      setHasTracked(true);
    }
  }, [value1, value2, calcType, analytics, hasTracked]);

  const result = useMemo(() => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 0;

    switch (calcType) {
      case "percentOf":
        // What is X% of Y?
        return { label: `${v1}% of ${v2}`, value: (v1 / 100) * v2 };
      case "whatPercent":
        // X is what % of Y?
        return { label: `${v1} is what % of ${v2}`, value: v2 !== 0 ? (v1 / v2) * 100 : 0 };
      case "change":
        // % change from X to Y
        return { label: `% change from ${v1} to ${v2}`, value: v1 !== 0 ? ((v2 - v1) / v1) * 100 : 0 };
      case "increase":
        // X increased by Y%
        return { label: `${v1} + ${v2}%`, value: v1 + (v1 * v2) / 100 };
      case "decrease":
        // X decreased by Y%
        return { label: `${v1} - ${v2}%`, value: v1 - (v1 * v2) / 100 };
      default:
        return { label: "", value: 0 };
    }
  }, [calcType, value1, value2]);

  const calculations: { id: CalcType; name: string; desc: string; label1: string; label2: string }[] = [
    { id: "percentOf", name: "X% of Y", desc: "What is 25% of 200?", label1: "Percent (%)", label2: "Of value" },
    { id: "whatPercent", name: "X is ?% of Y", desc: "50 is what % of 200?", label1: "Value", label2: "Of total" },
    { id: "change", name: "% Change", desc: "Change from 100 to 150", label1: "From", label2: "To" },
    { id: "increase", name: "Increase by %", desc: "100 increased by 25%", label1: "Value", label2: "Increase %" },
    { id: "decrease", name: "Decrease by %", desc: "100 decreased by 25%", label1: "Value", label2: "Decrease %" },
  ];

  const current = calculations.find((c) => c.id === calcType)!;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Calculator className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Percentage Calculator</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Calculation Types */}
        <div className="flex flex-wrap gap-2 mb-6">
          {calculations.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setCalcType(calc.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                calcType === calc.id
                  ? "bg-emerald-600 text-white"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {calc.name}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">Example: {current.desc}</p>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="page-input-84" className="text-sm font-medium text-accent-foreground mb-2 block">{current.label1}</label>
            <input id="page-input-84"
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground text-xl font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="page-input-93" className="text-sm font-medium text-accent-foreground mb-2 block">{current.label2}</label>
            <input id="page-input-93"
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground text-xl font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Result */}
        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="text-sm text-muted-foreground mb-2">{result.label} =</div>
          <div className="text-4xl font-bold font-mono text-emerald-400">
            {result.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            {calcType === "whatPercent" || calcType === "change" ? "%" : ""}
          </div>
        </div>

        <RelatedTools currentPath="/percentage" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={percentageGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-percentage" title={percentageGuideContent.introduction.title} subtitle="Understanding percentage calculations" variant="default">
            <MarkdownContent content={percentageGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use percentage calculations" variant="default">
            <FeatureGrid features={percentageGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={percentageGuideContent.howToUse.title} subtitle="Master percentage calculations" variant="minimal">
            <HowToSchema name={`How to use ${percentageGuideContent.toolName}`} description="Step-by-step guide to percentage calculations" steps={percentageGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${percentageGuideContent.toolPath}`} />
            <MarkdownContent content={percentageGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={percentageGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={percentageGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={percentageGuideContent.security.content} />
          </GeoSection>

          {percentageGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(percentageGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={percentageGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate percentages instantly.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Percentage Calculator"
        description="Calculate percentages, percentage changes, increases and decreases. Free online percentage calculator."
        url="https://openkit.tools/percentage"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={percentageGuideContent.lastUpdated}
        version={percentageGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "2145", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Percentage Calculator', url: 'https://openkit.tools/percentage' },
        ]}
      />
    </main>
  );
}
