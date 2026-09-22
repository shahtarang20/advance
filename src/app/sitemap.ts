import type { MetadataRoute } from "next";
import { ZODIAC_SIGNS } from "@/lib/horoscope";
import { NAKSHATRAS } from "@/lib/nakshatra";

const SITE_URL = "https://cosmic-numbers.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/numerology",
    "/numerology/angel-numbers",
    "/horoscope",
    "/compatibility",
    "/nakshatra",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const legalRoutes = ["/privacy", "/terms"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const signRoutes = ZODIAC_SIGNS.map((z) => ({
    url: `${SITE_URL}/horoscope/${z.sign}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const nakshatraRoutes = NAKSHATRAS.map((n) => ({
    url: `${SITE_URL}/nakshatra/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...legalRoutes, ...signRoutes, ...nakshatraRoutes];
}
