---
name: css-format
description: Format, beautify, or prettify CSS code. Use when the user asks to format CSS, beautify CSS, prettify CSS, clean up CSS, indent CSS, fix CSS whitespace, or make CSS readable.
---

# CSS Formatter

Beautify minified or messy CSS by adding consistent indentation, newlines, and spacing.

## Input
- A CSS string (can be minified on one line or multi-line with inconsistent spacing)
- May include selectors, properties, media queries, nested rules, and `url()` values
- Optional indent style: 2 spaces (default), 4 spaces, or tab
- Optional brace style: expanded (default) or compact

## Output
- Properly formatted CSS with one property per line, consistent indentation, and clean structure

## Instructions

Apply formatting in this exact order:

1. If the input is empty or whitespace-only, return an empty string.
2. **Normalize whitespace**: collapse all sequences of whitespace/newlines into a single space. Trim the result.
3. **Add newline after opening brace**: replace each `{` with ` {\n` (space before, newline after).
4. **Add newline before closing brace**: replace each `}` with `\n}\n`.
5. **Add newline after semicolons** — but only semicolons that are NOT inside `url(...)` parentheses: replace `;` (not inside `()`) with `;\n`.
6. **Remove consecutive blank lines**: replace multiple consecutive newlines with a single newline.
7. **Apply indentation** by processing each line:
   a. Split the result on `\n`.
   b. Track an `indentLevel` integer starting at 0.
   c. For each non-empty trimmed line:
      - If the line starts with `}`, decrement `indentLevel` (minimum 0) **before** indenting.
      - Prepend `indentUnit.repeat(indentLevel)` to the line.
      - If the line ends with `{`, increment `indentLevel` **after** adding the line.
   d. Skip (omit) empty lines during this pass.
8. Join lines with `\n` and return the result.

Indent unit:
- `2 spaces` (default): `"  "` (two space characters)
- `4 spaces`: `"    "` (four space characters)
- `tab`: `"\t"`

Brace style note: the current implementation always uses expanded style (opening brace on the same line as selector). The compact option is accepted but produces the same output as expanded (brace is already on the selector line).

## Options
- `indent`: `2` (default) | `4` | `tab`
- `brace-style`: `expanded` (default) | `compact` (currently behaves same as expanded)

## Examples

**Minified input → formatted output (2-space indent)**

Input:
```
.container{background:#f0f0f0;padding:20px;}.button{color:white;border:none;}
```

Output:
```css
.container {
  background: #f0f0f0;
  padding: 20px;
}
.button {
  color: white;
  border: none;
}
```

**Nested rules with media query (4-space indent)**

Input:
```
@media(max-width:768px){.nav{display:none;}.header{font-size:14px;}}
```

Output:
```css
@media(max-width:768px) {
    .nav {
        display: none;
    }
    .header {
        font-size: 14px;
    }
}
```

**url() value preserved (semicolon inside url not split)**

Input:
```
.bg{background:url(data:image/png;base64,abc);color:red;}
```

Output:
```css
.bg {
  background: url(data:image/png;base64,abc);
  color: red;
}
```

**Tab indent**

Input:
```
.card{padding:16px;margin:8px;}
```

Output:
```css
.card {
	padding: 16px;
	margin: 8px;
}
```

## Error Handling
- If the input is empty or contains only whitespace, return an empty string with a note: "No CSS input provided."
- CSS formatting is purely structural (regex/string-based) and does not validate CSS syntax. Invalid CSS property values will be formatted but not flagged.
- If a line cannot be processed, include it as-is rather than dropping it.
- Do not strip vendor prefixes, `!important`, or any CSS content.
