export const jsonSchemaGuideContent = `
JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It serves as a contract for your JSON data, defining the expected structure, types, and constraints.

## Why Use JSON Schema?

- **API Validation**: Ensure request/response bodies match expected formats
- **Documentation**: Self-documenting data structures
- **Code Generation**: Generate types, interfaces, and models from schemas
- **Testing**: Validate test data against expected schemas
- **IDE Support**: Get autocomplete and validation in editors

## Schema Drafts

| Draft | Year | Key Features |
|-------|------|-------------|
| Draft-04 | 2013 | Baseline, widely supported |
| Draft-07 | 2018 | \`if/then/else\`, \`readOnly\`, \`const\` |
| 2020-12 | 2020 | \`prefixItems\`, \`$dynamicRef\`, vocabularies |

## Format Detection

This tool automatically detects common string formats:

- **date-time**: ISO 8601 timestamps (\`2026-01-15T10:30:00Z\`)
- **date**: Calendar dates (\`2026-01-15\`)
- **email**: Email addresses (\`user@example.com\`)
- **uri**: URLs (\`https://example.com\`)
- **uuid**: UUID strings (\`550e8400-e29b-41d4-a716-446655440000\`)
- **ipv4**: IPv4 addresses (\`192.168.1.1\`)

## Example

Given this JSON:
\`\`\`json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 28
}
\`\`\`

The generated schema (Draft-07):
\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "integer" }
  },
  "required": ["name", "email", "age"]
}
\`\`\`
`;
