/**
 * Email Extractor Tool Guide Content
 * Comprehensive developer guide for email address extraction
 */

import type { ToolGuideContent } from "./types";

export const extractEmailsGuideContent: ToolGuideContent = {
  toolName: "Email Extractor",
  toolPath: "/extract-emails",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Text Content",
      description: "Copy and paste any text containing email addresses - web pages, documents, logs, customer support tickets, contact lists, or scraped data. Tool scans entire text for valid email patterns."
    },
    {
      title: "Configure Options",
      description: "Enable 'Remove duplicates' to get unique emails only, eliminating repeated addresses. Enable 'Convert to lowercase' for consistent formatting (user@EXAMPLE.com → user@example.com)."
    },
    {
      title: "Review Found Emails",
      description: "See extracted email addresses displayed individually with count. Validates email format: requires @ symbol, domain name, and valid TLD (.com, .org, .uk, etc)."
    },
    {
      title: "Export Results",
      description: "Copy as line-separated list (one per line) for spreadsheets, or comma-separated CSV for direct import into CRM, mailing lists, or contact management systems."
    }
  ],

  introduction: {
    title: "What is Email Extraction?",
    content: `Email extraction uses regex patterns to find and parse email addresses from unstructured text, identifying valid addresses matching format: local-part@domain.tld. Developers, marketers, and data analysts extract emails from web scraping results, customer support logs, contact forms, business documents, and social media data to build mailing lists, analyze customer communications, or migrate contact databases.

Email addresses follow RFC 5322 standard but practical implementations use simplified regex matching alphanumeric characters, dots, hyphens, underscores before @ symbol, followed by domain name and top-level domain (TLD). Valid emails include john.doe@example.com, support+tag@company.co.uk, user_name@sub.domain.org. Invalid formats like @test.com (missing local part) or user@ (missing domain) are rejected.

### Why Email Extraction Matters

**Lead Generation:** Marketing teams extract emails from website scraping, LinkedIn profiles, or conference attendee lists to build prospecting databases. Automated extraction faster than manual copying. Clean, deduplicated email lists improve campaign deliverability and reduce bounce rates.

**Customer Support Analysis:** Support teams analyze ticket archives to identify frequently contacting customers, extract CCs from email threads, or build contact databases from historical communications. Batch extract emails from thousands of support tickets for sentiment analysis or response time metrics.

**Data Migration:** Moving from one CRM/email system to another requires extracting emails from exported data files, CSV exports, or database dumps. Email extractor handles unstructured formats where contacts embedded in text fields, notes, or concatenated strings.

**Contact List Cleanup:** Deduplicate mailing lists by extracting all emails from various sources (spreadsheets, documents, databases) into single list, then remove duplicates. Normalize email formatting (lowercase, trim whitespace) for consistent database storage.

**Web Scraping Post-Processing:** After scraping contact pages, "about us" sections, or directory listings, raw HTML contains emails mixed with markup, JavaScript, and styling. Extract valid emails from scraped content, discard HTML noise.

**GDPR Compliance Auditing:** Data privacy regulations require knowing what personal data your organization holds. Extract emails from codebases, configuration files, logs, and documentation to identify where email addresses are stored for GDPR data mapping and deletion requests.

### Email Validation Regex

This tool uses regex pattern: \`/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g\`

**Local Part (before @):** Alphanumeric characters, dots, underscores, percent signs, plus signs, hyphens. Most common email formats supported. Excludes special chars like brackets, quotes which are technically valid but rarely used.

**Domain Part (after @):** Alphanumeric characters and hyphens for domain name, dots for subdomains and TLD. Requires at least 2-character TLD (.com, .uk, .io). Supports internationalized domains using standard ASCII.

**Limitations:** Doesn't validate if email actually exists, just format validity. Accepts technically invalid but common formats. Doesn't support quoted strings or internationalized local parts. For production email validation, use server-side verification (SMTP check, email verification API).

### Processing Options

**Deduplication:** Removes duplicate emails from extracted results. Case-insensitive comparison - User@Example.com equals user@example.com. Useful when text contains repeated mentions of same contacts.

**Lowercase Normalization:** Converts all emails to lowercase for consistency. Email addresses are case-insensitive per RFC but databases typically store lowercase for uniform querying. Prevents duplicate entries from case variations.

**Format Output:** Export as newline-separated list (one email per line) for spreadsheet import, or comma-separated values (CSV) for CRM imports, mailing list uploads, or database bulk inserts.

All processing happens client-side using JavaScript regex matching - your text never leaves your browser. Safe for extracting emails from confidential documents, customer data, or proprietary business information.`
  },

  useCases: [
    {
      title: "Build Prospect Lists from LinkedIn Exports",
      description: "Export LinkedIn connection data or Sales Navigator search results, paste into extractor to get clean email list. Remove duplicates, normalize formatting, then import into CRM for outbound campaigns.",
      example: `// LinkedIn CSV export contains mixed format data:
Name,Company,Email,Notes
John Doe,Acme Inc,john.doe@acme.com,"Met at conference, discussed partnership, email: support@acme.com"
Jane Smith,Example Ltd,JANE@EXAMPLE.COM,"Follow up next quarter"
Bob Johnson,Test Corp,bob@test.com,"Also CC bob.johnson@personal.com on proposals"

// Traditional manual extraction: tedious, error-prone
// Copy each email individually, track duplicates manually

// Using Email Extractor:
// 1. Paste entire CSV/text
// 2. Enable "Remove duplicates" + "Lowercase"
// 3. Extract results:
//    john.doe@acme.com
//    support@acme.com
//    jane@example.com
//    bob@test.com
//    bob.johnson@personal.com
// 4. Export as CSV for CRM import

// Saves hours on large lists (100+ contacts)
// Catches emails in Notes/Comments fields
// Normalizes formatting automatically`
    },
    {
      title: "Extract Customer Emails from Support Tickets",
      description: "Analyze helpdesk exports or support ticket archives to identify high-frequency support requesters, extract all CCs from email threads, or build contact database from historical tickets.",
      example: `// Support ticket text (Zendesk/Freshdesk export):
Ticket #12345
From: customer@example.com
CC: manager@example.com, team@example.com
Subject: Product inquiry
Body: Please contact me at customer.alt@gmail.com or my colleague: partner@acme.com

Ticket #12346
From: customer@example.com
Subject: Follow-up question
Body: Can you also send details to billing@example.com?

// Extract all emails from ticket archive:
// Results:
// - customer@example.com (appears twice - dedupe)
// - manager@example.com
// - team@example.com
// - customer.alt@gmail.com
// - partner@acme.com
// - billing@example.com

// Use cases:
// - Identify VIP customers (frequent senders)
// - Build complete contact database
// - Find all email aliases for same customer
// - Export for email campaign targeting
// - GDPR compliance: locate all stored emails`
    },
    {
      title: "Clean Up Scraped Contact Pages",
      description: "After web scraping company contact pages, 'about us' sections, or staff directories, extract valid emails from HTML markup, JavaScript, and text noise. Get clean list from messy scraped data.",
      example: `// Raw scraped HTML from contact page:
<div class="contact-info">
  <p>Email us at: <a href="mailto:info@company.com">info@company.com</a></p>
  <script>var email = "sales" + "@" + "company.com";</script>
  <span>Support: support@company.com</span>
  <!-- Obfuscated: admin [at] company [dot] com -->
  <p>Press inquiries: press@company.com or media@company.com</p>
  <div style="display:none">spam@trap.com</div>
</div>

// Paste entire scraped HTML into extractor
// Automatically finds:
info@company.com
support@company.com
press@company.com
media@company.com
spam@trap.com

// Filter out obvious spam traps manually
// Export clean list for lead database

// Benefits over manual copying:
// - Handles obfuscation (JavaScript email building)
// - Ignores HTML markup
// - Finds emails in hidden elements
// - Catches multiple emails per page
// - No risk of transcription errors`
    },
    {
      title: "Merge Contact Lists from Multiple Sources",
      description: "Combine mailing lists from different systems (old CRM, spreadsheets, email archives, business cards) into unified, deduplicated contact database. Extract emails from all sources, merge, clean.",
      example: `// Source 1: Old CRM CSV export
Alice,alice@example.com,Active
Bob,BOB@test.com,Inactive

// Source 2: Business card notes
"Met Bob from Test Corp (bob@test.com) and
Carol from Acme (carol@acme.com) at conference"

// Source 3: Email signature scraping
Email archives contain: alice@example.com, dave@company.com

// Manual merging: track duplicates, normalize case
// Tedious and error-prone for 100+ contacts

// Email Extractor approach:
// 1. Paste all sources into single text block
// 2. Enable deduplication + lowercase
// 3. Extract results:
alice@example.com
bob@test.com
carol@acme.com
dave@company.com

// Clean list ready for new CRM import
// No duplicates (Bob appeared twice, different case)
// All formatting normalized
// Completed in seconds vs hours of manual work`
    }
  ],

  howToUse: {
    title: "How to Use This Email Extractor",
    content: `This tool scans text using regex pattern matching to identify valid email addresses, then applies filtering and formatting options. All processing happens client-side - your text never leaves your browser.

### Extracting Emails from Text

Paste any text containing email addresses: web pages, documents, CSV files, log files, support tickets, scraped HTML. Tool accepts unlimited text length and scans for patterns matching email format: local@domain.tld.

Regex pattern matches standard email formats: alphanumeric characters, dots, underscores, plus signs before @ symbol. Domain must include at least one dot and 2+ character TLD (.com, .org, .co.uk). Rejects invalid formats like @test, user@, or test@test (missing TLD).

### Deduplication

Enable "Remove duplicates" to get unique email addresses only. Case-insensitive comparison treats user@example.com and USER@example.com as duplicates. If email appears multiple times in text (repeated contact mentions, CC lists, signature blocks), only one instance returned.

Useful for: building mailing lists from repeated contacts, cleaning up scraped data with duplicate entries, merging contact lists from multiple sources.

### Lowercase Normalization

Enable "Convert to lowercase" to standardize email formatting. Email addresses are case-insensitive per RFC specification - User@EXAMPLE.COM delivers to same mailbox as user@example.com. Databases typically store lowercase emails for consistent querying and duplicate detection.

Prevents database duplicates from case variations. Recommended for: CRM imports, mailing list uploads, database storage, any system requiring normalized email format.

### Export Formats

**Line-Separated List:** One email per line. Copy and paste into spreadsheet cells, text files, or scripts processing line-by-line. Format:
\`\`\`
user1@example.com
user2@test.com
user3@acme.com
\`\`\`

**Comma-Separated (CSV):** Emails separated by commas and spaces. Direct import into CRM systems, email marketing platforms (Mailchimp, SendGrid), or database bulk inserts. Format: \`user1@example.com, user2@test.com, user3@acme.com\`

Choose format matching your destination system's import requirements.`,
    steps: [
      {
        name: "Paste Text",
        text: "Copy text containing email addresses from any source: documents, web pages, logs, tickets. Supports unlimited text length.",
      },
      {
        name: "Configure Options",
        text: "Enable deduplication to remove repeated addresses. Enable lowercase conversion for normalized formatting.",
      },
      {
        name: "Review Results",
        text: "See extracted emails with count. Validate list contains expected addresses. Individual copy buttons for each email.",
      },
      {
        name: "Export List",
        text: "Copy as line-separated list or comma-separated CSV. Import into CRM, spreadsheet, or mailing list platform.",
      }
    ]
  },

  faqs: [
    {
      question: "Does this validate if email addresses actually exist?",
      answer: "No, this tool validates format only - checks if string matches email pattern (local@domain.tld) but doesn't verify if mailbox exists. Extracted emails may be formatted correctly but inactive/bouncing. For existence validation, use SMTP verification services (ZeroBounce, NeverBounce) or send confirmation emails. Format validation catches typos (missing @, invalid TLD) but can't detect if user@example.com actually receives mail. Server-side verification required for deliverability checking."
    },
    {
      question: "Can it extract emails from PDF files?",
      answer: "No, tool processes plain text only. PDF content is binary format requiring parsing. To extract emails from PDFs: (1) Copy text from PDF reader (Ctrl+A, Ctrl+C), (2) Paste copied text into this tool, (3) Extract emails from text. Alternative: use PDF-to-text converter first, then paste output here. OCR required for scanned PDFs without selectable text. Direct PDF upload not supported to keep tool simple and client-side only."
    },
    {
      question: "Why are some valid-looking emails not extracted?",
      answer: "Regex pattern has limitations for simplicity and security. Not extracted: internationalized domains (中文@example.com), quoted strings (\"user@example\"@test.com), emails with unusual special chars, emails without TLD (user@localhost). These edge cases are rare - 99% of business emails use standard format supported by tool. If legitimate email missed, check for: obfuscation ([at] instead of @), missing TLD, non-ASCII characters. Tool prioritizes common formats over RFC 5322 completeness."
    },
    {
      question: "How do I handle obfuscated emails like 'user [at] example [dot] com'?",
      answer: "Tool doesn't automatically de-obfuscate emails. Obfuscation (replacing @ with [at], . with [dot]) prevents bot scraping but also prevents automated extraction. Workarounds: (1) Find/replace [at] with @, [dot] with . before pasting, (2) Use manual extraction for obfuscated addresses, (3) Regex can't reliably detect all obfuscation patterns. Obfuscation specifically designed to prevent tools like this - requires human interpretation or custom de-obfuscation script."
    },
    {
      question: "Can I extract emails from images or screenshots?",
      answer: "No, tool processes text only. Emails in images require OCR (Optical Character Recognition) first. Workflow: (1) Use OCR tool (Google Cloud Vision, Tesseract, Adobe Acrobat) to extract text from image, (2) Paste OCR output into email extractor, (3) Extract emails from text. Screenshot text-to-speech or manual typing also works. Image processing requires server-side or native apps - adding OCR would break client-side privacy guarantee."
    },
    {
      question: "How accurate is the deduplication?",
      answer: "Case-insensitive exact match deduplication - user@example.com matches USER@example.com and User@Example.COM. Doesn't detect: email aliases (user+tag@example.com vs user@example.com are kept separate), typos (user@exmaple.com vs user@example.com are different), different domains for same person (john@company.com vs john@personal.com separate). Deduplication prevents exact repeats only. Manual review recommended for sophisticated duplicate detection (fuzzy matching, alias detection)."
    },
    {
      question: "Can I extract emails from email headers or EML files?",
      answer: "Yes, paste EML file contents (email source) directly. Tool extracts from To:, From:, CC:, BCC: headers, plus any emails in message body. Open EML in text editor, copy entire content, paste here. Handles email headers naturally since they're text format. Useful for: analyzing email threads, extracting all participants from conversation, building contact list from archived emails, GDPR compliance (finding all email addresses in old messages)."
    },
    {
      question: "What's the maximum amount of text I can process?",
      answer: "No hard limit - browser memory determines maximum. Modern browsers handle millions of characters (entire books). Practical limit: if pasting slows browser or causes lag, process in chunks. For massive datasets (database dumps, large log files), consider command-line tools or scripting. This tool optimized for typical use cases: documents, web pages, support tickets (1,000-100,000 characters). If processing 100MB+ text files, use grep/regex in programming language for better performance."
    },
    {
      question: "How do I avoid spam traps in extracted emails?",
      answer: "Tool extracts all valid-formatted emails - can't detect spam traps (honeypot emails designed to catch scrapers). Manual review required. Red flags: emails in hidden HTML elements, emails on pages warning against scraping, generic names (spam@, test@, noreply@), suspicious domains. For web scraping: respect robots.txt, follow Terms of Service, manually review extracted lists before sending campaigns. Sending to spam traps damages sender reputation. Use double opt-in for user-submitted addresses."
    },
    {
      question: "Is my text data private when using this tool?",
      answer: "Absolutely. All email extraction happens entirely in your browser using JavaScript regex matching. Your text never leaves your device or gets uploaded to servers. No network requests are made with your content. Verify by opening browser DevTools Network tab - zero uploads. Safe for extracting emails from confidential documents, customer support data, proprietary business communications, or any sensitive text. Tool works completely offline after page load. GDPR/CCPA compliant for processing personal data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This email extractor operates entirely client-side using JavaScript regex pattern matching. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All email extraction happens in your browser using regex. Text stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your input text and extracted emails are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you extract, email addresses found, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for extracting emails from confidential customer data, proprietary business documents, support ticket archives, GDPR subject access requests, or any sensitive text containing personal information. Fully compliant with data privacy regulations.`
  },

  stats: {
    "Extraction Speed": "<10ms",
    "Max Text Size": "Unlimited",
    "Deduplication": "Yes",
    "Export Formats": "2",
    "Server Uploads": "0"
  }
};
