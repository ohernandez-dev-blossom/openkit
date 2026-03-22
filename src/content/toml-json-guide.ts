/**
 * TOML to JSON Converter Tool Guide Content
 * Comprehensive developer guide for TOML to JSON conversion
 */

import type { ToolGuideContent } from "./types";

export const tomlJsonGuideContent: ToolGuideContent = {
  toolName: "TOML to JSON Converter",
  toolPath: "/toml-json",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your TOML Configuration",
      description: "Copy TOML from Cargo.toml, pyproject.toml, or any config file and paste into the input field. The tool handles tables, arrays, nested sections, and all TOML data types."
    },
    {
      title: "Automatic Validation",
      description: "The converter validates TOML syntax in real-time. Invalid TOML triggers error messages showing exactly what's wrong and where, helping you fix syntax issues quickly."
    },
    {
      title: "View JSON Output",
      description: "See your TOML instantly converted to JSON format with proper nesting, quoted keys, and 2-space indentation. Arrays, tables, and inline tables map cleanly to JSON structures."
    },
    {
      title: "Copy or Download Result",
      description: "Click Copy to grab JSON for use in JavaScript applications, or Download as .json file for APIs, databases, or configuration systems that require JSON input."
    }
  ],

  introduction: {
    title: "What is TOML to JSON Conversion?",
    content: `TOML (Tom's Obvious Minimal Language) to JSON conversion transforms human-friendly configuration format into JavaScript Object Notation for use in web applications, APIs, and JSON-based tools. TOML is designed specifically for config files with clean syntax optimized for humans, while JSON serves as the universal data exchange format for web services and JavaScript applications.

TOML dominates the Rust ecosystem (Cargo.toml package manifests), Python modern tooling (pyproject.toml for Poetry, Black, pytest), and configuration management where clarity matters. JSON dominates web APIs, browser JavaScript, NoSQL databases, and programmatic data exchange. Converting between them enables config-driven applications to consume TOML user configs while processing them as JSON internally.

### Why Convert TOML to JSON?

Rust and Python projects use TOML for package configuration (Cargo.toml, pyproject.toml), but build tools and CI/CD pipelines often require JSON input. Convert TOML configs to JSON for processing with JavaScript tools, importing into MongoDB or Firestore, sending to REST APIs that accept JSON, or using with configuration management systems expecting JSON.

Web applications that allow user-provided configuration files can accept TOML (easier for users to write) and convert to JSON internally for processing. TOML's readable syntax makes it ideal for user-facing configs, while JSON's ubiquity makes it ideal for programmatic processing.

### TOML vs JSON: Syntax Differences

**TOML:**
\`\`\`toml
[database]
host = "localhost"
port = 5432

[database.credentials]
username = "admin"
password = "secret"
\`\`\`

**JSON:**
\`\`\`json
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "credentials": {
      "username": "admin",
      "password": "secret"
    }
  }
}
\`\`\`

TOML uses [section] headers for nesting instead of braces. Keys don't need quotes. Strings use quotes but numbers/booleans don't. Comments are allowed (#). JSON requires strict quoting, braces for nesting, no comments.

### TOML Advantages for Configuration

**Readability:** Section headers ([database], [server]) mirror .ini file structure familiar to developers. No visual noise from braces and commas.

**Comments support:** TOML allows # comments inline and on dedicated lines. JSON has no comment support (technically invalid, though some parsers allow //).

**Type safety:** TOML enforces data types at parse time. Dates, datetimes, and integers are distinct types. JSON treats everything as strings, numbers, or booleans with no datetime support.

**Multi-line strings:** TOML supports triple-quoted strings ('''multi-line text''') preserving formatting without escape characters. JSON requires \\n escapes.

**Arrays of tables:** TOML's [[array.of.tables]] syntax cleanly represents repeated config sections (multiple [[database]] entries). JSON requires arrays of objects which is less readable.

### When TOML is Used

**Rust ecosystem:** Cargo.toml for package manifests, dependencies, build configuration.

**Python modern tooling:** pyproject.toml for Poetry dependency management, Black formatter config, pytest settings, Ruff linter config.

**Configuration files:** Application configs, deployment settings, feature flags where human editing is common.

**Hugo static site generator:** Hugo config files (config.toml) for site configuration.

This tool handles all TOML features: tables, inline tables, arrays, arrays of tables, datetimes, multi-line strings, and comments (which are stripped in JSON output since JSON doesn't support comments). All processing happens client-side - your config data never leaves your browser.`
  },

  useCases: [
    {
      title: "Convert Rust Cargo.toml to JSON for Build Tools",
      description: "Parse Rust package manifests (Cargo.toml) into JSON for custom build scripts, dependency analyzers, or CI/CD tools that process package metadata. Convert Cargo.toml to JSON to extract dependencies programmatically.",
      example: `# Cargo.toml (TOML):
[package]
name = "my-app"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.35", features = ["full"] }

# Convert to JSON:
{
  "package": {
    "name": "my-app",
    "version": "0.1.0",
    "edition": "2021"
  },
  "dependencies": {
    "serde": {
      "version": "1.0",
      "features": ["derive"]
    },
    "tokio": {
      "version": "1.35",
      "features": ["full"]
    }
  }
}

// Process in Node.js:
const config = JSON.parse(jsonOutput);
const deps = Object.keys(config.dependencies);
console.log('Dependencies:', deps.join(', '));`
    },
    {
      title: "Parse Python pyproject.toml for Tool Configuration",
      description: "Extract Python project configuration from pyproject.toml (Poetry, Black, pytest configs) into JSON for processing by JavaScript build tools, documentation generators, or custom scripts.",
      example: `# pyproject.toml (TOML):
[tool.poetry]
name = "my-python-app"
version = "0.1.0"

[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.109.0"
pydantic = "^2.5.0"

[tool.black]
line-length = 100
target-version = ['py311']

# Convert to JSON:
{
  "tool": {
    "poetry": {
      "name": "my-python-app",
      "version": "0.1.0",
      "dependencies": {
        "python": "^3.11",
        "fastapi": "^0.109.0",
        "pydantic": "^2.5.0"
      }
    },
    "black": {
      "line-length": 100,
      "target-version": ["py311"]
    }
  }
}

// Use in JavaScript tooling:
const config = JSON.parse(jsonOutput);
const version = config.tool.poetry.version;`
    },
    {
      title: "Import TOML Configs to MongoDB/Firestore",
      description: "Convert TOML configuration files to JSON for storage in NoSQL databases. TOML provides clean syntax for users to define configs, then convert to JSON for database insertion.",
      example: `# app-config.toml (TOML):
[server]
host = "0.0.0.0"
port = 8080
timeout = 30

[database]
url = "postgresql://localhost/mydb"
pool_size = 10

[features]
dark_mode = true
analytics = false

# Convert to JSON and insert to MongoDB:
{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "timeout": 30
  },
  "database": {
    "url": "postgresql://localhost/mydb",
    "pool_size": 10
  },
  "features": {
    "dark_mode": true,
    "analytics": false
  }
}

// MongoDB insertion:
const config = JSON.parse(jsonOutput);
await db.collection('configs').insertOne({
  ...config,
  created_at: new Date()
});`
    },
    {
      title: "Process TOML Application Configs in Node.js",
      description: "Allow users to write application configs in TOML (easier syntax) while your Node.js app consumes them as JSON. Convert TOML to JSON at runtime or during build process for compatibility with JSON-based config libraries.",
      example: `# config.toml (TOML):
[app]
name = "My App"
environment = "production"

[logging]
level = "info"
output = "/var/log/app.log"

[email]
smtp_host = "smtp.example.com"
smtp_port = 587
from_address = "noreply@example.com"

// Node.js app loads TOML as JSON:
import fs from 'fs';
import TOML from '@iarna/toml';

const tomlContent = fs.readFileSync('config.toml', 'utf-8');
const config = TOML.parse(tomlContent);

// config is now JSON object:
console.log(config.app.name); // "My App"
console.log(config.logging.level); // "info"

// Or pre-convert TOML to JSON during build:
// config.toml → config.json → require('./config.json')`
    }
  ],

  howToUse: {
    title: "How to Use This TOML to JSON Converter",
    content: `This tool provides instant TOML to JSON conversion with full TOML v1.0 spec support, validation, and error reporting. All processing happens client-side using JavaScript TOML parsers - no server uploads.

### Converting TOML to JSON

Paste valid TOML into the input field. The tool parses and validates TOML syntax, then converts to formatted JSON with 2-space indentation. Supports all TOML features: tables, inline tables, arrays, arrays of tables, strings, integers, floats, booleans, datetimes, and multi-line strings.

### TOML Syntax Validation

Invalid TOML triggers detailed error messages indicating the problem and line number. Common errors: unquoted strings with spaces, missing = in key-value pairs, unclosed quotes, invalid section headers. Fix errors in TOML before conversion completes.

### Handling TOML Comments

TOML allows # comments which JSON doesn't support. Comments are automatically stripped during conversion. If you need to preserve comments as documentation, manually add them as JSON string values or separate documentation file.

### Date and Time Conversion

TOML has native datetime types (2024-01-15T10:30:00Z). These convert to ISO 8601 string format in JSON since JSON has no datetime type. Parse these strings as Date objects in JavaScript: \`new Date(jsonValue)\`.

### Arrays of Tables

TOML's [[section]] syntax creates arrays of table objects. For example:
\`\`\`toml
[[database]]
host = "db1"

[[database]]
host = "db2"
\`\`\`

Converts to JSON array:
\`\`\`json
{
  "database": [
    { "host": "db1" },
    { "host": "db2" }
  ]
}
\`\`\`

### Inline Tables

TOML inline tables \`{key = "value", key2 = "value2"}\` convert directly to JSON objects \`{"key": "value", "key2": "value2"}\`. Both represent same structure with different syntax.`,
    steps: [
      {
        name: "Paste TOML",
        text: "Copy TOML from Cargo.toml, pyproject.toml, config files, or any TOML source. Must be valid TOML syntax."
      },
      {
        name: "Validate Syntax",
        text: "Tool automatically validates TOML. Error messages show exactly what's wrong if TOML is invalid."
      },
      {
        name: "Review JSON",
        text: "Check converted JSON for correctness. Tables become nested objects, arrays preserve order, types are converted."
      },
      {
        name: "Copy or Download",
        text: "Copy to clipboard or download as .json file for use in JavaScript apps, APIs, or databases."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between TOML and JSON?",
      answer: "TOML is designed for human-written configuration files with clean syntax, no quotes around keys, section headers ([section]), and comment support (#). JSON is designed for data exchange with strict syntax, quoted keys, braces for nesting, no comments. TOML is easier to write and read. JSON is easier to parse programmatically. Use TOML for configs humans edit, JSON for API data exchange."
    },
    {
      question: "Can I convert JSON back to TOML?",
      answer: "Yes, but with limitations. JSON to TOML conversion works for simple structures. However, JSON lacks TOML features like comments and native datetimes. Nested JSON maps to TOML table sections. Arrays of objects map to TOML arrays of tables. Use our JSON to TOML converter (if available) or TOML libraries in your language for reverse conversion."
    },
    {
      question: "How are TOML comments handled in JSON?",
      answer: "TOML comments (# comment text) are stripped during JSON conversion because JSON doesn't support comments. Comment content is lost. If you need to preserve documentation, extract comments manually before conversion or use a custom JSON format with comment fields. Standard JSON parsers reject comments (though some non-standard parsers allow // or /**/)."
    },
    {
      question: "What happens to TOML datetimes in JSON?",
      answer: "TOML native datetime types (2024-01-15T10:30:00Z, 2024-01-15, 10:30:00) convert to ISO 8601 strings in JSON since JSON has no datetime type. In JavaScript, parse these strings: \`new Date('2024-01-15T10:30:00Z')\`. In Python: \`datetime.fromisoformat(json_value)\`. The string format preserves timezone and precision from TOML."
    },
    {
      question: "Can this parse Cargo.toml from Rust projects?",
      answer: "Yes, Cargo.toml is standard TOML format. This tool parses package manifests including [package], [dependencies], [dev-dependencies], [features], and workspace configurations. Extract dependency lists, version info, or metadata for build tools, security audits, or documentation generation. The JSON output can be consumed by JavaScript tooling or CI/CD scripts."
    },
    {
      question: "How do TOML arrays of tables convert to JSON?",
      answer: "TOML arrays of tables syntax [[name]] converts to JSON arrays containing objects. Each [[name]] section becomes an object in the array. Example: [[database]] / host='db1' / [[database]] / host='db2' converts to JSON {\"database\": [{\"host\":\"db1\"}, {\"host\":\"db2\"}]}. This handles repeated configuration sections cleanly."
    },
    {
      question: "What's the difference between [table] and [[array.table]]?",
      answer: "[table] defines a single table (object in JSON). [[array.table]] defines an element in an array of tables. [database] creates {\"database\": {...}}. [[database]] creates {\"database\": [{...}]}. Use [section] for single configs, [[section]] for repeated/multiple configs. Mixing both for same name is invalid TOML."
    },
    {
      question: "Can this handle multi-line strings in TOML?",
      answer: "Yes, TOML multi-line basic strings (\"\"\"...\"\"\") and multi-line literal strings ('''...''') convert to JSON strings with escaped newlines (\\n). TOML preserves newlines and formatting. JSON represents them as escaped characters. When parsing JSON in code, newlines are restored. The string content is identical, just different representation."
    },
    {
      question: "Why use TOML instead of YAML for configs?",
      answer: "TOML is simpler than YAML with less ambiguity. YAML has multiple ways to represent same data (flow/block style, quoted/unquoted) and complex parsing rules. TOML has one clear way. TOML is strictly typed (integers vs floats vs strings). YAML auto-converts types which can cause bugs (Norway country code 'NO' becomes boolean false). TOML is easier to parse correctly. Use TOML for simple configs, YAML when you need advanced features (anchors, merging)."
    },
    {
      question: "Is my TOML data private and secure?",
      answer: "Absolutely. All TOML to JSON conversion happens entirely in your browser using client-side JavaScript TOML parser library. Your TOML data never leaves your device or gets uploaded to servers. No network requests are made with your data. Verify by opening browser DevTools Network tab - zero uploads. Safe for sensitive configs, package manifests, API keys, or proprietary configuration data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your TOML data never leaves your browser. This converter operates entirely client-side using JavaScript TOML parsing libraries. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All TOML parsing and JSON generation happens in your browser's JavaScript engine. Data stays on your device.
- **No Server Uploads:** We don't have backend servers to process TOML. The tool works completely offline after first page load.
- **No Data Storage:** Your TOML input and JSON output are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you convert, config values, package manifests, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your data.

Safe for converting sensitive configurations, package manifests with proprietary dependencies, API credentials, infrastructure settings, or any confidential TOML data. Use with confidence for Cargo.toml, pyproject.toml, or production configs.`
  },

  stats: {
    "Conversion Speed": "<50ms",
    "TOML Version": "1.0",
    "Max File Size": "5MB",
    "Validation": "Real-time",
    "Server Uploads": "0"
  }
};
