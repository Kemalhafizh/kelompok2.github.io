// ====== script.js ======

// Utility selector
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// Toggle dropdown menu
const dropdownButton = $('#dropdownButton');
const dropdownMenu = $('#dropdownMenu');

if (dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener('click', e => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  // Tutup dropdown kalau klik di luar
  window.addEventListener('click', e => {
    if (!dropdownMenu.contains(e.target) && e.target !== dropdownButton) {
      dropdownMenu.classList.remove('show');
    }
  });

  // Auto close kalau resize ke layar besar
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      dropdownMenu.classList.remove('show');
    }
  });
}

// Efek fade-in saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  $$('section').forEach((section, i) => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    setTimeout(() => {
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }, i * 200);
  });
});

// Efek hover interaktif di gambar (khusus gambar konten, bukan semua)
$$('img.flowchart-img, .logo-img').forEach(img => {
  img.style.transition = 'transform 0.3s ease';
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.05)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
  });
});

// Tombol back to top
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆';
backToTopBtn.className = 'back-to-top';

// Styling dasar tombol
Object.assign(backToTopBtn.style, {
  display: 'none',
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 15px',
  fontSize: '18px',
  borderRadius: '50%',
  border: 'none',
  background: '#333',
  color: '#fff',
  cursor: 'pointer',
  zIndex: '1000',
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(backToTopBtn);

// Munculin tombol back to top pas scroll
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
