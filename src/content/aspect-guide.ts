/**
 * Aspect Ratio Reference Tool Guide Content
 * Comprehensive developer guide for aspect ratio reference and common ratios
 */

import type { ToolGuideContent } from "./types";

export const aspectGuideContent: ToolGuideContent = {
  toolName: "Aspect Ratio Reference",
  toolPath: "/aspect",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Browse Common Aspect Ratios",
      description: "View popular aspect ratios like 16:9 (HD video), 4:3 (classic TV), 1:1 (square), and 9:16 (mobile video) with descriptions and use cases for each format."
    },
    {
      title: "Understand Ratio Context",
      description: "Learn where each aspect ratio is commonly used - video production, photography, social media, web design, or print. Each ratio includes platform-specific guidance."
    },
    {
      title: "Apply to Your Design",
      description: "Use the reference to determine the correct aspect ratio for your project. Match platform requirements (YouTube 16:9, Instagram 1:1 or 4:5) or creative intent."
    },
    {
      title: "Calculate Dimensions",
      description: "Use the calculator to convert aspect ratios to specific pixel dimensions. Input width to get height, or vice versa, maintaining perfect proportions."
    }
  ],

  introduction: {
    title: "What is an Aspect Ratio Reference?",
    content: `An aspect ratio reference is a comprehensive guide to common aspect ratios used in video production, photography, web design, and digital media. Aspect ratios define the proportional relationship between width and height, expressed as a ratio (16:9) or decimal (1.78). Understanding aspect ratios is essential for creating content that displays correctly across different platforms, devices, and media types without distortion or cropping.

Aspect ratios determine how content appears on screens and in print. A 16:9 video uploaded to a 1:1 Instagram post will be cropped or letterboxed. A 4:3 image displayed in a 16:9 container will have black bars or be stretched. Choosing the correct aspect ratio ensures content looks professional and displays as intended across all platforms.

### Why Aspect Ratios Matter for Developers

Responsive design requires understanding aspect ratios to maintain visual consistency across devices. Images, videos, and containers need aspect ratio constraints to prevent layout shift during loading. CSS aspect-ratio property and padding-bottom hacks depend on knowing the correct ratio values.

Video production platforms have strict aspect ratio requirements. YouTube recommends 16:9 for desktop, TikTok requires 9:16 vertical, Instagram supports 1:1 square and 4:5 portrait. Uploading incorrect ratios results in cropping, black bars, or content rejection.

Image optimization relies on aspect ratios for responsive images. srcset and picture elements serve different image sizes while maintaining consistent aspect ratio. Art direction (different crops for mobile vs desktop) requires understanding how ratios change visual composition.

CSS developers use aspect ratios for maintaining proportions in responsive layouts. The aspect-ratio property (aspect-ratio: 16/9) creates containers that scale proportionally. Before native support, padding-bottom percentage hacks achieved the same effect using ratio math.

### Common Aspect Ratios Explained

**16:9 (1.78:1) - HD Widescreen Standard:** Most popular modern ratio. Native for HD video (1920x1080), 4K (3840x2160), YouTube, modern TVs, computer monitors, and widescreen laptops. Cinematic feel with horizontal emphasis. Standard for video content.

**4:3 (1.33:1) - Classic Television:** Traditional TV and monitor ratio pre-2000s. Still used for legacy content, some photography (Micro Four Thirds cameras), presentations, and iPad displays. More square than 16:9, provides vertical content space.

**1:1 (1:1) - Square Format:** Equal width and height. Instagram's original format (still popular), profile pictures, album covers, and symmetrical design. No orientation bias, works equally well on all devices. Simple crop for multi-platform content.

**9:16 (0.56:1) - Vertical Video:** Portrait orientation, standard for mobile-first content. TikTok, Instagram Reels, YouTube Shorts, smartphone screens. Optimized for one-handed phone use. Essential for modern social media.

**21:9 (2.33:1) - Ultrawide:** Cinematic widescreen for movies and ultrawide monitors. Creates dramatic horizontal framing, immersive gaming, and multi-window productivity setups. Common in high-end displays and film production.

**3:2 (1.5:1) - Photography Standard:** Traditional 35mm film ratio, used by full-frame and APS-C cameras. Balanced composition between square and widescreen. Good for both landscape and portrait photography.

**4:5 (0.8:1) - Instagram Portrait:** Slightly taller than square, Instagram's portrait ratio. Maximizes vertical screen space on mobile while remaining compact. Popular for product photography and portrait posts.

**2:3 (0.67:1) - Portrait Photography:** Vertical version of 3:2, standard for portrait photography and magazine covers. Emphasizes vertical subjects, human figures, architecture.

### Aspect Ratio Math and Calculations

Aspect ratio is calculated as width divided by height. 1920x1080 = 1920/1080 = 1.78 (or 16:9 when simplified). To simplify, find the greatest common divisor (GCD) and divide both dimensions by it.

Converting ratio to dimensions: multiply base size by ratio. For 16:9 at 1920px width: height = 1920 / (16/9) = 1080px. For 9:16 at 1080px height: width = 1080 / (16/9) = 607px.

Scaling while maintaining aspect ratio: multiply both dimensions by the same factor. 1920x1080 scaled 0.5x = 960x540 (still 16:9). Scaling only one dimension breaks the ratio and causes distortion.

Aspect ratio in CSS: padding-bottom percentage hack uses ratio decimal. For 16:9: padding-bottom: 56.25% (9/16 = 0.5625). Native aspect-ratio property uses ratio directly: aspect-ratio: 16/9.

### Platform-Specific Aspect Ratio Requirements

**YouTube:** Recommends 16:9 (1920x1080 or 3840x2160). Accepts vertical 9:16 but adds black bars on desktop. Thumbnails are 16:9 (1280x720 min).

**Instagram Feed:** 1:1 square (1080x1080), 4:5 portrait (1080x1350), 16:9 landscape (1080x607). Stories and Reels: 9:16 (1080x1920).

**TikTok:** 9:16 vertical (1080x1920) required. Horizontal videos are letterboxed and discouraged.

**Twitter/X:** Accepts 16:9 and 1:1. In-stream images display best at 16:9 (1200x675). Header images are 3:1 (1500x500).

**Facebook:** 1.91:1 to 4:5 range. Link previews are 1.91:1 (1200x628). Video recommends 16:9 or 1:1.

**LinkedIn:** 1.91:1 for link previews (1200x627). Profile images 1:1 (400x400), cover photos 4:1 (1584x396).

### CSS aspect-ratio Property

Modern CSS provides native aspect-ratio property for maintaining proportions. Supported in Chrome 88+, Firefox 89+, Safari 15+.

Syntax: aspect-ratio: width / height; Example: aspect-ratio: 16 / 9;

Benefits over padding-bottom hack: cleaner code, works with content inside, integrates with grid/flexbox, explicit intent.

Fallback for older browsers: use @supports to detect and fallback to padding-bottom for unsupported browsers.

### Responsive Images and Aspect Ratios

srcset and sizes attributes serve different image sizes while maintaining aspect ratio. All srcset images should have identical aspect ratio to prevent layout shift.

Art direction with picture element allows different aspect ratios for different breakpoints. Mobile might show 1:1 crop, desktop shows 16:9 - different framing, same image.

object-fit property controls how images fill containers with different aspect ratios. cover crops, contain letterboxes, fill stretches/distorts.

### Choosing the Right Aspect Ratio

Consider platform requirements first. Multi-platform content should use the most versatile ratio (1:1 or 4:5 work on most social platforms).

Content type influences ratio. Talking head videos work in 9:16 or 1:1. Landscape cinematography needs 16:9 or 21:9. Product photography often uses 1:1 or 4:5.

Device context matters. Desktop favors horizontal (16:9), mobile favors vertical (9:16) or square (1:1). Responsive design may require multiple crops.

Composition impact: horizontal ratios emphasize wide scenes and groups. Vertical ratios emphasize height and single subjects. Square balances both directions.`
  },

  useCases: [
    {
      title: "Video Production Platform Compliance",
      description: "Ensure video content meets platform aspect ratio requirements for YouTube (16:9), TikTok (9:16), or Instagram Reels (9:16). Reference common ratios to avoid black bars, cropping, or content rejection during upload.",
      example: `<!-- Responsive 16:9 video embed (YouTube standard) -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

<!-- Modern CSS aspect-ratio approach -->
<div style="aspect-ratio: 16 / 9; width: 100%;">
  <video controls style="width: 100%; height: 100%; object-fit: cover;">
    <source src="video.mp4" type="video/mp4">
  </video>
</div>

/* Tailwind CSS video container */
<div class="aspect-video w-full">
  <video class="w-full h-full object-cover" controls>
    <source src="video.mp4" type="video/mp4">
  </video>
</div>

/* CSS for 9:16 vertical video (TikTok, Reels) */
.vertical-video-container {
  aspect-ratio: 9 / 16;
  max-width: 400px;
  margin: 0 auto;
}

/* Responsive video with fallback */
.video-16-9 {
  aspect-ratio: 16 / 9;
}

@supports not (aspect-ratio: 16 / 9) {
  .video-16-9 {
    position: relative;
    padding-bottom: 56.25%; /* 9/16 = 0.5625 */
  }

  .video-16-9 iframe,
  .video-16-9 video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}`
    },
    {
      title: "Responsive Image Containers",
      description: "Create image containers that maintain aspect ratio during responsive scaling. Prevent layout shift during image loading by reserving correct space. Essential for Core Web Vitals (CLS) optimization and professional layouts.",
      example: `/* Modern aspect-ratio property */
.image-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
  background: #f0f0f0; /* placeholder color */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* crop to fill */
}

/* Different aspect ratios for different contexts */
.hero-image { aspect-ratio: 21 / 9; } /* ultrawide */
.card-image { aspect-ratio: 4 / 3; } /* classic */
.profile-image { aspect-ratio: 1 / 1; } /* square */
.portrait-image { aspect-ratio: 2 / 3; } /* vertical */

/* Responsive images with srcset (all same ratio) */
<div class="image-container" style="aspect-ratio: 16 / 9;">
  <img
    src="image-800.jpg"
    srcset="image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w"
    sizes="(max-width: 600px) 100vw, 50vw"
    alt="Description"
    loading="lazy"
  />
</div>

/* Art direction: different ratios for different breakpoints */
<picture>
  <source media="(max-width: 600px)"
          srcset="portrait-1-1.jpg"
          style="aspect-ratio: 1 / 1;">
  <source media="(min-width: 601px)"
          srcset="landscape-16-9.jpg"
          style="aspect-ratio: 16 / 9;">
  <img src="landscape-16-9.jpg" alt="Description">
</picture>

/* React component with aspect ratio prop */
const AspectImage = ({ ratio = "16/9", src, alt }) => (
  <div style={{ aspectRatio: ratio, width: "100%" }}>
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

// Usage
<AspectImage ratio="4/3" src="photo.jpg" alt="Photo" />`
    },
    {
      title: "CSS Grid and Card Layouts",
      description: "Design consistent card grids where all items maintain the same aspect ratio regardless of content. Create masonry-style layouts or uniform grids for product catalogs, portfolios, and image galleries.",
      example: `/* Uniform aspect ratio card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.card {
  aspect-ratio: 4 / 3;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Portfolio grid with 1:1 square items */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.portfolio-item {
  aspect-ratio: 1 / 1;
  background-size: cover;
  background-position: center;
}

/* Responsive card with image and content */
.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.product-image-wrapper {
  aspect-ratio: 1 / 1; /* square for product photos */
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-content {
  padding: 16px;
  flex: 1;
}

/* Tailwind CSS card grid */
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <div key={product.id} class="bg-white rounded-lg overflow-hidden shadow-lg">
      <div class="aspect-square bg-gray-100">
        <img src={product.image} alt={product.name} class="w-full h-full object-cover" />
      </div>
      <div class="p-4">
        <h3 class="font-bold">{product.name}</h3>
        <p class="text-gray-600">{product.price}</p>
      </div>
    </div>
  ))}
</div>

/* CSS custom properties for dynamic ratios */
.dynamic-card {
  aspect-ratio: var(--card-ratio, 16 / 9);
}

/* Usage with inline style */
<div class="dynamic-card" style="--card-ratio: 4/3;">...</div>`
    },
    {
      title: "Social Media Content Planning",
      description: "Plan content dimensions for multiple social platforms by referencing optimal aspect ratios. Design templates that work across Instagram (1:1, 4:5), YouTube (16:9), and TikTok (9:16) to maximize reach and presentation quality.",
      example: `/* Multi-platform image template system */
const socialTemplates = {
  instagram: {
    square: { ratio: "1/1", dimensions: "1080x1080" },
    portrait: { ratio: "4/5", dimensions: "1080x1350" },
    landscape: { ratio: "16/9", dimensions: "1080x607" },
    story: { ratio: "9/16", dimensions: "1080x1920" }
  },
  youtube: {
    video: { ratio: "16/9", dimensions: "1920x1080" },
    thumbnail: { ratio: "16/9", dimensions: "1280x720" }
  },
  tiktok: {
    video: { ratio: "9/16", dimensions: "1080x1920" }
  },
  twitter: {
    post: { ratio: "16/9", dimensions: "1200x675" },
    header: { ratio: "3/1", dimensions: "1500x500" }
  },
  linkedin: {
    post: { ratio: "1.91/1", dimensions: "1200x627" },
    profile: { ratio: "1/1", dimensions: "400x400" }
  }
};

/* Responsive social media preview component */
const SocialPreview = ({ platform, variant, src }) => {
  const template = socialTemplates[platform][variant];

  return (
    <div
      className="social-preview"
      style={{ aspectRatio: template.ratio, maxWidth: "500px" }}
    >
      <img
        src={src}
        alt={platform + " " + variant}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div className="dimensions-label">
        {template.dimensions} ({template.ratio})
      </div>
    </div>
  );
};

/* Content creation checklist */
const aspectRatioChecklist = {
  video: {
    primary: "16:9 (YouTube, desktop)",
    vertical: "9:16 (TikTok, Reels, Stories)",
    square: "1:1 (Instagram feed fallback)"
  },
  static: {
    versatile: "1:1 or 4:5 (works on most platforms)",
    desktop: "16:9 (Twitter, Facebook links)",
    mobile: "4:5 or 9:16 (Instagram, mobile-first)"
  }
};

/* CSS for platform-specific image crops */
.instagram-square {
  aspect-ratio: 1 / 1;
  max-width: 1080px;
}

.instagram-portrait {
  aspect-ratio: 4 / 5;
  max-width: 1080px;
}

.youtube-thumbnail {
  aspect-ratio: 16 / 9;
  min-width: 1280px;
  min-height: 720px;
}

.tiktok-video {
  aspect-ratio: 9 / 16;
  max-width: 1080px;
}

/* React component for multi-platform export */
const MultiPlatformExporter = ({ image }) => (
  <div className="export-grid">
    <SocialPreview platform="instagram" variant="square" src={image} />
    <SocialPreview platform="instagram" variant="portrait" src={image} />
    <SocialPreview platform="youtube" variant="thumbnail" src={image} />
    <SocialPreview platform="tiktok" variant="video" src={image} />
  </div>
);`
    }
  ],

  howToUse: {
    title: "How to Use This Aspect Ratio Reference",
    content: `This aspect ratio reference provides quick lookup for common aspect ratios used across video, photography, web design, and social media. Browse ratios by platform or use case to find the correct dimensions for your project.

### Browsing Common Aspect Ratios

The reference lists popular aspect ratios with their decimal equivalents, common pixel dimensions, and use cases. Each ratio includes:
- Ratio notation (16:9, 4:3, etc.)
- Decimal equivalent (1.78, 1.33, etc.)
- Common pixel dimensions (1920x1080, 1280x720)
- Primary use cases (video, social media, photography)
- Platform compatibility notes

Browse by category: Video Production (16:9, 9:16, 21:9), Photography (3:2, 4:5, 2:3), Social Media (1:1, 4:5, 9:16), or Classic Formats (4:3, 3:2).

### Platform-Specific Requirements

Filter ratios by platform to see what each service requires or recommends:
- **YouTube:** 16:9 (1920x1080 preferred)
- **Instagram Feed:** 1:1, 4:5, or 16:9
- **Instagram Stories/Reels:** 9:16 (1080x1920)
- **TikTok:** 9:16 only
- **Twitter/X:** 16:9 or 1:1
- **LinkedIn:** 1.91:1 for links, 1:1 for profile

Use the platform filter to see only ratios relevant to your publishing target.

### Converting Ratios to Dimensions

Use the built-in calculator to convert aspect ratios to specific pixel dimensions:

1. Select an aspect ratio from the reference (e.g., 16:9)
2. Enter desired width OR height
3. Calculator automatically computes the other dimension
4. Result maintains perfect aspect ratio proportions

Example: 16:9 ratio at 1920px width = 1080px height. At 3840px width = 2160px height (4K).

### Understanding Ratio Notation

**Ratio Notation (16:9):** Width-to-height relationship. 16 units wide for every 9 units tall. Doesn't specify exact size, only proportions.

**Decimal Equivalent (1.78):** Width divided by height. 16/9 = 1.778. Useful for calculations and CSS aspect-ratio values.

**Dimensions (1920x1080):** Specific pixel measurements. Multiple dimension sets can share the same ratio (1920x1080 and 3840x2160 are both 16:9).

### Applying Aspect Ratios in CSS

**Modern CSS (aspect-ratio property):**
- Syntax: aspect-ratio: 16 / 9;
- Supported in Chrome 88+, Firefox 89+, Safari 15+
- Works with width or height specified, calculates the other
- Cleaner than padding-bottom hack

**Legacy CSS (padding-bottom hack):**
- For older browser support
- Uses percentage padding based on ratio decimal
- 16:9 = 56.25% (9/16 = 0.5625)
- 4:3 = 75% (3/4 = 0.75)
- Requires wrapper with padding-bottom and absolutely positioned content

**Tailwind CSS utilities:**
- aspect-video (16/9)
- aspect-square (1/1)
- aspect-auto (remove ratio)
- Custom: aspect-[4/3] for arbitrary ratios

### Choosing Ratios for Responsive Design

**Desktop-first:** Use horizontal ratios (16:9, 21:9) for wide screens. Provide vertical alternatives for mobile.

**Mobile-first:** Use vertical (9:16) or square (1:1) ratios. Scale horizontally for desktop if needed.

**Multi-platform:** 1:1 and 4:5 work on most social platforms. 16:9 universal for video. Create multiple crops for optimal presentation on each platform.

### Responsive Images with srcset

When using srcset, all image variants MUST have the same aspect ratio. Different sizes (400w, 800w, 1200w) but identical proportions prevent layout shift.

For different aspect ratios at different breakpoints, use the picture element with media queries and separate source elements.

### Testing Aspect Ratios

Preview your content in different aspect ratios before publishing:
- Use browser DevTools to resize viewport and test responsive behavior
- Check layout shift during image loading (Core Web Vitals - CLS)
- Verify no distortion or unwanted cropping occurs
- Test on actual target platforms when possible

### Performance Considerations

Aspect ratio containers prevent Cumulative Layout Shift (CLS) by reserving space before images load. This improves Core Web Vitals scores and user experience.

Modern aspect-ratio property is more performant than padding-bottom hack. Less CSS, fewer DOM manipulations, better browser optimization.

For image-heavy pages, use lazy loading (loading="lazy") combined with aspect ratio containers for optimal performance.`,
    steps: [
      {
        name: "Browse Ratios",
        text: "View common aspect ratios (16:9, 4:3, 1:1, 9:16) with descriptions and use cases. Filter by platform (YouTube, Instagram, TikTok) or content type (video, photo, web).",
      },
      {
        name: "Select Target Ratio",
        text: "Choose the aspect ratio that matches your platform requirements or creative intent. Check compatibility notes for each ratio.",
      },
      {
        name: "Convert to Dimensions",
        text: "Use the calculator to convert ratio to specific pixel dimensions. Enter width or height, calculator computes the other value automatically.",
      },
      {
        name: "Apply in Code",
        text: "Use the ratio in CSS (aspect-ratio: 16/9), HTML containers, or video export settings. Copy provided code examples for immediate use.",
      }
    ]
  },

  faqs: [
    {
      question: "What aspect ratio should I use for YouTube videos?",
      answer: "YouTube recommends 16:9 aspect ratio (1920x1080 for HD, 3840x2160 for 4K). This is the standard widescreen format that fills desktop and TV screens without black bars. Vertical 9:16 videos are accepted but display with black bars on desktop. For YouTube Shorts, use 9:16 vertical format (1080x1920) to maximize mobile visibility and match TikTok/Reels format."
    },
    {
      question: "What's the difference between 16:9 and 4:3 aspect ratios?",
      answer: "16:9 is widescreen (1.78:1), standard for modern HD content, TVs, and monitors. More horizontal space, cinematic feel. 4:3 is classic TV ratio (1.33:1), more square, provides more vertical content area. 16:9 replaced 4:3 as the standard in early 2000s. Use 16:9 for modern content, 4:3 for legacy compatibility or artistic choice emphasizing vertical composition."
    },
    {
      question: "Which aspect ratio is best for Instagram?",
      answer: "Instagram supports multiple ratios: 1:1 (square, 1080x1080) is classic and safe for all placements. 4:5 (portrait, 1080x1350) maximizes vertical screen space on mobile feeds. 16:9 (landscape, 1080x607) works but shows smaller in feeds. For Stories and Reels, use 9:16 (vertical, 1080x1920) exclusively. 4:5 and 1:1 are most versatile for feed posts, 9:16 required for full-screen Stories/Reels."
    },
    {
      question: "How do I maintain aspect ratio in CSS for responsive images?",
      answer: "Use the CSS aspect-ratio property: aspect-ratio: 16 / 9; on the container. Set width: 100% and the height will calculate automatically. For older browsers, use padding-bottom hack: padding-bottom: 56.25% (for 16:9) on a wrapper, then position content absolutely. Tailwind provides utilities: aspect-video (16:9), aspect-square (1:1). This prevents layout shift during image loading, improving Core Web Vitals."
    },
    {
      question: "What is the aspect ratio for vertical TikTok videos?",
      answer: "TikTok requires 9:16 aspect ratio (vertical portrait) with recommended dimensions 1080x1920 pixels. This is the same as Instagram Stories/Reels and YouTube Shorts. Horizontal videos are technically supported but display with large black bars and poor user experience. For TikTok content, always shoot and export in 9:16 vertical format to maximize screen usage on mobile devices."
    },
    {
      question: "How do I calculate aspect ratio from dimensions?",
      answer: "Divide width by height, then simplify. Example: 1920x1080 → 1920/1080 = 1.78 (decimal). To simplify to ratio notation, find the greatest common divisor (GCD) of both numbers. For 1920x1080, GCD is 120, so 1920/120 : 1080/120 = 16:9. Or use this tool's calculator: input dimensions and it displays simplified ratio automatically."
    },
    {
      question: "Can I change aspect ratio without distortion?",
      answer: "No - changing aspect ratio requires either cropping (losing parts of the image) or letterboxing (adding black bars). Stretching to fit causes distortion. To crop, use object-fit: cover in CSS. To letterbox, use object-fit: contain. To avoid issues, create content in the target aspect ratio from the start, or create multiple versions cropped specifically for each platform (1:1 for Instagram, 16:9 for YouTube, 9:16 for TikTok)."
    },
    {
      question: "What aspect ratio should I use for desktop web design?",
      answer: "Web design doesn't have a fixed aspect ratio since screens vary widely. However, hero images and videos commonly use 16:9 (standard monitor ratio) or 21:9 (ultrawide). For card images, 4:3 or 1:1 work well. Use CSS aspect-ratio property to maintain proportions as containers resize responsively. Focus on responsive scaling rather than fixed ratios, or provide multiple crops via picture element for different breakpoints."
    },
    {
      question: "What is the ultrawide 21:9 aspect ratio used for?",
      answer: "21:9 (2.33:1) is ultrawide cinematic ratio used for movies, gaming, and ultrawide monitors (3440x1440, 5120x2160). Creates dramatic horizontal framing and immersive viewing experiences. Common in film production (DCI 2.39:1 is similar), high-end displays, and gaming setups. Provides more peripheral vision than 16:9. Less common for web content due to limited device support, but effective for hero sections and cinematic presentations."
    },
    {
      question: "Is my aspect ratio data private when using this tool?",
      answer: "Yes. This reference tool is entirely client-side - no calculations or data are sent to servers. All ratio math and dimension calculations happen in your browser using JavaScript. Safe for proprietary projects or client work. No tracking, no data storage. The tool works offline after initial load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This aspect ratio reference operates entirely client-side in your browser. There are no calculations sent to servers, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All ratio calculations and dimension conversions happen in your browser's JavaScript engine.
- **No Server Communication:** No aspect ratio data, dimensions, or calculations are sent to any servers.
- **No Data Storage:** Your calculations and preferences are not stored on our servers.
- **No Analytics Tracking:** We don't track which ratios you reference or how often you use the tool.
- **Works Offline:** After initial page load, the reference works completely offline with no network requests.

This makes the tool safe for referencing aspect ratios for proprietary projects, client work, or confidential designs. Use with confidence for commercial and personal projects.`
  },

  stats: {
    "Common Ratios": "20+",
    "Platforms Covered": "10+",
    "Calculator Precision": "100%",
    "Client-Side": "100%",
    "Server Uploads": "0"
  }
};
