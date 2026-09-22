import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using Cosmic Numbers' free numerology, horoscope, compatibility, and nakshatra tools.",
  alternates: { canonical: "/terms" },
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

export default function TermsPage() {
  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-muted">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <GlassCard className="space-y-8 p-8">
          <Section title="Entertainment purposes only">
            <p>
              Cosmic Numbers provides numerology readings, daily horoscopes, zodiac compatibility scores, and
              nakshatra information for entertainment and self-reflection purposes only. Numerology and astrology
              are traditional and spiritual systems of interpretation, not scientific fact, and nothing on this
              site constitutes medical, legal, financial, psychological, or professional advice of any kind.
            </p>
            <p>
              You should not make important life decisions — financial, medical, relationship, or otherwise —
              based solely on content from this site.
            </p>
          </Section>

          <Section title="No account, free to use">
            <p>
              Cosmic Numbers does not require an account or payment to use. Streaks, XP, and badges shown on the
              site are a lightweight gamification layer stored only in your browser, and have no monetary value.
            </p>
          </Section>

          <Section title="Provided &quot;as is&quot;">
            <p>
              This site and all of its content are provided &quot;as is&quot; and &quot;as available,&quot; without warranties of
              any kind, whether express or implied, including but not limited to accuracy, reliability,
              availability, or fitness for a particular purpose. We do not guarantee the site will be uninterrupted,
              error-free, or available at all times.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the fullest extent permitted by law, Cosmic Numbers and its creators are not liable for any
              damages or losses arising from your use of, or reliance on, this site or its content, including any
              decisions made based on a numerology reading, horoscope, or compatibility result.
            </p>
          </Section>

          <Section title="Acceptable use">
            <p>
              You agree not to misuse the site — for example, by attempting to disrupt its normal operation,
              scraping it at abusive volume, or using it to harass or impersonate others via the shareable result
              links.
            </p>
          </Section>

          <Section title="Third-party advertising">
            <p>
              This site may display advertising served by Google AdSense or similar ad networks. Ads are subject to
              the ad network&apos;s own terms and privacy practices, described further in our{" "}
              <a href="/privacy" className="text-purple-300 underline">
                Privacy Policy
              </a>
              .
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              We may update these Terms of Service from time to time as the site evolves. Continued use of the
              site after changes are posted means you accept the updated terms. We&apos;ll update the &quot;last updated&quot;
              date above whenever changes are made.
            </p>
          </Section>
        </GlassCard>
      </div>
    </div>
  );
}
