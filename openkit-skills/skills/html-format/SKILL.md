---
name: html-format
description: Format, beautify, or prettify HTML code. Use when the user asks to format HTML, beautify HTML, prettify HTML, indent HTML, fix HTML structure, clean up HTML, or make HTML readable.
---

# HTML Formatter

Beautify minified or messy HTML by adding consistent indentation based on tag nesting depth.

## Input
- An HTML string (can be a full document or a fragment)
- May be minified on one line or multi-line with inconsistent whitespace
- Optional indent style: 2 spaces (default), 4 spaces, or tab

## Output
- Properly formatted HTML with each tag and text node on its own line, indented to reflect nesting depth

## Instructions

1. If the input is empty or whitespace-only, return an empty string.
2. **Collapse whitespace between tags**: replace `>\s+<` with `><` to remove all existing whitespace-only gaps between tags.
3. **Trim** the result.
4. **Tokenize** by splitting on the regex `(<[^>]+>)` — this produces alternating text and tag tokens. Filter out tokens that are empty or whitespace-only.
5. **Process each token** with an `indent` counter starting at 0:
   - **Closing tag** (starts with `</`):
     - Decrement `indent` by 1 (minimum 0).
     - Output: `indentChar.repeat(indent) + token + "\n"`
   - **Opening or self-closing tag** (starts with `<`):
     - Determine if the tag is **self-closing**:
       - The tag ends with `/>`, OR
       - The tag name matches one of the void elements: `area`, `base`, `br`, `col`, `embed`, `hr`, `img`, `input`, `link`, `meta`, `param`, `source`, `track`, `wbr`
     - Output: `indentChar.repeat(indent) + token + "\n"`
     - If the tag is NOT self-closing and does NOT start with `<!` (declaration/doctype), increment `indent` by 1.
   - **Text node** (not a tag):
     - Trim the text. If non-empty, output: `indentChar.repeat(indent) + trimmedText + "\n"`
6. Join all output lines and trim trailing whitespace.

Indent unit:
- `2 spaces` (default): `"  "`
- `4 spaces`: `"    "`
- `tab`: `"\t"`

## Options
- `indent`: `2` (default) | `4` | `tab`

## Examples

**Simple fragment (2-space indent)**

Input:
```
<div><h1>Hello</h1><p>World</p></div>
```

Output:
```html
<div>
  <h1>
    Hello
  </h1>
  <p>
    World
  </p>
</div>
```

**Full document with void elements**

Input:
```html
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Page</title></head><body><img src="logo.png"><p>Hello</p><br><input type="text"></body></html>
```

Output:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>
      Page
    </title>
  </head>
  <body>
    <img src="logo.png">
    <p>
      Hello
    </p>
    <br>
    <input type="text">
  </body>
</html>
```

**Nested structure with 4-space indent**

Input:
```
<ul><li>First</li><li>Second</li><li>Third</li></ul>
```

Output:
```html
<ul>
    <li>
        First
    </li>
    <li>
        Second
    </li>
    <li>
        Third
    </li>
</ul>
```

**Self-closing tag in JSX style**

Input:
```
<div><Component /><p>text</p></div>
```

Output:
```html
<div>
  <Component />
  <p>
    text
  </p>
</div>
```

## Error Handling
- If the input is empty, return an empty string and note: "No HTML input provided."
- This formatter is structural (token-based), not a full HTML parser. It does not validate HTML correctness. Malformed tags (e.g., unclosed attributes) may produce unexpected indentation.
- If formatting produces an error, return the original input unchanged with a note explaining the issue.
- Do not strip or modify any HTML attributes, event handlers, or content — only add whitespace and indentation.
- `<!DOCTYPE html>` and other declarations starting with `<!` are treated as non-indenting opening tokens (they do not increase indent level).
