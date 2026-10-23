(function(root){'use strict';
const charts=[
 ['radar','Radar','Compare at least three categories on a shared scale.'],
 ['bar','Bar','Compare categories with horizontal bars or vertical columns.'],
 ['line','Line','Show change across ordered periods.'],['area','Area','Show magnitude over ordered periods.'],
 ['pie','Pie','Show a few parts of a whole.'],['scatter','Scatter','Compare two numeric measures for each record.'],
 ['heatmap','Heatmap','Compare values across two categorical dimensions.'],['treemap','Treemap','Compare positive values using rectangle area.'],
 ['map','Europe map','Compare countries using ISO2 country codes.'],
 ['clusteredBar','Clustered bars','Compare groups side by side within each category.'],
 ['stackedBar','Stacked bars','Compare totals and their component groups.'],
 ['donut','Donut','Show parts of a whole around a central opening.'],
 ['bubble','Bubble','Compare X, Y and a third measure as bubble size.'],
 ['histogram','Histogram','Show the distribution of raw numeric observations.'],
 ['boxplot','Box plot','Compare distributions of raw observations by category.']
];
const controls=[['metric','Key figure'],['table','Data table'],['text','Text'],['dropdown','Dropdown'],['slider','Slider'],['buttons','Buttons'],['reset','Reset filters']];
const paletteTypes=charts.map(c=>c[0]),chartTypes=[...paletteTypes,'percentBar'],controlTypes=['dropdown','slider','buttons','reset'],types=[...chartTypes,...controls.map(c=>c[0])];
const names={...Object.fromEntries([...charts,...controls].map(c=>[c[0],c[1]])),percentBar:'100% stacked bars (saved design)'},descriptions=Object.fromEntries(charts.map(c=>[c[0],c[2]]));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=v=>v==null||typeof v==='boolean'||String(v).trim()===''?null:Number.isFinite(Number(v))?Number(v):null;
function parseCSV(text){
 text=text.replace(/^\uFEFF/,'');const rows=[];let row=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else if(quoted||cell==='')quoted=!quoted;else throw Error('Unexpected quote in CSV.');}
 else if(c===','&&!quoted){row.push(cell);cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v!==''))rows.push(row);row=[];cell='';}else cell+=c;}
 if(quoted)throw Error('CSV has an unclosed quoted value.');if(cell||row.length){row.push(cell);rows.push(row);}if(rows.length<2)throw Error('Include a header row and at least one data row.');
 const headers=rows.shift().map(v=>v.trim());if(headers.some(v=>!v)||new Set(headers).size!==headers.length)throw Error('Column names must be non-empty and unique.');
 return rows.map((r,i)=>{if(r.length!==headers.length)throw Error('CSV row '+(i+2)+' has '+r.length+' values; expected '+headers.length+'.');return Object.fromEntries(headers.map((h,j)=>[h,r[j]===''?null:r[j]]));});
}
function inspectRows(rows){
 if(!Array.isArray(rows)||!rows.length)throw Error('Data must be a non-empty array of records.');if(rows.length>50000)throw Error('Use 50,000 rows or fewer.');const fields=new Set();
 for(const r of rows){if(!r||typeof r!=='object'||Array.isArray(r))throw Error('Use flat data records.');for(const [k,v] of Object.entries(r)){if(!k.trim()||k.length>200)throw Error('Field names must contain 1–200 characters.');if(v!==null&&(!['string','number','boolean'].includes(typeof v)||(typeof v==='number'&&!Number.isFinite(v))))throw Error('Use text, numeric, boolean or null values. Nested data is not supported.');fields.add(k);}}
 if(!fields.size||fields.size>150)throw Error('Use between 1 and 150 fields.');
 return [...fields].map(name=>{const present=rows.map(r=>r[name]).filter(v=>v!=null&&v!=='');return{name,type:present.length&&present.every(v=>num(v)!==null)?'number':'string',missing:rows.length-present.length};});
}
function filtered(rows,filters={},ignore){return rows.filter(r=>Object.entries(filters).every(([id,f])=>id===ignore||f.value===''||f.value==null||(f.operator==='lte'?(num(r[f.field])!==null&&num(r[f.field])<=Number(f.value)):String(r[f.field])===String(f.value))));}
function aggregate(rows,b){const m=new Map();for(const r of rows){if(r[b.x]==null||r[b.x]==='')continue;const category=String(r[b.x]),series=b.series?String(r[b.series]??'Missing'):'';const value=b.aggregate==='count'?1:num(r[b.y]);if(value===null)continue;const key=JSON.stringify([category,series]);if(!m.has(key))m.set(key,{category,series,total:0,count:0});const a=m.get(key);a.total+=value;a.count++;}return [...m.values()].map(a=>({...a,value:b.aggregate==='mean'?a.total/a.count:a.total}));}
function metric(rows,b){if(b.aggregate==='count')return rows.length;const values=rows.map(r=>num(r[b.y])).filter(v=>v!==null);return values.length?values.reduce((a,b)=>a+b,0)/(b.aggregate==='mean'?values.length:1):null;}
function quantile(sorted,f){const p=(sorted.length-1)*f,i=Math.floor(p);return sorted[i]+((sorted[i+1]??sorted[i])-sorted[i])*(p-i);}
function boxData(rows,b){const groups=new Map();for(const r of rows){const v=num(r[b.y]);if(v===null||r[b.x]==null||r[b.x]==='')continue;const k=String(r[b.x]);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(v);}return [...groups].map(([category,values])=>{values.sort((a,b)=>a-b);const q1=quantile(values,.25),median=quantile(values,.5),q3=quantile(values,.75),iqr=q3-q1;const inside=values.filter(v=>v>=q1-1.5*iqr&&v<=q3+1.5*iqr),low=inside[0],high=inside[inside.length-1];return{category,values:[low,q1,median,q3,high],outliers:values.filter(v=>v<low||v>high)};});}
function mappingIssues(b,schema){
 const fields=new Set(schema.map(f=>f.name)),numeric=new Set(schema.filter(f=>f.type==='number').map(f=>f.name)),msgs=[],raw=['scatter','bubble','histogram','boxplot'].includes(b.type);
 if(chartTypes.includes(b.type)){if(b.type!=='histogram'&&!fields.has(b.x))msgs.push('Choose a category or X field.');if((raw||b.aggregate!=='count')&&!numeric.has(b.y))msgs.push('Choose a numeric value field.');if(b.series&&!fields.has(b.series))msgs.push('The series field is missing.');if(['clusteredBar','clusteredColumn','stackedBar','percentBar','heatmap','stacked-column'].includes(b.type)&&!b.series)msgs.push('Choose a series field for the groups.');if(['map','pie','donut','treemap','histogram','boxplot'].includes(b.type)&&b.series)msgs.push('This preview uses one measure per category; clear the series field.');if(['scatter','bubble'].includes(b.type)&&!numeric.has(b.x))msgs.push('Choose a numeric X field.');if(b.type==='bubble'&&!numeric.has(b.z))msgs.push('Choose a numeric bubble size field.');}
 if(['dropdown','slider','buttons'].includes(b.type)&&!fields.has(b.field))msgs.push('Choose a filter field.');if(b.type==='slider'&&!numeric.has(b.field))msgs.push('Choose a numeric slider field.');if(b.type==='metric'&&b.aggregate!=='count'&&!numeric.has(b.y))msgs.push('Choose a numeric value field.');return msgs;
}
function readDesign(raw){const spec=checkSpec(raw);let rows=[];if(raw.data!==undefined){if(!Array.isArray(raw.data))throw Error('Embedded data must be an array.');if(raw.data.length){const schema=inspectRows(raw.data);rows=raw.data;spec.source.schema=schema;}}return{spec,rows};}
function designFile(spec,rows,includeData){const file=checkSpec(spec);if(includeData&&rows.length)file.data=rows;return file;}

function validate(spec){const msgs=[];for(const b of spec.blocks||[]){if(b.xPos+b.w>spec.canvas.width||b.yPos+b.h>spec.canvas.height)msgs.push(b.title+': outside the canvas.');if(b.yPos<110)msgs.push(b.title+': overlaps the dashboard heading.');}for(const b of spec.blocks)msgs.push(...mappingIssues(b,spec.source.schema).map(m=>b.title+': '+m));for(let i=0;i<spec.blocks.length;i++)for(let j=i+1;j<spec.blocks.length;j++){const a=spec.blocks[i],b=spec.blocks[j];if(a.xPos<b.xPos+b.w&&a.xPos+a.w>b.xPos&&a.yPos<b.yPos+b.h&&a.yPos+a.h>b.yPos)msgs.push('Overlap: '+a.title+' / '+b.title+'.');}return msgs;}

const snap = value => Math.round(value / 10) * 10;
const bounded = (value, min, max, fallback) => Math.min(max, Math.max(min, Number.isFinite(Number(value)) ? Math.round(Number(value)) : fallback));
function checkSpec(raw){
  if(!raw || !['1.0','1.1','2.0','2.1','2.2'].includes(raw.schemaVersion) || !Array.isArray(raw.blocks) || raw.blocks.length>60)
    throw Error('Use a Dashboard Studio design (1.0, 1.1, 2.0, 2.1 or 2.2) with at most 60 visuals.');
  const legacy=['1.0','2.0'].includes(raw.schemaVersion), ids=new Set();
  const canvas={width:bounded(raw.canvas?.width,320,3840,1200),height:bounded(raw.canvas?.height,240,12000,1340),snap:10};
  const blocks=raw.blocks.map(original=>{
    const oldType=original?.type;const b={...original,type:({column:'bar',clusteredColumn:'clusteredBar','stacked-column':'stackedBar'})[oldType]||oldType};
    if(!b || !types.includes(b.type) || !b.id || ids.has(String(b.id).slice(0,80))) throw Error('Each visual needs a unique ID and a supported type.');
    ids.add(String(b.id).slice(0,80));
    const c={id:String(b.id).slice(0,80),type:b.type,orientation:['column','clusteredColumn','stacked-column'].includes(oldType)||b.orientation==='vertical'?'vertical':'horizontal'};
    for(const k of ['title','x','y','z','series','field','text','note','instructions'])
      c[k]=String((k==='instructions'?b.instructions??b.description:b[k])??'').slice(0,['text','instructions'].includes(k)?12000:400);
    c.aggregate=['sum','count','mean'].includes(b.aggregate)?b.aggregate:'sum';
    if(legacy){
      c.w=bounded(b.w,1,12,6)*100-10;
      c.h=Math.max(80,snap(bounded(b.h,2,20,6)*54-12));
      c.xPos=bounded(b.xPos,0,11,0)*100;
      c.yPos=120+snap(bounded(b.yPos,0,2000,0)*54);
      canvas.height=Math.min(12000,Math.max(canvas.height,c.yPos+c.h+30));
    }else{
      c.w=bounded(b.w,100,3840,590);c.h=bounded(b.h,80,12000,350);
      c.xPos=bounded(b.xPos,0,3840,0);c.yPos=bounded(b.yPos,0,12000,120);
    }
    c.w=Math.min(c.w,canvas.width);c.h=Math.min(c.h,canvas.height);
    c.xPos=Math.min(c.xPos,canvas.width-c.w);c.yPos=Math.min(c.yPos,canvas.height-c.h);
    return c;
  });
  return {schemaVersion:'2.2',title:String(raw.title||'Dashboard').slice(0,200),subtitle:String(raw.subtitle||'').slice(0,800),notes:String(raw.notes??raw.description??'').slice(0,12000),canvas,theme:'erm-classic-v0.1',source:{reference:String(raw.source?.reference||'').slice(0,1000),schema:Array.isArray(raw.source?.schema)?raw.source.schema.filter(f=>f&&typeof f.name==='string').slice(0,150).map(f=>({name:f.name.slice(0,200),type:f.type==='number'?'number':'string',...(Number.isInteger(f.missing)&&f.missing>=0?{missing:f.missing}:{})})):[]},blocks};
}
function designBrief(spec){
  const lines=['# '+spec.title,'','## Dashboard design brief',spec.subtitle,'','## Dashboard notes',spec.notes||'No dashboard notes supplied.','','## Canvas',`${spec.canvas.width} × ${spec.canvas.height} pixels. Position and resize on a 10-pixel grid. Centre the dashboard title and subtitle. Narrow screens stack visuals in reading order.`,'','## Dataset',spec.source.reference||'No source reference supplied.','Fields: '+spec.source.schema.map(f=>f.name+' ('+f.type+')').join(', '),'This readable brief contains mappings only. The saved design can include the dataset; otherwise supply the data separately.'];
  for(const b of [...spec.blocks].sort((a,b)=>a.yPos-b.yPos||a.xPos-b.xPos)){
    lines.push('',`## ${b.title} [${b.id}]`,`Visual: ${names[b.type]}`, ...(['bar','clusteredBar','stackedBar','percentBar'].includes(b.type)?['Orientation: '+(b.orientation==='vertical'?'Vertical columns':'Horizontal bars')]:[]),`Position: x ${b.xPos}px, y ${b.yPos}px. Size: ${b.w}px × ${b.h}px.`);
    if(chartTypes.includes(b.type)||b.type==='metric') lines.push(`Mapping: X/category ${b.x||'—'}; Y/value ${b.y||'—'}; bubble size ${b.z||'—'}; series ${b.series||'none'}; aggregation ${['scatter','bubble','histogram','boxplot'].includes(b.type)?'raw observations':b.aggregate}.`);
    if(controlTypes.includes(b.type)) lines.push(`Filter field: ${b.field||'—'}. Scope: all data visuals. Slider operator: less than or equal to.`);
    if(b.text)lines.push('Content: '+b.text);
    if(b.note)lines.push('Supporting note: '+b.note);
    lines.push('Design and interaction instructions:',b.instructions||'No additional instructions supplied.');
  }
  lines.push('','## Build requirements','Preserve the reviewed layout, visual IDs, mappings and design instructions. Text instructions describe intended behaviour; only configured mappings and shared filters run in this prototype. Resolve unspecified interactions before implementation.','Use the Eurofound visual style and quality workflow. Reconcile calculations with the source, keep nulls distinct from zero, and test keyboard access, narrow layouts, filters and exports. Do not treat fictional demonstration values as production evidence.');
  return lines.join('\n')+'\n';
}
function emptySpec(){return {schemaVersion:'2.2',title:'Untitled dashboard',subtitle:'',notes:'',canvas:{width:1200,height:900,snap:10},theme:'erm-classic-v0.1',source:{reference:'',schema:[]},blocks:[]};}
function demoRows(){const rows=[];const countries=[['Ireland','ie'],['France','fr'],['Germany','de'],['Spain','es'],['Italy','it'],['Poland','pl']];for(let y=2021;y<=2025;y++)countries.forEach(([country,country_code],i)=>['Manufacturing','Services'].forEach((sector,j)=>rows.push({country,country_code,year:y,sector,events:20+i*14+(y-2021)*3+j*9,job_gains:800+i*630+(y-2021)*160+j*210,job_losses:600+i*540+(y-2021)*210+j*130})));return rows;}
function demoSpec(rows){const block=(id,type,title,xPos,yPos,w,h,extra={})=>({id,type,title,xPos,yPos,w,h,x:'country',y:'events',series:'',aggregate:'sum',field:'',text:'',note:'',...extra});return{schemaVersion:'1.0',title:'European restructuring overview',subtitle:'Explore countries, periods and announced employment changes.',theme:'erm-classic-v0.1',source:{reference:'Fictional demonstration data — replace before publication',schema:inspectRows(rows)},blocks:[block('country','dropdown','Country',0,0,4,2,{field:'country'}),block('year','slider','Up to year',4,0,4,2,{field:'year'}),block('sector','buttons','Sector',8,0,4,2,{field:'sector'}),block('events','metric','Restructuring events',0,2,4,3),block('gains','metric','Announced job gains',4,2,4,3,{y:'job_gains'}),block('losses','metric','Announced job losses',8,2,4,3,{y:'job_losses'}),block('map','map','Restructurings by country',0,5,6,7,{x:'country_code'}),block('trend','area','Number of restructuring events',6,5,6,7,{x:'year'}),block('jobs','line','Announced job gains over time',0,12,8,7,{x:'year',y:'job_gains',series:'country'}),block('sectors','bar','Events by sector',8,12,4,7,{x:'sector'}),block('notes','text','About these figures',0,19,9,3,{text:'Fictional data for testing the designer. Production ERM figures describe recorded announcements and should be interpreted alongside the methodology.'}),block('reset','reset','Reset filters',9,19,3,3)]};}
const ordered=blocks=>[...blocks].sort((a,b)=>a.yPos-b.yPos||a.xPos-b.xPos);
const api={paletteTypes,charts,names,descriptions,controls,ordered,emptySpec,quantile,boxData,mappingIssues,readDesign,designFile,snap,designBrief,chartTypes,controlTypes,types,esc,num,parseCSV,inspectRows,filtered,aggregate,metric,validate,checkSpec,demoRows,demoSpec:rows=>checkSpec(demoSpec(rows))};if(typeof module!=='undefined')module.exports=api;root.StudioCore=api;
})(typeof window!=='undefined'?window:globalThis);
