/**
 * Code Formatter Tool Guide Content
 * Comprehensive developer guide for code formatting
 */

import type { ToolGuideContent } from "./types";

export const codeFormatterGuideContent: ToolGuideContent = {
  toolName: "Code Formatter",
  toolPath: "/code-formatter",
  lastUpdated: "2026-02-05",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Select Language",
      description: "Choose the programming language of your code: HTML, CSS, JavaScript, JSON, or SQL. The formatter applies language-specific rules for optimal formatting."
    },
    {
      title: "Paste Your Code",
      description: "Copy and paste your minified or unformatted code into the input area. The tool accepts code of any size and handles syntax validation before formatting."
    },
    {
      title: "Click Format",
      description: "Press the Format Code button to instantly beautify your code. The output will have proper indentation, spacing, and line breaks for maximum readability."
    },
    {
      title: "Copy Formatted Code",
      description: "Use the Copy button to save the formatted code to your clipboard. You can then paste it into your editor, IDE, or version control system."
    }
  ],

  introduction: {
    title: "What is Code Formatting?",
    content: `Code formatting is the practice of structuring source code according to consistent style rules that improve readability and maintainability. Well-formatted code is easier to understand, debug, and collaborate on, making it an essential practice for individual developers and teams alike.

Modern development relies on consistent code style across projects. Whether you're working with HTML templates, CSS stylesheets, JavaScript logic, JSON data, or SQL queries, properly formatted code reduces cognitive load and helps catch errors early. Our formatter handles all these languages with intelligent rules specific to each syntax.`
  },

  features: [
    {
      title: "Multi-Language Support",
      description: "Format HTML, CSS, JavaScript, JSON, and SQL with a single tool. Each language has specialized formatting rules for optimal results."
    },
    {
      title: "Smart Indentation",
      description: "Automatic detection and correction of indentation levels. Consistent 2-space indentation for clean, readable code structure."
    },
    {
      title: "Syntax Validation",
      description: "Built-in error detection catches syntax issues before formatting. Get helpful error messages for invalid code."
    },
    {
      title: "Privacy First",
      description: "All formatting happens client-side in your browser. Your code never leaves your device or touches any server."
    }
  ],

  useCases: [
    {
      title: "Debugging Minified Code",
      description: "Unravel compressed production code to understand how it works or find bugs in deployed applications."
    },
    {
      title: "Code Review Preparation",
      description: "Ensure consistent formatting before submitting pull requests. Well-formatted code is easier to review and merge."
    },
    {
      title: "Learning and Teaching",
      description: "Format example code for documentation, tutorials, or educational materials with consistent, readable styling."
    },
    {
      title: "Database Query Optimization",
      description: "Format complex SQL queries to visualize joins, subqueries, and conditions for better query understanding."
    }
  ],

  faqs: [
    {
      question: "Is my code sent to a server?",
      answer: "No. All formatting happens entirely in your browser using JavaScript. Your code is never transmitted over the network or stored anywhere."
    },
    {
      question: "What formatting rules does the tool use?",
      answer: "The tool applies standard formatting conventions: 2-space indentation, proper brace placement, consistent spacing around operators, and language-specific best practices."
    },
    {
      question: "Can I format TypeScript or other languages?",
      answer: "Currently we support HTML, CSS, JavaScript, JSON, and SQL. TypeScript code can often be formatted using the JavaScript formatter for basic formatting needs."
    },
    {
      question: "What if my code has syntax errors?",
      answer: "The tool will display a helpful error message explaining what went wrong. Fix the syntax issue and try formatting again."
    },
    {
      question: "Is there a file size limit?",
      answer: "There's no strict limit, but very large files (over 1MB) may impact browser performance. For best results, format files under 100KB."
    }
  ],

  howToUse: {
    title: "How to Use the Code Formatter",
    content: `Using the code formatter is straightforward. First, select your programming language from the dropdown menu. Then paste your unformatted or minified code into the input text area. Click the Format button to process your code. The formatted result will appear in the output area with proper indentation and spacing. Finally, use the Copy button to copy the formatted code to your clipboard.`,
    steps: [
      {
        name: "Select Language",
        text: "Choose the programming language from the dropdown menu to apply language-specific formatting rules."
      },
      {
        name: "Paste Code",
        text: "Copy and paste your unformatted or minified code into the input text area."
      },
      {
        name: "Format",
        text: "Click the Format button to beautify your code with proper indentation and spacing."
      },
      {
        name: "Copy Result",
        text: "Use the Copy button to save the formatted code to your clipboard for use in your projects."
      }
    ]
  },

  security: {
    title: "Privacy & Security",
    content: `Your code's privacy is our top priority. The OpenKit Code Formatter operates entirely within your browser using client-side JavaScript. This means your source code never leaves your device, is never transmitted to any server, and is never stored or logged anywhere. Whether you're formatting proprietary business logic, sensitive database queries, or personal projects, you can be confident that your code remains private and secure.`
  }
};
