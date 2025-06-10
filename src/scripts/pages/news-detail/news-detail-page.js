export default class NewsDetailPage {

  async render() {
    return `
      <section class="news-detail-section">
        <div class="news-detail-container">
          
          <!-- Header/Title Section -->
          <div class="news-detail-header">
            <h1 class="news-detail-title">Cara Mendaur Ulang Sampah Anorganik Menjadi Tas</h1>
            
            <div class="news-detail-meta">
              <div class="news-meta-item">
                <i class="fa-solid fa-clock"></i>
                <span>5 Menit Membaca</span>
              </div>
              <div class="news-meta-item">
                <i class="fa-solid fa-calendar"></i>
                <span>Upload 6:27 WIB, Senin 9 Juni 2025</span>
              </div>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="news-detail-image">
            <img src="/images/berita.png" alt="Cara Mendaur Ulang Sampah Anorganik Menjadi Tas" class="featured-image">
          </div>

          <!-- Article Content -->
          <div class="news-detail-content">
            <div class="content-paragraph">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <div class="content-paragraph">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <div class="content-paragraph">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>

            <div class="content-paragraph">
              <p>Berikut adalah langkah-langkah untuk mendaur ulang sampah anorganik menjadi tas:</p>
              <ul class="content-list">
                <li>Kumpulkan sampah anorganik seperti botol plastik, kemasan, dan bahan lainnya</li>
                <li>Bersihkan dan sortir bahan-bahan tersebut berdasarkan jenis dan ukuran</li>
                <li>Siapkan alat-alat yang diperlukan seperti gunting, lem, dan benang</li>
                <li>Potong dan bentuk bahan sesuai dengan desain tas yang diinginkan</li>
                <li>Jahit atau rekatkan bagian-bagian tas dengan rapi</li>
                <li>Tambahkan aksesoris seperti tali atau hiasan untuk mempercantik tampilan</li>
              </ul>
            </div>

            <div class="content-paragraph">
              <p>Dengan mengikuti langkah-langkah di atas, Anda dapat mengubah sampah anorganik menjadi tas yang berguna dan ramah lingkungan. Selain mengurangi limbah, aktivitas ini juga dapat menjadi kegiatan kreatif yang menghasilkan produk bermanfaat.</p>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="news-detail-navigation">
            <button class="nav-btn back-btn" onclick="history.back()">
              <i class="fa-solid fa-arrow-left"></i>
              Kembali ke Berita
            </button>
            
            <div class="share-buttons">
              <span class="share-label">Bagikan:</span>
              <button class="share-btn facebook-btn">
                <i class="fa-brands fa-facebook-f"></i>
              </button>
              <button class="share-btn twitter-btn">
                <i class="fa-brands fa-twitter"></i>
              </button>
              <button class="share-btn whatsapp-btn">
                <i class="fa-brands fa-whatsapp"></i>
              </button>
              <button class="share-btn link-btn">
                <i class="fa-solid fa-link"></i>
              </button>
            </div>
          </div>

      </section>
    `;
  }

  async afterRender() {
    console.log('afterRender NewsDetail Page dipanggil!');
    
    // Initialize share buttons
    this.initializeShareButtons();
    
    // Initialize related articles
    this.initializeRelatedArticles();
    
    // Initialize image lightbox (optional)
    this.initializeImageLightbox();
  }

  initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    const title = document.querySelector('.news-detail-title').textContent;
    
    shareButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (btn.classList.contains('facebook-btn')) {
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
          window.open(facebookUrl, '_blank', 'width=600,height=400');
        } 
        else if (btn.classList.contains('twitter-btn')) {
          const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
          window.open(twitterUrl, '_blank', 'width=600,height=400');
        }
        else if (btn.classList.contains('whatsapp-btn')) {
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`;
          window.open(whatsappUrl, '_blank');
        }
        else if (btn.classList.contains('link-btn')) {
          navigator.clipboard.writeText(currentUrl).then(() => {
            alert('Link berhasil disalin ke clipboard!');
          }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = currentUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link berhasil disalin ke clipboard!');
          });
        }
      });
    });
  }

  initializeRelatedArticles() {
    const relatedCards = document.querySelectorAll('.related-card');
    
    relatedCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Related article clicked:', card.querySelector('.related-article-title').textContent);
        alert('Navigasi ke artikel terkait');
      });
      
      // Add hover effect
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  initializeImageLightbox() {
    const featuredImage = document.querySelector('.featured-image');
    
    if (featuredImage) {
      featuredImage.addEventListener('click', () => {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${featuredImage.src}" alt="${featuredImage.alt}">
            <button class="lightbox-close">&times;</button>
          </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
          }
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Restore body scroll when lightbox is closed
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
              Array.from(mutation.removedNodes).forEach((node) => {
                if (node.classList && node.classList.contains('image-lightbox')) {
                  document.body.style.overflow = 'auto';
                  observer.disconnect();
                }
              });
            }
          });
        });
        
        observer.observe(document.body, { childList: true });
      });
      
      // Add cursor pointer to indicate clickable image
      featuredImage.style.cursor = 'pointer';
      featuredImage.title = 'Klik untuk memperbesar gambar';
    }
  }
}