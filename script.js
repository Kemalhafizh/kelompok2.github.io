// ====== script.js ======

// Utility selector
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// Toggle dropdown menu
function toggleDropdown(event) {
  event.stopPropagation();
  $('.dropdown')?.classList.toggle('show');
}

// Tutup dropdown kalau klik di luar
window.addEventListener('click', e => {
  const dropdown = $('.dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

// Smooth scroll untuk anchor link internal
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = $(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

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

// Responsive nav toggle (auto close saat resize)
window.addEventListener('resize', () => {
  const dropdown = $('.dropdown');
  if (window.innerWidth > 768 && dropdown?.classList.contains('show')) {
    dropdown.classList.remove('show');
  }
});

// Highlight link aktif di menu saat scroll
window.addEventListener('scroll', () => {
  const sections = $$('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      $$('.dropdown-content a').forEach(a => a.classList.remove('active'));
      const activeLink = $(`.dropdown-content a[href="#${section.id}"]`);
      activeLink?.classList.add('active');
    }
  });
});

// Efek hover interaktif di gambar
$$('img').forEach(img => {
  img.style.transition = 'transform 0.3s ease';
  img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.05)');
  img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
});

// Tombol back to top
const backToTopBtn = document.createElement('button');
Object.assign(backToTopBtn, { textContent: '⬆', className: 'back-to-top' });
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
  zIndex: '1000'
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(backToTopBtn);

// Munculin tombol back to top pas scroll
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
