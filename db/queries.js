const pool = require("./pool");

async function getAllBooks() {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows;
}

async function insertBook(book_id, title, quantity) {
    await pool.query("INSERT INTO books (book_id, title, quantity) VALUES ($1, $2, $3)", [book_id, title, quantity]        
    );
}

module.exports = {
    getAllBooks,
    insertBook,
};