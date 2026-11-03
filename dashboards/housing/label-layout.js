// Keep the selected countries' measured labels inside the plot, in dot order.
function layoutCountryLabels(labels, minX, maxX, gap = 16) {
  const placed = labels
    .map(label => ({
      ...label,
      row: 0,
      x: Math.max(minX, Math.min(maxX - label.width, label.anchorX - label.width / 2)),
    }))
    .sort((a, b) => a.anchorX - b.anchorX || a.country.localeCompare(b.country));

  // Narrow embeds use two label rows instead of clipping long country names.
  if (placed.reduce((sum, label) => sum + label.width, 0) + gap * Math.max(0, placed.length - 1) > maxX - minX) {
    return placed.map((label, row) => ({ ...label, row }));
  }

  for (let i = 1; i < placed.length; i++) {
    placed[i].x = Math.max(placed[i].x, placed[i - 1].x + placed[i - 1].width + gap);
  }
  for (let i = placed.length - 1; i >= 0; i--) {
    const right = i === placed.length - 1 ? maxX : placed[i + 1].x - gap;
    placed[i].x = Math.min(placed[i].x, right - placed[i].width);
  }
  return placed;
}

if (typeof module !== "undefined") module.exports = { layoutCountryLabels };
