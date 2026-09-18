"use strict";

const peserta = [
  { id: 1, nama: "Alya", prodi: "Teknik Informatika" },
  { id: 2, nama: "Bima", prodi: "Sistem Informasi" },
];

const form = document.querySelector("#form-peserta");
const namaInput = document.querySelector("#nama");
const prodiInput = document.querySelector("#prodi");
const filterInput = document.querySelector("#filter-prodi");
const daftar = document.querySelector("#daftar-peserta");
const status = document.querySelector("#status");
const errorNama = document.querySelector("#error-nama");
const errorProdi = document.querySelector("#error-prodi");

function validasiPeserta(calon) {
  const hasil = {
    valid: true,
    errorNama: "",
    errorProdi: "",
  };

  if (!calon.nama || calon.nama.trim().length < 3) {
    hasil.valid = false;
    hasil.errorNama = "Nama minimal 3 karakter.";
  }

  if (!calon.prodi || calon.prodi.trim() === "") {
    hasil.valid = false;
    hasil.errorProdi = "Program studi wajib dipilih.";
  }

  return hasil;
}

function buatKartuPeserta(item) {
  const article = document.createElement("article");
  const heading = document.createElement("h2");
  const paragraph = document.createElement("p");

  article.classList.add("kartu");
  heading.textContent = item.nama;
  paragraph.textContent = item.prodi;

  article.append(heading, paragraph);
  return article;
}

function renderPeserta(data) {
  if (data.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = "Tidak ada peserta";
    daftar.replaceChildren(pesanKosong);
    return;
  }

  const kumpulanKartu = data.map((item) => buatKartuPeserta(item));
  daftar.replaceChildren(...kumpulanKartu);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const calon = {
    nama: namaInput.value,
    prodi: prodiInput.value,
  };

  const hasilValidasi = validasiPeserta(calon);

  if (!hasilValidasi.valid) {
    if (hasilValidasi.errorNama) {
      namaInput.setAttribute("aria-invalid", "true");
      errorNama.textContent = hasilValidasi.errorNama;
    } else {
      namaInput.removeAttribute("aria-invalid");
      errorNama.textContent = "";
    }

    if (hasilValidasi.errorProdi) {
      prodiInput.setAttribute("aria-invalid", "true");
      errorProdi.textContent = hasilValidasi.errorProdi;
    } else {
      prodiInput.removeAttribute("aria-invalid");
      errorProdi.textContent = "";
    }

    return;
  }

  const pesertaBaru = {
    id: Date.now(),
    nama: calon.nama.trim(),
    prodi: calon.prodi,
  };

  peserta.push(pesertaBaru);

  form.reset();
  namaInput.removeAttribute("aria-invalid");
  prodiInput.removeAttribute("aria-invalid");
  errorNama.textContent = "";
  errorProdi.textContent = "";

  filterInput.value = "semua";
  renderPeserta(peserta);
});

filterInput.addEventListener("change", () => {
  const prodiDipilih = filterInput.value;

  if (prodiDipilih === "semua") {
    renderPeserta(peserta);
  } else {
    const dataTerfilter = peserta.filter((item) => item.prodi === prodiDipilih);
    renderPeserta(dataTerfilter);
  }
});

renderPeserta(peserta);
