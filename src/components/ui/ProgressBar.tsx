"use client";

import { motion } from "framer-motion";

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-strong)]">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-300"
        initial={{ width: 0 }}
        animate={{ width: `${Math.round(progress * 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
