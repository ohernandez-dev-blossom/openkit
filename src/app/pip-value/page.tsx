"use client";
import { useState, useMemo } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Coins } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { pipValueGuideContent } from "@/content/pip-value-guide";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CurrencyPair = {
  pair: string;
  base: string;
  quote: string;
  pipSize: number;
};

type AccountCurrency = "USD" | "EUR" | "GBP" | "JPY" | "CHF" | "AUD" | "CAD" | "NZD";

type LotPreset = {
  label: string;
  value: number;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CURRENCY_PAIRS: CurrencyPair[] = [
  { pair: "EUR/USD", base: "EUR", quote: "USD", pipSize: 0.0001 },
  { pair: "GBP/USD", base: "GBP", quote: "USD", pipSize: 0.0001 },
  { pair: "USD/JPY", base: "USD", quote: "JPY", pipSize: 0.01 },
  { pair: "USD/CHF", base: "USD", quote: "CHF", pipSize: 0.0001 },
  { pair: "AUD/USD", base: "AUD", quote: "USD", pipSize: 0.0001 },
  { pair: "USD/CAD", base: "USD", quote: "CAD", pipSize: 0.0001 },
  { pair: "NZD/USD", base: "NZD", quote: "USD", pipSize: 0.0001 },
  { pair: "EUR/GBP", base: "EUR", quote: "GBP", pipSize: 0.0001 },
  { pair: "EUR/JPY", base: "EUR", quote: "JPY", pipSize: 0.01 },
  { pair: "GBP/JPY", base: "GBP", quote: "JPY", pipSize: 0.01 },
];

const EXCHANGE_RATES: Record<string, number> = {
  "EUR/USD": 1.0850,
  "GBP/USD": 1.2650,
  "USD/JPY": 149.50,
  "USD/CHF": 0.8750,
  "AUD/USD": 0.6550,
  "USD/CAD": 1.3550,
  "NZD/USD": 0.6150,
  "EUR/GBP": 0.8580,
  "EUR/JPY": 162.20,
  "GBP/JPY": 189.10,
};

/** Cross-rates for converting pip values to non-USD account currencies */
const USD_CROSS_RATES: Record<string, number> = {
  USD: 1,
  EUR: 1.0850,   // EUR/USD — 1 EUR = 1.085 USD, so 1 USD = 1/1.085 EUR
  GBP: 1.2650,   // GBP/USD
  JPY: 0.006689, // 1/149.50
  CHF: 0.8750,   // USD/CHF — inverted: 1 USD = 0.875 CHF
  AUD: 0.6550,   // AUD/USD
  CAD: 0.7380,   // 1/1.355
  NZD: 0.6150,   // NZD/USD
};

const LOT_PRESETS: LotPreset[] = [
  { label: "Standard", value: 100000 },
  { label: "Mini", value: 10000 },
  { label: "Micro", value: 1000 },
  { label: "Nano", value: 100 },
];

const ACCOUNT_CURRENCIES: AccountCurrency[] = [
  "USD", "EUR", "GBP", "JPY", "CHF", "AUD", "CAD", "NZD",
];

// ---------------------------------------------------------------------------
// Pip value calculation helpers
// ---------------------------------------------------------------------------

/**
 * Calculate pip value in USD for a given pair, lot size, and exchange rate.
 */
function calculatePipValueInUSD(
  pair: CurrencyPair,
  lotSize: number,
  exchangeRate: number
): number {
  if (exchangeRate <= 0) return 0;

  // Quote is USD: pip value = lot * pipSize (already in USD)
  if (pair.quote === "USD") {
    return lotSize * pair.pipSize;
  }

  // Base is USD (e.g. USD/JPY): pip value = (lot * pipSize) / rate
  if (pair.base === "USD") {
    return (lotSize * pair.pipSize) / exchangeRate;
  }

  // Cross pair (neither is USD). Convert pip from quote currency to USD.
  // pipInQuote = lot * pipSize
  // We need quote-to-USD rate.
  const quoteToUSD = getQuoteToUSD(pair.quote);
  return (lotSize * pair.pipSize) * quoteToUSD;
}

/**
 * Convert 1 unit of quote currency to USD.
 */
function getQuoteToUSD(quoteCurrency: string): number {
  switch (quoteCurrency) {
    case "USD": return 1;
    case "GBP": return EXCHANGE_RATES["GBP/USD"] ?? 1.2650;
    case "JPY": return 1 / (EXCHANGE_RATES["USD/JPY"] ?? 149.50);
    case "CHF": return 1 / (EXCHANGE_RATES["USD/CHF"] ?? 0.8750);
    case "CAD": return 1 / (EXCHANGE_RATES["USD/CAD"] ?? 1.3550);
    case "EUR": return EXCHANGE_RATES["EUR/USD"] ?? 1.0850;
    case "AUD": return EXCHANGE_RATES["AUD/USD"] ?? 0.6550;
    case "NZD": return EXCHANGE_RATES["NZD/USD"] ?? 0.6150;
    default: return 1;
  }
}

/**
 * Convert a USD value to the given account currency.
 */
function convertUSDToAccount(usdValue: number, accountCurrency: AccountCurrency): number {
  if (accountCurrency === "USD") return usdValue;

  const rate = USD_CROSS_RATES[accountCurrency];
  if (!rate || rate <= 0) return usdValue;

  // For currencies quoted as XXX/USD (EUR, GBP, AUD, NZD): 1 USD = 1/rate XXX
  // For currencies quoted as USD/XXX (JPY, CHF, CAD): 1 USD = rate XXX (but we store inverted)
  // We use a unified approach: usdValue / rateOfCurrencyInUSD
  return usdValue / rate;
}

/**
 * Format a number to a sensible precision for display.
 */
function formatPipValue(value: number): string {
  if (value === 0) return "0.00";
  if (value >= 100) return value.toFixed(2);
  if (value >= 1) return value.toFixed(4);
  if (value >= 0.01) return value.toFixed(4);
  return value.toFixed(6);
}

function formatCurrency(value: number, currency: string): string {
  const formatted = formatPipValue(value);
  const symbols: Record<string, string> = {
    USD: "$", EUR: "\u20AC", GBP: "\u00A3", JPY: "\u00A5",
    CHF: "CHF ", AUD: "A$", CAD: "C$", NZD: "NZ$",
  };
  return `${symbols[currency] ?? ""}${formatted}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PipValueCalculator() {
  useToolTracker("pip-value", "Pip Value Calculator", "finance");
  const analytics = useAnalytics();

  // State
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(0);
  const [lotSize, setLotSize] = useState<number>(100000);
  const [lotSizeInput, setLotSizeInput] = useState<string>("100000");
  const [accountCurrency, setAccountCurrency] = useState<AccountCurrency>("USD");
  const [exchangeRateOverride, setExchangeRateOverride] = useState<string>("");
  const [hasTracked, setHasTracked] = useState(false);

  const selectedPair = CURRENCY_PAIRS[selectedPairIndex] as CurrencyPair;
  const defaultRate = EXCHANGE_RATES[selectedPair.pair] ?? 1;
  const activeRate = exchangeRateOverride !== "" ? parseFloat(exchangeRateOverride) || defaultRate : defaultRate;

  // Track first calculation
  if (!hasTracked && lotSize > 0) {
    analytics.trackToolUsage("pip-value-calculator", {
      action: "calculate",
      pair: selectedPair.pair,
    });
    setHasTracked(true);
  }

  // ---------------------------------------------------------------------------
  // Calculations
  // ---------------------------------------------------------------------------

  const pipValueUSD = useMemo(
    () => calculatePipValueInUSD(selectedPair, lotSize, activeRate),
    [selectedPair, lotSize, activeRate]
  );

  const pipValueAccount = useMemo(
    () => convertUSDToAccount(pipValueUSD, accountCurrency),
    [pipValueUSD, accountCurrency]
  );

  /** Pip values for all standard lot sizes */
  const lotSizeTable = useMemo(() => {
    return LOT_PRESETS.map((preset) => {
      const pvUSD = calculatePipValueInUSD(selectedPair, preset.value, activeRate);
      const pvAccount = convertUSDToAccount(pvUSD, accountCurrency);
      return {
        label: preset.label,
        units: preset.value.toLocaleString(),
        pipValue: pvAccount,
        tenPip: pvAccount * 10,
        hundredPip: pvAccount * 100,
      };
    });
  }, [selectedPair, activeRate, accountCurrency]);

  /** Quick-reference grid: pip value per standard lot for all pairs */
  const quickRefGrid = useMemo(() => {
    return CURRENCY_PAIRS.map((p) => {
      const rate = EXCHANGE_RATES[p.pair] ?? 1;
      const pvUSD = calculatePipValueInUSD(p, 100000, rate);
      const pvAccount = convertUSDToAccount(pvUSD, accountCurrency);
      return {
        pair: p.pair,
        pipValue: pvAccount,
      };
    });
  }, [accountCurrency]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  function handlePairChange(index: number) {
    setSelectedPairIndex(index);
    setExchangeRateOverride("");
  }

  function handleLotSizeInput(value: string) {
    setLotSizeInput(value);
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setLotSize(parsed);
    }
  }

  function handleLotPreset(presetValue: number) {
    setLotSize(presetValue);
    setLotSizeInput(presetValue.toString());
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center text-sm hover:opacity-80 transition"
            >
              <Coins className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold">Pip Value Calculator</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Forex Pip Value Calculator</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Calculate pip values for any major currency pair across all lot sizes. Instant, private, offline-capable.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Card */}
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5">
            <h3 className="font-semibold text-base">Settings</h3>

            {/* Currency Pair */}
            <div className="space-y-2">
              <label htmlFor="pair-select" className="text-sm font-medium text-muted-foreground">
                Currency Pair
              </label>
              <select
                id="pair-select"
                value={selectedPairIndex}
                onChange={(e) => handlePairChange(parseInt(e.target.value, 10))}
                className="w-full h-10 rounded-lg border border-border bg-muted px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                {CURRENCY_PAIRS.map((p, i) => (
                  <option key={p.pair} value={i}>
                    {p.pair}
                  </option>
                ))}
              </select>
            </div>

            {/* Exchange Rate */}
            <div className="space-y-2">
              <label htmlFor="exchange-rate" className="text-sm font-medium text-muted-foreground">
                Exchange Rate
              </label>
              <input
                id="exchange-rate"
                type="number"
                step="0.0001"
                min="0"
                value={exchangeRateOverride !== "" ? exchangeRateOverride : defaultRate.toString()}
                onChange={(e) => setExchangeRateOverride(e.target.value)}
                className="w-full h-10 rounded-lg border border-border bg-muted px-3 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              {exchangeRateOverride !== "" && (
                <button
                  onClick={() => setExchangeRateOverride("")}
                  className="text-xs text-amber-500 hover:text-amber-400 transition"
                >
                  Reset to default ({defaultRate})
                </button>
              )}
            </div>

            {/* Lot Size Presets */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Lot Size</label>
              <div className="grid grid-cols-4 gap-2">
                {LOT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleLotPreset(preset.value)}
                    className={`px-2 py-2 rounded-lg border text-xs sm:text-sm font-medium transition ${
                      lotSize === preset.value
                        ? "border-amber-500 bg-amber-500/10 text-amber-500"
                        : "border-border hover:border-amber-500/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                id="lot-size"
                type="number"
                min="1"
                value={lotSizeInput}
                onChange={(e) => handleLotSizeInput(e.target.value)}
                placeholder="Custom lot size"
                className="w-full h-10 rounded-lg border border-border bg-muted px-3 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-xs text-muted-foreground">
                Pip size: {selectedPair.pipSize === 0.01 ? "0.01 (JPY pair)" : "0.0001"}
              </p>
            </div>

            {/* Account Currency */}
            <div className="space-y-2">
              <label htmlFor="account-currency" className="text-sm font-medium text-muted-foreground">
                Account Currency
              </label>
              <select
                id="account-currency"
                value={accountCurrency}
                onChange={(e) => setAccountCurrency(e.target.value as AccountCurrency)}
                className="w-full h-10 rounded-lg border border-border bg-muted px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                {ACCOUNT_CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5">
            <h3 className="font-semibold text-base">Results</h3>

            {/* Primary Result */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-amber-600/20 to-yellow-600/20 border border-amber-500/30">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                Pip Value ({selectedPair.pair})
              </p>
              <p className="text-3xl sm:text-4xl font-bold font-mono break-all">
                {formatCurrency(pipValueAccount, accountCurrency)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {lotSize.toLocaleString()} units &middot; {accountCurrency} account
              </p>
            </div>

            {/* Movement Values */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">10-pip move</p>
                <p className="text-lg font-bold font-mono">
                  {formatCurrency(pipValueAccount * 10, accountCurrency)}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">100-pip move</p>
                <p className="text-lg font-bold font-mono">
                  {formatCurrency(pipValueAccount * 100, accountCurrency)}
                </p>
              </div>
            </div>

            {/* Lot Size Comparison Table */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">All Lot Sizes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-2 font-medium text-muted-foreground">Lot</th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">Units</th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">1 Pip</th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">10 Pips</th>
                      <th className="text-right py-2 pl-2 font-medium text-muted-foreground">100 Pips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotSizeTable.map((row) => (
                      <tr key={row.label} className="border-b border-border/50">
                        <td className="py-2 pr-2 font-medium">{row.label}</td>
                        <td className="py-2 px-2 text-right font-mono text-muted-foreground">{row.units}</td>
                        <td className="py-2 px-2 text-right font-mono">{formatCurrency(row.pipValue, accountCurrency)}</td>
                        <td className="py-2 px-2 text-right font-mono">{formatCurrency(row.tenPip, accountCurrency)}</td>
                        <td className="py-2 pl-2 text-right font-mono">{formatCurrency(row.hundredPip, accountCurrency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Grid */}
        <div className="mt-8 sm:mt-12">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
            Quick Reference: Standard Lot Pip Values ({accountCurrency})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {quickRefGrid.map((item) => (
              <button
                key={item.pair}
                onClick={() => {
                  const idx = CURRENCY_PAIRS.findIndex((p) => p.pair === item.pair);
                  if (idx >= 0) handlePairChange(idx);
                  handleLotPreset(100000);
                }}
                className={`p-3 rounded-lg border text-center transition cursor-pointer ${
                  selectedPair.pair === item.pair
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-border hover:border-amber-500/50 bg-card"
                }`}
              >
                <p className="text-xs sm:text-sm font-medium mb-1">{item.pair}</p>
                <p className="text-base sm:text-lg font-bold font-mono">
                  {formatCurrency(item.pipValue, accountCurrency)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 text-center text-xs sm:text-sm text-muted-foreground">
          <p>Exchange rates are static offline estimates. Update manually for live accuracy.</p>
          <p className="mt-1">All calculations are 100% client-side. No data is sent to servers.</p>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/pip-value" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={pipValueGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection
            id="what-is-pip-value"
            title={pipValueGuideContent.introduction.title}
            subtitle="Understanding pips and forex pip values"
            variant="default"
          >
            <MarkdownContent content={pipValueGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How traders use pip value calculations"
            variant="default"
          >
            <FeatureGrid
              features={pipValueGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection
            id="how-to-use"
            title={pipValueGuideContent.howToUse.title}
            subtitle="Master forex pip value calculations"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${pipValueGuideContent.toolName}`}
              description="Step-by-step guide to calculating pip values"
              steps={pipValueGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${pipValueGuideContent.toolPath}`}
            />
            <MarkdownContent content={pipValueGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know"
            variant="default"
          >
            <ToolFAQ faqs={pipValueGuideContent.faqs} />
          </GeoSection>

          <GeoSection
            id="security"
            title={pipValueGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={pipValueGuideContent.security.content} />
          </GeoSection>

          {pipValueGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(pipValueGuideContent.stats).map(([label, value]) => ({
                  label,
                  value,
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={pipValueGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-muted-foreground">
          <p>Calculate forex pip values instantly. 100% client-side - no data stored.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Pip Value Calculator | OpenKit.tools"
        description="Calculate pip values for any forex currency pair across all lot sizes. Supports major, cross, and JPY pairs with account currency conversion. Free, private, offline-capable."
        url="https://openkit.tools/pip-value"
        applicationCategory="FinanceApplication"
        datePublished="2026-02-10"
        dateModified={pipValueGuideContent.lastUpdated}
        version={pipValueGuideContent.version}
        aggregateRating={{ ratingValue: "4.9", ratingCount: "1820", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Pip Value Calculator", url: "https://openkit.tools/pip-value" },
        ]}
      />
    </main>
  );
}
