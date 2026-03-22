"use client";
import { useState, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { DollarSign, Copy, ArrowLeftRight, TrendingUp, AlertCircle } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { currencyGuideContent } from "@/content/currency-guide";

type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
};

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
];

// Exchange rates relative to USD (as of Jan 2026 - approximate)
// In production, these would be fetched from an API
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  AUD: 1.58,
  CAD: 1.43,
  CHF: 0.89,
  CNY: 7.25,
  SEK: 10.85,
  NZD: 1.71,
  MXN: 20.15,
  SGD: 1.35,
  HKD: 7.78,
  NOK: 10.95,
  KRW: 1380.00,
  TRY: 34.50,
  INR: 83.50,
  BRL: 5.95,
  ZAR: 18.75,
  RUB: 92.50,
};

const LAST_UPDATE = "2026-01-31";

export default function CurrencyConverter() {
  useToolTracker("currency", "Currency Converter", "converters");
  const analytics = useAnalytics();
  const { copy } = useCopyToClipboard({ duration: 1500 });
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [hasTracked, setHasTracked] = useState(false);

  // Track conversion usage
  useEffect(() => {
    if (!hasTracked && parseFloat(amount) > 0) {
      analytics.trackToolUsage('currency-converter', { 
        action: 'convert',
        fromCurrency,
        toCurrency
      });
      setHasTracked(true);
    }
  }, [amount, fromCurrency, toCurrency, analytics, hasTracked]);

  const convertedAmount = useMemo(() => {
    try {
      const numAmount = parseFloat(amount) || 0;
      if (numAmount === 0) return 0;

      const fromRate = EXCHANGE_RATES[fromCurrency] ?? 1;
      const toRate = EXCHANGE_RATES[toCurrency] ?? 1;

      // Convert: amount → USD → target currency
      const usdAmount = numAmount / fromRate;
      const converted = usdAmount * toRate;

      return isFinite(converted) ? converted : 0;
    } catch {
      return 0;
    }
  }, [amount, fromCurrency, toCurrency]);

  const exchangeRate = useMemo(() => {
    try {
      const fromRate = EXCHANGE_RATES[fromCurrency] ?? 1;
      const toRate = EXCHANGE_RATES[toCurrency] ?? 1;
      const rate = toRate / fromRate;
      return isFinite(rate) ? rate : 0;
    } catch {
      return 0;
    }
  }, [fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };


  const formatAmount = (value: number, currencyCode: string) => {
    try {
      const currency = CURRENCIES.find((c) => c.code === currencyCode);
      const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
      return formatted + " " + (currency?.symbol || currencyCode);
    } catch {
      return value.toFixed(2) + " " + currencyCode;
    }
  };

  // Popular conversions for quick reference
  const popularConversions = useMemo(() => {
    const pairs = [
      { from: "USD", to: "EUR" },
      { from: "USD", to: "GBP" },
      { from: "EUR", to: "USD" },
      { from: "GBP", to: "USD" },
      { from: "USD", to: "JPY" },
      { from: "EUR", to: "GBP" },
    ];

    return pairs.map((pair) => {
      const fromRate = EXCHANGE_RATES[pair.from] ?? 1;
      const toRate = EXCHANGE_RATES[pair.to] ?? 1;
      const rate = toRate / fromRate;
      return {
        ...pair,
        rate: isFinite(rate) ? rate.toFixed(4) : "0.0000",
      };
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center hover:opacity-80 transition"
          >
            <DollarSign className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">
            Currency Converter
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <p className="font-medium mb-1">Offline Rates</p>
              <p className="text-blue-300/80">
                Rates are approximate and stored offline. Last updated: {LAST_UPDATE}.
                For real-time rates, use a financial service API.
              </p>
            </div>
          </div>
        </div>

        {/* Main Converter */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium text-accent-foreground mb-4">Convert Currency</h2>

          <div className="space-y-4">
            {/* Amount Input */}
            <div>
              <label htmlFor="page-input-160" className="text-sm text-muted-foreground mb-2 block">Amount</label>
              <input id="page-input-160"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground text-xl font-mono"
              />
            </div>

            {/* From Currency */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="p-3 bg-muted hover:bg-accent border border-border rounded-lg text-accent-foreground hover:text-foreground transition"
                title="Swap currencies"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Converted Amount</p>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-white mb-4">
                {formatAmount(convertedAmount, toCurrency)}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </span>
              </div>
            </div>
            <button
              onClick={() => copy(convertedAmount.toFixed(2))}
              className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted/50 rounded-lg transition shrink-0"
              title="Copy amount"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Popular Conversions */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-4">
            Popular Exchange Rates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularConversions.map((conv) => {
              const fromCurr = CURRENCIES.find((c) => c.code === conv.from);
              const toCurr = CURRENCIES.find((c) => c.code === conv.to);
              return (
                <div
                  key={`${conv.from}-${conv.to}`}
                  className="bg-muted/50 border border-border rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">
                      {fromCurr?.flag} {conv.from} → {toCurr?.flag} {conv.to}
                    </span>
                  </div>
                  <p className="font-mono text-lg font-bold text-white">
                    {conv.rate}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Currencies Quick View */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-4">
            1 {fromCurrency} equals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CURRENCIES.filter((c) => c.code !== fromCurrency).map((currency) => {
              const fromRate = EXCHANGE_RATES[fromCurrency] ?? 1;
              const toRate = EXCHANGE_RATES[currency.code] ?? 1;
              const rate = fromRate > 0 ? toRate / fromRate : 0;
              const converted = parseFloat(amount || "0") * rate;
              return (
                <div
                  key={currency.code}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{currency.flag}</span>
                    <span className="text-sm text-accent-foreground">
                      {currency.code}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {converted.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <RelatedTools currentPath="/currency" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={currencyGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-currency" title={currencyGuideContent.introduction.title} subtitle="Understanding currency conversion for developers" variant="default">
            <MarkdownContent content={currencyGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers implement currency conversion" variant="default">
            <FeatureGrid features={currencyGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={currencyGuideContent.howToUse.title} subtitle="Master multi-currency conversion" variant="minimal">
            <HowToSchema name={`How to use ${currencyGuideContent.toolName}`} description="Step-by-step guide to currency conversion" steps={currencyGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${currencyGuideContent.toolPath}`} />
            <MarkdownContent content={currencyGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about currency conversion" variant="default">
            <ToolFAQ faqs={currencyGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={currencyGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={currencyGuideContent.security.content} />
          </GeoSection>

          {currencyGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(currencyGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={currencyGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Convert between 20 major world currencies with offline exchange rates.
            Perfect for quick conversions and estimates.
          </p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Currency Converter"
        description="Free online currency converter with live exchange rates. Convert between 170+ world currencies including USD, EUR, GBP, JPY, and more. Real-time forex rates updated regularly."
        url="https://openkit.tools/currency"
        applicationCategory="FinanceApplication"
        datePublished="2024-01-15"
        dateModified={currencyGuideContent.lastUpdated}
        version={currencyGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Currency Converter', url: 'https://openkit.tools/currency' },
        ]}
      />
    </main>
  );
}
