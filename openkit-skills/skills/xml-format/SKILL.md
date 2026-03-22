---
name: xml-format
description: Format, beautify, or prettify XML code. Use when the user asks to format XML, beautify XML, prettify XML, indent XML, clean up XML, fix XML indentation, or make XML readable.
---

# XML Formatter

Beautify minified or messy XML by adding consistent indentation based on element nesting depth.

## Input
- An XML string (can include declarations, elements, attributes, self-closing tags, text nodes)
- May be minified on one line or multi-line with inconsistent whitespace
- Optional indent size: 2 spaces (default) or 4 spaces

## Output
- Properly formatted XML with each tag on its own line, indented to reflect nesting depth

## Instructions

1. If the input is empty or whitespace-only, return an empty string.
2. **Add newlines between adjacent tags**: replace all occurrences of `><` with `>\n<` (insert a newline between any closing `>` and opening `<`). Do not alter content inside tag bodies.
3. **Split** the result into lines on `\n`.
4. **Process each line** with a `pad` (indent level) counter starting at 0:
   a. Trim the line.
   b. **Closing tag check**: if the line matches `^<\/\w` (starts with `</`), decrement `pad` by 1 (minimum 0).
   c. Set `currentIndent = pad`.
   d. Append `PADDING.repeat(currentIndent) + line + "\n"` to the output.
   e. **Opening tag — increment check**: after adding the line, increment `pad` if ANY of these match:
      - The line matches `^<\w[^>]*[^\/]>.*$` — an opening tag that doesn't end with `/>` and has content after `>` (e.g., `<tag>text`)
      - The line matches `^<\w` but does NOT match `^<\w[^>]*>.*<\/` (not a complete open+close on one line) AND does NOT end with `/>` (not self-closing)
   f. **Self-closing tag** (`/>` at end): no change to `pad`.
5. Trim the final output.

Indent unit:
- `2 spaces` (default): two space characters repeated `pad` times
- `4 spaces`: four space characters repeated `pad` times

## Options
- `indent`: `2` (default) | `4`

## Examples

**Simple XML (2-space indent)**

Input:
```
<?xml version="1.0"?><root><item>Hello</item><item>World</item></root>
```

Output:
```xml
<?xml version="1.0"?>
<root>
  <item>Hello</item>
  <item>World</item>
</root>
```

**Nested elements**

Input:
```xml
<library><book><title>Dune</title><author>Herbert</author></book><book><title>Foundation</title><author>Asimov</author></book></library>
```

Output:
```xml
<library>
  <book>
    <title>Dune</title>
    <author>Herbert</author>
  </book>
  <book>
    <title>Foundation</title>
    <author>Asimov</author>
  </book>
</library>
```

**Self-closing tags with 4-space indent**

Input:
```xml
<config><database host="localhost" port="5432"/><cache enabled="true"/></config>
```

Output:
```xml
<config>
    <database host="localhost" port="5432"/>
    <cache enabled="true"/>
</config>
```

**XML with declaration and namespaces**

Input:
```
<?xml version="1.0" encoding="UTF-8"?><root xmlns:ns="http://example.com"><ns:item>Value</ns:item></root>
```

Output:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root xmlns:ns="http://example.com">
  <ns:item>Value</ns:item>
</root>
```

## Error Handling
- If the input is empty, return an empty string and note: "No XML input provided."
- This formatter is regex/string-based, not a full XML parser. It does not validate XML well-formedness (e.g., it will not catch mismatched tags). Severely malformed XML may produce incorrect indentation.
- If a formatting error occurs (e.g., exception), return the original input unchanged with an error note.
- Do not alter attribute values, CDATA sections, or text node content — only whitespace between tags is modified.
- XML declarations (`<?xml ... ?>`) and processing instructions are treated as non-indenting lines.
