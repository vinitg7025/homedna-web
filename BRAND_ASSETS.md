# HomeDNA logo assets: which file goes where

Source: the designer's folder `HomeDNA Logo/`. Files are copied unchanged (renamed for the web) by
`scripts/build_brand_assets.py` into `public/brand/` (website); pass the engine's `static/brand` folder as a second argument to copy them there too.
Only the app-icon tiles are composed (the designer's white mark on a midnight square).

Colour versions (exact values read from the files): **brand** = Midnight `#1B2A4A`, **gold** ("Secondary Colour") = `#C9A84C`, **white** = `#FFFFFF`.

| Use it for | File | Why |
|---|---|---|
| Header on a light bar (scrolled site header, every engine page header) | `logo-horizontal-brand.png` | Midnight on off-white |
| Header over the midnight hero (site home, before scrolling) | `logo-horizontal-white.png` | White on midnight |
| Footer (midnight) on the site and the engine | `logo-horizontal-white.png` | White on midnight |
| Questionnaire opening screen (midnight) | `mark-white.svg` | Mark alone, quiet anchor |
| Printed / saved-as-PDF report (white page) | `logo-horizontal-brand.png` | Screen header is hidden in print |
| Browser tab, home-screen icon | `favicon.svg`, `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png`, `icon-512.png` | White mark on a midnight tile |
| Payment window icon (HTTPS only) | `icon-512.png` | |
| Large / social / presentation use | `poster-midnight.png`, `poster-light.png` | Carry the designer's tagline lockup |
| Square placements that need the name (avatars, stacked lockups) | `logo-stacked-*.svg/png` | Mark above wordmark |

Rules
- Midnight (brand) logo only on light backgrounds (off-white, parchment). White logo only on midnight.
- Gold logo only on midnight, as a rare accent (gold on off-white is about 2:1 contrast). The brand allows gold about three times per page.
- Never on pure black. The designer's gold-on-black poster ("Secondary Colour.png") is deliberately NOT used (pure black is outside the palette).
- Do not recolour, stretch, outline or add effects; keep the clear space (the horizontal files already include a margin).
- Smallest sizes: horizontal lockup 28 px high, mark alone 24 px.
- The poster files contain the line "DISCOVER WHAT FITS". It is not in the written brand documents, so the website does not use it as copy until it is approved.
