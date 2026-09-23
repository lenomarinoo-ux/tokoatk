# Antigravity Performance Optimization Rules - tokoatk.web.id

## 1. Tool Usage & File Inspection Rules (MANDATORY)
- JANGAN GUNAKAN terminal shell (PowerShell, CMD, atau Bash) HANYA untuk melihat, mencari, atau membaca isi file.
- SELALU gunakan native file reading tool (`read_file`, `view`, atau pembaca file bawaan agent) untuk menginspeksi file kode proyek.
- Terminal shell HANYA boleh dipakai untuk build check atau git commands bila mutlak diperlukan.

## 2. Integrity & Non-Destructive Guardrails
- DILARANG merombak antarmuka (UI/UX), layout struktur visual, navigasi, daftar produk, keranjang, checkout, ataupun integrasi WhatsApp.
- DILARANG menghapus elemen HTML fungsional atau memindahkan direktori aset tanpa path yang valid.
- Seluruh perubahan harus bersifat *surgical* (hanya optimasi atribut tag HTML, CSS layout stability, defer/async script, serta resource hints).

## 3. Core Web Vitals Targets & Implementation

### A. Cumulative Layout Shift (CLS) — Prioritas Utama (Target < 0.1)
- Setiap elemen `<img>` untuk aset lokal (WebP/PNG/JPG) WAJIB memiliki atribut eksplisit `width` dan `height` sesuai rasio asli gambar, atau dilengkapi CSS rule `aspect-ratio`.
- Kontainer hero banner, slider carousel, dan widget dinamis wajib memiliki `min-height` atau skeleton placeholder statis agar konten di bawahnya tidak bergeser saat gambar selesai diunduh.
- Pemuatan font kustom (@font-face / Google Fonts) wajib menyertakan `font-display: swap` untuk mencegah pergeseran teks (FOIT/FOUT).

### B. Largest Contentful Paint (LCP) — Target < 2.5s
- Temukan elemen gambar hero/banner utama di atas fold (above-the-fold).
- Sisipkan preloading pada tag `<head>`:
  `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`
- HAPUS atribut `loading="lazy"` pada gambar hero/above-the-fold.
- Terapkan `loading="lazy"` dan `decoding="async"` HANYA pada gambar produk yang berada di bawah viewport (below-the-fold).

### C. First Contentful Paint (FCP) & Total Blocking Time (TBT)
- Pasang atribut `defer` pada seluruh script JavaScript eksternal non-kritis.
- Terapkan `preconnect` dan `dns-prefetch` pada koneksi ke third-party (seperti CDN font atau analitik).
- Pastikan Critical CSS untuk bagian paling atas halaman dimuat lebih awal tanpa memblokir rendering utama.

## 4. Deliverable Format
- Setiap modifikasi wajib disajikan dalam bentuk diff patch (Before vs After) yang jelas beserta nama file target.