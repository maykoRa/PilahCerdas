# PilahCerdas App

## Pengantar

Project ini dikembangkan sebagai bagian dari [Capstone Project Team CC25-CF174] yang berfokus pada pembangunan aplikasi web interaktif dengan integrasi Machine Learning.

## Deskripsi

**PilahCerdas** adalah aplikasi web inovatif yang bertujuan untuk mempermudah masyarakat Indonesia dalam memilah sampah organik dan anorganik. Dengan memanfaatkan teknologi pengenalan gambar (Machine Learning), aplikasi ini memungkinkan pengguna untuk mengidentifikasi jenis sampah hanya dengan mengunggah foto. Selain identifikasi, PilahCerdas juga menyediakan informasi edukasi komprehensif mengenai cara pembuangan yang tepat, potensi daur ulang, dan dampak lingkungan dari berbagai jenis sampah.

Project ini hadir sebagai langkah awal menuju Bumi yang lebih lestari, dengan mendorong kebiasaan pilah sampah yang lebih baik dan efisien.

## Fitur Utama

- **Identifikasi Sampah:** Unggah gambar sampah untuk mendapatkan klasifikasi (organik/anorganik) secara instan.
- **Edukasi Pilah Sampah:** Informasi detail tentang cara membuang, mendaur ulang, dan dampak lingkungan per jenis sampah.
- **Berita Lingkungan:** Menyajikan berita terbaru seputar isu lingkungan dan pengelolaan sampah.
- **Dashboard Admin:** Manajemen konten berita (CRUD).

## Tech Stack

Berikut adalah teknologi utama yang digunakan dalam pengembangan PilahCerdas:

**Frontend:**

- **HTML:** Struktur dasar halaman web.
- **CSS:** Styling dan desain antarmuka.
- **JavaScript:** Logika interaktif dan komunikasi dengan API.
- **Webpack:** Module bundler untuk mengelola aset frontend.

**Backend (Node.js Hapi.js):**

- **Node.js:** Runtime JavaScript sisi server.
- **Hapi.js:** Framework web untuk membangun API RESTful.
- **MySQL:** Sistem manajemen database relasional.
- **Sequelize:** Object-Relational Mapper (ORM) untuk interaksi database.
- **Google Cloud Storage (GCS):** Layanan penyimpanan cloud untuk gambar yang diunggah.

**Machine Learning (Pelatihan Model):**

- **Python:** Bahasa pemrograman utama untuk development ML.
- **TensorFlow / Keras:** Framework untuk pembangunan dan pelatihan model Deep Learning.
- **NumPy / Pandas:** Library untuk komputasi numerik dan analisis data.

**Deployment & Tools:**

- **Railway / GitHub Pages:** Platform untuk hosting aplikasi.
- **Google Colab:** Lingkungan komputasi berbasis cloud untuk development ML.
- **Git / GitHub:** Version control dan hosting repositori.
- **VS Code:** Integrated Development Environment (IDE).

## Prasyarat

Sebelum menjalankan proyek ini secara lokal, pastikan Anda memiliki:

- **Node.js** (disarankan versi LTS terbaru, misalnya `v18.x` atau `v20.x`).
- **npm** atau **yarn** (package manager untuk Node.js).
- **Python 3.x** dan **pip** (untuk ML Server jika dijalankan lokal).
- **MySQL Server** (untuk database lokal, misal XAMPP/WAMP/Docker).

## Instalasi dan Menjalankan Proyek (Pengembangan Lokal)

Proyek ini memiliki struktur monorepo lokal untuk pengembangan, meskipun backend dan ML server dideploy secara terpisah.

1.  **Klon Repositori Frontend Utama:**

    ```bash
    git clone [https://github.com/maykoRa/PilahCerdas.git](https://github.com/maykoRa/PilahCerdas.git)
    cd PilahCerdas
    ```

    (Ganti `your-username` dengan username GitHub Anda)

2.  **Instal Dependensi Frontend:**

    ```bash
    npm install
    ```

3.  **Klon Repositori Backend (Terpisah):**
    Jika Anda ingin menjalankan backend secara lokal, klon repositori backend Anda di direktori terpisah (misalnya di luar folder `PilahCerdas` utama):

    ```bash
    cd .. # Kembali ke direktori induk jika Anda berada di PilahCerdas
    git clone [https://github.com/maykoRa/PilahCerdas-backend.git](https://github.com/maykoRa/PilahCerdas-backend.git)
    cd PilahCerdas-backend
    ```

4.  **Siapkan Backend Lokal:**

    - Instal dependensi backend: `npm install`
    - Buat file `.env` di root folder `PilahCerdas-backend` dengan konfigurasi database lokal Anda (sesuaikan dengan MySQL lokal Anda):
      ```
      DATABASE_URL="mysql://root:@localhost:3306/pilahcerdas_db"
      ```
    - Pastikan MySQL server lokal Anda berjalan.
    - Jalankan perintah sinkronisasi model Sequelize untuk membuat tabel (di direktori `PilahCerdas-backend`):
      `npm start` (Pastikan `server.js` memiliki `sequelize.sync()` yang diaktifkan untuk pengembangan).

5.  **Klon Repositori ML Server (Opsional, Terpisah):**
    Jika Anda ingin menjalankan ML server secara lokal, klon repositori ML server Anda di direktori terpisah:

    ```bash
    cd .. # Kembali ke direktori induk jika Anda berada di PilahCerdas-backend
    git clone [https://github.com/suryaagus9/model-waste-classifier.git](https://github.com/suryaagus9/model-waste-classifier.git) # Ganti jika nama repo berbeda
    cd PilahCerdas-ml-server
    ```

6.  **Siapkan ML Server Lokal:**

    - Instal dependensi Python: `pip install -r requirements.txt`
    - Tempatkan model `bag_classifier_best_model.h5` di root folder `PilahCerdas-ml-server`.
    - Jalankan server Flask: `flask run` (atau `python app.py`).

7.  **Menjalankan Frontend:**
    Setelah backend dan ML server berjalan secara lokal (jika Anda memilih untuk menjalankannya), kembali ke direktori `PilahCerdas` (frontend) dan jalankan:
    ```bash
    npm run start-dev
    ```
    Aplikasi frontend akan terbuka di browser Anda (biasanya `http://localhost:8080` atau `http://localhost:9001`). Pastikan Anda telah memperbarui URL API di kode frontend Anda agar menunjuk ke `http://localhost:9000` (untuk backend Hapi.js) dan `http://localhost:5000` (untuk ML server Flask).

## Scripts

Berikut adalah skrip `npm` yang tersedia untuk project frontend utama:

- `npm run build`: Membuat _build_ produksi menggunakan Webpack, siap untuk _deployment_ statis.
- `npm run start-dev`: Menjalankan server pengembangan lokal menggunakan Webpack Dev Server.
- `npm run serve`: Menjalankan server HTTP sederhana untuk _build_ yang sudah dibuat.

## Struktur Proyek

```plaintext
PilahCerdas/
├── package.json               # Dependensi frontend dan skrip npm
├── package-lock.json          # File lock untuk dependensi
├── README.md                  # Dokumentasi proyek
├── webpack.common.js          # Konfigurasi Webpack (umum)
├── webpack.dev.js             # Konfigurasi Webpack (development)
├── webpack.prod.js            # Konfigurasi Webpack (production)
├── src/                       # Direktori utama kode sumber frontend
│   ├── index.html             # Berkas HTML utama
│   ├── public/                # Direktori aset publik frontend
│   │   ├── images/            # Gambar statis frontend (logo, ikon)
│   │   └── models/            # Model TensorFlow.js (jika ada ML klien-sisi)
│   ├── scripts/               # Kode JavaScript frontend
│   │   ├── pages/             # Halaman-halaman aplikasi
│   │   ├── routes/            # Pengaturan routing
│   │   ├── utils/             # Helper dan utilitas
│   │   ├── template.js        # Template HTML dinamis
│   │   └── index.js           # Entry point aplikasi frontend
│   └── styles/                # File CSS frontend
│       ├── responsive.css
│       └── styles.css
└── .gitignore                 # File untuk mengabaikan file/folder dari Git

# Catatan:
# Repositori PilahCerdas-backend (Node.js Hapi.js) adalah repositori terpisah.
# Repositori PilahCerdas-ml-server (Python Flask) adalah repositori terpisah.
```
