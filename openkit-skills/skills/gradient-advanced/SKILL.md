---
name: gradient-advanced
description: Generate advanced CSS gradients with multiple color stops, radial, or conic types. Use when the user asks to create a multi-stop gradient, conic gradient, radial gradient with custom center, or a gradient with more than two colors.
---

# Advanced CSS Gradient Generator

Generate complex CSS gradients — linear, radial, or conic — with multiple color stops, custom positions, and center coordinates.

## Input
- Gradient type: `linear` | `radial` | `conic` (default `linear`)
- Color stops: list of `{ color: HEX, position: 0-100 }` objects (minimum 2)
- For `linear`: angle in degrees 0–360 (default `135`)
- For `radial`: center X% and center Y% (default `50% 50%`)
- For `conic`: rotation angle 0–360 and center X% / Y% (default `0deg at 50% 50%`)
- Export format: `css` | `background-image` | `tailwind` (default `css`)

## Output
- CSS gradient string ready to paste
- Full CSS property declaration

## Instructions
1. Parse the user's request to identify type, color stops (sorted by position), and positional parameters.
2. Sort color stops by position (ascending).
3. Build the stops string: join each stop as `<color> <position>%` with `, `.
4. Compose the gradient function:
   - Linear: `linear-gradient(<angle>deg, <stops>)`
   - Radial: `radial-gradient(circle at <cx>% <cy>%, <stops>)`
   - Conic: `conic-gradient(from <angle>deg at <cx>% <cy>%, <stops>)`
5. Output based on requested format:
   - `css`: `background: <gradient>;`
   - `background-image`: `background-image: <gradient>;`
   - `tailwind`: `bg-[<gradient>]`
6. If the user mentions a preset name (Sunset Vibes, Ocean Breeze, Galaxy, Cosmic, etc.), use the matching preset values from the known preset list.

## Options
- `type`: `linear` | `radial` | `conic` — default `linear`
- `angle`: 0–360 — default `135` (linear) or `0` (conic)
- `centerX`: 0–100 — default `50`
- `centerY`: 0–100 — default `50`
- `stops`: array of color+position pairs — minimum 2 stops required
- `format`: `css` | `background-image` | `tailwind` — default `css`

## Examples

**Input:** "Linear gradient with 3 stops: red at 0%, yellow at 50%, teal at 100%, angle 135deg"
**Output:**
```css
background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%);
```

**Input:** "Conic gradient rainbow at center"
**Output:**
```css
background: conic-gradient(from 0deg at 50% 50%, #ef4444 0%, #f59e0b 14%, #eab308 28%, #22c55e 42%, #3b82f6 56%, #8b5cf6 70%, #ec4899 84%, #ef4444 100%);
```

**Input:** "Radial gradient blue to dark navy, center at 30% 40%"
**Output:**
```css
background: radial-gradient(circle at 30% 40%, #667eea 0%, #1e1b4b 100%);
```

## Error Handling
- If fewer than 2 color stops are provided, ask for at least 2 stops.
- If a stop position is outside 0–100, clamp to valid range.
- If color values are invalid, ask for valid CSS colors (HEX, rgb(), named).
- If type is unrecognized, default to `linear` and notify the user.
