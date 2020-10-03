const TodoController = require("../../controller/todo.controller");
const TodoModel = require("../../model/todo.model");

// overrides the model function and simply calls it
TodoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
    it("todo function should exist", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });

    it("should call the TodoModel.create", () => {
        TodoController.createTodo();
        expect(TodoModel.create).toBeCalled()
    })
});