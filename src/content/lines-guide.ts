/**
 * Line Counter Tool Guide Content
 * Comprehensive developer guide for text line counting and analysis
 */

import type { ToolGuideContent } from "./types";

export const linesGuideContent: ToolGuideContent = {
  toolName: "Line Counter",
  toolPath: "/lines",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Your Text or Code",
      description: "Copy and paste any text, code, logs, or data into the input area. The tool instantly analyzes line counts, character statistics, and text metrics in real-time."
    },
    {
      title: "View Statistics Dashboard",
      description: "See comprehensive metrics including total lines, non-empty lines, empty lines, word count, character count, and average line length. All stats update instantly as you type."
    },
    {
      title: "Use Text Processing Tools",
      description: "Add line numbers to your text for code reviews or documentation, remove empty lines to clean up data, or analyze line length patterns for consistency."
    },
    {
      title: "Copy or Export Results",
      description: "Copy the processed text with line numbers or cleaned formatting to clipboard with one click. Use for code documentation, log analysis, or data cleaning workflows."
    }
  ],

  introduction: {
    title: "What is a Line Counter?",
    content: `A line counter is a text analysis tool that counts lines, words, and characters in any text input while providing detailed statistics about text structure and composition. Beyond simple line counting, modern line counters offer comprehensive text metrics essential for software development, content analysis, and data processing workflows.

Line counting is a fundamental operation in software engineering, appearing in code editors, version control systems, log analyzers, and data processing pipelines. Developers use line counts to measure code complexity, track changes in diffs, analyze log files, validate data imports, and enforce coding standards.

### Key Features of Line Counting Tools

- **Real-Time Analysis:** Instant calculation of lines, words, characters, and derived metrics as you type or paste text. No waiting for processing on large files.
- **Multiple Count Types:** Total lines, non-empty lines (excluding blanks), empty lines, words, characters with and without whitespace. Each metric serves different analysis needs.
- **Line Statistics:** Average line length, longest line, shortest line help identify formatting issues, outliers, or lines that may need refactoring in code.
- **Text Processing:** Add line numbers for code reviews and documentation, remove empty lines to clean data files, format text for different use cases.

### Why Developers Need Line Counters

Line counting appears in countless development workflows. Code review tools display line numbers for precise feedback and discussion. Version control diffs show changed lines to understand commit impact. Log analysis requires counting specific log entries or error occurrences to identify patterns.

Data validation often checks if CSV files have the expected row count, configuration files have required entries, or API responses return correct record counts. Code metrics tools measure lines of code (LOC) to estimate project size, track productivity, or enforce complexity limits.

Text editors show line numbers for navigation and debugging. Developers reference specific line numbers when discussing code, reporting bugs, or writing documentation. Line counts help estimate reading time for documentation, analyze content length for blog posts, or validate data migrations.

### Common Line Counting Scenarios

**Code Analysis:** Measure total lines of code (TLOC), source lines of code (SLOC, excluding comments and blanks), or comment density. Track code growth over time, compare module sizes, or enforce file length limits.

**Log Processing:** Count error lines in application logs, measure log volume per day, identify spikes in logging activity. Filter logs to specific error types and count occurrences.

**Data Validation:** Verify CSV file row counts match expected records, check configuration files have required lines, validate data exports completed successfully. Line counts detect truncated files or incomplete downloads.

**Content Creation:** Count paragraphs in articles, measure content length for SEO, analyze text structure in documentation. Ensure consistent formatting across multiple files.

### Line Counter vs Manual Counting

Manual line counting in text editors is slow and error-prone for large files. This tool provides instant, accurate counts with comprehensive statistics that would take minutes to calculate manually. Real-time updates show metrics as you edit, paste, or modify text.

Unlike basic line count commands (wc -l in Unix), this tool offers detailed breakdowns: empty vs non-empty lines, character counts with and without spaces, word counts, and line length statistics. The visual dashboard makes metrics easy to interpret at a glance.

Browser-based operation means no installation, works on any operating system, and processes everything client-side for privacy. Your code, logs, and data never leave your device.`
  },

  useCases: [
    {
      title: "Code Review and Documentation",
      description: "Add line numbers to code snippets for documentation, code reviews, or bug reports. Reference specific lines when discussing changes, suggesting improvements, or explaining complex logic to team members.",
      example: `# Before: Plain code
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

# After: With line numbers for review
  1 | function calculateTotal(items) {
  2 |   return items.reduce((sum, item) => sum + item.price, 0);
  3 | }

# Code review comment:
"Line 2 should handle null/undefined items"

# GitHub PR review:
"See line 47-53 for the optimization I mentioned"

# Bug report:
"NullPointerException occurs at line 127 in UserService.java"`
    },
    {
      title: "Log File Analysis",
      description: "Count error messages, warnings, or specific patterns in application logs. Measure log volume, identify logging spikes, or validate log rotation policies. Essential for debugging production issues and monitoring system health.",
      example: `# Application log analysis workflow
# 1. Paste logs into line counter
[2026-02-01 10:15:23] INFO: Server started
[2026-02-01 10:15:24] ERROR: Database connection failed
[2026-02-01 10:15:25] WARN: Retry attempt 1
[2026-02-01 10:15:26] ERROR: Database connection failed
[2026-02-01 10:15:27] WARN: Retry attempt 2

# 2. View statistics
Total Lines: 5
Non-Empty Lines: 5
ERROR lines: 2 (40%)
WARN lines: 2 (40%)

# 3. Filter to errors only, count occurrences
grep ERROR logs.txt | wc -l
# Result: 2 errors in 5 log entries

# 4. Clean empty lines from log exports
# Use "Remove Empty Lines" to clean up log data`
    },
    {
      title: "Data File Validation",
      description: "Verify CSV, TSV, or text data files have the expected number of rows. Detect truncated files, incomplete downloads, or data export errors. Essential for ETL pipelines, data migrations, and import validation.",
      example: `# Validate CSV import before processing
# Expected: 10,000 customer records + 1 header row

# 1. Upload CSV to line counter
name,email,phone,created_at
John Doe,john@example.com,555-0123,2026-01-15
Jane Smith,jane@example.com,555-0124,2026-01-16
...

# 2. Check line count
Total Lines: 10,001 ✓ (expected)
Non-Empty Lines: 10,001 ✓

# If count is wrong:
Total Lines: 8,543 ✗ (INCOMPLETE DOWNLOAD)
# Action: Re-download file, check export errors

# 3. Remove empty lines that would break import
# Use "Remove Empty Lines" to clean CSV data

# 4. Validate line consistency
Avg Line Length: 87 chars
Longest Line: 143 chars (check for data issues)
Shortest Line: 32 chars (possible missing fields?)`
    },
    {
      title: "Code Metrics and Project Analysis",
      description: "Measure source lines of code (SLOC) for project estimates, track code growth over time, compare module sizes, or enforce file length standards. Calculate code-to-comment ratios or identify files that need refactoring.",
      example: `# Measure source lines of code (SLOC)
# Total Lines: 847
# Empty Lines: 92
# Comment Lines: 134 (estimate, needs manual count)
# SLOC: 847 - 92 = 755 actual code lines

# File size analysis for refactoring candidates
UserService.java: 1,245 lines (TOO LARGE, split needed)
AuthHelper.java: 87 lines (reasonable size)
DatabaseUtil.java: 543 lines (consider splitting)

# Project metrics tracking
# Week 1: 12,340 lines
# Week 2: 13,567 lines (+1,227 lines added)
# Growth rate: 9.9% per week

# Enforce coding standards
# Rule: "No file should exceed 500 lines"
# Files over limit:
# - ProductController.java: 687 lines (REFACTOR NEEDED)
# - OrderService.java: 534 lines (REFACTOR NEEDED)

# Calculate documentation ratio
# Total Lines: 2,340
# Comment Lines: 468
# Documentation Ratio: 20% (target: 15-25%)`
    }
  ],

  howToUse: {
    title: "How to Use This Line Counter Tool",
    content: `This line counter provides instant text analysis with comprehensive statistics displayed in an intuitive dashboard. All processing happens client-side in your browser for maximum performance and privacy.

### Basic Line Counting

Paste any text into the input area and statistics update instantly. The dashboard shows total lines, non-empty lines (excluding blank lines), empty lines, word count, and character count. These core metrics cover most text analysis needs.

For code files, total lines includes everything (code, comments, blanks). Non-empty lines represents actual content. Empty lines helps identify excessive spacing or formatting inconsistencies. Word and character counts provide additional context for documentation or content length.

### Advanced Statistics

Below the main metrics, view average line length, longest line, and shortest line. These statistics identify formatting outliers, overly complex code lines, or data inconsistencies. Average line length helps maintain consistent formatting across files.

Longest line may indicate lines that need refactoring (code) or wrapping (documentation). Shortest line can reveal formatting issues or incomplete data records. Characters without spaces helps analyze code density or validate data formats.

### Adding Line Numbers

Click "Add Line Numbers" to prefix each line with a right-aligned line number followed by a pipe separator. Line numbers start at 1 and increment sequentially. Useful for code reviews, documentation, bug reports, or any scenario requiring line references.

Line numbers use 3-digit padding (001, 002, etc.) for consistent alignment in monospace fonts. The format matches standard code editor line number displays, making it familiar for developers.

### Removing Empty Lines

Click "Remove Empty Lines" to filter out all blank lines from your text. This cleaning operation preserves line order and content while eliminating unnecessary whitespace. Essential for data files, CSV cleaning, or reducing log file size.

Empty line removal is instant and reversible (use Ctrl+Z/Cmd+Z to undo). After removal, statistics update to show the new line count. Use this before importing CSV data, processing logs, or comparing file contents.

### Keyboard Shortcuts

- **Ctrl+A / Cmd+A:** Select all text in the input area
- **Ctrl+C / Cmd+C:** Copy selected text
- **Ctrl+Z / Cmd+Z:** Undo text changes
- **Copy Button:** One-click copy entire text to clipboard

### Real-Time Updates

All statistics recalculate instantly as you type, paste, or modify text. No "Calculate" button needed - the tool processes text in real-time. Performance remains fast even for large files with thousands of lines.

For very large files (100,000+ lines), the browser may show a brief delay during initial paste as it processes the text. After that, all statistics are cached and update smoothly.

### Privacy and Performance

All text processing happens in your browser's JavaScript engine. Your code, logs, and data never leave your device. No server uploads, no network requests, no data transmission. Safe for sensitive code, confidential logs, or proprietary data.

The tool works offline after initial page load. Disconnect from the internet and it still functions perfectly. Refresh the page and your text is cleared - nothing is saved or cached permanently.`,
    steps: [
      {
        name: "Paste Text",
        text: "Copy and paste any text, code, logs, or data into the input area. The tool accepts unlimited length and handles all text formats."
      },
      {
        name: "View Statistics",
        text: "Statistics update instantly showing total lines, non-empty lines, empty lines, words, characters, and line length metrics. All metrics are real-time."
      },
      {
        name: "Process Text",
        text: "Add line numbers for code reviews, remove empty lines to clean data, or analyze line length patterns. All operations are instant and reversible."
      },
      {
        name: "Copy Results",
        text: "Use the Copy button to copy processed text to clipboard. Paste into code editors, documentation, or data processing tools."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between total lines and non-empty lines?",
      answer: "Total Lines counts every line in the text, including blank lines. Non-Empty Lines counts only lines that contain at least one non-whitespace character. For example, a file with 100 total lines might have 85 non-empty lines and 15 empty/blank lines. In code files, non-empty lines represents actual code and comments, while empty lines are whitespace used for formatting."
    },
    {
      question: "How accurate is the word count?",
      answer: "Word count uses whitespace splitting (spaces, tabs, newlines) to identify words, matching the behavior of most text editors and word processors. It counts any sequence of non-whitespace characters as a word. For code, 'words' means tokens (keywords, identifiers, operators). For natural language text, it matches standard word counts. Special characters and numbers count as separate words if surrounded by whitespace."
    },
    {
      question: "Can I count lines in large files (100,000+ lines)?",
      answer: "Yes. The tool handles files with hundreds of thousands of lines, though very large files (1 million+ lines) may cause brief browser delays during initial processing. For optimal performance with massive files, consider using command-line tools (wc, grep, awk) which are optimized for large-scale text processing. This browser tool is fastest for files under 100,000 lines."
    },
    {
      question: "How does 'Remove Empty Lines' work?",
      answer: "The Remove Empty Lines function filters out any line that contains only whitespace characters (spaces, tabs) or is completely blank. It preserves the order and content of all non-empty lines. For example, a 100-line file with 15 blank lines becomes an 85-line file with no blanks. This is useful for cleaning CSV data, removing extra spacing in code, or compressing log files before analysis."
    },
    {
      question: "What format are the line numbers?",
      answer: "Line numbers use the format '  1 | ' (right-aligned 3-digit number, space, pipe, space). This matches common code editor conventions and ensures alignment in monospace fonts. Line numbering starts at 1 (not 0) following human-readable conventions. The pipe separator makes it easy to remove line numbers later with find/replace if needed."
    },
    {
      question: "Why is average line length useful?",
      answer: "Average line length helps identify formatting consistency and code complexity. In code files, very high average line length (>120 chars) may indicate long, complex lines that need refactoring. Very low average (<30 chars) might suggest overly fragmented code. For text, average line length helps maintain readability - prose works best at 60-80 characters per line, while code varies by style guide (typically 80-120 characters)."
    },
    {
      question: "Can this tool handle different line ending formats (LF vs CRLF)?",
      answer: "Yes. The tool automatically handles Unix (LF), Windows (CRLF), and legacy Mac (CR) line endings. When you paste text, JavaScript normalizes line endings internally for consistent counting. Line count results are accurate regardless of which operating system created the file. This makes the tool reliable for cross-platform development teams."
    },
    {
      question: "How do I measure source lines of code (SLOC)?",
      answer: "SLOC excludes comments and blank lines. Use Non-Empty Lines as a starting point, then manually subtract comment lines (or use regex search for comment syntax). For example: Total Lines: 1,000, Empty Lines: 150, leaving 850 non-empty. If 200 are comments, SLOC = 650. For precise SLOC metrics on large projects, use specialized tools like cloc or SLOCCount that understand language-specific comment syntax."
    },
    {
      question: "Is my code/data private when using this tool?",
      answer: "Absolutely. All text processing happens entirely in your browser using client-side JavaScript. Your code, logs, and data never leave your device. There are no server uploads, no backend processing, and no network requests containing your text. You can verify this by opening browser DevTools Network tab - no outbound requests occur. Safe for proprietary code, confidential data, and sensitive logs."
    },
    {
      question: "What's the maximum text size this tool can handle?",
      answer: "The tool can handle text files up to ~10-50 MB depending on your browser and device memory. This translates to roughly 100,000-500,000 lines of typical code or text. If you experience browser slowdown or freezing with very large files, try processing the file in chunks or use command-line tools (wc, grep, awk) which are optimized for massive text processing without memory constraints."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text data never leaves your browser. This line counter operates entirely client-side using JavaScript array and string methods built into your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All text analysis happens in your browser's JavaScript engine. Code, logs, and data stay on your device.
- **No Server Uploads:** We don't have servers to process your text. The tool works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what you analyze, how often you use the tool, or any content-specific metrics.
- **Transparent & Auditable:** Inspect the browser Network tab in DevTools - you'll see zero outbound requests containing your text data.

This makes the tool safe for analyzing sensitive code, proprietary logs, confidential data files, or any regulated information (HIPAA, GDPR, PCI-DSS). Use with confidence for production debugging, code reviews, or handling private data.

### Performance Characteristics

Text processing speed depends on your browser and device. Modern browsers handle 100,000 lines instantly. For very large files (500,000+ lines), initial processing may take 1-2 seconds. After that, all metrics are cached and updates are near-instant.

Memory usage scales with text size. A 1 MB text file (roughly 10,000-20,000 lines) uses about 2-3 MB of browser memory. Your browser's available memory determines the practical size limit.`
  },

  stats: {
    "Processing Speed": "<50ms",
    "Max Text Size": "50MB",
    "Update Latency": "Real-time",
    "Metrics Tracked": "9+",
    "Server Uploads": "0"
  }
};
