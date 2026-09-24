"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";
import { detectInAppBrowser, InAppBrowserKind } from "@/lib/inAppBrowser";

const DISMISSED_KEY = "cosmic-in-app-browser-dismissed";
const EASE = [0.16, 1, 0.3, 1] as const;

/** A one-time nudge for visitors arriving via Instagram's or Facebook's own in-app WebView
 * browser (e.g. tapping a shared Story link sticker) — that embedded browser has its own
 * isolated storage (so this app's usual "first visit" flags don't carry over from a user's real
 * browser and won't persist back to it either) and typically can't fire the PWA install prompt
 * at all. Points them at the "Open in Browser" option those apps already provide in their own UI
 * — we can't force navigation out of a WebView via JS, only tell the user where to find it.
 * Rendered at the top (InstallAppBanner already owns the bottom) so the two never collide, even
 * though in practice an in-app WebView rarely also fires beforeinstallprompt. */
export function InAppBrowserBanner() {
  const { t } = useTranslation();
  const [kind, setKind] = useState<InAppBrowserKind>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const detected = detectInAppBrowser(navigator.userAgent);
    if (!detected) return;
    let wasDismissed = false;
    try {
      wasDismissed = window.localStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      // localStorage unavailable — default to not-dismissed, banner can still show.
    }
    setKind(detected);
    setDismissed(wasDismissed);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Best-effort only.
    }
  };

  const visible = !!kind && !dismissed;

  const appName =
    kind === "instagram"
      ? t("in_app_browser.instagram", { defaultValue: "Instagram" })
      : t("in_app_browser.facebook", { defaultValue: "Facebook" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[9994] flex justify-center p-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="surface-glass dark:backdrop-blur-xl flex w-full max-w-md items-center gap-3 rounded-2xl border p-4 shadow-2xl">
            <div className="text-2xl">🌐</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">
                {t("in_app_browser.title", { defaultValue: "You're viewing this inside {appName}", appName })}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {t("in_app_browser.desc", {
                  defaultValue: "For the full experience (including installing the app), tap ⋯ or the menu icon above and choose \"Open in Browser\".",
                })}
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label={t("in_app_browser.dismiss", { defaultValue: "Dismiss" })}
              className="btn-tap flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-soft transition hover:text-[var(--foreground)]"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
