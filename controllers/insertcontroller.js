const db = require("../db/queries");

const asyncHandler = require("express-async-handler");

const getInsertPage = (req, res) => {
    res.render("insert", {
        title: "Insert"
    });
};

const insert = asyncHandler(async (req, res) => {
    const { title, img_url, description, name, bio, author_img_url } = req.body;
    
    const author_id = await db.insertAuthor(name, bio, author_img_url);
    const book_insert = await db.insertBook(title, author_id, img_url, description);
    return res.redirect("/");
});

module.exports = { getInsertPage, insert };