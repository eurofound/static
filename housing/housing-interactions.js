/* Presentation helpers. The source observations and suppression rule are unchanged. */
let pinnedTooltip = null;

function axisBounds(highest, percentage = true) {
  highest = Number.isFinite(highest) ? Math.max(0, highest) : 0;
  const step = percentage ? highest <= 10 ? 2 : highest <= 30 ? 5 : highest <= 60 ? 10 : 20 : highest <= 20 ? 2 : highest <= 50 ? 5 : 10;
  const max = Math.max(step * 4, Math.ceil(highest / step) * step);
  return {max, step, ticks: Array.from({length: Math.round(max / step) + 1}, (_,i) => i * step)};
}
function mapMaximum(indicator) {
  return Math.max(0, ...(rowsByIndicator.get(indicator) || []).filter(r => !isSuppressed(r)).map(r => r.Value).filter(Number.isFinite));
}
function mapLegend() {
  return {layout:'vertical', align:'left', verticalAlign:'middle', symbolHeight:260, symbolWidth:16, symbolRadius:0, padding:8, margin:24, title:{text:null}};
}
function decorateView(view, tokens, width = els.viz.clientWidth || 1100) {
  view.charts.forEach((spec, chartIndex) => {
    const o = spec.options, bar = o.chart.type === 'bar';
    o.title.text += ` (${REFERENCE_YEAR})`;
    o.subtitle = {text: [o.subtitle?.text, view.unit.replace('Unit: ', '')].filter(Boolean).join(' · ')};
    o.custom = {view:state.tab, indicator:state.indicator};
    if (bar) {
      const highest = Math.max(0,...o.series.flatMap(series => series.data.map(p => typeof p === 'number' ? p : p?.y)).filter(Number.isFinite));
      const sameUnit = !view.unit.includes('years') || !view.unit.includes('%');
      const bounds = axisBounds(highest, !view.unit.includes('years'));
      o.yAxis = {...o.yAxis, min:0, max:bounds.max, tickPositions:bounds.ticks, endOnTick:false,
        title:{text:null}, labels:{formatter(){return numAxis.format(this.value) + (view.unit.includes('%') && sameUnit ? '%' : '');}}};
      const available = Math.max(100, width - (width < 600 ? 140 : 220));
      o.series.forEach((series, si) => {
        series.id = `bar-series-${si}`;
        series.data = series.data.map((item, index) => {
          const point = typeof item === 'number' ? {y:item} : item || {y:null};
          const indicator = state.tab === 'country' ? o.xAxis.categories[index] : state.indicator;
          const label = fmtShort(point.y, indicator);
          const fits = Number.isFinite(point.y) && point.y / bounds.max * available >= label.length * 8 + 17;
          return {...point, x:index, id: point.id || `point:${o.xAxis.categories[index]}`, color:series.color,
            custom:{indicator}, dataLabels:{inside:fits, align:fits ? 'right' : 'left', x:fits ? -6 : 5,
              style:{color:fits ? tokens.onData : tokens.text, textOutline:'none', fontSize:'15px', fontWeight:'600'},
              formatter(){return Number.isFinite(this.y) ? fmtShort(this.y, indicator) : '';}}};
        });
      });
      o.plotOptions.bar.dataLabels.style = {textOutline:'none', fontSize:'15px', fontWeight:'600'};
    }
    if (spec.ctor === 'mapChart') {
      o.chart.events = {render(){renderMapLegend(this,tokens);}};
      o.mapNavigation.buttonOptions.align = 'right';
      o.legend = mapLegend();
    }
    if (o.chart.polar) {
      o.xAxis.labels = {style:{fontSize:width < 600 ? '12px' : '14px', textOverflow:'none'}, distance:12};
      o.pane = polarPane(width < 600 ? '55%' : '70%');
      o.chart.spacing = [12, width < 600 ? 28 : 36, 28, width < 600 ? 28 : 36];
    }
  });
  return view;
}

function tooltipItem(label, value, indicator, color, kind = 'series') {
  return {label,value,indicator,color,kind,colorSlot:Math.max(0,T.series.indexOf(color))};
}
function tooltipHTML(chart, model) {
  model.maximum = Math.max(1, ...model.items.map(item => mapMaximum(item.indicator)));
  chart.housingTooltipModel = model;
  const items = model.items.map(item => {
    const length = Math.max(0,Math.min(100,item.value / model.maximum * 100));
    const outline = Highcharts.color(item.color).brighten(-.2).get();
    return `<div class="tt-item"><span class="tt-name">${esc(item.label)}</span>${Number.isFinite(item.value) ?
      `<span class="tt-track"><span class="tt-scale"><span class="tt-fill" style="width:${length}%;background:${esc(item.color)};border-color:${esc(outline)}"></span><strong class="tt-num" style="left:${length}%">${esc(fmtValue(item.value,item.indicator))}</strong></span></span>` :
      '<span class="tt-missing">No data</span>'}</div>`;
  }).join('');
  return `<div class="ef-tooltip tt"><div class="tt-title">${esc(model.title)}</div><div class="tt-sub">${esc(model.subtitle)}</div><div class="tt-items" tabindex="0">${items}</div></div>`;
}
function barTooltip(point, indicator) {
  const chart = point.series.chart;
  const points = chart.series.filter(s => s.visible).map(s => s.points.find(p => p.x === point.x)).filter(Boolean);
  return tooltipHTML(chart, {title:point.category,subtitle:`${indicator} · ${REFERENCE_YEAR}`,
    items:points.map(p => tooltipItem(p.series.name === 'All' ? 'All' : p.series.name,p.y,indicator,p.color || p.series.color))});
}
function mapTooltip(point, indicator, subLabel) {
  const props = point.properties || {}, chart = point.series.chart;
  const name = point.name || props.na || props.NUTS_NAME || point.id;
  const items = [tooltipItem(name,point.value,indicator,point.color || T.series[0],'map')];
  const rows = rowsByIndicator.get(indicator) || [];
  if (state.mapViewMode === 'national') {
    const code = point.id || point['hc-key'] || props.id;
    const alt = code === 'GR' ? 'EL' : code;
    rows.filter(r => isNutsRow(r) && !isSuppressed(r) && (String(r.Category).startsWith(code) || String(r.Category).startsWith(alt)))
      .sort((a,b) => b.Value - a.Value)
      .forEach(r => items.push(tooltipItem(nutsNames[r.Category] || r.Category,r.Value,indicator,T.series[7],'context')));
  } else if (point.id) {
    const cc = point.id.slice(0,2), alt = cc === 'EL' ? 'GR' : cc;
    const national = rows.find(r => !isNutsRow(r) && !isSuppressed(r) && (r['Country Code'] === cc || r['Country Code'] === alt) && r['Top category'] === 'All' && r.Category === 'All');
    if (national) items.push(tooltipItem(`${national['Country Name']} — national`,national.Value,indicator,T.series[7],'context'));
  }
  return tooltipHTML(chart,{title:name,subtitle:[indicator,subLabel,REFERENCE_YEAR].filter(Boolean).join(' · '),items});
}

function releaseTooltip() {
  pinnedTooltip = null;
  activeCharts.forEach(chart => chart.tooltip?.hide(0));
}
function installTooltipPinning(chart) {
  const tooltip = chart.tooltip;
  for (const method of ['refresh','hide','updatePosition','move']) {
    const original = tooltip[method];
    tooltip[method] = function(...args) { if (!pinnedTooltip) return original.apply(this,args); };
  }
}
function pinDisplayedTooltip(chart) {
  const tooltip = chart.tooltip, card = tooltip.container?.querySelector('.tt') || chart.renderTo.querySelector('.tt');
  if (!card || tooltip.isHidden || !chart.housingTooltipModel) return false;
  const bounds = card.getBoundingClientRect(), frame = chart.renderTo.getBoundingClientRect();
  activeCharts.filter(c => c !== chart).forEach(c => c.tooltip.hide(0));
  pinnedTooltip = {chartIndex:activeCharts.indexOf(chart), model:structuredClone(chart.housingTooltipModel),
    left:(bounds.left-frame.left)/frame.width,top:(bounds.top-frame.top)/frame.height};
  clearTimeout(tooltip.hideTimer); clearTimeout(tooltip.tooltipTimeout);
  return true;
}
document.addEventListener('click',event => {
  if (pinnedTooltip) { releaseTooltip(); return; }
  if (event.target.closest('.map-range-button,.highcharts-map-navigation,.highcharts-legend-item')) return;
  const chart = activeCharts.find(c => c.renderTo.contains(event.target) || c.tooltip?.container?.contains(event.target));
  if (chart) pinDisplayedTooltip(chart);
},true);
document.addEventListener('keydown',event => {
  if (event.key === 'Escape') { releaseTooltip(); activeCharts.forEach(c => c.clearMapRange?.()); }
  if (event.key === 'Enter' && event.target.closest('.highcharts-container,.highcharts-tooltip-container')) {
    if (pinnedTooltip) releaseTooltip();
    else { const chart = activeCharts.find(c => c.renderTo.contains(event.target) || c.tooltip?.container?.contains(event.target)); if (chart) pinDisplayedTooltip(chart); }
  }
});

function renderMapLegend(chart,tokens) {
  const axis = chart.colorAxis?.[0], symbol = axis?.legendItem?.symbol;
  if (!symbol || !(axis.max > axis.min)) return;
  const box = symbol.getBBox();
  // SVG furniture also survives getSVG() and PNG exports.
  if (!chart.housingNoData) {
    const group = chart.renderer.g('housing-no-data').add(chart.legend.group);
    chart.renderer.rect(0,0,14,14,1).attr({fill:tokens.noData,stroke:tokens.border,'stroke-width':1}).add(group);
    chart.renderer.text('No data',22,12).css({fontSize:'14px',color:tokens.text}).add(group);
    chart.housingNoData = group;
  }
  const x = Number(symbol.attr('x')), y = Number(symbol.attr('y'));
  chart.housingNoData.attr({translateX:x,translateY:y + Number(symbol.attr('height')) + 25});
  if (chart.options.custom?.exporting || chart.options.chart.forExport) return;
  const bounds = [...new Set([axis.min,...axis.tickPositions.filter(v => v > axis.min && v < axis.max),axis.max])];
  const ranges = bounds.slice(0,-1).map((from,i) => ({from,to:bounds[i+1],last:i===bounds.length-2})).reverse();
  const signature = bounds.join(',');
  if (chart.rangeSignature !== signature) {
    chart.rangeLegend?.remove(); chart.rangeHint?.remove(); chart.rangeUnbind?.();
    chart.rangeSignature = signature;
    const legend = chart.rangeLegend = document.createElement('div'); legend.className='map-range-legend';
    legend.setAttribute('role','group'); legend.setAttribute('aria-label','Highlight map value ranges');
    const hint = chart.rangeHint = document.createElement('div'); hint.className='map-range-hint'; hint.setAttribute('aria-live','polite');
    chart.renderTo.append(legend,hint);
    let hovered=null, focused=null, selected=null;
    chart.paintMapRange = () => {
      const active = hovered ?? focused ?? selected, range = active == null ? null : ranges[active];
      chart.selectedRange = selected == null ? null : ranges[selected];
      chart.series[0].points.forEach(p => { if(p.graphic) p.graphic.element.style.fill = range && !inMapRange(p.value,range) ? tokens.noData : ''; });
      [...legend.children].forEach((button,i) => { button.classList.toggle('is-active',i===active); button.setAttribute('aria-pressed',String(i===selected)); });
      hint.textContent = range ? `${numAxis.format(range.from)}–${fmtAxis(range.to,state.indicator)}` : '';
    };
    chart.clearMapRange = () => {hovered=focused=selected=null;chart.paintMapRange();};
    ranges.forEach((range,i) => {
      const button=document.createElement('button'); button.type='button'; button.className='map-range-button';
      button.setAttribute('aria-label',`${fmtAxis(range.from,state.indicator)} to ${range.last?'':'under '}${fmtAxis(range.to,state.indicator)}`); button.setAttribute('aria-pressed','false');
      button.onmouseenter=()=>{hovered=i;chart.paintMapRange();}; button.onmouseleave=()=>{hovered=null;chart.paintMapRange();};
      button.onfocus=()=>{focused=i;chart.paintMapRange();}; button.onblur=()=>{focused=null;chart.paintMapRange();};
      button.onclick=()=>{selected=selected===i?null:i;hovered=focused=null;chart.paintMapRange();};
      button.onkeydown=e=>{ const next=e.key==='ArrowDown'?(i+1)%ranges.length:e.key==='ArrowUp'?(i+ranges.length-1)%ranges.length:e.key==='Home'?0:e.key==='End'?ranges.length-1:null;if(next!=null){e.preventDefault();legend.children[next].focus();} };
      legend.append(button);
    });
    chart.rangeUnbind=Highcharts.addEvent(chart.renderTo,'pointerdown',e=>{if(!legend.contains(e.target))chart.clearMapRange();});
  }
  const rect=symbol.element.getBoundingClientRect(),host=chart.renderTo.getBoundingClientRect();
  [...chart.rangeLegend.children].forEach((button,i)=>Object.assign(button.style,{left:`${rect.left-host.left-5}px`,width:`${Math.max(26,rect.width+10)}px`,top:`${rect.top-host.top+(axis.max-ranges[i].to)/(axis.max-axis.min)*rect.height}px`,height:`${(ranges[i].to-ranges[i].from)/(axis.max-axis.min)*rect.height}px`}));
  Object.assign(chart.rangeHint.style,{left:`${chart.plotLeft+16}px`,top:`${chart.plotTop+8}px`});
  chart.paintMapRange();
  // Highcharts hides non-SVG siblings during its accessibility pass.
  requestAnimationFrame(()=>{
    chart.rangeLegend?.setAttribute('aria-hidden','false');
    chart.rangeHint?.setAttribute('aria-hidden','false');
  });
}
const inMapRange = (value,range) => Number.isFinite(value) && value >= range.from && (value < range.to || range.last && value <= range.to);

function chartFootnotes(view) {
  const notes=[...view.notes];
  if(view.lowData) notes.push(LOW_DATA_TEXT);
  return [['Source',SOURCE_TEXT],...(notes.length ? [['Notes',notes.join(' ')]] : [])];
}
function renderView(opts={}) {
  if(!dataLoaded)return;
  releaseTooltip(); syncControls();
  const previous=activeCharts.slice(), view=decorateView(buildView(T),T);
  currentView=view;
  els.viz.classList.toggle('split',view.charts.length>1);
  els.lowData.hidden=true;
  els.notes.replaceChildren(...chartFootnotes(view).map(([key,value])=>{
    const p=document.createElement('p'),label=document.createElement('strong');label.textContent=`${key}: `;p.append(label,document.createTextNode(value));return p;
  }));
  els.notes.hidden=false; setStatus(view);
  const next=[];
  view.charts.forEach((spec,i)=>{
    const old=previous[i], reuse=old && (!opts.noAnimation || opts.resize) && old.housingTab===state.tab && spec.options.chart.type==='bar' && old.options.chart.type==='bar';
    const o=Highcharts.merge(baseOptions(T,false),spec.options);
    if(reuse){
      const motion=!opts.noAnimation && old.housingUnit===view.unit?motionOptions():false;
      old.tooltip.hide(0);
      old.update({title:o.title,subtitle:o.subtitle,tooltip:o.tooltip,accessibility:o.accessibility,legend:o.legend},false,false,false);
      old.xAxis[0].setCategories(o.xAxis.categories,false);
      old.yAxis[0].update(o.yAxis,false);
      while(old.series.length>o.series.length)old.series.at(-1).remove(false);
      o.series.forEach((series,index)=>{
        const existing=old.series[index];
        if(existing){
          existing.name=series.name;existing.options.name=series.name;
          existing.color=series.color;existing.options.color=series.color;old.isDirtyLegend=true;
          existing.setData(series.data,false,motion,true);
        }else old.addSeries(series,false,motion);
      });
      old.renderTo.style.height=`${spec.height}px`;
      if(old.chartHeight!==spec.height)old.setSize(undefined,spec.height,motion);
      else old.redraw(motion);
      old.housingUnit=view.unit;next.push(old);
    }else{
      let memo=opts.preserveMapView && old?.mapView ? {center:[...old.mapView.center],zoom:old.mapView.zoom}:null;
      if(old){old.rangeUnbind?.();old.destroy();old.renderTo?.remove();}
      const slot=document.createElement('div');slot.className='chart-slot';slot.style.height=`${spec.height}px`;els.viz.append(slot);
      const chart=Highcharts[spec.ctor](slot,o);
      if(memo && memo.center.every(Number.isFinite) && Number.isFinite(memo.zoom))chart.mapView.setView(memo.center,memo.zoom,true,false);
      chart.housingTab=state.tab;chart.housingUnit=view.unit;installTooltipPinning(chart);next.push(chart);
    }
  });
  previous.slice(view.charts.length).forEach(chart=>{const node=chart.renderTo;chart.rangeUnbind?.();chart.destroy();node.remove();});
  activeCharts=next;
  [...els.viz.children].forEach(node=>{if(!activeCharts.some(c=>c.renderTo===node))node.remove();});
  if(view.pending)ensureMaps().then(()=>{if(state.tab==='map')renderView();});
  housingLastWidth=els.viz.clientWidth;
  postHeight(true);
}

function paintPinnedCard(ctx,pin,width,height,tokens) {
  const model=pin.model,pad=13,cardW=Math.min(310,width-24),inner=cardW-pad*2;
  ctx.font=`14px ${tokens.fontText}`;
  const title=wrapText(ctx,model.title,inner), subtitle=wrapText(ctx,model.subtitle,inner);
  const items=model.items.map(item=>({...item,lines:wrapText(ctx,item.label,inner)}));
  const cardH=pad*2+(title.length+subtitle.length)*18+10+items.reduce((sum,item)=>sum+item.lines.length*17+27,0);
  const scale=Math.min(1,(height-80)/cardH);
  ctx.save();ctx.translate(Math.max(8,Math.min(width-cardW*scale-8,pin.left*width)),Math.max(64,Math.min(height-cardH*scale-8,pin.top*height)));ctx.scale(scale,scale);
  ctx.fillStyle=tokens.background;ctx.strokeStyle=tokens.border;ctx.lineWidth=1;ctx.shadowColor='rgba(0,0,0,.15)';ctx.shadowBlur=8;ctx.shadowOffsetY=3;
  ctx.beginPath();ctx.roundRect(0,0,cardW,cardH,8);ctx.fill();ctx.shadowColor='transparent';ctx.stroke();
  let y=pad;ctx.textBaseline='top';ctx.fillStyle=tokens.heading;ctx.font=`600 16px ${tokens.fontText}`;
  title.forEach(line=>{ctx.fillText(line,pad,y);y+=18;});ctx.font=`14px ${tokens.fontText}`;ctx.fillStyle=tokens.muted;
  subtitle.forEach(line=>{ctx.fillText(line,pad,y);y+=18;});y+=10;
  for(const item of items){
    ctx.font=`14px ${tokens.fontText}`;ctx.fillStyle=tokens.text;item.lines.forEach(line=>{ctx.fillText(line,pad,y);y+=17;});
    if(Number.isFinite(item.value)){
      const length=Math.max(0,Math.min(1,item.value/model.maximum))*(inner-64);
      const color=item.kind==='context'?tokens.series[7]:item.kind==='map'?mapExportColor(item.value,item.indicator,tokens):tokens.series[item.colorSlot];
      ctx.fillStyle=tokens.noData;ctx.fillRect(pad,y,inner,16);
      if(length>0){ctx.fillStyle=color;ctx.fillRect(pad,y,length,16);ctx.strokeStyle=Highcharts.color(color).brighten(-.2).get();ctx.strokeRect(pad+.5,y+.5,Math.max(0,length-1),15);}
      ctx.fillStyle=tokens.number;ctx.font=`600 14px ${tokens.fontText}`;ctx.fillText(fmtValue(item.value,item.indicator),pad+length+7,y);
    }else{ctx.fillStyle=tokens.muted;ctx.fillText('No data',pad,y);}
    y+=27;
  }
  ctx.restore();
}
function mapExportColor(value,indicator,tokens){
  const maximum=axisBounds(mapMaximum(indicator),!isYears(indicator)).max;
  const slot=Math.max(0,Math.min(tokens.ramp.length-1,value/maximum*(tokens.ramp.length-1))),i=Math.floor(slot);
  return Highcharts.color(tokens.ramp[i]).tweenTo(Highcharts.color(tokens.ramp[Math.min(i+1,tokens.ramp.length-1)]),slot-i);
}
async function exportPNG(){
  const tokens=lightTokens(),view=buildView(tokens),pin=pinnedTooltip?structuredClone(pinnedTooltip):null;
  if(!view.charts.length)return null;
  const width=1200,pad=24,gap=24,cols=Math.min(view.charts.length,2),colW=(width-pad*2-gap*(cols-1))/cols;
  decorateView(view,tokens,colW);await document.fonts.ready;
  const images=[];
  for(const [i,spec]of view.charts.entries()){
    const holder=document.createElement('div');holder.dataset.theme='light';holder.style.cssText=`position:fixed;left:-20000px;top:0;width:${colW}px;height:${spec.height}px`;document.body.append(holder);
    let chart;
    try{
      const options=Highcharts.merge(baseOptions(tokens,false),spec.options,{chart:{width:colW,height:spec.height,animation:false},custom:{exporting:true},accessibility:{enabled:false},plotOptions:{series:{animation:false}}});
      chart=Highcharts[spec.ctor](holder,options);
      if(activeCharts[i]?.selectedRange){const range=activeCharts[i].selectedRange;chart.series[0].points.forEach(p=>{if(!inMapRange(p.value,range)&&p.graphic)p.graphic.attr({fill:tokens.noData});});}
      const image=await svgToImage(chart.getSVG());images.push({image,height:spec.height,index:i});
    }finally{chart?.destroy();holder.remove();}
  }
  const measure=document.createElement('canvas').getContext('2d'),textW=width-pad*2-100,lines=[[]];let lineWidth=0;
  chartFootnotes(view).forEach(([label,value],index)=>{
    if(index&&lineWidth)lineWidth+=16;
    for(const run of [{text:`${label}: `,bold:true},...value.split(/\s+/).map(word=>({text:word+' ',bold:false}))]){
      measure.font=`${run.bold?'600':'400'} 16px ${tokens.fontText}`;const w=measure.measureText(run.text).width;
      if(lineWidth&&lineWidth+w>textW){lines.push([]);lineWidth=0;}lines.at(-1).push({...run,x:lineWidth});lineWidth+=w;
    }
  });
  const rowHeights=[];for(let i=0;i<images.length;i+=cols)rowHeights.push(Math.max(...images.slice(i,i+cols).map(x=>x.height)));
  const chartsH=rowHeights.reduce((a,b)=>a+b,0)+gap*(rowHeights.length-1),footerY=pad+chartsH+12;
  const logo=await loadLogo(),logoW=75,logoH=logo?logo.naturalHeight/logo.naturalWidth*logoW:0;
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.ceil(footerY+Math.max(lines.length*24,logoH)+pad);
  const ctx=canvas.getContext('2d');ctx.fillStyle=tokens.background;ctx.fillRect(0,0,width,canvas.height);
  let y=pad;
  rowHeights.forEach((h,row)=>{images.slice(row*cols,row*cols+cols).forEach((item,column)=>{
    const x=pad+column*(colW+gap);ctx.drawImage(item.image,x,y,colW,item.height);
    if(pin?.chartIndex===item.index){ctx.save();ctx.translate(x,y);paintPinnedCard(ctx,pin,colW,item.height,tokens);ctx.restore();}
  });y+=h+gap;});
  ctx.textBaseline='top';ctx.fillStyle=tokens.text;lines.forEach((line,i)=>line.forEach(run=>{ctx.font=`${run.bold?'600':'400'} 16px ${tokens.fontText}`;ctx.fillText(run.text,pad+run.x,footerY+i*24);}));
  if(logo)ctx.drawImage(logo,width-pad-logoW,canvas.height-pad-logoH,logoW,logoH);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('Could not create the image');
  return {blob,filename:`housing-${view.name}-${slug(stateLabel())}.png`,mimeType:'image/png'};
}

let housingResizeTimer, housingLastWidth=0;
window.addEventListener('resize',()=>{
  clearTimeout(housingResizeTimer);housingResizeTimer=setTimeout(()=>{
    const width=els.viz.clientWidth;if(dataLoaded&&width!==housingLastWidth){housingLastWidth=width;renderView({noAnimation:true,resize:true,preserveMapView:true});}
  },350);
});
