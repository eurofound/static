
/* ---------- Constants ---------- */
const SOURCE_TEXT = 'Calculations based on EU SILC microdata for 2023';
const REFERENCE_YEAR = '2023';
const DEFAULT_INDICATOR = 'Inability to keep home warm or cool';
const MIN_COUNT = 50;
const motionOptions = () => reduceMotion.matches ? false : { duration: 270 };
const LOW_DATA_TEXT = `Values based on fewer than ${MIN_COUNT} observations are not shown.`;
const SUPPRESSED_NOTE = `Not shown: fewer than ${MIN_COUNT} observations`;
const MAX = { barCat: 6, mapCat: 2, radarCountry: 2, r2Country: 5, globalInd: 10 };
// Mainland Europe including Cyprus and Malta; the maps fit this box at any width.
const EUROPE_BOX = { type: 'MultiPoint', coordinates: [[-11, 34], [34, 70.5]] };
const MAP_HEIGHT = 650;

const INDICATOR_NOTES = {
  '30/40 definition of housing affordability stress': 'This is the percentage of households spending 30% or more of their disposable income on housing who are also in the bottom 40% of the national income distribution.',
  'Housing cost overburden rate (>40% of income)': 'We assume that the ratio of housing cost to income that underlies this variable is bounded between zero and 100.'
};

const LANG = document.documentElement.lang || 'en';
const num1 = new Intl.NumberFormat(LANG, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const numAxis = new Intl.NumberFormat(LANG, { maximumFractionDigits: 2 });
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Tokens ---------- */
function readTokens(el = document.documentElement) {
  const cs = getComputedStyle(el);
  const v = (name) => cs.getPropertyValue(name).trim();
  const dark = v('color-scheme') === 'dark';
  const ramp = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => v(`--map-scale-${i}`));
  return {
    dark,
    series: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => v(`--chart-${i}`)),
    background: v('--background'),
    surface: v('--surface'),
    text: v('--foreground'),
    heading: v('--heading'),
    muted: v('--muted-foreground'),
    border: v('--border'),
    context: v('--border-strong'),
    hover: v('--hover'),
    active: v('--active'),
    axis: v('--chart-axis'),
    grid: v('--chart-grid'),
    label: v('--chart-label'),
    labelStrong: v('--chart-label-strong'),
    onData: v('--bar-label'),
    number: v('--tooltip-number'),
    // Keep all nine ERM stops in both themes.
    ramp: dark ? ramp.slice().reverse() : ramp,
    noData: v('--map-no-data'),
    fontText: v('--font-source-sans-3'),
    fontHeading: v('--font-roboto'),
  };
}
let T = readTokens();

/* ---------- Helpers ---------- */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isYears = (ind) => !!ind && String(ind).toLowerCase().includes('age of leaving home');
const unitName = (ind) => (isYears(ind) ? 'years' : '%');
const preciseNumber = (v, ind, compact = false) => {
  if (!Number.isFinite(v)) return 'No data';
  const abs = Math.abs(v);
  const digits = abs > 0 && abs < .1 ? Math.min(20, Math.ceil(-Math.log10(abs))) :
    isYears(ind) || !compact || abs > 0 && abs < 1 ? 1 : 0;
  return new Intl.NumberFormat(LANG, { maximumFractionDigits: digits }).format(v);
};
const fmtValue = (v, ind) => Number.isFinite(v) ? `${preciseNumber(v, ind)}${isYears(ind) ? ' years' : '%'}` : 'No data';
const fmtShort = (v, ind) => preciseNumber(v, ind, true);

const fmtAxis = (v, ind) => (isYears(ind) ? numAxis.format(v) : `${numAxis.format(v)}%`);
const axisTitle = (ind) => (isYears(ind) ? 'Years' : '%');
const isSuppressed = (d) => !!d && typeof d['Count'] === 'number' && d['Count'] < MIN_COUNT;
const isNutsRow = (d) => String(d['Top category'] || '').toLowerCase().includes('nuts');
const breakdownLabel = (top, cat) => (!top || top === 'All' ? 'All' : `${top}: ${cat}`);
const slug = (s) => String(s || 'data').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const byId = (id) => document.getElementById(id);

// Colours stay with a key while it is selected: a newly selected key takes the first free colour.
const colorSlots = {};
function slotColors(group, keys) {
  const m = colorSlots[group] || (colorSlots[group] = new Map());
  for (const k of [...m.keys()]) if (!keys.includes(k)) m.delete(k);
  const used = new Set(m.values());
  keys.forEach((k) => {
    if (m.has(k)) return;
    let i = 0;
    while (used.has(i)) i++;
    m.set(k, i);
    used.add(i);
  });
  return m;
}
// Categories: by position in the full category list when it fits the palette, else by slot.
function categoryColors(selected) {
  if (state.allCats.length <= T.series.length) return new Map(selected.map((c) => [c, state.allCats.indexOf(c)]));
  return slotColors('cat', selected);
}

/* ---------- State and elements ---------- */
let rawData = [];
let dataLoaded = false;
let allCountries = [];
const rowsByIndicator = new Map();
const nutsNames = {};
let nationalGeo = null;
let nutsGeo = null;
let mapsLoaded = false;
let activeCharts = [];
let currentView = null;

const state = {
  tab: 'map', topic: null, indicator: null, topCat: null, allCats: [],
  barCategories: [], mapCategories: [], barCountries: [], radarCountries: [],
  barSort: 'alpha', cpCountry: null, globalIndicators: [], cpCategory: 'All', r2Countries: [], mapViewMode: 'national'
};

const els = {
  tabs: [...document.querySelectorAll('.ef-tab')], tablist: document.querySelector('.ef-tabs'), panel: byId('panel'),
  topicField: byId('topic-field'), topics: byId('topic-container'),
  indicatorField: byId('indicator-field'), ind: byId('indicator-sel'),
  geoField: byId('geo-field'), geoNational: byId('geo-national'), geoNuts: byId('geo-nuts'),
  breakdownField: byId('breakdown-field'), cat: byId('category-sel'),
  catField: byId('cat-field'), catLabel: byId('cat-label'),
  barCountryField: byId('bar-country-field'), radarCountryField: byId('radar-country-field'),
  cpCountryField: byId('cp-country-field'), cpCountrySel: byId('cp-country-sel'),
  r2CountryField: byId('r2-country-field'), globalIndField: byId('global-ind-field'),
  cpCatField: byId('cp-cat-field'), cpCatSel: byId('cp-cat-sel'),
  sortField: byId('sort-field'), sort: byId('sort-toggle'), lowData: byId('low-data'), status: byId('status'), viz: byId('viz'), notes: byId('notes')
};

/* ---------- Data loading ---------- */
let mapsReady = null;
const ensureMaps = () => mapsReady || (mapsReady = loadMaps());

async function loadMaps() {
  const getJson = async (url) => {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.json();
  };
  try {
    const [regional, national] = await Promise.all([getJson('custom_nuts_composite.json'), getJson('master.geojson')]);
    const regions = topojson.feature(regional, regional.objects.nutsrg);
    regions.features.forEach((f) => {
      const p = f.properties || {};
      const id = p.id || p.NUTS_ID;
      const name = p.na || p.NUTS_NAME || p.name;
      if (id && name) nutsNames[id] = name;
    });
    regions.features = regions.features.filter((f) => f.id !== 'NO0B');
    nutsGeo = regions;
    nationalGeo = national.type === 'FeatureCollection' ? national : topojson.feature(national, national.objects.nutsrg);
  } catch (e) {
    console.warn('Failed to load maps', e);
  }
  mapsLoaded = true;
}

Papa.parse('Master_Indicator_Data.csv', {
  download: true, header: true, dynamicTyping: true, skipEmptyLines: true,
  complete(results) {
    rawData = results.data
      .filter((d) => d['Value'] !== null && d['Value'] !== undefined && d['Country Code'])
      .map((d) => {
        if (!isYears(d['Indicator name'])) d['Value'] = d['Value'] * 100;
        if (d['Country Code'] === 'GR') d['Country Code'] = 'EL';
        if (d['Top category']) d['Top category'] = String(d['Top category']).replace(/\s+/g, ' ').trim();
        // One indicator uses title case for Gender; match the same categories
        // across all indicators before building selectors, charts and exports.
        if (d['Top category'] === 'Gender') {
          const category = String(d.Category).trim().toLowerCase();
          if (category === 'male' || category === 'female') d.Category = category[0].toUpperCase() + category.slice(1);
        }
        return d;
      });
    if (!rawData.length) return showError();
    rawData.forEach((d) => {
      const ind = d['Indicator name'];
      if (!rowsByIndicator.has(ind)) rowsByIndicator.set(ind, []);
      rowsByIndicator.get(ind).push(d);
    });
    init();
  },
  error: () => showError()
});

function showError() {
  els.viz.replaceChildren();
  els.status.innerHTML = '<div class="ef-notice ef-notice--danger">The data could not be loaded. Please reload the page to try again.</div>';
}

/* ---------- Pickers (checkbox lists in a popover) ---------- */
const PICKERS = {
  cpCountry: { list: 'cp-country-list', toggle: 'cp-country-toggle', value: 'cp-country-value', noun: 'countries', single: true, get: () => [state.cpCountry], set: v => { state.cpCountry = v[0]; els.cpCountrySel.value = v[0]; }, max: () => 1 },
  cat: {
    list: 'cat-list', toggle: 'cat-toggle', value: 'cat-value', noun: 'categories',
    get: () => (state.tab === 'map' ? state.mapCategories : state.barCategories),
    set: (v) => { if (state.tab === 'map') state.mapCategories = v; else state.barCategories = v; },
    max: () => (state.tab === 'map' ? MAX.mapCat : MAX.barCat)
  },
  barCountry: {
    list: 'bar-country-list', toggle: 'bar-country-toggle', value: 'bar-country-value', noun: 'countries', selectAll: true,
    get: () => state.barCountries, set: (v) => { state.barCountries = v; }, max: () => 0
  },
  radarCountry: {
    list: 'radar-country-list', toggle: 'radar-country-toggle', value: 'radar-country-value', noun: 'countries',
    get: () => state.radarCountries, set: (v) => { state.radarCountries = v; }, max: () => MAX.radarCountry
  },
  r2Country: {
    list: 'r2-country-list', toggle: 'r2-country-toggle', value: 'r2-country-value', noun: 'countries',
    get: () => state.r2Countries, set: (v) => { state.r2Countries = v; }, max: () => MAX.r2Country
  },
  globalInd: {
    list: 'global-ind-list', toggle: 'global-ind-toggle', value: 'global-ind-value', noun: 'indicators',
    get: () => state.globalIndicators, set: (v) => { state.globalIndicators = v; }, max: () => MAX.globalInd
  }
};

// items: an array of values, or an array of { group, items } for grouped lists.
function buildPicker(type, items) {
  const p = PICKERS[type], list = byId(p.list), selected = p.get();
  const groups = items.length && Array.isArray(items[0]?.items) ? items : [{ group: null, items }];
  p.all = groups.flatMap(g => g.items);
  const countryPicker = p.noun === 'countries';
  list.classList.toggle('country-picker',countryPicker);
  let html = `<div class="picker-search"><label for="${p.list}-search">Search ${esc(p.noun)}</label><input id="${p.list}-search" type="search" autocomplete="off"></div>`;
  if (p.selectAll) html += `<label class="select-all-row"><input type="checkbox" data-all ${selected.length === p.all.length ? 'checked' : ''}> Select all</label>`;
  groups.forEach((g, gi) => {
    html += `<div class="group"${g.group ? ` role="group" aria-label="${esc(g.group)}"` : ''}>${g.group ? `<div class="group-header">${esc(g.group)}</div>` : ''}<div class="opts">`;
    g.items.forEach(v => {
      const code = countryPicker ? countryCode(v) : null;
      const flag = code ? `<img class="country-flag" src="../assets/flags/4-3/${code}.svg" alt="" loading="lazy">` : '';
      html += `<label data-search="${esc(v.toLowerCase())}"><input type="${p.single ? 'radio' : 'checkbox'}" name="${p.list}" value="${esc(v)}" ${selected.includes(v) ? 'checked' : ''}>${flag}<span>${esc(v)}</span></label>`;
    });
    html += '</div></div>';
  });
  list.innerHTML = html;
  list.onchange = e => { if (e.target.matches('input[type=checkbox],input[type=radio]')) onPickerChange(type, e.target); };
  list.querySelector('input[type=search]').oninput = e => {
    const term = e.target.value.trim().toLowerCase();
    list.querySelectorAll('[data-search]').forEach(row => { row.hidden = !row.dataset.search.includes(term); });
    list.querySelectorAll('.group').forEach(group => { group.hidden = !group.querySelector('[data-search]:not([hidden])'); });
  };
  updatePickerLabel(type);
}
function countryCode(name) {
  const code = rawData.find(row => row['Country Name'] === name)?.['Country Code'];
  return code === 'EL' ? 'gr' : code?.toLowerCase();
}

function onPickerChange(type, input) {
  const p = PICKERS[type];
  const list = byId(p.list);
  let sel = [...p.get()];
  if (p.single) { p.set([input.value]); updatePickerLabel(type); closePopovers(); renderView(); return; }
  if (input.hasAttribute('data-all')) {
    sel = input.checked ? [...p.all] : [];
    list.querySelectorAll('input[value]').forEach((cb) => { cb.checked = input.checked; });
  } else if (input.checked) {
    sel.push(input.value);
    const max = p.max();
    if (max && sel.length > max) {
      const removed = sel.shift();
      const cb = list.querySelector(`input[value="${CSS.escape(removed)}"]`);
      if (cb) cb.checked = false;
    }
  } else {
    sel = sel.filter((x) => x !== input.value);
  }
  p.set(sel);
  const allCb = list.querySelector('input[data-all]');
  if (allCb) allCb.checked = sel.length === p.all.length;
  updatePickerLabel(type);
  renderView();
}

function updatePickerLabel(type) {
  const p = PICKERS[type];
  const sel = p.get();
  const total = (p.all || []).length;
  let text;
  if (sel.length === 0) text = 'None selected';
  else if (p.selectAll && sel.length === total) text = `All ${p.noun}`;
  else if (sel.length <= 2) text = sel.join(' · ');
  else text = `${sel.length} selected`;
  byId(p.value).textContent = text;
}

function openPopover(btn, list) {
  closePopovers();
  list.hidden = false;
  btn.setAttribute('aria-expanded', 'true');
  list.style.left = '0px';
  const over = list.getBoundingClientRect().right - (document.documentElement.clientWidth - 8);
  if (over > 0) list.style.left = `${-over}px`;
  list.querySelector('input[type=search]')?.focus();
}
function closePopovers() {
  document.querySelectorAll('.checkbox-list').forEach((l) => { l.hidden = true; });
  document.querySelectorAll('[aria-controls][aria-expanded]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
}
Object.values(PICKERS).forEach((p) => {
  const btn = byId(p.toggle);
  const list = byId(p.list);
  btn.addEventListener('click', () => (list.hidden ? openPopover(btn, list) : closePopovers()));
  btn.parentElement.addEventListener('focusout', (e) => {
    if (e.relatedTarget && !btn.parentElement.contains(e.relatedTarget)) closePopovers();
  });
});
document.addEventListener('click', (e) => { if (!e.target.closest('.dropdown-wrapper')) closePopovers(); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = document.querySelector('.checkbox-list:not([hidden])');
  if (!open) return;
  const btn = document.querySelector(`[aria-controls="${open.id}"]`);
  closePopovers();
  if (btn) btn.focus();
});

/* ---------- Controls ---------- */
function fillSelect(select, values, selected) {
  select.replaceChildren(...values.map((v) => new Option(v, v, false, v === selected)));
}

function init() {
  dataLoaded = true;

  const topics = [...new Set(rawData.map((d) => d['Topic']))].sort();
  state.topic = rawData.find(d => d['Indicator name'] === DEFAULT_INDICATOR)?.Topic || topics[0];
  els.topics.replaceChildren(...topics.map((t) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ef-chip';
    b.textContent = t;
    b.setAttribute('aria-pressed', String(t === state.topic));
    b.addEventListener('click', () => setTopic(t));
    return b;
  }));

  els.ind.addEventListener('change', (e) => { state.indicator = e.target.value; updateBreakdowns(); renderView(); });
  els.cat.addEventListener('change', (e) => { state.topCat = e.target.value; updateCategoryList(); renderView(); });
  updateIndicators(DEFAULT_INDICATOR);
  byId('indicator-prev').onclick = () => cycleIndicator(-1);
  byId('indicator-next').onclick = () => cycleIndicator(1);
  els.sort.onclick = () => { state.barSort = state.barSort === 'desc' ? 'alpha' : 'desc'; renderView(); };
  const breakdownButton=byId('breakdown-toggle'), breakdownList=byId('breakdown-list');
  breakdownButton.onclick=()=>breakdownList.hidden?openPopover(breakdownButton,breakdownList):closePopovers();
  breakdownButton.parentElement.addEventListener('focusout',e=>{if(e.relatedTarget&&!breakdownButton.parentElement.contains(e.relatedTarget))closePopovers();});

  allCountries = [...new Set(rawData.map((d) => d['Country Name']))].sort();
  state.barCountries = [...allCountries];
  buildPicker('barCountry', allCountries);
  state.radarCountries = allCountries.slice(0, 2);
  buildPicker('radarCountry', allCountries);
  state.cpCountry = allCountries[0];
  fillSelect(els.cpCountrySel, allCountries, state.cpCountry);
  buildPicker('cpCountry', allCountries);
  els.cpCountrySel.addEventListener('change', (e) => { state.cpCountry = e.target.value; renderView(); });
  state.r2Countries = allCountries.slice(0, 3);
  buildPicker('r2Country', allCountries);

  buildGlobalIndicatorList();
  buildPopulationGroupSelect();

  els.geoNational.addEventListener('click', () => setMapView('national'));
  els.geoNuts.addEventListener('click', () => setMapView('nuts'));

  els.tabs.forEach((t) => t.addEventListener('click', () => switchTab(t.dataset.tab)));
  els.tablist.addEventListener('keydown', (e) => {
    const i = els.tabs.findIndex((t) => t.dataset.tab === state.tab);
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % els.tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + els.tabs.length) % els.tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = els.tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    els.tabs[next].focus();
    switchTab(els.tabs[next].dataset.tab);
  });

  renderView();
  markReady();
}

function buildGlobalIndicatorList() {
  const map = new Map();
  rawData.forEach((d) => {
    if (!map.has(d['Topic'])) map.set(d['Topic'], new Set());
    map.get(d['Topic']).add(d['Indicator name']);
  });
  const groups = [...map.keys()].sort().map((top) => ({ group: top, items: [...map.get(top)].sort() }));
  if (!state.globalIndicators.length && groups.length) state.globalIndicators = groups[0].items.slice(0, 5);
  buildPicker('globalInd', groups);
}

function buildPopulationGroupSelect() {
  const map = new Map();
  rawData.forEach((d) => {
    const top = d['Top category'];
    const cat = d['Category'];
    if (String(top || '').toLowerCase().includes('nuts') || String(cat || '').toLowerCase().includes('nuts')) return;
    if (!map.has(top)) map.set(top, new Set());
    map.get(top).add(cat);
  });
  const tops = [...map.keys()].sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : String(a).localeCompare(String(b))));
  els.cpCatSel.replaceChildren(...tops.map((top) => {
    const g = document.createElement('optgroup');
    g.label = top;
    [...map.get(top)].sort().forEach((c) => g.append(new Option(c, c)));
    return g;
  }));
  const first = map.has('All') ? 'All' : (tops.length ? [...map.get(tops[0])][0] : '');
  if (first) { state.cpCategory = first; els.cpCatSel.value = first; }
  els.cpCatSel.addEventListener('change', (e) => { state.cpCategory = e.target.value; renderView(); });
}

function setTopic(t) {
  state.topic = t;
  els.topics.querySelectorAll('.ef-chip').forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === t)));
  updateIndicators();
  renderView();
}

function updateIndicators(preferred) {
  const inds = [...new Set(rawData.filter((d) => d['Topic'] === state.topic).map((d) => d['Indicator name']))].sort();
  state.indicator = inds.includes(preferred) ? preferred : inds[0];
  fillSelect(els.ind, inds, state.indicator);
  updateBreakdowns();
}

function updateBreakdowns() {
  const previousTopCat = state.topCat;
  const hasRegions = (rowsByIndicator.get(state.indicator) || []).some(d => String(d['Top category']).toLowerCase() === 'nuts region');
  if (state.mapViewMode === 'nuts' && !hasRegions) state.mapViewMode = 'national';
  els.geoNational.setAttribute('aria-pressed', String(state.mapViewMode === 'national'));
  els.geoNuts.setAttribute('aria-pressed', String(state.mapViewMode === 'nuts'));
  const topCats = [...new Set((rowsByIndicator.get(state.indicator) || []).map((d) => d['Top category']))]
    .filter((c) => !String(c || '').toLowerCase().includes('nuts region'))
    .sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : String(a).localeCompare(String(b))));
  if (!topCats.length) {
    state.topCat = null;
    els.cat.replaceChildren(new Option('No breakdowns', ''));
    els.cat.disabled = true;
    updateCategoryList();
    return;
  }
  els.cat.disabled = false;
  const keepBreakdown = topCats.includes(previousTopCat);
  state.topCat = keepBreakdown ? previousTopCat : topCats.includes('All') ? 'All' : topCats[0];
  if (!keepBreakdown && state.tab === 'radar') state.topCat = preferAgeBreakdown(topCats) || state.topCat;
  fillSelect(els.cat, topCats, state.topCat);
  updateCategoryList(keepBreakdown);
}

function preferAgeBreakdown(topCats) {
  return topCats.find((c) => String(c).toLowerCase().includes('age category'));
}

function updateCategoryList(preserve = false) {
  const rows = (rowsByIndicator.get(state.indicator) || []).filter((d) => d['Top category'] === state.topCat);
  const cats = [...new Set(rows.map((d) => d['Category']))].filter((c) => !String(c).toLowerCase().includes('nuts'));
  state.allCats = cats;
  const barCategories = preserve ? state.barCategories.filter(c => cats.includes(c)) : [];
  const mapCategories = preserve ? state.mapCategories.filter(c => cats.includes(c)) : [];
  state.barCategories = barCategories.length ? barCategories.slice(0, MAX.barCat) : cats.slice(0, MAX.barCat);
  state.mapCategories = mapCategories.length ? mapCategories.slice(0, MAX.mapCat) : cats.slice(0, 1);
  buildPicker('cat', cats);
}

function setMapView(mode) {
  state.mapViewMode = mode;
  els.geoNational.setAttribute('aria-pressed', String(mode === 'national'));
  els.geoNuts.setAttribute('aria-pressed', String(mode === 'nuts'));
  renderView();
}

function switchTab(tab) {
  if (tab === state.tab) return;
  closePopovers();
  state.tab = tab;
  els.tabs.forEach((t) => {
    const on = t.dataset.tab === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
  });
  els.panel.setAttribute('aria-labelledby', `tab-${tab}`);
  if (tab === 'radar') {
    const age = preferAgeBreakdown([...els.cat.options].map((o) => o.value));
    if (age && age !== state.topCat) { state.topCat = age; els.cat.value = age; updateCategoryList(); }
  }
  if (tab === 'bar' || tab === 'map') {
    els.catLabel.textContent = `Categories (max ${PICKERS.cat.max()})`;
    buildPicker('cat', state.allCats);
  }
  renderView();
}

function cycleIndicator(direction) {
  const options = [...els.ind.options];
  const next = (els.ind.selectedIndex + direction + options.length) % options.length;
  state.indicator = options[next].value; els.ind.value = state.indicator; updateBreakdowns(); renderView();
}

function syncControls() {
  const tab = state.tab;
  const single = tab === 'bar' || tab === 'map' || tab === 'radar';
  document.querySelector('.filters').dataset.view=tab;
  byId('indicator-position').textContent = `${els.ind.selectedIndex + 1} / ${els.ind.options.length}`;
  els.sortField.hidden = tab !== 'bar';
  const nuts = tab === 'map' && state.mapViewMode === 'nuts';
  els.topicField.hidden = !single;
  els.indicatorField.hidden = !single;
  els.geoField.hidden = tab !== 'map';
  els.breakdownField.hidden = !single || nuts;
  els.catField.hidden = true;
  els.barCountryField.hidden = tab !== 'bar';
  els.radarCountryField.hidden = tab !== 'radar';
  els.cpCountryField.hidden = tab !== 'country';
  els.r2CountryField.hidden = tab !== 'radar2';
  els.globalIndField.hidden = !(tab === 'country' || tab === 'radar2');
  els.cpCatField.hidden = !(tab === 'country' || tab === 'radar2');
  syncBreakdownPicker();
}

/* ---------- Chart theme ---------- */
function baseOptions(t, animate) {
  const anim = animate ? motionOptions() : false;
  const axis = {
    lineColor: t.axis, tickColor: t.axis, gridLineColor: Highcharts.color(t.grid).setOpacity(.55).get(), gridLineWidth: .7, minorGridLineColor: t.grid,
    labels: { style: { color: t.label, fontSize: '14px' } },
    title: { style: { color: t.label, fontSize: '14px', fontWeight: '400' } }
  };
  const navButton = {
    fill: t.surface, stroke: t.border, 'stroke-width': 1, style: { color: t.text },
    states: { hover: { fill: t.hover }, select: { fill: t.active }, disabled: { fill: t.surface, style: { color: t.muted } } }
  };
  return {
    colors: t.series,
    chart: { backgroundColor: 'transparent', animation: anim, style: { fontFamily: t.fontText, color: t.text }, spacing: [8, 8, 12, 4] },
    title: { align: 'left', style: { color: t.heading, fontFamily: t.fontHeading, fontSize: '25px', fontWeight: '600' } },
    subtitle: { align: 'left', style: { color: t.text, fontSize: '17px' } },
    xAxis: axis,
    yAxis: axis,
    legend: {
      align:'center',verticalAlign:'top',layout:'horizontal',margin:16,padding:4,
      itemStyle: { color: t.text, fontWeight: '400', fontSize: '15px' },
      itemHoverStyle: { color: t.labelStrong },
      itemHiddenStyle: { color: t.muted },
      title: { style: { color: t.text, fontWeight: '600', fontSize: '14px' } },
      navigation: { activeColor: t.labelStrong, inactiveColor: t.muted, style: { color: t.text } }
    },
    tooltip: { useHTML: true, outside: true, stickOnContact: true, hideDelay: 150, backgroundColor: 'transparent', borderWidth: 0, shadow: false, padding: 0, style: { color: t.text, fontSize: '14px', pointerEvents: 'auto' } },
    plotOptions: {
      series: { animation: anim, dataLabels: { style: { color: t.label, textOutline: 'none', fontWeight: '400', fontSize: '14px' } } },
      bar: { borderWidth: 0 },
      area: { lineWidth: 2 }
    },
    mapNavigation: { buttonOptions: { theme: navButton } },
    credits: { enabled: false },
    exporting: { enabled: false },
    accessibility: { enabled: true, point: { valueDecimals: 1 } }
  };
}

/* ---------- Views ---------- */
function rowsFor(ind, topCat) {
  return (rowsByIndicator.get(ind) || []).filter((d) => d['Top category'] === topCat);
}

const csvNum = (v) => (typeof v === 'number' && isFinite(v) ? String(v) : '');
const csvValue = (d) => (isSuppressed(d) ? '' : csvNum(d['Value']));
const csvCount = (d) => (typeof d['Count'] === 'number' ? String(d['Count']) : '');
const csvNote = (d) => (isSuppressed(d) ? SUPPRESSED_NOTE : '');

function indicatorNotes(inds) {
  const withNotes = inds.filter((i) => INDICATOR_NOTES[i]);
  if (inds.length === 1) return withNotes.map((i) => INDICATOR_NOTES[i]);
  return withNotes.map((i) => `${i}: ${INDICATOR_NOTES[i]}`);
}

function unitText(inds) {
  const units = new Set(inds.map(unitName));
  if (units.size > 1) return 'Unit: % (years for age of leaving home)';
  return units.has('years') ? 'Unit: years' : 'Unit: %';
}

function buildView(t) {
  const view = { charts: [], empty: null, pending: false, lowData: false, notes: [], unit: '', csv: null, name: state.tab };
  const fn = { bar: barView, map: mapView, radar: radarView, country: countryView, radar2: radar2View }[state.tab];
  return fn(t, view);
}

function barLayout(count, seriesCount, minimum, overhead, stride) {
  const oldStride = (Math.max(minimum, overhead + count * stride) - overhead) / count;
  const oldSlot = oldStride * 0.92 / seriesCount;
  const barWidth = oldSlot * 0.96 * 0.9;
  const gap = oldSlot * 0.04 + 1;
  const groupGap = oldStride * 0.08;
  const newStride = (barWidth + gap) * seriesCount + groupGap;
  return {
    height: Math.round(overhead + count * newStride),
    pointPadding: gap / (2 * (barWidth + gap)),
    groupPadding: groupGap / (2 * newStride)
  };
}

function barView(t, view) {
  const ind = state.indicator;
  view.notes = indicatorNotes([ind]);
  view.unit = unitText([ind]);
  const rows = rowsFor(ind, state.topCat);
  const cats = state.allCats.filter((c) => state.barCategories.includes(c));
  const countries = [...new Set(rows.map((d) => d['Country Name']))].sort().filter((c) => state.barCountries.includes(c));
  if (state.barSort === 'desc') {
    const rank = name => { const row = rows.find(d => d['Country Name'] === name && d.Category === cats[0]); return row && !isSuppressed(row) ? row.Value : -Infinity; };
    countries.sort((a,b) => rank(b) - rank(a) || a.localeCompare(b));
  }
  updateSortButton(cats);
  if (!rows.length) return { ...view, empty: 'No data for this selection.' };
  if (!cats.length) return { ...view, empty: 'Select at least one category.' };
  if (!countries.length) return { ...view, empty: 'Select at least one country.' };
  const shown = rows.filter((d) => cats.includes(d['Category']) && countries.includes(d['Country Name']));
  view.lowData = shown.some(isSuppressed);
  const colors = categoryColors(cats);
  const series = cats.map((cat) => ({
    name: cat,
    color: t.series[colors.get(cat)],
    data: countries.map((c) => {
      const r = shown.find((d) => d['Country Name'] === c && d['Category'] === cat);
      return { id: `country:${c}`, y: r && !isSuppressed(r) ? r['Value'] : null };
    })
  }));
  const {height, pointPadding, groupPadding} = barLayout(countries.length, cats.length, 400, 156, 6 + 18 * cats.length);
  view.charts.push({
    ctor: 'chart', height,
    options: {
      chart: { type: 'bar', height },
      title: { text: ind },
      subtitle: { text: state.topCat && state.topCat !== 'All' ? `By ${state.topCat.toLowerCase()}` : null },
      xAxis: { categories: countries, title: { text: null } },
      yAxis: { title: { text: axisTitle(ind) }, labels: { formatter() { return fmtAxis(this.value, ind); } }, maxPadding: 0.12 },
      legend: { enabled: cats.length > 1 },
      tooltip: {
        formatter() {
          const p = this.point || this;
          const sub = p.series.name !== 'All' ? `${ind} · ${p.series.name}` : ind;
          return barTooltip(p, ind);
        }
      },
      plotOptions: {
        bar: {
          pointPadding, groupPadding, crisp: false,
          dataLabels: { enabled: true, inside: false, crop: false, overflow: 'allow', formatter() { return fmtShort((this.point || this).y, ind); } }
        }
      },
      accessibility: { description: `Bar chart of ${ind} by country${cats.length > 1 ? ` and ${state.topCat.toLowerCase()}` : ''}.` },
      series
    }
  });
  view.csv = {
    meta: [['Indicator', ind], ['Breakdown', state.topCat]],
    columns: ['Country code', 'Country', 'Category', `Value (${unitName(ind)})`, 'Sample size', 'Note'],
    rows: countries.flatMap((c) => cats.map((cat) => shown.find((d) => d['Country Name'] === c && d['Category'] === cat)).filter(Boolean)
      .map((d) => [d['Country Code'], d['Country Name'], d['Category'], csvValue(d), csvCount(d), csvNote(d)]))
  };
  return view;
}

function colorAxisFor(t, ind, max) {
  const bounds = mapBounds(max);
  return {
    min: 0, max: bounds.max, tickPositions: bounds.ticks, startOnTick:false, endOnTick:false, reversed:false,
    stops: t.ramp.map((c, i, a) => [i / (a.length - 1), c]),
    gridLineColor: t.background,
    marker: { color: t.labelStrong },
    labels: { style: { color: t.label, fontSize: '14px' }, formatter() { return fmtAxis(this.value, ind); } }
  };
}

const polarPane = (size) => ({ size, background: [{ backgroundColor: 'transparent', borderWidth: 0 }] });

function mapSeriesOptions(t) {
  return {
    animation: false,
    joinBy: 'id', allAreas: true, nullColor: t.noData, borderColor: t.background, borderWidth: 0.6,
    states: { hover: { borderColor: t.labelStrong, borderWidth: 2, brightness: 0 } },
    dataLabels: { enabled: false }
  };
}

function mapView(t, view) {
  const ind = state.indicator;
  view.notes = indicatorNotes([ind]);
  view.unit = unitText([ind]);
  if (!mapsLoaded) { ensureMaps(); return { ...view, pending: true, empty: '' }; }

  if (state.mapViewMode === 'nuts') {
    if (!nutsGeo) return { ...view, error: 'The regional map could not be loaded.' };
    const rows = (rowsByIndicator.get(ind) || []).filter((d) => String(d['Top category']).toLowerCase() === 'nuts region');
    if (!rows.length) return { ...view, empty: 'No regional (NUTS) data for this indicator.' };
    view.lowData = rows.some(isSuppressed);
    const values = new Map();
    rows.filter((d) => !isSuppressed(d)).forEach((d) => { if (d['Category']) values.set(d['Category'], d['Value']); });
    const data = nutsGeo.features.map((f) => {
      const id = f.id || (f.properties && f.properties.NUTS_ID);
      if (!id) return null;
      const value = values.has(id) ? values.get(id) : (id.length >= 3 && values.has(id.substring(0, 3)) ? values.get(id.substring(0, 3)) : null);
      return { id, value, properties: f.properties };
    }).filter(Boolean);
    view.charts.push({
      ctor: 'mapChart', height: MAP_HEIGHT,
      options: {
        chart: { map: structuredClone(nutsGeo), height: MAP_HEIGHT },
        title: { text: ind },
        subtitle: { text: 'NUTS regions' },
        mapView: { projection: { name: 'WebMercator' }, fitToGeometry: EUROPE_BOX, padding: 8 },
        mapNavigation: { enabled: true, enableMouseWheelZoom: false, buttonOptions: { verticalAlign: 'bottom' } },
        colorAxis: colorAxisFor(t, ind, Math.max(0,...data.map(d => d.value).filter(Number.isFinite))),
        legend: mapLegend(),
        tooltip: { formatter() { return mapTooltip(this.point || this, ind); } },
        accessibility: { description: `Map of ${ind} by NUTS region.` },
        series: [{ ...mapSeriesOptions(t), data, name: 'Regions' }]
      }
    });
    view.csv = {
      meta: [['Indicator', ind], ['Geography', 'NUTS regions']],
      columns: ['NUTS code', 'Region', `Value (${unitName(ind)})`, 'Sample size', 'Note'],
      rows: rows.slice().sort((a, b) => String(a['Category']).localeCompare(String(b['Category'])))
        .map((d) => [d['Category'], nutsNames[d['Category']] || '', csvValue(d), csvCount(d), csvNote(d)])
    };
    return view;
  }

  if (!nationalGeo) return { ...view, error: 'The map could not be loaded.' };
  const rows = rowsFor(ind, state.topCat);
  if (!rows.length) return { ...view, empty: 'No data for this selection.' };
  const cats = state.allCats.filter((c) => state.mapCategories.includes(c));
  if (!cats.length) return { ...view, empty: 'Select at least one category.' };
  const shown = rows.filter((d) => cats.includes(d['Category']));
  view.lowData = shown.some(isSuppressed);
  const visible = shown.filter((d) => !isSuppressed(d));
  // Side-by-side maps share one scale so their colours compare.
  const mappedCodes = new Set(nationalGeo.features.map(f => f.properties?.id || f.id));
  const max = Math.max(0,...visible.filter(d => mappedCodes.has(d['Country Code'])).map(d => d.Value).filter(Number.isFinite));
  cats.forEach((cat) => {
    const sub = breakdownLabel(state.topCat, cat);
    view.charts.push({
      ctor: 'mapChart', height: MAP_HEIGHT,
      options: {
        chart: { map: structuredClone(nationalGeo), height: MAP_HEIGHT },
        title: { text: ind },
        subtitle: { text: sub },
        mapView: { projection: { name: 'WebMercator' }, fitToGeometry: EUROPE_BOX, padding: 8 },
        mapNavigation: { enabled: true, enableMouseWheelZoom: false, buttonOptions: { verticalAlign: 'bottom' } },
        colorAxis: colorAxisFor(t, ind, max),
        legend: mapLegend(),
        tooltip: { formatter() { return mapTooltip(this.point || this, ind, sub === 'All' ? '' : sub); } },
        accessibility: { description: `Map of ${ind} by country, ${sub}.` },
        series: [{
          ...mapSeriesOptions(t), name: cat,
          data: visible.filter((d) => d['Category'] === cat).map((d) => ({ id: d['Country Code'], value: d['Value'], name: d['Country Name'] }))
        }]
      }
    });
  });
  view.csv = {
    meta: [['Indicator', ind], ['Breakdown', state.topCat]],
    columns: ['Country code', 'Country', 'Category', `Value (${unitName(ind)})`, 'Sample size', 'Note'],
    rows: shown.slice().sort((a, b) => cats.indexOf(a['Category']) - cats.indexOf(b['Category']) || String(a['Country Name']).localeCompare(String(b['Country Name'])))
      .map((d) => [d['Country Code'], d['Country Name'], d['Category'], csvValue(d), csvCount(d), csvNote(d)])
  };
  return view;
}

function radarView(t, view) {
  const ind = state.indicator;
  view.notes = indicatorNotes([ind]);
  view.unit = unitText([ind]);
  const rows = rowsFor(ind, state.topCat);
  if (!rows.length) return { ...view, empty: 'No data for this selection.' };
  const countries = state.radarCountries;
  if (!countries.length) return { ...view, empty: 'Select at least one country.' };
  const categories = [...new Set(rows.map((d) => d['Category']))];
  const shown = rows.filter((d) => countries.includes(d['Country Name']));
  view.lowData = shown.some(isSuppressed);
  const visible = shown.filter((d) => !isSuppressed(d));
  const max = visible.length ? Math.max(...visible.map((d) => d['Value'])) : undefined;
  const colors = slotColors('radar', countries);
  countries.forEach((country) => {
    const color = t.series[colors.get(country)];
    view.charts.push({
      ctor: 'chart', height: 520,
      options: {
        chart: { polar: true, type: 'area', height: 520 },
        title: { text: country },
        subtitle: { text: state.topCat && state.topCat !== 'All' ? `${ind} by ${state.topCat.toLowerCase()}` : ind },
        pane: polarPane('72%'),
        xAxis: { categories, tickmarkPlacement: 'on', lineWidth: 0 },
        yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, max, labels: { formatter() { return fmtAxis(this.value, ind); } } },
        legend: { enabled: false },
        tooltip: {
          formatter() {
            const p = this.point || this;
            return tooltipHTML(p.series.chart,{title:country,subtitle:`${ind} · ${REFERENCE_YEAR}`,items:[tooltipItem(p.category,p.y,ind,color)]});
          }
        },
        accessibility: { description: `Radar chart of ${ind} in ${country} by ${String(state.topCat).toLowerCase()}.` },
        series: [{
          name: country, color, fillOpacity: 0.2, pointPlacement: 'on',
          data: categories.map((cat) => {
            const r = shown.find((d) => d['Country Name'] === country && d['Category'] === cat);
            return r && !isSuppressed(r) ? { y: r['Value'] } : null;
          })
        }]
      }
    });
  });
  view.csv = {
    meta: [['Indicator', ind], ['Breakdown', state.topCat]],
    columns: ['Country code', 'Country', 'Category', `Value (${unitName(ind)})`, 'Sample size', 'Note'],
    rows: countries.flatMap((c) => categories.map((cat) => shown.find((d) => d['Country Name'] === c && d['Category'] === cat)).filter(Boolean)
      .map((d) => [d['Country Code'], d['Country Name'], d['Category'], csvValue(d), csvCount(d), csvNote(d)]))
  };
  return view;
}

function multiIndicatorCsvColumns() {
  return ['Country code', 'Country', 'Indicator', 'Unit', 'Value', 'Sample size', 'Note'];
}

function countryView(t, view) {
  const inds = state.globalIndicators;
  const category = state.cpCategory || 'All';
  view.notes = indicatorNotes(inds);
  view.unit = unitText(inds);
  if (!inds.length) return { ...view, empty: 'Select at least one indicator.' };
  const rows = rawData.filter((d) => inds.includes(d['Indicator name']) && d['Country Name'] === state.cpCountry && d['Category'] === category);
  view.lowData = rows.some(isSuppressed);
  const {height, pointPadding, groupPadding} = barLayout(inds.length, 1, 360, 130, 40);
  view.charts.push({
    ctor: 'chart', height,
    options: {
      chart: { type: 'bar', height },
      title: { text: state.cpCountry },
      subtitle: { text: `Population group: ${category}` },
      xAxis: { categories: inds, title: { text: null } },
      yAxis: { title: { text: view.unit.replace('Unit: ', '') }, maxPadding: 0.12 },
      legend: { enabled: false },
      tooltip: {
        formatter() {
          const p = this.point || this;
          return tooltipHTML(p.series.chart, {title: state.cpCountry, subtitle: `${category} · ${REFERENCE_YEAR}`, items:[tooltipItem(p.category,p.y,p.category,p.color)]});
        }
      },
      plotOptions: {
        bar: {
          pointPadding, groupPadding, crisp: false,
          dataLabels: { enabled: true, inside: false, crop: false, overflow: 'allow', formatter() { const p = this.point || this; return fmtShort(p.y, p.category); } }
        }
      },
      accessibility: { description: `Bar chart of selected housing indicators for ${state.cpCountry}, ${category}.` },
      series: [{
        name: state.cpCountry, color: t.series[0],
        data: inds.map((ind) => {
          const r = rows.find((d) => d['Indicator name'] === ind);
          return { id: `indicator:${ind}`, y: r && !isSuppressed(r) ? r['Value'] : null };
        })
      }]
    }
  });
  view.csv = {
    meta: [['Country', state.cpCountry], ['Population group', category]],
    columns: multiIndicatorCsvColumns(),
    rows: inds.map((ind) => rows.find((d) => d['Indicator name'] === ind)).filter(Boolean)
      .map((d) => [d['Country Code'], d['Country Name'], d['Indicator name'], unitName(d['Indicator name']), csvValue(d), csvCount(d), csvNote(d)])
  };
  return view;
}

function radar2View(t, view) {
  const inds = state.globalIndicators;
  const countries = state.r2Countries;
  const category = state.cpCategory || 'All';
  view.notes = indicatorNotes(inds);
  view.unit = unitText(inds);
  if (!inds.length || !countries.length) return { ...view, empty: 'Select at least one indicator and one country.' };
  const rows = rawData.filter((d) => inds.includes(d['Indicator name']) && countries.includes(d['Country Name']) && d['Category'] === category);
  view.lowData = rows.some(isSuppressed);
  const colors = slotColors('r2', countries);
  view.charts.push({
    ctor: 'chart', height: 600,
    options: {
      chart: { polar: true, type: 'area', height: 600 },
      title: { text: 'Selected indicators by country' },
      subtitle: { text: `Population group: ${category}` },
      pane: polarPane('75%'),
      xAxis: { categories: inds, tickmarkPlacement: 'on', lineWidth: 0 },
      yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0 },
      tooltip: {
        shared: true,
        formatter() {
          const pts = (this.points || []).map((p) => p.point || p);
          if (!pts.length) return false;
          const ind = pts[0].category;
          return tooltipHTML(pts[0].series.chart,{title:ind,subtitle:`${category} · ${REFERENCE_YEAR}`,items:pts.map(p=>tooltipItem(p.series.name,p.y,ind,p.series.color))});
        }
      },
      accessibility: { description: `Radar chart comparing ${inds.length} housing indicators across ${countries.join(', ')}.` },
      series: countries.map((country) => ({
        name: country, color: t.series[colors.get(country)], fillOpacity: 0.1, pointPlacement: 'on',
        data: inds.map((ind) => {
          const r = rows.find((d) => d['Indicator name'] === ind && d['Country Name'] === country);
          return r && !isSuppressed(r) ? { y: r['Value'] } : null;
        })
      }))
    }
  });
  view.csv = {
    meta: [['Population group', category]],
    columns: multiIndicatorCsvColumns(),
    rows: countries.flatMap((c) => inds.map((ind) => rows.find((d) => d['Indicator name'] === ind && d['Country Name'] === c)).filter(Boolean)
      .map((d) => [d['Country Code'], d['Country Name'], d['Indicator name'], unitName(d['Indicator name']), csvValue(d), csvCount(d), csvNote(d)]))
  };
  return view;
}

/* ---------- Rendering ---------- */
function setStatus(view) {
  if (view.error) {
    els.status.innerHTML = `<div class="ef-notice ef-notice--danger">${esc(view.error)}</div>`;
  } else {
    els.status.textContent = view.empty || '';
  }
}

/* ---------- Exports ---------- */
function lightTokens() {
  const p = document.createElement('div');
  p.dataset.theme = 'light';
  p.hidden = true;
  document.body.append(p);
  const light = readTokens(p);
  p.remove();
  return light;
}

function svgToImage(svg) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not draw the chart')); };
    img.src = url;
  });
}

async function loadLogo() {
  try {
    const r = await fetch('eurofound-logo.svg');
    if (!r.ok) return null;
    return await svgToImage(await r.text());
  } catch (e) {
    return null;
  }
}

function wrapText(ctx, text, maxWidth) {
  const lines = [];
  let line = '';
  String(text).split(/\s+/).forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; } else line = test;
  });
  if (line) lines.push(line);
  return lines;
}

async function buildPNG() { return exportPNG(); }

function stateLabel() {
  if (state.tab === 'country') return state.cpCountry;
  if (state.tab === 'radar2') return 'comparison';
  return state.indicator;
}

function buildCSV() {
  const view = buildView(T);
  if (!view.csv || !view.csv.rows.length) return null;
  const q = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const line = (cells) => cells.map(q).join(',');
  const lines = view.csv.meta.map(line);
  lines.push(line(['Source', SOURCE_TEXT]));
  lines.push(line(['Year', REFERENCE_YEAR]));
  view.notes.forEach((n) => lines.push(line(['Note', n])));
  // Per-row quality notes retain the existing suppression rule.
  lines.push('');
  lines.push(line(view.csv.columns));
  view.csv.rows.forEach((r) => lines.push(line(r)));
  const blob = new Blob(['﻿' + lines.join('\r\n') + '\r\n'], { type: 'text/csv;charset=utf-8' });
  return { blob, filename: `housing-${view.name}-${slug(stateLabel())}.csv`, mimeType: 'text/csv' };
}


/* ---------- Embed script: talks to the Eurofound site ---------- */
const EF_SOURCE = 'ef-embed';
const EXPORTS = ['png', 'csv'];
const isEmbedded = window.parent !== window;
let ready = false;
let themeFromHost = false;
let lastHeight = 0;

/** Read the tokens again and re-render the charts, keeping the visitor's selections and map zoom. */
function redraw() {
  T = readTokens();
  renderView({ preserveMapView: true, noAnimation: true });
}

/** Resolve to { blob, filename, mimeType } for the current view, or null if there is none. */
async function buildExport(format) {
  if (format === 'png') return buildPNG();
  if (format === 'csv') return buildCSV();
  return null;
}

/** Call once data has loaded and the first view is drawn. */
function markReady() {
  ready = true;
  announce();
  postHeight(true);
}

function toHost(message) {
  if (isEmbedded) window.parent.postMessage({ source: EF_SOURCE, ...message }, '*');
}

function announce() {
  toHost({ type: 'ready', exports: EXPORTS, languages: EF_LANGUAGES });
}

// Measure <body>: documentElement.scrollHeight never drops below the iframe's height, so it can't shrink.
function postHeight(force) {
  const height = Math.ceil(document.body.getBoundingClientRect().height);
  if (force || height !== lastHeight) toHost({ type: 'resize', height: (lastHeight = height) });
}

function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') return;
  if (document.documentElement.dataset.theme === theme) return;
  document.documentElement.dataset.theme = theme;
  redraw();
}

new ResizeObserver(() => requestAnimationFrame(() => postHeight())).observe(document.body);

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const fromUrl = new URLSearchParams(location.search).has('theme');
  if (!fromUrl && !themeFromHost) setTheme(e.matches ? 'dark' : 'light');
});

window.addEventListener('message', async (event) => {
  const data = event.data;
  if (event.source !== window.parent || !data || typeof data !== 'object') return;

  if (data.type === 'set-theme') {
    themeFromHost = true;
    setTheme(data.theme);
  } else if (data.type === 'hello') {
    // The site forgets the height on every load, so report it even while data is loading.
    if (ready) announce();
    postHeight(true);
  } else if (data.type === 'export') {
    const reply = (message) =>
      event.source.postMessage(
        { source: EF_SOURCE, id: data.id, format: data.format, ...message },
        event.origin === 'null' ? '*' : event.origin,
      );
    try {
      if (!ready) throw new Error('Data is still loading');
      if (!EXPORTS.includes(data.format)) throw new Error(`No ${data.format} export`);
      const file = await buildExport(data.format);
      if (!file) throw new Error('Nothing to export in the current view');
      reply({ type: 'export-result', ...file });
    } catch (error) {
      reply({ type: 'export-error', message: error.message });
    }
  }
});
