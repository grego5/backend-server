const db = require('mongoose');

const todoSchema = new db.Schema({
    text: {
        type: String,
        required: 'Text cannot be blank!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Todo = db.model('Todo', todoSchema);

module.exports = Todo;