// Candidate schemes stay separate; missing stations deliberately break a line.
let westwardVariants = new Set();
let westwardCandidate = null;
function routeVariants() { return person.lifeResearch?.westwardRoute?.alternatives || []; }
function candidateCenter(node) {
 const [w,s,e,n] = node.bounds;
 return [(w+e)/2,(s+n)/2];
}
function candidateSegments(variant) {
 return variant.nodes.slice(1).flatMap((node,i) => node.bounds && variant.nodes[i].bounds ? [[variant.nodes[i],node]] : []);
}
function renderRouteComparison() {
 const panel = $('route-comparison');
 panel.innerHTML = `<h3>同一段路，几种解释</h3><p>勾选方案，可同时比较。虚线只表示站点先后，圈出的是候选区域；中间一站没找到，就留下一段空白。</p><button type="button" data-compare-fit>看全部已选方案</button><p id="candidate-status" role="status">点站名或地图编号，查看这一处的解释。</p><div class="candidate-cards">${routeVariants().map(v => `<article data-variant-card="${lifeEscape(v.id)}" style="--candidate-color:${lifeEscape(v.color)}"><label><input type="checkbox" data-variant="${lifeEscape(v.id)}" ${westwardVariants.has(v.id)?'checked':''}><b>${lifeEscape(v.code)} · ${lifeEscape(v.title)}</b></label><p>${lifeEscape(v.note)}</p><ol>${v.nodes.map((n,i) => `<li>${n.bounds ? `<button type="button" data-candidate="${lifeEscape(v.id)}:${i}" aria-pressed="false">${lifeEscape(v.code)}${i+1} · ${lifeEscape(n.place)} → ${lifeEscape(n.modern)}</button>` : `<span>${lifeEscape(v.code)}${i+1} · ${lifeEscape(n.place)}：${lifeEscape(n.modern)}（留白）</span>`}</li>`).join('')}</ol><details><summary>出处与圈示方法</summary>${v.nodes.filter(n=>n.bounds).map(n=>`<p>${lifeEscape(n.place)}：${lifeEscape(n.note)}</p>`).join('')}${v.sources.map(id=>{const s=LIVES_RESEARCH.sources[id];return `<p><a href="${lifeEscape(s.url)}" target="_blank" rel="noopener">${lifeEscape(s.title)} ↗</a><br>${lifeEscape(s.limits)}</p>`;}).join('')}</details></article>`).join('')}</div>`;
 panel.querySelector('[data-compare-fit]').onclick = () => showRouteComparison(false);
 panel.querySelectorAll('[data-variant]').forEach(input => input.onchange = () => {
  if (input.checked) westwardVariants.add(input.dataset.variant); else westwardVariants.delete(input.dataset.variant);
  if (westwardCandidate?.startsWith(input.dataset.variant+':')) westwardCandidate = null;
  showRouteComparison(false);
 });
 panel.querySelectorAll('[data-candidate]').forEach(button => button.onclick = () => selectRouteCandidate(button.dataset.candidate, true));
}
function showRouteComparison(initialize = true) {
 const variants = routeVariants();
 if (!variants.length) return;
 stop();
 if (initialize) { westwardVariants = new Set(variants.map(v=>v.id)); westwardCandidate = null; }
 westwardSelection = 'comparison'; westwardYear = year; westwardNode = selectedNode;
 document.querySelectorAll('[data-westward-stop]').forEach(b=>b.setAttribute('aria-pressed','false'));
 if (!$('route-comparison').children.length) renderRouteComparison();
 $('route-comparison').hidden = false;
 const bounds = variants.filter(v=>westwardVariants.has(v.id)).flatMap(v=>v.nodes.filter(n=>n.bounds).map(n=>n.bounds));
 if (!bounds.length) { draw(); return; }
 const w=Math.min(...bounds.map(b=>b[0])),s=Math.min(...bounds.map(b=>b[1])),e=Math.max(...bounds.map(b=>b[2])),n=Math.max(...bounds.map(b=>b[3]));
 sizeMap();
 const lat=(s+n)/2;
 changeMapView((w+e)/2,lat,Math.max((e-w)*1.45,(n-s)*mapRatio(lat)*1.8,.6));
 if (initialize && matchMedia('(max-width:900px)').matches) $('map').scrollIntoView({block:'center',behavior:'smooth'});
}
function selectRouteCandidate(key, scrollToMap = false) {
 const [id,index] = key.split(':');
 const variant = routeVariants().find(v=>v.id===id), node=variant?.nodes[Number(index)];
 if (!node?.bounds) return;
 westwardVariants.add(id); westwardCandidate=key;
 // Keep every selected scheme in view while highlighting this candidate.
 showRouteComparison(false);
 if (scrollToMap) $('map').scrollIntoView({block:'center',behavior:'smooth'});
}
function drawRouteComparison(layer) {
 const variants = routeVariants().filter(v=>westwardVariants.has(v.id));
 $('westward-map-text').textContent = variants.length ? '候选方案对读 · '+variants.map(v=>v.code).join(' / ')+' · 虚线为先后示意' : '尚未选择方案 · 在地图下方勾选';
 const labels=[];
 for (const v of variants) {
  for (const [a,b] of candidateSegments(v)) {
   const [x1,y1]=project(candidateCenter(a)),[x2,y2]=project(candidateCenter(b));
   const line=svg('path',{d:`M${x1},${y1} L${x2},${y2}`,fill:'none',stroke:v.color,'stroke-width':2,'stroke-dasharray':v.dash,'data-candidate-line':v.id,'pointer-events':'none'});
   line.append(svg('title',{},v.title+' · 站点先后示意，非古道'));
   layer.append(line);
  }
 }
 for (const v of variants) v.nodes.forEach((n,i)=>{
  if (!n.bounds) return;
  const key=v.id+':'+i,active=key===westwardCandidate;
  const [w,s,e,north]=n.bounds,[x1,y1]=project([w,north]),[x2,y2]=project([e,s]);
  const x=(x1+x2)/2,y=(y1+y2)/2;
  if (x2<0||y2<0||x1>mapWidth||y1>mapHeight) return;
  const g=svg('g',{class:'westward-mark',role:'button',tabindex:0,'aria-label':v.title+'，'+n.place+'，'+n.modern,'aria-pressed':String(active),'data-candidate-mark':key,style:'--candidate-color:'+v.color});
  g.append(svg('ellipse',{cx:x,cy:y,rx:Math.max(8,(x2-x1)/2),ry:Math.max(8,(y2-y1)/2),fill:v.color,'fill-opacity':active?.24:.08,stroke:v.color,'stroke-width':active?3:1.5,'stroke-dasharray':v.dash}));
  const label=v.code+(i+1)+' '+n.place,width=label.length*12+12;
  const lx=Math.max(width/2+6,Math.min(mapWidth-width/2-6,x));
  let ly=y-18;
  for (const offset of [-18,28,-40,50,-62,72,-84,94,-106,116]) {
   const cy=y+offset;
   if (cy>100&&cy<mapHeight-24&&!labels.some(b=>lx-width/2<b[2]+3&&lx+width/2>b[0]-3&&cy-16<b[3]+3&&cy>b[1]-3)) {ly=cy;break;}
  }
  labels.push([lx-width/2,ly-16,lx+width/2,ly]);
  g.append(svg('line',{x1:x,y1:y,x2:lx,y2:ly-7,stroke:v.color,'stroke-width':.7}));
  g.append(svg('rect',{x:lx-width/2,y:ly-17,width,height:22,rx:3,fill:'#fffcf2',stroke:active?v.color:'none'}));
  g.append(svg('text',{x:lx,y:ly,'text-anchor':'middle',class:'candidate-label',fill:v.color,'font-size':12,'font-weight':700},label));
  g.append(svg('title',{},n.modern+' · '+n.note));
  g.onclick=()=>{if(!mapMoved)selectRouteCandidate(key);};
  g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectRouteCandidate(key);}};
  layer.append(g);
 });
 document.querySelectorAll('[data-variant]').forEach(input=>input.checked=westwardVariants.has(input.dataset.variant));
 document.querySelectorAll('[data-variant-card]').forEach(card=>card.classList.toggle('candidate-off',!westwardVariants.has(card.dataset.variantCard)));
 document.querySelectorAll('[data-candidate]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.candidate===westwardCandidate)));
 const [id,index]=(westwardCandidate||'').split(':'), v=variants.find(v=>v.id===id),n=v?.nodes[Number(index)];
 if (n) $('westward-map-text').textContent = `${v.code}${Number(index)+1} · ${n.place} → ${n.modern} · ${variants.length} 组方案同图`;
 $('candidate-status').textContent=n?`${v.code}${Number(index)+1} · ${n.place} → ${n.modern}。${n.note}`:variants.length?'点站名或地图编号，查看这一处的解释。':'所有方案已隐藏。勾选任一方案即可重新显示。';
}
