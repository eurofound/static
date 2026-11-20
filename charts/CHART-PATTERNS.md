# Eurofound chart patterns

Recorded 20 November 2026 from the housing-chart work. This is a reusable implementation reference, not a replacement for the Eurofound design manual or a statistical methodology standard. It records the final choices in this session; current user instructions and approved project guidance take precedence.

Canonical reference: [charts/CHART-PATTERNS.md](https://github.com/eurofound/static/blob/gh-pages/charts/CHART-PATTERNS.md). Update that reference when recording a later decision, and refresh the local skill's bundled copy.

## Working examples

| Pattern | Live example | Source and data |
| --- | --- | --- |
| Four density charts, three income groups, country ticks | [Income distributions](https://static.eurofound.europa.eu/charts/housing-income-distribution/) | [Code and README](https://github.com/eurofound/static/tree/gh-pages/charts/housing-income-distribution) |
| The same density layout with two tenure groups | [Owner/renter distributions](https://static.eurofound.europa.eu/charts/housing-tenure-distribution/) | [Code and README](https://github.com/eurofound/static/tree/gh-pages/charts/housing-tenure-distribution) |
| Two annual percentage series, side-by-side or combined | [Figure 1](https://static.eurofound.europa.eu/charts/housing-figure-1/) | [Code and README](https://github.com/eurofound/static/tree/gh-pages/charts/housing-figure-1) |

[Reproducible source snapshot](https://github.com/eurofound/static/tree/44d27a6ff919bda2caa3f39e5e69e88cc79f582e/charts) contains the versions described here. Live files may evolve. Inspect the current code and data before adapting an example.

## Technology and file layout

These embeds use plain HTML, CSS and JavaScript, with SVG drawn directly by the application. No external chart library, framework or build step is required. This is a useful option for small standalone embeds; it is not a reason to replace an existing Highcharts or React application.

- `index.html`: semantic controls, theme/language initialisation and asset links.
- `app.js`: data validation, SVG rendering, interactions, animation and embed messages.
- `styles.css`: layout, controls and tooltips.
- `erm-palette.css`: centrally defined colour tokens, including light/dark choices.
- `data.json`: runtime data and metadata; `data.csv`: portable source data.
- `flags/`: local country flag SVGs and their licence, where needed.
- `README.md`: provenance, mapping, behaviour and verification notes.

PNG exports render SVG through the browser Canvas API. CSV exports retain the current selection and source metadata. Serve over HTTP(S), because the page fetches JSON. The examples are hosted in `eurofound/static`, branch `gh-pages`, under `charts/`.

## Shared visual conventions

Use the public [Eurofound embed theme](https://www.eurofound.europa.eu/api/embed/v1/theme.css), followed by the approved ERM/project palette and local CSS. The manual used here was the ERM colour edition dated 17 November 2026. Fonts, surfaces, chart furniture and focus colours come from theme tokens; series values belong in the palette file.

- Maximum embed width: **800px**, including the theme's 6px body padding. Preserve fluid sizing down to 320px.
- Small layout icons above the chart at the top right: 36px buttons with accessible names and pressed states. Put controls above the plot, without adding a surrounding dashboard card.
- Solid data lines. Light horizontal and vertical gridlines: **0.5px at 75% opacity** in these examples.
- Use consistent y scales across directly comparable small multiples. When filtering changes the scale, calculate it from all visible series across those panels. Keep a zero baseline for these density and percentage examples.
- Avoid repeating y-axis numbers on right-hand panels; show them on every chart when panels stack. Keep units visible and unambiguous.
- Selectable legends retain series identity and colours. Support an explicit all-hidden state.
- No white line outlines in dark mode. Check actual contrast on the host surface; theme support alone is not an accessibility audit.
- The host owns the normal page title, source, notes and download controls. Include title/source/notes in exports. The visible **DUMMY DATA** heading is an explicit exception for the synthetic examples only.

The examples reflow around a 580px viewport width. When adapting them, coordinate CSS breakpoints with the SVG's available inner width and test the transition, not just phone and desktop endpoints. Density stages are 560px high on desktop; Figure 1 uses 360px. These dimensions are example settings, not general limits.

## Density distributions with country ticks

**Use for:** comparing distributions of country-level scores across groups and related indicators while retaining access to the individual observations.

- Default: four indicators in a 2×2 grid. A one-chart icon switches to a single selected indicator in the same allocated space.
- In single view, place the dropdown at the left edge. Its closed label is `Selected - [indicator]`, with a lighter `Selected - ` prefix. Adjacent left/right chevrons sit side by side and wrap through the indicators.
- Render a solid density curve with a translucent area for each group. Country ticks are **18px** tall, sit on the x-axis, and occupy a separate strip **6px below** the distribution baseline.
- Group mean lines are dashed, **1.44px** wide, with separate tooltips. Hovering a mean does not change its line style.
- Use one shared density range for all four panels, recalculated from the visible groups. Single view may use its selected indicator's range. Filtering does not renormalise the underlying densities.
- `Density of Member States` appears once, at the top left. Score x ticks are 0, 25, 50, 75 and 100. The former `Score 0–100` heading is omitted.
- X-axis numbers are **10.92px** in small multiples and **14.196px** in single view. These were explicit sizing choices for these embeds.
- When country ticks overlap, aggregate nearby observations across all visible groups in the tooltip. Use only the indicator name as its heading, not the income group of the initially targeted tick. Put flags at the left; country names and values use their group colour. Avoid bold or shaded hover rows.

The income example has Low, Middle and High groups; the tenure example has Owner and Renter. Both use 27 EU countries per group and four indicators. Income's fourth indicator is **Ability to meet costs**; tenure's is **Security**. Preserve those distinctions when copying a chart.

### Statistical limits and data status

Both density datasets are **synthetic reconstructions**, including their country assignments. They are not evidence about national outcomes. Keep the dummy-data heading and provenance when reusing those records; replace them when real data are supplied.

The code uses Gaussian kernel density estimation, with a bandwidth for each indicator/group and 201 evaluation points over 0–100. The curves are not boundary-corrected, so the visible area can be less than one. Review bandwidth and boundary treatment for a new analytical use. The dashed means in these prototypes are unweighted averages of the synthetic country scores, not automatically official population-weighted EU27 estimates. Preserve separately supplied EU27 averages rather than substituting an unweighted mean.

## Paired time series with combined view

**Use for:** two indicators with compatible units that benefit from separate views and a direct overlay.

Figure 1 uses actual supplied EU27 percentages for housing cost overburden and inability to keep the home warm, 2014–2025. It is not dummy data. Both series have source estimate flags for 2014–2018. Preserve flags, source cells, dataset identifiers, units and geographic coverage in the data and exports.

- Default: two charts side by side; on narrow screens they stack. A top-right icon combines both series on one shared scale.
- Both views retain gradient area fills. This is a user-approved exception to the manual's unfilled multiple-line default: do not apply it automatically to every overlay.
- Display `Percentage of population` as the unit. Omit the top `EU27 · 2014–2025` context line in this example; geography and year remain in tooltips and export metadata.
- Separate headings omit B/C prefixes and colour swatches. In combined view, each capitalised indicator label has its colour key after the text. Do not prepend `and` to the second label.
- The requested display label is **Inability to keep house adequately warm**. The source's formal name uses **home**; keep source identifiers and provenance intact.
- Label each final point. The additional highlighted points in this dataset are overburden in 2020 and warmth in 2023. Choose meaningful points for a new dataset instead of copying those years blindly.
- Year labels and vertical gridlines use even two-year intervals, ending at 2024; the 2025 observations and final value labels remain visible. Do not move or omit data to force tick spacing.

The workbook did not identify B/C panels explicitly; the user confirmed the two series. Figure letters should not be assumed to be spreadsheet column letters.

## Compact comparison-bar tooltips

This pattern was adapted from the Child Guarantee dashboard and refined for Figure 1.

- Show the year, geography, then both visible indicators for that year in either layout.
- Use **neutral text**, with colour on the bars. This differs intentionally from the group-coloured country rows in the density tooltips.
- Each indicator name sits above a thin horizontal bar. Put its percentage just after the bar end; show an estimate flag when present.
- Figure 1's tooltip is **300px wide**, bounded by the available viewport, with **8px/10px padding** and **12px-high bars**. Indicator text is `.8125rem`.
- The bars have a **fixed 0–30% scale**, independent of year, hovered value or hidden indicators. Width is `value / 30 × 100%`; 9.4% occupies 31.33% of the track. This is a Figure 1 choice, not a universal tooltip maximum.
- Keep the neutral track on the scaled area and reserve room outside it for the largest value label. Avoid horizontal overflow on phones.

For a new metric, select and document a suitable common maximum. Do not silently clamp values above 30% when adapting this example: revise the scale or explicitly handle overflow. Preserve true zero, missing and estimated values distinctly.

## Palette decisions

Colours identify the named series. The green/red choice here is not a general rule equating green with a favourable outcome.

| Example / series | Light | Dark | Scope |
| --- | --- | --- | --- |
| Income: Low | `#046C99` | `#046C99` | Brighter blue sampled from the user's final reference |
| Income: Middle | `#8F9091` | `#8F9091` | Neutral grey |
| Income: High | `#AD5D20` | `#AD5D20` | Orange |
| Tenure: Owner | `#063042` | `#063042` | Original navy; the later income-blue change did not change this chart |
| Tenure: Renter | `#AD5D20` | `#AD5D20` | Orange |
| Figure 1: housing cost overburden | `#4E6B3C` | `#A6BF94` | ERM green and its lightened dark-mode variant |
| Figure 1: inability to keep house warm | `#A03B45` | `#DF939B` | ERM red and its lightened dark-mode variant |

Use a shared series token for its curve, area, marker, mean, country ticks, legend, tooltip bar and export. Preserve the current chart's mapping during filtering. Sample an explicitly supplied colour reference when appropriate; do not propagate a one-chart colour change to unrelated charts.

## Animation, accessibility and embed behaviour

The requested chart transitions last **300ms**. Stable SVG keys and interpolation animate geometry rather than replacing it abruptly: paths, areas, points/ticks, mean positions and axes. Cancel or continue from the current visual state when a user makes another selection during a transition. Legend filtering must animate scale changes as well as opacity.

The density examples explicitly override reduced-motion suppression for their requested chart transitions. Treat that as a recorded per-chart exception, not a general accessibility policy for future embeds.

Use semantic buttons and native controls, keyboard access to observations, meaningful accessible labels, Escape to close tooltips, and visible keyboard focus. Keep hidden series out of the tab order. The examples use arrow keys and Home/End to explore observations, and Enter to pin a tooltip. Hover should not change the underlying data-line styling.

Retain the Eurofound embed contract when reusing the shell:

- Set theme/language before paint; accept the parent's later `set-theme` messages without losing selection state. Keep the embedded background transparent.
- Send `ready` with supported exports/languages, and `resize` when content height changes. Avoid viewport-height sizing and resize loops.
- Accept `hello`, theme and export requests only from the parent window. Return export results/errors with the request identifier.
- PNG exports use the light palette and include a title, source and notes. CSV exports use the selected series/indicators and preserve relevant source metadata.
- No authentication keys belong in the HTML, reference files or repository.

## Reuse and verification

Start from the closest working example and inspect its current files. Keep a new chart in its own folder when the user requests a separate figure. Change the data adapter, series names and units before visual fine-tuning. Avoid copying synthetic observations into a real-data chart.

Check the changes that matter: source-to-display values, shared axes, legend filtering, empty states, both layouts, transitions, keyboard and pointer tooltips, narrow layouts, theme colours, embed resizing and filtered exports. Verify that fixed tooltip scales stay fixed and that labels do not collide or clip. These checks do not establish full accessibility certification.

When publishing is authorised, commit scoped changes on the intended branch, update changed asset versions, wait for Pages deployment and verify the rendered live revision. A successful commit alone does not establish that the public page has refreshed. Capture a representative preview. For documentation-only changes, verify the committed reference and links; no chart redeployment test is needed.
