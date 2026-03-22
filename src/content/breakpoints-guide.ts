/**
 * Breakpoints Reference Tool Guide Content
 * Comprehensive developer guide for CSS breakpoints and responsive design
 */

import type { ToolGuideContent } from "./types";

export const breakpointsGuideContent: ToolGuideContent = {
  toolName: "Breakpoints Reference",
  toolPath: "/breakpoints",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Browse Framework Breakpoints",
      description: "View standard breakpoint values from popular CSS frameworks (Tailwind, Bootstrap, Material-UI, Foundation). See exact pixel values and naming conventions for each framework."
    },
    {
      title: "Understand Device Contexts",
      description: "Learn which breakpoints correspond to mobile phones (320-767px), tablets (768-1023px), desktops (1024-1439px), and large screens (1440px+). Plan responsive layouts accordingly."
    },
    {
      title: "Copy Breakpoint Code",
      description: "Click to copy media query CSS or framework-specific syntax. Use in stylesheets, Tailwind config, or JavaScript matchMedia logic for responsive behavior."
    },
    {
      title: "Plan Responsive Strategy",
      description: "Use breakpoint reference to establish mobile-first or desktop-first approach. Determine which breakpoints your project needs based on target devices and analytics."
    }
  ],

  introduction: {
    title: "What are CSS Breakpoints?",
    content: `CSS breakpoints are specific viewport widths where website layouts adapt to different screen sizes. Defined in media queries, breakpoints trigger CSS rules that modify layouts, typography, spacing, and component behavior for optimal display on devices from smartphones to large desktop monitors. Breakpoints are fundamental to responsive web design, enabling single codebases to serve all device types.

A breakpoint is typically defined in pixels (768px, 1024px) and used in CSS media queries: @media (min-width: 768px) { ... }. When viewport width crosses a breakpoint threshold, associated CSS rules activate. This allows column counts to change, navigation to collapse into hamburger menus, typography to resize, and components to reflow for each device class.

### Why Developers Need Breakpoint References

Consistency across projects requires standardized breakpoint values. Using ad-hoc values (765px, 789px) creates maintenance nightmares. Industry-standard breakpoints (320px, 768px, 1024px, 1280px, 1920px) align with common device dimensions and CSS frameworks.

Framework integration depends on understanding framework-specific breakpoints. Tailwind uses sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px. Bootstrap uses 576px, 768px, 992px, 1200px. Mixing frameworks or custom breakpoints requires awareness of these standards.

Responsive testing requires knowing which breakpoints to test. Browser DevTools responsive mode uses breakpoint presets. QA teams test at standard breakpoints (375px mobile, 768px tablet, 1440px desktop). Understanding standard breakpoints focuses testing efforts efficiently.

Design handoff from Figma/Sketch assumes breakpoint knowledge. Designers create mockups at standard widths (375px mobile, 1440px desktop). Developers translate designs into media queries at documented breakpoints. Misalignment causes implementation confusion.

### Common Breakpoint Systems

**Tailwind CSS (Mobile-First):**
- sm: 640px (small tablets, large phones landscape)
- md: 768px (tablets portrait)
- lg: 1024px (tablets landscape, small laptops)
- xl: 1280px (laptops, desktops)
- 2xl: 1536px (large desktops, monitors)

**Bootstrap 5 (Mobile-First):**
- sm: 576px (landscape phones)
- md: 768px (tablets)
- lg: 992px (desktops)
- xl: 1200px (large desktops)
- xxl: 1400px (extra large desktops)

**Material Design (Google):**
- Small: 600px (phones)
- Medium: 960px (tablets, small laptops)
- Large: 1280px+ (desktops, large laptops)

**Foundation (Zurb):**
- small: 0px (mobile first)
- medium: 640px
- large: 1024px
- xlarge: 1200px
- xxlarge: 1440px

### Mobile-First vs Desktop-First

**Mobile-First (Recommended):** Base styles target mobile (smallest screens). Use min-width media queries to progressively enhance for larger screens. Starts with essential content, adds complexity as screen size increases. Better for performance (less CSS sent to mobile).

Example: @media (min-width: 768px) { /* tablet styles */ }

**Desktop-First (Legacy):** Base styles target desktop. Use max-width media queries to adapt down to smaller screens. Requires overriding desktop complexity for mobile. Less performant, harder to maintain.

Example: @media (max-width: 767px) { /* mobile styles */ }

Modern development favors mobile-first. Majority of web traffic is mobile. Designing for constraints (small screens) first ensures core functionality. Desktop becomes enhancement rather than baseline.

### Choosing Breakpoints

**Content-Based vs Device-Based:** Content-based breakpoints respond to when your specific content needs layout changes. Device-based breakpoints match common device widths. Hybrid approach: use device-based standards (768px, 1024px) but add content-specific breakpoints where layout naturally breaks.

**Number of Breakpoints:** More breakpoints = more maintenance. Start with 3-4 (mobile, tablet, desktop, large desktop). Add more only if necessary. Every breakpoint multiplies CSS complexity.

**Common Breakpoint Values:**
- 320px: Small phones (minimum)
- 375px: iPhone 6/7/8/X (portrait)
- 480px: Large phones (landscape)
- 640px: Small tablets, large phones
- 768px: Tablets (portrait) - MAJOR breakpoint
- 1024px: Tablets (landscape), small laptops - MAJOR breakpoint
- 1280px: Laptops, desktops - MAJOR breakpoint
- 1440px: Large desktops
- 1920px: Full HD monitors
- 2560px: 2K/4K monitors

### Breakpoints in CSS

**Min-Width (Mobile-First):**
/* Base mobile styles */
.container { width: 100%; padding: 16px; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { width: 750px; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { width: 960px; }
}

**Max-Width (Desktop-First):**
/* Base desktop styles */
.container { width: 1200px; }

/* Tablet and down */
@media (max-width: 1023px) {
  .container { width: 100%; }
}

/* Mobile and down */
@media (max-width: 767px) {
  .container { padding: 8px; }
}

**Range Queries (Target Specific Range):**
/* Only tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar { width: 250px; }
}

### Framework-Specific Breakpoint Usage

**Tailwind CSS (Utility Classes):**
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width mobile, half tablet, third desktop -->
</div>

Tailwind breakpoints are mobile-first prefixes. Unprefixed classes apply to all sizes. Prefixed classes (md:, lg:) apply at that breakpoint and up.

**Bootstrap (Grid Classes):**
<div class="col-12 col-md-6 col-lg-4">
  <!-- 12 columns mobile, 6 tablet, 4 desktop -->
</div>

Bootstrap uses column classes with breakpoint infixes. col-12 (full width mobile), col-md-6 (half width at md+).

**Custom Breakpoints in Frameworks:**

Tailwind config:
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px', // custom
    },
  },
}

### JavaScript and Breakpoints

**matchMedia API:**
const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

if (isDesktop) {
  // Desktop-specific JS logic
}

**Responsive Event Listeners:**
const mediaQuery = window.matchMedia('(min-width: 768px)');

function handleTabletChange(e) {
  if (e.matches) {
    // Viewport is >= 768px
  } else {
    // Viewport is < 768px
  }
}

mediaQuery.addEventListener('change', handleTabletChange);
handleTabletChange(mediaQuery); // Initial check

**React Hooks for Breakpoints:**
const useBreakpoint = (breakpoint) => {
  const [matches, setMatches] = useState(
    window.matchMedia(\`(min-width: \${breakpoint}px)\`).matches
  );

  useEffect(() => {
    const media = window.matchMedia(\`(min-width: \${breakpoint}px)\`);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [breakpoint]);

  return matches;
};

// Usage
const isDesktop = useBreakpoint(1024);

### Container Queries (New Standard)

Container queries allow components to respond to their parent container's size, not viewport width. More flexible than media queries for component-based designs.

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 1fr; }
}

Support growing in modern browsers (Chrome 105+, Safari 16+). Future of responsive component design.

### Testing Breakpoints

**Browser DevTools:** Chrome/Firefox DevTools responsive mode includes presets for common device sizes. Test at each major breakpoint.

**Real Devices:** Test on actual phones, tablets, laptops when possible. Simulators miss touch interactions and performance realities.

**Automated Testing:** Playwright/Cypress support viewport size configuration for testing layouts at different breakpoints.

**Visual Regression:** Percy, Chromatic - screenshot testing at multiple breakpoints catches layout bugs.`
  },

  useCases: [
    {
      title: "Responsive Grid Layout Adaptation",
      description: "Implement responsive grid systems that adapt column counts at different breakpoints. Single column on mobile, 2-3 columns on tablet, 4+ columns on desktop. Essential for product catalogs, image galleries, and card layouts.",
      example: `/* Mobile-first responsive grid */
.grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column mobile */
  gap: 16px;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

/* Large desktop: 4 columns */
@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Tailwind CSS approach */
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {items.map(item => (
    <div class="bg-white p-4 rounded-lg shadow">{item.content}</div>
  ))}
</div>

/* React component with responsive columns */
const ResponsiveGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {children}
  </div>
);

/* CSS Grid auto-fill (responsive without media queries) */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
/* Automatically adds columns as space allows */`
    },
    {
      title: "Navigation Collapse/Expansion",
      description: "Transform navigation from full horizontal menu on desktop to collapsed hamburger menu on mobile. Standard pattern for responsive header navigation, ensuring usability across all device sizes.",
      example: `/* Desktop navigation (visible by default) */
.nav {
  display: flex;
  gap: 24px;
}

.nav-toggle {
  display: none; /* Hide hamburger on desktop */
}

.nav-menu {
  display: flex;
  gap: 24px;
}

/* Tablet and mobile: collapse navigation */
@media (max-width: 1023px) {
  .nav-toggle {
    display: block; /* Show hamburger icon */
  }

  .nav-menu {
    display: none; /* Hide menu by default */
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .nav-menu.active {
    display: flex; /* Show when hamburger clicked */
  }
}

/* React responsive navigation */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useBreakpoint(1024);

  return (
    <nav className="nav">
      {!isDesktop && (
        <button onClick={() => setIsOpen(!isOpen)} className="nav-toggle">
          <HamburgerIcon />
        </button>
      )}

      <div className={\`nav-menu \${isOpen || isDesktop ? 'active' : ''}\`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
};

/* Tailwind navigation */
<nav class="flex items-center justify-between p-4">
  <div class="text-xl font-bold">Logo</div>

  {/* Hamburger icon (mobile only) */}
  <button class="lg:hidden">
    <svg>...</svg>
  </button>

  {/* Navigation links (desktop: visible, mobile: hidden) */}
  <div class="hidden lg:flex gap-6">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </div>
</nav>`
    },
    {
      title: "Typography Scaling Across Devices",
      description: "Scale font sizes, line heights, and spacing responsively for optimal readability on each device class. Larger type on desktop with more space, compact type on mobile to fit more content within limited viewport.",
      example: `/* Base mobile typography */
:root {
  --font-size-h1: 28px;
  --font-size-h2: 24px;
  --font-size-body: 16px;
  --line-height-base: 1.5;
}

h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
body { font-size: var(--font-size-body); line-height: var(--line-height-base); }

/* Tablet: slightly larger */
@media (min-width: 768px) {
  :root {
    --font-size-h1: 36px;
    --font-size-h2: 28px;
    --font-size-body: 17px;
    --line-height-base: 1.6;
  }
}

/* Desktop: full size */
@media (min-width: 1024px) {
  :root {
    --font-size-h1: 48px;
    --font-size-h2: 32px;
    --font-size-body: 18px;
    --line-height-base: 1.7;
  }
}

/* Tailwind responsive typography */
<h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
  Responsive Heading
</h1>

<p class="text-base md:text-lg lg:text-xl leading-relaxed">
  Body text that scales appropriately across devices.
</p>

/* Fluid typography (no breakpoints, smooth scaling) */
h1 {
  font-size: clamp(28px, 5vw, 64px);
  /* Min 28px, max 64px, scales with viewport */
}

/* Tailwind config for custom typography scale */
module.exports = {
  theme: {
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    }
  }
};`
    },
    {
      title: "Sidebar Layout Transformations",
      description: "Convert multi-column layouts with sidebars into single-column stacked layouts on mobile. Desktop shows content + sidebar side-by-side, mobile stacks them vertically with sidebar repositioned or hidden behind toggle.",
      example: `/* Desktop layout: sidebar + main content */
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.sidebar {
  background: white;
  padding: 24px;
  border-radius: 8px;
}

.main-content {
  background: white;
  padding: 32px;
  border-radius: 8px;
}

/* Tablet: narrower sidebar */
@media (max-width: 1023px) {
  .layout {
    grid-template-columns: 200px 1fr;
    gap: 16px;
  }
}

/* Mobile: stack vertically */
@media (max-width: 767px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }

  .sidebar {
    order: 2; /* Move sidebar below content */
  }

  .main-content {
    order: 1;
  }
}

/* Alternative: Hide sidebar on mobile, show in drawer */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    left: -250px;
    top: 0;
    bottom: 0;
    width: 250px;
    transition: left 0.3s;
    z-index: 1000;
  }

  .sidebar.open {
    left: 0;
  }

  .layout {
    grid-template-columns: 1fr;
  }
}

/* React responsive layout */
const ResponsiveLayout = ({ sidebar, children }) => {
  const isDesktop = useBreakpoint(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {isDesktop ? (
        <>
          <aside className="sidebar">{sidebar}</aside>
          <main className="main-content">{children}</main>
        </>
      ) : (
        <>
          <button onClick={() => setSidebarOpen(true)}>
            Open Sidebar
          </button>
          <main className="main-content">{children}</main>
          {sidebarOpen && (
            <Drawer onClose={() => setSidebarOpen(false)}>
              {sidebar}
            </Drawer>
          )}
        </>
      )}
    </div>
  );
};

/* Tailwind responsive layout */
<div class="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 lg:gap-8 p-4 lg:p-8">
  <aside class="bg-white p-6 rounded-lg order-2 lg:order-1">
    Sidebar content
  </aside>
  <main class="bg-white p-8 rounded-lg order-1 lg:order-2">
    Main content
  </main>
</div>`
    }
  ],

  howToUse: {
    title: "How to Use This Breakpoints Reference",
    content: `This breakpoints reference provides quick lookup for standard breakpoint values used in popular CSS frameworks and responsive design patterns. Browse framework-specific breakpoints, understand device contexts, and copy media query code for implementation.

### Browsing Framework Breakpoints

Select a framework (Tailwind, Bootstrap, Material-UI, Foundation) to view its standard breakpoint values. Each entry shows:
- Breakpoint name/identifier (sm, md, lg, etc.)
- Pixel value (640px, 768px, 1024px, etc.)
- Target device class (phones, tablets, desktops)
- Usage notes (mobile-first min-width or desktop-first max-width)

Compare breakpoints across frameworks to understand differences when migrating projects or choosing a framework.

### Understanding Device Contexts

Breakpoints map to device classes based on common screen widths:
- **Mobile Phones (< 768px):** 320px-767px range
- **Tablets (768px - 1023px):** Portrait and landscape tablets
- **Laptops/Desktops (1024px - 1439px):** Standard desktop screens
- **Large Displays (1440px+):** High-resolution monitors

Use device context to plan how many breakpoints you need and where layout changes should occur.

### Copying Breakpoint Code

Click any breakpoint to copy relevant code:
- **CSS Media Query:** @media (min-width: 768px) { ... }
- **Framework Syntax:** Tailwind classes (md:), Bootstrap infixes (col-md-)
- **JavaScript matchMedia:** window.matchMedia('(min-width: 768px)')

Copied code is ready for immediate use in stylesheets, config files, or JavaScript logic.

### Choosing a Breakpoint Strategy

**Mobile-First (Recommended):**
- Base styles target smallest screens
- Use min-width media queries to enhance for larger screens
- Better performance, easier to maintain
- Supported by: Tailwind, Bootstrap 5, Material-UI

**Desktop-First (Legacy):**
- Base styles target desktop
- Use max-width media queries to adapt down
- Common in older projects
- Harder to maintain, worse mobile performance

Most modern projects should use mobile-first approach.

### Implementing Breakpoints in CSS

**Mobile-First Min-Width:**
/* Base mobile styles */
.container { padding: 16px; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 24px; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { padding: 32px; }
}

**Desktop-First Max-Width:**
/* Base desktop styles */
.container { padding: 32px; }

/* Tablet and down */
@media (max-width: 1023px) {
  .container { padding: 24px; }
}

/* Mobile and down */
@media (max-width: 767px) {
  .container { padding: 16px; }
}

### Framework-Specific Usage

**Tailwind CSS:**
Breakpoints are utility class prefixes. Apply mobile styles unprefixed, larger screens with breakpoint prefixes:

<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width mobile, half tablet, third desktop -->
</div>

**Bootstrap:**
Use column classes with breakpoint infixes:

<div class="col-12 col-md-6 col-lg-4">
  <!-- 12 columns mobile, 6 tablet, 4 desktop -->
</div>

**CSS Modules/Styled Components:**
Import breakpoint values from shared constants:

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px'
};

const Container = styled.div\`
  padding: 16px;

  @media (min-width: \${breakpoints.md}) {
    padding: 24px;
  }
\`;

### Testing Breakpoints

**Browser DevTools:**
Open responsive mode (F12 → toggle device toolbar). Select device presets or enter custom dimensions. Test at each major breakpoint.

**Real Devices:**
Test on actual phones, tablets, laptops when possible. Simulators miss touch interactions and device-specific quirks.

**Automated Testing:**
Configure viewport sizes in Playwright/Cypress tests:

// Playwright
await page.setViewportSize({ width: 768, height: 1024 });

// Cypress
cy.viewport(768, 1024);

### Customizing Breakpoints

Most frameworks allow custom breakpoint configuration:

**Tailwind tailwind.config.js:**
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px', // custom
    },
  },
}

**Bootstrap $grid-breakpoints:**
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  custom: 1600px // custom
);

### Best Practices

1. **Use Standard Values:** Stick to framework standards (768px, 1024px) for consistency
2. **Limit Breakpoints:** Start with 3-4, add more only if necessary
3. **Test Early:** Test responsive behavior as you build, not at the end
4. **Content-Driven:** Add breakpoints where content naturally breaks, not arbitrary
5. **Mobile-First:** Build for small screens first, enhance for larger screens`,
    steps: [
      {
        name: "Browse Framework Breakpoints",
        text: "Select a framework (Tailwind, Bootstrap, Material-UI) to view standard breakpoint values. See pixel values, naming conventions, and device contexts.",
      },
      {
        name: "Understand Device Mapping",
        text: "Learn which breakpoints correspond to mobile (< 768px), tablet (768-1023px), desktop (1024-1439px), and large screens (1440px+).",
      },
      {
        name: "Copy Breakpoint Code",
        text: "Click any breakpoint to copy media query CSS, framework syntax, or JavaScript matchMedia code. Ready for immediate use in projects.",
      },
      {
        name: "Plan Responsive Strategy",
        text: "Use reference to establish mobile-first or desktop-first approach. Determine which breakpoints your project needs based on target devices.",
      }
    ]
  },

  faqs: [
    {
      question: "What are the standard CSS breakpoints I should use?",
      answer: "Industry-standard breakpoints are 768px (tablets), 1024px (desktops), and 1280px (large desktops). Mobile is < 768px. These align with Tailwind (640/768/1024/1280/1536), Bootstrap (576/768/992/1200/1400), and common device dimensions. Use these standards for consistency and framework compatibility. Custom breakpoints are acceptable but make maintenance harder."
    },
    {
      question: "Should I use mobile-first or desktop-first media queries?",
      answer: "Mobile-first is strongly recommended for modern development. Base styles target mobile (smallest screens), use min-width media queries to enhance for larger screens. Benefits: better performance (less CSS to mobile), easier maintenance, aligns with mobile-majority traffic. Desktop-first (max-width queries) is legacy approach - harder to maintain, worse mobile performance. All modern frameworks (Tailwind, Bootstrap 5) use mobile-first."
    },
    {
      question: "How many breakpoints should my website have?",
      answer: "Start with 3-4 breakpoints: mobile (< 768px), tablet (768px+), desktop (1024px+), optional large desktop (1280px+ or 1440px+). More breakpoints = more complexity and maintenance. Add additional breakpoints only where content naturally breaks or design specifically requires them. Most projects work perfectly with 3 well-chosen breakpoints."
    },
    {
      question: "What's the difference between Tailwind and Bootstrap breakpoints?",
      answer: "Tailwind uses 640/768/1024/1280/1536px (sm/md/lg/xl/2xl). Bootstrap uses 576/768/992/1200/1400px (sm/md/lg/xl/xxl). Both are mobile-first. Tailwind breakpoints align better with modern device dimensions (1024px for tablets landscape, 1280px for laptops). Bootstrap's 992px is legacy desktop standard. Both work well - choose based on framework preference, not breakpoint values."
    },
    {
      question: "How do I test my website at different breakpoints?",
      answer: "Use browser DevTools responsive mode (F12 → toggle device toolbar). Test at major breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large). Select device presets (iPhone, iPad, etc.) or enter custom widths. Test on real devices when possible - simulators miss touch interactions and performance realities. Automated testing: configure viewport sizes in Playwright/Cypress."
    },
    {
      question: "Can I use custom breakpoints instead of framework standards?",
      answer: "Yes, but use sparingly. Custom breakpoints add maintenance burden and confuse teams familiar with standards. If content truly breaks at non-standard widths, add custom breakpoint as needed. Otherwise, stick to framework standards (768px, 1024px) for consistency. Most frameworks allow custom breakpoint configuration in config files while maintaining standard naming."
    },
    {
      question: "What is min-width vs max-width in media queries?",
      answer: "min-width (mobile-first): Styles apply when viewport is AT LEAST that width and larger. Example: @media (min-width: 768px) applies to tablet, desktop, everything >= 768px. max-width (desktop-first): Styles apply when viewport is AT MOST that width and smaller. Example: @media (max-width: 767px) applies to mobile, everything <= 767px. Use min-width for mobile-first (recommended)."
    },
    {
      question: "How do breakpoints work in Tailwind CSS?",
      answer: "Tailwind uses mobile-first breakpoint prefixes: sm:, md:, lg:, xl:, 2xl:. Unprefixed utilities apply to all sizes. Prefixed utilities apply at that breakpoint and up. Example: 'w-full md:w-1/2 lg:w-1/3' = full width mobile, half tablet, third desktop. All breakpoints are min-width. Configure custom breakpoints in tailwind.config.js screens object."
    },
    {
      question: "Should I design for specific devices or breakpoints?",
      answer: "Design for breakpoint ranges (mobile, tablet, desktop), not specific devices (iPhone 12, iPad Pro). Device dimensions constantly change with new releases. Breakpoints represent device classes and are stable. Test on popular devices but design for responsive ranges. Breakpoints ensure your design works on current AND future devices within each class."
    },
    {
      question: "Is my breakpoint reference data private when using this tool?",
      answer: "Yes. This reference is entirely client-side - no data is sent to servers. All framework breakpoint information is static data displayed in your browser. Safe for researching breakpoints for proprietary projects. No tracking, no storage. The tool works offline after initial load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This breakpoints reference operates entirely client-side in your browser. There is no data transmission, no backend processing, and no tracking.

### Privacy Guarantees

- **100% Client-Side Reference:** All breakpoint information is static data displayed in your browser.
- **No Server Communication:** No breakpoint values or framework preferences are sent to servers.
- **No Data Storage:** We don't save which breakpoints you reference or frameworks you select.
- **No Analytics Tracking:** We don't track which frameworks you browse or how often you use the tool.
- **Works Offline:** After initial page load, the reference works completely offline with no network requests.

This makes the tool safe for researching breakpoints for proprietary projects, client work, or confidential designs. Use with confidence for commercial and personal projects.`
  },

  stats: {
    "Frameworks Covered": "6+",
    "Standard Breakpoints": "20+",
    "Device Classes": "4",
    "Code Examples": "CSS/JS/Tailwind",
    "Server Uploads": "0"
  }
};
