(function() {
  const carousel = document.getElementById('recommendations_img_con');
  let items, itemCount, itemWidth, gap, busy = false;

  function isMobile() {
    return window.innerWidth <= 600;
  }

  function setupCarousel() {
    Array.from(carousel.querySelectorAll('.clone')).forEach(clone => clone.remove());

    items = Array.from(carousel.querySelectorAll('.latest_con:not(.clone)'));
    itemCount = items.length;
    const style = getComputedStyle(carousel);
    gap = parseFloat(style.gap || 0);

    if (isMobile() && itemCount > 0) {
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

      setTimeout(() => {
        itemWidth = items[0].getBoundingClientRect().width + gap;
        carousel.scrollLeft = itemWidth * itemCount;
      }, 10);
    } else {
      carousel.scrollLeft = 0;
    }
  }

  function seamlessScroll() {
    if (!isMobile() || busy || !itemWidth) return;

    const maxScroll = itemWidth * itemCount * 2;
    if (carousel.scrollLeft >= maxScroll - itemWidth * 0.5) {
      busy = true;
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = carousel.scrollLeft - itemWidth * itemCount;
      setTimeout(() => {
        carousel.style.scrollBehavior = 'smooth';
        busy = false;
      }, 20);
    }
    else if (carousel.scrollLeft <= itemWidth * 0.5) {
      busy = true;
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = carousel.scrollLeft + itemWidth * itemCount;
      setTimeout(() => {
        carousel.style.scrollBehavior = 'smooth';
        busy = false;
      }, 20);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setupCarousel();
    carousel.addEventListener('scroll', seamlessScroll, { passive: true });
    window.addEventListener('resize', setupCarousel);
  });
})();
