const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createYearPlayback } = require("./year-playback.js");

function fixture(years = [2021, 2022, 2023, 2024, 2025]) {
  let year = 2025, nextId = 0;
  const jobs = new Map(), seen = [], states = [];
  const player = createYearPlayback({
    years, getYear: () => year, setYear: value => { year = value; seen.push(value); },
    onPlayingChange: state => states.push(state),
    schedule: callback => { jobs.set(++nextId, callback); return nextId; },
    cancel: id => jobs.delete(id),
  });
  const tick = () => { const [id, callback] = jobs.entries().next().value; jobs.delete(id); callback(); };
  return { player, jobs, seen, states, tick, select: value => { player.pause(); year = value; } };
}

test("play loops chronologically through all five years without duplicate timers", () => {
  const f = fixture();
  f.player.play(); f.player.play();
  for (let i = 0; i < 5; i++) { assert.equal(f.jobs.size, 1); f.tick(); }
  assert.deepEqual(f.seen, [2021, 2022, 2023, 2024, 2025, 2021]);
  assert.deepEqual(f.states, [true]);
});

test("pause cancels playback and a manual year becomes the new resume position", () => {
  const f = fixture();
  f.player.toggle(); f.tick(); f.player.toggle();
  assert.equal(f.jobs.size, 0);
  f.select(2023); f.player.play();
  assert.equal(f.seen.at(-1), 2024);
  assert.deepEqual(f.states, [true, false, true]);
});

test("one available year cannot start playback", () => {
  const f = fixture([2025]); f.player.play();
  assert.equal(f.jobs.size, 0);
  assert.deepEqual(f.seen, []);
});

test("pausing during a year change does not leave a queued advance", () => {
  const jobs = [];
  const player = createYearPlayback({ years: [2021, 2025], getYear: () => 2025,
    setYear: () => player.pause(), schedule: callback => jobs.push(callback) });
  player.play(); assert.equal(jobs.length, 0);
});
