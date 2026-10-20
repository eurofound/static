"""Validate the dashboard's survey coverage without network or dependencies."""
import csv
import json
import math
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ROUNDS = {2021: 3, 2022: 5, 2023: 6, 2024: 7, 2025: 8}
METRICS = {
    "Trust in country's government",
    "Trust in the European Union",
    "Trust in the healthcare system",
    "Trust in the news media",
    "Trust in the police",
    "Trust in social media",
    "Trust in people",
}
COUNTRIES = {
    "European Union", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
    "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta",
    "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden",
}

with (ROOT / "Trust.csv").open(encoding="utf-8-sig", newline="") as stream:
    rows = list(csv.DictReader(stream))

assert len(rows) == 980, "Expected all 28 countries/aggregate × 7 metrics × 5 rounds"
keys = [(r["Country"], r["Metric"], int(r["Year"]), int(r["Round"])) for r in rows]
expected = {(c, m, y, n) for c in COUNTRIES for m in METRICS for y, n in ROUNDS.items()}
assert set(keys) == expected, "Missing, unexpected or excluded survey series"
assert all(n == 1 for n in Counter(keys).values()), "Duplicate observations"
assert all(math.isfinite(float(r["Score"])) and 1 <= float(r["Score"]) <= 10 for r in rows)
assert all(len(r["Score"].split(".")[-1]) == 1 for r in rows), "Expected one decimal place"

eu = {(int(r["Year"]), r["Metric"]): float(r["Score"]) for r in rows if r["Country"] == "European Union"}
# Known published observations catch selecting round 4 or averaging country means.
assert eu[2021, "Trust in country's government"] == 3.9
assert eu[2021, "Trust in the healthcare system"] == 5.9
for metric, value in {
    "Trust in country's government": 3.6,
    "Trust in the European Union": 4.5,
    "Trust in the healthcare system": 5.7,
    "Trust in the news media": 4.0,
    "Trust in the police": 5.9,
    "Trust in social media": 3.2,
    "Trust in people": 5.0,
}.items():
    assert eu[2025, metric] == value, f"Unexpected EU 2025 score: {metric}"

provenance = json.loads((ROOT / "data-provenance.json").read_text(encoding="utf-8"))
assert {r["year"]: r["round"] for r in provenance["rounds"]} == ROUNDS
assert {r["metric"] for r in provenance["indicators"]} == METRICS
assert provenance["records"] == len(rows)
assert provenance["excludedRound"] == 4
print("PASS: 980 scores, 7 shared indicators, 28 countries/aggregate, rounds 3/5/6/7/8; round 4 excluded.")
