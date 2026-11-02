const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { trustTrendSeries, nearestTrustYear } = require('./trends.js');
const years = [2021, 2022, 2023, 2024, 2025];
const lines = fs.readFileSync(path.join(__dirname, 'Trust.csv'), 'utf8').trim().replace(/^\uFEFF/, '').split(/\r?\n/);
const headers = lines.shift().split(',');
const rows = lines.map(line => {
  const cells = line.split(',');
  const row = Object.fromEntries(headers.map((key, i) => [key, cells[i]]));
  row.Year = +row.Year; row.Score = +row.Score;
  return row;
});

test('country trends retain the published five-year scores and indicator order', () => {
  const metrics = ["Trust in the police", "Trust in country's government"];
  const result = trustTrendSeries(rows, ['Poland', 'Austria'], metrics, years);
  assert.deepEqual(result.map(d => d.country), ['Poland', 'Austria']);
  assert.deepEqual(result[0].indicators.map(d => d.metric), metrics);
  assert.equal(result[0].indicators[0].values[0].score, 3.9);
  assert.equal(result[0].indicators[0].values[4].score, 5.0);
  assert.equal(result[0].indicators[1].values[0].score, 2.1);
  assert.equal(result[1].indicators[0].values[4].score, 6.7);
  assert.deepEqual(result[1].indicators[1].values.map(d => d.year), years);
});

test('all countries have seven complete five-year series, including the reported EU aggregate', () => {
  const countries = [...new Set(rows.map(d => d.Country))];
  const metrics = [...new Set(rows.map(d => d.Metric))];
  const result = trustTrendSeries(rows, countries, metrics, years);
  assert.equal(result.length, 28);
  assert.equal(result.flatMap(d => d.indicators).length, 196);
  assert.equal(result.flatMap(d => d.indicators.flatMap(d => d.values)).length, 980);
  assert(result.every(d => d.indicators.every(d => d.values.every(d => Number.isFinite(d.score)))));
  assert(result.some(d => d.country === 'European Union'));
});

test('missing observations leave a gap instead of inventing a zero or joining different countries', () => {
  const series = trustTrendSeries([{Country:'A', Metric:'M', Year:2021, Score:4}], ['A', 'B'], ['M'], [2021, 2022]);
  assert.deepEqual(series[0].indicators[0].values, [{year:2021,score:4},{year:2022,score:null}]);
  assert.equal(series[1].indicators[0].values[0].score, null);
});

test('hover chooses the nearest available year and clamps to the endpoint years', () => {
  assert.equal(nearestTrustYear(years, -.2), 2021);
  assert.equal(nearestTrustYear(years, .26), 2022);
  assert.equal(nearestTrustYear(years, .52), 2023);
  assert.equal(nearestTrustYear(years, 1.2), 2025);
  assert.equal(nearestTrustYear([2021, 2025], .3), 2021);
  assert.equal(nearestTrustYear([], .5), null);
});
