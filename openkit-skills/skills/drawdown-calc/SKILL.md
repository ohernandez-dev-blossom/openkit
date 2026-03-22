---
name: drawdown-calc
description: Calculate drawdown percentage, dollar loss, and the recovery gain needed to return to peak. Use when the user asks to calculate drawdown, how much they need to recover from a loss, maximum drawdown impact, or how hard it is to recover from a percentage loss.
---

# Drawdown & Recovery Calculator

Calculate the impact of a drawdown on an account and the larger percentage gain required to return to the original peak balance.

## Input
- Starting (peak) balance in dollars
- Drawdown percentage (how much the account has fallen from peak)

## Output
- Current balance after drawdown (dollars)
- Dollar amount lost
- Recovery percentage needed to return to peak
- Scenario table: drawdown vs recovery required for common levels (10%-90%)

## Instructions
1. Calculate current balance: `currentBalance = startingBalance * (1 - drawdownPct / 100)`
2. Calculate dollar loss: `lostAmount = startingBalance * (drawdownPct / 100)`
3. Calculate recovery needed to return to peak:
   `recoveryNeeded = (startingBalance / currentBalance - 1) * 100`
   Equivalent to: `recoveryNeeded = (1 / (1 - drawdownPct/100) - 1) * 100`
4. Generate scenario table for standard drawdown levels (10%, 20%, 30%, ... 90%):
   - For each drawdown %: compute remaining balance and recovery needed
5. Show the asymmetry: a 50% loss requires a 100% gain to recover; a 90% loss requires a 900% gain

Key insight to communicate: losses and gains are not symmetric. A 50% drawdown requires a 100% gain to recover because you are starting from a smaller base.

## Examples

20% drawdown on $10,000:
- currentBalance = $10,000 * (1 - 0.20) = $8,000
- lostAmount = $10,000 * 0.20 = $2,000
- recoveryNeeded = (1 / (1 - 0.20) - 1) * 100 = (1/0.80 - 1) * 100 = 25%
- Result: Lost $2,000. Need +25% gain to return to $10,000.

50% drawdown on $50,000:
- currentBalance = $50,000 * 0.50 = $25,000
- lostAmount = $25,000
- recoveryNeeded = (1/0.50 - 1) * 100 = 100%
- Result: Lost $25,000. Need +100% gain just to break even.

Standard scenario table:
| Drawdown | Recovery Needed |
|----------|----------------|
| 10%      | 11.1%          |
| 20%      | 25.0%          |
| 30%      | 42.9%          |
| 40%      | 66.7%          |
| 50%      | 100.0%         |
| 60%      | 150.0%         |
| 70%      | 233.3%         |
| 80%      | 400.0%         |
| 90%      | 900.0%         |

## Error Handling
- Drawdown = 0% → no loss, no recovery needed
- Drawdown = 100% → account is wiped out, recovery is mathematically impossible (infinite gain needed)
- Drawdown > 100% or < 0% → invalid, ask for a value between 0 and 99%
- Starting balance ≤ 0 → ask for a positive balance
