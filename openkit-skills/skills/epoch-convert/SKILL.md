---
name: epoch-convert
description: Convert Unix timestamps to human-readable dates, or human-readable dates to Unix timestamps. Also report the current Unix timestamp. Use when the user asks to convert epoch time, convert timestamp to date, convert date to Unix timestamp, what time is epoch X, what is the current Unix timestamp, or how many seconds since 1970.
---

# Epoch / Unix Timestamp Converter

Convert between Unix epoch timestamps and human-readable dates. Supports seconds and milliseconds, multiple timezones, ISO 8601, and relative time output. Can also report the current Unix timestamp.

## Input

**Timestamp → Date mode:**
- A Unix timestamp (integer) — 10 digits = seconds, 13 digits = milliseconds
- Unit: `seconds` (default for 10-digit) or `milliseconds` (default for 13-digit)
- Timezone: `UTC` (default), `Local`, `America/New_York`, `America/Los_Angeles`, `Europe/London`, `Europe/Paris`, `Asia/Tokyo`, `Asia/Shanghai`

**Date → Timestamp mode:**
- A human-readable date/time string (ISO 8601 or natural language like "Jan 15 2024 10:30 UTC")

**Current time request:**
- No input needed — report the current timestamp

## Output

**Timestamp → Date:**
- Full formatted date (e.g., `January 15, 2024 at 10:30:00 AM UTC`)
- ISO 8601 string
- Relative time (e.g., `2 years ago`, `in 3 days`)

**Date → Timestamp:**
- Unix timestamp in seconds
- Unix timestamp in milliseconds

**Current time:**
- Current Unix timestamp in seconds
- Current Unix timestamp in milliseconds
- UTC string representation

## Instructions

### Timestamp → Date
1. Parse the input as an integer.
2. Determine unit: if the user specifies seconds/milliseconds, use that; otherwise infer from digit count (≤10 digits = seconds, >10 = milliseconds).
3. Convert to milliseconds: if seconds, multiply by 1000.
4. Create a Date object from milliseconds.
5. Validate — if the Date is invalid (NaN), report an error.
6. Format outputs:
   - **Full format:** Use `toLocaleString("en-US", { year, month: "long", day, hour, minute, second, timeZone, timeZoneName: "short" })` with the specified timezone.
   - **ISO 8601:** For UTC/Local use `.toISOString()`; for other timezones use `toLocaleString("sv-SE", { timeZone })`.
   - **Relative time:** Compute `diff = now - milliseconds`. Express as seconds/minutes/hours/days/years, then suffix with "ago" (past) or "in X" (future).

### Date → Timestamp
1. Parse the input date string with `new Date(inputDate)`.
2. Validate — if NaN, report error.
3. Get milliseconds via `.getTime()`.
4. Output:
   - Seconds: `Math.floor(ms / 1000)`
   - Milliseconds: `ms`

### Current time
1. Get `Date.now()` (milliseconds since epoch).
2. Output seconds: `Math.floor(now / 1000)`, milliseconds: `now`, UTC string: `new Date(now).toUTCString()`.

## Options
- `unit`: `seconds` | `milliseconds` — auto-detected from digit count if not specified
- `timezone`: `UTC` | `Local` | `America/New_York` | `America/Los_Angeles` | `Europe/London` | `Europe/Paris` | `Asia/Tokyo` | `Asia/Shanghai` — default: `UTC`

## Examples

**Timestamp (seconds) → Date:**
Input: `1700000000`
Output:
- Full: `November 14, 2023 at 10:13:20 PM UTC`
- ISO: `2023-11-14T22:13:20.000Z`
- Relative: `~2 years ago`

**Date → Timestamp:**
Input: `2024-01-15T10:30:00Z`
Output:
- Seconds: `1705314600`
- Milliseconds: `1705314600000`

**Current time (as of 2026-03-22):**
- Seconds: `~1742600000`
- Milliseconds: `~1742600000000`

**Quick reference:**
- `0` = Jan 1, 1970 00:00:00 UTC (Unix epoch origin)
- `1000000000` = Sep 9, 2001 01:46:40 UTC
- `1234567890` = Feb 13, 2009 23:31:30 UTC
- `2000000000` = May 18, 2033 03:33:20 UTC

## Error Handling
- **Invalid timestamp (non-numeric or out of range):** Report `Invalid timestamp — please provide an integer (seconds or milliseconds since Jan 1, 1970 UTC)`.
- **Invalid date string:** Report `Invalid date — please use ISO 8601 format (e.g., 2024-01-15T10:30:00Z) or a recognizable date string`.
- **Ambiguous unit:** Default to seconds for 10-digit values, milliseconds for 13-digit values. Mention the assumption.
