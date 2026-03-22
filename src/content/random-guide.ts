/**
 * Random Generator Tool Guide Content
 * Comprehensive developer guide for random data generation
 */

import type { ToolGuideContent } from "./types";

export const randomGuideContent: ToolGuideContent = {
  toolName: "Random Generator",
  toolPath: "/random",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Choose Data Type",
      description: "Select what type of random data to generate: Numbers (integers, floats, ranges), Strings (alphanumeric, passwords, tokens), UUIDs (v4), Booleans, Dates, or Colors (hex codes). Each type supports customization options for specific requirements."
    },
    {
      title: "Configure Parameters",
      description: "Set generation parameters: min/max for numbers, length for strings, character sets for passwords (uppercase, lowercase, numbers, symbols), date ranges, or color formats. Options adapt based on selected data type."
    },
    {
      title: "Generate Random Data",
      description: "Click generate to create random values instantly. Generate single values or bulk generate multiple items at once. Results appear immediately with copyable output for each generated item."
    },
    {
      title: "Copy or Export Results",
      description: "Click copy on individual items or copy all generated values at once. Export bulk data as JSON, CSV, or plain text for use in test fixtures, seed data, mock APIs, or database imports."
    }
  ],

  introduction: {
    title: "What is Random Data Generation?",
    content: `Random data generation creates unpredictable values for numbers, strings, UUIDs, booleans, dates, or other data types using cryptographic or pseudo-random algorithms. Random data is essential for testing, security tokens, unique identifiers, sample datasets, load testing, and cryptographic applications.

Developers need random data constantly: generating test fixtures for unit tests, creating mock user data for development environments, producing API tokens and session IDs, generating UUIDs for database primary keys, creating password reset tokens, building sample datasets for UI prototyping, generating random test cases for fuzz testing, and creating nonces for security protocols.

### Why Random Data Generation Matters for Developers

**Testing and QA:** Unit tests require predictable yet varied test data. Integration tests need realistic user data. Load testing requires thousands of unique records. Manual test data creation is tedious and limited - developers need tools to generate hundreds of test users, orders, or transactions quickly with randomized but valid data.

**Database seeding:** Development and staging environments need realistic data. Production database exports often can't be used (GDPR, privacy concerns). Seed scripts generate fake-but-realistic user profiles, transactions, logs using random generators. Example: 1,000 random users with names, emails, ages, addresses for testing pagination, search, or analytics.

**Security tokens:** Session IDs, API keys, password reset tokens, CSRF tokens must be unpredictable. Weak random generators (Math.random() in JavaScript) are cryptographically insecure - predictable tokens enable session hijacking. Use crypto.getRandomValues() or server-side secure random generators for security-critical tokens.

**Unique identifiers:** UUIDs (Universally Unique Identifiers) provide globally unique IDs without coordination. UUID v4 uses random generation - 122 random bits making collisions astronomically unlikely (1 in 2^122). Ideal for distributed systems where central ID generation is impractical. Alternative to auto-increment IDs that leak business information.

**Mock APIs:** Frontend development often proceeds while backend APIs are built. Mock API servers return random data matching production schema: random user objects, product listings, transaction histories. Tools like json-server or MSW use random generators to create dynamic mock responses instead of static fixtures.

**Fuzz testing:** Security testing randomizes inputs to find edge cases and vulnerabilities. Fuzz testers generate thousands of random strings, numbers, or payloads to test input validation, find buffer overflows, or trigger unexpected behavior. Random test case generation finds bugs manual testing misses.

### Random vs. Secure Random

**Pseudo-random (Math.random()):** Fast, deterministic (can be seeded), sufficient for non-security applications like games, animations, test data. Predictable if attacker knows seed or algorithm state. JavaScript Math.random() uses platform-specific PRNG (Pseudo-Random Number Generator) - not cryptographically secure.

**Cryptographically secure random:** Uses entropy from system sources (hardware random number generators, CPU timing variations, mouse movements). Unpredictable even if attacker knows algorithm. Required for: session tokens, API keys, password reset links, cryptographic nonces, challenge strings, any security-critical random value.

**When to use each:**
- **Math.random():** Test data, animations, simulations, shuffling arrays, game mechanics
- **crypto.getRandomValues():** Tokens, keys, passwords, UUIDs, nonces, anything security-critical

### Common Random Data Types

**Random numbers:** Integers (1-100), floats (0.0-1.0), specific ranges. Use for: test data ages, quantities, prices, scores, IDs. Example: random user age between 18-65.

**Random strings:** Alphanumeric tokens, passwords with character requirements. Use for: API keys, session IDs, coupon codes, verification codes, temporary passwords. Example: 32-character alphanumeric API key.

**UUIDs:** 128-bit unique identifiers in format: 550e8400-e29b-41d4-a716-446655440000. Use for: database primary keys, distributed system IDs, event tracking IDs, request IDs. Example: trace-id header in microservices.

**Random booleans:** True/false values. Use for: feature flags in test data, randomized A/B test assignments, boolean field values. Example: user.isPremium = random boolean.

**Random dates:** Dates within specified range. Use for: created_at fields in seed data, random birthdays, order timestamps, event dates. Example: random dates in 2023 for historical data.

**Random colors:** Hex color codes (#ff5733). Use for: avatar backgrounds, chart colors, UI theming, placeholder images. Example: random color per user for chat avatars.

### UUID Standards

**UUID v4 (Random):** 122 random bits, most common. Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where 4 indicates version 4, y is 8, 9, A, or B. Collision probability negligible (need to generate billions to see collision). Ideal for most use cases.

**UUID v1 (Timestamp + MAC):** Uses current timestamp and MAC address. Predictable and leaks hardware info. Not recommended for security or privacy reasons. Use v4 instead.

**UUID v5 (SHA-1 namespace):** Deterministic, based on namespace and name. Same input always produces same UUID. Use when you need reproducible UUIDs.

This tool generates cryptographically secure random data for all types, using Web Crypto API (crypto.getRandomValues()) where available for security-critical values.`
  },

  useCases: [
    {
      title: "Generate Test User Data for Seed Scripts",
      description: "Create realistic randomized user profiles for database seeding in development and staging environments. Avoid using production data exports due to privacy regulations. Generate hundreds of fake users with random names, emails, ages, and preferences.",
      example: `// Database seed script:
const generateRandomUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: crypto.randomUUID(),  // UUID v4
      username: generateRandomString(12),
      email: \`user\${randomInt(1000, 9999)}@example.com\`,
      age: randomInt(18, 75),
      is_premium: randomBoolean(),
      created_at: randomDate('2023-01-01', '2024-12-31')
    });
  }
  return users;
};

await db.users.insertMany(generateRandomUsers(1000));`
    },
    {
      title: "Create Secure API Tokens and Session IDs",
      description: "Generate cryptographically secure random tokens for API authentication, session management, password resets, or CSRF protection. Must use secure random generators (crypto.getRandomValues()) not Math.random() for security-critical tokens.",
      example: `// Generate secure API token (Node.js):
const crypto = require('crypto');

const generateAPIKey = () => {
  return crypto.randomBytes(32).toString('hex');
  // → 64-character hex string
  // → a7f8d9e3b2c1f4a6e8d7c9b5a3f2e1d4...
};

// Generate session ID:
const sessionId = crypto.randomUUID();
// → 550e8400-e29b-41d4-a716-446655440000

// Generate password reset token:
const resetToken = crypto.randomBytes(32).toString('base64url');
// → URL-safe base64 token for email links`
    },
    {
      title: "Build Mock API Responses for Frontend Development",
      description: "Create dynamic mock API data with random values matching production schema. Enables frontend development to proceed independently of backend API completion. Use tools like MSW (Mock Service Worker) or json-server with random data generators.",
      example: `// Mock API handler (MSW):
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    const products = Array.from({ length: 20 }, () => ({
      id: crypto.randomUUID(),
      name: \`Product \${randomInt(1, 999)}\`,
      price: (randomFloat(9.99, 199.99)).toFixed(2),
      in_stock: randomBoolean(),
      rating: (randomFloat(3.0, 5.0)).toFixed(1),
      created_at: randomDate('2023-01-01', '2024-12-31')
    }));

    return res(ctx.json(products));
  })
];`
    },
    {
      title: "Generate Fuzz Testing Input Data",
      description: "Create randomized test inputs for security testing and edge case discovery. Fuzz testing feeds random/malformed data to applications to find crashes, hangs, or security vulnerabilities. Generates thousands of random strings, numbers, or payloads.",
      example: `// Fuzz test for input validation:
describe('User registration fuzzing', () => {
  it('handles random invalid emails', () => {
    for (let i = 0; i < 1000; i++) {
      const randomEmail = generateRandomString(
        randomInt(1, 100),
        { includeSpecialChars: true }
      );

      // Should not crash or expose errors:
      const result = validateEmail(randomEmail);
      expect(result).toBeDefined();
    }
  });

  it('handles random SQL injection attempts', () => {
    const sqlPayloads = generateRandomSQLPayloads(100);
    sqlPayloads.forEach(payload => {
      expect(() => db.query(payload)).not.toThrow();
    });
  });
});`
    }
  ],

  howToUse: {
    title: "How to Use This Random Generator",
    content: `This tool generates cryptographically secure random data for development, testing, and security applications. Select data type, configure parameters, generate values, and export results.

### Generating Random Numbers

**Integers:** Specify min and max range. Example: min=1, max=100 generates random integers between 1 and 100 inclusive. Use for: ages, quantities, IDs, scores.

**Floats:** Specify range and decimal precision. Example: 0.0-1.0 with 4 decimals generates values like 0.7392. Use for: probabilities, percentages, measurements, coordinates.

**Ranges:** Generate multiple numbers at once. Bulk generate 100 random ages or 1000 random prices.

### Generating Random Strings

**Alphanumeric:** Letters (a-z, A-Z) and numbers (0-9). Specify length. Use for: usernames, codes, short tokens.

**Passwords:** Configure character sets: uppercase, lowercase, numbers, symbols. Specify minimum requirements (at least 1 uppercase, 2 numbers). Use for: temporary passwords, secure tokens.

**Tokens:** Hex, base64, or base64url formats. Hex: 0-9 and a-f. Base64: A-Z, a-z, 0-9, +, /. Base64url: URL-safe variant. Use for: API keys, session IDs.

### Generating UUIDs

UUID v4 format: 32 hexadecimal characters split into 5 groups separated by hyphens (8-4-4-4-12). Example: 550e8400-e29b-41d4-a716-446655440000. Uses crypto.randomUUID() when available (secure random). Fallback to crypto.getRandomValues().

**Bulk generation:** Generate hundreds of UUIDs for database imports or distributed system testing.

### Generating Random Dates

Specify start and end dates. Tool generates random dates within range. Format options: ISO 8601 (2024-01-15T10:30:00Z), Unix timestamp, or formatted string (January 15, 2024).

Use for: created_at fields in seed data, random birthdays, historical dates for testing.

### Generating Random Colors

**Hex format:** #RRGGBB with 6 hexadecimal characters. Example: #ff5733. Use for: CSS styling, avatar colors, chart colors.

**RGB format:** rgb(255, 87, 51) with values 0-255. Use for: canvas drawing, image processing.

**HSL format:** hsl(9, 100%, 60%) with hue (0-360), saturation (0-100%), lightness (0-100%). Use for: color variations, theming.

### Security Considerations

This tool uses Web Crypto API (crypto.getRandomValues()) when available for cryptographically secure random generation. For security-critical applications (production API keys, encryption keys), use server-side secure random generators with hardware entropy sources.

For testing and development (seed data, mock APIs, non-security contexts), this tool's random generation is sufficient.

### Exporting Data

**Single values:** Click copy button next to individual generated items.

**Bulk export:** Copy all generated values at once. Export formats:
- **JSON:** Array of objects with generated data
- **CSV:** Comma-separated values for spreadsheet import
- **Plain text:** One value per line for scripts

Use exports for: database seed files, test fixture JSON files, bulk imports, or script generation.`,
    steps: [
      {
        name: "Select Data Type",
        text: "Choose what type of random data to generate: Numbers, Strings, UUIDs, Booleans, Dates, or Colors."
      },
      {
        name: "Configure Options",
        text: "Set parameters like range for numbers, length and character sets for strings, or date ranges. Options adapt to selected data type."
      },
      {
        name: "Generate Values",
        text: "Click generate button to create random data instantly. Generate single values or bulk generate multiple items."
      },
      {
        name: "Copy or Export",
        text: "Copy individual values or export all results as JSON, CSV, or plain text for use in seed scripts, test fixtures, or mock data."
      }
    ]
  },

  faqs: [
    {
      question: "Is this tool's random generation cryptographically secure?",
      answer: "This tool uses Web Crypto API (crypto.getRandomValues()) when available in modern browsers, which provides cryptographically secure random values using system entropy. This is suitable for session tokens, API keys, UUIDs, and other security contexts in development/testing. For production cryptographic keys or extremely high-security requirements, use server-side hardware random number generators (HSMs) with dedicated entropy sources. For non-security contexts (test data, simulations), this tool's randomness is more than sufficient."
    },
    {
      question: "Should I use Math.random() or crypto.getRandomValues()?",
      answer: "Use crypto.getRandomValues() (Web Crypto API) for any security-related randomness: API tokens, session IDs, password reset links, UUIDs, cryptographic nonces, CSRF tokens. Math.random() is cryptographically insecure - attackers can predict values. Use Math.random() only for non-security contexts: animations, games, non-critical test data, UI effects, shuffling arrays. This tool uses crypto APIs for security-appropriate generation."
    },
    {
      question: "How do I generate realistic test user data?",
      answer: "Combine multiple random generators: random string for username (8-12 chars alphanumeric), random UUID for user ID, random integer for age (18-75), random boolean for is_premium flag, random date for created_at (within last year), random email (username + @example.com). Use faker.js library for more realistic names, addresses, phone numbers. This tool handles primitives (strings, numbers, UUIDs, booleans, dates) - combine them to build complex test objects."
    },
    {
      question: "What's the collision probability for UUID v4?",
      answer: "UUID v4 has 122 random bits (128 bits total, 6 bits fixed for version/variant). Collision probability is astronomically low: need to generate 2.71 quintillion (2.71 × 10^18) UUIDs to have 50% chance of one collision. For practical applications (millions or billions of UUIDs), collision probability is negligible. Safe to use as primary keys in distributed systems without coordination. Birthday paradox formula: sqrt(2^122) ≈ 2.71e18 for 50% collision probability."
    },
    {
      question: "How long should API tokens be?",
      answer: "API tokens should be at least 128 bits (16 bytes) of randomness. Common lengths: 128 bits (32 hex characters or 22 base64 characters), 256 bits (64 hex or 43 base64). Longer tokens are more secure but harder to handle. Use hex or base64url encoding. Example: 32-byte (256-bit) token = 64 hex characters. Don't use predictable patterns (sequential IDs, timestamps) in tokens. This tool generates configurable-length tokens with secure randomness."
    },
    {
      question: "Can I use generated random data for GDPR-compliant testing?",
      answer: "Yes, randomly generated data (fake users, transactions) is not personal data under GDPR because it doesn't relate to real individuals. Using random generators for test data avoids GDPR issues with production data exports. Generate fake names (random strings or faker library), random emails (@example.com domain), random addresses. Never use real user data in development/staging - use random generators instead. This tool creates entirely synthetic data safe for testing."
    },
    {
      question: "How do I seed random generators for reproducible tests?",
      answer: "For reproducible tests, use seeded pseudo-random generators. JavaScript's Math.random() can't be seeded, but libraries like seedrandom allow seeded PRNGs. Example: const rng = seedrandom('test-seed-123'); const value = rng(). Same seed produces same sequence - useful for snapshot tests or debugging. Don't seed crypto.getRandomValues() (it's intentionally unseeded for security). Use seeded PRNGs only for non-security test scenarios where reproducibility matters."
    },
    {
      question: "What's the difference between random strings and UUIDs?",
      answer: "Random strings are arbitrary-length alphanumeric/hex/base64 values with no standard format. UUIDs are standardized 128-bit identifiers with specific format (8-4-4-4-12 hex groups). UUIDs have version/variant bits, random strings don't. Use UUIDs when you need: standardized format, database primary keys, distributed system IDs, interoperability. Use random strings for: API tokens (custom length), passwords, codes, session IDs where format flexibility matters. UUIDs are recognizable, strings are customizable."
    },
    {
      question: "How do I generate random JSON for mock APIs?",
      answer: "Generate individual random primitives (strings, numbers, booleans, dates) and compose into objects. Example: {id: randomUUID(), name: randomString(10), age: randomInt(18,65), active: randomBoolean(), created: randomDate()}. For arrays, use Array.from({length: N}, () => randomObject()). Libraries like faker.js provide realistic data (names, addresses). This tool handles primitives - combine them programmatically for complex structures. Export as JSON for json-server or MSW mock backends."
    },
    {
      question: "Is my generated data private?",
      answer: "Yes, all random generation happens entirely in your browser using client-side JavaScript and Web Crypto API. No generated data is transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for generating security tokens, test data, or any random values. Random generation uses browser's crypto APIs with local entropy - nothing leaves your device."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All random data generation happens entirely in your browser using client-side Web Crypto API (crypto.getRandomValues()) and JavaScript. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All random generation uses browser-native crypto APIs with local system entropy. Generation happens on your device.
- **No Server Uploads:** We don't have backend servers to process or generate data. Works completely offline after first page load.
- **No Data Storage:** Generated values (tokens, UUIDs, strings, numbers) are not saved, logged, stored, or transmitted anywhere.
- **No Analytics on Content:** We don't track what you generate, what types of random data you create, or any content-specific information.
- **Cryptographically Secure:** Uses Web Crypto API (crypto.getRandomValues()) when available for security-appropriate randomness.

Safe for generating sensitive API tokens, test data with confidential patterns, security tokens for development, or any random values. Use with confidence for development and testing scenarios.`
  },

  stats: {
    "Generation Speed": "<10ms",
    "Data Types": "6",
    "Crypto API": "Yes",
    "Bulk Generate": "1000+",
    "Server Uploads": "0"
  }
};
