require("dotenv").config();

const { client } = require("./pool.js");

const SQL = `
-- Drop tables if they exist
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;

-- Create authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    bio TEXT
);

-- Create books table
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    author_id INTEGER NOT NULL,
    image_url VARCHAR (255) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

INSERT INTO authors (author_id, name, bio) VALUES
    (1, 'Han Kang', 'Nobel prize winner.')
ON CONFLICT (author_id) DO NOTHING;

INSERT INTO books (book_id, title, author_id, image_url, stock_quantity) VALUES
    (1, 'The Vegetarian', 1, 'https://images.freeimages.com/variants/WQRKu3qc1ypRXfwwxkPdffh4/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&h=350',
    5)
ON CONFLICT (book_id) DO NOTHING;

`

async function populateDb() {
    console.log("Seeding..");
    try {
        await client.connect();
        await client.query(SQL);
        console.log("Success seeding.");
    } catch (err) {
        console.log(err);
        console.log("Error seeding.");
    } finally {
        await client.end()
    }
}

populateDb()
