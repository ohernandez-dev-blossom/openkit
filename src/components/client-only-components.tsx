"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical client-only components
export const PWARegister = dynamic(() => import("@/components/pwa-register").then(m => ({ default: m.PWARegister })), { ssr: false });
export const PWAInstallPrompt = dynamic(() => import("@/components/pwa-install-prompt").then(m => ({ default: m.PWAInstallPrompt })), { ssr: false });
export const KonamiEasterEgg = dynamic(() => import("@/components/konami-easter-egg").then(m => ({ default: m.KonamiEasterEgg })), { ssr: false });
