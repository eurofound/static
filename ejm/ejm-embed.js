'use strict';
/* CONSTANTS */
const CSV_URL = new URL('./EJM2026update.csv', document.baseURI).href;
const FIELD_COUNTRY   = 'Country';
const FIELD_METRIC    = 'Metric';
const FIELD_PERIOD    = 'Year';
const FIELD_LEVEL1_A  = 'Level 1';
const FIELD_LEVEL1_B  = 'Level 1 ';
const FIELD_CATEGORY  = 'Category';
const FIELD_CRITERION = 'Calc Type';
const FIELD_QUINTILE  = 'Quintile';
const FIELD_VALUE     = 'Value';
const QUINTILE_ORDER  = ['Low','Mid-low','Mid','Mid-high','High'];

const EU_ALIASES = new Set(["EU","EU27","EU-27","EU28","EU-28","European Union","European union","EU 27","EU 28"]);
const ISO2_TO_NAME = {
  "AT":"Austria","BE":"Belgium","BG":"Bulgaria","HR":"Croatia","CY":"Cyprus","CZ":"Czechia",
  "DK":"Denmark","EE":"Estonia","FI":"Finland","FR":"France","DE":"Germany","EL":"Greece","GR":"Greece",
  "HU":"Hungary","IE":"Ireland","IT":"Italy","LV":"Latvia","LT":"Lithuania","LU":"Luxembourg",
  "MT":"Malta","NL":"Netherlands","PL":"Poland","PT":"Portugal","RO":"Romania","SK":"Slovakia",
  "SI":"Slovenia","ES":"Spain","SE":"Sweden","IS":"Iceland","NO":"Norway","CH":"Switzerland",
  "AL":"Albania","ME":"Montenegro","MK":"North Macedonia","RS":"Serbia","TR":"Türkiye","XK":"Kosovo",
  "GB":"United Kingdom","UK":"United Kingdom"
};
const NAME_TO_ISO2 = Object.fromEntries(Object.entries(ISO2_TO_NAME).map(([k,v])=>[v,k]));

/* DOM */
const cSel       = document.getElementById('countrySel');
const yearPills  = document.getElementById('yearPills');
const filterWrap = document.getElementById('filterList');
const critWrap   = document.getElementById('critList');
const metricPills= document.getElementById('metricPills');

const tgWrap  = document.getElementById('chartToggles');
const btnBar  = document.getElementById('btnBar');
const btnRad  = document.getElementById('btnRadar');

/* STATE */
let rows = [];
let selCountryName = 'European Union';
let selPeriod = null, selFilterGroup = 'All', selCriterion, selMetric;
let selChart = 'bar'; // 'bar' | 'radar'
let chart;
const countryKeys = new Map();

/* HELPERS */
const lvl1 = r => (r[FIELD_LEVEL1_A] ?? r[FIELD_LEVEL1_B] ?? '').trim();
const uniq = a => [...new Set(a)];
const sortAlpha = a => a.slice().sort((x,y)=>x.localeCompare(y));

function displayPeriod(p){ const m=(p||'').match(/(\d{4})\D+(\d{4})/); return m ? `${m[1]} \u2013 ${m[2]}` : p; }
function startYear(p){ const m=(p||'').match(/(\d{4})/); return m?+m[1]:-Infinity; }
function endYear(p){ const m=(p||'').match(/(\d{4})\D+(\d{4})/); return m?+m[2]:startYear(p); }
function sortYearsDesc(list){ return list.slice().sort((a,b)=> (endYear(b)-endYear(a)) || (startYear(b)-startYear(a))); }
function datasetUsesCodes(){ const sample = rows[0]?.[FIELD_COUNTRY] || ''; return sample.length <= 3 || ISO2_TO_NAME[sample]; }
function toDisplayName(v){
  if (!v) return v;
  if (EU_ALIASES.has(v)) return 'European Union';
  if (v.length>2 && !ISO2_TO_NAME[v]) return v;
  return ISO2_TO_NAME[v] || v;
}
function toDatasetKey(name){ return name === 'European Union' ? 'EU_ANY' : (countryKeys.get(name) || name); }

/* Number formatting rules */
function fmtVal(v){
  const abs = Math.abs(v);
  
  // Millions formatting (e.g., 2.7M or 27M)
  if (abs >= 1_000_000){
    const m = abs / 1e6;
    const digits = m < 10 ? m.toFixed(1) : Math.round(m).toString();
    return (v<0?'-':'') + digits.replace(/\.0$/,'') + 'M';
  }
  
  // Tens of thousands formatting (Fixes the 265.5K -> 266K rounding issue)
  if (abs >= 10_000){
    return (v<0?'-':'') + Math.round(abs / 1e3) + 'K';
  }
  
  // Single thousands formatting (e.g., 1.5K or 9.5K)
  if (abs >= 1_000){
    return (v<0?'-':'') + (abs / 1e3).toFixed(1).replace(/\.0$/,'') + 'K';
  }
  
  // Under 1,000 formatting
  return (v<0?'-':'') + Math.round(abs).toString();
}
function formatTooltip3(v){
  const sign = v < 0 ? '-' : '';
  const abs  = Math.abs(v);
  if (abs >= 1_000_000) return sign + (abs/1e6).toFixed(3).replace(/\.?0+$/,'') + 'M';
  if (abs >= 1_000)     return sign + (abs/1e3).toFixed(1).replace(/\.0$/,'') + 'K';
  return sign + Math.round(abs).toString();
}

/* Export filenames */
function safeFile(s){ return s.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-').replace(/\s+/g, ' ').trim(); }
function exportName(kind){ const yr = displayPeriod(selPeriod); return safeFile(`EJM_${kind} ${selCountryName} ${selMetric} ${yr}`); }

/* Radar toggle visibility */
function updateToggleVisibility(){
  document.querySelectorAll('.pill').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
  const show = /^total employment$/i.test((selMetric || '').trim());
  tgWrap.classList.toggle('hidden', !show);
  if (!show && selChart === 'radar') selChart = 'bar';
  btnBar.classList.toggle('active', selChart === 'bar');
  btnRad.classList.toggle('active', selChart === 'radar');
  btnBar.setAttribute('aria-pressed', String(selChart === 'bar'));
  btnRad.setAttribute('aria-pressed', String(selChart === 'radar'));
}

/* EJM country choices keep their flag and name, with native keyboard controls. */
function nameToFlagCode(name) {
  if (name === 'European Union') return 'eu';
  const code = NAME_TO_ISO2[name] || '';
  return ({EL:'GR', UK:'GB'}[code] || code).toLowerCase();
}
function buildFlagCountryDropdown(countries) {
  const ui = document.getElementById('countryUI');
  ui.innerHTML = '<button type="button" class="ef-select btn" id="flagBtn" aria-expanded="false" aria-controls="flagList"><span id="labelCurr"></span><svg aria-hidden="true" viewBox="0 0 16 16"><path d="m3 5 5 5 5-5z"/></svg></button><div class="ef-popover list" id="flagList" hidden></div>';
  const btn = ui.querySelector('#flagBtn'), list = ui.querySelector('#flagList');
  function label(name) {
    const fragment = document.createDocumentFragment(), code = nameToFlagCode(name);
    if (code) {
      const flag = document.createElement('img');
      flag.className = 'country-flag'; flag.alt = ''; flag.setAttribute('aria-hidden', 'true');
      flag.width = 24; flag.height = 18;
      flag.src = new URL(`../assets/flags/4-3/${code}.svg`, document.baseURI).href;
      flag.onerror = () => { flag.hidden = true; };
      fragment.append(flag);
    }
    const text = document.createElement('span'); text.textContent = name; fragment.append(text);
    return fragment;
  }
  function select(name) {
    const current = ui.querySelector('#labelCurr');
    current.replaceChildren(label(name));
    current.style.cssText = 'display:flex;align-items:center;gap:.6rem;';
    list.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.name === name)));
  }
  function close(focus = false) { list.hidden = true; btn.setAttribute('aria-expanded','false'); if (focus) btn.focus(); }
  countries.forEach(name => {
    const item = document.createElement('button'); item.type = 'button'; item.className = 'item'; item.dataset.name = name;
    item.append(label(name)); item.onclick = () => { cSel.value = name; select(name); close(true); cSel.onchange(); };
    list.append(item);
  });
  select(selCountryName);
  btn.onclick = () => { const opening = list.hidden; list.hidden = !opening; btn.setAttribute('aria-expanded', String(opening)); };
  ui.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault(); list.hidden = false; btn.setAttribute('aria-expanded','true');
      const items = [...list.children], current = items.indexOf(document.activeElement);
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 :
        current < 0 ? (event.key === 'ArrowDown' ? 0 : items.length - 1) :
        (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[index]?.focus();
    }
  });
  document.addEventListener('click', event => { if (!ui.contains(event.target)) close(); });
  document.addEventListener('focusin', event => { if (!ui.contains(event.target)) close(); });
}

/* UI */
function initUI(){
  // Countries (EU first, UK removed)
  const allNames = uniq(rows.map(r => toDisplayName(r[FIELD_COUNTRY]))).filter(n=>n && n!=='United Kingdom');
  const countries = [
    ...(allNames.includes('European Union') ? ['European Union'] : []),
    ...sortAlpha(allNames.filter(n=>n!=='European Union'))
  ];
  // hidden select to keep rest of code working
  cSel.innerHTML = countries.map(n=>`<option>${n}</option>`).join('');
  selCountryName = countries[0] || 'European Union';
  cSel.value = selCountryName;
  cSel.onchange = ()=>{ selCountryName=cSel.value; buildYears(true); draw(); };
  // visible flag dropdown
  buildFlagCountryDropdown(countries);

  // Metric buttons
  const metrics = sortAlpha(uniq(rows.map(r=>r[FIELD_METRIC]))).filter(Boolean);
  metricPills.innerHTML = metrics.map((m,i)=>`<button class="ef-chip pill ${i===0?'active':''}" data-v="${m}">${m}</button>`).join('');
  selMetric = metrics[0];
  metricPills.onclick = e=>{
    const v=e.target?.dataset?.v; if(!v) return;
    selMetric=v;
    metricPills.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.v===selMetric));
    updateToggleVisibility();
    buildYears(true); draw();
  };

  // Criterion (ordered)
  const critOrder=['Job-wage','Education','Broad job quality'];
  const critsAvail=uniq(rows.map(r=>r[FIELD_CRITERION])).filter(Boolean);
  const crits=critOrder.filter(c=>critsAvail.includes(c));
  critWrap.innerHTML = crits.map((c,i)=>`<label><input type="radio" name="crit" value="${c}" ${i===0?'checked':''}>${c}</label>`).join('');
  selCriterion=crits[0];
  critWrap.onchange = e=>{ selCriterion=e.target.value; buildYears(true); draw(); };

  // Filter-by (ordered, single All)
  const order=['All','Age','Sector','Gender','Contractual status','Employment status','Working hours','Core/non-core'];
  const avail=uniq(rows.map(r=>lvl1(r))).filter(Boolean);
  const groups=order.filter(f=>f==='All'||avail.includes(f));
  filterWrap.innerHTML = groups.map((g,i)=>`<label><input type="radio" name="f" value="${g}" ${i===0?'checked':''}>${g}</label>`).join('');
  selFilterGroup=groups[0]||'All';
  filterWrap.onchange = e=>{ selFilterGroup=e.target.value; draw(); };

  // Years
  buildYears(false);

  // Radar toggle initial visibility
  updateToggleVisibility();

  // Toggle handlers
  btnBar.onclick = ()=>{ selChart='bar';   btnBar.classList.add('active');   btnRad.classList.remove('active'); draw(); };
  btnRad.onclick = ()=>{ selChart='radar'; btnRad.classList.add('active'); btnBar.classList.remove('active');   draw(); };
}

function buildYears(preserve){
  const key = toDatasetKey(selCountryName);
  const yearsRaw = uniq(
    rows.filter(r=>{
      const ok = key==='EU_ANY' ? EU_ALIASES.has(r[FIELD_COUNTRY]) : r[FIELD_COUNTRY]===key;
      return ok && r[FIELD_METRIC]===selMetric && r[FIELD_CRITERION]===selCriterion;
    }).map(r=>r[FIELD_PERIOD])
  );
  const years = sortYearsDesc(yearsRaw);
  if (!(preserve && selPeriod && years.includes(selPeriod))) selPeriod = years[0] || null;

  yearPills.innerHTML = years.map(y=>`<button class="ef-chip pill ${y===selPeriod?'active':''}" data-v="${y}">${displayPeriod(y)}</button>`).join('');
  yearPills.onclick = e=>{
    const v=e.target?.dataset?.v; if(!v) return;
    selPeriod=v;
    yearPills.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.v===selPeriod));
    draw();
  };
}


const SOURCE = 'Eurofound, European Jobs Monitor';
const CORE_NOTE = '“core” workers are full time dependent employees with a permanent contract whilst non-core are any combination of part-time, self-employed or temporary workers.';
const EXPORTS = ['png', 'csv'];
const isEmbedded = window.parent !== window;
let ready = false, themeFromHost = false, lastHeight = 0;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function readTokens(element = document.documentElement) {
  const css = getComputedStyle(element), v = name => css.getPropertyValue(name).trim();
  return {
    dark:css.colorScheme === 'dark',
    series: Array.from({length:5}, (_,i) => v(`--chart-${i+1}`)),
    background:v('--background'), surface:v('--surface'), text:v('--foreground'), heading:v('--heading'),
    muted:v('--muted-foreground'), border:v('--border'), context:v('--border-strong'), axis:v('--chart-axis'),
    grid:v('--chart-grid'), label:v('--chart-label'), onData:v('--chart-label-on-data'),
    positive:v('--ejm-positive'), negative:v('--ejm-negative'),
    fontText:v('--font-source-sans-3'), fontHeading:v('--font-roboto')
  };
}

function currentView(preserveVisibility = false) {
  const key = toDatasetKey(selCountryName);
  const data = rows.filter(r => (key === 'EU_ANY' ? EU_ALIASES.has(r[FIELD_COUNTRY]) : r[FIELD_COUNTRY] === key) &&
    r[FIELD_METRIC] === selMetric && r[FIELD_CRITERION] === selCriterion && r[FIELD_PERIOD] === selPeriod);
  const isAll = selFilterGroup === 'All';
  const categories = isAll ? ['All'] : sortAlpha(uniq(data.filter(r => lvl1(r) === selFilterGroup).map(r => r[FIELD_CATEGORY])));
  const hidden = new Set(preserveVisibility ? chart?.series.filter(s => !s.visible).map(s => s.name) : []);
  const series = categories.map((cat, index) => ({
    name:cat, colorIndex:index, visible:!hidden.has(cat),
    data:QUINTILE_ORDER.map(q => {
      const row = data.find(r => (isAll ? lvl1(r).toLowerCase() === 'all' && (r[FIELD_CATEGORY] || '').trim().toLowerCase() === 'all' :
        lvl1(r) === selFilterGroup && r[FIELD_CATEGORY] === cat) && r[FIELD_QUINTILE] === q);
      // A missing observation remains missing; a published zero remains zero.
      return row && row[FIELD_VALUE].trim() !== '' && Number.isFinite(+row[FIELD_VALUE]) ? +row[FIELD_VALUE] : null;
    })
  }));
  return {
    country:selCountryName, period:selPeriod, periodLabel:displayPeriod(selPeriod), metric:selMetric,
    criterion:selCriterion, filter:selFilterGroup,
    mode:selMetric === 'Total employment' && selChart === 'radar' ? 'radar' : 'bar', series,
    title:`${selMetric} by ${selCriterion.toLowerCase()} quintile in ${selCountryName} (${displayPeriod(selPeriod)})`,
    notes:selFilterGroup === 'Core/non-core' ? CORE_NOTE : ''
  };
}

function chartOptions(view, t, exporting = false) {
  const motion = exporting || reducedMotion.matches ? false : {duration:300};
  const fewSeries = view.series.length <= 2, insideMinH = 16, insideMinW = 26;
  const inside = {color:t.onData, fontSize:'.714285714rem', fontWeight:400, textOutline:'none'};
  const outside = {...inside, color:t.label};
  const labels = [
    {enabled:true, inside:true, verticalAlign:'top', align:'center', y:4, padding:0, crop:true, overflow:'none', allowOverlap:false,
      style:inside, formatter(){ const sh=this.point?.shapeArgs; if(!fewSeries||!sh||this.y<=0||sh.width<insideMinW||Math.abs(sh.height)<insideMinH)return ''; return fmtVal(this.y); }},
    {enabled:true, inside:true, verticalAlign:'bottom', align:'center', y:-4, padding:0, crop:true, overflow:'none', allowOverlap:false,
      style:inside, formatter(){ const sh=this.point?.shapeArgs; if(!fewSeries||!sh||this.y>=0||sh.width<insideMinW||Math.abs(sh.height)<insideMinH)return ''; return fmtVal(this.y); }},
    {enabled:true, inside:false, align:'center', verticalAlign:'bottom', y:-2, crop:false, overflow:'none', allowOverlap:false,
      style:outside, formatter(){ const sh=this.point?.shapeArgs; if(!sh||this.y<=0)return ''; if(fewSeries&&sh.width>=insideMinW&&Math.abs(sh.height)>=insideMinH)return ''; return fmtVal(this.y); }},
    {enabled:true, inside:false, align:'center', verticalAlign:'top', y:12, crop:false, overflow:'none', allowOverlap:false,
      style:outside, formatter(){ const sh=this.point?.shapeArgs; if(!sh||this.y>=0)return ''; if(fewSeries&&sh.width>=insideMinW&&Math.abs(sh.height)>=insideMinH)return ''; return fmtVal(this.y); }}
  ];
  const radar = view.mode === 'radar';
  const options = {
    colors:t.series,
    chart:{type:radar ? 'line' : 'column', polar:radar, height:exporting ? 650 : null,
      backgroundColor:exporting ? t.background : 'transparent', spacingBottom:20, animation:motion,
      style:{fontFamily:t.fontText, fontSize:'1rem'}},
    title:{text:escapeHTML(view.title), style:{color:t.heading, fontFamily:t.fontHeading, fontSize:'1.285714286rem', fontWeight:'700'}},
    credits:{enabled:false}, exporting:{enabled:false, local:true, fallbackToExportServer:false},
    accessibility:{enabled:!exporting, description:`${view.title}. Filter: ${view.filter}. Values are numbers of jobs.`},
    xAxis:{categories:QUINTILE_ORDER, title:radar ? null : {text:'Quintile', style:{color:t.label,fontSize:'.857142857rem'}},
      lineColor:t.axis, lineWidth:radar ? 0 : .8, tickLength:0,
      labels:{style:{color:t.label,fontSize:'.857142857rem',fontWeight:400}},
      ...(radar ? {tickmarkPlacement:'on'} : {})},
    yAxis:{title:{text:view.metric, style:{color:t.label,fontSize:'.857142857rem'}},
      gridLineColor:t.grid, gridLineWidth:1,
      labels:{style:{color:t.muted,fontSize:'.857142857rem',fontWeight:400},formatter(){return fmtVal(this.value);}},
      ...(radar ? {gridLineInterpolation:'polygon',lineWidth:0,min:0} : {})},
    legend:{align:'center',verticalAlign:'top',layout:'horizontal',symbolRadius:2,
      itemStyle:{color:t.text,fontSize:'.857142857rem',fontWeight:400},itemHoverStyle:{color:t.heading},itemHiddenStyle:{color:t.muted}},
    tooltip:{useHTML:true, shared:radar, backgroundColor:t.surface, borderColor:t.border,
      style:{color:t.text,fontSize:'.8rem',pointerEvents:'auto'},
      formatter(){
        // Preserve the original EJM tooltip content and layout.
        if (radar) {
          const pts = this.points || [this.point];
          const lines = pts.map(p => `<span style="color:${p.series.color}">●</span> ${escapeHTML(p.series.name)}: <b style="color:${p.y >= 0 ? t.positive : t.negative}">${formatTooltip3(p.y)}</b>`);
          return `<div style="padding:6px 8px"><b>${escapeHTML(view.country)}</b><br>${lines.join('<br>')}<br>${escapeHTML(this.key ?? this.x)} quintile</div>`;
        }
        const lines = [`<div style="text-align:center"><b>${escapeHTML(view.country)}</b></div>`,
          `${escapeHTML(view.metric)}: <b style="color:${this.y >= 0 ? t.positive : t.negative}">${formatTooltip3(this.y)}</b> jobs`];
        if(view.filter !== 'All') lines.push(`${escapeHTML(view.filter)}: <b>${escapeHTML(this.series.name)}</b>`);
        lines.push(`${escapeHTML(this.key)} quintile`);
        return `<div style="padding:6px 8px">${lines.join('<br>')}</div>`;
      }},
    plotOptions:{series:{animation:motion, borderColor:t.dark ? t.label : t.background, borderWidth:1, states:{inactive:{opacity:.2}}}},
    series:view.series.map(s => ({name:s.name, color:t.series[s.colorIndex % t.series.length], data:s.data.slice(), visible:s.visible,
      ...(radar ? {pointPlacement:'on',marker:{enabled:true,radius:3},dataLabels:{enabled:false}} : {dataLabels:labels})}))
  };
  if(radar) options.pane = {size:'80%'};
  return options;
}

function footnotes(view) { return [['Source',SOURCE],['Notes',view.notes]].filter(([,value]) => value); }
function updateNotes(view) {
  const p = document.createElement('p');
  footnotes(view).forEach(([key,value],index) => {
    const span = document.createElement('span'), bold = document.createElement('strong');
    span.className = 'footnote-segment'; bold.textContent = key + ': ';
    span.append(bold, document.createTextNode(value));
    if(index) p.append(document.createTextNode(' ')); p.append(span);
  });
  document.getElementById('viewNotes').replaceChildren(p);
}
function showStatus(message, danger = false) {
  const status = document.getElementById('status'); status.textContent = message;
  status.className = danger ? 'ef-notice ef-notice--danger' : 'ef-notice';
}
function draw(preserveVisibility = false) {
  updateToggleVisibility();
  const view = currentView(preserveVisibility);
  chart?.destroy(); chart = null;
  updateNotes(view);
  if(!selPeriod || !view.series.some(s => s.data.some(Number.isFinite))) {
    document.getElementById('container').replaceChildren();
    showStatus('No data for this selection. Choose another country, year or filter.');
  } else {
    showStatus(''); chart = Highcharts.chart('container',chartOptions(view,readTokens()));
    if(!ready) { ready = true; announce(); }
  }
  document.getElementById('container').setAttribute('aria-busy','false');
  postHeight(true);
}

function toHost(message) { if(isEmbedded) window.parent.postMessage({source:'ef-embed',...message},'*'); }
function announce() { toHost({type:'ready',exports:EXPORTS,languages:EF_LANGUAGES}); }
function postHeight(force = false) {
  const height = Math.ceil(document.body.getBoundingClientRect().height);
  if(force || height !== lastHeight) { lastHeight = height; toHost({type:'resize',height}); }
}
function setTheme(theme) {
  if(!['light','dark'].includes(theme) || document.documentElement.dataset.theme === theme)return;
  document.documentElement.dataset.theme = theme;
  if(ready) draw(true);
}
new ResizeObserver(() => requestAnimationFrame(() => postHeight())).observe(document.body);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const fromUrl = new URLSearchParams(location.search).get('theme');
  if(!['light','dark'].includes(fromUrl) && !themeFromHost)setTheme(event.matches ? 'dark' : 'light');
});
reducedMotion.addEventListener('change', () => { if(ready)draw(true); });

function exportFilename(view, extension) {
  return safeFile(`EJM ${view.country} ${view.metric} ${view.criterion} ${view.filter} ${view.periodLabel}`) + '.' + extension;
}
async function buildExport(format) {
  if(!ready)throw new Error('Data is still loading');
  if(!EXPORTS.includes(format))throw new Error(`No ${format} export`);
  const view = currentView(true);
  if(!view.series.some(s => s.visible && s.data.some(Number.isFinite)))throw new Error('Nothing to export in the current view');
  if(format === 'csv') {
    const metadata = [['Title',view.title],['Country',view.country],['Period',view.periodLabel],
      ['Metric',view.metric],['Job quality criterion',view.criterion],['Filter',view.filter],['View',view.mode],
      ['Unit','Jobs'],['Source',SOURCE],...(view.notes ? [['Notes',view.notes]] : []),['Exported at',new Date().toISOString()]];
    const records = view.series.filter(s => s.visible).flatMap(s => s.data.map((value,index) =>
      [view.country,view.periodLabel,view.metric,view.criterion,view.filter,s.name,QUINTILE_ORDER[index],Number.isFinite(value) ? value : '']));
    const csv = Papa.unparse([...metadata,[],['Country','Period','Metric','Job quality criterion','Filter','Category','Quintile','Value (jobs)'],...records],
      {newline:'\r\n',escapeFormulae:true});
    return {blob:new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'}),filename:exportFilename(view,'csv'),mimeType:'text/csv'};
  }
  // An independent light-themed chart keeps the visible selection and theme intact.
  await document.fonts.ready;
  const probe = document.createElement('div'); probe.dataset.theme = 'light'; probe.hidden = true;
  document.body.append(probe); const light = readTokens(probe); probe.remove();
  const holder = document.createElement('div'); holder.dataset.theme = 'light'; holder.setAttribute('aria-hidden','true');
  holder.style.cssText = 'position:fixed;left:-20000px;top:0;width:1200px;visibility:hidden;'; document.body.append(holder);
  let exportChart, objectURL;
  try {
    const options = chartOptions(view,light,true); options.chart.width = 1200;
    exportChart = Highcharts.chart(holder,options);
    objectURL = URL.createObjectURL(new Blob([exportChart.getSVG()],{type:'image/svg+xml;charset=utf-8'}));
    const image = new Image();
    await new Promise((resolve,reject) => {image.onload=resolve;image.onerror=()=>reject(new Error('Could not render the image export'));image.src=objectURL;});
    const canvas = document.createElement('canvas'); canvas.width = 1200;
    const context = canvas.getContext('2d'), font=`16px ${light.fontText}`, boldFont=`600 16px ${light.fontText}`;
    const padding=24, logoWidth=75, logoLeft=canvas.width-padding-logoWidth, noteWidth=logoLeft-padding-24;
    const lines=[[]]; let lineWidth=0;
    footnotes(view).forEach(([key,value],index) => {
      const runs=[{text:`${key}: `,bold:true},...value.split(/\s+/).map(word=>({text:word+' ',bold:false}))];
      if(index && lineWidth)lineWidth+=16;
      for(const run of runs) {
        context.font=run.bold?boldFont:font; const width=context.measureText(run.text).width;
        if(lineWidth && lineWidth+width>noteWidth){lines.push([]);lineWidth=0;}
        lines.at(-1).push({...run,x:lineWidth});lineWidth+=width;
      }
    });
    const logo=new Image();
    await new Promise((resolve,reject)=>{logo.onload=resolve;logo.onerror=()=>reject(new Error('Could not load the Eurofound export logo'));logo.src=new URL('./eurofound-logo.svg',document.baseURI).href;});
    const logoHeight=logoWidth*logo.naturalHeight/logo.naturalWidth;
    const footerTop=options.chart.height+12, footerHeight=Math.max(lines.length*23,logoHeight);
    canvas.height=Math.ceil(footerTop+footerHeight+padding);
    context.fillStyle=light.background;context.fillRect(0,0,canvas.width,canvas.height);
    context.drawImage(image,0,0);context.fillStyle=light.text;
    lines.forEach((line,index)=>line.forEach(run=>{context.font=run.bold?boldFont:font;context.fillText(run.text,24+run.x,options.chart.height+24+index*23);}));
    context.drawImage(logo,logoLeft,footerTop+footerHeight-logoHeight,logoWidth,logoHeight);
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(result=>result?resolve(result):reject(new Error('Could not build the PNG')),'image/png'));
    return {blob,filename:exportFilename(view,'png'),mimeType:'image/png'};
  } finally {if(objectURL)URL.revokeObjectURL(objectURL);exportChart?.destroy();holder.remove();}
}

window.addEventListener('message',async event => {
  if(event.source !== window.parent || !event.data)return;
  // Retain compatibility with the existing website card's download buttons.
  if(event.data === 'download-png' || event.data === 'download-csv') {
    let objectURL;
    try {
      const file=await buildExport(event.data.slice('download-'.length));objectURL=URL.createObjectURL(file.blob);
      const link=document.createElement('a');link.href=objectURL;link.download=file.filename;link.hidden=true;
      document.body.append(link);link.click();link.remove();
    } catch(error){showStatus(error.message,true);}
    finally {if(objectURL)setTimeout(()=>URL.revokeObjectURL(objectURL),1000);}
    return;
  }
  if(typeof event.data !== 'object')return;
  const data=event.data;
  if(data.type === 'set-theme' && ['light','dark'].includes(data.theme)){themeFromHost=true;setTheme(data.theme);}
  else if(data.type === 'hello'){if(ready)announce();postHeight(true);}
  else if(data.type === 'export') {
    const reply=message=>event.source.postMessage({source:'ef-embed',id:data.id,format:data.format,...message},event.origin==='null'?'*':event.origin);
    try {reply({type:'export-result',...await buildExport(data.format)});}
    catch(error){reply({type:'export-error',message:error.message});}
  }
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')chart?.tooltip?.hide(0);});
document.getElementById('retry').onclick=()=>location.reload();
function fail(message) {
  showStatus(message,true);document.getElementById('retry').hidden=false;
  document.getElementById('container').setAttribute('aria-busy','false');postHeight(true);
}
if(typeof Highcharts === 'undefined' || typeof Papa === 'undefined' || !Highcharts.Chart.prototype.getSVG) {
  fail('The dashboard could not load its chart libraries. Check your connection and try again.');
} else {
  Highcharts.setOptions({lang:{decimalPoint:'.',thousandsSep:','}});
  Papa.parse(CSV_URL,{
    download:true,header:true,dynamicTyping:false,skipEmptyLines:true,
    error:()=>fail('The EJM data could not be loaded. Check your connection and try again.'),
    complete:({data,errors})=>{
      try {
        if(errors.length)throw new Error('Invalid CSV');
        rows=data.filter(r=>r && r[FIELD_COUNTRY]);
        if(!rows.length || ![FIELD_COUNTRY,FIELD_METRIC,FIELD_PERIOD,FIELD_CATEGORY,FIELD_CRITERION,FIELD_QUINTILE,FIELD_VALUE].every(key=>key in rows[0]))throw new Error('Invalid columns');
        rows.forEach(r=>countryKeys.set(toDisplayName(r[FIELD_COUNTRY]),r[FIELD_COUNTRY]));
        document.getElementById('controls').hidden=false;initUI();draw();
      } catch(error){console.error(error);fail('The EJM data could not be displayed. Please try again later.');}
    }
  });
}
