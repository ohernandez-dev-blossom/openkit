/**
 * ASCII Converter Tool Guide Content
 * Comprehensive developer guide for ASCII encoding and decoding
 */

import type { ToolGuideContent } from "./types";

export const asciiGuideContent: ToolGuideContent = {
  toolName: "ASCII Converter",
  toolPath: "/ascii",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Your Text",
      description: "Type or paste any text into the input field. Works with letters, numbers, symbols, and special characters. Each character has a unique ASCII code."
    },
    {
      title: "Select Conversion Direction",
      description: "Choose 'Text → ASCII' to convert text to ASCII codes, or 'ASCII → Text' to decode ASCII codes back to readable text. Switch between modes instantly."
    },
    {
      title: "Choose Format",
      description: "Select decimal (standard), hexadecimal (base-16), or binary (base-2) format. Decimal is most common, hex is compact, binary shows bit representation."
    },
    {
      title: "Copy Results",
      description: "Click copy button to grab converted output. Use for debugging, protocol analysis, encoding verification, or education purposes."
    }
  ],

  introduction: {
    title: "What is ASCII Conversion?",
    content: `ASCII (American Standard Code for Information Interchange) is a character encoding standard assigning numeric codes (0-127) to letters, numbers, punctuation, and control characters. ASCII conversion transforms readable text into numeric codes or decodes numbers back to text, essential for understanding how computers store and transmit textual data.

Every character you type on a keyboard corresponds to an ASCII value. 'A' is 65, 'a' is 97, '0' is 48, space is 32. These numeric codes represent characters in computer memory, network protocols, file formats, and serial communications. ASCII forms the foundation of text encoding, predating Unicode while remaining critical for legacy systems, embedded devices, and protocol specifications.

### Why ASCII Conversion Matters for Developers

**Protocol Development:** Network protocols and serial communications often use ASCII control characters. HTTP headers, SMTP email, FTP commands all use ASCII. Converting between text and codes helps debug protocol implementations and understand wire format data transmission.

**Embedded Systems:** Microcontrollers and embedded devices frequently use raw ASCII codes for communication. Arduino serial communication, sensor data parsing, and industrial control systems send ASCII codes over UART, I2C, or SPI buses. Developers decode byte streams into readable text using ASCII conversion.

**Data Format Analysis:** Binary file formats often contain ASCII text markers. File headers use ASCII magic numbers ("PNG" = [80, 78, 71], "GIF" = [71, 73, 70]). Hex editors display ASCII alongside binary data. Understanding ASCII codes helps parse file formats and identify data structures in binary files.

**Security and Encoding:** Security tools analyze ASCII codes to detect malicious payloads, SQL injection, or command injection attacks. Special characters have specific ASCII codes used in exploit strings. URL encoding, percent encoding, and escape sequences rely on ASCII values.

**Debugging Character Issues:** When text displays incorrectly (garbled characters, boxes, question marks), ASCII conversion reveals the actual byte values received vs expected. Compare ASCII codes of corrupted text against original to diagnose encoding problems, character set mismatches, or transmission errors.

### ASCII vs Extended ASCII vs Unicode

**Standard ASCII (0-127):** Original 7-bit encoding covering English letters (A-Z, a-z), digits (0-9), punctuation, and 33 control characters (newline, tab, carriage return). Universally supported. Sufficient for English text, code, and basic protocols.

**Extended ASCII (128-255):** 8-bit extension adding accented characters, currency symbols, and box-drawing characters. Multiple incompatible extensions exist (ISO-8859-1, Windows-1252, IBM Code Pages). Non-standardized - same code represents different characters in different code pages.

**Unicode (UTF-8, UTF-16):** Modern standard supporting all world languages with over 143,000 characters. UTF-8 encodes ASCII as single bytes (backward compatible) but uses multi-byte sequences for non-ASCII characters. Unicode replaced ASCII for internationalization but ASCII remains embedded in protocols and low-level systems.

This tool focuses on standard ASCII (0-127) in three representations: decimal (human-readable numbers), hexadecimal (compact notation used in programming), and binary (bit-level representation showing actual computer storage). All conversion happens client-side - your text never leaves your browser.

### Common ASCII Code Ranges

**Control Characters (0-31):** Non-printable codes controlling text formatting. CR (13), LF (10), TAB (9), NULL (0), ESC (27). Used in terminals, file formats, network protocols. Mostly obsolete for modern text but critical in protocol implementations.

**Printable Characters (32-126):** Visible characters including space (32), digits 0-9 (48-57), uppercase A-Z (65-90), lowercase a-z (97-122), punctuation and symbols. This range covers standard keyboards and English text.

**Extended Codes (127-255):** DEL (127) and extended ASCII for accented characters. Not portable across systems - avoid in protocols or interchange formats. Use UTF-8 for international characters.`
  },

  useCases: [
    {
      title: "Debug Serial Communication Protocols",
      description: "Analyze UART, RS-232, or serial port data transmitted between microcontrollers and computers. Convert raw byte values to ASCII to see command strings, convert protocol commands to ASCII codes for transmission.",
      example: `// Arduino serial command parsing
// Received bytes: [83, 84, 65, 82, 84]
// Convert to ASCII: S=83, T=84, A=65, R=82, T=84
// Command string: "START"

// Sending ASCII command from code:
Serial.write(83); // 'S'
Serial.write(84); // 'T'
Serial.write(65); // 'A'
Serial.write(82); // 'R'
Serial.write(84); // 'T'

// Or use ASCII conversion to verify:
// "START" → [83, 84, 65, 82, 84]`
    },
    {
      title: "Analyze Binary File Headers",
      description: "Identify file types by examining ASCII magic numbers in hex editors. File format specifications use ASCII codes to mark file types. Convert hex values to ASCII to read file signatures and metadata.",
      example: `// Common file magic numbers (ASCII codes)
PNG: [89, 50, 4E, 47] → "‰PNG"
GIF: [47, 49, 46] → "GIF"
JPEG: [FF, D8, FF, E0] → (binary + "ÿØÿà")
PDF: [25, 50, 44, 46] → "%PDF"
ZIP: [50, 4B, 03, 04] → "PK.."

// Example: Hex dump of PNG file
89 50 4E 47 0D 0A 1A 0A
^ ASCII: ‰  P  N  G  CR LF SUB LF

// Use ASCII converter to decode hex bytes
// to identify unknown file types`
    },
    {
      title: "Implement Character Encoding Validation",
      description: "Verify text contains only valid ASCII characters before transmission or storage. Check for non-ASCII characters that could cause encoding errors in ASCII-only systems. Validate form input contains printable ASCII.",
      example: `// JavaScript: Validate ASCII-only input
function isValidASCII(text: string): boolean {
  for (let char of text) {
    const code = char.charCodeAt(0);
    // Check if code is in valid ASCII range (0-127)
    if (code > 127) {
      console.log(\`Non-ASCII: '\${char}' = \${code}\`);
      return false;
    }
  }
  return true;
}

// Test with ASCII converter:
// "Hello" → all codes 32-127 ✓
// "Café" → 'é' = 233 (> 127) ✗
// Must use UTF-8 or warn user about non-ASCII

// Filter to ASCII-only:
function toASCII(text: string): string {
  return text.split('').filter(c =>
    c.charCodeAt(0) <= 127
  ).join('');
}`
    },
    {
      title: "Educational Programming Exercises",
      description: "Teach character encoding fundamentals to students learning programming. Demonstrate how characters map to numbers, explain why 'A' + 32 equals 'a', show binary representation of text data stored in memory.",
      example: `// Learning exercise: ASCII case conversion
// Uppercase A-Z: 65-90
// Lowercase a-z: 97-122
// Difference: 32 (0x20 in hex)

'A' (65) + 32 = 'a' (97)
'Z' (90) + 32 = 'z' (122)

// Efficient case conversion using ASCII math:
function toLowerCase(char: string): string {
  const code = char.charCodeAt(0);
  // If uppercase (65-90), add 32
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(code + 32);
  }
  return char;
}

// Use ASCII converter to verify:
// 'A' → 65, 'a' → 97 (difference = 32)
// 'Z' → 90, 'z' → 122 (difference = 32)`
    }
  ],

  howToUse: {
    title: "How to Use This ASCII Converter",
    content: `This tool provides instant bidirectional conversion between text and ASCII codes in three formats: decimal, hexadecimal, and binary. All processing happens client-side using JavaScript character code functions.

### Converting Text to ASCII Codes

Paste or type text into the input field when 'Text → ASCII' mode is selected. The tool displays ASCII code for each character separated by spaces. Choose format: decimal (0-127), hexadecimal (00-7F), or binary (00000000-01111111).

Decimal format shows standard numeric codes found in ASCII tables. Hexadecimal format (base-16) is compact and commonly used in programming (0x41 = 'A'). Binary format (base-2) shows bit-level representation (01000001 = 'A' = 65), useful for understanding how computers store characters.

### Converting ASCII Codes to Text

Switch to 'ASCII → Text' mode and enter numeric codes separated by spaces or commas. Select matching format (decimal, hex, or binary). The tool decodes codes to readable characters. Invalid codes display as '?' character.

Enter decimal codes like: \`72 101 108 108 111\` → "Hello"
Enter hex codes like: \`48 65 6C 6C 6F\` → "Hello"
Enter binary codes like: \`01001000 01100101 01101100 01101100 01101111\` → "Hello"

### Understanding Control Characters

ASCII codes 0-31 are control characters (non-printable). These appear as special symbols or whitespace. TAB (9), newline (10), carriage return (13) are common control codes. Most other control characters are obsolete terminal commands.

Code 32 is SPACE (visible as blank space). Codes 33-126 are printable characters (letters, digits, punctuation). Code 127 is DEL (delete character). Codes above 127 are extended ASCII (non-standard).

### Format Comparison

**Decimal:** Human-readable, standard ASCII tables use decimal. 'A' = 65, 'Z' = 90, '0' = 48, space = 32.

**Hexadecimal:** Compact, used in programming and hex editors. Two hex digits per character. 'A' = 41, 'Z' = 5A, '0' = 30, space = 20. Prefixed with 0x in code.

**Binary:** 8 bits (1 byte) per ASCII character. Shows actual bit pattern stored in computer memory. 'A' = 01000001. Useful for understanding bitwise operations and low-level encoding.`,
    steps: [
      {
        name: "Enter Text or Codes",
        text: "Type text for encoding or paste ASCII codes for decoding. Supports all standard keyboard characters.",
      },
      {
        name: "Select Mode",
        text: "Choose 'Text → ASCII' to encode or 'ASCII → Text' to decode. Switch modes preserves input for reverse conversion.",
      },
      {
        name: "Pick Format",
        text: "Select decimal (standard), hexadecimal (programming), or binary (bit-level) format for ASCII codes.",
      },
      {
        name: "Copy Results",
        text: "Click copy button to grab converted output. Use in code, debug logs, protocol documentation, or teaching materials.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between ASCII and Unicode?",
      answer: "ASCII uses 7 bits encoding 128 characters (0-127) covering English letters, digits, punctuation, and control codes. Unicode uses variable-length encoding (UTF-8, UTF-16) supporting 143,000+ characters from all world languages, emojis, and symbols. ASCII is subset of Unicode - first 128 Unicode code points match ASCII exactly. UTF-8 encodes ASCII as single bytes (backward compatible) but uses 2-4 bytes for non-ASCII characters. Use ASCII for simple English text and legacy protocols, Unicode (UTF-8) for international text and modern applications."
    },
    {
      question: "Why is 'A' = 65 and 'a' = 97 in ASCII?",
      answer: "ASCII design placed uppercase letters A-Z at consecutive codes 65-90, lowercase a-z at 97-122. The 32-code difference (0x20 in hex) is a single bit flip in binary: 'A' = 01000001, 'a' = 01100001 (bit 5 changed). This deliberate design allows efficient case conversion by toggling one bit. Adding 32 converts uppercase to lowercase, subtracting 32 converts lowercase to uppercase. This bit pattern made case conversion fast on 1960s computers when ASCII was designed."
    },
    {
      question: "What are ASCII control characters used for?",
      answer: "Control characters (codes 0-31) were designed for 1960s teletype machines and terminals to control printing, line positioning, and communication. Common ones still used: LF (10) = line feed/newline in Unix, CR (13) = carriage return in Windows (\\r), TAB (9) = tab spacing, NULL (0) = string terminator in C, ESC (27) = escape sequences in terminals. Most others (BEL=bell, ACK=acknowledge, NAK=negative acknowledge) are obsolete but remain in legacy protocols and file formats."
    },
    {
      question: "Can ASCII handle emojis and special symbols?",
      answer: "No, ASCII only covers 128 characters (0-127). Emojis, accented letters (é, ñ, ü), Asian characters, mathematical symbols, and most special glyphs require Unicode encoding (UTF-8 or UTF-16). Extended ASCII (128-255) adds some accented characters but isn't standardized. For international text or emojis, use UTF-8 encoding which represents ASCII characters identically (backward compatible) but uses multi-byte sequences for characters beyond ASCII range."
    },
    {
      question: "How do I convert hex ASCII codes to text in code?",
      answer: "In JavaScript: String.fromCharCode(0x48, 0x65, 0x6C, 0x6C, 0x6F) returns 'Hello'. In Python: ''.join(chr(int(h, 16)) for h in ['48', '65', '6C', '6C', '6F']) converts hex strings. In C: (char)0x48 casts hex to character. Most languages provide charCodeAt() or ord() to get ASCII code from character, and fromCharCode() or chr() to convert code back to character. Use parseInt(hex, 16) to convert hex string to decimal number first."
    },
    {
      question: "Why does my text show ? characters after ASCII conversion?",
      answer: "Question marks (?) appear when decoding invalid ASCII codes - codes above 127, negative numbers, non-numeric values, or malformed input. ASCII only defines codes 0-127. Codes 128-255 are extended ASCII (non-standard). If converting text with non-ASCII characters (accented letters, emojis), they have Unicode code points above 127 which don't fit in ASCII range. Use Unicode/UTF-8 encoding instead of ASCII for international text. Verify input codes are valid ASCII range (0-127)."
    },
    {
      question: "What's the difference between decimal, hex, and binary ASCII?",
      answer: "Same ASCII codes in different number bases. Decimal (base-10): human-readable, used in ASCII tables - 'A'=65. Hexadecimal (base-16): compact, used in programming and hex editors - 'A'=0x41 (4×16 + 1 = 65). Binary (base-2): bit representation in computer memory - 'A'=01000001 (64+1=65). All represent same character code, just different notation. Programmers use hex for brevity. Binary shows actual bits stored. Decimal is easiest for humans to read."
    },
    {
      question: "How do I handle newlines and tabs in ASCII conversion?",
      answer: "Newline characters appear as code 10 (LF in Unix/Mac) or codes 13+10 (CR+LF in Windows). Tab character is code 9. When converting text to ASCII, newlines and tabs produce their ASCII codes like any character. When converting ASCII codes to text, codes 9, 10, 13 render as whitespace. To see control characters explicitly, use escape sequences: \\n (newline), \\r (carriage return), \\t (tab). Some tools display control codes as special symbols (␊ for LF, ␉ for TAB)."
    },
    {
      question: "Can I use ASCII conversion for password security?",
      answer: "No, ASCII conversion is not encryption - it's just character encoding. Converting 'password' to ASCII codes [112, 97, 115, 115, 119, 111, 114, 100] provides zero security. Anyone can instantly reverse ASCII codes to text. For password security, use cryptographic hashing (SHA-256, bcrypt, Argon2) or encryption (AES). ASCII conversion is for encoding/debugging, not security. Never store passwords as ASCII codes - they're trivially decoded."
    },
    {
      question: "Is my text data private when using this tool?",
      answer: "Absolutely. All ASCII conversion happens entirely in your browser using JavaScript's built-in charCodeAt() and fromCharCode() functions. Your text never leaves your device or gets uploaded to servers. No network requests are made with your content. Verify by opening browser DevTools Network tab - zero uploads. Safe for converting confidential data, proprietary code, passwords (though not secure), or any sensitive text. Tool works completely offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This ASCII converter operates entirely client-side using JavaScript's native character encoding functions. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All conversion happens in your browser using charCodeAt() and String.fromCharCode() JavaScript functions. Text stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your input text and ASCII codes are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you convert, character values, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for converting confidential code, protocol data, debugging information, educational content, or any private text. Use with confidence for embedded systems development, security analysis, or protocol engineering requiring ASCII encoding.`
  },

  stats: {
    "ASCII Range": "0-127",
    "Formats": "3",
    "Conversion Speed": "<1ms",
    "Max Length": "Unlimited",
    "Server Uploads": "0"
  }
};
