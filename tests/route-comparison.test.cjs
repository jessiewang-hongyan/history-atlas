const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const d=JSON.parse(fs.readFileSync('research/people/initial-review.json'));
const variants=d.people.find(p=>p.id==='xuanzang').westwardRoute.alternatives;
const sandbox={};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('dist/westward-comparison.js','utf8'),sandbox);
assert.equal(variants.length,4);
for(const v of variants){
 for(const id of v.sources)assert(d.sources[id],id);
 for(const n of v.nodes){
  if(!n.bounds)continue;
  assert.equal(n.bounds.length,4);assert(n.bounds.every(Number.isFinite));
  assert(n.bounds[0]<n.bounds[2]&&n.bounds[1]<n.bounds[3]);assert(n.note);
 }
}
assert.equal(sandbox.candidateSegments(variants[0]).length,2);
assert.equal(sandbox.candidateSegments(variants[1]).length,0);
assert.equal(sandbox.candidateSegments(variants[2]).length,0);
assert.equal(sandbox.candidateSegments(variants[3]).length,1,'Do not connect across unknown Gongyu');
assert.deepEqual(variants[0].nodes[0].bounds,variants[2].nodes[1].bounds,'Sayram must retain the same location in competing theories');
const shipped=JSON.parse(fs.readFileSync('dist/people/xuanzang.json'));
for(const v of variants)for(const ref of v.sources)assert(shipped.sources[ref],ref+' must ship with lazy-loaded biography');
console.log('PASS: independent schemes, missing-station breaks, shared geography, bundled citations');
const at=(lon,lat)=>({bounds:[lon-.01,lat-.01,lon+.01,lat+.01]});
const measure=sandbox.candidateMeasurement;
assert.equal(measure({},at(0,0)),null);
assert.equal(measure(at(0,0),at(0,0)).bearing,null);
const east=measure(at(0,0),at(1,0));assert(Math.abs(east.km-111.195)<.01);assert.equal(east.bearing,90);
const south=measure(at(0,1),at(0,0));assert.equal(south.bearing,180);
const dateline=measure(at(179,0),at(-179,0));assert(Math.abs(dateline.km-222.39)<.01);assert.equal(dateline.bearing,90);
const expected={lam:[[97,202],[33,184]],ding:[[134,247]]};
for(const v of variants){
 assert.equal(v.legs.length,v.nodes.length-1);
 for(const l of v.legs){assert.equal(l.toIndex,l.fromIndex+1);assert(shipped.sources[l.source]);assert(l.original&&l.assessment&&l.mileage);}
 if(expected[v.id]) sandbox.candidateSegments(v).forEach(([a,b],i)=>{const m=measure(a,b);assert.equal(Math.round(m.km),expected[v.id][i][0]);assert.equal(Math.round(m.bearing),expected[v.id][i][1]);});
}
console.log('PASS: cardinal bearings, dateline, missing/coincident endpoints, 9 sourced comparisons and reproducible map measurements');
