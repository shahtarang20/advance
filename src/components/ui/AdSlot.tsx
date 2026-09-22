"use client";

import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

/**
 * Google AdSense banner slot.
 *
 * HOW TO ACTIVATE (once you have an AdSense account):
 * 1. In Vercel → Project → Settings → Environment Variables, add:
 *      NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-XXXXXXXXXXXXXXXX
 *    (the loader script in src/app/layout.tsx only runs once this is set)
 * 2. Create an ad unit in your AdSense dashboard and pass its slot id as `slotId` below,
 *    e.g. <AdSlot slotId="1234567890" />
 * 3. Add public/ads.txt with the line AdSense gives you.
 *
 * Behavior:
 * - If NEXT_PUBLIC_ADSENSE_CLIENT_ID isn't set yet, this renders nothing (no dev placeholder
 *   box left behind on the live site) — safe to drop into any page today.
 * - Once configured, it requests a real ad. While AdSense decides whether it has anything to
 *   show, the slot stays visually hidden (no layout flash). If AdSense fills it, the slot
 *   fades in; if AdSense returns "unfilled" (no ad available for that impression), the slot
 *   collapses to zero height so no empty box or broken banner is ever visible.
 */
export function AdSlot({
  slotId,
  className = "",
  format = "auto",
}: {
  slotId?: string;
  className?: string;
  format?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);
  const [status, setStatus] = useState<"pending" | "filled" | "unfilled">("pending");
  const uid = useId();

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !slotId) return;

    const el = insRef.current;
    if (!el) return;

    let pushFailed = false;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      pushFailed = true;
    }
    if (pushFailed) {
      const failTimeout = setTimeout(() => setStatus("unfilled"), 0);
      return () => clearTimeout(failTimeout);
    }

    const observer = new MutationObserver(() => {
      const adStatus = el.getAttribute("data-ad-status");
      if (adStatus === "filled") setStatus("filled");
      else if (adStatus === "unfilled") setStatus("unfilled");
    });
    observer.observe(el, { attributes: true, attributeFilter: ["data-ad-status"] });

    // Fallback in case the status attribute never appears (e.g. blocked by an ad blocker).
    const timeout = setTimeout(() => {
      if (!el.getAttribute("data-ad-status")) setStatus("unfilled");
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [slotId]);

  if (!ADSENSE_CLIENT_ID || !slotId) return null;

  return (
    <div
      className={`transition-all duration-300 ${
        status === "filled" ? "opacity-100" : "pointer-events-none h-0 overflow-hidden opacity-0"
      } ${className}`}
      aria-hidden={status !== "filled"}
    >
      <ins
        key={uid}
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
