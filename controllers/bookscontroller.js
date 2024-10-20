const db = require("../db/queries");

const asyncHandler = require("express-async-handler");

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await db.queryAllBooks();
    console.log(books[0].img_url);
    
    if (!books) {
        throw "Not found";
    }

    res.render("books", {
        title: "Books",
        books: books,
    });
})

module.exports = { getAllBooks };