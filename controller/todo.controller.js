const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
    try{
        const createModel = await TodoModel.create(req.body);
        res.status(201).json(createModel);
    }catch (err){
        next(err);
    }
};

exports.getTodos = (req, res, next) => {
    console.log("This exists");
}