---
name: yaml-format
description: Format, validate, or prettify YAML. Use when the user asks to format YAML, beautify YAML, prettify YAML, validate YAML, lint YAML, fix YAML indentation, sort YAML keys, minify YAML, or convert YAML to JSON.
---

# YAML Formatter & Validator

Format, validate, and optionally sort or minify YAML documents. Supports multi-document YAML.

## Input
- A YAML string (single document or multi-document separated by `---`)
- May have inconsistent indentation, inline/flow style, or anchors/aliases
- Optional: indent size, sort keys, line width, flow level, action

## Output
- **format** (default): Prettified block-style YAML with consistent indentation
- **validate**: Validation result with error message and line number if invalid
- **minify**: Inline/flow-style YAML on as few lines as possible
- **to-json**: The YAML data serialized as formatted JSON (2-space indent)

## Instructions

### Validation (always performed first)
1. Attempt to parse all documents in the input using YAML 1.2 semantics.
2. If parsing fails, extract the error message and line number (1-indexed: internal 0-indexed line + 1).
3. Report: `Invalid YAML: <message> (line <N>)` or `Valid YAML — <N> documents, <K> keys`.

### Format action
1. If the YAML is invalid, report the validation error and stop.
2. Parse all documents (`loadAll` semantics — handle `---` separators).
3. For each document:
   a. If `sort-keys` is enabled, recursively sort all object keys alphabetically at every depth level. Arrays are not sorted — only object keys.
   b. Dump the document using block style with the configured `indent` size and `lineWidth`.
   c. `flowLevel` controls when to switch to inline style: `-1` = never (full block), `0` = always inline, `1` = inline from depth 1, `2` = inline from depth 2.
4. Join multiple documents with `---\n` between them.
5. Do not re-introduce anchors/aliases in the output (`noRefs: true`).

### Minify action
1. If the YAML is invalid, report the error and stop.
2. Parse all documents.
3. Dump each with `flowLevel: 0` (fully inline) and `lineWidth: -1` (no line wrapping).
4. Join with `---\n`.

### To-JSON action
1. Parse the first document only (single document expected).
2. Serialize with `JSON.stringify(doc, null, 2)`.
3. Return the JSON string.

### Format & Apply
When the user asks to "apply" or "replace" their YAML with the formatted version, output the formatted YAML as the final result (same as format).

## Options
- `indent`: `2` (default) | `4` | `8` — spaces per indent level
- `sort-keys`: `false` (default) | `true` — sort object keys alphabetically at all levels
- `line-width`: `80` (default) | `60` | `120` | `-1` (no wrap) — max line length before wrapping
- `flow-level`: `-1` (default, full block) | `0` (all inline) | `1` | `2` — depth at which to switch to flow style
- `action`: `format` (default) | `validate` | `minify` | `to-json`

## Examples

**Format with 2-space indent (default)**

Input:
```yaml
server:
    host: 0.0.0.0
    port: 8080
database:
    host: localhost
    port:  5432
```

Output:
```yaml
server:
  host: 0.0.0.0
  port: 8080
database:
  host: localhost
  port: 5432
```

**Sort keys**

Input:
```yaml
zebra: 1
apple: 2
mango: 3
```

Output (sort-keys: true):
```yaml
apple: 2
mango: 3
zebra: 1
```

**Validate — invalid YAML**

Input:
```
key: value
  bad-indent: here
```

Output:
```
Invalid YAML: bad indentation of a mapping entry at line 2, column 3 (line 2)
```

**Minify**

Input:
```yaml
server:
  host: localhost
  port: 8080
features:
  - dark-mode
  - beta
```

Output:
```yaml
{server: {host: localhost, port: 8080}, features: [dark-mode, beta]}
```

**Convert to JSON**

Input:
```yaml
name: Alice
age: 30
hobbies:
  - reading
  - coding
```

Output:
```json
{
  "name": "Alice",
  "age": 30,
  "hobbies": [
    "reading",
    "coding"
  ]
}
```

**Multi-document YAML**

Input:
```yaml
name: service-a
port: 3000
---
name: service-b
port: 4000
```

Output (formatted):
```yaml
name: service-a
port: 3000
---
name: service-b
port: 4000
```

## Error Handling
- If the input is empty, report: "Input is empty. Please provide a YAML string."
- Always validate before formatting. Never attempt to format invalid YAML — report the error with line number.
- YAML 1.2 is supported. YAML 1.1 features like `yes`/`no` as booleans behave according to the js-yaml core schema (they are treated as strings in YAML 1.2).
- Anchors and aliases in the input are resolved during parsing; the output will not contain anchors/aliases (they are inlined).
- For multi-document YAML with `to-json`, only the first document is converted. Note this to the user if multiple documents are detected.
