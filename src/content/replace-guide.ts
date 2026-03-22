/**
 * Find & Replace Tool Guide Content
 * Comprehensive developer guide for text search and replacement
 */

import type { ToolGuideContent } from "./types";

export const replaceGuideContent: ToolGuideContent = {
  toolName: "Find & Replace",
  toolPath: "/replace",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Text to Search",
      description: "Paste your text, code, or data into the input area. The tool supports any text format including code, JSON, CSV, logs, or plain text."
    },
    {
      title: "Define Search Pattern",
      description: "Enter the text or regex pattern to find. Enable case-sensitive matching, whole word matching, or regex mode for complex patterns. The tool highlights all matches in real-time."
    },
    {
      title: "Specify Replacement Text",
      description: "Enter the replacement text. Use regex capture groups ($1, $2) for advanced replacements. Leave empty to delete matched text. Preview shows results before applying."
    },
    {
      title: "Execute Replace Operation",
      description: "Click 'Replace All' to transform all matches, or 'Replace Next' to review each change individually. Copy the result or download as a file."
    }
  ],

  introduction: {
    title: "What is Find & Replace?",
    content: `Find & Replace is a text transformation tool that searches for patterns in text and replaces them with new values. Beyond simple string substitution, modern find & replace tools support regular expressions, case-insensitive matching, whole word boundaries, and advanced pattern transformations essential for code refactoring, data cleaning, and bulk text editing.

Find & Replace is one of the most frequently used features in text editors, IDEs, and data processing tools. Developers use it daily to refactor variable names, update API endpoints, fix typos across files, transform data formats, and automate repetitive text editing tasks.

### Key Features of Find & Replace Tools

- **Pattern Matching:** Search for exact strings, case-insensitive text, whole words, or complex regular expression patterns. Real-time highlighting shows all matches before replacement.
- **Bulk Replacement:** Replace all occurrences at once or step through matches individually to review each change. Preview mode shows results before applying transformations.
- **Regular Expression Support:** Use regex for advanced patterns like phone numbers, email addresses, URLs, or custom data formats. Capture groups enable sophisticated transformations.
- **Multiple Replacement Modes:** Replace all matches instantly, replace first occurrence only, or interactively replace one-by-one with confirmation. Different modes suit different workflows.

### Why Developers Need Find & Replace

Code refactoring frequently requires renaming variables, functions, or classes across multiple occurrences. Find & Replace with whole word matching ensures exact matches without partial replacements. For example, renaming 'user' to 'customer' shouldn't change 'username' to 'customername'.

Data transformation tasks like converting date formats (MM/DD/YYYY to YYYY-MM-DD), standardizing phone numbers, or cleaning CSV data benefit from regex-based find & replace. A single regex pattern can transform thousands of records instantly.

Configuration updates require changing API endpoints, database URLs, or environment-specific values across multiple configuration files. Find & Replace with exact matching prevents accidental changes to similar but different values.

Content migration often needs updating URLs, fixing deprecated HTML tags, or standardizing terminology across documentation. Bulk find & replace saves hours compared to manual editing.

### Common Find & Replace Scenarios

**Code Refactoring:** Rename variables, functions, or classes. Update import paths after reorganizing code. Replace deprecated API calls with new equivalents. Change coding conventions (camelCase to snake_case).

**Data Cleaning:** Standardize date formats, clean phone numbers, remove extra whitespace, fix encoding issues. Transform CSV data to match import requirements.

**Configuration Updates:** Update API endpoints across config files, change database connection strings, replace environment variables, update version numbers in multiple files.

**Content Editing:** Fix typos across large documents, update terminology, replace deprecated terms, standardize formatting, convert markup syntax (Markdown to HTML).

### Find & Replace vs Manual Editing

Manual editing is error-prone and time-consuming for multiple occurrences. Find & Replace guarantees consistency - all matches transform identically. Preview mode lets you verify changes before applying them, reducing risk.

Unlike basic text editor find & replace, this tool offers regex support, match counting, and batch processing. The browser-based interface works across operating systems without installation.

Real-time match highlighting shows exactly what will change before you commit to replacements. This visual feedback prevents unexpected transformations and helps refine search patterns.`
  },

  useCases: [
    {
      title: "Code Refactoring and Variable Renaming",
      description: "Rename variables, functions, or classes across code files. Use whole word matching to avoid partial replacements. Essential for improving code readability, following naming conventions, or migrating to new terminology.",
      example: `// Before: Rename variable 'data' to 'userData'
function processData(data) {
  const results = transformData(data);
  saveData(data, results);
  return data;
}

// Find: data (with "Whole Word" enabled)
// Replace: userData
// Matches: 4 occurrences

// After: Clean refactoring
function processData(userData) {
  const results = transformData(userData);
  saveData(userData, results);
  return userData;
}

// Whole word matching prevents:
// - 'metadata' → 'metauserData' ❌
// - 'database' → 'userDatabase' ❌
// - Only 'data' → 'userData' ✓`
    },
    {
      title: "Data Format Transformation with Regex",
      description: "Transform data formats like dates, phone numbers, or IDs using regular expressions and capture groups. Convert CSV data, clean imports, or standardize formats across datasets. Regex enables complex transformations in a single operation.",
      example: `// Convert date format: MM/DD/YYYY to YYYY-MM-DD
// Input data:
01/15/2026, John Doe, New York
02/20/2026, Jane Smith, Boston
03/10/2026, Bob Johnson, Seattle

// Regex pattern: (\\d{2})/(\\d{2})/(\\d{4})
// Replacement: $3-$1-$2
// Captures: $1=month, $2=day, $3=year

// Result:
2026-01-15, John Doe, New York
2026-02-20, Jane Smith, Boston
2026-03-10, Bob Johnson, Seattle

// Phone number formatting:
// Find: (\\d{3})(\\d{3})(\\d{4})
// Replace: ($1) $2-$3
// 5551234567 → (555) 123-4567

// Remove extra spaces:
// Find: \\s{2,}
// Replace: (single space)
// Multiple    spaces → Single spaces`
    },
    {
      title: "Configuration File Updates",
      description: "Update API endpoints, database URLs, environment variables, or version numbers across configuration files. Replace old values with new ones while preserving file structure. Critical for deployment, environment changes, or API migrations.",
      example: `// Update API endpoint across config
// Old config:
{
  "apiUrl": "https://api-old.example.com/v1",
  "authUrl": "https://api-old.example.com/auth",
  "webhookUrl": "https://api-old.example.com/webhook"
}

// Find: https://api-old.example.com
// Replace: https://api-new.example.com

// New config:
{
  "apiUrl": "https://api-new.example.com/v1",
  "authUrl": "https://api-new.example.com/auth",
  "webhookUrl": "https://api-new.example.com/webhook"
}

// Update environment variable names:
// Find: REACT_APP_
// Replace: VITE_
// REACT_APP_API_KEY → VITE_API_KEY

// Bump version numbers:
// Find: "version": "1.0.0"
// Replace: "version": "1.1.0"`
    },
    {
      title: "Content Migration and Cleanup",
      description: "Fix typos across documentation, update deprecated terminology, convert markup formats, or clean up imported content. Essential for content management, documentation updates, or migrating between platforms.",
      example: `// Fix common typo across documentation:
// Find: "recieve" (case insensitive)
// Replace: "receive"
// 47 matches corrected

// Update deprecated terminology:
// Find: "whitelist"
// Replace: "allowlist"
// Find: "blacklist"
// Replace: "blocklist"

// Convert Markdown links to HTML:
// Find: \\[([^\\]]+)\\]\\(([^\\)]+)\\)
// Replace: <a href="$2">$1</a>
// [Example](https://example.com) → <a href="https://example.com">Example</a>

// Remove HTML tags:
// Find: <[^>]+>
// Replace: (empty)
// <p>Hello <strong>World</strong></p> → Hello World

// Standardize heading format:
// Find: ## (.+)
// Replace: ### $1
// Converts level-2 headings to level-3`
    }
  ],

  howToUse: {
    title: "How to Use This Find & Replace Tool",
    content: `This find & replace tool provides powerful pattern matching with regex support, real-time match highlighting, and preview mode. All processing happens client-side for instant results and complete privacy.

### Basic String Replacement

Enter your text in the input area, type the search pattern in the "Find" field, and the replacement text in the "Replace" field. Click "Replace All" to transform all matches instantly. The tool shows match count before replacement so you know exactly how many changes will occur.

For simple text replacement, disable regex mode and case sensitivity. This treats the search pattern as literal text, matching exactly what you type. Use this for straightforward substitutions like replacing a company name or fixing typos.

### Case-Sensitive and Whole Word Matching

Enable "Case Sensitive" to match exact capitalization. "User" won't match "user" or "USER". Use this when case matters, like distinguishing class names (User) from variable names (user) in code.

Enable "Whole Word" to match complete words only, respecting word boundaries. Searching for "cat" will match "cat" but not "category" or "concatenate". Essential for code refactoring to avoid partial matches in variable names.

### Regular Expression Mode

Enable "Regex" to use regular expression patterns for advanced matching. Regex supports character classes (\\d for digits, \\w for word characters), quantifiers (* + ? {n}), and groups for complex patterns.

Common regex patterns: \\d+ matches numbers, \\s+ matches whitespace, .+ matches any characters. Use parentheses () to create capture groups, then reference them in replacement with $1, $2, etc.

For example, transform "John Doe" to "Doe, John" using pattern (\\w+) (\\w+) and replacement $2, $1. The first (\\w+) captures "John" as $1, second captures "Doe" as $2.

### Replace All vs Replace Next

"Replace All" transforms every match in one operation. Fast and efficient for bulk changes when you're confident in your pattern. Use after previewing matches with the highlight feature.

"Replace Next" steps through matches one at a time, allowing you to review each before replacement. Useful when matches need individual consideration or when testing a new regex pattern. Skip matches you want to keep unchanged.

### Preview and Match Highlighting

Before replacing, the tool highlights all matches in the text. This visual preview shows exactly what will change. If highlighting looks wrong, refine your pattern before executing the replacement.

Match count displays above the input area (e.g., "42 matches found"). If the count is unexpected, review your pattern. Zero matches means the pattern doesn't match anything - check for typos or regex syntax errors.

### Keyboard Shortcuts

- **Ctrl+F / Cmd+F:** Focus find input field
- **Ctrl+H / Cmd+H:** Focus replace input field
- **Enter in Replace field:** Replace next match
- **Ctrl+Enter / Cmd+Enter:** Replace all matches

### Common Regex Patterns

**Email addresses:** [\\w.-]+@[\\w.-]+\\.\\w+
**Phone numbers:** \\d{3}-\\d{3}-\\d{4} or \\(\\d{3}\\) \\d{3}-\\d{4}
**URLs:** https?://[\\w.-]+\\.\\w+[\\w/.-]*
**Dates (MM/DD/YYYY):** \\d{2}/\\d{2}/\\d{4}
**Remove extra spaces:** \\s{2,} (replace with single space)
**Trim whitespace:** ^\\s+|\\s+$ (replace with empty)

### Tips for Effective Replacement

1. Start with a small test sample before processing large files
2. Use match highlighting to verify pattern correctness
3. Enable whole word matching for code refactoring
4. Test regex patterns on regex101.com before using
5. Save your original text before bulk replacements
6. Use capture groups ($1, $2) for transformations, not just deletions`,
    steps: [
      {
        name: "Enter Text",
        text: "Paste text, code, or data into the input area. The tool accepts any text format and size."
      },
      {
        name: "Define Pattern",
        text: "Enter the search pattern in the Find field. Enable regex, case-sensitive, or whole word options as needed. Real-time highlighting shows matches."
      },
      {
        name: "Set Replacement",
        text: "Enter replacement text in the Replace field. Use $1, $2 for regex capture groups. Leave empty to delete matched text."
      },
      {
        name: "Execute Replace",
        text: "Click 'Replace All' for bulk replacement or 'Replace Next' to step through matches. Copy results or download as a file."
      }
    ]
  },

  faqs: [
    {
      question: "How do I use regex capture groups for transformations?",
      answer: "Wrap parts of your regex pattern in parentheses () to create capture groups. In the replacement text, reference these groups as $1, $2, $3, etc. For example, to swap first and last names, use pattern (\\w+) (\\w+) and replacement $2, $1. This transforms 'John Doe' to 'Doe, John'. Each () creates a numbered group starting from $1."
    },
    {
      question: "What's the difference between case-sensitive and case-insensitive search?",
      answer: "Case-sensitive search matches exact capitalization. Searching for 'User' only finds 'User', not 'user' or 'USER'. Case-insensitive (default) matches all capitalization variations. Use case-sensitive for code where 'String' (class) differs from 'string' (type), or when capitalization matters. Use case-insensitive for general text, fixing typos, or when capitalization varies."
    },
    {
      question: "Why isn't my regex pattern working?",
      answer: "Common regex issues: forgetting to escape special characters (. * + ? [] {} () | ^), missing regex mode toggle (tool treats pattern as literal text), incorrect capture group syntax (use $1 not \\1 in replacement), or browser regex engine differences. Test patterns on regex101.com first. Remember to escape dots (\\.) and use double backslashes in some contexts (\\\\d for \\d)."
    },
    {
      question: "Can I undo a replace operation?",
      answer: "The tool doesn't have built-in undo, but browser undo (Ctrl+Z / Cmd+Z) works in the text area before you copy results. Best practice: copy your original text to a safe location before large replace operations. Or use 'Replace Next' to step through matches individually, allowing you to skip unwanted changes. Preview matches with highlighting before committing to 'Replace All'."
    },
    {
      question: "How do I replace with nothing (delete matches)?",
      answer: "Leave the Replace field empty and click Replace All. This deletes all matched text. Useful for removing unwanted patterns like HTML tags (find: <[^>]+>, replace: empty), extra spaces (find: \\s{2,}, replace: empty), or specific characters. Always preview matches with highlighting before deleting to ensure you're removing the right text."
    },
    {
      question: "What does 'whole word' matching do?",
      answer: "Whole word matching adds word boundaries (\\b in regex) around your pattern, ensuring it only matches complete words. Searching for 'cat' with whole word enabled matches 'cat' but not 'category', 'concatenate', or 'scat'. Essential for refactoring code variables - searching 'user' won't match 'username' or 'users'. Whole word respects alphanumeric boundaries and underscores."
    },
    {
      question: "Can I replace newlines or special characters?",
      answer: "Yes, with regex mode. Use \\n for newlines, \\t for tabs, \\r for carriage returns. For example, to remove all newlines (join lines), find \\n and replace with a space. To replace multiple newlines with one, find \\n{2,} and replace with \\n. To add newlines, type Enter in the replacement field or use \\n in regex mode."
    },
    {
      question: "How many matches can this tool handle?",
      answer: "The tool handles thousands of matches efficiently. Performance depends on text size and regex complexity. Simple patterns on 100,000 lines process in under 1 second. Very complex regex with many capture groups may take longer. For massive replacements (millions of lines), consider command-line tools like sed or awk which are optimized for large-scale text processing."
    },
    {
      question: "Is my text data private when using this tool?",
      answer: "Absolutely. All find & replace operations happen entirely in your browser using client-side JavaScript. Your text never leaves your device. No server uploads, no backend processing, no data transmission. Safe for proprietary code, sensitive data, confidential documents, or regulated information. Verify in browser DevTools Network tab - zero outbound requests containing your text."
    },
    {
      question: "Can I save and reuse common find & replace patterns?",
      answer: "The tool doesn't have built-in pattern saving, but you can save patterns externally. Create a text file with your common patterns and their descriptions. For example: 'Remove HTML tags: find <[^>]+> replace (empty)'. Copy patterns from your saved file when needed. This manual approach works across browsers and devices without requiring account login or cloud storage."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text data never leaves your browser. This find & replace tool operates entirely client-side using JavaScript string methods and regex engine built into your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All text searching and replacement happens in your browser's JavaScript engine. Code, data, and text stay on your device.
- **No Server Uploads:** We don't have servers to process your text. The tool works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what you search, replace, or analyze. No content-specific analytics.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text data.

This makes the tool safe for refactoring proprietary code, transforming sensitive data, cleaning confidential documents, or processing regulated information (HIPAA, GDPR, PCI-DSS). Use with confidence for production code, customer data, or private content.

### Regex Security Considerations

Complex regex patterns with excessive backtracking can cause browser slowdown (ReDoS - Regular Expression Denial of Service). If a pattern takes longer than expected, simplify it or break the text into smaller chunks. Modern browsers limit regex execution time to prevent infinite loops.

When using regex patterns from external sources, test them on small samples first. Malicious regex patterns can freeze browsers, though they can't access your data or execute arbitrary code. This tool runs regex in a sandboxed environment with browser security protections.`
  },

  stats: {
    "Processing Speed": "<100ms",
    "Max Text Size": "10MB",
    "Regex Support": "Full ES2024",
    "Match Limit": "Unlimited",
    "Server Uploads": "0"
  }
};
