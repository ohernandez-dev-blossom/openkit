import type { ToolGuideContent } from "./types";

export const dcaCalcGuideContent: ToolGuideContent = {
  toolName: "DCA Calculator",
  toolPath: "/dca-calc",
  lastUpdated: "2026-02-10",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Add Your First Entry",
      description: "Enter the price you bought at and the dollar amount invested (or quantity purchased). Optionally add a date for each entry."
    },
    {
      title: "Add More Entries",
      description: "Click 'Add Entry' for each additional purchase. The running average updates after every entry so you can see how each buy affects your cost basis."
    },
    {
      title: "Enter Current Price",
      description: "Input the current market price of the asset to see your unrealized profit or loss, P&L percentage, and current portfolio value."
    },
    {
      title: "Analyze Your Position",
      description: "Review the entry table with color-coded rows highlighting your best and worst entries, cumulative averages, and total position metrics."
    }
  ],

  introduction: {
    title: "What is Dollar-Cost Averaging (DCA)?",
    content: `Dollar-Cost Averaging (DCA) is an investment strategy where you divide your total investment into periodic purchases of an asset at regular intervals, regardless of the current price. Instead of trying to time the market with a single large buy, DCA spreads your risk across multiple price points.

### Why DCA Works

The mathematics of DCA are compelling. When prices are low, your fixed dollar amount buys more units. When prices are high, the same amount buys fewer units. Over time, this naturally weights your average purchase price toward lower levels, giving you a lower cost basis than the asset's average price during the same period.

The average entry calculation is simple: \`Average Price = Total Invested / Total Units\`

Your unrealized P&L is: \`P&L = (Current Price - Average Price) × Total Units\`

### DCA in Practice

DCA is widely used in cryptocurrency investing, stock accumulation, and retirement account contributions (401k/IRA). Bitcoin investors who DCA'd weekly over the past 5 years consistently outperformed those who tried to time their entries, despite Bitcoin's extreme volatility.

### Why Track Your DCA?

Most investors make sporadic purchases at different prices and amounts. Without tracking, it's impossible to know your true average cost basis. This calculator lets you input every purchase — with exact prices and amounts — to compute your precise average entry price and unrealized P&L.

### Beyond Simple DCA

This calculator supports variable-amount DCA (different dollar amounts per purchase), which is how most real-world DCA works. You might invest $500 one month and $1,000 the next when you receive a bonus. The calculator handles any combination of amounts and prices.

### The Running Average Advantage

The entry table shows your cumulative average after each purchase. This reveals powerful insights: you can see exactly how a large buy at a low price improved your average, or how a small buy at a high price barely moved it. This information helps you make better decisions about future entries.

### Best and Worst Entry Analysis

The color-coded highlighting shows your best entries (bought below current average) and worst entries (bought above current average). This visual feedback helps you recognize patterns in your buying behavior and improve your timing for future entries.`
  },

  useCases: [
    {
      title: "Crypto DCA Tracking",
      description: "Track Bitcoin, Ethereum, or altcoin purchases made over weeks or months to know your true average cost basis and unrealized gains."
    },
    {
      title: "Stock Accumulation Analysis",
      description: "Monitor your dollar-cost averaged position in individual stocks, calculating your real average price across all purchases."
    },
    {
      title: "Dip-Buying Strategy Evaluation",
      description: "Analyze how buying dips at specific price levels has affected your overall average entry price and position profitability."
    },
    {
      title: "Tax Lot Tracking",
      description: "Keep track of individual purchase lots with dates and prices for capital gains tax reporting and cost basis documentation."
    },
    {
      title: "Position Building Analysis",
      description: "Track how you're building a position over time and visualize how each new entry shifts your average cost basis."
    },
    {
      title: "Exit Strategy Planning",
      description: "Know your exact break-even price (average entry) to plan take-profit levels and stop-loss placement for your accumulated position."
    }
  ],

  howToUse: {
    title: "How to Use the DCA Calculator",
    content: `The DCA calculator tracks multiple purchase entries and computes your weighted average entry price, total investment, and unrealized P&L in real time.`,
    steps: [
      {
        name: "Add your first purchase",
        text: "Enter the buy price per unit and the dollar amount invested (or number of units purchased). Optionally add the date."
      },
      {
        name: "Add subsequent purchases",
        text: "Click 'Add Entry' for each additional buy. Enter the price and amount for each purchase separately."
      },
      {
        name: "Review running averages",
        text: "The table shows how your average cost basis changes after each entry. Green entries are below your average; red are above."
      },
      {
        name: "Enter current market price",
        text: "Input the current asset price to calculate your unrealized P&L, total portfolio value, and return percentage."
      }
    ]
  },

  faqs: [
    {
      question: "What is the average cost basis?",
      answer: "Your average cost basis (or average entry price) is the weighted average of all your purchase prices, weighted by the amount spent at each price. It's calculated as Total Amount Invested ÷ Total Units Purchased."
    },
    {
      question: "Is DCA better than lump-sum investing?",
      answer: "Historically, lump-sum investing outperforms DCA about 65% of the time in rising markets because your money is invested sooner. However, DCA provides psychological comfort, reduces timing risk, and performs better in volatile or declining markets."
    },
    {
      question: "Should I DCA into a losing position?",
      answer: "DCA into a losing position (averaging down) lowers your break-even price but increases your total exposure. Only average down if your thesis for the investment hasn't changed. If the fundamentals have deteriorated, adding to a loser can compound losses."
    },
    {
      question: "How many entries can I add?",
      answer: "There's no practical limit — the calculator runs entirely in your browser and can handle hundreds of entries. Performance may slow with extremely large numbers (1000+), but typical DCA tracking of 10-100 entries works perfectly."
    },
    {
      question: "Does this calculator account for fees?",
      answer: "Not automatically. To account for fees, add them to your investment amount for each entry. For example, if you bought $500 worth with a $5 fee, enter $505 as your investment amount to get the most accurate cost basis."
    },
    {
      question: "Can I use this for selling/taking profits?",
      answer: "This calculator is designed for tracking buy entries only. For sell tracking, you would need to calculate realized P&L separately. The average entry price from this tool gives you the cost basis needed for profit calculations."
    },
    {
      question: "What does the P&L percentage mean?",
      answer: "P&L percentage shows your total return on the position: ((Current Price - Average Price) / Average Price) × 100%. A positive percentage means you're in profit; negative means you're underwater."
    },
    {
      question: "How do I export my DCA data?",
      answer: "Currently, data is stored only in your browser session. We recommend copying the results manually to a spreadsheet for permanent records. All calculations are transparent so you can verify them independently."
    }
  ],

  security: {
    title: "Privacy & Security",
    content: `All DCA calculations are performed 100% in your browser. No investment data, prices, or amounts are ever transmitted to any server.

- **100% Client-Side:** All calculations happen locally using JavaScript
- **No Data Storage:** Your purchase history and portfolio data are never saved server-side
- **No Tracking:** No investment information is collected or analyzed
- **Session Only:** Data exists only in your browser tab — closing the tab clears everything
- **No Account Required:** Full functionality without registration or login`
  },

  stats: {
    "Processing": "Instant",
    "Privacy": "100% Local",
    "Entry Limit": "Unlimited",
    "Server Data": "None"
  }
};
