---
name: loan-calc
description: Calculate monthly loan payments, total interest, and full amortization. Use when the user asks what their monthly mortgage payment will be, how much total interest they'll pay on a loan, what a car loan costs per month, or wants to compare loan terms.
---

# Loan Calculator

Calculate monthly payment, total paid, and total interest for a fixed-rate amortizing loan. Optionally generate a full amortization schedule.

## Input
- `principal` — loan amount (required)
- `rate` — annual interest rate as a percentage (required, e.g. 5.5 for 5.5%)
- `years` — loan term in years (required)

## Output
- Monthly payment
- Total amount paid
- Total interest paid
- Optionally: amortization schedule (month-by-month breakdown)

All values formatted to 2 decimal places.

## Instructions

### Formula

```
monthlyRate = (rate / 100) / 12
numPayments = years × 12

// Standard amortization formula
monthlyPayment = principal × monthlyRate × (1 + monthlyRate)^numPayments
                 ─────────────────────────────────────────────────────
                         (1 + monthlyRate)^numPayments − 1

totalPayment = monthlyPayment × numPayments
totalInterest = totalPayment − principal
```

**Edge case:** If `rate` is 0%, monthly payment = principal / numPayments (no interest division by zero).

### Amortization schedule (each month)
```
interestPayment = remainingBalance × monthlyRate
principalPayment = monthlyPayment − interestPayment
remainingBalance = remainingBalance − principalPayment
```

### Formatting
- Round all monetary values to 2 decimal places.
- Show monthly payment prominently.
- Present summary first; offer amortization schedule if requested.

### Loan presets
| Preset         | Term    | Example Rate |
|----------------|---------|--------------|
| Short mortgage | 15 years | 4.5%        |
| Mid mortgage   | 20 years | 5.0%        |
| Long mortgage  | 30 years | 5.5%        |

## Options
- `principal` — numeric loan amount (required)
- `rate` — annual interest rate as percentage (required)
- `years` — loan term in years (required)
- `currency` — currency symbol for display (default: $)
- `schedule` — whether to show full amortization table (default: false)

## Examples

**Input:** principal=200000, rate=5.5, years=30

**Output:**
```
Loan amount:     $200,000.00
Interest rate:   5.5% per year
Loan term:       30 years (360 payments)

Monthly payment: $1,135.58
Total paid:      $408,808.80
Total interest:  $208,808.80
```

**Input:** principal=25000, rate=6.5, years=5 (car loan)

**Output:**
```
Loan amount:     $25,000.00
Interest rate:   6.5% per year
Loan term:       5 years (60 payments)

Monthly payment: $487.65
Total paid:      $29,259.00
Total interest:  $4,259.00
```

**Input:** "What's the monthly payment on a $350,000 mortgage at 7% for 30 years?"

**Output:**
```
Loan amount:     $350,000.00
Interest rate:   7.0% per year
Loan term:       30 years (360 payments)

Monthly payment: $2,328.54
Total paid:      $838,274.40
Total interest:  $488,274.40
```

**Input:** "Compare 15-year vs 30-year for a $300,000 loan at 5%"

**Output:**
```
Loan amount: $300,000.00 at 5.0% annual interest

15-Year Mortgage:
  Monthly payment: $2,372.38
  Total paid:      $427,028.40
  Total interest:  $127,028.40

30-Year Mortgage:
  Monthly payment: $1,610.46
  Total paid:      $579,765.60
  Total interest:  $279,765.60

Choosing 15 years saves $152,737.20 in interest.
```

## Error Handling
- If `principal` is missing or zero, ask for the loan amount.
- If `rate` is missing, ask for the annual interest rate.
- If `years` is missing, ask for the loan term.
- If `rate` is 0, calculate with no interest: monthly payment = principal / (years × 12).
- If `rate` is negative or `principal` is negative, ask for valid positive values.
- If `years` is less than 1, ask for a term of at least 1 year.
- Note that rates are for illustration — actual rates depend on creditworthiness, lender, and market conditions.
