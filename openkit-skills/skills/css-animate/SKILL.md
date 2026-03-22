---
name: css-animate
description: Generate CSS @keyframes animation code. Use when the user asks to create a CSS animation, generate keyframes, animate an element with CSS, or produce animation CSS.
---

# CSS Animation Generator

Generate complete `@keyframes` + `animation` CSS code for custom element animations with transform, opacity, and color properties.

## Input
- Animation name: string (default `customAnimation`)
- Keyframes: list of `{ percentage: 0-100, properties: { translateX, translateY, rotate, scale, opacity, backgroundColor } }`
- Duration: number + unit (`s` or `ms`) (default `1s`)
- Timing function: `ease` | `linear` | `ease-in` | `ease-out` | `ease-in-out` | `cubic-bezier(...)` (default `ease`)
- Iteration count: number or `infinite` (default `1`)
- Direction: `normal` | `reverse` | `alternate` | `alternate-reverse` (default `normal`)
- Fill mode: `none` | `forwards` | `backwards` | `both` (default `none`)

## Output
- Complete `@keyframes` block
- `.animated-element` CSS rule with the `animation` shorthand

## Instructions
1. Parse the user's animation request. Identify all keyframes and settings.
2. For each keyframe, sorted by percentage ascending:
   a. Build transform functions from provided properties:
      - `translate(<translateX>px, <translateY>px)` if either is set
      - `rotate(<rotate>deg)` if non-zero
      - `scale(<scale>)` if not 1
      - Combine into: `transform: <transforms>;`
   b. Add `opacity: <value>;` if provided
   c. Add `background-color: <value>;` if provided
   d. Add any custom CSS string as-is
3. Format each keyframe block as:
   ```
     <percentage>% {
       <property>: <value>;
     }
   ```
4. Output the full CSS:
   ```css
   @keyframes customAnimation {
     <keyframe blocks>
   }

   .animated-element {
     animation: customAnimation <duration> <timing> <iterations> <direction> <fill-mode>;
   }
   ```
5. If the user mentions a preset, use the matching preset values:
   - **fade**: opacity 0→1, 1s ease-in-out
   - **slideIn**: translateX -100px + opacity 0 → 0px + opacity 1, 0.6s ease-out
   - **bounce**: translateY 0→-30px→0→-15px→0, 1s ease-in-out
   - **pulse**: scale 1→1.1→1, 1s ease-in-out infinite
   - **shake**: translateX 0→-10px→10px→-10px→0, 0.5s ease-in-out
   - **rotateIn**: rotate -180deg + scale 0.5 + opacity 0 → 0deg + scale 1 + opacity 1, 0.8s ease-out
   - **zoomIn**: scale 0 + opacity 0 → scale 1 + opacity 1, 0.6s ease-out

## Options
- `name`: animation name identifier — default `customAnimation`
- `duration`: number — default `1`
- `durationUnit`: `s` | `ms` — default `s`
- `timingFunction`: easing function — default `ease`
- `iterationCount`: number or `infinite` — default `1`
- `direction`: `normal` | `reverse` | `alternate` | `alternate-reverse` — default `normal`
- `fillMode`: `none` | `forwards` | `backwards` | `both` — default `none`

## Examples

**Input:** "Fade in animation"
**Output:**
```css
@keyframes customAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animated-element {
  animation: customAnimation 1s ease-in-out 1 normal none;
}
```

**Input:** "Bounce animation, infinite"
**Output:**
```css
@keyframes customAnimation {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(0px, -30px);
  }
  50% {
    transform: translate(0px, 0px);
  }
  75% {
    transform: translate(0px, -15px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

.animated-element {
  animation: customAnimation 1s ease-in-out infinite normal none;
}
```

## Error Handling
- If fewer than 2 keyframes are provided, ask the user for at least a start (0%) and end (100%) keyframe.
- If a percentage is outside 0–100, clamp it.
- If no properties are specified for a keyframe, omit that keyframe and note it was skipped.
- If an invalid timing function is given, default to `ease` and inform the user.
