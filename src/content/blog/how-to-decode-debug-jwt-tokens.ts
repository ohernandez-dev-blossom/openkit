import { BlogPost } from "./types";

export const howToDecodeDebugJwt: BlogPost = {
  slug: "how-to-decode-debug-jwt-tokens",
  title: "How to Decode and Debug JWT Tokens: A Developer's Guide",
  description:
    "Learn how to decode, inspect, and debug JSON Web Tokens. Understand JWT structure, common pitfalls, and how to troubleshoot authentication issues fast.",
  publishedAt: "2026-02-06",
  author: "OpenKit Team",
  readingTime: 8,
  category: "guides",
  tags: ["jwt", "authentication", "debugging", "api", "security", "tokens"],
  relatedTools: ["/jwt", "/jwt-gen", "/base64", "/json", "/hash"],
  published: true,
  content: `
If you've ever stared at a long string of characters separated by two dots and wondered what's inside, you've encountered a JSON Web Token. JWTs are everywhere in modern web development — from API authentication to single sign-on systems — and knowing how to decode and debug them is a fundamental skill.

## What's Actually Inside a JWT

A JWT is three Base64URL-encoded segments separated by periods:

\`\`\`
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.signature
\`\`\`

Each segment has a specific purpose:

### Header

The first segment contains metadata about the token itself:

\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

The \`alg\` field tells you which signing algorithm was used. Common values are \`HS256\` (HMAC-SHA256), \`RS256\` (RSA-SHA256), and \`ES256\` (ECDSA-P256). If you see \`none\`, that's a red flag — it means the token isn't signed at all.

### Payload

The second segment carries the actual data (called "claims"):

\`\`\`json
{
  "sub": "user-1234",
  "name": "Jane Developer",
  "iat": 1706745600,
  "exp": 1706832000,
  "role": "admin"
}
\`\`\`

Standard claims include \`sub\` (subject), \`iat\` (issued at), \`exp\` (expiration), \`iss\` (issuer), and \`aud\` (audience). Everything else is custom to your application.

### Signature

The third segment is a cryptographic signature that verifies the token hasn't been tampered with. You can't decode this part — it's a hash, not encoded data.

## Common JWT Debugging Scenarios

### 1. "401 Unauthorized" But the Token Looks Valid

This is the most common JWT headache. Start by decoding the token and checking these fields:

**Check expiration:** The \`exp\` claim is a Unix timestamp. If \`exp\` is in the past, the token is expired. Convert the timestamp to a human-readable date to confirm.

\`\`\`
exp: 1706832000 → 2024-02-02T00:00:00Z
\`\`\`

**Check audience:** If your API validates the \`aud\` claim, it must match exactly. A token issued for \`api.example.com\` won't work on \`staging-api.example.com\`.

**Check issuer:** Same principle as audience. The \`iss\` field must match what your server expects.

### 2. Token Decodes Fine But Claims Are Wrong

If the payload doesn't contain the claims you expect, the issue is upstream — usually in how the token is generated:

- **Missing roles/permissions:** The identity provider might not be configured to include custom claims
- **Wrong user context:** The \`sub\` field points to a different user than expected
- **Stale token:** The user's permissions changed after the token was issued

### 3. Signature Validation Fails

If decoding works but signature verification fails:

- **Wrong secret/key:** The signing key on the verification side doesn't match the issuing side
- **Algorithm mismatch:** The token was signed with RS256 but your server is checking with HS256
- **Token was modified:** Someone (or something) altered the payload after signing

### 4. The "alg: none" Attack

If you decode a token and see \`"alg": "none"\` in the header, investigate immediately. This is a well-known attack where an attacker removes the signature and sets the algorithm to none, hoping the server accepts unsigned tokens.

Your server library should reject tokens with \`alg: none\` by default. If it doesn't, you have a security vulnerability.

## Debugging Workflow: Step by Step

Here's the workflow I use every time a JWT-related issue comes up:

**Step 1: Decode the token.** Paste it into a client-side JWT decoder to see the header and payload. Don't use server-side decoders for tokens that contain sensitive data.

**Step 2: Check timestamps.** Convert \`iat\`, \`exp\`, and \`nbf\` (not before) to readable dates. Is the token expired? Was it issued in the future (clock skew)?

**Step 3: Verify claims.** Does \`sub\`, \`iss\`, \`aud\` match what your API expects? Are custom claims (roles, permissions, scopes) present and correct?

**Step 4: Check the algorithm.** Does the \`alg\` in the header match what your server is configured to accept? Mismatches here cause silent failures.

**Step 5: Test signature verification.** If you have the signing secret or public key, verify the signature. A valid payload with an invalid signature means the token was tampered with or signed with a different key.

## JWT Gotchas That Catch Everyone

### Clock Skew

If your API server and identity provider have slightly different clocks, tokens can appear expired or not-yet-valid. Most JWT libraries accept a configurable clock skew tolerance (typically 30-60 seconds).

### Base64URL vs Base64

JWT uses Base64URL encoding, not standard Base64. The difference: \`+\` becomes \`-\`, \`/\` becomes \`_\`, and padding \`=\` is stripped. If you're manually decoding, use the right variant or you'll get garbled output.

### Token Size

JWTs live in HTTP headers, and most servers cap header size at 8KB. If you stuff too many claims into a token (entire user profiles, nested permissions), you'll hit this limit and get cryptic errors.

### Tokens Are Not Encrypted

A common misconception: JWTs are **signed**, not **encrypted**. Anyone can decode the header and payload — the signature only prevents tampering. Never put secrets (passwords, API keys, credit card numbers) in a JWT payload.

## When to Use a Client-Side Decoder

Any time you're debugging a JWT that contains user data, session information, or internal API claims, use a tool that processes the token entirely in your browser. Server-side decoders send your token over the network, where it could be logged, cached, or intercepted.

A client-side decoder parses the Base64URL segments in JavaScript without making any network requests. Your token never leaves your machine.

## Quick Reference: Standard JWT Claims

| Claim | Full Name | Purpose |
|-------|-----------|---------|
| \`iss\` | Issuer | Who issued the token |
| \`sub\` | Subject | Who the token identifies |
| \`aud\` | Audience | Who the token is intended for |
| \`exp\` | Expiration | When the token expires (Unix timestamp) |
| \`nbf\` | Not Before | When the token becomes valid |
| \`iat\` | Issued At | When the token was created |
| \`jti\` | JWT ID | Unique identifier for the token |

Understanding these fields and knowing how to inspect them quickly is what separates a 5-minute debugging session from a 2-hour rabbit hole.
`,
};
