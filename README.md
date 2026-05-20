# GTM Mastery — PMM Academy

An interactive playbook for Product Marketing Managers. Built with React + Vite + Tailwind.

## What's inside

- Hero with the case for structured GTM
- 5 Elements of GTM with deep-dive modals (templates, AI prompts, curated resources)
- GTM Motions comparison (PLG, SLG, Hybrid, Partner-Led)
- Cross-Functional Alignment module
- Filterable, searchable Toolkit with cost calculator
- Do's & Don'ts with clickable proof points
- Metrics module with before/after benchmarks
- Interactive Launch Checklist with AI prompts for each of 28 items, progress saved in browser
- GTM Manifesto

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Deploy to Vercel (recommended, free, ~5 min)

The easiest path. You'll get a shareable URL like `gtm-mastery.vercel.app`.

1. Push this folder to a GitHub repo (new or existing)
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click "Add New Project" and import the repo
4. Vercel auto-detects Vite. Leave all settings as defaults
5. Click "Deploy"

That's it. Every push to `main` redeploys automatically.

**Custom domain (optional):** In Vercel project settings → Domains → add your domain. They give you DNS records to add at your registrar.

## Deploy to Netlify (alternative)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com), sign up with GitHub
3. "Add new site" → "Import from Git" → pick the repo
4. Build command: `npm run build`, publish directory: `dist`
5. Deploy

## Deploy without GitHub (drag and drop)

If you'd rather skip GitHub entirely:

```bash
npm install
npm run build
```

This produces a `dist/` folder. Drag that folder onto [app.netlify.com/drop](https://app.netlify.com/drop) for an instant free hosted URL.

## Notes

- The launch checklist saves progress to the visitor's browser via `localStorage`. Each student keeps their own progress.
- No backend, no database, no API keys. Pure static site.
- Fonts (Fraunces + Inter) are loaded from Google Fonts at runtime.

## Updating content

All content lives in `src/GTMMastery.jsx` as plain JavaScript arrays and objects near the top of the component. Edit those, save, and the dev server hot-reloads. Push to GitHub to redeploy.
