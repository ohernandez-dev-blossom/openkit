---
name: html-entities
description: Encode special characters as HTML entities or decode HTML entities back to plain text. Use when the user asks to HTML encode text, HTML escape text, HTML decode entities, convert & < > to HTML entities, unescape HTML, encode characters for HTML, or look up an HTML entity.
---

# HTML Entity Encoder / Decoder

Convert text to HTML-safe entities (encode) or convert HTML entity sequences back to readable characters (decode). Supports named entities (`&amp;`), numeric entities (`&#38;`), and multiple encoding modes.

## Input

**Encode mode:**
- Plain text string
- Encode mode: `special` (default), `all`, `named`, or `numeric`
- Entity type (for `special` / `all` modes): `named` (default) or `numeric`

**Decode mode:**
- A string containing HTML entity sequences (named or numeric)

## Output
- The encoded or decoded string

## Instructions

### Encode mode

**`special` (default) — encode only `< > & " '`:**
| Character | Named | Numeric |
|---|---|---|
| `&` | `&amp;` | `&#38;` |
| `<` | `&lt;` | `&#60;` |
| `>` | `&gt;` | `&#62;` |
| `"` | `&quot;` | `&#34;` |
| `'` | `&apos;` | `&#39;` |

Apply either named or numeric forms based on the entity type option.

**`all` — encode all non-ASCII characters plus the 5 special chars:**
- For characters with code > 127: use `&#CODE;` (numeric decimal).
- For the 5 special chars: use named or numeric per the entity type option.
- All other ASCII characters are passed through unchanged.

**`named` — encode any character that has a known named entity:**
- Look up each character against the full entity table (see reference below).
- If found, output the named entity (e.g., `©` → `&copy;`).
- Fall back to the 5-special-char rules for `& < > " '`.
- Characters with no named entity are passed through unchanged.

**`numeric` — same as `named` but use numeric entities:**
- Output `&#CODE;` for every character that has a known entity.

### Decode mode

Replace every `&name;` or `&#digits;` sequence:
1. Check the sequence against the named entity map. If found, return the character.
2. For `&#N;` numeric entities: convert N (decimal) to `String.fromCharCode(N)`.
3. If unrecognized: leave the sequence unchanged.

Decode regex: `/&([a-zA-Z]+|#\d+);/g`

### Entity reference (partial — most commonly used)

**Special characters:**
`&amp;` `&lt;` `&gt;` `&quot;` `&apos;` `&nbsp;`

**Symbols:**
`&copy;` (©) `&reg;` (®) `&trade;` (™) `&euro;` (€) `&pound;` (£) `&yen;` (¥) `&cent;` (¢) `&deg;` (°) `&plusmn;` (±) `&times;` (×) `&divide;` (÷) `&bull;` (•) `&hellip;` (…) `&sect;` (§) `&para;` (¶)

**Math:**
`&ne;` (≠) `&le;` (≤) `&ge;` (≥) `&infin;` (∞) `&sum;` (∑) `&radic;` (√) `&asymp;` (≈)

**Arrows:**
`&larr;` (←) `&rarr;` (→) `&uarr;` (↑) `&darr;` (↓) `&harr;` (↔) `&rArr;` (⇒) `&lArr;` (⇐)

**Quotes & punctuation:**
`&lsquo;` (') `&rsquo;` (') `&ldquo;` (") `&rdquo;` (") `&ndash;` (–) `&mdash;` (—) `&laquo;` («) `&raquo;` (»)

**Greek letters:**
`&alpha;` (α) `&beta;` (β) `&gamma;` (γ) `&pi;` (π) `&sigma;` (σ) `&omega;` (ω) `&Omega;` (Ω) `&Delta;` (Δ)

## Options

**Encode:**
- `mode`: `special` | `all` | `named` | `numeric` — default: `special`
- `entityType`: `named` | `numeric` — default: `named` (applies to `special` and `all` modes only)

**Decode:**
- No options — both named and numeric entities are always decoded.

## Examples

**Encode — special only (default):**
Input: `Hello <World> & "Friends" © 2024`
Output: `Hello &lt;World&gt; &amp; &quot;Friends&quot; © 2024`

**Encode — all characters, numeric:**
Input: `Hello © 2024`
Output: `Hello &#169; 2024`

**Encode — named entities:**
Input: `© ® ™ €`
Output: `&copy; &reg; &trade; &euro;`

**Decode:**
Input: `&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;`
Output: `<script>alert("XSS")</script>`

**Decode numeric:**
Input: `&#60;div&#62;`
Output: `<div>`

## Error Handling
- **Empty input:** Return an empty string.
- **Unknown named entity in decode:** Leave the sequence as-is (e.g., `&unknown;` → `&unknown;`).
- **Malformed entity (missing semicolon):** Leave unchanged — only complete `&...;` patterns are decoded.
- **Invalid encode mode:** Default to `special` and inform the user of valid options.
