"use strict";

/* ==========================================================================
   1. DATA AWAL (Array of Objects - Sesuai Batasan Teknis Tanpa Fetch)
   ========================================================================== */
const dataMenu = [
  {
    id: 1,
    nama: "Paket Ayam Geprek",
    kategori: "paket",
    harga: "Rp15.000",
    badge: null,
    items: ["Ayam krispi dada/paha atas", "Nasi putih pulen hangat", "Sambal geprek pedas level 1–5", "Lalapan segar"],
  },
  {
    id: 2,
    nama: "Paket Komplit D'Okeh",
    kategori: "paket",
    harga: "Rp18.000",
    badge: "Paling Laris",
    items: ["Ayam krispi paha atas/dada", "Nasi putih porsi jumbo", "Sambal geprek korek mantap", "Es teh manis jumbo"],
  },
  {
    id: 3,
    nama: "Paket Sayap Hemat",
    kategori: "hemat",
    harga: "Rp12.000",
    badge: null,
    items: ["Sayap ayam krispi renyah", "Nasi putih hangat", "Saus sambal atau geprek", "Es teh tawar"],
  },
  {
    id: 4,
    nama: "Es Teh Manis Jumbo",
    kategori: "minuman",
    harga: "Rp4.000",
    badge: null,
    items: ["Teh melati segar racikan khas", "Gula pasir asli", "Porsi gelas jumbo 22 oz"],
  },
];

/* ==========================================================================
   2. FITUR 1: NAVIGASI MOBILE
   ========================================================================== */
const btnMenu = document.querySelector("#btn-menu");
const navUtama = document.querySelector("#nav-utama");

if (btnMenu && navUtama) {
  btnMenu.addEventListener("click", () => {
    const isExpanded = btnMenu.getAttribute("aria-expanded") === "true";
    btnMenu.setAttribute("aria-expanded", String(!isExpanded));
    navUtama.classList.toggle("is-open");
  });

  // Tutup navigasi saat tautan diklik (khusus mobile)
  navUtama.querySelectorAll(".nav-link").forEach((tautan) => {
    tautan.addEventListener("click", () => {
      navUtama.classList.remove("is-open");
      btnMenu.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   3. FITUR 2 & 3: DAFTAR MENU DINAMIS & FILTER
   ========================================================================== */
const menuContainer = document.querySelector("#menu-container");
const tombolFilter = document.querySelectorAll(".btn-filter");

function buatKartuMenu(item) {
  const article = document.createElement("article");
  article.classList.add("menu-card");
  if (item.badge) {
    article.classList.add("menu-card--featured");

    const pBadge = document.createElement("p");
    pBadge.classList.add("badge");
    pBadge.textContent = item.badge;
    article.append(pBadge);
  }

  const h3 = document.createElement("h3");
  h3.classList.add("card-title");
  h3.textContent = item.nama;

  const pPrice = document.createElement("p");
  pPrice.classList.add("menu-price");
  pPrice.textContent = item.harga;

  const ul = document.createElement("ul");
  ul.classList.add("menu-items");
  item.items.forEach((subItem) => {
    const li = document.createElement("li");
    li.textContent = subItem;
    ul.append(li);
  });

  const btnPesan = document.createElement("a");
  btnPesan.classList.add("button", "button--primary");
  btnPesan.href = "#kontak";
  btnPesan.textContent = "Pesan Menu Ini";

  article.append(h3, pPrice, ul, btnPesan);
  return article;
}

function renderMenu(data) {
  if (!menuContainer) return;

  if (data.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = "Tidak ada menu pada kategori ini.";
    pesanKosong.style.textAlign = "center";
    menuContainer.replaceChildren(pesanKosong);
    return;
  }

  const kumpulanKartu = data.map((item) => buatKartuMenu(item));
  menuContainer.replaceChildren(...kumpulanKartu);
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    tombolFilter.forEach((b) => b.classList.remove("is-active"));
    tombol.classList.add("is-active");

    const kategoriDipilih = tombol.dataset.kategori;
    if (kategoriDipilih === "semua") {
      renderMenu(dataMenu);
    } else {
      const terfilter = dataMenu.filter((item) => item.kategori === kategoriDipilih);
      renderMenu(terfilter);
    }
  });
});

// Render awal
renderMenu(dataMenu);

/* ==========================================================================
   4. FITUR 4: FAQ ACCORDION (Aksesibilitas & Keyboard)
   ========================================================================== */
const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const idJawaban = tombol.getAttribute("aria-controls");
    const panelJawaban = document.getElementById(idJawaban);
    const isTerbuka = tombol.getAttribute("aria-expanded") === "true";

    // Tutup seluruh panel lain
    faqButtons.forEach((bLain) => {
      if (bLain !== tombol) {
        bLain.setAttribute("aria-expanded", "false");
        const idLain = bLain.getAttribute("aria-controls");
        const panelLain = document.getElementById(idLain);
        if (panelLain) panelLain.hidden = true;
        const iconLain = bLain.querySelector(".faq-icon");
        if (iconLain) iconLain.textContent = "+";
      }
    });

    // Toggle panel yang diklik
    tombol.setAttribute("aria-expanded", String(!isTerbuka));
    if (panelJawaban) {
      panelJawaban.hidden = isTerbuka;
    }

    const icon = tombol.querySelector(".faq-icon");
    if (icon) {
      icon.textContent = isTerbuka ? "+" : "−";
    }
  });
});

/* ==========================================================================
   5. FITUR 5: FORM VALIDASI & PESAN SUKSES
   ========================================================================== */
const formPesanan = document.querySelector("#form-pesanan");
const inputNama = document.querySelector("#input-nama");
const selectMenu = document.querySelector("#select-menu");
const inputCatatan = document.querySelector("#input-catatan");
const errNama = document.querySelector("#err-nama");
const errMenu = document.querySelector("#err-menu");
const pesanSukses = document.querySelector("#pesan-sukses");

if (formPesanan) {
  formPesanan.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah reload halaman

    let isValid = true;
    const nama = inputNama.value.trim();
    const menu = selectMenu.value;
    const catatan = inputCatatan.value.trim();

    // Validasi Nama
    if (nama.length < 3) {
      isValid = false;
      inputNama.setAttribute("aria-invalid", "true");
      errNama.textContent = "Nama pemesan minimal 3 karakter.";
    } else {
      inputNama.removeAttribute("aria-invalid");
      errNama.textContent = "";
    }

    // Validasi Pilihan Menu
    if (!menu) {
      isValid = false;
      selectMenu.setAttribute("aria-invalid", "true");
      errMenu.textContent = "Silakan pilih salah satu menu.";
    } else {
      selectMenu.removeAttribute("aria-invalid");
      errMenu.textContent = "";
    }

    if (!isValid) return;

    // Bersihkan kontainer sukses dan susun elemen teks tanpa innerHTML
    pesanSukses.replaceChildren();

    const judulSukses = document.createElement("strong");
    judulSukses.textContent = "Pesanan Berhasil Dicatat!";

    const pDetail = document.createElement("p");
    pDetail.textContent = `Terima kasih, ${nama}. Pesanan Anda: "${menu}" ${catatan ? `(Catatan: ${catatan})` : ""} sedang kami siapkan.`;

    pesanSukses.append(judulSukses, pDetail);
    pesanSukses.hidden = false;

    // Reset isi form
    formPesanan.reset();
  });
}

/* ==========================================================================
   6. FITUR 6: TOMBOL KEMBALI KE ATAS (Scroll Interaction)
   ========================================================================== */
const btnTop = document.querySelector("#btn-top");

if (btnTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTop.hidden = false;
    } else {
      btnTop.hidden = true;
    }
  });

  btnTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ==========================================================================
   7. FITUR 7: PERUBAHAN TEMA BERBASIS CLASS / DATASET
   ========================================================================== */
const btnTema = document.querySelector("#btn-tema");

if (btnTema) {
  btnTema.addEventListener("click", () => {
    const isDark = document.body.dataset.theme === "dark";
    if (isDark) {
      delete document.body.dataset.theme;
      btnTema.textContent = "🌙";
      btnTema.setAttribute("aria-label", "Ganti ke tema gelap");
    } else {
      document.body.dataset.theme = "dark";
      btnTema.textContent = "☀️";
      btnTema.setAttribute("aria-label", "Ganti ke tema terang");
    }
  });
}
