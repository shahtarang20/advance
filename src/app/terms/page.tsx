import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using Cosmic Numbers' free numerology, horoscope, compatibility, and nakshatra tools.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

import { TermsClient } from "./TermsClient";

export default function TermsPage() {
  return <TermsClient />;
}
