Eurofound Dashboard Studio 2.1

Public entry point: https://static.eurofound.europa.eu/dashboard-studio/
Source: eurofound/static, gh-pages branch, dashboard-studio directory.

Purpose
Create a visual brief for a later dashboard build. Each tile records a starting
visual, its position, suggested data mapping and free-text visual instructions.
The instructions are included in the saved design and the downloadable AI brief.
Studio does not send prompts to an AI model or generate a production dashboard.

Workflow
1. The page starts with an empty layout and no data on every fresh load.
2. Load a CSV or flat JSON array (up to 5 MB, 50,000 rows, 150 fields).
3. Add and position tiles, then describe each visual. Preview mapping is optional.
4. Save design downloads a version 2.1 JSON file, including the dataset by default.
   Uncheck Include the dataset in Data to save just the brief and schema.
5. Open design restores the layout, instructions, mappings and any embedded data.
   A design-only file requires the source data to be loaded again for previews.
   Version 1.0, 1.1 and 2.0 files migrate on opening; unknown types and duplicate IDs fail clearly.
6. Send the saved file to the dashboard builder. Download design brief supplies a
   readable companion handoff. Incomplete mappings do not block saving.

Privacy and dependencies
No dataset is bundled with the public page. Dataset parsing is browser-local;
there is no server, telemetry, storage API, AI endpoint or dataset upload.
Saved files can contain data: the checkbox and status bar make this explicit.
Highcharts 12.4.0 and Europe map geometry are bundled in vendor/ with their
original notices. Fonts load from Google Fonts, with local font fallbacks. Highcharts remains subject to the organisation's
licence terms; publishing this editor does not supply a Highcharts licence.

19 chart starting points
Bar, column, line, area, pie, scatter, heatmap, treemap, Europe map,
clustered bars, clustered columns, stacked bars, 100% stacked bars,
donut, bubble, histogram box plot, radar and stacked columns.

Preview semantics
Sum, row count and unweighted mean operate on one loaded table.
Numeric text is inferred only when every non-empty value is numeric.
Nulls are not converted to zero. Boolean values are not numeric measures.
Category order follows first occurrence; describe final ordering in the brief.
Scatter and bubble use raw records; bubble size must be non-negative.
Histograms use Highcharts square-root binning over raw numeric values.
Box plots use linearly interpolated quartiles, 1.5 IQR whiskers and visible outliers.
Percent bars use Highcharts percentage stacking over non-negative group totals.
Maps show recognised ISO2 countries, listing excluded aggregates/unknown codes.
All mapped controls apply globally. Joins and weighted estimates are not computed.

Highcharts references
https://www.highcharts.com/docs/chart-and-series-types/column-chart
https://www.highcharts.com/docs/advanced-chart-features/stacking-charts
https://www.highcharts.com/docs/chart-and-series-types/bubble-series
https://www.highcharts.com/docs/chart-and-series-types/histogram-series
https://www.highcharts.com/docs/chart-and-series-types/box-plot-series

Deployment and maintenance
Buildless static HTML, CSS and JavaScript; no package installation is needed.
Publish this directory on the existing gh-pages branch. Relative asset paths work
under the /dashboard-studio/ prefix. Do not publish local verification datasets.
Keep core.js, renderer.js, studio.js, studio.css, index.html and the schema together.


Designer: live mapped visuals and shared filters; free pixel movement with optional 10px snapping; resizable canvas; dashboard settings on background click; per-visual design instructions.
