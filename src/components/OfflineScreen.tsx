"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/I18nContext";

export function OfflineScreen() {
  const { t } = useTranslation();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      // Rendered (not returned as null) at all times so `transition-opacity` has an actual
      // opacity change to animate between — a `transition-*` class alone does nothing if the
      // element is only ever mounted at its final opacity, which is what returning null while
      // offline and a plain div once online used to do (no fade, just an instant pop-in).
      // `pointer-events-none` + `aria-hidden` while online keep the invisible overlay from
      // blocking clicks or being announced to screen readers when it's not actually showing.
      aria-hidden={!isOffline}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 text-center bg-background/95 backdrop-blur-sm transition-opacity duration-300 ${
        isOffline ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="max-w-md space-y-6">
        <div className="text-6xl mb-8">🌐❌</div>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--accent-solid)]">
          {t("pwa.offline.title", { defaultValue: "You're Offline" })}
        </h2>
        <p className="text-lg text-muted">
          {t("pwa.offline.desc", {
            defaultValue:
              "Cosmic Numbers requires an active internet connection to calculate your readings. Please reconnect to continue.",
          })}
        </p>
      </div>
    </div>
  );
}
