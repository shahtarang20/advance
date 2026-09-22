"use client";

import { useEffect, useRef } from "react";
import { useGamification } from "@/lib/gamification";

/** Records the gamification action for viewing a generated Kundli result, once per mount. */
export function KundliResultTracker() {
  const { recordAction } = useGamification();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    recordAction("kundli_generate");
  }, [recordAction]);

  return null;
}
