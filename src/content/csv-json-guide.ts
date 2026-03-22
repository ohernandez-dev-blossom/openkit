/**
 * CSV to JSON Converter Tool Guide Content
 * Comprehensive developer guide for CSV to JSON conversion
 */

import type { ToolGuideContent } from "./types";

export const csvJsonGuideContent: ToolGuideContent = {
  toolName: "CSV to JSON Converter",
  toolPath: "/csv-json",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your CSV Data",
      description: "Copy CSV data from Excel, Google Sheets, or any source and paste it into the input field. Supports standard comma-separated format with automatic header detection."
    },
    {
      title: "Select Delimiter Type",
      description: "Choose your delimiter: comma (,) for standard CSV, semicolon (;) for European formats, or tab (\\t) for TSV files. The tool handles different regional CSV standards."
    },
    {
      title: "Configure Header Options",
      description: "Enable 'First row as headers' to convert CSV headers into JSON object keys. Disable for array-only output when CSV has no header row."
    },
    {
      title: "Convert and Export",
      description: "Click 'Convert to JSON' to transform your data instantly. Copy the formatted JSON or download as .json file for use in APIs, databases, or configuration files."
    }
  ],

  introduction: {
    title: "What is CSV to JSON Conversion?",
    content: `CSV (Comma-Separated Values) to JSON (JavaScript Object Notation) conversion transforms tabular spreadsheet data into structured object format used in modern web APIs and JavaScript applications. This conversion is fundamental when migrating data from Excel, database exports, or legacy systems into web applications that consume JSON.

CSV represents data as rows and columns with delimiters separating values, similar to spreadsheet tables. JSON represents data as key-value objects with hierarchical structure, the native format for JavaScript and REST APIs. Converting CSV to JSON enables spreadsheet data to be consumed by web services, NoSQL databases (MongoDB, Firestore), and frontend frameworks (React, Vue, Angular).

### Why Convert CSV to JSON?

CSV files are the universal export format from Excel, Google Sheets, SQL databases, and analytics platforms. However, modern web applications exclusively use JSON for data exchange. REST APIs accept JSON payloads, not CSV. Frontend frameworks bind to JSON objects, not CSV rows. NoSQL databases store JSON documents, not CSV records.

When you export data from a spreadsheet and need to import it into a web application, convert CSV to JSON. When migrating from SQL databases (which export CSV) to MongoDB or Firestore (which use JSON), this conversion is essential. When building APIs that accept file uploads, converting CSV to JSON enables processing with standard JavaScript methods.

### CSV vs JSON: Key Differences

CSV is flat and tabular - every row has the same columns, no nested data structures. JSON is hierarchical - objects can contain nested objects and arrays. CSV requires the first row to define column headers, which become JSON keys. JSON supports complex data types (boolean, null, nested objects) while CSV treats everything as strings.

CSV uses delimiters (comma, semicolon, tab) that vary by region and can cause parsing issues if values contain delimiters. JSON uses strict syntax with quoted strings and unquoted numbers/booleans, eliminating delimiter ambiguity. CSV files are typically smaller than equivalent JSON (less syntax overhead), but JSON is more powerful for complex data structures.

### When to Use CSV to JSON Conversion

Import spreadsheet data into web applications that use JSON APIs. Migrate data from SQL database exports (CSV format) to NoSQL databases (JSON documents). Transform analytics exports from Google Analytics or data warehouses into format for custom dashboards. Convert user uploads from CSV to JSON for processing in Node.js or browser JavaScript.

This tool handles edge cases like quoted values containing commas, different delimiter types (comma, semicolon, tab), optional header rows, and special characters. All processing happens client-side in your browser - your sensitive CSV data never leaves your machine.`
  },

  useCases: [
    {
      title: "Import Excel Data into MongoDB",
      description: "Convert Excel exports to JSON documents for NoSQL database import. Export your Excel/Sheets data as CSV, convert to JSON array, and insert into MongoDB collections using mongoimport or application code.",
      example: `// 1. Export from Excel as CSV:
// name,email,age,department
// John Doe,john@example.com,30,Engineering
// Jane Smith,jane@example.com,28,Design

// 2. Convert to JSON (this tool):
[
  { "name": "John Doe", "email": "john@example.com", "age": "30", "department": "Engineering" },
  { "name": "Jane Smith", "email": "jane@example.com", "age": "28", "department": "Design" }
]

// 3. Import to MongoDB:
const users = require('./users.json');
await db.collection('users').insertMany(users);`
    },
    {
      title: "Process User Uploads in Node.js API",
      description: "Accept CSV file uploads in your Express/Node.js API and convert to JSON for processing. Users upload CSV files, backend converts to JSON, validates data, and stores in database or sends to third-party services.",
      example: `import express from 'express';
import multer from 'multer';
import Papa from 'papaparse'; // CSV parser library

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload-users', upload.single('csvFile'), async (req, res) => {
  const csvFile = req.file;
  const csvContent = fs.readFileSync(csvFile.path, 'utf-8');

  // Parse CSV to JSON
  const result = Papa.parse(csvContent, {
    header: true, // First row as headers
    skipEmptyLines: true
  });

  const users = result.data; // Array of JSON objects

  // Validate and save to database
  await db.users.insertMany(users);

  res.json({ success: true, imported: users.length });
});`
    },
    {
      title: "Build Configuration Files from Spreadsheets",
      description: "Maintain application configuration in spreadsheets (easier for non-technical teams) and convert to JSON for deployment. Product managers update feature flags, pricing tiers, or settings in Google Sheets, then export and convert to JSON config files.",
      example: `// Google Sheet: Feature Flags
// feature,enabled,rollout_percentage,environments
// dark_mode,true,100,production,staging
// new_checkout,false,25,staging

// Converted JSON config.json:
{
  "features": [
    {
      "feature": "dark_mode",
      "enabled": "true",
      "rollout_percentage": "100",
      "environments": "production,staging"
    },
    {
      "feature": "new_checkout",
      "enabled": "false",
      "rollout_percentage": "25",
      "environments": "staging"
    }
  ]
}

// Use in application:
import config from './config.json';
const isDarkModeEnabled = config.features.find(f => f.feature === 'dark_mode').enabled === 'true';`
    },
    {
      title: "Transform Analytics Exports for Visualization",
      description: "Convert Google Analytics, Mixpanel, or data warehouse CSV exports into JSON for custom charts and dashboards. Analytics platforms export CSV, but chart libraries (Chart.js, D3.js) require JSON data format.",
      example: `// Google Analytics Export: pageviews.csv
// date,page,views,bounce_rate
// 2024-01-01,/home,1523,42.3
// 2024-01-01,/pricing,892,38.1

// Convert to JSON:
const chartData = [
  { "date": "2024-01-01", "page": "/home", "views": "1523", "bounce_rate": "42.3" },
  { "date": "2024-01-01", "page": "/pricing", "views": "892", "bounce_rate": "38.1" }
];

// Use with Chart.js:
new Chart(ctx, {
  type: 'line',
  data: {
    labels: chartData.map(d => d.date),
    datasets: [{
      label: 'Page Views',
      data: chartData.map(d => parseInt(d.views))
    }]
  }
});`
    }
  ],

  howToUse: {
    title: "How to Use This CSV to JSON Converter",
    content: `This tool provides instant CSV to JSON conversion with support for multiple delimiter types, header detection, and edge case handling. All processing happens client-side in your browser using JavaScript - no server uploads or data transmission.

### Converting CSV to JSON

Paste your CSV data into the input field or drag-and-drop a .csv file. The tool automatically detects line endings (\\n, \\r\\n, \\r) and handles quoted values containing commas. Select your delimiter type: comma (standard), semicolon (European Excel), or tab (TSV files).

### Header Detection

Enable "First row as headers" to use the first CSV row as JSON object keys. For example, CSV with header row \`name,age,city\` produces JSON objects like \`{"name": "John", "age": "30", "city": "NYC"}\`. Disable this option to convert CSV to array of arrays when no header row exists.

### Handling Special Characters

The converter properly handles quoted CSV values containing commas, newlines, or quotes. For example, CSV value \`"Smith, John"\` preserves the comma inside quotes. Double quotes within values are escaped as \`""\` following CSV standards.

### Edge Cases and Limitations

All values are converted to strings in JSON output. If you need numbers or booleans, parse the JSON in your application code. Empty CSV cells become empty strings ("") in JSON. Rows with different column counts are handled gracefully - missing columns become empty strings, extra columns are preserved.

### Export Options

Copy the JSON output to clipboard for pasting into code editors or configuration files. Download as .json file for importing into MongoDB, Firestore, or other tools. The JSON is formatted with 2-space indentation for readability.`,
    steps: [
      {
        name: "Paste CSV Data",
        text: "Copy CSV from Excel, Google Sheets, database export, or any source. Paste into the input field or drag-drop a .csv file."
      },
      {
        name: "Select Delimiter",
        text: "Choose comma (,), semicolon (;), or tab (\\t) based on your CSV format. European Excel uses semicolons, standard CSV uses commas."
      },
      {
        name: "Configure Headers",
        text: "Enable 'First row as headers' if your CSV has column names in the first row. Disable for data-only CSV files."
      },
      {
        name: "Convert and Export",
        text: "Click 'Convert to JSON' to transform instantly. Copy result or download as .json file for use in your projects."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between comma, semicolon, and tab delimiters?",
      answer: "Comma (,) is the standard CSV delimiter used in US/English Excel and most data exports. Semicolon (;) is used in European Excel where comma is the decimal separator (e.g., 1,5 instead of 1.5). Tab (\\t) creates TSV (Tab-Separated Values) files, common in data science and avoiding comma/semicolon conflicts. Choose the delimiter that matches your source file - incorrect delimiter choice results in single-column output."
    },
    {
      question: "Why are my numbers converted to strings in JSON?",
      answer: "CSV format has no data type information - everything is text. The converter doesn't guess types to avoid errors (e.g., is '01' the number 1 or string '01' for ZIP code?). Parse numbers in your application code: JSON.parse() converts strings to numbers automatically, or use parseInt(value) and parseFloat(value) explicitly. For MongoDB imports, use mongoimport --type csv which auto-detects types."
    },
    {
      question: "How do I handle CSV files with commas inside values?",
      answer: "Properly formatted CSV wraps values containing commas in double quotes: \\\"Smith, John\\\",30,NYC. This tool automatically handles quoted values following CSV RFC 4180 standard. If your CSV has unquoted commas inside values, it will parse incorrectly - fix the source CSV by wrapping affected values in quotes or use a different delimiter (semicolon, tab)."
    },
    {
      question: "Can I convert JSON back to CSV?",
      answer: "Yes, use our JSON to CSV converter tool (/json-csv) for the reverse conversion. It extracts object keys as CSV headers and converts JSON array of objects back to CSV rows. Nested objects and arrays in JSON are flattened or stringified for CSV compatibility since CSV is inherently flat."
    },
    {
      question: "What happens if CSV rows have different column counts?",
      answer: "When 'First row as headers' is enabled, the first row defines column names. Subsequent rows with fewer columns get empty strings for missing values. Rows with extra columns beyond header count preserve those values with auto-generated keys like 'column_5'. This prevents data loss but may require cleanup in your application code."
    },
    {
      question: "How do I import the JSON into MongoDB?",
      answer: "Save the JSON output as a .json file, then use mongoimport: \\`mongoimport --db mydb --collection users --file users.json --jsonArray\\`. The --jsonArray flag indicates the file contains an array of documents. Alternatively, in your Node.js app: \\`const data = require('./users.json'); await db.collection('users').insertMany(data);\\`"
    },
    {
      question: "Can this handle large CSV files (100MB+)?",
      answer: "Browser JavaScript can handle files up to ~100-200MB depending on available memory, but processing large files freezes the browser tab. For files over 50MB, use server-side processing with Node.js and streaming CSV parsers (PapaParse, csv-parse) that process chunks without loading entire file into memory. This client-side tool is optimized for typical CSV files (1-10MB)."
    },
    {
      question: "Does this support multi-line CSV values?",
      answer: "Yes, quoted CSV values can contain newlines following CSV standards. For example, CSV cell \\\"Address:\\nLine 1\\nLine 2\\\" preserves newlines inside quotes. The parser handles this correctly. However, unquoted newlines break CSV format and cause parsing errors - ensure values with newlines are wrapped in double quotes."
    },
    {
      question: "How do I convert CSV with no header row?",
      answer: "Disable 'First row as headers' option. The output will be an array of arrays instead of array of objects: \\`[['John', '30', 'NYC'], ['Jane', '25', 'LA']]\\`. This format is useful when CSV contains pure data without column names, or when you want to process headers separately in your application code."
    },
    {
      question: "Is my CSV data private and secure?",
      answer: "Absolutely. All CSV to JSON conversion happens entirely in your browser using client-side JavaScript. Your CSV data never leaves your device or gets uploaded to any server. No network requests are made with your data. You can verify this by opening browser DevTools Network tab - zero uploads. Safe for sensitive data, customer lists, financial records, or any confidential information."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your CSV data never leaves your browser. This converter operates entirely client-side using JavaScript's built-in string processing and JSON serialization. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All CSV parsing and JSON conversion happens in your browser's JavaScript engine. Files and data stay on your device.
- **No Server Uploads:** We don't have backend servers to process CSV files. The tool works completely offline after first page load.
- **No Data Storage:** Your CSV input and JSON output are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone (unless you save locally).
- **No Analytics on Content:** We don't track what you convert, file names, data values, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your data.

Safe for converting sensitive customer data, financial records, employee information, healthcare data (HIPAA), payment card data (PCI-DSS), or any confidential business information. Use with confidence for production data migrations, customer imports, or regulated data processing.`
  },

  stats: {
    "Conversion Speed": "<100ms",
    "Max File Size": "50MB",
    "Delimiter Types": "3",
    "Data Loss": "0",
    "Server Uploads": "0"
  }
};
