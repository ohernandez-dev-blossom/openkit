/**
 * Gradient Generator Tool Guide Content
 * Comprehensive developer guide for CSS gradient creation
 */

import type { ToolGuideContent } from "./types";

export const gradientGuideContent: ToolGuideContent = {
  toolName: "Gradient Generator",
  toolPath: "/gradient",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Gradient Type",
      description: "Choose from linear, radial, or conic gradients. Linear creates directional color transitions, radial radiates from center, conic rotates around a point like color wheels."
    },
    {
      title: "Add and Position Color Stops",
      description: "Click gradient bar to add color stops. Drag stops to adjust position. Click color swatch to change color. Minimum two stops required, unlimited maximum for complex transitions."
    },
    {
      title: "Adjust Gradient Direction",
      description: "For linear: set angle (0-360deg) or select direction preset (to right, to bottom, diagonal). For radial: adjust shape (circle/ellipse) and position. For conic: set starting angle."
    },
    {
      title: "Copy CSS Gradient Code",
      description: "Click copy to get production-ready CSS background-image property. Includes vendor prefixes if needed and optimized syntax. Paste directly into stylesheets."
    }
  ],

  introduction: {
    title: "What is a CSS Gradient Generator?",
    content: `A CSS gradient generator is a visual tool for creating CSS gradient backgrounds without manual coding. Gradients smoothly transition between two or more colors, creating depth, visual interest, and modern aesthetics. Generators provide instant visual feedback and precise control over color stops, angles, and transition points.

CSS gradients are superior to gradient image files - infinitely scalable, smaller file size (text vs image bytes), easily adjustable in code, and responsive by default. Single CSS property replaces multiple pre-rendered image variants for different screen sizes.

### Why Developers Need Gradient Generators

Gradients add visual depth and polish to interfaces. Flat colors feel dated; subtle gradients create dimension. Hero sections, buttons, cards, and backgrounds benefit from gradient enhancement without heavy imagery.

Manual gradient coding is tedious and error-prone. Precise color stop positioning (23% vs 25%) requires trial-and-error iteration. Visual generators show immediate preview, enabling rapid experimentation until achieving desired effect.

Complex multi-color gradients involve intricate syntax. background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); difficult to visualize from code alone. Generators handle syntax while designer focuses on aesthetics.

Responsive gradients adapt to viewport without media queries. Image backgrounds require multiple sizes; CSS gradients scale infinitely. Single definition works on mobile through 4K displays.

### CSS Gradient Types

**Linear Gradients:** Colors transition along a straight line. Specified with angle or direction keywords. Most common gradient type for backgrounds and overlays.

Syntax: linear-gradient(angle, color1 stop%, color2 stop%, ...)
Example: linear-gradient(90deg, #667eea, #764ba2)

**Radial Gradients:** Colors radiate from a center point outward. Creates circular or elliptical color spreads. Useful for spotlight effects, vignettes, or organic backgrounds.

Syntax: radial-gradient(shape size at position, color1, color2, ...)
Example: radial-gradient(circle, #667eea, #764ba2)

**Conic Gradients:** Colors transition around a central point like color wheel. Creates pie chart or rainbow effects. Useful for loading spinners, color pickers, or decorative elements.

Syntax: conic-gradient(from angle at position, color1, color2, ...)
Example: conic-gradient(from 0deg, red, yellow, green, blue, red)

**Repeating Gradients:** Any gradient type can repeat infinitely. Creates striped or patterned effects. Useful for backgrounds, progress bars, or decorative elements.

Example: repeating-linear-gradient(45deg, #667eea, #667eea 10px, #764ba2 10px, #764ba2 20px)

### Gradient Direction and Angles

Linear gradients require direction specification:

**Angle (degrees):** 0deg points up, 90deg points right, 180deg points down, 270deg points left. Positive angles rotate clockwise.

**Direction keywords:**
- to right = 90deg
- to bottom = 180deg
- to left = 270deg
- to top = 0deg
- to bottom right = 135deg (diagonal)

Radial gradients position center point:
- at center (default)
- at top left
- at 30% 50% (percentage positioning)

Conic gradients specify starting angle:
- from 0deg (default, starts at top)
- from 90deg (starts at right)

### Color Stops and Positioning

Color stops define where colors appear in gradient. Minimum two stops required; unlimited maximum enables complex transitions.

Syntax: color position%
Example: #667eea 0%, #764ba2 50%, #f093fb 100%

**Hard color stops:** Adjacent stops at same position create sharp color change, not gradual blend.
Example: #667eea 50%, #764ba2 50% (sharp transition at midpoint)

**Implicit positioning:** Omit percentages for even distribution.
Example: linear-gradient(red, yellow, green) = red 0%, yellow 50%, green 100%

**Mid-point hints:** Control gradient transition curve between stops.
Example: #667eea 0%, 30%, #764ba2 100% (transition accelerates at 30%)

### Gradient Overlays and Combinations

Multiple gradients layer by separating with commas:

\`\`\`css
background-image:
  linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
  url(photo.jpg);
\`\`\`

Gradient on image creates overlay for text readability. Semi-transparent gradients darken or tint images.

Combine multiple gradients for complex effects:

\`\`\`css
background:
  linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
  linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
  linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
\`\`\`

Creates complex multi-directional color blends.

### Gradient Performance

CSS gradients are GPU-accelerated for smooth rendering. More performant than gradient images - no HTTP request, no decode time, instant rendering.

Complex gradients with many color stops may have slight rendering cost. Keep stops reasonable (< 10) for optimal performance. Animating gradients possible but expensive - consider animating background-position or opacity instead.

Large gradient backgrounds (full viewport) may cause slight overdraw on mobile. Test performance on target devices. For maximum performance, apply gradients to specific elements rather than entire page backgrounds.

### Browser Compatibility

CSS gradients have universal support in modern browsers: Chrome, Firefox, Safari, Edge. No vendor prefixes needed since 2014.

Older browsers (IE9 and below) don't support CSS gradients. Provide fallback solid color:

\`\`\`css
background: #667eea; /* fallback */
background: linear-gradient(135deg, #667eea, #764ba2);
\`\`\`

Conic gradients have slightly less support (2020+). Check caniuse.com if supporting older browsers.

### Accessibility Considerations

Ensure text on gradient backgrounds has sufficient contrast. Gradients create varying contrast across surface - test text readability at darkest and lightest gradient areas.

WCAG requires 4.5:1 contrast for body text, 3:1 for large text. Use semi-transparent dark overlays on light gradients or light overlays on dark gradients to ensure text readability.

Avoid pure decorative gradients that don't add meaning. Screen readers ignore background gradients - ensure content remains comprehensible without visual gradient effect.`,
  },

  useCases: [
    {
      title: "Hero Section Background Gradients",
      description: "Create eye-catching hero backgrounds with linear or radial gradients. Gradients add depth and visual interest without heavy image files. Combine with subtle overlays for text readability on varying backgrounds.",
      example: `/* Classic linear gradient hero */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Vibrant multi-color gradient */
.hero-vibrant {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  );
}

/* Subtle two-tone gradient */
.hero-subtle {
  background: linear-gradient(
    180deg,
    #f8fafc 0%,
    #e2e8f0 100%
  );
  color: #1a202c;
}

/* Radial gradient spotlight */
.hero-radial {
  background: radial-gradient(
    circle at top right,
    #667eea 0%,
    #764ba2 50%,
    #1a202c 100%
  );
}

/* Diagonal gradient with overlay */
.hero-overlay {
  background-image:
    linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.9),
      rgba(118, 75, 162, 0.9)
    ),
    url('/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}

/* Animated gradient (background-position) */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero-animated {
  background: linear-gradient(
    270deg,
    #667eea,
    #764ba2,
    #f093fb,
    #667eea
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

/* Dark mode gradient */
.hero-dark {
  background: linear-gradient(
    180deg,
    #1a202c 0%,
    #2d3748 100%
  );
  color: #f7fafc;
}

/* Mesh gradient (multiple overlays) */
.hero-mesh {
  background:
    radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 50%),
    radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
    radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
    radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
    radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
    radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
    radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%);
}

/* Glass morphism gradient */
.hero-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* React hero component */
const HeroGradient = ({ variant = "default" }) => {
  const gradients = {
    default: "bg-gradient-to-br from-blue-600 to-purple-600",
    vibrant: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500",
    subtle: "bg-gradient-to-b from-gray-50 to-gray-200",
    dark: "bg-gradient-to-b from-gray-900 to-gray-800"
  };

  return (
    <section className={\`min-h-screen flex items-center justify-center \${gradients[variant]}\`}>
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">Your Heading</h1>
        <p className="text-xl opacity-90">Your subheading goes here</p>
      </div>
    </section>
  );
};

/* Tailwind gradient utilities */
<div class="bg-gradient-to-r from-blue-600 to-purple-600 min-h-screen">
  <div class="container mx-auto px-6 py-24">
    <h1 class="text-5xl font-bold text-white">Hero Title</h1>
  </div>
</div>

/* CSS custom properties for themeable gradients */
:root {
  --gradient-start: #667eea;
  --gradient-end: #764ba2;
}

.hero-themeable {
  background: linear-gradient(
    135deg,
    var(--gradient-start),
    var(--gradient-end)
  );
}

/* Gradient with text shadow for readability */
.hero-text {
  background: linear-gradient(180deg, #667eea, #764ba2);
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}`
    },
    {
      title: "Button Gradient Hover Effects",
      description: "Enhance buttons with gradient backgrounds and smooth hover transitions. Gradients make CTAs more visually appealing than flat colors. Shift gradient on hover for interactive feedback.",
      example: `/* Gradient button with hover shift */
.button-gradient {
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-size: 200% 200%;
  background-position: 0% 50%;
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-position 0.5s ease, transform 0.2s ease;
}

.button-gradient:hover {
  background-position: 100% 50%;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

/* Animated gradient button */
@keyframes gradientRotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.button-animated {
  background: linear-gradient(
    90deg,
    #667eea,
    #764ba2,
    #f093fb,
    #667eea
  );
  background-size: 300% 300%;
  animation: gradientRotate 3s ease infinite;
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
}

/* Gradient border button */
.button-gradient-border {
  position: relative;
  background: white;
  color: #667eea;
  padding: 14px 32px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  z-index: 1;
}

.button-gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.button-gradient-border:hover::before {
  opacity: 0.8;
}

/* Radial gradient button */
.button-radial {
  background: radial-gradient(
    circle at top left,
    #667eea,
    #764ba2
  );
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.button-radial:hover {
  transform: scale(1.05);
}

/* Subtle gradient for secondary buttons */
.button-subtle {
  background: linear-gradient(180deg, #f7fafc, #e2e8f0);
  border: 1px solid #cbd5e0;
  color: #2d3748;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.button-subtle:hover {
  background: linear-gradient(180deg, #e2e8f0, #cbd5e0);
  border-color: #a0aec0;
}

/* Glass button with gradient */
.button-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.button-glass:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.2)
  );
  transform: translateY(-2px);
}

/* React gradient button component */
const GradientButton = ({ children, variant = "primary" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    success: "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
  };

  return (
    <button className={\`px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl \${variants[variant]}\`}>
      {children}
    </button>
  );
};

/* Tailwind gradient button */
<button class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
  Click Me
</button>

/* Shiny metallic gradient */
.button-metallic {
  background: linear-gradient(
    180deg,
    #e0e7ff 0%,
    #a5b4fc 50%,
    #818cf8 50%,
    #6366f1 100%
  );
  border: 1px solid #4f46e5;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
}`
    },
    {
      title: "Card and Component Gradients",
      description: "Apply subtle gradients to cards, panels, and components for depth and visual hierarchy. Gradients distinguish elements without heavy borders or shadows. Perfect for pricing cards, feature sections, and dashboard widgets.",
      example: `/* Subtle card gradient background */
.card {
  background: linear-gradient(180deg, #ffffff, #f9fafb);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Gradient pricing card */
.pricing-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.pricing-card.featured {
  background: linear-gradient(
    135deg,
    #f093fb 0%,
    #f5576c 100%
  );
}

/* Gradient top border accent */
.card-accent {
  background: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-accent::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

/* Dashboard widget gradient */
.widget {
  background: linear-gradient(
    135deg,
    #1e3a8a 0%,
    #3b82f6 100%
  );
  color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.widget-value {
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Gradient overlay on image card */
.image-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 400px;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

.image-card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  color: white;
  z-index: 1;
}

/* Glassmorphic card */
.card-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Feature card with radial gradient */
.feature-card {
  background: radial-gradient(
    circle at top left,
    #ede9fe,
    #f5f3ff
  );
  border: 1px solid #e9d5ff;
  border-radius: 12px;
  padding: 32px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.2);
}

/* Gradient progress card */
.progress-card {
  background: linear-gradient(90deg, #22c55e 0%, #22c55e var(--progress, 0%), #e5e7eb var(--progress, 0%), #e5e7eb 100%);
  border-radius: 8px;
  padding: 16px;
  color: white;
}

/* React gradient card component */
const GradientCard = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gradient-to-br from-white to-gray-50 border border-gray-200",
    primary: "bg-gradient-to-br from-blue-600 to-purple-600 text-white",
    success: "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
    glass: "bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg border border-white/30"
  };

  return (
    <div className={\`rounded-xl p-6 shadow-lg \${variants[variant]}\`}>
      {children}
    </div>
  );
};

/* Tailwind gradient card */
<div class="bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-100 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
  <h3 class="text-2xl font-bold text-gray-900 mb-4">Card Title</h3>
  <p class="text-gray-600">Card content goes here</p>
</div>`
    },
    {
      title: "Text Gradients and Headings",
      description: "Apply gradients to text using background-clip for modern, eye-catching headings. Gradient text creates visual impact without additional elements. Popular in landing pages and brand headers.",
      example: `/* Gradient text heading */
.gradient-text {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
}

/* Animated gradient text */
@keyframes gradientText {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-text-animated {
  background: linear-gradient(
    90deg,
    #667eea,
    #764ba2,
    #f093fb,
    #667eea
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientText 5s ease infinite;
}

/* Vibrant rainbow text */
.rainbow-text {
  background: linear-gradient(
    90deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #4b0082,
    #9400d3
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: 800;
}

/* Subtle gradient text */
.gradient-text-subtle {
  background: linear-gradient(135deg, #4b5563, #1f2937);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  font-weight: 700;
}

/* Gradient text with fallback */
.gradient-text-safe {
  color: #667eea; /* fallback for unsupported browsers */
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Metallic gold gradient text */
.text-gold {
  background: linear-gradient(
    135deg,
    #ffd700 0%,
    #ffed4e 50%,
    #ffa500 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
}

/* Gradient text with stroke */
.gradient-text-stroke {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-text-stroke: 2px rgba(102, 126, 234, 0.3);
}

/* Radial gradient text */
.gradient-text-radial {
  background: radial-gradient(
    circle,
    #667eea 0%,
    #764ba2 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* React gradient text component */
const GradientText = ({ children, colors = ["#667eea", "#764ba2"] }) => {
  const gradientStyle = {
    background: \`linear-gradient(135deg, \${colors.join(", ")})\`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  return (
    <h1 className="text-6xl font-black" style={gradientStyle}>
      {children}
    </h1>
  );
};

/* Usage */
<GradientText colors={["#667eea", "#764ba2", "#f093fb"]}>
  Amazing Gradient Text
</GradientText>

/* Tailwind gradient text utility */
<h1 class="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Gradient Heading
</h1>

/* Link with gradient hover */
.link-gradient {
  color: #667eea;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

.link-gradient:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* CTA with gradient text */
.cta-gradient {
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
}`
    }
  ],

  howToUse: {
    title: "How to Use This Gradient Generator",
    content: `This gradient generator provides visual controls for creating CSS gradients with real-time preview. Select gradient type, add color stops, adjust direction, and export production-ready CSS code.

### Selecting Gradient Type

Choose from three gradient types:

**Linear:** Colors transition along straight line. Most common gradient type. Use for backgrounds, buttons, hero sections. Requires angle or direction.

**Radial:** Colors radiate from center point outward. Creates circular or elliptical spreads. Use for spotlight effects, vignettes, organic backgrounds.

**Conic:** Colors rotate around central point like color wheel. Creates pie chart effects. Use for loading spinners, color pickers, decorative elements.

Click type button to switch. Preview updates immediately showing selected gradient type.

### Adding Color Stops

Color stops define where specific colors appear in gradient. Minimum two stops required.

**Add stop:** Click anywhere on gradient bar. New stop appears at click position with interpolated color.

**Move stop:** Drag stop left/right along bar to change position (0-100%).

**Change color:** Click color swatch to open color picker. Select new color or enter hex/RGB value.

**Delete stop:** Click stop, press Delete key or click trash icon.

More stops enable complex, multi-color transitions. Keep stops reasonable (< 10) for maintainable code.

### Adjusting Gradient Direction

**Linear gradients:**
- **Angle slider:** 0-360 degrees. 0deg = upward, 90deg = right, 180deg = down, 270deg = left.
- **Direction presets:** Click preset buttons (to right, to bottom, diagonal) for common angles.
- **Angle input:** Enter precise degree value for exact control.

**Radial gradients:**
- **Shape:** Circle or ellipse
- **Size:** Closest-side, farthest-side, closest-corner, farthest-corner
- **Position:** Center, top-left, custom percentage positioning

**Conic gradients:**
- **Starting angle:** 0-360 degrees, where gradient begins rotation
- **Position:** Center point of rotation

Preview updates in real-time as you adjust direction parameters.

### Fine-Tuning Color Positions

Drag color stops for precise positioning. Percentage indicator shows exact stop location (0-100%).

**Hard color transitions:** Position two stops at same percentage for sharp color change instead of gradual blend. Example: Stop 1 at 50% blue, Stop 2 at 50% red creates sharp midpoint transition.

**Gradual blends:** Space stops apart for smooth color transitions. Wider spacing = more gradual blend.

**Asymmetric gradients:** Cluster stops at one end for concentrated color, space out at other end for gradual fade.

### Copying CSS Code

Click "Copy CSS" to get production-ready gradient code:

\`\`\`css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
\`\`\`

Code includes:
- Gradient type (linear/radial/conic)
- Direction/angle
- All color stops with positions
- Optimized syntax (omits 0% and 100% when possible)

Paste directly into CSS:
\`\`\`css
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
\`\`\`

### Creating Gradient Overlays

Combine gradient with image for overlay effect:

\`\`\`css
background-image:
  linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
  url(photo.jpg);
\`\`\`

Semi-transparent black gradient darkens image for text readability. Adjust opacity (0.0-1.0) for lighter/darker overlay.

### Saving Favorite Gradients

Click heart icon to save gradient to favorites. Access saved gradients from "Favorites" tab for quick reuse across projects. Build personal gradient library.

### Performance Tips

**Keep stops reasonable:** < 10 color stops for optimal performance and maintainable code.

**Avoid animating gradients directly:** Expensive. Instead, animate background-position or opacity for performant effects.

**Test on mobile:** Complex gradients may have slight rendering cost on low-end devices.

### Accessibility

Ensure text on gradient backgrounds has sufficient contrast. Test readability at darkest and lightest gradient areas. Use contrast checker to verify WCAG compliance (4.5:1 for body text, 3:1 for large text).

Provide fallback solid color for browsers without gradient support:

\`\`\`css
background: #667eea; /* fallback */
background: linear-gradient(135deg, #667eea, #764ba2);
\`\`\``,
    steps: [
      {
        name: "Select Gradient Type",
        text: "Choose linear (directional transition), radial (center outward), or conic (rotational). Linear most common for backgrounds and buttons. Radial for spotlights. Conic for decorative effects."
      },
      {
        name: "Add Color Stops",
        text: "Click gradient bar to add stops. Drag stops to position (0-100%). Click color swatch to change color. Minimum two stops required. More stops create complex multi-color transitions."
      },
      {
        name: "Adjust Direction",
        text: "For linear: set angle (0-360deg) or use direction presets. For radial: adjust shape (circle/ellipse) and position. For conic: set starting angle. Preview updates in real-time."
      },
      {
        name: "Copy CSS Code",
        text: "Click Copy to get production-ready background gradient property. Includes gradient type, direction, all color stops with positions. Paste directly into stylesheets or inline styles."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between linear, radial, and conic gradients?",
      answer: "Linear transitions colors along a straight line (angle or direction). Radial radiates colors from center point outward in circle/ellipse. Conic rotates colors around central point like color wheel. Linear most common for backgrounds, radial for spotlights/vignettes, conic for decorative/loading effects. Choose based on desired visual effect."
    },
    {
      question: "How do I create a sharp color transition instead of gradual blend?",
      answer: "Position two color stops at the same percentage. Example: #667eea 50%, #764ba2 50% creates sharp transition at midpoint. For striped effect: #667eea 0%, #667eea 50%, #764ba2 50%, #764ba2 100%. Adjacent stops at same position = no gradual blend, instant color change."
    },
    {
      question: "Can I animate CSS gradients smoothly?",
      answer: "Animating gradient directly (changing colors/positions) is expensive. Instead, animate background-position on large gradient with background-size: 200% or more. Creates illusion of animated gradient with better performance. Or animate opacity between two gradient backgrounds. Avoid @keyframes changing actual gradient values - causes repaint overhead."
    },
    {
      question: "How do I create gradient text?",
      answer: "Use background-clip: text with -webkit-text-fill-color: transparent. Example: background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; Works in all modern browsers. Provide fallback color for older browsers: color: #667eea before gradient declaration."
    },
    {
      question: "What gradient angle should I use for diagonal?",
      answer: "45deg creates precise diagonal (bottom-left to top-right). 135deg creates opposite diagonal (top-left to bottom-right). Or use direction keywords: to top right = 45deg, to bottom right = 135deg. For symmetrical diagonal across any container, 45deg or 135deg work universally regardless of container aspect ratio."
    },
    {
      question: "How do I overlay gradient on background image?",
      answer: "Use multiple backgrounds with gradient first, image second: background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(photo.jpg); background-size: cover; background-position: center; Gradient overlays image. Use rgba() colors with alpha < 1.0 for semi-transparency. Adjust opacity to control image darkness for text readability."
    },
    {
      question: "Do CSS gradients work in all browsers?",
      answer: "Modern browsers (Chrome, Firefox, Safari, Edge 2014+) fully support linear and radial gradients without prefixes. Conic gradients require 2020+ browsers. Older browsers (IE9 and below) don't support gradients - provide fallback solid color: background: #667eea; before gradient declaration. Gradient ignored, fallback color used in unsupported browsers."
    },
    {
      question: "How many color stops should I use in a gradient?",
      answer: "2-5 stops cover most use cases. 2 stops = simple blend. 3-4 stops = vibrant multi-color. 5+ stops = complex artistic effects. More stops = more complex CSS and slight rendering cost. Keep stops reasonable (< 10) for maintainable code and optimal performance. Most professional gradients use 2-3 stops."
    },
    {
      question: "What's the difference between background and background-image for gradients?",
      answer: "background is shorthand including color, image, position, size, repeat. background-image specifically sets image/gradient. For single gradient, both work: background: linear-gradient(...) or background-image: linear-gradient(...). For multiple backgrounds or precise control, use background-image with separate background-size, background-position, etc."
    },
    {
      question: "Are my gradient designs private when using this tool?",
      answer: "Yes. All gradient generation happens client-side in your browser. No color values, stops, angles, or CSS code are sent to servers. No tracking, no storage. Safe for proprietary designs or client work. Tool works offline after initial load. Inspect DevTools Network tab - zero outbound requests with your gradient data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your gradient designs never leave your browser. This generator operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All gradient generation, color adjustments, and CSS code creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your gradients. The tool works completely offline after first load.
- **No Data Storage:** Your gradient values and color stops are not saved on our servers. Browser localStorage used only for local favorites if you save them.
- **No Analytics Tracking:** We don't track which gradients you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your gradient data.

This makes the tool safe for creating gradients for proprietary designs, client-specific brands, or confidential projects. Use with confidence for commercial work.`
  },

  stats: {
    "Gradient Types": "3",
    "Color Stops": "Unlimited",
    "Preset Gradients": "20+",
    "Export Formats": "CSS",
    "Server Uploads": "0"
  }
};
