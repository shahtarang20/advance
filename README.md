# Cosmic Numbers — Numerology & Daily Horoscope

A fun, gamified numerology and daily horoscope web app. Every calculation
(numerology numbers, daily horoscope, compatibility, XP/streaks/badges) runs
entirely in the browser using plain JavaScript and `localStorage` — there is
no database, no auth, and no external API. The only server-rendered piece is
a dynamic Open Graph image route (`/api/og`), used purely so shared links
unfurl with a rich preview image on WhatsApp.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion for micro-animations
- `next/font` (Inter, as a web-safe stand-in for SF Pro)
- `next/og` (`ImageResponse`) for shareable card images
- `next-themes` for dark/light mode
- No database, no auth, no paid third-party services

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To verify a production build:

```bash
npm run build
npm run start
```

## Project structure

- `src/lib/numerology.ts` — Pythagorean numerology calculations + content bank
- `src/lib/horoscope.ts` — zodiac data + seeded daily horoscope content bank
- `src/lib/compatibility.ts` — numerology-based compatibility scoring
- `src/lib/prng.ts` — deterministic seeded PRNG (mulberry32) so "today's"
  content is the same for every visitor without a backend
- `src/lib/gamification.tsx` — localStorage-backed React context for XP,
  streaks, levels, and badges
- `src/app/numerology`, `src/app/horoscope`, `src/app/compatibility` —
  interactive tool pages
- `src/app/horoscope/[sign]` — 12 statically generated SEO landing pages
- `src/app/result/*` — shareable result pages with dynamic `generateMetadata`
  (used for rich WhatsApp link previews)
- `src/app/api/og/route.tsx` — dynamic OG image generator (edge runtime)
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO plumbing

## Deploying to Vercel

1. Push this repo to GitHub (or any git provider Vercel supports).
2. Go to https://vercel.com/new and import the repository.
3. No environment variables or extra configuration are required — the free
   tier is sufficient since everything is static or edge-rendered.
4. After your first deploy, update the `SITE_URL` constant in
   `src/app/layout.tsx` and `src/app/sitemap.ts` / `src/app/robots.ts` to your
   real production domain (currently a placeholder:
   `https://cosmic-numbers.vercel.app`).

## Adding Google AdSense later

An ad placeholder component already exists at
`src/components/ui/AdSlot.tsx`, with full step-by-step instructions in a code
comment at the top of that file for:

1. Adding the AdSense script tag to `src/app/layout.tsx`.
2. Swapping the placeholder `<div>` for a real `<ins className="adsbygoogle">`
   ad unit.
3. Triggering `adsbygoogle.push({})` after render.
4. Adding a `public/ads.txt` file with your publisher line.

No real ad code is wired in since no AdSense publisher ID exists yet — just
plug it in when you have one.

## Notes

- All personal data (name, date of birth) entered into the calculators stays
  in the browser; nothing is sent to a server or persisted anywhere except
  the visitor's own `localStorage`.
- Numerology and horoscope content is for entertainment purposes.
