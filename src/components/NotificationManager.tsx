"use client";

import { useDailyNotifications } from "@/hooks/useDailyNotifications";

export function NotificationManager() {
  useDailyNotifications();
  return null;
}
