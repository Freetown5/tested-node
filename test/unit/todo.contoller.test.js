const TodoController = require("../../controller/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const singleTodo = require("../mock-data/single-todo.json");
const allTodos = require("../mock-data/all-todos.json");

// overrides the model function and simply calls it
// TodoModel.create = jest.fn();
// TodoModel.find = jest.fn();
// TodoModel.findById = jest.fn();
// TodoModel.findByIdAndUpdate = jest.fn();
// TodoModel.findByIdAndDelete(todoId);
jest.mock("../../model/todo.model");

let req, res, next;
const todoId = "5f7cc35eedf19612411f3114";

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("TodoController.delete", () => {
    it("should have a delete function", () => {
        expect(typeof TodoController.delete).toBe("function");
    });

    it("should update with TodoModel.findByIdAndDelete", async () => {
        req.params.todoId = todoId;
        await TodoController.delete(req, res, next);
        expect(TodoModel.findByIdAndDelete).toBeCalledWith(todoId);
    });

    it("should return a response with json data and http code 200", async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(singleTodo);
        await TodoController.delete(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(singleTodo);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Issues with connecting to the database" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await TodoController.delete(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it("should return 404 when an item doesn't exist", async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(null);
        await TodoController.delete(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
});

describe("TodoController.updateTodo", () => {
    it("should have an updateTodo function", () => {
        expect(typeof TodoController.updateTodo).toBe("function");
    });

    it("should update with TodoModel.findByIdAndUpdate", async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        await TodoController.updateTodo(req, res, next);
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
            new: true,
            useFindAndModify: false
        });
    });

    it("should return a response with json data and http code 200", async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
        await TodoController.updateTodo(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Issues with connecting to the database" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await TodoController.updateTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it("should return 404 when an item doesn't exist", async () => {
        TodoModel.findByIdAndUpdate.mockReturnValue(null);
        await TodoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
});

describe("TodoController.getTodoById", () => {
    it("should have a get todo by id function", () => {
        expect(typeof TodoController.getTodoById).toBe("function");
    });

    it("should call Todo.Model.findById({})", async () => {
        req.params.todoId = todoId;
        await TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith(todoId);
    });

    it("should return json body and response code 200", async () => {
        TodoModel.findById.mockReturnValue(singleTodo);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(singleTodo);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Issues with connecting to the database" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await TodoController.getTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it("should return 404 when an item doesn't exist", async () => {
        TodoModel.findById.mockReturnValue(null);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe("TodoController.getTodos", () => {
    it("should have a get todos function", () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });

    it("should call TodoModel.find({})", async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });

    it("should return response with status 200 and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Get not working" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe("TodoController.createTodo", () => {

    beforeEach(() => {
        req.body = newTodo; 
    });

    it("should have a create todo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });

    it("should call the TodoModel.create", () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    it("should return a 201 response code", async () => {
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
});