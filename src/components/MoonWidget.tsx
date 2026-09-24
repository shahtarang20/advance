"use client";

import { useEffect, useState } from "react";
import { getCurrentMoonPhase, MoonPhase } from "@/lib/moon";
import { GlassCard } from "./ui/GlassCard";
import { useTranslation } from "@/lib/I18nContext";
import { motion } from "framer-motion";

export function MoonWidget() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<MoonPhase | null>(null);

  useEffect(() => {
    // Calculate once on mount to avoid hydration mismatch if SSR
    setPhase(getCurrentMoonPhase());

    // Keep it perfectly "live" by checking every minute
    const interval = setInterval(() => {
      setPhase(getCurrentMoonPhase());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!phase) return null;

  return (
    <GlassCard className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 overflow-hidden relative">
      {/* Decorative Breathing Glow */}
      <motion.div 
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-8 -translate-y-1/2 w-32 h-32 bg-[var(--accent-solid)] blur-[60px] rounded-full pointer-events-none" 
      />
      
      {/* Floating Moon */}
      <motion.div 
        animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="text-8xl drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] z-10 shrink-0 select-none"
      >
        {phase.emoji}
      </motion.div>
      
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
        
        <div className="bg-[var(--surface-border)]/50 rounded-xl p-4 border border-[var(--surface-border)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-solid)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-1000 blur-xl pointer-events-none" />
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
