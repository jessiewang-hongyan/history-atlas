// Physical reference layers are modern geography, not reconstructed historic waterways.
let mapWater=null,mapGeometryKey='',mapWidth=1000,mapHeight=650,mapDrag=null,mapMoved=false;
const basicDraw=draw;
project=function(p){return [(p[0]-view[0])/(view[2]-view[0])*mapWidth,mapHeight-(p[1]-view[1])/(view[3]-view[1])*mapHeight];};
function sizeMap(){const r=$('map').getBoundingClientRect();mapWidth=Math.max(1,r.width);mapHeight=Math.max(1,r.height);$('map').setAttribute('viewBox',`0 0 ${mapWidth} ${mapHeight}`);$('map').querySelectorAll(':scope > rect').forEach(r=>{r.setAttribute('width',mapWidth);r.setAttribute('height',mapHeight);});}
function mapRatio(lat){return mapWidth/mapHeight/Math.cos(lat*Math.PI/180);}
fit=function(){sizeMap();const xs=person.nodes.filter(n=>n.xy).map(n=>n.xy[0]),ys=person.nodes.filter(n=>n.xy).map(n=>n.xy[1]),cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;let w=Math.max(8,(Math.max(...xs)-Math.min(...xs))*1.45),h=Math.max(8,(Math.max(...ys)-Math.min(...ys))*1.55);const ratio=mapRatio(cy);if(w/h<ratio)w=h*ratio;else h=w/ratio;view=[cx-w/2,cy-h/2,cx+w/2,cy+h/2];draw();};
function changeMapView(cx,cy,w){cy=Math.max(-55,Math.min(65,cy));w=Math.max(.15,Math.min(120,120*mapRatio(cy),w));const h=w/mapRatio(cy);cy=Math.max(-65+h/2,Math.min(80-h/2,cy));view=[cx-w/2,cy-h/2,cx+w/2,cy+h/2];draw();}
function zoomMap(factor){changeMapView((view[0]+view[2])/2,(view[1]+view[3])/2,(view[2]-view[0])*factor);}
drawLand=function(){
 const key=JSON.stringify([view,mapWidth,mapHeight,!!landData,!!mapWater,$('water-reference').checked]);if(key===mapGeometryKey)return;mapGeometryKey=key;
 const target=$('land');target.replaceChildren();if(!landData)return;
 for(const f of landData.features){const polys=f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[f.geometry.coordinates];for(const p of polys)target.append(svg('path',{d:p.map(r=>path(r,true)).join(' '),fill:'#f1f0df',stroke:'#a9bba7','stroke-width':.8,'fill-rule':'evenodd'}));}
 if(mapWater&&$('water-reference').checked)for(const f of mapWater.features){const g=f.geometry,isLine=g.type.includes('LineString'),parts=g.type==='MultiLineString'||g.type==='MultiPolygon'?g.coordinates:[g.coordinates];for(const p of parts){const d=isLine?path(p):p.map(r=>path(r,true)).join(' ');const el=svg('path',{d,fill:isLine?'none':'#c4d9d8',stroke:'#8fb7bc','stroke-width':isLine?1.1:.6,'fill-rule':'evenodd','stroke-linejoin':'round',opacity:.85});el.append(svg('title',{},`${f.properties.name||'水系'} · 现代地理参照`));target.append(el);}}
};
function detailedRoute(){
 const target=$('route-layer');target.replaceChildren();if(!$('route').checked)return;const i=currentIndex();if(i<0||year>person.end)return;const nodes=person.nodes.slice(0,i+1);
 if(!person.lifeResearch&&nodes.length>1)target.append(svg('path',{d:path(nodes.map(n=>n.xy)),fill:'none',stroke:person.color,'stroke-width':1.8,'stroke-dasharray':'5 4','stroke-linejoin':'round',opacity:.75}));
 const seen=new Set(),marks=[];
 for(let j=i;j>=0;j--){const n=nodes[j];if(!n.xy)continue;const key=n.xy.map(x=>x.toFixed(2)).join(',');if(seen.has(key))continue;seen.add(key);const [x,y]=project(n.xy);if(x<0||x>mapWidth||y<0||y>mapHeight)continue;marks.push({n,j,x,y});}
 const labels=[];
 for(const {n,j,x,y} of marks){const mapPlace=n.locationReview?.name||n.place,active=j===i,group=svg('g',{role:'button',tabindex:0,'aria-label':`${n.year}年 ${mapPlace}，查看人生节点`,'data-node':j,class:active?'map-node current-node':'map-node'});group.append(svg('circle',{cx:x,cy:y,r:12,fill:'transparent'}));group.append(svg('circle',{cx:x,cy:y,r:active?6:3.5,fill:active?person.color:'#fcf9ed',stroke:person.color,'stroke-width':1.5}));if(active)group.append(svg('circle',{cx:x,cy:y,r:11,fill:'none',stroke:person.color,'stroke-opacity':.35}));group.append(svg('title',{},`${n.year} · ${mapPlace} · ${n.title}`));
 const width=mapPlace.length*12+10,tx=x+width+14>mapWidth?x-width-10:x+10,ty=y<30?y+22:y-12,box=[tx,ty-12,tx+width,ty+4];
 if(active||!labels.some(b=>box[0]<b[2]+7&&box[2]>b[0]-7&&box[1]<b[3]+6&&box[3]>b[1]-6)){labels.push(box);group.append(svg('text',{x:Math.max(3,tx),y:ty,class:active?'active-place':'place-name'},mapPlace));}
 group.onclick=()=>{if(!mapMoved)jumpNode(j);};group.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();jumpNode(j);}};active?marks.current=group:target.append(group);
 }if(marks.current)target.append(marks.current);
}
draw=function(){basicDraw();detailedRoute();$('map-view-status').textContent=`视野约 ${Math.round((view[2]-view[0])*111*Math.cos((view[1]+view[3])/2*Math.PI/180))} 公里宽`;};
const waterLabel=document.createElement('label');waterLabel.innerHTML='<input id="water-reference" type="checkbox" checked> 现代水系参照';document.querySelector('.layers').append(waterLabel);$('water-reference').onchange=draw;
const mapControls=document.createElement('div');mapControls.className='map-controls';mapControls.innerHTML='<button id="map-zoom-in" aria-label="放大地图" title="放大地图">＋</button><button id="map-zoom-out" aria-label="缩小地图" title="缩小地图">−</button><button id="map-locate" aria-label="定位最近人生记录" title="定位最近人生记录">◎</button>';document.querySelector('.map-panel').append(mapControls);
const mapStatus=document.createElement('div');mapStatus.className='map-view-hint';mapStatus.innerHTML='<span id="map-view-status" aria-live="polite"></span><span>拖动平移 · ＋／− 缩放</span><span id="water-status">水系加载中…</span>';document.querySelector('.map-panel').append(mapStatus);
$('map-zoom-in').onclick=()=>zoomMap(.65);$('map-zoom-out').onclick=()=>zoomMap(1/.65);$('map-locate').onclick=()=>{const i=currentIndex();if(i<0||year>person.end){fit();return;}const n=person.nodes[i];if(!n.xy){fit();return;}changeMapView(n.xy[0],n.xy[1],Math.min(n.locationReview&&/寺|山峰|岩洞|景观|废址/.test(n.locationReview.precision)?.6:8,view[2]-view[0]));};$('fit').onclick=fit;
const mapElement=$('map');mapElement.addEventListener('pointerdown',e=>{if(e.button!==0||mapDrag)return;mapMoved=false;mapDrag={id:e.pointerId,x:e.clientX,y:e.clientY,view:[...view]};});
mapElement.addEventListener('pointermove',e=>{if(!mapDrag||mapDrag.id!==e.pointerId)return;const dx=e.clientX-mapDrag.x,dy=e.clientY-mapDrag.y;if(Math.hypot(dx,dy)<5&&!mapMoved)return;mapMoved=true;mapElement.setPointerCapture(e.pointerId);const v=mapDrag.view,lon=dx/mapWidth*(v[2]-v[0]),lat=dy/mapHeight*(v[3]-v[1]);changeMapView((v[0]+v[2])/2-lon,(v[1]+v[3])/2+lat,v[2]-v[0]);});
function endMapDrag(e){if(mapDrag?.id===e.pointerId){mapDrag=null;if(mapElement.hasPointerCapture(e.pointerId))mapElement.releasePointerCapture(e.pointerId);}}
mapElement.addEventListener('pointerup',endMapDrag);mapElement.addEventListener('pointercancel',endMapDrag);
// Capture only after a drag: a plain tap keeps the original node as its click target.
mapElement.addEventListener('click',e=>{if(mapMoved){e.stopImmediatePropagation();mapMoved=false;}},true);
mapElement.addEventListener('keydown',e=>{if(e.target!==mapElement)return;const moves={ArrowLeft:[-.15,0],ArrowRight:[.15,0],ArrowUp:[0,.15],ArrowDown:[0,-.15]};if(moves[e.key]){e.preventDefault();const [x,y]=moves[e.key];changeMapView((view[0]+view[2])/2+x*(view[2]-view[0]),(view[1]+view[3])/2+y*(view[3]-view[1]),view[2]-view[0]);}});
mapElement.setAttribute('tabindex','0');mapElement.setAttribute('aria-label','历史人物足迹地图，可拖动平移；聚焦地图后可用方向键平移');
fetch('water.json?v=map-2').then(r=>{if(!r.ok)throw Error('water');return r.json();}).then(d=>{mapWater=d;$('water-status').textContent='现代水系，不代表历史河道';draw();}).catch(()=>{$('water-status').textContent='水系暂不可用，其他图层仍可使用';});
new ResizeObserver(()=>fit()).observe(document.querySelector('.map-panel'));fit();
