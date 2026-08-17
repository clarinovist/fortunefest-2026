# FortuneFest Post-Event Website Implementation Plan

**Goal:** Mengubah landing page FortuneFest menjadi arsip resmi yang hangat setelah acara selesai, tanpa meninggalkan CTA pendaftaran atau informasi seolah acara masih akan datang.

**Architecture:** Tetap menggunakan static HTML, CSS, dan JavaScript vanilla yang sudah ada. Perubahan dipusatkan pada copy dan state halaman di `index.html`; countdown yang sudah tidak relevan dinonaktifkan dari `script.js` tanpa menambah dependency atau framework baru.

**Tech Stack:** HTML, CSS, vanilla JavaScript, GitHub Pages.

## Scope

1. Hero dan navigasi menampilkan status post-event.
2. Countdown diganti dengan status acara telah selesai.
3. CTA pendaftaran dihapus dari jalur utama dan diganti dengan dokumentasi/Instagram.
4. Bagian pendaftaran diubah menjadi informasi arsip dan kontak kolaborasi.
5. Sponsor CTA tetap tersedia sebagai peluang kolaborasi kegiatan berikutnya.
6. Jadwal dipertahankan sebagai dokumentasi rangkaian acara, bukan ajakan datang.
7. Closing copy diperkuat menjadi ucapan terima kasih.
8. Metadata SEO dan Open Graph diperbarui agar tidak menyiratkan acara mendatang.

## Files

- Modify: `index.html`
- Modify: `script.js`
- Create: `docs/plans/2026-08-17-fortunefest-post-event.md`

## Acceptance Criteria

- Tidak ada teks CTA aktif seperti `Daftar Sekarang`, `Daftar Fun Run`, atau `Daftarkan Tenant`.
- Tidak ada countdown yang berjalan atau menampilkan angka waktu.
- Hero menyebut acara telah selesai dan tetap menampilkan tanggal/lokasi sebagai arsip.
- Ada CTA ke Instagram/dokumentasi dan kontak panitia atau kolaborasi.
- Bagian jadwal diberi konteks sebagai dokumentasi acara.
- Metadata `title`, description, dan Open Graph tidak mengesankan pendaftaran masih dibuka.
- `index.html` dan `script.js` lolos pemeriksaan syntax/static checks.
- Tidak ada perubahan dependency atau penghapusan aset dokumentasi.

## Verification

Run:

```bash
rg -n "Daftar Sekarang|Daftar Fun Run|Daftarkan Tenant|event-countdown|countdownInterval|viewform" index.html script.js
node --check script.js
python3 - <<'PY'
from html.parser import HTMLParser
HTMLParser().feed(open('index.html', encoding='utf-8').read())
print('HTML parsed')
PY
```

Expected: hanya link partnership/form yang memang dipertahankan bila masih dibutuhkan; tidak ada countdown aktif maupun CTA pendaftaran peserta/tenant; syntax checks berhasil.
