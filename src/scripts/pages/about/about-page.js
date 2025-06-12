// src/scripts/pages/about/about-page.js
export default class AboutPage {
  async render() {
    return `
      <section class="about-hero">
        <div class="container about-hero-content">
          <h1 class="about-title">Tentang PilahCerdas: <br> Teknologi untuk Lingkungan yang Lebih Baik</h1>
          <p class="about-subtitle">Kami adalah tim inovator yang bersemangat untuk menciptakan solusi nyata bagi permasalahan sampah di Indonesia. PilahCerdas lahir dari keyakinan bahwa teknologi dapat memberdayakan setiap individu untuk berkontribusi pada lingkungan yang lebih bersih dan berkelanjutan, dimulai dari rumah.</p>
        </div>
      </section>

      <section class="about-section vision-mission-section">
        <div class="container">
          <div class="vision-section">
            <h2 class="section-heading">Visi Kami</h2>
            <p>Menjadi platform terdepan yang menginspirasi dan memfasilitasi kebiasaan memilah sampah yang efektif di seluruh Indonesia, mewujudkan masyarakat yang sadar lingkungan dan bumi yang lestari.</p>
          </div>
          <div class="mission-section">
            <h2 class="section-heading">Misi Kami</h2>
            <ul>
              <li>Mengembangkan teknologi identifikasi sampah berbasis AI yang akurat dan mudah digunakan.</li>
              <li>Menyediakan edukasi komprehensif tentang jenis sampah, cara pembuangan yang benar, dan potensi daur ulang.</li>
              <li>Mendorong kolaborasi antara masyarakat, pemerintah, dan industri untuk menciptakan ekosistem pengelolaan sampah yang terintegrasi.</li>
              <li>Membangun kesadaran kolektif akan pentingnya memilah sampah demi masa depan bumi.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="about-section why-pilahcerdas-section">
        <div class="container">
          <h2 class="section-heading">Mengapa PilahCerdas Penting?</h2>
          <p>Indonesia menghadapi tantangan besar dalam pengelolaan sampah, dengan tumpukan limbah di TPA dan pencemaran lingkungan yang terus meningkat. Kurangnya pemahaman tentang jenis sampah dan cara penanganannya seringkali menjadi penghalang utama. PilahCerdas hadir sebagai jembatan, mengubah kerumitan ini menjadi aksi yang mudah dan berdampak.</p>
        </div>
      </section>

      <section class="about-section features-section">
        <div class="container">
          <h2 class="section-heading">Fitur Unggulan Kami</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">🔍</div> <h3>Deteksi Sampah Akurat Berbasis AI</h3>
              <p>Unggah gambar sampah Anda dan biarkan PilahCerdas mengidentifikasi jenisnya secara instan dengan teknologi kecerdasan buatan terdepan.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📚</div> <h3>Pusat Edukasi Sampah Interaktif</h3>
              <p>Pelajari lebih lanjut tentang berbagai kategori sampah, cara pemilahan yang benar, dan potensi daur ulangnya melalui sumber daya edukasi kami yang mudah dipahami.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🌱</div> <h3>Tips & Trik Ramah Lingkungan</h3>
              <p>Dapatkan inspirasi dan panduan praktis untuk mengadopsi gaya hidup minim sampah dan berkontribusi lebih besar pada kelestarian lingkungan.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="about-section team-section">
        <div class="container">
          <h2 class="section-heading">Tim di Balik PilahCerdas</h2>
          <p>PilahCerdas dikembangkan oleh Tim CC25-CF174, sebuah kelompok individu berdedikasi dengan latar belakang beragam, bersatu dalam satu tujuan: memanfaatkan inovasi teknologi untuk mengatasi masalah lingkungan. Kami berkomitmen untuk terus mengembangkan PilahCerdas menjadi solusi yang semakin relevan dan efektif bagi Anda dan bumi.</p>
        </div>
      </section>
    `;
  }
  async afterRender() {
    console.log('About Page afterRender called!');
  }
}