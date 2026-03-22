---
name: sql-format
description: Format, beautify, or prettify SQL queries. Use when the user asks to format SQL, beautify SQL, prettify SQL, clean up SQL, indent SQL, fix SQL formatting, make SQL readable, or format a SQL query.
---

# SQL Formatter

Beautify SQL queries by placing major clauses on new lines, indenting sub-clauses, and applying consistent keyword casing.

## Input
- A SQL query string (SELECT, INSERT, UPDATE, DELETE, CREATE, etc.)
- May be all on one line or multi-line with inconsistent formatting
- Optional: keyword casing (uppercase default), indent size (2 spaces default)

## Output
- Formatted SQL with major keywords on their own lines, AND/OR/ON indented, and commas causing line breaks

## Instructions

1. If the input is empty or whitespace-only, return an empty string.
2. **Normalize whitespace**: collapse all consecutive whitespace into a single space. Trim.
3. **Insert newlines before major clause keywords** (case-insensitive match, whole word only):
   - `SELECT`, `FROM`, `WHERE`, `JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `INNER JOIN`, `OUTER JOIN`, `ORDER BY`, `GROUP BY`, `HAVING`, `UNION`, `UNION ALL`, `LIMIT`
   - For each keyword, replace `\bKEYWORD\b` with `\nKEYWORD`.
   - Process compound keywords (`LEFT JOIN`, `ORDER BY`, `GROUP BY`, etc.) before their component words to avoid double-replacement.
4. **Indent AND/OR**: replace `\b(AND|OR)\b` with `\n<indent>AND` or `\n<indent>OR` where `<indent>` is the indent string.
5. **Indent ON clause**: replace `\bON\b` with `\n<indent>ON`.
6. **Format commas in SELECT column lists**: replace `,` followed by optional whitespace with `,\n<indent>`.
7. **Apply keyword casing**:
   - Uppercase (default): for each keyword in the full keyword list, replace case-insensitively with the uppercase form.
   - Lowercase: replace with the lowercase form.
   - The full keyword list includes: `SELECT`, `FROM`, `WHERE`, `JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `INNER JOIN`, `OUTER JOIN`, `ON`, `AND`, `OR`, `ORDER BY`, `GROUP BY`, `HAVING`, `INSERT INTO`, `VALUES`, `UPDATE`, `SET`, `DELETE FROM`, `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`, `AS`, `DISTINCT`, `LIMIT`, `OFFSET`, `UNION`, `UNION ALL`, `CASE`, `WHEN`, `THEN`, `ELSE`, `END`, `IN`, `NOT IN`, `LIKE`, `BETWEEN`, `IS NULL`, `IS NOT NULL`, `EXISTS`, `NOT EXISTS`, `ASC`, `DESC`, `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`
8. **Clean up extra blank lines**: replace 3 or more consecutive newlines with 2.
9. Trim the result and return.

Indent unit:
- `2 spaces` (default): `"  "`
- `4 spaces`: `"    "`
- `8 spaces`: `"        "`

## Options
- `indent`: `2` (default) | `4` | `8` — spaces per indent level
- `uppercase-keywords`: `true` (default) | `false` — whether SQL keywords are uppercased

## Examples

**Basic SELECT with WHERE (2-space indent, uppercase keywords)**

Input:
```
select user.id,user.name,orders.total from users user join orders on user.id=orders.user_id where user.active=1 and orders.total>100 order by orders.total desc;
```

Output:
```sql
SELECT user.id,
  user.name,
  orders.total
FROM users user
JOIN orders
  ON user.id=orders.user_id
WHERE user.active=1
  AND orders.total>100
ORDER BY orders.total DESC;
```

**INSERT statement**

Input:
```
insert into users (name, email, age) values ('Alice', 'alice@example.com', 30)
```

Output:
```sql
INSERT INTO users (name,
  email,
  age)
VALUES ('Alice',
  'alice@example.com',
  30)
```

**Lowercase keywords option**

Input:
```
SELECT id, name FROM products WHERE price > 100
```

Output (lowercase-keywords):
```sql
select id,
  name
from products
where price > 100
```

**Aggregate with GROUP BY and HAVING**

Input:
```
SELECT department, COUNT(*) as total, AVG(salary) as avg_salary FROM employees WHERE active=1 GROUP BY department HAVING COUNT(*)>5 ORDER BY avg_salary DESC
```

Output:
```sql
SELECT department,
  COUNT(*) AS total,
  AVG(salary) AS avg_salary
FROM employees
WHERE active=1
GROUP BY department
HAVING COUNT(*)>5
ORDER BY avg_salary DESC
```

## Error Handling
- If the input is empty, return an empty string and note: "No SQL input provided."
- The formatter is regex/string-based and does not parse SQL AST. It applies structural formatting heuristically. Complex subqueries, CTEs (`WITH`), and window functions are formatted on a best-effort basis.
- Subqueries inside parentheses are not given additional indentation beyond what the comma/clause rules produce.
- String literals (values inside quotes) are not modified — keyword replacement only matches whole words (`\b` boundaries), so keywords inside quoted strings are safe.
- If a keyword appears inside a string literal and gets incorrectly cased, note this as a known limitation and suggest the user review string literals manually.
