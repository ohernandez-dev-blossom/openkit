/**
 * Colorblind Simulator Tool Guide Content
 * Comprehensive developer guide for colorblind accessibility simulation
 */

import type { ToolGuideContent } from "./types";

export const colorblindGuideContent: ToolGuideContent = {
  toolName: "Colorblind Simulator",
  toolPath: "/colorblind",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Upload Design or Screenshot",
      description: "Upload your interface design, web page screenshot, data visualization, or any visual content to test for colorblind accessibility across different vision types."
    },
    {
      title: "Select Color Blindness Type",
      description: "Choose from common types: Protanopia (red-blind), Deuteranopia (green-blind), Tritanopia (blue-blind), or other variations to see how different users perceive your design."
    },
    {
      title: "Compare Original vs Simulated",
      description: "View side-by-side comparison of original design and colorblind simulation. Identify problematic color combinations where critical information becomes invisible or indistinguishable."
    },
    {
      title: "Identify Accessibility Issues",
      description: "Spot UI elements that lose distinction: buttons, links, charts, status indicators, or form validation. Fix color dependencies before production deployment."
    }
  ],

  introduction: {
    title: "What is a Colorblind Simulator?",
    content: `A colorblind simulator is a visual accessibility tool that simulates how designs appear to users with color vision deficiencies. By applying mathematical color transformations based on colorblindness types, simulators reveal accessibility issues invisible to designers with typical color vision. This is essential for WCAG compliance, inclusive design, and ensuring critical information isn't conveyed through color alone.

Color vision deficiency (CVD) affects approximately 8% of men and 0.5% of women globally. The most common types are red-green colorblindness (protanopia and deuteranopia), affecting ability to distinguish reds and greens. Blue-yellow colorblindness (tritanopia) is rarer. Without testing, designers inadvertently create interfaces where color-coded information becomes inaccessible to millions of users.

### Why Developers Need Colorblind Simulators

WCAG (Web Content Accessibility Guidelines) Success Criterion 1.4.1 requires that color is not the only visual means of conveying information. Relying solely on color for links, status indicators, form validation, or data visualization creates accessibility barriers. Simulators help identify violations before they reach production.

Data visualizations frequently fail colorblind users. Red-green color scales (common in heatmaps, choropleth maps, traffic lights) become indistinguishable to protanopes and deuteranopes. Charts using only color to differentiate data series become unreadable. Simulators expose these issues during design phase.

UI components often use color for state communication: green "success", red "error", blue "info", yellow "warning". Users with CVD can't distinguish these states if color is the only differentiator. Adding icons, patterns, or text labels ensures accessibility.

Brand color palettes may include problematic combinations. A logo with red and green elements may appear identical tones to colorblind users. Testing brand assets ensures they remain distinct and recognizable across all vision types.

### Types of Color Blindness

**Protanopia (Red-Blind):** Missing or non-functioning red cones. Red appears dark, red/green distinction lost. Affects ~1% of males. Red/green, red/brown, purple/blue, orange/yellow become similar. Traffic lights and error messages (typically red) are problematic.

**Deuteranopia (Green-Blind):** Missing or non-functioning green cones. Green appears tan/brown, red/green distinction lost. Affects ~1% of males. Similar confusion patterns as protanopia. Most common severe CVD type.

**Protanomaly & Deuteranomaly:** Milder forms of protanopia and deuteranopia. Reduced sensitivity rather than complete absence. Affects ~6-8% of males combined. Still causes red/green confusion but less severe.

**Tritanopia (Blue-Blind):** Missing or non-functioning blue cones. Blue/yellow distinction lost. Very rare, affects ~0.001% of population equally across genders. Blue appears green, yellow appears violet/pink. Blue/green and yellow/red confusion.

**Achromatopsia (Complete Color Blindness):** No color vision, only grayscale. Extremely rare (~0.003%). All information must work in grayscale only.

**Simulation Importance:** Testing for protanopia and deuteranopia covers ~99% of colorblind users. Tritanopia testing ensures comprehensive coverage.

### Common Accessibility Problems

**Red-Green Indicators:** Traffic lights, status badges (online/offline), error/success messages using only red/green are invisible to deuteranopes and protanopes. Solution: add icons, text labels, or patterns.

**Link Distinction:** Links differentiated from text only by color fail WCAG. Protanopes can't see red links on black text. Solution: underline links or use sufficient brightness contrast.

**Form Validation:** Red outlines on invalid fields without additional indicators (icons, text descriptions) don't communicate errors to colorblind users. Solution: add error icons and descriptive text.

**Data Visualization Color Scales:** Rainbow color scales, red-green heatmaps, traffic light coding in charts become homogeneous for CVD users. Solution: use colorblind-safe palettes (blue-orange, purple-green) or add patterns/labels.

**Color-Coded Categories:** File types, priority levels, or categories distinguished only by color are inaccessible. Solution: add text labels, icons, or shape differentiators.

### Colorblind-Safe Color Palettes

**Blue-Orange Diverging:** Safe for all CVD types. Blue (#0571B0) to Orange (#CA5010) with neutral center. High contrast, distinct across all vision types.

**Purple-Green Diverging:** Magenta (#C7254E) to Teal (#009B95). Safer than red-green, works for most CVD types.

**Okabe-Ito Palette:** Scientifically designed for CVD accessibility. Eight distinct colors optimized for all vision types including deuteranopia and protanopia.

**Viridis, Plasma, Inferno:** Perceptually uniform color maps designed for colorblind accessibility. Used in scientific visualization.

**ColorBrewer:** Provides CVD-safe palettes for data visualization, tested across all colorblindness types.

### WCAG Accessibility Requirements

**Success Criterion 1.4.1 (Use of Color - Level A):** Color cannot be the only visual means of conveying information, indicating action, prompting response, or distinguishing element. Must provide non-color alternatives.

**Success Criterion 1.4.3 (Contrast Minimum - Level AA):** Text must have 4.5:1 contrast ratio (3:1 for large text). Ensures readability independent of color perception.

**Success Criterion 1.4.11 (Non-text Contrast - Level AA):** UI components and graphical objects must have 3:1 contrast ratio. Ensures controls are perceivable regardless of color vision.

Colorblind simulation helps identify WCAG violations but isn't sufficient alone. Combine with contrast checkers and manual testing.

### Beyond Color: Accessible Alternatives

**Icons and Symbols:** Add icons to color-coded states. Green checkmark for success, red X for error, blue info icon. Provides semantic meaning independent of color.

**Text Labels:** Include text descriptions alongside color coding. "Status: Active (green)" instead of just green dot.

**Patterns and Textures:** Use hatching, dots, or stripes in charts and maps to differentiate categories beyond color.

**Shape Differentiation:** Use different marker shapes (circle, square, triangle) in scatter plots. Different line styles (solid, dashed, dotted) in line charts.

**Sufficient Contrast:** Ensure brightness/luminance differences even if hue distinction is lost. Dark blue vs light blue works better than red vs green at same brightness.`,
  },

  useCases: [
    {
      title: "Form Validation Accessibility",
      description: "Test form validation states (error, success, warning) to ensure colorblind users can identify field states without relying on color alone. Add icons and descriptive text for WCAG compliance.",
      example: `/* Inaccessible: color-only error state */
.input-error {
  border: 2px solid #ef4444; /* red border only */
}

/* Accessible: color + icon + text */
.input-container {
  position: relative;
}

.input-error {
  border: 2px solid #ef4444;
  padding-right: 40px; /* space for icon */
}

.input-error-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #ef4444;
  font-size: 20px;
}

.input-error-icon::before {
  content: "⚠️"; /* warning icon provides non-color indicator */
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.error-message::before {
  content: "✖"; /* visual indicator */
  font-weight: bold;
}

/* Success state with checkmark */
.input-success {
  border: 2px solid #10b981;
  padding-right: 40px;
}

.input-success-icon::before {
  content: "✓";
  color: #10b981;
  font-size: 20px;
  font-weight: bold;
}

/* React accessible form input */
const AccessibleInput = ({ error, success, value, onChange }) => (
  <div className="input-container">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={\`input \${error ? 'input-error' : ''} \${success ? 'input-success' : ''}\`}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? 'error-msg' : undefined}
    />
    {error && (
      <div className="input-error-icon" aria-hidden="true">⚠️</div>
    )}
    {success && (
      <div className="input-success-icon" aria-hidden="true">✓</div>
    )}
    {error && (
      <div id="error-msg" className="error-message" role="alert">
        <span aria-hidden="true">✖</span>
        <span>{error}</span>
      </div>
    )}
  </div>
);

/* Tailwind CSS accessible validation */
<div class="relative">
  <input
    type="email"
    class="border-2 border-red-500 pr-10 aria-invalid:border-red-500"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" aria-hidden="true">
    ⚠️
  </span>
  <p id="email-error" class="text-red-600 text-sm mt-1 flex items-center gap-2" role="alert">
    <span aria-hidden="true">✖</span>
    <span>Invalid email format</span>
  </p>
</div>

/* Required field indicator (not just color) */
.label-required::after {
  content: " *";
  color: #ef4444;
  font-weight: bold;
}

/* Alternative: use text instead of color */
.label-required::after {
  content: " (required)";
  font-size: 0.875rem;
  color: #6b7280;
}`
    },
    {
      title: "Status Indicators and Badges",
      description: "Create status indicators (online/offline, active/inactive, success/error) that work for colorblind users by combining color with icons, text, or shape variations.",
      example: `/* Inaccessible: color-only status dots */
.status-online {
  width: 12px;
  height: 12px;
  background: #10b981; /* green */
  border-radius: 50%;
}

.status-offline {
  width: 12px;
  height: 12px;
  background: #ef4444; /* red - indistinguishable from green for deuteranopes */
  border-radius: 50%;
}

/* Accessible: color + shape + text */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
}

.status-online {
  background: #d1fae5;
  color: #065f46;
}

.status-online::before {
  content: "●"; /* filled circle */
  color: #10b981;
  font-size: 16px;
}

.status-offline {
  background: #fee2e2;
  color: #991b1b;
}

.status-offline::before {
  content: "○"; /* hollow circle - different shape */
  color: #ef4444;
  font-size: 16px;
}

/* Icon-based status */
.status-icon {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.status-success {
  color: #059669;
}

.status-success::before {
  content: "✓";
  font-weight: bold;
}

.status-error {
  color: #dc2626;
}

.status-error::before {
  content: "✖";
  font-weight: bold;
}

.status-warning {
  color: #d97706;
}

.status-warning::before {
  content: "⚠";
  font-weight: bold;
}

/* React status component with icon + text */
const StatusBadge = ({ status, label }) => {
  const statusConfig = {
    online: { icon: "●", text: "Online", bgClass: "bg-green-100", textClass: "text-green-800" },
    offline: { icon: "○", text: "Offline", bgClass: "bg-red-100", textClass: "text-red-800" },
    away: { icon: "◐", text: "Away", bgClass: "bg-yellow-100", textClass: "text-yellow-800" }
  };

  const config = statusConfig[status];

  return (
    <span className={\`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold \${config.bgClass} \${config.textClass}\`}>
      <span aria-hidden="true">{config.icon}</span>
      <span>{label || config.text}</span>
    </span>
  );
};

/* Priority levels with icons */
.priority {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
}

.priority-high {
  background: #fee2e2;
  color: #991b1b;
}

.priority-high::before {
  content: "▲▲"; /* double up arrow */
}

.priority-medium {
  background: #fef3c7;
  color: #92400e;
}

.priority-medium::before {
  content: "▲"; /* single up arrow */
}

.priority-low {
  background: #e0e7ff;
  color: #3730a3;
}

.priority-low::before {
  content: "▼"; /* down arrow */
}

/* Connection status with animation */
.connection-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.connection-connected::before {
  content: "";
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.connection-disconnected::before {
  content: "";
  width: 10px;
  height: 10px;
  background: transparent;
  border: 2px solid #ef4444;
  border-radius: 50%;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}`
    },
    {
      title: "Data Visualization Accessibility",
      description: "Test charts, graphs, and data visualizations for colorblind accessibility. Use colorblind-safe palettes, add patterns, labels, and ensure sufficient luminance contrast between data series.",
      example: `/* Inaccessible: red-green color scale */
const inaccessibleColors = ['#ef4444', '#f97316', '#fbbf24', '#84cc16', '#10b981'];

/* Accessible: blue-orange diverging scale (safe for all CVD types) */
const accessibleColors = ['#0571B0', '#92C5DE', '#F7F7F7', '#F4A582', '#CA5010'];

/* Okabe-Ito colorblind-safe palette */
const okabeIto = [
  '#E69F00', // orange
  '#56B4E9', // sky blue
  '#009E73', // bluish green
  '#F0E442', // yellow
  '#0072B2', // blue
  '#D55E00', // vermillion
  '#CC79A7'  // reddish purple
];

/* Chart.js with colorblind-safe colors and patterns */
const chartConfig = {
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Product A',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(0, 114, 178, 0.5)', // blue
        borderColor: '#0072B2',
        borderWidth: 2,
        borderDash: [] // solid line
      },
      {
        label: 'Product B',
        data: [28, 48, 40, 19],
        backgroundColor: 'rgba(230, 159, 0, 0.5)', // orange
        borderColor: '#E69F00',
        borderWidth: 2,
        borderDash: [5, 5] // dashed line - adds non-color differentiator
      },
      {
        label: 'Product C',
        data: [45, 35, 60, 70],
        backgroundColor: 'rgba(0, 158, 115, 0.5)', // bluish green
        borderColor: '#009E73',
        borderWidth: 2,
        borderDash: [2, 2] // dotted line
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true // uses different shapes for legend items
        }
      }
    }
  }
};

/* D3.js scatter plot with shapes */
const shapes = ['circle', 'square', 'triangle-up', 'diamond'];
const colors = okabeIto;

svg.selectAll('.point')
  .data(data)
  .enter()
  .append('path')
  .attr('d', (d, i) => d3.symbol().type(d3[shapes[i % shapes.length]])())
  .attr('fill', (d, i) => colors[i % colors.length])
  .attr('transform', d => \`translate(\${xScale(d.x)}, \${yScale(d.y)})\`);

/* Heatmap with patterns + color */
.heatmap-cell {
  position: relative;
}

.heatmap-low {
  background: #dbeafe; /* light blue */
}

.heatmap-low::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.1) 2px,
    rgba(0,0,0,0.1) 4px
  ); /* diagonal lines pattern */
}

.heatmap-high {
  background: #1e3a8a; /* dark blue */
}

/* SVG pattern definitions for charts */
<svg>
  <defs>
    <pattern id="diagonal-stripe" patternUnits="userSpaceOnUse" width="4" height="4">
      <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#000" strokeWidth="1"/>
    </pattern>
    <pattern id="dots" patternUnits="userSpaceOnUse" width="4" height="4">
      <circle cx="2" cy="2" r="1" fill="#000"/>
    </pattern>
  </defs>
  <rect fill="url(#diagonal-stripe)" width="100" height="100"/>
</svg>

/* React chart with accessible color + labels */
const AccessibleBarChart = ({ data }) => (
  <div className="chart">
    {data.map((item, i) => (
      <div key={i} className="bar-container">
        <div
          className="bar"
          style={{
            height: \`\${item.value}%\`,
            backgroundColor: okabeIto[i % okabeIto.length]
          }}
          aria-label={\`\${item.label}: \${item.value}%\`}
        >
          <span className="bar-label">{item.value}%</span>
        </div>
        <span className="bar-name">{item.label}</span>
      </div>
    ))}
  </div>
);`
    },
    {
      title: "Link and Interactive Element Distinction",
      description: "Ensure links and interactive elements are distinguishable from regular text without relying solely on color. Use underlines, icons, or sufficient luminance contrast for WCAG compliance.",
      example: `/* Inaccessible: color-only link differentiation */
a {
  color: #3b82f6; /* blue links */
  text-decoration: none; /* no underline */
}

/* Accessible: underlined links */
a {
  color: #2563eb;
  text-decoration: underline;
  text-underline-offset: 3px;
}

a:hover {
  text-decoration-thickness: 2px;
}

/* Alternative: icon indicator */
a.external-link::after {
  content: " ↗";
  font-size: 0.85em;
  color: currentColor;
}

a.download-link::before {
  content: "⬇ ";
  font-size: 0.85em;
}

/* WCAG-compliant link with sufficient contrast */
a {
  color: #1e40af; /* darker blue, 7:1 contrast on white */
  text-decoration: underline;
  text-decoration-color: #3b82f6;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
}

/* Visited links with different style (not just color) */
a:visited {
  color: #6b21a8; /* purple */
  text-decoration-style: dotted; /* different pattern */
}

/* Focus state with multiple indicators */
a:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  background: #dbeafe;
  border-radius: 2px;
}

/* Button links with clear affordance */
.button-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  border: 2px solid transparent;
  font-weight: 600;
}

.button-link:hover {
  background: #1e40af;
  border-color: #1e3a8a; /* additional visual change */
}

.button-link:focus {
  outline: 3px solid #60a5fa;
  outline-offset: 2px;
}

/* React accessible link component */
const AccessibleLink = ({ href, children, external }) => (
  <a
    href={href}
    className="underline text-blue-700 hover:text-blue-900 focus:outline-2 focus:outline-blue-500 focus:bg-blue-50 rounded"
    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
  >
    {children}
    {external && <span className="ml-1 text-sm" aria-hidden="true">↗</span>}
  </a>
);

/* Navigation links with underline on active */
nav a {
  color: #374151;
  text-decoration: none;
  padding: 8px 16px;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

nav a:hover {
  color: #111827;
  border-bottom-color: #6b7280;
  background: #f3f4f6;
}

nav a.active {
  color: #1e40af;
  border-bottom-color: #2563eb;
  font-weight: 600;
}

/* Breadcrumb links with separators */
.breadcrumb {
  display: flex;
  gap: 12px;
  align-items: center;
}

.breadcrumb a {
  color: #2563eb;
  text-decoration: underline;
}

.breadcrumb a::after {
  content: "›";
  margin-left: 12px;
  color: #9ca3af;
  text-decoration: none;
}

.breadcrumb a:last-child::after {
  display: none;
}

.breadcrumb .current {
  color: #111827;
  font-weight: 600;
  text-decoration: none;
}`
    }
  ],

  howToUse: {
    title: "How to Use This Colorblind Simulator",
    content: `This colorblind simulator helps test designs for accessibility across different color vision deficiencies. Upload images, select colorblindness types, and identify accessibility issues before deployment.

### Uploading Your Design

Upload screenshots, interface mockups, data visualizations, or any visual content to test. Supported formats: PNG, JPG, SVG, WebP. Drag and drop or click to browse files.

For web pages, take full-page screenshots using browser developer tools or screenshot extensions. Capture all states: default, hover, focus, error, success.

For data visualizations, export charts as images from your visualization tools (Chart.js, D3.js, Tableau, etc.). Test at actual display size for accurate assessment.

### Selecting Color Blindness Types

**Protanopia (Red-Blind):** Most common red-green deficiency. Red appears dark or brown. Test this type first - covers majority of CVD users.

**Deuteranopia (Green-Blind):** Another common red-green deficiency. Green appears tan/brown. Very similar to protanopia in practical effects.

**Tritanopia (Blue-Blind):** Rare blue-yellow deficiency. Blue appears green, yellow appears pink/violet. Less common but worth testing for comprehensive coverage.

**Achromatopsia (Grayscale):** Complete color blindness. Shows how design works with zero color information. Extreme test for color independence.

Toggle between types to see how each vision deficiency affects your design. Most critical tests: protanopia and deuteranopia (covers ~99% of CVD users).

### Comparing Original vs Simulation

View side-by-side comparison of original design and colorblind simulation. Use slider to overlay simulations on original for precise comparison.

Look for elements that "disappear" or become indistinguishable in simulation:
- Links that blend with surrounding text
- Status indicators that lose distinction
- Chart series that become identical
- Form validation states that aren't visible
- Navigation elements that lose emphasis

### Identifying Accessibility Issues

**Color-Coded Information:** Any element using color as the only differentiator fails accessibility. Examples: red/green status dots, color-coded categories without labels, traffic light indicators.

**Insufficient Contrast:** Elements with same luminance but different hue (e.g., bright red vs bright green) become identical to colorblind users. Ensure brightness differences exist.

**Link Distinction:** Links must be underlined or have sufficient luminance contrast with surrounding text. Don't rely on color alone.

**Form Validation:** Error states must include icons, text descriptions, or other non-color indicators. Red borders alone fail accessibility.

**Data Visualization:** Chart series must be distinguishable through patterns, shapes, labels, or line styles - not just color.

### Fixing Identified Issues

**Add Icons:** Supplement color with semantic icons (✓ for success, ✖ for error, ⚠ for warning).

**Include Text Labels:** Add text descriptions alongside color coding. "Status: Active" instead of just green dot.

**Use Patterns:** Add hatching, dots, or stripes to differentiate chart elements beyond color.

**Ensure Luminance Contrast:** Use darker and lighter shades, not just different hues. Dark blue vs light blue works; red vs green at same brightness doesn't.

**Underline Links:** Always underline links or provide other non-color distinction.

**Use Accessible Palettes:** Switch to colorblind-safe color schemes (blue-orange, purple-green, Okabe-Ito palette).

### Testing Workflow

1. Upload design or screenshot
2. Test with protanopia and deuteranopia (covers most CVD users)
3. Identify problem areas where information is lost
4. Fix issues by adding non-color indicators
5. Re-test with simulator to verify fixes
6. Test with tritanopia for comprehensive coverage
7. Validate with actual colorblind users when possible

### Beyond Simulation

Simulators are helpful but not perfect. Real colorblind users may have different experiences than simulations predict. Combine simulation with:

- WCAG contrast checkers for luminance verification
- User testing with actual colorblind participants
- Automated accessibility audits (axe, Lighthouse)
- Manual WCAG Success Criterion 1.4.1 review

### Exporting Results

Download simulated images to share with stakeholders or document accessibility issues. Include in design handoffs or accessibility reports.

Create before/after comparisons showing original design and colorblind simulation side-by-side for team education.`,
    steps: [
      {
        name: "Upload Design",
        text: "Upload your interface screenshot, data visualization, or visual content to test. Supported formats: PNG, JPG, SVG, WebP. Drag and drop or browse files.",
      },
      {
        name: "Select CVD Type",
        text: "Choose color blindness type: Protanopia (red-blind), Deuteranopia (green-blind), Tritanopia (blue-blind), or Achromatopsia (grayscale). Test protanopia and deuteranopia first for maximum coverage.",
      },
      {
        name: "Compare Views",
        text: "View side-by-side comparison of original and simulated design. Use slider overlay to identify problem areas. Look for elements that lose distinction or disappear.",
      },
      {
        name: "Fix Issues",
        text: "Add icons, text labels, patterns, or sufficient luminance contrast to elements that fail colorblind simulation. Re-test to verify accessibility improvements.",
      }
    ]
  },

  faqs: [
    {
      question: "What percentage of users are colorblind?",
      answer: "Approximately 8% of men and 0.5% of women have some form of color vision deficiency (CVD), totaling about 300 million people globally. The most common type is red-green colorblindness (protanopia and deuteranopia), affecting ~6-8% of males. Blue-yellow colorblindness (tritanopia) is much rarer (~0.001%). Complete colorblindness (achromatopsia) affects ~0.003%. Testing for protanopia and deuteranopia covers ~99% of colorblind users."
    },
    {
      question: "What is the most common type of colorblindness?",
      answer: "Deuteranomaly (reduced green sensitivity) is the most common, affecting ~5% of males. Deuteranopia (complete green-blindness) and protanopia (red-blindness) are less common but more severe, each affecting ~1% of males. Protanomaly (reduced red sensitivity) affects ~1% of males. All these red-green deficiencies cause similar practical problems: difficulty distinguishing reds, greens, browns, and oranges."
    },
    {
      question: "How do I make my website colorblind accessible?",
      answer: "Follow WCAG Success Criterion 1.4.1: Never use color as the only visual means of conveying information. Add text labels to status indicators, underline links, include icons with color-coded states, use patterns in charts, ensure sufficient luminance contrast (not just hue differences), and use colorblind-safe palettes (blue-orange, purple-green, Okabe-Ito). Test with simulators and real colorblind users."
    },
    {
      question: "What colors are safe for colorblind users?",
      answer: "Blue-orange combinations are safe for all CVD types. Purple-green (not red-green) works well. The Okabe-Ito palette (8 colors including blue, orange, bluish green, yellow, vermillion) is scientifically designed for colorblind accessibility. Viridis, Plasma, and Inferno color maps are CVD-safe. Avoid red-green, green-brown, green-blue (for tritanopes), and red-black combinations. Ensure sufficient luminance contrast regardless of hue."
    },
    {
      question: "Can colorblind people see any colors?",
      answer: "Yes, most colorblind people see colors - just differently. Protanopes and deuteranopes see blues and yellows clearly but struggle with reds and greens, which appear as browns or tans. Tritanopes see reds clearly but confuse blues and greens. Only people with achromatopsia (extremely rare, ~0.003%) see no color at all - only grayscale. 'Colorblind' is a misnomer; 'color vision deficiency' is more accurate."
    },
    {
      question: "Are red-green color combinations always bad for accessibility?",
      answer: "Not always, but they're risky. If red and green have very different luminance (brightness), colorblind users can distinguish them in grayscale. Dark green vs light red works better than bright red vs bright green. However, it's safer to avoid red-green entirely and use blue-orange or purple-green instead. Never use red-green as the only differentiator - always add icons, text, or patterns."
    },
    {
      question: "How accurate are colorblind simulators?",
      answer: "Simulators provide reasonable approximations based on mathematical models of cone deficiencies, but they're not perfect. Individual experiences vary - two people with the same CVD type may perceive colors slightly differently. Simulators don't account for cognitive adaptation (how brains compensate over time). Use simulators as helpful tools for identifying obvious issues, but combine with actual colorblind user testing for validation."
    },
    {
      question: "Do I need to test for all types of colorblindness?",
      answer: "Testing protanopia and deuteranopia (red-green deficiencies) covers ~99% of colorblind users and should be your priority. Tritanopia testing adds comprehensive coverage but affects far fewer users (~0.001%). Achromatopsia (grayscale) is valuable as an extreme test - if design works in grayscale, it's very accessible. For most projects, thorough protanopia and deuteranopia testing is sufficient."
    },
    {
      question: "What's the difference between protanopia and deuteranopia?",
      answer: "Protanopia is red-blindness (missing red cones), deuteranopia is green-blindness (missing green cones). In practice, they cause very similar problems: both create red-green confusion, difficulty with traffic lights, and problems distinguishing reds, greens, browns, and oranges. Protanopes see red as darker/brownish, deuteranopes see green as tan/brown. For accessibility purposes, fixing issues for one typically fixes for both."
    },
    {
      question: "Is my uploaded image data private when using this simulator?",
      answer: "Yes. All colorblind simulation happens client-side in your browser using JavaScript color transformation algorithms. No images are uploaded to servers. No backend processing. The tool works offline after initial load. Safe for testing confidential designs or client work. Inspect browser DevTools Network tab - zero image uploads."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your design images never leave your browser. This colorblind simulator operates entirely client-side using JavaScript color transformation algorithms. There are no image uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All colorblind simulations use browser-based color transformations. Images stay in your device's memory.
- **No Server Uploads:** We don't have servers to process your images. The tool works completely offline after first load.
- **No Data Storage:** Your images and designs are not saved anywhere. They exist only in your browser session.
- **No Analytics Tracking:** We don't track which images you simulate or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your image data.

This makes the tool safe for testing proprietary designs, client work, confidential interfaces, or unreleased products. Use with confidence for commercial projects and sensitive visual content.`,
  },

  stats: {
    "CVD Types": "7+",
    "Global CVD Users": "300M+",
    "Male CVD Rate": "8%",
    "Client-Side": "100%",
    "Server Uploads": "0"
  }
};
