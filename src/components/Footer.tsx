"use client";

import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscope";
import { useTranslation } from "@/lib/I18nContext";
import { SITE_URL } from "@/lib/site";

export function Footer() {
  const { t } = useTranslation();
  
  const shareText = encodeURIComponent("Check out Cosmic Numbers - A free numerology calculator & daily horoscope app!");
  const shareUrl = encodeURIComponent(SITE_URL);

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
            <h3 className="mb-4 text-base font-semibold text-[var(--foreground)]">Share App</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
                  <span className="text-[#25D366]">WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1877F2] transition-colors">
                  <span className="text-[#1877F2]">Facebook</span>
                </a>
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
