import { FeatureCard } from "@/components/FeatureCard";
import { GamificationWidget } from "@/components/GamificationWidget";
import { DailyQuestCard } from "@/components/DailyQuestCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="surface-glass mb-4 inline-block rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest text-muted">
          ✦ Free · No Sign-up · Made for India
        </p>
        <h1 className="accent-gradient-text text-4xl font-bold tracking-tight sm:text-6xl">
          Your Numbers. Your Stars. Your Story.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Discover your Life Path Number, read your daily horoscope, and check
          cosmic compatibility with anyone — all calculated instantly, right in
          your browser, and beautifully designed to share.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/numerology" variant="primary">
            Calculate My Numbers
          </Button>
          <Button href="/horoscope" variant="secondary">
            Read Today&apos;s Horoscope
          </Button>
        </div>
      </section>

      <div className="mx-auto mt-14 max-w-2xl space-y-6">
        <GamificationWidget />
        <DailyQuestCard />
      </div>

      {/* Feature cards */}
      <section className="mt-20 grid gap-6 sm:grid-cols-3">
        <FeatureCard
          href="/numerology"
          icon="🔢"
          title="Numerology Calculator"
          description="Get your Life Path, Destiny, Soul Urge, and Personality numbers, each with a real, in-depth reading."
          gradient="bg-gradient-to-br from-indigo-500/30 to-indigo-500/10"
        />
        <FeatureCard
          href="/horoscope"
          icon="🌙"
          title="Daily Horoscope"
          description="A fresh horoscope every day for all 12 zodiac signs — love, career, health, lucky number and color."
          gradient="bg-gradient-to-br from-purple-500/30 to-purple-500/10"
        />
        <FeatureCard
          href="/compatibility"
          icon="💫"
          title="Compatibility Check"
          description="See your cosmic match percentage with a friend, partner, or crush based on numerology."
          gradient="bg-gradient-to-br from-amber-500/30 to-amber-500/10"
        />
      </section>

      <div className="mt-16">
        {/* Replace "YOUR_HOME_AD_SLOT_ID" with the real slot id from your AdSense dashboard. */}
        <AdSlot slotId="YOUR_HOME_AD_SLOT_ID" />
      </div>

      {/* Why numerology — SEO content depth */}
      <section className="mt-20 grid gap-10 sm:grid-cols-2">
        <GlassCard className="p-8">
          <h2 className="mb-3 text-2xl font-semibold">Why Numerology?</h2>
          <p className="text-sm leading-relaxed text-muted">
            Numerology is the ancient practice of finding meaning in numbers —
            especially the ones already hiding in your name and birth date.
            Rooted in Pythagorean mathematics, it reduces your personal
            details into single, powerful digits that are said to reveal your
            personality, life purpose, and hidden strengths. Millions of
            people across India use numerology alongside astrology to
            understand themselves better, choose auspicious dates, and make
            sense of big life decisions. Whether you take it as spiritual
            insight or a fun personality mirror, your numbers offer a
            surprisingly specific snapshot of who you are.
          </p>
        </GlassCard>
        <GlassCard className="p-8">
          <h2 className="mb-3 text-2xl font-semibold">How This App Works</h2>
          <p className="text-sm leading-relaxed text-muted">
            Everything here runs instantly in your own browser — your name
            and birth date are never sent to a server or stored anywhere
            except your device&apos;s local storage. We use the standard
            Pythagorean reduction method for numerology, and a deterministic
            daily algorithm for horoscopes, so the same day always produces
            the same reading for everyone. Track your streaks, earn Cosmic
            XP, unlock badges, and share any reading as a beautiful card on
            WhatsApp — no account required, ever.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
