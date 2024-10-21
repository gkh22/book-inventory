const db = require("../db/queries");

const asyncHandler = require("express-async-handler");

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await db.queryAllBooks();
    
    if (!books) {
        throw "Not found";
    }

    res.render("books", {
        title: "Books",
        books: books,
    });
})

const getBook = asyncHandler(async (req, res) => {
    const book = await db.queryBook(req.params.bookId);
    if (!book) {
        throw "Not found";
    }
    res.render("book", {
        title: book.title,
        book: book,
    });
});

module.exports = { getAllBooks, getBook };