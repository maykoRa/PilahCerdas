const {
  getAllNewsHandler,
  getNewsByIdHandler,
  addNewsHandler,
  editNewsByIdHandler,
  deleteNewsByIdHandler,
  adminLoginHandler,
} = require("../handler/handler");

const routes = [
  {
    method: "GET",
    path: "/news",
    handler: getAllNewsHandler,
  },
  {
    method: "GET",
    path: "/news/{newsId}",
    handler: getNewsByIdHandler,
  },
  {
    method: "POST",
    path: "/admin/login",
    handler: adminLoginHandler,
  },
  {
    method: "POST",
    path: "/admin/news",
    handler: addNewsHandler,
  },
  {
    method: "PUT",
    path: "/admin/news/{newsId}",
    handler: editNewsByIdHandler,
  },
  {
    method: "DELETE",
    path: "/admin/news/{newsId}",
    handler: deleteNewsByIdHandler,
  },
];

module.exports = routes;
