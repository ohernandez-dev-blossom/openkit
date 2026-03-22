/**
 * Color Converter Tool Guide Content
 * Comprehensive developer guide for color format conversion
 */

import type { ToolGuideContent } from "./types";

export const colorsGuideContent: ToolGuideContent = {
  toolName: "Color Converter",
  toolPath: "/colors",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter a Color Code",
      description: "Paste any HEX color code (#3B82F6) into the HEX input field. The converter automatically updates RGB and HSL values in real-time, showing equivalent color representations across all formats with live preview."
    },
    {
      title: "Adjust RGB Sliders",
      description: "Use the red, green, and blue sliders to visually mix colors. Each slider ranges from 0-255, letting you fine-tune individual color channels. Watch HEX and HSL values update automatically as you adjust RGB components."
    },
    {
      title: "Fine-Tune with HSL",
      description: "Control hue (0-360°), saturation (0-100%), and lightness (0-100%) for intuitive color adjustments. Hue selects the color, saturation controls vibrancy, lightness adjusts brightness. Perfect for creating color variations and palettes."
    },
    {
      title: "Copy Any Format",
      description: "Click any color value card to instantly copy that format to your clipboard. Get colors in HEX for CSS, RGB for JavaScript, HSL for design systems, or export as CSS/SCSS variables for direct use in your stylesheets."
    }
  ],

  introduction: {
    title: "Understanding Color Models",
    content: `Color representation in digital systems relies on mathematical models that encode colors as numerical values. Different color models serve different purposes—some optimize for human perception, others for hardware display, and others for mathematical manipulation. Understanding these models is fundamental to web development, design systems, image processing, and frontend engineering.

Modern web development uses three primary color models: HEX (hexadecimal RGB), RGB (red-green-blue), and HSL (hue-saturation-lightness). Each model represents the same colors but with different notations optimized for specific use cases. Designers prefer HSL for intuitive color adjustments, developers use HEX for CSS conciseness, and graphics APIs often expect RGB for programmatic manipulation.

### Color Models Explained

**HEX (Hexadecimal RGB):** Represents colors as six hexadecimal digits (#RRGGBB) encoding red, green, and blue channel values from 00 to FF (0-255 in decimal). Example: #3B82F6 breaks down to Red=3B (59), Green=82 (130), Blue=F6 (246). HEX is the most compact notation, making it standard in CSS and design tools. Optional alpha channel extends to 8 digits (#RRGGBBAA) for transparency.

**RGB (Red-Green-Blue):** Represents colors as three decimal values (0-255) for red, green, and blue light channels matching how computer displays emit light. Example: rgb(59, 130, 246) is the same color as #3B82F6. RGB is intuitive for programmatic color manipulation since channels are separate integers. RGBA adds alpha (0-1) for transparency: rgba(59, 130, 246, 0.5).

**HSL (Hue-Saturation-Lightness):** Represents colors based on human perception rather than display technology. Hue (0-360°) selects the color from the color wheel, saturation (0-100%) controls color intensity, lightness (0-100%) adjusts brightness. Example: hsl(217, 91%, 60%) is the same blue. HSL makes it easy to create color variations—adjust lightness for tints/shades, saturation for muted versions.

### Why Color Conversion Matters for Developers

Frontend developers constantly convert between color formats when implementing design systems, theming, and dynamic color manipulation. Design tools export colors in HEX, but CSS animations might use RGB for programmatic tweening. JavaScript libraries expect RGB arrays, while SCSS variables use HEX. Accessibility tools require RGB for contrast calculations.

Design systems define color palettes with base colors and systematic variations (lighter, darker, muted). HSL makes these variations trivial—increment lightness by 10% for each tint, decrement for shades. RGB makes this calculation complex, requiring gamma-correct interpolation.

Theming and dark mode implementations require generating complementary colors, adjusting saturation globally, or inverting lightness values. CSS custom properties can store colors in any format, but HSL enables calc() expressions for dynamic color adjustments without JavaScript.

Color accessibility (WCAG contrast requirements) uses relative luminance calculations that require RGB values. Converting user-selected colors to RGB enables automatic contrast checking and suggesting accessible alternatives. Brand color enforcement across platforms requires converting between formats since iOS, Android, and web use different native color notations.

### Color Theory Fundamentals

The RGB color model is additive—combining red, green, and blue light at full intensity produces white, while zero intensity on all channels produces black. This matches how displays work: each pixel has red, green, and blue subpixels that emit light.

HSL separates color into perceptually meaningful dimensions. Hue represents the "pure" color (red, orange, yellow, green, blue, purple). Saturation controls color purity—100% is vivid, 0% is grayscale. Lightness controls brightness—50% is the "true" color, 100% is white, 0% is black. This separation makes color manipulation intuitive for humans.

Complementary colors sit opposite on the color wheel (180° hue difference). Analogous colors are adjacent (±30° hue). These relationships are easy to calculate in HSL but complex in RGB. Color harmonies, gradients, and palette generation all benefit from HSL's perceptual organization.

### Other Color Models

**CMYK (Cyan-Magenta-Yellow-Black):** Subtractive color model for printing. Mixing pigments (cyan, magenta, yellow) produces darker colors, opposite of additive RGB light. Black (K) added for true blacks since CMY creates muddy dark gray. Used by print design, not web development.

**HSV/HSB (Hue-Saturation-Value/Brightness):** Similar to HSL but Value replaces Lightness. At 100% value, you get full-saturation colors; at 0%, always black. Preferred by some graphics software (Photoshop uses HSB) but less common in CSS.

**LAB and LCH:** Perceptually uniform color spaces designed to match human vision. Color differences correspond to perceived differences. Used in advanced color science, image processing, and professional photography but rarely in web development.

### Alpha Transparency

All modern color models support alpha channels for transparency. RGBA adds alpha to RGB: rgba(255, 0, 0, 0.5) is 50% transparent red. HEX8 adds two digits for alpha: #FF000080 (same 50% red). HSLA adds alpha to HSL: hsla(0, 100%, 50%, 0.5). Alpha values range 0 (transparent) to 1 (opaque), or 00-FF in HEX8.

Transparency enables layering effects, overlays, shadows, and subtle UI elements. When compositing transparent colors, browsers alpha-blend them with the background. Understanding alpha is critical for implementing glassmorphism, modal overlays, and modern UI effects.`
  },

  useCases: [
    {
      title: "Design System Color Palettes",
      description: "Build systematic color scales for design systems by converting brand colors to HSL, then generating tints and shades by adjusting lightness. Create consistent 50-900 scales (Tailwind-style) where each step has predictable lightness values. Export in multiple formats for different platform requirements.",
      example: `// Base brand color
HEX: #3B82F6
HSL: hsl(217, 91%, 60%)

// Generate scale by adjusting lightness
50:  hsl(217, 91%, 95%) // lightest tint
100: hsl(217, 91%, 90%)
...
500: hsl(217, 91%, 60%) // base color
...
900: hsl(217, 91%, 20%) // darkest shade

// Export to CSS custom properties
--blue-500: #3B82F6;`
    },
    {
      title: "CSS Variable Conversion",
      description: "Convert designer-provided HEX colors to CSS custom properties supporting multiple formats. Use HSL in CSS variables for enabling calc() expressions that adjust lightness or saturation dynamically. Create theming systems that swap color values while maintaining relationships between shades.",
      example: `/* Designer provides HEX */
#3B82F6

/* Convert to CSS custom properties */
:root {
  --primary-h: 217;
  --primary-s: 91%;
  --primary-l: 60%;
  --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
  --primary-light: hsl(var(--primary-h), var(--primary-s), 80%);
  --primary-dark: hsl(var(--primary-h), var(--primary-s), 40%);
}`
    },
    {
      title: "Brand Color Consistency",
      description: "Ensure brand colors are consistent across web, iOS, Android, and print by converting the authoritative HEX brand color to platform-specific formats. Verify that RGB values match exactly across all platforms to prevent color drift between web and native apps.",
      example: `// Brand guideline color
HEX: #3B82F6

// Platform-specific conversions
CSS: #3B82F6
RGB: rgb(59, 130, 246)
iOS UIColor: (59/255, 130/255, 246/255)
Android: #3B82F6
RGBA: rgba(59, 130, 246, 1.0)
Flutter: Color(0xFF3B82F6)`
    },
    {
      title: "Accessibility Contrast Checking",
      description: "Convert colors to RGB for calculating relative luminance and contrast ratios per WCAG guidelines. Determine if text colors meet AA or AAA contrast requirements against backgrounds. Generate accessible color alternatives by adjusting lightness in HSL until contrast thresholds are met.",
      example: `// Text color: #3B82F6 (blue)
// Background: #FFFFFF (white)

// Convert to RGB for luminance calculation
Text RGB: (59, 130, 246)
Background RGB: (255, 255, 255)

// Calculate contrast ratio
Contrast: 3.54:1
WCAG AA Large Text: ✓ Pass (3:1 minimum)
WCAG AA Normal Text: ✗ Fail (4.5:1 minimum)

// Darken to meet WCAG AA
Adjusted: hsl(217, 91%, 45%) → 4.52:1 ✓`
    }
  ],

  howToUse: {
    title: "How to Use This Color Converter",
    content: `This color converter provides instant, real-time conversion between HEX, RGB, and HSL color formats with live preview. All color calculations happen client-side in your browser using standard color space mathematics, ensuring your brand colors and design tokens remain private with zero server uploads.

### Input Methods

**HEX Input:** Type or paste any HEX color code in the format #RRGGBB or RRGGBB (# is optional). The converter accepts uppercase or lowercase letters (A-F). As you type, RGB and HSL values update in real-time. Invalid HEX codes are ignored until you complete a valid 6-character code.

**RGB Sliders:** Drag the red, green, and blue sliders to visually mix colors. Each slider ranges from 0 (no color) to 255 (full intensity). Watch the color preview update in real-time as you adjust channels. This is perfect for fine-tuning colors by eye or exploring the RGB color space interactively.

**HSL Sliders:** The hue slider (0-360°) selects the base color from the color wheel (0=red, 60=yellow, 120=green, 180=cyan, 240=blue, 300=magenta). Saturation (0-100%) controls color intensity—0% is grayscale, 100% is vivid. Lightness (0-100%) adjusts brightness—0% is black, 50% is the "true" color, 100% is white.

### Visual Color Preview

The large preview panel shows your current color with overlaid HEX code. The text color automatically switches between black and white based on lightness to ensure readability (light backgrounds get dark text, dark backgrounds get light text). This preview helps verify colors look correct before copying values.

### Copy Color Values

Click any of the three color format cards (HEX, RGB, HSL) to instantly copy that format to your clipboard. No need to manually select text—just click the card. The card shows "Copied!" feedback briefly to confirm the copy operation succeeded. Copy HEX for CSS, RGB for JavaScript Canvas API, or HSL for color manipulation.

### Random Color Generation

Click the "Random" button or press the keyboard shortcut to generate a random color. Perfect for exploring the color space, finding color palette inspiration, or testing your design with unexpected colors. The random generator produces colors across the full spectrum with varied saturation and lightness.

### Preset Management

Save frequently-used colors as presets for quick access later. Name your presets (e.g., "Brand Primary", "Success Green", "Warning Orange") and load them with one click. Presets store HEX, RGB, and HSL values so you can quickly switch between project color schemes without re-entering values.

### Export Options

Export colors in multiple formats for different use cases:

- **Copy:** Copy raw color values to clipboard
- **JSON:** Export color object with HEX, RGB, and HSL properties for JavaScript import
- **CSS:** Export as CSS custom property (--color: #3B82F6;)
- **SCSS:** Export as SCSS variable ($color: #3B82F6;)
- **Tailwind:** Export in Tailwind config format ('custom': '#3B82F6')

These export formats make it easy to integrate colors into your codebase, design system, or configuration files without manual formatting.

### Color Adjustments

To create lighter versions (tints), increase lightness in the HSL sliders. For darker versions (shades), decrease lightness. To desaturate (make more gray), decrease saturation. To create color variations while maintaining the same hue, keep hue constant and adjust saturation and lightness.

For complementary colors (opposite on color wheel), add or subtract 180° from the hue value. For analogous colors (harmonious neighbors), adjust hue by ±30°. For triadic colors, use hue values 120° apart.`,
    steps: [
      {
        name: "Input a Color",
        text: "Enter a HEX color code in the HEX input field, or drag the RGB/HSL sliders to mix a color visually. All three formats update in real-time."
      },
      {
        name: "Preview the Color",
        text: "View the large color preview panel to verify the color looks correct. The preview updates instantly as you adjust any value."
      },
      {
        name: "Copy Desired Format",
        text: "Click the HEX, RGB, or HSL card to copy that format to your clipboard. Use the copied value in your CSS, JavaScript, or design tools."
      },
      {
        name: "Export or Save Preset",
        text: "Use the Export Hub to export colors in CSS, SCSS, JSON, or Tailwind format. Save frequently-used colors as presets for quick access later."
      }
    ]
  },

  faqs: [
    {
      question: "What color format should I use in CSS?",
      answer: "HEX (#3B82F6) is the most common for solid colors due to its conciseness and broad browser support since the early web. Use RGB/RGBA (rgb(59, 130, 246) or rgba(59, 130, 246, 0.5)) when you need transparency or programmatic color manipulation in JavaScript. Use HSL/HSLA (hsl(217, 91%, 60%)) when you need to adjust colors with calc() or create systematic color variations. Modern browsers support all formats equally, so choose based on your use case. For design systems, HSL in CSS custom properties enables powerful theming."
    },
    {
      question: "How do HEX color codes work?",
      answer: "HEX codes represent RGB colors in hexadecimal (base-16) notation. Format: #RRGGBB where RR=red, GG=green, BB=blue. Each pair ranges from 00 (0 in decimal, no color) to FF (255 in decimal, full intensity). Example: #FF0000 is full red (FF=255 red, 00=0 green, 00=0 blue). #FFFFFF is white (all channels at maximum). #000000 is black (all at minimum). Shorthand notation (#RGB) expands each digit: #F00 becomes #FF0000. HEX8 format (#RRGGBBAA) adds alpha for transparency."
    },
    {
      question: "When should I use HSL instead of RGB?",
      answer: "Use HSL when you need to create color variations (tints, shades, or saturation adjustments) programmatically or with CSS calc(). HSL makes it trivial to generate a color palette—keep hue and saturation constant, vary lightness for a cohesive scale. Use HSL for theming systems where you adjust all colors' lightness for dark mode. Use RGB when interfacing with graphics APIs, Canvas, WebGL, or image processing libraries that expect RGB values. For static colors, HEX is more concise than either."
    },
    {
      question: "How do I create lighter or darker versions of a color?",
      answer: "Convert to HSL and adjust the lightness value. To create lighter tints, increase lightness (toward 100%). For darker shades, decrease lightness (toward 0%). Keep hue and saturation constant to maintain the same color family. Example: hsl(217, 91%, 60%) → increase lightness to 80% for a light tint, or decrease to 40% for a dark shade. This preserves the color's character while adjusting brightness. In RGB, you'd need complex multiplication which often doesn't look perceptually correct."
    },
    {
      question: "What is color alpha/transparency and how do I use it?",
      answer: "Alpha controls transparency on a scale from 0 (completely transparent/invisible) to 1 (completely opaque/solid). In RGBA: rgba(59, 130, 246, 0.5) is 50% transparent blue. In HEX8: #3B82F680 (80 in hex ≈ 0.5 in decimal). In HSLA: hsla(217, 91%, 60%, 0.5). Use alpha for overlays, shadows, glassmorphism effects, or layering UI elements. When overlaid on backgrounds, browsers alpha-blend the colors. Note: alpha affects the entire element—for partial transparency, use pseudo-elements or multiple layers."
    },
    {
      question: "How do I check if my colors meet accessibility contrast requirements?",
      answer: "WCAG requires minimum contrast ratios: 4.5:1 for normal text (AA), 7:1 for normal text (AAA), 3:1 for large text (AA). Calculate contrast by converting both foreground and background colors to RGB, computing relative luminance for each, then calculating the ratio. Many online tools automate this. To fix low contrast: if text is too light, decrease lightness in HSL; if too dark, increase lightness. Aim for at least 4.5:1 for body text. This converter shows RGB values—use a contrast checker tool with those values."
    },
    {
      question: "What are complementary colors and how do I find them?",
      answer: "Complementary colors are opposite on the color wheel and create maximum contrast when paired. In HSL, add or subtract 180° from the hue. Example: hue 217° (blue) → complementary at 37° (orange). Complementary colors create vibrant, energetic designs but can be overwhelming if overused. For subtler harmony, use analogous colors (±30° hue) or triadic colors (120° apart). Split-complementary uses the base color plus the two colors adjacent to its complement. HSL makes these calculations trivial compared to RGB."
    },
    {
      question: "Can this converter handle colors with transparency?",
      answer: "Currently this converter focuses on solid colors (RGB, HEX, HSL) without alpha channels. To add transparency, append alpha to the output: convert #3B82F6 to rgba(59, 130, 246, 0.5) for 50% opacity, or #3B82F680 in HEX8 format. Most CSS properties support alpha in all formats. Transparency in HSL uses hsla(217, 91%, 60%, 0.5). The converter handles the RGB/HEX/HSL conversions—you add the alpha value manually based on your desired opacity level."
    },
    {
      question: "Is my color data private when using this tool?",
      answer: "Absolutely. All color conversions happen entirely in your browser using standard JavaScript math for color space conversions (RGB↔HSL calculations). Your colors never leave your device or get sent to any servers. There are no backend calls, no data storage, and no logging of your colors. This is important when working with proprietary brand colors, client design systems, or unreleased product color schemes. You can verify privacy by opening browser DevTools Network tab—zero outbound requests containing your color data. The tool works completely offline after first load."
    },
    {
      question: "Why do my colors look different on different monitors?",
      answer: "Color accuracy varies by monitor calibration, color space support (sRGB vs. DCI-P3 vs. Adobe RGB), brightness settings, and ambient lighting. Professional monitors calibrated to sRGB show more accurate colors. Laptop displays, especially older ones, may have poor color accuracy and limited gamut. Mobile devices often over-saturate colors for visual appeal. For critical color work (brand colors, print prep), use a calibrated monitor with a colorimeter. On the web, assume sRGB color space—most browsers default to sRGB, which covers most monitors. Wide-gamut displays (P3) show more vivid colors in supported browsers."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your color data never leaves your browser. This converter operates entirely client-side using standard color space mathematics implemented in JavaScript. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All color conversions (RGB↔HEX↔HSL) happen in your browser using basic math. Your colors stay on your device.
- **No Server Uploads:** We don't have servers to process colors. The tool works completely offline after first load.
- **No Data Storage:** Your colors are not saved, logged, or stored anywhere (except presets you explicitly save in browser local storage). Refresh and they're gone.
- **No Analytics Tracking:** We don't track what colors you convert, how often you use the tool, or any color-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Open browser DevTools and check the Network tab—zero outbound requests containing your color data.

This makes the converter safe for sensitive use cases like developing unreleased product color schemes, working with confidential client brand colors, designing proprietary design systems, or any color work that must remain confidential before public launch. Use with confidence for client projects, stealth startups, or any color work requiring discretion.

### Color Accessibility

When using colors in production, always verify contrast ratios meet WCAG accessibility standards. Test colors with color blindness simulators to ensure designs work for users with color vision deficiencies (deuteranopia, protanopia, tritanopia). Provide non-color cues (icons, labels, patterns) in addition to color coding to accommodate all users.`
  },

  stats: {
    "Color Formats": "5+",
    "Conversion Speed": "<1ms",
    "Hex Precision": "16.7M colors",
    "Alpha Support": "Yes",
    "Server Uploads": "0"
  }
};
