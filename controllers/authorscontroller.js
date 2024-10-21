const db = require("../db/queries");

const asyncHandler = require("express-async-handler");

const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await db.queryAllAuthors();
    
    if (!authors) {
        throw "Not found";
    }

    res.render("authors", {
        title: "Authors",
        authors: authors
    });
})

const getAuthor = asyncHandler(async (req, res) => {
    const author = await db.queryAuthor(req.params.authorId);
    if (!author) {
        throw "Not found";
    }
    res.render("author", {
        title: author.name,
        author: author
    });
});

module.exports = { getAllAuthors, getAuthor };