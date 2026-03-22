/**
 * HTML Entities Tool Guide Content
 * Comprehensive developer guide for HTML entity encoding/decoding
 */

import type { ToolGuideContent } from "./types";

export const htmlEntitiesGuideContent: ToolGuideContent = {
  toolName: "HTML Entities Encoder/Decoder",
  toolPath: "/html-entities",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your Text",
      description: "Copy text containing special characters, HTML markup, or encoded entities and paste it into the input panel. The tool handles both plain text encoding and entity-encoded text decoding."
    },
    {
      title: "Choose Encode or Decode",
      description: "Select Encode to convert special characters to HTML entities (&, <, >) or Decode to convert entities back to readable characters. Both named entities (&amp;) and numeric entities (&#38;) are supported."
    },
    {
      title: "Select Encoding Mode",
      description: "When encoding, choose which characters to convert: Special only (& < > \" '), All characters (full ASCII), Named entities (&amp;), or Numeric entities (&#38;)."
    },
    {
      title: "Copy Result",
      description: "Click Copy to copy the encoded or decoded result to your clipboard, ready for HTML templates, XML documents, or text processing."
    }
  ],

  introduction: {
    title: "What are HTML Entities?",
    content: `HTML entities are special codes used to represent characters that have special meaning in HTML or characters that aren't easily typable on keyboards. Entities prevent HTML parsing errors and ensure text displays correctly across all browsers and character encodings.

HTML uses certain characters for markup syntax - angle brackets (< >), ampersands (&), and quotes (" '). When these characters appear in text content rather than markup, they must be encoded as entities to prevent browsers from misinterpreting them as HTML tags or attributes. For example, & becomes &amp; and < becomes &lt;.

### Why HTML Entities Matter

HTML entity encoding prevents Cross-Site Scripting (XSS) attacks, one of the most common web security vulnerabilities. When user-generated content contains HTML tags or JavaScript, encoding these characters neutralizes the code. Input like <script>alert('XSS')</script> becomes &lt;script&gt;alert('XSS')&lt;/script&gt;, displaying as text rather than executing.

Content management systems and templating engines automatically encode user input before rendering it in HTML. Understanding entities helps developers debug rendering issues, verify security measures are working, and handle edge cases where automatic encoding isn't sufficient.

Internationalization requires entity encoding for special characters outside the ASCII range. Copyright symbols (©), currency symbols (€ £ ¥), accented characters (é ñ ü), and mathematical symbols (× ÷ ±) all have HTML entity representations that ensure consistent display regardless of page encoding.

### Types of HTML Entities

**Named Entities:** Human-readable entity names like &amp; for ampersand, &lt; for less-than, &copy; for copyright symbol. Named entities are easier to remember and read in source code but only cover commonly-used characters.

**Numeric Entities:** Character codes in decimal (&#38;) or hexadecimal (&#x26;) format. Numeric entities can represent any Unicode character, making them universal but less readable than named entities.

**Special Character Entities:** Five critical entities prevent HTML parsing errors: &amp; (&), &lt; (<), &gt; (>), &quot; ("), and &apos; ('). These must be encoded when they appear in text content or attribute values.

### Common Use Cases

Developers use HTML entity encoding when sanitizing user input before database storage, preventing XSS in comment sections or user profiles, displaying code snippets in HTML pages (escaping < > for code examples), handling internationalized content with special characters, and debugging HTML rendering issues caused by unencoded special characters.

Entity decoding is necessary when extracting text from HTML for search indexing, converting HTML email content to plain text, processing XML/HTML data in APIs, or displaying human-readable text from encoded database values.`
  },

  useCases: [
    {
      title: "Prevent XSS Attacks",
      description: "Encode user-generated content before displaying in HTML to prevent Cross-Site Scripting attacks. Malicious scripts become harmless text when entities are encoded.",
      example: `// Before: Dangerous user input
User comment: <script>alert('XSS')</script>

// After: Safely encoded
User comment: &lt;script&gt;alert('XSS')&lt;/script&gt;

// Result: Displays as text, doesn't execute
// Browser shows: <script>alert('XSS')</script>`
    },
    {
      title: "Display Code in HTML",
      description: "Show HTML, XML, or code snippets in web pages by encoding angle brackets and special characters. Code examples render as text rather than being parsed as markup.",
      example: `<!-- Before: Broken code display -->
<p>Use <div> for layout</p>
<!-- Browser parses <div> as a tag -->

<!-- After: Properly encoded -->
<p>Use &lt;div&gt; for layout</p>
<!-- Browser displays: Use <div> for layout -->`
    },
    {
      title: "Handle International Characters",
      description: "Encode special characters from non-English languages, currency symbols, and mathematical notation to ensure consistent display across all browsers and character encodings.",
      example: `// International content encoding
Price: €29.99 → Price: &euro;29.99
Copyright © 2024 → Copyright &copy; 2024
Temperature: 20°C → Temperature: 20&deg;C
Math: 5 × 3 ÷ 2 → Math: 5 &times; 3 &divide; 2`
    },
    {
      title: "Sanitize Database Content",
      description: "Encode special characters in text before storing in databases to prevent SQL injection and ensure data can be safely rendered in HTML later.",
      example: `// User profile bio sanitization
Input: "I love <coding> & design!"
Encoded: "I love &lt;coding&gt; &amp; design!"
// Safe to store and display without XSS risk`
    }
  ],

  howToUse: {
    title: "How to Use This HTML Entity Encoder/Decoder",
    content: `This HTML entity tool provides instant client-side encoding and decoding with zero server uploads. All processing happens in your browser using JavaScript, ensuring your content remains private and processing is instantaneous.

### Basic Encoding Workflow

Paste text containing special characters (& < > " ') into the input panel. Select Encode mode and choose your encoding preference: Special Characters only (encodes & < > " ' for safety), All Characters (encodes entire ASCII range), Named Entities (&amp; format), or Numeric Entities (&#38; format).

The encoder processes text instantly, converting special characters to their entity equivalents. The output is safe for insertion into HTML attributes, element content, or XML documents without parsing errors or security vulnerabilities.

### Basic Decoding Workflow

Paste text containing HTML entities (like &lt;div&gt; or &#38;) into the input panel. Select Decode mode. The decoder recognizes both named entities (&copy;) and numeric entities (&#169;) and converts them back to readable characters.

The decoded output displays human-readable text with special characters restored. This is useful for extracting plain text from HTML, processing encoded database values, or converting HTML email content to readable format.

### Advanced Features

**Selective Encoding:** Choose which characters to encode. "Special only" encodes just the five critical HTML characters, minimizing entity usage. "All characters" encodes the complete text for maximum safety in untrusted contexts.

**Named vs Numeric:** Named entities (&copy;) are human-readable and easier to debug in HTML source. Numeric entities (&#169;) are universal and work for any Unicode character, including emoji and rare symbols.

**Reference Table:** The tool includes a comprehensive reference showing common characters, their named entities, numeric codes, and descriptions. Use this as a quick lookup when writing HTML manually.

**Bidirectional Conversion:** Switch between Encode and Decode modes to verify conversions. Encode text, then decode it to ensure the transformation is reversible and accurate.

### Best Practices

Always encode user-generated content before inserting into HTML to prevent XSS attacks. Use named entities for common symbols (copyright, trademark, currency) for better source code readability. Use numeric entities for rare characters or symbols without named equivalents. Test encoded HTML in multiple browsers to verify rendering consistency. Remember that entities only protect against HTML parsing issues, not all security threats - use Content Security Policy (CSP) and proper validation alongside encoding.`,
    steps: [
      {
        name: "Paste Text or HTML",
        text: "Copy your text containing special characters or HTML entities and paste it into the input panel."
      },
      {
        name: "Select Mode",
        text: "Choose Encode to convert characters to entities, or Decode to convert entities back to readable characters."
      },
      {
        name: "Choose Encoding Type",
        text: "When encoding, select Special characters only, All characters, Named entities, or Numeric entities based on your needs."
      },
      {
        name: "Copy Result",
        text: "Click Copy to copy the encoded or decoded result to your clipboard, ready for HTML, XML, or text processing."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between named and numeric entities?",
      answer: "Named entities use descriptive names (&amp; for &, &copy; for ©) and are easier to read in HTML source code. Numeric entities use character codes (&#38; for &, &#169; for ©) and can represent any Unicode character, including those without named equivalents. Named entities are limited to about 250 common characters; numeric entities are universal. Use named for readability, numeric for rare characters."
    },
    {
      question: "Does HTML entity encoding prevent all XSS attacks?",
      answer: "HTML entity encoding prevents most XSS attacks by neutralizing HTML tags and JavaScript in text content. However, it's not sufficient alone - use it alongside Content Security Policy (CSP), input validation, and context-aware escaping. Entities don't protect against XSS in JavaScript contexts, CSS, or URLs. Use proper security frameworks that handle all contexts correctly."
    },
    {
      question: "Should I encode all user input?",
      answer: "Encode user input when inserting it into HTML content or attributes to prevent XSS. Don't encode when storing in databases - store raw text and encode on output. This allows searching, processing, and using the text in multiple contexts. Encode at the presentation layer (templates, views) rather than the data layer (database). Modern frameworks handle this automatically."
    },
    {
      question: "Can I use HTML entities in XML documents?",
      answer: "XML supports only five predefined entities: &lt; &gt; &amp; &quot; &apos;. Other HTML named entities (like &copy; or &nbsp;) don't work in XML unless you define them in a DTD. For XML, use numeric entities (&#169; instead of &copy;) which work universally. XHTML supports all HTML entities because it includes the HTML entity definitions."
    },
    {
      question: "Do HTML entities work in email?",
      answer: "Yes, HTML entities work in HTML emails. Email clients render entities the same as web browsers. Use entities to display special characters reliably across email clients (Gmail, Outlook, Apple Mail). However, some very old or text-only email clients may show entities as-is (&copy; instead of ©), so test thoroughly."
    },
    {
      question: "Is my content private when using this tool?",
      answer: "Absolutely. All HTML entity encoding and decoding happens entirely in your browser using client-side JavaScript. Your content never leaves your device or gets sent to any servers. No uploads, no storage, no analytics tracking. Safe for encoding sensitive user data, proprietary content, or confidential text."
    },
    {
      question: "How do I encode emoji or special Unicode characters?",
      answer: "Emoji and special Unicode characters require numeric entities. For example, 😀 becomes &#128512; or &#x1F600; (hexadecimal). Named entities don't exist for emoji. Most modern browsers support emoji in UTF-8 directly, so encoding is usually unnecessary unless you need to support very old browsers or ensure consistent rendering."
    },
    {
      question: "What about non-breaking spaces (&nbsp;)?",
      answer: "Non-breaking space (&nbsp; or &#160;) prevents line breaks between words, useful for keeping names together (Mr. Smith), numbers with units (100 kg), or preventing widows/orphans in text. Regular spaces (character 32) allow line breaks. Use &nbsp; sparingly - overuse creates awkward line breaks and makes text harder to read on mobile."
    },
    {
      question: "Can entity encoding break my HTML?",
      answer: "Incorrect entity encoding can break HTML if you encode HTML tags you intend to render as markup. Only encode user-generated content or text that should display literally. Don't encode your own HTML structure (&lt;div&gt; won't create a div, it'll display as text). Use server-side templating that distinguishes between safe HTML and user content."
    },
    {
      question: "How do I decode entities in JavaScript?",
      answer: "Create a temporary DOM element and use innerHTML: const decoded = document.createElement('textarea'); decoded.innerHTML = encodedText; return decoded.value; This leverages browser's built-in entity decoding. Libraries like he.js provide more robust decoding with better security handling and edge case support for production use."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your content never leaves your browser. This HTML entity encoder/decoder operates entirely client-side using JavaScript string processing in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All encoding and decoding happens in your browser's JavaScript engine. Your content stays on your device.
- **No Server Uploads:** We don't have servers to process HTML entities. The tool works completely offline after first load.
- **No Data Storage:** Your content is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what content you encode/decode, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the tool safe for sensitive use cases like encoding user data with personally identifiable information (PII), sanitizing comments with confidential content, processing proprietary HTML templates, or any content that must remain confidential. Use with confidence for security audits, XSS prevention testing, or handling regulated data.

### XSS Prevention Note

While HTML entity encoding is a crucial XSS defense, it's not sufficient alone. Use comprehensive security frameworks that provide context-aware escaping (different escaping for HTML content, attributes, JavaScript, CSS, URLs). Implement Content Security Policy (CSP) headers to block inline scripts. Validate and sanitize input on the server side. Defense in depth is essential for web application security.`
  },

  stats: {
    "Entities": "250+",
    "Processing": "<10ms",
    "Modes": "4",
    "Privacy": "100%"
  }
};
