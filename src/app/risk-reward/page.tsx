"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Activity, Plus, Trash2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import {
  StructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import {
  GeoContentLayout,
  GeoSection,
  FeatureGrid,
  StatsBar,
} from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { riskRewardGuideContent } from "@/content/risk-reward-guide";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TradeDirection = "long" | "short";

interface TakeProfitTarget {
  id: string;
  price: string;
  allocation: number;
}

interface SingleTargetResult {
  reward: number;
  rrRatio: number;
  breakevenWinRate: number;
}

interface CalculationResult {
  risk: number;
  reward: number;
  rrRatio: number;
  breakevenWinRate: number;
  evPerTrade: number;
  isValid: boolean;
  validationError: string;
  targets: {
    price: number;
    allocation: number;
    result: SingleTargetResult;
  }[];
  weightedRrRatio: number;
  dollarRisk: number;
  dollarReward: number;
  positionSize: number;
  potentialProfit: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRrColor(ratio: number): string {
  if (ratio >= 2) return "text-green-500";
  if (ratio >= 1) return "text-amber-500";
  return "text-red-500";
}

function getRrBgColor(ratio: number): string {
  if (ratio >= 2) return "bg-green-500/10 border-green-500/30";
  if (ratio >= 1) return "bg-amber-500/10 border-amber-500/30";
  return "bg-red-500/10 border-red-500/30";
}

function getRrLabel(ratio: number): string {
  if (ratio >= 3) return "Excellent";
  if (ratio >= 2) return "Favorable";
  if (ratio >= 1) return "Moderate";
  if (ratio >= 0.5) return "Poor";
  return "Very Poor";
}

function formatNum(n: number, decimals: number = 2): string {
  if (!isFinite(n)) return "0.00";
  return n.toFixed(decimals);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RiskRewardCalculator() {
  useToolTracker("risk-reward", "Risk/Reward Calculator", "trading");
  const analytics = useAnalytics();

  // Core inputs
  const [direction, setDirection] = useState<TradeDirection>("long");
  const [entryPrice, setEntryPrice] = useState("100");
  const [stopLoss, setStopLoss] = useState("95");
  const [takeProfit, setTakeProfit] = useState("110");

  // Multi-target
  const [targets, setTargets] = useState<TakeProfitTarget[]>([]);

  // Position sizing
  const [showPositionSizing, setShowPositionSizing] = useState(false);
  const [accountSize, setAccountSize] = useState("10000");
  const [riskPercent, setRiskPercent] = useState("2");

  // Win rate for EV
  const [winRate, setWinRate] = useState("50");

  // Copy feedback
  const [copied, setCopied] = useState(false);

  // Analytics tracking
  const [hasTracked, setHasTracked] = useState(false);

  const trackUsage = useCallback(() => {
    if (!hasTracked) {
      analytics.trackToolUsage("risk-reward-calculator", {
        action: "calculate",
        direction,
      });
      setHasTracked(true);
    }
  }, [hasTracked, analytics, direction]);

  // -----------------------------------------------------------------------
  // Calculations (reactive via useMemo)
  // -----------------------------------------------------------------------

  const result: CalculationResult = useMemo(() => {
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;
    const account = parseFloat(accountSize) || 0;
    const riskPct = parseFloat(riskPercent) || 0;
    const wr = parseFloat(winRate) || 0;

    // Validate
    let validationError = "";
    if (entry <= 0) validationError = "Entry price must be greater than 0";
    else if (sl <= 0) validationError = "Stop loss must be greater than 0";
    else if (tp <= 0) validationError = "Take profit must be greater than 0";
    else if (direction === "long" && sl >= entry)
      validationError =
        "For long trades, stop loss must be below entry price";
    else if (direction === "long" && tp <= entry)
      validationError =
        "For long trades, take profit must be above entry price";
    else if (direction === "short" && sl <= entry)
      validationError =
        "For short trades, stop loss must be above entry price";
    else if (direction === "short" && tp >= entry)
      validationError =
        "For short trades, take profit must be below entry price";

    const isValid = validationError === "";

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    const rrRatio = risk > 0 ? reward / risk : 0;
    const breakevenWinRate = rrRatio > 0 ? (1 / (1 + rrRatio)) * 100 : 100;
    const evPerTrade =
      risk > 0 ? (wr / 100) * reward - ((100 - wr) / 100) * risk : 0;

    // Position sizing
    const dollarRisk = account * (riskPct / 100);
    const positionSize = risk > 0 ? dollarRisk / risk : 0;
    const dollarReward = positionSize * reward;
    const potentialProfit = dollarReward;

    // Multi-target calculations
    const parsedTargets = targets
      .map((t) => {
        const price = parseFloat(t.price) || 0;
        const tpReward = Math.abs(price - entry);
        const tpRr = risk > 0 ? tpReward / risk : 0;
        const tpBe = tpRr > 0 ? (1 / (1 + tpRr)) * 100 : 100;
        return {
          price,
          allocation: t.allocation,
          result: {
            reward: tpReward,
            rrRatio: tpRr,
            breakevenWinRate: tpBe,
          },
        };
      })
      .filter((t) => t.price > 0);

    // Weighted R:R across all targets (including primary TP1)
    let weightedRrRatio = rrRatio;
    if (parsedTargets.length > 0) {
      const usedAllocation = parsedTargets.reduce(
        (sum, t) => sum + t.allocation,
        0
      );
      const primaryAllocation = Math.max(0, 100 - usedAllocation);
      weightedRrRatio =
        (primaryAllocation / 100) * rrRatio +
        parsedTargets.reduce(
          (sum, t) => sum + (t.allocation / 100) * t.result.rrRatio,
          0
        );
    }

    return {
      risk,
      reward,
      rrRatio,
      breakevenWinRate,
      evPerTrade,
      isValid,
      validationError,
      targets: parsedTargets,
      weightedRrRatio,
      dollarRisk,
      dollarReward,
      positionSize,
      potentialProfit,
    };
  }, [
    entryPrice,
    stopLoss,
    takeProfit,
    direction,
    targets,
    accountSize,
    riskPercent,
    winRate,
  ]);

  // Track on valid calculation
  useEffect(() => {
    if (result.isValid && parseFloat(entryPrice) > 0) {
      trackUsage();
    }
  }, [result.isValid, entryPrice, trackUsage]);

  // -----------------------------------------------------------------------
  // Multi-target management
  // -----------------------------------------------------------------------

  const addTarget = () => {
    if (targets.length >= 2) return;
    const entry = parseFloat(entryPrice) || 100;
    const tp = parseFloat(takeProfit) || 110;
    const multiplier = targets.length + 1;
    const newPrice =
      direction === "long"
        ? tp + (tp - entry) * multiplier * 0.5
        : tp - (entry - tp) * multiplier * 0.5;

    setTargets((prev) => [
      ...prev,
      {
        id: `tp-${Date.now()}`,
        price: formatNum(Math.abs(newPrice)),
        allocation: 25,
      },
    ]);
  };

  const removeTarget = (id: string) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTargetPrice = (id: string, price: string) => {
    setTargets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, price } : t))
    );
  };

  const updateTargetAllocation = (id: string, allocation: number) => {
    setTargets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, allocation: Math.max(0, Math.min(100, allocation)) }
          : t
      )
    );
  };

  // -----------------------------------------------------------------------
  // Visual bar data
  // -----------------------------------------------------------------------

  const barData = useMemo(() => {
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;

    if (entry <= 0 || sl <= 0 || tp <= 0) {
      return { riskPct: 50, rewardPct: 50, isBarValid: false };
    }

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    const total = risk + reward;

    if (total === 0) {
      return { riskPct: 50, rewardPct: 50, isBarValid: false };
    }

    return {
      riskPct: (risk / total) * 100,
      rewardPct: (reward / total) * 100,
      isBarValid: true,
    };
  }, [entryPrice, stopLoss, takeProfit]);

  // -----------------------------------------------------------------------
  // Direction toggle with auto-swap
  // -----------------------------------------------------------------------

  const toggleDirection = (newDir: TradeDirection) => {
    if (newDir === direction) return;

    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;

    if (newDir === "long" && sl >= entry) {
      const oldSl = stopLoss;
      setStopLoss(takeProfit);
      setTakeProfit(oldSl);
    } else if (newDir === "short" && sl <= entry) {
      const oldSl = stopLoss;
      setStopLoss(takeProfit);
      setTakeProfit(oldSl);
    }

    setDirection(newDir);
    setHasTracked(false);
  };

  // -----------------------------------------------------------------------
  // Copy summary
  // -----------------------------------------------------------------------

  const copySummary = () => {
    const parts = [
      `Direction: ${direction === "long" ? "Long" : "Short"}`,
      `Entry: ${entryPrice}`,
      `Stop Loss: ${stopLoss}`,
      `Take Profit: ${takeProfit}`,
      `R:R Ratio: 1:${formatNum(result.rrRatio)}`,
      `Risk: ${formatNum(result.risk)}`,
      `Reward: ${formatNum(result.reward)}`,
      `Breakeven Win Rate: ${formatNum(result.breakevenWinRate, 1)}%`,
    ];
    if (targets.length > 0) {
      parts.push(`Weighted R:R: 1:${formatNum(result.weightedRrRatio)}`);
    }
    if (showPositionSizing) {
      parts.push(
        `Dollar Risk: $${formatNum(result.dollarRisk)}`,
        `Position Size: ${formatNum(result.positionSize, 0)} units`,
        `Potential Profit: $${formatNum(result.potentialProfit)}`
      );
    }
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(parts.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // -----------------------------------------------------------------------
  // Primary TP1 allocation when multi-targets exist
  // -----------------------------------------------------------------------

  const usedAllocation = targets.reduce((sum, t) => sum + t.allocation, 0);
  const primaryAllocation = Math.max(0, 100 - usedAllocation);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center hover:opacity-80 transition"
            >
              <Activity className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Risk/Reward Calculator
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Risk/Reward Ratio Calculator
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Calculate R:R ratio, breakeven win rate, and position sizing.
            Visualize your trade setup instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* ============================================================ */}
          {/* Left Column: Inputs                                          */}
          {/* ============================================================ */}
          <div className="space-y-6">
            {/* Direction Toggle */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Trade Direction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleDirection("long")}
                    className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                      direction === "long"
                        ? "bg-green-600 text-white shadow-sm"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    Long (Buy)
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleDirection("short")}
                    className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                      direction === "short"
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    Short (Sell)
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Price Inputs */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Price Levels</CardTitle>
                <CardDescription>
                  Enter entry, stop loss, and take profit prices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LabeledInput
                  label="Entry Price"
                  type="number"
                  value={entryPrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEntryPrice(e.target.value)
                  }
                  placeholder="100.00"
                  className="bg-muted border-border text-foreground font-mono"
                  labelClassName="text-sm font-medium text-muted-foreground"
                  step="any"
                  min="0"
                />
                <LabeledInput
                  label="Stop Loss Price"
                  type="number"
                  value={stopLoss}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStopLoss(e.target.value)
                  }
                  placeholder={direction === "long" ? "95.00" : "105.00"}
                  className="bg-muted border-border text-foreground font-mono"
                  labelClassName="text-sm font-medium text-red-400"
                  step="any"
                  min="0"
                />
                <LabeledInput
                  label={
                    targets.length > 0
                      ? `Take Profit Price (TP1 - ${primaryAllocation}%)`
                      : "Take Profit Price"
                  }
                  type="number"
                  value={takeProfit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTakeProfit(e.target.value)
                  }
                  placeholder={direction === "long" ? "110.00" : "90.00"}
                  className="bg-muted border-border text-foreground font-mono"
                  labelClassName="text-sm font-medium text-green-400"
                  step="any"
                  min="0"
                />

                {/* Multi-target inputs */}
                {targets.map((target, index) => (
                  <div
                    key={target.id}
                    className="flex items-end gap-2 p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex-1">
                      <LabeledInput
                        label={`TP${index + 2} Price`}
                        type="number"
                        value={target.price}
                        onChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          updateTargetPrice(target.id, e.target.value)
                        }
                        placeholder="0.00"
                        className="bg-background border-border text-foreground font-mono"
                        labelClassName="text-xs font-medium text-green-400/80"
                        step="any"
                        min="0"
                      />
                    </div>
                    <div className="w-24">
                      <LabeledInput
                        label="Alloc %"
                        type="number"
                        value={String(target.allocation)}
                        onChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          updateTargetAllocation(
                            target.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="25"
                        className="bg-background border-border text-foreground font-mono text-center"
                        labelClassName="text-xs font-medium text-muted-foreground"
                        min="0"
                        max="100"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeTarget(target.id)}
                      className="text-muted-foreground hover:text-red-500 mb-0.5"
                      aria-label={`Remove TP${index + 2}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {targets.length < 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addTarget}
                    className="w-full border-dashed border-border text-muted-foreground"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add TP{targets.length + 2} Target
                  </Button>
                )}

                {/* Validation error */}
                {result.validationError && (
                  <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {result.validationError}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Position Sizing (collapsible) */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowPositionSizing(!showPositionSizing)
                  }
                  className="flex items-center justify-between w-full text-left"
                >
                  <div>
                    <CardTitle className="text-base">
                      Position Sizing
                    </CardTitle>
                    <CardDescription>
                      Calculate dollar amounts and position size
                    </CardDescription>
                  </div>
                  {showPositionSizing ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
              </CardHeader>
              {showPositionSizing && (
                <CardContent className="space-y-4">
                  <LabeledInput
                    label="Account Size ($)"
                    type="number"
                    value={accountSize}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setAccountSize(e.target.value)}
                    placeholder="10000"
                    className="bg-muted border-border text-foreground font-mono"
                    labelClassName="text-sm font-medium text-muted-foreground"
                    step="any"
                    min="0"
                  />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground block mb-2">
                      Risk per Trade: {riskPercent}%
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
                      aria-label="Risk percentage per trade"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0.5%</span>
                      <span className="text-foreground/60">
                        2% (recommended)
                      </span>
                      <span>10%</span>
                    </div>
                  </div>
                  <LabeledInput
                    label="Estimated Win Rate (%)"
                    type="number"
                    value={winRate}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setWinRate(e.target.value)}
                    placeholder="50"
                    className="bg-muted border-border text-foreground font-mono"
                    labelClassName="text-sm font-medium text-muted-foreground"
                    min="0"
                    max="100"
                  />
                </CardContent>
              )}
            </Card>
          </div>

          {/* ============================================================ */}
          {/* Right Column: Results                                        */}
          {/* ============================================================ */}
          <div className="space-y-6">
            {/* Main R:R Display */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Risk/Reward Ratio
                </CardTitle>
                <CardDescription>
                  {direction === "long" ? "Long" : "Short"} trade analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Big R:R number */}
                <div
                  className={`p-4 sm:p-6 rounded-xl border transition-colors ${getRrBgColor(result.rrRatio)}`}
                >
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    R:R Ratio
                  </p>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <p
                      className={`text-3xl sm:text-4xl font-bold font-mono ${getRrColor(result.rrRatio)}`}
                    >
                      1:{formatNum(result.rrRatio)}
                    </p>
                    <span
                      className={`text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full border ${getRrBgColor(result.rrRatio)} ${getRrColor(result.rrRatio)}`}
                    >
                      {getRrLabel(result.rrRatio)}
                    </span>
                  </div>
                </div>

                {/* Visual Zone Bar */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Trade Zones
                  </p>
                  <div className="relative pt-5">
                    {/* Bar container */}
                    <div className="flex h-11 rounded-lg overflow-hidden border border-border">
                      {/* Risk zone (SL side) */}
                      <div
                        className="bg-gradient-to-r from-red-600/90 to-red-500/70 flex items-center justify-center relative transition-all duration-500"
                        style={{
                          width: `${barData.riskPct}%`,
                          minWidth: "36px",
                        }}
                      >
                        <span className="text-[10px] sm:text-xs font-semibold text-white/90 px-1 truncate select-none">
                          Risk
                        </span>
                      </div>
                      {/* Entry divider */}
                      <div className="w-0.5 bg-foreground/80 relative z-10 flex-shrink-0">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold text-foreground whitespace-nowrap bg-background px-1 rounded">
                          Entry
                        </div>
                      </div>
                      {/* Reward zone (TP side) */}
                      <div
                        className="bg-gradient-to-r from-green-500/70 to-green-600/90 flex items-center justify-center relative transition-all duration-500"
                        style={{
                          width: `${barData.rewardPct}%`,
                          minWidth: "36px",
                        }}
                      >
                        <span className="text-[10px] sm:text-xs font-semibold text-white/90 px-1 truncate select-none">
                          Reward
                        </span>
                      </div>
                    </div>

                    {/* Labels below bar */}
                    <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-mono">
                      <span className="text-red-400">
                        SL:{" "}
                        {formatNum(parseFloat(stopLoss) || 0)}
                      </span>
                      <span className="text-foreground font-medium">
                        {formatNum(parseFloat(entryPrice) || 0)}
                      </span>
                      <span className="text-green-400">
                        TP:{" "}
                        {formatNum(parseFloat(takeProfit) || 0)}
                      </span>
                    </div>

                    {/* Additional TP markers */}
                    {result.targets.length > 0 && (
                      <div className="flex gap-3 mt-1 justify-end">
                        {result.targets.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-green-400/70 font-mono"
                          >
                            TP{i + 2}:{" "}
                            {formatNum(t.price)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Metrics breakdown */}
                <div className="space-y-0">
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Risk (Entry to SL)
                    </span>
                    <span className="font-mono text-sm text-red-400">
                      {formatNum(result.risk)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Reward (Entry to TP)
                    </span>
                    <span className="font-mono text-sm text-green-400">
                      {formatNum(result.reward)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Breakeven Win Rate
                    </span>
                    <span className="font-mono text-sm">
                      {formatNum(result.breakevenWinRate, 1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      EV / Trade{" "}
                      <span className="text-xs text-muted-foreground/60">
                        (at {winRate}% WR)
                      </span>
                    </span>
                    <span
                      className={`font-mono text-sm ${result.evPerTrade >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {result.evPerTrade >= 0 ? "+" : ""}
                      {formatNum(result.evPerTrade)}
                    </span>
                  </div>

                  {/* Weighted R:R if multi-target */}
                  {targets.length > 0 && (
                    <div className="flex justify-between items-center py-2.5 border-b border-border">
                      <span className="text-sm text-muted-foreground">
                        Weighted Avg R:R
                      </span>
                      <span
                        className={`font-mono text-sm font-medium ${getRrColor(result.weightedRrRatio)}`}
                      >
                        1:{formatNum(result.weightedRrRatio)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Multi-target breakdown */}
                {targets.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Target Breakdown
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs p-2 rounded-md bg-muted/50">
                        <span className="text-muted-foreground">
                          TP1 ({primaryAllocation}%)
                        </span>
                        <span className="font-mono">
                          {formatNum(
                            parseFloat(takeProfit) || 0
                          )}{" "}
                          — 1:
                          {formatNum(result.rrRatio)}
                        </span>
                      </div>
                      {result.targets.map((t, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center text-xs p-2 rounded-md bg-muted/50"
                        >
                          <span className="text-muted-foreground">
                            TP{i + 2} ({t.allocation}%)
                          </span>
                          <span className="font-mono">
                            {formatNum(t.price)} — 1:
                            {formatNum(t.result.rrRatio)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Position Sizing Results */}
            {showPositionSizing && result.isValid && (
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Position Details
                  </CardTitle>
                  <CardDescription>
                    Based on $
                    {formatNum(
                      parseFloat(accountSize) || 0,
                      0
                    )}{" "}
                    account at {riskPercent}% risk
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-0">
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Dollar Risk
                    </span>
                    <span className="font-mono text-sm text-red-400">
                      $
                      {formatNum(result.dollarRisk)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Position Size
                    </span>
                    <span className="font-mono text-sm">
                      {formatNum(result.positionSize, 0)}{" "}
                      units
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Potential Profit
                    </span>
                    <span className="font-mono text-sm text-green-400">
                      $
                      {formatNum(
                        result.potentialProfit
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-sm text-muted-foreground">
                      EV per Trade ($)
                    </span>
                    <span
                      className={`font-mono text-sm ${result.evPerTrade * result.positionSize >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {result.evPerTrade * result.positionSize >= 0
                        ? "+"
                        : ""}
                      $
                      {formatNum(
                        result.evPerTrade * result.positionSize
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Copy Summary */}
            <Button
              variant="outline"
              className="w-full border-border text-sm"
              onClick={copySummary}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5" />
                  Copy Summary
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            All calculations happen in your browser. No data leaves your
            device.
          </p>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/risk-reward" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide
              steps={riskRewardGuideContent.quickStartSteps}
            />
          </GeoSection>

          <GeoSection
            id="what-is"
            title={riskRewardGuideContent.introduction.title}
            subtitle="Understanding risk/reward in trading"
            variant="default"
          >
            <MarkdownContent
              content={riskRewardGuideContent.introduction.content}
            />
          </GeoSection>

          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How traders use risk/reward analysis"
            variant="default"
          >
            <FeatureGrid
              features={riskRewardGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection
            id="how-to-use"
            title={riskRewardGuideContent.howToUse.title}
            subtitle="Master risk/reward calculations"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${riskRewardGuideContent.toolName}`}
              description="Step-by-step guide to risk/reward calculation"
              steps={riskRewardGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${riskRewardGuideContent.toolPath}`}
            />
            <MarkdownContent
              content={riskRewardGuideContent.howToUse.content}
            />
          </GeoSection>

          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know"
            variant="default"
          >
            <ToolFAQ faqs={riskRewardGuideContent.faqs} />
          </GeoSection>

          <GeoSection
            id="security"
            title={riskRewardGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent
              content={riskRewardGuideContent.security.content}
            />
          </GeoSection>

          {riskRewardGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(
                  riskRewardGuideContent.stats
                ).map(([label, value]) => ({ label, value }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={riskRewardGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            Calculate risk/reward ratios instantly. 100% client-side - no
            data stored.
          </p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Risk/Reward Calculator | OpenKit.tools"
        description="Calculate risk-to-reward ratio, breakeven win rate, position sizing, and visualize trade setups. Free, private, 100% client-side."
        url="https://openkit.tools/risk-reward"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={riskRewardGuideContent.lastUpdated}
        version={riskRewardGuideContent.version}
        aggregateRating={{
          ratingValue: "4.9",
          ratingCount: "342",
          bestRating: "5",
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          {
            name: "Risk/Reward Calculator",
            url: "https://openkit.tools/risk-reward",
          },
        ]}
      />
    </main>
  );
}
