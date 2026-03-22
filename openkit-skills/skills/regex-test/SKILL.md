---
name: regex-test
description: Test a regex pattern against text and show all matches. Use when the user asks to test a regex, find regex matches, validate a pattern, check if a regex works, match a regular expression, or extract matches from text using a pattern.
---

# Regex Tester

Test a regular expression pattern against text and show all matches, positions, and capture groups.

## Input
- `pattern` — the regex pattern (without surrounding `/` delimiters)
- `flags` — regex flags: any combination of `g`, `i`, `m`, `s`, `u` (default: `g`)
- `text` — the text to test against

## Output
- Whether the pattern is valid
- Total number of matches
- Each match with: matched string, start index, end index, capture groups (if any)

## Instructions

1. Validate the pattern syntax. If invalid, report the error and stop.

2. Ensure the `g` (global) flag is included so all matches are found.

3. Apply the pattern to the text. For each match record:
   - `match` — the full matched string
   - `index` — zero-based start position in the text
   - `end` — start + match.length
   - `groups` — array of capture group values (empty array if no groups; `undefined` groups shown as `<undefined>`)

4. Format output:

   If no matches:
   ```
   Pattern: /pattern/flags
   Result: No matches found
   ```

   If matches found:
   ```
   Pattern: /pattern/flags
   Matches: {count}

   Match 1: "{matched string}"
     Index: {start}–{end}
     Groups: {group1}, {group2} (or "none" if no capture groups)

   Match 2: ...
   ```

5. If the text is long (>500 chars), show context around each match (20 chars before and after).

## Pattern Library

When the user asks for a pattern for a common use case, suggest from this library:

**Communication:**
- Email: `\b[\w.-]+@[\w.-]+\.\w+\b` (flags: gi)
- URL: `https?://[\w.-]+(?:/[\w.-]*)*/?(?:\?[\w=&.-]*)?` (flags: gi)
- Phone (US): `\+?1?[-.]?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}` (flags: g)
- Phone (International): `\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}` (flags: g)

**Web:**
- IPv4: `\b(?:\d{1,3}\.){3}\d{1,3}\b` (flags: g)
- Hex Color: `#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b` (flags: g)
- Domain: `(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2}` (flags: gi)
- HTML Tag: `<([a-z]+)([^<]+)*(?:>(.*?)</\1>|\s*/>)` (flags: gi)

**Formats:**
- Date (YYYY-MM-DD): `\d{4}-\d{2}-\d{2}` (flags: g)
- Date (MM/DD/YYYY): `\d{1,2}/\d{1,2}/\d{4}` (flags: g)
- Time (24h): `([01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?` (flags: g)
- UUID: `[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}` (flags: g)
- Credit Card: `\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b` (flags: g)

**Programming:**
- Variable name: `\b[a-zA-Z_][a-zA-Z0-9_]*\b` (flags: g)
- JS Function: `function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)` (flags: g)
- Import statement: `import\s+.*?\s+from\s+['"].*?['"];?` (flags: g)

## Options
- `flags` — `g` (global), `i` (case insensitive), `m` (multiline: `^`/`$` match line boundaries), `s` (dotAll: `.` matches newlines), `u` (unicode)
- Default flags: `g`

## Examples

**Request:** "Test regex `\d+` against 'abc 123 def 456'"

**Output:**
```
Pattern: /\d+/g
Matches: 2

Match 1: "123"
  Index: 4–7
  Groups: none

Match 2: "456"
  Index: 12–15
  Groups: none
```

---

**Request:** "Test `(\w+)@(\w+)\.(\w+)` against 'Contact us at hello@example.com or support@test.org'"

**Output:**
```
Pattern: /(\w+)@(\w+)\.(\w+)/g
Matches: 2

Match 1: "hello@example.com"
  Index: 14–31
  Groups: "hello", "example", "com"

Match 2: "support@test.org"
  Index: 35–51
  Groups: "support", "test", "org"
```

---

**Request:** "Does the pattern `^hello` match 'hello world'?" (no `m` flag)

**Output:**
```
Pattern: /^hello/g
Matches: 1

Match 1: "hello"
  Index: 0–5
  Groups: none
```

## Error Handling
- Invalid pattern syntax (e.g., unclosed `[`, unmatched `(`): Report "Invalid regex: {error message}" and stop
- Missing `g` flag: Add it automatically and note that global flag was added to find all matches
- Empty pattern: Ask the user for a pattern to test
- Empty text: Report "No text to test against" if text is blank
- Catastrophic backtracking risk (e.g., `(a+)+$`): Warn the user that the pattern may cause performance issues on long input
