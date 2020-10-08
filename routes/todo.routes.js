const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo.controller");

router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/:todoId", todoController.getTodoById);

module.exports = router;