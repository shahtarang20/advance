"use client";

import { useEffect } from "react";
import { ZodiacSign, getZodiacInfo } from "@/lib/horoscope";
import { useGamification } from "@/lib/gamification";
import { ShareButtons } from "@/components/ShareButtons";

export function SignCheckin({ sign }: { sign: ZodiacSign }) {
  const { checkinHoroscope, recordAction } = useGamification();

  useEffect(() => {
    checkinHoroscope(sign);
    recordAction("zodiac_profile_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sign]);

  const info = getZodiacInfo(sign);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${origin}/result/horoscope?sign=${sign}`;
  const ogQuery = `type=horoscope&sign=${sign}&title=${encodeURIComponent(info.name)}&subtitle=Daily%20Horoscope`;

  return (
    <div className="mt-6">
      <ShareButtons shareUrl={shareUrl} ogQuery={ogQuery} caption={`My ${info.name} horoscope for today, from Cosmic Numbers. Check yours:`} />
    </div>
  );
}
