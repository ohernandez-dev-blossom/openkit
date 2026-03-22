import type { ToolGuideContent } from "./types";

export const pipValueGuideContent: ToolGuideContent = {
  toolName: "Pip Value Calculator",
  toolPath: "/pip-value",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Select Currency Pair",
      description: "Choose from major pairs like EUR/USD, GBP/USD, USD/JPY, or enter a custom pair with its exchange rate."
    },
    {
      title: "Choose Lot Size",
      description: "Select Standard (100,000), Mini (10,000), Micro (1,000), or Nano (100) lot size, or enter a custom amount."
    },
    {
      title: "Set Account Currency",
      description: "Select your account's base currency (USD, EUR, or GBP) to see pip values converted to your denomination."
    },
    {
      title: "Read Pip Value Table",
      description: "View pip values across all standard lot sizes simultaneously, plus projected values for 10, 50, and 100-pip moves."
    }
  ],

  introduction: {
    title: "What is a Pip in Forex Trading?",
    content: `A pip (Percentage in Point) is the smallest standard price movement in a forex currency pair. For most pairs, a pip is the fourth decimal place (0.0001). For Japanese Yen pairs, a pip is the second decimal place (0.01). Understanding pip values is fundamental to forex risk management.

### Why Pip Values Matter

Every forex trade's profit or loss is measured in pips. Knowing the dollar value of each pip for your position size is essential for:

- **Position Sizing:** Calculate exactly how much you'll make or lose per pip movement
- **Risk Management:** Set stop losses and take profits in dollar terms, not just pip distances
- **Strategy Evaluation:** Compare strategies across different pairs by normalizing returns to pip values
- **Account Protection:** Ensure no single trade risks more than your defined percentage of capital

### How Pip Value is Calculated

For pairs where USD is the quote currency (EUR/USD, GBP/USD, AUD/USD, NZD/USD):
\`Pip Value = Lot Size × 0.0001\`

For a standard lot (100,000 units): 100,000 × 0.0001 = $10 per pip.

For Japanese Yen pairs (USD/JPY, EUR/JPY):
\`Pip Value = (Lot Size × 0.01) / Exchange Rate\`

For cross pairs (EUR/GBP, GBP/CHF), the pip value must be converted through the quote currency's USD exchange rate.

### Lot Sizes Explained

Forex trading uses standardized lot sizes:
- **Standard Lot:** 100,000 units of base currency — for well-capitalized professional traders
- **Mini Lot:** 10,000 units — popular with intermediate retail traders
- **Micro Lot:** 1,000 units — ideal for beginners and precise position sizing
- **Nano Lot:** 100 units — offered by some brokers for practice with real money

The pip value scales linearly with lot size. A standard lot has 10x the pip value of a mini lot, 100x a micro lot, and 1,000x a nano lot.

### Account Currency Conversion

If your trading account is denominated in EUR or GBP (not USD), pip values need to be converted using the current exchange rate. This calculator handles the conversion automatically, showing pip values directly in your account currency.

Note that exchange rates fluctuate, so pip values for non-USD-denominated accounts change slightly with market movements. The rates used in this calculator are approximate reference rates — always verify with your broker's live rates for precise calculations.`
  },

  useCases: [
    {
      title: "Pre-Trade Risk Calculation",
      description: "Before entering a trade, calculate the exact dollar value at risk based on your stop-loss distance in pips and your position size."
    },
    {
      title: "Multi-Pair Position Comparison",
      description: "Compare the dollar exposure of positions across different currency pairs to ensure balanced portfolio risk."
    },
    {
      title: "Lot Size Determination",
      description: "Work backward from your maximum dollar risk per trade to determine the correct lot size for any currency pair."
    },
    {
      title: "Trade Journal Calculations",
      description: "Convert pip-based trade results into dollar amounts for accurate P&L tracking in your trading journal."
    }
  ],

  howToUse: {
    title: "How to Use the Pip Value Calculator",
    content: `The pip value calculator instantly shows you the monetary value of a single pip movement for any currency pair and lot size combination.`,
    steps: [
      {
        name: "Select your currency pair",
        text: "Choose from the preset major and cross pairs, or select 'Manual' to enter any pair with its current exchange rate."
      },
      {
        name: "Choose your lot size",
        text: "Select from standard lot sizes (Standard, Mini, Micro, Nano) or the lot size you plan to trade."
      },
      {
        name: "Set your account currency",
        text: "Choose the currency your trading account is denominated in (USD, EUR, or GBP) for accurate conversion."
      },
      {
        name: "Review the pip value table",
        text: "The table shows pip values for all four standard lot sizes simultaneously, plus projected values for 10-pip, 50-pip, and 100-pip moves."
      }
    ]
  },

  faqs: [
    {
      question: "What is a pip in forex?",
      answer: "A pip (Percentage in Point) is the smallest standard unit of price movement. For most currency pairs, it's the 4th decimal place (0.0001). For JPY pairs, it's the 2nd decimal place (0.01). Some brokers show 'pipettes' — an additional decimal place for even finer pricing."
    },
    {
      question: "How much is 1 pip worth in USD?",
      answer: "For a standard lot (100,000 units) of EUR/USD, 1 pip = $10. For a mini lot (10,000), 1 pip = $1. For a micro lot (1,000), 1 pip = $0.10. The value varies for non-USD quoted pairs based on the exchange rate."
    },
    {
      question: "Are the exchange rates in this calculator live?",
      answer: "No, the calculator uses approximate reference exchange rates that are periodically updated. For precise pip values, especially for cross pairs and during volatile markets, always verify with your broker's live rates."
    },
    {
      question: "What's the difference between a pip and a pipette?",
      answer: "A pipette is 1/10th of a pip — the 5th decimal place for most pairs (0.00001) or 3rd for JPY pairs (0.001). Some brokers offer pipette pricing for tighter spreads. This calculator works with standard pips."
    },
    {
      question: "How do I calculate risk in dollars from pips?",
      answer: "Multiply the pip value by your stop-loss distance in pips. For example, if 1 pip = $10 (standard lot EUR/USD) and your stop loss is 20 pips away, your risk is $200. Adjust lot size to match your desired dollar risk."
    },
    {
      question: "Why are JPY pair pip values different?",
      answer: "Japanese Yen is traded at much lower exchange rates (e.g., USD/JPY ~150) compared to EUR/USD (~1.08). Because of the two-decimal-place pricing, a pip in JPY pairs is 0.01 instead of 0.0001, and the pip value calculation divides by the exchange rate."
    },
    {
      question: "Can I use this for crypto or stock trading?",
      answer: "This calculator is designed specifically for forex pairs. Crypto and stock price movements are measured differently (points, ticks, or percentage moves). However, the underlying math of 'value per price unit' applies universally."
    }
  ],

  security: {
    title: "Privacy & Security",
    content: `All pip value calculations are performed entirely in your browser. No trading parameters or financial data is ever transmitted.

- **100% Client-Side:** All calculations use local JavaScript only
- **No Data Storage:** Your currency pairs and position sizes are never saved
- **Approximate Rates:** Exchange rates are hardcoded approximations — no external API calls
- **No Tracking:** No financial data collection or analytics
- **No Account Required:** Full functionality without registration`
  },

  stats: {
    "Processing": "Instant",
    "Privacy": "100% Local",
    "Supported Pairs": "8+ Major/Cross",
    "Server Data": "None"
  }
};
