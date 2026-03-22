/**
 * Diff Checker Tool Guide Content
 * Comprehensive developer guide for text comparison and diff analysis
 */

import type { ToolGuideContent } from "./types";

export const diffGuideContent: ToolGuideContent = {
  toolName: "Diff Checker",
  toolPath: "/diff",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Original Text",
      description: "Paste the original version of your text, code, configuration file, or document into the left panel. This serves as the baseline for comparison."
    },
    {
      title: "Enter Modified Text",
      description: "Paste the updated version into the right panel. Can be edited code, revised document, new config version, or any text variant you want to compare against the original."
    },
    {
      title: "View Visual Diff",
      description: "See color-coded differences instantly. Red highlights deletions (removed from original), green highlights additions (added in new version), yellow shows modifications. Line-by-line comparison shows exactly what changed."
    },
    {
      title: "Analyze Changes",
      description: "Review statistics: lines added, lines deleted, lines modified, similarity percentage. Export diff as unified format, side-by-side view, or patch file for version control."
    }
  ],

  introduction: {
    title: "What is Text Diff Comparison?",
    content: `Text diff (difference) comparison identifies changes between two text versions, highlighting additions, deletions, and modifications line-by-line with visual color coding. Developers use diff tools daily for code reviews, debugging, configuration management, and version control. Writers and editors use diffs to track document revisions, compare drafts, and review editorial changes.

Diff algorithms power version control systems (Git, SVN, Mercurial), code review platforms (GitHub, GitLab, Bitbucket), document collaboration tools (Google Docs, Microsoft Word Track Changes), and database migration tools. Understanding what changed between versions is fundamental to software development, content management, and collaborative editing workflows.

### Why Diff Comparison Matters

**Code Review:** Before merging pull requests, reviewers examine diffs to see exactly what code changed. Red lines show deleted code, green shows new code. Without diffs, reviewers would need to read entire files hunting for changes. Diffs focus attention on modifications only.

**Debugging:** When bugs appear after code changes, diffs reveal what changed between working and broken versions. Compare git commits: working version vs buggy version. The diff shows suspicious changes to investigate.

**Configuration Management:** Compare production config vs staging config to identify environment differences. Spot missing environment variables, different database URLs, or feature flag discrepancies by diffing config files.

**Document Revision:** Writers track article changes over time. Compare draft v1 vs draft v2 to see editor suggestions, content additions, deletions, and rewrites. Accept/reject changes like Word Track Changes.

**API Contract Changes:** When APIs evolve, diff OpenAPI/Swagger specs to identify breaking changes. Added required fields? Removed endpoints? Changed response schemas? Diff shows exactly what changed in API contracts.

**Data Validation:** Compare expected output vs actual output in tests. Diff shows where actual results deviate from expectations. Faster than visually scanning long outputs for differences.

### Diff Algorithms

**Line-based diff:** Compares text line-by-line. Each line is either added, deleted, or unchanged. Fastest algorithm, used by Git. Works well for code (naturally line-structured). Struggles with paragraph rewrites (treats entire paragraph as deleted+added).

**Word-based diff:** Compares word-by-word within lines. Shows inline changes: "Hello world" vs "Hello beautiful world" highlights "beautiful" as addition within line. Better for prose/documents. More expensive computationally.

**Character-based diff:** Compares character-by-character. Highest granularity. Shows exact character additions/deletions. Useful for spotting typos or single-char changes. Very expensive for large texts.

This tool uses Myers diff algorithm (same as Git) for efficient line-based comparison with optional word-level refinement. Handles large files, preserves line structure, and generates standard unified diff format compatible with patch utilities.

### Diff Output Formats

**Unified diff:** Standard format (-/+ prefixes, @@ line numbers). Used by Git, patch command, code review tools. Compact, parsable, industry standard. Example:
\`\`\`
- const API_KEY = 'old-key';
+ const API_KEY = 'new-key';
\`\`\`

**Side-by-side:** Original and modified versions displayed in parallel columns. Easier visual comparison for humans. Used in GitHub, GitLab web UIs. Harder to process programmatically.

**Inline:** Changes shown in single view with color coding. Green background = additions, red = deletions, yellow = modifications. Compact but can be hard to read for large changes.

This tool provides all three formats plus similarity percentage (how much content is identical) and change statistics (lines added/deleted/modified). All processing happens client-side using diff library implementations - your text never leaves your browser.`
  },

  useCases: [
    {
      title: "Compare Git Commit Changes",
      description: "Review code changes between git commits before merging pull requests. Copy file contents from two commits, paste into diff tool to see changes outside terminal. Useful for reviewing PRs on mobile or when GitHub diff view is insufficient.",
      example: `// Commit ABC123 (original):
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}

// Commit XYZ789 (modified):
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total * 1.08; // Add 8% tax
}

// Diff Output:
  function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
-     total += item.price;
+     total += item.price * item.quantity;
    }
-   return total;
+   return total * 1.08; // Add 8% tax
  }

Changes:
- Added quantity multiplication
- Added tax calculation
- 2 lines modified`
    },
    {
      title: "Audit Configuration File Changes",
      description: "Compare production vs staging environment configs to identify differences. Essential for debugging environment-specific issues or ensuring config parity. Spot missing env vars, different URLs, or incorrect feature flags instantly.",
      example: `// Production config.json:
{
  "database": {
    "host": "prod-db.example.com",
    "port": 5432,
    "pool_size": 20
  },
  "api_key": "prod_key_12345",
  "debug": false,
  "log_level": "error"
}

// Staging config.json:
{
  "database": {
    "host": "staging-db.example.com",
    "port": 5432,
    "pool_size": 10
  },
  "api_key": "staging_key_67890",
  "debug": true,
  "log_level": "debug"
}

// Diff Analysis:
Differences found:
✗ database.host: prod vs staging (expected)
✗ database.pool_size: 20 vs 10 (expected)
✗ api_key: different keys (expected)
✗ debug: false vs true (expected)
✗ log_level: error vs debug (expected)

All differences are environment-specific ✓`
    },
    {
      title: "Review Document Editorial Changes",
      description: "Track changes between document drafts during editing process. Writers compare version 1 vs version 2 to see all edits: additions, deletions, rewrites. Reviewers see exactly what author changed in revision.",
      example: `// Draft V1:
"Our product helps developers build better applications.
It provides tools for testing, debugging, and deployment."

// Draft V2:
"Our product empowers developers to build better applications faster.
It provides comprehensive tools for testing, debugging, monitoring, and deployment.
With built-in analytics, you can track app performance in real-time."

// Diff Output:
- Our product helps developers build better applications.
+ Our product empowers developers to build better applications faster.
- It provides tools for testing, debugging, and deployment.
+ It provides comprehensive tools for testing, debugging, monitoring, and deployment.
+ With built-in analytics, you can track app performance in real-time.

Changes Summary:
✓ Changed "helps" to "empowers" + added "faster" (stronger language)
✓ Added "comprehensive" qualifier
✓ Added "monitoring" tool
✓ Added entire analytics sentence (new feature)

3 modifications, 1 addition`
    },
    {
      title: "Validate Test Output vs Expected Results",
      description: "Compare actual test output against expected output to identify failures. When tests fail with large output differences, diff shows exactly where actual deviates from expected, making debugging faster than reading entire outputs.",
      example: `// Expected API Response:
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "roles": ["user", "admin"]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}

// Actual API Response:
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "roles": ["user"]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}

// Diff shows failures:
-     "email": "john@example.com",
+     "email": "john.doe@example.com",
-     "roles": ["user", "admin"]
+     "roles": ["user"]

Test Failures:
✗ email mismatch: missing middle name in address
✗ roles incomplete: "admin" role missing

Bug found: User role assignment broken`
    }
  ],

  howToUse: {
    title: "How to Use This Diff Checker",
    content: `This tool provides instant text comparison with visual highlighting, line-by-line diff output, and change statistics. All processing happens client-side using diff algorithms - no server uploads required.

### Comparing Text

Paste original text (baseline) in left panel, modified text in right panel. The tool automatically detects changes and highlights differences in real-time. Red background = deletions (in original, removed in modified). Green background = additions (not in original, added in modified). Yellow background = modifications (line changed).

### Line-by-Line vs Word-by-Word

Line-based diff compares entire lines. If any word in line changes, entire line marked as modified. Fast, works well for code. Word-based diff refines line changes to show specific words modified within lines. Slower but more precise for prose/documents.

### Reading Unified Diff Format

Lines prefixed with - were deleted (present in original, removed in modified). Lines prefixed with + were added (not in original, added in modified). Lines with no prefix are unchanged context. @@ markers show line numbers where changes occur.

Example:
\`\`\`diff
@@ -5,3 +5,3 @@
  const API_URL = 'https://api.example.com';
- const API_KEY = 'old-key';
+ const API_KEY = 'new-key';
  const TIMEOUT = 5000;
\`\`\`

### Interpreting Statistics

**Lines Added:** Count of + lines. New code/content in modified version.

**Lines Deleted:** Count of - lines. Removed code/content from original.

**Lines Modified:** Lines that changed (deletion + addition counting as one modification).

**Similarity Percentage:** (Unchanged lines / Total lines) × 100. 100% = identical, 0% = completely different. 90%+ = minor changes, below 50% = major rewrite.

### Export Options

**Copy Diff:** Copies unified diff format to clipboard for pasting in PRs, emails, or issue trackers.

**Download Patch:** Saves as .patch or .diff file for applying with patch/git apply commands.

**Side-by-Side View:** Visual comparison with original and modified in parallel columns.

### Use Cases

Code review (PR changes), configuration auditing (prod vs staging), document editing (draft revisions), debugging (working vs broken code), test validation (expected vs actual), API contract changes (schema evolution), data migration (before vs after).`,
    steps: [
      {
        name: "Paste Original",
        text: "Enter baseline text in left panel - original code, config, document, or any text to compare against."
      },
      {
        name: "Paste Modified",
        text: "Enter updated version in right panel - new code, edited document, modified config to compare with original."
      },
      {
        name: "Review Diff",
        text: "See visual diff with color coding. Red = deletions, green = additions, yellow = modifications. Line-by-line comparison."
      },
      {
        name: "Analyze Changes",
        text: "Check statistics: lines added/deleted, similarity %. Export as unified diff, patch file, or side-by-side view."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between line-based and word-based diff?",
      answer: "Line-based diff compares entire lines. If any character changes in a line, the entire line is marked as modified (deleted + added). Fast and standard for code. Word-based diff refines line changes to highlight specific words/characters modified within lines, showing precise changes. Better for prose but slower. Git uses line-based diff. Google Docs uses word-based."
    },
    {
      question: "Why does reordering lines show as delete + add?",
      answer: "Diff algorithms detect insertions and deletions but don't inherently detect moves/reorderings. Moving line 5 to line 10 appears as: delete at line 5, add at line 10. Some advanced diff tools (git diff -M) detect moves, but standard diff algorithms treat them as delete+add. The content is identical but location changed."
    },
    {
      question: "How do I reduce noise in diffs?",
      answer: "To get cleaner diffs: (1) Ignore whitespace changes if comparing code (reformatting shouldn't show as changes), (2) Normalize line endings (CRLF vs LF can cause every line to diff), (3) Remove trailing whitespace before comparing, (4) Compare formatted/normalized versions (run prettier/formatter on both before diff). This tool shows all changes; pre-process text externally to reduce noise."
    },
    {
      question: "Can this diff binary files or images?",
      answer: "No, this tool compares text only. Binary files (images, PDFs, executables, Word docs) need specialized diff tools. For images: visual diff tools showing pixel differences. For PDFs: text extraction then diff. For structured binaries: format-specific tools. Text diff on binary files shows gibberish. Use file-type-appropriate diff tools for non-text files."
    },
    {
      question: "What does similarity percentage mean?",
      answer: "Similarity is (unchanged lines / total lines) × 100. 100% = files are identical, no changes. 90% = 10% of lines changed (minor edits). 50% = half the file changed (major rewrite). Below 25% = mostly different content. Useful for gauging change magnitude at a glance. High similarity = minor tweak, low similarity = major refactor."
    },
    {
      question: "Can I use diff output with Git?",
      answer: "Yes, unified diff format (standard output) is git-compatible. Save diff output as .patch file, then apply with: \\`git apply changes.patch\\` or \\`patch -p1 < changes.patch\\`. However, this tool generates diffs between arbitrary text, not git commits. For git workflow, use \\`git diff\\` directly. This tool is for diffing text outside git context (configs, docs, API responses)."
    },
    {
      question: "Why are there so many differences when files look similar?",
      answer: "Common culprits: (1) Line endings (Windows CRLF vs Unix LF) - every line diffs even with identical content, (2) Encoding differences (UTF-8 vs Latin-1) cause character mismatches, (3) Invisible whitespace (tabs vs spaces, trailing spaces), (4) Copy-paste formatting artifacts. Normalize both texts (consistent encoding, line endings, whitespace) before diffing to get accurate comparison."
    },
    {
      question: "How does this handle very large files?",
      answer: "Diff algorithms are computationally expensive O(n*m) where n and m are file sizes. Files under 10,000 lines diff instantly in browser. 10,000-50,000 lines may take few seconds. Above 50,000 lines, browser may slow down or freeze. For very large files, use command-line diff tools (diff, git diff) optimized for large files. This tool is designed for typical code files (100-5000 lines)."
    },
    {
      question: "Can this detect copied/moved code blocks?",
      answer: "No, standard diff only detects additions and deletions, not copies or moves. If you copy function A to function B, diff shows function B as entirely new (all lines added). Advanced git diff modes (--find-copies, --find-renames) detect this, but require git history context. This tool does pure text diff without file history or move detection."
    },
    {
      question: "Is my text data private and secure?",
      answer: "Absolutely. All diff comparison happens entirely in your browser using client-side JavaScript diff algorithms. Your text never leaves your device or gets uploaded to servers. No network requests are made with your content. Verify by opening browser DevTools Network tab - zero uploads. Safe for confidential code, proprietary configs, sensitive documents, or any private text comparisons."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This diff checker operates entirely client-side using JavaScript diff algorithms (Myers algorithm implementation). Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All diff comparison happens in your browser's JavaScript engine using diff library. Text stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your text inputs and diff results are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you compare, code changes, file contents, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for comparing confidential code, proprietary configurations, sensitive documents, production vs staging configs, client code, or any private text. Use with confidence for code reviews, security audits, or regulated data analysis.`
  },

  stats: {
    "Diff Algorithm": "Myers",
    "Max File Size": "50K lines",
    "Output Formats": "3",
    "Performance": "<100ms",
    "Server Uploads": "0"
  }
};
