import { ToolGuideContent } from './types';

export const sqlToMongodbGuideContent: ToolGuideContent = {
  toolName: "SQL to MongoDB Converter",
  toolPath: "/sql-to-mongodb",
  lastUpdated: "2026-02-02",
  version: "1.5",

  quickStartSteps: [
    {
      title: "Paste SQL Query",
      description: "Enter any supported SQL query (SELECT, INSERT, UPDATE, DELETE, COUNT, GROUP BY) into the left text area. The converter supports standard SQL syntax with WHERE, ORDER BY, LIMIT clauses."
    },
    {
      title: "View MongoDB Conversion",
      description: "The equivalent MongoDB query appears instantly in the right panel. Conversions include find(), insertOne(), updateMany(), deleteMany(), and aggregate() operations."
    },
    {
      title: "Review Warnings",
      description: "Yellow warning boxes alert you to potentially dangerous operations (e.g., UPDATE without WHERE clause affects all documents). Review before executing in production."
    },
    {
      title: "Copy MongoDB Code",
      description: "Click the Copy button to copy the MongoDB query syntax. Paste directly into MongoDB shell, Node.js drivers, or backend code."
    }
  ],

  introduction: {
    title: "What is SQL to MongoDB Conversion?",
    content: `SQL to MongoDB conversion translates relational database queries (SQL) into MongoDB's document-oriented query language. This is essential when migrating from SQL databases (MySQL, PostgreSQL, SQL Server) to MongoDB, or when developers need to learn MongoDB equivalents of familiar SQL operations.

## Understanding the Paradigm Shift

SQL and MongoDB represent fundamentally different data models:

**SQL (Relational):**
- Data stored in tables with fixed schemas
- Rows and columns with strong typing
- Relationships via foreign keys and JOINs
- ACID transactions at row level
- Structured Query Language (SQL) standard

**MongoDB (Document):**
- Data stored as JSON-like documents (BSON)
- Flexible, dynamic schemas per document
- Embedded documents and arrays replace JOINs
- Atomic operations at document level
- JavaScript-based query language

## Core Conversion Concepts

**Tables → Collections:**
SQL tables become MongoDB collections. \`SELECT * FROM users\` becomes \`db.users.find()\`.

**Rows → Documents:**
Each SQL row becomes a MongoDB document with field-value pairs.

**WHERE → Filter Objects:**
SQL WHERE clauses convert to MongoDB filter documents: \`WHERE age > 18\` becomes \`{ age: { $gt: 18 } }\`.

**Operators:**
- SQL \`=\` → MongoDB implicit equality: \`{ status: "active" }\`
- SQL \`>\`, \`<\`, \`>=\`, \`<=\` → MongoDB \`$gt\`, \`$lt\`, \`$gte\`, \`$lte\`
- SQL \`AND\` → MongoDB \`$and\` array
- SQL \`OR\` → MongoDB \`$or\` array
- SQL \`LIKE\` → MongoDB \`$regex\`
- SQL \`IN\` → MongoDB \`$in\`

## Why SQL to MongoDB Converters Matter

**For Database Migration:**
Migrating from relational databases to MongoDB requires translating thousands of SQL queries. Automated conversion accelerates migration and reduces errors.

**For Learning MongoDB:**
Developers familiar with SQL can use conversion tools to learn MongoDB syntax by seeing side-by-side comparisons of equivalent operations.

**For Validation:**
Verify manual MongoDB query translations by comparing with tool output. Catch syntax errors and operator misuse early.

**For Documentation:**
Generate MongoDB examples for API documentation by converting SQL queries that stakeholders already understand.`
  },

  useCases: [
    {
      title: "Database Migration from MySQL/PostgreSQL",
      description: "Translate existing SQL application queries to MongoDB during database migration projects. Convert SELECT, INSERT, UPDATE, DELETE operations while maintaining business logic.",
      example: `-- Original MySQL Query
SELECT name, email, age
FROM users
WHERE age >= 18 AND status = 'active'
ORDER BY name ASC
LIMIT 10;

// Converted MongoDB Query
db.users.find(
  {
    "$and": [
      { "age": { "$gte": 18 } },
      { "status": "active" }
    ]
  },
  { "name": 1, "email": 1, "age": 1 }
).sort({ "name": 1 }).limit(10)`
    },
    {
      title: "Learning MongoDB Syntax",
      description: "Use side-by-side SQL and MongoDB comparisons to understand MongoDB query patterns. Accelerate learning curve for developers transitioning from relational databases.",
      example: `-- SQL with LIKE operator
SELECT * FROM products
WHERE name LIKE '%phone%';

// MongoDB with $regex
db.products.find({
  "name": {
    "$regex": ".*phone.*",
    "$options": "i"
  }
})`
    },
    {
      title: "Aggregate Function Translation",
      description: "Convert SQL GROUP BY queries with aggregate functions (COUNT, SUM, AVG, MIN, MAX) to MongoDB's aggregation pipeline framework.",
      example: `-- SQL GROUP BY with COUNT
SELECT country, COUNT(*)
FROM users
GROUP BY country;

// MongoDB Aggregation Pipeline
db.users.aggregate([
  {
    "$group": {
      "_id": "$country",
      "count": { "$sum": 1 }
    }
  }
])`
    },
    {
      title: "CRUD Operation Reference",
      description: "Generate MongoDB equivalent CRUD operations for API documentation, team training materials, or code review reference guides.",
      example: `-- SQL UPDATE with WHERE
UPDATE users
SET status = 'inactive'
WHERE last_login < '2023-01-01';

// MongoDB updateMany
db.users.updateMany(
  { "last_login": { "$lt": "2023-01-01" } },
  { "$set": { "status": "inactive" } }
)`
    }
  ],

  howToUse: {
    title: "How to Use the SQL to MongoDB Converter",
    steps: [
      {
        name: "Enter SQL Query",
        text: "Paste your SQL query into the left text area. Supported operations include SELECT, INSERT INTO ... VALUES, UPDATE ... SET, DELETE FROM, SELECT COUNT(*), and SELECT ... GROUP BY."
      },
      {
        name: "Review MongoDB Output",
        text: "The MongoDB equivalent appears instantly in the right panel. The converter generates find(), insertOne(), updateMany(), deleteMany(), countDocuments(), or aggregate() queries based on SQL input."
      },
      {
        name: "Check for Warnings",
        text: "Yellow warning boxes appear for dangerous operations like UPDATE or DELETE without WHERE clauses (affecting all documents). Red error boxes indicate unsupported SQL syntax."
      },
      {
        name: "Understand Operator Mapping",
        text: "Review how SQL operators convert: = becomes implicit equality, >, <, >=, <= become $gt, $lt, $gte, $lte. AND/OR become $and/$or arrays. LIKE becomes $regex."
      },
      {
        name: "Copy MongoDB Code",
        text: "Click the Copy button in the top-right of the MongoDB output panel. The query is copied to clipboard in executable MongoDB shell syntax."
      },
      {
        name: "Test in MongoDB Shell or Driver",
        text: "Paste the copied code into MongoDB shell (mongosh), Node.js MongoDB driver, or backend application. Adjust collection names if needed."
      }
    ],
    content: `## Supported SQL Features

### SELECT Queries
Converts SELECT with projections, WHERE filters, ORDER BY, LIMIT, and OFFSET:
\`\`\`sql
SELECT name, email FROM users
WHERE age > 25
ORDER BY name ASC
LIMIT 10 OFFSET 20;
\`\`\`
→
\`\`\`javascript
db.users.find(
  { "age": { "$gt": 25 } },
  { "name": 1, "email": 1 }
).sort({ "name": 1 }).limit(10).skip(20);
\`\`\`

### WHERE Clause Operators
- **Comparison:** \`=\`, \`!=\`, \`<>\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- **Logical:** \`AND\`, \`OR\`
- **Pattern:** \`LIKE\` (converts to \`$regex\`)
- **Set:** \`IN\` (converts to \`$in\`)

### INSERT INTO
Converts INSERT statements to \`insertOne()\`:
\`\`\`sql
INSERT INTO users (name, email, age)
VALUES ('John', 'john@example.com', 30);
\`\`\`
→
\`\`\`javascript
db.users.insertOne({
  "name": "John",
  "email": "john@example.com",
  "age": 30
});
\`\`\`

### UPDATE Queries
Converts UPDATE to \`updateMany()\` with \`$set\`:
\`\`\`sql
UPDATE users
SET status = 'active'
WHERE age >= 18;
\`\`\`
→
\`\`\`javascript
db.users.updateMany(
  { "age": { "$gte": 18 } },
  { "$set": { "status": "active" } }
);
\`\`\`

### DELETE Queries
Converts DELETE to \`deleteMany()\`:
\`\`\`sql
DELETE FROM users
WHERE status = 'inactive';
\`\`\`
→
\`\`\`javascript
db.users.deleteMany({
  "status": "inactive"
});
\`\`\`

### COUNT Queries
Converts COUNT(*) to \`countDocuments()\`:
\`\`\`sql
SELECT COUNT(*) FROM orders WHERE total > 100;
\`\`\`
→
\`\`\`javascript
db.orders.countDocuments({
  "total": { "$gt": 100 }
});
\`\`\`

### GROUP BY with Aggregates
Converts GROUP BY to aggregation pipeline:
\`\`\`sql
SELECT country, COUNT(*), AVG(age)
FROM users
GROUP BY country;
\`\`\`
→
\`\`\`javascript
db.users.aggregate([
  {
    "$group": {
      "_id": "$country",
      "count": { "$sum": 1 },
      "average": { "$avg": "$age" }
    }
  }
]);
\`\`\`

## Conversion Limitations

**Not Supported:**
- JOINs (MongoDB uses embedded documents or \`$lookup\`)
- Subqueries (requires manual aggregation pipeline design)
- Transactions with multiple tables (MongoDB has multi-document transactions)
- Complex window functions (requires aggregation \`$setWindowFields\`)

**Workarounds:**
- **JOINs:** Use MongoDB \`$lookup\` stage in aggregation pipeline
- **Subqueries:** Refactor to aggregation pipeline with \`$match\` and \`$project\`
- **Transactions:** Use MongoDB sessions with multi-document ACID transactions`
  },

  faqs: [
    {
      question: "Does this support JOINs?",
      answer: "No, SQL JOINs are not directly supported. MongoDB uses embedded documents or the $lookup aggregation stage instead. For JOIN conversions, manually design aggregation pipelines with $lookup, or consider embedding related data in documents."
    },
    {
      question: "What SQL operations are supported?",
      answer: "Supported: SELECT (with WHERE, ORDER BY, LIMIT, OFFSET), INSERT INTO ... VALUES, UPDATE ... SET ... WHERE, DELETE FROM ... WHERE, COUNT(*), GROUP BY with aggregates (SUM, AVG, MIN, MAX, COUNT)."
    },
    {
      question: "How does LIKE operator convert to MongoDB?",
      answer: "SQL LIKE patterns convert to MongoDB $regex. % wildcards become .* in regex. Example: LIKE '%phone%' becomes { $regex: '.*phone.*', $options: 'i' } (case-insensitive)."
    },
    {
      question: "Why does UPDATE/DELETE without WHERE show warnings?",
      answer: "UPDATE or DELETE without WHERE clauses affect ALL documents in the collection. The tool warns you to prevent accidental mass modifications. Always use filters unless you intend to modify every document."
    },
    {
      question: "Can I convert multi-table JOINs?",
      answer: "No, JOINs require manual conversion to MongoDB's $lookup aggregation stage. The tool focuses on single-table operations. For complex joins, research MongoDB aggregation pipeline $lookup syntax."
    },
    {
      question: "How accurate are the conversions?",
      answer: "Conversions are syntactically accurate for supported operations but may not preserve exact SQL semantics in edge cases. Always test converted queries in a development MongoDB environment before production use."
    },
    {
      question: "Does this generate optimized MongoDB queries?",
      answer: "The tool generates functional MongoDB queries but may not be optimally indexed or structured. For production use, analyze query performance with MongoDB's .explain() and add appropriate indexes."
    },
    {
      question: "Can I use this for MySQL to MongoDB migration?",
      answer: "Yes, as a starting point for query conversion. However, full migration requires schema redesign (normalization vs denormalization), data type mapping, and application code refactoring beyond query syntax translation."
    },
    {
      question: "What's the difference between updateOne and updateMany?",
      answer: "The tool generates updateMany() which updates all matching documents. If you only want to update the first match, manually change updateMany to updateOne in the output."
    },
    {
      question: "Are MongoDB query operators case-sensitive?",
      answer: "Yes, MongoDB operators like $gt, $regex, $and are case-sensitive and must start with $. Field names are also case-sensitive. The converter preserves SQL field name casing."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `## Privacy & Security

**Client-Side Conversion:**
All SQL to MongoDB query conversion happens entirely in your browser using JavaScript. No SQL queries or converted MongoDB code is transmitted to external servers.

**No Query Logging:**
Your SQL queries and MongoDB output are never logged, stored, or analyzed. When you close the browser tab, all query data is cleared from memory.

**Safe for Proprietary Schemas:**
Since conversion is 100% client-side, you can safely convert queries containing proprietary database schemas, table names, or field structures without exposing them to external services.

**Warning System:**
The tool includes a warning system for dangerous operations (UPDATE/DELETE without WHERE). Review all warnings before executing queries in production databases to prevent accidental data loss.`
  },

  stats: {
    "Supported SQL Types": "SELECT, INSERT, UPDATE, DELETE",
    "Aggregate Functions": "COUNT, SUM, AVG, MIN, MAX",
    "Operators": "=, >, <, AND, OR, LIKE, IN",
    "Conversion": "100% Client-Side"
  }
};
