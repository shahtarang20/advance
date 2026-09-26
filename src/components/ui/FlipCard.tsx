"use client";

import { ReactNode, useId, useState } from "react";
import { motion } from "framer-motion";

import { playMagicalChime } from "@/lib/audio";

const FLOAT_ANIMATION = {
  y: [0, -6, 0],
};

const FLOAT_TRANSITION = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

const STILL_ANIMATION = { y: 0 };

export function FlipCard({
  front,
  back,
  className = "",
  ariaLabel,
  float = false,
  heightClassName = "h-60",
  onFlip,
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  ariaLabel: string;
  float?: boolean;
  heightClassName?: string;
  onFlip?: (flipped: boolean) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const describedById = useId();

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (!flipped) playMagicalChime();
        const newFlipped = !flipped;
        setFlipped(newFlipped);
        if (onFlip) onFlip(newFlipped);
      }}
      aria-pressed={flipped}
      aria-describedby={describedById}
      aria-label={flipped ? `${ariaLabel}, showing details. Press to flip back.` : `${ariaLabel}. Press to flip for details.`}
      className={`btn-tap accent-ring group relative block w-full cursor-pointer text-left ${heightClassName} ${className}`}
      whileHover={flipped ? undefined : { scale: 1.015, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={flipped ? undefined : { scale: 0.985, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
    >
      <span id={describedById} className="sr-only">
        Flippable card. {ariaLabel}
      </span>
      <div className="relative h-full w-full">
        {flipped ? (
          <motion.div
            key="back"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            {back}
          </motion.div>
        ) : (
          <motion.div
            key="front"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            {front}
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
