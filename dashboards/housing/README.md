# Housing dashboard

Public page: https://static.eurofound.europa.eu/dashboards/housing/

Adapts the Trust dashboard at commit fd1ecaf. Trust is unchanged.
Uses the supplied Household_affordability_No_percentage.csv as Housing.csv with all values unchanged; Git normalises line endings.
504 observations: six household affordability indicators, 27 countries plus the supplied
weighted EU27 aggregate, 2023–2025 (rounds 6–8). Only response No, overall population.
Source precision is retained; tooltips and trend labels display one decimal and a % sign.
See data-provenance.json for the exact source hash and metric keys.

Both swarm and trends use a fixed 0–100% scale. Blue indicates lower difficulty and
orange higher difficulty. The indicator order follows descending EU27 percentages in
2025 and stays fixed during playback. Short display labels have full wording in tooltips
and downloads. No country percentages are averaged and no missing scores are filled.

The standalone title, source note, dataset link and PNG button are visible. The same
parent-window download-png, download-csv and get-chart-data integration as Trust is
retained, with Housing-specific metadata. Per-year CSV exports contain 168 rows;
the dataset download contains all 504 rows. Country selection highlights up to two
countries; it does not remove unselected countries from the plot or export.

Run node --test dashboards/housing/*.test.js. Serve this repository with a static HTTP
server and inspect /dashboards/housing/ at desktop and mobile widths.
