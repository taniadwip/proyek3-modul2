"use strict";

const status = document.querySelector("#status");
const daftar = document.querySelector("#daftar-materi");
const tombolMuat = document.querySelector("#muat");
const tombolCobaLagi = document.querySelector("#coba-lagi");

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== "error";
}

async function ambilMateri() {
  const response = await fetch("data/materi.json");

  // Lempar galat manual jika status HTTP bukan 200–299
  if (!response.ok) {
    throw new Error(`Gagal mengambil data: HTTP ${response.status}`);
  }

  return await response.json();
}

function renderMateri(data) {
  daftar.replaceChildren();

  const kumpulanKartu = data.map((item) => {
    const article = document.createElement("article");
    article.classList.add("kartu");

    const h2 = document.createElement("h2");
    h2.textContent = item.judul;

    const p = document.createElement("p");
    p.textContent = item.ringkasan;

    article.append(h2, p);
    return article;
  });

  daftar.replaceChildren(...kumpulanKartu);
}

async function muatData() {
  aturState("loading", "Memuat data...");
  tombolMuat.disabled = true;
  daftar.replaceChildren();

  try {
    const data = await ambilMateri();

    // Pengecekan kondisi data kosong vs data berisi
    if (!Array.isArray(data) || data.length === 0) {
      aturState("empty", "Tidak ada materi yang tersedia.");
    } else {
      aturState("success", `Berhasil memuat ${data.length} materi.`);
      renderMateri(data);
    }
  } catch (error) {
    console.error(error);
    aturState("error", "Gagal memuat materi. Silakan coba lagi.");
  } finally {
    // Tombol wajib diaktifkan kembali, baik saat proses sukses maupun gagal
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener("click", muatData);
tombolCobaLagi.addEventListener("click", muatData);
