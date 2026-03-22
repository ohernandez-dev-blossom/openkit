/**
 * Timezone Converter Tool Guide Content
 * Comprehensive developer guide for timezone conversion and management
 */

import type { ToolGuideContent } from "./types";

export const timezoneGuideContent: ToolGuideContent = {
  toolName: "Timezone Converter",
  toolPath: "/timezone",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Source Timezone",
      description: "Choose the timezone you're converting from. Supports all IANA timezone database zones: America/New_York, Europe/London, Asia/Tokyo. Search by city name or timezone abbreviation (EST, PST, GMT, UTC). Automatically detects your local timezone as default."
    },
    {
      title: "Select Target Timezone",
      description: "Choose destination timezone(s) for conversion. Support for multiple target zones simultaneously - compare New York, London, Tokyo, Sydney times side-by-side. Useful for scheduling international meetings or coordinating across distributed teams."
    },
    {
      title: "Enter Time to Convert",
      description: "Input specific time in source timezone. Supports 12-hour (2:30 PM) and 24-hour (14:30) formats. Optionally include date for accurate DST handling. Tool accounts for daylight saving time transitions automatically."
    },
    {
      title: "View Converted Times",
      description: "See equivalent times in all target timezones. Shows local dates if conversion crosses midnight. Displays UTC offset for each zone. Indicates DST status. Copy individual times or generate formatted schedule for sharing with distributed teams."
    }
  ],

  introduction: {
    title: "What is Timezone Conversion?",
    content: `Timezone conversion calculates equivalent times across different geographic regions accounting for UTC offsets and daylight saving time rules. Essential for global software development, international business, distributed teams, and systems handling timestamps across multiple regions.

Software developers encounter timezone challenges when: scheduling international meetings, coordinating across distributed teams, storing/displaying timestamps in databases, handling API requests from multiple regions, implementing calendar/booking systems, processing logs from global infrastructure, deploying scheduled jobs across regions, and testing localization features.

### Why Timezone Conversion Matters for Developers

**Database timestamp storage:** Storing local times without timezone causes ambiguity. Example: "2024-03-10 02:30" in New York is meaningless - during DST spring forward, 2:30 AM doesn't exist (clocks jump 2 AM → 3 AM). Always store timestamps in UTC, convert to local timezone only for display. PostgreSQL \`timestamptz\`, MySQL \`TIMESTAMP\` (stores UTC), JavaScript \`Date\` objects (stores milliseconds since Unix epoch in UTC).

**API communication:** RESTful APIs receiving timestamps from global clients need timezone context. ISO 8601 format with timezone offset: \`2024-03-10T14:30:00-05:00\` (New York) or \`2024-03-10T14:30:00Z\` (UTC). Without timezone, "14:30" could be any timezone. JSON doesn't have datetime type - use strings with explicit timezone. GraphQL DateTime scalar should always include timezone.

**Meeting scheduling:** Distributed teams need meeting time coordination. "Let's meet at 9 AM" - whose 9 AM? New York 9 AM = London 2 PM = Tokyo 11 PM. Tools like Calendly show times in viewer's local timezone. Implementation requires: user timezone detection, display times in local timezone, store meeting time in UTC, account for DST changes between scheduling and meeting date.

**Scheduled jobs and cron:** Cron jobs run in server timezone (usually UTC). Scheduling "daily report at 9 AM EST" requires: converting 9 AM EST to UTC (14:00 UTC during standard time, 13:00 UTC during DST), updating cron when DST changes (or use timezone-aware scheduler), ensuring server clock is accurate and NTP-synced. Cloud schedulers (AWS EventBridge, GCP Cloud Scheduler) use UTC - always convert local time to UTC.

**Daylight Saving Time (DST) handling:** DST transitions create edge cases. Spring forward: clocks jump ahead (2 AM → 3 AM), times between don't exist. Fall back: clocks repeat hour (2 AM occurs twice), ambiguous times. Example: scheduling event for 2:30 AM on DST transition day in New York. Is it first 2:30 AM or second? Use UTC internally, specify timezone explicitly, test DST transition dates (March and November for US).

### Timezone Concepts

**UTC (Coordinated Universal Time):** Global time standard, never observes DST. Reference point for all timezones. Server timestamps should use UTC. Convert to local timezone only for display. UTC offset examples: New York UTC-5 (EST) or UTC-4 (EDT), London UTC+0 (GMT) or UTC+1 (BST), Tokyo UTC+9 (always, no DST).

**IANA Timezone Database:** Standard timezone identifier format: \`Area/Location\`. Examples: \`America/New_York\`, \`Europe/London\`, \`Asia/Tokyo\`. Use these, not abbreviations (EST, PST) which are ambiguous. Example: EST could be US Eastern or Australian Eastern. IANA IDs are unambiguous.

**Timezone abbreviations:** Short codes like EST, PST, GMT. Ambiguous and should be avoided in code. Multiple regions use same abbreviations. Only useful for human-readable display. Use IANA IDs (\`America/New_York\`) in code, show abbreviations (EST/EDT) in UI.

**UTC offset:** Hours and minutes difference from UTC. Format: \`±HH:MM\` or \`±HHMM\`. Examples: New York is UTC-05:00 (EST) or UTC-04:00 (EDT), India is UTC+05:30, Nepal is UTC+05:45. Offset changes with DST. Don't hardcode offsets - use timezone libraries that handle DST.

**Daylight Saving Time (DST):** Clock adjustment (typically +1 hour) during summer months. Not all regions observe DST. Transitions: spring forward (skip hour), fall back (repeat hour). US: second Sunday in March (forward) and first Sunday in November (back). EU: last Sunday in March (forward) and last Sunday in October (back). Southern hemisphere: opposite schedule.

### Common Timezone Pitfalls

**Storing local time without timezone:** Database column \`event_time DATETIME\` storing "2024-03-10 14:30" - what timezone? Ambiguous. Fix: use \`TIMESTAMP\` (MySQL, stores UTC) or \`timestamptz\` (PostgreSQL, stores UTC + timezone).

**Assuming timezone abbreviations are unique:** "CST" could be Central Standard Time (US, UTC-6), China Standard Time (UTC+8), or Cuba Standard Time (UTC-5). Use IANA IDs to avoid confusion.

**Ignoring DST transitions:** Hardcoding "New York is UTC-5" fails during EDT (UTC-4). Use timezone libraries (moment-timezone, date-fns-tz, Luxon) that handle DST automatically.

**JavaScript Date timezone confusion:** \`new Date("2024-03-10")\` parses as midnight UTC, not local midnight. \`new Date("2024-03-10T00:00:00")\` parses as local midnight. ISO string without timezone assumes UTC, without time assumes local. Always be explicit: \`new Date("2024-03-10T00:00:00Z")\` for UTC.

**Displaying UTC to users:** Showing timestamps in UTC confuses users. "2024-03-10 14:30 UTC" - what's that in my time? Convert to user's local timezone for display. Detect from browser: \`Intl.DateTimeFormat().resolvedOptions().timeZone\` or ask user to select preferred timezone.

### Conversion Formulas

**Convert local to UTC:**
\`\`\`
UTC_time = local_time - UTC_offset
Example: New York 9 AM EST (UTC-5) = 9:00 - (-5:00) = 14:00 UTC
\`\`\`

**Convert UTC to local:**
\`\`\`
local_time = UTC_time + UTC_offset
Example: 14:00 UTC = 14:00 + (-5:00) = 9:00 AM EST
\`\`\`

**Convert between timezones:**
\`\`\`
target_time = source_time - source_offset + target_offset
Example: New York 9 AM EST (UTC-5) to Tokyo (UTC+9)
= 9:00 - (-5:00) + 9:00 = 23:00 (11 PM)
\`\`\`

**Note:** Offsets change with DST. Use timezone libraries instead of manual calculation to handle DST correctly.

This tool converts times between timezones with accurate DST handling, supports multiple timezone comparisons, and helps developers coordinate across global regions.`
  },

  useCases: [
    {
      title: "Schedule International Team Meetings",
      description: "Find mutually convenient meeting times for distributed teams across multiple timezones. Convert proposed time to all team member locations to identify conflicts with working hours or sleep schedules.",
      example: `// Meeting scheduler for distributed team:
import { DateTime } from 'luxon';

interface TeamMember {
  name: string;
  timezone: string; // IANA timezone ID
}

const team: TeamMember[] = [
  { name: 'Alice (NY)', timezone: 'America/New_York' },
  { name: 'Bob (London)', timezone: 'Europe/London' },
  { name: 'Charlie (Tokyo)', timezone: 'Asia/Tokyo' },
  { name: 'Diana (Sydney)', timezone: 'Australia/Sydney' }
];

function findMeetingTimes(
  proposedTimeUTC: string,
  team: TeamMember[]
) {
  const meetingUTC = DateTime.fromISO(proposedTimeUTC, { zone: 'utc' });

  const localTimes = team.map(member => {
    const localTime = meetingUTC.setZone(member.timezone);

    return {
      name: member.name,
      timezone: member.timezone,
      time: localTime.toFormat('h:mm a'),
      date: localTime.toFormat('MMM dd'),
      hour: localTime.hour,
      isWorkingHours: localTime.hour >= 9 && localTime.hour <= 17
    };
  });

  return localTimes;
}

// Propose meeting: 2024-03-15 at 14:00 UTC
const times = findMeetingTimes('2024-03-15T14:00:00Z', team);

// Results:
// Alice (NY): 9:00 AM, Mar 15 ✓ (working hours)
// Bob (London): 2:00 PM, Mar 15 ✓ (working hours)
// Charlie (Tokyo): 11:00 PM, Mar 15 ✗ (after hours)
// Diana (Sydney): 1:00 AM, Mar 16 ✗ (middle of night)

// Conclusion: Bad time for Asia-Pacific team
// Try different time or rotate meeting schedule`
    },
    {
      title: "Display Timestamps in User's Local Timezone",
      description: "Convert UTC timestamps from API/database to user's local timezone for display. Essential for activity feeds, chat messages, logs, and any time-sensitive information shown to global users.",
      example: `// Convert API timestamps to user local time:
import { formatInTimeZone } from 'date-fns-tz';

interface Event {
  id: string;
  name: string;
  timestamp: string; // ISO 8601 UTC timestamp from API
}

function displayEventsInUserTimezone(
  events: Event[],
  userTimezone: string
) {
  return events.map(event => {
    // Parse UTC timestamp
    const utcDate = new Date(event.timestamp);

    // Format in user's timezone
    const localTime = formatInTimeZone(
      utcDate,
      userTimezone,
      'MMM dd, yyyy h:mm a zzz'
    );

    // Calculate relative time
    const now = new Date();
    const diffMs = now.getTime() - utcDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    let relativeTime = '';
    if (diffMins < 60) {
      relativeTime = \`\${diffMins} minutes ago\`;
    } else if (diffMins < 1440) {
      relativeTime = \`\${Math.floor(diffMins / 60)} hours ago\`;
    } else {
      relativeTime = \`\${Math.floor(diffMins / 1440)} days ago\`;
    }

    return {
      ...event,
      localTime,
      relativeTime
    };
  });
}

// Usage:
const events = [
  { id: '1', name: 'Deployment', timestamp: '2024-03-15T18:30:00Z' },
  { id: '2', name: 'Bug Report', timestamp: '2024-03-15T12:15:00Z' }
];

// User in New York (EST, UTC-5)
const nyEvents = displayEventsInUserTimezone(events, 'America/New_York');
// Deployment: Mar 15, 2024 1:30 PM EST (2 hours ago)
// Bug Report: Mar 15, 2024 7:15 AM EST (8 hours ago)

// Same events, user in Tokyo (JST, UTC+9)
const tokyoEvents = displayEventsInUserTimezone(events, 'Asia/Tokyo');
// Deployment: Mar 16, 2024 3:30 AM JST (2 hours ago)
// Bug Report: Mar 15, 2024 9:15 PM JST (8 hours ago)

// Same UTC timestamp, different local display`
    },
    {
      title: "Schedule Cron Jobs Across Timezones",
      description: "Convert desired local time to UTC for cron job scheduling. Cloud schedulers run in UTC, so jobs for '9 AM local' must convert to correct UTC time accounting for DST changes.",
      example: `// Convert local schedule to UTC cron:
import { DateTime } from 'luxon';

function localTimeToUTCCron(
  localHour: number,
  localMinute: number,
  timezone: string
): {
  utcHour: number;
  utcMinute: number;
  cronExpression: string;
  dstWarning?: string;
} {
  // Create example date in target timezone
  const localTime = DateTime.fromObject(
    { hour: localHour, minute: localMinute },
    { zone: timezone }
  );

  const utcTime = localTime.toUTC();

  // Check if DST affects this timezone
  const winterOffset = DateTime.fromObject(
    { month: 1, hour: localHour, minute: localMinute },
    { zone: timezone }
  ).offset;

  const summerOffset = DateTime.fromObject(
    { month: 7, hour: localHour, minute: localMinute },
    { zone: timezone }
  ).offset;

  const hasDST = winterOffset !== summerOffset;

  const result = {
    utcHour: utcTime.hour,
    utcMinute: utcTime.minute,
    cronExpression: \`\${utcTime.minute} \${utcTime.hour} * * *\`
  };

  if (hasDST) {
    result.dstWarning = \`Warning: This timezone observes DST. Cron will run at \${localHour}:\${localMinute.toString().padStart(2, '0')} during standard time, but offset by 1 hour during DST. Consider timezone-aware scheduler.\`;
  }

  return result;
}

// Example: Daily report at 9 AM EST
const nyCron = localTimeToUTCCron(9, 0, 'America/New_York');
// utcHour: 14 (during EST, UTC-5)
// utcMinute: 0
// cronExpression: "0 14 * * *"
// dstWarning: "Warning: This timezone observes DST..."

// Problem: During EDT (UTC-4), cron runs at 10 AM local, not 9 AM!
// Solution: Use AWS EventBridge with timezone support
// or update cron expression seasonally`
    },
    {
      title: "Handle Calendar Event Creation with Timezones",
      description: "Store calendar events with timezone information to correctly display across different user timezones and handle DST transitions. Essential for booking systems, appointment schedulers, and event management platforms.",
      example: `// Calendar event with proper timezone handling:
interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO 8601 with timezone
  end: string;
  timezone: string; // IANA timezone
}

function createEvent(
  title: string,
  startLocal: { year: number; month: number; day: number; hour: number; minute: number },
  durationMinutes: number,
  timezone: string
): CalendarEvent {
  // Create event in local timezone
  const start = DateTime.fromObject(startLocal, { zone: timezone });
  const end = start.plus({ minutes: durationMinutes });

  return {
    id: crypto.randomUUID(),
    title,
    start: start.toISO(), // Includes timezone offset
    end: end.toISO(),
    timezone
  };
}

function displayEvent(
  event: CalendarEvent,
  displayTimezone: string
) {
  const start = DateTime.fromISO(event.start).setZone(displayTimezone);
  const end = DateTime.fromISO(event.end).setZone(displayTimezone);

  return {
    title: event.title,
    displayStart: start.toFormat('MMM dd, h:mm a zzz'),
    displayEnd: end.toFormat('h:mm a zzz'),
    originalTimezone: event.timezone
  };
}

// Create event: March 15, 2024 at 2 PM in New York
const meeting = createEvent(
  'Team Standup',
  { year: 2024, month: 3, day: 15, hour: 14, minute: 0 },
  30,
  'America/New_York'
);

// Store in database:
// start: "2024-03-15T14:00:00-04:00" (includes UTC offset)
// timezone: "America/New_York"

// User in New York sees:
const nyView = displayEvent(meeting, 'America/New_York');
// "Mar 15, 2:00 PM EDT" to "2:30 PM EDT"

// User in London sees:
const londonView = displayEvent(meeting, 'Europe/London');
// "Mar 15, 6:00 PM GMT" to "6:30 PM GMT"

// Same event, different local displays, correct times!`
    }
  ],

  howToUse: {
    title: "How to Use This Timezone Converter",
    content: `This tool converts times between timezones with accurate DST handling. Supports multiple timezone comparisons for scheduling international meetings and coordinating distributed teams.

### Selecting Timezones

**Source timezone:** Timezone you're converting FROM. Auto-detects your current timezone as default. Can change to any IANA timezone: \`America/New_York\`, \`Europe/London\`, \`Asia/Tokyo\`, etc.

**Target timezone(s):** Timezone(s) you're converting TO. Add multiple targets to compare times across many regions simultaneously. Useful for: finding meeting times across distributed team, checking business hours in multiple offices, coordinating deployments across regions.

**Timezone search:** Type city name to find timezone: "New York" → America/New_York, "London" → Europe/London, "Tokyo" → Asia/Tokyo. Or search by abbreviation: "EST", "PST", "GMT" (shows all matching timezones).

**Common timezones:**
- US: America/New_York (EST/EDT), America/Chicago (CST/CDT), America/Los_Angeles (PST/PDT)
- Europe: Europe/London (GMT/BST), Europe/Paris (CET/CEST), Europe/Berlin
- Asia: Asia/Tokyo (JST), Asia/Shanghai (CST), Asia/Kolkata (IST)
- Pacific: Australia/Sydney (AEDT/AEST), Pacific/Auckland (NZDT/NZST)

### Entering Times to Convert

**Time input:** Type time in 12-hour (2:30 PM) or 24-hour (14:30) format. Tool accepts both. Include AM/PM for 12-hour format to avoid ambiguity.

**Date input:** Optionally specify date for accurate DST handling. Example: "March 10, 2024 at 2:30 AM" in New York - does this exist? (Spring forward DST transition). Tool shows if time is invalid due to DST.

**Current time conversion:** Click "Now" to convert current time to selected timezones. Instantly see what time it is across all target zones.

### Reading Conversion Results

**Converted times:** Shows equivalent time in each target timezone. Example: New York 9 AM → London 2 PM, Tokyo 11 PM, Sydney 1 AM (next day).

**Date changes:** If conversion crosses midnight, shows different date. Example: New York Monday 11 PM → Tokyo Tuesday 1 PM. Important for scheduling - "Monday meeting" might be Tuesday for some team members.

**UTC offset display:** Shows current UTC offset for each timezone. Example: New York shows "UTC-5" (EST) or "UTC-4" (EDT) depending on date. Helps verify DST status.

**DST indicator:** Shows if timezone is currently in daylight saving time. Example: New York in March-November shows "EDT" (daylight), December-February shows "EST" (standard).

### Handling Daylight Saving Time

**DST transitions:** Tool automatically accounts for DST when date is specified. Spring forward: times between 2-3 AM don't exist. Fall back: times between 1-2 AM occur twice (ambiguous).

**Scheduling around DST:** When scheduling recurring meetings, be aware of DST impacts:
- March DST transition (US): meeting time shifts 1 hour for US participants vs non-DST regions
- November DST transition: shifts back
- Solution: use timezone-aware scheduling tools or schedule relative to UTC

**Non-DST regions:** Some regions never observe DST: Arizona (except Navajo Nation), Hawaii, Japan, China, India. Their UTC offset stays constant year-round.

### Meeting Scheduling Best Practices

**Find overlap:** Convert proposed time to all team timezones. Identify:
- ✅ Working hours (9 AM - 5 PM local)
- ⚠️ Early morning or late evening (acceptable occasionally)
- ❌ Middle of night (unacceptable)

**Rotate meeting times:** If no perfect time exists, rotate schedule to share inconvenience. Example: Week 1 at 9 AM New York time (bad for Asia), Week 2 at 9 PM New York time (bad for Europe/US).

**Use "timezone-neutral" times:** Some times work better globally. Example: 8 AM US East Coast = 1 PM London = 9 PM Tokyo. Late but workable for all. Versus 10 AM East Coast = 11 PM Tokyo (too late).

**Document in multiple timezones:** When sharing meeting times, show multiple timezones: "Meeting at 2 PM UTC / 9 AM EST / 3 PM CET / 11 PM JST". Avoids confusion.

### Developer Workflow Integration

**API testing:** Converting timestamps from API responses. API returns UTC, convert to local for debugging.

**Log analysis:** Server logs in UTC, convert to local timezone to correlate with user activity.

**Database timestamp conversion:** Query database (stored in UTC), display results in user's local timezone.

**Cron scheduling:** Want job to run at "9 AM local", convert to UTC for cron expression.`,
    steps: [
      {
        name: "Select Source Timezone",
        text: "Choose timezone you're converting FROM. Auto-detects your local timezone by default. Search by city name or timezone ID."
      },
      {
        name: "Select Target Timezone(s)",
        text: "Choose timezone(s) you're converting TO. Add multiple targets to compare times across regions for meeting scheduling or team coordination."
      },
      {
        name: "Enter Time",
        text: "Input time to convert (12-hour or 24-hour format). Optionally specify date for accurate DST handling. Or click 'Now' for current time."
      },
      {
        name: "View Converted Times",
        text: "See equivalent times in all target timezones. Note date changes if conversion crosses midnight. Check UTC offsets and DST status."
      }
    ]
  },

  faqs: [
    {
      question: "Should I store timestamps in UTC or local timezone in my database?",
      answer: "Always store in UTC. Storing local time creates ambiguity (which timezone?) and DST issues (times that don't exist or occur twice). Use UTC for storage, convert to local timezone only for display. PostgreSQL: use timestamptz type (stores UTC + timezone). MySQL: use TIMESTAMP (stores UTC, converts to session timezone on retrieval). Application code: store JavaScript Date objects (internally UTC), display with timezone conversion."
    },
    {
      question: "Why do timezone abbreviations like EST and PST change to EDT and PDT?",
      answer: "Standard Time (ST) vs Daylight Time (DT). During daylight saving time (roughly March-November in US), clocks move forward 1 hour. EST (Eastern Standard Time, UTC-5) becomes EDT (Eastern Daylight Time, UTC-4). PST (UTC-8) becomes PDT (UTC-7). Abbreviation changes reflect the UTC offset change. Always use IANA timezone IDs (America/New_York) in code, not abbreviations - they're ambiguous and don't capture DST rules."
    },
    {
      question: "How do I schedule a meeting that works for US, Europe, and Asia?",
      answer: "It's challenging - 24 hour difference makes full overlap rare. Strategies: 1) Early US morning (7-8 AM Eastern) = afternoon Europe (12-1 PM GMT) = evening Asia (9-10 PM JST). Late but workable. 2) Rotate meeting times to share inconvenience. 3) Split into regional meetings with recorded summaries. 4) Async communication (Slack, Loom) instead of synchronous meetings. Use converter to test proposed times across all regions."
    },
    {
      question: "What happens during DST transitions (spring forward, fall back)?",
      answer: "Spring forward: clocks skip 1 hour (2 AM becomes 3 AM). Times between 2-3 AM don't exist. Scheduling event for 2:30 AM on transition day is invalid. Fall back: clocks repeat 1 hour (3 AM becomes 2 AM). Times between 2-3 AM occur twice - ambiguous which 2:30 AM you mean. Best practice: avoid scheduling critical events during DST transition hours (1-4 AM local time on transition days). Or use UTC internally to avoid ambiguity."
    },
    {
      question: "How do I handle timezones in JavaScript?",
      answer: "JavaScript Date objects store UTC milliseconds, display methods use browser's local timezone. For timezone conversion, use libraries: Luxon (successor to Moment), date-fns-tz (lightweight), or Intl.DateTimeFormat (built-in). Example: new Date('2024-03-15T14:00:00Z') creates UTC time. Display in specific timezone: new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York'}).format(date). Never parse/format dates manually - edge cases are complex."
    },
    {
      question: "Why does my cron job run at wrong local time after DST change?",
      answer: "Cron runs in server timezone (usually UTC). If you schedule for '9 AM local' by converting to UTC once, it breaks when DST changes. Example: 9 AM EST = 14:00 UTC, but 9 AM EDT = 13:00 UTC. Cron at 14:00 UTC runs at 10 AM during EDT (wrong). Solutions: 1) Use timezone-aware scheduler (AWS EventBridge supports timezone specification), 2) Update cron expression seasonally, 3) Schedule in UTC and accept local time shifts, 4) Use systemd timers with timezone support (Linux)."
    },
    {
      question: "What timezone should I use for API responses?",
      answer: "Return timestamps in UTC with ISO 8601 format: '2024-03-15T14:00:00Z' (Z indicates UTC). Client converts to local timezone for display. Alternative: include timezone offset: '2024-03-15T14:00:00-04:00' (4 hours behind UTC). Never return timestamps without timezone - '2024-03-15T14:00:00' is ambiguous. Clients determine their timezone from browser (Intl.DateTimeFormat().resolvedOptions().timeZone) or user preferences."
    },
    {
      question: "How do I test timezone-related code?",
      answer: "Mock system timezone in tests. JavaScript: set TZ environment variable (TZ='America/New_York' npm test). Test edge cases: DST transitions (spring forward, fall back), non-hour offsets (India UTC+5:30), southern hemisphere (reversed DST schedule), historical timezone changes (rules change over time). Libraries like Luxon allow setting 'default zone' for testing. Always test with multiple timezones, not just your local one."
    },
    {
      question: "Why is New York sometimes UTC-5 and sometimes UTC-4?",
      answer: "Daylight Saving Time. New York observes DST: Standard time (EST, UTC-5) roughly November-March, Daylight time (EDT, UTC-4) roughly March-November. UTC offset changes twice per year. Don't hardcode 'UTC-5' for New York - use timezone library that applies correct offset based on date. Example: DateTime.fromObject({hour: 9}, {zone: 'America/New_York'}) automatically uses UTC-5 in winter, UTC-4 in summer."
    },
    {
      question: "Is my timezone conversion data private?",
      answer: "Yes, all timezone conversions happen entirely in your browser using client-side JavaScript and timezone data. No times, dates, or selected timezones are transmitted to servers, logged, or stored. The tool works completely offline after loading timezone database. No network requests contain your data. Safe for converting confidential meeting times, proprietary event schedules, or internal team coordination. All conversions are local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All timezone conversions happen entirely in your browser using client-side JavaScript and IANA timezone database. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All timezone calculations use browser-native JavaScript Date APIs and timezone data loaded locally. Computations happen on your device.
- **No Server Uploads:** We don't have backend servers to process timezone conversions. The tool works completely offline after loading timezone database.
- **No Data Storage:** Times, dates, and selected timezones are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what times you convert, what timezones you use, or any conversion-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your time data.

Safe for converting confidential meeting schedules, proprietary event planning, internal team coordination, or any sensitive time-based information. Use with confidence for all timezone conversion needs.`
  },

  stats: {
    "Timezones": "600+",
    "DST Handling": "Automatic",
    "Multiple Targets": "Yes",
    "Date Support": "Yes",
    "Server Uploads": "0"
  }
};
