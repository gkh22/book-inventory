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
    const book = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
    
    return book.rows[0]; // Returns the first entry as an object
}

async function queryAuthor(id) {
    const author = await pool.query("SELECT * FROM authors WHERE author_id = $1", [id]);

    return author.rows[0]; // Returns the first entry as an object
}

async function insertBook(title, author_id, img_url, description) {
    const result = await pool.query("INSERT INTO books (title, author_id, img_url, description) VALUES ($1, $2, $3, $4)", [title, author_id, img_url, description]);
}

async function insertAuthor(name, bio, img_url) {
    const result = await pool.query("INSERT INTO authors (name, bio, img_url) VALUES ($1, $2, $3) RETURNING author_id", [name, bio, img_url]);
   
    return (result.rows[0].author_id);
}

async function removeBook(id) {
    await pool.query("DELETE FROM books WHERE book_id = $1", [id]);
}

async function removeAuthor(id) {
    await pool.query("DELETE FROM authors WHERE author_id = $1", [id]);
}
module.exports = {
    queryAllBooks,
    queryAllAuthors,
    queryBook,
    queryAuthor,
    insertBook,
    insertAuthor,
    removeBook,
    removeAuthor
};