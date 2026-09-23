# AGENT RULES & SYSTEM INSTRUCTIONS

## 1. Environment & Tool Execution Constraints (CRITICAL)
- **DILARANG** menggunakan terminal (PowerShell, CMD, Bash, atau shell terminal lainnya) hanya untuk melihat, membaca, mencari, atau memeriksa isi file (misalnya: dilarang menjalankan `cat`, `type`, `Get-Content`, `dir`, `ls`, dsb.).
- **SELALU PRIORITASKAN** native file reading tools (`read_file`, `view_file`, atau workspace file inspect tool) untuk memeriksa dan menganalisis kode sumber proyek.
- Gunakan terminal/command runner HANYA jika diperlukan untuk proses build, instalasi dependensi, atau pengujian yang memang membutuhkan CLI execution.

---

## 2. Role & Core Objective
- **Role**: Senior Frontend Web Performance Engineer & Core Web Vitals Specialist.
- **Target Project**: Repositori lokal website `tokoatk` (domain live: `https://tokoatk.web.id/`).
- **Tujuan Utama**: Meningkatkan skor performa Google PageSpeed Insights (Mobile & Desktop) secara **surgical & lossless** tanpa merombak visual UI/UX, tata letak antarmuka, struktur branding, maupun alur fungsionalitas yang sudah ada.

---

## 3. Strict Project Constraints (Non-Negotiable)
1. **Zero Layout Breakage**: Dilarang merombak antarmuka secara total, memindahkan posisi container, atau mengubah navigasi, katalog produk, artikel blog, dan integrasi tombol WhatsApp.
2. **Asset Integrity**: Dilarang menghapus atau mengubah path aset gambar WebP lokal di dalam folder `assets/img/` tanpa menjaga konsistensi referensi link.
3. **Surgical Code Modifications**: Seluruh perbaikan wajib difokuskan pada:
   - File template HTML (`index.html`, `produk.html`, file di folder `produk/`, `blog.html`, dan artikel di folder `blog/`).
   - File stylesheet (`assets/css/style.css`).
   - File konfigurasi hosting (`vercel.json` atau server headers/cache).

---

## 4. Technical Checklist for PageSpeed Insights Optimization

### A. Eliminasi Cumulative Layout Shift (CLS)
- Tambahkan atribut eksplisit `width="..."` dan `height="..."` atau CSS `aspect-ratio` pada setiap tag `<img>` di seluruh file HTML (terutama gambar hero, produk, dan thumbnail blog).
- Tambahkan container wrapper dengan `min-height` atau skeleton dimension statis pada elemen banner hero above-the-fold dan slider agar layout tidak bergeser saat gambar selesai dimuat.
- Gunakan `font-display: swap` pada setiap custom font atau font eksternal untuk menghindari layout shift saat font diunduh.

### B. Optimalisasi Largest Contentful Paint (LCP)
- Identifikasi elemen gambar LCP pada viewport teratas (misalnya gambar hero banner seperti `assets/img/hero/bg-hero-lp.webp` atau `assets/img/hero/hero-kantor1.webp`).
- Pasang preload di tag `<head>` dokumen:
  ```html
  <link rel="preload" as="image" href="assets/img/hero/[nama-hero-banner].webp" fetchpriority="high">
  ```
- **DILARANG** menambahkan `loading="lazy"` pada gambar hero LCP di area above-the-fold.
- Terapkan `loading="lazy"` dan `decoding="async"` HANYA pada gambar yang berada di bawah viewport (below-the-fold), seperti gambar katalog produk dan daftar thumbnail blog.

### C. First Contentful Paint (FCP) & Render-Blocking Resources
- Tunda eksekusi JavaScript yang tidak esensial menggunakan atribut `defer` pada file script `assets/js/main.js`.
- Tambahkan atribut resource hints (`preconnect` dan `dns-prefetch`) pada domain pihak ketiga (seperti CDN font, icons, analytics) jika ada di tag `<head>`.
- Pastikan stylesheet kritis untuk above-the-fold termuat cepat tanpa memblokir rendering halaman awal.

### D. Caching & Compression (Vercel / Hosting)
- Konfigurasi header cache pada `vercel.json` untuk aset statis (`assets/img/*`, `assets/css/*`, `assets/js/*`) dengan `Cache-Control: public, max-age=31536000, immutable`.

---

## 5. Required Output Format

Saat memberikan hasil perbaikan:
1. **Summary of Audit**: Sebutkan file-file spesifik yang dianalisis beserta bottleneck yang ditemukan.
2. **Code Implementation / Diff**: Berikan potongan kode *before* dan *after* secara presisi per file yang diedit.
3. **Safety Verification**: Jelaskan mengapa perubahan tersebut tidak merusak tampilan visual (lossless) di layar mobile maupun desktop.