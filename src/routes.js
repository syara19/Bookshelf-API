const {
  addBookHandler,
  displayAllBookHandler,
  editBookHandler,
  deleteBookHandler,
  getDetailBookHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: displayAllBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getDetailBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
