/**
 * Shadow Designer Tool Guide Content
 * Comprehensive developer guide for CSS box-shadow creation
 */

import type { ToolGuideContent } from "./types";

export const shadowGuideContent: ToolGuideContent = {
  toolName: "Shadow Designer",
  toolPath: "/shadow",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Adjust Shadow Position",
      description: "Use horizontal and vertical offset sliders to position the shadow relative to the element. Positive values move shadow right/down, negative values move left/up."
    },
    {
      title: "Configure Blur and Spread",
      description: "Blur radius controls softness (0 = sharp, higher = softer). Spread radius expands or contracts the shadow size before blur is applied. Combine for various depth effects."
    },
    {
      title: "Select Shadow Color and Opacity",
      description: "Choose shadow color with the picker. Adjust opacity for subtle or dramatic effects. Black with 10-30% opacity creates realistic depth, colors create stylized effects."
    },
    {
      title: "Copy CSS box-shadow Property",
      description: "Click copy to get production-ready box-shadow CSS. Add multiple shadows by clicking 'Add Layer' - useful for complex depth effects and neumorphism designs."
    }
  ],

  introduction: {
    title: "What is a CSS Shadow Designer?",
    content: `A CSS shadow designer is a visual tool that generates box-shadow and text-shadow CSS properties for creating depth, elevation, and visual hierarchy in web interfaces. Shadows simulate light and dimension on flat screens, making UI elements appear raised, pressed, or floating. Modern shadow design is essential for Material Design elevation, glassmorphism effects, and accessible focus states.

CSS shadows use the box-shadow property for element shadows and text-shadow for text effects. Box-shadow adds shadows to container elements (cards, buttons, modals) while text-shadow adds depth to typography. Both properties support multiple comma-separated shadows for complex layering effects.

### CSS box-shadow Syntax

box-shadow: horizontal vertical blur spread color;

- **Horizontal offset:** X-axis position (positive = right, negative = left)
- **Vertical offset:** Y-axis position (positive = down, negative = up)
- **Blur radius:** Softness of the shadow (0 = sharp edges, higher = softer)
- **Spread radius:** Expands/contracts shadow before blur (positive = expand, negative = contract)
- **Color:** Shadow color with opacity (rgba, hsla, hex with alpha)

Example: box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

### Shadow Design Principles

**Elevation Metaphor:** Shadows create the illusion of depth. Higher elements (modals, dropdowns) have larger, softer shadows. Lower elements (buttons at rest) have small, sharper shadows. Material Design uses 24 elevation levels defined by shadow intensity.

**Light Source Consistency:** Shadows should assume a consistent light source across the interface, typically from above (positive vertical offset). Inconsistent shadow directions create visual confusion and break immersion.

**Subtle is Better:** Real-world shadows are rarely pure black. Use dark gray or colored shadows with low opacity (10-30% alpha). Overly dark or saturated shadows look artificial and reduce readability.

**Layered Shadows:** Combine multiple shadows for realistic depth. Material Design uses 2-3 layered shadows: a sharp shadow close to the element (ambient shadow) and a larger, softer shadow further away (penumbra). Layering creates more realistic light simulation.

### Why Developers Need Shadow Designers

Visual feedback for interaction states requires shadows. Buttons elevate on hover (larger shadow), press down on click (smaller shadow), and return to rest state. Shadows communicate interactivity without animation.

Card and component hierarchies use shadows to establish visual layers. Primary content cards have more pronounced shadows than secondary elements. Modals have the darkest shadows, sitting above all other content.

Focus states for accessibility require visible indicators. Custom shadow-based focus states (outline-style shadows) improve accessibility while matching design systems better than default browser outlines.

Neumorphism and glassmorphism design trends rely heavily on shadows. Neumorphism uses soft inset and outset shadows to create extruded/pressed effects. Glassmorphism combines backdrop blur with subtle shadows for frosted glass appearance.

### Common Shadow Use Cases

**Card Elevation:** Cards at rest have subtle shadows (0 2px 4px). Hovered cards elevate with larger shadows (0 8px 16px). Clicked cards have minimal shadow (0 1px 2px) appearing pressed.

**Dropdown Menus:** Floating menus need prominent shadows to appear above page content. Typical: 0 10px 20px rgba(0,0,0,0.15).

**Modal Overlays:** Modals use large, soft shadows to establish highest elevation: 0 20px 60px rgba(0,0,0,0.3).

**Button States:** Rest (0 2px 4px), hover (0 4px 8px), active/pressed (0 1px 2px), focus (0 0 0 3px rgba(color, 0.5) outline-style).

**Text Depth:** text-shadow adds depth to headings: 2px 2px 4px rgba(0,0,0,0.3). Use sparingly - shadows reduce text readability.

### Shadow Performance

Box-shadow is GPU-accelerated in modern browsers for smooth rendering. However, very large blur radii (>50px) or many layered shadows (4+) can cause performance issues on lower-end devices.

Shadow animations (transitioning box-shadow values) are expensive. Use transform and opacity animations instead, or animate the shadow via a pseudo-element with opacity changes.

For complex shadow effects, consider using images or SVG filters as alternatives on static elements. For interactive elements requiring dynamic shadows, stick with CSS for responsive behavior.

### Browser Compatibility

box-shadow works in all modern browsers: Chrome, Firefox, Safari, Edge. No vendor prefixes needed since 2012. IE9+ has full support.

For IE8 and below (if still required), use filter: progid:DXImageTransform.Microsoft.Shadow(...) or provide a solid border fallback.

Multiple shadows (comma-separated values) work in all modern browsers. Ensure fallback shadow works independently if later shadows fail to render.`,
  },

  useCases: [
    {
      title: "Material Design Elevation System",
      description: "Implement Material Design's 24-level elevation system using layered box-shadows. Different elevation levels communicate component hierarchy and interactivity. Essential for Material-UI, Angular Material, or custom implementations.",
      example: `/* Material Design elevation levels */
/* Level 1: App bar, card at rest */
.elevation-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12),
              0 1px 2px rgba(0,0,0,0.24);
}

/* Level 2: Raised button, FAB rest */
.elevation-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16),
              0 3px 6px rgba(0,0,0,0.23);
}

/* Level 4: Menu, dropdown */
.elevation-4 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19),
              0 6px 6px rgba(0,0,0,0.23);
}

/* Level 8: Dialog, picker */
.elevation-8 {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
              0 10px 10px rgba(0,0,0,0.22);
}

/* Level 16: Navigation drawer */
.elevation-16 {
  box-shadow: 0 19px 38px rgba(0,0,0,0.30),
              0 15px 12px rgba(0,0,0,0.22);
}

/* Level 24: Modal, snackbar */
.elevation-24 {
  box-shadow: 0 24px 48px rgba(0,0,0,0.35),
              0 20px 15px rgba(0,0,0,0.22);
}

/* Button states with elevation transitions */
.button {
  box-shadow: 0 2px 4px rgba(0,0,0,0.18);
  transition: box-shadow 0.3s ease;
}

.button:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.25);
}

.button:active {
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

/* React/Tailwind implementation */
const elevationClasses = {
  1: 'shadow-md',
  2: 'shadow-lg',
  4: 'shadow-xl',
  8: 'shadow-2xl',
};

// Custom Tailwind config
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      }
    }
  }
}`
    },
    {
      title: "Interactive Card and Button States",
      description: "Create depth perception for interactive elements using shadow transitions. Buttons and cards elevate on hover, press down on click, and return to rest state. Shadows provide tactile feedback without complex animations.",
      example: `/* Card with hover elevation */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.card:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.12);
}

/* Button with pressed state */
.button-3d {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(102,126,234,0.3),
              0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.2s;
}

.button-3d:hover {
  box-shadow: 0 6px 12px rgba(102,126,234,0.4),
              0 2px 4px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.button-3d:active {
  box-shadow: 0 2px 4px rgba(102,126,234,0.2),
              0 1px 2px rgba(0,0,0,0.06);
  transform: translateY(0);
}

/* Neumorphic button (soft UI) */
.button-neomorphic {
  background: #e0e5ec;
  border: none;
  padding: 16px 32px;
  border-radius: 16px;
  box-shadow:
    9px 9px 16px rgba(163,177,198,0.6),
    -9px -9px 16px rgba(255,255,255,0.5);
  transition: box-shadow 0.3s;
}

.button-neomorphic:active {
  box-shadow:
    inset 9px 9px 16px rgba(163,177,198,0.6),
    inset -9px -9px 16px rgba(255,255,255,0.5);
}

/* Focus state for accessibility */
.button:focus-visible {
  outline: none;
  box-shadow:
    0 4px 6px rgba(0,0,0,0.1),
    0 0 0 3px rgba(102,126,234,0.5);
}`
    },
    {
      title: "Modal and Overlay Depth",
      description: "Create visual hierarchy for modals, dialogs, and popovers with prominent shadows. Overlays need strong shadows to establish they're above page content. Combine with backdrop blur for glassmorphism effects.",
      example: `/* Modal with backdrop and strong shadow */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
}

.modal {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  margin: 10vh auto;
  box-shadow:
    0 25px 50px rgba(0,0,0,0.25),
    0 10px 25px rgba(0,0,0,0.15);
  z-index: 1001;
}

/* Dropdown menu */
.dropdown {
  position: absolute;
  background: white;
  border-radius: 8px;
  padding: 8px 0;
  min-width: 200px;
  box-shadow:
    0 10px 20px rgba(0,0,0,0.15),
    0 3px 6px rgba(0,0,0,0.1);
  z-index: 100;
}

/* Popover/tooltip */
.popover {
  position: absolute;
  background: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow:
    0 4px 8px rgba(0,0,0,0.2),
    0 2px 4px rgba(0,0,0,0.1);
  z-index: 50;
}

/* Glassmorphism panel */
.glass-panel {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 8px 32px rgba(0,0,0,0.1),
    inset 0 1px 1px rgba(255,255,255,0.3);
}

/* Notification toast */
.toast {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow:
    0 10px 15px rgba(0,0,0,0.1),
    0 4px 6px rgba(0,0,0,0.05);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  to {
    transform: translateX(0);
    box-shadow: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
  }
}`
    },
    {
      title: "Custom Focus States for Accessibility",
      description: "Design accessible focus indicators using box-shadow instead of default browser outlines. Shadow-based focus states match design systems while maintaining WCAG accessibility compliance for keyboard navigation.",
      example: `/* Custom focus indicator (outline-style shadow) */
.button:focus-visible {
  outline: none; /* Remove default outline */
  box-shadow:
    0 0 0 3px rgba(102,126,234,0.5); /* Focus ring */
}

/* Input focus state */
.input {
  border: 2px solid #e5e7eb;
  padding: 10px;
  border-radius: 6px;
  box-shadow: none;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow:
    0 0 0 3px rgba(102,126,234,0.1),
    0 1px 3px rgba(0,0,0,0.1);
}

/* Error state */
.input-error:focus {
  border-color: #ef4444;
  box-shadow:
    0 0 0 3px rgba(239,68,68,0.1),
    0 1px 3px rgba(0,0,0,0.1);
}

/* Success state */
.input-success:focus {
  border-color: #10b981;
  box-shadow:
    0 0 0 3px rgba(16,185,129,0.1),
    0 1px 3px rgba(0,0,0,0.1);
}

/* Link focus (inline element) */
a:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px white,
    0 0 0 4px #667eea;
  border-radius: 2px;
}

/* Checkbox custom focus */
.checkbox:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px white,
    0 0 0 4px rgba(102,126,234,0.5);
}

/* Tailwind custom focus utilities */
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'focus-primary': '0 0 0 3px rgba(102,126,234,0.5)',
        'focus-error': '0 0 0 3px rgba(239,68,68,0.5)',
        'focus-success': '0 0 0 3px rgba(16,185,129,0.5)',
      }
    }
  }
}

// Usage
<button className="focus:shadow-focus-primary focus:outline-none">
  Accessible Button
</button>`
    }
  ],

  howToUse: {
    title: "How to Use This Shadow Designer",
    content: `This shadow designer provides visual controls for creating box-shadow CSS with real-time preview. Adjust shadow position, blur, spread, color, and opacity visually, then copy production-ready CSS code.

### Adjusting Shadow Position

**Horizontal Offset:** Drag the slider or enter a value to move the shadow left (negative) or right (positive). 0 centers the shadow horizontally. Common values: -5px to 5px for subtle depth, -20px to 20px for dramatic effects.

**Vertical Offset:** Controls vertical position. Positive values move shadow down (element appears raised), negative moves up (element appears floating above). Most UI shadows use positive vertical offset (0-20px) simulating overhead lighting.

For centered shadows (appearing all around the element), set both horizontal and vertical offset to 0. This creates a glow effect when combined with blur.

### Configuring Blur and Spread

**Blur Radius:** Controls shadow softness. 0 = sharp edge (solid shadow), higher = softer, more diffused. Common values: 4-12px for subtle shadows, 20-40px for dramatic depth. Very high blur (50px+) can impact performance.

**Spread Radius:** Expands (positive) or contracts (negative) the shadow before blur is applied. Positive spread makes shadow larger than element, negative makes it smaller. Use spread to control shadow intensity without changing blur. Common values: -5px to 10px.

Blur and spread work together: high blur + negative spread creates soft, close shadows. Low blur + positive spread creates sharp, pronounced shadows.

### Selecting Color and Opacity

Click the color picker to choose shadow color. Black (default) creates realistic shadows. Colored shadows create stylized, brand-specific effects.

Opacity (alpha channel) controls shadow intensity. 10-30% alpha creates subtle, realistic shadows. 50-80% creates dramatic, pronounced shadows. 100% solid shadows look artificial - always use some transparency.

For realistic depth, use dark gray (#1a1a1a) at 20% opacity instead of pure black. For brand-specific shadows, use your primary color at 10-15% opacity.

### Adding Multiple Shadow Layers

Click "Add Layer" to create layered shadows. Material Design uses 2-3 layers for realistic depth:

**Layer 1 (Ambient):** Small blur, close to element. Represents ambient light scattering. Example: 0 2px 4px rgba(0,0,0,0.1)

**Layer 2 (Penumbra):** Large blur, further from element. Represents shadow blur from distance. Example: 0 8px 16px rgba(0,0,0,0.15)

Layer shadows by decreasing opacity and increasing blur for each layer. This simulates how real shadows transition from dark (close) to light (far).

### Inset Shadows

Toggle "Inset" to create internal shadows that appear pressed or recessed. Inset shadows render inside the element boundary, creating depth inward.

Use inset shadows for:
- Pressed button states
- Input fields (subtle inset gives depth)
- Neumorphic designs (combine outset and inset)
- Container grooves or wells

Combine regular and inset shadows for complex effects: outset shadow for depth, inset shadow for texture.

### Preview Modes

Toggle preview modes to see shadows in different contexts:
- **Box:** Shadow on centered square (default)
- **Card:** Shadow on card component with padding
- **Button:** Shadow on button element
- **Text:** Text shadow preview (if using text-shadow generator)

Background color toggle shows shadow on light vs dark backgrounds. Some shadows look different depending on background.

### Copying CSS Code

Click "Copy CSS" to copy box-shadow declaration to clipboard. The generated code includes:
- Complete box-shadow property
- All layer shadows comma-separated
- RGBA color format with opacity
- Comments if multiple layers

For Tailwind, click "Copy Tailwind" to get utility class or config extension syntax.

### Presets and Common Patterns

Click "Presets" for common shadow patterns:
- **Soft:** Subtle depth for cards (0 2px 8px rgba(0,0,0,0.1))
- **Medium:** Standard elevation (0 4px 12px rgba(0,0,0,0.15))
- **Hard:** Prominent depth for modals (0 10px 30px rgba(0,0,0,0.25))
- **Neumorphic:** Soft UI shadows (outset + inset combination)
- **Glow:** Colored glow effect (0 0 20px rgba(color, 0.5))

Presets provide starting points for customization.

### Performance Tips

Very large blur radii (>50px) can cause rendering performance issues. Test on lower-end devices.

Animating box-shadow directly (transition: box-shadow) is expensive. Prefer:
- Animate opacity of a pseudo-element with shadow
- Use transform: scale() to simulate shadow growth
- Pre-render different shadow states and crossfade with opacity

For static shadows on many elements, performance is excellent. For shadows on hundreds of animated elements, consider simplifying.`,
    steps: [
      {
        name: "Set Position",
        text: "Adjust horizontal and vertical offset sliders to position the shadow. Positive vertical creates raised effect, centered creates glow."
      },
      {
        name: "Configure Blur/Spread",
        text: "Set blur radius for softness (4-12px typical) and spread radius to expand/contract shadow size before blur."
      },
      {
        name: "Choose Color/Opacity",
        text: "Select shadow color and opacity. Black at 10-30% opacity creates realistic depth. Preview updates in real-time."
      },
      {
        name: "Copy CSS",
        text: "Click Copy to get box-shadow CSS. Add multiple layers with 'Add Layer' for complex Material Design-style depth."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between blur and spread in box-shadow?",
      answer: "Blur controls shadow softness - 0 is sharp, higher is softer. Spread expands or contracts the shadow size before blur is applied. Example: blur 10px creates soft edge, spread 5px makes shadow larger. Spread affects shadow size, blur affects edge softness. Combine: high blur + negative spread creates soft, close shadows. Low blur + positive spread creates sharp, extended shadows."
    },
    {
      question: "How do I create neumorphic (soft UI) shadows?",
      answer: "Neumorphism uses layered outset and inset shadows with subtle colors. For light neumorphic: box-shadow: 9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5); For pressed state, use inset shadows. Background must match shadow colors for the effect to work - typically light gray backgrounds. Use this tool's 'Add Layer' feature and toggle 'Inset' for individual layers."
    },
    {
      question: "Why do my shadows look too dark or artificial?",
      answer: "Overly dark shadows (rgba(0,0,0,0.5+)) look unnatural. Real shadows are rarely pure black. Use dark gray (#1a1a1a) at 20-30% opacity instead. Also, shadows need blur - 0 blur creates solid shapes, not realistic shadows. Aim for blur radius of 4-20px. Layered shadows (2-3 layers) look more realistic than single shadows. Material Design's approach: small blur close + large blur far = realistic depth."
    },
    {
      question: "How do I create a glow effect instead of a shadow?",
      answer: "Set horizontal and vertical offset to 0 (centers the shadow), then use high blur (20-50px) with colored shadow. For blue glow: box-shadow: 0 0 30px rgba(102,126,234,0.6). Increase blur for diffused glow, increase opacity for brighter glow. Use on dark backgrounds for best visibility. For neon glow, layer multiple glows: inner bright + outer softer."
    },
    {
      question: "What are inset shadows used for?",
      answer: "Inset shadows render inside the element, creating pressed or recessed appearance. Use for: pressed button states (appears pushed into page), input fields (subtle depth), neumorphic pressed effects, container wells/grooves. Example: box-shadow: inset 0 2px 4px rgba(0,0,0,0.1). Combine regular and inset: outset for elevation + inset for texture. Don't confuse with drop shadows (outset, default)."
    },
    {
      question: "How many shadow layers should I use?",
      answer: "2-3 layers cover most needs. Material Design uses 2: ambient (small blur, close) + penumbra (large blur, far). More layers create complex effects but increase CSS size and rendering cost. For simple depth, 1 layer suffices. For realistic Material elevation, use 2. For artistic effects, 3-4 max. Beyond 4 layers, diminishing returns - simplify or use images/SVG instead."
    },
    {
      question: "Can I animate box-shadow transitions?",
      answer: "Yes, with transition: box-shadow 0.3s ease. But box-shadow transitions are expensive (triggers repaint). For better performance: animate opacity of pseudo-element with shadow, or use transform to simulate shadow change. Example: create ::before with larger shadow, default opacity 0, on hover transition opacity to 1. This avoids recalculating shadow on every frame."
    },
    {
      question: "How do I make shadows match Material Design elevation?",
      answer: "Material Design defines 24 elevation levels using layered shadows. This tool's presets include common levels. Generally: elevation 1 (0 1px 3px + 0 1px 2px), elevation 4 (0 10px 20px + 0 6px 6px), elevation 8 (0 14px 28px + 0 10px 10px). Each level uses 2 shadows: sharp close shadow + soft far shadow. Google's Material guidelines specify exact values for each level."
    },
    {
      question: "Is my shadow design data private when using this tool?",
      answer: "Absolutely. All shadow generation happens client-side in your browser. Your shadow values, colors, and CSS never leave your device. No server uploads, no tracking. Safe for proprietary designs or client work. The tool works offline after initial load."
    },
    {
      question: "Can I use shadows on text instead of boxes?",
      answer: "Yes, but use text-shadow property, not box-shadow. Syntax similar but simpler: text-shadow: horizontal vertical blur color (no spread). Example: text-shadow: 2px 2px 4px rgba(0,0,0,0.3). Use sparingly - shadows reduce text readability. Good for headings, bad for body text. This tool focuses on box-shadow; for text-shadow, adjust the same principles (position, blur, color) but omit spread."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your shadow design data never leaves your browser. This designer operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All shadow generation and CSS code creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your shadows. The tool works completely offline after first load.
- **No Data Storage:** Your shadow values are not saved on our servers. Browser localStorage used only for local presets if you save them.
- **No Analytics Tracking:** We don't track which shadows you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your design data.

This makes the tool safe for creating shadows with proprietary designs, client-specific styles, or confidential design systems. Use with confidence for commercial projects.`
  },

  stats: {
    "Shadow Layers": "Unlimited",
    "Browser Support": "99%+",
    "Inset Support": "Yes",
    "Export Formats": "CSS/Tailwind",
    "Server Uploads": "0"
  }
};
