/**
 * Currency Converter Tool Guide Content
 * Comprehensive developer guide for currency conversion
 */

import type { ToolGuideContent } from "./types";

export const currencyGuideContent: ToolGuideContent = {
  toolName: "Currency Converter",
  toolPath: "/currency",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Amount to Convert",
      description: "Type the monetary amount you want to convert. Supports decimals for precise values ($100.50, €250.75). Common for international transactions, travel budgeting, e-commerce pricing, or financial reporting across currencies."
    },
    {
      title: "Select Source Currency",
      description: "Choose the currency you're converting FROM using dropdown or search. Supports major world currencies (USD, EUR, GBP, JPY, CNY) plus 150+ others. Auto-detects common currency symbols ($, €, £, ¥)."
    },
    {
      title: "Select Target Currency",
      description: "Choose the currency you're converting TO. Tool fetches latest exchange rates from financial APIs and calculates converted amount instantly. Displays current exchange rate and calculation breakdown."
    },
    {
      title: "View and Copy Result",
      description: "See converted amount with proper currency formatting. View exchange rate used, timestamp of rates, and inverse rate. Copy result for use in spreadsheets, financial reports, pricing calculators, or expense tracking."
    }
  ],

  introduction: {
    title: "What is Currency Conversion?",
    content: `Currency conversion translates monetary amounts between different national or regional currencies using current foreign exchange (forex) rates. Exchange rates fluctuate based on market conditions, economic indicators, geopolitical events, and supply/demand dynamics in global currency markets.

Software developers implement currency conversion for: international e-commerce (displaying prices in buyer's local currency), payment processing (charging customers in their currency while merchant receives in base currency), financial reporting (consolidating multi-currency revenue), travel applications (budgeting and expense tracking abroad), forex trading platforms (real-time currency exchange), and business intelligence (analyzing international sales data in single currency).

### Why Currency Conversion Matters for Developers

**E-commerce internationalization:** Online stores serving global customers display prices in local currencies to improve conversion rates. Showing $99 USD to European customer is less intuitive than €90 EUR. Currency conversion happens at checkout or dynamically on product pages. Stripe, PayPal, and payment gateways handle multi-currency processing. Developer challenges: real-time rate updates, handling rate fluctuations during checkout, displaying accurate totals with tax/shipping in target currency.

**Payment gateway integration:** Services like Stripe support multi-currency charges. Merchant receives settlements in base currency (USD), but charges customer in their currency (EUR, GBP). Currency conversion happens server-side with exchange rate markups (typically 1-2%). APIs return amounts in cents/smallest unit (100 cents = $1 USD, 100 pence = £1 GBP). Developers must handle currency-specific decimal places (JPY has 0 decimals, most have 2, BHD has 3).

**Financial reporting and analytics:** Companies operating internationally track revenue, expenses, and profit across multiple currencies. Business intelligence tools convert all amounts to reporting currency (usually USD or EUR) for consolidated financial statements. Historical exchange rates required for accurate past-period reporting. Month-end closing uses specific date rates, not average rates, for GAAP compliance.

**Travel and expense management:** Business travel apps track expenses in local currencies and convert to home currency for reimbursement. Exchange rate at time of expense matters for accounting. Some companies use fixed monthly rates, others use daily rates. Expense receipt shows original currency and amount, plus converted amount with rate used and timestamp.

**Cryptocurrency integration:** Crypto exchanges and wallets display cryptocurrency values in user's fiat currency. Bitcoin price shown as $45,000 USD or €41,000 EUR depending on user location. Real-time conversion as crypto prices fluctuate dramatically. Developers fetch exchange rates from multiple sources, aggregate for accuracy, and update frequently (every minute or second for volatile periods).

### Exchange Rate Types and Sources

**Spot rates (real-time):** Current market exchange rate for immediate currency exchange. Used by forex traders, financial institutions. Rates change every second during market hours. APIs: Alpha Vantage, Fixer.io, CurrencyLayer, Open Exchange Rates. Accuracy critical for large transactions where 0.1% rate difference = significant money.

**Mid-market rates:** Average of buy and sell rates, represents true market value without markup. Used for fair conversion comparisons. Example: bank buys USD at 0.92 EUR, sells at 0.94 EUR. Mid-market rate: 0.93 EUR. Services like Wise (TransferWise) advertise using mid-market rates vs. bank markups.

**Bank/retail rates:** Rates consumers get from banks or exchange services, include markup (spread) above mid-market rate. Typical markup: 2-5% for banks, 1-2% for payment processors, 0.5-1% for specialized forex services like Wise. Developers using payment APIs must account for these markups when displaying expected charges.

**Historical rates:** Past exchange rates for specific dates. Required for: financial reporting (revenue for Q1 2023), expense reimbursement (business trip last month), auditing (verify invoice conversions from last year). APIs provide historical rate endpoints: /historical/{date}.

### Currency Formatting and Symbols

**Decimal places:** Most currencies use 2 decimals ($10.50, €25.75). Japanese Yen has 0 decimals (¥1000, not ¥1000.00). Some Middle Eastern currencies use 3 decimals (Kuwaiti Dinar 1.250 KWD).

**Symbols and codes:** Use ISO 4217 codes (USD, EUR, GBP, JPY) in APIs and databases. Use symbols ($, €, £, ¥) in user interfaces. Symbol placement varies: English uses prefix ($100), most European uses suffix (100€), some use spaces (100 €).

**Formatting standards:** Intl.NumberFormat API handles currency formatting per locale: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(1234.56) outputs "$1,234.56". French locale outputs "1 234,56 €". Never hardcode currency formatting - use locale-aware libraries.

### Exchange Rate Volatility

Exchange rates fluctuate constantly. Major currencies (USD, EUR) relatively stable day-to-day (0.5-1% moves), but emerging market currencies can swing 5-10% daily. Cryptocurrency extreme volatility (10-20% daily moves common). Developers must: update rates frequently (every hour for stable currencies, every minute for volatile), cache rates to avoid excessive API calls, handle rate changes during checkout (user starts checkout with one rate, completes 10 minutes later with different rate - lock rate or update total?), and display rate timestamps clearly.

This tool demonstrates currency conversion patterns for developer integration, using placeholder rates. Production applications should integrate live exchange rate APIs with proper error handling, caching strategies, and rate update frequencies appropriate for application requirements.`
  },

  useCases: [
    {
      title: "Display E-commerce Prices in Local Currency",
      description: "Convert product prices from base currency (USD) to customer's local currency for improved shopping experience. Show converted prices on product pages, cart, and checkout. Update rates daily or hourly to maintain accuracy without excessive API calls.",
      example: `// E-commerce price conversion:
const productPrice = {
  base_amount: 99.99,
  base_currency: 'USD'
};

const userCurrency = 'EUR';
const exchangeRate = 0.92;  // USD to EUR

const convertedPrice = productPrice.base_amount * exchangeRate;
// 99.99 × 0.92 = 91.99 EUR

// Display with proper formatting:
const formatted = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: userCurrency
}).format(convertedPrice);
// "91,99 €"

// Show both currencies:
// $99.99 USD (€91.99 EUR at rate 0.92)
// Updated: 2024-01-15 14:30 UTC`
    },
    {
      title: "Process Multi-Currency Payments with Stripe",
      description: "Stripe supports charging customers in their currency while merchant receives settlements in base currency. Handle currency conversion in payment flow, accounting for Stripe's exchange rate markups and currency-specific decimal handling.",
      example: `// Stripe multi-currency payment:
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);

// Create PaymentIntent in customer's currency:
const paymentIntent = await stripe.paymentIntents.create({
  amount: 9999,  // Amount in cents/smallest unit
  currency: 'eur',  // Customer pays in EUR
  // Stripe converts to merchant's settlement currency (USD)
  // using their exchange rate + markup
});

// Currency-specific decimal handling:
const formatAmount = (amount, currency) => {
  const decimals = currency === 'jpy' ? 0 : 2;
  return currency === 'jpy'
    ? amount  // ¥1000 (no decimals)
    : amount / 100;  // $10.00, €10.00 (2 decimals)
};`
    },
    {
      title: "Consolidate Multi-Currency Financial Reports",
      description: "Business operating internationally collects revenue in multiple currencies. Convert all transactions to reporting currency (usually USD or EUR) using rates from transaction dates for accurate financial statements and P&L reports.",
      example: `// Financial reporting conversion:
const transactions = [
  { date: '2024-01-15', amount: 1000, currency: 'EUR' },
  { date: '2024-01-20', amount: 50000, currency: 'JPY' },
  { date: '2024-01-25', amount: 800, currency: 'GBP' }
];

// Convert all to USD using historical rates:
const reportingCurrency = 'USD';
const convertedRevenue = await Promise.all(
  transactions.map(async tx => {
    const rate = await getHistoricalRate(
      tx.currency,
      reportingCurrency,
      tx.date
    );
    return {
      ...tx,
      usd_amount: tx.amount * rate,
      exchange_rate: rate
    };
  })
);

// Total revenue in USD:
const totalUSD = convertedRevenue.reduce(
  (sum, tx) => sum + tx.usd_amount,
  0
);
// €1000 + ¥50000 + £800 = $X,XXX USD`
    },
    {
      title: "Track Travel Expenses with Currency Conversion",
      description: "Travel expense apps convert foreign currency expenses to employee's home currency for reimbursement. Store original currency/amount plus converted amount with exchange rate and date used. Handle receipt uploads with automatic currency detection.",
      example: `// Travel expense tracking:
const expense = {
  merchant: 'Hotel Paris',
  date: '2024-01-15',
  amount: 250,
  currency: 'EUR',
  employee_base_currency: 'USD'
};

// Convert at time of expense:
const exchangeRate = await getHistoricalRate(
  expense.currency,
  expense.employee_base_currency,
  expense.date
);
// EUR to USD rate on 2024-01-15: 1.09

const reimbursementAmount = expense.amount * exchangeRate;
// €250 × 1.09 = $272.50 USD

// Store for audit trail:
await db.expenses.insert({
  ...expense,
  exchange_rate: exchangeRate,
  converted_amount: reimbursementAmount,
  rate_source: 'ECB',
  rate_timestamp: '2024-01-15T00:00:00Z'
});`
    }
  ],

  howToUse: {
    title: "How to Use This Currency Converter",
    content: `This tool converts monetary amounts between world currencies using current exchange rates. Enter amount, select source and target currencies, view converted result with rate information.

### Entering Amount

Type the monetary value to convert. Supports decimals (100.50, 1250.75). No need for currency symbols - they're selected separately. For large amounts, commas are optional (1000000 or 1,000,000 both work).

### Selecting Currencies

Choose source currency (converting FROM) and target currency (converting TO) from dropdowns. Search by currency code (USD, EUR, GBP) or country name (United States, Euro Zone, United Kingdom). Supports 150+ world currencies including major currencies, crypto-fiat pairs, and emerging markets.

### Understanding Exchange Rates

Exchange rate shows how many units of target currency equal 1 unit of source currency. Example: USD to EUR rate of 0.92 means $1 USD = €0.92 EUR. Inverse rate also shown: €1 EUR = $1.09 USD (calculated as 1 ÷ 0.92).

**Rate types:**
- **Mid-market rate:** True market rate without markup (what this tool displays)
- **Bank/retail rate:** Consumer rate with 2-5% markup above mid-market
- **Payment processor rate:** Stripe/PayPal rate with 1-2% markup

For actual transactions, expect to pay/receive slightly less favorable rates than mid-market due to service provider markups.

### Rate Updates and Caching

Exchange rates update periodically (typically hourly for stable currencies, more frequently for volatile currencies). Rate timestamp shows when rates were last fetched. For critical financial decisions with large amounts, verify rates with multiple sources or use live forex data.

**Caching strategy:** Apps typically cache rates for 1 hour (stable currencies like USD/EUR) or 15 minutes (volatile currencies, emerging markets). Balance API cost vs. accuracy needs.

### Currency-Specific Formatting

Different currencies have different formatting rules:
- **USD, EUR, GBP:** 2 decimal places ($10.50, €10.50, £10.50)
- **JPY:** 0 decimal places (¥1000, not ¥1000.00)
- **BHD, KWD:** 3 decimal places (1.250 BHD)

Tool handles formatting automatically based on currency standards.

### Historical Rate Lookups

For past-date conversions (expense reimbursements, historical financial analysis), use historical rate feature. Select specific date to get exchange rate from that day. Critical for accounting where rate at transaction date matters, not current rate.

### Multiple Currency Conversion

Convert one amount to multiple target currencies simultaneously. Useful for: comparing prices across regions, budgeting multi-country trips, or analyzing international sales in various markets.

### Limitations and Disclaimers

This tool demonstrates currency conversion patterns. For financial transactions, legal compliance, or large value transfers, use official financial services with live rates. Exchange rates fluctuate continuously - displayed rates are indicative, not guaranteed. Always verify rates at time of actual transaction.`,
    steps: [
      {
        name: "Enter Amount",
        text: "Type the monetary amount to convert. Supports decimals and large values. No currency symbols needed - selected separately."
      },
      {
        name: "Select Source Currency",
        text: "Choose currency you're converting FROM using dropdown or search. Supports 150+ world currencies by code or country name."
      },
      {
        name: "Select Target Currency",
        text: "Choose currency you're converting TO. Tool fetches current exchange rate and calculates converted amount instantly."
      },
      {
        name: "View and Copy Result",
        text: "See converted amount with currency formatting, exchange rate used, and rate timestamp. Copy for use in reports or financial tools."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between mid-market and retail exchange rates?",
      answer: "Mid-market rate is the true market exchange rate (midpoint between buy and sell prices) without markup - what banks and large institutions trade at. Retail rate is what consumers get from banks or exchange services, includes 2-5% markup above mid-market. Payment processors (Stripe, PayPal) charge 1-2% above mid-market. Example: mid-market USD/EUR = 0.92, bank retail rate = 0.90 (you get €0.90 per $1 instead of €0.92). This tool shows mid-market rates for fair comparison."
    },
    {
      question: "Why do some currencies have zero decimal places?",
      answer: "Japanese Yen (JPY), Korean Won (KRW), and some others are 'zero decimal currencies' - their base unit is small enough that decimals aren't needed. ¥100 is like $1 USD (roughly). Currencies with 2 decimals: USD ($), EUR (€), GBP (£). Currencies with 3 decimals: Kuwaiti Dinar (KWD), Bahraini Dinar (BHD) - their base units are worth more, need more precision. Payment APIs like Stripe handle this: amounts always in smallest unit (cents for USD, yen for JPY - no cents)."
    },
    {
      question: "How often do exchange rates update?",
      answer: "Forex markets trade 24/5 (weekdays), rates change every second during market hours. However, most applications don't need real-time rates. Common update frequencies: every hour for stable currency pairs (USD/EUR, USD/GBP), every 15-30 minutes for volatile currencies or during market events, every 5 minutes for forex trading apps, once daily for non-critical applications (expense tracking, travel budgeting). This tool uses cached rates updated periodically to balance accuracy and performance."
    },
    {
      question: "What's the best currency conversion API for production use?",
      answer: "Popular APIs: Open Exchange Rates (free tier 1000 req/month, good for small apps), Fixer.io (European Central Bank data, reliable), CurrencyLayer (simple API, free tier available), Alpha Vantage (includes forex and crypto), Wise API (mid-market rates, accurate). Choose based on: update frequency needs, free tier limits, historical rate support, cryptocurrency support, geographic coverage (some APIs lack emerging market currencies). For payment processing, use your gateway's built-in conversion (Stripe, PayPal handle this)."
    },
    {
      question: "Should I store converted amounts or convert on-demand?",
      answer: "Store original currency and amount always. For converted amounts: store when conversion rate matters historically (financial reports, expense reimbursements where rate at transaction date is legally required). Convert on-demand when showing current prices (e-commerce product pages - recalculate with latest rates). For database: store amount_cents (integer), currency (string), converted_amount_cents (integer, nullable), exchange_rate (decimal), rate_timestamp (datetime). Allows re-conversion if rates were wrong, auditing rate changes, showing historical vs. current value."
    },
    {
      question: "How do I handle currency conversion during checkout?",
      answer: "Lock exchange rate when user starts checkout, maintain same rate through completion (typically 10-15 minute session). Display rate and timestamp clearly. If session expires, refresh rates and update total (show 'Prices updated' message). Some merchants: lock rate at cart, some at payment page. For Stripe: PaymentIntent creation locks the conversion rate. Never surprise customer with different amount at payment - show rate changes explicitly and require confirmation."
    },
    {
      question: "What's the difference between exchange rate and conversion rate?",
      answer: "Exchange rate is financial term: how much one currency equals another (1 USD = 0.92 EUR). Conversion rate is marketing term: percentage of visitors who complete desired action (5% checkout conversion rate). Confusingly, 'conversion' used in both contexts. Currency conversion = translating money between currencies. Conversion rate optimization = improving e-commerce performance. This tool addresses currency exchange rates for financial calculations."
    },
    {
      question: "How do I convert cryptocurrency to fiat currency?",
      answer: "Crypto-to-fiat conversion similar to currency conversion but more volatile. Use crypto exchange APIs: CoinGecko (free), CoinMarketCap (popular), Messari (enterprise), exchange APIs (Coinbase, Kraken, Binance). Crypto rates update every minute or second due to 24/7 markets and high volatility. Example: 1 BTC = $45,000 USD today, might be $43,000 tomorrow (5% swing normal). For crypto wallets/apps, refresh rates frequently and show 'approximate value' disclaimers."
    },
    {
      question: "What currency formatting should I use for international users?",
      answer: "Use Intl.NumberFormat API (JavaScript) with user's locale: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(1234.56) outputs '$1,234.56'. German locale outputs '1.234,56 $'. French outputs '1 234,56 $'. Never hardcode formatting (dollar sign position, comma vs. period for decimals, space after symbol). Library handles: symbol placement, decimal separator (. vs ,), thousands separator (, vs . vs space), decimal places per currency. Backend: return amounts as integers (cents) and currency code, let frontend format."
    },
    {
      question: "Is my currency conversion data private?",
      answer: "Yes, all currency calculations happen entirely in your browser using client-side JavaScript math. No amounts, currencies, or conversion results are transmitted to servers, logged, or stored. The tool may fetch exchange rates from APIs (public rate data, not your amounts), but your specific conversion amounts never leave your device. Safe for calculating proprietary financial data, business budgets, or personal finances."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Currency conversion calculations happen in your browser using client-side JavaScript. Exchange rates may be fetched from public APIs, but your specific amounts and conversion details are never transmitted.

### Privacy Guarantees

- **100% Client-Side Calculations:** All conversion math uses browser-native JavaScript. Your amounts and results stay on your device.
- **No Amount Tracking:** We don't log, store, or transmit the specific amounts you convert. Rate APIs see no connection to your conversion amounts.
- **No Data Storage:** Conversion history and amounts are not saved or stored anywhere. Close the browser and data is gone.
- **No Analytics on Amounts:** We don't track what amounts you convert, what currencies you use frequently, or any conversion-specific patterns.
- **Public Rate Data Only:** Exchange rates are public financial data. Rate API calls don't include your amounts or personal information.

Safe for converting confidential financial data, business budgets, proprietary pricing, or personal financial planning. Use with confidence for sensitive financial calculations.`
  },

  stats: {
    "Supported Currencies": "150+",
    "Update Frequency": "Hourly",
    "Rate Source": "Multi-API",
    "Decimal Precision": "2-4",
    "Server Uploads": "0"
  }
};
