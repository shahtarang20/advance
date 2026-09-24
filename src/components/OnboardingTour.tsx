"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";
import {
  hasSeenOnboarding,
  markOnboardingSeen,
  hasSeenLanguageChangeTour,
  markLanguageChangeTourSeen,
  LANGUAGE_CHANGED_EVENT,
} from "@/lib/onboarding";

interface TourStep {
  id: string;
  titleKey: string;
  titleDefault: string;
  bodyKey: string;
  bodyDefault: string;
  /** CSS selectors tried in order; the first one that resolves to a visible element is used.
   * Lets a step target the desktop nav on wide screens and the mobile menu button on narrow ones. */
  targets?: string[];
}

const STEPS: TourStep[] = [
  {
    id: "welcome",
    titleKey: "onboarding.welcome.title",
    titleDefault: "Welcome to Cosmic Numbers ✦",
    bodyKey: "onboarding.welcome.body",
    bodyDefault: "Let's take a 30-second tour so you know exactly where to find everything.",
  },
  {
    id: "nav",
    titleKey: "onboarding.nav.title",
    titleDefault: "Every tool, right here",
    bodyKey: "onboarding.nav.body",
    bodyDefault: "Palm Reading, Tarot, Kundli, Horoscope, and more all live in this menu.",
    targets: ['[data-tour="nav-links"]', '[data-tour="menu-button"]'],
  },
  {
    id: "language",
    titleKey: "onboarding.language.title",
    titleDefault: "Read it in your language",
    bodyKey: "onboarding.language.body",
    bodyDefault: "Switch the entire site's language anytime from here — Hindi, Gujarati, German, Chinese, and more.",
    targets: ['[data-tour="language-toggle"]'],
  },
  {
    id: "theme",
    titleKey: "onboarding.theme.title",
    titleDefault: "Light or dark — your call",
    bodyKey: "onboarding.theme.body",
    bodyDefault: "Toggle between light and dark mode whenever you like.",
    targets: ['[data-tour="theme-toggle"]'],
  },
  {
    id: "finish",
    titleKey: "onboarding.finish.title",
    titleDefault: "You're all set 🎉",
    bodyKey: "onboarding.finish.body",
    bodyDefault: "Explore freely — check today's horoscope to start a streak and unlock even more features along the way.",
  },
];

const TOOLTIP_WIDTH = 320;
const VIEWPORT_MARGIN = 16;
const SPOTLIGHT_PADDING = 8;
const EASE = [0.16, 1, 0.3, 1] as const;

function resolveTargetRect(targets?: string[]): DOMRect | null {
  if (!targets) return null;
  for (const selector of targets) {
    const el = document.querySelector<HTMLElement>(selector);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) return rect;
    }
  }
  return null;
}

// Content within each card fades/slides in as a group, each child slightly staggered after the
// last — a small but deliberate touch that makes the card feel composed rather than dumped on
// screen all at once.
const cardContentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

// Step-to-step slide direction: sliding in from the side the user is navigating toward, and
// exiting toward the opposite side — the same directional-crossfade pattern used by carousel
// and wizard-style UIs to reinforce "moving forward" vs "moving back".
const slideVariants: Variants = {
  enter: (dir: 1 | -1) => ({ opacity: 0, x: dir * 28, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: 1 | -1) => ({ opacity: 0, x: dir * -20, scale: 0.97 }),
};

export function OnboardingTour() {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [targetMissing, setTargetMissing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const goTo = (next: number) => {
    setDirection(next > stepIndex ? 1 : -1);
    setStepIndex(next);
  };

  const finish = () => {
    markOnboardingSeen();
    setActive(false);
  };

  // Start the tour once, after the page has had a moment to render the nav bar.
  // The user requested this to be disabled so it doesn't interrupt them immediately upon login.
  useEffect(() => {
    // We just mark it as seen so the state is initialized, but we don't start the animation.
    if (!hasSeenOnboarding()) {
      markOnboardingSeen();
    }
  }, []);

  // Run the tour again — once — the very first time a returning user actively switches
  // languages. They may have originally gone through it in a language they don't read well, so
  // this gives them one more guided pass in the language they actually picked.
  useEffect(() => {
    const onLanguageChanged = () => {
      // Allow it to run once on language change, regardless of whether they saw the initial one.
      if (hasSeenLanguageChangeTour()) return;
      markLanguageChangeTourSeen();
      setStepIndex(0);
      setDirection(1);
      setActive(true);
    };
    window.addEventListener(LANGUAGE_CHANGED_EVENT, onLanguageChanged);
    return () => window.removeEventListener(LANGUAGE_CHANGED_EVENT, onLanguageChanged);
  }, []);

  // Resolve (and keep updated) the position of the current step's target element.
  useEffect(() => {
    if (!active) return;

    const update = () => {
      if (!step.targets) {
        setRect(null);
        setTargetMissing(false);
        return;
      }
      const r = resolveTargetRect(step.targets);
      setRect(r);
      setTargetMissing(!r);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [active, step]);

  // If a targeted step's element genuinely can't be found (e.g. an unusual viewport size),
  // skip straight past it instead of showing a tour step pointing at nothing.
  useEffect(() => {
    if (active && step.targets && targetMissing) {
      if (stepIndex < STEPS.length - 1) goTo(stepIndex + 1);
      else finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to the missing-target signal
  }, [targetMissing]);

  // Keyboard navigation: Escape to skip, Enter/Right to advance, Left to go back.
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      else if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        isLast ? finish() : goTo(stepIndex + 1);
      } else if (e.key === "ArrowLeft" && stepIndex > 0) {
        e.preventDefault();
        goTo(stepIndex - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, stepIndex, isLast]);

  // Compute tooltip placement: below the target if there's room, otherwise above; centered
  // horizontally on the target and clamped so it never runs off the viewport edge.
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 768;

  let top = 0;
  let left = 0;
  let placement: "below" | "above" | "center" = "center";

  if (rect) {
    const spaceBelow = viewportHeight - rect.bottom;
    placement = spaceBelow > 220 ? "below" : "above";
    top = placement === "below" ? rect.bottom + 16 : rect.top - 16;
    const center = rect.left + rect.width / 2;
    left = Math.min(Math.max(center - TOOLTIP_WIDTH / 2, VIEWPORT_MARGIN), viewportWidth - TOOLTIP_WIDTH - VIEWPORT_MARGIN);
  } else {
    top = viewportHeight / 2;
    left = viewportWidth / 2 - TOOLTIP_WIDTH / 2;
  }

  const arrowLeft = rect ? Math.min(Math.max(rect.left + rect.width / 2 - left, 24), TOOLTIP_WIDTH - 24) : null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9998]"
          role="dialog"
          aria-modal="true"
          aria-label={t(step.titleKey, { defaultValue: step.titleDefault })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Invisible click-shield: blocks interaction with the page underneath for the whole
              duration of the tour. Kept fully transparent and separate from the visual
              darkening below — layering an opaque backdrop on top of the spotlight box-shadow
              would defeat the cutout (the "hole" would just reveal this div instead of the
              real, highlighted element). Dismissal is explicit via Skip/Escape, not backdrop
              click, matching standard modal/tour accessibility conventions. */}
          <div className="fixed inset-0" />

          {/* When there's no specific target (welcome/finish steps), dim the whole screen. */}
          {!rect && <div className="pointer-events-none fixed inset-0 bg-black/60" />}

          {/* Spotlight cutout: a box exactly sized to the target, whose oversized box-shadow
              paints the rest of the dimmed viewport, leaving the target's own screen position
              genuinely unpainted so the real element shows through — the same technique used by
              mainstream product tours (Shepherd.js, driver.js, Intercom). This only works
              because there's no separate opaque overlay behind it (see click-shield above). */}
          {rect && (
            <>
              <motion.div
                className="pointer-events-none fixed rounded-2xl"
                style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)" }}
                initial={false}
                animate={{
                  top: rect.top - SPOTLIGHT_PADDING,
                  left: rect.left - SPOTLIGHT_PADDING,
                  width: rect.width + SPOTLIGHT_PADDING * 2,
                  height: rect.height + SPOTLIGHT_PADDING * 2,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              {/* A soft pulsing ring around the spotlighted element draws the eye to it, the
                  same "look here" cue used in Intercom/Product-tour style onboarding. */}
              <motion.div
                key={`pulse-${step.id}`}
                className="pointer-events-none fixed rounded-2xl border-2 border-[var(--accent-solid)]"
                initial={false}
                animate={{
                  top: rect.top - SPOTLIGHT_PADDING,
                  left: rect.left - SPOTLIGHT_PADDING,
                  width: rect.width + SPOTLIGHT_PADDING * 2,
                  height: rect.height + SPOTLIGHT_PADDING * 2,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <motion.span
                  className="absolute inset-0 rounded-2xl border-2 border-[var(--accent-solid)]"
                  animate={{ opacity: [0.9, 0, 0.9], scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step.id}
              ref={cardRef}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: EASE }}
              className="surface-glass dark:backdrop-blur-xl fixed rounded-2xl border p-6 shadow-2xl"
              style={{
                width: TOOLTIP_WIDTH,
                top: placement === "above" ? undefined : top,
                bottom: placement === "above" ? viewportHeight - top : undefined,
                left,
                transform: placement === "center" ? "translateY(-50%)" : undefined,
              }}
            >
              {arrowLeft !== null && (
                <motion.span
                  layout
                  className="surface-glass absolute h-4 w-4 rotate-45 border"
                  transition={{ duration: 0.3, ease: EASE }}
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
              )}

              <motion.div variants={cardContentVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="mb-4 flex items-center gap-1.5">
                  {STEPS.map((s, i) => (
                    <span key={s.id} className="relative h-1.5 w-6 overflow-hidden rounded-full bg-[var(--surface-border)]">
                      {i === stepIndex && (
                        <motion.span
                          layoutId="onboarding-progress-fill"
                          className="absolute inset-0 rounded-full bg-[var(--accent-solid)]"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      )}
                      {i < stepIndex && <span className="absolute inset-0 rounded-full bg-[var(--accent-solid)]" />}
                    </span>
                  ))}
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-lg font-semibold tracking-tight">
                  {t(step.titleKey, { defaultValue: step.titleDefault })}
                </motion.h2>
                <motion.p variants={itemVariants} className="mt-2 text-sm leading-relaxed text-muted">
                  {t(step.bodyKey, { defaultValue: step.bodyDefault })}
                </motion.p>

                <motion.div variants={itemVariants} className="mt-5 flex items-center justify-between">
                  <motion.button
                    type="button"
                    onClick={finish}
                    whileHover={{ opacity: 0.75 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-xs font-medium text-muted-soft transition-colors hover:text-[var(--foreground)]"
                  >
                    {t("onboarding.skip", { defaultValue: "Skip tour" })}
                  </motion.button>
                  <div className="flex items-center gap-2">
                    {stepIndex > 0 && (
                      <motion.button
                        type="button"
                        onClick={() => goTo(stepIndex - 1)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="btn-tap rounded-full border border-[var(--surface-border)] px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-[var(--accent-solid)]"
                      >
                        {t("onboarding.back", { defaultValue: "Back" })}
                      </motion.button>
                    )}
                    <motion.button
                      type="button"
                      onClick={() => (isLast ? finish() : goTo(stepIndex + 1))}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="btn-tap accent-gradient-bg rounded-full px-5 py-2 text-sm font-medium text-white shadow-[0_8px_20px_-8px_var(--accent-ring)]"
                    >
                      {isLast ? t("onboarding.finish_btn", { defaultValue: "Get Started" }) : t("onboarding.next", { defaultValue: "Next" })}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
