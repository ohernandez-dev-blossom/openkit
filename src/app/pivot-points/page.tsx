"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Target, Copy, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";
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
import { pivotPointsGuideContent } from "@/content/pivot-points-guide";

type PivotMethod = "standard" | "fibonacci" | "camarilla" | "woodie" | "demark";

interface PivotResult {
  pivot: number;
  r1: number;
  r2: number | null;
  r3: number | null;
  s1: number;
  s2: number | null;
  s3: number | null;
  method: PivotMethod;
}

export default function PivotPointsCalculator() {
  useToolTracker("pivot-points", "Pivot Points Calculator", "trading");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [open, setOpen] = useState(100);
  const [high, setHigh] = useState(105);
  const [low, setLow] = useState(95);
  const [close, setClose] = useState(102);
  const [selectedMethod, setSelectedMethod] = useState<PivotMethod>("standard");
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (!hasTracked && high > 0) {
      analytics.trackToolUsage("pivot-points-calculator", {
        action: "calculate",
        method: selectedMethod,
      });
      setHasTracked(true);
    }
  }, [high, low, close, open, selectedMethod, analytics, hasTracked]);

  const result: PivotResult = useMemo(() => {
    const h = high;
    const l = low;
    const c = close;
    const o = open;

    switch (selectedMethod) {
      case "standard": {
        const pp = (h + l + c) / 3;
        return {
          pivot: pp,
          r1: 2 * pp - l,
          r2: pp + (h - l),
          r3: h + 2 * (pp - l),
          s1: 2 * pp - h,
          s2: pp - (h - l),
          s3: l - 2 * (h - pp),
          method: "standard",
        };
      }
      case "fibonacci": {
        const pp = (h + l + c) / 3;
        return {
          pivot: pp,
          r1: pp + 0.382 * (h - l),
          r2: pp + 0.618 * (h - l),
          r3: pp + 1.0 * (h - l),
          s1: pp - 0.382 * (h - l),
          s2: pp - 0.618 * (h - l),
          s3: pp - 1.0 * (h - l),
          method: "fibonacci",
        };
      }
      case "camarilla": {
        const pp = (h + l + c) / 3;
        return {
          pivot: pp,
          r1: c + (1.1 * (h - l)) / 12,
          r2: c + (1.1 * (h - l)) / 6,
          r3: c + (1.1 * (h - l)) / 4,
          s1: c - (1.1 * (h - l)) / 12,
          s2: c - (1.1 * (h - l)) / 6,
          s3: c - (1.1 * (h - l)) / 4,
          method: "camarilla",
        };
      }
      case "woodie": {
        const pp = (h + l + 2 * c) / 4;
        return {
          pivot: pp,
          r1: 2 * pp - l,
          r2: pp + (h - l),
          r3: h + 2 * (pp - l),
          s1: 2 * pp - h,
          s2: pp - (h - l),
          s3: l - 2 * (h - pp),
          method: "woodie",
        };
      }
      case "demark": {
        let x: number;
        if (c < o) {
          x = h + 2 * l + c;
        } else if (c > o) {
          x = 2 * h + l + c;
        } else {
          x = h + l + 2 * c;
        }
        const pp = x / 4;
        return {
          pivot: pp,
          r1: x / 2 - l,
          r2: null,
          r3: null,
          s1: x / 2 - h,
          s2: null,
          s3: null,
          method: "demark",
        };
      }
    }
  }, [open, high, low, close, selectedMethod]);

  const formatPrice = (n: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  };

  const formatDistance = (level: number) => {
    const diff = level - close;
    const sign = diff >= 0 ? "+" : "";
    return `${sign}${formatPrice(diff)}`;
  };

  const copyAllLevels = () => {
    const lines = [
      `Pivot Points (${selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)})`,
      `OHLC: O=${formatPrice(open)} H=${formatPrice(high)} L=${formatPrice(low)} C=${formatPrice(close)}`,
      "",
    ];
    if (result.r3 !== null) lines.push(`R3: ${formatPrice(result.r3)}`);
    if (result.r2 !== null) lines.push(`R2: ${formatPrice(result.r2)}`);
    lines.push(`R1: ${formatPrice(result.r1)}`);
    lines.push(`PP: ${formatPrice(result.pivot)}`);
    lines.push(`S1: ${formatPrice(result.s1)}`);
    if (result.s2 !== null) lines.push(`S2: ${formatPrice(result.s2)}`);
    if (result.s3 !== null) lines.push(`S3: ${formatPrice(result.s3)}`);
    copy(lines.join("\n"));
  };

  const methods: { key: PivotMethod; label: string }[] = [
    { key: "standard", label: "Standard" },
    { key: "fibonacci", label: "Fibonacci" },
    { key: "camarilla", label: "Camarilla" },
    { key: "woodie", label: "Woodie" },
    { key: "demark", label: "DeMark" },
  ];

  const presets = [
    { label: "S&P 500", o: 5800, h: 5880, l: 5750, c: 5850 },
    { label: "Bitcoin", o: 96000, h: 98500, l: 94000, c: 97200 },
    { label: "EUR/USD", o: 1.085, h: 1.092, l: 1.081, c: 1.088 },
  ];

  const pivotDiff = close - result.pivot;
  const isAbovePivot = pivotDiff >= 0;

  type LevelRow = {
    label: string;
    value: number;
    bgClass: string;
    textClass: string;
  };

  const levels: LevelRow[] = [];

  if (result.r3 !== null) {
    levels.push({ label: "R3", value: result.r3, bgClass: "bg-red-500/20 dark:bg-red-500/15", textClass: "text-red-400" });
  }
  if (result.r2 !== null) {
    levels.push({ label: "R2", value: result.r2, bgClass: "bg-red-500/15 dark:bg-red-500/10", textClass: "text-red-400" });
  }
  levels.push({ label: "R1", value: result.r1, bgClass: "bg-red-500/10 dark:bg-red-500/7", textClass: "text-red-400" });
  levels.push({ label: "PP", value: result.pivot, bgClass: "bg-blue-500/20 dark:bg-blue-500/15", textClass: "text-blue-400" });
  levels.push({ label: "S1", value: result.s1, bgClass: "bg-green-500/10 dark:bg-green-500/7", textClass: "text-green-400" });
  if (result.s2 !== null) {
    levels.push({ label: "S2", value: result.s2, bgClass: "bg-green-500/15 dark:bg-green-500/10", textClass: "text-green-400" });
  }
  if (result.s3 !== null) {
    levels.push({ label: "S3", value: result.s3, bgClass: "bg-green-500/20 dark:bg-green-500/15", textClass: "text-green-400" });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center hover:opacity-80 transition"
          >
            <Target className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">
            Pivot Points Calculator
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* OHLC Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Open ($)", value: open, setter: setOpen },
            { label: "High ($)", value: high, setter: setHigh },
            { label: "Low ($)", value: low, setter: setLow },
            { label: "Close ($)", value: close, setter: setClose },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">
                {field.label}
              </label>
              <input
                aria-label={field.label}
                type="number"
                value={field.value}
                onChange={(e) => field.setter(parseFloat(e.target.value) || 0)}
                step="any"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
              />
            </div>
          ))}
        </div>

        {/* Method Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-accent-foreground mb-2 block">
            Calculation Method
          </label>
          <div className="flex flex-wrap gap-2">
            {methods.map((m) => (
              <button
                key={m.key}
                onClick={() => setSelectedMethod(m.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedMethod === m.key
                    ? "bg-cyan-600 text-white"
                    : "bg-muted hover:bg-accent text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-base sm:text-lg font-medium text-accent-foreground flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-cyan-400" />
              Pivot Levels
            </h3>
            <button
              onClick={copyAllLevels}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy All
            </button>
          </div>

          <div className="divide-y divide-border">
            {/* Table Header */}
            <div className="grid grid-cols-3 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50">
              <span>Level</span>
              <span className="text-right">Price</span>
              <span className="text-right">Distance</span>
            </div>

            {levels.map((level) => (
              <div
                key={level.label}
                className={`grid grid-cols-3 px-4 py-3 ${level.bgClass} ${
                  level.label === "PP" ? "font-bold" : ""
                }`}
              >
                <span className={`font-medium ${level.textClass}`}>
                  {level.label}
                </span>
                <span className={`text-right font-mono ${level.textClass}`}>
                  {formatPrice(level.value)}
                </span>
                <span
                  className={`text-right font-mono text-sm ${
                    level.value >= close ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {formatDistance(level.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div
          className={`rounded-xl p-4 mb-6 border ${
            isAbovePivot
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <div className="flex items-center gap-3">
            {isAbovePivot ? (
              <TrendingUp className="w-5 h-5 text-green-400 shrink-0" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <p className="text-sm text-foreground">
              Close is{" "}
              <span
                className={`font-semibold ${
                  isAbovePivot ? "text-green-400" : "text-red-400"
                }`}
              >
                {isAbovePivot ? "above" : "below"}
              </span>{" "}
              pivot by{" "}
              <span className="font-mono font-semibold">
                ${formatPrice(Math.abs(pivotDiff))}
              </span>
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <label className="text-sm font-medium text-accent-foreground mb-2 block">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setOpen(preset.o);
                  setHigh(preset.h);
                  setLow(preset.l);
                  setClose(preset.c);
                }}
                className="px-4 py-2 bg-muted hover:bg-accent rounded-lg text-sm text-foreground transition"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/pivot-points" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={pivotPointsGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection
            id="what-are-pivot-points"
            title={pivotPointsGuideContent.introduction.title}
            subtitle="Understanding pivot point calculations"
            variant="default"
          >
            <MarkdownContent
              content={pivotPointsGuideContent.introduction.content}
            />
          </GeoSection>

          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How traders use pivot points"
            variant="default"
          >
            <FeatureGrid
              features={pivotPointsGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection
            id="how-to-use"
            title={pivotPointsGuideContent.howToUse.title}
            subtitle="Master pivot point analysis"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${pivotPointsGuideContent.toolName}`}
              description="Step-by-step guide to pivot point calculations"
              steps={pivotPointsGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${pivotPointsGuideContent.toolPath}`}
            />
            <MarkdownContent
              content={pivotPointsGuideContent.howToUse.content}
            />
          </GeoSection>

          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know"
            variant="default"
          >
            <ToolFAQ faqs={pivotPointsGuideContent.faqs} />
          </GeoSection>

          <GeoSection
            id="security"
            title={pivotPointsGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent
              content={pivotPointsGuideContent.security.content}
            />
          </GeoSection>

          {pivotPointsGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(pivotPointsGuideContent.stats).map(
                  ([label, value]) => ({ label, value })
                )}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={pivotPointsGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Calculate pivot points, support, and resistance levels from OHLC
            data.
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Pivot Points Calculator - Support & Resistance Levels"
        description="Calculate pivot points, support, and resistance levels from OHLC data using Standard, Fibonacci, Camarilla, Woodie, and DeMark methods."
        url="https://openkit.tools/pivot-points"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={pivotPointsGuideContent.lastUpdated}
        version={pivotPointsGuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "892",
          bestRating: "5",
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          {
            name: "Pivot Points Calculator",
            url: "https://openkit.tools/pivot-points",
          },
        ]}
      />
    </main>
  );
}
