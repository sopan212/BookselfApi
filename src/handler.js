const books = require("./books");
const { nanoid } = require("nanoid");

const saveBooksHandler = (request, h) => {
  const {
    name,
    years,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;


  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id,
    name,
    publisher,
    years,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };
  books.push(newBook);
  isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
        name:name,
        publisher:publisher,
        
      },
    });
    response.code(201);
    return response;
  }
  if (finished) {
    const response = h.response({
      status: "success",
      message: "Buku telah selesai di baca",
    });
    response.code(201);
    return response;
  }
  if(!name){
    const response = h.response({
      status:"fail",
      message:"Gagal menambahkan buku. Mohon isi nama buku"
    });
    response.code(400);
    return response;
  }
  if(readPage > pageCount){
    const response = h.response({
      status:"fail",
      message:"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    });
    response.code(400);
    return response;
  }
  const resoponse = h.resoponse({
    status:"error",
    message:"Buku gagal ditambahkan"
  });
  resoponse.code(500);
  return resoponse;
};

//getAllBooks

const getAllBooksHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getDetailIdWithCorrectId = (request, h) => {
  const { booksId } = request.params;
  const book = books.filter((b) => b.id === booksId)[0];
  
  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

//Get Books by name
// const getAllBooksWithName = (request, h) =>{
//   const {name = "Dicoding"} = request.params;
// }

const editBooksByIdHandler = (request, h) => {
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
 const { booksId } = request.params;
  const updatedAt = new Date().toISOString();


  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
  }
  if (!booksId) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
 
  const index = books.findIndex((book) => book.id === booksId);
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
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
};

const deleteBookByIdHandler = (request, h) => {
  const { booksId } = request.params;
  const index = books.findIndex((b) => b.id === booksId);

  if (index !== -1) {
    books.splice(index, 1);
      const response = h.response({
        status: "success",
        message: "Buku berhasil di hapus",
      });
      response.code(200);
      return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = {
  saveBooksHandler,
  getAllBooksHandler,
  getDetailIdWithCorrectId,
  editBooksByIdHandler,
  deleteBookByIdHandler,
};
