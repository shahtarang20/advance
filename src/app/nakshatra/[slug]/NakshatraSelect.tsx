"use client";

import { useState } from "react";
import { useGamification } from "@/lib/gamification";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "@/components/ShareButtons";
import { useTranslation } from "@/lib/I18nContext";

export function NakshatraSelect({ info }: { info: any }) {
  const { recordAction } = useGamification();
  const { t } = useTranslation();
  const [selected, setSelected] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${origin}/nakshatra/${info.slug}`;
  const ogQuery = `type=nakshatra&title=${encodeURIComponent(info.name)}&subtitle=${encodeURIComponent(`Ruled by ${info.rulingPlanet}`)}&big=${encodeURIComponent("✦")}`;

  if (!selected) {
    return (
      <div className="mt-6 text-center">
        <p className="mb-3 text-xs text-muted-soft">
          {t("nak.select.already_know")}
        </p>
        <Button
          onClick={() => {
            setSelected(true);
            recordAction("nakshatra_select");
          }}
        >
          {t("nak.select.this_is_mine")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 text-center">
      <p className="text-sm text-muted">
        {t("nak.select.now_set", { name: t(`nak.${info.slug}.name`, { defaultValue: info.name }) })}
      </p>
      <ShareButtons
        shareUrl={shareUrl}
        ogQuery={ogQuery}
        caption={`My Nakshatra is ${info.name}, ruled by ${info.rulingPlanet} — from Cosmic Numbers. Find yours:`}
      />
    </div>
  );
}
