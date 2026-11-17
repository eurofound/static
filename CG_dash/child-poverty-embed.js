'use strict';
const CSV_URL = 'https://raw.githubusercontent.com/eurofound/static/gh-pages/CG_dash/CG_data.csv';
const HC_KEY = {"Albania":"al","Austria":"at","Belgium":"be","Bulgaria":"bg","Croatia":"hr","Cyprus":"cy","Czechia":"cz","Czech Republic":"cz","Denmark":"dk","Estonia":"ee","Finland":"fi","France":"fr","Germany":"de","Greece":"gr","Hungary":"hu","Iceland":"is","Ireland":"ie","Italy":"it","Latvia":"lv","Lithuania":"lt","Luxembourg":"lu","Malta":"mt","Montenegro":"me","Netherlands":"nl","North Macedonia":"mk","Norway":"no","Poland":"pl","Portugal":"pt","Romania":"ro","Serbia":"rs","Slovakia":"sk","Slovenia":"si","Spain":"es","Sweden":"se","Switzerland":"ch","Türkiye":"tr","Turkey":"tr","United Kingdom":"gb","Ukraine":"ua","Bosnia and Herzegovina":"ba","Belarus":"by","Kosovo":"xk","Andorra":"ad","Monaco":"mc","San Marino":"sm","Liechtenstein":"li"};
const EU27 = new Set(['EU27','EU-27','EU 27','European Union (27)']);
const EU = new Set(['EU','EU28','EU-28','European Union','EU 28', ...EU27]);
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

// The data source, title matching and last-observation rule are retained from
// Child_poverty_dash.html. Presentation and the host bridge
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
    label: v('--chart-label'), labelStrong: v('--chart-label-strong'), onData: v('--chart-label-on-data'),
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
  const eu = all.find(c => EU27.has(c)) || all.find(c => EU.has(c));
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
  if (!state.countries.length) state.countries = all.slice(0, 1);
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
  $('breakdownControl').hidden = options.length === 1 && options[0] === 'Total';
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
function updateCountryDisplay() {
  const names = state.countries.map(country => EU27.has(country) ? 'EU27' : country);
  $('countryCount').textContent = names.length > 2 ? `${names.length} countries selected` :
    names.length ? names.join(' · ') : 'Select countries';
}
function updateFilters() {
  $('countryFilter').hidden = state.tab !== 'line';
  $('yearFilter').hidden = state.tab === 'line';
  $('year').replaceChildren(...availableYears().reverse().map(year => new Option(year, year, false, year === state.year)));
  updateCountryDisplay();
  renderCountries();
  document.querySelectorAll('[data-view]').forEach(button => {
    const selected = button.dataset.view === state.tab;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected) $('chartPanel').setAttribute('aria-labelledby', button.id);
  });
}
function renderCountries() {
  const query = $('countrySearch').value.trim().toLowerCase();
  $('countryList').replaceChildren(...countries().filter(c =>
    `${c}${EU27.has(c) ? ' EU27' : ''}`.toLowerCase().includes(query)).map(country => {
    const label = document.createElement('label'); label.className = 'country-option';
    const input = document.createElement('input'); input.type = 'checkbox'; input.value = country;
    input.checked = state.countries.includes(country);
    input.disabled = !input.checked && state.countries.length >= 9;
    input.onchange = () => {
      if (input.checked) state.countries.push(country);
      else state.countries = state.countries.filter(c => c !== country);
      hiddenCountries.delete(country);
      assignColors();
      updateCountryDisplay();
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
  state.countries = []; hiddenCountries.clear(); updateCountryDisplay();
  renderCountries(); draw();
};
document.addEventListener('click', e => { if (!$('countryFilter').contains(e.target)) closeCountries(); });
document.addEventListener('focusin', e => { if (!$('countryFilter').contains(e.target)) closeCountries(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('countryPanel').hidden) { e.preventDefault(); closeCountries(true); }
  if (e.key === 'Escape') { chart?.tooltip?.hide(0); chart?.clearMapRange?.(); }
});
function updateIndicatorPosition(announce = false) {
  const selector = $('indicator');
  $('indicatorCount').textContent = `${selector.selectedIndex + 1} / ${selector.options.length}`;
  if (announce) $('indicatorAnnouncement').textContent = `Indicator ${selector.selectedIndex + 1} of ${selector.options.length}: ${selector.value}`;
}
function selectIndicator(value) {
  state.id = value; $('indicator').value = value;
  refreshBreakdown(); setDefaults(); draw(); updateIndicatorPosition(true);
}
function cycleIndicator(direction) {
  const selector = $('indicator');
  if (!selector.options.length) return;
  const index = (selector.selectedIndex + direction + selector.options.length) % selector.options.length;
  selectIndicator(selector.options[index].value);
}
$('indicator').onchange = () => selectIndicator($('indicator').value);
$('previousIndicator').onclick = () => cycleIndicator(-1);
$('nextIndicator').onclick = () => cycleIndicator(1);
$('year').onchange = () => { state.year = +$('year').value; hiddenCountries.clear(); draw(); };
document.querySelectorAll('[data-view]').forEach(button => button.onclick = () => {
  state.tab = button.dataset.view; closeCountries(); updateFilters(); draw();
});
document.querySelector('[role="tablist"]').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const tabs = [...document.querySelectorAll('[data-view]')];
  const current = tabs.indexOf(document.activeElement);
  if (current < 0) return;
  event.preventDefault();
  const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
    (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[index].click(); tabs[index].focus();
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
    // Use the published EU27 aggregate for this exact year and breakdown.
    // Never substitute an unweighted country mean or a different year's value.
    euAverage: contextRows.filter(r => EU27.has(r[H.Country]) && r[H.Year] === state.year).at(-1),
    years, rows: selected, countries: [...state.countries], hidden: new Set(hiddenCountries),
    colors: new Map(countryColors),
    notes: uniq(contextRows.map(r => safe(r[H.Notes])).filter(Boolean)),
    sources: uniq(contextRows.map(r => safe(r[H.Source])).filter(Boolean)),
    title: state.tab === 'line' ? state.id : `${state.id} (${state.year})`};
}

// Frame the EU members using the same pre-projected coordinates as the existing
// map. Countries without observations remain in the frame, including Malta and
// Cyprus. This avoids fitting the view to distant, empty surrounding geometry.
let euFrame;
function euMapGeometry() {
  if (euFrame) return euFrame;
  const members = new Set(['at','be','bg','hr','cy','cz','dk','ee','fi','fr','de','gr','hu','ie','it','lv','lt','lu','mt','nl','pl','pt','ro','sk','si','es','se']);
  const coordinates = [];
  function collect(value) {
    if (typeof value[0] === 'number') coordinates.push(value);
    else value.forEach(collect);
  }
  Highcharts.maps['custom/europe'].features.filter(feature => members.has(feature.properties['hc-key']))
    .forEach(feature => collect(feature.geometry.coordinates));
  const xs = coordinates.map(point => point[0]);
  const ys = coordinates.map(point => point[1]);
  euFrame = {type: 'MultiPoint', coordinates: [[Math.min(...xs), Math.min(...ys)], [Math.max(...xs), Math.max(...ys)]]};
  return euFrame;
}
// Accessible hit areas follow the existing percentage ticks on the left legend.
// Highlighting is purely visual: the underlying data, tooltips and exports stay complete.
function updateMapRanges(map, tokens) {
  const axis = map.colorAxis?.[0], symbol = axis?.legendItem?.symbol;
  if (!symbol || axis.max <= axis.min) return;
  const bounds = [...new Set([axis.min, ...axis.tickPositions.filter(v => v > axis.min && v < axis.max), axis.max])];
  const ranges = bounds.slice(0, -1).map((from, i) => ({from, to: bounds[i + 1], last: i === bounds.length - 2})).reverse();
  const inRange = (point, range) => Number.isFinite(point.value) && point.value >= range.from &&
    (point.value < range.to || range.last && point.value <= range.to);
  const rangeNumber = value => new Intl.NumberFormat(document.documentElement.lang, {maximumFractionDigits: 2}).format(value);
  const signature = bounds.join(',');
  if (map.rangeSignature !== signature) {
    map.rangeUnbind?.();
    map.rangeLegend?.remove(); map.rangeHint?.remove();
    map.rangeSignature = signature;
    const legend = map.rangeLegend = document.createElement('div');
    legend.className = 'map-range-legend'; legend.setAttribute('role', 'group');
    legend.setAttribute('aria-label', 'Highlight map percentage ranges');
    const hint = map.rangeHint = document.createElement('div');
    hint.className = 'map-range-hint'; hint.setAttribute('aria-live', 'polite');
    map.renderTo.append(legend, hint);
    let hovered = null, focused = null, pinned = null;
    map.paintMapRange = () => {
      const active = hovered ?? focused ?? pinned;
      map.activeMapRange = active;
      const range = active == null ? null : ranges[active];
      map.series[0].points.forEach(point => {
        if (point.graphic) point.graphic.element.style.fill = range && !inRange(point, range) ? tokens.noData : '';
      });
      [...legend.children].forEach((button, i) => {
        button.classList.toggle('is-active', i === active);
        button.setAttribute('aria-pressed', String(i === pinned));
      });
      const count = range ? map.series[0].points.filter(p => inRange(p, range)).length : 0;
      hint.textContent = range ? `${rangeNumber(range.from)}–${rangeNumber(range.to)}% · ${count} ${count === 1 ? 'country' : 'countries'}` : '';
      if (range) map.tooltip.hide(0);
    };
    map.clearMapRange = () => { hovered = focused = pinned = null; map.paintMapRange(); };
    ranges.forEach((range, i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'map-range-button';
      button.setAttribute('aria-label', `Highlight ${rangeNumber(range.from)}% to ${range.last ? '' : 'under '}${rangeNumber(range.to)}%`);
      button.setAttribute('aria-pressed', 'false');
      button.onmouseenter = () => { hovered = i; map.paintMapRange(); };
      button.onmouseleave = () => { hovered = null; map.paintMapRange(); };
      button.onfocus = () => { focused = i; map.paintMapRange(); };
      button.onblur = () => { focused = null; map.paintMapRange(); };
      button.onclick = () => { pinned = pinned === i ? null : i; hovered = focused = null; map.paintMapRange(); };
      button.onkeydown = event => {
        const buttons = [...legend.children];
        const next = event.key === 'ArrowDown' ? (i + 1) % buttons.length : event.key === 'ArrowUp' ?
          (i + buttons.length - 1) % buttons.length : event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : null;
        if (next != null) { event.preventDefault(); buttons[next].focus(); }
      };
      legend.append(button);
    });
    // A tap/click elsewhere clears a pinned band, including on touch screens.
    map.rangeUnbind = Highcharts.addEvent(map.renderTo, 'pointerdown', event => { if (!legend.contains(event.target)) map.clearMapRange(); });
  }
  const rect = symbol.element.getBoundingClientRect(), host = map.renderTo.getBoundingClientRect();
  [...map.rangeLegend.children].forEach((button, i) => {
    const range = ranges[i];
    button.style.left = `${rect.left - host.left - 5}px`;
    button.style.width = `${Math.max(24, rect.width + 10)}px`;
    button.style.top = `${rect.top - host.top + (axis.max - range.to) / (axis.max - axis.min) * rect.height}px`;
    button.style.height = `${(range.to - range.from) / (axis.max - axis.min) * rect.height}px`;
  });
  Object.assign(map.rangeHint.style, {left: `${map.plotLeft}px`, top: `${map.plotTop + 6}px`, width: `${Math.max(0, map.plotWidth - 44)}px`});
  map.paintMapRange();
}
function chartOptions(tokens, view, exporting = false) {
  const t = tokens;
  const axisLabel = {color: t.label, fontSize: '.875rem'};
  const textSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const validRows = view.rows.filter(r => Number.isFinite(r[H.Value]));
  const chartWidth = exporting ? 1200 : $('chart').clientWidth;
  // Reduce the space allocated to bar rows by 18%, including their gaps.
  // Keep the title/axis allowance so labels remain readable and more rows fit.
  const chartHeight = view.tab === 'bar' ? Math.max(375, validRows.length * textSize * 1.8) * .82 + 145 :
    view.tab === 'map' ? (exporting ? 650 : textSize * 40) :
    (exporting ? 650 : textSize * (chartWidth <= 480 ? 30 : 34));
  const tooltipRow = (point, scaleMaximum) => {
    const value = point.value ?? point.y;
    const hasValue = Number.isFinite(value);
    const color = typeof point.color === 'string' ? point.color :
      typeof point.series?.color === 'string' ? point.series.color : t.series[0];
    const width = hasValue && scaleMaximum > 0 ? Math.max(0, Math.min(100, value / scaleMaximum * 100)) : 0;
    return `<div class="tooltip-item"><div class="tooltip-item-heading">` +
      `<span class="tooltip-item-name">${escapeHTML(point.name || point.series.name)}</span></div>` +
      (hasValue ? `<div class="tooltip-bar"><div class="tooltip-track">` +
        `<span class="tooltip-fill" aria-hidden="true" style="width:${width}%;background:${escapeHTML(color)}"></span>` +
        `<strong class="tooltip-item-value" style="left:${width}%">${fmt(value)}%</strong></div></div>` :
        '<strong class="tooltip-item-value tooltip-no-data">No data</strong>') +
      (point.flag ? `<div class="tooltip-flag">${escapeHTML(point.flag)}: ${escapeHTML(flagMeaning(point.flag))}</div>` : '') + '</div>';
  };
  const tooltipHTML = (year, points) => {
    const scaleMaximum = Math.max(0, ...points.map(p => p.value ?? p.y).filter(Number.isFinite));
    return `<div class="ef-tooltip poverty-tooltip">` +
      `<div class="tooltip-heading"><strong>${escapeHTML(year)}</strong></div>` +
      `<div class="tooltip-items" tabindex="0" role="group" aria-label="Country values">${points.map(p => tooltipRow(p, scaleMaximum)).join('')}</div></div>`;
  };
  const comparisonTooltip = point => {
    const average = {name: 'EU27 average', y: view.euAverage?.[H.Value] ?? null,
      flag: view.euAverage?._flag || '', color: t.series[7]};
    return tooltipHTML(view.year, EU27.has(point.name) ? [average] : [point, average]);
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
    tooltip: {useHTML: true, outside: true, stickOnContact: true,
      backgroundColor: 'transparent', borderWidth: 0, shadow: false, padding: 0,
      style: {color: t.text, fontSize: '.875rem', pointerEvents: 'auto'}, hideDelay: 200,
      formatter() { return comparisonTooltip(this.point); }},
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
        return tooltipHTML(view.years[points[0].point.x], points.map(point => point.point));
      }}, series
    });
  }
  if (view.tab === 'bar') {
    const highestValue = Math.max(0, ...validRows.map(row => row[H.Value]));
    const tickStep = highestValue <= 50 ? 10 : 20;
    const axisMax = Math.max(tickStep, Math.ceil(highestValue / tickStep) * tickStep);
    const ticks = Array.from({length: axisMax / tickStep + 1}, (_, index) => index * tickStep);
    return Highcharts.merge(common, {
      chart: {type: 'bar'}, legend: {enabled: false},
      xAxis: {categories: validRows.map(r => r[H.Country]), labels: {style: {...axisLabel, fontSize: '.8125rem', letterSpacing: '-.02em'}}},
      yAxis: {min: 0, max: axisMax, tickPositions: ticks, minorTicks: false, minorTickInterval: null,
        minorGridLineWidth: 0, gridLineWidth: 1,
        gridLineColor: Highcharts.color(t.grid).setOpacity(.35).get('rgba'),
        labels: {formatter() { return fmt(this.value, 0); }}},
      plotOptions: {series: {pointPadding: .12, groupPadding: .04, borderWidth: 1, borderColor: t.labelStrong,
        dataLabels: {enabled: true, inside: true, align: 'right', verticalAlign: 'middle', x: -5,
          crop: false, overflow: 'justify', allowOverlap: true, padding: 0,
          style: {color: t.onData, textOutline: 'none', fontSize: '.8125rem', letterSpacing: '-.02em', fontWeight: '400'},
          formatter() { return fmt(this.y, 0) + (this.point.flag ? ` (${this.point.flag})` : ''); }}}},
      series: [{name: view.id, data: validRows.map(r => ({name: r[H.Country], y: r[H.Value], flag: r._flag,
        color: EU.has(r[H.Country]) ? t.series[7] : t.series[0]}))}]
    });
  }
  const values = validRows.map(r => r[H.Value]);
  const min = values.length ? Math.max(0, Math.min(...values) * .9) : 0;
  let max = values.length ? Math.min(100, Math.max(...values)) : 1;
  if (max <= min) max = Math.min(100, min + 1);
  return Highcharts.merge(common, {
    chart: {map: Highcharts.maps['custom/europe'], spacing: [12, 4, 8, 4], events: {render() {
      this.renderTo.style.height = `${this.chartHeight}px`;
      // Add a non-interactive key beneath the scale, also included in PNGs.
      this.noDataKey?.destroy();
      if (!this.legend.group) return;
      this.noDataKey = this.renderer.g('no-data-key').attr({'aria-hidden': true})
        .translate(0, this.legend.legendHeight + 8).add(this.legend.group);
      const size = textSize * .875;
      this.renderer.rect(0, 0, size, size, 2).attr({fill: t.noData, stroke: t.context, 'stroke-width': 1}).add(this.noDataKey);
      this.renderer.text('No data', size + 6, size * .85).css({color: t.text, fontSize: '.875rem'}).add(this.noDataKey);
      if (!exporting) updateMapRanges(this, t);
    }, destroy() { this.rangeUnbind?.(); this.rangeLegend?.remove(); this.rangeHint?.remove(); }}},
    mapView: {animation: false, fitToGeometry: euMapGeometry(), padding: [8, 8, 8, 8]},
    accessibility: {description: `${view.title}. ${view.breakdown}. Values are percentages. Hover or focus a range on the left scale to highlight matching countries. Click to keep a range highlighted; press Escape to reset. Grey indicates no data or countries outside the highlighted range. An accessible data table follows the chart.`},
    colorAxis: {min, max, tickAmount: 6, width: textSize * .875, height: textSize * 17,
      stops: t.ramp.map((color, i) => [i / 8, color]),
      labels: {style: axisLabel, formatter() { return fmt(Math.max(0, Math.min(100, this.value)), 0) + '%'; }}},
    legend: {layout: 'vertical', align: 'left', verticalAlign: 'middle', padding: 0, margin: 16,
      title: {text: 'Share (%)', style: {color: t.text, fontSize: '.875rem', fontWeight: '600'}}},
    responsive: {rules: exporting ? [] : [{condition: {maxWidth: 480}, chartOptions: {
      chart: {height: textSize * 26}, colorAxis: {height: textSize * 11}
    }}]},
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
    center: chart.mapView?.center && [...chart.mapView.center],
    zoomDelta: chart.mapView ? chart.mapView.zoom - chart.mapView.minZoom : 0
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
  if (previous?.center && previous.zoomDelta > .000001) {
    chart.mapView?.setView(previous.center, chart.mapView.minZoom + previous.zoomDelta, true, false);
  }
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
    const logo = new Image();
    await new Promise((resolve, reject) => {
      logo.onload = resolve; logo.onerror = () => reject(new Error('Could not load the Eurofound logo for the image export'));
      logo.src = new URL('./eurofound-logo.svg', location.href).href;
    });
    const logoWidth = 150, logoHeight = logoWidth * logo.naturalHeight / logo.naturalWidth;
    const logoTop = options.chart.height + 36 + lines.length * 23;
    canvas.height = logoTop + logoHeight + 24;
    context.fillStyle = light.background; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0); context.font = font; context.fillStyle = light.text;
    lines.forEach((line, index) => context.fillText(line, 24, options.chart.height + 24 + index * 23));
    context.drawImage(logo, 24, logoTop, logoWidth, logoHeight);
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
        updateIndicatorPosition();
        $('controls').hidden = false;
        refreshBreakdown(); setDefaults(); draw();
      } catch (error) { console.error(error); fail('The poverty data could not be displayed. Please try again later.'); }
    }
  });
}
