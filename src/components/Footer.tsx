import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscope";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/20 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Tools</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/numerology" className="hover:text-white">Numerology Calculator</Link></li>
              <li><Link href="/horoscope" className="hover:text-white">Daily Horoscope</Link></li>
              <li><Link href="/compatibility" className="hover:text-white">Compatibility Calculator</Link></li>
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Daily Horoscope by Sign</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {ZODIAC_SIGNS.map((z) => (
                <Link key={z.sign} href={`/horoscope/${z.sign}`} className="text-sm text-muted hover:text-white">
                  {z.glyph} {z.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
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
