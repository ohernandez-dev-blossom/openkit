import type { ToolGuideContent } from "./types";

export const ulidGuideContent: ToolGuideContent = {
  toolName: "ULID Generator",
  toolPath: "/ulid",
  lastUpdated: "2026-02-07",
  version: "2.0",

  quickStartSteps: [
    { title: "Generate a ULID", description: "Click 'Generate' to create a Universally Unique Lexicographically Sortable Identifier encoding the current timestamp plus 80 bits of randomness." },
    { title: "Inspect the Timestamp", description: "The first 10 characters encode a millisecond-precision timestamp. The decoded date is displayed automatically." },
    { title: "Generate in Bulk", description: "Generate multiple ULIDs at once. ULIDs created in the same millisecond share the timestamp prefix but have unique random suffixes." },
    { title: "Copy & Integrate", description: "Copy ULIDs to use as database primary keys, event IDs, or log correlation identifiers." }
  ],

  introduction: {
    title: "What is a ULID?",
    content: `ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit identifier that combines a timestamp with randomness to produce IDs that are both unique and naturally sortable by creation time.

### Structure

A ULID is a 26-character string encoded in Crockford's Base32:

\`\`\`
 01ARZ3NDEKTSV4RRFFQ69G5FAV
|----------|----------------|
 Timestamp     Randomness
 (48 bits)     (80 bits)
\`\`\`

### Key Characteristics

- **Lexicographically Sortable:** ULIDs sort in creation order as plain strings. \`ORDER BY id\` works correctly in any database.
- **Timestamp Encoded:** The first 48 bits encode a Unix timestamp in milliseconds.
- **128-bit Compatibility:** Same size as UUID — can be stored in UUID columns.
- **Crockford's Base32:** Unambiguous character set (excludes I, L, O, U) that's case-insensitive.

### ULID vs UUID

UUID v4 provides 122 bits of randomness but no time ordering. ULID provides 80 bits of randomness plus 48 bits of timestamp, giving natural chronological sorting ideal for database primary keys.`
  },

  useCases: [
    { title: "Database Primary Keys", description: "ULIDs are ideal primary keys for PostgreSQL, MySQL, and DynamoDB. Their sortable nature means new records append to B-tree indexes efficiently." },
    { title: "Event Sourcing & Logs", description: "Use ULIDs as event IDs in event-sourced architectures. The embedded timestamp provides natural chronological ordering." },
    { title: "Distributed Systems", description: "Generate ULIDs on multiple nodes without coordination. Timestamp + 80 bits of randomness ensures uniqueness." },
    { title: "Time-Series Data", description: "Store time-series data with ULID keys for efficient range queries using simple string comparison." }
  ],

  howToUse: {
    title: "How to Generate ULIDs",
    content: `This tool generates ULIDs entirely in your browser using the Web Crypto API.

1. **Generate** — Click Generate or press Ctrl+Enter to create a new ULID.
2. **Inspect** — View the decoded timestamp, creation date, and structure.
3. **Bulk generate** — Use the count control to generate multiple ULIDs.
4. **Copy** — Click any ULID to copy it, or use "Copy All" for bulk export.`,
    steps: [
      { name: "Click Generate", text: "Create a new ULID encoding the current millisecond timestamp plus 80 bits of cryptographic randomness" },
      { name: "Inspect timestamp", text: "View the decoded creation timestamp, date, and ULID structure breakdown" },
      { name: "Adjust count for bulk generation", text: "Generate multiple ULIDs at once for seeding databases or creating test data" },
      { name: "Copy and use", text: "Copy individual ULIDs or export all for use as database keys or event IDs" }
    ]
  },

  faqs: [
    { question: "What's the advantage of ULID over UUID?", answer: "ULIDs are lexicographically sortable by creation time. UUID v4 sorts randomly. ULIDs also embed a timestamp you can extract, and use a compact 26-character representation vs UUID's 36 characters." },
    { question: "Can I extract the timestamp from a ULID?", answer: "Yes. The first 10 characters encode a millisecond-precision Unix timestamp. This tool automatically decodes and displays it." },
    { question: "Are ULIDs compatible with UUID columns?", answer: "Yes. ULIDs are 128 bits, same as UUIDs. You can store them in UUID columns or as 26-character strings." },
    { question: "How unique are ULIDs?", answer: "With 80 bits of randomness per millisecond, you'd need over 1 trillion ULIDs in the same millisecond for a 50% collision chance." },
    { question: "Is my data private?", answer: "Yes. All ULIDs are generated locally in your browser using the Web Crypto API. No data is sent to any server." }
  ],

  security: {
    title: "Privacy & Security",
    content: `All ULIDs are generated locally in your browser. The random component uses the Web Crypto API for cryptographic-quality randomness. No data is transmitted to any server.

Note that ULIDs contain an embedded timestamp — anyone with a ULID can determine when it was created.`
  },

  stats: {
    "ID Length": "26 characters",
    "Total Bits": "128 (48 timestamp + 80 random)",
    "Encoding": "Crockford's Base32",
    "Processing": "100% client-side"
  }
};
