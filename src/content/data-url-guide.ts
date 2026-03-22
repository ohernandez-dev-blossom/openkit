/**
 * Data URL Converter Tool Guide Content
 * Comprehensive developer guide for Data URL encoding and decoding
 */

import type { ToolGuideContent } from "./types";

export const dataUrlGuideContent: ToolGuideContent = {
  toolName: "Data URL Converter",
  toolPath: "/data-url",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Upload or Paste Data",
      description: "Upload files (images, fonts, icons, JSON) or paste existing Data URLs. Supports images (PNG, JPEG, SVG, WebP), fonts (WOFF, TTF), and any file type up to reasonable browser limits."
    },
    {
      title: "Choose Encoding",
      description: "Select Base64 encoding (binary files) or plain text encoding (SVG, text). Base64 converts binary to text-safe format. Plain text is more readable for SVG and small text files."
    },
    {
      title: "Copy Data URL",
      description: "Get complete data URL string with MIME type and encoded data. Format: data:[mimetype];[encoding],[data]. Use directly in HTML, CSS, or JavaScript."
    },
    {
      title: "Embed in Code",
      description: "Paste Data URL into img src, CSS backgrounds, fetch() calls, or icon libraries. Eliminates separate file requests, reduces HTTP overhead, enables offline functionality."
    }
  ],

  introduction: {
    title: "What are Data URLs?",
    content: `Data URLs (Data URIs) embed file contents directly into HTML, CSS, or JavaScript using base64 or plain text encoding instead of referencing external files. Format: \`data:[MIME-type];[encoding],[data]\`. Instead of loading image.png via HTTP request, encode the entire PNG as base64 string and embed inline, eliminating network latency and reducing dependencies.

Web developers use Data URLs for small assets (icons, logos, inline images), email HTML templates (embed images for offline viewing), CSS stylesheets (background images), font files (WOFF2 embedded in CSS), and single-file HTML applications. Performance benefit: eliminates HTTP round trips for small files. Drawbacks: increases HTML/CSS file size, defeats browser caching, and makes debugging harder.

### Why Data URLs Matter for Developers

**Reduced HTTP Requests:** Each external asset (image, font, icon) requires separate HTTP request adding latency. Data URLs embed assets inline, reducing request count. Critical for high-latency networks or when minimizing page load time. Bundling small icons as Data URLs faster than multiple icon file requests.

**Offline Functionality:** Single-file HTML applications with embedded Data URLs work offline without web server. Export interactive reports, dashboards, or documentation as single HTML file with all assets embedded. Recipients open file in browser without hosting infrastructure.

**Email HTML Templates:** Email clients often block external images for privacy/security. Embedding images as Data URLs ensures they display immediately without user interaction. Marketing emails, automated reports, and transactional emails use Data URLs for logos and icons to guarantee rendering.

**CSS Sprite Replacement:** Before HTTP/2, developers combined images into sprites to reduce requests. Data URLs offer alternative: embed small icons directly in CSS. No sprite positioning calculations needed. With HTTP/2 multiplexing reducing request overhead, Data URLs less critical but still useful for tiny assets.

**Font Embedding:** Web fonts (WOFF, WOFF2, TTF) can be encoded as Data URLs and embedded in CSS @font-face rules. Eliminates Flash Of Unstyled Text (FOUT) by loading fonts synchronously. Increases CSS file size but guarantees font availability.

**JavaScript Fetch & Canvas:** Generate images dynamically in JavaScript, convert to Data URL via canvas.toDataURL(), then display or download. Create thumbnails, apply filters, or generate PDFs client-side and offer downloads using Data URLs without server processing.

### Data URL Format Specification

**MIME Type:** Identifies file type: \`image/png\`, \`image/jpeg\`, \`image/svg+xml\`, \`application/font-woff2\`, \`application/json\`, \`text/html\`. Browser uses MIME type to render content correctly.

**Encoding:** Either \`;base64\` for binary files or omitted for text. Base64 converts binary data to ASCII-safe text using A-Z, a-z, 0-9, +, / characters. Plain text used for SVG or JSON when smaller than base64 (no encoding overhead).

**Data Payload:** Actual file contents encoded as specified. Base64 increases size ~33% over original binary. URL-encoded text may be larger than base64 for complex content.

Example Data URL: \`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...\`

### Performance Considerations

**Size Threshold:** Use Data URLs only for files under ~10KB. Larger files defeat caching benefits and bloat HTML/CSS. Images >10KB should be separate files cached by browser. Data URLs re-transmitted on every page load.

**Browser Caching:** Data URLs embedded in HTML/CSS cached when parent document cached, but can't be cached separately across pages. If same logo appears on multiple pages, external file cached once. Data URL duplicated in each page's HTML.

**Base64 Overhead:** Base64 encoding increases file size 33%. 6KB image becomes ~8KB Data URL. Trade-off: 1 larger HTML file vs 2 smaller requests (HTML + image). Benchmark for your use case.

**HTTP/2 Multiplexing:** HTTP/2 allows multiple requests over single connection reducing request overhead that motivated Data URLs. For modern browsers with HTTP/2, external small files nearly as fast as Data URLs. Consider build complexity vs performance gain.

This tool converts files to properly formatted Data URLs with automatic MIME type detection and optimal encoding selection. All processing happens client-side - uploaded files never leave your browser.`
  },

  useCases: [
    {
      title: "Embed Logo in Single-File HTML App",
      description: "Create self-contained HTML file with embedded logo, eliminating external dependencies. Export reports, documentation, or dashboards as single HTML file that works offline without web server.",
      example: `<!-- Traditional: separate image file -->
<img src="logo.png" alt="Logo">
<!-- Requires logo.png file, HTTP request, web server -->

<!-- Data URL: embedded logo -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Logo">
<!-- No external file, works offline, single HTML file -->

<!-- Use case: Export dashboard as report.html -->
<!-- All charts, logos, icons embedded as Data URLs -->
<!-- Share file via email, Slack, or download -->
<!-- Recipient opens in any browser, no hosting needed -->`
    },
    {
      title: "CSS Background Images for Icons",
      description: "Embed small icons and decorative images directly in CSS stylesheets, eliminating separate icon file requests. Useful for UI components, buttons, and decorative elements under 5KB.",
      example: `/* Traditional: External icon file */
.btn-search {
  background-image: url('/icons/search.png');
  /* Requires separate HTTP request */
}

/* Data URL: Embedded icon */
.btn-search {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANS
  UhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U2
  9mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAlSURBVHjaYvz//z8DxQ...');
  /* No HTTP request, loads with CSS */
}

/* Benefits:
- Single CSS file contains all small icons
- No icon sprite positioning calculations
- Works offline immediately
- Reduces latency on slow connections

Drawbacks:
- Increases CSS file size
- Can't cache icon separately
- Harder to update individual icons */`
    },
    {
      title: "Email HTML with Embedded Images",
      description: "Create email templates with embedded logos and images that display immediately without external image loading. Email clients block external images by default - Data URLs bypass this restriction.",
      example: `<!-- Email HTML template with Data URL logo -->
<!DOCTYPE html>
<html>
<head>
  <title>Weekly Report</title>
</head>
<body>
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..."
       alt="Company Logo"
       width="200">
  <h1>Weekly Sales Report</h1>
  <p>This week's performance metrics...</p>

  <!-- Embedded chart image -->
  <img src="data:image/png;base64,R0lGODlhPQBEAPeoAJosM..."
       alt="Sales Chart">
</body>
</html>

<!-- Why Data URLs for email:
1. External images blocked by Gmail, Outlook for security
2. Users must "Load Images" to see external assets
3. Data URLs display immediately, no user action
4. Guaranteed rendering in all email clients
5. Self-contained, works without web server -->`
    },
    {
      title: "Dynamic Image Generation with Canvas",
      description: "Generate images client-side using HTML5 Canvas API, convert to Data URL, then display or download. Create thumbnails, apply filters, generate QR codes, or produce charts without server-side processing.",
      example: `// Generate dynamic image and convert to Data URL
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 150;

// Draw content
ctx.fillStyle = '#3B82F6';
ctx.fillRect(0, 0, 300, 150);
ctx.fillStyle = 'white';
ctx.font = '24px Arial';
ctx.fillText('Generated Image', 50, 80);

// Convert to Data URL
const dataUrl = canvas.toDataURL('image/png');
console.log(dataUrl);
// "data:image/png;base64,iVBORw0KGgo..."

// Display in img element
const img = document.createElement('img');
img.src = dataUrl;
document.body.appendChild(img);

// Or trigger download
const link = document.createElement('a');
link.download = 'generated.png';
link.href = dataUrl;
link.click();

// Use cases:
// - Client-side thumbnail generation
// - QR code generation
// - Chart rendering
// - Image filters and effects
// - PDF generation (via jsPDF + canvas)`
    }
  ],

  howToUse: {
    title: "How to Use This Data URL Converter",
    content: `This tool converts files to Data URLs with automatic MIME type detection, encoding selection, and validation. All file processing happens client-side using FileReader API - uploaded files never leave your browser.

### Converting Files to Data URLs

Click upload button or drag-and-drop files into input area. Supported file types: images (PNG, JPEG, SVG, GIF, WebP), fonts (WOFF, WOFF2, TTF), documents (JSON, HTML, CSS, XML), and any file type browsers support.

Tool automatically detects MIME type from file extension and content. PNG files get \`image/png\`, SVG gets \`image/svg+xml\`, WOFF2 gets \`application/font-woff2\`. MIME type critical for browser to render content correctly.

### Choosing Encoding

**Base64 Encoding:** Required for binary files (images, fonts, compiled assets). Converts binary data to ASCII-safe text. Increases size ~33% but ensures data integrity. Use for PNG, JPEG, WOFF, PDF, ZIP, and all binary formats.

**Plain Text Encoding:** Optional for text-based formats (SVG, JSON, HTML, CSS). Keeps content human-readable. URL-encodes special characters. Sometimes smaller than base64 for simple SVG. Easier to debug and edit inline.

Tool recommends optimal encoding based on file type. Override default if needed for specific use cases.

### Using Data URLs in Code

**HTML Images:** Replace \`<img src="image.png">\` with \`<img src="data:image/png;base64,...">\`. Works identically but loads instantly without HTTP request.

**CSS Backgrounds:** Use \`background-image: url(data:image/png;base64,...);\` in stylesheets. Embed small icons, textures, or decorative elements.

**JavaScript Fetch:** Use Data URLs with \`fetch(dataUrl)\` to load embedded resources. Useful for service workers, offline apps, or bundled applications.

**Canvas & Image Processing:** Set \`img.src = dataUrl\` to display canvas-generated images. Use for thumbnails, filters, or dynamic graphics.

### Size Limitations

Browsers impose Data URL size limits: Chrome/Firefox ~100MB (impractical due to memory), Safari ~10MB, Internet Explorer ~32KB. Practical limit: keep Data URLs under 100KB for performance. Use external files for larger assets.

Large Data URLs increase HTML/CSS file size, slow parsing, and consume memory. Benchmark page load times before embedding large assets. Consider lazy loading external files for better performance.`,
    steps: [
      {
        name: "Upload File",
        text: "Click upload button or drag file into input area. Supports images, fonts, JSON, SVG, and most web asset types.",
      },
      {
        name: "Select Encoding",
        text: "Choose base64 for binary files (images, fonts) or plain text for SVG/JSON if smaller and more readable.",
      },
      {
        name: "Copy Data URL",
        text: "Click copy button to grab complete Data URL string including MIME type, encoding, and data payload.",
      },
      {
        name: "Embed in Code",
        text: "Paste Data URL into HTML img src, CSS background-image, or JavaScript code. Works immediately without external files.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the maximum size for Data URLs?",
      answer: "Browser limits: Chrome/Firefox ~100MB, Safari ~10MB, Internet Explorer ~32KB. Practical recommendation: keep Data URLs under 100KB for performance. Large Data URLs bloat HTML/CSS, slow page load, increase memory usage, and defeat caching benefits. Use external files for assets >100KB. Base64 encoding adds 33% overhead - 75KB file becomes 100KB Data URL. Test real-world page load before embedding large assets."
    },
    {
      question: "Should I use Data URLs or external files?",
      answer: "Use Data URLs for: small assets <10KB (icons, tiny images), email HTML templates (embedded images), single-file HTML apps (offline functionality), critical above-fold images (eliminate render-blocking requests). Use external files for: assets >10KB (defeats caching), reused assets across pages (cache once, reference multiple times), frequently updated assets (modify file vs regenerate Data URL), large libraries (fonts >50KB). Benchmark both approaches for your specific use case."
    },
    {
      question: "Can I decode Data URLs back to files?",
      answer: "Yes, Data URLs are reversible. Split URL at comma: before comma is metadata (MIME type, encoding), after comma is base64 data. Decode base64 string to binary using atob() in JavaScript or base64 decoder in other languages. Extract MIME type to determine file extension. Save binary as file. This tool supports both encoding (file → Data URL) and decoding (Data URL → file download) for round-trip conversion."
    },
    {
      question: "Why is my Data URL bigger than the original file?",
      answer: "Base64 encoding increases size ~33% due to converting 8-bit binary to 6-bit ASCII-safe characters. Example: 60KB PNG becomes ~80KB Data URL. This overhead is acceptable for small files where eliminating HTTP request saves time. For large files, 33% overhead plus lack of caching makes external files more efficient. Use Data URLs only when network latency savings outweigh size increase. HTTP/2 multiplexing reduces request overhead making external files more attractive."
    },
    {
      question: "Do Data URLs work in all browsers?",
      answer: "Yes, all modern browsers support Data URLs: Chrome, Firefox, Safari, Edge since IE8+. Limitations: Internet Explorer has 32KB Data URL limit (avoid in IE). Safari mobile has 10MB limit. Very old browsers (IE6-7) don't support Data URLs. Test in target browsers if supporting legacy environments. Modern browsers handle Data URLs identically to external resources. MIME type must be correct or browsers reject content."
    },
    {
      question: "Can Data URLs be cached by browsers?",
      answer: "Data URLs don't cache independently - they cache with parent HTML/CSS file. If logo embedded as Data URL in index.html, it's cached when index.html is cached. If same logo used on multiple pages, it's duplicated in each page's HTML (not cached once like external image). External files cached separately across all pages referencing them. For repeated assets, external files provide better caching. For one-time assets or single-page apps, Data URLs acceptable."
    },
    {
      question: "How do I use Data URLs in CSS?",
      answer: "Use in any CSS property accepting URLs: background-image: url(data:image/png;base64,...); list-style-image: url(data:...); cursor: url(data:...); @font-face { src: url(data:application/font-woff2;base64,...); }. Embed small icons, backgrounds, cursors, or fonts. Keep CSS file size reasonable - one large Data URL tolerable, dozens of large Data URLs bloat stylesheet. Consider bundling small icons as Data URLs, large images as external files."
    },
    {
      question: "What MIME types are supported?",
      answer: "All browser-supported MIME types work: image/* (png, jpeg, gif, svg+xml, webp), application/* (font-woff, font-woff2, json, pdf), text/* (html, css, plain, xml), audio/* (mpeg, wav), video/* (mp4, webm). Browser uses MIME type to determine rendering. Incorrect MIME type causes display errors - image/png labeled as image/jpeg may not render. This tool auto-detects correct MIME type from file extension and content for reliability."
    },
    {
      question: "Can I edit Data URLs after generation?",
      answer: "Technically yes but impractical. Data URLs are long base64 strings - editing encoded data breaks content. To modify: decode Data URL to file, edit file in appropriate tool (image editor, text editor), re-encode to Data URL. Don't manually edit base64 data unless you're debugging specific bytes. For text formats (SVG, JSON) with plain text encoding, you can carefully edit URL-encoded content, but easier to decode → edit source → re-encode."
    },
    {
      question: "Is my uploaded file private and secure?",
      answer: "Absolutely. All Data URL conversion happens entirely in your browser using FileReader API and base64 encoding functions. Uploaded files never leave your device or get uploaded to servers. No network requests are made with file contents. Verify by opening browser DevTools Network tab - zero uploads. Safe for converting confidential images, proprietary fonts, sensitive documents, or any private files. Tool works completely offline after page load. File contents processed in browser memory, then discarded."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your files never leave your browser. This Data URL converter operates entirely client-side using FileReader API and JavaScript base64 encoding. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All file reading and encoding happens in your browser. Files stay on your device.
- **No Server Uploads:** We don't have backend servers to process files. The tool works completely offline after first page load.
- **No Data Storage:** Your uploaded files and generated Data URLs are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you upload, file names, file types, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your files.

Safe for converting confidential images, proprietary logos, brand assets, sensitive documents, or any private files. Use with confidence for commercial projects, client work, or personal assets requiring Data URL encoding.`
  },

  stats: {
    "Max File Size": "100MB",
    "Base64 Overhead": "+33%",
    "MIME Types": "All",
    "Performance": "<100ms",
    "Server Uploads": "0"
  }
};
