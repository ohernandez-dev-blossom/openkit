---
name: toml-to-json
description: Parse TOML configuration text and convert it to JSON. Use when the user asks to convert TOML to JSON, parse a TOML file, transform TOML config to JSON, or read TOML data as JSON.
---

# TOML to JSON Converter

Parse TOML (Tom's Obvious Minimal Language) and output equivalent JSON. Supports key-value pairs, sections, nested sections, strings, numbers, booleans, and inline arrays.

## Input
- TOML text as a string
- Optional indentation: `2` spaces (default), `4` spaces, or `0` (minified)

## Output
- A JSON string serialized with the requested indentation
- If parsing fails, an error message starting with `Error:`

## Instructions

Parse the TOML line by line using the following rules:

1. **Skip** empty lines and lines whose first non-whitespace character is `#` (comments).
2. **Section headers** — lines matching `[section]` or `[section.subsection]`:
   - Extract the section name between the brackets.
   - Split by `.` to get path parts.
   - Navigate (and create if missing) nested objects in the result object along those parts.
   - All subsequent key=value lines are assigned into the current section object.
3. **Key-value pairs** — lines containing `=`:
   - Split at the first `=`. Left side is the key (trimmed), right side is the raw value (trimmed).
   - Parse the raw value:
     - `true` / `false` → boolean
     - Quoted string (`"..."` or `'...'`) → strip surrounding quotes, return string
     - Inline array (`[...]`) → split by `,`, recursively parse each item, return array
     - Inline comments (`# ...`) on unquoted values: strip from `#` onward before parsing
     - Pure number (passes `Number()`) → number
     - Anything else → return as-is (unquoted string)
4. After processing all lines, serialize the result object with `JSON.stringify(result, null, indent)`.

## Options
- `indent`: `2` | `4` | `0` — default: `2`

## Examples

**Input:**
```toml
# App config
[server]
host = "localhost"
port = 8080
enabled = true

[database]
max_connections = 100

[features]
allowed_origins = ["http://localhost", "https://example.com"]
```

**Output (indent: 2):**
```json
{
  "server": {
    "host": "localhost",
    "port": 8080,
    "enabled": true
  },
  "database": {
    "max_connections": 100
  },
  "features": {
    "allowed_origins": [
      "http://localhost",
      "https://example.com"
    ]
  }
}
```

## Error Handling
- **Malformed key-value line (no `=`):** Skip the line silently.
- **Unterminated quoted string:** Treat as a plain string up to end of line.
- **Empty input:** Return `{}`.
- **Any thrown exception:** Return `Error: <message>` so the caller can surface it to the user.
- Note: This parser covers basic TOML. Advanced features like multi-line strings, datetime literals, and array-of-tables (`[[...]]`) are not supported — inform the user if those constructs are detected.
