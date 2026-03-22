/**
 * Border Radius Generator Tool Guide Content
 * Comprehensive developer guide for CSS border-radius creation
 */

import type { ToolGuideContent } from "./types";

export const radiusGenGuideContent: ToolGuideContent = {
  toolName: "Border Radius Generator",
  toolPath: "/radius-gen",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Choose Radius Mode",
      description: "Select uniform (all corners same), individual (control each corner separately), or custom (horizontal and vertical radius per corner). Uniform mode is fastest for simple rounded corners."
    },
    {
      title: "Adjust Corner Values",
      description: "Drag sliders or enter pixel/percentage values for each corner. Preview updates in real-time showing exact corner curvature. Use pixels for fixed shapes, percentages for responsive designs."
    },
    {
      title: "Create Custom Shapes",
      description: "Combine different corner radii to create pills, teardrops, organic shapes, or asymmetric designs. Experiment with extreme values (0-100%) for unique effects."
    },
    {
      title: "Copy border-radius CSS",
      description: "Click copy to get production-ready CSS code. Includes longhand (border-top-left-radius) and shorthand (border-radius) syntax options for integration flexibility."
    }
  ],

  introduction: {
    title: "What is a Border Radius Generator?",
    content: `A border radius generator is a visual tool that creates CSS border-radius properties for rounding element corners. Border radius transforms sharp rectangular boxes into rounded rectangles, circles, pills, or organic shapes essential for modern UI design. The border-radius property controls corner curvature, with support for individual corner control and elliptical (non-circular) curves.

CSS border-radius is one of the most commonly used properties in web design, appearing on buttons, cards, images, inputs, modals, and nearly every UI component. Rounded corners create friendlier, more approachable interfaces compared to sharp rectangles. The property supports simple uniform rounding, per-corner customization, and advanced elliptical curves for organic shapes.

### CSS border-radius Syntax

**Uniform radius:** border-radius: 8px; (all corners 8px)

**Individual corners (clockwise from top-left):** border-radius: 10px 20px 30px 40px;

**Per-corner properties:** border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius

**Elliptical radius:** border-radius: 20px / 10px; (horizontal radius / vertical radius)

**Complex example:** border-radius: 50% 50% 0 0; (top half circle, bottom square - creates arch shape)

### Border Radius Design Principles

**Consistency:** Use consistent radius values across similar components. If buttons use 8px, cards should use 8px or harmonious values (4px, 12px, 16px). Inconsistent radii create visual chaos.

**Hierarchy:** Larger components can have larger radii. Small buttons: 4-6px. Cards: 8-12px. Modals: 16-24px. Scale radius with component size for proportional appearance.

**Extremes for Effect:** 0px = sharp corners (formal, technical). 50% = perfect circles (pills, avatars). 100% = creates ellipses. Extreme values create distinctive brand identities.

**Responsiveness:** Percentage-based radius (e.g., 5%) scales with element size. Pixel-based (8px) stays constant. Use percentages for fluid designs, pixels for precise control.

### Why Developers Need Border Radius Generators

Visual feedback speeds up design iteration. Typing random values and refreshing to see results is slow. Generators provide real-time previews, making it easy to find the perfect curvature quickly.

Complex shapes require precise calculations. Creating a teardrop shape or organic blob requires specific combinations of corner radii that are difficult to predict manually. Generators let you experiment visually until achieving the desired effect.

Cross-browser testing ensures radius renders consistently. Older browsers had vendor prefix requirements (-webkit-border-radius, -moz-border-radius). Modern generators include fallbacks when needed for maximum compatibility.

Design system integration requires extracting exact radius values from designs. Designers create rounded components in Figma/Sketch, developers recreate them in CSS. Generators bridge this gap, ensuring design fidelity.

### Common Border Radius Use Cases

**Buttons:** Subtle rounding (6-8px) creates modern, approachable buttons. Pill buttons (border-radius: 999px or 50%) create capsule shapes.

**Cards:** Medium rounding (12-16px) softens card edges without becoming too playful. Larger radii (24px+) create friendly, consumer-facing designs.

**Images and Avatars:** 50% radius on squares creates perfect circles for profile photos. Slightly less (40-45%) creates rounded squares popular in app icons.

**Inputs:** Subtle radius (4-6px) makes form inputs less mechanical. Match input radius to button radius for visual harmony.

**Modals and Overlays:** Larger radius (16-24px) establishes modals as distinct floating elements above page content.

**Asymmetric Shapes:** Different radii per corner create unique shapes - teardrops (one sharp corner), arrows, speech bubbles, organic blobs.

### Units: Pixels vs Percentages

**Pixels (px):** Fixed radius regardless of element size. Consistent across all instances. Use when exact curvature is critical or when element size is fixed.

Example: 12px radius on all buttons creates consistent rounding.

**Percentages (%):** Radius scales with element dimensions. 50% creates perfect circles/ellipses. Use for fluid designs or when elements resize responsively.

Example: 5% radius creates proportional rounding that adapts as containers grow/shrink.

**Em/Rem:** Radius scales with font size or root font size. Less common than px/% but useful for typographic scaling. 1rem radius scales with root font (usually 16px = 16px radius).

### Elliptical Border Radius

Standard border-radius creates circular arcs. Elliptical syntax (horizontal / vertical) creates non-circular curves.

Example: border-radius: 50px / 25px; creates horizontally-stretched rounded corners (50px wide, 25px tall).

Use cases: Organic shapes, pill buttons on narrow containers, custom logo shapes, decorative elements.

Full elliptical: border-radius: 100px / 50px; on a 200x100px element creates a perfect ellipse.

### Browser Compatibility

border-radius works in all modern browsers without prefixes: Chrome, Firefox, Safari, Edge. IE9+ has full support.

For IE8 and below (legacy), use behavior polyfills or accept sharp corners. Progressive enhancement: modern browsers get rounded corners, old browsers get functional rectangular boxes.

Percentage-based radius works in all modern browsers. Some very old mobile browsers (Android 2.x) had quirks with percentages - test on target devices if supporting ancient versions.`,
  },

  useCases: [
    {
      title: "Button and Input Styling",
      description: "Create modern, accessible buttons and form inputs with rounded corners. Consistent radius values establish visual harmony across interactive elements. Essential for component libraries and design systems.",
      example: `/* Button variants with consistent radius */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px; /* Standard button radius */
  cursor: pointer;
  transition: all 0.2s;
}

/* Pill button (fully rounded) */
.button-pill {
  padding: 10px 24px;
  border-radius: 999px; /* Large value creates pill shape */
  /* Alternative: border-radius: 50%; also creates pill */
}

/* Rounded square button (icon button) */
.button-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Circle button */
.button-circle {
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%; /* Perfect circle */
}

/* Input field styling */
.input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px; /* Matches button radius */
  font-size: 16px;
}

/* Input group (button attached to input) */
.input-group input {
  border-radius: 8px 0 0 8px; /* Round left, square right */
}

.input-group button {
  border-radius: 0 8px 8px 0; /* Square left, round right */
}

/* Tailwind examples */
<button className="rounded-lg px-6 py-3">
  Standard Button (rounded-lg = 8px)
</button>

<button className="rounded-full px-8 py-3">
  Pill Button (rounded-full = 50%)
</button>

<input className="rounded-lg px-4 py-3 border-2" />

/* Design system tokens */
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

.button { border-radius: var(--radius-md); }
.card { border-radius: var(--radius-lg); }`
    },
    {
      title: "Card Components and Containers",
      description: "Design cards, panels, and container elements with appropriate rounding. Larger containers support larger radii. Nested elements can have smaller radii for visual hierarchy.",
      example: `/* Standard card */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Large feature card */
.card-feature {
  border-radius: 24px;
  padding: 48px;
}

/* Compact card */
.card-compact {
  border-radius: 8px;
  padding: 16px;
}

/* Card with image (rounded corners match) */
.card-image img {
  border-radius: 12px 12px 0 0; /* Round top, square bottom */
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-image .card-content {
  padding: 16px;
}

/* Nested elements with smaller radius */
.card {
  border-radius: 16px;
}

.card .code-block {
  border-radius: 8px; /* Half of parent for hierarchy */
  background: #f3f4f6;
  padding: 16px;
}

/* Pricing card */
.pricing-card {
  border-radius: 20px;
  overflow: hidden; /* Ensures child elements respect parent radius */
}

.pricing-card-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 32px;
  border-radius: 20px 20px 0 0;
}

/* Modal with large radius */
.modal {
  background: white;
  border-radius: 24px;
  padding: 32px;
  max-width: 600px;
}

/* Panel with asymmetric radius (design accent) */
.panel-accent {
  border-radius: 0 24px 24px 0; /* Square left, rounded right */
  border-left: 4px solid #667eea;
}

/* React card component */
const Card = ({ children, size = 'md' }) => {
  const radiusClass = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl'
  }[size];

  return (
    <div className={\`bg-white shadow-md p-6 \${radiusClass}\`}>
      {children}
    </div>
  );
};`
    },
    {
      title: "Image Avatars and Media",
      description: "Create circular avatars, rounded profile pictures, or custom image shapes. Border radius on images creates visual interest and brand identity. Essential for user profiles and media galleries.",
      example: `/* Circular avatar */
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

/* Larger avatar with border */
.avatar-lg {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* Rounded square (app icon style) */
.avatar-rounded {
  width: 64px;
  height: 64px;
  border-radius: 16px; /* 25% of size = 16px/64px */
  object-fit: cover;
}

/* Squircle (iOS-style rounded square) */
.avatar-squircle {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  /* True squircle requires SVG clip-path for exact iOS appearance */
}

/* Gallery image with subtle rounding */
.gallery-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

/* Hero image with asymmetric radius */
.hero-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 0 0 48px 48px; /* Bottom corners rounded */
}

/* Avatar group (overlapping avatars) */
.avatar-group {
  display: flex;
}

.avatar-group img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -12px;
}

.avatar-group img:first-child {
  margin-left: 0;
}

/* Responsive avatar sizes */
@media (max-width: 768px) {
  .avatar-lg {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
}

/* React avatar component */
const Avatar = ({ src, size = 48, shape = 'circle' }) => {
  const borderRadius = {
    circle: '50%',
    rounded: \`\${size * 0.25}px\`,
    square: '0'
  }[shape];

  return (
    <img
      src={src}
      width={size}
      height={size}
      style=\{\{ borderRadius, objectFit: 'cover' \}\}
      className="border-2 border-white shadow"
    />
  );
};`
    },
    {
      title: "Custom Shapes and Organic Forms",
      description: "Create unique shapes by combining different corner radii - teardrops, speech bubbles, organic blobs, or brand-specific forms. Asymmetric radius values enable distinctive visual identities.",
      example: `/* Teardrop shape (3 rounded, 1 sharp corner) */
.teardrop {
  width: 100px;
  height: 100px;
  background: #667eea;
  border-radius: 50% 50% 50% 0; /* Top-left sharp, others rounded */
  transform: rotate(-45deg); /* Orient point downward */
}

/* Speech bubble */
.speech-bubble {
  position: relative;
  background: #f3f4f6;
  padding: 16px;
  border-radius: 16px;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 24px;
  width: 20px;
  height: 20px;
  background: #f3f4f6;
  transform: rotate(45deg);
  border-radius: 0 0 0 4px;
}

/* Organic blob (random corner variations) */
.blob {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
}

/* Arch shape (half circle top) */
.arch {
  width: 150px;
  height: 100px;
  background: #10b981;
  border-radius: 50% 50% 0 0; /* Top rounded, bottom square */
}

/* Ticket shape (notches) */
.ticket {
  width: 300px;
  height: 100px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  position: relative;
}

.ticket::before,
.ticket::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  top: 50%;
  transform: translateY(-50%);
}

.ticket::before { left: -11px; }
.ticket::after { right: -11px; }

/* Leaf shape */
.leaf {
  width: 100px;
  height: 100px;
  background: #10b981;
  border-radius: 0 100% 0 100%; /* Opposite corners rounded */
  transform: rotate(45deg);
}

/* Pill with cut corner (brand accent) */
.pill-cut {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border-radius: 24px 24px 24px 4px; /* One corner sharp */
}

/* React custom shape component */
const CustomShape = ({ type }) => {
  const shapes = {
    teardrop: '50% 50% 50% 0',
    arch: '50% 50% 0 0',
    leaf: '0 100% 0 100%',
    blob: '60% 40% 30% 70% / 60% 30% 70% 40%'
  };

  return (
    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600"
         style={{ borderRadius: shapes[type] }}>
    </div>
  );
};`
    }
  ],

  howToUse: {
    title: "How to Use This Border Radius Generator",
    content: `This border radius generator provides visual controls for creating custom rounded corners with real-time preview. Adjust individual corners or all at once, experiment with shapes, then copy production-ready CSS.

### Uniform Radius Mode

Click "Uniform" to control all four corners with a single slider. This mode is fastest for standard rounded rectangles. Drag the slider or enter a value (px or %) to apply the same radius to all corners simultaneously.

Common uniform values:
- 4px: Subtle rounding for small elements (badges, tags)
- 8px: Standard buttons and inputs
- 12px: Medium cards and containers
- 16-24px: Large modals and feature cards
- 50%: Perfect circles (for square elements) or pills (for rectangles)

Uniform mode generates compact CSS: border-radius: 12px;

### Individual Corners Mode

Click "Individual" to control each corner separately. Four sliders appear: top-left, top-right, bottom-right, bottom-left (clockwise from top-left).

Drag each slider independently to create asymmetric shapes. For example, round only top corners (top-left: 12px, top-right: 12px, bottom corners: 0px) for card headers or modals.

Individual mode generates: border-radius: 12px 12px 0 0; (shorthand) or separate properties: border-top-left-radius: 12px; etc.

### Elliptical Radius Mode (Advanced)

Click "Elliptical" to access horizontal/vertical radius controls for each corner. Each corner gets two sliders: horizontal radius and vertical radius, creating non-circular curves.

Elliptical radius creates organic, stretched shapes. For example, horizontal 50px, vertical 25px creates a horizontally-stretched rounded corner.

Use cases: Organic blobs, pill buttons on narrow containers, custom brand shapes, decorative elements.

Elliptical mode generates: border-radius: 50px / 25px; (horizontal / vertical) or per-corner: border-top-left-radius: 30px 15px;

### Units: Pixels vs Percentages

Toggle between px (pixels) and % (percentage) units with the unit selector.

**Pixels:** Fixed radius regardless of element size. Consistent across all instances. Use when exact curvature matters or element size is fixed. Example: All buttons use 8px radius.

**Percentages:** Radius scales with element dimensions. 50% creates perfect circles on squares. Use for fluid, responsive designs. Example: 5% radius adapts as containers resize.

The preview shows both units' effects on different container sizes.

### Visual Preview

The preview pane shows your border radius on a sample element. Toggle preview options:
- **Box:** Simple rectangle (shows radius clearly)
- **Image:** How radius clips images
- **Button:** Button context
- **Card:** Card with content

Resize the preview container to see how percentage-based radius scales vs pixel-based fixed radius.

### Creating Custom Shapes

Experiment with extreme corner variations:
- **Teardrop:** Set 3 corners to 50%, one to 0%
- **Arch:** Top corners 50%, bottom corners 0%
- **Organic Blob:** Random values per corner (30%, 60%, 40%, 70%)
- **Pill:** Set radius to 999px or 50%

Use the "Randomize" button to generate random organic shapes for inspiration.

### Copying CSS Code

Click "Copy CSS" to copy border-radius declaration. Output options:

**Shorthand:** border-radius: 12px 8px 16px 4px; (compact, single line)

**Longhand:** Separate properties for each corner:
border-top-left-radius: 12px;
border-top-right-radius: 8px;
etc.

Choose shorthand for production (smaller CSS size), longhand for clarity or when only specific corners need override.

### Presets

Click "Presets" for common shapes:
- **None:** Sharp corners (0px)
- **Subtle:** 4px gentle rounding
- **Standard:** 8px modern rounding
- **Soft:** 16px friendly rounding
- **Pill:** Full rounding for capsule shape
- **Circle:** 50% for perfect circles

Presets provide starting points for customization.

### Keyboard Shortcuts

- **Arrow Keys:** Adjust selected slider by 1px
- **Shift+Arrow:** Adjust by 10px
- **Ctrl+C / Cmd+C:** Copy CSS
- **U:** Toggle px/% units
- **R:** Randomize corners
- **0-9:** Quick preset selection

### Responsive Radius

For responsive designs, consider:
- Use % for fluid radius that scales with element
- Use rem for radius that scales with font size
- Use px for fixed, precise radius

Test how your radius looks at different viewport sizes using the preview resize controls.`,
    steps: [
      {
        name: "Select Mode",
        text: "Choose uniform (all corners), individual (per-corner), or elliptical (horizontal/vertical per corner). Uniform is fastest for standard rounding."
      },
      {
        name: "Adjust Corners",
        text: "Drag sliders or enter values (px or %) for each corner. Preview updates in real-time. Use extreme values (0-100%) for unique shapes."
      },
      {
        name: "Choose Units",
        text: "Toggle between pixels (fixed) and percentages (responsive). Pixels for precise control, percentages for fluid designs."
      },
      {
        name: "Copy CSS",
        text: "Click Copy to get border-radius CSS. Choose shorthand (compact) or longhand (per-corner properties) format."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between pixels and percentage for border-radius?",
      answer: "Pixels (px) create fixed radius that stays constant regardless of element size. 12px radius is always 12px. Percentages (%) scale with element dimensions. 50% on a 100x100px square = 50px radius (perfect circle). On a 200x100px rectangle, 50% = ellipse (100px horizontal, 50px vertical). Use px for consistency, % for responsive circles/pills/organic shapes."
    },
    {
      question: "How do I create a perfect circle with border-radius?",
      answer: "Set border-radius: 50% on a square element (equal width and height). For example, width: 100px; height: 100px; border-radius: 50% creates a perfect circle. On rectangles, 50% creates an ellipse, not a circle. Alternatively, use border-radius: 999px (large fixed value) which creates circles on squares and pills on rectangles."
    },
    {
      question: "Can I have different horizontal and vertical radius for corners?",
      answer: "Yes, using elliptical border-radius syntax: border-radius: 20px / 10px; (20px horizontal, 10px vertical for all corners). For per-corner elliptical: border-top-left-radius: 30px 15px; (30px horizontal, 15px vertical on top-left only). This creates non-circular curves useful for organic shapes and stretched rounded corners. Use this tool's 'Elliptical' mode to configure visually."
    },
    {
      question: "Why isn't my border-radius showing on an image?",
      answer: "Image border-radius issues: 1) Image must have display: block or overflow: hidden on parent container. 2) If image has transparent areas, radius won't show without background color. 3) Parent container needs overflow: hidden if image exceeds bounds. Solution: Add display: block; border-radius: 12px; to the <img> element, or wrap in a div with overflow: hidden and apply radius to the div."
    },
    {
      question: "How do I round only the top or bottom corners?",
      answer: "Use shorthand with selective values: border-radius: 12px 12px 0 0; rounds top-left and top-right, leaves bottom corners square. Or use longhand: border-top-left-radius: 12px; border-top-right-radius: 12px;. Common for card headers (round top), input groups (round one side), modals (round top for mobile). Values order: top-left, top-right, bottom-right, bottom-left (clockwise)."
    },
    {
      question: "What's the maximum border-radius value?",
      answer: "No hard limit, but values above 50% or larger than element dimensions create ellipses, not tighter curves. For pills, 999px or 9999px ensures full rounding regardless of element size. 50% is max meaningful percentage (creates circle/ellipse). Values >50% behave same as 50%. For unique shapes, use different values per corner rather than extremely high uniform values."
    },
    {
      question: "Can I animate border-radius changes?",
      answer: "Yes, with transition: border-radius 0.3s ease;. Border-radius transitions are smooth and performant. Example: .button { border-radius: 8px; } .button:hover { border-radius: 20px; } animates rounding on hover. For morphing shapes, transition works but complex animations may have slight performance cost on low-end devices. Use transform for better performance when possible."
    },
    {
      question: "How do I create organic blob shapes?",
      answer: "Use extreme, varied corner values with elliptical syntax: border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; (horizontal % / vertical %). Animate with keyframes changing radius values for morphing effect. Or use this tool's Elliptical mode with Randomize button to generate organic shapes. For complex blobs, consider SVG as alternative. CSS blob limitation: can't create truly random organic shapes like in design tools."
    },
    {
      question: "Is my border-radius design data private?",
      answer: "Absolutely. All radius generation happens client-side in your browser. Your values and CSS never leave your device. No server uploads, no tracking. Safe for proprietary designs or client work. The tool works offline after initial load."
    },
    {
      question: "How do I match border-radius to my design from Figma/Sketch?",
      answer: "In Figma: Select element, check right panel for 'Corner radius' values. Figma shows individual corner radii when different. Copy exact px values into this tool. For percentage-based designs, calculate: (radius px / element dimension px) × 100 = radius %. This tool's preview helps verify visual match. Figma's 'Copy CSS' feature includes border-radius, but this tool offers more control and responsive options."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your border radius design data never leaves your browser. This generator operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All border-radius generation and CSS code creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your designs. The tool works completely offline after first load.
- **No Data Storage:** Your radius values are not saved on our servers. Browser localStorage used only for local presets if you save them.
- **No Analytics Tracking:** We don't track which radii you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your design data.

This makes the tool safe for creating radius values with proprietary designs, client-specific styles, or confidential design systems. Use with confidence for commercial projects.`
  },

  stats: {
    "Units Supported": "px/%/rem/em",
    "Browser Support": "99%+",
    "Corners": "4 independent",
    "Elliptical": "Yes",
    "Server Uploads": "0"
  }
};
