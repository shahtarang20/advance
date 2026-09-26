"use client";

import { useState, useEffect, useRef } from "react";
import { useGamification } from "@/lib/gamification";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/I18nContext";
import confetti from "canvas-confetti";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface ShareButtonsProps {
  /** Full absolute shareable page URL (e.g. /result/numerology?name=...) */
  shareUrl: string;
  /** Query string (without leading ?) to pass to /api/og for the PNG download */
  ogQuery: string;
  /** Calm, specific, first-person caption naming the actual result — no hype, no emoji spam. */
  caption: string;
}

export function ShareButtons({ shareUrl, ogQuery, caption }: ShareButtonsProps) {
  const { recordAction } = useGamification();
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [isInstalled, setIsInstalled] = useState(true);
  const [showAwesome, setShowAwesome] = useState(false);
  const [shouldProminentlyShow, setShouldProminentlyShow] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    // Check if the app is currently running in standalone (installed) mode
    if (typeof window !== "undefined") {
      const iosStandalone = (window.navigator as any).standalone;
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches || iosStandalone === true;
      setIsInstalled(isStandalone);

      // Check 7-day interval logic for showing animations
      const lastShown = window.localStorage.getItem("cosmic-last-share-anim");
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
      
      if (!lastShown || Date.now() - parseInt(lastShown, 10) > SEVEN_DAYS) {
        setShouldProminentlyShow(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isInView && shouldProminentlyShow) {
      setShowAwesome(true);
      // Hide the floating text after 2 seconds
      const textTimer = setTimeout(() => setShowAwesome(false), 2000);

      // Elegant, professional confetti burst when the user finishes reading their prediction
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#a855f7', '#3b82f6', '#ec4899']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#a855f7', '#3b82f6', '#ec4899']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Record that we showed the intense animations so we wait another 7 days
      if (typeof window !== "undefined") {
        window.localStorage.setItem("cosmic-last-share-anim", Date.now().toString());
      }

      return () => clearTimeout(textTimer);
    }
  }, [isInView, shouldProminentlyShow]);

  const [instagramCopied, setInstagramCopied] = useState(false);

  const handleNativeShare = async (fallbackPlatform: 'whatsapp' | 'facebook' | 'instagram' | 'download') => {
    setDownloadError(null);
    setDownloading(true);
    recordAction("share_click");

    try {
      // The actual professional card only ever gets attached via the Web Share API's file
      // support (`navigator.canShare({ files })`) — that's the one real mechanism a website has
      // for handing an image directly into WhatsApp/Instagram/Facebook's own native share sheet,
      // as an actual attached photo rather than just a text message with a link. This used to
      // check `navigator.share` alone and send only {title, text, url} — which works, but never
      // included the image at all, on any platform, even though the button said "Share on
      // WhatsApp" implying the card would go with it. Fetching the PNG first and feeding it into
      // `canShare`/`share` here is what actually attaches it.
      if (fallbackPlatform !== 'download') {
        const response = await fetch(`/api/og?${ogQuery}`);
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const blob = await response.blob();
        const file = new File([blob], "cosmic-reading.png", { type: blob.type || "image/png" });

        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Cosmic Numbers",
            text: `${caption}\n\n— shared via Cosmic Numbers`,
          });
          return;
        }

        // The device/browser can't attach files to a native share (most desktop browsers, and
        // some older mobile ones) — fall back to platform-specific behavior instead. WhatsApp
        // and Facebook still get a working text+link share; Instagram has no such URL scheme at
        // all (it never has — see Footer.tsx), so the only honest option there is copying the
        // caption+link to the clipboard for the user to paste in themselves.
        if (fallbackPlatform === 'whatsapp') {
          const text = encodeURIComponent(`${caption}\n${shareUrl}\n\n— shared via Cosmic Numbers`);
          window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
        } else if (fallbackPlatform === 'facebook') {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
        } else if (fallbackPlatform === 'instagram') {
          await navigator.clipboard.writeText(`${caption}\n${shareUrl}`);
          setInstagramCopied(true);
          setTimeout(() => setInstagramCopied(false), 2500);
        }
        return;
      }

      // Plain download — no share sheet involved, just save the file.
      const response = await fetch(`/api/og?${ogQuery}`);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "cosmic-reading.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      // A user cancelling the native share sheet also throws (AbortError) — that's not a real
      // failure, so it shouldn't show an error message telling them something broke.
      if (err instanceof DOMException && err.name === "AbortError") return;
      setDownloadError(t("share.error", { defaultValue: "Failed to generate card." }));
    } finally {
      setDownloading(false);
    }
  };

  const handleInstallClick = () => {
    // Check if the global deferred prompt from InstallAppBanner is available
    if (typeof window !== "undefined" && (window as any).__deferredInstallPrompt) {
      (window as any).__deferredInstallPrompt.prompt();
    } else {
      // Fallback for iOS Safari which doesn't support the native prompt API
      alert(t("pwa.install.ios_hint", { defaultValue: "Tap the Share button at the bottom of your browser, then select 'Add to Home Screen' to install." }));
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showAwesome && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: -50, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-md z-50 whitespace-nowrap"
          >
            {t("share.awesome", { defaultValue: "Awesome! ✨" })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-8 rounded-3xl border border-[var(--surface-border)] bg-gradient-to-br from-purple-500/5 to-transparent p-6 shadow-sm"
      >
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {t("share.encourage_title", { defaultValue: "Share Your Cosmic Path ✨" })}
          </h3>
        <p className="text-sm text-muted">
          {t("share.encourage_desc", { defaultValue: "Connect with friends and share this prediction with the world." })}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="whatsapp" 
            onClick={() => handleNativeShare('whatsapp')} 
            disabled={downloading}
            className="shadow-md disabled:opacity-70"
          >
            {downloading ? t("share.generating", { defaultValue: "Generating Card..." }) : t("share.whatsapp", { defaultValue: "Share on WhatsApp" })}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="facebook" 
            onClick={() => handleNativeShare('facebook')} 
            disabled={downloading}
            className="shadow-md disabled:opacity-70"
          >
            {downloading ? t("share.generating", { defaultValue: "Generating Card..." }) : t("share.facebook", { defaultValue: "Share on Facebook" })}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="instagram"
            onClick={() => handleNativeShare('instagram')}
            disabled={downloading}
            className="shadow-md disabled:opacity-70"
          >
            {downloading
              ? t("share.generating", { defaultValue: "Generating Card..." })
              : instagramCopied
                ? t("share_prompt.copied", { defaultValue: "Link Copied!" })
                : t("share_prompt.instagram", { defaultValue: "Share on Instagram" })}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="secondary"
            onClick={() => handleNativeShare('download')}
            disabled={downloading}
            className="disabled:cursor-not-allowed disabled:opacity-60 shadow-md relative overflow-hidden"
          >
            {downloading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {t("share.generating")}
              </span>
            ) : (
              t("share.download", { defaultValue: "Download Image" })
            )}
          </Button>
        </motion.div>
      </div>
      
      {downloadError && (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-3 text-center text-xs text-amber-600"
        >
          {downloadError}
        </motion.p>
      )}

      {/* Strongly Encourage App Installation */}
      {!isInstalled && shouldProminentlyShow && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-5 border border-purple-500/20 text-center"
        >
          <div className="text-3xl mb-2 animate-pulse">📲</div>
          <h4 className="font-semibold text-[var(--foreground)] mb-1">
            {t("share.install_title", { defaultValue: "Want daily cosmic updates? 🌟" })}
          </h4>
          <p className="text-sm text-muted mb-4">
            {t("share.install_desc", { defaultValue: "Install Cosmic Numbers free on your home screen to get exact horoscopes and numerology predictions delivered daily." })}
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button 
              onClick={handleInstallClick} 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium tracking-wide shadow-lg hover:shadow-xl transition-all border-none"
            >
              {t("share.install_btn", { defaultValue: "Install Free App Now" })}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
    </div>
  );
}
