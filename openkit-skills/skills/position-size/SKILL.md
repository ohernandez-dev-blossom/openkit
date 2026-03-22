---
name: position-size
description: Calculate optimal position size based on account balance, risk percentage, entry price, and stop loss. Use when the user asks to calculate position size, how many shares to buy, how many units to trade, or how to size a trade with proper risk management.
---

# Position Size Calculator

Calculate how many units to trade so you never risk more than a set percentage of your account on a single trade.

## Input
- Account balance (dollars)
- Risk per trade (percentage of account, e.g. 2%)
- Entry price (dollars)
- Stop loss price (dollars)
- Trade direction: long (buy) or short (sell)

## Output
- Position size (units)
- Dollar risk (exact amount risked)
- Stop loss distance in points and as a percentage of entry
- Position value (total position in dollars)
- Position as a percentage of account
- Risk level assessment (Conservative <1%, Moderate 1-2%, Aggressive 2-5%, Dangerous >5%)

## Instructions
1. Calculate dollar risk: `dollarRisk = accountBalance * (riskPercent / 100)`
2. Calculate stop loss distance: `stopLossDistance = |entry - stopLoss|`
3. Calculate position size: `positionSize = dollarRisk / stopLossDistance`
4. Calculate position value: `positionValue = positionSize * entryPrice`
5. Calculate position as % of account: `positionPercent = (positionValue / accountBalance) * 100`
6. Calculate stop loss as % of entry: `stopLossPercent = (stopLossDistance / entryPrice) * 100`
7. Validate direction: for long trades, stop loss must be below entry; for short trades, stop loss must be above entry
8. Show all intermediate steps and final results

## Examples

Long trade:
- Account: $50,000 | Risk: 2% | Entry: $100 | Stop Loss: $95
- dollarRisk = $50,000 * 0.02 = $1,000
- stopLossDistance = |$100 - $95| = $5
- positionSize = $1,000 / $5 = 200 units
- positionValue = 200 * $100 = $20,000 (40% of account)
- Result: Buy 200 units, risking $1,000 (2% of account)

Short trade:
- Account: $25,000 | Risk: 1% | Entry: $50 | Stop Loss: $53
- dollarRisk = $25,000 * 0.01 = $250
- stopLossDistance = |$50 - $53| = $3
- positionSize = $250 / $3 = 83.33 units
- Result: Sell 83 units, risking $250 (1% of account)

## Error Handling
- Stop loss on wrong side of entry → report direction mismatch and explain the rule
- Account balance ≤ 0 → ask for a valid positive balance
- Risk % outside 0-100 → report invalid range
- Entry or stop loss ≤ 0 → ask for positive prices
- Risk > 5% → warn the user this is an aggressive/dangerous risk level
