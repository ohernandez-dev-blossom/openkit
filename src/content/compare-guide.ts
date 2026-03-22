/**
 * Text Compare Tool Guide Content
 * Comprehensive developer guide for text comparison and diff visualization
 */

import type { ToolGuideContent } from "./types";

export const compareGuideContent: ToolGuideContent = {
  toolName: "Text Compare",
  toolPath: "/compare",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Two Text Versions",
      description: "Input original text in left panel and modified version in right panel. Compare code files, configuration changes, documentation updates, or any text content."
    },
    {
      title: "View Highlighted Differences",
      description: "See additions highlighted in green, deletions in red, and unchanged content in default color. Line-by-line comparison shows exactly what changed between versions."
    },
    {
      title: "Choose Comparison Mode",
      description: "Select character-level diff for precise changes within lines, or line-level diff for broader structural changes. Switch modes based on comparison needs."
    },
    {
      title: "Export or Share Results",
      description: "Copy diff output in unified format, download comparison report, or share results with team members for code review or change tracking."
    }
  ],

  introduction: {
    title: "What is a Text Compare Tool?",
    content: `A text compare tool (also called diff tool) identifies and visualizes differences between two text versions. Using diff algorithms like Myers or Patience, these tools highlight additions, deletions, and modifications line-by-line or character-by-character. Essential for code review, configuration management, document versioning, and data reconciliation.

Text comparison is fundamental to software development. Code reviews require identifying what changed between commits. Configuration updates need validation to ensure only intended changes were made. Documentation revisions require tracking modifications across versions. Manual comparison is error-prone and time-consuming - diff tools automate this critical process.

### Why Developers Need Text Compare Tools

Version control systems (Git, SVN) use diff algorithms to show changes between commits. Understanding diffs is essential for code review, merge conflict resolution, and tracking project evolution. Standalone diff tools provide clearer visualization than command-line git diff.

Configuration file changes (JSON, YAML, XML, INI) require careful validation. A single character mistake in configuration can break production systems. Diff tools catch unintended changes before deployment.

API response comparison during testing ensures endpoints return expected data. Compare production vs staging API responses to identify environmental discrepancies. Validate database query results against expected outputs.

Document collaboration requires tracking changes across revisions. Legal documents, technical specifications, and content drafts need clear change visualization for review and approval processes.

Data migration and ETL processes benefit from comparing source and destination data. Verify transformations applied correctly, identify data loss or corruption, and validate migration completeness.

### Diff Algorithms Explained

**Myers Algorithm:** Most common diff algorithm, used by Git. Finds shortest edit script (minimum additions/deletions) to transform one text to another. Balances performance and diff quality. Produces intuitive results for most use cases.

**Patience Diff:** Alternative algorithm that finds unique common lines as "anchors" then diffs sections between anchors. Better for code with lots of repetitive structures. Often produces cleaner diffs for refactored code.

**Histogram Diff:** Refinement of Patience algorithm with better performance. Used in some Git implementations. Produces high-quality diffs with faster execution.

**Character-Level Diff:** Compares individual characters within lines, highlighting precise changes. Useful for small text modifications, typo fixes, or punctuation changes.

**Line-Level Diff:** Compares entire lines as units. Simpler, faster, more readable for code changes. Standard for most diff tools.

**Word-Level Diff:** Intermediate granularity between character and line. Highlights changed words within lines. Good for prose, documentation, commit messages.

### Common Text Comparison Use Cases

**Code Review:** Compare feature branch changes against main branch. Identify new code, deleted code, modified functions. Essential for pull request review and quality assurance.

**Configuration Validation:** Compare production config against proposed changes. Ensure only intended modifications are deployed. Catch accidental deletions or typos.

**API Response Testing:** Compare expected JSON response against actual API output. Identify missing fields, type changes, or unexpected data.

**Database Schema Migration:** Compare old vs new database schema definitions. Verify migrations add expected columns, indexes, and constraints without unintended side effects.

**Document Versioning:** Track changes in legal documents, technical specs, or content drafts. Provide clear change log for stakeholder review.

**Environment Comparison:** Compare staging vs production configurations to identify environmental discrepancies causing bugs.

### Diff Output Formats

**Unified Diff:** Standard format used by Git and patch utilities. Shows context lines around changes, prefixed with +/- for additions/deletions. Format: @@ -line,count +line,count @@.

**Side-by-Side:** Visual format with original text on left, modified on right, aligned for easy comparison. Colors highlight differences. Best for human review.

**Inline:** Single column showing additions and deletions inline with unchanged content. Compact format for narrow displays.

**Git-Style Diff:** Similar to unified but includes file metadata, commit hashes, and index information. Used in version control systems.

**JSON Diff:** Structured JSON output describing additions, deletions, modifications. Machine-readable format for programmatic diff processing.

### Color Coding Standards

**Green (Additions):** New lines or characters added in modified version. Typically #d4edda background, #155724 text.

**Red (Deletions):** Lines or characters removed from original version. Typically #f8d7da background, #721c24 text.

**Yellow (Modifications):** Lines changed between versions, shown as deletion + addition pair. Sometimes highlighted differently than pure add/delete.

**Gray (Unchanged):** Context lines showing surrounding code for reference. No changes in these lines.

**Blue (Moved):** Some advanced diff tools detect line moves (code reorganization without modification). Highlighted in blue.

### Diff Tool Features

**Ignore Whitespace:** Option to ignore spaces, tabs, line endings when comparing. Useful when only meaningful content changes matter, not formatting.

**Case Sensitivity:** Toggle case-sensitive or case-insensitive comparison. Important for file systems, SQL queries, or search functionality.

**Context Lines:** Control how many unchanged lines show around each change. More context aids understanding, less context reduces clutter.

**Syntax Highlighting:** Apply language-specific syntax coloring to diffs for easier code comprehension.

**Merge Capability:** Some tools support three-way merge: original, version A, version B. Helps resolve merge conflicts.

### Browser-Based vs CLI Diff Tools

**Browser Tools (like this):** Visual, user-friendly, accessible from any device. No installation needed. Great for quick comparisons, code review, or sharing with non-technical stakeholders. Limited to file size constraints.

**CLI Tools (diff, git diff, vimdiff):** Powerful, scriptable, handle massive files. Integrated with version control workflows. Steep learning curve. Better for automation and large-scale comparisons.

**IDE Diff Tools (VS Code, IntelliJ):** Integrated with development workflow, context-aware, support code navigation. Best for in-depth code review during development.

Use browser tools for accessibility and shareability. Use CLI for automation and large files. Use IDE tools for development workflow integration.`,
  },

  useCases: [
    {
      title: "Code Review and Pull Request Diff",
      description: "Compare feature branch changes against base branch to review code modifications. Identify new functions, refactored logic, deleted code, and ensure changes match requirements before merging.",
      example: `/* Original code (main branch) */
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

/* Modified code (feature branch) */
function calculateTotal(items) {
  // Added tax calculation and discount support
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
  }

  // Apply discount if available
  const discount = items.reduce((sum, item) =>
    sum + (item.discount || 0), 0
  );

  // Calculate tax (8% sales tax)
  const tax = (subtotal - discount) * 0.08;

  return subtotal - discount + tax;
}

/* Diff visualization */
function calculateTotal(items) {
- let total = 0;
+ // Added tax calculation and discount support
+ let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
-   total += items[i].price;
+   subtotal += items[i].price * items[i].quantity;
  }
+
+ // Apply discount if available
+ const discount = items.reduce((sum, item) =>
+   sum + (item.discount || 0), 0
+ );
+
+ // Calculate tax (8% sales tax)
+ const tax = (subtotal - discount) * 0.08;
+
- return total;
+ return subtotal - discount + tax;
}

/* Code review checklist using diff */
✓ Changed variable name from 'total' to 'subtotal' for clarity
✓ Added quantity multiplication (items[i].price * items[i].quantity)
✓ Implemented discount calculation using reduce
✓ Added 8% sales tax calculation
✓ Updated return statement to include discount and tax
⚠ Tax rate is hard-coded - should be configurable
⚠ Missing input validation for quantity field

/* Git command to generate diff */
git diff main..feature-branch

/* VS Code diff workflow */
// 1. Open Source Control panel (Ctrl+Shift+G)
// 2. Click on modified file
// 3. See side-by-side diff with syntax highlighting
// 4. Add inline comments for review

/* GitHub PR diff review */
// Pull request shows unified diff with context
// Reviewers can comment on specific lines
// "+/-" prefix shows additions/deletions
// "@@" markers show line numbers and context

/* React component diff example */
- const Button = ({ label }) => (
-   <button>{label}</button>
- );
+ const Button = ({ label, onClick, variant = 'primary' }) => {
+   const classes = variant === 'primary'
+     ? 'bg-blue-600 text-white'
+     : 'bg-gray-200 text-gray-800';
+
+   return (
+     <button onClick={onClick} className={classes}>
+       {label}
+     </button>
+   );
+ };`
    },
    {
      title: "Configuration File Validation",
      description: "Compare production configuration files against proposed changes to ensure only intended modifications are deployed. Critical for preventing configuration-related outages in production systems.",
      example: `/* Original config.json (production) */
{
  "database": {
    "host": "prod-db.example.com",
    "port": 5432,
    "name": "production_db",
    "poolSize": 20
  },
  "api": {
    "baseUrl": "https://api.example.com",
    "timeout": 5000,
    "retries": 3
  },
  "cache": {
    "ttl": 3600,
    "maxSize": 1000
  }
}

/* Modified config.json (proposed changes) */
{
  "database": {
    "host": "prod-db.example.com",
    "port": 5432,
    "name": "production_db",
    "poolSize": 50
  },
  "api": {
    "baseUrl": "https://api.example.com",
    "timeout": 10000,
    "retries": 5
  },
  "cache": {
    "ttl": 7200,
    "maxSize": 2000
  },
  "logging": {
    "level": "info",
    "format": "json"
  }
}

/* Diff output */
{
  "database": {
    "host": "prod-db.example.com",
    "port": 5432,
    "name": "production_db",
-   "poolSize": 20
+   "poolSize": 50
  },
  "api": {
    "baseUrl": "https://api.example.com",
-   "timeout": 5000,
-   "retries": 3
+   "timeout": 10000,
+   "retries": 5
  },
  "cache": {
-   "ttl": 3600,
-   "maxSize": 1000
+   "ttl": 7200,
+   "maxSize": 2000
+ },
+ "logging": {
+   "level": "info",
+   "format": "json"
  }
}

/* Change validation checklist */
✓ Increased database poolSize from 20 to 50 (expected)
✓ Increased API timeout from 5s to 10s (expected)
✓ Increased API retries from 3 to 5 (expected)
✓ Doubled cache TTL from 1h to 2h (expected)
✓ Doubled cache maxSize (expected)
✓ Added logging configuration (expected)
✗ No unintended deletions detected
✗ No typos or formatting errors
✓ All changes match deployment ticket requirements

/* Environment configuration comparison */
// Compare staging vs production configs
// Identify environment-specific differences

/* Staging config.json */
{
  "database": {
    "host": "staging-db.example.com", // Different host
    "port": 5432,
    "poolSize": 10 // Smaller pool
  },
  "api": {
    "baseUrl": "https://staging-api.example.com", // Different API
    "timeout": 5000
  }
}

/* YAML configuration diff */
# Original .gitlab-ci.yml
- stages:
-   - test
-   - build
+ stages:
+   - lint
+   - test
+   - build
+   - deploy

/* Docker Compose diff */
version: '3.8'
services:
  web:
-   image: nginx:1.21
+   image: nginx:1.23
    ports:
-     - "80:80"
+     - "8080:80"
+   environment:
+     - NODE_ENV=production
`
    },
    {
      title: "API Response Validation and Testing",
      description: "Compare expected API responses against actual output during testing. Identify missing fields, type changes, unexpected data, or schema violations in REST or GraphQL APIs.",
      example: `/* Expected API response (test fixture) */
{
  "user": {
    "id": 123,
    "username": "johndoe",
    "email": "john@example.com",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "age": 30
    },
    "settings": {
      "notifications": true,
      "theme": "dark"
    }
  }
}

/* Actual API response */
{
  "user": {
    "id": 123,
    "username": "johndoe",
    "email": "john@example.com",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "age": 30,
      "avatar": "https://example.com/avatar.jpg"
    },
    "settings": {
      "notifications": true,
      "theme": "dark",
      "language": "en"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}

/* Diff analysis */
{
  "user": {
    "id": 123,
    "username": "johndoe",
    "email": "john@example.com",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "age": 30,
+     "avatar": "https://example.com/avatar.jpg"
    },
    "settings": {
      "notifications": true,
      "theme": "dark",
+     "language": "en"
    },
+   "createdAt": "2024-01-15T10:30:00Z"
  }
}

/* Test validation */
// Detected changes:
// ✓ Added "avatar" field in profile (non-breaking addition)
// ✓ Added "language" field in settings (non-breaking addition)
// ✓ Added "createdAt" field at user level (non-breaking addition)
// ✗ No missing expected fields
// ✗ No type changes
// Conclusion: API response is backward compatible

/* Jest test using diff comparison */
test('API response matches expected schema', async () => {
  const response = await fetch('/api/user/123');
  const actual = await response.json();

  const expected = {
    user: {
      id: 123,
      username: expect.any(String),
      email: expect.stringContaining('@'),
      profile: expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe'
      })
    }
  };

  expect(actual).toMatchObject(expected);
});

/* GraphQL query response diff */
/* Expected */
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "First Post",
        "author": {
          "name": "John Doe"
        }
      }
    ]
  }
}

/* Actual */
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "First Post",
        "slug": "first-post",
        "author": {
          "name": "John Doe",
          "avatar": "https://example.com/avatar.jpg"
        }
      }
    ]
  }
}

/* Breaking change detection */
// Original response
{
  "status": "active",
  "count": 42
}

// New response (BREAKING - type change)
{
  "status": "active",
  "count": "42" // Changed from number to string!
}

/* Database query result comparison */
-- Expected output
SELECT id, name, email FROM users WHERE active = true;
-- id | name      | email
-- 1  | John Doe  | john@example.com
-- 2  | Jane Doe  | jane@example.com

-- Actual output (after migration)
SELECT id, name, email, created_at FROM users WHERE active = true;
-- id | name      | email              | created_at
-- 1  | John Doe  | john@example.com   | 2024-01-01
-- 2  | Jane Doe  | jane@example.com   | 2024-01-02
-- 3  | Bob Smith | bob@example.com    | 2024-01-03

/* Diff shows:
+ Added "created_at" column
+ Added new user "Bob Smith"
*/`
    },
    {
      title: "Document Revision Tracking",
      description: "Track changes across document revisions for legal contracts, technical specifications, or content drafts. Provide clear change log for stakeholder review and approval processes.",
      example: `/* Original document (v1.0) */
# Software License Agreement

This agreement ("Agreement") is entered into between Company Inc.
("Licensor") and the customer ("Licensee").

## 1. Grant of License

Licensor grants Licensee a non-exclusive, non-transferable license
to use the Software for internal business purposes.

## 2. License Fees

Licensee shall pay $1,000 per month for access to the Software.

## 3. Term and Termination

This Agreement shall remain in effect for 12 months from the
effective date.

/* Modified document (v2.0) */
# Software License Agreement

This agreement ("Agreement") is entered into between Company Inc.
("Licensor") and the customer ("Licensee").

## 1. Grant of License

Licensor grants Licensee a non-exclusive, non-transferable license
to use the Software for internal business purposes and limited
client demonstrations.

## 2. License Fees

Licensee shall pay $1,500 per month for access to the Software.
Payment is due within 30 days of invoice date.

## 3. Support and Maintenance

Licensor will provide email support during business hours and
quarterly software updates.

## 4. Term and Termination

This Agreement shall remain in effect for 24 months from the
effective date. Either party may terminate with 60 days written
notice.

/* Diff output with change tracking */
# Software License Agreement

This agreement ("Agreement") is entered into between Company Inc.
("Licensor") and the customer ("Licensee").

## 1. Grant of License

Licensor grants Licensee a non-exclusive, non-transferable license
- to use the Software for internal business purposes.
+ to use the Software for internal business purposes and limited
+ client demonstrations.

## 2. License Fees

- Licensee shall pay $1,000 per month for access to the Software.
+ Licensee shall pay $1,500 per month for access to the Software.
+ Payment is due within 30 days of invoice date.

+ ## 3. Support and Maintenance
+
+ Licensor will provide email support during business hours and
+ quarterly software updates.

- ## 3. Term and Termination
+ ## 4. Term and Termination

- This Agreement shall remain in effect for 12 months from the
- effective date.
+ This Agreement shall remain in effect for 24 months from the
+ effective date. Either party may terminate with 60 days written
+ notice.

/* Change summary for stakeholder review */
Changes from v1.0 to v2.0:

Section 1 - Grant of License:
✓ Added "and limited client demonstrations" to permitted uses

Section 2 - License Fees:
⚠ Increased monthly fee from $1,000 to $1,500 (50% increase)
✓ Added payment terms (30 days from invoice)

Section 3 - Support and Maintenance (NEW):
✓ Added support and maintenance section
✓ Defined email support during business hours
✓ Committed to quarterly software updates

Section 4 - Term and Termination (previously Section 3):
✓ Extended term from 12 to 24 months
✓ Added termination clause (60 days written notice)

/* Markdown diff for README.md */
# Project Name

- ## Installation
+ ## Quick Start
+
+ Install dependencies:

\`\`\`bash
- npm install
+ npm install && npm run setup
\`\`\`

+ ## Configuration
+
+ Create a \`.env\` file:
+ \`\`\`
+ API_KEY=your_api_key_here
+ \`\`\`

/* Technical specification diff */
= API Endpoint: GET /api/users
- Returns: Array of user objects
- Authentication: API key required
+ Returns: Paginated array of user objects
+ Authentication: Bearer token required (OAuth 2.0)
+ Rate Limit: 100 requests per minute

= Response Schema:
{
-  "users": [...]
+  "data": {
+    "users": [...],
+    "pagination": {
+      "page": 1,
+      "totalPages": 10,
+      "totalCount": 243
+    }
+  }
}`
    }
  ],

  howToUse: {
    title: "How to Use This Text Compare Tool",
    content: `This text compare tool provides visual diff highlighting between two text versions. Input original and modified content, view highlighted changes, and export results for documentation or review.

### Inputting Text to Compare

Paste or type original text in the left panel, modified version in the right panel. Supports plain text, code (any language), JSON, XML, YAML, configuration files, documentation, or any text content.

For file comparison, open files in text editors, copy content to clipboard (Ctrl+A, Ctrl+C), and paste into panels. Most text editors preserve formatting and line endings.

Large files: browser-based tools have memory limits (~10MB text typically safe). For massive files (> 10MB), use CLI tools like diff or git diff.

Clear formatting option strips rich text formatting if pasting from Word, Google Docs, or similar. Use this for clean plain text comparison.

### Choosing Comparison Mode

**Line-Level Diff (default):** Compares entire lines as units. Shows which lines were added, deleted, or modified. Best for code comparison, configuration files, and structural changes. Faster and more readable for most use cases.

**Character-Level Diff:** Highlights precise character changes within lines. Shows exact insertions and deletions at character granularity. Useful for typo fixes, punctuation changes, or small text modifications.

**Word-Level Diff:** Intermediate mode highlighting changed words within lines. Good for prose, documentation, commit messages, or natural language text.

Toggle modes using the comparison mode selector. Different modes provide different insights - try multiple modes for comprehensive analysis.

### Understanding Diff Visualization

**Green highlighting (additions):** Content added in modified version. Lines or characters present in right panel but not in left panel.

**Red highlighting (deletions):** Content removed from original version. Lines or characters present in left panel but not in right panel.

**Yellow/orange highlighting (modifications):** Lines changed between versions. Typically shown as red deletion + green addition pair.

**Gray/no highlight (unchanged):** Context lines showing surrounding content. No changes in these lines.

Line numbers on left margin help reference specific changes. Use line numbers when discussing diffs with team members.

### Advanced Options

**Ignore Whitespace:** Enable to ignore spaces, tabs, and line ending differences. Useful when only meaningful content changes matter. Helpful after code reformatting or auto-formatting changes.

**Case Sensitivity:** Toggle case-sensitive or case-insensitive comparison. Disable for comparing file paths on Windows vs Linux, or SQL queries where case doesn't matter.

**Context Lines:** Control how many unchanged lines show around each change. More context (5-10 lines) aids understanding, less context (1-3 lines) reduces clutter and focuses on changes.

**Side-by-Side vs Inline:** Switch between side-by-side view (original left, modified right) and inline view (single column with +/- prefixes). Side-by-side better for reviewing, inline better for narrow screens.

### Exporting Diff Results

**Copy to Clipboard:** Click copy button to copy diff output. Paste into code review comments, documentation, or issue tracking systems.

**Unified Diff Format:** Export in standard unified diff format (used by Git, patch utilities). Includes line numbers, context, and +/- prefixes. Format: @@ -oldline,count +newline,count @@.

**HTML Export:** Download diff as HTML file with syntax highlighting and color coding preserved. Share with stakeholders or embed in documentation.

**Plain Text:** Export as plain text diff without formatting. Compatible with all systems and tools.

### Code Review Workflow

1. Paste original code (main branch) in left panel
2. Paste modified code (feature branch) in right panel
3. Review green additions - new functionality, check logic and tests
4. Review red deletions - ensure safe to remove, no unintended deletions
5. Check modified lines (red+green pairs) - verify changes match requirements
6. Use line numbers to reference specific changes in review comments
7. Export diff for documentation or team discussion

### Configuration Validation Workflow

1. Load production config in left panel
2. Load proposed changes in right panel
3. Enable "Ignore Whitespace" if formatting changes are irrelevant
4. Review all changes line by line
5. Verify each change matches deployment ticket
6. Check for unintended deletions or typos
7. Validate critical values (database hosts, API endpoints, credentials)
8. Approve or request revisions before deployment

### Document Revision Workflow

1. Load original document version in left panel
2. Load edited version in right panel
3. Switch to word-level diff for prose comparison
4. Review additions for accuracy and completeness
5. Review deletions for intentional removal
6. Export diff with change summary for stakeholder approval
7. Track revision history by comparing sequential versions`,
    steps: [
      {
        name: "Input Text Versions",
        text: "Paste original text in left panel, modified version in right panel. Supports code, JSON, configuration files, documentation, or any text content. Use clear formatting for plain text.",
      },
      {
        name: "Select Comparison Mode",
        text: "Choose line-level diff (default) for code and structural changes, character-level for precise modifications, or word-level for prose. Toggle ignore whitespace and case sensitivity as needed.",
      },
      {
        name: "Review Highlighted Changes",
        text: "Green highlights show additions, red shows deletions. Analyze changes line by line. Use line numbers to reference specific modifications. Check for unintended changes or typos.",
      },
      {
        name: "Export Results",
        text: "Copy to clipboard, download unified diff, or export HTML report. Share with team for code review, document in tickets, or archive for change tracking.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between line-level and character-level diff?",
      answer: "Line-level diff compares entire lines as units - if any character in a line changes, the whole line is marked as modified. Faster and more readable for code. Character-level diff highlights specific characters that changed within lines - precise for typo fixes or small edits. Use line-level for code review and structural changes. Use character-level for precise text modifications and finding exact changes within long lines."
    },
    {
      question: "Why should I use 'Ignore Whitespace' when comparing code?",
      answer: "Enable ignore whitespace after code reformatting (prettier, black, gofmt) to see only meaningful changes. Auto-formatters change indentation, spacing, and line breaks without altering logic. Ignoring whitespace filters out formatting noise and shows actual code changes. Essential after running linters or switching between tabs and spaces. Disable when whitespace is semantically meaningful (Python indentation, YAML structure)."
    },
    {
      question: "Can I compare JSON or XML files with this tool?",
      answer: "Yes, paste JSON, XML, YAML, or any structured text. The tool treats them as text and highlights syntax differences. For JSON, consider formatting both versions first (use JSON formatter) for cleaner comparison. Line-level diff works well for structured data. Character-level diff helps find precise changes in long JSON values. Dedicated JSON diff tools may provide semantic comparison, but text diff works for most cases."
    },
    {
      question: "How do I compare two files from my computer?",
      answer: "Open both files in a text editor, select all content (Ctrl+A or Cmd+A), copy to clipboard (Ctrl+C or Cmd+C), and paste into left/right panels. Or drag-and-drop files into panels if the tool supports file upload. Most plain text files (code, configs, logs) copy directly. For binary files or very large files (>10MB), use CLI diff tools instead."
    },
    {
      question: "What's unified diff format and when should I use it?",
      answer: "Unified diff is the standard format used by Git, SVN, and patch utilities. Shows changes with + prefix for additions, - prefix for deletions, and @@ markers indicating line numbers. Format: @@ -oldstart,oldcount +newstart,newcount @@. Use unified diff for: sharing diffs via email/chat, creating patch files, documenting changes in tickets, or inputting to automated diff processing tools. Human review is easier with visual side-by-side, but unified is better for automation."
    },
    {
      question: "How can I use this for code review?",
      answer: "Paste original code (main branch) in left panel, modified code (feature branch) in right panel. Review green additions for new functionality, red deletions for safe removal, and modified lines for correct changes. Use line numbers to reference specific changes in review comments. Export diff to attach to pull request or paste into code review platform. Check for unintended changes, missing tests, or logic errors. Combine with syntax highlighting for easier comprehension."
    },
    {
      question: "Can I compare more than two text versions at once?",
      answer: "This tool compares two versions (original vs modified). For comparing multiple versions, perform sequential comparisons: v1 vs v2, then v2 vs v3. For three-way merge (original, version A, version B), use specialized merge tools. Git provides three-way merge with git merge-base and git diff3. Some advanced diff tools support multi-way comparison, but most use cases need only two-way comparison."
    },
    {
      question: "What's the maximum file size I can compare?",
      answer: "Browser-based tools typically handle files up to 5-10MB safely. Larger files may cause browser slowdown or memory issues. For massive files (logs, databases, large code files), use CLI tools: diff, git diff, or vimdiff. CLI tools handle gigabyte-sized files efficiently. Browser tools prioritize accessibility and visual clarity over raw performance. For normal code files, configs, and documents, browser tools are sufficient."
    },
    {
      question: "How do I compare configuration files across environments?",
      answer: "Load production config in left panel, staging/dev config in right panel. Enable ignore whitespace if formatting differs. Review all differences to identify environment-specific values (database hosts, API endpoints, credentials). Document expected differences vs unexpected discrepancies. Use diff to validate environment parity or identify configuration drift causing bugs. Export diff for environment documentation or infrastructure-as-code validation."
    },
    {
      question: "Is my text data private when using this comparison tool?",
      answer: "Yes. All text comparison happens client-side in your browser using JavaScript diff algorithms. No text content is sent to servers. No backend processing. The tool works offline after initial load. Safe for comparing proprietary code, confidential documents, or sensitive configurations. Inspect browser DevTools Network tab - zero text uploads. All processing uses local browser memory only."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text content never leaves your browser. This comparison tool operates entirely client-side using JavaScript diff algorithms. There are no text uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All diff calculations use browser-based Myers or Patience algorithms. Text stays in your device's memory.
- **No Server Uploads:** We don't have servers to process your text. The tool works completely offline after first load.
- **No Data Storage:** Your text content is not saved anywhere. It exists only in your browser session.
- **No Analytics Tracking:** We don't track what you compare or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your text data.

This makes the tool safe for comparing proprietary code, confidential configurations, legal documents, or sensitive data. Use with confidence for commercial projects and private information.`,
  },

  stats: {
    "Comparison Modes": "3",
    "Diff Algorithms": "Myers/Patience",
    "Max File Size": "~10MB",
    "Client-Side": "100%",
    "Server Uploads": "0"
  }
};
