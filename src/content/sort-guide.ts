/**
 * Sort Text Tool Guide Content
 * Comprehensive developer guide for text and data sorting
 */

import type { ToolGuideContent } from "./types";

export const sortGuideContent: ToolGuideContent = {
  toolName: "Sort Text",
  toolPath: "/sort",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Lines to Sort",
      description: "Enter or paste any text with one item per line. Works with code, lists, CSV data, log files, or any line-based content."
    },
    {
      title: "Choose Sort Method",
      description: "Select alphabetical (A-Z or Z-A), numerical, by length, random shuffle, or reverse order. The tool supports case-sensitive and case-insensitive sorting."
    },
    {
      title: "Configure Sort Options",
      description: "Enable case-sensitive sorting, remove duplicates, or remove empty lines. Preview shows the result before applying changes."
    },
    {
      title: "Copy Sorted Results",
      description: "Click copy to transfer sorted text to clipboard. Use the sorted data in code, documentation, data files, or analysis tools."
    }
  ],

  introduction: {
    title: "What is Text Sorting?",
    content: `Text sorting arranges lines of text in a specific order - alphabetically, numerically, by length, or using custom criteria. Beyond basic alphabetical ordering, modern text sorting tools support multiple sort algorithms, case sensitivity options, duplicate removal, and natural number sorting essential for organizing data, cleaning imports, and preparing content for analysis.

Sorting is a fundamental data operation in software development, appearing in database queries, array operations, file organization, and data processing pipelines. Developers sort to organize imports, alphabetize lists, order data exports, remove duplicates, and prepare data for efficient searching or comparison.

### Key Features of Text Sorting Tools

- **Multiple Sort Methods:** Alphabetical (A-Z, Z-A), numerical (1-100), length-based (shortest to longest), random shuffle, or reverse current order. Each method serves different use cases.
- **Case-Sensitive Options:** Sort case-sensitively (A before a) or case-insensitively (treat A and a as equal). Critical for code organization and data consistency.
- **Data Cleaning:** Remove duplicate lines, filter empty lines, trim whitespace. Sorting often includes cleaning operations to prepare data for use.
- **Natural Number Sorting:** Correctly sort "file1, file2, file10" instead of "file1, file10, file2" (lexicographic). Essential for filename sorting and version numbers.

### Why Developers Need Text Sorting

Code organization requires sorted imports for consistency and easier navigation. Many style guides mandate alphabetical import order. Sorting imports prevents duplicate imports and makes code reviews easier by eliminating arbitrary ordering changes.

Data processing tasks like CSV sorting, log file organization, or preparing data for diffs benefit from consistent ordering. Sorted data is easier to compare, search, and analyze. Database exports often need re-sorting by different columns.

Configuration files with sorted keys are easier to maintain and diff. Alphabetical sorting prevents merge conflicts when multiple developers add entries. Sorted environment variables, API endpoints, or feature flags improve readability.

List management for documentation, changelogs, or content databases requires alphabetical or chronological ordering. Sorted lists improve user experience and make finding items faster.

### Common Text Sorting Scenarios

**Import Organization:** Sort JavaScript/Python imports alphabetically. Remove duplicate imports. Order third-party imports before local imports. Enforce consistent import order across files.

**Data Cleaning:** Sort CSV rows, deduplicate entries, remove empty records. Prepare data for import validation. Order records by ID or name for manual review.

**Log Analysis:** Sort log entries by timestamp, severity, or component. Group related log messages together. Remove duplicate errors.

**Content Management:** Alphabetize lists in documentation, sort changelog entries, order feature lists. Maintain consistent ordering in markdown files.

### Text Sorting vs Manual Ordering

Manual sorting is time-consuming and error-prone for lists with more than a few items. Text sorting tools guarantee consistent ordering and process thousands of lines instantly. Case-insensitive sorting eliminates inconsistencies from capitalization variations.

Unlike basic command-line sort (sort command), this tool offers multiple sort methods, duplicate removal, and real-time preview. The visual interface makes it easy to compare before and after results.

Browser-based operation means no installation, works across platforms, and handles data client-side for privacy. Your lists, code, and data never leave your device.`
  },

  useCases: [
    {
      title: "Code Import Organization",
      description: "Sort JavaScript, Python, or other language imports alphabetically for consistency and maintainability. Remove duplicate imports and organize by import type. Essential for code style compliance and reducing merge conflicts.",
      example: `// Before: Unsorted imports
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; // duplicate
import express from 'express';
import { Card } from '@/components/ui/card';

// After: Alphabetically sorted, duplicates removed
import axios from 'axios';
import express from 'express';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

// Advanced: Sort by import type
// 1. Third-party packages
import axios from 'axios';
import express from 'express';
import { useState, useEffect } from 'react';

// 2. Local components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';`
    },
    {
      title: "CSV and Data File Sorting",
      description: "Sort CSV rows, database exports, or structured data files by any column. Remove duplicate records and clean data before import. Prepare data for comparison, analysis, or merging datasets.",
      example: `# CSV sorting workflow
# Before: Unsorted customer data
John Doe,john@example.com,2026-02-01
Alice Smith,alice@example.com,2026-01-15
Bob Johnson,bob@example.com,2026-02-10
Alice Smith,alice@example.com,2026-01-15 (duplicate)
Charlie Brown,charlie@example.com,2026-01-20

# After: Alphabetically sorted by name, duplicates removed
Alice Smith,alice@example.com,2026-01-15
Bob Johnson,bob@example.com,2026-02-10
Charlie Brown,charlie@example.com,2026-01-20
John Doe,john@example.com,2026-02-01

# Sort by date (requires extracting date column):
Alice Smith,alice@example.com,2026-01-15
Charlie Brown,charlie@example.com,2026-01-20
John Doe,john@example.com,2026-02-01
Bob Johnson,bob@example.com,2026-02-10

# Numerical sorting for IDs:
Before: 10, 2, 1, 20, 3
After: 1, 2, 3, 10, 20 (natural number order)`
    },
    {
      title: "Log File Organization",
      description: "Sort log entries for analysis, group related messages, or organize by severity. Remove duplicate log lines and clean up verbose logging output. Essential for debugging and log analysis.",
      example: `# Application logs sorting
# Before: Mixed log entries
[ERROR] Database connection failed at 10:15:23
[INFO] Server started on port 3000
[WARN] High memory usage detected
[ERROR] Database connection failed at 10:15:23 (duplicate)
[INFO] Request processed in 45ms
[ERROR] API timeout after 30s

# After: Sorted by severity (custom order: ERROR, WARN, INFO)
[ERROR] API timeout after 30s
[ERROR] Database connection failed at 10:15:23
[WARN] High memory usage detected
[INFO] Request processed in 45ms
[INFO] Server started on port 3000

# Remove duplicates and empty lines
# Final count: 5 unique log entries

# Alphabetical sort for grouping:
[ERROR] API timeout after 30s
[ERROR] Database connection failed at 10:15:23
[INFO] Request processed in 45ms
[INFO] Server started on port 3000
[WARN] High memory usage detected`
    },
    {
      title: "Documentation and Content Lists",
      description: "Alphabetize feature lists, API endpoints, command references, or glossary terms in documentation. Maintain consistent ordering in README files, changelogs, and markdown documents.",
      example: `# Before: Unsorted API endpoints
POST /users/create
GET /products/list
DELETE /users/:id
PUT /products/:id/update
GET /users/:id
POST /products/create

# After: Alphabetically sorted
DELETE /users/:id
GET /products/list
GET /users/:id
POST /products/create
POST /users/create
PUT /products/:id/update

# Changelog sorting:
# Before: Random order
- Fixed login bug
- Added dark mode
- Updated dependencies
- Fixed login bug (duplicate)
- Improved performance

# After: Alphabetical
- Added dark mode
- Fixed login bug
- Improved performance
- Updated dependencies

# Natural sorting for versions:
Before: v1.10.0, v1.2.0, v1.1.0, v2.0.0
After: v1.1.0, v1.2.0, v1.10.0, v2.0.0`
    }
  ],

  howToUse: {
    title: "How to Use This Sort Text Tool",
    content: `This text sorting tool provides multiple sort methods with real-time preview and data cleaning options. All processing happens client-side for instant results and complete privacy.

### Basic Alphabetical Sorting

Paste text with one item per line into the input area. Click "Sort A-Z" for ascending alphabetical order, or "Sort Z-A" for descending. The result appears instantly in the output area, ready to copy.

Case-insensitive sorting (default) treats "Apple" and "apple" as equivalent, grouping them together. Case-sensitive sorting separates uppercase and lowercase, placing uppercase letters before lowercase (A before a).

Alphabetical sorting uses Unicode lexicographic comparison, so numbers come before letters, special characters sort by ASCII value. For better number handling, use numerical sort.

### Numerical Sorting

For lists containing numbers, enable numerical sort to order by numeric value instead of alphabetically. This correctly sorts "1, 2, 10, 20" instead of the alphabetical "1, 10, 2, 20".

Natural number sorting handles embedded numbers in text, like filenames: "file1.txt, file2.txt, file10.txt" sorts correctly. Use this for version numbers, file names, or mixed text-number content.

Pure numerical sort works best when each line starts with or contains only numbers. For mixed content, use natural sort or sort by length instead.

### Sort by Length

Sort by length arranges lines by character count, shortest to longest or longest to shortest. Useful for identifying outliers, organizing by verbosity, or creating visual patterns.

Length sorting helps find the longest or shortest items in lists quickly. In code, it can identify overly long variable names or function signatures. In content, it highlights verbose vs concise entries.

Tie-breaking uses alphabetical order when multiple lines have the same length, ensuring consistent results across multiple sorts.

### Random Shuffle and Reverse

Random shuffle randomly reorders lines, useful for anonymizing data, creating test datasets, or randomizing lists for sampling. Each shuffle produces a different order.

Reverse order flips the current line order, useful for changing ascending to descending or vice versa. Apply twice to return to original order.

### Removing Duplicates and Empty Lines

Enable "Remove Duplicates" to keep only unique lines. Duplicate detection is case-sensitive by default, matching the sort method. The first occurrence of each unique line is kept, subsequent duplicates are removed.

Duplicate removal happens after sorting, so the kept occurrences follow the sort order. Combine with alphabetical sorting to group duplicates before removal.

"Remove Empty Lines" filters out blank lines and lines with only whitespace. Useful for cleaning data imports, removing formatting artifacts, or compressing lists.

### Sort Options and Preview

Configure sort direction (ascending/descending), case sensitivity, and data cleaning options before sorting. The preview updates in real-time as you change settings.

Match count shows how many lines will be in the output. If it differs from input count, duplicates or empty lines were removed. Review the preview before copying to ensure the sort meets expectations.

### Keyboard Shortcuts

- **Ctrl+S / Cmd+S:** Execute sort with current settings
- **Ctrl+C / Cmd+C:** Copy output to clipboard
- **Ctrl+R / Cmd+R:** Reverse current order
- **Ctrl+D / Cmd+D:** Toggle remove duplicates

### Advanced Sorting Techniques

For multi-column sorting (like CSV), extract the column to sort by, sort it separately, then use the sorted order to reorder the original data. Or use a spreadsheet tool for complex multi-column sorts.

For custom sort orders (like log severity ERROR > WARN > INFO), use find & replace to add numeric prefixes (1-ERROR, 2-WARN, 3-INFO), sort numerically, then remove prefixes.

Chain operations: sort alphabetically, then remove duplicates, then sort by length. Each step refines the output for complex data organization needs.`,
    steps: [
      {
        name: "Enter Lines",
        text: "Paste or type text with one item per line. The tool accepts any text format including code, data, or lists."
      },
      {
        name: "Choose Sort Method",
        text: "Select alphabetical (A-Z or Z-A), numerical, by length, random, or reverse. Configure case sensitivity and duplicate removal options."
      },
      {
        name: "Preview Results",
        text: "The output area shows sorted results in real-time. Review line count and verify the sort order matches expectations."
      },
      {
        name: "Copy Output",
        text: "Click Copy to transfer sorted text to clipboard. Paste into your code editor, data file, or documentation."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between case-sensitive and case-insensitive sorting?",
      answer: "Case-insensitive (default) treats uppercase and lowercase as equal: 'Apple' and 'apple' sort together. Case-sensitive separates them: uppercase comes first (A < a in ASCII), so 'Apple' appears before 'apple'. Use case-insensitive for user-facing lists where capitalization varies. Use case-sensitive for code or when capitalization is meaningful (class names vs variable names)."
    },
    {
      question: "How does numerical sorting differ from alphabetical sorting?",
      answer: "Alphabetical sorting treats numbers as text: '10' comes before '2' because '1' < '2' as characters. Numerical sorting parses numbers: 2 comes before 10. For mixed text-number content like 'file1.txt, file10.txt, file2.txt', use natural number sorting which correctly orders as 'file1.txt, file2.txt, file10.txt'. Always use numerical sort for pure number lists."
    },
    {
      question: "Can this tool sort CSV data by specific columns?",
      answer: "Not directly - the tool sorts entire lines as text. To sort CSV by a specific column: 1) Open in spreadsheet software (Excel, Google Sheets), 2) Use column sort features, 3) Export as text. Or, use command-line tools like 'sort -t, -k2' (Unix) for column-specific sorting. This tool works best for single-column lists or when sorting by the first column of CSV data."
    },
    {
      question: "How do I sort in reverse alphabetical order (Z-A)?",
      answer: "Click 'Sort Z-A' button for descending alphabetical order. Or, sort A-Z first, then click 'Reverse Order' to flip the result. Both methods produce the same output. Reverse order is useful for quickly flipping any sorted list, not just alphabetical. Apply to numerical or length-based sorts too."
    },
    {
      question: "What happens to duplicate lines when sorting?",
      answer: "By default, duplicates are preserved and sorted along with unique lines. Enable 'Remove Duplicates' to keep only one copy of each unique line. Duplicate detection is exact text matching (case-sensitive or case-insensitive based on settings). The first occurrence of each line is kept, subsequent duplicates removed. Total line count decreases when duplicates are removed."
    },
    {
      question: "Can I sort by line length instead of alphabetically?",
      answer: "Yes. Select 'Sort by Length' to arrange lines by character count, shortest to longest (ascending) or longest to shortest (descending). Useful for finding the longest/shortest items, organizing content by verbosity, or creating visual patterns. When multiple lines have the same length, they're sub-sorted alphabetically for consistent results."
    },
    {
      question: "How does random shuffle work?",
      answer: "Random shuffle reorders lines in a random, unpredictable sequence using JavaScript's Math.random(). Each shuffle produces a different order. Useful for anonymizing data, creating test samples, or randomizing quiz questions. Not cryptographically secure - don't use for security-critical randomization. For repeatable random order, use external tools with seed-based randomization."
    },
    {
      question: "Is my data private when using this sorting tool?",
      answer: "Absolutely. All sorting happens entirely in your browser using client-side JavaScript array methods. Your text never leaves your device. No server uploads, no backend processing, no data transmission. Safe for proprietary code, sensitive data, confidential lists, or regulated information. Verify in browser DevTools Network tab - zero outbound requests containing your data."
    },
    {
      question: "Can I sort extremely large files (100,000+ lines)?",
      answer: "The tool handles large files, but browser performance depends on available memory and line count. Files with 10,000-50,000 lines sort instantly. 100,000+ lines may take 1-2 seconds. For massive files (millions of lines), use command-line tools (sort, awk) which are optimized for large-scale sorting without memory constraints. This browser tool is fastest for files under 100,000 lines."
    },
    {
      question: "Can I undo a sort operation?",
      answer: "The tool doesn't have built-in undo, but you can use browser undo (Ctrl+Z / Cmd+Z) in the text area before copying results. Best practice: keep your original text in a separate location before sorting. Or, use the 'Reverse Order' button to flip sorted results back (only works for simple A-Z to Z-A reversals, not for complex transformations with duplicate removal)."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text data never leaves your browser. This sorting tool operates entirely client-side using JavaScript array methods and built-in sorting algorithms. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All text sorting happens in your browser's JavaScript engine. Lists, code, and data stay on your device.
- **No Server Uploads:** We don't have servers to process your text. The tool works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what you sort, how often you use the tool, or any content-specific metrics.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your data.

This makes the tool safe for sorting proprietary code imports, sensitive data lists, confidential records, or regulated information (HIPAA, GDPR, PCI-DSS). Use with confidence for production code, customer data, or private lists.

### Performance Characteristics

Sorting uses JavaScript's built-in Array.sort() with custom comparator functions. Performance is O(n log n) for most inputs. Modern browsers handle 50,000 lines in under 100ms. Very large files (500,000+ lines) may take 1-2 seconds depending on browser and device.

Memory usage scales linearly with input size. A 1MB text file (roughly 10,000-20,000 lines) uses about 2-3MB of browser memory during sorting. Your browser's available memory determines the practical size limit.`
  },

  stats: {
    "Sort Speed": "<100ms",
    "Max Lines": "100K+",
    "Sort Methods": "6",
    "Duplicate Detection": "Exact match",
    "Server Uploads": "0"
  }
};
