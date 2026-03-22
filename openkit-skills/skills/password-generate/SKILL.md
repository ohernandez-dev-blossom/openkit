---
name: password-generate
description: Generate a cryptographically secure random password. Use when the user asks to generate a password, create a random password, make a strong password, or produce a secure passphrase.
metadata: {"openclaw":{"requires":{"bins":["openssl"]}}}
---

# Password Generate

Generate cryptographically secure random passwords using `openssl rand`.

## Input
- Length (default: 16 characters)
- Character set options:
  - `alphanumeric` — letters and digits only (default)
  - `base64` — letters, digits, `+`, `/`, `=`
  - `hex` — hexadecimal characters only (0–9, a–f)
  - `symbols` — letters, digits, and common symbols (`!@#$%^&*()-_=+`)

## Output
- One or more generated passwords of the requested length and character set
- Strength assessment (entropy bits)

## Instructions

1. Determine length (default: 16) and character set (default: alphanumeric).

2. **Alphanumeric password (letters + digits, no symbols):**
   Generate extra bytes and filter to the desired length:
   ```
   openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c LENGTH
   ```

3. **Base64 password (includes `+`, `/`):**
   ```
   openssl rand -base64 32 | head -c LENGTH
   ```

4. **Hex password:**
   ```
   openssl rand -hex LENGTH
   ```
   Note: `openssl rand -hex N` produces `2N` hex characters, so use `LENGTH/2` as the argument and trim. Alternatively:
   ```
   openssl rand -hex 64 | head -c LENGTH
   ```

5. **Password with symbols:**
   ```
   openssl rand -base64 64 | tr -dc 'A-Za-z0-9!@#$%^&*()-_=+' | head -c LENGTH
   ```

6. If `openssl` is not found, tell the user:
   > "This skill requires `openssl`. Install with: `brew install openssl` (macOS) or `sudo apt install openssl` (Linux)."

7. After generating, display:
   - The password(s)
   - Estimated entropy: `length × log2(charset_size)` bits
   - A brief strength label: < 40 bits = Weak, 40–60 = Fair, 60–80 = Good, 80–100 = Strong, > 100 = Very Strong

8. If the user asks for multiple passwords, run the command in a loop.

## Examples

**16-character alphanumeric:**
**Command:** `openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 16`
**Output:** `aB3kLm9XzQr2WsYp`
**Entropy:** ~95 bits (Very Strong)

**24-character base64:**
**Command:** `openssl rand -base64 32 | head -c 24`
**Output:** `aB3+kLm9/XzQr2WsYpNq4TuV`
**Entropy:** ~143 bits (Very Strong)

**32-character hex:**
**Command:** `openssl rand -hex 64 | head -c 32`
**Output:** `4f8a2b1c9d3e7f0a5b6c2d8e1f4a7b3c`
**Entropy:** ~128 bits (Very Strong)

**20-character with symbols:**
**Command:** `openssl rand -base64 64 | tr -dc 'A-Za-z0-9!@#$%^&*()-_=+' | head -c 20`
**Output:** `aB3!kL#m9@XzQ-r2Ws+Y`
**Entropy:** ~122 bits (Very Strong)

## Error Handling

- `openssl` not found → tell user to install it (see step 6)
- Length less than 8 → warn the user the password is too short to be secure; suggest at least 12
- Length greater than 128 → allow it but note this is unusually long
- `tr -dc` produces too few characters (unlikely but possible if charset is very small) → generate more bytes and retry; use `openssl rand -base64 $(( LENGTH * 4 ))` to ensure enough raw material
- Character set produces ambiguous result → clarify what characters are included in the output
