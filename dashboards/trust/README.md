# Trust Explorer

Public page: https://static.eurofound.europa.eu/dashboards/trust/

## Files

- `index.html`: the dashboard, with styles and chart code inline.
- `Trust.csv`: the dashboard data, loaded using the relative path `./Trust.csv`.
- `trust.html`: a compatibility redirect to the folder's index page.

## Migration

Moved from `thomasdavid/dashboard` into `eurofound/static` on the `gh-pages` publishing branch on 25 September 2026.

Source page: https://thomasdavid.github.io/dashboard/trust.html

The chart code and styling are unchanged. The document title and home link use Eurofound branding, and the CSV is loaded from this folder instead of the personal repository. D3 and flag-icons retain their existing jsDelivr dependencies.

Source Git blob hashes:

- `trust.html`: `412b66a067b476eee8c2904d494ee0b6fcc602d8`
- `Trust.csv`: `fe9f0b0eb0911dce5d31eb1d0af93295949cd413`

The CSV is copied byte-for-byte, including its UTF-8 BOM and CRLF line endings: 896 records covering 2021–2024. Replace `Trust.csv` here to update this dashboard. Keep its filename and column names (`Country`, `Metric`, `Year`, `Score`) unchanged.
