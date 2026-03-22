/**
 * SVG to JSX Converter Tool Guide Content
 * Comprehensive developer guide for SVG React component conversion
 */

import type { ToolGuideContent } from "./types";

export const svgToJsxGuideContent: ToolGuideContent = {
  toolName: "SVG to JSX Converter",
  toolPath: "/svg-to-jsx",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Paste SVG Code",
      description: "Copy SVG markup from design tools (Figma, Sketch, Illustrator) or icon libraries and paste into the input textarea. The tool accepts any valid SVG markup including complex paths, groups, gradients, and filters."
    },
    {
      title: "Configure Conversion Options",
      description: "Toggle options: Wrap in Component (creates React function component), Component Name (default SvgIcon), TypeScript (adds type definitions), Spread Props (adds ...props to <svg>), Remove Dimensions (removes width/height for flexibility)."
    },
    {
      title: "Review Converted JSX",
      description: "Output shows converted JSX with class→className, kebab-case→camelCase attributes, style strings→objects, and self-closing tags. Code is syntax-highlighted and ready to copy."
    },
    {
      title: "Copy and Integrate",
      description: "Click Copy button to copy converted code. Paste into React/Next.js components. The converted code works immediately without modifications. TypeScript types are included if enabled."
    }
  ],

  introduction: {
    title: "Why Convert SVG to JSX?",
    content: `SVG (Scalable Vector Graphics) is the standard format for vector graphics on the web, but using SVG in React applications requires converting HTML-style SVG markup to JSX-compatible syntax. React's JSX has different syntax rules than HTML: class becomes className, style attributes must be JavaScript objects, and attribute names use camelCase instead of kebab-case. Manual conversion is error-prone and tedious, especially for complex SVG with dozens of attributes. This SVG to JSX converter automates the transformation, converting SVG files from design tools into React-ready components in seconds.

Design tools like Figma, Sketch, Adobe Illustrator, and Inkscape export SVG files using HTML syntax optimized for browsers, not React. When you copy SVG markup from these tools and paste directly into JSX, you encounter errors: "className" instead of "class", "strokeWidth" instead of "stroke-width", and style objects instead of style strings. These syntax differences break React rendering and require manual find-and-replace operations across potentially hundreds of attributes.

### SVG to JSX Conversion Requirements

**Class Attribute:** HTML SVG uses \`class="icon"\`. JSX requires \`className="icon"\`. React reserves "class" as keyword for ES6 classes, so JSX uses className for CSS classes. Simple find-replace works but must handle multiple classes and edge cases.

**Attribute Case Conversion:** SVG attributes use kebab-case (stroke-width, fill-opacity, clip-path). JSX requires camelCase (strokeWidth, fillOpacity, clipPath). Dozens of SVG attributes need conversion: stroke-linecap → strokeLinecap, font-family → fontFamily, text-anchor → textAnchor.

**Style Attribute:** HTML SVG uses style strings: \`style="fill: red; stroke: blue"\`. JSX requires style objects: \`style={{ fill: 'red', stroke: 'blue' }}\`. Style conversion involves parsing CSS, converting property names to camelCase, and wrapping values in quotes.

**Self-Closing Tags:** HTML SVG allows unclosed tags: \`<path d="..."></path>\` can be \`<path d="...">\`. JSX requires proper self-closing: \`<path d="..." />\`. Path, circle, rect, line, and other empty elements must self-close.

**Namespace Attributes:** SVG uses XML namespaces: xmlns:xlink, xlink:href. React handles namespaces automatically in most cases but some attributes need special handling. Conversion tools handle these edge cases correctly.

### Component Wrapping Benefits

**Reusability:** Converting SVG to React components makes icons reusable across applications. Import once, use everywhere. Props allow dynamic styling: \`<Icon color="red" size={24} />\`. Component approach is more maintainable than inline SVG markup repeated across files.

**Prop Spreading:** Adding \`{...props}\` to <svg> element allows passing custom attributes: className, onClick, style, aria-label. Makes components flexible without hardcoding all possible props. Users can extend components with any valid SVG attributes.

**TypeScript Support:** TypeScript SVG components provide autocomplete for props, type checking for attribute values, and catch errors at compile time. SVGProps<SVGSVGElement> type includes all valid SVG attributes plus React-specific props.

**Dynamic Sizing:** Removing width/height attributes from SVG makes icons responsive. Control size via parent container, CSS, or size prop. Fixed dimensions from design tools often don't match use cases - removing them gives flexibility.

### Use Cases

**Icon Libraries:** Convert hundreds of SVG icons into React components for design systems. Organize in folders by category. Export from index file for clean imports: \`import { Icon, Arrow, Check } from '@/icons'\`.

**Logo Components:** Convert brand logos to React components. Add props for different logo variants (full, icon-only, monochrome). Control sizing and colors via props while maintaining vector quality.

**Illustrations:** Convert complex illustrations with gradients, filters, and multiple layers. Maintain all SVG features while making illustrations usable as React components. Animate SVG elements using React state and CSS transitions.

**Charts and Graphs:** Convert data visualization SVG from tools like D3, Chart.js exports, or design mockups. Make charts interactive by adding React event handlers to SVG elements.

### Conversion Challenges

**Complex SVG:** SVG with embedded images, fonts, or external references may not convert perfectly. Some design tool-specific attributes (Sketch, Figma metadata) can be removed during conversion. Review converted output for correctness.

**Style Parsing:** Inline styles with complex CSS (gradients, transforms) require careful parsing. Edge cases like single vs double quotes, semicolon placement, and vendor prefixes need special handling. Good converters handle these reliably.

**Namespace Handling:** SVG 2.0 deprecated some namespace attributes but design tools still export them. xlink:href became href in modern SVG. Converters should handle both old and new syntax.

**Optimization:** SVG from design tools contains unnecessary metadata, comments, and precision. Optimize SVG with SVGO before or after JSX conversion to reduce file size by 30-70%.

This converter transforms SVG markup to React-compatible JSX with all syntax corrections, optional component wrapping, TypeScript support, and prop spreading. All conversion happens client-side in your browser using JavaScript - no server uploads or API calls.`
  },

  useCases: [
    {
      title: "Create Icon Library from Design System",
      description: "Convert hundreds of SVG icons from Figma, Sketch, or icon libraries into React components for your design system. Organize icons by category, add consistent props, and export for clean imports across your application.",
      example: `// Converting SVG icons to React component library
// 1. Export SVGs from Figma/Sketch

// 2. Convert each SVG to JSX component
// Input SVG:
/*
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
*/

// Output JSX Component:
import React, { SVGProps } from 'react';

interface ChevronRightProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
},

export function ChevronRight({
  size = 24,
  color = 'currentColor',
  ...props
}: ChevronRightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M9 5l7 7-7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 3. Organize into library structure
// icons/
//   navigation/
//     ChevronRight.tsx
//     ChevronLeft.tsx
//     ChevronUp.tsx
//     ChevronDown.tsx
//   actions/
//     Check.tsx
//     X.tsx
//     Plus.tsx
//     Minus.tsx
//   index.ts

// icons/index.ts
export { ChevronRight } from './navigation/ChevronRight';
export { ChevronLeft } from './navigation/ChevronLeft';
export { Check } from './actions/Check';
export { X } from './actions/X';

// 4. Use in application
import { ChevronRight, Check, X } from '@/icons';

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button>
      {children}
      <ChevronRight size={16} color="#6366F1" />
    </button>
  );
}

function Notification({ success }: { success: boolean }) {
  return (
    <div>
      {success ? (
        <Check color="green" size={20} />
      ) : (
        <X color="red" size={20} />
      )}
    </div>
  );
}`
    },
    {
      title: "Convert Logo with Multiple Variants",
      description: "Transform brand logos into React components with props for different variants (full logo, icon-only, monochrome). Control sizing and colors dynamically while maintaining vector quality and responsiveness.",
      example: `// Converting logo SVG to flexible React component
// Input: Logo SVG from Figma
/*
<svg width="200" height="50" viewBox="0 0 200 50">
  <path d="M10..." fill="#6366F1"/>
  <text x="60" y="35" font-family="Inter" fill="#1F2937">Company</text>
</svg>
*/

// Output: Flexible logo component
import React, { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: number;
  color?: string;
  monochrome?: boolean;
},

export function Logo({
  variant = 'full',
  size = 200,
  color,
  monochrome = false,
  ...props
}: LogoProps) {
  const iconColor = monochrome ? 'currentColor' : (color || '#6366F1');
  const textColor = monochrome ? 'currentColor' : (color || '#1F2937');

  // Calculate dimensions based on variant
  const width = variant === 'full' ? size : variant === 'icon' ? size * 0.25 : size * 0.7;
  const height = size * 0.25;

  return (
    <svg
      width={width}
      height={height}
      viewBox={variant === 'full' ? '0 0 200 50' : variant === 'icon' ? '0 0 50 50' : '60 0 140 50'}
      {...props}
    >
      {/* Icon part (always visible) */}
      {(variant === 'full' || variant === 'icon') && (
        <path
          d="M10 5L30 25L10 45L5 40L20 25L5 10Z"
          fill={iconColor}
        />
      )}

      {/* Wordmark (full and wordmark variants) */}
      {(variant === 'full' || variant === 'wordmark') && (
        <text
          x={variant === 'full' ? 60 : 0}
          y={35}
          fontFamily="Inter, sans-serif"
          fontSize={24}
          fontWeight="bold"
          fill={textColor}
        >
          Company
        </text>
      )}
    </svg>
  );
},

// Usage examples
function Navbar() {
  return (
    <nav>
      <Logo variant="full" size={150} />

      {/* Mobile: icon only */}
      <div className="md:hidden">
        <Logo variant="icon" size={32} />
      </div>

      {/* Monochrome for dark mode */}
      <Logo variant="full" monochrome className="text-white" />
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <Logo variant="wordmark" color="#9CA3AF" size={120} />
    </footer>
  );
}`
    },
    {
      title: "Build Animated Icon Components",
      description: "Convert SVG icons to React components with animation support. Add React state and CSS transitions to create interactive icons that respond to user interactions or loading states.",
      example: `// Converting SVG to animated React component
// Input: Menu icon SVG
/*
<svg width="24" height="24" viewBox="0 0 24 24">
  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
  <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
  <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/>
</svg>
*/

// Output: Animated menu/close icon
import React, { SVGProps } from 'react';
import './MenuIcon.css';

interface MenuIconProps extends SVGProps<SVGSVGElement> {
  isOpen: boolean;
  size?: number;
},

export function MenuIcon({ isOpen, size = 24, ...props }: MenuIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={\`menu-icon \${isOpen ? 'open' : ''}\`}
      {...props}
    >
      <line
        className="top-line"
        x1={3}
        y1={6}
        x2={21}
        y2={6}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        className="middle-line"
        x1={3}
        y1={12}
        x2={21}
        y2={12}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        className="bottom-line"
        x1={3}
        y1={18}
        x2={21}
        y2={18}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
},

// CSS animations
/* MenuIcon.css */
.menu-icon line {
  transition: all 0.3s ease-in-out;
  transform-origin: center;
},

.menu-icon.open .top-line {
  transform: translateY(6px) rotate(45deg);
},

.menu-icon.open .middle-line {
  opacity: 0;
},

.menu-icon.open .bottom-line {
  transform: translateY(-6px) rotate(-45deg);
},

// Usage with state
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon isOpen={isOpen} size={24} />
      </button>

      {isOpen && (
        <nav className="mobile-menu">
          {/* Navigation items */}
        </nav>
      )}
    </>
  );
},

// Animated loading spinner
export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className="animate-spin"
    >
      <circle
        cx={25}
        cy={25}
        r={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeDasharray="80 50"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Tailwind CSS animation
/* Add to tailwind.config.js */
animation: {
  'spin': 'spin 1s linear infinite'
}`
    },
    {
      title: "Batch Convert SVG Exports with Script",
      description: "Automate conversion of hundreds of SVG files to React components using Node.js script. Process entire icon libraries from Figma exports, apply consistent transformations, and generate TypeScript definitions.",
      example: `// Batch SVG to JSX conversion script
// batch-convert.js
const fs = require('fs/promises');
const path = require('path');
const { JSDOM } = require('jsdom');

// SVG to JSX conversion function
function svgToJsx(svgContent, componentName) {
  const dom = new JSDOM(svgContent);
  const svg = dom.window.document.querySelector('svg');

  // Convert attributes
  const attributes = Array.from(svg.attributes).map(attr => {
    let name = attr.name;
    let value = attr.value;

    // class -> className
    if (name === 'class') name = 'className';

    // Convert kebab-case to camelCase
    name = name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

    // Style attribute conversion
    if (name === 'style' && typeof value === 'string') {
      const styleObj = value.split(';')
        .filter(Boolean)
        .map(rule => {
          const [prop, val] = rule.split(':').map(s => s.trim());
          const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          return \`\${camelProp}: '\${val}'\`;
        })
        .join(', ');
      return \`style={{ \${styleObj} }}\`;
    },

    return \`\${name}="\${value}"\`;
  }).join(' ');

  // Get inner content
  const innerHTML = svg.innerHTML;

  // Generate component
  return \`
import React, { SVGProps } from 'react';

interface \${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
},

export function \${componentName}({
  size = 24,
  color = 'currentColor',
  ...props
}: \${componentName}Props) {
  return (
    <svg
      width={size}
      height={size}
      \${attributes}
      {...props}
    >
      \${innerHTML}
    </svg>
  );
}
  \`.trim();
},

// Process directory of SVG files
async function convertDirectory(inputDir, outputDir) {
  const files = await fs.readdir(inputDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  console.log(\`Converting \${svgFiles.length} SVG files...\`);

  for (const file of svgFiles) {
    const svgPath = path.join(inputDir, file);
    const svgContent = await fs.readFile(svgPath, 'utf-8');

    // Generate component name (PascalCase)
    const componentName = file
      .replace('.svg', '')
      .split('-')
      .map(part => part[0].toUpperCase() + part.slice(1))
      .join('');

    // Convert to JSX
    const jsxContent = svgToJsx(svgContent, componentName);

    // Write component file
    const outputPath = path.join(outputDir, \`\${componentName}.tsx\`);
    await fs.writeFile(outputPath, jsxContent);

    console.log(\`✓ Converted \${file} -> \${componentName}.tsx\`);
  }

  // Generate index.ts
  const exports = svgFiles.map(file => {
    const componentName = file
      .replace('.svg', '')
      .split('-')
      .map(part => part[0].toUpperCase() + part.slice(1))
      .join('');
    return \`export { \${componentName} } from './\${componentName}';\`;
  }).join('\\n');

  await fs.writeFile(path.join(outputDir, 'index.ts'), exports);
  console.log(\`✓ Generated index.ts with \${svgFiles.length} exports\`);
},

// Run conversion
const inputDir = process.argv[2] || './svgs';
const outputDir = process.argv[3] || './icons';

convertDirectory(inputDir, outputDir)
  .then(() => console.log('✅ Conversion complete'))
  .catch(err => console.error('❌ Error:', err));

// Usage:
// node batch-convert.js ./figma-exports ./src/icons
// Converts all SVG files in figma-exports/ to React components in src/icons/`
    }
  ],

  howToUse: {
    title: "How to Use This SVG to JSX Converter",
    content: `This converter transforms SVG markup into React-compatible JSX with all necessary syntax corrections. Paste SVG code, configure conversion options, and copy the converted JSX component ready for immediate use in React applications.

### Pasting SVG Code

Copy SVG markup from your source (Figma, Sketch, Illustrator, icon libraries, or SVG files) and paste into the large textarea labeled "SVG Input". The tool accepts any valid SVG including complex paths, groups, gradients, patterns, filters, masks, and embedded elements.

SVG can come from: Figma (right-click element → Copy as SVG), Sketch (Export → SVG), Illustrator (Save As → SVG), icon libraries (download SVG), or existing SVG files (open in text editor, copy content).

### Conversion Options

**Wrap in Component:** Enables component wrapper. When enabled, output includes complete React function component with import, interface, and export. When disabled, output shows only converted JSX markup for embedding in existing components.

**Component Name:** Sets function component name (default: SvgIcon). Use PascalCase naming convention: ArrowIcon, MenuIcon, LogoFull. Component name must be valid JavaScript identifier.

**TypeScript:** Adds TypeScript type definitions when enabled. Includes \`SVGProps<SVGSVGElement>\` interface extending all valid SVG attributes. Provides autocomplete and type safety in TypeScript projects.

**Spread Props:** Adds \`{...props}\` to <svg> element. Allows passing any valid SVG attributes when using component: \`<Icon className="custom" onClick={handler} />\`. Essential for flexible, reusable components.

**Remove Dimensions:** Strips width and height attributes from <svg>. Makes icons responsive and sizable via CSS or parent container. Fixed dimensions from design tools rarely match actual use cases. Removing dimensions provides flexibility.

### Understanding Converted Output

The output textarea shows syntax-highlighted converted code. All SVG-to-JSX transformations applied: class → className, kebab-case → camelCase, style strings → style objects, proper self-closing tags, and proper attribute quoting.

If "Wrap in Component" enabled, output includes:
- Import statement for React and types
- TypeScript interface (if TypeScript enabled)
- Function component with props
- JSX return statement with converted SVG
- Export statement

If "Wrap in Component" disabled, output shows only JSX markup for copying into existing components.

### Copying and Using Code

Click Copy button to copy entire converted code to clipboard. Paste into your React project:

For component files, create new .tsx or .jsx file, paste entire output, save. Import and use: \`import { SvgIcon } from './SvgIcon'; <SvgIcon />\`

For inline JSX, paste converted markup inside existing component's return statement.

### Common SVG Sources

**Figma:** Select element → Right-click → Copy as SVG → Paste into converter. For multiple icons, export as SVG files, then paste contents.

**Sketch:** Select artboard → Export → SVG → Open SVG file in text editor → Copy content → Paste into converter.

**Icon Libraries:** Download SVG from libraries (Heroicons, Feather Icons, Material Icons). Open SVG file, copy content, paste into converter.

**Adobe Illustrator:** Save As → SVG → Open saved file in text editor → Copy → Paste into converter. Optimize SVG first for cleaner output.`,
    steps: [
      {
        name: "Paste SVG Markup",
        text: "Copy SVG code from Figma, Sketch, Illustrator, or icon libraries and paste into the input textarea. Tool accepts any valid SVG including complex paths, groups, and effects."
      },
      {
        name: "Configure Options",
        text: "Enable Wrap in Component for standalone component. Set Component Name (PascalCase). Enable TypeScript for type definitions. Enable Spread Props for flexibility. Enable Remove Dimensions for responsive sizing."
      },
      {
        name: "Review Converted JSX",
        text: "Check output textarea showing converted JSX with all syntax corrections: className, camelCase attributes, style objects, self-closing tags. Syntax highlighting aids readability."
      },
      {
        name: "Copy and Integrate",
        text: "Click Copy button to copy converted code. Create new component file, paste code, save. Import and use in React application. Code works immediately without modifications."
      }
    ]
  },

  faqs: [
    {
      question: "Why do I need to convert SVG to JSX?",
      answer: "React's JSX syntax differs from HTML: 'class' must be 'className', kebab-case attributes must be camelCase (stroke-width → strokeWidth), style must be objects not strings, and tags must self-close properly. Direct copy-paste of SVG HTML causes React errors. This converter applies all necessary transformations automatically."
    },
    {
      question: "Can I convert complex SVG with gradients and filters?",
      answer: "Yes. The converter handles all SVG features: gradients, patterns, filters, masks, clip-paths, groups, transformations, and embedded elements. Complex SVG from design tools converts correctly including all attributes and nested elements. Review output to verify correctness."
    },
    {
      question: "Should I enable 'Remove Dimensions' for icons?",
      answer: "Yes, for most icons. Removing width/height makes icons responsive and flexible - control size via CSS, parent container, or size prop. Fixed dimensions from design tools (24x24px) rarely match use cases. Exception: logos or illustrations where specific aspect ratio is critical - keep dimensions."
    },
    {
      question: "What does 'Spread Props' do?",
      answer: "Adds {...props} to <svg> element, allowing you to pass any valid SVG attributes when using component: className, style, onClick, aria-label, etc. Without spread props, components only accept explicitly defined props. With spread props, components are flexible without hardcoding every possible attribute."
    },
    {
      question: "Can I batch convert hundreds of SVG files?",
      answer: "This tool converts one SVG at a time for manual review. For batch conversion, use Node.js scripts with libraries like svgr, svg-to-jsx, or custom scripts. Automate conversion of entire icon directories, apply consistent transformations, and generate index files for clean imports."
    },
    {
      question: "Why use TypeScript option?",
      answer: "TypeScript adds type safety: autocomplete for props, compile-time error checking, and better IDE support. SVGProps<SVGSVGElement> type includes all valid SVG attributes plus React props (className, onClick). Catch errors early and improve developer experience. If not using TypeScript, disable for cleaner output."
    },
    {
      question: "How do I add custom props like 'size' and 'color'?",
      answer: "Enable 'Wrap in Component' and manually add props to generated interface. Example: add 'size?: number' and 'color?: string' to interface. Use props in JSX: width={size}, stroke={color}. Replace hardcoded values with prop variables for dynamic control."
    },
    {
      question: "Can I convert SVG from icon libraries like Heroicons?",
      answer: "Yes. Download SVG file from icon library, open in text editor, copy content, paste into converter. Most icon libraries already provide React components, but converter useful when you need different format, custom modifications, or want to understand conversion process."
    },
    {
      question: "Why does converted code show errors in my editor?",
      answer: "Common causes: (1) Missing React import - add 'import React from \"react\"'. (2) TypeScript errors - ensure @types/react installed. (3) Linter warnings about unused props - add ESLint disable comment if intentional. (4) Style object warnings - ensure proper JavaScript object syntax."
    },
    {
      question: "How do I optimize SVG before conversion?",
      answer: "Use SVGO (SVG Optimizer) before conversion to remove unnecessary metadata, comments, and decimal precision. Run: 'svgo input.svg -o output.svg'. Reduces file size 30-70% without visual changes. SVGO removes Figma/Sketch-specific attributes that add no value in production."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This SVG to JSX converter operates entirely client-side in your browser using JavaScript. All SVG parsing, attribute conversion, and JSX generation happen locally on your device. No SVG code or converted JSX is transmitted to servers or stored remotely.

### Privacy Guarantees

- **100% Client-Side Processing:** All SVG parsing and JSX generation use browser JavaScript. String manipulation, regex replacements, and code generation happen on your device.
- **No Code Uploads:** Your SVG markup never leaves your browser. No server-side processing or API calls with your code.
- **No Data Storage:** SVG input and converted JSX are not saved or logged anywhere. Refresh page and everything clears from browser memory.
- **No Analytics on Code:** We don't track what SVG you convert, component names you use, or any code-specific data. Standard analytics track page views only.
- **Transparent & Auditable:** Code is transparent and auditable. Inspect browser DevTools Network tab during conversion - zero network requests with your SVG code.

Safe for converting proprietary icons, client logos under NDA, unreleased design system components, or any SVG requiring confidentiality. Use with confidence for enterprise design systems, client projects, or competitive product icons where designs must remain private.`
  },

  stats: {
    "Conversions": "class, style, case",
    "Component Wrapper": "Optional",
    "TypeScript": "Optional",
    "Prop Spreading": "Optional"
  }
};
