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
import { marginCalcGuideContent } from "@/content/margin-calc-guide";

interface MarginResult {
  requiredMargin: number;
  marginUsedPct: number;
  freeMargin: number;
  liquidationPrice: number;
  maxPosition: number;
  marginLevel: number;
  notionalValue: number;
}

function calculateMargin(
  positionSize: number,
  entryPrice: number,
  leverage: number,
  accountBalance: number,
  maintenanceMarginPct: number
): MarginResult {
  const notionalValue = positionSize * entryPrice;
  const requiredMargin = leverage > 0 ? notionalValue / leverage : notionalValue;
  const marginUsedPct = accountBalance > 0 ? (requiredMargin / accountBalance) * 100 : 0;
  const freeMargin = Math.max(0, accountBalance - requiredMargin);
  const marginLevel = requiredMargin > 0 ? (accountBalance / requiredMargin) * 100 : 0;

  // Liquidation price for long position
  // When unrealized loss = margin - maintenance margin
  // loss = (entry - liq) * positionSize = requiredMargin * (1 - maintenanceMarginPct/100)
  const lossToLiquidation = requiredMargin * (1 - maintenanceMarginPct / 100);
  const liquidationPrice = positionSize > 0
    ? Math.max(0, entryPrice - lossToLiquidation / positionSize)
    : 0;

  const maxPosition = entryPrice > 0 && leverage > 0
    ? (accountBalance * leverage) / entryPrice
    : 0;

  return {
    requiredMargin,
    marginUsedPct: Math.min(marginUsedPct, 100),
    freeMargin,
    liquidationPrice,
    maxPosition,
    marginLevel,
    notionalValue,
  };
}

const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10, 20, 25, 50, 75, 100, 125, 150, 200];

function EquityBar({ usedPct }: { usedPct: number }) {
  const clamped = Math.min(Math.max(usedPct, 0), 100);
  const getColor = (pct: number) => {
    if (pct <= 30) return "bg-emerald-500";
    if (pct <= 60) return "bg-yellow-500";
    if (pct <= 80) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Margin Used: {clamped.toFixed(1)}%</span>
        <span>Free: {(100 - clamped).toFixed(1)}%</span>
      </div>
      <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-500 ${getColor(clamped)}`}
          style={{ width: `${clamped}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {clamped <= 30 && <span className="text-emerald-200">Safe</span>}
          {clamped > 30 && clamped <= 60 && <span className="text-yellow-200">Caution</span>}
          {clamped > 60 && clamped <= 80 && <span className="text-orange-200">Warning</span>}
          {clamped > 80 && <span className="text-red-200">Danger</span>}
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>0%</span>
        <span className="text-emerald-500">30%</span>
        <span className="text-yellow-500">60%</span>
        <span className="text-red-500">100%</span>
      </div>
    </div>
  );
}

export default function MarginCalcPage() {
  useToolTracker("margin-calc", "Margin & Leverage Calculator", "trading");
  const analytics = useAnalytics();

  const [positionSize, setPositionSize] = useState(1);
  const [entryPrice, setEntryPrice] = useState(50000);
  const [leverage, setLeverage] = useState(10);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [maintenanceMargin, setMaintenanceMargin] = useState(50);
  const [showGuide, setShowGuide] = useState(false);

  const result = useMemo(
    () => calculateMargin(positionSize, entryPrice, leverage, accountBalance, maintenanceMargin),
    [positionSize, entryPrice, leverage, accountBalance, maintenanceMargin]
  );

  const handleChange = useCallback(() => {
    analytics.trackEvent("tool_interaction", "calculate", { leverage, positionSize });
  }, [analytics, leverage, positionSize]);

  const formatCurrency = (v: number): string =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatLarge = (v: number): string =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚖</span>
            </div>
            <h1 className="text-xl font-semibold">Margin & Leverage Calculator</h1>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton toolId="margin-calc" data={{ positionSize, entryPrice, leverage, accountBalance }} variant="outline" className="border-border" />
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">← Tools</Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Inputs */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">Position Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Position Size (units)</label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={positionSize}
                  onChange={(e) => { setPositionSize(Number(e.target.value)); handleChange(); }}
                  className="font-mono bg-background border-border"
                  placeholder="1"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Entry Price ($)</label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={entryPrice}
                  onChange={(e) => { setEntryPrice(Number(e.target.value)); handleChange(); }}
                  className="font-mono bg-background border-border"
                  placeholder="50000"
                />
              </div>
            </div>

            {/* Leverage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-muted-foreground">Leverage</label>
                <span className="text-lg font-mono font-bold text-foreground">{leverage}x</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LEVERAGE_OPTIONS.map((lev) => (
                  <Button
                    key={lev}
                    variant={leverage === lev ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${leverage === lev ? "bg-orange-600 hover:bg-orange-700" : "border-border"}`}
                    onClick={() => { setLeverage(lev); handleChange(); }}
                  >
                    {lev}x
                  </Button>
                ))}
              </div>
              <input
                type="range"
                min={1}
                max={200}
                value={leverage}
                onChange={(e) => { setLeverage(Number(e.target.value)); handleChange(); }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-orange-500 bg-muted"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Account Balance ($)</label>
                <Input
                  type="number"
                  min={0}
                  value={accountBalance}
                  onChange={(e) => { setAccountBalance(Number(e.target.value)); handleChange(); }}
                  className="font-mono bg-background border-border"
                  placeholder="10000"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Maintenance Margin (%)</label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={maintenanceMargin}
                  onChange={(e) => { setMaintenanceMargin(Number(e.target.value)); handleChange(); }}
                  className="font-mono bg-background border-border"
                  placeholder="50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equity Bar */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold">Margin Usage</h2>
          </CardHeader>
          <CardContent>
            <EquityBar usedPct={result.marginUsedPct} />
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Required Margin</p>
            <p className="text-lg font-mono font-bold text-orange-400">{formatCurrency(result.requiredMargin)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Margin Used</p>
            <p className={`text-lg font-mono font-bold ${result.marginUsedPct <= 50 ? "text-emerald-400" : result.marginUsedPct <= 80 ? "text-yellow-400" : "text-red-400"}`}>
              {result.marginUsedPct.toFixed(1)}%
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Free Margin</p>
            <p className="text-lg font-mono font-bold text-emerald-400">{formatCurrency(result.freeMargin)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Liquidation Price</p>
            <p className="text-lg font-mono font-bold text-red-400">{formatCurrency(result.liquidationPrice)}</p>
            <p className="text-[10px] text-muted-foreground">
              {entryPrice > 0 ? ((1 - result.liquidationPrice / entryPrice) * 100).toFixed(1) : "0"}% from entry
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Max Position</p>
            <p className="text-lg font-mono font-bold text-foreground">{result.maxPosition.toFixed(4)}</p>
            <p className="text-[10px] text-muted-foreground">at {leverage}x leverage</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Margin Level</p>
            <p className={`text-lg font-mono font-bold ${result.marginLevel >= 200 ? "text-emerald-400" : result.marginLevel >= 100 ? "text-yellow-400" : "text-red-400"}`}>
              {result.marginLevel.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Notional value info */}
        <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
          <span className="text-sm text-muted-foreground">Notional Position Value</span>
          <span className="font-mono font-bold text-foreground">{formatLarge(result.notionalValue)}</span>
        </div>

        {result.marginUsedPct > 80 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
            ⚠ <strong>High margin usage.</strong> You are using {result.marginUsedPct.toFixed(1)}% of your account as margin.
            Consider reducing position size or leverage to maintain a safety buffer.
          </div>
        )}

        {/* Toggle Learn More */}
        <Button
          variant="outline"
          className="w-full border-border"
          onClick={() => setShowGuide(!showGuide)}
        >
          {showGuide ? "Hide" : "Learn more about Margin & Leverage"} {showGuide ? "▲" : "▼"}
        </Button>

        {showGuide && (
          <>
            <RelatedTools currentPath="/margin-calc" />

            <GeoContentLayout>
              <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get started in 30 seconds" variant="highlight">
                <QuickStartGuide steps={marginCalcGuideContent.quickStartSteps} />
              </GeoSection>

              <GeoSection id="introduction" title={marginCalcGuideContent.introduction.title} subtitle="Essential margin trading knowledge" variant="default">
                <MarkdownContent content={marginCalcGuideContent.introduction.content} />
              </GeoSection>

              <GeoSection id="how-to-use" title={marginCalcGuideContent.howToUse.title} subtitle="Step-by-step guide" variant="minimal">
                <HowToSchema
                  name={`How to use ${marginCalcGuideContent.toolName}`}
                  description="Calculate margin requirements and liquidation prices"
                  steps={marginCalcGuideContent.howToUse.steps}
                  toolUrl={`https://openkit.tools${marginCalcGuideContent.toolPath}`}
                />
                <MarkdownContent content={marginCalcGuideContent.howToUse.content} />
              </GeoSection>

              <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Margin & leverage essentials" variant="default">
                <ToolFAQ faqs={marginCalcGuideContent.faqs} />
              </GeoSection>

              <GeoSection id="security" title={marginCalcGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
                <MarkdownContent content={marginCalcGuideContent.security.content} />
              </GeoSection>

              {marginCalcGuideContent.stats && (
                <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
                  <StatsBar stats={Object.entries(marginCalcGuideContent.stats).map(([label, value]) => ({ label, value }))} />
                </GeoSection>
              )}
            </GeoContentLayout>

            <LastUpdated date={marginCalcGuideContent.lastUpdated} />
          </>
        )}
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Calculate margin and leverage risk. No data leaves your browser.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link> •{" "}
            <Link href="/about" className="hover:text-foreground transition">About</Link> •{" "}
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Margin & Leverage Calculator"
        description="Calculate required margin, liquidation price, and leverage impact. Free, private, 100% client-side."
        url="https://openkit.tools/margin-calc"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={marginCalcGuideContent.lastUpdated}
        version={marginCalcGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Margin & Leverage Calculator", url: "https://openkit.tools/margin-calc" },
        ]}
      />
    </main>
  );
}
