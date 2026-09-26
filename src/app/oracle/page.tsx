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
    <div className="px-4 py-4 md:py-8 h-[calc(100dvh-70px)] max-h-[1000px] flex flex-col">
      <div className="mx-auto max-w-2xl text-center mb-4 shrink-0 hidden sm:block">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-2">
          <Trans tKey="oracle.page.title" />
        </h1>
        <p className="text-sm text-muted">
          <Trans tKey="oracle.page.desc" />
        </p>
      </div>
      <OracleChat />
    </div>
  );
}
