/**
 * Color Palette Generator Tool Guide Content
 * Comprehensive developer guide for color palette creation
 */

import type { ToolGuideContent } from "./types";

export const paletteGuideContent: ToolGuideContent = {
  toolName: "Color Palette Generator",
  toolPath: "/palette",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Base Color",
      description: "Choose a starting color using the color picker or enter hex/RGB value. This base color anchors your palette and defines the overall mood and brand direction."
    },
    {
      title: "Choose Harmony Rule",
      description: "Select color harmony: monochromatic (single hue variations), analogous (adjacent colors), complementary (opposite colors), triadic (three evenly spaced), split-complementary, or tetradic (four colors)."
    },
    {
      title: "Generate Shade Variations",
      description: "Create tints (lighter), shades (darker), and tones (desaturated) of each color. Build complete color scales from 50 to 900 for design system integration."
    },
    {
      title: "Export Palette",
      description: "Copy palette as CSS variables, SCSS, JavaScript, JSON, or design tool format (Figma, Sketch). Export includes all shade variations with semantic naming for immediate use."
    }
  ],

  introduction: {
    title: "What is a Color Palette Generator?",
    content: `A color palette generator creates harmonious color combinations based on color theory principles. Instead of randomly selecting colors, generators use mathematical relationships between hues to ensure visual harmony. Professional palettes enhance brand identity, improve user experience, and maintain consistency across products.

Color theory provides frameworks for combining colors effectively. Complementary colors (opposite on color wheel) create vibrant contrast. Analogous colors (adjacent on wheel) produce serene harmony. Triadic colors (equally spaced) offer balanced variety. Generators apply these principles automatically.

### Why Designers Need Color Palette Tools

Selecting harmonious colors requires understanding of color theory, hue relationships, saturation balance, and value contrast. Manual color selection is time-consuming and often produces unbalanced results. Palette generators handle color mathematics, enabling designers to focus on creative direction.

Brand colors require systematic variations for different uses: primary brand color, hover states, active states, disabled states, backgrounds, borders, text. Each needs lighter tints and darker shades. Generators create complete shade scales (50-900) ensuring consistent progression.

Accessibility compliance demands sufficient color contrast for text readability (WCAG 4.5:1 for body text). Generators can check contrast ratios automatically, flagging accessibility issues before implementation.

Consistency across platforms requires centralized color definitions. Exporting palettes as CSS variables, design tokens, or platform-specific formats ensures developers and designers reference identical colors.

### Color Harmony Types

**Monochromatic:** Single hue with varying lightness and saturation. Creates cohesive, calming palettes. Use for minimalist designs or when emphasizing specific brand color. Example: blue palette from light sky blue to deep navy.

**Analogous:** Three adjacent colors on color wheel (e.g., blue, blue-green, green). Produces harmonious, nature-inspired palettes. Use for cohesive designs without high contrast. Example: sunset palette with yellow, orange, red.

**Complementary:** Two opposite colors on wheel (e.g., blue and orange). Creates maximum contrast and vibration. Use sparingly for high-impact accents. Example: sports team colors often use complementary schemes.

**Split-Complementary:** Base color plus two adjacent to its complement. Softer contrast than pure complementary. Balanced yet dynamic. Example: blue with yellow-orange and red-orange.

**Triadic:** Three evenly spaced colors (120deg apart). Balanced, vibrant palettes. Use when needing variety without chaos. Example: red, yellow, blue (primary colors) or purple, orange, green (secondary colors).

**Tetradic (Double Complementary):** Two complementary pairs. Rich, complex palettes. Challenging to balance - use one dominant, others accents. Example: blue/orange + yellow/purple.

### Color Properties and Terminology

**Hue:** Pure color (red, blue, yellow). Position on color wheel (0-360deg).

**Saturation:** Color intensity. 100% = pure vivid color, 0% = gray. Desaturated colors feel muted, professional. Highly saturated = energetic, youthful.

**Lightness/Value:** Brightness. 100% = white, 0% = black, 50% = pure hue. Light colors feel airy, dark colors sophisticated.

**Tint:** Color + white. Lighter versions for backgrounds, subtle accents.

**Shade:** Color + black. Darker versions for text, depth, hover states.

**Tone:** Color + gray. Muted versions for secondary elements, reduced emphasis.

### Building Color Scales

Modern design systems use numeric scales (50-900) for systematic color progression:

- **50:** Lightest tint, subtle backgrounds
- **100-200:** Light tints, hover states, backgrounds
- **300-400:** Medium tints, borders, disabled states
- **500:** Base brand color, primary actions
- **600-700:** Medium shades, hover states, active states
- **800-900:** Darkest shades, text, high contrast

Example Tailwind blue scale: blue-50 (lightest sky) to blue-900 (deep navy). Consistent progression enables predictable color choices.

### Color Accessibility

WCAG (Web Content Accessibility Guidelines) defines contrast requirements:

**Level AA (minimum):**
- Body text (< 18pt): 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Level AAA (enhanced):**
- Body text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio

Palette generators should indicate which color combinations meet accessibility standards. Dark text on light backgrounds or light text on dark backgrounds typically pass.

### Exporting Color Palettes

Professional workflows require multiple export formats:

**CSS Custom Properties:**
\`\`\`css
:root {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
}
\`\`\`

**SCSS Variables:**
\`\`\`scss
$primary-50: #eff6ff;
$primary-500: #3b82f6;
$primary-900: #1e3a8a;
\`\`\`

**JavaScript/TypeScript:**
\`\`\`typescript
export const colors = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  }
};
\`\`\`

**Design Tokens (JSON):**
\`\`\`json
{
  "color": {
    "primary": {
      "50": { "value": "#eff6ff" },
      "500": { "value": "#3b82f6" }
    }
  }
}
\`\`\`

### Color Psychology in Design

Colors evoke emotional responses and cultural associations:

**Blue:** Trust, professionalism, calm. Most popular brand color (tech, finance, healthcare). Safe, universally positive.

**Red:** Energy, urgency, passion. Use for alerts, CTAs, food/beverage brands. Attention-grabbing but can signal danger.

**Green:** Growth, health, nature. Environmental brands, finance (money), health. Calming, positive.

**Purple:** Luxury, creativity, wisdom. Premium brands, beauty products. Less common, stands out.

**Orange:** Enthusiasm, friendliness, affordability. Youth brands, budget services. Warm, approachable.

**Yellow:** Optimism, clarity, caution. Sparingly used (low contrast). Accents, highlights, warnings.

**Gray:** Neutrality, professionalism, sophistication. UI backgrounds, text, borders. Foundation of most palettes.

Choose colors aligning with brand personality and industry expectations.`,
  },

  useCases: [
    {
      title: "Brand Color System with Complete Scales",
      description: "Generate comprehensive brand color palette with tints and shades for all use cases. Create primary, secondary, and neutral color scales that work across backgrounds, text, borders, and interactive states.",
      example: `/* Complete brand color system with scale */
:root {
  /* Primary blue scale */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* Secondary purple scale */
  --color-secondary-50: #faf5ff;
  --color-secondary-100: #f3e8ff;
  --color-secondary-200: #e9d5ff;
  --color-secondary-300: #d8b4fe;
  --color-secondary-400: #c084fc;
  --color-secondary-500: #a855f7;
  --color-secondary-600: #9333ea;
  --color-secondary-700: #7e22ce;
  --color-secondary-800: #6b21a8;
  --color-secondary-900: #581c87;

  /* Neutral gray scale */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Semantic colors */
  --color-success-500: #10b981;
  --color-warning-500: #f59e0b;
  --color-error-500: #ef4444;
  --color-info-500: #3b82f6;
}

/* Usage in components */
.button-primary {
  background: var(--color-primary-600);
  color: white;
}

.button-primary:hover {
  background: var(--color-primary-700);
}

.button-primary:active {
  background: var(--color-primary-800);
}

.button-primary:disabled {
  background: var(--color-primary-300);
  opacity: 0.6;
}

/* TypeScript color system */
export const brandColors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  secondary: {
    50: '#faf5ff',
    500: '#a855f7',
    900: '#581c87'
  }
};`
    },
    {
      title: "Complementary Color Schemes",
      description: "Use complementary colors (opposite on color wheel) for high-contrast, vibrant designs. Perfect for CTAs, highlights, and creating visual energy. Balance with neutral grays to avoid overwhelming users.",
      example: `/* Blue and orange complementary palette */
:root {
  /* Primary blue */
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;

  /* Complementary orange */
  --orange-400: #fb923c;
  --orange-500: #f97316;
  --orange-600: #ea580c;

  /* Neutral grays for balance */
  --gray-50: #f9fafb;
  --gray-900: #111827;
}

/* High-contrast CTA */
.cta-button {
  background: var(--orange-500);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.cta-button:hover {
  background: var(--orange-600);
}

/* Blue primary button for comparison */
.button-primary {
  background: var(--blue-500);
  color: white;
}

/* Complementary accent section */
.hero-section {
  background: linear-gradient(135deg, var(--blue-600), var(--blue-500));
  color: white;
}

.accent-badge {
  background: var(--orange-500);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}`
    },
    {
      title: "Analogous Harmony for Cohesive Design",
      description: "Analogous colors (adjacent on wheel) create serene, unified palettes. Ideal for nature themes, wellness brands, or designs requiring visual calm. Less contrast than complementary but more variety than monochromatic.",
      example: `/* Blue-green-teal analogous palette */
:root {
  /* Blue */
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;

  /* Green (adjacent) */
  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;

  /* Teal (adjacent) */
  --teal-400: #2dd4bf;
  --teal-500: #14b8a6;
  --teal-600: #0d9488;
}

/* Gradient using analogous colors */
.gradient-background {
  background: linear-gradient(135deg, var(--blue-500), var(--teal-500), var(--green-500));
}

/* Cards with analogous accents */
.card-blue {
  border-top: 4px solid var(--blue-500);
  background: #eff6ff;
}

.card-green {
  border-top: 4px solid var(--green-500);
  background: #f0fdf4;
}

.card-teal {
  border-top: 4px solid var(--teal-500);
  background: #f0fdfa;
}

/* Nature-themed interface */
.nature-header {
  background: linear-gradient(180deg, var(--teal-50), white);
  border-bottom: 1px solid var(--green-200);
}

.nature-button {
  background: var(--green-500);
  color: white;
  transition: background 0.3s ease;
}

.nature-button:hover {
  background: var(--teal-600);
}`
    },
    {
      title: "Monochromatic Palette for Minimalism",
      description: "Single hue with varying lightness creates cohesive, sophisticated palettes. Perfect for minimalist designs, professional services, or when emphasizing content over color. Easy to maintain consistency.",
      example: `/* Monochromatic blue palette */
:root {
  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-300: #93c5fd;
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --blue-800: #1e40af;
  --blue-900: #1e3a8a;
}

/* Monochromatic interface */
body {
  background: var(--blue-50);
  color: var(--blue-900);
}

.header {
  background: var(--blue-900);
  color: var(--blue-50);
}

.card {
  background: white;
  border: 1px solid var(--blue-200);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.button {
  background: var(--blue-600);
  color: white;
}

.button:hover {
  background: var(--blue-700);
}

.button-outline {
  background: transparent;
  border: 2px solid var(--blue-600);
  color: var(--blue-600);
}

.badge {
  background: var(--blue-100);
  color: var(--blue-700);
  padding: 4px 12px;
  border-radius: 12px;
}

/* Monochromatic text hierarchy */
.text-primary {
  color: var(--blue-900);
}

.text-secondary {
  color: var(--blue-600);
}

.text-tertiary {
  color: var(--blue-400);
}

/* Backgrounds */
.bg-subtle {
  background: var(--blue-50);
}

.bg-light {
  background: var(--blue-100);
}

.bg-medium {
  background: var(--blue-200);
}`
    }
  ],

  howToUse: {
    title: "How to Use This Color Palette Generator",
    content: `This color palette generator creates harmonious color combinations based on color theory. Select base color, choose harmony rule, generate shade variations, and export for immediate use.

### Selecting Base Color

Choose starting color using color picker or input methods:

**Color Picker:** Visual HSL selector for intuitive color choice. Drag hue slider for base color family, adjust saturation/lightness for specific shade.

**Hex Input:** Enter 6-digit hex code (#3b82f6). Precise color matching to existing brand colors or design specs.

**RGB Input:** Enter red, green, blue values (0-255). Common in digital design tools.

**HSL Input:** Hue (0-360deg), Saturation (0-100%), Lightness (0-100%). Most intuitive for understanding color relationships.

Base color anchors entire palette. Choose carefully - represents primary brand color or dominant interface color.

### Choosing Harmony Rule

Select color relationship type:

**Monochromatic:** Single hue, varying lightness. Creates cohesive, calming palettes. Best for: minimalist designs, professional services, content-focused sites.

**Analogous:** Adjacent colors (30deg apart). Harmonious, low-contrast. Best for: nature themes, wellness brands, serene interfaces.

**Complementary:** Opposite colors (180deg). High contrast, vibrant. Best for: sports, youth brands, attention-grabbing CTAs.

**Split-Complementary:** Base + two adjacent to complement. Balanced contrast. Best for: versatile designs needing variety without chaos.

**Triadic:** Three evenly spaced colors (120deg). Balanced, vibrant. Best for: playful brands, diverse content categories.

**Tetradic:** Two complementary pairs. Complex, rich. Best for: advanced designs, complex information hierarchies.

Generator displays selected harmony on color wheel, showing mathematical relationships between chosen colors.

### Generating Shade Scales

Create complete color scale (50-900) for each palette color:

**Tints (50-400):** Lighter versions (color + white). Use for backgrounds, subtle accents, hover states.

**Base (500):** Pure color. Primary buttons, brand elements, key accents.

**Shades (600-900):** Darker versions (color + black). Text, active states, depth, high contrast.

Adjust scale generation:
- **Lightness curve:** Linear (even progression) or curved (more mid-tones)
- **Saturation:** Maintain saturation or desaturate towards extremes
- **Steps:** 5, 9, or 11 steps (9 standard for design systems)

Preview all shades with sample UI elements (text, buttons, backgrounds) to verify usability.

### Checking Accessibility

Test color combinations for WCAG compliance:

Generator shows contrast ratio for each color pair. Green checkmark = passes WCAG AA (4.5:1 body text, 3:1 large text). Red X = fails.

Adjust lightness of problematic colors until contrast passes. Dark text on light backgrounds or light text on dark backgrounds typically work.

### Exporting Palette

Copy palette in multiple formats:

**CSS Variables:** Paste into global stylesheet. Use var(--color-primary-500) in code.

**SCSS:** Import into Sass files. Use $primary-500 throughout stylesheets.

**JavaScript:** Import into JS/TS. Access as colors.primary[500].

**JSON:** Design token format. Import into design tools or token management systems.

**Figma:** Directly importable color styles.

Choose format matching project toolchain for seamless integration.

### Saving Palettes

Save palettes to browser localStorage for quick access across sessions. Build library of client palettes, brand variations, or inspiration palettes. Export saved palettes as JSON for backup.`,
    steps: [
      {
        name: "Select Base Color",
        text: "Choose starting color using picker, hex input, or RGB/HSL values. This anchors your palette and defines brand color direction. Test multiple base colors to find right brand fit."
      },
      {
        name: "Choose Harmony Rule",
        text: "Select color relationship: monochromatic (single hue), analogous (adjacent), complementary (opposite), triadic (three evenly spaced). Each creates different mood and contrast level."
      },
      {
        name: "Generate Shade Scales",
        text: "Create tints (50-400), base (500), and shades (600-900) for each color. Adjust lightness curve and saturation. Preview shades on sample UI elements."
      },
      {
        name: "Export Palette",
        text: "Copy as CSS variables, SCSS, JavaScript, JSON, or Figma format. Includes all shade variations with semantic naming. Check accessibility before export."
      }
    ]
  },

  faqs: [
    {
      question: "What color harmony should I use for my brand?",
      answer: "Monochromatic for minimalist/professional brands - cohesive, sophisticated. Analogous for nature/wellness - harmonious, calming. Complementary for sports/youth - energetic, high-contrast. Triadic for diverse brands - balanced variety. Start with monochromatic for simplicity, add complementary accent for CTAs. Test multiple harmonies to find best brand fit."
    },
    {
      question: "How many colors should be in my design system palette?",
      answer: "Primary color (brand), secondary color (accent), neutral grays, semantic colors (success/warning/error/info). Each with 9-11 shade scale (50-900). Total ~50-60 color values. Avoid more - creates decision fatigue. Tailwind CSS uses this structure: 10 color families, 9 shades each = 90 total values."
    },
    {
      question: "What's the difference between tints, shades, and tones?",
      answer: "Tint = color + white (lighter). Shade = color + black (darker). Tone = color + gray (desaturated, muted). Use tints for backgrounds/subtle accents. Shades for text/high contrast. Tones for secondary elements/reduced emphasis. Complete palette includes all three for versatility."
    },
    {
      question: "How do I ensure my colors are accessible?",
      answer: "Check contrast ratio: WCAG AA requires 4.5:1 for body text (< 18pt), 3:1 for large text (18pt+). Use palette generator contrast checker. Dark text on light backgrounds or light on dark usually passes. Avoid light text on light backgrounds or dark on dark. Test with actual text sizes in context."
    },
    {
      question: "What does the 500 in color-primary-500 mean?",
      answer: "Numeric scale (50-900) indicates lightness: 50 = lightest tint, 500 = base color, 900 = darkest shade. Consistent across all colors - primary-500 and secondary-500 have similar lightness. Industry standard from Tailwind CSS. Makes color system predictable and scalable."
    },
    {
      question: "Can I use hex codes and RGB values interchangeably?",
      answer: "Yes, both define same colors. Hex (#3b82f6) more common in CSS. RGB (rgb(59, 130, 246)) easier for JavaScript manipulation. HSL (hsl(217, 91%, 60%)) most intuitive for adjusting lightness/saturation. Generators convert between all formats. Use hex for static colors, RGB/HSL for dynamic color manipulation."
    },
    {
      question: "How do I pick colors that work for colorblind users?",
      answer: "Avoid red-green combinations (most common colorblindness). Use different lightness values in addition to hue differences. Test with colorblind simulators. Include non-color indicators (icons, patterns, text labels) alongside color coding. Don't rely solely on color to convey information. Blue-orange complementary works better than red-green."
    },
    {
      question: "What's the best way to choose a brand color?",
      answer: "Consider industry conventions (blue = trust/tech, green = health/nature, red = energy/food), competitor colors (differentiate), target audience (age, culture), brand personality (playful, professional, luxury). Test colors in context on mockups. Get feedback from target users. Blue safest choice - universally positive. Avoid trendy colors that date quickly."
    },
    {
      question: "How do I create dark mode colors from light mode palette?",
      answer: "Invert lightness scale: light mode uses 50-200 for backgrounds, 700-900 for text. Dark mode uses 700-900 for backgrounds, 50-200 for text. Reduce saturation in dark mode (vibrant colors harsh on dark backgrounds). Maintain same hues, adjust lightness/saturation. Test readability - dark mode requires different contrast ratios."
    },
    {
      question: "Is my color palette private when using this tool?",
      answer: "Yes. All color generation happens client-side in your browser. No color values, harmony selections, or exports are sent to servers. No tracking, no storage. Safe for proprietary brand colors or client work. Tool works offline after initial load. Your color palettes never leave your device."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your color palettes never leave your browser. This generator operates entirely client-side using JavaScript. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All color generation, harmony calculations, and shade creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your colors. The tool works completely offline after first load.
- **No Data Storage:** Your color choices and palettes are not saved on our servers. Browser localStorage used only for local saves if you enable it.
- **No Analytics Tracking:** We don't track which colors you generate or which harmonies you select.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your color data.

This makes the tool safe for proprietary brand colors, client work, or confidential projects. Use with confidence for commercial branding.`
  },

  stats: {
    "Harmony Types": "6",
    "Shade Variations": "9-11",
    "Export Formats": "5+",
    "Contrast Checker": "Yes",
    "Server Uploads": "0"
  }
};
