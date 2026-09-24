import { MoonPhase as AstroMoonPhase } from "astronomy-engine";

export type MoonPhase = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  manifestationTip: string;
};

const PHASES: MoonPhase[] = [
  {
    id: "new",
    name: "New Moon",
    emoji: "🌑",
    description: "The moon is between the Earth and Sun, appearing invisible.",
    manifestationTip: "A time for new beginnings. Set intentions, plant seeds, and start new projects.",
  },
  {
    id: "waxing_crescent",
    name: "Waxing Crescent",
    emoji: "🌒",
    description: "A small sliver of light appears on the right side.",
    manifestationTip: "Focus on building momentum. Take the first steps toward your new intentions.",
  },
  {
    id: "first_quarter",
    name: "First Quarter",
    emoji: "🌓",
    description: "The right half of the moon is illuminated.",
    manifestationTip: "Action time! Overcome obstacles and make decisive choices to push forward.",
  },
  {
    id: "waxing_gibbous",
    name: "Waxing Gibbous",
    emoji: "🌔",
    description: "More than half of the right side is illuminated.",
    manifestationTip: "Refine and adjust your plans. Trust the process and stay committed.",
  },
  {
    id: "full",
    name: "Full Moon",
    emoji: "🌕",
    description: "The moon is fully illuminated, its energy at its peak.",
    manifestationTip: "A time of culmination and intense energy. Celebrate successes and release what no longer serves you.",
  },
  {
    id: "waning_gibbous",
    name: "Waning Gibbous",
    emoji: "🌖",
    description: "The illumination begins to shrink on the right side.",
    manifestationTip: "Express gratitude. Harvest your efforts and share your wisdom with others.",
  },
  {
    id: "last_quarter",
    name: "Last Quarter",
    emoji: "🌗",
    description: "The left half of the moon is illuminated.",
    manifestationTip: "Forgive, let go, and clear physical and mental space. Tie up loose ends.",
  },
  {
    id: "waning_crescent",
    name: "Waning Crescent",
    emoji: "🌘",
    description: "A small sliver of light remains on the left side.",
    manifestationTip: "Rest, reflect, and restore your energy. Prepare for the next cycle.",
  }
];

export function getCurrentMoonPhase(date: Date = new Date()): MoonPhase {
  // Use professional astronomical ephemeris algorithms for 100% precision
  // MoonPhase returns the exact ecliptic phase angle from 0 to 360 degrees.
  const phaseAngle = AstroMoonPhase(date);
  
  // Convert 360 degrees to a ratio between 0 and 1
  const phaseRatio = phaseAngle / 360;
  
  // Map into 8 distinct phases, each covering exactly 45 degrees of the cycle
  let index = Math.round(phaseRatio * 8);
  if (index >= 8) index = 0;
  
  return PHASES[index];
}
