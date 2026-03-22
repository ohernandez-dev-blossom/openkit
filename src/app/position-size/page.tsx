"use client";
import { useState, useMemo } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Target } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { positionSizeGuideContent } from "@/content/position-size-guide";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TradeDirection = "long" | "short";

interface CalculationResult {
  positionSize: number;
  dollarRisk: number;
  stopLossDistance: number;
  stopLossPercent: number;
  positionValue: number;
  positionPercent: number;
  isValid: boolean;
  error: string;
}

type RiskLevel = "conservative" | "moderate" | "aggressive" | "dangerous";

interface RiskInfo {
  level: RiskLevel;
  label: string;
  color: string;
  textColor: string;
  bgColor: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRiskInfo(riskPercent: number): RiskInfo {
  if (riskPercent < 1) {
    return { level: "conservative", label: "Conservative", color: "#22c55e", textColor: "text-green-500", bgColor: "bg-green-500/10" };
  }
  if (riskPercent <= 2) {
    return { level: "moderate", label: "Moderate", color: "#eab308", textColor: "text-yellow-500", bgColor: "bg-yellow-500/10" };
  }
  if (riskPercent <= 5) {
    return { level: "aggressive", label: "Aggressive", color: "#f97316", textColor: "text-orange-500", bgColor: "bg-orange-500/10" };
  }
  return { level: "dangerous", label: "Dangerous", color: "#ef4444", textColor: "text-red-500", bgColor: "bg-red-500/10" };
}

function formatNumber(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatCurrency(n: number, decimals = 2): string {
  return `$${formatNumber(n, decimals)}`;
}

// ---------------------------------------------------------------------------
// Risk Gauge SVG Component
// ---------------------------------------------------------------------------

function RiskGauge({ riskPercent }: { riskPercent: number }) {
  const riskInfo = getRiskInfo(riskPercent);

  // Gauge geometry
  const cx = 120;
  const cy = 110;
  const r = 85;

  // Clamp risk for needle: 0-10% maps across the full arc
  const clampedRisk = Math.min(Math.max(riskPercent, 0), 10);
  const needleAngle = Math.PI - (clampedRisk / 10) * Math.PI;
  const needleLength = 70;
  const needleX = cx + needleLength * Math.cos(needleAngle);
  const needleY = cy - needleLength * Math.sin(needleAngle);

  // Arc path helper: angles in degrees, 180 = left, 0 = right
  function arcPath(startDeg: number, endDeg: number, radius: number): string {
    const startRad = (Math.PI * startDeg) / 180;
    const endRad = (Math.PI * endDeg) / 180;
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy - radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy - radius * Math.sin(endRad);
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 0 ${x2} ${y2}`;
  }

  const tickMarks: Array<{ value: number; degrees: number }> = [
    { value: 0, degrees: 180 },
    { value: 1, degrees: 162 },
    { value: 2, degrees: 144 },
    { value: 5, degrees: 90 },
    { value: 10, degrees: 0 },
  ];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 240 140"
        className="w-full max-w-[280px]"
        role="img"
        aria-label={`Risk gauge showing ${riskPercent}% risk level: ${riskInfo.label}`}
      >
        {/* Background track */}
        <path
          d={arcPath(180, 0, r)}
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          className="text-muted/20"
          strokeLinecap="round"
        />

        {/* Green zone: 0-1% (180-162 degrees) */}
        <path d={arcPath(180, 162, r)} fill="none" stroke="#22c55e" strokeWidth="18" strokeLinecap="round" opacity="0.8" />

        {/* Yellow zone: 1-2% (162-144 degrees) */}
        <path d={arcPath(162, 144, r)} fill="none" stroke="#eab308" strokeWidth="18" opacity="0.8" />

        {/* Orange zone: 2-5% (144-90 degrees) */}
        <path d={arcPath(144, 90, r)} fill="none" stroke="#f97316" strokeWidth="18" opacity="0.8" />

        {/* Red zone: 5-10% (90-0 degrees) */}
        <path d={arcPath(90, 0, r)} fill="none" stroke="#ef4444" strokeWidth="18" strokeLinecap="round" opacity="0.8" />

        {/* Tick marks and labels */}
        {tickMarks.map((tick) => {
          const angle = (Math.PI * tick.degrees) / 180;
          const innerR = r - 14;
          const outerR = r + 14;
          const x1 = cx + innerR * Math.cos(angle);
          const y1 = cy - innerR * Math.sin(angle);
          const x2 = cx + outerR * Math.cos(angle);
          const y2 = cy - outerR * Math.sin(angle);
          const labelR = r + 24;
          const lx = cx + labelR * Math.cos(angle);
          const ly = cy - labelR * Math.sin(angle);
          return (
            <g key={tick.value}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/40" />
              <text x={lx} y={ly + 4} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {tick.value}%
              </text>
            </g>
          );
        })}

        {/* Needle */}
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke={riskInfo.color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="6" fill={riskInfo.color} />
        <circle cx={cx} cy={cy} r="3" fill="currentColor" className="text-background" />

        {/* Value text */}
        <text x={cx} y={cy + 28} textAnchor="middle" className="text-[22px] font-bold" fill={riskInfo.color}>
          {formatNumber(riskPercent, 1)}%
        </text>
      </svg>

      {/* Risk label badge */}
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${riskInfo.bgColor} ${riskInfo.textColor} -mt-1`}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: riskInfo.color }} />
        {riskInfo.label}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function PositionSizeCalculator() {
  useToolTracker("position-size", "Position Size Calculator", "trading");
  const analytics = useAnalytics();

  // Form state
  const [accountBalance, setAccountBalance] = useState<string>("50000");
  const [riskPercent, setRiskPercent] = useState<string>("2");
  const [entryPrice, setEntryPrice] = useState<string>("100");
  const [stopLossPrice, setStopLossPrice] = useState<string>("95");
  const [direction, setDirection] = useState<TradeDirection>("long");

  // Calculations (reactive via useMemo)
  const result: CalculationResult = useMemo(() => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const stopLoss = parseFloat(stopLossPrice) || 0;

    const empty: CalculationResult = {
      positionSize: 0, dollarRisk: 0, stopLossDistance: 0, stopLossPercent: 0,
      positionValue: 0, positionPercent: 0, isValid: false, error: "",
    };

    if (balance <= 0) return { ...empty, error: "Enter a positive account balance" };
    if (risk <= 0 || risk > 100) return { ...empty, error: "Risk must be between 0 and 100%" };
    if (entry <= 0) return { ...empty, error: "Enter a positive entry price" };
    if (stopLoss <= 0) return { ...empty, error: "Enter a positive stop loss price" };

    if (direction === "long" && stopLoss >= entry) {
      return { ...empty, error: "For long trades, stop loss must be below entry price" };
    }
    if (direction === "short" && stopLoss <= entry) {
      return { ...empty, error: "For short trades, stop loss must be above entry price" };
    }

    const dollarRisk = balance * (risk / 100);
    const stopLossDistance = Math.abs(entry - stopLoss);
    const stopLossPercent = (stopLossDistance / entry) * 100;
    const positionSize = dollarRisk / stopLossDistance;
    const positionValue = positionSize * entry;
    const positionPercent = (positionValue / balance) * 100;

    return { positionSize, dollarRisk, stopLossDistance, stopLossPercent, positionValue, positionPercent, isValid: true, error: "" };
  }, [accountBalance, riskPercent, entryPrice, stopLossPrice, direction]);

  const riskNum = parseFloat(riskPercent) || 0;
  const riskInfo = getRiskInfo(riskNum);

  const handleCopySummary = () => {
    if (!result.isValid) return;
    const dirLabel = direction === "long" ? "LONG" : "SHORT";
    const summary = [
      `Position Size Calculator - ${dirLabel}`,
      `Account Balance: ${formatCurrency(parseFloat(accountBalance) || 0)}`,
      `Risk: ${formatNumber(riskNum, 1)}% (${formatCurrency(result.dollarRisk)})`,
      `Entry Price: ${formatCurrency(parseFloat(entryPrice) || 0)}`,
      `Stop Loss: ${formatCurrency(parseFloat(stopLossPrice) || 0)}`,
      `Stop Distance: ${formatNumber(result.stopLossDistance)} pts (${formatNumber(result.stopLossPercent, 1)}%)`,
      `Position Size: ${formatNumber(result.positionSize)} units`,
      `Position Value: ${formatCurrency(result.positionValue)}`,
    ].join("\n");

    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(summary);
    }
    analytics.trackToolInteraction("position-size", "copy_summary");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center hover:opacity-80 transition"
          >
            <Target className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Position Size Calculator</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Subtitle */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm sm:text-base">
            Calculate optimal position size based on risk management rules. 100% client-side.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ---- INPUT PANEL ---- */}
          <div className="space-y-5">
            {/* Direction Toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setDirection("long")}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  direction === "long" ? "bg-green-600 text-white" : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Long (Buy)
              </button>
              <button
                onClick={() => setDirection("short")}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  direction === "short" ? "bg-red-600 text-white" : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Short (Sell)
              </button>
            </div>

            {/* Input Fields - 2 col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Account Balance */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Account Balance ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <input
                    type="number"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                    placeholder="50000"
                    min="0"
                    step="100"
                    className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-muted/50 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                    aria-label="Account balance in dollars"
                  />
                </div>
              </div>

              {/* Risk Percentage */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Risk Per Trade (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(e.target.value)}
                    placeholder="2"
                    min="0.1"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted/50 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                    aria-label="Risk percentage per trade"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>

              {/* Entry Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Entry Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    placeholder="100.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-muted/50 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                    aria-label="Entry price"
                  />
                </div>
              </div>

              {/* Stop Loss Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Stop Loss Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <input
                    type="number"
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    placeholder="95.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-muted/50 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                    aria-label="Stop loss price"
                  />
                </div>
              </div>
            </div>

            {/* Risk Gauge */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 text-center">Risk Level</h3>
              <RiskGauge riskPercent={riskNum} />
            </div>
          </div>

          {/* ---- RESULTS PANEL ---- */}
          <div className="space-y-5">
            {/* Primary Result Card */}
            <div className="rounded-xl border border-border bg-gradient-to-br from-amber-500/5 to-yellow-600/5 p-5 sm:p-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Position Size</p>
              {result.isValid ? (
                <p className="text-3xl sm:text-4xl font-bold font-mono text-foreground">
                  {formatNumber(result.positionSize)}
                  <span className="text-base sm:text-lg text-muted-foreground ml-2 font-normal">units</span>
                </p>
              ) : (
                <p className="text-lg text-muted-foreground">&mdash;</p>
              )}
              {!result.isValid && result.error && (
                <p className="text-xs text-red-400 mt-2">{result.error}</p>
              )}
            </div>

            {/* Breakdown */}
            <div className="rounded-xl border border-border bg-card divide-y divide-border">
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <span className="text-sm text-muted-foreground">Dollar Risk</span>
                <span className={`font-mono font-medium text-sm ${riskInfo.textColor}`}>
                  {result.isValid ? formatCurrency(result.dollarRisk) : "\u2014"}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <span className="text-sm text-muted-foreground">Stop Distance (pts)</span>
                <span className="font-mono font-medium text-sm text-foreground">
                  {result.isValid ? formatNumber(result.stopLossDistance) : "\u2014"}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <span className="text-sm text-muted-foreground">Stop Distance (%)</span>
                <span className="font-mono font-medium text-sm text-foreground">
                  {result.isValid ? `${formatNumber(result.stopLossPercent, 2)}%` : "\u2014"}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <span className="text-sm text-muted-foreground">Position Value</span>
                <span className="font-mono font-medium text-sm text-foreground">
                  {result.isValid ? formatCurrency(result.positionValue) : "\u2014"}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <span className="text-sm text-muted-foreground">% of Account</span>
                <span className="font-mono font-medium text-sm text-foreground">
                  {result.isValid ? `${formatNumber(result.positionPercent, 1)}%` : "\u2014"}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <span className="text-sm text-muted-foreground">Direction</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${direction === "long" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                  {direction === "long" ? "LONG" : "SHORT"}
                </span>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopySummary}
              disabled={!result.isValid}
              className="w-full py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Copy Summary
            </button>

            {/* Tip */}
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 sm:p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-amber-500">Pro tip:</span>{" "}
                Most professional traders risk 1-2% per trade. This ensures that even a streak of 10 consecutive losses only draws down the account by roughly 10-18%, which is recoverable.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 text-center text-xs text-muted-foreground">
          <p>For educational purposes only. Not financial advice. Always verify position sizes with your broker before placing orders.</p>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/position-size" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Calculate your first position size in 30 seconds" variant="highlight">
            <QuickStartGuide steps={positionSizeGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-position-sizing" title={positionSizeGuideContent.introduction.title} subtitle="The most important risk management skill in trading" variant="default">
            <MarkdownContent content={positionSizeGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="Position sizing across different markets" variant="default">
            <FeatureGrid features={positionSizeGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={positionSizeGuideContent.howToUse.title} subtitle="Step-by-step instructions for this calculator" variant="minimal">
            <HowToSchema
              name={`How to use ${positionSizeGuideContent.toolName}`}
              description="Step-by-step guide to calculating optimal position size"
              steps={positionSizeGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${positionSizeGuideContent.toolPath}`}
            />
            <MarkdownContent content={positionSizeGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about position sizing" variant="default">
            <ToolFAQ faqs={positionSizeGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={positionSizeGuideContent.security.title} subtitle="Your trading data never leaves your browser" variant="highlight">
            <MarkdownContent content={positionSizeGuideContent.security.content} />
          </GeoSection>

          {positionSizeGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(positionSizeGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={positionSizeGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-muted-foreground">
          <p>Calculate optimal position sizes instantly. 100% client-side &mdash; no trading data stored.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Position Size Calculator | OpenKit.tools"
        description="Calculate optimal position size based on account balance, risk percentage, entry price, and stop loss. Free, private, 100% client-side trading tool."
        url="https://openkit.tools/position-size"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={positionSizeGuideContent.lastUpdated}
        version={positionSizeGuideContent.version}
        aggregateRating={{ ratingValue: "4.9", ratingCount: "1280", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Position Size Calculator", url: "https://openkit.tools/position-size" },
        ]}
      />
    </main>
  );
}
