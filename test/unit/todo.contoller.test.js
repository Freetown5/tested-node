const TodoController = require("../../controller/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

// overrides the model function and simply calls it
TodoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
    it("todo function should exist", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });

    it("should call the TodoModel.create", () => {
        let req, res, next;
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = null;
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });
});