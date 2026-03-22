---
name: shadow-generate
description: Generate CSS box-shadow code. Use when the user asks to create a box shadow, generate shadow CSS, make a drop shadow, or produce an inset shadow.
---

# CSS Box Shadow Generator

Generate `box-shadow` CSS from horizontal/vertical offsets, blur, spread, color, opacity, and inset flag.

## Input
- Horizontal offset: integer -50 to 50 px (default `5`)
- Vertical offset: integer -50 to 50 px (default `5`)
- Blur radius: integer 0–100 px (default `15`)
- Spread radius: integer -50 to 50 px (default `0`)
- Color: HEX color (default `#000000`)
- Opacity: integer 0–100 % (default `25`)
- Inset: boolean (default `false`)

## Output
- CSS property: `box-shadow: <value>;`
- Tailwind CSS class equivalent

## Instructions
1. Parse the user's request for all shadow parameters, applying defaults for any missing values.
2. Convert the HEX color and opacity to `rgba()`:
   - Extract R, G, B from hex (2 chars each, parse as base-16)
   - Alpha = opacity / 100
   - Format: `rgba(R, G, B, alpha)`
3. Build the shadow value string:
   - If inset: prefix with `inset `
   - Format: `[inset ]<horizontal>px <vertical>px <blur>px <spread>px rgba(R, G, B, alpha)`
4. Output: `box-shadow: <shadow_value>;`
5. Output Tailwind class: `shadow-[<inset_>horizontal_vertical_blur_spread_rgba(...)]`
   - Replace spaces in rgba with empty (no spaces in Tailwind arbitrary values)
   - Replace spaces between values with `_`
6. Mention the visual effect (e.g., "soft drop shadow below and to the right").

## Options
- `horizontal`: -50 to 50 — default `5`
- `vertical`: -50 to 50 — default `5`
- `blur`: 0 to 100 — default `15`
- `spread`: -50 to 50 — default `0`
- `color`: HEX — default `#000000`
- `opacity`: 0 to 100 — default `25`
- `inset`: true | false — default `false`

**Quick Presets:**
- Soft: `0px 4px 15px 0px rgba(0,0,0,0.10)`
- Hard: `5px 5px 0px 0px rgba(0,0,0,0.30)`
- Glow: `0px 0px 20px 5px rgba(0,0,0,0.40)`

## Examples

**Input:** "Soft shadow below a card"
**Output:**
```css
box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.10);
```
Tailwind: `shadow-[0px_4px_15px_0px_rgba(0,0,0,0.10)]`

**Input:** "Inset shadow, 8px horizontal, 8px vertical, 20px blur, blue color #3b82f6 at 50% opacity"
**Output:**
```css
box-shadow: inset 8px 8px 20px 0px rgba(59, 130, 246, 0.50);
```
Tailwind: `shadow-[inset_8px_8px_20px_0px_rgba(59,130,246,0.50)]`

**Input:** "Glow effect, no offset, 25px blur, 8px spread, purple #8b5cf6 at 60% opacity"
**Output:**
```css
box-shadow: 0px 0px 25px 8px rgba(139, 92, 246, 0.60);
```

## Error Handling
- If any numeric value is outside its valid range, clamp it and inform the user.
- If the HEX color is invalid, ask for a valid 6-digit HEX color.
- If the user provides a named color (e.g., "red"), convert it to its HEX equivalent before processing.
