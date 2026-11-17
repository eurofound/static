'use strict';
const CSV_URL = 'https://raw.githubusercontent.com/eurofound/static/gh-pages/CG_dash/CG_data.csv';
const HC_KEY = {"Albania":"al","Austria":"at","Belgium":"be","Bulgaria":"bg","Croatia":"hr","Cyprus":"cy","Czechia":"cz","Czech Republic":"cz","Denmark":"dk","Estonia":"ee","Finland":"fi","France":"fr","Germany":"de","Greece":"gr","Hungary":"hu","Iceland":"is","Ireland":"ie","Italy":"it","Latvia":"lv","Lithuania":"lt","Luxembourg":"lu","Malta":"mt","Montenegro":"me","Netherlands":"nl","North Macedonia":"mk","Norway":"no","Poland":"pl","Portugal":"pt","Romania":"ro","Serbia":"rs","Slovakia":"sk","Slovenia":"si","Spain":"es","Sweden":"se","Switzerland":"ch","Türkiye":"tr","Turkey":"tr","United Kingdom":"gb","Ukraine":"ua","Bosnia and Herzegovina":"ba","Belarus":"by","Kosovo":"xk","Andorra":"ad","Monaco":"mc","San Marino":"sm","Liechtenstein":"li"};
const EU = new Set(['EU','EU27','EU-27','EU28','EU-28','European Union','EU 27','EU 28']);
const FLAG_TEXT = {
  b: 'Break in time series',
  p: 'Provisional',
  u: 'Low reliability',
  e: 'Estimated',
  n: 'Not significant',
  d: 'Definition differs',
  x: 'Not applicable',
  bu: 'Break in time series; Low reliability',
  pu: 'Provisional; Low reliability',
  bd: 'Break in time series; Definition differs',
  be: 'Break in time series; Estimated'
};

// The data source, title matching, last-observation rule and default selections
// are retained from Child_poverty_dash.html. Presentation and the host bridge
// share one selected view, including missing observations and quality flags.
const $ = id => document.getElementById(id);
const safe = value => String(value ?? '').trim();
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uniq = values => [...new Set(values)];
const sortAlpha = values => values.slice().sort((a, b) => String(a).localeCompare(String(b)));
const toNum = value => value == null || value === '' ? NaN : +String(value).replace(/[, ]/g, '');
const fmt = (value, digits = 1) => new Intl.NumberFormat(document.documentElement.lang,
  {minimumFractionDigits: digits, maximumFractionDigits: digits}).format(value);
const flagMeaning = flag => FLAG_TEXT[flag] || [...flag].map(c => FLAG_TEXT[c] || c).join('; ');
const state = {tab: 'line', id: null, breakdown: null, year: null, countries: []};
let rows = [], H = {}, chart = null, ready = false, themeFromHost = false, lastHeight = 0;
let countryColors = new Map(), hiddenCountries = new Set();
const EXPORTS = ['png', 'csv'];
const isEmbedded = window.parent !== window;

function readTokens(element = document.documentElement) {
  const css = getComputedStyle(element);
  const v = name => css.getPropertyValue(name).trim();
  const dark = css.colorScheme === 'dark';
  const ramp = Array.from({length: 9}, (_, i) => v(`--map-scale-${i + 1}`));
  return {
    dark, series: Array.from({length: 9}, (_, i) => v(`--chart-${i + 1}`)),
    background: v('--background'), surface: v('--surface'), text: v('--foreground'),
    heading: v('--heading'), muted: v('--muted-foreground'), border: v('--border'),
    context: v('--border-strong'), axis: v('--chart-axis'), grid: v('--chart-grid'),
    label: v('--chart-label'), labelStrong: v('--chart-label-strong'),
    ramp: dark ? ramp.reverse() : ramp, noData: v('--map-no-data'),
    fontText: v('--font-source-sans-3'), fontHeading: v('--font-roboto')
  };
}

function availableYears() {
  return uniq(subset().map(r => r[H.Year]).filter(Number.isFinite)).sort((a, b) => a - b);
}
function subset({country = null, year = null} = {}) {
  return rows.filter(r => r[H.ID] === state.id && r[H.Breakdown] === state.breakdown &&
    (country ? r[H.Country] === country : true) && (year != null ? r[H.Year] === year : true));
}
function countries() {
  const all = sortAlpha(uniq(subset().filter(r => Number.isFinite(r[H.Value])).map(r => r[H.Country]).filter(Boolean)));
  const eu = all.find(c => EU.has(c));
  return eu ? [eu, ...all.filter(c => c !== eu)] : all;
}
function assignColors() {
  const used = new Set();
  for (const country of state.countries) {
    let index = countryColors.get(country);
    if (index == null || used.has(index)) index = Array.from({length: 9}, (_, i) => i).find(i => !used.has(i));
    countryColors.set(country, index);
    used.add(index);
  }
}
function setDefaults() {
  const all = countries();
  state.countries = state.countries.filter(c => all.includes(c));
  if (!state.countries.length) state.countries = all.slice(0, 4);
  const years = availableYears();
  if (years.length) {
    if (state.year == null) state.year = years[years.length - 1];
    else if (!years.includes(state.year)) state.year = years.reduce((nearest, year) =>
      Math.abs(year - state.year) < Math.abs(nearest - state.year) ? year : nearest, years[0]);
  }
  assignColors();
  hiddenCountries.clear();
  updateFilters();
}
function refreshBreakdown() {
  const options = sortAlpha(uniq(rows.filter(r => r[H.ID] === state.id).map(r => r[H.Breakdown]).filter(Boolean)));
  state.breakdown = options.includes('Total') ? 'Total' : options[0] || '';
  $('breakdown').replaceChildren(...options.map(value => {
    const button = document.createElement('button');
    button.className = 'ef-chip';
    button.textContent = value;
    button.setAttribute('aria-pressed', String(value === state.breakdown));
    button.onclick = () => {
      state.breakdown = value;
      [...$('breakdown').children].forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      setDefaults(); draw();
    };
    return button;
  }));
}
function updateFilters() {
  $('countryFilter').hidden = state.tab !== 'line';
  $('yearFilter').hidden = state.tab === 'line';
  $('year').replaceChildren(...availableYears().reverse().map(year => new Option(year, year, false, year === state.year)));
  $('countryCount').textContent = `${state.countries.length} selected`;
  renderCountries();
  document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === state.tab)));
}
function renderCountries() {
  const query = $('countrySearch').value.trim().toLowerCase();
  $('countryList').replaceChildren(...countries().filter(c => c.toLowerCase().includes(query)).map(country => {
    const label = document.createElement('label'); label.className = 'country-option';
    const input = document.createElement('input'); input.type = 'checkbox'; input.value = country;
    input.checked = state.countries.includes(country);
    input.disabled = !input.checked && state.countries.length >= 9;
    input.onchange = () => {
      if (input.checked) state.countries.push(country);
      else state.countries = state.countries.filter(c => c !== country);
      hiddenCountries.delete(country);
      assignColors();
      $('countryCount').textContent = `${state.countries.length} selected`;
      // Do not replace the focused checkbox during a keyboard selection.
      $('countryList').querySelectorAll('input').forEach(box => box.disabled = !box.checked && state.countries.length >= 9);
      draw();
    };
    const text = document.createElement('span'); text.textContent = country;
    label.append(input, text); return label;
  }));
  if (!$('countryList').children.length) $('countryList').textContent = 'No matching countries.';
}
function closeCountries(restoreFocus = false) {
  $('countryPanel').hidden = true;
  $('countryToggle').setAttribute('aria-expanded', 'false');
  if (restoreFocus) $('countryToggle').focus();
}
$('countryToggle').onclick = () => {
  const opening = $('countryPanel').hidden;
  $('countryPanel').hidden = !opening;
  $('countryToggle').setAttribute('aria-expanded', String(opening));
  if (opening) $('countrySearch').focus();
};
$('countrySearch').oninput = renderCountries;
$('clearCountries').onclick = () => {
  state.countries = []; hiddenCountries.clear(); $('countryCount').textContent = '0 selected';
  renderCountries(); draw();
};
document.addEventListener('click', e => { if (!$('countryFilter').contains(e.target)) closeCountries(); });
document.addEventListener('focusin', e => { if (!$('countryFilter').contains(e.target)) closeCountries(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('countryPanel').hidden) { e.preventDefault(); closeCountries(true); }
});
$('indicator').onchange = () => { state.id = $('indicator').value; refreshBreakdown(); setDefaults(); draw(); };
$('year').onchange = () => { state.year = +$('year').value; hiddenCountries.clear(); draw(); };
document.querySelectorAll('[data-view]').forEach(button => button.onclick = () => {
  state.tab = button.dataset.view; closeCountries(); updateFilters(); draw();
});
$('retry').onclick = () => location.reload();

function currentView() {
  const years = availableYears();
  let selected;
  if (state.tab === 'line') {
    selected = state.countries.filter(c => !hiddenCountries.has(c)).flatMap(country => {
      const byYear = new Map(subset({country}).map(r => [r[H.Year], r]));
      return years.map(year => byYear.get(year) || {
        [H.Country]: country, [H.Year]: year, [H.Value]: NaN, _flag: '', _missing: true
      });
    });
  } else if (state.tab === 'bar') {
    // Preserve the existing last observation per country for ranked bars.
    selected = [...new Map(subset({year: state.year}).filter(r => !/^#?N\/A$/i.test(r[H.Country]))
      .map(r => [r[H.Country], r])).values()];
    selected.sort((a, b) => (Number.isFinite(b[H.Value]) ? b[H.Value] : -Infinity) -
      (Number.isFinite(a[H.Value]) ? a[H.Value] : -Infinity));
  } else {
    selected = subset({year: state.year}).filter(r => HC_KEY[r[H.Country]]);
  }
  const contextRows = subset();
  return {tab: state.tab, id: state.id, breakdown: state.breakdown, year: state.year,
    years, rows: selected, countries: [...state.countries], hidden: new Set(hiddenCountries),
    colors: new Map(countryColors),
    notes: uniq(contextRows.map(r => safe(r[H.Notes])).filter(Boolean)),
    sources: uniq(contextRows.map(r => safe(r[H.Source])).filter(Boolean)),
    title: state.tab === 'line' ? state.id : `${state.id} (${state.year})`};
}

function chartOptions(tokens, view, exporting = false) {
  const t = tokens;
  const axisLabel = {color: t.label, fontSize: '.875rem'};
  const textSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const validRows = view.rows.filter(r => Number.isFinite(r[H.Value]));
  const chartHeight = view.tab === 'bar' ? Math.max(520, validRows.length * textSize * 1.8 + 145) :
    (exporting ? 650 : textSize * (innerWidth <= 480 ? 30 : 34));
  const pointInfo = point => {
    const value = point.value ?? point.y;
    return `${escapeHTML(point.name || point.series.name)}: <b>${Number.isFinite(value) ? fmt(value) + '%' : 'No data'}</b>` +
      (point.flag ? ` (${escapeHTML(point.flag)})<br>${escapeHTML(flagMeaning(point.flag))}` : '');
  };
  const common = {
    chart: {backgroundColor: exporting ? t.background : 'transparent', height: chartHeight,
      animation: false, spacing: [12, 12, 16, 12], style: {fontFamily: t.fontText}},
    colors: t.series,
    title: {text: escapeHTML(view.title), align: 'left', style: {color: t.heading, fontFamily: t.fontHeading, fontSize: '1.125rem', fontWeight: '600'}},
    subtitle: {text: `Breakdown: ${escapeHTML(view.breakdown)} · Percent (%)`, align: 'left', style: {color: t.text, fontSize: '.9375rem'}},
    credits: {enabled: false}, exporting: {enabled: false, local: true, fallbackToExportServer: false},
    accessibility: {enabled: !exporting, description: `${view.title}. ${view.breakdown}. Values are percentages. An accessible data table follows the chart.`},
    xAxis: {lineColor: t.axis, tickColor: t.axis, labels: {style: axisLabel}},
    yAxis: {gridLineColor: t.grid, title: {text: 'Percent (%)', style: {color: t.label}}, labels: {style: axisLabel, formatter() { return fmt(this.value, 0) + '%'; }}},
    legend: {itemStyle: {color: t.text, fontSize: '.875rem', fontWeight: '400'},
      itemHoverStyle: {color: t.heading}, itemHiddenStyle: {color: t.muted}},
    tooltip: {useHTML: true, backgroundColor: 'transparent', borderWidth: 0, shadow: false, padding: 0,
      style: {color: t.text, fontSize: '.875rem'}, hideDelay: 100,
      formatter() { return `<div class="ef-tooltip"><b>${view.year}</b><p>${pointInfo(this.point)}</p></div>`; }},
    plotOptions: {series: {animation: false, states: {inactive: {opacity: .4}},
      accessibility: {point: {valueSuffix: '%'}}}}
  };
  if (view.tab === 'line') {
    const series = view.countries.map(country => {
      // Build hidden series too, so a theme switch preserves legend state.
      const points = new Map(subset({country}).map(r => [r[H.Year], r]));
      const colorIndex = view.colors.get(country) ?? 0;
      const color = t.series[colorIndex];
      const single = view.countries.filter(c => !view.hidden.has(c)).length === 1;
      return {name: country, visible: !view.hidden.has(country), color, type: single ? 'area' : 'line',
        dashStyle: ['Solid','ShortDash','ShortDot','Dash','DashDot','LongDash','LongDashDot','ShortDashDot','ShortDashDotDot'][colorIndex],
        lineWidth: 3, fillColor: {linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1}, stops: [
          [0, Highcharts.color(color).setOpacity(.2).get('rgba')], [1, Highcharts.color(color).setOpacity(.01).get('rgba')]]},
        marker: {enabled: true, symbol: 'circle', radius: 3, lineWidth: 1.5, lineColor: t.labelStrong},
        data: view.years.map((year, x) => {
          const row = points.get(year);
          return {x, y: row && Number.isFinite(row[H.Value]) ? row[H.Value] : null, flag: row?._flag || '',
            marker: row?._flag ? {enabled: true, symbol: 'diamond', radius: 5, lineColor: t.labelStrong, lineWidth: 1.5} : undefined};
        }),
        events: {legendItemClick() {
          if (exporting) return false;
          if (this.visible) hiddenCountries.add(this.name); else hiddenCountries.delete(this.name);
          // Rebuild after Highcharts handles the event; the table/export uses the same visibility.
          setTimeout(() => draw(true), 0);
        }}
      };
    });
    return Highcharts.merge(common, {
      chart: {type: 'line'}, xAxis: {categories: view.years, tickmarkPlacement: 'on'},
      yAxis: {ceiling: 100, softMin: 0},
      tooltip: {shared: true, formatter() {
        const points = this.points || [this];
        return `<div class="ef-tooltip"><b>${escapeHTML(view.years[points[0].point.x])}</b>` +
          points.map(p => `<p>${pointInfo(p.point)}</p>`).join('') + '</div>';
      }}, series
    });
  }
  if (view.tab === 'bar') {
    return Highcharts.merge(common, {
      chart: {type: 'bar'}, legend: {enabled: false},
      xAxis: {categories: validRows.map(r => r[H.Country]), labels: {style: axisLabel}},
      yAxis: {min: 0, maxPadding: .18},
      plotOptions: {series: {pointPadding: .12, groupPadding: .04, borderWidth: 1, borderColor: t.labelStrong,
        dataLabels: {enabled: true, inside: false, crop: false, overflow: 'allow',
          style: {color: t.text, textOutline: 'none', fontSize: '.875rem', fontWeight: '400'},
          formatter() { return fmt(this.y) + '%' + (this.point.flag ? ` (${this.point.flag})` : ''); }}}},
      series: [{name: view.id, data: validRows.map(r => ({name: r[H.Country], y: r[H.Value], flag: r._flag,
        color: EU.has(r[H.Country]) || r[H.Country] === 'European Union (27)' ? t.series[7] : t.series[0]}))}]
    });
  }
  const values = validRows.map(r => r[H.Value]);
  const min = values.length ? Math.max(0, Math.min(...values) * .9) : 0;
  let max = values.length ? Math.min(100, Math.max(...values)) : 1;
  if (max <= min) max = Math.min(100, min + 1);
  return Highcharts.merge(common, {
    chart: {map: Highcharts.maps['custom/europe']}, mapView: {animation: false},
    colorAxis: {min, max, tickAmount: 6, stops: t.ramp.map((color, i) => [i / 8, color]),
      labels: {style: axisLabel, formatter() { return fmt(Math.max(0, Math.min(100, this.value)), 0) + '%'; }}},
    legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom', title: {text: 'Percent (%)', style: {color: t.text}}, symbolWidth: exporting ? 360 : undefined},
    mapNavigation: {enabled: !exporting, enableMouseWheelZoom: false,
      buttonOptions: {align: 'right', verticalAlign: 'top', theme: {fill: t.surface, stroke: t.context, style: {color: t.text},
        states: {hover: {fill: t.surface, stroke: t.labelStrong, style: {color: t.text}}, select: {fill: t.surface, style: {color: t.text}}}}}},
    series: [{name: view.id, joinBy: 'hc-key', nullColor: t.noData, borderColor: t.background, borderWidth: .7,
      states: {hover: {borderColor: t.labelStrong, borderWidth: 2, brightness: 0}},
      data: view.rows.map(r => ({'hc-key': HC_KEY[r[H.Country]], name: r[H.Country],
        value: Number.isFinite(r[H.Value]) ? r[H.Value] : null, flag: r._flag}))}]
  });
}

function updateTableAndNotes(view) {
  const codes = sortAlpha(uniq(view.rows.map(r => r._flag).filter(Boolean)));
  const notes = [...view.notes];
  if (codes.length) notes.push('Data-quality flags: ' + codes.map(code => `${code} = ${flagMeaning(code)}`).join('; ') + '. Flagged trend points use diamond markers.');
  if (view.rows.some(r => !Number.isFinite(r[H.Value]))) notes.push('Missing or unavailable observations are shown as “No data”; they are not zero.');
  if (view.tab === 'map') notes.push('EU aggregates are not mapped. Use zoom controls for smaller countries, or the bar chart and table for exact values. Boundaries: Highcharts Europe map collection 2.3.0 (not a NUTS boundary dataset).');
  $('viewNotes').replaceChildren(...notes.map(note => { const p = document.createElement('p'); p.textContent = note; return p; }));
  $('dataDetails').hidden = !view.rows.length;
  $('dataTable').innerHTML = `<caption>${escapeHTML(view.title)} · ${escapeHTML(view.breakdown)}</caption>` +
    '<thead><tr><th scope="col">Country</th><th scope="col">Year</th><th scope="col" class="number">Value (%)</th><th scope="col">Quality flag</th></tr></thead><tbody>' +
    view.rows.map(r => `<tr><th scope="row">${escapeHTML(r[H.Country])}</th><td>${r[H.Year]}</td><td class="number">${Number.isFinite(r[H.Value]) ? fmt(r[H.Value]) : 'No data'}</td><td>${r._flag ? `${escapeHTML(r._flag)} — ${escapeHTML(flagMeaning(r._flag))}` : '—'}</td></tr>`).join('') + '</tbody>';
}
function showStatus(message, danger = false) {
  $('status').textContent = message;
  $('status').className = danger ? 'ef-notice ef-notice--danger' : 'ef-notice';
}
function draw(preserveView = false) {
  const previous = preserveView && chart ? {
    extremes: chart.xAxis?.[0]?.getExtremes(),
    center: chart.mapView?.center && [...chart.mapView.center], zoom: chart.mapView?.zoom
  } : null;
  if (chart) { chart.destroy(); chart = null; }
  const view = currentView();
  updateTableAndNotes(view);
  const noVisibleData = !view.rows.some(r => Number.isFinite(r[H.Value]));
  const allHidden = view.tab === 'line' && view.countries.length && view.countries.every(c => view.hidden.has(c));
  if (noVisibleData && !allHidden) {
    $('chart').replaceChildren(); $('chart').style.height = '12rem';
    showStatus(view.tab === 'line' ? 'Select at least one country or show a series in the legend.' : 'No data for this selection. Choose another year or indicator.');
    $('chart').setAttribute('aria-busy', 'false'); postHeight(); return;
  }
  showStatus(allHidden ? 'All series are hidden. Select a country in the legend to show it again.' : '');
  const options = chartOptions(readTokens(), view);
  $('chart').style.height = `${options.chart.height}px`;
  chart = view.tab === 'map' ? Highcharts.mapChart('chart', options) : Highcharts.chart('chart', options);
  if (previous?.center) chart.mapView?.setView(previous.center, previous.zoom, true, false);
  if (previous?.extremes && view.tab !== 'map') {
    const {userMin, userMax} = previous.extremes;
    if (userMin != null || userMax != null) chart.xAxis[0].setExtremes(userMin, userMax, true, false);
  }
  $('chart').setAttribute('aria-busy', 'false');
  if (!ready) { ready = true; announce(); }
  postHeight(true);
}

function toHost(message) { if (isEmbedded) window.parent.postMessage({source: 'ef-embed', ...message}, '*'); }
function announce() { toHost({type: 'ready', exports: EXPORTS, languages: EF_LANGUAGES}); }
function postHeight(force = false) {
  const height = Math.ceil(document.body.getBoundingClientRect().height);
  if (force || height !== lastHeight) { lastHeight = height; toHost({type: 'resize', height}); }
}
function setTheme(theme) {
  if (!['light', 'dark'].includes(theme) || document.documentElement.dataset.theme === theme) return;
  document.documentElement.dataset.theme = theme;
  if (ready) draw(true);
}
new ResizeObserver(() => requestAnimationFrame(() => postHeight())).observe(document.body);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const fromUrl = new URLSearchParams(location.search).get('theme');
  if (!['light', 'dark'].includes(fromUrl) && !themeFromHost) setTheme(event.matches ? 'dark' : 'light');
});

function exportName(view, extension) {
  return `${view.id}__${view.breakdown}__${view.tab === 'line' ? 'trend' : view.year}`
    .toLowerCase().replace(/[^\w]+/g, '_') + '.' + extension;
}
function exportMetadata(view) {
  return [
    ['Title', 'Child poverty — ' + view.id], ['Breakdown', view.breakdown], ['View', view.tab],
    ['Period', view.tab === 'line' ? view.years.join(', ') : view.year],
    ['Countries', uniq(view.rows.map(r => r[H.Country])).join('; ')], ['Unit', 'Percent (%)'],
    ['Source', view.sources.join('; ')], ['Source data', CSV_URL], ['Notes', view.notes.join('; ')],
    ['Quality flags', sortAlpha(uniq(view.rows.map(r => r._flag).filter(Boolean))).map(f => `${f}: ${flagMeaning(f)}`).join('; ')],
    ['Missing values', 'Empty numeric cells mean missing or unavailable; they are not zero.'],
    ['Exported at', new Date().toISOString()]
  ];
}
async function buildExport(format) {
  if (!ready) throw new Error('Data is still loading');
  if (!EXPORTS.includes(format)) throw new Error(`No ${format} export`);
  const view = currentView();
  if (!view.rows.some(r => Number.isFinite(r[H.Value]))) throw new Error('Nothing to export in the current view');
  const metadata = exportMetadata(view);
  if (format === 'csv') {
    const csv = Papa.unparse([...metadata, [], ['Country', 'Year', 'Value (%)', 'Flag', 'Flag meaning'],
      ...view.rows.map(r => [r[H.Country], r[H.Year], Number.isFinite(r[H.Value]) ? r[H.Value] : '', r._flag, flagMeaning(r._flag || '')])],
      {newline: '\r\n', escapeFormulae: true});
    return {blob: new Blob(['\uFEFF', csv], {type: 'text/csv;charset=utf-8'}), filename: exportName(view, 'csv'), mimeType: 'text/csv'};
  }
  // The export has its own light-themed chart. The visible chart is never
  // switched, resized or reset, including during concurrent export requests.
  const probe = document.createElement('div'); probe.dataset.theme = 'light'; probe.hidden = true;
  document.body.append(probe); const light = readTokens(probe); probe.remove();
  const holder = document.createElement('div');
  holder.dataset.theme = 'light'; holder.setAttribute('aria-hidden', 'true');
  holder.style.cssText = 'position:fixed;left:-20000px;top:0;width:1200px;visibility:hidden;';
  document.body.append(holder);
  let exportChart, objectURL;
  try {
    const options = chartOptions(light, view, true); options.chart.width = 1200;
    exportChart = view.tab === 'map' ? Highcharts.mapChart(holder, options) : Highcharts.chart(holder, options);
    const svg = exportChart.getSVG();
    objectURL = URL.createObjectURL(new Blob([svg], {type: 'image/svg+xml;charset=utf-8'}));
    const image = new Image();
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error('Could not render the image export')); image.src = objectURL; });
    const canvas = document.createElement('canvas'); canvas.width = 1200;
    const context = canvas.getContext('2d');
    const font = `16px ${light.fontText}`; context.font = font;
    const lines = [];
    // The title, unit and breakdown are already on the chart; preserve source,
    // population, notes, quality flags and export date beneath it.
    for (const [key, value] of metadata.filter(([key, value]) => value && !['Title','Breakdown','View','Period','Unit','Source data'].includes(key))) {
      let line = '';
      for (const word of `${key}: ${value}`.split(/\s+/)) {
        if (line && context.measureText(`${line} ${word}`).width > 1152) { lines.push(line); line = word; }
        else line += (line ? ' ' : '') + word;
      }
      if (line) lines.push(line);
    }
    canvas.height = options.chart.height + 36 + lines.length * 23;
    context.fillStyle = light.background; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0); context.font = font; context.fillStyle = light.text;
    lines.forEach((line, index) => context.fillText(line, 24, options.chart.height + 24 + index * 23));
    const blob = await new Promise((resolve, reject) => canvas.toBlob(result => result ? resolve(result) : reject(new Error('Could not build the PNG')), 'image/png'));
    return {blob, filename: exportName(view, 'png'), mimeType: 'image/png'};
  } finally { if (objectURL) URL.revokeObjectURL(objectURL); exportChart?.destroy(); holder.remove(); }
}
window.addEventListener('message', async event => {
  if (event.source !== window.parent || !event.data || typeof event.data !== 'object') return;
  const data = event.data;
  if (data.type === 'set-theme' && ['light', 'dark'].includes(data.theme)) { themeFromHost = true; setTheme(data.theme); }
  else if (data.type === 'hello') { if (ready) announce(); postHeight(true); }
  else if (data.type === 'export') {
    const reply = message => event.source.postMessage({source: 'ef-embed', id: data.id, format: data.format, ...message}, event.origin === 'null' ? '*' : event.origin);
    try { reply({type: 'export-result', ...await buildExport(data.format)}); }
    catch (error) { reply({type: 'export-error', message: error.message}); }
  }
});

function fail(message) {
  showStatus(message, true); $('retry').hidden = false; $('chart').setAttribute('aria-busy', 'false'); postHeight(true);
}
if (typeof Highcharts === 'undefined' || typeof Papa === 'undefined' || typeof proj4 === 'undefined' ||
    typeof Highcharts.mapChart !== 'function' || !Highcharts.maps?.['custom/europe'] || !Highcharts.Chart.prototype.getSVG) {
  fail('The dashboard could not load its chart libraries. Check your connection and try again.');
} else {
  Highcharts.setOptions({lang: {decimalPoint: '.', thousandsSep: ','}});
  Papa.parse(CSV_URL, {
    download: true, header: true, dynamicTyping: false, skipEmptyLines: true,
    error: () => fail('The poverty data could not be loaded. Check your connection and try again.'),
    complete: result => {
      try {
        rows = result.data.map(row => Object.fromEntries(Object.entries(row).map(([key, value]) => [safe(key), typeof value === 'string' ? safe(value) : value])));
        const keys = Object.keys(rows[0] || {});
        const find = name => keys.find(key => key.toLowerCase() === name.toLowerCase());
        H = Object.fromEntries(['Title','Country','Year','Breakdown','Value','Flag','ID','Source'].map(name => [name, find(name)]));
        H.Notes = find('Notes') || find('Note');
        if (['Title','Country','Year','Breakdown','Value','ID'].some(key => !H[key]) || result.errors.length) throw new Error('Invalid data');
        rows = rows.filter(r => safe(r[H.Title]).toLowerCase() === document.title.trim().toLowerCase())
          .map(r => ({...r, [H.Year]: +r[H.Year], [H.Value]: toNum(r[H.Value]), _flag: safe(r[H.Flag]).toLowerCase()}));
        if (!rows.length) { fail('No child poverty data is available. Please try again later.'); return; }
        const indicators = sortAlpha(uniq(rows.map(r => r[H.ID]).filter(Boolean)));
        state.id = indicators[0];
        $('indicator').replaceChildren(...indicators.map(id => new Option(id, id, false, id === state.id)));
        $('controls').hidden = false;
        refreshBreakdown(); setDefaults(); draw();
      } catch (error) { console.error(error); fail('The poverty data could not be displayed. Please try again later.'); }
    }
  });
}

