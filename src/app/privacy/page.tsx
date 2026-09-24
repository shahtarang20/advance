import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cosmic Numbers handles your data: no backend or database, all readings are computed in your browser, and what happens if Google AdSense ads are enabled.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

import { PrivacyClient } from "./PrivacyClient";

export default function PrivacyPage() {
  return <PrivacyClient />;
}
