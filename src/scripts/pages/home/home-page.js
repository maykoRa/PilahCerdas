export default class HomePage {

  async render() {
    return `
      <section class="first-section">
        <div class="fisrt-content">
          <img class="ilustration" src="images/ilustrative-save-earth-outdoor.jpg" alt="Ilustrasi orang mengumpulkan sampah">
          <h1>Kenali Sampahmu, <span class="first-highlight">Mulai dari Sekarang!</span></h1>
          <p>Unggah foto sampah dan temukan jenis serta cara penanganan terbaiknya.<br>Pilah jadi mudah dengan bantuan teknologi!</p>
          <div class="toggle-button">
            <button class="toggle-btn">Mulai Kenali Sampahmu<i class="fa-solid fa-search"></i></button>
          </div>
        </div>
      </section>

      <section class="second-section">
        <div class="second-content">
          <h2>Sampah Perlu Dipilah Demi Pengolahan yang Tepat</h2>
          <p>Memilah sampah sejak awal membantu proses daur ulang, mengurangi pencemaran,dan<br>
          mendukung pengelolaan lingkungan yang berkelanjutan. <span class="second-highlight">PilahCerdas dapat membantumu</span></p>
        </div>
        <div>
          <div class="card-container">
            <img src="images/pile-of-rubbish.jpg"" alt="gambar tumpukan sampah">
            <h3>Masalah Sampah yang <span class="third-highlight">Terabaikan</span></h3>
            <p>Kurangnya kebiasaan memilah sampah menyebabkan limbah menumpuk di TPA dan mencemari lingkungan sekitar kita.</p>
          </div>
          <div>
            <img src="images/PilahCerdas-tecnology.jpg" alt="tekonologi pilah cerdas">
            <h3>Teknologi untuk Bantu<span class="third-highlight">Pilah Sampah</span></h3>
            <p>Dengan bantuan AI berbasis gambar, <span class="fourth-highlight">PilahCerdas</span> memudahkan siapa pun mengenali jenis sampah dan cara membuangnya.</p>
          </div>
          <div>
            <img src="images/three-trash-cans.jpg" alt="gambar tiga tempat sampah">
            <h3>Kontribusi untuk <span class="third-highlight">Bumi</span></h3>
            <p>setiap gambar yang kamu unggah membantu menciptakan kebiasaan baik, mengurangi penccemaran, dan membangun budaya pilah sampah di indonesia.</p>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h2>Sampah Perlu Dipilah<br>Demi Pengelolaan,<br><span class="fifth-highlight">yang Tepat</span></h2>
          <p>Memilah sampah sejak awal membantu proses daur ulang, mengurangi pencemaran, dan mendukung pengelolaan lingkungan yang berkelanjutan.</p>
        </div>
        <div>
          <ul>
            <li>
              <span class="icon"><i class="fa-solid fa-recycle"></i></span>
              Meningkatkan Efisiensi Daur Ulang
            </li>
            <li>
              <span class="icon"><i class="fa-solid fa-trash-can"></i></span>
              Mengurangi Beban Tempat Pembuangan Akhir
            </li>
            <li>
              <span class="icon"><i class="fa-solid fa-coins"></i></span>
              Mendukung Ekonomi Sirkular
            </li>
            <li>
              <span class="icon"><i class="fa-solid fa-leaf"></i></span>
              Mempermudah Pengolahan Sampah Organik
            </li>
            <li>
              <span class="icon"><i class="fa-solid fa-house"></i></span>
              Membiasakan Gaya Hidup Ramah Lingkungan
            </li>
          </ul>
        </div>
      </section>
    `;
  }
  async afterRender() {
    console.log('afterRender Halaman Utama dipanggil!');
  }
}