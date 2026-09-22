import type { Metadata } from "next";
import { AngelNumbersTool } from "./AngelNumbersTool";

export const metadata: Metadata = {
  title: "Angel Numbers Meaning — 111, 222, 333, 444 & More Explained",
  description:
    "Keep seeing repeating numbers like 111, 222, 444, or 1111? Look up the traditional angel-number meaning for every common repeating sequence, free.",
  alternates: { canonical: "/numerology/angel-numbers" },
  openGraph: {
    title: "Angel Numbers Meaning Reference",
    description: "What do 111, 222, 444, 1111 and other repeating numbers mean? A free reference guide.",
    images: [{ url: "/api/og?type=numerology&title=Angel%20Numbers&subtitle=What%20repeating%20numbers%20mean&big=111" }],
  },
};

export default function AngelNumbersPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Angel Numbers</h1>
        <p className="mt-4 text-muted">
          A quick reference for the repeating numbers people report noticing — 111, 222, 444, 1111, and more.
        </p>
        <p className="mt-3 text-xs text-muted-soft">
          This is folklore and spiritual tradition, not scientific fact — treat these meanings as a reflective
          prompt, not a prediction.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-4xl">
        <AngelNumbersTool />
      </div>
    </div>
  );
}
