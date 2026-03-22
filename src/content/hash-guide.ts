/**
 * Hash Generator Tool Guide Content
 * Comprehensive developer guide for cryptographic hashing
 */

import type { ToolGuideContent } from "./types";

export const hashGuideContent: ToolGuideContent = {
  toolName: "Hash Generator",
  toolPath: "/hash",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Your Text",
      description: "Type or paste any text into the input field - passwords, files, messages, or data you want to hash. The generator handles text of any length from single characters to megabytes."
    },
    {
      title: "Select Hash Algorithm",
      description: "Choose from MD5, SHA-1, SHA-256, SHA-512, or other algorithms. SHA-256 is recommended for most use cases. MD5 and SHA-1 are legacy algorithms still used for checksums but not for security."
    },
    {
      title: "Generate Hash",
      description: "Click 'Generate Hash' or press Cmd/Ctrl+Enter to instantly compute the cryptographic hash. The output is a fixed-length hexadecimal string unique to your input."
    },
    {
      title: "Copy or Compare",
      description: "Copy the hash to clipboard for password storage, file verification, or API authentication. Use the compare feature to verify data integrity by checking if two inputs produce the same hash."
    }
  ],

  introduction: {
    title: "What is Cryptographic Hashing?",
    content: `A cryptographic hash function is a mathematical algorithm that takes arbitrary-sized input data and produces a fixed-size output (the hash or digest). Hash functions are deterministic - the same input always produces the same hash - and designed to be one-way, meaning it's computationally infeasible to reverse a hash back to the original input.

Hashing is fundamental to modern security and data integrity. Unlike encryption which is designed to be reversible with a key, hashing is intentionally irreversible. This makes hashes perfect for password storage, file verification, digital signatures, and data deduplication where you need to compare data without storing the original.

### Key Characteristics of Hash Functions

- **Fixed Output Size:** Regardless of input size (1 byte or 1GB), the output hash is always the same length. SHA-256 always produces 256 bits (64 hex characters), MD5 produces 128 bits (32 hex characters).
- **Deterministic:** The same input always produces the exact same hash. This property enables verification - you can confirm data integrity by comparing hashes without comparing the full data.
- **One-Way Function:** Given a hash, it's computationally infeasible to find the original input. Modern hash functions like SHA-256 have no known practical reverse computation method.
- **Avalanche Effect:** Changing even a single bit in the input produces a completely different hash. "Hello" and "hello" produce entirely unrelated hashes, making collision detection reliable.

### Why Developers Use Hashing

Password storage uses hashing to store user credentials securely. Systems never store actual passwords - they hash passwords and store only the hash. During login, the system hashes the entered password and compares hashes. Even if a database is compromised, attackers cannot reverse hashes to obtain passwords (though they can try dictionary attacks, which is why salting is important).

File integrity verification relies on hashes as checksums. Download sites provide SHA-256 hashes alongside files - users hash the downloaded file and compare with the published hash to verify the file wasn't corrupted or tampered with during transfer. Git uses SHA-1 hashes to uniquely identify commits and detect repository corruption.

Blockchain and cryptocurrencies use hashing extensively. Bitcoin mining is essentially finding inputs that produce SHA-256 hashes meeting specific criteria. Smart contract addresses, transaction IDs, and block verification all depend on cryptographic hashing.

### Hash Algorithm Comparison

**MD5 (128-bit):** Legacy algorithm, fast but cryptographically broken. Still used for non-security checksums but never for passwords or security. Collision attacks are practical.

**SHA-1 (160-bit):** Deprecated for security use. Google demonstrated practical SHA-1 collisions in 2017. Used in legacy systems (Git) but being phased out.

**SHA-256 (256-bit):** Current industry standard. No known practical attacks. Recommended for password hashing (with salt), file verification, and digital signatures. Part of SHA-2 family.

**SHA-512 (512-bit):** Stronger variant of SHA-256 with larger output. Slightly slower but provides extra security margin. Good for high-security applications.

**bcrypt / Argon2:** Specialized password hashing algorithms designed to be slow and memory-hard, making brute-force attacks impractical. Always use these for password storage, not raw SHA-256.`
  },

  useCases: [
    {
      title: "Password Hashing and Storage",
      description: "Hash user passwords before storing in databases. Never store plain-text passwords. Hash the password with a salt and store the hash. During login, hash the entered password and compare with stored hash. Use bcrypt or Argon2 for production, not raw SHA-256.",
      example: `// BAD: Plain-text password storage
const user = { password: "mypassword123" };

// BETTER: SHA-256 hash (but still not recommended)
const crypto = require('crypto');
const hash = crypto.createHash('sha256')
  .update("mypassword123")
  .digest('hex');
// Output: ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f

// BEST: Use bcrypt with salt for password storage
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashedPassword = await bcrypt.hash("mypassword123", saltRounds);`
    },
    {
      title: "File Integrity Verification",
      description: "Verify downloaded files haven't been corrupted or tampered with by comparing SHA-256 hashes. Software distributors publish official hashes - users hash the downloaded file and confirm it matches the published hash.",
      example: `# Verify downloaded file integrity (command line)
sha256sum ubuntu-22.04.iso
# Output: 84eed5c3... (compare with official hash from website)

# Node.js file hashing
const crypto = require('crypto');
const fs = require('fs');

const hash = crypto.createHash('sha256');
const stream = fs.createReadStream('file.zip');
stream.on('data', chunk => hash.update(chunk));
stream.on('end', () => {
  console.log('SHA-256:', hash.digest('hex'));
});`
    },
    {
      title: "API Request Signing",
      description: "Generate HMAC signatures for API authentication by hashing request data with a secret key. Services like AWS use HMAC-SHA256 to verify API requests are authentic and haven't been tampered with.",
      example: `// HMAC-SHA256 API signature
const crypto = require('crypto');

const secret = 'your-api-secret-key';
const message = 'POST/api/users{"email":"user@example.com"}';

const signature = crypto
  .createHmac('sha256', secret)
  .update(message)
  .digest('hex');

// Include signature in request header
fetch('/api/users', {
  method: 'POST',
  headers: {
    'X-Signature': signature,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: 'user@example.com' })
});`
    },
    {
      title: "Data Deduplication",
      description: "Identify duplicate files or content by comparing hashes instead of full file comparisons. Cloud storage systems hash files - if the hash already exists, they don't store a duplicate copy, saving storage space.",
      example: `// Content-addressable storage with hashing
const crypto = require('crypto');
const files = new Map(); // hash → file content

function storeFile(content) {
  const hash = crypto.createHash('sha256')
    .update(content)
    .digest('hex');

  if (files.has(hash)) {
    console.log('Duplicate detected, using existing copy');
    return hash; // Return existing hash reference
  }

  files.set(hash, content);
  console.log('Stored new file with hash:', hash);
  return hash;
}

// Two identical files produce same hash
storeFile('Hello World'); // Stored new file
storeFile('Hello World'); // Duplicate detected`
    }
  ],

  howToUse: {
    title: "How to Use This Hash Generator",
    content: `This hash generator provides instant client-side hashing using JavaScript's native Web Crypto API. All hashing happens in your browser - no server uploads, ensuring your data remains private.

### Generating Hashes

Enter your text in the input field and select a hash algorithm (MD5, SHA-1, SHA-256, SHA-512). Click "Generate Hash" or press Cmd/Ctrl+Enter. The hash appears instantly as a hexadecimal string. For SHA-256, the output is always 64 hex characters (256 bits ÷ 4 bits per hex digit = 64 characters).

### Choosing the Right Algorithm

**For security (passwords, signatures):** Use SHA-256 or SHA-512. Never use MD5 or SHA-1 for security purposes - both have known collision vulnerabilities.

**For file checksums:** SHA-256 is industry standard. MD5 is acceptable for detecting accidental corruption (not malicious tampering) and is faster.

**For password storage:** Don't use this tool - use proper password hashing libraries (bcrypt, Argon2, PBKDF2) that add salting and slow iteration.

### Comparing Hashes

Use the compare feature to verify two inputs produce the same hash. Paste expected hash in the compare field - if the generated hash matches, verification passes. Useful for confirming file downloads match published checksums.

### Understanding Hash Output

Hash output is hexadecimal (0-9, a-f). Each hash algorithm produces fixed-length output:
- MD5: 32 hex characters (128 bits)
- SHA-1: 40 hex characters (160 bits)
- SHA-256: 64 hex characters (256 bits)
- SHA-512: 128 hex characters (512 bits)

### Keyboard Shortcuts

- **Cmd/Ctrl+Enter:** Generate hash
- **Cmd/Ctrl+K:** Clear all fields
- **Cmd/Ctrl+C:** Copy hash to clipboard`,
    steps: [
      {
        name: "Enter Input Text",
        text: "Type or paste the text you want to hash into the input field. Can be passwords, file contents, messages, or any data."
      },
      {
        name: "Select Hash Algorithm",
        text: "Choose MD5, SHA-1, SHA-256 (recommended), or SHA-512 from the dropdown. SHA-256 balances security and performance."
      },
      {
        name: "Generate Hash",
        text: "Click 'Generate Hash' button or press Cmd/Ctrl+Enter. The cryptographic hash appears instantly as a hexadecimal string."
      },
      {
        name: "Copy or Verify",
        text: "Copy the hash to clipboard or paste an expected hash in the compare field to verify integrity."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between hashing and encryption?",
      answer: "Hashing is one-way and irreversible - you cannot get the original data back from a hash. Encryption is two-way and reversible - you can decrypt encrypted data with the proper key. Use hashing for passwords and integrity verification. Use encryption for confidential data that needs to be retrieved later. Never use hashing to 'protect' data you need to decrypt later."
    },
    {
      question: "Can two different inputs produce the same hash?",
      answer: "Theoretically yes (called a collision), but practically no for modern algorithms like SHA-256. The probability of randomly finding a SHA-256 collision is astronomically low (1 in 2^256). MD5 and SHA-1 have known practical collision attacks and should not be used for security. SHA-256 has no known practical collision attacks as of 2026."
    },
    {
      question: "Why shouldn't I use MD5 for passwords?",
      answer: "MD5 is cryptographically broken with known collision attacks, making it unsuitable for security. It's also too fast - attackers can compute billions of MD5 hashes per second with modern GPUs, making brute-force attacks practical. For passwords, use bcrypt, Argon2, or PBKDF2 which are intentionally slow and include salting. MD5 is acceptable only for non-security checksums (detecting accidental file corruption)."
    },
    {
      question: "What is a salt and why is it important?",
      answer: "A salt is random data added to passwords before hashing. Without salt, identical passwords produce identical hashes, allowing attackers to use rainbow tables (precomputed hashes). Salt makes every password hash unique even if passwords are identical. For example, 'password123' with salt 'abc' and salt 'xyz' produces completely different hashes. Always salt passwords before hashing. Use bcrypt/Argon2 which handle salting automatically."
    },
    {
      question: "Can I reverse a hash to get the original password?",
      answer: "No, hashes are mathematically designed to be one-way functions. You cannot reverse a SHA-256 hash to get the original input. However, attackers can use brute-force (trying millions of guesses), dictionary attacks (trying common passwords), or rainbow tables (precomputed hashes). This is why password hashing should use slow algorithms (bcrypt, Argon2) and salts to make these attacks impractical."
    },
    {
      question: "What is SHA-256 used for?",
      answer: "SHA-256 is the current industry standard for cryptographic hashing. Used for file integrity verification (checksums), digital signatures, SSL/TLS certificates, blockchain (Bitcoin, Ethereum), Git commit IDs, and general-purpose hashing. It's fast enough for high-throughput applications while providing strong security guarantees. For password storage, use bcrypt/Argon2 instead of raw SHA-256."
    },
    {
      question: "Why do small input changes completely change the hash?",
      answer: "This is called the avalanche effect - a fundamental property of cryptographic hash functions. Changing even a single bit in the input produces a completely different hash output (approximately 50% of bits flip). This makes hashes excellent for detecting any modification to data. 'Hello' and 'hello' produce entirely different hashes, allowing reliable tamper detection."
    },
    {
      question: "Can I hash files with this tool?",
      answer: "This tool is designed for text input. For file hashing, use command-line tools (sha256sum on Linux/Mac, certutil on Windows) or file upload features. Browser file hashing is possible but browsers limit file size and processing may freeze the tab for large files. For production file verification, use native tools which are optimized for large file handling."
    },
    {
      question: "What is HMAC and how is it different from regular hashing?",
      answer: "HMAC (Hash-based Message Authentication Code) combines hashing with a secret key for message authentication. Regular hashing (SHA-256) is keyless - anyone can compute the hash. HMAC requires a secret key - only parties with the key can generate or verify the HMAC. Used for API signatures, message authentication, and verifying data came from a trusted source. HMAC-SHA256 is common for API request signing (AWS, webhooks)."
    },
    {
      question: "Is my data private when using this tool?",
      answer: "Yes. All hashing happens entirely in your browser using the Web Crypto API. Your input text never leaves your device or gets sent to any servers. No data is uploaded, logged, or stored. You can verify this by disconnecting from the internet - the tool still works. Safe for hashing sensitive data, passwords (though you should use proper password hashing in production), or confidential content."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your data never leaves your browser. This hash generator operates entirely client-side using JavaScript's native Web Crypto API. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All hashing happens in your browser's JavaScript engine. Your data stays on your device.
- **No Server Uploads:** We don't have servers to process your data. The tool works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone.
- **No Analytics Tracking:** We don't track what you hash, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests.

This makes the tool safe for hashing sensitive data like passwords (though use proper password hashing libraries in production), API keys, confidential documents, or any data that must remain private.

### Security Best Practices

**For Password Storage:** Never use raw SHA-256 for password storage in production. Use bcrypt, Argon2, or PBKDF2 which add salting and intentional slowness to resist brute-force attacks.

**For File Verification:** SHA-256 is excellent for verifying file integrity. Always compare full hashes - don't truncate or verify only part of the hash.

**For API Signing:** Use HMAC-SHA256 with a strong secret key, not plain SHA-256. HMAC prevents attackers from forging signatures.`
  },

  stats: {
    "Hash Speed": "<10ms",
    "Algorithms": "5+",
    "SHA-256 Output": "64 chars",
    "Collision Risk": "~0%",
    "Server Uploads": "0"
  }
};
