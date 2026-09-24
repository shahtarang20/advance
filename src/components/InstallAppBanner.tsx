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

// A tiny inline script in layout.tsx's <head> captures `beforeinstallprompt` the instant the
// page can run any JS at all — before React has even loaded, let alone hydrated — and stashes it
// here. Without that, a listener added inside this component's own effect can miss the event
// entirely if the browser fires it earlier than React finishes mounting, which otherwise leaves
// every visitor stuck on the generic fallback even when a real one-tap install was available.
declare global {
  interface Window {
    __deferredInstallPrompt?: BeforeInstallPromptEvent | null;
  }
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
    // Running inside the installed app shell right now is the one unambiguous, first-party
    // signal a website actually gets — real, not inferred. Nothing else below is needed.
    if (isStandaloneDisplay()) {
      setInstalled(true);
      return;
    }

    // Browsing in a normal tab, not the installed shell — the browser deliberately gives
    // websites no direct API to ask "is your PWA currently installed?" from here (a privacy
    // limitation, not something any site's code can query around). So our own past
    // `appinstalled` flag is only ever a *memory* of what happened last time, not a live fact —
    // if the user later uninstalled the app, this flag alone would wrongly keep the banner
    // hidden forever with no way to notice the app is gone.
    //
    // The fix: treat the flag as tentative, and keep listening regardless of what it says.
    // Chrome only ever offers `beforeinstallprompt` again when it currently believes the app is
    // NOT installed — so that event firing again, after our flag claimed "installed", is real
    // proof of an uninstall, and self-heals the stale flag back to false. This is what actually
    // re-checks installed-or-not every time the UI opens, within what browsers allow.
    let tentativelyInstalled = false;
    try {
      tentativelyInstalled = window.localStorage.getItem(INSTALLED_KEY) === "1";
    } catch {
      // localStorage unavailable — default to not-installed, banner can still show.
    }
    setInstalled(tentativelyInstalled);

    const markInstalled = () => {
      setInstalled(true);
      try {
        window.localStorage.setItem(INSTALLED_KEY, "1");
      } catch {
        // Best-effort only.
      }
    };
    // Fires whenever the app is actually installed — whether the user tapped our button below
    // or used the browser's own install UI instead.
    window.addEventListener("appinstalled", markInstalled);

    if (isIOSSafari()) {
      // iOS gives no equivalent re-offering signal for a Home Screen removal the way Chrome's
      // `beforeinstallprompt` does — Safari simply has no API for this at all. This is a genuine
      // platform gap, not something we can self-heal the same way; the iOS hint only re-shows
      // once whatever previously set the flag (if anything did) gets cleared some other way.
      if (!tentativelyInstalled) setShowIOSHint(true);
      return () => window.removeEventListener("appinstalled", markInstalled);
    }

    // A fresh `beforeinstallprompt` always means Chrome currently sees this as not installed —
    // clearing the stale flag here is exactly what self-heals the "installed, then uninstalled"
    // case the very next time Chrome is willing to re-offer the prompt.
    const onEligiblePrompt = (evt: BeforeInstallPromptEvent) => {
      try {
        window.localStorage.removeItem(INSTALLED_KEY);
      } catch {
        // Best-effort only.
      }
      setInstalled(false);
      setDeferredPrompt(evt);
    };

    // Covers the event having already fired before this effect even ran (the common case in
    // production — see the module comment above on `window.__deferredInstallPrompt`).
    if (window.__deferredInstallPrompt) {
      onEligiblePrompt(window.__deferredInstallPrompt);
    }

    // Covers the event arriving later, after this component has already mounted — either path
    // (the early <head> script's relay event, or the browser firing it late enough that this
    // listener catches it directly) lands here.
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      onEligiblePrompt(e as BeforeInstallPromptEvent);
    };
    const onEarlyPromptReady = () => {
      if (window.__deferredInstallPrompt) onEligiblePrompt(window.__deferredInstallPrompt);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("cosmic:install-prompt-ready", onEarlyPromptReady);

    const graceTimer = setTimeout(() => {
      // Re-read via a functional update rather than closing over `deferredPrompt` directly —
      // this timer is set up once on mount, so its closure would otherwise always see the
      // initial `null` regardless of what actually happened in between. Skipped entirely if the
      // stale flag is still tentatively claiming "installed" — no fallback hint makes sense to
      // show for an app the user might genuinely still have, just because Chrome hasn't (yet)
      // re-offered the prompt that would prove otherwise.
      setDeferredPrompt((current) => {
        if (!current && !tentativelyInstalled) setShowGenericHint(true);
        return current;
      });
    }, NATIVE_PROMPT_GRACE_MS);

    return () => {
      window.removeEventListener("appinstalled", markInstalled);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("cosmic:install-prompt-ready", onEarlyPromptReady);
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
    window.__deferredInstallPrompt = null;
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
                        defaultValue: 'Tap your browser\'s menu (⋮) and choose "Install app".',
                      })}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {/* Only rendered when a real, browser-issued install prompt is actually available —
                  showing this unconditionally (including on iOS Safari, which never fires
                  beforeinstallprompt at all) means tapping it can do nothing at best or, if wired
                  to a fallback alert(), interrupt the user with a jarring native dialog on top of
                  the instructional text already sitting right next to it. When there's no real
                  prompt to trigger, the instructional text below is the only actionable thing to
                  show — there's no button that could honestly do anything else. */}
              {deferredPrompt && (
                <motion.button
                  type="button"
                  onClick={handleInstall}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="btn-tap accent-gradient-bg rounded-full px-4 py-2 text-xs font-medium text-white shadow-[0_8px_20px_-8px_var(--accent-ring)]"
                >
                  {t("pwa.install.button", { defaultValue: "Install App" })}
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
