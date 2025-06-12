import { initImageUpload } from '../../utils/image-upload-handler';
import { generatePopupImage, organicWaste, inorganicWaste } from '../../template.js';

export default class HomePage {
  #currentImageSrc = null;

  async render() {
    return `
      <section class="first-section">
        <div class="first-content">
            <h1 id="title-first-section">Kenali Sampahmu, <span class="first-highlight">Mulai dari Sekarang!</span></h1>
            <div id="fisrt-content-text">
              <p>Unggah foto sampah dan temukan jenis serta cara<br> penanganan terbaiknya.<br>Pilah jadi mudah dengan bantuan teknologi!</p>
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
        <div class="popup-container" id="popup-container"></div> 
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
          <p>Kami percaya bahwa memilah sampah bukan sekadar rutinitas, tapi langkah<br> nyata menuju masa depan yang lebih hijau dan berkelanjutan.</p>
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
            <p>PilahCerdas menggunakan kecerdasan buatan untuk membantu siapa pun mengenali jenis sampah hanya dengan mengunggah gambar. Dengan langkah kecil ini. kamu ikut berkontribusi <br>menjaga bumi</p>
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
        popupContainer.innerHTML = generatePopupImage();

        initImageUpload({
          fileInputId: 'mlFileInput',
          predictButtonId: 'mlPredictButton',
          imagePreviewId: 'mlImagePreview',
          dropAreaId: 'mlDropArea',
          loadingIndicatorId: 'mlLoadingIndicator',
          onPredictionStart: this.#handlePredictionStart.bind(this),
          onPredictionComplete: this.#displayPredictionResult.bind(this),
          onImageLoad: (imgSrc) => { this.#currentImageSrc = imgSrc; },
          uploadCancelBtnId: 'mlUploadCancelBtn'
        });

        const modal = document.getElementById('mlUploadModal');
        if (modal) modal.style.display = 'flex';
      });
    }

    window.addEventListener('click', (event) => {
      const modal = document.getElementById('mlUploadModal');
      const resultModal = document.getElementById('mlResultModal');
      if (event.target === modal) modal.style.display = 'none';
      if (event.target === resultModal) resultModal.style.display = 'none';
    });
  }

  #handlePredictionStart() {
    const loader = document.getElementById('mlLoadingIndicator');
    if (loader) loader.style.display = 'block';
  }

  #displayPredictionResult(result) {
    const loader = document.getElementById('mlLoadingIndicator');
    const uploadModal = document.getElementById('mlUploadModal');
    const container = document.getElementById('popup-container');

    if (loader) loader.style.display = 'none';
    if (uploadModal) uploadModal.style.display = 'none';

    const predicted = result.class_name;
    const confidence = result.confidence;

    if (predicted === 'Organik') {
      container.innerHTML = organicWaste(this.#currentImageSrc, confidence);
    } else if (predicted === 'Anorganik') {
      container.innerHTML = inorganicWaste(this.#currentImageSrc, confidence);
    } else {
      container.innerHTML = `
        <div id="mlResultModal" class="ml-result-overlay">
          <div class="ml-result-content">
            <h2 class="ml-popup-title">Identifikasi Gagal!</h2>
            <span class="ml-result-close-btn">&times;</span>
            <p>Terjadi kesalahan saat identifikasi atau jenis sampah tidak dikenali.</p>
            <div class="ml-result-buttons">
              <button class="ml-btn-light" id="mlUploadAnotherImageBtn">Unggah Gambar Lain</button>
            </div>
          </div>
        </div>
      `;
    }

    const resultModal = document.getElementById('mlResultModal');
    if (resultModal) {
      resultModal.style.display = 'flex';
      this.#attachResultPopupListeners();
    }
  }

  #attachResultPopupListeners() {
    const modal = document.getElementById('mlResultModal');
    const close = modal.querySelector('.ml-result-close-btn');
    const uploadAnotherBtn = document.getElementById('mlUploadAnotherImageBtn'); 
    const learnMoreBtn = document.getElementById('mlLearnMoreBtn');

    if (close) close.addEventListener('click', () => modal.remove());
    if (uploadAnotherBtn) 
      uploadAnotherBtn.addEventListener('click', () => {
      modal.remove();
      const uploadButton = document.getElementById('upload-button');
        if (uploadButton) {
          uploadButton.click();
        }
    });
    if (learnMoreBtn) { 
      learnMoreBtn.addEventListener('click', () => {
        modal.remove(); 
        window.location.hash = '#/news'; 
      });
    }
  }
}
