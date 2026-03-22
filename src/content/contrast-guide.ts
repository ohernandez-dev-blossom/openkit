/**
 * Color Contrast Checker Tool Guide Content
 * Comprehensive developer guide for WCAG contrast ratio testing
 */

import type { ToolGuideContent } from "./types";

export const contrastGuideContent: ToolGuideContent = {
  toolName: "Color Contrast Checker",
  toolPath: "/contrast",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Foreground and Background Colors",
      description: "Input text color and background color as hex codes, RGB values, or HSL. Use color pickers for visual selection or paste existing brand colors."
    },
    {
      title: "View Contrast Ratio Calculation",
      description: "See calculated contrast ratio (1:1 to 21:1 scale) instantly. Higher ratios mean better readability and accessibility for users with visual impairments."
    },
    {
      title: "Check WCAG Compliance Levels",
      description: "Verify if your color combination passes WCAG AA (4.5:1 for normal text) or AAA (7:1 for normal text) standards. See pass/fail indicators for each level."
    },
    {
      title: "Adjust Colors for Compliance",
      description: "If colors fail, adjust lightness or darkness using sliders until contrast ratio meets requirements. Real-time feedback shows when compliance is achieved."
    }
  ],

  introduction: {
    title: "What is a Color Contrast Checker?",
    content: `A color contrast checker calculates the contrast ratio between text color and background color according to WCAG (Web Content Accessibility Guidelines) standards. Contrast ratio determines readability for users with visual impairments including low vision, color blindness, or age-related vision decline. Ratios range from 1:1 (no contrast) to 21:1 (black on white maximum contrast).

WCAG defines minimum contrast ratios for accessibility compliance. Level AA requires 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold). Level AAA requires 7:1 for normal text and 4.5:1 for large text. Meeting these standards ensures content is readable by the widest possible audience including users with disabilities.

### Why Developers Need Contrast Checkers

Legal compliance requirements mandate accessible interfaces. ADA (Americans with Disabilities Act), Section 508, and EU accessibility directives require WCAG compliance. Lawsuits target companies with inaccessible websites. Contrast checking prevents legal liability.

User experience suffers with poor contrast. Light gray text on white backgrounds is unreadable in bright sunlight. Low contrast causes eye strain, reduces comprehension, and drives users away. Adequate contrast benefits all users, not just those with disabilities.

Brand colors may fail accessibility standards. Marketing selects colors for aesthetics, not accessibility. Designers must validate brand palette combinations meet contrast requirements or find alternative shades.

Automated accessibility audits (Lighthouse, axe) flag contrast violations. Manual testing during design prevents failed audits in production. Proactive contrast checking saves remediation time and cost.

Dark mode implementations require separate contrast validation. Colors passing in light mode may fail in dark mode. Both themes need contrast verification for complete accessibility coverage.

### WCAG Contrast Requirements

**WCAG Level AA (Minimum):** 4.5:1 for normal text (under 18pt regular or 14pt bold). 3:1 for large text (18pt+ regular or 14pt+ bold). 3:1 for UI components and graphical objects. Widely adopted as baseline standard.

**WCAG Level AAA (Enhanced):** 7:1 for normal text. 4.5:1 for large text. More stringent, recommended for maximum accessibility. Harder to achieve with brand colors but provides best readability.

**Non-Text Contrast:** UI components (buttons, form controls, icons) require 3:1 contrast against adjacent colors. Ensures interactive elements are perceivable.

**Large Text Definition:** 18pt (24px) or larger regular weight, OR 14pt (18.66px) or larger bold weight. Larger text is more readable at lower contrast ratios.

**Exceptions:** Logos, incidental text (decorative), inactive UI components, and text within images are exempt. Active content must meet standards.

### Contrast Ratio Calculation

Contrast ratio formula compares relative luminance of foreground and background colors. Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is lighter color luminance, L2 is darker.

Luminance calculation converts RGB to relative brightness. Accounts for human perception sensitivity to different wavelengths. Green appears brighter than red or blue at equal intensity.

Example calculations:
- Black (#000000) on white (#FFFFFF): 21:1 (maximum)
- Dark gray (#595959) on white: 7:1 (AAA pass)
- Medium gray (#767676) on white: 4.5:1 (AA pass)
- Light gray (#949494) on white: 3:1 (large text AA)
- Very light gray (#BFBFBF) on white: 1.9:1 (FAIL)

### Common Contrast Problems

**Light gray text on white backgrounds:** Trendy minimalist designs use #999, #AAA, or lighter gray. These typically achieve only 2.5:1 to 3.5:1 contrast - below AA standards for normal text.

**White text on light brand colors:** Pastel backgrounds (#FFD700, #87CEEB, #FFB6C1) rarely provide sufficient contrast with white text. Darkening brand colors or using dark text necessary.

**Low contrast buttons:** Secondary buttons with subtle gray backgrounds (#F5F5F5) and gray text (#666) often fail contrast requirements. Disabled state styling should still meet 3:1 for perceivability.

**Placeholder text:** Light gray placeholders in form inputs often have 2:1 or worse contrast. WCAG requires 4.5:1 for placeholder text since it conveys information.

**Link colors:** Blue links (#007BFF) on black backgrounds may fail contrast. Red links (#DC3545) often fail. Ensure link colors have sufficient contrast against their background.

**Dark mode issues:** Colors passing in light mode may fail in dark mode. Blue (#0066CC) works on white but fails on dark backgrounds. Validate both themes.

### Fixing Contrast Issues

**Darken or lighten colors:** Adjust color luminance while preserving hue and saturation. HSL color model makes this easier - adjust L value.

**Use contrast-safe color palettes:** Tools like Coolors, Adobe Color provide accessible color schemes. Material Design and Tailwind CSS palettes indicate WCAG compliance.

**Add text outlines or shadows:** For text over images or complex backgrounds, add dark outline or shadow to ensure readability. Not ideal but functional fallback.

**Increase text weight:** Bolder text is more readable at lower contrast. Convert 400 weight to 600/700 if color adjustment isn't possible.

**Alternative color schemes:** If brand colors can't meet contrast requirements, create alternate accessible theme. Provide color scheme toggle in settings.

**Use overlays on images:** For text over background images, add semi-transparent dark overlay to ensure consistent contrast.

### Testing Tools and Workflow

**Browser DevTools:** Chrome, Firefox DevTools include contrast checkers. Inspect element, view contrast ratio in color picker.

**Automated Testing:** Lighthouse, axe DevTools, WAVE scan pages for contrast violations. Integrate in CI/CD for continuous compliance.

**Manual Testing:** Use standalone contrast checkers during design phase. Validate all text/background combinations before implementation.

**Real Device Testing:** Test on actual devices in different lighting conditions. Sunlight readability test ensures outdoor usability.

### Contrast in Design Systems

Document accessible color pairings in design system. Create color matrix showing which foreground/background combinations pass WCAG.

Define semantic color tokens with built-in contrast compliance. Example: text-primary always has 7:1 contrast on surface-primary.

Provide accessible color utilities in component libraries. Ensure default component styles meet contrast requirements out-of-box.

Test color palette against all backgrounds. A color safe on white may fail on light gray. Validate comprehensive combinations.`,
  },

  useCases: [
    {
      title: "WCAG Compliance Validation for Text",
      description: "Verify text/background color combinations meet WCAG AA or AAA standards. Essential for accessible web applications, ensuring readability for users with low vision or color blindness.",
      example: `/* WCAG AA Compliance - Normal Text (4.5:1 minimum) */

/* PASS: Dark gray on white (7:1 ratio) */
.text-dark-gray {
  color: #595959;
  background: #FFFFFF;
  /* Ratio: 7:1 - WCAG AAA ✓ */
}

/* PASS: Medium gray on white (4.51:1 ratio) */
.text-medium-gray {
  color: #757575;
  background: #FFFFFF;
  /* Ratio: 4.51:1 - WCAG AA ✓ */
}

/* FAIL: Light gray on white (2.85:1 ratio) */
.text-light-gray-fail {
  color: #999999;
  background: #FFFFFF;
  /* Ratio: 2.85:1 - WCAG FAIL ✗ */
}

/* Fixed: Darker gray for AA compliance */
.text-light-gray-fixed {
  color: #6C6C6C;
  background: #FFFFFF;
  /* Ratio: 5:1 - WCAG AA ✓ */
}

/* Large Text (18pt+ regular or 14pt+ bold) - 3:1 minimum */
.large-text-aa {
  color: #949494;
  background: #FFFFFF;
  font-size: 18pt;
  /* Ratio: 3:1 - WCAG AA Large Text ✓ */
}

/* React component with WCAG validation */
const AccessibleText = ({ text, backgroundColor = "#FFFFFF" }) => {
  const textColor = "#595959"; // 7:1 contrast on white
  const contrastRatio = calculateContrastRatio(textColor, backgroundColor);

  if (contrastRatio < 4.5) {
    console.warn(\`Low contrast: \${contrastRatio.toFixed(2)}:1\`);
  }

  return (
    <p style={{ color: textColor, backgroundColor }}>
      {text}
    </p>
  );
};

/* CSS custom properties with WCAG-safe colors */
:root {
  /* Light theme - all pass WCAG AA */
  --text-primary: #1a1a1a;      /* 16:1 on white */
  --text-secondary: #4a4a4a;    /* 9:1 on white */
  --text-tertiary: #6c6c6c;     /* 5:1 on white */
  --text-disabled: #949494;     /* 3:1 on white - large text only */

  --surface-primary: #ffffff;
  --surface-secondary: #f5f5f5;
}

/* Dark theme - validated for WCAG AA */
[data-theme="dark"] {
  --text-primary: #ffffff;      /* 21:1 on black */
  --text-secondary: #b8b8b8;    /* 9:1 on black */
  --text-tertiary: #8c8c8c;     /* 5:1 on black */

  --surface-primary: #1a1a1a;
  --surface-secondary: #2d2d2d;
}

/* Tailwind CSS with WCAG-compliant colors */
<p class="text-gray-800 bg-white">
  {/* gray-800 (#1f2937): 12:1 ratio - WCAG AAA ✓ */}
  High contrast text
</p>

<p class="text-gray-600 bg-white">
  {/* gray-600 (#4b5563): 7:1 ratio - WCAG AAA ✓ */}
  Good contrast text
</p>

/* Form input with WCAG-compliant placeholder */
.input-field {
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #767676; /* 4.5:1 contrast */
}

.input-field::placeholder {
  color: #6c6c6c; /* 5:1 contrast - WCAG AA ✓ */
  /* NOT #999999 which is only 2.85:1 */
}

/* Button states with sufficient contrast */
.button-primary {
  background: #0066cc;
  color: #ffffff;
  /* Ratio: 8.6:1 - WCAG AAA ✓ */
}

.button-primary:disabled {
  background: #cccccc;
  color: #666666;
  /* Ratio: 3.4:1 - WCAG AA Large Text ✓ */
  /* Still perceivable, indicates disabled state */
}`
    },
    {
      title: "Brand Color Accessibility Testing",
      description: "Validate brand colors meet WCAG standards. Test primary, secondary, and accent colors against light and dark backgrounds. Identify compliant combinations for marketing and product use.",
      example: `/* Brand color palette validation */

/* Primary brand color: Blue */
const brandPrimary = "#0073E6";

/* Test on white background */
.brand-on-white {
  color: #0073E6;
  background: #FFFFFF;
  /* Ratio: 5.14:1 - WCAG AA ✓, AAA ✗ */
  /* Use for large text or darken for AAA */
}

/* Darkened for AAA compliance */
.brand-on-white-aaa {
  color: #005AB3; /* Darkened blue */
  background: #FFFFFF;
  /* Ratio: 7.2:1 - WCAG AAA ✓ */
}

/* Test on dark background */
.brand-on-dark {
  color: #0073E6;
  background: #1A1A1A;
  /* Ratio: 3.6:1 - WCAG FAIL for normal text ✗ */
}

/* Lightened for dark mode compliance */
.brand-on-dark-fixed {
  color: #4DA6FF; /* Lightened blue */
  background: #1A1A1A;
  /* Ratio: 7.8:1 - WCAG AAA ✓ */
}

/* Secondary brand color: Orange */
const brandSecondary = "#FF6B35";

/* Test combinations */
.secondary-on-white {
  color: #FF6B35;
  background: #FFFFFF;
  /* Ratio: 3.36:1 - WCAG FAIL ✗ */
}

/* Darkened orange for accessibility */
.secondary-on-white-fixed {
  color: #C44F25;
  background: #FFFFFF;
  /* Ratio: 5.5:1 - WCAG AA ✓ */
}

/* Accent color: Green */
.accent-success {
  color: #28A745; /* Bootstrap success green */
  background: #FFFFFF;
  /* Ratio: 3.3:1 - WCAG FAIL for normal text ✗ */
  /* Acceptable for large text (18pt+) or icons */
}

/* Darker green for AA compliance */
.accent-success-aa {
  color: #1E7A34;
  background: #FFFFFF;
  /* Ratio: 5:1 - WCAG AA ✓ */
}

/* Brand color matrix for design system */
const brandColorMatrix = {
  primary: {
    light: "#E6F2FF",    // Background
    main: "#005AB3",     // 7:1 on white (AAA)
    dark: "#003D7A",     // 12:1 on white (AAA)
  },
  secondary: {
    light: "#FFF4F0",
    main: "#C44F25",     // 5.5:1 on white (AA)
    dark: "#8A3719",     // 9:1 on white (AAA)
  },
  text: {
    primary: "#1A1A1A",  // 16:1 on white (AAA)
    secondary: "#4A4A4A", // 9:1 on white (AAA)
    disabled: "#767676",  // 4.5:1 on white (AA)
  }
};

/* React component validating brand colors */
const BrandButton = ({ variant = "primary", children }) => {
  const colors = {
    primary: {
      bg: "#005AB3",
      text: "#FFFFFF",
      contrastRatio: 8.2 // AAA compliant
    },
    secondary: {
      bg: "#C44F25",
      text: "#FFFFFF",
      contrastRatio: 5.5 // AA compliant
    }
  };

  const style = colors[variant];

  return (
    <button
      style={{
        backgroundColor: style.bg,
        color: style.text
      }}
      aria-label={\`\${variant} button, contrast ratio \${style.contrastRatio}:1\`}
    >
      {children}
    </button>
  );
};

/* Accessible logo color combinations */
.logo-light-bg {
  /* Logo blue on white */
  color: #005AB3; /* AAA compliant */
  background: #FFFFFF;
}

.logo-dark-bg {
  /* Logo light blue on dark */
  color: #4DA6FF; /* AAA compliant */
  background: #1A1A1A;
}

/* Marketing gradients with readable text */
.hero-gradient {
  background: linear-gradient(135deg, #005AB3, #003D7A);
  color: #FFFFFF;
  /* White on darkest blue: 12:1 - AAA ✓ */
  /* Ensure text appears on darker portion of gradient */
}`
    },
    {
      title: "Dark Mode Contrast Validation",
      description: "Test color combinations for dark theme compliance. Colors passing in light mode often fail in dark mode. Validate both themes separately for comprehensive accessibility coverage.",
      example: `/* Light mode - WCAG AA compliant */
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --text-primary: #1A1A1A;
  --text-secondary: #4A4A4A;
  --link-color: #0066CC;
}

/* Dark mode - separately validated */
[data-theme="dark"] {
  --bg-primary: #1A1A1A;
  --bg-secondary: #2D2D2D;
  --text-primary: #FFFFFF;
  --text-secondary: #B8B8B8;
  --link-color: #4DA6FF; /* Lightened for dark bg */
}

/* Link color testing */
.link-light-mode {
  color: #0066CC; /* Standard blue */
  background: #FFFFFF;
  /* Ratio: 8.6:1 - WCAG AAA ✓ */
}

.link-dark-mode-fail {
  color: #0066CC; /* Same blue - FAILS on dark */
  background: #1A1A1A;
  /* Ratio: 2.4:1 - WCAG FAIL ✗ */
}

.link-dark-mode-fixed {
  color: #4DA6FF; /* Lightened blue */
  background: #1A1A1A;
  /* Ratio: 7.8:1 - WCAG AAA ✓ */
}

/* Status colors - light mode */
.status-success-light {
  color: #1E7A34; /* Dark green */
  background: #FFFFFF;
  /* Ratio: 5:1 - WCAG AA ✓ */
}

.status-error-light {
  color: #C41E3A; /* Dark red */
  background: #FFFFFF;
  /* Ratio: 5.9:1 - WCAG AA ✓ */
}

/* Status colors - dark mode */
.status-success-dark {
  color: #57D278; /* Light green */
  background: #1A1A1A;
  /* Ratio: 8:1 - WCAG AAA ✓ */
}

.status-error-dark {
  color: #FF6B7F; /* Light red */
  background: #1A1A1A;
  /* Ratio: 6.5:1 - WCAG AA ✓ */
}

/* React theme-aware component */
const ThemedText = ({ children, variant = "primary" }) => {
  const theme = useTheme();

  const colors = {
    light: {
      primary: "#1A1A1A",   // 16:1
      secondary: "#4A4A4A",  // 9:1
      link: "#0066CC"        // 8.6:1
    },
    dark: {
      primary: "#FFFFFF",    // 21:1
      secondary: "#B8B8B8",  // 9:1
      link: "#4DA6FF"        // 7.8:1
    }
  };

  return (
    <span style={{ color: colors[theme.mode][variant] }}>
      {children}
    </span>
  );
};

/* Tailwind dark mode with validated colors */
<div class="bg-white dark:bg-gray-900">
  <p class="text-gray-900 dark:text-gray-100">
    {/* Light: gray-900 on white (16:1) ✓ */}
    {/* Dark: gray-100 on gray-900 (16:1) ✓ */}
    Primary text
  </p>

  <p class="text-gray-700 dark:text-gray-300">
    {/* Light: gray-700 on white (6:1) ✓ */}
    {/* Dark: gray-300 on gray-900 (10:1) ✓ */}
    Secondary text
  </p>

  <a class="text-blue-700 dark:text-blue-400">
    {/* Light: blue-700 on white (8:1) ✓ */}
    {/* Dark: blue-400 on gray-900 (7:1) ✓ */}
    Link text
  </a>
</div>

/* CSS custom properties for automatic theme switching */
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

/* Border contrast validation */
:root {
  --border-color: #D1D5DB; /* 1.8:1 on white - needs 3:1 */
}

/* Fixed border with 3:1 contrast */
:root {
  --border-color: #767676; /* 4.5:1 on white ✓ */
}

[data-theme="dark"] {
  --border-color: #5A5A5A; /* 4.1:1 on #1A1A1A ✓ */
}`
    },
    {
      title: "UI Component Contrast Compliance",
      description: "Ensure interactive UI components (buttons, form controls, icons) meet 3:1 non-text contrast requirement. Validate component states including hover, focus, and disabled for accessibility.",
      example: `/* Button contrast - background vs surrounding */
.button-primary {
  background: #0066CC;
  color: #FFFFFF;
  /* Text contrast: 8.6:1 ✓ */
  /* Component contrast: #0066CC vs #FFFFFF = 8.6:1 ✓ */
}

/* Button border for added contrast */
.button-outline {
  background: transparent;
  color: #0066CC;
  border: 2px solid #0066CC;
  /* Border contrast: 8.6:1 on white ✓ */
}

/* Disabled button - must still be perceivable */
.button-disabled-fail {
  background: #E0E0E0;
  color: #C0C0C0;
  /* Contrast: 1.4:1 - TOO LOW ✗ */
}

.button-disabled-fixed {
  background: #E0E0E0;
  color: #767676;
  /* Contrast: 3.2:1 - PERCEIVABLE ✓ */
}

/* Form input borders - 3:1 minimum */
.input-border-fail {
  border: 1px solid #D3D3D3;
  background: #FFFFFF;
  /* Border contrast: 1.5:1 - FAIL ✗ */
}

.input-border-fixed {
  border: 2px solid #767676;
  background: #FFFFFF;
  /* Border contrast: 4.5:1 - PASS ✓ */
}

/* Focus states must have 3:1 contrast */
.input-focus {
  border: 2px solid #767676;
}

.input-focus:focus {
  outline: 3px solid #0066CC;
  outline-offset: 2px;
  /* Focus ring: 8.6:1 on white ✓ */
}

/* Icon contrast requirements */
.icon-button {
  color: #1A1A1A; /* Icon color */
  background: #F5F5F5; /* Button background */
  /* Icon vs background: 1.2:1 - FAIL ✗ */
}

.icon-button-fixed {
  color: #1A1A1A;
  background: #FFFFFF;
  border: 2px solid #767676;
  /* Icon vs background: 16:1 ✓ */
  /* Border vs background: 4.5:1 ✓ */
}

/* Toggle switches - all states */
.toggle-off {
  background: #D1D5DB; /* Light gray track */
  /* vs white: 1.8:1 - FAIL ✗ */
}

.toggle-off-fixed {
  background: #767676; /* Darker track */
  /* vs white: 4.5:1 ✓ */
}

.toggle-on {
  background: #0066CC; /* Blue track */
  /* vs white: 8.6:1 ✓ */
}

/* Checkbox with sufficient contrast */
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #4A4A4A;
  background: #FFFFFF;
  /* Border: 9:1 on white ✓ */
}

.checkbox:checked {
  background: #0066CC;
  border-color: #0066CC;
  /* Checkmark (white) on blue: 8.6:1 ✓ */
}

/* Progress bar segments */
.progress-bar {
  background: #E5E7EB; /* Track */
  /* vs white: 1.2:1 - FAIL ✗ */
}

.progress-bar-fixed {
  background: #D1D5DB;
  border: 1px solid #9CA3AF;
  /* Border: 3.4:1 on white ✓ */
}

.progress-fill {
  background: #0066CC;
  /* vs track: sufficient contrast ✓ */
}

/* Tooltip contrast */
.tooltip {
  background: #1A1A1A;
  color: #FFFFFF;
  /* Text: 21:1 ✓ */
  /* Arrow/border visible against page background */
}

/* React accessible component library */
const AccessibleButton = ({
  children,
  variant = "primary",
  disabled = false
}) => {
  const variants = {
    primary: {
      bg: "#0066CC",
      text: "#FFFFFF",
      border: "transparent"
    },
    secondary: {
      bg: "#FFFFFF",
      text: "#0066CC",
      border: "#0066CC"
    },
    disabled: {
      bg: "#E0E0E0",
      text: "#767676",
      border: "#767676"
    }
  };

  const style = disabled ? variants.disabled : variants[variant];

  return (
    <button
      disabled={disabled}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: \`2px solid \${style.border}\`
      }}
    >
      {children}
    </button>
  );
};`
    }
  ],

  howToUse: {
    title: "How to Use This Color Contrast Checker",
    content: `This contrast checker calculates WCAG contrast ratios between foreground and background colors. Input colors, view compliance results, and adjust for accessibility requirements.

### Entering Colors

Input colors as hex codes (#FFFFFF), RGB values (rgb(255,255,255)), or HSL (hsl(0,0%,100%)). Use color pickers for visual selection or paste existing brand colors.

Click foreground color picker to select text/icon color. Click background color picker to select surface color. Preview updates in real-time showing how combination appears.

Paste hex codes directly into input fields. Remove # symbol optional - tool accepts both #FFFFFF and FFFFFF.

### Understanding Contrast Ratios

Ratios range from 1:1 (no contrast - identical colors) to 21:1 (maximum contrast - black on white or white on black).

Higher ratios mean better readability. 4.5:1 is minimum for normal text. 7:1 provides excellent readability for all users including those with low vision.

Ratio calculation based on relative luminance - perceptual brightness accounting for human vision sensitivity to different wavelengths.

### Checking WCAG Compliance

Tool shows pass/fail indicators for WCAG levels:

**Level AA (Minimum Standard):**
- Normal text: 4.5:1 required
- Large text (18pt+ or 14pt+ bold): 3:1 required
- UI components: 3:1 required

**Level AAA (Enhanced Standard):**
- Normal text: 7:1 required
- Large text: 4.5:1 required

Green checkmark indicates pass, red X indicates fail for each level and text size.

### Adjusting Colors for Compliance

If combination fails, adjust colors using sliders or input new values:

**To increase contrast:** Darken foreground or lighten background (or reverse). Adjust luminance while preserving hue.

**HSL adjustments:** Use HSL color model to adjust lightness (L value) while keeping hue and saturation constant.

**Preserve brand colors:** If brand color can't be adjusted, use it for large text, icons, or decorative elements only. Use accessible alternative for body text.

**Test both themes:** Validate colors work in both light and dark modes. A color passing on white may fail on dark backgrounds.

Real-time feedback shows when adjustment achieves target ratio. Continue adjusting until pass indicators appear.

### Advanced Features

**Reverse colors:** Swap foreground and background to test inverse combination. Useful for buttons, badges, or inversed themes.

**Suggest fixes:** Some tools suggest nearest WCAG-compliant colors. Automatically darken or lighten to meet requirements while preserving hue.

**Simulate vision deficiencies:** Preview how color combination appears to users with colorblindness or low vision.

**Batch testing:** Test multiple color combinations from palette simultaneously. Validate entire design system.

### Integration with Design Tools

Export validated colors to Figma, Sketch, Adobe XD. Share WCAG-compliant palettes with design team.

Generate CSS custom properties with validated colors. Document contrast ratios in design system.

Create color matrix showing all safe foreground/background pairings. Reference during design and development.

### Testing Workflow

1. Input brand or design colors
2. Check WCAG compliance level needed (AA vs AAA)
3. Identify failing combinations
4. Adjust colors until compliance achieved
5. Document compliant combinations
6. Re-test in both light and dark themes
7. Validate on actual devices and screens

### Common Adjustments

For light backgrounds (#FFFFFF):
- Body text: #1A1A1A to #4A4A4A (AA to AAA)
- Secondary text: #4A4A4A to #6C6C6C (AA)
- Disabled text: #767676 minimum (AA large text)

For dark backgrounds (#1A1A1A):
- Body text: #FFFFFF to #E0E0E0 (AAA)
- Secondary text: #B8B8B8 to #9CA3AF (AA)
- Links: Lighten blues, greens significantly

### Beyond Compliance

Meeting WCAG is minimum - real-world testing matters. Test on actual devices in various lighting conditions.

Bright sunlight reduces perceived contrast. Colors passing indoors may fail outside. Add extra contrast margin for mobile interfaces.

Age-related vision decline affects many users over 40. Higher contrast benefits all users, not just those with measured disabilities.`,
    steps: [
      {
        name: "Enter Colors",
        text: "Input foreground (text) color and background color as hex, RGB, or HSL. Use color pickers for visual selection or paste brand colors. Preview shows real-time appearance.",
      },
      {
        name: "View Contrast Ratio",
        text: "See calculated ratio (1:1 to 21:1 scale). Higher ratios mean better readability. Ratio appears instantly as you select colors.",
      },
      {
        name: "Check WCAG Levels",
        text: "Review pass/fail indicators for WCAG AA (4.5:1 normal text) and AAA (7:1 normal text) compliance. See separate results for large text (3:1 AA, 4.5:1 AAA).",
      },
      {
        name: "Adjust for Compliance",
        text: "If failing, darken foreground or lighten background using sliders. Real-time feedback shows when target ratio achieved. Test both light and dark mode combinations.",
      }
    ]
  },

  faqs: [
    {
      question: "What contrast ratio do I need for WCAG AA compliance?",
      answer: "WCAG Level AA requires 4.5:1 contrast ratio for normal text (under 18pt regular or under 14pt bold). Large text (18pt+ regular or 14pt+ bold) requires 3:1. UI components and graphical objects require 3:1 against adjacent colors. This is the widely adopted baseline standard for accessibility compliance."
    },
    {
      question: "What's the difference between WCAG AA and AAA?",
      answer: "Level AA is the widely adopted baseline standard. Level AAA is enhanced accessibility with stricter requirements: 7:1 for normal text (vs 4.5:1), 4.5:1 for large text (vs 3:1). AAA provides better readability for users with low vision but is harder to achieve with brand colors. Most organizations target AA compliance; AAA is recommended when possible."
    },
    {
      question: "Why does my brand color fail WCAG contrast requirements?",
      answer: "Many brand colors are selected for aesthetics, not accessibility. Bright, saturated colors (light blue, orange, yellow, pink) lack sufficient darkness for contrast with white backgrounds. Pastel colors fail severely. Solution: darken brand color for text, use original only for large elements (logos, headings), or find accessible alternative shade that preserves brand identity."
    },
    {
      question: "Can I use light gray text on white backgrounds?",
      answer: "Common gray values (#999, #AAA, #CCC) typically achieve only 2.5:1 to 3.5:1 contrast on white - below WCAG AA 4.5:1 requirement. Use #767676 or darker for AA compliance (4.5:1+). #595959 achieves AAA (7:1). Light gray can be used for large text (18pt+) if meeting 3:1 minimum, but darker is always more readable."
    },
    {
      question: "Do I need different colors for dark mode?",
      answer: "Yes. Colors passing in light mode often fail in dark mode. Blue (#0066CC) works on white (8.6:1) but fails on dark backgrounds (2.4:1). Lighten colors for dark backgrounds: use #4DA6FF instead of #0066CC. Validate both light and dark themes separately. Each requires different color adjustments for compliance."
    },
    {
      question: "What is 'large text' in WCAG standards?",
      answer: "Large text is 18pt (24px) or larger for regular font weight, OR 14pt (18.66px) or larger for bold font weight. Large text is more readable at lower contrast, requiring only 3:1 ratio for AA instead of 4.5:1. Use font-size and font-weight to determine if text qualifies as 'large' for contrast calculations."
    },
    {
      question: "How do I test button or icon contrast?",
      answer: "UI components require 3:1 contrast ratio against adjacent colors (WCAG Success Criterion 1.4.11). For buttons, test background color against surrounding page background (not text color inside button). For icons, test icon color against its background. Borders and focus indicators also need 3:1 contrast to be perceivable."
    },
    {
      question: "Can I test contrast for images or gradients?",
      answer: "Text over images or gradients is complex. Contrast may vary across image. Solutions: Add semi-transparent dark overlay for consistent contrast, use text shadow/outline for readability, place text on solid color portion of image, or ensure image has consistently dark/light area for text placement. Test worst-case scenario contrast."
    },
    {
      question: "What if I can't meet WCAG requirements with my colors?",
      answer: "Options: Use non-compliant color for decorative elements only (not functional text), create accessible alternative theme, add non-color indicators (icons, underlines) alongside color, increase font weight to improve readability at lower contrast, or adjust brand colors to accessible variants. WCAG allows exceptions for logos and inactive UI elements."
    },
    {
      question: "Is my color data private when using this contrast checker?",
      answer: "Yes. All contrast calculations happen client-side in your browser using WCAG's relative luminance formula. No color values are sent to servers. No backend processing. The tool works offline after initial load. Safe for testing proprietary brand colors or confidential design systems. Inspect DevTools Network tab - zero color data uploads."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your color values never leave your browser. This contrast checker operates entirely client-side using JavaScript implementations of WCAG relative luminance and contrast ratio formulas. There are no color uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All contrast calculations use browser-based mathematical formulas per WCAG standards.
- **No Server Uploads:** We don't have servers to process your colors. The tool works completely offline after first load.
- **No Data Storage:** Your color values are not saved anywhere. They exist only in your browser session.
- **No Analytics Tracking:** We don't track which colors you test or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your color data.

This makes the tool safe for testing proprietary brand colors, confidential design systems, or unreleased product interfaces. Use with confidence for commercial projects and sensitive design work.`,
  },

  stats: {
    "WCAG Levels": "AA/AAA",
    "Ratio Range": "1:1 to 21:1",
    "Color Formats": "Hex/RGB/HSL",
    "Client-Side": "100%",
    "Server Uploads": "0"
  }
};
