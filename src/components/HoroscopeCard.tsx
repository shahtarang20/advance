"use client";

import { PlayAudioButton } from "@/components/PlayAudioButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import {
  DailyHoroscope,
  ZODIAC_SIGNS,
  ZodiacInfo,
  moodKey,
  luckyColorKey,
  elementKey,
  modalityKey,
  rulingPlanetKey,
  symbolKey,
  aboutKey,
  loveKey,
  careerKey,
  healthKey,
} from "@/lib/horoscope";
import { useTranslation } from "@/lib/I18nContext";

function signName(sign: string) {
  return ZODIAC_SIGNS.find((z) => z.sign === sign)?.name ?? sign;
}

export function HoroscopeCard({ info, horoscope }: { info: ZodiacInfo; horoscope: DailyHoroscope }) {
  const { t } = useTranslation();

  const mood = t(moodKey(horoscope.mood), { defaultValue: horoscope.mood });
  const luckyColor = t(luckyColorKey(horoscope.luckyColor), { defaultValue: horoscope.luckyColor });
  const element = t(elementKey(info.element), { defaultValue: info.element });
  const modality = t(modalityKey(info.modality), { defaultValue: info.modality });
  const rulingPlanet = t(rulingPlanetKey(info.rulingPlanet), { defaultValue: info.rulingPlanet });
  const love = t(loveKey(info.sign, horoscope.loveIndex), { defaultValue: horoscope.love });
  const career = t(careerKey(info.sign, horoscope.careerIndex), { defaultValue: horoscope.career });
  const health = t(healthKey(info.sign, horoscope.healthIndex), { defaultValue: horoscope.health });
  const signLabel = t(`zodiac.${info.sign}`);
  const summary = t("horoscope.summary_template", {
    name: signLabel,
    mood: mood.toLowerCase(),
    love,
    defaultValue: `${signLabel} is feeling ${mood.toLowerCase()} today. ${love}`,
  });

  const fullReading = `${summary} ${t("horoscope.card.love")}: ${love} ${t("horoscope.card.career")}: ${career} ${t("horoscope.card.health")}: ${health}`;

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <PlayAudioButton textToRead={fullReading} className="h-14 w-14" />
      </div>
      <FlipCard
        ariaLabel={`${info.name} horoscope card`}
        className="mx-auto max-w-sm"
        heightClassName="h-[420px]"
        front={
          <GlassCard className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
            <p className="text-sm text-muted-soft">{horoscope.dateKey}</p>
            <div className="mt-4 text-9xl leading-none drop-shadow-[0_4px_24px_rgba(124,58,237,0.35)]">
              {info.glyph}
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">{signLabel}</h2>
            <p className="mt-1 text-sm text-muted">
              {t(symbolKey(info.sign), { defaultValue: info.symbol })} · {info.dateRange}
            </p>
            <p className="mt-6 text-xs text-muted-soft">{t("horoscope.card.tap_reveal")}</p>
          </GlassCard>
        }
        back={
          <GlassCard className="flex h-full w-full flex-col overflow-y-auto p-6">
            <p className="text-sm text-muted-soft">{signLabel} · {horoscope.dateKey}</p>
            <div className="mx-auto mt-4 flex w-full max-w-xs justify-around text-center">
              <div>
                <p className="text-lg font-semibold text-amber-600">{mood}</p>
                <p className="text-xs text-muted-soft">{t("horoscope.card.mood")}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-purple-600">{horoscope.luckyNumber}</p>
                <p className="text-xs text-muted-soft">{t("horoscope.card.lucky_number")}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-indigo-600">{luckyColor}</p>
                <p className="text-xs text-muted-soft">{t("horoscope.card.lucky_color")}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2.5">
                <p className="font-semibold text-rose-600">{element}</p>
                <p className="text-muted-soft">{t("horoscope.card.element")}</p>
              </div>
              <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2.5">
                <p className="font-semibold text-emerald-600">{modality}</p>
                <p className="text-muted-soft">{t("horoscope.card.modality")}</p>
              </div>
              <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2.5">
                <p className="font-semibold text-sky-600">{rulingPlanet}</p>
                <p className="text-muted-soft">{t("horoscope.card.ruler")}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">{summary}</p>
          </GlassCard>
        }
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <GlassCard className="p-6 sm:p-7">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-rose-700">{t("horoscope.card.love")}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{love}</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-7">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-emerald-700">{t("horoscope.card.career")}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{career}</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-7">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-sky-700">{t("horoscope.card.health")}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{health}</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">{t("horoscope.card.about", { name: signLabel })}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted">{t(aboutKey(info.sign), { defaultValue: info.about })}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-emerald-700">{t("horoscope.card.most_compatible")}</p>
            <p className="mt-1 text-sm text-muted">{info.mostCompatible.map(s => t(`zodiac.${s}`)).join(", ")}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-rose-700">{t("horoscope.card.least_compatible")}</p>
            <p className="mt-1 text-sm text-muted">{info.leastCompatible.map(s => t(`zodiac.${s}`)).join(", ")}</p>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted-soft">
          {t("horoscope.card.disclaimer")}
        </p>
      </GlassCard>
    </div>
  );
}
