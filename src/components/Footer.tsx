"use client";

import { useState } from "react";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscope";
import { useTranslation } from "@/lib/I18nContext";
import { SITE_URL } from "@/lib/site";

export function Footer() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent("✨ Discover your cosmic path for free:");
  const shareUrl = encodeURIComponent(SITE_URL);

  // Instagram has no public share-link API (unlike WhatsApp's wa.me or Facebook's sharer.php),
  // so copy-to-clipboard + "paste it yourself" is the only thing that actually works everywhere.
  // `navigator.clipboard` can be missing (insecure/http context, older browsers) and
  // `writeText` can reject (permission denied) — awaiting it and only flipping `copied` inside
  // the try block means the confirmation only ever shows when the copy genuinely succeeded,
  // instead of claiming success unconditionally regardless of what actually happened.
  const handleInstagramShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(`${decodeURIComponent(shareText)} ${decodeURIComponent(shareUrl)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Nothing to show on failure beyond leaving the label as-is — the user can still select
      // and copy the link manually from the address bar.
    }
  };

  return (
    <footer className="mt-32 border-t border-[var(--surface-border)] bg-[var(--surface)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--foreground)]">{t("footer.tools")}</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/numerology" className="hover:text-[var(--foreground)]">{t("nav.numerology")}</Link></li>
              <li><Link href="/horoscope" className="hover:text-[var(--foreground)]">{t("nav.horoscope")}</Link></li>
              <li><Link href="/compatibility" className="hover:text-[var(--foreground)]">{t("nav.compatibility")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--foreground)]">{t("footer.share_app", { defaultValue: "Share App" })}</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href={`https://wa.me/?text=${shareText}%0A%0A${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
                  <span className="text-[#25D366]">WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1877F2] transition-colors">
                  <span className="text-[#1877F2]">Facebook</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleInstagramShare}
                  className="flex items-center gap-2 hover:text-[#E1306C] transition-colors"
                >
                  {copied ? (
                    <span className="text-muted">{t("footer.link_copied", { defaultValue: "Link copied — paste it into your Instagram Story or Bio!" })}</span>
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">Instagram</span>
                  )}
                </button>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h3 className="mb-4 text-base font-semibold text-[var(--foreground)]">{t("footer.horoscope_by_sign")}</h3>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {ZODIAC_SIGNS.map((z) => (
                <Link key={z.sign} href={`/horoscope/${z.sign}`} className="text-sm text-muted hover:text-[var(--foreground)]">
                  {z.glyph} {t(`zodiac.${z.sign}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-3 text-xs text-muted-soft">
            <Link href="/privacy" className="hover:text-muted">{t("footer.privacy")}</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-muted">{t("footer.terms")}</Link>
          </div>
          <p className="text-xs text-muted-soft">
            {t("footer.copyright", { year: new Date().getFullYear().toString() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
