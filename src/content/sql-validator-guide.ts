/**
 * SQL Validator Tool Guide Content
 * Comprehensive developer guide for SQL validation
 */

import type { ToolGuideContent } from "./types";

export const sqlValidatorGuideContent: ToolGuideContent = {
  toolName: "SQL Validator",
  toolPath: "/sql-validator",
  lastUpdated: "2026-02-05",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Select Your Database",
      description: "Choose the SQL dialect that matches your database engine (MySQL, PostgreSQL, SQLite, or SQL Server). This ensures syntax checking follows your specific database's rules."
    },
    {
      title: "Paste Your SQL Query",
      description: "Copy your SQL query from your application code, database tool, or ORM output and paste it into the validator. The tool accepts single queries or multiple statements."
    },
    {
      title: "Review Validation Results",
      description: "The validator instantly analyzes your SQL and highlights syntax errors, missing table references, invalid column names, and other issues with line-by-line feedback."
    },
    {
      title: "Fix and Revalidate",
      description: "Edit your SQL based on the error messages, then run validation again to confirm the issues are resolved before running in production."
    }
  ],

  introduction: {
    title: "What is SQL Validation?",
    content: `SQL validation is the process of checking SQL queries for syntax errors, semantic issues, and database compatibility before execution. Unlike SQL formatting which improves readability, validation ensures queries will execute correctly on the target database system.

Modern applications rely on complex SQL queries for data retrieval, manipulation, and reporting. A single syntax error in production can cause application crashes, data corruption, or service outages. SQL validators catch these errors during development, reducing deployment risks.

### Why SQL Validation Matters

SQL is unforgiving - a missing comma, incorrect keyword order, or mismatched parentheses will cause immediate query failure. Syntax errors are particularly common when:
- Writing complex JOINs with multiple tables
- Using database-specific functions or syntax
- Migrating queries between different SQL dialects
- Debugging dynamically generated SQL from ORMs
- Refactoring legacy database code

Validation provides immediate feedback on syntax correctness without requiring database connection. This accelerates development workflows and reduces the cycle of "write query → run → fix error → repeat."

### Supported SQL Dialects

**MySQL:** The world's most popular open-source database. Validation covers MySQL-specific features like LIMIT clauses, ENUM types, and stored procedure syntax.

**PostgreSQL:** Advanced open-source database with rich features. Validation handles PostgreSQL's unique syntax including JSON operators, array types, CTEs, and window functions.

**SQLite:** Lightweight embedded database used in mobile apps and local storage. Validation ensures compatibility with SQLite's simplified SQL dialect.

**SQL Server:** Microsoft's enterprise database platform. Validation covers T-SQL specific features including TOP clauses, table variables, and procedural extensions.`
  },

  useCases: [
    {
      title: "Pre-Deployment Validation",
      description: "Validate migration scripts and schema changes before deploying to production. Catch syntax errors that could cause failed deployments or rollback scenarios.",
      example: `-- Validate before deploying migration
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    },
    {
      title: "Debug ORM-Generated SQL",
      description: "When ORMs generate SQL dynamically, syntax errors can occur from edge cases or complex relationships. Paste the generated SQL to identify the exact issue.",
      example: `-- Validate Sequelize/TypeORM output
SELECT "users".*, "posts"."title" 
FROM "users" 
LEFT OUTER JOIN "posts" ON "users"."id" = "posts"."userId" 
WHERE "users"."active" = true 
ORDER BY "posts"."createdAt" DESC;`
    },
    {
      title: "Cross-Database Migration",
      description: "When migrating from one database to another, validate that queries are compatible with the new dialect. MySQL queries often need adjustments for PostgreSQL or SQL Server.",
      example: `-- Convert MySQL to PostgreSQL syntax
-- MySQL: LIMIT 10 OFFSET 20
-- PostgreSQL: LIMIT 10 OFFSET 20 (same)
-- SQL Server: OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY`
    },
    {
      title: "Review Complex Queries",
      description: "Validate complex analytical queries with CTEs, window functions, and subqueries before adding to reports or dashboards. Ensure correctness for business-critical data."
    }
  ],

  howToUse: {
    title: "How to Use This SQL Validator",
    content: `This SQL validator provides instant syntax checking for common database systems. All validation happens client-side in your browser - no data is sent to servers, ensuring complete privacy.

### Basic Validation Workflow

Select your target database dialect from the dropdown. This is crucial because each database has slightly different SQL syntax rules. MySQL allows backtick identifiers, PostgreSQL uses double quotes, and SQL Server uses square brackets.

Paste your SQL query into the input panel. The validator accepts SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER TABLE, and other DDL/DML statements. You can validate single queries or multiple statements separated by semicolons.

Review the validation results. Errors are highlighted with line numbers and descriptive messages. Common issues include:
- Missing or extra parentheses
- Unclosed quotes or string literals
- Invalid keyword usage
- Missing semicolons between statements
- Reserved word conflicts

### Understanding Error Messages

The validator provides specific error messages with line numbers:

**Syntax Errors:** "Unexpected token at line 5" indicates the parser found something it didn't expect. Check for missing commas, incorrect keywords, or mismatched brackets.

**Missing References:** While this validator doesn't connect to your actual database, it can identify some structural issues like unclosed subqueries or malformed JOIN clauses.

**Dialect Mismatches:** "LIMIT not supported" when validating against SQL Server means you need to use OFFSET/FETCH syntax instead.

### Best Practices

Always validate SQL before committing to version control. Run validation on migration scripts, stored procedures, and complex queries. When debugging production issues, validate the exact query from logs before modifying it.

For database-specific features, consult your database documentation. This validator covers common SQL but may not support every vendor extension or proprietary function.`,
    steps: [
      {
        name: "Select Database Dialect",
        text: "Choose MySQL, PostgreSQL, SQLite, or SQL Server to ensure validation follows your database's specific syntax rules."
      },
      {
        name: "Paste SQL Query",
        text: "Copy your SQL from code editors, database tools, or application logs and paste it into the validator input panel."
      },
      {
        name: "Review Errors",
        text: "Check the validation results for syntax errors, missing elements, or dialect-specific issues. Each error shows the line number and description."
      },
      {
        name: "Fix and Validate Again",
        text: "Correct the identified issues, then run validation again to confirm your SQL is syntactically correct."
      }
    ]
  },

  faqs: [
    {
      question: "Does this validator check against my actual database?",
      answer: "No, this is a syntax validator only. It checks that your SQL follows correct syntax rules for the selected dialect but doesn't verify table/column existence, permissions, or query against real data. Use your database's EXPLAIN or query planner for execution validation."
    },
    {
      question: "Which SQL dialects are supported?",
      answer: "The validator supports MySQL, PostgreSQL, SQLite, and SQL Server. Each dialect has unique syntax features - SELECT the one that matches your database for accurate validation. Standard ANSI SQL works across all dialects."
    },
    {
      question: "Can this detect all SQL errors?",
      answer: "This validator catches syntax errors and structural issues. It cannot detect semantic errors (like referencing non-existent tables), logical errors (wrong WHERE conditions), or runtime errors (deadlocks, timeouts). Use database testing for comprehensive validation."
    },
    {
      question: "Is my SQL data private?",
      answer: "Absolutely. All validation happens entirely in your browser using client-side JavaScript. Your SQL is never sent to any server, stored in logs, or tracked. Safe for proprietary queries, customer data, or sensitive database operations."
    },
    {
      question: "Why does valid SQL show errors?",
      answer: "Ensure you've selected the correct database dialect. MySQL queries may fail PostgreSQL validation due to syntax differences (backticks vs double quotes, LIMIT vs TOP). Also check for hidden characters from copy-paste operations."
    },
    {
      question: "Does this validate stored procedures?",
      answer: "Basic stored procedure syntax is validated, but complex procedural logic (loops, cursors, exception handling) may have limited support. The validator focuses on standard DML/DDL statements rather than procedural extensions."
    },
    {
      question: "Can I validate multiple queries at once?",
      answer: "Yes, separate multiple statements with semicolons. The validator checks each statement independently and reports errors with line numbers. This is useful for validating entire migration scripts or batch operations."
    },
    {
      question: "Does validation guarantee the query will run?",
      answer: "Syntax validation is necessary but not sufficient. Your query must also have correct permissions, reference existing tables/columns, not violate constraints, and not cause runtime errors (timeouts, deadlocks, resource limits)."
    },
    {
      question: "What's the difference between this and a linter?",
      answer: "This validator checks for syntax errors that would cause query failure. SQL linters check for style issues, anti-patterns, and best practices. Use both: validate syntax here, then use a linter for code quality."
    },
    {
      question: "Why does my CTE show as invalid?",
      answer: "Common Table Expressions (WITH clauses) vary by dialect. Ensure you've selected the correct database. Some older syntax variations or recursive CTEs may have limited support. Simplify complex CTEs if validation fails."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your SQL queries are completely private. This validator operates entirely in your browser with zero server interaction. No data leaves your device.

### Privacy Guarantees

- **100% Client-Side:** All parsing and validation happen in your browser using JavaScript. No backend servers process your queries.
- **No Network Requests:** Inspect the Network tab - zero outbound requests containing your SQL data.
- **No Storage:** Your queries aren't saved to localStorage, cookies, or any persistent storage unless you choose to save them.
- **No Analytics:** We don't track what you validate, how often you use the tool, or any content-specific metrics.
- **Transparent & Auditable:** The validation code is fully auditable. No hidden data collection.

This makes the validator safe for:
- Production database queries
- Queries containing customer data
- Proprietary business logic
- Financial or healthcare data (HIPAA/GDPR)
- Security-sensitive operations

Use with confidence for any SQL validation needs.`
  },

  stats: {
    "Processing": "<50ms",
    "Dialects": "4",
    "Max Size": "1MB",
    "Privacy": "100%"
  }
};
