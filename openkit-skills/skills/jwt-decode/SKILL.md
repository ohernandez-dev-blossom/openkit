---
name: jwt-decode
description: Decode and inspect a JWT (JSON Web Token) — extract the header, payload claims, and signature. Use when the user asks to decode a JWT, inspect a token, parse a JWT, check JWT expiration, read JWT claims, verify JWT payload, or debug an authentication token.
---

# JWT Decoder

Decode a JWT token into its three components — header, payload, and signature — and report on standard claims including expiration status.

## Input
- A JWT token string in the format `xxxxx.yyyyy.zzzzz` (three Base64url-encoded parts separated by dots)

## Output
- **Header**: JSON object with algorithm (`alg`) and token type (`typ`)
- **Payload**: JSON object with all claims
- **Signature**: Raw Base64url string (unverified)
- **Expiration status**: Whether the token is expired, valid, or has no expiration
- **Key claims summary**: Formatted values for `exp`, `iat`, `sub`, and `iss` when present

## Instructions

1. Split the token on `.` — expect exactly 3 parts. If the count is not 3, return an error.

2. **Decode header** (first part):
   - Replace `-` with `+` and `_` with `/` (Base64url → Base64 standard).
   - Add `=` padding until the length is a multiple of 4: `padding = "=".repeat((4 - (length % 4)) % 4)`.
   - Base64-decode the result.
   - Parse the decoded string as JSON.

3. **Decode payload** (second part): Apply the same Base64url → Base64 → JSON process.

4. **Keep signature** (third part) as-is — it is the raw Base64url string and cannot be verified without the secret key.

5. **Analyze expiration** from the payload:
   - If `exp` claim is present: compare `exp * 1000` (milliseconds) against the current time.
     - If `exp * 1000 < now`: the token is **expired**.
     - Otherwise: the token is **valid**, show the expiration date/time.
   - If `exp` is absent: report that the token has **no expiration claim**.

6. **Format timestamps**: Convert Unix epoch values (`exp`, `iat`, `nbf`) to human-readable date/time strings (e.g., `2024-03-15 14:32:00 UTC`).

7. **Present the result** with clear sections:
   - Header (with `alg` and `typ` highlighted)
   - Payload (full JSON, with standard claims called out)
   - Expiration status (expired / valid / no expiration)
   - Common claims summary table: `sub`, `iss`, `aud`, `iat`, `exp`, `nbf` if present
   - Signature (with a note that it cannot be verified without the secret key)

## Options
- None — the skill always decodes all three parts and reports expiration status automatically.

## Examples

**Input:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Output:**

Header:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload:
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1735689600
}
```

Common claims:
- Subject (sub): `1234567890`
- Issued At (iat): `2018-01-18 01:30:22 UTC`
- Expires (exp): `2025-01-01 00:00:00 UTC`

Expiration status: **Expired** (expired on 2025-01-01 00:00:00 UTC)

Signature: `SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
Note: Signature cannot be verified without the secret key.

---

**Input (no expiration):**
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkFsaWNlIiwicm9sZSI6ImFkbWluIn0.signature
```

Expiration status: **No expiration** — this token does not include an `exp` claim.

## Error Handling
- **Not 3 parts:** `Error: Invalid JWT format — expected 3 parts separated by dots. Got N parts.`
- **Base64url decode failure:** `Error: Failed to decode JWT header/payload. Check that the token is not truncated or corrupted.`
- **JSON parse failure after decode:** `Error: Decoded content is not valid JSON. The token may be malformed.`
- **Empty input:** Prompt the user to paste a JWT token.
- **Signature verification request:** Explain that signature verification requires the secret key or public key and cannot be done without it. The tool only decodes — it does not verify.
