"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/lib/I18nContext";

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
  const { t } = useTranslation();
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <Link href={href}>
        <GlassCard className="group h-full p-8 transition-colors hover:border-[var(--accent-solid)]/20 sm:p-9">
          <div
            className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${gradient}`}
          >
            {icon}
          </div>
          <h3 className="mb-2.5 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{description}</p>
          <p className="mt-5 text-sm font-medium text-[var(--foreground)]">
            {t("feature.card.try_it")}
          </p>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
