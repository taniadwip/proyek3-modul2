"use strict";

// Selektor Elemen DOM
const statusBox = document.querySelector("#status-container");
const statusTeks = document.querySelector("#status-teks");
const btnCobaLagi = document.querySelector("#btn-coba-lagi");
const kartuProfil = document.querySelector("#kartu-profil");
const btnTema = document.querySelector("#btn-tema");

const profilAvatar = document.querySelector("#profil-avatar");
const profilNama = document.querySelector("#profil-nama");
const profilPeran = document.querySelector("#profil-peran");
const profilInstitusi = document.querySelector("#profil-institusi");
const profilBio = document.querySelector("#profil-bio");

const btnDetail = document.querySelector("#btn-detail");
const detailKonten = document.querySelector("#detail-konten");
const detailEmail = document.querySelector("#detail-email");
const detailLokasi = document.querySelector("#detail-lokasi");
const detailGithub = document.querySelector("#detail-github");
const detailStatus = document.querySelector("#detail-status");

const daftarSkill = document.querySelector("#daftar-skill");
const formSkill = document.querySelector("#form-skill");
const inputSkill = document.querySelector("#input-skill");
const errorSkill = document.querySelector("#error-skill");

// Penampung data lokal
let dataProfilAktif = null;

/**
 * Mengatur tampilan status box (loading, empty, error, success)
 */
function aturState(state, pesan) {
  statusBox.dataset.state = state;
  statusTeks.textContent = pesan;

  if (state === "success") {
    statusBox.hidden = true;
    kartuProfil.hidden = false;
  } else {
    statusBox.hidden = false;
    kartuProfil.hidden = state === "loading" || state === "error";
  }

  btnCobaLagi.hidden = state !== "error";
}

/**
 * Mengambil data profil dari JSON secara asinkron
 */
async function ambilDataProfil(path = "data/profile.json") {
  const respons = await fetch(path);
  if (!respons.ok) {
    throw new Error(`Gagal memuat profil: HTTP ${respons.status}`);
  }
  return await respons.json();
}

/**
 * Merender elemen daftar keterampilan menggunakan createElement dan replaceChildren
 */
function renderDaftarSkill(keterampilan) {
  if (!keterampilan || keterampilan.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.className = "pesan-kosong";
    pesanKosong.textContent = "Semua skill telah dihapus (kondisi kosong).";
    daftarSkill.replaceChildren(pesanKosong);
    return;
  }

  const elemenSkill = keterampilan.map((skill, index) => {
    const span = document.createElement("span");
    span.className = "skill-item";

    const teks = document.createElement("span");
    teks.textContent = skill;

    const btnHapus = document.createElement("button");
    btnHapus.type = "button";
    btnHapus.className = "btn-hapus-skill";
    btnHapus.setAttribute("aria-label", `Hapus keterampilan ${skill}`);
    btnHapus.textContent = "×";
    btnHapus.dataset.index = String(index);

    span.append(teks, btnHapus);
    return span;
  });

  daftarSkill.replaceChildren(...elemenSkill);
}

/**
 * Menampilkan seluruh data profil ke antarmuka kartu
 */
function renderProfil(profil) {
  profilAvatar.src = profil.avatar || "";
  profilNama.textContent = profil.nama || "Tanpa Nama";
  profilPeran.textContent = profil.peran || "-";
  profilInstitusi.textContent = profil.institusi || "-";
  profilBio.textContent = profil.bio || "-";

  if (profil.detail) {
    detailEmail.textContent = profil.detail.email || "-";
    detailLokasi.textContent = profil.detail.lokasi || "-";
    detailGithub.textContent = profil.detail.github || "-";
    detailStatus.textContent = profil.detail.status || "-";
  }

  renderDaftarSkill(profil.keterampilan);
}

/**
 * Siklus hidup pemanggilan data profil
 */
async function inisialisasiProfil() {
  aturState("loading", "Memuat profil...");
  btnCobaLagi.disabled = true;

  try {
    const data = await ambilDataProfil();

    // Validasi data jika JSON berupa object kosong atau null
    if (!data || Object.keys(data).length === 0) {
      aturState("empty", "Data profil kosong.");
      return;
    }

    dataProfilAktif = data;
    if (!Array.isArray(dataProfilAktif.keterampilan)) {
      dataProfilAktif.keterampilan = [];
    }

    renderProfil(dataProfilAktif);
    aturState("success", "Profil siap.");
  } catch (error) {
    console.error(error);
    aturState("error", "Gagal memuat profil. Silakan periksa koneksi atau path berkas.");
  } finally {
    btnCobaLagi.disabled = false;
  }
}

// -----------------------------
// EVENT LISTENERS
// -----------------------------

// 1. Coba Lagi
btnCobaLagi.addEventListener("click", () => {
  inisialisasiProfil();
});

// 2. Toggle Mode Gelap / Terang
btnTema.addEventListener("click", () => {
  const temaSaatIni = document.body.dataset.theme;
  const temaBaru = temaSaatIni === "dark" ? "light" : "dark";
  document.body.dataset.theme = temaBaru;
  btnTema.textContent = temaBaru === "dark" ? "Tema Terang" : "Ganti Tema";
});

// 3. Toggle Detail (classList.toggle & aria-expanded)
btnDetail.addEventListener("click", () => {
  const isOpen = detailKonten.classList.toggle("terbuka");
  detailKonten.hidden = !isOpen;
  btnDetail.setAttribute("aria-expanded", String(isOpen));
  btnDetail.textContent = isOpen ? "Tutup Detail" : "Buka Detail";
});

// 4. Delegasi Event Hapus Skill
daftarSkill.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("btn-hapus-skill")) return;

  const targetIndex = Number(target.dataset.index);
  dataProfilAktif.keterampilan.splice(targetIndex, 1);
  renderDaftarSkill(dataProfilAktif.keterampilan);
});

// 5. Tambah Skill Form (Validasi Input Kosong)
formSkill.addEventListener("submit", (event) => {
  event.preventDefault();

  const nilaiSkill = inputSkill.value.trim();

  // Validasi input kosong
  if (nilaiSkill.length === 0) {
    inputSkill.setAttribute("aria-invalid", "true");
    errorSkill.textContent = "Keterampilan tidak boleh kosong.";
    return;
  }

  // Jika valid
  inputSkill.removeAttribute("aria-invalid");
  errorSkill.textContent = "";

  dataProfilAktif.keterampilan.push(nilaiSkill);
  renderDaftarSkill(dataProfilAktif.keterampilan);

  inputSkill.value = "";
});

// Inisialisasi awal saat skrip dimuat
inisialisasiProfil();
