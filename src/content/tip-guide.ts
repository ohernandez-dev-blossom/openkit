/**
 * Tip Calculator Tool Guide Content
 * Comprehensive developer guide for tip and bill splitting calculations
 */

import type { ToolGuideContent } from "./types";

export const tipGuideContent: ToolGuideContent = {
  toolName: "Tip Calculator",
  toolPath: "/tip",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Bill Amount",
      description: "Type the total bill amount before tip. Supports decimals for precise amounts (e.g., $47.52). Common for restaurant checks, food delivery orders, service appointments, or any scenario where tipping is customary."
    },
    {
      title: "Select Tip Percentage",
      description: "Choose from common tip percentages (15%, 18%, 20%, 25%) or enter custom percentage. US tipping standards: 15-20% for table service, 18-22% for exceptional service, 10-15% for counter service or delivery."
    },
    {
      title: "Enter Number of People (Optional)",
      description: "Specify how many people are splitting the bill. Tool calculates per-person amount including tip. Leave as 1 for no splitting. Useful for group dinners, shared food orders, or team outings."
    },
    {
      title: "View Calculated Amounts",
      description: "See tip amount, total bill with tip, and per-person cost (if splitting). All values shown with proper currency formatting. Copy individual amounts or share full breakdown with group."
    }
  ],

  introduction: {
    title: "What is Tip Calculation?",
    content: `Tip calculation determines gratuity amounts based on bill totals and percentage rates, with optional bill splitting across multiple people. While primarily used for restaurant dining, tip calculations apply to any service scenario: food delivery, rideshare trips, hair salons, hotel housekeeping, tour guides, and other service industries where tipping is customary.

Software developers encounter tip calculations when building: restaurant POS systems with automatic gratuity calculation, food delivery apps (DoorDash, Uber Eats) with suggested tips, payment processing for service businesses, expense tracking apps splitting group meals, travel apps calculating tipping in foreign countries, and financial management tools analyzing spending patterns including tips.

### Why Tip Calculations Matter for Developers

**E-commerce and food delivery platforms:** Apps like Uber Eats, DoorDash, Grubhub calculate tips as percentage of order subtotal (before taxes and fees) or allow custom dollar amounts. Suggested tip options (15%, 18%, 20%) increase average tips vs. manual entry. Calculating tip on subtotal vs. total (with tax) affects customer satisfaction - convention is tip on pre-tax amount.

**Point of sale systems:** Restaurant POS systems auto-calculate suggested tips on receipts and payment terminals. Display multiple tip options (18%, 20%, 22%) to streamline payment flow. For large parties, auto-add 18-20% gratuity. Calculate tip on subtotal before discounts/coupons, or on discounted amount - implementation choice affects merchant and customer satisfaction.

**Expense management:** Business expense tools (Expensify, Concur) require tip amount separation from bill total for accounting and tax purposes. Meal expenses: base amount + tip + tax = total. Tip typically not reimbursable for business meals in some policies. Calculate components correctly for accurate expense reporting and compliance.

**International applications:** Tipping customs vary globally. US: 15-20% standard for restaurants. Europe: 5-10% or service charge included. Japan: tipping uncommon, can be offensive. Apps serving international markets need region-aware tip suggestions. Currency conversion adds complexity: tip 20% on $50 USD meal = tip 20% on converted amount in local currency.

**Bill splitting logic:** Group dining apps calculate per-person amounts including tip. Complexities: splitting evenly vs. by items ordered, tip on individual amounts vs. tip on total then split, rounding per-person amounts to nearest cent avoiding penny discrepancies. Edge case: 3 people splitting $100 bill + 20% tip = $120 ÷ 3 = $40/person. But if calculated as: $100 ÷ 3 = $33.33 + 20% tip = $39.996 ≈ $40 each. Math works out but order of operations matters for validation.

### Tip Percentage Standards

**US restaurant service:** 15% for acceptable service (bare minimum), 18-20% for good service (standard), 22-25% for exceptional service or fine dining, 10% or less signals poor service (rare, consider speaking to manager first).

**Delivery services:** 15-20% of order total for standard delivery, $3-5 minimum for small orders (percentage can be high), 20-25% for bad weather or late-night delivery, $2-3 per pizza for pizza delivery specifically.

**Rideshare and taxis:** 15-20% of fare for normal ride, 20-25% for exceptional service or help with luggage, $1-2 for very short rides (minimum courtesy).

**Personal services:** 15-20% for haircuts, spa services, nail salons, 20-25% for stylists you see regularly, $5-10 for simple services (shampoo only, etc.).

### Mathematical Formulas

**Tip amount:** bill × (tip_percentage ÷ 100)
Example: $50 bill × (20 ÷ 100) = $50 × 0.20 = $10 tip

**Total with tip:** bill + tip = bill + (bill × tip_percentage ÷ 100) = bill × (1 + tip_percentage ÷ 100)
Example: $50 + $10 = $60, or $50 × 1.20 = $60

**Per-person amount (even split):** (bill + tip) ÷ num_people = (bill × (1 + tip_percentage ÷ 100)) ÷ num_people
Example: $60 ÷ 3 = $20 per person

**Reverse calculate tip percentage:** (tip_amount ÷ bill) × 100
Example: $10 tip on $50 bill = (10 ÷ 50) × 100 = 20%

**Tip on subtotal (before tax):** If bill shows subtotal and tax separately, calculate tip on subtotal only (convention). Total payment = subtotal + tax + (subtotal × tip_percentage). Example: $40 subtotal + $3.20 tax (8%) + $8 tip (20% of subtotal) = $51.20 total.

### Rounding Considerations

**Rounding tip:** Round tip to nearest quarter ($0.25) or dollar for cash payments. Digital payments can be exact. Example: 18% of $47.52 = $8.5536 → round to $8.50 or $8.75 depending on preference.

**Rounding per-person:** When splitting, round each person's amount up to avoid underpayment. Example: 3 people splitting $50 bill + $10 tip = $60 ÷ 3 = $20/person exactly. But $51 bill + $10.20 tip = $61.20 ÷ 3 = $20.40/person. If rounding to $20 each, group underpays by $1.20. Round to $21 or $20.50 to cover.

**Cultural contexts:** Some cultures round total to next convenient amount instead of calculating exact percentage. "Keep the change" on round numbers. Calculator approach (exact percentage) vs. convenience approach (round to easy number).

This tool calculates tips with precision, handles bill splitting with correct rounding, and displays all components clearly for transparency in group scenarios.`
  },

  useCases: [
    {
      title: "Calculate Restaurant Bill with Group Splitting",
      description: "Calculate tip and split total among diners for group restaurant meals. Common scenario: 4 people dining, $85 bill before tip, 20% tip, split evenly. Tool calculates tip amount, total with tip, and per-person cost.",
      example: `// Restaurant bill calculation:
const bill = 85.00;
const tipPercent = 20;
const people = 4;

const tipAmount = bill * (tipPercent / 100);
// $85 × 0.20 = $17 tip

const total = bill + tipAmount;
// $85 + $17 = $102 total

const perPerson = total / people;
// $102 ÷ 4 = $25.50 per person

// Display:
// Bill: $85.00
// Tip (20%): $17.00
// Total: $102.00
// Per Person: $25.50 (4 people)`
    },
    {
      title: "Implement Tip Suggestions in Food Delivery App",
      description: "Food delivery apps display suggested tip options (15%, 18%, 20%) or custom amounts. Calculate tips on order subtotal (before delivery fee and tax). Help customers quickly select appropriate tips for drivers.",
      example: `// Food delivery app tip calculation:
const orderSubtotal = 42.50;
const deliveryFee = 3.99;
const tax = 3.40;  // 8% tax

// Tip suggestions on SUBTOTAL (not total):
const tipOptions = [15, 18, 20, 25];
const suggestions = tipOptions.map(percent => ({
  percent,
  amount: (orderSubtotal * percent / 100).toFixed(2)
}));

// Results:
// 15%: $6.38
// 18%: $7.65
// 20%: $8.50
// 25%: $10.63

// Order total with selected tip (20%):
const total = orderSubtotal + deliveryFee + tax + 8.50;
// $42.50 + $3.99 + $3.40 + $8.50 = $58.39`
    },
    {
      title: "Build POS System Auto-Gratuity for Large Parties",
      description: "Restaurant point-of-sale systems automatically add 18-20% gratuity for parties of 6+ people. Calculate gratuity on subtotal, add to bill, and clearly display on receipt. Required in many restaurant policies for large groups.",
      example: `// POS auto-gratuity logic:
const checkDetails = {
  subtotal: 156.75,
  tax: 12.54,  // 8% tax
  partySize: 8
};

// Auto-gratuity threshold:
const autoGratuityMin = 6;
const gratuityRate = 18;

let gratuity = 0;
if (checkDetails.partySize >= autoGratuityMin) {
  gratuity = checkDetails.subtotal * (gratuityRate / 100);
  // $156.75 × 0.18 = $28.22 (rounded)
}

const total = checkDetails.subtotal + checkDetails.tax + gratuity;
// $156.75 + $12.54 + $28.22 = $197.51

// Receipt display:
// Subtotal: $156.75
// Tax: $12.54
// Gratuity (18%, 8 guests): $28.22
// Total: $197.51`
    },
    {
      title: "Expense Report Tip Separation",
      description: "Business expense management requires separating meal base cost, tax, and tip for accounting. Some companies don't reimburse tips or have tip limits. Calculate components correctly for expense policy compliance and tax deduction accuracy.",
      example: `// Expense report breakdown:
const receipt = {
  restaurant: "Steakhouse",
  total: 78.50,
  date: "2024-01-15"
};

// Reverse calculate components:
// (Assume 8% tax, 20% tip on subtotal)
// Let subtotal = S
// Total = S + 0.08×S + 0.20×S = S × 1.28
// S = Total ÷ 1.28

const subtotal = receipt.total / 1.28;
// $78.50 ÷ 1.28 = $61.33

const tax = subtotal * 0.08;
// $61.33 × 0.08 = $4.91

const tip = subtotal * 0.20;
// $61.33 × 0.20 = $12.27

// Expense report:
// Meal: $61.33 (reimbursable)
// Tax: $4.91 (reimbursable)
// Tip: $12.27 (policy: max $15, within limit)
// Total: $78.51 (rounding diff)`
    }
  ],

  howToUse: {
    title: "How to Use This Tip Calculator",
    content: `This tool calculates tip amounts, totals with tip, and per-person costs for bill splitting. Enter bill amount, select tip percentage, optionally specify number of people splitting, and view detailed breakdown.

### Entering Bill Amount

Type the base bill amount before tip. Supports decimal values ($47.52, $123.75). For restaurant bills with separate tax line: enter subtotal (before tax) and calculate tip on that amount (convention), then manually add tax to final total. Some prefer tip on total including tax - adjust approach based on custom.

### Selecting Tip Percentage

Choose from common presets (15%, 18%, 20%, 25%) or enter custom percentage. US standards: 15% minimum for acceptable service, 18-20% for good service, 22-25% for exceptional service. Adjust based on service quality, local customs, or personal preference.

**Service quality guide:**
- **15%:** Acceptable service, no issues but nothing exceptional
- **18%:** Good attentive service, standard for most restaurants
- **20%:** Very good service, efficient and friendly
- **22-25%:** Outstanding service, went above and beyond

### Bill Splitting

Enter number of people splitting the bill. Tool calculates each person's share of total including tip. Assumes even split - everyone pays same amount. For uneven splits (some people ordered more), use calculator to get total, then manually divide based on individual orders.

**Rounding:** Per-person amounts round to nearest cent. If total doesn't divide evenly (e.g., $61 ÷ 3 = $20.33...), calculator shows rounded amounts. To avoid underpayment, some people may need to round up their share.

### Understanding Results Display

**Tip amount:** Calculated tip based on bill × percentage. Example: $50 bill × 20% = $10 tip.

**Total with tip:** Bill + tip amount. Example: $50 + $10 = $60 total.

**Per person (if splitting):** Total ÷ number of people. Example: $60 ÷ 3 = $20 per person.

### Special Scenarios

**Tip on subtotal vs. total:** Convention is tip on subtotal (before tax). If bill shows: Subtotal $50, Tax $4, calculate 20% tip on $50 = $10 tip. Final payment: $50 + $4 + $10 = $64. Some people tip on total ($54), giving $10.80 tip. Both acceptable, subtotal more common.

**Service charges:** Some restaurants add automatic service charge (usually 18-20% for large parties). This IS the tip - don't tip again unless service was exceptional (then add 5-10% more). Check receipt for "Service Charge" or "Gratuity Added" line.

**Minimum tips:** For very small bills (under $10), consider minimum tip of $2-3 regardless of percentage. 20% of $8 coffee = $1.60, but $2 tip is more courteous.

**Delivery minimums:** Food delivery: tip at least $3-5 even on small orders. 20% of $12 order = $2.40, but $3-5 is more appropriate for driver's time and gas.

### Copy and Share

Click copy buttons to grab individual amounts (tip, total, per-person) or copy full breakdown for group chat sharing. Useful for coordinating group payments via Venmo, PayPal, or cash collection.`,
    steps: [
      {
        name: "Enter Bill Amount",
        text: "Type the base bill amount before tip. Use subtotal if calculating tip on pre-tax amount (convention)."
      },
      {
        name: "Select Tip Percentage",
        text: "Choose from presets (15%, 18%, 20%, 25%) or enter custom. Adjust based on service quality and local standards."
      },
      {
        name: "Add Number of People (Optional)",
        text: "Enter how many people are splitting the bill. Leave as 1 for no splitting. Tool calculates per-person amount."
      },
      {
        name: "View and Copy Results",
        text: "See tip amount, total with tip, and per-person cost. Copy individual values or full breakdown to share with group."
      }
    ]
  },

  faqs: [
    {
      question: "Should I tip on the subtotal or the total including tax?",
      answer: "Convention in US is tip on subtotal (before tax), though tipping on total including tax is also acceptable and more generous. Example: $50 subtotal + $4 tax = $54 total. Tip 20% on subtotal = $10 tip (total payment $64). Tip 20% on total = $10.80 tip (total payment $64.80). Difference is small. Servers appreciate either approach. Most POS systems suggest tips based on subtotal."
    },
    {
      question: "What's the standard tip percentage for restaurants in the US?",
      answer: "15-20% is standard for table service in US restaurants. 15% for acceptable service (bare minimum), 18-20% for good service (most common), 22-25% for exceptional service. Less than 15% signals dissatisfaction - better to speak with manager if service was truly poor. Fast casual or counter service: 10-15% or tip jar. Fine dining: 20%+ expected. Tip reflects service quality, not food quality (kitchen separate from service)."
    },
    {
      question: "Do I need to tip if there's already a service charge?",
      answer: "If receipt shows 'Service Charge' or 'Gratuity Included' (usually 18-20% for large parties), this IS the tip - don't tip again unless service was exceptional. Some restaurants add mandatory service charges for groups of 6+ people. Read receipt carefully: 'Service Charge' means tip included, 'Delivery Fee' does NOT include driver tip. When in doubt, ask staff if gratuity is included."
    },
    {
      question: "How do I split the bill fairly when people ordered different amounts?",
      answer: "For even split (everyone pays same): use this calculator, divide total by people. For proportional split (pay for what you ordered): 1) Note each person's items + tax + tip. 2) Calculate each person's subtotal, add their share of tax (their subtotal / total subtotal × total tax), add tip percentage on their subtotal. 3) Sum everyone's amounts to verify equals total. Apps like Splitwise or Tab automate this. For friends, often easier to split evenly and avoid math complexity."
    },
    {
      question: "What if the bill doesn't divide evenly when splitting?",
      answer: "Example: 3 people splitting $61 bill + $12 tip = $73 ÷ 3 = $24.33 per person. Rounding: each person pays $24.33, total = $72.99 (one penny short). Solutions: 1) One person rounds up to $24.34. 2) Everyone rounds up to $24.50 (group overtips by $0.50, generous). 3) Use exact amounts if paying digitally (Venmo $24.33). Cash payments: typically round to nearest quarter or dollar."
    },
    {
      question: "Should I tip on discounts or coupons?",
      answer: "Etiquette: tip on original amount before discount, not discounted amount. Example: $50 meal with 50% off coupon = $25 paid, but tip 20% of $50 = $10 tip (total payment $35). Server provided same service regardless of discount. Tipping on discounted amount penalizes server for restaurant's promotion. Exceptions: gift cards (tip on original amount), comped items (tip on what would have been paid)."
    },
    {
      question: "How much should I tip for food delivery?",
      answer: "Food delivery: 15-20% of order subtotal or $3-5 minimum, whichever is higher. 20% of $12 order = $2.40, but tip $3-5 for driver's time. Large orders (>$100): 15-20% appropriate. Bad weather or late night: 20-25%. Long distance: add extra $2-3. Tip on food subtotal, not including delivery fee or tax. Apps like DoorDash, Uber Eats suggest tips - default options usually fair (15%, 18%, 20%)."
    },
    {
      question: "Do tips vary by country or region?",
      answer: "Yes, tipping customs vary globally. US: 15-20% standard, tipping expected for most services. Europe: 5-10% or service included in bill, rounding up common. Japan: no tipping, can be considered rude. Australia: tipping uncommon, 10% for exceptional service. Middle East: 10-15% where not included. Canada: similar to US, 15-20%. UK: 10-12% for restaurants, service charge often included. Always research local customs when traveling."
    },
    {
      question: "Is there a minimum tip amount I should give?",
      answer: "For small bills, consider minimum tip of $2-3 regardless of percentage. 20% of $8 coffee = $1.60, but $2 minimum more courteous. Delivery: $3-5 minimum even on small orders to cover driver's time and expenses. Rideshare: $2 minimum for short rides. Hair salon: $5 minimum even for simple services. Bar: $1-2 per drink minimum. Percentage guidelines break down for very small transactions - use judgment for minimum appropriate tip."
    },
    {
      question: "Is my tip calculation data private?",
      answer: "Yes, all tip calculations happen entirely in your browser using client-side JavaScript math. No bill amounts, tip percentages, or calculated values are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for calculating tips on business meals, personal dining, or any scenario. Privacy guaranteed for all financial calculations."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All tip calculations happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All calculations use browser-native JavaScript math operations. Processing happens locally on your device.
- **No Server Uploads:** We don't have backend servers to process calculations. Works completely offline after first page load.
- **No Data Storage:** Bill amounts, tip percentages, and calculated values are not saved, logged, stored, or transmitted anywhere.
- **No Analytics on Content:** We don't track what amounts you calculate, what percentages you use, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your data.

Safe for calculating tips on business meals, personal dining, group outings, or any financial scenario. Use with confidence for expense reporting or personal budget tracking.`
  },

  stats: {
    "Calculation Speed": "<1ms",
    "Common Presets": "4",
    "Bill Splitting": "Yes",
    "Custom Percentage": "Yes",
    "Server Uploads": "0"
  }
};
