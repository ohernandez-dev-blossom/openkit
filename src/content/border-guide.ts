/**
 * Border Radius Designer Tool Guide Content
 * Comprehensive developer guide for CSS border-radius creation
 */

import type { ToolGuideContent } from "./types";

export const borderGuideContent: ToolGuideContent = {
  toolName: "Border Radius Designer",
  toolPath: "/border",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Adjust Individual Corners",
      description: "Use sliders or input fields to set border-radius for each corner independently (top-left, top-right, bottom-right, bottom-left). Create asymmetric designs or uniform rounded corners."
    },
    {
      title: "Apply Preset Styles",
      description: "Click preset buttons for common border radius patterns: fully rounded (pill shapes), subtle rounds (modern cards), or sharp corners. Presets provide professional starting points."
    },
    {
      title: "Preview in Real-Time",
      description: "See your border radius applied to a box preview instantly. Test how different radius values affect visual appearance before implementing in code."
    },
    {
      title: "Copy CSS Border-Radius Code",
      description: "Click copy to get production-ready CSS border-radius property. Includes shorthand and longhand syntax options for flexible integration into stylesheets."
    }
  ],

  introduction: {
    title: "What is a Border Radius Designer?",
    content: `A border radius designer is a visual tool that generates CSS border-radius properties for creating rounded corners on HTML elements. Border radius is fundamental to modern web design, enabling everything from subtle rounded cards to pill-shaped buttons and circular avatars. Visual designers eliminate the trial-and-error of manual radius tweaking, providing instant previews and precise control over corner rounding.

CSS border-radius rounds the corners of an element's border box. Values can be specified in pixels (px), percentages (%), or other CSS length units. Each corner can have independent radius values, allowing asymmetric designs or organic shapes. Modern border-radius supports elliptical corners with separate horizontal and vertical radii for advanced effects.

### Why Developers Need Border Radius Designers

Modern UI design relies heavily on rounded corners for visual softness and accessibility. Sharp 90-degree corners feel harsh; subtle rounding (4-8px) creates approachable, friendly interfaces. Cards, buttons, input fields, and modals all benefit from appropriate border radius.

Consistency across components requires standardized radius values. Design systems document radius scales: none (0px), small (4px), medium (8px), large (12px), rounded (9999px for pills). Visual designers help establish and maintain these standards by previewing radius values in context.

Complex corner combinations (some rounded, some sharp) are difficult to visualize from code alone. Designer tools provide immediate visual feedback, enabling experimentation with asymmetric designs or organic shapes without constant browser refreshing.

Responsive design may require different radius values at different breakpoints. Larger radius values on mobile can make buttons easier to tap; smaller radius on desktop conserves space. Designers facilitate testing multiple radius configurations.

### Border Radius Syntax

**Uniform Radius (all corners):** border-radius: 8px; applies 8px to all four corners.

**Individual Corners (shorthand):** border-radius: 10px 5px 0 15px; applies values clockwise from top-left: top-left 10px, top-right 5px, bottom-right 0, bottom-left 15px.

**Individual Corners (longhand):** Separate properties for granular control:
- border-top-left-radius: 10px;
- border-top-right-radius: 5px;
- border-bottom-right-radius: 0;
- border-bottom-left-radius: 15px;

**Elliptical Corners:** border-radius: 20px / 10px; creates horizontal radius of 20px and vertical radius of 10px. Produces oval-shaped corners instead of circular.

**Percentage Values:** border-radius: 50%; on a square element creates a perfect circle. On rectangles, creates elliptical rounding adapting to element dimensions.

### Common Border Radius Use Cases

**Subtle Card Rounding (4-8px):** Modern cards use slight rounding for visual softness without appearing overly stylized. 4-8px radius is professional and contemporary.

**Button Rounding (6-12px):** Buttons benefit from moderate rounding. 6-8px for rectangular buttons, 12-16px for larger CTAs, 9999px for pill-shaped buttons.

**Input Fields (4-6px):** Form inputs use subtle rounding to distinguish from surrounding content while maintaining clean appearance. Too much rounding on inputs feels unprofessional.

**Circular Avatars (50%):** Profile pictures and user avatars use border-radius: 50%; on square containers to create perfect circles.

**Modal Dialogs (12-16px):** Modals and overlays use larger radius values to create friendly, approachable dialogs that stand out from background content.

**Image Thumbnails (8-12px):** Rounded thumbnails in grids or galleries feel modern and reduce visual harshness of rectangular grids.

### Border Radius in Design Systems

Professional design systems define border radius scales for consistency:

**Tailwind CSS Default Scale:**
- none: 0px
- sm: 2px
- DEFAULT: 4px
- md: 6px
- lg: 8px
- xl: 12px
- 2xl: 16px
- 3xl: 24px
- full: 9999px (pill)

**Material Design Radius Values:**
- Extra Small: 4dp
- Small: 8dp
- Medium: 12dp
- Large: 16dp
- Extra Large: 28dp
- Full: 50%

Consistent radius values create visual harmony across interfaces. All cards use the same radius, all buttons share radius values, creating predictable and professional appearance.

### Browser Compatibility

border-radius has universal browser support: Chrome, Firefox, Safari, Edge, all modern browsers. No vendor prefixes needed since 2012.

Older browsers (IE8 and below) don't support border-radius - corners remain sharp. Graceful degradation: layouts function correctly, just without rounded corners.

Elliptical corners (horizontal / vertical syntax) work in all modern browsers. Percentage values behave consistently across browsers.

### Performance Considerations

border-radius is GPU-accelerated in modern browsers for smooth rendering. Even complex border radius values with different corner radii perform well.

Animating border-radius (transitions) is supported but can be expensive. For subtle transitions (hover effects on buttons), performance is acceptable. For complex animations, consider transform alternatives.

Very large radius values (> 100px) on large elements may cause slight rendering overhead, but impact is minimal in practice.`,
  },

  useCases: [
    {
      title: "Modern Card Component Rounding",
      description: "Apply subtle border radius to card components for contemporary UI design. Rounded cards feel approachable and modern while maintaining professional appearance. Standard for dashboard panels, content cards, and information containers.",
      example: `/* Subtle card rounding (4-8px) */
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Card variations with different radius sizes */
.card-subtle {
  border-radius: 4px; /* minimal rounding */
}

.card-standard {
  border-radius: 8px; /* default modern card */
}

.card-prominent {
  border-radius: 16px; /* larger, friendlier rounding */
}

/* Card with image - top corners rounded */
.card-with-image {
  border-radius: 12px;
  overflow: hidden; /* prevents image from exceeding rounded corners */
}

.card-with-image img {
  width: 100%;
  border-radius: 12px 12px 0 0; /* round top corners only */
}

.card-with-image .content {
  padding: 16px;
}

/* Pricing card with different top/bottom radius */
.pricing-card {
  border-radius: 16px 16px 8px 8px;
  border: 2px solid #667eea;
}

/* React card component */
const Card = ({ children, rounded = "md" }) => {
  const radiusClasses = {
    sm: 'rounded',        // 4px
    md: 'rounded-lg',     // 8px
    lg: 'rounded-xl',     // 12px
    xl: 'rounded-2xl'     // 16px
  };

  return (
    <div className={\`bg-white border border-gray-200 p-6 shadow-md \${radiusClasses[rounded]}\`}>
      {children}
    </div>
  );
};

/* Tailwind CSS card examples */
<div class="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
  <h3 class="text-xl font-bold">Card Title</h3>
  <p class="text-gray-600">Card content goes here.</p>
</div>

/* Card grid with uniform rounding */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.card-grid .card {
  border-radius: 12px;
  background: white;
  padding: 20px;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-grid .card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

/* CSS custom properties for radius scale */
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
}

.card {
  border-radius: var(--radius-md);
}`
    },
    {
      title: "Button Border Radius Styles",
      description: "Create professional button designs with appropriate border radius. From subtle rounding for rectangular buttons to fully rounded pill-shaped CTAs. Border radius enhances clickability perception and visual hierarchy.",
      example: `/* Standard button with moderate rounding */
.button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.button:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

/* Pill-shaped button (fully rounded) */
.button-pill {
  border-radius: 9999px; /* or border-radius: 50vh; */
  padding: 12px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Subtle rectangular button */
.button-subtle {
  border-radius: 4px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

/* Large CTA with prominent rounding */
.button-cta {
  border-radius: 16px;
  padding: 16px 40px;
  font-size: 18px;
  background: #10b981;
}

/* Icon button - circular */
.icon-button {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* perfect circle */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #667eea;
  border: none;
  cursor: pointer;
}

/* Button group with connected corners */
.button-group {
  display: flex;
}

.button-group .button:first-child {
  border-radius: 8px 0 0 8px; /* round left corners only */
}

.button-group .button:last-child {
  border-radius: 0 8px 8px 0; /* round right corners only */
}

.button-group .button:not(:first-child):not(:last-child) {
  border-radius: 0; /* no rounding for middle buttons */
}

/* React button component with radius variants */
const Button = ({ children, variant = "default", rounded = "md" }) => {
  const radiusMap = {
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full"
  };

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50"
  };

  return (
    <button className={\`px-6 py-3 font-semibold transition \${variants[variant]} \${radiusMap[rounded]}\`}>
      {children}
    </button>
  );
};

/* Usage */
<Button variant="default" rounded="full">Pill Button</Button>
<Button variant="outline" rounded="md">Rounded Button</Button>
<Button variant="ghost" rounded="sm">Subtle Button</Button>

/* Tailwind button examples */
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
  Standard Button
</button>

<button class="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition">
  Pill Button
</button>

<button class="bg-gray-100 text-gray-700 px-6 py-2 rounded border border-gray-300 hover:bg-gray-200 transition">
  Subtle Button
</button>`
    },
    {
      title: "Form Input Field Rounding",
      description: "Apply appropriate border radius to input fields, text areas, and form controls. Subtle rounding (4-6px) distinguishes inputs from surrounding content while maintaining professional appearance. Consistent rounding across form elements creates cohesive design.",
      example: `/* Standard input with subtle rounding */
.input {
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Textarea with consistent rounding */
.textarea {
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  min-height: 120px;
  resize: vertical;
}

/* Select dropdown */
.select {
  padding: 12px 40px 12px 16px; /* extra right padding for arrow */
  border: 2px solid #d1d5db;
  border-radius: 6px;
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* custom arrow */
  background-repeat: no-repeat;
  background-position: right 12px center;
}

/* Input with icon (rounded on one side) */
.input-with-icon-container {
  display: flex;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
}

.input-with-icon {
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
}

.input-icon {
  padding: 12px 16px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
}

/* Search input with pill shape */
.search-input {
  padding: 10px 20px 10px 40px;
  border: 2px solid #e5e7eb;
  border-radius: 9999px; /* pill shape */
  background-image: url("data:image/svg+xml,..."); /* search icon */
  background-repeat: no-repeat;
  background-position: 12px center;
  width: 100%;
  max-width: 400px;
}

/* Input group with connected elements */
.input-group {
  display: flex;
}

.input-group .input {
  border-radius: 0;
  border-right: none;
}

.input-group .input:first-child {
  border-radius: 6px 0 0 6px;
}

.input-group .button:last-child {
  border-radius: 0 6px 6px 0;
}

/* Checkbox with rounded corners */
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  position: relative;
}

.checkbox:checked {
  background: #667eea;
  border-color: #667eea;
}

.checkbox:checked::after {
  content: "✓";
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Radio button (perfect circle) */
.radio {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%; /* perfect circle */
  cursor: pointer;
  appearance: none;
  position: relative;
}

.radio:checked {
  border-color: #667eea;
}

.radio:checked::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: #667eea;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* React form component */
const Input = ({ type = "text", placeholder, error, rounded = "md" }) => {
  const radiusClasses = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={\`w-full px-4 py-3 border-2 \${error ? "border-red-500" : "border-gray-300"} \${radiusClasses[rounded]} focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition\`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

/* Tailwind form examples */
<input
  type="text"
  placeholder="Enter your name"
  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/>

<select class="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
  <option>Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>`
    },
    {
      title: "Image and Avatar Rounding",
      description: "Create circular avatars, rounded image thumbnails, and organic image shapes with border-radius. 50% radius on square images produces perfect circles for profile pictures. Moderate rounding (8-12px) on thumbnails creates modern gallery aesthetics.",
      example: `/* Perfect circular avatar */
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Avatar sizes */
.avatar-sm { width: 32px; height: 32px; }
.avatar-md { width: 48px; height: 48px; }
.avatar-lg { width: 64px; height: 64px; }
.avatar-xl { width: 96px; height: 96px; }
.avatar-2xl { width: 128px; height: 128px; }

/* Rounded thumbnail images */
.thumbnail {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Image gallery with rounded thumbnails */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.gallery img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s;
}

.gallery img:hover {
  transform: scale(1.05);
}

/* Profile card with circular avatar */
.profile-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.profile-card .avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0 auto 16px;
}

/* Image with organic shape (different corner radii) */
.organic-image {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  width: 300px;
  height: 300px;
  object-fit: cover;
}

/* Rounded product image */
.product-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 16px;
  background: #f5f5f5;
}

/* Avatar group (overlapping avatars) */
.avatar-group {
  display: flex;
  padding-left: 12px;
}

.avatar-group .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -12px;
}

/* React avatar component */
const Avatar = ({ src, alt, size = "md", status }) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        className={\`\${sizeMap[size]} rounded-full object-cover border-2 border-white shadow-md\`}
      />
      {status && (
        <span className={\`absolute bottom-0 right-0 w-3 h-3 bg-\${status === 'online' ? 'green' : 'gray'}-500 border-2 border-white rounded-full\`}></span>
      )}
    </div>
  );
};

/* Usage */
<Avatar src="/avatar.jpg" alt="John Doe" size="lg" status="online" />

/* Tailwind image examples */
<img
  src="/profile.jpg"
  alt="Profile"
  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
/>

<div class="grid grid-cols-3 gap-4">
  <img src="/thumb1.jpg" class="w-full aspect-square object-cover rounded-lg" />
  <img src="/thumb2.jpg" class="w-full aspect-square object-cover rounded-lg" />
  <img src="/thumb3.jpg" class="w-full aspect-square object-cover rounded-lg" />
</div>

/* Image container with border-radius and overflow */
.image-container {
  width: 300px;
  height: 200px;
  border-radius: 16px;
  overflow: hidden; /* clips image to rounded corners */
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.image-container:hover img {
  transform: scale(1.1);
}`
    }
  ],

  howToUse: {
    title: "How to Use This Border Radius Designer",
    content: `This border radius designer provides visual controls for creating CSS border-radius properties with real-time preview. Adjust corner rounding individually or uniformly, apply presets, and copy production-ready CSS code.

### Adjusting Individual Corners

Use the four corner controls (sliders or inputs) to set border-radius for each corner independently:
- **Top-Left:** Upper left corner rounding
- **Top-Right:** Upper right corner rounding
- **Bottom-Right:** Lower right corner rounding
- **Bottom-Left:** Lower left corner rounding

Drag sliders or enter numeric values directly. Preview updates instantly as you adjust values. Click "Link Corners" to synchronize all corners to the same value for uniform rounding.

### Applying Preset Styles

Click preset buttons for common border radius patterns:
- **None (0px):** Sharp corners, no rounding
- **Subtle (4px):** Minimal rounding, professional
- **Standard (8px):** Default modern card/button rounding
- **Rounded (12px):** Prominent rounding, friendly appearance
- **Extra Rounded (16px):** Large rounding for emphasis
- **Pill (9999px):** Fully rounded ends for pill shapes
- **Circle (50%):** Perfect circle (on square elements)

Presets provide professional starting points. Adjust individual corners after applying presets for custom variations.

### Understanding the Preview

The preview box shows your border radius applied to a container element. The visual representation updates in real-time as you adjust values, helping visualize how the radius will appear on actual UI elements.

Toggle preview background color to see radius effect on light vs dark backgrounds. Change preview box size to test radius scaling on different element dimensions.

### Copying CSS Code

Click "Copy CSS" to copy the border-radius property to clipboard. The tool generates code in multiple formats:

**Shorthand (if all corners identical):** border-radius: 8px;

**Shorthand (if corners differ):** border-radius: 10px 5px 0 15px; (top-left, top-right, bottom-right, bottom-left clockwise)

**Longhand (individual properties):** Separate border-top-left-radius, etc. for maximum clarity and CSS specificity.

Select format preference in settings. Shorthand is more concise, longhand is more explicit.

### Working with Units

The designer supports multiple CSS units:
- **Pixels (px):** Absolute rounding, consistent across element sizes
- **Percentage (%):** Relative to element dimensions. 50% on square = circle
- **Rem/Em:** Scalable with typography, responsive to font size changes

Switch units in settings. Most use cases use pixels for predictable results. Percentage works well for circles and responsive scaling.

### Advanced: Elliptical Corners

For elliptical corners (different horizontal and vertical radii), use the advanced mode. Specify horizontal and vertical radius values separately:

border-radius: 20px / 10px; creates horizontally wide, vertically short corners.

Elliptical corners create organic, less geometric shapes. Useful for stylized designs or unique visual effects.

### Responsive Border Radius

Test your border radius at different viewport sizes using the responsive preview toggle. Larger radius values may need adjustment on mobile for proportion balance.

Consider using smaller radius on mobile (buttons feel more precise) and larger radius on desktop (more space allows prominent rounding).

### Accessibility Considerations

Border radius itself doesn't affect accessibility directly. However, ensure sufficient contrast between element and background regardless of corner rounding.

Focus states should remain visible with rounded corners. Combine border-radius with outline or box-shadow focus indicators for keyboard navigation accessibility.

### Integration with Design Systems

Export radius values to design tokens or CSS custom properties:

:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

Use tokens for consistency across components. Update centralized values to change border radius theme-wide.

### Browser Compatibility

All generated border-radius CSS works in all modern browsers with no prefixes needed. IE9+ has full support. Older browsers (IE8-) ignore border-radius - corners remain sharp but layout functions correctly.`,
    steps: [
      {
        name: "Adjust Corners",
        text: "Use sliders or inputs to set border-radius for each corner (top-left, top-right, bottom-right, bottom-left). Link corners for uniform rounding or adjust individually for asymmetric designs.",
      },
      {
        name: "Apply Presets",
        text: "Click preset buttons (subtle 4px, standard 8px, rounded 12px, pill 9999px, circle 50%) for common patterns. Presets provide professional starting points.",
      },
      {
        name: "Preview in Real-Time",
        text: "See your border radius applied to a box preview instantly. Test how different radius values affect visual appearance and adjust as needed.",
      },
      {
        name: "Copy CSS Code",
        text: "Click Copy to get border-radius CSS property. Choose shorthand or longhand syntax. Use in stylesheets, design systems, or component libraries.",
      }
    ]
  },

  faqs: [
    {
      question: "What border-radius value should I use for modern cards?",
      answer: "8px is the standard for modern card designs - professional without being overly stylized. 4px works for subtle, minimal designs. 12-16px creates friendlier, more approachable cards. Avoid extremes: less than 4px feels harsh, more than 20px (unless pill-shaped) feels excessive. Most professional UIs use 6-12px range for cards."
    },
    {
      question: "How do I create a perfect circle with border-radius?",
      answer: "Use border-radius: 50% on a square element (width equals height). The 50% value creates circular corners that meet at the center, forming a perfect circle. On non-square elements, 50% creates an ellipse instead. For pixel-based circles, ensure width and height are identical and use border-radius: 999px or 50%."
    },
    {
      question: "Can I have different border-radius on each corner?",
      answer: "Yes. Use shorthand: border-radius: 10px 5px 0 15px; (top-left, top-right, bottom-right, bottom-left clockwise). Or use longhand: border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius individually. Asymmetric corners create unique designs or organic shapes. Common pattern: rounded top corners, sharp bottom corners for cards with images."
    },
    {
      question: "What's the difference between pixels and percentage in border-radius?",
      answer: "Pixels (px) are absolute - 8px radius stays 8px regardless of element size. Consistent and predictable. Percentage (%) is relative to element dimensions - 10% on a 100px wide element = 10px radius. 50% on square = perfect circle. Use pixels for consistency across differently sized elements, percentage for responsive circles or proportional rounding."
    },
    {
      question: "Why doesn't my border-radius show on images?",
      answer: "Images need overflow: hidden on their container or border-radius applied directly to the img tag with object-fit. Containers with border-radius but no overflow: hidden won't clip child images. Ensure img { border-radius: 8px; } or .container { border-radius: 8px; overflow: hidden; }. Also check that images don't have default display: inline causing spacing issues."
    },
    {
      question: "What's the best border-radius for buttons?",
      answer: "6-8px for rectangular buttons (professional, clickable feel). 12-16px for larger CTAs or friendlier appearance. 9999px for pill-shaped buttons (fully rounded ends). Match button radius to your overall design system - if cards use 8px, buttons should use 6-8px for consistency. Avoid under 4px (too sharp) or inconsistent values across buttons."
    },
    {
      question: "How do I create pill-shaped buttons with border-radius?",
      answer: "Use border-radius: 9999px; or border-radius: 50vh; on buttons with horizontal padding. The excessive radius value ensures ends are fully rounded regardless of button height. Example: padding: 12px 32px; border-radius: 9999px; creates classic pill shape. Works because border-radius caps at half the element's height, creating semicircular ends."
    },
    {
      question: "Can I animate border-radius transitions?",
      answer: "Yes, with transition: border-radius 0.3s ease; or transition: all 0.3s; Border-radius transitions work smoothly in all modern browsers. Useful for hover effects: button goes from 8px to 16px radius on hover. Avoid transitioning from sharp (0px) to very rounded (50%) - creates unnatural morphing. Subtle transitions (4px to 8px) work best."
    },
    {
      question: "What are elliptical corners in border-radius?",
      answer: "Elliptical corners have different horizontal and vertical radii. Syntax: border-radius: 20px / 10px; (horizontal / vertical). Creates oval-shaped corners instead of circular. Useful for organic, less geometric designs. Example: border-radius: 50% / 30%; creates wide, short corners. Less common than circular corners but effective for unique visual effects."
    },
    {
      question: "Is my border radius design private when using this tool?",
      answer: "Yes. All border-radius generation happens client-side in your browser. No radius values, CSS code, or design data are sent to servers. No tracking, no storage. Safe for proprietary designs or client work. The tool works offline after initial load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your border radius designs never leave your browser. This designer operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All border-radius generation and CSS code creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your designs. The tool works completely offline after first load.
- **No Data Storage:** Your border-radius values are not saved on our servers. Browser localStorage used only for local presets if you save them.
- **No Analytics Tracking:** We don't track which radius values you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your design data.

This makes the tool safe for creating border radius for proprietary designs, client-specific styles, or confidential design systems. Use with confidence for commercial projects.`
  },

  stats: {
    "Preset Styles": "7+",
    "Browser Support": "99%+",
    "Units Supported": "px/%/rem/em",
    "Export Formats": "CSS",
    "Server Uploads": "0"
  }
};
