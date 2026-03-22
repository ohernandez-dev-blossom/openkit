/**
 * Duplicate Remover Tool Guide Content
 * Comprehensive developer guide for removing duplicate lines
 */

import type { ToolGuideContent } from "./types";

export const duplicateGuideContent: ToolGuideContent = {
  toolName: "Duplicate Remover",
  toolPath: "/duplicate",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Text with Duplicates",
      description: "Enter or paste any text containing duplicate lines. Works with code, lists, log files, CSV data, or any line-based content with repeated entries."
    },
    {
      title: "Choose Detection Method",
      description: "Select case-sensitive (exact match) or case-insensitive (ignore capitalization) duplicate detection. Trim whitespace option removes leading/trailing spaces before comparison."
    },
    {
      title: "View Duplicate Statistics",
      description: "See total lines, unique lines, duplicate count, and removal percentage. Statistics update in real-time as you paste or edit text."
    },
    {
      title: "Copy Clean Results",
      description: "Click copy to transfer deduplicated text to clipboard. The first occurrence of each unique line is preserved, maintaining original order."
    }
  ],

  introduction: {
    title: "What is Duplicate Removal?",
    content: `Duplicate removal is a data cleaning operation that eliminates repeated lines from text, keeping only unique entries. Beyond simple duplicate detection, modern duplicate remover tools support case-sensitive and case-insensitive matching, whitespace trimming, order preservation, and statistics reporting essential for cleaning data imports, organizing lists, and processing log files.

Duplicate removal is a fundamental data cleaning operation in software development, appearing in data validation, import processing, log analysis, and content management. Developers use duplicate removal to clean CSV imports, deduplicate lists, filter repeated log entries, and ensure data uniqueness before processing.

### Key Features of Duplicate Removal Tools

- **Smart Duplicate Detection:** Identifies exact duplicate lines (case-sensitive) or similar lines ignoring capitalization (case-insensitive). Handles text, numbers, and mixed content.
- **Order Preservation:** Maintains the original order of lines, keeping the first occurrence of each unique line. Order preservation is critical when line sequence matters.
- **Whitespace Handling:** Option to trim leading/trailing whitespace before comparison, treating "  Hello  " and "Hello" as duplicates. Essential for cleaning data with inconsistent spacing.
- **Statistics Reporting:** Real-time counts of total lines, unique lines, duplicates removed, and removal percentage. Statistics help verify cleaning effectiveness.

### Why Developers Need Duplicate Removal

Data validation before importing requires ensuring no duplicate records exist. CSV imports, database migrations, or API data ingestion often fail when duplicates violate uniqueness constraints. Removing duplicates before import prevents errors and data corruption.

List management for configuration files, environment variables, or feature flags benefits from deduplication. Duplicate entries cause confusion, waste resources, or create unexpected behavior. Clean, unique lists improve maintainability.

Log file analysis requires filtering repeated error messages or warnings that clutter output. Seeing unique errors once instead of hundreds of times makes debugging faster and more effective.

Code refactoring sometimes needs deduplicating import statements, removing repeated comments, or cleaning up generated code. Duplicate detection identifies redundancies for manual review.

### Common Duplicate Removal Scenarios

**CSV Data Cleaning:** Remove duplicate customer records, deduplicate product IDs, clean survey responses. Ensure data uniqueness before database import or analysis.

**Configuration Files:** Deduplicate environment variables, remove repeated API endpoints, clean feature flag lists. Prevent conflicts and confusion from duplicate config entries.

**Log Analysis:** Filter repeated error messages to see unique errors. Remove duplicate timestamps or events. Compress log files by eliminating redundant entries.

**Content Management:** Deduplicate tag lists, clean keyword arrays, remove repeated URLs. Ensure uniqueness in content metadata and taxonomies.

### Duplicate Removal vs Manual Cleaning

Manual duplicate detection is slow and error-prone for lists with dozens or hundreds of lines. Visual scanning misses subtle differences like trailing spaces or capitalization variations. Automated duplicate removal guarantees accuracy.

Unlike spreadsheet tools that require column selection and complex filters, this tool operates on entire lines with simple mode toggles. No formula writing or multi-step filtering needed.

Browser-based processing means no installation, works across platforms, and handles data client-side for privacy. Your lists and data never leave your device.`
  },

  useCases: [
    {
      title: "CSV and Database Import Cleaning",
      description: "Remove duplicate records before importing CSV files into databases. Prevent unique constraint violations, ensure data integrity, and clean messy data exports. Essential for ETL pipelines and data migration.",
      example: `# CSV duplicate removal workflow
# Before: Customer list with duplicates
john@example.com,John Doe,2026-01-15
jane@example.com,Jane Smith,2026-01-20
john@example.com,John Doe,2026-01-15
bob@example.com,Bob Johnson,2026-02-01
jane@example.com,Jane Smith,2026-01-20

# After: Duplicates removed (first occurrence kept)
john@example.com,John Doe,2026-01-15
jane@example.com,Jane Smith,2026-01-20
bob@example.com,Bob Johnson,2026-02-01

# Statistics:
# Total Lines: 5
# Unique Lines: 3
# Duplicates Removed: 2 (40%)

# Database import now succeeds:
# - No duplicate email violations
# - Data integrity maintained
# - Import completes without errors

# Case-insensitive matching for email cleanup:
JOHN@EXAMPLE.COM,John Doe,2026-01-15
john@example.com,John Doe,2026-01-15
# Both treated as duplicates, first kept`
    },
    {
      title: "Log File Deduplication",
      description: "Filter repeated error messages or warnings in application logs. See unique errors once instead of hundreds of times. Essential for debugging and log analysis in production systems.",
      example: `# Application log deduplication
# Before: Logs with repeated errors
[2026-02-01 10:15:23] ERROR: Database connection failed
[2026-02-01 10:15:24] WARN: Retry attempt 1
[2026-02-01 10:15:25] ERROR: Database connection failed
[2026-02-01 10:15:26] WARN: Retry attempt 1
[2026-02-01 10:15:27] ERROR: Database connection failed
[2026-02-01 10:15:28] INFO: Server responding
[2026-02-01 10:15:29] ERROR: Database connection failed

# After: Unique log entries only
[2026-02-01 10:15:23] ERROR: Database connection failed
[2026-02-01 10:15:24] WARN: Retry attempt 1
[2026-02-01 10:15:28] INFO: Server responding

# Result: 3 unique messages instead of 7 total
# Easier to identify distinct error types
# Faster debugging and root cause analysis

# Extract unique error messages only:
# 1. Filter to ERROR lines
# 2. Remove duplicates
# 3. Count unique error types`
    },
    {
      title: "Code Import and Configuration Cleanup",
      description: "Remove duplicate import statements, deduplicate environment variables, clean repeated configuration entries. Prevent code conflicts and maintain clean, organized codebases.",
      example: `// Before: Code with duplicate imports
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; // duplicate
import { Card } from '@/components/ui/card';
import axios from 'axios'; // duplicate

// After: Duplicates removed
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Environment variable deduplication:
# Before: .env with duplicates
API_URL=https://api.example.com
DATABASE_URL=postgres://localhost/db
API_URL=https://api.example.com
AUTH_SECRET=secret123
DATABASE_URL=postgres://localhost/db

# After: Clean .env file
API_URL=https://api.example.com
DATABASE_URL=postgres://localhost/db
AUTH_SECRET=secret123

// Prevents:
// - Multiple import conflicts
// - Redundant network requests
// - Configuration ambiguity
// - Build warnings`
    },
    {
      title: "List and Content Deduplication",
      description: "Clean tag lists, deduplicate keyword arrays, remove repeated URLs or IDs. Essential for content management, SEO metadata, and data organization.",
      example: `// Tag deduplication for blog posts
// Before: Tags with duplicates and case variations
javascript
JavaScript
React
react
TypeScript
javascript
Node.js
typescript

// Case-sensitive (default):
javascript
JavaScript
React
react
TypeScript
Node.js
typescript
// Duplicates removed: 2 (exact matches only)

// Case-insensitive:
javascript
React
TypeScript
Node.js
// Duplicates removed: 4 (case variations merged)

// URL list cleaning:
# Before: URLs with duplicates
https://example.com/page1
https://example.com/page2
https://example.com/page1
https://example.com/page3
https://example.com/page2

# After: Unique URLs
https://example.com/page1
https://example.com/page2
https://example.com/page3

// Keyword deduplication for SEO:
# Remove duplicate keywords while preserving order
# First occurrence kept, later duplicates removed`
    }
  ],

  howToUse: {
    title: "How to Use This Duplicate Remover Tool",
    content: `This duplicate remover provides intelligent duplicate detection with case-sensitive and case-insensitive modes, whitespace trimming, and real-time statistics. All processing happens client-side for instant results and complete privacy.

### Basic Duplicate Removal

Paste text with one item per line into the input area. Duplicate lines are automatically detected and removed, with results appearing instantly. The tool preserves the first occurrence of each unique line, maintaining original order.

For example, if line A appears three times in your input, the first A is kept and the other two are removed. This order preservation ensures chronological or logical sequence remains intact.

The tool treats each line as a single unit. Two lines are duplicates only if their entire content matches exactly (in case-sensitive mode) or matches ignoring capitalization (in case-insensitive mode).

### Case-Sensitive vs Case-Insensitive

Case-sensitive mode (default) treats capitalization as significant. "Apple" and "apple" are different lines - both are kept. Use case-sensitive for code, configuration files, or when capitalization matters.

Case-insensitive mode ignores capitalization. "Apple", "apple", and "APPLE" are treated as duplicates - only the first occurrence is kept. Use case-insensitive for general text, email lists, or when capitalization varies inconsistently.

Toggle between modes to see how duplicate count changes. Case-insensitive typically finds more duplicates because it ignores capitalization variations.

### Trim Whitespace Option

Enable "Trim Whitespace" to remove leading and trailing spaces/tabs before comparison. This treats "  Hello  ", "Hello  ", "  Hello", and "Hello" as duplicates, keeping only the first occurrence.

Whitespace trimming is essential for cleaning data from inconsistent sources where spacing varies. CSV exports, manual lists, or copied text often have irregular spacing that should be ignored during deduplication.

Without trimming, "Hello" and " Hello" (with leading space) are treated as different lines. With trimming, they're duplicates.

### Duplicate Statistics

The statistics panel shows:
- **Total Lines:** Number of lines in the input (including duplicates and empty lines)
- **Unique Lines:** Number of distinct lines in the output (duplicates removed)
- **Duplicates Removed:** Number of duplicate lines eliminated (Total - Unique)
- **Removal Percentage:** Proportion of input that was duplicates ((Duplicates / Total) × 100%)

High removal percentage (>30%) indicates significant duplication. Low percentage (<5%) means data is mostly unique already.

### Empty Line Handling

Empty lines (blank lines with no content or only whitespace) are treated as potential duplicates. If your input has 10 empty lines, all but the first are removed by default.

To remove all empty lines (not just duplicates), enable "Remove All Empty Lines" option. This filters out any line with zero content or only whitespace, regardless of whether it's a duplicate.

### Order Preservation

The tool maintains the original order of lines. If your input is "B, A, B, C, A", the output is "B, A, C" (first occurrence of each kept in original order). This is critical when line sequence has meaning.

For sorted, deduplicated output, first remove duplicates with this tool, then sort the result using the Sort Text tool. Chaining operations gives you full control over order and uniqueness.

### Real-Time Updates

All statistics and results update instantly as you paste or edit text. No "Remove" button needed - deduplication happens in real-time. Change modes and see the duplicate count adjust automatically.

This real-time behavior makes it easy to experiment with different settings (case-sensitive vs insensitive, trim whitespace) to find the right deduplication approach for your data.

### Keyboard Shortcuts

- **Ctrl+D / Cmd+D:** Toggle duplicate removal on/off
- **Ctrl+I / Cmd+I:** Toggle case-insensitive mode
- **Ctrl+T / Cmd+T:** Toggle trim whitespace
- **Ctrl+C / Cmd+C:** Copy deduplicated output

### Performance for Large Files

The tool handles files with thousands of lines efficiently. Duplicate detection uses hash map lookup (O(n) complexity) for optimal performance. Files with 10,000-50,000 lines process in under 100ms.

For very large files (100,000+ lines), initial processing may take 1-2 seconds depending on browser and device. After that, results are cached and mode changes update instantly.`,
    steps: [
      {
        name: "Paste Text",
        text: "Enter or paste text with one item per line. The tool accepts any text format including code, data, logs, or lists."
      },
      {
        name: "Configure Options",
        text: "Select case-sensitive or case-insensitive matching. Enable trim whitespace to ignore leading/trailing spaces during comparison."
      },
      {
        name: "Review Statistics",
        text: "Check total lines, unique lines, duplicates removed, and removal percentage. Verify the cleaning matches expectations."
      },
      {
        name: "Copy Clean Data",
        text: "Click Copy to transfer deduplicated text to clipboard. Use for imports, configuration files, or cleaned datasets."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between case-sensitive and case-insensitive duplicate detection?",
      answer: "Case-sensitive treats 'Apple' and 'apple' as different lines (both kept). Case-insensitive treats them as duplicates (only first kept). Use case-sensitive for code, filenames, or when capitalization is meaningful. Use case-insensitive for general text, email lists, or when capitalization varies inconsistently. Toggle between modes to see duplicate count difference."
    },
    {
      question: "Does this tool preserve the order of lines?",
      answer: "Yes. The tool keeps the first occurrence of each unique line and preserves original line order. If input is 'B, A, B, C, A', output is 'B, A, C' (original order maintained). Order preservation is critical when line sequence has meaning - timestamps, dependency order, or narrative flow. For sorted output, use the Sort Text tool after deduplication."
    },
    {
      question: "How does whitespace trimming work?",
      answer: "When 'Trim Whitespace' is enabled, leading and trailing spaces/tabs are removed before comparing lines. This treats '  Hello  ', 'Hello  ', '  Hello', and 'Hello' as duplicates. Essential for cleaning data with inconsistent spacing from CSV exports or copied text. Without trimming, these variations are treated as different lines. Trimming only affects comparison - the actual output preserves the first occurrence's exact formatting."
    },
    {
      question: "What happens to empty lines?",
      answer: "Empty lines (blank or whitespace-only) are treated as potential duplicates. If you have 10 empty lines, duplicate removal keeps only the first one. To remove all empty lines, enable 'Remove All Empty Lines' option which filters out any line with zero content, regardless of duplication. This is useful for cleaning data files with excessive blank spacing."
    },
    {
      question: "Can I remove duplicates from CSV data?",
      answer: "Yes, but the tool compares entire lines, not individual columns. To deduplicate by a specific CSV column, you need to: 1) Extract that column, 2) Remove duplicates, 3) Use the deduplicated rows to filter the original CSV. Or, use spreadsheet software (Excel, Google Sheets) with column-specific deduplication. This tool works best for deduplicating entire CSV rows."
    },
    {
      question: "How many duplicates can this tool handle?",
      answer: "The tool handles thousands of duplicate lines efficiently using hash map lookup (O(n) performance). Files with 50,000 lines process in under 100ms. Very large files (500,000+ lines) may take 1-2 seconds initially. There's no hard limit, but browser memory (typically 100-500MB for JavaScript) determines practical maximum. For massive deduplication (millions of lines), use command-line tools (sort -u, awk) optimized for large-scale processing."
    },
    {
      question: "Is my data private when using this duplicate remover?",
      answer: "Absolutely. All duplicate detection happens entirely in your browser using client-side JavaScript. Your data never leaves your device. No server uploads, no backend processing, no data transmission. Safe for sensitive data, confidential lists, customer records, or regulated information (HIPAA, GDPR, PCI-DSS). Verify in browser DevTools Network tab - zero outbound requests containing your data."
    },
    {
      question: "Can I keep the last occurrence instead of the first?",
      answer: "Not directly - the tool keeps first occurrences by design (most common use case). To keep last occurrences: 1) Use the Reverse Text tool to flip line order, 2) Remove duplicates (former last occurrence is now first), 3) Reverse again to restore original order with last occurrences kept. Chaining tools gives you full control over which occurrences to preserve."
    },
    {
      question: "Why is the duplicate count different with case-insensitive mode?",
      answer: "Case-insensitive mode finds more duplicates because it ignores capitalization variations. 'JavaScript', 'javascript', and 'JAVASCRIPT' are three unique lines in case-sensitive mode but one duplicate group in case-insensitive mode. The duplicate count increases (more duplicates detected) when you switch to case-insensitive because capitalization variations are now treated as duplicates."
    },
    {
      question: "Can I see which lines were removed as duplicates?",
      answer: "The tool shows how many duplicates were removed but not which specific lines. To identify removed duplicates: 1) Copy original text, 2) Remove duplicates, 3) Compare line counts (Total Lines vs Unique Lines difference = duplicates removed). Or, manually compare input and output to see which first occurrences were kept. For detailed duplicate reports, use command-line tools (sort | uniq -d) or spreadsheet conditional highlighting."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your data never leaves your browser. This duplicate remover operates entirely client-side using JavaScript Set or hash map data structures built into your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All duplicate detection happens in your browser's JavaScript engine. Lists, code, and data stay on your device.
- **No Server Uploads:** We don't have servers to process your data. The tool works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what you deduplicate, how often you use the tool, or any content-specific metrics.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your data.

This makes the tool safe for deduplicating sensitive data, customer records, confidential lists, or regulated information (HIPAA, GDPR, PCI-DSS). Use with confidence for production data, private datasets, or proprietary content.

### Performance Characteristics

Duplicate detection uses a Set data structure for O(n) time complexity where n is the number of lines. Modern browsers handle 50,000 lines in under 100ms. Space complexity is O(n) for storing unique lines.

Memory usage scales linearly with unique line count. A file with 10,000 unique lines uses about 2-3MB of browser memory. Your browser's available memory determines the practical size limit for very large deduplication tasks.`
  },

  stats: {
    "Detection Speed": "<100ms",
    "Max Lines": "100K+",
    "Detection Modes": "2",
    "Order Preserved": "Yes",
    "Server Uploads": "0"
  }
};
