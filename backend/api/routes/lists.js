const express = require('express');
const List = require('../../models/list');
const mongoose = require('mongoose');
const router = express.Router();

// Get a user's lists
router.get('/:userId', (req, res) => {
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

// Edit name of TodoList
router.patch('/:userId/:listId', (req, res) => {
    const listId = req.params.listId;

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
        });
});

module.exports = router;
