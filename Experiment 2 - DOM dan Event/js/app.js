"use strict";

// 1. Memilih elemen DOM
const judulUtama = document.querySelector("#judul-utama");
const status = document.querySelector("#status");
const namaInput = document.querySelector("#nama");
const jumlahKarakter = document.querySelector("#jumlah-karakter");
const tombolUbahJudul = document.querySelector("#ubah-judul");
const tombolToggleStatus = document.querySelector("#toggle-status");

// Langkah 1: Memeriksa objek elemen di Console
console.log({
  judulUtama,
  status,
  namaInput,
  jumlahKarakter,
  tombolUbahJudul,
  tombolToggleStatus,
});

// Langkah 5: Fungsi pengubah status yang aman dari nilai null
function ubahStatus(pesan) {
  if (!status) {
    console.warn("Elemen #status tidak ditemukan.");
    return;
  }
  status.textContent = pesan;
}

// Langkah 2: Event klik ubah judul
tombolUbahJudul.addEventListener("click", () => {
  judulUtama.textContent = "DOM Berhasil Diubah";
  ubahStatus("Teks heading berhasil diubah.");
});

// Langkah 3: Event klik toggle status (sakelar mode gelap)
tombolToggleStatus.addEventListener("click", () => {
  const aktif = document.body.classList.toggle("is-active");
  tombolToggleStatus.setAttribute("aria-pressed", String(aktif));
  ubahStatus(aktif ? "Mode aktif dinyalakan." : "Mode aktif dimatikan.");
});

// Langkah 4: Event input untuk penghitung karakter
namaInput.addEventListener("input", (event) => {
  const jumlah = event.target.value.length;
  jumlahKarakter.textContent = jumlah;
});
