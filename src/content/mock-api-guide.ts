import { ToolGuideContent } from './types';

export const mockApiGuideContent: ToolGuideContent = {
  toolName: "API Mock Generator",
  toolPath: "/mock-api",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Schema Type",
      description: "Choose from 5 built-in schemas (Users, Products, Posts, Comments, Todos) or create a custom schema with JSON template and placeholders."
    },
    {
      title: "Set Array Size",
      description: "Specify how many data items to generate (1-100 items). Larger datasets are useful for testing pagination, infinite scroll, and performance."
    },
    {
      title: "Customize or Regenerate",
      description: "For custom schemas, define JSON structure with placeholders like {{id}}, {{name}}, {{email}}. Click Regenerate to get fresh random data."
    },
    {
      title: "Copy or Download JSON",
      description: "Copy generated mock data to clipboard or download as .json file. Use in API mocking tools, frontend development, or test suites."
    }
  ],

  introduction: {
    title: "What is an API Mock Generator?",
    content: `An API mock data generator is a development tool that creates realistic, randomized JSON datasets for testing frontend applications, API prototypes, and development workflows without requiring a live backend server.

## Understanding Mock APIs

During frontend development, teams often need realistic data before backend APIs are ready. Mock data generators solve this by producing JSON responses that mimic real API structures with random but plausible values. This enables parallel development where frontend and backend teams work independently.

**Key Components:**
- **Schema Templates**: Define data structure (users, products, posts, etc.)
- **Random Generators**: Create realistic names, emails, dates, numbers
- **Placeholder System**: Dynamic value substitution in custom schemas
- **Export Options**: JSON download and clipboard copy

## Why Mock API Generators Matter

**For Frontend Developers:**
Build and test UI components before backend APIs exist. Prototype features, test edge cases, and develop data-driven interfaces with realistic datasets.

**For API Design:**
Validate API response structures early in the design phase. Share example payloads with frontend teams to align on contracts before implementation.

**For Testing:**
Generate consistent, repeatable test fixtures. Create large datasets to test pagination, infinite scroll, search filtering, and performance under load.

**For Demos & Prototypes:**
Populate prototypes with realistic data that looks production-ready. Avoid using hardcoded "Lorem Ipsum" or "User 1, User 2" placeholder text.

Modern development workflows rely on tools like json-server, MSW (Mock Service Worker), and Postman Mock Server. This generator creates the JSON data those tools consume, enabling rapid prototyping and comprehensive frontend testing.`
  },

  useCases: [
    {
      title: "Frontend Development Without Backend",
      description: "Build and test React, Vue, or Angular components using realistic mock data while backend APIs are still in development. Enables parallel team workflows.",
      example: `// Generate 20 users, then use in React component
const users = generatedMockData; // From tool

function UserList() {
  return users.map(user => (
    <div key={user.id}>
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
    </div>
  ));
}`
    },
    {
      title: "API Response Prototyping",
      description: "Design and validate API response structures before implementation. Share mock responses with frontend teams to agree on data contracts and field naming.",
      example: `// Generated Products Schema
[
  {
    "id": 1,
    "name": "Premium Widget",
    "category": "Electronics",
    "price": 299.99,
    "inStock": true,
    "rating": 4.5,
    "reviews": 234
  }
]`
    },
    {
      title: "Integration Testing with json-server",
      description: "Use generated mock data with json-server to create a fully functional REST API with zero backend code. Perfect for integration tests and E2E testing.",
      example: `# Install json-server
npm install -g json-server

# Save generated data to db.json
# Then run:
json-server --watch db.json --port 3001

# Your API is live:
# GET http://localhost:3001/users
# POST http://localhost:3001/users
# PUT http://localhost:3001/users/1`
    },
    {
      title: "Custom Schema for Domain-Specific Data",
      description: "Create specialized datasets for unique business domains using custom schemas with placeholders. Generate invoices, orders, transactions, or any custom entity.",
      example: `// Custom Order Schema
{
  "orderId": "{{id}}",
  "customer": "{{name}}",
  "email": "{{email}}",
  "total": "{{number}}",
  "paid": "{{boolean}}",
  "createdAt": "{{date}}",
  "items": "{{number}}"
}

// Generates realistic orders with random values`
    }
  ],

  howToUse: {
    title: "How to Use the API Mock Generator",
    steps: [
      {
        name: "Choose Schema Type",
        text: "Select from built-in schemas (Users, Products, Posts, Comments, Todos) or choose 'Custom Schema' to define your own data structure. Built-in schemas follow common API response patterns."
      },
      {
        name: "Set Array Size",
        text: "Enter how many items to generate (1-100). Use larger sizes (50-100) to test pagination, scrolling, and performance. Use smaller sizes (5-10) for quick prototyping."
      },
      {
        name: "Define Custom Schema (Optional)",
        text: "For custom schemas, write a JSON template using placeholders: {{id}}, {{name}}, {{email}}, {{number}}, {{boolean}}, {{date}}, {{text}}. The generator replaces placeholders with realistic random values."
      },
      {
        name: "Regenerate Data",
        text: "Click 'Regenerate' to create a new set of random data with the same schema. Each regeneration produces different names, dates, and values while maintaining the structure."
      },
      {
        name: "Copy or Download",
        text: "Click 'Copy JSON' to copy to clipboard, or 'Download' to save as a .json file. Downloaded files are named mock-{schema}-{timestamp}.json for easy organization."
      },
      {
        name: "Use in Development",
        text: "Import the JSON into your frontend code, use with json-server for a REST API, or integrate with API mocking libraries like MSW or Mirage.js."
      }
    ],
    content: `## Advanced Mock Data Techniques

### Using with json-server
Create a complete REST API with generated data:
\`\`\`bash
# Save generated JSON to db.json
# Run json-server
json-server --watch db.json --port 3000

# Available endpoints:
# GET /users, /products, /posts, etc.
# POST, PUT, DELETE all work automatically
\`\`\`

### Integration with MSW (Mock Service Worker)
Use generated data in MSW handlers:
\`\`\`javascript
import { rest } from 'msw';
import mockUsers from './generated-users.json';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  })
];
\`\`\`

### Custom Schemas with Nested Objects
Create complex nested structures:
\`\`\`json
{
  "id": "{{id}}",
  "user": {
    "name": "{{name}}",
    "email": "{{email}}"
  },
  "metadata": {
    "created": "{{date}}",
    "active": "{{boolean}}"
  }
}
\`\`\`

### Generating Large Datasets
For performance testing, generate 100-item arrays:
- **Pagination Testing**: Test "Load More" with 100 items, 10 per page
- **Search/Filter**: Validate search across large datasets
- **Scroll Performance**: Test virtual scrolling with 100+ rows

## Integration Workflows

**With Postman:**
1. Generate mock data
2. Import JSON into Postman Mock Server
3. Share mock API URL with team

**With Storybook:**
1. Generate data for component stories
2. Import as \`.json\` file
3. Use in component props for realistic previews

**With Playwright/Cypress:**
1. Generate test fixtures
2. Use in E2E test assertions
3. Seed database state before tests`
  },

  faqs: [
    {
      question: "What schema types are available?",
      answer: "Built-in schemas include Users (names, emails, ages), Products (names, prices, ratings), Posts (titles, bodies, stats), Comments (authors, post IDs), and Todos (tasks, priorities). You can also create fully custom schemas with placeholders."
    },
    {
      question: "How do custom schema placeholders work?",
      answer: "Placeholders like {{id}}, {{name}}, {{email}}, {{number}}, {{boolean}}, {{date}}, {{text}} are replaced with realistic random values. Each placeholder generates contextually appropriate data (e.g., {{email}} produces valid email addresses)."
    },
    {
      question: "Can I generate nested objects and arrays?",
      answer: "Yes, custom schemas support nested JSON structures. Place placeholders anywhere in the template, including inside nested objects. The generator recursively processes all placeholders."
    },
    {
      question: "Is the data truly random on each generation?",
      answer: "Yes, clicking 'Regenerate' produces entirely new random values including different names, dates, numbers, and booleans. The schema structure remains the same, but all values change."
    },
    {
      question: "What's the maximum array size?",
      answer: "You can generate up to 100 items. This limit balances usefulness (testing pagination, scrolling) with browser performance. For larger datasets, generate multiple batches and merge them."
    },
    {
      question: "Can I use this data in production?",
      answer: "No, this generates mock/fake data for development and testing only. All data is randomly generated with no real-world accuracy. Never use mock data in production databases or live systems."
    },
    {
      question: "How do I use generated data with json-server?",
      answer: "Download the JSON file, rename it to db.json, then run 'json-server --watch db.json'. json-server automatically creates REST endpoints (GET, POST, PUT, DELETE) for each top-level array in the JSON."
    },
    {
      question: "Are generated emails and names real?",
      answer: "No, all data is randomly generated. Names are chosen from predefined lists, and emails use fake domains (example.com, test.org, etc.). None of the data represents real people or entities."
    },
    {
      question: "Can I save my custom schemas?",
      answer: "The tool doesn't save custom schemas. To reuse a schema, copy your JSON template and save it locally. Paste it back into the tool whenever needed."
    },
    {
      question: "How is this different from Faker.js?",
      answer: "Faker.js is a JavaScript library requiring code integration. This tool generates ready-to-use JSON files instantly with no coding. Both are useful: use this for quick JSON files, Faker.js for programmatic generation in your codebase."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `## Privacy & Security

**100% Client-Side Generation:**
All mock data is generated entirely in your browser using JavaScript. No data is sent to external servers during generation or download.

**No Data Persistence:**
Generated mock data is not saved, logged, or stored anywhere. When you close the browser tab, all generated data is cleared from memory.

**Safe for Sensitive Projects:**
Since all processing is client-side, you can safely use this tool for generating mock data structures that mirror sensitive production schemas without exposing actual data formats to external services.

**Generated Data is Fictional:**
All names, emails, addresses, and data values are randomly generated and purely fictional. No real personal information is used or stored.`
  },

  stats: {
    "Built-in Schemas": "5 Professional Types",
    "Custom Schemas": "Full Placeholder Support",
    "Max Array Size": "100 Items",
    "Data Processing": "100% Client-Side"
  }
};
