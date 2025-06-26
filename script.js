const slides = Array.from(document.querySelectorAll('#recommendations_img_con .latest_con'));
const dots = Array.from(document.querySelectorAll('.indicators .dot'));
let current = 0;

function isMobile() {
  return window.innerWidth <= 600;
}

function showSlide(index) {
  if (!isMobile()) {
    slides.forEach(slide => slide.style.display = 'flex');
    dots.forEach(dot => dot.classList.remove('active'));
    return;
  }
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'flex' : 'none';
    dots[i].classList.toggle('active', i === index);
  });
}

function goToSlide(idx) {
  const total = slides.length;
  current = (idx + total) % total; // Infinite loop
  showSlide(current);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
  });
});

document.addEventListener('keydown', (e) => {
  if (!isMobile()) return;
  if (e.key === 'ArrowRight') goToSlide(current + 1);
  if (e.key === 'ArrowLeft') goToSlide(current - 1);
});

let startX = null;
const con = document.getElementById('recommendations_img_con');
if (con) {
  con.addEventListener('touchstart', e => {
    if (!isMobile()) return;
    startX = e.touches[0].clientX;
  });
  con.addEventListener('touchend', e => {
    if (!isMobile() || startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) goToSlide(current - 1); // Swipe right
    if (startX - endX > 50) goToSlide(current + 1); // Swipe left
    startX = null;
  });
}

window.addEventListener('resize', () => showSlide(current));

showSlide(current);

const searchIcon = document.getElementById('search_icon');
const searchBar = document.getElementById('search_bar');

searchIcon.addEventListener('click', () => {
  searchIcon.style.display = 'none';
  searchBar.style.display = 'block';
  searchBar.classList.add('active');
  searchBar.focus();
});
searchBar.addEventListener('blur', () => {
  searchBar.style.display = 'none';
  searchBar.classList.remove('active');
  searchIcon.style.display = 'block';
});
