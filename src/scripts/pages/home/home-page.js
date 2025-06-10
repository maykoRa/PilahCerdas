import { generatePopupImage,organicWaste,inorganicWaste } from '../../template.js';

export default class HomePage {
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
      </section>

      <section class="third-section" id="popup-container"></section>
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
