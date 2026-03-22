---
name: extract-emails
description: Extract all email addresses from a block of text using regex. Use when the user asks to extract emails, find email addresses in text, pull out emails from a document, get all emails from a string, parse emails from text, or collect email addresses.
---

# Email Extractor

Scan any block of text and extract all valid email addresses using a regex pattern. Supports deduplication and lowercase normalization.

## Input
- A text string of any length (plain text, HTML, CSV, logs, etc.)
- `unique`: remove duplicate emails (default: true)
- `lowercase`: normalize all emails to lowercase (default: true)

## Output
- A list of extracted email addresses
- Count: `Found N email(s)`
- Available copy formats:
  - Line-separated list (one per line)
  - Comma-separated (CSV format)

## Instructions

1. Apply the email regex to the input text:
   ```
   /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
   ```
2. Collect all matches into an array.
3. If `lowercase` is true: convert every matched email to lowercase.
4. If `unique` is true: deduplicate using a Set (preserving first-seen order).
5. Output the resulting array.

### Regex breakdown
- `[a-zA-Z0-9._%+-]+` — local part (before @): letters, digits, dots, underscores, percent, plus, hyphen
- `@` — literal at-sign
- `[a-zA-Z0-9.-]+` — domain name: letters, digits, dots, hyphens
- `\.` — literal dot before TLD
- `[a-zA-Z]{2,}` — TLD: at least 2 letters

### What is matched
- Standard emails: `user@example.com`
- Subdomains: `name@mail.company.org`
- Plus addressing: `user+tag@example.com`
- Country TLDs: `john.doe@email.co.uk`
- Underscores: `jane_smith123@domain.com`

### What is NOT matched (by design)
- `@test.com` (no local part)
- `user@` (no domain)
- IP address literals: `user@[192.168.1.1]`
- Quoted local parts: `"user name"@domain.com`

## Options
- `unique`: `true` | `false` — default: `true`
- `lowercase`: `true` | `false` — default: `true`

## Examples

**Input:**
```
Contact us at support@example.com or sales@company.org.
For inquiries, email john.doe@email.co.uk or jane_smith123@domain.com.
Invalid emails like @test.com or user@ won't be matched.
```

**Output (unique: true, lowercase: true):**
```
Found 4 emails:
1. support@example.com
2. sales@company.org
3. john.doe@email.co.uk
4. jane_smith123@domain.com
```

**Comma-separated format:**
`support@example.com, sales@company.org, john.doe@email.co.uk, jane_smith123@domain.com`

**With duplicates (unique: false):**
If `support@example.com` appeared twice in the input, it would appear twice in the output.

**With uppercase preserved (lowercase: false):**
`Support@Example.COM` would be returned as-is.

## Error Handling
- **No emails found:** Return `Found 0 emails` and note that no valid email addresses were detected in the input.
- **Empty input:** Return `Found 0 emails`.
- **Very large input:** Process normally — the regex is applied globally in a single pass.
- **HTML input:** Emails embedded in HTML attributes or content are extracted correctly since the regex operates on the raw text.
