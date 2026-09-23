import type { Metadata } from "next";
import { PalmistryTool } from "./PalmistryTool";
import { Trans } from "@/components/Trans";
import { GlassCard } from "@/components/ui/GlassCard";
import { PALMISTRY_HISTORY, historyTitleKey, historyTextKey } from "@/lib/palmistry";

export const metadata: Metadata = {
  title: "Palm Reading — Free Palmistry Reading",
  description:
    "Get a free palm reading drawing on Western chiromancy, Indian Hast Rekha Shastra, and Chinese palmistry traditions. For entertainment purposes — folklore, not fact.",
  alternates: { canonical: "/palmistry" },
};

export default function PalmistryPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <Trans tKey="palmistry.page.title" replacements={{ defaultValue: "Palm Reading" }} />
        </h1>
        <p className="mt-4 text-muted">
          <Trans
            tKey="palmistry.page.desc"
            replacements={{
              defaultValue:
                "A reading drawing on Western chiromancy, Indian Hast Rekha Shastra, and Chinese palmistry traditions.",
            }}
          />
        </p>
        <p className="mt-3 text-xs text-muted-soft">
          <Trans
            tKey="palmistry.page.disclaimer"
            replacements={{
              defaultValue:
                "This is folklore and spiritual tradition, not scientific fact — treat this as a reflective prompt, not a prediction.",
            }}
          />
        </p>
      </div>
      <div className="mt-12">
        <PalmistryTool />
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          <Trans tKey="palmistry.history.title" replacements={{ defaultValue: "A Brief History of Palm Reading" }} />
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted">
          <Trans
            tKey="palmistry.history.intro"
            replacements={{
              defaultValue:
                "Palmistry isn't one tradition — it developed independently in several cultures over thousands of years before converging into the system used today.",
            }}
          />
        </p>
        <div className="mt-8 space-y-5">
          {PALMISTRY_HISTORY.map((era) => (
            <GlassCard key={era.id} className="p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-soft">{era.period}</p>
              <h3 className="mt-1 text-lg font-semibold">
                <Trans tKey={historyTitleKey(era.id)} replacements={{ defaultValue: era.title }} />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                <Trans tKey={historyTextKey(era.id)} replacements={{ defaultValue: era.text }} />
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
