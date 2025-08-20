'use strict';

// -------------------- Utilities --------------------
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const elCreate = (tag, attrs = {}) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};

const isValidPhone = (phone) => {
  const cleaned = phone.replace(/[^+0-9]/g, '');
  return /^((\+62|62|0)\d{8,12})$/.test(cleaned);
};

function setFormStatus(container, { type = 'info', text = '' } = {}) {
  if (!container) return;
  container.innerHTML = '';
  container.className = 'form-status';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');

  const p = document.createElement('p');
  p.textContent = text;
  p.className = type === 'error'
    ? 'status-error'
    : type === 'success'
    ? 'status-success'
    : 'status-info';
  container.appendChild(p);
}

const simulateSend = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, message: 'Pesan berhasil dikirim.' });
    }, 900);
  });

// -------------------- Dropdown --------------------
window.toggleDropdown = function (event) {
  event.stopPropagation();
  const menu = qs('#dropdownMenu');
  if (!menu) return;
  const isShown = menu.classList.toggle('show');
  const btn = event.currentTarget || event.target;
  if (btn && btn.setAttribute) {
    btn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
  }
};

function setupDropdownClose() {
  document.addEventListener('click', (ev) => {
    const menu = qs('#dropdownMenu');
    if (!menu) return;
    if (!ev.target.closest('.dropdown')) menu.classList.remove('show');
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      const menu = qs('#dropdownMenu');
      if (menu) menu.classList.remove('show');
    }
  });
}

// -------------------- Form handling (quickForm) --------------------
window.handleQuickForm = function (ev) {
  ev.preventDefault();
  const form = qs('#quickForm');
  if (!form) return false;

  const namaEl = qs('#nama', form);
  const hpEl = qs('#hp', form);
  const pesanEl = qs('#pesan', form);

  let status = qs('.form-status', form);
  if (!status) {
    status = elCreate('div');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
  }

  const nama = namaEl.value.trim();
  const hp = hpEl.value.trim();
  const pesan = pesanEl.value.trim();

  const errors = [];
  if (!nama) errors.push('Nama harus diisi.');
  if (!hp) errors.push('Nomor HP harus diisi.');
  else if (!isValidPhone(hp)) errors.push('Format nomor HP tidak valid.');
  if (!pesan) errors.push('Pesan tidak boleh kosong.');

  if (errors.length) {
    setFormStatus(status, { type: 'error', text: errors.join(' ') });
    if (!nama) namaEl.focus();
    else if (!hp || !isValidPhone(hp)) hpEl.focus();
    else pesanEl.focus();
    return false;
  }

  const submitBtn = qs('.btn-secondary', form);
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.dataset.origText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
  }

  const payload = { nama, hp, pesan, time: new Date().toISOString() };

  simulateSend(payload)
    .then((res) => {
      if (res.ok) {
        setFormStatus(status, { type: 'success', text: res.message });
        form.reset();
        status.focus && status.focus();
      } else {
        setFormStatus(status, { type: 'error', text: 'Gagal mengirim pesan.' });
      }
    })
    .catch(() => {
      setFormStatus(status, { type: 'error', text: 'Terjadi kesalahan jaringan.' });
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.textContent = submitBtn.dataset.origText || 'Kirim';
      }
    });

  return false;
};

// -------------------- Contact link logging --------------------
function setupContactLinkHandlers() {
  const phoneLink = qs(".contact-info a[href^='tel:']");
  const emailLink = qs(".contact-info a[href^='mailto:']");
  if (phoneLink) {
    phoneLink.addEventListener('click', () =>
      console.info('User clicked phone link to call the school')
    );
  }
  if (emailLink) {
    emailLink.addEventListener('click', () =>
      console.info('User clicked email link to contact the school')
    );
  }
}

// -------------------- Reveal on scroll --------------------
function setupRevealOnScroll() {
  const targets = qsa('.card, .map-container');
  if (!targets.length || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );

  targets.forEach((t) => obs.observe(t));
}

// -------------------- Init --------------------
document.addEventListener('DOMContentLoaded', () => {
  setupDropdownClose();
  setupContactLinkHandlers();
  setupRevealOnScroll();

  window.addEventListener('resize', () => {
    const menu = qs('#dropdownMenu');
    if (menu) menu.classList.remove('show');
  });

  document.documentElement.style.scrollBehavior = 'smooth';
});
