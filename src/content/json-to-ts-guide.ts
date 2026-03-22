/**
 * JSON to TypeScript Interface Generator Tool Guide Content
 * Comprehensive developer guide for JSON to TypeScript conversion
 */

import type { ToolGuideContent } from "./types";

export const jsonToTsGuideContent: ToolGuideContent = {
  toolName: "JSON to TypeScript",
  toolPath: "/json-to-ts",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste JSON API Response",
      description: "Copy JSON from API responses, database queries, or any data source and paste into the input field. The tool analyzes structure and infers TypeScript types from values."
    },
    {
      title: "Configure Type Options",
      description: "Choose interface or type alias syntax. Enable optional properties (?:) for nullable fields. Select strict or loose type inference based on your needs."
    },
    {
      title: "Review Generated Types",
      description: "See TypeScript interfaces generated from JSON structure. Nested objects become nested interfaces. Arrays infer element types. Property names are validated as valid TypeScript identifiers."
    },
    {
      title: "Copy to TypeScript Project",
      description: "Click Copy to grab TypeScript code. Paste into .ts files in your project. Use generated types for type-safe API calls, state management, or data validation."
    }
  ],

  introduction: {
    title: "What is JSON to TypeScript Conversion?",
    content: `JSON to TypeScript conversion generates TypeScript interface definitions from JSON data structures, enabling type-safe development when working with APIs, databases, and external data sources. Instead of manually writing types for API responses, this tool infers types automatically from example JSON, saving hours of work and reducing type definition errors.

TypeScript requires explicit type definitions for objects to provide compile-time safety and IntelliSense autocomplete. When integrating REST APIs, GraphQL endpoints, or database queries that return JSON, developers need TypeScript interfaces matching the response structure. Manually creating these interfaces is tedious, error-prone (missing properties, wrong types), and becomes outdated when APIs change.

### Why Generate TypeScript from JSON?

**Accelerate API Integration:** Fetch an API response, paste JSON, get TypeScript types instantly. No manual interface writing. Paste the generated interface into your codebase and TypeScript validates all API usage immediately.

**Ensure Type Accuracy:** Human-written types often have mistakes - wrong property types, missing optional fields, misspelled keys. Generating from actual JSON guarantees types match real data structure.

**Handle Complex Nested Data:** Modern APIs return deeply nested JSON (user → profile → settings → preferences). Manually typing these nested structures is painful and error-prone. This tool recursively generates nested interfaces automatically.

**Maintain Types During API Changes:** When APIs evolve (new fields, changed types), paste updated JSON response to regenerate interfaces. Compare with existing types to catch breaking changes before runtime errors occur.

### TypeScript Interface Benefits

**Compile-Time Safety:** TypeScript catches type errors during development. Access non-existent property or use wrong type, TypeScript errors prevent bugs before running code.

**IntelliSense Autocomplete:** IDEs (VS Code, WebStorm) provide autocomplete, type hints, and inline documentation based on interfaces. Improves developer experience and reduces lookups.

**Refactoring Confidence:** Rename properties or change types with confidence. TypeScript shows every affected location. No runtime surprises from missed updates.

**Documentation:** Interfaces serve as living documentation of data structures. New team members understand API response shapes by reading interfaces.

### Use Cases

Generate types for REST API responses (fetch user data, product lists, search results). Create interfaces for GraphQL query results. Define types for database query results (MongoDB documents, SQL rows). Type configuration files loaded as JSON. Type-safe Redux state or React Query responses.

This tool handles nested objects, arrays (infers element types), optional vs required properties, union types (string | null), primitive types (string, number, boolean, null), and generates valid TypeScript identifiers from JSON keys. All processing happens client-side using TypeScript AST generation.`
  },

  useCases: [
    {
      title: "Type REST API Responses",
      description: "Generate TypeScript interfaces for REST API responses to enable type-safe API calls. Fetch example response, generate interface, use in typed API client functions. Catch API contract violations at compile time.",
      example: `// API Response JSON:
{
  "id": 123,
  "username": "john_doe",
  "email": "john@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "bio": "Software engineer",
    "avatarUrl": "https://example.com/avatar.jpg"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "isActive": true
}

// Generated TypeScript Interface:
interface User {
  id: number;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    bio: string;
    avatarUrl: string;
  };
  createdAt: string;
  isActive: boolean;
}

// Type-safe API call:
async function getUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user; // TypeScript validates structure
}`
    },
    {
      title: "Type Redux State Slices",
      description: "Generate TypeScript types for Redux state structures. Define state shape as JSON, generate interface, use in reducers and selectors for type-safe state management. Prevent state mutation bugs.",
      example: `// Redux state structure (JSON):
{
  "user": {
    "currentUser": null,
    "isAuthenticated": false,
    "loading": false,
    "error": null
  },
  "posts": {
    "items": [],
    "selectedPost": null,
    "filters": {
      "category": "all",
      "sortBy": "date"
    }
  }
}

// Generated TypeScript:
interface RootState {
  user: {
    currentUser: null; // Can refine to User | null
    isAuthenticated: boolean;
    loading: boolean;
    error: null;
  };
  posts: {
    items: any[]; // Refine to Post[]
    selectedPost: null;
    filters: {
      category: string;
      sortBy: string;
    };
  };
}

// Type-safe selectors:
const selectUser = (state: RootState) => state.user.currentUser;
const selectFilters = (state: RootState) => state.posts.filters;`
    },
    {
      title: "Type MongoDB Documents",
      description: "Generate TypeScript interfaces for MongoDB document schemas. Query MongoDB, get example document, generate interface for type-safe document operations with Mongoose or native driver.",
      example: `// MongoDB User Document:
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "passwordHash": "$2b$10$...",
  "roles": ["user", "admin"],
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "lastLogin": "2024-01-15T10:30:00Z",
  "createdAt": "2024-01-01T00:00:00Z"
}

// Generated Interface:
interface UserDocument {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: string[];
  preferences: {
    theme: string;
    notifications: boolean;
  };
  lastLogin: string;
  createdAt: string;
}

// Mongoose Schema with types:
const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // ... other fields
});`
    },
    {
      title: "Type GraphQL Query Results",
      description: "Generate TypeScript types for GraphQL query results. Execute query in GraphQL playground, copy result JSON, generate interface. Use in React Query, Apollo Client, or urql for type-safe GraphQL development.",
      example: `// GraphQL Query Result:
{
  "data": {
    "user": {
      "__typename": "User",
      "id": "123",
      "name": "John Doe",
      "posts": [
        {
          "__typename": "Post",
          "id": "1",
          "title": "My First Post",
          "content": "Hello world",
          "publishedAt": "2024-01-15"
        }
      ]
    }
  }
}

// Generated Interface:
interface GraphQLResponse {
  data: {
    user: {
      __typename: string;
      id: string;
      name: string;
      posts: Array<{
        __typename: string;
        id: string;
        title: string;
        content: string;
        publishedAt: string;
      }>;
    };
  };
}

// Type-safe query:
import { useQuery } from '@tanstack/react-query';
const { data } = useQuery<GraphQLResponse>(['user', id], fetchUser);
const userName = data?.data.user.name; // Type-safe access`
    }
  ],

  howToUse: {
    title: "How to Use This JSON to TypeScript Converter",
    content: `This tool provides instant TypeScript interface generation from JSON with intelligent type inference, nested structure handling, and configurable output options. All processing happens client-side using TypeScript AST generation libraries.

### Generating TypeScript Interfaces

Paste valid JSON representing your data structure. The tool analyzes types: strings become string, numbers become number, booleans become boolean, null becomes null (or string | null if you want nullable types). Arrays infer element types from first element or use any[] for empty arrays.

### Interface vs Type Alias

Choose interface syntax (interface User {}) or type alias (type User = {}). Interfaces are preferred for object shapes in TypeScript best practices. Type aliases work for unions, intersections, or when you prefer = syntax. Both produce identical runtime behavior.

### Optional Properties

Enable "Optional Properties" to mark all fields with ? making them optional. Useful when API responses have inconsistent fields or optional data. Disable for strict required properties matching JSON exactly.

### Handling Nested Objects

Nested JSON objects generate nested interface definitions. You can configure to extract nested objects as separate named interfaces or inline them. Separate interfaces improve reusability (UserProfile interface used in multiple places).

### Array Type Inference

Arrays infer element types from first array element. \`["a", "b"]\` becomes \`string[]\`. \`[{id: 1}, {id: 2}]\` generates object interface then \`Array<ObjectInterface>\`. Empty arrays \`[]\` default to \`any[]\` - manually refine to specific type.

### Handling Invalid Property Names

JSON keys can be any string including spaces, hyphens, special chars. TypeScript identifiers have restrictions. Tool automatically converts invalid names: "first-name" → "firstName", "user id" → "userId", preserving semantics while ensuring valid TypeScript.`,
    steps: [
      {
        name: "Paste JSON",
        text: "Copy JSON from API responses, database queries, state objects, or any data source. Must be valid JSON syntax."
      },
      {
        name: "Configure Options",
        text: "Select interface or type alias. Enable optional properties if needed. Choose inline or extracted nested interfaces."
      },
      {
        name: "Review Types",
        text: "Check generated TypeScript for accuracy. Refine any[] arrays to specific types. Adjust nullable types if needed."
      },
      {
        name: "Copy to Project",
        text: "Copy generated TypeScript code. Paste into .ts file in your project. Use interfaces for type-safe development."
      }
    ]
  },

  faqs: [
    {
      question: "How accurate is the type inference?",
      answer: "The tool infers types from JSON values with high accuracy for primitives (string, number, boolean, null). However, JSON is ambiguous for some types: dates are strings in JSON but could be Date type in TypeScript. Empty arrays default to any[]. Null values could be string | null or just null. Review generated types and refine based on actual API behavior - use Date for datetime strings, specify array element types, add union types for nullables."
    },
    {
      question: "Can I generate types for multiple API responses?",
      answer: "Yes, paste multiple JSON objects and generate interfaces for each. The tool doesn't automatically merge or relate types - you handle that manually. For related types (User has Post[]), generate each interface separately then compose: interface User { posts: Post[] }. Or use a single JSON with nested structure to generate related types together."
    },
    {
      question: "How do I handle optional vs required fields?",
      answer: "The tool offers two modes: strict (all properties required) or optional (all properties marked with ?). JSON doesn't distinguish required vs optional. To accurately mark optional fields, compare multiple API responses - fields present in all responses are required, inconsistent fields are optional. Manually add ? to optional fields after generation, or enable optional mode then remove ? from required fields."
    },
    {
      question: "What about Date types for timestamps?",
      answer: "JSON represents dates as strings (ISO 8601: '2024-01-15T10:30:00Z'). The tool generates string type since that's the JSON wire format. Manually change to Date if you parse strings to Date objects: createdAt: Date. Or use string and parse when needed: new Date(user.createdAt). Some prefer string for API responses (accurate wire format) and Date for in-memory objects."
    },
    {
      question: "Can this handle GraphQL __typename fields?",
      answer: "Yes, GraphQL responses include __typename discriminator fields. The tool generates __typename: string for these. For precise typing, use literal types: __typename: 'User'. Or use TypeScript discriminated unions if your data has multiple types: type Entity = { __typename: 'User', id: string } | { __typename: 'Post', id: number }."
    },
    {
      question: "How do I type polymorphic JSON (different shapes)?",
      answer: "Polymorphic APIs return different object shapes based on a discriminator field (type: 'user' | 'admin'). Generate interfaces for each shape separately, then create a union type: type Entity = UserEntity | AdminEntity. Use discriminator for type narrowing: if (entity.type === 'user') { /* entity is UserEntity */ }."
    },
    {
      question: "Should I commit generated types to version control?",
      answer: "Yes. Generated interfaces are code, not build artifacts. Commit to Git so team members have types. When API changes, regenerate types and commit the diff - visible in PR for review. Treat as source code, not auto-generated output (like build files). Alternatively, generate types during build from OpenAPI schema for always-up-to-date types."
    },
    {
      question: "Can I use this with Zod or other runtime validators?",
      answer: "This tool generates static TypeScript types, not runtime validators. For runtime validation, use Zod, io-ts, or Yup. Workflow: generate TypeScript interface from JSON for development types, separately create Zod schema for runtime validation, use z.infer<typeof schema> to extract type from Zod schema. Or hand-write Zod schema based on generated interface."
    },
    {
      question: "How do I keep types synced with changing APIs?",
      answer: "Regenerate types whenever API contract changes. Workflow: API team updates endpoint → fetch new response → regenerate interface → compare diff with existing types → update code using changed properties → commit. For OpenAPI/Swagger APIs, use openapi-typescript to auto-generate types from schema instead of example responses."
    },
    {
      question: "Is my JSON data private and secure?",
      answer: "Absolutely. All JSON to TypeScript conversion happens entirely in your browser using client-side JavaScript. Your JSON data never leaves your device or gets uploaded to servers. No network requests are made with your data. Verify by opening browser DevTools Network tab - zero uploads. Safe for API responses with sensitive data, customer information, or proprietary data structures."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your JSON data never leaves your browser. This converter operates entirely client-side using JavaScript JSON parsing and TypeScript AST generation. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All JSON parsing and TypeScript generation happens in your browser's JavaScript engine. Data stays on your device.
- **No Server Uploads:** We don't have backend servers to process JSON. The tool works completely offline after first page load.
- **No Data Storage:** Your JSON input and TypeScript output are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you convert, API responses, data structures, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your data.

Safe for generating types from sensitive API responses, customer data, financial records, healthcare data (HIPAA), payment information (PCI-DSS), or any proprietary data structures. Use with confidence for production APIs or confidential data.`
  },

  stats: {
    "Generation Speed": "<100ms",
    "Type Inference": "Auto",
    "Nested Objects": "Yes",
    "Max Depth": "10 levels",
    "Server Uploads": "0"
  }
};
