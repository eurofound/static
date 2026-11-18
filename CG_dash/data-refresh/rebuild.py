"""Reproduce CG_data_updated.csv without changing the original CG_data.csv.

Run: python CG_dash/data-refresh/rebuild.py
Requires only Python's standard library. The baseline and output hashes are checked.
Source selections and retrieval hashes are recorded in CG_data_updated.metadata.json.
"""
from pathlib import Path
import csv,hashlib,io,json

HERE=Path(__file__).resolve().parent
delta=json.loads((HERE/'updates-2026-11-18.json').read_text(encoding='utf-8'))
baseline=HERE.parent/'CG_data.csv'
assert hashlib.sha256(baseline.read_bytes()).hexdigest()==delta['baseline_sha256'],'Unexpected baseline: use the original CG_data.csv identified in the metadata.'
with baseline.open(encoding='utf-8-sig',newline='') as f:
 reader=csv.reader(f);assert next(reader)==delta['fields'];rows=[r for r in reader if r]
assert len(rows)==delta['baseline_rows']
for replacement in delta['replacements']:rows[replacement['row_index']]=replacement['values']
rows.extend(delta['append'])
buffer=io.StringIO(newline='');writer=csv.writer(buffer,lineterminator='\n');writer.writerow(delta['fields']);writer.writerows(rows)
raw=('\ufeff'+buffer.getvalue()).encode('utf-8')
assert hashlib.sha256(raw).hexdigest()==delta['output_sha256'],'Reproduced data differs from the release.'
output=HERE.parent/'CG_data_updated.csv';output.write_bytes(raw)
print(f'Reproduced {len(rows)} observations in {output.name}; SHA-256 verified.')
