/**
 * CSS Minifier Tool Guide Content
 * Comprehensive developer guide for CSS minification
 */

import type { ToolGuideContent } from "./types";

export const cssMinifyGuideContent: ToolGuideContent = {
  toolName: "CSS Minifier",
  toolPath: "/css-minify",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your CSS Code",
      description: "Copy your CSS from stylesheets, component files, or development builds and paste it into the input panel. The minifier handles standard CSS, CSS3 features, custom properties, and vendor prefixes."
    },
    {
      title: "Configure Minification Options",
      description: "Choose whether to preserve important comments (like license headers), remove all comments, or optimize color values and units for maximum compression."
    },
    {
      title: "Minify Instantly",
      description: "The minifier processes your stylesheet immediately, removing whitespace, optimizing values, and combining rules. File size decreases by 20-40% instantly."
    },
    {
      title: "Copy or Download Result",
      description: "Click Copy to copy minified CSS to clipboard, or download as .min.css file ready for production deployment."
    }
  ],

  introduction: {
    title: "What is CSS Minification?",
    content: `CSS minification is the process of removing all unnecessary characters from stylesheets without changing how styles are applied. This includes removing whitespace, line breaks, comments, and optimizing color values, units, and selectors. Minification reduces CSS file size by 20-40%, improving page load performance and reducing bandwidth costs.

Modern web applications include substantial CSS - frameworks like Bootstrap (150KB), Tailwind (200KB+), or Material-UI contribute significant stylesheet size. Custom application styles add another 50-200KB. Minification is essential for production deployments to keep stylesheets lean and maintain fast page rendering.

### Why CSS Minification Matters

CSS blocks page rendering until stylesheets download and parse. Large CSS files delay First Contentful Paint (FCP) and Largest Contentful Paint (LCP), hurting Core Web Vitals scores that impact SEO rankings. Minified CSS downloads 20-40% faster, especially critical on mobile networks where every kilobyte counts.

Production CSS benefits from minification beyond size reduction. Minified stylesheets are harder to inspect and copy, providing basic protection against casual theft of custom designs or proprietary component styles. While not true security, it discourages direct copying of visual designs.

CDN costs scale with file size. Sites serving CSS to millions of users save significant bandwidth through minification. A popular site serving 100GB of CSS monthly reduces this to 60-75GB minified, translating to real cost savings on CDN bills.

### How CSS Minification Works

**Whitespace Removal:** All spaces, tabs, and line breaks not required for CSS syntax are removed. Multi-line stylesheets become single-line, and indentation is eliminated.

**Comment Stripping:** Comments are removed except special markers like /*! important */ for license headers. This eliminates documentation overhead while preserving legal requirements.

**Value Optimization:** Colors are shortened (#ffffff → #fff), zero units are removed (0px → 0), and decimal values are simplified (0.5em → .5em). These micro-optimizations add up across large stylesheets.

**Selector Optimization:** Redundant selectors are combined, duplicate rules are merged, and overridden properties are eliminated where safe. This requires careful analysis to avoid breaking cascade specificity.

### Minification vs Compression

CSS minification is a build-time optimization that produces smaller files before deployment. Server compression (gzip, brotli) is runtime compression during HTTP transfer. Use both together - minify first (20-40% reduction), then enable gzip (additional 70-80% reduction). A 200KB stylesheet becomes 130KB minified, then 25-35KB with gzip compression.

### Development vs Production

Never minify during development - readable CSS is essential for debugging layout issues, specificity problems, and responsive breakpoints. Minification is a production build step. Modern build tools (Webpack css-loader, PostCSS, Vite) handle CSS minification automatically. This manual minifier helps when testing, optimizing third-party CSS, or working without build tools.`
  },

  useCases: [
    {
      title: "Reduce Production Stylesheet Size",
      description: "Minify CSS before deploying to production to reduce file size by 20-40%, improving Critical Rendering Path performance, Core Web Vitals scores, and reducing bandwidth costs.",
      example: `/* Before: Development CSS (320 bytes) */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #333333;
  color: #ffffff;
  padding: 15px 20px;
}

/* After: Minified CSS (142 bytes - 56% reduction) */
.container{max-width:1200px;margin:0 auto;padding:20px}.header{background-color:#333;color:#fff;padding:15px 20px}`
    },
    {
      title: "Optimize Framework CSS",
      description: "CSS frameworks like Bootstrap or Tailwind ship large files. If using only portions, extract and minify the relevant CSS to reduce bundle size significantly.",
      example: `/* Bootstrap full: 150KB */
/* Custom subset (navigation + grid): 35KB */
/* Minified: 21KB (40% reduction) */
/* Result: 85% smaller than full framework */`
    },
    {
      title: "Prepare Styles for CDN",
      description: "When hosting CSS on CDNs, minify to ensure fast global delivery. Smaller files cache better, transfer faster across edge locations, and reduce bandwidth costs.",
      example: `/* Original: theme.css (85KB) */
/* Minified: theme.min.css (52KB - 39% reduction) */
/* Deployed to: cdn.example.com/theme.min.css */
/* Global bandwidth savings: 33KB per user */`
    },
    {
      title: "Reduce Email Template CSS",
      description: "Email clients have size limits and slower loading. Minify inline CSS in email templates to stay under limits while maintaining design fidelity across clients.",
      example: `/* Email template styles */
/* Original: 15KB inline CSS */
/* Minified: 9KB (40% reduction) */
/* Better Gmail/Outlook compatibility */
/* Faster email rendering on mobile */`
    }
  ],

  howToUse: {
    title: "How to Use This CSS Minifier",
    content: `This CSS minifier provides instant client-side minification with zero server uploads. All processing happens in your browser using CSS parsing and optimization, ensuring your stylesheets remain private and processing is instantaneous.

### Basic Minification Workflow

Copy your CSS from stylesheet files, component styles, or framework source and paste it into the input panel. The minifier accepts any valid CSS including selectors, properties, media queries, keyframes, CSS custom properties, and vendor prefixes.

Configure minification options: preserve important comments (/*! */), optimize color values (#ffffff → #fff), simplify units (0px → 0), and remove redundant rules. The minifier processes your CSS instantly.

The minified output appears as compact, single-line CSS with all unnecessary characters removed. File size reduction is displayed immediately, showing bandwidth savings per user.

### Advanced Features

**Color Optimization:** Hex colors are shortened where possible (#ffffff → #fff, #ff0000 → red), and rgb() values are converted to shorter hex notation when equivalent.

**Unit Simplification:** Zero values drop units (0px → 0, 0em → 0), decimal values lose leading zeros (0.5 → .5), and redundant units are optimized.

**Comment Control:** Preserve license headers and important notices with /*! */ syntax while removing developer comments. Ensures legal compliance while maximizing compression.

**Selector Merging:** Identical rule sets are combined (a{color:red}b{color:red} → a,b{color:red}), reducing repetition and file size.

### Best Practices

Always keep original source CSS files and only deploy minified versions to production. Test minified CSS in all target browsers to catch edge cases where aggressive optimization might break layouts. Use build tools (PostCSS with cssnano, Webpack) for automated minification in CI/CD pipelines. Minify third-party CSS only if pre-minified versions aren't available. Enable gzip/brotli compression on your web server for additional 70-80% size reduction beyond minification.`,
    steps: [
      {
        name: "Paste CSS Code",
        text: "Copy your CSS from stylesheet files or component styles and paste it into the input panel. All CSS3 features are supported."
      },
      {
        name: "Set Minification Options",
        text: "Configure comment preservation, color optimization, and unit simplification based on your deployment requirements."
      },
      {
        name: "Review Size Reduction",
        text: "The minifier processes CSS instantly. Check the file size reduction percentage and preview the optimized output."
      },
      {
        name: "Copy or Download",
        text: "Click Copy to copy minified CSS, or Download to save as .min.css file ready for production deployment."
      }
    ]
  },

  faqs: [
    {
      question: "Does CSS minification change how styles are applied?",
      answer: "No, CSS minification only removes unnecessary characters and optimizes values while preserving functionality. The minified CSS applies styles identically to the original - browsers parse and render minified CSS the same way. Minification is purely a file size optimization that doesn't affect visual appearance or layout behavior."
    },
    {
      question: "Can minification break my CSS?",
      answer: "Properly implemented CSS minification should never break valid CSS. However, edge cases can cause issues: relying on whitespace in content properties, using calc() with specific spacing, or unusual use of comments that affect parsing. Always test minified CSS in all target browsers before deploying to production."
    },
    {
      question: "How much smaller will my CSS become?",
      answer: "CSS minification typically reduces file size by 20-40% depending on code style and verbosity. Well-commented, generously spaced CSS sees higher reduction (40-50%). Terse, already-compact CSS sees less (15-25%). Combined with gzip compression (additional 70-80% reduction), total savings reach 80-85% of original size."
    },
    {
      question: "Should I minify CSS before or after processing with PostCSS?",
      answer: "Minify after all CSS processing (PostCSS, Sass compilation, autoprefixer). Modern build pipelines process CSS in order: Sass → PostCSS → Autoprefixer → Minification. Minifying too early can break preprocessor features or prevent optimizations. Use cssnano as the final PostCSS plugin for optimal results."
    },
    {
      question: "Does minification affect CSS custom properties (variables)?",
      answer: "No, CSS custom properties (--my-color: blue) are preserved exactly as written during minification. Variable names, values, and var() references remain unchanged. Only surrounding whitespace and comments are removed. This ensures CSS custom property cascading and inheritance work identically in minified stylesheets."
    },
    {
      question: "Is my CSS code private when using this tool?",
      answer: "Absolutely. All CSS minification happens entirely in your browser using client-side processing. Your stylesheets never leave your device or get sent to any servers. No uploads, no storage, no analytics tracking. Safe for proprietary design systems, custom frameworks, or confidential client projects."
    },
    {
      question: "Can I minify Sass or Less files?",
      answer: "This minifier is designed for standard CSS output. Compile Sass/Less to CSS first using sass, node-sass, or lessc, then minify the resulting CSS. Modern build tools handle this automatically - use Webpack with sass-loader or Vite with Sass support, which include compilation and minification in the build process."
    },
    {
      question: "Will minified CSS work in older browsers?",
      answer: "Yes, CSS minification only removes whitespace and optimizes values - it doesn't change syntax or add modern features. If your source CSS works in older browsers (IE11, old Safari), the minified version works identically. Browser compatibility depends on CSS features used, not minification. Use autoprefixer before minification for vendor prefix compatibility."
    },
    {
      question: "How do I debug minified CSS?",
      answer: "Debugging minified CSS is difficult because formatting is removed and everything is on one line. Use browser DevTools to inspect computed styles and track which rules apply. For complex debugging, use source maps (supported by Webpack css-loader) that map minified CSS back to original source. Deploy source maps only to development/staging, not production."
    },
    {
      question: "Can minification remove unused CSS?",
      answer: "Basic CSS minification doesn't remove unused selectors - that requires separate tools like PurgeCSS or UnCSS that analyze HTML to detect which selectors are actually used. Use PurgeCSS before minification in production builds to remove unused framework CSS (can save 70-90% on frameworks like Tailwind or Bootstrap), then minify the result."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your CSS code never leaves your browser. This minifier operates entirely client-side using CSS parsing and optimization in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All CSS minification happens in your browser's JavaScript engine. Your stylesheets stay on your device.
- **No Server Uploads:** We don't have servers to process CSS. The tool works completely offline after first load.
- **No Data Storage:** Your CSS is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what CSS you minify, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the minifier safe for sensitive use cases like proprietary design systems, custom component libraries, client-specific branding, or any CSS that must remain confidential. Use with confidence for production builds, security audits, or handling confidential styles.`
  },

  stats: {
    "Reduction": "20-40%",
    "Processing": "<100ms",
    "Max Size": "5MB",
    "Privacy": "100%"
  }
};
