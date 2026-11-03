
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
