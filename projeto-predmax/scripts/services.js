// Control simple carousel for services
(function(){
  const track = document.querySelector('.services-track');
  const prev = document.querySelector('.services-btn.prev');
  const next = document.querySelector('.services-btn.next');
  let index = 0;

  if(!track || !prev || !next) return;

  const cards = Array.from(track.children);
  const cardWidth = () => cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 20);

  function update(){
    const w = cardWidth();
    track.style.transform = `translateX(${-index * w}px)`;
  }

  function visibleCount(){
    const viewport = document.querySelector('.services-viewport');
    if(!viewport) return 1;
    const vw = viewport.getBoundingClientRect().width;
    const cw = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 20);
    return Math.max(1, Math.floor((vw + 10) / cw));
  }

  function getMaxIndex(){
    return Math.max(0, cards.length - visibleCount());
  }

  function clamp(i){
    return Math.max(0, Math.min(i, getMaxIndex()));
  }

  window.addEventListener('resize', () => {
    index = clamp(index);
    update();
  });

  prev.addEventListener('click', () => {
    // loop infinito: se estiver no início, vai para o fim
    if(index <= 0){
      index = getMaxIndex();
    } else {
      index = index - 1;
    }
    update();
  });

  next.addEventListener('click', () => {
    // loop infinito: se estiver no fim, volta ao início
    if(index >= getMaxIndex()){
      index = 0;
    } else {
      index = index + 1;
    }
    update();
  });

  // touch support
  let startX = 0;
  let isDown = false;
  track.addEventListener('pointerdown', (e) => { isDown = true; startX = e.clientX; track.setPointerCapture(e.pointerId); });
  track.addEventListener('pointerup', (e) => { if(!isDown) return; isDown = false; const diff = e.clientX - startX; if(diff > 40) prev.click(); else if(diff < -40) next.click(); });

  // init
  index = 0;
  update();
  
  // Autoplay opcional
  let autoplayInterval = 4000; // ms, 0 para desativar
  let autoplayTimer = null;

  function startAutoplay(){
    if(!autoplayInterval) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      next.click();
    }, autoplayInterval);
  }

  function stopAutoplay(){
    if(autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  // Pause autoplay on interaction
  const viewport = document.querySelector('.services-viewport');
  [viewport, prev, next, track].forEach(el => {
    if(!el) return;
    el.addEventListener('mouseenter', stopAutoplay);
    el.addEventListener('mouseleave', startAutoplay);
    el.addEventListener('focusin', stopAutoplay);
    el.addEventListener('focusout', startAutoplay);
    el.addEventListener('pointerdown', stopAutoplay);
  });

  startAutoplay();
})();

