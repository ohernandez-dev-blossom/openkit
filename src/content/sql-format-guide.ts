/**
 * SQL Formatter Tool Guide Content
 * Comprehensive developer guide for SQL formatting
 */

import type { ToolGuideContent } from "./types";

export const sqlFormatGuideContent: ToolGuideContent = {
  toolName: "SQL Formatter",
  toolPath: "/sql-format",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your SQL Query",
      description: "Copy your SQL from application logs, database exports, ORM-generated queries, or legacy code and paste it into the input panel. The formatter handles single-line queries, complex joins, and nested subqueries."
    },
    {
      title: "Select SQL Dialect",
      description: "Choose your database dialect (PostgreSQL, MySQL, SQL Server, Oracle) if dialect-specific formatting is needed. The formatter adjusts keyword casing and syntax conventions accordingly."
    },
    {
      title: "Format Instantly",
      description: "The formatter processes your SQL immediately, adding proper indentation for clauses, aligning columns, and creating visual hierarchy for joins, subqueries, and conditions."
    },
    {
      title: "Copy Formatted Query",
      description: "Click Copy to copy the formatted SQL to your clipboard, ready for pasting into database tools, code reviews, or documentation."
    }
  ],

  introduction: {
    title: "What is SQL Formatting?",
    content: `SQL (Structured Query Language) formatting is the process of transforming compressed, single-line, or inconsistently styled database queries into human-readable format with proper indentation, keyword alignment, and visual hierarchy. While databases execute SQL regardless of formatting, developers need well-formatted queries for debugging, optimization, and collaboration.

Modern applications generate SQL dynamically through ORMs (Object-Relational Mappers) like Sequelize, TypeORM, or Entity Framework. These tools produce complex queries with joins, subqueries, and aggregations as single-line strings that appear in application logs. SQL formatters make these queries readable for performance analysis and debugging.

### Why SQL Formatting Matters

SQL formatting is critical for database-driven application development. When debugging slow queries or analyzing database logs, developers encounter unformatted SQL from application logging systems. Formatted queries reveal the structure clearly - SELECT clauses, JOIN conditions, WHERE predicates, and subquery nesting become immediately visible.

Query optimization requires understanding execution flow and identifying performance bottlenecks. Formatted SQL makes it easy to spot Cartesian products from missing JOIN conditions, unnecessary subqueries that could be Common Table Expressions (CTEs), or WHERE clauses that prevent index usage. Database administrators can review execution plans more effectively when the query structure is clear.

Code reviews for database-heavy applications benefit enormously from formatted SQL. When reviewing pull requests that add complex reporting queries or data migrations, formatted SQL allows reviewers to verify join logic, check for SQL injection vulnerabilities in dynamic queries, and ensure proper use of transactions and indexes.

### Key Features of SQL Formatters

**Keyword Alignment:** SQL keywords (SELECT, FROM, WHERE, JOIN, ORDER BY) are aligned vertically or indented consistently, making query structure immediately scannable. This visual alignment helps identify missing clauses or logical errors.

**Clause Indentation:** Nested clauses like subqueries, CASE statements, and Common Table Expressions (CTEs) receive proper indentation levels that show their hierarchical relationship to the main query.

**Column Formatting:** SELECT lists with many columns are formatted one per line, making it easy to count columns, check for duplicates, or verify that all required fields are included.

**Join Clarity:** JOIN clauses are formatted to show table relationships clearly, with ON conditions indented to distinguish join logic from WHERE filtering. This prevents the common mistake of mixing join and filter conditions.

### SQL Formatting vs Code Generation

ORMs generate SQL automatically but optimize for machine readability, not human understanding. Generated queries are often single-line with minimal whitespace. Formatting bridges this gap - paste ORM-generated SQL to understand what your application is actually executing. This is essential for debugging N+1 query problems, verifying eager loading, or optimizing batch operations.

### Common SQL Formatting Scenarios

Developers use SQL formatters when analyzing slow query logs from production databases, debugging ORM-generated queries in application logs, preparing complex queries for code review, documenting database schema migrations, teaching SQL structure to junior developers, or converting between different SQL style guides used by database teams.`
  },

  useCases: [
    {
      title: "Debug ORM-Generated Queries",
      description: "ORMs like TypeORM, Sequelize, or Django ORM generate SQL as single-line strings. When debugging performance issues or unexpected results, format the generated SQL to see actual query structure and identify problems.",
      example: `-- Before: ORM-generated single-line query
SELECT users.id,users.name,posts.title FROM users INNER JOIN posts ON posts.user_id=users.id WHERE users.active=true ORDER BY posts.created_at DESC LIMIT 10

-- After: Readable formatted SQL
SELECT
  users.id,
  users.name,
  posts.title
FROM users
INNER JOIN posts ON posts.user_id = users.id
WHERE users.active = true
ORDER BY posts.created_at DESC
LIMIT 10`
    },
    {
      title: "Optimize Slow Queries",
      description: "When analyzing slow query logs from PostgreSQL, MySQL, or SQL Server, format the queries to identify missing indexes, unnecessary joins, or inefficient subqueries that impact performance.",
      example: `-- Format complex query for optimization
SELECT
  o.order_id,
  o.total_amount,
  c.customer_name,
  (
    SELECT COUNT(*)
    FROM order_items oi
    WHERE oi.order_id = o.order_id
  ) AS item_count
FROM orders o
INNER JOIN customers c ON c.customer_id = o.customer_id
WHERE o.created_at > '2024-01-01'
ORDER BY o.total_amount DESC`
    },
    {
      title: "Document Database Migrations",
      description: "Database migration files contain complex SQL for schema changes. Format migration SQL to make the changes clear for code review, documentation, or rollback planning.",
      example: `-- Formatted migration SQL
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);`
    },
    {
      title: "Clean Legacy SQL",
      description: "Legacy codebases contain SQL written over many years with inconsistent formatting. Reformat queries to create consistency before refactoring or migrating to a new database system.",
      example: `-- Format legacy stored procedure SQL
SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS total_orders,
  SUM(total_amount) AS revenue
FROM orders
WHERE
  created_at >= DATE_TRUNC('year', CURRENT_DATE)
  AND status = 'completed'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC`
    }
  ],

  howToUse: {
    title: "How to Use This SQL Formatter",
    content: `This SQL formatter provides instant client-side formatting with zero server uploads. All processing happens in your browser using JavaScript SQL parsing, ensuring your queries remain private and processing is instantaneous.

### Basic Formatting Workflow

Copy your SQL from any source (application logs, database exports, ORM output, or legacy code) and paste it into the input panel. The formatter accepts any valid SQL including SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, and complex queries with CTEs, window functions, and subqueries.

The formatter processes your SQL instantly, applying proper indentation to clauses, aligning keywords, and creating visual hierarchy for nested structures. The formatted output appears with clauses on separate lines, columns aligned, and joins clearly structured.

### Advanced Features

**Keyword Casing:** Control whether SQL keywords appear in UPPERCASE (traditional database convention), lowercase (modern ORM convention), or Capitalize (mixed style). Choose based on your team's style guide.

**Indentation Style:** Configure spacing for nested clauses, subqueries, and CASE statements. Consistent indentation makes query structure obvious at a glance.

**Column Alignment:** SELECT lists can be formatted one column per line (for long lists) or multiple columns per line (for short lists). The formatter chooses based on query complexity.

**Join Formatting:** JOIN clauses receive special formatting that shows table relationships and ON conditions clearly, distinguishing join logic from WHERE filtering.

### Best Practices

Always format SQL before committing to version control to ensure consistent style. Use the same keyword casing and indentation across your database codebase. Format ORM-generated queries when debugging to understand actual database operations. Add comments to complex queries explaining business logic - formatters preserve comments while adjusting spacing.`,
    steps: [
      {
        name: "Paste SQL Query",
        text: "Copy your SQL from application logs, database tools, or ORM output and paste it into the input panel."
      },
      {
        name: "Choose Formatting Options",
        text: "Select keyword casing (UPPERCASE, lowercase) and indentation style to match your project conventions or database standards."
      },
      {
        name: "Review Formatted Query",
        text: "The formatter processes SQL instantly. Review the formatted query to verify structure, joins, and clause logic."
      },
      {
        name: "Copy or Export",
        text: "Click Copy to copy formatted SQL to your clipboard, ready for database tools, documentation, or code review."
      }
    ]
  },

  faqs: [
    {
      question: "Does SQL formatting change query execution?",
      answer: "No, SQL formatting only affects whitespace (spaces, line breaks, indentation) and does not modify keywords, table names, column names, or query logic. The formatted SQL executes identically to the input - databases parse SQL regardless of formatting. Formatting is purely for developer readability and has zero impact on performance or results."
    },
    {
      question: "Which SQL dialects are supported?",
      answer: "This formatter supports standard SQL syntax that works across PostgreSQL, MySQL, SQL Server, SQLite, and Oracle. Most common SQL features (SELECT, JOIN, subqueries, CTEs, window functions) format correctly. Dialect-specific features may require manual adjustment. For maximum compatibility, the formatter follows ANSI SQL standards."
    },
    {
      question: "Can this formatter fix invalid SQL?",
      answer: "No, this formatter preserves the SQL structure as-is and only adjusts whitespace. It does not fix syntax errors, missing keywords, or incorrect logic. For SQL validation, use your database's built-in validator (EXPLAIN PLAN in PostgreSQL, EXPLAIN in MySQL) to identify errors, fix them, then use this formatter for readability."
    },
    {
      question: "Should SQL keywords be uppercase or lowercase?",
      answer: "Uppercase keywords (SELECT, FROM, WHERE) are the traditional database convention and improve readability by visually distinguishing keywords from table/column names. Lowercase keywords are common in modern ORMs and some style guides. Both are valid SQL - choose based on your team's existing codebase and conventions."
    },
    {
      question: "How do I format SQL from application logs?",
      answer: "Application logs often show SQL with escaped characters or embedded in JSON. Extract the pure SQL string (remove surrounding quotes, unescape backslashes), paste it into this formatter, format it, then analyze the query structure. This is essential for debugging ORM-generated queries or slow query logs."
    },
    {
      question: "Is my SQL data private when using this tool?",
      answer: "Absolutely. All SQL formatting happens entirely in your browser using client-side JavaScript. Your queries never leave your device or get sent to any servers. No uploads, no storage, no analytics tracking. Safe for proprietary database schemas, customer data in WHERE clauses, or confidential queries."
    },
    {
      question: "Can I format stored procedures and functions?",
      answer: "Yes, this formatter handles SQL procedural code including CREATE PROCEDURE, CREATE FUNCTION, and PL/SQL blocks. Nested logic (IF/ELSE, loops, CASE) receives proper indentation. For complex stored procedures, the formatter makes control flow and business logic significantly easier to understand."
    },
    {
      question: "Does this preserve SQL comments?",
      answer: "Yes, both single-line comments (-- comment) and multi-line comments (/* comment */) are preserved in their original positions. The formatter adjusts spacing around comments to match the chosen indentation level, but comment content remains unchanged. This maintains documentation and explanatory notes for complex queries."
    },
    {
      question: "How do I format parameterized queries?",
      answer: "Parameterized queries with placeholders ($1, ?, :param) format correctly - the formatter treats parameters as values and preserves them in WHERE clauses, VALUES lists, or SET statements. This is useful when formatting prepared statements or ORM queries before analyzing execution plans."
    },
    {
      question: "Can I format Common Table Expressions (CTEs)?",
      answer: "Yes, CTEs (WITH clauses) receive proper formatting with each CTE on its own section, indented subqueries, and clear separation between multiple CTEs. The formatter makes complex CTEs readable by showing the hierarchical relationship between CTEs and the main query, which is essential for query optimization and debugging."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your SQL queries never leave your browser. This formatter operates entirely client-side using JavaScript SQL parsing in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All SQL formatting happens in your browser's JavaScript engine. Your queries stay on your device.
- **No Server Uploads:** We don't have servers to process SQL. The tool works completely offline after first load.
- **No Data Storage:** Your SQL is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what SQL you format, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the formatter safe for sensitive use cases like formatting queries with customer data, proprietary database schemas, financial transactions, or any SQL that must remain confidential. Use with confidence for production debugging, security audits, or handling regulated data (HIPAA, GDPR, PCI-DSS).`
  },

  stats: {
    "Processing": "<100ms",
    "Dialects": "5+",
    "Max Size": "2MB",
    "Privacy": "100%"
  }
};
