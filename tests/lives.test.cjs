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
assert.equal(markers,18);
const li=people.find(p=>p.id==='liqingzhao');assert.equal(li.nodes.find(n=>n.id==='liqingzhao-027').xy,null);
const qiu=people.find(p=>p.id==='qiujin');assert.ok(qiu.nodes[0].year>qiu.birth);assert.equal(qiu.nodes.find(n=>n.id==='qiujin-006').xy,null);
console.log('PASS: 110 annual records, 17 undated episodes, source links, 18 regional markers; Su Shi preserved');
