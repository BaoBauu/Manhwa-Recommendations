(function() {
  const carousel = document.getElementById('recommendations_img_con');
  let itemWidth = 0;
  let itemCount = 0;
  let isTransitioning = false;

  function isMobile() {
    return window.matchMedia('(max-width: 600px)').matches;
  }

  function setupCarousel() {
    if (!isMobile()) {
      Array.from(carousel.querySelectorAll('.clone')).forEach(clone => clone.remove());
      carousel.scrollLeft = 0;
      return;
    }

    Array.from(carousel.querySelectorAll('.clone')).forEach(clone => clone.remove());

    const items = Array.from(carousel.querySelectorAll('.latest_con:not(.clone)'));
    if (items.length === 0) return;

    itemWidth = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).gap || 0);
    itemCount = items.length;

    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      carousel.appendChild(clone);
    });
    for (let i = items.length - 1; i >= 0; i--) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('clone');
      carousel.insertBefore(clone, carousel.firstChild);
    }

    carousel.scrollLeft = itemWidth * itemCount;
  }

  function onScroll() {
    if (!isMobile() || isTransitioning || itemWidth === 0) return;

    const maxScroll = itemWidth * itemCount * 2;
    if (carousel.scrollLeft < itemWidth * 0.5) {
      isTransitioning = true;
      carousel.scrollLeft = carousel.scrollLeft + itemWidth * itemCount;
      setTimeout(() => { isTransitioning = false; }, 20);
    } else if (carousel.scrollLeft > maxScroll - itemWidth * 0.5) {
      isTransitioning = true;
      carousel.scrollLeft = carousel.scrollLeft - itemWidth * itemCount;
      setTimeout(() => { isTransitioning = false; }, 20);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setupCarousel();
    carousel.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      setupCarousel();
    });
  });
})();
