import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { OfflineScreen } from "@/components/OfflineScreen";
import { InstallAppBanner } from "@/components/InstallAppBanner";
import { GlobalSharePrompt } from "@/components/GlobalSharePrompt";
import { InAppBrowserBanner } from "@/components/InAppBrowserBanner";

// Defaults to the real AdSense publisher ID. Override via NEXT_PUBLIC_ADSENSE_CLIENT_ID
// in Vercel's env vars if this ever needs to change (Settings → Environment Variables).
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-5841910105267784";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cosmic Numbers — Free Numerology Calculator & Daily Horoscope",
    template: "%s | Cosmic Numbers",
  },
  description:
    "Discover your Life Path Number, Destiny Number, and daily horoscope for free. A beautifully designed numerology calculator and zodiac compatibility tool made for India.",
  keywords: [
    "numerology calculator",
    "life path number",
    "daily horoscope",
    "zodiac compatibility",
    "destiny number",
    "soul urge number",
    "personality number",
    "horoscope today",
    "numerology India",
    "free horoscope app",
  ],
  authors: [{ name: "Cosmic Numbers" }],
  openGraph: {
    type: "website",
    siteName: "Cosmic Numbers",
    locale: "en_IN",
    url: SITE_URL,
    title: "Cosmic Numbers — Free Numerology Calculator & Daily Horoscope",
    description:
      "Discover your Life Path Number, Destiny Number, and daily horoscope for free. Beautiful, shareable, and made for India.",
    images: [{ url: "/api/og?type=home&title=Cosmic%20Numbers&subtitle=Numerology%20%2B%20Horoscope", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmic Numbers — Free Numerology Calculator & Daily Horoscope",
    description: "Discover your Life Path Number and daily horoscope, free and beautifully designed.",
    images: ["/api/og?type=home&title=Cosmic%20Numbers&subtitle=Numerology%20%2B%20Horoscope"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cosmic Numbers",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  description:
    "A free numerology calculator and daily horoscope app: Life Path Number, Destiny Number, zodiac compatibility, and gamified cosmic streaks.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Cosmic" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <OfflineScreen />
          <InstallAppBanner />
          <GlobalSharePrompt />
          <InAppBrowserBanner />
          <div
            className="min-h-screen text-[var(--foreground)]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 0%, var(--bg-glow-1), transparent 45%), radial-gradient(circle at 85% 15%, var(--bg-glow-2), transparent 40%), linear-gradient(to bottom, var(--background), var(--background-alt), var(--background))",
            }}
          >
            <NavBar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
