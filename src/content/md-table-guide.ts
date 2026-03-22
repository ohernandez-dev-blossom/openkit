/**
 * Markdown Table Tool Guide Content
 * Comprehensive developer guide for Markdown table manipulation
 */

import type { ToolGuideContent } from "./types";

export const mdTableGuideContent: ToolGuideContent = {
  toolName: "Markdown Table Editor",
  toolPath: "/md-table",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Import or Create Table",
      description: "Paste existing Markdown table syntax or create new table from scratch. Import from CSV, JSON, or TSV formats. Visual editor parses table structure automatically showing editable grid interface."
    },
    {
      title: "Edit Table Content",
      description: "Click cells to edit content directly. Add or remove rows and columns dynamically. Drag column headers to reorder. Support for inline Markdown formatting (bold, italic, code, links) within cells."
    },
    {
      title: "Format and Align",
      description: "Set column alignment (left, center, right) for each column independently. Enable pretty formatting with aligned pipes for readable source. Configure border styles and spacing."
    },
    {
      title: "Export Markdown",
      description: "Copy formatted Markdown table syntax for README files, documentation, or GitHub issues. Export as CSV, JSON, or HTML for use in other tools. Syntax works across all Markdown platforms."
    }
  ],

  introduction: {
    title: "What is Markdown Table Editing?",
    content: `Markdown table editing provides visual interface for creating and modifying Markdown table syntax without manually typing pipes and dashes. Text-based table syntax is error-prone - misaligned pipes break rendering, missing dashes corrupt structure. Visual editors show spreadsheet-like grids simplifying complex table creation while generating syntactically correct Markdown.

Developers need tables in README files, technical documentation, and GitHub issues. Typing raw Markdown table syntax is tedious and fragile. One misplaced pipe character breaks entire table. Visual editors eliminate syntax errors, provide WYSIWYG editing, and format output consistently. Edit tables like spreadsheets, export correct Markdown syntax automatically.

### Why Developers Need Markdown Table Tools

**README Documentation:** Repository README files document APIs, configuration options, dependencies, and compatibility matrices. Tables organize structured data clearly. Manual Markdown table syntax is time-consuming and error-prone. Visual editors speed table creation ensuring proper formatting. Update documentation tables as APIs evolve without fighting Markdown syntax.

**Technical Specifications:** API documentation lists endpoints, parameters, response codes, and error messages in tabular format. Database schemas show columns, types, constraints, and descriptions. Configuration guides document settings, defaults, and valid values. Tables structure technical information for quick reference. Visual editing simplifies maintaining complex specification tables.

**Comparison Matrices:** Compare frameworks, libraries, hosting providers, or architectural approaches using feature comparison tables. List options across columns, features across rows. Visual editor makes creating and updating comparison matrices efficient. Modify tables as new options emerge or features change without manually realigning Markdown syntax.

**Data Import and Export:** Convert spreadsheet data (CSV, Excel) to Markdown tables for documentation. Import existing data avoiding manual transcription. Export Markdown tables to CSV for analysis in spreadsheet applications. Bidirectional conversion integrates Markdown documentation with data tools. Maintain single source of truth converting between formats as needed.

**GitHub Issue Templates:** Project issue templates include tables for bug reports, feature requests, or environment information. Contributors fill table cells with details. Visual editor creates template tables with proper structure. Ensures consistent issue format across project helping maintainers triage efficiently.

### Markdown Table Syntax Challenges

**Manual Alignment:** Hand-typing Markdown tables creates inconsistent pipe alignment making source hard to read:

\`\`\`markdown
| Short | Very Long Header | Mid |
| - | - | - |
| A | B | C |
\`\`\`

Misaligned pipes readable to parsers but painful for humans editing raw Markdown. Visual editors format output with aligned columns:

\`\`\`markdown
| Short | Very Long Header | Mid |
|-------|------------------|-----|
| A     | B                | C   |
\`\`\`

**Column Alignment Syntax:** Alignment specified in separator row using colons: \`:---\` (left), \`:---:\` (center), \`---:\` (right). Easy to forget or misplace colons. Visual editors provide alignment buttons updating syntax automatically.

**Adding Rows/Columns:** Inserting column mid-table requires editing every row adding pipe and cell content. Removing columns means deleting content from all rows. Visual editors handle structural changes across entire table automatically.

**Complex Content:** Cells with pipes, newlines, or special characters break table structure. Escaping special characters manually is error-prone. Visual editors handle escaping automatically maintaining table integrity.

This tool provides spreadsheet-like interface for Markdown tables generating syntactically correct output. Import existing tables for editing, create new tables from scratch, or convert CSV/JSON data to Markdown format. All processing client-side - your data stays private.

### Visual Editing Features

**Cell Editing:** Click any cell entering edit mode. Type text, numbers, links, or inline Markdown. Press Tab moving to next cell, Shift+Tab for previous, Enter for cell below. Keyboard navigation speeds data entry matching spreadsheet workflow familiarity.

**Row and Column Operations:** Insert rows above/below, append rows at bottom. Add columns left/right or at end. Delete rows/columns via toolbar buttons or keyboard shortcuts. Reorder columns dragging headers. Structural changes update entire table automatically.

**Formatting Controls:** Set column alignment (left, center, right) via dropdown menus or toolbar buttons. Enable "pretty formatting" aligning pipes vertically in source. Choose compact or spaced output styles. Formatting options balance readability versus compactness.

**Data Import:** Paste CSV data converting to Markdown table automatically. Import JSON arrays rendering as tables. Support for TSV (tab-separated) and other delimited formats. Data import eliminates manual transcription from spreadsheets or databases.

**Export Options:** Copy Markdown syntax to clipboard for pasting in README files. Export as CSV for Excel/Sheets analysis. Generate HTML table for web embedding. Download as plain text file. Multiple export formats maximize compatibility across tools.

### Advanced Table Operations

**Sorting:** Sort table by column values (alphabetical, numeric, date). Multi-level sorting by multiple columns. Maintain header row during sort operations. Useful for organizing data in documentation tables before export.

**Filtering:** Filter rows showing only matching values. Create documentation subsets for different audiences or use cases. Filter toggle shows/hides rows without deleting data.

**Formulas:** Simple calculations in cells (sum, average, count) for numeric data. Auto-calculate totals in summary rows. Limited compared to spreadsheets but useful for basic documentation table calculations.

**Merge Cells:** Visual indication of merged cells even though Markdown doesn't support merging. Export converts merged cells to HTML table syntax or warns about unsupported features.`
  },

  useCases: [
    {
      title: "Create API Endpoint Documentation Tables",
      description: "Document REST API endpoints with tables showing HTTP methods, paths, parameters, and descriptions. Visual editor simplifies creating and maintaining API reference tables as endpoints change. Export Markdown table for README or API documentation.",
      example: `<!-- Use visual editor to create this table: -->

| Method | Endpoint | Parameters | Description |
|--------|----------|------------|-------------|
| GET | \`/api/users\` | \`?page=1&limit=10\` | List all users with pagination |
| POST | \`/api/users\` | \`{name, email}\` | Create new user account |
| GET | \`/api/users/:id\` | \`id\` (path) | Get user by ID |
| PUT | \`/api/users/:id\` | \`id, {name, email}\` | Update user info |
| DELETE | \`/api/users/:id\` | \`id\` (path) | Delete user account |

<!-- Visual editor makes adding new endpoints easy:
     1. Click "Add Row" inserting blank row
     2. Fill cells with new endpoint details
     3. Copy updated Markdown to README
     No manual pipe alignment required -->`
    },
    {
      title: "Convert CSV Dependency List to Markdown",
      description: "Import package.json dependencies as CSV, convert to Markdown table for documentation. Visual editor parses CSV creating formatted table showing package names, versions, and descriptions. Update table as dependencies change maintaining accurate documentation.",
      example: `// Original CSV data from package analysis:
Package,Version,License,Description
react,18.2.0,MIT,UI library
typescript,5.3.0,Apache-2.0,Type system
eslint,8.55.0,MIT,Linting tool
prettier,3.1.0,MIT,Code formatter

// Import CSV into visual editor
// Automatically converts to Markdown:

| Package | Version | License | Description |
|---------|---------|---------|-------------|
| react | 18.2.0 | MIT | UI library |
| typescript | 5.3.0 | Apache-2.0 | Type system |
| eslint | 8.55.0 | MIT | Linting tool |
| prettier | 3.1.0 | MIT | Code formatter |

// Edit cells updating versions
// Export Markdown for README.md dependencies section`
    },
    {
      title: "Build Environment Variable Reference",
      description: "Create configuration documentation table listing environment variables, types, defaults, and descriptions. Visual editor makes maintaining config references simple. Update table as new variables are added or defaults change.",
      example: `<!-- Create env var reference with visual editor: -->

| Variable | Type | Default | Required | Description |
|----------|:----:|---------|:--------:|-------------|
| \`DATABASE_URL\` | string | - | ✓ | PostgreSQL connection string |
| \`PORT\` | number | 3000 | ✗ | Server listening port |
| \`NODE_ENV\` | enum | development | ✗ | Environment: dev/prod/test |
| \`LOG_LEVEL\` | string | info | ✗ | Logging: debug/info/warn/error |
| \`JWT_SECRET\` | string | - | ✓ | JWT signing secret key |

<!-- Visual editor benefits:
     - Set center alignment for "Type" and "Required" columns
     - Use inline code formatting for variable names
     - Add checkmarks/crosses easily
     - Reorder columns by dragging headers -->`
    },
    {
      title: "Maintain Browser Compatibility Matrix",
      description: "Track feature support across browsers with visual table editor. Update compatibility data as browsers release new versions. Export Markdown table for documentation showing minimum supported versions.",
      example: `<!-- Browser compatibility table created visually: -->

| Feature | Chrome | Firefox | Safari | Edge |
|---------|:------:|:-------:|:------:|:----:|
| CSS Grid | 57+ | 52+ | 10.1+ | 16+ |
| ES Modules | 61+ | 60+ | 11+ | 16+ |
| WebGL 2.0 | 56+ | 51+ | 15+ | 79+ |
| WebSockets | 16+ | 11+ | 7+ | 12+ |
| IndexedDB | 24+ | 16+ | 10+ | 12+ |
| Flexbox | 29+ | 28+ | 9+ | 12+ |

<!-- Visual editor workflow:
     1. Create table structure (features × browsers)
     2. Center-align all browser columns
     3. Fill cells with version numbers
     4. Add new features/browsers as needed
     5. Export Markdown for project README -->`
    }
  ],

  howToUse: {
    title: "How to Use the Markdown Table Editor",
    content: `This tool provides spreadsheet-like interface for creating and editing Markdown tables. Import existing tables, build new ones from scratch, or convert CSV/JSON data to Markdown format with visual editing.

### Creating New Tables

Click "New Table" specifying initial dimensions (rows and columns). Tool generates empty table grid ready for data entry. Don't worry about exact size - add or remove rows/columns later as needs change. Click any cell to start typing content.

Navigate cells using keyboard: Tab moves right, Shift+Tab moves left, Enter moves down. Arrow keys work too. Keyboard navigation speeds data entry compared to clicking each cell. Paste multi-cell data from spreadsheets - tool intelligently fills cells.

### Importing Existing Tables

**From Markdown:** Paste Markdown table syntax into import field. Tool parses syntax creating editable grid. Works with tables copied from GitHub, GitLab, documentation, or any Markdown source. Handles various formatting styles (compact, pretty-formatted, aligned).

**From CSV:** Paste CSV data or upload CSV file. First row becomes table headers. Tool auto-detects delimiters (comma, tab, semicolon). Configure import options if auto-detection fails. Useful for converting spreadsheet exports to Markdown documentation.

**From JSON:** Import JSON arrays rendering as tables. Each array element becomes row, object properties become columns. Flattens nested structures to single-level table. Converts API response data to Markdown tables for documentation.

### Editing Table Content

Click cells to edit. Type plain text, numbers, or inline Markdown: \`**bold**\`, \`*italic*\`, \`\`code\`\`, \`[links](url)\`. Visual preview shows formatted rendering while editing. Changes save automatically - no manual save button needed.

Right-click cells for context menu: insert row above/below, insert column left/right, delete row/column, clear cell content. Context menus provide quick access to common operations without toolbar navigation.

### Formatting and Alignment

Set column alignment via toolbar dropdown: left (default for text), center (status indicators), right (numbers). Alignment applies to entire column updating all cells and separator row syntax. Visual preview shows aligned rendering.

Enable "Pretty Format" option aligning pipes vertically in Markdown source. Pretty formatting improves readability of raw Markdown but increases file size. Disable for compact output. Choice doesn't affect rendered table appearance.

### Row and Column Operations

**Adding:** Toolbar buttons insert rows (above/below current) or columns (left/right of current). "Append Row" and "Append Column" add at table end. Keyboard shortcuts: Ctrl+I (insert row), Ctrl+Shift+I (insert column).

**Deleting:** Select row/column, click delete button or press Delete key. Confirm deletion preventing accidental data loss. Delete multiple rows/columns selecting range before deletion.

**Reordering:** Drag column headers moving columns left/right. Row reordering via drag handles at row start. Reordering updates entire table maintaining cell associations.

### Sorting and Filtering

Click column header sorting table by that column (alphabetical or numeric). Click again reversing sort order. Multi-column sort: shift-click additional headers. Sort updates visual editor and exported Markdown.

Filter rows showing only matching values. Enter filter criteria, table hides non-matching rows. Filtered rows excluded from export or can export all data (your choice). Clear filter showing all rows.

### Exporting Tables

**Markdown:** Copy formatted Markdown syntax to clipboard. Paste into README.md, documentation, GitHub issues. Syntax includes alignment, formatting, and proper escaping.

**CSV:** Export as CSV for analysis in Excel, Google Sheets, or databases. First row contains headers. Choose delimiter (comma, tab, semicolon) matching import tool requirements.

**HTML:** Generate HTML table markup for embedding in web pages. Includes semantic tags (\`<thead>\`, \`<tbody>\`, \`<th>\`, \`<td>\`) and alignment classes.

**Plain Text:** Export as simple text grid using spaces and lines. Useful for embedding in code comments or plain-text documentation.`,
    steps: [
      {
        name: "Import or Create",
        text: "Paste Markdown table syntax, import CSV/JSON data, or create new table from scratch. Visual editor parses structure showing spreadsheet-like grid."
      },
      {
        name: "Edit Content",
        text: "Click cells editing content directly. Add/remove rows and columns dynamically. Drag headers reordering columns. Support for inline Markdown formatting."
      },
      {
        name: "Format Table",
        text: "Set column alignment (left, center, right). Enable pretty formatting for aligned pipes. Configure spacing and border styles."
      },
      {
        name: "Export Output",
        text: "Copy Markdown syntax for README files. Export as CSV, JSON, or HTML for use in other tools. Multiple export formats maximize compatibility."
      }
    ]
  },

  faqs: [
    {
      question: "Can I import Excel or Google Sheets data directly?",
      answer: "Export spreadsheet as CSV first, then import CSV into this tool. Excel and Sheets have 'Export as CSV' or 'Download as CSV' options. Tool parses CSV creating Markdown table. Alternatively, copy cells from spreadsheet and paste - some tools auto-detect and parse. CSV is most reliable import format ensuring compatibility."
    },
    {
      question: "How do I handle cells with pipe characters or special formatting?",
      answer: "Visual editor automatically escapes pipe characters inside cells preventing syntax breaking. Type pipes normally - export escapes them as needed. For complex formatting (multiline, nested tables), Markdown tables have limitations. Consider using HTML table syntax for advanced layouts or split complex cells into multiple simpler cells."
    },
    {
      question: "Why doesn't my table alignment display correctly on GitHub?",
      answer: "Verify alignment syntax in separator row: \`:---\` (left), \`:---:\` (center), \`---:\` (right). GitHub supports alignment but some Markdown processors don't. Visual editor generates correct syntax - if GitHub doesn't render alignment, check GitHub Flavored Markdown compatibility. Test in GitHub directly - some preview tools don't support alignment."
    },
    {
      question: "Can I merge cells or create multi-level headers?",
      answer: "Standard Markdown tables don't support cell merging or multi-level headers. Each cell is independent. Visual editor may show merged cells for design but exports as separate cells or converts to HTML table syntax with colspan/rowspan. For complex tables requiring merging, use HTML \`<table>\` tags instead of Markdown syntax."
    },
    {
      question: "How do I make very wide tables readable on mobile?",
      answer: "Markdown tables don't have built-in responsiveness. Solutions: limit column count (4-5 max for mobile), use shorter headers/content, transpose table (swap rows/columns) showing less data horizontally, or split into multiple smaller tables. For mobile-friendly documentation, consider alternative layouts (definition lists, stacked sections) instead of wide tables."
    },
    {
      question: "Can I add formulas or calculations to table cells?",
      answer: "This visual editor may support basic calculations (sum, average, count) for numeric columns. However, Markdown tables display static values - formulas don't transfer. Calculate totals in editor, export static results to Markdown. For dynamic calculations, use spreadsheets generating updated CSV data for import. Markdown tables are for display, not computation."
    },
    {
      question: "How do I convert Markdown tables back to CSV for Excel?",
      answer: "Paste Markdown table into visual editor (or import if already present). Editor parses table structure. Use 'Export as CSV' option downloading CSV file. Open in Excel, Google Sheets, or any spreadsheet application. Useful for editing complex tables in spreadsheet tools, then converting back to Markdown for documentation."
    },
    {
      question: "What's the difference between compact and pretty-formatted Markdown tables?",
      answer: "Compact format minimizes whitespace: \`|H1|H2|\\n|-|-|\\n|A|B|\`. Pretty format aligns pipes vertically: \`| H1  | H2  |\\n|-----|-----|\\n| A   | B   |\`. Both render identically in Markdown processors. Pretty format is more readable in plain text editors. Compact format is smaller for version control diffs. Choose based on team preference."
    },
    {
      question: "Can I use this tool for creating tables in Notion or Obsidian?",
      answer: "Yes, Notion and Obsidian support Markdown table syntax. Create or edit table in visual editor, copy Markdown output, paste into Notion/Obsidian. Tables render correctly. However, these platforms have native table editors - you may prefer their built-in tools. Use this tool for batch conversion, CSV import, or editing complex tables more efficiently than native interfaces."
    },
    {
      question: "Is my table data private when using this editor?",
      answer: "Absolutely. All table editing, parsing, and export happen entirely in your browser using JavaScript. Your table content never uploads to servers. No network requests are made with your data. Verify by checking browser DevTools Network tab showing zero outbound requests. Safe for confidential documentation, proprietary API specs, internal configuration data, or any sensitive tables. Works completely offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your table data never leaves your browser. This Markdown table editor operates entirely client-side using JavaScript array manipulation and text parsing. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All table creation, editing, import, and export happen locally in your browser. Your data stays on your device.
- **No Server Communication:** We don't have backend services processing tables. The tool works completely offline after initial page load.
- **No Data Storage:** Your table content, cell values, and exported output are not saved, logged, or transmitted anywhere. Close the tab and it's gone.
- **No Content Tracking:** We don't track what you create, table sizes, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your table data.

Safe for editing confidential API documentation, proprietary configuration tables, internal technical specifications, sensitive comparison matrices, or any private data. Generate and edit unlimited Markdown tables with complete data privacy.`
  },

  stats: {
    "Input Formats": "MD+CSV+JSON",
    "Output Formats": "4",
    "Processing": "Client-side",
    "Cell Editing": "WYSIWYG",
    "Data Upload": "0 bytes"
  }
};
