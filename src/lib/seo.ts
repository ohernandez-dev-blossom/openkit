import { Metadata } from "next";

type ToolSEO = {
  title: string;
  description: string;
  keywords: string[];
  path: string;
};

export const toolsSEO: Record<string, ToolSEO> = {
  json: {
    title: "JSON Formatter & Validator Online - Free JSON Beautifier",
    description: "Format, validate, and beautify JSON online for free. Minify JSON, convert to tree view, and compare JSON files. Fast, private, no data sent to servers.",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier", "format json online", "json viewer"],
    path: "/json",
  },
  colors: {
    title: "Color Converter - HEX to RGB, HSL Converter Online",
    description: "Convert colors between HEX, RGB, and HSL formats instantly. Free online color picker with live preview. Copy color values with one click.",
    keywords: ["hex to rgb", "color converter", "rgb to hex", "hsl converter", "color picker online", "hex color code"],
    path: "/colors",
  },
  fees: {
    title: "PayPal Fee Calculator - Stripe & Wise Fees Calculator",
    description: "Calculate PayPal, Stripe, and Wise payment processing fees instantly. Know exactly what you'll pay or receive. Free online fee calculator.",
    keywords: ["paypal fee calculator", "stripe fee calculator", "payment fee calculator", "wise fees", "paypal fees"],
    path: "/fees",
  },
  timestamp: {
    title: "Unix Timestamp Converter - Epoch Time Converter Online",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Support for seconds and milliseconds. Free epoch time converter.",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "unix time", "epoch time"],
    path: "/timestamp",
  },
  base64: {
    title: "Base64 Encoder & Decoder Online - URL Encoder Free",
    description: "Encode and decode Base64, URL, and HTML entities online for free. Fast, private encoding tool that works in your browser.",
    keywords: ["base64 encode", "base64 decode", "url encoder", "base64 converter", "online encoder"],
    path: "/base64",
  },
  base58: {
    title: "Base58 Encoder & Decoder Online - Bitcoin Address Encoding",
    description: "Encode and decode Base58 strings online. Used in Bitcoin addresses, IPFS hashes, and cryptocurrency applications. Supports text and hex input.",
    keywords: ["base58 encoder", "base58 decoder", "bitcoin address encoding", "ipfs hash", "base58 online", "crypto encoding"],
    path: "/base58",
  },
  hash: {
    title: "MD5 Hash Generator - SHA256, SHA512 Hash Online",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes online for free. Secure hash generator that works in your browser.",
    keywords: ["md5 hash generator", "sha256 generator", "hash generator online", "sha512", "md5 checksum"],
    path: "/hash",
  },
  lorem: {
    title: "Lorem Ipsum Generator - Placeholder Text Generator",
    description: "Generate lorem ipsum placeholder text for designs. Create paragraphs, sentences, or words. Free online dummy text generator.",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator", "lipsum", "random text"],
    path: "/lorem",
  },
  markdown: {
    title: "Markdown Preview - Online Markdown Editor Free",
    description: "Live markdown preview and editor online. Support for GitHub Flavored Markdown, tables, code highlighting. Free markdown viewer.",
    keywords: ["markdown preview", "markdown editor online", "md preview", "markdown viewer", "github markdown"],
    path: "/markdown",
  },
  qr: {
    title: "QR Code Generator Free - Create QR Codes Online",
    description: "Generate QR codes for URLs, text, WiFi, and more. Customize colors, size, and error correction. Free online QR code maker.",
    keywords: ["qr code generator", "create qr code", "qr code maker", "free qr code", "qr code online"],
    path: "/qr",
  },
  diff: {
    title: "Text Diff Checker - Compare Text Online Free",
    description: "Compare two texts and see differences highlighted. Support for line, word, and character diff. Free online text comparison tool.",
    keywords: ["text diff", "compare text", "diff checker", "text comparison", "find differences"],
    path: "/diff",
  },
  regex: {
    title: "Regex Tester Online - Regular Expression Tester Free",
    description: "Test and debug regular expressions online with live highlighting. Support for JavaScript regex. Free regex validator and tester.",
    keywords: ["regex tester", "regex101", "regular expression tester", "regex validator", "test regex online"],
    path: "/regex",
  },
  words: {
    title: "Word Counter - Character Count Online Free",
    description: "Count words, characters, sentences, and paragraphs. Get reading time and speaking time estimates. Free online word counter.",
    keywords: ["word counter", "character count", "word count online", "text counter", "letter counter"],
    path: "/words",
  },
  uuid: {
    title: "UUID Generator - Random GUID Generator Online",
    description: "Generate random UUIDs (v4) instantly. Bulk generate multiple UUIDs, copy with one click. Free online UUID/GUID generator.",
    keywords: ["uuid generator", "guid generator", "random uuid", "uuid v4", "generate uuid online"],
    path: "/uuid",
  },
  password: {
    title: "Password Generator - Secure Random Password Creator",
    description: "Generate strong, secure random passwords instantly. Customize length and character types. Free online password generator.",
    keywords: ["password generator", "random password", "secure password", "strong password generator", "password creator"],
    path: "/password",
  },
  ip: {
    title: "What Is My IP - IP Address Lookup Free",
    description: "Find your public IP address and location instantly. See your city, country, and ISP. Free online IP lookup tool.",
    keywords: ["what is my ip", "my ip address", "ip lookup", "find my ip", "ip location"],
    path: "/ip",
  },
  border: {
    title: "CSS Border Radius Generator - Border Radius Online",
    description: "Generate CSS border radius values visually. Create rounded corners, blobs, and custom shapes. Copy CSS and Tailwind code instantly.",
    keywords: ["border radius generator", "css border radius", "rounded corners css", "border radius calculator", "tailwind rounded"],
    path: "/border",
  },
  duplicate: {
    title: "Remove Duplicate Lines - Duplicate Line Remover Online",
    description: "Remove duplicate lines from text instantly. Case-sensitive options, trim whitespace, remove empty lines. Free online duplicate remover.",
    keywords: ["remove duplicate lines", "duplicate line remover", "unique lines", "remove duplicates text", "deduplicate"],
    path: "/duplicate",
  },
  sort: {
    title: "Sort Lines Alphabetically - Line Sorter Online Free",
    description: "Sort text lines alphabetically or by length. Ascending or descending order. Remove empty lines. Free online line sorter.",
    keywords: ["sort lines alphabetically", "line sorter", "alphabetize text", "sort text online", "text sorter"],
    path: "/sort",
  },
  "text-binary": {
    title: "Text to Binary Converter - Binary to Text Online",
    description: "Convert text to binary and binary to text instantly. Support for ASCII encoding. Free online binary converter.",
    keywords: ["text to binary", "binary to text", "binary converter", "text binary converter", "ascii binary"],
    path: "/text-binary",
  },
  "iban-gen": {
    title: "IBAN Generator & Validator - International Bank Account Number",
    description: "Generate valid test IBANs for multiple countries and validate existing IBANs with checksum verification. Supports 10+ European countries. 100% client-side processing.",
    keywords: ["iban generator", "iban validator", "iban checksum", "international bank account number", "generate iban", "validate iban", "iban test", "iban format"],
    path: "/iban-gen",
  },
  // JWT Tools
  jwt: {
    title: "JWT Decoder - Decode JSON Web Tokens Online",
    description: "Decode and inspect JSON Web Tokens (JWT) online. View header, payload, and signature. Verify token expiration and claims. Free JWT debugger.",
    keywords: ["jwt decoder", "decode jwt", "json web token", "jwt debugger", "jwt inspector", "token decoder"],
    path: "/jwt",
  },
  "jwt-gen": {
    title: "JWT Generator - Create JSON Web Tokens Online",
    description: "Generate signed JSON Web Tokens (JWT) with HS256, HS384, HS512 algorithms. Create tokens with custom claims and expiration. Free online JWT generator.",
    keywords: ["jwt generator", "create jwt", "json web token generator", "jwt signer", "hs256", "hs512", "token generator"],
    path: "/jwt-gen",
  },
  // Encoders
  url: {
    title: "URL Encoder & Decoder - URL Escape Online",
    description: "Encode and decode URLs and URL components. Convert special characters to percent-encoded format. Free online URL encoder/decoder.",
    keywords: ["url encoder", "url decoder", "percent encode", "url escape", "url encode online", "decode url"],
    path: "/url",
  },
  morse: {
    title: "Morse Code Translator - Text to Morse Online",
    description: "Convert text to Morse code and Morse code to text. Support for audio playback and visual signals. Free online Morse translator.",
    keywords: ["morse code", "morse translator", "text to morse", "morse decoder", "morse encoder", "telegraph"],
    path: "/morse",
  },
  nato: {
    title: "NATO Phonetic Alphabet Translator",
    description: "Convert text to NATO phonetic alphabet. Spell out words using Alpha, Bravo, Charlie. Free online phonetic alphabet converter.",
    keywords: ["nato phonetic alphabet", "phonetic alphabet", "alpha bravo charlie", "spelling alphabet", "icao alphabet"],
    path: "/nato",
  },
  // Formatters
  "css-format": {
    title: "CSS Formatter & Beautifier - Format CSS Online",
    description: "Format and beautify CSS code with proper indentation. Clean up minified CSS for better readability. Free online CSS formatter.",
    keywords: ["css formatter", "beautify css", "format css", "css prettier", "clean css", "css beautifier"],
    path: "/css-format",
  },
  "css-minify": {
    title: "CSS Minifier - Compress CSS Online",
    description: "Minify and compress CSS code for production. Remove whitespace and reduce file size. Free online CSS minifier.",
    keywords: ["css minifier", "compress css", "minify css", "css compressor", "css optimizer", "reduce css size"],
    path: "/css-minify",
  },
  "html-format": {
    title: "HTML Formatter & Beautifier - Format HTML Online",
    description: "Format and beautify HTML code with proper indentation. Clean up minified HTML for better readability. Free online HTML formatter.",
    keywords: ["html formatter", "beautify html", "format html", "html prettier", "clean html", "html beautifier"],
    path: "/html-format",
  },
  "xml-format": {
    title: "XML Formatter & Beautifier - Format XML Online",
    description: "Format and beautify XML code with proper indentation. Validate XML syntax and clean up minified XML. Free online XML formatter.",
    keywords: ["xml formatter", "beautify xml", "format xml", "xml prettier", "clean xml", "xml beautifier"],
    path: "/xml-format",
  },
  "sql-format": {
    title: "SQL Formatter & Beautifier - Format SQL Online",
    description: "Format and beautify SQL queries with proper indentation. Support for multiple SQL dialects. Free online SQL formatter.",
    keywords: ["sql formatter", "beautify sql", "format sql", "sql prettier", "clean sql", "sql beautifier"],
    path: "/sql-format",
  },
  "js-minify": {
    title: "JavaScript Minifier - Compress JS Online",
    description: "Minify and compress JavaScript code for production. Remove whitespace and reduce file size. Free online JS minifier.",
    keywords: ["javascript minifier", "compress js", "minify javascript", "js compressor", "js optimizer", "uglify js"],
    path: "/js-minify",
  },
  // Generators
  "lorem-adv": {
    title: "Advanced Lorem Ipsum Generator - Multiple Flavors",
    description: "Generate lorem ipsum in multiple flavors: hipster, tech, corporate, and more. Customize paragraphs and style. Free advanced placeholder text generator.",
    keywords: ["lorem ipsum generator", "hipster ipsum", "tech ipsum", "placeholder text", "dummy text", "corporate ipsum"],
    path: "/lorem-adv",
  },
  random: {
    title: "Random Number Generator - Generate Random Numbers",
    description: "Generate random numbers within a range. Simulate dice rolls, coin flips, and lottery numbers. Free online random number generator.",
    keywords: ["random number generator", "random number", "dice roller", "coin flip", "lottery number generator"],
    path: "/random",
  },
  "cc-gen": {
    title: "Credit Card Generator - Test Credit Card Numbers",
    description: "Generate valid test credit card numbers with proper Luhn checksum. Support for Visa, Mastercard, Amex, and more. For testing only.",
    keywords: ["credit card generator", "test credit card", "fake credit card", "luhn algorithm", "visa generator", "test card numbers"],
    path: "/cc-gen",
  },
  // Converters
  "csv-json": {
    title: "CSV to JSON Converter - Convert CSV to JSON Online",
    description: "Convert CSV files to JSON format instantly. Support for headers, custom delimiters, and nested objects. Free online CSV to JSON converter.",
    keywords: ["csv to json", "convert csv to json", "csv json converter", "csv parser", "json converter"],
    path: "/csv-json",
  },
  "json-csv": {
    title: "JSON to CSV Converter - Convert JSON to CSV Online",
    description: "Convert JSON data to CSV format instantly. Flatten nested objects and arrays. Free online JSON to CSV converter.",
    keywords: ["json to csv", "convert json to csv", "json csv converter", "export json to csv", "json flatten"],
    path: "/json-csv",
  },
  unit: {
    title: "Unit Converter - Convert Length, Weight, Temperature",
    description: "Convert between various units of measurement. Length, weight, temperature, data size, and more. Free online unit converter.",
    keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "measurement converter"],
    path: "/unit",
  },
  temp: {
    title: "Temperature Converter - Celsius, Fahrenheit, Kelvin",
    description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin. Instant temperature conversion with formula display.",
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "temperature conversion"],
    path: "/temp",
  },
  epoch: {
    title: "Epoch Converter - Unix Timestamp Converter",
    description: "Convert Unix epoch timestamps to human-readable dates. Support for seconds and milliseconds. Free online epoch converter.",
    keywords: ["epoch converter", "unix timestamp", "epoch time", "unix time converter", "timestamp to date"],
    path: "/epoch",
  },
  timezone: {
    title: "Timezone Converter - Convert Time Between Timezones",
    description: "Convert time between different timezones worldwide. Compare multiple cities and plan meetings. Free online timezone converter.",
    keywords: ["timezone converter", "time zone converter", "convert time zones", "world clock", "meeting planner"],
    path: "/timezone",
  },
  // Text Tools
  case: {
    title: "Case Converter - Convert Text Case Online",
    description: "Convert text between different cases: camelCase, snake_case, kebab-case, PascalCase, and more. Free online case converter.",
    keywords: ["case converter", "camelcase converter", "snake case", "kebab case", "pascal case", "text case"],
    path: "/case",
  },
  slug: {
    title: "Slug Generator - URL Friendly Slug Creator",
    description: "Generate URL-friendly slugs from text. Remove special characters and create SEO-friendly URLs. Free online slug generator.",
    keywords: ["slug generator", "url slug", "permalink generator", "seo friendly url", "clean url"],
    path: "/slug",
  },
  lines: {
    title: "Line Counter - Count Lines in Text",
    description: "Count lines, words, and characters in text. Get detailed statistics about your text content. Free online line counter.",
    keywords: ["line counter", "count lines", "text statistics", "line count", "character count"],
    path: "/lines",
  },
  "text-stats": {
    title: "Text Statistics Analyzer - Advanced Text Analysis",
    description: "Analyze text with advanced statistics. Word count, readability scores, character frequency, and more. Free online text analyzer.",
    keywords: ["text analyzer", "text statistics", "readability score", "flesch kincaid", "character frequency"],
    path: "/text-stats",
  },
  reverse: {
    title: "Text Reverser - Reverse Text Online",
    description: "Reverse text characters, words, or lines. Create mirror text and backwards writing. Free online text reverser.",
    keywords: ["text reverser", "reverse text", "mirror text", "backwards text", "flip text"],
    path: "/reverse",
  },
  // Design Tools
  gradient: {
    title: "CSS Gradient Generator - Create CSS Gradients",
    description: "Generate CSS gradients with linear, radial, and conic types. Copy CSS code instantly. Free online gradient generator.",
    keywords: ["css gradient generator", "linear gradient", "radial gradient", "css gradient maker", "gradient css"],
    path: "/gradient",
  },
  shadow: {
    title: "CSS Box Shadow Generator - Create Box Shadows",
    description: "Generate CSS box shadows with visual editor. Create single or multi-layer shadows. Copy CSS code instantly.",
    keywords: ["css box shadow", "box shadow generator", "css shadow", "drop shadow", "shadow css"],
    path: "/shadow",
  },
  // DevTools
  cron: {
    title: "Cron Expression Parser - Understand Cron Jobs",
    description: "Parse cron expressions and see next execution times. Understand cron schedule format. Free online cron parser.",
    keywords: ["cron parser", "cron expression", "cron schedule", "crontab", "cron job"],
    path: "/cron",
  },
  docker: {
    title: "Docker Compose Generator - Create docker-compose.yml",
    description: "Generate Docker Compose files for common stacks. Pre-configured templates for web apps, databases, and more.",
    keywords: ["docker compose generator", "docker compose", "docker yaml", "docker stack", "compose file"],
    path: "/docker",
  },
  gitignore: {
    title: ".gitignore Generator - Create Gitignore Files",
    description: "Generate .gitignore files for any programming language or framework. Templates for Node, Python, Java, Go, and more.",
    keywords: ["gitignore generator", ".gitignore", "git ignore", "gitignore template", "create gitignore"],
    path: "/gitignore",
  },
  // Finance Tools
  tip: {
    title: "Tip Calculator - Calculate Tips & Split Bills",
    description: "Calculate tips and split bills among multiple people. Customizable tip percentages. Free online tip calculator.",
    keywords: ["tip calculator", "calculate tip", "split bill", "restaurant tip", "gratuity calculator"],
    path: "/tip",
  },
  vat: {
    title: "VAT Calculator - Add or Remove VAT/Tax",
    description: "Calculate VAT or sales tax. Add tax to prices or extract tax from totals. Free online VAT calculator.",
    keywords: ["vat calculator", "tax calculator", "sales tax", "gst calculator", "vat removal"],
    path: "/vat",
  },
  discount: {
    title: "Discount Calculator - Calculate Sale Prices",
    description: "Calculate discount amounts and sale prices. Find savings on discounted items. Free online discount calculator.",
    keywords: ["discount calculator", "sale calculator", "percentage off", "price discount", "calculate savings"],
    path: "/discount",
  },
};

export function generateToolMetadata(toolKey: string): Metadata {
  const tool = toolsSEO[toolKey];
  if (!tool) return {};
  
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `https://openkit.tools${tool.path}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: tool.title,
      description: tool.description,
    },
    alternates: {
      canonical: `https://openkit.tools${tool.path}`,
    },
  };
}
