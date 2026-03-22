/**
 * Discount Calculator Tool Guide Content
 * Comprehensive developer guide for discount and savings calculations
 */

import type { ToolGuideContent } from "./types";

export const discountGuideContent: ToolGuideContent = {
  toolName: "Discount Calculator",
  toolPath: "/discount",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Original Price",
      description: "Type the base price before discount. Supports decimal values for precise amounts ($99.99, $1,499.00). Common for retail products, subscription plans, service packages, or any scenario with promotional pricing."
    },
    {
      title: "Input Discount Percentage",
      description: "Enter the discount rate as percentage (10%, 25%, 50% off). Tool automatically calculates discount amount and final price. Useful for sales events, coupon codes, loyalty discounts, or bulk purchase savings."
    },
    {
      title: "View Savings Breakdown",
      description: "See detailed calculation: original price, discount amount saved, and final price after discount. All values formatted as currency. Helps verify promotional pricing matches advertised savings."
    },
    {
      title: "Calculate Multiple Discounts",
      description: "Apply stacked discounts sequentially: 20% off, then additional 10% off. Tool calculates compound effect correctly (not simple addition). Essential for complex promotion logic in e-commerce systems."
    }
  ],

  introduction: {
    title: "What is Discount Calculation?",
    content: `Discount calculation determines price reductions based on percentage off original prices. Essential for e-commerce pricing, promotional campaigns, coupon systems, and financial planning. Calculations convert percentage discounts to dollar amounts and final prices, handling single discounts, stacked discounts, and savings analysis.

Software developers encounter discount calculations when building: e-commerce shopping carts with coupon codes, subscription pricing with annual discounts, SaaS plans with volume discounts, point-of-sale systems with loyalty rewards, affiliate marketing platforms with commission tiers, pricing comparison tools, budgeting apps with savings tracking, and financial planning dashboards.

### Why Discount Calculations Matter for Developers

**E-commerce pricing engines:** Shopping cart systems apply discounts to products, categories, or entire orders. Complexity arises with stacked promotions: site-wide 20% off + product-specific 10% off + loyalty member 5% off. Do discounts stack additively (35% total) or multiplicatively (31.6% total)? Order of operations affects final price. Most platforms apply discounts sequentially: $100 → $80 (20% off) → $72 (10% off $80) → $68.40 (5% off $72) = 31.6% total discount, not 35%.

**Coupon and promo code systems:** Coupon validation logic checks: Is code valid? Has it expired? Minimum purchase met? Category restrictions? Maximum discount limit? User eligibility? Already used? Calculating final price requires: fetch original price, validate coupon, apply discount percentage or fixed amount, check minimum/maximum constraints, recalculate tax on discounted price, update order total.

**Subscription billing discounts:** SaaS platforms offer annual plan discounts: "Save 20% by paying yearly". Monthly = $10/month × 12 = $120/year. Annual with 20% off = $96/year ($8/month effective). Calculating savings: $120 - $96 = $24 saved. Percentage saved: 20%. But reverse calculation (what percentage discount gives $96 annual price?) requires: (120 - 96) / 120 × 100 = 20%.

**Dynamic pricing and sales:** Time-sensitive promotions require real-time discount calculations. Black Friday: "30% off all electronics". System must: query all products in category, calculate 30% discount for each, display original and sale prices, sort by discount amount, calculate potential savings per item. Price comparison features show: original $299.99, now $209.99, save $90 (30% off).

**Loyalty and rewards programs:** Tiered discount systems based on customer status: Bronze (5% off), Silver (10% off), Gold (15% off), Platinum (20% off). Cart calculates discount based on user tier. Points-based systems convert points to dollar discounts: 1000 points = $10 off. Calculating effective discount percentage when combining points + promo code.

### Discount Calculation Formulas

**Discount amount:** \`discount = original_price × (discount_percent / 100)\`
Example: $100 × (25 / 100) = $100 × 0.25 = $25 discount

**Final price:** \`final = original - discount = original × (1 - discount_percent / 100)\`
Example: $100 - $25 = $75, or $100 × 0.75 = $75

**Savings percentage:** \`percent = (original - final) / original × 100\`
Example: ($100 - $75) / $100 × 100 = 25%

**Reverse calculate discount percent:** \`percent = (1 - final / original) × 100\`
Example: (1 - 75/100) × 100 = 25%

**Stacked discounts (sequential):** Apply each discount to previous result:
- Start: $100
- First 20% off: $100 × 0.80 = $80
- Then 10% off: $80 × 0.90 = $72
- Total effective discount: (100 - 72) / 100 × 100 = 28% (not 30%)

**Stacked discounts formula:** \`final = original × (1 - d1/100) × (1 - d2/100) × ...\`

### Stacked Discount Behavior

**Multiplicative stacking:** Most e-commerce platforms apply discounts sequentially (multiplicative), not additively. 20% off + 10% off ≠ 30% off.

Calculation breakdown:
- Original: $100
- First discount (20%): $100 - $20 = $80
- Second discount (10%): $80 - $8 = $72
- Total discount: $28 (28% effective, not 30%)

Why not additive? Prevents abuse. If discounts added (20% + 10% + 15% = 45% off), users could stack coupons for excessive discounts. Sequential application limits total possible discount even with multiple codes.

**Discount ordering:** Order matters with percentage discounts. 20% off then 10% off = $72. But 10% off then 20% off = $100 × 0.90 × 0.80 = $72 (same result). Mathematically equivalent due to commutative property of multiplication. However, if mixing fixed and percentage discounts, order matters: $10 off then 20% off ≠ 20% off then $10 off.

### Fixed vs Percentage Discounts

**Percentage discount:** Scales with price. 25% off $100 = $25 saved. 25% off $1000 = $250 saved. Fair for products with varying prices. Example: "25% off all items" sale.

**Fixed discount:** Same amount regardless of price. $20 off coupon saves $20 on $100 item (20% effective) or $200 item (10% effective). Better for specific promotions: "$50 off orders over $200". Minimum purchase requirements prevent abuse (can't use $50 off on $10 item).

**Buy X get Y% off:** Quantity-based percentage discount. "Buy 3 or more, get 15% off". Requires: count quantity, check threshold, apply discount if met. Example: 5 items at $20 each = $100. 15% off = $85 total ($17 per item effective).

### Tax and Discount Interaction

**Discount before tax (most common):** Calculate discount on subtotal, then add tax on discounted amount.
- Subtotal: $100
- Discount (20%): -$20
- Discounted subtotal: $80
- Tax (8%): $6.40
- Total: $86.40

**Discount after tax (rare):** Calculate tax on original price, then apply discount to total.
- Subtotal: $100
- Tax (8%): $8
- Total before discount: $108
- Discount (20%): -$21.60
- Final total: $86.40

Result is the same mathematically, but "discount before tax" is standard practice and customer expectation.

This tool calculates discounts with precision, handles stacked promotions correctly, and provides clear breakdown of original price, savings, and final cost.`
  },

  useCases: [
    {
      title: "E-commerce Shopping Cart Discount Logic",
      description: "Implement shopping cart discount calculation for coupon codes, sales, and promotions. Calculate final price after percentage discounts, display savings, and handle edge cases like minimum purchase requirements.",
      example: `// Shopping cart discount calculation:
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Coupon {
  code: string;
  discountPercent: number;
  minPurchase?: number;
  maxDiscount?: number;
}

function calculateDiscount(
  items: CartItem[],
  coupon?: Coupon
): { subtotal: number; discount: number; final: number } {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );

  let discount = 0;

  if (coupon) {
    // Check minimum purchase
    if (coupon.minPurchase && subtotal < coupon.minPurchase) {
      throw new Error(\`Minimum purchase \${coupon.minPurchase} required\`);
    }

    // Calculate discount
    discount = subtotal * (coupon.discountPercent / 100);

    // Apply maximum discount cap
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  }

  const final = subtotal - discount;

  return { subtotal, discount, final };
}

// Example usage:
const cart = [
  { id: '1', name: 'Laptop', price: 999.99, quantity: 1 },
  { id: '2', name: 'Mouse', price: 29.99, quantity: 2 }
];

const coupon = {
  code: 'SAVE20',
  discountPercent: 20,
  minPurchase: 50,
  maxDiscount: 200
};

const result = calculateDiscount(cart, coupon);
// subtotal: $1059.97
// discount: $200 (capped, would be $211.99)
// final: $859.97`
    },
    {
      title: "Subscription Annual Discount Pricing",
      description: "Calculate subscription pricing with annual plan discounts. Show monthly and annual costs, savings amount, and effective monthly rate when paying annually to encourage annual subscriptions.",
      example: `// Subscription pricing with annual discount:
interface SubscriptionPlan {
  name: string;
  monthlyPrice: number;
  annualDiscountPercent: number;
}

function calculateSubscriptionPricing(plan: SubscriptionPlan) {
  const monthlyTotal = plan.monthlyPrice * 12;

  const annualDiscount = monthlyTotal * (plan.annualDiscountPercent / 100);
  const annualPrice = monthlyTotal - annualDiscount;
  const effectiveMonthly = annualPrice / 12;

  return {
    monthly: {
      price: plan.monthlyPrice,
      yearlyTotal: monthlyTotal
    },
    annual: {
      price: annualPrice,
      discount: annualDiscount,
      effectiveMonthly,
      savingsPercent: plan.annualDiscountPercent
    }
  };
}

// Example: SaaS pricing
const proPlan = {
  name: 'Pro',
  monthlyPrice: 29.99,
  annualDiscountPercent: 20
};

const pricing = calculateSubscriptionPricing(proPlan);

// Display:
// Monthly: $29.99/month ($359.88/year)
// Annual: $287.90/year (Save $71.98 - 20% off)
// Effective: $23.99/month when billed annually

// Calculate break-even:
// $71.98 saved / $29.99 per month = 2.4 months saved
// "Pay for 10 months, get 12 months"`
    },
    {
      title: "Stacked Discount Calculation",
      description: "Handle multiple discounts applied sequentially: site-wide sale, category discount, loyalty reward. Calculate effective total discount percentage and prevent discount stacking abuse through proper sequential application.",
      example: `// Stacked discounts calculation:
interface Discount {
  name: string;
  percent: number;
  priority: number; // Lower = applied first
}

function calculateStackedDiscounts(
  originalPrice: number,
  discounts: Discount[]
): {
  steps: { name: string; discount: number; newPrice: number }[];
  finalPrice: number;
  totalDiscount: number;
  effectivePercent: number;
} {
  // Sort by priority
  const sorted = [...discounts].sort((a, b) => a.priority - b.priority);

  let currentPrice = originalPrice;
  const steps = [];

  // Apply each discount sequentially
  for (const discount of sorted) {
    const discountAmount = currentPrice * (discount.percent / 100);
    currentPrice -= discountAmount;

    steps.push({
      name: discount.name,
      discount: discountAmount,
      newPrice: currentPrice
    });
  }

  const totalDiscount = originalPrice - currentPrice;
  const effectivePercent = (totalDiscount / originalPrice) * 100;

  return {
    steps,
    finalPrice: currentPrice,
    totalDiscount,
    effectivePercent
  };
}

// Example: Black Friday sale
const price = 200;
const discounts = [
  { name: 'Black Friday Sale', percent: 25, priority: 1 },
  { name: 'Electronics Category', percent: 10, priority: 2 },
  { name: 'Gold Member Loyalty', percent: 5, priority: 3 }
];

const result = calculateStackedDiscounts(price, discounts);

// Steps:
// 1. Black Friday: $50 off → $150
// 2. Category: $15 off → $135
// 3. Loyalty: $6.75 off → $128.25
// Total saved: $71.75 (35.9% effective, not 40%)`
    },
    {
      title: "Promotional Pricing Comparison Tool",
      description: "Build price comparison feature showing multiple discount scenarios. Calculate savings for different promotional offers to help users choose best deal. Display side-by-side comparison with effective savings.",
      example: `// Compare multiple promotional offers:
interface Promotion {
  name: string;
  type: 'percent' | 'fixed' | 'bogo';
  value: number;
  minPurchase?: number;
}

function comparePromotions(
  originalPrice: number,
  quantity: number,
  promotions: Promotion[]
) {
  const results = promotions.map(promo => {
    const subtotal = originalPrice * quantity;
    let finalPrice = subtotal;
    let savings = 0;

    if (promo.minPurchase && subtotal < promo.minPurchase) {
      return {
        name: promo.name,
        valid: false,
        reason: \`Requires \${promo.minPurchase} minimum\`
      };
    }

    switch (promo.type) {
      case 'percent':
        savings = subtotal * (promo.value / 100);
        finalPrice = subtotal - savings;
        break;

      case 'fixed':
        savings = promo.value;
        finalPrice = subtotal - promo.value;
        break;

      case 'bogo':
        // Buy one get one X% off
        const freeQuantity = Math.floor(quantity / 2);
        savings = originalPrice * freeQuantity * (promo.value / 100);
        finalPrice = subtotal - savings;
        break;
    }

    return {
      name: promo.name,
      valid: true,
      finalPrice,
      savings,
      effectivePercent: (savings / subtotal) * 100
    };
  });

  // Sort by best deal (highest savings)
  return results
    .filter(r => r.valid)
    .sort((a, b) => b.savings - a.savings);
}

// Example comparison:
const price = 49.99;
const qty = 3;
const promos = [
  { name: '25% off', type: 'percent', value: 25 },
  { name: '$30 off', type: 'fixed', value: 30, minPurchase: 100 },
  { name: 'BOGO 50% off', type: 'bogo', value: 50 }
];

// Best deal wins!`
    }
  ],

  howToUse: {
    title: "How to Use This Discount Calculator",
    content: `This tool calculates discount amounts, final prices, and savings percentages. Supports single discounts, stacked discounts, and reverse calculations (find original price from discounted price).

### Calculating Basic Discounts

**Enter original price:** Type the base price before any discount. Supports decimal values ($99.99, $1,299.00). This is the "regular price" or "MSRP".

**Enter discount percentage:** Input the discount rate (25%, 50% off, etc.). Tool automatically calculates both discount amount and final price.

**View results:**
- **Discount amount:** Dollar value saved ($25.00)
- **Final price:** Price after discount ($75.00)
- **Savings percent:** Confirmed discount rate (25%)

### Understanding Stacked Discounts

When multiple discounts apply, they stack multiplicatively (sequential), not additively.

**Example:** $100 item with 20% off + 10% off
- Apply first discount: $100 × 0.80 = $80
- Apply second discount: $80 × 0.90 = $72
- **Total effective discount: 28%** (not 30%)

Why? Each discount applies to the already-reduced price, not the original. This prevents excessive stacking.

**Calculating stacked discounts:**
1. Enter original price ($100)
2. Apply first discount (20%) → see result ($80)
3. Take that result as "new original"
4. Apply second discount (10%) → final result ($72)

### Reverse Calculations

**Find original price from discounted price:**
- Have: Final price $75, discount 25%
- Want: Original price
- Formula: original = final / (1 - discount/100)
- Result: $75 / 0.75 = $100

**Find discount percent from prices:**
- Have: Original $100, final $75
- Want: Discount percent
- Formula: percent = (original - final) / original × 100
- Result: ($100 - $75) / $100 × 100 = 25%

### Comparing Multiple Discounts

**Scenario:** Which is better - 25% off or $20 off?
- Depends on original price!
- $100 item: 25% off = $75 (save $25), $20 off = $80 (save $20) → 25% better
- $50 item: 25% off = $37.50 (save $12.50), $20 off = $30 (save $20) → $20 better

**Break-even point:** Where percentage and fixed discount are equal.
- 25% off vs $20 off breaks even at $80
- At $80: 25% = $20, so both save $20
- Above $80: percentage wins. Below $80: fixed wins.

### Tax Considerations

**Standard practice:** Calculate discount before tax
1. Original price: $100
2. Discount (20%): -$20 → $80
3. Tax (8%): +$6.40 → **$86.40 total**

**Why before tax:** Customers expect tax on actual price paid (discounted), not on original price. Mathematically equivalent to "discount after tax" but clearer communication.

### Common Discount Scenarios

**Sale pricing:** "30% off all items" - apply percentage to each item, show original and sale price.

**Coupon codes:** "$10 off orders over $50" - fixed discount with minimum purchase requirement.

**Loyalty rewards:** "Gold members get 15% off" - percentage discount based on customer tier.

**Volume discounts:** "Buy 5+, get 10% off" - quantity threshold triggers percentage discount.

**Clearance:** "Additional 50% off already reduced items" - stacked discount (sale price becomes new original for second discount).

### Best Practices

**Show savings clearly:** Display original price, discount amount, and final price. Transparency builds trust.

**Highlight percentage:** "Save 25% ($25.00)" - show both percentage and dollar amount.

**Use strikethrough for original:** ~~$100.00~~ $75.00 - visually indicates discount.

**Calculate before checkout:** Validate discount codes and show updated total before payment to avoid surprise prices.`,
    steps: [
      {
        name: "Enter Original Price",
        text: "Type the base price before discount. Supports decimal values for precise amounts. This is the regular or MSRP price."
      },
      {
        name: "Input Discount Percentage",
        text: "Enter the discount rate as percentage (10%, 25%, 50%). Tool calculates discount amount and final price automatically."
      },
      {
        name: "View Savings Breakdown",
        text: "See detailed calculation: original price, amount saved, final price, and confirmed percentage. All values formatted as currency."
      },
      {
        name: "Apply Additional Discounts",
        text: "For stacked discounts, use final price as new original and apply next discount. Tool calculates compound effect correctly."
      }
    ]
  },

  faqs: [
    {
      question: "How do I calculate the final price after a discount?",
      answer: "Multiply original price by (1 - discount%/100). Example: $100 with 25% off = $100 × (1 - 25/100) = $100 × 0.75 = $75. Or calculate discount amount first: $100 × 0.25 = $25 discount, then subtract: $100 - $25 = $75 final price. Both methods give same result."
    },
    {
      question: "Why don't multiple discounts add up? (20% + 10% ≠ 30%)",
      answer: "Discounts apply sequentially (multiplicatively), not additively. 20% off + 10% off: First discount gives $100 × 0.80 = $80. Second discount applies to $80: $80 × 0.90 = $72. Total effective discount: 28%, not 30%. This prevents excessive stacking and limits total possible discount even with multiple codes."
    },
    {
      question: "How do I find the original price if I only know the discounted price?",
      answer: "Divide discounted price by (1 - discount%/100). Example: Final price $75 after 25% off. Original = $75 / (1 - 0.25) = $75 / 0.75 = $100. This reverse calculation is useful for understanding pre-sale prices or verifying advertised discounts match actual savings."
    },
    {
      question: "Which is better: percentage discount or fixed dollar discount?",
      answer: "Depends on original price. For expensive items, percentage discounts save more (25% off $1000 = $250 saved). For cheap items, fixed discounts may be better ($10 off $30 = 33% effective vs 25% = $7.50 saved). Break-even point: where both save equal amount. Example: 25% off vs $20 off breaks even at $80 (25% of $80 = $20)."
    },
    {
      question: "Should tax be calculated before or after the discount?",
      answer: "Standard practice: calculate discount first, then tax on discounted amount. Example: $100 item, 20% off, 8% tax. $100 - $20 = $80, then $80 × 1.08 = $86.40 total. This is customer expectation (tax on actual price paid). Mathematically equivalent to other order but clearer communication."
    },
    {
      question: "How do subscription annual discounts work?",
      answer: "Compare annual cost vs monthly. Example: $10/month plan = $120/year. Annual with 20% off = $96/year ($8/month effective). You save $24 per year. To calculate discount needed: if monthly = $10/month ($120/year) and annual = $99/year, discount = ($120 - $99) / $120 × 100 = 17.5% off for annual plan."
    },
    {
      question: "How do I calculate effective discount percentage for stacked discounts?",
      answer: "Compare final price to original price: (original - final) / original × 100. Example: $100 with 20% off, then 10% off = $72 final. Effective discount: ($100 - $72) / $100 × 100 = 28%. Or use formula: 1 - (1 - d1/100) × (1 - d2/100) = 1 - 0.80 × 0.90 = 0.28 = 28%."
    },
    {
      question: "What's the difference between discount and markup?",
      answer: "Discount reduces price (sell below original). Markup increases price (sell above cost). Example: Item costs $50, marked up 50% = $75 selling price. Then discounted 50% ≠ back to $50. It's $75 × 0.50 = $37.50. Discount and markup percentages apply to different base values (markup to cost, discount to selling price), so they're not symmetric."
    },
    {
      question: "How do Buy One Get One (BOGO) deals calculate?",
      answer: "BOGO 50% off: Buy 2 items, second is 50% off. Total discount: 25% on 2-item purchase (not 50%). Example: $40 each. Pay $40 + $20 = $60 for both (vs $80). Savings: $20 on $80 = 25%. BOGO free = 50% off total. $40 each, pay $40 get 2 = 50% off. Calculate per item to find effective discount rate."
    },
    {
      question: "Is my discount calculation data private?",
      answer: "Yes, all discount calculations happen entirely in your browser using client-side JavaScript math. No prices, discount rates, or calculated values are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for calculating retail pricing, wholesale margins, or confidential business discounts."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All discount calculations happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math operations. Computations happen locally on your device.
- **No Server Uploads:** We don't have backend servers to process calculations. The tool works completely offline after page load.
- **No Data Storage:** Input prices, discount rates, and calculated values are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what prices you calculate, what discounts you apply, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your financial data.

Safe for calculating retail pricing strategies, wholesale margins, promotional campaign pricing, or confidential business discount structures. Use with confidence for competitive pricing analysis or internal cost calculations.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Precision": "Full decimal",
    "Stacked Discounts": "Supported",
    "Currency Format": "Yes",
    "Server Uploads": "0"
  }
};
