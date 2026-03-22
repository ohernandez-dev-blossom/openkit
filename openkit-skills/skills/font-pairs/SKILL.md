---
name: font-pairs
description: Suggest complementary font pairings with CSS. Use when the user asks for font pairing suggestions, what font goes with another font, Google Fonts combinations, or typography CSS for heading and body.
---

# Font Pairing Suggestions

Suggest one or more complementary heading + body font pairings with CSS code, Google Fonts import links, and reasoning.

## Input
- Primary font name (optional — if none given, suggest popular pairs)
- Category preference: `serif` | `sans-serif` | `display` | `monospace` (optional)
- Style preference: e.g., "modern", "editorial", "bold", "playful", "elegant", "tech" (optional)
- Number of suggestions: integer (default `3`)

## Output
- Google Fonts `<link>` import HTML
- CSS `font-family` declarations for heading and body
- Brief reasoning for each pair

## Instructions
1. Identify the user's primary font (if provided) and find pairs from the curated database that include it.
2. If no primary font is given, filter by style/category preference, or default to popular pairs.
3. For each suggested pair, output:
   a. Google Fonts import URL: `https://fonts.googleapis.com/css2?family=<Heading>:wght@400;600;700&family=<Body>:wght@400;600;700&display=swap`
   b. CSS:
      ```css
      h1, h2, h3, h4, h5, h6 {
        font-family: '<Heading>', <headingCategory>;
      }
      body {
        font-family: '<Body>', <bodyCategory>;
      }
      ```
   c. Reasoning (from the database description)
4. Prioritize `popular: true` pairs when filtering.
5. Use these known curated pairs (select the best matches):
   - Montserrat + Merriweather (popular, sans + serif)
   - Playfair Display + Source Sans Pro (popular, serif + sans)
   - Poppins + Inter (popular, sans + sans, modern/tech)
   - Bebas Neue + Montserrat (popular, display + sans, bold)
   - Raleway + Lora (popular, sans + serif, elegant)
   - Oswald + Lato (popular, sans + sans)
   - Roboto + Roboto Slab (popular, same family)
   - Space Grotesk + Inter (sans + sans, tech)
   - IBM Plex Mono + IBM Plex Sans (monospace + sans, corporate/tech)
   - Cinzel + Fauna One (serif + serif, elegant)
   - Pacifico + Open Sans (display + sans, playful)
   - Cormorant Garamond + Proza Libre (serif + sans, editorial)

## Options
- `primaryFont`: font name to pair — optional
- `category`: `serif` | `sans-serif` | `display` | `monospace` — optional filter
- `style`: descriptive style keyword — optional
- `count`: number of suggestions — default `3`

## Examples

**Input:** "Font pair suggestions for a modern tech startup site"
**Output:**
Suggestion 1: **Space Grotesk + Inter**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
}
body {
  font-family: 'Inter', sans-serif;
}
```
Reasoning: Geometric fixed-width display with UI-optimized sans — clean and modern.

**Input:** "What font goes with Montserrat?"
**Output:**
Best pairing: **Montserrat + Merriweather**
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Merriweather:wght@400;600;700&display=swap" rel="stylesheet">
```
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}
body {
  font-family: 'Merriweather', serif;
}
```
Reasoning: Modern geometric sans pairs beautifully with traditional serif for excellent readability.

## Error Handling
- If the requested primary font is not in the known database, suggest the 3 most popular general-purpose pairs and note that the specific font was not found.
- If the user requests more than 8 suggestions, cap at 8 (the max displayed in the tool).
- If conflicting preferences are given (e.g., "serif heading" but primary font is a sans), favor the primary font and note the mismatch.
