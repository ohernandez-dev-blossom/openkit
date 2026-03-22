/**
 * HTML to Markdown Converter Tool Guide Content
 * Comprehensive developer guide for HTML to Markdown conversion
 */

import type { ToolGuideContent } from "./types";

export const htmlMdGuideContent: ToolGuideContent = {
  toolName: "HTML to Markdown Converter",
  toolPath: "/html-md",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste HTML Code",
      description: "Copy HTML from web pages, CMS exports, email templates, or documentation. Supports semantic HTML, tables, lists, links, images, code blocks, and formatting tags."
    },
    {
      title: "Auto-Convert to Markdown",
      description: "Instant conversion to clean Markdown syntax. HTML headings become # headers, bold/italic preserved, links convert to [text](url), tables to Markdown tables."
    },
    {
      title: "Review Markdown Output",
      description: "See clean, human-readable Markdown. Removes unnecessary HTML attributes, inline styles, and script tags. Preserves semantic structure and content hierarchy."
    },
    {
      title: "Copy for Documentation",
      description: "Use converted Markdown in GitHub README, GitLab wikis, static site generators (Jekyll, Hugo), documentation tools (MkDocs, Docusaurus), or note-taking apps (Obsidian, Notion)."
    }
  ],

  introduction: {
    title: "What is HTML to Markdown Conversion?",
    content: `HTML to Markdown conversion transforms verbose HTML markup into lightweight Markdown syntax, converting <h1> to #, <strong> to **bold**, <a href> to [text](url), and complex HTML structures into simple, human-readable text formatting. Developers, technical writers, and content creators use HTML-to-Markdown converters to migrate WordPress/CMS content to static site generators, extract web content for documentation, clean up rich text editor exports, or convert HTML emails to Markdown for archival.

Markdown was created as "easy-to-read, easy-to-write plain text format" for web writing. HTML is powerful but verbose - simple bold text requires <strong></strong> tags. Markdown uses **text** or __text__ instead. HTML links need <a href="url">text</a>, Markdown uses [text](url). This readability makes Markdown preferred for documentation, README files, and any content humans edit frequently.

### Why Convert HTML to Markdown

**Static Site Generator Migration:** Moving from WordPress, Medium, or other CMS to static site generators (Jekyll, Hugo, Gatsby, Next.js) requires converting HTML posts to Markdown. Export content as HTML, convert to Markdown, import to new system. Preserves content structure while enabling Git-based workflows, version control, and simpler deployment.

**Documentation Cleanup:** Technical documentation often starts in rich text editors (Google Docs, Word) exporting bloated HTML. Convert to clean Markdown for documentation tools (MkDocs, Docusaurus, GitBook, ReadMe.io). Markdown easier to maintain in Git, review in pull requests, and collaborate on with developers.

**Web Scraping to Markdown:** Scrape article content, blog posts, or knowledge bases from websites and convert HTML to Markdown for processing. Create local knowledge bases, archive articles offline, or build custom search indexes. Markdown more portable and searchable than HTML.

**Email Archive Conversion:** Convert HTML emails to Markdown for long-term archival, full-text search, or migration to modern note-taking apps (Obsidian, Logseq, Roam). Markdown files lightweight, future-proof, and openable in any text editor without email client dependencies.

**CMS to Headless CMS Migration:** Migrate from traditional CMS (WordPress, Drupal) to headless CMS (Strapi, Contentful, Sanity) or Git-based CMS (Netlify CMS, Forestry). Export CMS content as HTML, convert to Markdown, import to new system. Markdown files enable editing in IDEs, Git workflows, and better developer experience.

**README Generation from Web Content:** Extract usage instructions, API documentation, or tutorials from websites and convert to Markdown README files for GitHub repos. Ensure documentation lives alongside code, versioned in Git, and renderable in repository viewers.

### Conversion Mapping

**Headings:** HTML <h1> to <h6> → Markdown # to ######. Preserves hierarchy. ATX-style headers (# text) more common than underline style (text \\n ====).

**Emphasis:** <strong>/<b> → **bold** or __bold__. <em>/<i> → *italic* or _italic_. <del>/<s> → ~~strikethrough~~.

**Links:** <a href="url">text</a> → [text](url). Absolute and relative URLs preserved. Anchor links (#section) supported.

**Images:** <img src="url" alt="text"> → ![alt text](url). Alt text becomes Markdown image description.

**Lists:** <ul>/<ol> with <li> → - item or 1. item. Nested lists use indentation. Mixed ordered/unordered lists supported.

**Code:** <code> → \`inline code\`. <pre><code> → \`\`\`language code block \`\`\`. Syntax highlighting hints extracted from class names (language-javascript).

**Blockquotes:** <blockquote> → > quoted text. Nested blockquotes use >> or >>> for multiple levels.

**Tables:** HTML tables → Markdown tables with | column | separators | and header dividers. Alignment preserved where possible.

**Horizontal Rules:** <hr> → --- or *** or ___ (three dashes/asterisks/underscores).

This tool uses Turndown library (battle-tested HTML-to-Markdown converter) with smart handling of complex HTML, malformed markup cleanup, and Markdown best practices. All processing client-side - your HTML never leaves your browser.`
  },

  useCases: [
    {
      title: "Migrate WordPress Blog to Static Site",
      description: "Export WordPress posts as HTML using WP export tools, convert to Markdown files for Jekyll/Hugo/Gatsby. Maintain SEO structure, preserve frontmatter metadata, enable Git-based publishing workflow.",
      example: `// WordPress HTML export of blog post:
<h1>How to Build REST APIs</h1>
<p>REST APIs are the backbone of modern web...</p>
<img src="/uploads/api-diagram.png" alt="API diagram">
<h2>Best Practices</h2>
<ul>
  <li><strong>Versioning:</strong> Use /v1/ in URLs</li>
  <li><strong>Authentication:</strong> Implement OAuth2</li>
</ul>

// Convert to Markdown for Jekyll:
# How to Build REST APIs

REST APIs are the backbone of modern web...

![API diagram](/uploads/api-diagram.png)

## Best Practices

- **Versioning:** Use /v1/ in URLs
- **Authentication:** Implement OAuth2

// Add frontmatter for Jekyll:
---
title: "How to Build REST APIs"
date: 2026-02-02
categories: [tutorials, api]
---

// Place in _posts/2026-02-02-how-to-build-rest-apis.md
// Deploy with Git push to GitHub Pages`
    },
    {
      title: "Convert Documentation from Google Docs",
      description: "Export Google Docs as HTML, convert to Markdown for documentation site. Clean up inline styles, convert to semantic Markdown, commit to Git for versioning and collaboration.",
      example: `// Google Docs HTML export (bloated):
<p style="margin:0;padding:0;font-family:Arial;">
  <span style="font-size:24px;font-weight:bold;">Installation</span>
</p>
<p style="margin:10px 0;">
  Run the following command:
</p>
<p style="font-family:monospace;background:#f5f5f5;padding:10px;">
  npm install my-package
</p>

// Convert to clean Markdown:
# Installation

Run the following command:

\`\`\`bash
npm install my-package
\`\`\`

// Benefits:
// - Remove inline styles clutter
// - Semantic Markdown structure
// - Version control in Git
// - Render in MkDocs/Docusaurus
// - Collaborate via pull requests`
    },
    {
      title: "Archive Medium Articles as Markdown",
      description: "Scrape or export Medium articles, convert HTML to Markdown for personal archive or migration to own blog. Preserve formatting, extract images, maintain link structure for offline reading.",
      example: `// Medium article HTML (simplified):
<article>
  <h1>10 JavaScript Tips</h1>
  <p>Here are <em>essential</em> tips every dev should know:</p>
  <figure>
    <img src="https://cdn.medium.com/image.png">
    <figcaption>JavaScript logo</figcaption>
  </figure>
  <ol>
    <li>Use <code>const</code> by default</li>
    <li>Avoid var keyword</li>
  </ol>
</article>

// Convert to Markdown:
# 10 JavaScript Tips

Here are *essential* tips every dev should know:

![JavaScript logo](https://cdn.medium.com/image.png)

1. Use \`const\` by default
2. Avoid var keyword

// Use for:
// - Personal article archive
// - Migrate away from Medium
// - Offline reading in Obsidian
// - Backup before platform changes`
    },
    {
      title: "Generate README from Website Docs",
      description: "Scrape documentation from project website, convert to Markdown README for GitHub repo. Ensure docs live alongside code, version controlled, and renderable in repo viewers.",
      example: `// Website docs HTML:
<div class="docs">
  <h2>Quick Start</h2>
  <pre><code class="language-bash">
  npm install tool
  tool --help
  </code></pre>
  <h2>Configuration</h2>
  <p>Create <code>config.json</code>:</p>
  <pre><code class="language-json">
  {
    "apiKey": "your-key",
    "timeout": 5000
  }
  </code></pre>
</div>

// Convert to README.md:
## Quick Start

\`\`\`bash
npm install tool
tool --help
\`\`\`

## Configuration

Create \`config.json\`:

\`\`\`json
{
  "apiKey": "your-key",
  "timeout": 5000
}
\`\`\`

// Benefits:
// - Docs live in repo (version controlled)
// - Renderable on GitHub/GitLab
// - Editable in IDE with code
// - Synchronized with code changes`
    }
  ],

  howToUse: {
    title: "How to Use This HTML to Markdown Converter",
    content: `This tool converts HTML markup to clean Markdown syntax using Turndown library with smart parsing, malformed HTML handling, and Markdown best practices. All processing happens client-side.

### Converting HTML to Markdown

Paste HTML code into input field. Accepts full HTML documents, fragments, or copied rich text. Tool automatically: removes HTML comments, strips inline styles (preserving semantic meaning), handles malformed HTML (unclosed tags, incorrect nesting), converts semantic HTML to Markdown equivalents.

Supported HTML elements: headings (h1-h6), paragraphs (p), emphasis (strong, em, b, i), links (a), images (img), lists (ul, ol, li), code (code, pre), blockquotes (blockquote), tables (table, tr, td), horizontal rules (hr), line breaks (br).

Unsupported/removed: script tags (JavaScript), style tags (CSS), HTML comments, form elements (input, button), deprecated tags (font, center), most HTML attributes except href, src, alt.

### Handling Complex HTML

**Nested Lists:** Markdown uses indentation for nesting. Tool converts HTML nested ul/ol to properly indented Markdown lists maintaining hierarchy.

**Tables:** HTML tables with rowspan/colspan convert to basic Markdown tables (no colspan/rowspan in Markdown). Complex tables may need manual adjustment. Simple tables convert cleanly with column alignment hints.

**Code Blocks:** Pre>code elements convert to fenced code blocks (\`\`\`). Tool extracts language hint from class name (class="language-javascript" → \`\`\`javascript).

**Inline Styles:** Tool ignores inline CSS styles and attributes, converting only semantic HTML. <span style="color:red">text</span> becomes plain "text". Use Markdown syntax for styling instead.

### Markdown Flavors

Tool outputs GitHub Flavored Markdown (GFM) compatible with: GitHub/GitLab, Static site generators (Jekyll, Hugo, Gatsby), Documentation tools (MkDocs, Docusaurus), Note-taking apps (Obsidian, Notion export).

GFM adds: strikethrough (~~text~~), tables, task lists (- [ ] todo), syntax highlighting hints. Standard Markdown readers support core features; GFM-specific features may vary.

### Post-Conversion Cleanup

Review converted Markdown for: missing images (relative URLs may break), broken links (internal site links), table formatting (complex tables need manual fixes), code block language hints (add if missing), frontmatter metadata (add YAML header for static site generators).`,
    steps: [
      {
        name: "Paste HTML",
        text: "Copy HTML from web pages, CMS exports, rich text editors, or documentation. Full documents or fragments supported.",
      },
      {
        name: "Auto-Convert",
        text: "Instant conversion to clean Markdown. Tool handles malformed HTML, removes scripts/styles, preserves semantic structure.",
      },
      {
        name: "Review Output",
        text: "Check Markdown for accuracy. Verify links, images, and code blocks render correctly. Edit as needed.",
      },
      {
        name: "Use in Docs",
        text: "Copy Markdown for GitHub README, static site generators, documentation tools, or note-taking apps. Version control in Git.",
      }
    ]
  },

  faqs: [
    {
      question: "Does it preserve HTML styles and colors?",
      answer: "No, Markdown doesn't support styling (colors, fonts, sizes). Tool converts semantic HTML only - <strong> to **bold**, <em> to *italic*. Inline styles, CSS classes, and style attributes removed. Markdown philosophy: separate content from presentation. For styled content, keep as HTML or use CSS with Markdown (supported by some renderers). Convert focuses on content structure, not visual styling."
    },
    {
      question: "Can it handle tables with merged cells?",
      answer: "Partially. Standard Markdown tables don't support colspan/rowspan (merged cells). Tool converts HTML tables to basic Markdown tables, but merged cells lose merging - each cell becomes separate. For complex tables: keep as HTML (many Markdown renderers allow embedded HTML), manually adjust after conversion, or use screenshot/image. Simple tables convert perfectly. Complex financial/data tables may need manual reconstruction."
    },
    {
      question: "What happens to JavaScript and CSS in HTML?",
      answer: "Script tags, style tags, and event handlers (onclick, etc) removed entirely. Markdown is content format, not programming language. For interactive content: keep as HTML, use framework components (React MDX), or embed via iframes/widgets. Inline styles stripped but semantic meaning preserved: <span style='color:red'>error</span> becomes plain 'error' - manually add Markdown emphasis if needed. Focus on content, add interactivity in rendering layer."
    },
    {
      question: "Can I convert Markdown back to HTML after?",
      answer: "Yes, Markdown → HTML is primary use case (most Markdown renderers convert to HTML). This tool does reverse: HTML → Markdown. Round-trip (HTML → Markdown → HTML) generally safe for semantic HTML. May lose: inline styles, complex tables, HTML comments, deprecated tags, custom attributes. For reversible conversion, use Markdown-first approach: write in Markdown, convert to HTML for display. HTML → Markdown → HTML works but not lossless."
    },
    {
      question: "How does it handle images - are they downloaded?",
      answer: "No, tool converts image tags to Markdown image syntax preserving src URLs: <img src='url' alt='text'> → ![text](url). Images not downloaded or embedded. URLs stay as-is (absolute or relative). For broken image links: update URLs manually after conversion, download images separately, or use base64 Data URLs. Tool focuses on markup conversion, not asset management. Verify image paths work in destination system."
    },
    {
      question: "What about WordPress shortcodes and custom elements?",
      answer: "Custom HTML elements, WordPress shortcodes [shortcode], and CMS-specific markup treated as plain text or removed depending on structure. Not standard HTML so no Markdown equivalent. Workarounds: pre-process shortcodes to HTML before conversion, manually replace shortcodes in Markdown, use static site generator plugins handling shortcodes, convert to HTML equivalents first. CMS migrations require custom scripting for platform-specific features."
    },
    {
      question: "Can it extract content from full HTML pages?",
      answer: "Yes, paste full HTML page including <html>, <head>, <body> tags. Tool extracts content from body, ignores head/meta, removes navigation/footer if in semantic tags. For best results: identify main content area in HTML, paste only article/main content section, or use tool then remove boilerplate manually. Web scrapers often extract main content first, then convert to Markdown. Tool converts whatever HTML provided - garbage in, garbage out applies."
    },
    {
      question: "Which Markdown flavor does it output?",
      answer: "GitHub Flavored Markdown (GFM) compatible with GitHub, GitLab, most static site generators, and documentation tools. Includes: fenced code blocks (\`\`\`), tables (| syntax), strikethrough (~~text~~), autolinks. Standard Markdown features work everywhere. GFM extensions widely supported. For specific renderers (Pandoc, MultiMarkdown): may need syntax adjustments. GFM safest common denominator for portability."
    },
    {
      question: "How do I handle malformed or messy HTML?",
      answer: "Tool uses Turndown library with error handling for malformed HTML: unclosed tags auto-closed, incorrect nesting fixed, orphaned closing tags ignored. Best results with valid HTML but works with real-world messy HTML. For very broken HTML: run through HTML validator/cleaner first (HTML Tidy), use browser DevTools 'Copy outerHTML' for properly parsed HTML, or manually fix critical issues before conversion. Tool robust but not magic."
    },
    {
      question: "Is my HTML content private when converting?",
      answer: "Absolutely. All HTML to Markdown conversion happens entirely in your browser using Turndown JavaScript library. Your HTML never leaves your device or gets uploaded to servers. No network requests are made with your content. Verify by opening browser DevTools Network tab - zero uploads. Safe for converting confidential documentation, proprietary content, internal wikis, or any sensitive HTML. Tool works completely offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your HTML never leaves your browser. This converter operates entirely client-side using Turndown library for HTML parsing and Markdown generation. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All HTML to Markdown conversion happens in your browser. HTML stays on your device.
- **No Server Uploads:** We don't have backend servers to process HTML. The tool works completely offline after first page load.
- **No Data Storage:** Your input HTML and converted Markdown are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you convert, content structure, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your HTML.

Safe for converting confidential documentation, proprietary content, internal knowledge bases, client deliverables, or any sensitive HTML requiring Markdown format.`
  },

  stats: {
    "Supported Tags": "50+",
    "Markdown Flavor": "GFM",
    "Conversion Speed": "<100ms",
    "Max Size": "10MB",
    "Server Uploads": "0"
  }
};
