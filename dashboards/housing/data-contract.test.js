const test = require('node:test');
const assert = require('node:assert/strict');
const { housingTrendSeries } = require('./trends.js');
const { housingExportRows, housingExportCSV } = require('./exports.js');

test('percentage exports preserve zero, values above ten and source precision', () => {
  const state = { rows: [0, 40.54446138, 100].map((Score, i) => ({ Country: 'European Union', Metric: `Item ${i}`, Year: 2025, Round: 8, Score })), selectedCountries: ['European Union'], source: 'Eurofound', sourceUrl: 'https://www.eurofound.europa.eu/' };
  const rows = housingExportRows(state);
  assert.deepEqual(rows.map(r => r.Score), [0, 40.54446138, 100]);
  assert(rows.every(r => r.Unit === 'Percentage answering No (0–100)' && r.Highlighted));
  assert(housingExportCSV(state).includes('40.54446138'));
});

test('trends retain zero and high percentages and preserve absent years as gaps', () => {
  const rows = [{Country:'A',Metric:'M',Year:2023,Score:0}, {Country:'A',Metric:'M',Year:2025,Score:100}];
  const result = housingTrendSeries(rows, ['A','B'], ['M'], [2023,2024,2025]);
  assert.deepEqual(result[0].indicators[0].values.map(r=>r.score), [0,null,100]);
  assert.deepEqual(result[1].indicators[0].values.map(r=>r.score), [null,null,null]);
});
