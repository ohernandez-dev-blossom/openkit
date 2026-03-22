/**
 * OG Image Generator Tool Guide Content
 * Comprehensive developer guide for Open Graph image creation
 */

import type { ToolGuideContent } from "./types";

export const ogGenGuideContent: ToolGuideContent = {
  toolName: "OG Image Generator",
  toolPath: "/og-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Template",
      description: "Choose from pre-designed templates: Blog Post (title + author + date), Product (title + price + image), Social Card (title + description + logo), or Announcement (big title + subtitle). Each template optimizes for specific content types."
    },
    {
      title: "Customize Content and Design",
      description: "Fill in template fields (title, subtitle, author, price, etc.), upload logo or product images, adjust background colors and gradients, change text colors, and select Google Fonts. All changes reflect in real-time preview."
    },
    {
      title: "Preview in Real-Time",
      description: "View live 1200x630px preview showing exactly how your Open Graph image appears when shared on Facebook, LinkedIn, Twitter, and Slack. Adjust design until preview looks perfect."
    },
    {
      title: "Download and Deploy",
      description: "Click Download to save the generated PNG image at 1200x630px resolution. Upload to your CDN or website, then reference in <meta property='og:image'> tags. Test with Facebook Sharing Debugger."
    }
  ],

  introduction: {
    title: "What are Open Graph Images?",
    content: `Open Graph images (og:image) are preview images displayed when URLs are shared on social media platforms including Facebook, LinkedIn, Twitter, Slack, Discord, and messaging apps. Specified via meta tags, these images serve as visual anchors that dramatically increase engagement rates compared to plain text links. For developers building content platforms, e-commerce sites, or marketing websites, custom Open Graph image generation is essential for maximizing social media reach and click-through rates.

The Open Graph protocol was developed by Facebook in 2010 to standardize how web pages are represented when shared on social platforms. While originally Facebook-specific, the protocol became the de facto standard adopted by LinkedIn, Pinterest, Slack, Discord, iMessage, WhatsApp, and dozens of other platforms. Today, Open Graph meta tags are as critical for social engagement as title tags are for SEO.

### Why Custom OG Images Matter

**Engagement Rates:** Links with custom Open Graph images receive 2-3x more clicks and engagement than plain URL shares. Human brains process images 60,000 times faster than text - a well-designed OG image captures attention in crowded social feeds where users scroll past dozens of posts per minute.

**Brand Consistency:** Custom OG images maintain brand visual identity across social shares. Without custom images, platforms show generic website screenshots, random page images, or no image at all. Professional brands create templated OG images with consistent colors, fonts, and logos that reinforce brand recognition.

**Content Context:** OG images provide instant content context before users click. A blog post OG image showing "10 Tips for React Performance" immediately communicates topic and value. E-commerce product images show what users get before visiting. Tutorial OG images can include code snippets or diagrams.

**Conversion Optimization:** Better engagement from OG images translates to more website traffic and conversions. Marketing teams A/B test OG images the same way they test ad creatives - finding which visuals drive the most clicks and purchases. High-performing OG images can increase traffic by 40-50% from social channels.

### OG Image Technical Requirements

**Dimensions:** The universally compatible size is 1200x630px (aspect ratio 1.91:1). Facebook shows this size optimally. LinkedIn, Twitter, and Slack all support it. Minimum is 600x315px but larger sizes look better on high-DPI displays. Images are automatically downscaled on mobile devices.

**File Size:** Keep under 8MB (Facebook's limit) but optimize for under 500KB for fast loading. Use PNG for images with text overlays (lossless compression). Use JPG for photographic backgrounds (lossy but smaller). Avoid GIFs (static image only, animation doesn't work in og:image).

**Accessibility:** Images must be publicly accessible via HTTPS. URLs behind authentication, localhost addresses, or intranet servers won't work - social platforms cannot scrape them. Use CDN URLs for best performance and reliability.

**Format:** PNG and JPG are universally supported. WebP is supported by some platforms but PNG is safer for compatibility. Always provide alt text in your Open Graph tags for accessibility and SEO context.

### Template Design Best Practices

**Text Readability:** Use large, bold fonts (minimum 48px for body text, 72px+ for headlines). Test readability at thumbnail size - what looks good full-size may be illegible when shrunk to 300px width. High contrast between text and background is essential (white text on dark background or vice versa).

**Consistent Branding:** Include your logo in the same position across all OG images for brand recognition. Use brand colors consistently. Maintain the same font family across templates. Users should instantly recognize your content before reading any text.

**Mobile Preview Consideration:** Social platforms show smaller previews on mobile devices. Keep critical text and visuals in the center 80% of the canvas - edges may be cropped on some platforms. Test previews on mobile Facebook and Twitter apps, not just desktop.

**Text Overlay Backgrounds:** If using photographic backgrounds, add semi-transparent overlays (dark scrim) to ensure text remains readable. Pure white text on busy photos often becomes illegible. Use 50-70% opacity black overlays behind text for guaranteed readability.

### Dynamic OG Image Generation

**Automated Generation:** For content-heavy sites (blogs, e-commerce, news), manually creating OG images for every page is impractical. Implement dynamic generation using Node.js canvas libraries (node-canvas, sharp), serverless functions (Vercel OG, Cloudinary), or browser automation (Puppeteer). Generate images at build time or on-demand with caching.

**Template Systems:** Create base templates in design tools (Figma, Sketch) then export as programmatic templates. Text positioning, font sizes, and color schemes become variables. Pass content (blog title, product name, price) into template engine to generate unique images programmatically.

**Performance Optimization:** Generated images should be cached aggressively. Generate once, cache to CDN, serve to thousands of shares. Use edge caching (Cloudflare, Fastly) for sub-100ms response times. Lazy generation on first request, then cache, balances compute costs with performance.

**A/B Testing:** Test different OG image designs to find what drives engagement. Try different background colors, font sizes, logo placements, or text styles. Track click-through rates from social shares by image variant. Deploy winning designs site-wide for maximum impact.

### Platform-Specific Considerations

**Facebook:** Shows 1.91:1 aspect ratio in news feed. Displays logo, title, and description below image. Cached aggressively - use Facebook Sharing Debugger to clear cache after changes. Image must be accessible by Facebook's scraper (not blocked by robots.txt).

**Twitter:** Supports twitter:card types. summary_large_image shows full-width horizontal image (preferred). summary shows small square thumbnail. Twitter falls back to Open Graph if Twitter Card tags are missing. Less aggressive caching than Facebook.

**LinkedIn:** Similar to Facebook feed display. Professional audiences respond well to data visualizations, charts, and professional photography. Avoid overly casual or meme-style OG images on LinkedIn - professional tone performs better.

**Slack/Discord:** Shows large preview in chat messages. Image appears inline with link preview. These platforms drive high click-through rates - users trust content shared by colleagues/friends more than social media posts.

### Common OG Image Mistakes

**Text Too Small:** Tiny text that looks fine on 1200px preview is illegible at 300px thumbnail size. Always test at small sizes. Use 72px+ for headlines, 48px+ for body text. Bold weights for readability.

**Wrong Aspect Ratio:** Square images (1:1) get awkwardly cropped. Tall images (portrait) get severely cropped. Always use 1.91:1 (1200x630px) for universal compatibility.

**Forgetting Mobile:** Designs that look great on desktop may have critical elements cropped on mobile. Keep important content in center, avoid edge-to-edge text.

**Generic Images:** Using the same OG image site-wide wastes engagement opportunities. Each page should have unique, relevant OG image matching content. Blog posts need custom images with article titles.

**Slow Loading Images:** Multi-megabyte PNGs cause slow social platform scraping and poor user experience. Optimize to under 500KB without visible quality loss.

This OG image generator creates professional Open Graph images using browser canvas API. All image generation happens client-side with no server uploads. Download generated images and host on your infrastructure for use in meta tags.`
  },

  useCases: [
    {
      title: "Generate Blog Post OG Images at Scale",
      description: "Create unique Open Graph images for every blog article automatically using post title, author, and publish date. Maintain consistent brand design while customizing each image with article-specific content.",
      example: `// Automated blog post OG image generation
import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs/promises';

interface BlogPost {
  title: string;
  author: string;
  date: Date;
  category: string;
}

registerFont('./fonts/Inter-Bold.ttf', { family: 'Inter', weight: 'bold' });
registerFont('./fonts/Inter-Regular.ttf', { family: 'Inter' });

async function generateBlogOGImage(post: BlogPost): Promise<Buffer> {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#6366F1'); // Indigo
  gradient.addColorStop(1, '#8B5CF6'); // Purple
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  // Logo in top-left
  const logo = await loadImage('./assets/logo-white.png');
  ctx.drawImage(logo, 60, 50, 150, 40);

  // Category badge
  ctx.fillStyle = '#10B981'; // Green
  roundRect(ctx, 60, 120, 180, 50, 8);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 28px Inter';
  ctx.fillText(post.category.toUpperCase(), 80, 152);

  // Post title with word wrap
  ctx.fillStyle = 'white';
  ctx.font = 'bold 72px Inter';
  const titleLines = wrapText(ctx, post.title, 1080);
  let y = 250;
  for (const line of titleLines.slice(0, 3)) { // Max 3 lines
    ctx.fillText(line, 60, y);
    y += 85;
  },

  // Author and date at bottom
  ctx.font = '36px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText(\`By \${post.author}\`, 60, 520);
  ctx.fillText(post.date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }), 60, 570);

  return canvas.toBuffer('image/png');
}

// Helper function for word wrapping
function wrapText(ctx: any, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
},

// Helper for rounded rectangles
function roundRect(ctx: any, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

// Generate for all blog posts
async function generateAllBlogImages() {
  const posts = await db.posts.findAll();

  for (const post of posts) {
    const buffer = await generateBlogOGImage(post);
    const filename = \`og-\${post.slug}.png\`;

    // Save locally
    await fs.writeFile(\`./public/og-images/\${filename}\`, buffer);

    // Upload to CDN
    const cdnUrl = await uploadToCloudflare(buffer, filename);

    // Update post with OG image URL
    await db.posts.update(post.id, { ogImage: cdnUrl });
  }

  console.log(\`Generated \${posts.length} OG images\`);
}`
    },
    {
      title: "Create Product OG Images for E-commerce",
      description: "Generate product-specific Open Graph images displaying product photo, name, price, and availability. Optimize for social sharing to drive traffic from Facebook and Pinterest product pins.",
      example: `// E-commerce product OG images
interface Product {
  name: string;
  price: number;
  currency: string;
  image: string;
  inStock: boolean;
  rating: number;
}

async function generateProductOGImage(product: Product): Promise<Buffer> {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 1200, 630);

  // Product image on left side
  const productImg = await loadImage(product.image);
  const imgSize = 500;
  const imgX = 70;
  const imgY = (630 - imgSize) / 2;

  // Draw image with rounded corners
  ctx.save();
  roundRectPath(ctx, imgX, imgY, imgSize, imgSize, 20);
  ctx.clip();
  ctx.drawImage(productImg, imgX, imgY, imgSize, imgSize);
  ctx.restore();

  // Right side content
  const contentX = imgX + imgSize + 60;

  // Product name
  ctx.fillStyle = '#1F2937'; // Dark gray
  ctx.font = 'bold 56px Inter';
  const nameLines = wrapText(ctx, product.name, 480);
  let y = 150;
  for (const line of nameLines.slice(0, 3)) {
    ctx.fillText(line, contentX, y);
    y += 70;
  },

  // Price
  ctx.font = 'bold 72px Inter';
  ctx.fillStyle = '#DC2626'; // Red
  const priceText = \`\${product.currency}\${product.price}\`;
  ctx.fillText(priceText, contentX, y + 40);

  // Stock status
  y += 120;
  ctx.font = 'bold 32px Inter';
  if (product.inStock) {
    ctx.fillStyle = '#10B981'; // Green
    ctx.fillText('✓ In Stock', contentX, y);
  } else {
    ctx.fillStyle = '#EF4444'; // Red
    ctx.fillText('✗ Out of Stock', contentX, y);
  },

  // Rating stars
  y += 60;
  ctx.font = '36px Arial';
  ctx.fillStyle = '#FBBF24'; // Yellow
  const stars = '★'.repeat(Math.floor(product.rating)) +
                '☆'.repeat(5 - Math.floor(product.rating));
  ctx.fillText(stars + \` \${product.rating}/5\`, contentX, y);

  // Brand logo in top-right
  const logo = await loadImage('./assets/shop-logo.png');
  ctx.drawImage(logo, 1050, 30, 120, 40);

  return canvas.toBuffer('image/png');
}

// Serverless function for on-demand generation
export async function generateProductImage(req: Request): Promise<Response> {
  const { productId } = await req.json();
  const product = await db.products.findById(productId);

  // Check cache first
  const cacheKey = \`og:product:\${productId}\`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return new Response(Buffer.from(cached, 'base64'), {
      headers: { 'Content-Type': 'image/png' }
    });
  },

  // Generate image
  const buffer = await generateProductOGImage(product);

  // Cache for 24 hours
  await redis.setex(cacheKey, 86400, buffer.toString('base64'));

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}`
    },
    {
      title: "Dynamic Social Card Generation for Marketing",
      description: "Create custom Open Graph images for marketing campaigns, announcements, and social media posts. Include compelling headlines, call-to-actions, and branded visuals that drive engagement.",
      example: `// Marketing campaign OG image generator
interface Campaign {
  headline: string;
  subheadline: string;
  cta: string;
  theme: 'launch' | 'discount' | 'announcement' | 'feature';
}

const themeColors = {
  launch: { gradient: ['#FF6B6B', '#FF8E53'], accent: '#FFD93D' },
  discount: { gradient: ['#6A11CB', '#2575FC'], accent: '#FFE600' },
  announcement: { gradient: ['#0F2027', '#203A43'], accent: '#2C5364' },
  feature: { gradient: ['#43E97B', '#38F9D7'], accent: '#667EEA' }
};

async function generateCampaignOGImage(campaign: Campaign): Promise<Buffer> {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  const colors = themeColors[campaign.theme];

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, colors.gradient[0]);
  gradient.addColorStop(1, colors.gradient[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  // Geometric shapes for visual interest
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(1000, 100, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(200, 500, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Main headline
  ctx.fillStyle = 'white';
  ctx.font = 'bold 96px Inter';
  ctx.textAlign = 'center';
  const headlineLines = wrapText(ctx, campaign.headline, 1000);
  let y = 200;
  for (const line of headlineLines) {
    ctx.fillText(line, 600, y);
    y += 110;
  },

  // Subheadline
  ctx.font = '48px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  const subLines = wrapText(ctx, campaign.subheadline, 900);
  y += 20;
  for (const line of subLines) {
    ctx.fillText(line, 600, y);
    y += 60;
  },

  // CTA button
  const ctaWidth = 400;
  const ctaHeight = 80;
  const ctaX = (1200 - ctaWidth) / 2;
  const ctaY = 500;

  ctx.fillStyle = colors.accent;
  roundRect(ctx, ctaX, ctaY, ctaWidth, ctaHeight, 40);

  ctx.fillStyle = campaign.theme === 'discount' ? 'black' : 'white';
  ctx.font = 'bold 40px Inter';
  ctx.fillText(campaign.cta, 600, ctaY + 52);

  return canvas.toBuffer('image/png');
}

// API endpoint
app.post('/api/og/campaign', async (req, res) => {
  const campaign: Campaign = req.body;

  const buffer = await generateCampaignOGImage(campaign);

  // Upload to S3
  const key = \`campaigns/og-\${Date.now()}.png\`;
  await s3.putObject({
    Bucket: 'marketing-assets',
    Key: key,
    Body: buffer,
    ContentType: 'image/png',
    CacheControl: 'max-age=31536000'
  });

  const url = \`https://cdn.example.com/\${key}\`;

  res.json({ url });
});`
    },
    {
      title: "A/B Test OG Images for Higher CTR",
      description: "Create multiple Open Graph image variants and A/B test to determine which designs drive the highest click-through rates from social shares. Track performance and deploy winning designs.",
      example: `// OG image A/B testing
interface OGVariant {
  id: string;
  design: 'minimal' | 'bold' | 'photo' | 'illustrated';
  backgroundColor: string;
  textStyle: 'serif' | 'sans-serif';
}

const variants: OGVariant[] = [
  { id: 'v1', design: 'minimal', backgroundColor: '#FFFFFF', textStyle: 'sans-serif' },
  { id: 'v2', design: 'bold', backgroundColor: '#FF6B6B', textStyle: 'sans-serif' },
  { id: 'v3', design: 'photo', backgroundColor: '#1F2937', textStyle: 'serif' },
  { id: 'v4', design: 'illustrated', backgroundColor: '#6366F1', textStyle: 'sans-serif' }
];

// Generate variants for each blog post
async function generateVariants(post: BlogPost) {
  const images: Record<string, string> = {};

  for (const variant of variants) {
    const buffer = await generateOGImageWithStyle(post, variant);
    const filename = \`og-\${post.slug}-\${variant.id}.png\`;

    await uploadToCDN(buffer, filename);
    images[variant.id] = \`https://cdn.example.com/\${filename}\`;
  }

  return images;
},

// Assign variant to user
function getOGVariant(postId: string, userId: string): string {
  const hash = simpleHash(postId + userId);
  const variant = variants[hash % variants.length];
  return variant.id;
}

// Meta tag with variant
export function generateMetadata({ post, userId }: any): Metadata {
  const variantId = getOGVariant(post.id, userId);
  const ogImageUrl = post.ogImages[variantId];

  // Track impression
  analytics.track('og_variant_shown', {
    postId: post.id,
    userId,
    variant: variantId
  });

  return {
    openGraph: {
      images: [{ url: ogImageUrl }]
    }
  };
},

// Track clicks from social
app.get('/from-social', (req, res) => {
  const { postId, variant, source } = req.query;

  analytics.track('social_click', {
    postId,
    variant,
    source // facebook, twitter, linkedin
  });

  res.redirect(\`/blog/\${postId}\`);
});

// Analyze results
SELECT
  variant_id,
  COUNT(*) as impressions,
  SUM(CASE WHEN clicked THEN 1 ELSE 0 END) as clicks,
  (clicks * 100.0 / impressions) as ctr
FROM og_experiments
WHERE post_id = '123'
GROUP BY variant_id
ORDER BY ctr DESC;

// Results: variant v2 (bold design) increased CTR by 67%`
    }
  ],

  howToUse: {
    title: "How to Use This OG Image Generator",
    content: `This Open Graph image generator creates professional social sharing images using pre-designed templates and browser canvas rendering. All image generation happens client-side with no server uploads - download generated images and host on your own infrastructure.

### Selecting Templates

Click one of four template types at the top: Blog Post (title + author + date), Product (title + price + image), Social Card (title + description + logo), or Announcement (big title + subtitle). Each template is optimized for specific content types and social platforms.

Blog Post template works well for articles, tutorials, and news posts. Product template highlights e-commerce items with pricing. Social Card template is versatile for general content sharing. Announcement template creates impact for launches and major updates.

### Customizing Content

Fill in template-specific fields on the left side. All templates require Title. Optional fields vary by template: Blog Post adds Author and Date, Product adds Price and product image upload, Social Card adds Subtitle and logo upload, Announcement focuses on title and subtitle only.

Text inputs show character suggestions but don't enforce hard limits. Longer titles wrap to multiple lines automatically. Test at different lengths to find what looks best in the preview.

### Design Customization

Adjust visual design using color pickers and font selectors. Background Color sets the base color. Background Color 2 creates gradients when Gradient Type is set to Linear or Radial. Text Color and Subtitle Color control typography colors.

Selected Font applies to all text in the image. Fonts are loaded from Google Fonts for consistent rendering. Choose between Inter (modern sans-serif), Poppins (friendly sans-serif), and Roboto (neutral sans-serif).

### Image Uploads

For Product and Social Card templates, click the image upload area to select logo or product photos. Uploaded images are processed entirely in your browser - never uploaded to servers. Images are resized and positioned automatically within the template.

Use high-quality source images (at least 500x500px) for best results. Transparent PNGs work well for logos. JPGs work for product photos. Uploaded images persist only for the current session - refresh clears everything.

### Real-Time Preview

The right side shows exact 1200x630px preview of your generated image. This is pixel-perfect representation of what users see when your link is shared on Facebook, LinkedIn, Twitter, and Slack.

All changes update the preview instantly. Adjust content and design while watching the preview until you achieve the desired look. The preview uses the same canvas rendering that generates the final downloadable image.

### Downloading Images

Click Download button to save the generated image as PNG file at 1200x630px resolution. The downloaded file is ready to upload to your website or CDN without further processing.

Name the downloaded file descriptively (og-blog-post-title.png) for easy organization. After uploading to your server, reference the URL in your <meta property="og:image" content="https://yoursite.com/og-blog-post-title.png"> tag.

### Testing Generated Images

After uploading your generated OG image, test it with Facebook Sharing Debugger (developers.facebook.com/tools/debug) and Twitter Card Validator. Paste your URL and verify the image displays correctly with proper dimensions and no cropping issues.

Clear Facebook's cache using the Sharing Debugger's "Scrape Again" button. Test sharing your URL on various platforms to ensure the image appears as expected across Facebook, LinkedIn, Twitter, and Slack.`,
    steps: [
      {
        name: "Select Template and Enter Content",
        text: "Choose template type (Blog Post, Product, Social Card, or Announcement). Fill in template fields like title, subtitle, author, date, or price. Upload logo or product images if applicable."
      },
      {
        name: "Customize Colors and Fonts",
        text: "Adjust background colors and select gradient type (none, linear, or radial). Choose text and subtitle colors for readability. Select font from Google Fonts dropdown (Inter, Poppins, or Roboto)."
      },
      {
        name: "Review Real-Time Preview",
        text: "Check the 1200x630px preview showing exactly how your image appears on social platforms. Adjust content and design until preview looks perfect. Test readability at thumbnail size."
      },
      {
        name: "Download and Deploy",
        text: "Click Download to save PNG file. Upload to your CDN or website. Reference in <meta property='og:image'> tags. Test with Facebook Sharing Debugger before launch."
      }
    ]
  },

  faqs: [
    {
      question: "What size should my Open Graph images be?",
      answer: "1200x630px (aspect ratio 1.91:1) is the recommended size for maximum compatibility across Facebook, LinkedIn, Twitter, and Slack. Minimum is 600x315px but larger sizes look better on high-resolution displays. This generator outputs 1200x630px PNG files optimized for all platforms."
    },
    {
      question: "Can I use these images commercially?",
      answer: "Yes. All images generated by this tool are yours to use commercially without restrictions. You retain full rights to generated images. However, ensure any uploaded logos or photos you use are licensed for your commercial use - the generator doesn't validate licensing of uploaded content."
    },
    {
      question: "Why doesn't my generated image show on Facebook?",
      answer: "Common causes: (1) Image URL not publicly accessible (check HTTPS). (2) Facebook cache showing old image - use Facebook Sharing Debugger to clear cache. (3) Wrong meta tag format - verify <meta property='og:image' content='URL'> syntax. (4) Image too large (over 8MB) - optimize file size. (5) Robots.txt blocking Facebook's scraper."
    },
    {
      question: "How do I add these images to my website?",
      answer: "After downloading: (1) Upload PNG to your website or CDN. (2) Add meta tag in <head>: <meta property='og:image' content='https://yoursite.com/og-image.png'>. (3) Test with Facebook Sharing Debugger. (4) Clear Facebook cache using 'Scrape Again'. (5) Share URL on social platforms to verify image appears."
    },
    {
      question: "Can I automate OG image generation for hundreds of pages?",
      answer: "Yes, but not with this browser tool - use server-side generation. Implement with Node.js (node-canvas, sharp libraries), serverless functions (Vercel OG, Cloudflare Workers), or headless browser automation (Puppeteer). Pass page data into templates, generate images programmatically, cache aggressively. This tool is for manual creation of 1-50 images."
    },
    {
      question: "What fonts can I use?",
      answer: "This tool includes three Google Fonts: Inter (modern, clean), Poppins (friendly, rounded), and Roboto (neutral, versatile). For custom fonts, download generated image and edit in design tools. For programmatic generation with custom fonts, use node-canvas with registerFont() to load any TrueType or OpenType font."
    },
    {
      question: "Do uploaded images get stored on servers?",
      answer: "No. All image uploads and processing happen entirely in your browser using JavaScript and Canvas API. Uploaded logos and product photos never leave your device. Generated images are created locally and downloaded directly to your computer. Nothing is transmitted to servers or stored remotely."
    },
    {
      question: "Why is text too small when shared on Twitter?",
      answer: "Twitter's mobile app shows smaller previews than desktop. Use 72px+ font sizes for headlines, 48px+ for body text. Test at thumbnail size (300px width) - if text is illegible at that size, increase font size or simplify text. Bold font weights improve readability at small sizes."
    },
    {
      question: "Can I use animated GIFs as OG images?",
      answer: "No. Open Graph protocol only supports static images (PNG, JPG). Animated GIFs in og:image tags show first frame only - animation doesn't play in social previews. Video content requires different meta tags (og:video) which have limited platform support. Stick to static PNG/JPG for maximum compatibility."
    },
    {
      question: "How do I A/B test different OG image designs?",
      answer: "Generate multiple variants with this tool. Implement variant assignment server-side: hash user ID to select variant, serve corresponding og:image URL, track impressions and clicks by variant. Analyze click-through rates after 1,000+ impressions per variant. Deploy winning design. Test background colors, text styles, layouts, and imagery."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This Open Graph image generator operates entirely client-side in your browser using the HTML5 Canvas API. All form inputs, uploaded images, and generated images are processed locally using JavaScript. No content is uploaded to servers or stored remotely.

### Privacy Guarantees

- **100% Client-Side Processing:** All image generation uses browser Canvas API to render pixels locally. Canvas rendering, text positioning, and image composition happen on your device.
- **No Image Uploads:** Logos and product photos you upload are processed entirely in browser memory. Images never leave your device or get transmitted to servers.
- **No Data Storage:** Your content, design settings, and generated images are not saved, logged, or stored anywhere. Refresh the page and everything clears from memory.
- **No Analytics on Content:** We don't track what content you enter, what images you upload, or what designs you create. Standard analytics track page views only.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during usage - zero network requests occur with your content or images.

Safe for creating OG images for confidential products, unreleased campaigns, client projects under NDA, or any content requiring privacy. Use with confidence for enterprise marketing, pre-launch products, or competitive content where designs must remain confidential until public release.`
  },

  stats: {
    "Output Size": "1200x630px",
    "Templates": "4",
    "Font Options": "3",
    "File Format": "PNG"
  }
};
