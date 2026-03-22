/**
 * JSON to YAML Converter Tool Guide Content
 * Comprehensive developer guide for JSON to YAML conversion
 */

import type { ToolGuideContent } from "./types";

export const jsonYamlGuideContent: ToolGuideContent = {
  toolName: "JSON to YAML Converter",
  toolPath: "/json-yaml",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your JSON Data",
      description: "Copy JSON from API responses, config files, or package manifests and paste into the input field. Supports nested objects, arrays, and all JSON data types."
    },
    {
      title: "Configure Indentation",
      description: "Choose 2-space or 4-space indentation for YAML output. 2 spaces is the YAML standard and most common in modern configs. 4 spaces improves readability for deeply nested structures."
    },
    {
      title: "View YAML Output",
      description: "See your JSON instantly converted to clean, human-readable YAML format. The converter preserves data structure, handles special characters, and uses YAML's minimal syntax."
    },
    {
      title: "Copy or Download Result",
      description: "Click Copy to grab YAML for pasting into config files, or Download as .yaml/.yml file for use in Docker Compose, GitHub Actions, Kubernetes, or CI/CD pipelines."
    }
  ],

  introduction: {
    title: "What is JSON to YAML Conversion?",
    content: `JSON to YAML conversion transforms structured data from JavaScript Object Notation format into YAML (YAML Ain't Markup Language) format, converting machine-focused syntax into human-readable configuration. YAML is the dominant format for modern DevOps tools, CI/CD pipelines, and infrastructure-as-code, while JSON remains the standard for APIs and JavaScript applications.

JSON uses curly braces, brackets, and quoted keys optimized for programmatic parsing. YAML uses indentation, colons, and minimal punctuation optimized for human reading and editing. The same data structure requires significantly fewer characters in YAML - no quotes around keys, no commas between items, no closing braces. This makes YAML ideal for configuration files that humans edit frequently.

### Why Convert JSON to YAML?

Modern DevOps tools prefer YAML: Docker Compose (docker-compose.yml), Kubernetes (deployment.yaml), GitHub Actions (.github/workflows/*.yml), CI/CD configs (GitLab CI, CircleCI, Travis), Ansible playbooks, and configuration management tools. When you have JSON data or configuration that needs to work with these tools, conversion to YAML is essential.

Developers working across frontend (JSON APIs) and backend infrastructure (YAML configs) constantly convert between formats. Export database configs from JSON-based tools to YAML for Docker Compose. Convert API response schemas to YAML for OpenAPI documentation. Transform package manifests from JSON to YAML for alternative build tools.

### JSON vs YAML: Syntax Comparison

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

**YAML:**
\`\`\`yaml
database:
  host: localhost
  port: 5432
  credentials:
    username: admin
    password: secret
\`\`\`

YAML is 30% shorter, requires no quotes (unless special chars), no commas, and uses indentation for structure instead of braces. Human eyes parse YAML faster than JSON for configuration review.

### YAML Advantages for Configuration

**Human readability:** No visual noise from brackets, braces, quotes, and commas. Indentation mirrors mental hierarchy naturally.

**Comments support:** YAML allows \`# comments\` which JSON doesn't support. Essential for documenting configuration decisions, TODOs, and environment-specific notes.

**Multiline strings:** YAML supports multiline text with \`|\` (preserve newlines) or \`>\` (fold newlines) making it perfect for embedded scripts, SQL queries, or documentation.

**Implicit types:** YAML auto-detects booleans (true/false), numbers, nulls without quotes. JSON requires strict quoting rules.

**Anchors and aliases:** YAML supports reusable blocks with \`&anchor\` and \`*alias\` syntax to avoid duplication in large configs.

### When to Use JSON vs YAML

**Use JSON for:** API data exchange, browser JavaScript, strict parsing requirements, machine-to-machine communication, performance-critical parsing (JSON parsers are faster), embedded in code.

**Use YAML for:** Configuration files, Docker Compose, Kubernetes manifests, CI/CD pipelines, infrastructure-as-code, human-edited files, documentation-heavy configs.

This tool converts JSON to clean, idiomatic YAML following best practices: minimal quoting, consistent indentation, and preserving data types. All processing happens client-side - your configuration data never leaves your browser.`
  },

  useCases: [
    {
      title: "Convert Database Config for Docker Compose",
      description: "Transform JSON database configuration into YAML format for docker-compose.yml files. Docker Compose exclusively uses YAML for service definitions, environment variables, and volume configurations.",
      example: `// JSON config from application:
{
  "services": {
    "postgres": {
      "image": "postgres:15-alpine",
      "environment": {
        "POSTGRES_DB": "myapp",
        "POSTGRES_USER": "admin",
        "POSTGRES_PASSWORD": "secret123"
      },
      "ports": ["5432:5432"],
      "volumes": ["./data:/var/lib/postgresql/data"]
    }
  }
}

// Convert to YAML for docker-compose.yml:
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    ports:
      - "5432:5432"
    volumes:
      - ./data:/var/lib/postgresql/data`
    },
    {
      title: "Create Kubernetes Manifests from JSON",
      description: "Convert JSON service definitions or deployment configs into Kubernetes YAML manifests. Kubernetes requires YAML for deployments, services, config maps, and ingress definitions.",
      example: `// JSON deployment config:
{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "web-app",
    "labels": { "app": "web" }
  },
  "spec": {
    "replicas": 3,
    "selector": { "matchLabels": { "app": "web" } },
    "template": {
      "metadata": { "labels": { "app": "web" } },
      "spec": {
        "containers": [{
          "name": "app",
          "image": "myapp:1.0",
          "ports": [{ "containerPort": 8080 }]
        }]
      }
    }
  }
}

// Convert to deployment.yaml:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: app
          image: myapp:1.0
          ports:
            - containerPort: 8080`
    },
    {
      title: "Build GitHub Actions Workflows from JSON",
      description: "Convert JSON-based CI/CD configuration into GitHub Actions workflow YAML files. GitHub Actions requires .github/workflows/*.yml for pipeline definitions.",
      example: `// JSON workflow config:
{
  "name": "CI",
  "on": {
    "push": { "branches": ["main"] },
    "pull_request": { "branches": ["main"] }
  },
  "jobs": {
    "test": {
      "runs-on": "ubuntu-latest",
      "steps": [
        { "uses": "actions/checkout@v3" },
        { "name": "Install deps", "run": "npm install" },
        { "name": "Run tests", "run": "npm test" }
      ]
    }
  }
}

// Convert to .github/workflows/ci.yml:
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install deps
        run: npm install
      - name: Run tests
        run: npm test`
    },
    {
      title: "Generate OpenAPI Specs from JSON Schemas",
      description: "Convert JSON Schema or API definitions to OpenAPI/Swagger YAML format. OpenAPI documentation and API gateways prefer YAML for readability and comments support.",
      example: `// JSON API schema:
{
  "openapi": "3.0.0",
  "info": {
    "title": "User API",
    "version": "1.0.0"
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "List users",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/User" }
                }
              }
            }
          }
        }
      }
    }
  }
}

// Convert to openapi.yaml (more readable):
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'`
    }
  ],

  howToUse: {
    title: "How to Use This JSON to YAML Converter",
    content: `This tool provides instant JSON to YAML conversion with automatic syntax transformation, type preservation, and clean formatting. All processing happens client-side using JavaScript YAML libraries - no server uploads.

### Converting JSON to YAML

Paste valid JSON into the input field. The tool accepts objects, arrays, nested structures, and all JSON data types (strings, numbers, booleans, null). Invalid JSON triggers error messages indicating syntax issues to fix before conversion.

### Indentation Options

Choose 2-space indentation (YAML standard, most common) or 4-space indentation (better readability for deeply nested configs). Most YAML parsers accept both, but 2 spaces is the convention for Docker, Kubernetes, and CI/CD configs.

### Handling Special Characters

YAML automatically quotes strings containing special characters (colons, hashes, brackets, quotes) to prevent parsing ambiguity. Simple strings don't need quotes. Numbers, booleans (true/false), and null convert without quotes.

### Multiline Strings

Long strings in JSON convert to YAML's literal block style (\`|\`) when containing newlines, preserving formatting. Single-line strings remain inline. This makes YAML configs more readable for embedded scripts or documentation.

### Array Formatting

JSON arrays \`["a", "b", "c"]\` convert to YAML's dash syntax:
\`\`\`yaml
- a
- b
- c
\`\`\`

Inline YAML arrays \`[a, b, c]\` are also valid but less common. The converter uses block style for better readability.

### Type Preservation

JSON strings "true", "false", "null" convert to YAML with quotes to preserve string type. Without quotes, YAML parsers interpret them as booleans/null. Numbers in JSON remain unquoted numbers in YAML.`,
    steps: [
      {
        name: "Paste JSON",
        text: "Copy JSON from API responses, config files, or package manifests. Must be valid JSON syntax."
      },
      {
        name: "Select Indentation",
        text: "Choose 2 spaces (standard) or 4 spaces (readable). Match your project's YAML convention if applicable."
      },
      {
        name: "Review YAML",
        text: "Check converted YAML for correctness. Tool preserves structure and types, handling special characters automatically."
      },
      {
        name: "Copy or Download",
        text: "Copy to clipboard or download as .yaml file for use in Docker, Kubernetes, CI/CD pipelines, or config files."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between JSON and YAML?",
      answer: "JSON uses braces {}, brackets [], and quotes for structure with strict syntax. YAML uses indentation and colons with minimal punctuation for human readability. JSON requires quotes around all keys and string values. YAML only quotes when necessary. JSON has no comments. YAML supports # comments. Both represent same data structures (objects, arrays, primitives) but YAML is designed for human-edited configuration while JSON is optimized for machine parsing and APIs."
    },
    {
      question: "Can I convert YAML back to JSON?",
      answer: "Yes, YAML is a superset of JSON - any valid JSON is valid YAML, but not vice versa. YAML supports features JSON doesn't (comments, anchors, multiline strings). When converting YAML to JSON, comments are lost and multiline strings become escaped strings. Use our YAML to JSON converter for reverse conversion, but be aware of feature loss."
    },
    {
      question: "Why do some strings have quotes in YAML output?",
      answer: "YAML automatically quotes strings containing special characters that could be misinterpreted: colons (:), hashes (#), brackets ([], {}), quotes, or strings that look like numbers/booleans. For example, 'true' is quoted to preserve it as string, not boolean. '10:30' is quoted to prevent parsing as nested object. Simple alphanumeric strings don't need quotes."
    },
    {
      question: "How does YAML handle indentation?",
      answer: "YAML uses indentation (spaces, never tabs) to represent nesting and structure. Consistent indentation is critical - mixing 2-space and 4-space indentation within a file causes parsing errors. This tool outputs consistent indentation (your choice of 2 or 4 spaces). Never use tabs in YAML - tabs are invalid and cause parser failures."
    },
    {
      question: "Can JSON comments be preserved in YAML?",
      answer: "JSON doesn't support comments (they're technically invalid JSON, though some parsers allow them). If your JSON has comments (non-standard), they'll be lost during parsing. YAML fully supports comments with # syntax. After conversion, manually add comments to YAML where needed for documentation."
    },
    {
      question: "What are YAML anchors and how do I use them?",
      answer: "YAML anchors (&anchor) define reusable blocks, and aliases (*anchor) reference them, reducing duplication. This tool converts JSON to basic YAML without creating anchors. To use anchors, manually edit YAML: define a block with &name, then reference with *name. Example: database: &db-config (host: localhost), then production: <<: *db-config to reuse."
    },
    {
      question: "How do I handle Docker Compose multi-line commands?",
      answer: "Use YAML's literal block scalar (|) for multiline scripts preserving newlines, or folded block scalar (>) for long text folding newlines to spaces. This tool converts JSON strings to YAML, but you can manually switch to block scalars. Example: command: | to start multiline command, then indent each line. Preserves newlines for shell scripts."
    },
    {
      question: "Will this work for Kubernetes manifests?",
      answer: "Yes, Kubernetes manifests are YAML files representing resources (Deployments, Services, ConfigMaps). Convert your JSON Kubernetes definitions to YAML with this tool. Kubernetes requires specific apiVersion, kind, metadata, and spec fields - ensure your JSON has valid Kubernetes structure before conversion. The tool handles conversion; kubectl validates Kubernetes-specific schema."
    },
    {
      question: "Why is YAML preferred for CI/CD pipelines?",
      answer: "YAML's human readability makes pipeline configs easier to review and maintain. CI/CD files are frequently edited by humans, not machines. Comments support (#) allows documenting pipeline steps, environment-specific settings, and troubleshooting notes. GitHub Actions, GitLab CI, CircleCI, Travis, and most modern CI/CD tools standardized on YAML. JSON would work technically but is less ergonomic for configuration."
    },
    {
      question: "Is my JSON data private and secure?",
      answer: "Absolutely. All JSON to YAML conversion happens entirely in your browser using client-side JavaScript YAML library. Your JSON data never leaves your device or gets uploaded to servers. No network requests are made with your data. Verify by opening browser DevTools Network tab - zero uploads. Safe for sensitive configs, API keys, database credentials, or proprietary infrastructure definitions."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your JSON data never leaves your browser. This converter operates entirely client-side using JavaScript YAML parsing libraries. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All JSON parsing and YAML generation happens in your browser's JavaScript engine. Data stays on your device.
- **No Server Uploads:** We don't have backend servers to process JSON. The tool works completely offline after first page load.
- **No Data Storage:** Your JSON input and YAML output are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you convert, config values, API keys, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your data.

Safe for converting sensitive configurations, database credentials, API secrets, infrastructure definitions, or proprietary deployment configs. Use with confidence for production CI/CD pipelines, Kubernetes secrets, or regulated data processing.`
  },

  stats: {
    "Conversion Speed": "<50ms",
    "Max File Size": "10MB",
    "Indentation": "2 or 4",
    "Comments": "No",
    "Server Uploads": "0"
  }
};
