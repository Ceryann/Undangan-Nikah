# 💍 Undangan Pernikahan Digital

Undangan pernikahan digital berbasis **satu file HTML** dengan tema langit & surga: animasi awan, burung terbang, air terjun, kelopak jatuh, dan partikel cahaya. Dilengkapi murottal ayat dengan subtitle yang sinkron, musik latar, hitung mundur, dan buku tamu doa. Tanpa build step, tanpa backend: cukup buka di browser.

> Data contoh di repo ini memakai pasangan **Senja & Naila**. Ganti dengan data Anda sendiri (lihat bagian [Kustomisasi](#-kustomisasi)).

---

## ✨ Fitur

- **Cover pintu terbuka**: layar sambutan dengan tombol "Ketuk untuk Membuka" yang sekaligus memulai audio (aman dari pemblokiran autoplay browser).
- **Ayat Al-Qur'an + murottal**: QS. Ar-Rum: 21 dengan teks Arab, transliterasi Latin, dan terjemahan yang tersinkron dengan audio, plus kontrol putar/jeda/ulang.
- **Musik latar**: bisa dinyalakan atau dimatikan kapan saja.
- **Kartu mempelai 3D**: kartu *flip* yang menampilkan profil, fun facts, dan Instagram mempelai.
- **Timeline perjalanan cinta**: 6 tahap cerita yang bisa digeser ke samping (*horizontal snap scroll*).
- **Hitung mundur**: menuju hari H, dan berganti ke pesan "Alhamdulillah, kami telah menikah" setelah acara lewat.
- **Rangkaian acara**: Akad Nikah dan Resepsi, masing-masing dengan tombol **Cari Lokasi** (Google Maps) dan **Simpan Kalender** (unduh file `.ics`).
- **Buku tamu doa & ucapan**: formulir dengan batas karakter, daftar ucapan, dan tombol "Lihat Lainnya".
- **Animasi pemandangan**: SVG awan, burung, air terjun, kelopak, sinar, dan partikel cahaya.
- **Aksesibilitas**: menghormati `prefers-reduced-motion` (animasi dimatikan jika pengguna memintanya).
- **Responsif**: dirancang mobile-first.

## 🛠️ Teknologi

| Bagian | Teknologi |
| --- | --- |
| Markup & logika | HTML5, JavaScript (vanilla) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) via CDN + CSS kustom untuk animasi |
| Font | [Google Fonts](https://fonts.google.com/): Playfair Display, Inter, Amiri (teks Arab) |
| Audio | HTML5 `<audio>` |
| Kalender | Pembuatan file iCalendar (`.ics`) langsung di browser |

## 📁 Struktur Proyek

```text
.
├── index.html            # file utama (rename dari masterfile.html)
├── assets/
│   ├── audio/
│   │   ├── murottal.mp3  # audio murottal QS. Ar-Rum: 21
│   │   └── musicbg.mp3   # musik latar
│   └── images/
│       ├── pria.png      # foto mempelai pria
│       └── wanita.png    # foto mempelai wanita
└── README.md
```

> Folder `assets/` harus Anda sediakan sendiri sesuai path di atas. Jika berkas tidak ada, audio dan foto tidak akan tampil.

## 🚀 Cara Menjalankan

**Lokal**

1. Clone repo ini:
   ```bash
   git clone https://github.com/<username>/<nama-repo>.git
   cd <nama-repo>
   ```
2. Pastikan folder `assets/` sudah berisi audio dan gambar.
3. Buka `index.html` di browser, atau jalankan server lokal agar audio berjalan mulus:
   ```bash
   python -m http.server 8000
   # lalu buka http://localhost:8000
   ```

Butuh koneksi internet saat pertama dibuka karena Tailwind dan Google Fonts dimuat lewat CDN.

**Deploy gratis dengan GitHub Pages**

1. Push repo ke GitHub.
2. Buka **Settings → Pages**.
3. Pada *Source*, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
4. Undangan bisa diakses di `https://<username>.github.io/<nama-repo>/`.

Alternatif lain: Netlify, Vercel, atau Cloudflare Pages.

## 🎨 Kustomisasi

Semua perubahan dilakukan langsung di `index.html`.

| Yang diubah | Di mana |
| --- | --- |
| Nama & tanggal di cover | Bagian cover di awal `<body>` |
| Profil mempelai, nama orang tua, fun facts, Instagram | `<section id="mempelai">` |
| Foto mempelai | `assets/images/pria.png` dan `assets/images/wanita.png` |
| Cerita perjalanan | Bagian timeline (6 kartu bernomor 01 sampai 06) |
| Tanggal hitung mundur | `const weddingDate = new Date('2026-12-22T08:00:00+07:00')` |
| Detail acara (nama tempat, alamat, jam) | `<section id="acara">` |
| Tautan Google Maps | Atribut `href` pada tombol **Cari Lokasi** |
| Judul, lokasi, dan jam file kalender | Argumen `downloadICS(...)` pada tombol **Simpan Kalender** |
| Teks ayat, transliterasi, terjemahan, dan waktu sinkron | Array `ayatConfig` (`time` dalam detik) |
| Audio | `assets/audio/murottal.mp3` dan `assets/audio/musicbg.mp3` |
| Warna tema | `tailwind.config` → `colors` (`gold`, `sky`, `cream`) |

Jika audio murottal Anda berbeda, sesuaikan nilai `time` di `ayatConfig` agar subtitle pas dengan bacaan.

## ⚠️ Catatan

- **Buku tamu bersifat sementara.** Doa yang dikirim hanya disimpan di memori halaman dan hilang saat halaman dimuat ulang. Tidak ada `localStorage` maupun backend. Untuk menyimpan ucapan secara permanen, hubungkan formulir ke layanan seperti Firebase, Supabase, atau Google Sheets (Apps Script).
- **Autoplay audio** diizinkan browser hanya setelah interaksi pengguna, itulah sebabnya audio dimulai dari tombol pembuka undangan.
- **Privasi.** Jika repo ini publik, nama, nama orang tua, lokasi, dan tanggal acara akan terlihat oleh siapa saja. Pertimbangkan repo *private*, atau gunakan data contoh untuk versi publik.
- **Tailwind via CDN** cocok untuk proyek sederhana ini. Untuk produksi skala besar, sebaiknya gunakan build Tailwind agar lebih ringan.

## 📄 Lisensi

Tentukan lisensi sesuai kebutuhan Anda (misalnya [MIT](https://choosealicense.com/licenses/mit/)). Pastikan audio, foto, dan font yang dipakai memiliki izin penggunaan yang sesuai.

---

<p align="center">Made with 🤍 for Senja & Naila</p>
