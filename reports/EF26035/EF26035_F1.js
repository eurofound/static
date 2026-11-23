/* Eurofound embed v1. Supplied Eurostat observations; no chart or export service. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const stage = $('charts'), tooltip = $('tooltip'), root = document.querySelector('.chart-embed');
  const state = { mode:document.body.dataset.single?'combined':'split', hidden:new Set() };
  const number = new Intl.NumberFormat('en',{minimumFractionDigits:1,maximumFractionDigits:1});
  const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  let data, ready=false, themeFromHost=false, lastHeight=0, lastWidth=0, resizeFrame=0, animationFrame=0;

  const rows = new Map();
  const SVG_CSS = `
    .time-chart{font-family:var(--font-source-sans-3);font-size:14px}
    .time-chart .series-0{--series:var(--chart-1)}.time-chart .series-1{--series:var(--chart-2)}
    .time-chart .grid-line{stroke:var(--chart-grid);stroke-width:.5;opacity:.75}
    .time-chart .axis-line{stroke:var(--chart-axis);stroke-width:1}
    .time-chart .axis-text{fill:var(--chart-label);font-size:14px}
    .time-chart .axis-x-text{font-size:10.92px}
    .time-chart.combined .axis-x-text{font-size:14.196px}
    .time-chart .area{stroke:none}
    .time-chart .data-line{fill:none;stroke:var(--series);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
    .time-chart .data-point{fill:var(--series);stroke:none}
    .time-chart .point-label{fill:var(--series);font-size:13px;font-weight:500}
    .time-chart .year-target{fill:transparent;stroke:none;cursor:pointer}
    .time-chart .year-target:focus,.time-chart .year-target:focus-visible{outline:none}
    .time-chart .crosshair{stroke:var(--chart-label);stroke-width:.8;opacity:.45;pointer-events:none}
  `;
  const visible = () => data.measures.filter(m=>!state.hidden.has(m.key));
  const legendLabel = m => m.key==='unable_to_keep_home_warm'?'Inability to keep house adequately warm':m.label;
  function validate(input) {
    if(![1,2].includes(input.measures?.length)||input.records?.length!==input.measures.length*12||!['Percentage','Index (2025 = 100)'].includes(input.unit))throw Error('The chart data are incomplete.');
    if(new Set(input.records.map(r=>r.indicator+':'+r.year)).size!==input.measures.length*12)throw Error('The chart data contain duplicate observations.');
    input.measures.forEach(m=>{
      const values=input.records.filter(r=>r.indicator===m.key).sort((a,b)=>a.year-b.year);
      if(values.length!==12||values.some((r,i)=>r.year!==2014+i||!Number.isFinite(r.value)||r.value<0||(input.unit==='Percentage'&&r.value>100)||!['','e'].includes(r.flag)))throw Error('An observation or year is invalid.');
      rows.set(m.key,values);
    });
  }
  const scaleMin = () => data.axis?.min ?? 0;
  const suffix = () => data.valueSuffix ?? '%';
  const valueText = value => new Intl.NumberFormat('en',{minimumFractionDigits:1,maximumFractionDigits:data.precision??1}).format(value)+suffix();
  function scaleMax() {
    if(data.axis) return data.axis.max;
    const selected=visible();
    return selected.length?Math.max(2,Math.ceil(Math.max(...selected.flatMap(m=>rows.get(m.key).map(r=>r.value)))/2)*2):12;
  }
  function layout(w,h) {
    const stacked=w<560, combined=state.mode==='combined', gap=24;
    return data.measures.map((m,i)=>{
      const width=combined||stacked?w:(w-gap)/2, height=combined||!stacked?h:(h-gap)/2;
      const x=combined||stacked?0:i*(width+gap),y=combined||!stacked?0:i*(height+gap);
      const left=43,right=45,top=30,bottom=33;
      return {x,y,w:width,h:height,left:x+left,right:x+width-right,top:y+top,bottom:y+height-bottom,
        sx:year=>x+left+(year-2014)/11*(width-left-right),
        sy:value=>y+height-bottom-(value-scaleMin())/(scaleMax()-scaleMin())*(height-top-bottom),
        showY:combined?i===0:stacked||i===0,
        showAxes:!combined||i===0,stacked};
    });
  }
  function chartSvg(w,h,{interactive=true,exportId='screen'}={}) {
    const places=layout(w,h),max=scaleMax(),combined=state.mode==='combined';
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" class="time-chart ${combined?'combined':''}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="group" aria-label="${esc(data.title)}"><style>${SVG_CSS}</style><desc>${esc(data.description)}</desc><defs>`;
    data.measures.forEach((m,i)=>svg+=`<linearGradient id="${exportId}-gradient-${i}" x1="0" x2="0" y1="0" y2="1" class="series-${i}"><stop offset="0%" stop-color="var(--series)" stop-opacity=".2"/><stop offset="100%" stop-color="var(--series)" stop-opacity=".01"/></linearGradient>`);
    svg+='</defs>';
    places.forEach((p,i)=>{
      svg+=`<g data-morph="axes-${i}" opacity="${p.showAxes?1:0}" aria-hidden="true">`;
      for(let v=scaleMin();v<=(data.axis?.max??12);v+=(data.axis?.step??2)){
        const yy=p.sy(v),on=v<=max;
        svg+=`<g data-morph="y-tick-${i}-${v}" opacity="${on?1:0}"><line class="grid-line" data-morph="y-grid-${i}-${v}" x1="${p.left}" x2="${p.right}" y1="${yy}" y2="${yy}"/><text class="axis-text" data-morph="y-label-${i}-${v}" x="${p.left-9}" y="${yy+4}" text-anchor="end" opacity="${p.showY?1:0}">${v}</text></g>`;
      }
      for(let year=2014;year<=2025;year++){
        const shown=year%2===0,xx=p.sx(year);
        svg+=`<g data-morph="x-tick-${i}-${year}" opacity="${shown?1:0}"><line class="grid-line" data-morph="x-grid-${i}-${year}" x1="${xx}" x2="${xx}" y1="${p.top}" y2="${p.bottom}"/><text class="axis-text axis-x-text" data-morph="x-label-${i}-${year}" x="${xx}" y="${p.bottom+24}" text-anchor="middle">${year}</text></g>`;
      }
      svg+=`<line class="axis-line" data-morph="base-${i}" x1="${p.left}" x2="${p.right}" y1="${p.bottom}" y2="${p.bottom}"/><text class="axis-text" data-morph="unit-${i}" x="${p.left}" y="${p.top-14}" opacity="${p.showY?1:0}">${esc(data.unitLabel)}</text></g>`;
    });
    if(data.axis?.reference!==undefined){const p=places[0],y=p.sy(data.axis.reference);svg+=`<line class="index-reference" x1="${p.left}" x2="${p.right}" y1="${y}" y2="${y}" stroke="var(--chart-label)" stroke-width="1" stroke-dasharray="4 4" opacity=".55" aria-hidden="true"/>`;}
    data.measures.forEach((m,i)=>{
      const p=places[i],values=rows.get(m.key),shown=!state.hidden.has(m.key);
      const line=values.map((r,n)=>`${n?'L':'M'}${p.sx(r.year)},${p.sy(r.value)}`).join(' ');
      svg+=`<g class="series-${i}" data-morph="series-${i}" data-series="${m.key}" opacity="${shown?1:0}" aria-hidden="${!shown}"><path class="area" data-morph="area-${i}" fill="url(#${exportId}-gradient-${i})" opacity="1" d="${line} L${p.right},${p.bottom} L${p.left},${p.bottom} Z"/><path class="data-line" data-morph="line-${i}" d="${line}"/>`;
      values.forEach(r=>svg+=`<circle class="data-point" data-morph="point-${i}-${r.year}" cx="${p.sx(r.year)}" cy="${p.sy(r.value)}" r="3"/>`);
      values.filter(r=>r.year===2025||(m.highlightYears??[i===0?2020:2023]).includes(r.year)).forEach(r=>{
        const last=r.year===2025,first=r.year===2014,x=p.sx(r.year)+(last||first?8:0),y=p.sy(r.value)+(last?4:i===0&&!combined?21:-12);
        svg+=`<text class="point-label" data-morph="value-${i}-${r.year}" x="${x}" y="${y}" text-anchor="${last||first?'start':'middle'}">${number.format(r.value)}${suffix()}</text>`;
      });
      svg+='</g>';
    });
    if(interactive){
      places.forEach((p,i)=>{
        if(combined&&i>0)return;
        const measures=combined?visible():[data.measures[i]].filter(m=>!state.hidden.has(m.key));
        if(!measures.length)return;
        rows.get(data.measures[i].key).forEach((r,n)=>{
          const half=(p.right-p.left)/22,left=n===0?p.left:p.sx(r.year)-half,right=n===11?p.right:p.sx(r.year)+half;
          const label=[r.year,...visible().map(m=>{const row=rows.get(m.key)[n];return `${legendLabel(m)}, ${data.unit==='Percentage'?number.format(row.value):valueText(row.value)} ${data.unit==='Percentage'?'percent':'index points'}${row.flag==='e'?', estimated':''}`;})].join('. ');
          svg+=`<rect class="year-target" role="button" tabindex="${n===0?0:-1}" aria-label="${esc(label)}" aria-describedby="keyboard-help" data-panel="${i}" data-index="${n}" x="${left}" y="${p.top}" width="${right-left}" height="${p.bottom-p.top}"/>`;
        });
      });
      svg+='<line class="crosshair" x1="0" x2="0" y1="0" y2="0" visibility="hidden"/>';
    }
    return svg+'</svg>';
  }

  // Stable numeric SVG geometry allows a 300ms morph of lines, fills, dots and axes.
  const attrs=['d','x','y','x1','x2','y1','y2','cx','cy','opacity'];
  function capture() {
    return new Map([...stage.querySelectorAll('[data-morph]')].map(el=>[el.dataset.morph,Object.fromEntries(attrs.filter(a=>el.hasAttribute(a)).map(a=>[a,el.getAttribute(a)]))]));
  }
  function tween(oldValue,newValue) {
    const pattern=/-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
    const from=oldValue.match(pattern)?.map(Number),to=newValue.match(pattern)?.map(Number);
    if(!from||!to||from.length!==to.length)return null;
    return t=>{let i=0;return newValue.replace(pattern,()=>String(from[i]+(to[i]-from[i++])*t));};
  }
  function render(animate=false) {
    cancelAnimationFrame(animationFrame);
    const previous=animate?capture():null;
    hideTooltip();
    const w=stage.clientWidth,h=stage.clientHeight;
    stage.dataset.mode=state.mode;stage.dataset.animation='idle';
    document.querySelector('.legend').dataset.mode=state.mode;
    document.querySelectorAll('.legend-text').forEach((el,i)=>{el.textContent=legendLabel(data.measures[i]);});
    stage.innerHTML=chartSvg(w,h);
    stage.setAttribute('aria-busy','false');
    if(!visible().length)stage.insertAdjacentHTML('beforeend','<p class="chart-empty">Select an indicator above to display the chart.</p>');
    if(previous?.size){
      const changes=[];
      stage.querySelectorAll('[data-morph]').forEach(el=>{
        const before=previous.get(el.dataset.morph);if(!before)return;
        for(const a of attrs){
          const target=el.getAttribute(a);if(target===null||before[a]===undefined||target===before[a])continue;
          const at=tween(before[a],target);if(!at)continue;
          changes.push({el,a,target,at});el.setAttribute(a,before[a]);
        }
      });
      if(changes.length){
        stage.dataset.animation='running';const start=performance.now();
        const frame=now=>{
          const t=Math.min(1,(now-start)/300),ease=t*t*(3-2*t);
          changes.forEach(c=>c.el.setAttribute(c.a,t===1?c.target:c.at(ease)));
          if(t<1)animationFrame=requestAnimationFrame(frame);else stage.dataset.animation='idle';
        };
        animationFrame=requestAnimationFrame(frame);
      }
    }
    postHeight();
  }
  function updateStatus() {
    $('status').textContent=`${data.measures.length===1?'Single chart':state.mode==='combined'?'Combined chart':'Side-by-side charts'}. ${visible().length} of ${data.measures.length} indicators displayed.`;
  }
  function changeMode(mode) {
    if(!ready||state.mode===mode)return;
    state.mode=mode;
    $('combined-view').setAttribute('aria-pressed',String(mode==='combined'));
    $('split-view').setAttribute('aria-pressed',String(mode==='split'));
    render(true);updateStatus();
  }
  $('combined-view')?.addEventListener('click',()=>changeMode('combined'));
  $('split-view')?.addEventListener('click',()=>changeMode('split'));
  document.querySelectorAll('.legend-item').forEach(button=>button.addEventListener('click',()=>{
    if(!ready)return;const key=button.dataset.indicator;
    if(state.hidden.has(key))state.hidden.delete(key);else state.hidden.add(key);
    button.setAttribute('aria-pressed',String(!state.hidden.has(key)));render(true);updateStatus();
  }));

  function hideTooltip(){tooltipUI.close();}
  function showTooltip(mark) {
    const index=Number(mark.dataset.index),panel=Number(mark.dataset.panel),year=2014+index;
    const selected=visible(),barMaximum=30;
    tooltip.innerHTML=`<div class="tooltip-heading">${year}</div><div class="tooltip-geography">European Union (EU27)</div><div class="tooltip-items" data-scale-max="${barMaximum}">${selected.map(m=>{
      const r=rows.get(m.key)[index],i=data.measures.indexOf(m);
      const width=Math.min(100,Math.max(0,r.value/barMaximum*100));
      return `<div class="tooltip-item series-${i}" data-indicator="${m.key}" data-value="${r.value}" style="--bar-size:${width.toFixed(4)}%"><div class="tooltip-item-name">${esc(legendLabel(m))}</div><div class="tooltip-bar"><div class="tooltip-track"><span class="tooltip-fill" aria-hidden="true"></span><span class="tooltip-item-value">${number.format(r.value)}%</span></div></div>${r.flag==='e'?'<span class="estimate">Estimated</span>':''}</div>`;
    }).join('')}</div>`;
    if(data.unit!=='Percentage'){const r=rows.get(selected[0].key)[index];tooltip.innerHTML=`<div class="tooltip-heading">${year}</div><div class="tooltip-geography">European Union (EU27)</div><div class="tooltip-item">${esc(selected[0].label)}<span class="tooltip-index-value">${valueText(r.value)}</span><div class="tooltip-index-unit">${esc(data.unit)}</div></div>`;}
    tooltip.hidden=false;
    const p=layout(stage.clientWidth,stage.clientHeight)[panel],base=root.getBoundingClientRect(),rect=stage.getBoundingClientRect();
    const x=rect.left-base.left+p.sx(year),y=rect.top-base.top+Math.min(...selected.map(m=>p.sy(rows.get(m.key)[index].value)));
    const tw=tooltip.offsetWidth,th=tooltip.offsetHeight;
    tooltip.style.left=Math.max(4,Math.min(root.clientWidth-tw-4,x+12))+'px';
    tooltip.style.top=Math.max(0,y-th-14)+'px';
    const cross=stage.querySelector('.crosshair');
    for(const [a,v] of Object.entries({x1:p.sx(year),x2:p.sx(year),y1:p.top,y2:p.bottom,visibility:'visible'}))cross.setAttribute(a,v);
  }
  const tooltipUI=EFReportTooltip({stage,tooltip,target:'.year-target',draw:showTooltip,
    canShow:()=>ready&&stage.dataset.animation!=='running',
    clear:()=>stage.querySelector('.crosshair')?.setAttribute('visibility','hidden')});
  stage.addEventListener('keydown',event=>{
    const mark=event.target.closest('.year-target');if(!mark)return;
    let next=Number(mark.dataset.index);
    if(event.key==='ArrowRight')next=Math.min(11,next+1);
    else if(event.key==='ArrowLeft')next=Math.max(0,next-1);
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=11;else return;
    event.preventDefault();tooltipUI.release();
    stage.querySelectorAll(`.year-target[data-panel="${mark.dataset.panel}"]`).forEach(el=>el.setAttribute('tabindex','-1'));
    const target=stage.querySelector(`.year-target[data-panel="${mark.dataset.panel}"][data-index="${next}"]`);
    target.setAttribute('tabindex','0');target.focus({preventScroll:true});tooltipUI.preview(target);
  });

  const quote=v=>/[",\r\n]/.test(String(v))?`"${String(v).replace(/"/g,'""')}"`:String(v);
  function readTokens(el=document.documentElement) {
    const css=getComputedStyle(el);
    return Object.fromEntries(['background','surface','foreground','heading','chart-axis','chart-grid','chart-label','font-source-sans-3','font-roboto','chart-1','chart-2'].map(k=>[k,css.getPropertyValue('--'+k).trim()]));
  }
  async function buildExport(format) {
    const selected=visible();
    if(format==='csv'){
      const lines=[['Title',data.title],['Geography',data.geography],['Unit',data.unit],['Indicators',selected.map(m=>m.label).join('; ')||'None selected'],['Source',data.source],['Notes',data.notes],['Exported at',new Date().toISOString()],[],['indicator','indicator_label','year','value','unit','flag','flag_label','source_dataset','source_cell']];
      selected.forEach(m=>rows.get(m.key).forEach(r=>lines.push([m.key,m.label,r.year,r.value,data.unit,r.flag,r.flag==='e'?'Estimated':'',m.dataset,r.source_cell])));
      return {blob:new Blob(['\ufeff'+lines.map(r=>r.map(quote).join(',')).join('\r\n')+'\r\n'],{type:'text/csv;charset=utf-8'}),filename:data.id+'.csv',mimeType:'text/csv'};
    }
    if(format!=='png')throw Error('Unsupported export format.');
    const probe=document.createElement('div');probe.dataset.theme='light';probe.hidden=true;document.body.append(probe);
    const light=readTokens(probe);probe.remove();
    const width=1200,height=700,style=Object.entries(light).map(([k,v])=>`--${k}:${v}`).join(';');
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="${esc(style)};font-family:${esc(light['font-source-sans-3'])}"><rect width="100%" height="100%" fill="${esc(light.background)}"/><text x="32" y="40" fill="${esc(light.heading)}" font-family="${esc(light['font-roboto'])}" font-size="23" font-weight="600">${esc(data.title)}</text>`;
    selected.forEach((m,i)=>{const color=light[`chart-${data.measures.indexOf(m)+1}`];svg+=`<line x1="32" x2="60" y1="${73+i*26}" y2="${73+i*26}" stroke="${esc(color)}" stroke-width="3"/><text x="70" y="${79+i*26}" fill="${esc(light.foreground)}" font-size="18">${esc(legendLabel(m))}</text>`;});
    if(!selected.length)svg+=`<text x="32" y="79" fill="${esc(light.foreground)}" font-size="18">No indicators selected</text>`;
    svg+=`<g transform="translate(32 126)">${chartSvg(1136,466,{interactive:false,exportId:'export'})}</g>`;
    svg+=`<text x="32" y="638" fill="${esc(light.foreground)}" font-size="16">${esc(data.exportSource)}</text><text x="32" y="664" fill="${esc(light.foreground)}" font-size="16">${esc(data.exportNote)}</text></svg>`;
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
    try{
      const image=new Image();image.src=url;await image.decode();
      const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;canvas.getContext('2d').drawImage(image,0,0);
      const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('Could not create the image.')),'image/png'));
      return {blob,filename:data.id+'.png',mimeType:'image/png'};
    }finally{URL.revokeObjectURL(url);}
  }
  function toHost(message){if(window.parent!==window)window.parent.postMessage({source:'ef-embed',...message},'*');}
  function announce(){toHost({type:'ready',exports:['png','csv'],languages:EF_LANGUAGES});}
  function postHeight(force=false){const height=Math.ceil(document.body.getBoundingClientRect().height);if(force||height!==lastHeight)toHost({type:'resize',height:(lastHeight=height)});}
  function setTheme(theme){if(['light','dark'].includes(theme))document.documentElement.dataset.theme=theme;}
  new ResizeObserver(()=>requestAnimationFrame(()=>postHeight())).observe(document.body);
  new ResizeObserver(()=>{
    const width=stage.clientWidth;if(Math.abs(width-lastWidth)>.5){lastWidth=width;cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{if(ready)render();});}
  }).observe(stage);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',event=>{
    const t=new URLSearchParams(location.search).get('theme');if(!['light','dark'].includes(t)&&!themeFromHost)setTheme(event.matches?'dark':'light');
  });
  window.addEventListener('message',async event=>{
    const message=event.data;if(event.source!==window.parent||!message||typeof message!=='object')return;
    if(message.type==='set-theme'&&['light','dark'].includes(message.theme)){themeFromHost=true;setTheme(message.theme);}
    else if(message.type==='hello'){if(ready)announce();postHeight(true);}
    else if(message.type==='export'){
      const reply=result=>event.source.postMessage({source:'ef-embed',id:message.id,format:message.format,...result},event.origin==='null'?'*':event.origin);
      try{if(!ready)throw Error('Data is still loading.');reply({type:'export-result',...await buildExport(message.format)});}
      catch(error){reply({type:'export-error',message:error.message});}
    }
  });
  fetch(document.body.dataset.source).then(r=>{if(!r.ok)throw Error('The chart data could not be loaded.');return r.json();}).then(async input=>{
    validate(input);data=input;await document.fonts.ready;render();ready=true;
    document.querySelectorAll('button').forEach(b=>b.disabled=false);
    $('status').className='sr-only';updateStatus();announce();postHeight(true);
  }).catch(error=>{
    $('status').className='ef-notice ef-notice--danger loading-message';$('status').textContent=`${error.message} Please reload the page.`;stage.setAttribute('aria-busy','false');postHeight(true);
  });
})();
