# EF26038 interactive figures

Eight HTML/SVG embeds recreated from Defence_article_final.docx and All_graphs.xlsx (supplied 23 November 2026). Entry pages: EF26038_F1.html to EF26038_F8.html. index.html lists all figures. Browser document titles use the requested figure identifiers; visible headings retain report captions.

## Source mapping
- F1: Figure 1, rows 3–27, A:C. Two annual net-job series. 2026 marked with an asterisk; data to August. Uses workbook numbers, which differ from some plotted points in the supplied report image.
- F2–F4: corresponding sheets, rows 3 onwards. Filtered case-card collections; headings and periods are source data. Previous/next controls browse every case. Click or press Enter for full text and supplied ERM links.
- F5: Figure 5, A:C. Paired doughnuts. Source fractions converted to percentage labels; each company group sums to 100%.
- F6: Figure 6, A:D. Four collaboration cards with source counts and expandable detail. Cross-country count overlaps other collaboration types and is not additive.
- F7: Figure 7, A:D. Company selector and nested treemap, source values already in percent. Zero rows remain in tables/CSV but have no rectangle.
- F8: Figure 8, A:D. Company selector and nested treemap; source fractions converted to percentage labels. Private values sum to 115%, public to 98%. Preserve supplied percentages without renormalising labels; tile areas are relative to the displayed sum. Categories should not be interpreted as exclusive shares of 100%.

## Data caveats retained
The workbook has inconsistent period footers (F6 ends Q1 2026, F7 starts 2021, others generally end August 2026). These are retained rather than silently corrected. F6 contains placeholder LINK_2/LINK_3 URLs and a repeated OHB/Rheinmetall case; invalid URLs display as text and duplicate source entries remain. F5 repeats its period in its footer. Original data, including source spellings and HTML, are retained in JSON and CSV; rendered HTML is restricted to safe formatting and Eurofound ERM links.

## Behaviour
Vanilla JavaScript and SVG, no chart runtime dependency. Eurofound public theme CSS plus ERM colours, 800px maximum width, keyboard-accessible marks and dialogs, neutral tooltips, light/dark themes, data tables, CSV/SVG/PNG exports. Image exports use light colours and include title/source/notes; represent current visual selection. CSV contains the whole figure's supplied source table. On narrow screens the plot scrolls horizontally to preserve readable labels. Parent ready/resize/set-theme/export messaging supported. Host export replies include blob, filename, MIME type and data URL. No authentication needed.

## Verification
JS syntax checked; all eight pages inspected in browser. Checked time-series PNG download, company selector, case modal and dark collaboration cards. Workbook-to-JSON exact row equality verified before publishing.
