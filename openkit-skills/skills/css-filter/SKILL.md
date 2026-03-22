---
name: css-filter
description: Generate CSS filter property code. Use when the user asks to apply a CSS filter, blur an image with CSS, adjust brightness or contrast with CSS, create a grayscale or sepia effect, or generate filter CSS.
---

# CSS Filter Generator

Generate a `filter` CSS property combining blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia, and drop-shadow functions.

## Input
- Any combination of filter functions with their values:
  - `blur`: 0–20 px (default off / `0`)
  - `brightness`: 0–200 % (default `100`)
  - `contrast`: 0–200 % (default `100`)
  - `grayscale`: 0–100 % (default `0`)
  - `hue-rotate`: 0–360 deg (default `0`)
  - `invert`: 0–100 % (default `0`)
  - `opacity`: 0–100 % (default `100`)
  - `saturate`: 0–200 % (default `100`)
  - `sepia`: 0–100 % (default `0`)
  - `drop-shadow`: x px, y px, blur px, color HEX (optional)

## Output
- `filter: <functions>;` CSS property
- Or `/* No filters applied */` if all values are at defaults

## Instructions
1. Parse the user's request for filter values. Apply defaults for unmentioned filters.
2. For each filter, only include it in the output if it differs from its default:
   - `blur` > 0 → `blur(<value>px)`
   - `brightness` ≠ 100 → `brightness(<value>%)`
   - `contrast` ≠ 100 → `contrast(<value>%)`
   - `grayscale` > 0 → `grayscale(<value>%)`
   - `hue-rotate` ≠ 0 → `hue-rotate(<value>deg)`
   - `invert` > 0 → `invert(<value>%)`
   - `opacity` ≠ 100 → `opacity(<value>%)`
   - `saturate` ≠ 100 → `saturate(<value>%)`
   - `sepia` > 0 → `sepia(<value>%)`
   - drop-shadow x/y/blur any non-zero → `drop-shadow(<x>px <y>px <blur>px <color>)`
3. Join all active filter functions with a space.
4. Output: `filter: <joined_functions>;`
5. If the user names a preset, use these values:
   - **vintage**: sepia 50%, contrast 85%, brightness 90%, saturate 80%
   - **noir**: grayscale 100%, contrast 120%, brightness 95%
   - **vivid**: saturate 150%, contrast 110%, brightness 105%
   - **warm**: hue-rotate 15deg, saturate 110%, brightness 105%
   - **cool**: hue-rotate 180deg, saturate 90%
   - **dreamy**: blur 1px, brightness 110%, saturate 120%, opacity 90%
   - **faded**: opacity 70%, contrast 80%, brightness 110%
   - **dramatic**: contrast 140%, brightness 90%, saturate 120%
   - **sunset**: hue-rotate 320deg, saturate 120%, brightness 105%, contrast 95%
   - **arctic**: hue-rotate 200deg, saturate 70%, brightness 110%, contrast 90%

## Options
- `blur`: 0–20 px — default `0`
- `brightness`: 0–200 % — default `100`
- `contrast`: 0–200 % — default `100`
- `grayscale`: 0–100 % — default `0`
- `hueRotate`: 0–360 deg — default `0`
- `invert`: 0–100 % — default `0`
- `opacity`: 0–100 % — default `100`
- `saturate`: 0–200 % — default `100`
- `sepia`: 0–100 % — default `0`
- `dropShadowX`: -50 to 50 px — default `0`
- `dropShadowY`: -50 to 50 px — default `0`
- `dropShadowBlur`: 0–50 px — default `0`
- `dropShadowColor`: HEX — default `#000000`

## Examples

**Input:** "Make an image look vintage"
**Output:**
```css
filter: sepia(50%) contrast(85%) brightness(90%) saturate(80%);
```

**Input:** "Blur 4px and reduce brightness to 70%"
**Output:**
```css
filter: blur(4px) brightness(70%);
```

**Input:** "Full grayscale with high contrast"
**Output:**
```css
filter: grayscale(100%) contrast(120%) brightness(95%);
```

**Input:** "Add a drop shadow: 5px right, 5px down, 10px blur, black"
**Output:**
```css
filter: drop-shadow(5px 5px 10px #000000);
```

## Error Handling
- If all filter values are at their defaults, output `/* No filters applied */` and ask the user to specify what effect they want.
- If a value is outside its valid range, clamp it and inform the user.
- If an invalid color is provided for drop-shadow, ask for a valid HEX or CSS color.
- Note: `filter: drop-shadow()` respects element transparency (unlike `box-shadow`). Clarify this if the user seems confused about the difference.
