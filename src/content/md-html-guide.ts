/**
 * Markdown to HTML Converter Tool Guide Content
 * Comprehensive developer guide for Markdown to HTML conversion
 */

import type { ToolGuideContent } from "./types";

export const mdHtmlGuideContent: ToolGuideContent = {
  toolName: "Markdown to HTML",
  toolPath: "/md-html",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Markdown Content",
      description: "Copy Markdown text from documentation files, README.md, blog posts, or any Markdown source. Supports standard syntax including headers, lists, links, code blocks, and tables."
    },
    {
      title: "Configure Conversion Options",
      description: "Enable or disable features like syntax highlighting, table support, GitHub Flavored Markdown extensions, or automatic heading IDs. Customize output matching target platform requirements."
    },
    {
      title: "Preview HTML Output",
      description: "View live preview of rendered HTML showing exactly how content will display. Check formatting, link behavior, and code highlighting before exporting. Real-time updates as you edit Markdown."
    },
    {
      title: "Copy or Export HTML",
      description: "Grab generated HTML code for embedding in websites, email templates, or documentation platforms. Export as standalone HTML file with styling or copy raw HTML for custom integration."
    }
  ],

  introduction: {
    title: "What is Markdown to HTML Conversion?",
    content: `Markdown to HTML conversion transforms plain-text Markdown syntax into formatted HTML markup browsers can render. Markdown's simple text-based format (headers with #, lists with -, links with [](url)) converts to semantic HTML tags (\`<h1>\`, \`<ul>\`, \`<a>\`) enabling styled rendering in web browsers, email clients, and documentation platforms.

Developers write documentation in Markdown for simplicity and readability. Version control diffs show clear text changes without HTML tag noise. Markdown files remain readable as plain text in editors without rendering. However, web browsers require HTML. Conversion bridges writing efficiency of Markdown with display requirements of HTML.

### Why Developers Convert Markdown to HTML

**Static Site Generation:** Static site generators (Jekyll, Hugo, Next.js, Gatsby) convert Markdown content to HTML during build. CMS authors write blog posts in Markdown, build process generates HTML pages. This separation keeps content clean while producing styled web pages. Manual conversion helps preview how content renders before deploying to production.

**Documentation Publishing:** Technical documentation written in Markdown converts to HTML for web hosting. README.md files render as HTML on GitHub, but custom documentation sites need manual conversion. API docs, user guides, and technical specs authored in Markdown become HTML documentation sites. Conversion enables custom styling, navigation, and search beyond GitHub's default rendering.

**Email Newsletter Generation:** Email templates require HTML for formatting. Marketing teams write content in Markdown (simple, collaborative), then convert to HTML for email campaigns. Markdown is easier for non-technical writers to edit than raw HTML. Conversion produces email-safe HTML compatible with Gmail, Outlook, and mobile clients.

**Blog Content Migration:** Migrate blog posts from Markdown-based platforms (Jekyll, Hugo) to HTML-based CMS (WordPress, Medium). Export Markdown posts, convert to HTML, import to new platform. Conversion preserves formatting, links, and structure during platform migrations. Batch convert hundreds of Markdown posts to HTML for mass content transfer.

**Embedding Documentation in Apps:** Desktop or mobile apps display help documentation as HTML in web views. Developers write docs in Markdown (version controlled with code), convert to HTML at build time, bundle HTML with app. Updates to Markdown documentation automatically rebuild HTML for next release. Native app documentation stays synchronized with codebase.

### Markdown Syntax and HTML Equivalents

**Headers:** Markdown \`# Header\` converts to \`<h1>Header</h1>\`. Hash count determines heading level (\`##\` = h2, \`###\` = h3). Semantic heading structure improves SEO and accessibility. Markdown enforces clean hierarchy compared to arbitrary HTML heading tags.

**Lists:** Unordered lists (\`- item\`) become \`<ul><li>item</li></ul>\`. Ordered lists (\`1. item\`) convert to \`<ol><li>item</li></ol>\`. Nested lists use indentation in Markdown producing nested \`<ul>\`/\`<ol>\` tags in HTML. Simple syntax generates complex HTML list structures.

**Links and Images:** Markdown links \`[text](url)\` convert to \`<a href="url">text</a>\`. Images \`![alt](url)\` become \`<img src="url" alt="alt">\`. Inline syntax is cleaner than verbose HTML. Conversion preserves semantic meaning while adding necessary HTML attributes.

**Code Blocks:** Triple backticks with language (\`\`\`javascript\`) convert to \`<pre><code class="language-javascript">\`. Syntax highlighting libraries use class names applying color coding. Inline code \`\`code\`\` becomes \`<code>code</code>\`. Markdown keeps code readable in plain text while HTML enables syntax highlighting.

**Emphasis:** Bold \`**text**\` converts to \`<strong>text</strong>\` (semantic emphasis). Italic \`*text*\` becomes \`<em>text</em>\`. Markdown uses visual markers matching their rendered appearance. HTML uses semantic tags conveying meaning to screen readers and search engines.

### GitHub Flavored Markdown Extensions

**Tables:** Markdown pipe tables convert to HTML \`<table>\` structures with proper alignment. GFM syntax (\`| Col | Col |\`) generates semantic table markup with \`<thead>\`, \`<tbody>\`, \`<th>\`, \`<td>\` tags. Native table support eliminates raw HTML in Markdown files.

**Task Lists:** Checkbox syntax \`- [ ] Task\` converts to \`<input type="checkbox">\` HTML. Checked boxes \`- [x] Done\` render as checked. Task lists integrate with GitHub issue tracking becoming interactive checkboxes users can toggle.

**Strikethrough:** Double tilde \`~~deleted~~\` converts to \`<del>deleted</del>\` or \`<s>\` tag. Shows removed content in documentation diffs or deprecated features in API docs. Standard HTML semantic tag for deleted text.

**Autolinks:** URLs and emails typed directly (\`https://example.com\`) auto-convert to \`<a>\` tags without explicit Markdown link syntax. Simplifies documentation writing - paste URLs without Markdown formatting. Common in GitHub issues and comments.

This tool converts Markdown to HTML using reliable parsing libraries supporting CommonMark standard and GitHub Flavored Markdown extensions. Handles edge cases, escaping, and complex nested structures correctly. All conversion client-side - your Markdown content stays private on your device.

### Conversion Use Cases and Workflows

**Preview Markdown Rendering:** Before committing README.md changes, preview exact GitHub rendering. Convert to HTML seeing formatted output. Catch formatting errors, broken links, or syntax mistakes before pushing to repository. Ensures documentation looks professional in GitHub web interface.

**Generate Styled Documentation:** Convert Markdown docs to HTML adding custom CSS creating branded documentation sites. Combine generated HTML with company stylesheets producing on-brand technical docs. Markdown content remains plain text (easily edited) while HTML output matches design requirements.

**Email Newsletter Creation:** Write newsletter content in Markdown collaborating with team via version control. Convert final Markdown to HTML for email platform import. Markdown simplifies content editing and review. HTML output integrates with email marketing tools (Mailchimp, SendGrid, Campaign Monitor).

**Cross-Platform Content Publishing:** Author content once in Markdown, convert to HTML for multiple destinations. Same Markdown source becomes website pages, embedded app documentation, PDF exports (HTML → PDF), or WordPress posts. Single source of truth reduces duplication and maintains consistency across platforms.`
  },

  useCases: [
    {
      title: "Convert README.md for Custom Documentation Sites",
      description: "Transform GitHub README.md into HTML for hosting on custom documentation platforms. Add company branding, navigation, and search features beyond GitHub's default rendering. Maintain Markdown source for easy editing while publishing styled HTML documentation.",
      example: `<!-- Original Markdown (README.md) -->
# My Project

## Installation

\`\`\`bash
npm install my-project
\`\`\`

## Usage

Import the library:

\`\`\`javascript
import { myFunction } from 'my-project';

const result = myFunction();
console.log(result);
\`\`\`

## Features

- **Fast**: Optimized performance
- **Simple**: Easy to use API
- **Typed**: Full TypeScript support

<!-- Converted HTML with custom styling -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="custom-docs.css">
</head>
<body>
  <h1>My Project</h1>
  <h2>Installation</h2>
  <pre><code class="language-bash">npm install my-project</code></pre>
  <h2>Usage</h2>
  <p>Import the library:</p>
  <pre><code class="language-javascript">import { myFunction } from 'my-project';

const result = myFunction();
console.log(result);</code></pre>
  <h2>Features</h2>
  <ul>
    <li><strong>Fast</strong>: Optimized performance</li>
    <li><strong>Simple</strong>: Easy to use API</li>
    <li><strong>Typed</strong>: Full TypeScript support</li>
  </ul>
</body>
</html>`
    },
    {
      title: "Generate HTML Email Newsletters from Markdown",
      description: "Content teams write newsletters in Markdown (easy collaboration, version control). Convert final Markdown to HTML for email platforms. Markdown simplifies editing and review process. HTML output works in email clients with proper styling and formatting.",
      example: `<!-- Markdown newsletter content -->
# Weekly Developer Newsletter

Hi developers! Here's this week's update:

## New Features

We've shipped **React 19** support! Check out:

- Server components
- Concurrent rendering
- Automatic batching

[Read full release notes](https://example.com/release)

---

Questions? Reply to this email!

<!-- Converted to HTML email -->
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h1 style="color: #333;">Weekly Developer Newsletter</h1>

  <p>Hi developers! Here's this week's update:</p>

  <h2 style="color: #555;">New Features</h2>

  <p>We've shipped <strong>React 19</strong> support! Check out:</p>

  <ul>
    <li>Server components</li>
    <li>Concurrent rendering</li>
    <li>Automatic batching</li>
  </ul>

  <a href="https://example.com/release"
     style="background: #0066cc; color: white;
            padding: 10px 20px; text-decoration: none;">
    Read full release notes
  </a>

  <hr style="border: 1px solid #ddd; margin: 20px 0;">

  <p style="color: #666;">Questions? Reply to this email!</p>
</div>`
    },
    {
      title: "Build Static Documentation from Markdown Files",
      description: "Convert repository Markdown documentation to HTML for hosting as static website. Batch convert all .md files generating complete documentation site. Add navigation, search, and styling to HTML output creating professional documentation beyond GitHub rendering.",
      example: `// Batch conversion script (Node.js example)
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const docsDir = './docs';
const outputDir = './dist/docs';

// Read all Markdown files
const mdFiles = fs.readdirSync(docsDir)
  .filter(file => file.endsWith('.md'));

// Convert each Markdown file to HTML
mdFiles.forEach(file => {
  const mdContent = fs.readFileSync(
    path.join(docsDir, file),
    'utf-8'
  );

  const htmlContent = marked(mdContent);

  const htmlPage = \`
<!DOCTYPE html>
<html>
<head>
  <title>\${file.replace('.md', '')}</title>
  <link rel="stylesheet" href="/docs.css">
</head>
<body>
  <nav><!-- documentation navigation --></nav>
  <main>\${htmlContent}</main>
</body>
</html>
  \`;

  const outputFile = file.replace('.md', '.html');
  fs.writeFileSync(
    path.join(outputDir, outputFile),
    htmlPage
  );
});

console.log(\`Converted \${mdFiles.length} files to HTML\`);`
    },
    {
      title: "Preview GitHub-Style Rendering Locally",
      description: "Before committing README changes to GitHub, preview exact rendering locally. Convert Markdown to HTML with GitHub Flavored Markdown support seeing tables, task lists, and syntax highlighting exactly as GitHub displays. Catch formatting issues before pushing.",
      example: `# Project README.md Preview Workflow

## 1. Write Markdown with GFM features
- [x] Support tables
- [x] Support task lists
- [ ] Add more examples

| Feature | Status |
|---------|:------:|
| Tables  | ✓      |
| Tasks   | ✓      |
| Code    | ✓      |

\`\`\`typescript
// Code with syntax highlighting
interface User {
  name: string;
  email: string;
}
\`\`\`

## 2. Convert to HTML locally

Use converter tool with GitHub Flavored Markdown
option enabled. Preview rendered HTML matching
GitHub's exact display.

## 3. Verify rendering

Check:
- Table alignment correct
- Task checkboxes render
- Code highlighting applied
- Links work properly

## 4. Commit with confidence

README will render exactly as previewed on GitHub.
No surprises after pushing changes.`
    }
  ],

  howToUse: {
    title: "How to Use the Markdown to HTML Converter",
    content: `This tool converts Markdown syntax to HTML markup with support for CommonMark standard and GitHub Flavored Markdown extensions. Real-time preview shows exact HTML output with optional styling.

### Converting Markdown to HTML

Paste Markdown content into input field. Conversion happens instantly showing HTML output and rendered preview. Supports all standard Markdown syntax: headers, paragraphs, lists, links, images, code blocks, blockquotes, and emphasis. Handles nested structures like lists inside lists or code blocks in list items.

Enable GitHub Flavored Markdown for extended features: tables, task lists, strikethrough, autolinks, and fenced code blocks with language syntax highlighting. GFM support ensures conversion matches GitHub README rendering exactly.

### Configuring Conversion Options

**Syntax Highlighting:** Enable code syntax highlighting adding CSS classes to code blocks. Choose highlighting library (Prism, Highlight.js) or use generic classes for custom highlighting implementation. Disable for plain \`<code>\` blocks without language classes.

**Table Support:** Enable table parsing converting Markdown pipe tables to HTML \`<table>\` elements. Preserves column alignment (left, center, right) via CSS classes or inline styles. Disable if target platform doesn't use tables.

**Heading IDs:** Generate automatic IDs for headings enabling anchor links. Heading "## Installation" gets \`id="installation"\` allowing deep links like \`page.html#installation\`. Useful for documentation with table of contents or shareable section links.

**Sanitization:** Clean HTML output removing potentially unsafe content. Strips script tags, event handlers, and dangerous protocols preventing XSS attacks. Enable for user-generated content, disable for trusted Markdown from known sources.

### Previewing Rendered Output

Live preview pane shows exactly how HTML will render in browsers. Preview includes optional styling matching target platform (GitHub style, plain HTML, custom CSS). Verify formatting, link behavior, image display, and code highlighting before exporting.

Toggle between HTML code view and rendered preview comparing source markup with visual output. Useful for debugging rendering issues or understanding HTML structure generated from complex Markdown.

### Exporting HTML

**Copy HTML Code:** Grab raw HTML markup for embedding in existing pages. HTML snippets integrate into web applications, CMS platforms, or documentation frameworks. No wrapper tags - just converted content ready for insertion.

**Download Standalone HTML:** Export complete HTML file with \`<!DOCTYPE>\`, \`<head>\`, and \`<body>\` tags. Includes inline CSS or external stylesheet links. Standalone files open directly in browsers displaying fully styled content.

**Copy with Styles:** Include CSS in copied HTML creating self-contained markup. Useful for email HTML (requires inline styles) or embedding in platforms without custom CSS support. Paste anywhere maintaining formatting.

### Best Practices

**Validate Markdown First:** Use Markdown linter checking syntax errors before conversion. Invalid Markdown may produce unexpected HTML. Fix formatting issues in Markdown source rather than editing generated HTML.

**Test Rendered Output:** Preview HTML in target environment (browser, email client, documentation platform). Rendering engines differ slightly - verify links, images, and formatting work correctly in production environment.

**Preserve Markdown Source:** Keep original Markdown as source of truth. Edit Markdown files, regenerate HTML when content changes. Editing HTML directly loses Markdown simplicity and version control benefits.

**Customize Styling:** Generated HTML uses semantic tags (\`<h1>\`, \`<p>\`, \`<code>\`) without inline styles. Add CSS stylesheet for visual formatting. Separation of content (HTML) from presentation (CSS) maintains flexibility.`,
    steps: [
      {
        name: "Paste Markdown",
        text: "Copy Markdown content into input field. Supports standard syntax plus GitHub Flavored Markdown extensions like tables, task lists, and fenced code blocks."
      },
      {
        name: "Configure Options",
        text: "Enable syntax highlighting, table support, GitHub Flavored Markdown, automatic heading IDs, or HTML sanitization. Customize conversion matching target platform requirements."
      },
      {
        name: "Preview Output",
        text: "View rendered HTML preview showing exact browser display. Verify formatting, links, images, and code highlighting before exporting. Toggle between HTML code and visual preview."
      },
      {
        name: "Export HTML",
        text: "Copy HTML code for embedding, download standalone HTML file, or copy with inline styles. Choose export format matching integration needs."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between CommonMark and GitHub Flavored Markdown?",
      answer: "CommonMark is standardized Markdown spec with strict parsing rules for consistent rendering. GitHub Flavored Markdown (GFM) extends CommonMark adding tables, task lists, strikethrough, autolinks, and disallowing raw HTML. GFM matches GitHub's README rendering. Use CommonMark for basic conversions, GFM when targeting GitHub or platforms supporting extended syntax. This tool supports both - enable GFM option for GitHub-compatible output."
    },
    {
      question: "How do I get syntax highlighting in converted HTML code blocks?",
      answer: "Enable syntax highlighting option during conversion. Tool adds language classes to code blocks: \`<code class='language-javascript'>\`. Link highlighting library (Prism.js or Highlight.js) in your HTML applying color coding based on classes. Or include library CDN in standalone HTML export. Without highlighting library, classes are ignored but code still renders. Choose library matching your site's existing dependencies."
    },
    {
      question: "Can I convert Markdown with custom HTML embedded in it?",
      answer: "Yes, standard Markdown allows inline HTML which passes through conversion unchanged. However, GitHub Flavored Markdown and sanitized mode strip or escape HTML for security. Disable sanitization preserving embedded HTML. Use cases: embed videos (\`<iframe>\`), add custom attributes, or use HTML for features Markdown doesn't support (colspan tables, forms). Keep embedded HTML minimal - defeats Markdown simplicity purpose."
    },
    {
      question: "Why do my Markdown tables not convert correctly?",
      answer: "Enable table support option (GitHub Flavored Markdown extension). Ensure tables use proper syntax: pipes separating columns, dash separator row, alignment colons. Check for missing pipes at row ends or misaligned separator dashes. CommonMark doesn't support tables - requires GFM extension. Test table in GitHub README verifying syntax before conversion. Complex tables with merged cells may need HTML table syntax instead."
    },
    {
      question: "How do I handle images in Markdown to HTML conversion?",
      answer: "Image syntax \`![alt text](image-url)\` converts to \`<img src='image-url' alt='alt text'>\`. Use absolute URLs (\`https://...\`) for images working anywhere. Relative URLs (\`./img/photo.jpg\`) work only if HTML is hosted where relative path resolves correctly. For email HTML, use absolute URLs or data URLs (base64 encoded images). Consider image hosting (CDN, cloud storage) ensuring reliability."
    },
    {
      question: "Can I batch convert multiple Markdown files to HTML?",
      answer: "This web tool converts one file at a time. For batch conversion, use command-line tools (Pandoc, marked-cli) or write scripts with Markdown parsing libraries (marked, markdown-it for Node.js). Process directory of .md files in loop generating .html files. Useful for static site generation or documentation publishing. Web tool works best for single file conversion and preview."
    },
    {
      question: "Does converted HTML work in email clients?",
      answer: "Email clients have limited HTML/CSS support compared to browsers. Converted HTML may need adjustments: use inline styles (no external CSS), use \`<table>\` layout (not flexbox/grid), test in major clients (Gmail, Outlook, Apple Mail). Enable 'email-safe' option if available using compatible markup. Or manually edit HTML replacing modern CSS with email-compatible styles. Test with email testing tools (Litmus, Email on Acid) before sending."
    },
    {
      question: "How do I add custom CSS styling to converted HTML?",
      answer: "Converted HTML uses semantic tags without inline styles. Add \`<link rel='stylesheet' href='style.css'>\` in HTML head section or include \`<style>\` tag with CSS rules. Target tags: \`h1, h2, p, ul, code, pre, blockquote\`. Use CSS classes if converter adds them (e.g., \`.language-javascript\` for code blocks). Standalone export option includes stylesheet link automatically. Customize CSS matching brand guidelines or platform design."
    },
    {
      question: "What happens to Markdown front matter during conversion?",
      answer: "YAML front matter (metadata between \`---\` delimiters at file start) is typically removed during conversion or rendered as code block depending on parser settings. Front matter is for static site generators, not HTML display. If you need metadata in HTML, extract front matter separately, convert body Markdown to HTML, inject metadata into HTML \`<meta>\` tags or page structure programmatically. Web converter may strip or ignore front matter."
    },
    {
      question: "Is my Markdown content private when converting to HTML?",
      answer: "Absolutely. All Markdown parsing and HTML generation happen entirely in your browser using JavaScript markdown libraries. Your content never uploads to servers. No network requests are made with your Markdown or generated HTML. Verify by checking browser DevTools Network tab showing zero outbound requests. Safe for confidential documentation, proprietary content, internal technical specs, or any sensitive Markdown requiring conversion without privacy concerns."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your Markdown content never leaves your browser. This converter operates entirely client-side using JavaScript Markdown parsing libraries. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All Markdown parsing and HTML generation happen locally in your browser. Your content stays on your device.
- **No Server Conversion:** We don't have backend services processing Markdown. The tool works completely offline after initial page load.
- **No Content Storage:** Your Markdown input and generated HTML are not saved, logged, or transmitted anywhere. Refresh the page and it's gone.
- **No Content Tracking:** We don't track what you convert, document structure, or any content-specific information.
- **Open Source Libraries:** Uses established open-source Markdown parsers (marked, markdown-it) - audit their source code for security verification.

Safe for converting confidential documentation, proprietary technical specs, internal README files, sensitive newsletters, or any private Markdown content requiring HTML output without privacy concerns.`
  },

  stats: {
    "Output Format": "HTML5",
    "Markdown Spec": "GFM+CommonMark",
    "Processing": "Client-side",
    "Syntax Highlighting": "Supported",
    "Data Upload": "0 bytes"
  }
};
