/**
 * Unit Converter Tool Guide Content
 * Comprehensive developer guide for unit conversions
 */

import type { ToolGuideContent } from "./types";

export const unitGuideContent: ToolGuideContent = {
  toolName: "Unit Converter",
  toolPath: "/unit",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Category",
      description: "Choose the measurement category for conversion: Length (meters, feet, inches), Weight (grams, pounds, kilograms), Temperature (Celsius, Fahrenheit, Kelvin), Volume (liters, gallons, milliliters), or Time (seconds, minutes, hours, days). Each category supports multiple unit types."
    },
    {
      title: "Enter Value and Source Unit",
      description: "Type your numeric value and select the unit you're converting FROM. Supports decimals for precise measurements. Common use: converting API responses in metric to imperial for US users, or normalizing international data to standard units."
    },
    {
      title: "Select Target Unit",
      description: "Choose the unit you want to convert TO. The tool instantly calculates and displays the converted value with appropriate precision. Supports all common conversions within each category."
    },
    {
      title: "Copy Result",
      description: "Click copy to grab the converted value for use in code, configs, or documentation. Useful for hardcoding conversion factors, updating localization configs, or documenting API specifications."
    }
  ],

  introduction: {
    title: "What is Unit Conversion?",
    content: `Unit conversion translates measurements between different unit systems - metric vs. imperial, scientific vs. practical, international vs. regional standards. Unit conversions are essential for internationalization, scientific calculations, API data transformation, and user interface localization.

Software developers handle unit conversions constantly: geolocation APIs returning distances in meters that need display in miles for US users, weather APIs providing temperature in Celsius requiring Fahrenheit conversion, fitness trackers reporting metrics in kilometers/kilograms needing imperial equivalents, e-commerce shipping weights converting between grams and pounds, recipe apps translating milliliters to cups and teaspoons, and scientific applications converting between SI units and legacy measurements.

### Why Unit Conversion Matters for Developers

**Internationalization (i18n):** Applications serving global users must display measurements in local conventions. US users expect miles, Fahrenheit, and pounds. European users expect kilometers, Celsius, and kilograms. Asian markets use different conventions (kilometers but Fahrenheit in some regions). Proper unit conversion improves user experience and reduces confusion.

**API data normalization:** Third-party APIs return data in various units. OpenWeatherMap provides temperature in Kelvin by default (requires Celsius/Fahrenheit conversion). Google Maps Distance Matrix API returns distances in meters (often need miles or kilometers). Stripe reports amounts in smallest currency unit (cents) requiring dollar conversion. Normalizing API responses to application standards prevents bugs.

**Scientific accuracy:** Temperature conversions aren't simple linear scaling. Celsius to Fahrenheit: (°C × 9/5) + 32. Kelvin to Celsius: K - 273.15. Getting formulas wrong causes significant errors in scientific applications, weather apps, or industrial monitoring systems.

**E-commerce and shipping:** Product specifications use different units by region. Converting weights for shipping calculations (package weighs 2.5 kg = 5.51 lbs), dimensions for freight classification, and volumes for liquid products. International shipping requires both metric and imperial specifications.

**IoT and sensor data:** Embedded devices and sensors report measurements in various units. Temperature sensors might output Celsius but application expects Fahrenheit. Distance sensors report millimeters but UI needs inches. GPS modules return coordinates in decimal degrees but some systems need degrees-minutes-seconds.

### Common Unit Categories

**Length:** Metric (millimeters, centimeters, meters, kilometers) vs. Imperial (inches, feet, yards, miles). Critical for mapping applications, CAD software, construction calculators, and distance measurements. Conversion factors: 1 inch = 2.54 cm exactly, 1 mile = 1.609344 km.

**Weight/Mass:** Metric (milligrams, grams, kilograms, metric tons) vs. Imperial (ounces, pounds, tons). Essential for e-commerce, shipping calculators, recipe converters, and health apps. Conversion: 1 pound = 453.592 grams, 1 kg = 2.20462 pounds.

**Temperature:** Celsius (metric standard), Fahrenheit (US standard), Kelvin (scientific standard). Weather apps, thermostat controls, scientific calculations, and cooking temperature conversions. Only non-linear conversion: °F = (°C × 1.8) + 32.

**Volume:** Metric (milliliters, liters, cubic meters) vs. Imperial (fluid ounces, cups, pints, quarts, gallons). Cooking apps, fuel efficiency calculators, liquid product specifications. Conversion: 1 gallon = 3.78541 liters, 1 liter = 33.814 fl oz.

**Time:** Seconds, minutes, hours, days, weeks. While time units are standardized globally, converting between them is common: milliseconds to seconds for performance metrics, hours to minutes for duration display, days to seconds for epoch calculations.

### Unit Conversion Precision

Precision matters. Using rough estimates (1 mile ≈ 1.6 km) is fine for casual use but causes errors in calculations. Professional applications use exact conversion factors:
- 1 inch = 25.4 millimeters exactly (by definition)
- 1 pound = 453.59237 grams exactly (by definition)
- 1 gallon (US) = 3.785411784 liters exactly

Temperature conversions require careful rounding. 100°C = 212°F exactly (boiling point of water). But 25°C = 77°F (not 78°F from rough 2× + 30 formula).

### Metric vs. Imperial: Historical Context

Metric system (SI) is used by 195 of 196 countries. Only Myanmar, Liberia, and USA haven't officially adopted metric (though US uses it in science and military). Yet imperial measurements persist in US consumer applications, construction, and aviation worldwide (altitude in feet, speed in knots).

Developers building international applications must support both systems. Don't assume metric or imperial. Detect user locale and provide appropriate units. Allow manual unit switching. Store data in standardized units (usually metric) and convert for display.

This tool provides accurate conversions with proper precision, supporting common developer use cases for internationalization, API data transformation, and user interface localization. All conversions use exact factors and appropriate rounding.`
  },

  useCases: [
    {
      title: "Convert Weather API Temperature Data",
      description: "Weather APIs like OpenWeatherMap return temperature in Kelvin by default. Convert to Celsius or Fahrenheit for user display. Critical for weather apps, smart home thermostats, and environmental monitoring dashboards.",
      example: `// OpenWeatherMap API response:
{
  "main": {
    "temp": 293.15  // Kelvin
  }
}

// Convert to Celsius: 293.15 K = 20°C
// Formula: K - 273.15

// Convert to Fahrenheit: 20°C = 68°F
// Formula: (°C × 9/5) + 32

// Display logic:
const displayTemp = locale === 'en-US'
  ? \`\${fahrenheit}°F\`
  : \`\${celsius}°C\`;`
    },
    {
      title: "Localize Distance for Mapping Applications",
      description: "Google Maps API returns distances in meters. Convert to miles for US users or kilometers for international users. Essential for navigation apps, delivery radius calculators, and location-based services.",
      example: `// Google Distance Matrix API response:
{
  "rows": [{
    "elements": [{
      "distance": {
        "value": 5280,  // meters
        "text": "5.3 km"
      }
    }]
  }]
}

// Convert meters to miles for US display:
// 5280 meters = 3.28 miles
// Formula: meters × 0.000621371

// Convert meters to kilometers:
// 5280 meters = 5.28 km
// Formula: meters / 1000

// Localized display:
const distance = locale === 'en-US'
  ? \`\${miles.toFixed(2)} mi\`
  : \`\${km.toFixed(2)} km\`;`
    },
    {
      title: "Calculate Shipping Weights for E-commerce",
      description: "Product databases often store weights in grams (standardized metric). Convert to pounds/ounces for US customers and shipping label generation. Critical for accurate shipping costs and carrier API integration.",
      example: `// Product weight in database:
const productWeightGrams = 2500; // 2.5 kg

// Convert to pounds for USPS/FedEx:
// 2500 g = 5.51 lbs
// Formula: grams × 0.00220462

// Shipping label display:
const shippingWeight = locale === 'en-US'
  ? \`\${pounds} lbs\`
  : \`\${kg} kg\`;

// Carrier API payload:
{
  "weight": {
    "value": 5.51,
    "unit": "lb"
  }
}`
    },
    {
      title: "Normalize Recipe Measurements",
      description: "Recipe APIs and databases use different measurement systems. Convert between metric (ml, grams) and imperial (cups, tablespoons, ounces) for cooking apps. Handle dry vs. liquid measurements appropriately.",
      example: `// Recipe ingredient in database:
{
  "ingredient": "flour",
  "amount": 250,
  "unit": "grams"
}

// Convert to US volume measure:
// 250g flour ≈ 2 cups (density-dependent)
// Note: grams to cups requires density

// Liquid conversion (milk):
// 250 ml = 1.06 cups
// 250 ml = 8.45 fl oz

// Display preference:
const amount = units === 'metric'
  ? \`\${grams}g\`
  : \`\${cups} cups\`;`
    }
  ],

  howToUse: {
    title: "How to Use This Unit Converter",
    content: `This tool converts measurements between different unit systems within each category: length, weight, temperature, volume, and time. Select a category, enter your value, choose source and target units, and get instant accurate results.

### Selecting Categories

Five measurement categories are supported:

**Length:** millimeters, centimeters, meters, kilometers (metric); inches, feet, yards, miles (imperial). Use for distance, height, width, depth measurements.

**Weight:** milligrams, grams, kilograms, metric tons (metric); ounces, pounds, tons (imperial). Use for mass, shipping weights, product specifications.

**Temperature:** Celsius (metric), Fahrenheit (imperial), Kelvin (scientific). Use for weather data, thermostat controls, scientific calculations. Note: Kelvin has no degree symbol (K, not °K).

**Volume:** milliliters, liters, cubic meters (metric); fluid ounces, cups, pints, quarts, gallons (imperial). Use for liquids, fuel, capacity measurements.

**Time:** seconds, minutes, hours, days, weeks. Universal units but common conversions: performance metrics (ms to s), durations (hours to minutes), epoch calculations (days to seconds).

### Entering Values

The value input accepts:
- Integers: 100, 1500
- Decimals: 2.5, 98.6, 0.001
- Large numbers: 1000000
- Scientific notation (in some implementations): 1e6

Type your value and select the source unit (what you're converting FROM). Results update in real-time as you change either value or units.

### Understanding Precision

Results display with appropriate precision for each unit type:
- **Length:** 2-4 decimal places depending on magnitude
- **Weight:** 2-3 decimal places
- **Temperature:** 1-2 decimal places
- **Volume:** 2-3 decimal places
- **Time:** Whole numbers for large units, decimals for small units

Precision is calibrated for practical use. Converting 1 mile to millimeters shows 1,609,344 mm (6 significant figures), not 1,609,344.000000 mm.

### Temperature Conversion Notes

Temperature is the only non-linear conversion. Celsius and Fahrenheit have different zero points and scale factors:
- 0°C = 32°F (freezing point of water)
- 100°C = 212°F (boiling point of water)
- -40°C = -40°F (the only point where scales intersect)

Kelvin is absolute temperature scale (0 K = absolute zero):
- 0 K = -273.15°C = -459.67°F
- 273.15 K = 0°C = 32°F

### Common Conversions Quick Reference

**Length:**
- 1 inch = 2.54 cm exactly
- 1 foot = 30.48 cm exactly
- 1 mile = 1.609344 km exactly
- 1 meter = 39.37 inches

**Weight:**
- 1 pound = 453.592 grams
- 1 kilogram = 2.20462 pounds
- 1 ounce = 28.3495 grams

**Volume:**
- 1 gallon (US) = 3.78541 liters
- 1 liter = 33.814 fluid ounces
- 1 cup (US) = 236.588 ml

**Time:**
- 1 minute = 60 seconds
- 1 hour = 3,600 seconds
- 1 day = 86,400 seconds`,
    steps: [
      {
        name: "Choose Category",
        text: "Select the measurement category: Length, Weight, Temperature, Volume, or Time. Each category supports multiple unit types within that measurement system."
      },
      {
        name: "Enter Value and Source Unit",
        text: "Type your numeric value and select the unit you're converting FROM. Supports decimals and large numbers."
      },
      {
        name: "Select Target Unit",
        text: "Choose the unit you want to convert TO. The tool instantly calculates the result with appropriate precision."
      },
      {
        name: "Copy Result",
        text: "Click the copy button to grab the converted value for use in code, documentation, or configuration files."
      }
    ]
  },

  faqs: [
    {
      question: "Why does temperature conversion seem more complex?",
      answer: "Temperature conversion is non-linear because Celsius and Fahrenheit have different zero points and different scale sizes. Converting °C to °F: multiply by 1.8 (or 9/5) then add 32. Converting °F to °C: subtract 32 then divide by 1.8. Kelvin conversion is simpler: K = °C + 273.15. The complexity comes from arbitrary historical zero points (0°C = freezing water, 0°F = brine freezing point)."
    },
    {
      question: "What's the difference between US gallons and UK gallons?",
      answer: "US gallon = 3.78541 liters. Imperial (UK) gallon = 4.54609 liters. US gallon is ~20% smaller. This matters for fuel efficiency calculations: a car getting 30 mpg (US) gets 36 mpg (UK). Most conversion tools assume US gallons by default. Always specify which gallon when documenting APIs or international applications. Similar difference exists for fluid ounces: US fl oz = 29.5735 ml, UK fl oz = 28.4131 ml."
    },
    {
      question: "Should I store metric or imperial units in my database?",
      answer: "Store metric (SI) units in databases for these reasons: 1) Metric is the international standard (195 of 196 countries). 2) Metric conversions are simpler (powers of 10). 3) Scientific calculations use metric. 4) Most APIs return metric. Store grams (not pounds), meters (not feet), Celsius (not Fahrenheit). Convert to imperial only for display when user locale is US. Store the standard, localize the display."
    },
    {
      question: "How do I handle rounding in unit conversions?",
      answer: "Never round intermediate conversions, only final display. Converting 100 km → meters → inches should give same result as 100 km → inches directly. Store full precision float values, round only when displaying to user. For financial calculations (currency conversion, pricing), use fixed-point arithmetic or libraries like Dinero.js to avoid floating-point errors. For display, round to appropriate precision: distances to 2 decimals, temperatures to 1 decimal, scientific measurements to significant figures."
    },
    {
      question: "What's the difference between weight and mass?",
      answer: "Mass (kg, grams) measures matter quantity - constant everywhere. Weight (pounds-force, newtons) measures gravitational force on mass - varies by gravity. On Earth, 1 kg mass ≈ 2.20462 pounds weight. On the Moon, same 1 kg mass weighs only ~0.37 pounds. In computing, we usually mean mass when we say 'weight' (product weighs 5 kg). This converter treats pounds as mass units matching common usage."
    },
    {
      question: "How accurate are these conversions?",
      answer: "This tool uses exact conversion factors defined by international standards: 1 inch = 25.4 mm exactly (since 1959), 1 pound = 453.59237 grams exactly, 1 gallon = 3.785411784 liters exactly. Results are mathematically precise within JavaScript floating-point limitations (~15 significant digits). For scientific applications requiring higher precision, use specialized libraries with arbitrary-precision arithmetic."
    },
    {
      question: "Why do some recipe conversions seem off?",
      answer: "Converting weight (grams) to volume (cups) requires density information. 250g of flour ≠ 250ml of flour because flour's density is ~0.6 g/ml. Water: 250g = 250ml (density = 1). Flour: 250g ≈ 417ml ≈ 1.76 cups. Sugar: 250g ≈ 296ml ≈ 1.25 cups. This converter handles unit-to-unit conversions (grams to ounces, ml to cups) but can't convert mass to volume without density data."
    },
    {
      question: "What locale format should I use for displaying units?",
      answer: "Follow user locale conventions: US uses imperial (miles, °F, pounds), most world uses metric (km, °C, kg). Use Intl.NumberFormat for number formatting with unit suffixes. Example: new Intl.NumberFormat('en-US', {style: 'unit', unit: 'kilometer'}).format(5) outputs '5 km'. Detect locale from Accept-Language header (server) or navigator.language (browser). Provide manual toggle for user preference override."
    },
    {
      question: "How do I convert between time zones vs. time units?",
      answer: "This converter handles time units (seconds, minutes, hours, days) - duration conversions. Time zones are different: they shift clock time (UTC to EST). For time zone conversion, use libraries like date-fns-tz or Luxon. For duration calculations (how many seconds in 2 hours?), use this unit converter. Common: converting milliseconds to seconds for performance metrics (1500ms = 1.5s), or hours to minutes for duration display (2.5 hours = 150 minutes)."
    },
    {
      question: "Is my conversion data private?",
      answer: "Yes, all unit conversions happen entirely in your browser using client-side JavaScript math. No values are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for converting proprietary measurements, confidential product specifications, or regulated scientific data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All unit conversions happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All conversions use browser-native JavaScript math with exact conversion factors. Calculations happen locally.
- **No Server Uploads:** We don't have backend servers to process conversions. Works completely offline after first page load.
- **No Data Storage:** Input values and conversion results are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what values you convert, what units you use, or any conversion-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your data.

Safe for converting confidential product specifications, proprietary measurements, regulated scientific data, or competitive analysis metrics. Use with confidence for international product data or sensitive engineering calculations.`
  },

  stats: {
    "Conversion Speed": "<1ms",
    "Categories": "5",
    "Supported Units": "30+",
    "Precision": "15 digits",
    "Server Uploads": "0"
  }
};
