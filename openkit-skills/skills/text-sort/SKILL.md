---
name: text-sort
description: Sort lines of text alphabetically or by line length, in ascending or descending order. Use when the user asks to sort lines, alphabetize a list, sort text alphabetically, sort lines by length, reverse sort, deduplicate lines, or remove duplicates from a list.
---

# Text / Line Sorter

Sort a multi-line text block by alphabetical order or line length, in ascending or descending direction. Optionally remove empty lines before sorting.

## Input
- A multi-line text string (one item per line)
- Sort order: `ascending` (default) or `descending`
- Sort by: `alphabetical` (default) or `length`
- Remove empty lines: `true` (default) or `false`

## Output
- The sorted lines joined by newlines
- A brief summary: `{original count} lines → {result count} lines`

## Instructions

1. **Split** the input by newline (`\n`) to get individual lines.
2. **Filter** (if `removeEmpty` is true): discard lines whose trimmed content is blank.
3. **Sort** using the following comparators:
   - **Alphabetical (`text` / `alpha`):**
     - Ascending: `a.localeCompare(b)` (locale-aware alphabetical order)
     - Descending: `b.localeCompare(a)`
   - **By length:**
     - Ascending: `a.length - b.length`
     - Descending: `b.length - a.length`
4. **Join** the sorted lines with `\n`.
5. Output the result and the line count summary.

### Notes on locale-aware sort
`localeCompare` respects the system locale for correct ordering of accented characters and case. Uppercase letters sort before lowercase by default in many locales (e.g., `Apple` before `apple`). If the user wants case-insensitive sort, compare `a.toLowerCase().localeCompare(b.toLowerCase())`.

## Options
- `order`: `ascending` | `descending` — default: `ascending`
- `sortBy`: `alphabetical` | `length` — default: `alphabetical`
- `removeEmpty`: `true` | `false` — default: `true`

## Examples

**Alphabetical ascending (default):**
Input:
```
zebra
apple
banana
cherry
date
```
Output:
```
apple
banana
cherry
date
zebra
```
Summary: `5 lines → 5 lines`

**Alphabetical descending:**
Input: same as above
Output:
```
zebra
date
cherry
banana
apple
```

**Sort by length ascending:**
Input:
```
banana
fig
kiwi
strawberry
```
Output:
```
fig
kiwi
banana
strawberry
```

**Sort by length descending:**
Output:
```
strawberry
banana
kiwi
fig
```

**With empty line removal:**
Input:
```
banana

apple

cherry
```
(3 non-empty lines, 2 empty)
Output (sorted, empty removed):
```
apple
banana
cherry
```
Summary: `5 lines → 3 lines`

## Error Handling
- **Empty input:** Return an empty string with summary `0 lines → 0 lines`.
- **Single line:** Return it unchanged.
- **All lines empty (with removeEmpty: true):** Return empty string, note all lines were blank.
- **Invalid sort option:** Default to alphabetical ascending and inform the user.
