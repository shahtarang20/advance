"use client";

import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/I18nContext";
import { ZodiacSign } from "@/lib/horoscope";

export function SeeFullSignPageButton({ sign, name }: { sign: ZodiacSign; name: string }) {
  const { t } = useTranslation();
  const signLabel = t(`zodiac.${sign}`, { defaultValue: name });
  return (
    <Button href={`/horoscope/${sign}`}>
      {t("horoscope.result.see_full_page", { name: signLabel, defaultValue: `See Full ${name} Page →` })}
    </Button>
  );
}
