// Life events and location evidence are intentionally separate.
const lifeEscape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function lifeEvidence(item){return item.evidence.map(e=>{const s=LIVES_RESEARCH.sources[e.source];return `<article class="life-source"><a href="${lifeEscape(s.url)}" target="_blank" rel="noopener">${lifeEscape(s.title)} ↗</a><p>${lifeEscape(s.kind)}</p><p>在这里查找：${lifeEscape(e.locator)}</p><p>${lifeEscape(e.supports)}</p>${e.quote?`<blockquote>${lifeEscape(e.quote)}</blockquote>`:''}<small>${lifeEscape(s.limits)}</small></article>`;}).join('');}
function locationEvidence(item){
 const g=item.locationReview;if(!g)return '';
 return `<section class="life-geography"><h3>地图上的这个位置</h3><p>${lifeEscape(g.name)} · ${lifeEscape(g.precision)}</p><p>${lifeEscape(g.presenceBasis)}</p><p>${lifeEscape(g.notes)}</p>${g.sources.map(id=>{const source=LIVES_RESEARCH.geography.sources[id];return `<article class="life-source"><a href="${lifeEscape(source.url)}" target="_blank" rel="noopener">${lifeEscape(source.title)} ↗</a><p>${lifeEscape(source.notes)}</p></article>`;}).join('')}<p class="life-meta">核验日期：${lifeEscape(g.checkedAt)}。${lifeEscape(g.coordinateMethod)}</p></section>`;
}
function showLifeSource(item){stop();modal(`<h2>${lifeEscape(person.name)} · ${lifeEscape(item.title)}</h2><p>${lifeEscape(item.dateLabel||item.periodLabel)} · ${lifeEscape(item.place)}</p>${item.narrative?`<p>${lifeEscape(item.narrative)}</p>`:''}${item.limits?`<p>${lifeEscape(item.limits)}</p>`:''}${lifeEvidence(item)}${locationEvidence(item)}<p class="life-meta">查阅日期：${lifeEscape(item.checkedAt)}。${lifeEscape(item.mapNote||'这段经历保留为文字，不推定某一年的位置。')}</p>`);}
const LIFE_INTROS={"xuanzang": ["从洛阳出家，到长安、成都访师，玄奘的求学之路渐渐走向更远的西方。河西、西域、中亚与印度，留下了他问学的足迹。", "645年携经归来后，他把往后的岁月交给译场。从长安到玉华寺，直至六百卷《大般若经》译成，求法与译经贯穿了他的一生。"], "xuxiake": ["天台、雁荡、黄山，嵩山、华山与太和山……徐霞客把山路上的见闻写进日记。1623年远游归来，他还带着榔梅，为母亲祝寿。", "1633年，他从北京走向五台与恒山；1636年又启程西南远游。日记里还有许多山川与村落，等待我们沿着文字继续寻访。"], "liqingzhao": ["与赵明诚一起购书、校书、收藏金石，是李清照婚后生活中的乐事。南渡以后，丈夫去世，藏书与器物接连散失，熟悉的生活渐渐远去。", "她在避乱中辗转，也继续写词、作诗、整理书籍。晚年的文献留下了一些交往与写作的片段，她最后的居处与卒年却仍难说定。"], "qinliangyu": ["从随马千乘出征，到接掌石砫事务，秦良玉的生活与军务、乡土相连。她曾远赴榆关、入京勤王，也一次次回到四川作战。", "经历救援、追击和败战后，她回守石砫。晚年的征召与任命仍接踵而来，其中有些出行最终没有成行。"], "qiujin": ["少年读书，随家人迁居，成婚后又到北京生活。1904年，秋瑾赴日本求学，也开始参与办报、妇女组织和革命组织的活动。", "归国后，她走进女校课堂，筹办《中国女报》，主持大通学堂，并联络会党筹备起义。1907年，她在绍兴被捕，生命止于轩亭口。"]};
let readingPerson=null;
function renderLifeReading(){
 const target=$('life-reading'),life=person.lifeResearch;
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
 renderBeforeLives();renderLifeReading();document.querySelector('.map-legend>span').hidden=!!person.lifeResearch;if(!person.lifeResearch)return;
 const i=currentIndex(),n=person.nodes[i],active=year<=person.end&&year>=person.birth;
 $('node-count').textContent=`${person.nodes.length} 条经历`;
 $('life-range').textContent=`${person.name} · ${person.birth}—${person.end}${person.id==='liqingzhao'?'（展示范围，卒年未定）':''}`;
 $('events').querySelectorAll('[data-event-index]').forEach(b=>{const r=person.nodes[Number(b.dataset.eventIndex)];b.innerHTML=`<b>${r.year}</b><span>${lifeEscape(r.title)}<small class="event-date">${lifeEscape(r.dateLabel)}</small></span>`;});
 if(active&&i<0){$('place-label').textContent='这一段，还没有确切的行迹';$('event-title').textContent='故事的开头，仍有一些空白';$('event-desc').textContent=`目前收录的第一条经历在${person.nodes[0].year}年。更早的岁月，可在下方的人生介绍中阅读。`;$('evidence').textContent='出生地与早年居处有疑问时，我们先不在地图上落点。';$('step-count').textContent='—';$('location-legend').textContent='这一年还没有位置记录';}
 if(active&&n&&!n.xy){$('location-legend').textContent='此条未定位；图上仅保留较早的参考点';$('evidence').textContent=n.note;}
 if(active&&n?.locationReview){$('location-legend').textContent=(n.year===year?'本条位置':'最近记录')+' · '+n.locationReview.precision;$('evidence').textContent=[n.date,n.limits,n.mapNote].filter(Boolean).join(' · ');}
 if(person.id==='liqingzhao'&&year>person.end)$('event-desc').textContent='这里展示到1155年。她的卒年与最后的居处仍有不同说法，可以在下方继续阅读晚年记录。';
 if($('life-record-select'))$('life-record-select').value=active&&n?String(i):'';
 $('year-detail').textContent='用 ‹ › 查看同年不同经历；有些记录关乎生活与工作，未标地图位置。古籍月日沿用原历。';
};
const sourcesBeforeLives=$('source-open').onclick;
$('source-open').onclick=()=>{if(!person.lifeResearch){sourcesBeforeLives();return;}const i=currentIndex();if(i<0||year>person.end){modal(`<h2>${lifeEscape(person.name)} · 人生资料</h2><p>请从人生记录中选择一条经历，查看对应的材料。年份尚未钉定的经历也在下方附有出处。</p>`);return;}showLifeSource(person.nodes[i]);};
render();
