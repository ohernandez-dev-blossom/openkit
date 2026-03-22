/**
 * CSS Clip Path Generator Tool Guide Content
 * Comprehensive developer guide for CSS clip-path creation
 */

import type { ToolGuideContent } from "./types";

export const clipPathGuideContent: ToolGuideContent = {
  toolName: "CSS Clip Path Generator",
  toolPath: "/clip-path",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Clip Path Shape",
      description: "Choose from polygon, circle, ellipse, or inset shapes to define how your element should be clipped. Each shape offers different control points for creating unique visual effects."
    },
    {
      title: "Adjust Control Points",
      description: "Drag visual control points or input precise values to define the clip path shape. Real-time preview shows exactly how the clipping will appear on your elements."
    },
    {
      title: "Preview on Elements",
      description: "See your clip path applied to sample images or containers instantly. Test how the clipping affects different content types before implementing in production."
    },
    {
      title: "Copy CSS Clip-Path Code",
      description: "Click copy to get production-ready CSS clip-path property with complete browser compatibility prefixes. Ready for immediate integration into stylesheets."
    }
  ],

  introduction: {
    title: "What is a CSS Clip Path Generator?",
    content: `A CSS clip path generator is a visual tool that creates CSS clip-path properties for clipping elements into custom shapes. The clip-path property defines a visible region of an element - anything outside the clipping path is hidden. This enables creating circular images, diagonal sections, polygonal cards, and complex geometric shapes without image editing or SVG manipulation.

CSS clip-path is essential for modern UI design, enabling shapes beyond rectangles: circles for avatars, polygons for hero sections, inset shapes for creative containers. Visual generators eliminate manual coordinate calculation, providing instant preview and precise control over clipping geometry.

### Why Developers Need Clip Path Generators

Modern web design demands visual interest beyond rectangular boxes. Clip paths create diagonal edges on sections, circular product images, hexagonal cards, and custom shapes that guide user attention. Manual clip-path coordinate calculation is tedious and error-prone - visual tools accelerate design iteration.

Responsive design requires clip paths that scale across viewports. Percentage-based coordinates ensure clip paths maintain proportions on different screen sizes. Generators help visualize how paths respond to container resizing.

Complex polygons with multiple points (hexagons, stars, custom shapes) are impossible to create without visual feedback. Generators provide interactive point manipulation, making complex shapes accessible to all developers.

Component libraries benefit from reusable clip path utilities. Design systems document standard clip path shapes for consistent visual language across products. Generators facilitate creating and maintaining these shape standards.

### Clip Path Shape Types

**Polygon (polygon()):** Most versatile. Define any multi-point shape using coordinate pairs. Create triangles, trapezoids, hexagons, arrows, custom shapes. Example: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%) creates a diamond.

**Circle (circle()):** Defines circular clipping region. Specify radius and center position. Perfect for circular avatars, buttons, or content containers. Example: circle(50% at center) creates perfect circle.

**Ellipse (ellipse()):** Oval-shaped clipping with separate horizontal and vertical radii. Control width and height independently. Example: ellipse(50% 30% at center) creates wide, short oval.

**Inset (inset()):** Rectangular clipping with rounded corners optional. Define insets from each edge (top, right, bottom, left). Example: inset(10% 20% 30% 10% round 15px) creates inset rectangle with rounded corners.

**Path (path()):** Advanced SVG-style path syntax for complex curves and shapes. Less browser support than other shapes. Useful for intricate custom shapes.

### Common Clip Path Use Cases

**Circular Avatars:** clip-path: circle(50%) on square images creates perfect circular profile pictures without image editing. Faster than border-radius for pure circles.

**Diagonal Section Dividers:** Polygon clip paths create angled edges on hero sections or content blocks. Adds visual dynamism to otherwise flat layouts.

**Hexagonal Cards:** Six-point polygons create honeycomb grid layouts. Popular in portfolios and feature showcases for unique visual presentation.

**Arrow Shapes:** Polygon clip paths create directional arrows for navigation, call-to-action elements, or process diagrams without icon fonts.

**Creative Image Crops:** Non-rectangular image shapes draw attention and create visual hierarchy. Polygon crops provide artistic alternatives to standard rectangles.

**Revealing Animations:** Animating clip-path coordinates creates reveal effects, transitions between shapes, or morphing animations. Engaging visual effects without JavaScript.

### Browser Compatibility

clip-path has excellent modern browser support: Chrome 55+, Firefox 54+, Safari 9.1+, Edge 79+. Legacy Edge (pre-Chromium) requires -webkit- prefix. Internet Explorer 11 and below have no support - fallback to rectangular containers.

For maximum compatibility, include -webkit-clip-path in addition to clip-path. Graceful degradation: browsers without support show full rectangular element.

Percentage-based coordinates work consistently across browsers. Pixel values create fixed-size clip paths that don't scale responsively.

### Performance Considerations

clip-path is GPU-accelerated in modern browsers for smooth rendering. Even complex polygons perform well. More efficient than SVG masks for simple geometric shapes.

Animating clip-path can be expensive on low-power devices. For subtle transitions (button hover effects), performance is acceptable. For complex morphing animations, test on target devices.

Very complex paths with dozens of coordinate points may cause rendering slowdown. For most UI purposes (hexagons, diagonal edges, circles), performance is excellent.

### Clip Path vs Border Radius

**clip-path advantages:** Creates any shape (polygons, circles, custom paths). More versatile than border-radius. Enables diagonal edges and complex geometry.

**border-radius advantages:** Simpler syntax for rounded rectangles. Better performance for simple corner rounding. More widely understood and documented.

Use clip-path for non-rectangular shapes and complex clipping. Use border-radius for simple corner rounding on rectangles. They can be combined for rounded corners on clipped shapes.

### Accessibility and Clip Path

Clipped content may be visually hidden but remains in the DOM and accessible to screen readers. Ensure critical content isn't inadvertently hidden by aggressive clipping.

Sufficient color contrast must be maintained regardless of clip path shape. Ensure text readability within clipped containers.

Interactive elements (buttons, links) should have visible click targets within the clipped region. Test keyboard focus visibility on clipped elements.

### Integration with Design Systems

Document standard clip path shapes as design tokens or CSS custom properties. Example: --clip-hexagon, --clip-diagonal-right, --clip-circle for reusable shapes.

Create utility classes for common clip paths. Example: .clip-circle { clip-path: circle(50%); } for consistent application across components.

Responsive clip paths may need different coordinates at different breakpoints. Use CSS custom properties with media query overrides for viewport-specific clipping.`,
  },

  useCases: [
    {
      title: "Circular Avatar Images",
      description: "Create perfect circular profile images using circle clip-path. Faster and more reliable than border-radius for true circles. Essential for user profiles, team pages, and social interfaces.",
      example: `/* Perfect circular avatar with clip-path */
.avatar-circle {
  width: 100px;
  height: 100px;
  clip-path: circle(50% at center);
  -webkit-clip-path: circle(50% at center);
  object-fit: cover;
}

/* Circular avatar with border effect */
.avatar-bordered {
  width: 120px;
  height: 120px;
  padding: 5px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  clip-path: circle(50% at center);
}

.avatar-bordered img {
  width: 100%;
  height: 100%;
  clip-path: circle(50% at center);
  object-fit: cover;
}

/* Circular button */
.circle-button {
  width: 60px;
  height: 60px;
  clip-path: circle(50%);
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.circle-button:hover {
  transform: scale(1.1);
}

/* React avatar component */
const CircularAvatar = ({ src, alt, size = 80 }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: size,
      height: size,
      clipPath: 'circle(50% at center)',
      WebkitClipPath: 'circle(50% at center)',
      objectFit: 'cover'
    }}
  />
);

/* Tailwind CSS custom class */
@layer components {
  .clip-circle {
    clip-path: circle(50% at center);
    -webkit-clip-path: circle(50% at center);
  }
}

/* Usage */
<img src="/avatar.jpg" class="w-24 h-24 clip-circle object-cover" />

/* Circular image grid */
.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
}

.avatar-grid img {
  width: 100%;
  aspect-ratio: 1;
  clip-path: circle(50%);
  object-fit: cover;
  transition: clip-path 0.3s;
}

.avatar-grid img:hover {
  clip-path: circle(55%); /* subtle expansion */
}

/* Circular overlay on hover */
.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  clip-path: circle(50%);
  object-fit: cover;
}

.avatar-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  clip-path: circle(50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-container:hover::after {
  opacity: 1;
}`
    },
    {
      title: "Diagonal Hero Section Dividers",
      description: "Create dynamic diagonal edges on hero sections and content blocks using polygon clip-path. Adds visual interest to otherwise flat section transitions. Modern alternative to angled pseudo-elements.",
      example: `/* Diagonal bottom edge on hero section */
.hero-diagonal {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 100px 20px;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

/* Diagonal top edge */
.section-diagonal-top {
  background: #f8f9fa;
  padding: 80px 20px;
  clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
}

/* Double diagonal (top and bottom) */
.section-double-diagonal {
  background: white;
  padding: 80px 20px;
  clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* Steep diagonal for dramatic effect */
.hero-steep {
  background: #1a202c;
  color: white;
  padding: 120px 20px;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
}

/* Inverted diagonal */
.section-inverted {
  background: #667eea;
  padding: 100px 20px;
  clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%);
}

/* Responsive diagonal (less steep on mobile) */
.hero-responsive {
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  padding: 80px 20px;
  clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
}

@media (min-width: 768px) {
  .hero-responsive {
    padding: 120px 40px;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }
}

/* React diagonal section component */
const DiagonalSection = ({ children, angle = 'bottom', steepness = 85 }) => {
  const clipPaths = {
    bottom: \`polygon(0 0, 100% 0, 100% \${steepness}%, 0 100%)\`,
    top: \`polygon(0 \${100 - steepness}%, 100% 0, 100% 100%, 0 100%)\`,
    both: \`polygon(0 \${100 - steepness}%, 100% 0, 100% \${steepness}%, 0 100%)\`
  };

  return (
    <section
      style={{
        clipPath: clipPaths[angle],
        WebkitClipPath: clipPaths[angle],
        padding: '100px 20px'
      }}
    >
      {children}
    </section>
  );
};

/* CSS custom properties for dynamic diagonals */
.diagonal-section {
  --diagonal-angle: 85%;
  background: var(--section-bg);
  padding: var(--section-padding);
  clip-path: polygon(0 0, 100% 0, 100% var(--diagonal-angle), 0 100%);
}

/* Zigzag edges using multiple polygons */
.section-zigzag {
  background: #f9fafb;
  padding: 60px 20px;
  clip-path: polygon(
    0 10%, 10% 0, 20% 10%, 30% 0, 40% 10%, 50% 0,
    60% 10%, 70% 0, 80% 10%, 90% 0, 100% 10%,
    100% 100%, 0 100%
  );
}`
    },
    {
      title: "Hexagonal Card Layouts",
      description: "Create hexagonal cards and honeycomb grid layouts using six-point polygon clip-paths. Popular in portfolios, feature showcases, and team pages for unique geometric presentation.",
      example: `/* Perfect hexagon (horizontal orientation) */
.hexagon {
  width: 200px;
  height: 230px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Hexagon with content */
.hexagon-card {
  width: 250px;
  height: 280px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* Hexagon image */
.hexagon-image {
  width: 200px;
  height: 230px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  overflow: hidden;
}

.hexagon-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hexagon grid (honeycomb pattern) */
.hexagon-grid {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  gap: 20px;
  justify-content: center;
}

.hexagon-grid-item {
  width: 200px;
  height: 230px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: #f3f4f6;
  position: relative;
  transition: transform 0.3s;
}

.hexagon-grid-item:hover {
  transform: scale(1.05);
  z-index: 1;
}

/* Vertical hexagon */
.hexagon-vertical {
  width: 230px;
  height: 200px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

/* React hexagon component */
const Hexagon = ({ children, orientation = 'horizontal', size = 200 }) => {
  const clipPaths = {
    horizontal: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    vertical: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
  };

  const dimensions = orientation === 'horizontal'
    ? { width: size, height: size * 1.15 }
    : { width: size * 1.15, height: size };

  return (
    <div
      style={{
        ...dimensions,
        clipPath: clipPaths[orientation],
        WebkitClipPath: clipPaths[orientation]
      }}
    >
      {children}
    </div>
  );
};

/* Hexagon with border effect */
.hexagon-bordered {
  width: 200px;
  height: 230px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hexagon-bordered-inner {
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hexagon team member card */
.team-hexagon {
  width: 220px;
  height: 250px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.team-hexagon::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

.team-hexagon-info {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  color: white;
  text-align: center;
  z-index: 1;
}`
    },
    {
      title: "Custom Arrow and Chevron Shapes",
      description: "Create directional arrows, chevrons, and pointer shapes using polygon clip-paths. Perfect for navigation elements, process flows, breadcrumbs, and call-to-action buttons without icon dependencies.",
      example: `/* Right-pointing arrow */
.arrow-right {
  width: 150px;
  height: 60px;
  background: #667eea;
  clip-path: polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%, 15% 50%);
  -webkit-clip-path: polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%, 15% 50%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
}

/* Left-pointing arrow */
.arrow-left {
  width: 150px;
  height: 60px;
  background: #10b981;
  clip-path: polygon(0 50%, 25% 0, 100% 0, 85% 50%, 100% 100%, 25% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
}

/* Chevron right */
.chevron-right {
  width: 120px;
  height: 50px;
  background: #f59e0b;
  clip-path: polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%, 25% 50%);
}

/* Chevron button with hover */
.chevron-button {
  width: 140px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  clip-path: polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%, 20% 50%);
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron-button:hover {
  transform: translateX(5px);
}

/* Process flow arrows */
.process-step {
  width: 180px;
  height: 70px;
  background: #6366f1;
  clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 10% 50%);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 30px 0 20px;
  position: relative;
}

.process-step + .process-step {
  margin-left: -15px; /* overlap for connected flow */
}

/* Breadcrumb arrows */
.breadcrumb {
  display: flex;
  gap: 0;
}

.breadcrumb-item {
  height: 40px;
  padding: 0 30px 0 20px;
  background: #e5e7eb;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%);
  display: flex;
  align-items: center;
  margin-right: -10px;
}

.breadcrumb-item:first-child {
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%);
  padding-left: 16px;
}

.breadcrumb-item.active {
  background: #6366f1;
  color: white;
}

/* React arrow component */
const Arrow = ({ direction = 'right', children, onClick }) => {
  const clipPaths = {
    right: 'polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%, 15% 50%)',
    left: 'polygon(0 50%, 25% 0, 100% 0, 85% 50%, 100% 100%, 25% 100%)',
    up: 'polygon(50% 0, 100% 25%, 85% 100%, 15% 100%, 0 25%)',
    down: 'polygon(15% 0, 85% 0, 100% 75%, 50% 100%, 0 75%)'
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: '150px',
        height: '60px',
        clipPath: clipPaths[direction],
        WebkitClipPath: clipPaths[direction],
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
};

/* Tag/label with arrow */
.tag-arrow {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  background: #ef4444;
  color: white;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
  font-size: 14px;
  font-weight: 600;
}`
    }
  ],

  howToUse: {
    title: "How to Use This CSS Clip Path Generator",
    content: `This clip path generator provides visual controls for creating CSS clip-path properties with real-time preview. Choose shapes, adjust coordinates, and copy production-ready CSS code for immediate implementation.

### Selecting Clip Path Shapes

Choose from four primary shape types:

**Polygon:** Most versatile option for custom multi-point shapes. Click to add points, drag to position. Create triangles, hexagons, arrows, or any geometric shape. Coordinate format: polygon(x1 y1, x2 y2, x3 y3, ...).

**Circle:** Creates circular clipping regions. Adjust radius (percentage or pixels) and center position. Perfect for avatars and circular buttons. Format: circle(radius at x y).

**Ellipse:** Oval shapes with independent horizontal and vertical radii. Control width and height separately. Format: ellipse(rx ry at x y).

**Inset:** Rectangular clipping with optional rounded corners. Define insets from each edge. Format: inset(top right bottom left round border-radius).

Select the shape type that matches your design intent. Polygon for custom shapes, circle for perfect rounds, ellipse for ovals, inset for modified rectangles.

### Adjusting Control Points

**Polygon Mode:** Click on the canvas to add new points. Drag existing points to reposition. Right-click (or long-press on mobile) to delete points. Visual guidelines show coordinate percentages.

**Circle Mode:** Drag the radius handle to increase or decrease circle size. Drag the center point to reposition. Toggle between percentage and pixel units.

**Ellipse Mode:** Adjust horizontal and vertical radius independently using two handles. Position center point for off-center ellipses.

**Inset Mode:** Drag edge handles to set inset values from each side (top, right, bottom, left). Optionally add border-radius for rounded corners on the inset rectangle.

Use percentage values (0% to 100%) for responsive clip paths that scale with container size. Use pixel values for fixed-size clipping.

### Real-Time Preview

The preview area shows your clip path applied to a sample element. Toggle between image preview and solid color to see how clipping affects different content types.

Change background color behind the clipped element to test contrast and visibility. Resize the preview container to see how percentage-based clip paths scale responsively.

Preview updates instantly as you adjust control points or input values. Test hover states and transitions to ensure animations work smoothly.

### Copying CSS Code

Click "Copy CSS" to copy the clip-path property to clipboard. The generator provides:

**Standard CSS:** clip-path property with your coordinates.

**Vendor-Prefixed CSS:** Includes -webkit-clip-path for legacy browsers and Safari compatibility.

**Inline Style:** clip-path and WebkitClipPath for React inline styles or dynamic JavaScript usage.

Paste directly into your stylesheet, component, or design system. The code is production-ready with no modification needed.

### Advanced Features

**Coordinate Input:** Switch to manual coordinate mode to input precise values. Useful for pixel-perfect designs or mathematical precision.

**Preset Shapes:** Click preset buttons for common clip paths (circle, hexagon, triangle, diamond, pentagon). Modify presets as starting points for custom shapes.

**Grid Snapping:** Enable grid snapping to align points to grid intersections for cleaner coordinates and symmetrical shapes.

**Coordinate Units:** Toggle between percentage (responsive) and pixels (fixed). Percentage recommended for responsive designs.

### Responsive Considerations

Percentage-based clip paths maintain shape proportions across different container sizes. Test at multiple viewport widths to ensure visual consistency.

For viewport-specific clip paths, use CSS custom properties with media query overrides:

.element {
  --clip: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  clip-path: var(--clip);
}

@media (min-width: 768px) {
  .element {
    --clip: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  }
}

### Browser Compatibility

All generated clip-path CSS works in Chrome 55+, Firefox 54+, Safari 9.1+, Edge 79+. Include -webkit-clip-path prefix for maximum compatibility.

Test in target browsers, especially Safari which sometimes requires vendor prefix. Internet Explorer has no support - provide rectangular fallback for IE users.

### Accessibility Considerations

Ensure clipped content doesn't hide critical information. Screen readers access clipped content, but users may miss visual cues.

Maintain sufficient color contrast within clipped regions. Test text readability on clipped backgrounds.

Interactive elements should have visible click targets within the clipped area. Test keyboard focus visibility on clipped buttons or links.`,
    steps: [
      {
        name: "Select Shape Type",
        text: "Choose polygon, circle, ellipse, or inset based on your design needs. Polygon for custom multi-point shapes, circle for perfect rounds, ellipse for ovals, inset for modified rectangles.",
      },
      {
        name: "Adjust Control Points",
        text: "Drag visual control points or input precise coordinates to define the clip path. Add points for polygons, adjust radius for circles, set insets for rectangular clipping. Use percentage values for responsive scaling.",
      },
      {
        name: "Preview in Real-Time",
        text: "See your clip path applied to sample elements instantly. Toggle between image and color previews. Test responsive scaling and visual appearance before implementing in production.",
      },
      {
        name: "Copy CSS Code",
        text: "Click Copy to get production-ready CSS clip-path property with vendor prefixes. Paste directly into stylesheets or component styles. Includes both standard and inline style formats.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between clip-path and border-radius?",
      answer: "clip-path can create any shape (polygons, circles, custom paths, diagonal edges) while border-radius only rounds corners on rectangles. Use clip-path for complex shapes, non-rectangular clipping, or diagonal edges. Use border-radius for simple rounded corners. clip-path is more versatile but less widely understood. They can be combined: apply border-radius to a polygon-clipped element for rounded corners on custom shapes."
    },
    {
      question: "Should I use percentage or pixel values for clip-path coordinates?",
      answer: "Use percentage values (0% to 100%) for responsive clip paths that scale with container size. Percentages maintain shape proportions across different viewport widths and element dimensions. Use pixel values only for fixed-size clipping that shouldn't scale. For responsive design, percentages are strongly recommended. Example: polygon(50% 0%, 100% 100%, 0% 100%) creates a triangle that scales with any container size."
    },
    {
      question: "How do I create a perfect hexagon with clip-path?",
      answer: "Use a six-point polygon with specific coordinates: clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); This creates a horizontal hexagon. For vertical hexagon: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%). Apply to elements with appropriate aspect ratio: horizontal hexagons need ~1.15 height-to-width ratio."
    },
    {
      question: "Can I animate clip-path transitions?",
      answer: "Yes, with transition: clip-path 0.3s ease; Clip-path animations work smoothly in modern browsers for shape morphing effects. Both shapes must have the same number of points for polygon animations. Example: hover effect morphing circle to polygon requires both to be polygons with equal point count. Simple radius changes (circle growth) or coordinate shifts animate smoothly. Complex morphing may be expensive on low-power devices."
    },
    {
      question: "Why doesn't my clip-path work in older browsers?",
      answer: "Internet Explorer has no clip-path support - use rectangular fallback. Legacy Edge (pre-Chromium) requires -webkit-clip-path prefix. Always include vendor prefix: -webkit-clip-path: polygon(...); clip-path: polygon(...); Modern browsers (Chrome 55+, Firefox 54+, Safari 9.1+) have full support. For IE users, provide graceful degradation: element remains rectangular but layout functions correctly."
    },
    {
      question: "How do I create diagonal section edges with clip-path?",
      answer: "Use polygon with four points for diagonal bottom edge: clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); This creates a section with straight top and sides, diagonal bottom (15% angle). Adjust third coordinate (85%) for steeper/gentler slope. For diagonal top: polygon(0 15%, 100% 0, 100% 100%, 0 100%); For both edges: polygon(0 5%, 100% 0, 100% 95%, 0 100%); Use responsive values for viewport-specific angles."
    },
    {
      question: "Can I use clip-path on background images?",
      answer: "clip-path applies to the entire element including background. It clips both content and background images/colors. To clip only an image, apply clip-path directly to the img tag or background element. Combine with object-fit: cover on images to ensure clipped area is filled properly. For complex layering, use clip-path on containers with background-image property."
    },
    {
      question: "What's the browser performance impact of complex clip-paths?",
      answer: "clip-path is GPU-accelerated in modern browsers for smooth rendering. Even complex polygons (hexagons, stars) perform well. Simple shapes (circles, triangles, diagonal edges) have negligible performance impact. Very complex paths with dozens of points may cause slight slowdown. Animating clip-path can be expensive - test on target devices. For static clipping, performance is excellent. More efficient than SVG masks for geometric shapes."
    },
    {
      question: "How do I create a circular avatar with clip-path instead of border-radius?",
      answer: "Apply clip-path: circle(50% at center); to a square image: .avatar { width: 100px; height: 100px; clip-path: circle(50% at center); -webkit-clip-path: circle(50% at center); object-fit: cover; } This creates a perfect circle. clip-path can be more reliable than border-radius: 50%; for true circles and works better with some image processing. Include -webkit- prefix for Safari compatibility."
    },
    {
      question: "Is my clip-path design data private when using this tool?",
      answer: "Yes. All clip-path generation happens client-side in your browser. No coordinates, shapes, or CSS code are sent to servers. No tracking, no storage. Safe for proprietary designs or client work. The tool works offline after initial load. Inspect browser DevTools Network tab - zero outbound requests containing your design data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your clip path designs never leave your browser. This generator operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All clip-path generation and coordinate calculation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your designs. The tool works completely offline after first load.
- **No Data Storage:** Your clip-path coordinates and shapes are not saved on our servers. Browser localStorage used only for local presets if you save them.
- **No Analytics Tracking:** We don't track which clip paths you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your design data.

This makes the tool safe for creating clip paths for proprietary designs, client-specific interfaces, or confidential design systems. Use with confidence for commercial projects.`,
  },

  stats: {
    "Shape Types": "4+",
    "Browser Support": "95%+",
    "Preset Shapes": "10+",
    "Export Formats": "CSS/Inline",
    "Server Uploads": "0"
  }
};
