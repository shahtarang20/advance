"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";

// Same easing curve used by the site's other overlays (OnboardingTour, PageFeatureHint) so this
// feels consistent with the rest of the app's motion design rather than its own one-off timing.
const EASE = [0.16, 1, 0.3, 1] as const;

// Only ever set once the app is genuinely installed (via the 'appinstalled' event, which the
// browser fires regardless of whether install was triggered through our button or the browser's
// own UI). Unlike a plain "dismissed" flag, this is never set just from closing the banner — the
// banner is meant to keep reappearing on every visit until the user actually installs, and only
// stop for good once they have.
const INSTALLED_KEY = "cosmic-install-banner-installed";

// Chrome/Edge/Android fire this event when the browser has decided the page is installable
// (matches our manifest.json's installability criteria) and is offering to show its own native
// install UI — calling `.preventDefault()` on it lets us suppress that and show our own button
// instead, then trigger the same native prompt on click via `.prompt()`. Not in the standard DOM
// lib types yet, so this is declared by hand rather than `any`-ing it away everywhere it's used.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  // iOS Safari doesn't support the `display-mode` media query the same way; it exposes
  // `navigator.standalone` instead once launched from a home-screen icon.
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

/** An "Install App" banner that keeps reappearing on every visit — closing it with ✕ only hides
 * it for the current page view, not permanently — until the app is actually installed, at which
 * point it stops for good. Chrome/Edge/Android get a real button that triggers the browser's
 * native install prompt directly (via the captured `beforeinstallprompt` event) — iOS Safari
 * doesn't expose that event at all (Apple only allows install through the manual Share →
 * "Add to Home Screen" flow), so it gets a short instruction instead of a non-functional button. */
// How long to wait for the browser's own `beforeinstallprompt` signal before giving up on it and
// falling back to generic manual instructions instead. Chrome only fires that event once its own
// engagement heuristics are satisfied (a handful of prior visits, time spent, no recent dismissal
// within its multi-week cooldown) — none of which any website's code can force or query. Without
// this fallback, a real visitor who hasn't yet met Chrome's bar (or whose browser is in that
// cooldown) sees nothing at all, which is indistinguishable from the banner being broken even
// though the underlying manifest/installability is completely valid.
const NATIVE_PROMPT_GRACE_MS = 4000;

export function InstallAppBanner() {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [showGenericHint, setShowGenericHint] = useState(false);
  // Only hides the banner for this page view (closing with ✕) — never persisted, so it shows
  // again on the next visit/navigation. Real "stop showing forever" is `installed` below.
  const [closedThisView, setClosedThisView] = useState(false);
  const [installed, setInstalled] = useState(true);

  useEffect(() => {
    if (isStandaloneDisplay()) return;
    let alreadyInstalled = false;
    try {
      alreadyInstalled = window.localStorage.getItem(INSTALLED_KEY) === "1";
    } catch {
      // localStorage unavailable — default to not-installed, banner can still show.
    }
    setInstalled(alreadyInstalled);
    if (alreadyInstalled) return;

    // Fires whenever the app is actually installed — whether the user tapped our button below
    // or used the browser's own install UI instead. This is the one thing that should
    // permanently stop the banner; everything else (closing it, navigating away) should not.
    const onAppInstalled = () => {
      setInstalled(true);
      try {
        window.localStorage.setItem(INSTALLED_KEY, "1");
      } catch {
        // Best-effort only.
      }
    };
    window.addEventListener("appinstalled", onAppInstalled);

    if (isIOSSafari()) {
      setShowIOSHint(true);
      return () => window.removeEventListener("appinstalled", onAppInstalled);
    }

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    const graceTimer = setTimeout(() => {
      // Re-read via a functional update rather than closing over `deferredPrompt` directly —
      // this timer is set up once on mount, so its closure would otherwise always see the
      // initial `null` regardless of what actually happened in between.
      setDeferredPrompt((current) => {
        if (!current) setShowGenericHint(true);
        return current;
      });
    }, NATIVE_PROMPT_GRACE_MS);

    return () => {
      window.removeEventListener("appinstalled", onAppInstalled);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      clearTimeout(graceTimer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    // The prompt can only be used once regardless of outcome, so it's cleared either way — if
    // the user actually accepted, the 'appinstalled' listener above is what permanently stops
    // the banner; if they dismissed the native prompt, closing this view just hides it for now
    // and it'll show again next visit, same as the ✕ button.
    await deferredPrompt.userChoice.catch(() => undefined);
    setDeferredPrompt(null);
    setClosedThisView(true);
  };

  const dismiss = () => setClosedThisView(true);

  const visible = !installed && !closedThisView && (!!deferredPrompt || showIOSHint || showGenericHint);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[9996] flex justify-center p-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <motion.div
            className="surface-glass dark:backdrop-blur-xl flex w-full max-w-md items-center gap-3 rounded-2xl border p-4 shadow-2xl"
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <motion.div
              className="text-2xl"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              📲
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{t("pwa.install.title", { defaultValue: "Install Cosmic Numbers" })}</p>
              <p className="mt-0.5 text-xs text-muted">
                {deferredPrompt
                  ? t("pwa.install.desc", { defaultValue: "Add it to your home screen for the full app experience." })
                  : showIOSHint
                    ? t("pwa.install.ios_hint", {
                        defaultValue: 'Tap the Share button, then "Add to Home Screen".',
                      })
                    : t("pwa.install.generic_hint", {
                        defaultValue: 'Tap your browser\'s menu (⋮ or the icon in the address bar) and choose "Install app" or "Add to Home Screen".',
                      })}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {deferredPrompt && (
                <motion.button
                  type="button"
                  onClick={handleInstall}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="btn-tap accent-gradient-bg rounded-full px-4 py-2 text-xs font-medium text-white shadow-[0_8px_20px_-8px_var(--accent-ring)]"
                >
                  {t("pwa.install.button", { defaultValue: "Install" })}
                </motion.button>
              )}
              <button
                type="button"
                onClick={dismiss}
                aria-label={t("pwa.install.dismiss", { defaultValue: "Dismiss" })}
                className="btn-tap flex h-8 w-8 items-center justify-center rounded-full text-muted-soft transition hover:text-[var(--foreground)]"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
