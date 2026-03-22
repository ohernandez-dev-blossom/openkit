/**
 * Markdown Formatter Tool Guide Content
 * Comprehensive developer guide for Markdown formatting
 */

import type { ToolGuideContent } from "./types";

export const markdownGuideContent: ToolGuideContent = {
  toolName: "Markdown Formatter",
  toolPath: "/markdown",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your Markdown Content",
      description: "Copy your Markdown from README files, documentation, blog posts, or note-taking apps and paste it into the input panel. The formatter handles CommonMark, GitHub Flavored Markdown (GFM), and extended syntax."
    },
    {
      title: "Choose Formatting Style",
      description: "Select your preferred style conventions: list marker type (- or *), heading style (ATX # or Setext underline), and line width for wrapping long paragraphs."
    },
    {
      title: "Format Automatically",
      description: "The formatter processes your Markdown instantly, applying consistent heading styles, list formatting, code block syntax, and table alignment for professional documentation."
    },
    {
      title: "Copy or Export Result",
      description: "Click Copy to copy formatted Markdown to clipboard, ready for GitHub, documentation sites, or content management systems."
    }
  ],

  introduction: {
    title: "What is Markdown?",
    content: `Markdown is a lightweight markup language created by John Gruber in 2004 for writing formatted text using plain text syntax. Designed to be readable as-is and convertible to HTML, Markdown has become the universal standard for technical documentation, README files, developer blogs, and knowledge bases.

Markdown uses simple punctuation-based syntax for formatting: asterisks for emphasis (*italic*, **bold**), hashes for headings (# H1, ## H2), and brackets for links ([text](url)). This simplicity makes Markdown easy to learn, fast to write, and version-control friendly since it's plain text.

### Why Markdown Matters for Developers

Markdown is the documentation standard across the software development ecosystem. GitHub, GitLab, and Bitbucket render README.md files as formatted documentation for every repository. Well-formatted Markdown READMEs are essential for open source projects - they're the first thing developers see and determine whether they'll use your library.

Static site generators (Jekyll, Hugo, Gatsby, Next.js) use Markdown for blog posts, documentation sites, and content pages. Developers write content in Markdown, and build tools convert it to HTML with syntax highlighting, table of contents, and responsive layouts. Major documentation platforms (Read the Docs, GitBook, Docusaurus) are Markdown-based.

Developer tools integrate Markdown everywhere: Jira and Linear for ticket descriptions, Slack and Discord for formatted messages, Notion and Obsidian for note-taking, and Stack Overflow for questions and answers. Consistent Markdown formatting improves readability across all these platforms.

### Key Markdown Features

**Headings:** ATX style uses hashes (# H1, ## H2, ### H3) up to six levels. Setext style underlines headings with equals signs or dashes. ATX style is more popular and explicit about heading hierarchy.

**Emphasis:** Asterisks or underscores for *italic* and **bold** text. Single asterisk/underscore for italic, double for bold, triple for ***bold italic***. Asterisks are more widely supported than underscores.

**Lists:** Unordered lists use -, *, or + as markers. Ordered lists use numbers (1., 2., 3.). Nested lists require proper indentation (2 or 4 spaces). Consistency in list markers improves readability.

**Code:** Inline code uses backticks (\`code\`), code blocks use triple backticks with optional language identifier (\`\`\`javascript). GitHub Flavored Markdown adds syntax highlighting for 100+ languages.

**Links and Images:** Links use [text](url) syntax, images use ![alt](url). Reference-style links ([text][ref]) keep URLs separate for cleaner text, useful in long documents.

### Markdown Flavors

CommonMark is the standardized Markdown specification that resolves ambiguities in the original spec. GitHub Flavored Markdown (GFM) extends CommonMark with tables, task lists, strikethrough, and autolinked URLs. Most platforms support GFM. Markdown formatters ensure your syntax works consistently across flavors by following strict standards.`
  },

  useCases: [
    {
      title: "Format README Files",
      description: "GitHub README files are the face of your project. Format Markdown consistently for professional documentation that attracts contributors and users.",
      example: `# Project Name

## Installation

\`\`\`bash
npm install project-name
\`\`\`

## Usage

Import the library in your project:

\`\`\`javascript
import { feature } from 'project-name';
\`\`\`

## Features

- Feature 1: Fast performance
- Feature 2: Simple API
- Feature 3: TypeScript support`
    },
    {
      title: "Clean Documentation Exports",
      description: "Convert documentation from Notion, Confluence, or Google Docs to clean Markdown. Format consistently before committing to docs/ folders or publishing to documentation sites.",
      example: `## API Reference

### \`authenticate(credentials)\`

Authenticates a user with the provided credentials.

**Parameters:**

- \`credentials.email\` (string): User email
- \`credentials.password\` (string): User password

**Returns:** Promise<AuthToken>

**Example:**

\`\`\`typescript
const token = await authenticate({
  email: 'user@example.com',
  password: 'secure123'
});
\`\`\``
    },
    {
      title: "Standardize Blog Posts",
      description: "Static site generators (Gatsby, Next.js, Hugo) use Markdown for blog content. Format posts consistently for professional publishing with proper heading hierarchy and code formatting.",
      example: `---
title: "Building Scalable APIs"
date: 2024-02-01
author: "Jane Developer"
---

## Introduction

Building scalable APIs requires careful architecture decisions...

## Best Practices

1. Use RESTful conventions
2. Implement rate limiting
3. Add comprehensive error handling`
    },
    {
      title: "Format Technical Notes",
      description: "Developer note-taking apps (Obsidian, Notion, Bear) use Markdown. Format technical notes consistently for better knowledge management and searchability.",
      example: `# Database Migration Strategy

## Problem

Legacy PostgreSQL 11 needs upgrade to 14 for performance.

## Solution

**Phase 1:** Replicate to new cluster
**Phase 2:** Run both databases in parallel
**Phase 3:** Switch reads to new cluster
**Phase 4:** Deprecate old cluster

## Risks

- Data inconsistency during replication
- Increased infrastructure costs during transition`
    }
  ],

  howToUse: {
    title: "How to Use This Markdown Formatter",
    content: `This Markdown formatter provides instant client-side formatting with zero server uploads. All processing happens in your browser using Markdown parsing and normalization, ensuring your content remains private and processing is instantaneous.

### Basic Formatting Workflow

Copy your Markdown from any source (README, documentation, notes, blog posts) and paste it into the input panel. The formatter accepts all Markdown syntax including headings, lists, code blocks, tables, links, images, and blockquotes.

Configure formatting preferences: choose list marker style (- or *), heading style (ATX # or Setext), line width for paragraph wrapping, and whether to enforce consistent blank lines between sections.

The formatter processes your Markdown instantly, applying consistent formatting rules: normalized heading styles, aligned tables, properly indented lists, and consistent code block delimiters. The output is clean, professional Markdown ready for GitHub or documentation sites.

### Advanced Features

**Heading Normalization:** Convert all headings to consistent style (ATX # preferred for explicit hierarchy). Ensure proper spacing before/after headings for visual separation.

**List Formatting:** Standardize list markers across the document (- preferred over * for compatibility). Fix indentation for nested lists (2 or 4 spaces consistently).

**Table Alignment:** Format Markdown tables with aligned columns for readability in plain text. Adjust column widths to fit content while maintaining ASCII table structure.

**Code Block Syntax:** Ensure code blocks use triple backticks with language identifiers for syntax highlighting. Validate that inline code uses single backticks correctly.

### Best Practices

Use consistent Markdown style across all documentation in your project. Format README files before publishing to GitHub for professional appearance. Preview formatted Markdown in your target platform (GitHub, GitLab, documentation site) to verify rendering. Keep line length under 80-100 characters for better diff readability in version control. Use reference-style links for documents with many repeated URLs to improve source readability.`,
    steps: [
      {
        name: "Paste Markdown Content",
        text: "Copy your Markdown from README files, documentation, or notes and paste it into the input panel."
      },
      {
        name: "Set Formatting Preferences",
        text: "Choose list marker style, heading format, line width, and spacing preferences to match your project conventions."
      },
      {
        name: "Review Formatted Output",
        text: "The formatter processes Markdown instantly. Review the formatted output for consistent style and proper structure."
      },
      {
        name: "Copy or Export",
        text: "Click Copy to copy formatted Markdown, ready for GitHub, documentation sites, or publishing platforms."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between CommonMark and GitHub Flavored Markdown?",
      answer: "CommonMark is the standardized Markdown specification that resolves ambiguities in the original Markdown. GitHub Flavored Markdown (GFM) extends CommonMark with additional features: tables, task lists (- [ ] todo), strikethrough (~~text~~), and automatic URL linking. Most modern platforms support GFM. This formatter follows GFM standards for maximum compatibility."
    },
    {
      question: "Should I use ATX (#) or Setext (underline) headings?",
      answer: "ATX headings (# H1, ## H2, ### H3) are recommended because they explicitly show heading level up to six levels, work in nested contexts, and are more widely supported. Setext headings (underlined with === or ---) only support two levels and can be confused with horizontal rules. Use ATX for consistency and compatibility."
    },
    {
      question: "Can this formatter convert Markdown to HTML?",
      answer: "No, this tool formats Markdown to produce cleaner, more consistent Markdown. For Markdown to HTML conversion, use dedicated converters like marked, markdown-it, or remark. Most static site generators and documentation platforms handle Markdown to HTML conversion automatically during build."
    },
    {
      question: "How do I format tables in Markdown?",
      answer: "Markdown tables use pipes (|) to separate columns and hyphens to define the header row. This formatter aligns columns for readability: | Column 1 | Column 2 | \\n|----------|----------|\\n| Value 1  | Value 2  |. GitHub and most platforms render this as an HTML table with proper styling."
    },
    {
      question: "Does this preserve frontmatter (YAML metadata)?",
      answer: "Yes, YAML frontmatter (--- delimited metadata at the top of files) is preserved exactly as written. The formatter recognizes frontmatter used by static site generators (Jekyll, Hugo, Gatsby) and doesn't modify it, ensuring your metadata, titles, dates, and tags remain intact."
    },
    {
      question: "Is my Markdown content private when using this tool?",
      answer: "Absolutely. All Markdown formatting happens entirely in your browser using client-side JavaScript. Your content never leaves your device or gets sent to any servers. No uploads, no storage, no analytics tracking. Safe for confidential documentation, private notes, or proprietary content."
    },
    {
      question: "Can I format Markdown with HTML embedded?",
      answer: "Yes, Markdown allows embedded HTML for advanced formatting. This formatter preserves HTML blocks and inline HTML tags exactly as written while formatting surrounding Markdown. However, for best cross-platform compatibility, prefer pure Markdown over HTML where possible."
    },
    {
      question: "What line width should I use for Markdown?",
      answer: "80 characters is the traditional standard for plain text, making diffs readable and fitting on narrow screens. Modern developers often use 100-120 characters for code. For Markdown, 80-100 characters works well for paragraphs. Code blocks and tables can exceed this naturally. The formatter can wrap long paragraphs to your preferred width."
    },
    {
      question: "How do I format code blocks with syntax highlighting?",
      answer: "Use triple backticks with a language identifier: ```javascript or ```python. GitHub and most platforms apply syntax highlighting automatically based on the identifier. This formatter ensures code blocks use proper triple-backtick syntax instead of indented code blocks (which lack language specification)."
    },
    {
      question: "Can this fix broken Markdown links?",
      answer: "No, this formatter preserves link URLs exactly as written and only adjusts formatting/spacing. Broken links (404 errors, incorrect URLs) require manual fixing. Use link checking tools (markdown-link-check) to detect broken links, fix them, then use this formatter for clean Markdown output."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your Markdown content never leaves your browser. This formatter operates entirely client-side using JavaScript Markdown parsing in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All Markdown formatting happens in your browser's JavaScript engine. Your content stays on your device.
- **No Server Uploads:** We don't have servers to process Markdown. The tool works completely offline after first load.
- **No Data Storage:** Your Markdown is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what Markdown you format, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the formatter safe for sensitive use cases like confidential documentation, internal knowledge bases, private project READMEs, or any content that must remain confidential. Use with confidence for proprietary documentation, client projects, or personal notes.`
  },

  stats: {
    "Processing": "<50ms",
    "Formats": "GFM",
    "Max Size": "5MB",
    "Privacy": "100%"
  }
};
