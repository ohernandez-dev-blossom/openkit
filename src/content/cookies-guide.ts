/**
 * Cookie Parser Tool Guide Content
 * Comprehensive developer guide for HTTP cookie analysis
 */

import type { ToolGuideContent } from "./types";

export const cookiesGuideContent: ToolGuideContent = {
  toolName: "Cookie Parser",
  toolPath: "/cookies",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Cookie Header",
      description: "Copy the Cookie header from browser DevTools Network tab or server logs and paste it into the input field. The parser handles both document.cookie format and Set-Cookie header format."
    },
    {
      title: "View Parsed Cookies",
      description: "See all cookies parsed into name-value pairs with attributes like Domain, Path, Expires, HttpOnly, Secure, and SameSite displayed clearly for analysis and debugging."
    },
    {
      title: "Inspect Cookie Attributes",
      description: "Check security flags (HttpOnly prevents JavaScript access, Secure requires HTTPS, SameSite prevents CSRF) and expiration times to verify correct cookie configuration."
    },
    {
      title: "Debug Cookie Issues",
      description: "Identify missing security flags, incorrect domains, expired cookies, or path conflicts. Use insights to fix authentication bugs, session issues, or CSRF vulnerabilities."
    }
  ],

  introduction: {
    title: "What are HTTP Cookies?",
    content: `HTTP cookies are small pieces of data stored by web browsers and sent with every HTTP request to the same domain. Cookies enable session management, user authentication, personalization, and tracking in web applications. Understanding cookie structure, attributes, and security flags is essential for implementing authentication systems, debugging login issues, and protecting against common web vulnerabilities like session hijacking and CSRF attacks.

Cookies consist of a name-value pair and optional attributes that control behavior: **Domain** specifies which hosts receive the cookie, **Path** limits the cookie to specific URL paths, **Expires/Max-Age** sets when the cookie is deleted, **Secure** requires HTTPS transmission, **HttpOnly** prevents JavaScript access, and **SameSite** controls cross-site request behavior for CSRF protection.

### Why Cookie Parsing Matters

Developers debugging authentication issues need to inspect cookies to verify session tokens are set correctly, check expiration times, and confirm security flags. Common problems include: cookies not being sent (wrong Domain or Path), premature expiration (incorrect Expires attribute), JavaScript cannot read auth tokens (HttpOnly flag set), or cookies work in dev but fail in production (missing Secure flag).

Cookie parsers decode the Cookie header string into structured data, making it easy to spot misconfigurations. Instead of manually parsing 'sessionid=abc123; userId=456; token=xyz789' to find specific cookies, parsers extract each name-value pair with attributes for quick inspection.

### Cookie Security Best Practices

**HttpOnly flag** prevents JavaScript from accessing cookies via document.cookie. Essential for session tokens and authentication cookies to defend against XSS attacks. If an attacker injects malicious JavaScript, they cannot steal HttpOnly cookies. Always set HttpOnly on auth cookies unless the client-side JavaScript specifically needs access.

**Secure flag** ensures cookies are only transmitted over HTTPS, never plain HTTP. Without Secure, cookies are sent in cleartext over unencrypted connections where attackers can intercept them (session hijacking). Production applications must use Secure flag on all cookies, especially authentication tokens.

**SameSite attribute** controls whether cookies are sent with cross-site requests, defending against CSRF attacks. **SameSite=Strict** never sends cookies on cross-site requests (most secure but breaks legitimate flows like OAuth redirects). **SameSite=Lax** sends cookies on safe cross-site requests (GET navigation) but not risky ones (POST forms) - balances security and usability. **SameSite=None** sends cookies everywhere (requires Secure flag) - only use when cross-site cookies are absolutely necessary (payment gateways, embeds).

### Cookie Attributes Explained

**Domain attribute** controls which hosts receive the cookie. If omitted, cookie is sent only to the exact host that set it. Setting Domain=.example.com sends the cookie to example.com and all subdomains (api.example.com, www.example.com). Be careful: overly broad domains create security risks if one subdomain is compromised.

**Path attribute** restricts cookies to specific URL paths. Path=/admin sends the cookie only to /admin/* URLs, not / or /api. Default is the path of the URL that set the cookie. Use Path to isolate cookies between application sections or prevent cookies from leaking to unrelated parts of your site.

**Expires/Max-Age** sets cookie lifetime. **Expires** uses an absolute date (Expires=Wed, 21 Oct 2025 07:28:00 GMT), **Max-Age** uses seconds from now (Max-Age=3600 for 1 hour). Without either, cookies are session cookies (deleted when browser closes). For persistent login ('Remember Me'), set Expires/Max-Age to weeks or months. For security-sensitive tokens, use short Max-Age (hours or days).

### Common Cookie Problems

**Cookie not sent by browser:** Check Domain (must match or be parent of request URL), Path (request URL must start with cookie's Path), Expires (cookie may be expired), or Secure flag (cookie requires HTTPS but request is HTTP). Browser DevTools Application/Storage tab shows why cookies aren't sent.

**CSRF attacks despite having auth cookies:** Missing SameSite attribute. Modern browsers default to SameSite=Lax, but old implementations don't. Always explicitly set SameSite=Lax or Strict on auth cookies to prevent CSRF.

**Session persists after logout:** Frontend calls logout API but cookie isn't cleared. Server must send Set-Cookie with Max-Age=0 or Expires=past-date to delete the cookie. Or use client-side document.cookie with expired date. Verify cookie disappears in DevTools.

**Cookies work in dev but not production:** Dev uses HTTP, production uses HTTPS. Cookies set with Secure flag in production cannot be sent in dev over HTTP. Either remove Secure in dev (risky, don't forget to re-add) or use HTTPS in dev (better approach).`
  },

  useCases: [
    {
      title: "Debug Authentication Cookie Issues",
      description: "Parse session cookies to verify authentication tokens are set with correct security flags, expiration times, and domain/path attributes. Identify why cookies aren't being sent or received correctly during login flows.",
      example: `// Example session cookie header
Set-Cookie: sessionid=38afes7a8; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=86400

// Parse to verify:
// ✓ HttpOnly: JavaScript cannot steal it (XSS protection)
// ✓ Secure: Only sent over HTTPS (no interception)
// ✓ SameSite=Lax: CSRF protection
// ✓ Max-Age=86400: Expires in 24 hours
// ✓ Path=/: Sent to all paths

// Common issues to check:
// ✗ Missing HttpOnly: sessionid=abc123; Path=/
//   → Vulnerable to XSS, attacker can read via document.cookie
//
// ✗ Missing Secure in production:
//   → Session token sent over HTTP, can be intercepted
//
// ✗ SameSite not set:
//   → Vulnerable to CSRF attacks
//
// ✗ Domain too broad: Domain=.example.com
//   → Sent to all subdomains, compromise of any subdomain leaks token`
    },
    {
      title: "Inspect Third-Party Tracking Cookies",
      description: "Analyze tracking cookies from analytics, advertising, or social media widgets. Understand what data is being collected, which domains set cookies, and how long they persist. Essential for GDPR compliance and privacy audits.",
      example: `// Tracking cookies from Google Analytics
_ga=GA1.2.123456789.1234567890; Domain=.example.com; Expires=2 years
_gid=GA1.2.987654321.9876543210; Domain=.example.com; Expires=24 hours
_gat=1; Domain=.example.com; Expires=1 minute

// Facebook tracking cookie
_fbp=fb.1.1234567890123.1234567890; Domain=.example.com; Expires=3 months

// Parse to understand:
// - Which third parties are tracking users
// - How long tracking cookies persist
// - What domains have access to tracking data
// - Whether cookies are SameSite=None (cross-site tracking)

// For GDPR compliance, verify:
// ✓ Cookie consent collected before setting
// ✓ Users can opt-out/delete tracking cookies
// ✓ Privacy policy documents all tracking cookies
// ✓ Third-party cookies comply with user preferences

// Use cookie parser to audit:
// 1. Open site in browser
// 2. Copy all cookies from DevTools
// 3. Parse to identify third-party domains
// 4. Document for privacy policy`
    },
    {
      title: "Test Cookie-Based Feature Flags",
      description: "Developers use cookies to enable/disable features for specific users or test groups. Parse feature flag cookies to verify they are set correctly, understand which features are enabled, and debug why features don't appear as expected.",
      example: `// Feature flag cookies for A/B testing
feature_new_ui=enabled; Path=/; Max-Age=2592000
experiment_checkout_flow=variant_b; Path=/checkout; Max-Age=604800
beta_features=dark_mode,ai_assist; Path=/; Max-Age=31536000

// Parse to verify:
// - feature_new_ui: enabled for 30 days, all paths
// - experiment_checkout_flow: only on /checkout paths, 7 days
// - beta_features: comma-separated list, 1 year persistence

// Example implementation:
function isFeatureEnabled(cookieString, featureName) {
  const cookies = parseCookies(cookieString);
  return cookies[featureName] === 'enabled';
}

// Debug feature visibility:
// 1. User reports feature not showing
// 2. Ask for document.cookie value
// 3. Parse cookies to check feature flag
// 4. Verify cookie exists, not expired, correct path

// Common issues:
// ✗ Cookie set on wrong path (feature_admin=enabled; Path=/admin)
//   → User on /dashboard doesn't see feature
// ✗ Cookie expired (Max-Age too short)
//   → Feature disappears after timeout
// ✗ Cookie domain mismatch (set on www. but accessed on api.)
//   → Subdomain doesn't receive cookie`
    },
    {
      title: "Validate Set-Cookie Headers in API Responses",
      description: "Test API endpoints that set authentication or session cookies. Parse Set-Cookie headers to ensure cookies have correct attributes for production security: Secure, HttpOnly, SameSite, and appropriate expiration.",
      example: `// API response setting auth cookie
HTTP/1.1 200 OK
Set-Cookie: auth_token=jwt_xyz789; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=3600

// Parse to validate:
// ✓ HttpOnly: Prevents XSS
// ✓ Secure: Requires HTTPS
// ✓ SameSite=Strict: Best CSRF protection
// ✓ Max-Age=3600: 1 hour (reasonable for auth)

// Security checklist:
const validateAuthCookie = (setCookieHeader) => {
  const parsed = parseSetCookie(setCookieHeader);

  const checks = {
    hasHttpOnly: parsed.includes('HttpOnly'),
    hasSecure: parsed.includes('Secure'),
    hasSameSite: parsed.includes('SameSite'),
    reasonableExpiry: parsed.maxAge <= 86400 // Max 24h
  };

  if (!checks.hasHttpOnly) {
    console.error('⚠️ Missing HttpOnly - vulnerable to XSS');
  }
  if (!checks.hasSecure) {
    console.error('⚠️ Missing Secure - can be intercepted');
  }
  if (!checks.hasSameSite) {
    console.error('⚠️ Missing SameSite - vulnerable to CSRF');
  }

  return Object.values(checks).every(v => v);
};

// Integration test example:
test('POST /api/login sets secure cookie', async () => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  const setCookie = response.headers.get('Set-Cookie');
  expect(setCookie).toContain('HttpOnly');
  expect(setCookie).toContain('Secure');
  expect(setCookie).toContain('SameSite=Lax');
});`
    }
  ],

  howToUse: {
    title: "How to Use This Cookie Parser",
    content: `This cookie parser decodes HTTP Cookie and Set-Cookie headers into structured, human-readable format. Paste any cookie string to instantly see all cookies, their values, and security attributes clearly organized for analysis and debugging.

### Parsing Cookie Headers

Copy the Cookie header from browser DevTools Network tab, server logs, or cURL output. The header looks like: \`Cookie: sessionid=abc123; userId=456; token=xyz789\`. Paste into the parser to see each cookie extracted with its name and value in a table or list view. This is useful when debugging why specific cookies aren't being sent or to quickly find a specific cookie value in a long header.

### Parsing Set-Cookie Headers

Copy Set-Cookie headers from HTTP responses (API responses, server logs, or browser DevTools). Set-Cookie includes attributes: \`Set-Cookie: sessionid=abc123; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=86400\`. The parser extracts the cookie name, value, and all attributes (Domain, Path, Expires, Max-Age, Secure, HttpOnly, SameSite) and displays them clearly. Use this to verify cookies are set with correct security flags.

### Understanding Cookie Attributes

The parser highlights important security attributes:
- **HttpOnly:** If present, JavaScript cannot access this cookie (XSS protection). If missing on auth cookies, vulnerable to XSS attacks.
- **Secure:** If present, cookie is only sent over HTTPS. If missing in production, cookie can be intercepted over HTTP.
- **SameSite:** Controls cross-site request behavior. Strict = never sent cross-site (most secure), Lax = sent on safe cross-site navigation (balanced), None = sent everywhere (requires Secure).
- **Max-Age/Expires:** Shows when the cookie expires. Session cookies (no expiration) are deleted when browser closes. Persistent cookies survive browser restarts.
- **Domain:** Which hosts receive the cookie. Absent = exact host only. .example.com = all subdomains.
- **Path:** Which URL paths receive the cookie. Default is the path that set the cookie. /admin = only /admin/* URLs.

### Debugging Cookie Problems

**Problem: Cookie not sent by browser**
1. Parse the Set-Cookie header to verify cookie was set
2. Check Domain attribute matches the request URL (cookie domain must be request domain or parent)
3. Check Path attribute matches the request URL path
4. Check Expires/Max-Age isn't in the past
5. Check Secure flag isn't set when using HTTP (dev environment)

**Problem: Authentication works in dev but not production**
1. Parse cookies in both environments
2. Compare Secure flags (dev HTTP vs prod HTTPS)
3. Compare Domain attributes (localhost vs production domain)
4. Check SameSite attribute (Chrome enforces in prod, may not in dev)

**Problem: CSRF vulnerability despite having auth**
1. Parse auth cookies
2. Verify SameSite attribute is present and set to Lax or Strict
3. If missing, add SameSite=Lax to Set-Cookie header
4. Test cross-site POST requests are blocked

### Best Practices

Use this parser during development to verify cookies have correct security flags before deploying. During debugging, parse cookies from production logs to identify misconfigurations without accessing production browsers. In security audits, parse all cookies to ensure compliance with security policies (HttpOnly on auth, Secure on all, SameSite on CSRF-prone cookies). For GDPR compliance, parse third-party tracking cookies to document them in privacy policies.`,
    steps: [
      {
        name: "Copy Cookie Header",
        text: "Open browser DevTools → Network tab → Click any request → Headers section → Copy 'Cookie' or 'Set-Cookie' header value.",
      },
      {
        name: "Paste into Parser",
        text: "Paste the cookie header string into the input field. The parser handles both Cookie (request) and Set-Cookie (response) formats.",
      },
      {
        name: "Analyze Cookies",
        text: "Review parsed cookies with names, values, and attributes. Check for security flags (HttpOnly, Secure, SameSite) and expiration times.",
      },
      {
        name: "Fix Issues",
        text: "Identify missing security flags, incorrect domains, or expired cookies. Update server code to set correct cookie attributes in Set-Cookie headers.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between HttpOnly and Secure flags?",
      answer: "HttpOnly prevents JavaScript from accessing the cookie via document.cookie - protects against XSS attacks where injected scripts try to steal cookies. Secure ensures the cookie is only transmitted over HTTPS, not HTTP - protects against man-in-the-middle attacks that intercept cookies. Both are essential for authentication cookies: HttpOnly stops XSS theft, Secure stops network interception."
    },
    {
      question: "Should I use SameSite=Strict or SameSite=Lax?",
      answer: "Use SameSite=Lax for most cases - it prevents CSRF attacks while allowing legitimate cross-site navigation (clicking links from email, other sites). SameSite=Strict is more secure but breaks flows like OAuth redirects and payment returns. Use Strict only for highly sensitive cookies where you can tolerate broken cross-site flows. Never use SameSite=None unless absolutely necessary (embeds, cross-domain auth)."
    },
    {
      question: "Why can't JavaScript read my authentication cookie?",
      answer: "The cookie has the HttpOnly flag set. This is intentional security - HttpOnly cookies cannot be accessed via document.cookie to prevent XSS attacks from stealing authentication tokens. If you need client-side JavaScript to access the token, remove HttpOnly (carefully) or use a separate token in localStorage. Don't remove HttpOnly unless you have strong XSS defenses."
    },
    {
      question: "How do I delete a cookie?",
      answer: "Set the cookie again with Max-Age=0 or Expires=past-date. The Set-Cookie header must include the same Domain and Path as the original cookie, or the browser won't match it. Example: Set-Cookie: sessionid=; Path=/; Max-Age=0. Client-side: document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'. Verify deletion in DevTools Application/Storage tab."
    },
    {
      question: "What does Domain=.example.com do?",
      answer: "Domain=.example.com (note the leading dot) sends the cookie to example.com and all subdomains: www.example.com, api.example.com, admin.example.com. Without Domain attribute, the cookie is sent only to the exact host that set it. Use .example.com for shared authentication across subdomains. Be cautious: if any subdomain is compromised, the attacker gets the cookie."
    },
    {
      question: "Why does my cookie disappear when I close the browser?",
      answer: "The cookie has no Expires or Max-Age attribute, making it a session cookie that is deleted when the browser closes. To persist cookies across browser restarts, set Max-Age (seconds) or Expires (date). Example: Max-Age=2592000 (30 days) or Expires=Wed, 21 Oct 2025 07:28:00 GMT. Session cookies are appropriate for temporary auth, persistent cookies for 'Remember Me' features."
    },
    {
      question: "Can I use cookies for storing user preferences?",
      answer: "Yes, but consider size limits and alternatives. Cookies are sent with every request (bandwidth overhead), limited to ~4KB per cookie, and total ~50 cookies per domain. For large data or client-only data (doesn't need server access), use localStorage instead. Cookies are best for server-side needed data like authentication, session IDs, or small preferences like language/theme that the server uses for rendering."
    },
    {
      question: "What's the difference between Path=/ and no Path?",
      answer: "Path=/ sends the cookie to all paths on the domain (/admin, /api, /checkout). Without Path attribute, the cookie is sent only to the path that set it and its subdirectories. If /admin/login sets a cookie without Path, it's sent to /admin/* but not / or /api. Use Path=/ for site-wide cookies (auth, preferences). Use specific paths (/admin) to isolate cookies between application sections."
    },
    {
      question: "How do I fix 'Cookie has been rejected' browser warning?",
      answer: "Modern browsers reject cookies missing SameSite attribute or using SameSite=None without Secure flag. Fix: explicitly set SameSite=Lax or Strict on all cookies. If you need SameSite=None (cross-site cookies), you must also set Secure flag. Example: Set-Cookie: name=value; SameSite=None; Secure. Test in Chrome DevTools Console - warnings appear with rejection reasons."
    },
    {
      question: "What are first-party vs third-party cookies?",
      answer: "First-party cookies are set by the domain you're visiting (example.com sets cookies for example.com) - used for authentication, preferences, analytics. Third-party cookies are set by domains different from the one you're visiting (example.com page includes tracker.com script that sets tracker.com cookies) - used for cross-site tracking, ads. Browsers increasingly block third-party cookies for privacy. Use SameSite=Lax/Strict to control third-party behavior."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This cookie parser operates entirely client-side in your browser. No cookie headers, cookie values, or parsed data is transmitted to any servers. All parsing and analysis happens locally using JavaScript string processing.

### Privacy Guarantees

- **100% Client-Side Processing:** All cookie parsing, attribute extraction, and formatting happens in your browser. No network requests with your data.
- **No Server Uploads:** We have no backend servers to process cookies. The tool works completely offline after initial page load.
- **No Data Storage:** Your cookie headers and values are not saved, logged, or transmitted anywhere. Refresh the page and all inputs are cleared.
- **No Analytics Tracking:** We don't track what cookies you parse, what domains they belong to, or any usage patterns.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab to verify zero data transmission.

Safe for parsing production authentication cookies, session tokens, API cookies, or any sensitive cookie data that must remain confidential. Use with confidence for security audits, GDPR compliance reviews, or debugging production authentication issues.`
  },

  stats: {
    "Parse Speed": "<1ms",
    "Cookie Formats": "2",
    "Security Flags": "3",
    "Max Cookie Size": "4KB"
  }
};
