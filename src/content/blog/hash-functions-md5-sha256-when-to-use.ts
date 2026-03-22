import { BlogPost } from "./types";

export const hashFunctionsGuide: BlogPost = {
  slug: "hash-functions-md5-sha256-when-to-use",
  title: "MD5 vs SHA-256 vs SHA-512: When to Use Each Hash Function",
  description:
    "A practical guide to choosing hash functions. Learn the differences between MD5, SHA-1, SHA-256, and SHA-512, when each is appropriate, and when they're dangerous.",
  publishedAt: "2026-02-03",
  author: "OpenKit Team",
  readingTime: 8,
  category: "comparisons",
  tags: ["hashing", "md5", "sha256", "security", "cryptography", "checksums"],
  relatedTools: ["/hash", "/password", "/encrypt", "/base64", "/uuid"],
  published: true,
  content: `
Hash functions are foundational to modern software. They verify file integrity, protect passwords, sign tokens, and power blockchain systems. But choosing the wrong hash function for your use case can range from inefficient to critically insecure.

Here's when to use each one, and when to stay far away.

## The Quick Answer

If you just need a recommendation:

| Use Case | Hash Function | Why |
|----------|--------------|-----|
| Password storage | bcrypt, scrypt, or Argon2 | Intentionally slow, salt built-in |
| File integrity checks | SHA-256 | Fast, collision-resistant |
| Non-security checksums | MD5 or CRC32 | Fastest, fine when security doesn't matter |
| Digital signatures | SHA-256 or SHA-512 | Required by modern certificate standards |
| Data deduplication | SHA-256 | Low collision probability |
| HMAC authentication | SHA-256 | Standard for JWT HS256 |

## Understanding Hash Properties

Every hash function takes input of any size and produces a fixed-size output. But the important differences are in their security properties:

### Collision Resistance

A **collision** is when two different inputs produce the same hash output. For security-critical applications, collisions are catastrophic — an attacker could substitute one document for another without changing the hash.

- **MD5:** Collisions are trivially easy to produce. In 2004, researchers showed MD5 collisions could be generated in seconds.
- **SHA-1:** Theoretically broken since 2005, practically broken in 2017 (Google's SHAttered attack).
- **SHA-256/512:** No known collisions. Currently considered safe.

### Pre-image Resistance

Given a hash output, can an attacker find an input that produces that hash? This is critical for password hashing.

- **MD5:** Weakened but not fully broken for pre-image attacks
- **SHA-1:** Still resistant to pre-image attacks
- **SHA-256/512:** Strong pre-image resistance

### Speed

Hash speed is a double-edged sword. Fast hashing is great for file checksums but terrible for passwords (attackers can try billions of guesses per second).

\`\`\`
Approximate speeds on modern hardware (single core):

MD5:      ~600 MB/s
SHA-1:    ~500 MB/s
SHA-256:  ~250 MB/s
SHA-512:  ~350 MB/s (faster than SHA-256 on 64-bit systems)
bcrypt:   ~4 hashes/second (intentionally slow)
\`\`\`

## MD5: The Deprecated Standard

**Output:** 128 bits (32 hex characters)

\`\`\`
MD5("hello") = 5d41402abc4b2a76b9719d911017c592
\`\`\`

### When MD5 Is Fine

- **Checksums for data corruption detection:** Verifying a file download wasn't corrupted during transfer. An attacker isn't in the threat model here — you're checking for transmission errors.
- **Hash table distribution:** Using MD5 as a hash function for distributing data across shards/buckets. Security doesn't matter, only uniform distribution.
- **Cache keys:** Generating cache keys from request parameters. No security requirement.
- **Deduplication (non-adversarial):** Finding duplicate files in your own photo library.

### When MD5 Is Dangerous

- **Password hashing:** MD5 is too fast and has no salt. Rainbow table attacks crack MD5-hashed passwords instantly.
- **File integrity in adversarial contexts:** An attacker can create two different files with the same MD5 hash.
- **Digital signatures:** A forged document could have the same MD5 as the original.
- **Anything where an attacker controls the input.**

## SHA-1: Retired But Still Around

**Output:** 160 bits (40 hex characters)

\`\`\`
SHA-1("hello") = aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
\`\`\`

SHA-1 was the standard for over a decade. Git uses it for commit hashes. SSL certificates used it until 2017. But it's cryptographically broken:

- Google demonstrated a practical collision attack (SHAttered) in 2017
- Certificate authorities stopped issuing SHA-1 certificates in 2016
- NIST formally deprecated SHA-1 for digital signatures

### When SHA-1 Is Acceptable

- **Git commit identifiers:** Git is transitioning to SHA-256, but SHA-1 is still default. The threat model (accidental collisions) is different from adversarial attacks.
- **Legacy system compatibility:** Some older systems only support SHA-1. Plan migration, but it works in the interim.

### When SHA-1 Is Not Acceptable

- New systems requiring collision resistance
- Digital signatures or certificate signing
- Password hashing (same problem as MD5 — too fast)

## SHA-256: The Current Standard

**Output:** 256 bits (64 hex characters)

\`\`\`
SHA-256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
\`\`\`

SHA-256 is part of the SHA-2 family and is the default choice for most applications today.

### When to Use SHA-256

- **File integrity verification:** Checksums for downloads, package verification
- **Digital signatures:** TLS certificates, code signing
- **HMAC:** JWT tokens using HS256 (HMAC-SHA256)
- **Data integrity:** Verifying data hasn't been tampered with
- **Blockchain:** Bitcoin and most cryptocurrencies use SHA-256
- **Content addressing:** IPFS, Docker image layers

### Trade-offs

SHA-256 is about half as fast as MD5 on the same hardware. For most applications this is irrelevant — you're I/O bound, not hash-bound. But for processing millions of hashes per second (like deduplication engines), the speed difference matters.

## SHA-512: The 64-bit Optimized Variant

**Output:** 512 bits (128 hex characters)

\`\`\`
SHA-512("hello") = 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7...
\`\`\`

Counter-intuitively, SHA-512 is **faster than SHA-256 on 64-bit processors**. This is because SHA-512 operates on 64-bit words natively, while SHA-256 uses 32-bit operations that require more cycles on modern CPUs.

### When to Prefer SHA-512 Over SHA-256

- High-throughput applications on 64-bit systems
- When you want a larger hash output (lower collision probability)
- As the basis for SHA-512/256 (SHA-512 truncated to 256 bits — faster than SHA-256 on 64-bit hardware)

## Password Hashing: A Different Category

General-purpose hash functions (MD5, SHA-*) are the **wrong tool** for password storage. They're designed to be fast, but password hashing should be slow:

### bcrypt

- Adjustable work factor (increases computation time exponentially)
- Built-in salt generation
- Limited to 72-byte passwords
- Mature, well-tested, widely supported

### scrypt

- Memory-hard (requires significant RAM, making GPU/ASIC attacks expensive)
- Configurable CPU and memory cost
- Used by some cryptocurrency systems

### Argon2

- Winner of the 2015 Password Hashing Competition
- Two variants: Argon2id (recommended), Argon2i, Argon2d
- Configurable time cost, memory cost, and parallelism
- Current best practice for new systems

### PBKDF2

- Older but NIST-approved
- Commonly used in enterprise/compliance contexts
- Less resistant to GPU attacks than bcrypt/scrypt/Argon2
- Acceptable when compliance requires it

## Practical Decision Flowchart

**Are you storing passwords?**
Yes → Use Argon2id (or bcrypt as a solid alternative)

**Is an attacker in your threat model?**
No → MD5 or CRC32 (fastest option)
Yes → Continue below

**Do you need collision resistance?**
Yes → SHA-256 or SHA-512
No → SHA-256 (still the safest default)

**Are you on a 64-bit system processing high volumes?**
Yes → Consider SHA-512 (faster on 64-bit)
No → SHA-256

## Hashing in the Browser

When you hash data using a client-side tool, the computation happens in your browser's JavaScript engine using the Web Crypto API or a JavaScript implementation. No data leaves your machine.

This matters for sensitive use cases: hashing API keys for comparison, generating checksums for confidential files, or verifying document integrity. A server-side hashing tool processes your data on someone else's computer.

The Web Crypto API supports SHA-1, SHA-256, SHA-384, and SHA-512 natively — no external libraries needed.
`,
};
