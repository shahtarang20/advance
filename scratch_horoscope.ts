import * as Astronomy from "astronomy-engine";

function normalize360(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

export function tropicalLongitude(body: Astronomy.Body, date: Date): number {
  const vec = Astronomy.GeoVector(body, date, true);
  return normalize360(Astronomy.Ecliptic(vec).elon);
}

const TROPICAL_SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo", 
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

const moonLon = tropicalLongitude(Astronomy.Body.Moon, new Date());
const moonSignIndex = Math.floor(moonLon / 30);
const moonSign = TROPICAL_SIGNS[moonSignIndex];
console.log(`Moon is currently at ${moonLon} degrees, in ${moonSign}`);
