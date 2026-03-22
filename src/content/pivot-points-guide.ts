/**
 * Pivot Points Calculator Tool Guide Content
 * Comprehensive guide for calculating support and resistance levels from OHLC data
 */

import type { ToolGuideContent } from "./types";

export const pivotPointsGuideContent: ToolGuideContent = {
  toolName: "Pivot Points Calculator",
  toolPath: "/pivot-points",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter OHLC Data",
      description: "Input the Open, High, Low, and Close prices from the previous trading session. These four values form the basis for all pivot point calculations. Use daily OHLC for day trading or weekly OHLC for swing trading."
    },
    {
      title: "Select Calculation Method",
      description: "Choose from five methods: Standard (classic floor trader formula), Fibonacci (uses retracement ratios), Camarilla (tight intraday levels), Woodie (close-weighted), or DeMark (directional bias). Each method produces different support and resistance levels suited to different trading styles."
    },
    {
      title: "Analyze Pivot Levels",
      description: "Review the color-coded table of resistance (R1-R3) and support (S1-S3) levels with the central pivot point. Red levels indicate resistance where price may reverse downward, green levels indicate support where price may bounce upward, and the blue pivot is the session's equilibrium point."
    },
    {
      title: "Apply to Your Trading",
      description: "Use pivot levels as entry/exit targets, stop-loss placement zones, and trend bias indicators. Price above the pivot suggests bullish bias; below suggests bearish. Combine with other technical indicators for confirmation before executing trades."
    }
  ],

  introduction: {
    title: "What are Pivot Points?",
    content: `Pivot points are a widely used technical analysis indicator that calculates potential support and resistance levels from the previous period's Open, High, Low, and Close (OHLC) prices. Originally developed by floor traders in equity and commodity pits, pivot points remain one of the most reliable tools for identifying intraday price levels where reversals, breakouts, or consolidation may occur.

The central pivot point (PP) represents the market's equilibrium price for the current session based on the prior session's activity. It acts as a baseline from which traders derive multiple support levels (S1, S2, S3) below the pivot and resistance levels (R1, R2, R3) above it. When price trades above the pivot, the market bias is considered bullish; when below, it is bearish.

### The Five Major Calculation Methods

**Standard (Floor Trader) Pivot Points** are the original and most widely used method. The pivot is calculated as the simple average of High, Low, and Close. Support and resistance levels are derived through symmetric formulas using the pivot and prior range. Standard pivots work well across all markets and timeframes, making them the default choice for most traders.

**Fibonacci Pivot Points** apply Fibonacci retracement ratios (0.382, 0.618, 1.000) to the prior session's range. Because Fibonacci ratios are rooted in naturally occurring mathematical relationships that appear frequently in financial markets, these pivots often align with other Fibonacci-based tools like retracement and extension levels. Fibonacci pivots are popular among forex and futures traders who already incorporate Fibonacci analysis into their methodology.

**Camarilla Pivot Points** produce tighter, more clustered levels around the previous close rather than the pivot. Developed by Nick Scott in 1989, Camarilla pivots use multipliers of 1.1/12, 1.1/6, and 1.1/4 applied to the prior range. The resulting levels are closer to the current price, making Camarilla pivots ideal for scalping and short-term intraday trading where traders need precise, nearby support and resistance zones.

**Woodie Pivot Points** give extra weight to the closing price by using the formula (H + L + 2C) / 4 instead of the standard (H + L + C) / 3. This close-weighted approach makes Woodie pivots more responsive to the most recent price action, which benefits traders who believe the close is the most important price of the session. Woodie pivots are especially useful in trending markets where the close reflects end-of-session sentiment.

**DeMark Pivot Points** are unique because they incorporate the relationship between the open and close to determine directional bias. If the close is below the open (bearish candle), the formula weights the low more heavily. If the close is above the open (bullish candle), the high gets more weight. DeMark pivots only produce one support and one resistance level (S1 and R1), making them simpler but directionally aware. They are favored by traders who want pivot levels that reflect the underlying bullish or bearish character of the prior session.

### How Traders Use Pivot Points in Practice

A day trader monitoring the S&P 500 might enter the prior session's OHLC (Open: 5800, High: 5880, Low: 5750, Close: 5850) to generate Standard pivot levels. If the market opens above the pivot at 5826.67, the trader has a bullish bias and looks for long entries on pullbacks to the pivot, with R1 (5903.33) and R2 (5956.67) as profit targets. Conversely, a break below the pivot would shift the bias bearish, with S1 (5773.33) and S2 (5696.67) as downside targets.

Forex scalpers often prefer Camarilla pivots because the tighter levels provide more actionable entry and exit points for quick trades. A EUR/USD trader with prior OHLC of 1.0850/1.0920/1.0810/1.0880 would see Camarilla S1 and R1 just a few pips from the close, perfect for setting tight stop-losses and take-profit orders on 5-minute charts.

Pivot points are most effective when combined with other forms of analysis: volume confirmation, candlestick patterns at pivot levels, moving average confluence, and RSI divergence at support or resistance. No single indicator should be used in isolation, and pivot points are no exception. Their value lies in identifying high-probability price zones where the market is likely to react.`
  },

  useCases: [
    {
      title: "Intraday Trading & Day Trading",
      description: "Day traders use daily pivot points to identify entry and exit levels for trades within a single session. The central pivot establishes directional bias (bullish above, bearish below), while S1/R1 serve as initial targets and S2/R2 as extended targets. Floor traders originated this technique and it remains the backbone of professional intraday analysis.",
      example: `// Standard pivot for day trading the S&P 500
// Prior session: O=5800, H=5880, L=5750, C=5850
PP = (5880 + 5750 + 5850) / 3 = 5826.67

// Bullish scenario (price opens above PP):
// - Enter long on pullback to PP (5826.67)
// - Target R1: 5903.33
// - Stop-loss below S1: 5773.33`
    },
    {
      title: "Swing Trading with Weekly Pivots",
      description: "Swing traders calculate pivot points from weekly OHLC data to identify multi-day support and resistance zones. Weekly pivots provide broader levels that hold significance over several sessions, helping traders plan entries on Monday and manage positions through Friday. Fibonacci pivots are especially popular for swing trading due to their alignment with retracement levels.",
      example: `// Weekly Fibonacci pivots for swing trading
// Prior week: O=4200, H=4350, L=4150, C=4300
PP = (4350 + 4150 + 4300) / 3 = 4266.67
Range = 4350 - 4150 = 200

R1 = 4266.67 + 0.382 * 200 = 4343.07
S1 = 4266.67 - 0.382 * 200 = 4190.27`
    },
    {
      title: "Forex Scalping with Camarilla Pivots",
      description: "Forex scalpers prefer Camarilla pivot points because the levels cluster tightly around the previous close, providing precise nearby support and resistance zones ideal for quick entries and exits. The close-based calculations make Camarilla pivots especially responsive on 1-minute to 15-minute charts where traders need actionable levels within a narrow range.",
      example: `// Camarilla pivots for EUR/USD scalping
// Prior session: O=1.0850, H=1.0920, L=1.0810, C=1.0880
R1 = 1.0880 + 1.1 * 0.0110 / 12 = 1.0890
S1 = 1.0880 - 1.1 * 0.0110 / 12 = 1.0870
// Tight levels = small stops = better risk/reward`
    },
    {
      title: "Identifying Breakout Zones",
      description: "When price approaches R3 or S3 levels, it often signals a strong trend that may continue beyond normal support/resistance. Traders watch for breakouts above R3 (bullish) or below S3 (bearish) as signals to enter trend-following positions. Volume confirmation at these levels increases the probability of a sustained move.",
      example: `// Breakout identification using Standard pivots
// If price breaks above R2 with volume:
// - Strong bullish signal, trend continues
// - R3 becomes the next target
// - Use R2 as new support`
    },
    {
      title: "Comparing Methods for Confluence",
      description: "Different pivot methods suit different market conditions and trading styles. By calculating all five methods simultaneously, traders can identify confluence zones where multiple methods agree on a support or resistance level. These confluence areas represent the strongest price zones and offer the highest probability setups.",
      example: `// Method comparison for the same OHLC data
// Standard R1: 106.33, DeMark R1: 106.00
// Confluence near 106 = Strong resistance zone`
    },
    {
      title: "DeMark Directional Bias Analysis",
      description: "DeMark pivot points uniquely incorporate the open-close relationship to establish directional bias. When the prior session closed above its open (bullish candle), DeMark weights resistance higher. When it closed below (bearish candle), support gets more weight. This makes DeMark pivots ideal for traders who want levels that reflect the market's underlying momentum direction.",
      example: `// DeMark with bullish prior session (Close > Open)
// X = 2*H + L + C = 2*105 + 95 + 102 = 407
// PP = 407/4 = 101.75
// R1 = 407/2 - 95 = 108.50
// S1 = 407/2 - 105 = 98.50`
    }
  ],

  howToUse: {
    title: "How to Use This Pivot Points Calculator",
    content: `This tool calculates pivot points, support levels, and resistance levels from OHLC (Open, High, Low, Close) price data. It supports five industry-standard calculation methods and provides a color-coded visual display of all levels.

### Entering OHLC Data

**Open:** The opening price of the previous trading session. For daily pivots, use the prior day's open. For weekly pivots, use the prior week's open. Example: If yesterday the market opened at $5,800, enter 5800.

**High:** The highest price reached during the previous session. This represents the maximum buying pressure achieved. Example: Yesterday's high was $5,880.

**Low:** The lowest price reached during the previous session. This represents the maximum selling pressure experienced. Example: Yesterday's low was $5,750.

**Close:** The final price at the end of the previous session. The close is considered the most important price because it reflects final consensus. Example: Yesterday's close was $5,850.

### Choosing a Calculation Method

**Standard:** Best all-around choice. Works across stocks, forex, futures, and crypto. Use this if you are new to pivot points or want a reliable default.

**Fibonacci:** Best for traders already using Fibonacci retracement/extension tools. Levels align naturally with other Fibonacci-based analysis, creating confluence.

**Camarilla:** Best for scalpers and very short-term traders. Produces tighter levels closer to the close, ideal for small moves and tight stops.

**Woodie:** Best for traders who emphasize the close price. Gives double weight to the close, making levels more responsive to end-of-session sentiment.

**DeMark:** Best for directional traders. Adjusts levels based on whether the prior candle was bullish or bearish. Only produces R1 and S1 (no R2/R3/S2/S3).

### Reading the Results Table

The color-coded table displays all calculated levels:

- **Red rows (R1, R2, R3):** Resistance levels where price may encounter selling pressure and reverse downward. R3 is the strongest (farthest) resistance.
- **Blue row (PP):** The central pivot point, representing equilibrium. Price above PP = bullish bias; below PP = bearish bias.
- **Green rows (S1, S2, S3):** Support levels where price may find buying interest and bounce upward. S3 is the strongest (farthest) support.
- **Distance column:** Shows how far each level is from the current close price, helping you assess proximity to key levels.

### Using Quick Presets

Click preset buttons to load sample OHLC data for common instruments:
- **S&P 500:** Representative US equity index data
- **Bitcoin:** Cryptocurrency market data
- **EUR/USD:** Forex major pair data

These presets demonstrate how pivot levels scale across different price ranges and asset classes.

### Practical Trading Application

**Trend identification:** If the market opens above the pivot, look for buying opportunities on dips. If below, look for selling opportunities on rallies.

**Entry points:** Enter long positions near support levels (S1, S2) with stops below the next support. Enter short positions near resistance levels (R1, R2) with stops above the next resistance.

**Profit targets:** Use the next pivot level as your take-profit target. For example, enter long at S1 with a target of PP, or enter long at PP with a target of R1.

**Stop-loss placement:** Place stops just beyond the next support/resistance level. This gives your trade room to breathe while limiting risk if the level breaks.

**Confluence:** When a pivot level coincides with other technical indicators (moving averages, Fibonacci retracements, trendlines), that level becomes significantly more reliable.`,
    steps: [
      {
        name: "Enter OHLC Price Data",
        text: "Input the Open, High, Low, and Close prices from the previous trading session. Use daily data for intraday trading or weekly data for swing trading."
      },
      {
        name: "Select a Pivot Method",
        text: "Choose from Standard, Fibonacci, Camarilla, Woodie, or DeMark methods. Standard is recommended for beginners; Camarilla for scalpers; DeMark for directional bias."
      },
      {
        name: "Review Calculated Levels",
        text: "Analyze the color-coded results table showing resistance (red), pivot (blue), and support (green) levels with distance from the close price."
      },
      {
        name: "Apply to Trading Decisions",
        text: "Use pivot levels for entry/exit targets, stop-loss placement, and trend bias. Price above the pivot suggests bullish bias; below suggests bearish."
      }
    ]
  },

  faqs: [
    {
      question: "What are pivot points and how do they work?",
      answer: "Pivot points are technical analysis indicators that calculate potential support and resistance levels from a prior period's Open, High, Low, and Close prices. The central pivot point (PP) represents market equilibrium. Levels above (R1, R2, R3) are resistance zones where price may reverse downward, and levels below (S1, S2, S3) are support zones where price may bounce upward. Originally developed by floor traders in commodity pits, pivot points remain one of the most widely used tools in professional trading because they are objective, easy to calculate, and applicable across all markets and timeframes."
    },
    {
      question: "Which pivot point method is best for trading?",
      answer: "The best method depends on your trading style. Standard (Floor Trader) pivots are the most popular and work well across all markets, making them the best default choice. Fibonacci pivots are ideal if you already use Fibonacci retracements in your analysis, as the levels will create natural confluence. Camarilla pivots produce tighter levels close to the prior close, making them best for scalping and short-term intraday trades. Woodie pivots weight the close heavily, benefiting traders in trending markets. DeMark pivots factor in the open-close relationship for directional bias but only produce one support and one resistance level. Many professional traders calculate multiple methods and look for confluence zones where two or more methods agree."
    },
    {
      question: "How do I use pivot points for day trading?",
      answer: "For day trading, calculate daily pivots using the previous session's OHLC data. At market open, check where price is relative to the pivot: above PP is bullish, below is bearish. In a bullish scenario, look for long entries on pullbacks to the pivot or S1, with targets at R1 and R2. In a bearish scenario, look for short entries on rallies to the pivot or R1, with targets at S1 and S2. Place stop-losses just beyond the next level (e.g., stop below S1 if entering long at the pivot). The strongest trades occur when pivot levels align with other indicators like volume spikes, candlestick patterns, or moving averages. Avoid trading directly at pivot levels without confirmation."
    },
    {
      question: "What is the difference between Standard and Fibonacci pivot points?",
      answer: "Standard pivots calculate support and resistance using fixed arithmetic formulas (R1 = 2*PP - Low, etc.), producing evenly spaced levels. Fibonacci pivots use the same PP formula but apply Fibonacci ratios (0.382, 0.618, 1.000) to the prior range for support and resistance levels. The key difference is spacing: Fibonacci R1 (at 38.2% of range) is typically closer to the pivot than Standard R1, while Fibonacci R3 (at 100% of range) equals the full prior range extension. Fibonacci pivots are preferred by traders who use Fibonacci retracement analysis because the levels naturally align, creating confluence. Standard pivots are preferred for their simplicity and wider adoption across trading platforms."
    },
    {
      question: "How accurate are pivot points for predicting price movement?",
      answer: "Pivot points are not predictive in the strict sense; they identify statistically significant price zones where the market is likely to react. Studies and decades of trading practice show that price frequently tests and reacts at pivot levels, particularly the central pivot and the first support/resistance levels (S1, R1). Accuracy improves significantly when pivots are combined with other analysis: volume confirmation (strong volume at a pivot level increases reliability), candlestick patterns (a hammer at S1 strengthens the support signal), moving average confluence (when a pivot aligns with the 200-period MA), and market context (trending vs ranging conditions). No technical indicator is accurate in isolation; pivot points are best used as one component of a comprehensive trading plan."
    },
    {
      question: "What is the DeMark pivot point and when should I use it?",
      answer: "The DeMark pivot point is unique because it uses the relationship between the Open and Close to adjust its calculation. If the close is below the open (bearish candle), the formula weights the low more heavily (X = H + 2L + C). If the close is above the open (bullish candle), the high gets more weight (X = 2H + L + C). If they are equal, both high and low receive equal weight. DeMark only produces one support (S1) and one resistance (R1) level, not the three levels of other methods. Use DeMark when you want pivot levels that reflect the directional character of the prior session. It is most useful in trending markets where the open-close relationship carries meaningful information about momentum."
    },
    {
      question: "Can I use pivot points for forex, crypto, and stocks?",
      answer: "Yes, pivot points work across all financial markets including forex, cryptocurrency, stocks, futures, commodities, and indices. The mathematical formulas are universal. For forex, use the New York close (5:00 PM EST) as the session close for daily pivots. For crypto markets that trade 24/7, use midnight UTC as the daily close. For stocks, use the official market close price. The principles are identical regardless of market: the OHLC data represents the prior period's price action, and the calculated levels identify zones where the market may react. Forex and futures traders use pivots most frequently because of the clearly defined daily sessions, but stock and crypto traders benefit equally from the analysis."
    },
    {
      question: "Is my OHLC data kept private when using this calculator?",
      answer: "Yes, all pivot point calculations happen entirely in your browser using client-side JavaScript. No OHLC prices, calculated levels, or any trading data is transmitted to servers, logged, or stored. The tool works completely offline after the page loads. No network requests contain your price data. This is especially important for traders who use proprietary data sources or who do not want their trading analysis observable by third parties. You can verify this by inspecting the browser DevTools Network tab during calculation - there are zero outbound requests with your data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All pivot point calculations happen entirely in your browser using client-side JavaScript math. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math operations and standard pivot point formulas. Computations happen locally on your device.
- **No Server Uploads:** We don't have backend servers to process pivot calculations. The tool works completely offline after page load.
- **No Data Storage:** OHLC prices, calculated pivot levels, and method selections are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what prices you enter, what methods you select, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your trading data.

Safe for calculating pivot points using proprietary price data, confidential trading analysis, or any OHLC data you prefer to keep private. Use with full confidence for all your technical analysis needs.`
  },

  stats: {
    "Methods": "5 types",
    "Levels": "7 per method",
    "Markets": "All markets",
    "Precision": "Full decimal",
    "Server Uploads": "0"
  }
};
