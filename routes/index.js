const indexRouter = require("express").Router();
const booksController = require("../controllers/bookscontroller");

indexRouter.get("/", booksController.getAllBooks);

module.exports = indexRouter;