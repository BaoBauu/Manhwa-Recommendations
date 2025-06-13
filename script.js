const carousel = document.getElementById('recommendations_img_con');

const items = carousel.children;
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

carousel.insertBefore(lastClone, items[0]);
carousel.appendChild(firstClone);

function setToFirst() {
  const firstReal = carousel.children[1];
  carousel.scrollLeft = firstReal.offsetLeft - carousel.offsetLeft;
}
window.addEventListener('DOMContentLoaded', setToFirst);

function updateShadows() {
  const atStart = carousel.scrollLeft <= 2;
  const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 2;
  carousel.classList.toggle('carousel-shadow-left', !atStart);
  carousel.classList.toggle('carousel-shadow-right', !atEnd);
}
carousel.addEventListener('scroll', updateShadows);
window.addEventListener('resize', updateShadows);
window.addEventListener('DOMContentLoaded', updateShadows);

carousel.addEventListener('scroll', () => {
  const children = carousel.children;
  const firstReal = children[1];
  const lastReal = children[children.length - 2];

  if (carousel.scrollLeft <= firstReal.offsetLeft - carousel.offsetLeft - 1) {
    carousel.scrollLeft = lastReal.offsetLeft - carousel.offsetLeft;
  }
  if (carousel.scrollLeft >= lastReal.offsetLeft - carousel.offsetLeft + lastReal.offsetWidth - 1) {
    carousel.scrollLeft = firstReal.offsetLeft - carousel.offsetLeft;
  }
});
