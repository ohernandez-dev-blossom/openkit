---
name: json-to-typescript
description: Generate TypeScript interfaces, type aliases, Zod schemas, Python dataclasses, or Go structs from JSON. Use when the user asks to generate TypeScript types from JSON, create an interface from JSON, convert JSON to a TypeScript type, generate a Zod schema from JSON, generate a Python dataclass from JSON, or generate a Go struct from JSON.
---

# JSON to TypeScript Types Generator

Infer and generate strongly-typed definitions from a JSON sample. Supports TypeScript `interface`, TypeScript `type`, Zod schema, Python dataclass, and Go struct output formats.

## Input
- A valid JSON string (object or array)
- Output format: `interface` (default), `type`, `zod`, `python`, or `go`
- Root type name: any valid identifier (default: `Root`)
- Optional: mark all properties as optional (adds `?` / `.partial()` / `Optional[...]` / pointer types)
- Optional: add `export` keyword (default: true for TS/Zod)

## Output
- The generated type definition(s) as a code string

## Instructions

### Type inference rules (for TypeScript / Zod)

| JSON value | TypeScript | Zod |
|---|---|---|
| `null` | `null` | `z.null()` |
| `undefined` | `undefined` | `z.undefined()` |
| boolean | `boolean` | `z.boolean()` |
| number | `number` | `z.number()` |
| string | `string` | `z.string()` |
| empty array `[]` | `any[]` | `z.array(z.any())` |
| uniform array | `ElementType[]` | `z.array(inferredType)` |
| mixed array | `(T1 \| T2)[]` | `z.array(z.union([...]))` |
| object | inline `{ prop: Type }` | `z.object({ ... })` |

### Format: TypeScript interface
```
export interface RootName {
  key: Type;
  nestedObj: {
    field: Type;
  };
}
```
- Keyword: `interface`, separator between name and body: space
- Keys containing non-identifier characters are quoted: `"my-key": Type`
- Optional mark `?` after key name when optional mode is on

### Format: TypeScript type alias
Same type inference, but:
```
export type RootName = {
  key: Type;
};
```
- Keyword: `type`, separator: ` = `

### Format: Zod schema
```typescript
import { z } from "zod";

export const RootNameSchema = z.object({
  key: z.string(),
  count: z.number(),
});

export type RootName = z.infer<typeof RootNameSchema>;
```
- Append `.partial()` to the top-level `z.object(...)` when optional mode is on

### Format: Python dataclass
```python
from dataclasses import dataclass
from typing import List, Optional, Union

@dataclass
class RootName:
    field: str
    count: int
    nested: NestedName
```
- Nested objects get their own named dataclass (name = parent class name + capitalized field name)
- Arrays of objects: `List[ChildItem]` with a separate dataclass for the item type
- Type mapping: boolean → `bool`, integer → `int`, float → `float`, string → `str`, null → `None`, plain array → `list`, mixed array → `List[Union[...]]`
- Optional mode wraps every type in `Optional[...]`

### Format: Go struct
```go
package main

type RootName struct {
    FieldName string `json:"fieldName"`
    Count     int    `json:"count"`
}
```
- Field names are PascalCase (split on `_`, `-`, spaces, then capitalize each word)
- JSON tag preserves original key name
- Type mapping: boolean → `bool`, integer → `int`, float → `float64`, string → `string`, null/object/mixed → `interface{}`
- Arrays of uniform primitives → `[]Type`; arrays of objects → separate struct + `[]ChildStruct`
- Optional mode uses pointer types: `*Type`

### General algorithm
1. Parse the input JSON (`JSON.parse`).
2. Traverse the parsed value recursively, inferring types at each level.
3. For objects, generate property lines sorted by original key order.
4. For arrays, infer the element type from the first element (or union of all element types if mixed).
5. Assemble and return the complete output string.

## Options
- `format`: `interface` | `type` | `zod` | `python` | `go` — default: `interface`
- `rootName`: identifier string — default: `Root`
- `optional`: `true` | `false` — default: `false`
- `useExport`: `true` | `false` — default: `true`

## Examples

**Input JSON:**
```json
{"id": 1, "name": "Alice", "active": true, "tags": ["admin", "user"]}
```

**interface output:**
```typescript
export interface Root {
  id: number;
  name: string;
  active: boolean;
  tags: string[];
}
```

**zod output:**
```typescript
import { z } from "zod";

export const RootSchema = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
  tags: z.array(z.string()),
});

export type Root = z.infer<typeof RootSchema>;
```

**go output:**
```go
package main

type Root struct {
    Id     int    `json:"id"`
    Name   string `json:"name"`
    Active bool   `json:"active"`
    Tags   []string `json:"tags"`
}
```

## Error Handling
- **Invalid JSON:** Report `// Error: Invalid JSON — <parse error message>`. Ask the user to check for syntax errors.
- **Non-object root for Python/Go:** Report a comment explaining that Python dataclasses and Go structs require a root JSON object (not an array or primitive).
- **Empty JSON object `{}`:** Generate an empty type definition body.
- **Empty input:** Ask the user to provide a JSON sample.
