import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscope";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--surface-border)] bg-[var(--surface)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--foreground)]">Tools</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/numerology" className="hover:text-[var(--foreground)]">Numerology Calculator</Link></li>
              <li><Link href="/horoscope" className="hover:text-[var(--foreground)]">Daily Horoscope</Link></li>
              <li><Link href="/compatibility" className="hover:text-[var(--foreground)]">Compatibility Calculator</Link></li>
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h3 className="mb-4 text-base font-semibold text-[var(--foreground)]">Daily Horoscope by Sign</h3>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {ZODIAC_SIGNS.map((z) => (
                <Link key={z.sign} href={`/horoscope/${z.sign}`} className="text-sm text-muted hover:text-[var(--foreground)]">
                  {z.glyph} {z.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-3 text-xs text-muted-soft">
            <Link href="/privacy" className="hover:text-muted">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-muted">Terms of Service</Link>
          </div>
          <p className="text-xs text-muted-soft">
            © {new Date().getFullYear()} Cosmic Numbers. For entertainment purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
