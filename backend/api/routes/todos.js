const express = require('express');
const Todo = require('../../models/todo');
const router = express.Router();

router.get('/', (req, res) => {
    Todo.find()
        .then(todos => {
            return res.json(todos);
        })
        .catch(err => console.log(err));
});

router.get('/:todoId', (req, res) => {
    const todoId = req.params.todoId;

    Todo.findById(todoId)
        .exec()
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const todo = new Todo({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        completed: false
    });
    todo.save()
        .then(response => {
            console.log(response);
            res.json({
                message: 'Todo is saved',
                todoMade: todo
            });
        })
        .catch(err => console.log(err));
});

router.patch('/:todoId', (req, res) => {
    const todoId = req.params.todoId;

    Todo.update(
        { _id: todoId },
        {
            $set: {
                name: req.body.name,
                completed: req.body.completed
            }
        }
    )
        .exec()
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(err => console.log(err));
});

router.delete('/:todoId', (req, res) => {
    const todoId = req.params.todoId;
    Todo.remove({ _id: todoId })
        .exec()
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err));
});

module.exports = router;
