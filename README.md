# Fortune Fest 2026 — Landing Page

> **"Rise in Happiness"** — Festival budaya, kuliner sehat, seni tradisional, dan Fun Run 5K di Taman Dayu, Pasuruan (16 Agustus 2026). Diselenggarakan oleh INLA Indonesia (International Nature Loving Association).

Landing page premium berbasis HTML, CSS, dan JavaScript murni (Vanilla Web Stack) dengan filosofi desain **Heritage Editorial Festival** yang hangat, bercerita, dan responsif.

---

## 🌟 Fitur Utama

- **Hero & Countdown Timer**: Dilengkapi dengan ambient particle animation, efek parallax, dan penghitung waktu mundur dinamis menuju hari festival (16 Agustus 2026).
- **Event Overview Strip**: 3 kartu utama untuk mempermudah pengunjung memahami pilar utama acara dalam 5 detik: **Fun Run 5K**, **Expression Artscape**, dan **Earth Market**.
- **Fortune Fun Run 5K**: Bagian pendaftaran lari yang dilengkapi dengan peta rute, kartu info teknis (jarak, waktu, kapasitas), serta counter stat animasi interaktif.
- **Expression Artscape**: Daftar pertunjukan seni, tarian, dan perlombaan keluarga yang didukung oleh efek interaksi mikro *3D tilt hover*.
- **Earth Market**: Showcase kategori tenant (Vegetarian, UMKM, Kerajinan, Pet Lovers, Wellness) dengan modal pop-up dinamis untuk melihat tenant yang terdaftar.
- **Responsive & Optimized Performance**: Kinerja prima di desktop maupun mobile (terutama di breakpoint WhatsApp/Instagram browser).

---

## 📂 Struktur Folder

```yaml
fortunefest/
├── index.html           # Struktur utama halaman landing page (semantic HTML, SEO-optimized)
├── style.css            # Stylesheet utama (berisi @import untuk modul CSS di folder css/)
├── script.js            # Logika JavaScript utama (timer, modal, particles, tilt, scroll effects)
├── CNAME                # Konfigurasi custom domain GitHub Pages
├── assets/              # Aset visual & media
│   ├── fonts/           # Font lokal yang digunakan
│   └── img/             # Logo event, ilustrasi, tenant, dan background
├── css/                 # Folder stylesheet modular
│   ├── fonts.css        # Konfigurasi font
│   ├── variables.css    # Token & variabel CSS (warna HSL, spacing, shadow)
│   ├── base.css         # Reset & global styles
│   ├── utilities.css    # Utility classes untuk layout & helper
│   ├── responsive.css   # Media queries & optimasi tampilan mobile
│   └── components/      # Styling khusus untuk komponen spesifik
│       ├── navbar.css
│       ├── hero.css
│       ├── overview.css
│       ├── divider.css
│       ├── funrun.css
│       ├── artscape.css
│       ├── earth-market.css
│       ├── sponsors.css
│       └── footer.css
├── design-system/       # Dokumentasi panduan desain sistem
│   └── fortunefest/
│       └── MASTER.md    # Master rules (palet warna, tipografi, spacing, checklist)
└── docs/                # Dokumentasi tambahan
    └── landing-page-design-optimization.md # Catatan audit & rekomendasi optimasi desain
```

---

## 🎨 Sistem Desain & Estetika

Halaman ini mengikuti panduan desain dari [MASTER.md](file:///Users/nugroho/Documents/fortunefest/design-system/fortunefest/MASTER.md).

### Palet Warna Utama
- **Primary**: Violet hangat (`#7C3AED`)
- **Secondary**: Lavender lembut (`#A78BFA`)
- **Accent/CTA**: Hijau segar (`#16A34A`) & Gold khas heritage
- **Background**: Cream hangat/translusen (`#FAF5FF`)
- **Foreground**: Deep Purple (`#4C1D95`)

### Tipografi
- **Headings**: `Noto Serif TC` (memberikan kesan elegan, tradisional, dan bernuansa kultural).
- **Body Text**: `Noto Sans TC` (multilingual, bersih, dan mudah dibaca di layar mobile).

---

## 🛠️ Jalankan Secara Lokal

Karena proyek ini menggunakan Vanilla Web Stack (HTML/CSS/JS murni), Anda dapat menjalankannya dengan mudah tanpa perlu melakukan instalasi build tools yang rumit.

### Opsi 1: Buka Langsung di Browser
Cukup klik ganda atau seret file [index.html](file:///Users/nugroho/Documents/fortunefest/index.html) ke browser favorit Anda (Chrome, Safari, Firefox, Edge).

### Opsi 2: Menggunakan Local Development Server (Direkomendasikan)
Untuk memastikan fitur modal, dynamic assets, dan script berjalan sempurna dengan protokol `http`, jalankan local server sederhana.

**Menggunakan Python (jika sudah terinstall):**
1. Buka terminal di folder proyek ini.
2. Jalankan perintah:
   ```bash
   python3 -m http.server 8000
   ```
3. Buka browser dan akses `http://localhost:8000`.

**Menggunakan Node.js / npm:**
1. Jalankan perintah berikut di terminal Anda:
   ```bash
   npx serve .
   ```
2. Buka URL lokal yang diberikan pada terminal (biasanya `http://localhost:3000` atau `http://localhost:5000`).

---

## 📝 Catatan Kontribusi & Pemeliharaan

- **Menambahkan Tenant Baru**: Data tenant dikelola secara dinamis di dalam objek `tenantData` pada [script.js](file:///Users/nugroho/Documents/fortunefest/script.js). Cukup tambahkan nama dan path gambar pada kategori yang sesuai.
- **Modifikasi Styling**: Jangan mengubah style secara langsung di `style.css` utama. Lakukan perubahan secara modular pada berkas yang sesuai di dalam direktori `css/components/`.
- **Aksesibilitas (a11y)**: Pastikan semua elemen interaktif memiliki `cursor: pointer` dan kontras teks memenuhi syarat WCAG minimal 4.5:1 untuk kenyamanan semua pengunjung.
