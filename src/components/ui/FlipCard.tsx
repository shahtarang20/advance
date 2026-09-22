"use client";

import { ReactNode, useId, useState } from "react";
import { motion } from "framer-motion";

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
  float = true,
  heightClassName = "h-60",
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  ariaLabel: string;
  float?: boolean;
  heightClassName?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const describedById = useId();

  return (
    <motion.button
      type="button"
      onClick={() => {
        setIsAnimating(true);
        setFlipped((f) => !f);
      }}
      aria-pressed={flipped}
      aria-describedby={describedById}
      aria-label={flipped ? `${ariaLabel}, showing details. Press to flip back.` : `${ariaLabel}. Press to flip for details.`}
      className={`btn-tap accent-ring group relative block w-full cursor-pointer text-left ${isAnimating ? "[perspective:1200px]" : ""} ${heightClassName} ${className}`}
      animate={float && !flipped ? FLOAT_ANIMATION : STILL_ANIMATION}
      transition={float && !flipped ? FLOAT_TRANSITION : { duration: 0.2 }}
      whileHover={flipped ? undefined : { scale: 1.015, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={flipped ? undefined : { scale: 0.985, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
    >
      <span id={describedById} className="sr-only">
        Flippable card. {ariaLabel}
      </span>
      {isAnimating ? (
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="absolute inset-0 h-full w-full overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            {front}
          </div>
          <div className="absolute inset-0 h-full w-full overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            {back}
          </div>
        </motion.div>
      ) : (
        // Once the flip settles, render the current face with no 3D transform at all —
        // browsers leave text on a backface-hidden/rotateY(180deg) layer slightly blurry
        // even at rest, so we drop the transform entirely instead of just snapping to it.
        <div className="relative h-full w-full overflow-hidden">{flipped ? back : front}</div>
      )}
    </motion.button>
  );
}
