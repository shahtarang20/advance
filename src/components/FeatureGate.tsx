"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGamification, FEATURE_UNLOCK_DAYS, LockableFeature } from "@/lib/gamification";
import { useTranslation } from "@/lib/I18nContext";

export function FeatureGate({ feature, children }: { feature: LockableFeature; children: ReactNode }) {
  const { hydrated, isFeatureUnlocked, bestStreak } = useGamification();
  const { t } = useTranslation();

  // Before hydration we don't yet know the real streak (it lives in localStorage), so render
  // nothing rather than flash the locked screen then the unlocked content a moment later.
  if (!hydrated) return null;
  if (isFeatureUnlocked(feature)) return <>{children}</>;

  const needed = FEATURE_UNLOCK_DAYS[feature];
  const current = Math.min(bestStreak, needed);
  const pct = Math.round((current / needed) * 100);

  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <GlassCard className="p-10">
        <p className="mb-4 text-5xl">🔒</p>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          {t("gate.locked_title", { defaultValue: "This feature is still locked" })}
        </h1>
        <p className="mb-6 text-muted">
          {t("gate.locked_desc", {
            days: String(needed),
            defaultValue: `Keep your daily horoscope streak going — this unlocks once you reach a ${needed}-day streak.`,
          })}
        </p>
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-border)]">
          <div className="h-full bg-[var(--accent-solid)] transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mb-6 text-xs text-muted-soft">
          {t("gate.progress", {
            current: String(current),
            needed: String(needed),
            defaultValue: `${current} / ${needed} days`,
          })}
        </p>
        <Link href="/horoscope" className="text-purple-600 underline">
          {t("gate.cta", { defaultValue: "Check today's horoscope to keep your streak going →" })}
        </Link>
      </GlassCard>
    </div>
  );
}
