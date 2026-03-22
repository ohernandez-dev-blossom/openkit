/**
 * Morse Code Translator Tool Guide Content
 * Comprehensive guide for Morse code encoding and decoding
 */

import type { ToolGuideContent } from "./types";

export const morseGuideContent: ToolGuideContent = {
  toolName: "Morse Code Translator",
  toolPath: "/morse",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Text or Morse Code",
      description: "Type plain text to encode into Morse (dots and dashes), or enter Morse code (. - symbols) to decode back to text. Switch modes bidirectionally."
    },
    {
      title: "See Instant Translation",
      description: "Real-time conversion as you type. Text converts to Morse with spaces between letters, slashes (/) between words. Morse decodes to readable text character-by-character."
    },
    {
      title: "Play Audio Morse",
      description: "Click 'Play Morse Audio' to hear your message in authentic Morse code sound. Short beeps for dots, long beeps for dashes. Educational and verification tool."
    },
    {
      title: "Copy or Share Results",
      description: "Copy translated Morse code for radio communication, puzzles, educational content, or creative projects. Reference table shows letter-to-Morse mappings."
    }
  ],

  introduction: {
    title: "What is Morse Code?",
    content: `Morse code is a character encoding system using sequences of dots (short signals) and dashes (long signals) to represent letters, numbers, and punctuation. Invented by Samuel Morse in 1830s for telegraph communication, Morse code remains relevant for amateur radio, aviation, maritime safety, accessibility tools, and educational demonstrations of signal encoding principles.

Each letter maps to unique dot-dash pattern: 'A' = ·–, 'B' = –···, 'S' = ···, 'O' = –––. Numbers use five-symbol patterns: '1' = ·––––, '0' = –––––. SOS distress signal (··· ––– ···) is universally recognized internationally. Morse code transcends language barriers - standard international Morse code works globally with same letter mappings regardless of spoken language.

### Why Morse Code Still Matters

**Amateur Radio (HAM Radio):** Radio operators worldwide use Morse code (CW - Continuous Wave) for long-distance communication. Morse signals penetrate noise and atmospheric interference better than voice. Lower bandwidth requirements allow communication when voice fails. HAM radio licensing historically required Morse proficiency (no longer mandatory but widely practiced).

**Aviation & Maritime Safety:** Pilots and sailors learn Morse for emergency communication. Aircraft navigation beacons transmit station identifiers in Morse. Ships use Morse for distress signals when voice radio fails. International maritime regulations require Morse capability for certain vessel classes. Emergency locator beacons (ELTs) transmit Morse identification codes.

**Accessibility Technology:** Morse code enables communication for people with severe physical disabilities. Single-switch Morse input allows typing using just muscle twitches, eye blinks, or breath control. Assistive technology devices convert Morse input to text for communication. Faster than scanning alphabets for severely limited motor control users.

**Military & Intelligence:** Special operations forces use Morse for covert communication. Light flashes, knocking patterns, or audio tones transmit Morse covertly. Historical cipher breaking (Enigma, wartime codes) relied on Morse transmission analysis. Modern security training includes Morse for backup communication when electronics compromised.

**Education & STEM Learning:** Morse code teaches digital signal encoding, binary thinking (on/off states), and information theory fundamentals. Students learn how computers represent data through Morse analogy. Engaging way to introduce kids to coding, signals, and communication technology. Science fairs, robotics projects, and maker spaces use Morse for interactive demonstrations.

**Survival & Emergency Preparedness:** Survivalists learn Morse for emergency communication without electronics. Signal SOS using flashlight, mirror reflections, whistle blasts, or knocking patterns. Morse works with minimal equipment - any on/off signal method suffices. Prepers include Morse references in emergency kits.

### International Morse Code Standard

**Letters A-Z:** Each letter has unique 1-5 symbol pattern. Short letters (E = ·, T = –) reflect frequency in English. Common letters get shorter codes for efficiency. Q, Z less common get longer patterns.

**Numbers 0-9:** All numbers use exactly 5 symbols. Pattern: 1 starts with 1 dash then 4 dots, 2 has 2 dashes then 3 dots, etc. Zero is 5 dashes. Systematic pattern aids memorization.

**Punctuation:** Period (·–·–·–), comma (––··––), question mark (··––··), apostrophe (·––––·). Less common punctuation often omitted in casual use. Maritime/aviation uses standard punctuation for clarity.

**Timing Rules:**
- Dot duration: 1 unit
- Dash duration: 3 units (3× dot length)
- Gap between symbols within letter: 1 unit
- Gap between letters: 3 units
- Gap between words: 7 units

This tool implements standard international Morse with audio playback at optimal speeds for human recognition. All processing client-side - your messages never leave your browser.`
  },

  useCases: [
    {
      title: "Amateur Radio CW Communication",
      description: "HAM radio operators practice Morse code (CW) for license exams or long-distance contacts. Convert messages to Morse before transmitting, decode received Morse from logs. Practice tool for learning code.",
      example: `// Radio contact log:
Operator sends: "CQ CQ DE W1ABC K"
(CQ = calling any station, DE = this is, K = go ahead)

// Convert to Morse for transmission:
CQ = -.-. --.-
CQ = -.-. --.-
DE = -.. .
W1ABC = .-- .---- .- -... -.-.
K = -.-

// On receiving station:
Decode incoming Morse: ··· ··· (SS) – callsign prefix
Audio playback helps train ear for faster copy
Learn Farnsworth method: character speed 20 WPM, spacing slower

// Practice exchanges before contests
// Build muscle memory for common phrases`
    },
    {
      title: "Create Accessibility Input System",
      description: "Develop assistive technology allowing users with limited mobility to type using Morse input via single switch, breath sensor, or muscle twitch. Convert Morse input to text for AAC devices.",
      example: `// Morse input device design:
// User taps button: short press = dot, long press = dash
// Example typing 'HELLO':

H = .... (4 short taps)
E = . (1 short tap)
L = .-.. (short, long, short, short)
L = .-.. (repeat)
O = --- (3 long presses)

// Software decodes Morse → text in real-time:
Input buffer: .... (pause) → decode → "H"
Display: "H"
Continue: . (pause) → "E"
Display: "HE"

// Benefits over alphabet scanning:
// - Faster for trained users (5-20 WPM possible)
// - Two-state input (dot/dash) vs multi-position scanning
// - Single switch operation

// Modern AAC devices (speech generating devices)
// include Morse mode for expert users`
    },
    {
      title: "Emergency Signal Communication",
      description: "Learn SOS and common distress signals for emergency preparedness. Practice signaling with flashlight, mirror, whistle, or knocking patterns. No electricity required for Morse communication.",
      example: `// International distress signals:

SOS: ... --- ... (dit-dit-dit dah-dah-dah dit-dit-dit)
Most recognized emergency signal worldwide
Transmit using: flashlight, mirror flashes, whistle, knocks

// Example: Flashlight SOS
Short flash = dot (0.5 sec)
Long flash = dash (1.5 sec)
Letter gap = 1.5 sec pause
Word gap = 3.5 sec pause

SOS pattern:
Flash-flash-flash (pause) flash(long)-flash(long)-flash(long) (pause) flash-flash-flash

// Other useful emergency codes:
HELP: .... . .-.. .-..
WATER: .-- .- - . .-.
INJURY: .. -. .--- ..- .-. -.--

// Practice before emergencies
// Works when phones/radios dead
// Universally understood by rescue teams`
    },
    {
      title: "Educational Programming Project",
      description: "Teach students encoding principles through Morse code implementation. Build Arduino projects flashing LED Morse, create encoder/decoder programs, demonstrate signal transmission concepts.",
      example: `// Arduino Morse code LED blinker project:

const int DOT_LENGTH = 200;  // milliseconds
const int DASH_LENGTH = 600; // 3x dot
const int LED_PIN = 13;

void sendDot() {
  digitalWrite(LED_PIN, HIGH);
  delay(DOT_LENGTH);
  digitalWrite(LED_PIN, LOW);
  delay(DOT_LENGTH); // gap between symbols
}

void sendDash() {
  digitalWrite(LED_PIN, HIGH);
  delay(DASH_LENGTH);
  digitalWrite(LED_PIN, LOW);
  delay(DOT_LENGTH);
}

void sendSOS() {
  // S: ...
  sendDot(); sendDot(); sendDot();
  delay(DOT_LENGTH * 2); // letter gap

  // O: ---
  sendDash(); sendDash(); sendDash();
  delay(DOT_LENGTH * 2);

  // S: ...
  sendDot(); sendDot(); sendDot();
}

// Learning outcomes:
// - Digital signals (on/off states)
// - Timing and delays
// - Character encoding
// - Information compression
// - Signal transmission`
    }
  ],

  howToUse: {
    title: "How to Use This Morse Code Translator",
    content: `This tool provides bidirectional Morse code conversion with real-time translation and audio playback. All processing happens client-side using JavaScript Morse mapping tables.

### Encoding Text to Morse Code

Select 'Text → Morse' mode and type any text. Tool converts each character to dots (·) and dashes (–) instantly. Space between characters separates letters. Forward slash (/) separates words. Morse code is case-insensitive - converts all input to uppercase before encoding.

Supported characters: A-Z letters, 0-9 numbers, common punctuation (. , ? ' ! / ( ) & : ; = + - _ " $ @). Unsupported characters pass through unchanged (emojis, non-Latin characters). Stick to basic alphanumeric for standard Morse compatibility.

### Decoding Morse Code to Text

Switch to 'Morse → Text' mode and enter dots (.) and dashes (-). Separate letters with spaces, words with forward slash (/). Tool decodes character-by-character in real-time. Invalid Morse sequences (patterns not matching any letter) pass through unchanged.

Input format examples:
- Dots: . or ·
- Dashes: - or – or —
- Letter separator: space
- Word separator: / or //

Tool accepts flexible input - extra spaces ignored, various dash characters recognized.

### Playing Morse Audio

Click 'Play Morse Audio' button to hear your message in authentic Morse sound. Uses Web Audio API generating 600 Hz tone. Timing follows standard Morse: dot = 100ms, dash = 300ms (3× dot), gaps between symbols/letters/words proportional.

Audio playback useful for: ear training for radio operators, learning Morse code sounds, verifying translations, educational demonstrations, creating accessible audio representations.

### Learning Morse Code

Start with common letters: E (·), T (–), A (·–), I (··), N (–·), S (···), O (–––). These appear frequently in English. Learn systematic patterns: Numbers 1-5 start with dots becoming dashes (1=·––––, 2=··–––, etc), numbers 6-0 reverse pattern.

Reference table shows all letter mappings. Practice common words: SOS (···–––···), HELLO (····.·-··-··–––), CQ (–·-·––·–). Use audio playback to train your ear recognizing sound patterns, not just visual dots/dashes.`,
    steps: [
      {
        name: "Enter Text or Morse",
        text: "Type plain text for encoding or dots/dashes for decoding. Switch mode using arrow button to reverse translation direction.",
      },
      {
        name: "See Translation",
        text: "Real-time conversion shows Morse code or decoded text instantly. Reference table helps learn letter-to-pattern mappings.",
      },
      {
        name: "Play Audio",
        text: "Click Play button to hear Morse code with authentic timing. Short beeps = dots, long beeps = dashes. Educational and verification tool.",
      },
      {
        name: "Copy Results",
        text: "Click copy button to grab translated output. Use for radio communication, puzzles, accessibility projects, or education.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between American and International Morse?",
      answer: "This tool uses International Morse Code (ITU standard) which is worldwide standard for radio, aviation, maritime. American (Railroad) Morse is obsolete variant used on landline telegraphs in 1800s, has different letter patterns and uses gaps within letters. International Morse uses only dots, dashes, and inter-symbol gaps (no intra-symbol gaps). All modern applications use International Morse. American Morse historical curiosity only."
    },
    {
      question: "How fast should I learn to send/receive Morse?",
      answer: "Beginner: 5 WPM (words per minute). Intermediate: 10-13 WPM. Expert: 20-30 WPM. HAM radio Extra class historically required 20 WPM (no longer mandatory). Professional operators (military, maritime) reach 25-30 WPM. Learn using Farnsworth method: fast character speed (15-20 WPM) with longer spacing between letters. This teaches proper rhythm avoiding 'counting dots/dashes' habit. Practice 15 min daily more effective than 2 hour weekly sessions."
    },
    {
      question: "Can I use Morse code for different languages?",
      answer: "International Morse covers A-Z Latin alphabet, 0-9 numbers, and punctuation. Works for any language using Latin script (English, Spanish, French, German). Non-Latin languages: Cyrillic Morse (Russian alphabet extensions), Japanese Morse (wabun code), Arabic Morse, Greek Morse exist with additional characters. This tool implements Latin alphabet standard - most universal. For non-Latin languages, look for language-specific Morse code tables and converters."
    },
    {
      question: "Why do some letters have only 1-2 symbols while others have 5?",
      answer: "Morse code designed for efficiency - common letters get shorter codes. 'E' (most common English letter) = single dot (·). 'T' (second most common) = single dash (–). Rare letters like Q (––·–), Y (–·––) get longer patterns. Frequency-based encoding reduces average message length. Similar principle to Huffman coding in computer science. Numbers use exactly 5 symbols each for systematic pattern. Efficient Morse exploits language statistics."
    },
    {
      question: "How do I signal SOS with Morse code?",
      answer: "SOS: ··· ––– ··· (three dots, three dashes, three dots). Send continuously without letter spacing for distress signal: ···–––··· (9 symbols without pause). Transmit using any method: flashlight (short/long flashes), whistle (short/long blasts), horn, mirror, knocking. Repeat continuously until acknowledged. SOS universally recognized. Alternative: call for help by repeating 'HELP' or 'MAYDAY' in Morse. Don't use SOS except genuine emergency."
    },
    {
      question: "Can Morse code work for music or creative projects?",
      answer: "Yes, artists use Morse in various creative ways: music compositions incorporating Morse rhythm (Rush, Pearl Jam songs), visual art using dot-dash patterns, jewelry/tattoos encoding secret messages, escape room puzzles, geocaching clues, wedding invitations with hidden Morse messages, LED art installations flashing Morse poetry. Morse aesthetic appeal - mysterious, technical, vintage. This tool helps encode creative messages, verify Morse accuracy in artistic projects, generate patterns for visual design."
    },
    {
      question: "What equipment do I need for Morse code communication?",
      answer: "Basic Morse requires any on/off signal method: flashlight, whistle, buzzer, telegraph key, radio transmitter, or even knocking. For radio: HAM radio transceiver with CW (Continuous Wave) mode, straight key or paddle, headphones. For practice: this tool with audio playback, smartphone apps, computer practice software. For accessibility: single switch, breath sensor, or custom input device. Morse beauty: works with minimal equipment unlike voice requiring specific radio/phone infrastructure."
    },
    {
      question: "How do I learn Morse code quickly?",
      answer: "Use Koch method or Farnsworth method - learn letters one at a time at full speed before adding more. Practice daily 15-30 minutes more effective than cramming. Listen to Morse audio (this tool, apps, radio) - ear recognition faster than visual. Learn common words: THE, AND, OF, TO. Use mnemonics: SOS = 'Save Our Souls', Q = 'Dah-dah-dit-dah' sounds like 'God Save the Queen'. Join HAM radio club for practice contacts. Smartphone apps gamify learning. Expect 2-3 months reaching 10 WPM with consistent practice."
    },
    {
      question: "Can I decode Morse code from audio recordings?",
      answer: "This tool provides manual encoding/decoding and audio playback generation - doesn't automatically decode audio files. For audio-to-text Morse decoding: use specialized software (CW Decoder, Morse Decoder, Fldigi), hardware CW decoders, or smartphone apps analyzing microphone input. Automatic decoding accuracy depends on audio quality, noise level, sending speed consistency. Clean recordings decode easily, real-world radio signals with interference require practice and better tools."
    },
    {
      question: "Is my message private when using this tool?",
      answer: "Absolutely. All Morse code translation happens entirely in your browser using JavaScript lookup tables. Your text/messages never leave your device or get uploaded to servers. No network requests are made with your content. Verify by opening browser DevTools Network tab - zero uploads. Safe for encoding confidential messages, military/tactical communications, sensitive personal messages, or any private text. Tool works completely offline after page load. Morse encoding itself not encryption - use actual encryption for security."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your messages never leave your browser. This Morse code translator operates entirely client-side using JavaScript character mapping tables and Web Audio API. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All Morse encoding/decoding happens in your browser. Messages stay on your device.
- **No Server Uploads:** We don't have backend servers to process text. The tool works completely offline after first page load.
- **No Data Storage:** Your input text and Morse translations are not saved, logged, stored, or transmitted anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you encode, messages sent, or any content-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - you'll see zero outbound requests containing your text.

Safe for encoding confidential messages, military/tactical training, emergency preparedness planning, accessibility communication development, or any private text requiring Morse translation. Note: Morse code is encoding, not encryption - use actual encryption (AES, PGP) if security required.`
  },

  stats: {
    "Characters": "A-Z, 0-9, punctuation",
    "Audio Playback": "Yes",
    "Bidirectional": "Yes",
    "Speed": "Instant",
    "Server Uploads": "0"
  }
};
