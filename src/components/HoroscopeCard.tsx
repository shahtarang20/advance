"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { DailyHoroscope, ZODIAC_SIGNS, ZodiacInfo } from "@/lib/horoscope";
import { useTranslation } from "@/lib/I18nContext";

function signName(sign: string) {
  return ZODIAC_SIGNS.find((z) => z.sign === sign)?.name ?? sign;
}

export function HoroscopeCard({ info, horoscope }: { info: ZodiacInfo; horoscope: DailyHoroscope }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
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
            <h2 className="mt-6 text-3xl font-bold tracking-tight">{t(`zodiac.${info.sign}`)}</h2>
            <p className="mt-1 text-sm text-muted">
              {info.symbol} · {info.dateRange}
            </p>
            <p className="mt-6 text-xs text-muted-soft">{t("horoscope.card.tap_reveal")}</p>
          </GlassCard>
        }
        back={
          <GlassCard className="flex h-full w-full flex-col overflow-y-auto p-6">
            <p className="text-sm text-muted-soft">{t(`zodiac.${info.sign}`)} · {horoscope.dateKey}</p>
            <div className="mx-auto mt-4 flex w-full max-w-xs justify-around text-center">
              <div>
                <p className="text-lg font-semibold text-amber-600">{horoscope.mood}</p>
                <p className="text-xs text-muted-soft">{t("horoscope.card.mood")}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-purple-600">{horoscope.luckyNumber}</p>
                <p className="text-xs text-muted-soft">{t("horoscope.card.lucky_number")}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-indigo-600">{horoscope.luckyColor}</p>
                <p className="text-xs text-muted-soft">{t("horoscope.card.lucky_color")}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2.5">
                <p className="font-semibold text-rose-600">{info.element}</p>
                <p className="text-muted-soft">{t("horoscope.card.element")}</p>
              </div>
              <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2.5">
                <p className="font-semibold text-emerald-600">{info.modality}</p>
                <p className="text-muted-soft">{t("horoscope.card.modality")}</p>
              </div>
              <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2.5">
                <p className="font-semibold text-sky-600">{info.rulingPlanet}</p>
                <p className="text-muted-soft">{t("horoscope.card.ruler")}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">{horoscope.summary}</p>
          </GlassCard>
        }
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <GlassCard className="p-6 sm:p-7">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-rose-700">{t("horoscope.card.love")}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{horoscope.love}</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-7">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-emerald-700">{t("horoscope.card.career")}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{horoscope.career}</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-7">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-sky-700">{t("horoscope.card.health")}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{horoscope.health}</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">{t("horoscope.card.about", { name: t(`zodiac.${info.sign}`) })}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted">{info.about}</p>
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
