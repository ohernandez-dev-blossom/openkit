---
name: cron-parse
description: Parse and explain cron expressions in plain English. Use when the user asks to parse a cron expression, explain a cron schedule, validate a cron job, understand what a cron expression means, or find out when a cron job next runs.
---

# Cron Expression Parser

Parse a standard 5-field cron expression, explain it in plain English, break down each field, and list the next execution times.

## Input
- `expression` — a 5-field cron expression: `minute hour day-of-month month day-of-week`
- `nextCount` — how many next execution times to show (default: 5)

## Output
- Validation result (valid / invalid with error)
- Plain English description
- Field-by-field breakdown
- Next N execution times (relative and absolute)

## Instructions

### 1. Parse and validate

Split the expression by whitespace into exactly 5 parts. If not exactly 5 parts, report: "Invalid: cron expressions must have exactly 5 fields (minute hour day month day-of-week)."

Validate each field:

| Field       | Position | Range     | Aliases       |
|-------------|----------|-----------|---------------|
| minute      | 1        | 0–59      | —             |
| hour        | 2        | 0–23      | —             |
| day-of-month| 3        | 1–31      | —             |
| month       | 4        | 1–12      | JAN–DEC       |
| day-of-week | 5        | 0–6       | SUN–SAT (0=Sun)|

Supported special characters:
- `*` — any value (matches all)
- `,` — list (e.g., `1,3,5`)
- `-` — range (e.g., `1-5`)
- `/` — step (e.g., `*/5`, `0-30/10`)

### 2. Describe in plain English

Translate the expression to a natural language description. Examples:
- `* * * * *` → "Every minute"
- `0 * * * *` → "Every hour, at minute 0"
- `0 0 * * *` → "Every day at midnight (00:00)"
- `0 9 * * 1-5` → "Every weekday (Monday through Friday) at 9:00 AM"
- `*/15 * * * *` → "Every 15 minutes"
- `0 0 1 * *` → "At midnight on the 1st of every month"
- `0 0 * * 0` → "Every Sunday at midnight"
- `30 3 * * *` → "Every day at 3:30 AM"
- `0 */6 * * *` → "Every 6 hours, at minute 0"
- `0 12 * * 1` → "Every Monday at 12:00 PM (noon)"

### 3. Field breakdown

For each of the 5 fields, show:
- Field name and its value
- Valid range
- What the value means

### 4. Next execution times

Calculate the next `nextCount` times the expression would fire, starting from "now" (use the current date/time context if known, otherwise note times are approximate relative estimates).

For each execution show:
- Absolute datetime: `Day, DD Mon YYYY HH:MM:SS` (24h)
- Relative time: "in X minutes", "in X hours", "in X days"

### Common quick examples to recognize instantly:

| Expression        | Meaning                          |
|-------------------|----------------------------------|
| `* * * * *`       | Every minute                     |
| `0 * * * *`       | Every hour                       |
| `0 0 * * *`       | Daily at midnight                |
| `0 9 * * 1-5`     | Weekdays at 9 AM                 |
| `*/15 * * * *`    | Every 15 minutes                 |
| `0 0 1 * *`       | First day of every month         |
| `0 0 * * 0`       | Every Sunday at midnight         |
| `30 3 * * *`      | Daily at 3:30 AM                 |
| `0 */6 * * *`     | Every 6 hours                    |
| `0 12 * * 1`      | Every Monday at noon             |

## Options
- `nextCount` — integer 1–50, number of next executions to list (default: 5)

## Examples

**Request:** "Parse this cron: `*/5 * * * *`"

**Output:**
```
Valid: Yes

Plain English: Every 5 minutes

Field Breakdown:
  Minute:        */5   → every 5 minutes (0, 5, 10, 15, ... 55)  [range: 0-59]
  Hour:          *     → every hour                               [range: 0-23]
  Day of Month:  *     → every day                                [range: 1-31]
  Month:         *     → every month                              [range: 1-12]
  Day of Week:   *     → every day of the week                    [range: 0-6]

Next 5 executions:
  1. Mon, 22 Mar 2026 10:05:00  (in 4 minutes)
  2. Mon, 22 Mar 2026 10:10:00  (in 9 minutes)
  3. Mon, 22 Mar 2026 10:15:00  (in 14 minutes)
  4. Mon, 22 Mar 2026 10:20:00  (in 19 minutes)
  5. Mon, 22 Mar 2026 10:25:00  (in 24 minutes)
```

---

**Request:** "What does `0 9 * * 1-5` mean?"

**Output:**
```
Valid: Yes

Plain English: Every weekday (Monday through Friday) at 9:00 AM

Field Breakdown:
  Minute:        0     → at minute 0 (top of the hour)   [range: 0-59]
  Hour:          9     → at 9 AM                          [range: 0-23]
  Day of Month:  *     → every day                        [range: 1-31]
  Month:         *     → every month                      [range: 1-12]
  Day of Week:   1-5   → Monday through Friday            [range: 0-6]

Next 5 executions (weekdays only):
  1. Tue, 23 Mar 2026 09:00:00  (in about 23 hours)
  2. Wed, 24 Mar 2026 09:00:00  (in about 2 days)
  3. Thu, 25 Mar 2026 09:00:00  (in about 3 days)
  4. Fri, 26 Mar 2026 09:00:00  (in about 4 days)
  5. Mon, 29 Mar 2026 09:00:00  (in about 7 days)
```

## Error Handling
- Not exactly 5 fields: report the actual field count and give the correct format
- Field value out of range (e.g., minute=75): report "Invalid: minute value '75' is out of range (0–59)"
- Invalid step (e.g., `*/0`): report "Invalid: step value cannot be 0"
- Unrecognized characters: report the offending character and position
- If the expression would never fire (e.g., `0 0 31 2 *` — Feb 31 never exists): warn the user that this schedule may never execute
