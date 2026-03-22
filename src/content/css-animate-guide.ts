/**
 * CSS Animation Generator Tool Guide Content
 * Comprehensive developer guide for CSS animation creation
 */

import type { ToolGuideContent } from "./types";

export const cssAnimateGuideContent: ToolGuideContent = {
  toolName: "CSS Animation Generator",
  toolPath: "/css-animate",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Animation Type",
      description: "Choose from preset animations (fade, slide, bounce, rotate, scale, pulse, shake, flip) or create custom keyframe animations. Presets provide production-ready starting points."
    },
    {
      title: "Adjust Timing Parameters",
      description: "Configure duration (speed), delay (wait before start), iteration count (repeat), and direction (normal/reverse/alternate). Fine-tune animation behavior with easing functions."
    },
    {
      title: "Preview Animation in Real-Time",
      description: "Watch your animation play on a preview element. Test different timing curves and durations to achieve desired motion feel. Replay animation to verify behavior."
    },
    {
      title: "Copy CSS Animation Code",
      description: "Click copy to get complete CSS including @keyframes rule and animation properties. Production-ready code for immediate integration into stylesheets."
    }
  ],

  introduction: {
    title: "What is a CSS Animation Generator?",
    content: `A CSS animation generator is a visual tool for creating CSS animations and keyframes without manual coding. CSS animations enable smooth, performant motion on web pages - from subtle hover effects to complex loading sequences. Generators eliminate the trial-and-error of keyframe timing, providing instant previews and production-ready code.

CSS animations use @keyframes to define motion stages and animation properties to control playback. Unlike JavaScript-based animations, CSS animations are GPU-accelerated for 60fps performance, battery efficient on mobile, and declarative - simplifying maintenance and reducing JavaScript bundle size.

### Why Developers Need CSS Animation Generators

Modern web interfaces expect smooth motion for user feedback and visual polish. Button hover effects, loading spinners, page transitions, notification slides - all rely on well-crafted animations. Hand-coding keyframes is time-consuming and error-prone.

Animation generators provide instant visual feedback for timing adjustments. Changing duration from 0.3s to 0.5s shows immediate effect - critical for achieving natural motion feel. Timing curves (easing functions) dramatically affect perception; generators let you test ease-in, ease-out, or custom cubic-bezier curves interactively.

Complex multi-stage animations (fade in, pause, slide, fade out) require precise keyframe percentages. Generators handle the math, letting you focus on design intent rather than calculation. Export complete @keyframes with animation shorthand ready for production.

Performance optimization is automatic. Generators prioritize transform and opacity properties that trigger GPU acceleration, avoiding expensive properties like width or height that cause layout recalculation. Generated code follows CSS animation best practices.

### CSS Animation Syntax

**Basic Animation:** Define @keyframes and apply with animation property.

\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 0.5s ease-in;
}
\`\`\`

**Animation Shorthand:** animation: name duration timing-function delay iteration-count direction fill-mode;

Example: animation: slideIn 0.3s ease-out 0.1s 1 normal forwards;

**Keyframe Percentages:** Define motion at specific progress points.

\`\`\`css
@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}
\`\`\`

**Multiple Properties:** Animate multiple CSS properties simultaneously.

\`\`\`css
@keyframes appear {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
\`\`\`

### Animation Properties Explained

**animation-name:** References the @keyframes rule to use.

**animation-duration:** How long the animation takes (e.g., 0.3s, 500ms). Shorter = faster.

**animation-timing-function:** Easing curve controlling acceleration/deceleration:
- linear: Constant speed
- ease: Slow start, fast middle, slow end
- ease-in: Slow start, accelerates
- ease-out: Fast start, decelerates
- ease-in-out: Slow start and end
- cubic-bezier(): Custom curve

**animation-delay:** Wait time before animation starts (e.g., 0.2s).

**animation-iteration-count:** How many times to repeat (1, 3, infinite).

**animation-direction:** Playback direction:
- normal: Forward each iteration
- reverse: Backward each iteration
- alternate: Forward then backward
- alternate-reverse: Backward then forward

**animation-fill-mode:** Element state before/after animation:
- none: No styles applied outside animation
- forwards: Retain final keyframe styles
- backwards: Apply first keyframe styles during delay
- both: Apply both forwards and backwards

**animation-play-state:** Control playback (running, paused). Useful for pause on hover.

### Common Animation Patterns

**Fade In:** Smooth opacity transition from invisible to visible.

\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
\`\`\`

**Slide In:** Element enters from off-screen.

\`\`\`css
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
\`\`\`

**Bounce:** Elastic motion for emphasis.

\`\`\`css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
\`\`\`

**Pulse:** Scale animation for attention-grabbing.

\`\`\`css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
\`\`\`

**Spin:** Continuous rotation for loading indicators.

\`\`\`css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
\`\`\`

**Shake:** Horizontal vibration for error feedback.

\`\`\`css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}
\`\`\`

### Performance Best Practices

**Animate transform and opacity only:** These properties are GPU-accelerated for 60fps performance. Avoid animating width, height, top, left, margin, padding - these trigger expensive layout recalculation.

**Use will-change sparingly:** will-change: transform; hints browsers to optimize for animation. Only apply to actively animating elements to avoid memory overhead.

**Prefer shorter durations:** Animations under 0.5s feel snappy. Longer animations (> 1s) risk user impatience. Exception: ambient animations (floating elements) can be slower.

**Limit simultaneous animations:** Too many concurrent animations cause frame drops. Stagger animations with animation-delay for sequential motion.

**Test on low-end devices:** Animations smooth on desktop may stutter on mobile. Reduce complexity or disable animations on low-power devices using prefers-reduced-motion.

### Accessibility: Respecting Motion Preferences

Some users experience nausea or disorientation from animations. CSS provides prefers-reduced-motion media query to disable or minimize motion for accessibility.

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

Always include prefers-reduced-motion handling in production code. Respect user preferences for inclusive design.

### Browser Compatibility

CSS animations have universal support: Chrome 43+, Firefox 16+, Safari 9+, Edge 12+. No vendor prefixes needed for modern browsers (2015+).

Older browsers (IE9 and below) don't support CSS animations. Elements display in final state without motion - graceful degradation. Layouts function correctly without animation enhancement.`,
  },

  useCases: [
    {
      title: "Button Hover Animations",
      description: "Add interactive feedback to buttons with hover animations. Subtle scale, lift, or color transitions improve perceived responsiveness and encourage interaction. Animations confirm clickability and enhance user experience.",
      example: `/* Scale up on hover with ease-out */
.button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

/* Lift effect with translateY */
.button-lift {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.button-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Pulse animation on hover */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.button-pulse:hover {
  animation: pulse 0.6s ease-in-out infinite;
}

/* Shimmer effect for CTA buttons */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.button-shimmer {
  background: linear-gradient(
    90deg,
    #667eea 0%,
    #764ba2 50%,
    #667eea 100%
  );
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}

/* Bounce effect for playful buttons */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.button-bounce:hover {
  animation: bounce 0.5s ease-in-out;
}

/* Rotate icon inside button on hover */
.button-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.button-with-icon svg {
  transition: transform 0.3s ease-out;
}

.button-with-icon:hover svg {
  transform: rotate(90deg);
}

/* React button with animation variants */
const AnimatedButton = ({ children, variant = "scale" }) => {
  const variantClasses = {
    scale: "hover:scale-105 transition-transform duration-200",
    lift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
    pulse: "hover:animate-pulse"
  };

  return (
    <button className={\`bg-blue-600 text-white px-6 py-3 rounded-lg \${variantClasses[variant]}\`}>
      {children}
    </button>
  );
};

/* Tailwind button animations */
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 transition-transform duration-200">
  Scale Button
</button>

<button class="bg-purple-600 text-white px-6 py-3 rounded-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
  Lift Button
</button>

/* Glow effect on hover */
@keyframes glow {
  from {
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
  to {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.8),
                0 0 30px rgba(102, 126, 234, 0.6);
  }
}

.button-glow:hover {
  animation: glow 0.5s ease-in-out forwards;
}`
    },
    {
      title: "Loading Spinners and Progress Indicators",
      description: "Create smooth loading animations to indicate background processing. Spinners, pulsing dots, and progress bars use CSS animations for 60fps performance without JavaScript overhead. Essential for async operations and data fetching.",
      example: `/* Classic spinning loader */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Pulsing dots loader */
@keyframes pulse-dot {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.dots-loader {
  display: flex;
  gap: 8px;
}

.dots-loader span {
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  animation: pulse-dot 1.4s ease-in-out infinite;
}

.dots-loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots-loader span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Skeleton loading animation */
@keyframes shimmer-skeleton {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 400px 100%;
  animation: shimmer-skeleton 1.5s ease-in-out infinite;
  border-radius: 4px;
}

.skeleton-text {
  height: 16px;
  width: 100%;
  margin-bottom: 8px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

/* Progress bar animation */
@keyframes progress {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

.progress-bar-container {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  overflow: hidden;
}

.progress-bar {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    #667eea,
    transparent
  );
  animation: progress 1.5s ease-in-out infinite;
}

/* Bouncing loader */
@keyframes bounce-loader {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.bounce-loader {
  display: flex;
  gap: 8px;
}

.bounce-loader span {
  width: 16px;
  height: 16px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce-loader 1.4s ease-in-out infinite;
}

.bounce-loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.bounce-loader span:nth-child(3) {
  animation-delay: 0.4s;
}

/* React loading component */
const Loader = ({ type = "spinner" }) => {
  if (type === "spinner") {
    return (
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    );
  }

  if (type === "dots") {
    return (
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-200" />
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-400" />
      </div>
    );
  }

  return null;
};

/* Circular progress with SVG */
@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.circular-loader circle {
  animation: dash 1.5s ease-in-out infinite;
}

/* Tailwind spinner */
<div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>`
    },
    {
      title: "Page and Element Entrance Animations",
      description: "Animate elements as they enter the viewport or page load. Fade-in, slide-in, and scale-in effects create polished user experiences. Stagger animations for lists or grids add visual interest without overwhelming users.",
      example: `/* Fade in on page load */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Slide in from bottom */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-up {
  animation: slideInUp 0.5s ease-out;
}

/* Slide in from right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-right {
  animation: slideInRight 0.5s ease-out;
}

/* Scale and fade in */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.4s ease-out;
}

/* Staggered list item animations */
.list-item {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

.list-item:nth-child(1) { animation-delay: 0.1s; }
.list-item:nth-child(2) { animation-delay: 0.2s; }
.list-item:nth-child(3) { animation-delay: 0.3s; }
.list-item:nth-child(4) { animation-delay: 0.4s; }
.list-item:nth-child(5) { animation-delay: 0.5s; }

/* General nth-child stagger */
.stagger-item {
  opacity: 0;
  animation: slideInUp 0.5s ease-out forwards;
}

.stagger-item:nth-child(n) {
  animation-delay: calc(0.1s * var(--item-index));
}

/* Reveal on scroll with Intersection Observer */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* JavaScript for scroll-triggered animations */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* React component with entrance animation */
const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <div
      className="opacity-0 animate-fadeIn"
      style={{ animationDelay: \`\${delay}ms\` }}
    >
      {children}
    </div>
  );
};

/* Usage with stagger */
<div>
  <AnimatedCard delay={0}>Card 1</AnimatedCard>
  <AnimatedCard delay={100}>Card 2</AnimatedCard>
  <AnimatedCard delay={200}>Card 3</AnimatedCard>
</div>

/* Bounce entrance for attention */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-in {
  animation: bounceIn 0.6s ease-out;
}

/* Flip entrance */
@keyframes flipIn {
  from {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
  }
  to {
    opacity: 1;
    transform: perspective(400px) rotateX(0);
  }
}

.flip-in {
  animation: flipIn 0.6s ease-out;
}

/* Tailwind entrance animations */
<div class="animate-fadeIn">Fade in content</div>
<div class="animate-slideInUp delay-100">Slide up content</div>
<div class="animate-scaleIn delay-200">Scale in content</div>`
    },
    {
      title: "Notification and Toast Animations",
      description: "Animate toast notifications and alerts with entrance, exit, and attention-grabbing effects. Slide-in from edge, fade-in with scale, and auto-dismiss animations create polished notification systems.",
      example: `/* Toast slide in from top-right */
@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideInFromRight 0.3s ease-out;
}

.toast.toast-exit {
  animation: slideOutToRight 0.3s ease-in forwards;
}

/* Toast slide up from bottom */
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast-bottom {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: slideInFromBottom 0.4s ease-out;
}

/* Fade and scale toast */
@keyframes toastAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes toastDisappear {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

.toast-scale {
  animation: toastAppear 0.3s ease-out;
}

.toast-scale.exit {
  animation: toastDisappear 0.3s ease-in forwards;
}

/* Progress bar for auto-dismiss */
@keyframes toastProgress {
  from { width: 100%; }
  to { width: 0%; }
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #667eea;
  animation: toastProgress 5s linear;
}

/* Shake animation for error toasts */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.toast-error {
  animation: slideInFromRight 0.3s ease-out, shake 0.5s ease-in-out 0.3s;
}

/* React toast component */
const Toast = ({ message, type = "info", onClose }) => {
  const [isExiting, setIsExiting] = React.useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  React.useEffect(() => {
    const timer = setTimeout(handleClose, 5000);
    return () => clearTimeout(timer);
  }, []);

  const typeClasses = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800"
  };

  return (
    <div
      className={\`fixed top-4 right-4 px-6 py-4 rounded-lg border-2 shadow-lg transition-all duration-300 \${typeClasses[type]} \${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}\`}
    >
      <div className="flex items-center gap-3">
        <p>{message}</p>
        <button onClick={handleClose} className="text-lg font-bold">×</button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-30 animate-toastProgress" />
    </div>
  );
};

/* Notification stack animations */
.notification-stack {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.notification-stack > * {
  pointer-events: auto;
}

/* Tailwind toast example */
<div class="fixed top-4 right-4 bg-white px-6 py-4 rounded-lg shadow-xl border border-gray-200 animate-slideInRight">
  <p class="font-medium text-gray-900">Notification message</p>
</div>

/* Alert with bounce attention */
@keyframes alertBounce {
  0%, 100% { transform: scale(1); }
  10%, 30% { transform: scale(0.95); }
  20%, 40% { transform: scale(1.05); }
}

.alert-important {
  animation: slideInFromTop 0.3s ease-out, alertBounce 0.6s ease-in-out 0.3s;
}`
    }
  ],

  howToUse: {
    title: "How to Use This CSS Animation Generator",
    content: `This CSS animation generator provides visual controls for creating CSS animations with real-time preview. Select animation types, adjust timing parameters, preview motion, and copy production-ready code.

### Selecting Animation Type

Browse preset animations or create custom keyframes:
- **Fade:** Opacity transitions (in, out, in-out)
- **Slide:** Translate motion (up, down, left, right)
- **Scale:** Size transitions (in, out, pulse)
- **Rotate:** Rotation animations (spin, flip)
- **Bounce:** Elastic motion effects
- **Shake:** Vibration for attention/errors
- **Custom:** Define your own @keyframes

Click a preset to apply default settings. Presets provide production-ready starting points that you can customize.

### Adjusting Duration and Timing

**Duration:** Control animation speed with duration slider (0.1s to 5s). Shorter durations (0.2-0.5s) feel snappy and responsive. Longer durations (1-3s) work for ambient animations or loading states.

**Delay:** Set wait time before animation starts (0s to 2s). Useful for staggered animations where elements animate sequentially rather than simultaneously.

**Timing Function (Easing):** Select acceleration curve:
- **Linear:** Constant speed, mechanical feel
- **Ease:** Natural motion, slow start/end
- **Ease-In:** Accelerates from slow start
- **Ease-Out:** Decelerates to slow end (best for entrances)
- **Ease-In-Out:** Slow start and end (best for transitions)
- **Cubic-Bezier:** Custom curve for precise control

Test different timing functions - they dramatically affect motion feel. Ease-out feels natural for most UI animations.

### Iteration and Direction

**Iteration Count:** How many times animation repeats:
- **1:** Play once (default for entrances/exits)
- **2-10:** Specific repeat count
- **Infinite:** Loop continuously (spinners, ambient effects)

**Direction:** Control playback direction:
- **Normal:** Forward each iteration
- **Reverse:** Backward each iteration
- **Alternate:** Forward then backward (yoyo effect)
- **Alternate-Reverse:** Backward then forward

Alternate direction creates seamless loops for pulse or bounce effects.

### Fill Mode Configuration

**Fill Mode:** Control element state before/after animation:
- **None:** No styles applied outside animation timeframe
- **Forwards:** Retain final keyframe state (entrance animations)
- **Backwards:** Apply first keyframe during delay
- **Both:** Apply both forwards and backwards

Use forwards for entrance animations so elements stay visible after animating in. Use none for repeating animations to avoid conflicts.

### Preview and Testing

Watch your animation play on the preview element. Click "Replay" to watch again. Toggle preview size to test animation scaling on different element dimensions.

Adjust parameters while watching preview to fine-tune motion feel. Small timing changes have big perceptual impact - iterate until motion feels natural.

### Copying CSS Code

Click "Copy CSS" to get complete animation code including:
- **@keyframes rule:** Defines animation stages
- **Animation property:** Applies animation to element

Code format options:
- **Shorthand:** Compact animation property
- **Longhand:** Separate animation-* properties for clarity

Paste directly into your stylesheet. Adjust selector (.element) to match your component class or ID.

### Performance Optimization

Generator prioritizes performant properties:
- **Transform:** GPU-accelerated, 60fps
- **Opacity:** GPU-accelerated, smooth
- **Avoid:** width, height, top, left (cause layout recalculation)

Generated code follows best practices for smooth animations on all devices.

### Accessibility: Motion Preferences

Always include motion preference handling in production:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
\`\`\`

This respects user preferences who experience discomfort from motion. Generator code includes this by default.

### Integration with Frameworks

**React:** Copy animation CSS to global stylesheet or CSS module. Apply animation class to components.

**Tailwind:** Configure custom animations in tailwind.config.js:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out'
      }
    }
  }
}
\`\`\`

**Vue/Svelte:** Add CSS to component style blocks or global styles.

### Testing Across Browsers

Preview animations in multiple browsers to ensure consistent behavior. Modern browsers have excellent CSS animation support, but timing may vary slightly.

Test on mobile devices to verify performance. Reduce complexity or duration if animations stutter on lower-powered devices.`,
    steps: [
      {
        name: "Select Animation Type",
        text: "Choose from preset animations (fade, slide, bounce, rotate, scale, pulse, shake) or create custom keyframes. Presets provide professional starting points for common animation patterns."
      },
      {
        name: "Adjust Timing Parameters",
        text: "Configure duration (0.2-3s typical), delay, easing function (ease-out recommended), iteration count (1 or infinite), direction (normal/alternate), and fill mode (forwards for entrances)."
      },
      {
        name: "Preview Animation",
        text: "Watch animation play in real-time preview. Click replay to watch again. Adjust parameters until motion feels natural and performant. Test different timing functions."
      },
      {
        name: "Copy CSS Code",
        text: "Click Copy to get complete CSS including @keyframes and animation properties. Choose shorthand or longhand format. Paste into stylesheet and adjust selector."
      }
    ]
  },

  faqs: [
    {
      question: "What animation duration should I use for UI elements?",
      answer: "0.2-0.5s for most UI interactions (button hovers, dropdowns, tooltips). Shorter feels snappier and responsive. 0.5-1s for page transitions and modals. 1-3s for loading animations or ambient effects. Avoid durations over 1s for interactive elements - users perceive delays. Test and adjust based on motion feel."
    },
    {
      question: "What's the difference between transition and animation in CSS?",
      answer: "Transitions animate between two states (A to B) triggered by state changes like :hover. Animations use @keyframes for multi-stage motion with precise control over intermediate states. Use transitions for simple hover effects, animations for complex motion sequences, loading states, or continuous effects like spinners."
    },
    {
      question: "Which easing function should I use for animations?",
      answer: "ease-out for most UI animations - elements enter quickly then decelerate naturally. ease-in for exits - elements start slow then accelerate out. ease-in-out for transitions between states. linear for continuous motion like spinners. Avoid linear for interactive animations - feels mechanical. ease-out is safest default for natural motion feel."
    },
    {
      question: "How do I animate elements on scroll?",
      answer: "Use Intersection Observer API to detect when elements enter viewport, then add animation class with CSS. Observer watches scroll position efficiently. Apply animation class when element becomes visible: element.classList.add('animate-in'). CSS handles the actual animation. This approach is performant and avoids scroll event listeners."
    },
    {
      question: "Why should I avoid animating width, height, or margin?",
      answer: "These properties trigger layout recalculation (reflow) - browser must recalculate positions of all affected elements. Expensive operation that causes jank and dropped frames. Instead, use transform: scale() for size changes, transform: translate() for position changes. Transform and opacity are GPU-accelerated for 60fps smooth performance."
    },
    {
      question: "What is animation fill-mode forwards?",
      answer: "fill-mode: forwards makes the element retain the styles from the final keyframe after animation completes. Essential for entrance animations - element stays visible after fading/sliding in. Without forwards, element snaps back to original state after animation ends. Use forwards for entrances, none for repeating animations."
    },
    {
      question: "How do I create staggered animations for lists?",
      answer: "Use animation-delay with nth-child selectors: .item:nth-child(1) { animation-delay: 0.1s; } .item:nth-child(2) { animation-delay: 0.2s; }. Or use CSS custom properties: animation-delay: calc(0.1s * var(--index)). Set --index on each item. Creates sequential reveal effect. Keep delays short (0.05-0.1s) to avoid excessive total time."
    },
    {
      question: "What is prefers-reduced-motion and why use it?",
      answer: "prefers-reduced-motion is a CSS media query detecting user OS-level motion preference. Some users experience nausea or disorientation from animations. Respect this preference by disabling or minimizing animations: @media (prefers-reduced-motion: reduce) { animation: none; }. Required for accessibility compliance and inclusive design. Always include in production code."
    },
    {
      question: "Can I animate SVG elements with CSS animations?",
      answer: "Yes. Apply CSS animations to SVG elements using class names or IDs. Animate transform, opacity, fill, stroke properties. SVG transforms use different syntax (SVG units) but CSS animations work. Common use: spinning SVG loaders, animated icons, morphing shapes. GPU-accelerated like HTML animations for smooth performance."
    },
    {
      question: "Is my animation design private when using this tool?",
      answer: "Yes. All animation generation happens client-side in your browser. No keyframes, timing parameters, or CSS code are sent to servers. No tracking, no storage. Safe for proprietary animations or client work. The tool works offline after initial load. Inspect DevTools Network tab - zero outbound requests with your animation data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your animation designs never leave your browser. This generator operates entirely client-side using JavaScript and CSS. There are no server uploads, no backend processing, and no data transmission.

### Privacy Guarantees

- **100% Client-Side Processing:** All animation generation, keyframe creation, and CSS code compilation happen in your browser's JavaScript engine.
- **No Server Uploads:** We don't have servers to process your animations. The tool works completely offline after first load.
- **No Data Storage:** Your animation parameters, keyframes, and timing values are not saved on our servers. Browser localStorage used only for local presets if you save them.
- **No Analytics Tracking:** We don't track which animations you create or how often you use the tool.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests containing your animation data.

This makes the tool safe for creating animations for proprietary interfaces, client-specific designs, or confidential projects. Use with confidence for commercial work.`
  },

  stats: {
    "Animation Types": "15+",
    "Timing Functions": "8+",
    "Browser Support": "99%+",
    "Export Formats": "CSS",
    "Server Uploads": "0"
  }
};
