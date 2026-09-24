"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Step {
  key: string;
  titleKey: string;
  titleDefault: string;
  bodyKey: string;
  bodyDefault: string;
}

const STEPS: Step[] = [
  {
    key: "share",
    titleKey: "ios_guide.step1.title",
    titleDefault: "Tap the Share icon",
    bodyKey: "ios_guide.step1.body",
    bodyDefault: "Find it in Safari's toolbar — usually at the bottom of your screen.",
  },
  {
    key: "add",
    titleKey: "ios_guide.step2.title",
    titleDefault: 'Tap "Add to Home Screen"',
    bodyKey: "ios_guide.step2.body",
    bodyDefault: 'Scroll down the share menu if you don\'t see it right away, then tap "Add".',
  },
];

/** A short, animated two-step walkthrough for installing on iOS — Safari's Share button is part
 * of the browser's own chrome, not this page's content, so there's no real DOM element here to
 * spotlight the way PageFeatureHint highlights an on-page button. Instead this illustrates each
 * step with its own animated mock of the actual icon (the Safari share glyph, then the "Add to
 * Home Screen" menu row) so the user recognizes them on sight in their own Safari UI, with a
 * bouncing arrow pointing toward roughly where Safari's toolbar actually sits on their device. */
export function IOSInstallGuide({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9997] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t(step.titleKey, { defaultValue: step.titleDefault })}
          className="surface-glass dark:backdrop-blur-xl relative w-full max-w-sm rounded-t-3xl border p-6 pb-8 text-center shadow-2xl sm:rounded-3xl"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-center gap-1.5">
            {STEPS.map((s, i) => (
              <span key={s.key} className="relative h-1.5 w-8 overflow-hidden rounded-full bg-[var(--surface-border)]">
                {i === stepIndex && (
                  <motion.span
                    layoutId="ios-guide-progress"
                    className="absolute inset-0 rounded-full bg-[var(--accent-solid)]"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                {i < stepIndex && <span className="absolute inset-0 rounded-full bg-[var(--accent-solid)]" />}
              </span>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {step.key === "share" ? (
                <div className="relative mx-auto mb-6 h-28 w-28">
                  <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[var(--accent-solid)] bg-[var(--surface)] text-4xl shadow-lg mx-auto"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ⬆️
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl"
                    animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ⬇️
                  </motion.div>
                </div>
              ) : (
                <div className="relative mx-auto mb-6 h-28 w-28 flex items-center justify-center">
                  <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[var(--accent-solid)] bg-[var(--surface)] text-4xl shadow-lg"
                    initial={{ rotate: -6 }}
                    animate={{ rotate: [-6, 6, -6] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ➕
                  </motion.div>
                  <motion.div
                    className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-solid)] text-sm text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.15, 1] }}
                    transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  >
                    ✓
                  </motion.div>
                </div>
              )}

              <h3 className="text-lg font-semibold tracking-tight">{t(step.titleKey, { defaultValue: step.titleDefault })}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(step.bodyKey, { defaultValue: step.bodyDefault })}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-medium text-muted-soft transition-colors hover:text-[var(--foreground)]"
            >
              {t("ios_guide.close", { defaultValue: "Close" })}
            </button>
            <div className="flex items-center gap-2">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setStepIndex((i) => i - 1)}
                  className="btn-tap rounded-full border border-[var(--surface-border)] px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-[var(--accent-solid)]"
                >
                  {t("ios_guide.back", { defaultValue: "Back" })}
                </button>
              )}
              <motion.button
                type="button"
                onClick={() => (isLast ? onClose() : setStepIndex((i) => i + 1))}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="btn-tap accent-gradient-bg rounded-full px-5 py-2 text-sm font-medium text-white shadow-[0_8px_20px_-8px_var(--accent-ring)]"
              >
                {isLast ? t("ios_guide.done", { defaultValue: "Got it" }) : t("ios_guide.next", { defaultValue: "Next" })}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
