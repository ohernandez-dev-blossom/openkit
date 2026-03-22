/**
 * Compound Growth Calculator Tool Guide Content
 * Comprehensive guide for compound growth projections and visualization
 */

import type { ToolGuideContent } from "./types";

export const compoundGrowthGuideContent: ToolGuideContent = {
  toolName: "Compound Growth Calculator",
  toolPath: "/compound-growth",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Initial Capital",
      description: "Type the starting amount you plan to invest or grow. This is your principal value, the baseline from which all compound growth is calculated. Supports any positive dollar amount from $100 to $10,000,000+."
    },
    {
      title: "Set Return Rate and Period",
      description: "Enter the periodic return rate as a percentage and choose your compounding frequency: daily, weekly, monthly, quarterly, or yearly. For stocks, 8-10% yearly is common. For crypto or trading, use the period that matches your strategy."
    },
    {
      title: "Configure Contributions and Duration",
      description: "Optionally add a recurring contribution amount per period and set the total number of compounding periods. The calculator projects your growth curve with and without contributions so you can see the impact of consistent investing."
    },
    {
      title: "Analyze the Interactive Chart",
      description: "Explore the SVG growth chart showing your portfolio trajectory over time. Hover over any point to see exact values. Compare multiple return rates on the same chart. Review milestone markers at 2x, 5x, and 10x your initial investment. Scroll down for the detailed period-by-period data table."
    }
  ],

  introduction: {
    title: "What is Compound Growth?",
    content: `Compound growth is the process by which an investment generates earnings that are themselves reinvested to generate additional earnings over time. Unlike simple interest, which applies only to the original principal, compound growth applies to both the principal and all accumulated returns. This exponential dynamic is often called the "eighth wonder of the world," and it forms the mathematical foundation of long-term wealth building, portfolio management, and financial planning.

Understanding compound growth is essential for anyone involved in investing, trading, retirement planning, or building financial models. The core formula, FV = PV * (1 + r)^n, describes how a present value (PV) grows to a future value (FV) at a periodic rate (r) over n periods. When recurring contributions are added, the formula extends to include a future value of annuity component: FV = PV * (1 + r)^n + C * [((1 + r)^n - 1) / r], where C is the contribution per period.

### Why Compound Growth Matters

**The power of time:** A $10,000 investment at 8% annual return grows to $21,589 in 10 years, $46,610 in 20 years, and $100,627 in 30 years. The first decade doubles your money, but the third decade adds over $54,000 in growth alone. The longer your money compounds, the more dramatic the acceleration becomes. This is why starting early is consistently the single most impactful financial decision.

**Contribution amplification:** Adding regular contributions to compound growth produces remarkable results. If you invest $10,000 initially and add $500 per month at 8% annual return (0.667% monthly), after 30 years your total contributions are $190,000 but your portfolio reaches approximately $835,000. The $645,000 difference is pure compound growth on both your principal and every contribution.

**Rate sensitivity:** Small differences in return rate compound dramatically over time. $10,000 over 30 years: at 6% it becomes $57,435, at 8% it reaches $100,627, and at 10% it grows to $174,494. That 4% spread produces a 3x difference in final value. This is why minimizing fees, optimizing asset allocation, and maintaining tax efficiency are critical for long-term investors.

### Compounding Frequency

The frequency at which returns compound affects the final result. Daily compounding at 8% annual rate yields slightly more than monthly compounding at the same rate, which yields more than annual compounding. The effective annual rate (EAR) captures this: EAR = (1 + r/n)^n - 1, where n is the compounding frequency per year.

### The Rule of 72

A quick estimation tool: divide 72 by the annual return rate to approximate the number of years required to double your investment. At 8%, doubling takes approximately 9 years (72 / 8 = 9). At 12%, approximately 6 years. This mental math shortcut is invaluable for quick comparisons.

### Applications Beyond Investing

Compound growth applies to population growth modeling, bacterial colony expansion, radioactive decay (negative compounding), debt accumulation, inflation impact analysis, and any system where growth feeds on itself. The mathematical model is universal, making this calculator useful across disciplines.

This calculator provides interactive visualization of compound growth trajectories, scenario comparison, milestone tracking, and detailed period-by-period breakdowns to help you make informed financial decisions.`
  },

  useCases: [
    {
      title: "Project Long-Term Investment Returns",
      description: "Model how an initial investment grows over 10, 20, or 30 years at various return rates. Compare conservative (5-6%), moderate (7-8%), and aggressive (10-12%) portfolios. Visualize the exponential curve to understand why patience is the most powerful investing tool.",
      example: `// Long-term projection:
// Initial: $50,000 at 8% annual for 30 years
// FV = 50000 * (1.08)^30 = $503,132
// With $1,000/month contributions:
// FV = 50000 * (1.08)^30 + 1000 * [((1.08)^30 - 1) / 0.08]
// FV = $503,132 + $1,223,459 = approximately $1,726,591`
    },
    {
      title: "Compare Trading Strategy Returns",
      description: "Evaluate different trading strategies by comparing their compound growth curves. A strategy returning 2% monthly vs 1.5% monthly seems close, but over 24 months: 2% compounds to 1.608x while 1.5% compounds to 1.430x. The chart reveals divergence over time.",
      example: `// Monthly compounding comparison:
// Strategy A: 2% monthly for 24 months
// FV = 10000 * (1.02)^24 = $16,084
// Strategy B: 1.5% monthly for 24 months
// FV = 10000 * (1.015)^24 = $14,295
// Difference: $1,789 (17.9% more from 0.5% better monthly)`
    },
    {
      title: "Plan Dollar-Cost Averaging Strategy",
      description: "Model the effect of consistent periodic investments. See how $500/month contributions compound over time and how they combine with your initial capital. The chart shows both lines (with and without contributions) to quantify the contribution impact.",
      example: `// DCA modeling:
// Initial: $10,000, Monthly contribution: $500
// 7% annual (0.583% monthly), 20 years
// Without contributions: $10,000 grows to $38,697
// With contributions: reaches approximately $298,000
// Contributions alone: $120,000 invested
// Growth on contributions: ~$168,000 in compound returns`
    },
    {
      title: "Estimate Retirement Savings Growth",
      description: "Project retirement portfolio growth with employer-matched contributions. Set initial savings, monthly contribution (including employer match), expected return rate, and years to retirement. Identify if you are on track to reach your retirement target.",
      example: `// Retirement projection:
// Age 30, retire at 65 = 35 years
// Current savings: $25,000
// Monthly: $750 (you) + $375 (employer match) = $1,125
// 7% annual return
// FV at 65: approximately $2,100,000
// Total contributed: $25,000 + ($1,125 * 420) = $497,500
// Compound growth: ~$1,600,000 in pure returns`
    },
    {
      title: "Analyze Debt Growth and Loan Costs",
      description: "Compound growth works against you with debt. Model how unpaid credit card balances grow at 20%+ APR. Visualize how minimum payments barely outpace compounding interest. Powerful motivation for debt payoff strategies.",
      example: `// Debt compounding (negative use case):
// $5,000 credit card balance at 22% APR
// Monthly rate: 1.833%
// After 1 year with no payments:
// FV = 5000 * (1.01833)^12 = $6,224
// $1,224 in interest (24.5% effective rate)
// After 3 years: $9,614 (balance nearly doubled)`
    },
    {
      title: "Model Inflation Impact on Purchasing Power",
      description: "Use negative effective returns to model how inflation erodes purchasing power. At 3% annual inflation, $100,000 today has the purchasing power of only $74,409 in 10 years. The chart powerfully visualizes this invisible wealth erosion.",
      example: `// Inflation erosion:
// $100,000 purchasing power at 3% inflation
// Real value after 10 years: 100000 / (1.03)^10 = $74,409
// After 20 years: $55,368
// After 30 years: $41,199
// Your money loses 59% of its purchasing power in 30 years`
    }
  ],

  howToUse: {
    title: "How to Use This Compound Growth Calculator",
    content: `This calculator projects compound growth with interactive visualization, scenario comparison, and detailed period-by-period analysis. All calculations run entirely in your browser with no data transmitted to servers.

### Configuring Your Growth Scenario

**Initial Capital:** Enter your starting investment amount. This is the present value (PV) in the compound growth formula. Can be any positive number. Common starting points: $1,000 for new investors, $10,000-$50,000 for established portfolios, $100,000+ for retirement modeling.

**Periodic Return Rate:** Enter the expected return rate as a percentage per compounding period. If compounding monthly with an 8% annual target, enter approximately 0.667% (8% / 12). If compounding yearly, enter 8%. The rate must match the selected compounding period.

**Compounding Period:** Choose how frequently returns are applied: daily (365x/year), weekly (52x/year), monthly (12x/year), quarterly (4x/year), or yearly (1x/year). Stock market returns typically use yearly. Trading strategies often use daily or monthly. Savings accounts may compound daily.

**Number of Periods:** How many compounding periods to project. For yearly compounding over 30 years, enter 30. For monthly compounding over 5 years, enter 60. The chart X-axis adapts to show your full timeline.

**Additional Contribution:** Optional recurring investment added each period. Enter $0 for pure compound growth modeling. Enter $500 for $500 added each period. The calculator shows both scenarios (with and without contributions) on the same chart for comparison.

### Reading the Growth Chart

The interactive SVG chart displays two growth curves, milestone markers, grid lines, and hover tooltips for precise value inspection. The amber/gold line shows growth with contributions, while the dashed line shows growth without contributions.

### Scenario Comparison

Enable up to two additional return rate scenarios to compare growth trajectories on the same chart. This is powerful for comparing conservative vs aggressive allocations, evaluating the long-term impact of fee differences, and stress-testing your plan against different market environments.

### Data Table

Below the chart, a scrollable table shows period-by-period details: beginning balance, contribution amount, growth amount, and ending balance. Use this for precise analysis or reference.`,
    steps: [
      {
        name: "Enter Initial Capital and Return Rate",
        text: "Type your starting investment amount and the expected periodic return rate. Choose the compounding frequency that matches your investment or trading strategy."
      },
      {
        name: "Set Duration and Contributions",
        text: "Enter the number of compounding periods and optionally add a recurring contribution amount. The calculator immediately projects your growth curve."
      },
      {
        name: "Explore the Interactive Chart",
        text: "Hover over the SVG chart to see exact values at each period. Look for milestone markers (2x, 5x, 10x) and compare the with-contributions vs without-contributions lines."
      },
      {
        name: "Compare Scenarios",
        text: "Add comparison return rates to visualize how different growth rates diverge over time. Toggle scenarios on and off to focus your analysis."
      },
      {
        name: "Review the Data Table",
        text: "Scroll through the period-by-period breakdown showing beginning balance, contribution, growth, and ending balance for detailed analysis and planning."
      }
    ]
  },

  faqs: [
    {
      question: "What is the compound growth formula used in this calculator?",
      answer: "The calculator uses FV = PV * (1 + r)^n for growth without contributions, and FV = PV * (1 + r)^n + C * [((1 + r)^n - 1) / r] when periodic contributions are included. PV is present value (initial capital), r is the periodic return rate as a decimal, n is the number of periods, and C is the contribution per period. All arithmetic is performed with JavaScript floating-point precision directly in your browser."
    },
    {
      question: "How do I convert an annual return rate to a monthly rate?",
      answer: "Divide the annual rate by 12 for a simple approximation. For example, 8% annual becomes approximately 0.667% monthly (8 / 12). For precise conversion accounting for compounding, use the formula: monthly rate = (1 + annual_rate)^(1/12) - 1. At 8% annual, the precise monthly rate is 0.6434%. The difference is small but compounds over long horizons. This calculator applies whatever rate you enter directly to the selected period."
    },
    {
      question: "What is the Rule of 72 and how accurate is it?",
      answer: "The Rule of 72 estimates the number of periods to double your investment by dividing 72 by the return rate percentage. At 8%, doubling takes approximately 72/8 = 9 years. At 6%, approximately 12 years. The rule is most accurate for rates between 6-10%. At very high rates (20%+) or very low rates (1-2%), accuracy decreases. The actual doubling formula is n = ln(2) / ln(1 + r), which this calculator uses for the precise estimate displayed alongside the Rule of 72 approximation."
    },
    {
      question: "How does compounding frequency affect final returns?",
      answer: "More frequent compounding produces slightly higher returns because earned interest starts compounding sooner. $10,000 at 8% for 10 years: annual compounding yields $21,589, monthly compounding yields $22,196, and daily compounding yields $22,255. The difference between monthly and daily compounding is small ($59 on $10,000 over 10 years), but the difference between annual and monthly is more notable ($607). For most investment scenarios, monthly is sufficient precision."
    },
    {
      question: "Can I use this calculator for trading strategy analysis?",
      answer: "Yes. Set the compounding period to match your trading timeframe (daily for day trading, weekly for swing trading, monthly for position trading). Enter your average return per period as the rate. Be conservative with estimates: a strategy that averages 0.5% daily sounds modest but compounds to 280% annually. The chart will clearly show whether projected growth is realistic. Remember that past performance does not guarantee future results and real trading involves drawdowns not captured by a fixed-rate model."
    },
    {
      question: "Why do the two chart lines diverge so dramatically over time?",
      answer: "The line with contributions diverges from the line without contributions because each contribution itself begins compounding from the moment it is added. Early contributions have the most impact because they compound for the longest time. A $500 monthly contribution in month 1 of a 30-year plan compounds for 360 months, while a contribution in month 359 only compounds for 1 month. This is why the gap between the two lines accelerates over time."
    },
    {
      question: "How should I interpret the milestone markers on the chart?",
      answer: "Milestone markers appear when your portfolio reaches 2x, 5x, and 10x your initial capital. The 2x marker shows when your money doubles (closely related to the Rule of 72). The 5x marker is a strong long-term growth indicator. The 10x marker represents truly transformative compounding. Note that with contributions, reaching these milestones counts total portfolio value including contributions, not just growth on the original principal."
    },
    {
      question: "Is my financial data private when using this calculator?",
      answer: "Yes, completely. All compound growth calculations run entirely in your browser using client-side JavaScript. No investment amounts, return rates, contribution values, or calculated projections are transmitted to any server, logged, stored, or tracked. The tool works fully offline after the initial page load. You can verify this by checking the Network tab in your browser DevTools: zero outbound requests contain your financial data. Safe for modeling confidential investment strategies or personal financial planning."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All compound growth calculations happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All growth projections, chart rendering, and data table generation use browser-native JavaScript math. Computations happen locally on your device.
- **No Server Uploads:** There are no backend servers processing your financial data. The calculator works completely offline after the initial page load.
- **No Data Storage:** Investment amounts, return rates, contribution values, and projected results are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We do not track what amounts you calculate, what return rates you model, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab to verify zero outbound requests containing your financial data.

Safe for modeling confidential investment strategies, proprietary trading analysis, retirement planning, or any sensitive financial projections. Use with complete confidence.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Compounding Periods": "5 types",
    "Scenario Comparison": "Up to 3",
    "Chart Interaction": "Full hover",
    "Data Precision": "Full decimal",
    "Server Uploads": "0"
  }
};
