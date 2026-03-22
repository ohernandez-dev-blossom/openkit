/**
 * Font Pairing Tool Guide Content
 * Comprehensive developer guide for typography combinations
 */

import type { ToolGuideContent } from "./types";

export const fontPairsGuideContent: ToolGuideContent = {
  toolName: "Font Pairing Tool",
  toolPath: "/font-pairs",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Browse Curated Font Pairs",
      description: "Explore professionally selected font combinations for headings and body text. Each pairing balances contrast, harmony, and readability based on typography principles."
    },
    {
      title: "Preview with Your Content",
      description: "Replace sample text with your actual content to test font pairings in context. See how heading and body fonts work together with your specific text length and structure."
    },
    {
      title: "Adjust Font Weights and Sizes",
      description: "Fine-tune font weights (light, regular, bold) and size scale for optimal hierarchy. Test different weight combinations to find the right visual balance."
    },
    {
      title: "Copy Font CSS and Import Links",
      description: "Click copy to get complete CSS including @import or <link> tags for Google Fonts, font-family declarations, and responsive size scales. Production-ready typography system."
    }
  ],

  introduction: {
    title: "What is Font Pairing?",
    content: `Font pairing is the art of combining two or more typefaces that work together harmoniously in a design. Professional typography uses distinct fonts for different purposes - headings, body text, captions, code - creating visual hierarchy and personality while maintaining readability.

Good font pairings balance contrast and harmony. Too similar = boring and lacks hierarchy. Too different = chaotic and unprofessional. The goal is purposeful contrast - fonts complement each other while serving distinct roles.

### Why Font Pairing Matters

Typography shapes brand identity and user experience. Playful rounded sans-serif headings with geometric body text feel friendly and modern. Elegant serif headings with clean sans body text convey sophistication. Font choices communicate before users read a single word.

Readability depends on appropriate font selection. Some typefaces excel in headings (display fonts, bold serifs) but fail in body text. Others optimize for long-form reading (humanist sans, book serifs) but lack impact as headings. Pairings leverage each font's strengths.

Hierarchy guides user attention through content. Distinct heading and body fonts create clear visual separation. User immediately identifies titles, sections, and body content. Without typographic hierarchy, pages become walls of undifferentiated text.

Professional design relies on proven pairings. Designers don't randomly combine fonts - successful combinations follow typography principles tested across centuries of print and decades of web design.

### Typography Principles for Pairing

**Contrast in Classification:** Pair fonts from different categories. Serif headings + sans-serif body is classic. Sans headings + serif body works too. Avoid pairing two similar sans-serifs or two ornate serifs.

**Harmony in Proportions:** Choose fonts with similar x-heights and proportions despite different classifications. Ensures visual cohesion when placed together.

**Complement, Don't Compete:** One font should lead (headings), the other support (body). Both shouldn't demand equal attention - creates visual tension.

**Limit Font Count:** Two fonts (heading + body) covers 90% of needs. Add third font sparingly (captions, code). Four+ fonts = amateur design.

**Match Personality:** Font moods should align. Playful rounded heading + rigid geometric body feels disjointed. Match formality level, era, and character.

**Test Readability:** Body font must be readable at 16px for extended reading. Heading font can prioritize style over readability - users read headings briefly.

### Font Categories

**Serif:** Traditional typefaces with decorative strokes (feet) on letter endings. Examples: Georgia, Merriweather, Playfair Display. Convey formality, elegance, tradition. Excellent for body text or sophisticated headings.

**Sans-Serif:** Clean typefaces without decorative strokes. Examples: Inter, Roboto, Open Sans. Modern, clean, approachable. Dominant in UI/UX for readability at all sizes.

**Display:** Decorative fonts designed for large sizes (headings, posters). Examples: Bebas Neue, Righteous, Lobster. High personality, poor readability at small sizes. Use for headings only.

**Monospace:** Fixed-width fonts where every character takes equal space. Examples: JetBrains Mono, Fira Code, Courier. Essential for code, technical content, data tables.

**Handwriting/Script:** Fonts mimicking handwriting or calligraphy. Use sparingly - accent text, logos, special emphasis. Poor for body text or UI.

### Classic Font Pairing Formulas

**Serif Heading + Sans Body:** Traditional, sophisticated. Example: Playfair Display (heading) + Open Sans (body). Elegant yet readable.

**Sans Heading + Serif Body:** Modern twist on classic. Example: Montserrat (heading) + Merriweather (body). Contemporary feel with literary quality.

**Sans Heading + Sans Body (Contrasting Styles):** Two sans-serifs with different personalities. Example: Roboto (heading - geometric) + Inter (body - humanist). Unified yet hierarchical.

**Display Heading + Sans Body:** High impact. Example: Bebas Neue (heading) + Lato (body). Bold personality, grounded readability.

**Mono Heading + Sans Body:** Technical, modern. Example: JetBrains Mono (heading) + Inter (body). Developer-focused aesthetic.

### Web Font Loading

**Google Fonts:** Most accessible web fonts. Use <link> in HTML or @import in CSS. Example: <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

**Performance Optimization:** Load only needed weights to reduce bandwidth. font-display: swap prevents invisible text during font load. Preconnect to font CDN: <link rel="preconnect" href="https://fonts.googleapis.com">

**Variable Fonts:** Single file with weight/width axis instead of separate files per weight. Better performance for multiple weights. Example: Inter Variable, Recursive.

**Self-Hosting:** Download fonts, serve from own CDN for privacy and control. Avoids third-party requests. Requires font licensing consideration.

**Fallback Fonts:** Always specify fallback system fonts: font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; Ensures readable text if custom font fails to load.

### Responsive Typography

Font sizes should scale with viewport. Small screens need smaller headings, larger body text for readability. Use clamp() or responsive units:

\`\`\`css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
\`\`\`

Or breakpoint-based:

\`\`\`css
h1 { font-size: 2.5rem; }
@media (min-width: 768px) {
  h1 { font-size: 3.5rem; }
}
\`\`\`

Body text minimum 16px on mobile for comfortable reading without zoom.

### Accessibility Considerations

**Contrast:** Ensure sufficient color contrast between text and background. WCAG AA requires 4.5:1 for body text, 3:1 for large text (18pt+).

**Line Height:** Body text needs 1.5-1.6 line-height for readability. Tight line-height strains eyes.

**Line Length:** 50-75 characters per line optimal for body text. Wider = difficult to track line ends. Narrower = choppy reading.

**Font Size:** Minimum 16px for body text. Smaller strains vision, especially for extended reading.`,
  },

  useCases: [
    {
      title: "Modern SaaS Landing Page Typography",
      description: "Clean, professional font pairing for software products. Sans-serif combination with strong hierarchy distinguishes marketing from enterprise software feel. Bold headings grab attention while readable body text explains features.",
      example: `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Sora:wght@600;700;800&display=swap');

/* Font family variables */
:root {
  --font-heading: 'Sora', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
}

/* Heading styles */
h1 {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #1a1a1a;
}

h2 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #2a2a2a;
}

h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #3a3a3a;
}

/* Body text styles */
body {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.6;
  color: #4a5568;
}

p {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

/* Lead paragraph */
.lead {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.6;
  color: #2d3748;
}

/* Feature card typography */
.feature-card h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: #718096;
}

/* CTA button text */
.cta-button {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.125rem;
  letter-spacing: 0.01em;
}

/* React components */
const Hero = () => (
  <section className="py-20">
    <h1 className="font-heading font-extrabold text-6xl mb-6 tracking-tight">
      Ship better products faster
    </h1>
    <p className="font-body text-xl text-gray-600 max-w-2xl">
      The all-in-one platform for modern engineering teams.
      Build, deploy, and scale with confidence.
    </p>
  </section>
);

/* Tailwind config */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  }
};`
    },
    {
      title: "Editorial Blog with Serif Elegance",
      description: "Classic serif and sans-serif pairing for content-focused blogs and magazines. Serif headings provide sophistication while sans-serif body text ensures readability. Perfect for long-form articles and editorial content.",
      example: `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Source+Sans+3:wght@300;400;600&display=swap');

/* Font family variables */
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, sans-serif;
}

/* Article heading hierarchy */
.article h1 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.article h2 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  line-height: 1.3;
  color: #2a2a2a;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.article h3 {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.4;
  color: #3a3a3a;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

/* Article body text */
.article-body {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  max-width: 65ch;
  margin: 0 auto;
}

.article-body p {
  margin-bottom: 1.75rem;
}

/* Article lead/intro */
.article-lead {
  font-family: var(--font-body);
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.7;
  color: #1f2937;
  margin-bottom: 2rem;
}

/* Pull quotes */
.pullquote {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 400;
  font-style: italic;
  line-height: 1.5;
  color: #4b5563;
  border-left: 4px solid #d1d5db;
  padding-left: 2rem;
  margin: 2.5rem 0;
}

/* Byline and metadata */
.byline {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  color: #6b7280;
}

.publish-date {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Category tags */
.category-tag {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6366f1;
}

/* Reading time estimate */
.reading-time {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  color: #9ca3af;
}

/* React article component */
const ArticleHeader = ({ title, author, date, readTime }) => (
  <header className="mb-12">
    <h1 className="font-heading font-bold text-5xl md:text-6xl leading-tight mb-4">
      {title}
    </h1>
    <div className="flex items-center gap-4 text-sm">
      <span className="font-body font-semibold uppercase tracking-wide text-gray-600">
        {author}
      </span>
      <span className="font-body text-gray-400">{date}</span>
      <span className="font-body text-gray-400">{readTime} min read</span>
    </div>
  </header>
);

/* Tailwind typography plugin customization */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Sans 3', 'sans-serif']
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Source Sans 3, sans-serif',
            h1: { fontFamily: 'Playfair Display, serif' },
            h2: { fontFamily: 'Playfair Display, serif' },
            h3: { fontFamily: 'Playfair Display, serif' }
          }
        }
      }
    }
  }
};`
    },
    {
      title: "Technical Documentation with Monospace",
      description: "Developer-focused font pairing combining sans-serif for prose with monospace for code. Clean hierarchy separates explanations from code examples. Essential for API docs, tutorials, and technical content.",
      example: `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* Font family variables */
:root {
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

/* Documentation headings */
.docs h1 {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.docs h2 {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.3;
  color: #1e293b;
  margin-top: 3rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.docs h3 {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.4;
  color: #334155;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

/* Body text */
.docs-content {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.7;
  color: #475569;
}

/* Inline code */
code:not(pre code) {
  font-family: var(--font-mono);
  font-size: 0.875em;
  font-weight: 500;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 0.125rem 0.375rem;
  color: #dc2626;
}

/* Code blocks */
pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.7;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

pre code {
  font-family: var(--font-mono);
  font-size: inherit;
  line-height: inherit;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
}

/* API endpoint documentation */
.endpoint {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  background: #ecfdf5;
  border-left: 4px solid #10b981;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  margin: 1.5rem 0;
}

.endpoint .method {
  font-weight: 700;
  color: #059669;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

.endpoint .path {
  font-weight: 500;
  color: #047857;
}

/* Parameter documentation */
.parameter-name {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 600;
  color: #7c3aed;
}

.parameter-type {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
}

/* Navigation sidebar */
.docs-nav a {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  line-height: 2;
}

.docs-nav a.active {
  font-weight: 600;
  color: #0f172a;
}

/* React code example component */
const CodeBlock = ({ language, code }) => (
  <div className="my-6">
    <div className="font-mono text-xs font-semibold text-gray-400 bg-gray-800 px-4 py-2 rounded-t-lg">
      {language}
    </div>
    <pre className="font-mono text-sm bg-gray-900 text-gray-100 p-6 rounded-b-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

/* API reference component */
const APIEndpoint = ({ method, path, description }) => (
  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded mb-4">
    <div className="flex items-center gap-3 mb-2">
      <span className="font-mono text-xs font-bold text-green-700 uppercase tracking-wide">
        {method}
      </span>
      <code className="font-mono text-sm font-medium text-green-800">
        {path}
      </code>
    </div>
    <p className="font-sans text-gray-700 text-sm">{description}</p>
  </div>
);

/* Tailwind config */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    }
  }
};`
    },
    {
      title: "Brand-Forward Marketing Site",
      description: "High-impact display font for headings paired with neutral sans-serif for body. Creates strong brand personality while maintaining content readability. Ideal for creative agencies, portfolios, and brand-focused marketing.",
      example: `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato:wght@300;400;700&display=swap');

/* Font family variables */
:root {
  --font-display: 'Bebas Neue', 'Arial Black', sans-serif;
  --font-body: 'Lato', -apple-system, sans-serif;
}

/* Hero heading - maximum impact */
.hero h1 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(3rem, 10vw, 7rem);
  line-height: 0.95;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 1.5rem;
}

/* Section headings */
h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

h3 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.75rem, 4vw, 3rem);
  line-height: 1.1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #2a2a2a;
}

/* Body text - clean and readable */
body {
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  color: #4a5568;
}

p {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

/* Lead text */
.lead {
  font-family: var(--font-body);
  font-size: 1.375rem;
  font-weight: 300;
  line-height: 1.6;
  color: #2d3748;
}

/* Stats/numbers with display font */
.stat-number {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1;
  color: #000;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #718096;
}

/* Service card titles */
.service-card h3 {
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.service-card p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
}

/* CTA button */
.cta-button {
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
}

/* Navigation */
.nav-link {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #2d3748;
}

/* React components */
const HeroSection = () => (
  <section className="py-24">
    <h1 className="font-display text-7xl uppercase tracking-wide mb-6">
      Create. Innovate. Dominate.
    </h1>
    <p className="font-body text-xl font-light text-gray-600 max-w-2xl">
      We build brands that break through the noise and capture attention
      in crowded markets.
    </p>
  </section>
);

const StatsSection = () => (
  <div className="grid grid-cols-3 gap-12">
    <div>
      <div className="font-display text-6xl mb-2">500+</div>
      <div className="font-body text-sm font-bold uppercase tracking-wide text-gray-600">
        Projects Launched
      </div>
    </div>
    {/* More stats */}
  </div>
);

/* Tailwind config */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'Arial Black', 'sans-serif'],
        body: ['Lato', 'sans-serif']
      }
    }
  }
};`
    }
  ],

  howToUse: {
    title: "How to Use This Font Pairing Tool",
    content: `This font pairing tool provides curated combinations of heading and body fonts with live preview. Browse professional pairings, test with your content, adjust weights and sizes, and export complete CSS with font imports.

### Browsing Font Pairs

Scroll through curated font combinations organized by style:
- **Modern Sans:** Clean, contemporary pairings for SaaS and apps
- **Classic Serif:** Elegant combinations for editorial and blogs
- **Technical:** Developer-focused with monospace
- **Bold Display:** High-impact for marketing and brands
- **Minimalist:** Subtle, refined pairings

Click any pairing to load it into the preview. Each shows heading font + body font with sample text demonstrating hierarchy.

### Previewing with Your Content

Replace sample text with your actual content:
1. Click "Customize Text"
2. Enter your heading text
3. Enter body paragraph text
4. Preview updates in real-time

See how fonts work with your specific content length, word choice, and structure. Critical for evaluating readability and fit.

### Adjusting Font Weights

Fine-tune visual hierarchy with weight controls:
- **Heading weight:** Light (300), Regular (400), Medium (500), Semibold (600), Bold (700), Extrabold (800), Black (900)
- **Body weight:** Light (300), Regular (400), Medium (500)

Heavier heading weights create stronger contrast. Most pairings use Bold (700) or Semibold (600) headings with Regular (400) body.

Test different combinations to find optimal balance for your brand.

### Adjusting Font Sizes

Size sliders control typography scale:
- **Heading size:** 1.5rem to 5rem
- **Body size:** 0.875rem to 1.5rem

Larger headings create drama, smaller feels refined. Body text minimum 1rem (16px) for readability.

Preview shows responsive behavior - how sizes adapt to viewport width. Test at different screen sizes.

### Understanding Font Metrics

Each pairing shows key metrics:
- **X-height:** Lowercase letter height. Higher x-height = better small-size readability
- **Weight range:** Available weights (e.g., 300-900)
- **Character set:** Supported languages/special characters
- **License:** Free, open source, or commercial

Metrics help evaluate font technical fit beyond aesthetics.

### Copying Font CSS

Click "Copy CSS" to get complete typography system:

**Google Fonts Import:**
\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
\`\`\`

**Or CSS @import:**
\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
\`\`\`

**Font-family declarations:**
\`\`\`css
h1, h2, h3 { font-family: 'Sora', sans-serif; }
body, p { font-family: 'Inter', sans-serif; }
\`\`\`

**Responsive size scale:**
\`\`\`css
h1 { font-size: clamp(2rem, 5vw, 4rem); }
\`\`\`

Complete production-ready CSS, paste directly into stylesheet.

### Performance Optimization

Tool generates optimized font loading:
- **font-display: swap** prevents invisible text
- **Preconnect** to font CDN for faster loading
- **Weight subsetting** loads only used weights

For maximum performance, self-host fonts or use variable fonts when available.

### Testing Accessibility

Check readability:
- Minimum body text 16px (1rem)
- Line height 1.5-1.7 for body text
- Sufficient color contrast (4.5:1 for body, 3:1 for headings)
- Line length 50-75 characters for optimal reading

Tool highlights accessibility issues if detected.

### Exporting for Design Tools

Export font pairing to Figma, Sketch, or Adobe XD:
- Copy font names
- Paste into design tool
- Match weights and sizes from tool preview
- Maintain consistency between design and code

### Creating Custom Pairings

Don't see perfect pairing? Create custom:
1. Click "Custom Pairing"
2. Select heading font from library
3. Select body font from library
4. Adjust weights and sizes
5. Export CSS

Library includes 100+ Google Fonts covering all categories.

### Saving Favorites

Click heart icon to save pairings. Access saved pairings from "Favorites" tab. Build personal library of typography combinations for quick reference across projects.`,
    steps: [
      {
        name: "Browse Font Pairs",
        text: "Explore curated font combinations organized by style: modern sans, classic serif, technical monospace, bold display, minimalist. Click pairing to load preview."
      },
      {
        name: "Preview with Content",
        text: "Replace sample text with your actual headings and body paragraphs. See how fonts work with your specific content, word choice, and text length."
      },
      {
        name: "Adjust Weights and Sizes",
        text: "Fine-tune heading weight (400-900), body weight (300-500), and font sizes (1rem-5rem). Test different combinations for optimal visual hierarchy and brand fit."
      },
      {
        name: "Copy Font CSS",
        text: "Click Copy to get complete CSS including Google Fonts import, font-family declarations, and responsive size scale. Production-ready code for immediate use."
      }
    ]
  },

  faqs: [
    {
      question: "How many fonts should I use in a design?",
      answer: "Two fonts covers 90% of needs: one for headings, one for body text. Add third font sparingly for special purposes (code, captions, accent text). Four+ fonts looks amateur and creates visual chaos. Limit yourself to 2-3 fonts maximum. Use font weights to create variety within single typeface."
    },
    {
      question: "Should I use serif or sans-serif for body text?",
      answer: "Both work. Sans-serif dominates web design for UI/UX - clean at all sizes, excellent screen readability. Serif works for editorial, blogs, long-form reading - traditional book feel. Choose based on brand personality: modern/tech = sans, traditional/literary = serif. Test readability at your target font size."
    },
    {
      question: "What's the difference between font weight 400 and 700?",
      answer: "400 is Regular (normal weight), 700 is Bold. Weights range 100 (Thin) to 900 (Black). Common weights: 300 Light, 400 Regular, 500 Medium, 600 Semibold, 700 Bold, 800 Extrabold. Use Regular (400) for body text, Bold (700) or Semibold (600) for headings. Weight creates hierarchy - heavier = more important."
    },
    {
      question: "How do I load Google Fonts for best performance?",
      answer: "Use <link> tag in HTML <head> with preconnect: <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"> then <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap\" rel=\"stylesheet\">. Include font-display: swap (automatic in new API) to prevent invisible text. Load only weights you use - fewer weights = faster load."
    },
    {
      question: "What font size should I use for body text?",
      answer: "Minimum 16px (1rem) for body text on web. Smaller strains eyes, especially for extended reading. 18px (1.125rem) increasingly common for better readability. Mobile may use slightly larger (16-18px) to prevent zoom. Headings scale based on hierarchy: h1 2.5-4rem, h2 2-3rem, h3 1.5-2rem."
    },
    {
      question: "Can I pair two sans-serif fonts together?",
      answer: "Yes, but choose contrasting styles. Pair geometric sans (Futura, Montserrat) with humanist sans (Inter, Open Sans). Or pair condensed with wide. Avoid two similar sans-serifs - creates confusion without hierarchy. Vary weights significantly: Light heading + Bold body works. Test to ensure clear visual distinction."
    },
    {
      question: "What's a variable font and should I use it?",
      answer: "Variable font is single file with weight/width/slant axis instead of separate files per style. Example: Inter Variable provides all weights (100-900) in one file vs 9 separate files. Better performance if using multiple weights. Growing support but check browser compatibility. Use for modern projects, stick with static fonts for maximum compatibility."
    },
    {
      question: "How do I ensure font pairing looks good on mobile?",
      answer: "Test responsive font sizes. Use clamp() or media queries to scale headings down on small screens: font-size: clamp(2rem, 5vw, 4rem). Very large headings (4rem+) may need significant reduction on mobile. Body text should stay 16px+ on mobile for comfortable reading without zoom. Preview tool shows responsive behavior."
    },
    {
      question: "What if a font doesn't load? How do fallbacks work?",
      answer: "Always specify fallback fonts: font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif. If custom font fails, browser uses next available font in list. System fonts (-apple-system, etc.) ensure readable text even without custom font. Match fallback category (serif, sans-serif, monospace) to custom font."
    },
    {
      question: "Is my font pairing choice private when using this tool?",
      answer: "Yes. All font previewing and CSS generation happen client-side in your browser. No font selections, customizations, or exported CSS are sent to servers. No tracking, no storage. Safe for client work or proprietary designs. Tool works offline after initial load. Your typography choices never leave your device."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your font pairing choices never leave your browser. This tool operates entirely client-side using JavaScript. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All font previewing, weight adjustments, and CSS generation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your font choices. The tool works completely offline after first load.
- **No Data Storage:** Your font selections and customizations are not saved on our servers. Browser localStorage used only for local favorites if you save them.
- **No Analytics Tracking:** We don't track which font pairings you preview or export.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your typography data.

This makes the tool safe for client work, proprietary brand development, or confidential projects. Use with confidence for commercial work.`
  },

  stats: {
    "Font Combinations": "50+",
    "Google Fonts": "100+",
    "Font Categories": "5+",
    "Export Formats": "CSS/HTML",
    "Server Uploads": "0"
  }
};
