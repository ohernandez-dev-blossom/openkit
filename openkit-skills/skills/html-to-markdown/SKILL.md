---
name: html-to-markdown
description: Convert HTML markup to Markdown syntax. Use when the user asks to convert HTML to Markdown, turn HTML into Markdown, strip HTML tags to Markdown, export HTML as Markdown, or clean up HTML for a README.
---

# HTML to Markdown Converter

Transform HTML tags into their Markdown equivalents. Strips structural boilerplate (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`) and converts supported elements; unsupported tags are removed with their content preserved.

## Input
- An HTML string (full document or fragment)

## Output
- A clean Markdown string with excessive blank lines collapsed to a maximum of one blank line between blocks

## Instructions

Apply the following transformations **in order** (order matters to avoid conflicts):

1. **Strip boilerplate:** Remove `<!DOCTYPE ...>`, `<html>`, `</html>`, the entire `<head>...</head>` block, `<body>`, and `</body>`.
2. **Fenced code blocks:** `<pre><code>...</code></pre>` → ` ```\n{decoded content}\n``` ` (decode HTML entities inside).
3. **Inline code:** `<code>...</code>` → `` `content` ``
4. **Headings:** `<h1>` → `# `, `<h2>` → `## `, …, `<h6>` → `###### ` (with newlines before and after).
5. **Bold + italic combined:** `<strong><em>`, `<em><strong>`, `<b><i>`, `<i><b>` → `***content***`
6. **Bold:** `<strong>`, `<b>` → `**content**`
7. **Italic:** `<em>`, `<i>` → `*content*`
8. **Images (before links):**
   - `<img src="URL" alt="TEXT" />` → `![TEXT](URL)`
   - `<img src="URL" />` (no alt) → `![](URL)`
9. **Links:** `<a href="URL">text</a>` → `[text](URL)`
10. **Blockquotes:** `<blockquote>content</blockquote>` → `\n> content\n`
11. **Horizontal rule:** `<hr />` → `\n---\n`
12. **Unordered lists:** `<ul>` / `</ul>` → newlines; `<li>content</li>` → `- content\n`
13. **Ordered lists:** `<ol>` / `</ol>` → newlines; `<li>` items → `1. content\n`, `2. content\n`, … (reset counter per `<ol>`)
14. **Line breaks:** `<br />` → `\n`
15. **Paragraphs:** `<p>` / `</p>` → `\n`
16. **Divs:** `<div>` / `</div>` → `\n`; `<span>` / `</span>` → removed (content kept)
17. **Strip remaining tags:** Remove all other `<...>` tags.
18. **Decode HTML entities:** `&lt;` → `<`, `&gt;` → `>`, `&amp;` → `&`, `&quot;` → `"`, `&#039;` → `'`, `&nbsp;` → space.
19. **Collapse whitespace:** Replace 3+ consecutive newlines with 2 newlines. Trim the result.

## Options
None — conversion is automatic.

## Examples

**Input:**
```html
<h1>Hello World</h1>
<p>This is <strong>bold</strong> and <em>italic</em>.</p>
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
<pre><code>console.log("hi");</code></pre>
<p>See <a href="https://example.com">this link</a>.</p>
```

**Output:**
```markdown
# Hello World

This is **bold** and *italic*.

- Item one
- Item two

```
console.log("hi");
```

See [this link](https://example.com).
```

## Error Handling
- **Invalid / malformed HTML:** Process as-is using the regex-based rules; do not throw. Unrecognized tags are stripped.
- **Empty input:** Return an empty string.
- **Script/style tags:** Their content is removed along with the tags (treated as unsupported elements).
