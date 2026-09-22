import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cosmic Numbers handles your data: no backend or database, all readings are computed in your browser, and what happens if Google AdSense ads are enabled.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-soft">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <GlassCard className="space-y-8 p-8">
          <Section title="The short version">
            <p>
              Cosmic Numbers has no backend, no user accounts, and no database. The name and date of birth you
              type in are used only to calculate your numerology, horoscope, or compatibility results directly in
              your own browser — that data is never sent to us or stored on any server we control.
            </p>
          </Section>

          <Section title="What information we process">
            <p>
              When you use a calculator (Numerology, Horoscope, Compatibility, or Nakshatra), the name and date of
              birth you enter are processed entirely client-side, in JavaScript running on your device, to compute
              your result. We do not transmit this information to a server, and we do not collect, log, or store it
              anywhere.
            </p>
            <p>
              If you use a &quot;Share&quot; link for a result, that information (e.g. your name and life path number) is
              encoded directly into the URL as query parameters so the page can regenerate the same result for
              whoever opens the link. It is not saved in a database — it exists only in that URL.
            </p>
          </Section>

          <Section title="Local storage &amp; gamification">
            <p>
              To power streaks, XP, and badges, Cosmic Numbers stores small pieces of data (such as your current
              streak count and which badges you&apos;ve unlocked) in your browser&apos;s local storage. This data stays on
              your device, is never transmitted to us, and can be cleared at any time by clearing your browser&apos;s
              site data for this domain.
            </p>
          </Section>

          <Section title="Hosting &amp; server logs">
            <p>
              This site is hosted on Vercel. Like virtually any web host, Vercel&apos;s infrastructure may automatically
              record standard technical request logs (such as IP address, browser type, and request timestamps) for
              security, performance, and abuse-prevention purposes. We do not access these logs to identify
              individuals, and they are not linked to the numerology or horoscope data you enter.
            </p>
          </Section>

          <Section title="Advertising &amp; Google AdSense">
            <p>
              Cosmic Numbers may display advertisements served by Google AdSense to support the free tools on this
              site. If ads are enabled, Google and its partners may use cookies, device identifiers, and similar
              technologies to serve ads based on your prior visits to this and other websites, and to measure ad
              performance.
            </p>
            <p>
              You can learn more about how Google uses data when you use its partners&apos; sites or apps, and opt out
              of personalized advertising, at{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline"
              >
                policies.google.com/technologies/ads
              </a>
              . You can also manage your ad personalization settings directly at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline"
              >
                adssettings.google.com
              </a>
              . Cosmic Numbers itself does not control how Google&apos;s ad systems process your data — that is
              governed by Google&apos;s own privacy policy.
            </p>
          </Section>

          <Section title="Children's privacy">
            <p>
              This site is intended for a general audience and does not knowingly collect personal information from
              children. Since no personal data is stored on our servers to begin with, there is no account or
              profile data to request the deletion of.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time, for example if we enable new features or
              advertising services. Any changes will be reflected on this page with an updated &quot;last updated&quot;
              date.
            </p>
          </Section>
        </GlassCard>
      </div>
    </div>
  );
}
