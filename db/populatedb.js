require("dotenv").config();

const { client } = require("./pool.js");

const SQL = `
-- Drop tables if they exist
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS book_genres CASCADE;

-- Create authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    bio TEXT
);

-- Create genres table
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Create books table
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    author_id INTEGER NOT NULL,
    img_url VARCHAR (255) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

-- Junction table for books and genres
CREATE TABLE book_genres (
    book_id INT REFERENCES books(book_id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
);

INSERT INTO authors (name, bio) VALUES
    ('Han Kang', 'Nobel prize winner.')
ON CONFLICT (author_id) DO NOTHING;

INSERT INTO books (title, author_id, img_url, stock_quantity) VALUES
    ('The Vegetarian', 1, '/images/TheVegetarian.png', 5),
    ('Human Acts', 1, '/images/HumanActs.jpg', 8),
    ('작별하지 않는다', 1, '/images/FareWell.png', 8),
    ('흰', 1, '/images/hau.jpg', 8),
    ('Greek Lessons', 1, '/images/greek.jpg', 8),
    ('The Wind Is Blowing', 1, '/images/thewind.jpg', 10)
ON CONFLICT (book_id) DO NOTHING;


INSERT INTO genres (name) VALUES
    ('Fiction'), ('Non-fiction'), ('Asian culture'), ('Literary Fiction'),
    ('Fantasy')
ON CONFLICT (genre_id) DO NOTHING;

INSERT INTO book_genres VALUES 
    (1, 3), (1, 4);

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
