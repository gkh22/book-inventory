const { pool } = require("./pool");

async function queryAllBooks() {
    const books = await pool.query("SELECT * FROM books");
    return books.rows;
}

async function insertBook(id, title, author_id, image_url, quantity) {
    await pool.query("INSERT INTO books (id, title, author_id, img_url, quantity) VALUES ($1, $2, $3, $4, $5)", [id, title, author_id, image_url, quantity]        
    );
}


module.exports = {
    queryAllBooks,
    insertBook,
};