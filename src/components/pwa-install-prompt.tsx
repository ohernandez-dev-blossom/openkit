"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const [isIOS] = useState(() =>
    typeof window !== 'undefined'
      ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream
      : false
  );

  const [isInstalled] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true
      : false
  );

  useEffect(() => {
    // Don't show if already installed
    if (isInstalled) {
      return;
    }

    // Check if dismissed before
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed =
        (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    // Listen for beforeinstallprompt (Chrome/Edge)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 30 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 30000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Show iOS prompt after 30 seconds
    if (isIOS) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 30000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, [isInstalled, isIOS]);

  const handleInstall = async () => {
    if (!deferredPrompt && !isIOS) return;

    if (deferredPrompt) {
      // Chrome/Edge install
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setShowPrompt(false);
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", new Date().toISOString());
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-2xl z-40 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-lg transition"
        aria-label="Dismiss install prompt"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex gap-3">
        <div className="shrink-0">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">Install OpenKit.tools</h3>
          {isIOS ? (
            <>
              <p className="text-sm opacity-90 mb-3">
                Tap{" "}
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="w-4 h-4 inline"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 12a2 2 0 001-3.732V4a2 2 0 10-4 0v4.268A2 2 0 0012 12a2 2 0 001 3.732V20a2 2 0 104 0v-4.268A2 2 0 0016 12z" />
                    <path d="M8 12a2 2 0 001-3.732V4a2 2 0 10-4 0v4.268A2 2 0 004 12a2 2 0 001 3.732V20a2 2 0 104 0v-4.268A2 2 0 008 12z" />
                  </svg>
                </span>{" "}
                then &quot;Add to Home Screen&quot; for quick access!
              </p>
            </>
          ) : (
            <>
              <p className="text-sm opacity-90 mb-3">
                Install for offline access and a better experience!
              </p>
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Install Now
              </Button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
