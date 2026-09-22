"use client";

import { useEffect, useState } from "react";
import { getCurrentMoonPhase, MoonPhase } from "@/lib/moon";
import { GlassCard } from "./ui/GlassCard";
import { useTranslation } from "@/lib/I18nContext";

export function MoonWidget() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<MoonPhase | null>(null);

  useEffect(() => {
    // Calculate once on mount to avoid hydration mismatch if SSR
    setPhase(getCurrentMoonPhase());
  }, []);

  if (!phase) return null;

  return (
    <GlassCard className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-32 h-32 bg-[var(--accent-solid)] opacity-20 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="text-8xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10 shrink-0">
        {phase.emoji}
      </div>
      
      <div className="flex-1 text-center sm:text-left z-10">
        <p className="text-sm font-semibold tracking-widest text-[var(--accent-solid)] uppercase mb-1">
          {t("moon.label", { defaultValue: "Current Moon Phase" })}
        </p>
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          {t(`moon.phase.${phase.id}`, { defaultValue: phase.name })}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">
          {t(`moon.desc.${phase.id}`, { defaultValue: phase.description })}
        </p>
        
        <div className="bg-[var(--surface-border)]/50 rounded-xl p-4 border border-[var(--surface-border)]">
          <p className="text-xs font-semibold text-muted-soft uppercase mb-1">
            {t("moon.tip.label", { defaultValue: "Manifestation Tip" })}
          </p>
          <p className="text-sm text-foreground">
            {t(`moon.tip.${phase.id}`, { defaultValue: phase.manifestationTip })}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
