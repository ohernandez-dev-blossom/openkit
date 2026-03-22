/**
 * CSS Formatter Tool Guide Content
 * Comprehensive developer guide for CSS formatting
 */

import type { ToolGuideContent } from "./types";

export const cssFormatGuideContent: ToolGuideContent = {
  toolName: "CSS Formatter",
  toolPath: "/css-format",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your CSS Code",
      description: "Copy your minified or messy CSS from a production build, legacy stylesheet, or third-party library and paste it into the input panel. The formatter handles single-line CSS, inline styles, and compressed CSS files."
    },
    {
      title: "Choose Formatting Style",
      description: "Select your preferred indentation (2 spaces, 4 spaces, or tabs) and brace style (expanded or compact). 2 spaces is standard for modern web projects, while 4 spaces is common in enterprise environments."
    },
    {
      title: "Format Instantly",
      description: "The formatter processes your CSS instantly in the browser, adding proper line breaks, indentation, and spacing. Watch as unreadable single-line CSS transforms into clean, maintainable code."
    },
    {
      title: "Copy Formatted Result",
      description: "Click the Copy button to copy the formatted CSS to your clipboard, ready to paste into your code editor, commit to version control, or use in your next project."
    }
  ],

  introduction: {
    title: "What is CSS Formatting?",
    content: `CSS (Cascading Style Sheets) formatting is the process of transforming minified, compressed, or inconsistently styled CSS code into human-readable format with proper indentation, line breaks, and visual hierarchy. While browsers parse CSS regardless of formatting, developers need well-formatted stylesheets for maintenance, debugging, and collaboration.

Modern web development workflows often involve CSS minification for production (reducing file sizes by 15-40%), but this creates unreadable single-line stylesheets that are impossible to debug or modify. CSS formatters reverse this process, restoring readability while preserving all functionality, selectors, properties, and values.

### Why CSS Formatting Matters

CSS formatting is critical for several developer workflows. When debugging production issues, developers need to inspect minified CSS from CDNs or build outputs to identify style conflicts, specificity problems, or incorrect property values. Formatted CSS reveals the structure clearly, making it possible to trace cascading rules and inheritance chains.

Legacy codebases often contain inconsistently formatted CSS written by multiple developers over years. Reformatting with consistent indentation and spacing creates a unified style that reduces cognitive load and makes code reviews more effective. Teams can focus on logic changes rather than stylistic inconsistencies.

Third-party CSS libraries like Bootstrap, Tailwind, or Material-UI ship minified production builds. When customizing or debugging these frameworks, developers need formatted source to understand class hierarchies, responsive breakpoints, and CSS custom properties. Formatting makes these libraries approachable and modifiable.

### Key Features of CSS Formatters

**Indentation Control:** Configure spacing (2 spaces, 4 spaces, tabs) to match your project's style guide. Consistent indentation makes nested selectors, media queries, and keyframe animations visually clear.

**Brace Style Options:** Choose between expanded style (opening brace on same line) or compact style (opening brace on new line) to match team conventions or personal preference.

**Property Alignment:** Each CSS property gets its own line with consistent indentation, making it easy to scan for specific declarations like display, position, or z-index.

**Comment Preservation:** Formatters preserve CSS comments while adjusting their spacing, maintaining documentation and explanatory notes for complex selectors or browser-specific hacks.

### CSS Formatting vs Minification

CSS formatting is the inverse of minification. Minification removes whitespace, comments, and unnecessary characters to reduce file size for production (typically 15-40% smaller). Formatting adds whitespace back for human readability. Developers format during development and debugging, then minify for production deployment. This formatter handles both directions - paste minified CSS to format it, or use the compact brace style for semi-compressed output.

### Common Use Cases

Developers use CSS formatters when working with production builds that need debugging, cleaning up legacy code before refactoring, reviewing CSS from third-party sources, preparing stylesheets for code review, or teaching CSS structure to junior developers. The formatter makes CSS accessible and maintainable regardless of its original state.`
  },

  useCases: [
    {
      title: "Debug Production CSS",
      description: "Production builds minify CSS into unreadable single lines. When debugging style issues in production, paste the minified CSS to see proper structure, identify conflicting rules, and trace specificity problems.",
      example: `// Before: Minified production CSS
.btn{padding:10px 20px;background:#007bff;color:#fff;border:none}.btn:hover{background:#0056b3}

// After: Readable formatted CSS
.btn {
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
}

.btn:hover {
  background: #0056b3;
}`
    },
    {
      title: "Clean Legacy Stylesheets",
      description: "Legacy projects accumulate CSS written by many developers with inconsistent formatting. Reformat the entire stylesheet to create visual consistency, making code reviews and maintenance significantly easier.",
      example: `// Before: Inconsistent legacy formatting
.header{background:#333;
padding: 20px;
  color:white;}
    .nav-item { margin:0 10px;font-size:14px; }

// After: Consistent modern formatting
.header {
  background: #333;
  padding: 20px;
  color: white;
}

.nav-item {
  margin: 0 10px;
  font-size: 14px;
}`
    },
    {
      title: "Analyze Third-Party CSS",
      description: "Third-party libraries ship minified CSS. When customizing frameworks like Bootstrap or Tailwind, format the source to understand class structure, responsive utilities, and CSS variable definitions.",
      example: `// Format Bootstrap component CSS
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}`
    },
    {
      title: "Prepare for Code Review",
      description: "Before submitting CSS for code review, format it consistently to help reviewers focus on logic and functionality rather than stylistic inconsistencies. Consistent formatting speeds up review cycles.",
      example: `// Formatted CSS ready for review
@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 0 15px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}`
    }
  ],

  howToUse: {
    title: "How to Use This CSS Formatter",
    content: `This CSS formatter provides instant client-side formatting with zero server uploads. All processing happens in your browser using JavaScript, ensuring your stylesheets remain private and processing is instantaneous.

### Basic Formatting Workflow

Copy your CSS from any source (production build, legacy file, third-party library, or inline styles) and paste it into the input panel. The formatter accepts any valid CSS including selectors, properties, media queries, keyframes, and CSS custom properties.

Select your preferred indentation type from the options: 2 spaces (modern web standard), 4 spaces (enterprise/Java convention), or tabs (traditional approach). Choose your brace style: expanded (opening brace on same line as selector) or compact (opening brace on new line).

The formatter processes your CSS instantly as you type or paste. The formatted output appears in the right panel with proper line breaks, consistent indentation, and visual hierarchy that makes the cascade structure clear.

### Advanced Features

**Indentation Options:** The formatter supports 2-space, 4-space, and tab indentation. Choose based on your project's style guide or team conventions. Consistency matters more than the specific choice.

**Brace Style Control:** Expanded style (most common) keeps opening braces on the same line as selectors. Compact style places opening braces on their own line, similar to C# or Java conventions.

**Comment Preservation:** All CSS comments (/* ... */) are preserved in their original positions while spacing around them is normalized to match your chosen indentation.

**Media Query Formatting:** Media queries and nested rules receive proper indentation levels, making responsive breakpoints and feature queries visually distinct.

### Best Practices

Always format CSS before committing to version control to ensure consistent style across your team. Use the same indentation settings team-wide to avoid diff noise. Format third-party CSS before customizing to understand the original structure. Keep a copy of the original minified CSS for comparison when debugging unexpected changes.`,
    steps: [
      {
        name: "Paste CSS Code",
        text: "Copy your CSS from a minified production file, legacy stylesheet, or third-party library and paste it into the input panel."
      },
      {
        name: "Select Formatting Options",
        text: "Choose your indentation type (2 spaces, 4 spaces, or tabs) and brace style (expanded or compact) to match your project conventions."
      },
      {
        name: "Review Formatted Output",
        text: "The formatter processes your CSS instantly. Review the formatted output in the right panel to ensure proper structure and readability."
      },
      {
        name: "Copy or Export",
        text: "Click the Copy button to copy formatted CSS to your clipboard, ready to paste into your code editor or commit to version control."
      }
    ]
  },

  faqs: [
    {
      question: "Does CSS formatting change how styles are applied?",
      answer: "No, CSS formatting only affects whitespace (spaces, tabs, line breaks) and does not modify selectors, properties, or values. The formatted CSS is functionally identical to the input - browsers apply the same styles regardless of formatting. Formatting is purely for developer readability."
    },
    {
      question: "What's the difference between expanded and compact brace styles?",
      answer: "Expanded style places the opening brace on the same line as the selector (.class {), which is the most common convention in web development and matches JavaScript/TypeScript formatting. Compact style places the opening brace on its own line (.class\\n{), similar to C# or Java. Both are valid - choose based on your team's style guide."
    },
    {
      question: "Can I format CSS with syntax errors?",
      answer: "The formatter attempts to process CSS even with minor syntax errors, but severely malformed CSS may produce unexpected output. If you see garbled results, validate your CSS syntax first using a CSS validator, fix critical errors like unclosed braces or missing semicolons, then reformat."
    },
    {
      question: "Should I use 2 spaces, 4 spaces, or tabs?",
      answer: "2 spaces is the modern web development standard used by major projects (React, Vue, Angular) and aligns with JavaScript/TypeScript conventions. 4 spaces is common in enterprise Java/C# environments and some backend-focused teams. Tabs are traditional but less common in modern web development. Choose based on your team's existing codebase and style guide."
    },
    {
      question: "Does this formatter handle CSS preprocessors like SCSS or Less?",
      answer: "This formatter is designed for standard CSS. For preprocessor syntax (SCSS, Less, Sass), use preprocessor-specific formatters that understand nesting, mixins, and variables. If you paste SCSS into this formatter, it will attempt to format it as CSS, which may produce incorrect results for preprocessor-specific features."
    },
    {
      question: "Is my CSS data private when using this tool?",
      answer: "Absolutely. All CSS formatting happens entirely in your browser using client-side JavaScript. Your stylesheets never leave your device or get sent to any servers. There are no uploads, no storage, and no analytics tracking. Safe for proprietary CSS, custom frameworks, or confidential client projects."
    },
    {
      question: "Can I format large CSS files (100KB+)?",
      answer: "Yes, this formatter handles CSS files up to several megabytes depending on your browser's memory. Processing is instant for typical stylesheets (5-50KB). Very large files (500KB+) may take 1-2 seconds. For massive CSS bundles, consider splitting them into logical modules before formatting."
    },
    {
      question: "Does this preserve CSS comments?",
      answer: "Yes, all CSS comments (/* comment */) are preserved in their original positions. The formatter adjusts spacing around comments to match your chosen indentation level, but comment content remains unchanged. This preserves documentation, license headers, and explanatory notes."
    },
    {
      question: "How do I format inline CSS from HTML?",
      answer: "Extract the CSS from the style attribute or <style> tag, paste it into the formatter, format it, then paste it back. For example, if you have <div style=\"margin:0;padding:10px\">, extract margin:0;padding:10px, format it, and get properly spaced CSS. The formatter focuses on CSS syntax, not HTML parsing."
    },
    {
      question: "Can I minify CSS instead of formatting it?",
      answer: "This tool focuses on formatting (beautifying) CSS. For minification, use dedicated CSS minifiers like cssnano or clean-css which remove all whitespace, comments, and optimize selectors for production. Minification is the opposite of formatting - it sacrifices readability for smaller file sizes."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your CSS code never leaves your browser. This formatter operates entirely client-side using JavaScript processing in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All CSS formatting happens in your browser's JavaScript engine. Your stylesheets stay on your device.
- **No Server Uploads:** We don't have servers to process CSS. The tool works completely offline after first load.
- **No Data Storage:** Your CSS is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what CSS you format, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the formatter safe for sensitive use cases like formatting proprietary CSS frameworks, custom design systems, client-specific stylesheets, or any CSS that must remain confidential. Use with confidence for production debugging, security audits, or handling regulated data.`
  },

  stats: {
    "Processing": "<50ms",
    "Max Size": "5MB",
    "Styles": "3",
    "Privacy": "100%"
  }
};
