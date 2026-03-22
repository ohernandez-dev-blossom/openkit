/**
 * TOTP Generator Tool Guide Content
 * Comprehensive guide for TOTP code generation
 */

import type { ToolGuideContent } from "./types";

export const totpGuideContent: ToolGuideContent = {
  toolName: "TOTP Generator",
  toolPath: "/totp",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter or Generate a Secret",
      description: "Paste your Base32-encoded secret key, or click 'Generate Random Secret' to create a new one for testing."
    },
    {
      title: "View Your TOTP Code",
      description: "The current 6-digit TOTP code is displayed along with a countdown timer showing when it expires and a new code is generated."
    },
    {
      title: "Configure Parameters",
      description: "Adjust the number of digits (6, 7, or 8), hash algorithm (SHA-1, SHA-256, SHA-512), and time period (15, 30, or 60 seconds)."
    },
    {
      title: "Export as QR Code",
      description: "Generate a QR code containing the otpauth:// provisioning URI that can be scanned by any authenticator app."
    }
  ],

  introduction: {
    title: "What is TOTP (Time-based One-Time Password)?",
    content: `TOTP is a widely used algorithm for two-factor authentication (2FA). It generates short-lived numeric codes from a shared secret key and the current time, as specified in RFC 6238.

### How TOTP Works

1. **Shared Secret:** Both the server and client share a secret key (usually Base32-encoded)
2. **Time Counter:** The current UNIX timestamp is divided by the time period (usually 30 seconds) to create a counter value
3. **HMAC Calculation:** The counter is signed with the secret using HMAC-SHA1 (or SHA-256/SHA-512)
4. **Dynamic Truncation:** A 4-byte segment of the HMAC output is extracted and converted to a numeric code
5. **Digit Extraction:** The truncated value is reduced to the desired number of digits (typically 6)

### Standards & Compatibility

TOTP is defined in **RFC 6238** and builds on the HOTP algorithm from **RFC 4226**. It's supported by virtually all authenticator apps including Google Authenticator, Microsoft Authenticator, Authy, 1Password, and Bitwarden.

### This Tool

This TOTP generator implements the algorithm from scratch using the Web Crypto API for HMAC calculations. No external libraries are used. All processing happens in your browser — your secret keys never leave your device.`
  },

  useCases: [
    {
      title: "Test 2FA Implementations",
      description: "Verify your server-side TOTP implementation by comparing generated codes. Enter the same secret and parameters to ensure your backend produces matching codes."
    },
    {
      title: "Emergency Code Generation",
      description: "If you have your TOTP secret backed up, you can generate codes without an authenticator app. Useful when your phone is unavailable."
    },
    {
      title: "Onboarding QR Code Generation",
      description: "Create otpauth:// QR codes for provisioning new users in your application. Generate and display the QR during the 2FA setup flow."
    },
    {
      title: "Learn TOTP Internals",
      description: "Understand how time-based one-time passwords work by experimenting with different algorithms, periods, and digit lengths. See the code update in real-time."
    }
  ],

  howToUse: {
    title: "How to Use the TOTP Generator",
    content: `This tool lets you generate TOTP codes from a Base32 secret key. You can test with a random secret or enter your own.

### Entering a Secret

Secrets must be Base32-encoded (characters A-Z and 2-7). Most services provide the secret in this format during 2FA setup. Spaces and lowercase are automatically handled.

### Understanding the Countdown

The circular timer shows how much time remains before the current code expires. When the timer reaches zero, a new code is automatically generated. The default period is 30 seconds (the most common setting).

### QR Code Provisioning

The QR code encodes an otpauth:// URI in this format:
\`otpauth://totp/LABEL?secret=SECRET&algorithm=SHA1&digits=6&period=30\`

This is the standard format recognized by all major authenticator apps.

### Algorithm Differences

- **SHA-1:** Default for most services (Google Authenticator, etc.)
- **SHA-256:** More secure, used by some enterprise services
- **SHA-512:** Maximum security, less commonly supported`,
    steps: [
      {
        name: "Enter a Secret Key",
        text: "Type or paste a Base32-encoded secret into the input field, or click 'Generate Random Secret' to create one."
      },
      {
        name: "Configure Settings",
        text: "Choose the number of digits (6, 7, or 8), the hash algorithm (SHA-1, SHA-256, SHA-512), and the time period (15, 30, or 60 seconds)."
      },
      {
        name: "View the Code",
        text: "The current TOTP code is displayed prominently with a countdown timer. It automatically refreshes when the period expires."
      },
      {
        name: "Generate QR Code",
        text: "Enter a label and issuer name, then generate a QR code. Scan it with any authenticator app to add the account."
      }
    ]
  },

  faqs: [
    {
      question: "Is it safe to enter my real TOTP secret here?",
      answer: "This tool runs 100% in your browser. Your secret key never leaves your device — no network requests are made. However, for maximum security, only use real secrets on trusted devices and avoid entering them on shared computers."
    },
    {
      question: "What is Base32 encoding?",
      answer: "Base32 uses the characters A-Z and 2-7 to represent binary data. TOTP secrets are Base32-encoded because it's case-insensitive and avoids confusing characters (0 vs O, 1 vs I). A typical secret is 16-32 characters long."
    },
    {
      question: "Why does my code not match my authenticator app?",
      answer: "Ensure the secret, algorithm, digits, and period all match. Most apps default to SHA-1, 6 digits, and 30-second periods. Also check that your device clock is accurate — even a few seconds of drift can produce different codes."
    },
    {
      question: "What's the difference between TOTP and HOTP?",
      answer: "TOTP (Time-based) uses the current time as a counter, so codes expire automatically. HOTP (HMAC-based, RFC 4226) uses an incrementing counter that must be synchronized between client and server. TOTP is more widely used because it doesn't require counter synchronization."
    },
    {
      question: "Can I use SHA-256 or SHA-512 with Google Authenticator?",
      answer: "Google Authenticator primarily supports SHA-1. While it may accept otpauth:// URIs with SHA-256 or SHA-512, compatibility varies. For maximum compatibility, use SHA-1 with 6 digits and a 30-second period."
    },
    {
      question: "How is the TOTP algorithm implemented here?",
      answer: "This tool implements TOTP per RFC 6238 using the Web Crypto API for HMAC calculations. Base32 decoding is done manually without external libraries. The implementation: decode Base32 → compute time counter → HMAC-SHA(secret, counter) → dynamic truncation → modulo 10^digits."
    },
    {
      question: "What is a provisioning URI?",
      answer: "A provisioning URI (otpauth://totp/...) is the standard format for transferring TOTP credentials to authenticator apps, typically via QR code. It encodes the secret, algorithm, digits, period, issuer, and account label."
    },
    {
      question: "How long should a TOTP secret be?",
      answer: "RFC 4226 recommends at least 128 bits (20 bytes, 32 Base32 characters) for SHA-1. For SHA-256, use 256 bits (32 bytes), and for SHA-512, use 512 bits (64 bytes). The 'Generate Random Secret' button creates appropriately sized secrets."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your TOTP secrets are extremely sensitive — they're the keys to your two-factor authentication. This tool is designed with security as the top priority.

- **100% Client-Side:** All TOTP calculations use the Web Crypto API in your browser. Zero network requests are made.
- **No Storage:** Secrets are held only in React state (memory). Nothing is written to localStorage, cookies, or any persistent storage.
- **No Logging:** We never log, track, or transmit secret keys or generated codes.
- **Open Algorithm:** The TOTP implementation follows RFC 6238 exactly, using standard Web Crypto HMAC functions.
- **Secure Randomness:** Random secret generation uses \`crypto.getRandomValues()\` for cryptographically secure random bytes.

### Best Practices

- Only enter real secrets on devices you trust
- Don't screenshot or share your secret keys
- Always keep a backup of your secrets in a secure password manager
- Verify your system clock is accurate (TOTP is time-sensitive)`
  },

  stats: {
    "Algorithm": "RFC 6238",
    "Hash Functions": "3",
    "Period Options": "3",
    "Privacy": "100%"
  }
};
