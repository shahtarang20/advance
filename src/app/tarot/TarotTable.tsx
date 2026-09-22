"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/I18nContext";

export function TarotTable() {
  const { t } = useTranslation();
  const router = useRouter();

  const drawCards = (type: "daily" | "past_present_future") => {
    const seed = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    router.push(`/result/tarot?seed=${seed}&type=${type}`);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col sm:flex-row gap-5">
        <Button onClick={() => drawCards("daily")} className="h-16 px-8 text-lg">
          {t("tarot.btn.daily", { defaultValue: "Daily Draw (1 Card)" })}
        </Button>
        <Button onClick={() => drawCards("past_present_future")} className="h-16 px-8 text-lg bg-indigo-600 hover:bg-indigo-700">
          {t("tarot.btn.three_card", { defaultValue: "Past, Present, Future (3 Cards)" })}
        </Button>
      </div>
    </div>
  );
}
