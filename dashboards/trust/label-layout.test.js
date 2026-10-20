const { test } = require("node:test");
const assert = require("node:assert/strict");
const { layoutCountryLabels } = require("./label-layout.js");

test("nearby dots get separate labels, including at either plot edge", () => {
  // Cover all anchor positions, including equal scores, with unequal label widths.
  for (let a = 0; a <= 802; a += 10) {
    for (let b = 0; b <= 802; b += 10) {
      const labels = layoutCountryLabels([
        { country: "European Union", anchorX: a, width: 204 },
        { country: "Luxembourg", anchorX: b, width: 170 },
      ], 0, 802);
      assert.ok(labels[0].x >= 0);
      assert.ok(labels[1].x + labels[1].width <= 802);
      assert.ok(labels[0].x + labels[0].width + 16 <= labels[1].x);
    }
  }
});

test("a remaining country recentres after the other country is removed", () => {
  const belgium = { country: "Belgium", anchorX: 650, width: 120 };
  const austria = { country: "Austria", anchorX: 660, width: 110 };
  const pair = layoutCountryLabels([belgium, austria], 0, 802);
  const single = layoutCountryLabels([austria], 0, 802);
  assert.deepEqual(single.map(label => label.country), ["Austria"]);
  assert.equal(single[0].x, 605);
  assert.notEqual(single[0].x, pair.find(label => label.country === "Austria").x);
  assert.deepEqual(layoutCountryLabels([], 0, 802), []);
});

test("selection order does not change the position of tied country labels", () => {
  const labels = [
    { country: "Sweden", anchorX: 790, width: 120 },
    { country: "Finland", anchorX: 790, width: 120 },
  ];
  assert.deepEqual(
    layoutCountryLabels(labels, 0, 802),
    layoutCountryLabels([...labels].reverse(), 0, 802),
  );
});
