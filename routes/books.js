const booksRouter = require("express").Router();
const booksController = require("../controllers/bookscontroller");

booksRouter.get("/", booksController.getAllBooks);

module.exports = booksRouter;