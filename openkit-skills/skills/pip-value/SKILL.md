---
name: pip-value
description: Calculate the pip value for a forex currency pair given a lot size. Use when the user asks to calculate pip value, what is a pip worth, forex pip calculation, lot size pip value, or how much money is one pip for a given pair and lot size.
---

# Pip Value Calculator

Calculate the monetary value of one pip movement for a forex currency pair at a given lot size.

## Input
- Currency pair (e.g. EUR/USD, USD/JPY, GBP/JPY)
- Lot size (units of base currency): Standard=100,000 | Mini=10,000 | Micro=1,000 | Nano=100
- Account currency (default: USD)
- Exchange rate (current market rate for the pair; use approximate if not provided)

## Output
- Pip value in USD
- Pip value in account currency (if different from USD)
- Pip size used (0.0001 for most pairs, 0.01 for JPY pairs)
- Value per pip for standard, mini, micro, and nano lots

## Instructions

### Pip sizes
- Most pairs (EUR/USD, GBP/USD, USD/CHF, AUD/USD, USD/CAD, NZD/USD, EUR/GBP, etc.): `pipSize = 0.0001`
- JPY pairs (USD/JPY, EUR/JPY, GBP/JPY, etc.): `pipSize = 0.01`

### Pip value calculation
1. If quote currency is USD (e.g. EUR/USD, GBP/USD, AUD/USD, NZD/USD):
   - `pipValueUSD = lotSize * pipSize`
   - Example: EUR/USD standard lot: 100,000 * 0.0001 = $10.00 per pip
2. If base currency is USD (e.g. USD/JPY, USD/CHF, USD/CAD):
   - `pipValueUSD = (lotSize * pipSize) / exchangeRate`
   - Example: USD/JPY at 149.50, standard lot: (100,000 * 0.01) / 149.50 = $6.69 per pip
3. Cross pairs (neither USD, e.g. EUR/GBP, EUR/JPY, GBP/JPY):
   - Calculate pip in quote currency: `pipInQuote = lotSize * pipSize`
   - Convert quote currency to USD using its USD rate
   - Example: EUR/GBP, quote=GBP, GBP/USD=1.2650: pipValueUSD = 100,000 * 0.0001 * 1.2650 = $12.65
4. Convert to account currency if needed: `pipValueAccount = pipValueUSD / usdRateOfAccountCurrency`

### Common pip values (standard lot, approximate):
- EUR/USD: $10.00 per pip
- GBP/USD: $10.00 per pip
- USD/JPY (at ~149.50): ~$6.69 per pip
- AUD/USD: $10.00 per pip
- USD/CHF (at ~0.875): ~$11.43 per pip
- EUR/JPY (at ~162.20): ~$6.17 per pip

## Examples

EUR/USD, standard lot (100,000), account in USD:
- pipSize = 0.0001 (quote is USD)
- pipValue = 100,000 * 0.0001 = $10.00 per pip
- Mini lot: $1.00 | Micro: $0.10 | Nano: $0.01

USD/JPY at 149.50, mini lot (10,000), account in USD:
- pipSize = 0.01 (JPY pair)
- pipValue = (10,000 * 0.01) / 149.50 = 100 / 149.50 = $0.669 per pip
- Standard lot: $6.69 | Micro: $0.067 | Nano: $0.0067

GBP/JPY at 189.10, standard lot, account in USD:
- pipSize = 0.01 (JPY pair)
- Quote is JPY, convert to USD: 1 JPY = 1/149.50 USD ≈ 0.006689
- pipValue = 100,000 * 0.01 * 0.006689 = $6.689 per pip

## Error Handling
- Unrecognized currency pair → list supported pairs and ask for clarification or calculate with user-provided pipSize and rate
- Exchange rate = 0 or missing → use a reasonable approximate rate and note it is an estimate
- Lot size = 0 → ask for a positive lot size
- Unknown account currency → default to USD and note the assumption
