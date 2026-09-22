import type { Metadata } from "next";
import { HoroscopeTool } from "./HoroscopeTool";

export const metadata: Metadata = {
  title: "Daily Horoscope Today — All 12 Zodiac Signs",
  description:
    "Read your free daily horoscope for love, career, and health, plus your lucky number and color for today. Covers all 12 zodiac signs, updated daily.",
  alternates: { canonical: "/horoscope" },
  openGraph: {
    title: "Daily Horoscope Today",
    description: "Free daily horoscope for all 12 zodiac signs — love, career, health, lucky number & color.",
    images: [{ url: "/api/og?type=horoscope&title=Daily%20Horoscope&subtitle=All%2012%20zodiac%20signs" }],
  },
};

export default function HoroscopePage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Daily Horoscope</h1>
        <p className="mt-4 text-muted">
          Pick your zodiac sign, or enter your date of birth, to get today&apos;s
          reading — refreshed once every day for everyone.
        </p>
      </div>
      <div className="mt-12">
        <HoroscopeTool />
      </div>
    </div>
  );
}
