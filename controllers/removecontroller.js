const db = require("../db/queries");

const asyncHandler = require("express-async-handler");

const removeAuthor = asyncHandler(async (req, res) => {
    const authorId = req.params.authorId;

    const result = db.removeAuthor(authorId);
    return res.redirect("/authors");
})

const removeBook = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    
    const result = db.removeBook(bookId);
    return res.redirect("/");
});

module.exports = { removeAuthor, removeBook };