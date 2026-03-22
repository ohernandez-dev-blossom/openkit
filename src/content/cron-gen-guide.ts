/**
 * Cron Generator Tool Guide Content
 * Comprehensive developer guide for generating cron expressions
 */

import type { ToolGuideContent } from "./types";

export const cronGenGuideContent: ToolGuideContent = {
  toolName: "Cron Generator",
  toolPath: "/cron-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Schedule Type",
      description: "Choose schedule pattern: every minute/hour/day/week/month, or custom intervals. Interface adapts based on selection, showing relevant time pickers and day selectors. Common patterns have preset templates for quick generation."
    },
    {
      title: "Configure Timing",
      description: "Use dropdowns and inputs to specify exact timing: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (Sunday-Saturday). Support for ranges (Mon-Fri), lists (Mon,Wed,Fri), and step values (every 15 minutes)."
    },
    {
      title: "View Generated Expression",
      description: "See the cron expression automatically generated as you configure: '0 9 * * 1-5' for weekdays at 9 AM. Expression updates in real-time. Shows both cron syntax and human-readable description to verify correctness."
    },
    {
      title: "Copy and Deploy",
      description: "Copy generated expression for use in GitHub Actions, AWS EventBridge, Kubernetes CronJobs, or system crontab. Tool validates expression is syntactically correct before allowing copy. Test in staging before production deployment."
    }
  ],

  introduction: {
    title: "What is Cron Expression Generation?",
    content: `Cron expression generation converts human-friendly schedule selections into Unix cron syntax. Instead of memorizing cron field positions and operator meanings, developers select desired timing through intuitive UI controls, and the tool outputs valid cron expressions ready for deployment.

Software developers need cron expressions for: CI/CD workflow schedules (GitHub Actions, GitLab CI), cloud job schedulers (AWS EventBridge, GCP Cloud Scheduler), Kubernetes CronJobs, database backup automation, log cleanup scripts, monitoring health checks, cache invalidation tasks, scheduled report generation, webhook retry mechanisms, and email campaign delivery.

### Why Cron Generation Matters for Developers

**Reduces syntax errors:** Cron syntax is terse and error-prone. Five fields (minute, hour, day_of_month, month, day_of_week) with special operators (*, -, ,, /) create countless opportunities for mistakes. Example: '0 9 * * 1-5' is weekdays at 9 AM, but '0 9 1-5 * *' is 1st-5th of month at 9 AM - easy to confuse. Generator eliminates syntax memorization and typos.

**Prevents deployment failures:** Invalid cron expressions cause job creation failures or silent job skip. Kubernetes CronJob with malformed cron never executes. AWS EventBridge rejects invalid expressions at deployment. GitHub Actions workflow with bad cron syntax fails validation. Generator validates expressions before deployment, catching errors early.

**Timezone clarity:** Most cloud schedulers use UTC timezone. Generator shows clear timezone labels and conversion helpers. Example: user wants 9 AM EST daily. Generator converts to UTC (14:00 during standard time) and outputs '0 14 * * *'. Prevents timezone confusion that causes jobs to run at wrong hours.

**Complex pattern construction:** Advanced schedules like "Every 15 minutes during business hours on weekdays" require complex cron: '*/15 9-17 * * 1-5'. Building this manually is tedious and error-prone. Generator allows selecting: interval=15 minutes, hours=9-17, days=Mon-Fri, then produces correct expression with validation.

**Learning tool:** Generator shows cron syntax alongside human descriptions, teaching developers cron structure. Adjust schedule options and see how cron fields change in real-time. Understand minute vs hour fields, range operators, step values, and field interactions through interactive exploration.

### Cron Syntax Quick Reference

**5-field format:** \`minute hour day_of_month month day_of_week\`

**Field ranges:**
- Minute: 0-59
- Hour: 0-23 (midnight = 0, noon = 12, 11 PM = 23)
- Day of month: 1-31
- Month: 1-12 (or JAN-DEC abbreviations)
- Day of week: 0-6 (0 = Sunday, 1 = Monday, ..., 6 = Saturday) or SUN-SAT

**Special operators:**
- **Asterisk (*)**: Any value. \`* * * * *\` = every minute
- **Comma (,)**: List of values. \`0,30 * * * *\` = minute 0 and 30 each hour
- **Hyphen (-)**: Range. \`9-17\` = hours 9 through 17 (9 AM to 5 PM)
- **Slash (/)**: Step intervals. \`*/15\` = every 15 units (0, 15, 30, 45)

### Common Schedule Patterns

**Periodic intervals:**
- Every minute: \`* * * * *\`
- Every 5 minutes: \`*/5 * * * *\`
- Every 15 minutes: \`*/15 * * * *\`
- Every 30 minutes: \`*/30 * * * *\` or \`0,30 * * * *\`
- Every hour: \`0 * * * *\`
- Every 2 hours: \`0 */2 * * *\`

**Daily schedules:**
- Daily at midnight: \`0 0 * * *\`
- Daily at 2 AM: \`0 2 * * *\`
- Daily at 9 AM: \`0 9 * * *\`
- Daily at noon: \`0 12 * * *\`
- Daily at 10:30 PM: \`30 22 * * *\`
- Twice daily (9 AM and 5 PM): \`0 9,17 * * *\`

**Weekly schedules:**
- Every Monday at 9 AM: \`0 9 * * 1\`
- Weekdays at 9 AM: \`0 9 * * 1-5\`
- Weekends at noon: \`0 12 * * 0,6\`
- Every Friday at 5 PM: \`0 17 * * 5\`

**Monthly schedules:**
- First of month at midnight: \`0 0 1 * *\`
- 15th of month at 9 AM: \`0 9 15 * *\`
- Last day of month: \`0 0 28-31 * *\` (run daily, check in script if last day)

**Business hour patterns:**
- Every 15 min during business hours (9-5): \`*/15 9-17 * * *\`
- Hourly during business hours weekdays: \`0 9-17 * * 1-5\`
- Every 30 min, weekdays only: \`*/30 * * * 1-5\`

### Platform-Specific Considerations

**GitHub Actions:** Uses UTC timezone. Syntax: \`schedule: [{cron: '0 9 * * *'}]\` in workflow YAML. Runs are not guaranteed exact - may delay up to several minutes under high load.

**AWS EventBridge:** Supports standard 5-field cron plus optional year field (6 fields total). Uses UTC timezone. Expression format: \`cron(minute hour day_of_month month day_of_week year)\` or rate expressions like \`rate(5 minutes)\`.

**Kubernetes CronJobs:** Uses 5-field cron syntax. Timezone determined by cluster configuration (often UTC). Failed jobs can be retried based on restartPolicy. Concurrency policy controls behavior when previous job still running.

**GCP Cloud Scheduler:** Supports standard cron syntax in any timezone. Timezone specified separately from expression. Allows minute-level precision. More flexible timezone handling than AWS or GitHub.

This tool generates valid cron expressions through intuitive UI, validates syntax, shows human-readable descriptions, and provides platform-specific guidance for reliable scheduled job deployment.`
  },

  useCases: [
    {
      title: "Generate GitHub Actions Workflow Schedule",
      description: "Create cron expressions for GitHub Actions scheduled workflows. Tool accounts for UTC timezone requirement and generates validated expressions that trigger CI/CD pipelines at desired times.",
      example: `# Generated cron for GitHub Actions:
# Want: Daily tests at 2 AM EST
# EST to UTC: 2 AM EST = 7 AM UTC (standard time)
# Generator output: '0 7 * * *'

# .github/workflows/nightly-tests.yml
name: Nightly Tests
on:
  schedule:
    # Runs at 2 AM EST (7 AM UTC)
    - cron: '0 7 * * *'
  workflow_dispatch: # Manual trigger

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test

# Generator also creates:
# Weekly on Monday 9 AM: '0 9 * * 1'
# Weekdays at 6 AM: '0 6 * * 1-5'
# Every 6 hours: '0 */6 * * *'`
    },
    {
      title: "Configure AWS EventBridge Scheduled Lambda",
      description: "Generate cron expressions for AWS EventBridge rules that trigger Lambda functions. Tool outputs 6-field format (with year) compatible with AWS syntax and validates expression before deployment.",
      example: `// AWS CDK: Generated cron for Lambda scheduler
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';

// Generator creates: '0 2 * * ? *' for daily 2 AM
// AWS 6-field format: minute hour day month day_of_week year

const backupLambda = new lambda.Function(/*...*/);

// Daily backup at 2 AM UTC
const dailyBackup = new events.Rule(this, 'DailyBackup', {
  schedule: events.Schedule.expression('cron(0 2 * * ? *)'),
});
dailyBackup.addTarget(new targets.LambdaFunction(backupLambda));

// Weekday report at 9 AM: 'cron(0 9 ? * 2-6 *)'
// (AWS uses 1=Sunday, so 2-6 = Mon-Fri)
const weekdayReport = new events.Rule(this, 'WeekdayReport', {
  schedule: events.Schedule.expression('cron(0 9 ? * 2-6 *)'),
});

// Every 15 minutes: 'cron(*/15 * * * ? *)'
const frequentCheck = new events.Rule(this, 'FrequentCheck', {
  schedule: events.Schedule.expression('cron(*/15 * * * ? *)'),
});`
    },
    {
      title: "Build Kubernetes CronJob Schedule",
      description: "Generate cron expressions for Kubernetes CronJob resources that run containers on schedule. Tool validates 5-field format, checks syntax, and provides human-readable schedule description for k8s manifests.",
      example: `# Generated cron for Kubernetes CronJob:
# Database backup - Daily at 2 AM cluster time
# Generator output: '0 2 * * *'

apiVersion: batch/v1
kind: CronJob
metadata:
  name: database-backup
  namespace: production
spec:
  # Generated expression: Daily at 02:00
  schedule: "0 2 * * *"

  # Timezone (k8s 1.25+)
  timeZone: "UTC"

  # Keep last 3 successful, 1 failed job
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1

  # Don't start new job if previous still running
  concurrencyPolicy: Forbid

  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:15
            command:
            - /bin/sh
            - -c
            - pg_dump $DATABASE_URL > /backup/dump.sql
          restartPolicy: OnFailure

# Other generated schedules:
# Cleanup old logs - Sunday midnight: '0 0 * * 0'
# Health check every 5 min: '*/5 * * * *'
# Weekday morning sync: '0 6 * * 1-5'`
    },
    {
      title: "Create System Crontab Entry",
      description: "Generate cron expressions for Unix/Linux system crontab files. Tool outputs standard 5-field format compatible with all cron implementations, validates syntax, and provides documentation comments for crontab entries.",
      example: `# Generated crontab entries:
# Edit with: crontab -e

# Backup database - Daily at 2 AM
# Generated: '0 2 * * *'
0 2 * * * /usr/local/bin/backup-db.sh >> /var/log/backup.log 2>&1

# Cleanup temp files - Every Sunday midnight
# Generated: '0 0 * * 0'
0 0 * * 0 find /tmp -type f -mtime +7 -delete

# Check disk space - Every 6 hours
# Generated: '0 */6 * * *'
0 */6 * * * /usr/local/bin/check-disk.sh

# Rotate logs - Daily at 1 AM
# Generated: '0 1 * * *'
0 1 * * * /usr/sbin/logrotate /etc/logrotate.conf

# Send reports - Weekdays at 9 AM
# Generated: '0 9 * * 1-5'
0 9 * * 1-5 /usr/local/bin/send-reports.sh

# Monitor service - Every 5 minutes
# Generated: '*/5 * * * *'
*/5 * * * * /usr/local/bin/check-service.sh || /usr/local/bin/restart-service.sh

# View current crontab: crontab -l
# Remove crontab: crontab -r`
    }
  ],

  howToUse: {
    title: "How to Use This Cron Generator",
    content: `This tool generates valid cron expressions through intuitive UI controls. Select schedule pattern, configure timing, view generated expression with human description, and copy for deployment.

### Selecting Schedule Patterns

**Quick presets:** Choose common patterns from dropdown:
- Every minute / 5 / 15 / 30 minutes
- Every hour / 2 / 6 / 12 hours
- Daily at specific time
- Weekly on specific day
- Monthly on specific date
- Custom (full control)

Presets automatically fill appropriate fields. Custom mode unlocks all timing controls for advanced schedules.

### Configuring Timing Options

**Minute field (0-59):**
- Specific minute: Select exact minute (0-59)
- Every minute: Asterisk (*) - runs every minute
- Interval: Every N minutes (*/5 for every 5 min)
- List: Multiple specific minutes (0,15,30,45)
- Range: Span of minutes (0-30)

**Hour field (0-23):**
- Specific hour: 24-hour format (0=midnight, 12=noon, 23=11 PM)
- Every hour: Asterisk (*) - runs every hour
- Interval: Every N hours (*/2 for every 2 hours)
- Range: Business hours (9-17 for 9 AM to 5 PM)
- List: Multiple times (9,12,17 for 9 AM, noon, 5 PM)

**Day of month (1-31):**
- Specific day: 1-31 for day of month
- Every day: Asterisk (*) - runs every day
- Range: 1-15 for first half of month
- List: Specific dates (1,15 for 1st and 15th)

**Month (1-12):**
- Specific month: 1=Jan, 12=Dec
- Every month: Asterisk (*) - runs every month
- Range: 6-8 for June-August
- List: Specific months (1,4,7,10 for quarterly)
- Names: JAN, FEB, etc. (tool converts to numbers)

**Day of week (0-6):**
- Specific day: 0=Sunday, 1=Monday, ..., 6=Saturday
- Every day: Asterisk (*) - runs every day of week
- Range: 1-5 for Monday-Friday (weekdays)
- List: Specific days (1,3,5 for Mon/Wed/Fri)
- Names: SUN, MON, etc. (tool converts to numbers)

### Understanding Generated Output

**Cron expression:** Five space-separated fields in format: \`minute hour day_of_month month day_of_week\`. Example: \`0 9 * * 1-5\`

**Human description:** Plain English explanation. Example: "At 09:00, Monday through Friday"

**Next executions:** Shows next 5 upcoming run times based on current date/time. Verifies schedule timing matches intent.

**Validation status:** Green checkmark if expression is valid, red error if syntax problem detected.

### Platform-Specific Notes

**GitHub Actions:** Uses UTC timezone. Add timezone note to workflow comments. Paste expression into \`schedule: [{cron: '...'}]\` array.

**AWS EventBridge:** May need 6-field format with question marks: \`0 9 ? * 2 *\` (question mark for unused day field). Tool provides AWS-compatible format option.

**Kubernetes:** Uses 5-field standard format. Set \`timeZone\` field separately if needed (k8s 1.25+). Consider concurrency policy for long-running jobs.

**System crontab:** Standard 5-field format. Add user field after schedule if editing /etc/crontab (root crontab doesn't need user field).

### Testing Generated Expressions

1. Copy generated expression
2. Use cron parser tool to verify interpretation
3. Check next execution times match expectations
4. Test in staging/development environment first
5. Monitor first few executions in production
6. Set up alerting for missed or failed runs

### Common Pitfalls to Avoid

**Timezone confusion:** Default is usually UTC for cloud platforms. Convert local time to UTC: 9 AM EST = 14:00 UTC (standard time) or 13:00 UTC (daylight saving).

**Day field conflict:** Specifying both day_of_month and day_of_week creates OR logic in most implementations. Use asterisk (*) for whichever you don't need.

**Step values don't offset:** \`*/15\` runs at :00, :15, :30, :45 - not "every 15 minutes starting now". Aligns to clock boundaries.

**Hour confusion:** Use 24-hour format. 2 PM = hour 14, not hour 2. Midnight = hour 0, not 24.`,
    steps: [
      {
        name: "Select Schedule Type",
        text: "Choose pattern from presets (every minute/hour/day/week) or select custom for full control. Presets auto-configure common schedules."
      },
      {
        name: "Configure Timing",
        text: "Use dropdowns and inputs to set exact timing: minutes, hours, days, months. Support for ranges (1-5), lists (1,3,5), and intervals (*/15)."
      },
      {
        name: "Review Generated Expression",
        text: "See cron expression update in real-time as you configure. Verify human-readable description matches intent. Check next execution times."
      },
      {
        name: "Copy for Deployment",
        text: "Copy validated expression to use in GitHub Actions, AWS EventBridge, Kubernetes, or system crontab. Test in staging before production."
      }
    ]
  },

  faqs: [
    {
      question: "How do I generate a cron expression for weekdays at 9 AM?",
      answer: "Set minute=0, hour=9, day_of_month=*, month=*, day_of_week=1-5 (Monday-Friday). Generator outputs: '0 9 * * 1-5'. Human description: 'At 09:00, Monday through Friday'. This runs every weekday at 9 AM. Make sure to account for timezone if deploying to cloud schedulers (most use UTC)."
    },
    {
      question: "What timezone does the generated cron expression use?",
      answer: "Cron expressions don't specify timezone - timezone is determined by the system running the job. GitHub Actions and AWS EventBridge use UTC. Kubernetes uses cluster timezone (configurable). System crontab uses server local time. Always verify target platform's timezone and convert your desired local time to that timezone when configuring the generator."
    },
    {
      question: "How do I create a schedule for every 15 minutes during business hours?",
      answer: "Set minute=*/15 (every 15 minutes), hour=9-17 (9 AM to 5 PM), day_of_month=*, month=*, day_of_week=* (or 1-5 for weekdays only). Generator outputs: '*/15 9-17 * * *' for every day, or '*/15 9-17 * * 1-5' for weekdays only. Runs at :00, :15, :30, :45 each hour from 9 AM to 5 PM."
    },
    {
      question: "Can I generate expressions for the last day of the month?",
      answer: "Standard cron syntax doesn't support 'last day' directly. Workaround: Generate '0 0 28-31 * *' (runs 28th-31st), then add logic in your script to check if current day equals last day of month. Some advanced implementations (Quartz, AWS) support 'L' character for last day, but standard Unix cron does not. Generator focuses on standard syntax for maximum compatibility."
    },
    {
      question: "Why does my generated expression not run as expected?",
      answer: "Common issues: 1) Timezone mismatch - generated for local time but platform uses UTC. 2) Day field conflict - specified both day_of_month and day_of_week (uses OR logic). 3) Invalid field ranges for your platform (some limits differ). 4) Platform-specific syntax requirements (AWS needs '?' in some fields). Use next execution times preview to verify timing, and test in staging first."
    },
    {
      question: "How do I convert generated expressions between platforms?",
      answer: "Standard 5-field cron works on: GitHub Actions, Kubernetes, Linux crontab. AWS EventBridge uses 6-field format with optional '?' for unused day fields: convert '0 9 * * 1' to 'cron(0 9 ? * 2 *)' (AWS uses 1=Sunday). GCP Cloud Scheduler accepts standard 5-field. Tool provides platform toggle to generate compatible format for your target system."
    },
    {
      question: "Can I generate expressions that run every X seconds?",
      answer: "Standard 5-field cron has minute-level precision (fastest is every minute: '* * * * *'). Some implementations support 6-field format with seconds: '*/30 * * * * *' for every 30 seconds. This works in Quartz scheduler and some frameworks. For sub-minute scheduling in systems without second support, use alternative: run job every minute, check elapsed seconds in script, use delays."
    },
    {
      question: "How do I test generated cron expressions before deploying?",
      answer: "Steps: 1) Review human-readable description - verify it matches intent. 2) Check next execution times - confirm timing and frequency. 3) Use cron parser tool to validate syntax. 4) Test in development environment with logs. 5) Deploy to staging with monitoring. 6) Verify first few production runs. Set up alerting for missed executions."
    },
    {
      question: "What's the difference between '0 9 * * 1' and '0 9 1 * *'?",
      answer: "Field position matters critically. '0 9 * * 1' = minute 0, hour 9, any day_of_month, any month, Monday = 9 AM every Monday. '0 9 1 * *' = minute 0, hour 9, 1st day_of_month, any month, any day_of_week = 9 AM on 1st of every month. Generator's visual layout prevents position confusion by labeling each field clearly."
    },
    {
      question: "Is the generated cron expression data private?",
      answer: "Yes, all cron generation happens entirely in your browser using client-side JavaScript. No generated expressions are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your schedule data. Safe for generating confidential job schedules, proprietary automation timing, or production infrastructure cron expressions. All generation is local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All cron expression generation happens entirely in your browser using client-side JavaScript. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Generation:** Cron expressions are generated using browser-native JavaScript string formatting. All computation happens locally on your device.
- **No Server Uploads:** We don't have backend servers to process schedules. The tool works completely offline after page load.
- **No Data Storage:** Generated expressions and schedule configurations are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what schedules you generate, what timing you configure, or any generation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your schedule data.

Safe for generating confidential job schedules, proprietary automation timing, production infrastructure cron expressions, or internal system task scheduling. Use with confidence for sensitive DevOps workflows or critical business automation.`
  },

  stats: {
    "Generation Speed": "Instant",
    "Validation": "Real-time",
    "Formats": "5/6 field",
    "Next Executions": "5 shown",
    "Server Uploads": "0"
  }
};
