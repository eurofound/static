// Keep every sparkline on the same years and 1–8 score scale.
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

function createTrustTrends({ svg, flags, button, onToggle }) {
  const panel = svg.append("g").attr("id", "trustTrends").attr("role", "group")
    .attr("aria-label", "Selected country trust trends, score scale 1 to 8").attr("display", "none")
    .on("click", event => event.stopPropagation());
  let open = false, context = null, hoverYear = null;
  const cellWidth = 144, gap = 16, mobileRow = 112;

  button.addEventListener("click", () => {
    open = !open; hoverYear = null;
    button.setAttribute("aria-expanded", String(open));
    button.title = open ? "Hide country trends" : "Show country trends";
    onToggle();
  });

  function reservedWidth(compact, count) {
    return open && !compact ? Math.max(1, count) * cellWidth + gap : 0;
  }
  function height(chartHeight, compact, metricCount, count) {
    if (!open || !compact) return chartHeight;
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
      label.select(".trend-year").text(isHover ? `${activeYear} · ` : "");
      label.select(".trend-score").text(available ? score.toFixed(1) : "—");
    });
  }
  function clearHover() { hoverYear = null; highlight(null, false); }

  function render(next) {
    context = next;
    panel.attr("display", open ? null : "none");
    if (!open) return;
    const { rows, countries, metrics, years, year, compact, width, chartHeight, margin, innerW, centers, rules, transition } = next;
    if (!years.includes(hoverYear)) hoverYear = null;
    const left = compact ? 16 : margin.left + innerW + gap;
    const top = compact ? chartHeight + 76 : margin.top;
    panel.attr("transform", `translate(${left},${top})`);
    const columnWidth = compact ? (width - 32) / Math.max(1, countries.length) : cellWidth;
    const sparkWidth = columnWidth - 20;
    const x = d3.scaleLinear().domain(d3.extent(years)).range([6, sparkWidth - 6]);
    const y = d3.scaleLinear().domain([1, 8]).range([20, -20]);
    context.columns = { x, y, width: sparkWidth };
    panel.selectAll("text.trend-empty").data(countries.length ? [] : [null]).join("text")
      .attr("class", "trend-empty").attr("x", 2).attr("y", compact ? -12 : 8)
      .selectAll("tspan").data(["Select a country", "to view its trends."]).join("tspan")
      .attr("x", 2).attr("dy", (_, i) => i ? 20 : 0).text(d => d);
    panel.selectAll("line.trend-divider").data(compact ? [] : [null]).join("line")
      .attr("class", "trend-divider").attr("x1", -8).attr("x2", -8)
      .attr("y1", -60).attr("y2", rules[rules.length - 1]);
    panel.selectAll("text.trend-mobile-label").data(compact && countries.length ? metrics : []).join("text")
      .attr("class", "trend-mobile-label").attr("x", 0).attr("y", (_, i) => i * mobileRow - 46).text(d => d);

    const series = trustTrendSeries(rows, countries, metrics, years);
    const columns = panel.selectAll("g.trend-column").data(series, d => d.country).join("g")
      .attr("class", "trend-column").attr("data-country", d => d.country)
      .attr("transform", (_, i) => `translate(${i * columnWidth + 8},0)`);
    columns.each(function(country, countryIndex) {
      const column = d3.select(this), color = countryIndex ? "#0b3d56" : "#566779";
      const header = column.selectAll("foreignObject.name-fo").data([country]).join(enter => {
        const fo = enter.append("foreignObject").attr("class", "name-fo");
        const row = fo.append("xhtml:div").attr("class", "flag-row trend-country");
        row.append("span").attr("class", `fi fi-${flags[country.country]}`).attr("aria-hidden", "true");
        row.append("span").text(country.country);
        return fo;
      });
      header.attr("x", 0).attr("y", compact ? -86 : -76).attr("width", sparkWidth + 6).attr("height", 32);
      const cells = column.selectAll("g.trend-cell").data(country.indicators, d => d.metric).join(enter => {
        const cell = enter.append("g").attr("class", "trend-cell").attr("tabindex", 0).attr("role", "slider");
        cell.append("line").attr("class", "trend-rule");
        cell.append("path").attr("class", "trend-line");
        cell.append("line").attr("class", "trend-guide").attr("y1", -23).attr("y2", 23);
        cell.append("circle").attr("class", "trend-point").attr("r", 3.5);
        const value = cell.append("text").attr("class", "trend-value").attr("y", -29);
        value.append("tspan").attr("class", "trend-year");
        value.append("tspan").attr("class", "trend-score");
        cell.append("rect").attr("class", "trend-hit");
        return cell;
      });
      cells.interrupt().transition(transition).attr("transform", (_, i) => `translate(0,${compact ? i * mobileRow : centers[i]})`);
      cells.attr("aria-label", d => `${country.country}, ${d.metric}, use arrow keys to explore years`)
        .attr("aria-valuemin", years[0]).attr("aria-valuemax", years[years.length - 1])
        .on("pointermove pointerdown", function(event) {
          hoverYear = nearestTrustYear(years, (d3.pointer(event, this)[0] - 6) / (sparkWidth - 12));
          highlight(hoverYear, true);
        })
        .on("pointerleave", clearHover)
        .on("focus", () => { hoverYear ??= year; highlight(hoverYear, true); })
        .on("blur", clearHover)
        .on("keydown", event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End", "Escape"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Escape") return clearHover();
          const index = years.indexOf(hoverYear ?? year);
          hoverYear = event.key === "Home" ? years[0] : event.key === "End" ? years[years.length - 1]
            : years[Math.max(0, Math.min(years.length - 1, index + (event.key === "ArrowRight" ? 1 : -1)))];
          highlight(hoverYear, true);
        });
      cells.select(".trend-line").attr("stroke", color)
        .attr("d", d => d3.line().defined(point => point.score !== null).x(point => x(point.year)).y(point => y(point.score))(d.values));
      cells.select(".trend-point").attr("fill", color);
      cells.select(".trend-hit").attr("x", 0).attr("y", -45).attr("width", sparkWidth).attr("height", 83);
      cells.select(".trend-rule").attr("x1", 0).attr("x2", sparkWidth)
        .attr("y1", (_, i) => compact ? 46 : rules[i] - centers[i])
        .attr("y2", (_, i) => compact ? 46 : rules[i] - centers[i]);
      // Only the first indicator has endpoint years; all other axes stay unlabelled.
      cells.selectAll("text.trend-endpoint").data((_, i) => i ? [] : [years[0], years[years.length - 1]]).join("text")
        .attr("class", "trend-endpoint").attr("x", (_, i) => i ? sparkWidth - 6 : 6).attr("y", 36)
        .attr("text-anchor", (_, i) => i ? "end" : "start").text(d => d);
    });
    highlight(hoverYear, hoverYear !== null);
  }
  return { isOpen: () => open, reservedWidth, height, render };
}
