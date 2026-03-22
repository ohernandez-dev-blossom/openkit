/**
 * JSON to CSV Converter Tool Guide Content
 * Comprehensive developer guide for JSON to CSV conversion
 */

import type { ToolGuideContent } from "./types";

export const jsonCsvGuideContent: ToolGuideContent = {
  toolName: "JSON to CSV Converter",
  toolPath: "/json-csv",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your JSON Array",
      description: "Copy JSON data from API responses, database exports, or configuration files and paste into the input field. Must be an array of objects with consistent keys."
    },
    {
      title: "Select Delimiter Type",
      description: "Choose your delimiter: comma (,) for standard CSV compatible with Excel and Google Sheets, semicolon (;) for European formats, or tab (\\t) for TSV files."
    },
    {
      title: "Review Preview",
      description: "The tool automatically extracts object keys as CSV headers and converts values to rows. Nested objects are flattened or stringified for CSV compatibility."
    },
    {
      title: "Download or Copy",
      description: "Click 'Download' to save as .csv file for import into Excel, Google Sheets, or databases. Or copy to clipboard for pasting directly into spreadsheet applications."
    }
  ],

  introduction: {
    title: "What is JSON to CSV Conversion?",
    content: `JSON (JavaScript Object Notation) to CSV (Comma-Separated Values) conversion transforms structured object data from web APIs and databases into spreadsheet-compatible tabular format. This conversion enables API data to be imported into Excel, Google Sheets, data analysis tools, and business intelligence platforms that require CSV input.

JSON represents data as key-value objects with nested structures, the native format for REST APIs, NoSQL databases (MongoDB, Firestore), and JavaScript applications. CSV represents data as flat rows and columns with delimiters, the universal format for spreadsheets and SQL database imports. Converting JSON to CSV enables web data to be analyzed in Excel, imported into SQL databases, or shared with non-technical teams.

### Why Convert JSON to CSV?

REST APIs return JSON responses that need to be imported into spreadsheets for analysis, reporting, or sharing with stakeholders. MongoDB exports JSON documents that must be converted to CSV for SQL database imports or Excel analysis. Application logs and analytics data in JSON format need CSV conversion for business intelligence tools like Tableau, Power BI, or Google Analytics.

When non-technical team members need to analyze API data, CSV format opens it in Excel without programming. When migrating from NoSQL (JSON documents) to SQL databases (CSV import), this conversion is essential. When building data pipelines that export to third-party tools requiring CSV, JSON to CSV is a critical step.

### JSON vs CSV: Data Structure Differences

JSON supports nested objects and arrays with unlimited hierarchy depth. CSV is strictly flat - every row has the same columns without nesting. When converting JSON to CSV, nested objects must be flattened (dot notation like \`user.name\`) or stringified (converting object to JSON string).

JSON has explicit data types: strings (quoted), numbers (unquoted), booleans (true/false), null, objects, and arrays. CSV treats everything as text strings - data type information is lost during conversion. Numbers, dates, and booleans become text unless the CSV parser infers types.

JSON keys become CSV column headers in the first row. JSON arrays of objects convert cleanly to CSV where each object is a row. However, inconsistent object keys across array items result in sparse CSV with empty cells where keys don't exist.

### When to Use JSON to CSV Conversion

Export API response data to Excel for analysis by business teams. Convert MongoDB query results to CSV for SQL database import using standard import tools. Transform application logs from JSON format to CSV for log analysis platforms. Share webhook payloads or event data with stakeholders in accessible spreadsheet format.

This tool handles complex JSON structures by flattening nested objects, stringifying arrays, and escaping special characters (commas, quotes, newlines) according to CSV RFC 4180 standard. All processing happens client-side - your API data remains private and never leaves your browser.`
  },

  useCases: [
    {
      title: "Export API Data to Excel for Analysis",
      description: "Convert REST API JSON responses to CSV for import into Excel or Google Sheets. Fetch data from your API, convert to CSV, and share with business analysts or product managers who need spreadsheet access.",
      example: `// 1. Fetch data from API
const response = await fetch('https://api.example.com/users');
const users = await response.json();

// 2. JSON from API:
[
  { "id": 1, "name": "John Doe", "email": "john@example.com", "signupDate": "2024-01-15" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "signupDate": "2024-01-20" }
]

// 3. Convert to CSV (this tool):
// id,name,email,signupDate
// 1,John Doe,john@example.com,2024-01-15
// 2,Jane Smith,jane@example.com,2024-01-20

// 4. Open in Excel for pivot tables, charts, and analysis`
    },
    {
      title: "Migrate MongoDB Data to SQL Database",
      description: "Export MongoDB collections as JSON and convert to CSV for import into PostgreSQL, MySQL, or other SQL databases using standard CSV import tools. Essential for NoSQL to SQL migrations.",
      example: `// 1. Export from MongoDB:
mongoexport --db myapp --collection users --out users.json --jsonArray

// 2. users.json contains:
[
  { "_id": "507f1f77", "username": "john", "email": "john@example.com", "role": "admin" },
  { "_id": "507f1f78", "username": "jane", "email": "jane@example.com", "role": "user" }
]

// 3. Convert to CSV (this tool), then import to PostgreSQL:
COPY users(id, username, email, role)
FROM '/path/to/users.csv'
DELIMITER ','
CSV HEADER;

// MongoDB data now in SQL database`
    },
    {
      title: "Transform Application Logs for Analysis",
      description: "Convert structured JSON logs to CSV for import into log analysis tools, spreadsheets, or BI platforms. Application logs in JSON format can be analyzed in Excel or uploaded to Splunk, Datadog, or custom dashboards.",
      example: `// Application logs: app.log (JSON Lines format)
{"timestamp":"2024-01-15T10:30:00Z","level":"error","message":"DB timeout","userId":123}
{"timestamp":"2024-01-15T10:31:00Z","level":"warn","message":"Slow query","duration":2500}

// Parse JSON lines to array:
const logs = logFile.split('\\n').map(line => JSON.parse(line));

// Convert to CSV (this tool):
// timestamp,level,message,userId,duration
// 2024-01-15T10:30:00Z,error,DB timeout,123,
// 2024-01-15T10:31:00Z,warn,Slow query,,2500

// Import to Excel or BI tool for filtering, charts, and analysis`
    },
    {
      title: "Share Webhook Data with Business Teams",
      description: "Convert webhook payloads or event data from JSON to CSV for sharing with non-technical stakeholders. Webhook systems send JSON events that business teams need to analyze in spreadsheets for tracking metrics or auditing.",
      example: `// Stripe webhook events stored as JSON:
[
  {
    "event": "payment.succeeded",
    "amount": 5000,
    "currency": "usd",
    "customer": "cus_123",
    "created": 1642348800
  },
  {
    "event": "payment.failed",
    "amount": 2500,
    "currency": "usd",
    "customer": "cus_456",
    "created": 1642349000
  }
]

// Convert to CSV and share with finance team:
// event,amount,currency,customer,created
// payment.succeeded,5000,usd,cus_123,1642348800
// payment.failed,2500,usd,cus_456,1642349000

// Finance team analyzes in Excel without API access`
    }
  ],

  howToUse: {
    title: "How to Use This JSON to CSV Converter",
    content: `This tool provides instant JSON to CSV conversion with automatic header extraction, nested object handling, and CSV escaping for special characters. All processing happens client-side using JavaScript - no server uploads or data transmission.

### Converting JSON to CSV

Paste your JSON array into the input field. The input must be an array of objects: \`[{...}, {...}]\`. Single objects or nested arrays require reformatting to array of objects. The tool extracts all unique keys from objects as CSV column headers.

### Delimiter Selection

Choose comma (,) for standard CSV compatible with Excel and Google Sheets. Select semicolon (;) for European Excel where comma is decimal separator. Use tab (\\t) for TSV format preferred by data science tools and avoiding delimiter conflicts.

### Handling Nested Objects

Nested objects in JSON are flattened using dot notation. For example, \`{"user": {"name": "John", "age": 30}}\` becomes CSV columns \`user.name,user.age\`. Alternatively, complex nested structures are stringified as JSON text within CSV cells.

### Special Character Escaping

The converter automatically wraps values containing commas, quotes, or newlines in double quotes following CSV RFC 4180. Internal quotes are escaped as double-quotes (""). For example, value \`Smith, "John"\` becomes CSV cell \`"Smith, ""John"""\`.

### Inconsistent Object Keys

If JSON objects have different keys (sparse data), the CSV includes all keys as headers. Missing keys in some objects result in empty CSV cells for those rows. This prevents data loss but creates sparse CSV with many empty values.

### Export Options

Download as .csv file for import into Excel, Google Sheets, or database import tools. Copy to clipboard for pasting directly into spreadsheet applications. The CSV includes header row by default for compatibility with most tools.`,
    steps: [
      {
        name: "Paste JSON Array",
        text: "Copy JSON array of objects from API responses, database exports, or configuration files. Must be array format: [{...}, {...}]."
      },
      {
        name: "Select Delimiter",
        text: "Choose comma (,) for standard CSV, semicolon (;) for European Excel, or tab (\\t) for TSV. Matches your target application's expected format."
      },
      {
        name: "Review Headers",
        text: "Tool automatically extracts JSON keys as CSV headers. Check that all expected columns are present and nested objects are flattened correctly."
      },
      {
        name: "Download or Copy",
        text: "Download as .csv file for Excel/Sheets import, or copy to clipboard for pasting. CSV is ready for immediate use in spreadsheet applications."
      }
    ]
  },

  faqs: [
    {
      question: "Why does my JSON need to be an array of objects?",
      answer: "CSV format represents tabular data (rows and columns). Each JSON object becomes a CSV row, and object keys become column headers. A single JSON object would produce only one CSV row. Nested arrays or non-uniform structures don't map cleanly to CSV's flat table format. If you have a single object, wrap it in array: [{...}] before converting."
    },
    {
      question: "How are nested objects handled in CSV conversion?",
      answer: "Nested objects are flattened using dot notation. For example, {\"user\": {\"name\": \"John\", \"address\": {\"city\": \"NYC\"}}} becomes CSV columns: user.name, user.address.city. Very deeply nested structures (3+ levels) may be stringified as JSON text within CSV cells to prevent excessive column proliferation. Arrays within objects are converted to JSON strings."
    },
    {
      question: "What happens if objects have different keys?",
      answer: "The converter extracts all unique keys from all objects as CSV headers. Objects missing certain keys result in empty CSV cells for those columns. For example, [{\"name\": \"John\", \"age\": 30}, {\"name\": \"Jane\", \"email\": \"jane@example.com\"}] produces CSV with columns name,age,email where John has no email and Jane has no age (empty cells)."
    },
    {
      question: "Can I convert JSON back to CSV?",
      answer: "Yes, but with data type loss. Use our CSV to JSON converter (/csv-json) for the reverse operation. However, CSV has no type information - numbers, booleans, and nulls in JSON become text strings in CSV. Re-converting CSV to JSON produces objects with all string values unless you manually parse types."
    },
    {
      question: "How do I handle JSON with arrays inside objects?",
      answer: "Arrays within objects are stringified as JSON text in CSV cells. For example, {\"name\": \"John\", \"hobbies\": [\"reading\", \"coding\"]} becomes CSV: John,\"[\"\"reading\"\",\"\"coding\"\"]\". The array is preserved as text. To properly flatten arrays, restructure JSON first: create separate rows for each array item with repeated parent data."
    },
    {
      question: "Why is my CSV opening incorrectly in Excel?",
      answer: "Delimiter mismatch: US Excel expects commas, European Excel expects semicolons. Choose semicolon delimiter for European Excel. Encoding issues: Save CSV as UTF-8 with BOM if Excel shows corrupted special characters. Excel auto-formatting: Numbers like '01234' may lose leading zeros - prefix with single quote in JSON ('01234) to preserve as text."
    },
    {
      question: "How do I import the CSV into a SQL database?",
      answer: "Most SQL databases have CSV import tools. PostgreSQL: \\`COPY table FROM '/path/to/file.csv' DELIMITER ',' CSV HEADER;\\`. MySQL: \\`LOAD DATA INFILE '/path/to/file.csv' INTO TABLE table FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS;\\`. Map CSV columns to table columns in your import statement."
    },
    {
      question: "Can this handle large JSON files (100MB+)?",
      answer: "Browser JavaScript can process files up to ~100-200MB depending on available memory, but large files may freeze the browser tab. For files over 50MB, use server-side processing with Node.js streaming JSON-to-CSV libraries. This client-side tool is optimized for typical API responses and data exports (1-50MB)."
    },
    {
      question: "How are null and undefined values handled?",
      answer: "JSON null values convert to empty CSV cells (two consecutive delimiters: ,,). Undefined values also become empty cells. Boolean false converts to text 'false' (not empty). To distinguish null from empty strings in CSV, you'd need custom handling in your application code since CSV doesn't differentiate null vs empty."
    },
    {
      question: "Is my JSON data private and secure?",
      answer: "Absolutely. All JSON to CSV conversion happens entirely in your browser using client-side JavaScript. Your JSON data never leaves your device or gets uploaded to any server. No network requests are made with your data. You can verify this by opening browser DevTools Network tab - zero uploads. Safe for sensitive API responses, customer data, financial records, or confidential business information."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your JSON data never leaves your browser. This converter operates entirely client-side using JavaScript's built-in JSON parsing and string processing. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All JSON parsing and CSV generation happens in your browser's JavaScript engine. Data stays on your device.
- **No Server Uploads:** We don't have backend servers to process JSON files. The tool works completely offline after first page load.
- **No Data Storage:** Your JSON input and CSV output are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone (unless you save locally).
- **No Analytics on Content:** We don't track what you convert, API endpoints, data values, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your data.

Safe for converting sensitive API responses, customer data, financial records, healthcare data (HIPAA), payment information (PCI-DSS), or any confidential business data. Use with confidence for production data exports, customer analytics, or regulated data processing.`
  },

  stats: {
    "Conversion Speed": "<100ms",
    "Max File Size": "50MB",
    "Delimiter Types": "3",
    "Nested Objects": "Supported",
    "Server Uploads": "0"
  }
};
