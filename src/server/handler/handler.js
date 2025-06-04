const { nanoid } = require("nanoid");
const Boom = require("@hapi/boom");
const news = require("../data/news");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const activeAdminSessions = new Set();

const authenticateAdmin = (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw Boom.unauthorized(
      "Token otentikasi tidak ditemukan atau tidak valid."
    );
  }

  const token = authHeader.split(" ")[1];

  if (!activeAdminSessions.has(token)) {
    throw Boom.forbidden("Akses ditolak. Anda tidak memiliki izin admin.");
  }
};

const addNewsHandler = (request, h) => {
  authenticateAdmin(request, h);

  const { title, content, imageUrl } = request.payload;

  if (!title || !content || !imageUrl) {
    throw Boom.badRequest(
      "Judul, konten, dan URL gambar berita tidak boleh kosong."
    );
  }

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newItem = { id, title, content, imageUrl, createdAt, updatedAt };
  news.push(newItem);

  return h
    .response({
      status: "success",
      message: "Berita berhasil ditambahkan",
      data: { id },
    })
    .code(201);
};

const getAllNewsHandler = (request, h) => {
  return {
    status: "success",
    data: { news },
  };
};

const getNewsByIdHandler = (request, h) => {
  const { newsId } = request.params;
  const item = news.find((n) => n.id === newsId);

  if (item) {
    return { status: "success", data: { item } };
  }

  throw Boom.notFound("Berita tidak ditemukan.");
};

const editNewsByIdHandler = (request, h) => {
  authenticateAdmin(request, h);

  const { newsId } = request.params;
  const { title, content, imageUrl } = request.payload;

  if (!title || !content || !imageUrl) {
    throw Boom.badRequest(
      "Judul, konten, dan URL gambar berita tidak boleh kosong."
    );
  }

  const index = news.findIndex((n) => n.id === newsId);

  if (index !== -1) {
    news[index] = {
      ...news[index],
      title,
      content,
      imageUrl,
      updatedAt: new Date().toISOString(),
    };

    return h
      .response({
        status: "success",
        message: "Berita berhasil diperbarui",
      })
      .code(200);
  }

  throw Boom.notFound("Gagal memperbarui berita. ID tidak ditemukan.");
};

const deleteNewsByIdHandler = (request, h) => {
  authenticateAdmin(request, h);

  const { newsId } = request.params;
  const index = news.findIndex((n) => n.id === newsId);

  if (index !== -1) {
    news.splice(index, 1);
    return h
      .response({
        status: "success",
        message: "Berita berhasil dihapus",
      })
      .code(200);
  }

  throw Boom.notFound("ID berita tidak ditemukan.");
};

const adminLoginHandler = async (request, h) => {
  const { username, password } = request.payload;

  if (!username || !password) {
    throw Boom.badRequest("Username dan password harus diisi.");
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const sessionToken = nanoid(32);
    activeAdminSessions.add(sessionToken);

    return h
      .response({
        status: "success",
        message: "Login berhasil",
        data: {
          token: sessionToken,
        },
      })
      .code(200);
  }

  throw Boom.unauthorized("Username atau password salah.");
};

module.exports = {
  addNewsHandler,
  getAllNewsHandler,
  getNewsByIdHandler,
  editNewsByIdHandler,
  deleteNewsByIdHandler,
  adminLoginHandler,
};
