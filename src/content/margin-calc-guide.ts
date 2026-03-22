/**
 * Margin & Leverage Calculator Tool Guide Content
 * Comprehensive guide for margin trading calculations
 */

import type { ToolGuideContent } from "./types";

export const marginCalcGuideContent: ToolGuideContent = {
  toolName: "Margin Calculator",
  toolPath: "/margin-calc",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Account Balance & Position Size",
      description: "Input your account balance in USD and the total position size you want to open. The position size represents the full notional value of the trade, not just the margin requirement. For example, a $10,000 position on BTC at 10x leverage requires only $1,000 in margin."
    },
    {
      title: "Set Entry Price & Leverage",
      description: "Enter the asset entry price and select your desired leverage from presets (1x, 2x, 5x, 10x, 20x, 50x, 100x, 125x) or type a custom value. Higher leverage amplifies both gains and losses. The tool instantly recalculates margin requirements as you adjust leverage."
    },
    {
      title: "Choose Direction & Maintenance Rate",
      description: "Select Long (profit when price rises) or Short (profit when price falls). Adjust the maintenance margin rate if your exchange uses a different value than the 0.5% default. Exchanges like Binance, Bybit, and Kraken each have their own maintenance margin schedules."
    },
    {
      title: "Review Results & Leverage Impact Table",
      description: "View your required margin, free margin, margin level percentage, and exact liquidation price with distance. The leverage impact table compares the same position across all leverage levels so you can see how each affects margin and liquidation risk."
    }
  ],

  introduction: {
    title: "What is Margin & Leverage Trading?",
    content: `Margin trading allows traders to open positions larger than their account balance by borrowing funds from an exchange or broker. Leverage is the ratio between the position size and the margin (collateral) required to open it. A 10x leveraged position means you control $10,000 worth of an asset with only $1,000 of your own capital. While leverage amplifies potential profits, it equally amplifies potential losses, making proper margin management essential for survival in leveraged markets.

### Core Margin Trading Concepts

**Required Margin (Initial Margin):** The minimum collateral needed to open a leveraged position. Calculated as Position Size divided by Leverage. At 10x leverage on a $50,000 position, you need $5,000 in margin. This amount is locked by the exchange for the duration of the trade and cannot be used for other positions.

**Free Margin:** The remaining balance available after accounting for all used margin. Free Margin equals Account Balance minus Used Margin. If your account holds $10,000 and $5,000 is used as margin, you have $5,000 in free margin available for new positions or to absorb unrealized losses. When free margin reaches zero, you cannot open new positions.

**Margin Level:** Expressed as a percentage, Margin Level equals (Equity divided by Used Margin) multiplied by 100. Equity includes your account balance plus any unrealized profit or minus any unrealized loss. A margin level of 200% means your equity is double your used margin. Most exchanges trigger margin calls around 100% and liquidation between 50-80%, though thresholds vary significantly between platforms.

**Liquidation Price:** The exact price at which the exchange forcefully closes your position to prevent the account from going negative. For long positions, liquidation occurs below your entry price. For short positions, it occurs above. The distance between entry and liquidation narrows as leverage increases. At 100x leverage, a mere 1% adverse move can trigger liquidation.

### Why Margin Calculations Matter

**Risk Management:** Before entering any leveraged trade, calculating the exact liquidation price tells you the maximum adverse move your position can withstand. Professional traders never enter positions without knowing their liquidation price and ensuring it sits beyond key support or resistance levels. Position sizing based on margin calculations is the foundation of professional risk management.

**Capital Efficiency:** Understanding margin requirements helps traders allocate capital across multiple positions efficiently. With $10,000, you might allocate $3,000 as margin for a BTC position, $2,000 for an ETH position, and keep $5,000 as free margin buffer. Without calculating requirements, traders risk over-leveraging and triggering cascading liquidations across positions.

**Exchange Comparison:** Different exchanges offer different maximum leverage levels and use different maintenance margin rates. Binance Futures uses tiered maintenance rates starting at 0.4% for small positions up to 5% for large ones. Bybit, dYdX, and Kraken each have their own schedules. This calculator helps compare effective liquidation prices across platforms.

**Derivatives Development:** Developers building trading platforms, portfolio trackers, or risk management dashboards need accurate margin calculation engines. The formulas implemented in this tool are the same ones used by production trading systems at exchanges and hedge funds. Understanding the math is essential for building reliable financial software.

### Margin Trading Across Markets

**Cryptocurrency exchanges:** Offer the highest leverage, commonly 50x-125x on major pairs (BTC/USDT, ETH/USDT). Both isolated and cross-margin modes available. Liquidation is automatic and near-instant. Funding rates add ongoing cost to perpetual futures positions.

**Forex brokers:** Typically offer 30x-500x leverage depending on jurisdiction. EU regulations (ESMA) cap retail forex leverage at 30x for major pairs. US regulations (CFTC) cap at 50x. Margin calls and stop-out levels vary by broker, usually at 50-100%.

**Stock brokers:** US Regulation T requires 50% initial margin for stocks (effectively 2x leverage). Pattern day traders can access 4x intraday leverage. Maintenance margin is typically 25-30%. Margin calls require additional deposits within 2-5 business days or positions are liquidated.

**Futures markets:** Each contract has its own margin schedule set by the exchange clearinghouse (CME, ICE). ES futures (S&P 500) require approximately $12,000 initial margin per contract controlling roughly $250,000 notional value, effectively providing about 20x leverage.

This calculator handles all these scenarios with configurable leverage, maintenance rates, and position directions. All calculations run entirely in your browser with no data transmission.`
  },

  useCases: [
    {
      title: "Pre-Trade Risk Assessment",
      description: "Calculate exact liquidation price and required margin before entering leveraged positions on crypto exchanges (Binance, Bybit, dYdX) or forex brokers. Know your maximum downside and position your stop-loss above the liquidation level."
    },
    {
      title: "Position Sizing for Portfolio Allocation",
      description: "Determine how much margin each position requires so you can allocate capital across multiple trades. Keep sufficient free margin to avoid cascading liquidations during volatile market conditions."
    },
    {
      title: "Leverage Comparison Analysis",
      description: "Compare the same trade at different leverage levels to find the optimal balance between capital efficiency and liquidation distance. The leverage impact table instantly shows margin requirements and liquidation prices across all leverage options."
    },
    {
      title: "Exchange Platform Comparison",
      description: "Different exchanges have different maintenance margin rates and maximum leverage. Compare effective liquidation prices for the same position across Binance (0.4%), Bybit (0.5%), and others by adjusting the maintenance rate."
    },
    {
      title: "Trading Platform Development",
      description: "Developers building trading bots, portfolio dashboards, or exchange interfaces can verify their margin calculation engines against this tool. The formulas used here match production implementations at major exchanges."
    },
    {
      title: "Educational Risk Demonstration",
      description: "Demonstrate to new traders how increasing leverage dramatically narrows the distance to liquidation. Visualize why 100x leverage on a volatile asset is extremely dangerous compared to 5x or 10x leverage on the same position."
    }
  ],

  howToUse: {
    title: "How to Use the Margin & Leverage Calculator",
    content: `This tool calculates margin requirements, liquidation prices, and margin levels for leveraged trading positions. It supports any asset class including cryptocurrency, forex, stocks, and futures. All inputs update results in real time.

### Setting Up Your Calculation

Enter your **Account Balance** to represent total funds in your trading account. This is the full balance, not just the amount you plan to use for one trade. The calculator uses this to determine free margin and margin level.

Enter the **Position Size** as the total notional value of the position. This is the full value of the trade, not the margin amount. For example, buying 1 BTC at $50,000 with 10x leverage means your position size is $50,000 and your required margin is $5,000.

Set the **Entry Price** to the price at which you plan to enter the trade. For existing positions, use your actual entry price to calculate your current liquidation distance.

### Choosing Leverage

Select from preset leverage values (1x through 125x) or enter a custom value. Keep in mind:

- **1x-2x:** Conservative. Used for spot-equivalent positions with margin buffer. Liquidation very far from entry.
- **5x-10x:** Moderate. Common for swing trading crypto and forex. Reasonable liquidation distance.
- **20x-50x:** Aggressive. Requires tight risk management and stop-losses. Liquidation within 2-5% of entry.
- **100x-125x:** Extremely aggressive. Sub-1% moves can trigger liquidation. Only for experienced scalpers with strict discipline.

### Understanding Direction

**Long** positions profit when price rises above entry. Liquidation occurs below entry price. The lower the leverage, the further below entry the liquidation sits.

**Short** positions profit when price falls below entry. Liquidation occurs above entry price. The lower the leverage, the further above entry the liquidation sits.

### Reading the Equity Bar

The visual equity bar shows your account balance composition at a glance:
- **Amber section:** Used margin locked in the position
- **Green section:** Free margin available for new trades or to absorb losses
- **Red lines:** Margin call and liquidation levels as percentage thresholds

When the amber section dominates the bar, your account is heavily leveraged with little free margin buffer.

### Leverage Impact Table

The comparison table at the bottom shows the same position size at every available leverage level. This reveals how leverage affects:
- Required margin (how much capital is locked)
- Liquidation price (how close liquidation sits to entry)
- Liquidation distance (percentage move that triggers liquidation)

Use this table to find the leverage level that balances capital efficiency with acceptable risk.

### Maintenance Margin Rate

The default 0.5% maintenance margin rate matches common exchange defaults. Adjust this based on your exchange:
- **Binance Futures:** 0.4% for positions under $50,000, tiered higher for larger positions
- **Bybit:** 0.5% default, tiered for larger positions
- **dYdX:** Varies by market, typically 3-5%
- **Forex brokers:** Often 50% of initial margin (varies widely)

The maintenance margin rate directly affects your liquidation price. Higher maintenance rates move liquidation closer to your entry price.`,
    steps: [
      {
        name: "Enter Account Details",
        text: "Input your account balance (total funds) and the position size (full notional value of the trade you want to open)."
      },
      {
        name: "Configure Trade Parameters",
        text: "Set the entry price, select leverage from presets or enter custom, choose Long or Short direction, and adjust maintenance margin rate if needed."
      },
      {
        name: "Review Margin Requirements",
        text: "Check required margin, free margin, margin level percentage, and the visual equity bar showing how your balance is allocated."
      },
      {
        name: "Analyze Liquidation Risk",
        text: "Review your liquidation price, distance to liquidation in both price and percentage terms, and use the leverage impact table to compare alternative leverage levels."
      }
    ]
  },

  faqs: [
    {
      question: "What is the difference between isolated and cross margin?",
      answer: "Isolated margin limits the collateral for a position to only the margin allocated to that specific trade. If liquidated, you lose only the isolated margin, not your entire account. Cross margin uses your full account balance as collateral across all positions. It reduces liquidation risk for individual positions but means a large loss on one trade can affect all others. This calculator shows calculations similar to isolated margin (single position against account balance). For cross margin with multiple positions, the effective margin is more complex as unrealized PnL from all positions affects the total equity."
    },
    {
      question: "How accurate is the liquidation price calculation?",
      answer: "The liquidation price formula used here provides a close approximation that matches most exchange engines for basic scenarios. Real exchange liquidation engines may differ slightly due to: funding rate accumulation on perpetual contracts, tiered maintenance margin rates that change based on position size, insurance fund deductions, and mark price vs. last price differences. For exact liquidation prices, always verify on your specific exchange. This tool is designed for pre-trade planning and risk assessment, not as a replacement for exchange-provided liquidation estimates."
    },
    {
      question: "Why does higher leverage mean closer liquidation?",
      answer: "Higher leverage means less margin relative to position size. With 10x leverage on a $10,000 position, your $1,000 margin can absorb a ~10% adverse move before being depleted. With 100x leverage, only $100 backs the same position, so roughly a 1% move exhausts the margin. The maintenance margin rate adds a small buffer, but the fundamental relationship holds: leverage is inversely proportional to liquidation distance. This is why professional traders typically use lower leverage (2x-10x) and rely on position sizing rather than leverage for returns."
    },
    {
      question: "What is a margin call and when does it happen?",
      answer: "A margin call occurs when your margin level drops to the exchange's threshold, typically 100% (equity equals used margin). At this point, you receive a warning to either deposit more funds or close positions. If margin level continues to fall to the liquidation threshold (often 50-80% depending on the exchange), the exchange forcefully closes your position at market price. On crypto exchanges, this process is often automated and near-instant due to 24/7 markets and high volatility. Forex and stock brokers may give you hours or days to meet the margin call."
    },
    {
      question: "How do funding rates affect margin positions?",
      answer: "On perpetual futures contracts (common on crypto exchanges), funding rates are periodic payments between long and short traders to keep the contract price close to the spot price. When funding is positive, longs pay shorts; when negative, shorts pay longs. These payments accumulate over time and reduce your margin. A position that appears safe based on initial margin calculation can get closer to liquidation over days or weeks due to accumulated funding costs. Always factor in expected funding rate impact for longer-duration trades."
    },
    {
      question: "What maintenance margin rate should I use?",
      answer: "The default 0.5% works for most crypto exchange calculations at standard position sizes. However, rates vary: Binance uses 0.4% for positions under $50,000 USDT, scaling up to 5% for $100M+ positions. Bybit starts at 0.5%. dYdX uses 3-5% depending on the market. For forex, maintenance margin is typically expressed differently (e.g., 50% of initial margin). Check your specific exchange or broker documentation for exact rates, especially for large positions where tiered rates apply."
    },
    {
      question: "Can I use this calculator for forex margin calculations?",
      answer: "Yes. Set the entry price to the forex pair price, position size to the notional value in your account currency, and leverage to your broker's offering (commonly 30x-500x). Adjust the maintenance margin rate based on your broker's stop-out level. For example, if your broker has a 50% stop-out level on 100:1 leverage, set leverage to 100 and the maintenance rate to approximately 0.5%. The liquidation price output represents your stop-out price. Note that pip value calculations are not included; this tool focuses on margin requirements and liquidation levels."
    },
    {
      question: "Is my trading data private when using this calculator?",
      answer: "Yes, completely. All calculations are performed entirely in your browser using client-side JavaScript. No account balances, position sizes, entry prices, or any calculation inputs are transmitted to servers, stored, or logged. The tool works fully offline after the initial page load. No API calls are made with your data. You can verify this by checking the Network tab in browser DevTools. Safe for calculating margin on live positions without exposing your trading activity."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All margin and leverage calculations run entirely in your browser using client-side JavaScript. Zero server communication, zero data transmission, zero logging of any kind.

### Privacy Guarantees

- **100% Client-Side Processing:** Every calculation uses browser-native JavaScript math. No external APIs, no server round-trips, no cloud processing.
- **No Data Transmission:** Account balances, position sizes, entry prices, and leverage settings never leave your device. Zero outbound network requests with your trading data.
- **No Storage or Logging:** Nothing is saved to cookies, localStorage, or any server-side database. Each session starts fresh.
- **No Analytics on Inputs:** We do not track what values you enter, what leverage you select, or any calculation-specific information.
- **Fully Auditable:** Open browser DevTools Network tab to verify zero data transmission. View page source to inspect the calculation logic.

Safe for calculating margin on live trading positions, planning trades with real account balances, and analyzing leverage risk without exposing any trading activity to third parties.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Leverage Presets": "8",
    "Custom Leverage": "Yes",
    "Directions": "Long/Short",
    "Server Uploads": "0"
  }
};
