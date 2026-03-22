---
name: color-convert
description: Convert colors between HEX, RGB, and HSL formats. Use when the user asks to convert a color, convert HEX to RGB, convert RGB to HSL, convert HSL to HEX, what is the RGB value of a color, or express a color in a different format.
---

# Color Converter

Convert a color between HEX (#RRGGBB), RGB (r, g, b), and HSL (h°, s%, l%) formats. All three representations are derived simultaneously from the input.

## Input
- A color value in one of the following formats:
  - HEX: `#RRGGBB` or `RRGGBB` (3-digit shorthand `#RGB` is also accepted)
  - RGB: `rgb(r, g, b)` or three numbers `r g b` (each 0–255)
  - HSL: `hsl(h, s%, l%)` or three numbers `h s l` (h: 0–360, s/l: 0–100)

## Output
- All three representations:
  - `HEX: #RRGGBB`
  - `RGB: rgb(R, G, B)`
  - `HSL: hsl(H, S%, L%)`

## Instructions

### HEX → RGB
1. Strip leading `#`.
2. Expand 3-digit shorthand: `#RGB` → `#RRGGBB` (double each digit).
3. Parse pairs as hex integers: `r = parseInt(hex[0..1], 16)`, etc.
4. Validate each channel is 0–255.

### RGB → HEX
1. Clamp each channel to 0–255 (integer).
2. Convert each to 2-digit hex, zero-padded: `r.toString(16).padStart(2, "0")`.
3. Concatenate with `#` prefix and uppercase: `#RRGGBB`.

### RGB → HSL
```
r′ = r/255, g′ = g/255, b′ = b/255
max = max(r′, g′, b′), min = min(r′, g′, b′)
L = (max + min) / 2

if max === min:
  H = 0, S = 0
else:
  d = max - min
  S = L > 0.5 ? d / (2 - max - min) : d / (max + min)
  switch max:
    case r′: H = ((g′ - b′) / d + (g′ < b′ ? 6 : 0)) / 6
    case g′: H = ((b′ - r′) / d + 2) / 6
    case b′: H = ((r′ - g′) / d + 4) / 6

H = round(H × 360), S = round(S × 100), L = round(L × 100)
```

### HSL → RGB
```
h′ = h/360, s′ = s/100, l′ = l/100

if s′ === 0:
  r = g = b = l′  (achromatic)
else:
  q = l′ < 0.5 ? l′ × (1 + s′) : l′ + s′ - l′ × s′
  p = 2 × l′ - q
  hue2rgb(p, q, t):
    if t < 0: t += 1
    if t > 1: t -= 1
    if t < 1/6: return p + (q-p) × 6 × t
    if t < 1/2: return q
    if t < 2/3: return p + (q-p) × (2/3 - t) × 6
    return p
  r = hue2rgb(p, q, h′ + 1/3)
  g = hue2rgb(p, q, h′)
  b = hue2rgb(p, q, h′ - 1/3)

R = round(r × 255), G = round(g × 255), B = round(b × 255)
```

### Conversion flow
- From HEX: HEX → RGB → HSL
- From RGB: RGB → HEX, RGB → HSL
- From HSL: HSL → RGB → HEX

## Options
None — all three formats are always output.

## Examples

**HEX input:**
Input: `#3B82F6`
Output:
- HEX: `#3B82F6`
- RGB: `rgb(59, 130, 246)`
- HSL: `hsl(217, 91%, 60%)`

**RGB input:**
Input: `rgb(255, 0, 0)`
Output:
- HEX: `#FF0000`
- RGB: `rgb(255, 0, 0)`
- HSL: `hsl(0, 100%, 50%)`

**HSL input:**
Input: `hsl(120, 100%, 50%)`
Output:
- HEX: `#00FF00`
- RGB: `rgb(0, 255, 0)`
- HSL: `hsl(120, 100%, 50%)`

**Black:**
Input: `#000000`
Output:
- HEX: `#000000`, RGB: `rgb(0, 0, 0)`, HSL: `hsl(0, 0%, 0%)`

**White:**
Input: `#FFFFFF`
Output:
- HEX: `#FFFFFF`, RGB: `rgb(255, 255, 255)`, HSL: `hsl(0, 0%, 100%)`

## Error Handling
- **Invalid HEX string:** Report `Invalid HEX color — expected format #RRGGBB or #RGB`.
- **RGB channel out of range:** Clamp to 0–255 and note the correction.
- **HSL out of range:** Clamp H to 0–360, S/L to 0–100 and note the correction.
- **Unrecognized format:** Ask the user to provide the color in HEX (#RRGGBB), RGB (rgb(r,g,b)), or HSL (hsl(h,s%,l%)) format.
