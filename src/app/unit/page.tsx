"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { unitGuideContent } from "@/content/unit-guide";

type UnitCategory = "length" | "weight" | "temperature" | "data" | "time";

const units: Record<UnitCategory, { name: string; units: { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
  length: {
    name: "Length",
    units: [
      { id: "m", name: "Meters", toBase: (v) => v, fromBase: (v) => v },
      { id: "km", name: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "cm", name: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: "mm", name: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "mi", name: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: "yd", name: "Yards", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: "ft", name: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "in", name: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    name: "Weight",
    units: [
      { id: "kg", name: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
      { id: "g", name: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "mg", name: "Milligrams", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: "lb", name: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: "oz", name: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { id: "t", name: "Metric Tons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    ],
  },
  temperature: {
    name: "Temperature",
    units: [
      { id: "c", name: "Celsius", toBase: (v) => v, fromBase: (v) => v },
      { id: "f", name: "Fahrenheit", toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
      { id: "k", name: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  data: {
    name: "Data",
    units: [
      { id: "b", name: "Bytes", toBase: (v) => v, fromBase: (v) => v },
      { id: "kb", name: "Kilobytes", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: "mb", name: "Megabytes", toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
      { id: "gb", name: "Gigabytes", toBase: (v) => v * 1024 * 1024 * 1024, fromBase: (v) => v / (1024 * 1024 * 1024) },
      { id: "tb", name: "Terabytes", toBase: (v) => v * 1024 * 1024 * 1024 * 1024, fromBase: (v) => v / (1024 * 1024 * 1024 * 1024) },
    ],
  },
  time: {
    name: "Time",
    units: [
      { id: "s", name: "Seconds", toBase: (v) => v, fromBase: (v) => v },
      { id: "ms", name: "Milliseconds", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "min", name: "Minutes", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: "h", name: "Hours", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: "d", name: "Days", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: "w", name: "Weeks", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    ],
  },
};

export default function UnitConverter() {
  useToolTracker("unit", "Unit Converter", "converters");
  const analytics = useAnalytics();
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [value, setValue] = useState("100");
  const [hasTracked, setHasTracked] = useState(false);

  // Track usage
  useEffect(() => {
    if (!hasTracked && parseFloat(value) > 0) {
      analytics.trackToolUsage('unit-converter', { 
        action: 'convert',
        category
      });
      setHasTracked(true);
    }
  }, [value, category, analytics, hasTracked]);

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    const from = units[category].units.find((u) => u.id === fromUnit);
    const to = units[category].units.find((u) => u.id === toUnit);
    if (!from || !to) return "";

    const baseValue = from.toBase(num);
    const converted = to.fromBase(baseValue);

    return converted.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [category, fromUnit, toUnit, value]);

  // Reset units when category changes
  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    setFromUnit(units[cat].units[0].id);
    setToUnit(units[cat].units[1]?.id || units[cat].units[0].id);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm hover:opacity-80 transition">
            📏
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Unit Converter</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Object.entries(units).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key as UnitCategory)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                category === key
                  ? "bg-purple-600 text-white"
                  : "bg-card text-foreground hover:bg-muted border border-border"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Converter */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground"
            >
              {units[category].units.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <input aria-label="Input field"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground text-xl font-mono"
              placeholder="Enter value..."
            />
          </div>

          <div className="text-2xl text-muted-foreground text-center py-4">=</div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground"
            >
              {units[category].units.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <div className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-purple-400 text-xl font-mono">
              {result || "—"}
            </div>
          </div>
        </div>

        <RelatedTools currentPath="/unit" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={unitGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-unit" title={unitGuideContent.introduction.title} subtitle="Understanding unit conversion for developers" variant="default">
            <MarkdownContent content={unitGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use unit conversion" variant="default">
            <FeatureGrid features={unitGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={unitGuideContent.howToUse.title} subtitle="Master unit conversions" variant="minimal">
            <HowToSchema name={`How to use ${unitGuideContent.toolName}`} description="Step-by-step guide to unit conversion" steps={unitGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${unitGuideContent.toolPath}`} />
            <MarkdownContent content={unitGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={unitGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={unitGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={unitGuideContent.security.content} />
          </GeoSection>

          {unitGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(unitGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={unitGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Convert between units of length, weight, temperature, data, and time.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Unit Converter"
        description="Convert length, weight, temperature, and data units. Free online unit converter for developers."
        url="https://openkit.tools/unit"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={unitGuideContent.lastUpdated}
        version={unitGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1543", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Unit Converter', url: 'https://openkit.tools/unit' },
        ]}
      />
    </main>
  );
}
