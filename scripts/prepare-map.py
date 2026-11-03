"""Prepare downloaded Natural Earth 1:50m GeoJSON (input directory argument)."""
import json
import pathlib
import sys

source = pathlib.Path(sys.argv[1])
dest = pathlib.Path(__file__).resolve().parents[1] / 'dist'

def points(coords):
    if not coords:
        return
    if isinstance(coords[0], (float, int)):
        yield coords
    else:
        for child in coords:
            yield from points(child)

def rounded(coords):
    return [round(x, 4) if isinstance(x, (float, int)) else rounded(x) for x in coords]

def prepare(name, regional=False):
    data = json.loads((source / (name + '.json')).read_text())
    result = []
    for f in data['features']:
        props = f['properties']
        if props.get('featurecla') in ['Reservoir', 'Lake Centerline']:
            continue
        coords = f['geometry']['coordinates']
        if regional:
            pts = list(points(coords))
            if not any(40 <= p[0] <= 150 and -10 <= p[1] <= 65 for p in pts):
                continue
        result.append({'type': 'Feature', 'properties': {
            'name': props.get('name_zh') or props.get('name') or '',
            'featurecla': props.get('featurecla')}, 'geometry': {
            'type': f['geometry']['type'], 'coordinates': rounded(coords)}})
    return result

for name, features in [('land', prepare('land')), ('water', prepare('rivers_lake_centerlines', True) + prepare('lakes', True))]:
    data = {'type': 'FeatureCollection', 'source': 'Natural Earth 1:50m; modern geographic reference; public domain', 'features': features}
    (dest / (name + '.json')).write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')))
    print(name, len(features), 'features')
