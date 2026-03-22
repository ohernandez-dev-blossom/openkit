---
name: json-repair
description: Fix broken or malformed JSON automatically. Use when the user asks to repair JSON, fix JSON, clean up broken JSON, fix invalid JSON, fix JSON with trailing commas, fix JSON with single quotes, fix JSON with comments, fix JSON with unquoted keys, or fix JSON with missing brackets.
---

# JSON Repair

Automatically fix common JSON errors and produce valid, pretty-printed JSON.

## Input
- A broken or malformed JSON string exhibiting one or more common issues:
  - Unquoted or single-quoted keys
  - Single-quoted string values
  - Trailing commas after the last element
  - Missing commas between elements
  - Single-line (`//`) or multi-line (`/* */`) comments
  - Missing closing braces `}` or brackets `]`
  - Unescaped newlines inside strings
  - Content that looks like key-value pairs but isn't wrapped in `{}`

## Output
- The repaired JSON, pretty-printed with 2-space indentation
- A list of all fixes that were applied
- A success or partial-success status

## Instructions

Apply repairs in this exact order:

1. **Trim** the input. If empty, return an error.
2. **Try parsing as-is** (`JSON.parse`). If it succeeds, return it formatted with 2-space indent and report "JSON was already valid."
3. **Remove single-line comments**: strip all `//...` patterns up to end of line. Record count removed.
4. **Remove multi-line comments**: strip all `/* ... */` patterns. Record count removed.
5. **Replace single quotes with double quotes**:
   - First attempt context-aware replacement: `'value'` → `"value"` only when surrounded by JSON structural characters (`[{,:` or `]}` or whitespace/end).
   - If the string still contains `'` and has no `"` at all, replace all `'` with `"` globally.
   - Record this fix if applied.
6. **Quote unquoted keys**: find patterns like `{key:` or `,key:` where `key` matches `[a-zA-Z_$][a-zA-Z0-9_$]*` and add double quotes. Record if changed.
7. **Remove trailing commas**: replace `,` immediately before `}` or `]` (with optional whitespace). Record if changed.
8. **Add missing commas**: find places where a value (`"`, `}`, `]`, digit) is followed by a newline and then another key (`"`), and insert a comma. Record if changed.
9. **Escape unescaped newlines inside strings**: find newline characters inside double-quoted strings and replace with `\n`. Record if changed.
10. **Balance brackets and braces**:
    - Count `{` vs `}` and `[` vs `]` (ignoring characters inside strings).
    - Append missing closing braces/brackets to the end of the string.
    - Record how many were added.
11. **Wrap bare key-value content**: if the string doesn't start with `{` or `[` but contains `:`, wrap in `{}`.
12. **Try parsing the repaired string**. If it succeeds, return pretty-printed result with the list of fixes applied.
13. **Last resort**: try wrapping the entire repaired string in `[]` and parsing as an array. If this succeeds, record "Wrapped multiple objects in array."
14. If all attempts fail, return the partially-repaired string plus a message: "Could not fully repair: [parse error message]" and mark as partial success.

Present the output as:
- The repaired JSON (or partial result)
- A bulleted list of each fix applied
- A clear status: "JSON repaired successfully" or "Partial repair — some issues remain"

## Options
- No configurable options. The tool always outputs 2-space indented JSON.

## Examples

**Unquoted keys + single quotes + trailing comma**

Input:
```
{name: 'Alice', age: 30, tags: ['dev', 'js',]}
```

Fixes applied:
- Converted single quotes to double quotes
- Added quotes to unquoted keys
- Removed trailing commas

Output:
```json
{
  "name": "Alice",
  "age": 30,
  "tags": [
    "dev",
    "js"
  ]
}
```

**Comments + missing comma**

Input:
```
{
  // server settings
  "debug": true,
  "port": 3000
  "host": "localhost"
}
```

Fixes applied:
- Removed 1 single-line comment
- Added missing commas between elements

Output:
```json
{
  "debug": true,
  "port": 3000,
  "host": "localhost"
}
```

**Missing closing brace**

Input:
```
{"user": {"id": 1, "name": "Bob"}
```

Fixes applied:
- Added 1 missing closing brace

Output:
```json
{
  "user": {
    "id": 1,
    "name": "Bob"
  }
}
```

## Error Handling
- If the input is empty, report: "Input is empty. Please provide a JSON string to repair."
- If all repair strategies fail, return the partial result with the exact parse error message from the final `JSON.parse` attempt, and mark the result as a partial repair.
- Never silently drop data — preserve all values; only fix structural/syntactic issues.
- If the JSON was already valid, say so explicitly rather than listing no fixes.
