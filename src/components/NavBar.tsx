"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/numerology", label: "Numerology" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/nakshatra", label: "Nakshatra" },
  { href: "/profile", label: "Profile" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="surface-glass sticky top-0 z-50 border-b backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 text-base font-semibold tracking-tight sm:text-lg">
          <span className="accent-gradient-text">✦ Cosmic Numbers</span>
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition hover:text-[var(--foreground)]">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="btn-tap accent-ring surface-glass flex h-9 w-9 items-center justify-center rounded-full border text-sm sm:hidden"
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
                className="rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-white/5 hover:text-[var(--foreground)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
