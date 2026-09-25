"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/I18nContext";
import { PageFeatureHint } from "@/components/PageFeatureHint";
import { usePrivacyGuard } from "@/lib/PrivacyGuard";

export function TarotTable() {
  const { t } = useTranslation();
  const router = useRouter();
  const { wrapAction } = usePrivacyGuard();

  const drawCards = (type: "daily" | "past_present_future" | "love" | "career" | "celtic_cross") => {
    let seed = "";

    if (type === "daily") {
      const today = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem("tarot_daily_date");
      const savedSeed = localStorage.getItem("tarot_daily_seed");

      if (savedDate === today && savedSeed) {
        seed = savedSeed;
      } else {
        seed = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem("tarot_daily_date", today);
        localStorage.setItem("tarot_daily_seed", seed);
      }
    } else {
      seed = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }

    router.push(`/result/tarot?seed=${seed}&type=${type}`);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl w-full">
        <Button data-tour="page-cta" onClick={wrapAction(() => drawCards("daily"))} className="h-20 text-lg flex flex-col items-center justify-center">
          <span>{t("tarot.btn.daily", { defaultValue: "Daily Draw" })}</span>
          <span className="text-xs opacity-70 mt-1 font-normal">{t("tarot.btn.1_card", { defaultValue: "(1 Card)" })}</span>
        </Button>
        <Button onClick={wrapAction(() => drawCards("past_present_future"))} className="h-20 text-lg bg-indigo-600 hover:bg-indigo-700 flex flex-col items-center justify-center">
          <span>{t("tarot.btn.three_card", { defaultValue: "Past, Present, Future" })}</span>
          <span className="text-xs opacity-70 mt-1 font-normal">{t("tarot.btn.3_cards", { defaultValue: "(3 Cards)" })}</span>
        </Button>
        <Button onClick={wrapAction(() => drawCards("love"))} className="h-20 text-lg bg-rose-600 hover:bg-rose-700 flex flex-col items-center justify-center">
          <span>{t("tarot.btn.love", { defaultValue: "Love & Relationships" })}</span>
          <span className="text-xs opacity-70 mt-1 font-normal">{t("tarot.btn.5_cards", { defaultValue: "(5 Cards)" })}</span>
        </Button>
        <Button onClick={wrapAction(() => drawCards("career"))} className="h-20 text-lg bg-emerald-600 hover:bg-emerald-700 flex flex-col items-center justify-center">
          <span>{t("tarot.btn.career", { defaultValue: "Career Path" })}</span>
          <span className="text-xs opacity-70 mt-1 font-normal">{t("tarot.btn.5_cards", { defaultValue: "(5 Cards)" })}</span>
        </Button>
        <Button onClick={wrapAction(() => drawCards("celtic_cross"))} className="h-20 text-lg bg-purple-600 hover:bg-purple-700 flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1">
          <span>{t("tarot.btn.celtic_cross", { defaultValue: "Celtic Cross" })}</span>
          <span className="text-xs opacity-70 mt-1 font-normal">{t("tarot.btn.10_cards", { defaultValue: "(10 Cards)" })}</span>
        </Button>
      </div>
      
      <PageFeatureHint
        pageKey="tarot"
        titleKey="page_hint.tarot.title"
        titleDefault="Draw your cards"
        bodyKey="page_hint.tarot.body"
        bodyDefault="Tap here for a quick daily card, or try the complex spreads."
        target='[data-tour="page-cta"]'
      />
    </div>
  );
}
