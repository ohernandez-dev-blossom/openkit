"use client";

import { useEffect, useState } from "react";
import { RefreshCw, X } from "lucide-react";

export function PWARegister() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          setRegistration(reg);
          
          // Check for updates every 60 seconds
          setInterval(() => {
            reg.update();
          }, 60000);

          // Listen for new service worker
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New version available
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((err) => {
          console.log("SW registration failed:", err);
        });

      // Handle controller change (new SW activated)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage("skipWaiting");
    }
    setUpdateAvailable(false);
  };

  const dismissUpdate = () => {
    setUpdateAvailable(false);
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-blue-600 text-white p-4 rounded-xl shadow-lg z-50 flex items-center gap-3">
      <RefreshCw className="w-5 h-5 shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">Update available!</p>
        <p className="text-xs opacity-80">Click to refresh and get the latest version.</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="px-3 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 active:bg-blue-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          aria-label="Update to new version"
        >
          Update
        </button>
        <button
          onClick={dismissUpdate}
          className="p-1.5 hover:bg-blue-500 active:bg-blue-400 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          aria-label="Dismiss update notification"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
