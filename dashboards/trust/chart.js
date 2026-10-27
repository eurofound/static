const CSV_URL="./Trust.csv?v=2025-r8-2021-r3";
const INCLUDED_ROUNDS={2021:3,2022:5,2023:6,2024:7,2025:8};
const SHARED_METRICS=new Set(["Trust in country's government","Trust in people","Trust in social media","Trust in the European Union","Trust in the healthcare system","Trust in the news media","Trust in the police"]);
const FLAG_CODE={"European Union":"eu","Austria":"at","Belgium":"be","Bulgaria":"bg","Croatia":"hr","Cyprus":"cy","Czechia":"cz","Denmark":"dk","Estonia":"ee","Finland":"fi","France":"fr","Germany":"de","Greece":"gr","Hungary":"hu","Ireland":"ie","Italy":"it","Latvia":"lv","Lithuania":"lt","Luxembourg":"lu","Malta":"mt","Netherlands":"nl","Poland":"pl","Portugal":"pt","Romania":"ro","Slovakia":"sk","Slovenia":"si","Spain":"es","Sweden":"se"};
const svg=d3.select("#chart"),g=svg.append("g"),guidesG=g.append("g").attr("class","chart-guides"),titlesG=g.append("g").attr("class","chart-titles");
let width=1100,compact=false,margin={top:84,right:28,bottom:110,left:270},rowGap=90,r=6,innerW=802,labelLeft=-246,rowCenters=[];
const x=d3.scaleLinear().domain([1,8]).range([0,innerW]),rowY=i=>compact?(rowCenters[i]??i*rowGap):i*rowGap;
const color=d3.scaleDiverging().domain([1,5,8]).interpolator(d3.interpolateRgbBasis([css("--low"),css("--mid"),css("--high")]));
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
const curve=d3.curveCatmullRom.alpha(.8),lineGen=d3.line().x(d=>d.x).y(d=>d.y).curve(curve),dotsG=g.append("g"),bandG=g.append("g").attr("class","band-layer"),layers={A:{g:g.append("g").attr("class","layer-A")},B:{g:g.append("g").attr("class","layer-B")}},countryLabelsG=g.append("g").attr("class","country-labels"),MOVE_MS=650;
dotsG.raise();
const tip=document.getElementById("tooltip");function showTip(e,p){tip.style.display="block";tip.innerHTML=`<strong>${p.Country}</strong><br>${p.Metric}: ${p.value}`;tip.style.left=Math.max(8,Math.min(e.clientX+12,innerWidth-tip.offsetWidth-8))+"px";tip.style.top=Math.max(8,Math.min(e.clientY+12,innerHeight-tip.offsetHeight-8))+"px"}function hideTip(){tip.style.display="none"}const FADE_OTHER=.2;function applyFade(set){dotsG.selectAll("circle").classed("emph",d=>set.has(d.Country)).attr("opacity",d=>set.size?(set.has(d.Country)?1:FADE_OTHER):1)}
const yearSel=document.getElementById("yearSel"),countrySel=document.getElementById("countrySel"),countryDisplay=document.getElementById("countryDisplay"),clearBtn=document.getElementById("clearSel");let selectedCountries=[],categories=[],points=[],years=[],curYear=null,allRows=[];
window.trustDataReady=d3.csv(CSV_URL,d3.autoType).then(init);
window.trustDataReady.catch(err=>{
  console.error(err);
  document.getElementById("downloadStatus").textContent="The data could not be loaded. Please reload the dashboard.";
});
function init(rows){
  allRows=rows.map(d=>({Year:+d.Year,Round:+d.Round,Metric:String(d.Metric),Country:String(d.Country),Score:d.Score==null||d.Score===""?NaN:+d.Score}))
    .filter(d=>INCLUDED_ROUNDS[d.Year]===d.Round&&SHARED_METRICS.has(d.Metric)&&Number.isFinite(d.Score)&&d.Score>=1&&d.Score<=10);
  if(!allRows.length)throw new Error("No data for the included survey rounds");
  years=[...new Set(allRows.map(d=>d.Year))].sort(d3.ascending);
  curYear=d3.max(years);
  [...years].sort((a,b)=>b-a).forEach(y=>yearSel.add(new Option(y,y,false,y===curYear)));
  yearSel.classList.add("soft");
  const byYear=allRows.filter(d=>d.Year===curYear),metrics=[...new Set(byYear.map(d=>d.Metric))];
  const euVal=Object.fromEntries(metrics.map(m=>[m,byYear.find(d=>d.Metric===m&&d.Country==="European Union")?.Score??NaN]));
  categories=metrics.slice().sort((a,b)=>d3.descending(euVal[a],euVal[b]));
  configureChart();renderChart();
  const countries=[...new Set(allRows.map(d=>d.Country))];
  ["European Union",...countries.filter(c=>c!=="European Union").sort((a,b)=>a.localeCompare(b))].forEach(c=>countrySel.add(new Option(c,c)));
  yearSel.addEventListener("change",()=>{
    yearSel.classList.remove("soft");
    const y=+yearSel.value;if(y===curYear)return;
    const prevMap=new Map(points.map(p=>[`${p.Metric}|${p.Country}`,{x:p.x,y:p.y}]));
    const prevSelected=Object.fromEntries(selectedCountries.map(c=>[c,getCountryPoints(c).map(p=>({...p}))]));
    curYear=y;hideTip();updateYear(allRows.filter(d=>d.Year===curYear),prevMap,prevSelected);
  });
  countrySel.addEventListener("change",()=>{const choice=countrySel.value;if(!choice)return;hideTip();addCountry(choice,true);countrySel.value=""});
  clearBtn.addEventListener("click",()=>{selectedCountries=[];updateCountryDisplay();applyFade(new Set);drawSelected(false);hideTip()});
  svg.on("click",event=>{if(event.target.tagName.toLowerCase()!=="circle")deselectLast()});
  new ResizeObserver(()=>{
    if(configureChart()){hideTip();renderChart();updateCountryDisplay()}
  }).observe(document.querySelector(".wrap"));
}
function configureChart(){
  const available=Math.max(240,Math.floor(svg.node().getBoundingClientRect().width));
  const nextWidth=Math.min(1100,available),nextCompact=available<=680;
  const changed=nextWidth!==width||nextCompact!==compact;
  width=nextWidth;compact=nextCompact;
  margin=compact?{top:148,right:16,bottom:76,left:16}:{top:84,right:28,bottom:110,left:270};
  rowGap=compact?136:90;innerW=width-margin.left-margin.right;labelLeft=compact?0:-margin.left+24;
  x.range([0,innerW]);g.attr("transform",`translate(${margin.left},${margin.top})`);
  return changed;
}
function renderChart(prevMap,prevSelected){
  if(compact){prevMap=undefined;prevSelected=undefined}
  points=buildPoints(allRows.filter(d=>d.Year===curYear));beeswarm(points);
  const titleY=[],ruleY=[];
  let axisY=(categories.length-1)*rowGap+78;
  if(compact){
    // Dense mobile swarms need space based on their actual height, not fixed rows.
    let cursor=-54;
    const nextCenters=[];
    categories.forEach((_,i)=>{
      const row=points.filter(p=>p.row===i),base=rowY(i);
      const low=d3.min(row,p=>p.y-base)??0,high=d3.max(row,p=>p.y-base)??0;
      titleY[i]=cursor;
      const center=cursor+28-low;
      row.forEach(p=>{p.y+=center-base});nextCenters[i]=center;
      ruleY[i]=center+high+r+18;cursor=ruleY[i]+32;
    });
    rowCenters=nextCenters;axisY=ruleY[ruleY.length-1]+30;
  }else categories.forEach((_,i)=>{titleY[i]=rowY(i);ruleY[i]=rowY(i)+r+38});
  const totalH=margin.top+axisY+32;
  svg.attr("width",width).attr("height",totalH).attr("viewBox",`0 0 ${width} ${totalH}`);
  guidesG.selectAll("*").remove();titlesG.selectAll("*").remove();
  categories.forEach((lab,i)=>{
    // Keep selection lines behind readable indicator headings on narrow screens.
    if(compact)titlesG.append("rect").attr("x",labelLeft).attr("y",titleY[i]-14).attr("width",innerW).attr("height",28).attr("fill","#fff");
    titlesG.append("text").attr("class","label").attr("x",labelLeft).attr("y",titleY[i]).attr("text-anchor","start").text(lab);
    guidesG.append("line").attr("class","row-rule").attr("x1",labelLeft).attr("x2",innerW).attr("y1",ruleY[i]).attr("y2",ruleY[i]);
  });
  guidesG.append("line").attr("x1",x(5)).attr("x2",x(5)).attr("y1",0).attr("y2",ruleY[ruleY.length-1]).attr("stroke","#d6d6d6");
  const cues=guidesG.append("g").attr("class","axis-cues").attr("transform",`translate(0,${axisY})`);
  cues.append("text").attr("class","low").attr("x",compact?0:x(1.2)).attr("text-anchor","start").text("← Lower trust");
  cues.append("text").attr("class","high").attr("x",compact?innerW:x(7.5)).attr("text-anchor","end").text("Higher trust →");
  drawDots(prevMap);drawSelected(false,prevSelected);titlesG.raise();countryLabelsG.raise();
}
window.getTrustExportState=()=>({
  year:curYear,round:INCLUDED_ROUNDS[curYear],selectedCountries:[...selectedCountries],
  rows:allRows.filter(d=>d.Year===curYear).map(d=>({...d})),
  title:"Trust indicators dashboard",source:"Eurofound, Living and working in the EU e-survey",
  sourceUrl:"https://www.eurofound.europa.eu/en/surveys-and-data/surveys/living-and-working-in-the-eu-e-survey"
});

function deselectLast(){if(!selectedCountries.length)return;selectedCountries.pop();updateCountryDisplay();applyFade(new Set(selectedCountries));drawSelected(false)}function updateCountryDisplay(){if(!selectedCountries.length){countryDisplay.textContent="Select a country";clearBtn.hidden=true}else{countryDisplay.textContent=compact&&selectedCountries.length>1?`${selectedCountries.length} countries selected`:selectedCountries.join("  ·  ");clearBtn.hidden=false}}function addCountry(c,animateNew){const idx=selectedCountries.indexOf(c);if(idx>=0)selectedCountries.splice(idx,1);else{if(selectedCountries.length===2)selectedCountries.shift();selectedCountries.push(c)}updateCountryDisplay();applyFade(new Set(selectedCountries));drawSelected(animateNew)}function clearLayers(){Object.values(layers).forEach(L=>L.g.selectAll("*").interrupt().remove());bandG.selectAll("*").interrupt().remove()}
function updateYear(rows,prevMap,prevSelected){renderChart(prevMap,prevSelected)}
function buildPoints(rows){return rows.map(d=>({...d,value:+d.Score,row:categories.indexOf(d.Metric),id:`${d.Year}|${d.Metric}|${d.Country}`,x:x(+d.Score),y:rowY(categories.indexOf(d.Metric))})).filter(d=>d.row>=0&&Number.isFinite(d.value))}
function beeswarm(pts){const byRow=d3.group(pts,d=>d.row);byRow.forEach(rowPts=>{rowPts.sort((a,b)=>a.x-b.x);for(let i=0;i<rowPts.length;i++){let y=rowY(rowPts[i].row),tries=0;while(tries++<200){let ok=true;for(let j=0;j<i;j++){const dx=rowPts[i].x-rowPts[j].x,dy=y-rowPts[j].y;if(dx*dx+dy*dy<(2*r+1)*(2*r+1)){ok=false;break}}if(ok)break;y=rowY(rowPts[i].row)+((tries%2?1:-1)*Math.ceil(tries/2))}rowPts[i].y=y}})}
function drawDots(prevMap){const sel=dotsG.selectAll("circle").data(points,d=>d.id);sel.exit().remove();const enter=sel.enter().append("circle").attr("class",d=>`dot ${d.Country==="European Union"?"eu-dot":""}`).attr("r",r).attr("cx",d=>prevMap?.get(`${d.Metric}|${d.Country}`)?.x??d.x).attr("cy",d=>prevMap?.get(`${d.Metric}|${d.Country}`)?.y??d.y).attr("fill",d=>color(d.value)).on("mousemove",showTip).on("mouseleave",hideTip).on("click",(event,d)=>{event.stopPropagation();addCountry(d.Country,true)});enter.merge(sel).interrupt().attr("fill",d=>color(d.value)).transition().duration(prevMap?MOVE_MS:0).ease(d3.easeCubicInOut).attr("cx",d=>d.x).attr("cy",d=>d.y);applyFade(new Set(selectedCountries))}
function getCountryPoints(country){return categories.map(m=>points.find(p=>p.Country===country&&p.Metric===m)).filter(Boolean)}
function drawSelected(animateNew,prevByCountry={}){clearLayers();drawCountryLabels(prevByCountry);if(!selectedCountries.length)return;const A=selectedCountries[0],B=selectedCountries[1],prevA=prevByCountry[A],prevB=prevByCountry[B];if(A)drawCountryLayer("A",A,animateNew,prevA);if(B)drawCountryLayer("B",B,animateNew,prevB);if(A&&B)drawBetweenBand(A,B,prevA,prevB)}
// Join by country so replaced/deselected countries lose their labels immediately.
// Positions are recomputed together, rather than independently beside each dot.
function drawCountryLabels(prevByCountry={}){
  const labels=selectedCountries.map(country=>({country,point:getCountryPoints(country)[0]})).filter(d=>d.point);
  const join=countryLabelsG.selectAll("g.country-label").data(labels,d=>d.country);
  join.exit().selectAll("*").interrupt();
  join.exit().remove();
  const enter=join.enter().append("g").attr("class","country-label");
  enter.append("line").attr("class","label-connector");
  const content=enter.append("foreignObject").attr("class","name-fo").attr("height",32).append("xhtml:div").attr("class","flag-row");
  content.append("span").attr("class",d=>`fi fi-${FLAG_CODE[d.country]}`).attr("aria-hidden","true");
  content.append("span").text(d=>d.country);
  const merged=enter.merge(join).attr("data-country",d=>d.country);
  merged.selectAll("*").interrupt();
  // Use the full rendered flag/name width; long country names must not be clipped.
  merged.select("foreignObject").attr("width",innerW);
  const measured=[];
  merged.each(function(d){measured.push({...d,anchorX:d.point.x,width:Math.ceil(this.querySelector(".flag-row").scrollWidth)+2})});
  const placed=new Map(layoutCountryLabels(measured,0,innerW).map(d=>[d.country,d]));
  merged.each(function(d){
    const label=placed.get(d.country),group=d3.select(this),labelY=compact?-140+label.row*36:-76;
    group.select("foreignObject").attr("x",label.x).attr("y",labelY).attr("width",label.width);
    const previous=oldPoint(prevByCountry[d.country],d.point.Metric,d.point);
    const connector=group.select("line").attr("display",compact?"none":null).attr("x1",previous.x).attr("y1",previous.y-r-4)
      .attr("x2",Math.max(label.x+10,Math.min(label.x+label.width-10,d.point.x))).attr("y2",labelY+32);
    if(prevByCountry[d.country])connector.transition().duration(MOVE_MS).ease(d3.easeCubicInOut).attr("x1",d.point.x).attr("y1",d.point.y-r-4);
  });
  countryLabelsG.raise();
}
// Re-measure if fonts finish loading or the available display size changes.
document.fonts.ready.then(()=>drawCountryLabels());

function oldPoint(prevPts,metric,fallback){return prevPts?.find(p=>p.Metric===metric)||fallback}
function drawCountryLayer(slot,country,animateNew,prevPts){const L=layers[slot],pts=getCountryPoints(country);if(!pts.length)return;const path=L.g.append("path").attr("class",`highlight ${slot==="B"?"second":""}`).attr("d",lineGen(prevPts||pts));if(prevPts){path.transition().duration(MOVE_MS).ease(d3.easeCubicInOut).attr("d",lineGen(pts))}else if(animateNew){const len=path.node().getTotalLength();path.attr("stroke-dasharray",`${len} ${len}`).attr("stroke-dashoffset",len).transition().duration(700).ease(d3.easeCubicOut).attr("stroke-dashoffset",0)}L.g.selectAll("circle").data(pts,d=>d.Metric).enter().append("circle").attr("class",`highlight-pin ${slot==="B"?"second":""}`).attr("r",r+4).attr("cx",d=>oldPoint(prevPts,d.Metric,d).x).attr("cy",d=>oldPoint(prevPts,d.Metric,d).y).transition().duration(prevPts?MOVE_MS:0).ease(d3.easeCubicInOut).attr("cx",d=>d.x).attr("cy",d=>d.y);}

function bandPath(A,B){const pairs=categories.map(m=>{const pa=A?.find(p=>p.Metric===m),pb=B?.find(p=>p.Metric===m);return pa&&pb?{pa,pb}:null}).filter(Boolean);if(!pairs.length)return null;const top=pairs.map(d=>({x:d.pa.x,y:d.pa.y})),bottom=pairs.slice().reverse().map(d=>({x:d.pb.x,y:d.pb.y}));return d3.line().x(d=>d.x).y(d=>d.y).curve(curve)([...top,...bottom])+"Z"}
function drawBetweenBand(a,b,prevA,prevB){const A=getCountryPoints(a),B=getCountryPoints(b),finalPath=bandPath(A,B);if(!finalPath)return;const path=bandG.append("path").attr("class","between-band").attr("d",bandPath(prevA,prevB)||finalPath);if(prevA&&prevB)path.transition().duration(MOVE_MS).ease(d3.easeCubicInOut).attr("d",finalPath)}
