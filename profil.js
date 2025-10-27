
// Utility selector untuk kode yang lebih ringkas
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// === 1. Dropdown Menu ===
const dropdownButton = $('#dropdownButton');
const dropdownMenu = $('#dropdownMenu');

if (dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener('click', e => {
    e.stopPropagation();
    const isExpanded = dropdownMenu.classList.toggle('show');
    dropdownButton.setAttribute('aria-expanded', isExpanded);
  });

  // Event untuk menutup menu jika klik di luar area menu
  window.addEventListener('click', () => {
    if (dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// === 2. Interaksi Klik Gambar Galeri ===
$$('.gallery-item img').forEach((img) => {
  img.addEventListener('click', () => {
    alert(`📸 Kamu membuka foto: ${img.alt}`);
  });
});

// === 3. Tombol Back to Top ===
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTopBtn';
backToTopBtn.className = 'back-to-top';
backToTopBtn.title = 'Kembali ke atas';
backToTopBtn.innerHTML = '⬆';
document.body.appendChild(backToTopBtn);

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