---
name: json-schema-generate
description: Generate a JSON Schema from a sample JSON object. Use when the user asks to create a JSON Schema, infer a schema from JSON data, validate JSON structure, or generate a draft-07 or 2020-12 schema definition.
---

# JSON Schema Generator

Infer a JSON Schema (draft-07 by default) from a sample JSON object or array. Detect types, formats, required fields, and nested structures automatically.

## Input
- A valid JSON object or array (the sample data)
- Optional: schema draft version (`draft-04`, `draft-07`, `2020-12`) — default: `draft-07`
- Optional flags:
  - `required` — mark all non-null fields as required (default: true)
  - `examples` — include example values (default: false)
  - `descriptions` — add auto-generated field descriptions (default: false)
  - `additionalProperties` — allow additional properties (default: true)
  - `title` — schema title string (default: "Root")

## Output
A valid JSON Schema document as a JSON code block.

## Instructions
1. Parse the input JSON. If invalid, report the error.
2. Set the `$schema` URI based on draft:
   - draft-04: `http://json-schema.org/draft-04/schema#`
   - draft-07: `http://json-schema.org/draft-07/schema#`
   - 2020-12: `https://json-schema.org/draft/2020-12/schema`
3. Recursively infer schema for each value:
   - `null` → `{"type": "null"}`
   - `boolean` → `{"type": "boolean"}`
   - integer number → `{"type": "integer"}`
   - non-integer number → `{"type": "number"}`
   - string → `{"type": "string"}` plus format detection:
     - ISO date-time pattern (`\d{4}-\d{2}-\d{2}T\d{2}:\d{2}`) → `"format": "date-time"`
     - Date pattern (`\d{4}-\d{2}-\d{2}`) → `"format": "date"`
     - Email pattern → `"format": "email"`
     - HTTP/HTTPS URL → `"format": "uri"`
     - UUID pattern → `"format": "uuid"`
     - IPv4 pattern → `"format": "ipv4"`
   - array → `{"type": "array", "items": <inferred schema>}`. If all items have the same shape, merge. Mixed primitive types use `anyOf`. All-object arrays merge properties across all objects.
   - object → `{"type": "object", "properties": {...}}` with `required` array if enabled
4. If `required` is true, add all non-null, non-undefined property names to the `required` array.
5. If `additionalProperties` is false, add `"additionalProperties": false`.
6. If `descriptions` is true, add `"description": "The {key} field"` to each property.
7. If `examples` is true, add an `"examples"` array with one representative value per field.
8. Wrap with `{"$schema": "...", "title": "...", ...inferred}`.

## Options
- `draft` — `draft-04` | `draft-07` | `2020-12` (default: `draft-07`)
- `required` — boolean (default: true)
- `examples` — boolean (default: false)
- `descriptions` — boolean (default: false)
- `additionalProperties` — boolean (default: true)
- `title` — string (default: "Root")

## Examples

**Input:**
```json
{"id": 1, "name": "John Doe", "email": "john@example.com", "active": true, "created_at": "2026-01-15T10:30:00Z", "tags": ["developer", "admin"]}
```

**Output (draft-07, required: true):**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Root",
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string"},
    "email": {"type": "string", "format": "email"},
    "active": {"type": "boolean"},
    "created_at": {"type": "string", "format": "date-time"},
    "tags": {"type": "array", "items": {"type": "string"}}
  },
  "required": ["id", "name", "email", "active", "created_at", "tags"],
  "additionalProperties": true
}
```

## Error Handling
- If input is not valid JSON, report the parse error clearly.
- If input is a JSON primitive (not object or array), wrap it: `{"$schema": "...", "title": "Root", "type": "<type>"}`.
- If an array is empty, use `"items": {}`.
- For arrays with mixed types that cannot be merged, use `"anyOf"` in `items`.
