const express = require('express');
const List = require('../../models/list');
const Todo = require('../../models/todo');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res) => {
    List.find()
        .then((lists) => {
            res.json(lists);
        })
        .catch((err) => console.log(err));
});

// Get a user's lists
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;

    List.find({ owner: userId })
        .exec()
        .then((response) => {
            console.log(response);
            res.json({
                message: `These are User ${userId}'s lists`,
                todoLists: response,
            });
        })
        .catch((err) => console.log(err));
});

router.get('/:listId', async (req, res) => {
    const listId = req.params.listId;

    const tasksInList = await List.findById(listId).populate('listOfTodos');
    if (tasksInList) res.json(tasksInList);

    res.send('There are no todos in the list');
});

// Create a new list!
router.post('/:userId', (req, res) => {
    const userId = req.params.userId;

    const list = new List({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        owner: userId,
        listOfTodos: [],
    });

    list.save()
        .then((response) => {
            console.log(response);
            res.json({
                message: 'List was created',
                response,
            });
        })
        .catch((err) => console.log(err));
});

// Edit name of TodoList || add a Todo
router.patch('/:userId/:listId', (req, res) => {
    const listId = req.params.listId;

    if (req.body.name) {
        List.update(
            { _id: listId },
            {
                $set: {
                    name: req.body.name,
                },
            }
        )
            .exec()
            .then((response) => {
                console.log(response);
                res.json({
                    message: 'List name has been updated.',
                    editedList: response,
                });
            })
            .catch((err) => console.log(err));
    } else if (req.body.listOfTodos) {
        List.update(
            { _id: listId },
            {
                $set: {
                    listOfTodos: [...listOfTodos, req.body.listOfTodos],
                },
            }
        )
            .exec()
            .then((secondResponse) => {
                res.json({
                    message: 'Todo has been added to the list.',
                    savedTodo: secondResponse,
                });
            })
            .catch((err) => console.log(err));
    }
});

router.delete('/:listId', (req, res) => {
    const listId = req.params.listId;

    List.remove({ _id: listId })
        .exec()
        .then((response) => {
            console.log(response);
            res.json({
                message: 'List has been successfully removed.',
                response,
            });
        })
        .catch((err) => console.log(err));
});

module.exports = router;
