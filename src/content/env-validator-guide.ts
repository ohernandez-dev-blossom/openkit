/**
 * Env Validator Tool Guide Content
 */

import type { ToolGuideContent } from "./types";

export const envValidatorGuideContent: ToolGuideContent = {
  toolName: "Env Validator",
  toolPath: "/env-validator",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your .env File",
      description: "Paste the contents of your .env file into the text area. The validator parses it immediately and highlights errors, warnings, and info messages per line."
    },
    {
      title: "Review Issues",
      description: "Check the Validation Results card for errors (missing '=', invalid key names), warnings (empty values, duplicates, unquoted spaces), and info (variable references)."
    },
    {
      title: "Compare with Template",
      description: "Click 'Compare with Template' to paste your .env.example alongside your actual .env. The tool highlights missing variables and extra variables not in the template."
    },
    {
      title: "Export in Any Format",
      description: "Switch between .env, JSON, YAML, and docker-compose export formats. Copy the output with one click and paste it wherever you need."
    }
  ],

  introduction: {
    title: "What Are .env Files?",
    content: `.env files store environment variables as KEY=VALUE pairs. They are used by virtually every modern framework — Node.js (dotenv), Python (python-dotenv), Ruby (dotenv), Go (godotenv), Laravel, Rails, Next.js, and Docker.

### Why Validate .env Files?

Environment variables configure databases, API keys, feature flags, and secrets. A missing variable can crash your app on deploy. A duplicate key silently overrides a previous value. An unquoted value with spaces may be truncated by some parsers. These bugs are hard to debug because they only manifest at runtime.

### Common .env Issues

- **Missing values:** KEY= with no value can cause unexpected empty strings
- **Duplicate keys:** The last occurrence wins, silently overriding earlier values
- **Unquoted spaces:** MY_VAR=hello world may be parsed as just "hello" by some tools
- **Invalid key names:** Keys with spaces, hyphens, or starting with numbers are invalid
- **Variable interpolation:** \${OTHER_VAR} syntax isn't supported by all parsers

### .env.example as a Contract

Best practice: commit a .env.example to your repo with all required keys (empty values) and .gitignore the actual .env. New developers copy .env.example to .env and fill in their values. This tool's comparison feature automates checking that your .env matches the template.`
  },

  useCases: [
    {
      title: "CI/CD Pipeline Validation",
      description: "Before deploying, validate that all required environment variables are set and properly formatted. Catch missing API keys or database URLs before they cause runtime errors.",
      example: "Compare .env.example (committed) vs CI environment to find missing vars"
    },
    {
      title: "Onboarding New Developers",
      description: "New team members copy .env.example to .env and fill in values. Use the comparison feature to verify they haven't missed any required variables before running the project.",
      example: "Template has 20 vars, dev's .env has 18 → 2 missing highlighted"
    },
    {
      title: "Docker Environment Setup",
      description: "Export your .env to docker-compose format for container orchestration. Validate that all variables are present before building images that depend on build-time env vars.",
      example: "Export .env → docker-compose environment section, ready to paste"
    },
    {
      title: "Config Format Migration",
      description: "Convert .env files to JSON for Node.js config, YAML for Kubernetes ConfigMaps, or docker-compose format. One-click export to any format.",
      example: ".env → JSON for config.json or YAML for k8s ConfigMap"
    }
  ],

  howToUse: {
    title: "How to Use This Env Validator",
    content: `Paste your .env file contents to instantly validate format, detect issues, compare against templates, and export to other formats.

### Validation Rules

The validator checks for:
- **Errors:** Missing = separator, invalid key names (must be [A-Za-z_][A-Za-z0-9_]*)
- **Warnings:** Empty values, duplicate keys, unquoted values containing spaces
- **Info:** Variable references ($VAR or \${VAR}) that may need shell expansion

### Template Comparison

Click "Compare with Template" to enter your .env.example alongside your actual .env. The tool highlights:
- **Missing:** Variables in the template but not in your .env (you need to add these)
- **Extra:** Variables in your .env but not in the template (may be unused or newly added)

### Export Formats

- **.env:** Standard dotenv format (cleaned, one KEY=VALUE per line)
- **JSON:** Object with key-value pairs, perfect for config.json files
- **YAML:** YAML mapping, suitable for Kubernetes ConfigMaps or Ansible vars
- **Docker Compose:** Ready-to-paste environment section for docker-compose.yml`,
    steps: [
      { name: "Paste .env Content", text: "Paste your .env file into the text area. Validation happens immediately." },
      { name: "Review Issues", text: "Check errors, warnings, and info messages. Fix issues in your source .env file." },
      { name: "Compare Templates", text: "Optionally compare against .env.example to find missing or extra variables." },
      { name: "Export", text: "Choose a format (JSON, YAML, Docker, .env) and copy the output." }
    ]
  },

  faqs: [
    {
      question: "Does this tool send my .env secrets to any server?",
      answer: "No. All parsing, validation, and export happens entirely in your browser. No data is transmitted. The tool works offline after the initial page load. Your API keys, passwords, and secrets never leave your device."
    },
    {
      question: "What .env format does this tool support?",
      answer: "Standard dotenv format: KEY=VALUE, one per line. Comments (#), empty lines, single-quoted and double-quoted values are all supported. Variable interpolation syntax (${VAR}) is detected but not expanded."
    },
    {
      question: "Why is my duplicate key a warning and not an error?",
      answer: "Duplicate keys are technically valid in .env files — most parsers accept them and use the last occurrence. However, they're almost always unintentional and can cause subtle bugs, so they're flagged as warnings."
    },
    {
      question: "Can I validate that specific values match a pattern?",
      answer: "Currently the validator checks format and structure (key names, quoting, duplicates). Pattern-based value validation (e.g. URLs, ports, emails) is planned for a future version."
    },
    {
      question: "How does the docker-compose export work?",
      answer: "It generates a docker-compose.yml environment section with proper formatting. Values with spaces or special characters are automatically quoted. You can paste it directly into your docker-compose.yml under a service's environment key."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `.env files often contain secrets — API keys, database passwords, OAuth tokens. This tool is designed with that sensitivity in mind.

- **100% client-side:** All processing happens in your browser. Zero network requests with your data.
- **No storage:** Nothing is saved, cached, or persisted. Refresh the page to clear everything.
- **No analytics on content:** We track tool usage (page views) but never log, inspect, or transmit the content you paste.
- **Offline capable:** After loading, the tool works without an internet connection.
- **Transparent & auditable:** Inspect the code in your browser DevTools Network tab — zero data exfiltration.

Safe for validating production secrets, API keys, database credentials, and any sensitive configuration.`
  },

  stats: {
    "Export Formats": "4",
    "Validation Rules": "6",
    "Processing": "Client-side",
    "Speed": "<1ms"
  }
};
