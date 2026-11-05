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
