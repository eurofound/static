// Keep every sparkline on the same years and 2–8 score scale.
function trustTrendSeries(rows, countries, metrics, years) {
  const lookup = new Map(rows.map(row => [JSON.stringify([row.Country, row.Metric, row.Year]), row.Score]));
  return countries.map(country => ({ country, indicators: metrics.map(metric => ({
    metric, values: years.map(year => {
      const score = lookup.get(JSON.stringify([country, metric, year]));
      return { year, score: Number.isFinite(score) ? score : null };
    }),
  })) }));
}

function nearestTrustYear(years, fraction) {
  if (!years.length) return null;
  const target = years[0] + Math.max(0, Math.min(1, fraction)) * (years[years.length - 1] - years[0]);
  return years.reduce((best, year) => Math.abs(year - target) < Math.abs(best - target) ? year : best, years[0]);
}

if (typeof module !== "undefined") module.exports = { trustTrendSeries, nearestTrustYear };

function createTrustTrends({ svg, button, onToggle, scoreColor, labelMetric = metric => metric }) {
  const panel = svg.append("g").attr("id", "trustTrends").attr("role", "group")
    .attr("aria-label", "Selected country trust trends, score scale 2 to 8").attr("display", "none")
    .on("click", event => event.stopPropagation());
  let open = false, context = null, hoverYear = null, activeCell = null;
  let closing = false, pendingReveal = false;
  let nextFillId = 0;
  const cellWidth = 144, gap = 16, mobileRow = 94;

  button.addEventListener("click", () => {
    open = !open; hoverYear = null; activeCell = null;
    button.setAttribute("aria-expanded", String(open));
    button.title = open ? "Hide country trends" : "Show country trends";
    button.setAttribute("aria-label", button.title);
    panel.interrupt();
    closing = !open; pendingReveal = open;
    onToggle();
  });

  function sideColumnWidth(width) { return Math.max(96, Math.min(cellWidth, width * .2)); }
  function reservedWidth(stacked, count, width = 1100) {
    return open && !stacked ? Math.max(1, count) * sideColumnWidth(width) + gap : 0;
  }
  function height(chartHeight, stacked, metricCount, count) {
    if (!open || !stacked) return chartHeight;
    return chartHeight + (count ? 96 + metricCount * mobileRow : 96);
  }
  function highlight(year, isHover) {
    if (!context) return;
    const { years, columns, year: selectedYear } = context;
    const activeYear = year ?? selectedYear;
    panel.selectAll("g.trend-cell").each(function(indicator) {
      const cell = d3.select(this), value = indicator.values.find(point => point.year === activeYear);
      const x = columns.x(activeYear), score = value?.score;
      const available = score !== null && Number.isFinite(score);
      cell.attr("aria-valuenow", activeYear)
        .attr("aria-valuetext", `${activeYear}, ${available ? score.toFixed(1) : "no data"}`);
      cell.select(".trend-guide").attr("x1", x).attr("x2", x).attr("display", isHover ? null : "none");
      cell.select(".trend-point").attr("display", available ? null : "none")
        .attr("cx", x).attr("cy", available ? columns.y(score) : 0);
      const label = cell.select(".trend-value").attr("x", Math.max(36, Math.min(columns.width - 36, x)));
      label.select(".trend-year").text(isHover && this === activeCell ? `${activeYear} · ` : "");
      label.select(".trend-score").text(available ? score.toFixed(1) : "—");
    });
  }
  function clearHover() { hoverYear = null; activeCell = null; highlight(null, false); }

  function render(next) {
    context = next;
    if (!open) {
      if (closing) {
        const top=panel.node().transform.baseVal.consolidate()?.matrix.f ?? next.margin.top;
        panel.attr("pointer-events", "none").attr("aria-hidden", "true").interrupt()
          .transition(next.transition).attr("transform", `translate(${next.width + 24},${top})`).attr("opacity", 0)
          .on("end", () => { if (!open) { closing=false; panel.attr("display", "none"); } });
      } else panel.attr("display", "none");
      return;
    }
    const { rows, countries, metrics, years, year, compact, stacked, width, chartHeight, margin, innerW, centers, transition } = next;
    if (!years.includes(hoverYear)) hoverYear = null;
    const left = stacked ? 16 : margin.left + innerW + gap;
    const top = stacked ? chartHeight + 76 : margin.top;
    const columnWidth = stacked ? (width - 32) / Math.max(1, countries.length) : sideColumnWidth(width);
    const distance = Math.max(1, countries.length) * columnWidth + 24;
    context.position = { left, top, distance };
    const wasHidden = panel.attr("display") === "none";
    panel.attr("display", null).attr("pointer-events", null).attr("aria-hidden", "false");
    const fullReveal=pendingReveal;
    if (wasHidden) panel.attr("transform", `translate(${left + distance},${top})`).attr("opacity", 0);
    pendingReveal = false;
    panel.interrupt().transition(transition).attr("transform", `translate(${left},${top})`).attr("opacity", 1);
    const sparkWidth = columnWidth - 20;
    const x = d3.scaleLinear().domain(d3.extent(years)).range([6, sparkWidth - 6]);
    // Keep desktop rows aligned while reducing the 50 px axis-to-axis gap to 37.5 px.
    // Mobile rows are independent: a 94 px pitch reduces their 72 px gap to 54 px.
    const halfHeight = stacked ? 20 : 26.25;
    const y = d3.scaleLinear().domain([2, 8]).range([halfHeight, -halfHeight]);
    context.columns = { x, y, width: sparkWidth };
    panel.selectAll("text.trend-empty").data(countries.length ? [] : [null]).join("text")
      .attr("class", "trend-empty").attr("x", 2).attr("y", stacked ? -12 : 8)
      .selectAll("tspan").data(["Select a country", "to view its trends."]).join("tspan")
      .attr("x", 2).attr("dy", (_, i) => i ? 20 : 0).text(d => d);
    panel.selectAll("text.trend-mobile-label").data(stacked && countries.length ? metrics : []).join("text")
      .attr("class", "trend-mobile-label").attr("x", 0).attr("y", (_, i) => i * mobileRow - 43).text(labelMetric);

    const series = trustTrendSeries(rows, countries, metrics, years);
    const columnJoin=panel.selectAll("g.trend-column").data(series,d=>d.country);
    columnJoin.exit().attr("pointer-events","none").interrupt().transition(transition)
      .attr("transform",`translate(${Math.max(1,countries.length)*columnWidth+columnWidth+8},0)`).attr("opacity",0).remove();
    const entering=columnJoin.enter().append("g").attr("class","trend-column")
      .attr("transform",(_,i)=>`translate(${i*columnWidth+8+(fullReveal?0:columnWidth)},0)`).attr("opacity",fullReveal?1:0);
    const columns=entering.merge(columnJoin).attr("data-country",d=>d.country).attr("pointer-events",null);
    columns.interrupt().transition(transition).attr("transform",(_,i)=>`translate(${i*columnWidth+8},0)`).attr("opacity",1);
    columns.each(function(country) {
      const column = d3.select(this), color = "#747474";
      column.selectAll("text.trend-country").data([country]).join("text")
        .attr("class", "trend-country").attr("x", 0).attr("y", stacked ? -71 : compact ? -125 : -61)
        .attr("dominant-baseline", "central").text(d => d.country);
      const cells = column.selectAll("g.trend-cell").data(country.indicators, d => d.metric).join(enter => {
        const cell = enter.append("g").attr("class", "trend-cell").attr("tabindex", 0).attr("role", "slider");
        cell.append("defs").append("linearGradient").attr("class", "trend-fill")
          .attr("id", () => `trust-trend-fill-${++nextFillId}`)
          .attr("gradientUnits", "userSpaceOnUse").attr("y1", 0).attr("y2", 0);
        cell.append("path").attr("class", "trend-area").attr("fill-opacity", .07)
          .attr("stroke", "none").attr("pointer-events", "none")
          .attr("fill", function() { return `url(#${this.parentNode.querySelector("linearGradient").id})`; });
        cell.append("line").attr("class", "trend-y-axis");
        cell.append("path").attr("class", "trend-line");
        cell.append("line").attr("class", "trend-guide").attr("y1", -23).attr("y2", 23);
        cell.append("circle").attr("class", "trend-point").attr("r", 4);
        const value = cell.append("text").attr("class", "trend-value").attr("y", -29);
        value.append("tspan").attr("class", "trend-year");
        value.append("tspan").attr("class", "trend-score");
        cell.append("rect").attr("class", "trend-hit");
        return cell;
      });
      cells.interrupt().transition(transition).attr("transform", (_, i) => `translate(0,${stacked ? i * mobileRow : centers[i]})`);
      cells.attr("aria-label", d => `${country.country}, ${labelMetric(d.metric)}, use arrow keys to explore years`)
        .attr("aria-valuemin", years[0]).attr("aria-valuemax", years[years.length - 1])
        .on("pointermove pointerdown", function(event) {
          activeCell = this;
          hoverYear = nearestTrustYear(years, (d3.pointer(event, this)[0] - 6) / (sparkWidth - 12));
          highlight(hoverYear, true);
        })
        .on("pointerleave", clearHover)
        .on("focus", function() { activeCell = this; hoverYear ??= year; highlight(hoverYear, true); })
        .on("blur", clearHover)
        .on("keydown", event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End", "Escape"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Escape") return clearHover();
          activeCell = event.currentTarget;
          const index = years.indexOf(hoverYear ?? year);
          hoverYear = event.key === "Home" ? years[0] : event.key === "End" ? years[years.length - 1]
            : years[Math.max(0, Math.min(years.length - 1, index + (event.key === "ArrowRight" ? 1 : -1)))];
          highlight(hoverYear, true);
        });
      // Each year uses the scatter's score colour, softly blended between years.
      // Keep the existing line and axes above the transparent area.
      cells.select(".trend-fill").attr("x1", x(years[0])).attr("x2", x(years[years.length - 1]))
        .selectAll("stop").data(d => d.values.filter(point => Number.isFinite(point.score)), d => d.year).join("stop")
        .attr("offset", point => `${100 * (x(point.year) - x(years[0])) / Math.max(1, x(years[years.length - 1]) - x(years[0]))}%`)
        .attr("stop-color", point => scoreColor(point.score));
      cells.select(".trend-area")
        .attr("d", d => d3.area().defined(point => Number.isFinite(point.score))
          .x(point => x(point.year)).y0(y(2)).y1(point => y(point.score))(d.values));
      cells.select(".trend-line").attr("stroke", color)
        .attr("d", d => d3.line().defined(point => point.score !== null).x(point => x(point.year)).y(point => y(point.score))(d.values));
      cells.select(".trend-point").attr("fill", "#fff");
      cells.select(".trend-guide").attr("y1", -halfHeight - 3).attr("y2", halfHeight + 3);
      cells.select(".trend-value").attr("y", stacked ? -29 : -33);
      cells.selectAll("circle.trend-endpoint-dot")
        .data(d => [d.values[0], d.values[d.values.length - 1]].filter(point => point?.score !== null && Number.isFinite(point?.score)), d => d.year)
        .join("circle").attr("class", "trend-endpoint-dot").attr("r", 3)
        .attr("cx", d => x(d.year)).attr("cy", d => y(d.score)).attr("fill", color)
        .attr("pointer-events", "none");
      cells.select(".trend-point").raise();
      cells.select(".trend-hit").attr("x", 0).attr("y", -45).attr("width", sparkWidth).attr("height", 83);
      cells.select(".trend-y-axis").attr("x1", 6).attr("x2", 6)
        .attr("y1", y(2)).attr("y2", y(8));
      // Only the first indicator has endpoint years; all other axes stay unlabelled.
      cells.selectAll("text.trend-endpoint").data((_, i) => i ? [] : [years[0], years[years.length - 1]]).join("text")
        .attr("class", "trend-endpoint").attr("x", (_, i) => i ? sparkWidth - 6 : 6).attr("y", halfHeight + 16)
        .attr("text-anchor", (_, i) => i ? "end" : "start").text(d => d);
    });
    if (activeCell && !panel.node().contains(activeCell)) { activeCell = null; hoverYear = null; }
    highlight(hoverYear, hoverYear !== null);
  }
  return { isOpen: () => open, isVisible: () => open || closing, reservedWidth, height, render };
}
