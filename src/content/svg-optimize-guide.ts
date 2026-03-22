/**
 * SVG Optimizer Tool Guide Content
 * Comprehensive developer guide for SVG optimization
 */

import type { ToolGuideContent } from "./types";

export const svgOptimizeGuideContent: ToolGuideContent = {
  toolName: "SVG Optimizer",
  toolPath: "/svg-optimize",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Upload SVG File",
      description: "Upload SVG from design tools (Figma, Illustrator, Sketch) or paste SVG code directly. Optimizer analyzes file for unnecessary data and optimization opportunities."
    },
    {
      title: "Configure Optimization Level",
      description: "Choose aggressive (maximum compression, may affect quality), balanced (recommended, safe optimizations), or conservative (minimal changes, preserve all features). Adjust precision for coordinate rounding."
    },
    {
      title: "Preview Optimized SVG",
      description: "View before/after comparison showing file size reduction. Inspect visual diff to ensure optimization doesn't break appearance. Review removed elements (metadata, comments, hidden layers)."
    },
    {
      title: "Download Optimized SVG",
      description: "Export cleaned SVG with reduced file size. Typical 30-70% reduction. Use optimized SVG for web icons, logos, illustrations with faster load times and better performance."
    }
  ],

  introduction: {
    title: "What is SVG Optimization?",
    content: `SVG optimization removes unnecessary data from SVG files without affecting visual appearance. Design tools (Figma, Illustrator, Sketch) export SVGs with metadata, comments, hidden layers, excessive precision, and redundant code. Optimization strips this bloat, reducing file size 30-90% while maintaining quality.

SVG (Scalable Vector Graphics) is XML-based vector format. Unlike raster images (JPG, PNG) that store pixel data, SVGs store mathematical descriptions of shapes. This makes SVGs infinitely scalable without quality loss but also susceptible to inefficient code generation from design tools.

### Why Optimize SVG Files

Unoptimized SVGs from design tools contain significant bloat:

**Editor Metadata:** Figma, Illustrator, Sketch embed editor-specific data (layer names, grid settings, plugin data). Useful for editing but irrelevant for web display. Can constitute 20-50% of file size.

**Excessive Precision:** Design tools use 6-8 decimal places for coordinates (x="123.456789"). Browser rendering doesn't benefit from precision beyond 2-3 decimals. Rounding coordinates saves bytes.

**Redundant Attributes:** Default values explicitly declared (fill="black" when black is default). Transform attributes with identity values (transform="translate(0,0)"). Removal reduces code.

**Comments and Whitespace:** SVG exports include comments for organization and whitespace for readability. Necessary for editing, wastes bytes in production.

**Unused IDs and Classes:** Design tools generate unique IDs for every element. Only IDs referenced by animations/scripts need preservation. Others removable.

**Hidden/Invisible Elements:** Layers hidden in design tool but still exported. Elements with opacity="0" or display="none" serve no purpose but inflate file size.

### SVG Optimization Techniques

**Precision Reduction:** Round coordinates and transform values to 2-3 decimals. Path: M10.123456,20.789 becomes M10.12,20.79. Invisible to eye, significant byte savings.

**Remove Editor Data:** Strip metadata namespaces (xmlns:figma, xmlns:sketch), editor-specific attributes, layer organization data. Preserves visual output, removes editing context.

**Minification:** Remove whitespace, line breaks, unnecessary quotes, redundant spaces. Compressed SVG harder to read but dramatically smaller.

**Path Optimization:** Simplify path commands. Convert absolute to relative coordinates where shorter. Merge adjacent commands. Path: L100,100 L100,200 becomes L100,100v100 (vertical line shorthand).

**Remove Default Attributes:** Strip attributes matching SVG defaults (fill="black", stroke="none", opacity="1"). Browser applies defaults automatically.

**Collapse Groups:** Merge nested <g> groups with no semantic purpose. Flatten unnecessary structure.

**Convert Styles to Attributes:** Inline <style> blocks often less efficient than presentation attributes. style="fill:red" becomes fill="red".

**Remove Hidden Elements:** Delete elements with display="none", opacity="0", or visibility="hidden". Serve no visual purpose.

### SVGO - The Standard Optimizer

SVGO (SVG Optimizer) is Node.js-based tool and industry standard for SVG optimization. Extensible plugin architecture with 40+ optimization plugins. Most online optimizers (including SVGOMG) use SVGO engine.

SVGO plugins (selected examples):

- **removeDoctype:** Remove XML doctype declaration
- **removeXMLProcInst:** Remove XML processing instructions
- **removeComments:** Strip comments
- **removeMetadata:** Remove <metadata> elements
- **removeEditorsNSData:** Strip editor namespaces
- **cleanupAttrs:** Cleanup attribute whitespace
- **mergeStyles:** Merge style rules
- **removeHiddenElems:** Delete invisible elements
- **cleanupNumericValues:** Round/simplify numbers
- **convertPathData:** Optimize path commands
- **convertTransform:** Optimize transform attributes
- **removeEmptyContainers:** Delete empty groups
- **mergePaths:** Combine paths where possible

Plugins can enable/disable individually for custom optimization profiles.

### Optimization Trade-offs

**Aggressiveness vs Safety:** Aggressive optimization achieves maximum compression but risks breaking complex SVGs (gradients, filters, masks). Conservative optimization safer but larger files. Balanced approach recommended.

**Editability vs File Size:** Optimized SVGs harder to edit - removed IDs, merged paths, stripped metadata. Keep original unoptimized file for design changes, use optimized for production.

**Precision vs Accuracy:** Excessive rounding causes visible artifacts (misaligned paths, gaps). 2-3 decimal precision safe for most icons/logos. Intricate illustrations may need higher precision (4-5 decimals).

**Animation Compatibility:** Some optimizations break CSS/JS animations. Removing IDs destroys animation targets. Merging paths prevents individual path animation. Preserve IDs and structure for animated SVGs.

### File Size Expectations

Optimization results vary by SVG complexity and export tool:

**Simple Icons (Figma/Sketch):** 40-70% reduction typical. Icon exported from Figma: 2KB → 800 bytes.

**Logos with Gradients:** 30-50% reduction. Complex gradients/filters have less removable bloat.

**Illustrations (Illustrator):** 50-90% reduction. Illustrator exports particularly bloated SVGs with extensive metadata.

**Hand-Coded SVG:** Minimal reduction (10-20%). Already lean code has little fat to trim.

### When NOT to Optimize

**Editable Master Files:** Never optimize source SVGs you'll edit later. Optimization destroys editability. Keep originals unoptimized, optimize copies for production.

**Animated SVGs:** Animations rely on specific element IDs, structure, attributes. Aggressive optimization breaks animations. Use conservative settings or manual review.

**SVG Sprites:** Sprite optimization differs from single SVG optimization. Sprite-specific tools handle shared defs, viewBox coordination.

**Programmatically Generated SVG:** If generating SVG with code already optimized (no editor bloat), further optimization marginal benefit.

### Best Practices

**Optimize Before Deployment:** Include SVG optimization in build pipeline. Never serve unoptimized design tool exports.

**Test Visual Output:** Always compare before/after visually. Automation catches most issues, but edge cases exist (precision problems, gradient breakage).

**Preserve Source Files:** Keep original unoptimized SVG for future edits. Optimization is one-way process - can't perfectly reverse.

**Use Appropriate Precision:** 2-3 decimals for icons/logos, 3-4 for detailed illustrations. Test to find minimum precision without visible artifacts.

**Consider Gzip Compression:** SVG is text (XML), compresses excellently with gzip. Optimized SVG + gzip = maximum efficiency. 5KB optimized SVG may gzip to 1.5KB.

**Inline Small SVGs:** SVGs under 1-2KB often better inlined in HTML than external files (saves HTTP request). Optimization makes more SVGs small enough to inline.`,
  },

  useCases: [
    {
      title: "Icon Set Optimization",
      description: "Optimize icon libraries for web use. Reduce icon file sizes 50-70% without quality loss. Critical for icon fonts or inline SVG icons to minimize page weight.",
      example: `/* Before optimization (Figma export) - 2.1KB */
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="icon/user">
    <path id="Vector" d="M20.0000 21.0000C20.0000 19.6044 20.0000 18.9067 19.8278 18.3389C19.4874 17.0605 18.4395 16.0126 17.1611 15.6722C16.5933 15.5000 15.8956 15.5000 14.5000 15.5000H9.50000C8.10444 15.5000 7.40665 15.5000 6.83886 15.6722C5.56045 16.0126 4.51256 17.0605 4.17212 18.3389C4.00000 18.9067 4.00000 19.6044 4.00000 21.0000M16.5000 7.50000C16.5000 9.98528 14.4853 12.0000 12.0000 12.0000C9.51472 12.0000 7.50000 9.98528 7.50000 7.50000C7.50000 5.01472 9.51472 3.00000 12.0000 3.00000C14.4853 3.00000 16.5000 5.01472 16.5000 7.50000Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>

/* After optimization - 680 bytes (68% reduction) */
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 21c0-1.4 0-2.1-.17-2.66a4 4 0 0 0-2.66-2.66C16.6 15.5 15.9 15.5 14.5 15.5h-5c-1.4 0-2.1 0-2.66.17a4 4 0 0 0-2.66 2.66C4 18.9 4 19.6 4 21M16.5 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

/* React component with optimized icon */
const UserIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21c0-1.4 0-2.1-.17-2.66a4 4 0 0 0-2.66-2.66C16.6 15.5 15.9 15.5 14.5 15.5h-5c-1.4 0-2.1 0-2.66.17a4 4 0 0 0-2.66 2.66C4 18.9 4 19.6 4 21M16.5 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" />
  </svg>
);

/* Inline optimized SVG in HTML */
<button class="icon-button">
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M20 21c0-1.4 0-2.1-.17-2.66a4 4 0 0 0-2.66-2.66C16.6 15.5 15.9 15.5 14.5 15.5h-5c-1.4 0-2.1 0-2.66.17a4 4 0 0 0-2.66 2.66C4 18.9 4 19.6 4 21M16.5 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="currentColor" stroke-width="2"/>
  </svg>
  Profile
</button>`
    },
    {
      title: "Logo Optimization for Web",
      description: "Reduce logo file size while preserving brand integrity. Optimized logos load faster, especially important for above-the-fold branding. Maintain visual quality with smaller footprint.",
      example: `/* Before optimization (Illustrator export) - 8.5KB */
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 26.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 200 60" style="enable-background:new 0 0 200 60;" xml:space="preserve">
<style type="text/css">
  .st0{fill:#667EEA;}
  .st1{fill:#764BA2;}
</style>
<g id="logo">
  <path class="st0" d="M20.5000,10.0000 C25.7467,10.0000 30.0000,14.2533 30.0000,19.5000 C30.0000,24.7467 25.7467,29.0000 20.5000,29.0000 C15.2533,29.0000 11.0000,24.7467 11.0000,19.5000 C11.0000,14.2533 15.2533,10.0000 20.5000,10.0000 Z"/>
  <path class="st1" d="M40.0000,15.0000 L60.0000,15.0000 L60.0000,25.0000 L40.0000,25.0000 Z"/>
</g>
</svg>

/* After optimization - 420 bytes (95% reduction) */
<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <path fill="#667EEA" d="M20.5 10a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19z"/>
  <path fill="#764BA2" d="M40 15h20v10H40z"/>
</svg>

/* Usage in website header */
<header class="site-header">
  <a href="/" class="logo">
    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" width="120" height="36">
      <path fill="#667EEA" d="M20.5 10a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19z"/>
      <path fill="#764BA2" d="M40 15h20v10H40z"/>
    </svg>
  </a>
</header>

/* Inlined optimized SVG logo */
.logo svg {
  display: block;
  width: 120px;
  height: auto;
}

/* Dark mode logo color swap */
[data-theme="dark"] .logo path:first-child {
  fill: #93c5fd;
}

[data-theme="dark"] .logo path:nth-child(2) {
  fill: #c4b5fd;
}`
    },
    {
      title: "Illustration File Size Reduction",
      description: "Optimize complex illustrations exported from design tools. Remove hidden layers, excessive precision, and metadata. Achieve 60-80% size reduction on detailed graphics.",
      example: `/* Before optimization (Figma illustration export) - 45KB */
<svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Excessive precision, redundant groups, hidden elements -->
  <g id="illustration">
    <g id="background" opacity="1.000000">
      <rect x="0.000000" y="0.000000" width="500.000000" height="400.000000" fill="#F3F4F6"/>
    </g>
    <g id="character" transform="translate(0.000000, 0.000000)">
      <path id="Vector_1" d="M150.123456,200.789012 L200.456789,180.123456..." fill="#667EEA"/>
      <!-- Many more paths with 6+ decimal precision -->
    </g>
    <g id="hidden-layer" opacity="0">
      <!-- Hidden elements still exported -->
    </g>
  </g>
</svg>

/* After optimization - 12KB (73% reduction) */
<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
  <path fill="#F3F4F6" d="M0 0h500v400H0z"/>
  <path fill="#667EEA" d="M150.12 200.79L200.46 180.12..."/>
  <!-- Reduced precision, removed hidden layers, merged groups -->
</svg>

/* Using optimized illustration */
<div class="hero-section">
  <div class="hero-content">
    <h1>Welcome</h1>
    <p>Discover amazing things</p>
  </div>
  <div class="hero-illustration">
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
      <path fill="#F3F4F6" d="M0 0h500v400H0z"/>
      <path fill="#667EEA" d="M150.12 200.79L200.46 180.12..."/>
    </svg>
  </div>
</div>

/* Responsive illustration sizing */
.hero-illustration svg {
  width: 100%;
  max-width: 500px;
  height: auto;
}

@media (max-width: 768px) {
  .hero-illustration svg {
    max-width: 300px;
  }
}`
    },
    {
      title: "Build Pipeline SVG Optimization",
      description: "Integrate SVG optimization into build process. Automatically optimize all SVG assets during build. Ensures production deployment never serves bloated design tool exports.",
      example: `/* package.json scripts */
{
  "scripts": {
    "optimize-svg": "svgo -f src/assets/svg -o dist/svg --multipass",
    "build": "npm run optimize-svg && next build"
  }
}

/* SVGO configuration file (svgo.config.js) */
module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIDs: {
            remove: true,
            minify: true,
            prefix: 'svg-'
          }
        }
      }
    },
    'removeDimensions',
    'removeScriptElement',
    {
      name: 'convertPathData',
      params: {
        floatPrecision: 2,
        transformPrecision: 5
      }
    }
  ]
};

/* Webpack loader for automatic SVG optimization */
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
              noquotes: true
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: { floatPrecision: 2 } }
              ]
            }
          }
        ]
      }
    ]
  }
};

/* Next.js SVG optimization with SVGR */
// next.config.js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false
                    }
                  }
                },
                {
                  name: 'convertPathData',
                  params: {
                    floatPrecision: 2
                  }
                }
              ]
            }
          }
        }
      ]
    });
    return config;
  }
};

/* Vite SVG optimization plugin */
// vite.config.js
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { svgo } from 'rollup-plugin-svgo';

export default defineConfig({
  plugins: [
    svgr({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false
              }
            }
          }
        ]
      }
    }),
    svgo({
      multipass: true
    })
  ]
});

/* GitHub Actions workflow */
name: Optimize SVGs
on:
  pull_request:
    paths:
      - 'src/assets/**/*.svg'
jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install SVGO
        run: npm install -g svgo
      - name: Optimize SVGs
        run: svgo -f src/assets/svg --multipass
      - name: Commit optimized SVGs
        run: |
          git config user.name "SVG Optimizer Bot"
          git add src/assets/svg
          git commit -m "chore: optimize SVG files" || echo "No changes"
          git push`
    }
  ],

  howToUse: {
    title: "How to Use This SVG Optimizer",
    content: `This SVG optimizer reduces file sizes by removing unnecessary data while preserving visual quality. Upload SVG, configure settings, preview results, and download optimized file.

### Uploading SVG Files

**File Upload:** Click upload or drag SVG file. Accepts SVG from Figma, Illustrator, Sketch, Inkscape, any vector editor.

**Paste SVG Code:** Copy SVG code from editor, paste directly into text area. Useful for quick optimization without file downloads.

**Batch Upload:** Some optimizers support multiple files simultaneously. Upload entire icon set for batch processing.

### Understanding Optimization Levels

**Aggressive (Maximum Compression):**
- Removes all metadata, comments, hidden elements
- Rounds coordinates to 1-2 decimals
- Merges paths where possible
- Removes all unused IDs
- Risk: May break complex SVGs with gradients, masks, animations

**Balanced (Recommended):**
- Removes editor data, comments
- Rounds to 2-3 decimals (safe precision)
- Preserves essential IDs, structure
- Optimizes paths conservatively
- Safe for 95% of SVGs

**Conservative (Minimal Changes):**
- Removes only obvious bloat (comments, metadata)
- Maintains 4-5 decimal precision
- Preserves all IDs, attributes
- Safest for complex SVGs, animations

### Configuring Optimization Settings

**Precision (Decimal Places):**
- 1 decimal: Maximum compression, risk of visual artifacts
- 2-3 decimals: Recommended, invisible artifacts, good compression
- 4-5 decimals: Conservative, minimal artifacts, less compression

**Remove Metadata:** Strips editor-specific data (Figma layers, Sketch plugin data). Always enable unless debugging.

**Remove Comments:** Deletes SVG comments. Enable for production, disable if comments contain important info.

**Merge Paths:** Combines adjacent paths into single path. Reduces code but may complicate editing.

**Remove Hidden Elements:** Deletes invisible elements (opacity="0", display="none"). Always enable unless intentionally toggling visibility with scripts.

**Preserve IDs:** Keep element IDs. Required for animations, CSS targeting. Disable for static icons to save bytes.

### Reviewing Optimization Results

**File Size Comparison:** Before/after sizes show reduction percentage. Typical: 40-70% for design tool exports.

**Visual Diff:** Side-by-side comparison ensures no visual breakage. Look for:
- Misaligned paths (excessive rounding)
- Missing gradients (over-optimization)
- Color changes (incorrect color optimization)
- Broken shapes (path merge issues)

**Code Diff:** View removed/changed code. Verify only bloat removed, not essential attributes.

**Compression Stats:** See breakdown of what was removed (metadata: 2KB, precision: 1.5KB, etc.).

### Downloading Optimized SVG

**Single File:** Download button saves optimized SVG with same filename + "-optimized" suffix.

**Copy to Clipboard:** Copy optimized code directly to paste into code editor or CMS.

**Batch Download:** If batch uploaded, download ZIP of all optimized SVGs.

### Common Optimization Issues

**Broken Gradients:** Aggressive ID removal or path merging breaks gradient references. Use conservative mode or manually check gradients.

**Animation Breakage:** Optimizing animated SVGs can remove animation target IDs. Disable ID removal for animated graphics.

**Text Rendering:** Some optimizations convert text to paths. If text should remain editable, disable text-to-path conversion.

**Precision Artifacts:** Excessive coordinate rounding creates gaps or misalignments. Increase decimal precision (3-4 decimals).

**Missing viewBox:** Some optimizers remove viewBox attribute. Ensure "preserve viewBox" enabled for responsive SVGs.

### Best Practices

**Keep Originals:** Always preserve unoptimized source files for future edits. Optimization is lossy for editability.

**Test Visually:** Compare before/after at actual usage size. Zoom in to catch subtle artifacts.

**Optimize Once:** Don't repeatedly optimize same SVG. Each pass can degrade quality. Optimize final version once.

**Use Appropriate Settings:** Icons: aggressive. Logos: balanced. Illustrations: conservative. Animations: minimal optimization.

**Inline Small SVGs:** Optimized SVGs under 1-2KB often better inlined in HTML/CSS than external files (saves HTTP request).

**Gzip Compression:** Combine optimization with gzip for maximum efficiency. Optimized SVG compresses better than bloated original.`,
    steps: [
      {
        name: "Upload SVG",
        text: "Upload SVG file from design tool (Figma, Illustrator, Sketch) or paste SVG code directly. Tool accepts any valid SVG regardless of source or complexity."
      },
      {
        name: "Configure Settings",
        text: "Choose optimization level: aggressive (max compression), balanced (recommended), or conservative (minimal changes). Adjust precision (2-3 decimals recommended). Enable/disable specific optimizations."
      },
      {
        name: "Preview Results",
        text: "Review before/after visual comparison. Check file size reduction (typically 40-70%). Inspect code diff showing removed elements. Verify no visual breakage or artifacts from optimization."
      },
      {
        name: "Download Optimized",
        text: "Download cleaned SVG file or copy code to clipboard. Use optimized SVG in production for faster load times. Keep original unoptimized file for future edits."
      }
    ]
  },

  faqs: [
    {
      question: "How much smaller will my SVG file be after optimization?",
      answer: "Typical reductions: 40-70% for design tool exports (Figma, Sketch, Illustrator). Simple icons: 50-70%. Complex illustrations: 30-50%. Hand-coded SVG: 10-20%. Results vary based on original bloat. Illustrator exports particularly bloated - often 80-90% reduction. Already-optimized SVGs see minimal gains."
    },
    {
      question: "Will optimization affect SVG quality or appearance?",
      answer: "No visible quality loss with proper settings. 2-3 decimal precision invisible to human eye. Balanced mode preserves all visual features. Risk only with aggressive settings: excessive rounding causes misalignment, path merging may break complex shapes. Always preview before/after to verify no visual changes."
    },
    {
      question: "Can I optimize SVG files with animations?",
      answer: "Yes, with caution. Animations rely on element IDs and specific structure. Disable ID removal and path merging. Use conservative mode. Manually verify animation still works after optimization. Some optimizations (metadata removal, precision reduction) safe for animated SVGs. Others (ID cleanup, structure changes) break animations."
    },
    {
      question: "What's the difference between SVGO and other SVG optimizers?",
      answer: "SVGO is industry standard Node.js library powering most online optimizers (SVGOMG, etc.). Extensible plugin system, 40+ optimization techniques. Other tools (SVGGO, SVG Optimizer) often SVGO wrappers with different UIs. Core algorithms same. Choose based on interface preference and available features (batch processing, build integration)."
    },
    {
      question: "Should I optimize SVG logos?",
      answer: "Yes, but use balanced or conservative mode. Logos require brand integrity - aggressive optimization risks subtle changes. Remove metadata and precision, preserve structure. Test optimized logo at all sizes. 30-50% reduction common without visual impact. Always compare before/after at actual usage sizes."
    },
    {
      question: "How does decimal precision affect file size?",
      answer: "Each decimal place adds 1 character per coordinate. Path with 100 coordinates at 6 decimals vs 2 decimals = 400 bytes saved. Multiplied across all paths, precision reduction significant. 6 decimals: x=\"123.456789\" (11 chars). 2 decimals: x=\"123.46\" (7 chars). 36% reduction per coordinate. Precision beyond 2-3 decimals imperceptible in browser rendering."
    },
    {
      question: "Can optimization break my SVG?",
      answer: "Yes, if settings too aggressive. Risks: Excessive rounding misaligns paths. ID removal breaks animations/CSS targeting. Path merging prevents individual element styling. Gradient removal destroys color fills. Always preview and test. Use balanced mode for safety. Keep original file. Start conservative, increase aggressiveness if no issues."
    },
    {
      question: "Should I inline optimized SVGs or use external files?",
      answer: "Inline SVGs < 1-2KB (saves HTTP request, enables CSS styling). External files > 2KB (browser caching, separates concerns). Optimization makes more SVGs small enough to inline. Inline critical above-fold icons, external for below-fold or repeated SVGs. Gzipped optimized SVG often under 1KB - excellent inline candidates."
    },
    {
      question: "How do I optimize SVGs in my build process?",
      answer: "Use SVGO in build pipeline. Node.js: npm package svgo. Webpack: svgo-loader. Vite: rollup-plugin-svgo. Next.js: configure in next.config.js. Scripts: add optimize-svg npm script. CI/CD: add optimization step to deployment. Automates optimization, ensures production never serves bloated exports. Configure once, optimize automatically forever."
    },
    {
      question: "Is my SVG file private when using this optimizer?",
      answer: "Yes. All optimization happens client-side in your browser using JavaScript. SVG files never uploaded to servers. Processing occurs locally in browser memory. No file data, optimizations, or uploads stored anywhere. Tool works offline after initial load. Your SVG files and optimized outputs never leave your device. Safe for proprietary logos, client work, confidential assets."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your SVG files never leave your browser. This optimizer operates entirely client-side using JavaScript. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All SVG parsing, optimization, and code generation happen in your browser's JavaScript engine.
- **No File Uploads:** SVG files stay on your device. We don't have servers to receive uploads. Tool processes files locally in browser memory.
- **No Data Storage:** Your SVG files and optimized outputs are not saved anywhere. Browser processes SVGs, discards after download/copy.
- **No Analytics Tracking:** We don't track which files you optimize or optimization settings you use.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing SVG data.

This makes the tool safe for proprietary logos, client assets, confidential illustrations, or sensitive brand files. Use with confidence for commercial projects. Your visual assets remain completely private.`
  },

  stats: {
    "Typical Reduction": "40-70%",
    "Supported Formats": "SVG",
    "Optimization Plugins": "40+",
    "Decimal Precision": "0-8",
    "Server Uploads": "0"
  }
};
