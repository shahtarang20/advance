import { TarotTable } from "./TarotTable";
import { Trans } from "@/components/Trans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Tarot Reading — Draw Your Cards",
  description: "Draw your daily Tarot cards. Get a free 1-card daily pull or a 3-card Past, Present, Future reading.",
  alternates: { canonical: "/tarot" },
  openGraph: {
    title: "Daily Tarot Reading",
    description: "Draw your daily Tarot cards. Get a free 1-card daily pull or a 3-card Past, Present, Future reading.",
    images: [{ url: "/api/og?type=tarot&title=Tarot%20Reading&subtitle=Draw%20your%20cards" }],
  },
};

export default function TarotPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <Trans tKey="tarot.title" />
        </h1>
        <p className="mt-4 text-muted">
          <Trans tKey="tarot.desc" />
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-5xl">
        <TarotTable />
      </div>
    </div>
  );
}
