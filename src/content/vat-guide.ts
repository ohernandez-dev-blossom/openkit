/**
 * VAT Calculator Tool Guide Content
 * Comprehensive developer guide for VAT calculations
 */

import type { ToolGuideContent } from "./types";

export const vatGuideContent: ToolGuideContent = {
  toolName: "VAT Calculator",
  toolPath: "/vat",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Amount",
      description: "Type the price amount to calculate VAT on. Supports decimal values for precise calculations (€99.99, £1,250.50). Amount can be net (before VAT) or gross (including VAT) depending on calculation direction."
    },
    {
      title: "Select VAT Rate",
      description: "Choose applicable VAT rate from common rates: 20% (UK standard), 19% (Germany standard), 21% (EU common), or custom percentage. Rate depends on country, product category (standard, reduced, zero-rated), and business type."
    },
    {
      title: "Choose Calculation Direction",
      description: "Select add VAT (calculate gross from net) or remove VAT (calculate net from gross). Add VAT: net price + VAT = gross. Remove VAT (reverse calculation): gross price - VAT = net. Essential for invoicing, pricing, and tax reporting."
    },
    {
      title: "View Detailed Breakdown",
      description: "See complete calculation: net amount, VAT amount, gross amount. All values precisely calculated and formatted as currency. Copy individual amounts or full breakdown for invoices, quotes, or financial reports."
    }
  ],

  introduction: {
    title: "What is VAT Calculation?",
    content: `VAT (Value Added Tax) calculation determines tax amounts for goods and services in countries using VAT systems. VAT is consumption tax collected at each stage of production/distribution, ultimately paid by end consumer. Understanding VAT calculation is essential for e-commerce, international sales, invoicing, and financial compliance.

Software developers encounter VAT calculations when building: e-commerce checkout systems, invoicing platforms, accounting software, marketplace integrations, subscription billing, international payment processing, POS systems, expense management tools, and tax reporting dashboards. Accurate VAT handling is legally required for businesses selling in VAT jurisdictions.

### Why VAT Calculations Matter for Developers

**E-commerce pricing and checkout:** Online stores must calculate VAT correctly at checkout. Complexity: B2C (business to consumer) charges VAT, B2B (business to business) may reverse charge (buyer pays VAT to their tax authority, not seller). Example: €100 product in Germany (19% VAT): B2C customer pays €119 (including VAT), B2B customer with valid VAT number pays €100 (excluding VAT, reverse charge). Incorrect VAT calculation violates tax law, causes accounting errors, and confuses customers.

**Invoice generation:** Invoices must show VAT breakdown clearly. Example invoice format:
- Net amount: €1,000.00
- VAT (19%): €190.00
- Gross amount: €1,190.00

B2B invoices include seller and buyer VAT numbers. Missing or incorrect VAT calculation makes invoice legally invalid in many jurisdictions. Accounting software must: store VAT rates, calculate correctly, format invoices per local regulations, handle multiple VAT rates for different products.

**International sales and VAT rates:** VAT rates vary by country and product type. EU examples: Standard rates (15-27%), Reduced rates (5-12% for food, books, medicine), Zero rate (0% for exports, certain essentials), Exempt (no VAT, but can't reclaim input VAT). UK: 20% standard, 5% reduced, 0% zero-rated. Selling across EU requires: detecting customer country, applying correct VAT rate, handling OSS (One Stop Shop) for simplified EU VAT, storing proof of customer location.

**Reverse calculation (gross to net):** Often you know gross price (final customer price) and need net (for reporting). Example: product sells for €119 including 19% VAT. Net price = €119 / 1.19 = €100. Formula: \`net = gross / (1 + VAT_rate)\`. Common mistake: \`€119 - 19% = €96.39\` is wrong. Must divide by 1.19, not subtract 19%.

**Subscription pricing with VAT:** SaaS platforms charge subscriptions + VAT. Example: $29/month plan for EU customer. Add 21% VAT = $35.09 total. But if customer provides valid VAT number (B2B), charge $29 only (reverse charge). Payment processor (Stripe, Paddle) often handles VAT automatically, but you must: pass customer tax information, display prices correctly (with/without VAT), generate compliant invoices, report to tax authorities.

### VAT Concepts and Terminology

**Net amount (excluding VAT):** Base price before tax. What seller receives for goods/services. Also called "pre-VAT price" or "exclusive of VAT".

**VAT amount:** Tax calculated on net amount. Formula: \`VAT = net × VAT_rate\`. Example: €100 net × 19% = €19 VAT.

**Gross amount (including VAT):** Total price customer pays. Formula: \`gross = net + VAT = net × (1 + VAT_rate)\`. Example: €100 + €19 = €119 gross.

**VAT rate:** Percentage tax rate. Varies by country and product category. Common EU rates:
- UK: 20% standard, 5% reduced, 0% zero
- Germany: 19% standard, 7% reduced
- France: 20% standard, 10% intermediate, 5.5% reduced
- Ireland: 23% standard, 13.5% reduced, 9% second reduced

**Reverse charge:** B2B mechanism where buyer (not seller) pays VAT to tax authority. Seller issues invoice without VAT. Requires: valid VAT numbers for both parties, VIES validation (EU VAT Information Exchange System), correct invoice notation ("reverse charge applies").

**Input VAT vs Output VAT:** Input VAT = VAT paid on purchases (reclaimable), Output VAT = VAT charged to customers (owed to tax authority). Net VAT = Output VAT - Input VAT. Businesses pay difference to tax authority or claim refund if Input VAT exceeds Output VAT.

### VAT Calculation Formulas

**Add VAT (net to gross):**
\`\`\`
VAT = net × VAT_rate
gross = net + VAT = net × (1 + VAT_rate)

Example: €100 net, 19% VAT
VAT = €100 × 0.19 = €19
gross = €100 + €19 = €119
Or: €100 × 1.19 = €119
\`\`\`

**Remove VAT (gross to net):**
\`\`\`
net = gross / (1 + VAT_rate)
VAT = gross - net

Example: €119 gross, 19% VAT
net = €119 / 1.19 = €100
VAT = €119 - €100 = €19
\`\`\`

**Common mistake - subtracting percentage:**
\`\`\`
❌ WRONG: €119 - (€119 × 0.19) = €96.39
✓ CORRECT: €119 / 1.19 = €100
\`\`\`

**Calculate VAT rate from gross and net:**
\`\`\`
VAT_rate = ((gross - net) / net) × 100

Example: €119 gross, €100 net
VAT_rate = ((€119 - €100) / €100) × 100 = 19%
\`\`\`

### VAT in Different Regions

**European Union (EU):** VAT applies to goods and services. Rates 15-27%. Cross-border B2C sales: seller charges VAT at customer's country rate. B2B: reverse charge if buyer has valid VAT number. Digital services: VAT at customer location (not seller). OSS (One Stop Shop) simplifies EU VAT reporting.

**United Kingdom (UK):** Post-Brexit, separate from EU VAT. Standard rate 20%, reduced 5%, zero 0%. Northern Ireland follows some EU VAT rules. B2B exports to EU: zero-rated. B2C exports: depends on value and goods type.

**United States:** No VAT. Uses sales tax instead (state/local level). Different system: sales tax only on final sale to consumer, not value-added at each stage. International: US businesses selling to EU must charge VAT.

**Australia:** GST (Goods and Services Tax) 10%. Similar to VAT but different name. B2B GST-registered: tax invoices required. Exports: GST-free.

**Canada:** GST (federal) + PST (provincial in some provinces) or HST (harmonized). Varies by province. Example: Ontario 13% HST, Alberta 5% GST only.

### Common VAT Implementation Challenges

**Dynamic rate selection:** E-commerce must: detect customer location (IP, billing address), determine applicable VAT rate (country + product category), handle rate changes (VAT rates change periodically), validate VAT numbers (VIES API for EU).

**Multi-currency with VAT:** Selling in EUR, GBP, USD with different VAT rates. Example: €100 product in Germany (19% VAT = €119) vs £100 in UK (20% VAT = £120). Currency conversion before or after VAT? Standard: convert net amount, then add VAT in target currency.

**Mixed cart VAT rates:** Cart contains items with different VAT rates (standard 20%, reduced 5%, zero 0%). Calculate VAT per line item, sum for total. Invoice must show breakdown by VAT rate.

**Rounding precision:** VAT calculations use 2 decimal places for currency. Rounding differences accumulate. Best practice: calculate VAT per line item and round, sum rounded amounts. Alternative: calculate total VAT on cart subtotal and round once (matches tax authority expectations better).

This tool calculates VAT amounts with precision for invoicing, pricing, and financial compliance across VAT jurisdictions.`
  },

  useCases: [
    {
      title: "Calculate VAT for E-commerce Checkout",
      description: "Add VAT to product prices at checkout based on customer location and business type (B2C vs B2B). Display price breakdown clearly. Essential for EU, UK, and other VAT jurisdictions.",
      example: `// E-commerce VAT calculation:
interface Product {
  id: string;
  name: string;
  netPrice: number; // Price excluding VAT
}

interface Customer {
  country: string;
  vatNumber?: string; // B2B customer VAT number
  isEUBusiness: boolean;
}

const VAT_RATES: Record<string, number> = {
  DE: 0.19, // Germany 19%
  UK: 0.20, // United Kingdom 20%
  FR: 0.20, // France 20%
  ES: 0.21, // Spain 21%
  // ... more countries
};

function calculateCheckoutVAT(
  products: Product[],
  customer: Customer
) {
  const vatRate = VAT_RATES[customer.country] || 0;
  const applyVAT = !customer.isEUBusiness || !customer.vatNumber;

  let totalNet = 0;
  let totalVAT = 0;

  const lineItems = products.map(product => {
    const netAmount = product.netPrice;
    const vatAmount = applyVAT ? netAmount * vatRate : 0;
    const grossAmount = netAmount + vatAmount;

    totalNet += netAmount;
    totalVAT += vatAmount;

    return {
      productId: product.id,
      netAmount,
      vatAmount,
      grossAmount,
      vatRate: vatRate * 100
    };
  });

  return {
    lineItems,
    summary: {
      totalNet,
      totalVAT,
      totalGross: totalNet + totalVAT,
      vatRate: vatRate * 100,
      reverseCharge: customer.isEUBusiness && !!customer.vatNumber
    }
  };
}

// Example: German B2C customer buys €100 product
const b2cOrder = calculateCheckoutVAT(
  [{ id: '1', name: 'Widget', netPrice: 100 }],
  { country: 'DE', isEUBusiness: false }
);
// totalNet: €100
// totalVAT: €19 (19%)
// totalGross: €119
// Customer pays: €119

// Example: German B2B customer with VAT number
const b2bOrder = calculateCheckoutVAT(
  [{ id: '1', name: 'Widget', netPrice: 100 }],
  { country: 'DE', vatNumber: 'DE123456789', isEUBusiness: true }
);
// totalNet: €100
// totalVAT: €0 (reverse charge)
// totalGross: €100
// reverseCharge: true
// Customer pays: €100 (pays VAT to own tax authority)`
    },
    {
      title: "Generate VAT-Compliant Invoices",
      description: "Create legally compliant invoices with proper VAT breakdown. Include seller and buyer VAT numbers, net/gross amounts, VAT rate, and total. Required for business tax reporting and audits.",
      example: `// Invoice generator with VAT:
interface InvoiceData {
  invoiceNumber: string;
  date: Date;
  seller: {
    name: string;
    vatNumber: string;
    address: string;
  };
  buyer: {
    name: string;
    vatNumber?: string;
    address: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number; // Net price per unit
    vatRate: number; // e.g., 0.19 for 19%
  }>;
}

function generateInvoice(data: InvoiceData) {
  let subtotal = 0;
  const vatBreakdown: Record<number, { net: number; vat: number }> = {};

  const lineItems = data.items.map(item => {
    const netAmount = item.quantity * item.unitPrice;
    const vatAmount = netAmount * item.vatRate;
    const grossAmount = netAmount + vatAmount;

    subtotal += netAmount;

    // Group by VAT rate
    const rateKey = item.vatRate;
    if (!vatBreakdown[rateKey]) {
      vatBreakdown[rateKey] = { net: 0, vat: 0 };
    }
    vatBreakdown[rateKey].net += netAmount;
    vatBreakdown[rateKey].vat += vatAmount;

    return {
      ...item,
      netAmount,
      vatAmount,
      grossAmount
    };
  });

  const totalVAT = Object.values(vatBreakdown)
    .reduce((sum, item) => sum + item.vat, 0);
  const totalGross = subtotal + totalVAT;

  const reverseCharge = data.buyer.vatNumber && data.buyer.vatNumber !== data.seller.vatNumber;

  return {
    ...data,
    lineItems,
    summary: {
      subtotal,
      vatBreakdown,
      totalVAT: reverseCharge ? 0 : totalVAT,
      totalGross: reverseCharge ? subtotal : totalGross,
      reverseCharge
    }
  };
}

// Invoice output format:
// INVOICE #INV-2024-001
// Date: 2024-03-15
//
// Seller:
// ACME Corp
// VAT: DE123456789
//
// Buyer:
// Widget Ltd
// VAT: DE987654321
//
// Line Items:
// 1. Consulting Services (10 hours × €100) = €1,000.00
//
// Subtotal: €1,000.00
// VAT (19%): €0.00 (Reverse Charge)
// Total: €1,000.00
//
// Note: Reverse charge applies - Buyer to account for VAT`
    },
    {
      title: "Handle Subscription Pricing with VAT",
      description: "SaaS subscription billing must add VAT for B2C customers or apply reverse charge for B2B. Display prices correctly, generate compliant invoices, and report to tax authorities. Integrate with payment processors.",
      example: `// SaaS subscription VAT handling:
interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number; // Net price
  currency: string;
}

interface SubscriptionCustomer {
  id: string;
  country: string;
  vatNumber?: string;
  isEUBusiness: boolean;
}

function calculateSubscriptionPrice(
  plan: SubscriptionPlan,
  customer: SubscriptionCustomer
) {
  const vatRate = VAT_RATES[customer.country] || 0;

  // B2B with valid VAT number: reverse charge (no VAT added)
  const applyVAT = !customer.isEUBusiness || !customer.vatNumber;

  const netPrice = plan.monthlyPrice;
  const vatAmount = applyVAT ? netPrice * vatRate : 0;
  const grossPrice = netPrice + vatAmount;

  return {
    displayPrice: grossPrice,
    netPrice,
    vatAmount,
    grossPrice,
    vatRate: vatRate * 100,
    reverseCharge: !applyVAT,
    currency: plan.currency,
    // For display
    priceFormatted: applyVAT
      ? \`\${plan.currency}\${grossPrice.toFixed(2)} (incl. VAT)\`
      : \`\${plan.currency}\${netPrice.toFixed(2)} (excl. VAT)\`
  };
}

// Stripe integration example:
async function createStripeSubscription(
  customer: SubscriptionCustomer,
  plan: SubscriptionPlan
) {
  const pricing = calculateSubscriptionPrice(plan, customer);

  // Create subscription with tax info
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: plan.id }],
    // Stripe Tax automatically calculates VAT if configured
    automatic_tax: { enabled: true },
    // Or manual tax rate
    default_tax_rates: pricing.reverseCharge ? [] : [taxRateId],
    metadata: {
      net_price: pricing.netPrice,
      vat_amount: pricing.vatAmount,
      reverse_charge: pricing.reverseCharge
    }
  });

  return subscription;
}

// Display to customer:
// Pro Plan
// €29.00/month (B2B, excl. VAT)
// or
// €34.51/month (incl. 19% VAT) for B2C

// Invoice generated monthly shows proper VAT breakdown`
    },
    {
      title: "Build VAT Reporting Dashboard",
      description: "Accounting dashboards need VAT calculations for tax reporting. Sum VAT collected, show breakdown by rate, calculate net VAT owed. Essential for quarterly/monthly VAT returns to tax authorities.",
      example: `// VAT reporting aggregation:
interface Transaction {
  id: string;
  date: Date;
  type: 'sale' | 'purchase'; // Output VAT (sale) or Input VAT (purchase)
  netAmount: number;
  vatAmount: number;
  vatRate: number;
  country: string;
}

function generateVATReport(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
) {
  const periodTransactions = transactions.filter(
    t => t.date >= startDate && t.date <= endDate
  );

  // Output VAT (charged to customers)
  const sales = periodTransactions.filter(t => t.type === 'sale');
  const outputVAT = sales.reduce((sum, t) => sum + t.vatAmount, 0);

  // Input VAT (paid on purchases, can reclaim)
  const purchases = periodTransactions.filter(t => t.type === 'purchase');
  const inputVAT = purchases.reduce((sum, t) => sum + t.vatAmount, 0);

  // Net VAT owed to tax authority
  const netVAT = outputVAT - inputVAT;

  // Breakdown by rate
  const byRate: Record<number, {
    sales: number;
    purchases: number;
    netVAT: number;
  }> = {};

  periodTransactions.forEach(t => {
    const rate = t.vatRate * 100;
    if (!byRate[rate]) {
      byRate[rate] = { sales: 0, purchases: 0, netVAT: 0 };
    }

    if (t.type === 'sale') {
      byRate[rate].sales += t.vatAmount;
      byRate[rate].netVAT += t.vatAmount;
    } else {
      byRate[rate].purchases += t.vatAmount;
      byRate[rate].netVAT -= t.vatAmount;
    }
  });

  return {
    period: { start: startDate, end: endDate },
    summary: {
      outputVAT,
      inputVAT,
      netVAT,
      owedToAuthority: netVAT > 0,
      amountOwedOrRefund: Math.abs(netVAT)
    },
    byRate
  };
}

// Example Q1 2024 VAT report:
// Period: Jan 1 - Mar 31, 2024
//
// Output VAT (charged to customers): €15,000
// Input VAT (paid on purchases): €8,000
// Net VAT owed: €7,000
//
// Breakdown by rate:
// 19% rate: €6,500 owed
// 7% rate: €500 owed
//
// Payment due to tax authority: €7,000`
    }
  ],

  howToUse: {
    title: "How to Use This VAT Calculator",
    content: `This tool calculates VAT amounts for pricing, invoicing, and tax reporting. Supports adding VAT to net prices or removing VAT from gross prices. Handles all VAT rates used in EU, UK, and other jurisdictions.

### Entering Amounts

**Net amount (excluding VAT):** Base price before tax. Use when you know the pre-tax price and need to calculate total with VAT. Example: product costs €100 before VAT, need to know customer price.

**Gross amount (including VAT):** Total price with tax included. Use when you know final price and need to extract VAT for accounting. Example: customer paid €119, need to know how much was VAT.

**Decimal precision:** Enter exact amounts with decimals (€99.99, £1,250.50). Tool maintains 2 decimal places for currency precision in calculations.

### Selecting VAT Rates

**Common rates:**
- **20%:** UK standard rate, France standard, most common EU rate
- **19%:** Germany standard rate
- **21%:** Spain, Netherlands, Ireland standard rates
- **Custom:** Enter any percentage for special rates or non-EU countries

**Rate types in practice:**
- Standard rate: Most goods and services
- Reduced rate: Food, books, newspapers (5-12% typically)
- Zero rate: Exports, some essentials (0%)
- Exempt: No VAT charged (healthcare, education often exempt)

**Multiple rates:** If calculating for cart with mixed VAT rates, calculate each item separately then sum totals.

### Calculation Directions

**Add VAT (net to gross):**
Start with net price, calculate VAT, get gross price.
- Input: €100 net, 19% rate
- Calculation: €100 × 0.19 = €19 VAT
- Output: €100 net + €19 VAT = €119 gross

Use when: pricing products, creating quotes, showing "price + VAT" to customers.

**Remove VAT (gross to net):**
Start with gross price, extract VAT, get net price.
- Input: €119 gross, 19% rate
- Calculation: €119 / 1.19 = €100 net
- VAT: €119 - €100 = €19
- Output: €100 net, €19 VAT

Use when: customer paid total, need to report net revenue for accounting, extracting VAT from receipts.

**Common mistake:** Don't subtract percentage from gross. €119 - 19% = €96.39 is wrong. Must divide: €119 / 1.19 = €100.

### Understanding Results

**Net amount:** Base price before VAT. What seller receives as revenue (minus VAT paid to tax authority). Used for: accounting records, profit calculation, commission basis.

**VAT amount:** Tax portion. What's owed to tax authority (for sales) or reclaimable (for purchases). Used for: tax reporting, VAT returns, financial statements.

**Gross amount:** Total price including VAT. What customer pays. Used for: pricing display, invoice total, payment processing.

**Percentage verification:** Tool shows effective VAT percentage to verify calculation. Example: €19 VAT on €100 net = 19%. On €100 net = 19% check.

### Invoicing Workflow

1. Calculate line items (net × quantity)
2. Apply VAT to each line item
3. Sum VAT amounts by rate (if multiple rates)
4. Display invoice:
   - Subtotal (all line items net)
   - VAT breakdown by rate
   - Total (gross)
5. Include seller and buyer VAT numbers (B2B)
6. Note reverse charge if applicable

### Special Scenarios

**Reverse charge (B2B):**
When buyer has valid VAT number, don't add VAT. Invoice shows net amount only. Add note: "Reverse charge - Buyer to account for VAT". Buyer pays VAT to their tax authority.

**Exports outside VAT area:**
Exports from EU to non-EU countries typically zero-rated (0% VAT). Invoice shows 0% VAT rate. Requires proof of export (shipping documents).

**Digital services:**
VAT charged at customer's location rate, not seller's. UK company selling to French consumer uses 20% French VAT, not UK rate.

**Mixed cart rates:**
Calculate each item with its rate:
- Item 1: €100 net, 20% VAT = €120 gross
- Item 2: €50 net, 5% VAT = €52.50 gross
- Total: €150 net, €22.50 VAT, €172.50 gross

### Business vs Consumer

**B2C (business to consumer):**
Always charge VAT. Display prices including VAT in most EU countries (legal requirement). Invoice must show VAT breakdown.

**B2B (business to business):**
If buyer has valid VAT number: reverse charge (no VAT added). If buyer has no VAT number or invalid: charge VAT normally. Verify VAT numbers via VIES database (EU).`,
    steps: [
      {
        name: "Enter Amount",
        text: "Type the price amount: net (before VAT) if adding VAT, or gross (including VAT) if removing VAT. Supports decimal values."
      },
      {
        name: "Select VAT Rate",
        text: "Choose applicable VAT rate from common rates (20%, 19%, 21%) or enter custom percentage. Rate depends on country and product category."
      },
      {
        name: "Choose Direction",
        text: "Select add VAT (calculate gross from net) or remove VAT (calculate net from gross). Add for pricing, remove for accounting."
      },
      {
        name: "View Breakdown",
        text: "See detailed calculation: net amount, VAT amount, gross amount. Copy individual values or full breakdown for invoices and reports."
      }
    ]
  },

  faqs: [
    {
      question: "How do I calculate VAT on a price?",
      answer: "To add VAT: multiply net price by (1 + VAT rate). Example: €100 net × 1.19 (19% VAT) = €119 gross. To remove VAT: divide gross by (1 + VAT rate). Example: €119 / 1.19 = €100 net. Common mistake: subtracting 19% from €119 gives wrong result (€96.39). Must divide, not subtract, to remove VAT correctly."
    },
    {
      question: "What is the difference between net and gross price?",
      answer: "Net price is amount before VAT (what seller receives as revenue). Gross price is total including VAT (what customer pays). Example: Product costs €100 net. With 20% VAT, gross price is €120. Customer pays €120, seller keeps €100, €20 goes to tax authority. Invoices must show both amounts separately for transparency and tax compliance."
    },
    {
      question: "Why can't I just subtract the VAT percentage to remove VAT?",
      answer: "VAT percentages apply to net amount, not gross. Example: €119 gross with 19% VAT. If you subtract 19% (€119 × 0.19 = €22.61), you get €96.39 (wrong). Correct: divide by 1.19 (€119 / 1.19 = €100 net, €19 VAT). The 19% applies to the €100 net, not the €119 gross. This is called reverse calculation - requires division, not subtraction."
    },
    {
      question: "Do I charge VAT for international sales?",
      answer: "Depends on customer location and type. EU B2C: charge VAT at customer's country rate. EU B2B with valid VAT number: reverse charge (no VAT). Exports outside VAT area (EU to US): usually zero-rated (0% VAT). Digital services: VAT at customer location. Rules complex - use VAT MOSS/OSS for EU digital services, verify VAT numbers via VIES, keep proof of customer location."
    },
    {
      question: "What is reverse charge and when does it apply?",
      answer: "Reverse charge: B2B mechanism where buyer (not seller) pays VAT to tax authority. Applies when: both parties have valid VAT numbers, transaction is cross-border (different EU countries), goods/services type allows reverse charge. Seller issues invoice without VAT, adds note 'Reverse charge - Buyer to account for VAT'. Buyer reports VAT to their tax authority. Prevents double taxation and simplifies cross-border B2B trade."
    },
    {
      question: "What VAT rate should I use for my product?",
      answer: "Depends on product category and country. Most goods: standard rate (19-25% in EU, 20% UK). Reduced rates for: food, books, children's items, medical supplies (5-12%). Zero rate: exports, some essentials. Exempt: education, healthcare, financial services. Check with tax authority or use VAT rate lookup tools. Some products have different rates in different countries - EU allows member states to set own reduced rates."
    },
    {
      question: "How do I handle VAT in invoices?",
      answer: "Invoice must show: 1) Seller name and VAT number, 2) Buyer name and VAT number (B2B), 3) Invoice number and date, 4) Line items with quantities and unit prices, 5) Net total, 6) VAT amount and rate, 7) Gross total, 8) 'Reverse charge' note if applicable. Format: Subtotal €100, VAT (19%) €19, Total €119. If multiple VAT rates in one invoice, show breakdown by rate. Keep copies for tax audits (typically 6-10 years)."
    },
    {
      question: "Can I reclaim VAT on business purchases?",
      answer: "Yes, if you're VAT-registered business and purchase is for business use. Input VAT (paid on purchases) reduces Output VAT (charged to customers). Net VAT = Output VAT - Input VAT. File VAT return (monthly/quarterly) showing calculation. If Input VAT > Output VAT, claim refund. Requirements: valid VAT invoices from suppliers, purchases for business (not personal), proper record keeping. Some purchases have restricted reclaim (entertainment, cars)."
    },
    {
      question: "What happens if I calculate VAT wrong on invoices?",
      answer: "Legal and financial consequences: 1) Invoice legally invalid (customer can request corrected invoice), 2) Tax authority penalties for underpaying VAT, 3) Accounting errors (revenue misstated), 4) Customer complaints if overcharged, 5) Audit triggers if discrepancies found. Correct by issuing credit note (cancels wrong invoice) and new invoice with correct amounts. Keep documentation. For large errors, consult tax advisor. Automated VAT calculation reduces errors significantly."
    },
    {
      question: "Is my VAT calculation data private?",
      answer: "Yes, all VAT calculations happen entirely in your browser using client-side JavaScript math. No amounts, VAT rates, or calculated values are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for calculating VAT on confidential pricing, proprietary invoices, or internal financial analysis. All calculations are local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All VAT calculations happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math operations. Computations happen locally on your device.
- **No Server Uploads:** We don't have backend servers to process VAT calculations. The tool works completely offline after page load.
- **No Data Storage:** Amounts, VAT rates, and calculated values are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what amounts you calculate, what VAT rates you use, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your financial data.

Safe for calculating VAT on confidential pricing, proprietary invoices, internal financial planning, or competitive business analysis. Use with confidence for all VAT calculations.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Precision": "2 decimals",
    "Directions": "Add/Remove",
    "Custom Rates": "Yes",
    "Server Uploads": "0"
  }
};
