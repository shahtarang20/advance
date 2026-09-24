"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/lib/I18nContext";
import { NOTIFICATION_DATA } from "@/lib/notificationData";

function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function useDailyNotifications() {
  const { language } = useTranslation();
  const notifiedPeriods = useRef(new Set<string>());

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    const checkAndNotify = () => {
      if (Notification.permission !== "granted") return;

      const now = new Date();
      const hour = now.getHours();
      const todayStr = now.toLocaleDateString('en-CA'); 
      const dayOfYear = getDayOfYear(now);
      
      let currentPeriod: "morning" | "midday" | "night" | null = null;
      
      if (hour >= 6 && hour < 12) {
        currentPeriod = "morning";
      } else if (hour >= 12 && hour < 17) {
        currentPeriod = "midday";
      } else if (hour >= 17 && hour <= 23) {
        currentPeriod = "night";
      }

      if (currentPeriod) {
        const storageKey = `cosmic_notified_${currentPeriod}_${todayStr}`;
        if (!localStorage.getItem(storageKey) && !notifiedPeriods.current.has(storageKey)) {
          const langData = NOTIFICATION_DATA[language as keyof typeof NOTIFICATION_DATA] || NOTIFICATION_DATA.en;
          
          const templates = 
            currentPeriod === "morning" ? langData.morningTemplates :
            currentPeriod === "midday" ? langData.middayTemplates :
            langData.nightTemplates;

          const template = templates[dayOfYear % templates.length];
          const celestial = langData.celestials[dayOfYear % langData.celestials.length];
          const adjective = langData.adjectives[dayOfYear % langData.adjectives.length];
          const action = langData.actions[dayOfYear % langData.actions.length];

          const message = template
            .replace("{celestial}", celestial)
            .replace("{adjective}", adjective)
            .replace("{action}", action);
          
          try {
            new Notification(langData.title, {
              body: message,
            });
          } catch {
            navigator.serviceWorker?.ready.then(registration => {
              registration.showNotification(langData.title, {
                body: message,
              });
            }).catch(() => {});
          }
          
          localStorage.setItem(storageKey, "true");
          notifiedPeriods.current.add(storageKey);
        }
      }
    };

    if (Notification.permission === "default") {
      const timer = setTimeout(() => {
        Notification.requestPermission().then(() => {
          checkAndNotify();
        });
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      checkAndNotify();
      const interval = setInterval(checkAndNotify, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [language]);
}
