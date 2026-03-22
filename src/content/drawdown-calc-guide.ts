import type { ToolGuideContent } from "./types";

export const drawdownCalcGuideContent: ToolGuideContent = {
  toolName: "Drawdown & Recovery Calculator",
  toolPath: "/drawdown-calc",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Starting Balance",
      description:
        "Input the peak account balance — the highest value your account reached before the drawdown began.",
    },
    {
      title: "Set the Drawdown Percentage",
      description:
        "Use the slider or type a percentage to specify how much of the account has been lost. The current balance updates automatically.",
    },
    {
      title: "See the Recovery Required",
      description:
        "Instantly view the percentage gain needed to return to your original balance. Notice how recovery grows exponentially as drawdown increases.",
    },
    {
      title: "Study the Scenario Table",
      description:
        "Review the full table showing drawdown vs. recovery needed from 10% to 90%. This illustrates why capital preservation is paramount.",
    },
  ],

  introduction: {
    title: "What Is a Drawdown?",
    content: `A **drawdown** is the decline from a peak equity value to a subsequent trough, expressed as a percentage. It is the most common measure of **risk experienced** in a trading account or investment portfolio.

## The Asymmetry of Losses

The most important concept this calculator illustrates is the **asymmetry between losses and recovery**:

| Drawdown | Recovery Needed |
|----------|----------------|
| 10%      | 11.1%          |
| 20%      | 25.0%          |
| 30%      | 42.9%          |
| 50%      | 100.0%         |
| 75%      | 300.0%         |
| 90%      | 900.0%         |

A 50% loss requires a **100% gain** just to break even. A 90% loss requires a **900% gain**. This is why professional traders obsess over risk management and maximum drawdown limits.

## The Recovery Formula

**Recovery % = (1 / (1 − Drawdown/100) − 1) × 100**

This formula calculates the exact percentage gain needed from the current (reduced) balance to return to the original peak balance.

## Why Drawdown Matters

- **Psychological impact** — large drawdowns cause emotional decision-making, leading to further losses
- **Time to recovery** — at a consistent 10% annual return, a 50% drawdown takes ~7 years to recover
- **Fund management** — institutional funds often have maximum drawdown thresholds (e.g., 20%) that trigger risk reduction
- **Compounding damage** — drawdowns don't just cost money, they destroy the base from which future compounding works

## The Recovery Mountain

As drawdown increases, the recovery required doesn't just grow linearly — it grows **exponentially**. Visualized, this creates a steep "recovery mountain" that becomes nearly impossible to climb beyond 60-70% drawdown. This is why the golden rule of trading is: **protect your capital first, grow it second**.

Understanding this asymmetry fundamentally changes how traders approach risk. It shifts the focus from "how much can I make?" to "how much can I afford to lose?" — a mindset that separates amateurs from professionals.`,
  },

  useCases: [
    {
      title: "Risk Management Planning",
      description:
        "Set maximum acceptable drawdown limits for your trading strategy and understand the implications of breaching those limits.",
    },
    {
      title: "Strategy Evaluation",
      description:
        "Compare different trading strategies by their maximum historical drawdown and the recovery time required.",
    },
    {
      title: "Investor Education",
      description:
        "Teach new traders about the asymmetry of losses and why capital preservation is more important than maximizing returns.",
    },
    {
      title: "Portfolio Stress Testing",
      description:
        "Model worst-case scenarios to understand what happens to your portfolio if it experiences a 30%, 50%, or 70% decline.",
    },
    {
      title: "Fund Manager Reporting",
      description:
        "Calculate drawdown metrics for investor reports and risk disclosures, including peak-to-trough decline and recovery requirements.",
    },
    {
      title: "Position Sizing Context",
      description:
        "Use drawdown awareness to inform position sizing decisions — understanding that a string of losses compounds faster than most expect.",
    },
  ],

  howToUse: {
    title: "How to Use the Drawdown & Recovery Calculator",
    content:
      "Follow these steps to understand the impact of a drawdown on your trading account and the recovery required.",
    steps: [
      {
        name: "Enter starting balance",
        text: "Input the peak balance of your account — the highest value before the drawdown started.",
      },
      {
        name: "Set drawdown percentage",
        text: "Use the slider to select your current drawdown percentage, or type it directly. The current balance field updates automatically.",
      },
      {
        name: "Read recovery needed",
        text: "The calculator shows the exact percentage gain required from your current balance to return to the peak. Note how this number grows exponentially.",
      },
      {
        name: "Study the scenario table",
        text: "Review the table of standard drawdown scenarios (10% through 90%) to build intuition about the loss-recovery asymmetry. Use this as a reference for setting risk limits.",
      },
    ],
  },

  faqs: [
    {
      question: "Why does a 50% loss require a 100% gain to recover?",
      answer:
        "If you have $10,000 and lose 50%, you have $5,000. To get back to $10,000, you need to gain $5,000 — which is 100% of your current $5,000 balance. The recovery is calculated from the reduced base, not the original.",
    },
    {
      question: "What is a safe maximum drawdown limit?",
      answer:
        "Most professional traders set a maximum drawdown limit of 10–20%. Hedge funds often have hard limits of 15–25%. Beyond 30%, the recovery becomes psychologically and mathematically very challenging.",
    },
    {
      question: "How long does recovery typically take?",
      answer:
        "It depends on your average return rate. At 10% annual returns, a 20% drawdown takes about 2.3 years to recover. A 50% drawdown takes about 7.3 years. This is why time is a hidden cost of drawdowns.",
    },
    {
      question: "Does this account for compounding during recovery?",
      answer:
        "The recovery percentage shown is the total return needed, not annualized. Compounding during recovery helps, but the total percentage gain required remains the same regardless of how long it takes.",
    },
    {
      question: "Can I use this for investment portfolios, not just trading?",
      answer:
        "Absolutely. The drawdown-recovery math applies to any financial account — stock portfolios, retirement accounts, crypto wallets, or fund NAVs. The asymmetry is universal.",
    },
    {
      question: "What is the 'recovery mountain' visualization?",
      answer:
        "It is a visual chart showing how the recovery percentage needed rises exponentially as drawdown increases. The curve becomes nearly vertical beyond 70-80%, illustrating why large drawdowns are so devastating.",
    },
    {
      question: "Is my financial data private?",
      answer:
        "Yes. All calculations run 100% in your browser. No account balances, drawdown data, or any other information is sent to any server.",
    },
    {
      question: "Why is capital preservation the #1 rule of trading?",
      answer:
        "Because of the asymmetry this calculator demonstrates. It is mathematically easier to avoid a 30% loss than to recover from one (which requires a 42.9% gain). Protecting capital preserves the base for future compounding.",
    },
  ],

  security: {
    title: "Privacy & Security",
    content: `**Your financial data is 100% private.**

All drawdown and recovery calculations are performed locally in your browser. No account balances, drawdown percentages, or any financial information is transmitted to external servers.

- **Client-side only** — no API calls, no server processing
- **No data persistence** — nothing is saved between visits
- **No tracking** — we don't monitor what numbers you enter
- **Financial privacy** — your account balance and performance data remain strictly confidential

For traders and fund managers who consider drawdown metrics sensitive, this tool ensures complete privacy.`,
  },

  stats: {
    "Calculation Speed": "< 1ms",
    "Scenario Levels": "9",
    "Drawdown Range": "0% – 99%",
    "Data Sent to Server": "None",
  },
};
