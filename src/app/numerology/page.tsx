import type { Metadata } from "next";
import Link from "next/link";
import { NumerologyTool } from "./NumerologyTool";

export const metadata: Metadata = {
  title: "Free Numerology Calculator — Life Path, Destiny & Soul Urge Number",
  description:
    "Calculate your Life Path Number, Destiny Number, Soul Urge Number, and Personality Number free, instantly, using your name and date of birth. No sign-up required.",
  alternates: { canonical: "/numerology" },
  openGraph: {
    title: "Free Numerology Calculator",
    description: "Calculate your Life Path, Destiny, Soul Urge and Personality numbers instantly.",
    images: [{ url: "/api/og?type=numerology&title=Numerology%20Calculator&subtitle=Find%20your%20Life%20Path%20Number" }],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Life Path Number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your Life Path Number is calculated from your full date of birth and is considered the most important number in numerology, representing your core personality and life purpose.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Destiny Number calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Destiny (or Expression) Number is calculated by converting every letter of your full birth name into numbers using the Pythagorean system and reducing the total to a single digit or master number.",
      },
    },
    {
      "@type": "Question",
      name: "What are master numbers in numerology?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "11, 22, and 33 are considered master numbers and are not reduced further like other numbers. They carry heightened spiritual significance and potential.",
      },
    },
  ],
};

export default function NumerologyPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Numerology Calculator</h1>
        <p className="mt-4 text-muted">
          Enter your full birth name and date of birth to reveal your four core
          numerology numbers, each with a genuine, detailed reading.
        </p>
      </div>
      <div className="mt-12">
        <NumerologyTool />
      </div>
      <div className="mx-auto mt-16 max-w-2xl text-center">
        <p className="text-sm text-muted">
          Keep seeing the same number everywhere?{" "}
          <Link href="/numerology/angel-numbers" className="text-purple-600 underline">
            Look up its angel-number meaning →
          </Link>
        </p>
      </div>
    </div>
  );
}
