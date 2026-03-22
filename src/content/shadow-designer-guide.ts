import { ToolGuideContent } from './types';

export const shadowDesignerGuideContent: ToolGuideContent = {
  toolName: "Box Shadow Designer",
  toolPath: "/shadow-designer",
  lastUpdated: "2026-02-02",
  version: "2.1",

  quickStartSteps: [
    {
      title: "Choose a Preset",
      description: "Start with one of 10 professional shadow presets (Subtle, Glow, Neumorphic, etc.) or begin from scratch with the default layer."
    },
    {
      title: "Adjust Shadow Properties",
      description: "Fine-tune horizontal/vertical offset, blur radius, spread, opacity, and color using intuitive sliders and color pickers."
    },
    {
      title: "Add Multiple Layers",
      description: "Create complex, multi-layered shadows by stacking multiple shadow effects. Reorder layers to control rendering priority."
    },
    {
      title: "Copy CSS or Tailwind Code",
      description: "Get production-ready code in both standard CSS box-shadow syntax and Tailwind CSS utility classes with one click."
    }
  ],

  introduction: {
    title: "What is a Box Shadow Designer?",
    content: `A box shadow designer is a visual tool that allows developers and designers to create, customize, and preview CSS box-shadow effects in real-time without writing code manually. Box shadows add depth, elevation, and visual hierarchy to web interfaces by simulating lighting effects around elements.

## Understanding Box Shadows

CSS box-shadow is one of the most versatile properties for creating modern, depth-rich user interfaces. The property accepts multiple parameters:
- **Offset-X & Offset-Y**: Control horizontal and vertical shadow positioning
- **Blur Radius**: Determines shadow softness and edge feathering
- **Spread Radius**: Expands or contracts the shadow size
- **Color & Opacity**: Define shadow appearance and transparency
- **Inset**: Creates inner shadows for pressed/recessed effects

## Why Box Shadow Designers Matter

Manual CSS box-shadow development is time-consuming and requires constant browser refresh cycles to preview changes. Professional shadow designers eliminate this friction by providing:
- Real-time visual feedback with live preview
- Multi-layer shadow composition for complex effects
- Preset libraries based on design systems (Material Design, Neumorphism, etc.)
- Cross-browser compatible code generation
- Precise numerical control with visual feedback

Modern web design relies heavily on elevation systems where shadows indicate element hierarchy. Google's Material Design uses shadow depth to show element elevation levels (0dp to 24dp), while Apple's design language employs subtle shadows for card-based layouts. A visual designer tool makes implementing these systems consistent and efficient.`
  },

  useCases: [
    {
      title: "Material Design Elevation System",
      description: "Implement Google's Material Design elevation levels (cards, modals, FABs) with precise shadow specifications. Material Design defines exact shadow values for each elevation level.",
      example: `/* Material Design Card (2dp elevation) */
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06),
            0 8px 16px 0 rgba(0, 0, 0, 0.10);

/* Floating Action Button (6dp elevation) */
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.20),
            0 20px 40px rgba(0, 0, 0, 0.10);`
    },
    {
      title: "Neumorphic UI Components",
      description: "Create soft UI (neumorphism) effects with dual light/dark shadows that simulate extruded or pressed surfaces. Popular in modern dashboard and mobile app design.",
      example: `/* Neumorphic Button */
box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.10),
            -8px -8px 16px rgba(255, 255, 255, 0.60);

/* Pressed State (Inset) */
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.20),
            inset -2px -2px 5px rgba(255, 255, 255, 0.10);`
    },
    {
      title: "Neon Glow Effects for Dark Mode",
      description: "Design vibrant glow effects for dark mode interfaces, gaming UIs, or cyberpunk aesthetics. Multi-layer shadows create depth and intensity.",
      example: `/* Neon Pink Glow */
box-shadow: 0 0 15px 2px rgba(236, 72, 153, 0.80),
            0 0 30px 8px rgba(139, 92, 246, 0.40);

/* Electric Blue Accent */
box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.60);`
    },
    {
      title: "Drop Shadows for Card Layouts",
      description: "Create depth in card-based interfaces (dashboards, galleries, product grids) with subtle, realistic drop shadows that enhance visual hierarchy.",
      example: `/* Subtle Card Shadow */
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);

/* Hover State - Elevated */
box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.20);`
    }
  ],

  howToUse: {
    title: "How to Use the Box Shadow Designer",
    steps: [
      {
        name: "Select Starting Point",
        text: "Choose a preset from the gallery or customize the default medium shadow. Presets include Subtle, Heavy, Glow, Neon, Layered, Neumorphic, Inset Deep, Card, and Floating styles."
      },
      {
        name: "Adjust Shadow Layer Properties",
        text: "Use sliders to modify horizontal offset (-50px to +50px), vertical offset (-50px to +50px), blur radius (0-100px), spread radius (-50px to +50px), and opacity (0-100%). Change shadow color with the color picker."
      },
      {
        name: "Add Additional Layers (Optional)",
        text: "Click 'Add Layer' to stack multiple shadows. Reorder layers using up/down arrows. Remove layers with the trash icon. Each layer renders independently and composites visually."
      },
      {
        name: "Toggle Inset Mode",
        text: "Enable the 'Inset Shadow' checkbox to create inner shadows for pressed button effects or depth inversion. Inset shadows render inside the element boundary."
      },
      {
        name: "Adjust Background Color",
        text: "Change the preview background color to test shadow visibility on different surfaces. Shadows appear differently on light vs. dark backgrounds."
      },
      {
        name: "Copy Code Output",
        text: "Copy standard CSS (box-shadow: ...) or Tailwind CSS utility class format (shadow-[...]). Paste directly into stylesheets or component files."
      }
    ],
    content: `## Advanced Shadow Techniques

### Multi-Layer Shadows
Combine multiple shadow layers to create realistic depth with both close and distant shadows:
\`\`\`css
/* Layered Depth Effect */
box-shadow:
  0 1px 3px 0 rgba(0, 0, 0, 0.10),    /* Close shadow */
  0 4px 8px 0 rgba(0, 0, 0, 0.08),     /* Mid-range shadow */
  0 10px 20px 0 rgba(0, 0, 0, 0.06);   /* Distant shadow */
\`\`\`

### Inset Shadows for Depth
Use inset shadows to create recessed or pressed effects:
\`\`\`css
/* Pressed Button */
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.20);
\`\`\`

### Color Shadows for Branding
Replace black shadows with brand colors for unique visual identity:
\`\`\`css
/* Blue Brand Shadow */
box-shadow: 0 4px 15px rgba(59, 130, 246, 0.20);
\`\`\`

## Performance Considerations

**Optimization Tips:**
- Limit shadow layers to 3-4 for optimal rendering performance
- Avoid excessive blur radius (>50px) on frequently animated elements
- Use \`will-change: transform\` for elements with animated shadows
- Consider using \`filter: drop-shadow()\` for SVG elements instead of box-shadow

**Browser Compatibility:**
Box-shadow is supported in all modern browsers including Chrome, Firefox, Safari, and Edge. No vendor prefixes required since 2012.`
  },

  faqs: [
    {
      question: "What's the difference between box-shadow and drop-shadow?",
      answer: "box-shadow applies to the CSS box model (rectangular boundary), while filter: drop-shadow() follows the actual shape of elements including transparency. Use box-shadow for standard UI elements and drop-shadow for SVGs or complex shapes."
    },
    {
      question: "How many shadow layers can I add?",
      answer: "The tool supports unlimited layers, but for optimal performance, keep shadows to 3-4 layers maximum. Excessive shadow layers can impact rendering performance, especially on mobile devices."
    },
    {
      question: "Can I use negative spread values?",
      answer: "Yes, negative spread values contract the shadow, making it smaller than the element. This is useful for creating tight, concentrated shadows close to element edges."
    },
    {
      question: "What does inset shadow do?",
      answer: "Inset shadows render inside the element boundary instead of outside, creating a pressed or recessed visual effect. This is commonly used for active button states or input fields."
    },
    {
      question: "How do I create neumorphic (soft UI) effects?",
      answer: "Use the Neumorphic preset or manually create two shadows: one dark shadow offset positive (bottom-right) and one light shadow offset negative (top-left). Both should have matching blur and spread values."
    },
    {
      question: "Can I animate box-shadow?",
      answer: "Yes, but animating box-shadow can be performance-intensive. For better performance, animate transform: translateY() with a static shadow, or use filter: drop-shadow() which is GPU-accelerated."
    },
    {
      question: "Why does my shadow look different in Tailwind?",
      answer: "Tailwind uses arbitrary value syntax [shadow-[...]] for custom shadows. The generated Tailwind code is functionally identical to CSS but uses Tailwind's utility class format."
    },
    {
      question: "What's the best shadow for card components?",
      answer: "Use the Card preset (0 2px 4px + 0 8px 16px) for standard elevation. For hover states, increase vertical offset and blur to simulate lifting the card closer to the user."
    },
    {
      question: "Can I copy individual shadow layers?",
      answer: "The tool exports all layers as a single box-shadow declaration. To copy individual layers, temporarily delete other layers, copy the code, then undo the deletion."
    },
    {
      question: "How do I create glowing text effects?",
      answer: "Box-shadow applies to elements, not text. For glowing text, use the CSS text-shadow property with similar syntax but without spread radius."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `## Privacy & Security

**Client-Side Processing:**
All shadow generation, preview rendering, and code export happens entirely in your browser. No shadow configurations, CSS code, or design data is transmitted to external servers.

**No Data Storage:**
Shadow designs are not saved, logged, or stored. When you close the browser tab, all shadow configurations are cleared from memory.

**Zero Tracking:**
This tool does not track which shadow presets you use, how you configure layers, or what CSS code you generate. Your design work remains completely private.

**Safe Code Output:**
Generated CSS and Tailwind code contains only standard box-shadow declarations with no executable scripts, external references, or security risks. Safe to paste directly into production codebases.`
  },

  stats: {
    "Presets Available": "10 Professional Styles",
    "Shadow Layers": "Unlimited Multi-Layer Support",
    "Output Formats": "CSS + Tailwind",
    "Processing": "100% Client-Side"
  }
};
