/**
 * Word Counter Tool Guide Content
 * Comprehensive developer guide for word and character counting
 */

import type { ToolGuideContent } from "./types";

export const wordsGuideContent: ToolGuideContent = {
  toolName: "Word Counter",
  toolPath: "/words",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste or Type Your Text",
      description: "Enter any text - articles, code comments, documentation, social media posts, or emails. The counter updates in real-time as you type, showing instant metrics."
    },
    {
      title: "View Comprehensive Statistics",
      description: "See word count, character count (with/without spaces), sentence count, paragraph count, and average word length. All metrics calculate instantly without manual counting."
    },
    {
      title: "Check Reading Time Estimate",
      description: "Get estimated reading time based on average reading speed (200-250 words per minute). Useful for blog posts, articles, and documentation planning."
    },
    {
      title: "Track Character Limits",
      description: "Monitor text length for platform limits: Twitter/X (280 chars), Meta descriptions (160 chars), email subject lines (50 chars), or SMS (160 chars). Visual indicators show when approaching limits."
    }
  ],

  introduction: {
    title: "What is Word Counting?",
    content: `Word counting analyzes text to calculate words, characters, sentences, and paragraphs - essential metrics for content creation, editing, SEO optimization, and meeting platform character limits. Writers, content marketers, developers (documentation), students (essays), and social media managers rely on word counts daily to meet requirements, optimize readability, and respect platform constraints.

Modern content has strict requirements: blog posts target specific word counts for SEO (1500-2000 words for comprehensive guides), Twitter/X enforces 280 character limit, meta descriptions max at 160 characters, academic essays require minimum word counts, and documentation aims for concise explanations. Manual counting is impractical and error-prone. Automated word counting provides instant, accurate metrics.

### Why Word Counting Matters

**SEO Content Optimization:** Google favors comprehensive content. SEO best practice: blog posts 1500+ words, pillar pages 3000+ words, product descriptions 300+ words. Word count helps target these ranges. Too short = thin content penalty. Too long = reader fatigue. Word count guides content length strategy.

**Platform Character Limits:** Twitter/X (280 chars), LinkedIn posts (3000 chars), Meta descriptions (155-160 chars), Facebook posts (80 chars optimal), Instagram captions (2200 chars), SMS (160 chars standard). Exceeding limits causes truncation or rejection. Real-time character count prevents posting errors.

**Content Planning:** Writers estimate article length before drafting. "Write 2000-word guide" requires tracking progress. Word count shows how far into target you've written. Reading time estimates help plan content consumption time for readers.

**Academic Requirements:** Essays, research papers, and reports have minimum/maximum word counts. 500-word essay, 10-page paper, 100-word abstract. Students need accurate counts to meet requirements without over/under writing.

**Code Documentation:** READMEs, API docs, and code comments aim for conciseness. 50-word function description is more maintainable than 500-word essay. Word count enforces brevity in technical writing.

### What Counts as a "Word"?

Word counting algorithms vary. This tool uses whitespace-separated word detection: text split by spaces/tabs/newlines. "hello world" = 2 words. Hyphenated words count as one: "state-of-the-art" = 1 word. Contractions count as one: "don't" = 1 word. Numbers count as words: "123" = 1 word.

Punctuation attached to words doesn't affect count: "Hello!" = 1 word. Multiple spaces between words are treated as single separator. Empty lines don't add words. This matches most word processors (MS Word, Google Docs) and industry standard tools.

### Character Counting: With vs Without Spaces

**Characters with spaces:** Total characters including letters, numbers, punctuation, and spaces. Used for Twitter/X character limit (280), meta descriptions (160), SMS (160). Most platform limits count spaces.

**Characters without spaces:** Only letters, numbers, and punctuation. Used for some academic requirements or translation pricing (per character excluding spaces). Generally less common than with-spaces counting.

### Reading Time Calculation

Average adult reading speed: 200-250 words per minute for standard content. Technical content: 150-200 wpm (slower due to complexity). Fiction: 250-300 wpm (faster narrative flow). This tool estimates reading time based on 200 wpm for conservative estimates. 400-word article = 2 minutes reading time.

This tool provides instant, accurate word/character counts with real-time updates as you type, helping content creators, developers, students, and marketers meet requirements and optimize text length. All processing happens client-side using JavaScript string methods - your text never leaves your browser.`
  },

  useCases: [
    {
      title: "Optimize Blog Post Length for SEO",
      description: "Track word count while writing blog posts to hit SEO-optimal lengths. Comprehensive guides (1500-2500 words) rank better in Google. Monitor progress toward target word count to ensure sufficient depth without unnecessary verbosity.",
      example: `// SEO Content Length Guidelines:
// - Short posts: 500-800 words (quick tips, announcements)
// - Standard posts: 1000-1500 words (how-to guides, tutorials)
// - Long-form: 1500-2500 words (comprehensive guides, comparisons)
// - Pillar pages: 3000-5000 words (ultimate guides, resources)

Target: "Write 2000-word guide on TypeScript"

Current Progress:
- Word count: 1,847 words
- Remaining: 153 words
- Reading time: ~9 minutes

Content meets minimum (1500+) but approaching target.
Add one more section to hit 2000-word goal.`
    },
    {
      title: "Respect Social Media Character Limits",
      description: "Write social media posts while monitoring character count to stay within platform limits. Twitter/X (280 chars), LinkedIn (3000 chars), Instagram (2200 chars), Meta descriptions (160 chars). Real-time counting prevents posting truncated messages.",
      example: `// Twitter/X Post Draft:
"Excited to announce our new feature!
After months of development, we're launching
real-time collaboration tools that will
revolutionize how teams work together.
Check it out: [link]"

Character count: 215/280 ✓
Words: 27
Remaining: 65 characters

Safe to post. Can add hashtags or emoji
without exceeding 280 character limit.

// Meta Description for SEO:
"Learn TypeScript in 2024 with our
comprehensive guide covering types, interfaces,
generics, and best practices for modern web dev"

Character count: 145/160 ✓
Remaining: 15 characters`
    },
    {
      title: "Meet Academic Essay Requirements",
      description: "Track word count while writing essays, research papers, or assignments to meet minimum/maximum requirements. 500-word essay, 2000-word research paper, 100-word abstract. Ensures compliance without manual counting.",
      example: `// Assignment Requirements:
"Write 1500-2000 word research paper on climate change"

Current Draft Statistics:
- Word count: 1,678 words
- Character count: 9,845
- Paragraphs: 12
- Sentences: 78
- Reading time: ~8 minutes

Status: Within range (1500-2000) ✓
Can add conclusion section (200-300 words)
without exceeding maximum.

// Abstract Requirements:
"Abstract must be 100-150 words"

Abstract Draft:
- Word count: 127 words
- Status: Within range ✓`
    },
    {
      title: "Write Concise Code Documentation",
      description: "Enforce brevity in README files, API documentation, and code comments. Technical writing values conciseness. Word count helps keep docs focused and scannable. Target: 50-word function descriptions, 200-word README intro.",
      example: `// Function Documentation Target: 50 words max

/**
 * Authenticates user credentials against database.
 * Validates email/password, checks account status,
 * generates JWT token on success. Returns user object
 * with token or throws AuthenticationError.
 * Rate-limited to prevent brute force attacks.
 *
 * Word count: 32 words ✓
 * Concise and complete.
 */

// README Introduction Target: 200 words

Current README intro: 187 words
- Describes project purpose
- Lists key features
- Shows quick start example
- Within target range ✓`
    }
  ],

  howToUse: {
    title: "How to Use This Word Counter",
    content: `This tool provides instant word and character counting with real-time updates as you type. No button clicking required - metrics update on every keystroke using efficient JavaScript string processing.

### Real-Time Counting

Type or paste text into the input field. The tool instantly displays:
- **Word count:** Whitespace-separated words (includes numbers, hyphenated words as single word)
- **Characters (with spaces):** Total characters for Twitter/platform limits
- **Characters (no spaces):** Letters, numbers, punctuation only
- **Sentences:** Detected by periods, question marks, exclamation points
- **Paragraphs:** Separated by blank lines
- **Average word length:** Total characters divided by words (indicator of vocabulary complexity)

### Monitoring Platform Limits

Common platform limits shown with visual indicators:
- **Twitter/X:** 280 characters
- **Meta Description:** 160 characters
- **Email Subject:** 50 characters
- **SMS:** 160 characters

Color-coded warnings when approaching or exceeding limits. Green = safe, yellow = approaching, red = exceeded.

### Reading Time Estimation

Based on 200 words per minute average reading speed. Helps plan content consumption time for readers. 400-word post = 2 minutes, 2000-word guide = 10 minutes. Adjust your content length based on target reading time.

### Counting Methodology

**Words:** Text split by whitespace (spaces, tabs, newlines). Hyphenated words count as one. Contractions count as one. Numbers count as words.

**Sentences:** Detected by sentence-ending punctuation (. ! ?). Multiple punctuation (...) counts as one sentence end.

**Paragraphs:** Separated by one or more blank lines (double line break). Single line breaks within paragraph don't create new paragraph.

### Use Cases

Writing blog posts (SEO word count targets), drafting social media posts (character limits), writing essays (academic requirements), creating documentation (conciseness goals), email marketing (subject line length), SMS messaging (160-char limit).`,
    steps: [
      {
        name: "Enter Text",
        text: "Type or paste content into the text area. Articles, posts, code docs, emails - any text format works."
      },
      {
        name: "View Metrics",
        text: "See instant word count, characters, sentences, paragraphs, and reading time. Updates as you type."
      },
      {
        name: "Check Limits",
        text: "Monitor character count against platform limits (Twitter, meta descriptions, SMS). Color indicators show status."
      },
      {
        name: "Adjust Content",
        text: "Edit text to meet requirements: hit minimum word count, stay under character limit, or adjust reading time."
      }
    ]
  },

  faqs: [
    {
      question: "How does this tool count hyphenated words?",
      answer: "Hyphenated words like 'state-of-the-art' or 'real-time' count as single words, matching Microsoft Word and Google Docs behavior. The algorithm splits text by whitespace, so 'twenty-five' is 1 word, not 2. This is the industry standard for word counting. If you need hyphenated words counted separately, manually replace hyphens with spaces before counting."
    },
    {
      question: "Do contractions count as one or two words?",
      answer: "Contractions like 'don't', 'can't', 'it's' count as single words. The apostrophe doesn't create word separation. This matches how we speak and write - 'don't' is one word meaning 'do not'. Most word processors and content tools count contractions as single words. Two-word count would only apply if you expand contractions ('do not' = 2 words)."
    },
    {
      question: "Why does my count differ from Microsoft Word?",
      answer: "Different word counting algorithms handle edge cases differently: hyphenated words, contractions, numbers, special characters, URLs. This tool uses whitespace separation (industry standard). Word might count 'e-mail' as 2 words while this tool counts 1. Small differences are normal. For academic/professional work, confirm which tool your institution/publisher uses and stick with it."
    },
    {
      question: "Does character count include punctuation?",
      answer: "Yes, 'Characters (with spaces)' includes all characters: letters, numbers, punctuation, and spaces. This matches Twitter/X, meta description, and SMS character limits which count everything. 'Characters (no spaces)' excludes spaces but includes punctuation. For truly letter-only count, you'd need custom filtering."
    },
    {
      question: "How accurate is the reading time estimate?",
      answer: "Reading time is estimated at 200 words per minute (wpm), the average for standard content. Actual reading speed varies: technical content 150-200 wpm, fiction 250-300 wpm, skimming 400+ wpm, and speed reading 600+ wpm. Use the estimate as a rough guide. For more accuracy, test with actual readers or adjust based on content complexity."
    },
    {
      question: "Can I use this for character count in programming?",
      answer: "Yes, but be aware: this counts Unicode characters (multi-byte characters like emojis count as 1). Some programming contexts count bytes (emoji = 4 bytes). For code length limits (linter rules, database column lengths), use byte count not character count. This tool is for writing/content, not low-level programming constraints."
    },
    {
      question: "How are sentences counted?",
      answer: "Sentences are detected by ending punctuation: period (.), exclamation mark (!), question mark (?). 'Hello world. How are you?' = 2 sentences. Multiple punctuation marks ('What?!') count as single sentence end. Abbreviations with periods (Dr., Mr., U.S.A.) may incorrectly split sentences - sentence detection is heuristic-based, not perfect."
    },
    {
      question: "What defines a paragraph?",
      answer: "Paragraphs are separated by blank lines (one or more empty lines). Single line breaks within text don't create new paragraphs. Press Enter twice to start a new paragraph. This matches Markdown and most content editors. If your text has single line breaks that should be paragraphs, manually add extra line break between them."
    },
    {
      question: "Can I count words in multiple languages?",
      answer: "Yes, the tool works with Unicode text including non-English languages (Spanish, French, Chinese, Arabic, etc.). However, some languages don't use spaces between words (Chinese, Japanese, Thai). For these languages, character count is more useful than word count. CJK languages typically count characters, not words. Word count works best for space-separated languages (English, Spanish, French, etc.)."
    },
    {
      question: "Is my text data private and secure?",
      answer: "Absolutely. All word counting happens entirely in your browser using JavaScript string methods (split(), length, regex). Your text never leaves your device or gets uploaded to servers. No network requests are made with your content. Verify by opening browser DevTools Network tab - zero uploads. Safe for confidential documents, proprietary content, or sensitive writing."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your text never leaves your browser. This word counter operates entirely client-side using JavaScript string processing. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All counting happens in your browser's JavaScript engine using native string methods. Text stays on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your text input is not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone (unless you save locally).
- **No Analytics on Content:** We don't track what you write, word counts, topics, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for counting words in confidential documents, proprietary content, academic papers, business communications, or any sensitive writing. Use with confidence for production content, client work, or personal writing.`
  },

  stats: {
    "Counting Speed": "<1ms",
    "Max Text Size": "Unlimited",
    "Language Support": "Unicode",
    "Reading Speed": "200 WPM",
    "Server Uploads": "0"
  }
};
