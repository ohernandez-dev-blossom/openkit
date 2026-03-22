/**
 * Markdown Table Generator Tool Guide Content
 * Comprehensive developer guide for creating Markdown tables
 */

import type { ToolGuideContent } from "./types";

export const markdownTableGuideContent: ToolGuideContent = {
  toolName: "Markdown Table Generator",
  toolPath: "/markdown-table",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Define Table Structure",
      description: "Set number of rows and columns for your table. Start with basic structure then populate cells with content. Add or remove rows/columns dynamically as content needs change."
    },
    {
      title: "Enter Cell Content",
      description: "Type data into each cell using spreadsheet-like interface. Support for text, numbers, links, code snippets, and inline Markdown formatting. Navigate cells with keyboard or mouse."
    },
    {
      title: "Configure Alignment",
      description: "Set column alignment (left, center, right) controlling text positioning. Use left for text, right for numbers, center for status indicators. Alignment specified in Markdown syntax."
    },
    {
      title: "Copy Markdown Output",
      description: "Click copy to grab properly formatted Markdown table syntax. Paste directly into README files, documentation, GitHub issues, or any Markdown editor. Renders correctly in all Markdown processors."
    }
  ],

  introduction: {
    title: "What are Markdown Tables?",
    content: `Markdown tables use pipe (|) and dash (-) characters creating plain-text formatted tables rendering as HTML tables in Markdown processors. GitHub, GitLab, Bitbucket, Notion, and documentation generators support Markdown table syntax enabling structured data presentation in README files, documentation, and technical writing without HTML.

Table syntax uses pipes separating columns, dashes defining header rows, and colons controlling alignment. Simple format creates portable tables working across all Markdown platforms. Plain text remains readable even without rendering - useful for viewing raw Markdown files in text editors or version control diffs.

### Why Developers Use Markdown Tables

**Documentation and README Files:** Technical documentation requires tables showing API endpoints, configuration options, command-line flags, or feature comparisons. Markdown tables integrate seamlessly with GitHub/GitLab README files. Display library comparison charts, version compatibility matrices, or environment variable references directly in repository documentation without external tools.

**GitHub Issues and Pull Requests:** Bug reports benefit from tables showing test environments, reproduction steps, or error comparisons. Feature proposals use tables comparing implementation approaches. Pull request descriptions include tables summarizing changes across files or components. Markdown table syntax works in GitHub comments, issue descriptions, and PR templates.

**Technical Specifications:** API documentation uses tables documenting endpoints, parameters, response codes, and error messages. Database schemas show column names, data types, constraints, and descriptions in tabular format. Configuration guides list settings, default values, valid ranges, and explanations. Tables organize complex technical information for clear reference.

**Comparison and Decision Matrices:** Compare frameworks, libraries, hosting providers, or architectural approaches in tabular format. List features across rows, options across columns, checkmarks/crosses showing support. Decision matrices help teams evaluate trade-offs documenting pros/cons systematically. Tables make comparisons scannable and objective.

**Project Tracking and Dashboards:** Embed tables in project documentation tracking task status, assignments, and deadlines. Simple project management in Markdown files version-controlled with code. Track API deprecations, migration status, or feature rollout progress in README tables updated via commits. Lightweight alternative to external project management tools for small teams.

### Markdown Table Syntax Fundamentals

**Basic Structure:** Pipes (|) separate columns, dashes create header separator row, newlines define rows. Minimum table requires header row, separator row, and one data row. Clean syntax remains readable in plain text while rendering as formatted tables in Markdown viewers.

\`\`\`markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell A1  | Cell B1  | Cell C1  |
| Cell A2  | Cell B2  | Cell C2  |
\`\`\`

**Column Alignment:** Colons in separator row control text alignment. Left-aligned (default): \`|----------|\`, center-aligned: \`|:--------:|\`, right-aligned: \`|---------:|\`. Alignment improves readability - right-align numbers, center boolean values, left-align text descriptions.

**Content Formatting:** Cells support inline Markdown: bold (**text**), italic (*text*), code (\`code\`), and links ([text](url)). Cannot nest block elements (paragraphs, lists, headers) inside cells. For complex content, use HTML tables instead of Markdown syntax.

### Markdown Table Limitations

**No Cell Merging:** Markdown tables don't support colspan/rowspan merging cells. Each cell is independent. For merged cells, use HTML table syntax or restructure data avoiding merges. Keep tables simple - complex layouts exceed Markdown table capabilities.

**No Multiline Content:** Cell content must fit single line. Linebreaks inside cells break table structure in most Markdown processors. For multiline content, use HTML \`<br>\` tags or restructure table putting lengthy content outside table with reference links.

**Variable Renderer Support:** Different Markdown processors (GitHub Flavored Markdown, CommonMark, Markdown Extra) have slight syntax variations. Most support basic pipe tables. Complex features like alignment or formatting may render differently. Test tables in target platform ensuring correct display.

This tool generates properly formatted Markdown tables with correct syntax, alignment, and structure. Visual editor simplifies table creation compared to manually typing pipes and dashes. Ensures syntax correctness preventing formatting errors breaking table rendering.

### Common Development Use Cases

**API Documentation:** Document REST endpoints with request/response examples. Table columns: Method, Endpoint, Parameters, Response Code, Description. Each row represents one API route. Clear reference for backend and frontend developers integrating APIs.

**Configuration Reference:** List environment variables, config file options, or feature flags. Columns: Setting Name, Type, Default Value, Description. Developers reference table when configuring applications without digging through source code.

**Test Case Matrices:** Track test coverage with tables showing features (rows) vs. test types (columns). Checkmarks indicate test existence. Identify coverage gaps at a glance. Update table as tests are added documenting testing progress.

**Changelog Tables:** Organize release notes in tabular format. Columns: Version, Date, Changes, Breaking Changes. Readers quickly scan version history finding relevant releases. More structured than free-form changelog text.`
  },

  useCases: [
    {
      title: "Document API Endpoints in README",
      description: "Create comprehensive API reference tables showing HTTP methods, endpoints, parameters, and descriptions. Embed directly in repository README for easy developer reference without external API documentation platforms.",
      example: `# API Reference

| Method | Endpoint | Parameters | Description |
|--------|----------|------------|-------------|
| GET | \`/api/users\` | \`?page=1&limit=10\` | Fetch paginated user list |
| POST | \`/api/users\` | \`{name, email}\` | Create new user account |
| GET | \`/api/users/:id\` | \`id\` (path param) | Get single user by ID |
| PUT | \`/api/users/:id\` | \`id, {name, email}\` | Update user information |
| DELETE | \`/api/users/:id\` | \`id\` (path param) | Delete user account |

// Markdown table renders in GitHub README
// Developers reference endpoints while coding`
    },
    {
      title: "Compare Libraries and Frameworks",
      description: "Build feature comparison tables helping teams evaluate technology choices. List frameworks in columns, features in rows, checkmarks showing support. Objective comparison matrix documenting technical trade-offs for architectural decisions.",
      example: `# Framework Comparison

| Feature | React | Vue | Angular | Svelte |
|---------|:-----:|:---:|:-------:|:------:|
| Virtual DOM | ✓ | ✓ | ✗ | ✗ |
| TypeScript | ✓ | ✓ | ✓ | ✓ |
| CLI Tool | ✓ | ✓ | ✓ | ✓ |
| Size (gzip) | 42KB | 34KB | 167KB | 7KB |
| Learning Curve | Medium | Low | High | Low |

// Decision matrix helping team choose framework
// Centralized comparison in repository docs`
    },
    {
      title: "Track Configuration Variables",
      description: "Document environment variables and configuration options in tabular format. Developers reference table when setting up local environments, configuring deployments, or troubleshooting configuration issues.",
      example: `# Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| \`DATABASE_URL\` | string | - | PostgreSQL connection string |
| \`PORT\` | number | 3000 | Server listening port |
| \`NODE_ENV\` | enum | development | Environment: development/production/test |
| \`LOG_LEVEL\` | enum | info | Logging level: debug/info/warn/error |
| \`JWT_SECRET\` | string | - | Secret key for JWT signing |
| \`RATE_LIMIT\` | number | 100 | Max requests per minute |

// Configuration reference in README
// Developers copy correct variable names avoiding typos`
    },
    {
      title: "Create Compatibility Matrices",
      description: "Show version compatibility across dependencies, platforms, or browser support. Table documents which versions work together preventing integration issues. Update table as new versions release maintaining accurate compatibility reference.",
      example: `# Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|:------:|:-------:|:------:|:----:|
| CSS Grid | 57+ | 52+ | 10.1+ | 16+ |
| ES Modules | 61+ | 60+ | 11+ | 16+ |
| WebGL 2.0 | 56+ | 51+ | 15+ | 79+ |
| WebSockets | 16+ | 11+ | 7+ | 12+ |
| IndexedDB | 24+ | 16+ | 10+ | 12+ |

// Browser support matrix in README
// Frontend team references minimum versions`
    }
  ],

  howToUse: {
    title: "How to Use the Markdown Table Generator",
    content: `This tool provides visual table editor generating properly formatted Markdown syntax. Build tables using spreadsheet-like interface instead of manually typing pipes and dashes ensuring correct syntax.

### Creating New Tables

Set initial table dimensions specifying row and column count. Start with estimated size - add or remove rows/columns later as content needs change. Click 'Create Table' generating empty grid ready for data entry. Interface shows preview of Markdown output updating in real-time as you type.

Enter content directly into cells clicking or tabbing between fields. Support for text, numbers, inline Markdown formatting (bold, italic, code, links). Press Tab to move to next cell, Shift+Tab for previous cell. Enter key moves to cell below. Keyboard navigation speeds data entry for large tables.

### Configuring Column Alignment

Select alignment for each column independently: left-aligned (default for text), center-aligned (status indicators, icons), or right-aligned (numbers, percentages). Click alignment buttons above each column or use dropdown menu. Alignment changes immediately update Markdown syntax output.

Proper alignment improves table readability. Right-align numeric columns (prices, counts, percentages) for easier comparison. Center boolean values (✓/✗, Yes/No) creating balanced visual appearance. Left-align text descriptions maintaining natural reading flow.

### Adding and Removing Rows/Columns

Use toolbar buttons adding rows (insert below current row) or columns (append to right). Delete rows/columns via context menu or delete buttons. Drag to reorder rows changing sequence without retyping content. Dynamic editing lets you refine table structure matching content organization needs.

Add header rows with bold text or additional separator rows for section grouping. Insert rows mid-table for new entries without rebuilding entire table. Remove rows deleting obsolete information maintaining table relevance.

### Formatting Cell Content

Apply inline Markdown formatting within cells: **bold text**, *italic text*, \`inline code\`, and [hyperlinks](url). Format enhances readability highlighting important values or linking to related documentation. Preview shows formatted rendering while editing.

Use backticks for code identifiers (\`DATABASE_URL\`), bold for emphasis (**required**), italic for notes (*deprecated*). Combine formatting when needed: **\`required string\`** for emphasized code. Keep formatting minimal - excessive styling reduces table clarity.

### Copying and Exporting

Click 'Copy Markdown' button grabbing formatted table syntax to clipboard. Paste directly into README.md files, GitHub issues, GitLab merge requests, or any Markdown editor. Syntax renders correctly in all standard Markdown processors.

Export as plain text file for offline editing or version control commits. Some tools support CSV import - export table as CSV then import to spreadsheet applications for further manipulation. Keep Markdown source as single source of truth for documentation.

### Best Practices

**Keep Tables Simple:** Complex multi-header or deeply nested tables exceed Markdown capabilities. Use HTML tables for complex layouts. Markdown tables work best for straightforward data grids with single header row.

**Limit Column Count:** Wide tables with 10+ columns become unreadable on narrow screens. Break large tables into multiple smaller tables or restructure data. Consider alternative layouts (lists, multiple tables) for highly dimensional data.

**Consistent Formatting:** Use consistent units, date formats, and terminology across table cells. Inconsistent formatting confuses readers. Document units in column headers (e.g., "Price (USD)" or "Size (MB)").

**Update Regularly:** Outdated tables mislead developers. Review and update tables when dependencies change, APIs evolve, or configurations are modified. Include table updates in pull requests changing documented features.`,
    steps: [
      {
        name: "Set Dimensions",
        text: "Specify row and column count creating table structure. Start with estimated size - dynamically add/remove rows and columns later as content evolves."
      },
      {
        name: "Fill Cell Data",
        text: "Type content into cells using spreadsheet interface. Support for text, numbers, inline Markdown formatting. Navigate with keyboard or mouse for efficient data entry."
      },
      {
        name: "Configure Alignment",
        text: "Set column alignment (left, center, right) improving readability. Right-align numbers, center status values, left-align text. Alignment controls text positioning in rendered tables."
      },
      {
        name: "Copy Markdown",
        text: "Click copy button grabbing formatted Markdown table syntax. Paste into README files, documentation, GitHub issues. Syntax renders correctly in all Markdown platforms."
      }
    ]
  },

  faqs: [
    {
      question: "What Markdown platforms support table syntax?",
      answer: "GitHub Flavored Markdown (GitHub, GitLab, Bitbucket), CommonMark extensions, Markdown Extra (used by many static site generators), Notion, Discord, Slack (partial support), Obsidian, Typora, and most documentation generators (MkDocs, Docusaurus, Jekyll) support Markdown tables. Syntax may vary slightly - GitHub style (pipe tables) is most widely supported. Test tables in your target platform confirming correct rendering."
    },
    {
      question: "How do I add multiline content in table cells?",
      answer: "Markdown tables don't natively support multiline cell content. Workarounds: use HTML \`<br>\` tags for line breaks within cells (\`Line 1<br>Line 2\`), use HTML table syntax instead of Markdown for complex content, or restructure table putting lengthy content outside table with reference numbers/links in cells. Keep cell content concise - tables work best for short data values not paragraphs."
    },
    {
      question: "Can I merge cells or create nested headers in Markdown tables?",
      answer: "No, standard Markdown tables don't support colspan/rowspan cell merging or multi-level headers. Each cell is independent. For merged cells, use HTML table syntax with \`<table>\`, \`<th colspan='2'>\`, etc. Or restructure data avoiding merges - use separate tables, section headers, or nested lists. Keep Markdown tables simple - complex layouts require HTML."
    },
    {
      question: "Why doesn't my table alignment work on some platforms?",
      answer: "Alignment syntax (colons in separator row) is part of GitHub Flavored Markdown and Markdown Extra but not original Markdown spec. Some processors ignore alignment. Use \`|:-----|\` for left (default), \`|:----:|\` for center, \`|-----:|\` for right. Test in target platform - GitHub, GitLab, and most modern processors support alignment. If alignment doesn't work, your processor may not support extended syntax."
    },
    {
      question: "How do I make tables responsive for mobile documentation?",
      answer: "Markdown tables don't have built-in responsiveness - they render as standard HTML tables which can overflow on narrow screens. Solutions: limit column count (4-5 max for mobile), use shorter column headers, consider alternative layouts (definition lists, stacked cards) for mobile-first docs, or add custom CSS in your documentation theme making tables horizontally scrollable. Keep essential information in first columns - mobile users may not scroll horizontally."
    },
    {
      question: "Can I use images or emojis in Markdown tables?",
      answer: "Yes, insert images with Markdown syntax \`![alt](image-url)\` or HTML \`<img src='url'>\`. Use emojis directly (copy/paste Unicode: ✓ ✗ ⚠️) or emoji codes if platform supports them. Images increase cell height potentially breaking alignment. Use small icons or emojis for status indicators. For large images, link from cells instead of embedding: \`[View Screenshot](url)\`."
    },
    {
      question: "How do I convert Excel or CSV data to Markdown tables?",
      answer: "Export spreadsheet as CSV, then use CSV-to-Markdown converter tools or paste into this generator's interface if it supports CSV import. Alternatively, copy cells from Excel/Sheets, paste into text editor seeing tab-separated values, replace tabs with pipes manually or via search/replace. Some tools offer direct Excel import. For ongoing sync, consider embedding CSV data rendering as tables in documentation generators."
    },
    {
      question: "What's the best way to maintain large tables in version control?",
      answer: "Keep tables readable in diffs by aligning pipe characters vertically (use monospace editor). This helps reviewers see cell changes clearly. Commit table updates separately from code changes isolating documentation updates. For very large tables (100+ rows), consider storing data in CSV/JSON files and generating Markdown tables via build script - easier to maintain and version control shows structured data diffs."
    },
    {
      question: "How do I document empty or optional cells in tables?",
      answer: "Leave cells empty with just pipes: \`| | |\` - renders as blank cell. For optional values use dash: \`| - |\` or text: \`| Optional |\`, \`| N/A |\`. For missing data awaiting update use: \`| TBD |\` or \`| ? |\`. Be consistent - use same notation for empty cells throughout table. Document meaning of empty cells in table caption or introduction if ambiguous."
    },
    {
      question: "Is my table data private when using this generator?",
      answer: "Absolutely. All table generation happens entirely in your browser using JavaScript DOM manipulation. Your table content never uploads to servers. No network requests are made with your data. Verify by checking browser DevTools Network tab showing zero outbound requests. Safe for confidential documentation, proprietary API specs, internal configuration references, or any sensitive technical content. Works completely offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your table content never leaves your browser. This Markdown table generator operates entirely client-side using JavaScript form handling and text formatting. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All table creation, editing, and Markdown generation happen locally in your browser. Your content stays on your device.
- **No Server Communication:** We don't have backend services processing tables. The tool works completely offline after initial page load.
- **No Data Storage:** Your table content, cell values, and generated Markdown are not saved, logged, or transmitted anywhere. Close the tab and it's gone.
- **No Content Tracking:** We don't track what you create, table sizes, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your table data.

Safe for creating documentation with confidential API specs, proprietary configuration tables, internal technical references, sensitive comparison matrices, or any private content. Generate unlimited Markdown tables with complete data privacy.`
  },

  stats: {
    "Output Format": "Markdown",
    "Alignment Options": "3",
    "Processing": "Client-side",
    "Platform Support": "Wide",
    "Data Upload": "0 bytes"
  }
};
