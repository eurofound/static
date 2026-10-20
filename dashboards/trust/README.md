# Trust Explorer

Public page: https://static.eurofound.europa.eu/dashboards/trust/

## Files

- `index.html`: the dashboard, with styles and chart code inline.
- `Trust.csv`: the dashboard data, loaded using the relative path `./Trust.csv`.
- `trust.html`: a compatibility redirect to the folder's index page.
- `data-provenance.json`: source survey asset, questions, statistics and included rounds.
- `validate-data.py`: dependency-free checks for coverage, round selection and known source values.

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

The footer links to the public survey page and explains the question and response
scale separately for the six named bodies/services and for trust in people.

Run `python dashboards/trust/validate-data.py` from the repository root before
publishing. Serve the repository locally and check every year, country
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
