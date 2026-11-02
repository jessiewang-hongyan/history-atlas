const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={};vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/history.js','utf8')+'\nthis.events=HISTORY_EVENTS;this.sources=HISTORY_SOURCES;this.at=historyAt;this.range=historyInRange;',context);
const {events,sources,at,range}=context;
assert.equal(new Set(events.map(e=>e.id)).size,events.length);
for(const e of events){assert(Number.isInteger(e.start)&&e.start<=e.end);assert(['political','military'].includes(e.type));assert(sources[e.source]?.url.startsWith('https://'));assert(e.date&&e.locator&&e.note&&e.checkedAt);if(e.type==='military')assert(e.xy?.length===2&&e.xy.every(Number.isFinite));}
assert(at(1629).some(e=>e.id==='ming-1629'));assert(at(1630).some(e=>e.id==='ming-1629'));assert(!at(1631).some(e=>e.id==='ming-1629'));
assert(at(1127).some(e=>e.type==='political'));assert(at(1127).some(e=>e.type==='military'));assert(!at(1130).some(e=>e.id==='song-1127-war'));
assert.equal(at(1088).length,0);assert(at(1905,'political').length===2);assert.equal(at(1905,'military').length,0);
assert(range(1630,1630).some(e=>e.id==='ming-1629'));assert(!at(1648).some(e=>e.id.startsWith('ming-1644')));
assert(at(1895).some(e=>e.id==='qing-1894'));assert(!at(1896).some(e=>e.id==='qing-1894'));
const report=fs.readFileSync('dist/history-audit.html','utf8');for(const e of events)assert(report.includes('id="'+e.id+'"'));
console.log('PASS: '+events.length+' sourced events, inclusive endpoints, filters, overlaps, empty years, report coverage');
