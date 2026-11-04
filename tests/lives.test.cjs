const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({});
for(const file of ['data','sushi','lives-data'])vm.runInContext(fs.readFileSync(`dist/${file}.js`,'utf8'),ctx);
const people=vm.runInContext('PEOPLE',ctx),data=vm.runInContext('LIVES_RESEARCH',ctx);
assert.equal(data.people.length,5);assert.equal(data.people.reduce((n,p)=>n+p.records.length,0),110);assert.equal(data.people.reduce((n,p)=>n+p.episodes.length,0),17);
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
assert.equal(markers,34);
const review=JSON.parse(fs.readFileSync('research/people/map-review.json','utf8'));
const records=new Map(people.flatMap(p=>p.nodes).map(n=>[n.id,n]));
assert.equal(Object.keys(review.records).length,16);
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
console.log('PASS: 110 annual records, 17 undated episodes, source links, 34 regional markers, 16 geographical reviews and withheld-location safeguards; Su Shi preserved');
