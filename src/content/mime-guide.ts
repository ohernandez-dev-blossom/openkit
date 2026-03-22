/**
 * MIME Type Lookup Tool Guide Content
 * Comprehensive developer guide for MIME type reference
 */

import type { ToolGuideContent } from "./types";

export const mimeGuideContent: ToolGuideContent = {
  toolName: "MIME Type Lookup",
  toolPath: "/mime",
  lastUpdated: "2026-02-03",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Search by Extension",
      description: "Type a file extension like '.pdf', '.mp4', or '.json' to find its MIME type instantly. The search is case-insensitive and works with or without the leading dot."
    },
    {
      title: "Search by MIME Type",
      description: "If you have a MIME type and need to know what file extension it maps to, search for 'image/png' or 'application/json' to find the corresponding extensions."
    },
    {
      title: "Browse Categories",
      description: "Scroll through the database to explore MIME types organized by category: text, images, audio, video, fonts, archives, documents, and more."
    },
    {
      title: "Copy to Clipboard",
      description: "Click the 'Copy' button next to any MIME type to copy it directly to your clipboard for use in code, server configs, or HTTP headers."
    }
  ],

  introduction: {
    title: "What are MIME Types?",
    content: `MIME (Multipurpose Internet Mail Extensions) types are standardized labels that identify the nature and format of a file or data. Originally designed for email attachments, MIME types are now fundamental to how the web works - they tell browsers, servers, and applications how to handle different types of content.

Every file served over HTTP includes a Content-Type header with its MIME type. When your browser downloads an image, the server sends \`Content-Type: image/jpeg\` so the browser knows to display it as a picture rather than downloading it as a file.

### MIME Type Structure

MIME types follow a simple format: **type/subtype**

- **type**: The general category (text, image, audio, video, application, etc.)
- **subtype**: The specific format within that category (plain, html, jpeg, mp4, json)

Examples:
- \`text/plain\` - Plain text file
- \`text/html\` - HTML document
- \`image/jpeg\` - JPEG image
- \`application/json\` - JSON data
- \`video/mp4\` - MP4 video

Some MIME types also include parameters like charset: \`text/html; charset=utf-8\`

### Why MIME Types Matter

**Browser Rendering:** Browsers use MIME types to decide how to render content. A file served as \`text/html\` displays as a webpage, while \`application/octet-stream\` triggers a download dialog. Incorrect MIME types can cause security issues (MIME sniffing vulnerabilities) or broken functionality.

**Server Configuration:** Web servers like Nginx and Apache need MIME type mappings to serve files correctly. The \`.htaccess\` or nginx.conf files include type definitions that map file extensions to MIME types.

**API Development:** REST APIs use \`Content-Type\` headers to indicate request/response formats. Sending JSON data requires \`application/json\`, while file uploads might use \`multipart/form-data\`.

**File Uploads:** Validating uploaded files by MIME type prevents users from uploading malicious files with renamed extensions. Check both the extension AND the MIME type for security.

**CDN Configuration:** Content Delivery Networks use MIME types to determine caching strategies, compression eligibility, and delivery optimization. Static assets like images and fonts get different treatment than dynamic HTML.

### Common Categories

**Text formats:** HTML, CSS, JavaScript, JSON, XML, Markdown, CSV - all variations of text/\* or application/\*

**Images:** JPEG, PNG, GIF, WebP, SVG, ICO - served as image/\* types with varying browser support

**Audio/Video:** MP3, MP4, WebM, OGG - media types that browsers can play natively or via plugins

**Fonts:** WOFF, WOFF2, TTF, OTF - font/\* types essential for web typography

**Documents:** PDF, Word, Excel, PowerPoint - application/\* types for downloadable documents

**Archives:** ZIP, TAR, GZ, 7Z - compressed file formats for distribution

**Binary/Data:** application/octet-stream is the catch-all for unknown binary data, triggering downloads rather than inline display`
  },

  useCases: [
    {
      title: "Configure Web Server MIME Types",
      description: "Set up correct Content-Type headers in Nginx, Apache, or Caddy to serve files properly. Essential for SPAs, static sites, and file hosting.",
    },
    {
      title: "Build File Upload Validators",
      description: "Validate uploaded files by checking both extension and MIME type to prevent security vulnerabilities from renamed malicious files.",
    },
    {
      title: "Set HTTP Response Headers",
      description: "Configure correct Content-Type headers in API responses, file downloads, and static asset delivery for proper browser handling.",
    },
    {
      title: "Debug Content-Type Issues",
      description: "Troubleshoot files not rendering correctly in browsers - usually caused by missing or incorrect MIME type configuration on the server.",
    }
  ],

  howToUse: {
    title: "How to Use MIME Type Lookup",
    content: `### Finding a MIME Type

1. **By Extension:** Type the file extension in the search box (e.g., ".pdf", "mp4", "json")
2. **By MIME Type:** Search for the content type itself (e.g., "image/png", "application")
3. **By Description:** Search for what the file is (e.g., "video", "spreadsheet", "font")

### Using the Results

Each result shows:
- **Extension:** The file extension (e.g., .pdf)
- **MIME Type:** The Content-Type value (e.g., application/pdf)
- **Description:** Human-readable description of the file type

Click "Copy" to copy the MIME type string directly to your clipboard.

### Server Configuration Examples

**Nginx:**
\`\`\`nginx
types {
    application/javascript js mjs;
    application/json json;
    image/webp webp;
}
\`\`\`

**Apache (.htaccess):**
\`\`\`apache
AddType application/javascript .js .mjs
AddType application/json .json
AddType image/webp .webp
\`\`\`

**Express.js:**
\`\`\`javascript
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    }
  }
}));
\`\`\``,
    steps: [
      { name: "Search for extension", text: "Type the file extension you need the MIME type for" },
      { name: "Find the result", text: "Locate the matching MIME type in the results list" },
      { name: "Copy the MIME type", text: "Click Copy to add it to your clipboard" },
      { name: "Use in configuration", text: "Paste into your server config, code, or HTTP headers" }
    ]
  },

  faqs: [
    {
      question: "What's the difference between MIME type and file extension?",
      answer: "File extensions (.pdf, .jpg) are naming conventions that help humans identify files. MIME types (application/pdf, image/jpeg) are standardized identifiers that tell software how to handle content. A file can have any extension, but the MIME type indicates its actual format. For security, always validate MIME types, not just extensions."
    },
    {
      question: "What is application/octet-stream?",
      answer: "application/octet-stream is the generic MIME type for arbitrary binary data. When a server doesn't know a file's specific type, it uses this as a fallback, which typically triggers the browser to download the file rather than display it. It's also used intentionally when you want to force a download."
    },
    {
      question: "Why does my file download instead of displaying?",
      answer: "This usually means the server is sending the wrong Content-Type header (often application/octet-stream) or the Content-Disposition header is set to 'attachment'. Check your server configuration to ensure the correct MIME type is set for the file extension."
    },
    {
      question: "What MIME type should I use for JSON APIs?",
      answer: "Use application/json for JSON data in API responses. Some older systems use text/json but application/json is the standard. For JSONP callbacks, use application/javascript instead."
    },
    {
      question: "How do I serve WebAssembly files?",
      answer: "WebAssembly (.wasm) files should be served with Content-Type: application/wasm. Some browsers require this exact MIME type for streaming compilation to work. Check your web server configuration to add this mapping."
    },
    {
      question: "What's the correct MIME type for fonts?",
      answer: "Modern web fonts use: font/woff2 for WOFF2, font/woff for WOFF, font/ttf for TrueType, and font/otf for OpenType. Older configurations might use application/font-woff but the font/* types are now standard."
    }
  ],

  security: {
    title: "Privacy & Security",
    content: `### Client-Side Processing

All MIME type lookups happen entirely in your browser. No data is sent to any server - the complete MIME type database is included in the page and searches are performed locally using JavaScript.

### Using MIME Types Securely

When validating file uploads:
- **Never trust file extensions alone** - users can rename malicious files
- **Check the MIME type** from the file's magic bytes, not just the extension
- **Validate on the server** - client-side checks can be bypassed
- **Whitelist allowed types** - only accept specific MIME types you expect

\`\`\`javascript
// Server-side validation example (Node.js with file-type package)
import { fileTypeFromBuffer } from 'file-type';

async function validateUpload(buffer) {
  const type = await fileTypeFromBuffer(buffer);
  const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
  
  if (!type || !allowed.includes(type.mime)) {
    throw new Error('Invalid file type');
  }
}
\`\`\`

### MIME Sniffing Attacks

Some browsers try to guess MIME types from file content (MIME sniffing). This can be exploited by attackers uploading HTML disguised as images. Prevent this with:

\`\`\`
X-Content-Type-Options: nosniff
\`\`\`

This header tells browsers to respect the declared Content-Type and not attempt to sniff the content.`
  },

  stats: {
    "File Types": "70+",
    "Categories": "10",
    "Processing": "100% Client-side",
    "Data Sent": "Zero"
  }
};
