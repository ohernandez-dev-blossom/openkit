/**
 * CSS Grid Generator Tool Guide Content
 * Comprehensive developer guide for CSS Grid layout
 */

import type { ToolGuideContent } from "./types";

export const gridGenGuideContent: ToolGuideContent = {
  toolName: "CSS Grid Generator",
  toolPath: "/grid-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Define Grid Dimensions",
      description: "Set number of columns and rows for your grid layout. Choose between fixed (px), flexible (fr units), auto, or percentage-based sizing. Mix unit types for responsive grid systems."
    },
    {
      title: "Adjust Gaps and Spacing",
      description: "Configure gap between grid items using column-gap and row-gap properties. Gaps create visual separation without margin on individual items. Set uniform or different gaps for rows/columns."
    },
    {
      title: "Position Grid Items",
      description: "Click grid cells to define item placement. Span items across multiple columns or rows. Use grid-column and grid-row properties for precise control over item positioning."
    },
    {
      title: "Copy CSS Grid Code",
      description: "Click copy to get complete CSS including grid container properties and optional grid item positioning. Production-ready grid layout code for immediate integration."
    }
  ],

  introduction: {
    title: "What is CSS Grid?",
    content: `CSS Grid is a two-dimensional layout system for web pages, enabling precise control over both rows and columns simultaneously. Unlike Flexbox (one-dimensional), Grid excels at complex layouts with items spanning multiple rows and columns. Grid is the most powerful CSS layout tool for modern web design.

CSS Grid revolutionized web layouts when introduced in 2017. Before Grid, complex layouts required float hacks, tables, or JavaScript. Grid provides native, declarative layout control with cleaner code and better performance.

### Why Developers Need Grid Generators

Grid syntax is powerful but complex. Defining 12-column layouts with specific spans, gaps, and responsive behavior involves intricate CSS. Visual generators provide immediate preview of grid structure, eliminating trial-and-error iteration.

Understanding fr units, track sizing, and grid areas requires practice. Generators handle syntax complexity while designers focus on layout aesthetics. Preview shows exact grid behavior before writing code.

Responsive grid layouts require media queries adjusting columns, gaps, and item spans. Generators help visualize grid transformations across breakpoints, ensuring layouts adapt gracefully to different screens.

Grid container and grid item properties interact in nuanced ways. Generators prevent common mistakes like forgetting display: grid or miscalculating grid-column spans. Generated code follows best practices automatically.

### Grid Fundamental Concepts

**Grid Container:** Parent element with display: grid. Defines grid structure with columns, rows, and gaps. All direct children become grid items.

**Grid Items:** Direct children of grid container. Can span multiple columns/rows using grid-column and grid-row properties.

**Grid Tracks:** Rows or columns of the grid. Sized using px, %, fr units, auto, or minmax().

**Grid Lines:** Dividing lines creating grid structure. Numbered from 1, used to position items precisely.

**Grid Cells:** Intersection of row and column, single unit space. Items can occupy one or multiple cells.

**Grid Areas:** Named regions of grid for semantic item placement. Enables descriptive layouts: header, sidebar, content, footer.

**Gap (Gutter):** Space between grid tracks. Replaces need for margins on individual items. Set with gap, row-gap, column-gap.

### Grid Track Sizing

**Fixed Units (px, rem):** Exact sizes. grid-template-columns: 200px 200px 200px creates three 200px columns. Predictable but not responsive.

**Fractional Units (fr):** Flexible sizing distributing available space. grid-template-columns: 1fr 2fr 1fr creates columns in 1:2:1 ratio. 2fr column takes twice the space of 1fr. Essential for responsive layouts.

**Auto:** Sizes track to content. grid-template-columns: auto 1fr auto creates left/right auto-sized columns with flexible center.

**Percentage (%):** Relative to container width. grid-template-columns: 25% 50% 25% creates quarter-half-quarter layout.

**minmax(min, max):** Constrained flexible sizing. grid-template-columns: minmax(200px, 1fr) creates column at least 200px, grows up to 1fr. Prevents excessive shrinking.

**repeat():** Shorthand for repeated tracks. grid-template-columns: repeat(3, 1fr) creates three equal columns. Cleaner than 1fr 1fr 1fr.

**auto-fill / auto-fit:** Responsive columns without media queries. grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) creates columns that automatically wrap based on available space.

### Grid Item Positioning

Items automatically flow into next available cell. For explicit positioning:

**grid-column:** Specifies column start and end. grid-column: 1 / 3 spans from line 1 to 3 (two columns). Shorthand for grid-column-start and grid-column-end.

**grid-row:** Specifies row start and end. grid-row: 2 / 4 spans rows 2-3.

**span Keyword:** Relative spanning. grid-column: span 2 means span two columns from current position.

**Grid Areas:** Named regions for semantic layouts:

\`\`\`css
grid-template-areas:
  "header header header"
  "sidebar content content"
  "footer footer footer";

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
\`\`\`

### Grid vs Flexbox

**Grid:** Two-dimensional (rows AND columns). Best for overall page layouts, complex component structures, galleries. Control over item placement in both directions.

**Flexbox:** One-dimensional (row OR column). Best for navigation bars, button groups, single-axis layouts. Simpler for basic alignment.

**Use Grid when:** Layout requires precise row and column control, items span multiple tracks, complex page structure.

**Use Flexbox when:** Single-axis alignment, simple navigation, flexible item sizing in one direction.

Many layouts combine both: Grid for page structure, Flexbox for component internals.

### Responsive Grid Layouts

Grid excels at responsive design through multiple strategies:

**auto-fit/auto-fill:** Automatically adjusts column count based on available space. No media queries needed for basic responsiveness.

**Media Queries:** Adjust grid-template-columns, gaps, and spans at breakpoints:

\`\`\`css
.grid { grid-template-columns: 1fr; }
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
\`\`\`

**Fluid Columns with minmax():** grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) creates fluid grid wrapping columns as needed.

### Browser Support

CSS Grid has universal support in modern browsers: Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+. Over 96% global browser support.

Older browsers (IE11 and below) don't support Grid. Provide fallback layout (Flexbox or floats) or use @supports:

\`\`\`css
@supports (display: grid) {
  .layout { display: grid; }
}
\`\`\`

For maximum compatibility, Grid is safe for all projects targeting modern browsers (2017+).`,
  },

  useCases: [
    {
      title: "Responsive Card Grid Layouts",
      description: "Create responsive card grids that automatically adjust column count based on available space. Perfect for product listings, blog posts, image galleries. No media queries required with auto-fit.",
      example: `/* Auto-responsive card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Product grid with fixed columns at breakpoints */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

@media (min-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Masonry-style grid (different heights) */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: 16px;
}

.masonry-item {
  grid-row-end: span var(--span, 20);
}

/* Blog post grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.blog-card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 24px;
}

.blog-meta {
  padding: 0 24px 24px;
  font-size: 0.875rem;
  color: #6b7280;
}

/* React card grid component */
const CardGrid = ({ children, minWidth = 280, gap = 24 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: \`repeat(auto-fit, minmax(\${minWidth}px, 1fr))\`,
      gap: \`\${gap}px\`,
      padding: '24px'
    }}
  >
    {children}
  </div>
);

/* Tailwind card grid */
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
  <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
    Card 1
  </div>
  <!-- More cards -->
</div>`
    },
    {
      title: "Dashboard and App Layouts",
      description: "Build complex application layouts with header, sidebar, content area, and footer using CSS Grid. Grid areas and template-areas provide semantic, maintainable layout structure.",
      example: `/* Classic dashboard layout */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 0;
}

.dashboard-header {
  grid-area: header;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  display: flex;
  align-items: center;
}

.dashboard-sidebar {
  grid-area: sidebar;
  background: #1f2937;
  color: white;
  padding: 24px 16px;
}

.dashboard-main {
  grid-area: main;
  background: #f9fafb;
  padding: 32px;
  overflow-y: auto;
}

.dashboard-footer {
  grid-area: footer;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 0 24px;
  display: flex;
  align-items: center;
}

/* Responsive dashboard (sidebar collapses on mobile) */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "footer";
  }

  .dashboard-sidebar {
    display: none;
  }
}

/* Analytics dashboard with widgets */
.analytics-dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  gap: 24px;
  padding: 24px;
}

.widget-large {
  grid-column: span 2;
  grid-row: span 2;
}

.widget-tall {
  grid-row: span 2;
}

.widget-wide {
  grid-column: span 2;
}

/* Email client layout */
.email-client {
  display: grid;
  grid-template-columns: 200px 300px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "nav header header"
    "nav inbox content";
  height: 100vh;
}

.email-nav {
  grid-area: nav;
  background: #f3f4f6;
  border-right: 1px solid #e5e7eb;
  padding: 16px;
}

.email-inbox {
  grid-area: inbox;
  background: white;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
}

.email-content {
  grid-area: content;
  padding: 32px;
  overflow-y: auto;
}

/* CMS editor layout */
.cms-editor {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "toolbar sidebar"
    "editor sidebar";
  height: 100vh;
  gap: 0;
}

.cms-toolbar {
  grid-area: toolbar;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.cms-editor-area {
  grid-area: editor;
  background: white;
  padding: 32px;
  overflow-y: auto;
}

.cms-sidebar {
  grid-area: sidebar;
  background: #f9fafb;
  border-left: 1px solid #e5e7eb;
  padding: 24px;
  overflow-y: auto;
}

/* Tailwind dashboard utilities */
.dashboard-grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}`
    },
    {
      title: "Image Gallery Grids",
      description: "Create photo galleries with varying item sizes using grid-column and grid-row spans. Highlight featured images by spanning multiple cells while maintaining automatic flow for remaining items.",
      example: `/* Pinterest-style masonry gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 10px;
  gap: 16px;
}

.gallery-item {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.02);
  z-index: 1;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Item spanning based on content height */
.gallery-item.small {
  grid-row-end: span 20;
}

.gallery-item.medium {
  grid-row-end: span 30;
}

.gallery-item.large {
  grid-row-end: span 40;
}

/* Featured image gallery with highlights */
.featured-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 16px;
}

.featured-gallery .featured {
  grid-column: span 2;
  grid-row: span 2;
}

.featured-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Responsive gallery with breakpoints */
.responsive-gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .responsive-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .responsive-gallery {
    grid-template-columns: repeat(3, 1fr);
  }

  .responsive-gallery .featured {
    grid-column: span 2;
    grid-row: span 2;
  }
}

/* Instagram-style square grid */
.square-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 4px;
}

.square-gallery-item {
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.square-gallery-item:hover {
  opacity: 0.8;
}

.square-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Portfolio showcase grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
}

.portfolio-item-1 {
  grid-column: span 3;
  grid-row: span 2;
}

.portfolio-item-2 {
  grid-column: span 3;
  grid-row: span 1;
}

.portfolio-item-3 {
  grid-column: span 2;
  grid-row: span 1;
}

/* Lightbox gallery grid */
.lightbox-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 24px;
}

.lightbox-item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 12px;
  cursor: zoom-in;
}

.lightbox-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.lightbox-item:hover img {
  transform: scale(1.1);
}

/* React gallery component */
const Gallery = ({ images }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    {images.map((image, index) => (
      <div
        key={index}
        className={\`overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105 \${
          index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
        }\`}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
);`
    },
    {
      title: "Form and Data Table Grids",
      description: "Structure complex forms with aligned labels and inputs using Grid. Create responsive data tables that stack on mobile. Grid provides precise control over form field alignment and table column widths.",
      example: `/* Multi-column form grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 20px;
  max-width: 800px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-field.full-width {
  grid-column: span 2;
}

.form-field label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

.form-field input,
.form-field textarea,
.form-field select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Responsive form (single column on mobile) */
@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-field.full-width {
    grid-column: span 1;
  }
}

/* Label-input aligned form */
.form-aligned {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 16px;
  align-items: center;
  max-width: 600px;
}

.form-aligned label {
  font-weight: 600;
  text-align: right;
}

.form-aligned input {
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
}

/* Responsive data table grid */
.table-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  gap: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.table-header,
.table-cell {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.table-header {
  background: #f9fafb;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #6b7280;
}

.table-row {
  display: contents;
}

.table-row:hover .table-cell {
  background: #f3f4f6;
}

/* Stack table on mobile */
@media (max-width: 768px) {
  .table-grid {
    grid-template-columns: 1fr;
  }

  .table-header {
    display: none;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
    font-size: 0.875rem;
    color: #6b7280;
  }
}

/* Complex checkout form grid */
.checkout-form {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  max-width: 1200px;
}

.checkout-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.checkout-summary {
  background: #f9fafb;
  padding: 24px;
  border-radius: 12px;
  align-self: start;
  position: sticky;
  top: 24px;
}

@media (max-width: 1024px) {
  .checkout-form {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .checkout-details {
    grid-template-columns: 1fr;
  }
}

/* React form grid component */
const FormGrid = ({ children }) => (
  <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
    {children}
  </form>
);

const FormField = ({ label, fullWidth, children }) => (
  <div className={\`flex flex-col gap-2 \${fullWidth ? 'md:col-span-2' : ''}\`}>
    <label className="font-semibold text-sm text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

/* Usage */
<FormGrid>
  <FormField label="First Name">
    <input type="text" className="border-2 rounded-lg px-4 py-3" />
  </FormField>
  <FormField label="Last Name">
    <input type="text" className="border-2 rounded-lg px-4 py-3" />
  </FormField>
  <FormField label="Email" fullWidth>
    <input type="email" className="border-2 rounded-lg px-4 py-3" />
  </FormField>
</FormGrid>`
    }
  ],

  howToUse: {
    title: "How to Use This CSS Grid Generator",
    content: `This CSS Grid generator provides visual controls for creating grid layouts with real-time preview. Define grid dimensions, adjust gaps, position items, and export production-ready CSS code.

### Defining Grid Columns and Rows

Specify number of columns and rows using the dimension controls:

**Columns:** 1-12 columns typical. More columns = finer layout control. 12-column grids are industry standard (matches Bootstrap, Tailwind).

**Rows:** Auto-generated based on content, or explicit rows for fixed layouts. Use auto for flowing content, explicit for dashboard layouts.

**Track Sizing:** For each column/row, select unit:
- **fr (fractional):** Flexible, distributes available space. 1fr 2fr 1fr creates 1:2:1 ratio
- **px (pixels):** Fixed size. 200px 300px creates exact widths
- **auto:** Sizes to content
- **% (percentage):** Relative to container
- **minmax():** Constrained flexibility. minmax(200px, 1fr) = minimum 200px, grows to 1fr

Mix units for responsive grids: 250px 1fr 1fr creates fixed sidebar with flexible content columns.

### Adjusting Grid Gaps

Gap controls space between grid tracks (rows/columns):

**Uniform Gap:** Single value applies to both row and column gaps. gap: 24px creates 24px spacing everywhere.

**Different Gaps:** Separate row-gap and column-gap for asymmetric spacing. row-gap: 32px; column-gap: 16px creates wider vertical spacing.

Gaps replace margins on grid items. Cleaner code, automatic spacing between all items.

### Positioning Grid Items

Click grid cells to position items:

**Auto Flow:** Items automatically fill next available cell. Default behavior for most layouts.

**Manual Placement:** Click and drag to specify item position and span:
- **grid-column:** Spans horizontal cells. grid-column: 1 / 3 spans columns 1-2
- **grid-row:** Spans vertical cells. grid-row: 2 / 4 spans rows 2-3
- **span Keyword:** grid-column: span 2 spans two columns from current position

**Featured Items:** Make items span multiple cells for emphasis. Featured blog post spanning 2 columns, product image spanning 2 rows.

### Using Grid Template Areas

For semantic layouts, use named grid areas:

Define areas in container:
\`\`\`css
grid-template-areas:
  "header header"
  "sidebar content"
  "footer footer";
\`\`\`

Assign items to areas:
\`\`\`css
.header { grid-area: header; }
\`\`\`

More maintainable than numeric positioning. Self-documenting code.

### Responsive Grid Layouts

Add breakpoints to adjust grid at different screen sizes:

**Mobile (< 640px):** Single column grid-template-columns: 1fr
**Tablet (640-1024px):** Two columns grid-template-columns: repeat(2, 1fr)
**Desktop (1024px+):** Three+ columns grid-template-columns: repeat(3, 1fr)

Or use auto-fit for automatic responsiveness:
\`\`\`css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
\`\`\`

Columns wrap automatically based on available space. No media queries needed.

### Copying CSS Code

Click "Copy CSS" to get complete grid code:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.grid-item-1 {
  grid-column: span 2;
}
\`\`\`

Includes:
- Container properties (columns, rows, gaps)
- Item positioning (if manually placed)
- Responsive media queries (if defined)

Paste into stylesheet and adjust class names as needed.

### Performance Considerations

CSS Grid is performant - GPU-accelerated layout calculations. Even complex grids render smoothly.

Avoid excessive nesting of grids. Flatten structure when possible for better performance.

Use auto-fit/auto-fill for responsive grids instead of JavaScript resize listeners. Native CSS solution is faster.

### Browser Support

CSS Grid works in all modern browsers (97% global support). Safe for production use.

For IE11 support (deprecated), provide fallback layout or use @supports:

\`\`\`css
@supports (display: grid) {
  .container { display: grid; }
}
\`\`\`

### Accessibility

Maintain logical source order in HTML. Grid visually reorders items but screen readers follow HTML order.

Don't use grid purely for visual reordering if it breaks content flow. Ensure keyboard navigation follows logical tab order.`,
    steps: [
      {
        name: "Define Grid Dimensions",
        text: "Set number of columns (1-12) and rows. Choose track sizing: fr units (flexible), px (fixed), auto (content-based), minmax() (constrained). Mix units for responsive layouts."
      },
      {
        name: "Adjust Gaps",
        text: "Configure gap between tracks using gap, row-gap, column-gap properties. Gaps create spacing without margins on individual items. 16-32px typical for cards/layouts."
      },
      {
        name: "Position Grid Items",
        text: "Click cells to position items. Span items across multiple columns/rows using grid-column and grid-row. Use span keyword for relative positioning. Featured items can span 2+ cells."
      },
      {
        name: "Copy CSS Code",
        text: "Click Copy to get complete CSS including grid container properties and item positioning. Add responsive media queries for mobile/tablet/desktop. Paste into stylesheet."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between fr units and percentages in Grid?",
      answer: "fr (fractional) units distribute available space after fixed-size tracks. 1fr 2fr 1fr creates 1:2:1 ratio of remaining space. Percentages are relative to total container width including gaps. fr units automatically account for gaps. Use fr for flexible layouts, percentages when you need exact proportions including gap space."
    },
    {
      question: "When should I use CSS Grid vs Flexbox?",
      answer: "Use Grid for two-dimensional layouts (rows AND columns) - page layouts, card grids, dashboards. Use Flexbox for one-dimensional layouts (row OR column) - navigation bars, button groups, simple alignment. Grid excels at complex layouts with items spanning multiple tracks. Flexbox better for simple, single-axis layouts. Many designs use both: Grid for overall structure, Flexbox for component internals."
    },
    {
      question: "How do I create responsive grid without media queries?",
      answer: "Use auto-fit or auto-fill with minmax(): grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)). Creates columns that automatically wrap based on available space. Columns shrink to 280px minimum, grow to fill space. Perfect for card grids, image galleries. No breakpoints needed for basic responsive behavior."
    },
    {
      question: "What does grid-template-columns: repeat(3, 1fr) mean?",
      answer: "Creates three equal-width columns. repeat(3, 1fr) is shorthand for 1fr 1fr 1fr. Each column gets 1 fractional unit of available space. Since all are 1fr, they distribute space equally (33.33% each). More concise than writing 1fr three times. Change to repeat(3, 2fr) for same effect - numbers matter as ratio, not absolute values."
    },
    {
      question: "How do I make an item span multiple grid columns?",
      answer: "Use grid-column: span N or grid-column: start / end. Examples: grid-column: span 2 spans two columns from current position. grid-column: 1 / 3 spans from line 1 to 3 (two columns). grid-column: 2 / -1 spans from column 2 to last column. Span is easier for relative sizing, line numbers for absolute positioning."
    },
    {
      question: "What's the difference between gap and margin in Grid?",
      answer: "gap adds space between grid tracks (rows/columns) automatically. Applies to all items without individual styling. margin adds space around individual items, requires styling each item. gap is cleaner for grids - one property creates consistent spacing everywhere. margin still useful for space outside grid container or specific items needing extra space."
    },
    {
      question: "Can I nest CSS Grids?",
      answer: "Yes. Any grid item can itself be a grid container with display: grid. Useful for complex layouts: outer grid for page structure (header, sidebar, content), inner grids for content areas (card grids, form layouts). However, avoid excessive nesting - flatten structure when possible for better performance and simpler code. Consider if Flexbox suffices for inner layouts."
    },
    {
      question: "How do I center items in a Grid cell?",
      answer: "Use justify-items: center (horizontal) and align-items: center (vertical) on grid container to center all items. Or use justify-self and align-self on individual items. Example: justify-items: center; align-items: center; centers all grid items in their cells. For single item: justify-self: center; align-self: center;"
    },
    {
      question: "What browsers support CSS Grid?",
      answer: "All modern browsers: Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+ (all 2017+). 97%+ global browser support. IE11 has partial support with old syntax - not recommended to target. Grid is production-ready for all modern projects. Provide fallback layout or use @supports for maximum compatibility if needed."
    },
    {
      question: "Is my grid layout design private when using this tool?",
      answer: "Yes. All grid generation happens client-side in your browser. No grid dimensions, gaps, item positions, or CSS code are sent to servers. No tracking, no storage. Safe for proprietary layouts or client work. Tool works offline after initial load. Your grid designs never leave your device."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your grid layouts never leave your browser. This generator operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All grid generation, item positioning, and CSS code creation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your grids. The tool works completely offline after first load.
- **No Data Storage:** Your grid configurations are not saved on our servers. Browser localStorage used only for local favorites if you save them.
- **No Analytics Tracking:** We don't track which grids you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your grid data.

This makes the tool safe for creating layouts for proprietary applications, client projects, or confidential work. Use with confidence for commercial projects.`
  },

  stats: {
    "Layout Types": "10+",
    "Column Options": "1-12",
    "Browser Support": "97%+",
    "Export Formats": "CSS",
    "Server Uploads": "0"
  }
};
