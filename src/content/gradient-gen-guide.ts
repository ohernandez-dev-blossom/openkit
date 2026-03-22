/**
 * Gradient Generator Tool Guide Content
 * Comprehensive developer guide for CSS gradient generation
 */

import type { ToolGuideContent } from "./types";

export const gradientGenGuideContent: ToolGuideContent = {
  toolName: "Gradient Generator",
  toolPath: "/gradient",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Choose Gradient Type",
      description: "Select linear gradient (directional color transition), radial gradient (circular spread from center), or conic gradient (rotation around center point). Each type creates distinct visual effects."
    },
    {
      title: "Add and Position Color Stops",
      description: "Click to add color stops along the gradient path. Drag stops to adjust position, click stops to change colors. Multiple color stops create complex, multi-color gradients with smooth transitions."
    },
    {
      title: "Configure Direction and Shape",
      description: "For linear gradients, set angle or direction (to right, to bottom). For radial gradients, choose shape (circle, ellipse) and size (closest-side, farthest-corner). Preview updates in real-time."
    },
    {
      title: "Copy CSS Code",
      description: "Copy generated CSS with one click. Includes browser prefixes (-webkit-, -moz-) for maximum compatibility. Use in stylesheets, Tailwind config, or CSS-in-JS libraries."
    }
  ],

  introduction: {
    title: "What is a CSS Gradient Generator?",
    content: `A CSS gradient generator is a visual tool that creates CSS gradient code for web backgrounds, buttons, and UI elements. Gradients provide smooth color transitions without images, reducing page load time and enabling resolution-independent, scalable designs. Modern CSS gradients support complex multi-color effects, directional control, and responsive sizing essential for contemporary web design.

CSS gradients are background images created by the browser using CSS functions: linear-gradient(), radial-gradient(), and conic-gradient(). Unlike static images, CSS gradients are vector-based, infinitely scalable, and performant. They're essential for creating modern UI components, hero sections, buttons, cards, and visual effects without relying on image files.

### CSS Gradient Types

**Linear Gradients:** Colors transition along a straight line from start to end point. Direction can be specified by angle (45deg, 90deg) or keyword (to right, to bottom). Linear gradients create directional color flows, commonly used for backgrounds, header sections, and button hover effects.

**Radial Gradients:** Colors radiate from a center point outward in a circular or elliptical pattern. Shape can be circle or ellipse, size determines how far the gradient extends. Radial gradients create focal points, spotlight effects, or circular button backgrounds.

**Conic Gradients:** Colors rotate around a center point like a color wheel. Position and angle control where the gradient starts. Conic gradients create pie charts, loading spinners, or unique decorative effects.

### Why Developers Need Gradient Generators

Manual gradient CSS is verbose and difficult to visualize. A linear gradient with 3 colors requires specifying type, direction, color stops, and positions - hard to predict the visual result. Gradient generators provide visual previews, making design iteration fast and intuitive.

Design to code translation benefits from generators. Designers create gradients in Figma or Sketch, developers recreate them with generated CSS. Generators speed up implementation and ensure design fidelity.

Browser compatibility requires vendor prefixes for older browsers. Generators automatically add -webkit-linear-gradient for Safari, -moz-linear-gradient for Firefox, ensuring cross-browser support without manual prefix management.

Performance optimization favors CSS gradients over images. Gradients have zero HTTP requests, scale infinitely without pixelation, and compress well in CSS bundles. For backgrounds, buttons, and decorative elements, gradients outperform images.

### Common Gradient Use Cases

**Hero Section Backgrounds:** Full-width gradient backgrounds create visual depth and draw attention. Common pattern: dark to light gradient (top to bottom) behind white text for readability.

**Button Styling:** Subtle gradients on buttons create 3D depth. Hover states often transition to different gradients or reverse the direction for interactive feedback.

**Card Components:** Gradient backgrounds on cards differentiate content sections and add visual interest without images. Subtle radial gradients create depth perception.

**Loading Indicators:** Conic gradients create spinning loaders. Linear gradients with animation create shimmer effects for skeleton screens.

**Brand Identity:** Gradient color schemes establish brand aesthetics. Instagram's gradient logo, Stripe's backgrounds - gradients define modern brand identities.

### CSS Gradient Syntax

Linear gradient syntax: background: linear-gradient(direction, color1 position, color2 position, ...);

Example: linear-gradient(to right, #667eea 0%, #764ba2 100%)

Radial gradient syntax: background: radial-gradient(shape size at position, color1, color2, ...);

Example: radial-gradient(circle at center, #667eea, #764ba2)

Conic gradient syntax: background: conic-gradient(from angle at position, color1, color2, ...);

Example: conic-gradient(from 0deg, red, yellow, green, blue, red)

### Browser Compatibility

Modern gradients (unprefixed) work in all modern browsers: Chrome 26+, Firefox 16+, Safari 6.1+, Edge 12+. For broader compatibility, include vendor prefixes: -webkit-, -moz-, -o-.

Fallback colors ensure graceful degradation in older browsers. Always specify a solid background color before the gradient: background: #667eea; background: linear-gradient(...);

Browsers that don't support gradients display the solid color. Progressive enhancement ensures the site remains functional even if gradients don't render.

### Performance Considerations

CSS gradients are performant because they're rendered by the GPU, not downloaded assets. No network requests, no file size overhead. Complex gradients with many color stops (10+) may cause slight rendering overhead, but far less than equivalent images.

Gradient animations (transitioning between different gradients) can be expensive. Use transform and opacity animations instead of background transitions for best performance.

For very complex artistic gradients, consider SVG as an alternative. SVG gradients offer more control (mesh gradients, gradient along paths) but require additional markup.`,
  },

  useCases: [
    {
      title: "Modern Hero Section Backgrounds",
      description: "Create eye-catching hero sections with gradient backgrounds that establish visual hierarchy and brand identity. Combine gradients with overlay effects for text readability over complex backgrounds.",
      example: `/* Full-width hero with gradient background */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 80vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Gradient with overlay for better text readability */
.hero-with-overlay {
  background:
    linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9)),
    url('/hero-image.jpg');
  background-size: cover;
  background-position: center;
}

/* Animated gradient background */
.hero-animated {
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Tailwind CSS utility extension */
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    }
  }
}

// Usage: <div className="bg-hero-gradient">`
    },
    {
      title: "Interactive Button States",
      description: "Enhance buttons with gradient backgrounds and smooth transitions. Use gradients for default, hover, and active states to create depth and visual feedback. Essential for modern UI component libraries.",
      example: `/* Primary button with gradient */
.button-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Hover state: reverse gradient direction */
.button-primary:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

/* Active/pressed state */
.button-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
}

/* Gradient border button (border-image approach) */
.button-gradient-border {
  background: white;
  color: #667eea;
  padding: 12px 24px;
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.button-gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

/* React component example */
const GradientButton = () => (
  <button className="bg-gradient-to-r from-blue-500 to-purple-600
                     hover:from-purple-600 hover:to-blue-500
                     text-white font-bold py-3 px-6 rounded-lg
                     transition-all duration-300
                     hover:shadow-lg hover:scale-105">
    Click Me
  </button>
);`
    },
    {
      title: "Card and Component Backgrounds",
      description: "Apply subtle gradients to cards, panels, and UI components for visual depth without overwhelming content. Radial gradients create focal points, linear gradients establish directional flow.",
      example: `/* Subtle radial gradient on card */
.card {
  background: radial-gradient(
    circle at top left,
    #f8f9fa 0%,
    #ffffff 50%,
    #f1f3f5 100%
  );
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Pricing card with accent gradient */
.pricing-card {
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid #e9ecef;
  border-radius: 16px;
  padding: 32px;
}

.pricing-card-featured {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.3);
}

/* Dashboard stat card */
.stat-card {
  background:
    linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05)),
    white;
  border-left: 4px solid #667eea;
  padding: 20px;
  border-radius: 8px;
}

/* CSS custom properties for theme variations */
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
  --gradient-warning: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  --gradient-danger: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.card-primary { background: var(--gradient-primary); }
.card-success { background: var(--gradient-success); }`
    },
    {
      title: "Loading States and Animations",
      description: "Create shimmer effects for skeleton screens, progress bars with gradient fills, and animated loading spinners. Gradients enhance perceived performance during async operations.",
      example: `/* Skeleton loading shimmer effect */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  height: 20px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Gradient progress bar */
.progress-bar {
  background: #e9ecef;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  width: 60%; /* dynamic via JS */
  transition: width 0.3s ease;
}

/* Conic gradient loading spinner */
.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 270deg,
    #667eea 270deg,
    #667eea 360deg
  );
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* React shimmer component */
const ShimmerBox = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
                    bg-[length:200%_100%] rounded animate-shimmer"></div>
  </div>
);

/* Tailwind config for shimmer */
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  }
}`
    }
  ],

  howToUse: {
    title: "How to Use This Gradient Generator",
    content: `This gradient generator provides a visual interface for creating CSS gradients with real-time preview. Configure colors, directions, and positions visually, then copy production-ready CSS code.

### Creating Linear Gradients

Select "Linear" gradient type. Click the gradient bar to add color stops - each stop represents a color and position. Drag stops left or right to adjust position, creating smoother or sharper transitions.

Click any color stop to open the color picker. Choose colors using hex codes, RGB, or the visual picker. The preview updates instantly as you change colors.

Set direction using angle input (0-360deg) or direction dropdown (to right, to bottom, to bottom right). 0deg points up, 90deg points right, 180deg points down, 270deg points left. Diagonal gradients use angles like 45deg or 135deg.

### Creating Radial Gradients

Select "Radial" gradient type. Add color stops and choose colors the same way as linear gradients. Radial stops position colors from center (0%) to edge (100%).

Choose shape (circle or ellipse). Circle creates uniform radial spread, ellipse adapts to container aspect ratio. Select size: closest-side, farthest-side, closest-corner, or farthest-corner. These determine how far the gradient extends.

Position the gradient center by clicking the preview or entering x/y coordinates. Center position (50% 50%) is default. Off-center positions create asymmetric radial effects.

### Creating Conic Gradients

Select "Conic" gradient type. Add color stops around the circle (0-360deg). Colors rotate around the center point like a color wheel or pie chart.

Set starting angle to rotate where the gradient begins. 0deg starts at top, 90deg at right. Use for creating pie charts, color pickers, or decorative circular patterns.

Position works like radial gradients - click or enter coordinates to move the rotation center point.

### Managing Color Stops

**Add Stop:** Click anywhere on the gradient bar to add a new color stop at that position.

**Remove Stop:** Click a stop to select it, then press Delete or click the remove button. Gradients need at least 2 stops.

**Reposition:** Drag stops along the bar. Position shown as percentage (0-100%) or degrees (0-360deg for conic).

**Change Color:** Click a stop to select it, then use the color picker. Supports hex (#667eea), RGB, HSL, or named colors.

**Duplicate Stop:** Select a stop and press Ctrl+D/Cmd+D to duplicate at the same position. Useful for creating sharp color transitions.

### Copying CSS Code

Click "Copy CSS" to copy the generated code to clipboard. The code includes:
- Standard syntax (linear-gradient, radial-gradient, conic-gradient)
- Vendor prefixes for older browsers (-webkit-, -moz-)
- Fallback solid color (first gradient color)
- Formatted and minified options

For Tailwind CSS projects, click "Copy Tailwind" to get utility class syntax or config extension code.

For CSS-in-JS (styled-components, emotion), click "Copy JS" to get JavaScript object syntax.

### Browser Compatibility Mode

Enable "Compatibility Mode" to generate CSS with full vendor prefixes for older browsers. This adds:
- -webkit-linear-gradient (Safari <5.1, Chrome <10)
- -moz-linear-gradient (Firefox <16)
- -o-linear-gradient (Opera <12)
- Standard unprefixed gradient (modern browsers)

Disable for modern projects targeting evergreen browsers to reduce CSS size.

### Preset Gradients

Click "Presets" to load popular gradient combinations: sunset, ocean, forest, neon, pastel themes. Presets provide starting points for customization.

Save custom gradients to browser localStorage for reuse. Export/import gradient collections as JSON for sharing across projects or team members.

### Real-Time Preview

The preview pane shows your gradient on a resizable container. Toggle preview modes:
- Box (default): Gradient on a centered box
- Full Width: Gradient as full-width background
- Button: Gradient on a button component
- Card: Gradient on a card component

These previews help visualize how gradients look in real UI contexts.

### Keyboard Shortcuts

- **Arrow Keys:** Nudge selected color stop left/right
- **Ctrl+D/Cmd+D:** Duplicate selected stop
- **Delete:** Remove selected stop
- **Ctrl+C/Cmd+C:** Copy CSS code
- **Ctrl+Z/Cmd+Z:** Undo last change
- **Ctrl+Shift+Z/Cmd+Shift+Z:** Redo`,
    steps: [
      {
        name: "Select Type",
        text: "Choose linear, radial, or conic gradient. Linear for directional transitions, radial for circular spread, conic for rotational effects."
      },
      {
        name: "Add Colors",
        text: "Click the gradient bar to add color stops. Click stops to change colors with the picker. Drag stops to adjust positions."
      },
      {
        name: "Configure Options",
        text: "Set direction (linear), shape and size (radial), or rotation angle (conic). Preview updates in real-time as you adjust settings."
      },
      {
        name: "Copy CSS",
        text: "Click Copy to get production-ready CSS code with browser prefixes. Use in stylesheets, Tailwind config, or CSS-in-JS."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between linear, radial, and conic gradients?",
      answer: "Linear gradients transition colors along a straight line (horizontal, vertical, diagonal). Use for directional backgrounds and headers. Radial gradients spread colors from a center point outward in a circle or ellipse. Use for spotlight effects and focal points. Conic gradients rotate colors around a center point like a color wheel. Use for pie charts, circular progress indicators, or decorative patterns."
    },
    {
      question: "How do I create a sharp color transition (no gradient blur)?",
      answer: "Place two color stops at the same position or very close together (e.g., 50% and 50.1%). This creates an instant color change with no smooth transition. Example: linear-gradient(90deg, blue 50%, red 50%) creates a sharp blue-to-red split at the center. Useful for stripes, color blocks, or geometric patterns."
    },
    {
      question: "Can I use CSS gradients as border colors?",
      answer: "Not directly - border-color doesn't support gradients. Use border-image with a gradient: border-image: linear-gradient(to right, blue, red) 1; Or, use a pseudo-element (::before) with absolute positioning and a gradient background to simulate a gradient border. The gradient generator can provide the gradient code, then wrap it in border-image or pseudo-element CSS."
    },
    {
      question: "How do I create transparent gradients (fade to transparent)?",
      answer: "Use rgba() or hsla() colors with alpha channel. For example, linear-gradient(to bottom, rgba(102,126,234,1), rgba(102,126,234,0)) fades the color from fully opaque to fully transparent. This creates overlay effects when layered over images or other backgrounds. The alpha value (fourth number) controls transparency: 0 = transparent, 1 = opaque."
    },
    {
      question: "Why doesn't my gradient work in older browsers?",
      answer: "Older browsers (IE9-, Safari <5.1) don't support modern gradient syntax or require vendor prefixes. Enable 'Compatibility Mode' in this tool to generate CSS with -webkit-, -moz-, and -o- prefixes. Always include a fallback solid color before the gradient: background: #667eea; background: linear-gradient(...); Browsers that don't support gradients will show the solid color."
    },
    {
      question: "How do I animate gradients?",
      answer: "You can't directly transition between different background gradients smoothly (very expensive). Instead, use background-position animation: create a large gradient (background-size: 200% 200%) then animate background-position to shift which part is visible. Or, animate opacity of overlaid gradients. For best performance, animate transform and opacity, not background."
    },
    {
      question: "Can I use gradients in Tailwind CSS?",
      answer: "Yes. Tailwind has gradient utilities: bg-gradient-to-r (linear right), from-blue-500 (start color), via-purple-500 (middle color), to-pink-500 (end color). Example: <div className='bg-gradient-to-r from-blue-500 to-purple-600'>. For custom gradients, add them to tailwind.config.js theme.extend.backgroundImage: 'custom-gradient': 'linear-gradient(135deg, #667eea, #764ba2)'."
    },
    {
      question: "How many color stops should I use?",
      answer: "2-4 color stops cover most use cases. More stops create complex, artistic gradients but increase CSS size and rendering complexity. For subtle backgrounds, 2-3 stops suffice. For vibrant, multi-color effects, 4-6 stops work well. Beyond 8-10 stops, consider using SVG for better control and performance, or simplify the design."
    },
    {
      question: "Is my gradient data private when using this tool?",
      answer: "Absolutely. All gradient generation happens client-side in your browser. Your colors, settings, and generated CSS never leave your device. No server uploads, no tracking. Safe for proprietary brand colors or confidential designs. The tool works offline after initial load."
    },
    {
      question: "Can I export gradients to design tools (Figma, Sketch)?",
      answer: "The tool generates CSS code, not design tool formats. To use in Figma/Sketch: 1) Generate the gradient here, 2) Copy color stops and positions, 3) Manually recreate in your design tool using the same colors and positions. For the reverse (design to CSS), most design tools can export CSS or use plugins to copy gradient code directly."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your gradient data never leaves your browser. This generator operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All gradient generation and CSS code creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your gradients. The tool works completely offline after first load.
- **No Data Storage:** Your gradients and colors are not saved on our servers. Browser localStorage is used only for local presets if you save them.
- **No Analytics Tracking:** We don't track which gradients you create, colors you use, or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your gradient data.

This makes the tool safe for creating gradients with proprietary brand colors, confidential design systems, or client-specific palettes. Use with confidence for commercial projects and branded experiences.

### Performance Considerations

CSS gradients are GPU-accelerated in modern browsers for smooth rendering. Complex gradients with many color stops (10+) may cause slight performance overhead during initial render, but far less than equivalent image backgrounds.

Gradient animations (changing background-position or transitioning opacity) are performant. Avoid animating background property itself (transitioning between different gradients) as it's expensive. Use transform and opacity animations for best performance.`
  },

  stats: {
    "Gradient Types": "3",
    "Browser Support": "95%+",
    "Color Stops": "Unlimited",
    "Export Formats": "CSS/Tailwind/JS",
    "Server Uploads": "0"
  }
};
