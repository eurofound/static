// Keep score positions exact; only move points vertically to prevent collisions.
function layoutTrustSwarmRows(points, rowCount, { compact = false, radius = 6 } = {}) {
  const rows = Array.from({ length: rowCount }, () => []);
  const bodyRadius = point => point.Country === "European Union"
    ? Math.SQRT2 * (radius + .75) : radius + .5;
  for (const point of points) if (rows[point.row]) rows[point.row].push(point);
  for (const row of rows) {
    row.sort((a, b) => a.x - b.x || String(a.Country).localeCompare(String(b.Country)));
    const placed = [];
    for (const point of row) {
      const neighbours = placed.filter(other => Math.abs(point.x - other.x) < bodyRadius(point) + bodyRadius(other) + 1);
      const candidates = [0];
      for (const other of neighbours) {
        const spacing = bodyRadius(point) + bodyRadius(other) + 1;
        const offset = Math.sqrt(Math.max(0, spacing * spacing - (point.x - other.x) ** 2));
        candidates.push(other.y - offset, other.y + offset);
      }
      candidates.sort((a, b) => Math.abs(a) - Math.abs(b) || a - b);
      point.y = candidates.find(y => neighbours.every(other => {
        const spacing = bodyRadius(point) + bodyRadius(other) + 1;
        return (point.x - other.x) ** 2 + (y - other.y) ** 2 >= spacing * spacing - 1e-6;
      }));
      placed.push(point);
    }
  }

  // Include the selected-country ring, not just the six-pixel dot itself.
  const halo = radius + 5, padding = 12;
  const extents = rows.map(row => ({
    low: row.length ? Math.min(...row.map(point => point.y)) - halo : -halo,
    high: row.length ? Math.max(...row.map(point => point.y)) + halo : halo,
  }));
  const centers = [], titleY = [], ruleY = [], bounds = [];
  if (compact) {
    let title = -54;
    rows.forEach((row, i) => {
      titleY[i] = title;
      centers[i] = title + 28 - extents[i].low;
      ruleY[i] = centers[i] + extents[i].high + padding;
      bounds[i] = { top: i ? ruleY[i - 1] : title - 18, bottom: ruleY[i] };
      title = ruleY[i] + 32;
    });
  } else {
    rows.forEach((row, i) => {
      centers[i] = i ? Math.max(centers[i - 1] + 90,
        centers[i - 1] + extents[i - 1].high + padding * 2 - extents[i].low)
        : Math.max(0, -44 + padding - extents[i].low);
      titleY[i] = centers[i];
    });
    rows.forEach((row, i) => {
      ruleY[i] = i + 1 < rowCount
        ? (centers[i] + extents[i].high + centers[i + 1] + extents[i + 1].low) / 2
        : Math.max(centers[i] + 44, centers[i] + extents[i].high + padding);
      bounds[i] = { top: i ? ruleY[i - 1] : -44, bottom: ruleY[i] };
    });
  }
  rows.forEach((row, i) => row.forEach(point => { point.y += centers[i]; }));
  return { centers, titleY, ruleY, bounds, axisY: rowCount ? ruleY[rowCount - 1] + (compact ? 30 : 34) : 0 };
}

if (typeof module !== "undefined") module.exports = { layoutTrustSwarmRows };
