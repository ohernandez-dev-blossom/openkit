/**
 * Emoji Picker Tool Guide Content
 * Comprehensive developer guide for emoji selection and usage
 */

import type { ToolGuideContent } from "./types";

export const emojiGuideContent: ToolGuideContent = {
  toolName: "Emoji Picker",
  toolPath: "/emoji",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Browse Emoji Categories",
      description: "Navigate through organized categories: Smileys & Emotion, People & Body, Animals & Nature, Food & Drink, Travel & Places, Activities, Objects, Symbols, Flags. Categories follow Unicode standard emoji grouping for intuitive browsing."
    },
    {
      title: "Search by Name or Keyword",
      description: "Type keywords to instantly filter emojis: 'happy' shows 😊😃😄, 'heart' shows ❤️💙💚, 'code' shows 💻⌨️🖥️. Search supports aliases and common names. Faster than scrolling through hundreds of emojis."
    },
    {
      title: "Click to Copy Emoji",
      description: "Single click copies emoji to clipboard. No need to select or right-click. Instant feedback confirms copy success. Paste directly into messages, code comments, commit messages, documentation, or social media posts."
    },
    {
      title: "View Unicode Details",
      description: "See emoji Unicode codepoint (U+1F600), HTML entity (&#128512;), and CSS code (\\1F600). Essential for developers implementing emoji support, rendering logic, or cross-platform compatibility."
    }
  ],

  introduction: {
    title: "What is Emoji Selection?",
    content: `Emoji selection provides quick access to Unicode emoji characters for use in text content, user interfaces, documentation, and communications. Emojis are standardized pictographs included in the Unicode character set, supported across modern operating systems, browsers, and applications.

Software developers encounter emojis when building: chat applications with emoji pickers, social media platforms with reactions, documentation sites with visual indicators (✅ success, ⚠️ warning, ❌ error), commit message conventions (🐛 fix, ✨ feature, 📝 docs), terminal CLIs with visual feedback, notification systems with icon indicators, and accessibility-friendly UI labels.

### Why Emoji Tools Matter for Developers

**UI/UX enhancement:** Emojis improve visual communication in interfaces. Example: success button with ✅, delete with 🗑️, settings with ⚙️, search with 🔍. Icon-like emojis reduce need for custom SVG icons. One Unicode character (zero bytes in text) vs multi-KB image file. Faster load times, no HTTP requests, scales perfectly (vector-like), and works in any text context.

**Git commit conventions:** Many teams use emoji prefixes in commit messages for visual categorization. Convention examples: ✨ new feature, 🐛 bug fix, 📝 documentation, ♻️ refactor, 🎨 style changes, ⚡ performance, 🔧 configuration, 🚀 deployment. Tools like gitmoji standardize this practice. Quick visual scanning of git log becomes easier with emoji indicators.

**Documentation and README files:** GitHub, GitLab, Bitbucket all render emojis in markdown. Add visual structure to docs: ⚠️ warnings, 💡 tips, 🚀 quick start, 📚 resources, ✅ requirements, ❌ breaking changes. Emojis make long README files scannable. Example: "✨ Features", "🐛 Known Issues", "🤝 Contributing".

**Error messages and logs:** Terminal output benefits from emoji indicators. ✅ Tests passed (green text + emoji), ❌ Tests failed (red + emoji), ⚠️ Warnings (yellow + emoji), ℹ️ Info messages. Quick visual feedback when scanning build logs. Webpack, Jest, and many CLI tools use emojis in output.

**Accessibility considerations:** Screen readers announce emojis by their Unicode name. ❤️ reads as "red heart". Overuse can clutter audio navigation. Best practices: use emojis as enhancement, not core content. Provide text alternatives for critical information. Don't use emoji as only indicator (combine with text or aria-label). Test with screen readers before deploying emoji-heavy UIs.

**Cross-platform rendering:** Emojis render differently across platforms. 😀 looks different on iOS vs Android vs Windows vs Mac. Color vs monochrome varies. Some emojis don't exist on older platforms (Unicode versions add new emojis yearly). Consider: minimum supported platform, fallback for missing emojis, testing on multiple devices, avoiding brand-new emojis (low support), and using established emojis for critical UI.

### Emoji Unicode Structure

**Basic emoji:** Single codepoint. Example: 😀 = U+1F600. Represented as one Unicode character. Simple to handle in code: one character length, straightforward rendering, no special processing.

**Emoji with skin tone modifiers:** Base emoji + modifier. Example: 👋 (U+1F44B) + 🏽 (U+1F3FD) = 👋🏽. Two codepoints, but renders as one visual character. String length = 2 in most languages, but visually one emoji. Impacts: character counting, text truncation, validation logic.

**Multi-person emojis:** Combine multiple emojis with zero-width joiner (ZWJ). Example: 👨‍👩‍👧 (family) = man + ZWJ + woman + ZWJ + girl. Multiple codepoints, one visual. Complex string length calculations needed.

**Flag emojis:** Two regional indicator symbols. Example: 🇺🇸 (US flag) = U+1F1FA + U+1F1F8 (U + S). String length = 2, visual = 1 flag. Each country code mapped to flag via Unicode regional indicators.

**Emoji sequences:** Zero-width joiner (ZWJ) sequences create new emojis from existing ones. Professional emojis: 👨‍💻 (man technologist) = man + ZWJ + laptop. Couples: 👫 vs 👩‍❤️‍👨 (more specific). Families: various combinations of people.

### Emoji in Code

**JavaScript string length issues:**
\`\`\`javascript
"😀".length // 2 (UTF-16 surrogate pair)
[..."😀"].length // 1 (correct with spread operator)
"👨‍👩‍👧".length // 8 (complex emoji sequence)
[..."👨‍👩‍👧"].length // 5 (still multiple codepoints)
\`\`\`

Use proper Unicode libraries for accurate emoji counting: \`grapheme-splitter\` npm package.

**HTML usage:**
\`\`\`html
<!-- Direct emoji -->
<p>Hello 👋</p>

<!-- HTML entity -->
<p>Hello &#128075;</p>

<!-- Unicode escape -->
<p>Hello \\u{1F44B}</p>
\`\`\`

**CSS usage:**
\`\`\`css
.icon::before {
  content: "\\1F44B"; /* Wave emoji */
}
\`\`\`

**Database storage:** Emoji require UTF-8 (mb4 in MySQL) or UTF-16 encoding. MySQL utf8 charset (3 bytes max) can't store 4-byte emojis. Use utf8mb4 charset. Check database configuration before storing user-generated emoji content.

### Common Use Cases

**Chat and messaging:** Emoji pickers in text input fields. Users click emoji, inserts into text. React components: emoji-mart, emoji-picker-react.

**Reactions:** Like buttons with emoji reactions (❤️👍😂). Facebook/Slack style. Store emoji Unicode in database, render in UI.

**Status indicators:** Online/offline status (🟢🔴), notification badges (🔔), alert levels (🚨⚠️ℹ️).

**Categorization:** Tags with emoji labels (🐛 bug, ✨ feature), project icons, folder icons (📁📂).

**Terminal CLIs:** Build tools output (✅ success, ❌ fail, ⏳ building), progress indicators, styled help text.

This tool provides instant access to all standard emojis with search, categories, and copy functionality for efficient emoji selection in development workflows.`
  },

  useCases: [
    {
      title: "Build Emoji Reaction System",
      description: "Implement emoji reactions for posts, comments, or messages. Users click emoji to react, system stores emoji Unicode, displays reaction counts. Similar to Slack or GitHub reactions.",
      example: `// Emoji reaction component:
interface Reaction {
  emoji: string; // Unicode emoji
  count: number;
  users: string[]; // User IDs who reacted
}

interface Post {
  id: string;
  content: string;
  reactions: Reaction[];
}

function addReaction(
  post: Post,
  emoji: string,
  userId: string
): Post {
  const existingReaction = post.reactions.find(r => r.emoji === emoji);

  if (existingReaction) {
    // User already reacted with this emoji?
    if (existingReaction.users.includes(userId)) {
      // Remove reaction (toggle off)
      existingReaction.users = existingReaction.users.filter(
        id => id !== userId
      );
      existingReaction.count--;

      // Remove reaction if count = 0
      if (existingReaction.count === 0) {
        post.reactions = post.reactions.filter(r => r.emoji !== emoji);
      }
    } else {
      // Add user to existing reaction
      existingReaction.users.push(userId);
      existingReaction.count++;
    }
  } else {
    // New reaction
    post.reactions.push({
      emoji,
      count: 1,
      users: [userId]
    });
  }

  return post;
}

// UI component:
function ReactionPicker({ onSelect }: { onSelect: (emoji: string) => void }) {
  const commonReactions = ['❤️', '👍', '😂', '🎉', '😮', '👏'];

  return (
    <div className="reaction-picker">
      {commonReactions.map(emoji => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="emoji-btn"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}`
    },
    {
      title: "Add Emoji to Git Commit Messages",
      description: "Use emojis in commit messages following gitmoji convention for visual categorization. Instantly identify commit types in git log: features, fixes, docs, refactors. Improves repository navigation and changelog generation.",
      example: `# Gitmoji commit message convention:

# ✨ New feature
git commit -m "✨ Add user authentication with JWT"

# 🐛 Bug fix
git commit -m "🐛 Fix memory leak in WebSocket connection"

# 📝 Documentation
git commit -m "📝 Update API documentation for v2.0"

# ♻️ Refactor
git commit -m "♻️ Refactor database query layer"

# 🎨 UI/Style
git commit -m "🎨 Improve button hover states"

# ⚡ Performance
git commit -m "⚡ Optimize image lazy loading"

# 🔧 Configuration
git commit -m "🔧 Update ESLint rules"

# 🚀 Deployment
git commit -m "🚀 Deploy v2.1.0 to production"

# 🧪 Tests
git commit -m "🧪 Add integration tests for payment flow"

# Git log output becomes visually scannable:
# ✨ Add user authentication
# 🐛 Fix memory leak
# 📝 Update API docs
# ⚡ Optimize images
# 🚀 Deploy v2.1.0

# Tools that parse gitmoji:
# - changelog generators
# - commit message validation
# - release note automation`
    },
    {
      title: "Create Visual Documentation with Emojis",
      description: "Enhance README files and documentation with emoji indicators for quick visual scanning. Sections become easier to navigate. GitHub, GitLab, and Notion all render emojis in markdown.",
      example: `# Project README with Emojis

## ✨ Features
- 🔐 Secure authentication with JWT
- ⚡ Lightning-fast performance
- 🎨 Beautiful, responsive UI
- 🌍 Multi-language support

## 🚀 Quick Start

### Prerequisites
✅ Node.js 18+
✅ PostgreSQL 14+
✅ Redis 7+

### Installation
\\\`\\\`\\\`bash
npm install
npm run dev
\\\`\\\`\\\`

## 📚 Documentation
📖 [API Reference](./docs/api.md)
🔧 [Configuration Guide](./docs/config.md)
🐳 [Docker Setup](./docs/docker.md)

## ⚠️ Known Issues
🐛 CORS errors on Safari (tracked in #123)
⚠️ IE11 not supported

## 🤝 Contributing
💡 Feature requests welcome!
🐛 Bug reports appreciated
🔀 Pull requests accepted

## 📄 License
MIT © 2026

# Emojis make long docs more scannable:
# Users quickly find sections visually
# Headers stand out in table of contents
# Status indicators (✅❌⚠️) show at a glance`
    },
    {
      title: "Build Terminal CLI with Emoji Output",
      description: "Add emoji indicators to CLI tool output for visual feedback. Build tools, test runners, and deployment scripts benefit from emoji status indicators. Users quickly identify success, errors, and warnings in terminal logs.",
      example: `// CLI with emoji output:
import chalk from 'chalk';

class BuildLogger {
  success(message: string) {
    console.log(chalk.green('✅', message));
  }

  error(message: string) {
    console.log(chalk.red('❌', message));
  }

  warn(message: string) {
    console.log(chalk.yellow('⚠️', message));
  }

  info(message: string) {
    console.log(chalk.blue('ℹ️', message));
  }

  loading(message: string) {
    console.log('⏳', message);
  }

  rocket(message: string) {
    console.log(chalk.magenta('🚀', message));
  }
}

// Usage in build script:
const logger = new BuildLogger();

logger.loading('Building application...');
// ⏳ Building application...

logger.success('TypeScript compilation completed');
// ✅ TypeScript compilation completed

logger.warn('Large bundle size detected');
// ⚠️ Large bundle size detected

logger.error('Test suite failed');
// ❌ Test suite failed

logger.rocket('Deployment successful!');
// 🚀 Deployment successful!

// Output is visually scannable:
// Green checks = success
// Red X = errors
// Yellow warnings = needs attention
// Blue info = informational
// Quick glance shows build status`
    }
  ],

  howToUse: {
    title: "How to Use This Emoji Picker",
    content: `This tool provides instant access to all standard emojis with search, categories, and one-click copy functionality. Browse visually or search by name for quick emoji selection.

### Browsing by Category

Emojis are organized into Unicode-standard categories:
- **Smileys & Emotion:** 😀😁😂🤣😊😍🥰😘 (faces, hearts, expressions)
- **People & Body:** 👋🤚👍👎✊🙏💪🦵👀 (hands, body parts, gestures)
- **Animals & Nature:** 🐶🐱🐭🐰🦊🌳🌻🌈 (animals, plants, weather)
- **Food & Drink:** 🍕🍔🍟🌮🍦🍰☕🍷 (food, beverages, utensils)
- **Travel & Places:** 🚗✈️🚂🏠🏢🗽🌍🏖️ (vehicles, buildings, locations)
- **Activities:** ⚽🏀🎮🎸🎨🎭🎪🎯 (sports, hobbies, entertainment)
- **Objects:** 💻📱⌨️🖥️📷💡🔧⚙️ (devices, tools, everyday items)
- **Symbols:** ❤️💙💚✅❌⚠️🔔🔍 (hearts, arrows, symbols, icons)
- **Flags:** 🇺🇸🇬🇧🇨🇦🇯🇵🇩🇪🇫🇷🇪🇸🇮🇹 (country and regional flags)

Click category tabs to filter emojis. Useful for browsing when you're not sure which emoji you need.

### Searching for Emojis

Type keywords to instantly filter:
- **Emotions:** "happy" → 😊😃😄, "sad" → 😢😭😞, "love" → ❤️😍🥰
- **Actions:** "wave" → 👋, "clap" → 👏, "thumbs up" → 👍
- **Objects:** "code" → 💻⌨️🖥️, "phone" → 📱☎️, "email" → 📧✉️
- **Symbols:** "check" → ✅✔️, "warning" → ⚠️, "star" → ⭐✨
- **Colors:** "red heart" → ❤️, "blue heart" → 💙, "green heart" → 💚

Search supports common aliases and multiple names per emoji. Faster than scrolling through hundreds of options.

### Copying Emojis

**Single click copies:** Click any emoji to copy to clipboard. No need to select, right-click, or press Ctrl+C. Instant feedback confirms copy success.

**Paste anywhere:** After copying, paste (Ctrl+V / Cmd+V) into:
- Code editors (VS Code, Sublime)
- Git commit messages
- Markdown documentation
- Chat applications (Slack, Discord)
- Social media posts
- Email clients
- Any text field

**Multiple emojis:** Copy multiple emojis by clicking them sequentially. Each click copies that emoji. Paste after each copy, or use a text editor to collect multiple emojis.

### Understanding Unicode Details

Hover or click emoji for technical details:

**Unicode codepoint:** U+1F600 - official Unicode identifier. Use in documentation or Unicode discussions.

**HTML entity:** &#128512; - insert emoji in HTML without UTF-8. Useful for HTML emails or legacy systems.

**CSS content:** \\1F600 - use in CSS pseudo-elements (\`::before\` or \`::after\`). Example: \`.icon::before { content: "\\1F600"; }\`

**Character name:** "Grinning Face" - official Unicode name. Screen readers announce this name for accessibility.

### Developer-Specific Tips

**Git commits:** Use conventional emoji prefixes (gitmoji). Pick from: ✨ (feature), 🐛 (fix), 📝 (docs), ♻️ (refactor), ⚡ (performance).

**Documentation:** Structure README sections with emojis: ✨ Features, 🚀 Quick Start, 📚 Documentation, ⚠️ Known Issues, 🤝 Contributing.

**Terminal output:** Add emoji indicators to CLI tools: ✅ success, ❌ error, ⚠️ warning, ℹ️ info, ⏳ loading.

**Status indicators:** Use emoji in UI for quick status recognition: 🟢 online, 🔴 offline, 🟡 away, ⚪ unknown.

### Accessibility Considerations

**Screen reader support:** Screen readers announce emoji by Unicode name. "❤️" reads as "red heart". Don't overuse in critical content.

**Text alternatives:** Provide text labels alongside emojis for important UI elements. Example: button with ✅ should also have "Confirm" text or aria-label.

**Color blind users:** Don't rely solely on emoji color (🟢🔴🟡 for status). Combine with text or shape. Red/green might be indistinguishable.

**Testing:** Test emoji rendering on target platforms. Emojis look different on iOS vs Android vs Windows. Some emojis don't exist on older platforms.`,
    steps: [
      {
        name: "Browse or Search",
        text: "Navigate categories for visual browsing or use search box with keywords. Search supports common names and aliases for quick filtering."
      },
      {
        name: "Click to Copy",
        text: "Single click any emoji to copy to clipboard. Instant feedback confirms copy success. No need to manually select or right-click."
      },
      {
        name: "Paste Anywhere",
        text: "Paste copied emoji (Ctrl+V / Cmd+V) into code editors, commit messages, documentation, chats, or any text field."
      },
      {
        name: "View Unicode Details",
        text: "Hover or click emoji for technical info: Unicode codepoint, HTML entity, CSS code, and character name. Useful for development."
      }
    ]
  },

  faqs: [
    {
      question: "Why do emojis look different on different devices?",
      answer: "Each platform (iOS, Android, Windows, Mac) has its own emoji font design. 😀 looks different across platforms but represents same Unicode character (U+1F600). Color schemes, artistic style, and level of detail vary. Some platforms use photorealistic style, others flat design. Always test emojis on target platforms, especially for branding or critical UI elements."
    },
    {
      question: "How do I use emojis in git commit messages?",
      answer: "Many teams use gitmoji convention: emoji prefixes for commit categorization. Common examples: ✨ new feature, 🐛 bug fix, 📝 documentation, ♻️ refactor, ⚡ performance improvement, 🔧 configuration changes. Improves git log visual scanning. Tools like changelog generators can parse emoji commits to auto-categorize release notes."
    },
    {
      question: "Can I use emojis in code variable names?",
      answer: "Technically yes - many languages support Unicode identifiers. But strongly discouraged. Emojis in variable names cause: keyboard input difficulties, code review confusion, search/replace problems, syntax highlighting issues, and team disagreements. Use emojis in strings, comments, and output - not identifiers. Stick to ASCII for code structure."
    },
    {
      question: "How do I count emoji characters correctly in JavaScript?",
      answer: "JavaScript string.length counts UTF-16 code units, not characters. '😀'.length = 2 (surrogate pair). Use spread operator for accurate count: [...'😀'].length = 1. For complex emojis (skin tones, ZWJ sequences), use grapheme-splitter library. Example: '👨‍👩‍👧'.length = 8, but [...'👨‍👩‍👧'].length = 5, actual graphemes = 1. Matters for text validation, truncation, and character limits."
    },
    {
      question: "Why do some emojis not display on my system?",
      answer: "Emojis are added to Unicode yearly. New emojis require OS/font updates. If emoji shows as empty box or question mark, your system doesn't support it yet. Solutions: update OS, test on latest devices, avoid brand-new emojis in production (wait 1-2 years for wider support), provide fallback text, or use emoji fonts as web fonts (Twemoji by Twitter)."
    },
    {
      question: "How do skin tone modifiers work?",
      answer: "Base emoji (👋 U+1F44B) + skin tone modifier (🏽 U+1F3FD) = 👋🏽. Two Unicode codepoints render as one visual emoji. String length = 2 but appears as 1. Five skin tone modifiers available (light to dark). Not all emojis support skin tones - mainly people emojis. Impacts string manipulation, database storage, and character counting logic."
    },
    {
      question: "Can I use emojis in database column names or SQL?",
      answer: "Possible but not recommended. Most databases support Unicode identifiers if properly configured (utf8mb4 in MySQL). But causes: query readability issues, SQL editor compatibility problems, backup/restore complications, and team communication difficulties. Use emojis in data values (user content, descriptions), not schema structure. Keep table/column names ASCII for maximum compatibility."
    },
    {
      question: "What's the difference between ✔️ and ✅?",
      answer: "✔️ (U+2714) is a text symbol, often renders in black or current text color. ✅ (U+2705) is emoji-style check mark in white box with green background. Both mean 'check' but visual appearance differs. ✅ more colorful and prominent. ✔️ more subtle. Choose based on design needs. Both have emoji variations (text vs emoji presentation selector)."
    },
    {
      question: "How do I handle emojis in MySQL databases?",
      answer: "Emojis require 4-byte UTF-8 encoding. MySQL utf8 charset only supports 3 bytes max. Use utf8mb4 charset for emoji support. Set: \`CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci\` on tables and columns. Update database configuration: \`character-set-server = utf8mb4\`. Test storage/retrieval before production. Existing utf8 columns must be converted: \`ALTER TABLE ... CONVERT TO CHARACTER SET utf8mb4\`."
    },
    {
      question: "Is my emoji selection data private?",
      answer: "Yes, this is a client-side tool. No emoji selections are transmitted to servers, logged, or stored. Clicking emojis copies to your local clipboard only. The tool works completely offline after loading. No network requests track which emojis you use. Safe for selecting emojis for confidential projects, private messages, or internal documentation. All selection is local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This emoji picker operates entirely in your browser using client-side JavaScript. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Operation:** All emoji browsing, searching, and copying happens locally in your browser. No server processing.
- **No Server Uploads:** We don't have backend servers to track emoji selections. The tool works completely offline after page load.
- **No Data Storage:** Emoji selections are not saved, logged, stored in cookies, or transmitted anywhere. Only copied to your local clipboard.
- **No Analytics on Content:** We don't track which emojis you select, which categories you browse, or any usage-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your selection data.

Safe for selecting emojis for confidential projects, private communications, internal documentation, or proprietary content. Use with confidence for any emoji selection needs.`
  },

  stats: {
    "Total Emojis": "1800+",
    "Categories": "9",
    "Search": "Instant",
    "Copy Speed": "1-click",
    "Server Uploads": "0"
  }
};
