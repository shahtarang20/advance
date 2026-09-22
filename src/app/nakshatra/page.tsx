import type { Metadata } from "next";
import { NakshatraGrid } from "./NakshatraGrid";

export const metadata: Metadata = {
  title: "27 Nakshatras — Vedic Birth Star Reference Guide",
  description:
    "Browse all 27 Nakshatras (Vedic lunar mansions) from Ashwini to Revati, with ruling deity, planet, symbol, and traditional meaning for each. Educational reference, not a calculator.",
  alternates: { canonical: "/nakshatra" },
  openGraph: {
    title: "27 Nakshatras — Vedic Birth Star Reference",
    description: "Explore the 27 traditional Vedic Nakshatras and their deities, planets, and meanings.",
    images: [{ url: "/api/og?type=nakshatra&title=27%20Nakshatras&subtitle=Vedic%20Birth%20Star%20Reference&big=%E2%9C%A6" }],
  },
};

export default function NakshatraPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">The 27 Nakshatras</h1>
        <p className="mt-4 text-muted">
          The Nakshatras are the 27 traditional &quot;lunar mansions&quot; of Vedic astrology, each with its own
          ruling deity, planet, symbol, and character.
        </p>
        <p className="mt-3 text-xs text-muted-soft">
          This is an educational reference and manual-selection tool, not a calculator — your true birth Nakshatra
          depends on the Moon&apos;s precise position at your exact birth time, which requires real ephemeris data we
          don&apos;t compute here. If you already know your Nakshatra from a Vedic birth chart, find it below.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-5xl">
        <NakshatraGrid />
      </div>
    </div>
  );
}
