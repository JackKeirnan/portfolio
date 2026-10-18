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

- `src/app/` — routes only: `layout.tsx`, `page.tsx`, `globals.css`
- `src/components/` — page sections and the home page
- `src/data/` — project entries and their types
- `src/lotties/` — Lottie animation JSON
- `public/Images/` — screenshots and portrait

Add a project by appending to `src/data/projectdata.tsx` and placing its screenshots in
`public/Images/`.
