---
name: csv-to-json
description: Parse CSV text and convert it to a JSON array. Use when the user asks to convert CSV to JSON, parse CSV data, transform spreadsheet data to JSON, turn comma-separated values into JSON, or parse a table into JSON objects.
---

# CSV to JSON Converter

Parse CSV data into a JSON array of objects (with headers) or an array of arrays (without headers).

## Input
- CSV text with rows separated by newlines
- Delimiter character: comma `,` (default), semicolon `;`, or tab `\t`
- Whether the first row contains header names (default: true)

## Output
- A pretty-printed JSON array (2-space indent)
- If `firstRowHeaders` is true: array of objects keyed by header names
- If `firstRowHeaders` is false: array of arrays

## Instructions

1. Split the CSV input by newline (`\n`) to get rows. Trim each line.
2. Skip blank lines.
3. Split each row by the chosen delimiter. Trim each cell value.
4. **With headers (default):**
   - Treat the first non-blank row as the header row; collect the header names.
   - For each subsequent row, create an object mapping `headers[i]` → `values[i]`.
   - If a row has more columns than headers, use `column_N` as the key for the extra columns.
5. **Without headers:**
   - Treat every row as an array of string values.
6. Serialize the resulting array with `JSON.stringify(data, null, 2)`.
7. Output the JSON.

## Options
- `delimiter`: `,` | `;` | `\t` — default: `,`
- `firstRowHeaders`: `true` | `false` — default: `true`

## Examples

**Input (comma delimiter, headers on):**
```
name,age,city
John,30,New York
Jane,25,San Francisco
```

**Output:**
```json
[
  {
    "name": "John",
    "age": "30",
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": "25",
    "city": "San Francisco"
  }
]
```

**Input (no headers):**
```
apple,red,1.2
banana,yellow,0.5
```

**Output:**
```json
[
  ["apple", "red", "1.2"],
  ["banana", "yellow", "0.5"]
]
```

## Error Handling
- **Empty input:** Return `[]` and note the input was empty.
- **Single row with headers enabled:** Return `[]` — the header row is consumed, leaving no data rows.
- **Inconsistent column counts:** Use `column_N` for missing header keys; do not error.
- **Invalid delimiter specified:** Default to comma and notify the user.
