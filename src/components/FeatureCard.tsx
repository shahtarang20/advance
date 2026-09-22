"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export function FeatureCard({
  href,
  icon,
  title,
  description,
  gradient,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link href={href}>
        <GlassCard className="group h-full p-8 transition hover:border-[var(--surface-border)]">
          <div
            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${gradient}`}
          >
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
          <p className="text-sm leading-relaxed text-muted">{description}</p>
          <p className="mt-4 text-sm font-medium text-purple-600 group-hover:text-purple-600">
            Try it →
          </p>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
