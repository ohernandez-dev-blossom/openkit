"use client";

import Link from "next/link";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { ShareButton } from "@/components/share-button";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, StatsBar } from "@/components/geo-content-layout";
import { dcaCalcGuideContent } from "@/content/dca-calc-guide";
import { Trash2 } from "lucide-react";

interface Entry {
  id: number;
  date: string;
  price: number;
  amount: number;
  units: number;
}

interface EntryWithAverage extends Entry {
  cumulativeUnits: number;
  cumulativeInvested: number;
  cumulativeAverage: number;
  isBest: boolean;
  isWorst: boolean;
}

function computeEntries(entries: Entry[], currentPrice: number): {
  enrichedEntries: EntryWithAverage[];
  avgPrice: number;
  totalInvested: number;
  totalUnits: number;
} {
  let cumulativeUnits = 0;
  let cumulativeInvested = 0;

  const enriched = entries.map((entry) => {
    cumulativeUnits += entry.units;
    cumulativeInvested += entry.amount;
    const cumulativeAverage = cumulativeUnits > 0 ? cumulativeInvested / cumulativeUnits : 0;

    return {
      ...entry,
      cumulativeUnits,
      cumulativeInvested,
      cumulativeAverage,
      isBest: false,
      isWorst: false,
    };
  });

  // Mark best and worst entries relative to current average
  const finalAvg = cumulativeUnits > 0 ? cumulativeInvested / cumulativeUnits : 0;
  if (enriched.length > 1 && finalAvg > 0) {
    const bestEntry = enriched.reduce((best, e) => (e.price < best.price ? e : best), enriched[0]);
    const worstEntry = enriched.reduce((worst, e) => (e.price > worst.price ? e : worst), enriched[0]);
    bestEntry.isBest = true;
    worstEntry.isWorst = true;
  }

  return {
    enrichedEntries: enriched,
    avgPrice: finalAvg,
    totalInvested: cumulativeInvested,
    totalUnits: cumulativeUnits,
  };
}

export default function DCACalcPage() {
  useToolTracker("dca-calc", "DCA Calculator", "trading");
  const analytics = useAnalytics();

  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, date: "", price: 50000, amount: 1000, units: 0.02 },
  ]);
  const [nextId, setNextId] = useState(2);
  const [currentPrice, setCurrentPrice] = useState(55000);
  const [showGuide, setShowGuide] = useState(false);

  const addEntry = useCallback(() => {
    setEntries((prev) => [
      ...prev,
      { id: nextId, date: "", price: 0, amount: 0, units: 0 },
    ]);
    setNextId((id) => id + 1);
    analytics.trackEvent("tool_interaction", "add_entry", {});
  }, [nextId, analytics]);

  const removeEntry = useCallback((id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateEntry = useCallback((id: number, field: keyof Entry, value: string | number) => {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const updated = { ...e, [field]: value };
        // Auto-calculate units from amount and price
        if (field === "price" || field === "amount") {
          const price = field === "price" ? Number(value) : updated.price;
          const amount = field === "amount" ? Number(value) : updated.amount;
          updated.units = price > 0 ? amount / price : 0;
        }
        // Auto-calculate amount from units and price
        if (field === "units") {
          updated.amount = updated.price * updated.units;
        }
        return updated;
      })
    );
  }, []);

  const { enrichedEntries, avgPrice, totalInvested, totalUnits } = useMemo(
    () => computeEntries(entries, currentPrice),
    [entries, currentPrice]
  );

  const currentValue = totalUnits * currentPrice;
  const unrealizedPnL = currentValue - totalInvested;
  const pnlPercent = totalInvested > 0 ? (unrealizedPnL / totalInvested) * 100 : 0;

  const formatCurrency = (v: number): string =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatUnits = (v: number): string => v.toFixed(6);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">DCA</span>
            </div>
            <h1 className="text-xl font-semibold">DCA Calculator</h1>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton toolId="dca-calc" data={{ entries, currentPrice }} variant="outline" className="border-border" />
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">← Tools</Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Summary Results */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Average Entry</p>
            <p className="text-lg font-mono font-bold text-blue-400">{formatCurrency(avgPrice)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Invested</p>
            <p className="text-lg font-mono font-bold text-foreground">{formatCurrency(totalInvested)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Units</p>
            <p className="text-lg font-mono font-bold text-cyan-400">{formatUnits(totalUnits)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Current Value</p>
            <p className="text-lg font-mono font-bold text-foreground">{formatCurrency(currentValue)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Unrealized P&L</p>
            <p className={`text-lg font-mono font-bold ${unrealizedPnL >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {formatCurrency(unrealizedPnL)}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">P&L %</p>
            <p className={`text-lg font-mono font-bold ${pnlPercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Current Price Input */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">Current Market Price</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Current Price ($)</label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="font-mono bg-background border-border"
                placeholder="55000"
              />
            </div>
          </CardContent>
        </Card>

        {/* Entry Table */}
        <Card className="bg-card border-border overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Entries</h2>
              <Button
                onClick={addEntry}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                + Add Entry
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">#</th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">Date</th>
                    <th className="text-right px-3 py-2 font-medium text-muted-foreground">Price</th>
                    <th className="text-right px-3 py-2 font-medium text-muted-foreground">Amount</th>
                    <th className="text-right px-3 py-2 font-medium text-muted-foreground">Units</th>
                    <th className="text-right px-3 py-2 font-medium text-muted-foreground">Avg After</th>
                    <th className="text-center px-3 py-2 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrichedEntries.map((entry, idx) => {
                    const bgClass = entry.isBest
                      ? "bg-emerald-500/10"
                      : entry.isWorst
                      ? "bg-red-500/10"
                      : "hover:bg-muted/30";
                    return (
                      <tr key={entry.id} className={`border-b border-border/50 ${bgClass}`}>
                        <td className="px-3 py-2 text-muted-foreground">{idx + 1}</td>
                        <td className="px-3 py-2">
                          <Input
                            type="date"
                            value={entry.date}
                            onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                            className="text-xs border-border bg-background h-8 w-32"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            value={entry.price || ""}
                            onChange={(e) => updateEntry(entry.id, "price", Number(e.target.value))}
                            className="text-right font-mono text-xs border-border bg-background h-8 w-24"
                            placeholder="Price"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            value={entry.amount || ""}
                            onChange={(e) => updateEntry(entry.id, "amount", Number(e.target.value))}
                            className="text-right font-mono text-xs border-border bg-background h-8 w-24"
                            placeholder="Amount"
                          />
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-cyan-400">
                          {formatUnits(entry.units)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-blue-400">
                          {formatCurrency(entry.cumulativeAverage)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEntry(entry.id)}
                            className="h-7 w-7 p-0 hover:bg-red-500/20 hover:text-red-400"
                            disabled={entries.length === 1}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-500/20 border border-emerald-500/40 rounded" />
            <span>Best Entry (lowest price)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/20 border border-red-500/40 rounded" />
            <span>Worst Entry (highest price)</span>
          </div>
        </div>

        {totalUnits > 0 && (
          <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
            <span className="text-sm text-muted-foreground">Break-even Price</span>
            <span className="font-mono font-bold text-foreground">{formatCurrency(avgPrice)}</span>
          </div>
        )}

        {/* Toggle Learn More */}
        <Button
          variant="outline"
          className="w-full border-border"
          onClick={() => setShowGuide(!showGuide)}
        >
          {showGuide ? "Hide" : "Learn more about DCA"} {showGuide ? "▲" : "▼"}
        </Button>

        {showGuide && (
          <>
            <RelatedTools currentPath="/dca-calc" />

            <GeoContentLayout>
              <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get started in 30 seconds" variant="highlight">
                <QuickStartGuide steps={dcaCalcGuideContent.quickStartSteps} />
              </GeoSection>

              <GeoSection id="introduction" title={dcaCalcGuideContent.introduction.title} subtitle="Master dollar-cost averaging" variant="default">
                <MarkdownContent content={dcaCalcGuideContent.introduction.content} />
              </GeoSection>

              <GeoSection id="how-to-use" title={dcaCalcGuideContent.howToUse.title} subtitle="Step-by-step guide" variant="minimal">
                <HowToSchema
                  name={`How to use ${dcaCalcGuideContent.toolName}`}
                  description="Track DCA entries and calculate average cost basis"
                  steps={dcaCalcGuideContent.howToUse.steps}
                  toolUrl={`https://openkit.tools${dcaCalcGuideContent.toolPath}`}
                />
                <MarkdownContent content={dcaCalcGuideContent.howToUse.content} />
              </GeoSection>

              <GeoSection id="faq" title="Frequently Asked Questions" subtitle="DCA essentials" variant="default">
                <ToolFAQ faqs={dcaCalcGuideContent.faqs} />
              </GeoSection>

              <GeoSection id="security" title={dcaCalcGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
                <MarkdownContent content={dcaCalcGuideContent.security.content} />
              </GeoSection>

              {dcaCalcGuideContent.stats && (
                <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
                  <StatsBar stats={Object.entries(dcaCalcGuideContent.stats).map(([label, value]) => ({ label, value }))} />
                </GeoSection>
              )}
            </GeoContentLayout>

            <LastUpdated date={dcaCalcGuideContent.lastUpdated} />
          </>
        )}
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Track your DCA strategy. No data leaves your browser.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link> •{" "}
            <Link href="/about" className="hover:text-foreground transition">About</Link> •{" "}
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="DCA Calculator"
        description="Calculate dollar-cost average entry price and unrealized P&L. Free, private, 100% client-side."
        url="https://openkit.tools/dca-calc"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={dcaCalcGuideContent.lastUpdated}
        version={dcaCalcGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "DCA Calculator", url: "https://openkit.tools/dca-calc" },
        ]}
      />
    </main>
  );
}
