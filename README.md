# Pecel Lele Al Rahman — Website Resmi & Content Management System (CMS)

Website company profile, katalog pemesanan online, dan **Sistem Pengelolaan Konten (Decap CMS)** untuk **Pecel Lele Al Rahman** — Warung Tenda Autentik Cita Rasa Tradisional Nusantara di Jalur Lintas Pekanbaru – Bangkinang KM 24.

Dirancang dengan pendekatan desain **Authentic Indonesian Culinary — Modern Editorial** menggunakan **Astro 5 (SSG)**, **Tailwind CSS**, dan **Decap CMS (100% Gratis & Open Source)**. Pemilik usaha atau kasir dapat mengelola daftar menu, deskripsi, harga, foto, profil restoran, dan testimoni langsung melalui antarmuka web `/admin`.

---

## 🛠️ Akses dan Penggunaan CMS (Decap CMS)

### 1. Cara Akses di Lingkungan Lokal (Development)
Untuk mengedit konten secara lokal tanpa perlu koneksi internet atau login Git:

1. Buka terminal pertama dan jalankan server proxy CMS:
   ```bash
   npm run cms
   ```
2. Buka terminal kedua dan jalankan website:
   ```bash
   npm run dev
   ```
3. Buka browser dan akses:
   ```
   http://localhost:4321/admin/
   ```
4. Anda akan langsung masuk ke Dashboard Decap CMS. Semua perubahan yang Anda simpan akan langsung memperbarui file JSON di folder `src/data/` secara otomatis!

---

### 2. Cara Mengaktifkan CMS di Netlify (Produksi)
Saat website di-deploy ke Netlify:

1. Masuk ke dashboard situs Anda di [Netlify](https://app.netlify.com/).
2. Masuk ke tab **Integrations** / **Identity**:
   * Aktifkan **Netlify Identity** (*Enable Identity*).
   * Pada bagian **Registration preferences**, Anda bisa memilih *Invite only* agar hanya admin yang diundang yang bisa login.
3. Gulir ke bawah ke bagian **Services** > **Git Gateway**:
   * Klik **Enable Git Gateway**.
4. Undang email admin/kasir melalui tab **Identity** > **Invite users**.
5. Admin akan menerima email konfirmasi, membuat password, lalu dapat langsung mengakses:
   ```
   https://[domain-website-anda].netlify.app/admin/
   ```
Setiap kali admin mengubah menu atau teks dan menekan **Publish**, Netlify secara otomatis mem-build ulang website dalam ~1 menit tanpa biaya sepeser pun.

---

## 🎨 Design System & Visual Direction

* **Primary Red**: `#B91F24`
* **Deep Red**: `#861C20`
* **Cream Background**: `#FFF9F0`
* **Warm Surface**: `#FAF4EB`
* **Warm Gold**: `#F4B942`
* **Dark Text**: `#211D1B`
* **Secondary Text**: `#746B64`
* **Heading Typography**: `DM Serif Display`
* **Body Typography**: `Plus Jakarta Sans`

---

## 📁 Struktur Direktori

```
genbi_project/
├── public/
│   ├── admin/
│   │   ├── index.html          # Halaman admin portal Decap CMS
│   │   └── config.yml          # Konfigurasi koleksi data & formulir CMS
│   ├── favicon.svg             # Favicon
│   ├── robots.txt              # SEO Crawler directive
│   ├── sitemap.xml             # Peta situs
│   └── images/
│       ├── logo.svg
│       ├── hero-pecel-lele.jpg
│       ├── about-warung.jpg
│       ├── map-preview.jpg
│       ├── uploads/            # Folder media upload via CMS
│       └── menu/               # Foto sajian makanan & minuman
├── src/
│   ├── components/             # Komponen Astro modular
│   ├── data/
│   │   ├── restaurant.json     # Data profil (dikelola via CMS)
│   │   ├── menu.json           # Data katalog menu (dikelola via CMS)
│   │   ├── testimonials.json   # Data ulasan (dikelola via CMS)
│   │   ├── restaurant.ts       # Wrapper data & WA order URL generator
│   │   ├── menu.ts             # Wrapper data katalog menu
│   │   └── testimonials.ts     # Wrapper data ulasan
│   ├── layouts/
│   │   └── Layout.astro        # Base layout + Netlify Identity widget
│   ├── pages/
│   │   └── index.astro         # Single Page Application
│   └── styles/
│       └── global.css          # Desain token & Google Fonts
├── netlify.toml                # Konfigurasi build & header keamanan Netlify
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 🚀 Perintah Proyek

* `npm run dev` : Menjalankan development server Astro
* `npm run cms` : Menjalankan local proxy server untuk Decap CMS
* `npm run build` : Membangun output produksi statis di folder `/dist`
* `npm run preview` : Meninjau hasil build lokal
