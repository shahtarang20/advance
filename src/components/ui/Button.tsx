"use client";

import Link from "next/link";
import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "facebook";

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "accent-gradient-bg text-white shadow-[0_8px_20px_-8px_var(--accent-ring)] hover:shadow-[0_10px_24px_-8px_var(--accent-ring)]",
  secondary:
    "border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent-solid)]",
  whatsapp: "bg-[#25D366] text-black",
  facebook: "bg-[#1877F2] text-white",
};

const press = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
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
  const classes = `btn-tap accent-ring inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-medium tracking-tight transition-[colors,box-shadow] duration-300 ${VARIANT_CLASS[variant]} ${className}`;

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
