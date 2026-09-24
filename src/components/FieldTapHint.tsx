"use client";

import { motion } from "framer-motion";

/** The same repeating tap-finger gesture used to guide first-time visitors to the language/
 * hamburger nav buttons (see NavBar.tsx), reused here for form fields — positioned absolutely by
 * the caller via `className` (the parent element needs `relative`). */
export function FieldTapHint({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 select-none text-xl drop-shadow ${className}`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-6, 2, 2, -6], scale: [1, 0.88, 0.88, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.6, 1] }}
    >
      👆
    </motion.span>
  );
}
