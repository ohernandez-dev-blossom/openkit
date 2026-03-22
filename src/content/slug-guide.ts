/**
 * Slug Generator Tool Guide Content
 * Comprehensive developer guide for URL slug generation
 */

import type { ToolGuideContent } from "./types";

export const slugGuideContent: ToolGuideContent = {
  toolName: "Slug Generator",
  toolPath: "/slug",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Text",
      description: "Type or paste any text like article titles, product names, or page headings. The tool accepts mixed-case text with spaces, punctuation, and special characters."
    },
    {
      title: "Choose Separator",
      description: "Select hyphen (-), underscore (_), or dot (.) as separator. Hyphens are standard for URLs and SEO-friendly. Underscores work for file systems. Dots suit specific naming conventions."
    },
    {
      title: "Configure Case",
      description: "Toggle between lowercase (recommended for URLs) and Preserve Case (keeps original capitalization). Lowercase improves URL consistency and avoids case-sensitive routing issues."
    },
    {
      title: "Copy Generated Slug",
      description: "Click Copy to grab your URL-safe slug instantly. Use it in routes, permalinks, file names, or database identifiers. The slug is guaranteed to be URL-safe with no special characters."
    }
  ],

  introduction: {
    title: "What is a URL Slug?",
    content: `A URL slug is the human-readable, URL-safe portion of a web address that identifies a specific page or resource. For example, in \`https://example.com/blog/how-to-build-web-apps\`, the slug is \`how-to-build-web-apps\`. Slugs convert titles or names into URL-compatible format by removing spaces, special characters, and accents while preserving readability.

Slugs serve three critical purposes: SEO optimization (search engines use slug keywords for ranking), human readability (users understand URLs at a glance), and technical compatibility (no special characters that break URLs or routing). Converting "How to Build Modern Web Applications in 2024" to \`how-to-build-modern-web-applications-in-2024\` creates a URL that's both SEO-friendly and technically valid.

### Why URL Slugs Matter for SEO

Search engines like Google use URL slugs as ranking signals. A slug containing relevant keywords (\`/best-javascript-frameworks-2024\`) ranks better than generic IDs (\`/post?id=12345\`). Users are more likely to click descriptive URLs in search results. Clean slugs improve click-through rates by 20-30% compared to parameter-based URLs.

Google's algorithm parses hyphens in slugs as word separators, allowing it to extract individual keywords. The slug \`seo-friendly-url-structure\` tells Google the page is about "SEO", "friendly", "URL", and "structure". Underscores are NOT treated as word separators by Google - \`seo_friendly_url\` reads as "seofriendlyurl" (one word). Always use hyphens for SEO.

### URL Slug Best Practices

**Keep slugs short (3-5 words):** Long slugs dilute keyword relevance and look spammy. "how-to-build-web-apps" beats "comprehensive-guide-to-building-modern-responsive-web-applications-from-scratch".

**Use hyphens, not underscores:** Hyphens are word separators for search engines and humans. Underscores are not recognized by Google as word boundaries.

**Lowercase only:** URLs are case-sensitive on some servers. \`/About-Us\` and \`/about-us\` might be different pages, causing duplicate content issues. Lowercase ensures consistency.

**Remove stop words:** Articles (a, an, the) and prepositions (of, in, on) add length without SEO value. "the-guide-to-seo" becomes "guide-to-seo" or just "seo-guide".

**Remove special characters:** Punctuation, symbols, and accents break URLs or cause encoding issues. "café & restaurant!" becomes "cafe-restaurant" not "caf%C3%A9-%26-restaurant%21".

**Use permanent slugs:** Never change slugs after publishing. Changed URLs break backlinks and lose accumulated SEO value. If you must change, implement 301 redirects from old to new slug.

### Technical Requirements for Valid Slugs

Slugs must be URL-safe: only letters (a-z), numbers (0-9), hyphens (-), and underscores (_). No spaces, quotes, slashes, or special symbols. International characters (é, ñ, ü) must be transliterated or removed - \`café\` becomes \`cafe\` not \`caf%C3%A9\`.

Some systems limit slug length (50-100 characters). Database unique constraints on slugs prevent duplicates - if "my-article" exists, generate "my-article-2". Slugs should be immutable after creation to preserve SEO and prevent broken links.

### Common Slug Use Cases

**Blog posts:** Article titles to URL paths. "10 Tips for Better Code" → \`/blog/10-tips-better-code\`.

**E-commerce products:** Product names to URLs. "Men's Running Shoes - Blue" → \`/products/mens-running-shoes-blue\`.

**CMS pages:** Page titles to routes. "About Our Company" → \`/about-our-company\`.

**File names:** Document titles to file system paths. "Q4 2024 Report.pdf" → \`q4-2024-report.pdf\`.

**Database identifiers:** Human-readable IDs for records. User "John Doe" → username \`john-doe\`.

This tool implements industry-standard slug generation with Unicode normalization (removes accents), special character removal, space-to-separator conversion, and optional lowercasing. All processing happens client-side - your titles never leave your browser.`
  },

  useCases: [
    {
      title: "Generate Blog Post URLs",
      description: "Convert article titles to SEO-friendly URL slugs for blog posts and content management systems. Blog platforms like WordPress, Ghost, and custom CMSs use slugs to create readable, SEO-optimized permalinks.",
      example: `// Article title:
"How to Build a Modern Web Application in 2024"

// Generated slug:
how-to-build-modern-web-application-2024

// Full URL:
https://blog.example.com/how-to-build-modern-web-application-2024

// In Next.js dynamic routes:
// pages/blog/[slug].tsx
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(post => ({
      params: { slug: generateSlug(post.title) }
    })),
    fallback: false
  };
}`
    },
    {
      title: "Create Product URLs for E-commerce",
      description: "Transform product names into clean URLs for online stores. Product slugs improve SEO, help customers understand URLs, and create shareable links. Essential for Shopify, WooCommerce, and custom e-commerce platforms.",
      example: `// Product name:
"Apple iPhone 15 Pro - 256GB - Blue Titanium"

// Generated slug:
apple-iphone-15-pro-256gb-blue-titanium

// Product URL:
https://store.example.com/products/apple-iphone-15-pro-256gb-blue-titanium

// In Express.js route:
app.get('/products/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  res.render('product', { product });
});

// Database schema includes slug field:
{
  _id: ObjectId(...),
  name: "Apple iPhone 15 Pro - 256GB - Blue Titanium",
  slug: "apple-iphone-15-pro-256gb-blue-titanium",
  price: 1199,
  ...
}`
    },
    {
      title: "Generate File Names from Document Titles",
      description: "Convert document titles or descriptions into file system-safe file names. Useful for file upload systems, document management, or automated file generation where human-readable names improve organization.",
      example: `// Document title:
"Q4 2024 Financial Report (Final).pdf"

// Generated file name with hyphen separator:
q4-2024-financial-report-final.pdf

// File upload handler in Node.js:
import slugify from 'slugify';

app.post('/upload', upload.single('file'), (req, res) => {
  const originalName = req.file.originalname;
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);

  // Generate slug from original filename
  const slug = slugify(baseName, { lower: true, strict: true });
  const newFileName = \`\${slug}\${extension}\`;

  // Save with clean filename
  fs.renameSync(req.file.path, \`uploads/\${newFileName}\`);
  res.json({ fileName: newFileName });
});`
    },
    {
      title: "Create User Profile URLs",
      description: "Generate username slugs for user profile pages in social networks, SaaS applications, or community platforms. Slugs create vanity URLs like github.com/username or twitter.com/handle that are memorable and shareable.",
      example: `// User registration form:
Full Name: "Sarah O'Connor"
Email: "sarah.oconnor@example.com"

// Generated username slug (from name):
sarah-oconnor

// Profile URL:
https://app.example.com/users/sarah-oconnor

// Database user model:
{
  id: 12345,
  fullName: "Sarah O'Connor",
  username: "sarah-oconnor", // slug field
  email: "sarah.oconnor@example.com"
}

// Ensure uniqueness with counter:
async function generateUniqueUsername(name) {
  let slug = slugify(name);
  let counter = 1;
  while (await User.exists({ username: slug })) {
    slug = \`\${slugify(name)}-\${counter}\`;
    counter++;
  }
  return slug;
}
// "sarah-oconnor" exists → generate "sarah-oconnor-2"`
    }
  ],

  howToUse: {
    title: "How to Use This Slug Generator",
    content: `This tool provides instant URL slug generation with customizable separators and case options. Type your text and see the slug update in real-time. All processing happens client-side using JavaScript string normalization and regex.

### Generating Slugs

Enter any text - article titles, product names, page headings, or file names. The tool automatically removes special characters, normalizes Unicode (removes accents from é, ñ, ü), converts spaces to separators, and optionally lowercases the result.

### Choosing Separators

**Hyphen (-):** Standard for URLs and best for SEO. Google treats hyphens as word separators. Use for blog posts, product URLs, and web pages. Example: \`how-to-build-web-apps\`.

**Underscore (_):** Valid in URLs but NOT recommended for SEO - Google doesn't treat underscores as word separators. Use for file names or database fields where SEO doesn't matter. Example: \`how_to_build_web_apps\`.

**Dot (.):** Valid in URLs and file systems. Used in Java package names, namespaces, or specific naming conventions. Example: \`how.to.build.web.apps\`.

### Case Options

**Lowercase (recommended):** Converts all text to lowercase for consistency. Prevents case-sensitivity issues where /About-Us and /about-us are different URLs on some servers. Standard for web URLs.

**Preserve Case:** Keeps original capitalization. Used when case has semantic meaning (e.g., camelCase variable names, PascalCase class names) or brand names (iPhone, MongoDB).

### Unicode Normalization

The tool uses NFD (Normalization Form Decomposed) to separate accents from base characters, then removes accent marks. "café" → "cafe", "naïve" → "naive", "Zürich" → "zurich". This ensures ASCII-only output for maximum URL compatibility.

### Character Removal

All non-alphanumeric characters except separators are removed: punctuation (.!?,;:), quotes ("'), symbols (@#$%&*), brackets ([{()}]), slashes (\\/), and others. Numbers and letters are preserved. Multiple consecutive spaces become single separator.

### Real-Time Preview

The slug updates instantly as you type. No need to click "Generate" button. See results immediately and iterate on your text to achieve desired slug. Character count shows slug length for database or system constraints.`,
    steps: [
      {
        name: "Enter Text",
        text: "Type or paste article titles, product names, page headings, or any text to convert into URL slug."
      },
      {
        name: "Select Separator",
        text: "Choose hyphen (-) for URLs/SEO, underscore (_) for file systems, or dot (.) for specific conventions."
      },
      {
        name: "Configure Case",
        text: "Use lowercase for web URLs (recommended). Use Preserve Case for branded names or code identifiers."
      },
      {
        name: "Copy Slug",
        text: "Click Copy or Download to grab your URL-safe slug. Use in routes, permalinks, file names, or database fields."
      }
    ]
  },

  faqs: [
    {
      question: "Should I use hyphens or underscores in URL slugs?",
      answer: "Always use hyphens (-) for URLs. Google and other search engines treat hyphens as word separators but NOT underscores. The slug \`seo-friendly-urls\` tells Google you have three keywords: 'seo', 'friendly', 'urls'. The slug \`seo_friendly_urls\` reads as one word: 'seofriendlyurls'. This severely hurts SEO. Only use underscores for file names or database fields where SEO doesn't apply."
    },
    {
      question: "Why does the tool remove accents and special characters?",
      answer: "URLs must be ASCII-compatible for maximum browser and server compatibility. Special characters like é, ñ, ü get percent-encoded in URLs: 'café' becomes 'caf%C3%A9' which looks ugly and breaks readability. Removing accents creates clean ASCII: 'cafe'. Punctuation and symbols (!, @, #, $, etc.) break URL parsing or have special meaning in URLs. The tool removes them to guarantee valid, safe URLs."
    },
    {
      question: "How do I handle duplicate slugs?",
      answer: "When two articles have the same title (same slug), append a counter or timestamp. If \`my-article\` exists, generate \`my-article-2\`. Or use publication date: \`my-article-2024-01-15\`. Check database uniqueness before saving. Most CMSs automatically append counters. For user-facing slugs, let users customize to avoid ugly counters in URLs."
    },
    {
      question: "Can I change a slug after publishing?",
      answer: "You can, but you shouldn't. Changing slugs breaks existing links (bookmarks, social shares, search engine indexes) and loses accumulated SEO value. If you must change, implement 301 redirect from old to new slug to preserve SEO and prevent 404 errors. Most CMSs support slug redirects. For high-traffic pages, never change slugs without redirects."
    },
    {
      question: "What's the ideal slug length?",
      answer: "3-5 words (30-50 characters) is optimal. Longer slugs dilute keyword relevance and look spammy. Shorter is better as long as it's descriptive. 'build-web-apps' beats 'comprehensive-guide-to-building-modern-responsive-web-applications-from-scratch'. Remove stop words (a, an, the, of, in) to shorten. Some systems enforce maximum length (50-100 characters) - check your CMS constraints."
    },
    {
      question: "Should I include numbers and dates in slugs?",
      answer: "Include them if they're essential to content identity: '10-tips-better-code', 'year-in-review-2024'. Dates help uniqueness and searchability. However, dated content (2024-web-trends) ages poorly - next year the URL looks outdated even if you update content. For evergreen content, omit dates. For time-specific content (reports, reviews), include dates."
    },
    {
      question: "Can slugs contain uppercase letters?",
      answer: "Technically yes, but don't. URLs are case-sensitive on many servers (Linux/Unix). /About-Us and /about-us might be different pages, causing duplicate content SEO issues. Windows servers are case-insensitive but inconsistent casing still confuses users and analytics. Lowercase-only ensures consistency across all platforms. Only exception: branded names where case matters (iPhone, MongoDB) and you control server settings."
    },
    {
      question: "How do I handle very long titles?",
      answer: "Truncate to key keywords. 'How to Build a Modern, Responsive, High-Performance Web Application Using React, TypeScript, and Node.js in 2024' becomes 'build-modern-web-app-react-typescript-2024' (keep brand/tech terms) or even 'build-web-app-react' (super short). Remove filler words, keep searchable keywords. Manual editing beats automatic truncation - you know which words matter."
    },
    {
      question: "Can I use emojis in slugs?",
      answer: "Technically possible but strongly not recommended. Emojis are Unicode characters that get percent-encoded in URLs: '🚀' becomes '%F0%9F%9A%80'. URLs like /rocket%F0%9F%9A%80launch are ugly and break readability. They also cause compatibility issues with older browsers, servers, and analytics tools. Convert emoji meaning to text: '🚀 Launch' becomes 'launch' or 'rocket-launch'."
    },
    {
      question: "Is my text data private and secure?",
      answer: "Absolutely. All slug generation happens entirely in your browser using JavaScript string methods (normalize(), replace(), trim(), toLowerCase()). Your text never leaves your device or gets uploaded to servers. No network requests are made with your input. You can verify by disconnecting from internet - the tool still works offline. Safe for proprietary titles, confidential product names, or any sensitive text."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This slug generator operates entirely client-side using JavaScript's built-in string normalization and regex. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All slug generation happens in your browser's JavaScript engine using native string methods. Text stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your input text and generated slugs are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you generate, article titles, product names, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for generating slugs from proprietary content, confidential product names, internal documents, or any sensitive titles. Use with confidence for production content, customer-facing URLs, or regulated data identifiers.`
  },

  stats: {
    "Generation Speed": "<1ms",
    "Max Length": "Unlimited",
    "Separator Types": "3",
    "Unicode Support": "Full",
    "Server Uploads": "0"
  }
};
