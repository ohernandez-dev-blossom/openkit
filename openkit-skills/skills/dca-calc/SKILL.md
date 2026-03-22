---
name: dca-calc
description: Calculate the average purchase price and performance of a dollar-cost averaging strategy across multiple buys. Use when the user asks to calculate DCA, average down, average purchase price, average buy price across multiple purchases, or dollar-cost averaging results.
---

# DCA (Dollar-Cost Averaging) Calculator

Calculate the average purchase price and portfolio performance when buying an asset multiple times at different prices.

## Input
- One or more purchase entries, each with:
  - Purchase price (price per unit at time of purchase)
  - Amount invested (dollars) OR units purchased (one can be derived from the other)
- Current market price (to calculate unrealized P&L)

## Output
- Average purchase price across all entries
- Total invested (sum of all dollar amounts)
- Total units held (sum of all units)
- Current portfolio value (totalUnits * currentPrice)
- Unrealized P&L in dollars: `currentValue - totalInvested`
- Unrealized P&L as percentage: `(unrealizedPnL / totalInvested) * 100`
- Running cumulative average after each purchase
- Best entry (lowest price) and worst entry (highest price) highlighted

## Instructions
1. For each entry, if amount and price are given, derive units: `units = amount / price`
2. If units and price are given, derive amount: `amount = price * units`
3. Process entries in order, accumulating:
   - `cumulativeUnits += entry.units`
   - `cumulativeInvested += entry.amount`
   - `cumulativeAverage = cumulativeInvested / cumulativeUnits`
4. Final average price: `avgPrice = totalInvested / totalUnits`
5. Current value: `currentValue = totalUnits * currentPrice`
6. Unrealized P&L: `unrealizedPnL = currentValue - totalInvested`
7. P&L percent: `pnlPercent = (unrealizedPnL / totalInvested) * 100`
8. Identify best entry (lowest price) and worst entry (highest price)
9. Show how the cumulative average changes after each new purchase

## Examples

Three Bitcoin purchases:
- Buy 1: Price $50,000 | Amount $1,000 → units = 0.02
- Buy 2: Price $40,000 | Amount $1,000 → units = 0.025
- Buy 3: Price $35,000 | Amount $1,000 → units = 0.02857
- totalUnits = 0.02 + 0.025 + 0.02857 = 0.07357 BTC
- totalInvested = $3,000
- avgPrice = $3,000 / 0.07357 = $40,783.46 per BTC
- Current price = $55,000:
  - currentValue = 0.07357 * $55,000 = $4,046.35
  - unrealizedPnL = $4,046.35 - $3,000 = +$1,046.35 (+34.88%)

Running cumulative average:
- After Buy 1: avg = $1,000 / 0.02 = $50,000
- After Buy 2: avg = $2,000 / 0.045 = $44,444.44
- After Buy 3: avg = $3,000 / 0.07357 = $40,783.46

Stock DCA:
- Buy 1: Price $100 | 10 shares → $1,000
- Buy 2: Price $80 | 10 shares → $800
- Buy 3: Price $90 | 10 shares → $900
- totalUnits = 30 shares | totalInvested = $2,700
- avgPrice = $2,700 / 30 = $90.00
- At current price $95: value = $2,850, P&L = +$150 (+5.56%)

## Error Handling
- Price = 0 for any entry → units cannot be calculated, ask for a valid price
- Amount = 0 and units = 0 → skip or ask for at least one of them
- Only one entry → still calculate correctly, note DCA works best with multiple entries
- Current price not provided → calculate average cost only, skip P&L
- Negative amounts or prices → ask for positive values
