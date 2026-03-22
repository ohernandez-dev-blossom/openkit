/**
 * Color Picker Tool Guide Content
 * Comprehensive guide for the visual color picker
 */

import type { ToolGuideContent } from "./types";

export const colorPickerGuideContent: ToolGuideContent = {
  toolName: "Color Picker",
  toolPath: "/color-picker",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Pick a Color",
      description: "Click and drag on the color area to select your desired saturation and lightness. Use the hue slider below to change the base color."
    },
    {
      title: "Adjust Opacity",
      description: "Use the alpha slider to set the color's transparency level, from fully opaque to fully transparent."
    },
    {
      title: "Copy Color Value",
      description: "Click the copy button next to any format (HEX, RGB, HSL, HSV, CMYK) to instantly copy the color value to your clipboard."
    },
    {
      title: "Check Contrast",
      description: "Enter foreground and background colors in the contrast checker to verify WCAG AA and AAA compliance for accessibility."
    }
  ],

  introduction: {
    title: "What is the Color Picker Tool?",
    content: `The Color Picker is a professional-grade, browser-based color selection tool designed for designers and developers. It provides an intuitive visual interface for selecting colors and instantly converts them to every format you need.

### Supported Color Formats

- **HEX:** The standard #RRGGBB notation used in CSS and web design
- **RGB:** Red, Green, Blue values (0-255) for digital displays
- **HSL:** Hue, Saturation, Lightness — the most intuitive model for humans
- **HSV:** Hue, Saturation, Value — commonly used in design software like Photoshop
- **CMYK:** Cyan, Magenta, Yellow, Key (Black) — essential for print design

### Key Features

**Interactive Color Area:** A large saturation-lightness picker that gives you precise control over your color selection. Click or drag to explore thousands of color variations.

**EyeDropper API:** On supported browsers (Chrome 95+), use the native eye dropper to pick any color from your screen — even from other windows and applications.

**Color History:** Your last 10 picked colors are saved in the session, making it easy to compare and revisit colors.

**Contrast Checker:** Built-in WCAG contrast ratio calculator ensures your color combinations meet accessibility standards (AA and AAA levels for normal and large text).`
  },

  useCases: [
    {
      title: "Web Design & CSS Development",
      description: "Quickly pick colors and copy them in HEX, RGB, or HSL format directly into your stylesheets. The visual picker makes it easy to find the perfect shade."
    },
    {
      title: "Accessibility Compliance",
      description: "Use the built-in contrast checker to ensure your text and background color combinations meet WCAG 2.1 AA and AAA standards for readable, accessible content."
    },
    {
      title: "Brand Color Management",
      description: "Convert brand colors between formats (HEX for web, CMYK for print, RGB for digital) to maintain consistency across all media."
    },
    {
      title: "UI Prototyping",
      description: "Rapidly explore color variations using the visual picker and EyeDropper to sample colors from existing designs, mockups, or reference images."
    }
  ],

  howToUse: {
    title: "How to Use the Color Picker",
    content: `This tool provides multiple ways to select and work with colors. The main color area lets you pick saturation and lightness visually, while sliders control hue and opacity.

### Visual Color Selection

The large color area represents all possible saturation (horizontal) and lightness (vertical) combinations for the current hue. Click or drag to select your color. The hue slider below controls the base color from red through the full spectrum.

### EyeDropper Tool

If your browser supports the EyeDropper API, you'll see an eye dropper button. Click it to activate the native color picker, which lets you sample any pixel on your screen.

### Contrast Checking

The contrast checker calculates the luminance ratio between two colors according to WCAG 2.1 guidelines. A ratio of 4.5:1 is required for AA compliance (normal text), and 7:1 for AAA compliance.`,
    steps: [
      {
        name: "Select a Base Hue",
        text: "Use the horizontal hue slider to choose your base color (red, orange, yellow, green, blue, purple, etc.)."
      },
      {
        name: "Refine with the Color Area",
        text: "Click or drag in the large color area to adjust saturation (left-right) and brightness (top-bottom)."
      },
      {
        name: "Set Opacity",
        text: "Drag the alpha slider to adjust transparency. The HEX output will include alpha when less than 100%."
      },
      {
        name: "Copy Your Color",
        text: "Click the copy icon next to any format to copy it to your clipboard. Supported formats: HEX, RGB, HSL, HSV, CMYK."
      }
    ]
  },

  faqs: [
    {
      question: "What is the EyeDropper API?",
      answer: "The EyeDropper API is a browser feature (Chrome 95+, Edge 95+) that lets you pick any color from your screen. It opens a magnifier that samples the color of any pixel, even from other windows or applications. If your browser doesn't support it, the button won't appear."
    },
    {
      question: "What's the difference between HSL and HSV?",
      answer: "HSL (Hue, Saturation, Lightness) and HSV (Hue, Saturation, Value) are both cylindrical color models. HSL's lightness goes from black (0%) through the pure color (50%) to white (100%). HSV's value goes from black (0%) to the pure color (100%). HSL is more intuitive for CSS; HSV is standard in design tools like Photoshop."
    },
    {
      question: "How does the WCAG contrast checker work?",
      answer: "The contrast checker calculates the relative luminance ratio between two colors per WCAG 2.1 guidelines. A ratio of at least 4.5:1 is needed for AA compliance (normal text), 3:1 for AA large text, and 7:1 for AAA compliance. The tool shows pass/fail status for each level."
    },
    {
      question: "Can I use CMYK values for print design?",
      answer: "The CMYK values provided are calculated approximations. For professional print work, always verify colors with your print shop, as accurate CMYK conversion requires ICC color profiles specific to the paper and printing process."
    },
    {
      question: "Does the color picker support transparency?",
      answer: "Yes! The alpha slider controls opacity from 0% (fully transparent) to 100% (fully opaque). When alpha is less than 100%, the HEX output shows 8-digit hex (#RRGGBBAA), and RGB/HSL outputs include the alpha channel."
    },
    {
      question: "Is my color history saved?",
      answer: "Color history is stored in your browser session only. It shows your last 10 picked colors and clears when you close the tab. No data is sent to any server."
    },
    {
      question: "What color format should I use for CSS?",
      answer: "For modern CSS, HSL is recommended as it's the most readable and easiest to adjust. HEX is the most widely used. RGB is good for programmatic manipulation. All three are fully supported in CSS."
    },
    {
      question: "Can I enter a specific color value?",
      answer: "Yes, you can type a HEX value directly into the HEX input field. The picker will update to reflect that color, and all other formats will be recalculated automatically."
    }
  ],

  security: {
    title: "Privacy & Security",
    content: `The Color Picker runs entirely in your browser with zero server communication.

- **100% Client-Side:** All color calculations and conversions happen locally in JavaScript. No data is transmitted.
- **No Tracking:** We don't track which colors you pick, your history, or your contrast checks.
- **EyeDropper Privacy:** The EyeDropper API is a browser-native feature. The sampled color data never leaves your device.
- **Session-Only History:** Color history exists only in memory and is cleared when you navigate away.
- **No Cookies:** This tool does not use cookies or persistent storage for color data.`
  },

  stats: {
    "Color Formats": "5",
    "Contrast Levels": "AA & AAA",
    "History Slots": "10",
    "Privacy": "100%"
  }
};
