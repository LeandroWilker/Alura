const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const btnPrev = document.querySelector('.anterior');
const btnNext = document.querySelector('.proximo');

let index = 0;

function mostrarSlide(n) {
  if (n >= slides.length) index = 0;
  if (n < 0) index = slides.length - 1;

  slides.forEach(slide => slide.classList.remove('ativo'));
  dots.forEach(dot => dot.classList.remove('ativo'));

  slides[index].classList.add('ativo');
  dots[index].classList.add('ativo');
}

btnNext.addEventListener('click', () => {
  index++;
  mostrarSlide(index);
});

btnPrev.addEventListener('click', () => {
  index--;
  mostrarSlide(index);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    mostrarSlide(index);
  });
});

// Troca automática a cada 5 segundos
let autoplayTimer = null;
const autoplayInterval = 6000; // ms

function startAutoplay(){
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    index++;
    mostrarSlide(index);
  }, autoplayInterval);
}

function stopAutoplay(){
  if(autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
}

// iniciar autoplay
mostrarSlide(index);
startAutoplay();
