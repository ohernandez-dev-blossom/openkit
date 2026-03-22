import { BlogPost } from "./types";

export const jsonFormattingGuide: BlogPost = {
  slug: "json-formatting-guide-api-development",
  title: "JSON Formatting for API Development: Beyond Pretty Print",
  description:
    "Master JSON formatting, validation, and transformation for API development. Learn minification, path queries, schema validation, and practical workflows.",
  publishedAt: "2026-02-06",
  author: "OpenKit Team",
  readingTime: 7,
  category: "guides",
  tags: ["json", "api", "formatting", "validation", "developer-tools", "rest-api"],
  relatedTools: ["/json", "/json-path", "/json-csv", "/json-yaml", "/json-to-ts", "/api-formatter"],
  published: true,
  content: `
Every developer can pretty-print JSON. But effective JSON handling in API development goes far beyond adding whitespace. It's about validation, transformation, debugging nested structures, and moving data between formats efficiently.

## The Basics Done Right

### Pretty Print vs Minify: When to Use Each

**Pretty print** (with indentation) is for reading. Use it when:
- Debugging API responses in development
- Writing configuration files
- Documenting API payloads in docs or tickets
- Reviewing webhook payloads

**Minified** (no whitespace) is for transmission. Use it when:
- Sending data over the network (smaller payload = faster)
- Storing JSON in databases (saves storage)
- Embedding JSON in URLs or headers

The size difference matters more than you think. A typical API response can shrink 30-40% when minified. On a high-traffic API, that's real bandwidth savings.

### Indentation: Tabs vs Spaces (2 vs 4)

This isn't just aesthetics — it affects readability in different contexts:

- **2 spaces:** Best for deeply nested JSON (API responses often nest 4-5 levels deep). Keeps lines shorter.
- **4 spaces:** Best for configuration files where nesting is shallow and readability matters more.
- **Tabs:** Rare in JSON. Most tools and APIs default to spaces.

Pick one for your team and enforce it. Inconsistent formatting in committed JSON files creates noisy diffs.

## Validating JSON: More Than Syntax

### Syntax Validation

The first check: is this even valid JSON? Common syntax errors:

- **Trailing commas:** \`{"a": 1, "b": 2,}\` — Valid in JavaScript, invalid in JSON
- **Single quotes:** \`{'key': 'value'}\` — JSON requires double quotes
- **Unquoted keys:** \`{key: "value"}\` — JSON requires quoted keys
- **Comments:** \`// this is a comment\` — JSON doesn't support comments (use JSONC or JSON5 if you need them)
- **NaN/Infinity:** Not valid JSON values. Use \`null\` or string representations.

A good JSON formatter catches these instantly and tells you the exact line and character where parsing failed.

### Structural Validation

Syntax is correct, but is the structure what you expect? This is where JSON Path queries become essential.

Given a nested API response:

\`\`\`json
{
  "data": {
    "users": [
      { "id": 1, "name": "Alice", "roles": ["admin", "editor"] },
      { "id": 2, "name": "Bob", "roles": ["viewer"] }
    ],
    "pagination": { "page": 1, "total": 47 }
  }
}
\`\`\`

You can query specific paths:

- \`$.data.users[0].name\` → \`"Alice"\`
- \`$.data.users[*].roles\` → All roles arrays
- \`$.data.pagination.total\` → \`47\`

This is faster than scrolling through a 500-line API response looking for one field.

## Practical Workflows

### Workflow 1: API Response Debugging

You get a 500 error from an API. The response body is a minified JSON blob. Here's the workflow:

1. **Paste and format** the raw response to make it readable
2. **Validate** — Is it even valid JSON? Sometimes error responses are malformed
3. **Query with JSON Path** — Jump straight to the error field: \`$.error.message\` or \`$.errors[0].detail\`
4. **Compare** with a known-good response using a diff tool

### Workflow 2: Converting Between Formats

Your backend returns JSON but the data team needs CSV. Your config is in YAML but the deployment needs JSON. These conversions happen constantly:

- **JSON to CSV** — Flatten nested objects, export for spreadsheets or data analysis
- **JSON to YAML** — For Kubernetes configs, Docker Compose files, CI/CD pipelines
- **JSON to TypeScript** — Generate type definitions from API responses instead of writing them manually

Each of these conversions has edge cases. Arrays of different-typed objects don't flatten cleanly to CSV. Nested JSON with arrays creates YAML that's hard to read. Having reliable conversion tools eliminates guesswork.

### Workflow 3: Mock Data Generation

Building a frontend before the API is ready? You need realistic mock data:

1. Start with a real API response structure (or define one)
2. Format it cleanly as your template
3. Modify values to create test scenarios (empty arrays, null fields, max-length strings)
4. Use your formatted JSON as mock data in development

## JSON in Different Contexts

### API Headers

JSON in headers (like JWT payloads) is Base64-encoded. To debug:
1. Decode the Base64 string
2. Format the resulting JSON
3. Inspect the claims

### Database Fields

Many databases store JSON in text columns. When you query these, the result is often a single-line string. Formatting it is the first step in debugging data issues.

### Environment Variables

Storing JSON in env vars (common for configuration) requires careful escaping:

\`\`\`bash
# This breaks:
CONFIG={"key": "value"}

# This works:
CONFIG='{"key": "value"}'
\`\`\`

### Webhook Payloads

Incoming webhooks from services like Stripe, GitHub, or Twilio send JSON payloads that can be deeply nested. Formatting + JSON Path is the fastest way to find the field you need.

## Performance Considerations

### Large JSON Files

Formatting a 1MB JSON file in the browser is fine. Formatting a 100MB JSON file will freeze your tab if the tool isn't optimized.

Client-side tools that use streaming parsers or Web Workers handle large files without blocking the UI. Server-side tools handle it on their end but add network transfer time.

For files over 10MB, consider using command-line tools (\`jq\`, \`python -m json.tool\`) or a tool that explicitly supports large files.

### JSON vs JSON Lines (JSONL)

If you're working with log files or streaming data, you might encounter JSONL — one JSON object per line, no wrapping array:

\`\`\`
{"event": "login", "user": "alice", "ts": 1706745600}
{"event": "purchase", "user": "bob", "ts": 1706745601}
{"event": "logout", "user": "alice", "ts": 1706745700}
\`\`\`

Standard JSON formatters choke on this because it's not valid JSON as a whole. You need to process it line-by-line.

## The Toolchain That Works

A complete JSON workflow for API development needs:

1. **Formatter/Validator** — Format, minify, validate syntax
2. **JSON Path** — Query specific fields in large responses
3. **Diff tool** — Compare two JSON objects structurally
4. **Format converters** — JSON to CSV, YAML, TypeScript types
5. **Base64 decoder** — For JWTs and encoded payloads

Having all of these in one place, running client-side, means you can debug API issues without context-switching between tabs or worrying about sensitive data hitting external servers.
`,
};
