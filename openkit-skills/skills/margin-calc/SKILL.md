---
name: margin-calc
description: Calculate required margin, free margin, margin level, and liquidation price for a leveraged position. Use when the user asks to calculate margin required, how much margin do I need, liquidation price, leverage margin, free margin, or margin level for a trade.
---

# Margin & Leverage Calculator

Calculate the margin required to open a leveraged position, how much free margin remains, and at what price the position would be liquidated.

## Input
- Position size (units)
- Entry price (dollars per unit)
- Leverage (e.g. 10x, 50x, 100x)
- Account balance (dollars)
- Maintenance margin percentage (the minimum margin fraction before liquidation, default often 50%)

## Output
- Notional value (full position value without leverage)
- Required margin (collateral needed to open the position)
- Margin used as % of account
- Free margin (remaining available funds)
- Margin level (account equity / required margin * 100%)
- Liquidation price (long position price at which margin is fully consumed)
- Maximum position size available with current balance

## Instructions
1. Calculate notional value: `notionalValue = positionSize * entryPrice`
2. Calculate required margin: `requiredMargin = notionalValue / leverage`
3. Calculate margin used %: `marginUsedPct = (requiredMargin / accountBalance) * 100`
4. Calculate free margin: `freeMargin = max(0, accountBalance - requiredMargin)`
5. Calculate margin level: `marginLevel = (accountBalance / requiredMargin) * 100`
6. Calculate liquidation price (long position):
   - Loss to trigger liquidation: `lossToLiquidation = requiredMargin * (1 - maintenanceMarginPct / 100)`
   - `liquidationPrice = max(0, entryPrice - lossToLiquidation / positionSize)`
7. Calculate max position with current balance:
   - `maxPosition = (accountBalance * leverage) / entryPrice`
8. Safety thresholds for margin used %: Safe ≤30%, Caution ≤60%, Warning ≤80%, Danger >80%

## Examples

Long Bitcoin position:
- Position: 1 BTC | Entry: $50,000 | Leverage: 10x | Balance: $10,000 | Maintenance: 50%
- notionalValue = 1 * $50,000 = $50,000
- requiredMargin = $50,000 / 10 = $5,000
- marginUsedPct = ($5,000 / $10,000) * 100 = 50%
- freeMargin = $10,000 - $5,000 = $5,000
- marginLevel = ($10,000 / $5,000) * 100 = 200%
- lossToLiquidation = $5,000 * (1 - 50/100) = $2,500
- liquidationPrice = $50,000 - ($2,500 / 1) = $47,500
- maxPosition = ($10,000 * 10) / $50,000 = 2 BTC

Forex position:
- Position: 10,000 units | Entry: $1.2500 | Leverage: 50x | Balance: $1,000 | Maintenance: 50%
- notionalValue = 10,000 * $1.25 = $12,500
- requiredMargin = $12,500 / 50 = $250
- marginUsedPct = ($250 / $1,000) * 100 = 25% (Safe)
- freeMargin = $1,000 - $250 = $750
- lossToLiquidation = $250 * (1 - 0.50) = $125
- liquidationPrice = $1.2500 - ($125 / 10,000) = $1.2375

## Error Handling
- Leverage = 0 → invalid, ask for positive leverage value
- Account balance ≤ 0 → ask for a positive balance
- Required margin > account balance → warn the user they cannot open this position (insufficient funds)
- Entry price ≤ 0 or position size ≤ 0 → ask for positive values
- Maintenance margin ≥ 100% → invalid, ask for a realistic maintenance margin (typically 25-80%)
