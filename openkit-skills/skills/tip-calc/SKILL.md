---
name: tip-calc
description: Calculate tips and split bills. Use when the user asks to calculate a tip, figure out how much to tip, split a bill, divide a restaurant check, calculate per-person cost, or work out gratuity.
---

# Tip Calculator

Calculate tip amount, total bill, and per-person cost when splitting.

## Input
- `bill` — the pre-tip bill amount (numeric, in dollars or any currency)
- `tipPercent` — tip percentage (default: 18)
- `people` — number of people splitting the bill (default: 1)

## Output
- Tip amount
- Total (bill + tip)
- Per-person total (if splitting)
- Per-person tip share (if splitting)

## Instructions

1. Parse `bill` as a decimal number. If not a valid number, report an error.
2. Parse `tipPercent` as an integer (0–100). Default to 18 if not specified.
3. Parse `people` as a positive integer. Default to 1 if not specified.

4. Calculate:
   ```
   tipAmount   = bill × (tipPercent / 100)
   total       = bill + tipAmount
   perPerson   = total / people
   tipPerPerson = tipAmount / people
   ```

5. Format all monetary values to 2 decimal places.

6. Display results:
   - Always show: Tip Amount, Total
   - If people > 1: also show Tip per person, Total per person

7. Common tip percentage presets for reference: 10%, 15%, 18%, 20%, 25%

## Options
- `tipPercent` — 0–100, integer percentage (default: 18)
- `people` — positive integer (default: 1)
- `currency` — currency symbol prefix (default: `$`)

## Examples

**Request:** "Calculate an 18% tip on a $85 bill"

**Output:**
```
Bill:        $85.00
Tip (18%):   $15.30
Total:       $100.30
```

---

**Request:** "Split a $120 dinner bill 4 ways with 20% tip"

**Output:**
```
Bill:              $120.00
Tip (20%):         $24.00
Total:             $144.00

Split 4 ways:
  Tip per person:  $6.00
  Each person pays: $36.00
```

---

**Request:** "How much is a 15% tip on $47.50, split between 3 people?"

**Output:**
```
Bill:              $47.50
Tip (15%):         $7.13
Total:             $54.63

Split 3 ways:
  Tip per person:  $2.38
  Each person pays: $18.21
```

---

**Request:** "No tip on a $30 bill split 2 ways"

**Output:**
```
Bill:              $30.00
Tip (0%):          $0.00
Total:             $30.00

Split 2 ways:
  Tip per person:  $0.00
  Each person pays: $15.00
```

## Error Handling
- Negative bill amount: report "Bill amount must be a positive number"
- `tipPercent` < 0 or > 100: report "Tip percentage must be between 0 and 100"
- `people` < 1: use 1 and note the adjustment
- Non-numeric bill input: report "Please provide a valid numeric bill amount"
- Very large bills (e.g., $1,000,000): calculate normally, format with comma thousands separators
