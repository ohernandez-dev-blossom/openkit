---
name: openapi-validate
description: Validate an OpenAPI 3.x or Swagger 2.0 specification and report errors, warnings, and API summary. Use when the user asks to validate an OpenAPI spec, check a Swagger file for errors, inspect API endpoints and schemas, or review an API specification.
---

# OpenAPI Validator

Parse and validate an OpenAPI 3.x or Swagger 2.0 JSON specification. Return errors, warnings, and a structured summary of the API.

## Input
- A complete OpenAPI/Swagger specification as a JSON string
- Note: YAML specs must be converted to JSON first

## Output
1. **Validation status** — Valid or Invalid
2. **Errors** — blocking issues (must fix)
3. **Warnings** — best-practice suggestions
4. **API Info** — title, version, description
5. **Servers** — configured server URLs
6. **Endpoints** — method, path, summary, operationId, tags
7. **Schemas** — data model names, types, property counts
8. **Security Schemes** — authentication methods
9. **Stats** — path count, operation count, schema count, parameter count

## Instructions

### Step 1 — Parse JSON
If parsing fails, return: `Invalid JSON — paste a valid OpenAPI spec in JSON format. For YAML, convert to JSON first.`

### Step 2 — Detect version
- Check `spec.openapi` (3.x) or `spec.swagger` (2.x).
- Error if neither is present: `Missing 'openapi' or 'swagger' version field`.

### Step 3 — Validate info object
Required fields in `info`:
- `title` — error if missing
- `version` — error if missing
- `description` — warning if missing
- `contact` — warning if missing
- `license` — warning if missing

### Step 4 — Validate servers (OpenAPI 3.x)
- Warning if `servers` array is absent or empty: `No 'servers' defined. Clients may default to '/'`.
- Error if any server entry has no `url`.
- Collect all server URLs.

### Step 5 — Validate paths
- Error if `paths` object is missing.
- For each path:
  - Error if path does not start with `/`.
  - For each HTTP method (get, post, put, patch, delete, options, head, trace):
    - Count operation.
    - Warning if no `operationId`.
    - Warning if no `summary` and no `description`.
    - Error if `responses` is missing or empty.
    - For each parameter: error if missing `name` or `in`; error if `in=path` and not `required: true`.
    - Count parameters.
    - Collect endpoint: {method, path, summary, operationId, tags}.

### Step 6 — Collect schemas
- From `components.schemas` (OpenAPI 3.x) or `definitions` (Swagger 2.x).
- For each schema: collect {name, type, property count}.

### Step 7 — Collect security schemes
- From `components.securitySchemes` or `securityDefinitions`.
- Format: `{name} ({type}/{scheme if present})`.

### Step 8 — Report
- **Valid** if error count is 0.
- Present errors with a clear indicator.
- Present warnings with a separate indicator.
- Provide summary tables for endpoints and schemas.

## Options
- Input is the spec JSON string — no additional options.

## Examples

**Valid spec input (summary):**
- openapi: 3.0.3, info with title/version, servers array, paths with proper responses
- **Output:** `Valid — Pet Store API (v1.0.0). 2 paths, 3 operations, 2 schemas. No errors. 3 warnings (missing contact, license, operationId on one endpoint).`

**Invalid spec input:**
```json
{"openapi":"3.0.3","info":{"title":"Broken API"},"paths":{"/users":{"get":{"responses":{}}}}}
```
**Output:**
```
Invalid — Broken API

Errors (2):
  - Missing required 'info.version'
  - GET /users — Must have at least one response defined

Warnings (3):
  - Consider adding 'info.description' for better documentation
  - Consider adding 'info.contact' for API support information
  - GET /users — Missing 'operationId'
```

## Error Handling
- If the input is not valid JSON at all, immediately return the JSON parse error and note that YAML specs must be converted first.
- If `paths` is missing entirely, note it as an error but continue validating `info` and other fields.
- If the spec is Swagger 2.0 (has `swagger` field instead of `openapi`), validate it using the equivalent Swagger 2.0 rules (use `definitions` instead of `components.schemas`, etc.).
