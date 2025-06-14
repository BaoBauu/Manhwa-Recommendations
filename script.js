const slides = document.querySelectorAll('#recommendationsimgcon .latest_con');
const dots = document.querySelectorAll('.indicators .dot');
let current = 0;
const total = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'flex' : 'none';
    dots[i].classList.toggle('active', i === index);
  });
}

showSlide(current);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    current = i;
    showSlide(current);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    current = (current + 1) % total; // Loop to first
    showSlide(current);
  }
  if (e.key === 'ArrowLeft') {
    current = (current - 1 + total) % total; // Loop to last
    showSlide(current);
  }
});

let startX = null;
document.getElementById('recommendationsimgcon').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
document.getElementById('recommendationsimgcon').addEventListener('touchend', e => {
  if (startX === null) return;
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) { // Swipe right
    current = (current - 1 + total) % total;
    showSlide(current);
  }
  if (startX - endX > 50) { // Swipe left
    current = (current + 1) % total;
    showSlide(current);
  }
  startX = null;
});
