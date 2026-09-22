import type { Metadata } from "next";
import { CompatibilityTool } from "./CompatibilityTool";

export const metadata: Metadata = {
  title: "Numerology Compatibility Calculator — Love Match Percentage",
  description:
    "Check your cosmic compatibility with a partner, crush, or friend using numerology-based Life Path matching. Free, instant, and shareable.",
  alternates: { canonical: "/compatibility" },
  openGraph: {
    title: "Numerology Compatibility Calculator",
    description: "Check your love match percentage using numerology Life Path Numbers.",
    images: [{ url: "/api/og?type=compatibility&title=Compatibility%20Calculator&subtitle=Find%20your%20match%20%25" }],
  },
};

export default function CompatibilityPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Compatibility Calculator</h1>
        <p className="mt-4 text-muted">
          Enter two names and birth dates to see your numerology-based cosmic
          match percentage — perfect for friends, couples, or crushes.
        </p>
      </div>
      <div className="mt-12">
        <CompatibilityTool />
      </div>
    </div>
  );
}
