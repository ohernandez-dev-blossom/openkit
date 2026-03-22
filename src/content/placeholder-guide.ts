/**
 * Placeholder Image Generator Tool Guide Content
 * Comprehensive developer guide for placeholder image creation
 */

import type { ToolGuideContent } from "./types";

export const placeholderGuideContent: ToolGuideContent = {
  toolName: "Placeholder Image Generator",
  toolPath: "/placeholder",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Set Dimensions",
      description: "Enter custom width and height in pixels, or select from presets including Instagram Post (1080x1080), Facebook Post (1200x630), YouTube Thumbnail (1280x720), and common ad sizes. Dimensions update preview in real-time."
    },
    {
      title: "Customize Appearance",
      description: "Choose background color using color picker, set text color for contrast, add custom text (or use default dimensions text), and adjust font size (auto-calculated or manual). Preview updates instantly with all changes."
    },
    {
      title: "Generate and Download",
      description: "Click Download Image to save PNG file at specified dimensions. The generated image is ready to use in mockups, wireframes, prototypes, or as temporary content during development."
    },
    {
      title: "Copy Data URL or Service URL",
      description: "Click Copy Data URL to get base64-encoded image for inline HTML/CSS embedding. Or click Copy Placeholder URL to get link to placeholder.com service for CDN-hosted placeholders without local file storage."
    }
  ],

  introduction: {
    title: "What are Placeholder Images?",
    content: `Placeholder images are temporary visual content used during design, development, and prototyping phases to represent where final images will appear. These simple colored rectangles with dimension text serve as visual markers that help developers and designers lay out interfaces, test responsive behavior, and demonstrate content flow without requiring final production assets. For web developers, placeholder images are essential tools for rapid prototyping, mockup creation, and maintaining development momentum while waiting for real images.

Placeholder images originated in print design where "FPO" (For Position Only) marked temporary content. In web development, placeholder images exploded in popularity with the rise of responsive design and rapid prototyping workflows. Services like placeholder.com and placehold.it became standard tools, generating millions of placeholder images daily for developers worldwide.

### Why Placeholder Images Matter

**Rapid Prototyping:** Start building interfaces immediately without waiting for production images. Placeholder images let you create functional prototypes that demonstrate layout, spacing, and interaction patterns while content creation happens in parallel. This parallelization speeds up development cycles by weeks.

**Design Layout Testing:** Test responsive layouts across breakpoints using placeholders at specific dimensions. Verify image containers resize correctly, maintain aspect ratios, and handle different sizes gracefully. Catch layout bugs early before adding real content.

**Client Demonstrations:** Show clients functional prototypes with placeholder images to get feedback on structure and flow before investing in final content. Clients understand layouts better with visual placeholders than empty boxes or lorem ipsum text.

**Performance Testing:** Simulate real-world image loading by using placeholders of equivalent file sizes. Test lazy loading implementations, progressive loading strategies, and bandwidth limitations without needing actual image libraries.

### Placeholder Image Use Cases

**Wireframing and Mockups:** Create low-fidelity wireframes and high-fidelity mockups using placeholder images as content stand-ins. Designers use placeholders to focus on layout hierarchy, spacing, and composition without distraction from content details. Placeholders clearly indicate "this is not final" to stakeholders.

**Frontend Development:** Build UI components (image galleries, product grids, blog listings) using placeholder images before backend integration provides real data. Placeholder-driven development lets frontend and backend teams work in parallel, then swap placeholders for API data when ready.

**Automated Testing:** Generate screenshots of UI states during automated testing using consistent placeholder images. Placeholder uniformity makes visual regression testing more reliable - changes stand out clearly when real content isn't adding noise.

**Content Management Systems:** Provide default placeholder images in CMS templates for fields without uploaded content. Better user experience than broken image icons or blank spaces. Guides content editors on required image dimensions.

**API Development:** Return placeholder images from mock APIs during development. Placeholder URLs let developers test image-heavy interfaces before connecting to production asset storage (S3, Cloudinary, etc.).

### Placeholder Services Comparison

**placeholder.com:** Free service with simple URL syntax: \`https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Hello\`. Supports custom dimensions, colors, and text. Widely used but relies on external service availability. No authentication required.

**placehold.it:** Classic placeholder service with similar functionality. URL format: \`https://placehold.it/300x200\`. Supports dimensions, colors, formats. Less feature-rich than placeholder.com but reliable and simple.

**picsum.photos:** Provides random real photos as placeholders: \`https://picsum.photos/300/200\`. Great for realistic content mockups but less predictable than solid color placeholders. No custom text support.

**Local Generation (this tool):** Generate and download placeholder images for offline use or when external service dependencies aren't allowed. Control over exact colors, text, and format. No privacy concerns with external services seeing dimensions.

### Placeholder Image Best Practices

**Match Final Dimensions:** Create placeholders at the exact dimensions of final images to accurately test layout behavior. If product images will be 500x500px, use 500x500px placeholders. Mismatched dimensions hide layout issues that appear when real content arrives.

**Use Descriptive Text:** Instead of generic "300x200", add context: "Product Image", "User Avatar", "Hero Banner". Descriptive text helps designers and developers understand content intent without consulting documentation.

**Consistent Color Coding:** Establish placeholder color conventions: blue for primary images, gray for secondary images, green for user-generated content. Color coding makes content types visually obvious in crowded mockups.

**Aspect Ratio Alignment:** Maintain the same aspect ratio for placeholders as final images. Square placeholders (1:1) for avatars, wide rectangles (16:9) for videos, portrait (4:5) for product photography. Aspect ratio mismatches cause layout shifts when swapping to real content.

**Alt Text Planning:** Even for placeholder images, include descriptive alt text in HTML. Plan accessibility early by writing placeholder alt text that describes content purpose: "Product image showing [item]" becomes "Wireless headphones - front view" later.

### Technical Implementation Strategies

**CSS Background Images:** Use placeholders as CSS background images with \`background-size: cover\` to test responsive image behavior. Easy to swap URLs when replacing with real content.

**HTML <img> Tags:** Standard implementation for content images. Set explicit width/height attributes to prevent layout shift when loading. Use srcset for responsive images even with placeholders to test implementation.

**Base64 Data URLs:** Embed small placeholders as base64 data URLs in HTML/CSS for offline development or to eliminate HTTP requests during prototyping. Useful for email templates where external images may not load.

**Dynamic Generation:** Generate placeholder images programmatically in code using canvas APIs or image libraries. Useful for automated testing or seeding development databases with placeholder content.

### Performance Considerations

**File Size:** Placeholder images should be as small as possible (< 5KB for solid colors) since they're temporary. Optimize PNG compression. Avoid unnecessary transparency or gradients that increase file size.

**Caching:** If using placeholder services, images are typically cached by browser and CDN. First request is slow, subsequent requests are instant. For frequently used dimensions, consider downloading and self-hosting.

**Lazy Loading:** Even placeholder images benefit from lazy loading implementation. Use it to test lazy loading behavior with placeholders before adding real images.

This placeholder generator creates custom images entirely in your browser using Canvas API. No external service dependencies. Generate unlimited placeholders with full control over dimensions, colors, and text without API rate limits or network requests.`
  },

  useCases: [
    {
      title: "Rapid UI Prototyping Without Final Assets",
      description: "Build functional prototypes immediately using placeholder images while waiting for design assets. Create interactive mockups that demonstrate user flows, layouts, and functionality before investing in production content.",
      example: `// React component with placeholder images
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  // Real image not available yet
  imageUrl?: string;
}

// Generate placeholder URL helper
function getPlaceholderUrl(width: number, height: number, text: string): string {
  return \`https://via.placeholder.com/\${width}x\${height}/3B82F6/FFFFFF?text=\${encodeURIComponent(text)}\`;
}

function ProductCard({ product }: { product: Product }) {
  // Use placeholder if real image not available
  const imageUrl = product.imageUrl || getPlaceholderUrl(300, 300, product.name);

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={product.name}
        width={300}
        height={300}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

// Product grid with all placeholders during development
function ProductGrid() {
  const [products] = useState<Product[]>([
    { id: '1', name: 'Wireless Headphones', price: 79.99 },
    { id: '2', name: 'Smart Watch', price: 199.99 },
    { id: '3', name: 'Laptop Stand', price: 49.99 },
    { id: '4', name: 'USB-C Cable', price: 19.99 }
    // No imageUrl - will use placeholders
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
},

// Later, when real images are available, just add imageUrl to product data
// Placeholder images automatically replaced without code changes`
    },
    {
      title: "Test Responsive Image Behavior",
      description: "Use placeholder images at various dimensions to test responsive layouts across breakpoints. Verify image containers resize correctly, maintain aspect ratios, and handle different sizes without layout breaks.",
      example: `// Responsive image testing with placeholders
function ResponsiveImageTest() {
  const imageSizes = [
    { width: 320, height: 240, label: 'Mobile' },
    { width: 768, height: 576, label: 'Tablet' },
    { width: 1920, height: 1080, label: 'Desktop' },
    { width: 3840, height: 2160, label: '4K' }
  ];

  return (
    <div className="responsive-test">
      {imageSizes.map(size => (
        <div key={size.label} className="test-case">
          <h3>{size.label} ({size.width}x{size.height})</h3>

          {/* Test <img> tag scaling */}
          <div className="test-container" style={{ maxWidth: '100%' }}>
            <img
              src={\`https://via.placeholder.com/\${size.width}x\${size.height}\`}
              alt={size.label}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Test srcset with multiple placeholder sizes */}
          <img
            src={\`https://via.placeholder.com/\${size.width}x\${size.height}\`}
            srcSet={\`
              https://via.placeholder.com/\${size.width}x\${size.height} 1x,
              https://via.placeholder.com/\${size.width * 2}x\${size.height * 2} 2x
            \`}
            alt={size.label}
            style={{ maxWidth: '100%' }}
          />

          {/* Test background-image scaling */}
          <div
            className="bg-test"
            style={{
              backgroundImage: \`url(https://via.placeholder.com/\${size.width}x\${size.height})\`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              paddingTop: \`\${(size.height / size.width) * 100}%\`
            }}
          />
        </div>
      ))}
    </div>
  );
},

// CSS media query testing with placeholders
const styles = \`
  .hero-image {
    background-image: url('https://via.placeholder.com/1920x600/4F46E5/FFFFFF?text=Desktop+Hero');
    background-size: cover;
    height: 600px;
  },

  @media (max-width: 768px) {
    .hero-image {
      background-image: url('https://via.placeholder.com/768x400/4F46E5/FFFFFF?text=Tablet+Hero');
      height: 400px;
    }
  },

  @media (max-width: 480px) {
    .hero-image {
      background-image: url('https://via.placeholder.com/480x300/4F46E5/FFFFFF?text=Mobile+Hero');
      height: 300px;
    }
  },
\`;`
    },
    {
      title: "Seed Development Database with Placeholder Content",
      description: "Populate development and staging databases with placeholder images for testing. Create realistic user profiles, product catalogs, and content management systems using placeholders until production data is available.",
      example: `// Database seeding with placeholder images
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  thumbnailUrl: string;
}

// Generate placeholder URL
function generatePlaceholder(width: number, height: number, text: string): string {
  const bgColor = faker.internet.color().replace('#', '');
  return \`https://via.placeholder.com/\${width}x\${height}/\${bgColor}/FFFFFF?text=\${encodeURIComponent(text)}\`;
}

// Seed users with placeholder avatars
async function seedUsers(count: number = 100) {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();

    users.push({
      id: faker.string.uuid(),
      name,
      email: faker.internet.email(),
      // Placeholder avatar with user initials
      avatarUrl: generatePlaceholder(
        200,
        200,
        name.split(' ').map(n => n[0]).join('')
      )
    });
  }

  await db.users.insertMany(users);
  console.log(\`Seeded \${count} users with placeholder avatars\`);
},

// Seed products with placeholder images
async function seedProducts(count: number = 500) {
  const products: Product[] = [];
  const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

  for (let i = 0; i < count; i++) {
    const name = faker.commerce.productName();
    const category = faker.helpers.arrayElement(categories);

    products.push({
      id: faker.string.uuid(),
      name,
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      // Product image placeholder
      imageUrl: generatePlaceholder(800, 800, name),
      // Thumbnail placeholder
      thumbnailUrl: generatePlaceholder(200, 200, category)
    });
  }

  await db.products.insertMany(products);
  console.log(\`Seeded \${count} products with placeholder images\`);
},

// Seed blog posts with hero images
async function seedBlogPosts(count: number = 50) {
  const posts = [];

  for (let i = 0; i < count; i++) {
    const title = faker.lorem.sentence();

    posts.push({
      id: faker.string.uuid(),
      title,
      content: faker.lorem.paragraphs(5),
      authorId: faker.string.uuid(),
      // Hero image placeholder
      heroImageUrl: generatePlaceholder(1200, 630, title),
      publishedAt: faker.date.past()
    });
  }

  await db.posts.insertMany(posts);
  console.log(\`Seeded \${count} blog posts with placeholder images\`);
},

// Run all seeds
async function seedDatabase() {
  await seedUsers(100);
  await seedProducts(500);
  await seedBlogPosts(50);
  console.log('Database seeding complete');
}

// npm run seed:dev`
    },
    {
      title: "Create Design System Documentation",
      description: "Document image component specifications using placeholders to demonstrate sizes, aspect ratios, and responsive behavior. Create visual style guides showing required dimensions for various contexts.",
      example: `// Design system documentation with placeholders
function ImageSpecsDocumentation() {
  const imageSpecs = {
    avatars: [
      { size: 24, context: 'Small (inline mentions)' },
      { size: 40, context: 'Medium (comments, lists)' },
      { size: 80, context: 'Large (profile headers)' },
      { size: 200, context: 'Extra Large (profile pages)' }
    ],
    products: [
      { width: 200, height: 200, context: 'Thumbnail' },
      { width: 400, height: 400, context: 'Card view' },
      { width: 800, height: 800, context: 'Detail page' },
      { width: 1200, height: 1200, context: 'Zoom view' }
    ],
    heroes: [
      { width: 1920, height: 600, context: 'Desktop hero' },
      { width: 1280, height: 400, context: 'Tablet hero' },
      { width: 768, height: 300, context: 'Mobile hero' }
    ],
    socialCards: [
      { width: 1200, height: 630, context: 'Open Graph' },
      { width: 1200, height: 675, context: 'Twitter Card' },
      { width: 1080, height: 1080, context: 'Instagram' }
    ]
  };

  return (
    <div className="design-system-docs">
      <h1>Image Specifications</h1>

      <section>
        <h2>Avatar Sizes</h2>
        <div className="specs-grid">
          {imageSpecs.avatars.map(spec => (
            <div key={spec.size} className="spec-item">
              <img
                src={\`https://via.placeholder.com/\${spec.size}x\${spec.size}/6366F1/FFFFFF?text=\${spec.size}px\`}
                alt={\`Avatar \${spec.size}px\`}
                width={spec.size}
                height={spec.size}
              />
              <div className="spec-details">
                <strong>{spec.size}×{spec.size}px</strong>
                <p>{spec.context}</p>
                <code>avatar-\${spec.size}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Product Image Sizes</h2>
        <div className="specs-grid">
          {imageSpecs.products.map(spec => (
            <div key={spec.width} className="spec-item">
              <img
                src={\`https://via.placeholder.com/\${spec.width}x\${spec.height}/8B5CF6/FFFFFF?text=\${spec.width}x\${spec.height}\`}
                alt={\`Product \${spec.width}x\${spec.height}\`}
                style={{ maxWidth: '200px', height: 'auto' }}
              />
              <div className="spec-details">
                <strong>{spec.width}×{spec.height}px</strong>
                <p>{spec.context}</p>
                <code>product-\${spec.width}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Responsive Hero Images</h2>
        {imageSpecs.heroes.map(spec => (
          <div key={spec.width} className="spec-item">
            <h3>{spec.context}</h3>
            <img
              src={\`https://via.placeholder.com/\${spec.width}x\${spec.height}/EC4899/FFFFFF?text=\${spec.width}x\${spec.height}\`}
              alt={\`Hero \${spec.width}x\${spec.height}\`}
              style={{ width: '100%', height: 'auto' }}
            />
            <p><strong>Dimensions:</strong> {spec.width}×{spec.height}px</p>
            <p><strong>Aspect Ratio:</strong> {(spec.width / spec.height).toFixed(2)}:1</p>
          </div>
        ))}
      </section>
    </div>
  );
}`
    }
  ],

  howToUse: {
    title: "How to Use This Placeholder Image Generator",
    content: `This placeholder image generator creates custom placeholder images using browser Canvas API. Generate unlimited placeholders with precise control over dimensions, colors, text, and font sizes without external service dependencies or API rate limits.

### Setting Dimensions

Enter custom width and height in pixels using the input fields at the top. As you type, the preview updates in real-time to show exact dimensions. For common sizes, click preset buttons: Instagram Post (1080x1080), Facebook Post (1200x630), YouTube Thumbnail (1280x720), or various ad sizes (Leaderboard, Medium Rectangle, Skyscraper).

Presets are organized by category: Social Media (Instagram, Facebook, Twitter, YouTube), Ad Sizes (IAB standard banner dimensions), and Common Sizes (HD resolutions, standard web sizes). Click any preset to instantly apply those dimensions.

### Customizing Colors

Click the Background Color picker to choose any color using the visual color picker or enter hex codes directly. Click Text Color to set text color - ensure high contrast with background for readability. The preview shows exactly how your color choices appear.

For best results, use dark backgrounds with light text or light backgrounds with dark text. Avoid low-contrast combinations like light gray on white - these are hard to read in actual use.

### Adding Custom Text

By default, placeholder images show dimensions (e.g., "800×600"). Click in the Custom Text field to replace this with descriptive text: "Product Image", "User Avatar", "Hero Banner". Custom text helps identify content purpose in mockups.

Keep text concise - long text may overflow or become illegible at small sizes. Text is automatically centered and scaled to fit the image dimensions.

### Font Size Control

Font size defaults to "auto" which calculates appropriate size based on dimensions (10% of minimum dimension). For manual control, click the dropdown and select specific pixel sizes: 16px (small images), 32px (medium), 48px (large), or 72px (very large).

Auto sizing works well for most cases. Manual sizing is useful when you want consistent text size across multiple placeholders of different dimensions.

### Preview and Download

The preview canvas shows your exact placeholder at actual size (may be scaled down if larger than screen). What you see is what you download. Click Download Image to save as PNG file with filename "placeholder-[width]x[height].png".

Downloaded images are ready to use immediately in mockups, prototypes, or as temporary content. PNG format ensures lossless quality and transparency support (if needed).

### Copy Data URL

Click Copy Data URL to copy base64-encoded image data URL to clipboard. Data URLs embed the entire image as text, useful for inline HTML/CSS without separate image files. Paste directly into src attributes or CSS background-image properties.

Example data URL: \`data:image/png;base64,iVBORw0KG...\` (truncated for brevity). Data URLs are convenient for email templates, single-file HTML demos, or embedding in documentation.

### Copy Placeholder Service URL

Click Copy Placeholder URL to generate a link to placeholder.com service matching your settings. This URL points to external CDN-hosted placeholder without requiring local file storage. Useful for quick prototyping with external service fallback.

Example URL: \`https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Custom+Text\`. Service URLs work everywhere but depend on external service availability.`,
    steps: [
      {
        name: "Set Dimensions",
        text: "Enter custom width and height in pixels or select from presets (Instagram, Facebook, YouTube, ad sizes). Preview updates in real-time with exact dimensions."
      },
      {
        name: "Customize Colors and Text",
        text: "Choose background and text colors using color pickers. Add custom text (or keep default dimensions). Select font size (auto-calculated or manual). Preview shows exact appearance."
      },
      {
        name: "Download Image",
        text: "Click Download Image to save PNG file. Image is ready to use in mockups, prototypes, or as temporary content. PNG format ensures lossless quality."
      },
      {
        name: "Or Copy Data URL",
        text: "Click Copy Data URL for base64-encoded image to embed inline in HTML/CSS. Or click Copy Placeholder URL for link to external placeholder service."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between downloaded PNG and placeholder service URL?",
      answer: "Downloaded PNG: You host the file on your server. No external dependencies, works offline, full control over caching and availability. Placeholder service URL: External CDN hosts the image. No file uploads needed, but depends on external service availability. Use downloads for production, service URLs for quick prototyping."
    },
    {
      question: "What's the maximum image size I can generate?",
      answer: "Browser canvas has practical limits around 8192x8192 pixels depending on browser and device. For typical placeholder use cases (< 4000px), no issues. Very large images (10000x10000px) may fail or cause performance issues. For most web use, images under 2000px work perfectly."
    },
    {
      question: "Can I use these placeholders commercially?",
      answer: "Yes. All generated images are yours to use commercially without restrictions. Generated images are simple colored rectangles with text - no copyrighted content. Use freely in client projects, commercial websites, applications, or any other purpose."
    },
    {
      question: "Why use custom placeholders instead of placeholder services?",
      answer: "Custom generation offers: (1) No external dependencies - works offline. (2) No API rate limits. (3) Privacy - no external service sees your dimensions. (4) Exact color control without URL encoding. (5) Works in restricted networks that block external services. Use services for convenience, local generation for control."
    },
    {
      question: "How do I create placeholders programmatically in code?",
      answer: "Use Canvas API (browser) or node-canvas (Node.js). Example: create canvas, set dimensions, fill background color, add centered text, export as PNG or data URL. This tool demonstrates the approach - inspect code or use libraries like placeholder.js, canvas-placeholder for automated generation."
    },
    {
      question: "What are data URLs and when should I use them?",
      answer: "Data URLs embed images as base64 text directly in HTML/CSS instead of separate files. Format: data:image/png;base64,... Use for: (1) Email templates (external images may not load). (2) Single-file HTML demos. (3) Eliminating HTTP requests. Downside: Larger file size (33% bigger than binary), no browser caching."
    },
    {
      question: "Can I animate or add gradients to placeholders?",
      answer: "This tool generates static solid-color placeholders for simplicity. For gradients or animations, use image editing tools or programmatic generation with canvas gradients. Simple solid colors are best for placeholders - they're instantly recognizable as temporary content."
    },
    {
      question: "Why does my placeholder text get cut off?",
      answer: "Text is auto-sized to fit dimensions, but very long text with small dimensions causes cutoffs. Solutions: (1) Use shorter text. (2) Manually reduce font size. (3) Increase image dimensions. (4) Use abbreviations (\"Product Img\" vs \"Product Image\"). Keep placeholder text concise for best results."
    },
    {
      question: "Should I use same placeholder for all images or unique ones?",
      answer: "Use unique placeholders with descriptive text for different content types. Color code by purpose: blue for primary images, gray for secondary, green for user-generated. Descriptive text helps developers understand content intent. Same generic placeholder everywhere provides no context."
    },
    {
      question: "How do I replace placeholders with real images later?",
      answer: "Use conditional rendering: if (imageUrl) show real image, else show placeholder. Store placeholder logic in component prop or helper function. When backend provides real URLs, update data source - placeholders automatically replaced. Test both states (with/without real images) to ensure graceful fallback."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This placeholder image generator operates entirely client-side in your browser using the HTML5 Canvas API. All image generation, color selection, and text rendering happen locally using JavaScript. No images, dimensions, or settings are transmitted to servers or stored remotely.

### Privacy Guarantees

- **100% Client-Side Processing:** All placeholder generation uses browser Canvas API to render pixels locally. Image creation, color fills, and text drawing happen on your device.
- **No Data Transmission:** Your dimension choices, color selections, and custom text are not sent to servers or logged anywhere. Everything stays in your browser.
- **No Image Storage:** Generated placeholder images are not saved on servers. Download creates local PNG file from canvas data. No remote storage occurs.
- **No Analytics on Content:** We don't track what dimensions you use, what colors you choose, or what text you enter. Standard analytics track page views only.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during usage - zero network requests occur with your content.

Safe for creating placeholders for confidential projects, client work under NDA, internal tooling, or any use case requiring privacy. Generate placeholders for enterprise applications, unreleased products, or competitive projects with confidence that dimensions and usage patterns remain private.`
  },

  stats: {
    "Preset Sizes": "15+",
    "Color Options": "Unlimited",
    "File Format": "PNG",
    "Max Size": "8192px"
  }
};
