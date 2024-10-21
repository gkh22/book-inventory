const authorsRouter = require("express").Router();
const authorsController = require("../controllers/authorscontroller");

authorsRouter.get("/", authorsController.getAllAuthors);
authorsRouter.get("/:authorId", authorsController.getAuthor);

module.exports = authorsRouter;
