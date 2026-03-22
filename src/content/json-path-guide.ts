/**
 * JSONPath Explorer Tool Guide Content
 * Comprehensive developer guide for JSONPath querying and navigation
 */

import type { ToolGuideContent } from "./types";

export const jsonPathGuideContent: ToolGuideContent = {
  toolName: "JSONPath Explorer",
  toolPath: "/json-path",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste JSON Data",
      description: "Input JSON object or array from API responses, configuration files, or data exports. Tool parses and validates JSON showing tree structure. Supports nested objects, arrays, and complex data hierarchies."
    },
    {
      title: "Navigate Tree Structure",
      description: "Click through interactive JSON tree expanding objects and arrays. Visual hierarchy shows data organization. Hover over nodes seeing paths and values. Search functionality finds keys or values instantly."
    },
    {
      title: "Copy JSONPath or Value",
      description: "Click any node copying its JSONPath expression ($.path.to.data) or actual value. Choose path format: dot notation (data.user.name), bracket notation ([\"data\"][\"user\"]), or JSONPath syntax ($..name)."
    },
    {
      title: "Use in Code or Queries",
      description: "Paste copied paths into data processing scripts, API queries, or jq commands. JSONPath expressions extract specific data from complex nested structures without manual traversal."
    }
  ],

  introduction: {
    title: "What is JSONPath?",
    content: `JSONPath is query language for JSON data enabling precise extraction of values from complex nested structures. Similar to XPath for XML, JSONPath uses path expressions ($.store.book[0].title) referencing specific locations in JSON documents. Instead of manually traversing objects and arrays with multiple bracket/dot accesses, JSONPath provides declarative syntax selecting data by pattern matching.

Modern applications process JSON everywhere - API responses, configuration files, database documents, log data. Extracting specific values from deeply nested JSON is tedious and error-prone. JSONPath expressions describe what data you want, not how to get it. Tools use JSONPath specifications querying data without custom traversal code.

### Why Developers Use JSONPath

**API Response Parsing:** REST APIs return nested JSON responses. Extracting specific fields requires knowing exact path. Instead of writing \`response.data.users[0].profile.email\`, use JSONPath \`$.data.users[0].profile.email\` in queries or \`jq\` commands. JSONPath expressions transfer between tools - same expression works in JavaScript libraries, command-line jq, or API testing tools.

**Configuration File Querying:** Application config, CI/CD pipelines, or Kubernetes manifests use JSON/YAML. Finding specific configuration values in large files requires precise paths. JSONPath expressions locate settings without manually searching nested structures. Automated scripts query config files extracting values for validation or deployment.

**Data Transformation and ETL:** Extract-Transform-Load pipelines process JSON from APIs, databases, or file imports. JSONPath expressions select source data fields for transformation. Map API response fields to database columns using JSONPath describing source locations. Declarative data mapping versus imperative code traversal.

**Log Analysis and Debugging:** Structured logs output JSON events. Analyzing logs requires filtering and extracting specific fields. JSONPath queries select error messages, timestamps, or user IDs from log entries. Command-line tools (jq) use JSONPath-like syntax filtering JSON log streams in real-time.

**Testing and Assertions:** API integration tests verify response structure and values. JSONPath expressions assert specific fields exist and contain expected values. Test frameworks use JSONPath selecting elements for validation: \`expect(jsonpath.query(response, '$.data.status')).toBe('success')\`.

### JSONPath Syntax Fundamentals

**Root Object ($):** Every JSONPath expression starts with \`$\` representing entire JSON document. \`$\` alone selects root object/array. All paths relative to root.

**Dot Notation (.):** \`$.store.book\` accesses nested object properties. Dot separates keys traversing object hierarchy. Clean syntax for simple paths without special characters.

**Bracket Notation ([]):** \`$['store']['book']\` accesses properties using bracket syntax. Required for keys with spaces, special characters, or starting with numbers. Equivalent to dot notation for standard keys.

**Array Access ([index]):** \`$.store.book[0]\` selects first array element (zero-indexed). \`$.store.book[2]\` selects third element. Negative indices access from end: \`[-1]\` selects last element.

**Wildcard (*):** \`$.store.book[*].title\` selects all titles from every book in array. Wildcard matches any key/index returning array of matching values.

**Recursive Descent (..):** \`$..author\` finds all author fields anywhere in document regardless of nesting depth. Searches entire tree recursively returning array of matches. Powerful for unknown structures.

**Array Slicing ([start:end]):** \`$.store.book[0:2]\` selects elements 0 and 1 (end exclusive). \`[1:]\` selects from index 1 to end. \`[:3]\` selects first three elements. Python-like slice syntax.

**Filter Expressions ([?(...)]):** \`$.store.book[?(@.price < 10)]\` filters array elements matching condition. \`@\` represents current element in filter. Supports comparisons (<, >, ==, !=) and logical operators (&&, ||).

### JSONPath vs Object Notation

**JavaScript Object Access:** \`data.users[0].name\` is code executed in JavaScript. Requires language runtime. Breaks if path doesn't exist (undefined errors).

**JSONPath Expression:** \`$.users[0].name\` is declarative query string. Language-agnostic - works in JavaScript, Python, Go, jq, or any JSONPath library. Returns null/empty for missing paths instead of errors. Transferable between tools and platforms.

**Use Cases:** Object notation for one-time access in code. JSONPath for configurable queries, dynamic data extraction, cross-platform data processing, or user-defined path specifications.

This tool provides interactive JSON tree visualization with instant path generation. Click any node copying JSONPath expression or value. Search finds keys/values in complex documents. Supports multiple path formats (dot, bracket, JSONPath). All processing client-side - your JSON data stays private.

### Advanced JSONPath Features and Patterns

**Multiple Results:** Wildcard and recursive descent return arrays. \`$..price\` might return \`[9.99, 12.99, 8.99]\` finding all price fields. Filter expressions return arrays of matching objects. Handle multiple results in processing code.

**Combining Operators:** \`$..book[?(@.price < 10)].title\` combines recursive descent, filtering, and property access. Find all book titles where price under 10, anywhere in document. Complex queries built composing operators.

**Existence Checks:** \`$..author\` returns empty array if no author fields exist. Check result length validating field existence in dynamic structures.

**Comparison with jq:** Command-line tool jq uses JSONPath-like syntax with extensions. jq expressions often translate directly to JSONPath. \`jq '.users[0].name'\` = JSONPath \`$.users[0].name\`. Learning JSONPath helps understand jq queries.`
  },

  useCases: [
    {
      title: "Extract API Response Data with jq",
      description: "Command-line API testing uses jq parsing JSON responses. JSONPath expressions translate to jq syntax selecting specific fields from complex API responses. Visual JSONPath explorer helps construct correct paths for jq commands.",
      example: `# API returns nested user data
curl https://api.example.com/users/123 | jq

# Response (simplified):
{
  "data": {
    "user": {
      "id": 123,
      "profile": {
        "name": "Alex Developer",
        "email": "alex@example.com",
        "roles": ["admin", "developer"]
      },
      "settings": {
        "theme": "dark",
        "notifications": true
      }
    }
  }
}

# Extract email using JSONPath → jq syntax
# JSONPath: $.data.user.profile.email
# jq: '.data.user.profile.email'
curl https://api.example.com/users/123 | jq '.data.user.profile.email'
# Output: "alex@example.com"

# Extract all roles (array)
# JSONPath: $.data.user.profile.roles[*]
# jq: '.data.user.profile.roles[]'
curl https://api.example.com/users/123 | jq '.data.user.profile.roles[]'
# Output: "admin"
#         "developer"

# Extract first role
# JSONPath: $.data.user.profile.roles[0]
# jq: '.data.user.profile.roles[0]'
curl https://api.example.com/users/123 | jq '.data.user.profile.roles[0]'
# Output: "admin"

# Use JSONPath explorer to find correct paths
# Paste API response, click fields, copy JSONPath
# Convert to jq syntax for command-line use`
    },
    {
      title: "Query Kubernetes Configuration with kubectl",
      description: "Kubernetes manifests and live resources output JSON. kubectl supports JSONPath extracting specific fields from complex resource definitions. Use JSONPath explorer finding paths in example resources, then query production clusters.",
      example: `# Get pod status using JSONPath
# First, inspect pod JSON structure
kubectl get pod my-pod -o json > pod.json

# Paste into JSONPath explorer finding paths:
# Pod status: $.status.phase
# Container image: $.spec.containers[0].image
# Node name: $.spec.nodeName

# Query live pod with JSONPath
kubectl get pod my-pod -o jsonpath='{.status.phase}'
# Output: Running

# Get all container images in pod
kubectl get pod my-pod -o jsonpath='{.spec.containers[*].image}'
# Output: nginx:1.21 sidecar:latest

# Get pod IPs from all pods
kubectl get pods -o jsonpath='{.items[*].status.podIP}'
# Output: 10.0.1.5 10.0.1.6 10.0.1.7

# Complex query: pod name + status
kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.status.phase}{"\\n"}{end}'
# Output:
# pod-1 Running
# pod-2 Pending
# pod-3 Failed

# JSONPath explorer helps construct these queries
# Explore example resource, find paths, use in kubectl`
    },
    {
      title: "Build Dynamic Data Transformations",
      description: "ETL pipelines transform JSON from source APIs to target database format. JSONPath expressions map source fields to destination without hardcoded traversal. Config-driven transformations using JSONPath specifications.",
      example: `// Data transformation config using JSONPath
const transformConfig = {
  mappings: [
    {
      source: "$.data.user.profile.email",
      destination: "email",
      type: "string"
    },
    {
      source: "$.data.user.profile.name",
      destination: "full_name",
      type: "string"
    },
    {
      source: "$.data.user.settings.theme",
      destination: "preferences.theme",
      type: "string"
    },
    {
      source: "$.data.user.profile.roles[0]",
      destination: "primary_role",
      type: "string"
    }
  ]
};

// Generic transformer using JSONPath
import jsonpath from 'jsonpath';

function transformData(sourceJSON, config) {
  const result = {};

  config.mappings.forEach(mapping => {
    // Extract value using JSONPath
    const values = jsonpath.query(
      sourceJSON,
      mapping.source
    );

    if (values.length > 0) {
      // Set destination field
      setNestedValue(
        result,
        mapping.destination,
        values[0]
      );
    }
  });

  return result;
}

// Example source data (API response)
const apiResponse = {
  data: {
    user: {
      profile: {
        name: "Alex Developer",
        email: "alex@example.com",
        roles: ["admin", "developer"]
      },
      settings: { theme: "dark" }
    }
  }
};

const transformed = transformData(apiResponse, transformConfig);
// Output:
// {
//   email: "alex@example.com",
//   full_name: "Alex Developer",
//   preferences: { theme: "dark" },
//   primary_role: "admin"
// }

// Config-driven transformation
// Change mappings without modifying code
// JSONPath explorer helps define source paths`
    },
    {
      title: "Validate API Response Structure in Tests",
      description: "Integration tests verify API responses contain expected fields and values. JSONPath expressions select data for assertions checking structure, types, and content. Clean test syntax using declarative path specifications.",
      example: `// Jest/Mocha API integration test with JSONPath
import jsonpath from 'jsonpath';
import { expect } from 'chai';

describe('User API Tests', () => {
  let response;

  beforeEach(async () => {
    response = await fetch('/api/users/123').then(r => r.json());
  });

  it('should return user email', () => {
    const email = jsonpath.query(
      response,
      '$.data.user.profile.email'
    )[0];

    expect(email).to.equal('alex@example.com');
  });

  it('should return admin role', () => {
    const roles = jsonpath.query(
      response,
      '$.data.user.profile.roles[*]'
    );

    expect(roles).to.include('admin');
  });

  it('should have valid theme setting', () => {
    const theme = jsonpath.query(
      response,
      '$.data.user.settings.theme'
    )[0];

    expect(['light', 'dark', 'auto']).to.include(theme);
  });

  it('should have all required fields', () => {
    const requiredPaths = [
      '$.data.user.id',
      '$.data.user.profile.name',
      '$.data.user.profile.email',
      '$.data.user.settings'
    ];

    requiredPaths.forEach(path => {
      const result = jsonpath.query(response, path);
      expect(result.length).to.be.greaterThan(0,
        \`Missing required field: \${path}\`
      );
    });
  });
});

// JSONPath makes tests declarative and readable
// Easily verify deeply nested response structure
// Use JSONPath explorer to find test assertion paths`
    }
  ],

  howToUse: {
    title: "How to Use the JSONPath Explorer",
    content: `This tool provides interactive JSON tree visualization with instant JSONPath generation. Navigate complex JSON structures visually, copy paths for use in code, queries, or data transformations.

### Loading JSON Data

Paste JSON into input field or upload JSON file. Tool validates and parses JSON showing error messages for invalid syntax. Supports objects, arrays, and deeply nested structures. Large JSON files (megabytes) may slow browser - consider extracting relevant sections first.

After parsing, interactive tree displays JSON structure. Objects show expandable key-value pairs. Arrays show indexed elements. Nested structures indent showing hierarchy. Syntax highlighting colors different value types (strings, numbers, booleans, null).

### Navigating JSON Tree

Click expand/collapse icons opening nested objects and arrays. Nested structures show indentation levels. Hover over nodes highlighting current path and showing value preview. Search box filters tree showing only matching keys or values - useful for finding specific fields in large documents.

Tree view shows value types: objects {}, arrays [], strings "text", numbers 123, booleans true/false, null. Type indicators help understand data structure at glance. Click any node selecting it, highlighting path from root.

### Copying Paths and Values

Click node displaying actions: copy path, copy value. Path copies JSONPath expression for selected node. Value copies actual data (formatted JSON for objects/arrays, plain values for primitives).

Choose path format from dropdown:

**Dot Notation:** \`data.user.profile.name\` - JavaScript object access syntax. Clean for code. Requires valid identifier keys (no spaces/special chars).

**Bracket Notation:** \`["data"]["user"]["profile"]["name"]\` - Handles any key including spaces and special characters. Always safe but verbose.

**JSONPath:** \`$.data.user.profile.name\` - Standard JSONPath syntax with \`$\` root. Use in jq, JSONPath libraries, or query tools. Most portable across platforms.

### Search and Filter

Type in search box filtering tree to matching nodes. Search finds keys (property names) or values (string content, numbers). Large JSON documents with hundreds of fields become manageable - search finds specific data instantly.

Search highlights matches in tree. Click search result jumping to that location. Clear search showing full tree again. Case-insensitive search matches partial strings.

### Practical Workflows

**API Development:** Paste API response, explore structure, copy paths for documentation or code. Verify response schema by inspecting all nested fields.

**jq Command Building:** Paste JSON sample, find target field in tree, copy JSONPath, convert to jq syntax (remove \`$\`, wrap in quotes). Test jq command on sample before using in pipeline.

**Config File Navigation:** Load large configuration JSON, search for specific setting, copy path for modification scripts or documentation.

**Data Validation:** Upload JSON data, visually inspect structure checking all required fields exist, verify value types match expectations.`,
    steps: [
      {
        name: "Load JSON",
        text: "Paste JSON object or array into input field. Tool validates and parses data showing error messages for invalid syntax. Supports nested structures of any depth."
      },
      {
        name: "Explore Tree",
        text: "Click expand/collapse icons navigating nested objects and arrays. Hover showing paths and values. Search filters tree finding specific keys or values instantly."
      },
      {
        name: "Copy Paths",
        text: "Click any node copying JSONPath expression or actual value. Choose path format: dot notation (data.user.name), bracket notation, or JSONPath syntax ($.data.user.name)."
      },
      {
        name: "Use in Code",
        text: "Paste copied paths into jq commands, API tests, data transformations, or documentation. JSONPath expressions work across languages and tools for data extraction."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between JSONPath and regular object notation?",
      answer: "Regular object notation (data.user.name) is JavaScript code executed at runtime. JSONPath ($.data.user.name) is declarative query string describing data location. JSONPath is language-agnostic working in Python, Go, jq, or any JSONPath library. It's configurable - store path as string, execute dynamically. Object notation is hardcoded. JSONPath returns null/empty for missing paths instead of throwing errors. Use JSONPath for cross-platform queries, dynamic data extraction, or user-defined paths."
    },
    {
      question: "How do I convert JSONPath to jq syntax?",
      answer: "JSONPath and jq are similar with slight syntax differences. Remove leading $ from JSONPath, wrap in quotes for jq. JSONPath: $.data.user.name → jq: '.data.user.name'. Array wildcards: JSONPath $[*] → jq .[] (no brackets). Filters similar but jq more powerful. JSONPath: $[?(@.price < 10)] → jq: .[] | select(.price < 10). Most basic JSONPath expressions translate directly. Complex queries may need jq-specific syntax."
    },
    {
      question: "Can JSONPath query arrays and filter results?",
      answer: "Yes. Array access: $.books[0] gets first element. Wildcards: $.books[*].title gets all titles. Slicing: $.books[0:3] gets first three books. Filters: $.books[?(@.price < 10)] selects books under $10. Recursive search: $..author finds all author fields regardless of nesting. Filter expressions use @ for current item, support comparisons (<, >, ==) and logical operators (&&, ||). Some JSONPath libraries have limited filter support - check documentation."
    },
    {
      question: "Why does my JSONPath return an array instead of single value?",
      answer: "Wildcards (*), recursive descent (..), filters, and array slices return arrays of matches even if only one result. $.books[*].title returns array of titles, not single title. To get single value, use specific index: $.books[0].title. Or extract first element from result array in code: jsonpath.query(data, path)[0]. JSONPath assumes multiple matches by design - arrays are default return type."
    },
    {
      question: "How do I handle JSONPath with keys containing spaces or special characters?",
      answer: "Use bracket notation for keys with spaces or special chars. Dot notation fails: $.user data.email (invalid). Bracket notation works: $['user data']['email'] or $['user-name']. Always quote keys in brackets. Some JSONPath libraries auto-quote, others require explicit quotes. Tool shows correct syntax when copying paths with special characters. For code, test path with actual keys before deploying."
    },
    {
      question: "What JSONPath libraries should I use in my code?",
      answer: "JavaScript: 'jsonpath' npm package (most popular). Python: jsonpath-ng (modern) or jsonpath-rw (older). Go: github.com/oliveagle/jsonpath. Java: com.jayway.jsonpath. PHP: Flow\\JSONPath. Command-line: jq (not pure JSONPath but similar). Choose actively maintained libraries with good documentation. Test library against your queries - JSONPath specs vary slightly between implementations. Some support full filtering, others basic queries only."
    },
    {
      question: "Can I use JSONPath with YAML or other formats?",
      answer: "JSONPath is JSON-specific, but YAML converts to JSON easily. Parse YAML to JSON object first, then apply JSONPath. Most YAML libraries (js-yaml, PyYAML) convert YAML to JSON in memory. For command-line: yq tool (jq for YAML) uses jq-like syntax working similarly to JSONPath. Other formats (XML, CSV) need conversion to JSON before JSONPath queries work. JSONPath assumes JavaScript object/array structure."
    },
    {
      question: "How do I debug JSONPath expressions that don't return expected results?",
      answer: "Use this interactive tool: paste JSON, try path incrementally. Start simple ($ for root), add one level at time ($.data, $.data.users, $.data.users[0]). Check each level returns expected data. Use wildcards ($..key) finding all occurrences - helps when unsure of exact structure. Inspect actual JSON structure - nested deeper than expected, different key names, unexpected arrays. Test with minimal example isolating problem."
    },
    {
      question: "Is JSONPath case-sensitive?",
      answer: "Yes, JSONPath is case-sensitive matching JSON key names exactly. $.user.Name and $.user.name are different paths. JSON keys themselves are case-sensitive. Some query tools offer case-insensitive extensions but standard JSONPath is strict. Verify exact key capitalization by inspecting actual JSON. Use this tool's search (case-insensitive) finding keys, then use exact spelling in JSONPath."
    },
    {
      question: "Is my JSON data private when using this explorer?",
      answer: "Absolutely. All JSON parsing, tree rendering, and path generation happen entirely in your browser using JavaScript. Your JSON never uploads to servers. No network requests are made with your data. Verify by checking browser DevTools Network tab showing zero outbound requests. Safe for exploring confidential API responses, proprietary configuration files, sensitive database exports, or any private JSON. Tool works completely offline after page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your JSON data never leaves your browser. This JSONPath explorer operates entirely client-side using JavaScript JSON parsing and tree rendering. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All JSON parsing, tree visualization, and path generation happen in your browser using native JSON.parse() and DOM manipulation. Your data stays on your device.
- **No Server Communication:** We don't have backend services processing JSON. The tool works completely offline after initial page load.
- **No Data Storage:** Your JSON input and generated paths are not saved, logged, or transmitted anywhere. Refresh the page and it's gone.
- **No Content Tracking:** We don't track what you explore, data structure, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your JSON.

Safe for exploring confidential API responses, proprietary configuration files, sensitive database exports, customer data samples, or any private JSON requiring path extraction without privacy concerns.`
  },

  stats: {
    "Path Formats": "3",
    "Max Depth": "Unlimited",
    "Processing": "Client-side",
    "Search": "Full-text",
    "Data Upload": "0 bytes"
  }
};
