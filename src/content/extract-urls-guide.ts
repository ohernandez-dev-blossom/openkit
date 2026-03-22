/**
 * URL Extractor Tool Guide Content
 * Comprehensive developer guide for URL extraction from text
 */

import type { ToolGuideContent } from "./types";

export const extractUrlsGuideContent: ToolGuideContent = {
  toolName: "URL Extractor",
  toolPath: "/extract-urls",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Text with URLs",
      description: "Copy any text containing URLs - web pages, documents, logs, chat transcripts, or scraped data. Tool finds HTTP, HTTPS, FTP, and protocol-relative URLs automatically."
    },
    {
      title: "Enable Filtering Options",
      description: "Remove duplicates to get unique URLs only. Option to extract only domain names for analyzing site distribution. Filter by protocol (https only) or domain patterns."
    },
    {
      title: "Review Extracted URLs",
      description: "See all found URLs with count. Validates URL format including protocol, domain, path, query parameters. Individual copy buttons for each URL."
    },
    {
      title: "Export Results",
      description: "Copy as line-separated list for spreadsheets or comma-separated format for database imports. Export domain-only list for site analysis or link building research."
    }
  ],

  introduction: {
    title: "What is URL Extraction?",
    content: `URL extraction parses text to identify and extract web addresses using regex patterns matching URL structure: protocol://domain.tld/path?query#hash. Developers, SEO professionals, and security analysts extract URLs from scraped web pages, log files, chat transcripts, email archives, and documents to analyze link patterns, build sitemaps, audit external references, or investigate security incidents.

Valid URLs include complete addresses (https://example.com/path), protocol-relative URLs (//example.com), and partial URLs browsers auto-complete. Tool extracts HTTP/HTTPS web addresses, FTP file transfer URLs, and other standard protocols. Distinguishes URLs from plain text using protocol identifiers and domain structure validation.

### Why URL Extraction Matters

**SEO Link Analysis:** SEO professionals extract all outbound links from web pages to audit external link profiles, identify broken links, analyze competitor backlinks, or build link databases for outreach campaigns. Batch extract URLs from multiple pages faster than manual collection.

**Security Investigation:** Security teams extract URLs from logs, phishing emails, or malware samples to identify command-and-control servers, malicious domains, or tracking pixels. Analyze suspicious URLs before clicking. Extract URLs from deobfuscated JavaScript to reveal hidden redirects or data exfiltration endpoints.

**Content Scraping Validation:** After web scraping, verify extracted data by analyzing URL patterns. Ensure crawler visited intended pages, check for duplicate URLs indicating crawler loops, extract product/article URLs for further processing. Quality control for large scraping operations.

**Chat/Email Archive Analysis:** Extract all shared links from Slack archives, email threads, or customer support tickets. Build knowledge base of frequently shared resources, identify popular tools/articles among team, or audit external service dependencies mentioned in communications.

**Documentation Link Checking:** Technical writers extract all URLs from documentation to verify external references still work. Automated link checking prevents broken references in API docs, tutorials, or knowledge bases. Periodic extraction + validation maintains documentation quality.

**Marketing Attribution:** Marketing teams extract UTM-tagged URLs from campaign materials, email templates, or social media posts to audit tracking parameter consistency. Ensure all campaign links properly tagged for analytics. Bulk extract URLs from ad creatives for QA before launch.

### URL Format Recognition

Tool matches pattern: \`(https?|ftp)://[^\\s/$.?#].[^\\s]*\` with refinements for edge cases.

**Protocol:** Matches http://, https://, ftp:// explicitly. Also detects protocol-relative URLs (//example.com) common in modern web development for protocol-agnostic resource loading.

**Domain:** Alphanumeric characters, hyphens, dots forming valid domain structure. Requires TLD (.com, .org, .io, etc). Supports subdomains (api.example.com, www.test.co.uk). Internationalized domains with punycode encoding supported.

**Path & Query:** Matches URL paths (/products/item), query parameters (?id=123&sort=price), and hash fragments (#section). Handles URL-encoded characters (%20 for spaces). Captures complete URLs including all components.

**Exclusions:** Rejects invalid patterns: trailing punctuation from sentences ("Check example.com." extracts example.com only), email addresses (user@domain.com looks like URL but lacks protocol), localhost URLs without protocol (requires http://localhost).

### Processing Features

**Deduplication:** Remove repeated URLs appearing multiple times in text. Exact match comparison - query parameter order matters (example.com?a=1&b=2 ≠ example.com?b=2&a=1). Useful for web scraping result cleanup or log file analysis.

**Domain Extraction:** Option to extract domains only, stripping protocol and path. Converts https://example.com/page → example.com. Useful for analyzing site distribution, identifying external domains referenced, or building domain blacklists/whitelists.

**Protocol Filtering:** Filter to HTTPS-only URLs for security audits. Identify HTTP URLs needing migration to HTTPS. Separate internal (example.com) from external links for content audits.

All extraction happens client-side using JavaScript regex - your text never leaves your browser.`
  },

  useCases: [
    {
      title: "Extract Backlinks from Competitor Analysis",
      description: "Scrape competitor blog posts or resource pages, extract all outbound links to identify their link building targets. Build prospect list of sites accepting guest posts or citations.",
      example: `// Scraped competitor blog post content:
"Check out these amazing tools: https://tool1.com/features and
https://tool2.io/pricing. Also recommended: https://blog.example.com/post
Our favorite resource: https://docs.platform.com/api"

// Extract URLs:
https://tool1.com/features
https://tool2.io/pricing
https://blog.example.com/post
https://docs.platform.com/api

// Extract domains only:
tool1.com
tool2.io
blog.example.com
docs.platform.com

// Use for:
// - Identify sites competitor links to (link building targets)
// - Find guest post opportunities
// - Discover industry resources for own content
// - Build outreach prospect list`
    },
    {
      title: "Audit Email Campaign Links",
      description: "Extract all URLs from email marketing templates to verify UTM parameters, check for broken links, and ensure consistent tracking setup before sending campaigns.",
      example: `// Email HTML template:
<a href="https://example.com/sale?utm_source=email&utm_campaign=spring">Shop Now</a>
<a href="https://example.com/products?utm_source=email">Browse</a>
<img src="https://tracking.example.com/pixel.gif?id=12345">
Footer: https://example.com/unsubscribe?token=abc123

// Extract all URLs:
https://example.com/sale?utm_source=email&utm_campaign=spring
https://example.com/products?utm_source=email
https://tracking.example.com/pixel.gif?id=12345
https://example.com/unsubscribe?token=abc123

// QA Checks:
// ✓ All links have utm_source parameter
// ✗ Browse link missing utm_campaign (fix needed)
// ✓ Tracking pixel present
// ✓ Unsubscribe link present

// Prevents campaign launch with tracking errors`
    },
    {
      title: "Security Analysis of Suspicious Emails",
      description: "Extract URLs from phishing emails or suspicious messages to identify malicious domains without clicking links. Analyze redirect chains, check domains against threat databases.",
      example: `// Suspicious email content:
Click here to verify your account:
http://secure-login.fake-bank.com/verify?token=xyz
If above link doesn't work, try: https://bit.ly/3xY7zK

Powered by: http://legitimate-service.com/footer

// Extract URLs:
http://secure-login.fake-bank.com/verify?token=xyz
https://bit.ly/3xY7zK
http://legitimate-service.com/footer

// Security Analysis:
// ✗ http://secure-login.fake-bank.com - suspicious domain
// ⚠ https://bit.ly/3xY7zK - shortened URL (needs expansion)
// ✓ http://legitimate-service.com/footer - known legitimate

// Check extracted URLs in VirusTotal/URLScan.io
// DO NOT CLICK - extract and analyze safely`
    },
    {
      title: "Log File URL Analysis",
      description: "Extract URLs from web server logs, CDN logs, or application logs to identify most accessed resources, find referrer patterns, or debug API endpoint issues.",
      example: `// Nginx access log excerpt:
192.168.1.1 - - [02/Feb/2026:10:15:23] "GET https://api.example.com/v1/users HTTP/1.1" 200
192.168.1.2 - - [02/Feb/2026:10:15:24] "POST https://api.example.com/v1/orders HTTP/1.1" 201
192.168.1.1 - - [02/Feb/2026:10:15:25] "GET https://cdn.example.com/assets/logo.png HTTP/1.1" 304

// Extract URLs:
https://api.example.com/v1/users
https://api.example.com/v1/orders
https://cdn.example.com/assets/logo.png

// Extract paths only for endpoint analysis:
/v1/users (GET)
/v1/orders (POST)
/assets/logo.png (GET)

// Useful for:
// - Identify most-hit endpoints
// - Find slow API routes
// - Analyze traffic patterns
// - Debug routing issues`
    }
  ],

  howToUse: {
    title: "How to Use This URL Extractor",
    content: `This tool scans text using regex pattern matching to identify valid URLs, then applies filtering and formatting options. All processing happens client-side for privacy and speed.

### Extracting URLs from Text

Paste any text containing URLs: HTML source code, scraped web pages, log files, email content, chat transcripts, or documents. Tool accepts unlimited text length and finds all URLs matching supported protocols.

Regex pattern matches HTTP, HTTPS, FTP URLs with complete structure: protocol, domain, optional path, query parameters, and hash fragments. Captures complex URLs with encoded characters, subdomain paths, and authentication parameters.

### Supported URL Formats

**Full URLs:** https://example.com/path?query=value#hash - complete addresses with all components

**Protocol-relative:** //example.com/path - modern web development practice for protocol-agnostic loading

**Subdomains:** https://api.example.com, https://www.test.co.uk - multi-level domain structures

**Encoded URLs:** https://example.com/search?q=hello%20world - URL-encoded special characters

**Query Parameters:** https://example.com?a=1&b=2&c=3 - multiple parameters preserved

### Deduplication

Enable "Remove duplicates" to get unique URLs only. Exact match comparison including query parameters. URL example.com?a=1&b=2 differs from example.com?b=2&a=1 due to parameter order.

Useful for: cleaning scraped data with repeated links, analyzing unique resources referenced, building sitemap from multiple page sources.

### Domain-Only Extraction

Enable "Extract domains only" to strip protocol and path, keeping domain names. Converts https://example.com/page?id=1 → example.com.

Use cases: site distribution analysis (how many external domains referenced), domain whitelist/blacklist building, identifying unique websites in text, CDN vs primary domain separation.

### Export Formats

**Line-Separated:** One URL per line for spreadsheet paste, script processing, or manual review
**Comma-Separated:** CSV format for database imports or bulk processing tools

Choose format matching destination system requirements.`,
    steps: [
      {
        name: "Paste Text",
        text: "Copy text containing URLs from any source: web pages, logs, emails, documents. Unlimited text length supported.",
      },
      {
        name: "Configure Options",
        text: "Enable deduplication for unique URLs only. Choose domain-only extraction for site analysis. Filter by protocol if needed.",
      },
      {
        name: "Review Results",
        text: "See extracted URLs with count. Validate list contains expected addresses. Individual copy buttons for each URL.",
      },
      {
        name: "Export List",
        text: "Copy as line-separated list or CSV format. Import into spreadsheet, database, or link checking tools.",
      }
    ]
  },

  faqs: [
    {
      question: "Can it extract URLs without protocols (like example.com)?",
      answer: "No, tool requires explicit protocol (http://, https://, ftp://) to distinguish URLs from plain text. Domain-only text (example.com) could be URL or just mention of company name. Without protocol, too many false positives. Workaround: add http:// prefix to text before extraction if URLs missing protocols. Most modern content includes protocols. For stricter extraction, this prevents matching email addresses (user@domain.com) or general domain mentions."
    },
    {
      question: "How does it handle shortened URLs (bit.ly, t.co)?",
      answer: "Shortened URLs extracted normally if properly formatted (https://bit.ly/abc123). Tool doesn't expand shortened URLs - extracts them as-is. To get final destinations: use URL expander service separately, paste shortened URLs into curl/browser, or use URL analysis APIs. Shortened URLs common in social media, marketing emails. Extract then expand offline to avoid accidentally triggering malicious links."
    },
    {
      question: "Why are some URLs with special characters not extracted?",
      answer: "Regex prioritizes common URL formats over edge cases. Not extracted: URLs with unencoded spaces (should be %20), URLs with brackets/quotes without encoding, malformed query parameters. Modern URLs should be properly encoded. If legitimate URL missed, check for: missing protocol, unencoded special characters, unusual TLD, incorrect formatting. Tool designed for 99% of web URLs following standards. Non-standard URLs may require manual extraction or custom regex."
    },
    {
      question: "Can I extract URLs from PDF documents?",
      answer: "No, tool processes plain text only. PDF requires parsing binary format. Workflow: (1) Copy text from PDF (Ctrl+A, Ctrl+C in PDF reader), (2) Paste into URL extractor, (3) Extract URLs from copied text. Limitations: some PDF links stored as metadata not visible in copy-paste, need PDF parser to access all hyperlinks. For clickable PDF links, use PDF tool exporting links, then extract from export."
    },
    {
      question: "How do I extract internal vs external links separately?",
      answer: "Tool extracts all URLs together. To separate internal/external: (1) Extract all URLs, (2) Filter by domain using spreadsheet/script. Internal links contain your domain (example.com), external links have different domains. Consider using domain-only extraction mode, then manually categorize by known internal domains vs external. For large lists, write simple script filtering URLs by domain pattern."
    },
    {
      question: "Does it validate if extracted URLs actually work (200 status)?",
      answer: "No, tool extracts based on format only - doesn't check if URLs return HTTP 200, redirect, or 404. Format validation ensures URLs follow structure but not that pages exist. For link checking: use dedicated tools (broken link checker, curl scripts, Screaming Frog) on extracted URLs. This tool provides list, separate validation tool tests each URL's HTTP status. Avoids making network requests to preserve client-side privacy."
    },
    {
      question: "Can I extract URLs from images or screenshots?",
      answer: "No, tool processes text only. URLs in images require OCR first. Workflow: (1) Use OCR tool (Google Cloud Vision, Adobe) to extract text from image, (2) Paste OCR output into URL extractor, (3) Extract URLs from text. OCR accuracy varies - manually verify extracted URLs match image. Screenshot URL extraction imperfect due to OCR errors (O vs 0, l vs I confusion). Text-based extraction always more reliable."
    },
    {
      question: "How accurate is URL deduplication?",
      answer: "Exact string match deduplication. https://example.com/page and https://example.com/page/ treated as different (trailing slash). Query parameter order matters: example.com?a=1&b=2 ≠ example.com?b=2&a=1 (kept separate). Doesn't normalize: protocol differences (http vs https), www vs non-www, URL fragments. For sophisticated deduplication (URL normalization), export list and process with URL parsing library normalizing before comparing."
    },
    {
      question: "Can I extract specific URL patterns (like only product pages)?",
      answer: "Tool extracts all URLs matching format - no pattern filtering. To extract specific URL patterns: (1) Extract all URLs, (2) Filter extracted list using grep, spreadsheet filters, or regex in text editor. Example: filter for URLs containing '/product/' or ending in '.pdf'. Advanced filtering requires post-processing. This tool provides comprehensive extraction; subsequent filtering applied based on your criteria."
    },
    {
      question: "Is my text private when extracting URLs?",
      answer: "Absolutely. All URL extraction happens entirely in your browser using JavaScript regex matching. Your text never leaves your device or gets uploaded to servers. No network requests are made with your content. Verify by opening browser DevTools Network tab - zero uploads. Safe for extracting URLs from confidential logs, proprietary documents, security incident data, or sensitive communications. Tool works offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This URL extractor operates entirely client-side using JavaScript regex pattern matching. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All URL extraction happens in your browser using regex. Text stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your input text and extracted URLs are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you extract, URLs found, domains accessed, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for extracting URLs from security logs, confidential business documents, proprietary research, incident response data, or any sensitive text containing web addresses. Fully compliant with data privacy regulations. Use with confidence for security analysis, competitive intelligence, or internal auditing.`
  },

  stats: {
    "Protocols": "HTTP/HTTPS/FTP",
    "Max Text Size": "Unlimited",
    "Deduplication": "Yes",
    "Domain Extract": "Yes",
    "Server Uploads": "0"
  }
};
