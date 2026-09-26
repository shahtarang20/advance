"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "./ui/GlassCard";
import { useTranslation } from "@/lib/I18nContext";
import { ShareButtons } from "./ShareButtons";
import { SITE_URL } from "@/lib/site";

const AFFIRMATIONS = [
  "I trust the universe is unfolding exactly as it should.",
  "I am a magnet for miracles and positive cosmic energy.",
  "My intuition leads me to my highest purpose.",
  "I am aligned with the energy of abundance and joy.",
  "Every star in the sky shines to remind me of my own light.",
  "I release what no longer serves me and welcome new beginnings.",
  "I am deeply connected to the rhythms of the earth and the cosmos.",
  "Today, I attract opportunities that align with my destiny.",
  "I embrace the mystery of the unknown with an open heart.",
  "My spirit is infinite, and my potential is boundless."
];

export function getDailyAffirmationIndex() {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return dayOfYear % AFFIRMATIONS.length;
}

export function DailyAffirmation() {
  const { t } = useTranslation();
  const [affirmationIndex, setAffirmationIndex] = useState<number | null>(null);
  const [actualUrl, setActualUrl] = useState("");

  useEffect(() => {
    setAffirmationIndex(getDailyAffirmationIndex());
    if (typeof window !== "undefined") setActualUrl(window.location.origin);
  }, []);

  if (affirmationIndex === null) return null;
  const englishFallback = AFFIRMATIONS[affirmationIndex];
  const translatedText = t(`affirmation.text.${affirmationIndex}`, { defaultValue: englishFallback });

  const shareUrl = actualUrl || SITE_URL;
  const ogQuery = `type=home&title=Cosmic%20Affirmation&subtitle=${encodeURIComponent(translatedText)}`;

  return (
    <GlassCard className="p-6 sm:p-8 relative overflow-hidden group hover:border-[var(--accent-solid)] transition-colors text-center max-w-2xl mx-auto my-8 sm:my-12">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] opacity-5 blur-2xl group-hover:opacity-10 transition-opacity" />
      <div className="relative z-10">
        <p className="text-xs font-semibold tracking-widest text-[var(--accent-solid)] uppercase mb-4">
          {t("affirmation.title", { defaultValue: "Your Daily Affirmation" })}
        </p>
        <p className="text-xl sm:text-2xl italic font-semibold text-[var(--foreground)] leading-relaxed max-w-md mx-auto mb-8">
          &quot;{translatedText}&quot;
        </p>
        
        <div className="max-w-xs mx-auto">
          <ShareButtons 
            shareUrl={shareUrl} 
            ogQuery={ogQuery} 
            caption={t("affirmation.share_caption", { text: translatedText, defaultValue: `My cosmic affirmation for today: "${translatedText}" ✨ Find yours on Cosmic Numbers:` })}
          />
        </div>
      </div>
    </GlassCard>
  );
}
