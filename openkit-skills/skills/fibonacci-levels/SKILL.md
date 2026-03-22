---
name: fibonacci-levels
description: Calculate Fibonacci retracement and extension levels from a price swing. Use when the user asks to calculate Fibonacci levels, Fib retracements, Fib extensions, support/resistance levels from a swing high and low, or golden ratio levels for trading.
---

# Fibonacci Levels Calculator

Calculate Fibonacci retracement and extension price levels from a swing high and swing low to identify potential support, resistance, and target zones.

## Input
- Swing High price
- Swing Low price (must be less than swing high)
- Direction: uptrend (retracements are below the high) or downtrend (retracements are above the low)

## Output
Retracement levels (7 levels):
- 0%, 23.6%, 38.2%, 50%, 61.8%, 78.6%, 100%

Extension levels (4 levels):
- 127.2%, 161.8%, 200%, 261.8%

Each level shows the price and the ratio.

## Instructions
1. Validate: swingHigh must be strictly greater than swingLow
2. Calculate range: `range = swingHigh - swingLow`
3. For uptrend (price pulled back from high, expecting continuation up):
   - Retracement price: `price = swingHigh - (range * ratio)`
   - Extension price: `price = swingHigh - (range * ratio)` (these go below 0% level)
4. For downtrend (price bounced from low, expecting continuation down):
   - Retracement price: `price = swingLow + (range * ratio)`
   - Extension price: `price = swingLow + (range * ratio)`
5. Ratios to use:
   - Retracements: 0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.0
   - Extensions: 1.272, 1.618, 2.0, 2.618
6. Present levels sorted from highest to lowest price
7. Highlight the key levels: 61.8% (golden ratio), 38.2%, and 50% as most significant

## Examples

Uptrend retracement (EUR/USD):
- Swing High: 1.2500 | Swing Low: 1.2000 | Direction: Uptrend
- range = 1.2500 - 1.2000 = 0.0500
- 0% → 1.2500 - (0.0500 * 0) = 1.2500
- 23.6% → 1.2500 - (0.0500 * 0.236) = 1.2382
- 38.2% → 1.2500 - (0.0500 * 0.382) = 1.2309
- 50% → 1.2500 - (0.0500 * 0.500) = 1.2250
- 61.8% → 1.2500 - (0.0500 * 0.618) = 1.2191 (golden ratio - key level)
- 78.6% → 1.2500 - (0.0500 * 0.786) = 1.2107
- 100% → 1.2500 - (0.0500 * 1.000) = 1.2000
- 127.2% ext → 1.2500 - (0.0500 * 1.272) = 1.1864
- 161.8% ext → 1.2500 - (0.0500 * 1.618) = 1.1691

Stock downtrend:
- Swing High: $150 | Swing Low: $100 | Direction: Downtrend
- range = $50
- 23.6% → $100 + ($50 * 0.236) = $111.80
- 38.2% → $100 + ($50 * 0.382) = $119.10
- 50% → $100 + ($50 * 0.500) = $125.00
- 61.8% → $100 + ($50 * 0.618) = $130.90 (key resistance)

## Error Handling
- Swing High ≤ Swing Low → report that high must be greater than low
- Missing either price → ask for both swing high and swing low
- Negative prices → ask for positive price values
