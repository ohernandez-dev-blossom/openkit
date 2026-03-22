import { BlogPost } from "./types";

export const regexPatternsGuide: BlogPost = {
  slug: "regex-patterns-every-developer-needs",
  title: "Regex Patterns Every Developer Needs: A Practical Reference",
  description:
    "A practical regex reference with copy-paste patterns for emails, URLs, IPs, dates, passwords, and more. No theory — just patterns that work.",
  publishedAt: "2026-02-05",
  author: "OpenKit Team",
  readingTime: 9,
  category: "guides",
  tags: ["regex", "regular-expressions", "validation", "developer-tools", "cheat-sheet"],
  relatedTools: ["/regex", "/replace", "/extract-emails", "/extract-urls", "/lines"],
  published: true,
  content: `
Regular expressions are one of those tools that developers either love or avoid entirely. The syntax is dense, the edge cases are tricky, and it's easy to write a pattern that works for your test cases but breaks in production.

This is a practical reference. No theory about finite automata or formal grammars — just patterns you can copy, understand, and use.

## Email Validation

### Basic (Covers 99% of real emails)

\`\`\`
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
\`\`\`

This handles:
- Standard addresses: \`user@example.com\`
- Dots and hyphens in domain: \`user@sub.domain-name.co.uk\`
- Plus addressing: \`user+tag@gmail.com\`
- Underscores: \`first_last@company.com\`

**What it doesn't handle:** Quoted strings (\`"user name"@example.com\`), IP-address domains (\`user@[192.168.1.1]\`), non-ASCII characters. These are technically valid per RFC 5322 but extremely rare in practice.

**Recommendation:** Use this pattern for form validation. For critical email verification, send a confirmation email instead of trying to validate with regex.

## URL Validation

### HTTP/HTTPS URLs

\`\`\`
^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$
\`\`\`

### Extract All URLs From Text

\`\`\`
https?:\\/\\/[^\\s<>"{}|\\\\^\\x60]+
\`\`\`

This looser pattern extracts URLs from unstructured text (emails, docs, logs). It's intentionally permissive because cleaning up a few false positives is easier than missing valid URLs.

## IP Addresses

### IPv4

\`\`\`
^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$
\`\`\`

This correctly validates ranges (0-255 per octet). A common mistake is using \`\\d{1,3}\` which matches invalid values like \`999.999.999.999\`.

### IPv6 (Simplified)

\`\`\`
^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$
\`\`\`

This matches full IPv6 addresses. For abbreviated forms (with \`::\`), the regex gets significantly more complex. For most use cases, use your language's built-in IP parsing library instead.

## Dates and Times

### ISO 8601 Date (YYYY-MM-DD)

\`\`\`
^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$
\`\`\`

Note: This validates format but not logic (it won't catch \`2024-02-30\`). For date validation, parse with a date library after matching the format.

### Common Date Formats

\`\`\`
# MM/DD/YYYY
^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$

# DD-MM-YYYY
^(0[1-9]|[12]\\d|3[01])-(0[1-9]|1[0-2])-\\d{4}$
\`\`\`

### 24-Hour Time (HH:MM:SS)

\`\`\`
^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$
\`\`\`

## Password Strength

### Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 number

\`\`\`
^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$
\`\`\`

### Add special characters requirement

\`\`\`
^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$
\`\`\`

The \`(?=...)\` are lookaheads — they assert that a pattern exists somewhere in the string without consuming characters. This is what makes password validation regex work: each lookahead checks for one requirement independently.

## Numbers and Currency

### Integer (With Optional Sign)

\`\`\`
^-?\\d+$
\`\`\`

### Decimal Number

\`\`\`
^-?\\d+(\\.\\d+)?$
\`\`\`

### Currency (USD Format)

\`\`\`
^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$
\`\`\`

Matches: \`$1,234.56\`, \`1234.56\`, \`$1,234\`, \`100\`

## Code-Specific Patterns

### Variable Names (Most Languages)

\`\`\`
^[a-zA-Z_$][a-zA-Z0-9_$]*$
\`\`\`

### Hex Color Codes

\`\`\`
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
\`\`\`

Matches both shorthand (\`#FFF\`) and full (\`#FFFFFF\`) hex colors.

### Semantic Version (SemVer)

\`\`\`
^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(-[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*)?(\\+[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*)?$
\`\`\`

Matches: \`1.0.0\`, \`2.1.3-beta.1\`, \`1.0.0+build.123\`

### UUID v4

\`\`\`
^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
\`\`\`

Note the \`4\` in the third group (version) and \`[89ab]\` in the fourth (variant). This is what distinguishes v4 from other UUID versions.

## Text Processing

### Remove HTML Tags

\`\`\`
<[^>]*>
\`\`\`

Replace with empty string to strip all HTML. This is not safe for sanitization (use a proper HTML sanitizer for security), but works for extracting text from HTML.

### Extract Quoted Strings

\`\`\`
"([^"\\\\]*(\\\\.[^"\\\\]*)*)"
\`\`\`

Handles escaped quotes inside strings: \`"He said \\"hello\\""\`

### Whitespace Cleanup

\`\`\`
# Multiple spaces to single space
\\s{2,} → replace with single space

# Trim leading/trailing whitespace per line
^\\s+|\\s+$
\`\`\`

### Duplicate Lines

\`\`\`
^(.+)$\\n(?=.*^\\1$)
\`\`\`

With multiline flag. Matches lines that appear more than once. Useful for deduplicating log files or data lists.

## Network and Infrastructure

### MAC Address

\`\`\`
^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$
\`\`\`

### CIDR Notation

\`\`\`
^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.){3}(25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\/(3[0-2]|[12]?\\d)$
\`\`\`

### Domain Name

\`\`\`
^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$
\`\`\`

## Regex Performance Tips

### Avoid Catastrophic Backtracking

Nested quantifiers cause exponential backtracking:

\`\`\`
# Dangerous - can freeze your application
(a+)+$

# Safe alternative
a+$
\`\`\`

If your regex runs fine on matching input but hangs on non-matching input, you likely have a backtracking problem.

### Use Non-Greedy Quantifiers When Appropriate

\`\`\`
# Greedy (default) - matches as much as possible
<.*>  on "<b>text</b>" matches "<b>text</b>"

# Non-greedy - matches as little as possible
<.*?> on "<b>text</b>" matches "<b>" then "</b>"
\`\`\`

### Anchor Your Patterns

If you're validating (not searching), always use \`^\` and \`$\`:

\`\`\`
# Validates: only matches if entire string is a number
^\\d+$

# Searches: matches any number anywhere in the string
\\d+
\`\`\`

### Use a Regex Tester

Don't write regex blind. Use a tool with real-time matching, capture group highlighting, and explanation of what each part does. Testing against multiple sample inputs catches edge cases before they reach production.
`,
};
