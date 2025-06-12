import { generatePopupImage, organicWaste, inorganicWaste } from '../../template.js';

export default class HomePage {
  async render() {
    return `
      <section class="first-section">
        <div class="first-content">
            <h1 id="title-first-section">Kenali Sampahmu, <span class="first-highlight">Mulai dari Sekarang!</span></h1>
            <div id="fisrt-content-text">
              <p>Unggah foto sampah dan temukan jenis serta cara<br> penanganan terbaiknya.<br> Pilah jadi mudah dengan bantuan teknologi!</p>
            </div>
        </div>
      </section>

      <section id="second-section">
        <div class="left-section">
            <div class="image-wrapper">
                <img src="images/pile-of-rubbish.png" alt="Tumpukan Sampah">
            </div>
        </div>
        <div class="right-section">
            <h2 class="upload-text">UNGGAH</h2>
            <h2 class="upload-image">GAMBAR SAMPAHMU!</h2>
            <p class="description">
                Ingin tahu apakah sampahmu bisa didaur ulang? Upload gambarnya dan biarkan PilahCerdas mengidentifikasinya, lengkap dengan edukasi tentang cara pembuangan yang tepat dan dampak lingkungannya.
            </p>
            <button class="upload-button" id="upload-button">
                PilahCerdas <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </button>
        </div>
        <div class = "popup-container"id="popup-container"></div> 
      </section>

      <section class="third-section">
        <div class="first-content-third-section">
            <h2 id="title-first-section">Sampah Perlu di Pilah Demi Pengelolaan Yang Tepat</h2>
            <div id="fisrt-content-text">
              <p>Memilah sampah sejak awal membantu proses daur ulang,mengurangi pencemaran, dan <br>mendukung pengelolaan lingkungan yang berkelanjutan.<span class="second-highlight">PilahCerdas dapat membantumu</span></p>
            </div>
        </div>
        <div class="section-content-third-section">
        
          <div class="card-image-one">
            <div class="card-overlay">
              <h3>Masalah Sampah yang <br> <span class="third-highlight"> Terabaikan<span></h3>
              <p>Kurangnya kebiasaan memilah sampah menyebabkan limbah menumpuk di TPA dan mencemari lingkungan sekitar kita.</p>
            </div>
          
        </div>
        
          <div class="card-image-two">
            <div class="card-overlay">
              <h3>Teknologi untuk Bantu <br><span class="third-highlight">Pilah Sampah<span></h3>
              <p>Dengan bantuan AI berbasis gambar, <span class="fourth-highlight">PilahCerdas</span> memudahkan siapapun mengenali jenis sampah dan cara membuangnya dengan benar.</p>
            </div>
         
        </div>
        
          <div class="card-image-three">
          <div class="card-overlay">
            <h3>Kontribusi untuk <span class="third-highlight">Bumi<span></h3>
            <p>Setiap gambar yang kamu unggah membantu menciptakan kebiasaan baik, mengurangi pencemaran, dan membantu budaya pilah sampah di Indonesia.</p>
          </div>
          </div>
      </div>
  </section>
  <section class="fourth-section">
    <div class="fist-content-fourth-section">
      <h2>Bersama PilahCerdas Membangun<br> Kebiasaan Baru Demi Lingkungan yang Lebih Baik</h2>
      <p>Kami percaya bahwa memilah sampah bukan sekadar rutinitas, tapi langkah<br> nyata menuju masa depan yang lebih hijau dan berkelanjutan.
    </div>
    <div class="second-contents-fourth-section">
        <div class="fourth-content-hero">
          <h3>Mulai dari Rumah,<br> Berdampak untuk<br> Dunia</h3>
          <p>Perubahan besar selalu dimulai dari hal kecil. Dengan fitur yang mudah digunakan, Pilah Cerdas mendorong masyarakat Indonesia memulai kebiasaan baik dari rumah masing-masing.</p>
          </div>
        <div class="fourth-image-hero">
          <img src="images/gambar2.png" alt="Sampah Organik" class="card-image" />
        </div>
    </div>
    <div class="second-contents-fourth-section">
      <div class="fourth-images-hero">
        <img src="images/gambar1.png" alt="Sampah Organik" class="card-image" />
      </div>
      <div class="fourth-content-hero-right">
        <h3>Teknologi untuk<br>Lingkungan</h3>
        <p> PilahCerdas menggunakan kecerdasan buatan untuk membantu siapa pun mengenali jenis sampah hanya dengan mengunggah gambar. Dengan langkah kecil ini. kamu ikut berkontribusi <br>menjaga bumi</p>
      </div>
    </div>

  </section>
    `;
  }

  async afterRender() {
    const uploadButton = document.getElementById('upload-button');
    const popupContainer = document.getElementById('popup-container');

    if (uploadButton && popupContainer) {
      uploadButton.addEventListener('click', () => {
        // Sisipkan popup jika belum ada
        if (!document.getElementById('uploadPopup')) {
          popupContainer.innerHTML = generatePopupImage();
        }

        // Seleksi ulang setelah popup muncul di DOM
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('fileInput');
        const closeBtn = document.querySelector('.close-btn');
        const cancelBtn = document.querySelector('.cancel-btn');
        const checkImage = document.querySelector('.primary-btn');

        // Tutup popup
        const closePopup = () => {
          const popup = document.getElementById('uploadPopup');
          if (popup) popup.remove();
        };

        if (closeBtn) closeBtn.addEventListener('click', closePopup);
        if (cancelBtn) cancelBtn.addEventListener('click', closePopup);

        // membuka file input
        if (dropArea && fileInput) {
          dropArea.addEventListener('click', () => {
            fileInput.click();
          });

          // Preview gambar saat file dipilih
          fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                dropArea.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; height: auto;" />`;
              };
              reader.readAsDataURL(file);
            }
          });
        }
      });
    }
  }
}
