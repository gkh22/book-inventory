const booksRouter = require("express").Router();
const booksController = require("../controllers/bookscontroller");

booksRouter.get("/:bookId", booksController.getBook);

module.exports = booksRouter;