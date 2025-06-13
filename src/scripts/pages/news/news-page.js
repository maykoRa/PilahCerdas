export default class NewsPage {
  #allNews = [];
  #currentPage = 1;
  #itemsPerPage = 6;

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
     <img src="images/icon.png" alt="Icon">
        </div>
      </section>

      <section class="news-content-section">
        <div class="news-container">
          <h2 class="news-section-title">Berita Terkini</h2>
          
          <div class="news-grid" id="news-grid-container">
            </div>

          <div class="pagination" id="pagination-controls-news">
            </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    console.log("afterRender News Page dipanggil!");

    await this.#fetchAndRenderNews(this.#currentPage);

    this.#initializePaginationEventListeners();

    this.#initializeReadMore();
  }

  async #fetchNews() {
    try {
      const response = await fetch("https://pilahcerdas-backend-production.up.railway.app/news");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      this.#allNews = responseData.data.news.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } catch (error) {
      console.error("Error fetching news:", error);
      const newsGridContainer = document.getElementById("news-grid-container");
      newsGridContainer.innerHTML =
        '<p style="text-align: center; color: red;">Gagal memuat berita. Terjadi kesalahan jaringan atau server.</p>';
    }
  }

  #renderNewsCards(newsItems) {
    const newsGridContainer = document.getElementById("news-grid-container");
    newsGridContainer.innerHTML = "";

    if (newsItems.length === 0) {
      newsGridContainer.innerHTML =
        '<p style="text-align: center; color: #888; padding: 20px;">Belum ada berita yang tersedia.</p>';
      return;
    }

    newsItems.forEach((news) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");
      newsCard.innerHTML = `
        <div class="news-image">
          <img src="${news.imageUrl}" alt="${
        news.title
      }" onerror="this.onerror=null;this.src='/images/placeholder.png';">
        </div>
        <div class="news-content">
          <h3 class="news-title">${news.title}</h3>
          <p class="news-excerpt">${news.content}</p>
          <button class="read-more-btn" data-id="${
            news.id
          }">Baca Selengkapnya</button>
        </div>
      `;
      newsGridContainer.appendChild(newsCard);
    });
  }

  #renderPaginationControls(totalPages) {
    const paginationControls = document.getElementById(
      "pagination-controls-news"
    );
    paginationControls.innerHTML = "";

    if (totalPages <= 1 && this.#allNews.length === 0) {
      return;
    }

    const prevButton = document.createElement("button");
    prevButton.classList.add("pagination-btn", "prev-btn");
    prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i> Previous';
    prevButton.disabled = this.#currentPage === 1;
    paginationControls.appendChild(prevButton);

    const pageNumbersContainer = document.createElement("div");
    pageNumbersContainer.classList.add("pagination-numbers");

    const maxPageNumbersToShow = 5;

    let startPage = Math.max(
      1,
      this.#currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    if (startPage > 1) {
      const firstPageButton = document.createElement("button");
      firstPageButton.classList.add("pagination-number");
      firstPageButton.textContent = "1";
      pageNumbersContainer.appendChild(firstPageButton);
      if (startPage > 2) {
        const dots = document.createElement("span");
        dots.classList.add("pagination-dots");
        dots.textContent = "...";
        pageNumbersContainer.appendChild(dots);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("pagination-number");
      if (i === this.#currentPage) {
        button.classList.add("active");
      }
      pageNumbersContainer.appendChild(button);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const dots = document.createElement("span");
        dots.classList.add("pagination-dots");
        dots.textContent = "...";
        pageNumbersContainer.appendChild(dots);
      }
      const lastPageButton = document.createElement("button");
      lastPageButton.classList.add("pagination-number");
      lastPageButton.textContent = totalPages.toString();
      pageNumbersContainer.appendChild(lastPageButton);
    }

    paginationControls.appendChild(pageNumbersContainer);

    const nextButton = document.createElement("button");
    nextButton.classList.add("pagination-btn", "next-btn");
    nextButton.innerHTML = 'Next <i class="fa-solid fa-chevron-right"></i>';
    nextButton.disabled = this.#currentPage === totalPages;
    paginationControls.appendChild(nextButton);
  }

  async #fetchAndRenderNews(page) {
    const newsGridContainer = document.getElementById("news-grid-container");
    newsGridContainer.innerHTML =
      '<div class="loader-container" style="text-align: center; padding: 50px;"><div class="loader"></div><p style="margin-top: 15px; color: #555;">Memuat berita...</p></div>';

    if (this.#allNews.length === 0) {
      await this.#fetchNews();
    }

    const totalPages = Math.ceil(this.#allNews.length / this.#itemsPerPage);
    const startIndex = (page - 1) * this.#itemsPerPage;
    const endIndex = startIndex + this.#itemsPerPage;
    const newsToDisplay = this.#allNews.slice(startIndex, endIndex);

    this.#renderNewsCards(newsToDisplay);
    this.#renderPaginationControls(totalPages);
    this.#initializeReadMore();
  }

  #initializePaginationEventListeners() {
    const paginationControls = document.getElementById(
      "pagination-controls-news"
    );

    paginationControls.addEventListener("click", (event) => {
      if (event.target.classList.contains("pagination-number")) {
        const page = parseInt(event.target.textContent);
        if (page !== this.#currentPage) {
          this.#currentPage = page;
          this.#fetchAndRenderNews(this.#currentPage);
        }
      } else if (event.target.closest(".prev-btn")) {
        if (this.#currentPage > 1) {
          this.#currentPage--;
          this.#fetchAndRenderNews(this.#currentPage);
        }
      } else if (event.target.closest(".next-btn")) {
        const totalPages = Math.ceil(this.#allNews.length / this.#itemsPerPage);
        if (this.#currentPage < totalPages) {
          this.#currentPage++;
          this.#fetchAndRenderNews(this.#currentPage);
        }
      }
    });
  }

  #initializeReadMore() {
    const readMoreBtns = document.querySelectorAll(".read-more-btn");
    readMoreBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const newsId = e.target.dataset.id;
        window.location.hash = `#/news-detail/${newsId}`;
      });
    });
  }
}
