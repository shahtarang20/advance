"use client";

import { useState } from "react";
import { useGamification } from "@/lib/gamification";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/I18nContext";

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

  const handleWhatsApp = () => {
    recordAction("share_click");
    const text = encodeURIComponent(`${caption}\n${shareUrl}\n\n— shared via Cosmic Numbers`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleFacebook = () => {
    recordAction("share_click");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    setDownloadError(null);
    setDownloading(true);
    recordAction("share_click");
    try {
      const response = await fetch(`/api/og?${ogQuery}`);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "cosmic-numbers-card.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      setDownloadError(t("share.error"));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button variant="whatsapp" onClick={handleWhatsApp}>
          {t("share.whatsapp")}
        </Button>
        <Button variant="facebook" onClick={handleFacebook}>
          {t("share.facebook", { defaultValue: "Facebook" })}
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={downloading}
          className="disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {t("share.generating")}
            </span>
          ) : (
            t("share.download")
          )}
        </Button>
      </div>
      {downloadError && <p className="mt-2 text-xs text-amber-600">{downloadError}</p>}
    </div>
  );
}
