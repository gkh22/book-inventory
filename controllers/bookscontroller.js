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

module.exports = { getAllBooks };