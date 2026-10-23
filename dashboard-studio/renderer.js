(function(root){
'use strict';
const C=root.StudioCore||(typeof require!=='undefined'?require('./core.js'):null);
const colours=['#41719c','#b47c50','#4c8575','#93668a','#b94f60','#737db5','#7a8c4b','#5d909f'];
function destroy(el){el._generation=(el._generation||0)+1;(el._charts||[]).forEach(c=>c.destroy());el._charts=[];}
function chartOptions(b,rows){
 if(b.type==='highcharts')return root.StudioCatalog.chartOptions(b,rows);
 const agg=C.aggregate(rows,b),categories=[...new Set(agg.map(a=>a.category))],groups=[...new Set(agg.map(a=>a.series))];
 const type=['bar','clusteredBar','stackedBar','percentBar'].includes(b.type)?(b.orientation==='vertical'?'column':'bar'):({donut:'pie',radar:'line'})[b.type]||b.type;
 const lookup=new Map(agg.map(a=>[JSON.stringify([a.category,a.series]),a.value]));
 const base={chart:{type,animation:false,backgroundColor:'transparent',style:{fontFamily:'Source Sans 3, Arial, sans-serif'}},title:{text:undefined},credits:{enabled:true},colors:colours,accessibility:{enabled:true,description:b.title+'. Data preview; see the visual instructions for the intended final visual.'},xAxis:{categories,title:{text:undefined}},yAxis:{title:{text:b.aggregate==='count'?'Records':b.y}},legend:{enabled:groups.length>1},tooltip:{useHTML:false},plotOptions:{series:{animation:false,marker:{enabled:false}}},series:groups.map(s=>({name:s||b.y||'Records',data:categories.map(c=>lookup.get(JSON.stringify([c,s]))??null)}))};
 if(['pie','donut','treemap','percentBar'].includes(b.type)&&agg.some(a=>a.value<0))throw Error('This preview needs non-negative values.');
 if(b.type==='clusteredBar'||b.type==='clusteredColumn')base.plotOptions.series.grouping=true;
 if(['stackedBar','percentBar','stacked-column'].includes(b.type)){base.plotOptions.series.stacking=b.type==='percentBar'?'percent':'normal';if(b.type==='percentBar'){base.yAxis={min:0,max:100,title:{text:'Share (%)'},labels:{format:'{value}%'}};base.tooltip={pointFormat:'{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'};}}
 if(b.type==='radar'){
   if(categories.length<3)throw Error('Radar charts need at least three categories.');
   if(agg.some(a=>a.value<0))throw Error('Use non-negative values for a radar chart.');
   base.chart.polar=true;base.pane={size:'75%'};base.xAxis.tickmarkPlacement='on';base.xAxis.lineWidth=0;
   base.yAxis.gridLineInterpolation='polygon';base.yAxis.lineWidth=0;base.yAxis.min=0;
   base.plotOptions.series.pointPlacement='on';base.plotOptions.series.marker={enabled:true,radius:3};
 }
 if(b.type==='pie'||b.type==='donut'){base.series=[{name:b.y||'Records',data:agg.map(a=>({name:a.category,y:a.value})),innerSize:b.type==='donut'?'60%':0}];base.plotOptions.pie={dataLabels:{enabled:true,format:'{point.name}'}};}
 if(b.type==='scatter'||b.type==='bubble'){
   base.xAxis={title:{text:b.x}};base.yAxis={title:{text:b.y}};base.plotOptions.series.marker={enabled:true};
   const grouped=new Map();for(const r of rows){const point=[C.num(r[b.x]),C.num(r[b.y])];if(b.type==='bubble')point.push(C.num(r[b.z]));if(point.some(v=>v===null))continue;if(b.type==='bubble'&&point[2]<0)throw Error('Bubble size must be non-negative.');const key=b.series?String(r[b.series]??'Missing'):b.y;if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(point);}
   base.series=[...grouped].map(([name,data])=>({name,data}));base.legend.enabled=base.series.length>1;
   if(b.type==='bubble')base.tooltip={headerFormat:'',pointFormat:C.esc(b.x)+': {point.x}<br>'+C.esc(b.y)+': {point.y}<br>'+C.esc(b.z)+': {point.z}'};
 }else if(b.type==='histogram'){
   const values=rows.map(r=>C.num(r[b.y])).filter(v=>v!==null);
   base.chart.type='histogram';base.xAxis={title:{text:b.y}};base.yAxis={title:{text:'Records'}};base.legend.enabled=false;
   base.series=[{id:'observations',type:'scatter',data:values,visible:false,showInLegend:false,accessibility:{enabled:false}},{type:'histogram',name:'Records',baseSeries:'observations',binsNumber:'square-root'}];
   base.tooltip={pointFormat:'{point.x:.2f}–{point.x2:.2f}: {point.y} records'};
 }else if(b.type==='boxplot'){
   const boxes=C.boxData(rows,b);base.xAxis.categories=boxes.map(v=>v.category);base.yAxis.title.text=b.y;
   base.series=[{name:b.y,type:'boxplot',data:boxes.map(v=>v.values)},{name:'Outliers',type:'scatter',data:boxes.flatMap((v,i)=>v.outliers.map(y=>[i,y])),marker:{enabled:true,radius:3}}];base.legend.enabled=false;
 }else if(b.type==='heatmap'){
   base.yAxis={categories:groups,title:{text:b.series}};base.colorAxis={minColor:'#edf3f7',maxColor:'#41719c'};
   base.series=[{name:b.y,borderWidth:1,data:agg.map(a=>[categories.indexOf(a.category),groups.indexOf(a.series),a.value])}];base.tooltip={pointFormat:'Value: {point.value}'};
 }else if(b.type==='treemap')base.series=[{type:'treemap',layoutAlgorithm:'squarified',data:agg.map((a,i)=>({name:a.category,value:a.value,color:colours[i%colours.length]}))}];
 const hasData=['histogram'].includes(b.type)?base.series[0].data.length:base.series.some(s=>s.data?.length);
 if(!hasData)throw Error('No matching numeric observations. Check the mapping and filters.');
 return base;
}
function drawBlock(el,b,rows,filters,onChange,schema){
 destroy(el);el.replaceChildren();const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;el.appendChild(e);return e;};
 if(b.type==='text'){make('div','text-block',b.text||'No text content supplied.');return;}
 if(b.type==='reset'){const bt=make('button','',b.title||'Reset filters');bt.onclick=()=>onChange(null);return;}
 if(!rows.length&&!(b.type==='highcharts'&&root.StudioCatalog.get(b.hcType)?.adapter==='none')){make('div','empty-chart','Load a dataset in Data to preview this tile.');return;}
 const issues=C.mappingIssues(b,schema);if(issues.length){make('div','empty-chart',issues.join(' '));return;}
 const data=C.filtered(rows,filters);
 if(['dropdown','buttons','slider'].includes(b.type)){
   const values=[...new Set(C.filtered(rows,filters,b.id).map(r=>r[b.field]).filter(v=>v!=null&&v!==''))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}));const current=filters[b.id]?.value??'';
   if(b.type==='dropdown'){const select=make('select');select.setAttribute('aria-label',b.title);select.innerHTML='<option value="">All</option>'+values.map(v=>'<option value="'+C.esc(v)+'">'+C.esc(v)+'</option>').join('');select.value=current;select.onchange=()=>onChange({id:b.id,field:b.field,operator:'eq',value:select.value});}
   if(b.type==='buttons'){const wrap=make('div','button-options');for(const value of ['',...values]){const bt=document.createElement('button');bt.textContent=value===''?'All':value;bt.setAttribute('aria-pressed',String(String(current)===String(value)));bt.onclick=()=>onChange({id:b.id,field:b.field,operator:'eq',value});wrap.appendChild(bt);}}
   if(b.type==='slider'){const ns=values.map(C.num).filter(v=>v!==null);if(!ns.length){make('div','empty-chart','No numeric values match these filters.');return;}const min=Math.min(...ns),max=Math.max(...ns),value=current===''?max:Math.min(max,Math.max(min,Number(current)));const label=make('div','slider-label',min+' — up to '+value),slider=make('input');slider.type='range';slider.min=min;slider.max=max;slider.step=ns.every(Number.isInteger)?1:'any';slider.value=value;slider.setAttribute('aria-label',b.title);slider.oninput=()=>label.textContent=min+' — up to '+slider.value;slider.onchange=()=>onChange({id:b.id,field:b.field,operator:'lte',value:Number(slider.value)});}
   return;
 }
 if(b.type==='metric'){const v=C.metric(data,b);make('div','metric-value',v===null?'No data':v.toLocaleString('en-IE',{maximumFractionDigits:2}));make('div','metric-note',b.note||b.aggregate+' · '+(b.aggregate==='count'?'records':b.y));return;}
 if(b.type==='table'){const wrap=make('div','chart-table'),fields=schema.map(f=>f.name);wrap.innerHTML='<table><thead><tr>'+fields.map(f=>'<th>'+C.esc(f)+'</th>').join('')+'</tr></thead><tbody>'+data.slice(0,25).map(r=>'<tr>'+fields.map(f=>'<td>'+C.esc(r[f]??'—')+'</td>').join('')+'</tr>').join('')+'</tbody></table>';return;}
 if(!root.Highcharts){make('div','empty-chart','Charts could not load. Check the connection to code.highcharts.com. You can still save the design.');return;}
 if(b.type==='highcharts'&&!root.Highcharts.seriesTypes[b.hcType]){const token=el._generation;make('div','empty-chart','Loading '+root.StudioCatalog.get(b.hcType).label+'…');root.StudioCatalog.ensure(b.hcType).then(()=>{if(el.isConnected&&el._generation===token)drawBlock(el,b,rows,filters,onChange,schema);}).catch(error=>{if(el.isConnected&&el._generation===token){el.replaceChildren();make('div','empty-chart',error.message);}});return;}
 const plot=make('div','block-chart');
 try{
   const options=chartOptions(b,data);let chart;
   if(b.type==='map'){
     const map=root.Highcharts.maps?.['custom/europe'];if(!map)throw Error('Europe map assets are unavailable.');
     const keys=new Set(root.Highcharts.geojson(map).map(g=>g.properties['hc-key']));
     const agg=C.aggregate(data,b),valid=agg.filter(a=>keys.has(a.category.toLowerCase())),unknown=agg.filter(a=>!keys.has(a.category.toLowerCase()));
     if(!valid.length)throw Error('No ISO2 country keys match the Europe map.');
     if(unknown.length){make('div','map-note','Not mapped (aggregates or unknown codes): '+unknown.map(a=>a.category).join(', '));plot.style.height='calc(100% - 42px)';}
     options.chart={...options.chart,map};options.colorAxis={minColor:'#e5edf3',maxColor:'#41719c'};options.mapNavigation={enabled:true,buttonOptions:{verticalAlign:'bottom'}};options.series=[{type:'map',name:b.y||'Records',joinBy:'hc-key',data:valid.map(a=>[a.category.toLowerCase(),a.value]),nullColor:'#edf0f2',borderColor:'#fff'}];chart=root.Highcharts.mapChart(plot,options);
   }else {const factory=options._factory||'chart';delete options._factory;chart=root.Highcharts[factory](plot,options);}
   el._charts=[chart];
 }catch(error){for(const chart of root.Highcharts.charts||[])if(chart?.renderTo===plot){try{chart.destroy();}catch{}}plot.remove();make('div','empty-chart','Preview unavailable: '+error.message);}
}
function render(container,spec,rows,options={}){
  container._dispose?.();container.replaceChildren();container.className='dashboard-runtime';
  const pages=spec.pages||[{id:'page-1',title:'Page 1'}];let activePage=pages[0].id,filters={};
  const tabs=document.createElement('div');tabs.className='runtime-tabs page-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Dashboard pages');tabs.hidden=!spec.tabbed;container.appendChild(tabs);
  function paintTabs(){tabs.replaceChildren();if(!spec.tabbed)return;for(const p of pages){const bt=document.createElement('button');bt.textContent=p.title;bt.id='runtime-tab-'+p.id;bt.setAttribute('role','tab');bt.setAttribute('aria-selected',String(activePage===p.id));bt.setAttribute('aria-controls','runtime-panel-'+p.id);bt.tabIndex=activePage===p.id?0:-1;bt.onclick=()=>{activePage=p.id;repaint();};bt.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const i=pages.findIndex(v=>v.id===activePage),n=e.key==='Home'?0:e.key==='End'?pages.length-1:(i+(e.key==='ArrowRight'?1:-1)+pages.length)%pages.length;activePage=pages[n].id;repaint();tabs.querySelector('[aria-selected=true]').focus();};tabs.appendChild(bt);}}
  const viewport=document.createElement('div');viewport.className='runtime-viewport';container.appendChild(viewport);
  const grid=document.createElement('div');grid.className='runtime-grid';viewport.appendChild(grid);
  const footer=document.createElement('div');footer.className='runtime-source';footer.textContent='Source: '+spec.source.reference+' · Layout specification '+spec.schemaVersion;container.appendChild(footer);
  function layout(){
    const width=container.clientWidth-32,mobile=width<680;
    grid.classList.toggle('mobile-layout',mobile);
    if(mobile){grid.style.width='100%';grid.style.height='auto';grid.style.transform='none';viewport.style.height='auto';}
    else{const scale=Math.min(1,width/spec.canvas.width);grid.style.width=spec.canvas.width+'px';grid.style.height=spec.canvas.height+'px';grid.style.transform=`scale(${scale})`;viewport.style.height=spec.canvas.height*scale+'px';}
  }
  function repaint(){
    paintTabs();viewport.id='runtime-panel-'+activePage;if(spec.tabbed){viewport.setAttribute('role','tabpanel');viewport.setAttribute('aria-labelledby','runtime-tab-'+activePage);}
    grid.querySelectorAll('.block-content').forEach(destroy);grid.replaceChildren();
    const heading=document.createElement('div');heading.className='runtime-heading';heading.innerHTML='<span class="runtime-badge">'+(options.demo?'Fictional demonstration data':'Dashboard preview')+'</span><h1>'+C.esc(spec.title)+'</h1><p>'+C.esc(spec.subtitle)+'</p>';grid.appendChild(heading);
    for(const b of C.pageBlocks(spec,activePage).sort((a,b)=>a.yPos-b.yPos||a.xPos-b.xPos)){
      const block=document.createElement('section');block.className='block '+(C.chartTypes.includes(b.type)?'chart-block':C.controlTypes.includes(b.type)?'control-block':'');
      Object.assign(block.style,{left:b.xPos+'px',top:b.yPos+'px',width:b.w+'px',height:b.h+'px'});
      block.innerHTML='<div class="block-header"><h3>'+C.esc(b.title)+'</h3></div><div class="block-content"></div>';grid.appendChild(block);
      drawBlock(block.lastElementChild,b,rows,C.pageFilters(spec,activePage,filters),f=>{if(!f){for(const block of C.pageBlocks(spec,activePage))delete filters[block.id];}else filters[f.id]=f;repaint();},spec.source.schema);
    }
    layout();
  }
  const observer=new ResizeObserver(layout);observer.observe(container);repaint();
  const dispose=()=>{observer.disconnect();grid.querySelectorAll('.block-content').forEach(destroy);};container._dispose=dispose;
  return {destroy:dispose,filters:()=>filters};
}
const api={drawBlock,render,destroy,chartOptions};if(typeof module!=='undefined')module.exports=api;root.StudioRenderer=api;
})(typeof window!=='undefined'?window:globalThis);

