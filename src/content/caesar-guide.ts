/**
 * Caesar Cipher / ROT13 Tool Guide Content
 * Comprehensive developer guide for Caesar cipher encoding
 */

import type { ToolGuideContent } from "./types";

export const caesarGuideContent: ToolGuideContent = {
  toolName: "Caesar Cipher / ROT13",
  toolPath: "/caesar",
  lastUpdated: "2026-02-09",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter Your Text",
      description: "Type or paste text into the input field. The Caesar cipher works with letters A-Z (uppercase and lowercase). Numbers, spaces, and punctuation pass through unchanged."
    },
    {
      title: "Set the Shift Value",
      description: "Use the slider or input to set a shift from 1-25. Each letter shifts forward (encode) or backward (decode) by this amount. ROT13 uses a shift of 13."
    },
    {
      title: "Encode or Decode",
      description: "Click 'Encode' to shift letters forward, or 'Decode' to shift backward. For ROT13 (shift 13), encoding and decoding produce the same result since 13+13=26."
    },
    {
      title: "Copy the Result",
      description: "Copy the encoded or decoded result to clipboard with one click. Use the Swap button to quickly reverse the operation or try different shift values with the brute-force view."
    }
  ],

  introduction: {
    title: "What is the Caesar Cipher?",
    content: `The Caesar cipher is one of the earliest and simplest encryption techniques, named after Julius Caesar who reportedly used it to communicate with his generals. It works by shifting each letter in the plaintext by a fixed number of positions in the alphabet.

For example, with a shift of 3: A becomes D, B becomes E, C becomes F, and so on. Letters wrap around at the end of the alphabet, so X becomes A, Y becomes B, and Z becomes C.

### Key Characteristics

- **Substitution Cipher:** Each letter is replaced by another letter at a fixed distance in the alphabet. Non-letter characters (numbers, spaces, punctuation) remain unchanged.
- **26 Possible Shifts:** Since the English alphabet has 26 letters, there are only 25 meaningful shift values (1-25). A shift of 0 or 26 produces the original text.
- **Symmetric for ROT13:** When the shift is 13 (half of 26), encoding and decoding are the same operation. Applying ROT13 twice returns the original text.
- **Easy to Break:** With only 25 possible keys, the Caesar cipher can be broken by trying all shifts (brute force) or using frequency analysis on longer texts.

### ROT13 — The Most Common Variant

ROT13 ("rotate by 13 places") is the most widely used Caesar cipher variant. Since 13 is exactly half of 26, ROT13 is its own inverse: encoding and decoding use the same operation. This makes it popular for:

- Hiding spoilers in forums and social media
- Obscuring email addresses from simple spam scrapers
- Puzzle and CTF (Capture The Flag) challenges
- Obfuscating text in Unix systems (the \`tr\` command: \`tr 'A-Za-z' 'N-ZA-Mn-za-m'\`)

### Historical Significance

Julius Caesar used a shift of 3 in his military communications, as documented by the historian Suetonius. While trivially breakable by modern standards, the Caesar cipher is foundational to cryptography and serves as an introduction to substitution ciphers, frequency analysis, and the concept of encryption keys.`
  },

  useCases: [
    {
      title: "CTF Challenges & Puzzles",
      description: "Caesar cipher and ROT13 appear frequently in beginner CTF (Capture The Flag) competitions and puzzle games. Quick decoding tools help participants solve challenges efficiently without manual letter counting.",
      example: `// Common CTF challenge: decode the flag
Input:  "pgs{guvf_vf_n_fvzcyr_pvcure}"
ROT13:  "ctf{this_is_a_simple_cipher}"

// Brute force all 25 shifts to find readable text
Shift 1:  "bet{sghr_hr_z_rhlokd_bhogdq}"
Shift 13: "ctf{this_is_a_simple_cipher}" ← readable!`
    },
    {
      title: "Hiding Spoilers Online",
      description: "ROT13 is the standard method for hiding spoilers in forums, Reddit posts, and online communities. Readers must actively decode the text, preventing accidental exposure to plot details or puzzle solutions.",
      example: `// Hide a movie spoiler
Original: "The butler did it"
ROT13:    "Gur ohgyre qvq vg"

// Readers who want to see the spoiler
// apply ROT13 to decode it`
    },
    {
      title: "Learning Cryptography",
      description: "The Caesar cipher is typically the first cipher students learn in cryptography courses. Understanding shift ciphers leads to more complex substitution ciphers, Vigenère cipher, and eventually modern encryption algorithms.",
      example: `// Caesar cipher with shift 3 (original Caesar)
Plaintext:  "ATTACK AT DAWN"
Ciphertext: "DWWDFN DW GDZQ"

// Frequency analysis to break it:
// Most common letter in ciphertext → likely 'E' or 'T'
// Determine shift from that assumption`
    },
    {
      title: "Simple Text Obfuscation",
      description: "While not secure encryption, Caesar cipher provides quick obfuscation for non-sensitive text like email addresses (anti-scraping), quiz answers, or Easter eggs in applications.",
      example: `// Obfuscate email to prevent scraping
Original: "contact@example.com"
ROT13:    "pbagnpg@rknzcyr.pbz"

// Simple obfuscation in code comments
// TODO: erzbir guvf unpx orsber cebqhpgvba
// (ROT13: remove this hack before production)`
    }
  ],

  howToUse: {
    title: "How to Use This Caesar Cipher Tool",
    content: `This Caesar cipher encoder/decoder provides instant client-side encryption with adjustable shift values. All processing happens in your browser, ensuring your text remains private.

### Encoding Text

Type or paste your text into the input field, set your desired shift value (1-25), and click "Encode". Letters shift forward in the alphabet by the shift amount. Non-letter characters pass through unchanged.

### Decoding Text

Paste encoded text, set the same shift value used for encoding, and click "Decode". Letters shift backward in the alphabet. If you don't know the shift value, use the brute-force view to see all 25 possible decodings at once.

### ROT13 Quick Mode

Click the "ROT13" button to instantly set the shift to 13 and encode/decode. Since ROT13 is its own inverse, the same operation both encodes and decodes. This is the most common Caesar cipher variant.

### Brute Force View

Toggle the brute-force view to see your input decoded with all 25 possible shift values simultaneously. This is useful for CTF challenges or when you receive Caesar-encoded text with an unknown shift.

### Keyboard Shortcuts

- **Cmd/Ctrl+Enter:** Encode/Decode (primary action)
- **Cmd/Ctrl+L:** Clear all fields
- **Cmd/Ctrl+Shift+C:** Copy output to clipboard`,
    steps: [
      {
        name: "Enter Text",
        text: "Type or paste your text into the input area. The cipher preserves case and passes non-letter characters through unchanged."
      },
      {
        name: "Set Shift Value",
        text: "Choose a shift from 1-25 using the slider or input field. Use 13 for ROT13, or 3 for the classic Caesar cipher."
      },
      {
        name: "Encode or Decode",
        text: "Click 'Encode' to shift letters forward or 'Decode' to shift backward. For ROT13, both operations produce the same result."
      },
      {
        name: "Copy Result",
        text: "Use the Copy button to copy the output to clipboard, or use the Swap button to reverse input and output for quick re-encoding."
      }
    ]
  },

  faqs: [
    {
      question: "What is the difference between Caesar cipher and ROT13?",
      answer: "ROT13 is a specific instance of the Caesar cipher with a fixed shift of 13. The Caesar cipher allows any shift from 1-25, while ROT13 always shifts by 13. ROT13 has the unique property of being its own inverse — applying it twice returns the original text — because 13 is exactly half of 26 (the number of letters in the English alphabet)."
    },
    {
      question: "Is the Caesar cipher secure?",
      answer: "No. The Caesar cipher is not secure for any real-world encryption. With only 25 possible shifts, it can be broken in seconds by trying all possibilities (brute force). Longer texts can also be broken using frequency analysis — the most common letter in English text is 'E', so the most common letter in the ciphertext likely maps to 'E'. Use modern encryption (AES, RSA, ChaCha20) for actual security needs."
    },
    {
      question: "How do I break a Caesar cipher if I don't know the shift?",
      answer: "Two methods: (1) Brute force — try all 25 shifts and look for readable text. This tool's brute-force view does this automatically. (2) Frequency analysis — in English, the most common letters are E, T, A, O, I, N. Find the most common letter in the ciphertext and assume it maps to 'E' to determine the shift. For short texts, brute force is faster; for longer texts, frequency analysis is more reliable."
    },
    {
      question: "Does the Caesar cipher work with numbers and special characters?",
      answer: "The traditional Caesar cipher only shifts letters (A-Z, a-z). Numbers, spaces, punctuation, and other characters pass through unchanged. Some extended versions shift numbers separately (0-9 wrapping around), but this tool follows the standard convention of only shifting alphabetic characters to maintain compatibility with ROT13 and standard implementations."
    },
    {
      question: "Why is ROT13 used instead of other shifts?",
      answer: "ROT13 is self-inverse: applying it twice returns the original text (13+13=26, a full rotation). This means the same function works for both encoding and decoding, simplifying implementation. It was popularized on Usenet in the 1980s as a way to hide spoilers and offensive content. The shift of 13 was chosen specifically because it's half the alphabet length."
    },
    {
      question: "Can I use this for encrypting sensitive data?",
      answer: "Absolutely not. The Caesar cipher provides no real security — it's a simple substitution that anyone can reverse in seconds. For securing sensitive data, use proper encryption algorithms like AES-256 (symmetric) or RSA/ECDSA (asymmetric). The Caesar cipher is educational and useful only for light obfuscation (hiding spoilers, puzzles, CTF challenges)."
    },
    {
      question: "What is a shift of 0 or 26?",
      answer: "A shift of 0 or 26 produces the original text unchanged, since shifting by the full alphabet length returns each letter to its starting position. This is why meaningful shifts range from 1-25. Similarly, a shift of 27 is equivalent to a shift of 1, a shift of 28 equals 2, and so on."
    },
    {
      question: "Is my data private when using this tool?",
      answer: "Yes. All Caesar cipher encoding and decoding happens entirely in your browser using client-side JavaScript. Your text never leaves your device or gets sent to any server. No data is uploaded, logged, or stored. You can verify this by disconnecting from the internet — the tool continues to work offline."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your data never leaves your browser. This Caesar cipher tool operates entirely client-side using JavaScript string manipulation. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All encoding and decoding happens in your browser's JavaScript engine. Text stays on your device.
- **No Server Uploads:** The tool works completely offline after first load. No data is sent anywhere.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone.
- **No Analytics on Content:** We don't track what you encode/decode or any content-specific data.
- **Transparent & Auditable:** Inspect the Network tab in browser DevTools — you'll see zero outbound requests containing your data.

### Important Security Note

The Caesar cipher is **not encryption** — it's a simple substitution cipher that provides zero security. Do not use it to protect sensitive information. For actual encryption needs, use our [Encrypt/Decrypt](/encrypt) tool which implements AES-256 and other modern algorithms.`
  },

  stats: {
    "Processing": "Instant",
    "Possible Shifts": "25",
    "Alphabet Size": "26 chars",
    "Brute Force": "< 1ms",
    "Server Uploads": "0"
  }
};
