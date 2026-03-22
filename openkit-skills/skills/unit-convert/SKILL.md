---
name: unit-convert
description: Convert values between units of length, weight, temperature, data storage, or time. Use when the user asks to convert meters to feet, pounds to kilograms, Celsius to Fahrenheit, gigabytes to megabytes, hours to seconds, or any other unit conversion.
---

# Unit Converter

Convert a numeric value from one unit to another across five categories: length, weight, temperature, data, and time. All conversions go through a base unit.

## Input
- Numeric value to convert
- Source unit (from)
- Target unit (to)
- Category (auto-detected from units if unambiguous)

## Output
- The converted value (up to 6 significant decimal places)
- The conversion expressed as: `{value} {fromUnit} = {result} {toUnit}`
- The formula used (for non-trivial conversions like temperature)

## Instructions

### Conversion tables (all values convert to/from the base unit)

**Length** (base: meters)
| Unit | ID | → base (meters) | ← from base |
|---|---|---|---|
| Meters | m | ×1 | ×1 |
| Kilometers | km | ×1000 | ÷1000 |
| Centimeters | cm | ÷100 | ×100 |
| Millimeters | mm | ÷1000 | ×1000 |
| Miles | mi | ×1609.344 | ÷1609.344 |
| Yards | yd | ×0.9144 | ÷0.9144 |
| Feet | ft | ×0.3048 | ÷0.3048 |
| Inches | in | ×0.0254 | ÷0.0254 |

**Weight** (base: kilograms)
| Unit | ID | → base (kg) | ← from base |
|---|---|---|---|
| Kilograms | kg | ×1 | ×1 |
| Grams | g | ÷1000 | ×1000 |
| Milligrams | mg | ÷1000000 | ×1000000 |
| Pounds | lb | ×0.453592 | ÷0.453592 |
| Ounces | oz | ×0.0283495 | ÷0.0283495 |
| Metric Tons | t | ×1000 | ÷1000 |

**Temperature** (base: Celsius)
| Unit | ID | → base (°C) | ← from base |
|---|---|---|---|
| Celsius | c | value | value |
| Fahrenheit | f | (v − 32) × 5/9 | v × 9/5 + 32 |
| Kelvin | k | v − 273.15 | v + 273.15 |

**Data** (base: bytes, using 1024-based binary units)
| Unit | ID | → base (bytes) | ← from base |
|---|---|---|---|
| Bytes | b | ×1 | ×1 |
| Kilobytes | kb | ×1024 | ÷1024 |
| Megabytes | mb | ×1024² | ÷1024² |
| Gigabytes | gb | ×1024³ | ÷1024³ |
| Terabytes | tb | ×1024⁴ | ÷1024⁴ |

**Time** (base: seconds)
| Unit | ID | → base (seconds) | ← from base |
|---|---|---|---|
| Seconds | s | ×1 | ×1 |
| Milliseconds | ms | ÷1000 | ×1000 |
| Minutes | min | ×60 | ÷60 |
| Hours | h | ×3600 | ÷3600 |
| Days | d | ×86400 | ÷86400 |
| Weeks | w | ×604800 | ÷604800 |

### Conversion algorithm
1. Identify the category from the units provided (or ask the user if ambiguous).
2. Convert the input value to the base unit using `toBase(value)`.
3. Convert from the base unit to the target unit using `fromBase(baseValue)`.
4. Round to at most 6 decimal places.
5. Present the result clearly.

## Options
- Category is auto-detected from the unit names/IDs. If ambiguous, ask.

## Examples

**Length:**
Input: `100 meters to feet`
Base: 100 m
Result: `100 × (1 ÷ 0.3048) = 328.084 ft`
Output: `100 m = 328.084 ft`

**Temperature:**
Input: `100 Celsius to Fahrenheit`
Formula: `100 × 9/5 + 32 = 212`
Output: `100°C = 212°F`

**Weight:**
Input: `5 pounds to kilograms`
Formula: `5 × 0.453592 = 2.268 kg`
Output: `5 lb = 2.268 kg`

**Data:**
Input: `1 gigabyte to megabytes`
Formula: `1 × 1024 = 1024 MB`
Output: `1 GB = 1024 MB`

**Time:**
Input: `2.5 hours to minutes`
Formula: `2.5 × 3600 ÷ 60 = 150`
Output: `2.5 h = 150 min`

## Error Handling
- **Unrecognized unit:** List the supported units for each category and ask the user to clarify.
- **Non-numeric value:** Ask for a valid number.
- **Same unit for from and to:** Return the input value unchanged, note they are the same unit.
- **Temperature below absolute zero:** Warn that Kelvin cannot be negative (< 0 K).
