/**
 * Base64 Encoder/Decoder Tool Guide Content
 * Comprehensive developer guide for Base64 encoding
 */

import type { ToolGuideContent } from "./types";

export const base64GuideContent: ToolGuideContent = {
  toolName: "Base64 Encoder/Decoder",
  toolPath: "/base64",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Your Text or Upload File",
      description: "Type or paste text into the input field, or drag and drop a file (images, documents, any binary data). The encoder handles both text and binary files seamlessly."
    },
    {
      title: "Choose Encode or Decode",
      description: "Click 'Encode' to convert your input to Base64 format, or 'Decode' to convert Base64 back to original text/file. The tool automatically detects invalid Base64 strings."
    },
    {
      title: "Configure Options",
      description: "Select text encoding (UTF-8, ASCII, Unicode) and choose whether to enable URL-safe Base64 format. URL-safe Base64 replaces + and / with - and _ for safe use in URLs."
    },
    {
      title: "Copy or Download Result",
      description: "Copy the encoded/decoded result to clipboard with one click, or download as a file. For binary data, download preserves the original file format after decoding."
    }
  ],

  introduction: {
    title: "What is Base64 Encoding?",
    content: `Base64 is a binary-to-text encoding scheme that converts binary data into ASCII string format using a 64-character alphabet. Developed in the 1980s, Base64 has become the standard method for encoding binary data in text-based formats like JSON, XML, and email (MIME).

The encoding works by dividing binary data into 6-bit chunks and mapping each chunk to one of 64 printable ASCII characters: A-Z, a-z, 0-9, +, and /. This allows binary data (images, files, certificates) to be transmitted over text-only channels that historically only supported 7-bit ASCII.

### Key Characteristics of Base64

- **Text-Safe Encoding:** Converts any binary data into printable ASCII characters, making it safe to transmit through text-based protocols like HTTP, JSON, XML, and email that may corrupt binary data.
- **Predictable Size Increase:** Base64 encoding increases data size by approximately 33% (4 characters for every 3 bytes of input). This overhead is the trade-off for text compatibility.
- **Reversible Transformation:** Base64 is encoding, not encryption. Anyone can decode Base64 strings back to original data without a key. Never use Base64 for security purposes.
- **Padding Characters:** Uses '=' characters to pad the output to a multiple of 4 characters, ensuring proper decoding even when input length isn't divisible by 3.

### Why Developers Use Base64

Base64 encoding is essential in modern web development for several critical use cases. Embedding small images directly in HTML/CSS as Data URLs eliminates additional HTTP requests, improving page load performance. JSON APIs can transmit binary attachments (PDFs, images, files) as Base64 strings since JSON is text-only and cannot natively handle binary data.

Email systems rely on MIME Base64 encoding to send attachments through text-based SMTP protocol. Authentication tokens (JWT), API keys, and certificates use Base64 to encode binary signatures and cryptographic data for safe transmission in HTTP headers and URLs.

Web developers encounter Base64 daily when working with image uploads, file attachments in REST APIs, authentication systems, data serialization, and cross-origin resource embedding. Understanding Base64 encoding is fundamental to web architecture.

### Base64 vs Other Encodings

Unlike Hex encoding (Base16) which uses 0-9 and A-F resulting in 100% size increase, Base64 is more efficient with only 33% overhead. URL encoding (percent encoding) escapes special characters but doesn't convert binary to text format. Base64 URL-safe variant (+/ → -_) allows encoded data to be used in URLs without percent encoding.`
  },

  useCases: [
    {
      title: "Data URLs for Images in CSS/HTML",
      description: "Embed small images (icons, logos, backgrounds) directly in HTML or CSS to reduce HTTP requests and improve page load performance. Data URLs use Base64 to encode image bytes as inline strings.",
      example: `<!-- Before: External image request -->
<img src="/icons/logo.png" alt="Logo" />

<!-- After: Inline Base64 data URL (no request) -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." alt="Logo" />

/* CSS Background Image */
.icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0i...);
}`
    },
    {
      title: "API File Attachments in JSON",
      description: "Send file uploads (PDFs, images, documents) through JSON REST APIs by Base64 encoding the binary file data. JSON cannot natively handle binary data, so Base64 encoding converts files to text strings.",
      example: `// Upload file via JSON API
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

// Read file and encode to Base64
const reader = new FileReader();
reader.onload = async () => {
  const base64 = reader.result.split(',')[1]; // Remove data URL prefix

  await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      data: base64,
      mimeType: file.type
    })
  });
};
reader.readAsDataURL(file);`
    },
    {
      title: "JWT Token Encoding",
      description: "JSON Web Tokens (JWT) use URL-safe Base64 encoding for header and payload sections. JWTs encode authentication claims as Base64 strings for safe transmission in HTTP Authorization headers and cookies.",
      example: `// JWT Structure: header.payload.signature
// Each part is Base64 URL-safe encoded JSON

// Header (Base64 encoded)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// Decodes to: {"alg":"HS256","typ":"JWT"}

// Payload (Base64 encoded)
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0
// Decodes to: {"sub":"1234567890","name":"John Doe"}

// Full JWT
Authorization: Bearer eyJhbGciOi...`
    },
    {
      title: "Email MIME Attachments",
      description: "Email protocols (SMTP, IMAP) are text-based and use Base64 encoding to send file attachments. MIME Content-Transfer-Encoding: base64 header indicates Base64-encoded binary data in email messages.",
      example: `Content-Type: application/pdf; name="document.pdf"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="document.pdf"

JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAw...
(Base64 encoded PDF data)
...bnN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjE4NDIK%%EOF`
    }
  ],

  howToUse: {
    title: "How to Use This Base64 Tool",
    content: `This Base64 encoder/decoder provides instant client-side encoding with support for both text and binary files. All processing happens in your browser using JavaScript's built-in btoa() and atob() functions, ensuring your data remains private and processing is instantaneous.

### Encoding Text to Base64

Type or paste your text into the input field and click "Encode". The tool converts text to Base64 using UTF-8 encoding by default, which properly handles international characters, emojis, and special symbols. For ASCII-only text, select ASCII encoding for slightly smaller output.

### Decoding Base64 to Text

Paste a Base64 string and click "Decode". Invalid Base64 strings trigger an error message showing the problem (invalid character, incorrect padding, malformed string). The decoder automatically handles both standard and URL-safe Base64 formats.

### Encoding Files to Base64

Drag and drop any file (images, PDFs, documents, archives) onto the input area, or click to browse. The tool reads the binary file data and encodes it to Base64. Large files (10MB+) may take a few seconds to encode.

### Advanced Options

**Text Encoding:** Choose UTF-8 (default, supports all Unicode), ASCII (English only, smaller output), or UTF-16 (legacy, larger output).

**URL-Safe Base64:** Enable to replace + and / with - and _ characters. Required for Base64 in URLs, filenames, or anywhere + and / have special meaning. JWT tokens always use URL-safe Base64.

**Line Breaking:** Add line breaks every 76 characters to match MIME email format. Disable for compact single-line output suitable for JSON or data URLs.

### Keyboard Shortcuts

- **Cmd/Ctrl+Enter:** Encode/Decode (primary action)
- **Cmd/Ctrl+K:** Clear all fields
- **Cmd/Ctrl+C:** Copy output to clipboard`,
    steps: [
      {
        name: "Enter Data",
        text: "Type text or drag and drop a file into the input area. The tool automatically detects text vs. binary data."
      },
      {
        name: "Select Operation",
        text: "Click 'Encode' to convert to Base64, or 'Decode' to convert Base64 back to original format."
      },
      {
        name: "Configure Options",
        text: "Choose text encoding (UTF-8 recommended), enable URL-safe format if needed, and set line breaking preferences."
      },
      {
        name: "Copy or Download",
        text: "Use the Copy button for text output, or Download button for binary files. Decoded binary data downloads with original file extension."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between standard and URL-safe Base64?",
      answer: "Standard Base64 uses the character set A-Z, a-z, 0-9, +, and / with = for padding. URL-safe Base64 replaces + with - and / with _ to avoid conflicts in URLs where + means space and / is a path separator. JWT tokens, query parameters, and filenames should use URL-safe Base64. JSON data URLs and email attachments typically use standard Base64."
    },
    {
      question: "Why does Base64 increase file size by 33%?",
      answer: "Base64 encodes every 3 bytes (24 bits) of input into 4 characters (24 bits = 4 × 6 bits per Base64 character). This 3→4 conversion means 4/3 = 1.33x size increase. For example, a 3KB file becomes approximately 4KB when Base64 encoded. This overhead is the cost of converting binary data to text-safe ASCII characters. Gzip compression can recover much of this overhead when transmitting Base64 over HTTP."
    },
    {
      question: "Is Base64 encoding secure or encrypted?",
      answer: "No. Base64 is encoding, not encryption. Anyone can decode Base64 strings back to original data without any key or password. Base64 is designed for data compatibility (making binary data text-safe), not security. Never use Base64 to hide sensitive data like passwords or API keys. For security, use proper encryption (AES, RSA) first, then Base64-encode the encrypted output if needed for text transmission."
    },
    {
      question: "Can I encode large files (100MB+)?",
      answer: "Browser JavaScript can handle files up to ~100-200MB depending on available memory, but encoding very large files may freeze the browser tab during processing. For files over 50MB, consider server-side encoding or chunked processing. For production file uploads, send raw binary data (multipart/form-data) instead of Base64 to avoid the 33% size increase and processing overhead."
    },
    {
      question: "What is the '=' padding in Base64?",
      answer: "Base64 output must be a multiple of 4 characters. When input length isn't divisible by 3, padding characters (=) are added to reach the next multiple of 4. For example, 'A' encodes to 'QQ==' (2 padding characters), 'AB' encodes to 'QUI=' (1 padding character). The decoder uses padding to determine exactly how many bytes were in the original input. Some URL-safe implementations omit padding since it can be recalculated during decoding."
    },
    {
      question: "Why do Data URLs start with 'data:image/png;base64,'?",
      answer: "Data URLs use the format data:[MIME-type];base64,[Base64-data] to embed resources inline in HTML/CSS. The MIME type (image/png, text/html, application/pdf) tells the browser how to interpret the decoded data. The ;base64 flag indicates the data is Base64-encoded (as opposed to URL-encoded). This prefix is required for browsers to properly decode and render the embedded resource."
    },
    {
      question: "Can Base64 decode fail?",
      answer: "Yes. Invalid Base64 strings cause decoding errors: invalid characters (only A-Z, a-z, 0-9, +, /, = allowed), incorrect padding (must end with 0, 1, or 2 '=' characters), or malformed structure. Common causes include copying partial Base64 strings, mixing standard and URL-safe formats, or corruption during transmission. The error message indicates the specific problem to help debug."
    },
    {
      question: "Should I use Base64 for storing files in databases?",
      answer: "Generally no. Storing Base64 in databases wastes 33% more space and requires encoding/decoding overhead on every read/write. Modern databases (PostgreSQL, MySQL, MongoDB) have native BLOB/binary column types that store files efficiently. Use binary columns or file storage services (S3, blob storage) instead. Only use Base64 in databases when you need text-only compatibility (e.g., legacy systems that don't support binary data)."
    },
    {
      question: "How do I encode special characters and emojis?",
      answer: "Use UTF-8 encoding (the default in this tool) which properly handles all Unicode characters including emojis (😀), accented letters (é, ñ, ü), Asian characters (中文, 日本語), and symbols (€, ™, ©). ASCII encoding only supports basic English characters (A-Z, 0-9) and will fail on special characters. UTF-16 encoding works but produces larger output than UTF-8 for most text."
    },
    {
      question: "Is my data private when using this tool?",
      answer: "Absolutely. All Base64 encoding and decoding happens entirely in your browser using client-side JavaScript. Your text and files never leave your device or get sent to any servers. No data is uploaded, logged, or stored. You can verify this by disconnecting from the internet - the tool still works offline. Safe for encoding sensitive documents, API keys, or any confidential data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your data never leaves your browser. This Base64 encoder/decoder operates entirely client-side using JavaScript's native btoa() (encode) and atob() (decode) functions built into your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All encoding and decoding happens in your browser's JavaScript engine. Files and text stay on your device.
- **No Server Uploads:** We don't have servers to process your data. The tool works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what you encode/decode, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - you'll see zero outbound requests containing your data.

This makes the tool safe for encoding sensitive data like API keys, authentication tokens, private documents, confidential files, or any proprietary data. Use with confidence for production debugging, file uploads, or handling regulated data (HIPAA, GDPR, PCI-DSS).`
  },

  stats: {
    "Encoding Speed": "<50ms",
    "Max File Size": "100MB",
    "Size Overhead": "+33%",
    "Character Set": "64 chars",
    "Server Uploads": "0"
  }
};
