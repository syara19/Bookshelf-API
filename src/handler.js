const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid();
  const insertedAt = new Date().toDateString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  books.push(newBook);

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    })
    .code(201);
};

const displayAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let booksFilter = books;

  if (name !== undefined) {
    booksFilter = booksFilter.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (reading !== undefined) {
    booksFilter = booksFilter.filter(
      (book) => book.reading === !!Number(reading)
    );
  }
  if (finished !== undefined) {
    booksFilter = booksFilter.filter(
      (book) => book.finished === !!Number(finished)
    );
  }

  return h
    .response({
      status: "success",
      data: {
        books: booksFilter.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);
};

const getDetailBookHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.find((b) => b.id === bookId);

  if (book !== undefined) {
    return h
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
  }
  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    if (name === undefined) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }
    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }
    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  }
  return h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    })
    .code(404);
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  }
  return h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
};

module.exports = {
  addBookHandler,
  displayAllBookHandler,
  getDetailBookHandler,
  editBookHandler,
  deleteBookHandler,
};
