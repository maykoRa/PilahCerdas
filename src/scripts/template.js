export function generateMainNavigationListTemplate() {
  return `
    <li><a id="home-page-button" class="home-page-button" href="#/">HOME</a></li>
    <li><a id="about-page-button" class="about-page-button"  href="#/about">ABOUT</a></li>
    <div class="brand-name">
      <a class="brand-name__link" href="#/">
        <img class="brand-name__link__image" src="images/logo.png" alt="PilahCerdas Logo" />
      </a>
    </div>
    <li><a id="news-list-button" class="story-list-button" href="#/news">NEWS</a></li>
    <li><a id="contact-page-button" class="contact-page-button"  href="#/contact">CONTACT</a></li> `;
}
export function generatePopupImage(imageSrc){
  return`
    <div id="uploadPopup" class="popup-overlay">
        <div class="popup-content">
            <div class="popup-header">
                <h3>Unggah Gambar Sampah di Sini</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="popup-body">
                <div class="drop-area" id="drop-area">
                    <i class="fa-solid fa-trash-can-arrow-up"></i> <p>Drop foto sampahmu disini</p>
                    <input type="file" id="fileInput" accept="image/*" style="display: none;" />
                </div>
            </div>
            <div class="popup-footer">
                <button class="btn cancel-btn">Batal</button>
                <button class="btn primary-btn">Pilah disini</button>
            </div>
        </div>
    </div>
  `
}
export function organicWaste(imageSrc) {
  return `
    <div class="result-popup">
      <h2 class="popup-title">Identifikasi Berhasil!</h2>
      <span class="popup-close">&times;</span>
      <img src=${imageSrc} alt="Preview Sampah" class="popup-image" />
      
      <div class="popup-section">
        <p><strong>Jenis Sampah</strong> : <span class="badge badge-organic">Organik</span></p>
        <p>Sampah ini termasuk kategori <strong>organik</strong> seperti sisa makanan, daun, atau buah. Sampah jenis ini dapat terurai secara alami.</p>
      </div>

      <div class="popup-section">
        <p><strong>Cara Pembuangan</strong> :</p>
        <p>Buang ke tempat sampah <strong>hijau</strong>, atau manfaatkan untuk kompos.</p>
      </div>

      <div class="popup-section">
        <p><strong>Potensi Daur Ulang</strong> :</p>
        <p>Dapat dijadikan: <strong>kompos, pupuk cair, pakan maggot</strong>.</p>
      </div>

      <div class="popup-buttons">
        <button class="btn-light">Unggah Gambar Lain</button>
        <button class="btn-dark">Pelajari Lebih Lanjut</button>
      </div>
    </div>
  `;
}

export function inorganicWaste() {
  return `
    <div class="result-popup">
      <h2 class="popup-title">Identifikasi Berhasil!</h2>
      <span class="popup-close">&times;</span>
      <img src=${imageSrc} alt="Preview Sampah" class="popup-image" />
      
      <div class="popup-section">
        <p><strong>Jenis Sampah</strong> : <span class="badge badge-inorganic">Anorganik</span></p>
        <p>Sampah ini termasuk kategori <strong>anorganik</strong> seperti plastik, kaca, kaleng. Tidak mudah terurai, namun bisa didaur ulang.</p>
      </div>

      <div class="popup-section">
        <p><strong>Cara Pembuangan</strong> :</p>
        <p>Buang ke tempat sampah <strong>kuning</strong>, pastikan dalam kondisi bersih dan kering.</p>
      </div>

      <div class="popup-section">
        <p><strong>Potensi Daur Ulang</strong> :</p>
        <p>Dapat dijadikan: <strong>botol baru, pot tanaman, serat tekstil</strong>.</p>
      </div>

      <div class="popup-buttons">
        <button class="btn-light">Unggah Gambar Lain</button>
        <button class="btn-dark">Pelajari Lebih Lanjut</button>
      </div>
    </div>
  `;
}
