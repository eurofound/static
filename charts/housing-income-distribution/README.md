# Housing score distributions by income

An 800px-wide Eurofound embed using the embed v1 contract and the ERM colour override dated 17 November 2026.

## Data status

All 81 country/income-group rows are synthetic reconstructions of a supplied chart. Each of the four measures has 27 scores per income group. Country names label synthetic assignments; these are not actual national estimates or rankings. Keep the visible synthetic-data notice and include this qualification in the CMS notes.

`data.json` is the chart's source. It contains the country records, measure definitions and 12 Gaussian KDE bandwidths. `data.csv` contains the same 81 records. The browser computes curves from the delivered rounded scores, with 201 points between 0 and 100. Gaussian kernels are not boundary-corrected; displayed density area can be less than one. Dashed vertical lines show unweighted means of the synthetic scores.

## Interaction

- Opens with four charts in a 2×2 grid. The top-right icons switch to one chart and back.
- Single-chart mode displays the indicator selector. Its selection is retained when returning from the four-chart view.
- Both modes occupy the same 560px-high chart area at desktop width. The total embed width is capped at 800px, including the theme's 6px edge padding.
- Below 580px, small multiples stack vertically within a 1040px-high area. Both modes keep that area height.
- Country ticks are 18px tall and sit above the x-axis. Hover, focus or tap for names and scores. Overlapping values are listed together.
- Tab reaches one country tick per income group. Left/right arrows move between countries; Home/End reach the extremes. Enter pins the tooltip; Escape dismisses it.

## Embedding

Use `https://static.eurofound.europa.eu/charts/housing-income-distribution/` as the embed URL. Suggested initial height: 741px; `max_width`: 800px. The host adjusts height using the embed's `resize` messages. The page does not redirect or render the host-owned card title, source, logo or download buttons.

The public Eurofound theme stylesheet is linked before the exact `erm-palette.css` override. All component and chart colours use semantic tokens. Comparison colours remain Low = chart-1, Middle = chart-2, High = chart-3. Both themes are supported, including host changes without losing the selected view. Unsupported language codes fall back to English, and `ready` announces `languages: ['en']`.

The host can send `hello`, `set-theme` and `export` messages. PNG exports always use the light palette and contain their title, source and synthetic-data notes. CSV exports contain metadata and the 81 rows for the indicators currently displayed. All export generation occurs in the browser. No analytics, cookies, chart CDN or export server is used.

Serve the folder over HTTP(S); the page fetches `data.json` relative to `index.html`. No build step is required. Keep all six runtime/data files together. The only external assets are the public Eurofound stylesheet and the fonts it supplies.

## Verification

Checked in the browser: four/single views, dropdown selection, unchanged 560px desktop chart height, 18px country ticks, 324 versus 81 rendered ticks, keyboard tooltip navigation and Escape, light/dark changes with selection retained, 320px reflow without horizontal page scroll, parent `ready`/`resize` messages, and PNG/CSV exports. The dataset was checked for 81 unique country/group keys and 324 numeric scores in 0–100. A full screen-reader and WCAG certification audit has not been performed.
