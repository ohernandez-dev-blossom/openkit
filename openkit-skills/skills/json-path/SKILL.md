---
name: json-path
description: Query JSON data with JSONPath expressions and return the matching value and its path. Use when the user asks to find a value in JSON, extract a field using dot notation or JSONPath, or navigate a JSON structure.
---

# JSON Path Finder

Parse a JSON document and answer queries about specific fields: return the value, its type, and the full path in dot, bracket, or JSONPath notation.

## Input
- A JSON string (object or array)
- A query: either a key name to find, a path to navigate (e.g. `users[0].email`), or a JSONPath expression (e.g. `$.users[0].email`)

## Output
For each match:
- Path in all three notations (dot, bracket, JSONPath)
- Value type (string, number, boolean, null, object, array)
- Value (primitive shown directly; objects/arrays shown as JSON)

## Instructions
1. Parse the JSON. If it is invalid, report the parse error and stop.
2. Interpret the query:
   - If it starts with `$`, treat as a JSONPath expression.
   - If it contains dots or brackets, treat as a dot/bracket path and navigate accordingly.
   - If it is a plain key name, search recursively for all occurrences of that key in the document.
3. Navigate/search the parsed JSON and collect matching nodes.
4. For each match, compute:
   - **Dot notation**: `users[0].profile.city` (array indices as `[n]`, object keys as `.key` or `["key"]` for special chars)
   - **Bracket notation**: `["users"][0]["profile"]["city"]`
   - **JSONPath**: `$.users[0].profile.city`
5. Report the value and its type.

### Path format rules
- **Dot notation**: start with root key, separate object keys with `.`, array indices with `[n]`. Use `["key"]` for keys containing non-alphanumeric characters.
- **Bracket notation**: every segment in brackets — strings quoted, numbers unquoted.
- **JSONPath**: prefix `$`, object keys as `.key`, array indices as `[n]`.

## Options
- `format` — which path notation to emphasize in output (dot | bracket | jsonpath); default: all three

## Examples

**Input JSON:**
```json
{"users": [{"id": 1, "name": "Alice", "profile": {"city": "New York"}}], "metadata": {"version": "1.0"}}
```

**Query:** `city`

**Output:**
```
Found: users[0].profile.city

Dot notation:     users[0].profile.city
Bracket notation: ["users"][0]["profile"]["city"]
JSONPath:         $.users[0].profile.city

Type:  string
Value: "New York"
```

**Query:** `$.metadata.version`

**Output:**
```
Dot notation:     metadata.version
Bracket notation: ["metadata"]["version"]
JSONPath:         $.metadata.version

Type:  string
Value: "1.0"
```

## Error Handling
- If JSON is invalid, report the parse error with the character position if available.
- If the path or key is not found in the document, say "Not found" and suggest similar keys if any exist.
- If multiple occurrences of a key exist, list all of them with their respective paths.
