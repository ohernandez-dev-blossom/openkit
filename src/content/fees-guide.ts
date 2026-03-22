/**
 * Fee Calculator Tool Guide Content
 * Comprehensive developer guide for payment fee calculations
 */

import type { ToolGuideContent } from "./types";

export const feesGuideContent: ToolGuideContent = {
  toolName: "Fee Calculator",
  toolPath: "/fees",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Transaction Amount",
      description: "Type the base transaction amount before fees. Supports decimal values for precise calculations ($100.00, $1,250.50). Common for e-commerce sales, subscription payments, invoice totals, or any payment processing scenario."
    },
    {
      title: "Select Fee Structure",
      description: "Choose fee type: percentage only (2.9%), fixed fee only ($0.30), or combined (2.9% + $0.30). Matches real payment processor structures: Stripe, PayPal, Square. Configure custom rates for your specific processor or merchant account."
    },
    {
      title: "Calculate Fees and Net Amount",
      description: "See detailed breakdown: original amount, fee charged, net amount received after fees. Calculate both ways: fees on amount (customer pays $100, what's the fee?) and gross amount needed (to net $100, what must customer pay?)."
    },
    {
      title: "View Percentage Impact",
      description: "Understand effective fee percentage. Combined fees (2.9% + $0.30) create variable effective rates: 3.2% on $10, 3.05% on $100, 2.93% on $1000. Fixed fee impact decreases as transaction size increases. Essential for pricing strategy."
    }
  ],

  introduction: {
    title: "What is Fee Calculation?",
    content: `Fee calculation determines payment processing costs charged by credit card processors, payment gateways, and merchant service providers. Understanding fee structures is essential for pricing products, calculating profit margins, setting minimum order values, and optimizing payment operations.

Software developers encounter payment fees when building: e-commerce checkout systems, subscription billing platforms, marketplace payment flows, invoice generation, financial dashboards, accounting integrations, commission calculations, and revenue reporting. Accurate fee calculation affects product pricing, merchant payouts, and financial reconciliation.

### Why Fee Calculations Matter for Developers

**Pricing strategy:** Product prices must account for payment processing fees to maintain profit margins. Example: selling product for $100 with 2.9% + $0.30 fee means you net $96.80, not $100. To net $100, must charge $103.21. Pricing without fee consideration erodes margins. SaaS products often use "plus fees" pricing ($99/month + processing fees) or build fees into price ($103/month, fees included).

**Marketplace platforms:** Multi-vendor marketplaces calculate complex fee splits. Example: buyer pays $100 → Stripe fee 2.9% + $0.30 = $3.20 → marketplace commission 10% of subtotal = $10 → vendor receives $86.80. But should marketplace commission calculate on gross ($100) or net ($96.80)? Industry standard: calculate on gross to avoid passing processor fees to vendors. Requires accurate fee calculation at multiple steps.

**Subscription billing:** Recurring payments accumulate fees over time. Monthly subscription at $29 with 2.9% + $0.30 fee costs $1.14 per month in fees, $13.68 annually. 100 subscribers = $1,368/year in fees. Annual subscription pricing often includes discount for reducing fee frequency: charge $288 once (one fee) vs $29 × 12 (twelve fees, twelve $0.30 fixed charges = $3.60 more).

**Break-even analysis:** Fixed fees disproportionately impact small transactions. On $5 transaction: 2.9% = $0.15, + $0.30 = $0.45 total (9% effective rate). On $100: 2.9% = $2.90, + $0.30 = $3.20 total (3.2% effective rate). On $1000: 2.9% = $29.00, + $0.30 = $29.30 total (2.93% effective rate). This drives minimum order values in e-commerce (need $X minimum to make transaction profitable).

**Revenue reconciliation:** Accounting systems must reconcile gross sales vs net deposits. If daily sales = $10,000 but bank deposit = $9,690, difference = $310 in fees (close to 3.1%). Automated reconciliation requires: fetching transaction details, calculating expected fees, comparing to actual fees charged, flagging discrepancies for review.

### Common Fee Structures

**Percentage only:** Simple percentage of transaction. Example: 2% of transaction amount. $100 transaction = $2 fee, net $98. Used by some ACH processors, cryptocurrency platforms, wire transfers. Advantage: linear scaling, no fixed overhead. Disadvantage: doesn't cover processor fixed costs.

**Fixed fee only:** Flat rate per transaction regardless of amount. Example: $0.50 per transaction. $10 or $1000 both pay $0.50. Rare for credit cards (too risky for processors on large transactions). Used for: check processing, bill pay services, some crypto transactions. Makes sense when transaction sizes are predictable and processor costs are truly fixed.

**Percentage + fixed (most common):** Combination fee structure. Examples:
- **Stripe:** 2.9% + $0.30 per successful charge
- **PayPal:** 2.9% + $0.30 for US transactions, 4.4% + fixed for international
- **Square:** 2.6% + $0.10 for online, 2.6% + $0.10 for in-person
- **Braintree:** 2.9% + $0.30 (same as Stripe)

Formula: \`fee = (amount × percentage / 100) + fixed_fee\`

**Tiered pricing:** Volume-based fee reduction. Example:
- First $10,000/month: 2.9% + $0.30
- $10,000-$100,000: 2.7% + $0.30
- Over $100,000: 2.5% + $0.30

High-volume merchants negotiate custom rates. Calculation requires: tracking monthly volume, applying correct tier, potentially retroactive adjustments.

**Interchange-plus pricing:** Base interchange rate (set by card networks) + processor markup. Example: Visa interchange 1.8% + $0.10, processor adds 0.5% + $0.10, total 2.3% + $0.20. More transparent than blended rate. Actual cost varies by card type: debit cheaper than credit, rewards cards more expensive.

### Fee Calculation Scenarios

**Basic fee calculation:**
\`\`\`
Transaction: $100.00
Fee rate: 2.9% + $0.30
Fee: ($100.00 × 0.029) + $0.30 = $2.90 + $0.30 = $3.20
Net received: $100.00 - $3.20 = $96.80
\`\`\`

**Reverse calculation (gross amount to net target):**
Want to net $100 after fees (2.9% + $0.30), what to charge?
\`\`\`
Let gross = G
Net = G - (G × 0.029) - 0.30 = 100
G × (1 - 0.029) - 0.30 = 100
G × 0.971 = 100.30
G = 100.30 / 0.971 = $103.30 (approximately)
\`\`\`

**Effective percentage:**
\`\`\`
Transaction: $50
Fee: ($50 × 0.029) + $0.30 = $1.45 + $0.30 = $1.75
Effective %: $1.75 / $50 = 3.5%
\`\`\`

**Multiple fees (stacked):**
Transaction: $100
Credit card fee: 2.9% + $0.30 = $3.20
Currency conversion: 1% = $1.00 (on original $100)
Total fees: $4.20
Net: $95.80

### Fee Optimization Strategies

**Surcharging:** Pass fees to customers. Legal in most US states (check state laws). Example: "$100 item + 3% card processing fee = $103 total". Must disclose clearly. Alternative: offer cash discount ("$100 card, $97 cash") which has different legal treatment.

**ACH/bank transfer preference:** Encourage lower-fee payment methods. ACH fees typically 0.5-1% or $0.25 flat. Credit card 2.9% + $0.30. $1000 transaction: ACH fee $5-10, card fee $29.30. Savings: $20-24. Incentivize ACH with discounts or surcharge cards.

**Minimum order values:** Set minimum order to ensure profitability. If product margin is 20% and fees are 3.5%, net margin on small orders is only 16.5%. Calculate: \`minimum_order = fixed_fee / (margin - percentage_fee)\`. Example: $0.30 fixed, 2.9%, 30% margin → minimum order ~$1.11 to break even on fees.

**Annual vs monthly billing:** Reduce fee frequency. Monthly $10 plan = 12 fees of (2.9% + $0.30) = $7.08/year. Annual $100 plan = 1 fee of (2.9% + $0.30) = $3.20/year. Savings: $3.88. Offer $96 annual (20% discount) and still save $3.88 - $4 = break even.

This tool calculates payment processing fees accurately for pricing decisions, margin analysis, and financial planning.`
  },

  useCases: [
    {
      title: "Calculate Stripe Fee Impact on Product Pricing",
      description: "Determine net revenue after Stripe fees (2.9% + $0.30) to ensure profit margins are maintained. Decide whether to absorb fees or pass to customers. Essential for SaaS and e-commerce pricing strategy.",
      example: `// Stripe fee calculation:
interface StripeFee {
  percentageFee: number; // 0.029 (2.9%)
  fixedFee: number; // 0.30
}

function calculateStripeFees(amount: number, fees: StripeFee) {
  const percentageFeeAmount = amount * fees.percentageFee;
  const totalFee = percentageFeeAmount + fees.fixedFee;
  const netAmount = amount - totalFee;
  const effectivePercent = (totalFee / amount) * 100;

  return {
    grossAmount: amount,
    feeAmount: totalFee,
    netAmount,
    effectivePercent
  };
}

// Product pricing scenarios:
const stripe = { percentageFee: 0.029, fixedFee: 0.30 };

// Scenario 1: $29 monthly subscription
const monthly = calculateStripeFees(29, stripe);
// gross: $29.00
// fee: $1.14 (3.93% effective)
// net: $27.86

// Scenario 2: $290 annual subscription (10 months price)
const annual = calculateStripeFees(290, stripe);
// gross: $290.00
// fee: $8.71 (3.0% effective)
// net: $281.29

// Annual saves: 12 × $0.30 = $3.60 in fixed fees
// Plus better effective rate (3.0% vs 3.93%)

// Scenario 3: To net $100, what to charge?
function calculateGrossForNet(targetNet: number, fees: StripeFee) {
  // targetNet = gross - (gross × percentage) - fixed
  // targetNet = gross × (1 - percentage) - fixed
  // gross = (targetNet + fixed) / (1 - percentage)
  return (targetNet + fees.fixedFee) / (1 - fees.percentageFee);
}

const grossNeeded = calculateGrossForNet(100, stripe);
// $103.30 gross → $100.00 net after fees`
    },
    {
      title: "Build Marketplace Vendor Payout System",
      description: "Calculate vendor payouts after deducting marketplace commission and payment processing fees. Handle complex fee splits where marketplace and vendor share fee burden differently. Critical for Etsy-like or Airbnb-like platforms.",
      example: `// Marketplace payout calculation:
interface MarketplaceFees {
  paymentFee: { percent: number; fixed: number }; // Stripe
  platformCommission: number; // Platform take
  platformAbsorbsPaymentFee: boolean; // Who pays processor?
}

function calculateVendorPayout(
  saleAmount: number,
  fees: MarketplaceFees
) {
  const paymentFee = (saleAmount * fees.paymentFee.percent) +
                     fees.paymentFee.fixed;

  let platformCommission: number;
  let vendorPayout: number;

  if (fees.platformAbsorbsPaymentFee) {
    // Calculate commission on gross, absorb payment fee
    platformCommission = saleAmount * fees.platformCommission;
    vendorPayout = saleAmount - platformCommission;
    // Platform nets: commission - payment fee
    // Vendor gets: sale amount - commission (not reduced by payment fee)
  } else {
    // Pass payment fee to vendor, calculate commission on net
    const netAfterPaymentFee = saleAmount - paymentFee;
    platformCommission = netAfterPaymentFee * fees.platformCommission;
    vendorPayout = netAfterPaymentFee - platformCommission;
    // Platform nets: commission (no fee burden)
    // Vendor gets: sale - payment fee - commission
  }

  return {
    saleAmount,
    paymentFee,
    platformCommission,
    vendorPayout,
    platformNet: platformCommission - (fees.platformAbsorbsPaymentFee ? paymentFee : 0)
  };
}

// Example: $100 sale, 10% commission, 2.9% + $0.30 fee

// Scenario A: Platform absorbs payment fee
const scenarioA = calculateVendorPayout(100, {
  paymentFee: { percent: 0.029, fixed: 0.30 },
  platformCommission: 0.10,
  platformAbsorbsPaymentFee: true
});
// Sale: $100.00
// Payment fee: $3.20
// Commission: $10.00 (10% of $100)
// Vendor gets: $90.00
// Platform nets: $10.00 - $3.20 = $6.80

// Scenario B: Vendor pays payment fee
const scenarioB = calculateVendorPayout(100, {
  paymentFee: { percent: 0.029, fixed: 0.30 },
  platformCommission: 0.10,
  platformAbsorbsPaymentFee: false
});
// Sale: $100.00
// Payment fee: $3.20
// Net after fee: $96.80
// Commission: $9.68 (10% of $96.80)
// Vendor gets: $87.12
// Platform nets: $9.68`
    },
    {
      title: "Set Minimum Order Value Based on Fees",
      description: "Calculate minimum transaction amount to ensure profitability after payment fees. Fixed fee component makes small transactions unprofitable. Determine break-even point where fees don't exceed profit margin.",
      example: `// Minimum order calculator:
interface ProductMargin {
  cost: number; // Cost per unit
  price: number; // Sell price per unit
  marginPercent: number; // Profit margin %
}

interface PaymentFees {
  percent: number;
  fixed: number;
}

function calculateMinimumOrder(
  margin: ProductMargin,
  fees: PaymentFees,
  targetMarginPercent: number // Desired margin after fees
): {
  minimumAmount: number;
  minimumQuantity: number;
  reasoning: string;
} {
  // At minimum, we want:
  // (revenue - cost - fees) / revenue >= targetMarginPercent
  // Solve for minimum revenue

  // fee = revenue × feePercent + fixedFee
  // profit = revenue - cost - fee
  // profit = revenue - cost - (revenue × feePercent) - fixedFee
  // profit = revenue × (1 - feePercent) - cost - fixedFee

  // Want: profit / revenue >= targetMarginPercent
  // [revenue × (1 - feePercent) - cost - fixedFee] / revenue >= targetMarginPercent
  // revenue × (1 - feePercent - targetMarginPercent) >= cost + fixedFee
  // revenue >= (cost + fixedFee) / (1 - feePercent - targetMarginPercent)

  const cost = margin.cost;
  const targetNet = targetMarginPercent;
  const minimumRevenue = (cost + fees.fixed) /
                         (1 - fees.percent - targetNet);

  const quantity = Math.ceil(minimumRevenue / margin.price);

  return {
    minimumAmount: minimumRevenue,
    minimumQuantity: quantity,
    reasoning: \`To maintain \${(targetNet * 100).toFixed(1)}% margin after \${(fees.percent * 100)}% + $\${fees.fixed} fees\`
  };
}

// Example: Widget costs $5, sells for $10 (50% margin before fees)
// Fees: 2.9% + $0.30
// Want to maintain 40% margin after fees

const result = calculateMinimumOrder(
  { cost: 5, price: 10, marginPercent: 0.50 },
  { percent: 0.029, fixed: 0.30 },
  0.40 // Target 40% margin
);

// Result:
// minimumAmount: $11.81
// minimumQuantity: 2 widgets
// reasoning: To maintain 40% margin after 2.9% + $0.30 fees

// At 1 widget ($10):
// Fee: $0.59 (5.9% effective!)
// Profit: $10 - $5 - $0.59 = $4.41 (44.1% margin ✓ meets target)

// But at $5 (hypothetical):
// Fee: $0.45 (9% effective)
// Profit: $5 - $5 - $0.45 = -$0.45 (negative 9% margin ✗ loss!)`
    },
    {
      title: "Generate Financial Reports with Fee Breakdown",
      description: "Create revenue reports showing gross sales, fees paid, and net revenue. Essential for accounting, tax reporting, and business analytics. Reconcile payment processor statements with internal transaction records.",
      example: `// Financial report with fee breakdown:
interface Transaction {
  id: string;
  date: Date;
  amount: number;
  feePercent: number;
  feeFixed: number;
}

function generateFinancialReport(transactions: Transaction[]) {
  let totalGross = 0;
  let totalFees = 0;
  let totalNet = 0;

  const processedTransactions = transactions.map(txn => {
    const fee = (txn.amount * txn.feePercent) + txn.feeFixed;
    const net = txn.amount - fee;

    totalGross += txn.amount;
    totalFees += fee;
    totalNet += net;

    return {
      ...txn,
      fee,
      net,
      effectivePercent: (fee / txn.amount) * 100
    };
  });

  const avgEffectiveFee = (totalFees / totalGross) * 100;

  return {
    summary: {
      transactionCount: transactions.length,
      grossRevenue: totalGross,
      totalFees,
      netRevenue: totalNet,
      avgEffectiveFeePercent: avgEffectiveFee
    },
    transactions: processedTransactions
  };
}

// Example monthly report:
const january = [
  { id: '1', date: new Date('2026-01-05'), amount: 99.99, feePercent: 0.029, feeFixed: 0.30 },
  { id: '2', date: new Date('2026-01-12'), amount: 149.00, feePercent: 0.029, feeFixed: 0.30 },
  { id: '3', date: new Date('2026-01-20'), amount: 29.99, feePercent: 0.029, feeFixed: 0.30 },
  // ... more transactions
];

const report = generateFinancialReport(january);

// Output:
// January 2026 Financial Report
// Transaction count: 3
// Gross revenue: $278.98
// Total fees: $8.39
// Net revenue: $270.59
// Avg effective fee: 3.01%
//
// Individual transactions:
// Jan 5: $99.99 → $3.20 fee (3.20%) → $96.79 net
// Jan 12: $149.00 → $4.62 fee (3.10%) → $144.38 net
// Jan 20: $29.99 → $1.17 fee (3.90%) → $28.82 net`
    }
  ],

  howToUse: {
    title: "How to Use This Fee Calculator",
    content: `This tool calculates payment processing fees for various fee structures: percentage only, fixed only, or combined percentage + fixed. Calculate fees on transactions or determine gross amount needed to achieve target net revenue.

### Entering Transaction Details

**Transaction amount:** Type the base transaction amount before fees ($100.00, $29.99). This is what customer pays or what you want to receive net of fees (depending on calculation direction).

**Fee structure:** Select fee type:
- **Percentage only:** Simple percentage (2.9%, 3.5%). No fixed fee.
- **Fixed only:** Flat rate per transaction ($0.30, $0.50). Same fee regardless of amount.
- **Combined:** Percentage + fixed (2.9% + $0.30). Most common for credit cards.

**Custom rates:** Enter your specific payment processor rates. Common examples:
- Stripe: 2.9% + $0.30
- PayPal: 2.9% + $0.30 (US), 4.4% + fixed (international)
- Square: 2.6% + $0.10
- Custom merchant account: varies by negotiation

### Understanding Calculation Results

**Fee amount:** Dollar value charged as fee. Example: $100 at 2.9% + $0.30 = $3.20 fee.

**Net amount:** Amount received after fees deducted. $100 - $3.20 = $96.80 net.

**Effective percentage:** Total fee as percentage of transaction. $3.20 / $100 = 3.2% effective. Higher than 2.9% due to fixed $0.30 component.

**Calculation direction:**
- **Forward:** Given customer pays $100, what fee? What net?
- **Reverse:** Want to net $100, what must customer pay?

### Reverse Calculation (Target Net Amount)

To receive specific amount after fees, calculate required gross amount.

**Example:** Want to net $100 after 2.9% + $0.30 fee
Formula: gross = (target_net + fixed_fee) / (1 - percentage)
Calculation: ($100 + $0.30) / (1 - 0.029) = $100.30 / 0.971 = $103.30

Customer pays $103.30 → fee $3.30 → you net $100.00

**Use case:** Vendor payout systems. Vendor wants $100, calculate what buyer must pay to cover fees.

### Effective Fee Percentage Analysis

Fixed fee creates variable effective percentage based on transaction size.

**Small transaction ($10):**
Fee: ($10 × 0.029) + $0.30 = $0.29 + $0.30 = $0.59
Effective: $0.59 / $10 = 5.9%

**Medium transaction ($100):**
Fee: ($100 × 0.029) + $0.30 = $2.90 + $0.30 = $3.20
Effective: $3.20 / $100 = 3.2%

**Large transaction ($1000):**
Fee: ($1000 × 0.029) + $0.30 = $29.00 + $0.30 = $29.30
Effective: $29.30 / $1000 = 2.93%

**Insight:** Fixed fee impacts small transactions disproportionately. Larger transactions approach percentage-only effective rate.

### Comparing Fee Structures

Compare different payment processors or methods:

**Credit card (Stripe): 2.9% + $0.30**
$100 transaction: $3.20 fee (3.2%)

**ACH transfer: 0.8% + $0.00**
$100 transaction: $0.80 fee (0.8%)

**Savings:** $2.40 per $100 transaction using ACH vs card

**At scale:** 1000 transactions/month × $2.40 = $2,400/month savings ($28,800/year)

### Pricing Strategy Implications

**Absorb fees:** Include fees in price. Sell for $100, you net $96.80. Simple for customers, but reduces margin.

**Pass fees:** Charge customer for fees. List price $96.80, add $3.20 fee, customer pays $100. You net $96.80. Transparent but may reduce conversion.

**Hybrid:** Absorb percentage, pass fixed. Charge customer $0.30 convenience fee. You pay 2.9%, customer pays $0.30. Splits burden.

**Minimum order:** Set minimum to ensure profitability. If $0.30 fee and 30% margin, need >$1 transaction to profit.`,
    steps: [
      {
        name: "Enter Transaction Amount",
        text: "Type the base transaction amount before fees. This is what customer pays or what you want to net (depending on calculation direction)."
      },
      {
        name: "Configure Fee Structure",
        text: "Select fee type: percentage only, fixed only, or combined. Enter your processor's rates (e.g., Stripe 2.9% + $0.30)."
      },
      {
        name: "View Fee Breakdown",
        text: "See detailed calculation: fee amount, net received, effective percentage. Understand true cost of payment processing for that transaction size."
      },
      {
        name: "Calculate Reverse if Needed",
        text: "To net specific amount after fees, use reverse calculation. Enter target net, tool shows required gross amount customer must pay."
      }
    ]
  },

  faqs: [
    {
      question: "How do I calculate the net amount I'll receive after Stripe fees?",
      answer: "Stripe charges 2.9% + $0.30 per successful charge. Formula: net = amount - (amount × 0.029) - 0.30. Example: $100 charge → net = 100 - 2.90 - 0.30 = $96.80. You receive $96.80, Stripe keeps $3.20. Use this calculator: enter $100, select 2.9% + $0.30, see net amount $96.80 instantly."
    },
    {
      question: "If I want to net $100, what should I charge to cover Stripe fees?",
      answer: "Use reverse calculation formula: gross = (target_net + fixed_fee) / (1 - percentage). For $100 net after 2.9% + $0.30: gross = (100 + 0.30) / (1 - 0.029) = $100.30 / 0.971 = $103.30. Charge customer $103.30 → Stripe fee $3.30 → you net $100.00. This calculator has reverse mode for this calculation."
    },
    {
      question: "Why is the effective fee percentage higher than the stated percentage?",
      answer: "Fixed fee component increases effective percentage, especially on small transactions. Stated 2.9% + $0.30 on $10 transaction: fee = $0.59, effective = 5.9% (double stated rate). Fixed $0.30 is 3% of $10. On $100: fee = $3.20, effective = 3.2% (closer to stated). On $1000: fee = $29.30, effective = 2.93% (approaches stated rate). Larger transactions dilute fixed fee impact."
    },
    {
      question: "What's the difference between Stripe, PayPal, and Square fees?",
      answer: "Standard rates: Stripe 2.9% + $0.30, PayPal 2.9% + $0.30 (US), Square 2.6% + $0.10 (online). On $100 transaction: Stripe/PayPal $3.20, Square $2.70 (50¢ cheaper). But compare features: Stripe has best API, PayPal has buyer protection, Square integrates POS. Fees vary for: international cards (higher), in-person vs online, card type (debit cheaper), volume (negotiate custom rates for high volume)."
    },
    {
      question: "Should I absorb payment fees or pass them to customers?",
      answer: "Trade-offs: Absorbing fees reduces margin but simplifies checkout (list price = charge price). Passing fees maintains margin but may reduce conversion (unexpected fees at checkout). Legal considerations: surcharging legal in most US states (check state laws), must disclose clearly. Alternatives: offer cash/ACH discount (legal everywhere), set prices accounting for fees upfront ($103 price includes processing), require minimums to offset fixed fees."
    },
    {
      question: "How do payment fees affect my subscription pricing?",
      answer: "Monthly fees accumulate. $29/month plan: 12 × (2.9% + $0.30) = $14.52/year in fees. Annual $290 plan: 1 × (2.9% + $0.30) = $8.71 in fees. Annual saves $5.81 in fees (11 extra $0.30 charges avoided). This justifies annual discounts: charge $279 annual (3.8% discount) and still save $5.81 - $11 = profit $17.81 more vs monthly. Fee reduction is one reason SaaS prefers annual billing."
    },
    {
      question: "What minimum order value should I set to remain profitable?",
      answer: "Calculate: minimum = fixed_fee / (margin - percentage_fee). Example: 30% margin, 2.9% + $0.30 fees. Minimum = $0.30 / (0.30 - 0.029) = $1.11. Below $1.11, fees exceed margin. Common practice: set $5-10 minimum to comfortably cover fees and shipping. Use this calculator to find break-even point for your specific margins and fee structure."
    },
    {
      question: "How do I calculate marketplace payouts after fees and commission?",
      answer: "Order matters. Option A: Calculate commission on gross, platform absorbs fees. $100 sale → 10% commission = $10 → payment fee $3.20 → vendor gets $90, platform nets $6.80. Option B: Deduct fees first, commission on net. $100 sale → fee $3.20 → net $96.80 → 10% commission = $9.68 → vendor gets $87.12, platform nets $9.68. Option A is more vendor-friendly (higher payout). Decide based on business model."
    },
    {
      question: "Why do international transactions have higher fees?",
      answer: "International fees cover: currency conversion (1-2%), cross-border transaction fees (1%), higher fraud risk, compliance costs. PayPal international: 4.4% + fixed (vs 2.9% domestic). Stripe international cards: add 1% extra. Example: $100 international via Stripe = 2.9% + 1% + $0.30 = $4.20 fee (4.2%). Consider: displaying prices in local currency, using local payment methods, or surcharging international transactions."
    },
    {
      question: "Is my payment fee calculation data private?",
      answer: "Yes, all fee calculations happen entirely in your browser using client-side JavaScript math. No transaction amounts, fee structures, or calculated values are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for calculating fees on confidential business transactions, merchant account analysis, or competitive pricing strategy."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All fee calculations happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math operations. Computations happen locally on your device.
- **No Server Uploads:** We don't have backend servers to process fee calculations. The tool works completely offline after page load.
- **No Data Storage:** Transaction amounts, fee structures, and calculated values are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what amounts you calculate, what fee rates you use, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your financial data.

Safe for calculating fees on confidential business transactions, merchant account analysis, competitive pricing strategy, or proprietary revenue models. Use with confidence for any payment fee calculations.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Fee Structures": "3 types",
    "Reverse Calculation": "Yes",
    "Precision": "Full decimal",
    "Server Uploads": "0"
  }
};
