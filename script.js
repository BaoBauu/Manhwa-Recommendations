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

carousel.addEventListener('scroll', () => {
  const children = carousel.children;
  const firstReal = children[1];
  const lastReal = children[children.length - 2];

  if (carousel.scrollLeft <= firstReal.offsetLeft - carousel.offsetLeft - 1) {
      carousel.scrollLeft = lastReal.offsetLeft - carousel.offsetLeft;
  }
    if (
    carousel.scrollLeft >=
    lastReal.offsetLeft - carousel.offsetLeft + lastReal.offsetWidth
  ) {
      carousel.scrollLeft = firstReal.offsetLeft - carousel.offsetLeft;
  }
});
