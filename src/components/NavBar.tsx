"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/I18nContext";
import { LanguageToggle } from "./LanguageToggle";

const emptySubscribe = () => () => {};

const LINKS = [
  { href: "/numerology", labelKey: "nav.numerology" },
  { href: "/horoscope", labelKey: "nav.horoscope" },
  { href: "/compatibility", labelKey: "nav.compatibility" },
  { href: "/nakshatra", labelKey: "nav.nakshatra" },
  { href: "/tarot", labelKey: "nav.tarot" },
  { href: "/profile", labelKey: "nav.profile" },
];

export function NavBar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <header className="surface-glass dark:backdrop-blur-xl sticky top-0 z-50 border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-[var(--foreground)] sm:text-lg">
          <span className="text-[var(--accent-solid)]">✦</span> {t("nav.title")}
        </Link>
        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[15px] font-medium text-muted transition-colors hover:text-[var(--foreground)]">
              {t(l.labelKey)}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            aria-label={mounted ? (isDark ? t("theme.switch.light") : t("theme.switch.dark")) : t("theme.toggle")}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="btn-tap accent-ring surface-glass flex h-11 w-11 items-center justify-center rounded-full border text-base"
          >
            {mounted ? (isDark ? "☀️" : "🌙") : "•"}
          </button>
          <button
            aria-label={menuOpen ? t("menu.close") : t("menu.open")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="btn-tap accent-ring surface-glass flex h-11 w-11 items-center justify-center rounded-full border text-sm sm:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="surface-glass border-t px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              >
                {t(l.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
