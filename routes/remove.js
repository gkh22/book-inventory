const removeRouter = require("express").Router();
const removeController = require("../controllers/removecontroller");

removeRouter.post("/books/:bookId", removeController.removeBook);
removeRouter.post("/authors/:authorId", removeController.removeAuthor);

module.exports = removeRouter;