---
name: hash-generate
description: Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-384, SHA-512) from text input. Use when the user asks to hash text, generate a checksum, compute SHA-256, get an MD5 hash, or verify data integrity.
metadata: {"openclaw":{"requires":{"bins":["shasum"]}}}
---

# Hash Generate

Generate cryptographic hashes from text input using `shasum` and `md5`.

## Input
- Text string to hash
- Algorithm: MD5, SHA-1, SHA-256 (default), SHA-384, or SHA-512

## Output
- Hex-encoded hash string for the chosen algorithm
- Optionally all algorithms at once if the user asks for "all"

## Instructions

1. Check which algorithm the user wants. Default to SHA-256 if unspecified.

2. Run the appropriate command:

   **SHA-256 (default):**
   ```
   echo -n "INPUT" | shasum -a 256
   ```

   **SHA-1:**
   ```
   echo -n "INPUT" | shasum -a 1
   ```

   **SHA-384:**
   ```
   echo -n "INPUT" | shasum -a 384
   ```

   **SHA-512:**
   ```
   echo -n "INPUT" | shasum -a 512
   ```

   **MD5 (macOS):**
   ```
   md5 -s "INPUT"
   ```

   Note: `shasum` output format is `<hash>  -`. Extract only the hash portion (everything before the first space).

3. If `shasum` is not found, tell the user:
   > "This skill requires `shasum`. On macOS it is pre-installed. On Linux install it with: `sudo apt install perl` or `brew install coreutils`."

4. If MD5 is requested and `md5` is not found (Linux), run:
   ```
   echo -n "INPUT" | md5sum
   ```

5. Present the result cleanly, labeling the algorithm used.

## Examples

**Input:** `hello world`, algorithm: SHA-256
**Command:** `echo -n "hello world" | shasum -a 256`
**Output:** `b94d27b9934d3e08a52e52d7da7dabfac484efe04294e576b4ff6d514b97d8b1`

**Input:** `hello world`, algorithm: MD5
**Command:** `md5 -s "hello world"`
**Output:** `5eb63bbbe01eeed093cb22bb8f5acdc3`

**Input:** `secret`, algorithm: SHA-512
**Command:** `echo -n "secret" | shasum -a 512`
**Output:** `bd2b1aaf7ef4f09be9f52ce2d8d599674d81aa9d6a4421696dc4d93dd0619d682ce56b4d64a9ef097761ced99e0f67265b5f76085e5b0ee7ca4696b2ad6fe2b2`

## Error Handling

- Binary not found → tell user what to install (see step 3 above)
- Empty input → warn the user that hashing empty string is valid but likely unintended, then proceed
- Special characters in input → use `printf '%s' "INPUT" | shasum -a 256` as a safer alternative to handle newlines and special chars
- Very long input → inform the user the command may take a moment
