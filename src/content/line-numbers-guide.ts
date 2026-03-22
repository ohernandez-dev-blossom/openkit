/**
 * Line Numbers Tool Guide Content
 * Comprehensive developer guide for adding and removing line numbers
 */

import type { ToolGuideContent } from "./types";

export const lineNumbersGuideContent: ToolGuideContent = {
  toolName: "Line Numbers",
  toolPath: "/line-numbers",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Your Text",
      description: "Copy any text, code, logs, or documentation into the input field. Works with any plain text format - source code, configuration files, log outputs, or written content."
    },
    {
      title: "Choose Operation Mode",
      description: "Select 'Add Line Numbers' to prefix each line with its number, or 'Remove Line Numbers' to strip existing numbering. Toggle between modes instantly."
    },
    {
      title: "Configure Format",
      description: "Customize number format: choose separator (period, colon, space, tab), enable zero-padding, set starting line number. Preview updates in real-time."
    },
    {
      title: "Copy Numbered Text",
      description: "Click copy button to grab formatted output. Use numbered text for code reviews, documentation, debugging references, or teaching materials."
    }
  ],

  introduction: {
    title: "What is Line Numbering?",
    content: `Line numbering adds sequential numeric labels to each line of text, creating clear references for discussions, documentation, and debugging. Every line gets a unique identifier like "1.", "2.", "3." enabling precise communication about specific code locations, log entries, or document sections without ambiguity.

Developers use line numbers constantly. Code editors show line numbers for navigation and error reporting. Stack traces reference line numbers where exceptions occurred. Code reviews discuss "see line 42" instead of "that function near the top." Log analysis requires line numbers to correlate events across massive files. Documentation references specific lines when explaining examples.

### Why Line Numbering Matters for Developers

**Code Review Communication:** Pull request comments reference exact line numbers. "Line 127 has potential null pointer" is precise. "That function somewhere in the file" is vague. Line numbers eliminate confusion when discussing code changes across teams. Reviewers cite specific lines, authors understand exactly what needs attention.

**Error Debugging with Stack Traces:** When code throws exceptions, stack traces show file names and line numbers where errors occurred. Matching error line numbers to source code requires numbered listings. Compare stack trace "file.js:142" against line-numbered source to locate exact problem statement. Essential for debugging production errors from minified stack traces.

**Log File Analysis:** Server logs, application traces, and system outputs span thousands of lines. "Error at line 8472" enables jumping directly to problem entries using text editors. Numbered logs help correlate events across multiple log files by timestamp and line position. Debug distributed systems by comparing line numbers across service logs.

**Documentation and Teaching:** Tutorial code examples use line numbers for explanations. "Line 5 initializes the connection" references specific code. Students follow along numbered examples step-by-step. Technical documentation explains algorithms line-by-line using numbered references. Conference slides show code snippets with line numbers for audience reference.

**Configuration File Editing:** YAML, JSON, XML validation errors report line numbers. "Syntax error at line 67" directs attention to exact problem location in large config files. Version control diffs show line numbers for changed configuration. DevOps engineers reference specific line numbers when documenting infrastructure-as-code modifications.

### Line Number Format Standards

**Simple Numbering (1, 2, 3):** Minimal format with just numbers. Clean for basic references. Used in basic text editors and simple documentation. No separator reduces visual noise when numbers aren't primary focus.

**Period Separator (1. 2. 3.):** Most common format in documentation and educational materials. Period clearly separates number from content. Reads naturally like ordered lists. Used in printed code examples, books, and formal documentation.

**Colon Separator (1: 2: 3:):** Programming convention matching error message formats. Stack traces and compiler errors use "file.js:142" notation. Familiar to developers from debugging tools. Easy to parse programmatically for automated analysis.

**Zero-Padded (001, 002, 010):** Maintains alignment in large files with 100+ lines. Prevents visual jumping when line numbers change digit count (9 → 10). Used in professional code listings and printed documentation. Fixed-width numbers keep text aligned vertically.

This tool handles all numbering formats with customizable separators, padding, and starting numbers. Bidirectional conversion adds numbers to plain text or removes numbers from already-numbered content. All processing client-side - your code and text stay private on your device.

### Common Use Cases in Development Workflows

**Snippet Sharing:** When pasting code into Slack, email, or documentation, add line numbers for discussion reference. Recipients cite specific lines when asking questions or suggesting changes. Remove numbers before copying code into editors to avoid syntax errors from number prefixes.

**Meeting Notes with Code:** Capture code snippets in meeting notes with line numbers. "Line 3 shows the API endpoint we discussed" provides clear context. Export notes to Markdown or plain text while preserving line references for future review.

**Diff Analysis:** Before and after code comparisons benefit from line numbers. Compare original (lines 1-50) against modified version (lines 1-55) to track insertions and deletions. Useful when Git diffs are unavailable or comparing code from screenshots or documents.

**Email Code Reviews:** When formal PR tools aren't available, email code reviews use line-numbered attachments. Reviewers reply with comments like "Line 23: consider caching this result." Author understands exact feedback location without complex explanation.`
  },

  useCases: [
    {
      title: "Reference Specific Lines in Code Reviews",
      description: "Add line numbers to code snippets for precise feedback in pull requests, email reviews, or team discussions. Reviewers cite exact line numbers when suggesting improvements or identifying bugs.",
      example: `// Original code (no numbers):
function processData(data) {
  const result = data.map(item => item.value);
  return result.filter(val => val > 0);
}

// Add line numbers for review discussion:
1. function processData(data) {
2.   const result = data.map(item => item.value);
3.   return result.filter(val => val > 0);
4. }

// Review comment:
"Line 2: Consider using optional chaining for item?.value
 Line 3: Could combine map+filter into single reduce for performance"`
    },
    {
      title: "Match Stack Traces to Source Code",
      description: "When debugging production errors, stack traces show line numbers where exceptions occurred. Add line numbers to source code listings to quickly locate exact error positions matching stack trace output.",
      example: `// Stack trace error:
Error: Cannot read property 'id' of undefined
    at getUserData (api.js:142)
    at processRequest (server.js:89)

// Add line numbers to api.js source:
140. function getUserData(user) {
141.   // Fetch user details
142.   const userId = user.profile.id;
143.   return fetchFromDB(userId);
144. }

// Line 142 matches stack trace - found the bug!
// user.profile is undefined, need null check`
    },
    {
      title: "Create Documentation Code Examples",
      description: "Technical documentation explains code line-by-line. Number code examples so explanatory text can reference specific lines. Readers follow numbered steps matching numbered code listings.",
      example: `// Documentation example with numbered code:

1. import { createServer } from 'http';
2. import { parse } from 'url';
3.
4. const server = createServer((req, res) => {
5.   const parsedUrl = parse(req.url, true);
6.   res.writeHead(200, { 'Content-Type': 'text/plain' });
7.   res.end('Hello World\\n');
8. });
9.
10. server.listen(3000);

// Explanation text:
"Line 1: Import Node.js HTTP server module
 Lines 4-8: Define request handler function
 Line 5: Parse incoming URL with query parameters
 Line 10: Start server listening on port 3000"`
    },
    {
      title: "Analyze Large Log Files",
      description: "Add line numbers to server logs, application traces, or debug output. Jump to specific events by line number when investigating errors. Reference log line numbers when reporting issues to DevOps teams.",
      example: `// Original log file (no numbers):
2026-02-02 10:15:23 INFO Server started
2026-02-02 10:15:45 DEBUG User login: john@example.com
2026-02-02 10:16:12 ERROR Database connection failed
2026-02-02 10:16:13 WARN Retrying connection...
2026-02-02 10:16:18 INFO Connection restored

// Add line numbers for analysis:
1. 2026-02-02 10:15:23 INFO Server started
2. 2026-02-02 10:15:45 DEBUG User login: john@example.com
3. 2026-02-02 10:16:12 ERROR Database connection failed
4. 2026-02-02 10:16:13 WARN Retrying connection...
5. 2026-02-02 10:16:18 INFO Connection restored

// Report: "Error at line 3, recovered at line 5"
// Easy to locate events in 10,000+ line log files`
    }
  ],

  howToUse: {
    title: "How to Use the Line Numbers Tool",
    content: `This tool provides instant line numbering with customizable formats and bidirectional conversion. Add numbers to plain text or remove existing numbers from formatted content.

### Adding Line Numbers to Text

Paste or type text into the input field when 'Add Line Numbers' mode is selected. Each line receives a sequential number prefix starting from 1 (or custom starting number). Configure separator style: period (1.), colon (1:), space (1 ), or tab (1→). Enable zero-padding for alignment (001, 002, 010).

The tool preserves original formatting including blank lines (which receive line numbers). All whitespace, indentation, and special characters remain untouched. Only line number prefixes are added at the start of each line.

### Removing Line Numbers from Text

Switch to 'Remove Line Numbers' mode and paste numbered text. The tool intelligently detects and strips number prefixes at line starts. Handles various formats: "1.", "1:", "1 ", "001.", etc. Original text content is recovered exactly as it was before numbering.

Removal works with any consistent numbering pattern. Mixed formats or inconsistent numbering may require manual cleanup. The tool preserves all text content and formatting after removing number prefixes.

### Customizing Number Format

**Separator:** Choose period, colon, space, or tab between number and text. Period and colon are most common. Space creates minimal separation. Tab aligns content in columns for code listings.

**Zero-Padding:** Enable padding to maintain digit count alignment. Files with 100+ lines use 001-999 format. Keeps numbers same width preventing visual column shifting. Disable for simple 1-999 format when alignment doesn't matter.

**Starting Number:** Begin numbering from any number instead of 1. Useful when extracting code snippets from middle of larger files. Set "Start at: 50" to number lines 50, 51, 52... matching original file line positions.

### Practical Workflows

Copy numbered output for sharing in Slack, documentation, or emails. Recipients reference specific line numbers in discussions. Before pasting code into editors or running it, remove line numbers to avoid syntax errors from number prefixes.

Export to plain text files preserving line numbers for archival or printing. Import numbered code from PDFs or screenshots, then remove numbers to get executable source code.`,
    steps: [
      {
        name: "Paste Text Content",
        text: "Copy any text into the input field. Supports code, logs, documentation, or any plain text. Handles unlimited length and preserves all formatting."
      },
      {
        name: "Select Operation",
        text: "Choose 'Add Line Numbers' to prefix lines with numbers, or 'Remove Line Numbers' to strip existing numbering. Toggle between modes instantly."
      },
      {
        name: "Configure Format",
        text: "Pick separator style (period, colon, space, tab), enable zero-padding for alignment, set custom starting line number. Changes apply immediately."
      },
      {
        name: "Copy Results",
        text: "Click copy button to grab formatted output. Use in documentation, code reviews, debugging analysis, or remove numbers before pasting code into editors."
      }
    ]
  },

  faqs: [
    {
      question: "How do I add line numbers to code for documentation?",
      answer: "Paste your code into the input field with 'Add Line Numbers' mode selected. Choose period separator (1. 2. 3.) for documentation style numbering. Enable zero-padding if code exceeds 99 lines for alignment. Copy the numbered output and paste into your documentation. Reference specific lines in explanatory text like 'Line 5 initializes the database connection.' Before running the code, switch to 'Remove Line Numbers' mode to strip prefixes."
    },
    {
      question: "Can this tool handle very large files with thousands of lines?",
      answer: "Yes, the tool processes unlimited text length entirely in your browser. Large log files with 10,000+ lines work fine. Performance depends on your device memory and browser capabilities. For extremely large files (100MB+), consider splitting into smaller chunks for faster processing. Enable zero-padding for consistent alignment across all lines (0001, 0002, etc.). All processing is client-side - your files never upload to servers."
    },
    {
      question: "Why do my line numbers not align vertically?",
      answer: "Numbers shift alignment when digit count changes (9 → 10, 99 → 100). Enable zero-padding to maintain fixed width: 001, 002, 010, 100. This keeps all numbers the same character count, aligning vertically. Without padding, single-digit numbers (1-9) are shorter than double-digit (10-99), causing content to shift right. Use tab separator instead of space for automatic alignment regardless of number width."
    },
    {
      question: "How do I remove line numbers from code copied from a PDF?",
      answer: "Switch to 'Remove Line Numbers' mode and paste the numbered text. The tool detects common formats (1., 1:, 001., etc.) and strips them automatically. Works with most standard numbering formats. If removal fails, check for non-standard separators or inconsistent spacing. Manual cleanup may be needed for unusual formats. After removal, copy clean code and paste into your editor - it should run without syntax errors from number prefixes."
    },
    {
      question: "Can I start numbering from a specific line number instead of 1?",
      answer: "Yes, use the 'Starting Number' option to begin at any line. Set '42' to number lines 42, 43, 44... Useful when extracting code snippets from larger files while preserving original line positions. When discussing 'line 142 in api.js,' extract that section and number it starting at 140 so line numbers match the full file. Helps correlate snippets with original source or stack trace line numbers."
    },
    {
      question: "What's the difference between period, colon, and space separators?",
      answer: "Period (1. 2. 3.) is standard for documentation and educational materials - clean, readable format used in books and tutorials. Colon (1: 2: 3:) matches programming error formats - stack traces and compiler errors use 'file.js:142' notation familiar to developers. Space (1 2 3) is minimal separation for when numbers are secondary. Tab (1→text) aligns content in columns like professional code listings. Choose based on your use case and audience expectations."
    },
    {
      question: "Does removing line numbers preserve all original formatting?",
      answer: "Yes, removal only strips number prefixes at line starts. All indentation, whitespace, special characters, and content remain exactly as they were before numbering. The tool identifies number patterns (digits + separator) at line beginnings and removes only those characters. Everything after the separator is preserved intact. Blank lines, code indentation, and spacing all stay unchanged."
    },
    {
      question: "Can I use this for adding line numbers to JSON or XML?",
      answer: "Yes, works with any text format including JSON, XML, YAML, CSV, or plain text. Add numbers to configuration files for troubleshooting validation errors. When JSON parser reports 'error at line 67,' numbered JSON shows exactly where syntax is broken. Remove numbers before saving files - numbers would break JSON/XML syntax. Use for viewing and discussion only, not for execution or parsing."
    },
    {
      question: "How do I match line numbers between my editor and this tool?",
      answer: "Most code editors start line numbering at 1, matching this tool's default. If your editor shows different numbers, use 'Starting Number' to align them. Some editors number from 0 - set starting number to 0 to match. When copying code from specific editor lines (50-60), set start to 50 so tool numbering matches editor display. Helps correlate error messages showing editor line numbers with numbered code snippets."
    },
    {
      question: "Is my code secure when using this tool?",
      answer: "Absolutely. All line numbering happens entirely in your browser using JavaScript string operations. Your code never leaves your device or uploads to servers. No network requests are made with your content. Verify by checking browser DevTools Network tab - zero uploads. Safe for proprietary code, confidential configurations, security-sensitive logs, or any private text. Works completely offline after initial page load. We never see or store your content."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text and code never leave your browser. This line numbering tool operates entirely client-side using JavaScript array and string manipulation. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All line numbering happens in your browser using split(), join(), and string concatenation. Content stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after page load.
- **No Code Storage:** Your input text, source code, and logs are not saved, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Content Analytics:** We don't track what you number, code content, line counts, or any text-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for numbering proprietary source code, confidential configuration files, security-sensitive logs, private documentation, or any sensitive text. Use with confidence for code reviews, debugging, technical documentation requiring precise line references.`
  },

  stats: {
    "Processing": "Client-side",
    "Formats": "4",
    "Speed": "<1ms/line",
    "File Size": "Unlimited",
    "Data Upload": "0 bytes"
  }
};
