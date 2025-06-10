export default class AdminDashboardPage {
  async render() {
    return `
      <section class="admin-dashboard-section">
        <header class="dashboard-topbar">
          <h1 class="dashboard-title">Admin Dashboard</h1>
          <button id="logout-button" class="logout-btn">
            <i class="fa-solid fa-lock-open"></i> Logout
          </button>
        </header>

        <div class="dashboard-content">
          <div class="manage-news-section">
            <div class="manage-news-header">
              <h3 class="section-heading">Manage News</h3>
              <button id="add-news-button" class="add-news-btn">
                <i class="fa-solid fa-plus"></i> Add News
              </button>
            </div>

            <div class="news-table-container">
              <table class="news-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Created / Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="news-table-body">
                </tbody>
              </table>
            </div>

            <div class="pagination-controls" id="pagination-controls">
            </div>
          </div>
        </div>
      </section>

      <div id="news-form-modal" class="modal">
        <div class="modal-content">
          <span class="close-button" id="close-news-form-modal">&times;</span>
          <h3 id="modal-form-title">Add New News</h3>
          <form id="news-management-form">
            <input type="hidden" id="news-id">
            <div class="form-group">
              <label for="news-title">Title:</label>
              <input type="text" id="news-title" name="title" required>
            </div>
            <div class="form-group">
              <label for="news-content">Content:</label>
              <textarea id="news-content" name="content" rows="10" required></textarea>
            </div>
            <div class="form-group">
              <label for="news-image-input">Image:</label>
              <div class="image-upload-wrapper">
                <input type="text" id="news-image-url" name="imageUrl" placeholder="Image URL (auto-generated on upload)" readonly>
                <input type="file" id="image-upload-input" name="image" accept="image/*" style="display: none;">
                <button type="button" id="upload-image-btn" class="upload-image-button"><i class="fa-solid fa-upload"></i> Upload File</button>
              </div>
              <div class="image-preview" id="image-preview-container">
                <img id="news-image-preview" src="" alt="Image Preview" style="display: none;">
                <p id="image-upload-status"></p>
              </div>
            </div>
            <button type="submit" class="save-news-btn" id="save-news-button">Save News</button>
            <p id="news-form-error-message" class="error-message"></p>
          </form>
        </div>
      </div>

      <div id="delete-confirm-modal" class="modal">
        <div class="modal-content small-modal">
          <span class="close-button" id="close-delete-confirm-modal">&times;</span>
          <h3>Confirm Deletion</h3>
          <p>Apakah Anda yakin ingin menghapus berita ini?</p>
          <div class="modal-actions">
            <button id="confirm-delete-btn" class="action-btn delete-confirm-btn">Ya, Hapus</button>
            <button id="cancel-delete-btn" class="action-btn cancel-btn">Batal</button>
          </div>
          <p id="delete-error-message" class="error-message"></p>
        </div>
      </div>

      <div id="news-detail-modal" class="modal">
        <div class="modal-content">
          <span class="close-button" id="close-news-detail-modal">&times;</span>
          <h3 id="detail-news-title"></h3>
          <div class="detail-news-image-container">
            <img id="detail-news-image" src="" alt="News Image">
          </div>
          <p id="detail-news-content"></p>
          <div class="detail-news-meta">
            <p><strong>Created At:</strong> <span id="detail-news-createdAt"></span></p>
            <p><strong>Updated At:</strong> <span id="detail-news-updatedAt"></span></p>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    console.log("Admin Dashboard Page afterRender called!");

    const logoutButton = document.getElementById("logout-button");
    const newsTableBody = document.getElementById("news-table-body");
    const addNewsButton = document.getElementById("add-news-button");
    const paginationControls = document.getElementById("pagination-controls");

    const newsFormModal = document.getElementById("news-form-modal");
    const closeNewsFormModalBtn = document.getElementById(
      "close-news-form-modal"
    );
    const modalFormTitle = document.getElementById("modal-form-title");
    const newsManagementForm = document.getElementById("news-management-form");
    const newsIdField = document.getElementById("news-id");
    const newsTitleField = document.getElementById("news-title");
    const newsContentField = document.getElementById("news-content");
    const newsImageUrlField = document.getElementById("news-image-url");
    const imageUploadInput = document.getElementById("image-upload-input");
    const uploadImageBtn = document.getElementById("upload-image-btn");
    const newsImagePreview = document.getElementById("news-image-preview");
    const imageUploadStatus = document.getElementById("image-upload-status");
    const newsFormErrorMessage = document.getElementById(
      "news-form-error-message"
    );

    const deleteConfirmModal = document.getElementById("delete-confirm-modal");
    const closeDeleteConfirmModalBtn = document.getElementById(
      "close-delete-confirm-modal"
    );
    const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
    const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
    const deleteErrorMessage = document.getElementById("delete-error-message");
    let newsIdToDelete = null;
    let currentPage = 1;
    const itemsPerPage = 8;

    const newsDetailModal = document.getElementById("news-detail-modal");
    const closeNewsDetailModalBtn = document.getElementById(
      "close-news-detail-modal"
    );
    const detailNewsTitle = document.getElementById("detail-news-title");
    const detailNewsImage = document.getElementById("detail-news-image");
    const detailNewsContent = document.getElementById("detail-news-content");
    const detailNewsCreatedAt = document.getElementById(
      "detail-news-createdAt"
    );
    const detailNewsUpdatedAt = document.getElementById(
      "detail-news-updatedAt"
    );

    const openModal = (modalElement) => {
      modalElement.style.display = "block";
      document.body.classList.add("modal-open");
    };

    const closeModal = (modalElement) => {
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");
    };

    const fetchNewsById = async (newsId) => {
      const adminToken = localStorage.getItem("adminToken");
      try {
        const response = await fetch(`http://localhost:9000/news/${newsId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error(
              "Unauthorized: Redirecting to login when fetching news by ID."
            );
            localStorage.removeItem("adminToken");
            window.location.hash = "/admin";
            return null;
          }
          throw new Error(`Failed to fetch news item: ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData.data.item;
      } catch (error) {
        console.error(
          "Error fetching single news item for edit/detail:",
          error
        );
        alert("Failed to load news item due to network or server error.");
        return null;
      }
    };

    const openEditNewsModal = async (newsId) => {
      modalFormTitle.textContent = "Edit News";
      newsManagementForm.reset();
      newsIdField.value = newsId;
      newsImagePreview.src = "";
      newsImagePreview.style.display = "none";
      imageUploadStatus.textContent = "Loading news data...";
      imageUploadStatus.style.color = "#007bff";
      newsFormErrorMessage.textContent = "";

      const newsItem = await fetchNewsById(newsId);
      if (newsItem) {
        newsTitleField.value = newsItem.title;
        newsContentField.value = newsItem.content;
        newsImageUrlField.value = newsItem.imageUrl;
        if (newsItem.imageUrl) {
          newsImagePreview.src = newsItem.imageUrl;
          newsImagePreview.style.display = "block";
        }
        imageUploadStatus.textContent = "";
        openModal(newsFormModal);
      } else {
        imageUploadStatus.textContent = "Failed to load news for editing.";
        imageUploadStatus.style.color = "#dc3545";
      }
    };

    const openNewsDetailModal = async (newsId) => {
      detailNewsTitle.textContent = "Loading...";
      detailNewsImage.src = "";
      detailNewsImage.style.display = "none";
      detailNewsContent.textContent = "Loading...";
      detailNewsCreatedAt.textContent = "";
      detailNewsUpdatedAt.textContent = "";

      const newsItem = await fetchNewsById(newsId);
      if (newsItem) {
        detailNewsTitle.textContent = newsItem.title;
        if (newsItem.imageUrl) {
          detailNewsImage.src = newsItem.imageUrl;
          detailNewsImage.style.display = "block";
        } else {
          detailNewsImage.style.display = "none";
        }
        detailNewsContent.textContent = newsItem.content;

        const createdAt = new Date(newsItem.createdAt);
        detailNewsCreatedAt.textContent = createdAt.toLocaleDateString(
          "id-ID",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        const updatedAt = newsItem.updatedAt
          ? new Date(newsItem.updatedAt)
          : null;
        if (
          updatedAt &&
          Math.abs(updatedAt.getTime() - createdAt.getTime()) > 1000
        ) {
          detailNewsUpdatedAt.textContent = updatedAt.toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );
        } else {
          detailNewsUpdatedAt.textContent = createdAt.toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );
        }

        openModal(newsDetailModal);
      } else {
        detailNewsTitle.textContent = "Failed to load news detail.";
        detailNewsContent.textContent = "";
      }
    };

    const deleteNewsItem = async () => {
      if (!newsIdToDelete) return;

      deleteErrorMessage.textContent = "";
      const adminToken = localStorage.getItem("adminToken");

      try {
        const response = await fetch(
          `http://localhost:9000/admin/news/${newsIdToDelete}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.ok) {
          alert("News item deleted successfully!");
          closeModal(deleteConfirmModal);
          newsIdToDelete = null;
          await fetchAndRenderNews(currentPage);
        } else {
          const errorData = await response.json();
          deleteErrorMessage.textContent =
            errorData.message || "Failed to delete news.";
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("adminToken");
            window.location.hash = "/admin";
          }
        }
      } catch (error) {
        console.error("Error deleting news:", error);
        deleteErrorMessage.textContent =
          "An error occurred while deleting the news item (network/server error).";
      }
    };

    const fetchAndRenderNews = async (page) => {
      newsTableBody.innerHTML =
        '<tr><td colspan="5" style="text-align: center; color: #888;">Loading news...</td></tr>';
      const adminToken = localStorage.getItem("adminToken");

      try {
        const response = await fetch("http://localhost:9000/news", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error("Unauthorized: Redirecting to login.");
            localStorage.removeItem("adminToken");
            window.location.hash = "/admin";
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const allNews = responseData.data.news || [];

        allNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const totalPages = Math.ceil(allNews.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentNews = allNews.slice(startIndex, endIndex);

        renderNewsTable(currentNews);
        renderPagination(totalPages, page);
      } catch (error) {
        console.error("Error fetching news:", error);
        newsTableBody.innerHTML =
          '<tr><td colspan="5" style="color: red; text-align: center;">Failed to load news. Network or Server Error.</td></tr>';
      }
    };

    const renderNewsTable = (newsItems) => {
      newsTableBody.innerHTML = "";
      if (newsItems.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `
          <td colspan="5" style="text-align: center; color: #888; padding: 20px;">Belum ada berita ditambahkan.</td>
        `;
        newsTableBody.appendChild(noDataRow);
        return;
      }

      newsItems.forEach((news, index) => {
        const createdAt = new Date(news.createdAt);
        const updatedAt = news.updatedAt ? new Date(news.updatedAt) : null;

        let dateDisplay = `Dibuat: ${createdAt.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;
        if (
          updatedAt &&
          Math.abs(updatedAt.getTime() - createdAt.getTime()) > 1000
        ) {
          dateDisplay = `Diperbarui: ${updatedAt.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
          <td><img src="${news.imageUrl}" alt="${
          news.title
        }" class="news-thumbnail"></td>
          <td>${news.title}</td>
          <td>${dateDisplay}</td>
          <td>
            <button class="action-btn view-detail-btn" data-id="${
              news.id
            }"><i class="fa-solid fa-eye"></i> View</button> <button class="action-btn edit-btn" data-id="${
          news.id
        }"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="action-btn delete-btn" data-id="${
              news.id
            }"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </td>
        `;
        newsTableBody.appendChild(row);
      });

      newsTableBody.querySelectorAll(".view-detail-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          const newsId = event.currentTarget.dataset.id;
          await openNewsDetailModal(newsId);
        });
      });

      newsTableBody.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          const newsId = event.currentTarget.dataset.id;
          await openEditNewsModal(newsId);
        });
      });

      newsTableBody.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          newsIdToDelete = event.currentTarget.dataset.id;
          deleteErrorMessage.textContent = "";
          openModal(deleteConfirmModal);
        });
      });
    };

    const renderPagination = (totalPages, page) => {
      paginationControls.innerHTML = "";
      if (totalPages <= 1) return;

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-btn");
        if (i === page) {
          button.classList.add("active");
        }
        button.addEventListener("click", () => {
          currentPage = i;
          fetchAndRenderNews(currentPage);
        });
        paginationControls.appendChild(button);
      }
    };

    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("adminToken");
      window.location.hash = "/admin";
    });
    closeNewsFormModalBtn.addEventListener("click", () =>
      closeModal(newsFormModal)
    );
    closeDeleteConfirmModalBtn.addEventListener("click", () =>
      closeModal(deleteConfirmModal)
    );
    cancelDeleteBtn.addEventListener("click", () =>
      closeModal(deleteConfirmModal)
    );

    closeNewsDetailModalBtn.addEventListener("click", () =>
      closeModal(newsDetailModal)
    );

    window.addEventListener("click", (event) => {
      if (event.target === newsFormModal) {
        closeModal(newsFormModal);
      }
      if (event.target === deleteConfirmModal) {
        closeModal(deleteConfirmModal);
      }
      if (event.target === newsDetailModal) {
        closeModal(newsDetailModal);
      }
    });

    addNewsButton.addEventListener("click", () => {
      modalFormTitle.textContent = "Add New News";
      newsManagementForm.reset();
      newsIdField.value = "";
      newsImagePreview.src = "";
      newsImagePreview.style.display = "none";
      newsImageUrlField.value = "";
      imageUploadStatus.textContent = "";
      newsFormErrorMessage.textContent = "";
      openModal(newsFormModal);
    });

    uploadImageBtn.addEventListener("click", () => {
      imageUploadInput.click();
    });

    imageUploadInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) {
        newsImagePreview.src = "";
        newsImagePreview.style.display = "none";
        newsImageUrlField.value = "";
        imageUploadStatus.textContent = "";
        return;
      }

      imageUploadStatus.textContent = "Uploading image...";
      imageUploadStatus.style.color = "#007bff";
      newsFormErrorMessage.textContent = "";

      const formData = new FormData();
      formData.append("image", file);

      try {
        const adminToken = localStorage.getItem("adminToken");
        const response = await fetch(
          "http://localhost:9000/admin/upload/image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
            body: formData,
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          newsImageUrlField.value = responseData.data.imageUrl;
          newsImagePreview.src = responseData.data.imageUrl;
          newsImagePreview.style.display = "block";
          imageUploadStatus.textContent = "Upload successful!";
          imageUploadStatus.style.color = "#28a745";
        } else {
          imageUploadStatus.textContent = "Upload failed!";
          imageUploadStatus.style.color = "#dc3545";
          newsFormErrorMessage.textContent =
            responseData.message || "Image upload failed.";
          newsImagePreview.style.display = "none";
        }
      } catch (error) {
        console.error("Image upload error:", error);
        imageUploadStatus.textContent = "Upload error (network)!";
        imageUploadStatus.style.color = "#dc3545";
        newsFormErrorMessage.textContent = "Network error during image upload.";
        newsImagePreview.style.display = "none";
      }
    });

    newsManagementForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      newsFormErrorMessage.textContent = "";

      const id = newsIdField.value;
      const title = newsTitleField.value;
      const imageUrl = newsImageUrlField.value;
      const content = newsContentField.value;

      if (!title || !content || !imageUrl) {
        newsFormErrorMessage.textContent =
          "Title, Content, and Image are required.";
        return;
      }

      const adminToken = localStorage.getItem("adminToken");
      let method = "POST";
      let url = "http://localhost:9000/admin/news";

      if (id) {
        method = "PUT";
        url = `http://localhost:9000/admin/news/${id}`;
      }

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ title, imageUrl, content }),
        });

        const responseData = await response.json();

        if (response.ok) {
          alert(`News ${id ? "updated" : "added"} successfully!`);
          closeModal(newsFormModal);
          await fetchAndRenderNews(currentPage);
        } else {
          newsFormErrorMessage.textContent =
            responseData.message || `Failed to ${id ? "update" : "add"} news.`;
        }
      } catch (error) {
        console.error("News submission error:", error);
        newsFormErrorMessage.textContent =
          "Network error during news submission.";
      }
    });

    confirmDeleteBtn.addEventListener("click", deleteNewsItem);

    await fetchAndRenderNews(currentPage);
  }
}
