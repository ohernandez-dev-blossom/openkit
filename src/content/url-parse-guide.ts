/**
 * URL Parser Tool Guide Content
 * Comprehensive developer guide for URL parsing and manipulation
 */

import type { ToolGuideContent } from "./types";

export const urlParseGuideContent: ToolGuideContent = {
  toolName: "URL Parser",
  toolPath: "/url-parse",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your URL",
      description: "Copy any URL from your browser, API documentation, or code and paste it into the URL input field. The parser automatically breaks it down into all components including protocol, host, path, query parameters, and hash fragments."
    },
    {
      title: "View Parsed Components",
      description: "Instantly see the URL separated into its constituent parts: protocol (https:), domain (example.com), port (8080), path (/api/users), query parameters (id=123), and hash (#section). Click any component to copy it individually."
    },
    {
      title: "Edit Individual Parts",
      description: "Switch to Build mode to edit any URL component independently. Modify the protocol, change the hostname, add or remove query parameters, update the path, or adjust port numbers. Each part can be edited separately without affecting others."
    },
    {
      title: "Rebuild or Export URL",
      description: "Click Build URL to reconstruct the complete URL from your edited components. The rebuilt URL appears in the input field, ready to copy and use in your code, API tests, or documentation. Use Encode/Decode buttons for URL encoding operations."
    }
  ],

  introduction: {
    title: "What is URL Structure?",
    content: `A URL (Uniform Resource Locator) is the addressing system used to locate resources on the internet and within networks. URLs are fundamental to web development—every HTTP request, API call, hyperlink, and resource reference uses URL syntax to specify exactly what resource to access and how to access it.

URLs follow a standardized structure defined by RFC 3986 that breaks down into distinct components. Understanding these components is essential for web development, API integration, debugging network requests, and building web applications. Modern web frameworks, REST APIs, single-page applications, and microservices all rely heavily on URL parsing and manipulation.

### Anatomy of a URL

A complete URL contains up to eight distinct parts, though not all are required for every URL. The standard format is:

\`protocol://username:password@hostname:port/path?query#fragment\`

Each component serves a specific purpose in resource identification and retrieval. The protocol specifies how to access the resource (https, http, ftp, ws). The hostname identifies the server (example.com or IP address). The path locates the specific resource on that server (/api/users/123). Query parameters pass data to the server (id=123&sort=name). The fragment identifies a specific section within the resource (#section).

### Key Characteristics of URLs

- **Standardized Format:** URLs follow RFC 3986 specifications, ensuring consistent parsing across all browsers, servers, and programming languages worldwide.
- **Hierarchical Structure:** The path component uses forward slashes to create a hierarchical namespace, similar to file system directories.
- **Case Sensitivity:** The protocol and hostname are case-insensitive (HTTP:// equals http://), but the path, query parameters, and fragment are typically case-sensitive depending on server implementation.
- **Encoding Requirements:** Special characters must be percent-encoded (spaces become %20, # becomes %23) to avoid ambiguity in URL parsing.

### Why URL Parsing Matters for Developers

URL parsing is a daily task in modern web development. Frontend developers parse URLs to extract route parameters for client-side routing in React Router, Vue Router, or Next.js. Backend developers parse incoming request URLs to determine which controller and action to invoke, extract resource IDs from paths, and validate query parameter formats.

API integration requires parsing URLs to construct endpoint requests, append query parameters for filtering or pagination, extract authentication tokens from callbacks, and debug malformed URLs in third-party API responses. Single-page applications manipulate URLs without page reloads, updating browser history and deep linking to specific application states.

Deep linking in mobile apps, OAuth redirect URL validation, webhook endpoint parsing, analytics tracking parameter extraction, and SEO canonical URL generation all depend on accurate URL parsing. Understanding URL structure prevents common bugs like double-encoding parameters, incorrect protocol handling, and query parameter parsing errors.

### URL Components Explained

**Protocol (Scheme):** Specifies the communication protocol—https: for secure web traffic, http: for unencrypted web traffic, ws: or wss: for WebSockets, ftp: for file transfer, mailto: for email links. The protocol determines how the browser or client communicates with the server.

**Authentication (User Info):** Optional username and password embedded in the URL (username:password@). Deprecated for security reasons—modern applications use Authorization headers instead. Still seen in some legacy systems and internal network resources.

**Hostname (Domain):** The server's domain name (api.example.com) or IP address (192.168.1.100). Can include subdomains (www, api, cdn) that route to different servers or services. DNS resolves domain names to IP addresses for actual network communication.

**Port:** TCP port number for the connection. Default ports are implied (80 for HTTP, 443 for HTTPS) and typically omitted. Custom ports (8080, 3000, 5000) must be explicitly specified for development servers or non-standard deployments.

**Path:** Hierarchical resource identifier on the server (/api/v2/users/123). Resembles file system paths with forward slash separators. REST APIs use path segments to represent resource hierarchy (collections, specific resources, nested resources).

**Query String:** Key-value parameters after the ? symbol (id=123&filter=active&page=2). Used for filtering, sorting, pagination, search terms, and passing non-hierarchical data. Multiple parameters separated by & symbols. Values must be URL-encoded if they contain special characters.

**Fragment (Hash):** The portion after # symbol identifying a specific section within the resource (#introduction). Originally used for anchor links to page sections, now heavily used by single-page applications for client-side routing. The fragment is not sent to the server—it's processed entirely by the browser.

### URL vs URI vs URN

A URI (Uniform Resource Identifier) is the broad term for resource identifiers. URLs are a subset of URIs that specify the location and access method for a resource. URNs (Uniform Resource Names) identify resources by name without specifying location, like ISBN numbers for books. In practice, most web developers use "URL" for web addresses and "URI" for abstract resource identifiers in APIs and specifications.`
  },

  useCases: [
    {
      title: "Query Parameter Extraction",
      description: "Extract specific query parameters from URLs for analytics tracking, A/B testing, campaign attribution, or feature flags. Parse URLs from user navigation to determine which marketing campaign drove traffic, extract search terms, or read configuration parameters passed via URL.",
      example: `// Original URL
https://example.com/products?category=electronics&sort=price&filter=sale&utm_source=google

// Extracted parameters
category: electronics
sort: price
filter: sale
utm_source: google

// Use in code
const url = new URL(window.location);
const category = url.searchParams.get('category');`
    },
    {
      title: "REST API Endpoint Construction",
      description: "Build REST API URLs programmatically by combining base URLs with path segments, resource IDs, and query parameters. Validate that constructed URLs have correct protocol, proper encoding, and expected structure before making requests. Debug malformed API URLs that cause 404 or 400 errors.",
      example: `// Build API URL from components
Protocol: https:
Host: api.example.com
Path: /v2/users/123/orders
Query: status=completed&limit=50

// Reconstructed URL
https://api.example.com/v2/users/123/orders?status=completed&limit=50

// Validate structure before fetch()
fetch(constructedURL)`
    },
    {
      title: "OAuth Redirect URL Validation",
      description: "Parse OAuth callback URLs to extract authorization codes, state parameters, and error messages. Validate that redirect URLs match registered callback URLs exactly, preventing open redirect vulnerabilities. Extract tokens from URL fragments in implicit OAuth flows.",
      example: `// OAuth callback URL
https://app.example.com/callback?code=abc123&state=xyz789

// Extracted OAuth parameters
code: abc123 (exchange for access token)
state: xyz789 (verify matches original)

// Validate redirect_uri matches whitelist
const redirectHost = new URL(redirectUri).hostname;`
    },
    {
      title: "Deep Link Parsing",
      description: "Parse custom URL schemes and universal links for mobile app deep linking. Extract parameters from deep links to navigate users to specific app screens, pre-fill forms, or apply promotional codes. Debug deep link formatting issues that prevent proper app routing.",
      example: `// Mobile deep link
myapp://products/123?referral=friend&discount=SAVE20

// Parsed components
Scheme: myapp (custom protocol)
Path: /products/123
Query: referral=friend, discount=SAVE20

// Navigate to product screen with discount applied`
    }
  ],

  howToUse: {
    title: "How to Use This URL Parser",
    content: `This URL parser provides instant, client-side URL parsing and building with zero server uploads. All processing happens in your browser using JavaScript's native URL API, ensuring your URLs (which may contain sensitive parameters or tokens) remain completely private.

### Parse Mode - Break Down URLs

Paste any URL into the input field to see it automatically parsed into all components. The parser displays protocol, hostname, port (if non-standard), path, query parameters (as individual key-value pairs), hash/fragment, and authentication credentials (username/password if present, though rare in modern URLs).

Every component is displayed separately with click-to-copy functionality. Click the copy button next to any component to copy just that part—perfect for extracting just the hostname, or copying a specific query parameter value without manually selecting text.

### Build Mode - Construct URLs

Switch to Build mode to edit URL components individually. Modify the protocol (change http: to https:), update the hostname, add or change the port, edit the path, and manage query parameters. Each field is editable independently, letting you experiment with URL variations without manually typing the full URL.

Add query parameters with the "Add Parameter" button, creating new key-value pairs. Edit existing parameter keys or values, or remove parameters you don't need. The query string rebuilds automatically as you add or remove parameters, handling URL encoding and & separators correctly.

### Encode and Decode Operations

Use the Encode button to URL-encode the entire URL, converting special characters to percent-encoded format (%20 for space, %23 for #, etc.). This is useful when you need to pass a URL as a query parameter value to another URL (double-encoded URLs).

The Decode button reverses encoding, converting percent-encoded characters back to readable form. Helpful when debugging encoded URLs from logs or API responses that are hard to read due to encoding.

### Validation Feedback

Invalid URLs trigger a warning indicator showing "Invalid URL format". The parser validates URL structure using the browser's native URL parser—the same validation used by fetch(), XMLHttpRequest, and anchor tag href attributes. Fix syntax errors (missing protocol, malformed hostnames) and the warning clears automatically.

### Authentication Components

If a URL includes username and password (https://user:pass@example.com), they're displayed in the Authentication section. Passwords are masked with bullet characters for privacy but can still be copied. Note that embedding credentials in URLs is deprecated for security reasons—modern apps use Authorization headers instead.`,
    steps: [
      {
        name: "Paste URL",
        text: "Copy any URL from your browser, code, or documentation and paste it into the URL input field at the top."
      },
      {
        name: "View Parsed Components",
        text: "The tool automatically breaks down the URL into protocol, host, port, path, query parameters, and hash. Each component is displayed separately."
      },
      {
        name: "Click to Copy Parts",
        text: "Click the copy button next to any component to copy just that part to your clipboard. No need to manually select text."
      },
      {
        name: "Edit and Rebuild",
        text: "Switch to Build mode to edit components individually. Modify any part, add or remove query parameters, then click Build URL to reconstruct the complete URL."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between a URL, URI, and URN?",
      answer: "A URI (Uniform Resource Identifier) is the broad term for any identifier for a resource. URLs are a specific type of URI that includes the location and access method (https://example.com/page). URNs are URIs that identify resources by name without specifying location (like ISBN:0-486-27557-4 for a book). In practice, web developers primarily use URLs for web addresses and APIs. When specs say 'URI', they usually mean URL in the context of web development. All URLs are URIs, but not all URIs are URLs."
    },
    {
      question: "When do I need to URL-encode characters?",
      answer: "URL-encode characters that have special meaning in URLs or aren't allowed in URL syntax. Always encode: spaces (%20 or +), #, ?, &, =, /, :, @, and non-ASCII characters. Encoding prevents these characters from being misinterpreted as URL delimiters. Example: 'hello world' becomes 'hello%20world'. Most programming languages have built-in URL encoding functions (encodeURIComponent in JavaScript, urllib.parse.quote in Python). When in doubt, encode—over-encoding is safer than under-encoding, which can break URLs."
    },
    {
      question: "What are query strings and how do they work?",
      answer: "Query strings are key-value pairs appended to URLs after a ? symbol to pass data to servers. Format: ?key1=value1&key2=value2. Used for filtering (status=active), pagination (page=2), search terms (q=javascript), sorting (sort=date), or any non-hierarchical parameters. The server receives these parameters and can use them to customize the response. Unlike path segments, query parameter order doesn't matter—?a=1&b=2 equals ?b=2&a=1. Values containing special characters must be URL-encoded."
    },
    {
      question: "What is the URL fragment/hash and how is it used?",
      answer: "The fragment is everything after the # symbol in a URL (example.com#section). Originally designed for anchor links to jump to specific page sections, it's now heavily used for client-side routing in single-page applications (SPAs). Crucially, the fragment is never sent to the server—browsers process it entirely client-side. SPAs like React Router use fragments (or the History API) to update the URL without page reloads. Traditional anchor links (<a href='#top'>) use fragments to scroll to elements with matching IDs."
    },
    {
      question: "Why do some URLs have ports and others don't?",
      answer: "Ports specify which TCP port the server listens on. Default ports are omitted: HTTP uses port 80, HTTPS uses port 443. When you see https://example.com, it's implicitly using port 443. Non-standard ports must be explicit: http://localhost:3000 for development servers, https://example.com:8080 for custom configurations. Browsers automatically add default ports if omitted. Including the default port (https://example.com:443) is valid but redundant. Custom ports are common in development but rare in production where standard ports are used."
    },
    {
      question: "How do I safely validate redirect URLs to prevent open redirects?",
      answer: "Parse the redirect URL and check that the hostname matches your whitelist of allowed domains. Example: const url = new URL(redirectUrl); if (allowedHosts.includes(url.hostname)) { redirect(url); }. Never redirect to user-supplied URLs without validation—attackers can use open redirects for phishing. Validate the protocol (only allow https:), hostname (whitelist known domains), and reject data: or javascript: schemes. Use URL parsing to extract the hostname reliably rather than string manipulation which can be bypassed."
    },
    {
      question: "What's the difference between absolute and relative URLs?",
      answer: "Absolute URLs include the full address with protocol and hostname: https://example.com/page. Relative URLs omit the protocol and hostname: /page or ../other. Relative URLs are resolved against the current page's base URL by the browser. In APIs and backend code, always use absolute URLs to avoid ambiguity. In HTML, relative URLs are common for same-site links (/about, /contact). Use the URL constructor to resolve relative URLs: new URL('/page', 'https://example.com') returns absolute URL."
    },
    {
      question: "How do subdomains work in URLs?",
      answer: "Subdomains are prefixes to the main domain: www.example.com (www is subdomain), api.example.com (api is subdomain). They can route to different servers or applications while sharing the root domain. DNS records map each subdomain to potentially different IP addresses. Cookies can be scoped to subdomains. In multi-tenant applications, subdomains often identify tenants (tenant1.example.com). When parsing URLs, extract the full hostname, not just the root domain, to distinguish between subdomains."
    },
    {
      question: "Is my URL data private when using this tool?",
      answer: "Absolutely. All URL parsing happens entirely in your browser using JavaScript's native URL API built into the browser. Your URLs never leave your device or get sent to any servers. There are no backend calls, no data storage, and no logging of your URLs. This is critical because URLs often contain sensitive data: authentication tokens, session IDs, API keys in query parameters, or private resource identifiers. You can verify privacy by opening browser DevTools Network tab—zero outbound requests containing your URL data."
    },
    {
      question: "Can I parse URLs with custom protocols or schemes?",
      answer: "Yes, this parser handles custom URL schemes like myapp://path, slack://channel, or custom:// protocols used in mobile deep linking. The URL API supports any valid scheme format. Custom schemes follow the same structure as standard URLs (protocol://host/path?query#fragment) but the protocol determines how the system handles the URL. Browsers and operating systems register handlers for custom schemes to open specific applications. Parse custom schemes the same way as standard URLs to extract components."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your URL data never leaves your browser. This parser operates entirely client-side using JavaScript's native URL API built into your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All URL parsing and building happens in your browser's JavaScript engine using the standard URL constructor. Your data stays on your device.
- **No Server Uploads:** We don't have servers to process URLs. The tool works completely offline after first load.
- **No Data Storage:** Your URLs are not saved, logged, or stored anywhere. Refresh the page and they're gone (unless you save them locally).
- **No Analytics Tracking:** We don't track what URLs you parse, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Open browser DevTools and check the Network tab—you'll see zero outbound requests containing your URL data.

This makes the parser safe for sensitive use cases like parsing OAuth redirect URLs containing authorization codes, debugging API endpoints with authentication tokens in query parameters, analyzing webhook URLs with secret parameters, validating deep links with sensitive user data, or any URL parsing that must remain confidential. Use with confidence for production debugging, security testing, or handling regulated data (HIPAA, GDPR, PCI-DSS).

### Security Best Practices

When working with URLs in your applications, avoid embedding sensitive data like passwords, API keys, or tokens in URLs when possible—use HTTP headers instead. Always validate and sanitize user-supplied URLs before redirecting to prevent open redirect vulnerabilities. Use URL parsing (not regex or string manipulation) to validate URL structure reliably. Prefer HTTPS (encrypted) over HTTP for any URLs handling sensitive data.`
  },

  stats: {
    "URL Parts": "8",
    "Parse Speed": "<1ms",
    "Encoding": "RFC 3986",
    "Query Params": "Unlimited",
    "Server Uploads": "0"
  }
};
