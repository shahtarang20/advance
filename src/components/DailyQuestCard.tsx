"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { DAILY_QUESTS, useGamification } from "@/lib/gamification";

export function DailyQuestCard() {
  const { hydrated, questsCompletedToday, questBonusAwardedToday } = useGamification();

  if (!hydrated) return null;

  const doneCount = questsCompletedToday.length;
  const allDone = doneCount === DAILY_QUESTS.length;

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-soft">Daily Quests</p>
        <p className="text-xs font-medium text-muted">
          {doneCount}/{DAILY_QUESTS.length} {allDone && questBonusAwardedToday ? "· +30 XP claimed" : ""}
        </p>
      </div>
      <ul className="mt-4 space-y-2.5">
        {DAILY_QUESTS.map((q) => {
          const done = questsCompletedToday.includes(q.id);
          return (
            <li key={q.id} className="flex items-center gap-3 text-sm">
              <motion.span
                initial={false}
                animate={{ scale: done ? 1 : 0.9, opacity: done ? 1 : 0.6 }}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                  done ? "accent-gradient-bg border-transparent text-white" : "border-[var(--surface-border)]"
                }`}
              >
                {done ? "✓" : ""}
              </motion.span>
              <span className={done ? "text-muted line-through" : ""}>{q.label}</span>
            </li>
          );
        })}
      </ul>
      {!allDone && (
        <p className="mt-4 text-xs text-muted-soft">Finish all {DAILY_QUESTS.length} today for a +30 XP bonus.</p>
      )}
    </GlassCard>
  );
}
