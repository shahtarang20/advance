import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { CompatibilityResult } from "@/lib/compatibility";
import { useTranslation } from "@/lib/I18nContext";

import { PlayAudioButton } from "@/components/PlayAudioButton";

export function CompatibilityCard({ result }: { result: CompatibilityResult }) {
  const { t } = useTranslation();
  
  const audioText = `${t("comp.card.match", { nameA: result.nameA, nameB: result.nameB, percentage: result.percentage.toString() })}. ${t(result.verdict)}`;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PlayAudioButton textToRead={audioText} className="h-14 w-14" />
      </div>
      <FlipCard
        ariaLabel={`${result.nameA} and ${result.nameB} compatibility: ${result.percentage}% match`}
        className="mx-auto max-w-sm"
        heightClassName="h-80"
        front={
          <GlassCard className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-soft">{t("comp.card.title")}</p>
            <h2 className="mt-2 text-xl font-semibold">
              {result.nameA} <span className="text-muted-soft">&amp;</span> {result.nameB}
            </h2>
            <p className="accent-gradient-text mt-4 text-7xl font-bold">{result.percentage}%</p>
            <p className="mt-4 text-[11px] text-muted-soft">{t("comp.card.tap_reveal")}</p>
          </GlassCard>
        }
        back={
          <GlassCard className="flex h-full w-full flex-col items-center justify-center overflow-y-auto p-6 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-soft">
              {t("comp.card.match", { nameA: result.nameA, nameB: result.nameB, percentage: result.percentage.toString() })}
            </p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted">{t(result.verdict)}</p>
          </GlassCard>
        }
      />

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-soft">{t("comp.card.core_numbers")}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <GlassCard className="p-6 text-center">
            <p className="text-xs text-muted-soft">{t("comp.card.life_path", { name: result.nameA })}</p>
            <p className="accent-gradient-text mt-1 text-4xl font-bold">{result.lifePathA}</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <p className="text-xs text-muted-soft">{t("comp.card.life_path", { name: result.nameB })}</p>
            <p className="accent-gradient-text mt-1 text-4xl font-bold">{result.lifePathB}</p>
          </GlassCard>
        </div>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-600">{t("comp.card.why_score")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {t("comp.card.why_score_desc")}
        </p>
      </GlassCard>
    </div>
  );
}
