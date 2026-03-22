import type { ToolGuideContent } from "./types";

export const fibonacciGuideContent: ToolGuideContent = {
  toolName: "Fibonacci Retracement Calculator",
  toolPath: "/fibonacci-trading",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter the Swing High",
      description:
        "Input the highest price point of the move you want to analyze. This is the peak of the rally in an uptrend or the starting high of a downtrend.",
    },
    {
      title: "Enter the Swing Low",
      description:
        "Input the lowest price point of the move. This is the trough before the rally in an uptrend or the bottom of a downtrend.",
    },
    {
      title: "Select the Trend Direction",
      description:
        "Toggle between Uptrend and Downtrend. This determines whether retracement levels are calculated from high-to-low or low-to-high.",
    },
    {
      title: "Read Levels & Copy Prices",
      description:
        "View all retracement (23.6% – 100%) and extension (127.2% – 261.8%) levels on a visual price ladder. Click any level to copy its exact price to your clipboard.",
    },
  ],

  introduction: {
    title: "What Is Fibonacci Retracement?",
    content: `**Fibonacci retracement** is a technical analysis method that uses horizontal lines to indicate areas of support or resistance at the key Fibonacci ratios **before** the price continues in the original direction.

## The Fibonacci Sequence in Markets

The Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144…) produces ratios that appear throughout nature and, traders argue, in financial markets. The most important ratios for trading are:

| Ratio   | Origin |
|---------|--------|
| 23.6%   | Dividing a number by the number three places higher |
| 38.2%   | Dividing a number by the number two places higher |
| 50.0%   | Not a true Fibonacci ratio, but widely used |
| 61.8%   | The "golden ratio" — dividing a number by its successor |
| 78.6%   | Square root of 61.8% |

## How Retracements Work

After a significant price move, markets often **retrace** a portion of the move before resuming the trend. Fibonacci retracement levels predict where these pullbacks are likely to find support (in an uptrend) or resistance (in a downtrend).

### Calculation for an Uptrend Retracement

**Level = High − (High − Low) × Fibonacci Ratio**

For a downtrend, the formula inverts: **Level = Low + (High − Low) × Fibonacci Ratio**

## Extensions

Fibonacci extensions project levels **beyond** the original move to estimate where price might travel after the retracement completes. Common extension levels include 127.2%, 161.8%, 200%, and 261.8%.

## Practical Usage

Traders use Fibonacci levels to:
- Identify potential entry points on pullbacks
- Set stop losses just beyond key levels
- Define take-profit targets at extension levels
- Confirm signals from other indicators (RSI, MACD, volume)

The tool is **most effective** when combined with other forms of analysis and when levels align with structural support/resistance or moving averages — a concept known as **confluence**.`,
  },

  useCases: [
    {
      title: "Pullback Entry Points",
      description:
        "Identify optimal entry prices during trend pullbacks by watching for price to bounce off the 38.2%, 50%, or 61.8% retracement levels.",
    },
    {
      title: "Stop Loss Placement",
      description:
        "Place stop losses just beyond key Fibonacci levels to minimize risk while giving the trade room to breathe.",
    },
    {
      title: "Take Profit Targets",
      description:
        "Use extension levels (127.2%, 161.8%, 261.8%) to set realistic profit targets based on the measured move.",
    },
    {
      title: "Confluence Analysis",
      description:
        "Overlay Fibonacci levels on a chart to find areas where they align with moving averages, trendlines, or horizontal support/resistance.",
    },
    {
      title: "Swing Trade Planning",
      description:
        "Plan multi-day swing trades by mapping the entire structure from swing low to swing high with retracement and extension targets.",
    },
    {
      title: "Crypto & Forex Scalping",
      description:
        "Use Fibonacci levels on shorter timeframes to identify quick scalping opportunities in highly liquid markets.",
    },
  ],

  howToUse: {
    title: "How to Use the Fibonacci Retracement Calculator",
    content:
      "Follow these steps to calculate Fibonacci retracement and extension levels for any price move in any market.",
    steps: [
      {
        name: "Identify the swing points",
        text: "On your chart, find the significant swing high and swing low that define the move you want to analyze.",
      },
      {
        name: "Enter swing high and low",
        text: "Input the swing high and swing low prices into the calculator fields.",
      },
      {
        name: "Select trend direction",
        text: "Choose Uptrend if price moved from low to high (and you expect a pullback down), or Downtrend if price moved from high to low (and you expect a bounce up).",
      },
      {
        name: "Analyze levels",
        text: "Review the visual price ladder showing all retracement and extension levels. Click any level to copy its exact price value for use in your trading platform.",
      },
    ],
  },

  faqs: [
    {
      question: "Which Fibonacci level is the most reliable?",
      answer:
        "The 61.8% level (the golden ratio) and the 50% level are widely regarded as the most significant. However, reliability depends on context — levels that align with other support/resistance zones (confluence) are strongest.",
    },
    {
      question: "Does Fibonacci retracement work in all markets?",
      answer:
        "Fibonacci levels are used in stocks, forex, crypto, commodities, and indices. They tend to be more reliable in trending markets with high liquidity and clear swing points.",
    },
    {
      question: "Is the 50% level a real Fibonacci ratio?",
      answer:
        "No, 50% is not derived from the Fibonacci sequence. However, it is included because markets frequently retrace half of a move, and Dow Theory also highlights the 50% retracement as significant.",
    },
    {
      question: "How do I use extension levels?",
      answer:
        "Extension levels project where price might go after a retracement completes. For example, if price retraces to 61.8% and bounces, the 161.8% extension is a common profit target.",
    },
    {
      question: "Can I use this for downtrend analysis?",
      answer:
        "Yes. Toggle the direction to Downtrend and the calculator reverses the level calculations, placing retracement levels above the swing low as potential resistance zones.",
    },
    {
      question: "Why do some levels overlap with my chart's support zones?",
      answer:
        "When Fibonacci levels align with horizontal support/resistance, trendlines, or moving averages, it creates 'confluence' — a zone where multiple methods agree. These are the highest-probability trading levels.",
    },
    {
      question: "Is my data stored or sent anywhere?",
      answer:
        "No. All calculations run 100% in your browser. No prices or trade data are sent to any server.",
    },
  ],

  security: {
    title: "Privacy & Security",
    content: `**Your price data stays on your device.**

Fibonacci calculations are performed entirely in your browser using client-side JavaScript. No swing high/low prices, no chart data, and no trade parameters are transmitted to any external server.

- **100% client-side** — no API calls, no server processing
- **No data persistence** — nothing is saved between sessions
- **No analytics on inputs** — we don't track what prices you enter
- **Trader-grade privacy** — your analysis remains yours

This is critical for traders who consider their technical analysis and level selection to be a competitive advantage.`,
  },

  stats: {
    "Calculation Speed": "< 1ms",
    "Retracement Levels": "7",
    "Extension Levels": "4",
    "Data Sent to Server": "None",
  },
};
