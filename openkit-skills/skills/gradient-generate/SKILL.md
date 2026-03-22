---
name: gradient-generate
description: Generate CSS linear or radial gradient code. Use when the user asks to create a gradient, generate a CSS gradient, make a background gradient, or produce gradient CSS code.
---

# CSS Gradient Generator

Generate `background: linear-gradient(...)` or `background: radial-gradient(...)` CSS code from two colors and an angle.

## Input
- Gradient type: `linear` (default) or `radial`
- Color 1: HEX color string (default `#3B82F6`)
- Color 2: HEX color string (default `#8B5CF6`)
- Angle: integer 0–360 degrees (default `135`, only applies to linear)

## Output
- CSS property: `background: <gradient>;`
- Tailwind CSS class equivalent

## Instructions
1. Parse the user's request for gradient type, two colors, and angle. Apply defaults for any missing values.
2. If type is `linear`, build: `linear-gradient(<angle>deg, <color1>, <color2>)`
3. If type is `radial`, build: `radial-gradient(circle, <color1>, <color2>)`
4. Output the CSS property line: `background: <gradient>;`
5. Output the Tailwind equivalent:
   - Linear: `bg-gradient-to-r from-[<color1>] to-[<color2>]` (note: angle is approximated with direction utilities, or use arbitrary value `bg-[linear-gradient(<angle>deg,<color1>,<color2>)]`)
   - Radial: `bg-[radial-gradient(circle,<color1>,<color2>)]`
6. Briefly explain what the gradient looks like.

## Options
- `type`: `linear` | `radial` — default `linear`
- `color1`: any valid CSS color — default `#3B82F6` (blue)
- `color2`: any valid CSS color — default `#8B5CF6` (purple)
- `angle`: 0–360 — default `135` (diagonal, top-left to bottom-right)

## Examples

**Input:** "Generate a linear gradient from red to orange at 90 degrees"
**Output:**
```css
background: linear-gradient(90deg, #ef4444, #f97316);
```
Tailwind: `bg-[linear-gradient(90deg,#ef4444,#f97316)]`

**Input:** "Radial gradient, blue center fading to dark navy"
**Output:**
```css
background: radial-gradient(circle, #3b82f6, #1e1b4b);
```
Tailwind: `bg-[radial-gradient(circle,#3b82f6,#1e1b4b)]`

## Error Handling
- If a color value is not a valid CSS color, ask the user to provide a valid HEX, RGB, or named color.
- If angle is outside 0–360, clamp it to the valid range.
- If type is unrecognized, default to `linear` and inform the user.
