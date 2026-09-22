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
  { href: "/kundli", labelKey: "nav.kundli" },
  { href: "/tarot", labelKey: "nav.tarot" },
  { href: "/aura", labelKey: "nav.aura" },
  { href: "/biorhythm", labelKey: "nav.biorhythm" },
  { href: "/dreams", labelKey: "nav.dreams" },
  { href: "/profile", labelKey: "nav.profile" },
];

// Only the highest-traffic tools show inline on desktop; the rest live under "More" so the
// header stays readable instead of cramming 9+ links into one row even on a laptop screen.
const PRIMARY_LINKS = LINKS.filter((l) =>
  ["/numerology", "/horoscope", "/kundli", "/tarot"].includes(l.href)
);
const MORE_LINKS = LINKS.filter((l) => !PRIMARY_LINKS.includes(l));

export function NavBar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
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
        <div className="hidden items-center gap-6 lg:flex">
          {PRIMARY_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[15px] font-medium text-muted transition-colors hover:text-[var(--foreground)]">
              {t(l.labelKey)}
            </Link>
          ))}
          <div className="relative" onMouseLeave={() => setMoreOpen(false)}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              onMouseEnter={() => setMoreOpen(true)}
              aria-expanded={moreOpen}
              className="flex items-center gap-1 text-[15px] font-medium text-muted transition-colors hover:text-[var(--foreground)]"
            >
              {t("nav.more")}
              <span className={`text-xs transition-transform ${moreOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-[190px] rounded-2xl border border-[var(--surface-border)] bg-[var(--background)] p-2 shadow-xl">
                {MORE_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  >
                    {t(l.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
            className="btn-tap accent-ring surface-glass flex h-11 w-11 items-center justify-center rounded-full border text-sm lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="surface-glass border-t px-4 py-3 lg:hidden">
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
