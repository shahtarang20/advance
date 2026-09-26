"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";
import { track } from "@vercel/analytics";
import { GlassCard } from "@/components/ui/GlassCard";
import { IOSInstallGuide } from "@/components/IOSInstallGuide";

// Types for the native install prompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __deferredInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone;
  return window.matchMedia("(display-mode: standalone)").matches || iosStandalone === true;
}

function isIOSSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
  return isIOS && isSafari;
}

export function InstallAppCTA({ forceShow = false, className = "mt-20 sm:mt-28" }: { forceShow?: boolean, className?: string }) {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [installed, setInstalled] = useState(true); // Default true to prevent flicker
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (isStandaloneDisplay()) {
      setInstalled(true);
      return;
    }

    setInstalled(false);

    const markInstalled = () => {
      setInstalled(true);
      track("App Installed", { source: "HeroCTA" });
    };

    window.addEventListener("appinstalled", markInstalled);

    if (isIOSSafari()) {
      setShowIOSHint(true);
      return () => window.removeEventListener("appinstalled", markInstalled);
    }

    const onEligiblePrompt = (evt: BeforeInstallPromptEvent) => {
      setDeferredPrompt(evt);
    };

    if (window.__deferredInstallPrompt) {
      onEligiblePrompt(window.__deferredInstallPrompt);
    }

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      onEligiblePrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    return () => {
      window.removeEventListener("appinstalled", markInstalled);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      if (forceShow) alert("In a real environment, this triggers the native install prompt!");
      return;
    }
    track("Install CTA Clicked");
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice.catch(() => undefined);
    if (choice?.outcome === "accepted") {
      track("Install CTA Accepted");
      setInstalled(true);
    } else {
      track("Install CTA Dismissed");
    }
    setDeferredPrompt(null);
    window.__deferredInstallPrompt = null;
  };

  // Only show the CTA if it's NOT installed AND we have a prompt available (or it's iOS)
  if (!forceShow && (installed || (!deferredPrompt && !showIOSHint))) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        <GlassCard className="relative overflow-hidden p-8 sm:p-12 text-center group border-[var(--accent-solid)] border-opacity-30 shadow-[0_0_40px_-15px_rgba(var(--accent-solid-rgb),0.3)]">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full bg-gradient-to-b from-[var(--accent-solid)] to-transparent opacity-5 blur-3xl rounded-full pointer-events-none" />
          
          <motion.div
            className="text-5xl sm:text-6xl mb-6 inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            📲
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 accent-gradient-text">
            {t("pwa.cta.title", { defaultValue: "Install Cosmic Numbers" })}
          </h2>
          
          <p className="max-w-xl mx-auto text-base sm:text-lg text-muted mb-8">
            {t("pwa.cta.desc", { defaultValue: "Get the full experience. Add our app directly to your home screen for instant access to your daily horoscopes, tarot readings, and more—no app store required!" })}
          </p>

          {deferredPrompt ? (
            <motion.button
              type="button"
              onClick={handleInstall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-tap accent-gradient-bg text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_10px_30px_-10px_var(--accent-ring)]"
            >
              {t("pwa.install.button", { defaultValue: "Install App Now" })}
            </motion.button>
          ) : showIOSHint ? (
            <motion.button
              type="button"
              onClick={() => setShowGuide(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-tap accent-gradient-bg text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_10px_30px_-10px_var(--accent-ring)]"
            >
              {t("pwa.install.show_me", { defaultValue: "How to Install (iOS)" })}
            </motion.button>
          ) : null}
        </GlassCard>
      </motion.div>

      {showGuide && <IOSInstallGuide onClose={() => setShowGuide(false)} />}
    </>
  );
}
