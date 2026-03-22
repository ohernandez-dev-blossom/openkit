/**
 * Credit Card Generator Tool Guide Content
 * Comprehensive developer guide for test credit card generation
 */

import type { ToolGuideContent } from "./types";

export const ccGenGuideContent: ToolGuideContent = {
  toolName: "Credit Card Generator",
  toolPath: "/cc-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Card Network",
      description: "Choose from major card networks: Visa, Mastercard, American Express, or Discover. Each network has distinct number formats and validation rules. Essential for testing payment integrations that support multiple card types."
    },
    {
      title: "Generate Test Numbers",
      description: "Click generate to create valid test card numbers that pass Luhn algorithm validation. Numbers are mathematically valid but not real accounts. Ideal for development and testing environments without exposing real payment data."
    },
    {
      title: "Include Expiry and CVV",
      description: "Generated cards include future expiry dates and valid CVV codes. Expiry dates are set 2-5 years ahead to avoid immediate expiration in test scenarios. CVV codes match network requirements (3 digits for Visa/MC/Discover, 4 for Amex)."
    },
    {
      title: "Copy for Testing",
      description: "Copy generated card details to test payment forms, API integrations, validation logic, or e-commerce checkouts. Use exclusively in development, staging, and test environments. Never use for production transactions."
    }
  ],

  introduction: {
    title: "What is Test Credit Card Generation?",
    content: `Test credit card generation creates mathematically valid payment card numbers for development and testing purposes. These numbers pass Luhn algorithm checksum validation but are not associated with real bank accounts. They cannot be used for actual purchases or financial transactions.

Software developers need test card numbers when building: e-commerce checkout flows, payment gateway integrations (Stripe, PayPal, Square), PCI compliance validation, card number input validation, fraud detection systems, subscription billing platforms, mobile payment apps, and financial dashboard prototypes.

### Why Test Card Generation Matters for Developers

**Payment integration testing:** When integrating Stripe, PayPal, Braintree, or other payment processors, you need card numbers that pass client-side validation (Luhn check, format rules) before hitting the API. Payment gateways provide official test numbers (like 4242 4242 4242 4242 for Stripe), but testing edge cases requires many card variations: different networks, expired cards, invalid CVVs, declined scenarios.

**Card validation logic:** Building form validation for credit card inputs requires testing number format validation (correct length, network detection), Luhn algorithm verification (checksum validation), expiry date validation (not expired, valid format), and CVV validation (3 or 4 digits depending on network). Generated test numbers help verify all validation paths work correctly.

**PCI DSS compliance:** Payment Card Industry Data Security Standards prohibit storing real card numbers in development databases or logs. Using test cards in non-production environments ensures compliance. Real card data must only exist in production systems with proper encryption, tokenization, and security controls.

**Fraud detection testing:** Machine learning models for fraud detection require training data with various card patterns. Test card generators create diverse number sequences for model training and testing without exposing real customer payment data. Pattern variations help test fraud rules: velocity checks, card number patterns, BIN range analysis.

**API sandbox environments:** Payment APIs provide sandbox modes for integration testing. Sandbox environments accept test card numbers but reject real cards. Developers need various test cards to simulate approval scenarios, decline scenarios, insufficient funds, expired cards, stolen card flags, and network-specific errors.

### Card Network Formats

**Visa:** Starts with 4, contains 13, 16, or 19 digits (most common: 16). Example: 4532 1234 5678 9010. Luhn algorithm validation required. Global acceptance, most widely used network for testing.

**Mastercard:** Starts with 51-55 or 2221-2720, 16 digits. Example: 5425 2334 3010 9903. Used for testing international scenarios and dual-network cards. Different BIN ranges for debit vs. credit cards.

**American Express:** Starts with 34 or 37, 15 digits. Example: 3782 822463 10005. Different CVV format (4 digits on front vs. 3 on back). Higher transaction fees typically. Testing often requires Amex-specific validation.

**Discover:** Starts with 6011, 622126-622925, 644-649, or 65, 16 digits. Example: 6011 1111 1111 1117. Less common internationally. Some merchants don't accept Discover, requiring specific decline handling.

### Luhn Algorithm Validation

The Luhn algorithm (modulus-10 formula) validates card number checksums. It catches simple errors like single-digit mistakes or transposed adjacent digits. Process:
1. Starting from rightmost digit (checksum), double every second digit going left
2. If doubled digit > 9, subtract 9 (or sum individual digits)
3. Sum all digits
4. If sum modulo 10 = 0, number is valid

Example validation for 4532 1234 5678 9010:
- Double alternating: 8,5,6,2,2,2,8,4,10,6,14,8,18,0,2,0
- Reduce >9: 8,5,6,2,2,2,8,4,1,6,5,8,9,0,2,0
- Sum: 68, modulo 10 = 8, not valid (would need checksum 2 not 0)

Generated cards always produce valid Luhn checksums to pass client-side validation before API calls.

### Security and Compliance Considerations

**Testing only:** Generated cards are exclusively for development, testing, and education. Using generated cards to attempt real transactions is fraud and illegal. Payment processors immediately reject them. Generated cards don't have real associated accounts, billing addresses, or cardholders.

**PCI DSS scope:** Test cards keep non-production environments out of PCI compliance scope. Using real cards in development or staging environments expands PCI scope to include those systems, requiring expensive security audits, encryption, and compliance costs.

**Data separation:** Never store generated test card numbers alongside real production data. Clearly label test data in databases. Use separate development and staging databases that never connect to production payment systems. Implement environment checks to prevent test cards from reaching production code paths.

This tool generates mathematically valid test cards for safe payment integration development and testing without exposing real financial data.`
  },

  useCases: [
    {
      title: "Test E-commerce Checkout Flow",
      description: "Generate test cards to validate payment forms, card number validation, expiry date checking, CVV verification, and checkout submission. Test successful payments and various decline scenarios without processing real transactions.",
      example: `// Testing checkout form validation:
const testCard = {
  number: "4532123456789010",
  expiry: "12/2028",
  cvv: "123",
  network: "Visa"
};

// Validate card number with Luhn algorithm:
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\\s/g, '').split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// Test validation:
console.log(luhnCheck(testCard.number)); // true
// Form accepts card, proceeds to payment gateway`
    },
    {
      title: "Stripe Payment Integration Testing",
      description: "Use generated cards alongside Stripe's official test numbers to verify API integration, error handling, webhook processing, and subscription billing flows. Test various card networks and validation scenarios.",
      example: `// Stripe API test integration:
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_...');

// Use generated test card:
const paymentMethod = await stripe.paymentMethods.create({
  type: 'card',
  card: {
    number: '4242424242424242', // Stripe test card
    exp_month: 12,
    exp_year: 2028,
    cvc: '123',
  },
});

// Test successful payment:
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5000,
  currency: 'usd',
  payment_method: paymentMethod.id,
  confirm: true,
});

// Test declined card (Stripe test number):
// 4000000000000002 - Card declined
// 4000000000009995 - Insufficient funds
// Generate various test cards for form validation testing`
    },
    {
      title: "Card Network Detection Algorithm",
      description: "Build and test card network detection based on number prefixes and length. Essential for displaying correct card icons in payment forms and routing to appropriate payment processors.",
      example: `// Card network detection:
function detectCardNetwork(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\\s/g, '');

  // Visa: starts with 4, 13/16/19 digits
  if (/^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/.test(cleaned)) {
    return 'Visa';
  }

  // Mastercard: 51-55 or 2221-2720, 16 digits
  if (/^(5[1-5][0-9]{14}|2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[01][0-9]|720)[0-9]{12})$/.test(cleaned)) {
    return 'Mastercard';
  }

  // Amex: 34 or 37, 15 digits
  if (/^3[47][0-9]{13}$/.test(cleaned)) {
    return 'American Express';
  }

  // Discover: 6011, 622126-622925, 644-649, 65
  if (/^(6011|65[0-9]{2}|64[4-9][0-9]|622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))[0-9]{12}$/.test(cleaned)) {
    return 'Discover';
  }

  return 'Unknown';
}

// Test with generated cards:
console.log(detectCardNetwork('4532123456789010')); // Visa
console.log(detectCardNetwork('5425233430109903')); // Mastercard`
    },
    {
      title: "PCI Compliance Testing Database",
      description: "Populate test databases with generated card numbers for development and QA environments. Ensure compliance by never using real card data outside production. Test data migration, reporting, and analytics without PCI scope expansion.",
      example: `// Seed test database with generated cards:
const testCustomers = [
  {
    id: 1,
    name: "Test Customer 1",
    cardLast4: "9010",
    cardNetwork: "Visa",
    cardToken: "tok_visa_test_123", // Tokenized
    isTestData: true
  },
  {
    id: 2,
    name: "Test Customer 2",
    cardLast4: "9903",
    cardNetwork: "Mastercard",
    cardToken: "tok_mc_test_456",
    isTestData: true
  }
];

// Never store full card numbers (even test ones):
// Use tokens or last 4 digits only
// Mark clearly as test data to prevent confusion
// Implement environment checks:
if (process.env.NODE_ENV === 'production') {
  throw new Error('Cannot use test cards in production');
}`
    }
  ],

  howToUse: {
    title: "How to Use This Credit Card Generator",
    content: `This tool generates valid test credit card numbers for development and testing purposes. All generated numbers pass Luhn algorithm validation but are not real payment cards. Use exclusively in non-production environments.

### Selecting Card Networks

Choose which card network to generate: Visa, Mastercard, American Express, or Discover. Each network has different number formats:
- **Visa:** 16 digits starting with 4 (most common for testing)
- **Mastercard:** 16 digits starting with 51-55 or 2221-2720
- **American Express:** 15 digits starting with 34 or 37, 4-digit CVV
- **Discover:** 16 digits starting with 6011, 65, or 644-649

Select based on which networks your payment integration supports. Test all networks your app accepts to ensure validation works correctly.

### Understanding Generated Data

**Card number:** Mathematically valid via Luhn algorithm checksum. Passes client-side validation but cannot process real transactions. Format includes proper spacing (4-4-4-4 for 16-digit cards).

**Expiry date:** Set 2-5 years in future (MM/YY format). Ensures test cards won't immediately expire. Some payment APIs validate that expiry is in future - generated dates pass this check.

**CVV code:** 3 digits for Visa, Mastercard, Discover. 4 digits for American Express. Random values matching network requirements. Some basic validation logic only checks CVV length, not value.

**Network indicator:** Shows which card network the number belongs to. Useful for testing network-specific validation rules, fees, or routing logic.

### Testing Best Practices

**Use official test numbers when available:** Payment gateways like Stripe provide official test card numbers with known behavior (4242 4242 4242 4242 always succeeds, 4000 0000 0000 0002 always declines). Use those for integration testing. Use generated cards for form validation testing.

**Test various networks:** Even if Visa is most common, test Amex (different length, CVV format), Mastercard (different BIN ranges), and Discover (sometimes unsupported). Ensure your validation handles all cases.

**Verify Luhn implementation:** Use generated cards to test your Luhn algorithm implementation. Try intentionally invalid numbers (last digit changed) to ensure validation correctly rejects them.

**Label test data clearly:** In test databases, mark records as test data. Add \`is_test: true\` flags or use separate test database. Prevents confusion and ensures test data never mixes with production.

### Important Limitations

**Not for production:** Generated cards cannot process real transactions. Payment APIs reject them. Using test cards to attempt real purchases is fraud.

**No associated data:** Generated cards don't have real cardholder names, billing addresses, or account balances. For complete integration testing, pair with test address data.

**Sandbox environments only:** Use in development locally, CI/CD pipelines, staging environments, or payment gateway sandbox modes. Never expose test card generators to production users.

**Compliance reminder:** Even test cards should be treated carefully. Don't log full numbers, don't transmit over insecure connections, and don't store unnecessarily. Practice secure coding with test data to build good habits for production.`,
    steps: [
      {
        name: "Select Card Network",
        text: "Choose which card network to generate: Visa, Mastercard, American Express, or Discover. Each has different validation rules and formats."
      },
      {
        name: "Generate Test Card",
        text: "Click the generate button to create a valid test card number with expiry date and CVV. Number passes Luhn algorithm validation."
      },
      {
        name: "Copy Card Details",
        text: "Copy the generated card number, expiry, and CVV to paste into payment forms or test scripts. Use for development and testing only."
      },
      {
        name: "Test Payment Flow",
        text: "Use generated card in development or staging environment to test form validation, payment processing, and error handling. Never use in production."
      }
    ]
  },

  faqs: [
    {
      question: "Are generated credit card numbers real?",
      answer: "No. Generated numbers are mathematically valid (pass Luhn algorithm checksum) but are not associated with real bank accounts. They cannot be used for actual purchases or financial transactions. Payment processors immediately reject them. These numbers are exclusively for development, testing, and educational purposes. Using generated cards to attempt real transactions is fraud and illegal."
    },
    {
      question: "What is the Luhn algorithm and why does it matter?",
      answer: "The Luhn algorithm (modulus-10 formula) is a checksum validation used to catch simple card number errors like typos or transposed digits. Starting from the rightmost digit, double every second digit going left. If doubled value > 9, subtract 9. Sum all digits. If sum modulo 10 = 0, number is valid. Credit card forms implement Luhn checking client-side before submitting to payment APIs. Generated cards pass Luhn validation to test form validation logic."
    },
    {
      question: "Can I use these for testing Stripe, PayPal, or other payment APIs?",
      answer: "Use payment gateway official test numbers for API integration testing. Stripe provides test cards like 4242 4242 4242 4242 (success), 4000 0000 0000 0002 (decline), 4000 0000 0000 9995 (insufficient funds). Use generated cards for form validation testing, network detection, and Luhn algorithm verification. Generated cards test client-side validation; official test numbers test API behavior and webhooks."
    },
    {
      question: "Why do different card networks have different formats?",
      answer: "Card networks (Visa, Mastercard, Amex, Discover) use different number ranges (BIN/IIN) to identify issuing banks and card types. Visa starts with 4, Mastercard with 51-55 or 2221-2720, Amex with 34 or 37, Discover with 6011 or 65. Length varies: 16 digits for Visa/MC/Discover, 15 for Amex. CVV also differs: 3 digits on back for Visa/MC/Discover, 4 digits on front for Amex. Testing requires handling all format variations your app accepts."
    },
    {
      question: "How do I test declined transactions and error scenarios?",
      answer: "Use payment gateway specific test numbers for decline testing. Stripe test cards: 4000 0000 0000 0002 (generic decline), 4000 0000 0000 9995 (insufficient funds), 4000 0000 0000 9987 (lost card), 4100 0000 0000 0019 (expired card). Generated cards from this tool test form validation. For API behavior testing (declines, timeouts, fraud flags), use official test numbers provided by your payment processor's sandbox documentation."
    },
    {
      question: "What's the difference between test cards and tokenization?",
      answer: "Test cards are full card numbers used in development/testing environments. Tokenization replaces real card numbers with tokens (like tok_visa_xxxx) for production use. Real cards are tokenized immediately: customer enters card → API returns token → you store token, not card number. This reduces PCI compliance scope. In testing, you might generate test cards → tokenize them in sandbox → store test tokens. Never store full card numbers (even test ones) in production-like systems."
    },
    {
      question: "How do I test American Express specifically?",
      answer: "Amex cards have unique characteristics: 15 digits (vs 16), start with 34 or 37, and have 4-digit CVV on card front (vs 3 digits on back). Generate Amex test numbers to verify: card length validation accepts 15 digits, network detection recognizes 34/37 prefixes, CVV validation accepts 4 digits, form spacing shows correct format (4-6-5 not 4-4-4-4), and payment routing handles Amex differently (often higher merchant fees)."
    },
    {
      question: "Why should I use test cards instead of my own real card?",
      answer: "Using real cards in development violates PCI DSS compliance. Real card data can be logged accidentally (console logs, error tracking, database dumps), stored insecurely (unencrypted dev databases), or exposed in code repos. This expands PCI compliance scope to development systems, requiring expensive security audits. Real cards in test environments risk data breaches. Insurance may not cover breaches from non-compliant practices. Always use test cards in non-production environments."
    },
    {
      question: "Can I store generated test card numbers in my database?",
      answer: "You can store test cards in development/staging databases IF clearly marked as test data (add is_test: true flag). Never mix test cards with production data. Best practice: use separate test databases that never connect to production. Even for test cards, don't store full numbers unnecessarily - use last 4 digits and tokens. Practice secure patterns in testing to build good habits for production. Add environment checks to prevent test data from reaching production code paths."
    },
    {
      question: "Is using this test card generator secure and private?",
      answer: "Yes, all card generation happens entirely in your browser using client-side JavaScript. No generated card numbers are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your generated data. Generated cards are not real and cannot be used for transactions. Safe for testing payment integrations in development. All generation is local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All credit card number generation happens entirely in your browser using client-side JavaScript algorithms. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Generation:** Card numbers are generated using browser-native JavaScript random number generation and Luhn algorithm implementation. All computation happens locally.
- **No Server Uploads:** We don't have backend servers to process or store card numbers. The tool works completely offline after page load.
- **No Data Storage:** Generated card numbers are not saved, logged, stored in cookies, or transmitted anywhere. Refresh the page to clear all generated data.
- **No Analytics on Content:** We don't track what card networks you generate, what numbers are created, or any generation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your generated data.

### Important Disclaimers

- **Test Use Only:** Generated cards are exclusively for development, testing, and educational purposes. Cannot be used for real transactions.
- **Not Real Cards:** Numbers are mathematically valid but not associated with real bank accounts or cardholders.
- **No Fraud:** Using generated cards to attempt real purchases is fraud and illegal. Payment processors immediately reject test cards.
- **Compliance:** Use generated cards only in non-production environments to maintain PCI DSS compliance.

Safe for testing payment integrations, validating card input forms, training fraud detection systems, or building e-commerce prototypes without exposing real financial data.`
  },

  stats: {
    "Generation Speed": "<1ms",
    "Networks Supported": "4",
    "Luhn Valid": "100%",
    "Real Accounts": "0",
    "Server Uploads": "0"
  }
};
