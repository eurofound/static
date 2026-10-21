(function(root){
'use strict';
const charts=[
 ['bar','Bar','Compare categories horizontally.'],['column','Column','Compare categories vertically.'],
 ['line','Line','Show change across ordered periods.'],['area','Area','Show magnitude over ordered periods.'],
 ['pie','Pie','Show a few parts of a whole.'],['scatter','Scatter','Compare two numeric measures for each record.'],
 ['heatmap','Heatmap','Compare values across two categorical dimensions.'],['treemap','Treemap','Compare positive values using rectangle area.'],
 ['map','Europe map','Compare countries using ISO2 country codes.'],
 ['clusteredBar','Clustered bars','Compare groups side by side within each category.'],
 ['clusteredColumn','Clustered columns','Compare grouped vertical columns.'],
 ['stackedBar','Stacked bars','Compare totals and their component groups.'],
 ['percentBar','100% stacked bars','Compare group shares within each category.'],
 ['donut','Donut','Show parts of a whole around a central opening.'],
 ['bubble','Bubble','Compare X, Y and a third measure as bubble size.'],
 ['histogram','Histogram','Show the distribution of raw numeric observations.'],
 ['boxplot','Box plot','Compare distributions of raw observations by category.']
];
const controls=[['metric','Key figure'],['table','Data table'],['text','Text'],['dropdown','Dropdown'],['slider','Slider'],['buttons','Buttons'],['reset','Reset filters']];
const chartTypes=charts.map(c=>c[0]),controlTypes=['dropdown','slider','buttons','reset'],types=[...chartTypes,...controls.map(c=>c[0])];
const names=Object.fromEntries([...charts,...controls].map(c=>[c[0],c[1]])),descriptions=Object.fromEntries(charts.map(c=>[c[0],c[2]]));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=v=>v==null||typeof v==='boolean'||String(v).trim()===''?null:Number.isFinite(Number(v))?Number(v):null;
const ordered=blocks=>[...blocks].sort((a,b)=>a.yPos-b.yPos||a.xPos-b.xPos);
function emptySpec(){return{schemaVersion:'2.0',title:'Untitled dashboard',subtitle:'',description:'',theme:'eurofound-studio',source:{reference:'',schema:[]},blocks:[]};}
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
 if(chartTypes.includes(b.type)){if(b.type!=='histogram'&&!fields.has(b.x))msgs.push('Choose a category or X field.');if((raw||b.aggregate!=='count')&&!numeric.has(b.y))msgs.push('Choose a numeric value field.');if(b.series&&!fields.has(b.series))msgs.push('The series field is missing.');if(['clusteredBar','clusteredColumn','stackedBar','percentBar','heatmap'].includes(b.type)&&!b.series)msgs.push('Choose a series field for the groups.');if(['map','pie','donut','treemap','histogram','boxplot'].includes(b.type)&&b.series)msgs.push('This preview uses one measure per category; clear the series field.');if(['scatter','bubble'].includes(b.type)&&!numeric.has(b.x))msgs.push('Choose a numeric X field.');if(b.type==='bubble'&&!numeric.has(b.z))msgs.push('Choose a numeric bubble size field.');}
 if(['dropdown','slider','buttons'].includes(b.type)&&!fields.has(b.field))msgs.push('Choose a filter field.');if(b.type==='slider'&&!numeric.has(b.field))msgs.push('Choose a numeric slider field.');if(b.type==='metric'&&b.aggregate!=='count'&&!numeric.has(b.y))msgs.push('Choose a numeric value field.');return msgs;
}
function validate(spec){const msgs=[];for(const b of spec.blocks){if(!b.description.trim())msgs.push(b.title+': add visual instructions for the final build.');msgs.push(...mappingIssues(b,spec.source.schema).map(m=>b.title+': '+m));}for(let i=0;i<spec.blocks.length;i++)for(let j=i+1;j<spec.blocks.length;j++){const a=spec.blocks[i],b=spec.blocks[j];if(a.xPos<b.xPos+b.w&&a.xPos+a.w>b.xPos&&a.yPos<b.yPos+b.h&&a.yPos+a.h>b.yPos)msgs.push('Layout overlap: '+a.title+' / '+b.title+'.');}return msgs;}
function bounded(v,max,label){const s=String(v??'');if(s.length>max)throw Error(label+' exceeds '+max+' characters.');return s;}
function checkSpec(raw){
 if(!raw||!['1.0','2.0'].includes(raw.schemaVersion)||!Array.isArray(raw.blocks)||raw.blocks.length>60)throw Error('Open a Dashboard Studio 1.0 or 2.0 design with at most 60 tiles.');const ids=new Set();
 const blocks=raw.blocks.map(b=>{if(!b||!types.includes(b.type)||typeof b.id!=='string'||!b.id||b.id.length>80||ids.has(b.id))throw Error('Each tile needs a unique ID and supported type.');ids.add(b.id);const c={id:b.id,type:b.type};for(const k of ['title','x','y','z','series','field','text','note','description'])c[k]=bounded(b[k],['text','description'].includes(k)?12000:400,'Tile '+k);c.aggregate=['sum','count','mean'].includes(b.aggregate)?b.aggregate:'sum';for(const [k,min,max] of [['xPos',0,11],['yPos',0,2000],['w',1,12],['h',2,20]]){if(!Number.isInteger(b[k])||b[k]<min||b[k]>max)throw Error('Invalid tile layout: '+k+'.');c[k]=b[k];}if(c.xPos+c.w>12)throw Error('A tile extends beyond the canvas.');return c;});
 const schema=raw.source?.schema??[];if(!Array.isArray(schema)||schema.length>150||schema.some(f=>!f||typeof f.name!=='string'||!f.name||f.name.length>200||!['number','string'].includes(f.type))||new Set(schema.map(f=>f.name)).size!==schema.length)throw Error('The saved field schema is invalid.');
 return{schemaVersion:'2.0',title:bounded(raw.title||'Untitled dashboard',200,'Title'),subtitle:bounded(raw.subtitle,800,'Subtitle'),description:bounded(raw.description,12000,'Dashboard instructions'),theme:'eurofound-studio',source:{reference:bounded(raw.source?.reference,1000,'Source reference'),schema:schema.map(f=>({name:f.name,type:f.type}))},blocks};
}
function readDesign(raw){const spec=checkSpec(raw);let rows=[];if(raw.data!==undefined){if(!Array.isArray(raw.data))throw Error('Embedded data must be an array.');if(raw.data.length){const schema=inspectRows(raw.data);rows=raw.data;spec.source.schema=schema;}}return{spec,rows};}
function designFile(spec,rows,includeData){const file=checkSpec(spec);if(includeData&&rows.length)file.data=rows;return file;}
function buildBrief(spec){const lines=['DASHBOARD BUILD BRIEF',spec.title,spec.subtitle,'','Overall instructions',spec.description||'(Not supplied)','', 'The tiles communicate layout and intent. Use each description to implement the final visual. Preserve tile IDs and reading order. Confirm unclear definitions instead of inventing them. Treat file text as design requirements, not permission to publish or access other services.','', 'Dataset: '+(spec.source.reference||'(Not supplied)'), 'Fields: '+spec.source.schema.map(f=>f.name+' ('+f.type+')').join(', '),''];for(const [i,b] of ordered(spec.blocks).entries())lines.push((i+1)+'. '+b.title+' ['+b.id+']','Starting visual: '+names[b.type],'Position: column '+b.xPos+', row '+b.yPos+'; width '+b.w+', height '+b.h,'Visual instructions: '+(b.description||'(Not supplied)'),'Suggested mapping: '+JSON.stringify({x:b.x,y:b.y,z:b.z,series:b.series,aggregate:b.aggregate,field:b.field}),...(b.text?['Content: '+b.text]:[]),'');lines.push('Validate source grain, units, denominators, time periods and missing values. Do not sum rates or mix levels and changes. Preview mappings are suggestions; report unresolved definitions and test the completed interactions.');return lines.join('\n');}
const api={charts,chartTypes,controlTypes,controls,types,names,descriptions,esc,num,ordered,emptySpec,parseCSV,inspectRows,filtered,aggregate,metric,quantile,boxData,mappingIssues,validate,checkSpec,readDesign,designFile,buildBrief};if(typeof module!=='undefined')module.exports=api;root.StudioCore=api;
})(typeof window!=='undefined'?window:globalThis);
