/**
 * HTML Formatter Tool Guide Content
 * Comprehensive developer guide for HTML formatting
 */

import type { ToolGuideContent } from "./types";

export const htmlFormatGuideContent: ToolGuideContent = {
  toolName: "HTML Formatter",
  toolPath: "/html-format",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your HTML Code",
      description: "Copy your minified or messy HTML from a production build, email template, or CMS output and paste it into the input panel. The formatter handles single-line HTML, inline markup, and compressed templates."
    },
    {
      title: "Configure Formatting Options",
      description: "Select your preferred indentation (2 spaces, 4 spaces, or tabs) and wrap length for long lines. 2 spaces is standard for modern web development, matching JSX and Vue conventions."
    },
    {
      title: "Format Automatically",
      description: "The formatter processes your HTML instantly, adding proper nested indentation, line breaks between elements, and visual hierarchy that makes the DOM structure immediately clear."
    },
    {
      title: "Copy Formatted HTML",
      description: "Click the Copy button to copy the formatted HTML to your clipboard, ready for pasting into templates, documentation, or debugging workflows."
    }
  ],

  introduction: {
    title: "What is HTML Formatting?",
    content: `HTML (HyperText Markup Language) formatting is the process of transforming minified, compressed, or inconsistently structured HTML into human-readable markup with proper indentation, line breaks, and visual hierarchy. While browsers render HTML regardless of formatting, developers need well-formatted markup for debugging, maintenance, and understanding document structure.

Modern build systems often minify HTML for production, removing all whitespace to reduce file sizes by 10-30%. This creates unreadable single-line documents that are impossible to debug in browser DevTools or modify for A/B testing. HTML formatters reverse this process, restoring the visual hierarchy of the DOM tree while preserving all elements, attributes, and content.

### Why HTML Formatting Matters

HTML formatting is essential for several critical developer workflows. When debugging production issues, developers inspect minified HTML from server responses or CDN-delivered pages. Formatted HTML reveals the DOM structure clearly, making it possible to identify missing closing tags, incorrect nesting, or attribute errors that cause rendering problems.

Component-based frameworks like React, Vue, and Angular generate HTML at runtime. When debugging component output or SSR (Server-Side Rendering) issues, developers need to inspect the generated HTML. Formatting this output shows component boundaries, props passed to children, and conditional rendering logic.

Email templates require carefully crafted HTML with table-based layouts for client compatibility. When working with email HTML from generators or legacy systems, formatting reveals the structure, making it easier to customize layouts, fix rendering bugs in Outlook, or optimize for mobile email clients.

### Key Features of HTML Formatters

**Nested Indentation:** Each nested element receives proper indentation based on its depth in the DOM tree. This creates a visual hierarchy where parent-child relationships are immediately obvious.

**Self-Closing Tag Recognition:** The formatter recognizes self-closing tags (img, br, input, meta) and formats them appropriately, avoiding unnecessary closing tags that would create invalid HTML.

**Attribute Preservation:** All HTML attributes (class, id, data-*, aria-*) are preserved exactly as written, maintaining functionality while improving the markup's readability.

**Text Content Handling:** Text nodes are properly indented and placed on their own lines when appropriate, or kept inline for short text to avoid disrupting readability.

### HTML Formatting vs Minification

HTML formatting is the inverse of minification. Minification removes all unnecessary whitespace, line breaks, and comments to reduce file size for production. Formatting adds whitespace back for developer readability. Developers format during development and debugging, then minify for production deployment. This formatter focuses on readability - making HTML understandable rather than optimizing for size.

### Common Formatting Scenarios

Developers use HTML formatters when debugging production pages, inspecting server-rendered HTML from APIs, cleaning up CMS-generated markup, formatting email templates for editing, preparing HTML for documentation, or teaching HTML structure to junior developers. The formatter makes any HTML source accessible regardless of its original formatting state.`
  },

  useCases: [
    {
      title: "Debug Production HTML",
      description: "Production builds minify HTML into unreadable single lines. When debugging rendering issues, paste the page source to see proper DOM structure, identify missing tags, and trace element nesting problems.",
      example: `// Before: Minified production HTML
<div class="container"><header><h1>Welcome</h1><nav><a href="/">Home</a><a href="/about">About</a></nav></header><main><article><p>Content here</p></article></main></div>

// After: Readable formatted HTML
<div class="container">
  <header>
    <h1>Welcome</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <article>
      <p>Content here</p>
    </article>
  </main>
</div>`
    },
    {
      title: "Format Email Templates",
      description: "Email HTML requires table-based layouts with complex nesting. Format email templates to understand structure, debug Outlook rendering issues, or customize responsive breakpoints for mobile clients.",
      example: `// Before: Compressed email HTML
<table width="100%"><tr><td><table><tr><td style="padding:20px"><h2>Newsletter</h2></td></tr></table></td></tr></table>

// After: Structured email HTML
<table width="100%">
  <tr>
    <td>
      <table>
        <tr>
          <td style="padding:20px">
            <h2>Newsletter</h2>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
    },
    {
      title: "Clean CMS Output",
      description: "Content management systems often generate messy HTML with inconsistent indentation and unnecessary attributes. Format CMS output to clean it up before using in custom templates or documentation.",
      example: `// Format WordPress or CMS-generated HTML
<article class="post">
  <header class="entry-header">
    <h1 class="entry-title">Post Title</h1>
    <div class="entry-meta">
      <span class="posted-on">January 1, 2024</span>
    </div>
  </header>
  <div class="entry-content">
    <p>Post content goes here...</p>
  </div>
</article>`
    },
    {
      title: "Inspect Component Output",
      description: "React, Vue, and Angular components generate HTML at runtime. When debugging component rendering, copy the output from DevTools and format it to see the actual DOM structure produced by your components.",
      example: `// Format React component output
<div data-component="UserCard">
  <div class="card-header">
    <img src="/avatar.jpg" alt="User avatar" />
    <h3>John Doe</h3>
  </div>
  <div class="card-body">
    <p class="bio">Software Developer</p>
    <button class="btn-primary">Follow</button>
  </div>
</div>`
    }
  ],

  howToUse: {
    title: "How to Use This HTML Formatter",
    content: `This HTML formatter provides instant client-side formatting with zero server uploads. All processing happens in your browser using JavaScript DOM parsing, ensuring your markup remains private and processing is instantaneous.

### Basic Formatting Workflow

Copy your HTML from any source (production page source, email template, CMS output, or component inspector) and paste it into the input panel. The formatter accepts any valid HTML including elements, attributes, text nodes, and comments.

Select your preferred indentation type: 2 spaces (modern web standard matching JSX/Vue), 4 spaces (traditional/enterprise), or tabs. Adjust the wrap length to control when long lines break (default 80 characters).

The formatter processes your HTML instantly as you type or paste. The formatted output appears in the right panel with proper nested indentation, visual hierarchy showing parent-child relationships, and consistent spacing that makes the DOM structure immediately clear.

### Advanced Features

**Indentation Control:** Choose 2-space, 4-space, or tab indentation to match your project's style guide. Nested elements receive appropriate indentation levels based on their depth in the DOM tree.

**Wrap Length:** Configure the maximum line length (40-200 characters) for wrapping long elements. This helps keep HTML readable without horizontal scrolling in code editors.

**Self-Closing Tags:** The formatter recognizes HTML5 void elements (img, br, input, meta, link) and formats them correctly without adding unnecessary closing tags.

**Attribute Preservation:** All attributes including class, id, data-*, aria-*, and custom attributes are preserved exactly as written, maintaining functionality and accessibility.

### Best Practices

Always format HTML before code review to ensure reviewers can focus on structure rather than styling. Use consistent indentation across your team to avoid diff noise in version control. Format third-party HTML before customizing to understand the original structure. Keep semantic HTML in mind - formatters preserve structure but don't fix semantic issues like incorrect heading levels or missing alt attributes.`,
    steps: [
      {
        name: "Paste HTML Code",
        text: "Copy your HTML from a minified production page, email template, or component output and paste it into the input panel."
      },
      {
        name: "Set Indentation Options",
        text: "Choose your indentation type (2 spaces, 4 spaces, or tabs) and wrap length to match your project conventions."
      },
      {
        name: "Review Formatted Output",
        text: "The formatter processes HTML instantly. Review the formatted output to see proper DOM structure and nesting hierarchy."
      },
      {
        name: "Copy Result",
        text: "Click the Copy button to copy formatted HTML to your clipboard, ready for debugging, documentation, or template editing."
      }
    ]
  },

  faqs: [
    {
      question: "Does HTML formatting change how pages render?",
      answer: "No, HTML formatting only affects whitespace (spaces, tabs, line breaks) and does not modify elements, attributes, or content. The formatted HTML renders identically in browsers - the DOM structure is preserved exactly. Formatting is purely for developer readability and has zero impact on page behavior or appearance."
    },
    {
      question: "Can this formatter fix invalid HTML?",
      answer: "No, this formatter preserves the HTML structure as-is and only adjusts whitespace. It does not fix missing closing tags, incorrect nesting, or invalid attributes. For HTML validation and repair, use an HTML validator first to identify issues, fix structural problems, then use this formatter for readability."
    },
    {
      question: "What indentation should I use for HTML?",
      answer: "2 spaces is the modern web development standard used by major frameworks (React JSX, Vue templates, Angular templates) and aligns with JavaScript/TypeScript conventions. 4 spaces is traditional in backend/enterprise development. Tabs are less common in modern web development. Choose based on your team's existing codebase and style guide."
    },
    {
      question: "Does this work with JSX or Vue templates?",
      answer: "This formatter is designed for standard HTML. JSX (React) and Vue single-file components use HTML-like syntax but include JavaScript expressions and special directives that this formatter may not handle correctly. For JSX/Vue, use Prettier or framework-specific formatters that understand the extended syntax."
    },
    {
      question: "Can I format HTML with embedded CSS or JavaScript?",
      answer: "Yes, the formatter preserves <style> and <script> tags with their content intact. However, the content inside these tags is not formatted - only the HTML structure receives proper indentation. For comprehensive formatting of HTML + CSS + JS, extract each language and use dedicated formatters."
    },
    {
      question: "Is my HTML data private when using this tool?",
      answer: "Absolutely. All HTML formatting happens entirely in your browser using client-side JavaScript. Your markup never leaves your device or gets sent to any servers. No uploads, no storage, no analytics tracking. Safe for proprietary templates, customer data in markup, or confidential projects."
    },
    {
      question: "How do I format HTML from browser DevTools?",
      answer: "Right-click on an element in Chrome/Firefox DevTools, select \"Edit as HTML\" or \"Copy > Outer HTML\", paste the copied HTML into this formatter, format it, then paste it back or save it for documentation. This is useful for inspecting runtime-generated HTML from JavaScript frameworks."
    },
    {
      question: "Can I format large HTML files (1MB+)?",
      answer: "Yes, this formatter handles HTML files up to several megabytes depending on browser memory. Typical web pages (10-200KB) format instantly. Very large files (1MB+) may take 1-2 seconds. For massive HTML documents like email archives or documentation exports, consider splitting them into logical sections."
    },
    {
      question: "Does this preserve HTML comments?",
      answer: "Yes, HTML comments (<!-- comment -->) are preserved in their original positions. The formatter adjusts spacing around comments to match the chosen indentation level, but comment content remains unchanged. This maintains documentation, license headers, and conditional comments for IE."
    },
    {
      question: "What's the difference between wrap length and indentation?",
      answer: "Indentation controls the horizontal spacing added to show nesting levels (2 spaces, 4 spaces, tabs). Wrap length controls the maximum line length before the formatter breaks elements across multiple lines. Indentation affects structure visibility; wrap length affects editor scrolling and readability on narrow screens."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your HTML code never leaves your browser. This formatter operates entirely client-side using JavaScript DOM parsing in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All HTML formatting happens in your browser's JavaScript engine. Your markup stays on your device.
- **No Server Uploads:** We don't have servers to process HTML. The tool works completely offline after first load.
- **No Data Storage:** Your HTML is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what HTML you format, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the formatter safe for sensitive use cases like formatting customer email templates, proprietary component markup, pages with embedded user data, or any HTML that must remain confidential. Use with confidence for production debugging, security audits, or handling regulated data (HIPAA, GDPR, PCI-DSS).`
  },

  stats: {
    "Processing": "<50ms",
    "Max Size": "5MB",
    "Tags": "All",
    "Privacy": "100%"
  }
};
