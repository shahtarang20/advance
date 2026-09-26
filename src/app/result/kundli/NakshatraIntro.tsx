"use client";

import { useTranslation } from "@/lib/I18nContext";

export function NakshatraIntro({
  name,
  ruler,
  deity,
  symbol,
}: {
  name: string;
  ruler: string;
  deity: string;
  symbol: string;
}) {
  const { t } = useTranslation();
  
  const rulerLabel = t(`kundli.graha.${ruler.toLowerCase()}`, { defaultValue: ruler });
  
  return (
    <>
      {t("kundli.result.nakshatra_intro", {
        name,
        ruler: rulerLabel,
        deity,
        symbol,
        defaultValue: `Your Janam Nakshatra is ${name}, ruled by ${rulerLabel}, with the deity ${deity} and symbol ${symbol}.`,
      })}
    </>
  );
}
