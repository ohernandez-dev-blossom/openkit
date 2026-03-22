/**
 * Kelly Criterion Calculator Tool Guide Content
 * Comprehensive guide for optimal position sizing using the Kelly Criterion
 */

import type { ToolGuideContent } from "./types";

export const kellyGuideContent: ToolGuideContent = {
  toolName: "Kelly Criterion Calculator",
  toolPath: "/kelly-criterion",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Win Rate",
      description: "Input your historical win rate as a percentage (0-100%). This is the proportion of your trades or bets that result in a profit. For example, if 55 out of 100 trades are profitable, enter 55%. Accuracy here is critical since the Kelly formula is highly sensitive to win rate estimates."
    },
    {
      title: "Set Average Win and Loss Amounts",
      description: "Enter the average dollar amount you gain on winning trades and the average dollar amount you lose on losing trades. These values determine your win/loss ratio (the 'b' in the Kelly formula). For example, if you average $150 on wins and $100 on losses, your ratio is 1.5:1."
    },
    {
      title: "Enter Your Account Balance",
      description: "Provide your total available capital or bankroll. The calculator uses this to convert Kelly percentages into concrete dollar amounts for position sizing. This helps you see exactly how much to risk on your next trade or bet based on your edge."
    },
    {
      title: "Review Kelly Fractions and Growth Simulation",
      description: "Examine the Full Kelly, Half Kelly, and Quarter Kelly recommendations. The visual gauge shows where your sizing falls across conservative to aggressive zones. Review the expected growth simulation to understand how different Kelly fractions affect long-term compounding and drawdown risk."
    }
  ],

  introduction: {
    title: "What is the Kelly Criterion?",
    content: `The Kelly Criterion is a mathematical formula for optimal bet sizing developed by John L. Kelly Jr. at Bell Labs in 1956. Originally published in the Bell System Technical Journal under the title "A New Interpretation of Information Rate," Kelly's work addressed the problem of how a gambler with inside information on horse races (transmitted over a noisy telephone line) should size their bets to maximize the long-term growth rate of their bankroll. The formula emerged from information theory, building directly on Claude Shannon's foundational work on communication channels.

### The Mathematical Foundation

The Kelly Criterion formula is elegantly simple:

**f* = (bp - q) / b**

Where:
- **f*** = the optimal fraction of your bankroll to wager
- **b** = the odds received on the bet (net profit per dollar wagered, equivalent to average win / average loss)
- **p** = the probability of winning
- **q** = the probability of losing (1 - p)

An equivalent formulation used widely in trading is: **f* = p - (q / b)**, which can be expressed as **f* = p - ((1 - p) / (avgWin / avgLoss))**. This version directly shows that the Kelly fraction equals the win probability minus the loss probability adjusted by the payoff ratio.

### Why Kelly Matters for Traders and Investors

The Kelly Criterion is the only sizing strategy that provably maximizes the geometric growth rate of capital over time. This is not a claim about any single bet. It is a theorem about the long-run compounding behavior of repeated wagers with a positive edge. Using Full Kelly, a bettor will almost surely end up with more money than any other strategy after a sufficiently long sequence of bets.

However, Full Kelly comes with significant volatility. The standard deviation of returns under Full Kelly is substantial, and drawdowns can be severe. In practice, most professional traders and gamblers use fractional Kelly. Half Kelly retains approximately 75% of the growth rate but cuts variance roughly in half. Quarter Kelly sacrifices more growth but produces far smoother equity curves.

### From Bell Labs to Wall Street

After Kelly published his paper, the formula was quickly adopted by gamblers and then by investors. Edward O. Thorp, a mathematics professor who developed card-counting strategies for blackjack, was one of the first to apply Kelly sizing systematically. Thorp later founded Princeton Newport Partners, one of the most successful quantitative hedge funds of its era, where Kelly-based position sizing was central to their risk management.

Today, the Kelly Criterion influences portfolio construction at quantitative firms, sports betting syndicates, poker professionals, and individual retail traders. It provides a rigorous, mathematically grounded answer to the question every trader faces: "How much of my capital should I risk on this opportunity?"

### Key Assumptions and Limitations

The Kelly Criterion assumes: (1) you have an accurate estimate of your win probability and payoff ratio, (2) outcomes are independent, (3) you can bet any fractional amount, and (4) your edge remains constant over time. In practice, none of these hold perfectly. Estimation error in win rate or payoff ratio can lead to significant over-betting, which is why fractional Kelly (Half or Quarter) is strongly recommended as a margin of safety.

### Expected Value and Kelly

A positive Kelly fraction requires positive expected value. The expected value per trade is calculated as: EV = (p x avgWin) - (q x avgLoss). If EV is negative, the Kelly fraction will be negative, meaning you have no edge and should not bet. The Kelly Criterion goes beyond expected value by optimizing for geometric growth rather than arithmetic gain, accounting for the asymmetric impact of losses on compounding capital.`
  },

  useCases: [
    {
      title: "Stock and Options Position Sizing",
      description: "Determine optimal position size for equity and options trades based on historical win rate and risk/reward ratio. Avoid over-concentrating in a single position while maximizing long-term portfolio growth. Half Kelly is the standard recommendation for equity traders due to estimation uncertainty."
    },
    {
      title: "Sports Betting Bankroll Management",
      description: "Calculate optimal stake sizes for sports wagers where you have identified value (positive expected value). Convert subjective probability estimates into precise bet amounts. Critical for professional bettors managing bankrolls across multiple simultaneous wagers."
    },
    {
      title: "Cryptocurrency Trading Risk Management",
      description: "Apply Kelly sizing to volatile cryptocurrency markets where position sizing discipline is essential. The high volatility of crypto assets makes fractional Kelly particularly important. Helps prevent ruin from over-leveraged positions in a market known for extreme drawdowns."
    },
    {
      title: "Poker Tournament Stack Management",
      description: "Size bets and all-in decisions using Kelly principles when you have an estimated edge. Poker players use Kelly to determine how much of their bankroll to buy in with for tournaments or cash games, balancing growth rate against risk of ruin."
    },
    {
      title: "Forex Day Trading Position Sizing",
      description: "Calculate lot sizes for currency trades based on your strategy's historical performance metrics. Forex traders can convert Kelly percentages to specific pip risk and lot sizes. Particularly useful for scalping and swing trading strategies with well-documented track records."
    },
    {
      title: "Venture Capital and Angel Investment Allocation",
      description: "Apply Kelly principles to startup investment decisions where win rates are low but payoffs can be enormous. Helps angel investors determine what fraction of their investable capital to allocate per deal, accounting for the power-law distribution of venture returns."
    }
  ],

  howToUse: {
    title: "How to Use the Kelly Criterion Calculator",
    content: `This calculator determines optimal position sizing using the Kelly Criterion formula. Enter your trading or betting statistics and the tool computes the mathematically optimal fraction of your capital to risk, along with conservative fractional Kelly alternatives.

### Entering Your Parameters

**Win Rate (%):** Your historical winning percentage. If 55 out of 100 trades are profitable, enter 55. This must be between 0 and 100. The accuracy of your Kelly calculation depends entirely on the accuracy of this input. Use at least 30-50 trades to get a meaningful win rate estimate; fewer trades produce unreliable statistics.

**Average Win Amount ($):** The average profit on your winning trades. Sum all winning trade profits and divide by the number of winning trades. For example, if your last 10 winners were $200, $150, $300, $100, $250, $180, $220, $190, $270, $140, your average win is $200.

**Average Loss Amount ($):** The average loss on your losing trades (enter as a positive number). Sum all losing trade dollar amounts and divide by the number of losing trades. This, combined with average win, determines your payoff ratio (b = avgWin / avgLoss).

**Account Balance ($):** Your total trading capital or bankroll. Used to convert the Kelly percentage into a concrete dollar position size.

### Understanding the Results

**Full Kelly (f*):** The mathematically optimal fraction that maximizes long-term geometric growth rate. However, it produces high volatility and large drawdowns. Most practitioners consider Full Kelly too aggressive for real-world use.

**Half Kelly (f*/2):** Retains approximately 75% of the growth rate of Full Kelly while cutting variance roughly in half. This is the most commonly recommended fraction for professional traders and serious bettors.

**Quarter Kelly (f*/4):** Very conservative sizing that prioritizes capital preservation. Growth is slower but drawdowns are minimal. Suitable for traders with uncertain edge estimates or those in early stages of validating a strategy.

### Reading the Position Sizing Gauge

The visual gauge displays a spectrum from conservative to dangerous:

- **Green zone (0-25% of bankroll):** Conservative territory. Quarter Kelly typically falls here. Low risk of ruin, steady compounding.
- **Amber zone (25-50%):** Moderate risk. Half Kelly for strategies with a strong edge. Good balance of growth and risk management.
- **Orange zone (50-75%):** Aggressive. Full Kelly often lands here for high-edge strategies. Significant drawdown risk.
- **Red zone (75-100%+):** Dangerous over-betting. Exceeding Kelly guarantees worse long-term results than Full Kelly and dramatically increases risk of ruin.

### Growth Simulation

The simulator projects expected account growth over a configurable number of trades. It shows three curves (Full, Half, Quarter Kelly) to illustrate the trade-off between growth rate and volatility. The simulation uses the formula:

**Expected growth per trade = p * ln(1 + f * b) + q * ln(1 - f)**

This is the Kelly growth rate, where higher fractions produce faster expected growth up to Full Kelly, beyond which growth rate actually decreases.

### Practical Tips

1. **Always use fractional Kelly.** Half Kelly is the standard professional recommendation.
2. **Update your statistics regularly.** Win rates and payoff ratios change as markets evolve.
3. **Account for correlation.** If you have multiple simultaneous positions, reduce individual position sizes proportionally.
4. **Use Kelly as a ceiling, not a target.** It tells you the maximum you should bet, not the minimum.
5. **Start with Quarter Kelly** when trading a new strategy until you have confidence in your edge estimates.`,
    steps: [
      {
        name: "Enter Win Rate Percentage",
        text: "Input your historical win rate (0-100%). This is the percentage of trades or bets that result in a profit. Use data from at least 30-50 trades for reliable estimates."
      },
      {
        name: "Set Average Win and Loss",
        text: "Enter average profit on winning trades and average loss on losing trades. These determine the payoff ratio (b = avgWin / avgLoss) used in the Kelly formula."
      },
      {
        name: "Enter Account Balance",
        text: "Provide your total trading capital. The calculator converts Kelly percentages into dollar-denominated position sizes based on this value."
      },
      {
        name: "Review Results and Gauge",
        text: "Examine Full Kelly, Half Kelly, and Quarter Kelly recommendations. Use the visual gauge to see where your sizing falls on the conservative-to-aggressive spectrum."
      },
      {
        name: "Analyze Growth Simulation",
        text: "Review projected account growth curves for each Kelly fraction. Understand the trade-off between faster growth (Full Kelly) and smoother equity curves (Quarter Kelly)."
      }
    ]
  },

  faqs: [
    {
      question: "What is the Kelly Criterion and how does it work?",
      answer: "The Kelly Criterion is a mathematical formula (f* = (bp - q) / b) that calculates the optimal fraction of your bankroll to bet or invest. Developed by John L. Kelly Jr. at Bell Labs in 1956, it maximizes the long-term geometric growth rate of your capital. The inputs are: b (odds or win/loss ratio), p (probability of winning), and q (probability of losing, which is 1-p). A positive Kelly value means you have an edge; a negative value means the odds are against you."
    },
    {
      question: "Why should I use Half Kelly instead of Full Kelly?",
      answer: "Full Kelly maximizes long-term growth rate but produces extreme volatility and large drawdowns. Half Kelly retains approximately 75% of the growth rate while cutting variance roughly in half. Most professional traders, sports bettors, and poker players use Half Kelly because: (1) edge estimates are never perfectly accurate, and over-betting due to estimation error is far more destructive than under-betting, (2) drawdowns under Full Kelly can exceed 50%, which is psychologically difficult, (3) real-world factors like correlation between bets, changing market conditions, and transaction costs are not captured by the basic formula."
    },
    {
      question: "What does a negative Kelly Criterion value mean?",
      answer: "A negative Kelly value means you have negative expected value, meaning the odds are stacked against you. The formula is telling you not to bet at all. For example, if your win rate is 40% and your average win equals your average loss (b=1), Kelly = (1 * 0.40 - 0.60) / 1 = -0.20. The negative value indicates you lose money on average. You should either find a better edge, improve your strategy, or avoid this particular trade or bet entirely."
    },
    {
      question: "How many trades do I need for reliable Kelly calculations?",
      answer: "A minimum of 30-50 trades provides a rough estimate, but 100+ trades give more reliable statistics. The win rate and average win/loss ratios are sample statistics subject to variance. With only 10 trades, your estimated win rate could easily be off by 15-20 percentage points, leading to dramatically different Kelly recommendations. Professional traders typically use 200+ trades from backtesting plus 50+ live trades before trusting their Kelly estimates. Always use fractional Kelly (Half or Quarter) to build in a margin of safety for estimation error."
    },
    {
      question: "Can I use the Kelly Criterion for stock portfolio allocation?",
      answer: "Yes, but with modifications. For a single stock position, use the standard formula with your strategy's win rate and average gain/loss ratio. For portfolio allocation across multiple stocks, you need the multi-asset Kelly formula (which involves covariance matrices). As a practical approximation, many portfolio managers calculate Kelly for each position independently and then scale down all positions proportionally if the total exceeds 100%. Fractional Kelly (Half or Quarter) is strongly recommended for equities due to fat-tail risks, correlation between positions, and the difficulty of estimating edge accurately."
    },
    {
      question: "What is the relationship between Kelly Criterion and expected value?",
      answer: "Expected value (EV) tells you the average profit per bet: EV = (p * avgWin) - (q * avgLoss). A positive EV is necessary for a positive Kelly fraction, but they measure different things. EV tells you the average return per bet. Kelly tells you how much to bet to maximize compound growth. A strategy can have positive EV but still lead to ruin if position sizes are too large, because geometric compounding penalizes losses more than it rewards gains. Kelly accounts for this by finding the bet size that optimizes the geometric (logarithmic) growth rate, not just the arithmetic average."
    },
    {
      question: "How does the Kelly Criterion handle risk of ruin?",
      answer: "Under exact Kelly conditions (perfectly known probabilities, continuous betting), the theoretical risk of ruin is zero because you never bet your entire bankroll. In practice, risk of ruin exists due to: estimation error in win rate (you might be over-betting), discrete bet sizes (you cannot bet infinitely small fractions), and changing edge over time. Using Half Kelly or Quarter Kelly dramatically reduces practical risk of ruin. For example, a strategy with 5% risk of ruin under Full Kelly might have less than 0.1% risk of ruin under Half Kelly."
    },
    {
      question: "Is my trading data private when using this calculator?",
      answer: "Yes, all Kelly Criterion calculations happen entirely in your browser using client-side JavaScript. No win rates, trade amounts, account balances, or calculated position sizes are transmitted to any server. The tool works completely offline after the page loads. No network requests contain your financial data. You can verify this by checking the Network tab in your browser's developer tools. Your trading statistics remain completely private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All Kelly Criterion calculations happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math operations. Win rates, trade amounts, and position sizes are computed locally on your device.
- **No Server Uploads:** We do not have backend servers to process Kelly calculations. The tool works completely offline after page load.
- **No Data Storage:** Account balances, win rates, trade statistics, and calculated position sizes are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We do not track what values you enter, what Kelly fractions you calculate, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab to verify zero outbound requests with your financial data.

Safe for calculating position sizes on confidential trading strategies, proprietary edge estimates, and real account balances. Use with full confidence that your trading data remains completely private.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Kelly Fractions": "3 shown",
    "Growth Simulation": "Yes",
    "Precision": "Full decimal",
    "Server Uploads": "0",
    "Privacy": "100% client-side"
  }
};
