"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { Button } from "@/components/ui/Button";
import { pullRandomCards, TarotCard } from "@/lib/tarot";
import { useTranslation } from "@/lib/I18nContext";

export function TarotTable() {
  const { t } = useTranslation();
  const [spread, setSpread] = useState<{ card: TarotCard; isReversed: boolean }[] | null>(null);
  const [spreadType, setSpreadType] = useState<"daily" | "past_present_future" | null>(null);

  const drawCards = (type: "daily" | "past_present_future") => {
    setSpreadType(type);
    setSpread(pullRandomCards(type === "daily" ? 1 : 3));
  };

  const getSpreadLabel = (index: number) => {
    if (spreadType === "daily") return t("tarot.label.card_of_day", { defaultValue: "Card of the Day" });
    if (index === 0) return t("tarot.label.past", { defaultValue: "Past" });
    if (index === 1) return t("tarot.label.present", { defaultValue: "Present" });
    if (index === 2) return t("tarot.label.future", { defaultValue: "Future" });
    return "";
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {!spread ? (
        <div className="flex flex-col sm:flex-row gap-5">
          <Button onClick={() => drawCards("daily")} className="h-16 px-8 text-lg">
            {t("tarot.btn.daily", { defaultValue: "Daily Draw (1 Card)" })}
          </Button>
          <Button onClick={() => drawCards("past_present_future")} className="h-16 px-8 text-lg bg-indigo-600 hover:bg-indigo-700">
            {t("tarot.btn.three_card", { defaultValue: "Past, Present, Future (3 Cards)" })}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 w-full">
          <Button onClick={() => setSpread(null)} variant="outline" className="mb-4">
            {t("tarot.btn.draw_again", { defaultValue: "Draw Again" })}
          </Button>
          
          <div className={`grid gap-8 w-full ${spread.length === 1 ? 'grid-cols-1 max-w-sm' : 'grid-cols-1 md:grid-cols-3'}`}>
            {spread.map((item, i) => (
              <div key={i} className="flex flex-col gap-4 text-center">
                <h3 className="text-xl font-medium tracking-tight text-[var(--accent-solid)]">
                  {getSpreadLabel(i)}
                </h3>
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
                        <div className="text-right">
                          <p className="text-xs font-bold tracking-widest text-muted-soft">{item.card.numeral}</p>
                          <h4 className="text-lg font-bold tracking-tight">
                            {item.card.name}
                            {item.isReversed && <span className="text-rose-500 text-xs ml-2">({t("tarot.card.reversed", { defaultValue: "Reversed" })})</span>}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto pr-2 scroll-thin">
                        <p className="text-[13px] font-medium text-indigo-400 mb-3 leading-relaxed">
                          {item.isReversed ? item.card.reversedMeaning : item.card.uprightMeaning}
                        </p>
                        <p className="text-[13px] text-muted leading-relaxed">
                          {item.card.description}
                        </p>
                      </div>
                    </GlassCard>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
