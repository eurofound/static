# EF26035 interactive report figures

Published pages: EF26035_F1_A.html, EF26035_F1_BC.html, EF26035_F2.html, EF26035_F3.html and EF26035_F4.html. Styling follows the established housing-income-distribution, housing-tenure-distribution and housing-figure-1 embeds. No on-chart download icon; exports are supplied through the Eurofound parent embed protocol.

## Sources and mappings
Source: Eurofound Housing Barometer. Real data supplied in `FIgure 2, 3, 4 data.xlsx`, checked against `EF26035_Early-insights article_FOR AR.docx` on 23 November 2026. Document editorial instructions were not treated as new user requests.

- Figure 2: sheet Figure 2, 27 Member State score vectors plus the supplied EU27 aggregate. Uses the workbook's full EU27 precision. Three OLS scatter comparisons, with Pearson correlations and pointwise 95% confidence intervals; EU27 excluded from fitting.
- Figure 3: sheet Figure 3. 27 observations for each of Low, Middle, High; four measures. `Ablity to pay` maps to `Ability to meet costs` as used in the report.
- Figure 4: sheet Figure 4. 27 observations for each of Owner and Renter; four measures. The source column `Security` maps to `Ability to meet costs`, following the report's current figure and terminology.
- Figures 3/4 dashed lines use the supplied EU27 aggregate rows, not a recomputed unweighted mean.

Figure 3 Housing Barometer EU27 averages: Low 47.86, Middle 75.80, High 88.47. Figure 4: Owner 81.30, Renter 52.14. Full supplied precision is retained in data/CSV; tooltips show up to two decimals.

## Release data
Country names, source country codes, flags and source country ordering are absent from current published JSON/CSV, tooltips, ARIA labels and image exports. EU27 is retained as an aggregate. Original identified workbooks and report are not uploaded.

For Figures 3 and 4, each measure/group contains only its sorted score array and EU27 average. There is no cross-indicator or cross-group country linkage. Runtime sample IDs are positions within individual distributions, not country identifiers. CSV uses long format: Indicator, Group, Observation type, Score.

Figure 2 retains the anonymous score vectors needed for the scatter plots and linkage between its panels. The internal point IDs are generated after sorting by numeric scores and contain no source country information. Downloaded CSV has no point ID, name or country code. Removing identifiers does not assert that numerical observations cannot be recognised from other sources.

This release updates current files; previous Git commits are not rewritten.

## Density calculation and design
Gaussian KDE evaluated at 201 points from 0 to 100, without boundary correction. Bandwidth follows the normal-reference rule used by R's `bw.nrd0`: 0.9 * min(sample standard deviation, IQR / 1.34) * n^(-1/5), with standard nonzero fallbacks; inclusive/linear quartiles. This is a stated reconstruction of the fitted curves because the report does not provide original fitting code. Curves use only 27 Member States; EU27 aggregates are excluded. Score multisets are unchanged.

Four panels default, with shared y scales recalculated on legend selection. Single panel mode has the established dropdown, wrapping chevrons and 300ms transitions. Tick strip is 18px tall with a 6px gap beneath the density areas. Figure 2 has the same Roboto 16px/600 panel headings as the distribution templates.

## Downloads and verification
Parent messages support hello, set-theme, export and resize, accepting only window.parent. Figures 3/4 export PNG/CSV; Figure 2 exports PNG/SVG/CSV. Exports carry coded filenames, title/source/method notes and no country identifiers. Data validation checks each measure/group against the workbook, aggregate equality, score ranges, and sample counts. Browser checks cover real distributions, EU27 tooltips, anonymous score tooltips, legend rescaling, single view, title typography and export responses.

## Figure 1
`EF26035_F1_BC.html` is the report-folder version of `charts/housing-figure-1/`, retaining the two-panel/combined views, green/red colours, comparison tooltips with fixed 30% bars, 300ms transitions and supplied estimate flags. The old URL remains available for existing embeds. All 24 observations and flags were checked against the workbook source cells.

`EF26035_F1_A.html` uses the EU27 annual series from `Figure 1 data.xlsx`, sheet `House price to income`, row 8 for years and row 10 for values, AD10:AZ10 in alternate columns (2014–2025). Source: Eurostat `tipsho60`, updated 3 November 2026, extracted 11 November 2026. Values are already indexed to 2025 = 100; they are not rebased. The report's 85–110 scale, reference line at 100 and labels for 2014, 2022 and 2025 are retained. Tooltips display up to two decimals with the index unit, without percentage bars. No national observations are included in either Figure 1 dataset.

Both pages use the shared `EF26035_F1.js`, CSS and palette. Browser titles and PNG/CSV downloads carry their report codes. Visible chart headings remain descriptive, following the embed convention. The original B/C URL redirects to the coded report page, preserving query parameters and fragments so existing embeds continue to work.

## Shared tooltips
All report pages use `EF26035_tooltip.js` and `EF26035_tooltip.css`: Source Sans 3, 15px semibold headings, 14px body/values, one 1px theme border and 8px radius. Hover previews, click/Enter/Space pins, repeating on the same target closes, another target transfers the pin, outside click or Escape closes. Pointer movement cannot replace a pinned tooltip. Layout/filter changes close stale tooltips. No focus outline surrounds an entire chart or tooltip box.

Figure 2 only exposes tooltip targets on the EU27 diamonds. Anonymous Member State dots remain visual observations, without hover, click or keyboard tooltips. Keyboard focus is indicated locally at the EU27 diamond.
