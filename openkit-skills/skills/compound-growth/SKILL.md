---
name: compound-growth
description: Calculate compound growth projections with optional periodic contributions. Use when the user asks to calculate compound interest, compound growth, investment growth over time, future value, how money grows with reinvestment, or time to double money.
---

# Compound Growth Calculator

Project how an investment grows over time with compounding returns and optional regular contributions.

## Input
- Initial capital (starting amount in dollars)
- Rate of return per period (percentage, e.g. 5% per month)
- Number of periods (how many compounding periods to project)
- Compounding frequency: daily, weekly, monthly, quarterly, or yearly
- Periodic contribution (optional: additional amount added each period)

## Output
- Final value (with contributions)
- Final value (without contributions, pure compounding)
- Total contributions made (initial + all periodic)
- Total profit (final value minus total contributions)
- Profit percentage return
- Time to double (in periods): `ln(2) / ln(1 + r)`
- Rule of 72 approximation: `72 / ratePercent`
- Period-by-period breakdown table (up to reasonable number of rows)
- Milestones: when the balance reaches 2x, 5x, 10x the initial capital

## Instructions
1. Convert rate to decimal: `r = ratePercent / 100`
2. For each period i from 1 to periodsCount:
   - `growth = currentBalance * r`
   - `endBalance = currentBalance + growth + periodicContribution`
   - `currentBalance = endBalance`
3. Track cumulative contributions: `totalContributions = initialCapital + (periodicContribution * periodsCount)`
4. Calculate final metrics:
   - `totalProfit = finalValue - totalContributions`
   - `profitPercent = (totalProfit / totalContributions) * 100`
   - `timeToDouble = ln(2) / ln(1 + r)` (exact)
   - `ruleOf72 = 72 / ratePercent` (approximation)
5. For the no-contribution baseline: run same formula with periodicContribution = 0
6. Show period-by-period table with: period number, beginning balance, contribution, growth earned, ending balance
7. Note: This calculator uses per-period rate applied each period (not the standard `FV = PV * (1 + rate/n)^(n*t)` form — the rate entered IS the per-period rate)

## Examples

Monthly compounding, no contributions:
- Initial: $10,000 | Rate: 5% per month | Periods: 12
- Month 1: $10,000 * 0.05 = $500 growth → $10,500
- Month 2: $10,500 * 0.05 = $525 growth → $11,025
- Month 12: ≈ $17,958.56
- timeToDouble = ln(2)/ln(1.05) ≈ 14.2 months
- ruleOf72 = 72/5 = 14.4 months

With monthly contributions:
- Initial: $1,000 | Rate: 1% per month | Contribution: $100/month | Periods: 24
- Period 1: $1,000 * 0.01 = $10 growth + $100 contribution → $1,110
- Period 2: $1,110 * 0.01 = $11.10 growth + $100 contribution → $1,221.10
- After 24 months: final value ≈ $3,848.70
- Total contributions: $1,000 + (24 * $100) = $3,400
- Total profit: $3,848.70 - $3,400 = $448.70

Annual compounding:
- Initial: $50,000 | Rate: 8% per year | Periods: 10 years
- Final value ≈ $107,946.25
- timeToDouble = ln(2)/ln(1.08) ≈ 9.0 years

## Error Handling
- Initial capital ≤ 0 → ask for a positive starting amount
- Rate = 0% → no growth, final value equals total contributions
- Rate < 0 → this is a declining balance scenario; calculate it but flag clearly
- Periods = 0 → final value equals initial capital
- Very high rate or many periods producing astronomically large numbers → format with B/M/K suffixes for readability
