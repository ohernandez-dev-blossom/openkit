/**
 * Base58 Encoder/Decoder Tool Guide Content
 * Comprehensive developer guide for Base58 encoding/decoding
 */

import type { ToolGuideContent } from "./types";

export const base58GuideContent: ToolGuideContent = {
  toolName: "Base58 Encoder/Decoder",
  toolPath: "/base58",
  lastUpdated: "2026-02-03",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Input",
      description: "Type or paste text/Base58 string in the input field. For hexadecimal data (like Bitcoin addresses), switch to Hex mode."
    },
    {
      title: "Select Mode",
      description: "Choose 'Encode' to convert text/hex to Base58, or 'Decode' to convert Base58 back to the original format."
    },
    {
      title: "Choose Format",
      description: "Select 'Text' for regular string encoding, or 'Hex' for working with hexadecimal/binary data common in crypto applications."
    },
    {
      title: "Copy Result",
      description: "Click the copy button or use Cmd/Ctrl+C to copy the encoded/decoded output to your clipboard."
    }
  ],

  introduction: {
    title: "What is Base58 Encoding?",
    content: `Base58 is a binary-to-text encoding scheme designed to be human-friendly. Unlike Base64, it deliberately excludes characters that can be visually confusing or problematic in certain contexts.

### The Base58 Alphabet

The Bitcoin-style Base58 alphabet contains 58 characters:
\`123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz\`

**Excluded characters:**
- **0 (zero) and O (capital o)** - too similar
- **I (capital i) and l (lowercase L)** - too similar
- **+ and /** - can cause issues in URLs and filenames

### Why Use Base58?

**Human Readability:** Base58 was designed for scenarios where users manually transcribe encoded data. Excluding visually ambiguous characters reduces transcription errors significantly.

**URL Safe:** Unlike Base64 which uses \`+\` and \`/\`, Base58 only contains alphanumeric characters, making it safe for URLs without additional encoding.

**Cryptocurrency Addresses:** Base58 is the foundation of Bitcoin addresses (with checksum = Base58Check). When you see a Bitcoin address like \`1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2\`, it's Base58 encoded.

### Base58 vs Base64

| Feature | Base58 | Base64 |
|---------|--------|--------|
| Alphabet size | 58 chars | 64 chars |
| Ambiguous chars | None | Contains 0, O, I, l |
| URL safe | Yes | No (+ and /) |
| Space efficiency | ~73% | ~75% |
| Common use | Crypto, human-readable | General encoding |

### Common Applications

**Bitcoin & Cryptocurrency:**
- Bitcoin addresses (P2PKH, P2SH)
- Private keys (WIF format)
- IPFS content identifiers (CIDv0)

**Distributed Systems:**
- IPFS hashes
- Content-addressed storage identifiers
- Decentralized identifiers (DIDs)

**User-Facing Tokens:**
- Short URLs
- API keys
- Session tokens
- Invite codes

Base58 encoding increases data size by approximately 37% (vs ~33% for Base64), but the improved human-readability often outweighs this small overhead for user-facing applications.`
  },

  useCases: [
    {
      title: "Generate Human-Readable Tokens",
      description: "Create API keys, invite codes, or session tokens that users can safely copy and share without transcription errors from ambiguous characters.",
    },
    {
      title: "Work with Cryptocurrency Data",
      description: "Encode/decode Bitcoin addresses, private keys, and transaction data. Essential for wallet development and blockchain applications.",
    },
    {
      title: "Handle IPFS Identifiers",
      description: "Decode IPFS CIDv0 hashes to inspect content addressing. Useful for debugging distributed storage and content verification.",
    },
    {
      title: "Create Short URLs",
      description: "Generate compact, URL-safe identifiers from numeric IDs or UUIDs for link shorteners and content addressing.",
    }
  ],

  howToUse: {
    title: "How to Encode/Decode Base58",
    content: `### Text Encoding

1. Enter plain text in the input field
2. Select "Encode" mode and "Text" format
3. The Base58 encoded output appears automatically
4. Click "Copy" to copy the result

**Example:** "Hello" → "9Ajdvzr"

### Hex Encoding (Cryptocurrency)

For working with raw bytes or cryptocurrency data:

1. Switch to "Hex" format
2. Enter hexadecimal data (with or without 0x prefix)
3. The Base58 encoded output is generated

**Example:** "0x48656c6c6f" → "9Ajdvzr"

### Decoding

1. Switch to "Decode" mode
2. Paste a Base58 string
3. Choose output format (Text or Hex)
4. View the decoded result

### Swap Feature

Click the "↕ Swap" button to:
- Move the output to input
- Switch between encode/decode modes
- Useful for verifying round-trip encoding`,
    steps: [
      { name: "Enter your input", text: "Type or paste the content you want to encode or decode" },
      { name: "Select mode", text: "Choose between Encode (text to Base58) or Decode (Base58 to text)" },
      { name: "Choose format", text: "Select Text for regular strings or Hex for hexadecimal input" },
      { name: "Copy the result", text: "Click copy button or use Cmd/Ctrl+C to copy the output" }
    ]
  },

  faqs: [
    {
      question: "What is Base58?",
      answer: "Base58 is a binary-to-text encoding scheme similar to Base64, but it excludes characters that look similar (0/O, I/l) to avoid confusion. It's commonly used in Bitcoin addresses and IPFS hashes."
    },
    {
      question: "Why use Base58 instead of Base64?",
      answer: "Base58 avoids visually ambiguous characters (0/O, I/l) making it safer for manual transcription. It also excludes + and / which can cause issues in URLs and filenames."
    },
    {
      question: "What is the Base58 alphabet?",
      answer: "The Bitcoin-style Base58 alphabet is: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz (58 characters, excluding 0, O, I, and l)"
    },
    {
      question: "Can I encode binary/hex data?",
      answer: "Yes! Switch to 'Hex' input type to encode hexadecimal data directly. This is useful for cryptocurrency-related encoding."
    },
    {
      question: "Is Base58 the same as Base58Check?",
      answer: "No. Base58Check adds a checksum to detect transcription errors, used in Bitcoin addresses. This tool implements plain Base58 without checksum validation."
    },
    {
      question: "What are leading '1's in Base58?",
      answer: "In Base58, leading '1' characters represent leading zero bytes in the original data. This preserves the full length of the encoded data, which is important for cryptocurrency addresses."
    }
  ],

  security: {
    title: "Privacy & Security",
    content: `### Client-Side Processing

All encoding and decoding happens entirely in your browser using JavaScript. No data is sent to any server - your input never leaves your device.

### Safe for Sensitive Data

You can safely encode/decode:
- Cryptocurrency private keys
- API keys and tokens
- Personal identifiers
- Any sensitive text

### Limitations

This tool implements standard Base58 encoding (Bitcoin-style alphabet) without:
- **Checksum validation** (Base58Check)
- **Version byte handling**
- **Address validation**

For production cryptocurrency applications, use libraries that implement full Base58Check with checksum verification.

### Encoding vs Encryption

**Important:** Base58 is an encoding scheme, NOT encryption. Anyone can decode Base58 data - it provides no security or privacy. For protecting sensitive data, use actual encryption (AES, etc.) and then optionally Base58 encode the result.`
  },

  stats: {
    "Alphabet": "58 chars",
    "Efficiency": "~73%",
    "Processing": "Client-side",
    "Data Sent": "Zero"
  }
};
