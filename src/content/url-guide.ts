/**
 * URL Encoder/Decoder Tool Guide Content
 * Comprehensive developer guide for URL encoding and decoding
 */

import type { ToolGuideContent } from "./types";

export const urlGuideContent: ToolGuideContent = {
  toolName: "URL Encoder/Decoder",
  toolPath: "/url",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter URL or Query String",
      description: "Paste a URL, query parameters, or text containing special characters. The tool handles full URLs, partial query strings, or individual parameters."
    },
    {
      title: "Choose Encode or Decode",
      description: "Click 'Encode' to convert special characters to percent-encoded format (%20, %3D, etc.). Click 'Decode' to convert percent-encoded URLs back to readable text."
    },
    {
      title: "Select Encoding Mode",
      description: "Use Component encoding (default, for query parameters), Full URL encoding (entire URLs), or Custom encoding for specific character sets. Each mode handles special characters differently."
    },
    {
      title: "Copy Encoded Result",
      description: "Click copy to transfer the encoded/decoded URL to clipboard. Use for API requests, form submissions, or URL construction in your code."
    }
  ],

  introduction: {
    title: "What is URL Encoding?",
    content: `URL encoding (percent-encoding) converts special characters in URLs into a safe format that can be transmitted over the internet. URLs can only contain a limited set of ASCII characters - letters, digits, and a few special characters like hyphens and underscores. Any character outside this safe set must be percent-encoded as %XX where XX is the hexadecimal ASCII value. For example, a space becomes %20, an equals sign becomes %3D.

URL encoding is essential for web development because URLs frequently need to contain data with special characters: search queries ("coffee & tea"), email addresses ("user@example.com"), file paths ("/folder/file name.pdf"), or JSON data in query parameters. Without proper encoding, these characters break URLs, cause parsing errors, or create security vulnerabilities.

### How URL Encoding Works

URL encoding replaces unsafe characters with a percent sign (%) followed by two hexadecimal digits representing the character's ASCII code. Space becomes %20 (ASCII 32 in hex), ampersand (&) becomes %26 (ASCII 38), equals (=) becomes %3D (ASCII 61).

Some characters have special meaning in URLs and must always be encoded when used as data: ? (query start), & (parameter separator), = (key-value separator), # (fragment identifier), / (path separator). For example, to include a literal question mark in a query parameter value, encode it as %3F.

Different parts of URLs have different encoding rules. The scheme (http:), host (example.com), and path segments allow different characters than query parameters. This is why "encodeURIComponent" (for parameters) and "encodeURI" (for full URLs) produce different results.

### Why Developers Need URL Encoding

API request construction requires encoding query parameters that contain user input, special characters, or structured data. A search query "coffee & tea" must be encoded as "coffee%20%26%20tea" in the URL. Without encoding, the & would be interpreted as a parameter separator, breaking the query.

Form submissions with method="GET" automatically URL-encode form data in the query string. Understanding URL encoding helps debug why form data looks different in URLs than in the form (spaces become +, special characters become %XX).

OAuth and authentication flows pass tokens, state parameters, and redirect URLs in query strings. These often contain base64-encoded data with special characters (+, /, =) that must be URL-encoded to prevent interpretation as URL syntax.

Data serialization in URLs requires encoding JSON, XML, or other structured data passed as query parameters. Encoding ensures special characters in the data don't break URL parsing.

### Common URL Encoding Scenarios

**Search Queries:** User searches for "hello world" - space must be encoded as %20 or +. Search for "C++" - plus signs must be encoded as %2B to distinguish from space encoding.

**Email Parameters:** mailto links with subject and body: "mailto:user@example.com?subject=Hello%20World&body=Email%20content". Spaces and special characters in subject/body must be encoded.

**Path Parameters:** REST APIs with IDs or slugs: /api/products/my%20product%20name. Spaces in product names must be encoded for URL safety.

**OAuth Redirects:** redirect_uri=https%3A%2F%2Fexample.com%2Fcallback - the entire redirect URL is percent-encoded when passed as a parameter to another URL.

### URL Encoding vs Other Encodings

Base64 encoding creates a compact representation of binary data using A-Z, a-z, 0-9, +, /. URL encoding handles any character by converting to %XX format. Base64 is more space-efficient but its + and / characters must be URL-encoded when used in URLs (leading to Base64 URL-safe variant using - and _ instead).

HTML entity encoding uses &entity; format (&amp;, &lt;, &gt;) for displaying special characters in HTML. URL encoding uses %XX format for URLs. Don't confuse them - &amp; is HTML encoding, %26 is URL encoding for the same ampersand character.

URI encoding is the RFC 3986 standard name for percent-encoding. URL encoding is the colloquial term. They refer to the same process.

### Reserved vs Unreserved Characters

**Unreserved characters** (safe in URLs, no encoding needed): A-Z, a-z, 0-9, hyphen (-), underscore (_), tilde (~), period (.)

**Reserved characters** (special meaning in URLs, must be encoded when used as data): : / ? # [ ] @ ! $ & ' ( ) * + , ; =

**Always encoded:** Space, ", <, >, %, {, }, |, \\, ^, \`, and all non-ASCII characters (UTF-8 bytes).

Understanding these rules prevents over-encoding (encoding characters that don't need it) or under-encoding (missing characters that should be encoded).`,
  },

  useCases: [
    {
      title: "API Query Parameter Construction",
      description: "Build API request URLs with query parameters containing user input or special characters. Properly encode parameters to prevent parsing errors, injection attacks, or data corruption. Essential for REST API clients and search implementations.",
      example: `// Building API URLs with query parameters
// User search input: "coffee & tea"

// ❌ Wrong: Special characters not encoded
const wrongUrl = 'https://api.example.com/search?q=coffee & tea';
// Result: "coffee " becomes q parameter, "tea" becomes separate parameter
// API receives: q = "coffee ", tea = "" (malformed request)

// ✅ Correct: Encode query parameter
const query = encodeURIComponent('coffee & tea');
const correctUrl = \`https://api.example.com/search?q=\${query}\`;
// Result: https://api.example.com/search?q=coffee%20%26%20tea
// API receives: q = "coffee & tea" (correct)

// Complex query example:
const params = {
  search: 'user@example.com',
  filter: 'status=active',
  sort: 'created_at>2026-01-01'
};

// Encode each parameter value
const queryString = Object.entries(params)
  .map(([key, value]) => \`\${key}=\${encodeURIComponent(value)}\`)
  .join('&');

const url = \`https://api.example.com/users?\${queryString}\`;
// Result: /users?search=user%40example.com&filter=status%3Dactive&sort=created_at%3E2026-01-01

// Special cases:
// Plus sign: "C++" → "C%2B%2B" (not "C  ")
// Equals: "key=value" → "key%3Dvalue" (not interpreted as parameter)
// Ampersand: "A&B" → "A%26B" (not split into two parameters)`
    },
    {
      title: "OAuth and Authentication Flow URLs",
      description: "Encode redirect URLs, state parameters, and authorization parameters in OAuth flows. Ensure callback URLs and tokens are properly encoded to prevent authentication failures and security vulnerabilities.",
      example: `// OAuth authorization URL construction
// Callback URL contains query parameters

const redirectUri = 'https://myapp.com/callback?source=google&ref=homepage';
const state = 'abc123-random-state-xyz789';
const scope = 'openid profile email';

// Build authorization URL
const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth' +
  '?client_id=YOUR_CLIENT_ID' +
  '&redirect_uri=' + encodeURIComponent(redirectUri) +
  '&state=' + encodeURIComponent(state) +
  '&scope=' + encodeURIComponent(scope) +
  '&response_type=code';

// Result:
// redirect_uri=https%3A%2F%2Fmyapp.com%2Fcallback%3Fsource%3Dgoogle%26ref%3Dhomepage
// The entire callback URL is percent-encoded as a parameter value

// Why this matters:
// ❌ Without encoding: redirect_uri=https://myapp.com/callback?source=google
//    OAuth provider sees: redirect_uri = "https://myapp.com/callback"
//                         source = "google" (separate parameter)
//    Result: Redirect mismatch error

// ✅ With encoding: redirect_uri=https%3A%2F%2Fmyapp.com%2Fcallback%3Fsource%3Dgoogle
//    OAuth provider sees: redirect_uri = "https://myapp.com/callback?source=google"
//    Result: Successful authorization

// SAML response encoding:
const samlResponse = '<samlp:Response ...></samlp:Response>';
const encodedSaml = encodeURIComponent(samlResponse);
// XML brackets and colons must be encoded for URL safety`
    },
    {
      title: "Form Data and Search Query Encoding",
      description: "Handle form submissions with special characters, build search URLs, or construct mailto links with subject and body. URL encoding ensures form data is transmitted correctly in query strings.",
      example: `// Form submission with GET method
// HTML form:
<form action="/search" method="GET">
  <input name="q" value="hello world" />
  <input name="category" value="Food & Drink" />
</form>

// Submitted URL (automatically encoded by browser):
// /search?q=hello+world&category=Food+%26+Drink
// Note: Spaces can be + or %20, both are valid

// Manual construction:
const searchQuery = 'hello world';
const category = 'Food & Drink';
const url = \`/search?q=\${encodeURIComponent(searchQuery)}&category=\${encodeURIComponent(category)}\`;
// Result: /search?q=hello%20world&category=Food%20%26%20Drink

// Mailto links with encoded subject and body:
const email = 'support@example.com';
const subject = 'Question about Product XYZ';
const body = 'Hello,\\n\\nI have a question:\\nWhat is the price?\\n\\nThanks!';

const mailtoUrl = \`mailto:\${email}\` +
  \`?subject=\${encodeURIComponent(subject)}\` +
  \`&body=\${encodeURIComponent(body)}\`;

// Result:
// mailto:support@example.com?subject=Question%20about%20Product%20XYZ&body=Hello%2C%0A%0AI%20have%20a%20question%3A%0AWhat%20is%20the%20price%3F%0A%0AThanks!

// File download with special characters in filename:
const filename = 'Report (2026-02-01).pdf';
const downloadUrl = \`/api/download?file=\${encodeURIComponent(filename)}\`;
// Result: /api/download?file=Report%20(2026-02-01).pdf`
    },
    {
      title: "URL Decoding for Data Extraction",
      description: "Decode URL-encoded query parameters from incoming requests, parse encoded URLs from logs or analytics, or extract data from webhooks and callbacks. Essential for request processing and data analysis.",
      example: `// Decoding URL parameters from incoming request
// Incoming URL: /search?q=hello%20world&filter=price%3E100&category=Food%20%26%20Drink

// Manual decoding (typically handled by frameworks):
const urlParams = new URLSearchParams('?q=hello%20world&filter=price%3E100');
const query = decodeURIComponent(urlParams.get('q'));
// Result: "hello world"

const filter = decodeURIComponent(urlParams.get('filter'));
// Result: "price>100"

// Node.js with Express (automatic decoding):
app.get('/search', (req, res) => {
  // Express automatically decodes query parameters
  const query = req.query.q;  // "hello world" (already decoded)
  const filter = req.query.filter;  // "price>100" (already decoded)
});

// Decode URL from webhook callback:
// OAuth callback: /callback?code=abc123&state=return_url%3Dhttps%253A%252F%252Fexample.com%252Fdashboard

const stateParam = 'return_url%3Dhttps%253A%252F%252Fexample.com%252Fdashboard';
const decoded = decodeURIComponent(stateParam);
// Result: "return_url=https%3A%2F%2Fexample.com%2Fdashboard"

// Decode again to get the nested URL:
const decodedAgain = decodeURIComponent(decoded.split('=')[1]);
// Result: "https://example.com/dashboard"

// Double encoding occurs when URL parameters contain URLs
// Must decode twice to get original value

// Log analysis:
// Access log: "GET /search?q=user%40example.com HTTP/1.1"
const logQuery = 'user%40example.com';
const email = decodeURIComponent(logQuery);
// Result: "user@example.com"

// Decode URL-encoded JSON:
const encodedJson = '%7B%22name%22%3A%22John%22%2C%22age%22%3A30%7D';
const json = decodeURIComponent(encodedJson);
// Result: '{"name":"John","age":30}'
const data = JSON.parse(json);`
    }
  ],

  howToUse: {
    title: "How to Use This URL Encoder/Decoder Tool",
    content: `This URL encoder/decoder provides instant percent-encoding with multiple encoding modes for different use cases. All processing happens client-side for maximum performance and privacy.

### Basic URL Encoding

Paste a URL, query string, or text into the input field and click "Encode". The tool converts all special characters to percent-encoded format (%XX). Use this for encoding query parameter values, search queries, or form data.

Component encoding (default mode) uses encodeURIComponent() which encodes all characters except: A-Z, a-z, 0-9, hyphen (-), underscore (_), period (.), tilde (~). This is the safest encoding for query parameter values.

For example, "hello world" becomes "hello%20world", "user@example.com" becomes "user%40example.com", and "price>100" becomes "price%3E100".

### Basic URL Decoding

Paste a percent-encoded URL or string and click "Decode". The tool converts all %XX sequences back to their original characters. Use this to make encoded URLs human-readable or extract data from encoded parameters.

For example, "hello%20world" becomes "hello world", "user%40example.com" becomes "user@example.com", and "price%3E100" becomes "price>100".

Decoding fails gracefully on malformed input - if a sequence cannot be decoded (like %ZZ or incomplete %2), the original text is preserved and an error is shown.

### Encoding Modes

**Component Encoding (default):** Use for query parameter values. Encodes everything except A-Z, a-z, 0-9, - _ . ~. Safe for any parameter value.

Example: "Food & Drink" → "Food%20%26%20Drink"

**Full URL Encoding:** Use for encoding entire URLs that will be passed as parameter values (like OAuth redirect_uri). Preserves scheme (http://) but encodes special characters.

Example: "https://example.com/path?key=value" → "https%3A%2F%2Fexample.com%2Fpath%3Fkey%3Dvalue"

**Custom Encoding:** Encode only specific characters while preserving others. Useful for partial encoding scenarios or when you want control over which characters are encoded.

### Understanding Plus Signs and Spaces

Spaces can be encoded as %20 or + in URL query strings. Both are valid and mean the same thing in query parameters. Most modern APIs prefer %20 (percent-encoding) but + (plus sign) is still widely supported for backward compatibility.

When encoding the plus sign itself (like in "C++"), it must be encoded as %2B to distinguish it from space encoding. If you encode "C++" and get "C%20%20" back, the + was mistakenly treated as space during decoding.

### Double Encoding Detection

Double encoding occurs when already-encoded text gets encoded again. For example, "hello world" → "hello%20world" → "hello%2520world". The tool detects potential double encoding and warns you.

To decode double-encoded text, click Decode twice. First pass converts %2520 → %20, second pass converts %20 → space.

### Special Characters in Different URL Parts

**Scheme and host:** Don't encode (http://example.com stays as-is)

**Path segments:** Encode spaces and special characters (/path/my%20file.pdf)

**Query parameters:** Encode everything except safe characters (?q=hello%20world&filter=price%3E100)

**Fragment:** Encode like query parameters (#section%20name)

The tool's component mode handles query parameters correctly. For other parts, use custom encoding or manual construction.

### Keyboard Shortcuts

- **Ctrl+E / Cmd+E:** Encode input
- **Ctrl+D / Cmd+D:** Decode input
- **Ctrl+C / Cmd+C:** Copy output
- **Ctrl+Shift+C / Cmd+Shift+C:** Toggle encoding mode

### Common Encoding Mistakes

**Over-encoding:** Encoding safe characters unnecessarily. "hello" doesn't need encoding - it's already URL-safe. Only encode special characters.

**Under-encoding:** Missing characters that should be encoded. "price>100" must have > encoded as %3E, not left as literal >.

**Wrong encoding for context:** Using HTML encoding (&amp;) instead of URL encoding (%26) or vice versa.

**Double encoding:** Encoding already-encoded text. Check if your input is already encoded before encoding again.

**Encoding the entire URL:** Don't encode the scheme and host. Only encode path, query, and fragment as needed.

### Validation and Error Detection

The tool validates encoded output and warns about:
- Malformed percent sequences (%ZZ, %2, %)
- Double encoding detection (%2520 patterns)
- Invalid UTF-8 byte sequences
- Unescaped reserved characters in query values

These warnings help catch encoding errors before they cause API failures or security issues.`,
    steps: [
      {
        name: "Enter Text",
        text: "Paste a URL, query string, or text containing special characters. The tool accepts full URLs, partial strings, or individual parameters."
      },
      {
        name: "Choose Operation",
        text: "Click 'Encode' to convert special characters to percent-encoded format (%XX). Click 'Decode' to convert %XX sequences back to readable text."
      },
      {
        name: "Select Mode",
        text: "Use Component mode (query parameters), Full URL mode (entire URLs), or Custom mode (specific characters). Each handles encoding differently."
      },
      {
        name: "Copy Result",
        text: "Click Copy to transfer encoded/decoded URL to clipboard. Use in API requests, form submissions, or URL construction code."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between encodeURI and encodeURIComponent?",
      answer: "encodeURIComponent encodes all characters except A-Z, a-z, 0-9, - _ . ~ and is used for query parameter values. It encodes slashes (/), colons (:), and other URL syntax characters. encodeURI preserves URL structure (://) and is used for encoding entire URLs, but it doesn't encode characters with special meaning in URLs (?&#=). For query parameters, always use encodeURIComponent (Component mode in this tool)."
    },
    {
      question: "Why do spaces sometimes appear as %20 and sometimes as +?",
      answer: "Both %20 and + represent spaces in URL query strings and are interchangeable in that context. + is a legacy encoding from HTML forms (application/x-www-form-urlencoded). Modern best practice is to use %20 (percent-encoding) for consistency. When encoding the literal plus sign character (like in 'C++'), it must be encoded as %2B to distinguish it from space encoding."
    },
    {
      question: "How do I encode a full URL that's being passed as a parameter?",
      answer: "Use Full URL mode or encodeURIComponent in code. For example, if passing redirect_uri=https://example.com/callback as a parameter to another URL, the entire value must be encoded: redirect_uri=https%3A%2F%2Fexample.com%2Fcallback. This double-encoding is intentional - the parameter value is a URL that needs encoding so it doesn't interfere with the outer URL's syntax."
    },
    {
      question: "What is double encoding and how do I fix it?",
      answer: "Double encoding occurs when already-encoded text gets encoded again: 'hello world' → 'hello%20world' → 'hello%2520world'. This usually happens when encoding is applied twice by mistake in code. To fix, decode twice (or decode once if you catch it early). The tool warns when it detects potential double encoding patterns. Prevent by checking if text is already encoded before encoding again."
    },
    {
      question: "Can I encode non-English characters and emojis?",
      answer: "Yes. The tool handles Unicode (UTF-8) characters including Chinese (中文), Arabic (العربية), emoji (😀), and accented letters (café). Each Unicode character is converted to UTF-8 bytes, then each byte is percent-encoded. For example, '中' becomes '%E4%B8%AD' (3 bytes in UTF-8). This ensures international characters work correctly in URLs across all systems."
    },
    {
      question: "Why does my encoded URL still contain slashes and colons?",
      answer: "Different encoding modes handle URL syntax characters differently. Component mode encodes slashes (/) and colons (:) because they're unsafe in query parameter values. Full URL mode preserves them to maintain URL structure. If you see unencoded slashes/colons when you expected encoding, check your encoding mode. For query parameter values, use Component mode which encodes everything except truly safe characters."
    },
    {
      question: "How do I decode URLs from server logs or analytics?",
      answer: "Paste the encoded URL from logs and click Decode. Server logs often show encoded URLs like '/search?q=hello%20world&filter=price%3E100'. Decoding reveals the actual query: 'hello world' and 'price>100'. This helps understand user search queries, debug routing issues, or analyze traffic patterns. Some log formats may double-encode URLs - decode twice if needed."
    },
    {
      question: "Is my URL data private when using this tool?",
      answer: "Absolutely. All encoding and decoding happens entirely in your browser using JavaScript's built-in encodeURIComponent() and decodeURIComponent() functions. Your URLs never leave your device. No server uploads, no backend processing, no data transmission. Safe for API keys, OAuth URLs, sensitive queries, or any confidential URL data. Verify in browser DevTools Network tab - zero outbound requests."
    },
    {
      question: "Can I use this for encoding form data?",
      answer: "Yes, but modern browsers handle form encoding automatically. When using <form method='GET'>, the browser automatically URL-encodes field values in the query string. For programmatic form construction (fetch, axios), use Component mode to encode each parameter value, then join with & and =. Example: field1=value1&field2=encoded%20value."
    },
    {
      question: "What characters are safe in URLs without encoding?",
      answer: "Unreserved characters (safe without encoding): A-Z, a-z, 0-9, hyphen (-), underscore (_), period (.), tilde (~). Everything else should be encoded in query parameter values. Reserved characters with special meaning in URLs (must be encoded when used as data): : / ? # [ ] @ ! $ & ' ( ) * + , ; =. Always encode spaces, quotes, brackets, and non-ASCII characters."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your URL data never leaves your browser. This encoder/decoder operates entirely client-side using JavaScript's built-in encodeURIComponent() and decodeURIComponent() functions. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All URL encoding and decoding happens in your browser's JavaScript engine. URLs, queries, and parameters stay on your device.
- **No Server Uploads:** We don't have servers to process your URLs. The tool works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what you encode/decode, how often you use the tool, or any content-specific data.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your URL data.

This makes the tool safe for encoding sensitive URLs containing API keys, OAuth tokens, authentication parameters, or confidential query data. Use with confidence for production debugging, API development, or handling private URLs.

### Security Considerations for URL Encoding

Proper URL encoding prevents injection attacks. User input in URLs must be encoded to prevent attackers from injecting malicious characters that break URL parsing or exploit vulnerabilities. Never concatenate raw user input into URLs - always encode it first.

Open redirect vulnerabilities occur when URLs in redirect_uri or return_url parameters aren't validated. Encoding doesn't prevent open redirects - validation does. Always verify redirect URLs match allowed domains before following them.

Sensitive data in URLs is visible in browser history, server logs, proxy logs, and referrer headers. Never put passwords, API secrets, or confidential data in query parameters, even if encoded. Use POST request bodies or HTTP headers instead.`
  },

  stats: {
    "Encode Speed": "<5ms",
    "Max URL Size": "2KB",
    "Standards": "RFC 3986",
    "UTF-8 Support": "Full",
    "Server Uploads": "0"
  }
};
