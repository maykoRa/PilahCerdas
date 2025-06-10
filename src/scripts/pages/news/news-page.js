export default class NewsPage {

  async render() {
    return `
      <section class="news-hero-section">
        <div class="news-hero-container">
          <div class="news-hero-content">
           <h1>
      Masa Depan Berkelanjutan<br>
      Dimulai dari Pengelolaan<br>
      <span class="news-highlight">Sampah&nbsp;yang Efektif</span>
    </h1>
            <p class="news-hero-description">Ikuti perkembangan terkini seputar daur ulang, edukasi lingkungan, dan<br>teknologi cerdas untuk bumi yang lebih hijau.</p>
          </div>
         <div class="news-hero-image">
     <img src="/images/icon.png" alt="Icon">
        </div>
      </section>

      <section class="news-content-section">
        <div class="news-container">
          <h2 class="news-section-title">Berita Terkini</h2>
          
          <div class="news-grid">
            <div class="news-card">
              <div class="news-image">
                <div class="placeholder-image food-waste-bg">
                  <i class="fa-solid fa-apple-whole"></i>
                </div>
              </div>
              <div class="news-content">
                <h3 class="news-title">Teknologi untuk Lingkungan</h3>
                <p class="news-excerpt">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <button class="read-more-btn">Baca Selengkapnya</button>
              </div>
            </div>

            <div class="news-card">
              <div class="news-image">
                <div class="placeholder-image food-waste-bg">
                  <i class="fa-solid fa-apple-whole"></i>
                </div>
              </div>
              <div class="news-content">
                <h3 class="news-title">Teknologi untuk Lingkungan</h3>
                <p class="news-excerpt">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <button class="read-more-btn">Baca Selengkapnya</button>
              </div>
            </div>

            <div class="news-card">
              <div class="news-image">
                <div class="placeholder-image food-waste-bg">
                  <i class="fa-solid fa-apple-whole"></i>
                </div>
              </div>
              <div class="news-content">
                <h3 class="news-title">Teknologi untuk Lingkungan</h3>
                <p class="news-excerpt">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <button class="read-more-btn">Baca Selengkapnya</button>
              </div>
            </div>

            <div class="news-card">
              <div class="news-image">
                <div class="placeholder-image food-waste-bg">
                  <i class="fa-solid fa-apple-whole"></i>
                </div>
              </div>
              <div class="news-content">
                <h3 class="news-title">Teknologi untuk Lingkungan</h3>
                <p class="news-excerpt">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <button class="read-more-btn">Baca Selengkapnya</button>
              </div>
            </div>

            <div class="news-card">
              <div class="news-image">
                <div class="placeholder-image food-waste-bg">
                  <i class="fa-solid fa-apple-whole"></i>
                </div>
              </div>
              <div class="news-content">
                <h3 class="news-title">Teknologi untuk Lingkungan</h3>
                <p class="news-excerpt">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <button class="read-more-btn">Baca Selengkapnya</button>
              </div>
            </div>

            <div class="news-card">
              <div class="news-image">
                <div class="placeholder-image food-waste-bg">
                  <i class="fa-solid fa-apple-whole"></i>
                </div>
              </div>
              <div class="news-content">
                <h3 class="news-title">Teknologi untuk Lingkungan</h3>
                <p class="news-excerpt">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <button class="read-more-btn">Baca Selengkapnya</button>
              </div>
            </div>
          </div>

          <div class="pagination">
            <button class="pagination-btn prev-btn" disabled>
              <i class="fa-solid fa-chevron-left"></i> Previous
            </button>
            <div class="pagination-numbers">
              <button class="pagination-number active">1</button>
              <button class="pagination-number">2</button>
              <button class="pagination-number">3</button>
              <span class="pagination-dots">...</span>
              <button class="pagination-number">67</button>
              <button class="pagination-number">68</button>
            </div>
            <button class="pagination-btn next-btn">
              Next <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    console.log('afterRender News Page dipanggil!');
    
    // Add event listeners for pagination
    this.initializePagination();
    
    // Add event listeners for read more buttons
    this.initializeReadMore();
  }

  initializePagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    paginationNumbers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        paginationNumbers.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Enable/disable prev/next buttons based on current page
        const currentPage = parseInt(e.target.textContent);
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === 68;
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.pagination-number.active');
        const currentPage = parseInt(activeBtn.textContent);
        if (currentPage > 1) {
          const prevPage = currentPage - 1;
          activeBtn.classList.remove('active');
          const prevPageBtn = Array.from(paginationNumbers).find(btn => parseInt(btn.textContent) === prevPage);
          if (prevPageBtn) {
            prevPageBtn.classList.add('active');
          }
          prevBtn.disabled = prevPage === 1;
          nextBtn.disabled = false;
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.pagination-number.active');
        const currentPage = parseInt(activeBtn.textContent);
        if (currentPage < 68) {
          const nextPage = currentPage + 1;
          activeBtn.classList.remove('active');
          const nextPageBtn = Array.from(paginationNumbers).find(btn => parseInt(btn.textContent) === nextPage);
          if (nextPageBtn) {
            nextPageBtn.classList.add('active');
          }
          nextBtn.disabled = nextPage === 68;
          prevBtn.disabled = false;
        }
      });
    }
  }

 initializeReadMore() {
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  
  readMoreBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Navigasi ke halaman detail berdasarkan index berita
      window.location.hash = `#/news/${idx + 1}`;
    });
  });
}


}