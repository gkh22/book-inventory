const insertRouter = require("express").Router();
const insertController = require("../controllers/insertcontroller");

insertRouter.get("/", insertController.getInsertPage);
insertRouter.post("/", insertController.insert);

module.exports = insertRouter;