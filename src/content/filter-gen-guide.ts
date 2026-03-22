/**
 * CSS Filter Generator Tool Guide Content
 * Comprehensive developer guide for CSS filter effects
 */

import type { ToolGuideContent } from "./types";

export const filterGenGuideContent: ToolGuideContent = {
  toolName: "CSS Filter Generator",
  toolPath: "/filter-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Filter Type",
      description: "Choose from CSS filters: blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia, drop-shadow. Combine multiple filters for advanced effects."
    },
    {
      title: "Adjust Filter Values",
      description: "Use sliders to fine-tune each filter parameter. See real-time preview of combined effects. Values range from 0% to 200%+ depending on filter type."
    },
    {
      title: "Preview on Sample Images",
      description: "Test filter combination on different images (photos, graphics, UI elements). Verify appearance across varied content before implementing in production."
    },
    {
      title: "Copy CSS Filter Code",
      description: "Click copy to get production-ready CSS filter property. Includes all active filters with optimized values. Paste directly into stylesheets or inline styles."
    }
  ],

  introduction: {
    title: "What is a CSS Filter Generator?",
    content: `A CSS filter generator is a visual tool for creating CSS filter effects without manual coding. CSS filters apply graphical effects like blur, color adjustments, and shadows to images, backgrounds, and elements. Generators provide instant visual feedback and precise control over filter parameters, eliminating trial-and-error.

CSS filters are GPU-accelerated for smooth performance. Unlike image editing software that creates static processed images, CSS filters apply dynamically - hover effects, dark mode adjustments, accessibility enhancements all use filters. Single filter property replaces multiple pre-processed image variants.

### Why Developers Need Filter Generators

Image effects traditionally required Photoshop or image processing. CSS filters bring these capabilities to code - blur backgrounds for modals, desaturate inactive elements, adjust brightness for readability, invert colors for dark themes.

Visual generators show immediate effect previews critical for fine-tuning. Adjusting brightness from 90% to 110% requires seeing visual difference - numerical values alone don't convey impact. Interactive sliders enable precise calibration.

Multiple filters combine for complex effects. grayscale(100%) + brightness(1.2) + contrast(1.1) creates vintage photo aesthetic. Generators manage multi-filter syntax and ordering, providing complete filter property ready to copy.

Performance optimization is automatic. Generators use efficient filter values and syntax. GPU acceleration means filters animate smoothly for hover effects or transitions without JavaScript overhead.

### CSS Filter Functions

**blur():** Gaussian blur effect. Values in pixels: blur(5px) creates 5px blur radius. Useful for background blurring (frosted glass), focus effects, or loading placeholders.

**brightness():** Adjusts brightness. 0% = completely black, 100% = original, 200% = twice as bright. brightness(0.9) slightly darkens, brightness(1.2) brightens.

**contrast():** Adjusts color contrast. 0% = gray, 100% = original, 200% = high contrast. contrast(1.2) punches colors, contrast(0.8) softens.

**grayscale():** Converts to grayscale. 0% = original colors, 100% = full grayscale. grayscale(0.5) = 50% desaturated. Useful for disabled states or black-and-white effects.

**hue-rotate():** Rotates hue around color wheel. Values in degrees: hue-rotate(90deg) shifts reds to greens. hue-rotate(180deg) inverts hues. Creates color variations from single image.

**invert():** Inverts colors. 0% = original, 100% = fully inverted (black becomes white). invert(1) useful for dark mode transformations.

**opacity():** Transparency. 0% = fully transparent, 100% = fully opaque. Similar to opacity property but part of filter pipeline for stacking with other effects.

**saturate():** Adjusts color saturation. 0% = grayscale, 100% = original, 200% = hyper-saturated. saturate(0.5) creates muted colors, saturate(1.5) vibrant.

**sepia():** Applies sepia tone. 0% = original, 100% = full sepia (warm brown tones). Creates vintage or warm photo effect.

**drop-shadow():** Adds shadow behind element. Unlike box-shadow, follows alpha channel contours. Syntax: drop-shadow(2px 2px 4px rgba(0,0,0,0.3)). Perfect for PNG icons or cutout images.

### Filter Combining and Order

Multiple filters stack left to right: filter: grayscale(100%) brightness(1.2) contrast(1.1);

Order matters. grayscale() then brightness() produces different result than brightness() then grayscale(). Generators handle ordering for predictable results.

Common combinations:
- **Vintage photo:** sepia(1) brightness(1.1) contrast(0.9)
- **Frosted glass:** blur(10px) brightness(1.1) saturate(1.2)
- **Disabled state:** grayscale(1) opacity(0.6)
- **Dark mode invert:** invert(1) hue-rotate(180deg)

### Performance and Browser Support

CSS filters have universal modern browser support: Chrome, Firefox, Safari, Edge. GPU-accelerated for 60fps performance even with multiple filters.

Animating filters requires caution. Transitions on blur, brightness, or saturation work smoothly. Avoid animating complex multi-filter stacks - can cause performance issues on lower-end devices.

backdrop-filter applies filters to background behind element (frosted glass). Requires backdrop-filter property, slightly less supported than filter. Check caniuse.com for compatibility.

### Accessibility Considerations

Filters can improve accessibility: increase contrast for readability, adjust brightness for low-vision users, reduce motion by removing blur animations.

However, extreme filters harm accessibility. High contrast or inverted colors may reduce text readability. Test filtered content with screen readers and keyboard navigation to ensure usability.

Respect prefers-color-scheme for dark mode. Use invert() and hue-rotate() to adapt light-themed images to dark themes automatically without duplicate assets.

### Use Cases

**Image hover effects:** Brighten, blur, or desaturate on hover for interactive feedback.

**Dark mode adaptation:** Invert images/icons for dark themes: filter: invert(1) hue-rotate(180deg);

**Loading states:** Blur and reduce brightness for content loading in background.

**Disabled elements:** Grayscale and reduce opacity for inactive buttons or form fields.

**Photo filters:** Apply Instagram-style effects purely in CSS: Valencia, Nashville, etc.

**Focus/depth effects:** Blur background elements when modal opens (backdrop-filter).

**Brand color variations:** Use hue-rotate() to create color variants from single source image.

**Print styles:** Apply grayscale to conserve ink in print stylesheets.`,
  },

  useCases: [
    {
      title: "Image Hover Effects and Interactions",
      description: "Apply filter-based hover effects to images, cards, or buttons for interactive feedback. Brightness, blur, or saturation changes provide visual confirmation of interactivity without additional assets.",
      example: `/* Brighten image on hover */
.image-card img {
  transition: filter 0.3s ease;
}

.image-card:hover img {
  filter: brightness(1.15);
}

/* Desaturate to color on hover */
.thumbnail {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.thumbnail:hover {
  filter: grayscale(0%);
}

/* Blur siblings when hovering one item */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.gallery img {
  transition: filter 0.3s ease, transform 0.3s ease;
}

.gallery:hover img {
  filter: blur(3px) brightness(0.7);
}

.gallery img:hover {
  filter: none;
  transform: scale(1.05);
  z-index: 1;
}

/* Vintage effect on hover */
.photo {
  filter: none;
  transition: filter 0.4s ease;
}

.photo:hover {
  filter: sepia(0.6) brightness(1.1) contrast(0.9);
}

/* Glow effect with brightness and blur */
.button-glow {
  position: relative;
  overflow: visible;
}

.button-glow::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: inherit;
  filter: blur(20px) brightness(1.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.button-glow:hover::before {
  opacity: 1;
}

/* Sharpen on hover for emphasis */
.product-image {
  filter: brightness(0.95) contrast(0.95);
  transition: filter 0.3s ease;
}

.product-image:hover {
  filter: brightness(1.05) contrast(1.15);
}

/* React component with hover filter */
const FilteredImage = ({ src, hoverFilter = "brightness(1.2)" }) => {
  return (
    <img
      src={src}
      className="transition-all duration-300 hover:filter"
      style={{ '--hover-filter': hoverFilter } as React.CSSProperties}
    />
  );
};

/* Tailwind with custom filter classes */
<img
  src="/photo.jpg"
  class="transition-all duration-300 hover:brightness-110 hover:contrast-105"
/>

/* Multiple hover states */
.avatar {
  filter: grayscale(0%);
  transition: filter 0.3s ease;
}

.avatar.inactive {
  filter: grayscale(100%) opacity(0.5);
}

.avatar.inactive:hover {
  filter: grayscale(50%) opacity(0.8);
}

/* Neon glow hover effect */
.neon-button {
  filter: brightness(1);
  transition: filter 0.3s ease;
}

.neon-button:hover {
  filter: brightness(1.3) saturate(1.5) drop-shadow(0 0 10px currentColor);
}`
    },
    {
      title: "Dark Mode Image Adaptation",
      description: "Automatically adapt light-themed images and icons to dark mode using invert and hue-rotate filters. Eliminates need for duplicate dark-mode assets while maintaining brand colors.",
      example: `/* Dark mode media query with image inversion */
@media (prefers-color-scheme: dark) {
  /* Invert images for dark mode */
  img:not(.no-dark-invert) {
    filter: invert(1) hue-rotate(180deg);
  }

  /* Adjust brightness for better dark mode appearance */
  .logo {
    filter: invert(1) brightness(0.9);
  }

  /* Icons with color correction */
  .icon {
    filter: invert(1) hue-rotate(180deg) brightness(1.1);
  }
}

/* Class-based dark mode (data attribute) */
[data-theme="dark"] img {
  filter: invert(1) hue-rotate(180deg);
}

[data-theme="dark"] .icon-colorful {
  filter: invert(1) hue-rotate(180deg) brightness(0.95);
}

/* Exclude specific images from dark mode inversion */
.no-dark-invert,
.user-avatar,
.product-photo {
  filter: none !important;
}

/* Partial inversion for subtle dark mode */
[data-theme="dark"] .decorative-graphic {
  filter: invert(0.85) hue-rotate(180deg) brightness(1.1);
}

/* SVG icons dark mode */
[data-theme="dark"] svg.icon {
  filter: invert(1);
}

[data-theme="dark"] svg.icon.colored {
  filter: invert(1) hue-rotate(180deg);
}

/* Background images dark mode adaptation */
[data-theme="dark"] .hero-background {
  background-image: url('/hero-light.jpg');
  filter: invert(1) brightness(0.8);
}

/* React component with dark mode filter */
const DarkModeImage = ({ src, alt, invertInDark = true }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={invertInDark ? "dark:invert dark:hue-rotate-180" : ""}
    />
  );
};

/* Tailwind dark mode filters */
<img
  src="/logo.svg"
  class="dark:invert dark:hue-rotate-180 dark:brightness-90"
/>

/* Gradual dark mode transition */
img {
  transition: filter 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  img {
    filter: invert(1) hue-rotate(180deg);
  }
}

/* Chart/graph dark mode adaptation */
[data-theme="dark"] .chart {
  filter: invert(0.9) hue-rotate(180deg) brightness(1.05);
}

/* Logo dark mode with precise color matching */
@media (prefers-color-scheme: dark) {
  .brand-logo {
    filter: invert(1) hue-rotate(185deg) brightness(0.92) saturate(1.1);
  }
}

/* Code syntax highlighting dark mode */
[data-theme="dark"] .syntax-highlight {
  filter: invert(0.95) hue-rotate(180deg);
  background: #1e1e1e;
}

/* Exclude photos, keep UI elements inverted */
[data-theme="dark"] img:not([data-no-invert]) {
  filter: invert(1) hue-rotate(180deg);
}

img[data-no-invert] {
  filter: none;
}

<img src="/ui-icon.svg" alt="Icon" /> <!-- inverts -->
<img src="/photo.jpg" alt="Photo" data-no-invert /> <!-- stays original -->`
    },
    {
      title: "Loading States and Blur Effects",
      description: "Use blur and brightness filters for loading placeholders, skeleton screens, and background elements during modal overlays. Creates depth and focus without JavaScript.",
      example: `/* Blur loading placeholder */
.image-loading {
  filter: blur(20px) brightness(1.1);
  transition: filter 0.5s ease;
}

.image-loading.loaded {
  filter: blur(0px) brightness(1);
}

/* Progressive image loading (blur to sharp) */
.progressive-image {
  filter: blur(15px);
  transform: scale(1.05);
  transition: filter 0.6s ease, transform 0.6s ease;
}

.progressive-image.loaded {
  filter: blur(0);
  transform: scale(1);
}

/* Skeleton shimmer with filters */
@keyframes shimmer {
  0% {
    filter: brightness(0.95);
  }
  50% {
    filter: brightness(1.05);
  }
  100% {
    filter: brightness(0.95);
  }
}

.skeleton {
  background: #e0e0e0;
  animation: shimmer 1.5s ease-in-out infinite;
}

/* Modal overlay blur (backdrop-filter) */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Blur background content when modal open */
body.modal-open > *:not(.modal) {
  filter: blur(3px) brightness(0.7);
  transition: filter 0.3s ease;
}

/* Frosted glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

/* Loading spinner with blur background */
.spinner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

/* Content fade-in from blur */
@keyframes fadeInFromBlur {
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

.fade-in-content {
  animation: fadeInFromBlur 0.6s ease-out;
}

/* React loading component with blur */
const LoadingImage = ({ src, loaded }) => {
  return (
    <img
      src={src}
      className={\`transition-all duration-500 \${loaded ? 'blur-0' : 'blur-xl brightness-110'}\`}
      onLoad={() => setLoaded(true)}
    />
  );
};

/* Lazy load with blur placeholder */
.lazy-image {
  filter: blur(20px) brightness(1.2);
  background: #f0f0f0;
  transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.lazy-image[data-loaded="true"] {
  filter: blur(0) brightness(1);
}

/* Focus trap with blur */
.focus-trap-active .background-content {
  filter: blur(4px) brightness(0.8);
  pointer-events: none;
  transition: filter 0.3s ease;
}

/* Tailwind blur utilities */
<div class="blur-xl brightness-110 transition-all duration-500 data-[loaded=true]:blur-0">
  <img src="/image.jpg" />
</div>

/* Glassmorphism navigation */
.nav-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Disabled form with blur */
.form-disabled {
  filter: blur(1px) grayscale(50%) brightness(0.95);
  pointer-events: none;
  transition: filter 0.3s ease;
}`
    },
    {
      title: "Photo Filters and Creative Effects",
      description: "Apply Instagram-style photo filters purely with CSS. Vintage, warm, cool, high-contrast, and sepia effects enhance images without image editing software. Perfect for user-generated content or galleries.",
      example: `/* Classic sepia vintage filter */
.filter-vintage {
  filter: sepia(0.5) brightness(1.1) contrast(0.9) saturate(1.2);
}

/* High contrast black and white */
.filter-noir {
  filter: grayscale(100%) contrast(1.3) brightness(0.95);
}

/* Warm sunset filter */
.filter-sunset {
  filter: brightness(1.1) saturate(1.3) hue-rotate(-10deg) contrast(1.05);
}

/* Cool blue filter */
.filter-cool {
  filter: brightness(1.05) saturate(0.9) hue-rotate(10deg) contrast(1.1);
}

/* Faded retro filter */
.filter-retro {
  filter: contrast(0.85) brightness(1.15) saturate(0.7) sepia(0.3);
}

/* Vibrant pop filter */
.filter-vibrant {
  filter: saturate(1.5) contrast(1.2) brightness(1.05);
}

/* Muted pastel filter */
.filter-pastel {
  filter: saturate(0.6) brightness(1.2) contrast(0.8);
}

/* Instagram-style filters */
.filter-valencia {
  filter: contrast(1.08) brightness(1.08) sepia(0.08);
}

.filter-nashville {
  filter: contrast(1.2) brightness(1.05) sepia(0.2) saturate(1.2);
}

.filter-lofi {
  filter: saturate(1.1) contrast(1.5);
}

.filter-toaster {
  filter: contrast(1.5) brightness(0.9) sepia(0.2);
}

.filter-walden {
  filter: brightness(1.1) hue-rotate(-10deg) sepia(0.3) saturate(1.6);
}

.filter-hudson {
  filter: brightness(1.2) contrast(0.9) saturate(1.1);
}

/* Dramatic filter */
.filter-dramatic {
  filter: contrast(1.4) brightness(0.9) saturate(0.8) grayscale(0.2);
}

/* Soft dreamy filter */
.filter-dreamy {
  filter: brightness(1.15) saturate(0.8) contrast(0.85) blur(0.5px);
}

/* Cinematic filter */
.filter-cinematic {
  filter: contrast(1.1) brightness(0.95) saturate(1.2) sepia(0.1);
}

/* Filter gallery with hover */
.filter-gallery img {
  filter: grayscale(0%);
  transition: filter 0.3s ease;
}

.filter-gallery img:hover {
  filter: saturate(1.3) brightness(1.1);
}

/* User-selectable filters */
.photo[data-filter="vintage"] {
  filter: sepia(0.5) brightness(1.1) contrast(0.9);
}

.photo[data-filter="bw"] {
  filter: grayscale(100%) contrast(1.2);
}

.photo[data-filter="warm"] {
  filter: brightness(1.1) saturate(1.3) hue-rotate(-10deg);
}

/* React filter component */
const PhotoFilter = ({ src, filter = "none" }) => {
  const filters = {
    none: "none",
    vintage: "sepia(0.5) brightness(1.1) contrast(0.9)",
    noir: "grayscale(100%) contrast(1.3)",
    vibrant: "saturate(1.5) contrast(1.2)",
    cool: "brightness(1.05) saturate(0.9) hue-rotate(10deg)"
  };

  return (
    <img
      src={src}
      style={{ filter: filters[filter] }}
      className="transition-all duration-300"
    />
  );
};

/* Filter selector UI */
const FilterSelector = ({ image }) => {
  const [activeFilter, setActiveFilter] = useState("none");

  return (
    <div>
      <img src={image} style={{ filter: filters[activeFilter] }} />
      <div className="flex gap-2">
        <button onClick={() => setActiveFilter("vintage")}>Vintage</button>
        <button onClick={() => setActiveFilter("noir")}>Noir</button>
        <button onClick={() => setActiveFilter("vibrant")}>Vibrant</button>
      </div>
    </div>
  );
};

/* Animated filter transition */
@keyframes filterCycle {
  0% { filter: none; }
  33% { filter: sepia(0.5) brightness(1.1); }
  66% { filter: grayscale(100%) contrast(1.3); }
  100% { filter: saturate(1.5) brightness(1.05); }
}

.cycling-filter {
  animation: filterCycle 10s ease-in-out infinite;
}

/* Tailwind custom filter utilities */
<img class="filter-vintage hover:filter-vibrant transition-all duration-300" />`
    }
  ],

  howToUse: {
    title: "How to Use This CSS Filter Generator",
    content: `This CSS filter generator provides visual controls for creating filter effects with real-time preview. Adjust individual filter values, combine multiple filters, preview on sample images, and export production-ready CSS code.

### Selecting Filters

Toggle individual filters on/off:
- **blur:** Gaussian blur effect (0-20px typical)
- **brightness:** Lightness adjustment (0-200%)
- **contrast:** Color contrast (0-200%)
- **grayscale:** Color to grayscale (0-100%)
- **hue-rotate:** Color wheel rotation (0-360deg)
- **invert:** Color inversion (0-100%)
- **opacity:** Transparency (0-100%)
- **saturate:** Color saturation (0-200%)
- **sepia:** Warm sepia tone (0-100%)
- **drop-shadow:** Element shadow

Enable filters you want to use. Disabled filters don't appear in exported CSS.

### Adjusting Filter Values

Use sliders or input fields to set precise values:

**blur:** Pixels of blur radius. 0 = sharp, 5px = slight blur, 20px = heavy blur. Use for frosted glass (10-15px) or loading states (15-20px).

**brightness:** Percentage. 100% = original, < 100% = darker, > 100% = brighter. 90-110% for subtle adjustments, 120-150% for pronounced brightening.

**contrast:** Percentage. 100% = original, < 100% = lower contrast (washed out), > 100% = higher contrast (punchy). 90-110% typical.

**grayscale:** Percentage. 0% = full color, 100% = full grayscale. 50% = half desaturated. Use 100% for disabled states.

**hue-rotate:** Degrees (0-360). Shifts colors around color wheel. 180deg inverts hues. Useful for color variations from single source.

**invert:** Percentage. 0% = original, 100% = fully inverted. Use with hue-rotate for dark mode: invert(1) hue-rotate(180deg).

**saturate:** Percentage. 100% = original, < 100% = muted, > 100% = vibrant. 150-200% for hyper-saturated "pop".

**sepia:** Percentage. 0% = original, 100% = full sepia (warm brown). Vintage photo effect.

### Combining Filters

Stack multiple filters for complex effects. Order matters - different sequences produce different results. Generator shows combined preview in real-time.

Common combinations:
- Vintage: sepia(60%) + brightness(110%) + contrast(90%)
- Dark mode: invert(100%) + hue-rotate(180deg)
- Frosted glass: blur(10px) + brightness(110%) + saturate(120%)
- Disabled: grayscale(100%) + opacity(60%)

Preview updates instantly as you adjust any filter value.

### Testing on Sample Images

Toggle between sample images to test filter on different content:
- Portrait photos
- Landscape photos
- Graphics/illustrations
- UI elements
- Text-heavy images

Filter appearance varies by image content. Verify on representative samples before production use.

### Preview Modes

**Before/After slider:** Drag slider to compare original vs filtered image side-by-side.

**Toggle preview:** Click to quickly switch between original and filtered view.

**Fullscreen preview:** View larger preview to inspect filter detail.

### Copying CSS Code

Click "Copy CSS" to get complete filter property:

\`\`\`css
filter: blur(5px) brightness(1.1) contrast(1.05) saturate(1.2);
\`\`\`

Paste directly into CSS:
\`\`\`css
.my-image {
  filter: blur(5px) brightness(1.1) contrast(1.05) saturate(1.2);
}
\`\`\`

Or inline style:
\`\`\`html
<img src="photo.jpg" style="filter: blur(5px) brightness(1.1);" />
\`\`\`

### Animating Filters

Filters transition smoothly with CSS transitions:

\`\`\`css
.image {
  filter: grayscale(0%);
  transition: filter 0.3s ease;
}

.image:hover {
  filter: grayscale(100%);
}
\`\`\`

Test animation performance on target devices - complex multi-filter animations may stutter on low-end hardware.

### Browser Compatibility

All CSS filters work in modern browsers (Chrome, Firefox, Safari, Edge). backdrop-filter (for frosted glass behind elements) requires separate property with slightly less support.

Check caniuse.com for specific browser versions if supporting older browsers.

### Performance Optimization

Filters are GPU-accelerated but multiple complex filters can impact performance. Optimize:
- Use fewer filters when possible
- Avoid animating blur on large elements
- Test on mobile/low-end devices
- Consider will-change: filter for smoother animations

### Accessibility

High contrast or inverted colors may harm readability. Test filtered text for sufficient contrast (WCAG AA: 4.5:1 minimum).

Provide filter toggle for users sensitive to visual effects. Respect prefers-reduced-motion for animated filters.`,
    steps: [
      {
        name: "Select Filter Type",
        text: "Enable filters you want to use: blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia, drop-shadow. Combine multiple filters for advanced effects."
      },
      {
        name: "Adjust Values",
        text: "Use sliders to fine-tune each filter parameter. See real-time preview of combined effect. Typical ranges: blur 0-20px, brightness/contrast 80-120%, saturate 50-150%."
      },
      {
        name: "Preview on Images",
        text: "Test filter on different sample images (photos, graphics, UI). Verify appearance across varied content. Use before/after slider to compare."
      },
      {
        name: "Copy CSS Code",
        text: "Click Copy to get complete filter property with all active filters. Paste into stylesheet or inline styles. Works with transitions for hover effects."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between filter and backdrop-filter?",
      answer: "filter applies to the element itself (image, div, text). backdrop-filter applies to the background behind a semi-transparent element - creates frosted glass effect. Use filter for image effects, backdrop-filter for glassmorphism overlays. backdrop-filter requires background: rgba() with transparency to show through."
    },
    {
      question: "Why does filter order matter?",
      answer: "Filters process left to right in sequence. grayscale() then brightness() produces different result than brightness() then grayscale(). Example: grayscale(100%) brightness(200%) = bright gray. brightness(200%) grayscale(100%) = same gray (grayscale removes color after brightening). Order affects final appearance - experiment to find desired look."
    },
    {
      question: "How do I create dark mode with CSS filters?",
      answer: "Use invert(1) hue-rotate(180deg) on images and UI elements. Invert flips brightness (light becomes dark), hue-rotate maintains original colors. Example: @media (prefers-color-scheme: dark) { img { filter: invert(1) hue-rotate(180deg); } }. Exclude user photos with :not() selector or class."
    },
    {
      question: "Can I animate CSS filters smoothly?",
      answer: "Yes, with transition: filter 0.3s ease; Simple filters (brightness, grayscale, opacity) animate smoothly. blur animations work but can be expensive - test on target devices. Avoid animating multiple complex filters simultaneously - may cause jank on low-end hardware. Keep transitions under 0.5s for snappy feel."
    },
    {
      question: "What filter values create a vintage photo effect?",
      answer: "Combine sepia(50-60%) + brightness(110-115%) + contrast(85-95%) + saturate(120%). Adjust to taste. sepia adds warm tone, brightness lifts shadows, reduced contrast creates faded look, saturation punches colors. Example: filter: sepia(0.5) brightness(1.1) contrast(0.9) saturate(1.2);"
    },
    {
      question: "How do I blur background when modal opens?",
      answer: "Two approaches: 1) backdrop-filter on overlay: .modal-overlay { backdrop-filter: blur(8px); background: rgba(0,0,0,0.5); } 2) filter on body children: body.modal-open > *:not(.modal) { filter: blur(3px); }. backdrop-filter more performant but less supported. Regular filter works everywhere."
    },
    {
      question: "What's the best way to indicate disabled state with filters?",
      answer: "Combine grayscale(100%) opacity(60%) for classic disabled appearance. Or grayscale(100%) brightness(120%) for lighter feel. Example: .button:disabled { filter: grayscale(1) opacity(0.6); cursor: not-allowed; }. Grayscale removes color, opacity fades, brightness can lighten for softer look."
    },
    {
      question: "Do CSS filters work on SVG elements?",
      answer: "Yes. Apply filter to SVG or individual SVG elements. Useful for icon color variations without creating multiple SVG files. Example: .icon { filter: brightness(0.5); } darkens icon. Or hue-rotate(180deg) for color shifts. Drop-shadow works better than box-shadow for SVG - follows shape contours."
    },
    {
      question: "How do filters affect performance?",
      answer: "Filters are GPU-accelerated - generally performant. Single or double filters have negligible impact. Many filters or animating blur on large elements can cause issues on low-end devices. Optimize: use fewer filters, avoid animating blur on full-page elements, add will-change: filter only during animation. Test on target devices."
    },
    {
      question: "Are my filter designs private when using this tool?",
      answer: "Yes. All filter generation happens client-side in your browser. No filter values, combinations, or CSS code are sent to servers. No tracking, no storage. Safe for proprietary designs or client work. Tool works offline after initial load. Inspect DevTools Network tab - zero outbound requests with your data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your filter designs never leave your browser. This generator operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All filter generation, value adjustments, and CSS code creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your filters. The tool works completely offline after first load.
- **No Data Storage:** Your filter values and combinations are not saved on our servers. Browser localStorage used only for local presets if you save them.
- **No Analytics Tracking:** We don't track which filters you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your filter data.

This makes the tool safe for creating filters for proprietary designs, client-specific effects, or confidential projects. Use with confidence for commercial work.`
  },

  stats: {
    "Filter Types": "10+",
    "Preset Effects": "15+",
    "Browser Support": "99%+",
    "Export Formats": "CSS",
    "Server Uploads": "0"
  }
};
