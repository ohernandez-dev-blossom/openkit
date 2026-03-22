/**
 * Tailwind Class Sorter Tool Guide Content
 * Comprehensive developer guide for sorting Tailwind CSS classes
 */

import type { ToolGuideContent } from "./types";

export const twSortGuideContent: ToolGuideContent = {
  toolName: "Tailwind Class Sorter",
  toolPath: "/tw-sort",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste Tailwind Classes",
      description: "Copy unsorted Tailwind CSS classes from your components and paste into input. Accepts space-separated classes, comma-separated (from array strings), or multiline format. Handles any Tailwind version including custom classes."
    },
    {
      title: "Choose Sorting Strategy",
      description: "Select sorting method: Official Prettier Plugin order (recommended), alphabetical, or custom category order. Prettier Plugin matches official tailwindcss/prettier-plugin-tailwindcss sorting for consistency with automated formatters."
    },
    {
      title: "Sort Classes Automatically",
      description: "Click sort to reorganize classes following selected strategy. Tool maintains proper Tailwind precedence: layout → spacing → typography → colors → effects. Preserved functionality while improving readability and preventing specificity conflicts."
    },
    {
      title: "Copy Sorted Output",
      description: "Copy sorted classes to paste back into code. One-click copy with preserved formatting. Sorted classes improve code review speed, reduce merge conflicts, and make visual structure scannable at a glance."
    }
  ],

  introduction: {
    title: "What is Tailwind Class Sorting?",
    content: `Tailwind class sorting organizes utility classes in consistent, predictable order following established conventions. Sorted classes improve code readability, reduce merge conflicts in version control, and prevent CSS specificity issues caused by class order dependencies.

Software developers using Tailwind CSS encounter unsorted classes in: React/Vue/Svelte components, HTML templates, JSX markup, template literals, class array concatenation, dynamically generated classes, and migrated legacy code. Consistent sorting is essential for maintainable component libraries and scalable design systems.

### Why Class Sorting Matters for Developers

**Code review efficiency:** Unsorted classes make diffs harder to review. Example: adding \`hover:bg-blue-600\` in random position creates noisy diff. With sorted classes, new classes appear in predictable locations, making actual changes obvious. Reviewers scan sorted classes faster - layout properties first, colors last - following learned patterns. Team velocity improves when sorting is automated.

**Merge conflict reduction:** Two developers editing same component's classes create conflicts. Example: one adds \`rounded-lg\`, other adds \`shadow-md\`. Unsorted classes conflict because position varies. Sorted classes reduce conflicts - each category has designated position. Git merge succeeds more often when classes insert at predictable locations. Prettier Plugin for Tailwind enforces sorting automatically on save.

**Visual structure comprehension:** Sorted classes tell story at glance: "This is a flex container (layout) with padding (spacing), large text (typography), blue background (color), and shadow (effects)". Reading order mirrors mental model of CSS cascade. Unsorted \`text-lg bg-blue-500 flex shadow-md p-4\` requires mental reordering. Sorted \`flex p-4 text-lg bg-blue-500 shadow-md\` reads naturally.

**Preventing specificity conflicts:** Tailwind uses CSS specificity, not source order, but some utilities interact. Example: \`bg-blue-500 bg-opacity-50\` must be in this order - opacity modifies background. Sorted classes respect dependencies. Similarly, responsive variants (\`sm:w-full md:w-1/2\`) should group together in breakpoint order for clarity.

**Team consistency:** Without sorting standard, every developer orders classes differently. Code style becomes inconsistent across codebase. Sorting convention (especially Prettier Plugin order) creates shared language. New team members learn "the Tailwind way" faster. Automated sorting via Prettier eliminates bikeshedding about class order.

### Official Prettier Plugin Order

Tailwind's official prettier-plugin-tailwindcss uses this category order:

1. **Layout & Box Model:** \`container\`, \`block\`, \`flex\`, \`grid\`, \`hidden\`, \`relative\`, \`absolute\`
2. **Flexbox & Grid:** \`flex-row\`, \`justify-center\`, \`items-center\`, \`gap-4\`
3. **Spacing:** \`m-4\`, \`p-6\`, \`space-x-2\`, \`inset-0\`
4. **Sizing:** \`w-full\`, \`h-64\`, \`max-w-xl\`, \`min-h-screen\`
5. **Typography:** \`text-lg\`, \`font-bold\`, \`leading-tight\`, \`tracking-wide\`
6. **Backgrounds:** \`bg-blue-500\`, \`bg-gradient-to-r\`, \`bg-opacity-50\`
7. **Borders:** \`border\`, \`border-2\`, \`rounded-lg\`, \`divide-y\`
8. **Effects:** \`shadow-lg\`, \`opacity-75\`, \`blur-sm\`, \`filter\`
9. **Transitions & Animations:** \`transition\`, \`duration-300\`, \`ease-in-out\`, \`animate-spin\`
10. **Transforms:** \`transform\`, \`rotate-45\`, \`scale-110\`, \`translate-x-1\`
11. **Interactivity:** \`cursor-pointer\`, \`select-none\`, \`pointer-events-none\`
12. **SVG:** \`fill-current\`, \`stroke-current\`, \`stroke-2\`
13. **Accessibility:** \`sr-only\`, \`focus-visible\`, \`not-sr-only\`

**Variants order:** Responsive breakpoints (\`sm:\`, \`md:\`, \`lg:\`), then state variants (\`hover:\`, \`focus:\`, \`active:\`), then dark mode (\`dark:\`).

### Sorting Strategies

**Prettier Plugin order (recommended):** Matches official tailwindcss/prettier-plugin-tailwindcss. Industry standard. Integrates with automated formatting. Most projects should use this.

**Alphabetical order:** Simple but not semantic. \`bg-blue-500 border flex p-4 text-lg\` - random visual structure. Easy to implement but loses category grouping benefits. Use only if Prettier Plugin unavailable and consistency more important than semantics.

**Custom category order:** Define your own categories and order. Useful for: team-specific conventions, framework-specific patterns (Headless UI classes first), design system utilities (brand colors grouped). Requires documented convention and tooling to enforce.

**Functional grouping:** Group by component structure: layout classes, then content classes, then interactive classes. Example: \`flex items-center gap-2\` (layout) → \`text-sm font-medium\` (content) → \`hover:bg-gray-100 cursor-pointer\` (interactive). Mirrors semantic HTML structure.

### Integration with Development Workflow

**Prettier Plugin setup:**
\`\`\`bash
npm install -D prettier prettier-plugin-tailwindcss
\`\`\`

\`\`\`json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
\`\`\`

Classes sort automatically on save in VSCode, WebStorm, or any Prettier-supporting editor.

**ESLint plugin:** \`eslint-plugin-tailwindcss\` has \`classnames-order\` rule. Enforces sorting in CI/CD. Fails builds if classes unsorted. Example config:
\`\`\`json
{
  "plugins": ["tailwindcss"],
  "rules": {
    "tailwindcss/classnames-order": "warn"
  }
}
\`\`\`

**Pre-commit hooks:** Use Husky + lint-staged to sort classes before commit. Never commit unsorted classes.

**Component library standards:** Document sorting strategy in style guide. Enforce with tooling. Examples: Tailwind UI, Headless UI, shadcn/ui all use Prettier Plugin order. Match their conventions for consistency.

### Handling Edge Cases

**Dynamic classes:** Conditional classes in templates. Sort each class set:
\`\`\`jsx
className={\`
  flex items-center gap-2
  \${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
  hover:bg-blue-600
\`}
\`\`\`

**Class arrays:** JavaScript/TypeScript arrays. Sort each array string:
\`\`\`ts
const classes = [
  'flex items-center gap-2',
  'rounded-lg border',
  'px-4 py-2',
  'text-sm font-medium'
];
\`\`\`

**Template literals:** Sort within literals:
\`\`\`ts
const buttonClass = \`flex items-center gap-2 \${variant === 'primary' ? 'bg-blue-500 text-white' : ''}\`;
\`\`\`

**Custom classes:** Non-Tailwind classes (custom CSS) typically go last. Example: \`flex items-center gap-2 custom-button-style\`. Separates framework utilities from custom styles.

This tool sorts Tailwind classes following official conventions, improving code consistency and team productivity.`
  },

  useCases: [
    {
      title: "Sort Component Classes for Code Review",
      description: "Sort Tailwind classes in React/Vue components before creating pull request. Sorted classes make reviews faster and diffs cleaner. Reviewers focus on logic changes, not class reordering noise.",
      example: `// Before sorting (hard to review):
function Button({ children, variant = 'primary' }) {
  return (
    <button
      className="text-white hover:bg-blue-600 px-4 bg-blue-500 rounded-lg py-2 font-medium text-sm shadow-md"
    >
      {children}
    </button>
  );
}

// After sorting (clean, scannable):
function Button({ children, variant = 'primary' }) {
  return (
    <button
      className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
    >
      {children}
    </button>
  );
}

// Sorted order reveals structure:
// 1. Shape: rounded-lg
// 2. Background: bg-blue-500
// 3. Spacing: px-4 py-2
// 4. Typography: text-sm font-medium text-white
// 5. Effects: shadow-md
// 6. Interactivity: hover:bg-blue-600

// Pull request diff now shows:
// + rounded-lg
// (instead of random position in unsorted classes)

// Reviewers immediately see:
// - Shape changed to rounded-lg
// - All other visual properties intact`
    },
    {
      title: "Standardize Design System Component Library",
      description: "Enforce consistent class sorting across entire component library. Improves maintainability, reduces onboarding time for new developers, and prevents style inconsistencies as team grows.",
      example: `// Design system Button component with sorted classes:

// ❌ Before: Inconsistent sorting across components
// Button.tsx: "bg-blue-500 text-white px-4 py-2 rounded"
// Card.tsx: "border rounded-lg p-6 bg-white"
// Modal.tsx: "fixed bg-black inset-0 bg-opacity-50"

// ✅ After: Consistent Prettier Plugin sorting

// components/Button.tsx
export function Button({ variant, size, children }) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size]
  ].join(' ');

  return <button className={classes}>{children}</button>;
}

// components/Card.tsx
export function Card({ children }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

// All components follow same order:
// 1. Layout (flex, grid)
// 2. Spacing (padding, margin)
// 3. Sizing (width, height)
// 4. Typography (text size, weight, color)
// 5. Backgrounds
// 6. Borders
// 7. Effects (shadow, opacity)

// Benefits:
// - New developers learn pattern once, apply everywhere
// - Code reviews focus on logic, not style debates
// - Automated tooling (Prettier) maintains consistency
// - Component library feels cohesive`
    },
    {
      title: "Refactor Legacy HTML to Tailwind",
      description: "When migrating from custom CSS to Tailwind, sorting classes makes refactored components consistent with new Tailwind conventions. Eases transition for team and establishes patterns for future development.",
      example: `// Legacy HTML with custom CSS:
<div class="header container-lg custom-shadow primary-bg white-text header-padding">
  <h1>Welcome</h1>
</div>

/* custom.css */
.custom-shadow { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.primary-bg { background-color: #3b82f6; }
.white-text { color: white; }
.header-padding { padding: 1rem 1.5rem; }

// Refactored to Tailwind (unsorted):
<div class="text-white bg-blue-500 shadow-md container px-6 py-4 mx-auto max-w-7xl">
  <h1>Welcome</h1>
</div>

// Refactored with sorted classes:
<div class="container mx-auto max-w-7xl bg-blue-500 px-6 py-4 text-white shadow-md">
  <h1>Welcome</h1>
</div>

// Sorted order reveals CSS architecture:
// container mx-auto max-w-7xl → Layout constraints
// bg-blue-500 → Background color
// px-6 py-4 → Spacing
// text-white → Typography color
// shadow-md → Effect

// Migration benefits:
// - Sorted classes match official Tailwind examples
// - Team learns canonical class order
// - Prettier auto-sorts new classes added during refactor
// - Consistent with Tailwind documentation code samples

// Establish pattern for remaining migrations:
// 1. Convert custom CSS to Tailwind utilities
// 2. Sort classes using tool
// 3. Verify functionality
// 4. Remove custom CSS
// 5. Document new component in design system`
    },
    {
      title: "Prepare Classes for Automated Formatting",
      description: "Sort classes manually before setting up Prettier Plugin to establish baseline. Prevents massive formatting commit when plugin first runs. Eases team transition to automated sorting.",
      example: `// Project without Prettier Plugin:
// 50 components with unsorted classes

// Step 1: Manually sort all existing components
// Use this tool to sort each component's classes
// Commit sorted classes: "chore: sort Tailwind classes"

// components/Card.tsx (before)
<div className="p-4 bg-white rounded shadow-lg border">

// components/Card.tsx (after manual sort)
<div className="rounded border bg-white p-4 shadow-lg">

// components/Button.tsx (before)
<button className="text-white hover:bg-blue-600 bg-blue-500 px-4 py-2">

// components/Button.tsx (after manual sort)
<button className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">

// Step 2: Install Prettier Plugin
npm install -D prettier-plugin-tailwindcss

// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}

// Step 3: Run Prettier on codebase
npx prettier --write "**/*.{js,jsx,ts,tsx}"

// Result: Minimal or no changes!
// Classes already sorted, Prettier finds nothing to fix

// Team transition:
// - No massive formatting commit obscuring git blame
// - Developers see sorted classes before enforcing automation
// - Gradual adjustment to new pattern
// - VSCode auto-formats on save going forward

// Without manual sort first:
// - Prettier formats 50 files at once
// - Giant commit: "+1200 -1200 lines changed"
// - Git blame broken for all formatted lines
// - Hard to review legitimate changes amid formatting noise

// Best practice: Manual sort → Commit → Enable Prettier
// This establishes sorted baseline cleanly`
    }
  ],

  howToUse: {
    title: "How to Use This Tailwind Class Sorter",
    content: `This tool sorts Tailwind CSS utility classes following official conventions. Paste unsorted classes, select sorting strategy, copy sorted output. Supports all Tailwind versions and custom classes.

### Entering Classes to Sort

**Input format:** Paste classes in any format:
- **Space-separated:** \`flex items-center gap-2 bg-blue-500 text-white\`
- **Multiline:** One class per line (from template literals)
- **Comma-separated:** From JavaScript array strings
- **Mixed custom classes:** Tailwind utilities + custom CSS classes

**Handling whitespace:** Tool normalizes whitespace. Extra spaces, newlines, or tabs removed. Output is clean space-separated string.

**Large class strings:** Paste entire component className strings. Tool handles dozens of classes. Useful for complex components with many utilities.

### Selecting Sorting Strategy

**Prettier Plugin order (recommended):**
Matches official tailwindcss/prettier-plugin-tailwindcss. Industry standard. Use this unless you have specific reason for alternative.

Order: Layout → Flexbox/Grid → Spacing → Sizing → Typography → Backgrounds → Borders → Effects → Transitions → Transforms → Interactivity → SVG → Accessibility

Within categories, classes sort by: base utility, then modifiers (responsive, state, dark mode).

**Alphabetical order:**
Simple A-Z sorting. \`bg-blue-500 border flex p-4 rounded text-lg\`. Loses semantic grouping but easy to implement. Use if you need basic consistency without semantic meaning.

**Custom order:**
Define your own category priorities. Requires configuring tool with custom sorting rules. Advanced option for teams with specific conventions.

### Understanding Sort Results

**Sorted output:** Classes reorganized following selected strategy. Original classes preserved, only order changes. Functionality identical, readability improved.

**Category grouping:** Related utilities cluster together. Example:
- Layout: \`flex items-center justify-between\`
- Spacing: \`px-4 py-2 gap-2\`
- Typography: \`text-sm font-medium\`
- Colors: \`bg-blue-500 text-white\`

**Variant ordering:** Responsive breakpoints (\`sm:\`, \`md:\`, \`lg:\`) sort in size order. State variants (\`hover:\`, \`focus:\`) sort by interaction sequence. Dark mode (\`dark:\`) typically last.

Example sorted output:
\`\`\`
flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600
\`\`\`

Reads naturally: "Flex container, centered, gap between items, rounded, blue background, padding, small medium-weight white text, shadow, darkens on hover"

### Copying and Using Sorted Classes

**One-click copy:** Click copy button to grab sorted classes. Paste back into component code.

**Formatting preservation:** Sorted classes remain space-separated single line (standard JSX format). If you need multiline, manually break at category boundaries.

**Custom class handling:** Non-Tailwind classes (custom CSS) typically append after sorted Tailwind utilities. Example: sorted Tailwind classes + \`custom-component-class\`.

### Integrating with Workflow

**Before committing:**
Manually sort classes before creating pull request. Clean diffs, faster reviews.

**During code review:**
Sort classes in review suggestions. Maintain consistency when approving changes.

**Setting up automation:**
After establishing sorted baseline, install Prettier Plugin for automatic sorting on save.

**Migrating legacy code:**
Sort classes when refactoring old components. Modernize class order during updates.

**Teaching new developers:**
Use sorted examples in documentation. Show canonical class order for design system.

### Common Patterns

**Button component:**
\`\`\`
inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
\`\`\`

**Card component:**
\`\`\`
rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md
\`\`\`

**Input field:**
\`\`\`
block w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
\`\`\`

**Modal overlay:**
\`\`\`
fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
\`\`\`

### Best Practices

**Sort early, sort often:** Don't accumulate unsorted classes. Sort as you write or before committing.

**Be consistent:** Choose one strategy (Prettier Plugin recommended) and stick with it team-wide.

**Document convention:** Add sorting strategy to team style guide. New members learn expected order.

**Automate when ready:** Prettier Plugin eliminates manual sorting. Set up after team comfortable with sorted pattern.

**Don't over-optimize:** Sorting improves readability, but perfect sorting isn't critical. Focus on consistency, not perfection.`,
    steps: [
      {
        name: "Paste Classes",
        text: "Copy unsorted Tailwind classes from component and paste into input. Accepts space-separated, multiline, or comma-separated formats."
      },
      {
        name: "Select Strategy",
        text: "Choose sorting method: Prettier Plugin order (recommended, matches official tool), alphabetical, or custom category order."
      },
      {
        name: "Sort Classes",
        text: "Click sort to reorganize classes. Tool groups related utilities and orders by CSS cascade: layout → spacing → typography → colors → effects."
      },
      {
        name: "Copy Output",
        text: "Click copy to grab sorted classes. Paste back into component code. Sorted classes improve readability and reduce merge conflicts."
      }
    ]
  },

  faqs: [
    {
      question: "What order should Tailwind classes be in?",
      answer: "Official recommendation: use tailwindcss/prettier-plugin-tailwindcss order. Categories: Layout → Flexbox/Grid → Spacing → Sizing → Typography → Backgrounds → Borders → Effects → Transitions → Transforms → Interactivity → SVG → Accessibility. This matches industry standard and integrates with automated formatting tools. Most Tailwind UI components and official examples follow this order."
    },
    {
      question: "Why does class order matter in Tailwind?",
      answer: "Three reasons: 1) Readability - sorted classes tell visual story at glance (layout first, colors last mirrors CSS cascade). 2) Consistency - team-wide sorting eliminates debates about order. 3) Tooling - Prettier Plugin auto-sorts, reducing merge conflicts. CSS specificity not affected (all Tailwind utilities have same specificity), but some utilities have dependencies (bg-opacity modifies bg-color, must come after)."
    },
    {
      question: "Should I sort Tailwind classes alphabetically?",
      answer: "Not recommended. Alphabetical sorting loses semantic meaning. Example: 'bg-blue-500 border flex p-4 rounded text-lg' - random visual structure. Prettier Plugin order groups related utilities: 'flex rounded border bg-blue-500 p-4 text-lg' - clear hierarchy. Use alphabetical only if you need basic consistency and Prettier Plugin unavailable. For new projects, use Prettier Plugin order from start."
    },
    {
      question: "How do I enforce sorted classes in my team?",
      answer: "Three-step process: 1) Install prettier-plugin-tailwindcss, auto-sorts on save. 2) Add eslint-plugin-tailwindcss with classnames-order rule, warns on unsorted classes. 3) Pre-commit hook (Husky + lint-staged) sorts classes before commit. Example: 'lint-staged': {'*.{js,jsx,ts,tsx}': 'prettier --write'}. This prevents unsorted classes from ever reaching repository."
    },
    {
      question: "What about custom classes mixed with Tailwind utilities?",
      answer: "Custom CSS classes typically go last, after all Tailwind utilities. Example: 'flex items-center bg-blue-500 px-4 py-2 text-white custom-button-animation'. This separates framework utilities from project-specific styles. Prettier Plugin handles this automatically. If custom class modifies Tailwind utility (like bg-opacity modifying bg-color), place it adjacent to related Tailwind class."
    },
    {
      question: "How do variants (hover, focus, sm) get sorted?",
      answer: "Variants sort within their base utility category, with variant order: responsive breakpoints (sm, md, lg, xl) → state (hover, focus, active) → dark mode. Example: 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 sm:bg-blue-400' becomes 'sm:bg-blue-400 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700'. Responsive variants often come first (mobile-first approach)."
    },
    {
      question: "Can I configure custom sorting order?",
      answer: "Yes, but requires tooling setup. Prettier Plugin uses fixed order (no config). ESLint plugin allows custom rules via config file. For custom order, you'd need to: 1) Define category priority, 2) Map Tailwind utilities to categories, 3) Build or configure sorting tool with rules. Most teams should use Prettier Plugin default order unless strong reason for custom convention."
    },
    {
      question: "Does sorting affect CSS specificity or performance?",
      answer: "No impact on specificity or performance. All Tailwind utilities have equal CSS specificity (single class selector). Browser evaluates all classes regardless of order. Sorting only affects source code readability and developer experience. Exception: some utilities depend on order (bg-opacity after bg-color), but Prettier Plugin handles these dependencies automatically."
    },
    {
      question: "How do I sort classes in template literals or conditional classes?",
      answer: "Sort each class string separately. Template literal: className={\\`flex items-center \\${isActive ? 'bg-blue-500' : 'bg-gray-100'}\\`} - sort both 'flex items-center' and conditional classes. Conditional: className={clsx('flex items-center', isActive && 'bg-blue-500')} - sort each string passed to clsx. Prettier Plugin handles template literals automatically if configured correctly."
    },
    {
      question: "Is my Tailwind class data private?",
      answer: "Yes, all class sorting happens entirely in your browser using client-side JavaScript. No classes are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your code. Safe for sorting classes in confidential projects, proprietary components, or internal design systems. All sorting is local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All Tailwind class sorting happens entirely in your browser using client-side JavaScript. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All sorting uses browser-native JavaScript string manipulation and sorting algorithms. Processing happens locally on your device.
- **No Server Uploads:** We don't have backend servers to process class strings. The tool works completely offline after page load.
- **No Data Storage:** Entered classes and sorted output are not saved, logged, stored in cookies, or transmitted anywhere. Refresh = clear.
- **No Analytics on Content:** We don't track what classes you sort, what components you work on, or any code-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your code.

Safe for sorting classes in confidential projects, proprietary component libraries, internal design systems, or any sensitive codebases. Use with confidence for all Tailwind class sorting needs.`
  },

  stats: {
    "Sorting Speed": "Instant",
    "Strategies": "3",
    "Custom Classes": "Supported",
    "Variants": "Handled",
    "Server Uploads": "0"
  }
};
