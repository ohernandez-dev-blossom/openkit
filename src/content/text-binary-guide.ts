/**
 * Text to Binary Converter Tool Guide Content
 * Comprehensive developer guide for text/binary conversion
 */

import type { ToolGuideContent } from "./types";

export const textBinaryGuideContent: ToolGuideContent = {
  toolName: "Text to Binary Converter",
  toolPath: "/text-binary",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Text or Binary",
      description: "Input plain text for encoding to binary, or paste binary strings (0s and 1s) for decoding to text. Supports any text length with full Unicode character set including emojis and special symbols."
    },
    {
      title: "Select Conversion Direction",
      description: "Choose 'Text to Binary' encoding text as 0s and 1s, or 'Binary to Text' decoding binary strings back to readable characters. Switch modes instantly for bidirectional conversion."
    },
    {
      title: "Configure Format Options",
      description: "Set output formatting: space-separated bytes, grouped bits, ASCII vs UTF-8 encoding, with or without byte separators. Customize binary representation matching your specific use case or protocol requirements."
    },
    {
      title: "Copy Binary Output",
      description: "Click copy button grabbing binary representation. Use for educational demonstrations, protocol analysis, debugging character encoding issues, or understanding computer text storage at bit level."
    }
  ],

  introduction: {
    title: "What is Text to Binary Conversion?",
    content: `Text to binary conversion transforms readable characters into binary representation (0s and 1s) showing how computers actually store and process text data. Every character - letters, numbers, symbols, emojis - converts to binary code based on character encoding standards (ASCII, UTF-8). Binary encoding reveals the fundamental digital representation underlying all text, enabling understanding of low-level data storage, transmission, and manipulation.

Computers internally represent everything as binary - text included. When you type 'A', computer stores 01000001 (binary for ASCII 65). When reading files or network data, computers process binary bit streams interpreting them as characters based on encoding. Understanding text-binary conversion helps debug encoding issues, analyze protocols, and comprehend data representation fundamentals.

### Why Developers Need Text-Binary Conversion

**Character Encoding Education:** Teaching computer science fundamentals requires demonstrating how text maps to binary. Students see firsthand that 'A' = 01000001, 'a' = 01100001 - understanding characters as numbers in binary format. Visualization helps grasp ASCII, UTF-8, and Unicode encoding schemes showing concrete bit patterns behind abstract characters.

**Protocol Debugging:** Network protocols and serial communications transmit binary data. When debugging, compare expected binary patterns against actual received bits. Convert protocol messages to binary verifying byte ordering, parity bits, checksum calculations, or data framing. Binary representation exposes transmission errors invisible at character level.

**Data Corruption Analysis:** File corruption or encoding errors produce garbled text. Converting corrupted characters to binary reveals exactly which bits changed. Compare good vs corrupted binary patterns identifying bit flip locations. Understanding corruption at bit level helps diagnose hardware failures, transmission errors, or encoding mismatches.

**Binary File Format Understanding:** File formats mix binary data with text headers. Hex editors show binary data, but understanding text portions requires binary-to-text conversion. Analyze file signatures, magic numbers, or embedded strings in binary files. Reverse engineer proprietary formats by examining binary structure and text patterns.

**Encoding Mismatch Diagnosis:** When text displays incorrectly (mojibake - garbled characters), encoding mismatch is likely. Convert characters to binary, decode using different encodings (UTF-8, ISO-8859-1, Windows-1252) finding correct interpretation. Binary representation shows actual bytes received, separate from incorrectly assumed encoding.

### ASCII vs UTF-8 Binary Encoding

**ASCII (7-bit):** English letters, numbers, symbols encode in 7 bits (plus 1 parity bit = 8 bits total). 'A' = 01000001 (65 decimal), 'a' = 01100001 (97 decimal). ASCII codes 0-127 represent standard keyboard characters. Efficient for English text but inadequate for international languages, emojis, or special symbols.

**UTF-8 (Variable Length):** Unicode encoding using 1-4 bytes per character. ASCII characters (U+0000 to U+007F) encode identically to ASCII using single byte - backward compatible. Non-ASCII characters use multi-byte sequences: 2 bytes for Latin extended (é, ñ, ü), 3 bytes for most languages (Chinese, Arabic, Cyrillic), 4 bytes for emojis and rare characters.

Example: 'A' (ASCII/UTF-8) = 01000001 (1 byte). 'é' (UTF-8) = 11000011 10101001 (2 bytes). '你' (UTF-8) = 11100100 10111101 10100000 (3 bytes). '😀' emoji (UTF-8) = 11110000 10011111 10011000 10000000 (4 bytes).

**Encoding Choice Impact:** ASCII conversion produces 8 bits per character (fixed). UTF-8 conversion produces variable bits depending on character - ASCII characters use 8 bits, extended characters use 16-32 bits. When analyzing binary data, knowing encoding is critical for correct decoding.

### Binary Representation and Bit Order

**Byte Boundaries:** Text typically groups into 8-bit bytes. 'AB' (ASCII) = 01000001 01000010 (2 bytes). Space separators improve readability distinguishing character boundaries. Without separation, 0100000101000010 is harder to parse.

**Bit Ordering (Endianness):** Within bytes, bits order left-to-right as MSB (most significant bit) to LSB (least significant). Across bytes, big-endian places high-order bytes first, little-endian reverses. For text encoding, byte order matters in multi-byte characters (UTF-8, UTF-16). ASCII is single-byte so endianness irrelevant.

**Padding and Alignment:** Some protocols pad binary data to fixed lengths. 7-bit ASCII might pad to 8 bits with leading zero: 'A' = 01000001 (padded) vs 1000001 (unpadded). Padding ensures byte alignment simplifying processing and transmission.

This tool converts text to binary and binary to text supporting ASCII and UTF-8 encodings. Handles Unicode characters including emojis. Configurable output formatting with byte separators and grouping options. All conversion client-side - your text never uploads to servers.

### Practical Applications and Use Cases

**Network Protocol Analysis:** Capture network packets in binary, convert to text finding protocol strings, headers, or commands embedded in binary streams. Reverse: convert protocol specification text to binary verifying packet construction.

**Error Detection and Correction:** Binary representation exposes single-bit errors. Compare transmitted vs received binary detecting flipped bits. Calculate Hamming distance between binary strings measuring corruption severity.

**Cryptography and Encoding:** Understand how encryption operates at binary level. Convert plaintext to binary, apply XOR cipher, convert back to text. Visualize bitwise operations on actual message bits.

**Educational Demonstrations:** Teaching binary number systems, character encoding, or computer architecture benefits from concrete examples. Convert student names to binary showing personalized representation. Interactive learning through conversion exercises.`
  },

  useCases: [
    {
      title: "Debug Character Encoding Mismatches",
      description: "When text displays as garbled characters (mojibake), encoding mismatch occurred. Convert characters to binary revealing actual bytes received. Decode using different encodings (UTF-8, ISO-8859-1, Windows-1252) finding correct interpretation fixing display issues.",
      example: `// Mojibake example: "café" displays as "cafÃ©"
// Problem: UTF-8 bytes decoded as ISO-8859-1

// Original text: café
const original = "café";

// Convert to UTF-8 binary
// c = 01100011
// a = 01100001
// f = 01100110
// é = 11000011 10101001 (UTF-8: 2 bytes)

// Total: 01100011 01100001 01100110 11000011 10101001

// If decoded as ISO-8859-1 (1 byte per character):
// 01100011 = 'c'
// 01100001 = 'a'
// 01100110 = 'f'
// 11000011 = 'Ã' (ISO-8859-1 character 195)
// 10101001 = '©' (ISO-8859-1 character 169)
// Result: "cafÃ©" (mojibake!)

// Fix: Decode same binary as UTF-8
// 11000011 10101001 = é (UTF-8 2-byte sequence)
// Result: "café" (correct!)

// Binary conversion exposes encoding mismatch
// Same bytes, different character interpretation`
    },
    {
      title: "Analyze Binary Protocol Messages",
      description: "Network protocols transmit binary data containing text headers, commands, or status messages. Convert binary packet captures to text extracting readable protocol strings. Reverse engineer proprietary protocols analyzing binary structure.",
      example: `// HTTP request binary analysis
// Captured packet bytes (simplified):

const binaryPacket = \`
01000111 01000101 01010100  // G E T
00100000                    // Space
00101111                    // /
00100000                    // Space
01001000 01010100 01010100  // H T T
01010000 00101111 00110001  // P / 1
00101110 00110001           // . 1
\`;

// Convert binary to text:
// Binary → ASCII → "GET / HTTP/1.1"

// Reverse: Construct protocol message
const command = "POST /api/data";

// Convert to binary for transmission:
// P = 01010000
// O = 01001111
// S = 01010011
// T = 01010100
// Space = 00100000
// / = 00101111
// ... etc

// Binary representation used in:
// - Protocol fuzzing (flip bits, test handling)
// - Packet crafting (build custom requests)
// - Network debugging (inspect wire format)`
    },
    {
      title: "Teach Binary Number Systems and Encoding",
      description: "Computer science education demonstrates how computers represent text as binary. Convert student names to binary creating personalized examples. Show ASCII vs UTF-8 encoding differences with concrete bit patterns making abstract concepts tangible.",
      example: `// Educational exercise: Student name in binary
const studentName = "Alex";

// Convert each character to ASCII binary:
// A = 01000001 (65 decimal)
// l = 01101100 (108 decimal)
// e = 01100101 (101 decimal)
// x = 01111000 (120 decimal)

// Full binary: 01000001 01101100 01100101 01111000

// Teaching points:
// 1. Each character = 8 bits (1 byte)
// 2. Capital letters have different codes than lowercase
// 3. Computers store names as numbers in binary

// Compare uppercase vs lowercase:
// A = 01000001
// a = 01100001
//     ^------^ Difference is one bit (bit 5)
// Bit 5 = 0 for uppercase, 1 for lowercase

// Exercise: Convert "ALEX" to "alex" by flipping bit 5
// Interactive learning through binary manipulation

// UTF-8 demonstration with emoji:
const emoji = "👋";
// Binary: 11110000 10011111 10010001 10001011
// Four bytes! Much longer than ASCII
// Shows UTF-8 variable-length encoding`
    },
    {
      title: "Implement Simple XOR Encryption",
      description: "Understanding XOR encryption requires working with binary representation. Convert plaintext to binary, XOR with key binary, convert result back to text. Visualize bitwise operations at fundamental level demystifying cryptographic operations.",
      example: `// Simple XOR cipher implementation
function xorEncrypt(text, key) {
  // Convert text to binary
  const textBinary = textToBinary(text);
  const keyBinary = textToBinary(key);

  // XOR operation on binary strings
  let result = '';
  for (let i = 0; i < textBinary.length; i++) {
    // Repeat key if shorter than text
    const keyBit = keyBinary[i % keyBinary.length];
    const textBit = textBinary[i];

    // XOR: 0 XOR 0 = 0, 0 XOR 1 = 1
    //      1 XOR 0 = 1, 1 XOR 1 = 0
    result += textBit === keyBit ? '0' : '1';
  }

  // Convert result binary back to text
  return binaryToText(result);
}

// Example: Encrypt "HI" with key "X"
// H = 01001000
// I = 01001001
// X = 01011000 (key repeats)

// H XOR X:
// 01001000
// 01011000
// --------
// 00010000 = 16 (encrypted byte)

// I XOR X:
// 01001001
// 01011000
// --------
// 00010001 = 17 (encrypted byte)

// Decrypt: XOR again with same key (reversible)
// Shows cryptography fundamentals through binary`
    }
  ],

  howToUse: {
    title: "How to Use the Text to Binary Converter",
    content: `This tool converts between text and binary representations supporting ASCII and UTF-8 encodings. Bidirectional conversion with configurable formatting options for different use cases.

### Converting Text to Binary

Paste or type text into input field with 'Text to Binary' mode selected. Tool converts each character to binary representation showing 0s and 1s. ASCII characters produce 8 bits (1 byte) per character. UTF-8 characters may use 8-32 bits depending on character (ASCII=8, extended=16-32).

Output shows binary digits grouped by bytes (8 bits) with space separators for readability. Optionally remove separators for compact output. Binary string represents exact bit pattern stored in computer memory or transmitted over networks.

### Converting Binary to Text

Switch to 'Binary to Text' mode and paste binary string (0s and 1s). Tool parses binary, groups into bytes, decodes to characters based on selected encoding (ASCII or UTF-8). Spaces between bytes are optional - tool handles both formats.

Invalid binary sequences (wrong bit count, invalid UTF-8 patterns) show error or replacement characters (�). Ensure binary input matches encoding assumption - ASCII expects 8-bit boundaries, UTF-8 expects valid multi-byte sequences.

### ASCII vs UTF-8 Encoding

**ASCII Mode:** Converts only standard ASCII characters (0-127). Each character always 8 bits. Efficient for English text but fails on accented characters, emojis, or non-Latin scripts. Use for pure ASCII data or educational examples.

**UTF-8 Mode:** Supports full Unicode character set including emojis, accented letters, and all world languages. ASCII characters (a-z, A-Z, 0-9, symbols) encode as 8 bits (backward compatible). Extended characters use 16-32 bits. Use for modern text supporting international content.

### Output Formatting Options

**Byte Separators:** Enable space separators between bytes (8-bit groups) improving readability. 01000001 01000010 vs 0100000101000010. Separators help identify character boundaries.

**Bit Grouping:** Group bits in sets of 4 or 8. Grouped output easier to read and compare. 0100 0001 vs 01000001. Grouping helps count bits and spot patterns.

**Prefix Notation:** Optionally prefix binary with '0b' matching programming language binary literal syntax (0b01000001). Useful when copying binary to code.

### Practical Workflows

**Encoding Debugging:** Text displays incorrectly → convert to binary → try decoding as different encodings (UTF-8, ISO-8859-1, Windows-1252) → find correct interpretation fixing display.

**Protocol Analysis:** Capture binary network packet → convert to text → extract protocol headers, commands, or status messages → understand packet structure.

**Educational Use:** Convert student names or example words to binary → demonstrate how computers represent text → compare uppercase/lowercase bit patterns → teach encoding fundamentals.

**Data Verification:** Generate expected binary for protocol message → compare against actual transmitted binary → identify differences debugging communication errors.`,
    steps: [
      {
        name: "Enter Text or Binary",
        text: "Input plain text for binary encoding, or paste binary strings (0s and 1s) for text decoding. Supports any length with full Unicode character set."
      },
      {
        name: "Select Direction",
        text: "Choose 'Text to Binary' encoding characters as bits, or 'Binary to Text' decoding binary strings to readable text. Toggle between modes instantly."
      },
      {
        name: "Configure Format",
        text: "Set encoding (ASCII or UTF-8), enable byte separators, choose bit grouping style. Customize binary representation matching use case requirements."
      },
      {
        name: "Copy Output",
        text: "Click copy button grabbing binary or text result. Use for education, debugging, protocol analysis, or understanding text encoding at bit level."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between ASCII and UTF-8 binary encoding?",
      answer: "ASCII uses exactly 8 bits per character encoding only basic Latin letters, numbers, and symbols (codes 0-127). UTF-8 uses variable-length encoding: ASCII characters (0-127) encode as 8 bits (backward compatible), accented letters use 16 bits, most other languages use 24 bits, emojis use 32 bits. Example: 'A' = 01000001 in both (8 bits). 'é' = 11000011 10101001 in UTF-8 (16 bits), not representable in ASCII. Choose ASCII for pure English text, UTF-8 for international content."
    },
    {
      question: "Why does my text show replacement characters (�) when converting from binary?",
      answer: "Replacement character (U+FFFD) appears when binary sequence is invalid for selected encoding. Causes: wrong encoding selected (binary is UTF-8 but ASCII mode chosen), incomplete multi-byte sequence (truncated UTF-8), invalid byte patterns (illegal UTF-8 sequences), incorrect bit count (not multiple of 8). Fix by ensuring binary input matches encoding assumption and has complete valid sequences. Check for copy/paste errors truncating binary strings."
    },
    {
      question: "How do I convert emojis to binary?",
      answer: "Emojis require UTF-8 encoding (ASCII can't represent them). Select UTF-8 mode, input emoji (😀), see 4-byte binary output: 11110000 10011111 10011000 10000000 (32 bits). Each emoji uses 3-4 bytes in UTF-8. Binary representation shows why emojis consume more storage than ASCII letters. Reverse: paste emoji's 32-bit binary in UTF-8 mode, decode back to emoji character."
    },
    {
      question: "Can I use this tool to understand file encoding issues?",
      answer: "Yes, when files display garbled text (mojibake), encoding mismatch occurred. Take garbled character, convert to binary showing actual bytes. Try decoding binary as different encodings (UTF-8, ISO-8859-1, Windows-1252) until text appears correctly. Common issue: UTF-8 file opened as ISO-8859-1. Binary conversion reveals original encoding by showing byte patterns matching UTF-8 multi-byte sequences vs single-byte ISO encoding."
    },
    {
      question: "What does it mean when binary has 'spaces' in it?",
      answer: "Spaces between binary digits are formatting separators improving readability, not part of actual binary data. 01000001 01000010 is easier to read than 0100000101000010. Separators typically appear every 8 bits (byte boundaries) helping identify character boundaries. When copying binary, spaces may be included or omitted - tool handles both formats. Actual stored binary has no spaces - it's continuous bit stream."
    },
    {
      question: "How do uppercase and lowercase letters differ in binary?",
      answer: "Uppercase and lowercase differ by single bit in ASCII/UTF-8. Uppercase A-Z: 01000001-01011010 (65-90). Lowercase a-z: 01100001-01111010 (97-122). Difference is bit 5 (counting from bit 0). Uppercase has bit 5 = 0, lowercase has bit 5 = 1. Example: 'A' = 01000001, 'a' = 01100001 (only bit 5 differs). This single-bit difference enables efficient case conversion by flipping one bit. Convert to binary seeing exact bit pattern difference."
    },
    {
      question: "Can I convert binary network packets to text?",
      answer: "Yes, but binary packets mix text and binary data. Text portions (HTTP headers, protocol commands) convert to readable text. Binary portions (image data, compressed content) produce gibberish when decoded as text. Use tool identifying text sections in packet captures. Convert specific byte ranges to text extracting protocol strings while leaving binary data sections in hex/binary format. Not all packet bytes are text - only protocol headers and string data decode meaningfully."
    },
    {
      question: "Why do some characters produce longer binary than others?",
      answer: "In UTF-8 encoding, character binary length varies: ASCII characters (a-z, 0-9, symbols) = 8 bits, Latin extended (é, ñ, ü) = 16 bits, most other alphabets (Chinese, Arabic, Cyrillic) = 24 bits, emojis and rare characters = 32 bits. ASCII mode always produces 8 bits per character. Binary length depends on character's Unicode code point - higher code points require more bytes. This variable-length encoding makes UTF-8 efficient for ASCII-heavy text while supporting all Unicode characters."
    },
    {
      question: "How do I verify if binary data represents valid text?",
      answer: "Attempt conversion to text checking for replacement characters (�) indicating invalid sequences. Valid ASCII binary: every 8 bits produces character 0-127. Valid UTF-8 binary: follows multi-byte sequence rules (leading byte patterns 110xxxxx, 1110xxxx, 11110xxx followed by continuation bytes 10xxxxxx). Tool highlights invalid sequences. If conversion produces mostly gibberish/replacements, data is likely non-text (compressed, encrypted, or binary format). Readable output confirms valid text encoding."
    },
    {
      question: "Is my text private when converting to binary?",
      answer: "Absolutely. All text-to-binary and binary-to-text conversion happens entirely in your browser using JavaScript string and bit manipulation. Your text never uploads to servers. No network requests are made with your content. Verify by checking browser DevTools Network tab showing zero outbound requests. Safe for converting confidential messages, proprietary data, passwords (though encoding isn't encryption!), or any sensitive text. Tool works completely offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This text-to-binary converter operates entirely client-side using JavaScript string encoding and bit manipulation. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All encoding and decoding happen in your browser using JavaScript CharCodeAt() and string methods. Your content stays on your device.
- **No Server Communication:** We don't have backend services processing text. The tool works completely offline after initial page load.
- **No Data Storage:** Your input text and binary output are not saved, logged, or transmitted anywhere. Refresh the page and it's gone.
- **No Content Tracking:** We don't track what you convert, text patterns, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your text.

**Important Security Note:** Binary encoding is NOT encryption. Converting text to binary doesn't protect confidentiality - binary is trivially reversed to original text. Never rely on binary encoding for security. Use proper encryption (AES, RSA) for confidential data. This tool is for education and debugging, not security.

Safe for educational demonstrations, protocol analysis, encoding debugging, or understanding text representation without privacy concerns.`
  },

  stats: {
    "Encodings": "ASCII+UTF-8",
    "Direction": "Bidirectional",
    "Processing": "Client-side",
    "Character Set": "Full Unicode",
    "Data Upload": "0 bytes"
  }
};
