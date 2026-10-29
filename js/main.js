(function(){
  var R=[["Vanaf het eerste nummer stond de dansvloer vol. Hij voelde precies aan wat onze gasten wilden.","Bruiloft","A"],
  ["Tresor met de live saxofonist was het hoogtepunt van ons bedrijfsfeest. Collega's hebben het er nog steeds over.","Bedrijfsfeest","B"],
  ["Fijne communicatie vooraf en een strak opgebouwde avond. Echt een aanrader.","Studentenfeest","C"],
  ["Van rustige borrelmuziek naar een volle dansvloer, precies zoals we hadden gevraagd.","Verjaardag","D"]];
  var i=0,q=document.getElementById('rq'),w=document.getElementById('rw'),a=document.getElementById('ra'),d=document.querySelectorAll('#rd span');
  function show(n){i=(n+R.length)%R.length;q.style.opacity=0;setTimeout(function(){q.textContent='“'+R[i][0]+'”';w.textContent=R[i][1]+' · via Showbird';a.textContent=R[i][2];q.style.opacity=1;},200);d.forEach(function(s,k){s.classList.toggle('on',k===i)});}
  document.querySelector('.ctrl .prev').onclick=function(){show(i-1)};
  document.querySelector('.ctrl .next').onclick=function(){show(i+1)};
})();
