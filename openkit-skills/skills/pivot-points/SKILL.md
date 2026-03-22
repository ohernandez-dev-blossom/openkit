---
name: pivot-points
description: Calculate pivot points and support/resistance levels from OHLC price data. Use when the user asks to calculate pivot points, S1 S2 S3 R1 R2 R3, daily pivot levels, standard pivot, Woodie, Camarilla, Fibonacci, or DeMark pivot points.
---

# Pivot Points Calculator

Calculate key support and resistance levels for the next trading session using yesterday's Open, High, Low, and Close prices.

## Input
- Open (O): previous period's opening price
- High (H): previous period's highest price
- Low (L): previous period's lowest price
- Close (C): previous period's closing price
- Method: Standard, Fibonacci, Camarilla, Woodie, or DeMark

## Output
- Pivot Point (PP)
- Resistance levels: R1, R2, R3
- Support levels: S1, S2, S3
- (DeMark only has PP, R1, S1)

## Instructions

### Standard Method (most common)
1. `PP = (H + L + C) / 3`
2. `R1 = 2 * PP - L`
3. `R2 = PP + (H - L)`
4. `R3 = H + 2 * (PP - L)`
5. `S1 = 2 * PP - H`
6. `S2 = PP - (H - L)`
7. `S3 = L - 2 * (H - PP)`

### Fibonacci Method
1. `PP = (H + L + C) / 3`
2. `R1 = PP + 0.382 * (H - L)`
3. `R2 = PP + 0.618 * (H - L)`
4. `R3 = PP + 1.000 * (H - L)`
5. `S1 = PP - 0.382 * (H - L)`
6. `S2 = PP - 0.618 * (H - L)`
7. `S3 = PP - 1.000 * (H - L)`

### Camarilla Method
1. `PP = (H + L + C) / 3`
2. `R1 = C + (1.1 * (H - L)) / 12`
3. `R2 = C + (1.1 * (H - L)) / 6`
4. `R3 = C + (1.1 * (H - L)) / 4`
5. `S1 = C - (1.1 * (H - L)) / 12`
6. `S2 = C - (1.1 * (H - L)) / 6`
7. `S3 = C - (1.1 * (H - L)) / 4`

### Woodie Method (weights close more heavily)
1. `PP = (H + L + 2 * C) / 4`
2. `R1 = 2 * PP - L`
3. `R2 = PP + (H - L)`
4. `R3 = H + 2 * (PP - L)`
5. `S1 = 2 * PP - H`
6. `S2 = PP - (H - L)`
7. `S3 = L - 2 * (H - PP)`

### DeMark Method (only PP, R1, S1)
1. If C < O: `X = H + 2*L + C`
2. If C > O: `X = 2*H + L + C`
3. If C = O: `X = H + L + 2*C`
4. `PP = X / 4`
5. `R1 = X/2 - L`
6. `S1 = X/2 - H`

Present levels from highest to lowest price, marking resistance levels in red and support levels in green.

## Examples

Standard pivot (S&P 500: O=5800, H=5880, L=5750, C=5850):
- PP = (5880 + 5750 + 5850) / 3 = 5826.67
- R1 = 2 * 5826.67 - 5750 = 5903.33
- R2 = 5826.67 + (5880 - 5750) = 5956.67
- R3 = 5880 + 2 * (5826.67 - 5750) = 6033.33
- S1 = 2 * 5826.67 - 5880 = 5773.33
- S2 = 5826.67 - (5880 - 5750) = 5696.67
- S3 = 5750 - 2 * (5880 - 5826.67) = 5643.33

## Error Handling
- High < Low → report that High must be greater than Low
- Any price ≤ 0 → ask for positive OHLC values
- Missing method → default to Standard method and mention the choice
