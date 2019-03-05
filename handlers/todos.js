var db = require('../models');

exports.allTodos = async function(req, res, next){
   try {
      const todos = await db.Todo.find();
      if (!todos || todos.length === 0) throw {message: 'List is empty', status:200};
      res.json(todos);
   } catch(err) {
      return next(err);
   };
};

exports.oneTodo = async function(req, res, next){
   try {
      const todo = await db.Todo.findById(req.params.todoId)
      if (!todo) throw {message: 'Record is not found'};
      res.json(todo);
   } catch(err) {
      return next(err);
   };
};

exports.createTodo = async function(req, res, next){
   try {
      const newTodo = await db.Todo.create(req.body);
      return res.status(201).json(newTodo);
   } catch(err) {
      return next(err);
   };
};

exports.updateTodo = async function(req, res, next){
   try {
      const todo = await db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true});
      res.json(todo);
   } catch(err){
      console.log(err.message);
      err.message = 'Record is not found';
      return next(err);
   };
};

exports.deleteTodo = async function(req, res, next){
   try {
      const deleted = await db.Todo.findOneAndDelete({_id: req.params.todoId});
      res.json(deleted);
   } catch(err) {
      return next(err);
   };
};

module.exports = exports;