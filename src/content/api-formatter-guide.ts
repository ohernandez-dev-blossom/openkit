/**
 * API Formatter Tool Guide Content
 * Comprehensive developer guide for API response formatting
 */

import type { ToolGuideContent } from "./types";

export const apiFormatterGuideContent: ToolGuideContent = {
  toolName: "API Formatter",
  toolPath: "/api-formatter",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste API Response",
      description: "Copy your API response from browser DevTools Network tab, Postman, curl output, or application logs and paste it into the input panel. The formatter handles JSON, XML, and plain text responses."
    },
    {
      title: "Select Format Type",
      description: "Choose the response format (JSON, XML, or text) or let the formatter auto-detect. The tool formats the response with proper indentation and syntax highlighting for readability."
    },
    {
      title: "View Status Code Details",
      description: "If your response includes an HTTP status code, the formatter displays detailed information about what the code means, its category (success, error, redirect), and common causes."
    },
    {
      title: "Copy or Export Result",
      description: "Click Copy to copy the formatted response to your clipboard, ready for debugging, documentation, or sharing with team members."
    }
  ],

  introduction: {
    title: "What is API Response Formatting?",
    content: `API response formatting is the process of transforming raw HTTP responses from web APIs into human-readable format with proper indentation, syntax highlighting, and structure visualization. Modern web applications make hundreds of API calls daily, and developers need to inspect, debug, and understand these responses quickly.

REST APIs return responses in various formats - primarily JSON (90% of modern APIs), XML (legacy SOAP and enterprise systems), or plain text (webhooks, CSV exports). These responses often come minified or compressed to reduce bandwidth, making them unreadable in raw form. API formatters parse these responses and present them in a structured, inspectable format.

### Why API Response Formatting Matters

API debugging is a daily task for web developers. When an API call fails or returns unexpected data, developers need to inspect the response structure immediately. Formatted responses reveal nested objects, array structures, error messages, and field types at a glance, dramatically reducing debugging time.

Integration testing requires validating API contracts - ensuring responses match expected schemas, contain required fields, and follow documented formats. Formatted responses make schema validation visual and obvious. Missing fields, type mismatches, or unexpected nesting become immediately apparent.

API documentation often includes example responses. Formatted API responses serve as accurate, real-world examples that supplement generated documentation. Teams can copy formatted responses directly into docs, ensuring examples stay current with actual API behavior.

### Key Features of API Formatters

**Auto-Detection:** Smart formatters detect response format automatically based on Content-Type headers or response structure, eliminating manual format selection for most use cases.

**Status Code Analysis:** HTTP status codes (200, 404, 500) carry critical meaning. Formatters explain status code categories (2xx success, 4xx client errors, 5xx server errors), common causes, and appropriate developer responses.

**Header Inspection:** Response headers contain vital metadata: caching directives, CORS policies, authentication challenges, rate limit information. Formatters parse and display headers in readable key-value format.

**Error Highlighting:** API errors often include error codes, messages, and debugging hints. Formatters highlight error structures, making it obvious why a request failed and how to fix it.

### Common API Response Scenarios

Developers use API formatters when debugging failed requests in production, analyzing third-party API integrations, documenting API behavior for team knowledge bases, comparing API responses across environments (dev/staging/prod), and teaching API concepts to junior developers through real response examples.

The formatter handles responses from any HTTP client - browser fetch(), axios, curl, Postman, Insomnia - providing a unified view of API data regardless of request tooling.`
  },

  useCases: [
    {
      title: "Debug Failed API Requests",
      description: "When API calls return errors, format the response to see error details, status codes, and debugging hints. Identify whether errors are client-side (400s) or server-side (500s).",
      example: `// Before: Minified error response
{"error":{"code":"INVALID_TOKEN","message":"Authentication token expired","details":{"expiredAt":"2024-02-01T10:00:00Z","renewUrl":"/auth/refresh"}}}

// After: Formatted for debugging
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Authentication token expired",
    "details": {
      "expiredAt": "2024-02-01T10:00:00Z",
      "renewUrl": "/auth/refresh"
    }
  }
}
// Status: 401 Unauthorized - Refresh token required`
    },
    {
      title: "Validate API Contract",
      description: "Format API responses during integration testing to verify they match expected schemas. Check for required fields, correct data types, and proper nesting structure.",
      example: `// Expected schema validation
{
  "data": {
    "user": {
      "id": 123,              // ✓ number
      "email": "user@example.com",  // ✓ string
      "roles": ["admin"],     // ✓ array
      "metadata": {           // ✓ nested object
        "lastLogin": "2024-02-01T08:00:00Z"
      }
    }
  },
  "meta": {
    "timestamp": "2024-02-01T10:00:00Z",
    "version": "v2"
  }
}`
    },
    {
      title: "Document Real API Behavior",
      description: "Copy formatted API responses into documentation to show real-world examples. More accurate than hand-written examples and stays current with actual API changes.",
      example: `// GET /api/products/123 - Example Response
{
  "product": {
    "id": "123",
    "name": "Wireless Mouse",
    "price": 29.99,
    "currency": "USD",
    "inStock": true,
    "variants": [
      { "color": "black", "sku": "MOUSE-BLK" },
      { "color": "white", "sku": "MOUSE-WHT" }
    ]
  }
}
// Status: 200 OK`
    },
    {
      title: "Compare Environments",
      description: "Format responses from dev, staging, and production APIs side-by-side to identify environment-specific differences, configuration issues, or data inconsistencies.",
      example: `// Production response (correct)
{
  "config": {
    "apiUrl": "https://api.example.com",
    "timeout": 5000,
    "retries": 3
  }
}

// Staging response (misconfigured)
{
  "config": {
    "apiUrl": "http://localhost:3000",  // ❌ Wrong URL
    "timeout": 30000,
    "retries": 1
  }
}`
    }
  ],

  howToUse: {
    title: "How to Use This API Formatter",
    content: `This API formatter provides instant client-side formatting with zero server uploads. All processing happens in your browser using JavaScript parsing, ensuring your API responses remain private and processing is instantaneous.

### Basic Formatting Workflow

Copy your API response from any source - browser DevTools Network tab (right-click → Copy Response), Postman response viewer, curl output, or application logs. Paste the response into the input panel.

Select the response format (JSON, XML, or text) or leave it on Auto-Detect. The formatter analyzes the response structure and applies appropriate formatting. If the response includes an HTTP status code in headers or a separate field, the formatter displays status code meaning and category.

The formatted response appears with proper indentation, syntax highlighting, and visual hierarchy. Error responses are highlighted with contextual information about what the status code means and common resolution steps.

### Advanced Features

**Status Code Lookup:** Enter an HTTP status code separately to see detailed information: code meaning (200 OK, 404 Not Found), category (success, client error, server error), and description of when this code is used.

**Header Parsing:** If you include response headers with the body, the formatter parses and displays them in readable format, highlighting important headers like Content-Type, Cache-Control, and X-RateLimit headers.

**Multi-Format Support:** The formatter handles JSON (most common), XML (SOAP APIs, legacy systems), and plain text responses. Auto-detection works for most cases, but manual format selection is available for edge cases.

**Response Comparison:** Open multiple browser tabs to format and compare responses from different API endpoints or environments side-by-side, identifying differences in structure or data.

### Best Practices

Always check HTTP status codes before debugging response bodies - many issues are immediately clear from 4xx or 5xx codes. Save formatted responses when documenting API integration issues for bug reports. Compare formatted responses across API versions when migrating to identify breaking changes. Format third-party API responses to understand their data structures before writing integration code.`,
    steps: [
      {
        name: "Paste API Response",
        text: "Copy your API response from DevTools, Postman, curl, or logs and paste it into the input panel."
      },
      {
        name: "Select Format",
        text: "Choose JSON, XML, or text format, or use Auto-Detect to let the formatter identify the response type automatically."
      },
      {
        name: "Review Status Code",
        text: "Check the HTTP status code analysis to understand if the response indicates success (2xx), client error (4xx), or server error (5xx)."
      },
      {
        name: "Copy Formatted Result",
        text: "Click Copy to copy the formatted response to clipboard, ready for debugging, documentation, or team sharing."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between 4xx and 5xx status codes?",
      answer: "4xx codes (400-499) indicate client errors - problems with the request you sent (bad syntax, missing auth, invalid data). These require fixing your request. 5xx codes (500-599) indicate server errors - problems on the API server side (crashes, timeouts, database errors). These require API provider fixes. 2xx codes (200-299) indicate success."
    },
    {
      question: "Can this formatter test live API endpoints?",
      answer: "Yes, this formatter includes a built-in API tester that sends HTTP requests to any endpoint. Enter a URL, select method (GET, POST), add headers and body if needed, then click Send. The formatter displays the response formatted with status code analysis. All requests happen from your browser with CORS considerations."
    },
    {
      question: "How do I format SOAP API responses?",
      answer: "SOAP APIs return XML responses. Paste the XML response, select XML format (or use Auto-Detect), and the formatter will structure the XML with proper indentation. SOAP envelopes, body elements, and nested data become clearly visible for debugging SOAP integration issues."
    },
    {
      question: "Why does my API response show CORS errors?",
      answer: "CORS (Cross-Origin Resource Sharing) errors occur when APIs don't allow browser-based requests from different origins. If testing APIs in this formatter, CORS errors indicate the API needs 'Access-Control-Allow-Origin' headers. Use server-side tools (curl, Postman native app) to bypass CORS, or ask the API provider to enable CORS for your domain."
    },
    {
      question: "Can I format GraphQL query responses?",
      answer: "Yes, GraphQL responses are JSON format. Paste the GraphQL response (which includes data, errors, and extensions fields), select JSON format, and the formatter displays the nested structure clearly. GraphQL error arrays and field-level errors become easy to debug with proper formatting."
    },
    {
      question: "Is my API response data private when using this tool?",
      answer: "Absolutely. All API response formatting happens entirely in your browser using client-side JavaScript. Your responses never leave your device or get sent to any servers. No uploads, no storage, no analytics tracking. Safe for production API responses, authentication tokens, or customer data."
    },
    {
      question: "How do I interpret rate limit headers?",
      answer: "Common rate limit headers include X-RateLimit-Limit (total requests allowed), X-RateLimit-Remaining (requests left), and X-RateLimit-Reset (when the limit resets, usually Unix timestamp). If you see 429 Too Many Requests status, check these headers to know when you can retry the request."
    },
    {
      question: "What does Content-Type header tell me?",
      answer: "Content-Type specifies the response format: application/json (JSON data), text/xml or application/xml (XML/SOAP), text/plain (plain text), text/html (HTML page). This header determines how clients parse the response. Mismatched Content-Type (JSON body with text/plain header) causes parsing errors."
    },
    {
      question: "Can I save formatted responses for later?",
      answer: "Yes, use the Export button to download formatted responses as .json, .xml, or .txt files. These files can be saved to your project for documentation, added to version control as test fixtures, or shared with team members for collaborative debugging."
    },
    {
      question: "How do I debug paginated API responses?",
      answer: "Paginated APIs include metadata about pagination: total count, page number, next/previous page links. Format the response to see these fields clearly (often in 'meta' or 'pagination' objects). Follow 'next' URLs to fetch subsequent pages, formatting each response to verify data continuity and completeness."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your API response data never leaves your browser. This formatter operates entirely client-side using JavaScript parsing in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All API response formatting happens in your browser's JavaScript engine. Your data stays on your device.
- **No Server Uploads:** We don't have servers to process API responses. The tool works completely offline after first load.
- **No Data Storage:** Your API responses are not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what API responses you format, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the formatter safe for sensitive use cases like formatting production API responses with user data, authentication tokens in headers, proprietary API structures, or any responses that must remain confidential. Use with confidence for debugging, security audits, or handling regulated data (HIPAA, GDPR, PCI-DSS).

### API Testing Security Note

When using the built-in API tester to send requests, all requests originate from your browser. Your authentication tokens and credentials are sent directly to the API endpoint you specify, never through our servers. Only test APIs you trust and never enter credentials for production systems without proper authorization.`
  },

  stats: {
    "Processing": "<100ms",
    "Formats": "3",
    "Status Codes": "50+",
    "Privacy": "100%"
  }
};
