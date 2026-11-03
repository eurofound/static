"""Validate the dashboard's supplied percentages without third-party dependencies."""
import csv
import hashlib
import json
from pathlib import Path

root = Path(__file__).parent
manifest = json.loads((root / 'data-provenance.json').read_text(encoding='utf-8'))
data = root / 'Housing.csv'
assert hashlib.sha256(data.read_bytes()).hexdigest() in {manifest['source_sha256'], manifest['repository_data_sha256']}
with data.open(encoding='utf-8-sig', newline='') as stream:
    reader = csv.DictReader(stream)
    assert reader.fieldnames == ['Country', 'Metric', 'Year', 'Score', 'Round']
    rows = list(reader)
assert len(rows) == 504
assert len({(r['Country'], r['Metric'], r['Year']) for r in rows}) == 504
countries = {r['Country'] for r in rows}
assert len(countries) == 28 and 'European Union' in countries
for country in countries:
    for metric in manifest['metrics']:
        group = [r for r in rows if r['Country'] == country and r['Metric'] == metric]
        assert {r['Year'] for r in group} == {'2023', '2024', '2025'}
        for row in group:
            assert int(row['Round']) == manifest['rounds'][row['Year']]
            assert 0 <= float(row['Score']) <= 100
eu_holiday = [r for r in rows if r['Country'] == 'European Union'
              and r['Metric'] == 'Cannot afford a one-week annual holiday away from home']
assert [float(r['Score']) for r in sorted(eu_holiday, key=lambda r: r['Year'])] == [36.82142611, 42.68193282, 40.54446138]
print('PASS: original source hash, all 504 values, 28 countries/EU, six metrics, three rounds, and EU fixtures.')
