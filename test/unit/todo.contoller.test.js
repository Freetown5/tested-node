const TodoController = require("../../controllers/todo.controller");

describe("TodoController.createTodo", () => {
    it("todo function should exist", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
});