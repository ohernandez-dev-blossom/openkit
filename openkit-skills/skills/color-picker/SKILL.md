---
name: color-picker
description: Convert colors between HEX, RGB, HSL, HSV, and CMYK formats. Use when the user asks to convert a color, get the RGB value of a hex color, find the HSL equivalent, or pick a color and get its CSS values.
---

# Color Picker / Converter

Convert a color from any format (HEX, RGB, HSL, HSV, CMYK) into all other formats, and output the CSS color values.

## Input
- A color in any of these formats:
  - HEX: `#RRGGBB` or `#RGB` (with or without `#`)
  - RGB: `rgb(R, G, B)` or three numbers `R G B`
  - HSL: `hsl(H, S%, L%)` or three numbers `H S L`
  - HSV: `H S V` three numbers
  - CMYK: `C M Y K` four numbers (0–100)
- Optional: alpha/opacity value 0–1 (for HEX output as `#RRGGBBAA`)

## Output
- HEX: `#RRGGBB`
- RGB: `rgb(R, G, B)`
- HSL: `hsl(H, S%, L%)`
- HSV: `hsv(H, S%, V%)`
- CMYK: `cmyk(C%, M%, Y%, K%)`
- CSS-ready values for copy-paste

## Instructions
1. Parse the user's color input and detect its format.
2. Convert to RGB as the intermediate representation:
   - **HEX → RGB**: extract pairs, parse base-16. For 3-digit: double each digit.
   - **HSL → RGB**: standard HSL-to-RGB conversion algorithm.
   - **HSV → RGB** (the tool uses HSV internally):
     - `h = H/360`, `s = S/100`, `v = V/100`
     - Compute sector: `i = floor(h*6)`, `f = h*6 - i`, `p = v*(1-s)`, `q = v*(1-f*s)`, `t = v*(1-(1-f)*s)`
     - Map by case: (r,g,b) per i%6 case
   - **CMYK → RGB**: `R = 255*(1-C/100)*(1-K/100)`, same for G and B
3. From RGB, compute all output formats:
   - **RGB → HEX**: each channel to 2-digit hex, uppercase
   - **RGB → HSL**:
     - Normalize R,G,B to 0–1
     - `L = (max + min) / 2`
     - `S = d / (1 - |2L - 1|)` where `d = max - min`
     - H from dominant channel
   - **RGB → HSV**:
     - `V = max`, `S = d / max`, H from dominant channel
   - **RGB → CMYK**:
     - `K = 1 - max(r,g,b)` (normalized)
     - `C = (1-r-K)/(1-K)`, same for M and Y
4. Output all five format values.
5. If alpha is provided, include `rgba(R, G, B, alpha)` and `hsla(H, S%, L%, alpha)` in the output, and hex as `#RRGGBBAA`.

## Options
- Input format: auto-detected
- `alpha`: 0–1 — optional, for transparent color output

## Examples

**Input:** "Convert #3B82F6 to all color formats"
**Output:**
- HEX: `#3b82f6`
- RGB: `rgb(59, 130, 246)`
- HSL: `hsl(217, 91%, 60%)`
- HSV: `hsv(217, 76%, 96%)`
- CMYK: `cmyk(76%, 47%, 0%, 4%)`

**Input:** "What is rgb(139, 92, 246) in HEX and HSL?"
**Output:**
- HEX: `#8b5cf6`
- HSL: `hsl(258, 89%, 66%)`

**Input:** "Convert HSL 135 53% 45% to RGB and HEX"
**Output:**
- HEX: `#35a34f`
- RGB: `rgb(53, 163, 79)`

**Input:** "Get CSS values for CMYK 0 100 100 0 (pure red)"
**Output:**
- HEX: `#ff0000`
- RGB: `rgb(255, 0, 0)`
- HSL: `hsl(0, 100%, 50%)`
- HSV: `hsv(0, 100%, 100%)`
- CMYK: `cmyk(0%, 100%, 100%, 0%)`

## Error Handling
- If the HEX value is not 3 or 6 digits (excluding `#`), ask for a valid HEX color.
- If RGB values are outside 0–255, clamp them and note the adjustment.
- If HSL hue is outside 0–360, normalize it modulo 360.
- If CMYK values are outside 0–100, clamp them.
- If the input format cannot be detected, ask the user to specify the format (HEX, RGB, HSL, HSV, or CMYK).
