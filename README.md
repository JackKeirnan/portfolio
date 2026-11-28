# Portfolio

Jack Keirnan's personal portfolio, presented as JackOS: an early-2000s style
desktop (and phone-OS mode on small screens). Built with Next.js 15 (App
Router), React 19 and CSS Modules.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Layout

- `src/data/portfolio.ts` — all site content: profile, experience and projects
- `src/os/` — JackOS core: window manager, app registry, routes, shells, theme
- `src/apps/` — one folder per app (About Me, My Projects, Terminal, ...)
- `src/app/(os)/` — desktop routes; pages only set metadata, the layout mounts JackOS
- `src/app/plain/` — plain text version of the CV and contact details
- `public/Images/` — screenshots and portrait

## Tests

- `npm test` — unit tests (Vitest)
- `npm run test:e2e` — browser smoke tests (Playwright)

Add or edit a project in `developer.projects` in `src/data/portfolio.ts`. Set
`enabled: false` to hide one without deleting it.
