const carousel = document.getElementById('recommendations_img_con');

function updateShadows() {
  const atStart = carousel.scrollLeft <= 2;
  const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 2;

  carousel.classList.toggle('carousel-shadow-left', !atStart);
  carousel.classList.toggle('carousel-shadow-right', !atEnd);
}

carousel.addEventListener('scroll', () => {
  updateShadows();

  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 2) {
    setTimeout(() => {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    }, 250);
  }
});

window.addEventListener('resize', updateShadows);
window.addEventListener('DOMContentLoaded', updateShadows);
