"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";
import { hasSeenPageHint, markPageHintSeen } from "@/lib/pageHints";
import { hasSeenOnboarding } from "@/lib/onboarding";

const SPOTLIGHT_PADDING = 8;
const TOOLTIP_WIDTH = 300;
const VIEWPORT_MARGIN = 16;
const EASE = [0.16, 1, 0.3, 1] as const;

interface PageFeatureHintProps {
  /** Unique per page — used as the localStorage key so each tool page is remembered separately. */
  pageKey: string;
  titleKey: string;
  titleDefault: string;
  bodyKey: string;
  bodyDefault: string;
  /** CSS selector for the element this hint points at (e.g. the page's main action button). */
  target: string;
}

/** A single animated spotlight callout, shown once the first time a user lands on a given tool
 * page — reuses the same spotlight-cutout + pulsing-ring technique as the site-wide
 * OnboardingTour (src/components/OnboardingTour.tsx), but scoped to one page and one step, so it
 * doesn't re-run the whole multi-step tour just to point out "this is the button that does the
 * thing" on a page the user is visiting for the first time. */
export function PageFeatureHint({ pageKey, titleKey, titleDefault, bodyKey, bodyDefault, target }: PageFeatureHintProps) {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Waits for the site-wide welcome tour (OnboardingTour) to be out of the way before showing
  // itself. Both are independent "first time" overlays with no shared coordinator, so on a
  // genuinely brand-new visitor whose very first page happens to be a tool page (not the
  // homepage), the welcome tour and this page hint used to fire at the same 500-600ms mark and
  // stack on top of each other. Polling for `hasSeenOnboarding()` instead of a one-shot timer
  // means this simply waits — however long that takes — until the welcome tour has been
  // dismissed, then shows its own hint right after, never both at once.
  useEffect(() => {
    if (hasSeenPageHint(pageKey)) return;
    const activateFor = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      setRect(r);
      setActive(true);
    };
    const attempt = () => {
      if (!hasSeenOnboarding()) return false;
      const el = document.querySelector<HTMLElement>(target);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return false;
      // The target can legitimately be below the fold on a long page (e.g. Palmistry's submit
      // button sits under the photo picker and hand selector, off-screen on most phones at
      // load). Scrolling it into view first means the spotlight always appears where the user
      // is actually looking, instead of rendering a tooltip that's partially or fully cut off
      // past the bottom of the screen. A short delay lets the smooth scroll settle before the
      // rect is captured for the initial paint — the per-frame tracking effect keeps it accurate
      // after that regardless.
      const fullyVisible = r.top >= 0 && r.bottom <= window.innerHeight;
      if (!fullyVisible) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => activateFor(el), 350);
      } else {
        activateFor(el);
      }
      return true;
    };
    const initial = setTimeout(() => {
      if (attempt()) return;
      pollRef.current = setInterval(() => {
        if (attempt() && pollRef.current) clearInterval(pollRef.current);
      }, 400);
    }, 500);
    return () => {
      clearTimeout(initial);
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per mount
  }, []);

  // Continuously re-measure the target every frame instead of only reacting to resize/scroll
  // events. Anything that can shift layout after the initial measurement — a webfont finishing
  // load, a translation string changing text length/wrapping, a browser toolbar changing the
  // viewport height — can otherwise leave the spotlight pointing at stale coordinates with no
  // event to react to. Re-measuring every frame is effectively free (one querySelector + one
  // getBoundingClientRect) and guarantees the spotlight self-corrects within a frame regardless
  // of what caused the shift.
  useEffect(() => {
    if (!active) return;
    let frame: number;
    const tick = () => {
      const el = document.querySelector<HTMLElement>(target);
      if (el) {
        const r = el.getBoundingClientRect();
        setRect((prev) =>
          prev && prev.top === r.top && prev.left === r.left && prev.width === r.width && prev.height === r.height
            ? prev
            : r
        );
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const dismiss = () => {
    markPageHintSeen(pageKey);
    setActive(false);
  };

  if (!rect) return null;

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 768;
  const spaceBelow = viewportHeight - rect.bottom;
  const placement: "below" | "above" = spaceBelow > 180 ? "below" : "above";
  const top = placement === "below" ? rect.bottom + 16 : rect.top - 16;
  const center = rect.left + rect.width / 2;
  const left = Math.min(Math.max(center - TOOLTIP_WIDTH / 2, VIEWPORT_MARGIN), viewportWidth - TOOLTIP_WIDTH - VIEWPORT_MARGIN);
  const arrowLeft = Math.min(Math.max(rect.left + rect.width / 2 - left, 24), TOOLTIP_WIDTH - 24);

  // Rendered through a portal straight onto <body> rather than in place: this component is used
  // inside GlassCard elsewhere in the tree, and GlassCard applies backdrop-blur in dark mode.
  // Per the CSS spec, a `backdrop-filter` on an ancestor creates a new containing block for any
  // `position: fixed` descendant, so without the portal this overlay would position itself
  // relative to that blurred card instead of the real viewport — the highlight would end up
  // nowhere near the actual button, but only in dark mode, which is exactly the split seen when
  // this first shipped. Escaping to `document.body` sidesteps the issue regardless of whatever
  // ancestor styling a given page happens to nest this component inside.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9997]"
          role="dialog"
          aria-modal="true"
          aria-label={t(titleKey, { defaultValue: titleDefault })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* Invisible click-shield, dismissible only via the explicit buttons below — matches
              the site-wide tour's dismissal convention (see OnboardingTour.tsx). */}
          <div className="fixed inset-0" onClick={dismiss} />

          <motion.div
            className="pointer-events-none fixed rounded-2xl"
            style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)" }}
            initial={false}
            animate={{
              top: rect.top - SPOTLIGHT_PADDING,
              left: rect.left - SPOTLIGHT_PADDING,
              width: rect.width + SPOTLIGHT_PADDING * 2,
              height: rect.height + SPOTLIGHT_PADDING * 2,
            }}
            transition={{ duration: 0.45, ease: EASE }}
          />
          <motion.div
            className="pointer-events-none fixed rounded-2xl border-2 border-[var(--accent-solid)]"
            initial={false}
            animate={{
              top: rect.top - SPOTLIGHT_PADDING,
              left: rect.left - SPOTLIGHT_PADDING,
              width: rect.width + SPOTLIGHT_PADDING * 2,
              height: rect.height + SPOTLIGHT_PADDING * 2,
            }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-[var(--accent-solid)]"
              animate={{ opacity: [0.9, 0, 0.9], scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            className="surface-glass dark:backdrop-blur-xl fixed rounded-2xl border p-5 shadow-2xl"
            initial={{ opacity: 0, y: placement === "below" ? -10 : 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === "below" ? -10 : 10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ width: TOOLTIP_WIDTH, top: placement === "above" ? undefined : top, bottom: placement === "above" ? viewportHeight - top : undefined, left }}
          >
            <span
              className="surface-glass absolute h-4 w-4 rotate-45 border"
              style={{
                left: arrowLeft - 8,
                top: placement === "below" ? -8 : undefined,
                bottom: placement === "above" ? -8 : undefined,
                borderRight: placement === "below" ? "none" : undefined,
                borderBottom: placement === "below" ? "none" : undefined,
                borderLeft: placement === "above" ? "none" : undefined,
                borderTop: placement === "above" ? "none" : undefined,
              }}
            />
            <h3 className="text-sm font-semibold tracking-tight">{t(titleKey, { defaultValue: titleDefault })}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{t(bodyKey, { defaultValue: bodyDefault })}</p>
            <button
              type="button"
              onClick={dismiss}
              className="btn-tap accent-gradient-bg mt-4 w-full rounded-full px-4 py-2 text-xs font-medium text-white shadow-[0_8px_20px_-8px_var(--accent-ring)]"
            >
              {t("page_hint.got_it", { defaultValue: "Got it" })}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
