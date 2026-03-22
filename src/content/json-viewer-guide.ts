/**
 * JSON Viewer Tool Guide Content
 * Comprehensive developer guide for JSON tree exploration
 */

import type { ToolGuideContent } from "./types";

export const jsonViewerGuideContent: ToolGuideContent = {
  toolName: "JSON Viewer",
  toolPath: "/json-viewer",
  lastUpdated: "2026-02-15",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste or Upload JSON",
      description: "Paste your JSON data into the input panel or drag and drop a .json file. The viewer accepts any valid JSON including deeply nested objects and large arrays."
    },
    {
      title: "Explore the Tree",
      description: "Click the arrow icons to expand and collapse nodes. The tree view color-codes values by type: strings (green), numbers (blue), booleans (orange), null (gray)."
    },
    {
      title: "Search & Navigate",
      description: "Use the search bar to filter and highlight matching keys or values. Click any node to copy its dot-notation path, or click a value to copy it directly."
    },
    {
      title: "Analyze Structure",
      description: "Review the stats panel showing total keys, maximum depth, and data type breakdown. Use Expand All / Collapse All to control the view depth."
    }
  ],

  introduction: {
    title: "What is a JSON Viewer?",
    content: `A JSON Viewer is an interactive tool that renders JSON data as a navigable tree structure, making it easy to explore complex nested documents that would be difficult to read as raw text. Instead of scrolling through hundreds of lines of formatted JSON, a tree view lets you expand only the sections you care about.

### Why Use a Tree View?

Raw JSON, even when formatted, becomes unwieldy for documents with deep nesting (5+ levels), large arrays (100+ items), or many keys. A tree view provides:

- **Selective Expansion:** Open only the branches you need, keeping the rest collapsed
- **Visual Type Indicators:** Instantly identify strings, numbers, booleans, arrays, and objects by color
- **Structure Overview:** See array lengths and object key counts at a glance without expanding
- **Path Discovery:** Click any node to get its full path in dot notation, perfect for code references

### Common Use Cases

- **API Response Exploration:** Navigate complex API responses to understand data structures and find specific fields
- **Configuration Inspection:** Explore large config files (Kubernetes manifests, Terraform state) without getting lost in the nesting
- **Data Analysis:** Understand the shape of database exports, log entries, or event payloads
- **Documentation:** Discover available fields and their types when working with undocumented APIs`
  },

  useCases: [
    {
      title: "API Response Navigation",
      description: "Explore deeply nested API responses interactively. Expand only the sections you need, copy field paths for code references, and understand the response structure without reading raw text.",
      example: `// Navigate: response.data.users[0].profile.settings
// Click to copy the exact path for your code`
    },
    {
      title: "Configuration File Exploration",
      description: "Navigate large configuration files like Kubernetes manifests, Terraform state, or complex package.json files. See the structure at a glance and drill down to specific settings.",
      example: `// Explore: k8s deployment spec
// Find: spec.template.spec.containers[0].env`
    },
    {
      title: "Data Structure Analysis",
      description: "Analyze the shape of JSON data from database exports, webhook payloads, or third-party APIs. See type breakdowns, nesting depth, and total key counts to understand data complexity.",
      example: `// Stats: 47 keys, max depth 6, 12 strings, 8 numbers
// Identify: data shape for TypeScript interfaces`
    },
    {
      title: "Debug & Troubleshoot",
      description: "When debugging issues with JSON data, use search to find specific keys or values, and the breadcrumb trail to understand where in the structure a problematic value lives.",
      example: `// Search: "error" or "null"
// Find: all error fields or unexpected null values`
    }
  ],

  howToUse: {
    title: "How to Use JSON Viewer",
    content: `This JSON viewer renders your data as an interactive tree entirely in your browser. No data is uploaded — all parsing and rendering happens client-side.

### Tree View Features

**Expand/Collapse Nodes:** Click the arrow (▶/▼) next to any object or array to expand or collapse it. Use "Expand All" and "Collapse All" buttons for bulk operations, or "Collapse to Level N" for controlled depth viewing.

**Color-Coded Types:** Each value type has a distinct color for instant recognition:
- 🟢 **Green:** Strings
- 🔵 **Blue:** Numbers
- 🟠 **Orange:** Booleans
- ⚫ **Gray:** Null values
- 🟣 **Purple:** Arrays (with item count)
- 🔷 **Cyan:** Objects (with key count)

**Copy Path & Values:** Click any key name to copy its full dot-notation path (e.g., \`data.users[0].name\`). Click any value to copy just the value. Perfect for referencing fields in code.

**Search:** Type in the search bar to filter and highlight nodes matching your query. Searches both keys and values, making it easy to find specific fields in large documents.

**Breadcrumb Trail:** As you navigate deep into the tree, the breadcrumb shows your current path, helping you maintain context in deeply nested structures.

### Keyboard Shortcuts

- **Cmd/Ctrl+Enter:** Parse and render JSON
- **Cmd/Ctrl+K:** Clear all
- **Cmd/Ctrl+L:** Load sample data`,
    steps: [
      {
        name: "Input Your JSON",
        text: "Paste JSON into the input panel or drag and drop a .json file. The viewer accepts any valid JSON document."
      },
      {
        name: "Explore the Tree",
        text: "Click arrows to expand/collapse nodes. Use Expand All or Collapse to Level controls for bulk navigation."
      },
      {
        name: "Search and Find",
        text: "Use the search bar to filter nodes by key name or value. Matching nodes are highlighted in the tree."
      },
      {
        name: "Copy Paths and Values",
        text: "Click any key to copy its dot-notation path, or click a value to copy it. Use for code references or debugging."
      }
    ]
  },

  faqs: [
    {
      question: "How large of a JSON file can I view?",
      answer: "The viewer handles JSON files up to 10-20MB depending on your browser and device. Since all rendering happens client-side, very large documents with thousands of nodes may render slower on mobile devices. For optimal performance, the tree lazily renders only visible nodes. Most API responses and config files (under 1MB) render instantly."
    },
    {
      question: "Can I upload a file instead of pasting?",
      answer: "Yes, you can drag and drop a .json file directly onto the input area, or click the upload button to select a file from your device. The file is read entirely in your browser — nothing is uploaded to any server."
    },
    {
      question: "What does the dot-notation path look like?",
      answer: "When you click a key in the tree, the tool copies the full path using dot notation and bracket notation for arrays. For example: data.users[0].profile.name or config.database.connections[2].host. This path can be used directly in JavaScript (obj.data.users[0].profile.name) or as a reference for documentation."
    },
    {
      question: "Can I search for values, not just keys?",
      answer: "Yes, the search bar matches both key names and values. Type a search term and the viewer highlights all nodes where either the key or the value contains your search text. This is useful for finding specific values like error codes, user IDs, or configuration values in large documents."
    },
    {
      question: "Is my JSON data private?",
      answer: "Yes, 100%. All parsing and rendering happens in your browser using client-side JavaScript. Your JSON data never leaves your device. No server uploads, no storage, no analytics on content. Safe for sensitive API responses, credentials, or proprietary data."
    },
    {
      question: "What types of JSON values are color-coded?",
      answer: "The viewer uses distinct colors for each JSON type: strings are green, numbers are blue, booleans are orange, null values are gray, arrays are purple (showing item count), and objects are cyan (showing key count). This makes it easy to spot type inconsistencies or understand data structure at a glance."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your JSON data never leaves your browser. All parsing, tree rendering, and searching happens entirely client-side.

### Privacy Guarantees

- **100% Client-Side:** JSON.parse() and tree rendering run in your browser's JavaScript engine. Zero server involvement.
- **No Uploads:** Your JSON file or pasted data is never transmitted to any server.
- **No Storage:** Nothing is saved, cached, or logged. Close the tab and your data is gone.
- **File Reading:** Drag-and-drop files are read using the browser's FileReader API locally on your device.

Safe for exploring sensitive API responses, database exports, configuration files with credentials, or any proprietary JSON data.`
  },

  stats: {
    "Max File Size": "~20MB",
    "Nesting Depth": "Unlimited",
    "Data Uploaded": "0 bytes",
    "Value Types": "6 color-coded",
    "Search": "Keys & Values"
  }
};
