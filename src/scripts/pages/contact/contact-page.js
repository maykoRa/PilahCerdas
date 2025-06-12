export default class ContactPage {
  async render() {
    return `
      <section class="contact-hero">
        <div class="container contact-hero-content">
          <h1 class="contact-title">Hubungi Kami</h1>
          <p class="contact-subtitle">Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran, atau ingin berkolaborasi, jangan ragu untuk menghubungi kami.</p>
        </div>
      </section>

      <section class="contact-section contact-info-section">
        <div class="container">
          <h2 class="section-heading">Informasi Kontak</h2>
          <div class="contact-details-grid">
            <div class="contact-detail-item">
              <div class="contact-icon">✉️</div> <h3>Email</h3>
              <p><a href="mailto:pilahcerdas@email.com">pilahcerdas@email.com</a></p>
            </div>
            <div class="contact-detail-item">
              <div class="contact-icon">📞</div> <h3>Telepon</h3>
              <p><a href="tel:+6281234567890">+62 812-3456-7890</a></p>
            </div>
            <div class="contact-detail-item">
              <div class="contact-icon">📍</div> <h3>Alamat Kantor</h3>
              <p>Universitas Hasanuddin, Makassar</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-section contact-form-section">
        <div class="container">
          <h2 class="section-heading">Kirim Pesan kepada Kami</h2>
          <form class="contact-form">
            <div class="form-group">
              <label for="name">Nama Lengkap</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="subject">Subjek</label>
              <input type="text" id="subject" name="subject">
            </div>
            <div class="form-group">
              <label for="message">Pesan Anda</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit" class="submit-button">Kirim Pesan</button>
          </form>
        </div>
      </section>
    `;
  }
  async afterRender() {
    console.log('Contact Page afterRender called!');
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        alert('Terima kasih! Pesan Anda telah terkirim.'); 
        contactForm.reset();
      });
    }
  }
}