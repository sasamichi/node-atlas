
(function(){
var CC=window.__CC;
function escq(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'}[c]})}
function fail(){document.getElementById('app').innerHTML='<p>データを読み込めませんでした。</p>'}
Promise.all([
  fetch('../data/countries.json').then(function(r){if(!r.ok)throw 0;return r.json()}),
  fetch('../data/regions-'+CC+'.json').then(function(r){return r.ok?r.json():{}}).catch(function(){return {}})
]).then(function(xs){
  var CI=xs[0][CC], DB=xs[1];
  if(!CI){fail();return}
  function mrow(v,lab){for(var i=0;i<v.meta.length;i++)if(v.meta[i][0]===lab)return v.meta[i][1];return ''}
  var ids=Object.keys(DB).filter(function(k){return k.charAt(0)!=='_'});
  var tops=ids.filter(function(k){return DB[k].top}).sort();
  var h='<h1>'+rubyName(CI[0],CI[1])+'</h1>\n';
  h+='<h2>'+lb('基本情報')+'</h2>\n<table>';
  h+='<tr><th>'+lb('名称')+'</th><td>'+escq(CI[0])+'</td></tr>';
  h+='<tr><th>'+lb('英語名')+'</th><td>'+escq(CI[2])+'</td></tr>';
  if(CI[3])h+='<tr><th>ISO 3166-1（alpha-2）</th><td>'+escq(CI[3])+'</td></tr>';
  if(CI[4])h+='<tr><th>ISO 3166-1（alpha-3）</th><td>'+escq(CI[4])+'</td></tr>';
  if(CI[5])h+='<tr><th>ISO 3166-1（numeric）</th><td>'+escq(CI[5])+'</td></tr>';
  if(CI[6])h+='<tr><th>'+lb('公用語')+'</th><td>'+escq(CI[6])+'</td></tr>';
  h+='<tr><th>'+lb('地域数')+'</th><td>'+ids.length+' 件</td></tr></table>\n';
  if(CI[7]&&CI[7].length)h+='<h2>リンク</h2>\n<ul class="items">'+CI[7].map(function(x){var y=linkObj(x,CI[0]);return '<li><a href="'+escq(y.url)+'" target="_blank" rel="noopener">'+escq(y.label)+'</a></li>'}).join('')+'</ul>\n';
  if(tops.some(function(id){var n=DB[id].notes;return n&&n.indexOf('要確認')>=0}))h+='<p class="warn">注意：この国の地域には、出典リストの誤記の疑いなどにより確認中の項目が含まれます。該当項目には「（要確認）」と表示しています。</p>\n';
  h+='<h2>'+lb('地域一覧')+'</h2>\n<table class="lst"><tr><th>名称</th><th>読み</th><th>英語名</th><th>種別</th><th>ISO 3166-2</th><th>状態</th></tr>'+tops.map(function(id){var v=DB[id];var fl=(v.notes&&v.notes.indexOf('要確認')>=0)?'（要確認）':'';return '<tr><td><a href="../region.html?id='+id+'">'+escq(v.name)+'</a>'+fl+'</td><td>'+escq(v.reading||'')+'</td><td>'+escq(mrow(v,'英語名'))+'</td><td>'+escq(v.kind)+'</td><td>'+escq(mrow(v,'ISO 3166-2'))+'</td><td>'+escq(v.status||'現存')+'</td></tr>'}).join('')+'</table>\n';
  h+='<p class="meta">地域データの出典：ISO 3166-2リスト（プロジェクトで収集した一覧）。一部の国では最近の再編が反映されていない場合があります。</p>\n';
  document.getElementById('app').innerHTML=h;
  enhance();
}).catch(fail);
})();
