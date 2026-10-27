function trustExportRows(state) {
  return state.rows.map(row => ({
    Country: row.Country,
    Indicator: row.Metric,
    Year: row.Year,
    Round: row.Round,
    Score: row.Score,
    Unit: "Mean score (1–10)",
    Highlighted: state.selectedCountries.includes(row.Country),
    Source: state.source,
    SourceURL: state.sourceUrl,
  }));
}

function trustExportCSV(state) {
  const rows = trustExportRows(state);
  const headers = ["Country", "Indicator", "Year", "Round", "Score", "Unit", "Highlighted", "Source", "SourceURL"];
  const cell = value => {
    let text = String(value ?? "");
    if (typeof value === "string" && /^[=+@\-\t\r]/.test(text)) text = "'" + text;
    return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
  };
  return [headers.join(","), ...rows.map(row => headers.map(key => cell(row[key])).join(","))].join("\r\n");
}

function trustedTrustParent(origin, ownOrigin) {
  if (origin === ownOrigin && origin !== "null") return true;
  try {
    const url = new URL(origin);
    return url.protocol === "https:" && (
      url.hostname === "eurofound.europa.eu" ||
      url.hostname.endsWith(".eurofound.europa.eu") ||
      url.hostname === "app.storyblok.com"
    );
  } catch { return false; }
}

if (typeof module !== "undefined") module.exports = { trustExportRows, trustExportCSV, trustedTrustParent };

if (typeof window !== "undefined") (() => {
  const NS = "http://www.w3.org/2000/svg";
  const assetCache = new Map();
  const sourceURL = "https://www.eurofound.europa.eu/en/surveys-and-data/surveys/living-and-working-in-the-eu-e-survey";
  const status = document.getElementById("downloadStatus");
  let imageExport = null;

  function save(blob, filename) {
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = filename;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  function element(name, attributes = {}, text = "") {
    const node = document.createElementNS(NS, name);
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
    if (text) node.textContent = text;
    return node;
  }
  function assetDataURL(url) {
    if (!assetCache.has(url)) {
      const request = fetch(url).then(response => {
        if (!response.ok) throw new Error("An image asset could not be loaded.");
        return response.blob();
      }).then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("An image asset could not be read."));
        reader.readAsDataURL(blob);
      })).catch(error => { assetCache.delete(url); throw error; });
      assetCache.set(url, request);
    }
    return assetCache.get(url);
  }
  function addText(parent, text, x, y, maxWidth, fontSize, weight = 400, color = "#17202a") {
    const canvas = document.createElement("canvas"), context = canvas.getContext("2d");
    context.font = `${weight} ${fontSize}px system-ui`;
    const lines = []; let line = "";
    for (const word of text.split(/\s+/)) {
      const next = line ? line + " " + word : word;
      if (line && context.measureText(next).width > maxWidth) { lines.push(line); line = word; }
      else line = next;
    }
    if (line) lines.push(line);
    for (const content of lines) {
      parent.append(element("text", { x, y, fill: color, "font-family": "system-ui, sans-serif", "font-size": fontSize, "font-weight": weight }, content));
      y += fontSize * 1.5;
    }
    return y;
  }

  async function downloadCSV() {
    await window.trustDataReady;
    const state = window.getTrustExportState();
    save(new Blob(["\ufeff", trustExportCSV(state)], { type: "text/csv;charset=utf-8" }), `eurofound-trust-${state.year}.csv`);
  }

  async function makePNG() {
    await window.trustDataReady;
    await document.fonts.ready;
    // Finish any active year-change animation before taking a coherent snapshot.
    const source = document.getElementById("chart");
    await Promise.all(Array.from(source.querySelectorAll("*")).map(node => {
      const active = d3.active(node);
      return active ? active.end().catch(() => {}) : Promise.resolve();
    }));
    const state = window.getTrustExportState(), clone = source.cloneNode(true);
    const view = source.viewBox.baseVal, chartWidth = view.width, chartHeight = view.height;
    const styleNames = ["fill", "fill-opacity", "stroke", "stroke-width", "stroke-opacity", "stroke-linecap", "opacity", "font-size", "font-weight", "font-family", "dominant-baseline", "text-anchor"];
    const originalNodes = [source, ...source.querySelectorAll("*")], cloneNodes = [clone, ...clone.querySelectorAll("*")];
    originalNodes.forEach((node, i) => {
      const styles = getComputedStyle(node);
      for (const name of styleNames) cloneNodes[i].style.setProperty(name, styles.getPropertyValue(name));
      cloneNodes[i].removeAttribute("id");
    });
    clone.querySelectorAll("path.highlight").forEach(path => {
      path.removeAttribute("stroke-dasharray");
      path.removeAttribute("stroke-dashoffset");
    });

    // Canvas exports must contain native SVG, not foreignObject or external flag CSS.
    const labels = Array.from(source.querySelectorAll(".name-fo")).map((node, i) => {
      const row = node.querySelector(".flag-row"), flag = row.querySelector(".fi");
      const background = getComputedStyle(flag).backgroundImage;
      const match = background.match(/^url\(["']?(.*?)["']?\)$/);
      if (!match) throw new Error("A country flag could not be exported.");
      return { node: clone.querySelectorAll(".name-fo")[i], x: +node.getAttribute("x"), y: +node.getAttribute("y"), country: row.textContent, font: getComputedStyle(row).fontSize, flagURL: match[1] };
    });
    const images = await Promise.all([...labels.map(label => assetDataURL(label.flagURL)), assetDataURL(new URL("./eurofound-logo.svg", location.href).href)]);
    labels.forEach((label, i) => {
      const group = element("g", { transform: `translate(${label.x},${label.y})` });
      group.append(element("image", { x: 0, y: 6, width: 24, height: 18, href: images[i] }));
      group.append(element("text", { x: 30, y: 15, "dominant-baseline": "central", "font-family": "system-ui, sans-serif", "font-size": label.font, "font-weight": 800, fill: "#111" }, label.country));
      label.node.replaceWith(group);
    });

    const padding = 20, imageWidth = chartWidth + padding * 2;
    const output = element("svg", { xmlns: NS, width: imageWidth });
    output.append(element("rect", { width: "100%", height: "100%", fill: "white" }));
    let y = addText(output, state.title, padding, 34, chartWidth, chartWidth < 680 ? 22 : 28, 700);
    const selection = state.selectedCountries.length ? `Highlighted: ${state.selectedCountries.join(", ")}` : "All countries";
    y = addText(output, `${state.year} · ${selection}`, padding, y + 4, chartWidth, 15);
    output.append(element("circle", { cx: padding + 6, cy: y + 6, r: 6, fill: "#c8ced3", stroke: "black", "stroke-width": 2 }));
    y = addText(output, "EU27 average", padding + 20, y + 11, chartWidth - 20, 14);
    clone.setAttribute("x", padding); clone.setAttribute("y", y);
    clone.setAttribute("width", chartWidth); clone.setAttribute("height", chartHeight);
    output.append(clone); y += chartHeight + 16;
    output.append(element("line", { x1: padding, x2: imageWidth - padding, y1: y, y2: y, stroke: "#dfe5e8" }));
    y += 24;
    const logoWidth = Math.max(64, chartWidth * .1), logoHeight = logoWidth * 162 / 244;
    const footerY = y;
    y = addText(output, `Source: ${state.source}. Note: Survey respondents rate how much they trust each entity on a scale from 1 (Do not trust at all) to 10 (Trust completely).`, padding, y, chartWidth - logoWidth - 20, 14, 400, "#647180");
    output.append(element("image", { x: imageWidth - padding - logoWidth, y: footerY - 14, width: logoWidth, height: logoHeight, href: images[images.length - 1] }));
    const imageHeight = Math.ceil(Math.max(y, footerY + logoHeight) + padding);
    output.setAttribute("height", imageHeight); output.setAttribute("viewBox", `0 0 ${imageWidth} ${imageHeight}`);
    const xml = new XMLSerializer().serializeToString(output);
    const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
    try {
      const image = new Image();
      await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error("The chart image could not be created.")); image.src = url; });
      const canvas = document.createElement("canvas");
      canvas.width = imageWidth * 2; canvas.height = imageHeight * 2;
      const context = canvas.getContext("2d"); context.scale(2, 2); context.drawImage(image, 0, 0);
      const blob = await new Promise((resolve, reject) => canvas.toBlob(result => result ? resolve(result) : reject(new Error("The PNG could not be created.")), "image/png"));
      save(blob, `eurofound-trust-${state.year}.png`);
    } finally { URL.revokeObjectURL(url); }
  }
  function downloadPNG() {
    if (!imageExport) imageExport = makePNG().finally(() => { imageExport = null; });
    return imageExport;
  }
  function reportFailure(error) {
    console.error("Trust dashboard export:", error);
    status.textContent = "The download could not be created. Please try again.";
  }
  function runExport(kind) {
    status.textContent = "";
    return (kind === "png" ? downloadPNG() : downloadCSV()).catch(reportFailure);
  }
  function getData() { return trustExportRows(window.getTrustExportState()); }
  function getCSV() { return trustExportCSV(window.getTrustExportState()); }
  window.getChartData = getData;
  window.getChartCSV = getCSV;
  window.downloadChartCSV = () => runExport("csv");
  window.downloadChartPNG = () => runExport("png");
  window.chart = { getCSV, exportChartLocal: options => {
    if (!options?.type || options.type === "image/png") return runExport("png");
  } };
  window.addEventListener("message", async event => {
    if (window.parent === window || event.source !== window.parent || !trustedTrustParent(event.origin, location.origin)) return;
    const type = typeof event.data === "string" ? event.data : event.data?.type;
    if (type === "download-png") return runExport("png");
    if (type === "download-csv") return runExport("csv");
    if (type === "get-chart-data") {
      try {
        await window.trustDataReady;
        event.source.postMessage({ type: "chart-data", data: getData(), meta: { year: window.getTrustExportState().year, source: sourceURL } }, event.origin);
      } catch (error) { reportFailure(error); }
    }
  });
  window.trustDataReady.then(() => {
    if (window.parent === window || !document.referrer) return;
    const origin = new URL(document.referrer).origin;
    if (trustedTrustParent(origin, location.origin)) window.parent.postMessage({ type: "chart-ready", title: "Trust indicators dashboard", rowCount: getData().length }, origin);
  }).catch(() => {});
})();
