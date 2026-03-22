/**
 * Position Size Calculator Tool Guide Content
 * Comprehensive guide for trading position sizing and risk management
 */

import type { ToolGuideContent } from "./types";

export const positionSizeGuideContent: ToolGuideContent = {
  toolName: "Position Size Calculator",
  toolPath: "/position-size",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Account Balance",
      description: "Type your total trading account balance in USD. This is the total capital you have available for trading, not the amount you want to risk on a single trade. Supports any account size from small retail accounts to institutional portfolios."
    },
    {
      title: "Set Your Risk Percentage",
      description: "Choose the percentage of your account you are willing to risk on this trade. Professional traders typically risk 0.5-2% per trade. The risk meter will show whether your chosen level is conservative, moderate, aggressive, or dangerous."
    },
    {
      title: "Enter Entry and Stop Loss Prices",
      description: "Input your planned entry price and stop loss price. For long positions, stop loss is below entry. For short positions, stop loss is above entry. Toggle between long and short to match your trade direction."
    },
    {
      title: "Review Position Size and Risk Metrics",
      description: "See your calculated position size in units, dollar risk amount, stop loss distance in points and percentage. Use the risk meter gauge to visually assess whether your risk level is appropriate for your trading strategy."
    }
  ],

  introduction: {
    title: "What is Position Sizing?",
    content: `Position sizing is the process of determining how many units of a security to buy or sell based on your account size, risk tolerance, and the distance to your stop loss. It is widely considered the single most important factor in long-term trading success, more important than entry signals, technical analysis patterns, or market timing.

### The Core Formula

The position size formula is straightforward:

\`\`\`
Position Size = (Account Balance x Risk %) / |Entry Price - Stop Loss Price|
\`\`\`

For example, with a $50,000 account risking 2% per trade, and a stock entry at $100 with a stop loss at $95, the calculation is: ($50,000 x 0.02) / |$100 - $95| = $1,000 / $5 = 200 shares.

### Why Position Sizing Matters

**Capital preservation:** Without proper position sizing, a single losing trade can devastate your account. Professional traders know that preserving capital is the first rule of trading. A 50% loss requires a 100% gain just to break even. Keeping losses small through proper position sizing ensures you survive long enough for your edge to play out.

**Consistency:** Position sizing creates consistency across trades regardless of the asset or timeframe. Whether you are trading a $10 stock with a $0.50 stop or a $500 stock with a $25 stop, risking the same percentage means every trade has the same impact on your account. This removes emotional bias from sizing decisions.

**Compounding:** Proper position sizing enables compounding. When you risk a fixed percentage of your growing account, position sizes naturally increase as your account grows and decrease after drawdowns. This geometric scaling is how small accounts grow into large ones over time.

**Drawdown management:** A trader risking 1% per trade can endure 10 consecutive losses and only be down about 9.6%. A trader risking 5% per trade would be down 40% after the same losing streak. The difference between surviving a drawdown and blowing up an account often comes down to position sizing discipline.

### Position Sizing Across Markets

**Stocks:** Position size is measured in shares. Entry and stop loss are share prices. Dollar risk = shares x price distance to stop.

**Forex:** Position size is measured in lots (standard = 100,000 units, mini = 10,000, micro = 1,000). Pip value varies by currency pair and lot size.

**Futures:** Position size is measured in contracts. Each point of movement has a fixed dollar value that varies by contract (e.g., $50/point for ES, $5/point for NQ micro).

**Crypto:** Position size is measured in coins or tokens. High volatility makes position sizing especially critical. Many traders use smaller risk percentages (0.5-1%) due to the outsized moves common in crypto markets.

### Risk Management Framework

Position sizing is one component of a complete risk management framework that includes: per-trade risk limits, daily loss limits, maximum open exposure, correlated position management, and portfolio-level risk budgets. This calculator addresses the foundational per-trade risk calculation that forms the basis of all higher-level risk management.`
  },

  useCases: [
    {
      title: "Forex Day Trading",
      description: "Calculate lot sizes for forex pairs based on pip distance to stop loss. Convert between standard, mini, and micro lots. Essential for managing risk across different currency pairs with varying pip values.",
      example: `Account: $25,000
Risk: 1% = $250
EUR/USD Entry: 1.0850
Stop Loss: 1.0820 (30 pips)
Position Size: $250 / 0.0030 = 83,333 units
Approximately 0.83 standard lots`
    },
    {
      title: "Stock Swing Trading",
      description: "Determine share count for multi-day stock trades where stop loss is based on support levels, moving averages, or ATR multiples. Ensures consistent risk per trade regardless of stock price or volatility.",
      example: `Account: $100,000
Risk: 1.5% = $1,500
AAPL Entry: $185.00
Stop Loss: $178.50 (below support)
Position Size: $1,500 / $6.50 = 230 shares
Total Position Value: $42,550 (42.5% of account)`
    },
    {
      title: "Crypto Position Sizing",
      description: "Size cryptocurrency positions accounting for high volatility. Typically uses smaller risk percentages than traditional markets. Works for spot trading, margin trading, and futures with leverage adjustments.",
      example: `Account: $10,000
Risk: 0.5% = $50 (conservative for crypto)
BTC Entry: $42,500
Stop Loss: $41,800 (below support)
Position Size: $50 / $700 = 0.0714 BTC
Total Exposure: $3,035 (30.4% of account)`
    },
    {
      title: "Futures Scalping",
      description: "Calculate contract quantities for futures trading where each tick or point has a fixed dollar value. Critical for high-frequency trading where tight stops and precise sizing determine profitability.",
      example: `Account: $50,000
Risk: 0.25% = $125
ES Futures Entry: 4,520
Stop Loss: 4,517.50 (2.5 points)
Dollar value per point: $50
Risk per contract: 2.5 x $50 = $125
Position Size: $125 / $125 = 1 contract`
    },
    {
      title: "Options Underlying Sizing",
      description: "Determine the equivalent underlying position size when trading options. Use the calculated size to determine option contracts and appropriate strike selection based on delta exposure.",
      example: `Account: $75,000
Risk: 2% = $1,500
Stock Entry: $250.00
Stop Loss: $240.00
Position Size: $1,500 / $10 = 150 shares
Options: ~1.5 ATM contracts (100 shares each)
Or 2 slightly OTM contracts for similar delta`
    },
    {
      title: "Portfolio Risk Budgeting",
      description: "Allocate risk across multiple simultaneous positions within a portfolio. Ensures total portfolio risk stays within acceptable bounds even when holding correlated positions across different assets.",
      example: `Account: $200,000
Total risk budget: 6% = $12,000
Position 1 (AAPL): 1.5% risk = $3,000
Position 2 (MSFT): 1.5% risk = $3,000
Position 3 (GOOGL): 1.5% risk = $3,000
Position 4 (AMZN): 1.5% risk = $3,000
Total allocated: 6% across 4 positions`
    }
  ],

  howToUse: {
    title: "How to Use the Position Size Calculator",
    content: `This calculator determines the optimal number of units (shares, lots, coins, or contracts) to trade based on your risk parameters. All calculations happen instantly as you type.

### Setting Up Your Trade Parameters

**Account Balance:** Enter your total available trading capital. This should be your entire account balance, not just available margin. The calculator uses this to compute your dollar risk based on the percentage you choose. Update this regularly as your account grows or shrinks.

**Risk Percentage:** Choose how much of your account to risk on a single trade. Guidelines by experience level:
- Conservative (under 1%): New traders, large accounts, high-frequency strategies
- Moderate (1-2%): Experienced traders, standard swing trading
- Aggressive (2-5%): Very experienced traders, high-conviction setups
- Dangerous (over 5%): Not recommended for most traders

**Entry Price:** The price at which you plan to enter the trade. For limit orders, this is your limit price. For market orders, use the current ask (buying) or bid (selling).

**Stop Loss Price:** The price at which you will exit if the trade moves against you. This should be determined by technical analysis (support/resistance, moving averages, ATR) before calculating position size.

### Long vs Short Positions

**Long positions:** You buy the asset expecting it to increase in value. Entry price is below your target, and stop loss is below your entry. The stop loss distance is calculated as Entry - Stop Loss.

**Short positions:** You sell the asset expecting it to decrease in value. Entry price is above your target, and stop loss is above your entry. The stop loss distance is calculated as Stop Loss - Entry.

### Interpreting the Results

**Position Size (units):** The number of shares, lots, or coins to trade. This is the primary output. Round down to the nearest whole share or applicable lot size for your broker.

**Dollar Risk Amount:** The maximum amount you will lose if your stop loss is hit. This equals Account Balance multiplied by Risk Percentage.

**Stop Loss Distance:** Shown in both absolute points and as a percentage of the entry price. Wider stops mean smaller position sizes for the same dollar risk.

### The Risk Meter

The visual risk gauge provides instant feedback on your chosen risk level. Green indicates conservative risk (under 1%), amber indicates moderate risk (1-2%), orange indicates aggressive risk (2-5%), and red indicates dangerous risk (over 5%). Most professional traders operate in the green to amber zone.`,
    steps: [
      {
        name: "Enter Account Balance",
        text: "Type your total trading account balance in the Account Balance field. Use the full account value, not available margin. Example: $50,000."
      },
      {
        name: "Set Risk Percentage",
        text: "Enter the percentage of your account you want to risk on this trade. Start with 1% if unsure. Watch the risk meter gauge for visual feedback on your risk level."
      },
      {
        name: "Select Trade Direction",
        text: "Toggle between Long and Short to match your trade direction. Long means you are buying (stop loss below entry). Short means you are selling (stop loss above entry)."
      },
      {
        name: "Enter Entry and Stop Loss Prices",
        text: "Input your planned entry price and stop loss price. The stop loss should be based on technical analysis, not an arbitrary number. Wider stops result in smaller position sizes."
      },
      {
        name: "Review Calculated Position Size",
        text: "The calculator instantly shows your position size in units, total dollar risk, and stop loss distance. Round the position size down to the nearest tradeable unit for your broker."
      }
    ]
  },

  faqs: [
    {
      question: "What percentage of my account should I risk per trade?",
      answer: "Most professional traders risk between 0.5% and 2% of their account per trade. New traders should start at 0.5-1% while developing their edge. The key principle is that no single trade should significantly impact your ability to keep trading. Even with 10 consecutive losses at 1% risk, you would only lose about 9.6% of your account, which is very recoverable. At 5% risk per trade, the same losing streak would cost you 40%, requiring a 67% gain just to break even."
    },
    {
      question: "How does position sizing differ for forex vs stocks?",
      answer: "The core formula is the same, but the units differ. For stocks, the result is in shares. For forex, divide the dollar risk by the pip value to get lot size. A standard lot (100,000 units) of EUR/USD has a pip value of approximately $10. So $200 risk with a 20-pip stop = $200 / ($10 x 20) = 1 standard lot. Mini lots are 10,000 units ($1/pip) and micro lots are 1,000 units ($0.10/pip). This calculator gives you the unit count that you can convert to lots."
    },
    {
      question: "Should I adjust position size for volatile markets?",
      answer: "Yes. In volatile markets, stop losses are typically wider to avoid getting stopped out by normal price fluctuations. Wider stops automatically reduce your position size when using this calculator, which is the correct behavior. Some traders use ATR (Average True Range) multiples for stops: a 2x ATR stop in a volatile market will be wider than in a calm market, naturally sizing you smaller. You can also reduce your risk percentage during high-volatility periods."
    },
    {
      question: "What is the maximum position size I should take?",
      answer: "Beyond the per-trade risk percentage, consider total position exposure. Many traders limit single positions to 20-25% of account value and total portfolio exposure to 100-150%. If your calculated position size exceeds 20-25% of your account in dollar terms, the position is very concentrated even if the risk percentage is small. This happens with tight stops on expensive assets."
    },
    {
      question: "How do I handle position sizing with leverage?",
      answer: "Leverage does not change the position size calculation. If your calculator says to buy 200 shares, you buy 200 shares whether on a cash account or a margin account. Leverage affects how much capital is required to hold the position, not the size itself. However, leverage allows you to take positions larger than your account balance, which increases your risk of a margin call if the position moves against you beyond your stop loss."
    },
    {
      question: "How does this calculator handle both long and short trades?",
      answer: "The calculator uses the absolute difference between entry and stop loss prices. For long trades, stop loss is below entry (Entry - Stop Loss = distance). For short trades, stop loss is above entry (Stop Loss - Entry = distance). Toggle the Long/Short switch to match your trade direction. The formula is the same in both cases: Position Size = Dollar Risk / Stop Loss Distance."
    },
    {
      question: "Should I scale into positions or enter full size at once?",
      answer: "Both approaches work with proper position sizing. If scaling in (adding to a position in parts), calculate the total position size first, then divide it into entries. For example, if your calculated size is 300 shares, you might enter 100 at your initial price, 100 at a pullback level, and 100 at confirmation. Your total risk across all entries should not exceed your per-trade risk limit."
    },
    {
      question: "Is my trading data private when using this calculator?",
      answer: "Yes, completely. All calculations happen in your browser using client-side JavaScript. Your account balance, trade parameters, and calculated position sizes are never sent to any server. No data is stored in cookies, local storage, or databases. The calculator works entirely offline after the page loads."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All position size calculations happen entirely in your browser using client-side JavaScript. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All arithmetic and position sizing calculations use browser-native JavaScript math operations. No server round-trips.
- **No Server Uploads:** Your account balance, risk parameters, entry prices, and stop loss levels are never transmitted anywhere. The tool works completely offline after page load.
- **No Data Storage:** Trading parameters and calculated position sizes are not saved to cookies, localStorage, databases, or any persistent storage. Data exists only in memory while the page is open.
- **No Analytics on Content:** We do not track what account sizes, risk levels, or trade parameters you enter. No calculation-specific telemetry.
- **Transparent & Auditable:** Open browser DevTools Network tab to verify zero outbound requests containing your trading data.

Safe for calculating position sizes for any trading account, strategy, or market. Your financial data never leaves your device.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Markets Supported": "All",
    "Risk Levels": "4 zones",
    "Trade Directions": "Long & Short",
    "Server Uploads": "0"
  }
};
