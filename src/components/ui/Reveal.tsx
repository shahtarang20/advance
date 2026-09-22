"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Gentle scroll-reveal: fades and slides content up as it enters the viewport.
 * Uses an Apple-style "easeOutExpo" curve — slow and smooth, never bouncy.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
