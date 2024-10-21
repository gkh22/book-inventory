const { pool } = require("./pool");

async function queryAllBooks() {
    const books = await pool.query("SELECT * FROM books");
    return books.rows;
}

async function queryAllAuthors() {
    const authors = await pool.query("SELECT * FROM authors");
    return authors.rows;
}

async function queryBook(id) {
    const book = await pool.query(`SELECT * FROM books WHERE book_id = ${id}`);
    
    return book.rows[0];
}

async function queryAuthor(id) {
    const author = await pool.query(`SELECT * FROM authors WHERE author_id = ${id}`);

    return author.rows[0];
}

async function insertBook(id, title, author_id, image_url, description) {
    await pool.query("INSERT INTO books (id, title, author_id, img_url, description) VALUES ($1, $2, $3, $4, $5)", [id, title, author_id, image_url, description]        
    );
}

async function removeBook(id) {
    await pool.query(`DELETE FROM books WHERE book_id = ${id}`);
}

module.exports = {
    queryAllBooks,
    queryAllAuthors,
    queryBook,
    insertBook,
    removeBook
};