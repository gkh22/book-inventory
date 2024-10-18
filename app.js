require("dotenv").config();

const express = require("express");
const app = express();

const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const booksRouter = require("./routes/books.js");

app.use(express.static(assetsPath));
app.use(express.urlencoded( { extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", booksRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`${process.env.PORT}`);
}); 