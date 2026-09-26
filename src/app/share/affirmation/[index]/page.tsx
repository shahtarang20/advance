import { redirect } from "next/navigation";
import { Metadata } from "next";
const AFFIRMATIONS = [
  "I trust the universe is unfolding exactly as it should.",
  "I am a magnet for miracles and positive cosmic energy.",
  "My intuition leads me to my highest purpose.",
  "I am aligned with the energy of abundance and joy.",
  "Every star in the sky shines to remind me of my own light.",
  "I release what no longer serves me and welcome new beginnings.",
  "I am deeply connected to the rhythms of the earth and the cosmos.",
  "Today, I attract opportunities that align with my destiny.",
  "I embrace the mystery of the unknown with an open heart.",
  "My spirit is infinite, and my potential is boundless."
];

export async function generateMetadata({ params }: { params: Promise<{ index: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const idx = parseInt(resolvedParams.index, 10);
  const text = !isNaN(idx) && idx >= 0 && idx < AFFIRMATIONS.length ? AFFIRMATIONS[idx] : AFFIRMATIONS[0];
  
  return {
    title: "Daily Cosmic Affirmation",
    description: text,
    openGraph: {
      title: "Daily Cosmic Affirmation",
      description: text,
      images: [{ url: `/api/og?type=home&title=Cosmic%20Affirmation&subtitle=${encodeURIComponent(text)}&ext=.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Daily Cosmic Affirmation",
      description: text,
      images: [`/api/og?type=home&title=Cosmic%20Affirmation&subtitle=${encodeURIComponent(text)}&ext=.png`],
    },
  };
}

export default function AffirmationShareRedirect() {
  redirect("/");
}
