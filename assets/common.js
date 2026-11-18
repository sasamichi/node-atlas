
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const params=new URLSearchParams(location.search);
const eid=params.get('id')||'';
const ecc=eid.split('-')[1]||'';
function fail(msg){document.getElementById('app').innerHTML='<p>'+esc(msg)+'</p>'}
function rubyName(nm,rd){if(!rd)return esc(nm);var hg=String(nm).replace(/[\u30a1-\u30f6]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-0x60)});if(hg===rd)return esc(nm);return '<ruby>'+esc(nm)+'<rt>'+esc(rd)+'</rt></ruby>'}
function pairReading(pairs){if(!pairs)return '';for(var i=0;i<pairs.length;i++){if(pairs[i][0]==='読み')return pairs[i][1]}return ''}
function cell(v){if(v&&typeof v==='object'){if(!v.u){if(typeof v.t==='string'&&/^-?\d+(\.\d+)?, -?\d+(\.\d+)?$/.test(v.t))return '<a href="https://www.google.com/maps?q='+v.t.replace(', ',',')+'">'+esc(v.t)+'</a>';return rubyName(v.t,v.r)}var u=v.u;if(/^RGN-/.test(u))u='region.html?id='+u;return '<a href="'+esc(u)+'">'+rubyName(v.t,v.r)+'</a>'}return esc(v)}
function pyq(s){return encodeURIComponent(s.replace(/ /g,'_')).replace(/%2F/g,'/').replace(/!/g,'%21').replace(/'/g,'%27').replace(/\*/g,'%2A')}
function linkObj(x,nm){if(!Array.isArray(x))return x;var k=x[0];if(k==='w')return{label:'Wikipedia',url:'https://ja.wikipedia.org/wiki/'+pyq(x.length>1?x[1]:nm)};if(k==='d')return{label:'Wikidata',url:'https://www.wikidata.org/wiki/'+x[1]};if(k==='o')return{label:'OpenStreetMap',url:'https://www.openstreetmap.org/'+x[1]};if(k==='r')return{label:'OpenStreetMap',url:'https://www.openstreetmap.org/relation/'+x[1]};return{label:x[1],url:x[2]}}
function linksHtml(links,nm){return '<h2>リンク</h2><ul class="items">'+links.map(x=>{var y=linkObj(x,nm);return '<li><a href="'+esc(y.url)+'" target="_blank" rel="noopener">'+esc(y.label)+'</a></li>'}).join('')+'</ul>'}
const LB={
"基本情報":"<ruby>基本情報<rt>きほんじょうほう</rt></ruby>","備考":"<ruby>備考<rt>びこう</rt></ruby>","出典":"<ruby>出典<rt>しゅってん</rt></ruby>","最終更新":"<ruby>最終更新<rt>さいしゅうこうしん</rt></ruby>",
"名称":"<ruby>名称<rt>めいしょう</rt></ruby>","読み":"<ruby>読み<rt>よみ</rt></ruby>","種別":"<ruby>種別<rt>しゅべつ</rt></ruby>","状態":"<ruby>状態<rt>じょうたい</rt></ruby>","国":"<ruby>国<rt>くに</rt></ruby>",
"現地表記":"<ruby>現地表記<rt>げんちひょうき</rt></ruby>","英語名":"<ruby>英語名<rt>えいごめい</rt></ruby>","旧称":"<ruby>旧称<rt>きゅうしょう</rt></ruby>","座標":"<ruby>座標<rt>ざひょう</rt></ruby>","公用語":"<ruby>公用語<rt>こうようご</rt></ruby>",
"事業者":"<ruby>事業者<rt>じぎょうしゃ</rt></ruby>","交通網":"<ruby>交通網<rt>こうつうもう</rt></ruby>","自治体":"<ruby>自治体<rt>じちたい</rt></ruby>","列車種別":"<ruby>列車種別<rt>れっしゃしゅべつ</rt></ruby>","地域数":"<ruby>地域数<rt>ちいきすう</rt></ruby>",
"総延長（km）":"<ruby>総延長<rt>そうえんちょう</rt></ruby>（km）","自治体コード（総務省）":"<ruby>自治体<rt>じちたい</rt></ruby>コード（<ruby>総務省<rt>そうむしょう</rt></ruby>）",
"国別トップレベルドメイン":"<ruby>国別<rt>こくべつ</rt></ruby>トップレベルドメイン","国際電話国番号":"<ruby>国際<rt>こくさい</rt></ruby><ruby>電話<rt>でんわ</rt></ruby><ruby>国番号<rt>こくばんごう</rt></ruby>",
"駅コード":"<ruby>駅<rt>えき</rt></ruby>コード","港湾法上の種別":"<ruby>港湾法<rt>こうわんほう</rt></ruby>上の<ruby>種別<rt>しゅべつ</rt></ruby>",
"IATA 空港コード":"IATA <ruby>空港<rt>くうこう</rt></ruby>コード","ICAO 空港コード":"ICAO <ruby>空港<rt>くうこう</rt></ruby>コード",
"路線番号":"<ruby>路線番号<rt>ろせんばんごう</rt></ruby>","道路の法的種別":"<ruby>道路<rt>どうろ</rt></ruby>の<ruby>法的<rt>ほうてき</rt></ruby><ruby>種別<rt>しゅべつ</rt></ruby>","公式サイト":"<ruby>公式<rt>こうしき</rt></ruby>サイト",
"都道府県":"<ruby>都道府県<rt>とどうふけん</rt></ruby>","市区町村":"<ruby>市区町村<rt>しくちょうそん</rt></ruby>","振興局":"<ruby>振興局<rt>しんこうきょく</rt></ruby>","総合振興局":"<ruby>総合振興局<rt>そうごうしんこうきょく</rt></ruby>",
"郡":"<ruby>郡<rt>ぐん</rt></ruby>","行政区":"<ruby>行政区<rt>ぎょうせいく</rt></ruby>","市":"<ruby>市<rt>し</rt></ruby>","町":"<ruby>町<rt>ちょう</rt></ruby>","村":"<ruby>村<rt>そん</rt></ruby>","町村":"<ruby>町村<rt>ちょうそん</rt></ruby>","支庁":"<ruby>支庁<rt>しちょう</rt></ruby>","地方":"<ruby>地方<rt>ちほう</rt></ruby>",
"路線":"<ruby>路線<rt>ろせん</rt></ruby>","気象観測地点":"<ruby>気象観測地点<rt>きしょうかんそくちてん</rt></ruby>",
"旅客駅":"<ruby>旅客駅<rt>りょかくえき</rt></ruby>","貨物駅":"<ruby>貨物駅<rt>かもつえき</rt></ruby>","信号場":"<ruby>信号場<rt>しんごうじょう</rt></ruby>","停留場":"<ruby>停留場<rt>ていりゅうじょう</rt></ruby>","索道駅":"<ruby>索道駅<rt>さくどうえき</rt></ruby>",
"港":"<ruby>港<rt>みなと</rt></ruby>","空港":"<ruby>空港<rt>くうこう</rt></ruby>","道の駅":"<ruby>道<rt>みち</rt></ruby>の<ruby>駅<rt>えき</rt></ruby>","高速バス停留所":"<ruby>高速<rt>こうそく</rt></ruby>バス<ruby>停留所<rt>ていりゅうじょ</rt></ruby>","交差点":"<ruby>交差点<rt>こうさてん</rt></ruby>",
"接続する路線":"<ruby>接続<rt>せつぞく</rt></ruby>する<ruby>路線<rt>ろせん</rt></ruby>","接続する拠点":"<ruby>接続<rt>せつぞく</rt></ruby>する<ruby>拠点<rt>きょてん</rt></ruby>",
"拠点一覧（収集済みの範囲）":"<ruby>拠点一覧<rt>きょてんいちらん</rt></ruby>（<ruby>収集済み<rt>しゅうしゅうずみ</rt></ruby>の<ruby>範囲<rt>はんい</rt></ruby>）",
"所属する拠点":"<ruby>所属<rt>しょぞく</rt></ruby>する<ruby>拠点<rt>きょてん</rt></ruby>","所属する路線":"<ruby>所属<rt>しょぞく</rt></ruby>する<ruby>路線<rt>ろせん</rt></ruby>","所属する交通網":"<ruby>所属<rt>しょぞく</rt></ruby>する<ruby>交通網<rt>こうつうもう</rt></ruby>",
"本線":"<ruby>本線<rt>ほんせん</rt></ruby>","支線":"<ruby>支線<rt>しせん</rt></ruby>","運行系統・列車":"<ruby>運行系統<rt>うんこうけいとう</rt></ruby>・<ruby>列車<rt>れっしゃ</rt></ruby>",
"乗換・接続":"<ruby>乗換<rt>のりかえ</rt></ruby>・<ruby>接続<rt>せつぞく</rt></ruby>","停車する系統・列車":"<ruby>停車<rt>ていしゃ</rt></ruby>する<ruby>系統<rt>けいとう</rt></ruby>・<ruby>列車<rt>れっしゃ</rt></ruby>",
"路線での位置":"<ruby>路線<rt>ろせん</rt></ruby>での<ruby>位置<rt>いち</rt></ruby>","停車駅":"<ruby>停車駅<rt>ていしゃえき</rt></ruby>","経由路線":"<ruby>経由路線<rt>けいゆろせん</rt></ruby>",
"停車順":"<ruby>停車順<rt>ていしゃじゅん</rt></ruby>","停車種別":"<ruby>停車種別<rt>ていしゃしゅべつ</rt></ruby>","区間 km":"<ruby>区間<rt>くかん</rt></ruby> km","累計 km":"<ruby>累計<rt>るいけい</rt></ruby> km",
"接続路線":"<ruby>接続路線<rt>せつぞくろせん</rt></ruby>","この拠点":"この<ruby>拠点<rt>きょてん</rt></ruby>","前の拠点":"<ruby>前<rt>まえ</rt></ruby>の<ruby>拠点<rt>きょてん</rt></ruby>","次の拠点":"<ruby>次<rt>つぎ</rt></ruby>の<ruby>拠点<rt>きょてん</rt></ruby>",
"この自治体の拠点":"この<ruby>自治体<rt>じちたい</rt></ruby>の<ruby>拠点<rt>きょてん</rt></ruby>","この地域の拠点":"この<ruby>地域<rt>ちいき</rt></ruby>の<ruby>拠点<rt>きょてん</rt></ruby>","地域一覧":"<ruby>地域一覧<rt>ちいきいちらん</rt></ruby>"};
function lb(t){return LB[t]||esc(t)}
function metaTable(rows){return '<table>'+rows.map(r=>'<tr><th>'+lb(r[0])+'</th><td>'+cell(r[1])+'</td></tr>').join('')+'</table>'}
function metaLine(segs){return '<p class="meta">'+segs.map(s=>s.u?'<a href="'+esc(s.u)+'">'+esc(s.t)+'</a>':esc(s.t)).join(' ／ ')+'</p>'}
function f1(v){return (v===''||v==null)?'':Number(v).toFixed(1)}
function dataLine(d){return '<h2>データについて</h2><p class="meta">'+lb('出典')+'：'+esc(d.s)+' ／ '+lb('最終更新')+'：'+esc(d.u)+' ／ レコードID：'+esc(eid)+'</p>'}
function lstTable(cols,rows,linkPrefix,db){return '<table class="lst"><tr>'+cols.map(c=>'<th>'+lb(c)+'</th>').join('')+'</tr>'+rows.map(r=>{var cs=[];if(db){cs.push('<a href="'+linkPrefix+r.id+'">'+esc(db[r.id].name)+'</a>');if(cols[1]==='読み')cs.push(esc(db[r.id].reading||''));r.cells.forEach(c=>cs.push(esc(c)))}else{r.cells.forEach((c,i)=>cs.push(i===0?'<a href="'+linkPrefix+r.id+'">'+esc(c)+'</a>':esc(c)))}return '<tr>'+cs.map(c=>'<td>'+c+'</td>').join('')+'</tr>'}).join('')+'</table>'}

function enhance(){
  document.querySelectorAll('table.lst').forEach(function(tb){
    var head=tb.querySelector('tr'); if(!head) return;
    var cols=[].map.call(head.querySelectorAll('th'),function(th){return th.textContent});
    var rows=[].slice.call(tb.querySelectorAll('tr'),1);
    rows.forEach(function(r,i){r.dataset.o=i});
    var wrap=document.createElement('p');
    var inp=document.createElement('input'); inp.type='search'; inp.placeholder='リスト内検索';
    var sel=document.createElement('select');
    sel.innerHTML='<option value="-1">並べ替え：初期順</option>'+cols.map(function(c,i){return '<option value="'+i+'">並べ替え：'+c+'</option>'}).join('');
    wrap.appendChild(inp); wrap.appendChild(sel);
    tb.parentNode.insertBefore(wrap, tb);
    inp.addEventListener('input',function(){var v=inp.value.trim(); rows.forEach(function(r){r.style.display=(!v||r.textContent.indexOf(v)>=0)?'':'none'})});
    sel.addEventListener('change',function(){var k=+sel.value;
      rows.sort(function(a,b){ if(k<0) return (+a.dataset.o)-(+b.dataset.o);
        var x=a.cells[k].textContent.trim(), y=b.cells[k].textContent.trim();
        var nx=parseFloat(x), ny=parseFloat(y);
        if(!isNaN(nx)&&!isNaN(ny)&&x!==''&&y!=='') return nx-ny;
        return x.localeCompare(y,'ja')});
      rows.forEach(function(r){tb.appendChild(r)})});
  });
}
