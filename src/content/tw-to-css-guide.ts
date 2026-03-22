import type { ToolGuideContent } from "./types";

export const twToCssGuideContent: ToolGuideContent = {
  toolName: "Tailwind to CSS Converter",
  toolPath: "/tw-to-css",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Classes",
      description: "Paste Tailwind utility classes from your code. You can include className='' wrappers — they'll be stripped automatically."
    },
    {
      title: "See CSS Output",
      description: "Each class is mapped to its CSS equivalent instantly. Unrecognized classes are flagged."
    },
    {
      title: "Copy & Use",
      description: "Copy the generated CSS rule block or study the per-class breakdown to learn Tailwind mappings."
    }
  ],

  introduction: {
    title: "Why Convert Tailwind to CSS?",
    content: `Tailwind CSS is incredibly productive for rapid development, but sometimes you need the vanilla CSS equivalent — for debugging, documentation, learning, or migrating away from Tailwind.

This converter maps **400+ Tailwind utility classes** to their CSS equivalents, including:
- All spacing, typography, and layout utilities
- Flexbox and Grid properties
- Colors (all palettes with 50-950 shades)
- Effects, transitions, and transforms
- Arbitrary value syntax \`[...]\`
- Responsive and state modifier detection

It's also a great **learning tool** — paste unfamiliar Tailwind and see exactly what CSS it produces.`
  },

  useCases: [
    {
      title: "Learning Tailwind",
      description: "See what CSS properties each utility class maps to — perfect for beginners"
    },
    {
      title: "Debugging",
      description: "When inspecting layout issues, seeing the raw CSS values helps understand what's happening"
    },
    {
      title: "Migration",
      description: "Moving from Tailwind to vanilla CSS or another framework — get the equivalent styles"
    },
    {
      title: "Documentation",
      description: "Generate CSS equivalents for design system documentation"
    }
  ],

  howToUse: {
    title: "How to Convert Tailwind Classes",
    content: `1. **Paste your Tailwind classes** — directly from JSX, HTML, or copied class strings
2. **Review the output** — each class is mapped individually with a breakdown
3. **Copy the CSS** — the output is formatted as a CSS rule block

**Supports:**
- Standard classes: \`flex\`, \`p-4\`, \`text-lg\`, etc.
- Colors: \`text-blue-500\`, \`bg-red-100\`, \`border-gray-300\`, etc.
- Arbitrary values: \`w-[300px]\`, \`text-[#ff6600]\`, \`gap-[2vw]\`
- Modifiers: \`hover:bg-blue-700\`, \`md:grid-cols-3\` (flagged in output)`,
    steps: [
      {
        name: "Paste Tailwind classes",
        text: "Enter Tailwind utility classes in the input — from code, design specs, or copy-paste"
      },
      {
        name: "Review CSS output",
        text: "See the generated CSS rule block with all mapped properties"
      },
      {
        name: "Check class breakdown",
        text: "Review each class individually to see its CSS equivalent and spot any unknown classes"
      },
      {
        name: "Copy result",
        text: "Click Copy CSS to get the formatted output ready for your stylesheet"
      }
    ]
  },

  faqs: [
    {
      question: "Does it handle all Tailwind classes?",
      answer: "It covers 400+ of the most commonly used utility classes including spacing, typography, layout, colors, effects, transitions, and transforms. Some dynamic or plugin-specific classes may show as unknown."
    },
    {
      question: "What about responsive prefixes like md: or lg:?",
      answer: "Modifier prefixes (responsive, hover, focus, etc.) are detected and flagged in the output. The CSS equivalent shows the base class mapping with a comment noting the modifier context."
    },
    {
      question: "Does it support Tailwind v4?",
      answer: "The mappings are based on Tailwind v3 conventions which are still widely used. Most v4 classes follow the same naming, but new v4-specific features may not be covered yet."
    },
    {
      question: "Can I paste className='...' from JSX?",
      answer: "Yes! The tool strips className wrappers, quotes, and curly braces automatically. Just paste whatever you have."
    },
    {
      question: "What about custom theme values?",
      answer: "Custom theme extensions (like text-brand-500 from your tailwind.config) won't be recognized since they're project-specific. Standard Tailwind colors and values are fully supported."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This tool runs entirely in your browser — no data is sent to any server.

- ✅ Pure client-side JavaScript conversion
- ✅ No network requests during conversion
- ✅ No data stored or logged
- ✅ Works offline after page load`
  },

  stats: {
    "Utility Classes": "400+",
    "Color Mappings": "150+",
    "Client-Side": "100%"
  },

  features: [
    { title: "400+ Classes", description: "Comprehensive Tailwind mapping" },
    { title: "Color Palettes", description: "All standard color scales" },
    { title: "Arbitrary Values", description: "Bracket syntax support" },
    { title: "Modifiers", description: "Detects hover/responsive prefixes" },
    { title: "Live Output", description: "Real-time conversion as you type" },
    { title: "Copy Ready", description: "Formatted CSS rule block" }
  ]
};
