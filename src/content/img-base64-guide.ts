/**
 * Image to Base64 Converter Tool Guide Content
 * Comprehensive developer guide for image Base64 encoding
 */

import type { ToolGuideContent } from "./types";

export const imgBase64GuideContent: ToolGuideContent = {
  toolName: "Image to Base64 Converter",
  toolPath: "/img-base64",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Upload Image File",
      description: "Drag-and-drop or click to upload PNG, JPEG, SVG, GIF, or WebP images. Supports files up to 10MB. Preview shows uploaded image before conversion."
    },
    {
      title: "Auto-Convert to Base64",
      description: "Instant conversion to Base64 Data URL format. Includes MIME type prefix (data:image/png;base64,) and complete encoded string ready for embedding."
    },
    {
      title: "Copy Base64 String",
      description: "Click copy button to grab full Data URL. Use directly in HTML img src, CSS backgrounds, or JavaScript without external file dependencies."
    },
    {
      title: "Embed in Code",
      description: "Paste Base64 string into HTML/CSS/JS. Eliminates HTTP requests for small images, enables offline functionality, perfect for email templates and single-file applications."
    }
  ],

  introduction: {
    title: "What is Image to Base64 Conversion?",
    content: `Image to Base64 conversion encodes binary image data as ASCII text string using Base64 algorithm, enabling image embedding directly in HTML, CSS, or JavaScript without external files. Format: \`data:image/[type];base64,[encoded-data]\`. Instead of \`<img src="logo.png">\` requiring HTTP request, use \`<img src="data:image/png;base64,iVBORw0KGgo...">\` embedding entire image inline, reducing page load dependencies and enabling offline functionality.

Base64 encoding converts binary image bytes to text-safe characters (A-Z, a-z, 0-9, +, /) that survive text transmission through email, JSON, XML, or URL parameters. Original image binary might contain control characters or null bytes breaking text protocols. Base64 ensures safe transmission through any text channel. Trade-off: increases size ~33% over original binary.

### Why Convert Images to Base64

**Reduce HTTP Requests:** Each external image requires separate HTTP request adding latency. Small images (icons, logos under 10KB) load faster embedded as Base64 than separate file requests, especially on high-latency mobile networks. Critical for above-the-fold images preventing render blocking.

**Email HTML Templates:** Email clients block external images by default for security/privacy. Base64-embedded images display immediately without user clicking "Load Images". Marketing emails, transactional emails, and newsletters use Base64 for logos and essential graphics ensuring guaranteed rendering.

**Single-File HTML Applications:** Export dashboards, reports, or documentation as single HTML file with all images embedded. Recipients open file in browser without web server or additional assets. Perfect for sharing interactive reports, offline-capable web apps, or HTML-based deliverables.

**CSS Data URLs:** Embed small background images, icons, or textures directly in CSS stylesheets. Eliminates separate image requests for UI elements. Common for icon fonts alternatives, loading spinners, or decorative elements. CSS file becomes self-contained with embedded graphics.

**Offline Progressive Web Apps (PWAs):** Service workers cache Base64-embedded images more reliably than external files. Critical assets embedded as Base64 ensure offline functionality. Manifest icons, splash screens, and essential UI graphics work without network.

**Canvas & Dynamic Images:** JavaScript generates images using Canvas API, converts to Base64 via canvas.toDataURL(), then displays or downloads. Client-side image manipulation (thumbnails, filters, watermarks) outputs Base64 for display without server uploads.

### Base64 Encoding Mechanics

**Algorithm:** Base64 converts 3 bytes (24 bits) binary data to 4 ASCII characters (6 bits each). Padding with = when input not multiple of 3 bytes. All modern browsers and tools support Base64 decode/encode natively.

**Size Increase:** Base64 adds ~33% overhead. 6KB image becomes ~8KB Base64 string. For images >10KB, overhead significant - external files with caching more efficient. Use Base64 only for small images where request savings outweigh size increase.

**MIME Type Prefix:** Data URL format requires MIME type: \`data:image/png;base64,\` tells browser how to decode and render. PNG uses image/png, JPEG uses image/jpeg, SVG uses image/svg+xml. Incorrect MIME type causes rendering failures.

**Browser Limits:** Most browsers support Data URLs up to 2-10MB (varies by browser). Internet Explorer has 32KB Data URL limit (avoid in IE). Modern browsers handle large Data URLs but performance degrades - use external files for images >100KB.

### Supported Image Formats

**PNG:** Lossless format supporting transparency. Best for logos, icons, screenshots. Larger file sizes than JPEG but perfect quality. Compresses well with Base64 for simple graphics.

**JPEG/JPG:** Lossy compression for photos. Smaller file sizes than PNG. No transparency support. Ideal for photographic content embedded in emails or reports.

**SVG:** XML-based vector format. Can use plain text encoding (often smaller than Base64 for simple SVGs) or Base64. Scales without quality loss. Perfect for icons and logos.

**GIF:** Supports animation and transparency. Larger than PNG for static images. Use when animation required or legacy compatibility needed.

**WebP:** Modern format with better compression than PNG/JPEG. Not universally supported (older browsers). Excellent for new projects targeting modern browsers.

All conversion happens client-side using FileReader API - your images never leave your browser.`
  },

  useCases: [
    {
      title: "Embed Logo in Email Newsletter",
      description: "Convert company logo to Base64 and embed in HTML email template. Ensures logo displays immediately without external image loading. Email clients show embedded images even with images blocked by default.",
      example: `<!-- Traditional email: external image -->
<img src="https://cdn.example.com/logo.png" alt="Logo">
<!-- Blocked by default in Gmail, Outlook -->
<!-- User must click "Load Images" -->

<!-- Base64 embedded: displays immediately -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA
ABQAAAASCAIAAAD8tzzdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW
FnZVJlYWR5ccllPAAAA..." alt="Logo" width="200">
<!-- Shows immediately, no user action required -->

<!-- Use for:
- Company logos in newsletters
- Product images in transactional emails
- Icons for email signatures
- Charts/graphs in reports
- Guaranteed rendering across email clients -->`
    },
    {
      title: "Create Offline-Capable HTML Report",
      description: "Export business dashboard or analytics report as single HTML file with all charts and images embedded as Base64. Share via email or Slack - opens in any browser without web server or internet connection.",
      example: `<!DOCTYPE html>
<html>
<head>
  <title>Q4 Sales Report</title>
</head>
<body>
  <h1>Q4 2025 Sales Performance</h1>

  <!-- Embedded logo -->
  <img src="data:image/png;base64,iVBORw0..." alt="Company Logo">

  <!-- Embedded sales chart -->
  <img src="data:image/png;base64,iVBORw0..." alt="Sales Chart">

  <!-- All images embedded - no external dependencies -->
  <p>Total Revenue: $2.5M (+15% YoY)</p>

  <!-- Single file containing:
  - HTML structure
  - CSS styles (can be inline)
  - All images (Base64 embedded)
  - Works offline
  - Email-friendly
  - No web hosting required -->`
    },
    {
      title: "CSS Background Icons",
      description: "Embed small UI icons directly in CSS as Base64 background images. Eliminates separate HTTP requests for icons, reduces page load overhead, keeps stylesheets self-contained.",
      example: `/* Traditional: external icon file */
.btn-search {
  background-image: url('/icons/search.svg');
  /* Requires HTTP request */
  /* Separate file to manage */
}

/* Base64 embedded icon */
.btn-search {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4
bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC
IgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTE1Ljkg...');
  /* No HTTP request */
  /* Self-contained CSS */
}

/* Benefits:
- Single CSS file contains styles + small images
- Faster load on high-latency connections
- No CORS issues (same-origin)
- Works offline immediately
- Ideal for icons under 5KB

Drawbacks:
- Larger CSS file size
- Can't cache icon separately
- Harder to update individual icons
- Use only for small, stable icons -->`
    },
    {
      title: "Dynamic Thumbnail Generation",
      description: "Generate image thumbnails client-side using Canvas API, convert to Base64, display or download without server processing. Create image previews, apply filters, or watermark images entirely in browser.",
      example: `// Load image, create thumbnail, convert to Base64
function generateThumbnail(imageFile, maxWidth = 200) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for thumbnail
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate dimensions
        const ratio = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ratio;

        // Draw scaled image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to Base64
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
}

// Usage:
const thumbnail = await generateThumbnail(uploadedFile);
document.getElementById('preview').src = thumbnail;

// Use cases:
// - Image upload previews
// - Client-side thumbnail generation
// - Photo filters/effects
// - Watermarking
// - PDF generation with images`
    }
  ],

  howToUse: {
    title: "How to Use This Image to Base64 Converter",
    content: `This tool converts image files to Base64-encoded Data URLs using browser FileReader API. All image processing happens client-side - uploaded images never leave your device.

### Uploading Images

Click upload button or drag-and-drop image files into input area. Supported formats: PNG (lossless, transparency), JPEG/JPG (lossy, photos), SVG (vector), GIF (animation), WebP (modern, efficient). Maximum recommended size: 10MB (browser memory limits). Tool displays image preview before conversion.

File validation ensures only image formats accepted. Non-image files rejected with error message. Large files (>10MB) trigger warning about size implications and browser performance.

### Understanding Base64 Output

Output format: \`data:[MIME-type];base64,[encoded-data]\`

**MIME Type:** Identifies image format - browser uses to decode correctly. data:image/png;base64, for PNG, data:image/jpeg;base64, for JPEG, data:image/svg+xml;base64, for SVG.

**Encoded Data:** Base64 string representing image binary. Long string of A-Z, a-z, 0-9, +, / characters, possibly ending with = padding. Copy entire string including MIME prefix for embedding.

### Using Base64 Images

**HTML Image Tags:** Replace src with Base64 Data URL:
\`\`\`html
<img src="data:image/png;base64,iVBORw0KGgo..." alt="Description">
\`\`\`

**CSS Backgrounds:** Embed in background-image property:
\`\`\`css
.element {
  background-image: url('data:image/png;base64,iVBORw0...');
}
\`\`\`

**JavaScript:** Set img.src dynamically:
\`\`\`javascript
const img = document.createElement('img');
img.src = 'data:image/png;base64,iVBORw0...';
\`\`\`

### Size Considerations

Base64 adds ~33% size overhead. Before converting, consider: images <10KB benefit from Base64 (eliminate HTTP request), images 10-50KB situational (benchmark both approaches), images >50KB usually better as external files (browser caching more efficient).

For large images, external files with proper caching outperform Base64. Base64 defeats caching - image re-transmitted with every page load. External files cached once, referenced many times.

### Performance Best Practices

**Use for small images only:** Icons, logos, buttons under 10KB ideal. Large photos or screenshots better as separate files.

**Limit Base64 images per page:** Dozens of Base64 images bloat HTML causing slow parsing. Batch-embed only critical above-fold images.

**Consider HTTP/2:** With HTTP/2 multiplexing, multiple small file requests less expensive. Base64 less beneficial than HTTP/1.1 era.

**Lazy load off-screen Base64:** Even embedded images can lazy load. Use loading="lazy" attribute or Intersection Observer to delay rendering below-fold Base64 images.`,
    steps: [
      {
        name: "Upload Image",
        text: "Click upload or drag-drop PNG, JPEG, SVG, GIF, WebP image. Preview appears after upload. Max 10MB recommended.",
      },
      {
        name: "Auto-Convert",
        text: "Instant conversion to Base64 Data URL. Includes correct MIME type prefix and complete encoded string.",
      },
      {
        name: "Copy Base64",
        text: "Click copy button to grab full Data URL string including MIME type and encoded data. Ready for embedding.",
      },
      {
        name: "Embed in Code",
        text: "Paste Data URL into HTML img src, CSS background-image, or JavaScript. Works immediately without external files.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the maximum image size I can convert?",
      answer: "Technical limit varies by browser (2-10MB+ Data URL support) but practical limit ~1MB for usability. Large Base64 strings slow page parsing, increase memory usage, and defeat caching benefits. Recommendation: keep images under 100KB. For images >1MB, use external files with browser caching. Base64 best for small assets (icons, thumbnails, logos) not full-resolution photos. Tool accepts up to 10MB but warns about performance implications."
    },
    {
      question: "Why is Base64 bigger than the original image?",
      answer: "Base64 encoding adds ~33% size overhead converting binary to text. Algorithm turns 3 bytes binary into 4 ASCII characters, increasing data. Example: 60KB PNG becomes ~80KB Base64 string. Overhead acceptable for small files where eliminating HTTP request outweighs size increase. For large files, 33% overhead plus lack of caching makes external files more efficient. Use Base64 strategically for tiny assets only."
    },
    {
      question: "Can I convert Base64 back to an image file?",
      answer: "Yes, Base64 Data URLs are reversible. Decode Base64 string to binary, save as image file with correct extension. This tool supports bidirectional conversion. Many image editors and tools accept Base64 input. Browsers can render Base64 directly - paste Data URL in address bar to view image. For conversion: use decode tools, JavaScript atob() function, or programming language base64 decoders. No quality loss in round-trip conversion."
    },
    {
      question: "Does Base64 work in all browsers and email clients?",
      answer: "Modern browsers universally support Base64 Data URLs. Limitations: Internet Explorer 8-10 has 32KB Data URL limit (avoid large images in IE), very old browsers (IE6-7) don't support Data URLs. Email clients: most support Base64 including Gmail, Outlook, Apple Mail. Some corporate email clients may block Data URLs for security. Test in target environments. For maximum compatibility, keep Base64 images small (<50KB) and provide fallback text."
    },
    {
      question: "Should I use Base64 for all images?",
      answer: "No, use selectively. Base64 benefits: small images (<10KB), email HTML templates, single-file apps, offline functionality, critical above-fold assets. Use external files for: images >50KB, frequently updated images, shared images across pages (caching), large photo galleries. Rule of thumb: Base64 for icons/logos, external for content images. With HTTP/2 reducing request overhead, Base64 less critical than HTTP/1.1 era. Benchmark both approaches for your specific use case."
    },
    {
      question: "How do I decode Base64 to view the image?",
      answer: "Simplest method: paste entire Data URL (including data:image/... prefix) in browser address bar and press Enter - browser renders image. Alternative: use Base64 decoder tool converting to downloadable file. JavaScript: create img element setting src to Data URL. Programming: decode base64 string to binary, save with correct file extension. Browser DevTools: paste Data URL in console, browser shows preview. No specialized software needed - browsers natively support viewing Base64 images."
    },
    {
      question: "Can I use Base64 for transparent images?",
      answer: "Yes, PNG and WebP formats support transparency preserved in Base64 encoding. JPEG doesn't support transparency - transparent areas become white/black in JPEG. For transparent logos, icons, or graphics: use PNG or WebP, convert to Base64 normally, transparency maintained. SVG also supports transparency and often smaller than Base64 PNG (use plain SVG markup instead of Base64 for better size). Verify transparency rendering in target context (HTML, CSS, email client)."
    },
    {
      question: "What about SEO - can search engines index Base64 images?",
      answer: "Search engines can't easily index Base64-embedded images. No filename, no alt text in Data URL itself (alt text on img tag still works), no separate URL to reference. For SEO-critical images (products, articles): use external files with descriptive filenames and proper alt text. For UI elements, icons, decorative graphics (not content): Base64 acceptable. Google can technically parse Base64 but treats less favorably than proper img tags with semantic URLs. SEO best practices favor external image files."
    },
    {
      question: "How do I optimize images before converting to Base64?",
      answer: "Compress images before conversion to minimize Base64 size. Use: image compression tools (TinyPNG, ImageOptim, Squoosh), reduce dimensions to needed size (don't embed 2000px image for 200px display), choose appropriate format (PNG for logos, JPEG for photos), remove metadata (EXIF data adds size). Then convert optimized image to Base64. Optimization critical since Base64 adds 33% overhead - start with smallest possible image. Consider SVG for logos/icons (often smaller than Base64 PNG)."
    },
    {
      question: "Is my image private when converting to Base64?",
      answer: "Absolutely. All image to Base64 conversion happens entirely in your browser using FileReader API and native base64 encoding. Uploaded images never leave your device or get uploaded to servers. No network requests are made with image data. Verify by opening browser DevTools Network tab - zero uploads. Safe for converting confidential images, proprietary logos, sensitive documents, or any private images. Tool works completely offline after page load. Image data processed in browser memory then discarded."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your images never leave your browser. This converter operates entirely client-side using FileReader API and JavaScript base64 encoding. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All image reading and Base64 encoding happens in your browser. Images stay on your device.
- **No Server Uploads:** We don't have backend servers to process images. The tool works completely offline after first page load.
- **No Data Storage:** Your uploaded images and Base64 output are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you upload, image content, filenames, or any image-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your images.

Safe for converting confidential images, proprietary brand assets, client deliverables, sensitive screenshots, or any private images requiring Base64 encoding.`
  },

  stats: {
    "Formats": "PNG, JPEG, SVG, GIF, WebP",
    "Max Size": "10MB",
    "Size Overhead": "+33%",
    "Conversion Speed": "<1s",
    "Server Uploads": "0"
  }
};
