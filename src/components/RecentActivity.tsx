"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { getRecentActivity, RecentActivityItem } from "@/lib/recentActivity";
import { useTranslation } from "@/lib/I18nContext";

/** "Continue where you left off" — surfaces the user's last few generated readings so a
 * returning visitor can jump straight back in instead of re-navigating and refilling a form.
 * Renders nothing for first-time visitors (no history yet) rather than an empty section. */
export function RecentActivity() {
  const [items, setItems] = useState<RecentActivityItem[]>([]);
  const { t } = useTranslation();

  // Read after mount only — this is purely client-side history, so there's nothing to render
  // on the server, and reading it during the initial render would mismatch hydration.
  useEffect(() => {
    setItems(getRecentActivity());
  }, []);

  if (items.length === 0) return null;

  return (
    <Reveal className="mx-auto mt-16 max-w-2xl">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-soft">
        {t("home.recent.title", { defaultValue: "Continue where you left off" })}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link key={item.id} href={item.href}>
            <GlassCard className="flex items-center gap-3 p-4 transition hover:border-[var(--accent-solid)]">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-[var(--foreground)]">
                {t(item.labelKey, { defaultValue: item.labelDefault })}
              </span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
