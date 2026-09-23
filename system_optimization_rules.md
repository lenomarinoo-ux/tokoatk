# Performance Optimization System Rules - Toko ATK (https://tokoatk.web.id/)

## 1. Tool Execution & Inspection Constraints
- DILARANG menggunakan terminal shell (PowerShell, CMD, Bash) HANYA untuk melihat, mencari, atau membaca isi file proyek.
- SELALU prioritaskan dan gunakan native file reading tool (`read_file`, `view`, atau `cat` bawaan environment editor/IDE) untuk memeriksa kode sumber.
- Terminal shell HANYA diizinkan jika perlu menjalankan build script atau git commands setelah mendapat konfirmasi.

## 2. Scope & Design Integrity (Non-Negotiable)
- DILARANG merombak tata letak visual (UI/UX), navigasi, katalog produk, form checkout/inquiry, maupun tombol integrasi WhatsApp.
- DILARANG mengganti arsitektur web atau framework yang sedang berjalan.
- Seluruh intervensi harus berfokus pada:
  1. Penambahan/perbaikan atribut tag HTML (misal: `width`, `height`, `loading`, `decoding`, `fetchpriority`).
  2. Optimalisasi Resource Hints (`preload`, `preconnect`, `dns-prefetch`) pada tag `<head>`.
  3. Manajemen CSS (Critical CSS, `aspect-ratio`, `font-display: swap`).
  4. Penyesuaian pemuatan skrip JS (`defer`, `async`).
  5. Konfigurasi caching dan kompresi server (`.htaccess` / `nginx.conf` / `vercel.json`).

## 3. Core Web Vitals Targets & Standards

### A. Cumulative Layout Shift (CLS) - Target: < 0.1 (Koreksi status MERAH 0.779)
- Setiap tag `<img>` yang memuat aset lokal (WebP/PNG/JPG) WAJIB memiliki atribut `width` dan `height` eksplisit sesuai aspect ratio aslinya, atau diberikan inline CSS `aspect-ratio`.
- Kontainer hero banner, slider/carousel, dan widget dinamis wajib memiliki `min-height` tetap atau placeholder skeleton agar tidak memicu layout shift saat aset selesai diunduh.
- Pemuatan custom font via `@font-face` atau external link WAJIB menyertakan `font-display: swap` atau `optional`.

### B. Largest Contentful Paint (LCP) - Target: < 2.5s
- Identifikasi aset gambar hero/banner yang berada di atas viewport (above-the-fold).
- Sisipkan preload tag pada `<head>`:
  `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`
- DILARANG menyematkan atribut `loading="lazy"` pada gambar hero/above-the-fold.
- Atribut `loading="lazy"` dan `decoding="async"` HANYA boleh diterapkan pada gambar produk yang berada di bawah fold (below-the-fold).

### C. First Contentful Paint (FCP) & Total Blocking Time (TBT)
- Pasang atribut `defer` pada seluruh script JavaScript eksternal non-kritis.
- Terapkan `preconnect` dan `dns-prefetch` pada domain pihak ketiga (CDN fonts, analitik, dsb.).
- Pastikan stylesheet kritis di-inline atau dimuat tanpa memblokir rendering halaman utama.

## 4. Output Protocol
- Setiap rekomendasi dan modifikasi kode wajib disajikan dalam bentuk diff patch (Before vs After) dengan path file yang jelas.