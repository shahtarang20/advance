"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { TarotCard } from "@/lib/tarot";
import { useTranslation } from "@/lib/I18nContext";
import { CardAura, AuraType } from "@/components/ui/CardAura";

import { PlayAudioButton } from "@/components/PlayAudioButton";

export type TarotSpreadType = "daily" | "past_present_future" | "love" | "career" | "celtic_cross";

export function TarotSpreadView({
  spread,
  spreadType,
}: {
  spread: { card: TarotCard; isReversed: boolean }[];
  spreadType: TarotSpreadType;
}) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const { t } = useTranslation();

  const getSpreadLabel = (index: number) => {
    if (spreadType === "daily") return t("tarot.label.card_of_day", { defaultValue: "Card of the Day" });
    if (spreadType === "past_present_future") {
      if (index === 0) return t("tarot.label.past", { defaultValue: "Past" });
      if (index === 1) return t("tarot.label.present", { defaultValue: "Present" });
      if (index === 2) return t("tarot.label.future", { defaultValue: "Future" });
    }
    if (spreadType === "love") {
      return t(`tarot.spread.love.lbl.${index}`, { defaultValue: ["You", "Them", "The Dynamic", "Challenge", "Future"][index] });
    }
    if (spreadType === "career") {
      return t(`tarot.spread.career.lbl.${index}`, { defaultValue: ["Current Path", "Strengths", "Obstacles", "Opportunity", "Outcome"][index] });
    }
    if (spreadType === "celtic_cross") {
      return t(`tarot.spread.celtic.lbl.${index}`, { defaultValue: [
        "The Present", "The Challenge", "The Past", "The Future",
        "Conscious", "Subconscious", "Your Influence", "External Influence",
        "Hopes/Fears", "The Outcome"
      ][index] });
    }
    return "";
  };

  const getSpreadSubtitle = (index: number) => {
    if (spreadType === "daily") return t("tarot.sub.card_of_day", { defaultValue: "Your energy for today" });
    if (spreadType === "past_present_future") {
      if (index === 0) return t("tarot.sub.past", { defaultValue: "What led you to this moment" });
      if (index === 1) return t("tarot.sub.present", { defaultValue: "Where you are right now" });
      if (index === 2) return t("tarot.sub.future", { defaultValue: "Where this path is taking you" });
    }
    if (spreadType === "love") {
      return t(`tarot.spread.love.sub.${index}`, { defaultValue: ["Your current state", "Their current state", "The energy between you", "What must be overcome", "Where this is heading"][index] });
    }
    if (spreadType === "career") {
      return t(`tarot.spread.career.sub.${index}`, { defaultValue: ["Where you stand", "What you do best", "What holds you back", "Hidden chances", "Where this leads"][index] });
    }
    if (spreadType === "celtic_cross") {
      return t("tarot.spread.celtic.sub", { pos: String(index + 1), defaultValue: `Position ${index + 1}` });
    }
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

  const getAuraType = (card: TarotCard, isReversed: boolean): AuraType => {
    if (card.name === "Death" || card.name === "The Devil" || card.name === "The Tower") return "dark";
    if (isReversed) return "mystic"; 
    if (card.element === "Fire") return "fire";
    if (card.element === "Water") return "water";
    if (card.element === "Earth") return "earth";
    if (card.element === "Air") return "air";
    return "mystic";
  };

  let gridClass = "grid gap-8 w-full grid-cols-1 md:grid-cols-3 relative";
  if (spread.length === 1) gridClass = "grid gap-8 w-full grid-cols-1 max-w-sm mx-auto";
  if (spread.length === 5) gridClass = "grid gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
  if (spread.length === 10) gridClass = "grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5";



  return (
    <div className={gridClass}>
      {spread.length === 1 && (
        <CardAura 
          type={getAuraType(spread[0].card, spread[0].isReversed)} 
          isActive={!!flippedCards[0]} 
        />
      )}
      {spread.map((item, i) => (
        <div key={i} className="flex flex-col gap-4 text-center relative z-10">
          <div>
            <h3 className="text-xl font-medium tracking-tight text-[var(--accent-solid)]">{getSpreadLabel(i)}</h3>
            <p className="text-xs text-muted-soft mt-1 tracking-wider uppercase">{getSpreadSubtitle(i)}</p>
          </div>
          <FlipCard
            ariaLabel={`Tarot Card: ${item.card.name}`}
            heightClassName="h-[450px]"
            onFlip={(isFlipped) => {
              setFlippedCards(prev => ({ ...prev, [i]: isFlipped }));
            }}
            front={
              <GlassCard className={`flex h-full w-full flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-[var(--accent-solid)] transition-colors border-2 border-dashed`}>
                <div className="text-6xl mb-4 opacity-50">✨</div>
                <p className="text-sm font-medium text-muted-soft tracking-widest uppercase">
                  {t("tarot.card.tap_reveal", { defaultValue: "Tap to Reveal" })}
                </p>
              </GlassCard>
            }
            back={
              <GlassCard className={`flex h-full w-full flex-col overflow-y-auto p-6 relative`}>
                <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3 mb-3 shrink-0">
                  <span className={`text-3xl ${item.isReversed ? 'inline-block rotate-180 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]' : ''}`}>{item.card.imageFallback}</span>
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
