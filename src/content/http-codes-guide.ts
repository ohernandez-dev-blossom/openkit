/**
 * HTTP Status Codes Tool Guide Content
 * Comprehensive developer guide for HTTP response codes
 */

import type { ToolGuideContent } from "./types";

export const httpCodesGuideContent: ToolGuideContent = {
  toolName: "HTTP Status Codes Reference",
  toolPath: "/http-codes",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Search by Code or Name",
      description: "Type any HTTP status code number (404, 500, 200) or error name ('Not Found', 'Internal Server Error') to instantly find the code, official name, and detailed description."
    },
    {
      title: "Filter by Category",
      description: "Click category buttons to view only 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), or 5xx (Server Error) codes. Organized by RFC standard categories."
    },
    {
      title: "Copy Status Code",
      description: "Click the copy icon next to any code to copy the numeric value to clipboard. Perfect for adding status codes to API responses, error handlers, or documentation."
    },
    {
      title: "Browse All Codes",
      description: "Scroll through the complete reference of standard HTTP codes with descriptions. Each entry includes the numeric code, official name, and practical explanation for developers."
    }
  ],

  introduction: {
    title: "What are HTTP Status Codes?",
    content: `HTTP status codes are three-digit numeric responses returned by web servers to indicate the result of a client's request. Every HTTP response includes a status code that tells the client whether the request succeeded, failed, was redirected, or requires additional action. Understanding HTTP status codes is essential for API development, debugging web applications, implementing proper error handling, and ensuring robust client-server communication.

HTTP status codes are defined by RFC 7231 and other HTTP specification documents. They are divided into five categories based on the first digit: **1xx Informational** (request received, continuing process), **2xx Success** (request was successfully received and processed), **3xx Redirection** (further action needed to complete request), **4xx Client Error** (request contains bad syntax or cannot be fulfilled), and **5xx Server Error** (server failed to fulfill a valid request).

### Why HTTP Status Codes Matter

Proper HTTP status code usage is critical for API design and web development. APIs must return the correct status code to communicate outcomes to clients: 200 OK for successful requests, 201 Created for resource creation, 404 Not Found for missing resources, 400 Bad Request for invalid input, 401 Unauthorized for authentication failures, and 500 Internal Server Error for unexpected failures.

Search engines rely on status codes for crawling and indexing. 404 indicates removed content (drop from index), 301 Moved Permanently signals a permanent redirect (transfer SEO value to new URL), 302 Found is a temporary redirect (keep original URL in index), and 410 Gone means content is permanently deleted (stronger than 404 for SEO). Incorrect codes confuse crawlers and hurt rankings.

Front-end applications use status codes for error handling logic. A 401 response triggers user re-authentication, 429 Too Many Requests implements rate limiting backoff, 503 Service Unavailable triggers retry with exponential backoff, and 422 Unprocessable Entity displays validation errors to users. Without correct codes, clients cannot implement appropriate error recovery.

### Common HTTP Status Codes Explained

**200 OK** is the standard success response. Use for GET requests that return data, POST requests that process without creating resources, PUT/PATCH updates, or any successful operation where more specific 2xx codes don't apply. Most API responses are 200.

**201 Created** indicates successful resource creation. Use for POST requests that create new resources (users, posts, orders). Include a Location header with the new resource URL: 'Location: /api/users/123'. REST APIs should use 201 instead of 200 for creation endpoints.

**204 No Content** means success but no response body. Use for DELETE operations, PUT updates where returning updated data is unnecessary, or any successful operation where the client doesn't need response content. Reduces bandwidth for operations that don't require data back.

**400 Bad Request** indicates malformed or invalid client requests. Use for invalid JSON syntax, missing required fields, type errors (string instead of number), or any request the server cannot parse. Return error details in response body to help clients fix issues.

**401 Unauthorized** means authentication is required or failed. Use when the request lacks credentials, tokens are expired, or authentication fails. Include WWW-Authenticate header with authentication challenge. Despite the name, 401 is for *authentication* (who you are), not authorization.

**403 Forbidden** means authenticated but not authorized. Use when the user is logged in but lacks permissions for the requested resource or action. For example, a regular user trying to access admin endpoints. 403 is for *authorization* (what you can do), not authentication.

**404 Not Found** means the requested resource doesn't exist. Use for invalid URLs, deleted resources, or IDs that don't exist in the database. Don't use 404 for authorization failures - that leaks information about resource existence. Use 403 or 404 consistently for security.

**500 Internal Server Error** indicates unexpected server failures. Use for unhandled exceptions, database connection failures, or any error that isn't the client's fault. Never expose stack traces or sensitive error details in production. Log details server-side and return generic error messages.

### HTTP Status Code Best Practices

Always return the most specific status code that matches the situation. Use 201 for creation, not generic 200. Use 422 for validation errors, not generic 400. Clients rely on specific codes for proper error handling and retry logic.

Include descriptive error messages in response bodies for 4xx and 5xx errors. Status codes tell clients *what* went wrong, error messages explain *why* and *how to fix it*. Example: 400 Bad Request with body: {"error": "Missing required field: email"}.

Never use 200 OK for error responses with error objects in the body. Some APIs return {\"status\": \"error\", \"message\": \"failed\"} with 200 status - this breaks HTTP semantics and confuses client error handling. Use appropriate 4xx or 5xx codes for errors.

### Status Codes for RESTful APIs

REST APIs should follow HTTP semantics strictly:
- **GET:** 200 OK (success), 404 Not Found (doesn't exist)
- **POST:** 201 Created (new resource), 200 OK (processed), 400 Bad Request (invalid), 409 Conflict (duplicate)
- **PUT:** 200 OK (updated), 204 No Content (updated), 404 Not Found (doesn't exist), 400 Bad Request (invalid)
- **PATCH:** 200 OK (updated), 204 No Content (updated), 400 Bad Request (invalid)
- **DELETE:** 204 No Content (deleted), 200 OK (deleted with info), 404 Not Found (already gone or never existed)

Consistent status code usage makes APIs intuitive and predictable for developers.`
  },

  useCases: [
    {
      title: "API Response Status Implementation",
      description: "Return appropriate HTTP status codes in REST API endpoints to communicate success, errors, and edge cases. Proper codes enable clients to implement correct error handling, retries, and user feedback without parsing response bodies.",
      example: `// Express.js API with proper status codes
app.post('/api/users', async (req, res) => {
  // Validation error
  if (!req.body.email) {
    return res.status(400).json({
      error: 'Missing required field: email'
    });
  }

  // Duplicate resource
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({
      error: 'User already exists'
    });
  }

  // Success: created
  const user = await User.create(req.body);
  res.status(201)
    .location(\`/api/users/\${user.id}\`)
    .json(user);
});

// GET endpoint
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }
  res.status(200).json(user);
});`
    },
    {
      title: "Client-Side Error Handling",
      description: "Handle different HTTP status codes in front-end applications to provide appropriate user feedback, trigger authentication flows, implement retry logic, or display validation errors. Status codes drive conditional client behavior.",
      example: `// React/Fetch API error handling
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  // Handle different status codes
  switch (response.status) {
    case 201:
      // Success: created
      const user = await response.json();
      showSuccessMessage('User created successfully');
      return user;

    case 400:
      // Validation error
      const errors = await response.json();
      showValidationErrors(errors);
      return null;

    case 401:
      // Not authenticated
      redirectToLogin();
      return null;

    case 409:
      // Duplicate
      showErrorMessage('User already exists');
      return null;

    case 429:
      // Rate limited
      showErrorMessage('Too many requests. Try again later.');
      return null;

    case 500:
      // Server error
      showErrorMessage('Server error. Please try again.');
      logErrorToService(response);
      return null;

    default:
      // Unexpected
      showErrorMessage('Unexpected error occurred');
      return null;
  }
}`
    },
    {
      title: "HTTP Status Code Testing",
      description: "Write integration tests that verify API endpoints return correct HTTP status codes for various scenarios: success cases, validation failures, authentication errors, and edge cases. Status code testing ensures API contract compliance.",
      example: `// Jest/Supertest API testing
describe('POST /api/users', () => {
  it('returns 201 Created on success', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('returns 400 Bad Request for missing email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('email');
  });

  it('returns 409 Conflict for duplicate email', async () => {
    await createUser({ email: 'test@example.com' });

    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test2' });

    expect(response.status).toBe(409);
  });

  it('returns 401 Unauthorized without auth token', async () => {
    const response = await request(app)
      .get('/api/users/me');

    expect(response.status).toBe(401);
  });
});`
    },
    {
      title: "SEO and Crawler-Friendly Redirects",
      description: "Use correct redirect status codes (301 vs 302 vs 307) to guide search engine crawlers. 301 Moved Permanently transfers SEO value to new URLs, 302 Found is temporary (keeps original in index), and 404/410 signals content removal.",
      example: `// Express.js redirect handling for SEO
app.get('/old-product-page', (req, res) => {
  // Permanent redirect: transfers PageRank/SEO value
  res.redirect(301, '/new-product-page');
});

app.get('/temporary-maintenance', (req, res) => {
  // Temporary redirect: keeps original URL in index
  res.redirect(302, '/maintenance');
});

// Removed content
app.get('/deleted-article', (req, res) => {
  // 410 Gone: stronger signal than 404 for permanently removed content
  res.status(410).send('Article permanently removed');
});

// Canonical URL enforcement
app.get('/product', (req, res) => {
  // 301 redirect non-canonical URLs to canonical
  if (req.hostname !== 'www.example.com') {
    return res.redirect(301, 'https://www.example.com/product');
  }
  res.send('Product page');
});

// Sitemap 404 handling
app.get('/sitemap.xml', (req, res) => {
  if (!sitemapExists()) {
    // 404 tells crawlers sitemap doesn't exist (expected)
    return res.status(404).send('Sitemap not found');
  }
  res.type('application/xml').send(generateSitemap());
});`
    }
  ],

  howToUse: {
    title: "How to Use This HTTP Status Codes Reference",
    content: `This HTTP status codes reference provides instant lookup of all standard HTTP response codes with descriptions, official names, and practical guidance for developers. The interface is optimized for quick searching during debugging, API development, or code review.

### Searching for Status Codes

Use the search field to find codes by number, name, or description keyword. Type "404" to find Not Found, "auth" to find authentication-related codes (401, 407), "redirect" to find 3xx codes, or "server error" to find 5xx codes. Search is instant and case-insensitive, matching across all code attributes.

### Category Filtering

Click category buttons to view only codes in that category: **1xx Informational** for provisional responses during request processing, **2xx Success** for successful operations, **3xx Redirection** for redirects and caching, **4xx Client Error** for client-side mistakes or invalid requests, **5xx Server Error** for server failures. Categories follow RFC standard organization.

### Copying Status Codes

Click the copy icon next to any code to copy its numeric value to clipboard. Use this when writing API response code, configuring web servers, adding status codes to test assertions, or documenting API behavior. The tool provides one-click access to standard codes without memorizing numbers.

### Understanding Status Code Categories

**1xx codes** are rare in typical web development. 101 Switching Protocols is used for WebSocket upgrades. Most developers never directly implement 1xx codes - they are sent by underlying HTTP servers during connection setup.

**2xx codes** indicate success. Use 200 for general success, 201 for resource creation, 204 for successful operations with no response body, and 206 for partial content (video streaming, range requests). Always use the most specific 2xx code that matches your use case.

**3xx codes** handle redirects and caching. 301 is permanent redirect (SEO value transfers), 302 is temporary redirect (keep original URL), 304 Not Modified enables browser caching, and 307/308 are redirects that preserve HTTP method (POST stays POST). Choose carefully for SEO and caching behavior.

**4xx codes** indicate client errors. 400 is generic bad request, 401 means not authenticated, 403 means authenticated but forbidden, 404 means not found, 409 is resource conflict, 422 is validation failure, and 429 is rate limit exceeded. Return descriptive error messages in response body.

**5xx codes** indicate server errors. 500 is generic server error, 502 is bad gateway (upstream server error), 503 is service unavailable (temporary outage), and 504 is gateway timeout. Never expose stack traces in production 5xx responses.

### Best Practices

Reference this tool when implementing new API endpoints to choose appropriate status codes for success and error cases. Use it during debugging to understand what status codes mean in server logs or browser DevTools. Consult it during code review to verify teammates are using HTTP semantics correctly. Keep it open while writing API documentation to include accurate status codes in endpoint specs.`,
    steps: [
      {
        name: "Search or Filter Codes",
        text: "Use the search field to find specific codes by number or keyword, or click category filters for 1xx, 2xx, 3xx, 4xx, or 5xx codes.",
      },
      {
        name: "Read Code Description",
        text: "Review the official name and practical description for each code. Understand when to use it and what it communicates to clients.",
      },
      {
        name: "Copy Status Code",
        text: "Click the copy icon to copy the numeric code to clipboard. Use it in API responses, test assertions, or web server configurations.",
      },
      {
        name: "Implement in Code",
        text: "Apply the status code in your API endpoints, error handlers, or HTTP response logic. Include descriptive error messages in response bodies.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between 401 Unauthorized and 403 Forbidden?",
      answer: "401 Unauthorized means the request requires authentication that is missing or failed - the user is not logged in or provided invalid credentials. 403 Forbidden means the user is authenticated but lacks permission for the requested resource - they are logged in but not authorized. Use 401 when asking for credentials, 403 when denying access to authenticated users."
    },
    {
      question: "Should I use 200 OK or 201 Created for POST requests?",
      answer: "Use 201 Created when a POST request successfully creates a new resource. Include a Location header with the new resource URL. Use 200 OK for POST requests that process data but don't create resources (like search or calculations). REST APIs should prefer 201 for creation to follow HTTP semantics strictly."
    },
    {
      question: "When should I use 204 No Content instead of 200 OK?",
      answer: "Use 204 No Content for successful operations where the client doesn't need response data: DELETE operations (resource deleted, nothing to return), PUT updates where returning updated data is unnecessary, or any operation where success itself is the only information needed. 204 saves bandwidth by omitting response body. Use 200 if clients expect response data."
    },
    {
      question: "What's the difference between 400, 422, and 500 errors?",
      answer: "400 Bad Request is for malformed requests the server cannot parse (invalid JSON, wrong content type, missing required headers). 422 Unprocessable Entity is for syntactically correct but semantically invalid requests (validation failures like invalid email format, out-of-range values). 500 Internal Server Error is for unexpected server failures, not client mistakes. Use 400 for parse errors, 422 for validation errors."
    },
    {
      question: "Should I use 301 or 302 for redirects?",
      answer: "Use 301 Moved Permanently when the redirect is permanent and you want search engines to transfer SEO value to the new URL (old product URL to new one, domain migration). Use 302 Found for temporary redirects where you want search engines to keep the original URL indexed (temporary maintenance page, A/B testing). 301 changes bookmarks and cached URLs, 302 preserves them."
    },
    {
      question: "What HTTP code should I return when a user is not logged in?",
      answer: "Return 401 Unauthorized when authentication is required but missing or invalid. Include a WWW-Authenticate header with the authentication scheme (Bearer for tokens, Basic for basic auth). The client should prompt for login or redirect to authentication page. Don't return 403 - that's for authenticated but unauthorized users."
    },
    {
      question: "Is 404 Not Found or 403 Forbidden better for access control?",
      answer: "It depends on your security policy. 404 hides resource existence (attackers can't enumerate valid IDs), but inconsistent 404s leak information. 403 is honest but reveals resource existence. Best practice: use 403 consistently for authorization failures on known resources, 404 for nonexistent resources. Don't return 403 only for sensitive resources - that leaks sensitivity information."
    },
    {
      question: "When should I use 409 Conflict?",
      answer: "Use 409 Conflict when the request conflicts with the current state of the server: duplicate resource creation (email already registered, username taken), concurrent edit conflicts (two users edited same resource), business logic violations (can't delete resource with dependencies), or version mismatches (optimistic locking failure). Return details about the conflict in response body so clients can resolve it."
    },
    {
      question: "What's the difference between 502, 503, and 504 errors?",
      answer: "502 Bad Gateway means the server acting as gateway/proxy received an invalid response from the upstream server (backend server returned malformed response or crashed). 503 Service Unavailable means the server is temporarily unable to handle requests (overloaded, maintenance, intentional shutdown). 504 Gateway Timeout means the gateway/proxy didn't receive a timely response from upstream (backend too slow or not responding)."
    },
    {
      question: "Should I expose stack traces in 500 error responses?",
      answer: "Never expose stack traces or detailed error information in production 500 responses - they leak implementation details attackers can exploit (framework versions, file paths, database structure). Return generic error messages to clients: 'Internal Server Error' or 'Something went wrong'. Log full error details (stack trace, request context, user info) server-side for debugging. Development environments can show detailed errors."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This HTTP status codes reference operates entirely client-side in your browser. No search queries, status code lookups, or usage information is transmitted to any servers. All filtering and searching happens locally using JavaScript.

### Privacy Guarantees

- **100% Client-Side Processing:** All searching, filtering, and code lookups happen in your browser. No network requests with your search terms.
- **No Server Uploads:** We have no backend servers to process searches. The tool works completely offline after initial page load.
- **No Data Storage:** Your search queries and viewed codes are not saved, logged, or transmitted anywhere. Refresh the page and search history is cleared.
- **No Analytics Tracking:** We don't track which codes you search for, what categories you filter by, or any usage patterns.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab to verify zero search data transmission.

Safe for looking up status codes in confidential projects, debugging production APIs, or researching codes for security-sensitive implementations. Use with confidence for enterprise development, compliance projects, or any work requiring privacy.`
  },

  stats: {
    "Total Codes": "40+",
    "Categories": "5",
    "Search Speed": "<10ms",
    "RFC Compliant": "100%"
  }
};
