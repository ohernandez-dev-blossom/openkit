/**
 * JSON Formatter Tool Guide Content
 * Comprehensive developer guide for JSON formatting
 */

import type { ToolGuideContent } from "./types";

export const jsonGuideContent: ToolGuideContent = {
  toolName: "JSON Formatter",
  toolPath: "/json",
  lastUpdated: "2026-02-01",
  version: "2.1",

  quickStartSteps: [
    {
      title: "Paste Your JSON Data",
      description: "Copy your raw JSON from an API response, config file, or database export and paste it into the input panel. The formatter handles unformatted, minified, or messy JSON."
    },
    {
      title: "Choose Formatting Options",
      description: "Select your preferred indentation style (2 spaces or 4 spaces) from the dropdown menu. 2 spaces is standard for web development, while 4 spaces is common in enterprise applications."
    },
    {
      title: "Click Format Button",
      description: "Press the Format button (or use Cmd/Ctrl+Enter) to instantly beautify your JSON. The output appears in the right panel with proper indentation and syntax structure."
    },
    {
      title: "Copy or Export Result",
      description: "Copy the formatted JSON to your clipboard with one click, or export it as a .json or .txt file for use in your project, documentation, or debugging workflow."
    }
  ],

  introduction: {
    title: "What is JSON?",
    content: `JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that has become the universal standard for web APIs and configuration files. Originally derived from JavaScript in the early 2000s, JSON is now language-independent and supported by virtually every modern programming language including Python, Java, Go, Ruby, PHP, and C++.

At its core, JSON represents data as human-readable text using two fundamental structures: objects (key-value pairs enclosed in curly braces) and arrays (ordered lists enclosed in square brackets). This simplicity makes JSON ideal for transmitting structured data between a server and web application, storing configuration settings, or serializing application state.

### Key Characteristics of JSON

- **Human-Readable Format:** Unlike binary formats like Protocol Buffers or MessagePack, JSON is plain text that developers can read and edit directly without specialized tools.
- **Language-Independent:** While syntactically similar to JavaScript object literals, JSON has parsers and generators available in every major programming language, making it perfect for cross-platform data exchange.
- **Lightweight & Fast:** JSON's minimal syntax overhead (just braces, brackets, colons, and commas) results in compact payloads that parse quickly, typically 10-50x faster than XML for equivalent data.
- **Strict Syntax Rules:** JSON requires double quotes for strings, no trailing commas, and specific data types (string, number, boolean, null, object, array), which ensures consistency and prevents ambiguity.

### Why JSON Matters for Developers

JSON has become the backbone of modern web development for several critical reasons. REST APIs use JSON for 90%+ of request and response payloads, making it essential knowledge for any developer working with web services. Frontend frameworks like React, Vue, and Angular expect data in JSON format when communicating with backend servers.

Configuration management relies heavily on JSON files (package.json, tsconfig.json, .eslintrc.json) to define project settings, dependencies, and build parameters. NoSQL databases like MongoDB and CouchDB store documents natively as JSON, allowing for flexible schema designs that evolve with application requirements.

The format's ubiquity means developers encounter JSON daily in API responses, database exports, log files, and inter-service communication in microservices architectures. Understanding how to format, validate, and manipulate JSON efficiently is fundamental to modern software engineering.

### JSON vs XML vs YAML

While XML was the previous standard for data interchange, JSON has largely superseded it due to significantly less verbose syntax (typically 30-50% smaller payloads), faster parsing performance, and native JavaScript compatibility. YAML offers more human-friendly syntax for configuration files but lacks the universal tooling and parsing speed of JSON, making JSON the preferred choice for APIs and data transmission despite YAML's advantages in hand-written configs.`
  },

  useCases: [
    {
      title: "API Response Formatting",
      description: "When testing REST APIs with tools like curl, Postman, or fetch, responses often come back as minified single-line JSON that's impossible to read. Format API responses to inspect nested objects, arrays, and data structures clearly during development and debugging.",
      example: `// Before: Unreadable minified response
{"user":{"id":123,"name":"Alice","roles":["admin","editor"]}}

// After: Readable formatted JSON
{
  "user": {
    "id": 123,
    "name": "Alice",
    "roles": ["admin", "editor"]
  }
}`
    },
    {
      title: "Configuration File Validation",
      description: "Configuration files like package.json, tsconfig.json, or .eslintrc.json require strict JSON syntax. Paste your config file to validate syntax, catch missing commas or quotes, and ensure your build tools can parse the configuration correctly.",
      example: `// Validates and formats package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`
    },
    {
      title: "Database Export Cleaning",
      description: "Database exports (MongoDB, PostgreSQL JSON columns, Firebase) often generate compact JSON that's hard to audit. Format exported data to review records, verify data integrity, or prepare datasets for migration between systems.",
      example: `// MongoDB export formatting
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "developer",
  "createdAt": "2024-01-15T10:30:00Z",
  "metadata": {
    "lastLogin": "2024-02-01T08:00:00Z",
    "preferences": { "theme": "dark" }
  }
}`
    },
    {
      title: "Debugging API Calls",
      description: "When debugging failed API requests or unexpected responses, formatting the JSON payload reveals structure issues, type mismatches, or missing fields that cause errors. Identify problems faster by viewing the exact data structure being sent or received.",
      example: `// Debug API error by formatting response
{
  "error": {
    "code": 400,
    "message": "Invalid request",
    "details": {
      "field": "email",
      "issue": "required field missing"
    }
  }
}`
    }
  ],

  howToUse: {
    title: "How to Use This JSON Formatter",
    content: `This JSON formatter provides instant client-side formatting with zero server uploads. All processing happens in your browser using JavaScript's built-in JSON.parse() and JSON.stringify() methods, ensuring your data remains private and processing is instantaneous.

### Basic Formatting Workflow

Copy your JSON from any source (API response, log file, code editor, database export) and paste it into the left input panel. The formatter accepts any valid JSON including objects, arrays, primitives, and nested structures up to any reasonable depth.

Select your preferred indentation from the dropdown (2 spaces for web standards, 4 spaces for enterprise codebases). Click the Format button or press Cmd/Ctrl+Enter to beautify the JSON. The formatted output appears in the right panel with proper line breaks, indentation, and visual hierarchy.

### Advanced Features

**Minify JSON:** Click the Minify button to compress formatted JSON into a single line, removing all whitespace. Useful for reducing payload size in production API requests or copying compact JSON for embedding in code.

**Syntax Validation:** Invalid JSON triggers an error banner showing the exact problem (missing comma, unquoted key, trailing comma, invalid escape sequence). Fix the syntax error and reformat.

**Export Options:** Copy the formatted JSON to clipboard with one click, download as .json file for committing to version control, or save as .txt for documentation. All exports preserve your chosen indentation.

### Keyboard Shortcuts

- **Cmd/Ctrl+Enter:** Format JSON
- **Cmd/Ctrl+K:** Clear all fields
- **Cmd/Ctrl+C:** Copy output (when output is focused)
- **Cmd/Ctrl+L:** Load sample JSON`,
    steps: [
      {
        name: "Paste JSON Data",
        text: "Copy your JSON from an API response, config file, or database export and paste it into the input panel on the left side."
      },
      {
        name: "Select Indentation",
        text: "Choose your preferred indentation style from the dropdown menu: 2 spaces (web standard) or 4 spaces (enterprise standard)."
      },
      {
        name: "Format or Minify",
        text: "Click the Format button to beautify with indentation, or Minify to compress into a single line. Press Cmd/Ctrl+Enter as a keyboard shortcut."
      },
      {
        name: "Copy or Export",
        text: "Use the Copy button to copy to clipboard, or click Export to download as .json or .txt file for use in your project."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between JSON and XML?",
      answer: "JSON is significantly more concise than XML (typically 30-50% smaller payloads), faster to parse (10-50x faster in most languages), and natively compatible with JavaScript. XML uses verbose opening/closing tags while JSON uses lightweight braces and brackets. For example, a simple user object in XML requires <user><name>Alice</name></user> while JSON needs just {\"name\":\"Alice\"}. JSON has largely replaced XML for web APIs due to these performance and readability advantages."
    },
    {
      question: "Can I format large JSON files (10MB+)?",
      answer: "Yes, this formatter handles JSON files up to 10-20MB depending on your browser's memory. Processing happens entirely in your browser using native JavaScript, so performance depends on your device. For files larger than 20MB, consider using command-line tools like jq or Python's json.tool module. Most API responses and config files are well under 1MB and format instantly."
    },
    {
      question: "Does this tool validate JSON syntax?",
      answer: "Yes, the formatter automatically validates JSON syntax when you click Format or Minify. Invalid JSON (missing quotes, trailing commas, unquoted keys, invalid escape sequences) triggers an error message showing the exact problem. This helps catch syntax errors before using the JSON in production. The validator follows the official JSON specification (RFC 8259) strictly."
    },
    {
      question: "How do I minify JSON instead of formatting it?",
      answer: "Click the Minify button to compress formatted JSON into a single line with all whitespace removed. Minified JSON reduces file size by 15-40% compared to formatted JSON, making it ideal for production API payloads, embedded JSON in HTML, or reducing network transfer size. Minification is reversible - paste minified JSON and click Format to restore readability."
    },
    {
      question: "What's the best indentation for JSON files?",
      answer: "2-space indentation is the web development standard used by major projects (Node.js, React, Angular) and aligns with JavaScript/TypeScript conventions. 4-space indentation is common in enterprise Java/C# environments and Python projects. Choose based on your team's style guide. Both are valid - consistency within a project matters more than the specific size."
    },
    {
      question: "Can I sort JSON keys alphabetically?",
      answer: "Currently this formatter preserves the original key order as defined in your JSON. Alphabetical key sorting will be added in a future update. For now, if you need sorted keys, use command-line tools like jq with the -S flag: jq -S . input.json. Note that JSON specification considers objects as unordered collections, so key order shouldn't affect functionality."
    },
    {
      question: "Is my JSON data private when using this tool?",
      answer: "Absolutely. All JSON formatting happens entirely in your browser using client-side JavaScript. Your data never leaves your device or gets sent to any servers. There are no server uploads, no data storage, and no analytics tracking of your JSON content. You can verify this by disconnecting from the internet - the formatter still works offline. Safe for sensitive API keys, config files, or proprietary data."
    },
    {
      question: "Does this work offline?",
      answer: "Yes, after your first visit, this tool works completely offline. The formatter uses browser-native JSON.parse() and JSON.stringify() methods that don't require internet connectivity. You can add OpenKit.tools to your home screen as a Progressive Web App (PWA) for instant offline access. Perfect for formatting JSON on flights, in areas with poor connectivity, or air-gapped environments."
    },
    {
      question: "What browsers are supported?",
      answer: "All modern browsers are fully supported: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. The formatter uses standard JavaScript APIs (JSON.parse, JSON.stringify) that have been supported since IE9, so even older browsers work fine. For the best experience with syntax highlighting and keyboard shortcuts, use the latest version of your preferred browser."
    },
    {
      question: "How do I report invalid JSON errors?",
      answer: "When JSON is invalid, an error banner appears showing the specific syntax problem (e.g., \"Unexpected token } at position 42\"). Common errors include: missing closing brace/bracket, unquoted object keys (must use double quotes), trailing commas (not allowed in JSON), single quotes instead of double quotes, or unescaped special characters. Fix the reported issue and click Format again. For complex errors, try validating smaller sections of the JSON to isolate the problem."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your JSON data never leaves your browser. This formatter operates entirely client-side using JavaScript's native JSON.parse() and JSON.stringify() methods built into your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All formatting, validation, and minification happens in your browser's JavaScript engine. Your data stays on your device.
- **No Server Uploads:** We don't have servers to process JSON. The tool works completely offline after first load.
- **No Data Storage:** Your JSON is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what JSON you format, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. and auditable. Inspect the Network tab in browser DevTools - you'll see zero outbound requests containing your data.

This makes the formatter safe for sensitive use cases like formatting API keys, authentication tokens, private configuration files, database exports containing user data, or any proprietary JSON that must remain confidential. Use with confidence for production debugging, security testing, or handling regulated data (HIPAA, GDPR, PCI-DSS).`
  },

  stats: {
    "Max File Size": "10MB",
    "Processing Speed": "<100ms",
    "API Adoption": "90%+",
    "Browser Support": "100%",
    "Server Uploads": "0"
  }
};
