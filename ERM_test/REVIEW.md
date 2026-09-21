# ERM round three implementation review

Reviewed on 21 September 2026 against `eurofound/static` branch `gh-pages`, commit `9c6323be206aca5aeecda78a8b849304270fcdb5`. The previous dashboard blob is `e46d738fcaa4c53f6e470b886211f0d3df3bb264`, matching the baseline named in the supplied review. The supplied HTML, Word comments and earlier test report were the requirements source.

## Changes

Replaces `ERM_prototype_dash.html` with the supplied complete round-three implementation: published-only source filtering, quarter/year controls, cascading NACE filters, sticky filter panel, largest cases for every eligible country, revised time series, factsheet links and full descriptions, sector comparisons, separate gain/loss treemaps, company eligibility and jobs/cases controls, and methodology/citation links. Adds `index.html` to redirect the previously broken `/ERM_test/` directory URL to the dashboard.

Real-browser review found and corrected issues that the earlier substitute-library tests missed:

- The existing Highcharts host returned HTTP 403 in this environment. Highcharts 12.4.0 and map collection 2.3.3 now load from pinned jsDelivr package URLs. The logo loads from its existing adjacent repository file.
- Highcharts removed the sparkline's `polyline` element. It now uses a supported SVG path, with the trend calculated once per tooltip rather than repeatedly.
- Highcharts stripped the tooltip links' `rel` attribute. Only that safe attribute is added to its allowlist; HTML filtering remains enabled.
- Map SVG export raised a missing-projection-library warning. The pinned Proj4 2.15.0 dependency resolves it. See [Highcharts error 21](https://www.highcharts.com/errors/21/) and [HTML filtering documentation](https://www.highcharts.com/docs/chart-concepts/security).
- Rebuilding company/filter options discarded keyboard focus. Focus now returns to the replacement checkbox; Escape returns to the selector button.
- Large KPI numbers wrapped mid-number. Numeric values now remain on one line with adjusted size and padding.

## Verification

24 Chromium checks passed against the actual live `Full_data.csv`, Papa Parse 5.4.1, Highcharts 12.4.0, real map geometry, loaded fonts and html2canvas. No browser errors, failed requests or Highcharts warnings occurred in the final run. The previous report's 51/5/79 counts were not rerun: those test files were not supplied.

Checks cover initial load and directory redirect; all 26 eligible EU countries' positioned largest-case bubbles; complete-period omission; map switching and chart-instance cleanup; independent event-count sums; gain/loss controls; company eligibility, selection and keyboard focus; description expansion and factsheet URL structure; native sector drill-down; separate type denominators; rendered tooltip SVG and company anchors; real downloads of events CSV, map SVG, jobs PNG and types PNG; date controls, COVID filtering, reset, two-country comparison and NACE cascading; page overflow at 375, 390, 768, 1024 and 1440 pixels. Downloaded CSV rows match the current chart model. Desktop/mobile and tooltip screenshots were inspected. All inline JavaScript passes `node --check`; the patch passes `git diff --check`.

The browser test lives in `tests/browser-review.cjs`. It requires Node.js, Playwright and its Chromium browser. Run `node ERM_test/tests/browser-review.cjs` from the repository root after installing those dependencies in your test environment. It uses the live CSV by default; set `ERM_CSV_PATH` to a locally downloaded copy to repeat the snapshot test. Set `ERM_TEST_OUTPUT` for screenshots, downloads and JSON evidence; otherwise outputs go to the system temporary directory. The test server chooses a free local port automatically. Counts deliberately assert the reviewed source snapshot and must be reviewed when the source changes. The CSV is not committed to this repository.

## Data findings and remaining review items

| Item | Finding or outstanding input |
| --- | --- |
| Publication status | All 32,382 source rows have `Status=Published`. Case-insensitive matching works. Two dated 2001 records are outside the requested 2002–2026 coverage, leaving 32,380. The default EU-27 / 2005 onward view contains 23,298. |
| Source freshness | Latest announcement is **24 January 2026**. No 2026 quarter is treated as complete without a confirmed source cutoff. A newer CSV or a confirmed completeness date is needed to show later quarterly observations. |
| COVID | Exactly three rows have explicit COVID markers: IDs 200887, 200850 and 201306. All three are recognised, including a carriage-return-delimited marker. This validates parsing, not completeness of source tagging. |
| Regional map | NUTS columns exist, but the code fields contain partial/numeric values and many blanks. Geographic level, code reconstruction, vintage, boundary geometry and multiple-region treatment remain unresolved; the control stays disabled. |
| Employment rates | No approved country denominator file/reference year was supplied. The control stays disabled. |
| Job-loss KPIs | The source's separately reported maximum-loss values total less than minimum-loss values in the default view. These retain the inherited direct-column sums and should not be interpreted as coherent lower/upper bounds. Missing maxima and source inconsistencies need an agreed treatment. |
| Analytical choices | Company jobs means losses plus gains, not unique workers or net change. Company eligibility >15 and NACE-3 selector >50 apply to current filters; chart NACE-3 threshold is >=30. Annual history/current-year quarter mixing is explicitly labelled. Confirm these choices before release. |
| Deferred scope | Offshoring/reshoring elaboration and company-group consolidation still require definitions and mappings, as the supplied review states. |

This is a review branch. No live deployment or merge is implied. Factsheet URL generation and rendered anchors were tested; individual destination content, methodology/form access, real touch-device behaviour and full accessibility conformance are not certified. The optional employment-rate calculation is not validated against an approved denominator dataset.


## Original design restored on 21 September 2026

The supplied `erm_dashboard (2).html` matches the original dashboard blob. Its rich chart presentation and sector interactions had been replaced by the round-three generic renderer. The filled event chart, smooth curves, compact year ticks, matching map/chart heights, contributor-bar tooltips, coverage annotations, two-column sector bars and sector detail pop-ups are restored. Company tooltips retain three factsheet links and now include the selected period and country-contribution bars. The requested published-only data handling, completed-period logic, comparisons, NACE-3 thresholds, separate type treemaps, open filters and absence of the review banner remain in place.

26 Chromium checks pass on the reviewed real-data snapshot, including new checks for the original-style event tooltip and restored sector pop-up with keyboard focus. Existing chart modes, filtering, comparisons, exports and responsive-width checks continue to pass. Inline JavaScript syntax and diff checks pass. Desktop, mobile and restored-tooltip/modal screenshots were inspected. The original 24-check result above describes the earlier implementation.
