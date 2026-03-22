/**
 * Percentage Calculator Tool Guide Content
 * Comprehensive developer guide for percentage calculations
 */

import type { ToolGuideContent } from "./types";

export const percentageGuideContent: ToolGuideContent = {
  toolName: "Percentage Calculator",
  toolPath: "/percentage",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Choose Calculation Type",
      description: "Select from six common percentage operations: What is X% of Y? (basic), X is what % of Y? (proportion), What % increase/decrease from X to Y? (change), and increase/decrease X by Y% (apply percentage). Each mode solves a different mathematical relationship."
    },
    {
      title: "Enter Your Numbers",
      description: "Input the numeric values for your calculation. Support for decimals and large numbers. Fields are labeled contextually based on selected operation - 'percentage' and 'value' for basic calculations, 'initial' and 'final' for change calculations."
    },
    {
      title: "View Result Instantly",
      description: "See the calculated result displayed prominently with full precision. For percentage calculations, includes decimal places. For value calculations, shows formatted numbers. Results update in real-time as you type."
    },
    {
      title: "Copy or Apply Result",
      description: "Click the copy icon to grab the result value for use in spreadsheets, code, or reports. Use results for fee calculations, discount pricing, performance metrics, or business analytics."
    }
  ],

  introduction: {
    title: "What is Percentage Calculation?",
    content: `Percentage calculation expresses proportional relationships between numbers as fractions of 100. The word "percent" means "per hundred" - 25% represents 25 parts out of 100 total parts. Percentages are fundamental to business analytics, financial calculations, performance metrics, statistics, and data visualization.

Developers encounter percentage calculations constantly: API rate limit usage (75% of quota), test coverage metrics (85% lines covered), database growth rates (15% month-over-month increase), cache hit ratios (92% of requests served from cache), error rates (0.5% of requests failed), performance improvements (30% faster response times), and pricing calculations (20% discount applied).

### Why Percentage Calculations Matter for Developers

**Business metrics:** Product analytics track conversion rates (5% of visitors sign up), churn rates (2% monthly), retention rates (98% month-1 retention), growth rates (50% YoY revenue increase). Dashboards display these as percentages because they're easier to compare across different absolute scales. A 5% conversion rate is meaningful whether you have 100 or 100,000 visitors.

**Performance monitoring:** APM tools report percentage-based metrics: CPU utilization (65% average), memory usage (78% of allocated RAM), disk I/O wait (12% of time), cache hit rate (94% from Redis), error rate (0.3% of requests). Alerting thresholds use percentages: trigger when CPU > 80% for 5 minutes.

**Financial calculations:** E-commerce platforms calculate discounts (25% off), sales tax (8.5% added), processing fees (2.9% + $0.30 per transaction), referral commissions (10% of sale), subscription pricing tiers (save 20% on annual plan), currency conversion spreads (1.5% markup), and revenue share splits (70/30 split).

**Quality metrics:** Test coverage targets (>80% line coverage), SLA uptime guarantees (99.9% availability = 43 minutes downtime/month), error budgets (99.95% success rate allows 0.05% errors), CI/CD success rates (95% of deployments succeed), and code review acceptance rates (92% of PRs approved first time).

**Data analysis:** Database query optimization shows improvement percentages (40% faster after indexing), API response time improvements (reduced P95 latency by 25%), bundle size reductions (webpack optimization cut size by 35%), and memory leak fixes (heap usage decreased 60% after patch).

### Common Percentage Calculation Types

**Basic percentage (What is X% of Y?):** Calculate a portion. "What is 15% of 200?" = 30. Used for: applying discounts, calculating fees, determining quotas, or allocating resources. Example: 2.9% payment processing fee on $100 transaction = $2.90 fee.

**Proportion (X is what % of Y?):** Express a part as percentage of whole. "45 is what % of 150?" = 30%. Used for: completion rates, utilization metrics, progress tracking, or success rates. Example: 340 tests passed out of 400 total = 85% pass rate.

**Percentage increase:** Calculate growth from initial to final value. "From 50 to 65" = 30% increase. Used for: performance improvements, traffic growth, revenue growth, or metric increases. Formula: ((final - initial) / initial) × 100.

**Percentage decrease:** Calculate reduction from initial to final value. "From 80 to 60" = 25% decrease. Used for: load time reductions, cost savings, error rate improvements, or memory usage decreases. Formula: ((initial - final) / initial) × 100.

**Increase by percentage:** Apply growth to base value. "Increase 100 by 20%" = 120. Used for: price increases, scaling capacity, markup calculations, or projecting growth. Formula: base + (base × percentage / 100).

**Decrease by percentage:** Apply reduction to base value. "Decrease 100 by 20%" = 80. Used for: discount pricing, cost reductions, downscaling resources, or applying savings. Formula: base - (base × percentage / 100).

### Percentage vs. Percentage Points

A critical distinction: percentage change vs. percentage point change. If conversion rate increases from 2% to 4%, that's:
- 2 percentage point increase (4% - 2%)
- 100% relative increase ((4% - 2%) / 2% × 100%)

Always clarify which measure you're using. "Error rate decreased by 50%" is ambiguous - from 4% to 2% (50% relative decrease), or from 4% to 3.5% (0.5 percentage point decrease)?

This tool handles all common percentage calculation types with instant results and full precision. All processing happens client-side with zero latency.`
  },

  useCases: [
    {
      title: "Calculate API Rate Limit Usage",
      description: "Determine how much of your API quota you've consumed. APIs often return headers like X-RateLimit-Remaining: 450 out of X-RateLimit-Limit: 500. Calculate percentage to know when to throttle requests or warn users.",
      example: `// GitHub API rate limit check:
const remaining = 450;
const limit = 500;
const used = limit - remaining; // 50 requests

// Calculate: 50 is what % of 500?
// Result: 10% of quota used
// Remaining: 90%

// Warning threshold:
if ((remaining / limit) < 0.2) {
  console.warn('Only 20% of API quota remaining');
}`
    },
    {
      title: "Calculate E-commerce Discounts and Fees",
      description: "Apply percentage-based discounts, calculate sales tax, and compute payment processing fees. Essential for shopping carts, checkout flows, and order total calculations.",
      example: `// Product pricing calculation:
const basePrice = 99.99;
const discount = 25; // 25% off sale

// Discount amount: What is 25% of 99.99?
// = $24.99 discount

// Sale price: Decrease 99.99 by 25%
// = $75.00 sale price

// Add sales tax: Increase 75 by 8.5%
// = $81.38 final price

// Processing fee: What is 2.9% of 81.38?
// = $2.36 Stripe fee`
    },
    {
      title: "Track Test Coverage Metrics",
      description: "Calculate code coverage percentages from test reports. CI/CD pipelines often require minimum coverage thresholds. Convert absolute numbers (lines covered) to percentages for meaningful comparison across projects.",
      example: `// Jest test coverage report:
const totalLines = 1247;
const coveredLines = 1084;

// Calculate: 1084 is what % of 1247?
// Result: 86.93% line coverage ✓ (meets 80% threshold)

// Statements: 523 / 587 = 89.10%
// Branches: 234 / 298 = 78.52% ⚠ (below 80%)
// Functions: 145 / 156 = 92.95%

// Coverage delta calculation:
// Was 84%, now 86.93%
// Increase: 2.93 percentage points`
    },
    {
      title: "Measure Performance Improvements",
      description: "Quantify optimization results as percentage improvements. Stakeholders understand '40% faster' better than 'reduced from 850ms to 510ms'. Calculate both absolute and relative improvements for reporting.",
      example: `// API response time optimization:
const beforeMs = 850;
const afterMs = 510;

// Absolute improvement: 850 - 510 = 340ms saved
// Percentage decrease: From 850 to 510
// = 40% faster response time

// Database query optimization:
// Before: 2.4s average query time
// After: 0.8s average query time
// = 66.67% faster queries

// Bundle size reduction:
// Before: 1.2 MB
// After: 820 KB
// = 31.67% smaller bundle`
    }
  ],

  howToUse: {
    title: "How to Use This Percentage Calculator",
    content: `This tool provides six different percentage calculation modes covering all common percentage operations. Select the calculation type that matches your problem, enter values, and get instant results.

### Calculation Modes Explained

**1. What is X% of Y?** (Basic Percentage)
Calculate a portion of a value. Use when you need to find what percentage amount represents.
- Example: What is 15% of 200? Answer: 30
- Use cases: Calculate 20% tip, find 2.9% payment fee, determine 15% discount amount

**2. X is what % of Y?** (Proportion)
Express one number as a percentage of another. Use when you need to find the percentage relationship.
- Example: 45 is what % of 150? Answer: 30%
- Use cases: Calculate test coverage (850 of 1000 lines), API usage (450 of 500 calls), completion rate (75 of 100 tasks)

**3. What % increase from X to Y?** (Percentage Increase)
Calculate growth rate between two values. Use for metrics that improved.
- Example: From 50 to 65? Answer: 30% increase
- Use cases: Traffic growth, revenue increase, performance improvement, user growth

**4. What % decrease from X to Y?** (Percentage Decrease)
Calculate reduction rate between two values. Use for metrics that decreased.
- Example: From 80 to 60? Answer: 25% decrease
- Use cases: Load time reduction, cost savings, error rate improvement, memory usage decrease

**5. Increase X by Y%** (Apply Increase)
Add a percentage to a base value. Use when applying growth or markup.
- Example: Increase 100 by 20%? Answer: 120
- Use cases: Price markup, capacity scaling, growth projection, inflation adjustment

**6. Decrease X by Y%** (Apply Decrease)
Subtract a percentage from a base value. Use when applying reduction or discount.
- Example: Decrease 100 by 20%? Answer: 80
- Use cases: Discount pricing, cost reduction, downscaling, percentage-off calculations

### Entering Values

All numeric fields accept:
- Integers: 100, 1500, 99
- Decimals: 99.99, 15.5, 2.9
- Large numbers: 1500000, 999999
- Negative numbers: -50, -12.5 (for some calculations)

Values update results in real-time as you type. No need to press enter or click calculate.

### Understanding Results

Results display with appropriate precision:
- Percentages: Shown with 2 decimal places (85.67%)
- Values: Shown with 2 decimal places for money ($24.99)
- Large numbers: Formatted with commas for readability (1,234,567)

### Common Mistakes to Avoid

**Confusing percentage and percentage points:** "From 2% to 4%" is a 2 percentage point increase, but a 100% relative increase.

**Reverse operations:** "Increase 100 by 20% then decrease by 20%" doesn't return to 100. You get 120, then 96. Percentages aren't symmetric.

**Chaining discounts:** "30% off, then additional 20% off" is NOT 50% off total. It's: 100 → 70 (30% off) → 56 (20% off of 70) = 44% total discount.`,
    steps: [
      {
        name: "Select Operation",
        text: "Choose the calculation type from the dropdown menu that matches your problem: basic percentage, proportion, increase/decrease, or apply percentage."
      },
      {
        name: "Enter Values",
        text: "Input your numeric values in the labeled fields. Support for decimals and large numbers. Fields are labeled contextually based on selected operation."
      },
      {
        name: "View Result",
        text: "See the calculated result displayed instantly with full precision. Updates in real-time as you type."
      },
      {
        name: "Copy Result",
        text: "Click the copy icon to grab the result value for use in spreadsheets, reports, or code. Result includes appropriate precision for the operation type."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between percentage and percentage points?",
      answer: "Percentage points measure absolute difference between percentages. Percentage measures relative change. If error rate drops from 4% to 2%, that's a 2 percentage point decrease (4% - 2%), but a 50% relative decrease ((4% - 2%) / 4% × 100%). Always specify which measure you're using. 'Error rate decreased by 2%' is ambiguous - does it mean from 4% to 2% (50% relative decrease) or from 4% to 3.92% (2% relative decrease of 4%)?"
    },
    {
      question: "Why doesn't increasing by 20% then decreasing by 20% return to original?",
      answer: "Percentages apply to different base values. Start with 100: increase by 20% → 120 (20% of 100 = 20). Now decrease 120 by 20% → 96 (20% of 120 = 24). You subtract more than you added because the base changed. Percentages aren't symmetric operations. To reverse a 20% increase, you must decrease by 16.67% (20/120 × 100)."
    },
    {
      question: "How do I calculate stacked discounts?",
      answer: "Apply discounts sequentially, not additively. '30% off, then 20% off' is NOT 50% off. Start with $100: apply 30% off → $70 (saved $30). Apply 20% off to $70 → $56 (saved $14). Total: paid $56, saved $44 = 44% total discount, not 50%. Each discount applies to the reduced price, not the original. This converter helps by chaining: decrease by 30%, then decrease result by 20%."
    },
    {
      question: "How do I calculate API rate limit percentage remaining?",
      answer: "If your API returns X-RateLimit-Remaining: 450 and X-RateLimit-Limit: 500, use 'X is what % of Y' mode: 450 is what % of 500 = 90% remaining. For percentage used: calculate 50 (limit - remaining) is what % of 500 = 10% used. Set alerts when remaining < 20% to throttle requests before hitting hard limits."
    },
    {
      question: "What percentage test coverage should I aim for?",
      answer: "Industry standards: 80% line coverage is good, 90%+ is excellent. But coverage percentage alone doesn't guarantee quality. 100% coverage with poor assertions is worse than 80% coverage with thorough tests. Focus on covering critical paths, error handling, and edge cases. Use this calculator to track: covered_lines is what % of total_lines. CI/CD pipelines often require minimum thresholds (like >80%) to pass."
    },
    {
      question: "How do I calculate payment processing fees?",
      answer: "Stripe charges 2.9% + $0.30 per transaction. For $100 sale: 2.9% of $100 = $2.90 + $0.30 fixed = $3.20 total fee. You net $96.80. To calculate gross amount needed to net $100 after fees: divide by (1 - 0.029) then add $0.30. For tiered pricing, apply percentage to each tier's range separately."
    },
    {
      question: "What's a good cache hit rate percentage?",
      answer: "Redis/Memcached: 90%+ hit rate is good, 95%+ is excellent. Below 80% indicates cache is ineffective (too small, wrong TTL, poor key strategy). Calculate: cache_hits is what % of total_requests. Example: 4,750 hits from 5,000 requests = 95% hit rate. Low hit rates increase database load and response times. Monitor and tune cache size, eviction policies, and TTL settings."
    },
    {
      question: "How do I measure performance improvement as percentage?",
      answer: "Use percentage decrease calculation. Old load time 850ms, new 510ms: select 'What % decrease from X to Y', enter 850 and 510, result is 40% faster. Always specify what you're measuring and direction: '40% faster response time' or 'response time decreased 40%'. Include absolute values too: 'Response time decreased 40% (from 850ms to 510ms)' for full context."
    },
    {
      question: "What does 99.9% uptime SLA actually mean?",
      answer: "99.9% uptime = 0.1% downtime allowed = 43 minutes per month (30-day month) or 8.76 hours per year. 99.95% = 21 minutes/month. 99.99% = 4.3 minutes/month. 99.999% = 26 seconds/month. Each additional '9' is exponentially harder and more expensive. Calculate downtime budget: 0.1% of 43,200 minutes (30 days) = 43.2 minutes. Track actual downtime vs. budget."
    },
    {
      question: "Is my calculation data private?",
      answer: "Yes, all percentage calculations happen entirely in your browser using client-side JavaScript math operations. No values are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests are made with your data. Safe for calculating confidential business metrics, financial data, or proprietary performance statistics."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All percentage calculations happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math operations. Computations happen locally on your device.
- **No Server Uploads:** We don't have backend servers to process calculations. The tool works completely offline after first page load.
- **No Data Storage:** Input values and calculation results are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what values you calculate, what operations you use, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your data.

Safe for calculating confidential business metrics, proprietary financial data, sensitive performance statistics, or regulated analytics calculations. Use with confidence for revenue calculations, internal metrics, or competitive analysis data.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Operations": "6 types",
    "Precision": "Full float",
    "Decimal Support": "Yes",
    "Server Uploads": "0"
  }
};
