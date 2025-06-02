const { nanoid } = require('nanoid');
const news = require('../data/news');

const addNewsHandler = (request, h) => {
  const { title, content } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newItem = { id, title, content, createdAt, updatedAt };
  news.push(newItem);

  return h.response({
    status: 'success',
    message: 'Berita berhasil ditambahkan',
    data: { id },
  }).code(201);
};

const getAllNewsHandler = () => ({
  status: 'success',
  data: { news },
});

const getNewsByIdHandler = (request, h) => {
  const { id } = request.params;
  const item = news.find((n) => n.id === id);

  if (item) {
    return { status: 'success', data: { item } };
  }

  return h.response({
    status: 'fail',
    message: 'Berita tidak ditemukan',
  }).code(404);
};

const editNewsByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, content } = request.payload;

  const index = news.findIndex((n) => n.id === id);

  if (index !== -1) {
    news[index] = {
      ...news[index],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    return h.response({
      status: 'success',
      message: 'Berita berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui berita. ID tidak ditemukan',
  }).code(404);
};

const deleteNewsByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = news.findIndex((n) => n.id === id);

  if (index !== -1) {
    news.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Berita berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'ID berita tidak ditemukan',
  }).code(404);
};

module.exports = {
  addNewsHandler,
  getAllNewsHandler,
  getNewsByIdHandler,
  editNewsByIdHandler,
  deleteNewsByIdHandler,
};
