const express = require('express');
const Todo = require('../../models/todo');
const List = require('../../models/list');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res) => {
    Todo.find()
        .then((todos) => {
            return res.json(todos);
        })
        .catch((err) => console.log(err));
});

router.get('/:todoId', (req, res) => {
    const todoId = req.params.todoId;

    Todo.findById(todoId)
        .exec()
        .then((response) => {
            res.json(response);
        })
        .catch((err) => console.log(err));
});

router.post('/:listId', async (req, res) => {
    const listId = req.params.listId;

    const todo = new Todo({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        completed: false,
        insideList: listId,
    });

    await todo.save();
    const listById = await List.findById(listId);

    listById.listOfTodos.push(todo);
    await listById.save();

    return res.send(listById);
});

router.patch('/:todoId', (req, res) => {
    const todoId = req.params.todoId;

    Todo.update(
        { _id: todoId },
        {
            $set: {
                name: req.body.name,
                completed: req.body.completed,
            },
        }
    )
        .exec()
        .then((response) => {
            console.log(response);
            res.json(response);
        })
        .catch((err) => console.log(err));
});

router.delete('/:todoId', (req, res) => {
    const todoId = req.params.todoId;
    Todo.remove({ _id: todoId })
        .exec()
        .then((response) => {
            res.json(response);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
