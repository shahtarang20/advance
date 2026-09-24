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

export function PrivacyClient() {
  const { t } = useTranslation();
  
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("privacy.title", { defaultValue: "Privacy Policy" })}</h1>
        <p className="mt-4 text-muted">
          {t("privacy.last_updated", { defaultValue: "Last updated: {date}", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) })}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <GlassCard className="space-y-8 p-8">
          <Section title={t("privacy.s1.title", { defaultValue: "The short version" })}>
            <p>{t("privacy.s1.p1", { defaultValue: "Cosmic Numbers has no backend, no user accounts, and no database. The name and date of birth you type in are used only to calculate your numerology, horoscope, or compatibility results directly in your own browser — that data is never sent to us or stored on any server we control." })}</p>
          </Section>

          <Section title={t("privacy.s2.title", { defaultValue: "What information we process" })}>
            <p>{t("privacy.s2.p1", { defaultValue: "When you use a calculator (Numerology, Horoscope, Compatibility, or Nakshatra), the name and date of birth you enter are processed entirely client-side, in JavaScript running on your device, to compute your result. We do not transmit this information to a server, and we do not collect, log, or store it anywhere." })}</p>
            <p>{t("privacy.s2.p2", { defaultValue: "If you use a \"Share\" link for a result, that information (e.g. your name and life path number) is encoded directly into the URL as query parameters so the page can regenerate the same result for whoever opens the link. It is not saved in a database — it exists only in that URL." })}</p>
          </Section>

          <Section title={t("privacy.s3.title", { defaultValue: "Local storage & gamification" })}>
            <p>{t("privacy.s3.p1", { defaultValue: "To power streaks, XP, and badges, Cosmic Numbers stores small pieces of data (such as your current streak count and which badges you've unlocked) in your browser's local storage. This data stays on your device, is never transmitted to us, and can be cleared at any time by clearing your browser's site data for this domain." })}</p>
          </Section>

          <Section title={t("privacy.s4.title", { defaultValue: "Hosting & server logs" })}>
            <p>{t("privacy.s4.p1", { defaultValue: "This site is hosted on Vercel. Like virtually any web host, Vercel's infrastructure may automatically record standard technical request logs (such as IP address, browser type, and request timestamps) for security, performance, and abuse-prevention purposes. We do not access these logs to identify individuals, and they are not linked to the numerology or horoscope data you enter." })}</p>
          </Section>

          <Section title={t("privacy.s5.title", { defaultValue: "Advertising & Google AdSense" })}>
            <p>{t("privacy.s5.p1", { defaultValue: "Cosmic Numbers may display advertisements served by Google AdSense to support the free tools on this site. If ads are enabled, Google and its partners may use cookies, device identifiers, and similar technologies to serve ads based on your prior visits to this and other websites, and to measure ad performance." })}</p>
            <p>
              {t("privacy.s5.p2", { defaultValue: "You can learn more about how Google uses data when you use its partners' sites or apps, and opt out of personalized advertising, at " })}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                policies.google.com/technologies/ads
              </a>
              {t("privacy.s5.p3", { defaultValue: ". You can also manage your ad personalization settings directly at " })}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                adssettings.google.com
              </a>
              {t("privacy.s5.p4", { defaultValue: ". Cosmic Numbers itself does not control how Google's ad systems process your data — that is governed by Google's own privacy policy." })}
            </p>
          </Section>

          <Section title={t("privacy.s6.title", { defaultValue: "Children's privacy" })}>
            <p>{t("privacy.s6.p1", { defaultValue: "This site is intended for a general audience and does not knowingly collect personal information from children. Since no personal data is stored on our servers to begin with, there is no account or profile data to request the deletion of." })}</p>
          </Section>

          <Section title={t("privacy.s7.title", { defaultValue: "Changes to this policy" })}>
            <p>{t("privacy.s7.p1", { defaultValue: "We may update this Privacy Policy from time to time, for example if we enable new features or advertising services. Any changes will be reflected on this page with an updated \"last updated\" date." })}</p>
          </Section>
        </GlassCard>
      </div>
    </div>
  );
}
