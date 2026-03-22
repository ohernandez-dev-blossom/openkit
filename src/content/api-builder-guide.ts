/**
 * API Request Builder Tool Guide Content
 * Comprehensive developer guide for API testing and HTTP requests
 */

import type { ToolGuideContent } from "./types";

export const apiBuilderGuideContent: ToolGuideContent = {
  toolName: "API Request Builder",
  toolPath: "/api-builder",
  lastUpdated: "2026-02-05",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Select HTTP Method",
      description: "Choose the appropriate HTTP method: GET for retrieving data, POST for creating resources, PUT for updates, DELETE for removal, or PATCH for partial modifications."
    },
    {
      title: "Enter API Endpoint URL",
      description: "Type the full API endpoint URL including https:// protocol. For example: https://api.example.com/v1/users. The tool validates the URL format automatically."
    },
    {
      title: "Add Headers & Body",
      description: "Click 'Add Header' to include Authorization, Content-Type, or custom headers. For POST/PUT/PATCH requests, enter your JSON body in the editor."
    },
    {
      title: "Copy as cURL",
      description: "Click 'Copy as cURL' to get the equivalent cURL command for your request. Use this in terminal, documentation, or share with your team."
    }
  ],

  introduction: {
    title: "What is API Testing?",
    content: "API testing is the practice of directly testing Application Programming Interfaces to verify functionality, reliability, performance, and security. Unlike UI testing, API testing sends HTTP requests directly to endpoints and validates responses, making it faster and more reliable.\\n\\nAPI Request Builders are essential tools that construct HTTP requests with custom methods, headers, and body content. They provide a visual interface for testing REST APIs, debugging webhooks, and exploring third-party integrations. Unlike command-line tools like cURL, they offer immediate feedback, syntax highlighting, and request history.\\n\\n### Why Developers Need API Testing Tools\\n\\n**Debugging API Issues:** When an API call fails in your application, isolating the problem is difficult. API testing tools let you reproduce the exact request outside your codebase, modify parameters, and see raw responses.\\n\\n**Exploring Third-Party APIs:** Before integrating Stripe, Twilio, or any external API, developers test endpoints to understand request formats, required parameters, and response structures.\\n\\n**Webhook Development:** API testing tools can simulate webhook payloads, letting you verify your endpoint handles them correctly before going live.\\n\\n### HTTP Methods Explained\\n\\n**GET** retrieves data from a resource. It's safe and idempotent - multiple identical requests produce the same result. No request body.\\n\\n**POST** creates new resources. Not idempotent - sending the same POST twice may create two resources. Includes request body.\\n\\n**PUT** updates a resource completely. Idempotent - multiple identical PUTs have the same effect as one.\\n\\n**PATCH** applies partial modifications to a resource. Only changes specified fields.\\n\\n**DELETE** removes a resource. Idempotent - deleting a non-existent resource returns the same result."
  },

  useCases: [
    {
      title: "Testing REST API Endpoints",
      description: "Verify API functionality during development by sending test requests to endpoints before integrating them into your application. Test different parameters, authentication methods, and error scenarios.",
      example: "// Testing a user creation endpoint\\nMethod: POST\\nURL: https://api.example.com/v1/users\\nHeaders:\\n  Content-Type: application/json\\n  Authorization: Bearer eyJhbG...\\nBody:\\n{\\n  \"name\": \"John Doe\",\\n  \"email\": \"john@example.com\",\\n  \"role\": \"developer\"\\n}\\n\\n// Expected Response (201 Created):\\n{\\n  \"id\": \"usr_123\",\\n  \"name\": \"John Doe\",\\n  \"status\": \"active\"\\n}"
    },
    {
      title: "Debugging Authentication Flows",
      description: "Test OAuth, JWT, and API key authentication by constructing requests with various credential formats. Verify token expiration handling and refresh token flows.",
      example: "// Testing JWT Bearer Token\\nMethod: GET\\nURL: https://api.example.com/protected\\nHeaders:\\n  Authorization: Bearer eyJhbGciOiJIUzI1NiIs...\\n\\n// Testing API Key\\nHeaders:\\n  X-API-Key: your-api-key-here\\n\\n// OAuth Token Request\\nMethod: POST\\nURL: https://oauth.example.com/token\\nBody:\\ngrant_type=client_credentials&client_id=xxx&client_secret=yyy"
    },
    {
      title: "Simulating Webhook Payloads",
      description: "Test webhook endpoints by sending simulated payload requests to your local or staging environment. Verify signature validation and payload parsing without waiting for real events.",
      example: "// Stripe Webhook\\nMethod: POST\\nURL: https://your-app.com/webhooks/stripe\\nHeaders:\\n  Stripe-Signature: t=1234567890,v1=abc123...\\nBody:\\n{\\n  \"type\": \"invoice.payment_succeeded\",\\n  \"data\": { \"object\": { \"id\": \"in_123\", \"status\": \"paid\" } }\\n}\\n\\n// GitHub Webhook\\nHeaders:\\n  X-GitHub-Event: push\\nBody: { \"ref\": \"refs/heads/main\", ... }"
    },
    {
      title: "Building Complex Requests",
      description: "Construct sophisticated requests with nested JSON bodies, multiple headers, and specific content types. Perfect for GraphQL queries and complex API integrations.",
      example: "// GraphQL Query\\nMethod: POST\\nURL: https://api.github.com/graphql\\nHeaders:\\n  Authorization: Bearer ghp_xxx\\nBody:\\n{\\n  \"query\": \"query { viewer { login } }\"\\n}\\n\\n// Complex Nested JSON\\n{\\n  \"customer\": {\\n    \"id\": \"cus_123\",\\n    \"shipping_address\": { \"city\": \"SF\", \"country\": \"US\" }\\n  },\\n  \"items\": [{ \"product_id\": \"prod_456\", \"qty\": 2 }]\\n}"
    }
  ],

  howToUse: {
    title: "How to Use This API Request Builder",
    content: "This API Request Builder helps you construct and test HTTP requests directly in your browser. All processing happens client-side—your API keys and data never leave your computer.\\n\\n### Building Your First Request\\n\\n1. **Select HTTP Method** - Choose GET for retrieving data, POST for creating resources, PUT for updates, DELETE for removal, or PATCH for partial updates.\\n\\n2. **Enter URL** - Type the full API endpoint including https://. The tool validates URL format automatically.\\n\\n3. **Add Headers** - Click 'Add Header' to include Authorization (Bearer tokens), Content-Type (application/json), or custom headers like X-API-Key.\\n\\n4. **Add Body** - For POST/PUT/PATCH, enter JSON in the body editor. The tool validates JSON syntax and formats it properly.\\n\\n5. **Copy as cURL** - Click the copy button to get the equivalent cURL command for sharing, documentation, or terminal use.",
    steps: [
      {
        name: "Select Method",
        text: "Choose GET, POST, PUT, DELETE, or PATCH from the dropdown based on your API operation."
      },
      {
        name: "Enter URL",
        text: "Type the complete API endpoint URL including the https:// protocol."
      },
      {
        name: "Configure Headers",
        text: "Add required headers like Authorization and Content-Type as key-value pairs."
      },
      {
        name: "Add Request Body",
        text: "For POST/PUT/PATCH, enter valid JSON in the body editor."
      },
      {
        name: "Copy cURL Command",
        text: "Click 'Copy as cURL' to get the command-line equivalent of your request."
      }
    ]
  },

  faqs: [
    {
      question: "Is my API data secure when using this tool?",
      answer: "Yes. All processing happens entirely in your browser. Your API keys, URLs, and request data never leave your device. There are no server uploads, no data storage, and no analytics tracking of your request content. Inspect the Network tab in DevTools to verify—zero outbound requests containing your data."
    },
    {
      question: "Can I actually send requests from this tool?",
      answer: "This tool builds and validates requests, then generates cURL commands you can copy and run. It doesn't send requests directly due to browser CORS restrictions. For actual API testing, paste the generated cURL into your terminal or use tools like Postman."
    },
    {
      question: "How do I add authentication headers?",
      answer: "Click 'Add Header' and enter 'Authorization' as the key. For Bearer tokens, use 'Bearer your_token_here' as the value. For API keys, use a custom header like 'X-API-Key' with your key as the value. For Basic auth, use 'Basic base64(username:password)'."
    },
    {
      question: "What content types are supported?",
      answer: "The tool supports application/json for REST APIs (with syntax validation and formatting), text/plain for raw text, and application/x-www-form-urlencoded for form data. For multipart/form-data (file uploads), use the raw body mode."
    },
    {
      question: "Can I save my requests?",
      answer: "Requests are not saved by the tool for privacy. Copy the generated cURL commands and save them in your documentation, scripts, or API client collections. You can also bookmark specific request configurations in your browser."
    },
    {
      question: "How do I handle query parameters?",
      answer: "Add query parameters directly to the URL: https://api.example.com/users?page=1&limit=10. The tool validates the complete URL including query strings. For complex parameters with special characters, ensure they are properly URL-encoded."
    },
    {
      question: "Can I import requests from Postman or cURL?",
      answer: "Currently, the tool only builds requests from scratch and exports to cURL. To import existing requests, manually recreate them by entering the URL, method, headers, and body as shown in your Postman collection or cURL command."
    },
    {
      question: "Why is my JSON showing as invalid?",
      answer: "Common JSON errors include: trailing commas after the last property, unquoted keys (must use double quotes), single quotes instead of double quotes, unescaped special characters in strings, and missing closing braces. The tool highlights the specific error location."
    },
    {
      question: "What HTTP methods should I use?",
      answer: "Use GET to retrieve data, POST to create new resources, PUT to completely replace a resource, PATCH to partially update a resource, DELETE to remove a resource, HEAD to get headers only, and OPTIONS to check allowed methods. Follow REST conventions when the API supports them."
    },
    {
      question: "Can I test GraphQL APIs with this tool?",
      answer: "Yes. Select POST as the method, set Content-Type to application/json, and send your GraphQL query in the request body: {\"query\": \"query GetUser($id: ID!) { user(id: $id) { name email } }\", \"variables\": {\"id\": \"123\"}}."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: "Your API data is completely private when using this tool. All request construction, JSON validation, and cURL generation happens entirely within your browser using JavaScript. Your API keys, authentication tokens, request bodies, and URLs are never transmitted to any server.\\n\\n### Privacy Guarantees\\n\\n- **100% Client-Side:** All processing occurs in your browser. No server-side processing of your data.\\n- **No Data Storage:** Your requests are not saved, logged, or stored anywhere. Refresh the page and the data is gone.\\n- **No Network Requests:** Verify in DevTools Network tab—zero outbound requests containing your API data.\\n- **Open and Auditable:** The tool's code is transparent and runs locally in your browser.\\n\\n### Security Best Practices\\n\\n- Never commit API keys to version control. Use environment variables.\\n- Rotate API keys regularly, especially if accidentally exposed.\\n- Use the minimum required permissions for API keys (principle of least privilege).\\n- For production APIs, always use HTTPS endpoints.\\n- Be cautious when sharing cURL commands—they may contain sensitive tokens."
  },

  stats: {
    "HTTP Methods": "7 (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)",
    "Header Support": "Unlimited custom headers",
    "Body Size": "Up to 10MB",
    "JSON Validation": "Real-time syntax checking",
    "Privacy": "100% client-side"
  }
};
