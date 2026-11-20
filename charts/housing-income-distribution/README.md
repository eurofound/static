# Housing score distributions by income

An 800px-wide Eurofound embed using the embed v1 contract and the ERM colour override dated 17 November 2026, with the three series colours updated to the user's supplied reference.

## Data status

All 81 country/income-group rows are synthetic reconstructions of a supplied chart. Each of the four measures has 27 scores per income group. Country names label synthetic assignments; these are not actual national estimates or rankings. Keep the visible synthetic-data notice and include this qualification in the CMS notes.

`data.json` is the chart's source. It contains the country records, measure definitions and 12 Gaussian KDE bandwidths. `data.csv` contains the same 81 records. The browser computes curves from the delivered rounded scores, with 201 points between 0 and 100. Gaussian kernels are not boundary-corrected; displayed density area can be less than one. Dashed vertical lines show unweighted means of the synthetic scores; curves, gridlines and country ticks are solid.

## Interaction

- Opens with four charts in a 2×2 grid. The top-right icons switch to one chart and back.
- Single-chart mode displays the indicator selector. Its selection is retained when returning from the four-chart view.
- The selector begins at the left edge of the display, with no visible field label. The closed dropdown reads “Selected - [indicator name]”, with a muted prefix. A native select retains keyboard support and an accessible field label; the styled value overlay is hidden from assistive technology.
- Two chevron buttons sit side by side immediately to the right of the dropdown as `< >`: previous on the left, next on the right. They cycle through indicators in dropdown order, wrapping in either direction, and use the same animation as dropdown changes.
- Click a legend button, or activate it with Enter/Space, to show or hide that income group across all charts. The selection is retained across views and indicators. All groups can be hidden, with an explanatory empty state. Hidden country ticks leave the keyboard tab order.
- Groups fade in/out over 300ms; indicator changes and legend filtering morph curve geometry over 300ms. A new selection smoothly interrupts the previous transition. Per the user's explicit design request, indicator and legend changes always animate for 0.3 seconds, including when the browser reports reduced motion; non-chart hover transitions still respect that preference. Each y-axis rescales to the selected groups, using rounded tick intervals and headroom above the highest visible density. The underlying density values are never renormalised. An empty selection uses the original axis range.
- Both modes occupy the same 560px-high chart area at desktop width. The total embed width is capped at 800px, including the theme's 6px edge padding.
- Below 580px, small multiples stack vertically within a 1040px-high area. Both modes keep that area height.
- Country ticks are 18px tall and rest on the x-axis in a separate strip, with a 6px gap between their tops and the density baseline. Hover, focus or tap for names and scores. Overlapping values from all visible income groups are listed together. Tooltip headers contain only the indicator name; each country has a flag, with country/value text coloured by income group and no row highlighting. Income groups are also included in accessible row text.
- X-axis numbers are 10.92px in small multiples (22% smaller than the original 14px) and 14.196px in single-chart mode (30% larger than the small multiples). Vertical gridlines align with 0, 25, 50, 75 and 100 within the distribution plot, leaving the country-tick strip clear.
- Gridlines use a 0.5px stroke at 75% opacity.
- “Density of Member States” appears once, above the top-left chart (or the single chart). Y-axis numbers appear on left-hand panels only in the 2×2 view, and on each chart in single/stacked layouts. The former “Score 0–100” heading is removed.
- Tab reaches one country tick per income group. Left/right arrows move between countries; Home/End reach the extremes. Enter pins the tooltip; Escape dismisses it.
- Mean lines are dashed and 1.44px thick, 20% thicker than the previous 1.2px lines. Each has a separate mean-score tooltip available on hover, focus or tap, with a 12px pointer target. Tooltips do not restyle or outline the mean line. Mean lines are also keyboard focusable, with the focus indicator on their tooltip, and leave the tab order when their group is hidden.

## Embedding

Use `https://static.eurofound.europa.eu/charts/housing-income-distribution/` as the embed URL. Suggested initial height: 751px; `max_width`: 800px. The host adjusts height using the embed's `resize` messages. The page does not redirect or render the host-owned card title, source, logo or download buttons.

The public Eurofound theme stylesheet is linked before `erm-palette.css`. All component and chart colours use semantic tokens. The user's reference colours are Low = chart-1 = #063042 (dark blue), High = chart-3 = #AD5D20 (orange), with Middle = chart-2 = #8F9091 adjusted to a more neutral grey. These values remain stable in both themes; dark mode has no white outlines. Host theme changes retain selections. Unsupported language codes fall back to English, and `ready` announces `languages: ['en']`.

The host can send `hello`, `set-theme` and `export` messages. PNG exports always use the light palette and contain their title, source and synthetic-data notes. PNG and CSV exports respect the selected indicators and income groups. CSV exports contain metadata and 27 rows per selected group (81 when all three are selected); an empty selection exports metadata and headers only. All export generation occurs in the browser. No analytics, cookies, chart CDN or export server is used.

Serve the folder over HTTP(S); the page fetches `data.json` relative to `index.html`. No build step is required. Keep the runtime/data files and `flags/` folder together. The only external assets are the public Eurofound stylesheet and the fonts it supplies. Country flag SVGs are bundled locally from [flag-icons](https://github.com/lipis/flag-icons), under the MIT licence included at `flags/LICENSE`.

## Verification

Checked in the browser: four/single views, dropdown and wrapping chevrons, unchanged 560px desktop chart height, exact 6px gap and 18px country ticks, solid curves and dashed mean lines, legend filters and empty state, country/mean tooltips, light/dark changes, 320px reflow without horizontal page scroll, parent `ready`/`resize` messages, and filtered PNG/CSV exports. The ordinary preview confirmed 300ms indicator morphs and legend rescaling, including intermediate curve/tick positions and opacity during fades. Cross-group tooltip rows showed flags and matching group-coloured text without row highlighting. All 27 bundled flag SVGs parsed successfully. The dataset was checked for 81 unique country/group keys and 324 numeric scores in 0–100. A full screen-reader and WCAG certification audit has not been performed.
