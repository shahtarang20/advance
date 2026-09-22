"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useGamification } from "@/lib/gamification";

export function GamificationToasts() {
  const { pendingBadges, dismissBadge, pendingLevelUp, dismissLevelUp } = useGamification();
  const activeBadge = pendingBadges[0];

  useEffect(() => {
    if (!activeBadge) return;
    const t = setTimeout(() => dismissBadge(activeBadge.id), 4200);
    return () => clearTimeout(t);
  }, [activeBadge, dismissBadge]);

  useEffect(() => {
    if (!pendingLevelUp) return;
    const t = setTimeout(() => dismissLevelUp(), 3800);
    return () => clearTimeout(t);
  }, [pendingLevelUp, dismissLevelUp]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-3 px-4">
      <AnimatePresence>
        {pendingLevelUp && (
          <motion.div
            key="levelup"
            initial={{ y: -40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="surface-glass pointer-events-auto flex items-center gap-3 rounded-2xl border px-5 py-3 shadow-xl"
          >
            <span className="text-2xl">✦</span>
            <div>
              <p className="text-sm font-semibold">Level up!</p>
              <p className="text-xs text-muted">You&apos;re now a {pendingLevelUp.title}</p>
            </div>
          </motion.div>
        )}
        {activeBadge && (
          <motion.div
            key={activeBadge.id}
            initial={{ y: -40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="surface-glass pointer-events-auto flex items-center gap-3 rounded-2xl border px-5 py-3 shadow-xl"
          >
            <span className="text-2xl">🏅</span>
            <div>
              <p className="text-sm font-semibold">Badge unlocked: {activeBadge.name}</p>
              <p className="text-xs text-muted">{activeBadge.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
