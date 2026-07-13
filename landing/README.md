# FaktriIQ Landing Page

Production-ready marketing landing page for FaktriIQ, built per
`docs/FaktriIQ_Landing_Page_Fable_Prompt.md` with React + Vite + Vanilla CSS
in the Volt & Carbon v2 design language.

## Run

```bash
npm install --include=dev   # this machine's npm config omits dev deps by default
npm run dev                 # dev server
npm run build               # production build -> dist/
npm run preview             # serve the production build
```

## Structure

- `src/index.css` — full Volt & Carbon v2 token set and all styling (no CSS framework)
- `src/components/` — one file per section:
  `NavBar`, `Hero`, `CoreValueProposition`, `ValuePillars`, `TechnologyStrip`,
  `CaseStudyCarousel`, `RolesGrid`, `Footer`
- `public/fonts/` — Satoshi (body/headings) and Striper (logo wordmark),
  copied from the Flutter app's `assets/fonts/`

## Notes

- Interactive state (`useState`): vertical pillar tabs, case-study carousel,
  mobile nav menu.
- `flag` red / `verify` green are used strictly for compliance status in the
  clause-mapping diagram, per the design system.
- Compliance disclaimer strips appear under the clause diagram and in the
  footer, per the project's persistent-disclaimer constraint.
