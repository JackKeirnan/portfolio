# Portfolio

Jack Keirnan's personal portfolio site, built with Next.js 15 (App Router), React 19,
Tailwind CSS with daisyUI, and Motion for animation.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Layout

- `src/app/` — routes: home, `/about`, `/work` and `/work/[slug]`
- `src/views/` — the page component each route renders
- `src/components/` — shared sections, navbar and footer
- `src/data/portfolio.ts` — all site content: profile, experience and projects
- `public/Images/` — screenshots and portrait

Add or edit a project in `developer.projects` in `src/data/portfolio.ts`. Set
`enabled: false` to hide one without deleting it.
