---
name: contrast-check
description: Check WCAG color contrast ratio between two colors. Use when the user asks to check color contrast, verify accessibility of text colors, calculate contrast ratio, or test WCAG AA or AAA compliance.
---

# WCAG Color Contrast Checker

Calculate the contrast ratio between a foreground and background color using the WCAG 2.0 formula, and report AA/AAA pass/fail status.

## Input
- Foreground color: HEX (e.g., `#000000`)
- Background color: HEX (e.g., `#FFFFFF`)

## Output
- Contrast ratio (rounded to 2 decimal places, format: `X.XX:1`)
- Pass/fail status for all 4 WCAG levels:
  - AA Normal Text (≥ 4.5:1)
  - AA Large Text (≥ 3:1)
  - AAA Normal Text (≥ 7:1)
  - AAA Large Text (≥ 4.5:1)

## Instructions
1. Parse both HEX colors. Strip the leading `#` and extract R, G, B as base-16 integers.
2. For each color, compute the **relative luminance** (WCAG formula):
   a. Linearize each channel: `c_sRGB = channel / 255`
   b. If `c_sRGB <= 0.03928`: `c = c_sRGB / 12.92`
   c. Else: `c = ((c_sRGB + 0.055) / 1.055) ^ 2.4`
   d. Luminance: `L = 0.2126 * R + 0.7152 * G + 0.0722 * B`
3. Compute the **contrast ratio**:
   - Let `L1 = max(lum1, lum2)`, `L2 = min(lum1, lum2)`
   - `ratio = (L1 + 0.05) / (L2 + 0.05)`
4. Report pass/fail for each WCAG level:
   - **AA Normal Text**: passes if ratio ≥ 4.5 (body text, ≤14pt)
   - **AA Large Text**: passes if ratio ≥ 3.0 (large text ≥18pt, or ≥14pt bold)
   - **AAA Normal Text**: passes if ratio ≥ 7.0 (enhanced body text)
   - **AAA Large Text**: passes if ratio ≥ 4.5 (enhanced large text)
5. Add a plain-language accessibility verdict:
   - ≥ 7.0: "Excellent — passes all WCAG levels"
   - 4.5–7.0: "Good — passes AA for all text, AAA for large text"
   - 3.0–4.5: "Marginal — passes AA for large text only; fails for normal text"
   - < 3.0: "Poor — fails all WCAG levels"
6. If the pair fails AA Normal Text, suggest that the foreground color should be darkened (on light backgrounds) or lightened (on dark backgrounds) to achieve at least 4.5:1.

## Options
- `foreground`: HEX color — required
- `background`: HEX color — required

**Known presets for quick reference:**
- Black on White: 21:1 (passes everything)
- White on Black: 21:1 (passes everything)
- Blue #0066CC on White: ~7.17:1 (passes AAA)
- Dark Gray #333333 on Light #F5F5F5: ~10.4:1

## Examples

**Input:** "Check contrast between #000000 (black text) and #FFFFFF (white background)"
**Output:**
Contrast ratio: **21.00:1**
- AA Normal Text (≥4.5:1): PASS
- AA Large Text (≥3:1): PASS
- AAA Normal Text (≥7:1): PASS
- AAA Large Text (≥4.5:1): PASS

Verdict: Excellent — passes all WCAG levels.

**Input:** "Is #777777 text on #FFFFFF accessible?"
**Output:**
Contrast ratio: **4.48:1**
- AA Normal Text (≥4.5:1): FAIL (just below threshold)
- AA Large Text (≥3:1): PASS
- AAA Normal Text (≥7:1): FAIL
- AAA Large Text (≥4.5:1): FAIL

Verdict: Marginal — passes AA for large text only. For body text, darken the foreground to at least #757575 or use #6B6B6B to reliably pass AA Normal.

**Input:** "Contrast ratio for #FF0000 on #FFFFFF"
**Output:**
Contrast ratio: **3.99:1**
- AA Normal Text (≥4.5:1): FAIL
- AA Large Text (≥3:1): PASS
- AAA Normal Text (≥7:1): FAIL
- AAA Large Text (≥4.5:1): FAIL

Verdict: Marginal — only suitable for large text at the AA level. For body text, use a darker red such as #CC0000 (4.63:1).

## Error Handling
- If either color is not a valid 6-digit HEX, ask the user to provide a valid HEX color (e.g., `#RRGGBB`).
- If the user provides a named color (e.g., "red"), convert it to its HEX equivalent before calculating.
- If the user asks about opacity or semi-transparent colors, note that WCAG contrast is defined for solid (opaque) colors only; compute the effective blended color if a background is known.
