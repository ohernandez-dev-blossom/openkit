---
name: encrypt-decrypt
description: Encrypt or decrypt text using AES-256-CBC symmetric encryption. Use when the user asks to encrypt a message, decrypt ciphertext, protect sensitive data with a password, or use AES encryption.
metadata: {"openclaw":{"requires":{"bins":["openssl"]}}}
---

# Encrypt / Decrypt

Symmetric AES-256-CBC encryption and decryption using `openssl`.

## Input

**For encryption:**
- Plaintext string to encrypt
- Password/key string

**For decryption:**
- Base64-encoded ciphertext string
- Password/key string that was used to encrypt

## Output
- Base64-encoded ciphertext (encryption mode)
- Recovered plaintext (decryption mode)

## Instructions

1. Determine mode: encrypt or decrypt.

2. **Encrypt plaintext:**
   ```
   echo -n "PLAINTEXT" | openssl enc -aes-256-cbc -a -salt -pbkdf2 -pass pass:PASSWORD
   ```
   - `-a` outputs Base64
   - `-salt` adds a random salt for security
   - `-pbkdf2` uses PBKDF2 key derivation (preferred over legacy `-md md5`)

3. **Decrypt ciphertext:**
   ```
   echo "CIPHERTEXT_BASE64" | openssl enc -aes-256-cbc -a -d -salt -pbkdf2 -pass pass:PASSWORD
   ```
   - The ciphertext must be the Base64 string produced by the encrypt command above
   - `-d` flag triggers decryption mode

4. If `openssl` is not found, tell the user:
   > "This skill requires `openssl`. Install with: `brew install openssl` (macOS) or `sudo apt install openssl` (Linux)."

5. Present encrypted output as a clearly labeled Base64 block. For decryption, show the recovered plaintext.

6. Warn the user: the password is passed on the command line, which may appear in shell history. For sensitive use cases, recommend using a secrets manager or interactive password prompt (`-pass stdin`).

## Examples

**Encrypt "hello world" with password "mykey":**
**Command:** `echo -n "hello world" | openssl enc -aes-256-cbc -a -salt -pbkdf2 -pass pass:mykey`
**Output:**
```
U2FsdGVkX1+...base64string...
```

**Decrypt the above ciphertext:**
**Command:** `echo "U2FsdGVkX1+...base64string..." | openssl enc -aes-256-cbc -a -d -salt -pbkdf2 -pass pass:mykey`
**Output:** `hello world`

## Error Handling

- `openssl` not found → tell user to install it (see step 4)
- Wrong password during decryption → openssl will output `bad decrypt` or `error reading input file`; inform the user the password is incorrect
- Corrupted or truncated ciphertext → openssl will error; report the ciphertext appears invalid
- Password contains shell special characters (`$`, `!`, `"`, etc.) → wrap password in single quotes or escape appropriately; warn user if this may be an issue
- Multiline plaintext → the command handles it, but advise the user to test the round-trip (encrypt then decrypt) to confirm correctness
