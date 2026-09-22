"use client";

import { ThemeProvider } from "next-themes";
import { GamificationProvider } from "@/lib/gamification";
import { GamificationToasts } from "@/components/GamificationToasts";
import { I18nProvider } from "@/lib/I18nContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <I18nProvider>
        <GamificationProvider>
          <GamificationToasts />
          {children}
        </GamificationProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
