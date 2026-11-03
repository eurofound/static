// One timer advances through the available survey years, including the last-to-first loop.
function createYearPlayback({ years, getYear, setYear, onPlayingChange = () => {}, delay = 700,
  schedule = setTimeout, cancel = clearTimeout }) {
  let playing = false, timer = null;
  function pause() {
    if (timer !== null) cancel(timer);
    timer = null;
    if (!playing) return;
    playing = false;
    onPlayingChange(false);
  }
  function advance() {
    timer = null;
    if (!playing) return;
    const index = years.indexOf(getYear());
    setYear(years[(index + 1) % years.length]);
    if (playing) timer = schedule(advance, delay);
  }
  function play() {
    if (playing || years.length < 2) return;
    playing = true;
    onPlayingChange(true);
    advance();
  }
  return { play, pause, toggle: () => playing ? pause() : play() };
}

if (typeof module !== "undefined") module.exports = { createYearPlayback };
