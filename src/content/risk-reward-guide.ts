/**
 * Risk/Reward Calculator Tool Guide Content
 * Comprehensive guide for trading risk/reward ratio analysis
 */

import type { ToolGuideContent } from "./types";

export const riskRewardGuideContent: ToolGuideContent = {
  toolName: "Risk/Reward Calculator",
  toolPath: "/risk-reward",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Entry Price",
      description: "Input the price at which you plan to enter the trade. This is the current market price or your limit order price. For example, if buying shares of a stock at $100, enter 100 as the entry price."
    },
    {
      title: "Set Your Stop Loss",
      description: "Enter the price where you will exit to limit losses. For a long trade, the stop loss is below entry. For a short trade, it is above entry. Example: buying at $100 with a $95 stop loss means you are risking $5 per share."
    },
    {
      title: "Set Your Take Profit",
      description: "Enter the target price where you will take profits. For a long trade, take profit is above entry. For a short, it is below. Example: buying at $100 with a $110 take profit means you stand to gain $10 per share."
    },
    {
      title: "Review Your Risk/Reward Ratio",
      description: "The calculator instantly shows your R:R ratio, breakeven win rate, risk and reward amounts, and a visual chart of your trade setup. A ratio of 1:2 or higher is generally considered favorable. The breakeven win rate tells you how often you need to win for the strategy to be profitable."
    }
  ],

  introduction: {
    title: "What is Risk/Reward Ratio?",
    content: `The risk/reward ratio (R:R ratio) is one of the most fundamental concepts in trading and investing. It compares the potential loss of a trade to its potential gain, expressed as a ratio like 1:2 or 1:3. Understanding and consistently applying risk/reward analysis is what separates profitable traders from those who lose money over time.

### The Formula

The risk/reward ratio is calculated with a straightforward formula:

\`\`\`
Risk/Reward Ratio = |Take Profit - Entry| / |Entry - Stop Loss|
\`\`\`

For example, if you enter a long trade at $100 with a stop loss at $95 and a take profit at $115:
- Risk = |$100 - $95| = $5
- Reward = |$115 - $100| = $15
- R:R Ratio = $15 / $5 = 3.0 (expressed as 1:3)

This means for every $1 you risk, you stand to gain $3.

### Breakeven Win Rate

The breakeven win rate tells you the minimum percentage of trades you need to win for the strategy to be profitable at a given R:R ratio. The formula is:

\`\`\`
Breakeven Win Rate = 1 / (1 + R:R Ratio) x 100
\`\`\`

At a 1:2 risk/reward ratio, you only need to win 33.3% of your trades to break even. At 1:3, you only need 25%. At 1:1, you need 50%. This is why a higher R:R ratio is so powerful: it allows you to be wrong more often and still remain profitable.

### Why Risk/Reward Matters

**Mathematical edge.** A trader with a 40% win rate and a consistent 1:3 R:R ratio is profitable. Over 100 trades risking $100 each: 40 winners x $300 = $12,000 gained, 60 losers x $100 = $6,000 lost. Net profit: $6,000. The R:R ratio provides a mathematical framework for profitability regardless of win rate.

**Emotional discipline.** Pre-defining risk and reward before entering a trade removes emotion from exit decisions. You know exactly when to cut losses and when to take profits. Without a plan, traders often hold losers too long (hoping for recovery) and cut winners too short (fear of giving back gains).

**Portfolio consistency.** Applying a minimum R:R threshold (such as 1:2) across all trades creates consistent expectancy. Even during losing streaks, the math works in your favor over a large enough sample of trades. Professional traders and hedge funds use risk/reward analysis as a core component of their trading systems.

**Position sizing integration.** Risk/reward works hand-in-hand with position sizing. Once you know your risk per trade (the distance to your stop loss), you can calculate the exact position size to risk a fixed percentage of your account. For instance, risking 1% of a $50,000 account means $500 risk. If your stop loss is $5 away, your position size is 100 shares. This keeps drawdowns manageable.

### Common R:R Benchmarks

- **1:1** -- Breakeven at 50% win rate. Only profitable with above-average accuracy. Common in scalping.
- **1:1.5** -- Breakeven at 40% win rate. Common for short-term momentum trades.
- **1:2** -- Breakeven at 33.3% win rate. Industry standard minimum for swing trading.
- **1:3** -- Breakeven at 25% win rate. Excellent for trend-following strategies.
- **1:5+** -- Breakeven at 16.7% win rate. Typical of position trades and macro bets.

This tool calculates all of these metrics instantly from your entry, stop loss, and take profit prices, and provides a visual representation of the trade setup.`
  },

  useCases: [
    {
      title: "Day Trading Stock Setups",
      description: "Evaluate intraday trade setups by calculating risk/reward before entering. Ensure every trade meets your minimum R:R threshold (e.g., 1:2) to maintain positive expectancy across hundreds of daily trades.",
      example: `// Day trading: AAPL breakout above resistance at $185
const entry = 185.50;    // Entry above breakout level
const stopLoss = 184.20; // Below the breakout candle low
const takeProfit = 189.40; // Next resistance zone

const risk = Math.abs(entry - stopLoss);       // $1.30
const reward = Math.abs(takeProfit - entry);    // $3.90
const rrRatio = reward / risk;                  // 3.0 (1:3)
const breakevenWinRate = (1 / (1 + rrRatio)) * 100; // 25%

// With $50,000 account, risking 1%:
const riskBudget = 50000 * 0.01;  // $500
const shares = Math.floor(riskBudget / risk); // 384 shares
const positionSize = shares * entry; // $71,232

// Trade assessment: 1:3 R:R, need only 25% win rate
// If win rate is 45%, expected value per trade:
// (0.45 * $3.90 - 0.55 * $1.30) * 384 = $399.36 expected`
    },
    {
      title: "Swing Trading with Multi-Day Holds",
      description: "Analyze swing trade setups on daily charts where positions are held for days to weeks. Higher timeframes typically allow for wider stops and larger reward targets, making 1:3 or better R:R ratios achievable.",
      example: `// Swing trade: MSFT pullback to 50-day moving average
const entry = 420.00;      // Entry at MA support
const stopLoss = 408.00;   // Below swing low and MA
const takeProfit = 456.00;  // Previous high target

const risk = Math.abs(entry - stopLoss);       // $12.00
const reward = Math.abs(takeProfit - entry);    // $36.00
const rrRatio = reward / risk;                  // 3.0 (1:3)
const breakevenWinRate = (1 / (1 + rrRatio)) * 100; // 25%
const riskPercent = (risk / entry) * 100;       // 2.86%
const rewardPercent = (reward / entry) * 100;   // 8.57%

// Swing trade plan:
// Hold time: 5-15 trading days
// Risk per share: $12.00 (2.86%)
// Reward per share: $36.00 (8.57%)
// R:R: 1:3 - excellent swing setup
// Trail stop to breakeven after 1R move ($432)`
    },
    {
      title: "Forex Scalping Risk Management",
      description: "Calculate pip-based risk/reward for forex scalps. Forex traders often work with tight stops and need precise R:R calculations to ensure their strategy remains profitable at high trade frequencies.",
      example: `// Forex scalp: EUR/USD long at support
const entry = 1.0850;
const stopLoss = 1.0840;    // 10 pip stop
const takeProfit = 1.0865;  // 15 pip target

const riskPips = Math.abs(entry - stopLoss) * 10000;   // 10 pips
const rewardPips = Math.abs(takeProfit - entry) * 10000; // 15 pips
const rrRatio = rewardPips / riskPips;                   // 1.5 (1:1.5)
const breakevenWinRate = (1 / (1 + rrRatio)) * 100;     // 40%

// Standard lot: $10/pip, Mini lot: $1/pip
const lotSize = 0.5;  // 5 mini lots
const riskDollars = riskPips * lotSize * 10;   // $50
const rewardDollars = rewardPips * lotSize * 10; // $75

// Scalp assessment:
// 1:1.5 R:R is acceptable for scalping (high win rate expected)
// Need 40% win rate to break even
// Typical scalp win rate: 55-65%
// At 60% win rate over 100 trades:
// Profit = (60 * $75) - (40 * $50) = $4,500 - $2,000 = $2,500`
    },
    {
      title: "Crypto Position Trading",
      description: "Evaluate longer-term crypto positions where volatility demands wider stops. Crypto's large price swings can yield exceptional R:R ratios on position trades, but require disciplined stop placement.",
      example: `// Crypto position trade: BTC breakout from consolidation
const entry = 65000;
const stopLoss = 60000;     // Below consolidation range
const takeProfit = 85000;   // Measured move target

const risk = Math.abs(entry - stopLoss);       // $5,000
const reward = Math.abs(takeProfit - entry);    // $20,000
const rrRatio = reward / risk;                  // 4.0 (1:4)
const breakevenWinRate = (1 / (1 + rrRatio)) * 100; // 20%
const riskPercent = (risk / entry) * 100;       // 7.69%
const rewardPercent = (reward / entry) * 100;   // 30.77%

// Position sizing with 2% account risk:
const accountSize = 100000;
const maxRisk = accountSize * 0.02;  // $2,000
const btcPosition = maxRisk / risk;  // 0.4 BTC
const positionValue = btcPosition * entry; // $26,000

// Assessment:
// 1:4 R:R - excellent position trade setup
// Only need 20% win rate to break even
// Risking 2% of account ($2,000) for potential 8% gain ($8,000)`
    },
    {
      title: "Portfolio Risk Analysis",
      description: "Assess aggregate risk/reward across multiple open positions. Understanding the combined R:R profile of your portfolio helps manage overall exposure and ensures no single trade dominates account risk.",
      example: `// Portfolio R:R analysis across multiple positions
interface TradeSetup {
  symbol: string;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  shares: number;
}

function analyzePortfolioRR(trades: TradeSetup[], accountSize: number) {
  let totalRisk = 0;
  let totalReward = 0;

  const analysis = trades.map(trade => {
    const risk = Math.abs(trade.entry - trade.stopLoss) * trade.shares;
    const reward = Math.abs(trade.takeProfit - trade.entry) * trade.shares;
    const rr = risk > 0 ? reward / risk : 0;
    totalRisk += risk;
    totalReward += reward;

    return { symbol: trade.symbol, riskDollars: risk, rewardDollars: reward, rrRatio: rr };
  });

  return {
    trades: analysis,
    totalRisk,
    totalReward,
    portfolioRR: totalRisk > 0 ? totalReward / totalRisk : 0,
    totalAccountRisk: (totalRisk / accountSize) * 100
  };
}

// Example: 3 open positions on $100,000 account
// Total risk: $2,100 (2.1%), Total reward: $5,700
// Portfolio R:R: 1:2.71 - favorable aggregate setup`
    },
    {
      title: "Trailing Stop Optimization",
      description: "Dynamically recalculate risk/reward as trailing stops move to protect profits. Understanding how your R:R changes as a trade progresses helps decide when to tighten stops and when to let winners run.",
      example: `// Trailing stop R:R recalculation
function trailingStopRR(
  originalEntry: number,
  currentPrice: number,
  trailingStop: number,
  originalTarget: number
) {
  const currentRisk = Math.abs(currentPrice - trailingStop);
  const remainingReward = Math.abs(originalTarget - currentPrice);
  const lockedProfit = Math.abs(currentPrice - originalEntry);
  const newRR = currentRisk > 0 ? remainingReward / currentRisk : 0;

  return { currentRisk, remainingReward, lockedProfit, currentRR: newRR };
}

// Trade entered at $100, original SL $95, TP $115
// Price moved to $108, trail stop to $105
// currentRisk: $3.00, remainingReward: $7.00
// lockedProfit: $8.00, currentRR: 1:2.33
// Even if stopped out, locked in $5 profit per share`
    }
  ],

  howToUse: {
    title: "How to Use This Risk/Reward Calculator",
    content: `This tool calculates the risk-to-reward ratio for any trade setup across stocks, forex, crypto, futures, and other markets. Enter your entry price, stop loss, and take profit to see instant analysis including R:R ratio, breakeven win rate, and visual trade layout.

### Entering Trade Parameters

**Entry Price:** The price at which you plan to enter the trade. This can be the current market price for a market order, or a limit price for a pending order. All other calculations are relative to this price.

**Stop Loss Price:** The price at which you will exit to limit your loss. For long trades, the stop loss is placed below the entry price. For short trades, it is above. Your stop loss should be placed at a level that invalidates your trade thesis -- below support for longs, above resistance for shorts.

**Take Profit Price:** The target price where you plan to take profits. For long trades, this is above entry. For shorts, below entry. Set your take profit at realistic levels based on technical analysis: next resistance for longs, next support for shorts, or based on measured moves and chart patterns.

### Reading the Results

**R:R Ratio:** Displayed as 1:X where X is how many dollars of reward for each dollar of risk. A ratio of 1:2 means you gain $2 for every $1 risked. Higher is better, but must be realistic based on market structure.

**Risk Amount:** The dollar distance from entry to stop loss. This is the maximum you can lose per unit on the trade (excluding slippage and gaps).

**Reward Amount:** The dollar distance from entry to take profit. This is what you stand to gain per unit if the target is reached.

**Breakeven Win Rate:** The minimum win percentage needed for profitability at this R:R. Lower is better. A 33% breakeven win rate means you can lose 2 out of 3 trades and still break even.

### Using the Visualization

The horizontal bar chart shows your stop loss, entry, and take profit as vertical markers on a price axis. The red zone represents your risk (entry to stop loss) and the green zone represents your reward (entry to take profit). This gives you an intuitive visual sense of how much room you have on each side.

### Applying Presets

Use the preset buttons to quickly load common trade setups:
- **Scalp (1:1.5):** Tight stops, quick targets. Suitable for intraday momentum trades.
- **Swing (1:3):** Moderate stops, multi-day targets. Standard for daily chart setups.
- **Position (1:5):** Wide stops, large targets. For weekly/monthly chart position trades.

### Best Practices

- Always define your R:R BEFORE entering a trade
- Set a minimum R:R threshold (1:2 is common) and reject setups that do not meet it
- Combine R:R with position sizing: risk a fixed % of your account per trade (1-2% is standard)
- Re-evaluate your R:R if the market structure changes after entry
- Track your actual R:R outcomes versus planned to improve your trade selection over time`,
    steps: [
      {
        name: "Enter Trade Prices",
        text: "Input your planned entry price, stop loss level, and take profit target. The calculator works with any market: stocks, forex, crypto, futures, or commodities."
      },
      {
        name: "Review Risk/Reward Ratio",
        text: "See the calculated R:R ratio (e.g., 1:2.5), risk and reward amounts in dollars, and breakeven win rate. A ratio of 1:2 or higher is generally favorable."
      },
      {
        name: "Analyze the Visualization",
        text: "Use the horizontal bar chart to visually assess your trade setup. Red zone shows risk, green zone shows reward. Verify the stop loss and take profit levels align with support and resistance."
      },
      {
        name: "Make Your Trading Decision",
        text: "Use the analysis section to confirm trade direction, assess whether the R:R is favorable, and check if the breakeven win rate is achievable with your strategy. Reject trades that don't meet your minimum R:R threshold."
      }
    ]
  },

  faqs: [
    {
      question: "What is a good risk/reward ratio?",
      answer: "Most professional traders consider 1:2 the minimum acceptable ratio for swing trades, meaning you gain $2 for every $1 risked. At 1:2, you only need to win 33.3% of trades to break even. Day traders and scalpers may accept 1:1.5 due to higher win rates. Position traders often target 1:3 or higher. The key is that your actual win rate must exceed the breakeven win rate for your chosen R:R ratio. A 1:3 ratio with a 35% win rate is more profitable than a 1:1 ratio with a 55% win rate."
    },
    {
      question: "How is breakeven win rate calculated?",
      answer: "Breakeven win rate = 1 / (1 + R:R Ratio) x 100. At 1:1 R:R, breakeven is 50% (must win half your trades). At 1:2, it drops to 33.3% (win 1 in 3). At 1:3, only 25% (win 1 in 4). At 1:5, just 16.7% (win 1 in 6). This formula assumes equal position sizes across trades. Your actual win rate must exceed breakeven for profitability. The breakeven rate tells you the minimum performance threshold for your strategy to work."
    },
    {
      question: "Does risk/reward ratio apply to short trades?",
      answer: "Yes, the calculation works identically for both long and short trades. For a short trade, the entry is above the take profit and below the stop loss. Example: shorting at $100 with a stop loss at $105 and take profit at $88 gives risk = $5, reward = $12, R:R = 1:2.4. The calculator automatically detects the trade direction based on whether the take profit is above (long) or below (short) the entry price."
    },
    {
      question: "Should I always follow a strict R:R minimum?",
      answer: "Having a minimum R:R threshold is a core risk management discipline, but context matters. High-probability setups (earnings plays, breakouts at key levels) may justify a lower R:R like 1:1.5 if historical win rate is above 60%. Conversely, lower-probability trades (mean reversion, counter-trend) should demand higher R:R like 1:3+. The goal is positive expected value: (Win Rate x Average Win) > (Loss Rate x Average Loss). Track your actual results to calibrate your minimum threshold."
    },
    {
      question: "How does slippage affect risk/reward calculations?",
      answer: "Slippage occurs when your fill price differs from your intended price, typically during high volatility or gaps. If you plan to buy at $100 but get filled at $100.50, your actual risk increases and R:R decreases. To account for slippage: add a buffer to your stop loss calculation (e.g., plan for 0.1-0.5% slippage), use limit orders for entries when possible, avoid trading during extreme volatility, and use guaranteed stop losses offered by some brokers. The calculator shows theoretical R:R; actual results depend on execution quality."
    },
    {
      question: "Can I use this calculator for options trading?",
      answer: "The calculator works for the underlying price levels of an options trade. For defined-risk options strategies (buying calls/puts), your max risk is the premium paid, not the stop loss price. For spreads, risk and reward are defined by the spread width minus premium. You can still use entry/SL/TP on the underlying to plan when to enter and exit your options position, but the actual dollar risk should be calculated based on the option Greeks and premium, not just the stock price distance."
    },
    {
      question: "What is the relationship between R:R and position sizing?",
      answer: "Risk/reward and position sizing work together. First, define your R:R (entry, stop loss, take profit). Then, decide your account risk per trade (typically 1-2% of account value). Position size = Account Risk / Risk Per Unit. Example: $100,000 account, 1% risk = $1,000 risk budget. If stop loss is $5 away from entry, position size = $1,000 / $5 = 200 shares. This ensures no single trade can damage your account excessively, regardless of outcome."
    },
    {
      question: "Is my calculation data private?",
      answer: "Yes, completely. All risk/reward calculations run entirely in your browser using client-side JavaScript. No trade prices, stop loss levels, take profit targets, or calculated ratios are ever sent to a server, stored in a database, or logged anywhere. The tool works fully offline after initial page load. You can verify this by checking the Network tab in browser DevTools -- no outbound requests contain your trading data. Safe for evaluating any trade setup with full confidentiality."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All risk/reward calculations happen entirely in your browser using client-side JavaScript math. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math. Entry prices, stop losses, take profits, and all derived metrics are computed locally on your device.
- **No Server Uploads:** There are no backend servers involved in the calculation process. The tool works completely offline after the initial page load.
- **No Data Storage:** Trade parameters, ratios, and analysis results are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We do not track what prices you enter, what trade setups you evaluate, or any calculation-specific information.
- **Transparent & Auditable:** Open browser DevTools Network tab and verify: zero outbound requests contain your trading data.

Safe for evaluating confidential trade setups, pre-market analysis, strategy backtesting inputs, or any scenario where trading data privacy is essential. Use with full confidence.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Presets": "3 strategies",
    "Markets": "All markets",
    "Precision": "Full decimal",
    "Server Uploads": "0"
  }
};
