const {
  addNewsHandler,
  getAllNewsHandler,
  getNewsByIdHandler,
  editNewsByIdHandler,
  deleteNewsByIdHandler,
} = require("../handler/handler");

const routes = [
  { method: "GET", path: "/news", handler: getAllNewsHandler },
  { method: "GET", path: "/news/{id}", handler: getNewsByIdHandler },
  { method: "POST", path: "/news", handler: addNewsHandler },
  { method: "PUT", path: "/news/{id}", handler: editNewsByIdHandler },
  { method: "DELETE", path: "/news/{id}", handler: deleteNewsByIdHandler },
];

module.exports = routes;
