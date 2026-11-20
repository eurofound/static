/* Eurofound embed v1. Data are explicitly synthetic. No external chart or export service. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const stage = $('charts'), tooltip = $('tooltip'), root = document.querySelector('.chart-embed');
  const state = { mode: 'multiple', indicator: 'housing_barometer' };
  const number = new Intl.NumberFormat(document.documentElement.lang,{minimumFractionDigits:1,maximumFractionDigits:1});
  const densityNumber = new Intl.NumberFormat(document.documentElement.lang,{minimumFractionDigits:2,maximumFractionDigits:2});
  let data, ready=false, themeFromHost=false, lastHeight=0, lastWidth=0, resizeFrame=0;
  let activeMark=null, pinned=false, closeTimer=0;
  const samples=new Map(), curves=new Map();
  const esc=(v)=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const key=(m,g)=>`${m}:${g}`;
  const curveStyle=['','7 3','2 3'];
  const SVG_CSS=`
    .density-chart{font-family:var(--font-source-sans-3);font-size:14px}
    .density-chart .group-0{--series:var(--chart-1)}.density-chart .group-1{--series:var(--chart-2)}.density-chart .group-2{--series:var(--chart-3)}
    .density-chart .grid-line{stroke:var(--chart-grid);stroke-width:.65}
    .density-chart .axis-line{stroke:var(--chart-axis);stroke-width:1}
    .density-chart .axis-text{fill:var(--chart-label);font-size:14px}
    .density-chart .export-title{fill:var(--heading);font-family:var(--font-roboto);font-size:17px;font-weight:600}
    .density-chart .curve-area{fill:var(--series);fill-opacity:.13;stroke:none}
    .density-chart .curve-halo{fill:none;stroke:var(--background);stroke-width:4.3}
    .density-chart .curve-line{fill:none;stroke:var(--series);stroke-width:2.3}
    .density-chart .mean-line{stroke:var(--series);stroke-width:1.5;stroke-dasharray:6 5}
    .density-chart .rug-halo{stroke:var(--background);stroke-width:4.2}
    .density-chart .rug-line{stroke:var(--series);stroke-width:1.8}
    .density-chart .rug-point{cursor:pointer}
    .density-chart .rug-focus{stroke:var(--chart-label-strong);fill:none;stroke-width:1.4;opacity:0}
    .density-chart .rug-point.is-active .rug-focus,.density-chart .rug-point:focus-visible .rug-focus{opacity:1}
    .density-chart .rug-point:focus-visible{outline:3px solid var(--focus-ring);outline-offset:2px}
  `;

  function prepare(input) {
    if(input.status!=='synthetic_chart_reconstruction'||input.records.length!==81||input.measures.length!==4)throw Error('The chart data are incomplete.');
    const ids=new Set(input.records.map(r=>`${r.country_code}:${r.income_group}`));
    if(ids.size!==81)throw Error('The chart data contain duplicate country rows.');
    input.measures.forEach(m=>input.groups.forEach(g=>{
      const rows=input.records.filter(r=>r.income_group===g).sort((a,b)=>a[m.key]-b[m.key]||a.country.localeCompare(b.country));
      if(rows.length!==27||rows.some(r=>!Number.isFinite(r[m.key])||r[m.key]<0||r[m.key]>100)||!(m.bandwidth[g]>0))throw Error('A country score or curve parameter is invalid.');
      samples.set(key(m.key,g),rows);
      const h=m.bandwidth[g], coefficient=rows.length*h*Math.sqrt(2*Math.PI);
      curves.set(key(m.key,g),Array.from({length:201},(_,i)=>{
        const x=i/2;
        return [x,rows.reduce((total,r)=>total+Math.exp(-.5*((x-r[m.key])/h)**2),0)/coefficient];
      }));
    }));
  }

  function chartSvg(m,w,h,{interactive=true,x=0,y=0,title=false}={}) {
    const left=46,right=13,top=title?49:24,bottom=32;
    const pw=Math.max(1,w-left-right),ph=Math.max(1,h-top-bottom),base=top+ph;
    const sx=v=>left+v/100*pw, sy=v=>base-v/m.yMax*ph;
    let content=`<style>${SVG_CSS}</style><title>${esc(m.label)} by income group</title><desc>Fitted density curves with 27 synthetic country scores per income group. Dashed vertical lines show group means. Use arrow keys on country ticks to inspect scores.</desc>`;
    if(title)content+=`<text class="export-title" x="${left}" y="21">${esc(m.label)}</text>`;
    content+=`<defs><clipPath id="plot-${esc(m.key)}"><rect x="${left}" y="${top-2}" width="${pw+1}" height="${ph+3}"/></clipPath></defs>`;
    for(let v=0;v<=m.yMax+.000001;v+=m.yStep){
      const yy=sy(v);content+=`<line class="grid-line" x1="${left}" x2="${w-right}" y1="${yy}" y2="${yy}"/><text class="axis-text" x="${left-7}" y="${yy+4}" text-anchor="end">${densityNumber.format(v)}</text>`;
    }
    [0,25,50,75,100].forEach(v=>content+=`<text class="axis-text" x="${sx(v)}" y="${base+21}" text-anchor="middle">${v}</text>`);
    content+=`<text class="axis-text" x="${left}" y="${top-9}">Density</text><text class="axis-text" x="${w-right}" y="${top-9}" text-anchor="end">Score 0–100</text>`;
    data.groups.forEach((g,gi)=>{
      const rows=samples.get(key(m.key,g));
      const line=curves.get(key(m.key,g)).map(([xx,yy],i)=>`${i?'L':'M'}${sx(xx).toFixed(3)},${sy(yy).toFixed(3)}`).join(' ');
      const mean=rows.reduce((s,r)=>s+r[m.key],0)/27;
      content+=`<g class="group-${gi}" clip-path="url(#plot-${esc(m.key)})"><path class="curve-area" d="${line} L${sx(100)},${base} L${sx(0)},${base} Z"/><line class="mean-line" x1="${sx(mean)}" x2="${sx(mean)}" y1="${top}" y2="${base}"/><path class="curve-halo" d="${line}"/><path class="curve-line" d="${line}" stroke-dasharray="${curveStyle[gi]}"/></g>`;
    });
    content+=`<line class="axis-line" x1="${left}" x2="${w-right}" y1="${base}" y2="${base}"/>`;
    data.groups.forEach((g,gi)=>{
      const rows=samples.get(key(m.key,g));
      content+=`<g class="group-${gi}">`;
      rows.forEach((r,i)=>{
        const xx=sx(r[m.key]), yy=base-3-gi*2, markHeight=18;
        const a=interactive?`class="rug-point" tabindex="${i===0?0:-1}" role="button" aria-label="${esc(r.country)}, ${g} income, ${number.format(r[m.key])} out of 100. Synthetic score." aria-describedby="keyboard-help" data-metric="${m.key}" data-group="${g}" data-index="${i}" data-value="${r[m.key]}" data-country="${r.country_code}"`:'';
        content+=`<g ${a}><line class="rug-halo" x1="${xx}" x2="${xx}" y1="${yy}" y2="${yy-markHeight}"/><line class="rug-line" x1="${xx}" x2="${xx}" y1="${yy}" y2="${yy-markHeight}"/>`;
        if(interactive)content+=`<rect class="rug-focus" x="${xx-4}" y="${yy-markHeight-3}" width="8" height="${markHeight+6}" rx="2"/><rect x="${xx-4}" y="${yy-markHeight-3}" width="8" height="${markHeight+6}" fill="transparent"/>`;
        content+='</g>';
      });content+='</g>';
    });
    return `<svg class="density-chart" xmlns="http://www.w3.org/2000/svg" x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="group" aria-label="${esc(m.label)} distribution and country scores">${content}</svg>`;
  }

  const visibleMeasures=()=>state.mode==='multiple'?data.measures:data.measures.filter(m=>m.key===state.indicator);
  function render() {
    if(!data)return;
    closeTooltip(true);
    stage.dataset.mode=state.mode;
    stage.setAttribute('aria-label',state.mode==='multiple'?'Four housing indicators':'Selected housing indicator');
    stage.innerHTML=visibleMeasures().map(m=>`<figure class="chart-panel" data-indicator="${m.key}"><h2>${esc(m.label)}</h2><div class="chart-surface"></div></figure>`).join('');
    [...stage.children].forEach((panel,i)=>{
      const surface=panel.querySelector('.chart-surface'), rect=surface.getBoundingClientRect();
      surface.innerHTML=chartSvg(visibleMeasures()[i],Math.max(200,rect.width),Math.max(180,rect.height));
    });
    stage.setAttribute('aria-busy','false');
    postHeight();
  }

  function closeTooltip(force=false) {
    if(pinned&&!force)return;
    clearTimeout(closeTimer);
    tooltip.hidden=true;
    if(activeMark)activeMark.classList.remove('is-active');
    activeMark=null;pinned=false;
  }
  function showTooltip(mark,pin=false) {
    if(!mark||(!pin&&pinned&&activeMark!==mark))return;
    clearTimeout(closeTimer);
    if(activeMark)activeMark.classList.remove('is-active');
    activeMark=mark;mark.classList.add('is-active');pinned=pin;
    const metric=data.measures.find(m=>m.key===mark.dataset.metric),group=mark.dataset.group;
    const rows=samples.get(key(metric.key,group)),selected=rows[Number(mark.dataset.index)];
    const svg=mark.closest('svg'),span=Math.max(1,svg.getBoundingClientRect().width-59);
    // Closely overlapping marks are listed together, without moving scores on the x-axis.
    const nearby=rows.filter(r=>Math.abs(r[metric.key]-selected[metric.key])*span/100<=3);
    tooltip.innerHTML=`<div class="tooltip-heading">${esc(metric.label)} · ${esc(group)} income</div><table class="tooltip-table"><caption class="sr-only">Synthetic country scores out of 100</caption><tbody>${nearby.map(r=>`<tr class="${r===selected?'is-target':''}"><th scope="row">${esc(r.country)}</th><td>${number.format(r[metric.key])}</td></tr>`).join('')}</tbody></table><div class="tooltip-caption">Synthetic score · 0–100${nearby.length>1?'<br>Nearby or overlapping country ticks':''}</div>`;
    tooltip.hidden=false;
    const anchor=mark.getBoundingClientRect(),outer=root.getBoundingClientRect(),box=tooltip.getBoundingClientRect();
    tooltip.style.left=`${Math.max(4,Math.min(anchor.left-outer.left-12,outer.width-box.width-4))}px`;
    tooltip.style.top=`${Math.max(2,anchor.top-outer.top-box.height-12)}px`;
  }
  stage.addEventListener('pointerover',event=>{const mark=event.target.closest('.rug-point');if(mark)showTooltip(mark);});
  stage.addEventListener('pointerout',event=>{if(event.target.closest('.rug-point'))closeTimer=setTimeout(()=>closeTooltip(),180);});
  tooltip.addEventListener('pointerenter',()=>clearTimeout(closeTimer));
  tooltip.addEventListener('pointerleave',()=>closeTooltip());
  stage.addEventListener('focusin',event=>{if(event.target.closest('.rug-point'))showTooltip(event.target.closest('.rug-point'));});
  stage.addEventListener('focusout',()=>{closeTimer=setTimeout(()=>{if(!document.activeElement?.closest('.rug-point'))closeTooltip();},50);});
  stage.addEventListener('click',event=>{const mark=event.target.closest('.rug-point');if(mark)showTooltip(mark,true);});
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.rug-point')&&!tooltip.contains(event.target))closeTooltip(true);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeTooltip(true);});
  stage.addEventListener('keydown',event=>{
    const mark=event.target.closest('.rug-point');if(!mark)return;
    if(event.key==='Enter'||event.key===' '){event.preventDefault();showTooltip(mark,true);return;}
    const rows=samples.get(key(mark.dataset.metric,mark.dataset.group));let next=Number(mark.dataset.index);
    if(event.key==='ArrowRight')next=Math.min(rows.length-1,next+1);
    else if(event.key==='ArrowLeft')next=Math.max(0,next-1);
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=rows.length-1;
    else return;
    event.preventDefault();pinned=false;
    stage.querySelectorAll(`[data-metric="${mark.dataset.metric}"][data-group="${mark.dataset.group}"]`).forEach(point=>point.setAttribute('tabindex','-1'));
    const target=stage.querySelector(`[data-metric="${mark.dataset.metric}"][data-group="${mark.dataset.group}"][data-index="${next}"]`);
    target.setAttribute('tabindex','0');target.focus({preventScroll:true});
  });

  function changeMode(mode) {
    if(!ready||state.mode===mode)return;
    state.mode=mode;
    $('single-view').setAttribute('aria-pressed',String(mode==='single'));
    $('multiple-view').setAttribute('aria-pressed',String(mode==='multiple'));
    $('indicator-control').hidden=mode!=='single';
    render();
    $('status').textContent=mode==='multiple'?'Showing all four indicators.':`Showing ${data.measures.find(m=>m.key===state.indicator).label}.`;
  }
  $('single-view').addEventListener('click',()=>changeMode('single'));
  $('multiple-view').addEventListener('click',()=>changeMode('multiple'));
  $('indicator').addEventListener('change',event=>{state.indicator=event.target.value;render();$('status').textContent=`Showing ${data.measures.find(m=>m.key===state.indicator).label}.`;});

  function readTokens(el=document.documentElement) {
    const css=getComputedStyle(el),v=name=>css.getPropertyValue(name).trim();
    return Object.fromEntries(['background','surface','foreground','heading','chart-axis','chart-grid','chart-label','chart-label-strong','font-source-sans-3','font-roboto','chart-1','chart-2','chart-3'].map(name=>[name,v(`--${name}`)]));
  }
  const quote=value=>/[",\r\n]/.test(String(value))?`"${String(value).replace(/"/g,'""')}"`:String(value);
  async function buildExport(format) {
    const measures=visibleMeasures();
    if(format==='csv'){
      const lines=[['Title',data.title],['Indicators',measures.map(m=>m.label).join('; ')],['Income groups',data.groups.join('; ')],['Source',data.source],['Notes',data.notes],['Exported at',new Date().toISOString()],[],['country_code','country','income_group',...measures.map(m=>`${m.key}_score_0_100`),'data_status'],...data.records.map(r=>[r.country_code,r.country,r.income_group,...measures.map(m=>r[m.key]),r.data_status])];
      return {blob:new Blob(['\ufeff'+lines.map(row=>row.map(quote).join(',')).join('\r\n')+'\r\n'],{type:'text/csv;charset=utf-8'}),filename:'housing-income-synthetic-scores.csv',mimeType:'text/csv'};
    }
    if(format!=='png')throw Error('Unsupported export format.');
    const probe=document.createElement('div');probe.dataset.theme='light';probe.hidden=true;document.body.append(probe);
    const light=readTokens(probe);probe.remove();
    const width=1200,height=measures.length===4?1000:820;
    const cols=measures.length===4?2:1,cellWidth=(width-64)/cols,cellHeight=measures.length===4?395:610;
    const tokenStyle=Object.entries(light).map(([name,value])=>`--${name}:${value}`).join(';');
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="${esc(tokenStyle)};font-family:${esc(light['font-source-sans-3'])}"><rect width="100%" height="100%" fill="${esc(light.background)}"/><text x="32" y="38" fill="${esc(light.heading)}" font-family="${esc(light['font-roboto'])}" font-size="25" font-weight="600">${esc(data.title)}</text>`;
    data.groups.forEach((g,i)=>svg+=`<line x1="${32+i*160}" x2="${62+i*160}" y1="68" y2="68" stroke="${esc(light[`chart-${i+1}`])}" stroke-width="3" stroke-dasharray="${curveStyle[i]}"/><text x="${70+i*160}" y="74" fill="${esc(light.foreground)}" font-size="18">${g} income</text>`);
    measures.forEach((m,i)=>svg+=chartSvg(m,cellWidth-12,cellHeight,{interactive:false,x:32+(i%cols)*cellWidth,y:92+Math.floor(i/cols)*cellHeight,title:true}));
    const notes=['Ticks: 27 country scores per income group. Dashed vertical lines: unweighted group means.','Source: synthetic reconstruction of the supplied Figure 3, Distribution of scores by income.','All country values and assignments are synthetic. They are not estimates of national outcomes.'];
    notes.forEach((note,i)=>svg+=`<text x="32" y="${height-68+i*22}" fill="${esc(light.foreground)}" font-size="16">${esc(note)}</text>`);
    svg+='</svg>';
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
    try {
      const image=new Image();image.src=url;
      await image.decode();
      const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
      canvas.getContext('2d').drawImage(image,0,0);
      const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('Could not create the image.')),'image/png'));
      return {blob,filename:'housing-income-distribution.png',mimeType:'image/png'};
    }finally{URL.revokeObjectURL(url);}
  }

  function toHost(message){if(window.parent!==window)window.parent.postMessage({source:'ef-embed',...message},'*');}
  function announce(){toHost({type:'ready',exports:['png','csv'],languages:EF_LANGUAGES});}
  function postHeight(force=false){const height=Math.ceil(document.body.getBoundingClientRect().height);if(force||height!==lastHeight)toHost({type:'resize',height:(lastHeight=height)});}
  function setTheme(theme){if(!['light','dark'].includes(theme))return;document.documentElement.dataset.theme=theme;/* Inline SVG uses live CSS tokens; selections and focus are retained. */}
  new ResizeObserver(()=>requestAnimationFrame(()=>postHeight())).observe(document.body);
  new ResizeObserver(()=>{
    const width=stage.getBoundingClientRect().width;
    if(Math.abs(width-lastWidth)>.5){lastWidth=width;cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{if(ready)render();});}
  }).observe(stage);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',event=>{
    const urlTheme=new URLSearchParams(location.search).get('theme');
    if(!['light','dark'].includes(urlTheme)&&!themeFromHost)setTheme(event.matches?'dark':'light');
  });
  window.addEventListener('message',async event=>{
    const message=event.data;
    if(event.source!==window.parent||!message||typeof message!=='object')return;
    if(message.type==='set-theme'&&['light','dark'].includes(message.theme)){themeFromHost=true;setTheme(message.theme);}
    else if(message.type==='hello'){if(ready)announce();postHeight(true);}
    else if(message.type==='export'){
      const reply=result=>event.source.postMessage({source:'ef-embed',id:message.id,format:message.format,...result},event.origin==='null'?'*':event.origin);
      try{if(!ready)throw Error('Data is still loading.');const file=await buildExport(message.format);reply({type:'export-result',...file});}
      catch(error){reply({type:'export-error',message:error.message});}
    }
  });

  fetch('./data.json').then(response=>{if(!response.ok)throw Error('The chart data could not be loaded.');return response.json();}).then(async input=>{
    prepare(input);data=input;
    $('indicator').innerHTML=data.measures.map(m=>`<option value="${m.key}">${esc(m.label)}</option>`).join('');
    await document.fonts.ready;
    render();ready=true;
    ['single-view','multiple-view','indicator'].forEach(id=>$(id).disabled=false);
    $('status').className='sr-only';$('status').textContent='Four charts loaded. Each income group contains 27 synthetic country scores.';
    announce();postHeight(true);
  }).catch(error=>{
    $('status').className='ef-notice ef-notice--danger loading-message';$('status').textContent=`${error.message} Please reload the page.`;
    stage.setAttribute('aria-busy','false');postHeight(true);
  });
})();
