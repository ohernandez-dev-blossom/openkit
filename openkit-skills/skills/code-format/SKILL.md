---
name: code-format
description: Format or beautify code in multiple languages with auto-detection. Use when the user asks to format code, beautify code, prettify code, clean up code, indent code, or format a snippet without specifying a specific language skill — supports HTML, CSS, JavaScript, JSON, and SQL.
---

# Multi-Language Code Formatter

Format code in HTML, CSS, JavaScript, JSON, or SQL. Detect the language from context or explicit selection, then apply the appropriate formatter.

## Input
- A code snippet in one of the supported languages: HTML, CSS, JavaScript, JSON, or SQL
- Language may be specified explicitly, or inferred from context (file extension, code structure, user message)
- Code may be minified, inconsistently indented, or multi-line

## Output
- Formatted code with proper indentation and structure, specific to the detected/selected language
- A note indicating which language was detected and used

## Instructions

### Step 1: Determine the language

If the user explicitly names the language (e.g., "format this CSS"), use that.

Otherwise, auto-detect using these heuristics in order:
1. **JSON**: input starts with `{` or `[` and `JSON.parse()` succeeds, OR contains `"key":` patterns → use JSON formatter.
2. **HTML**: input contains `<html`, `<!DOCTYPE`, `<div`, `<p`, `<head`, or other HTML tags → use HTML formatter.
3. **XML**: input starts with `<?xml` or contains `<` with element structure but no HTML-specific tags → use XML formatter (but XML is not in the supported language list for this tool — note this and format as HTML).
4. **CSS**: input contains `{` with property-value pairs matching CSS syntax (e.g., `color:`, `margin:`, `font-size:`) and selectors → use CSS formatter.
5. **SQL**: input begins with `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, or `ALTER` (case-insensitive) → use SQL formatter.
6. **JavaScript**: input contains `function`, `const`, `let`, `var`, `=>`, `class`, `if (`, or other JS-specific syntax → use JavaScript formatter.
7. If no language can be determined, ask the user to specify the language.

### Step 2: Apply the language-specific formatter

#### HTML formatter
1. Replace `>\s*<` with `>\n<` to separate tags.
2. Split on `\n`, process line by line:
   - Trim each line.
   - If empty, skip.
   - If line starts with `</`: decrement `indent` (min 0) before indenting.
   - Prepend `" ".repeat(indent * 2)` to the line.
   - If line starts with `<` (opening tag), does NOT end with `/>`, and does NOT match `<\/.*>$` (complete open-close): increment `indent`.
3. Filter empty lines, join with `\n`.

#### CSS formatter
1. Apply these regex transforms in sequence:
   - `\s*{\s*` → ` {\n  ` (open brace with newline + 2-space indent)
   - `;\s*` → `;\n  ` (semicolons followed by newline + 2-space indent)
   - `\s*}\s*` → `\n}\n\n` (closing brace with surrounding newlines)
   - `:\s+` → `: ` (normalize property-value colon spacing)
   - `,\s*` → `, ` (normalize comma spacing)
2. Trim the result.

#### JavaScript formatter
1. Apply these regex transforms in sequence:
   - `;\s*` → `;\n` (semicolons followed by newline)
   - `([=+\-*/<>!])+` → ` $1 ` (spaces around operators)
   - `\s+` → ` ` (collapse whitespace)
   - `\s*;\s*` → `; ` (normalize semicolons)
   - `\s*,\s*` → `, ` (normalize commas)
   - `\s*{\s*` → ` {\n` (open brace)
   - `\s*}\s*` → `\n}\n` (close brace)
2. Trim.
3. Apply simple indentation: split on `\n`, track `indent` level. Lines starting with `}` decrement before indenting; lines ending with `{` increment after. Prepend `" ".repeat(indent * 2)`.
4. Filter empty lines, join with `\n`.

#### JSON formatter
1. Attempt `JSON.parse(code)`.
2. If successful, return `JSON.stringify(parsed, null, 2)`.
3. If it fails, return the original code with the parse error message.

#### SQL formatter
1. Collect keywords: `SELECT`, `FROM`, `WHERE`, `INSERT`, `UPDATE`, `DELETE`, `JOIN`, `LEFT`, `RIGHT`, `INNER`, `OUTER`, `ON`, `GROUP BY`, `ORDER BY`, `HAVING`, `LIMIT`, `OFFSET`, `UNION`, `VALUES`, `CREATE`, `TABLE`, `ALTER`, `DROP`, `INDEX`.
2. For each keyword, replace `\bKEYWORD\b` (case-insensitive) with `\nKEYWORD` (uppercase).
3. Split on `\n`, trim each line, filter empty lines, join with `\n`.
4. Remove duplicate blank lines, trim.

### Step 3: Return output

- Output the formatted code in a code block with the detected language label.
- Prepend a single line: `Language detected: <language>` (omit if the user specified the language explicitly).

## Options
- `language`: `auto` (default) | `html` | `css` | `javascript` | `json` | `sql`
- `indent`: `2` (default) — this tool always uses 2-space indentation (use the dedicated language skill for other indent options)

## Examples

**Auto-detect JSON**

Input:
```
{"name":"John","age":30,"address":{"city":"NY"}}
```

Output:
```
Language detected: JSON

{
  "name": "John",
  "age": 30,
  "address": {
    "city": "NY"
  }
}
```

**Auto-detect HTML**

Input:
```
<!DOCTYPE html><html><head><title>Hi</title></head><body><p>Hello</p></body></html>
```

Output:
```
Language detected: HTML

<!DOCTYPE html>
<html>
  <head>
    <title>Hi</title>
  </head>
  <body>
    <p>Hello</p>
  </body>
</html>
```

**Auto-detect CSS**

Input:
```
.container{max-width:1200px;margin:0 auto;padding:20px;}h1{color:#333;}
```

Output:
```
Language detected: CSS

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
}

```

**Auto-detect SQL**

Input:
```
SELECT users.id, users.name FROM users JOIN orders ON users.id=orders.user_id WHERE orders.total>100 ORDER BY orders.total DESC
```

Output:
```
Language detected: SQL

SELECT users.id, users.name
FROM users
JOIN orders
ON users.id=orders.user_id
WHERE orders.total>100
ORDER BY orders.total DESC
```

**Auto-detect JavaScript**

Input:
```
function greet(name){if(!name){return"Hello!";}return"Hello, "+name+"!";}const result=greet("Dev");console.log(result);
```

Output:
```
Language detected: JavaScript

function greet(name) {
  if(!name) {
    return "Hello!";
  }
  return "Hello, " + name + "!";
}
const result = greet("Dev");
console.log(result);
```

## Error Handling
- If the input is empty, respond: "No code provided. Please paste the code you want to format and specify the language if needed."
- If language cannot be auto-detected, ask: "I couldn't determine the language. Please specify: HTML, CSS, JavaScript, JSON, or SQL."
- For JSON: if `JSON.parse` fails, return the original code unchanged and display the parse error. Suggest using the `json-repair` skill for broken JSON.
- For other languages: the formatters are regex-based and structural. If the output looks worse than the input (rare but possible with unusual formatting), note that a dedicated skill (e.g., `css-format`, `js-format`) offers more control.
- Never drop or truncate content — always return the complete code, formatted or original.
