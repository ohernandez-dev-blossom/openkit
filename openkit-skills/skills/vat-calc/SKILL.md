---
name: vat-calc
description: Calculate VAT (Value Added Tax) inclusive and exclusive amounts. Use when the user asks to add VAT to a price, remove VAT from a gross price, calculate tax amount, or compute net/gross amounts for any VAT rate or country.
---

# VAT Calculator

Calculate the net amount, VAT amount, and gross amount in either direction: add VAT to a net price, or extract VAT from a gross (VAT-inclusive) price.

## Input
- `amount` — the price to calculate from (required)
- `rate` — VAT percentage rate (required, e.g. 21 for 21%)
- `mode` — `add` (calculate gross from net) | `remove` (calculate net from gross) (default: add)

## Output
- Net amount (excluding VAT)
- VAT amount
- Gross amount (including VAT)

All values formatted to 2 decimal places.

## Instructions

### Mode: add (amount is the net price, excluding VAT)
```
vat = amount × (rate / 100)
gross = amount + vat
net = amount
```

### Mode: remove (amount is the gross price, including VAT)
```
net = amount / (1 + rate / 100)
vat = amount - net
gross = amount
```

### Formatting
- Round all results to 2 decimal places.
- Present as a table or labeled list.

### Country VAT rate presets
| Country     | Standard VAT Rate |
|-------------|-------------------|
| Spain       | 21%               |
| UK          | 20%               |
| Germany     | 19%               |
| France      | 20%               |
| Italy       | 22%               |
| Netherlands | 21%               |
| US (avg)    | ~8% (varies by state) |

## Options
- `amount` — numeric value (required)
- `rate` — percentage, e.g. 21 (required)
- `mode` — `add` | `remove` (default: add)
- `currency` — currency symbol for display (default: $)

## Examples

**Input:** amount=100, rate=21, mode=add

**Output:**
```
Net (excl. VAT):   $100.00
VAT (21%):         $21.00
Gross (incl. VAT): $121.00
```

**Input:** amount=121, rate=21, mode=remove

**Output:**
```
Net (excl. VAT):   $100.00
VAT (21%):         $21.00
Gross (incl. VAT): $121.00
```

**Input:** "Add 20% UK VAT to £500"

**Output:**
```
Net (excl. VAT):   £500.00
VAT (20%):         £100.00
Gross (incl. VAT): £600.00
```

**Input:** "What is the price without 19% German VAT for €238?"

**Output:**
```
Net (excl. VAT):   €200.00
VAT (19%):         €38.00
Gross (incl. VAT): €238.00
```

## Error Handling
- If the amount is missing or zero, ask for it.
- If the rate is missing, ask for the VAT rate or country.
- If the rate is > 100 or < 0, note that VAT rates are typically between 0 and 30% and ask for confirmation.
- If a country name is mentioned, use the preset rate from the table above.
