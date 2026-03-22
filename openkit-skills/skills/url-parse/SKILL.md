---
name: url-parse
description: Parse a URL into its individual components — protocol, hostname, port, path, query parameters, and hash. Use when the user asks to parse a URL, break down a URL, inspect URL parts, extract query parameters, get the domain from a URL, decode URL parameters, analyze a URL structure, or split a URL into components.
---

# URL Parser

Parse a URL string into all its component parts using standard URL parsing rules. Extracts and URL-decodes each component, presenting them in a structured format.

## Input
- A URL string (absolute, with or without a scheme)

## Output
- All URL components broken out individually
- Query parameters as a key/value list with URL-decoded values
- A note on any components that are absent (empty/default)

## Instructions

1. **Validate the URL**: Attempt to parse it using standard URL parsing (equivalent to `new URL(input)`). The URL must have an absolute scheme (`http:`, `https:`, `ftp:`, etc.) to be parseable. If parsing fails, report an error.

2. **Extract components**:
   - **Protocol**: The scheme including the colon, e.g. `https:`.
   - **Hostname**: The domain or IP address, without port, e.g. `example.com`.
   - **Port**: Explicit port number if present in the URL; empty string if using the default port for the scheme.
   - **Pathname**: The path starting with `/`, e.g. `/path/to/page`. If absent, defaults to `/`.
   - **Search string**: The raw query string including the leading `?`, e.g. `?name=John&foo=bar`.
   - **Hash/Fragment**: The fragment including the leading `#`, e.g. `#section`. Empty if absent.
   - **Username**: Present only in URLs with embedded credentials, e.g. `user` in `https://user:pass@host`.
   - **Password**: Present only in URLs with embedded credentials.

3. **Parse query parameters**:
   - Split the query string on `&`.
   - For each pair, split on the first `=`.
   - URL-decode both the key and value using `decodeURIComponent`.
   - Present as a table with Key and Value columns.

4. **Present the result** in a clear structured format with labeled fields. Use `—` or `(none)` for absent optional fields (port, hash, username, password, query params).

5. **Reconstruct summary**: After the breakdown, show the full canonical URL as parsed (normalized form).

## Options
- None — the skill always extracts all components.

## Examples

**Input:**
```
https://example.com:8080/path/to/page?name=John+Doe&foo=bar%20baz#section
```

**Output:**

| Component | Value |
|-----------|-------|
| Protocol  | `https:` |
| Hostname  | `example.com` |
| Port      | `8080` |
| Pathname  | `/path/to/page` |
| Hash      | `#section` |
| Username  | — |
| Password  | — |

Query Parameters:

| Key  | Value (decoded) |
|------|-----------------|
| name | John Doe        |
| foo  | bar baz         |

---

**Input:**
```
https://api.example.com/v1/users?filter=active&page=2
```

| Component | Value |
|-----------|-------|
| Protocol  | `https:` |
| Hostname  | `api.example.com` |
| Port      | — (default 443) |
| Pathname  | `/v1/users` |
| Hash      | — |

Query Parameters:

| Key    | Value   |
|--------|---------|
| filter | active  |
| page   | 2       |

---

**Input (with credentials):**
```
ftp://admin:secret@files.example.com/uploads
```

| Component | Value |
|-----------|-------|
| Protocol  | `ftp:` |
| Hostname  | `files.example.com` |
| Port      | — |
| Pathname  | `/uploads` |
| Username  | `admin` |
| Password  | `secret` |

---

**Input (minimal URL):**
```
https://example.com
```

| Component | Value |
|-----------|-------|
| Protocol  | `https:` |
| Hostname  | `example.com` |
| Port      | — |
| Pathname  | `/` |
| Hash      | — |
| Query     | — |

## Error Handling
- **Missing scheme / relative URL**: `Error: Cannot parse relative URL "path/to/page". Please provide an absolute URL including the scheme (e.g., https://example.com/path).`
- **Completely invalid input**: `Error: Invalid URL — unable to parse. Check that the URL is well-formed.`
- **URL-encoded input that needs decoding first**: If the entire URL appears to be percent-encoded (e.g., `https%3A%2F%2F...`), decode it first with `decodeURIComponent`, then parse the result.
- **Empty input**: Prompt the user to provide a URL to parse.
- **Malformed query string** (e.g., `?&&=`): Parse as many valid key/value pairs as possible, skip malformed pairs, and note any that were skipped.
