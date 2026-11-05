let westwardSelection = null;
let westwardYear = null;
let westwardNode = null;
function mappedWestwardStops() {
 return person.lifeResearch?.westwardRoute?.groups.flatMap(group => group.stops).filter(stop => stop.geography) || [];
}
function closeWestwardMap() {
 westwardSelection = null;
 document.querySelector('.map-panel').classList.remove('westward-map');
 $('westward-map-caption').hidden = true;
 $('westward-layer').replaceChildren();
 document.querySelectorAll('[data-westward-stop]').forEach(button => button.setAttribute('aria-pressed', 'false'));
}
function selectWestwardStop(id, scrollToMap = false) {
 const entry = mappedWestwardStops().find(stop => stop.id === id);
 if (!entry) return;
 stop();
 westwardSelection = id;
 westwardYear = year;
 westwardNode = selectedNode;
 document.querySelectorAll('[data-westward-stop]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.westwardStop === id)));
 const geo = entry.geography;
 const bounds = geo.bounds || [geo.xy[0] - .15, geo.xy[1] - .12, geo.xy[0] + .15, geo.xy[1] + .12];
 const [west, south, east, north] = bounds;
 const latitude = (south + north) / 2;
 changeMapView((west + east) / 2, latitude, Math.max((east - west) * 1.8, (north - south) * mapRatio(latitude) * 1.8));
 if (scrollToMap && matchMedia('(max-width:900px)').matches) $('map').scrollIntoView({block:'center', behavior:'smooth'});
}
function showWestwardOverview() {
 const stops = mappedWestwardStops();
 if (!stops.length) return;
 stop();
 westwardSelection = 'overview';
 westwardYear = year;
 westwardNode = selectedNode;
 const bounds = stops.map(stop => stop.geography.bounds || [...stop.geography.xy, ...stop.geography.xy]);
 const west = Math.min(...bounds.map(b => b[0])), south = Math.min(...bounds.map(b => b[1]));
 const east = Math.max(...bounds.map(b => b[2])), north = Math.max(...bounds.map(b => b[3]));
 const latitude = (south + north) / 2;
 document.querySelectorAll('[data-westward-stop]').forEach(button => button.setAttribute('aria-pressed', 'false'));
 changeMapView((west + east) / 2, latitude, Math.max((east - west) * 1.2, (north - south) * mapRatio(latitude) * 1.3));
}
function drawWestwardMap() {
 const panel = document.querySelector('.map-panel');
 const layer = $('westward-layer');
 layer.replaceChildren();
 const active = !!westwardSelection && person.id === 'xuanzang';
 panel.classList.toggle('westward-map', active);
 $('westward-map-caption').hidden = !active;
 if (!active) return;
 const stops = mappedWestwardStops();
 const selected = stops.find(stop => stop.id === westwardSelection);
 $('westward-map-text').textContent = selected ? selected.place + ' · ' + selected.geography.modern : '长安至飒秣建 · 地名总览';
 const labelBoxes = [];
 for (const stop of stops) {
  const geo = stop.geography, highlighted = stop.id === westwardSelection;
  const group = svg('g', {class:'westward-mark', role:'button', tabindex:0, 'aria-label':stop.place + '，' + geo.modern, 'data-westward-mark':stop.id});
  let x, y;
  if (geo.kind === 'point') {
   [x, y] = project(geo.xy);
   if (x < 0 || y < 0 || x > mapWidth || y > mapHeight) continue;
   group.append(svg('circle', {cx:x,cy:y,r:12,fill:'transparent'}));
   group.append(svg('circle', {cx:x,cy:y,r:highlighted ? 7 : 4,fill:'#8a4930',stroke:'#fff8e5','stroke-width':2}));
  } else {
   const [w,s,e,n] = geo.bounds;
   const [x1,y1] = project([w,n]), [x2,y2] = project([e,s]);
   if (x2 < 0 || y2 < 0 || x1 > mapWidth || y1 > mapHeight) continue;
   x = (x1+x2)/2; y = (y1+y2)/2;
   group.append(svg('ellipse', {cx:x,cy:y,rx:Math.max(9,(x2-x1)/2),ry:Math.max(9,(y2-y1)/2),fill:'#a9633f','fill-opacity':highlighted ? .23 : .06,stroke:'#8a4930','stroke-width':highlighted ? 2.5 : 1,'stroke-dasharray':'5 4'}));
  }
  group.append(svg('title', {}, stop.place + ' · ' + geo.modern));
  if (highlighted || westwardSelection === 'overview' && ['west-01','west-02','west-03','west-04','west-05','west-10','west-12','west-15','west-16','west-17','west-19','west-20','west-22','west-26','west-28'].includes(stop.id)) {
   const width = stop.place.length * 14;
   const labelX = Math.max(width / 2 + 6, Math.min(mapWidth - width / 2 - 6, x));
   const labelY = [y - 17, y + 26, y - 40, y + 48].find(candidate => {
    return candidate > 22 && candidate < mapHeight - 18 && !labelBoxes.some(box =>
     labelX - width / 2 < box[2] + 5 && labelX + width / 2 > box[0] - 5 &&
     candidate - 14 < box[3] + 4 && candidate > box[1] - 4);
   });
   if (labelY !== undefined) {
    labelBoxes.push([labelX - width / 2, labelY - 14, labelX + width / 2, labelY]);
    group.append(svg('text', {x:labelX,y:labelY,class:'active-place','text-anchor':'middle'}, stop.place));
   }
  }
  group.onclick = () => { if (!mapMoved) selectWestwardStop(stop.id); };
  group.onkeydown = event => {
   if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectWestwardStop(stop.id); }
  };
  if (highlighted) layer.append(group);
  else layer.prepend(group);
 }
}
const drawBeforeWestward = draw;
draw = function() { drawBeforeWestward(); drawWestwardMap(); };
// Life events and location evidence are intentionally separate.
const lifeEscape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function lifeEvidence(item){return item.evidence.map(e=>{const s=LIVES_RESEARCH.sources[e.source];return `<article class="life-source"><a href="${lifeEscape(s.url)}" target="_blank" rel="noopener">${lifeEscape(s.title)} ↗</a><p>${lifeEscape(s.kind)}</p><p>在这里查找：${lifeEscape(e.locator)}</p><p>${lifeEscape(e.supports)}</p>${e.quote?`<blockquote>${lifeEscape(e.quote)}</blockquote>`:''}<small>${lifeEscape(s.limits)}</small></article>`;}).join('');}
function locationEvidence(item){
 const g=item.locationReview;if(!g)return '';
 return `<section class="life-geography"><h3>地图上的这个位置</h3><p>${lifeEscape(g.name)} · ${lifeEscape(g.precision)}</p><p>${lifeEscape(g.presenceBasis)}</p><p>${lifeEscape(g.notes)}</p>${g.sources.map(id=>{const source=LIVES_RESEARCH.geography.sources[id];return `<article class="life-source"><a href="${lifeEscape(source.url)}" target="_blank" rel="noopener">${lifeEscape(source.title)} ↗</a><p>${lifeEscape(source.notes)}</p></article>`;}).join('')}<p class="life-meta">核验日期：${lifeEscape(g.checkedAt)}。${lifeEscape(g.coordinateMethod)}</p></section>`;
}
function showLifeSource(item){stop();modal(`<h2>${lifeEscape(person.name)} · ${lifeEscape(item.title)}</h2><p>${lifeEscape(item.dateLabel||item.periodLabel)} · ${lifeEscape(item.place)}</p>${item.narrative?`<p>${lifeEscape(item.narrative)}</p>`:''}${item.limits?`<p>${lifeEscape(item.limits)}</p>`:''}${lifeEvidence(item)}${locationEvidence(item)}<p class="life-meta">查阅日期：${lifeEscape(item.checkedAt)}。${lifeEscape(item.mapNote||'这段经历保留为文字，不推定某一年的位置。')}</p>`);}
const LIFE_INTROS={"xuanzang": ["从洛阳出家，到长安、成都访师，玄奘的求学之路渐渐走向更远的西方。河西、西域、中亚与印度，留下了他问学的足迹。", "645年携经归来后，他把往后的岁月交给译场。从长安到玉华寺，直至六百卷《大般若经》译成，求法与译经贯穿了他的一生。"], "xuxiake": ["天台、雁荡、黄山，嵩山、华山与太和山……徐霞客把山路上的见闻写进日记。1623年远游归来，他还带着榔梅，为母亲祝寿。", "1633年，他从北京走向五台与恒山；1636年又启程西南远游。日记里还有许多山川与村落，等待我们沿着文字继续寻访。"], "liqingzhao": ["与赵明诚一起购书、校书、收藏金石，是李清照婚后生活中的乐事。南渡以后，丈夫去世，藏书与器物接连散失，熟悉的生活渐渐远去。", "她在避乱中辗转，也继续写词、作诗、整理书籍。晚年的文献留下了一些交往与写作的片段，她最后的居处与卒年却仍难说定。"], "qinliangyu": ["从随马千乘出征，到接掌石砫事务，秦良玉的生活与军务、乡土相连。她曾远赴榆关、入京勤王，也一次次回到四川作战。", "经历救援、追击和败战后，她回守石砫。晚年的征召与任命仍接踵而来，其中有些出行最终没有成行。"], "qiujin": ["少年读书，随家人迁居，成婚后又到北京生活。1904年，秋瑾赴日本求学，也开始参与办报、妇女组织和革命组织的活动。", "归国后，她走进女校课堂，筹办《中国女报》，主持大通学堂，并联络会党筹备起义。1907年，她在绍兴被捕，生命止于轩亭口。"]};
function renderWestwardRoute(life) {
 const panel = $('westward-route');
 const route = life?.westwardRoute;
 panel.hidden = !route;
 if (!route) {
  panel.replaceChildren();
  return;
 }
 const source = LIVES_RESEARCH.sources[route.source];
 const groups = route.groups.map((group, index) => {
  const rows = group.stops.map(stop => {
   const geo = stop.geography;
   const name = geo ? `<button type="button" data-westward-stop="${lifeEscape(stop.id)}" aria-pressed="false">${lifeEscape(stop.place)} ↗</button>` : `<strong>${lifeEscape(stop.place)}</strong>`;
   const geography = geo ? `<p>${lifeEscape(geo.modern)} · ${geo.kind === 'point' ? '遗址标记' : '大致区域'}</p><details><summary>定位依据</summary><p>${lifeEscape(geo.note)}</p><p>${lifeEscape(geo.method)}</p>${geo.sources.map(id => {
    const source = LIVES_RESEARCH.sources[id];
    return `<p><a href="${lifeEscape(source.url)}" target="_blank" rel="noopener">${lifeEscape(source.title)} ↗</a> ${lifeEscape(source.limits)}</p>`;
   }).join('')}</details>` : '';
   const phrase = stop.locator.split(' · ')[1];
   const url = source.url + '#:~:text=' + encodeURIComponent(phrase);
   return `<li>${name}${geography}<p>${lifeEscape(stop.note)}</p><a href="${lifeEscape(url)}" target="_blank" rel="noopener">《慈恩传》${lifeEscape(stop.locator)} ↗</a></li>`;
  }).join('');
  return `<details ${index === 0 ? 'open' : ''}><summary>${lifeEscape(group.title)}</summary><ol>${rows}</ol></details>`;
 }).join('');
 const dating = route.dating.map(entry => {
  const source = LIVES_RESEARCH.sources[entry.source];
  return `<p>${lifeEscape(entry.note)} <a href="${lifeEscape(source.url)}" target="_blank" rel="noopener">${lifeEscape(source.title)} ↗</a></p>`;
 }).join('');
 panel.innerHTML = `<h3>西行 · 长安至那烂陀寺</h3><p>沿《慈恩传》的先后读这段路。途中各站的抵达年份，几份年表记得不同。</p><button type="button" data-westward-year>回到时间轴上的出发年</button><button type="button" data-westward-overview>地图上看长安至飒秣建</button><details><summary>出发与抵达的年份</summary>${dating}</details>${groups}`;
 panel.querySelector('[data-westward-overview]').onclick = showWestwardOverview;
 panel.querySelectorAll('[data-westward-stop]').forEach(button => button.onclick = () => selectWestwardStop(button.dataset.westwardStop, true));
 panel.querySelector('[data-westward-year]').onclick = () => { closeWestwardMap(); jumpNode(life.records.findIndex(record => record.id === route.departureRecord)); };
}
let readingPerson=null;
function renderLifeReading(){
 const target=$('life-reading'),life=person.lifeResearch;
 if (readingPerson !== (life ? person.id : null)) renderWestwardRoute(life);
 target.hidden=!life;if(!life){readingPerson=null;return;}
 if(readingPerson===person.id)return;readingPerson=person.id;
 target.innerHTML=`<div class="life-reading-head"><div><span class="eyebrow">走过的路 · 经历的事</span><h2>${lifeEscape(person.name)}的人生</h2></div><span>${life.records.length} 条记录${life.episodes.length?` · ${life.episodes.length} 段未定年经历`:''}</span></div><div class="life-overview">${LIFE_INTROS[person.id].map(p=>`<p>${lifeEscape(p)}</p>`).join('')}</div><p class="life-meta">记下的除了远行，还有读书、家庭与工作。地图上的点只是其中一部分。</p><label class="life-select-label" for="life-record-select">翻到一段经历</label><select id="life-record-select"><option value="">选择年份与经历</option>${life.records.map((r,i)=>`<option value="${i}">${r.year} · ${lifeEscape(r.dateLabel)} · ${lifeEscape(r.title)}</option>`).join('')}</select><details class="life-all"><summary>展开全部 ${life.records.length} 条人生记录</summary><div class="life-records">${life.records.map((r,i)=>`<article><span class="life-date">${lifeEscape(r.dateLabel)}</span><h3>${lifeEscape(r.title)}</h3><p>${lifeEscape(r.narrative||r.evidence[0].supports)}</p><small>${lifeEscape(r.place)}</small><div class="life-actions"><button data-life-jump="${i}">在时间轴查看</button><button data-life-source="${i}">阅读出处 ↗</button></div></article>`).join('')}</div></details>${life.episodes.length?`<h3 class="life-episode-heading">还有这些经历</h3><p class="life-meta">史料留下了这些故事，具体年份还不能说准。先在这里读，不把它们安放到某一年的地图上。</p><div class="life-episodes">${life.episodes.map((e,i)=>`<details><summary>${lifeEscape(e.title)}<small>${lifeEscape(e.periodLabel)}</small></summary><p>${lifeEscape(e.narrative)}</p><p class="life-meta">${lifeEscape(e.limits)}</p><button data-life-episode="${i}">阅读出处 ↗</button></details>`).join('')}</div>`:''}`;
 $('life-record-select').onchange=e=>{if(e.target.value!=='')jumpNode(Number(e.target.value));};
 target.querySelectorAll('[data-life-jump]').forEach(b=>b.onclick=()=>jumpNode(Number(b.dataset.lifeJump)));
 target.querySelectorAll('[data-life-source]').forEach(b=>b.onclick=()=>showLifeSource(life.records[Number(b.dataset.lifeSource)]));
 target.querySelectorAll('[data-life-episode]').forEach(b=>b.onclick=()=>showLifeSource(life.episodes[Number(b.dataset.lifeEpisode)]));
}
const renderBeforeLives=render;
render=function(){
 if (westwardSelection && (person.id !== 'xuanzang' || year !== westwardYear || selectedNode !== westwardNode)) closeWestwardMap();
 renderBeforeLives();renderLifeReading();document.querySelector('.map-legend>span').hidden=!!person.lifeResearch;if(!person.lifeResearch)return;
 const i=currentIndex(),n=person.nodes[i],active=year<=person.end&&year>=person.birth;
 $('node-count').textContent=`${person.nodes.length} 条经历`;
 $('life-range').textContent=`${person.name} · ${person.birth}—${person.end}${person.id==='liqingzhao'?'（展示范围，卒年未定）':''}`;
 $('events').querySelectorAll('[data-event-index]').forEach(b=>{const r=person.nodes[Number(b.dataset.eventIndex)];b.innerHTML=`<b>${r.year}</b><span>${lifeEscape(r.title)}<small class="event-date">${lifeEscape(r.dateLabel)}</small></span>`;});
 if(active&&i<0){$('place-label').textContent='这一段，还没有确切的行迹';$('event-title').textContent='故事的开头，仍有一些空白';$('event-desc').textContent=`目前收录的第一条经历在${person.nodes[0].year}年。更早的岁月，可在下方的人生介绍中阅读。`;$('evidence').textContent='出生地与早年居处有疑问时，我们先不在地图上落点。';$('step-count').textContent='—';$('location-legend').textContent='这一年还没有位置记录';}
 if(active&&n&&!n.xy&&!n.area){$('location-legend').textContent='此条未定位；图上仅保留较早的参考点';$('evidence').textContent=n.note;}
 if(active&&n?.locationReview){$('location-legend').textContent=(n.year===year?'本条大致区域':'最近记录的大致区域')+' · 非活动边界';$('evidence').textContent=[n.date,n.limits,n.mapNote].filter(Boolean).join(' · ');}
 if(person.id==='liqingzhao'&&year>person.end)$('event-desc').textContent='这里展示到1155年。她的卒年与最后的居处仍有不同说法，可以在下方继续阅读晚年记录。';
 if($('life-record-select'))$('life-record-select').value=active&&n?String(i):'';
 $('year-detail').textContent='用 ‹ › 查看同年不同经历；有些记录关乎生活与工作，未标地图位置。古籍月日沿用原历。';
};
const sourcesBeforeLives=$('source-open').onclick;
$('source-open').onclick=()=>{if(!person.lifeResearch){sourcesBeforeLives();return;}const i=currentIndex();if(i<0||year>person.end){modal(`<h2>${lifeEscape(person.name)} · 人生资料</h2><p>请从人生记录中选择一条经历，查看对应的材料。年份尚未钉定的经历也在下方附有出处。</p>`);return;}showLifeSource(person.nodes[i]);};
const locateBeforeWestward = $('map-locate').onclick;
$('map-locate').onclick = () => {
 if (westwardSelection === 'overview') showWestwardOverview();
 else if (westwardSelection) selectWestwardStop(westwardSelection);
 else locateBeforeWestward();
};
$('westward-map-return').onclick = () => { closeWestwardMap(); fit(); render(); };
$('time').addEventListener('input', closeWestwardMap);
const fitBeforeWestward = fit;
fit = function() {
 if (westwardSelection === 'overview') showWestwardOverview();
 else if (westwardSelection) selectWestwardStop(westwardSelection);
 else fitBeforeWestward();
};
$('fit').onclick = () => { if (westwardSelection) showWestwardOverview(); else fit(); };
render();
