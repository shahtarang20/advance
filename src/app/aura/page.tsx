import type { Metadata } from "next";
import { AuraTool } from "./AuraTool";
import { Trans } from "@/components/Trans";
import { FeatureGate } from "@/components/FeatureGate";

export const metadata: Metadata = {
  title: "Aura Color & Chakra Calculator",
  description: "Discover your primary Aura Color and Chakra alignment based on your birth date and numerology.",
  alternates: { canonical: "/aura" },
};

export default function AuraPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <FeatureGate feature="aura">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <Trans tKey="aura.page.title" />
          </h1>
          <p className="mt-4 text-muted">
            <Trans tKey="aura.page.desc" />
          </p>
        </div>
        <div className="mt-12">
          <AuraTool />
        </div>
      </FeatureGate>
    </div>
  );
}
