(function() {
  const carousel = document.getElementById('recommendations_img_con');
  let items = Array.from(carousel.children);
  let itemCount = items.length;
  let itemWidth, gap;

  function setupCarousel() {
    const style = getComputedStyle(carousel);
    gap = parseFloat(style.gap || 0);
    itemWidth = items[0].getBoundingClientRect().width + gap;

    [...items].forEach(item => {
      let cloneStart = item.cloneNode(true);
      let cloneEnd = item.cloneNode(true);
      cloneStart.classList.add('clone');
      cloneEnd.classList.add('clone');
      carousel.appendChild(cloneEnd);
      carousel.insertBefore(cloneStart, carousel.firstChild);
    });

    carousel.scrollLeft = itemWidth * itemCount;
  }

  function seamlessScroll() {
    let maxScroll = itemWidth * itemCount * 2;

    if (carousel.scrollLeft >= maxScroll - itemWidth) {
      carousel.scrollTo({ left: itemWidth * itemCount, behavior: 'auto' });
    } else if (carousel.scrollLeft <= itemWidth) {
      carousel.scrollTo({ left: maxScroll - itemWidth * itemCount, behavior: 'auto' });
    }
  }

  window.addEventListener('DOMContentLoaded', setupCarousel);
  carousel.addEventListener('scroll', seamlessScroll);
  window.addEventListener('resize', setupCarousel);
})();
