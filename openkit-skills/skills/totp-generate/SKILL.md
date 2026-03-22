---
name: totp-generate
description: Generate a TOTP (Time-based One-Time Password) from a base32 secret. Use when the user asks to generate a TOTP code, get a 2FA code from a secret, compute an authenticator app code, or test TOTP/Google Authenticator tokens.
metadata: {"openclaw":{"requires":{"bins":["python3"]}}}
---

# TOTP Generate

Generate RFC 6238 TOTP codes from a base32 secret using `python3`.

## Input
- Base32 secret string (e.g., `JBSWY3DPEHPK3PXP`) — typically shown as a QR code or text during 2FA setup
- Digits (default: 6)
- Time step (default: 30 seconds)

## Output
- Current TOTP code (6 digits by default)
- Seconds remaining until the code rotates
- Optionally the next code (if user asks)

## Instructions

1. Take the base32 secret from the user (strip spaces, convert to uppercase).

2. Run the TOTP generation command:
   ```
   python3 -c "
   import hmac, hashlib, struct, time, base64

   secret = base64.b32decode('SECRET_BASE32', casefold=True)
   step = 30
   digits = 6
   t = int(time.time()) // step
   msg = struct.pack('>Q', t)
   h = hmac.new(secret, msg, hashlib.sha1).digest()
   offset = h[-1] & 0x0f
   code = struct.unpack('>I', h[offset:offset+4])[0] & 0x7fffffff
   code = code % (10 ** digits)
   remaining = step - (int(time.time()) % step)
   print(f'{code:0{digits}d} (valid for {remaining}s)')
   "
   ```
   Replace `SECRET_BASE32` with the actual secret.

3. If the user asks for the next code as well, increment `t` by 1 in a second run.

4. If `python3` is not found, tell the user:
   > "This skill requires `python3`. Install with: `brew install python3` (macOS) or `sudo apt install python3` (Linux)."

5. Note: this uses only Python standard library modules (`hmac`, `hashlib`, `struct`, `time`, `base64`) — no extra packages needed.

6. Present the result clearly:
   - Current code: `123456`
   - Time remaining: `18 seconds`

## Examples

**Secret:** `JBSWY3DPEHPK3PXP`
**Command:**
```
python3 -c "
import hmac, hashlib, struct, time, base64
secret = base64.b32decode('JBSWY3DPEHPK3PXP', casefold=True)
step = 30; digits = 6
t = int(time.time()) // step
msg = struct.pack('>Q', t)
h = hmac.new(secret, msg, hashlib.sha1).digest()
offset = h[-1] & 0x0f
code = struct.unpack('>I', h[offset:offset+4])[0] & 0x7fffffff
code = code % (10 ** digits)
remaining = step - (int(time.time()) % step)
print(f'{code:0{digits}d} (valid for {remaining}s)')
"
```
**Output:** `482092 (valid for 14s)`

## Error Handling

- `python3` not found → tell user to install Python 3 (see step 4)
- Invalid base32 secret → `base64.b32decode` will raise `binascii.Error`; tell user the secret appears invalid (must be valid base32, A–Z and 2–7, padded to multiple of 8)
- Secret contains spaces → strip spaces before passing: `secret.replace(' ', '').upper()`
- Secret contains lowercase → `casefold=True` handles this automatically
- Secrets with `=` padding missing → Python's `b32decode` with `casefold=True` may require padding; if error, pad to nearest multiple of 8 with `=`
