'use strict';

// ===================================
// KANTAK.JS - FINAL VERSION
// ===================================

// -------------------- Utilities --------------------
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => root.querySelectorAll(selector);

const isValidPhone = (phone) => {
  const cleaned = phone.replace(/[^+0-9]/g, '');
  return /^((\+62|62|0)\d{8,12})$/.test(cleaned);
};

function setFormStatus(container, { type = 'info', text = '' } = {}) {
  if (!container) return;
  container.innerHTML = `<p class="status-${type}">${text}</p>`;
}

const simulateSend = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('Simulating send:', payload);
      resolve({ ok: true, message: 'Pesan berhasil dikirim. Terima kasih!' });
    }, 1000);
  });

// -------------------- Dropdown --------------------
function setupDropdown() {
  const dropdownButton = $('#dropdownButton');
  const dropdownMenu = $('#dropdownMenu');

  if (!dropdownButton || !dropdownMenu) return;

  // 1. Event saat tombol diklik
  dropdownButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShown = dropdownMenu.classList.toggle('show');
    dropdownButton.setAttribute('aria-expanded', isShown);
  });

  // 2. Tutup jika klik di luar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdownMenu.classList.remove('show');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  // 3. Tutup jika tekan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownMenu.classList.remove('show');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// -------------------- Quick Form Handling --------------------
function setupQuickForm() {
  const form = $('#quickForm');
  if (!form) return;

  let statusContainer = $('.form-status', form.parentElement);
  if (!statusContainer) {
    statusContainer = document.createElement('div');
    statusContainer.className = 'form-status';
    form.insertAdjacentElement('afterend', statusContainer);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const nama = formData.get('nama').trim();
    const hp = formData.get('hp').trim();
    const pesan = formData.get('pesan').trim();
    
    // Validasi
    if (!nama || !hp || !pesan) {
      return setFormStatus(statusContainer, { type: 'error', text: 'Semua kolom wajib diisi.' });
    }
    if (!isValidPhone(hp)) {
      return setFormStatus(statusContainer, { type: 'error', text: 'Format nomor HP tidak valid.' });
    }

    // Proses pengiriman
    const submitBtn = $('button[type="submit"]', form);
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    setFormStatus(statusContainer, { type: 'info', text: 'Mohon tunggu...' });

    simulateSend({ nama, hp, pesan })
      .then(res => {
        if (res.ok) {
          setFormStatus(statusContainer, { type: 'success', text: res.message });
          form.reset();
        } else {
          setFormStatus(statusContainer, { type: 'error', text: 'Gagal mengirim pesan.' });
        }
      })
      .catch(() => {
        setFormStatus(statusContainer, { type: 'error', text: 'Terjadi kesalahan jaringan.' });
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
  });
}

// -------------------- Reveal on scroll --------------------
function setupRevealOnScroll() {
  const targets = $$('.card, .map-container, .faq details');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(target => observer.observe(target));
}

// -------------------- Back to Top Button --------------------
function setupBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTopBtn';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.title = 'Kembali ke atas';
  backToTopBtn.innerHTML = '⬆';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.scrollY > 300);
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -------------------- Init --------------------
document.addEventListener('DOMContentLoaded', () => {
  setupDropdown();
  setupQuickForm();
  setupRevealOnScroll();
  setupBackToTop();
});