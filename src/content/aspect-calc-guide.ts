/**
 * Aspect Ratio Calculator Tool Guide Content
 * Comprehensive developer guide for aspect ratio calculations
 */

import type { ToolGuideContent } from "./types";

export const aspectCalcGuideContent: ToolGuideContent = {
  toolName: "Aspect Ratio Calculator",
  toolPath: "/aspect-calc",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Original Dimensions",
      description: "Input the width and height of your source image, video, or container. The calculator automatically computes the simplified aspect ratio (16:9, 4:3) and decimal equivalent."
    },
    {
      title: "Calculate New Dimensions",
      description: "Enter either target width or target height. The calculator instantly computes the other dimension while maintaining the exact aspect ratio of your original."
    },
    {
      title: "Apply Common Ratio Presets",
      description: "Click preset buttons (16:9, 4:3, 1:1, 9:16) to instantly apply standard aspect ratios to your current width. Perfect for quick platform-specific conversions."
    },
    {
      title: "Copy and Use Results",
      description: "Click any result value to copy to clipboard. Use the calculated dimensions in video exports, image resizing tools, CSS containers, or design software."
    }
  ],

  introduction: {
    title: "What is an Aspect Ratio Calculator?",
    content: `An aspect ratio calculator is a precision tool that computes dimensions while maintaining proportional relationships between width and height. Essential for video production, image resizing, responsive web design, and multi-platform content creation, aspect ratio calculators ensure content displays correctly without distortion or unwanted cropping across different devices and platforms.

Aspect ratio represents the proportional relationship between an element's width and height, expressed as a ratio (16:9) or decimal (1.778). When resizing media, maintaining aspect ratio is critical - changing one dimension requires proportional adjustment of the other. Manual calculations are error-prone; calculators provide instant, accurate results.

### Why Developers Need Aspect Ratio Calculators

Responsive design requires precise aspect ratio calculations for image containers, video embeds, and card components. CSS aspect-ratio property values come from ratio calculations. Padding-bottom percentage hacks depend on decimal ratio values (height/width × 100%).

Video encoding workflows need exact dimensions. Exporting 4K video at 16:9 requires 3840×2160 pixels precisely. Off by even a few pixels causes black bars or distortion. Calculators eliminate manual math errors in production pipelines.

Multi-platform content creation requires different dimensions for each platform while maintaining visual consistency. A 1920×1080 YouTube video needs to be resized to 1080×1920 for TikTok, 1080×1350 for Instagram portrait, and 1080×1080 for Instagram square. Calculators provide instant conversions.

Image optimization for responsive web requires multiple image sizes (srcset) at identical aspect ratios. A hero image at 16:9 needs 400px, 800px, 1200px, and 1600px widths - each requiring exact height calculation. Calculators ensure consistent ratios across all sizes, preventing layout shift.

### Aspect Ratio Math Explained

**Calculating Aspect Ratio:** Divide width by height to get decimal ratio. Divide both by their greatest common divisor (GCD) to get simplified ratio notation.

Example: 1920 ÷ 1080 = 1.778 (decimal). GCD(1920, 1080) = 120. Therefore 1920÷120 : 1080÷120 = 16:9 (simplified).

**Scaling Width from Height:** width = height × (original_width / original_height).
Example: For 16:9 at 1080px height: width = 1080 × (16/9) = 1920px.

**Scaling Height from Width:** height = width × (original_height / original_width).
Example: For 16:9 at 3840px width: height = 3840 × (9/16) = 2160px.

**Converting Ratio to Percentage (CSS):** percentage = (height / width) × 100.
Example: 16:9 = (9/16) × 100 = 56.25% (used in padding-bottom hack).

### Common Use Cases for Aspect Ratio Calculators

**Video Production Workflows:** Calculate exact export dimensions for different platforms. Source footage at 3840×2160 needs derivatives at 1920×1080 (16:9 HD), 1280×720 (16:9 SD), 1080×1920 (9:16 vertical), 1080×1080 (1:1 square). Calculator ensures all maintain proper ratios.

**Responsive Image Generation:** Create srcset images at multiple widths with consistent aspect ratios. Original 1600×1200 (4:3) needs versions at 400w, 800w, 1200w - heights must be 300px, 600px, 900px respectively for consistency.

**CSS Container Sizing:** Calculate padding-bottom percentages for aspect ratio boxes in older browsers. For 21:9 ultrawide: (9/21) × 100 = 42.857%.

**Design Mockup Resizing:** Resize design comps for different devices while maintaining proportions. Desktop mockup at 1440×900 needs mobile version at 375px wide - calculator provides exact height of 234px.

**Social Media Template Creation:** Design templates that adapt to multiple platform requirements. Master template at 1920×1080 scales to Instagram 1:1 (1080×1080), 4:5 (1080×1350), and Stories 9:16 (1080×1920).

### Precision and Rounding

Aspect ratio calculations often produce decimal values. A 1920×1080 image scaled to 800px width yields 450px height exactly. However, scaling to 500px width produces 281.25px height.

Pixels must be whole integers - you can't have 281.25 pixels. Calculators round to nearest integer (281px in this case). Minor rounding can accumulate errors over multiple operations, but single-stage calculations remain accurate.

For critical work requiring exact ratios, work in sizes that divide evenly. 16:9 content at widths of 1920, 1280, 960, 640, 480, 320 all produce whole-number heights. Arbitrary widths may require rounding.

### Maintaining Ratio vs Changing Ratio

**Maintaining Ratio (scaling):** Both dimensions change proportionally. No distortion, no cropping. Content appears identical, just larger or smaller. This is what aspect ratio calculators do.

**Changing Ratio (cropping/letterboxing):** Going from 16:9 to 1:1 requires either cropping (losing edges) or letterboxing (adding bars). No distortion, but composition changes or bars appear.

**Changing Ratio (stretching):** Forcing content into different ratio without crop. Causes distortion - circles become ovals, squares become rectangles. Avoid except for artistic effect.

Calculators help maintain ratios. To change ratios while preserving quality, use crop tools or design for target ratio from start.

### Platform-Specific Calculations

**YouTube 16:9:** For 1080p (1920×1080) or 4K (3840×2160). Scaling to custom width: 1280px wide = 720px tall (720p).

**Instagram:**
- Square 1:1 at 1080×1080
- Portrait 4:5: 1080 wide = 1350 tall
- Stories 9:16: 1080 wide = 1920 tall

**TikTok 9:16:** Full HD vertical is 1080×1920. Scaling to 720px wide = 1280px tall.

**Twitter/X 16:9:** Optimal at 1200×675 for in-stream images. Scaling maintains ratio.

**Website Hero Images:** Often 21:9 for ultrawide impact. At 1920px wide = 823px tall. At 1440px wide = 617px tall.

### CSS Integration

Modern aspect-ratio property uses ratio notation directly: aspect-ratio: 16 / 9;. Calculator provides both ratio notation and decimal for flexibility.

Padding-bottom hack uses percentage: padding-bottom: 56.25%; for 16:9. Calculator can provide this value directly: (height/width × 100).

Tailwind CSS custom ratios: aspect-[16/9] or extend config with calculated ratio values. Use calculator to determine ratio notation for custom values.

### Workflow Integration

**Automated Build Pipelines:** Integrate calculations into image processing scripts. Sharp (Node.js) and Pillow (Python) accept aspect ratio constraints when resizing.

**Design Systems:** Document component aspect ratios in design tokens. Use calculator to maintain consistency: all cards 4:3, all heroes 21:9, all avatars 1:1.

**Content Management Systems:** Calculate thumbnail dimensions from original uploads. Store aspect ratio with assets to ensure consistent rendering across templates.

**Video Encoding Scripts:** FFmpeg commands require exact dimensions. Calculator ensures no scaling artifacts or black bars appear in output.`,
  },

  useCases: [
    {
      title: "Multi-Platform Video Export Dimensions",
      description: "Calculate exact export dimensions for video content targeting multiple platforms (YouTube, TikTok, Instagram). Maintain aspect ratio consistency while meeting platform-specific resolution requirements.",
      example: `# Video Export Dimension Calculations

# Source: 4K 16:9 footage (3840×2160)

# YouTube 1080p (16:9):
# 1920px wide → 1080px tall

# YouTube 720p (16:9):
# 1280px wide → 720px tall

# Instagram Reels (9:16 vertical):
# 1080px wide → 1920px tall
# (requires rotation/reframing from 16:9 source)

# Instagram Feed Square (1:1):
# 1080px wide → 1080px tall
# (requires crop from 16:9 source)

# Instagram Portrait (4:5):
# 1080px wide → 1350px tall
# (requires crop from 16:9 source)

# TikTok (9:16 vertical):
# 1080px wide → 1920px tall

# FFmpeg commands using calculated dimensions:

# Export 1080p 16:9 for YouTube
ffmpeg -i source.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 18 youtube-1080p.mp4

# Export 720p 16:9 for YouTube
ffmpeg -i source.mp4 -vf scale=1280:720 -c:v libx264 -preset slow -crf 20 youtube-720p.mp4

# Export 9:16 for TikTok/Reels (crops center)
ffmpeg -i source.mp4 -vf "crop=1080:1920:960:0,scale=1080:1920" -c:v libx264 tiktok.mp4

# Export 1:1 for Instagram (crops center)
ffmpeg -i source.mp4 -vf "crop=2160:2160:840:0,scale=1080:1080" -c:v libx264 instagram-square.mp4

# Export 4:5 for Instagram Portrait (crops center)
ffmpeg -i source.mp4 -vf "crop=1728:2160:1056:0,scale=1080:1350" -c:v libx264 instagram-portrait.mp4

# Automated workflow script
const videoExports = {
  source: { width: 3840, height: 2160, ratio: "16:9" },
  targets: [
    { platform: "YouTube 1080p", width: 1920, height: 1080, ratio: "16:9" },
    { platform: "YouTube 720p", width: 1280, height: 720, ratio: "16:9" },
    { platform: "TikTok", width: 1080, height: 1920, ratio: "9:16" },
    { platform: "Instagram Square", width: 1080, height: 1080, ratio: "1:1" },
    { platform: "Instagram Portrait", width: 1080, height: 1350, ratio: "4:5" }
  ]
};

// Calculate and validate export dimensions
videoExports.targets.forEach(target => {
  const [w, h] = target.ratio.split(':').map(Number);
  const calculatedHeight = Math.round(target.width * (h / w));
  console.log(\`\${target.platform}: \${target.width}×\${calculatedHeight}\`);
});`
    },
    {
      title: "Responsive Image srcset Generation",
      description: "Generate multiple image sizes for srcset with consistent aspect ratios. Prevents layout shift (CLS) by ensuring all image variants maintain identical proportions for responsive delivery.",
      example: `// Original image: 1600×1200 (4:3 aspect ratio)

const originalWidth = 1600;
const originalHeight = 1200;
const aspectRatio = originalWidth / originalHeight; // 1.333

// Calculate srcset sizes maintaining 4:3
const srcsetSizes = [400, 800, 1200, 1600];

const imageSizes = srcsetSizes.map(width => {
  const height = Math.round(width / aspectRatio);
  return { width, height };
});

// Result:
// 400×300, 800×600, 1200×900, 1600×1200
// All maintain 4:3 ratio precisely

// HTML output
const srcsetHTML = \`
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w,
    image-1600.jpg 1600w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  width="1600"
  height="1200"
  alt="Description"
  loading="lazy"
/>
\`;

// Sharp (Node.js) image processing with aspect ratio calculation
const sharp = require('sharp');

async function generateResponsiveImages(inputPath, outputBase) {
  const metadata = await sharp(inputPath).metadata();
  const aspectRatio = metadata.width / metadata.height;

  const sizes = [400, 800, 1200, 1600];

  for (const width of sizes) {
    const height = Math.round(width / aspectRatio);

    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(\`\${outputBase}-\${width}.jpg\`);

    console.log(\`Generated: \${width}×\${height}\`);
  }
}

// Usage
await generateResponsiveImages('source.jpg', 'image');

// CSS aspect-ratio for container (prevents CLS)
.image-container {
  aspect-ratio: 4 / 3;
  width: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// React component with calculated aspect ratio
const ResponsiveImage = ({ src, alt, originalWidth, originalHeight }) => {
  const ratio = originalWidth / originalHeight;

  return (
    <div style={{ aspectRatio: \`\${originalWidth}/\${originalHeight}\`, width: "100%" }}>
      <img
        src={src}
        srcSet={\`
          \${src}-400.jpg 400w,
          \${src}-800.jpg 800w,
          \${src}-1200.jpg 1200w,
          \${src}-1600.jpg 1600w
        \`}
        sizes="(max-width: 600px) 100vw, 50vw"
        alt={alt}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};`
    },
    {
      title: "CSS Aspect Ratio Container Calculations",
      description: "Calculate padding-bottom percentages for legacy browser aspect ratio containers or modern aspect-ratio property values. Essential for maintaining proportions in responsive layouts and preventing cumulative layout shift.",
      example: `// Calculate padding-bottom percentage for aspect ratio containers

function calculatePaddingBottom(width, height) {
  return (height / width) * 100;
}

// Common aspect ratios and their padding values:

// 16:9 (widescreen)
const ratio16_9 = calculatePaddingBottom(16, 9);
// 56.25%

// 4:3 (classic)
const ratio4_3 = calculatePaddingBottom(4, 3);
// 75%

// 21:9 (ultrawide)
const ratio21_9 = calculatePaddingBottom(21, 9);
// 42.857%

// 1:1 (square)
const ratio1_1 = calculatePaddingBottom(1, 1);
// 100%

// 9:16 (vertical)
const ratio9_16 = calculatePaddingBottom(9, 16);
// 177.778%

/* Legacy padding-bottom hack */
.video-container-16-9 {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
  height: 0;
  overflow: hidden;
}

.video-container-16-9 iframe,
.video-container-16-9 video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Modern aspect-ratio property */
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Progressive enhancement with fallback */
.responsive-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

@supports not (aspect-ratio: 16 / 9) {
  .responsive-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }

  .responsive-container > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

// React component with dynamic aspect ratio
const AspectRatioBox = ({ ratio = "16/9", children }) => {
  const [width, height] = ratio.split('/').map(Number);
  const paddingBottom = (height / width) * 100;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: \`\${paddingBottom}%\`,
        height: 0,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Usage
<AspectRatioBox ratio="21/9">
  <img src="ultrawide.jpg" alt="Ultrawide image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</AspectRatioBox>

// Tailwind CSS config with calculated ratios
module.exports = {
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '4/5': '4 / 5',
      }
    }
  }
};

// Usage in Tailwind
<div class="aspect-[21/9] w-full">
  <img src="hero.jpg" alt="Hero" class="w-full h-full object-cover" />
</div>`
    },
    {
      title: "Design System Dimension Standards",
      description: "Establish and maintain consistent aspect ratios across design system components. Calculate exact dimensions for cards, thumbnails, avatars, and media containers to ensure visual harmony and predictable layouts.",
      example: `// Design System Aspect Ratio Standards

const designTokens = {
  aspectRatios: {
    // Component-specific ratios
    card: { ratio: "4:3", decimal: 1.333 },
    thumbnail: { ratio: "16:9", decimal: 1.778 },
    avatar: { ratio: "1:1", decimal: 1.0 },
    hero: { ratio: "21:9", decimal: 2.333 },
    portrait: { ratio: "2:3", decimal: 0.667 },

    // Platform-specific
    youtube: { ratio: "16:9", decimal: 1.778 },
    instagram: { ratio: "1:1", decimal: 1.0 },
    instagramPortrait: { ratio: "4:5", decimal: 0.8 },
    tiktok: { ratio: "9:16", decimal: 0.5625 }
  },

  // Calculated dimensions at standard widths
  cardSizes: {
    small: { width: 240, height: 180 },   // 240 / (4/3) = 180
    medium: { width: 320, height: 240 },  // 320 / (4/3) = 240
    large: { width: 480, height: 360 }    // 480 / (4/3) = 360
  },

  thumbnailSizes: {
    small: { width: 160, height: 90 },    // 160 / (16/9) = 90
    medium: { width: 320, height: 180 },  // 320 / (16/9) = 180
    large: { width: 640, height: 360 }    // 640 / (16/9) = 360
  },

  avatarSizes: {
    tiny: { width: 32, height: 32 },      // 1:1
    small: { width: 48, height: 48 },
    medium: { width: 64, height: 64 },
    large: { width: 96, height: 96 },
    xlarge: { width: 128, height: 128 }
  }
};

// Function to calculate height from width and ratio
function calculateHeight(width, ratioDecimal) {
  return Math.round(width / ratioDecimal);
}

// Function to calculate width from height and ratio
function calculateWidth(height, ratioDecimal) {
  return Math.round(height * ratioDecimal);
}

// Generate all card sizes programmatically
function generateCardSizes(baseWidths, ratio = "4:3") {
  const [w, h] = ratio.split(':').map(Number);
  const decimal = w / h;

  return baseWidths.reduce((acc, width) => {
    const height = calculateHeight(width, decimal);
    acc[width] = { width, height };
    return acc;
  }, {});
}

const cardDimensions = generateCardSizes([240, 320, 400, 480, 640]);
// {
//   240: { width: 240, height: 180 },
//   320: { width: 320, height: 240 },
//   ...
// }

// CSS Variables from design tokens
:root {
  --ratio-card: 4 / 3;
  --ratio-thumbnail: 16 / 9;
  --ratio-avatar: 1 / 1;
  --ratio-hero: 21 / 9;

  --card-sm-width: 240px;
  --card-sm-height: 180px;
  --card-md-width: 320px;
  --card-md-height: 240px;
  --card-lg-width: 480px;
  --card-lg-height: 360px;
}

/* Component styles using tokens */
.card-small {
  aspect-ratio: var(--ratio-card);
  width: var(--card-sm-width);
}

.thumbnail {
  aspect-ratio: var(--ratio-thumbnail);
  width: 100%;
}

.avatar {
  aspect-ratio: var(--ratio-avatar);
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

// React component library
const Card = ({ size = "medium", children }) => {
  const dimensions = designTokens.cardSizes[size];

  return (
    <div
      className="card"
      style={{
        aspectRatio: "4/3",
        width: \`\${dimensions.width}px\`,
        maxWidth: "100%"
      }}
    >
      {children}
    </div>
  );
};

const Thumbnail = ({ src, alt, size = "medium" }) => {
  const dimensions = designTokens.thumbnailSizes[size];

  return (
    <div style={{ aspectRatio: "16/9", width: \`\${dimensions.width}px\` }}>
      <img
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

// Documentation generation
const componentDocs = Object.entries(designTokens.cardSizes).map(([size, dims]) => ({
  component: "Card",
  size,
  dimensions: \`\${dims.width}×\${dims.height}\`,
  ratio: "4:3"
}));

console.table(componentDocs);`
    }
  ],

  howToUse: {
    title: "How to Use This Aspect Ratio Calculator",
    content: `This calculator computes precise dimensions while maintaining aspect ratio proportions. Input original dimensions to see the simplified ratio, then scale to new sizes without distortion.

### Entering Original Dimensions

Input the width and height of your source image, video, or container. The calculator automatically:
- Calculates the simplified aspect ratio (16:9, 4:3, etc.)
- Computes the decimal ratio (1.778, 1.333, etc.)
- Displays the resolution in width×height format

All three representations update in real-time as you change dimensions. Click any result to copy to clipboard.

### Scaling to New Dimensions

Enter EITHER a new width OR a new height - not both:

**Enter Width:** Calculator computes matching height. Example: 16:9 ratio, enter 1280px width → calculator shows 720px height.

**Enter Height:** Calculator computes matching width. Example: 16:9 ratio, enter 1080px height → calculator shows 1920px width.

The result maintains the exact aspect ratio of your original dimensions. Rounding to nearest whole pixel ensures valid integer dimensions.

### Using Common Ratio Presets

Click preset buttons to instantly apply standard aspect ratios:
- **16:9** - HD video, YouTube, modern displays
- **4:3** - Classic TV, some photography
- **1:1** - Square, Instagram, profile pictures
- **9:16** - Vertical video, TikTok, Stories
- **21:9** - Ultrawide, cinematic
- **3:2** - Photography, 35mm film
- **4:5** - Instagram portrait

Presets apply the ratio to your current width value. Width stays the same, height recalculates based on the selected ratio.

### Understanding the Results

**Simplified Ratio:** The ratio reduced to smallest whole numbers. 1920×1080 simplifies to 16:9 by dividing both by GCD (120).

**Decimal Ratio:** Width divided by height as a decimal. Useful for calculations and CSS. 16:9 = 1.778.

**Resolution:** Original dimensions in width×height format. Click to copy for use in export dialogs or specifications.

**New Dimensions:** Calculated result maintaining aspect ratio. Both width and height shown, click to copy individually.

### Copying Results

Click any displayed value to copy to clipboard:
- Click simplified ratio to copy "16:9"
- Click decimal to copy "1.78"
- Click resolution to copy "1920x1080"
- Click calculated width/height to copy individual dimension

Use copied values in:
- Video export dialogs (1920×1080)
- CSS aspect-ratio property (16/9)
- Design software dimension fields
- Documentation and specifications

### Keyboard Shortcuts

- **Tab:** Navigate between width and height inputs
- **Arrow Up/Down:** Increment/decrement values by 1
- **Shift + Arrow:** Increment/decrement by 10
- **Ctrl+C / Cmd+C:** Copy selected result

### Working with Decimals

Calculator handles decimal inputs but rounds final dimensions to whole integers (pixels must be whole numbers).

Example: 16:9 ratio, 500px width → exact calculation is 281.25px height → rounds to 281px.

Minor rounding errors accumulate over multiple operations. For critical work, use dimensions that divide evenly or accept 1-pixel variance.

### Chaining Calculations

To resize multiple times while maintaining ratio:
1. Calculate first resize (1920×1080 → 1280×720)
2. Use the 1280×720 result as new starting point
3. Calculate second resize (1280×720 → 640×360)

All results maintain the original 16:9 ratio.

### Integration with Workflows

**Video Encoding:** Use calculated dimensions directly in FFmpeg scale filter: scale=1280:720.

**Image Processing:** Input dimensions into Sharp, Pillow, ImageMagick resize commands.

**CSS Development:** Use decimal ratio for padding-bottom hack, or ratio notation for aspect-ratio property.

**Design Handoff:** Document exact component dimensions in specs. "Cards: 320×240 (4:3 ratio)".

### Validation

The calculator validates inputs:
- Negative values automatically convert to positive
- Zero values default to 1 to prevent division errors
- Non-numeric inputs are ignored
- Results update only with valid numeric inputs

### Performance Considerations

All calculations happen client-side in your browser with instant results. No network requests, no server processing. Safe for proprietary dimension requirements or confidential project specifications.`,
    steps: [
      {
        name: "Enter Original Dimensions",
        text: "Input source width and height. Calculator shows simplified ratio (16:9), decimal (1.78), and resolution (1920×1080) automatically.",
      },
      {
        name: "Calculate New Size",
        text: "Enter target width OR height. Calculator computes the other dimension maintaining exact aspect ratio. Result updates instantly.",
      },
      {
        name: "Apply Ratio Preset (Optional)",
        text: "Click preset buttons (16:9, 4:3, 1:1, 9:16) to apply standard aspect ratios to current width. Height recalculates automatically.",
      },
      {
        name: "Copy and Use Results",
        text: "Click any result value to copy to clipboard. Use in video exports, image resizing, CSS containers, or design documentation.",
      }
    ]
  },

  faqs: [
    {
      question: "How do I calculate height from width while maintaining aspect ratio?",
      answer: "Divide width by the aspect ratio decimal. For 16:9 ratio (1.778) at 1280px width: 1280 / 1.778 = 720px height. Or multiply width by (height/width) from original: 1280 × (9/16) = 720px. This calculator does the math automatically - enter target width, it computes matching height instantly."
    },
    {
      question: "What does the simplified aspect ratio mean?",
      answer: "Simplified ratio reduces both dimensions to their smallest whole number relationship using the greatest common divisor (GCD). Example: 1920×1080 both divide by 120, giving 16:9. This is the same ratio as 1280×720, 3840×2160, or any dimensions with the same proportional relationship. Simplified ratios are easier to understand and communicate than large numbers."
    },
    {
      question: "Why does my calculated dimension have decimal places?",
      answer: "Aspect ratio math sometimes produces fractional pixels (e.g., 281.25px). Since pixels must be whole integers, the calculator rounds to the nearest whole number (281px). This causes minor deviation from perfect ratio but is unavoidable. For critical work, use source dimensions that divide evenly by your target ratio to avoid rounding."
    },
    {
      question: "Can I use this calculator for vertical (portrait) aspect ratios?",
      answer: "Yes. Enter height larger than width and the calculator handles vertical ratios correctly. Example: 1080 width × 1920 height = 9:16 ratio (vertical video for TikTok/Reels). The calculator works for any orientation - landscape (width > height), portrait (height > width), or square (width = height)."
    },
    {
      question: "How do I convert aspect ratio to CSS padding-bottom percentage?",
      answer: "Divide height by width, then multiply by 100. For 16:9: (9/16) × 100 = 56.25%. For 4:3: (3/4) × 100 = 75%. This percentage is used in the padding-bottom hack for aspect ratio containers in older browsers. Modern CSS uses aspect-ratio property directly: aspect-ratio: 16 / 9; (no percentage needed)."
    },
    {
      question: "What's the difference between 16:9 and 1.78 aspect ratio?",
      answer: "They're the same ratio in different formats. 16:9 is ratio notation (16 units wide for every 9 units tall). 1.78 is the decimal equivalent (16÷9 = 1.778 rounded). Ratio notation is intuitive for communication, decimal is useful for calculations and some CSS properties. Use whichever format fits your context."
    },
    {
      question: "How do I resize an image while maintaining aspect ratio?",
      answer: "Decide which dimension you want to fix (width or height), then calculate the other. Example: resize to 800px width - calculate matching height based on original aspect ratio. Use this calculator: enter original dimensions, then enter 800 as target width. Result shows exact height to maintain ratio. Use these dimensions in your image editor or processing tool."
    },
    {
      question: "Can I calculate dimensions for multiple platform exports at once?",
      answer: "While the calculator processes one conversion at a time, you can quickly calculate multiple exports: 1) Enter original dimensions once. 2) Apply platform presets (16:9 for YouTube, 9:16 for TikTok, 1:1 for Instagram) by clicking preset buttons. 3) For custom sizes, enter target width/height for each platform sequentially. Copy each result before moving to the next."
    },
    {
      question: "Why doesn't my calculated ratio match common ratios exactly?",
      answer: "If your source dimensions don't match standard ratios, the calculator shows the actual ratio of your content. Example: 1366×768 = 16:9.1875 (not exactly 16:9). This is common with laptop displays or arbitrary crops. To standardize, resize to proper ratio dimensions (1366×768 → 1360×765 for true 16:9) or accept the slight variation."
    },
    {
      question: "Is my dimension data private when using this calculator?",
      answer: "Yes. All calculations happen client-side in your browser using JavaScript. No dimensions, ratios, or results are sent to servers. No tracking, no storage. Safe for proprietary projects, client work, or confidential specifications. The calculator works offline after initial page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your dimension calculations never leave your browser. This calculator operates entirely client-side using JavaScript. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All aspect ratio calculations and dimension math happen in your browser's JavaScript engine.
- **No Server Communication:** Your dimensions, ratios, and calculated results are never sent to any servers.
- **No Data Storage:** We don't save your calculations, dimensions, or aspect ratios on our servers.
- **No Analytics Tracking:** We don't track which ratios you calculate or dimensions you use.
- **Works Offline:** After initial page load, the calculator functions completely offline with no network requests.

This makes the tool safe for calculating dimensions for proprietary projects, client work, confidential specifications, or sensitive content. Use with confidence for commercial and personal projects.

### Performance

All calculations are instant (< 1ms) using native JavaScript math operations. No API calls, no network latency. Results update in real-time as you type, providing immediate feedback for iterative design work.`
  },

  stats: {
    "Calculation Precision": "100%",
    "Processing Speed": "<1ms",
    "Supported Ratios": "Unlimited",
    "Client-Side": "100%",
    "Server Uploads": "0"
  }
};
