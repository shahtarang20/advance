"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { NAKSHATRAS } from "@/lib/nakshatra";
import { useGamification } from "@/lib/gamification";
import { useTranslation } from "@/lib/I18nContext";

const PAGE_SIZE = 9;

export function NakshatraGrid() {
  const { recordAction } = useGamification();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    recordAction("nakshatra_browse");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = NAKSHATRAS.filter((n) =>
    n.name.toLowerCase().includes(query.toLowerCase()) || n.deity.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function goToPage(p: number) {
    const next = Math.min(Math.max(p, 1), totalPages);
    setPage(next);
    if (typeof window !== "undefined") {
      document.getElementById("nakshatra-grid-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div>
      <div id="nakshatra-grid-top" className="mx-auto mb-8 max-w-md scroll-mt-24">
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder={t("nak.grid.search")}
          className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
        />
      </div>
      <p className="mb-4 text-center text-xs text-muted-soft">
        {t("nak.grid.showing", {
          start: filtered.length === 0 ? "0" : ((currentPage - 1) * PAGE_SIZE + 1).toString(),
          end: Math.min(currentPage * PAGE_SIZE, filtered.length).toString(),
          total: filtered.length.toString()
        })}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {paged.map((n) => (
          <Link key={n.slug} href={`/nakshatra/${n.slug}`}>
            <GlassCard className="h-full p-6 transition hover:opacity-90">
              <p className="text-xs uppercase tracking-widest text-muted-soft">#{n.order}</p>
              <h2 className="accent-gradient-text mt-1 text-2xl font-bold">{t(`nak.${n.slug}.name`, { defaultValue: n.name })}</h2>
              <p className="mt-2 text-xs text-muted-soft">{t(`nak.${n.slug}.symbol`, { defaultValue: n.symbol })}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{t(`nak.${n.slug}.desc`, { defaultValue: n.description })}</p>
              <div className="mt-4 flex justify-between text-[11px] text-muted-soft">
                <span>{t("nak.grid.ruler", { planet: t(`planet.${n.rulingPlanet.toLowerCase()}`, { defaultValue: n.rulingPlanet }) })}</span>
                <span>{t("nak.grid.deity", { deity: t(`nak.${n.slug}.deity`, { defaultValue: n.deity }).split(",")[0].split(" (")[0] })}</span>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-soft">{t("nak.grid.no_match", { query })}</p>
      )}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-tap accent-ring surface-glass rounded-full border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            {t("nak.grid.prev")}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`btn-tap accent-ring h-11 w-11 rounded-full border text-sm transition ${
                p === currentPage
                  ? "accent-gradient-bg border-transparent text-white"
                  : "surface-glass hover:opacity-80"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-tap accent-ring surface-glass rounded-full border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            {t("nak.grid.next")}
          </button>
        </div>
      )}
    </div>
  );
}
