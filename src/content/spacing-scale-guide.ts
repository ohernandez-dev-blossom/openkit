/**
 * Spacing Scale Generator Tool Guide Content  
 * Comprehensive developer guide for spacing systems
 */

import type { ToolGuideContent } from "./types";

export const spacingScaleGuideContent: ToolGuideContent = {
  toolName: "Spacing Scale Generator",
  toolPath: "/spacing-scale",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Base Unit",
      description: "Choose foundation unit for spacing scale: 4px (compact), 8px (standard), or 16px (generous). Base unit determines all scale values through mathematical progression."
    },
    {
      title: "Choose Scale Type",
      description: "Select linear (even increments), modular (ratio-based), or fibonacci (natural progression). Each creates different spacing rhythm and visual hierarchy."
    },
    {
      title: "Generate Scale Values",
      description: "Tool calculates complete spacing scale from 0 to largest value. Preview shows actual spacing sizes with visual reference. Adjust scale steps (8, 12, or 16 values) as needed."
    },
    {
      title: "Export Spacing System",
      description: "Copy scale as CSS variables, SCSS, JavaScript, or JSON design tokens. Includes semantic naming (spacing-xs, spacing-md, spacing-xl) for easy reference in code."
    }
  ],

  introduction: {
    title: "What is a Spacing Scale?",
    content: `A spacing scale is a systematic set of predetermined values for margins, padding, gaps, and positioning. Instead of arbitrary spacing (12px here, 18px there), scales provide consistent options rooted in mathematical progression. Spacing scales are fundamental to professional design systems, ensuring visual harmony and development efficiency.

Consistent spacing creates visual rhythm - the eye perceives regular intervals as organized and professional. Random spacing feels chaotic. Systematic scales eliminate spacing decisions, reducing cognitive load for designers and developers while ensuring consistency across products.

### Why Design Systems Need Spacing Scales

Without scales, teams create spacing inconsistencies. One developer uses 12px padding, another 14px, another 16px. Components feel subtly misaligned. Spacing scales prevent this fragmentation by providing limited, standardized options.

Design tokens centralize spacing values. Update scale in one place, all components referencing tokens update automatically. Impossible with hardcoded values scattered across stylesheets.

Responsive design requires proportional spacing adjustments. Scale-based spacing maintains relative proportions at all screen sizes. Double spacing at all levels (mobile to desktop) preserves visual relationships.

Accessibility benefits from consistent spacing. Adequate touch target spacing (44x44px minimum), comfortable reading line-height, clear component separation - all easier with systematic scales than ad-hoc spacing.

### Common Spacing Scale Systems

**Base-4 System:** Increments of 4px (0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96). Compact, precise control. Popular in modern UI frameworks. Enables tight layouts without feeling cramped.

**Base-8 System:** Increments of 8px (0, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128). Industry standard. Google Material Design, Apple HIG use base-8. Balances granularity with simplicity.

**Tailwind Scale:** Modified base-4 (0, 1px, 2px, 4px, 6px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px). Named 0-96. More steps at small sizes for fine control.

**Modular Scale (Ratio-Based):** Multiply base by ratio: 1.25 (major third), 1.5 (perfect fifth), 1.618 (golden ratio). Creates harmonious progression. Common in typography, less common for spacing.

**Fibonacci Sequence:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89px. Natural progression, organic feel. Less common but mathematically elegant.

### Spacing Scale Naming Conventions

**Numeric:** 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 (Tailwind approach). Clear progression, no semantic ambiguity. --spacing-4 = 16px (4 x 4px base).

**T-Shirt Sizes:** xs, sm, md, lg, xl, 2xl, 3xl. Intuitive but limited scalability (what's smaller than xs?). Good for marketing, less precise for development.

**Semantic:** tight, snug, normal, relaxed, loose. Descriptive but subjective. Different developers interpret "relaxed" differently.

**Hybrid:** Combine methods. Base tokens (spacing-1 through spacing-12) and semantic aliases (spacing-component-padding = spacing-4). Best of both approaches.

### Mathematical Progressions

**Linear Progression:** Add constant value each step (4, 8, 12, 16, 20). Simple, predictable. Works well for base-4/8 systems.

**Geometric Progression:** Multiply by ratio each step (4, 8, 16, 32, 64). Exponential growth. Large spacing differences quickly. Good for dramatic scale changes.

**Modular Scale:** Base x ratio^n. 16px base x 1.25 ratio = 16, 20, 25, 31, 39, 49px. Creates harmonious relationships. Popular in typography, applicable to spacing.

**Fibonacci:** Each value is sum of previous two (0, 1, 1, 2, 3, 5, 8, 13, 21, 34). Appears in nature, feels organic. Less common in UI but aesthetically pleasing.

### Applying Spacing Scales

**Component Padding:** Use scale for consistent internal spacing. Button: padding: var(--spacing-2) var(--spacing-4). Card: padding: var(--spacing-6).

**Margins Between Elements:** Stack spacing using scale. Heading margin-bottom: var(--spacing-4). Section margin-bottom: var(--spacing-12).

**Grid Gaps:** Layout spacing from scale. Grid gap: var(--spacing-6). Flexbox gap: var(--spacing-4).

**Absolute Positioning:** Position elements using scale. top: var(--spacing-8). right: var(--spacing-4).

**Line Heights:** Typography spacing from scale. line-height: var(--spacing-7) ensures vertical rhythm aligns with spacing system.

### Responsive Spacing

Spacing scales can adjust at breakpoints:

\`\`\`css
:root {
  --spacing-4: 16px;
}

@media (min-width: 768px) {
  --spacing-4: 20px; /* 25% larger on tablet+ */
}

@media (min-width: 1024px) {
  --spacing-4: 24px; /* 50% larger on desktop */
}
\`\`\`

Maintains proportional spacing at all screen sizes. Alternatively, use rem units for automatic scaling with user font size preferences.

### Spacing and Grid Systems

Spacing scales align with grid systems for cohesive layouts. 8px spacing scale pairs with 8px grid increments. Column gutters use spacing tokens: column-gap: var(--spacing-6).

Vertical rhythm maintains consistent baseline grid. Line heights and spacing multiples of base unit (8px) create aligned baselines across elements.

### Browser Support and Performance

CSS custom properties (variables) for spacing work in all modern browsers (96%+ support). No performance impact - variables resolve at parse time, not runtime.

Spacing values are simple numbers - no complex calculations. Applying spacing scales is as performant as hardcoded values with better maintainability.`,
  },

  useCases: [
    {
      title: "Component Spacing System",
      description: "Apply consistent spacing to buttons, cards, forms, and UI components. Spacing scale ensures all components feel cohesive with predictable padding, margins, and gaps.",
      example: `/* Base-8 spacing scale */
:root {
  --spacing-0: 0;
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;
  --spacing-8: 64px;
  --spacing-10: 80px;
  --spacing-12: 96px;
}

/* Button padding from scale */
.button {
  padding: var(--spacing-2) var(--spacing-4);
  /* 16px vertical, 32px horizontal */
  border-radius: 8px;
}

.button-sm {
  padding: var(--spacing-1) var(--spacing-3);
  /* 8px vertical, 24px horizontal */
}

.button-lg {
  padding: var(--spacing-3) var(--spacing-5);
  /* 24px vertical, 40px horizontal */
}

/* Card spacing */
.card {
  padding: var(--spacing-6);
  /* 48px all sides */
  margin-bottom: var(--spacing-4);
  /* 32px bottom margin */
}

.card-compact {
  padding: var(--spacing-3);
  /* 24px all sides */
}

/* Form field spacing */
.form-field {
  margin-bottom: var(--spacing-4);
}

.form-field label {
  margin-bottom: var(--spacing-1);
  display: block;
}

.form-field input {
  padding: var(--spacing-2);
}

/* Modal spacing */
.modal {
  padding: var(--spacing-6);
  gap: var(--spacing-4);
}

.modal-header {
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: var(--spacing-4);
}

/* Grid gaps */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-4);
}

.flex-row {
  display: flex;
  gap: var(--spacing-2);
}

/* React component with spacing */
const Card = ({ children, padding = 4 }) => (
  <div style={{ padding: \`var(--spacing-\${padding})\` }} className="card">
    {children}
  </div>
);`
    },
    {
      title: "Layout Spacing and Sections",
      description: "Use spacing scale for consistent section margins, container padding, and page layout. Larger scale values create breathing room between major layout sections.",
      example: `/* Layout spacing with scale */
:root {
  --spacing-0: 0;
  --spacing-4: 32px;
  --spacing-6: 48px;
  --spacing-8: 64px;
  --spacing-12: 96px;
  --spacing-16: 128px;
  --spacing-20: 160px;
  --spacing-24: 192px;
}

/* Container padding */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--spacing-4);
  }
}

/* Section spacing */
section {
  padding: var(--spacing-16) 0;
  /* 128px top and bottom */
}

section.section-compact {
  padding: var(--spacing-8) 0;
  /* 64px top and bottom */
}

section.section-spacious {
  padding: var(--spacing-24) 0;
  /* 192px top and bottom */
}

/* Page margins */
.page-header {
  margin-bottom: var(--spacing-12);
}

.page-footer {
  margin-top: var(--spacing-16);
  padding-top: var(--spacing-8);
  border-top: 1px solid #e5e7eb;
}

/* Article spacing */
.article h1 {
  margin-bottom: var(--spacing-6);
}

.article h2 {
  margin-top: var(--spacing-12);
  margin-bottom: var(--spacing-4);
}

.article p {
  margin-bottom: var(--spacing-4);
}

/* Responsive layout spacing */
@media (max-width: 640px) {
  section {
    padding: var(--spacing-8) 0;
  }

  .page-header {
    margin-bottom: var(--spacing-6);
  }
}`
    },
    {
      title: "Typography Vertical Rhythm",
      description: "Align text spacing with spacing scale for consistent vertical rhythm. Line heights, paragraph margins, heading spacing all reference scale values.",
      example: `/* Typography spacing scale */
:root {
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
}

/* Body text rhythm */
body {
  font-size: 16px;
  line-height: var(--spacing-6);
  /* 24px line height = 1.5 ratio */
}

p {
  margin-bottom: var(--spacing-6);
  /* Paragraph spacing matches line height */
}

/* Heading spacing */
h1 {
  font-size: 3rem;
  line-height: var(--spacing-12);
  /* 48px */
  margin-bottom: var(--spacing-8);
  /* 32px */
}

h2 {
  font-size: 2.25rem;
  line-height: var(--spacing-10);
  /* 40px */
  margin-top: var(--spacing-12);
  margin-bottom: var(--spacing-6);
}

h3 {
  font-size: 1.875rem;
  line-height: var(--spacing-8);
  /* 32px */
  margin-top: var(--spacing-8);
  margin-bottom: var(--spacing-4);
}

/* List spacing */
ul,
ol {
  margin-bottom: var(--spacing-6);
  padding-left: var(--spacing-8);
}

li {
  margin-bottom: var(--spacing-2);
}

/* Blockquote spacing */
blockquote {
  margin: var(--spacing-8) 0;
  padding-left: var(--spacing-6);
  border-left: 4px solid #e5e7eb;
}

/* Code block spacing */
pre {
  margin: var(--spacing-6) 0;
  padding: var(--spacing-4);
  border-radius: 8px;
  background: #1f2937;
  line-height: var(--spacing-7);
}`
    },
    {
      title: "Responsive Spacing Adjustments",
      description: "Scale spacing proportionally across breakpoints. Smaller spacing on mobile conserves screen space, larger spacing on desktop creates breathing room.",
      example: `/* Responsive spacing scale */
:root {
  /* Mobile base spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
}

@media (min-width: 768px) {
  /* Tablet - 25% increase */
  :root {
    --spacing-1: 5px;
    --spacing-2: 10px;
    --spacing-3: 15px;
    --spacing-4: 20px;
    --spacing-6: 30px;
    --spacing-8: 40px;
    --spacing-12: 60px;
  }
}

@media (min-width: 1024px) {
  /* Desktop - 50% increase from mobile */
  :root {
    --spacing-1: 6px;
    --spacing-2: 12px;
    --spacing-3: 18px;
    --spacing-4: 24px;
    --spacing-6: 36px;
    --spacing-8: 48px;
    --spacing-12: 72px;
  }
}

/* Components using responsive spacing */
.hero {
  padding: var(--spacing-12) var(--spacing-4);
  /* Mobile: 48px vertical, 16px horizontal */
  /* Tablet: 60px vertical, 20px horizontal */
  /* Desktop: 72px vertical, 24px horizontal */
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
  /* Gap scales with viewport */
}

.section {
  padding: var(--spacing-8) 0;
  /* Automatically larger on bigger screens */
}

/* Alternative: clamp for fluid spacing */
:root {
  --spacing-fluid-4: clamp(16px, 4vw, 24px);
  /* 16px min, 24px max, 4% of viewport between */
}

.hero-fluid {
  padding: var(--spacing-fluid-4);
  /* Smoothly scales with viewport width */
}`
    }
  ],

  howToUse: {
    title: "How to Use This Spacing Scale Generator",
    content: `This spacing scale generator creates systematic spacing values for design systems. Select base unit, choose scale type, generate values, and export for immediate use.

### Selecting Base Unit

Choose foundation for entire scale:

**4px Base:** Compact spacing. Fine-grained control. Popular in modern design systems (Ant Design). Best for: dense UIs, data tables, dashboards.

**8px Base:** Industry standard. Used by Material Design, Apple HIG, most design systems. Balances granularity with simplicity. Best for: most applications, general purpose UIs.

**16px Base:** Generous spacing. Creates breathing room. Less common but works for content-focused sites. Best for: blogs, editorial sites, accessibility-focused designs.

Base unit determines all scale values. 8px base with 4x multiplier = 32px value.

### Choosing Scale Type

Select progression method:

**Linear:** Add constant increment each step (8, 16, 24, 32, 40). Simple, predictable, even distribution. Best for general-purpose spacing.

**Modular (Ratio-Based):** Multiply by ratio (1.25, 1.5, 1.618). Creates harmonious progression. Values: 8, 12, 18, 27, 41 (1.5 ratio). Best for organic, natural spacing.

**Fibonacci:** Each value is sum of previous two (0, 1, 1, 2, 3, 5, 8, 13, 21, 34). Natural progression. Best for mathematical elegance, organic feel.

**Custom:** Define exact values. Full control but requires more planning. Best for specific brand requirements.

### Generating Scale Values

Tool calculates complete scale based on settings:

**Step Count:** How many values in scale (typically 8-16). More steps = finer control, fewer = simpler system.

**Range:** Minimum (usually 0) to maximum spacing (typically 96-192px). Larger max for generous spacing, smaller for compact.

**Preview:** See actual spacing sizes with visual reference. Squares showing each spacing value help judge appropriateness.

**Adjustments:** Fine-tune individual values if needed. Override calculated value for specific requirements.

### Naming Spacing Values

Choose naming convention:

**Numeric (0-12):** Tailwind approach. --spacing-0 through --spacing-12. Clear progression, no semantic confusion.

**T-Shirt (xs-3xl):** Intuitive but limited. --spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl, --spacing-2xl.

**Semantic:** --spacing-tight, --spacing-normal, --spacing-relaxed. Descriptive but subjective interpretation.

**Hybrid:** Base numeric (--spacing-1 through --spacing-12) plus semantic aliases (--spacing-component-padding: var(--spacing-4)).

Most professional systems use numeric or hybrid approaches.

### Exporting Spacing System

Copy scale in production formats:

**CSS Variables:**
\`\`\`css
:root {
  --spacing-0: 0;
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-4: 32px;
}
\`\`\`

**SCSS:**
\`\`\`scss
$spacing-0: 0;
$spacing-1: 8px;
$spacing-2: 16px;
\`\`\`

**JavaScript:**
\`\`\`javascript
export const spacing = {
  0: '0',
  1: '8px',
  2: '16px'
};
\`\`\`

**JSON Design Tokens:**
\`\`\`json
{
  "spacing": {
    "0": { "value": "0" },
    "1": { "value": "8px" }
  }
}
\`\`\`

### Integrating with Design Systems

Import spacing scale into design tools:

**Figma:** Use tokens plugin to import spacing values as layout variables. Apply to auto-layout spacing.

**Tailwind:** Configure spacing scale in tailwind.config.js theme.extend.spacing. Generates utility classes automatically.

**CSS Frameworks:** Replace default spacing with custom scale. Override framework variables with generated values.

### Testing Spacing Scale

Apply scale to real components:

- Button padding: Does --spacing-2 x --spacing-4 feel right?
- Card spacing: Is --spacing-6 adequate internal padding?
- Section margins: Does --spacing-12 create sufficient breathing room?

Adjust scale if values feel off. Increase base unit if spacing too tight, decrease if too loose.

### Responsive Scaling

Decide spacing behavior at breakpoints:

**Static:** Same spacing all screen sizes. Simple, consistent.

**Proportional:** Increase spacing 25-50% on larger screens. More breathing room on desktop.

**Fluid:** Use clamp() for smooth scaling. Spacing grows continuously with viewport.

Choose based on design requirements and target devices.`,
    steps: [
      {
        name: "Select Base Unit",
        text: "Choose foundation: 4px (compact), 8px (standard), or 16px (generous). Base unit determines all scale values. 8px is industry standard used by Material Design and Apple."
      },
      {
        name: "Choose Scale Type",
        text: "Select progression: linear (even increments), modular (ratio-based), fibonacci (natural), or custom. Linear simplest, modular creates harmony, fibonacci feels organic."
      },
      {
        name: "Generate Values",
        text: "Tool calculates complete scale based on settings. Preview shows actual spacing sizes. Adjust step count (8-16 typical) and range (0-96px or 0-192px). Fine-tune individual values if needed."
      },
      {
        name: "Export System",
        text: "Copy as CSS variables, SCSS, JavaScript, or JSON. Choose naming: numeric (0-12), t-shirt (xs-xl), or semantic (tight/normal/relaxed). Import into design system."
      }
    ]
  },

  faqs: [
    {
      question: "Should I use 4px or 8px base for my spacing scale?",
      answer: "8px base is industry standard - used by Material Design, Apple HIG, most professional design systems. Balances granularity with simplicity. Use 4px for dense UIs (data tables, dashboards) needing fine control. Use 16px for content-focused sites (blogs, articles) prioritizing readability. When in doubt, choose 8px."
    },
    {
      question: "How many spacing values should my scale have?",
      answer: "8-12 values covers most needs. Fewer = simpler system, easier decisions. More = fine control, complex to manage. Tailwind uses 20+ values (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32...). Most custom systems use 8-10. Too few = not enough options. Too many = decision paralysis. Start with 8-10, add if needed."
    },
    {
      question: "What's the difference between linear and modular spacing scales?",
      answer: "Linear adds constant value each step (8, 16, 24, 32). Simple, predictable, even distribution. Modular multiplies by ratio (8, 12, 18, 27 with 1.5 ratio). Creates organic progression, larger jumps at bigger sizes. Linear easier to calculate mentally, modular more harmonious visually. Most systems use linear for simplicity."
    },
    {
      question: "Should spacing scale values be in pixels or rems?",
      answer: "Both work. Pixels = absolute, predictable across all contexts. Rems = scale with user font size preferences (accessibility benefit). Recommendation: use rems for accessibility. 0.5rem, 1rem, 1.5rem, 2rem (assuming 16px base = 8px, 16px, 24px, 32px). Honors user settings while maintaining system."
    },
    {
      question: "How do I name spacing variables: spacing-1, spacing-sm, or spacing-tight?",
      answer: "Numeric (spacing-1, spacing-2) clearest - no ambiguity, scales infinitely. T-shirt (spacing-sm, spacing-md) intuitive but limited (what's smaller than xs?). Semantic (spacing-tight, spacing-normal) descriptive but subjective. Professional systems use numeric. Tailwind: space-0 through space-96. Material: spacing-xs through spacing-xl. Choose numeric for clarity and scalability."
    },
    {
      question: "Should spacing increase proportionally on larger screens?",
      answer: "Depends on design goals. Static spacing (same all screens) = simple, consistent. Proportional (25-50% increase on desktop) = more breathing room on large screens. Fluid (clamp) = continuous scaling. Recommendation: start static. Add proportional if mobile feels cramped or desktop feels too tight. Test on actual devices before committing to responsive spacing."
    },
    {
      question: "Can I mix spacing scale values with hardcoded spacing?",
      answer: "Avoid mixing - defeats purpose of systematic spacing. If scale lacks needed value, add to scale rather than hardcode. Exception: one-off tweaks for specific edge cases acceptable. But 90%+ spacing should reference scale. Consistency more valuable than perfection in individual instances. If hardcoding frequently, scale may need refinement."
    },
    {
      question: "How do I convince team to adopt spacing scale?",
      answer: "Show consistency benefits: all components feel cohesive. Demonstrate speed: no deciding spacing values, grab from scale. Highlight maintainability: change scale, all components update. Prove with prototype: build page with scale vs without, compare professionalism. Start small: apply to new components, migrate existing gradually. Scales catch on once benefits are visible."
    },
    {
      question: "What spacing scale does Tailwind CSS use?",
      answer: "Tailwind uses modified base-4 scale: 0, 1px, 2px, 4px, 6px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px. Named space-0 through space-96. More granular at small sizes (1, 2, 4, 6, 8), jumps at large (48, 64, 80, 96). Well-tested scale covering vast majority of use cases."
    },
    {
      question: "Is my spacing scale private when using this tool?",
      answer: "Yes. All spacing calculation happens client-side in your browser. No scale values, base units, or exports are sent to servers. No tracking, no storage. Safe for proprietary design systems or client work. Tool works offline after initial load. Your spacing scales never leave your device."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your spacing scales never leave your browser. This generator operates entirely client-side using JavaScript. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All spacing calculation, scale generation, and value export happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your scales. The tool works completely offline after first load.
- **No Data Storage:** Your spacing values and scale configurations are not saved on our servers. Browser localStorage used only for local saves if you enable it.
- **No Analytics Tracking:** We don't track which scales you generate or base units you select.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your spacing data.

This makes the tool safe for proprietary design systems, client-specific scales, or confidential projects. Use with confidence for commercial work.`
  },

  stats: {
    "Base Units": "4px/8px/16px",
    "Scale Types": "Linear/Modular/Fibonacci",
    "Value Range": "0-192px",
    "Export Formats": "CSS/SCSS/JS/JSON",
    "Server Uploads": "0"
  }
};
