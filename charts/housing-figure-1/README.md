# Figure 1: Housing pressures in the EU27

Live page: https://static.eurofound.europa.eu/charts/housing-figure-1/

## Data

Source: the supplied `Figure 1 data.xlsx`, Eurostat data extracted on 11 November 2026.
These are supplied observations, not dummy data. The workbook is unchanged.

- **B. Housing cost overburden rate**: `HCO` sheet, year row 11 and EU27 row 13. Eurostat dataset `tespm140`, updated 29 October 2026.
- **C. Inability to keep home adequately warm**: `Inability to keep home adequate` sheet, year row 10 and EU27 row 12. Dataset `ilc_mdes01`, updated 20 October 2026.
- Geography: European Union, 27 countries (from 2020).
- Unit: percentage. Both series cover 2014–2025, 12 observations each.
- The requester confirmed these two series as B and C. The workbook itself does not label panels B/C.
- Values for 2014–2018 have source flag `e` (estimated). Blank flags remain blank.
- `data.json` and `data.csv` preserve numeric values, estimate flags, dataset codes and source-cell references.

## Display and embed

The default view places the indicators side by side. The top-right icons switch to a combined chart and back. Both views use a shared zero-based percentage scale. Click a legend label to show or hide its series. Tooltips show annual values and estimate flags; combined tooltips show both visible series.

The page is capped at 800px, stacks the two charts below 580px, and supports light/dark themes. The public Eurofound embed theme supplies typography, surfaces and chart furniture. Navy/orange series in light mode use the existing chart palette; dark mode uses the ERM theme's lighter comparison colours. There are no white outlines.

View transitions morph lines, fills, points and axes over 300ms. Each separate line uses a gradient area fill. Multiple overlaid lines are unfilled. Use Tab to reach a chart and left/right arrows to explore years; Home/End reach the first/last year, Enter pins a tooltip and Escape dismisses it.

Parent iframe messages support `hello`, `set-theme` and `export`. The page announces `ready` with `png` and `csv` exports and reports content height through `resize`. Only parent-window messages are accepted. Unsupported language requests fall back to English. CSV exports include the selected indicators and source metadata. PNG exports use the current layout in light mode with a title, source and estimate note.

## Validation

Verified all 24 published observations against the supplied workbook and checked the estimate flags. Browser checks covered side-by-side and combined views, the 300ms animation, legend filtering and empty state, year tooltips and keyboard navigation, 800px/320px widths, dark mode, iframe sizing, English fallback, and PNG/CSV exports. No browser errors were recorded.

Serve the folder over HTTP(S); `index.html` fetches its adjacent JSON data. No build step or chart library is required.
