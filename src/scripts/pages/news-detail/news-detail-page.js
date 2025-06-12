import { parseActivePathname } from '../../routes/url-parser'; //  // Import this

export default class NewsDetailPage {
  async render() {
    return `
      <section class="news-detail-section">
        <div class="news-detail-container">
          
          <div class="news-detail-header">
            <h1 class="news-detail-title" id="news-detail-title">Loading...</h1>
            
            <div class="news-detail-meta">
              <div class="news-meta-item">
                <i class="fa-solid fa-clock"></i>
                <span id="news-read-time"></span>
              </div>
              <div class="news-meta-item">
                <i class="fa-solid fa-calendar"></i>
                <span id="news-upload-date">Loading...</span>
              </div>
            </div>
          </div>

          <div class="news-detail-image">
            <img src="/images/placeholder.png" alt="Loading image" class="featured-image" id="featured-news-image">
          </div>

          <div class="news-detail-content" id="news-article-content">
            <div class="content-paragraph">
              <p>Loading content...</p>
            </div>
          </div>

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
    
    const urlParams = parseActivePathname(); 
    const newsId = urlParams.id;

    if (newsId) {
      await this.#fetchAndDisplayNews(newsId);
    } else {
      this.#displayErrorMessage('News ID not found in the URL.');
    }

    this.initializeShareButtons();
    
    this.initializeRelatedArticles(); 
    
    this.initializeImageLightbox();
  }

  async #fetchAndDisplayNews(newsId) {
    const newsTitleElement = document.getElementById('news-detail-title');
    const newsImageElement = document.getElementById('featured-news-image');
    const newsContentElement = document.getElementById('news-article-content');
    const newsUploadDateElement = document.getElementById('news-upload-date');
    const newsReadTimeElement = document.getElementById('news-read-time');

    newsTitleElement.textContent = 'Memuat Berita...';
    newsImageElement.src = '/images/placeholder.png'; 
    newsImageElement.alt = 'Memuat gambar...';
    newsContentElement.innerHTML = '<div class="content-paragraph"><p>Memuat konten...</p></div>';
    newsUploadDateElement.textContent = 'Memuat...';
    newsReadTimeElement.textContent = 'Memuat...';

    try {
      const response = await fetch(`https://pilahcerdas-backend-production.up.railway.app/news/${newsId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          this.#displayErrorMessage('Berita tidak ditemukan.');
        } else {
          throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }
        return;
      }

      const responseData = await response.json();
      const newsItem = responseData.data.item; // 

      if (newsItem) {
        newsTitleElement.textContent = newsItem.title;
        newsImageElement.src = newsItem.imageUrl;
        newsImageElement.alt = newsItem.title;
        newsImageElement.style.display = 'block';

        newsContentElement.innerHTML = `<div class="content-paragraph preserve-newlines"><p>${newsItem.content}</p></div>`;

        const createdAt = new Date(newsItem.createdAt);
        newsUploadDateElement.textContent = `Upload ${createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}, ${createdAt.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;

        const wordsPerMinute = 200;
        const wordCount = newsItem.content.split(/\s+/).length;
        const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
        newsReadTimeElement.textContent = `${readTimeMinutes} Menit Membaca`;

      } else {
        this.#displayErrorMessage('Data berita tidak lengkap.');
      }

    } catch (error) {
      console.error('Error fetching and displaying news:', error);
      this.#displayErrorMessage('Gagal memuat berita. Terjadi kesalahan jaringan atau server.');
    }
  }

  #displayErrorMessage(message) {
    const newsDetailContainer = document.querySelector('.news-detail-container');
    newsDetailContainer.innerHTML = `
      <div style="text-align: center; padding: 50px; color: red;">
        <h2>Error</h2>
        <p>${message}</p>
        <button class="nav-btn" onclick="history.back()"><i class="fa-solid fa-arrow-left"></i> Kembali</button>
      </div>
    `;
  }

  initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    const newsTitleElement = document.getElementById('news-detail-title');
    const title = newsTitleElement ? newsTitleElement.textContent : 'PilahCerdas News';
    
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
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${featuredImage.src}" alt="${featuredImage.alt}">
            <button class="lightbox-close">&times;</button>
          </div>
        `;
        
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
          }
        });
        
        document.body.style.overflow = 'hidden';
        
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
      
      featuredImage.style.cursor = 'pointer';
      featuredImage.title = 'Klik untuk memperbesar gambar';
    }
  }
}