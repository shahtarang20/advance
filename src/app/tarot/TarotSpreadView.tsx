"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { TarotCard } from "@/lib/tarot";
import { useTranslation } from "@/lib/I18nContext";

import { PlayAudioButton } from "@/components/PlayAudioButton";

export type TarotSpreadType = "daily" | "past_present_future";

export function TarotSpreadView({
  spread,
  spreadType,
}: {
  spread: { card: TarotCard; isReversed: boolean }[];
  spreadType: TarotSpreadType;
}) {
  const { t } = useTranslation();

  const getSpreadLabel = (index: number) => {
    if (spreadType === "daily") return t("tarot.label.card_of_day", { defaultValue: "Card of the Day" });
    if (index === 0) return t("tarot.label.past", { defaultValue: "Past" });
    if (index === 1) return t("tarot.label.present", { defaultValue: "Present" });
    if (index === 2) return t("tarot.label.future", { defaultValue: "Future" });
    return "";
  };

  const getSpreadSubtitle = (index: number) => {
    if (spreadType === "daily") return t("tarot.sub.card_of_day", { defaultValue: "Your energy for today" });
    if (index === 0) return t("tarot.sub.past", { defaultValue: "What led you to this moment" });
    if (index === 1) return t("tarot.sub.present", { defaultValue: "Where you are right now" });
    if (index === 2) return t("tarot.sub.future", { defaultValue: "Where this path is taking you" });
    return "";
  };

  const getCardAudioText = (item: { card: TarotCard; isReversed: boolean }) => {
    const name = t(`tarot.name.${item.card.id}`, { defaultValue: item.card.name });
    const reversed = item.isReversed ? `(${t("tarot.card.reversed", { defaultValue: "Reversed" })})` : "";
    const meaning = item.isReversed
      ? t(`tarot.reversed.${item.card.id}`, { defaultValue: item.card.reversedMeaning })
      : t(`tarot.upright.${item.card.id}`, { defaultValue: item.card.uprightMeaning });
    const desc = t(`tarot.desc.${item.card.id}`, { defaultValue: item.card.description });
    return `${name} ${reversed}. ${meaning}. ${desc}`;
  };

  return (
    <div className={`grid gap-8 w-full ${spread.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : "grid-cols-1 md:grid-cols-3"}`}>
      {spread.map((item, i) => (
        <div key={i} className="flex flex-col gap-4 text-center">
          <div>
            <h3 className="text-xl font-medium tracking-tight text-[var(--accent-solid)]">{getSpreadLabel(i)}</h3>
            <p className="text-xs text-muted-soft mt-1 tracking-wider uppercase">{getSpreadSubtitle(i)}</p>
          </div>
          <FlipCard
            ariaLabel={`Tarot Card: ${item.card.name}`}
            heightClassName="h-[450px]"
            front={
              <GlassCard className="flex h-full w-full flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-[var(--accent-solid)] transition-colors border-2 border-dashed">
                <div className="text-6xl mb-4 opacity-50">✨</div>
                <p className="text-sm font-medium text-muted-soft tracking-widest uppercase">
                  {t("tarot.card.tap_reveal", { defaultValue: "Tap to Reveal" })}
                </p>
              </GlassCard>
            }
            back={
              <GlassCard className="flex h-full w-full flex-col overflow-y-auto p-6 relative">
                <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3 mb-3 shrink-0">
                  <span className="text-3xl">{item.card.imageFallback}</span>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <PlayAudioButton textToRead={getCardAudioText(item)} className="h-8 w-8" />
                      <div className="text-right">
                        <p className="text-xs font-bold tracking-widest text-muted-soft">{item.card.numeral}</p>
                        <h4 className="text-lg font-bold tracking-tight">
                          {t(`tarot.name.${item.card.id}`, { defaultValue: item.card.name })}
                          {item.isReversed && (
                            <span className="text-rose-500 text-xs ml-2">({t("tarot.card.reversed", { defaultValue: "Reversed" })})</span>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 scroll-thin">
                  <p className="text-[13px] font-medium text-indigo-400 mb-3 leading-relaxed">
                    {item.isReversed
                      ? t(`tarot.reversed.${item.card.id}`, { defaultValue: item.card.reversedMeaning })
                      : t(`tarot.upright.${item.card.id}`, { defaultValue: item.card.uprightMeaning })}
                  </p>
                  <p className="text-[13px] text-muted leading-relaxed">{t(`tarot.desc.${item.card.id}`, { defaultValue: item.card.description })}</p>
                </div>
              </GlassCard>
            }
          />
        </div>
      ))}
    </div>
  );
}
