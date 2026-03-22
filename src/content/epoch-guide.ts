/**
 * Epoch Converter Tool Guide Content
 * Comprehensive developer guide for Unix timestamp conversion
 */

import type { ToolGuideContent } from "./types";

export const epochGuideContent: ToolGuideContent = {
  toolName: "Epoch Time Converter",
  toolPath: "/epoch",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Epoch Timestamp",
      description: "Paste any Unix timestamp (epoch time) into the input field. Supports seconds (10 digits) or milliseconds (13 digits). Common use: converting timestamps from APIs, database records, log files, or server responses to human-readable dates."
    },
    {
      title: "View Human-Readable Date",
      description: "See instant conversion to readable date-time format showing year, month, day, hours, minutes, seconds, and timezone. Displays both local time and UTC. Includes relative time ('2 hours ago') for recent timestamps."
    },
    {
      title: "Convert Human Date to Epoch",
      description: "Use the date picker to select a date and time, then convert to Unix timestamp. Essential for generating timestamps for API requests, database queries, or scheduling tasks with specific future/past dates."
    },
    {
      title: "Copy or Use Timestamp",
      description: "Click copy to grab the timestamp or human-readable date for use in code, API payloads, database queries, or documentation. Supports both seconds and milliseconds formats for different language/platform requirements."
    }
  ],

  introduction: {
    title: "What is Unix Epoch Time?",
    content: `Unix epoch time (or Unix timestamp) is a system for tracking time as the number of seconds elapsed since January 1, 1970, 00:00:00 UTC (the Unix epoch). This timestamp format is the standard for representing dates and times in computing because it's timezone-agnostic, language-independent, unambiguous, and easily sortable as a simple integer.

Epoch timestamps appear everywhere in software development: API responses use epoch for created_at and updated_at fields, databases store timestamps as integers for efficient indexing and querying, log files include epoch timestamps for precise event ordering, authentication tokens encode expiration times as epoch values (JWT exp claims), cron jobs and schedulers use epoch for job execution times, and file systems track file modification times as epoch timestamps.

### Why Epoch Time Matters for Developers

**API data exchange:** REST and GraphQL APIs commonly return timestamps as Unix epoch integers because they're unambiguous across timezones and languages. A timestamp like 1704067200 represents the same moment worldwide - no timezone confusion. Converting "2024-01-01 00:00:00" requires knowing the timezone, but epoch 1704067200 is absolute.

**Database storage:** Storing dates as epoch integers enables efficient indexing, range queries, and sorting. PostgreSQL's TIMESTAMP type internally uses similar representation. NoSQL databases like MongoDB store timestamps as Unix milliseconds. Epoch integers are 4-8 bytes vs. 20+ bytes for ISO date strings, saving storage and improving query performance.

**Time-based calculations:** Calculating time differences is trivial with epoch: end_epoch - start_epoch = duration in seconds. No date math complexity with months, leap years, daylight saving. Duration calculations across timezones are error-prone with human-readable dates but simple with epoch timestamps.

**JWT tokens:** JSON Web Tokens encode expiration (exp), issued-at (iat), and not-before (nbf) claims as Unix timestamps. Example: {exp: 1704067200, iat: 1704063600}. Token validation checks if current epoch < exp. Server and client must use epoch to avoid timezone/clock discrepancies.

**Scheduling and cron:** Task schedulers (cron, Kubernetes CronJobs, AWS EventBridge) use epoch timestamps internally. Scheduling a job for "January 1, 2024, 00:00 UTC" means converting to epoch 1704067200 for storage. Rate limiting algorithms (token bucket, sliding window) use epoch for timestamp comparisons.

**Logging and monitoring:** Application logs timestamp events with epoch milliseconds for precise ordering and correlation. Distributed systems use epoch to order events across services. Log aggregation (Elasticsearch, Splunk) indexes by epoch timestamp. Example log: {"timestamp": 1704067200000, "level": "ERROR", "message": "..."}.

### Seconds vs. Milliseconds

**Epoch seconds (10 digits):** Standard Unix timestamp format. Example: 1704067200 = January 1, 2024, 00:00:00 UTC. Used by: Unix/Linux systems, many programming languages (C, PHP, Python's time.time()), most databases (PostgreSQL EXTRACT(EPOCH), MySQL UNIX_TIMESTAMP()).

**Epoch milliseconds (13 digits):** Millisecond precision. Example: 1704067200000 = same moment with ms precision. Used by: JavaScript (Date.now(), new Date().getTime()), Java (System.currentTimeMillis()), databases that support milliseconds (MongoDB, Cassandra), high-precision logging.

The tool auto-detects format: 10 digits = seconds, 13 digits = milliseconds. Converting between: seconds × 1000 = milliseconds, milliseconds ÷ 1000 = seconds.

### Time Zones and UTC

Epoch timestamps are always UTC (Coordinated Universal Time). The epoch reference point "January 1, 1970, 00:00:00" is specifically UTC. When converting epoch to human-readable dates, you must specify target timezone. Same epoch value → different local times in different zones.

Example: Epoch 1704067200
- UTC: 2024-01-01 00:00:00
- EST (UTC-5): 2023-12-31 19:00:00
- PST (UTC-8): 2023-12-31 16:00:00
- JST (UTC+9): 2024-01-01 09:00:00

Always store epoch (UTC) in databases. Convert to local timezone only for display, never for storage or calculations.

### Historical Context and Limits

**Why January 1, 1970?** Unix operating system was developed in early 1970s. Developers chose a recent date as epoch to simplify calculations. The date has no special significance beyond being the start of the Unix era.

**Year 2038 problem:** 32-bit signed integers max at 2,147,483,647 (0x7FFFFFFF). As seconds since 1970, this represents January 19, 2038, 03:14:07 UTC. Systems using 32-bit epoch timestamps will overflow after this date (like Y2K bug). Solution: 64-bit timestamps support dates billions of years into future. Modern systems (64-bit OS, databases) use 64-bit integers, but legacy embedded systems may face 2038 issues.

**Negative timestamps:** Dates before January 1, 1970 have negative epoch values. Example: -86400 = December 31, 1969. Not all systems/languages support negative epoch properly. Most databases and languages support dates back to year 1 (PostgreSQL) or 1000 (JavaScript), but some embedded systems only handle positive epoch.

### Common Epoch Formats and Patterns

**ISO 8601 vs. Epoch:** ISO 8601 (2024-01-01T00:00:00Z) is human-readable but verbose and timezone-ambiguous without suffix. Epoch is compact and unambiguous. For APIs: epoch is often better for machine-to-machine, ISO 8601 better for human-readable APIs or debugging.

**Relative time:** "2 hours ago", "in 3 days" are computed from current epoch vs. stored epoch. current_time - stored_time = seconds_ago. Libraries like moment.js, date-fns provide relative time formatting from epoch differences.

**Time precision:** Epoch seconds lack sub-second precision. For high-precision timestamps (financial transactions, distributed systems ordering), use epoch milliseconds or even microseconds (16 digits).

This tool converts between Unix epoch timestamps and human-readable dates, auto-detecting seconds vs. milliseconds format, and displaying both UTC and local timezone equivalents.`
  },

  useCases: [
    {
      title: "Debug API Timestamp Responses",
      description: "REST APIs commonly return timestamps as Unix epoch integers. Convert these timestamps to readable dates to debug API behavior, validate response data, or understand event ordering. Essential for API testing and troubleshooting.",
      example: `// API response with epoch timestamps:
{
  "id": "usr_123",
  "created_at": 1704067200,    // seconds
  "updated_at": 1704150600,
  "last_login": 1704240000000  // milliseconds
}

// Convert to readable:
// created_at: 1704067200
//   → 2024-01-01 00:00:00 UTC
//   → 2023-12-31 19:00:00 EST

// updated_at: 1704150600
//   → 2024-01-02 03:10:00 UTC

// last_login: 1704240000000 (ms)
//   → 2024-01-03 04:00:00 UTC`
    },
    {
      title: "Validate JWT Token Expiration",
      description: "JSON Web Tokens encode expiration times as Unix timestamps in the exp claim. Convert JWT exp values to readable dates to verify token lifetime, debug authentication issues, or validate token generation logic.",
      example: `// JWT payload decoded:
{
  "sub": "user123",
  "iat": 1704067200,  // issued at
  "exp": 1704070800,  // expires at
  "nbf": 1704067200   // not before
}

// Convert exp: 1704070800
//   → 2024-01-01 01:00:00 UTC
//   → Token expires in 1 hour from issue

// Validation logic:
const now = Math.floor(Date.now() / 1000);
if (now >= payload.exp) {
  throw new Error('Token expired');
}

// Calculate remaining time:
const remaining = payload.exp - now;
// → 3540 seconds = 59 minutes`
    },
    {
      title: "Query Database Records by Date Range",
      description: "Convert human-readable dates to epoch timestamps for database queries with date range filters. More efficient than string date comparisons. Works with PostgreSQL, MySQL, MongoDB timestamp fields.",
      example: `// User wants records from Jan 1-31, 2024:
// Convert to epoch for query:
const startEpoch = 1704067200;  // Jan 1, 2024 00:00 UTC
const endEpoch = 1706745599;    // Jan 31, 2024 23:59 UTC

// PostgreSQL query:
SELECT * FROM events
WHERE created_at >= 1704067200
  AND created_at <= 1706745599;

// MongoDB query:
db.events.find({
  created_at: {
    $gte: 1704067200,
    $lte: 1706745599
  }
});

// More efficient than:
// WHERE created_at >= '2024-01-01'
// (requires string parsing + timezone handling)`
    },
    {
      title: "Parse Log File Timestamps",
      description: "Application logs often include Unix timestamps (milliseconds) for precise event ordering. Convert log timestamps to readable dates for debugging, correlating events across services, or analyzing incident timelines.",
      example: `// Application log entry:
{
  "timestamp": 1704067200000,
  "level": "ERROR",
  "service": "auth-api",
  "message": "Login failed",
  "user_id": "usr_123"
}

// Convert timestamp: 1704067200000
//   → 2024-01-01 00:00:00.000 UTC

// Correlate with other services:
// auth-api:   1704067200000 - Login failed
// db-service: 1704067200150 - Connection timeout
// → DB timeout caused login failure (150ms after)

// Calculate request duration:
const start = 1704067200000;
const end = 1704067200450;
const duration = end - start;
// → 450ms request time`
    }
  ],

  howToUse: {
    title: "How to Use This Epoch Time Converter",
    content: `This tool converts between Unix epoch timestamps (seconds or milliseconds since January 1, 1970 UTC) and human-readable dates. Supports bidirectional conversion with automatic format detection.

### Converting Epoch to Human Date

Paste any Unix timestamp into the input field. The tool automatically detects format:
- **10 digits:** Interpreted as seconds (standard Unix timestamp)
- **13 digits:** Interpreted as milliseconds (JavaScript/Java format)

Examples:
- 1704067200 → January 1, 2024, 00:00:00 UTC (seconds)
- 1704067200000 → Same moment with millisecond precision

Results display multiple formats:
- **UTC time:** Universal reference (what the epoch represents)
- **Local time:** Converted to your browser's timezone
- **Relative time:** "2 hours ago", "in 3 days" (for recent dates)
- **ISO 8601:** Standard date format for APIs

### Converting Human Date to Epoch

Use the date/time picker to select a date and time. The tool converts your selection to Unix epoch timestamp in both formats:
- **Seconds:** 10-digit integer (standard)
- **Milliseconds:** 13-digit integer (JavaScript)

The picker uses your local timezone but displays equivalent UTC. Example: Selecting "2024-01-01 00:00:00" in EST (UTC-5) generates epoch for "2024-01-01 05:00:00 UTC".

### Understanding Timezones

**Critical:** Epoch timestamps are always UTC. When you see "1704067200 = 2024-01-01 00:00:00", that's UTC time. In EST, the same epoch is "2023-12-31 19:00:00" (5 hours earlier clock time).

**Best practice:** Store epoch (UTC) in databases and APIs. Convert to local timezone only for display in user interfaces. Never store local time strings - use epoch for unambiguous, timezone-agnostic timestamps.

### Seconds vs. Milliseconds

**When to use seconds:**
- Unix/Linux systems (date +%s)
- Most server-side languages (Python time.time(), PHP time())
- PostgreSQL EXTRACT(EPOCH)
- HTTP headers (expires, date)

**When to use milliseconds:**
- JavaScript (Date.now(), new Date().getTime())
- Java (System.currentTimeMillis())
- MongoDB timestamp fields
- High-precision logging

Convert between: seconds × 1000 = milliseconds, milliseconds ÷ 1000 = seconds.

### Common Patterns and Validations

**Current time:** Use Date.now() in JavaScript (milliseconds) or Math.floor(Date.now() / 1000) for seconds.

**Future timestamps:** Epoch values greater than current time represent future dates. Useful for scheduling, token expiration, cache TTL.

**Past timestamps:** Epoch values less than current time represent past dates. Useful for created_at, updated_at, event timestamps.

**Negative epochs:** Values < 0 represent dates before January 1, 1970. Example: -86400 = December 31, 1969.

**Invalid ranges:** Very large epochs (> 32-bit max) may cause issues in 32-bit systems. Verify your system supports 64-bit timestamps for dates beyond 2038.

### Precision Considerations

**Epoch seconds:** Precision to 1 second. Sufficient for most applications (logs, API timestamps, database records).

**Epoch milliseconds:** Precision to 1 millisecond (0.001s). Required for high-frequency trading, distributed system event ordering, performance monitoring.

**Sub-millisecond:** Some systems use microseconds (16 digits) or nanoseconds (19 digits) for extreme precision. This tool focuses on seconds and milliseconds as they cover 99% of use cases.`,
    steps: [
      {
        name: "Enter Epoch Timestamp",
        text: "Paste Unix timestamp (10 digits for seconds, 13 digits for milliseconds). Tool auto-detects format and converts to human-readable date."
      },
      {
        name: "View Readable Date",
        text: "See conversion results showing UTC time, local timezone, relative time ('2 hours ago'), and ISO 8601 format."
      },
      {
        name: "Convert Date to Epoch",
        text: "Use date picker to select date/time, then convert to Unix timestamp in both seconds and milliseconds formats."
      },
      {
        name: "Copy Result",
        text: "Click copy to grab epoch timestamp or formatted date for use in code, API requests, database queries, or documentation."
      }
    ]
  },

  faqs: [
    {
      question: "What does epoch timestamp 1704067200 represent?",
      answer: "1704067200 represents January 1, 2024, 00:00:00 UTC - the number of seconds elapsed since January 1, 1970, 00:00:00 UTC (the Unix epoch). This is 1,704,067,200 seconds after the epoch reference point. In local timezones: EST (UTC-5) shows as December 31, 2023, 19:00:00. PST (UTC-8) shows as December 31, 2023, 16:00:00. The epoch value itself is timezone-agnostic - timezone only matters when displaying as human-readable date."
    },
    {
      question: "Should I use epoch seconds or milliseconds?",
      answer: "Use seconds for most server-side applications, Unix systems, and databases (PostgreSQL, MySQL). Use milliseconds for JavaScript applications (Date.now() returns milliseconds), Java (System.currentTimeMillis()), high-precision logging, and distributed system event ordering. JavaScript's Date() constructor accepts milliseconds. Many APIs return seconds by default. Check API documentation and match the format your platform/language expects. Converting between: seconds × 1000 = milliseconds."
    },
    {
      question: "How do I get current Unix timestamp in different languages?",
      answer: "JavaScript: Math.floor(Date.now() / 1000) for seconds, Date.now() for milliseconds. Python: int(time.time()) for seconds. PHP: time() for seconds. Java: System.currentTimeMillis() / 1000 for seconds. Go: time.Now().Unix() for seconds. PostgreSQL: EXTRACT(EPOCH FROM NOW()) for seconds. MySQL: UNIX_TIMESTAMP() for seconds. Shell: date +%s for seconds. All return seconds since 1970-01-01 00:00:00 UTC."
    },
    {
      question: "What is the Year 2038 problem?",
      answer: "32-bit signed integers max at 2,147,483,647. As seconds since 1970, this represents January 19, 2038, 03:14:07 UTC. After this, 32-bit epoch timestamps overflow, wrapping to negative values (December 13, 1901). This affects legacy systems, embedded devices, and old software using 32-bit time_t type. Modern 64-bit systems aren't affected - 64-bit integers support dates 290 billion years into the future. Update to 64-bit time representation before 2038."
    },
    {
      question: "Can epoch timestamps be negative?",
      answer: "Yes, negative epoch values represent dates before January 1, 1970 UTC. Example: -86400 = December 31, 1969, 00:00:00 UTC. -31536000 = January 1, 1969. Most modern systems support negative epochs back to around 1900 or earlier. JavaScript Date supports years 1-9999. PostgreSQL supports timestamps back to 4713 BC. Some embedded systems or older software only handle positive epochs - test if you need pre-1970 dates."
    },
    {
      question: "How do JWT tokens use epoch timestamps?",
      answer: "JWT (JSON Web Token) payloads include epoch timestamps in claims: exp (expiration), iat (issued at), nbf (not before). Example payload: {sub: 'user123', exp: 1704070800, iat: 1704067200}. Validation checks: if (currentEpoch >= payload.exp) reject token. If (currentEpoch < payload.nbf) reject token. Epoch is used because it's timezone-agnostic and simple to compare. Issued-at (iat) tracks token creation. Expiration (exp) enforces token lifetime (usually iat + 3600 for 1 hour TTL)."
    },
    {
      question: "Why store epoch instead of ISO 8601 date strings?",
      answer: "Epoch integers are more efficient: 4-8 bytes vs. 20+ bytes for ISO strings ('2024-01-01T00:00:00Z'). Faster comparisons and sorting (integer comparison vs. string parsing). Timezone-agnostic (ISO requires Z suffix for UTC or offset like +05:00). Easier arithmetic (calculate duration: end - start). More reliable indexing in databases. ISO 8601 is better for human-readable APIs and debugging. Best practice: store epoch in database, convert to ISO 8601 for API responses when human readability matters."
    },
    {
      question: "How do I handle daylight saving time with epoch?",
      answer: "Epoch timestamps are always UTC and unaffected by daylight saving time (DST). DST only affects local timezone display. Epoch 1704067200 always represents the same universal moment regardless of DST. When converting epoch to local time, timezone libraries (moment-timezone, date-fns-tz) handle DST automatically. Store epoch (UTC) in databases, let client-side code handle local timezone + DST conversion. Never store local times - DST causes ambiguity (clock 'falls back' creating duplicate times)."
    },
    {
      question: "What epoch timestamp format does MongoDB use?",
      answer: "MongoDB stores dates as BSON Date type internally - 64-bit integer milliseconds since Unix epoch (13 digits). When querying: new Date('2024-01-01') converts to milliseconds automatically. You can also insert raw milliseconds: {created_at: 1704067200000}. MongoDB's ISODate() helper converts to/from human-readable dates but stores milliseconds. For queries: {created_at: {$gte: 1704067200000}}. PostgreSQL uses seconds by default, MongoDB uses milliseconds - remember × 1000 when converting."
    },
    {
      question: "Is my timestamp data private?",
      answer: "Yes, all epoch conversions happen entirely in your browser using client-side JavaScript date APIs. No timestamps are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for converting sensitive timestamps from authentication tokens, financial transactions, proprietary log files, or regulated systems."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All epoch timestamp conversions happen entirely in your browser using client-side JavaScript Date APIs. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All conversions use browser-native Date object and math operations. Calculations happen locally.
- **No Server Uploads:** We don't have backend servers to process timestamps. Works completely offline after first page load.
- **No Data Storage:** Input timestamps and converted dates are not saved, logged, stored, or transmitted anywhere.
- **No Analytics on Content:** We don't track what timestamps you convert, what dates you query, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your data.

Safe for converting sensitive timestamps from authentication tokens, financial transaction logs, proprietary API responses, regulated audit logs, or confidential system events. Use with confidence for production debugging and security token analysis.`
  },

  stats: {
    "Conversion Speed": "<1ms",
    "Format Support": "2 types",
    "Timezone Aware": "Yes",
    "Precision": "Milliseconds",
    "Server Uploads": "0"
  }
};
