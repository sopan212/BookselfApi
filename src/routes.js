const {
  saveBooksHandler,
  getAllBooksHandler,
  getDetailIdWithCorrectId,
  editBooksByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  { method: "POST", path: "/books", handler: saveBooksHandler },
  { method: "GET", path: "/books", handler: getAllBooksHandler },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getDetailIdWithCorrectId,
  },

  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBooksByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
