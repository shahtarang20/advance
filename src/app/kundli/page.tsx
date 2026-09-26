import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { KundliTool } from "./KundliTool";
import { Trans } from "@/components/Trans";

export const metadata: Metadata = {
  title: "Free Kundli Maker — Vedic Birth Chart & Janam Kundli Online",
  description:
    "Generate your real Janam Kundli (Vedic birth chart) free — Lagna, Rashi, and Nakshatra for all 9 grahas, calculated from real planetary positions using the Lahiri ayanamsa and whole-sign houses.",
  alternates: { canonical: "/kundli" },
  openGraph: {
    title: "Free Kundli Maker — Vedic Birth Chart",
    description: "Generate your real Janam Kundli with accurate planetary positions, Lagna, and Nakshatra.",
    images: [{ url: `/api/og?type=kundli&title=Kundli%20Maker&subtitle=Your%20Vedic%20Birth%20Chart&ext=.png` }],
  },
};

export default function KundliPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <Trans tKey="kundli.page.title" replacements={{ defaultValue: "Free Kundli Maker" }} />
        </h1>
        <p className="mt-4 text-muted">
          <Trans
            tKey="kundli.page.desc"
            replacements={{
              defaultValue:
                "Generate your Janam Kundli — a real Vedic birth chart calculated from actual planetary positions at your exact birth moment and place, using the Lahiri ayanamsa and whole-sign houses.",
            }}
          />
        </p>
        <p className="mt-3 text-xs text-muted-soft">
          <Trans
            tKey="kundli.page.time_note"
            replacements={{
              defaultValue:
                "Even a few minutes’ difference in birth time can change your Lagna (ascendant) and house placements — please use your birth certificate or hospital record time if you have it, for the most accurate chart.",
            }}
          />
        </p>
      </div>
      <div className="mt-12">
        <KundliTool />
      </div>
    </div>
  );
}
