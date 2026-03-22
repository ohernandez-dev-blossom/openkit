"use client";

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export function KonamiEasterEgg() {
  const triggerEasterEgg = useCallback(() => {
    // Show success message
    const message = document.createElement("div");
    message.className = "konami-message";
    message.innerHTML = `
      <div class="konami-content">
        <div class="konami-title">🎮 KONAMI CODE ACTIVATED! 🎮</div>
        <div class="konami-subtitle">You found the secret! 🎉</div>
      </div>
    `;
    document.body.appendChild(message);

    // Confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          message.remove();
        }, 1000);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }});
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }});
    }, 250);

    // Rainbow animation
    document.body.classList.add("konami-rainbow");
    setTimeout(() => {
      document.body.classList.remove("konami-rainbow");
    }, duration);
  }, []);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    let sequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      sequence = [...sequence, e.key].slice(-10);

      // Check if konami code matches
      if (
        sequence.length === 10 &&
        sequence.every((key, i) => key === konamiCode[i])
      ) {
        triggerEasterEgg();
        sequence = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerEasterEgg]);

  return (
    <style jsx global>{`
      .konami-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        pointer-events: none;
        animation: konami-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .konami-content {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem 3rem;
        border-radius: 1rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        border: 2px solid rgba(255, 255, 255, 0.2);
      }

      .konami-title {
        font-size: 2rem;
        font-weight: bold;
        color: white;
        text-align: center;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }

      .konami-subtitle {
        font-size: 1.25rem;
        color: rgba(255, 255, 255, 0.9);
        text-align: center;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      }

      @keyframes konami-pop {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }

      .konami-rainbow {
        animation: rainbow-bg 0.5s infinite;
      }

      @keyframes rainbow-bg {
        0% {
          filter: hue-rotate(0deg);
        }
        100% {
          filter: hue-rotate(360deg);
        }
      }
    `}</style>
  );
}
