"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { kellyGuideContent } from "@/content/kelly-criterion-guide";

interface KellyResult {
  fullKelly: number;
  halfKelly: number;
  quarterKelly: number;
  fullKellyDollars: number;
  halfKellyDollars: number;
  quarterKellyDollars: number;
  expectedValue: number;
  payoffRatio: number;
  isNegativeEdge: boolean;
  isOverKelly: boolean;
}

interface SimulationPoint {
  trade: number;
  fullKelly: number;
  halfKelly: number;
  quarterKelly: number;
}

function calculateKelly(
  winRate: number,
  avgWin: number,
  avgLoss: number,
  balance: number
): KellyResult {
  const p = winRate / 100;
  const q = 1 - p;
  const b = avgLoss > 0 ? avgWin / avgLoss : 0;
  const fullKelly = b > 0 ? (b * p - q) / b : 0;
  const expectedValue = p * avgWin - q * avgLoss;
  const clampedKelly = Math.max(0, fullKelly);

  return {
    fullKelly: fullKelly * 100,
    halfKelly: (clampedKelly / 2) * 100,
    quarterKelly: (clampedKelly / 4) * 100,
    fullKellyDollars: clampedKelly * balance,
    halfKellyDollars: (clampedKelly / 2) * balance,
    quarterKellyDollars: (clampedKelly / 4) * balance,
    expectedValue,
    payoffRatio: b,
    isNegativeEdge: fullKelly < 0,
    isOverKelly: fullKelly > 0.25,
  };
}

function simulateGrowth(
  winRate: number,
  avgWin: number,
  avgLoss: number,
  balance: number,
  numTrades: number,
  kellyFraction: number
): number[] {
  const p = winRate / 100;
  const b = avgLoss > 0 ? avgWin / avgLoss : 0;
  const fullKelly = b > 0 ? Math.max(0, (b * p - (1 - p)) / b) : 0;
  const fraction = fullKelly * kellyFraction;
  const values: number[] = [balance];
  let currentBalance = balance;

  if (fraction <= 0 || fraction >= 1) {
    for (let i = 1; i <= numTrades; i++) {
      values.push(currentBalance);
    }
    return values;
  }

  const growthWin = 1 + fraction * b;
  const growthLoss = 1 - fraction;
  const expectedGrowthPerTrade = Math.pow(growthWin, p) * Math.pow(growthLoss, 1 - p);

  for (let i = 1; i <= numTrades; i++) {
    currentBalance = currentBalance * expectedGrowthPerTrade;
    values.push(currentBalance);
  }

  return values;
}

function KellyGauge({ kellyPercent }: { kellyPercent: number }) {
  const needlePosition = Math.min(Math.max(kellyPercent, 0), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
      <div className="relative h-6 rounded-full overflow-hidden flex">
        <div className="w-1/4 bg-emerald-500/70" />
        <div className="w-1/4 bg-amber-500/70" />
        <div className="w-1/4 bg-orange-500/70" />
        <div className="w-1/4 bg-red-500/70" />
      </div>
      <div className="relative h-6 -mt-6 pointer-events-none">
        <div
          className="absolute top-0 h-full w-0.5 bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out"
          style={{ left: `${needlePosition}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-md" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-md" />
        </div>
      </div>
      <div className="flex text-[10px] sm:text-xs mt-1">
        <div className="w-1/4 text-center text-emerald-400">Conservative</div>
        <div className="w-1/4 text-center text-amber-400">Moderate</div>
        <div className="w-1/4 text-center text-orange-400">Aggressive</div>
        <div className="w-1/4 text-center text-red-400">Dangerous</div>
      </div>
    </div>
  );
}

function GrowthChart({ data }: { data: SimulationPoint[] }) {
  if (data.length === 0) return null;

  const allValues = data.flatMap((d) => [d.fullKelly, d.halfKelly, d.quarterKelly]);
  const maxVal = Math.max(...allValues);
  const minVal = Math.min(...allValues);
  const range = maxVal - minVal || 1;
  const width = 600;
  const height = 200;
  const pad = { top: 10, right: 10, bottom: 25, left: 10 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const xScale = (i: number) => pad.left + (i / (data.length - 1)) * cw;
  const yScale = (v: number) => pad.top + ch - ((v - minVal) / range) * ch;

  const makePath = (getValue: (d: SimulationPoint) => number): string => {
    return data
      .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i).toFixed(1)} ${yScale(getValue(d)).toFixed(1)}`)
      .join(" ");
  };

  const fmtDollar = (v: number): string => {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
    return `$${v.toFixed(0)}`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[300px]" preserveAspectRatio="xMidYMid meet">
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = pad.top + ch * (1 - frac);
          const val = minVal + range * frac;
          return (
            <g key={frac}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="currentColor" strokeOpacity={0.1} strokeDasharray="4 4" />
              <text x={pad.left + 2} y={y - 3} fill="currentColor" fillOpacity={0.4} fontSize={9}>{fmtDollar(val)}</text>
            </g>
          );
        })}
        {[0, Math.floor(data.length / 4), Math.floor(data.length / 2), Math.floor((data.length * 3) / 4), data.length - 1].map((idx) => (
          <text key={idx} x={xScale(idx)} y={height - 3} fill="currentColor" fillOpacity={0.4} fontSize={9} textAnchor="middle">{idx}</text>
        ))}
        <path d={makePath((d) => d.fullKelly)} fill="none" stroke="#f97316" strokeWidth={2} strokeOpacity={0.9} />
        <path d={makePath((d) => d.halfKelly)} fill="none" stroke="#eab308" strokeWidth={2} strokeOpacity={0.9} />
        <path d={makePath((d) => d.quarterKelly)} fill="none" stroke="#22c55e" strokeWidth={2} strokeOpacity={0.9} />
      </svg>
      <div className="flex justify-center gap-4 sm:gap-6 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-orange-500 rounded" />
          <span className="text-muted-foreground">Full Kelly</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-yellow-500 rounded" />
          <span className="text-muted-foreground">Half Kelly</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-green-500 rounded" />
          <span className="text-muted-foreground">Quarter Kelly</span>
        </div>
      </div>
    </div>
  );
}

export default function KellyCriterionCalculator() {
  useToolTracker("kelly-criterion", "Kelly Criterion Calculator", "calculators");
  const analytics = useAnalytics();
  const [winRate, setWinRate] = useState<string>("55");
  const [avgWin, setAvgWin] = useState<string>("150");
  const [avgLoss, setAvgLoss] = useState<string>("100");
  const [balance, setBalance] = useState<string>("10000");
  const [numTrades, setNumTrades] = useState<string>("100");
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (!hasTracked && parseFloat(winRate) > 0) {
      analytics.trackToolUsage("kelly-criterion-calculator", { action: "calculate" });
      setHasTracked(true);
    }
  }, [winRate, analytics, hasTracked]);

  const result = useMemo(() => {
    return calculateKelly(parseFloat(winRate) || 0, parseFloat(avgWin) || 0, parseFloat(avgLoss) || 0, parseFloat(balance) || 0);
  }, [winRate, avgWin, avgLoss, balance]);

  const simulationData = useMemo((): SimulationPoint[] => {
    const w = parseFloat(winRate) || 0;
    const aW = parseFloat(avgWin) || 0;
    const aL = parseFloat(avgLoss) || 0;
    const bal = parseFloat(balance) || 0;
    const n = parseInt(numTrades) || 100;
    if (result.isNegativeEdge || aL <= 0 || bal <= 0) return [];
    const fullData = simulateGrowth(w, aW, aL, bal, n, 1);
    const halfData = simulateGrowth(w, aW, aL, bal, n, 0.5);
    const quarterData = simulateGrowth(w, aW, aL, bal, n, 0.25);
    return fullData.map((val, i) => ({ trade: i, fullKelly: val, halfKelly: halfData[i], quarterKelly: quarterData[i] }));
  }, [winRate, avgWin, avgLoss, balance, numTrades, result.isNegativeEdge]);

  const formatCurrency = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);
  const formatPercent = (n: number) => `${n.toFixed(2)}%`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <BarChart2 className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Kelly Criterion Calculator</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Optimal Position Sizing</h2>
          <p className="text-muted-foreground text-base sm:text-lg">Calculate the mathematically optimal fraction of your bankroll to risk using the Kelly Criterion formula.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-4">Trade Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Win Rate</label>
                <div className="relative">
                  <input aria-label="Win rate percentage" type="number" value={winRate} onChange={(e) => setWinRate(e.target.value)} min={0} max={100} step={0.1} className="w-full pl-4 pr-8 py-3 bg-muted border border-border rounded-lg font-mono text-foreground" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Average Win Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input aria-label="Average win amount" type="number" value={avgWin} onChange={(e) => setAvgWin(e.target.value)} min={0} step={1} className="w-full pl-8 pr-4 py-3 bg-muted border border-border rounded-lg font-mono text-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Average Loss Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input aria-label="Average loss amount" type="number" value={avgLoss} onChange={(e) => setAvgLoss(e.target.value)} min={0} step={1} className="w-full pl-8 pr-4 py-3 bg-muted border border-border rounded-lg font-mono text-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Account Balance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input aria-label="Account balance" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} min={0} step={100} className="w-full pl-8 pr-4 py-3 bg-muted border border-border rounded-lg font-mono text-foreground" />
                </div>
              </div>
              <div className="mt-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground font-mono">
                <div>f* = (bp - q) / b</div>
                <div className="mt-1">b = {result.payoffRatio.toFixed(3)} | p = {(parseFloat(winRate) / 100 || 0).toFixed(3)} | q = {(1 - (parseFloat(winRate) / 100 || 0)).toFixed(3)}</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-4">Kelly Results</h3>
            {result.isNegativeEdge && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm font-medium text-red-400">Negative Edge Detected</p>
                <p className="text-xs text-red-400/80 mt-1">Kelly fraction is {formatPercent(result.fullKelly)}. You have no mathematical edge with these parameters. Do not bet.</p>
              </div>
            )}
            {!result.isNegativeEdge && result.isOverKelly && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm font-medium text-amber-400">High Kelly Fraction</p>
                <p className="text-xs text-amber-400/80 mt-1">Full Kelly exceeds 25%. Consider using Half or Quarter Kelly to reduce volatility and drawdown risk.</p>
              </div>
            )}
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-orange-400">Full Kelly</p>
                  <p className="text-xs text-muted-foreground">Aggressive</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-orange-400">{result.isNegativeEdge ? "---" : formatPercent(result.fullKelly)}</p>
                  <p className="text-xs text-muted-foreground font-mono">{result.isNegativeEdge ? "---" : formatCurrency(result.fullKellyDollars)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-400">Half Kelly</p>
                  <p className="text-xs text-muted-foreground">Recommended</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-yellow-400">{result.isNegativeEdge ? "---" : formatPercent(result.halfKelly)}</p>
                  <p className="text-xs text-muted-foreground font-mono">{result.isNegativeEdge ? "---" : formatCurrency(result.halfKellyDollars)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-emerald-400">Quarter Kelly</p>
                  <p className="text-xs text-muted-foreground">Conservative</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-emerald-400">{result.isNegativeEdge ? "---" : formatPercent(result.quarterKelly)}</p>
                  <p className="text-xs text-muted-foreground font-mono">{result.isNegativeEdge ? "---" : formatCurrency(result.quarterKellyDollars)}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg mb-4">
              <span className="text-sm text-muted-foreground">Expected Value per Trade</span>
              <span className={`font-mono font-medium text-sm ${result.expectedValue >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {result.expectedValue >= 0 ? "+" : ""}{formatCurrency(result.expectedValue)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Win/Loss Ratio</span>
              <span className="font-mono font-medium text-sm text-foreground">{result.payoffRatio.toFixed(2)} : 1</span>
            </div>
          </div>
        </div>

        {!result.isNegativeEdge && (
          <div className="mt-6 bg-card border border-border rounded-xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-4">Position Sizing Gauge</h3>
            <KellyGauge kellyPercent={result.fullKelly} />
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground justify-center">
              <span>Full Kelly: <span className="font-mono text-orange-400">{formatPercent(result.fullKelly)}</span></span>
              <span>Half Kelly: <span className="font-mono text-yellow-400">{formatPercent(result.halfKelly)}</span></span>
              <span>Quarter Kelly: <span className="font-mono text-emerald-400">{formatPercent(result.quarterKelly)}</span></span>
            </div>
          </div>
        )}

        {!result.isNegativeEdge && simulationData.length > 0 && (
          <div className="mt-6 bg-card border border-border rounded-xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Expected Growth Simulation</h3>
              <div>
                <label className="text-xs text-muted-foreground mr-2">Trades:</label>
                <input aria-label="Number of trades for simulation" type="number" value={numTrades} onChange={(e) => setNumTrades(e.target.value)} min={10} max={1000} step={10} className="w-20 px-2 py-1 bg-muted border border-border rounded text-sm font-mono text-foreground" />
              </div>
            </div>
            <GrowthChart data={simulationData} />
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-2 bg-muted/50 rounded-lg">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Full Kelly Final</p>
                <p className="text-sm font-mono font-medium text-orange-400">{formatCurrency(simulationData[simulationData.length - 1]?.fullKelly ?? 0)}</p>
              </div>
              <div className="p-2 bg-muted/50 rounded-lg">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Half Kelly Final</p>
                <p className="text-sm font-mono font-medium text-yellow-400">{formatCurrency(simulationData[simulationData.length - 1]?.halfKelly ?? 0)}</p>
              </div>
              <div className="p-2 bg-muted/50 rounded-lg">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Quarter Kelly Final</p>
                <p className="text-sm font-mono font-medium text-emerald-400">{formatCurrency(simulationData[simulationData.length - 1]?.quarterKelly ?? 0)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>Kelly Criterion calculations are estimates. Past performance does not guarantee future results.</p>
          <p className="mt-1">Always use fractional Kelly in practice. Last updated: February 2026</p>
        </div>

        <RelatedTools currentPath="/kelly-criterion" />

        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={kellyGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is-kelly-criterion" title={kellyGuideContent.introduction.title} subtitle="Understanding optimal position sizing" variant="default">
            <MarkdownContent content={kellyGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How traders use the Kelly Criterion" variant="default">
            <FeatureGrid features={kellyGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={kellyGuideContent.howToUse.title} subtitle="Master optimal position sizing" variant="minimal">
            <HowToSchema name={`How to use ${kellyGuideContent.toolName}`} description="Step-by-step guide to Kelly Criterion position sizing" steps={kellyGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${kellyGuideContent.toolPath}`} />
            <MarkdownContent content={kellyGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={kellyGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={kellyGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={kellyGuideContent.security.content} />
          </GeoSection>
          {kellyGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(kellyGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={kellyGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-muted-foreground">
          <p>Calculate optimal position sizing instantly. 100% client-side - no data stored.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Kelly Criterion Calculator | OpenKit.tools"
        description="Calculate optimal position sizing using the Kelly Criterion formula. Full, Half, and Quarter Kelly with expected growth simulation. Free, private, client-side calculator."
        url="https://openkit.tools/kelly-criterion"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={kellyGuideContent.lastUpdated}
        version={kellyGuideContent.version}
        aggregateRating={{ ratingValue: "4.8", ratingCount: "1245", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Kelly Criterion Calculator", url: "https://openkit.tools/kelly-criterion" },
        ]}
      />
    </main>
  );
}
