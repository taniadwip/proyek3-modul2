"use strict";

/**
 * Memvalidasi apakah nilai berupa angka finite dalam rentang 0–100
 */
function validasiNilai(nilai) {
  return typeof nilai === "number" && Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

/**
 * Menentukan kategori huruf (A, B, C, D) atau null jika tidak valid
 */
function tentukanKategori(nilai) {
  if (!validasiNilai(nilai)) {
    return null;
  }

  // Evaluasi dari batas tertinggi ke terendah
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 60) return "C";
  return "D";
}

/**
 * Menentukan status kelulusan mahasiswa
 */
function tentukanStatus(nilai) {
  if (!validasiNilai(nilai)) {
    return "Data tidak valid";
  }

  return nilai >= 60 ? "Lulus" : "Tidak lulus";
}

/**
 * Menggabungkan nama, nilai, kategori, dan status ke dalam satu objek
 */
function buatRingkasan(nama, nilai) {
  return {
    nama: nama,
    nilai: nilai,
    kategori: tentukanKategori(nilai),
    status: tentukanStatus(nilai),
  };
}

// 7 Kasus bawaan + 2 Kasus tambahan (menguji nilai 84 dan input negatif/invalid)
const kasusUji = [
  { nama: "Alya", nilai: 0 },
  { nama: "Bima", nilai: 59 },
  { nama: "Citra", nilai: 60 },
  { nama: "Danu", nilai: 69 },
  { nama: "Eka", nilai: 70 },
  { nama: "Fani", nilai: 85 },
  { nama: "Gilang", nilai: 101 },
  { nama: "Hana", nilai: 84 }, // Kasus tambahan 1: batas atas kategori B
  { nama: "Indra", nilai: -5 }, // Kasus tambahan 2: di bawah batas bawah (invalid)
];

const hasilUji = kasusUji.map(({ nama, nilai }) => buatRingkasan(nama, nilai));

console.table(hasilUji);
