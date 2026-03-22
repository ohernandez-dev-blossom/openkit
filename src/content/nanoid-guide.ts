import type { ToolGuideContent } from "./types";

export const nanoidGuideContent: ToolGuideContent = {
  toolName: "Nano ID Generator",
  toolPath: "/nanoid",
  lastUpdated: "2026-02-07",
  version: "2.0",

  quickStartSteps: [
    { title: "Generate a Nano ID", description: "Click 'Generate' to create a cryptographically secure, URL-friendly unique identifier. Default length is 21 characters — compact yet collision-resistant." },
    { title: "Customize Length & Alphabet", description: "Adjust the ID length (1–128 characters) and choose from presets: URL-safe, alphanumeric, lowercase, hex, or numbers only." },
    { title: "Generate in Bulk", description: "Set the count to generate multiple Nano IDs at once. Perfect for seeding databases or creating test datasets." },
    { title: "Copy & Use", description: "Copy individual IDs or all at once. Use them as database primary keys, session tokens, URL slugs, or short identifiers." }
  ],

  introduction: {
    title: "What is Nano ID?",
    content: `Nano ID is a tiny, secure, URL-friendly unique string ID generator. Created by Andrey Sitnik, Nano ID has become a popular alternative to UUID for applications that need shorter, more compact identifiers.

### Key Characteristics

- **Compact Size:** Default 21 characters vs UUID's 36 characters — 40% shorter while maintaining strong uniqueness guarantees.
- **URL-Safe:** Uses only URL-safe characters (A-Za-z0-9_-) by default, so IDs can be used directly in URLs without encoding.
- **Cryptographically Secure:** Uses \`crypto.getRandomValues()\` for true randomness, making IDs unpredictable and safe for security-sensitive contexts.
- **Customizable:** Choose your own alphabet and length to match your specific requirements.
- **No Dependencies:** The original nanoid package is just 130 bytes (minified + gzipped).

### Collision Probability

With the default 21-character length and 64-character alphabet, Nano ID provides ~126 bits of entropy. You would need to generate 1 billion IDs per second for approximately 4 million years to have a 1% probability of collision.`
  },

  useCases: [
    { title: "Database Primary Keys", description: "Use Nano IDs as primary keys in PostgreSQL, MongoDB, or DynamoDB. Their compact size saves storage space and improves index performance compared to UUIDs." },
    { title: "URL Slugs & Short Links", description: "Generate URL-safe slugs for blog posts, documents, or short links. An 8-character Nano ID with the default alphabet provides 2.8 trillion unique combinations." },
    { title: "Session & API Tokens", description: "Create secure session identifiers and API tokens. Nano ID's cryptographic randomness ensures tokens are unpredictable." },
    { title: "File Names & Upload IDs", description: "Generate unique file names for uploads and temporary files. URL-safe characters mean no encoding issues in file systems or cloud storage paths." }
  ],

  howToUse: {
    title: "How to Generate Nano IDs",
    content: `This tool generates Nano IDs entirely in your browser using the Web Crypto API. No data is sent to any server.

1. **Choose your alphabet** — Select from URL-safe (default), alphanumeric, lowercase, hex, or numbers-only presets.
2. **Set the length** — Default is 21 characters. The collision probability is displayed in real-time.
3. **Generate** — Click Generate or press Ctrl+Enter to create new IDs.
4. **Copy** — Click any ID to copy it, or use "Copy All" to get all generated IDs.`,
    steps: [
      { name: "Select alphabet preset", text: "Choose URL-safe, alphanumeric, hex, or custom alphabet for your Nano ID" },
      { name: "Configure length", text: "Set ID length between 1 and 128 characters. Default 21 provides ~126 bits of entropy" },
      { name: "Generate IDs", text: "Click Generate to create secure random Nano IDs using the Web Crypto API" },
      { name: "Copy and use", text: "Copy individual IDs or bulk export for use in your application" }
    ]
  },

  faqs: [
    { question: "Is Nano ID better than UUID?", answer: "Nano ID isn't universally 'better' — it's more compact (21 vs 36 chars) and URL-safe by default, making it ideal for URLs and APIs. UUID is more widely supported in databases. Choose based on your needs." },
    { question: "How long should my Nano ID be?", answer: "Default 21 characters provides ~126 bits of entropy. For URL slugs, 8-12 characters may be enough. For security tokens, use 32+ characters." },
    { question: "Are Nano IDs cryptographically secure?", answer: "Yes. This tool uses crypto.getRandomValues() which provides cryptographically strong random values suitable for security-sensitive applications." },
    { question: "Can Nano IDs collide?", answer: "While theoretically possible, collisions are extremely unlikely. With 21 chars and 64-char alphabet, you'd need ~1 billion IDs/sec for 4 million years for a 1% collision chance." },
    { question: "Is my data sent to a server?", answer: "No. All Nano IDs are generated entirely in your browser using the Web Crypto API. No data is transmitted to any server." }
  ],

  security: {
    title: "Privacy & Security",
    content: `All Nano IDs are generated locally in your browser using the Web Crypto API (\`crypto.getRandomValues()\`). No data is sent to any server. This tool runs entirely client-side.`
  },

  stats: {
    "Default Length": "21 characters",
    "Entropy (default)": "~126 bits",
    "Alphabet Size": "64 characters (URL-safe)",
    "Processing": "100% client-side"
  }
};
