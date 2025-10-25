// ====== script.js ======

// Utility selector
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// === 1. Toggle Dropdown Menu ===
const dropdownButton = $('#dropdownButton');
const dropdownMenu = $('#dropdownMenu');

if (dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener('click', e => {
    e.stopPropagation();
    const isExpanded = dropdownMenu.classList.toggle('show');
    dropdownButton.setAttribute('aria-expanded', isExpanded);
  });

  // Tutup dropdown jika klik di luar
  window.addEventListener('click', () => {
    if (dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Auto close saat layar membesar
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// === 2. Efek Fade-in pada Section saat Halaman Dimuat ===
window.addEventListener('DOMContentLoaded', () => {
  $$('section').forEach((section, i) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, i * 200);
  });
});

// === 3. Tombol Back to Top ===
const backToTopBtn = $('#backToTopBtn');

if (backToTopBtn) {
  // Tampilkan tombol saat scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Fungsi scroll ke atas saat diklik
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}