import type { ToolGuideContent } from "./types";

export const flexboxGuideContent: ToolGuideContent = {
  toolName: "CSS Flexbox Playground",
  toolPath: "/flexbox",
  lastUpdated: "2026-02-07",
  version: "2.0",

  quickStartSteps: [
    { title: "Set Container Properties", description: "Configure the flex container: choose flex-direction, justify-content, align-items, flex-wrap, and gap. See changes reflected instantly." },
    { title: "Add & Configure Items", description: "Add flex items and set individual properties like flex-grow, flex-shrink, flex-basis, order, and align-self." },
    { title: "Preview the Layout", description: "Watch the live preview update in real-time as you adjust properties. Resize to test responsive behavior." },
    { title: "Copy the CSS Code", description: "Copy the generated CSS code for both the container and individual items. Use it directly in your project." }
  ],

  introduction: {
    title: "What is CSS Flexbox?",
    content: `CSS Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. It provides powerful alignment and distribution capabilities.

### Key Concepts

- **Flex Container:** The parent element with \`display: flex\`. Controls the overall flow and alignment.
- **Flex Items:** Direct children of a flex container with individual sizing and alignment properties.
- **Main Axis:** The primary axis along which items are laid out (horizontal for row, vertical for column).
- **Cross Axis:** The perpendicular axis.

### Why Use Flexbox?

- **Centering:** Vertically and horizontally center elements easily.
- **Equal-height columns:** Items in a row naturally stretch to equal height.
- **Dynamic spacing:** Distribute space evenly between items.
- **Responsive reordering:** Change visual order without changing HTML.
- **Flexible sizing:** Items grow and shrink proportionally.

### Flexbox vs Grid

Flexbox is one-dimensional (row OR column), while CSS Grid is two-dimensional (rows AND columns). Use Flexbox for component-level layouts and Grid for page-level layouts.`
  },

  useCases: [
    { title: "Navigation Bars", description: "Build responsive navbars with logo, links, and actions using justify-content: space-between and align-items: center." },
    { title: "Card Layouts", description: "Create flexible card grids with flex-wrap, equal-height cards, and consistent spacing with gap." },
    { title: "Form Layouts", description: "Align form labels and inputs, distribute form actions, and create responsive forms that stack on mobile." },
    { title: "Centering Content", description: "Perfectly center content with display: flex, justify-content: center, and align-items: center." }
  ],

  howToUse: {
    title: "How to Use the Flexbox Playground",
    content: `This interactive playground lets you experiment with every CSS Flexbox property and see results in real-time.

1. **Container properties** — Set flex-direction, justify-content, align-items, flex-wrap, and gap.
2. **Item properties** — Click any flex item to configure its flex-grow, flex-shrink, flex-basis, order, and align-self.
3. **Add/remove items** — Test different layouts with varying numbers of items.
4. **Copy CSS** — Copy the complete CSS for the container and items.`,
    steps: [
      { name: "Set flex-direction", text: "Choose row (horizontal) or column (vertical) as the main axis direction" },
      { name: "Configure alignment", text: "Set justify-content for main axis and align-items for cross axis alignment" },
      { name: "Add flex items", text: "Add items and set individual flex-grow, flex-shrink, and flex-basis values" },
      { name: "Copy generated CSS", text: "Copy the complete flexbox CSS code for use in your project" }
    ]
  },

  faqs: [
    { question: "When should I use Flexbox vs CSS Grid?", answer: "Use Flexbox for one-dimensional layouts (a single row or column) — navbars, button groups, card rows. Use CSS Grid for two-dimensional layouts — page layouts, dashboards, complex forms." },
    { question: "What does flex: 1 mean?", answer: "flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%. It means the item will grow to fill available space equally with other flex: 1 items." },
    { question: "How do I center a div with Flexbox?", answer: "Set the parent to display: flex; justify-content: center; align-items: center; height: 100vh; — this centers the child both horizontally and vertically." },
    { question: "What's the difference between align-items and align-content?", answer: "align-items aligns items within a single flex line. align-content distributes space between multiple lines when flex-wrap is enabled." },
    { question: "Is the generated code production-ready?", answer: "Yes. The playground generates standard CSS supported by all modern browsers. No vendor prefixes needed." }
  ],

  security: {
    title: "Privacy & Security",
    content: `This tool runs entirely in your browser. No CSS code or layout configurations are sent to any server. All rendering and code generation happens client-side.`
  },

  stats: {
    "Flexbox Properties": "12+ container & item properties",
    "Browser Support": "All modern browsers",
    "Code Output": "Pure CSS (no dependencies)",
    "Processing": "100% client-side"
  }
};
