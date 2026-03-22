---
name: text-diff
description: Compare two texts and show the differences. Use when the user asks to diff, compare, find differences between, show changes between, or highlight what changed between two texts or files.
---

# Text Diff

Compare two texts line by line and display additions, removals, and unchanged lines in unified diff format.

## Input
- `original` — the original (before) text
- `modified` — the modified (after) text
- `mode` — `line` (default), `word`, or `char`
- `ignoreWhitespace` — boolean (default: false)

## Output
- Unified diff showing `+` added lines, `-` removed lines, unchanged lines
- Summary statistics: lines added, lines removed, lines unchanged

## Instructions

### Line mode (default)

1. If `ignoreWhitespace` is true, normalize both texts: collapse all whitespace runs to a single space and trim.
2. Split both texts into arrays of lines.
3. Compute the diff using the longest common subsequence (LCS) approach:
   - Lines present only in `modified`: mark as **added** (`+`)
   - Lines present only in `original`: mark as **removed** (`-`)
   - Lines present in both at matching positions: mark as **unchanged**
4. Render in unified diff format:
   ```
    unchanged line
   -removed line
   +added line
    another unchanged line
   ```
5. Count stats:
   - `added` = number of `+` lines
   - `removed` = number of `-` lines
   - `unchanged` = number of ` ` lines

### Word mode

1. Split both texts into tokens by whitespace (preserving whitespace as separate tokens).
2. For each token: mark as added, removed, or unchanged using LCS.
3. Render inline: `[-removed-]` and `{+added+}` markers in the text flow.
4. Count stats by word tokens.

### Character mode

1. Compare character by character using LCS.
2. Render inline: `[-removed-]` and `{+added+}` markers in the character flow.
3. Count stats by characters.

### Output format

Always start with the stats summary, then the diff:

```
Stats: +{added} added, -{removed} removed, {unchanged} unchanged

--- original
+++ modified
 line 1 (unchanged)
-line 2 (removed from original)
+line 2 (added in modified)
 line 3 (unchanged)
```

## Options
- `mode` — `line` | `word` | `char` (default: `line`)
- `ignoreWhitespace` — `true` | `false` (default: `false`)

## Examples

**Request:** "Diff these two texts"

Original:
```
Hello world
This is line two
Goodbye
```

Modified:
```
Hello world
This is line 2
See you later
```

**Output:**
```
Stats: +2 added, -2 removed, 1 unchanged

--- original
+++ modified
 Hello world
-This is line two
+This is line 2
-Goodbye
+See you later
```

---

**Request:** "Word-level diff: 'the quick brown fox' vs 'the slow brown dog'"

**Output:**
```
Stats: +2 added, -2 removed, 2 unchanged (words)

the [-quick-]{+slow+} brown [-fox-]{+dog+}
```

---

**Request:** "Compare these config files ignoring whitespace"
(Apply ignoreWhitespace normalization before diffing)

## Error Handling
- If either text is empty, treat it as an empty string (diff against empty = all additions or all removals)
- If both texts are identical, report "No differences found. Texts are identical." with stats showing 0 added, 0 removed, N unchanged
- If input is extremely large (>50,000 lines), warn the user that the diff may be lengthy and offer to show only changed sections
- Invalid mode value: default to `line` and inform the user
