const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({});
for(const file of ['data','sushi','lives-data'])vm.runInContext(fs.readFileSync(`dist/${file}.js`,'utf8'),ctx);
const people=vm.runInContext('PEOPLE',ctx),data=vm.runInContext('LIVES_RESEARCH',ctx);
assert.equal(data.people.length,5);assert.equal(data.people.reduce((n,p)=>n+p.records.length,0),157);assert.equal(data.people.reduce((n,p)=>n+p.episodes.length,0),24);
assert.equal(people.find(p=>p.id==='sushi').nodes.length,97);
let markers=0;
for(const life of data.people){
 const p=people.find(p=>p.id===life.id);assert.equal(p.nodes.length,life.records.length);
 assert.ok(p.nodes.some(n=>n.xy));
 for(const [i,n] of p.nodes.entries()){
  assert.equal(n.id,life.records[i].id);assert.equal(n.coordinates,null);
  if(i)assert.ok(n.year>=p.nodes[i-1].year);
  if(n.xy){markers++;assert.equal(n.xy.length,2);assert.ok(n.xy.every(Number.isFinite));}
  for(const e of n.evidence)assert.ok(data.sources[e.source]?.url);
 }
 for(const e of life.episodes){assert.equal(e.year,null);for(const s of e.evidence)assert.ok(data.sources[s.source]?.url);}
}
assert.equal(markers,64);
const review=JSON.parse(fs.readFileSync('research/people/map-review.json','utf8'));
const records=new Map(people.flatMap(p=>p.nodes).map(n=>[n.id,n]));
assert.equal(Object.keys(review.records).length,48);
for(const [id,r] of Object.entries(review.records)){
 const n=records.get(id);assert.ok(n,id);assert.ok(n.locationReview.presenceBasis);
 const place=review.places[r.placeId];assert.ok(place);
 assert.deepEqual(Array.from(n.xy),place.xy);
 assert.ok(n.xy[0]>70&&n.xy[0]<140&&n.xy[1]>15&&n.xy[1]<55);
 for(const ref of place.sources)assert.ok(review.sources[ref]?.url);
 assert.ok(!review.withheld[id]);
}
for(const id of Object.keys(review.withheld)){assert.ok(records.has(id));assert.equal(records.get(id).xy,null,id);}
assert.deepEqual(Array.from(records.get('qinliangyu-005').xy),[119.75,40.01]);
assert.deepEqual(Array.from(records.get('qiujin-014').xy),[120.43,30.88]);
assert.deepEqual(Array.from(records.get('xuanzang-007').xy),[108.91,35.33]);
const li=people.find(p=>p.id==='liqingzhao');assert.equal(li.nodes.find(n=>n.id==='liqingzhao-027').xy,null);
const qiu=people.find(p=>p.id==='qiujin');assert.ok(qiu.nodes[0].year>qiu.birth);assert.equal(qiu.nodes.find(n=>n.id==='qiujin-006').xy,null);
// Daily records must not mistake companions' luggage or a distant view for a visit.
assert.equal(records.get('xuxiake-003').locationReview.name,'天台弥陀庵废址一带');
assert.equal(records.get('xuxiake-038').xy,null);
assert.equal(records.get('xuxiake-050').locationReview.name,'天台琼台一带');
assert.equal(records.get('xuxiake-046').locationReview.name,'天台高明寺一带');
assert.deepEqual(Array.from(records.get('xuanzang-005').xy),[108.91,34.28]);
assert.equal(records.get('qinliangyu-021').xy,null);
const xu=people.find(p=>p.id==='xuxiake');
assert.deepEqual(Array.from(xu.nodes.filter(n=>n.year===1613),n=>n.id),['xuxiake-002','xuxiake-003',...Array.from({length:11},(_,i)=>`xuxiake-${String(i+30).padStart(3,'0')}`),'xuxiake-013','xuxiake-014']);
assert.equal(xu.nodes.filter(n=>n.year===1632).length,13);
console.log('PASS: 157 annual records, 24 undated episodes, 64 regional markers, 48 geography reviews; diary chronology and withheld locations preserved');
// Region-only evidence must remain usable without inventing a person coordinate.
const hunan=records.get('qiujin-001');
assert.equal(hunan.xy,null);assert.equal(hunan.area.name,'湖南一带');
assert.ok(hunan.locationReview.sources.includes('AREA-HUNAN'));
assert.equal(records.get('liqingzhao-027').area,null); // shipment is not a personal visit
assert.equal(records.get('qinliangyu-019').area,null); // unfulfilled journey
let areas=0;
for(const n of records.values())if(n.area){areas++;const [w,s,e,north]=n.area.bounds;assert.ok([w,s,e,north].every(Number.isFinite));assert.ok(w<e&&s<north);assert.ok(n.area.note);}
assert.equal(areas,72);
for(const id of Object.keys(review.withheld))assert.equal(records.get(id).area,null,id);
console.log('PASS: 72 regional displays, including a province-only record without a point; unvisited places excluded');

for(const [id,a] of Object.entries(review.areas)){const n=records.get(id);assert.equal(n.xy,null,id);assert.ok(n.area,id);assert.ok(a.sources.every(s=>review.sources[s]?.url),id);}
assert.equal(records.get('qinliangyu-002').area.name,'邓坎（今凤冈南部）一带');
assert.equal(records.get('qinliangyu-021').area,null);
// Every lazily published biography must retain the same events and working citations.
const files=vm.runInContext(fs.readFileSync('dist/life-files.js','utf8')+';LIFE_FILES',ctx);
for(const life of data.people){
 const part=JSON.parse(fs.readFileSync('dist/'+files[life.id].split('?')[0],'utf8'));
 assert.deepEqual(part.life,JSON.parse(JSON.stringify(life)));
 for(const item of [...part.life.records,...part.life.episodes]){
  for(const e of item.evidence)assert.ok(part.sources[e.source]?.url);
  for(const id of item.locationReview?.sources||[])assert.ok(part.geoSources[id]?.url);
 }
}

// Spatial itinerary references carry their own citations and must not acquire inferred years.
const route = data.people.find(p => p.id === 'xuanzang').westwardRoute;
const mapped = route.groups.flatMap(g => g.stops).filter(stop => stop.geography);
assert.equal(mapped.length, 20);
assert.equal(new Set(mapped.map(stop => stop.id)).size, 20);
assert.equal(mapped.filter(stop => stop.geography.kind === 'point').length, 3);
for (const stop of mapped) {
 const geo = stop.geography;
 assert.equal(stop.year, undefined);
 assert.ok(geo.sources.every(id => data.sources[id]?.url));
 const numbers = geo.xy || geo.bounds;
 assert.ok(numbers.every(Number.isFinite));
 if (geo.kind === 'area') {
  assert.equal(geo.xy, undefined);
  assert.ok(geo.bounds[0] < geo.bounds[2] && geo.bounds[1] < geo.bounds[3]);
 }
}
assert.deepEqual(Array.from(mapped.find(stop => stop.id === 'west-05').geography.xy), [96.2031,40.2467]);
assert.deepEqual(Array.from(mapped.find(stop => stop.id === 'west-12').geography.xy), [89.5278,42.8525]);

assert.deepEqual(Array.from(mapped.find(stop => stop.id === "west-20").geography.xy), [75.2033,42.8019]);
assert.ok(mapped.find(stop => stop.id === "west-18").geography.note.includes("争论"));
