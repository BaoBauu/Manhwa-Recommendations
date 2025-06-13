const carousel = document.getElementById('recommendations_img_con');
let itemWidth, totalSlides;

function setupCarousel() {
  Array.from(carousel.querySelectorAll('.clone')).forEach(clone => clone.remove());

  const items = Array.from(carousel.children);
  if (items.length === 0) return;

  itemWidth = items[0].offsetWidth;
  totalSlides = items.length;

  const firstClone = items[0].cloneNode(true);
  firstClone.classList.add('clone');
  const lastClone = items[items.length - 1].cloneNode(true);
  lastClone.classList.add('clone');

  carousel.insertBefore(lastClone, items[0]);
  carousel.appendChild(firstClone);

  carousel.scrollLeft = itemWidth;
}

function onScroll() {
  if (!itemWidth) return;
  if (carousel.scrollLeft >= itemWidth * (totalSlides + 0.5)) {
    carousel.style.scrollBehavior = 'auto';
    carousel.scrollLeft = itemWidth;
  }
  if (carousel.scrollLeft <= 0.5 * itemWidth) {
    carousel.style.scrollBehavior = 'auto';
    carousel.scrollLeft = itemWidth * totalSlides;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setupCarousel();
  carousel.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', setupCarousel);
});
