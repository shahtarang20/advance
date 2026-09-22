import type { Metadata } from "next";
import { NakshatraGrid } from "./NakshatraGrid";
import { Trans } from "@/components/Trans";

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
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl"><Trans tKey="nak.page.title" /></h1>
        <p className="mt-4 text-muted">
          <Trans tKey="nak.page.desc" />
        </p>
        <p className="mt-3 text-xs text-muted-soft">
          <Trans tKey="nak.page.note" />
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-5xl">
        <NakshatraGrid />
      </div>
    </div>
  );
}
