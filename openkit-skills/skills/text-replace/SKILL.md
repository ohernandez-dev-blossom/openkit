---
name: text-replace
description: Find and replace text with optional regex support. Use when the user asks to find and replace, substitute text, replace all occurrences, do a regex replace, swap text patterns, or bulk replace in a string.
---

# Text Find & Replace

Find and replace text in a string with support for plain text, regex patterns, capture group references, case sensitivity, and whole-word matching.

## Input
- `text` — the source text to operate on
- `find` — the search term (plain text or regex pattern)
- `replace` — the replacement string (may contain `$1`, `$2`... for capture group references)
- `mode` — `plain` (default) or `regex`
- `caseSensitive` — boolean (default: false)
- `wholeWord` — boolean, plain mode only (default: false)

## Output
- The resulting text after all replacements
- The number of matches replaced

## Instructions

1. Parse inputs: `text`, `find`, `replace`, `mode`, `caseSensitive`, `wholeWord`.

2. **Build the pattern:**

   **If mode = `plain`:**
   - Escape all regex metacharacters in `find`: `. * + ? ^ $ { } ( ) | [ ] \`
     Replace each with `\` + the character.
   - If `wholeWord` is true, wrap with `\b`: `\b{escapedFind}\b`
   - Set flags: always include `g` (replace all); add `i` if `caseSensitive` is false.

   **If mode = `regex`:**
   - Use `find` as-is as the regex pattern.
   - Set flags: always include `g`; add `i` if `caseSensitive` is false.
   - If the pattern is syntactically invalid, report the error and stop.

3. **Count matches:** Apply the pattern to `text` and count all occurrences.

4. **Replace:** Apply `text.replace(pattern, replace)`.
   - Honor `$1`, `$2`, etc. in the replacement string as capture group back-references.
   - `$&` references the entire match.

5. **Output:** Return the replaced text, then report the match count.

## Options
- `mode` — `plain` | `regex` (default: `plain`)
- `caseSensitive` — `true` | `false` (default: `false`)
- `wholeWord` — `true` | `false`, plain mode only (default: `false`)

## Examples

**Request:** "Replace 'foo' with 'bar' in: 'foo fighters foo foo'"

**Output:**
```
bar fighters bar bar
```
Replacements made: 3

---

**Request:** "Regex replace: find `(\d{4})-(\d{2})-(\d{2})`, replace with `$3/$2/$1` in: 'Date: 2024-01-15 and 2024-12-31'"

**Output:**
```
Date: 15/01/2024 and 31/12/2024
```
Replacements made: 2

---

**Request:** "Case-insensitive replace 'hello' with 'hi' in: 'Hello HELLO hello'"

**Output:**
```
hi hi hi
```
Replacements made: 3

---

**Request:** "Whole word replace 'is' with 'was' in: 'this is it. it is what it is.'"

**Output:**
```
this was it. it was what it was.
```
Replacements made: 3
(Note: "this" was NOT matched because `is` only matches as a whole word)

---

**Request:** "Remove all numbers from: 'abc 123 def 456'"
(find: `\d+`, replace: ``, mode: regex)

**Output:**
```
abc  def
```
Replacements made: 2

## Error Handling
- If `find` is empty, return the original text unchanged and report 0 replacements
- If `mode` is `regex` and the pattern is invalid (e.g., unclosed parenthesis), report: "Invalid regex pattern: {error message}" and do not modify the text
- If `text` is empty, return an empty string with 0 replacements
- If `wholeWord` is requested with `mode = regex`, inform the user that whole-word matching is only available in plain mode; proceed with the regex as-is
