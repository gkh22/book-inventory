require("dotenv").config();

const express = require("express");
const app = express();
const pool = require("./db/pool");
const { getAllBooks, insertBook } = require("./db/queries");

app.get("/", async (req, res) => {
    try {
        const books = await getAllBooks();
        res.json(books);
    } catch (err) {
        console.log(err);
        res.status(500).send("Servor error");
    }
});

app.post("/books", async (req, res) => {
    const { book_id, title, quantity } = req.body;
    try {
        const newBook = await insertBook(book_id, title, quantity);
        res.status(201).json(newBook.book);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`${process.env.PORT}`);
});