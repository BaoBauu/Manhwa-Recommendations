const carousel = document.getElementById('recommendations_img_con');
let itemWidth;

window.addEventListener('DOMContentLoaded', () => {
  if (carousel.children.length === 0) return;
  itemWidth = carousel.children[0].offsetWidth;

  carousel.scrollLeft = itemWidth;
});

function moveFirstToEnd() {
  carousel.appendChild(carousel.children[0]);
  carousel.scrollLeft -= itemWidth;
}

function moveLastToStart() {
  carousel.insertBefore(carousel.lastElementChild, carousel.children[0]);
  carousel.scrollLeft += itemWidth;
}

carousel.addEventListener('scroll', () => {
  if (!itemWidth) return;

  while (carousel.scrollLeft >= itemWidth * 2) {
    moveFirstToEnd();
  }
  while (carousel.scrollLeft < itemWidth) {
    moveLastToStart();
  }
});

window.carouselNext = function () {
  carousel.scrollLeft += itemWidth;
};

window.carouselPrev = function () {
  carousel.scrollLeft -= itemWidth;
};
