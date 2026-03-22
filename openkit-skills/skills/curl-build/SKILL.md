---
name: curl-build
description: Build a cURL command from HTTP method, URL, headers, authentication, query parameters, and request body. Use when the user asks to create a curl command, generate a curl request, test an API endpoint with curl, or convert API call details into curl syntax.
---

# cURL Builder

Construct a valid, copy-paste-ready `curl` command from the user's API call parameters.

## Input
- `method` — HTTP method: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS (default: GET)
- `url` — target URL (required)
- `headers` — key-value pairs (e.g. `Content-Type: application/json`)
- `query_params` — key-value pairs appended to the URL
- `auth` — one of: none | bearer | basic | api-key
  - bearer: token string
  - basic: username and password
  - api-key: header name and value (default header: `X-API-Key`)
- `body_type` — none | json | form | raw (ignored for GET/HEAD)
- `body` — request body string
- `options` — flags: follow_redirects, insecure, verbose, silent, compressed, timeout (seconds)

## Output
A multi-line `curl` command with `\` line continuations for readability.

## Instructions
1. Start with `curl`.
2. If method is not GET, add `-X {METHOD}`.
3. Build the full URL: append query params as `?key=value&key=value`, URL-encoding keys and values.
4. Add the URL, shell-escaped (wrap in single quotes if it contains special characters).
5. Add each enabled header as `-H 'Key: Value'`.
6. Add auth:
   - bearer: `-H 'Authorization: Bearer {token}'`
   - basic: `-u 'username:password'`
   - api-key: `-H '{headerName}: {apiKeyValue}'`
7. Add body (skip for GET and HEAD):
   - json/raw: `-d '{body}'` (shell-escape the body)
   - form: `--data '{body}'`
8. Add option flags:
   - follow_redirects → `-L`
   - insecure → `-k`
   - verbose → `-v`
   - silent → `-s`
   - compressed → `--compressed`
   - timeout → `--connect-timeout {seconds}`
9. Join all parts with ` \\\n  ` for multi-line formatting.

### Shell escaping rule
- If a string contains no special shell characters (`[^a-zA-Z0-9@%+=:,./-]`), emit it as-is.
- Otherwise wrap in single quotes, replacing any `'` inside with `'\''`.

### Preset examples
- **GitHub API GET**: `GET https://api.github.com/users/octocat` with header `Accept: application/vnd.github.v3+json`
- **JSONPlaceholder POST**: `POST https://jsonplaceholder.typicode.com/posts` with JSON body `{"title":"foo","body":"bar","userId":1}`

## Options
All fields are optional except `url`. Unset fields are simply omitted from the command.

## Examples

**Input:** GET https://api.github.com/users/octocat, header Accept: application/vnd.github.v3+json

**Output:**
```bash
curl https://api.github.com/users/octocat \
  -H 'Accept: application/vnd.github.v3+json'
```

**Input:** POST https://api.example.com/posts, Content-Type: application/json, bearer token abc123, body `{"title":"hello"}`

**Output:**
```bash
curl -X POST https://api.example.com/posts \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer abc123' \
  -d '{"title":"hello"}'
```

**Input:** DELETE https://api.example.com/users/42, basic auth admin:secret, follow redirects, verbose

**Output:**
```bash
curl -X DELETE https://api.example.com/users/42 \
  -u 'admin:secret' \
  -L \
  -v
```

## Error Handling
- If no URL is provided, ask for the target URL before proceeding.
- If the method is GET or HEAD and a body is specified, include the body anyway but add a note that GET/HEAD requests typically do not have a body.
- If an unsupported HTTP method is given, use it as-is with `-X` since curl accepts custom methods.
- If the body contains single quotes and needs escaping, handle them with `'\''` substitution.
