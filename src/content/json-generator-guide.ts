/**
 * JSON Data Generator Tool Guide Content
 * Comprehensive developer guide for generating random JSON data
 */

import type { ToolGuideContent } from "./types";

export const jsonGeneratorGuideContent: ToolGuideContent = {
  toolName: "JSON Data Generator",
  toolPath: "/json-generator",
  lastUpdated: "2026-02-15",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Choose a Template or Write Your Own",
      description: "Select a pre-built template (User, Product, Order, BlogPost) or write a custom JSON template with placeholders like {{name}}, {{email}}, {{number(1,100)}}."
    },
    {
      title: "Set the Item Count",
      description: "Choose how many JSON objects to generate: 1, 5, 10, 25, 50, or 100 items. Perfect for seeding databases, testing APIs, or creating mock data for frontend development."
    },
    {
      title: "Click Generate",
      description: "Press the Generate button to instantly create randomized JSON data based on your template. Each placeholder is replaced with realistic random values."
    },
    {
      title: "Copy or Download the Output",
      description: "Copy the generated JSON to clipboard for pasting into code, or download as a .json file for use in test fixtures, database seeds, or mock API responses."
    }
  ],

  introduction: {
    title: "What is JSON Data Generation?",
    content: `JSON Data Generation creates realistic, randomized JSON datasets from templates for use in software development, testing, and prototyping. Instead of manually crafting test data or copying production records, developers define a template with placeholders and generate thousands of unique records instantly.

Modern software development requires test data at every stage: unit tests need mock API responses, frontend prototypes need realistic user data, database migrations need seed records, and load testing needs high-volume datasets. Manually creating this data is tedious and error-prone. JSON generators automate this process while producing varied, realistic-looking data.

### How Template-Based Generation Works

You write a JSON template using placeholder syntax like \`{{name}}\`, \`{{email}}\`, or \`{{number(1,100)}}\`. The generator parses these placeholders and replaces each one with a random value of the appropriate type. Every generation produces unique data - no two runs are identical.

Templates support all common data types: names, emails, UUIDs, dates, numbers, booleans, lorem ipsum text, and custom pick lists. You can nest objects, create arrays, and combine multiple placeholder types in a single template to model complex data structures.

### Common Use Cases

- **Database seeding:** Generate hundreds of user records, products, or orders for development databases
- **API mocking:** Create realistic JSON responses for frontend development before the backend is ready
- **Unit testing:** Generate varied test fixtures that cover edge cases (empty strings, large numbers, null values)
- **Load testing:** Produce thousands of unique requests for performance benchmarks
- **Prototyping:** Populate UI mockups with realistic data instead of "Lorem ipsum" placeholders
- **Documentation:** Generate example API responses for developer documentation

### Privacy-First Approach

All data generation happens client-side in your browser using JavaScript's Math.random(). No external APIs, no server processing, no data transmission. Generated data is completely synthetic - no real personal information is used or stored. Safe for generating test data that resembles production records without privacy concerns.`
  },

  useCases: [
    {
      title: "Seed Development Databases",
      description: "Generate hundreds of realistic user records, products, or transactions to populate development and staging databases. Use templates matching your database schema to create migration-ready JSON files.",
      example: `// Template:
{
  "id": "{{uuid}}",
  "name": "{{name}}",
  "email": "{{email}}",
  "age": {{number(18,65)}},
  "active": {{boolean}}
}

// Generates 100 unique user records for database seeding`
    },
    {
      title: "Mock API Responses for Frontend",
      description: "Create realistic JSON API responses for frontend development when the backend isn't ready yet. Generate mock data that matches your API contract so UI components render correctly during prototyping.",
      example: `// Template matching API response:
{
  "products": [{
    "id": "{{uuid}}",
    "name": "{{pick(\"Widget\",\"Gadget\",\"Device\")}}",
    "price": {{number(10,500)}},
    "inStock": {{boolean}}
  }]
}`
    },
    {
      title: "Generate Test Fixtures",
      description: "Create varied test data for unit and integration tests. Generate edge cases, boundary values, and realistic combinations that manual test data creation would miss.",
      example: `// Template for order test fixtures:
{
  "orderId": "{{uuid}}",
  "customer": "{{name}}",
  "total": {{number(1,10000)}},
  "status": "{{pick(\"pending\",\"shipped\",\"delivered\",\"cancelled\")}}",
  "createdAt": "{{date}}"
}`
    },
    {
      title: "Populate UI Prototypes",
      description: "Fill UI mockups and prototypes with realistic data instead of placeholder text. Generate user profiles, product listings, blog posts, or dashboard metrics that make prototypes look production-ready.",
      example: `// Template for blog post prototype:
{
  "title": "{{lorem(5)}}",
  "author": "{{name}}",
  "publishedAt": "{{date}}",
  "excerpt": "{{lorem(20)}}",
  "readTime": {{number(2,15)}}
}`
    }
  ],

  howToUse: {
    title: "How to Use This JSON Data Generator",
    content: `This tool generates randomized JSON data from templates with placeholder syntax. All processing is client-side using JavaScript - no external dependencies, no server calls.

### Template Syntax

Write valid JSON with placeholders enclosed in double curly braces:

- \`{{name}}\` → Random full name (e.g., "Alice Johnson")
- \`{{email}}\` → Random email address (e.g., "john.smith@example.com")
- \`{{number(min,max)}}\` → Random integer in range (e.g., {{number(1,100)}} → 42)
- \`{{boolean}}\` → Random true or false
- \`{{date}}\` → Random ISO date string (e.g., "2024-06-15T14:30:00Z")
- \`{{uuid}}\` → Random UUID v4 (e.g., "550e8400-e29b-41d4-a716-446655440000")
- \`{{lorem(words)}}\` → Random text with specified word count
- \`{{pick("a","b","c")}}\` → Random selection from provided options

### Pre-Built Templates

Select from ready-made templates for common data structures:

- **User:** id, name, email, age, active status, registration date
- **Product:** id, name, price, category, stock, rating
- **Order:** orderId, customer, items, total, status, date
- **BlogPost:** title, author, content, tags, published date

### Array Generation

Set the item count (1, 5, 10, 25, 50, or 100) to generate arrays of objects. Each item uses your template with fresh random values. The output is a valid JSON array ready for database imports or API mocking.

### Tips for Effective Templates

- Match your template to your actual data schema for realistic test data
- Use \`{{pick(...)}}\` for enum fields (status, category, role)
- Combine \`{{number}}\` with realistic ranges for your domain
- Use \`{{uuid}}\` for primary keys to avoid collisions
- Test with small counts first, then scale up`,
    steps: [
      {
        name: "Select or Write Template",
        text: "Choose a pre-built template (User, Product, Order, BlogPost) or write a custom JSON template using placeholder syntax like {{name}}, {{email}}, {{number(1,100)}}."
      },
      {
        name: "Set Item Count",
        text: "Choose how many items to generate: 1 for single objects, 5-10 for testing, 25-100 for database seeding or load testing."
      },
      {
        name: "Generate Data",
        text: "Click the Generate button to create randomized JSON data. Each placeholder is replaced with a unique random value."
      },
      {
        name: "Copy or Download",
        text: "Copy the generated JSON to clipboard or download as .json file for use in tests, database seeds, or mock APIs."
      }
    ]
  },

  faqs: [
    {
      question: "What placeholder types are supported?",
      answer: "The generator supports: {{name}} for random names, {{email}} for email addresses, {{number(min,max)}} for integers in a range, {{boolean}} for true/false, {{date}} for ISO dates, {{uuid}} for UUID v4, {{lorem(words)}} for random text, and {{pick(\"a\",\"b\",\"c\")}} for random selection from a list. All are processed client-side without external dependencies."
    },
    {
      question: "How many items can I generate at once?",
      answer: "You can generate 1, 5, 10, 25, 50, or 100 items at once. For larger datasets (1000+), generate in batches and concatenate. Browser memory limits processing to a few thousand complex objects. For massive datasets, use server-side tools like Faker.js with Node.js."
    },
    {
      question: "Is the generated data truly random?",
      answer: "Yes, data is generated using JavaScript's Math.random() which provides pseudo-random values suitable for testing and prototyping. It's not cryptographically secure random - don't use generated UUIDs or data for security-sensitive purposes. Each generation produces unique values; no two runs produce identical output."
    },
    {
      question: "Can I use custom templates with nested objects?",
      answer: "Yes, templates support any valid JSON structure including nested objects and arrays. Place placeholders at any depth level. Example: {\"user\": {\"name\": \"{{name}}\", \"address\": {\"city\": \"{{pick(\\\"NYC\\\",\\\"LA\\\",\\\"Chicago\\\")}}\"}}}. The generator processes all placeholders regardless of nesting depth."
    },
    {
      question: "What format are generated dates in?",
      answer: "Dates are generated in ISO 8601 format (e.g., \"2024-06-15T14:30:00Z\") which is the standard for JSON APIs and is parseable by all modern programming languages. Dates span a reasonable range of recent years to simulate realistic data."
    },
    {
      question: "Can I generate data matching my database schema?",
      answer: "Yes, write a template that mirrors your database table columns. Use {{uuid}} for primary keys, {{name}}/{{email}} for user fields, {{number}} for numeric columns, {{boolean}} for boolean flags, and {{pick}} for enum fields. The generated JSON can be directly imported into most databases."
    },
    {
      question: "Does this use any external APIs or libraries?",
      answer: "No. All data generation is implemented with pure JavaScript using Math.random() and built-in string manipulation. No external APIs are called, no npm packages are used, and no network requests are made. The tool works completely offline after initial page load."
    },
    {
      question: "Is the generated data private?",
      answer: "Absolutely. All generation happens in your browser's JavaScript engine. No templates, generated data, or usage patterns are transmitted to any server. The tool works offline. Generated data is completely synthetic - no real personal information is used. Safe for creating test data for regulated industries (healthcare, finance)."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All JSON data generation happens entirely in your browser using client-side JavaScript. No external APIs, no server processing, no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All random data generation uses JavaScript's Math.random() in your browser. Nothing leaves your device.
- **No External APIs:** Unlike cloud-based generators, this tool makes zero network requests. Works completely offline.
- **No Template Storage:** Your templates and generated data are not saved, logged, or transmitted anywhere. Refresh the page and it's gone.
- **Synthetic Data Only:** Generated names, emails, and values are completely fictional. No real personal information is used or referenced.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests during generation.

Safe for creating test data in regulated environments (HIPAA, GDPR, PCI-DSS). Generated data contains no real personal information, making it ideal for development and testing without privacy concerns.`
  },

  stats: {
    "Generation Speed": "<50ms",
    "Max Items": "100",
    "Placeholder Types": "8",
    "Pre-built Templates": "4",
    "External Dependencies": "0"
  }
};
