"use client";

import { ThemeProvider } from "next-themes";
import { GamificationProvider } from "@/lib/gamification";
import { GamificationToasts } from "@/components/GamificationToasts";
import { I18nProvider } from "@/lib/I18nContext";
import { OnboardingTour } from "@/components/OnboardingTour";
import { NotificationManager } from "@/components/NotificationManager";
import { PrivacyGuardProvider } from "@/lib/PrivacyGuard";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <I18nProvider>
        <GamificationProvider>
          <PrivacyGuardProvider>
            <GamificationToasts />
            <OnboardingTour />
            <NotificationManager />
            {children}
          </PrivacyGuardProvider>
        </GamificationProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
