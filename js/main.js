(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Sticky header
  var header=document.querySelector('header');
  function onScroll(){header.classList.toggle('scrolled',window.scrollY>40);}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  // Mobiel menu
  var burger=document.querySelector('.burger');
  burger.addEventListener('click',function(){var o=document.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Menu sluiten':'Menu openen');});
  document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open');burger.setAttribute('aria-expanded','false');});});
  // Scroll-animaties
  var els=document.querySelectorAll('.rv');
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});}
  else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.ev.rv').forEach(function(e,i){e.style.setProperty('--d',(i*0.07)+'s')});
    els.forEach(function(e){io.observe(e)});}
  // Video-lightbox: zet per clip de YouTube-ID in data-yt
  var modal=document.getElementById('vmodal'),vbody=document.getElementById('vbody');
  function closeM(){modal.classList.remove('open');setTimeout(function(){vbody.innerHTML='';},300);}
  document.querySelectorAll('[data-yt]').forEach(function(a){a.addEventListener('click',function(ev){ev.preventDefault();var id=a.getAttribute('data-yt');
    vbody.innerHTML=id?'<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="Videoclip" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>':'<div class="msg"><b>Clip volgt binnenkort</b><span>Voeg de YouTube-ID toe in data-yt.</span></div>';
    modal.classList.add('open');});});
  modal.addEventListener('click',function(e){if(e.target===modal||e.target.classList.contains('close'))closeM();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeM();document.body.classList.remove('menu-open');}});
  // Reviews-carrousel
  var R=[["Vanaf het eerste nummer stond de dansvloer vol. Hij voelde precies aan wat onze gasten wilden.","Bruiloft","A"],
  ["Tresor met de live saxofonist was het hoogtepunt van ons bedrijfsfeest. Collega's hebben het er nog steeds over.","Bedrijfsfeest","B"],
  ["Fijne communicatie vooraf en een strak opgebouwde avond. Echt een aanrader.","Studentenfeest","C"],
  ["Van rustige borrelmuziek naar een volle dansvloer, precies zoals we hadden gevraagd.","Verjaardag","D"]];
  var track=document.getElementById('rtrack'),dots=document.getElementById('rdots'),page=0,timer;
  function per(){return 2;}
  function pages(){return Math.ceil(R.length/per());}
  function card(r,i){return '<div class="rcard '+(i%2?'b':'a')+'"><div class="st" aria-label="5 sterren">★★★★★</div><p>“'+r[0]+'”</p><div class="who"><span class="av">'+r[2]+'</span><span><b>[Naam]</b> · '+r[1]+'</span></div></div>';}
  function render(anim){var n=per(),s=page*n,html='';for(var i=0;i<n;i++){var r=R[(s+i)%R.length];html+=card(r,i);}
    if(anim&&!reduce){track.querySelectorAll('.rcard').forEach(function(c){c.classList.add('out')});setTimeout(function(){track.innerHTML=html;},250);}else track.innerHTML=html;
    var d='';for(var p=0;p<pages();p++)d+='<span class="'+(p===page?'on':'')+'"></span>';dots.innerHTML=d;}
  function go(dir){page=(page+dir+pages())%pages();render(true);restart();}
  function restart(){if(reduce)return;clearInterval(timer);timer=setInterval(function(){go(1)},7000);}
  document.querySelector('.rctrl .prev').onclick=function(){go(-1)};
  document.querySelector('.rctrl .next').onclick=function(){go(1)};
  track.addEventListener('mouseenter',function(){clearInterval(timer)});track.addEventListener('mouseleave',restart);
  render(false);restart();
})();
