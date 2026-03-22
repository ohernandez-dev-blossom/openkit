---
name: meta-tags-generate
description: Generate HTML meta tags, Open Graph tags, and Twitter Card tags for a web page. Use when the user asks to create SEO meta tags, generate OG tags, create social share tags, or build HTML head tags for a website.
---

# Meta Tags Generator

Produce three sections of HTML tags — Basic SEO, Open Graph, and Twitter Card — from page information the user supplies.

## Input
- `title` — page title (recommended ≤ 60 characters)
- `description` — page description (recommended ≤ 160 characters)
- `url` — canonical page URL (should start with https://)
- `image_url` — OG / Twitter card image URL (recommended 1200×630 px)
- `site_name` — name of the website
- `author` — author name or company
- `keywords` — comma-separated keywords

## Output
Three HTML code blocks:
1. **Basic SEO tags** — `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta name="author">`, `<link rel="canonical">`, `<meta charset>`, `<meta name="viewport">`
2. **Open Graph tags** — `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
3. **Twitter Card tags** — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

Then a brief SEO audit noting any issues.

## Instructions
1. Collect all provided fields. Fields not supplied are simply omitted from output.
2. Emit the Basic SEO block:
   - If title: `<title>{title}</title>`
   - If description: `<meta name="description" content="{description}" />`
   - If keywords: `<meta name="keywords" content="{keywords}" />`
   - If author: `<meta name="author" content="{author}" />`
   - If url: `<link rel="canonical" href="{url}" />`
   - Always add: `<meta charset="UTF-8" />` and `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
3. Emit the Open Graph block:
   - If title: `<meta property="og:title" content="{title}" />`
   - If description: `<meta property="og:description" content="{description}" />`
   - If image_url: `<meta property="og:image" content="{image_url}" />`
   - If url: `<meta property="og:url" content="{url}" />`
   - Always add: `<meta property="og:type" content="website" />`
   - If site_name: `<meta property="og:site_name" content="{site_name}" />`
4. Emit the Twitter Card block:
   - Always add: `<meta name="twitter:card" content="summary_large_image" />`
   - If title: `<meta name="twitter:title" content="{title}" />`
   - If description: `<meta name="twitter:description" content="{description}" />`
   - If image_url: `<meta name="twitter:image" content="{image_url}" />`
5. Run a brief SEO audit and report:
   - Title: warn if > 60 chars or missing
   - Description: warn if > 160 chars, < 50 chars, or missing
   - URL: warn if not HTTPS or missing
   - OG Image: warn if missing
   - Site Name: note if missing

## Options
- All fields are optional individually, but title and description are strongly recommended for useful output.

## Examples

**Input:**
- title: "OpenKit.tools - Fast Developer Tools"
- description: "Privacy-first developer tools that run entirely in your browser."
- url: "https://openkit.tools"
- image_url: "https://openkit.tools/og-image.png"
- site_name: "OpenKit.tools"

**Output:**
```html
<!-- Basic SEO -->
<title>OpenKit.tools - Fast Developer Tools</title>
<meta name="description" content="Privacy-first developer tools that run entirely in your browser." />
<link rel="canonical" href="https://openkit.tools" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Open Graph -->
<meta property="og:title" content="OpenKit.tools - Fast Developer Tools" />
<meta property="og:description" content="Privacy-first developer tools that run entirely in your browser." />
<meta property="og:image" content="https://openkit.tools/og-image.png" />
<meta property="og:url" content="https://openkit.tools" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="OpenKit.tools" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="OpenKit.tools - Fast Developer Tools" />
<meta name="twitter:description" content="Privacy-first developer tools that run entirely in your browser." />
<meta name="twitter:image" content="https://openkit.tools/og-image.png" />
```

**SEO Audit:** Title 36/60 ✓ | Description 63/160 ✓ | HTTPS ✓ | OG Image ✓ | Site Name ✓

## Error Handling
- If no fields at all are provided, ask the user for at minimum a title and description.
- If title exceeds 60 characters, include it but add a warning.
- If description exceeds 160 characters, include it but add a warning.
- If URL does not start with `https://`, include it but note it should use HTTPS for best SEO.
