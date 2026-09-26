"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/I18nContext";
import { SITE_URL } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalSharePrompt() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [actualUrl, setActualUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    setActualUrl(window.location.origin);
    
    // Check if already shared/prompted
    if (window.localStorage.getItem("cosmic-global-shared") === "1") return;

    let count = parseInt(window.localStorage.getItem("cosmic-usage-count") || "0", 10);
    count++;
    window.localStorage.setItem("cosmic-usage-count", count.toString());

    // >= rather than === : an effect that ever fires more than once for the same navigation
    // (e.g. React Strict Mode double-invoking effects in development, which Next.js enables by
    // default) can skip straight from 5 to 7, and an exact-match check would then never trigger
    // for that user at all — silently and permanently, since nothing else re-checks a past
    // count. `show` is never reset back to false except by an explicit dismiss, so this can't
    // cause the prompt to repeatedly reappear either.
    if (count >= 6) {
      // Small delay so it doesn't instantly block the screen on navigation
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleDismiss = () => {
    setShow(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cosmic-global-shared", "1");
    }
  };

  const shareText = encodeURIComponent("✨ Discover your cosmic path for free:");
  const shareUrl = encodeURIComponent(actualUrl || SITE_URL);

  const handleWhatsApp = () => {
    // God-tier WhatsApp bypass
    const origin = window.location.origin;
    const dest = encodeURIComponent("/");
    const desc = encodeURIComponent("Discover your cosmic path for free.");
    const bypassUrl = `${origin}/api/share?dest=${dest}&desc=${desc}&type=home&title=Cosmic%20Numbers&subtitle=Numerology%20%2B%20Horoscope&ext=.png&w=${Date.now()}`;
    
    window.open(`https://wa.me/?text=${shareText}%0A%0A${encodeURIComponent(bypassUrl)}`, "_blank", "noopener,noreferrer");
    handleDismiss();
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "noopener,noreferrer");
    handleDismiss();
  };

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(`${decodeURIComponent(shareText)} ${decodeURIComponent(shareUrl)}`);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        handleDismiss();
      }, 2000);
    } catch {
      // fallback if clipboard fails
      handleDismiss();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        // z-[9995]: strictly below OfflineScreen (z-[9999]) so a genuine "no internet" block
        // always wins if it were ever to appear while this is showing — sharing to Facebook/
        // WhatsApp requires connectivity anyway, so the offline screen should take priority.
        <div className="fixed inset-0 z-[9995] flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleDismiss} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="surface-glass relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border p-8 text-center shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-3xl border border-[var(--surface-border)] shadow-inner">
              ✨
            </div>
            <h3 className="mb-3 text-2xl font-bold tracking-tight">
              {t("share_prompt.title", { defaultValue: "Loving the app?" })}
            </h3>
            <p className="mb-8 text-[15px] leading-relaxed text-muted">
              {t("share_prompt.desc", {
                defaultValue: "Share the magic with your friends! It helps us keep Cosmic Numbers free and growing for everyone.",
              })}
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="whatsapp" onClick={handleWhatsApp} className="w-full justify-center">
                {t("share_prompt.whatsapp", { defaultValue: "Share on WhatsApp" })}
              </Button>
              <Button variant="facebook" onClick={handleFacebook} className="w-full justify-center">
                {t("share_prompt.facebook", { defaultValue: "Share on Facebook" })}
              </Button>
              <Button variant="instagram" onClick={handleInstagram} className="w-full justify-center">
                {copied
                  ? t("share_prompt.copied", { defaultValue: "Link Copied!" })
                  : t("share_prompt.instagram", { defaultValue: "Share on Instagram" })}
              </Button>
              <button
                onClick={handleDismiss}
                className="mt-3 text-[13px] font-medium tracking-wide text-muted-soft hover:text-[var(--foreground)] transition-colors"
              >
                {t("share_prompt.dismiss", { defaultValue: "Maybe later" })}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
