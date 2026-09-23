# Antigravity Performance Optimization System Rules - tokoatk.web.id

## 1. Tool Execution & Inspection Restrictions (WAJIB)
- DILARANG menggunakan terminal shell (PowerShell, CMD, atau Bash) HANYA untuk melihat, mencari, atau membaca isi file.
- SELALU gunakan native file reading tool (seperti `read_file`, `view`, atau tool editor bawaan agent) saat menginspeksi file kode proyek.
- Terminal shell HANYA diizinkan untuk eksekusi build test atau git operations setelah ada persetujuan.

## 2. Visual & Functional Integrity Guardrails
- DILARANG merombak tata letak visual (UI/UX), katalog produk, navigasi, form pemesanan, atau tombol integrasi WhatsApp.
- DILARANG mengganti arsitektur web/framework atau memindahkan letak file tanpa path yang valid.
- Semua optimasi harus bersifat surgical pada level atribut HTML, resource hints, Critical CSS, dan deferring script.

## 3. Core Web Vitals Targets & Mandatory Fixes

### A. Cumulative Layout Shift (CLS) — Prioritas Paling Kritis (Target < 0.1)
- Masalah audit: Skor CLS berada di zona MERAH (0.786).
- Setiap tag `<img>` yang memuat aset lokal (WebP/PNG/JPG) WAJIB memiliki atribut eksplisit `width` dan `height` yang proporsional dengan dimensi aslinya, atau diberikan inline CSS `aspect-ratio`.
- Kontainer hero banner, slider promo, dan card grid produk wajib memiliki `min-height` atau skeleton placeholder statis agar konten tidak meloncat ketika gambar selesai di-render.
- Seluruh pemuatan font kustom (@font-face / Google Fonts) wajib menyertakan atribut `font-display: swap` untuk mencegah pergeseran teks (FOIT/FOUT).

### B. Largest Contentful Paint (LCP) — Target < 2.5s
- Identifikasi gambar hero/banner utama yang berada di area above-the-fold (viewport atas).
- Sisipkan preloading di tag `<head>`:
  `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`
- HAPUS atribut `loading="lazy"` pada gambar hero/above-the-fold.
- Atribut `loading="lazy"` dan `decoding="async"` HANYA boleh dipasang pada gambar katalog produk di bawah viewport (below-the-fold).

### C. First Contentful Paint (FCP) & Total Blocking Time (TBT)
- Pasang atribut `defer` pada seluruh skrip JavaScript eksternal non-kritis.
- Terapkan `preconnect` dan `dns-prefetch` pada domain pihak ketiga (CDN font, analytics, dsb.).
- Pastikan Critical CSS untuk bagian paling atas halaman dimuat seawal mungkin, dan hindari file stylesheet besar yang memblokir rendering pertama.

## 4. Output Protocol
- Setiap rekomendasi atau perubahan kode wajib disajikan dalam bentuk diff patch (Before vs After) yang jelas dan menyebutkan nama file yang dimodifikasi.