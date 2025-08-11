// === tentang.js ===
document.addEventListener("DOMContentLoaded", () => {

  // ===== Dropdown Menu =====
  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownContent = document.getElementById("dropdownMenu");

  // Fungsi toggle
  function toggleDropdown(event) {
    event.stopPropagation();
    dropdownContent.classList.toggle("show");
  }

  if (dropdownButton && dropdownContent) {
    // Klik tombol ☰
    dropdownButton.addEventListener("click", toggleDropdown);

    // Keyboard (Enter / Space)
    dropdownButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDropdown(e);
      }
    });

    // Klik di luar menu → tutup menu
    document.addEventListener("click", (e) => {
      if (!dropdownContent.contains(e.target) && !dropdownButton.contains(e.target)) {
        dropdownContent.classList.remove("show");
      }
    });
  }

  // ===== Smooth Scroll untuk anchor link =====
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== Animasi Fade-in untuk .anggota =====
  const anggotaCards = document.querySelectorAll(".anggota");

  if (anggotaCards.length > 0) {
    anggotaCards.forEach((card) => card.classList.add("hidden"));

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.remove("hidden");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    anggotaCards.forEach((card) => observer.observe(card));

    // Efek hover border
    anggotaCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.borderLeftColor = "#0096c7";
      });
      card.addEventListener("mouseleave", () => {
        card.style.borderLeftColor = "#00b4d8";
      });
    });
  }
});

  // ===== Scroll to Top =====
  const scrollBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.classList.add("show");
      scrollBtn.classList.remove("hide");
    } else {
      scrollBtn.classList.add("hide");
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

