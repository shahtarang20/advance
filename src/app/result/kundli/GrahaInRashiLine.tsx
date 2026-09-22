"use client";

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
  const { t } = useTranslation();
  const grahaLabel = t(`kundli.graha.${graha.toLowerCase()}`, { defaultValue: grahaEnglish });
  const rashiLabel = t(`zodiac.${rashiEnglish.toLowerCase()}`, { defaultValue: rashiEnglish });

  const theme = t(planetThemeKey(graha), { defaultValue: PLANET_THEMES_EN[graha] });
  const flavor = t(rashiFlavorKey(rashi), { defaultValue: RASHI_FLAVOR_EN[rashi] });
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
          defaultValue: `${grahaEnglish} in ${rashiEnglish} (House ${house}):`,
        })}
      </strong>{" "}
      {significance}
    </p>
  );
}
