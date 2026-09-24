"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/lib/I18nContext";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-soft">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export function TermsClient() {
  const { t } = useTranslation();
  
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("terms.title", { defaultValue: "Terms of Service" })}</h1>
        <p className="mt-4 text-muted">
          {t("privacy.last_updated", { defaultValue: "Last updated: {date}", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) })}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <GlassCard className="space-y-8 p-8">
          <Section title={t("terms.s1.title", { defaultValue: "Entertainment purposes only" })}>
            <p>{t("terms.s1.p1", { defaultValue: "Cosmic Numbers provides numerology readings, daily horoscopes, zodiac compatibility scores, and nakshatra information for entertainment and self-reflection purposes only. Numerology and astrology are traditional and spiritual systems of interpretation, not scientific fact, and nothing on this site constitutes medical, legal, financial, psychological, or professional advice of any kind." })}</p>
            <p>{t("terms.s1.p2", { defaultValue: "You should not make important life decisions — financial, medical, relationship, or otherwise — based solely on content from this site." })}</p>
          </Section>

          <Section title={t("terms.s2.title", { defaultValue: "No account, free to use" })}>
            <p>{t("terms.s2.p1", { defaultValue: "Cosmic Numbers does not require an account or payment to use. Streaks, XP, and badges shown on the site are a lightweight gamification layer stored only in your browser, and have no monetary value." })}</p>
          </Section>

          <Section title={t("terms.s3.title", { defaultValue: "Provided \"as is\"" })}>
            <p>{t("terms.s3.p1", { defaultValue: "This site and all of its content are provided \"as is\" and \"as available,\" without warranties of any kind, whether express or implied, including but not limited to accuracy, reliability, availability, or fitness for a particular purpose. We do not guarantee the site will be uninterrupted, error-free, or available at all times." })}</p>
          </Section>

          <Section title={t("terms.s4.title", { defaultValue: "Limitation of liability" })}>
            <p>{t("terms.s4.p1", { defaultValue: "To the fullest extent permitted by law, Cosmic Numbers and its creators are not liable for any damages or losses arising from your use of, or reliance on, this site or its content, including any decisions made based on a numerology reading, horoscope, or compatibility result." })}</p>
          </Section>

          <Section title={t("terms.s5.title", { defaultValue: "Acceptable use" })}>
            <p>{t("terms.s5.p1", { defaultValue: "You agree not to misuse the site — for example, by attempting to disrupt its normal operation, scraping it at abusive volume, or using it to harass or impersonate others via the shareable result links." })}</p>
          </Section>

          <Section title={t("terms.s6.title", { defaultValue: "Third-party advertising" })}>
            <p>
              {t("terms.s6.p1", { defaultValue: "This site may display advertising served by Google AdSense or similar ad networks. Ads are subject to the ad network's own terms and privacy practices, described further in our " })}
              <a href="/privacy" className="text-purple-600 underline">
                {t("privacy.title", { defaultValue: "Privacy Policy" })}
              </a>
              .
            </p>
          </Section>

          <Section title={t("terms.s7.title", { defaultValue: "Changes to these terms" })}>
            <p>{t("terms.s7.p1", { defaultValue: "We may update these Terms of Service from time to time as the site evolves. Continued use of the site after changes are posted means you accept the updated terms. We'll update the \"last updated\" date above whenever changes are made." })}</p>
          </Section>
        </GlassCard>
      </div>
    </div>
  );
}
