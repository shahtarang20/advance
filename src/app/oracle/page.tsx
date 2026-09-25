import type { Metadata } from "next";
import { OracleChat } from "@/components/OracleChat";
import { Trans } from "@/components/Trans";

export const metadata: Metadata = {
  title: "Mystic Oracle Chat",
  description: "Chat with the Mystic Oracle for daily guidance and answers to your deepest questions.",
  alternates: { canonical: "/oracle" },
};

export default function OraclePage() {
  return (
    <div className="px-4 pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">
          <Trans tKey="oracle.page.title" />
        </h1>
        <p className="text-muted">
          <Trans tKey="oracle.page.desc" />
        </p>
      </div>
      <OracleChat />
    </div>
  );
}
