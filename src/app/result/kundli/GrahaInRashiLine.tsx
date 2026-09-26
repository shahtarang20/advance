"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/I18nContext";
import { planetInRashiSignificance, PLANET_THEMES_EN, RASHI_FLAVOR_EN, planetThemeKey, rashiFlavorKey } from "@/lib/kundliInterpretations";
import type { Graha, Rashi } from "@/lib/kundli";

export function GrahaInRashiLine({
  graha,
  grahaEnglish,
  rashi,
  rashiEnglish,
  house,
}: {
  graha: Graha;
  grahaEnglish: string;
  rashi: Rashi;
  rashiEnglish: string;
  house: number;
}) {
  const { t, language } = useTranslation();
  const [dbFlavor, setDbFlavor] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/kundli?lang=${language}&category=rashiFlavor&rashi_id=${rashiEnglish.toLowerCase()}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setDbFlavor(data[0].meaning);
      })
      .catch(console.error);
  }, [rashiEnglish, language]);

  const grahaLabel = t(`kundli.graha.${graha.toLowerCase()}`, { defaultValue: grahaEnglish });
  const rashiLabel = t(`zodiac.${rashiEnglish.toLowerCase()}`, { defaultValue: rashiEnglish });

  const theme = t(planetThemeKey(graha), { defaultValue: PLANET_THEMES_EN[graha] });
  const flavor = dbFlavor || t(rashiFlavorKey(rashi), { defaultValue: RASHI_FLAVOR_EN[rashi] });
  const significance = t("kundli.result.graha_significance_template", {
    graha: grahaLabel,
    rashi: rashiLabel,
    theme,
    flavor,
    themeFirst: theme.split(/[,،、]/)[0].trim(),
    defaultValue: planetInRashiSignificance(graha, rashi),
  });

  return (
    <p className="text-sm leading-relaxed text-muted">
      <strong className="text-[var(--foreground)]">
        {t("kundli.result.graha_in_rashi_house", {
          graha: grahaLabel,
          rashi: rashiLabel,
          house: String(house),
          defaultValue: `${grahaLabel} in ${rashiLabel} (House ${house}):`,
        })}
      </strong>{" "}
      {significance}
    </p>
  );
}
