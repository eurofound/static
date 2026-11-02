// Keep scores and row heights exact; allow crowding only near the row edges.
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

  // Leave room for selected-country rings. Preserve the central swarm and
  // smoothly compress its tails, permitting overlap instead of growing rows.
  const halo = radius + 5, limit = 44 - halo - 2, shoulder = Math.min(18, limit / 2 + 3);
  const boundedOffset = value => {
    const distance = Math.abs(value);
    if (distance <= shoulder) return value;
    return Math.sign(value) * (shoulder + (limit - shoulder) *
      (1 - Math.exp(-(distance - shoulder) / (limit - shoulder))));
  };
  const centers = [], titleY = [], ruleY = [], bounds = [];
  rows.forEach((row, i) => {
    centers[i] = compact ? i * 136 + 8 : i * 90;
    titleY[i] = compact ? centers[i] - 62 : centers[i];
    ruleY[i] = centers[i] + (compact ? 56 : 44);
    bounds[i] = { top: i ? ruleY[i - 1] : compact ? -72 : -44, bottom: ruleY[i] };
    row.forEach(point => { point.y = centers[i] + boundedOffset(point.y); });
  });
  return { centers, titleY, ruleY, bounds, axisY: rowCount ? ruleY[rowCount - 1] + (compact ? 30 : 34) : 0 };
}

if (typeof module !== "undefined") module.exports = { layoutTrustSwarmRows };
