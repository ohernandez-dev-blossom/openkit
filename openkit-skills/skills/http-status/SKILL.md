---
name: http-status
description: Look up HTTP status codes and their meanings. Use when the user asks what an HTTP status code means, asks about 404, 500, 301, 200, or any other status code, or asks to list HTTP response codes by category.
---

# HTTP Status Code Reference

Return the name, description, and category of any HTTP status code, or list codes by category.

## Input
- A status code number (e.g. `404`) or a partial name/description (e.g. "not found", "redirect")
- Optional category filter: `1xx`, `2xx`, `3xx`, `4xx`, `5xx`

## Output
- For a specific code: code number, name, description, and category
- For a search/list: matching codes with name and description

## Instructions
1. If a numeric code is given, look it up in the reference table below and return its entry.
2. If text is given, search code names and descriptions for matches and return all matches.
3. If a category filter is given (e.g. "4xx" or "client errors"), return all codes in that category.
4. Format each result as: `{code} {name} — {description}`.

### Complete reference table

**1xx Informational**
- 100 Continue — Initial part of request received, client should continue
- 101 Switching Protocols — Server is switching protocols as requested
- 102 Processing — Server has received and is processing the request
- 103 Early Hints — Used to return some response headers before final response

**2xx Success**
- 200 OK — Request succeeded
- 201 Created — Request succeeded and a new resource was created
- 202 Accepted — Request received but not yet acted upon
- 203 Non-Authoritative Information — Returned meta-information is from a local or third-party copy
- 204 No Content — No content to send, but headers may be useful
- 205 Reset Content — Tells the client to reset the document view
- 206 Partial Content — Only part of the resource is being delivered

**3xx Redirection**
- 300 Multiple Choices — Multiple options for the resource
- 301 Moved Permanently — Resource has been permanently moved to a new URL
- 302 Found — Resource temporarily resides under a different URL
- 303 See Other — Response can be found under a different URI
- 304 Not Modified — Resource has not been modified since last request
- 307 Temporary Redirect — Temporary redirect preserving the HTTP method
- 308 Permanent Redirect — Permanent redirect preserving the HTTP method

**4xx Client Errors**
- 400 Bad Request — Server cannot process the request due to client error
- 401 Unauthorized — Authentication is required and has failed or not been provided
- 402 Payment Required — Reserved for future use
- 403 Forbidden — Client does not have access rights to the content
- 404 Not Found — Server cannot find the requested resource
- 405 Method Not Allowed — Request method is not supported for the resource
- 406 Not Acceptable — No content matching the Accept headers
- 407 Proxy Authentication Required — Authentication with proxy is required
- 408 Request Timeout — Server timed out waiting for the request
- 409 Conflict — Request conflicts with the current state of the server
- 410 Gone — Content has been permanently deleted
- 411 Length Required — Content-Length header is required
- 412 Precondition Failed — Preconditions in headers were not met
- 413 Payload Too Large — Request entity is larger than server limits
- 414 URI Too Long — URI is longer than the server can interpret
- 415 Unsupported Media Type — Media format is not supported
- 416 Range Not Satisfiable — Range specified cannot be fulfilled
- 418 I'm a Teapot — The server is a teapot (Easter egg from 1998)
- 422 Unprocessable Entity — Request was well-formed but semantically incorrect
- 429 Too Many Requests — User has sent too many requests (rate limiting)
- 451 Unavailable For Legal Reasons — Resource is unavailable due to legal demands

**5xx Server Errors**
- 500 Internal Server Error — Server encountered an unexpected condition
- 501 Not Implemented — Server does not support the functionality required
- 502 Bad Gateway — Server received an invalid response from upstream server
- 503 Service Unavailable — Server is not ready to handle the request
- 504 Gateway Timeout — Server did not receive a timely response from upstream
- 505 HTTP Version Not Supported — HTTP version in the request is not supported

## Options
- `code` — specific status code to look up
- `search` — text to search in names and descriptions
- `category` — one of: 1xx, 2xx, 3xx, 4xx, 5xx

## Examples

**Input:** "what is 429?"
**Output:** `429 Too Many Requests — User has sent too many requests (rate limiting). Category: 4xx Client Error.`

**Input:** "list all 3xx codes"
**Output:** All seven 3xx entries formatted as a list.

**Input:** "what does 'gateway' mean?"
**Output:** `502 Bad Gateway` and `504 Gateway Timeout` with their descriptions.

## Error Handling
- If the code is not in the reference table, say it is not a standard HTTP status code and suggest the closest standard code if applicable.
- If the search returns no matches, say no codes match and suggest broadening the search.
