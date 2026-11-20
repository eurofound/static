# Housing scores by tenure — dummy data

A separate chart reusing the approved housing-income embed and all its interactions. The original income chart is unchanged.

## Approximate data

There are 54 rows: 27 EU countries × Owner/Renter, with four scores per row (216 scores). SVG rug ticks were quickly digitised and rounded to one decimal. Country names were assigned deterministically for illustration; these are not actual national estimates. The screenshot's Security panel uses the approximate score pattern labelled Ability to meet costs in the supplied SVG. The chart remains prominently labelled DUMMY DATA.

`data.json` supplies the scores and Gaussian KDE bandwidths; `data.csv` contains the same records. The browser fits eight curves using 27 scores each. Curves are not boundary-corrected. Dashed means are unweighted averages of these dummy scores.

## Display and controls

- Owner: navy #063042. Renter: orange #AD5D20. The legend has exactly two selectable items.
- Housing Barometer, Adequacy, Affordability and Security appear as four small multiples by default, at a maximum total width of 800px.
- All four panels share a vertical scale that updates with the legend. Single-chart mode has an indicator selector and wrapping `< >` buttons.
- Indicator changes and legend rescaling animate for 0.3 seconds, as explicitly requested for the original chart.
- Country ticks sit below the curves with a 6px gap. Tooltips include country flags and tenure-coloured scores; mean lines have their own tooltips.
- Light/dark themes, responsive layout, keyboard controls and the Eurofound embed v1 ready/resize/export protocol are retained. PNG/CSV exports reflect current selections.

## Publish and embed

Publish this directory to `charts/housing-tenure-distribution/` on the `gh-pages` branch of eurofound/static.

Embed URL: https://static.eurofound.europa.eu/charts/housing-tenure-distribution/

Keep all files and the `flags/` directory together. Flags are from [flag-icons](https://github.com/lipis/flag-icons); their MIT licence is included in `flags/LICENSE`. The only external runtime assets are the Eurofound theme stylesheet and its fonts.
