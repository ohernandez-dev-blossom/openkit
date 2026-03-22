/**
 * Roman Numeral Converter Tool Guide Content
 * Comprehensive developer guide for Roman numeral conversion
 */

import type { ToolGuideContent } from "./types";

export const romanGuideContent: ToolGuideContent = {
  toolName: "Roman Numeral Converter",
  toolPath: "/roman",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Number or Numeral",
      description: "Input Arabic numbers (1-3999) or Roman numerals (I-MMMCMXCIX). Tool auto-detects input type converting between systems instantly. Supports full range of standard Roman numeral notation."
    },
    {
      title: "View Conversion Result",
      description: "See instant bidirectional conversion. Arabic numbers become Roman numerals, Roman numerals become Arabic numbers. Understand Roman numeral construction with breakdown showing symbol combinations."
    },
    {
      title: "Validate Roman Numerals",
      description: "Check if Roman numerals follow proper syntax rules. Tool validates symbol order, subtraction notation, and repetition limits. Highlights errors in malformed numerals explaining corrections."
    },
    {
      title: "Copy and Use",
      description: "Copy converted values for documentation, copyright years, chapter numbering, or UI elements. Use Roman numerals in formal documents, classical designs, or historical references maintaining authenticity."
    }
  ],

  introduction: {
    title: "What are Roman Numerals?",
    content: `Roman numerals are the ancient number system used by Romans using Latin letters (I, V, X, L, C, D, M) representing values. I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Numbers form by combining symbols following specific rules: additive (VI=6, symbols add) and subtractive (IV=4, smaller before larger subtracts). Despite being replaced by Arabic numerals for calculation, Roman numerals persist in formal contexts, copyright years, outlines, and classical design.

Modern developers encounter Roman numerals in copyright notices (© MMXXVI), chapter numbering (Chapter III), document outlines (Section II.A), clock faces (XII), Super Bowl naming (LIX), and film credits. While impractical for arithmetic, Roman numerals convey formality, tradition, and timelessness in branding and design. Understanding conversion enables accurate use in applications requiring classical notation.

### Why Developers Use Roman Numeral Conversion

**Copyright Year Notation:** Movie studios, publishing houses, and entertainment companies display copyright years in Roman numerals (© MMXXIV). Conversion tools generate correct notation from current year. Automatic copyright year updates require converting JavaScript Date.getFullYear() to Roman numerals. Ensures legal notices use proper formatting without manual transcription errors.

**Document Numbering Systems:** Technical documentation, legal contracts, and academic papers use Roman numerals for section hierarchies. Main sections use Arabic (1, 2, 3), subsections use Roman (I, II, III), sub-subsections use lowercase (a, b, c). Conversion helps generate outline numbers programmatically in documentation tools, content management systems, or report generators.

**Classical UI Design:** Applications with classical, luxury, or historical themes use Roman numeral displays. Watch faces, monument plaques, building cornerstones, or commemorative designs require authentic Roman numerals. Conversion ensures accuracy when displaying dates, versions, or sequential numbers in Roman format matching design requirements.

**Game Development:** Historical strategy games, Roman-themed applications, or educational software display numbers in Roman numerals. In-game dates, chapter numbers, or achievement counts convert to Roman notation for thematic consistency. Conversion algorithms integrate into game engines rendering Roman numerals dynamically based on game state.

**Validation and Error Checking:** When accepting Roman numeral input (form fields, APIs, data imports), validation prevents malformed values. Invalid sequences like IIII (should be IV) or incorrect subtraction (IL for 49, should be XLIX) need detection. Conversion tools include validators catching syntax errors ensuring data integrity.

### Roman Numeral Rules and Syntax

**Basic Symbols:** Seven letters represent values: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Symbols combine forming numbers. Largest symbols first, decreasing left to right: MCXI = 1000+100+10+1 = 1111.

**Additive Notation:** Adjacent symbols add when large-to-small or equal: VI=5+1=6, XX=10+10=20, MDC=1000+500+100=1600. Straightforward concatenation of decreasing values.

**Subtractive Notation:** Smaller symbol before larger subtracts: IV=5-1=4, IX=10-1=9, XL=50-10=40, XC=100-10=90, CD=500-100=400, CM=1000-100=900. Only specific pairs valid (I before V/X, X before L/C, C before D/M). Prevents excessive repetition creating compact notation.

**Repetition Limits:** I, X, C, M repeat up to three times: III=3, XXX=30, CCC=300, MMM=3000. Prevents IIII (use IV), XXXX (use XL), CCCC (use CD). V, L, D never repeat (would exceed next symbol). Four of same symbol signals error - use subtraction instead.

**Valid Subtractions:** Only one smaller symbol precedes larger: IV valid, IIV invalid (use III). Can't subtract same symbol: VV invalid. Can't skip symbols: IC invalid for 99 (use XCIX). Limited subtractive pairs prevent ambiguity ensuring single valid representation per number.

### Roman Numeral Range and Limitations

**Standard Range:** Classical Roman numerals represent 1-3999. Upper limit is MMMCMXCIX (3999). Larger numbers historically used varied notation (overlines, parentheses) with no universal standard. Modern usage rarely exceeds 3999 - use Arabic numerals for larger values.

**No Zero:** Romans lacked zero concept. Roman numerals only represent positive integers. Zero introduced later by Indian mathematicians via Arabic numerals. Empty value expressed in words (nullus, nihil) not symbols. Modern applications requiring zero use Arabic 0, not Roman notation.

**Fractions:** Roman system used special symbols for fractions (S=1/2, rarely seen). Impractical for decimal values. Modern fraction display uses Arabic notation. Roman numerals suited whole number counting, not precise calculation.

This tool converts Arabic numbers (1-3999) to Roman numerals and vice versa. Validates Roman numeral syntax catching common errors. Explains conversion showing symbol breakdown. All conversion client-side - your numbers stay private.

### Common Conversion Patterns and Examples

**Years:** 2024 = MMXXIV (1000+1000+10+10+4). 1999 = MCMXCIX (1000+900+90+9 using subtractive notation). 1776 = MDCCLXXVI (1000+500+200+50+20+5+1).

**Small Numbers:** 4 = IV (subtractive), 9 = IX, 40 = XL, 90 = XC, 400 = CD, 900 = CM. Subtractive notation creates compact representation versus additive VIIII, LXXXX.

**Sequences:** I, II, III, IV, V, VI, VII, VIII, IX, X (1-10). Sequential conversion shows pattern: repetition up to three, then subtraction, then new symbol base.

**Chapter Numbers:** Chapter I, II, III, IV, V... Book outlines use Roman capitals for main divisions. Converting chapter counts to Roman maintains traditional formatting.`
  },

  useCases: [
    {
      title: "Generate Copyright Years in Roman Numerals",
      description: "Movie studios and publishers display copyright years using Roman numerals. Automatically convert current year to Roman format for footer generation, legal notices, or credits ensuring proper notation without manual transcription.",
      example: `// Automatic copyright year in Roman numerals
function getCurrentYearRoman() {
  const year = new Date().getFullYear();
  // Convert to Roman numeral (2026 → MMXXVI)
  return arabicToRoman(year);
}

function arabicToRoman(num) {
  const values = [
    1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
  ];
  const symbols = [
    'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL',
    'X', 'IX', 'V', 'IV', 'I'
  ];

  let result = '';
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }
  return result;
}

// Website footer component
function CopyrightNotice() {
  const romanYear = getCurrentYearRoman();
  return (
    <footer>
      <p>© {romanYear} Studio Name. All rights reserved.</p>
    </footer>
  );
}

// Output: © MMXXVI Studio Name. All rights reserved.
// Updates automatically each year`
    },
    {
      title: "Create Document Outline Numbering",
      description: "Technical documentation and legal documents use Roman numerals for section hierarchies. Generate outline numbers programmatically converting section indices to proper Roman notation for multi-level document structures.",
      example: `// Document outline generator
interface Section {
  title: string;
  subsections?: Section[];
}

function generateOutline(sections: Section[]) {
  let outline = '';

  sections.forEach((section, i) => {
    // Main sections: 1, 2, 3...
    const mainNum = i + 1;
    outline += \`\${mainNum}. \${section.title}\\n\`;

    if (section.subsections) {
      section.subsections.forEach((sub, j) => {
        // Subsections: I, II, III...
        const romanNum = arabicToRoman(j + 1);
        outline += \`  \${mainNum}.\${romanNum}. \${sub.title}\\n\`;
      });
    }
  });

  return outline;
}

const doc = [
  {
    title: "Introduction",
    subsections: [
      { title: "Background" },
      { title: "Purpose" },
      { title: "Scope" }
    ]
  },
  {
    title: "Requirements",
    subsections: [
      { title: "Functional" },
      { title: "Non-Functional" }
    ]
  }
];

console.log(generateOutline(doc));

// Output:
// 1. Introduction
//   1.I. Background
//   1.II. Purpose
//   1.III. Scope
// 2. Requirements
//   2.I. Functional
//   2.II. Non-Functional`
    },
    {
      title: "Build Roman Numeral Clock Display",
      description: "Classical clock faces use Roman numerals for hour markers. Convert hour values (1-12) to Roman numerals for watch apps, analog clock widgets, or luxury design interfaces maintaining traditional timepiece aesthetics.",
      example: `// React clock component with Roman numerals
function RomanClockFace() {
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Roman numeral hour markers
  const romanHours = hours.map(h => ({
    hour: h,
    roman: h === 12 ? 'XII' :
           h === 4 ? 'IIII' :  // Traditional watch notation
           arabicToRoman(h)
  }));

  return (
    <svg viewBox="0 0 200 200">
      {/* Clock circle */}
      <circle cx="100" cy="100" r="95" fill="ivory" stroke="black" />

      {/* Hour markers */}
      {romanHours.map((h, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x = 100 + 70 * Math.cos(angle);
        const y = 100 + 70 * Math.sin(angle);

        return (
          <text
            key={h.hour}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="14"
            fontFamily="serif"
          >
            {h.roman}
          </text>
        );
      })}

      {/* Clock hands would go here */}
    </svg>
  );
}

// Note: Traditional clocks use IIII instead of IV
// for symmetry with VIII across dial`
    },
    {
      title: "Validate Roman Numeral User Input",
      description: "Forms accepting Roman numerals (historical dates, chapter references) need validation. Check syntax rules preventing invalid sequences like IIII, IC, or VV. Provide helpful error messages guiding users to correct notation.",
      example: `// Roman numeral validation function
function validateRomanNumeral(input: string): {
  valid: boolean;
  error?: string;
  value?: number;
} {
  // Check for valid characters
  if (!/^[IVXLCDM]+$/.test(input)) {
    return {
      valid: false,
      error: 'Only letters I, V, X, L, C, D, M allowed'
    };
  }

  // Check repetition rules
  if (/I{4,}|X{4,}|C{4,}|M{4,}/.test(input)) {
    return {
      valid: false,
      error: 'Maximum 3 repetitions (use IV not IIII)'
    };
  }

  // Check invalid subtractions
  const invalidPatterns = [
    /IL/, /IC/, /ID/, /IM/,  // I can't subtract from L, C, D, M
    /XD/, /XM/,              // X can't subtract from D, M
    /VX/, /VL/, /VC/, /VD/, /VM/,  // V never subtracts
    /LD/, /LM/,              // L can't subtract from D, M
    /DM/                     // D can't subtract from M
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(input)) {
      return {
        valid: false,
        error: 'Invalid subtraction pattern'
      };
    }
  }

  // Try conversion - if successful, it's valid
  try {
    const value = romanToArabic(input);
    return { valid: true, value };
  } catch (e) {
    return {
      valid: false,
      error: 'Malformed Roman numeral'
    };
  }
}

// Usage in form validation
const userInput = "MCMXCIV";
const result = validateRomanNumeral(userInput);

if (result.valid) {
  console.log(\`Valid: \${userInput} = \${result.value}\`);
  // Output: Valid: MCMXCIV = 1994
} else {
  console.error(\`Error: \${result.error}\`);
}`
    }
  ],

  howToUse: {
    title: "How to Use the Roman Numeral Converter",
    content: `This tool provides bidirectional conversion between Arabic numbers (1-3999) and Roman numerals (I-MMMCMXCIX). Auto-detects input type converting instantly with syntax validation.

### Converting Arabic Numbers to Roman Numerals

Enter Arabic number (1-3999) in input field. Tool immediately converts to Roman numeral notation showing symbol breakdown. Conversion follows standard rules: largest symbols first, using subtractive notation (IV, IX, XL, XC, CD, CM) for compact representation.

Range limits: 1 (I) to 3999 (MMMCMXCIX). Numbers outside range show error - Roman numerals historically don't represent values above 3999 using standard notation. Zero and negative numbers are not representable in Roman system.

### Converting Roman Numerals to Arabic Numbers

Type Roman numeral using letters I, V, X, L, C, D, M (case-insensitive). Tool validates syntax checking repetition limits, valid subtraction pairs, and proper symbol order. Valid numerals convert to Arabic number showing numeric value.

Common errors caught: IIII (should be IV), VV (V never repeats), IC (invalid subtraction, use XCIX). Tool highlights errors explaining correct notation. Learning aid for understanding Roman numeral rules.

### Understanding Conversion Examples

**Basic Numbers:** 1=I, 2=II, 3=III, 5=V, 10=X, 50=L, 100=C, 500=D, 1000=M. Foundation symbols combine creating all values 1-3999.

**Subtractive Notation:** 4=IV (not IIII), 9=IX (not VIIII), 40=XL (not XXXX), 90=XC, 400=CD, 900=CM. Smaller symbol before larger subtracts, creating compact notation.

**Years:** 2024=MMXXIV (2000+20+4), 1999=MCMXCIX (1000+900+90+9), 1776=MDCCLXXVI (1000+500+200+50+20+5+1).

**Sequential:** I, II, III, IV, V, VI, VII, VIII, IX, X, XI... Pattern shows repetition-then-subtraction-then-new-symbol cycle.

### Validation and Error Detection

Tool validates Roman numeral input against syntax rules:

**Repetition:** I, X, C, M repeat max 3 times. V, L, D never repeat. IIII invalid (use IV). XXX valid (30). XXXX invalid (use XL).

**Subtraction Pairs:** Only specific pairs allowed: IV, IX, XL, XC, CD, CM. IC invalid for 99 (use XCIX). IL invalid for 49 (use XLIX). Can't skip symbols in subtraction.

**Symbol Order:** Large symbols before small (descending left-to-right) except valid subtraction pairs. XVI valid (10+5+1). IXV invalid (subtraction must be first). MDCL valid (1000+500+100+50). MDLC invalid (wrong order).

### Practical Applications

**Copyright Years:** Convert current year (2026) to Roman (MMXXVI) for legal notices, movie credits, publication dates.

**Chapter Numbering:** Convert chapter index to Roman for book outlines, academic papers, technical documentation using traditional formatting.

**UI Elements:** Generate Roman numerals for classical design themes, watch faces, monument inscriptions, luxury branding.

**Educational:** Learn Roman numeral system through interactive conversion. Understand additive and subtractive notation. Practice reading and writing historical dates.`,
    steps: [
      {
        name: "Enter Value",
        text: "Input Arabic number (1-3999) or Roman numeral (I-MMMCMXCIX). Tool auto-detects type converting instantly. Case-insensitive for Roman numerals."
      },
      {
        name: "View Conversion",
        text: "See instant bidirectional result. Arabic numbers become Roman numerals with symbol breakdown. Roman numerals become Arabic numbers with value display."
      },
      {
        name: "Check Validation",
        text: "Tool validates Roman numeral syntax checking repetition limits, subtraction rules, and symbol order. Errors highlighted with explanations guiding corrections."
      },
      {
        name: "Copy and Use",
        text: "Copy converted value for copyright notices, document numbering, UI elements, or educational purposes. Use in applications requiring classical numeral notation."
      }
    ]
  },

  faqs: [
    {
      question: "What's the largest number representable in Roman numerals?",
      answer: "Standard Roman numerals represent 1-3999 (MMMCMXCIX). Ancient Romans used varied notation for larger numbers (overlines, parentheses multiplying by 1000) but no universal standard exists. Modern usage rarely exceeds 3999 - use Arabic numerals for larger values. Historical texts show inconsistent large number notation making conversion ambiguous. This tool follows standard range (1-3999) matching contemporary usage in copyright years, chapter numbers, and formal documents."
    },
    {
      question: "Why do some clocks show IIII instead of IV?",
      answer: "Traditional clockmakers use IIII (not IV) for 4 on clock faces for visual symmetry and balance. IIII on left side balances VIII on right side (both use 4 characters). Historical clockmaking convention, not standard Roman notation. Some theories: easier to cast/engrave, avoids confusing IV with VI at glance, prevents Jupiter's name (IV in Latin) on sundials. Modern watches vary - luxury brands often use IIII maintaining tradition."
    },
    {
      question: "Can Roman numerals represent zero or negative numbers?",
      answer: "No, Roman numeral system only represents positive integers (1+). Zero concept didn't exist in Roman mathematics - introduced later by Indian mathematicians via Arabic numerals. Romans used words (nullus, nihil) for zero, not symbols. Negative numbers similarly absent from Roman notation. For applications requiring zero or negatives, use Arabic numeral system. Roman numerals suited whole number counting, not advanced arithmetic."
    },
    {
      question: "What are the rules for subtraction in Roman numerals?",
      answer: "Only specific pairs use subtractive notation: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900). Rules: I subtracts only from V or X. X subtracts only from L or C. C subtracts only from D or M. Only one smaller symbol precedes larger (IV valid, IIV invalid). Can't skip symbols (IC invalid for 99, use XCIX). Subtractive pair must appear first (IXV invalid, XVI valid). These rules ensure unique valid representation for each number."
    },
    {
      question: "How do I convert years like 1999 or 1444 to Roman numerals?",
      answer: "Break year into place values using subtractive notation where needed. 1999: 1000 (M) + 900 (CM) + 90 (XC) + 9 (IX) = MCMXCIX. 1444: 1000 (M) + 400 (CD) + 40 (XL) + 4 (IV) = MCDXLIV. Use converter tool for accuracy - manual conversion error-prone with subtractive notation. Start with largest symbols (M for 1000s), work down to smallest. Remember valid subtractive pairs (CM, CD, XC, XL, IX, IV) instead of repetition (DCCCC, CCCC, XXXX, IIII)."
    },
    {
      question: "Why can't some symbols repeat but others can?",
      answer: "Symbols for 1, 10, 100, 1000 (I, X, C, M) repeat up to three times: III (3), XXX (30), CCC (300), MMM (3000). Symbols for 5, 50, 500 (V, L, D) never repeat because doubling them would equal next symbol: VV (10) should be X, LL (100) should be C, DD (1000) should be M. Four repetitions (IIII, XXXX, CCCC) are invalid - use subtractive notation instead (IV, XL, CD). Three repetitions max prevent excessive symbol length while maintaining readability."
    },
    {
      question: "What's the difference between classical and medieval Roman numerals?",
      answer: "Classical Roman numerals (used in ancient Rome) used only additive notation - IIII for 4, VIIII for 9, XXXX for 40. Medieval scribes introduced subtractive notation (IV, IX, XL, XC, CD, CM) for compactness and clarity. Modern usage follows medieval convention with subtractive pairs. Some classical inscriptions use purely additive notation. For contemporary use (copyright years, documents), always use medieval subtractive notation matching international standard."
    },
    {
      question: "How do I validate Roman numeral input in my application?",
      answer: "Check: 1) Only valid letters (I, V, X, L, C, D, M). 2) Max 3 repetitions for I, X, C, M. 3) No repetitions of V, L, D. 4) Only valid subtraction pairs (IV, IX, XL, XC, CD, CM). 5) Proper symbol ordering (large-to-small except subtraction pairs). 6) No invalid subtractions (IC, IL, VX, etc.). Use regex for basic checks, then attempt conversion catching exceptions. This tool's validator provides reference implementation showing all rules. Invalid input should show helpful error explaining correction."
    },
    {
      question: "Can I use Roman numerals for fractions or decimals?",
      answer: "No, standard Roman numerals only represent whole numbers. Ancient Romans used special symbols for fractions (S=1/2, rarely seen) but system was impractical for decimal arithmetic. Modern fraction display uses Arabic notation (1/2, 0.5). Roman numerals excel at counting and sequencing whole numbers but fail at precise calculation. For any fractional or decimal values, use Arabic numerals. Reserve Roman numerals for whole number contexts (years, chapters, volumes)."
    },
    {
      question: "Is my data private when using this converter?",
      answer: "Absolutely. All Roman numeral conversion happens entirely in your browser using JavaScript arithmetic and string manipulation. Your numbers and numerals never upload to servers. No network requests are made with your data. Verify by checking browser DevTools Network tab showing zero outbound requests. Safe for converting confidential years, proprietary document numbers, or any private values. Tool works completely offline after page load. Your conversion history stays local and private."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your numbers never leave your browser. This Roman numeral converter operates entirely client-side using JavaScript mathematical operations and symbol mapping. Zero server uploads, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All conversions happen in your browser using local arithmetic and string manipulation. Your values stay on your device.
- **No Server Communication:** We don't have backend services processing conversions. The tool works completely offline after initial page load.
- **No Data Storage:** Your input numbers and converted numerals are not saved, logged, or transmitted anywhere. Refresh the page and it's gone.
- **No Value Tracking:** We don't track what you convert, number patterns, or any conversion-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your numbers.

Safe for converting copyright years, confidential document references, proprietary chapter numbers, or any private values requiring Roman numeral notation without privacy concerns.`
  },

  stats: {
    "Range": "1-3999",
    "Symbols": "7",
    "Processing": "Client-side",
    "Validation": "Full",
    "Data Upload": "0 bytes"
  }
};
