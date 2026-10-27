const { test } = require("node:test");
const assert = require("node:assert/strict");
const { trustExportRows, trustExportCSV, trustedTrustParent } = require("./exports.js");

const state = {
  year: 2025, round: 8, selectedCountries: ["Belgium"],
  source: "Eurofound, Living and working in the EU e-survey", sourceUrl: "https://www.eurofound.europa.eu/",
  rows: [
    { Country: "Belgium", Metric: "Trust in people", Year: 2025, Round: 8, Score: 5.3 },
    { Country: "Austria", Metric: "Trust in people", Year: 2025, Round: 8, Score: 5.6 },
  ],
};
test("exports keep the displayed country population, scores, year and highlight state", () => {
  const data = trustExportRows(state);
  assert.equal(data.length, 2);
  assert.deepEqual(data.map(row => row.Score), [5.3, 5.6]);
  assert.deepEqual(data.map(row => row.Highlighted), [true, false]);
  assert.ok(data.every(row => row.Year === 2025 && row.Round === 8 && row.Unit === "Mean score (1–10)"));
  assert.equal(data[0].Source, state.source);
  assert.equal(state.rows[0].Highlighted, undefined);
});
test("CSV quotes source commas and embedded quotes, and guards spreadsheet formulas", () => {
  const csv = trustExportCSV({ ...state, rows: [{ ...state.rows[0], Metric: 'A "quoted", indicator', Country: '=SUM(A1)' }] });
  assert.match(csv, /'\=SUM\(A1\)/);
  assert.match(csv, /"A ""quoted"", indicator"/);
  assert.ok(csv.includes('"Eurofound, Living and working in the EU e-survey"'));
  assert.equal(csv.split("\r\n").length, 2);
});
test("embed hooks accept the website and Storyblok but reject unrelated origins", () => {
  const own = "https://static.eurofound.europa.eu";
  for (const origin of [own, "https://www.eurofound.europa.eu", "https://app.storyblok.com"]) assert.equal(trustedTrustParent(origin, own), true);
  for (const origin of ["null", "https://evil.example", "https://www.eurofound.europa.eu.evil.example", "http://www.eurofound.europa.eu", "not-a-url"]) assert.equal(trustedTrustParent(origin, own), false);
  assert.equal(trustedTrustParent("http://127.0.0.1:3011", "http://127.0.0.1:3011"), true);
});
