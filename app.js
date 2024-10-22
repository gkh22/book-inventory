require("dotenv").config();

const express = require("express");
const app = express();

const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/index.js");
const booksRouter = require("./routes/books.js");
const authorsRouter = require("./routes/authors.js");
const insertRouter = require("./routes/insert.js");

app.use(express.static(assetsPath));
app.use(express.urlencoded( { extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/insert", insertRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error");
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`${process.env.PORT}`);
}); 