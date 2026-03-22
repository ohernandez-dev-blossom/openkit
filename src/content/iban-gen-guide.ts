/**
 * IBAN Generator Tool Guide Content
 * Comprehensive developer guide for IBAN generation and validation
 */

import type { ToolGuideContent } from "./types";

export const ibanGenGuideContent: ToolGuideContent = {
  toolName: "IBAN Generator",
  toolPath: "/iban-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Country",
      description: "Choose from 10+ European countries including Germany, France, Spain, Italy, Netherlands, Belgium, UK, Switzerland, Austria, and Poland. Each country has specific IBAN format rules and length requirements."
    },
    {
      title: "Generate Random IBAN",
      description: "Click Generate to create a valid test IBAN with correct check digits using mod-97 algorithm. The generator produces authentic-looking IBANs that pass validation but are not linked to real bank accounts."
    },
    {
      title: "Validate Existing IBANs",
      description: "Switch to Validate mode and paste any IBAN to verify its check digits, structure, and length. The validator parses country code, check digits, and BBAN components, showing detailed validation results."
    },
    {
      title: "Copy for Testing",
      description: "Click Copy to get the generated IBAN in standard format with spaces (e.g., 'DE89 3704 0044 0532 0130 00'). Use in payment form testing, integration tests, or financial application development."
    }
  ],

  introduction: {
    title: "What is IBAN?",
    content: `IBAN (International Bank Account Number) is a standardized international numbering system for identifying bank accounts across national borders. Developed by the European Committee for Banking Standards (ECBS) and adopted by ISO 13616, IBAN eliminates payment routing errors and facilitates automated processing of cross-border transactions. For developers building payment systems, e-commerce platforms, or financial applications, proper IBAN generation and validation is critical for testing payment flows without using real customer data.

The IBAN system consists of up to 34 alphanumeric characters: a 2-letter country code (ISO 3166-1 alpha-2), 2 check digits calculated using mod-97 algorithm, and a country-specific Basic Bank Account Number (BBAN) that includes bank code, branch code, and account number. For example, a German IBAN "DE89370400440532013000" breaks down to: DE (Germany), 89 (check digits), 37040044 (bank code), 0532013000 (account number).

### IBAN Structure and Validation

**Country Code (2 characters):** Two-letter ISO 3166-1 alpha-2 country code identifying the country where the bank account is held. Must be a valid IBAN-participating country (SEPA zone plus additional countries). Examples: DE (Germany), FR (France), GB (United Kingdom), ES (Spain), IT (Italy), NL (Netherlands).

**Check Digits (2 digits):** Two numeric digits calculated using mod-97 algorithm according to ISO 7064. The check digits validate IBAN integrity and detect transcription errors. Calculation: move country code and check digits (set to 00) to end, replace letters with numbers (A=10, B=11, ..., Z=35), compute mod 97, subtract from 98. Invalid check digits mean corrupted or manually typed IBAN.

**BBAN (up to 30 characters):** Basic Bank Account Number in country-specific format. Contains bank identifier (sort code, BIC prefix, or bank code), optional branch identifier, and account number. Length and structure vary by country: Germany uses 18 characters, France uses 23, UK uses 18, Netherlands uses 14.

**Length Validation:** Each country has fixed IBAN length. Germany: 22 characters, France: 27, Spain: 24, Italy: 27, Netherlands: 18, Belgium: 16, UK: 22, Switzerland: 21, Austria: 20, Poland: 28. Any IBAN with incorrect length for its country code is invalid regardless of check digits.

### Why IBAN Matters for Developers

**Payment Integration Testing:** When building payment gateways, checkout flows, or financial dashboards, you need test IBANs that pass validation but don't trigger real bank transfers. Using production IBANs in test environments risks accidental transactions. Generated test IBANs allow safe testing of payment forms, API integrations, and error handling without financial consequences.

**SEPA Payment Processing:** Single Euro Payments Area (SEPA) requires IBAN for all euro transfers. If your application processes SEPA direct debits, credit transfers, or instant payments, you must validate IBAN format, check digits, and country compatibility. Incorrect IBAN validation causes payment rejections, customer complaints, and lost revenue.

**Regulatory Compliance:** Payment Service Directive 2 (PSD2) and GDPR require proper handling of financial identifiers. Validating IBAN structure before storing or transmitting prevents data corruption. Check digit validation detects typos before submission, reducing failed transactions and improving user experience.

**International E-commerce:** Selling to European customers requires IBAN support for refunds, payouts, and subscription billing. Your checkout must validate IBAN input in real-time, provide format hints (spacing, length), and reject invalid IBANs before submission. Pre-validation reduces payment gateway errors and chargebacks.

### Common IBAN Implementation Challenges

**Format Variations:** Users enter IBANs with different spacing (DE89 3704 0044 0532 0130 00 vs DE89370400440532013000), case variations, or extra characters. Your validation must normalize input by removing spaces, converting to uppercase, and trimming whitespace before check digit calculation.

**Check Digit Calculation:** The mod-97 algorithm uses large numbers that exceed JavaScript's safe integer limit. Use BigInt for accurate calculation: \`BigInt(iban) % BigInt(97) === BigInt(1)\`. Standard Number type causes incorrect validation for long IBANs.

**Country-Specific Rules:** Each country has unique BBAN structure. German IBANs contain 8-digit bank code (Bankleitzahl) and 10-digit account number. UK IBANs use 4-digit sort code and 8-digit account number. Validating only check digits isn't enough - verify length matches country requirements.

**User Experience:** IBAN entry is error-prone due to length and complexity. Implement automatic spacing (every 4 characters), real-time validation with visual feedback, country detection from first 2 characters, and format examples. Show "DE89 3704 0044..." as user types instead of raw string.

### IBAN Generator Use Cases

Generate test IBANs for unit testing payment validators, integration testing checkout flows, load testing payment APIs, demonstrating payment UIs to stakeholders, populating development databases with realistic test data, or creating mock payment receipts. The generator creates valid IBANs that pass regex validation, check digit verification, and length checks but are not linked to real accounts.

Use the validator to verify user-submitted IBANs before API calls, check IBAN format in imported CSV files, validate webhook payloads from payment providers, or audit stored IBANs for corruption. Client-side validation reduces server load and provides instant feedback to users.

### Security and Privacy

This IBAN generator operates entirely in your browser using JavaScript. No generated IBANs, validation requests, or bank account information are transmitted to servers. The mod-97 algorithm and random number generation happen locally on your device. Generated IBANs are not stored or logged.

Safe for testing production payment systems, developing financial applications with realistic test data, training payment processing staff, or demonstrating IBAN validation to clients. All processing is client-side with zero data transmission.`
  },

  useCases: [
    {
      title: "Test Payment Form Validation",
      description: "Generate test IBANs to verify that payment forms correctly validate IBAN format, check digits, country codes, and length. Test both valid and invalid IBANs to ensure proper error handling in checkout flows.",
      example: `// IBAN validation in React payment form
import { useState } from 'react';

function validateIBAN(iban: string): { valid: boolean; error?: string } {
  // Normalize: remove spaces, uppercase
  const normalized = iban.replace(/\\s/g, '').toUpperCase();

  // Check format: 2 letters + 2 digits + alphanumeric
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(normalized)) {
    return { valid: false, error: 'Invalid IBAN format' };
  }

  // Check length by country
  const lengths: Record<string, number> = {
    DE: 22, FR: 27, ES: 24, IT: 27, NL: 18,
    BE: 16, GB: 22, CH: 21, AT: 20, PL: 28
  };

  const country = normalized.slice(0, 2);
  const expectedLength = lengths[country];

  if (!expectedLength) {
    return { valid: false, error: \`Unsupported country: \${country}\` };
  }

  if (normalized.length !== expectedLength) {
    return { valid: false, error: \`Invalid length for \${country}\` };
  }

  // Verify check digits (mod-97)
  const rearranged = normalized.slice(4) + normalized.slice(0, 4);
  const numericString = rearranged.replace(/[A-Z]/g, char =>
    (char.charCodeAt(0) - 55).toString()
  );

  const remainder = BigInt(numericString) % BigInt(97);
  if (remainder !== BigInt(1)) {
    return { valid: false, error: 'Invalid check digits' };
  }

  return { valid: true };
}

function PaymentForm() {
  const [iban, setIban] = useState('');
  const [error, setError] = useState('');

  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIban(value);

    if (value.length > 4) {
      const result = validateIBAN(value);
      setError(result.error || '');
    }
  };

  return (
    <div>
      <label>IBAN</label>
      <input
        value={iban}
        onChange={handleIbanChange}
        placeholder="DE89 3704 0044 0532 0130 00"
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Test with generated IBANs:
// Valid: DE89370400440532013000 (Germany, 22 chars)
// Valid: FR1420041010050500013M02606 (France, 27 chars)
// Invalid: DE89370400440532013001 (bad check digits)
// Invalid: DE893704004405320130 (wrong length)`
    },
    {
      title: "Seed Test Database with Realistic Data",
      description: "Populate development databases with valid test IBANs for user accounts, payment records, or transaction history. Generated IBANs look authentic but avoid accidentally using real customer data in non-production environments.",
      example: `// Seed script for test database
import { faker } from '@faker-js/faker';

// IBAN check digit calculator
function calculateCheckDigits(country: string, bban: string): string {
  const rearranged = bban + country + '00';
  const numericString = rearranged.replace(/[A-Z]/g, char =>
    (char.charCodeAt(0) - 55).toString()
  );
  const remainder = BigInt(numericString) % BigInt(97);
  const checkDigits = BigInt(98) - remainder;
  return checkDigits.toString().padStart(2, '0');
}

// Generate random IBAN for country
function generateTestIBAN(countryCode: string): string {
  const configs: Record<string, { length: number; bankLength: number }> = {
    DE: { length: 22, bankLength: 8 },
    FR: { length: 27, bankLength: 5 },
    ES: { length: 24, bankLength: 4 },
    IT: { length: 27, bankLength: 5 },
    NL: { length: 18, bankLength: 4 },
  };

  const config = configs[countryCode];
  if (!config) throw new Error(\`Unsupported country: \${countryCode}\`);

  const bbanLength = config.length - 4; // minus country and check digits
  const bban = Array.from({ length: bbanLength }, () =>
    Math.floor(Math.random() * 10)
  ).join('');

  const checkDigits = calculateCheckDigits(countryCode, bban);
  return countryCode + checkDigits + bban;
}

// Seed test users with IBANs
async function seedTestUsers(count: number = 100) {
  const countries = ['DE', 'FR', 'ES', 'IT', 'NL'];
  const users = [];

  for (let i = 0; i < count; i++) {
    const country = faker.helpers.arrayElement(countries);

    users.push({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      iban: generateTestIBAN(country),
      createdAt: faker.date.past()
    });
  }

  // Insert into database
  await db.users.insertMany(users);
  console.log(\`Seeded \${count} test users with valid IBANs\`);
}

// Seed payment transactions
async function seedTransactions(userIds: string[], count: number = 500) {
  const transactions = [];

  for (let i = 0; i < count; i++) {
    const fromUser = faker.helpers.arrayElement(userIds);
    const toIban = generateTestIBAN('DE'); // All to German accounts

    transactions.push({
      id: faker.string.uuid(),
      userId: fromUser,
      recipientIban: toIban,
      amount: faker.finance.amount({ min: 10, max: 1000 }),
      currency: 'EUR',
      status: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
      createdAt: faker.date.recent()
    });
  }

  await db.transactions.insertMany(transactions);
  console.log(\`Seeded \${count} test transactions\`);
}`
    },
    {
      title: "Integration Test Payment APIs",
      description: "Use generated IBANs to test payment gateway integrations, SEPA transfer APIs, and financial service providers. Verify that your application correctly handles IBAN validation, payment initiation, and response parsing without triggering real transactions.",
      example: `// Integration tests for Stripe SEPA Direct Debit
import { describe, it, expect, beforeAll } from '@jest/globals';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_KEY!);

describe('SEPA Payment Integration', () => {
  let customerId: string;
  let testIbans: string[];

  beforeAll(async () => {
    // Generate test IBANs for different countries
    testIbans = [
      'DE89370400440532013000',  // Germany
      'FR1420041010050500013M02606',  // France
      'ES9121000418450200051332',  // Spain
      'NL91ABNA0417164300'  // Netherlands
    ];

    // Create test customer
    const customer = await stripe.customers.create({
      email: 'test@example.com',
      name: 'Test User'
    });
    customerId = customer.id;
  });

  it('should create SEPA direct debit mandate', async () => {
    const iban = testIbans[0]; // German IBAN

    // Create payment method with test IBAN
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'sepa_debit',
      sepa_debit: { iban },
      billing_details: {
        name: 'Test User',
        email: 'test@example.com'
      }
    });

    expect(paymentMethod.type).toBe('sepa_debit');
    expect(paymentMethod.sepa_debit?.last4).toBeDefined();
    expect(paymentMethod.sepa_debit?.country).toBe('DE');
  });

  it('should attach payment method to customer', async () => {
    const iban = testIbans[1]; // French IBAN

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'sepa_debit',
      sepa_debit: { iban }
    });

    const attached = await stripe.paymentMethods.attach(
      paymentMethod.id,
      { customer: customerId }
    );

    expect(attached.customer).toBe(customerId);
  });

  it('should handle invalid IBAN gracefully', async () => {
    const invalidIban = 'DE89370400440532013001'; // Bad check digits

    await expect(
      stripe.paymentMethods.create({
        type: 'sepa_debit',
        sepa_debit: { iban: invalidIban }
      })
    ).rejects.toThrow(/invalid/i);
  });

  it('should create payment intent with SEPA', async () => {
    const iban = testIbans[2]; // Spanish IBAN

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'sepa_debit',
      sepa_debit: { iban }
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customerId
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'eur',
      customer: customerId,
      payment_method: paymentMethod.id,
      payment_method_types: ['sepa_debit'],
      mandate_data: {
        customer_acceptance: {
          type: 'online',
          online: {
            ip_address: '127.0.0.1',
            user_agent: 'test-agent'
          }
        }
      }
    });

    expect(paymentIntent.status).toBe('processing');
  });
});

// Run tests: npm test payment.test.ts
// All tests use generated IBANs, no real bank accounts`
    },
    {
      title: "Validate IBAN Input in Real-Time",
      description: "Implement client-side IBAN validation that checks format, length, and check digits as users type. Provide instant feedback with error messages, country detection, and format suggestions to improve payment form UX.",
      example: `// Real-time IBAN validation with React Hook
import { useState, useEffect } from 'react';

interface IBANValidation {
  valid: boolean;
  formatted: string;
  country?: string;
  error?: string;
}

function useIBANValidation(iban: string): IBANValidation {
  const [validation, setValidation] = useState<IBANValidation>({
    valid: false,
    formatted: ''
  });

  useEffect(() => {
    // Normalize input
    const normalized = iban.replace(/\\s/g, '').toUpperCase();

    // Format with spaces (every 4 chars)
    const formatted = normalized.match(/.{1,4}/g)?.join(' ') || '';

    if (normalized.length < 2) {
      setValidation({ valid: false, formatted });
      return;
    }

    // Extract country code
    const country = normalized.slice(0, 2);

    // Country-specific lengths
    const lengths: Record<string, number> = {
      DE: 22, FR: 27, ES: 24, IT: 27, NL: 18,
      BE: 16, GB: 22, CH: 21, AT: 20, PL: 28
    };

    const expectedLength = lengths[country];

    if (!expectedLength) {
      setValidation({
        valid: false,
        formatted,
        error: \`Country code \${country} not supported\`
      });
      return;
    }

    if (normalized.length < expectedLength) {
      setValidation({
        valid: false,
        formatted,
        country,
        error: \`Enter \${expectedLength} characters for \${country}\`
      });
      return;
    }

    if (normalized.length > expectedLength) {
      setValidation({
        valid: false,
        formatted,
        country,
        error: \`Too long for \${country} (max \${expectedLength})\`
      });
      return;
    }

    // Validate check digits
    const rearranged = normalized.slice(4) + normalized.slice(0, 4);
    const numericString = rearranged.replace(/[A-Z]/g, char =>
      (char.charCodeAt(0) - 55).toString()
    );

    const remainder = BigInt(numericString) % BigInt(97);

    if (remainder !== BigInt(1)) {
      setValidation({
        valid: false,
        formatted,
        country,
        error: 'Invalid check digits'
      });
      return;
    }

    setValidation({
      valid: true,
      formatted,
      country
    });
  }, [iban]);

  return validation;
}

// Usage in form component
function IBANInput() {
  const [iban, setIban] = useState('');
  const validation = useIBANValidation(iban);

  return (
    <div>
      <label htmlFor="iban">IBAN</label>
      <input
        id="iban"
        value={validation.formatted}
        onChange={(e) => setIban(e.target.value)}
        placeholder="DE89 3704 0044 0532 0130 00"
        className={validation.error ? 'error' : ''}
      />

      {validation.country && (
        <div className="hint">Country: {validation.country}</div>
      )}

      {validation.error && (
        <div className="error">{validation.error}</div>
      )}

      {validation.valid && (
        <div className="success">✓ Valid IBAN</div>
      )}
    </div>
  );
}

// Provides instant feedback as user types
// Formats IBAN with spaces automatically
// Shows country-specific validation errors`
    }
  ],

  howToUse: {
    title: "How to Use This IBAN Generator",
    content: `This IBAN generator provides two modes: Generate and Validate. Generate mode creates random valid IBANs for 10+ European countries using authentic format rules and mod-97 check digit calculation. Validate mode verifies existing IBANs by checking format, length, country code, and check digit integrity.

### Generate Mode

Select a country from the dropdown menu to see supported IBAN formats including Germany, France, Spain, Italy, Netherlands, Belgium, UK, Switzerland, Austria, and Poland. Each country has specific IBAN structure shown in the format legend (k=check digit, b=bank code, s=branch code, c=account number, x=national check digit).

Click "Generate Random IBAN" to create a valid test IBAN. The generator produces random bank codes and account numbers, calculates correct check digits using mod-97 algorithm, and displays the complete IBAN in standard format with spaces every 4 characters.

The generated IBAN includes a structure breakdown showing country code (2 letters), check digits (2 numbers), and BBAN (Basic Bank Account Number containing bank and account information). The format legend explains the specific structure for the selected country.

### Validate Mode

Switch to Validate mode using the toggle button at the top. Paste or type any IBAN into the input field. The validator automatically removes spaces, converts to uppercase, and checks format compliance.

The validator shows detailed results: valid/invalid status with checksum verification, formatted IBAN with standard spacing, detected country name, check digits used, length validation (actual vs expected), and format structure. A green checkmark indicates valid IBAN; a red X indicates validation failure with specific error message.

### Understanding IBAN Structure

Every IBAN starts with a 2-letter ISO country code (DE for Germany, FR for France, etc.). The next 2 digits are check digits calculated using mod-97 algorithm - these detect typos and transcription errors. The remaining characters form the BBAN (Basic Bank Account Number) in country-specific format.

German IBANs (22 chars) contain 8-digit Bankleitzahl (bank code) and 10-digit account number. French IBANs (27 chars) include 5-digit bank code, 5-digit branch code, 11-digit account number, and 2-digit key. UK IBANs (22 chars) use 4-digit sort code and 8-digit account number.

### Random IBAN Feature

Click the Random button in the header to instantly generate an IBAN for a random country. This feature automatically selects a country, generates the IBAN, and switches to Generate mode. Use for quickly creating test data or demonstrating IBAN formats across different countries.

### Copy Generated IBANs

Click the Copy button next to the generated IBAN to copy it to your clipboard in formatted style (with spaces). The copied IBAN is ready to paste into payment forms, test scripts, or documentation. All generated IBANs are valid according to IBAN specification but are not linked to real bank accounts.`,
    steps: [
      {
        name: "Choose Generation or Validation Mode",
        text: "Click 'Generate IBAN' to create test bank account numbers or 'Validate IBAN' to verify existing account numbers. Generate mode creates random valid IBANs; Validate mode checks format and check digits."
      },
      {
        name: "Select Country and Generate",
        text: "Choose a country from the dropdown menu (Germany, France, Spain, etc.) and click 'Generate Random IBAN'. The tool creates a valid IBAN with correct check digits and country-specific format."
      },
      {
        name: "Review IBAN Structure",
        text: "Examine the structure breakdown showing country code, check digits, and BBAN components. The format legend explains each part of the IBAN for the selected country."
      },
      {
        name: "Copy and Use in Testing",
        text: "Click Copy to get the formatted IBAN with spaces. Use in payment form testing, API integration tests, database seeding, or anywhere test bank account numbers are needed."
      }
    ]
  },

  faqs: [
    {
      question: "Are generated IBANs linked to real bank accounts?",
      answer: "No. Generated IBANs use random bank codes and account numbers with valid check digits but are not linked to any real bank accounts. They pass format validation and checksum verification but cannot be used for actual transactions. Safe for testing payment systems without financial risk."
    },
    {
      question: "Can I use generated IBANs in production payment forms?",
      answer: "Generated IBANs are for testing and development only. Use them in test environments, integration tests, unit tests, or demo applications. Never use generated IBANs for real payments - they will fail at the banking network level because they don't correspond to actual accounts."
    },
    {
      question: "How does IBAN check digit validation work?",
      answer: "IBAN uses mod-97 algorithm (ISO 7064): move country code and check digits to end, replace letters with numbers (A=10, B=11...Z=35), calculate mod 97 of the resulting number. Valid IBANs have remainder of 1. This detects typos, transposition errors, and corruption with high accuracy."
    },
    {
      question: "Why are IBAN lengths different for each country?",
      answer: "Each country defines its own BBAN (Basic Bank Account Number) structure based on domestic banking system. Germany uses 18-character BBAN with 8-digit bank code and 10-digit account number (22 total). France uses 23-character BBAN with additional check digits (27 total). UK uses 14-character BBAN with sort code (22 total). Total IBAN length = 4 (country + check) + BBAN length."
    },
    {
      question: "Can I validate IBANs from countries not in the generator?",
      answer: "The validator supports 10 major European countries: Germany, France, Spain, Italy, Netherlands, Belgium, UK, Switzerland, Austria, Poland. For other IBAN countries (Greece, Portugal, Sweden, etc.), the validator checks basic format (2 letters + 2 digits + alphanumeric) and check digits but cannot verify country-specific length rules."
    },
    {
      question: "What's the difference between IBAN and SWIFT/BIC?",
      answer: "IBAN identifies a specific bank account (like account number). SWIFT/BIC identifies the bank itself (like routing number). For international transfers, you typically need both: IBAN tells which account, BIC tells which bank. IBAN format includes country, check digits, and account info. BIC format is 8 or 11 characters identifying bank and branch."
    },
    {
      question: "How do I handle IBAN input in payment forms?",
      answer: "Format IBAN with spaces every 4 characters as users type for readability. Validate in real-time showing format errors immediately. Remove spaces before validation - users may copy-paste with or without spaces. Convert to uppercase before checksum verification. Show country detection from first 2 characters. Provide format examples: 'DE89 3704 0044 0532 0130 00'."
    },
    {
      question: "Why does IBAN validation fail even though format looks correct?",
      answer: "Most common causes: (1) Invalid check digits - mod-97 calculation failed, meaning transcription error. (2) Wrong length for country - IBAN length must exactly match country specification. (3) Unsupported country code - not all countries use IBAN. (4) Character corruption - invalid characters in BBAN portion. Check each component separately: country code valid, length correct, check digits match."
    },
    {
      question: "Can I use this tool to verify if an IBAN is active?",
      answer: "No. This validator only checks IBAN format compliance: correct structure, valid check digits, proper length. It cannot verify if the IBAN corresponds to an active bank account. For that, you need bank network integration (SEPA verification API) or attempt a small test transaction. Format validation is client-side; account existence requires bank system access."
    },
    {
      question: "What should I do if Stripe/PayPal rejects my generated IBAN?",
      answer: "Payment processors may reject generated IBANs because they detect the account doesn't exist in banking systems. Generated IBANs pass format validation but fail bank network verification. For payment gateway testing, use processor-provided test IBANs (Stripe has specific test IBANs for each country). Generated IBANs work for frontend validation testing and unit tests but not for actual payment processor API calls."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This IBAN generator and validator operate entirely client-side in your browser using JavaScript. No IBANs - generated or validated - are transmitted to servers or stored anywhere. All random number generation, check digit calculation, and validation logic execute locally on your device.

### Privacy Guarantees

- **100% Client-Side Processing:** All IBAN generation uses browser's random number generator and local mod-97 implementation. No network requests with your data.
- **No Server Storage:** We have no backend servers to process or store IBANs. The tool works completely offline after initial page load.
- **No Data Logging:** Generated IBANs and validation requests are not logged, tracked, or recorded. Refresh the page and everything is cleared from memory.
- **No Analytics on Input:** We don't track which countries you select, what IBANs you generate, or what you validate. No usage-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during generation and validation - zero data transmission.

Safe for generating test IBANs for production payment systems, validating customer-provided IBANs before API submission, testing financial applications with realistic data, or training payment operations staff. Use with confidence for security-sensitive financial development where IBAN confidentiality matters.`
  },

  stats: {
    "Supported Countries": "10",
    "IBAN Length Range": "16-28",
    "Validation Algorithm": "Mod-97",
    "Check Digits": "2"
  }
};
