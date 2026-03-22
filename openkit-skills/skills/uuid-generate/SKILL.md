---
name: uuid-generate
description: Generate one or more UUIDs (Universally Unique Identifiers). Use when the user asks to generate a UUID, create a GUID, make a random unique ID, or produce multiple UUIDs at once.
metadata: {"openclaw":{"requires":{"bins":["uuidgen"]}}}
---

# UUID Generate

Generate UUIDs using `uuidgen`.

## Input
- Count: number of UUIDs to generate (default: 1)
- Format options:
  - `standard` — lowercase with hyphens (e.g., `550e8400-e29b-41d4-a716-446655440000`)
  - `uppercase` — uppercase with hyphens (e.g., `550E8400-E29B-41D4-A716-446655440000`)
  - `no-dash` — lowercase without hyphens (e.g., `550e8400e29b41d4a716446655440000`)

## Output
- The requested number of UUIDs, one per line, in the requested format

## Instructions

1. Determine count (default 1) and format (default: standard lowercase).

2. **Generate a single UUID:**
   ```
   uuidgen
   ```
   Note: on macOS, `uuidgen` outputs uppercase by default. Convert to lowercase if needed.

3. **Generate multiple UUIDs (e.g., 5):**
   ```
   for i in $(seq 5); do uuidgen; done
   ```

4. **Apply format transformations after generation:**

   **Lowercase (standard):**
   ```
   uuidgen | tr '[:upper:]' '[:lower:]'
   ```

   **Uppercase:**
   ```
   uuidgen | tr '[:lower:]' '[:upper:]'
   ```

   **No hyphens (lowercase):**
   ```
   uuidgen | tr -d '-' | tr '[:upper:]' '[:lower:]'
   ```

5. **Full command for N UUIDs in a specific format:**
   ```
   for i in $(seq N); do uuidgen | tr '[:upper:]' '[:lower:]'; done
   ```

6. If `uuidgen` is not found, tell the user:
   > "This skill requires `uuidgen`. On macOS it is pre-installed. On Linux install with: `sudo apt install uuid-runtime` (provides `uuidgen`)."

7. Display the UUIDs clearly. If only one was requested, show it prominently. If multiple, list them numbered or as a plain list.

## Examples

**Single UUID, standard format:**
**Command:** `uuidgen | tr '[:upper:]' '[:lower:]'`
**Output:** `550e8400-e29b-41d4-a716-446655440000`

**5 UUIDs, uppercase:**
**Command:** `for i in $(seq 5); do uuidgen | tr '[:lower:]' '[:upper:]'; done`
**Output:**
```
550E8400-E29B-41D4-A716-446655440000
7F4E2100-AB3C-4D5E-8F90-112233445566
...
```

**3 UUIDs, no hyphens:**
**Command:** `for i in $(seq 3); do uuidgen | tr -d '-' | tr '[:upper:]' '[:lower:]'; done`
**Output:**
```
550e8400e29b41d4a716446655440000
7f4e2100ab3c4d5e8f90112233445566
...
```

## Error Handling

- `uuidgen` not found → tell user to install `uuid-runtime` (Linux) or note it comes pre-installed on macOS
- Count is 0 or negative → reject with a message asking for a positive integer
- Count is very large (> 10000) → warn the user this may take a moment and ask to confirm
- Format not recognized → default to standard lowercase and notify the user
