# Homework — Interactive Profile Card

Aplikasi kartu profil interaktif yang memuat data secara asinkron dari berkas JSON lokal, mendukung pergantian tema, pembukaan detail informasi, serta manipulasi daftar keterampilan (tambah dan hapus).

## Fitur Utama

1. **Asynchronous Data Loading:** Mengambil data dari `data/profile.json` dengan penanganan state lengkap (`loading`, `success`, `empty`, dan `error`).
2. **Detail Toggle:** Menampilkan dan menyembunyikan detail profil dengan `classList.toggle` dan atribut aksesibilitas `aria-expanded`.
3. **Manajemen Keterampilan:** Menambah keterampilan baru dengan validasi teks kosong, serta menghapus keterampilan menggunakan tombol hapus per item.
4. **Theme Switcher:** Pergantian tema Light/Dark mode menggunakan _CSS Custom Properties_.
5. **Aman dari Duplikasi:** Menggunakan `replaceChildren` dan penonaktifan tombol selama permintaan data berjalan.

## Cara Menjalankan Aplikasi

Aplikasi ini menggunakan API `fetch()`, sehingga wajib dijalankan melalui server web lokal (bukan membuka berkas `index.html` langsung dengan klik dua kali di File Explorer).

### Opsi 1: Menggunakan Ekstensi VS Code Live Server (Direkomendasikan)

1. Buka folder `homework-profile-card` di Visual Studio Code.
2. Pasang ekstensi **Live Server** (oleh Ritwick Dey) jika belum ada.
3. Klik kanan berkas `index.html`, lalu pilih **Open with Live Server**.
4. Aplikasi akan otomatis terbuka pada peramban di alamat `http://127.0.0.1:5500/`.

### Opsi 2: Menggunakan Node.js (`npx serve`)

1. Buka terminal pada folder proyek.
2. Jalankan perintah:
   ```bash
   npx serve .
   ```
