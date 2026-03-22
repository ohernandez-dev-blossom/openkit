import type { ToolGuideContent } from "./types";

export const curlBuilderGuideContent: ToolGuideContent = {
  toolName: "cURL Builder",
  toolPath: "/curl-builder",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Choose Method & URL",
      description: "Select an HTTP method (GET, POST, PUT, etc.) and enter your API endpoint URL. Or pick a preset to get started quickly."
    },
    {
      title: "Add Headers & Auth",
      description: "Add custom headers (Content-Type, Accept, etc.) and configure authentication — Bearer token, Basic auth, or API key."
    },
    {
      title: "Set Request Body",
      description: "For POST/PUT/PATCH requests, choose JSON, form data, or raw body and enter your payload."
    },
    {
      title: "Copy & Run",
      description: "The cURL command updates in real-time. Click Copy and paste it into your terminal."
    }
  ],

  introduction: {
    title: "What is cURL?",
    content: `cURL (Client URL) is the most widely used command-line tool for transferring data via URLs. Available on virtually every operating system, it supports HTTP, HTTPS, FTP, and dozens of other protocols.

### Why Use a cURL Builder?

Writing cURL commands by hand is error-prone — escaping quotes, remembering flag names, formatting JSON bodies. A visual builder eliminates syntax errors and lets you focus on the request itself.

### Common cURL Flags

- **-X**: HTTP method (GET, POST, PUT, DELETE)
- **-H**: Add a header (repeatable)
- **-d**: Request body data
- **-u**: Basic auth (user:password)
- **-L**: Follow redirects
- **-k**: Skip SSL verification
- **-v**: Verbose output
- **-s**: Silent mode (no progress bar)
- **--compressed**: Request compressed response

### From Browser to Terminal

Most browser DevTools let you "Copy as cURL" from the Network tab. This tool does the reverse: build the command visually and copy it to your clipboard.`
  },

  useCases: [
    {
      title: "API Development & Testing",
      description: "Build and test REST API calls during development. Set headers, auth tokens, and JSON bodies without memorizing cURL syntax.",
      example: "POST /api/users with Bearer token and JSON body"
    },
    {
      title: "Debugging Webhooks",
      description: "Construct webhook payloads to test integrations. Set custom headers, signatures, and body content for services like Stripe, GitHub, or Slack.",
      example: "POST webhook with X-Hub-Signature header and JSON event payload"
    },
    {
      title: "Documentation & Sharing",
      description: "Generate clean, properly-escaped cURL commands for API documentation. Share exact commands that colleagues can copy and run.",
      example: "API docs showing curl -X POST with all required headers"
    },
    {
      title: "CI/CD Pipeline Scripts",
      description: "Build cURL commands for deployment scripts, health checks, and API calls in CI pipelines. Get the escaping right the first time.",
      example: "Health check: curl -s -o /dev/null -w '%{http_code}' https://api.example.com/health"
    }
  ],

  howToUse: {
    title: "How to Use cURL Builder",
    content: `Build your cURL command step by step with the visual interface.

### Method & URL

Select the HTTP method from the dropdown and enter the full URL. Query parameters can be added separately — they'll be URL-encoded and appended automatically.

### Headers

Click "Add" to add headers. Each header has a checkbox to quickly enable/disable without deleting. Common headers: Content-Type, Accept, Authorization, X-API-Key.

### Authentication

Four auth types are supported:
- **None**: No auth headers
- **Bearer Token**: Adds Authorization: Bearer {token}
- **Basic Auth**: Uses -u user:password (base64 encoded by cURL)
- **API Key**: Custom header name + value

### Request Body

Available for POST, PUT, PATCH methods:
- **JSON**: Sends application/json body
- **Form Data**: URL-encoded key=value pairs
- **Raw**: Any content (XML, text, binary reference)

### Options

Toggle common cURL flags: follow redirects (-L), skip SSL (-k), verbose (-v), silent (-s), compressed, and connection timeout.`,
    steps: [
      { name: "Set Method & URL", text: "Choose HTTP method and enter the endpoint URL." },
      { name: "Configure Headers", text: "Add request headers like Content-Type, Accept, etc." },
      { name: "Set Authentication", text: "Choose auth type and enter credentials or token." },
      { name: "Add Body (optional)", text: "For POST/PUT/PATCH, add JSON, form, or raw body." },
      { name: "Copy Command", text: "Click Copy to get the complete cURL command." }
    ]
  },

  faqs: [
    {
      question: "Does this tool execute the cURL command?",
      answer: "No. This tool only generates the cURL command text. You copy it and run it in your own terminal. No HTTP requests are made from your browser."
    },
    {
      question: "Are my API keys and tokens safe?",
      answer: "Yes. Everything stays in your browser. No data is sent to any server. The tool works entirely client-side — check the Network tab in DevTools to verify."
    },
    {
      question: "Does it support file uploads (-F)?",
      answer: "Not yet. File upload flags (-F, --form) require local file paths which can't be determined in a browser. You can use the Raw body type and manually add -F flags to the generated command."
    },
    {
      question: "Can I import an existing cURL command?",
      answer: "Import/parse functionality is planned for a future version. Currently you can build commands from scratch or use the presets as starting points."
    },
    {
      question: "Why are single quotes used for escaping?",
      answer: "Single quotes are the safest escaping method in bash/zsh. They prevent shell expansion of special characters ($, !, `, etc.) in URLs, headers, and body content. On Windows CMD, you may need to replace single quotes with double quotes."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `API requests often contain sensitive data — auth tokens, API keys, passwords, and proprietary payloads. This tool is designed for that reality.

- **100% client-side:** No server processing. Zero network requests with your data.
- **No storage:** Nothing is saved, cached, or persisted. Close the tab to clear everything.
- **No telemetry on content:** We track page views but never inspect or log your URLs, headers, tokens, or body content.
- **Offline capable:** After loading, works without an internet connection.
- **Transparent & auditable:** Verify the code yourself in browser DevTools.

Safe for building commands with production API keys, OAuth tokens, and sensitive payloads.`
  },

  stats: {
    "HTTP Methods": "7",
    "Auth Types": "4",
    "Body Formats": "3",
    "Processing": "Client-side"
  }
};
