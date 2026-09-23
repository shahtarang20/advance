"use client";

import { useTranslation } from "@/lib/I18nContext";
import { ZodiacSign } from "@/lib/horoscope";

/** A tiny client component just for this heading: the English default needs the zodiac sign
 * name substituted into a template, and that name is itself translatable — so unlike a plain
 * `<Trans>` (which only accepts a plain-string replacement), this needs `t()` twice. */
export function HoroscopeSignHeading({ sign, name }: { sign: ZodiacSign; name: string }) {
  const { t } = useTranslation();
  const signLabel = t(`zodiac.${sign}`, { defaultValue: name });
  return (
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
      {t("horoscope.sign_page.title", { name: signLabel, defaultValue: `${name} Horoscope Today` })}
    </h1>
  );
}
