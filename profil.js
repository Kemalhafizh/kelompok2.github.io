/* =========================
   Profil Sekolah - JS
   ========================= */

// Fungsi toggle dropdown menu
function toggleDropdown(event) {
  event.stopPropagation(); // cegah event bubbling
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Tutup dropdown jika klik di luar menu
window.addEventListener("click", function () {
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown) {
    dropdown.style.display = "none";
  }
});

// Efek hover di galeri (smooth scaling sudah ada di CSS, ini tambahan kecil)
document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("mouseenter", () => {
    img.style.transition = "transform 0.3s ease";
    img.style.transform = "scale(1.05)";
  });
  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

// Interaksi klik gambar galeri
document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    alert(`📸 Kamu membuka foto: ${img.alt}`);
    console.log(`Foto dibuka: ${img.alt}`);
  });
});
