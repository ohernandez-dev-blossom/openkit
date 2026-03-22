/**
 * JavaScript KeyCode Tool Guide Content
 * Comprehensive developer guide for keyboard events
 */

import type { ToolGuideContent } from "./types";

export const keycodeGuideContent: ToolGuideContent = {
  toolName: "JavaScript KeyCode",
  toolPath: "/keycode",
  lastUpdated: "2026-02-05",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Focus the Page",
      description: "Click anywhere on the page to ensure it has focus. The tool listens for keyboard events on the entire window."
    },
    {
      title: "Press Any Key",
      description: "Press any key on your keyboard. The tool will instantly display all event properties including key, code, keyCode, which, and charCode."
    },
    {
      title: "View Event Data",
      description: "See the key value, physical key code, deprecated keyCode, and modifier keys (Ctrl, Shift, Alt, Meta) all in one view."
    },
    {
      title: "Copy Code Snippet",
      description: "Use the generated JavaScript code snippet as a starting point for implementing keyboard event handlers in your applications."
    }
  ],

  introduction: {
    title: "What are JavaScript Keyboard Events?",
    content: `JavaScript keyboard events allow web applications to respond to user input from keyboards. Every key press triggers events containing detailed information about which key was pressed, its physical location, modifier states, and more. Understanding these events is essential for building accessible, keyboard-navigable web applications.

The keyboard event model has evolved significantly. Early JavaScript relied on keyCode and which properties, which were inconsistent across browsers and platforms. Modern JavaScript uses the key and code properties from the DOM Level 3 Events specification, providing reliable, cross-browser keyboard event handling.

### Event Types

**keydown:** Fires when a key is pressed down. This is the first event in the sequence and fires repeatedly if the key is held down. Use this for detecting modifier combinations and preventing default browser behavior.

**keypress:** (Deprecated) Historically fired for character keys after keydown. This event is deprecated and should not be used in modern applications. Use keydown or beforeinput instead.

**keyup:** Fires when a key is released. Use this when you need to detect the end of a key press or when measuring how long a key was held down.

### Modern vs Legacy Properties

**event.key (Modern):** Returns the character value of the key pressed. For printable keys, this is the actual character ("a", "A", "1", "!"). For non-printable keys, it describes the key ("Enter", "Tab", "ArrowUp", "Escape"). This is the recommended property for new code.

**event.code (Modern):** Returns the physical key location on the keyboard, independent of keyboard layout. "KeyA" always refers to the A key position, regardless of whether it produces "a" or "q" on different layouts. Use this for game controls or when physical position matters more than character value.

**event.keyCode (Legacy):** Numeric code representing the key. Deprecated but widely supported. Values vary between browsers for some keys. Avoid in new code.

**event.which (Legacy):** Similar to keyCode, also deprecated. jQuery normalized this property, which is why many legacy codebases use it.

### Keyboard Layout Considerations

Different keyboard layouts (QWERTY, AZERTY, QWERTZ, Dvorak) produce different characters from the same physical keys. The key property reflects the actual character, while code reflects the physical position.

For example, pressing the top-left letter key:
- US QWERTY: key="q", code="KeyQ"
- French AZERTY: key="a", code="KeyQ"
- German QWERTZ: key="q", code="KeyQ"

Use code for game controls where WASD should always map to the same physical positions. Use key for text input where you care about the character being typed.`
  },

  useCases: [
    {
      title: "Implement Keyboard Shortcuts",
      description: "Add keyboard shortcuts to your web application for power users. Detect Ctrl+S for save, Ctrl+K for search, or custom shortcuts for your interface.",
      example: `document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + S to save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveDocument();
  }
  
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    focusSearch();
  }
});`
    },
    {
      title: "Build Accessible Navigation",
      description: "Implement keyboard navigation for complex components like dropdowns, modals, and data grids. Support arrow keys, Escape, Enter, and Tab navigation.",
      example: `// Modal keyboard handling
document.addEventListener('keydown', (e) => {
  if (!modalOpen) return;
  
  switch (e.key) {
    case 'Escape':
      closeModal();
      break;
    case 'Tab':
      // Trap focus within modal
      handleTabNavigation(e);
      break;
  }
});`
    },
    {
      title: "Game Controls Implementation",
      description: "Use event.code for game controls to ensure consistent physical key positions regardless of keyboard layout. WASD controls should feel the same on QWERTY and AZERTY keyboards.",
      example: `// Game controls using physical key positions
const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  
  // Movement (physical positions)
  if (e.code === 'KeyW') player.moveForward();
  if (e.code === 'KeyA') player.moveLeft();
  if (e.code === 'KeyS') player.moveBackward();
  if (e.code === 'KeyD') player.moveRight();
});`
    },
    {
      title: "Form Input Validation",
      description: "Restrict input to specific characters in form fields. Prevent non-numeric input in number fields or validate as the user types.",
      example: `// Allow only numbers in input
input.addEventListener('keydown', (e) => {
  // Allow control keys
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  
  // Allow navigation keys
  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
    return;
  }
  
  // Block non-numeric keys
  if (!/^\\d$/.test(e.key)) {
    e.preventDefault();
  }
});`
    }
  ],

  howToUse: {
    title: "How to Use This KeyCode Tool",
    content: `This interactive tool helps you explore JavaScript keyboard events in real-time. Press any key to see all event properties, then use this information to implement keyboard handling in your applications.

### Exploring Keyboard Events

Focus the page and press any key. The large display shows the key value (what character was produced) and code (physical key position). Below, you'll see all event properties including deprecated keyCode and which values for legacy code reference.

The modifier section shows which modifier keys (Ctrl, Shift, Alt, Meta/Cmd) were held down when the key was pressed. This is essential for implementing keyboard shortcuts.

### Understanding the Data

**event.key:** Use this for most cases. It gives you the actual character or key name. "a" for the A key, "Enter" for Enter, "ArrowUp" for the up arrow.

**event.code:** Use this when physical key position matters more than the character. "KeyA" is always the top-left letter key, regardless of keyboard layout.

**event.keyCode / which:** These are deprecated but shown for reference when working with legacy codebases or libraries that still use them.

**event.location:** Distinguishes between left and right modifier keys (Left Shift vs Right Shift) or numpad keys.

### Code Snippet Generation

The tool generates a JavaScript code snippet for each key pressed. Copy this as a starting point for your event handlers. The snippet shows the recommended pattern: check both key and code depending on your needs.

### History

Recent keys appear below the main display. Click any history item to view its details again. This helps compare different keys or modifier combinations.`,
    steps: [
      {
        name: "Focus the Page",
        text: "Click anywhere on the page to ensure keyboard events are captured. The tool listens globally for all key presses."
      },
      {
        name: "Press a Key",
        text: "Press any key on your keyboard. The tool displays the key value, code, and all event properties instantly."
      },
      {
        name: "Review Properties",
        text: "Examine the event properties. Note the difference between key (character) and code (physical position)."
      },
      {
        name: "Try Modifier Combinations",
        text: "Hold Ctrl, Shift, Alt, or Cmd while pressing keys. See how modifier flags change in the event data."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between key and code?",
      answer: "event.key returns the character value produced by the key press (like 'a', 'A', or 'Enter'), while event.code returns the physical key location on the keyboard (like 'KeyA' or 'Enter'). Use key for text input and code when physical position matters, like in games."
    },
    {
      question: "Should I use keyCode or which?",
      answer: "Neither - both are deprecated. Use event.key for the character value or event.code for physical key position. However, you may still encounter keyCode in legacy codebases, which is why this tool displays it for reference."
    },
    {
      question: "How do I detect modifier keys?",
      answer: "Use the boolean properties: e.ctrlKey, e.shiftKey, e.altKey, and e.metaKey (Cmd on Mac). Check these in your keydown handler to detect combinations like Ctrl+S or Cmd+C. Remember that some shortcuts like Ctrl+S have default browser behavior you'll need to prevent."
    },
    {
      question: "Why doesn't my key handler work for all keys?",
      answer: "Some keys have special browser behaviors that may interfere. Arrow keys and Space scroll the page, Tab moves focus, and shortcuts like Ctrl+W close tabs. Use e.preventDefault() to stop these behaviors, but be careful not to break expected functionality."
    },
    {
      question: "How do I handle different keyboard layouts?",
      answer: "Use event.code for physical key positions that should be consistent across layouts (game controls). Use event.key when you care about the character being typed (text input). For example, code 'KeyQ' is always the top-left letter key, but key might be 'q' or 'a' depending on layout."
    },
    {
      question: "Can I detect the numpad vs regular number keys?",
      answer: "Yes. Check event.location === 3 for numpad keys. Alternatively, event.code will be 'Numpad1' through 'Numpad9' for numpad numbers, versus 'Digit1' through 'Digit9' for the top row number keys."
    },
    {
      question: "How do I handle key repeat?",
      answer: "Check event.repeat which is true when a key is being held down and firing repeated keydown events. This is useful for preventing rapid-fire actions or implementing continuous movement in games."
    },
    {
      question: "Why don't key events fire on some elements?",
      answer: "Keyboard events fire on the focused element. For global shortcuts, add listeners to window or document. For specific inputs, ensure the element is focusable (inputs, buttons, or elements with tabindex). Non-focusable elements like divs won't receive keyboard events unless given tabindex."
    },
    {
      question: "How do I detect if Caps Lock is on?",
      answer: "Use the getModifierState method: e.getModifierState('CapsLock'). This works in keydown and keyup events. Note that this detects the state of the key, not whether the character would be uppercase (which also depends on Shift)."
    },
    {
      question: "Are keyboard events secure for password fields?",
      answer: "Keyboard events still fire on password fields and expose the keys being pressed. Never log or transmit key event data from password fields. For security-sensitive input, use the input event instead, which doesn't reveal individual keystrokes."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All keyboard event processing happens entirely in your browser. This tool does not send any data to servers, log keystrokes, or track which keys you press. Your keyboard activity remains completely private.

### Privacy Guarantees

- **100% Client-Side Processing:** All event handling happens in your browser. No data leaves your device.
- **No Logging:** We don't log, store, or analyze which keys you press while using this tool.
- **No Server Communication:** Zero network requests are made while detecting keyboard events.
- **Session-Only Storage:** If history is maintained, it's only in memory and cleared when you leave the page.
- **No Analytics:** We don't track tool usage patterns, popular keys, or any event-specific data.

This tool is safe to use for testing any keyboard combinations, including those used in proprietary applications or confidential workflows. Your keyboard patterns and shortcuts remain private.`
  },

  stats: {
    "Event Types": "3",
    "Properties": "8+",
    "Response Time": "<1ms",
    "Privacy": "100%"
  }
};
