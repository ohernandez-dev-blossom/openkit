---
name: discount-calc
description: Calculate discounted price and savings amount. Use when the user asks how much something costs after a discount, what the savings are for a percentage off, or wants to apply a sale percentage to an original price.
---

# Discount Calculator

Calculate the final price and savings amount after applying a percentage discount to an original price.

## Input
- `original_price` — the original price before discount (required)
- `discount_percent` — the discount percentage (required, e.g. 20 for 20% off)

## Output
- Original price
- Discount percentage
- Discount amount (savings)
- Final price after discount

All values formatted to 2 decimal places.

## Instructions

### Formula
```
discountAmount = originalPrice × (discountPercent / 100)
finalPrice = originalPrice - discountAmount
```

### Formatting
- Round all monetary values to 2 decimal places.
- Show the discount amount as savings.
- Present as a labeled list or table.

### Discount presets
Common discount percentages for quick reference: 5%, 10%, 15%, 20%, 25%, 30%, 40%, 50%, 60%, 70%, 80%, 90%

## Options
- `original_price` — numeric value (required)
- `discount_percent` — percentage value (required)
- `currency` — currency symbol for display (default: $)

## Examples

**Input:** original_price=100, discount_percent=20

**Output:**
```
Original price:  $100.00
Discount:        20% off
You save:        -$20.00
Final price:     $80.00
```

**Input:** original_price=249.99, discount_percent=30

**Output:**
```
Original price:  $249.99
Discount:        30% off
You save:        -$75.00
Final price:     $174.99
```

**Input:** "How much is a $59.99 item with 15% off?"

**Output:**
```
Original price:  $59.99
Discount:        15% off
You save:        -$9.00
Final price:     $51.00 (rounded from $50.992)
```

**Input:** "50% off $1,200"

**Output:**
```
Original price:  $1,200.00
Discount:        50% off
You save:        -$600.00
Final price:     $600.00
```

## Error Handling
- If `original_price` is missing or zero, ask for it.
- If `discount_percent` is missing, ask for the discount percentage.
- If `discount_percent` is 0, show that no discount is applied and final price equals original price.
- If `discount_percent` is 100, the final price is $0.00 — note the item is free.
- If `discount_percent` > 100, ask for clarification (discounts above 100% are not valid).
- If `original_price` is negative, ask for a valid positive price.
