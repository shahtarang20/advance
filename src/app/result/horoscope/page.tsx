import type { Metadata } from "next";
import Link from "next/link";
import { getDailyHoroscope, getZodiacInfo, ZODIAC_SIGNS, ZodiacSign } from "@/lib/horoscope";
import { HoroscopeCard } from "@/components/HoroscopeCard";
import { Button } from "@/components/ui/Button";

type SP = { sign?: string };

function isValidSign(sign?: string): sign is ZodiacSign {
  return !!sign && ZODIAC_SIGNS.some((z) => z.sign === sign);
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { sign } = await searchParams;
  if (!isValidSign(sign)) return { title: "Daily Horoscope" };
  const info = getZodiacInfo(sign);
  const horoscope = getDailyHoroscope(sign);
  const title = `${info.name} Horoscope Today — ${horoscope.mood} Day Ahead`;
  const description = `${info.name}: ${horoscope.love}`;
  const ogUrl = `/api/og?type=horoscope&sign=${sign}&title=${encodeURIComponent(info.name)}&subtitle=${encodeURIComponent(horoscope.mood + " day")}`;
  return {
    title,
    description,
    alternates: { canonical: `/result/horoscope?sign=${sign}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function HoroscopeResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { sign } = await searchParams;

  if (!isValidSign(sign)) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-muted">No horoscope found.</p>
        <Link href="/horoscope" className="mt-4 inline-block text-purple-300 underline">
          Read today&apos;s horoscope →
        </Link>
      </div>
    );
  }

  const info = getZodiacInfo(sign);
  const horoscope = getDailyHoroscope(sign);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-16">
      <HoroscopeCard info={info} horoscope={horoscope} />
      <div className="mt-10 text-center">
        <Button href={`/horoscope/${sign}`}>See Full {info.name} Page →</Button>
      </div>
    </div>
  );
}
