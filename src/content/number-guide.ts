/**
 * Number Base Converter Tool Guide Content
 * Comprehensive developer guide for number system conversion
 */

import type { ToolGuideContent } from "./types";

export const numberGuideContent: ToolGuideContent = {
  toolName: "Number Base Converter",
  toolPath: "/number",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Number Value",
      description: "Input number in any supported base: decimal (0-9), binary (0-1), octal (0-7), or hexadecimal (0-F). Tool auto-detects format or select source base explicitly. Handles integers of any size."
    },
    {
      title: "Select Source Base",
      description: "Choose input number system: Binary (base-2), Octal (base-8), Decimal (base-10), or Hexadecimal (base-16). Tool validates input ensuring digits match selected base preventing conversion errors."
    },
    {
      title: "View All Conversions",
      description: "See instant conversion to all bases simultaneously. One input shows binary, octal, decimal, and hexadecimal representations. Compare number systems side-by-side understanding different representations of same value."
    },
    {
      title: "Copy Converted Values",
      description: "Click copy button for any output format. Use converted values in code, documentation, configuration files, or debugging. Quick conversion between programmer number systems without manual calculation."
    }
  ],

  introduction: {
    title: "What is Number Base Conversion?",
    content: `Number base conversion transforms values between different numeral systems used in computing. Decimal (base-10) is human-readable everyday counting. Binary (base-2) is computer internal representation. Hexadecimal (base-16) provides compact notation for binary data. Octal (base-8) appears in file permissions and legacy systems. Same numeric value has different representations depending on base - 255 decimal = 11111111 binary = FF hexadecimal.

Computers store everything as binary (0s and 1s). Humans prefer decimal for readability. Programmers use hexadecimal as shorthand for binary - each hex digit represents exactly 4 binary bits. Octal appears in Unix file permissions and some programming language literals. Converting between bases helps understand low-level data representation, debug binary protocols, and work with hardware interfaces.

### Why Developers Need Base Conversion

**Debugging Binary Data:** Network packets, file formats, and hardware communication use binary representation. Hex dumps show binary data compactly (FF = 11111111). Converting hex to decimal calculates actual values. Debugging protocol implementations requires translating between human-readable decimal and machine-level binary/hex representations.

**Color Code Calculations:** Web colors use hexadecimal RGB values: #FF5733 represents Red=255, Green=87, Blue=51 in decimal. Designers work in hex, CSS calculations need decimal. Converting between bases helps manipulate colors programmatically, calculate gradients, or understand color channel values.

**Bitwise Operations:** Binary representation shows individual bits for bitwise AND, OR, XOR operations. Converting decimal to binary visualizes bit patterns. Useful for bit flags, permissions, network masks, and low-level programming. Understanding binary representation prevents bitwise operation mistakes.

**Memory Addresses:** Programming debuggers and memory dumps show addresses in hexadecimal. Converting hex addresses to decimal calculates offsets and distances. Understanding hex addresses helps interpret stack traces, debug memory corruption, and analyze system crashes.

**Unix File Permissions:** Octal notation (755, 644) represents file permission bits. rwxr-xr-x = 755 octal = 493 decimal. Understanding octal-binary conversion helps set permissions programmatically, interpret permission errors, and debug access control issues.

### Number Base Fundamentals

**Binary (Base-2):** Uses digits 0 and 1. Each position represents power of 2. 1011 binary = (1×8) + (0×4) + (1×2) + (1×1) = 11 decimal. Computer native representation - all data ultimately stored as binary. Used in bitwise operations, boolean logic, and hardware interfaces.

**Octal (Base-8):** Uses digits 0-7. Each position represents power of 8. 17 octal = (1×8) + (7×1) = 15 decimal. Historically popular before hexadecimal dominance. Still used in Unix permissions and some programming language literals (C, JavaScript octal escapes).

**Decimal (Base-10):** Standard human counting system using digits 0-9. Each position represents power of 10. 123 = (1×100) + (2×10) + (3×1). Natural for humans but inefficient for computers. Most programming language defaults for numeric literals.

**Hexadecimal (Base-16):** Uses digits 0-9 and letters A-F (A=10, B=11... F=15). Each position represents power of 16. 2F hex = (2×16) + (15×1) = 47 decimal. Compact binary representation - one hex digit = 4 binary bits. Preferred for memory addresses, color codes, byte arrays, and cryptographic hashes.

### Conversion Relationships

**Binary to Hexadecimal:** Direct conversion - group binary digits in sets of 4, convert each group to hex digit. 11010111 binary = 1101 0111 = D7 hex. Easy mental math for programmers working with binary data.

**Binary to Octal:** Group binary digits in sets of 3, convert each group to octal digit. 11010111 binary = 011 010 111 = 327 octal. Less common than hex but still relevant for specific use cases.

**Decimal Conversions:** Require calculation using division/remainders or multiplication/addition. Not as straightforward as binary-hex grouping. Tools automate decimal conversions preventing arithmetic errors.

This tool handles all common programmer number bases with instant conversion showing all representations simultaneously. Input in any base, see output in all bases. Validates input preventing invalid digits for selected base. All conversion client-side using JavaScript integer math - your numbers never upload to servers.

### Practical Programming Applications

**Bit Manipulation:** Developers working with flags, permissions, or packed data convert between binary (see individual bits) and decimal (code values). Example: checking if bit 3 is set - convert to binary, inspect bit position 3.

**Color Palette Development:** CSS colors defined in hex (#RGB). Converting to decimal RGB values enables programmatic color manipulation: darkening (#FF0000 → decimal 255,0,0 → reduce → 200,0,0 → hex #C80000).

**Network Subnet Calculations:** IP subnet masks (255.255.255.0) convert to binary showing network/host boundaries. Binary representation clarifies CIDR notation and address ranges. Essential for network engineering and cloud infrastructure.

**Cryptographic Hash Analysis:** SHA-256 and MD5 hashes output hexadecimal. Converting to binary or decimal helps understand hash properties, compare hash values, or implement custom hash functions. Hexadecimal provides compact representation of 256-bit values.`
  },

  useCases: [
    {
      title: "Convert Hex Color Codes to Decimal RGB",
      description: "Web colors use hexadecimal notation. Converting to decimal RGB values enables programmatic color manipulation in JavaScript, calculating gradients, or adjusting brightness/saturation using arithmetic operations on RGB channels.",
      example: `// CSS color in hexadecimal
const hexColor = "#FF5733";

// Extract hex components
const red = "FF";    // Red channel
const green = "57";  // Green channel
const blue = "33";   // Blue channel

// Convert hex to decimal using base converter
// FF hex = 255 decimal
// 57 hex = 87 decimal
// 33 hex = 51 decimal

const rgbColor = {
  r: 255,
  g: 87,
  b: 51
};

// Now can manipulate colors programmatically
function darken(color, amount) {
  return {
    r: Math.max(0, color.r - amount),
    g: Math.max(0, color.g - amount),
    b: Math.max(0, color.b - amount)
  };
}

const darker = darken(rgbColor, 50);
// r: 205, g: 37, b: 1

// Convert back to hex: CD2501
// New color: #CD2501`
    },
    {
      title: "Understand Unix File Permission Bits",
      description: "Unix permissions use octal notation (755, 644). Converting to binary reveals individual permission bits (read, write, execute) for owner, group, and others. Understanding binary representation helps set permissions programmatically or debug access issues.",
      example: `// Common Unix permissions in octal
const permissions = {
  '755': 'rwxr-xr-x',  // Executable files
  '644': 'rw-r--r--',  // Regular files
  '600': 'rw-------'   // Private files
};

// Convert 755 octal to understand bits
// 755 octal = 111 101 101 binary

// Binary breakdown:
// 111 = rwx (owner: read+write+execute)
// 101 = r-x (group: read+execute, no write)
// 101 = r-x (others: read+execute, no write)

// Convert to decimal for chmod() calls
// 755 octal = 493 decimal

// JavaScript chmod example
import { chmod } from 'fs/promises';

// Set permissions programmatically
await chmod('script.sh', 0o755);  // Octal literal
await chmod('data.txt', 0o644);

// Calculate permissions from bits
function octaltoBinary(octal) {
  // 7 = 111, 5 = 101, 5 = 101
  // Shows exact permission bits
}

// Debugging: Why can't user execute file?
// File has 644 = 110 100 100
// Others: 100 = r-- (read only, no execute)
// Need 755 = 111 101 101 for execute permission`
    },
    {
      title: "Debug Network Subnet Masks",
      description: "IP subnet masks (255.255.255.0) define network boundaries. Converting decimal to binary shows which bits separate network from host addresses. Essential for understanding CIDR notation, calculating address ranges, and configuring network infrastructure.",
      example: `// Subnet mask analysis
const subnetMask = "255.255.255.0";

// Convert each octet to binary
// 255 decimal = 11111111 binary
// 255 decimal = 11111111 binary
// 255 decimal = 11111111 binary
// 0 decimal   = 00000000 binary

// Full mask: 11111111.11111111.11111111.00000000

// Understanding the mask:
// 1s = network portion (24 bits)
// 0s = host portion (8 bits)
// CIDR notation: /24

// Example IP address: 192.168.1.100
// Convert to binary:
// 192 = 11000000
// 168 = 10101000
// 1   = 00000001
// 100 = 01100100

// Apply mask (AND operation):
// Network: 192.168.1.0 (bits where mask=1)
// Host: 100 (bits where mask=0)

// Calculate network capacity:
// Host bits: 8 bits = 2^8 = 256 addresses
// Usable: 254 (minus network and broadcast)

// Different subnet: 255.255.240.0
// 240 = 11110000 binary
// Network bits: 20, Host bits: 12
// Capacity: 2^12 = 4096 addresses`
    },
    {
      title: "Implement Bit Flags and Permissions",
      description: "Feature flags, user permissions, and configuration options often use bitwise flags. Converting between decimal and binary helps define flags, check permissions, and debug bitwise logic ensuring correct bit manipulation.",
      example: `// User permission system using bit flags
const PERMISSIONS = {
  READ:    1,  // 0001 binary
  WRITE:   2,  // 0010 binary
  DELETE:  4,  // 0100 binary
  ADMIN:   8   // 1000 binary
};

// Combine permissions with bitwise OR
const editorPerms = PERMISSIONS.READ | PERMISSIONS.WRITE;
// 0001 | 0010 = 0011 = 3 decimal

const adminPerms = PERMISSIONS.READ | PERMISSIONS.WRITE |
                  PERMISSIONS.DELETE | PERMISSIONS.ADMIN;
// 0001 | 0010 | 0100 | 1000 = 1111 = 15 decimal

// Check permission with bitwise AND
function hasPermission(userPerms, permission) {
  return (userPerms & permission) !== 0;
}

// User with editorPerms (3 = 0011 binary)
hasPermission(3, PERMISSIONS.READ);   // 0011 & 0001 = 0001 ✓
hasPermission(3, PERMISSIONS.WRITE);  // 0011 & 0010 = 0010 ✓
hasPermission(3, PERMISSIONS.DELETE); // 0011 & 0100 = 0000 ✗
hasPermission(3, PERMISSIONS.ADMIN);  // 0011 & 1000 = 0000 ✗

// Debugging: Why does user have unexpected permissions?
// User permission value: 14 decimal
// Convert to binary: 1110
// Break down bits:
// 1110 = 1000 | 0100 | 0010
//      = ADMIN | DELETE | WRITE
// Missing READ (should be 1111 = 15)`
    }
  ],

  howToUse: {
    title: "How to Use the Number Base Converter",
    content: `This tool converts numbers between binary, octal, decimal, and hexadecimal bases instantly. Input in any base, see output in all bases simultaneously for easy comparison.

### Entering Numbers for Conversion

Type number value in input field. Select source base (binary, octal, decimal, hex) from dropdown or let tool auto-detect based on digits. Tool validates input ensuring digits match selected base - hexadecimal accepts 0-9 and A-F, binary only accepts 0-1, etc.

For hexadecimal input, use uppercase or lowercase letters (F or f both work). Prefix notation (0x for hex, 0b for binary, 0o for octal) is optional - tool recognizes values with or without prefixes. Handles large numbers limited only by JavaScript integer precision.

### Understanding Output Formats

Tool displays conversions in all bases simultaneously:

**Binary Output:** Shows 0s and 1s representing value in base-2. Useful for visualizing bit patterns in bitwise operations, permission flags, or network masks. Long binary strings group in sets of 4 or 8 for readability.

**Octal Output:** Base-8 representation using digits 0-7. Common in Unix file permissions (755, 644). Each octal digit represents 3 binary bits. Less common than hex but still relevant in specific domains.

**Decimal Output:** Standard base-10 representation humans use for counting. Most programming languages use decimal for numeric literals unless otherwise specified. Easy to compare magnitudes and do mental arithmetic.

**Hexadecimal Output:** Base-16 using digits 0-9 and letters A-F. Compact representation of binary - one hex digit = 4 binary bits. Common for memory addresses, color codes, byte arrays, cryptographic hashes. Uppercase or lowercase output based on preference.

### Common Conversion Patterns

**Hex to Decimal:** Convert color codes, memory addresses, or hardware values to decimal for arithmetic operations. #FF5733 → R:255, G:87, B:51.

**Decimal to Binary:** Visualize bit patterns for understanding bitwise operations, debugging flags, or analyzing network masks. 255 → 11111111 shows all bits set.

**Binary to Hex:** Compact representation of binary data. Group binary digits in sets of 4, convert each to hex digit. 11010111 → D7.

**Octal to Decimal:** Unix permission conversion. 755 octal → 493 decimal for programmatic chmod() calls.

### Validation and Error Handling

Tool validates input preventing invalid conversions. Binary accepts only 0 and 1. Octal accepts 0-7. Decimal accepts 0-9. Hexadecimal accepts 0-9 and A-F. Entering invalid digit for selected base shows error message guiding correction.

Select correct source base before conversion. If input is "FF" but binary is selected, tool reports error (F invalid for binary). Choose hexadecimal as source base for correct conversion.

### Practical Workflow Examples

**Color Manipulation:** Paste hex color (#RGB), see decimal values, calculate modified RGB, convert back to hex for CSS.

**Permission Setting:** Enter octal permission (755), view binary representation understanding individual bits, convert to decimal for chmod() API calls.

**Memory Debugging:** Copy hex address from debugger, convert to decimal calculating offsets, or convert to binary inspecting individual address bits.

**Protocol Analysis:** Binary packet data converted to hex for compact display, to decimal for value interpretation, depending on analysis needs.`,
    steps: [
      {
        name: "Enter Number",
        text: "Input number in any base: binary (0-1), octal (0-7), decimal (0-9), or hexadecimal (0-F). Tool accepts values with or without base prefixes (0x, 0b, 0o)."
      },
      {
        name: "Select Source Base",
        text: "Choose input number system from dropdown or let tool auto-detect. Validates input ensuring digits match selected base preventing conversion errors."
      },
      {
        name: "View Conversions",
        text: "See instant conversion to all bases simultaneously. Compare binary, octal, decimal, and hexadecimal representations side-by-side understanding different number system representations."
      },
      {
        name: "Copy Values",
        text: "Click copy button for any output format. Use in code, documentation, debugging, or configuration files. Quick access to converted values without manual calculation."
      }
    ]
  },

  faqs: [
    {
      question: "What are the practical differences between number bases?",
      answer: "Binary (base-2) is how computers actually store data - every value ultimately represented as 0s and 1s. Decimal (base-10) is human-friendly for everyday counting and arithmetic. Hexadecimal (base-16) provides compact notation for binary - one hex digit represents exactly 4 binary bits. Octal (base-8) appears in Unix permissions and legacy systems. Programmers convert between bases for different contexts: binary for bit manipulation, hex for memory addresses, decimal for human-readable values."
    },
    {
      question: "How do I convert hexadecimal color codes to RGB decimal values?",
      answer: "Hex color #RRGGBB has three 2-digit hex pairs. Split into components: #FF5733 → FF (red), 57 (green), 33 (blue). Convert each hex pair to decimal: FF=255, 57=87, 33=51. Result: rgb(255, 87, 51). Use base converter entering each hex pair (FF, 57, 33) getting decimal values. Reverse process converts RGB decimal back to hex for CSS color codes."
    },
    {
      question: "Why do Unix file permissions use octal notation?",
      answer: "Each permission bit (read, write, execute) maps to octal digit naturally. 3 bits per permission group (owner, group, others) = 1 octal digit (0-7). 7=rwx (111 binary), 6=rw- (110), 5=r-x (101), 4=r-- (100). Three groups need three octal digits: 755 = rwxr-xr-x. Octal provides compact representation of 9 permission bits (3 groups × 3 permissions). Easier than decimal (493) or binary (111101101) for human use."
    },
    {
      question: "What's the relationship between binary and hexadecimal?",
      answer: "One hexadecimal digit represents exactly 4 binary bits. 0-9 and A-F (16 values) matches 0000-1111 (16 combinations of 4 bits). Convert binary to hex: group bits in sets of 4, convert each group to hex digit. 11010111 binary = 1101 0111 = D7 hex. Reverse: each hex digit expands to 4 binary bits. Hexadecimal provides compact human-readable representation of binary data - much shorter than writing all 0s and 1s."
    },
    {
      question: "Can I convert numbers larger than standard integer limits?",
      answer: "This tool handles numbers within JavaScript's safe integer range (up to 2^53 - 1 ≈ 9 quadrillion). Larger values may lose precision due to JavaScript number representation limitations. For cryptographic work with very large numbers (256-bit hashes, RSA keys), use specialized libraries supporting arbitrary precision arithmetic (BigInt in modern JavaScript). This tool works for typical programming scenarios including 64-bit memory addresses and color calculations."
    },
    {
      question: "How do I understand binary subnet masks?",
      answer: "Convert subnet mask octets to binary. 255.255.255.0 → 11111111.11111111.11111111.00000000. Consecutive 1s are network bits, 0s are host bits. Count 1s for CIDR notation: 24 ones = /24. Number of 0s determines network size: 8 zeros = 2^8 = 256 addresses. Understanding binary representation helps calculate network ranges, valid host addresses, and subnet capacity. Use converter translating each octet (255→binary, 0→binary) visualizing network/host boundary."
    },
    {
      question: "Why does hex use letters A-F?",
      answer: "Hexadecimal needs 16 unique symbols (0-15 in decimal). Digits 0-9 provide 10 symbols. Letters A-F provide 6 more: A=10, B=11, C=12, D=13, E=14, F=15. This creates 16 total symbols for base-16 notation. Uppercase or lowercase both acceptable (FF = ff). Hex is convenient because 16 = 2^4 - each hex digit represents exactly 4 binary bits. Letters chosen for easy handwriting and typewriter compatibility in 1960s computing."
    },
    {
      question: "How do programming languages indicate different number bases?",
      answer: "Most languages use prefixes: 0x for hexadecimal (0xFF = 255), 0b for binary (0b1111 = 15), 0o for octal (0o755 = 493). JavaScript/Python: 0x prefix for hex, 0b for binary, 0o for octal. C/C++: 0x for hex, 0 prefix for octal (legacy, confusing). No prefix assumes decimal. Some languages support underscores for readability: 0xFF_FF_FF, 0b1111_0000. Always include prefix in code making base explicit preventing confusion."
    },
    {
      question: "What's the easiest way to memorize hex-decimal conversions?",
      answer: "Memorize A-F values: A=10, B=11, C=12, D=13, E=14, F=15. Practice common hex values: FF=255 (max byte), 80=128 (half byte), 100=256. Learn hex powers of 2: 10=16, 100=256, 1000=4096. Recognize patterns: 0x10, 0x20, 0x30... are 16, 32, 48... Use converter frequently - after several weeks of regular use, common conversions become automatic. Focus on values you encounter often (color codes, memory addresses, status codes)."
    },
    {
      question: "Is my data private when converting numbers?",
      answer: "Absolutely. All number base conversion happens entirely in your browser using JavaScript parseInt() and toString() functions. Your numbers never upload to servers. No network requests are made. Verify by checking browser DevTools Network tab showing zero outbound requests. Safe for converting sensitive values, proprietary memory addresses, security tokens, or any confidential numeric data. Tool works completely offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your numbers never leave your browser. This base converter operates entirely client-side using JavaScript's built-in number parsing and conversion functions. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All base conversions happen in your browser using parseInt() and toString() with radix parameters. Your values stay on your device.
- **No Server Communication:** We don't have backend services processing numbers. The tool works completely offline after initial page load.
- **No Data Storage:** Your input values and converted results are not saved, logged, or transmitted anywhere. Refresh the page and it's gone.
- **No Value Tracking:** We don't track what you convert, number patterns, or any value-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your numbers.

Safe for converting memory addresses, cryptographic values, proprietary color schemes, security tokens, hardware identifiers, or any confidential numeric data requiring base conversion without privacy concerns.`
  },

  stats: {
    "Supported Bases": "4",
    "Max Integer": "2^53-1",
    "Processing": "Client-side",
    "Precision": "Exact",
    "Data Upload": "0 bytes"
  }
};
