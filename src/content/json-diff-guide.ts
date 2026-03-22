/**
 * JSON Diff Tool Guide Content
 * Comprehensive developer guide for JSON comparison
 */

import type { ToolGuideContent } from "./types";

export const jsonDiffGuideContent: ToolGuideContent = {
  toolName: "JSON Diff",
  toolPath: "/json-diff",
  lastUpdated: "2026-02-15",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Left JSON",
      description: "Paste your original or base JSON into the left panel. This is the reference document that changes will be compared against."
    },
    {
      title: "Paste Right JSON",
      description: "Paste the modified or updated JSON into the right panel. This is the document that will be compared to the original."
    },
    {
      title: "Click Compare",
      description: "Press the Compare button (or use Cmd/Ctrl+Enter) to perform a deep semantic comparison. The diff results appear below with color-coded changes."
    },
    {
      title: "Review & Export",
      description: "Review additions (green), deletions (red), and changes (yellow) in the diff output. Copy the diff report or export it for documentation."
    }
  ],

  introduction: {
    title: "What is JSON Diff?",
    content: `JSON Diff (also called JSON Compare) is the process of finding semantic differences between two JSON documents. Unlike simple text-based line comparison, JSON diff understands the structure of JSON data — it compares objects by their keys, arrays by their elements, and values by their types and content.

### Why Semantic Comparison Matters

Text-based diff tools like \`diff\` or Git's built-in diff treat JSON as plain text, which means reordering keys, changing indentation, or reformatting can produce massive diffs even when the data is semantically identical. A JSON-aware diff tool understands that \`{"a":1,"b":2}\` and \`{"b":2,"a":1}\` are equivalent objects.

### Common Use Cases

- **API Version Comparison:** Compare API responses between versions to identify breaking changes, new fields, or removed endpoints.
- **Configuration Auditing:** Track changes between config file versions (package.json, tsconfig.json) to understand what was modified and why.
- **Database Migration Verification:** Compare database exports before and after migration to ensure data integrity.
- **Code Review Support:** When reviewing PRs that modify JSON fixtures or test data, a semantic diff reveals the actual data changes versus formatting noise.`
  },

  useCases: [
    {
      title: "API Response Comparison",
      description: "Compare API responses between different environments (staging vs production) or API versions to identify new fields, removed properties, or changed values before deploying updates.",
      example: `// v1 response vs v2 response
// Quickly find: new fields, removed fields, type changes`
    },
    {
      title: "Configuration Change Tracking",
      description: "Track exactly what changed between two versions of configuration files like package.json, docker-compose.yml exports, or Terraform state files converted to JSON.",
      example: `// Before deploy vs after deploy
// Catch: dependency version bumps, new scripts, removed configs`
    },
    {
      title: "Database Record Auditing",
      description: "Compare database record snapshots to audit changes over time. Useful for compliance, debugging data corruption, or verifying migration scripts work correctly.",
      example: `// Record at T1 vs Record at T2
// Detect: field modifications, type coercion, null values`
    },
    {
      title: "Test Fixture Validation",
      description: "Verify test fixture changes during code reviews. Semantic diff filters out formatting noise and shows only meaningful data changes that could affect test outcomes.",
      example: `// Old fixture vs new fixture
// Focus on: actual value changes vs formatting changes`
    }
  ],

  howToUse: {
    title: "How to Use JSON Diff",
    content: `This JSON diff tool performs deep semantic comparison entirely in your browser. No data is sent to any server — all processing happens client-side using recursive object traversal.

### Comparison Features

**Deep Nested Comparison:** The diff engine recursively traverses both JSON documents to any depth, comparing each value at every level. Nested objects and arrays are compared structurally, not as serialized strings.

**Type-Aware Changes:** When a value changes type (e.g., string "123" becomes number 123), the diff highlights it as a type change, which is critical for API compatibility.

**Array Handling:** By default, arrays are compared element-by-element by index. Enable "Ignore Array Order" to treat arrays as sets, which is useful when order doesn't matter (e.g., tags, permissions).

**Ignore Whitespace:** When comparing JSON with different formatting, enable this option to normalize whitespace differences and focus on semantic changes only.

### Reading the Diff Output

- 🟢 **Green (Additions):** Keys or values present in the right JSON but missing from the left
- 🔴 **Red (Deletions):** Keys or values present in the left JSON but missing from the right
- 🟡 **Yellow (Changes):** Values that exist in both but differ in content or type

### Keyboard Shortcuts

- **Cmd/Ctrl+Enter:** Compare JSON
- **Cmd/Ctrl+K:** Clear all fields
- **Cmd/Ctrl+L:** Load sample data`,
    steps: [
      {
        name: "Paste Original JSON",
        text: "Paste your base or original JSON into the left input panel."
      },
      {
        name: "Paste Modified JSON",
        text: "Paste the updated or modified JSON into the right input panel."
      },
      {
        name: "Configure Options",
        text: "Optionally enable 'Ignore Array Order' or 'Ignore Whitespace' for your comparison needs."
      },
      {
        name: "Compare and Review",
        text: "Click Compare (or Cmd/Ctrl+Enter) to see the diff. Review additions, deletions, and changes in the color-coded output."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between text diff and JSON diff?",
      answer: "Text diff compares files line by line, so reordering JSON keys or changing indentation creates false positives. JSON diff understands the structure — it compares objects by keys and values semantically, ignoring formatting differences. This means {\"a\":1,\"b\":2} and {\"b\":2,\"a\":1} are considered identical in JSON diff but different in text diff."
    },
    {
      question: "How does array comparison work?",
      answer: "By default, arrays are compared element-by-element by index position. Element at index 0 in the left is compared to index 0 in the right. If you enable 'Ignore Array Order', arrays are treated as unordered sets — useful for comparing tags, permissions, or any list where order doesn't matter semantically."
    },
    {
      question: "Can it handle large JSON files?",
      answer: "Yes, the diff engine handles JSON documents up to several megabytes. All processing happens in your browser using efficient recursive algorithms. For very large files (10MB+), comparison may take a few seconds depending on your device. The tool processes everything client-side, so there are no server timeouts or upload limits."
    },
    {
      question: "Does it detect type changes?",
      answer: "Yes, the diff engine specifically detects when a value's type changes between the two documents. For example, if a field changes from string \"42\" to number 42, or from null to an empty object {}, these are highlighted as type changes. This is crucial for API compatibility checking where type mismatches can cause runtime errors."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. All comparison happens entirely in your browser using client-side JavaScript. Your JSON data never leaves your device — no server uploads, no data storage, no analytics on your content. Safe for comparing sensitive configurations, API keys, or proprietary data."
    },
    {
      question: "Can I export the diff report?",
      answer: "Yes, you can copy the diff report to your clipboard or export it as a text file. The report includes all additions, deletions, and changes with their paths, making it useful for documentation, code reviews, or change logs."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All JSON comparison happens entirely in your browser. Your data never leaves your device.

### Privacy Guarantees

- **100% Client-Side Processing:** The diff algorithm runs in your browser's JavaScript engine. No server-side processing.
- **No Data Transmission:** Neither the left nor right JSON document is ever sent to any server.
- **No Storage:** Your JSON data is not saved, logged, or cached anywhere. Close the tab and it's gone.
- **Safe for Sensitive Data:** Compare API keys, credentials, configurations, or any proprietary JSON with confidence.

This makes the tool suitable for comparing sensitive configurations, database exports, or any data subject to compliance requirements (GDPR, HIPAA, PCI-DSS).`
  },

  stats: {
    "Max Depth": "Unlimited",
    "Processing": "Client-side",
    "Data Uploaded": "0 bytes",
    "Diff Types": "3 (add/del/change)",
    "Array Modes": "Ordered & Unordered"
  }
};
