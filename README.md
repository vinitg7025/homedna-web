# HomeDNA website

The marketing site and the questionnaire (React + TypeScript + Vite + Tailwind).
**It decides nothing.** The questionnaire sends its answers to the HomeDNA engine (separate repository, `homedna-engine`),
which computes the birth chart, applies the rule book and returns the report.

## Run locally
1. Start the engine (see its README): `HOMEDNA_ALLOWED_ORIGINS=http://localhost:5173 python3 app.py` (port 8080)
2. `cp .env.example .env.local` (it points at `http://localhost:8080`)
3. `npm ci && npm run dev` -> http://localhost:5173

## Scripts
`npm run dev` · `npm run build` · `npm run typecheck` · `npm run preview`

## Production
- `npm run build` produces `dist/` (static files). `.env.production` sets `VITE_API_BASE_URL=https://app.homedna.in`.
- The engine must list this site's address in its `HOMEDNA_ALLOWED_ORIGINS`.
- Logos and icons: see `BRAND_ASSETS.md` (which file goes where, and the colour rules).
- Search engines currently see one page, because pages use `#/...` addresses.

## Notes
- `metadata.json` and `assets/.aistudio/` come from Google AI Studio, where this project began; keep them only if you still sync with AI Studio.
