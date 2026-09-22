"use client";

import Link from "next/link";
import { useGamification } from "@/lib/gamification";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function GamificationWidget() {
  const { hydrated, xp, streak, levelTitle, nextLevelTitle, levelProgress, badges } = useGamification();

  if (!hydrated) return null;
  if (xp === 0 && streak === 0 && badges.length === 0) return null;

  return (
    <GlassCard className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-soft">Your Cosmic Journey</p>
          <p className="text-2xl font-semibold">{levelTitle}</p>
        </div>
        <div className="flex gap-6 text-center">
          <div>
            <p className="accent-gradient-text text-2xl font-bold">{streak}</p>
            <p className="text-xs text-muted-soft">Day Streak</p>
          </div>
          <div>
            <p className="accent-gradient-text text-2xl font-bold">{xp}</p>
            <p className="text-xs text-muted-soft">Cosmic XP</p>
          </div>
          <div>
            <p className="accent-gradient-text text-2xl font-bold">{badges.length}</p>
            <p className="text-xs text-muted-soft">Badges</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar progress={levelProgress} />
        {nextLevelTitle && (
          <p className="mt-1.5 text-xs text-muted-soft">Next level: {nextLevelTitle}</p>
        )}
      </div>
      <Link href="/profile" className="mt-4 inline-block text-xs font-medium text-[var(--accent-solid)] hover:underline">
        View your full stats →
      </Link>
    </GlassCard>
  );
}
