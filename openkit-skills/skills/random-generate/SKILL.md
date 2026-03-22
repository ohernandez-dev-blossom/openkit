---
name: random-generate
description: Generate random numbers within a range, roll dice, flip a coin, or pick lottery numbers. Use when the user asks for a random number, wants to roll dice (d6, d20), flip a coin, pick random items, or generate multiple unique random numbers.
---

# Random Number Generator

Generate one or more random integers within a specified range, with optional uniqueness constraint and preset shortcuts for common use cases.

## Input
- `min` — minimum value (inclusive, default: 1)
- `max` — maximum value (inclusive, default: 100)
- `count` — how many numbers to generate (default: 1)
- `unique` — whether numbers must be unique/non-repeating (default: false)

## Output
- The generated number(s)
- The range and parameters used

## Instructions

### Formula

**Single number:**
```
result = Math.floor(Math.random() × (max − min + 1)) + min
```

**Multiple numbers (non-unique):**
Repeat the formula `count` times independently.

**Multiple unique numbers:**
Use a Set. Draw numbers one at a time using the formula, add to Set, repeat until Set size equals `count`. This is equivalent to sampling without replacement.

**Constraint:** If `unique=true` and `count > (max − min + 1)`, that's impossible — error.

### Formatting
- For count=1: show the number prominently.
- For count>1: list all numbers, one per line or comma-separated.
- Always show the range used.

### Presets

| Preset      | min | max | count | unique | Description                        |
|-------------|-----|-----|-------|--------|------------------------------------|
| Coin Flip   | 0   | 1   | 1     | —      | 0 = Tails, 1 = Heads               |
| Dice (d6)   | 1   | 6   | 1     | —      | Standard six-sided die             |
| Dice (d20)  | 1   | 20  | 1     | —      | Twenty-sided die                   |
| Lottery     | 1   | 49  | 6     | true   | 6 unique numbers from 1–49         |
| Percentage  | 0   | 100 | 1     | —      | Random percentage                  |

Recognize these presets by natural language (e.g., "roll a d6", "flip a coin", "lottery numbers").

## Options
- `min` — integer (default: 1)
- `max` — integer (default: 100)
- `count` — integer ≥ 1 (default: 1)
- `unique` — boolean (default: false)

## Examples

**Input:** "Give me a random number between 1 and 100"

**Output:**
```
Range: 1–100
Result: 42
```

**Input:** "Roll a d6"

**Output:**
```
🎲 d6 roll (1–6)
Result: 5
```

**Input:** "Flip a coin"

**Output:**
```
Coin flip: Heads
(0 = Tails, 1 = Heads → rolled 1)
```

**Input:** "Give me 5 random numbers between 10 and 50"

**Output:**
```
Range: 10–50 | Count: 5
Results: 23, 41, 17, 38, 12
```

**Input:** "Pick 6 unique lottery numbers from 1 to 49"

**Output:**
```
Lottery draw (1–49, 6 unique numbers):
7, 14, 22, 31, 38, 45
```

**Input:** "Roll a d20"

**Output:**
```
🎲 d20 roll (1–20)
Result: 17
```

**Input:** min=1, max=10, count=3, unique=true

**Output:**
```
Range: 1–10 | Count: 3 | Unique: yes
Results: 4, 9, 2
```

## Error Handling
- If `min` > `max`, swap them silently or ask for clarification.
- If `count` < 1, default to 1 and note it.
- If `unique=true` and `count > (max − min + 1)`, return an error: "Cannot generate N unique numbers in range [min, max] — only X values exist."
- If `count` is very large (> 1000), warn that displaying many numbers may be verbose and confirm before proceeding.
- Note that these are pseudo-random numbers suitable for casual use, not cryptographic purposes.
