// src/scripts/utils/image-upload-handler.js
// Tidak lagi membutuhkan import * as tf from '@tensorflow/tfjs';

export const initImageUpload = ({
    fileInputId,
    predictButtonId,
    imagePreviewId,
    dropAreaId,
    loadingIndicatorId,
    // Tidak lagi perlu model, akan memanggil API
    onPredictionStart, // Callback baru
    onPredictionComplete,
    onImageLoad,
    uploadCancelBtnId
}) => {
  const fileInput = document.getElementById(fileInputId);
  const predictButton = document.getElementById(predictButtonId);
  const imagePreview = document.getElementById(imagePreviewId);
  const imagePreviewContainer = document.getElementById(imagePreviewId + 'Container');
  const dropArea = document.getElementById(dropAreaId);
  const loadingIndicator = document.getElementById(loadingIndicatorId);
  const uploadCancelBtn = document.getElementById(uploadCancelBtnId);


  let uploadedFile = null; // Untuk menyimpan objek File

  // Listener untuk input file
  if (fileInput) {
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadedFile = file; // Simpan objek File
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgSrc = e.target.result;
          if (imagePreview) {
            imagePreview.src = imgSrc;
            imagePreview.style.display = 'block';
          }
          if (imagePreviewContainer) {
            imagePreviewContainer.style.display = 'block';
          }
          onImageLoad(imgSrc); // Kirim base64 imageSrc ke HomePage
          if (predictButton) predictButton.disabled = false;
        };
        reader.readAsDataURL(file);
      } else {
        if (imagePreview) {
          imagePreview.src = '#';
          imagePreview.style.display = 'none';
        }
        if (imagePreviewContainer) {
            imagePreviewContainer.style.display = 'none';
        }
        uploadedFile = null;
        if (predictButton) predictButton.disabled = true;
      }
    });
  }

  // Listener untuk drop area
  if (dropArea) {
    dropArea.addEventListener('click', () => fileInput.click());
    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.classList.add('drag-over');
    });
    dropArea.addEventListener('dragleave', () => {
      dropArea.classList.remove('drag-over');
    });
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) {
        fileInput.files = e.dataTransfer.files;
        const event = new Event('change');
        fileInput.dispatchEvent(event);
      }
    });
  }

  // Listener untuk tombol prediksi
  if (predictButton) {
    predictButton.addEventListener('click', async () => {
      if (uploadedFile) {
        if (onPredictionStart) onPredictionStart(); // Beritahu HomePage prediksi dimulai
        if (predictButton) predictButton.disabled = true;

        try {
            const formData = new FormData();
            formData.append('image', uploadedFile); // Kirim gambar sebagai FormData

            // Ganti URL ini dengan URL API Flask Anda setelah di-deploy
            const FLASK_API_URL = 'https://model-waste-classifier-production.up.railway.app/predict'; 

            const response = await fetch(FLASK_API_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({error: 'Respons tidak valid.'}));
                throw new Error(`Prediksi gagal: ${response.status} ${response.statusText}. Detail: ${errorData.error || 'Tidak ada detail.'}`);
            }

            const result = await response.json();
            onPredictionComplete(result); // Kirim hasil ke HomePage

        } catch (error) {
          console.error('Error saat prediksi API:', error);
          alert(`Gagal mengidentifikasi sampah: ${error.message}. Pastikan server ML berjalan dan CORS sudah dikonfigurasi.`);
          if (onPredictionComplete) onPredictionComplete({class_name: 'Error', confidence: '0.00%'}); // Beri tahu tentang kegagalan
        } finally {
            if (predictButton) predictButton.disabled = false;
        }
      } else {
        alert('Tidak ada gambar yang diunggah.');
      }
    });
  }

  // Listener untuk tombol batal di modal upload
  if (uploadCancelBtn) {
    uploadCancelBtn.addEventListener('click', () => {
        if (fileInput) fileInput.value = '';
        if (imagePreview) {
          imagePreview.src = '#';
          imagePreview.style.display = 'none';
        }
        if (imagePreviewContainer) {
            imagePreviewContainer.style.display = 'none';
        }
        uploadedFile = null;
        if (predictButton) predictButton.disabled = true;
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    });
  }
};