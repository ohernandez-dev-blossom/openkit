/**
 * Design Tokens Manager Tool Guide Content
 * Comprehensive developer guide for design token systems
 */

import type { ToolGuideContent } from "./types";

export const designTokensGuideContent: ToolGuideContent = {
  toolName: "Design Tokens Manager",
  toolPath: "/design-tokens",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Define Token Categories",
      description: "Organize design tokens by category: colors (brand, semantic, grays), typography (font families, sizes, weights), spacing (padding, margin scale), borders (radius, width), shadows, and breakpoints."
    },
    {
      title: "Set Token Values",
      description: "Enter values for each token: hex colors, pixel/rem sizes, font names, timing values. Use consistent naming conventions (primary-500, spacing-4, text-lg) for clarity across teams."
    },
    {
      title: "Generate Code for Platforms",
      description: "Export tokens as CSS variables, SCSS variables, JavaScript objects, JSON, or design tool formats (Figma tokens plugin). Multi-platform support enables design-to-code consistency."
    },
    {
      title: "Import and Sync Tokens",
      description: "Import existing token JSON to migrate systems. Sync with design tools or version control. Update tokens in one place, export everywhere for single source of truth."
    }
  ],

  introduction: {
    title: "What are Design Tokens?",
    content: `Design tokens are named entities that store visual design attributes - colors, typography, spacing, borders, shadows, timing. Tokens create a single source of truth for design decisions, ensuring consistency across products, platforms, and teams. Instead of hardcoding #667eea in multiple files, define --color-primary-500 once and reference everywhere.

Tokens bridge design and engineering. Designers define token values in tools like Figma; engineers consume tokens in code as CSS variables, JavaScript objects, or platform-specific formats. When brand colors change, update token values once - all products reflect the change automatically.

### Why Design Systems Need Tokens

Modern digital products span web, mobile apps (iOS, Android), desktop applications, and marketing sites. Each platform has different styling systems (CSS, React Native, SwiftUI). Tokens provide platform-agnostic value storage that exports to all formats.

Without tokens, design values scatter across codebases: button blue is #667eea in web CSS, UIColor(red: 0.4, green: 0.49, blue: 0.91) in iOS, Color(0xFF667EEA) in Android. When blue changes, hunt through all platforms. Tokens eliminate this duplication.

Consistency is automatic with tokens. All components reference the same color palette, spacing scale, typography system. Impossible for button padding to be 12px in one file, 10px in another. Tokens enforce consistency through centralized values.

Teams scale better with tokens. New engineers reference token documentation instead of guessing spacing values. Designers and engineers share vocabulary: "use spacing-4 and primary-600" has clear meaning. Reduces back-and-forth and decision fatigue.

### Design Token Categories

**Color Tokens:** Brand colors (primary, secondary, accent), semantic colors (success, warning, error, info), neutrals (grays, black, white), and functional colors (text, background, border). Often use numeric scales: primary-50 (lightest) to primary-900 (darkest).

**Typography Tokens:** Font families (sans, serif, mono), font sizes (text-xs to text-5xl), font weights (light, regular, medium, bold), line heights (tight, normal, relaxed), letter spacing.

**Spacing Tokens:** Standardized scale for padding, margin, gaps. Common scale: 0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px. Named as spacing-0 through spacing-12 or using T-shirt sizes (xs, sm, md, lg, xl).

**Border Tokens:** Border radius (rounded corners), border widths (thin, medium, thick), border colors, border styles (solid, dashed, dotted).

**Shadow Tokens:** Box shadows for elevation and depth. Layered shadows (sm, md, lg, xl, 2xl) create depth hierarchy. Values include offset, blur, spread, color.

**Motion Tokens:** Animation durations (fast: 150ms, base: 300ms, slow: 500ms), easing functions (ease-in, ease-out, ease-in-out), delays.

**Breakpoint Tokens:** Responsive design breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px).

**Z-Index Tokens:** Layering values (dropdown: 1000, modal: 2000, tooltip: 3000) to prevent z-index chaos.

### Token Naming Conventions

Good token names are semantic and scalable. Avoid naming tokens after specific use cases (button-blue) because uses change. Instead, use abstract scales or semantic purposes.

**Numeric Scales:** primary-100, primary-200, ..., primary-900. Numbers indicate lightness/darkness or size. Neutral naming allows flexible use.

**T-Shirt Sizes:** spacing-xs, spacing-sm, spacing-md, spacing-lg, spacing-xl. Intuitive but limited scalability (what's smaller than xs?).

**Semantic Naming:** color-background-primary, color-text-body, color-border-default. Explicit purpose but can become verbose.

**Hybrid Approach:** Combine methods. Base tokens (blue-500) and semantic aliases (color-primary = blue-500, color-link = blue-600). Base tokens store values, semantic tokens assign meaning.

### Token Hierarchy: Base and Semantic Tokens

**Base Tokens (Primitives):** Raw values without context. blue-100 through blue-900, spacing-1 through spacing-12, font-sans. Catalog of available values.

**Semantic Tokens (Aliases):** Reference base tokens with purpose. color-primary references blue-600, spacing-button-padding references spacing-3. Semantic tokens provide meaning and flexibility.

Hierarchy enables theming. Light theme: color-background = gray-50. Dark theme: color-background = gray-900. Components reference semantic tokens, themes swap base token references.

### Cross-Platform Token Export

Tokens export to platform-specific formats:

**CSS Custom Properties:**
\`\`\`css
:root {
  --color-primary: #667eea;
  --spacing-4: 1rem;
  --font-sans: 'Inter', sans-serif;
}
\`\`\`

**SCSS Variables:**
\`\`\`scss
$color-primary: #667eea;
$spacing-4: 1rem;
$font-sans: 'Inter', sans-serif;
\`\`\`

**JavaScript/TypeScript:**
\`\`\`typescript
export const tokens = {
  color: {
    primary: '#667eea'
  },
  spacing: {
    4: '1rem'
  }
};
\`\`\`

**JSON:**
\`\`\`json
{
  "color": {
    "primary": "#667eea"
  },
  "spacing": {
    "4": "1rem"
  }
}
\`\`\`

**iOS (Swift):**
\`\`\`swift
extension Color {
  static let primary = Color(hex: "#667eea")
}
\`\`\`

**Android (XML):**
\`\`\`xml
<color name="primary">#667eea</color>
\`\`\`

### Design Token Specifications

Industry standards exist for token structure. Style Dictionary (Amazon) and Design Tokens Community Group (W3C) define JSON schemas for token interchange.

Standard token format:
\`\`\`json
{
  "color": {
    "primary": {
      "value": "#667eea",
      "type": "color",
      "description": "Primary brand color"
    }
  }
}
\`\`\`

Following standards enables tool interoperability - import tokens from Figma, export to CSS, sync with documentation.

### Token Management Tools

**Style Dictionary (Amazon):** Open-source token transformer. Define tokens in JSON, export to any format. Highly customizable with build pipelines.

**Figma Tokens Plugin:** Extract tokens from Figma designs, sync bidirectionally. Designers update colors in Figma, engineers pull updated token JSON.

**Theo (Salesforce):** Token transformer with built-in themes. Define base tokens, create theme variations, export to platforms.

**Design Tokens Manager (this tool):** Visual editor and exporter for design tokens. Create, organize, and export tokens without build configuration.

### Version Control and Collaboration

Store tokens in version control (Git) for change tracking and team collaboration. Token changes go through pull requests with review. Clear audit trail of design system evolution.

Token JSON files are merge-friendly. Adding new tokens rarely conflicts. CI/CD pipelines can validate token syntax and generate platform files automatically on merge.

Documentation generation from tokens: automated docs show all available colors, spacing values, typography styles with live examples. Single source of truth stays synchronized with code.`,
  },

  useCases: [
    {
      title: "Color System with Semantic Tokens",
      description: "Define comprehensive color palette with base colors and semantic aliases for theming. Numeric scales provide flexibility while semantic tokens give context. Enables light/dark mode switching by updating semantic token references.",
      example: `/* Base color tokens (primitives) */
:root {
  /* Blue scale */
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

  /* Gray scale */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  /* Green scale (success) */
  --green-50: #f0fdf4;
  --green-500: #22c55e;
  --green-900: #14532d;

  /* Red scale (error) */
  --red-50: #fef2f2;
  --red-500: #ef4444;
  --red-900: #7f1d1d;
}

/* Semantic color tokens (light theme) */
:root {
  /* Brand colors */
  --color-primary: var(--blue-600);
  --color-primary-hover: var(--blue-700);
  --color-primary-active: var(--blue-800);

  /* Background colors */
  --color-background: white;
  --color-background-secondary: var(--gray-50);
  --color-background-tertiary: var(--gray-100);

  /* Text colors */
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-tertiary: var(--gray-500);
  --color-text-inverse: white;

  /* Border colors */
  --color-border-default: var(--gray-200);
  --color-border-strong: var(--gray-300);
  --color-border-focus: var(--blue-500);

  /* Status colors */
  --color-success: var(--green-500);
  --color-error: var(--red-500);
  --color-warning: #f59e0b;
  --color-info: var(--blue-500);
}

/* Dark theme (override semantic tokens) */
[data-theme="dark"] {
  --color-background: var(--gray-900);
  --color-background-secondary: var(--gray-800);
  --color-background-tertiary: var(--gray-700);

  --color-text-primary: var(--gray-50);
  --color-text-secondary: var(--gray-300);
  --color-text-tertiary: var(--gray-400);

  --color-border-default: var(--gray-700);
  --color-border-strong: var(--gray-600);
}

/* Usage in components */
.button {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: 2px solid transparent;
}

.button:hover {
  background: var(--color-primary-hover);
}

.button:focus {
  border-color: var(--color-border-focus);
}

.card {
  background: var(--color-background);
  border: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
}

/* TypeScript/JavaScript tokens */
export const colorTokens = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a'
  },
  semantic: {
    primary: 'blue.600',
    background: 'white',
    textPrimary: 'gray.900'
  }
};

/* React usage */
const Button = () => (
  <button style={{
    background: 'var(--color-primary)',
    color: 'var(--color-text-inverse)'
  }}>
    Click me
  </button>
);

/* JSON token definition */
{
  "color": {
    "blue": {
      "600": {
        "value": "#2563eb",
        "type": "color"
      }
    },
    "primary": {
      "value": "{color.blue.600}",
      "type": "color",
      "description": "Primary brand color"
    }
  }
}`
    },
    {
      title: "Typography System with Scale",
      description: "Define complete typography system with font families, size scales, weights, and line heights. Type scale creates visual hierarchy while maintaining consistency. Responsive typography tokens enable scaling across breakpoints.",
      example: `/* Font family tokens */
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Merriweather', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

/* Font size scale (modular scale: 1.25 ratio) */
:root {
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
}

/* Font weight tokens */
:root {
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}

/* Line height tokens */
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}

/* Letter spacing tokens */
:root {
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}

/* Semantic typography tokens (composite) */
:root {
  /* Headings */
  --typography-h1-font: var(--font-sans);
  --typography-h1-size: var(--text-5xl);
  --typography-h1-weight: var(--font-bold);
  --typography-h1-leading: var(--leading-tight);

  --typography-h2-font: var(--font-sans);
  --typography-h2-size: var(--text-4xl);
  --typography-h2-weight: var(--font-bold);
  --typography-h2-leading: var(--leading-tight);

  --typography-h3-font: var(--font-sans);
  --typography-h3-size: var(--text-3xl);
  --typography-h3-weight: var(--font-semibold);
  --typography-h3-leading: var(--leading-snug);

  /* Body text */
  --typography-body-font: var(--font-sans);
  --typography-body-size: var(--text-base);
  --typography-body-weight: var(--font-regular);
  --typography-body-leading: var(--leading-relaxed);

  /* Caption */
  --typography-caption-font: var(--font-sans);
  --typography-caption-size: var(--text-sm);
  --typography-caption-weight: var(--font-regular);
  --typography-caption-leading: var(--leading-normal);

  /* Code */
  --typography-code-font: var(--font-mono);
  --typography-code-size: var(--text-sm);
  --typography-code-weight: var(--font-regular);
}

/* Usage in CSS */
h1 {
  font-family: var(--typography-h1-font);
  font-size: var(--typography-h1-size);
  font-weight: var(--typography-h1-weight);
  line-height: var(--typography-h1-leading);
}

.body-text {
  font-family: var(--typography-body-font);
  font-size: var(--typography-body-size);
  font-weight: var(--typography-body-weight);
  line-height: var(--typography-body-leading);
}

code {
  font-family: var(--typography-code-font);
  font-size: var(--typography-code-size);
}

/* Responsive typography */
@media (max-width: 768px) {
  :root {
    --text-5xl: 2.5rem;  /* Smaller on mobile */
    --text-4xl: 2rem;
    --text-3xl: 1.5rem;
  }
}

/* TypeScript tokens */
export const typographyTokens = {
  fontFamily: {
    sans: "'Inter', sans-serif",
    serif: "'Merriweather', serif",
    mono: "'JetBrains Mono', monospace"
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625
  }
};

/* React usage */
const Heading = ({ level = 1, children }) => {
  const Tag = \`h\${level}\`;
  return (
    <Tag style={{
      fontFamily: \`var(--typography-h\${level}-font)\`,
      fontSize: \`var(--typography-h\${level}-size)\`,
      fontWeight: \`var(--typography-h\${level}-weight)\`,
      lineHeight: \`var(--typography-h\${level}-leading)\`
    }}>
      {children}
    </Tag>
  );
};`
    },
    {
      title: "Spacing Scale for Layout Consistency",
      description: "Standardized spacing scale ensures consistent padding, margins, and gaps across components. Base-8 or base-4 scales provide mathematical harmony and easier mental models. Spacing tokens eliminate magic numbers in layouts.",
      example: `/* Base-4 spacing scale (4px increments) */
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
  --spacing-20: 5rem;    /* 80px */
  --spacing-24: 6rem;    /* 96px */
  --spacing-32: 8rem;    /* 128px */
}

/* Semantic spacing tokens */
:root {
  /* Component padding */
  --spacing-button-padding-x: var(--spacing-4);
  --spacing-button-padding-y: var(--spacing-2);
  --spacing-input-padding: var(--spacing-3);
  --spacing-card-padding: var(--spacing-6);

  /* Layout spacing */
  --spacing-section-gap: var(--spacing-16);
  --spacing-component-gap: var(--spacing-8);
  --spacing-element-gap: var(--spacing-4);

  /* Container spacing */
  --spacing-container-padding: var(--spacing-6);
  --spacing-page-margin: var(--spacing-8);
}

/* Usage in layouts */
.button {
  padding: var(--spacing-button-padding-y) var(--spacing-button-padding-x);
}

.card {
  padding: var(--spacing-card-padding);
  margin-bottom: var(--spacing-6);
}

.section {
  margin-bottom: var(--spacing-section-gap);
}

.grid {
  display: grid;
  gap: var(--spacing-4);
}

.container {
  padding: 0 var(--spacing-container-padding);
  max-width: 1200px;
  margin: 0 auto;
}

/* Stack component with consistent spacing */
.stack {
  display: flex;
  flex-direction: column;
}

.stack-tight {
  gap: var(--spacing-2);
}

.stack-normal {
  gap: var(--spacing-4);
}

.stack-relaxed {
  gap: var(--spacing-8);
}

/* Responsive spacing */
@media (max-width: 768px) {
  :root {
    --spacing-section-gap: var(--spacing-12);
    --spacing-card-padding: var(--spacing-4);
    --spacing-container-padding: var(--spacing-4);
  }
}

/* TypeScript spacing tokens */
export const spacingTokens = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
  24: '6rem'
};

/* React spacing utilities */
const Box = ({ p, m, children }) => (
  <div style={{
    padding: p ? \`var(--spacing-\${p})\` : undefined,
    margin: m ? \`var(--spacing-\${m})\` : undefined
  }}>
    {children}
  </div>
);

/* Usage */
<Box p={6} m={4}>Content with padding-6 and margin-4</Box>

/* Tailwind-style spacing utilities */
.p-0 { padding: var(--spacing-0); }
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }

.m-0 { margin: var(--spacing-0); }
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.m-4 { margin: var(--spacing-4); }

.gap-2 { gap: var(--spacing-2); }
.gap-4 { gap: var(--spacing-4); }
.gap-8 { gap: var(--spacing-8); }

/* JSON spacing definition */
{
  "spacing": {
    "0": { "value": "0", "type": "dimension" },
    "1": { "value": "0.25rem", "type": "dimension" },
    "2": { "value": "0.5rem", "type": "dimension" },
    "4": { "value": "1rem", "type": "dimension" },
    "6": { "value": "1.5rem", "type": "dimension" },
    "8": { "value": "2rem", "type": "dimension" }
  },
  "semantic": {
    "buttonPadding": {
      "value": "{spacing.4}",
      "type": "dimension"
    }
  }
}`
    },
    {
      title: "Shadow and Border Token System",
      description: "Define elevation system with shadow tokens for depth hierarchy. Border radius and width tokens ensure consistent corner rounding and outlines. Combined tokens create cohesive component styling across design system.",
      example: `/* Shadow tokens for elevation */
:root {
  /* Box shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-none: 0 0 0 0 transparent;

  /* Focus shadows */
  --shadow-focus: 0 0 0 3px rgba(102, 126, 234, 0.3);
  --shadow-focus-error: 0 0 0 3px rgba(239, 68, 68, 0.3);
}

/* Border radius tokens */
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;   /* pill shape */
  --radius-circle: 50%;    /* perfect circle */
}

/* Border width tokens */
:root {
  --border-0: 0;
  --border-1: 1px;
  --border-2: 2px;
  --border-4: 4px;
  --border-8: 8px;
}

/* Semantic elevation tokens */
:root {
  --elevation-card: var(--shadow-sm);
  --elevation-dropdown: var(--shadow-lg);
  --elevation-modal: var(--shadow-2xl);
  --elevation-tooltip: var(--shadow-md);
}

/* Component usage */
.card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-card);
  border: var(--border-1) solid var(--color-border-default);
  padding: var(--spacing-6);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.button {
  border-radius: var(--radius-lg);
  border: var(--border-0);
  box-shadow: var(--shadow-sm);
}

.button:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.modal {
  border-radius: var(--radius-2xl);
  box-shadow: var(--elevation-modal);
}

.input {
  border: var(--border-2) solid var(--color-border-default);
  border-radius: var(--radius-md);
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.avatar {
  border-radius: var(--radius-circle);
  border: var(--border-2) solid white;
  box-shadow: var(--shadow-sm);
}

/* TypeScript shadow and border tokens */
export const shadowTokens = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
};

export const radiusTokens = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
  circle: '50%'
};

export const borderTokens = {
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px'
  }
};

/* React component with token props */
const Card = ({ elevation = "card", rounded = "lg", children }) => {
  return (
    <div style={{
      borderRadius: \`var(--radius-\${rounded})\`,
      boxShadow: \`var(--elevation-\${elevation})\`,
      padding: 'var(--spacing-6)'
    }}>
      {children}
    </div>
  );
};

/* JSON definition */
{
  "shadow": {
    "sm": {
      "value": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      "type": "shadow"
    }
  },
  "radius": {
    "lg": {
      "value": "0.5rem",
      "type": "dimension"
    }
  },
  "border": {
    "width": {
      "1": {
        "value": "1px",
        "type": "dimension"
      }
    }
  }
}`
    }
  ],

  howToUse: {
    title: "How to Use This Design Tokens Manager",
    content: `This design tokens manager provides a visual interface for creating, organizing, and exporting design tokens across platforms. Define token values once, export to CSS, SCSS, JavaScript, JSON, or design tool formats.

### Creating Token Categories

Organize tokens by category for clarity:
- **Colors:** Brand, semantic, grays, status colors
- **Typography:** Font families, sizes, weights, line heights
- **Spacing:** Padding, margin, gap scales
- **Borders:** Radius, widths, styles
- **Shadows:** Elevation levels
- **Motion:** Animation durations, easing
- **Breakpoints:** Responsive design points

Click "Add Category" to create new groupings. Categories help teams navigate large token sets and align with design system structure.

### Defining Token Values

Enter values for each token:
- **Color tokens:** Hex (#667eea), RGB, HSL
- **Size tokens:** Pixels (16px), rems (1rem), percentages
- **Font tokens:** Font family names with fallbacks
- **Shadow tokens:** Complete box-shadow syntax
- **Duration tokens:** Milliseconds or seconds

Use consistent naming: primary-500, spacing-4, text-lg. Avoid vague names like "big" or "nice-blue". Descriptive names scale better as systems grow.

### Base vs Semantic Tokens

**Base tokens** store raw values: blue-600: #2563eb, spacing-4: 1rem. Catalog of available options.

**Semantic tokens** reference base tokens with purpose: color-primary: blue-600, button-padding: spacing-4. Provides flexibility and theming capability.

Toggle between base and semantic views. Define base tokens first, then create semantic aliases. This hierarchy enables theme switching.

### Exporting to Platforms

Click export and select format:

**CSS Variables (.css):** Custom properties for web. Paste into global stylesheet. Works with vanilla CSS, any framework.

**SCSS Variables (.scss):** Sass variables. Import into SCSS files. Provides backwards compatibility with Sass-based projects.

**JavaScript/TypeScript (.js/.ts):** Object exports. Import into JS/TS projects. Type-safe with TypeScript.

**JSON (.json):** Platform-agnostic token storage. Import into Style Dictionary or other tools for multi-platform builds.

**Figma Tokens:** JSON format compatible with Figma Tokens plugin. Sync tokens bidirectionally with design files.

### Importing Existing Tokens

Click "Import JSON" to load existing token files. Supports standard token formats from Style Dictionary, Figma Tokens, or custom JSON.

Import merges with existing tokens or replaces entirely (choose in import dialog). Useful for migrating from other tools or syncing with team repositories.

### Version Control Integration

Export tokens as JSON to version control (Git). Commit token files to repository for change tracking and team collaboration.

Token updates go through pull request workflow. Review color changes, spacing updates, or new tokens before merging. Clear audit trail of design system evolution.

### Multi-Theme Management

Create theme variations by duplicating token set and changing values:
- **Light theme:** color-background: white, color-text: gray-900
- **Dark theme:** color-background: gray-900, color-text: gray-50

Keep semantic token names identical across themes. Swap only base token references. Components reference semantic tokens - themes swap automatically.

### Generating Documentation

Export tokens with documentation comments. Generated docs show all available tokens with live color swatches, size examples, and usage guidelines.

Documentation stays synchronized with code as single source of truth. Designers and engineers reference same token values.

### Style Dictionary Integration

Export JSON in Style Dictionary format for advanced build pipelines. Style Dictionary transforms tokens to any platform:

\`\`\`json
{
  "color": {
    "primary": {
      "value": "#667eea",
      "type": "color"
    }
  }
}
\`\`\`

Configure Style Dictionary to output CSS, SCSS, iOS, Android, React Native, or custom formats from single token source.

### Validation and Linting

Validator checks token syntax:
- Valid color formats (hex, rgb, hsl)
- Correct size units (px, rem, em, %)
- Proper shadow syntax
- No circular references in semantic tokens

Fix errors before export to prevent runtime issues. Green checkmark indicates valid token set.

### Team Collaboration Workflow

1. Designer defines tokens in Figma
2. Export Figma tokens JSON
3. Import JSON into this tool
4. Export to CSS, JS for engineering
5. Commit to version control
6. Sync across products and platforms

Single source of truth flows from design to all code platforms automatically.`,
    steps: [
      {
        name: "Define Token Categories",
        text: "Organize tokens by type: colors (brand, semantic), typography (fonts, sizes), spacing (padding, margins), borders, shadows. Categories structure large token sets logically."
      },
      {
        name: "Set Token Values",
        text: "Enter values for each token using consistent naming (primary-500, spacing-4). Define base tokens (raw values) and semantic tokens (aliases with purpose). Use proper units."
      },
      {
        name: "Generate Platform Code",
        text: "Export tokens to CSS variables, SCSS, JavaScript objects, or JSON. Select format matching your project needs. Multi-platform export enables design-code consistency."
      },
      {
        name: "Import and Sync",
        text: "Import existing token JSON to migrate systems or sync with design tools. Export to version control for team collaboration. Update tokens in one place, export everywhere."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between base and semantic tokens?",
      answer: "Base tokens store raw values without context: blue-600: #2563eb, spacing-4: 1rem. Semantic tokens reference base tokens with purpose: color-primary: blue-600, button-padding: spacing-4. Semantic tokens enable theming - light theme: background=white, dark theme: background=gray-900. Same semantic name, different base reference. Components use semantic tokens for flexibility."
    },
    {
      question: "How do design tokens enable theming?",
      answer: "Semantic tokens provide abstraction layer. Components reference semantic names (color-background, color-text) instead of direct values. Themes swap base token references: light theme sets color-background=white, dark theme sets color-background=gray-900. No component code changes needed. Toggle theme by updating semantic token mappings."
    },
    {
      question: "Should I use pixels or rems for spacing tokens?",
      answer: "Rems for accessibility and scalability. Rems scale with user's browser font size preference - critical for accessibility. Pixels ignore user preferences. 1rem = 16px default, but respects user settings. Use rems for spacing, font sizes, most dimensions. Pixels acceptable for tiny values (1px borders) or pixel-perfect designs."
    },
    {
      question: "How do I name tokens consistently?",
      answer: "Use systematic naming: category-variant-scale. Examples: color-primary-500, spacing-lg, text-2xl. Avoid vague names (nice-blue, big-space). Use numeric scales (100-900) or T-shirt sizes (xs-xl) consistently. Include category prefix to prevent conflicts. Document naming conventions for team alignment."
    },
    {
      question: "What token format should I export for my project?",
      answer: "CSS variables for web projects - works everywhere, no build step. SCSS if using Sass build pipeline. JavaScript/TypeScript for React, Vue, or component libraries - enables type safety. JSON for multi-platform (Style Dictionary transforms to iOS, Android, React Native). Choose format matching your toolchain."
    },
    {
      question: "How many spacing values should my scale have?",
      answer: "8-12 spacing values covers most needs. Too few = not enough options. Too many = decision fatigue. Common scale: 0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px (base-4 or base-8 increments). Provides flexibility while constraining choices to harmonious values."
    },
    {
      question: "Should I version control my design tokens?",
      answer: "Yes, absolutely. Store token JSON in Git repository. Commit token changes with descriptive messages. Use pull requests for token updates - enables review and discussion. Tag releases (v1.0.0) when shipping token updates. Version control provides audit trail of design system evolution and enables rollback if needed."
    },
    {
      question: "How do I sync tokens between Figma and code?",
      answer: "Use Figma Tokens plugin. Define tokens in Figma, export JSON, import into this tool, export to CSS/JS. Or define tokens here, export Figma-compatible JSON, import to Figma. Bidirectional sync possible with careful workflow. Store JSON in Git as single source of truth, sync both Figma and code from repository."
    },
    {
      question: "What's Style Dictionary and do I need it?",
      answer: "Style Dictionary (Amazon open-source) transforms token JSON to any platform format. Overkill for simple projects (single web app). Essential for multi-platform products (web + iOS + Android). Provides advanced features: token math, custom formatters, conditional builds. Use this tool for simple export, Style Dictionary for enterprise multi-platform token distribution."
    },
    {
      question: "Are my design tokens private when using this tool?",
      answer: "Yes. All token management happens client-side in your browser. No token values, names, or exports are sent to servers. No tracking, no storage. Safe for proprietary design systems or client work. Tool works offline after initial load. Your tokens never leave your device."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your design tokens never leave your browser. This manager operates entirely client-side using JavaScript. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All token creation, organization, and export happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your tokens. The tool works completely offline after first load.
- **No Data Storage:** Your token values and names are not saved on our servers. Browser localStorage used only for local autosave if you enable it.
- **No Analytics Tracking:** We don't track which tokens you create, export formats used, or frequency of use.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your token data.

This makes the tool safe for proprietary design systems, client-specific tokens, or confidential projects. Use with confidence for commercial work.`
  },

  stats: {
    "Token Categories": "10+",
    "Export Formats": "5+",
    "Browser Support": "99%+",
    "Platform Support": "All",
    "Server Uploads": "0"
  }
};
