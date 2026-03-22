"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, StatsBar } from "@/components/geo-content-layout";
import { ShareButton } from "@/components/share-button";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { drawdownCalcGuideContent } from "@/content/drawdown-calc-guide";

interface ScenarioRow {
  drawdown: number;
  recovery: number;
  lostAmount: number;
  remainingBalance: number;
}

export default function DrawdownCalcPage() {
  useToolTracker("drawdown-calc", "Drawdown & Recovery Calculator", "trading");
  const analytics = useAnalytics();

  const [startingBalance, setStartingBalance] = useState("10000");
  const [drawdownPct, setDrawdownPct] = useState(20);
  const [showGuide, setShowGuide] = useState(false);

  const balance = parseFloat(startingBalance) || 0;
  const currentBalance = balance * (1 - drawdownPct / 100);
  const recoveryNeeded = drawdownPct > 0 && drawdownPct < 100
    ? (1 / (1 - drawdownPct / 100) - 1) * 100
    : 0;

  const scenarios: ScenarioRow[] = [10, 20, 30, 40, 50, 60, 70, 80, 90].map((dd) => ({
    drawdown: dd,
    recovery: (1 / (1 - dd / 100) - 1) * 100,
    lostAmount: balance * (dd / 100),
    remainingBalance: balance * (1 - dd / 100),
  }));

  const handleCalculate = useCallback(() => {
    analytics.trackToolUsage("drawdown-calc", {
      action: "calculate",
      drawdownPct,
    });
  }, [drawdownPct, analytics]);

  const fmt = (n: number, decimals = 2): string => {
    return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const getRecoveryColor = (recovery: number): string => {
    if (recovery <= 15) return "text-green-400";
    if (recovery <= 50) return "text-yellow-400";
    if (recovery <= 100) return "text-orange-400";
    return "text-red-400";
  };

  const getBarHeight = (recovery: number): string => {
    const maxHeight = 160;
    const height = Math.min((recovery / 900) * maxHeight, maxHeight);
    return `${Math.max(height, 4)}px`;
  };

  const getBarColor = (dd: number): string => {
    if (dd <= 20) return "bg-green-500";
    if (dd <= 40) return "bg-yellow-500";
    if (dd <= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm">
              📉
            </div>
            <h1 className="text-xl font-semibold">Drawdown & Recovery</h1>
          </div>
          <ShareButton
            toolId="drawdown-calc"
            data={{ startingBalance, drawdownPct }}
            variant="outline"
            className="border-border"
          />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Calculator Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">Calculate Drawdown Impact</h2>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Starting Balance */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Starting Balance ($)</label>
              <Input
                type="number"
                placeholder="10000"
                value={startingBalance}
                onChange={(e) => setStartingBalance(e.target.value)}
                className="bg-background border-border font-mono"
              />
            </div>

            {/* Drawdown Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">Current Drawdown</label>
                <span className={`text-sm font-bold ${getRecoveryColor(recoveryNeeded)}`}>
                  {drawdownPct.toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="95"
                step="1"
                value={drawdownPct}
                onChange={(e) => {
                  setDrawdownPct(parseFloat(e.target.value));
                  handleCalculate();
                }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-red-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Current Balance (auto-calculated) */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Current Balance (calculated)</label>
              <div className="p-3 rounded-lg bg-muted/50 border border-border font-mono text-lg">
                ${fmt(currentBalance)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Result */}
        {drawdownPct > 0 && balance > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <h2 className="text-lg font-semibold">Recovery Required</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Lost</p>
                  <p className="text-2xl font-bold font-mono mt-1 text-red-400">
                    -${fmt(balance - currentBalance)}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Balance</p>
                  <p className="text-2xl font-bold font-mono mt-1">${fmt(currentBalance)}</p>
                </div>
                <div className={`p-4 rounded-lg border ${recoveryNeeded > 100 ? "bg-red-500/10 border-red-500/20" : "bg-amber-500/10 border-amber-500/20"}`}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Recovery Needed</p>
                  <p className={`text-2xl font-bold font-mono mt-1 ${getRecoveryColor(recoveryNeeded)}`}>
                    +{fmt(recoveryNeeded, 1)}%
                  </p>
                </div>
              </div>

              {/* Recovery Mountain Visualization */}
              <div className="p-4 rounded-lg bg-background border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Recovery Mountain</h3>
                <div className="flex items-end justify-between gap-1 h-44">
                  {scenarios.map((s) => (
                    <div key={s.drawdown} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {s.recovery < 1000 ? `${Math.round(s.recovery)}%` : "900%"}
                      </span>
                      <div
                        className={`w-full rounded-t-sm transition-all duration-300 ${getBarColor(s.drawdown)} ${
                          s.drawdown === drawdownPct ? "ring-2 ring-foreground ring-offset-1 ring-offset-background" : "opacity-70"
                        }`}
                        style={{ height: getBarHeight(s.recovery) }}
                      />
                      <span className="text-xs text-muted-foreground">{s.drawdown}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">Drawdown % → Recovery % needed</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scenario Table */}
        {balance > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <h2 className="text-lg font-semibold">Drawdown Scenarios</h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">Drawdown</th>
                      <th className="text-right py-2 px-3 text-muted-foreground font-medium">Lost</th>
                      <th className="text-right py-2 px-3 text-muted-foreground font-medium">Remaining</th>
                      <th className="text-right py-2 px-3 text-muted-foreground font-medium">Recovery Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s) => (
                      <tr
                        key={s.drawdown}
                        className={`border-b border-border/50 transition-colors ${
                          Math.abs(s.drawdown - drawdownPct) < 5
                            ? "bg-muted/50"
                            : "hover:bg-muted/30"
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono font-medium text-red-400">-{s.drawdown}%</td>
                        <td className="py-2.5 px-3 font-mono text-right text-red-400">-${fmt(s.lostAmount, 0)}</td>
                        <td className="py-2.5 px-3 font-mono text-right">${fmt(s.remainingBalance, 0)}</td>
                        <td className={`py-2.5 px-3 font-mono text-right font-bold ${getRecoveryColor(s.recovery)}`}>
                          +{fmt(s.recovery, 1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Tools */}
        <RelatedTools currentPath="/drawdown-calc" />

        {/* Learn More Toggle */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => setShowGuide(!showGuide)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showGuide ? "Hide guide ▲" : "Learn more about drawdowns ▼"}
          </Button>
        </div>

        {showGuide && (
          <GeoContentLayout>
            <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
              <QuickStartGuide steps={drawdownCalcGuideContent.quickStartSteps} />
            </GeoSection>
            <GeoSection id="introduction" title={drawdownCalcGuideContent.introduction.title} subtitle="Understanding drawdown asymmetry" variant="default">
              <MarkdownContent content={drawdownCalcGuideContent.introduction.content} />
            </GeoSection>
            <GeoSection id="how-to-use" title={drawdownCalcGuideContent.howToUse.title} subtitle="Step-by-step instructions" variant="minimal">
              <HowToSchema
                name={`How to use ${drawdownCalcGuideContent.toolName}`}
                description="Step-by-step guide to understanding drawdowns"
                steps={drawdownCalcGuideContent.howToUse.steps}
                toolUrl={`https://openkit.tools${drawdownCalcGuideContent.toolPath}`}
              />
              <MarkdownContent content={drawdownCalcGuideContent.howToUse.content} />
            </GeoSection>
            <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Common questions about drawdowns" variant="default">
              <ToolFAQ faqs={drawdownCalcGuideContent.faqs} />
            </GeoSection>
            <GeoSection id="security" title={drawdownCalcGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
              <MarkdownContent content={drawdownCalcGuideContent.security.content} />
            </GeoSection>
            {drawdownCalcGuideContent.stats && (
              <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
                <StatsBar stats={Object.entries(drawdownCalcGuideContent.stats).map(([label, value]) => ({ label, value }))} />
              </GeoSection>
            )}
          </GeoContentLayout>
        )}

        <LastUpdated date={drawdownCalcGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Understand drawdown recovery instantly. 100% client-side — no data leaves your browser.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link> •{" "}
            <Link href="/about" className="hover:text-foreground transition">About</Link> •{" "}
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Drawdown & Recovery Calculator"
        description="Calculate how much recovery is needed after a trading drawdown. Visualize the asymmetry between losses and gains. Free, private, client-side."
        url="https://openkit.tools/drawdown-calc"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={drawdownCalcGuideContent.lastUpdated}
        version={drawdownCalcGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Drawdown Calculator", url: "https://openkit.tools/drawdown-calc" },
        ]}
      />
    </main>
  );
}
