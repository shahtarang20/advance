import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDailyHoroscope, getZodiacInfo, ZODIAC_SIGNS, ZodiacSign, blurbKey } from "@/lib/horoscope";
import { HoroscopeCard } from "@/components/HoroscopeCard";
import { SignCheckin } from "./SignCheckin";
import { Trans } from "@/components/Trans";
import { HoroscopeSignHeading } from "./HoroscopeSignHeading";

export const revalidate = 3600; // refresh hourly so "today's" horoscope stays current

export function generateStaticParams() {
  return ZODIAC_SIGNS.map((z) => ({ sign: z.sign }));
}

function isValidSign(sign: string): sign is ZodiacSign {
  return ZODIAC_SIGNS.some((z) => z.sign === sign);
}

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }): Promise<Metadata> {
  const { sign } = await params;
  if (!isValidSign(sign)) return {};
  const info = getZodiacInfo(sign);
  const title = `${info.name} Daily Horoscope Today — Love, Career & Health`;
  const description = `Today's free ${info.name} horoscope: love, career, and health insights plus lucky number and color. ${info.blurb}`;
  return {
    title,
    description,
    alternates: { canonical: `/horoscope/${info.sign}` },
    openGraph: {
      title,
      description,
      images: [{ url: `/api/og?type=horoscope&sign=${info.sign}&title=${encodeURIComponent(info.name)}&subtitle=Daily%20Horoscope&ext=.png` }],
    },
  };
}

export default async function SignPage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  if (!isValidSign(sign)) notFound();
  const info = getZodiacInfo(sign);
  const horoscope = getDailyHoroscope(sign);

  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <HoroscopeSignHeading sign={info.sign} name={info.name} />
        <p className="mt-4 text-muted">
          <Trans tKey={blurbKey(info.sign)} replacements={{ defaultValue: info.blurb }} />
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <HoroscopeCard info={info} horoscope={horoscope} />
        <SignCheckin sign={info.sign} />
      </div>
    </div>
  );
}
