/**
 * Favicon Generator Tool Guide Content
 * Comprehensive developer guide for favicon creation and optimization
 */

import type { ToolGuideContent } from "./types";

export const faviconGenGuideContent: ToolGuideContent = {
  toolName: "Favicon Generator",
  toolPath: "/favicon-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Upload Source Image",
      description: "Upload a square PNG, JPG, or SVG file (512x512px recommended). Higher resolution ensures quality across all generated sizes. SVGs provide scalability but not all browsers support SVG favicons."
    },
    {
      title: "Generate All Sizes",
      description: "Click Generate to create favicons in all standard sizes: 16x16, 32x32, 48x48, 64x64, 128x128, 180x180 (Apple Touch), and 192x192/512x512 (Android). Each size is optimized for specific platforms."
    },
    {
      title: "Download Favicon Package",
      description: "Download a ZIP containing all generated favicons, manifest.json (PWA support), and browserconfig.xml (IE/Edge legacy). Includes ready-to-use HTML <link> tags for easy integration."
    },
    {
      title: "Add HTML to Your Site",
      description: "Copy the generated HTML <link> tags and paste into your website's <head> section. Upload favicon files to your site's root directory. Test by opening your site - the favicon appears in browser tabs."
    }
  ],

  introduction: {
    title: "What is a Favicon?",
    content: `A favicon (favorite icon) is a small icon displayed in browser tabs, bookmarks, history, and address bars to visually identify websites. Modern favicons go beyond simple 16x16 pixel icons - they include multiple sizes, formats, and platform-specific variants for desktop browsers, mobile devices, Progressive Web Apps (PWAs), and operating system integrations. Implementing proper favicons enhances brand recognition, improves user experience, and is essential for professional web development.

The original favicon.ico format from 1999 required a single 16x16 pixel ICO file in the website root directory. Modern favicon implementation is complex: browsers expect PNG files in multiple sizes, iOS devices use Apple Touch Icons (180x180px), Android requires icons in manifest.json (192x192px, 512x512px), and Windows tiles need browserconfig.xml with square and wide icons. A complete favicon implementation involves 10+ files and proper HTML meta tags.

### Why Favicons Matter

**Brand recognition:** Users identify websites by favicon when they have dozens of tabs open. A distinctive favicon makes your site instantly recognizable among competitors. Users can find your tab quickly in a crowded browser, improving usability and reducing cognitive load.

**Professional appearance:** Missing favicons display generic browser icons (empty document, globe) that make websites look unfinished or unprofessional. Users subconsciously associate proper favicons with trustworthy, established websites. E-commerce sites without favicons may face lower conversion rates due to perceived lack of professionalism.

**Bookmarks and history:** Favicons appear in bookmark bars and browser history, making it easier for users to find your site. A memorable favicon increases the likelihood users bookmark your site and return later. In mobile bookmark screens, the favicon is the primary visual identifier.

**PWA and mobile integration:** Progressive Web Apps require favicons for 'Add to Home Screen' functionality. When users install your PWA, the favicon becomes the app icon on their phone or desktop. Poor-quality favicons that pixelate on large screens create negative first impressions and reduce perceived app quality.

### Favicon Sizes and Use Cases

**16x16px:** Classic favicon size displayed in browser tabs, history, and bookmarks. Must be simple and recognizable at tiny size. Avoid fine details - use bold shapes and high contrast. Most common favicon size.

**32x32px:** High-DPI version of tab favicon for Retina displays and Windows taskbar. Browsers automatically downscale if 16x16 is missing. Slightly more detail possible than 16x16 but still keep it simple.

**48x48px:** Windows desktop shortcuts and some browser UIs. Intermediate size allowing moderate detail.

**64x64, 128x128px:** Windows tile icons and larger UI elements. Can include more intricate design elements.

**180x180px (Apple Touch Icon):** iOS Safari 'Add to Home Screen' icon. Appears on iPhone/iPad home screens when users save your site. iOS automatically rounds corners - design for square canvas. This is your mobile app icon.

**192x192px, 512x512px:** Android Chrome 'Add to Home Screen' icons specified in manifest.json. 192x192 is minimum, 512x512 ensures quality on large screens and splash screens. Both sizes required for full PWA compliance.

### Favicon Formats

**PNG:** Modern standard for favicons. Supports transparency (important for rounded icons), full color, and lossless compression. All modern browsers support PNG favicons. Use PNG for all sizes.

**ICO:** Legacy format containing multiple sizes in one file. Still supported but no longer required. Browsers automatically request favicon.ico from root if no meta tags exist. For maximum compatibility, provide both PNG (with meta tags) and legacy favicon.ico.

**SVG:** Scalable vector favicons work at any size without pixelation. Perfect for simple logos. Browser support is limited - Safari 9+, Firefox 41+, Chrome 80+. Always provide PNG fallback alongside SVG.

### Favicon Best Practices

**Start with high resolution:** Use 512x512px or larger source image. Downscaling maintains quality; upscaling from small images produces pixelated results. Vector sources (SVG, AI files) are ideal because they scale infinitely.

**Simple, bold design:** Favicons are tiny. Intricate details disappear at 16x16px. Use solid colors, bold shapes, and high contrast. Avoid text unless it's a single character or logo wordmark. Test how your icon looks at 16x16px before finalizing.

**Transparent background:** Use PNG transparency instead of solid backgrounds. Transparent icons adapt to browser themes (dark mode, light mode) and look cleaner in bookmark bars. Solid backgrounds create harsh rectangles.

**Consistent branding:** Favicon should match your brand colors and logo. Users subconsciously associate the favicon with your brand. Inconsistent favicon confuses users and reduces brand recognition.

**Test across devices:** View your favicon on desktop browsers (Chrome, Firefox, Safari, Edge), mobile browsers (iOS Safari, Android Chrome), and bookmark bars. Check that it's recognizable at all sizes and on different background colors.

### Complete Favicon Implementation

A production-ready favicon setup includes multiple files and HTML tags. Place favicon PNG files in your site's root directory or /images/favicons/ folder. Generate a manifest.json for PWA support listing all Android icons. Include browserconfig.xml for Windows tile icons. Add HTML <link> tags to your site's <head> section referencing all favicon sizes.

The generator creates this complete package automatically: all required sizes, manifest.json, browserconfig.xml, and ready-to-use HTML. Simply upload your logo, download the package, and integrate into your website.`
  },

  useCases: [
    {
      title: "Generate Favicons for New Website Launch",
      description: "Creating a new website requires a complete favicon package for all browsers and devices. Generate all standard sizes from your logo to ensure consistent branding across desktop, mobile, and PWA installations.",
      example: `# Before launch checklist: Favicons
1. Design favicon source image:
   - 512x512px PNG
   - Simple, bold design (recognizable at 16x16px)
   - Transparent background
   - Brand colors

2. Generate all sizes:
   - 16x16, 32x32 (browser tabs)
   - 48x48, 64x64, 128x128 (desktop)
   - 180x180 (Apple Touch Icon)
   - 192x192, 512x512 (Android/PWA)

3. Generated files:
   /public
     /icons
       favicon-16x16.png
       favicon-32x32.png
       favicon-48x48.png
       apple-touch-icon.png (180x180)
       android-chrome-192x192.png
       android-chrome-512x512.png
     favicon.ico (multi-size legacy)
     manifest.json (PWA)
     browserconfig.xml (Windows)

4. Add HTML to <head>:
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">

5. Test:
   - Desktop: Check browser tabs, bookmarks
   - iOS: Add to Home Screen, verify icon
   - Android: Add to Home Screen, check icon quality
   - PWA: Install as app, check app icon`
    },
    {
      title: "Update Favicon for Rebrand",
      description: "Rebranding requires updating favicons across all platforms. Generate new favicons from updated logo and replace old files to ensure consistent brand identity everywhere users see your site.",
      example: `# Rebrand favicon update process
Old brand: Blue logo
New brand: Green logo with new shape

1. Upload new 512x512px logo to generator
2. Generate complete package with new colors/design
3. Download favicon package

4. Replace files on server:
# Before (old files)
/public/favicon.ico
/public/favicon-16x16.png
/public/apple-touch-icon.png

# After (new files)
# Keep same filenames for cache compatibility
/public/favicon.ico (new)
/public/favicon-16x16.png (new)
/public/favicon-32x32.png (new)
/public/apple-touch-icon.png (new)
/public/android-chrome-192x192.png (new)
/public/android-chrome-512x512.png (new)

5. Update manifest.json icons array:
{
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

6. Clear cache:
# Add cache-busting query params if users see old icons
<link rel="icon" href="/favicon-32x32.png?v=2">

# Or set far-future expires with version in filename
favicon-32x32-v2.png

7. Test in incognito/private mode:
   - Hard refresh (Ctrl+Shift+R)
   - Check tab icon updates
   - Verify bookmarks show new icon (may take time)
   - Test Add to Home Screen on mobile`
    },
    {
      title: "PWA Icon Generation",
      description: "Progressive Web Apps require multiple icon sizes in manifest.json for 'Add to Home Screen' and app splash screens. Generate PWA-compliant icons that look sharp on all Android and iOS devices.",
      example: `# manifest.json for PWA
{
  "name": "My App",
  "short_name": "MyApp",
  "icons": [
    {
      "src": "/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}

# HTML reference to manifest
<link rel="manifest" href="/manifest.json">

# Icon requirements:
# - 192x192: Minimum size for Android home screen
# - 512x512: High-quality for splash screens and large displays
# - purpose="maskable": Icons adapt to device icon shapes (circle, squircle, rounded square)

# Design tips for maskable icons:
# - Keep important content in center 80% of canvas
# - Outer 20% may be cropped by device
# - Test on different Android devices (various shapes)

# Test PWA icons:
1. Open site in Chrome/Edge mobile
2. Menu → Add to Home Screen
3. Check icon quality on home screen
4. Launch app, verify splash screen icon
5. Test on different Android devices (Samsung, Pixel, etc)

# Common issues:
# ✗ Icons too small: Use 512x512 minimum for quality
# ✗ Content too close to edges: Cropped on some devices
# ✗ Missing "maskable" purpose: Icons don't adapt to device shapes
# ✗ Wrong format: Use PNG, not JPEG (transparency needed)`
    },
    {
      title: "Multi-Brand Favicon Management",
      description: "Managing multiple brands or white-label products requires generating separate favicon packages for each brand. Automate favicon generation for consistent implementation across all brand variations.",
      example: `# Multi-brand setup
brands/
  brand-a/
    logo-512x512.png
    favicons/ (generated)
  brand-b/
    logo-512x512.png
    favicons/ (generated)
  brand-c/
    logo-512x512.png
    favicons/ (generated)

# Generate script (pseudocode)
brands = ['brand-a', 'brand-b', 'brand-c']

for brand in brands:
  source = f'brands/{brand}/logo-512x512.png'
  output = f'brands/{brand}/favicons/'

  # Upload to favicon generator API or use CLI tool
  generateFavicons(source, output)

  # Copy to website build
  copy(f'{output}/*', f'public/{brand}/icons/')

# Dynamic favicon serving based on brand
# server.js (Node.js/Express)
app.get('/favicon.ico', (req, res) => {
  const brand = req.hostname.split('.')[0] // subdomain
  // brand-a.example.com → 'brand-a'

  res.sendFile(\`/public/\${brand}/icons/favicon.ico\`)
})

# HTML template with dynamic paths
<link rel="icon" sizes="32x32" href="/<%= brand %>/icons/favicon-32x32.png">
<link rel="apple-touch-icon" href="/<%= brand %>/icons/apple-touch-icon.png">

# Benefits:
# ✓ Consistent favicon implementation across brands
# ✓ Automated generation from brand logos
# ✓ Easy to update when brand changes
# ✓ Separate manifests per brand for PWA

# Example: White-label SaaS
# client1.saas.com → Client 1 favicon
# client2.saas.com → Client 2 favicon
# Each client gets branded favicon automatically`
    }
  ],

  howToUse: {
    title: "How to Use This Favicon Generator",
    content: `This favicon generator creates a complete, production-ready favicon package from a single source image. Upload your logo, generate all required sizes, and download a ZIP containing favicons, manifest files, and HTML integration code.

### Preparing Your Source Image

Use a square image (512x512px or larger) in PNG format with transparent background. Higher resolution ensures quality when downscaling to small sizes. If your logo is rectangular, center it on a square canvas with transparent padding. Avoid intricate details that disappear at small sizes - favor bold shapes and high contrast.

SVG sources work but require conversion to PNG for browser compatibility. Adobe Illustrator, Figma, or Inkscape can export SVGs as PNG at high resolution. Set export size to 512x512px minimum.

### Generating Favicons

Upload your source image using the file picker or drag-and-drop. The generator automatically creates all standard sizes: 16x16, 32x32, 48x48, 64x64, 128x128 (browser tabs and desktop), 180x180 (Apple Touch Icon), and 192x192, 512x512 (Android/PWA). Each size is optimized with appropriate compression and quality settings.

The generator also creates legacy favicon.ico (multi-size ICO file), manifest.json (PWA configuration), and browserconfig.xml (Windows tiles). These files are required for complete cross-platform compatibility.

### Understanding Generated Files

**Favicon PNGs:** Individual PNG files for each size. Use these in HTML <link> tags to specify exact sizes browsers should use. Modern approach preferred over single favicon.ico.

**favicon.ico:** Legacy format for old browsers and root directory fallback. Browsers automatically request /favicon.ico even without HTML tags. Include for maximum compatibility.

**manifest.json:** PWA configuration file listing Android icons, theme colors, and display mode. Required for 'Add to Home Screen' on Android. Reference in HTML with <link rel="manifest">.

**browserconfig.xml:** Windows tile configuration for pinned sites in IE/Edge legacy. Specifies tile colors and icon sizes. Place in site root; Windows automatically discovers it.

**HTML snippets:** Ready-to-use <link> tags for your site's <head> section. Copy and paste these to reference all generated favicons.

### Installing Favicons on Your Website

Download the generated ZIP and extract all files. Upload favicon files to your website's root directory or a subdirectory like /icons/. If using a subdirectory, update paths in HTML tags accordingly.

Copy the generated HTML <link> tags and paste into your website's <head> section, typically in your HTML template or layout file. For static sites, add to index.html. For dynamic sites (React, Next.js, WordPress), add to the HTML template or use helmet/metadata APIs.

Upload manifest.json to your site's root directory and reference it: <link rel="manifest" href="/manifest.json">. Ensure Android icon paths in manifest.json match your uploaded files.

### Testing Your Favicons

Open your website in a browser and check the tab icon - it should display your favicon. Try multiple browsers (Chrome, Firefox, Safari, Edge) to ensure compatibility. Bookmark your site and verify the favicon appears in bookmarks bar.

On iOS, tap Share → Add to Home Screen and check the icon quality on your home screen. On Android, tap Menu → Add to Home Screen and verify the icon. Test on multiple devices if possible to catch rendering issues.

Use browser DevTools to check for 404 errors on favicon requests. Common issue: incorrect paths in <link> tags causing browsers to fail loading icons.`,
    steps: [
      {
        name: "Upload Source Image",
        text: "Upload a square PNG or SVG (512x512px recommended) with transparent background. Bold, simple designs work best for small sizes.",
      },
      {
        name: "Generate All Sizes",
        text: "Click Generate to create all standard favicon sizes: 16x16 to 512x512, Apple Touch Icon, Android icons, manifest.json, and browserconfig.xml.",
      },
      {
        name: "Download Package",
        text: "Download the ZIP containing all favicons, manifest files, and HTML integration code. Extract files to your website directory.",
      },
      {
        name: "Add HTML and Test",
        text: "Copy generated <link> tags to your site's <head>. Upload favicon files. Test on desktop browsers, iOS, and Android devices.",
      }
    ]
  },

  faqs: [
    {
      question: "What size should my source image be?",
      answer: "Use 512x512px or larger square PNG with transparent background. This ensures quality when generating smaller sizes. Higher resolution is better - downscaling maintains quality but upscaling from small images creates pixelation. SVG sources are ideal because they scale infinitely, but convert to PNG at 512x512+ for generation. Never start with a 16x16 image and upscale."
    },
    {
      question: "Do I need all these favicon sizes?",
      answer: "Yes, for full compatibility. 16x16/32x32 for browser tabs, 48x48+ for desktop shortcuts, 180x180 for iOS home screen, 192x192/512x512 for Android/PWA. Each size serves specific platforms. Browsers can downscale large icons if smaller sizes are missing, but quality suffers. Providing all sizes ensures optimal appearance everywhere."
    },
    {
      question: "Why does my favicon not appear after uploading?",
      answer: "Browser cache is the most common issue. Hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac) or open in incognito/private mode. Check HTML <link> tags reference correct paths (/icons/favicon-32x32.png not /favicon-32x32.png if files are in subdirectory). Verify files uploaded to correct directory. Check browser DevTools Network tab for 404 errors on favicon requests."
    },
    {
      question: "Should I use PNG or ICO format?",
      answer: "Use PNG for all sizes in modern web development - better compression, transparency support, and universal browser compatibility. Include legacy favicon.ico in root directory for old browsers and automatic fallback. Modern best practice: PNG files with HTML <link> tags, plus favicon.ico as fallback. Don't use ICO exclusively - it's outdated and has limited size support."
    },
    {
      question: "How do I make my favicon work for dark mode?",
      answer: "Use transparent background PNGs so the icon adapts to browser themes. Avoid solid white or black backgrounds that look bad in dark mode. Design icons with enough contrast to work on both light and dark backgrounds. Advanced: use SVG favicons with CSS prefers-color-scheme media queries to switch colors based on theme, but browser support is limited."
    },
    {
      question: "What's the Apple Touch Icon used for?",
      answer: "Apple Touch Icon (180x180px) is the icon displayed when iOS users save your website to their home screen. It's essentially your mobile app icon for Safari. iOS automatically rounds corners - design for square canvas. Without an Apple Touch Icon, iOS captures a screenshot of your site which looks unprofessional. Always include for iOS compatibility."
    },
    {
      question: "Do I need manifest.json if I'm not building a PWA?",
      answer: "Yes, modern Android browsers use manifest.json icons for 'Add to Home Screen' even for regular websites (not just PWAs). Without manifest.json, Android uses a low-quality screenshot or generic icon. Include manifest.json with 192x192 and 512x512 icons for proper Android support. Bonus: manifest.json enables PWA features (offline, installable) if you add service worker later."
    },
    {
      question: "Can I use text in my favicon?",
      answer: "Only for single letters or very simple wordmarks. At 16x16px, multi-character text becomes illegible. If your logo includes text, use an icon version or single letter instead. Test how text looks at 16x16px - if it's unreadable, simplify. Exception: if your brand is a single letter (A, M, T), it works well as favicon. Multi-word text never works at small sizes."
    },
    {
      question: "Why does my favicon look pixelated on mobile?",
      answer: "You're missing high-resolution icons (180x180 for iOS, 192x192/512x512 for Android). Browsers upscale small favicons (16x16, 32x32) for home screen icons, causing pixelation. Generate dedicated mobile icons at correct sizes. Also check source image quality - starting with low-resolution logo creates pixelated results at all sizes. Use 512x512+ source."
    },
    {
      question: "How often should I update my favicon?",
      answer: "Update favicon when rebranding (new logo, colors), launching major redesigns, or fixing quality issues (pixelation, wrong colors). Otherwise, keep favicon consistent for brand recognition. Users remember and identify your site by favicon - frequent changes confuse users. If updating, keep similar shapes/colors for continuity. Cache busting (add ?v=2 to URLs) forces browsers to download new icons."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This favicon generator operates entirely client-side in your browser. Your uploaded images are processed locally using the HTML5 Canvas API for resizing and optimization. No images are uploaded to servers or stored anywhere.

### Privacy Guarantees

- **100% Client-Side Processing:** All image resizing, format conversion, and file generation happen in your browser using JavaScript and Canvas API.
- **No Server Uploads:** We have no backend servers to process images. Your logo never leaves your device.
- **No Data Storage:** Your uploaded images and generated favicons are not saved, logged, or transmitted. Refresh the page and everything is cleared.
- **No Analytics Tracking:** We don't track what images you upload, what favicons you generate, or any usage patterns.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during generation - zero uploads.

Safe for generating favicons from confidential logos, unreleased brand designs, client work, or any proprietary graphics. Use with confidence for sensitive projects, pre-launch products, or confidential rebrands.`
  },

  stats: {
    "Generated Sizes": "8",
    "Output Formats": "PNG+ICO",
    "Config Files": "2",
    "Min Resolution": "512x512"
  }
};
