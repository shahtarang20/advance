"use client";

import { useEffect, useRef } from "react";
import { recordRecentActivity } from "@/lib/recentActivity";

/** Records this result page as a "recent activity" entry, once per mount — placed on each
 * feature's result page (mirrors the KundliResultTracker gamification pattern). */
export function RecentActivityTracker({
  id,
  href,
  labelKey,
  labelDefault,
  icon,
}: {
  id: string;
  href: string;
  labelKey: string;
  labelDefault: string;
  icon: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    recordRecentActivity({ id, href, labelKey, labelDefault, icon });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- record once per mount only
  }, []);

  return null;
}
