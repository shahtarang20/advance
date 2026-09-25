"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/I18nContext";

interface PrivacyGuardContextValue {
  wrapAction: <T extends unknown[]>(callback: (...args: T) => void) => (...args: T) => void;
}

const PrivacyGuardContext = createContext<PrivacyGuardContextValue | null>(null);

export function PrivacyGuardProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const { t } = useTranslation();

  const wrapAction = useCallback(<T extends unknown[]>(callback: (...args: T) => void) => {
    return (...args: T) => {
      // Prevent default immediately if the first argument is an event,
      // so forms don't natively submit and refresh the page while the modal is open.
      const firstArg = args[0] as any;
      if (firstArg && typeof firstArg.preventDefault === "function") {
        firstArg.preventDefault();
      }

      if (typeof window === "undefined") {
        callback(...args);
        return;
      }

      const countStr = window.localStorage.getItem("privacy_prompt_count");
      const count = countStr ? parseInt(countStr, 10) : 0;

      if (count < 3) {
        window.localStorage.setItem("privacy_prompt_count", (count + 1).toString());
        setPendingAction(() => () => callback(...args));
        setShowModal(true);
      } else {
        callback(...args);
      }
    };
  }, []);

  const handleClose = () => {
    setShowModal(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <PrivacyGuardContext.Provider value={{ wrapAction }}>
      {children}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop click also closes it */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-gradient-to-b from-[var(--surface-strong)] to-[var(--surface)] p-8 text-center shadow-2xl"
            >
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
                {t("privacy.modal.title", { defaultValue: "100% Private" })}
              </h2>
              
              <p className="mb-8 text-xl leading-relaxed text-muted-soft">
                {t("privacy.modal.desc", { defaultValue: "We do not save your personal data. Everything stays exactly here, on your device." })}
              </p>

              <button
                onClick={handleClose}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-95"
              >
                {t("privacy.modal.btn", { defaultValue: "Continue to Prediction" })}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PrivacyGuardContext.Provider>
  );
}

export function usePrivacyGuard() {
  const ctx = useContext(PrivacyGuardContext);
  if (!ctx) throw new Error("usePrivacyGuard must be used inside PrivacyGuardProvider");
  return ctx;
}
