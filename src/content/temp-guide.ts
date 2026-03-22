/**
 * Temperature Converter Tool Guide Content
 * Comprehensive developer guide for temperature conversion
 */

import type { ToolGuideContent } from "./types";

export const tempGuideContent: ToolGuideContent = {
  toolName: "Temperature Converter",
  toolPath: "/temp",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Temperature Value",
      description: "Type any temperature value into the input field. Supports positive and negative values, decimals for precise measurements. Common use: converting API weather data, sensor readings, or thermostat settings between different temperature scales."
    },
    {
      title: "Select Source Scale",
      description: "Choose the temperature scale you're converting FROM: Celsius (°C, metric standard), Fahrenheit (°F, US standard), or Kelvin (K, scientific standard). The tool recognizes that different regions and applications use different temperature scales."
    },
    {
      title: "View All Scale Conversions",
      description: "See instant conversion results across all three temperature scales simultaneously. Each result displays with appropriate precision (1-2 decimal places). The selected source scale is highlighted for reference."
    },
    {
      title: "Copy Converted Values",
      description: "Click the copy icon on any temperature card to grab that value for use in code, API payloads, or configuration files. Useful for weather apps, IoT devices, scientific calculations, or localization configs."
    }
  ],

  introduction: {
    title: "What is Temperature Conversion?",
    content: `Temperature conversion translates thermal measurements between three primary scales: Celsius (°C), Fahrenheit (°F), and Kelvin (K). Unlike linear unit conversions (length, weight), temperature scales have different zero points and different scale sizes, requiring offset calculations in addition to multiplication.

Temperature conversion is ubiquitous in software development: weather APIs returning data in Kelvin or Celsius that needs Fahrenheit display for US users, IoT sensors measuring environmental temperature in various scales, smart home thermostats with internationalization requirements, scientific applications requiring absolute temperature (Kelvin), cooking apps converting oven temperatures, and industrial monitoring systems tracking process temperatures.

### Why Temperature Conversion Matters for Developers

**Weather APIs:** OpenWeatherMap returns temperature in Kelvin by default. DarkSky API uses Fahrenheit or Celsius based on location. Weather.gov (NOAA) returns Fahrenheit for US locations. Applications need to normalize API responses to a standard scale (usually Celsius internally) and convert to user's preferred scale for display. Incorrect temperature conversion causes user confusion and erodes trust.

**IoT and sensor integration:** Temperature sensors (DHT22, DS18B20, BME280) typically output Celsius. If building applications for US market, must convert to Fahrenheit for user-facing displays. Industrial IoT often requires Kelvin for scientific accuracy. Real-time dashboards showing sensor data across multiple regions need consistent scale or locale-aware conversion.

**Smart home devices:** Thermostats, HVAC controls, and temperature monitoring systems serve international markets. Nest API supports both Celsius and Fahrenheit. Phillips Hue uses Celsius. Home Assistant allows user preference. Applications integrating multiple smart home APIs must handle mixed temperature scales and provide consistent user experience.

**Scientific calculations:** Physics, chemistry, and engineering calculations require absolute temperature (Kelvin scale where 0 K = absolute zero). The ideal gas law (PV = nRT) requires temperature in Kelvin. Thermodynamics calculations fail with Celsius or Fahrenheit. Many scientific APIs return Kelvin requiring conversion for non-scientific user interfaces.

**Cooking and recipe apps:** Oven temperatures vary by region: US recipes use Fahrenheit (350°F, 375°F, 425°F), European recipes use Celsius (180°C, 190°C, 220°C). International recipe databases need temperature conversion. Gas mark (UK) adds another layer of complexity. Critical for food safety - undercooking due to wrong temperature conversion is dangerous.

### Understanding Temperature Scales

**Celsius (°C):** Metric standard, used by most of the world. Based on water phase transitions at standard pressure: 0°C = freezing point, 100°C = boiling point. Logical and intuitive for everyday use. Most weather reports globally use Celsius. Scientific notation uses Celsius for terrestrial temperatures.

**Fahrenheit (°F):** Imperial standard, primarily used in USA, some Caribbean nations, and for some applications in Canada/UK. Based on historical reference points: 0°F = coldest temperature achievable with ice/salt mixture (circa 1724), 96°F = human body temperature (later recalibrated). Range for human comfort (60-80°F) uses more whole numbers than Celsius (15-27°C), which some argue gives finer granularity without decimals.

**Kelvin (K):** Absolute temperature scale, scientific standard. Zero point is absolute zero (-273.15°C = 0 K), the theoretical temperature where molecular motion stops. No negative Kelvin values. Kelvin uses same degree size as Celsius (1 K change = 1°C change), just different zero point. Note: Kelvin doesn't use degree symbol (it's "K", not "°K").

### Conversion Formulas

**Celsius to Fahrenheit:** °F = (°C × 9/5) + 32
Example: 20°C = (20 × 1.8) + 32 = 68°F

**Fahrenheit to Celsius:** °C = (°F - 32) × 5/9
Example: 68°F = (68 - 32) × 0.5556 = 20°C

**Celsius to Kelvin:** K = °C + 273.15
Example: 20°C = 20 + 273.15 = 293.15 K

**Kelvin to Celsius:** °C = K - 273.15
Example: 293.15 K = 293.15 - 273.15 = 20°C

**Fahrenheit to Kelvin:** K = (°F - 32) × 5/9 + 273.15
Example: 68°F = (68 - 32) × 0.5556 + 273.15 = 293.15 K

**Kelvin to Fahrenheit:** °F = (K - 273.15) × 9/5 + 32
Example: 293.15 K = (293.15 - 273.15) × 1.8 + 32 = 68°F

### Key Temperature Reference Points

Understanding these reference points helps validate conversions:
- **Absolute zero:** 0 K = -273.15°C = -459.67°F
- **Water freezes:** 273.15 K = 0°C = 32°F
- **Human body:** 310.15 K = 37°C = 98.6°F
- **Room temperature:** ~293 K = ~20°C = ~68°F
- **Water boils:** 373.15 K = 100°C = 212°F
- **Scales intersect:** -40°C = -40°F (only point where C and F are equal)

### Common Developer Mistakes

**Using wrong formula:** Celsius to Fahrenheit is NOT simply multiply by 2. That's a rough approximation. Use exact formula: × 1.8 + 32.

**Forgetting the offset:** Kelvin to Celsius is not multiplicative, it's additive. K - 273.15, not K / 273.15.

**Negative Kelvin:** Kelvin scale has no negative values. If your conversion produces negative Kelvin, check your input or formula. Absolute zero is 0 K.

**Precision issues:** Don't round intermediate calculations. Convert with full precision, then round only for display. 100°F → Celsius → Kelvin should equal 100°F → Kelvin directly.

This tool provides accurate temperature conversions using exact formulas, displaying all three scales simultaneously for easy comparison and validation.`
  },

  useCases: [
    {
      title: "Convert Weather API Responses",
      description: "Weather APIs return temperature in various scales. OpenWeatherMap uses Kelvin by default, DarkSky used Fahrenheit, Weather.gov uses Fahrenheit. Normalize API responses to Celsius internally, convert to user's preferred scale for display.",
      example: `// OpenWeatherMap API (Kelvin):
{
  "main": {
    "temp": 293.15,     // Kelvin
    "feels_like": 291.15
  }
}

// Convert to Celsius: 293.15 K = 20°C
// Convert to Fahrenheit: 20°C = 68°F

// Display based on locale:
const displayTemp = locale === 'en-US'
  ? \`\${tempF}°F\`  // 68°F
  : \`\${tempC}°C\`;  // 20°C

// Store in database (standardized):
temperature_celsius: 20.0`
    },
    {
      title: "IoT Sensor Temperature Normalization",
      description: "Temperature sensors typically output Celsius. For US-market IoT applications (smart thermostats, environmental monitors), convert to Fahrenheit for user interfaces while storing Celsius in database for consistency.",
      example: `// DHT22 sensor reading (Celsius):
const sensorReading = {
  temperature: 22.5,  // °C
  humidity: 45
};

// Convert for display:
// 22.5°C = 72.5°F

// Home automation logic:
if (tempF > 75) {
  // Trigger cooling: 75°F = 23.9°C
  triggerAC();
}

// Store standardized:
await db.insert('readings', {
  temp_c: 22.5,
  temp_f: 72.5,  // computed
  timestamp: Date.now()
});`
    },
    {
      title: "Localize Recipe Cooking Temperatures",
      description: "Recipe databases store oven temperatures in various scales. US recipes use Fahrenheit, European use Celsius, some UK recipes use Gas Marks. Convert for user's region to ensure correct cooking temperatures for food safety.",
      example: `// Recipe database entry:
{
  "name": "Chocolate Chip Cookies",
  "oven_temp": 375,
  "oven_unit": "F"
}

// Convert for European users:
// 375°F = 190°C

// Display localized:
const ovenTemp = locale.startsWith('en-US')
  ? \`\${tempF}°F (\${gasmark})\`
  : \`\${tempC}°C\`;

// Common conversions:
// 350°F = 175°C (Gas Mark 4)
// 375°F = 190°C (Gas Mark 5)
// 425°F = 220°C (Gas Mark 7)`
    },
    {
      title: "Scientific Data Visualization",
      description: "Scientific applications use Kelvin for absolute temperature calculations (thermodynamics, chemistry). Convert Kelvin results to Celsius/Fahrenheit for non-scientific user displays while preserving Kelvin in data layer.",
      example: `// Ideal gas law calculation (requires Kelvin):
const calculatePressure = (n, V, T_kelvin) => {
  const R = 8.314; // J/(mol·K)
  return (n * R * T_kelvin) / V;
};

// Input: 25°C
// Convert: 25°C = 298.15 K

const pressure = calculatePressure(1, 0.024, 298.15);

// Display result with multiple scales:
Temperature: 298.15 K (25°C / 77°F)
Pressure: \${pressure} Pa`
    }
  ],

  howToUse: {
    title: "How to Use This Temperature Converter",
    content: `This tool converts temperature values between Celsius, Fahrenheit, and Kelvin scales using exact conversion formulas. Enter any temperature in any scale and instantly see equivalent values in all three scales.

### Entering Temperature Values

The input field accepts:
- **Positive values:** 20, 100, 98.6
- **Negative values:** -40, -273.15
- **Decimals:** 98.6, 37.5, 293.15
- **Zero:** 0 (different meaning in each scale)

### Understanding the Scales

**Celsius (°C):** Metric standard, water freezes at 0°C, boils at 100°C. Most intuitive for everyday use. Used worldwide except US.

**Fahrenheit (°F):** US standard, water freezes at 32°F, boils at 212°F. Provides finer granularity in human comfort range (60-80°F) without decimals.

**Kelvin (K):** Scientific standard, absolute scale starting at absolute zero (0 K = no molecular motion). No negative values possible. Used in physics, chemistry, engineering calculations.

### Validation and Bounds

**Kelvin:** Cannot be negative. Minimum value is 0 K (absolute zero = -273.15°C = -459.67°F). If converting Celsius or Fahrenheit below absolute zero, you'll get invalid (negative) Kelvin - check your input.

**Celsius:** Can be negative (below water freezing). Practical lower bound: -273.15°C (absolute zero). Upper bound: unlimited theoretically, but practical applications rarely exceed 1000°C.

**Fahrenheit:** Can be negative. Practical lower bound: -459.67°F (absolute zero). Upper bound: unlimited practically.

### Precision and Rounding

Results display with appropriate precision:
- **Display:** 1-2 decimal places for readability
- **Calculation:** Uses full JavaScript floating-point precision
- **Storage:** Store full precision values in databases, round only for display

Common practice: store Celsius in database (international standard), convert to Fahrenheit for US users on-demand.

### Common Temperature Reference Points

Memorizing these helps validate conversions:
- **Room temperature:** 20°C = 68°F = 293 K
- **Body temperature:** 37°C = 98.6°F = 310 K
- **Water freezes:** 0°C = 32°F = 273.15 K
- **Water boils:** 100°C = 212°F = 373.15 K
- **Scales equal:** -40°C = -40°F = 233 K

### Special Cases

**Absolute zero:** 0 K = -273.15°C = -459.67°F. This is the theoretical minimum temperature in the universe. No molecular motion occurs at absolute zero.

**Intersection point:** -40°C equals -40°F. This is the only temperature where Celsius and Fahrenheit values are identical. Useful for validation: if you convert -40°C to °F and get anything other than -40°F, your formula is wrong.

### Best Practices for Applications

**Store standardized:** Store temperatures in Celsius (international standard) or Kelvin (scientific standard) in databases. Convert to Fahrenheit only for US user display.

**User preference:** Provide temperature scale toggle in settings. Respect user locale but allow override (some US users prefer Celsius, some international users prefer Fahrenheit).

**Precision:** Don't over-precision. For weather display, 1 decimal place is sufficient (20.5°C). For scientific applications, use appropriate significant figures.`,
    steps: [
      {
        name: "Enter Temperature",
        text: "Type your temperature value into the input field. Supports positive/negative values and decimals for precise measurements."
      },
      {
        name: "Select Source Scale",
        text: "Choose the temperature scale you're converting FROM: Celsius (°C), Fahrenheit (°F), or Kelvin (K)."
      },
      {
        name: "View Conversions",
        text: "See instant conversion results across all three temperature scales simultaneously with appropriate precision."
      },
      {
        name: "Copy Values",
        text: "Click copy icon on any temperature card to grab that value for use in code, configs, or API payloads."
      }
    ]
  },

  faqs: [
    {
      question: "Why are there three different temperature scales?",
      answer: "Historical and practical reasons. Celsius (1742) uses water phase transitions as reference points (0°C freeze, 100°C boil) - logical for metric system. Fahrenheit (1724) was based on coldest achievable temperature with ice/salt mixture and body temperature - provides finer granularity in human comfort range. Kelvin (1848) is absolute scale starting at theoretical minimum temperature (absolute zero) - essential for scientific calculations where ratios matter (2K is twice as hot as 1K, but 2°C is not twice as hot as 1°C)."
    },
    {
      question: "Why does OpenWeatherMap API use Kelvin?",
      answer: "Scientific APIs often default to Kelvin because it's the SI (International System) base unit for temperature and avoids negative values. Kelvin is unambiguous internationally (no Celsius vs Fahrenheit confusion). Many weather APIs let you specify units: OpenWeatherMap accepts units parameter (units=metric for Celsius, units=imperial for Fahrenheit). Always check API documentation for available unit options and defaults."
    },
    {
      question: "What temperature scale should I store in my database?",
      answer: "Store Celsius in databases for these reasons: 1) International standard (only US primarily uses Fahrenheit). 2) Most APIs return Celsius or Kelvin. 3) Scientific calculations prefer Celsius or Kelvin. 4) Simpler conversion to Kelvin (just + 273.15). Store one standard scale, convert to user's preferred scale for display only. Never store temperature as strings with unit suffix ('20°C') - store numeric value and unit in separate columns or standardize to one scale."
    },
    {
      question: "Can Kelvin be negative?",
      answer: "No, Kelvin scale starts at absolute zero (0 K) - the theoretical minimum temperature where molecular motion stops. Negative Kelvin is impossible in classical physics. If your calculation produces negative Kelvin, check your input or formula. Practical example: -10°C converts to 263.15 K (positive). Absolute zero is -273.15°C or -459.67°F or 0 K. Some quantum systems exhibit 'negative absolute temperature' in specialized contexts, but that's beyond classical thermodynamics."
    },
    {
      question: "Why is body temperature 98.6°F but 37°C, not 36.67°C?",
      answer: "Rounding conventions and measurement precision. 37°C converts to exactly 98.6°F. Historically, 98.6°F was established first (Wunderlich 1868), later converted to Celsius and rounded to 37°C. Modern studies show average body temperature is closer to 36.8°C (98.2°F) and varies by individual, time of day, and measurement method (oral, rectal, temporal). The 98.6°F figure persists despite being slightly high and overly precise."
    },
    {
      question: "How do I handle Gas Mark oven temperatures?",
      answer: "Gas Mark is a UK oven temperature scale (Gas Mark 1-10). Convert Gas Mark → Celsius first, then to Fahrenheit if needed. Approximate conversions: GM1=275°F/135°C, GM2=300°F/150°C, GM3=325°F/165°C, GM4=350°F/175°C, GM5=375°F/190°C, GM6=400°F/200°C, GM7=425°F/220°C, GM8=450°F/230°C, GM9=475°F/245°C. For recipe apps, store Celsius and display Gas Mark for UK users: Math.round((celsius - 120) / 15) + 1."
    },
    {
      question: "What's the significance of -40°C = -40°F?",
      answer: "-40 is the only temperature where Celsius and Fahrenheit scales intersect. Use this as a validation point when testing temperature conversion functions. If converting -40°C to °F produces anything other than -40°F (or vice versa), your formula is wrong. This intersection occurs because the 1.8:1 scale ratio and 32° offset align at exactly -40. Below -40, Fahrenheit is 'less negative' than Celsius (warmer). Above -40, Fahrenheit is 'more positive' (hotter numbers)."
    },
    {
      question: "How precise should temperature conversions be for weather apps?",
      answer: "Weather apps: 1 decimal place is sufficient (20.5°C). More precision is false accuracy - actual air temperature varies by location, height, shade, wind. Weather stations report to nearest 0.1°C. For display: round to 1 decimal or even whole numbers (some apps show 21°C). For calculations: use full precision internally, round only for display. Never display 20.555555°C to users - it implies precision that doesn't exist."
    },
    {
      question: "Why do some countries use Fahrenheit instead of Celsius?",
      answer: "USA, some Caribbean nations, and a few others use Fahrenheit due to historical inertia. US adopted Fahrenheit before metric system existed. Switching costs are enormous: updating infrastructure, standards, documentation, consumer devices. US officially adopted metric in 1975 but allowed voluntary adoption - most consumer applications still use imperial/Fahrenheit. Scientific, medical, and military contexts in US do use Celsius. For software: support both scales regardless of personal preference."
    },
    {
      question: "Is my temperature data private?",
      answer: "Yes, all temperature conversions happen entirely in your browser using client-side JavaScript math. No temperature values are transmitted to servers, logged, or stored. The tool works completely offline after loading. No network requests contain your data. Safe for converting proprietary sensor data, regulated industrial temperatures, or confidential scientific measurements."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All temperature conversions happen entirely in your browser using client-side JavaScript with exact conversion formulas. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All conversions use browser-native JavaScript math operations. Calculations happen locally on your device.
- **No Server Uploads:** We don't have backend servers to process conversions. Works completely offline after first page load.
- **No Data Storage:** Input values and conversion results are not saved, logged, stored, or transmitted anywhere.
- **No Analytics on Content:** We don't track what temperatures you convert, what scales you use, or any conversion-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your data.

Safe for converting sensitive IoT sensor data, proprietary industrial process temperatures, regulated scientific measurements, or confidential research data. Use with confidence for healthcare applications, industrial monitoring, or competitive product development.`
  },

  stats: {
    "Conversion Speed": "<1ms",
    "Supported Scales": "3",
    "Precision": "2 decimals",
    "Formula": "Exact",
    "Server Uploads": "0"
  }
};
