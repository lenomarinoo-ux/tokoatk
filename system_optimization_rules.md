# Performance Optimization System Rules - tokoatk.web.id

## 1. Tool Execution & File Inspection Rules
- DILARANG menggunakan terminal shell (PowerShell, CMD, atau Bash) HANYA untuk melihat, mencari, atau membaca isi file.
- SELALU gunakan native file reading tool (seperti `read_file`, `view`, atau pembaca file bawaan agent) untuk menginspeksi file kode proyek.
- Terminal shell HANYA diizinkan untuk menjalankan perintah build atau git commit setelah ada konfirmasi.

## 2. Strict Design & Architecture Constraints
- DILARANG merombak tata letak visual (UI/UX), katalog produk, keranjang, struktur navigasi, maupun tombol WhatsApp. Tampilan harus 100% identik.
- DILARANG mengganti framework/CMS atau menghapus elemen fungsional HTML.
- Modifikasi dilakukan secara surgical: perbaikan atribut HTML (`width`, `height`, `aspect-ratio`, `loading`, `decoding`), optimasi resource hints (`preload`, `preconnect`), Critical CSS, dan defer script JS.

## 3. Core Web Vitals Targets & Implementation

### A. Cumulative Layout Shift (CLS) — Prioritas Kritis (Target < 0.1)
- Koreksi nilai CLS merah (skor saat ini ~0.764).
- Setiap tag `<img>` yang memuat aset lokal (WebP/PNG/JPG) WAJIB memiliki atribut eksplisit `width` dan `height` yang proporsional atau inline CSS `aspect-ratio`.
- Kontainer hero banner, slider carousel, dan kartu katalog produk wajib memiliki `min-height` tetap atau skeleton placeholder agar tidak menggeser layout saat aset selesai diunduh.
- Semua custom font (@font-face / link Google Fonts) wajib menyertakan `font-display: swap` untuk mencegah layout shift akibat FOIT/FOUT.

### B. Largest Contentful Paint (LCP) — Target < 2.5s
- Identifikasi gambar hero/banner utama di atas fold (above-the-fold).
- Sisipkan preloading pada tag `<head>`:
  `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`
- HAPUS atribut `loading="lazy"` pada gambar hero/above-the-fold.
- Atribut `loading="lazy"` dan `decoding="async"` HANYA boleh dipasang pada gambar di bawah fold (below-the-fold).

### C. First Contentful Paint (FCP) & Total Blocking Time (TBT)
- Tambahkan atribut `defer` pada seluruh skrip JS eksternal non-kritis.
- Terapkan `preconnect` dan `dns-prefetch` pada domain pihak ketiga (CDN font, analytics, dsb.).
- Pastikan Critical CSS untuk viewport atas dimuat seawal mungkin dan hindari file stylesheet besar yang memblokir rendering pertama.

## 4. Output Protocol
- Sajikan setiap perubahan kode dalam format diff patch (Before vs After) yang jelas dan sebutkan file target yang dimodifikasi.