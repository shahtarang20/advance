"use client";

import { useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ANGEL_NUMBERS } from "@/lib/numerology";
import { useGamification } from "@/lib/gamification";

export function AngelNumbersTool() {
  const { recordAction } = useGamification();

  useEffect(() => {
    recordAction("angel_numbers_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ANGEL_NUMBERS.map((entry) => (
        <GlassCard key={entry.number} className="p-6">
          <p className="accent-gradient-text text-4xl font-bold tracking-wide">{entry.number}</p>
          <h2 className="mt-2 text-sm font-semibold uppercase tracking-widest text-purple-300">{entry.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{entry.meaning}</p>
        </GlassCard>
      ))}
    </div>
  );
}
