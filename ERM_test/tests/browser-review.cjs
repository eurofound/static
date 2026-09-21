const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '../..');
const OUTPUT = process.env.ERM_TEST_OUTPUT || path.join(require('node:os').tmpdir(), 'erm-round3-review');
fs.mkdirSync(OUTPUT, {recursive:true});
const server = http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404).end(); return;}
  res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async()=>{
  await new Promise(resolve=>server.listen(8765,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000},acceptDownloads:true});
  const errors=[], failed=[], checks=[];
  async function check(name,fn) {try {await fn(); checks.push({name,passed:true});}catch(e){checks.push({name,passed:false,error:e.message});}}
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error') errors.push(m.text()); if(m.type()==='warning') console.log('BROWSER WARNING: '+m.text());});
  page.on('requestfailed',r=>failed.push({url:r.url(),failure:r.failure()}));
  if(process.env.ERM_CSV_PATH) await page.route('https://media.githubusercontent.com/**/Full_data.csv',r=>r.fulfill({path:path.resolve(process.env.ERM_CSV_PATH),contentType:'text/csv'}));
  await page.goto('http://127.0.0.1:8765/ERM_test/',{waitUntil:'networkidle',timeout:90000});
  await page.waitForFunction(()=>document.querySelector('#loadingOverlay')?.style.display==='none'||document.querySelector('#loadingOverlay .err'),{timeout:90000});
  const result=await page.evaluate(()=>({url:location.href,overlay:document.querySelector('#loadingOverlay')?.innerText,audit:window.ERMReview?.getAudit(),version:window.Highcharts?.version,charts:window.Highcharts?.charts.filter(Boolean).map(c=>({id:c.renderTo.id,series:c.series.map(s=>({name:s.name,type:s.type,points:s.points.length})),title:c.title?.textStr})),kpis:document.querySelector('.kpi-grid')?.innerText,body:document.body.innerText.slice(0,7000)}));
  result.errors=errors;result.failed=failed;
  fs.writeFileSync(path.join(OUTPUT,'browser-initial.json'),JSON.stringify(result,null,2));
  await page.screenshot({path:path.join(OUTPUT,'desktop.png'),fullPage:true});
  await check('Real CSV loads with 32382 published rows and 32380 in coverage',async()=>{
    assert.equal(result.audit?.published,32382);assert.equal(result.audit?.outsideCoverage,2);
    assert.equal(await page.locator('#loadingOverlay').isVisible(),false);
    assert.equal(result.charts.length,6);assert.equal(result.version,'12.4.0');
  });
  if(result.charts?.length) {
    await check('Directory URL redirects to dashboard',()=>assert.match(result.url,/ERM_test\/ERM_prototype_dash.html$/));
    await check('All eligible EU countries have plotted largest-case bubbles',async()=>{
      const data=await page.evaluate(()=>{const ch=getChartById('map-chart');return {expected:ERMRound3Core.largest(ERMReview.getFilteredRows()).length,points:ch.series[1].points.filter(p=>p.plotX!=null&&p.plotY!=null).length};});assert.equal(data.points,data.expected);assert.equal(data.points,26);
    });
    await check('No incomplete 2026 quarters are plotted from January source',async()=>{
      const periods=await page.evaluate(()=>ERMReview.getModels()['events-chart'].periods.map(p=>p.label));assert.equal(periods.at(-1),'2025');
    });
    await check('Choropleth and largest-case switching keeps six chart instances',async()=>{
      await page.locator('#mapModeSeg [data-mode="choropleth"]').click();
      assert.equal(await page.evaluate(()=>getChartById('map-chart').series[0].type),'map');
      await page.locator('#mapModeSeg [data-mode="cases"]').click();
      assert.equal(await page.evaluate(()=>Highcharts.charts.filter(Boolean).length),6);
    });
    await check('Large-event gain/loss modes agree with independent filtered sums',async()=>{
      for(const mode of ['gain','loss','all']) {
        await page.locator(`#eventsModeSeg [data-mode="${mode}"]`).click();
        const data=await page.evaluate(mode=>{const p=ERMReview.getModels()['events-chart'].periods[0]; const key=mode==='gain'?'jobGain':mode==='loss'?'maxLoss':null; const rows=ERMReview.getFilteredRows().filter(r=>r.date>=p.start&&r.date<=p.end);const loss=r=>r.maxLoss==null?r.minLoss||0:r.maxLoss;return {actual:getChartById('events-chart').series[0].yData||getChartById('events-chart').series[0].points.map(p=>p.y),expected:rows.filter(r=>(mode==='gain'?r.jobGain||0:mode==='loss'?loss(r):Math.max(loss(r),r.jobGain||0))>=100).length};},mode);assert.equal(data.actual[0],data.expected);
      }
    });
    await check('Job gains/losses/overall controls change real series',async()=>{
      for(const mode of ['gain','loss','all']) {await page.locator(`#jobsModeSeg [data-mode="${mode}"]`).click();assert.equal(await page.evaluate(()=>getChartById('jobs-chart').series.length),mode==='all'?2:1);}
    });
    await check('Company case metric, search, checkbox and Escape focus work',async()=>{
      await page.locator('#compMetricSeg [data-metric="cases"]').click();
      assert.equal(await page.evaluate(()=>getChartById('companies-chart').yAxis[0].axisTitle.textStr),'Events');
      await page.locator('#companyMs .ms-control').click();await page.getByRole('searchbox',{name:'Search eligible companies'}).fill('Amazon');
      await page.locator('#companyMs .ms-opt input').uncheck();assert.equal(await page.evaluate(()=>getChartById('companies-chart').series.some(s=>s.name.startsWith('Amazon'))),false);
      await page.keyboard.press('Escape');assert.equal(await page.locator('#companyMs .ms-control').evaluate(el=>el===document.activeElement),true);
      await page.locator('#compMetricSeg [data-metric="jobs"]').click();
    });
    await check('Recent factsheet links and full descriptions work',async()=>{
      const link=page.locator('#recentLoss a').first();assert.match(await link.getAttribute('href'),/\/detail\/\d+$/);
      await page.locator('#recentLoss summary').first().click();assert.ok((await page.locator('#recentLoss details[open] p').first().innerText()).length>200);
    });
    await check('Native sector drill-down exposes NACE-3 counts >=30',async()=>{
      await page.locator('#sectorsTable > details > summary').first().click();
      await page.locator('#sectorsTable > details').first().locator('details > summary').first().click();
      assert.ok(await page.locator('.r3-level-3:visible').count()>0);
      assert.equal(await page.evaluate(()=>csvSectors().filter(r=>r.level===3).every(r=>r.events>=30||r.suppressed)),true);
    });
    await check('Type treemaps use separate gain and loss denominators',async()=>{
      const panels=await page.evaluate(()=>['gain','loss'].map(side=>{const ps=getChartById('types-'+side+'-chart').series[0].points;return {sum:ps.reduce((s,p)=>s+p.custom.share,0),total:ps.reduce((s,p)=>s+p.value,0),expected:ERMReview.getFilteredRows().filter(r=>side==='gain'?r.jobGain>0:(r.maxLoss==null?r.minLoss:r.maxLoss)>0).length};}));panels.forEach(p=>{assert.ok(Math.abs(p.sum-100)<1e-8);assert.equal(p.total,p.expected);});
    });
    await check('Real type tooltip renders its SVG trend',async()=>{
      await page.locator('#types-loss-chart').scrollIntoViewIfNeeded();
      await page.evaluate(()=>{const c=getChartById('types-loss-chart');c.tooltip.refresh(c.series[0].points[0]);});
      fs.writeFileSync(path.join(OUTPUT,'type-tooltip-dom.html'),await page.locator('.highcharts-tooltip-container').last().innerHTML());
      await page.screenshot({path:path.join(OUTPUT,'type-tooltip.png')});
      assert.ok(await page.locator('.highcharts-tooltip-container svg[aria-label="Number of cases over time"] path').count()>0);
      await page.screenshot({path:path.join(OUTPUT,'type-tooltip.png')});
      await page.evaluate(()=>getChartById('types-loss-chart').tooltip.hide(0));
    });
    await check('Company tooltip exposes three clickable factsheet anchors',async()=>{
      await page.locator('#companies-chart').scrollIntoViewIfNeeded();
      await page.evaluate(()=>{const c=getChartById('companies-chart');c.tooltip.refresh(c.series[0].points.at(-1));});
      assert.equal(await page.locator('.highcharts-tooltip-container a[href*="/detail/"]').count(),3);
      await page.screenshot({path:path.join(OUTPUT,'company-tooltip.png')});
      await page.evaluate(()=>getChartById('companies-chart').tooltip.hide(0));
    });
    for(const [card,format] of [['events','csv'],['map','svg'],['jobs','png'],['types','png']]) await check(`${card} ${format.toUpperCase()} menu produces a nonempty download`,async()=>{
      const panel=page.locator('.'+card+'-card'); await panel.locator('.export-btn').click();
      const downloadPromise=page.waitForEvent('download',{timeout:20000}); await panel.locator(`[data-act="${format}"]`).click(); const download=await downloadPromise;
      const target=path.join(OUTPUT,download.suggestedFilename());await download.saveAs(target);assert.ok(fs.statSync(target).size>100);
      if(format==='csv') {const content=fs.readFileSync(target,'utf8');assert.ok(content.includes('period_start'));const expected=await page.evaluate(()=>csvEvents().length);assert.equal(content.trim().split(/\r?\n/).length,expected+2);}
    });
    await page.locator('#r3-toggle-filters').click();
    await check('Year and quarter controls, COVID filter and reset work',async()=>{
      await page.locator('#r3-period-mode').selectOption('year');await page.locator('#r3-from-period').selectOption('2020');await page.locator('#r3-to-period').selectOption('2020');
      assert.equal(await page.locator('#dateFrom').inputValue(),'2020-01-01');assert.equal(await page.locator('#dateTo').inputValue(),'2020-12-31');
      await page.locator('[data-dim="thematic"] .ms-control').click();await page.getByRole('searchbox',{name:'Search thematic subjects'}).fill('covid');await page.locator('[data-dim="thematic"] .ms-opt input').check();await page.keyboard.press('Escape');
      assert.ok((await page.locator('#r3-theme-definitions').innerText()).includes('Internal markers'));
      assert.equal(await page.evaluate(()=>ERMReview.getFilteredRows().every(r=>r.them_covid)),true);
      await page.evaluate(()=>clearAllSlicers());assert.equal(await page.locator('#cb-eu27').isChecked(),true);assert.equal(await page.evaluate(()=>ERMReview.getFilteredRows().length),23298);
    });
    await check('Two-country comparison and cascading NACE selectors work',async()=>{
      const host=page.locator('[data-dim="country"]');await host.locator('.ms-control').click();
      for(const country of ['France','Ireland']){await page.getByRole('searchbox',{name:'Search countries',exact:true}).fill(country);await host.locator('.ms-opt input').first().check();}await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(()=>getChartById('events-chart').series.length),2);
      const headings=await page.locator('.r3-sector-head').innerText();assert.match(headings,/France/);assert.match(headings,/Ireland/);
      await page.evaluate(()=>clearAllSlicers());
      await page.locator('[data-dim="sector"] .ms-control').click();await page.getByRole('searchbox',{name:'Search sectors',exact:true}).fill('Manufacturing');await page.locator('[data-dim="sector"] .ms-opt input').check();await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(()=>OPTIONS.nace3.every(o=>o.count>50)),true);
      assert.equal(await page.evaluate(()=>ERMReview.getFilteredRows().every(r=>r.sector==='Manufacturing')),true);
      await page.evaluate(()=>clearAllSlicers());
    });
    for(const width of [375,390,768,1024,1440]) await check(`No horizontal page overflow at ${width}px with filters open`,async()=>{
      await page.setViewportSize({width,height:900});await page.waitForTimeout(300);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert.ok(overflow<=1,`Overflow ${overflow}px`);
      if(width===390) {await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(OUTPUT,'mobile-filters.png')});}
    });
    await page.locator('#r3-toggle-filters').click();
    await page.setViewportSize({width:390,height:900});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(OUTPUT,'mobile.png'),fullPage:true});
  }
  result.checks=checks;result.errors=errors;result.failed=failed;
  fs.writeFileSync(path.join(OUTPUT,'browser-review.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify({checks,errors,failed},null,2));
  await browser.close();server.close();
  if(checks.some(c=>!c.passed)||errors.length||failed.length) process.exitCode=1;
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
