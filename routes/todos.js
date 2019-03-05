const router = require('express').Router({mergeParams: true});
const db = require('../models');

const {allTodos, oneTodo, createTodo, updateTodo, deleteTodo} = require('../handlers/todos');

router.route('/')
 .get(allTodos)
 .post(createTodo)
 
router.route('/:todoId')
  .get(oneTodo)
  .put(updateTodo)
  .delete(deleteTodo)
  
module.exports = router;