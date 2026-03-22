/**
 * HTML Minifier Tool Guide Content
 * Comprehensive developer guide for HTML minification
 */

import type { ToolGuideContent } from "./types";

export const htmlMinifyGuideContent: ToolGuideContent = {
  toolName: "HTML Minifier",
  toolPath: "/html-minify",
  lastUpdated: "2026-02-05",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your HTML Code",
      description: "Copy your HTML from templates, component files, or static files and paste it into the input panel. The minifier handles standard HTML5, semantic elements, and embedded CSS/Script blocks."
    },
    {
      title: "Review Minification Options",
      description: "The minifier automatically removes comments, unnecessary whitespace, and redundant attributes. Preview the size reduction statistics displayed in real-time."
    },
    {
      title: "Minify Instantly",
      description: "HTML is processed immediately in your browser, removing all unnecessary characters while preserving functionality. File size typically decreases by 10-30%."
    },
    {
      title: "Copy or Download Result",
      description: "Click Copy to copy minified HTML to clipboard, or use the output directly in your production deployment pipeline."
    }
  ],

  introduction: {
    title: "What is HTML Minification?",
    content: `HTML minification is the process of removing unnecessary characters from HTML markup without changing how the page renders in browsers. This includes removing comments, whitespace, newlines, and optional attribute quotes. Minification reduces HTML file size by 10-30%, improving page load times and reducing bandwidth usage.

Modern web applications serve substantial HTML payloads. Server-side rendering, static site generators, and content management systems produce verbose HTML with generous indentation and comments. While great for development, this overhead slows production delivery. Minification strips away everything browsers don't need.

### Why HTML Minification Matters

HTML is the foundation of every web page and blocking resource for rendering. Larger HTML files delay Time to First Byte (TTFB) and First Contentful Paint (FCP), directly impacting user experience and Core Web Vitals scores. Google uses these metrics for search rankings.

Minified HTML transfers faster over networks, especially on mobile connections. A 100KB HTML file becomes 70-80KB minified - noticeable on 3G connections. For high-traffic sites, these savings compound into significant CDN cost reductions.

Beyond size reduction, minified HTML is harder to inspect, providing basic protection against casual copying of page structure or proprietary markup patterns. While not true security, it adds friction.

### How HTML Minification Works

**Whitespace Removal:** All spaces, tabs, and newlines between tags are removed. Indentation used for developer readability is eliminated.

**Comment Stripping:** HTML comments (<!-- -->) are removed. This includes developer notes, debugging markers, and temporary annotations.

**Attribute Optimization:** Redundant quotes are removed where safe. Boolean attributes are simplified (checked="checked" becomes checked).

**Type Attribute Removal:** Unnecessary type attributes on scripts and stylesheets are removed (type="text/javascript", type="text/css").

### Minification vs Compression

HTML minification is a build-time optimization producing smaller files. Server compression (gzip, brotli) is runtime compression during HTTP transfer. Use both together - minify first (10-30% reduction), then enable gzip (additional 70-80% reduction). A 100KB HTML file becomes 75KB minified, then 15-20KB with gzip.

### Development vs Production

Never minify during development - readable HTML is essential for debugging structure, accessibility issues, and SEO markup. Minification is a production build step. Modern build tools (Vite, Webpack, Parcel) handle HTML minification automatically. This manual minifier helps when testing, optimizing templates, or working without build tools.`
  },

  useCases: [
    {
      title: "Reduce Email Template Size",
      description: "Email clients have size limits and slower rendering. Minify email templates to ensure fast delivery across all clients while maintaining design fidelity.",
      example: `<!-- Before: Development email template (45KB) -->
<table>
  <tr>
    <td style="padding: 20px;">
      <!-- Header section -->
      <h1>Welcome!</h1>
    </td>
  </tr>
</table>

<!-- After: Minified (28KB - 38% reduction) -->
<table><tr><td style="padding: 20px;"><h1>Welcome!</h1></td></tr></table>`
    },
    {
      title: "Optimize Static Site HTML",
      description: "Static site generators like Jekyll, Hugo, or 11ty produce indented HTML. Minify the output before deployment to reduce file sizes across your entire site.",
      example: `// Hugo site build
// Original: 2.3MB of HTML across 50 pages
// Minified: 1.7MB (26% reduction)
// Result: Faster page loads, lower hosting costs`
    },
    {
      title: "Prepare HTML for CDN",
      description: "When hosting HTML on CDNs or edge networks, minify to ensure fast global delivery. Smaller files cache better and transfer faster across edge locations.",
      example: `// Static HTML landing page
// Original: index.html (85KB)
// Minified: index.html (62KB - 27% reduction)
// Deployed to Cloudflare/AWS edge locations
// Global bandwidth savings per visitor: 23KB`
    },
    {
      title: "Compress Server-Rendered Output",
      description: "Server-side rendered React/Vue/Angular apps often output verbose HTML. Minify the SSR output to reduce Time to First Byte and improve Core Web Vitals.",
      example: `// Next.js SSR output
// Original: 180KB of HTML with data attributes
// Minified: 135KB (25% reduction)
// Faster TTFB and hydration`
    }
  ],

  howToUse: {
    title: "How to Use This HTML Minifier",
    content: `This HTML minifier provides instant client-side minification with zero server uploads. All processing happens in your browser, ensuring your markup remains private and processing is instantaneous.

### Basic Minification Workflow

Copy your HTML from templates, component renders, or static files and paste it into the input panel. The minifier accepts any valid HTML5 including semantic elements, data attributes, embedded CSS, and inline JavaScript.

The minifier processes your HTML instantly, removing comments, whitespace, and unnecessary attributes. File size reduction is displayed immediately, showing bandwidth savings per page load.

The minified output appears as compact HTML with all unnecessary characters removed. Copy it to clipboard or save to files for production deployment.

### What's Removed

**Comments:** All HTML comments (<!-- -->) are removed, including conditional comments. If you need to preserve specific comments, consider using a build-time minifier with comment preservation options.

**Whitespace:** Spaces, tabs, and newlines between tags are removed. Whitespace within text content is preserved to maintain rendering.

**Optional Attributes:** type="text/javascript" and type="text/css" are removed as they're unnecessary in HTML5.

### Best Practices

Always keep original source HTML files and only deploy minified versions to production. Test minified HTML in target email clients if building email templates - some clients have quirky whitespace handling. Use build tools for automated minification in CI/CD pipelines. Enable gzip/brotli compression on your web server for additional 70-80% size reduction beyond minification.`,
    steps: [
      {
        name: "Paste HTML Code",
        text: "Copy your HTML from templates, SSR output, or static files and paste it into the input panel. All HTML5 features are supported."
      },
      {
        name: "Review Size Reduction",
        text: "The minifier processes HTML instantly. Check the file size reduction percentage and preview the optimized output."
      },
      {
        name: "Copy Minified Output",
        text: "Click Copy to copy minified HTML to clipboard, ready for deployment to production or CDN."
      },
      {
        name: "Deploy to Production",
        text: "Use minified HTML in production environments. Keep original source files for future edits."
      }
    ]
  },

  faqs: [
    {
      question: "Does HTML minification change how pages render?",
      answer: "No, HTML minification only removes unnecessary characters without affecting rendering. Browsers parse minified HTML identically to the original. Comments are removed, whitespace between tags is eliminated, but text content and inline styles remain unchanged. Visual appearance and functionality are preserved."
    },
    {
      question: "How much smaller will my HTML become?",
      answer: "HTML minification typically reduces file size by 10-30% depending on code style. Well-commented, generously spaced HTML sees higher reduction (25-40%). Already-compact HTML sees less (5-15%). Combined with gzip compression (additional 70-80% reduction), total savings reach 75-85% of original size."
    },
    {
      question: "Can minification break my HTML?",
      answer: "Properly implemented HTML minification should never break valid HTML. However, edge cases exist: pages relying on specific whitespace for styling (pre elements, inline-block layouts), or conditional comments for older IE versions. Always test minified HTML in target browsers and email clients before deploying."
    },
    {
      question: "Should I minify HTML before or after inlining CSS/JS?",
      answer: "Minify after inlining. When you inline CSS and JavaScript into HTML, minify the final combined output. This ensures the inlined code is also minified and whitespace between inline blocks is optimized. Most build tools handle this automatically."
    },
    {
      question: "Is minified HTML good for SEO?",
      answer: "Yes, minified HTML can improve SEO indirectly through better page speed metrics. Google considers page speed as a ranking factor. Smaller HTML files download faster, improving Core Web Vitals scores. The actual HTML content and structure remain identical for search engine crawlers."
    },
    {
      question: "Is my HTML code private when using this tool?",
      answer: "Absolutely. All HTML minification happens entirely in your browser using client-side processing. Your HTML never leaves your device or gets sent to any servers. No uploads, no storage, no analytics tracking. Safe for proprietary templates, email designs, or confidential projects."
    },
    {
      question: "Can I minify HTML with embedded PHP or template syntax?",
      answer: "This minifier is designed for standard HTML. Minify the final rendered HTML output, not templates with server-side code or template syntax ({{ }}, <% %>). Process your PHP, Jinja, or Handlebars templates server-side first, then minify the resulting HTML."
    },
    {
      question: "Will minified HTML work in all email clients?",
      answer: "Minified HTML generally works in email clients, but some have quirks with whitespace handling. Always test minified email templates in Gmail, Outlook, Apple Mail, and other target clients before sending campaigns. Some email builders recommend specific minification settings for maximum compatibility."
    },
    {
      question: "How do I debug minified HTML?",
      answer: "Debugging minified HTML is difficult because formatting is removed. Use browser DevTools to inspect the DOM tree and see the structure. For development debugging, work with unminified source files. Only minify for production deployment. Some teams keep source maps for HTML when using complex build pipelines."
    },
    {
      question: "Can minification remove unused CSS classes from HTML?",
      answer: "No, basic HTML minification doesn't remove unused CSS classes - that requires additional tools like PurgeCSS that analyze both HTML and CSS together. Use PurgeCSS first to remove unused classes from stylesheets and class attributes, then minify the resulting HTML for maximum compression."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your HTML code never leaves your browser. This minifier operates entirely client-side using HTML parsing and processing in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All HTML minification happens in your browser's JavaScript engine. Your markup stays on your device.
- **No Server Uploads:** We don't have servers to process HTML. The tool works completely offline after first load.
- **No Data Storage:** Your HTML is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what HTML you minify, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the minifier safe for sensitive use cases like proprietary email templates, confidential landing pages, client-specific markup, or any HTML that must remain private. Use with confidence for production builds and confidential projects.`
  },

  stats: {
    "Reduction": "10-30%",
    "Processing": "<100ms",
    "Max Size": "5MB",
    "Privacy": "100%"
  }
};
