# Hive Foundry

Research and technology company website for advanced software, open-weight foundation
models, intelligent systems, and developer infrastructure.

**Dark. Precise. Technical. Experimental. Premium.**

## Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (CSS-first `@theme` config — tokens live in `src/styles/tokens.css`)
- Framer Motion (scroll reveals, spring physics, `prefers-reduced-motion` respected)
- React Router v7 (`react-router-dom`)
- Lucide (icons)
- Fontsource variable fonts: Space Grotesk (display), Inter (body), JetBrains Mono (technical)

## A note on "BEUI" and "React Bits"

Neither `beui` nor `reactbits` exists as an installable npm package (both return
404 from the registry; React Bits is a copy-paste component library). This project
implements both layers in-repo, exactly as React Bits is meant to be consumed:

- **`src/components/ui/`** — the "BEUI-style" primitive layer (Button, ButtonLink,
  StatusDot, SectionHeading, ArrowLink, Emblem, Container).
- **`src/components/motion/`** — React Bits-pattern effects (Reveal, ScrambleText,
  Magnetic, EmblemField canvas) implemented from the Vue/React Bits recipes.

## Layout

```
src/
├── components/
│   ├── navigation/  NavBar (mobile menu)
│   ├── hero/       Hero + EmblemField canvas
│   ├── home/       homepage sections
│   ├── footer/     Footer
│   ├── boot/       page-load boot sequence
│   ├── motion/     Reveal, ScrambleText, Magnetic, EmblemField
│   └── ui/         primitives + Emblem
├── pages/          Home, Models, ModelDetail, Research, Developers, Company,
│                  Careers, Updates, NotFound
├── data/          models, research, roadmap, updates, foundry, navigation
├── hooks/         useScrolled
├── lib/           cn, meta, usePageMeta
├── styles/        tokens.css, globals.css
└── assets/
```

## Commands

```bash
npm run dev       # start dev server
npm run build     # typecheck + production build
npm run preview   # preview the production build
```

## Production notes

- `BrowserRouter` is used for clean URLs. Hosts must serve `index.html` for SPA
  fallback (Vercel/Netlify: default; otherwise add a rewrite for non-file routes).
- `SITE_URL` (`src/lib/meta.ts`) is a placeholder origin — swap for the real domain
  before launch (canonical, sitemap, OG metadata).
- External links (GitHub/X/Discord) are intentionally disabled placeholders until
  real URLs are supplied.
- Model specifications render `To be announced` / `Research in progress` — no
  fabricated values anywhere.
