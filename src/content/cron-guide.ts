/**
 * Cron Parser Tool Guide Content
 * Comprehensive developer guide for parsing cron expressions
 */

import type { ToolGuideContent } from "./types";

export const cronGuideContent: ToolGuideContent = {
  toolName: "Cron Parser",
  toolPath: "/cron",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Cron Expression",
      description: "Paste or type your cron expression in standard 5-field or extended 6-7 field format. Supports minute, hour, day of month, month, day of week, and optional year/second fields. Accepts standard operators: * (any), - (range), , (list), / (step)."
    },
    {
      title: "Parse Expression",
      description: "Tool automatically parses the cron syntax and validates field values. Detects invalid ranges (e.g., minute > 59), incorrect field counts, or malformed operators. Provides immediate feedback on syntax errors with helpful correction hints."
    },
    {
      title: "View Human-Readable Schedule",
      description: "See plain English description of when the job runs. Example: '0 9 * * 1' becomes 'At 09:00, only on Monday'. Helps verify cron logic matches intended schedule before deployment."
    },
    {
      title: "See Next Execution Times",
      description: "View upcoming execution timestamps (next 5-10 runs) calculated from current time. Useful for confirming schedule timing, checking timezone handling, or debugging why a job didn't run as expected."
    }
  ],

  introduction: {
    title: "What is Cron Expression Parsing?",
    content: `Cron expression parsing converts Unix cron syntax into human-readable schedules and calculates execution times. Cron is the time-based job scheduler in Unix-like operating systems, used to run scripts, commands, or tasks at fixed times, dates, or intervals. Understanding cron syntax is essential for DevOps, backend development, and automated task scheduling.

Software developers encounter cron expressions when configuring: CI/CD pipeline schedules (GitHub Actions, GitLab CI), cloud job schedulers (AWS EventBridge, GCP Cloud Scheduler), backup automation, database maintenance tasks, log rotation scripts, monitoring health checks, webhook retries, email campaign delivery, cache invalidation jobs, and report generation tasks.

### Why Cron Parsing Matters for Developers

**Scheduled job automation:** Backend systems rely on cron for recurring tasks. Example: run database backups daily at 2 AM, clean up old logs every Sunday at midnight, send weekly summary emails every Monday at 9 AM, refresh cache every 15 minutes. Incorrect cron syntax causes jobs to run at wrong times, skip entirely, or run too frequently, leading to data loss, performance issues, or service disruptions.

**Cloud scheduler configuration:** AWS EventBridge, GCP Cloud Scheduler, Azure Functions Timer Triggers all use cron expressions. Configuring '0 9 * * *' schedules a job at 9 AM daily. But '0 9 * * 1' only runs Mondays. Understanding syntax differences prevents costly mistakes. Cloud platforms charge per execution - incorrect cron can cause thousands of unexpected runs.

**GitHub Actions scheduling:** CI/CD workflows use cron syntax for scheduled runs. Example: \`schedule: [{cron: '0 0 * * 0'}]\` runs tests every Sunday at midnight. But cron uses UTC timezone, not your local time. Parsing helps verify: does '0 9 * * *' mean 9 AM UTC or 9 AM EST? Timezone confusion causes workflows to run at unexpected hours.

**Kubernetes CronJobs:** Kubernetes CronJob resources use cron syntax to schedule pod execution. Example: daily database backup job, periodic health checks, scheduled scaling operations. Invalid cron syntax causes job creation to fail silently or jobs to never run. Parsing validates syntax before deployment and prevents production issues.

**Debugging schedule issues:** When a scheduled job doesn't run as expected, cron parsing helps diagnose: Is syntax correct? Does timezone match expectations? Are there conflicting field values? Does expression actually produce the desired schedule? Parsing tool shows next execution times to verify timing matches intent.

### Cron Expression Syntax

**Standard 5-field format:** \`minute hour day_of_month month day_of_week\`
- **Minute:** 0-59
- **Hour:** 0-23 (24-hour format)
- **Day of month:** 1-31
- **Month:** 1-12 or JAN-DEC
- **Day of week:** 0-6 or SUN-SAT (0 and 7 both = Sunday)

Example: \`30 14 * * 5\` = At 14:30 (2:30 PM) every Friday

**Extended 6-field format (with seconds):** \`second minute hour day_of_month month day_of_week\`
- **Second:** 0-59
- Remaining fields same as 5-field format

Example: \`0 30 14 * * 5\` = At 14:30:00 every Friday (precise to second)

**7-field format (with year):** \`minute hour day_of_month month day_of_week year\`
- **Year:** 1970-2099
- Useful for one-time scheduled events or year-specific jobs

Example: \`0 9 1 1 * 2025\` = At 09:00 on January 1st, 2025 only

### Special Characters and Operators

**Asterisk (*):** Matches any value. \`* * * * *\` = every minute of every day.

**Comma (,):** Value list. \`0 9,17 * * *\` = At 09:00 and 17:00 daily.

**Hyphen (-):** Range. \`0 9-17 * * *\` = Every hour from 09:00 to 17:00.

**Slash (/):** Step values. \`*/15 * * * *\` = Every 15 minutes. \`0 */2 * * *\` = Every 2 hours.

**Question mark (?):** Only in day_of_month or day_of_week (some implementations). Means "no specific value". Used when specifying one day field but not the other. Example: \`0 9 15 * ?\` = 9 AM on 15th of every month (day of week doesn't matter).

**L:** Last (day of month or week, some implementations). \`0 0 L * *\` = Midnight on last day of month.

**W:** Weekday nearest to given day (some implementations). \`0 9 15W * *\` = 9 AM on weekday nearest to 15th.

**Hash (#):** Nth occurrence of day (some implementations). \`0 9 * * 1#2\` = 9 AM on second Monday of month.

### Common Cron Patterns

**Every minute:** \`* * * * *\`

**Every 5 minutes:** \`*/5 * * * *\`

**Every hour at minute 0:** \`0 * * * *\`

**Every day at midnight:** \`0 0 * * *\`

**Every day at 2:30 AM:** \`30 2 * * *\`

**Every Monday at 9 AM:** \`0 9 * * 1\`

**First day of month at midnight:** \`0 0 1 * *\`

**Every weekday at 9 AM:** \`0 9 * * 1-5\`

**Every 15 minutes during business hours:** \`*/15 9-17 * * 1-5\`

**Twice daily (9 AM and 5 PM):** \`0 9,17 * * *\`

### Timezone Considerations

**UTC vs Local Time:** Most cloud schedulers use UTC timezone. If you're in EST (UTC-5), a cron of \`0 9 * * *\` runs at 4 AM EST (9 AM UTC), not 9 AM EST. Always verify timezone settings in scheduler configuration. Some platforms allow timezone specification: \`TZ=America/New_York 0 9 * * *\` (syntax varies by platform).

**Daylight Saving Time:** Cron doesn't automatically adjust for DST. When clocks "spring forward" (2 AM becomes 3 AM), jobs scheduled at 2:30 AM skip that day. When clocks "fall back" (2 AM occurs twice), jobs at 2:30 AM may run twice. Design critical jobs around DST transitions.

**Distributed systems:** In multi-region deployments, every server runs cron in its local or configured timezone. Ensure consistent timezone configuration across all nodes or use UTC universally to avoid race conditions or duplicate executions.

This tool parses cron expressions, validates syntax, provides human-readable descriptions, and calculates next execution times to help developers verify scheduled task timing before deployment.`
  },

  useCases: [
    {
      title: "Validate GitHub Actions Workflow Schedule",
      description: "GitHub Actions uses cron syntax for scheduled workflows, but runs in UTC timezone. Parse cron expressions to verify workflow timing matches your intent, avoiding timezone confusion and ensuring CI runs at expected hours.",
      example: `# .github/workflows/scheduled-tests.yml
name: Nightly Tests
on:
  schedule:
    # Runs at 2 AM UTC (9 PM EST)
    - cron: '0 2 * * *'

# Parse '0 2 * * *':
# Human readable: "At 02:00 (UTC) every day"
# Next runs (from 2026-02-02 12:00 UTC):
# - 2026-02-03 02:00 UTC (Feb 2, 9 PM EST)
# - 2026-02-04 02:00 UTC (Feb 3, 9 PM EST)

# Common mistake: Expecting 2 AM local time
# Solution: Convert your desired local time to UTC
# Want 2 AM EST? Use '7 2 * * *' (2 AM EST = 7 AM UTC)`
    },
    {
      title: "Configure AWS EventBridge Scheduled Rules",
      description: "AWS EventBridge uses cron expressions to trigger Lambda functions, ECS tasks, or Step Functions on schedules. Parse expressions to ensure correct timing for automated backups, data processing, or periodic maintenance tasks.",
      example: `// AWS CDK EventBridge schedule:
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

// Database backup - daily at 2 AM UTC
const backupRule = new events.Rule(this, 'BackupRule', {
  schedule: events.Schedule.cron({
    minute: '0',
    hour: '2',
    // Runs: 02:00 UTC every day
  }),
});

// Cleanup old logs - Sunday midnight UTC
const cleanupRule = new events.Rule(this, 'CleanupRule', {
  schedule: events.Schedule.expression('cron(0 0 * * 0 *)'),
  // Parse: '0 0 * * 0' (5-field) or '0 0 * * 0 *' (6-field)
  // Runs: 00:00 UTC every Sunday
});

// Report generation - Weekdays at 9 AM UTC
const reportRule = new events.Rule(this, 'ReportRule', {
  schedule: events.Schedule.cron({
    minute: '0',
    hour: '9',
    weekDay: '1-5',
    // Parse: '0 9 * * 1-5'
    // Runs: Monday-Friday at 09:00 UTC
  }),
});`
    },
    {
      title: "Debug Kubernetes CronJob Schedules",
      description: "Kubernetes CronJobs use cron syntax to schedule pod execution. Parse expressions to verify correct timing, debug jobs that don't run as expected, and ensure timezone configuration matches cluster settings.",
      example: `# kubernetes-cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: database-backup
spec:
  # Parse this expression to verify timing:
  schedule: "0 2 * * *"
  # Human: "At 02:00 every day"
  # Runs in cluster timezone (often UTC)

  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: backup-tool:latest
            command: ["/bin/sh", "-c", "backup.sh"]
          restartPolicy: OnFailure

# Debugging: Job not running as expected?
# 1. Parse cron: '0 2 * * *' = 2 AM
# 2. Check cluster timezone: \`kubectl get nodes -o yaml | grep timezone\`
# 3. Verify next execution: Parse shows next 5 run times
# 4. Check CronJob status: \`kubectl get cronjob database-backup\`

# Common issue: Timezone mismatch
# Cluster in UTC, expected 2 AM EST
# Solution: Adjust cron to UTC equivalent (7 AM) or set TZ env var`
    },
    {
      title: "Build Cron Expression Validator for Scheduling UI",
      description: "Applications with user-facing scheduling features need cron validation. Parse user-entered expressions to validate syntax, show human-readable descriptions, and prevent invalid schedules before saving to database.",
      example: `// Cron validation service:
import parser from 'cron-parser';

async function validateCronSchedule(
  expression: string
): Promise<{ valid: boolean; description?: string; error?: string }> {
  try {
    // Parse cron expression
    const interval = parser.parseExpression(expression);

    // Get human-readable description
    const description = describeCron(expression);
    // Example: "0 9 * * 1-5" -> "At 09:00, Monday through Friday"

    // Calculate next 3 execution times
    const nextRuns = [];
    for (let i = 0; i < 3; i++) {
      nextRuns.push(interval.next().toDate());
    }

    return {
      valid: true,
      description,
      nextRuns,
    };
  } catch (error) {
    return {
      valid: false,
      error: \`Invalid cron expression: \${error.message}\`,
    };
  }
}

// Usage in scheduling form:
const userInput = '0 9 * * 1-5';
const validation = await validateCronSchedule(userInput);

if (validation.valid) {
  console.log(validation.description);
  // "At 09:00, Monday through Friday"
  console.log('Next runs:', validation.nextRuns);
  // Save to database
} else {
  console.error(validation.error);
  // Show error to user
}`
    }
  ],

  howToUse: {
    title: "How to Use This Cron Parser",
    content: `This tool parses cron expressions, validates syntax, provides human-readable descriptions, and calculates next execution times. Helps verify scheduled task timing before deployment.

### Entering Cron Expressions

Paste your cron expression in standard format. Supports:
- **5-field:** \`minute hour day_of_month month day_of_week\`
- **6-field (seconds):** \`second minute hour day_of_month month day_of_week\`
- **6-field (year):** \`minute hour day_of_month month day_of_week year\`

Examples:
- \`0 9 * * *\` - Daily at 9 AM
- \`*/15 * * * *\` - Every 15 minutes
- \`0 9 * * 1-5\` - Weekdays at 9 AM
- \`0 0 1 * *\` - First day of month at midnight

### Understanding Validation Results

**Syntax check:** Tool validates field values are within valid ranges. Minute 0-59, hour 0-23, day 1-31, month 1-12, day_of_week 0-6. Rejects invalid values like minute 60 or hour 25.

**Field count:** Detects incorrect field counts. Standard cron is 5 fields. Some implementations support 6 (with seconds or year) or 7. Tool identifies format and validates accordingly.

**Operator validation:** Checks special characters are used correctly. Slash (/) must have valid step values. Ranges (-) must be min to max. Lists (,) must have valid values.

### Reading Human-Readable Descriptions

Tool converts cron syntax to plain English:
- \`0 9 * * *\` → "At 09:00"
- \`0 9 * * 1\` → "At 09:00, only on Monday"
- \`*/15 * * * *\` → "Every 15 minutes"
- \`0 9 * * 1-5\` → "At 09:00, Monday through Friday"
- \`0 0,12 * * *\` → "At 00:00 and 12:00"

Verify description matches your intended schedule before deploying.

### Viewing Next Execution Times

Tool calculates upcoming execution timestamps based on current time. Shows next 5-10 runs with date and time. Useful for:
- Confirming schedule timing is correct
- Checking timezone interpretation (UTC vs local)
- Debugging why a job didn't run when expected
- Verifying frequency matches intent (every hour vs every day)

**Timezone note:** Most cloud schedulers use UTC. If next execution shows 09:00 UTC but you expected 09:00 EST, adjust cron expression to account for timezone offset.

### Common Cron Patterns

**Periodic intervals:**
- Every minute: \`* * * * *\`
- Every 5 minutes: \`*/5 * * * *\`
- Every hour: \`0 * * * *\`
- Every 2 hours: \`0 */2 * * *\`

**Daily schedules:**
- Midnight: \`0 0 * * *\`
- 2:30 AM: \`30 2 * * *\`
- 9 AM and 5 PM: \`0 9,17 * * *\`

**Weekly schedules:**
- Every Monday at 9 AM: \`0 9 * * 1\`
- Weekdays at 9 AM: \`0 9 * * 1-5\`
- Weekend at noon: \`0 12 * * 0,6\`

**Monthly schedules:**
- First of month at midnight: \`0 0 1 * *\`
- 15th of month at 9 AM: \`0 9 15 * *\`

### Troubleshooting Common Mistakes

**Timezone confusion:** Cloud schedulers often use UTC. Convert local time to UTC when writing cron. Example: 9 AM EST = 2 PM UTC during standard time, 1 PM UTC during daylight saving.

**Day of week vs day of month:** When both are specified (not *), some implementations use OR logic (either matches), others use AND (both must match). Test behavior in your specific platform.

**Minute vs hour confusion:** \`0 9 * * *\` means 9 AM (hour 9, minute 0), not 9 minutes past midnight. Use 24-hour format: 2 PM = hour 14.

**Step value misunderstanding:** \`*/15 * * * *\` runs at :00, :15, :30, :45 each hour. It doesn't run "every 15 minutes starting now" - it aligns to clock boundaries.`,
    steps: [
      {
        name: "Enter Cron Expression",
        text: "Paste or type your cron expression in standard format (5, 6, or 7 fields). Support for all standard operators: *, -, ,, /"
      },
      {
        name: "Validate Syntax",
        text: "Tool automatically validates field values, operator usage, and expression format. Displays errors with helpful correction hints if syntax is invalid."
      },
      {
        name: "Read Description",
        text: "View human-readable explanation of when the job runs. Verify description matches your intended schedule before deployment."
      },
      {
        name: "Check Next Executions",
        text: "See upcoming execution times (next 5-10 runs) calculated from current time. Confirm timing and timezone interpretation match expectations."
      }
    ]
  },

  faqs: [
    {
      question: "What timezone do cron expressions use?",
      answer: "Standard cron runs in server's local timezone, but most cloud schedulers (AWS EventBridge, GCP Cloud Scheduler, GitHub Actions) use UTC. Always verify timezone configuration in your platform documentation. Example: '0 9 * * *' runs at 9 AM UTC, which is 4 AM EST or 1 AM PST. Convert your desired local time to UTC when writing cron expressions for cloud platforms."
    },
    {
      question: "Why isn't my cron job running when expected?",
      answer: "Common causes: 1) Timezone mismatch - job uses UTC, you expected local time. 2) Invalid syntax - parser shows errors. 3) Day field confusion - specifying both day_of_month and day_of_week can cause unexpected OR logic. 4) Server time wrong - check system clock. 5) Job disabled or paused in scheduler. Use this parser to validate syntax and view next execution times to diagnose timing issues."
    },
    {
      question: "What's the difference between '0 9 * * 1' and '0 9 * * MON'?",
      answer: "No difference - both mean Monday at 9 AM. Cron accepts numeric day of week (0-6, where 0 and 7 both = Sunday, 1 = Monday) or three-letter abbreviations (SUN, MON, TUE, WED, THU, FRI, SAT). Numeric is more common in code. Abbreviations are more readable. Some platforms only support numeric format - check documentation."
    },
    {
      question: "How do I run a job every 15 minutes?",
      answer: "Use step value syntax: '*/15 * * * *'. This runs at :00, :15, :30, :45 every hour (aligns to clock boundaries). Alternative: '0,15,30,45 * * * *' (explicit list). NOT '15 * * * *' which runs only at :15 each hour. Step values (/) divide the range evenly starting from 0."
    },
    {
      question: "Can I run a cron job every 90 minutes?",
      answer: "Not directly with standard cron syntax. Step values must divide evenly into field range. For 90 minutes (1.5 hours), alternatives: 1) Use '0 0,1,3,4,6,7,9,10,12,13,15,16,18,19,21,22 * * *' (list all hours), complex and hard to read. 2) Run job every hour ('0 * * * *'), check if (hour % 1.5) in script, skip if not time. 3) Use dedicated job scheduler with interval support (not cron). Cron best for fixed clock times, not arbitrary intervals."
    },
    {
      question: "What happens during Daylight Saving Time changes?",
      answer: "When clocks spring forward (2 AM becomes 3 AM), jobs scheduled between 2-3 AM are skipped that day. When clocks fall back (2 AM occurs twice), jobs at 2-3 AM may run twice. Design critical jobs around DST transitions (avoid 2-3 AM window) or use UTC timezone which doesn't observe DST. Some schedulers have DST handling options - check platform documentation."
    },
    {
      question: "How do I schedule a job for the last day of the month?",
      answer: "Standard cron syntax doesn't directly support 'last day'. Extensions like Quartz or AWS EventBridge support 'L' character: '0 0 L * *' = midnight on last day of month. For standard cron, workarounds: 1) Run daily, check if tomorrow is next month in script. 2) Schedule for 28th-31st: '0 0 28-31 * *', check in script if actually last day. 3) Use calendar-aware scheduler instead of cron."
    },
    {
      question: "Can I specify both day of month and day of week?",
      answer: "Yes, but behavior is platform-specific. Most implementations use OR logic: job runs if EITHER condition matches. Example: '0 9 13 * 5' runs at 9 AM on 13th of month OR on Fridays (not only Friday the 13th). To specify only when both match, use '?' for unused field (Quartz syntax): '0 9 13 * ?' = 13th of month, any day of week. Check your platform's cron documentation for exact behavior."
    },
    {
      question: "How do I test cron expressions before deploying?",
      answer: "Use this parser to: 1) Validate syntax is correct (catches typos and invalid values). 2) Read human description to verify schedule matches intent. 3) View next execution times to confirm timing (especially timezone). 4) Test in staging environment before production. 5) For critical jobs, add logging to confirm executions and alert if missed. Parser prevents syntax errors and timezone confusion before deployment."
    },
    {
      question: "Is my cron expression data private?",
      answer: "Yes, all cron parsing happens entirely in your browser using client-side JavaScript. No cron expressions are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your expressions. Safe for parsing confidential job schedules, proprietary task automation, or internal system cron configurations. All parsing is local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All cron expression parsing happens entirely in your browser using client-side JavaScript. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** Cron parsing uses browser-native JavaScript string parsing and date calculation. All computation happens locally on your device.
- **No Server Uploads:** We don't have backend servers to process cron expressions. The tool works completely offline after page load.
- **No Data Storage:** Entered cron expressions and calculated execution times are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what cron expressions you parse, what schedules you validate, or any parsing-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your expression data.

Safe for parsing confidential job schedules, proprietary automation tasks, internal system cron configurations, or production infrastructure scheduling. Use with confidence for sensitive DevOps workflows or critical scheduled jobs.`
  },

  stats: {
    "Parsing Speed": "<1ms",
    "Formats Supported": "5/6/7 field",
    "Validation": "Full",
    "Next Executions": "10 shown",
    "Server Uploads": "0"
  }
};
