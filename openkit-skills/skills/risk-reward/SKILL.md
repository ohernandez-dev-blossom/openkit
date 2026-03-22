---
name: risk-reward
description: Calculate risk/reward ratio, breakeven win rate, and expected value for a trade. Use when the user asks to calculate risk reward ratio, R:R, whether a trade is worth taking, breakeven win rate, or expected value per trade.
---

# Risk/Reward Calculator

Evaluate whether a trade setup is worth taking by calculating the ratio of potential profit to potential loss.

## Input
- Entry price
- Stop loss price
- Take profit price (one or multiple targets with allocation percentages)
- Trade direction: long (buy) or short (sell)
- Optional: account size and risk % for dollar sizing
- Optional: estimated win rate for expected value calculation

## Output
- Risk (distance from entry to stop loss)
- Reward (distance from entry to take profit)
- R:R ratio (reward / risk)
- Breakeven win rate (minimum win rate needed to be profitable)
- Expected value per trade (when win rate is provided)
- Dollar risk and potential profit (when account size is provided)
- R:R quality label: Excellent (≥3), Favorable (≥2), Moderate (≥1), Poor (<1)

## Instructions
1. Calculate risk: `risk = |entry - stopLoss|`
2. Calculate reward: `reward = |takeProfit - entry|`
3. Calculate R:R ratio: `rrRatio = reward / risk`
4. Calculate breakeven win rate: `breakevenWinRate = (1 / (1 + rrRatio)) * 100`
5. If win rate provided, calculate expected value: `EV = (winRate/100 * reward) - ((1 - winRate/100) * risk)`
6. If account size and risk % provided:
   - `dollarRisk = accountSize * (riskPercent / 100)`
   - `positionSize = dollarRisk / risk`
   - `dollarReward = positionSize * reward`
7. For multiple targets with allocation percentages, calculate weighted R:R:
   - `weightedRR = sum(allocation_i/100 * rr_i)` across all targets
8. Validate: for long trades, stop loss < entry < take profit; for short trades, take profit < entry < stop loss

## Examples

Basic calculation:
- Entry: $100 | Stop Loss: $95 | Take Profit: $110 (long)
- risk = |$100 - $95| = $5
- reward = |$110 - $100| = $10
- rrRatio = $10 / $5 = 2.0 (Favorable)
- breakevenWinRate = 1/(1+2) * 100 = 33.3%
- With 50% win rate: EV = 0.5*$10 - 0.5*$5 = +$2.50 per unit

With position sizing ($10,000 account, 2% risk):
- dollarRisk = $10,000 * 0.02 = $200
- positionSize = $200 / $5 = 40 units
- dollarReward = 40 * $10 = $400 potential profit

## Error Handling
- Stop loss on wrong side of entry → explain the direction rule and ask to correct
- Take profit on wrong side of entry → explain the direction rule and ask to correct
- Any price ≤ 0 → ask for positive values
- R:R < 1 → warn the user the trade risks more than it could gain and show breakeven win rate required
