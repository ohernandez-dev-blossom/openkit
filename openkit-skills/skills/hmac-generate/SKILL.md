---
name: hmac-generate
description: Generate HMAC (Hash-based Message Authentication Code) from a message and secret key. Use when the user asks to compute HMAC, sign a message with a key, generate HMAC-SHA256, or verify a webhook signature.
metadata: {"openclaw":{"requires":{"bins":["openssl"]}}}
---

# HMAC Generate

Compute HMAC signatures using a secret key and `openssl`.

## Input
- Message/data to sign (string)
- Secret key (string)
- Algorithm: SHA-1, SHA-256 (default), SHA-384, SHA-512

## Output
- Hex-encoded HMAC digest
- Algorithm used

## Instructions

1. Identify the message, secret key, and algorithm (default SHA-256).

2. Run the appropriate command:

   **HMAC-SHA-256 (default):**
   ```
   echo -n "MESSAGE" | openssl dgst -sha256 -hmac "KEY"
   ```

   **HMAC-SHA-1:**
   ```
   echo -n "MESSAGE" | openssl dgst -sha1 -hmac "KEY"
   ```

   **HMAC-SHA-384:**
   ```
   echo -n "MESSAGE" | openssl dgst -sha384 -hmac "KEY"
   ```

   **HMAC-SHA-512:**
   ```
   echo -n "MESSAGE" | openssl dgst -sha512 -hmac "KEY"
   ```

3. `openssl dgst` output format is `SHA256(stdin)= <hex>` or `(stdin)= <hex>`. Extract only the hex value after `= `.

4. If `openssl` is not found, tell the user:
   > "This skill requires `openssl`. Install with: `brew install openssl` (macOS) or `sudo apt install openssl` (Linux)."

5. Present the HMAC hex string clearly, labeling the algorithm and noting whether it matches an expected value if the user provided one.

## Examples

**Message:** `hello`, **Key:** `secret`, **Algorithm:** SHA-256
**Command:** `echo -n "hello" | openssl dgst -sha256 -hmac "secret"`
**Output:** `88aab3ede8d3adf94d26ab90d3bafd4a2083070c3bcce9c014ee04a443847c0b`

**Message:** `data`, **Key:** `mykey`, **Algorithm:** SHA-512
**Command:** `echo -n "data" | openssl dgst -sha512 -hmac "mykey"`
**Output:** (64-byte hex string)

**Webhook verification:** User has a payload and expected HMAC — run the command and compare output to expected value, reporting "MATCH" or "MISMATCH".

## Error Handling

- Binary not found → tell user to install `openssl` (see step 4)
- Empty message or empty key → warn the user; empty string is valid but almost certainly a mistake
- Key contains special shell characters → use a temp file approach:
  ```
  printf '%s' "MESSAGE" | openssl dgst -sha256 -hmac "KEY"
  ```
- Algorithm not supported → list the supported algorithms (SHA-1, SHA-256, SHA-384, SHA-512)
