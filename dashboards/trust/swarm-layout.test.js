const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { layoutTrustSwarmRows } = require('./swarm-layout.js');

const lines = fs.readFileSync(path.join(__dirname, 'Trust.csv'), 'utf8').trim().replace(/^\uFEFF/, '').split(/\r?\n/);
const headers = lines.shift().split(',');
const data = lines.map(line => Object.fromEntries(line.split(',').map((value, i) => [headers[i], value])));
const metrics = [...new Set(data.map(row => row.Metric))];
function yearPoints(year, width) {
  return data.filter(row => +row.Year === year).map(row => ({
    ...row, id: `${row.Country}|${row.Metric}`, row: metrics.indexOf(row.Metric), x: (+row.Score - 1) / 7 * width,
  }));
}
function assertContained(points, layout) {
  for (const point of points) {
    assert(Number.isFinite(point.y), 'every marker has a position');
    assert(point.y - 11 >= layout.bounds[point.row].top + 11.99, 'top of marker/ring stays inside its own row');
    assert(point.y + 11 <= layout.bounds[point.row].bottom - 11.99, 'bottom of marker/ring stays inside its own row');
  }
}
function assertNoOverlap(points) {
  for (let i = 0; i < points.length; i++) for (let j = 0; j < i; j++) {
    const a = points[i], b = points[j];
    if (a.row !== b.row) continue;
    const square = [a, b].find(point => point.Country === 'European Union');
    if (square) {
      const circle = square === a ? b : a;
      const dx = Math.max(0, Math.abs(circle.x - square.x) - 6.75);
      const dy = Math.max(0, Math.abs(circle.y - square.y) - 6.75);
      assert(dx * dx + dy * dy >= 49 - 1e-5, 'square must not overlap a country dot');
    } else assert((a.x - b.x) ** 2 + (a.y - b.y) ** 2 >= 196 - 1e-5, 'country dots must not overlap');
  }
}

test('28 identical scores fit without a search limit or spilling into the next indicator', () => {
  const points = Array.from({length:56}, (_, i) => ({row:Math.floor(i/28), Country:i%28 ? `Country ${i%28}` : 'European Union', x:100}));
  const layout = layoutTrustSwarmRows(points, 2);
  assertContained(points, layout); assertNoOverlap(points);
  assert(Math.max(...points.filter(p => !p.row).map(p => p.y)) - Math.min(...points.filter(p => !p.row).map(p => p.y)) > 200);
  assert(layout.centers[1] - layout.centers[0] > 90, 'dense rows must expand');
});

test('every published year fits its row at narrow and wide plot widths without changing scores', () => {
  for (const year of [2021,2022,2023,2024,2025]) for (const width of [120,160,240,350,500,802]) for (const compact of [false,true]) {
    const points = yearPoints(year, width), before = points.map(p => p.x);
    const layout = layoutTrustSwarmRows(points, 7, {compact});
    assert.equal(points.length, 196);
    assert.deepEqual(points.map(p => p.x), before, 'horizontal score positions stay exact');
    assertContained(points, layout); assertNoOverlap(points);
    assert(layout.centers.every((center, i) => !i || center > layout.centers[i-1]));
  }
});

test('year/width transitions stay within the moving row separators', () => {
  const a = yearPoints(2021, 802), b = yearPoints(2025, 160);
  const from = layoutTrustSwarmRows(a, 7), to = layoutTrustSwarmRows(b, 7);
  const previous = new Map(a.map(p => [p.id, p]));
  for (const progress of [0,.1,.25,.5,.75,.9,1]) for (const point of b) {
    const start = previous.get(point.id), y = start.y + (point.y-start.y)*progress;
    const top = from.bounds[point.row].top + (to.bounds[point.row].top-from.bounds[point.row].top)*progress;
    const bottom = from.bounds[point.row].bottom + (to.bounds[point.row].bottom-from.bounds[point.row].bottom)*progress;
    assert(y - 11 >= top + 11.99);
    assert(y + 11 <= bottom - 11.99);
  }
});
