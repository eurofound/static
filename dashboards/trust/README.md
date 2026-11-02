# Trust Explorer

Public page: https://static.eurofound.europa.eu/dashboards/trust/

## Files

- `index.html`: dashboard markup and styles; no site header or standalone export buttons.
- `chart.js`: chart rendering, selections and responsive layout.
- `year-playback.js`: play/pause state and chronological looping through available years.
- `year-playback.test.js`: looping, pause/resume and single-timer regression checks.
- `trends.js`: expandable country trends and synchronized year/value highlights.
- `trends.test.js`: source scores, complete country series, gaps and nearest-year selection.
- `exports.js`: CSV/PNG exports and the website's iframe message hooks.
- `exports.test.js`: export data, CSV quoting and permitted-parent checks.
- `Trust.csv`: the dashboard data, loaded using the relative path `./Trust.csv`.
- `trust.html`: a compatibility redirect to the folder's index page.
- `data-provenance.json`: source survey asset, questions, statistics and included rounds.
- `validate-data.py`: dependency-free checks for coverage, round selection and known source values.
- `eurofound-logo.svg`: official stacked Eurofound logo, copied from the website's survey explorer assets.
- `label-layout.js`: positions measured country labels without overlap or clipping at the plot edges.
- `label-layout.test.js`: regression checks for nearby dots, edge positions and deselection.

## Current data

Updated on 20 October 2026 using the published Living and working in the EU
e-survey dataset: Storyblok space `279033`, CSV asset `228771473524831`.
The question JSON files were read from the existing verified copies in the
dashboard's Blob store. No source or destination storage was modified.

The CSV contains 980 observations: seven indicators, the 27 EU countries plus the
reported European Union aggregate, and five rounds:

| Year | Round |
| --- | --- |
| 2021 | 3 |
| 2022 | 5 |
| 2023 | 6 |
| 2024 | 7 |
| 2025 | 8 |

Round 4 is explicitly excluded. Keep only indicators available in every included
round: government, European Union, healthcare system, news media, police, social
media and trust in people. There is no combined score.

Use category `All` and response label `Mean`; preserve the source EU aggregate
instead of taking an average of country means. Round each reported mean directly
to one decimal place. All five years were refreshed from the same source; 121
historical displayed values differ from the previous CSV by 0.1, with no larger
historical differences.

The additional `Round` column prevents ambiguous annual selections. The chart
also checks the year/round pairs and indicator names before plotting. The newest
included year, 2025, is the default. Keep the existing columns
(`Country`, `Metric`, `Year`, `Score`) when updating the file.
The selector displays years only; round selection remains explicit in the data.

The footer contains the requested source link and short response-scale note,
with no heading. Text occupies 90% of its width and the Eurofound logo the
right-hand 10%.
On phones the logo retains a readable 64 px width.

Country flags and names sit in reserved space above the first chart row, with
connector lines to their dots. Their full rendered widths determine spacing.
Labels are keyed by country and repositioned together after selection, replacement,
deselection, year changes and resizing. Selecting a third country replaces the
oldest of the two selections; deselecting removes its label and highlights immediately.

## Mobile and website downloads

### Country trends

The small line-chart icon and caret above the right edge of the
chart expand a discreet trends pane. It starts collapsed. Selecting a country
shows seven line charts aligned with the indicator rows; selecting a second
country adds a second column. Each column has the country's name without a flag.
Replacing, deselecting or clearing countries updates both the beeswarm and trends.
With no selection, the expanded pane prompts the user to select a country.

All sparklines use the complete 2021–2025 series and the same fixed 2–8 vertical
scale, with a left y-axis line and permanent dots at the first and last values.
There are no vertical panel dividers or horizontal separators between sparklines.
Both countries' lines and dots are grey, with slightly darker grey year/value readouts.
Vertical gaps between y-axis extents are reduced by 25%: 37.5 px on desktop,
with taller sparklines that retain indicator alignment, and 54 px on mobile,
where the independent trend rows use a 94 px pitch.
Only the first chart in each country column shows its start and end years;
there are no other axis labels. The current survey-year score is highlighted as
a number. Hovering any sparkline synchronizes the year, dot, guide and year/value
readout across every country's seven charts. Leaving restores the current-year
score. Keyboard users can focus a sparkline and use Left/Right, Home/End or Escape.

Below 960 px, an open trends pane moves beneath the main chart with indicator
headings and the country columns side by side. This keeps the main plot readable
on tablets and phones. Collapsing restores the original chart space. Trends are
native SVG and are included in existing PNG downloads when the pane is expanded;
CSV downloads retain the current year's 196 observations.

Run `node --test dashboards/trust/trends.test.js` for trend-data changes. Verify
one and two countries, replacement/deselection, shared hover and keyboard years,
collapse/reopen, 320/390/768 px layouts and PNG downloads after layout changes.

### Existing controls and downloads

At narrow widths, controls stack and indicator headings move above their dots.
Each row gets enough height for its actual swarm. Country labels use a second
row when needed. Resizing keeps the current year and selections. Mobile year
changes animate the row headings and guides together with the dots.

The discreet play/pause button beside the year selector advances every 0.7 seconds
through 2021–2025, then loops back to 2021. Playback starts only on request and
retains both selected countries. Choosing a year manually, hiding the page or
requesting a CSV/PNG download pauses playback. The current year is retained.
Flags, country names, connector endpoints, selected-country lines and dots share
the same 650 ms easing. Rapid year changes continue from their visible positions.
Year and selection changes retain the original 650 ms animation, including when
the browser reports a reduced-motion preference. Playback is always user-started.

Verified on 28 October 2026: a complete playback loop, pause/resume, manual-year
pause, keyboard control, interrupted year transitions and 320/390 px layouts.
Sampled full-motion frames kept both top connectors aligned with their selected
points. All 11 playback/layout/export tests and the 980-value data check passed.

The existing Storyblok website iframe controls in
`components/publications/details/data-item-card.tsx` send these messages:

- `download-png`: save a PNG of the current year and highlighted countries, including
  the title, EU legend, country flags, source note and Eurofound logo.
- `download-csv`: save all 196 observations plotted for the current year. Dimmed
  countries remain plotted and are included; `Highlighted` records the selection.
  The file retains indicator, score, unit, year, round and source URL.
- `get-chart-data`: reply with `chart-data` containing the same export rows.

The iframe announces `chart-ready` after loading. It accepts requests only from
its parent window on the same origin, HTTPS Eurofound subdomains or
`https://app.storyblok.com`. It also exposes `getChartData`, `getChartCSV`,
`downloadChartCSV`, `downloadChartPNG` and the existing `window.chart` compatibility
methods. There are deliberately no download buttons within the dashboard.

These are browser message hooks, not Storyblok publishing webhooks. No CMS
credentials or server export service are required. The website controls the
iframe height; the existing 650 px embed scrolls internally when content is taller.

PNG assets are embedded in the generated image. Exports do not rely on HTML
foreignObject rendering or external flag styles in the saved file. The image is
generated locally in the browser at twice the displayed SVG resolution.

Verified on 27 October 2026: widths 320, 390 and 768 px plus desktop, long country
labels, replacement/deselection, CSV values against all 196 source observations,
desktop/mobile PNG generation and the parent message flow. No survey data changed.

Run `python dashboards/trust/validate-data.py` from the repository root before
publishing, and `node --test dashboards/trust/label-layout.test.js dashboards/trust/exports.test.js`
for layout/export changes; also run `node --test dashboards/trust/year-playback.test.js`
for playback changes. Serve the repository locally and check every year, country
comparisons, the default year and footer. GitHub Pages publishes `gh-pages`;
changes to `master` do not update this dashboard.

## Migration

Moved from `thomasdavid/dashboard` into `eurofound/static` on the `gh-pages` publishing branch on 25 September 2026.

Source page: https://thomasdavid.github.io/dashboard/trust.html

The chart code and styling are unchanged. The document title and home link use Eurofound branding, and the CSV is loaded from this folder instead of the personal repository. D3 and flag-icons retain their existing jsDelivr dependencies.

Source Git blob hashes:

- `trust.html`: `412b66a067b476eee8c2904d494ee0b6fcc602d8`
- `Trust.csv`: `fe9f0b0eb0911dce5d31eb1d0af93295949cd413`

At migration, the CSV was copied byte-for-byte, including its UTF-8 BOM and CRLF
line endings: 896 records covering 2021–2024. The current data update is documented
above.

