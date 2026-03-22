/**
 * Case Converter Tool Guide Content
 * Comprehensive developer guide for text case transformations
 */

import type { ToolGuideContent } from "./types";

export const caseGuideContent: ToolGuideContent = {
  toolName: "Case Converter",
  toolPath: "/case",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Text",
      description: "Type or paste any text into the input field. Works with variable names, sentences, titles, URLs, or any string you need to transform between different case styles."
    },
    {
      title: "View All 15 Case Styles",
      description: "See your text instantly transformed into 15 different case formats: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, and more. All transformations update in real-time."
    },
    {
      title: "Click to Copy Result",
      description: "Click any transformed result to copy it to your clipboard. Each result box shows visual feedback when copied. No need to manually select and copy text."
    },
    {
      title: "Use Batch Mode for Multiple Lines",
      description: "Enable Batch Mode to process multiple lines at once. Each line is transformed independently, perfect for converting lists of variables, function names, or database columns."
    }
  ],

  introduction: {
    title: "What is Case Conversion?",
    content: `Case conversion transforms text between different capitalization and word separation styles used across programming languages, naming conventions, and writing standards. Developers constantly convert between camelCase (JavaScript), snake_case (Python), PascalCase (C#), kebab-case (URLs), and CONSTANT_CASE (environment variables) when working across different codebases and platforms.

Each programming language and platform has strict naming conventions. JavaScript uses camelCase for variables and functions, PascalCase for classes and React components. Python uses snake_case for everything. CSS uses kebab-case for class names. Constants and environment variables use CONSTANT_CASE across all languages. Converting between these styles manually is tedious and error-prone.

### Why Case Conversion Matters

Naming conventions aren't just style preferences - they're enforced by linters, rejected by code reviewers, and impact code readability and maintainability. When refactoring between languages (JavaScript to Python), migrating databases (SQL columns to MongoDB fields), or integrating APIs with different conventions, case conversion is essential.

Writing API integrations requires converting between API response keys (often snake_case from Python backends) and frontend variables (camelCase in JavaScript). Building CSS requires converting component names (PascalCase in React) to class names (kebab-case in stylesheets). Setting up environment variables requires converting config keys to CONSTANT_CASE format.

### Programming Language Case Conventions

**JavaScript/TypeScript:** camelCase for variables/functions (\`getUserData\`), PascalCase for classes/components (\`UserProfile\`), CONSTANT_CASE for constants (\`MAX_RETRIES\`).

**Python:** snake_case for variables/functions/methods (\`get_user_data\`), PascalCase for classes (\`UserProfile\`), CONSTANT_CASE for constants (\`MAX_RETRIES\`).

**Ruby:** snake_case for variables/methods (\`get_user_data\`), PascalCase for classes (\`UserProfile\`), CONSTANT_CASE for constants.

**Java/C#:** camelCase for variables/methods (\`getUserData\`), PascalCase for classes (\`UserProfile\`), CONSTANT_CASE for constants.

**Go:** PascalCase for exported identifiers (\`GetUserData\`), camelCase for private (\`getUserData\`).

**PHP:** snake_case or camelCase depending on framework (Laravel uses snake_case, Symfony uses camelCase).

**Database:** snake_case for SQL table/column names (\`user_profiles\`, \`created_at\`), camelCase for MongoDB fields.

**URLs/CSS:** kebab-case for URLs (\`/user-profile\`), CSS classes (\`.user-profile\`), and filenames (\`user-profile.tsx\`).

### Beyond Programming: Other Case Styles

**Title Case:** Capitalize major words for article titles, headings, and documentation. Follows grammar rules where small words (a, an, the, of, in) stay lowercase unless first word.

**Sentence case:** First word capitalized like normal sentences. Used in UI text, form labels, and user-facing content.

**iNVERSE cASE / aLtErNaTe CaSe:** Novelty cases for fun or artistic text. Inverse case flips upper to lower and vice versa. Alternate case alternates each character.

This tool handles all common programming conventions plus specialized transformations, making it a one-stop solution for any case conversion need. All processing happens instantly in your browser using JavaScript string methods and regex patterns.`
  },

  useCases: [
    {
      title: "Convert API Response Keys for Frontend",
      description: "Backend APIs (Python/Ruby) use snake_case for JSON keys, but JavaScript frontends use camelCase. Convert API response keys to match JavaScript conventions when integrating third-party APIs or building API wrapper libraries.",
      example: `// Python API response (snake_case):
{
  "user_id": 123,
  "first_name": "John",
  "last_name": "Doe",
  "created_at": "2024-01-15T10:30:00Z"
}

// Convert keys to camelCase for JavaScript:
{
  userId: 123,
  firstName: "John",
  lastName: "Doe",
  createdAt: "2024-01-15T10:30:00Z"
}

// Or use library to auto-convert:
import camelcaseKeys from 'camelcase-keys';
const response = await fetch('/api/user');
const data = camelcaseKeys(await response.json());
// data.userId, data.firstName work in JavaScript`
    },
    {
      title: "Generate CSS Class Names from React Components",
      description: "React components use PascalCase naming, but CSS class names follow kebab-case convention. Convert component names to CSS class names when building stylesheets or CSS modules for React applications.",
      example: `// React components (PascalCase):
UserProfileCard
NavigationHeader
SearchInputField

// Convert to CSS class names (kebab-case):
.user-profile-card { /* styles */ }
.navigation-header { /* styles */ }
.search-input-field { /* styles */ }

// In component:
<div className="user-profile-card">
  {/* UserProfileCard content */}
</div>

// Or use CSS Modules with automatic conversion:
import styles from './UserProfileCard.module.css';
<div className={styles.userProfileCard}>`
    },
    {
      title: "Convert Database Columns for ORM Models",
      description: "SQL databases use snake_case column names, but ORM models (Sequelize, TypeORM, Mongoose) use camelCase properties. Convert database column names when writing model definitions or migration files.",
      example: `// SQL database columns (snake_case):
// users table: user_id, first_name, last_name, email_address, created_at

// TypeScript ORM model (camelCase):
class User {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  createdAt: Date;
}

// Sequelize model definition:
const User = sequelize.define('User', {
  userId: { type: DataTypes.INTEGER, field: 'user_id' },
  firstName: { type: DataTypes.STRING, field: 'first_name' },
  lastName: { type: DataTypes.STRING, field: 'last_name' },
  emailAddress: { type: DataTypes.STRING, field: 'email_address' },
  createdAt: { type: DataTypes.DATE, field: 'created_at' }
});`
    },
    {
      title: "Create Environment Variables from Config Keys",
      description: "Application config keys (camelCase in code) need to be converted to CONSTANT_CASE for environment variables. Convert config property names when creating .env files or CI/CD configuration.",
      example: `// Config object (camelCase):
const config = {
  databaseUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  maxConnections: process.env.MAX_CONNECTIONS,
  enableLogging: process.env.ENABLE_LOGGING
};

// Environment variables (.env file) - CONSTANT_CASE:
DATABASE_URL=postgresql://localhost/mydb
API_KEY=sk_test_1234567890
MAX_CONNECTIONS=10
ENABLE_LOGGING=true

// Conversion mapping:
// databaseUrl → DATABASE_URL
// apiKey → API_KEY
// maxConnections → MAX_CONNECTIONS
// enableLogging → ENABLE_LOGGING`
    }
  ],

  howToUse: {
    title: "How to Use This Case Converter",
    content: `This tool provides instant case conversion with 15 different transformation styles. Type once, see all conversions in real-time. Click any result to copy to clipboard. All processing happens client-side using JavaScript string methods.

### Single Text Conversion

Enter any text - variable names, function names, sentences, or mixed text. The tool instantly shows 15 transformations: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case, Title Case, Sentence case, lowercase, UPPERCASE, iNVERSE cASE, aLtErNaTe CaSe, SpOnGeBoB cAsE, and esreveR (reversed).

### Batch Mode for Multiple Lines

Enable "Batch Mode" to process multiple lines simultaneously. Each line is converted independently. Perfect for converting lists of variables, function names, or database columns. Paste a list, enable batch mode, and click any transformation to copy all results.

### Preserve Formatting

When batch mode is enabled, toggle "Preserve empty lines" to maintain blank lines in your input. Useful for preserving section separators or spacing in lists of variables.

### Copy All Results

Click "Copy All Results" to copy every transformation style to clipboard in formatted text. Useful for documentation or comparing all styles before choosing one.

### Case Transformation Algorithms

**camelCase:** Remove special chars, lowercase first word, capitalize first letter of subsequent words, remove spaces. \`hello world\` → \`helloWorld\`.

**PascalCase:** Remove special chars, capitalize first letter of every word, remove spaces. \`hello world\` → \`HelloWorld\`.

**snake_case:** Lowercase, replace spaces with underscores, remove special chars. \`hello world\` → \`hello_world\`.

**kebab-case:** Lowercase, replace spaces with hyphens, remove special chars. \`hello world\` → \`hello-world\`.

**CONSTANT_CASE:** Uppercase, replace spaces with underscores, remove special chars. \`hello world\` → \`HELLO_WORLD\`.

**Title Case:** Capitalize first letter of major words, lowercase articles/prepositions (a, an, the, of, in, on, at, to) unless first word. \`the quick brown fox\` → \`The Quick Brown Fox\`.

**Sentence case:** Lowercase everything except first letter of sentences (after periods, question marks, exclamation points). \`hello world. another sentence\` → \`Hello world. Another sentence\`.

### Keyboard Shortcuts

All transformations update on every keystroke - no need to click "Convert" button. Click any result box to instantly copy that transformation to clipboard.`,
    steps: [
      {
        name: "Enter Text",
        text: "Type or paste any text into the input field. Variable names, sentences, mixed text - anything works."
      },
      {
        name: "View Transformations",
        text: "See 15 different case styles instantly. All results update in real-time as you type."
      },
      {
        name: "Click to Copy",
        text: "Click any transformation result to copy it to clipboard. Visual feedback confirms successful copy."
      },
      {
        name: "Use Batch Mode",
        text: "Enable Batch Mode for multiple lines. Each line transforms independently. Perfect for converting variable lists."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between camelCase and PascalCase?",
      answer: "camelCase starts with lowercase letter (\`myVariable\`, \`getUserData\`), while PascalCase starts with uppercase (\`MyClass\`, \`GetUserData\`). JavaScript uses camelCase for variables/functions and PascalCase for classes/components. Both remove spaces and capitalize first letter of subsequent words. PascalCase is also called UpperCamelCase."
    },
    {
      question: "When should I use snake_case vs kebab-case?",
      answer: "snake_case (underscores) is used in Python code, Ruby code, SQL databases, and some API responses. kebab-case (hyphens) is used in URLs, CSS class names, HTML attributes, and filenames. Never use kebab-case in programming language identifiers - hyphens are minus operators. Use snake_case for backend code, kebab-case for frontend resources (URLs, CSS)."
    },
    {
      question: "How does Title Case handle small words?",
      answer: "Title Case follows English grammar rules: major words (nouns, verbs, adjectives) are capitalized, while articles (a, an, the), prepositions (of, in, on, at, to, by, for), and conjunctions (and, or, but) stay lowercase - UNLESS they're the first word. Example: \`the art of war\` → \`The Art of War\` (first 'the' capitalized, 'of' stays lowercase)."
    },
    {
      question: "Can this handle special characters and Unicode?",
      answer: "Special characters (punctuation, symbols) are removed in programming case styles (camelCase, snake_case, etc.) to produce valid identifiers. Unicode characters (accented letters like é, ñ, ü) are preserved in Title Case and Sentence case but may be removed or transliterated in programming cases depending on browser implementation. For maximum compatibility, stick to ASCII (a-z, A-Z, 0-9)."
    },
    {
      question: "What is CONSTANT_CASE used for?",
      answer: "CONSTANT_CASE (also called SCREAMING_SNAKE_CASE) is used for constants and environment variables across all programming languages. Examples: \`MAX_RETRIES\`, \`API_KEY\`, \`DATABASE_URL\`. The all-caps format makes constants visually distinct from variables in code. Environment variables (.env files) always use CONSTANT_CASE by convention."
    },
    {
      question: "How does Batch Mode work?",
      answer: "Batch Mode treats each line as separate input and applies transformations independently. Input 10 lines, get 10 transformed results per case style. Perfect for converting lists of variables, function names, or database columns. Enable 'Preserve empty lines' to maintain blank line separators in your list. Copy any transformation to get all lines in that case style."
    },
    {
      question: "Can I reverse the transformation (e.g., camelCase back to words)?",
      answer: "Not perfectly. Converting 'helloWorld' to 'hello world' requires detecting capital letters as word boundaries, but acronyms complicate this ('URLParser' could be 'url parser' or 'URL Parser'). For best results, keep original text and convert to needed case. Attempting reverse conversion loses information about original spacing and capitalization."
    },
    {
      question: "Why use dot.case or path/case?",
      answer: "dot.case is used in Java package names (\`com.example.app\`), JavaScript namespaces (\`window.location.href\`), and some config files. path/case is used in URL routes (\`/api/user/profile\`), file paths (\`src/components/Button\`), and GraphQL paths. Both are valid programming identifiers in specific contexts and help organize hierarchical names."
    },
    {
      question: "What are iNVERSE, aLtErNaTe, and SpOnGeBoB cases?",
      answer: "These are novelty/artistic transformations. iNVERSE cASE flips uppercase to lowercase and vice versa. aLtErNaTe CaSe alternates each letter. SpOnGeBoB cAsE (mocking text meme) randomly alternates case. esreveR reverses text. These aren't used in programming but are fun for creative text, social media, or demonstrating string manipulation algorithms."
    },
    {
      question: "Is my text data private and secure?",
      answer: "Absolutely. All case conversion happens entirely in your browser using JavaScript string methods (.toLowerCase(), .toUpperCase(), .replace(), regex). Your text never leaves your device or gets uploaded to servers. No network requests are made with your input. You can verify this by disconnecting from internet - the tool still works offline. Safe for converting sensitive variable names, proprietary code, or confidential text."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This case converter operates entirely client-side using JavaScript's built-in string manipulation methods. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All case transformations happen in your browser's JavaScript engine using native string methods. Text stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your input text and conversion results are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you convert, variable names, code snippets, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for converting proprietary code, sensitive variable names, confidential configuration, or any internal naming conventions. Use with confidence for production code, customer data fields, or regulated system identifiers.`
  },

  stats: {
    "Transformation Speed": "<1ms",
    "Case Styles": "15",
    "Batch Mode": "Yes",
    "Unicode Support": "Full",
    "Server Uploads": "0"
  }
};
