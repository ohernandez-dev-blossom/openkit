---
name: percent-calc
description: Calculate percentages. Use when the user asks what percent of a number is, what percentage something represents, percentage change between two values, increase or decrease a number by a percentage, or any other percentage calculation.
---

# Percentage Calculator

Perform five types of percentage calculations: X% of Y, X is what % of Y, percent change, increase by %, and decrease by %.

## Input
- `type` — which calculation to perform (see types below)
- `value1` — first numeric input
- `value2` — second numeric input

## Output
- The label showing the formula used
- The result formatted to 2 decimal places (4 decimal places for very small results)

## Instructions

### Calculation Types

**1. `percentOf` — "What is X% of Y?"**
- label: `{value1}% of {value2}`
- formula: `result = (value1 / 100) × value2`
- Example: 25% of 200 → 50.00

**2. `whatPercent` — "X is what % of Y?"**
- label: `{value1} is what % of {value2}`
- formula: `result = (value1 / value2) × 100`
- Append `%` to result
- If value2 = 0, report division by zero error
- Example: 50 is what % of 200 → 25.00%

**3. `change` — "Percent change from X to Y"**
- label: `% change from {value1} to {value2}`
- formula: `result = ((value2 - value1) / value1) × 100`
- Append `%` to result
- Positive result = increase, negative result = decrease
- If value1 = 0, report division by zero error
- Example: % change from 100 to 150 → +50.00%

**4. `increase` — "X increased by Y%"**
- label: `{value1} + {value2}%`
- formula: `result = value1 + (value1 × value2 / 100)`
- Example: 200 increased by 25% → 250.00

**5. `decrease` — "X decreased by Y%"**
- label: `{value1} - {value2}%`
- formula: `result = value1 - (value1 × value2 / 100)`
- Example: 200 decreased by 25% → 150.00

### Determining the type from natural language

- "X% of Y" / "X percent of Y" / "what is X% of Y" → `percentOf`
- "X is what percent of Y" / "what percentage is X of Y" → `whatPercent`
- "percent change" / "% change" / "percentage change from X to Y" → `change`
- "increase by" / "add X%" / "raised by X%" → `increase`
- "decrease by" / "subtract X%" / "reduced by X%" / "discount" → `decrease`

### Formatting rules
- Format result to 2 decimal places
- For results < 0.01 and > 0, use 4 decimal places
- Add `%` suffix for `whatPercent` and `change` types
- For `change`, prefix positive results with `+` and negative results with `-`
- Use comma separators for thousands in inputs/outputs when ≥ 1,000

## Options
No configurable options — the type is determined from the user's request.

## Examples

**Request:** "What is 15% of 350?"

**Output:**
```
15% of 350 = 52.50
```

---

**Request:** "50 is what percent of 200?"

**Output:**
```
50 is what % of 200 = 25.00%
```

---

**Request:** "Percent change from 80 to 100"

**Output:**
```
% change from 80 to 100 = +25.00%
```
(This is an increase of 25%)

---

**Request:** "What is 320 increased by 12.5%?"

**Output:**
```
320 + 12.5% = 360.00
```

---

**Request:** "Decrease 500 by 30%"

**Output:**
```
500 - 30% = 350.00
```

---

**Request:** "What is 0.5% of 10000?"

**Output:**
```
0.5% of 10,000 = 50.00
```

## Error Handling
- Division by zero in `whatPercent` (value2 = 0): report "Cannot calculate: the total (denominator) is 0"
- Division by zero in `change` (value1 = 0): report "Cannot calculate: the starting value is 0 (division by zero)"
- Non-numeric inputs: report "Please provide valid numbers for both values"
- Ambiguous request (unclear which type): ask the user to clarify which calculation they want, listing the 5 options with examples
- Result is NaN or Infinity: report "The calculation produced an undefined result — please check your inputs"
