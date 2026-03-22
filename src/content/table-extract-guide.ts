import type { ToolGuideContent } from "./types";

export const tableExtractGuideContent: ToolGuideContent = {
  toolName: "HTML Table Converter",
  toolPath: "/table-extract",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste HTML",
      description: "Paste HTML containing one or more <table> elements. You can copy from a web page's source or inspector."
    },
    {
      title: "Select Table & Format",
      description: "If multiple tables are found, select which one to convert. Choose CSV, JSON, Markdown, or TSV output."
    },
    {
      title: "Preview & Export",
      description: "Check the preview table, then copy to clipboard or download the converted data."
    }
  ],

  introduction: {
    title: "Why Extract HTML Tables?",
    content: `HTML tables are one of the most common ways data is presented on the web. Whether you're scraping product listings, financial data, sports statistics, or documentation tables — converting them to structured formats like CSV or JSON makes them useful for analysis, import into spreadsheets, or processing in code.

This tool parses HTML table markup directly in your browser, extracting headers and rows into clean, structured output. No server-side processing, no data collection — just paste and convert.`
  },

  useCases: [
    {
      title: "Spreadsheet Import",
      description: "Convert web tables to CSV for quick import into Excel, Google Sheets, or Numbers"
    },
    {
      title: "Data Analysis",
      description: "Extract JSON from HTML tables for processing in Python, JavaScript, or R"
    },
    {
      title: "Documentation",
      description: "Convert HTML tables to Markdown for README files and wikis"
    },
    {
      title: "Web Scraping",
      description: "Extract structured data from web page source code without writing parsers"
    }
  ],

  howToUse: {
    title: "How to Extract Table Data",
    content: `1. **Copy the HTML** — Right-click a table on any web page → Inspect Element → copy the \`<table>\` HTML
2. **Paste into the input** — The tool automatically detects all tables
3. **Choose your format** — CSV for spreadsheets, JSON for code, Markdown for docs
4. **Export** — Copy or download the result

**Tip:** You can also paste an entire web page's HTML — the tool will find all tables in it.`,
    steps: [
      {
        name: "Paste HTML source",
        text: "Copy HTML containing table elements and paste it into the input area"
      },
      {
        name: "Select table if multiple found",
        text: "If the HTML contains multiple tables, click to select which one to convert"
      },
      {
        name: "Choose output format",
        text: "Select CSV, JSON, Markdown, or TSV depending on your needs"
      },
      {
        name: "Copy or download",
        text: "Click Copy to clipboard or Download to save the converted data as a file"
      }
    ]
  },

  faqs: [
    {
      question: "How do I get the HTML of a table from a web page?",
      answer: "Right-click on the table → 'Inspect' (or press F12) → find the <table> element in the Elements panel → right-click it → 'Copy' → 'Copy outerHTML'. Paste that into this tool."
    },
    {
      question: "Can it handle tables without thead/th headers?",
      answer: "Yes. The parser first looks for thead or th elements. If none are found, it generates generic column headers (Column 1, Column 2, etc.). You can also use the first row as headers if all cells are th elements."
    },
    {
      question: "What about merged cells (colspan/rowspan)?",
      answer: "Currently, merged cells are treated as single cells. The content is extracted but the spanning structure is flattened. For complex tables with extensive merging, you may need to clean up the output."
    },
    {
      question: "Is there a row/size limit?",
      answer: "No hard limit — since everything runs in your browser, it depends on your device's memory. Tables with thousands of rows work fine on modern devices."
    },
    {
      question: "Can I paste an entire web page?",
      answer: "Yes! The parser will find all <table> elements in the HTML, regardless of surrounding content. You can paste a full page source and it will extract every table."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All parsing happens in your browser using the built-in DOMParser API. No data is transmitted to any server.

- ✅ Client-side HTML parsing only
- ✅ No data stored or transmitted
- ✅ Safe with sensitive tabular data
- ✅ Works offline after page load`
  },

  stats: {
    "Output Formats": "4",
    "Client-Side": "100%",
    "Tables per Input": "Unlimited"
  },

  features: [
    { title: "Multi-Table", description: "Detects all tables in HTML" },
    { title: "Smart Headers", description: "Auto-detects column headers" },
    { title: "Live Preview", description: "Formatted table preview" },
    { title: "4 Formats", description: "CSV, JSON, Markdown, TSV" },
    { title: "Download", description: "One-click file export" },
    { title: "No Limits", description: "Handle any table size" }
  ]
};
