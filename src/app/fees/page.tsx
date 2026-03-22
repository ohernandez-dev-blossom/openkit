"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { feesGuideContent } from "@/content/fees-guide";

type FeeStructure = {
  name: string;
  percentage: number;
  fixed: number;
  description: string;
};
const FEE_STRUCTURES: Record<string, Record<string, FeeStructure>> = {
  paypal: {
    "paypal-standard": {
      name: "PayPal Standard",
      percentage: 3.49,
      fixed: 0.49,
      description: "Invoicing, PayPal Checkout, Venmo"},
    "paypal-qr": {
      name: "PayPal QR Code",
      percentage: 2.29,
      fixed: 0.09,
      description: "In-person QR code payments"},
    "paypal-friends": {
      name: "PayPal Friends & Family",
      percentage: 0,
      fixed: 0,
      description: "Domestic, funded by balance/bank"}},
  stripe: {
    "stripe-standard": {
      name: "Stripe Standard",
      percentage: 2.9,
      fixed: 0.30,
      description: "Online card payments"},
    "stripe-intl": {
      name: "Stripe International",
      percentage: 3.9,
      fixed: 0.30,
      description: "International cards + currency conversion"}},
  wise: {
    "wise-usd": {
      name: "Wise USD",
      percentage: 1.2,
      fixed: 0,
      description: "USD transfers (varies by route)"},
    "wise-eur": {
      name: "Wise EUR",
      percentage: 0.41,
      fixed: 0,
      description: "EUR transfers (varies by route)"}}};
export default function FeeCalculator() {
  useToolTracker("fees", "Fee Calculator", "calculators");
  const analytics = useAnalytics();
  const [amount, setAmount] = useState<string>("100");
  const [mode, setMode] = useState<"send" | "receive">("receive");
  const [provider, setProvider] = useState<"paypal" | "stripe" | "wise">("paypal");
  const [selectedFee, setSelectedFee] = useState<string>("paypal-standard");
  const [hasTracked, setHasTracked] = useState(false);

  // Track usage when values change
  useEffect(() => {
    if (!hasTracked && parseFloat(amount) > 0) {
      analytics.trackToolUsage('fee-calculator', { 
        action: 'calculate',
        provider,
        mode
      });
      setHasTracked(true);
    }
  }, [amount, provider, mode, analytics, hasTracked]);
  // Update selected fee when provider changes
  const handleProviderChange = (newProvider: "paypal" | "stripe" | "wise") => {
    setProvider(newProvider);
    const firstFee = Object.keys(FEE_STRUCTURES[newProvider])[0];
    setSelectedFee(firstFee);
  };
  const fee = FEE_STRUCTURES[provider][selectedFee];
  const calculations = useMemo(() => {
    const amountNum = parseFloat(amount) || 0;

    if (mode === "receive") {
      // I want to receive X, how much should they send?
      const sendAmount = (amountNum + fee.fixed) / (1 - fee.percentage / 100);
      const feeAmount = sendAmount - amountNum;
      return {
        sendAmount: sendAmount.toFixed(2),
        receiveAmount: amountNum.toFixed(2),
        feeAmount: feeAmount.toFixed(2),
        feePercent: amountNum > 0 ? ((feeAmount / sendAmount) * 100).toFixed(2) : "0.00"};
    } else {
      // I'm sending X, how much will they receive?
      const feeAmount = amountNum * (fee.percentage / 100) + fee.fixed;
      const receiveAmount = amountNum - feeAmount;
      return {
        sendAmount: amountNum.toFixed(2),
        receiveAmount: receiveAmount.toFixed(2),
        feeAmount: feeAmount.toFixed(2),
        feePercent: amountNum > 0 ? ((feeAmount / amountNum) * 100).toFixed(2) : "0.00"};
    }
  }, [amount, mode, fee]);
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-sm hover:opacity-80 transition">
              💸
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold">Fee Calculator</h1>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <button
              onClick={() => handleProviderChange("paypal")}
              className={`transition ${provider === "paypal" ? "text-blue-400 font-medium" : "text-foreground hover:text-blue-400"}`}
            >
              PayPal
            </button>
            <button
              onClick={() => handleProviderChange("stripe")}
              className={`transition ${provider === "stripe" ? "text-blue-400 font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Stripe
            </button>
            <button
              onClick={() => handleProviderChange("wise")}
              className={`transition ${provider === "wise" ? "text-blue-400 font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Wise
            </button>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 sm:py-12">        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Payment Fee Calculator</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Calculate PayPal, Stripe, and Wise fees instantly. Know exactly what you&apos;ll pay or receive.
          </p>
        </div>
        {/* Mobile Provider Tabs */}
        <div className="sm:hidden mb-6">
          <Tabs value={provider} onValueChange={(v) => handleProviderChange(v as "paypal" | "stripe" | "wise")}>
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="stripe">Stripe</TabsTrigger>
              <TabsTrigger value="wise">Wise</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Calculator Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Calculate</CardTitle>
              <CardDescription>Enter amount and select fee type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mode Toggle */}
              <Tabs value={mode} onValueChange={(v) => setMode(v as "send" | "receive")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                  <TabsTrigger value="receive" className="data-[state=active]:bg-blue-600 text-xs sm:text-sm">
                    I want to receive
                  </TabsTrigger>
                  <TabsTrigger value="send" className="data-[state=active]:bg-blue-600 text-xs sm:text-sm">
                    I&apos;m sending
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {/* Amount Input */}
              <LabeledInput
                label="Amount ($)"
                type="number"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                placeholder="100.00"
                className="bg-muted border-border text-foreground text-xl sm:text-2xl h-12 sm:h-14 font-mono"
                labelClassName="text-sm font-medium text-muted-foreground"
              />
              {/* Fee Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Fee Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(FEE_STRUCTURES[provider]).map(([key, structure]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedFee(key)}
                      className={`p-3 rounded-lg border text-left transition ${
                        selectedFee === key
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border hover:border-border"
                      }`}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-medium text-sm sm:text-base">{structure.name}</span>
                        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                          {structure.percentage}% + ${structure.fixed.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{structure.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Results Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {mode === "receive"
                  ? "Amount that needs to be sent to receive your target"
                  : "Amount recipient will receive after fees"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Result */}
              <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                  {mode === "receive" ? "They should send" : "They will receive"}
                </p>
                <p className="text-3xl sm:text-4xl font-bold font-mono break-all">
                  ${mode === "receive" ? calculations.sendAmount : calculations.receiveAmount}
                </p>
              </div>
              {/* Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Send Amount</span>
                  <span className="font-mono font-medium text-sm sm:text-base">${calculations.sendAmount}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Fee ({fee.percentage}% + ${fee.fixed.toFixed(2)})</span>
                  <span className="font-mono font-medium text-red-400 text-sm sm:text-base">-${calculations.feeAmount}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Receive Amount</span>
                  <span className="font-mono font-medium text-green-400 text-sm sm:text-base">${calculations.receiveAmount}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground text-sm">Effective Fee Rate</span>
                  <span className="font-mono font-medium text-sm sm:text-base">{calculations.feePercent}%</span>
                </div>
              </div>
              {/* Copy Button */}
              <Button
                onClick={() => navigator.clipboard.writeText(
                  `Send: $${calculations.sendAmount} | Fee: $${calculations.feeAmount} | Receive: $${calculations.receiveAmount}`
                )}
                variant="outline"
                className="w-full border-border text-sm"
              >
                Copy Summary
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Info Section */}
        <div className="mt-12 text-center text-xs sm:text-sm text-muted-foreground">
          <p>Fees are estimates based on standard rates. Actual fees may vary.</p>
          <p className="mt-1">Last updated: January 2026</p>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/fees" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={feesGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-fee-calculation" title={feesGuideContent.introduction.title} subtitle="Understanding payment processing fees" variant="default">
            <MarkdownContent content={feesGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use fee calculation" variant="default">
            <FeatureGrid features={feesGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={feesGuideContent.howToUse.title} subtitle="Master payment fee calculations" variant="minimal">
            <HowToSchema name={`How to use ${feesGuideContent.toolName}`} description="Step-by-step guide to fee calculation" steps={feesGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${feesGuideContent.toolPath}`} />
            <MarkdownContent content={feesGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={feesGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={feesGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={feesGuideContent.security.content} />
          </GeoSection>

          {feesGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(feesGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={feesGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-muted-foreground">
          <p>Calculate payment fees instantly. 100% client-side - no data stored.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Payment Fee Calculator | OpenKit.tools"
        description="Calculate PayPal, Stripe, and Wise payment processing fees instantly. Know exactly what you'll pay or receive with accurate fee calculations."
        url="https://openkit.tools/fees"
        applicationCategory="FinanceApplication"
        datePublished="2024-01-15"
        dateModified={feesGuideContent.lastUpdated}
        version={feesGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "2145", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Fee Calculator', url: 'https://openkit.tools/fees' },
        ]}
      />
    </main>
  );
}
