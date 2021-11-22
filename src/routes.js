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
    path: "/books/{booksId}",
    handler: getDetailIdWithCorrectId,
  },

  {
    method: "PUT",
    path: "/books/{booksId}",
    handler: editBooksByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{booksId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
