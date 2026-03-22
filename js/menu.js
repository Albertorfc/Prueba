const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const searchToggle = document.querySelector('.search-toggle');
const searchPanel = document.querySelector('.search-panel');
const header = document.querySelector('.site-header');
const isHome = document.body.classList.contains('home');

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove('is-open');
  menuToggle.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

function closeSearch() {
  if (!searchPanel || !searchToggle) return;
  searchPanel.classList.remove('is-open');
  searchToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
      closeSearch();
    }
  });
}

if (searchToggle && searchPanel) {
  searchToggle.addEventListener('click', () => {
    const isOpen = searchPanel.classList.toggle('is-open');
    searchToggle.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      closeMenu();
    }
  });
}

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

if (mobileMenu) {
  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) {
      closeMenu();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    closeSearch();
  }
});

function updateHeaderOnScroll() {
  if (!header) return;

  if (!isHome || window.innerWidth > 900) {
    header.classList.add('compact');
    return;
  }

  header.classList.toggle('compact', window.scrollY > 72);
}

window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
window.addEventListener('resize', updateHeaderOnScroll);
updateHeaderOnScroll();
