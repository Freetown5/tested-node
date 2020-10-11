const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");
const endpointUrl = "/todos/";

let firstTodo, newTodoId;
const nonExistantId = '5f7a6b64c1fb8f7442f446d8';
const testData = { title: "Make integration test for PUT", done: true }

describe(endpointUrl, () => {
    it("GET" + endpointUrl, async () => {
        const response = await request(app)
        .get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy;
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    });

    it("GET by Id" + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(endpointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done); 
    });

    it("GET todo by id doesn't exist" + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(
            endpointUrl + nonExistantId
        );
        expect(response.statusCode).toBe(404);
    })

    it("POST" + endpointUrl, async () => {
        const response = await request(app)
        .post(endpointUrl)
        .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    });

    it("should return error 500 on malformed data with POST" + endpointUrl, async() => {
        const response = await request(app)
            .post(endpointUrl)
            .send({title: "Missing done property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message:
            "Todo validation failed: done: Path `done` is required."
        });
    });

    it("PUT" + endpointUrl, async () => {
        // const testData = { title: "Make integration test for PUT", done: true }
        const res = await (await request(app)
            .put(endpointUrl + newTodoId)
            .send(testData)
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.done).toBe(testData.done);   
    });

    it("should return 404 on PUT" + endpointUrl, async () =>{
        const res = await request(app)
            .put(endpointUrl + nonExistantId)
            .send(testData)
        expect(res.statusCode).toBe(404);
    });
    
    it("HTTP DELETE", async () => {
        const res = await request(app).delete(endpointUrl + newTodoId).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.done).toBe(testData.done);
    });

    it("should return 404 on DELETE" + endpointUrl, async () => {
        const res = await request(app).delete(endpointUrl + nonExistantId).send();
        expect(res.statusCode).toBe(404);
    })
});

// without async/await 
// describe(endpointUrl, () => {
//     it("POST" + endpointUrl, () => {
//         request(app)
//         .post(endpointUrl)
//         .send(newTodo);
//         expect(response.statusCode).toBe(201);
//         expect(response.body.title).toBe(newTodo.title);
//         expect(response.body.done).toBe(newTodo.done);
//     })
// })