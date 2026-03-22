/**
 * Color Palette Extractor Tool Guide Content
 * Comprehensive developer guide for extracting colors from images
 */

import type { ToolGuideContent } from "./types";

export const paletteExtractGuideContent: ToolGuideContent = {
  toolName: "Color Palette Extractor",
  toolPath: "/palette-extract",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Upload or Select Image",
      description: "Upload photo, screenshot, or design asset. Extractor analyzes image pixel data to identify dominant and accent colors. Works with JPG, PNG, WebP, SVG images."
    },
    {
      title: "Adjust Color Count",
      description: "Select how many colors to extract (3-15 typical). More colors capture nuance, fewer create focused palettes. Algorithm clusters similar colors and selects representative samples."
    },
    {
      title: "Review Extracted Palette",
      description: "View extracted colors sorted by prominence. See percentage of image each color represents. Click colors to view hex codes, RGB values, HSL values. Test colors on sample UI elements."
    },
    {
      title: "Export Color Palette",
      description: "Copy palette as CSS, SCSS, JavaScript, JSON, or design tool format. Includes dominant colors with semantic naming. Use extracted palette as brand color inspiration or design starting point."
    }
  ],

  introduction: {
    title: "What is Color Palette Extraction?",
    content: `Color palette extraction analyzes images to identify dominant and accent colors using computer vision algorithms. Instead of manually picking colors from photos or designs, extractors automatically detect the most representative colors. Perfect for deriving brand palettes from logos, creating themes from photographs, or ensuring design consistency.

Color extraction uses color quantization algorithms like k-means clustering, median cut, or octree quantization. These algorithms analyze pixel data, group similar colors, and select representative samples that best capture the image's color distribution.

### Why Extract Color Palettes from Images

Photos contain thousands or millions of unique pixel colors. Manually identifying key colors is time-consuming and subjective. Extraction algorithms objectively identify statistically significant colors, providing data-driven palette foundation.

Brand assets (logos, product photos, packaging) define visual identity. Extracting colors from these assets ensures digital presence matches physical brand materials. Consistency across media strengthens brand recognition.

Design inspiration often comes from nature, art, or photography. Extraction translates visual inspiration into usable color palettes for web/app design. Sunset photo becomes website color scheme, painting inspires app theme.

Color accessibility requires systematic palette planning. Extracted palettes provide starting point - designers adjust lightness/contrast for WCAG compliance while maintaining aesthetic harmony rooted in original image.

### Color Extraction Algorithms

**K-Means Clustering:** Iteratively groups pixels into k clusters, selecting cluster centers as palette colors. Produces well-distributed palettes representing image color space. Most common algorithm for web extractors.

**Median Cut:** Recursively divides color space into boxes containing similar pixel counts, selecting median color from each box. Fast, produces balanced palettes. Used in GIF color reduction.

**Octree Quantization:** Builds tree structure of color space, pruning nodes to desired palette size. Efficient for large images, hierarchical color grouping.

**Color Thief Algorithm:** Popular JavaScript library using median cut with additional refinements. Optimized for web, produces aesthetically pleasing palettes from images.

All algorithms aim to reduce millions of colors to manageable palette (5-15 colors) while preserving image character.

### Extracted Palette Applications

**Brand Color Definition:** Upload logo to extract official brand colors. Ensures consistent hex codes across all materials. Derivatives for backgrounds, accents, text.

**Theme Creation:** Extract palette from hero image to create cohesive website theme. Colors naturally complement since derived from single image.

**Mood Boards:** Analyze inspiration images (interiors, fashion, nature) to create design-aligned palettes. Translates visual mood into actionable colors.

**Product Palettes:** Extract colors from product photography for e-commerce sites. Ensure product pages match actual product colors.

**Art-Inspired Design:** Use famous paintings or artwork as palette source. Incorporate artistic color harmonies into digital designs.

### Dominant vs Accent Colors

Extractors typically classify colors by image coverage:

**Dominant Colors:** Largest percentage of pixels. Primary backgrounds, major elements. Usually 2-3 dominant colors form palette foundation.

**Accent Colors:** Smaller but visually significant. Details, highlights, contrast elements. 3-5 accent colors add variety without overwhelming.

**Trace Colors:** Minor presence but may be perceptually important (bright red in mostly blue image catches eye despite small area). Some extractors weight perceptual importance over pixel count.

### Refining Extracted Palettes

Raw extraction often needs refinement:

**Remove Grays:** Images contain many neutral grays from shadows/highlights. Filter out near-gray colors to focus on chromatic palette.

**Adjust Lightness:** Extracted colors may be too light (washed out) or too dark (muddy). Adjust to 40-60% lightness range for usable brand colors.

**Increase Saturation:** Photos often have muted colors. Boost saturation 10-20% for vibrant digital palette.

**Check Contrast:** Verify extracted colors provide sufficient contrast for text/backgrounds. Adjust lightness if accessibility fails.

**Expand to Scale:** Generate tints/shades (50-900 scale) from extracted base colors for complete design system.

### Limitations and Considerations

**Photography Bias:** Palettes reflect photo conditions (lighting, filters, camera settings) not just subject colors. Studio photo may yield different palette than outdoor photo of same subject.

**Color Accuracy:** Monitor calibration affects perceived colors. Extracted hex codes are mathematically accurate to image file but may display differently across devices.

**Context Loss:** Extracted colors lose spatial relationships. Palette shows "what colors" but not "where/how colors interact" in original image.

**Algorithm Variation:** Different algorithms produce different palettes from same image. No objectively "correct" palette - choose algorithm matching aesthetic goals.

### Best Practices

**High Quality Source:** Use high-resolution, well-lit images. Blurry or dark photos produce muddy palettes.

**Representative Images:** Choose images embodying desired aesthetic. Hero photo, key product shot, brand asset.

**Extract Multiple Options:** Try different color counts (5, 8, 12 colors). More colors = more options, fewer = more focused.

**Manual Refinement:** Treat extraction as starting point, not final palette. Adjust colors for brand fit and accessibility.

**Test in Context:** Preview extracted colors on actual UI mockups. Colors attractive in isolation may clash in layout.`,
  },

  useCases: [
    {
      title: "Extracting Brand Colors from Logo",
      description: "Analyze logo file to identify official brand colors with precise hex codes. Ensures consistency across all digital touchpoints. Eliminates guesswork and manual color picking from design files.",
      example: `/* Extracted logo colors */
:root {
  /* Primary brand blue (extracted dominant) */
  --brand-primary: #2563eb;
  --brand-primary-light: #60a5fa;
  --brand-primary-dark: #1e40af;

  /* Secondary brand purple (extracted accent) */
  --brand-secondary: #7c3aed;
  --brand-secondary-light: #a78bfa;
  --brand-secondary-dark: #5b21b6;

  /* Neutral extracted */
  --brand-gray: #64748b;
}

/* Usage maintaining logo colors */
.logo-header {
  background: var(--brand-primary);
}

.cta-button {
  background: var(--brand-secondary);
  color: white;
}

.logo-gradient {
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
}

/* TypeScript brand colors */
export const logoColors = {
  primary: {
    default: '#2563eb',
    light: '#60a5fa',
    dark: '#1e40af'
  },
  secondary: {
    default: '#7c3aed',
    light: '#a78bfa',
    dark: '#5b21b6'
  }
};`
    },
    {
      title: "Creating Theme from Hero Image",
      description: "Extract palette from hero photograph to create cohesive website theme. Colors naturally harmonize since derived from single image. Perfect for photography portfolios, travel sites, or image-heavy designs.",
      example: `/* Palette extracted from sunset beach photo */
:root {
  /* Dominant sky blues */
  --sky-blue: #60a5fa;
  --ocean-blue: #3b82f6;

  /* Sunset oranges and golds */
  --sunset-orange: #fb923c;
  --golden-hour: #fbbf24;

  /* Sand neutrals */
  --sand-light: #fef3c7;
  --sand-dark: #d97706;

  /* Deep sea accent */
  --deep-blue: #1e3a8a;
}

/* Theme applied to components */
body {
  background: linear-gradient(180deg, var(--sky-blue), var(--ocean-blue));
  color: var(--deep-blue);
}

.hero-section {
  background-image: linear-gradient(
    180deg,
    var(--golden-hour),
    var(--sunset-orange)
  );
  color: white;
}

.card {
  background: var(--sand-light);
  border: 1px solid var(--sand-dark);
}

.cta-button {
  background: var(--sunset-orange);
  color: white;
}

.cta-button:hover {
  background: var(--golden-hour);
}

/* Section backgrounds */
.section-alt {
  background: var(--ocean-blue);
  color: white;
}

.footer {
  background: var(--deep-blue);
  color: var(--sand-light);
}`
    },
    {
      title: "Product Color Palettes for E-Commerce",
      description: "Extract colors from product photography to create matching UI themes. Ensures product pages visually align with actual products. Enhances brand cohesion across catalog.",
      example: `/* Extracted from blue sneaker product photo */
:root {
  /* Product primary (shoe blue) */
  --product-primary: #3b82f6;
  --product-primary-light: #93c5fd;
  --product-primary-dark: #1e40af;

  /* Product accent (lace yellow) */
  --product-accent: #fbbf24;

  /* Neutral (background white/gray) */
  --product-bg: #f3f4f6;
  --product-shadow: #6b7280;
}

.product-card {
  background: var(--product-bg);
  border: 2px solid var(--product-primary-light);
  border-radius: 12px;
}

.product-badge {
  background: var(--product-accent);
  color: #1f2937;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
}

.add-to-cart {
  background: var(--product-primary);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
}

.add-to-cart:hover {
  background: var(--product-primary-dark);
}

.product-details {
  color: var(--product-shadow);
}

/* Product page gradient */
.product-hero {
  background: linear-gradient(
    135deg,
    var(--product-primary-light),
    var(--product-bg)
  );
}`
    },
    {
      title: "Art and Photography Inspired Palettes",
      description: "Use famous artworks, vintage photographs, or nature imagery as palette source. Creates culturally resonant or aesthetically sophisticated color schemes rooted in established visual art.",
      example: `/* Palette extracted from Van Gogh Starry Night */
:root {
  /* Deep night blues */
  --starry-night: #1e3a8a;
  --midnight-blue: #1e40af;

  /* Swirling sky blues */
  --sky-swirl: #3b82f6;
  --azure: #60a5fa;

  /* Golden stars and moon */
  --star-gold: #fbbf24;
  --moon-yellow: #fef08a;

  /* Village lights orange */
  --village-light: #fb923c;

  /* Cypress tree green */
  --cypress: #15803d;
}

/* Art-inspired header */
.art-header {
  background: linear-gradient(
    135deg,
    var(--starry-night),
    var(--midnight-blue),
    var(--sky-swirl)
  );
  color: var(--moon-yellow);
}

.highlight-box {
  background: var(--azure);
  border-left: 4px solid var(--star-gold);
  padding: 24px;
  color: white;
}

.accent-button {
  background: var(--village-light);
  color: white;
}

.accent-button:hover {
  background: var(--star-gold);
  color: var(--starry-night);
}

/* Nature-inspired palette extraction */
/* Extracted from forest photograph */
:root {
  --forest-green: #15803d;
  --moss-green: #22c55e;
  --earth-brown: #92400e;
  --sky-peek: #60a5fa;
}

.nature-card {
  background: linear-gradient(180deg, var(--sky-peek), var(--forest-green));
  color: white;
}`
    }
  ],

  howToUse: {
    title: "How to Use This Color Palette Extractor",
    content: `This color palette extractor analyzes images to identify dominant and accent colors. Upload image, adjust color count, review extracted palette, and export for immediate use.

### Uploading Images

**Drag and Drop:** Drag image file onto upload area. Supports JPG, PNG, WebP, SVG, GIF formats.

**File Browser:** Click upload button to browse local files. Select logo, photo, design asset, or artwork.

**Image URL:** Paste direct image URL for extraction without download. Useful for web images.

**Best Image Types:**
- Logos (brand color extraction)
- Hero photographs (theme creation)
- Product photos (e-commerce palettes)
- Artwork (artistic inspiration)
- Mood board images (design direction)

**Image Quality:** Higher resolution = more accurate extraction. Minimum 500x500px recommended. Avoid overly compressed JPGs (compression artifacts affect colors).

### Adjusting Extraction Settings

**Color Count:** Select 3-15 colors to extract. Defaults to 5-6 for focused palettes.
- 3-5 colors: Simple, focused palettes (minimalist designs)
- 6-8 colors: Balanced palettes (most use cases)
- 9-15 colors: Comprehensive palettes (complex designs, inspiration)

**Algorithm:** Some extractors offer algorithm choice (k-means, median cut). K-means produces smoother palettes, median cut preserves distinctive colors.

**Ignore Grays:** Filter out near-neutral colors to focus on chromatic palette. Useful when extracting from photos with large neutral areas.

**Sort Method:**
- By frequency (most common colors first)
- By vibrancy (most saturated colors first)
- By lightness (light to dark)

### Reviewing Extracted Colors

Each extracted color shows:
- **Color swatch:** Visual preview
- **Hex code:** #3b82f6 for CSS
- **RGB values:** rgb(59, 130, 246)
- **HSL values:** hsl(217, 91%, 60%)
- **Coverage:** Percentage of image pixels (10% = 10% of image is this color)

**Preview Colors:** See colors applied to buttons, cards, text, backgrounds. Test readability and aesthetics.

**Adjust Colors:** Click color to open editor. Fine-tune hue, saturation, lightness while maintaining image-inspired base.

**Check Contrast:** Verify color pairs meet WCAG accessibility standards (4.5:1 for text). Adjust lightness if needed.

### Removing Unwanted Colors

Extraction may include undesired colors:
- Background colors from image edges
- Shadows/highlights creating unwanted grays
- Minor elements not representative of aesthetic

Click X or trash icon to remove colors from palette. Regenerate with adjusted settings if needed.

### Expanding Palette to Scale

Generate full shade scale (50-900) from extracted colors:

**Tints (50-400):** Automatically generate lighter versions for backgrounds, subtle accents.

**Base (500):** Extracted color as-is.

**Shades (600-900):** Automatically generate darker versions for text, depth, high contrast.

Creates design-system-ready palette from simple extraction.

### Exporting Extracted Palette

Copy palette in production formats:

**CSS Variables:**
\`\`\`css
:root {
  --color-1: #3b82f6;
  --color-2: #fbbf24;
}
\`\`\`

**SCSS Variables:**
\`\`\`scss
$color-1: #3b82f6;
$color-2: #fbbf24;
\`\`\`

**JavaScript:**
\`\`\`javascript
export const palette = ['#3b82f6', '#fbbf24'];
\`\`\`

**JSON Design Tokens:**
\`\`\`json
{
  "color": {
    "extracted-1": { "value": "#3b82f6" }
  }
}
\`\`\`

**Figma/Sketch:** Import as color styles for design tool synchronization.

### Best Practices

**Use Representative Images:** Choose images embodying desired aesthetic. Hero photo, flagship product, primary brand asset.

**Start with Fewer Colors:** Extract 5-6 colors first. Add more if needed. Easier to expand than narrow down.

**Manual Refinement:** Treat extraction as inspiration, not final palette. Adjust for brand fit, accessibility, context.

**Test in Context:** Apply extracted colors to actual designs. Colors attractive in isolation may not work in layouts.

**Combine with Theory:** Use extracted palette alongside color harmony rules. Extraction provides base, theory adds structure.`,
    steps: [
      {
        name: "Upload Image",
        text: "Drag and drop or select image file (JPG, PNG, WebP, SVG). Choose representative image: logo for brand colors, photo for theme, product for matching palette. Higher resolution = better extraction."
      },
      {
        name: "Adjust Settings",
        text: "Select color count (3-15, default 5-6). Choose algorithm (k-means for smooth palettes). Enable ignore grays to focus on chromatic colors. Set sort method (frequency, vibrancy, lightness)."
      },
      {
        name: "Review Palette",
        text: "View extracted colors with hex codes, RGB, HSL values, image coverage percentage. Preview colors on UI elements. Remove unwanted colors (backgrounds, shadows). Adjust hue/saturation/lightness."
      },
      {
        name: "Export Colors",
        text: "Copy as CSS variables, SCSS, JavaScript, JSON, or design tool format. Optionally expand to full shade scale (50-900). Use extracted palette as brand foundation or theme starting point."
      }
    ]
  },

  faqs: [
    {
      question: "How many colors should I extract from an image?",
      answer: "5-6 colors for focused, usable palettes. 3-4 for minimalist designs. 8-12 for comprehensive inspiration palettes. More colors = more options but harder to choose. Start with 5-6, add more if palette feels limited. Fewer colors easier to work with in actual designs."
    },
    {
      question: "Why do extracted colors look different from the image?",
      answer: "Extraction identifies statistically dominant colors, not necessarily most visually prominent. Large neutral areas (sky, background) contribute many pixels affecting averages. Algorithm clusters similar colors - your perception may focus on smaller but more saturated elements. Adjust color count or algorithm for different results."
    },
    {
      question: "Can I extract colors from logos with transparency?",
      answer: "Yes, PNG logos with transparency work. Extractor analyzes visible pixels, ignoring transparent areas. Upload logo on white background if transparency causes issues. SVG logos converted to raster for extraction - ensure sufficient size for accurate color detection."
    },
    {
      question: "How do I remove background colors from extraction?",
      answer: "Crop image to focus on subject, removing background before upload. Or manually delete unwanted colors from extracted palette. Some extractors have ignore-background option detecting and excluding dominant background colors automatically. Focus on foreground elements for more relevant palette."
    },
    {
      question: "What's the difference between dominant and accent colors?",
      answer: "Dominant colors cover largest image area (backgrounds, primary elements). Usually 2-3 colors forming palette foundation. Accent colors have smaller presence but visual significance (highlights, details). 3-5 accent colors add variety. Extraction typically sorts by coverage - first colors are dominant, later are accents."
    },
    {
      question: "Do extracted colors meet accessibility standards?",
      answer: "Not automatically. Extraction identifies colors in image, not necessarily accessible color pairs. Check contrast ratios (4.5:1 for text). Adjust lightness of extracted colors to meet WCAG requirements while maintaining hue relationships. Use contrast checker after extraction."
    },
    {
      question: "Can I extract colors from screenshots or existing websites?",
      answer: "Yes. Screenshot website, upload to extractor. Identifies color palette of existing designs. Useful for competitive analysis or reverse-engineering design aesthetics. Note: extraction shows what colors exist, not necessarily best colors for your brand."
    },
    {
      question: "How do I turn extracted colors into a complete design system?",
      answer: "Extraction provides base colors (500 level). Generate tints (50-400) by adding white, shades (600-900) by adding black. Create semantic aliases: primary = extracted-1, secondary = extracted-2. Add neutral grays not from extraction. Build full scale (50-900) for each extracted color."
    },
    {
      question: "Why do different extractors give different results from same image?",
      answer: "Different algorithms (k-means, median cut, octree) produce different palettes. K-means smooths color space, median cut preserves distinctive colors. Color count affects results - 5 vs 10 colors yields different granularity. Weighting (by frequency vs perceptual importance) changes outputs. No objectively correct palette - choose tool/algorithm matching aesthetic goals."
    },
    {
      question: "Is my uploaded image private when using this tool?",
      answer: "Yes. All color extraction happens client-side in your browser using JavaScript and Canvas API. Images never uploaded to servers. Processing occurs locally on your device. No image data, extracted colors, or uploads stored anywhere. Tool works offline after initial load. Your images and extracted palettes never leave your device."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your images and extracted color palettes never leave your browser. This extractor operates entirely client-side using JavaScript Canvas API. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All image analysis, color extraction, and palette generation happen in your browser using Canvas API and JavaScript.
- **No Image Uploads:** Images stay on your device. We don't have servers to receive uploads. Tool processes images locally in browser memory.
- **No Data Storage:** Your images and extracted palettes are not saved anywhere. Browser processes images, discards after extraction.
- **No Analytics Tracking:** We don't track which images you upload or colors you extract.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing image or color data.

This makes the tool safe for proprietary logos, confidential product photos, client work, or sensitive brand assets. Use with confidence for commercial projects. Your visual assets remain completely private.`
  },

  stats: {
    "Supported Formats": "JPG/PNG/WebP/SVG",
    "Color Range": "3-15",
    "Algorithms": "K-means/Median Cut",
    "Export Formats": "5+",
    "Server Uploads": "0"
  }
};
