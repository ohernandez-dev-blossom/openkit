---
name: kelly-criterion
description: Calculate the optimal bet or position size using the Kelly Criterion formula. Use when the user asks about Kelly Criterion, optimal bet size, Kelly formula, how much to bet given a win rate, half Kelly, or quarter Kelly sizing.
---

# Kelly Criterion Calculator

Calculate the mathematically optimal fraction of capital to risk on each trade or bet to maximize long-term growth rate.

## Input
- Win rate (percentage of trades that are profitable, e.g. 55%)
- Average win (average profit per winning trade in dollars)
- Average loss (average loss per losing trade in dollars, positive number)
- Account balance (optional, for dollar amounts)

## Output
- Full Kelly percentage (optimal fraction of capital to risk)
- Half Kelly percentage (recommended conservative sizing = Full Kelly / 2)
- Quarter Kelly percentage (very conservative = Full Kelly / 4)
- Dollar amounts for each Kelly fraction (if balance provided)
- Expected value per trade
- Payoff ratio (avgWin / avgLoss)
- Warning if edge is negative (do not trade)
- Warning if Full Kelly exceeds 25% (dangerously aggressive)

## Instructions
1. Convert win rate to decimal: `p = winRate / 100`
2. Calculate loss probability: `q = 1 - p`
3. Calculate payoff ratio: `b = avgWin / avgLoss`
4. Calculate Full Kelly: `fullKelly = (b * p - q) / b`
   - Simplified: `fullKelly = p - (q / b)` = `p - ((1-p) / (avgWin/avgLoss))`
5. If fullKelly < 0, the system has a negative edge — do not trade
6. Clamp to zero for half/quarter calculations: `clampedKelly = max(0, fullKelly)`
7. Half Kelly: `halfKelly = clampedKelly / 2`
8. Quarter Kelly: `quarterKelly = clampedKelly / 4`
9. Dollar amounts: `dollars = fraction * accountBalance`
10. Expected value: `EV = p * avgWin - q * avgLoss`
11. If fullKelly > 0.25 (25%), warn that this is dangerously aggressive

Practical note: Most professional traders use Half Kelly or Quarter Kelly in practice because Full Kelly leads to high variance and large drawdowns even when mathematically optimal.

## Examples

Profitable system:
- Win rate: 55% | Avg win: $200 | Avg loss: $100 | Balance: $10,000
- p = 0.55, q = 0.45, b = 200/100 = 2.0
- fullKelly = (2.0 * 0.55 - 0.45) / 2.0 = (1.10 - 0.45) / 2.0 = 0.65 / 2.0 = 32.5%
- halfKelly = 32.5% / 2 = 16.25% → $1,625
- quarterKelly = 32.5% / 4 = 8.125% → $812.50
- EV = 0.55 * $200 - 0.45 * $100 = $110 - $45 = +$65 per trade

Marginal system:
- Win rate: 40% | Avg win: $300 | Avg loss: $100
- p = 0.40, q = 0.60, b = 3.0
- fullKelly = (3.0 * 0.40 - 0.60) / 3.0 = (1.20 - 0.60) / 3.0 = 0.60/3.0 = 20%
- halfKelly = 10%, quarterKelly = 5%
- EV = 0.40 * $300 - 0.60 * $100 = $120 - $60 = +$60 per trade

Negative edge:
- Win rate: 40% | Avg win: $100 | Avg loss: $200
- fullKelly = (0.5 * 0.40 - 0.60) / 0.5 = (0.20 - 0.60) / 0.5 = -0.80 → Negative edge, do not trade
- EV = 0.40 * $100 - 0.60 * $200 = $40 - $120 = -$80 per trade

## Error Handling
- Win rate = 0% or 100% → edge case, report that neither extreme is realistic
- Avg loss = 0 → division by zero, ask for a positive loss amount
- Negative win rate or > 100% → invalid, ask for a value between 0 and 100
- Negative edge (fullKelly < 0) → clearly state the system loses money on average and should not be traded
- fullKelly > 25% → warn this is extremely aggressive and strongly recommend Half Kelly or Quarter Kelly
