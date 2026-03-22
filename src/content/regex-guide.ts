/**
 * Regex Tester Tool Guide Content
 * Comprehensive developer guide for regular expressions
 */

import type { ToolGuideContent } from "./types";

export const regexGuideContent: ToolGuideContent = {
  toolName: "Regex Tester",
  toolPath: "/regex",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Regex Pattern",
      description: "Type your regular expression in the pattern input field. Use standard regex syntax like \\d for digits, \\w for word characters, or [a-z] for character ranges. The pattern is automatically validated and highlighted for syntax errors."
    },
    {
      title: "Configure Flags & Options",
      description: "Select regex flags: global (g) to find all matches, case-insensitive (i) for case-agnostic matching, multiline (m) for line-by-line processing, or dotall (s) to make dot match newlines. Flags fundamentally change pattern behavior."
    },
    {
      title: "Test Against Sample Text",
      description: "Paste your test string in the input area. This could be log files, API responses, user input, or code snippets. Watch matches highlight in real-time as you type or modify the pattern - instant visual feedback on what matches."
    },
    {
      title: "Review Matches & Capture Groups",
      description: "Examine highlighted matches in context, view detailed match information (position, length), and inspect capturing groups ($1, $2, etc.). Use the replace feature to test substitutions with backreferences before applying to production code."
    }
  ],

  introduction: {
    title: "Understanding Regular Expressions",
    content: `Regular expressions (regex) are powerful pattern-matching tools used across virtually every programming language and text processing tool. A regex is a sequence of characters that defines a search pattern, enabling complex text operations like validation, extraction, replacement, and parsing with concise syntax.

Regex originated in the 1950s from formal language theory and became widely available in Unix tools like grep, sed, and awk in the 1970s. Today, regex is built into JavaScript, Python, Java, Go, Ruby, PHP, and nearly every modern language, making it an essential skill for developers. Understanding regex transforms hours of string manipulation into single-line operations.

### When to Use Regular Expressions

**Data Validation:** Verify user input matches expected formats (email addresses, phone numbers, URLs, credit cards). Regex provides precise pattern definitions that simple string operations can't match. For example, validating email format requires checking for username@domain.extension structure with specific character constraints.

**Text Extraction:** Pull specific data from unstructured text like log files, API responses, or scraped web content. Extract all URLs from HTML, find all phone numbers in a document, or parse timestamps from log entries. Regex excels at finding patterns in noisy data.

**Find & Replace:** Perform sophisticated text transformations using capturing groups and backreferences. Reformat dates from MM/DD/YYYY to YYYY-MM-DD, convert camelCase to snake_case, or sanitize user input by removing dangerous characters. Single regex operations replace complex loops and conditionals.

**Code Search:** Find patterns in codebases - locate all function definitions, identify TODO comments, or find hardcoded API keys. IDEs and tools like grep use regex for advanced search capabilities beyond simple string matching.

### Regex Syntax Basics

**Character Classes:** Match specific character types. \\d matches any digit (0-9), \\w matches word characters (a-z, A-Z, 0-9, _), \\s matches whitespace (space, tab, newline). Negated versions (\\D, \\W, \\S) match opposite characters. Use [abc] to match any of a, b, or c, or [^abc] to match anything except those characters.

**Quantifiers:** Control how many times a pattern should match. * means zero or more, + means one or more, ? means zero or one (optional), {n} means exactly n times, {n,m} means between n and m times. For example, \\d{3} matches exactly three digits, while \\w+ matches one or more word characters.

**Anchors:** Define position requirements. ^ matches start of string/line, $ matches end of string/line, \\b matches word boundaries (transition between \\w and \\W). These prevent partial matches - /^\\d{3}$/ matches strings that are exactly three digits, while /\\d{3}/ matches any string containing three consecutive digits.

**Groups:** Parentheses create capturing groups that extract matched substrings. /(\\d{3})-(\\d{2})-(\\d{4})/ matches Social Security Numbers and captures area code, group number, and serial number separately as $1, $2, $3. Non-capturing groups (?:...) match without creating references.

### JavaScript Regex Flavor

This tester uses JavaScript regex engine, which follows ECMAScript specification. Key features:

**Lookaheads/Lookbehinds:** Match patterns based on what comes before/after without including it in the match. Positive lookahead (?=...) ensures pattern is followed by something, negative lookahead (?!...) ensures it's not followed. Example: \\d+(?= dollars) matches numbers followed by " dollars" but doesn't include "dollars" in the match.

**Unicode Support:** The 'u' flag enables full Unicode matching, treating emoji and non-ASCII characters correctly. Without 'u', some emoji and extended Unicode characters may be treated as two characters. Always use 'u' flag when working with internationalized text.

**Named Capture Groups:** (?<name>...) creates named captures for more readable code. Instead of referencing $1, $2, use descriptive names: (?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2}) creates $<year>, $<month>, $<day>.

### Common Regex Pitfalls

**Greedy vs Lazy Matching:** By default, quantifiers are greedy - they match as much as possible. In "test", /<.*>/ matches the entire string (from first < to last >), not individual tags. Use lazy quantifiers (*?, +?, ??) to match as little as possible: /<.*?>/ matches each tag individually.

**Catastrophic Backtracking:** Poorly constructed patterns can cause exponential time complexity, hanging your application. Patterns like /(a+)+b/ against "aaaaaaaaaaaaaaaaac" cause catastrophic backtracking as the engine tries all possible ways to divide the 'a' characters between groups. Avoid nested quantifiers on overlapping patterns.

**Character Escaping:** Special characters (. * + ? ^ $ [ ] { } ( ) | \\) must be escaped with backslash to match literally. To match a literal period, use \\., not .. Common mistake: using . to mean "any character" when you meant literal period.

**Multiline Confusion:** Without 'm' flag, ^ and $ match only start/end of entire string. With 'm' flag, they match start/end of each line. Choose based on whether you're processing single strings or multi-line text like log files.

### Regex Performance Considerations

Regex operations can be slow on large text or complex patterns. Performance tips:

**Anchor Patterns When Possible:** Anchored patterns (^pattern$ or \\bword\\b) execute faster than unanchored ones because the engine knows where to start matching. If validating format, always anchor.

**Avoid Unbounded Quantifiers:** Patterns like .*text.* can scan entire documents. Be specific about what you're matching. Instead of .*, use more targeted patterns like \\w+ or [^\\s]+.

**Compile Once, Use Many:** In JavaScript, create RegExp objects outside loops and reuse them. Creating new regex instances repeatedly wastes CPU. let pattern = /\\d+/g; for (let line of lines) { pattern.test(line); }

**Consider Alternatives:** For simple operations, string methods (includes(), startsWith(), split()) are faster than regex. Reserve regex for complex patterns that truly require its power.

### Testing & Debugging Regex

Building complex regex requires iterative refinement. Start simple and add complexity incrementally:

1. **Start with basics:** Match the simplest case first (e.g., \\d+ for any number)
2. **Add constraints:** Refine to specific requirements (\\d{3}-\\d{4} for phone numbers)
3. **Handle variations:** Add optional parts or alternation (\\d{3}-?\\d{4} allows optional dash)
4. **Test edge cases:** Empty strings, maximum lengths, special characters
5. **Validate with diverse data:** Real-world examples often reveal issues missed in synthetic tests

Use tools like this tester to visualize matches, experiment with flags, and understand why patterns behave unexpectedly. The ability to see matches highlighted in context dramatically speeds debugging.

### Regex Across Languages

While regex syntax is largely standardized, different languages have nuances:

**JavaScript:** Supports lookaheads and (recently) lookbehinds. No \\A or \\Z anchors (use ^ and $ with appropriate flags). Named groups added in ES2018.

**Python:** Supports verbose mode for commented patterns: re.compile(r"\\d{3} # area code", re.VERBOSE). Has \\A and \\Z for absolute string start/end (vs ^ and $ which may match line boundaries).

**Java:** Requires double escaping in string literals: "\\\\d+" for digit matching (first backslash escapes second backslash). Pattern and Matcher classes for regex operations.

**Go:** Regex package (regexp) uses RE2 syntax, which guarantees linear time complexity by omitting some features (no backreferences, no lookaheads). Prevents catastrophic backtracking but limits some advanced patterns.

Test patterns in your target language's environment when possible, but JavaScript regex is representative of most flavors.

### Beyond Basic Pattern Matching

**Text Normalization:** Use regex to standardize inconsistent data. Convert various phone formats ((555) 123-4567, 555-123-4567, 555.123.4567) to unified format using capturing groups: phone.replace(/(\\d{3})[.\\-()]?(\\d{3})[.\\-]?(\\d{4})/, "$1-$2-$3").

**Markdown Parsing:** Extract links [text](url), code blocks \`\`\`code\`\`\`, or headers from Markdown using patterns like /\\[([^\\]]+)\\]\\(([^)]+)\\)/ for links.

**Log Analysis:** Parse structured logs with patterns like /^\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\] (\\w+): (.+)$/ to extract timestamp, level, and message from [2024-02-01 10:30:00] INFO: Server started.

**Data Sanitization:** Remove HTML tags with /<[^>]+>/g, strip script tags with /<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, or sanitize SQL inputs by blocking dangerous patterns.

Regex is a powerful tool that rewards study. Master the basics (character classes, quantifiers, anchors) then progressively learn advanced features (lookarounds, backreferences, non-greedy matching) as needs arise.`
  },

  useCases: [
    {
      title: "Email Validation",
      description: "Validate email addresses against RFC 5322 standard or simplified patterns for user registration forms. Regex ensures emails match expected structure (username@domain.extension) and contain valid characters, preventing malformed input from reaching your backend.",
      example: `// Simple email validation (catches 99% of cases)
const emailPattern = /^[\\w.-]+@[\\w.-]+\\.\\w+$/;
const email = "user@example.com";
if (emailPattern.test(email)) {
  console.log("Valid email");
}

// RFC 5322 compliant (comprehensive but complex)
const rfcEmail = /(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])/i;`
    },
    {
      title: "URL Parsing & Extraction",
      description: "Extract URLs from text (social media posts, documents, logs) or parse URL components (protocol, domain, path, query parameters). Essential for link detection, web scraping, or analyzing traffic logs to identify external resources.",
      example: `// Extract all URLs from text
const text = "Visit https://example.com or http://test.org/path?query=value";
const urlPattern = /https?:\\/\\/[\\w.-]+(?:\\/[\\w.-]*)*\\/?(?:\\?[\\w=&.-]*)?/gi;
const urls = text.match(urlPattern);
// Result: ['https://example.com', 'http://test.org/path?query=value']

// Parse URL components
const urlParser = /^(https?):\\/\\/([\\w.-]+)(\\/[^?]*)?(\\?.*)?$/;
const match = urlParser.exec('https://api.example.com/users?page=1');
// match[1]: 'https', match[2]: 'api.example.com',
// match[3]: '/users', match[4]: '?page=1'`
    },
    {
      title: "Data Extraction from Logs",
      description: "Parse structured information from application logs, server access logs, or error traces. Extract timestamps, log levels, IP addresses, error codes, or custom data fields. Critical for log analysis, debugging, and monitoring systems.",
      example: `// Parse Apache/Nginx access log
const logLine = '192.168.1.1 - - [01/Feb/2024:10:30:00 +0000] "GET /api/users HTTP/1.1" 200 1234';
const logPattern = /^([\\d.]+) .+ \\[([^\\]]+)\\] "([A-Z]+) ([^ ]+) [^"]+" (\\d+) (\\d+)$/;
const match = logLine.match(logPattern);
const parsed = {
  ip: match[1],           // '192.168.1.1'
  timestamp: match[2],    // '01/Feb/2024:10:30:00 +0000'
  method: match[3],       // 'GET'
  path: match[4],         // '/api/users'
  status: match[5],       // '200'
  bytes: match[6]         // '1234'
};`
    },
    {
      title: "Text Sanitization & Cleaning",
      description: "Remove or replace unwanted characters, strip HTML tags, normalize whitespace, or clean user-generated content. Protect against XSS attacks by removing dangerous patterns, standardize inconsistent data formats, or prepare text for processing.",
      example: `// Strip HTML tags from user input
const dirty = '<p>Hello <script>alert("XSS")</script> world!</p>';
const clean = dirty.replace(/<[^>]+>/g, '');
// Result: 'Hello alert("XSS") world!'

// Better: remove script tags specifically
const safeHtml = dirty.replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '');

// Normalize whitespace (multiple spaces/tabs/newlines to single space)
const normalized = text.replace(/\\s+/g, ' ').trim();

// Remove non-alphanumeric except spaces (sanitize for safe display)
const sanitized = input.replace(/[^a-zA-Z0-9\\s]/g, '');`
    }
  ],

  howToUse: {
    title: "How to Use This Regex Tester",
    content: `This regex tester provides real-time pattern matching with instant visual feedback, comprehensive syntax reference, and a curated library of common patterns. All processing happens client-side using JavaScript's built-in RegExp engine - your patterns and test data never leave your browser.

### Basic Testing Workflow

Enter your regex pattern in the pattern input field, enclosed by forward slashes (/pattern/). The pattern is automatically validated and any syntax errors are highlighted immediately. Select flags (g, i, m, s, u, y) by clicking the flag buttons - multiple flags can be combined.

Paste your test string in the text area. As you type or modify the pattern, matches highlight in real-time with yellow background. Scroll down to see detailed match information including match position (index), captured groups, and full match text. This instant feedback dramatically speeds pattern development.

### Understanding Flags

**Global (g):** Find all matches in the text instead of stopping at first match. Essential for find-all operations like extracting all emails or URLs from a document. Without 'g', only the first match is returned.

**Case Insensitive (i):** Make pattern case-agnostic - /hello/i matches "Hello", "HELLO", "hElLo". Critical for user input validation where case shouldn't matter (email addresses, usernames).

**Multiline (m):** Change ^ and $ behavior to match start/end of each line instead of entire string. Use when processing multi-line text like log files or CSV data where each line is a separate record.

**Dotall (s):** Make . (dot) match newline characters. Normally dot matches any character except \\n. With 's' flag, dot truly means "any character including newlines". Useful for matching across multiple lines.

### Pattern Library

Click "Common Patterns" to browse pre-built patterns for email validation, URL extraction, phone numbers, dates, credit cards, and more. Categories include Communication (email, phone, URLs), Web (IP addresses, domains, hex colors), Formats (dates, UUIDs, SSNs), Programming (variables, functions, imports), and Validation (username, password strength, slugs).

Click any pattern to load it into the tester with example text. Modify the pattern to fit your specific needs. The library serves as both a quick solution for common tasks and a learning resource for understanding regex techniques.

### Replace/Substitution Feature

Enable the Replace feature to test pattern-based text transformations. Enter replacement text using backreferences ($1, $2, etc.) to refer to captured groups. $& refers to the entire match, $\` to text before match, $' to text after match.

Example: Pattern /(\\d{3})-(\\d{3})-(\\d{4})/ with replacement ($1) $2-$3 transforms 555-123-4567 to (555) 123-4567. Test substitutions before applying to production code to verify they work correctly.

### Syntax Reference & Cheatsheet

The right panel contains a comprehensive regex syntax reference. Search for specific syntax elements using the search box. Expandable sections cover Character Classes (\\d, \\w, \\s), Anchors (^, $, \\b), Quantifiers (*, +, ?, {n}), Groups (capturing, non-capturing, lookarounds), Flags, and Special Characters.

Each syntax element includes description and usage examples. Refer to this cheatsheet when building complex patterns or learning new regex features. The examples show real-world usage patterns, not just abstract syntax.

### Debugging Complex Patterns

When building complex patterns, start simple and add complexity incrementally. Test at each step:

1. Start with basic match (e.g., \\d+ for any numbers)
2. Add structure (\\d{3}-\\d{4} for phone format)
3. Add optional parts (\\d{3}-?\\d{4} for optional dash)
4. Add validation (^\\d{3}-?\\d{4}$ to match entire string)
5. Test edge cases (empty, max length, special chars)

Use the highlighted matches to see exactly what your pattern captures. If it's not highlighting what you expect, the pattern needs refinement. The real-time feedback makes debugging intuitive.`,
    steps: [
      {
        name: "Enter Regex Pattern",
        text: "Type your regular expression in the pattern field (/pattern/). Use standard syntax like \\d for digits, \\w for word characters, [a-z] for ranges. Pattern is validated in real-time."
      },
      {
        name: "Select Flags",
        text: "Click flag buttons to enable: g (global - find all), i (case-insensitive), m (multiline), s (dotall), u (unicode), y (sticky). Combine multiple flags as needed."
      },
      {
        name: "Add Test String",
        text: "Paste your test text in the input area. Could be log entries, user input, API responses, or code. Matches highlight automatically as you type or change pattern."
      },
      {
        name: "Review Matches",
        text: "Check highlighted matches in context, examine match details (index, groups), and test replacements. Use pattern library for common patterns or syntax reference for learning."
      }
    ]
  },

  faqs: [
    {
      question: "What regex flavor does this tester use?",
      answer: "This tester uses JavaScript regex engine (ECMAScript specification) as implemented in your browser. JavaScript regex supports most common features: character classes (\\d, \\w, \\s), quantifiers (*, +, ?, {n,m}), anchors (^, $, \\b), capturing groups with backreferences, lookaheads, and (modern browsers) lookbehinds. Features NOT supported: possessive quantifiers, atomic groups, conditionals, or some advanced PCRE features. For JavaScript, Python, Ruby, or general web development, this engine is representative. For Java, .NET, or PCRE-specific features, results may differ slightly."
    },
    {
      question: "How do I match special characters like . or * literally?",
      answer: "Special regex metacharacters (. * + ? ^ $ [ ] { } ( ) | \\) must be escaped with backslash to match literally. Examples: \\. matches literal period, \\* matches asterisk, \\? matches question mark, \\^ matches caret. To match literal backslash, use \\\\. Common mistake: using . thinking it will match period when it actually means 'any character'. For complex literal strings containing many special chars, consider using string methods (includes(), indexOf()) instead of regex."
    },
    {
      question: "Why isn't my pattern matching what I expect?",
      answer: "Common issues: (1) Forgetting to escape special characters - '.' matches any char, not literal period, (2) Greedy vs lazy matching - .* is greedy and matches as much as possible, use .*? for lazy matching, (3) Missing anchors - /\\d{3}/ matches any string containing three digits; use /^\\d{3}$/ to match only exactly three digits, (4) Case sensitivity - /hello/ won't match 'Hello' unless you use 'i' flag, (5) Multiline confusion - ^ and $ match string start/end without 'm' flag, line boundaries with 'm' flag. Use this tester's real-time highlighting to see exactly what matches."
    },
    {
      question: "What's the difference between * and + quantifiers?",
      answer: "* (asterisk) matches zero or more occurrences - pattern can match even if the character doesn't appear. Example: /a*/ matches '', 'a', 'aa', 'aaa'. + (plus) matches one or more occurrences - at least one character must be present. Example: /a+/ matches 'a', 'aa', 'aaa' but not ''. Use + when the pattern element is required (\\d+ for at least one digit), use * when it's optional (\\s* for optional whitespace). Common pattern: \\w+ matches words (one or more word chars), \\s* matches optional spaces (zero or more)."
    },
    {
      question: "How do capturing groups work?",
      answer: "Parentheses ( ) create capturing groups that extract matched substrings. Example: /(\\d{3})-(\\d{3})-(\\d{4})/ matching '555-123-4567' captures three groups: $1='555', $2='123', $3='4567'. Use in replacements: replace with '($1) $2-$3' to get '(555) 123-4567'. Non-capturing groups (?:...) match without creating references, saving memory for grouping without capture. Named groups (?<name>...) provide descriptive names: (?<area>\\d{3}) creates $<area>. Groups enable complex transformations and data extraction."
    },
    {
      question: "What are lookaheads and lookbehinds?",
      answer: "Lookarounds match positions rather than characters - they assert what comes before/after without including it in the match. Positive lookahead (?=...) ensures pattern is followed by something: \\d+(?= dollars) matches numbers followed by ' dollars' but doesn't include 'dollars' in match. Negative lookahead (?!...) ensures NOT followed: \\d+(?! dollars). Lookbehinds work the same but check what comes before: (?<=\\$)\\d+ matches numbers preceded by $ symbol. Use lookarounds to match based on context without consuming characters."
    },
    {
      question: "How do I make my regex more efficient?",
      answer: "Performance tips: (1) Anchor patterns when validating format (^pattern$) - tells engine where to start, (2) Be specific about what you're matching - instead of .* use \\w+ or [^\\s]+, (3) Avoid nested quantifiers (a+)+ which cause catastrophic backtracking, (4) Use non-capturing groups (?:...) when you don't need backreferences, (5) Compile regex once and reuse (let pattern = /regex/; use multiple times), (6) For simple operations, string methods (includes(), startsWith()) are faster. Test performance on large text samples if processing big data."
    },
    {
      question: "Can I validate passwords with regex?",
      answer: "Yes, but with limitations. Regex can check password structure (length, character types) but can't check against breach databases or dictionary words. Example: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/ ensures minimum 8 chars with uppercase, lowercase, number, and symbol using lookaheads. However, this accepts 'Password1!' which is weak despite meeting requirements. For production, use dedicated password strength libraries (zxcvbn) that check against common patterns and breaches. Regex is good for basic structure validation, not true strength assessment."
    },
    {
      question: "What's the difference between greedy and lazy matching?",
      answer: "Greedy quantifiers (*, +, ?, {n,m}) match as much as possible while still allowing the overall pattern to match. In 'test', /<.*>/ greedily matches the entire string (from first < to last >). Lazy quantifiers (*?, +?, ??, {n,m}?) match as little as possible. /<.*?>/ lazily matches each tag individually. Default is greedy. Use lazy when you want shortest possible matches (parsing HTML tags, extracting quoted strings). Example: /\".*?\"/ extracts each quoted string separately, /\".*\"/ greedily takes from first quote to last."
    },
    {
      question: "Does my regex pattern work the same in all programming languages?",
      answer: "Basic syntax is standardized (\\d, \\w, *, +, etc.) but advanced features differ. JavaScript lacks some PCRE features (possessive quantifiers, conditionals) but has good lookaround support. Python has verbose mode for commented patterns and \\A/\\Z anchors. Java requires double-escaping in strings (\"\\\\d+\"). Go's RE2 engine guarantees linear time by omitting backreferences and lookarounds. Test critical patterns in your target language's environment. For basic patterns (email validation, number extraction), behavior is consistent across languages. For advanced features (complex lookarounds, conditionals), check language-specific docs."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All regex testing happens entirely client-side using your browser's built-in JavaScript RegExp engine. Your patterns and test strings are processed locally in your browser's JavaScript environment - there are no server uploads, no backend processing, and no data transmission to external services.

### Privacy Guarantees

- **100% Client-Side Testing:** All regex matching happens in your browser's JavaScript engine. Pattern evaluation, match highlighting, and replacement operations execute locally with zero server communication.
- **No Data Storage:** Your regex patterns and test strings are not saved, logged, or persisted anywhere. They exist only in browser memory during your session.
- **No Analytics Tracking:** We don't track what patterns you test, what text you match, or any usage analytics of pattern content.
- **Safe for Sensitive Data:** Test patterns against production logs, API responses, user data, or proprietary text without privacy concerns. Your data never leaves your device.
- **Offline Capable:** Works completely offline after first load. Add to home screen as PWA for instant access without internet connectivity.

### Regular Expression Security

While this tool itself is private and secure, be aware of regex security implications in your applications:

**ReDoS (Regular Expression Denial of Service):** Poorly constructed patterns can cause catastrophic backtracking, hanging your application or server. Patterns like /(a+)+b/ against input without 'b' cause exponential time complexity. Avoid nested quantifiers on overlapping patterns. Test patterns with large inputs and adversarial strings before production use.

**Input Validation:** When using regex to validate user input, always consider bypass attempts. Regex validation is not sufficient for security-critical operations - combine with additional checks, length limits, and sanitization. Never rely solely on regex to prevent SQL injection, XSS, or other injection attacks.

**Sensitive Data Exposure:** Be cautious when using regex to extract or redact sensitive data. Test thoroughly to ensure patterns capture exactly what you intend - overly broad patterns may leak data, overly narrow patterns may miss sensitive content. For PII redaction, prefer allowlists (keep known-safe patterns) over denylists (remove known-sensitive patterns).

This tester is safe for testing patterns against any data since everything is local and private. Use it to validate patterns before deploying to production systems.`
  },

  stats: {
    "Pattern Types": "100+",
    "Test Speed": "<5ms",
    "Capture Groups": "Unlimited",
    "Flags": "6 types",
    "Server Uploads": "0"
  }
};
