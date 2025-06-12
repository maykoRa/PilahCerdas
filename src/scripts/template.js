export function generateMainNavigationListTemplate() {
  return `
    <li><a id="home-page-button" class="home-page-button" href="#/">HOME</a></li>
    <li><a id="about-page-button" class="about-page-button" href="#/about">ABOUT</a></li>
    <div class="brand-name">
      <a class="brand-name__link" href="#/">
        <img class="brand-name__link__image" src="images/logo.png" alt="PilahCerdas Logo" />
      </a>
    </div>
    <li><a id="news-list-button" class="story-list-button" href="#/news">NEWS</a></li>
    <li><a id="contact-page-button" class="contact-page-button" href="#/contact">CONTACT</a></li>
  `;
}

export function generatePopupImage() {
  return `
    <div id="mlUploadModal" class="ml-popup-overlay">
      <div class="ml-popup-content">
        <div class="ml-popup-header">
          <h3>Unggah Gambar Sampah di Sini</h3>
          <span class="ml-upload-close-btn">&times;</span>
        </div>
        <div class="ml-popup-body">
          <div class="ml-drop-area" id="mlDropArea">
            <i class="fa-solid fa-trash-can-arrow-up"></i>
            <p>Drop foto sampahmu disini</p>
            <input type="file" id="mlFileInput" accept="image/*" style="display: none;" />
            <div id="mlImagePreviewContainer" style="display: none; margin-top: 10px;">
              <img id="mlImagePreview" src="#" alt="Image Preview" style="max-width: 100%; max-height: 150px; display: block; margin: 0 auto;">
            </div>
          </div>
          <div id="mlLoadingIndicator" style="display: none; text-align: center; margin-top: 20px; font-style: italic; color: #555;">
            <p>Memproses gambar...</p>
          </div>
        </div>
        <div class="ml-popup-footer">
          <button class="ml-btn ml-cancel-btn" id="mlUploadCancelBtn">Batal</button>
          <button class="ml-btn ml-primary-btn" id="mlPredictButton">Pilah disini</button>
        </div>
      </div>
    </div>
  `;
}

export function organicWaste(imageSrc, confidence) {
  return `
    <div id="mlResultModal" class="ml-result-overlay">
      <div class="ml-result-content">
        <h2 class="ml-popup-title">Identifikasi Berhasil!</h2>
        <span class="ml-result-close-btn">&times;</span>
        <img src=${imageSrc} alt="Preview Sampah" class="ml-result-image" />

        <div class="ml-result-section">
          <p><strong>Jenis Sampah</strong> : <span class="ml-badge ml-badge-organic">Organik</span></p>
          <p>Sampah ini termasuk kategori <strong>organik</strong> seperti sisa makanan, daun, atau buah. Sampah jenis ini dapat terurai secara alami.</p>
          <p><strong>Kepercayaan Model</strong> : <span class="ml-confidence-score">${confidence}</span></p>
        </div>

        <div class="ml-result-section">
          <p><strong>Cara Pembuangan</strong> :</p>
          <p>Buang ke tempat sampah <strong>hijau</strong>, atau manfaatkan untuk kompos.</p>
        </div>

        <div class="ml-result-section">
          <p><strong>Potensi Daur Ulang</strong> :</p>
          <p>Dapat dijadikan: <strong>kompos, pupuk cair, pakan maggot</strong>.</p>
        </div>

        <div class="ml-result-buttons">
          <button class="ml-btn-light" id="mlUploadAnotherImageBtn">Unggah Gambar Lain</button>
          <button class="ml-btn-dark">Pelajari Lebih Lanjut</button>
        </div>
      </div>
    </div>
  `;
}

export function inorganicWaste(imageSrc, confidence) {
  return `
    <div id="mlResultModal" class="ml-result-overlay">
      <div class="ml-result-content">
        <h2 class="ml-popup-title">Identifikasi Berhasil!</h2>
        <span class="ml-result-close-btn">&times;</span>
        <img src=${imageSrc} alt="Preview Sampah" class="ml-result-image" />

        <div class="ml-result-section">
          <p><strong>Jenis Sampah</strong> : <span class="ml-badge ml-badge-inorganic">Anorganik</span></p>
          <p>Sampah ini termasuk kategori <strong>anorganik</strong> seperti plastik, kaca, kaleng. Tidak mudah terurai, namun bisa didaur ulang.</p>
          <p><strong>Kepercayaan Model</strong> : <span class="ml-confidence-score">${confidence}</span></p>
        </div>

        <div class="ml-result-section">
          <p><strong>Cara Pembuangan</strong> :</p>
          <p>Buang ke tempat sampah <strong>kuning</strong>, pastikan dalam kondisi bersih dan kering.</p>
        </div>

        <div class="ml-result-section">
          <p><strong>Potensi Daur Ulang</strong> :</p>
          <p>Dapat dijadikan: <strong>botol baru, pot tanaman, serat tekstil</strong>.</p>
        </div>

        <div class="ml-result-buttons">
          <button class="ml-btn-light" id="mlUploadAnotherImageBtn">Unggah Gambar Lain</button>
          <button class="ml-btn-dark">Pelajari Lebih Lanjut</button>
        </div>
      </div>
    </div>
  `;
}
