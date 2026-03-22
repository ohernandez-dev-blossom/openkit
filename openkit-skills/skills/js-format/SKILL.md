---
name: js-format
description: Format, beautify, or minify JavaScript code. Use when the user asks to format JavaScript, beautify JavaScript, prettify JavaScript, indent JavaScript, clean up JavaScript, format JS, minify JavaScript, compress JavaScript, or remove whitespace from JavaScript.
---

# JavaScript Formatter

Beautify or minify JavaScript code with configurable indentation. Handles strings, template literals, comments, and nested braces/brackets.

## Input
- A JavaScript string (ES5, ES6+, arrow functions, classes, async/await, etc.)
- May be minified on one line or multi-line with inconsistent formatting
- Optional: indent style (2 spaces default, 4 spaces, or tab), action (format or minify)

## Output
- **format**: Beautified JavaScript with proper indentation and line breaks
- **minify**: JavaScript with comments stripped and whitespace collapsed to the minimum required

## Instructions

### Format algorithm

Process the input character by character, tracking state:
- `inString`: the current string delimiter (`"` or `'`) or `null`
- `inTemplate`: boolean — inside a template literal (backtick)
- `inLineComment`: boolean — inside a `//` comment
- `inBlockComment`: boolean — inside a `/* */` comment
- `depth`: current indent level (integer, starts at 0)
- `result`: accumulated output string

For each character `ch` (with `next = code[i+1]`):

1. **Line comment start** (`//` when not in string/block-comment):
   - Set `inLineComment = true`, append `//`, advance `i` by 2.
2. **While in line comment**:
   - If `ch === '\n'`: set `inLineComment = false`, call `addNewline()`, advance.
   - Else: append `ch`, advance.
3. **Block comment start** (`/*` when not in string/line-comment):
   - Set `inBlockComment = true`, append `/*`, advance `i` by 2.
4. **While in block comment**:
   - If `ch === '*'` and `next === '/'`: set `inBlockComment = false`, append `*/`, advance by 2.
   - Else: append `ch`, advance.
5. **Template literal toggle** (`` ` `` when not in string):
   - Toggle `inTemplate`, append `` ` ``, advance.
6. **While in template literal**: append `ch` as-is, advance.
7. **String start** (`"` or `'` when not in string):
   - Set `inString = ch`, append `ch`, advance.
8. **While in string**:
   - Append `ch`. If `ch === inString` and previous char was not `\`, set `inString = null`. Advance.
9. **Opening brace/bracket/paren** (`{`, `[`, `(`):
   - Append `ch`, increment `depth`, call `addNewline()`, advance.
10. **Closing brace/bracket/paren** (`}`, `]`, `)`):
    - Decrement `depth` (min 0), call `addNewline()`, append `ch`, advance.
11. **Semicolon** (`;`):
    - Append `;`. If `next` is not `\n`, `}`, or `)`, call `addNewline()`. Advance.
12. **Comma** (`,`):
    - Append `,`, call `addNewline()`, advance.
13. **Newline or carriage return** (`\n`, `\r`): skip (advance only — we control all indentation).
14. **Space or tab** (outside string/comment):
    - Append a single space only if result doesn't already end with space, newline, or indent. Advance.
15. **All other characters**: append `ch`, advance.

`addNewline()` function:
- Trim trailing spaces from `result`.
- Append `\n` + `indent.repeat(depth)`.

Post-processing:
- Split on `\n`, trim each line's trailing whitespace.
- Join on `\n`.
- Replace 3 or more consecutive newlines with `\n\n`.
- Trim.

### Minify algorithm

Process the input character by character with the same state tracking (`inString`, `inTemplate`, `inLineComment`, `inBlockComment`):

1. **Line comments** (`//` when not in string/template/block-comment): set `inLineComment = true`, skip `//`, advance by 2.
2. **While in line comment**: if `\n`, end comment; else skip. Advance.
3. **Block comments** (`/*` when not in string/line-comment/template): set `inBlockComment = true`, skip `/*`, advance by 2.
4. **While in block comment**: if `*/`, end; else skip. Advance.
5. **Template literals**: toggle on `` ` ``, append all content as-is while `inTemplate`.
6. **Strings**: start on `"` or `'`, append all content as-is until matching unescaped quote.
7. **Newline/carriage return**: if result doesn't end with space/semicolon/brace, append a single space. Advance.
8. **Space or tab**: append a single space only if result doesn't end with space AND both the previous char and `next` are word characters (`[a-zA-Z0-9_$]`) — i.e., spaces between identifiers/keywords are required. Advance.
9. **All other characters**: append as-is. Advance.
10. Trim result.

## Options
- `indent`: `2` (default) | `4` | `tab`
- `action`: `format` (default) | `minify`

## Examples

**Format minified function**

Input:
```
function greet(name,options){const greeting=options&&options.formal?"Dear "+name:"Hey "+name;if(options&&options.excited){return greeting+"!!";}return greeting+".";}
```

Output:
```javascript
function greet(name,
  options) {
  const greeting = options && options.formal ? "Dear " + name : "Hey " + name;
  if(options && options.excited) {
    return greeting + "!!";
  }
  return greeting + ".";
}
```

**Format class**

Input:
```
class EventEmitter{constructor(){this.events={};}on(event,listener){if(!this.events[event]){this.events[event]=[];}this.events[event].push(listener);return this;}}
```

Output:
```javascript
class EventEmitter {
  constructor() {
    this.events = {
    };
  }
  on(event,
    listener) {
    if(!this.events[event]) {
      this.events[event] = [
      ];
    }
    this.events[event].push(listener);
    return this;
  }
}
```

**Minify**

Input:
```javascript
function add(a, b) {
  // sum two numbers
  return a + b;
}
```

Output:
```
function add(a, b) { return a + b;}
```

**Template literal preserved**

Input:
```javascript
const msg = `Hello, ${name}! You have ${count} messages.`;
```

Output (formatted — template literal content unchanged):
```javascript
const msg = `Hello, ${name}! You have ${count} messages.`;
```

## Error Handling
- If the input is empty, return an empty string with a note: "No JavaScript input provided."
- This formatter is character-based and does not use an AST parser. It handles common patterns reliably but may produce imperfect indentation for highly complex or unusual syntax (e.g., complex destructuring, computed property names).
- If a formatting exception occurs, return the original input unchanged with an error message.
- Strings and template literal contents are always preserved exactly — no content inside quotes or backticks is modified.
- Comments are preserved in format mode and stripped in minify mode.
