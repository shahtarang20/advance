"use client";

import { ThemeProvider } from "next-themes";
import { GamificationProvider } from "@/lib/gamification";
import { GamificationToasts } from "@/components/GamificationToasts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
      <GamificationProvider>
        <GamificationToasts />
        {children}
      </GamificationProvider>
    </ThemeProvider>
  );
}
