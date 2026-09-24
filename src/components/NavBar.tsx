"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/I18nContext";
import { LanguageToggle } from "./LanguageToggle";
import { useGamification, LockableFeature } from "@/lib/gamification";
import { useLoveMatchHighlight, markLoveMatchSeen } from "@/lib/loveMatchHighlight";
import { hasSeenOnboarding } from "@/lib/onboarding";

/** A small tapping-finger animation that sits on top of a highlighted button — the sparkle ring
 * (`feature-highlight-pulse`) alone draws the eye, but doesn't tell a first-time visitor what to
 * actually *do* with it. This repeatedly "presses" down and fades in a loop, mimicking a real
 * tap gesture, so the invitation to interact is unambiguous. */
function TapHandHint() {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-3 -right-2 z-10 select-none text-2xl drop-shadow"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-6, 2, 2, -6], scale: [1, 0.88, 0.88, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.6, 1] }}
    >
      👆
    </motion.span>
  );
}

const emptySubscribe = () => () => {};

const LINKS = [
  { href: "/palmistry", labelKey: "nav.palmistry" },
  { href: "/tarot", labelKey: "nav.tarot" },
  { href: "/kundli", labelKey: "nav.kundli" },
  { href: "/horoscope", labelKey: "nav.horoscope" },
  { href: "/compatibility", labelKey: "nav.compatibility" },
  { href: "/nakshatra", labelKey: "nav.nakshatra" },
  { href: "/numerology", labelKey: "nav.numerology" },
  { href: "/aura", labelKey: "nav.aura" },
  { href: "/biorhythm", labelKey: "nav.biorhythm" },
  { href: "/dreams", labelKey: "nav.dreams" },
  { href: "/profile", labelKey: "nav.profile" },
];

// Numerology, Aura, Biorhythm, and Dreams are progressively unlocked via a daily-checkin
// streak (see src/lib/gamification.tsx) and stay out of the nav entirely until then.
const LOCKABLE_HREFS: Record<string, LockableFeature> = {
  "/numerology": "numerology",
  "/aura": "aura",
  "/biorhythm": "biorhythm",
  "/dreams": "dreams",
};

// Only the highest-traffic tools show inline on desktop; the rest live under "More" so the
// header stays readable instead of cramming 9+ links into one row even on a laptop screen.
const PRIMARY_HREFS = ["/palmistry", "/numerology", "/horoscope", "/kundli", "/tarot"];

export function NavBar() {
  const { t } = useTranslation();
  const { isFeatureUnlocked } = useGamification();
  const showLoveMatchHighlight = useLoveMatchHighlight();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [hamburgerHighlight, setHamburgerHighlight] = useState(false);
  const [languageHighlight, setLanguageHighlight] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Waits for the site-wide welcome tour to be dismissed before showing its own highlight ring
  // on the language toggle — that tour already covers the nav in its own step, so on a genuinely
  // first-time visitor both used to render their own pulsing cue at once, which looked redundant.
  // Polling for `hasSeenOnboarding()` (same pattern as PageFeatureHint) means this simply waits,
  // however long that takes, until the tour is out of the way before showing its own nudge.
  //
  // The two hints are deliberately sequenced, never shown together: language first (it's the
  // very first thing worth personalizing), and only once the user has actually tapped it does
  // the same hand-tap nudge move on to the hamburger menu. A returning visitor who's already
  // cleared one of the two picks up wherever they left off, never seeing a hint twice.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const languageSeen = window.localStorage.getItem("cosmic-seen-language-hint");
    const hamburgerSeen = window.localStorage.getItem("cosmic-seen-hamburger");
    if (languageSeen && hamburgerSeen) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const attempt = () => {
      // We no longer wait for the big onboarding tour, we just show the hand gesture immediately.
      if (!languageSeen) setLanguageHighlight(true);
      else if (!hamburgerSeen) setHamburgerHighlight(true);
      return true;
    };
    const initial = setTimeout(() => {
      if (attempt()) return;
      interval = setInterval(() => {
        if (attempt() && interval) clearInterval(interval);
      }, 400);
    }, 500);
    return () => {
      clearTimeout(initial);
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleHamburgerClick = () => {
    setMenuOpen((v) => !v);
    if (hamburgerHighlight) {
      setHamburgerHighlight(false);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("cosmic-seen-hamburger", "1");
      }
    }
  };

  // Any click inside the language toggle (opening the dropdown, whether or not a different
  // language actually gets picked) both retires this hint for good and immediately hands the
  // same tap-hand nudge off to the hamburger menu — the sequence the guide is meant to follow.
  const handleLanguageAreaClick = () => {
    if (!languageHighlight) return;
    setLanguageHighlight(false);
    try {
      window.localStorage.setItem("cosmic-seen-language-hint", "1");
    } catch {
      // Best-effort only.
    }
    if (!window.localStorage.getItem("cosmic-seen-hamburger")) {
      setHamburgerHighlight(true);
    }
  };

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  const visibleLinks = LINKS.filter((l) => {
    const feature = LOCKABLE_HREFS[l.href];
    return !feature || isFeatureUnlocked(feature);
  });
  const primaryLinks = visibleLinks.filter((l) => PRIMARY_HREFS.includes(l.href));
  const moreLinks = visibleLinks.filter((l) => !primaryLinks.includes(l));

  return (
    <header className="surface-glass dark:backdrop-blur-xl sticky top-0 z-50 border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-[var(--foreground)] sm:text-lg">
          <span className="text-[var(--accent-solid)]">✦</span> {t("nav.title")}
        </Link>
        <div data-tour="nav-links" className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((l) => (
            <Link 
              key={l.href} 
              href={l.href} 
              onClick={() => { if (l.href === "/compatibility") markLoveMatchSeen(); }}
              className={`text-[15px] font-medium text-muted transition-colors hover:text-[var(--foreground)] ${
                l.href === "/compatibility" && showLoveMatchHighlight ? "feature-highlight-pulse rounded-md px-2 py-1" : ""
              }`}
            >
              {t(l.labelKey)}
            </Link>
          ))}
          {moreLinks.length > 0 && (
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
                {moreLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => {
                      setMoreOpen(false);
                      if (l.href === "/compatibility") markLoveMatchSeen();
                    }}
                    className={`block rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-[var(--surface)] hover:text-[var(--foreground)] ${
                      l.href === "/compatibility" && showLoveMatchHighlight ? "feature-highlight-pulse" : ""
                    }`}
                  >
                    {t(l.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div
            data-tour="language-toggle"
            onClick={handleLanguageAreaClick}
            className={`relative ${languageHighlight ? "feature-highlight-pulse rounded-full" : ""}`}
          >
            <LanguageToggle />
            {languageHighlight && <TapHandHint />}
          </div>
          <button
            data-tour="theme-toggle"
            aria-label={mounted ? (isDark ? t("theme.switch.light") : t("theme.switch.dark")) : t("theme.toggle")}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="btn-tap accent-ring surface-glass flex h-11 w-11 items-center justify-center rounded-full border text-base"
          >
            {mounted ? (isDark ? "☀️" : "🌙") : "•"}
          </button>
          <button
            data-tour="menu-button"
            aria-label={menuOpen ? t("menu.close") : t("menu.open")}
            aria-expanded={menuOpen}
            onClick={handleHamburgerClick}
            className={`btn-tap accent-ring surface-glass relative flex h-11 w-11 items-center justify-center rounded-full border text-sm lg:hidden ${
              hamburgerHighlight ? "feature-highlight-pulse" : ""
            }`}
          >
            {menuOpen ? "✕" : "☰"}
            {hamburgerHighlight && <TapHandHint />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="surface-glass border-t px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {visibleLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => {
                  setMenuOpen(false);
                  if (l.href === "/compatibility") markLoveMatchSeen();
                }}
                className={`flex min-h-[44px] items-center rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-[var(--surface)] hover:text-[var(--foreground)] ${
                  l.href === "/compatibility" && showLoveMatchHighlight ? "feature-highlight-pulse" : ""
                }`}
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
