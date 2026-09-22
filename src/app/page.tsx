"use client";

import { useTranslation } from "@/lib/I18nContext";
import { FeatureCard } from "@/components/FeatureCard";
import { GamificationWidget } from "@/components/GamificationWidget";
import { DailyQuestCard } from "@/components/DailyQuestCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-20 sm:pt-28">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-widest text-muted-soft">
          {t("home.hero.subtitle")}
        </p>
        <h1 className="accent-gradient-text text-5xl font-bold tracking-tight sm:text-7xl">
          {t("home.hero.title")}
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg font-normal leading-relaxed text-muted">
          {t("home.hero.desc")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/numerology" variant="primary">
            {t("home.btn.calc")}
          </Button>
          <Button href="/horoscope" variant="secondary">
            {t("home.btn.horoscope")}
          </Button>
        </div>
      </section>

      <div className="mx-auto mt-20 max-w-2xl space-y-6">
        <GamificationWidget />
        <DailyQuestCard />
      </div>

      {/* Feature cards */}
      <Reveal className="mt-28 sm:mt-36">
        <section className="grid gap-6 sm:grid-cols-3">
          <FeatureCard
            href="/numerology"
            icon="🔢"
            title={t("home.feat.num.title")}
            description={t("home.feat.num.desc")}
            gradient="bg-gradient-to-br from-indigo-500/30 to-indigo-500/10"
          />
          <FeatureCard
            href="/horoscope"
            icon="🌙"
            title={t("home.feat.horo.title")}
            description={t("home.feat.horo.desc")}
            gradient="bg-gradient-to-br from-purple-500/30 to-purple-500/10"
          />
          <FeatureCard
            href="/compatibility"
            icon="💫"
            title={t("home.feat.comp.title")}
            description={t("home.feat.comp.desc")}
            gradient="bg-gradient-to-br from-amber-500/30 to-amber-500/10"
          />
        </section>
      </Reveal>

      <div className="mt-20">
        {/* Replace "YOUR_HOME_AD_SLOT_ID" with the real slot id from your AdSense dashboard. */}
        <AdSlot slotId="YOUR_HOME_AD_SLOT_ID" />
      </div>

      {/* Why numerology — SEO content depth */}
      <Reveal className="mt-28 sm:mt-36">
        <section className="grid gap-8 sm:grid-cols-2">
          <GlassCard className="p-8 sm:p-10">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">{t("home.why.title")}</h2>
            <p className="text-base leading-relaxed text-muted">
              {t("home.why.desc")}
            </p>
          </GlassCard>
          <GlassCard className="p-8 sm:p-10">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">{t("home.how.title")}</h2>
            <p className="text-base leading-relaxed text-muted">
              {t("home.how.desc")}
            </p>
          </GlassCard>
        </section>
      </Reveal>
    </div>
  );
}
