"use client";

import { ThemeProvider } from "next-themes";
import { GamificationProvider } from "@/lib/gamification";
import { GamificationToasts } from "@/components/GamificationToasts";
import { I18nProvider } from "@/lib/I18nContext";
import { OnboardingTour } from "@/components/OnboardingTour";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <I18nProvider>
        <GamificationProvider>
          <GamificationToasts />
          <OnboardingTour />
          {children}
        </GamificationProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
