"use client";

import Link from "next/link";
import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp";

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "accent-gradient-bg text-white shadow-[0_10px_30px_-8px_var(--accent-ring)]",
  secondary:
    "border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent-solid)]",
  whatsapp: "bg-[#25D366] text-black",
};

const press = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.96 },
  transition: { type: "spring" as const, stiffness: 400, damping: 22 },
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<HTMLMotionProps<"button">, "children">) {
  const classes = `btn-tap accent-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors ${VARIANT_CLASS[variant]} ${className}`;

  if (href) {
    return (
      <motion.div {...press} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...press} className={classes} {...props}>
      {children}
    </motion.button>
  );
}
