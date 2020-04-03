const express = require('express');
const User = require('../../models/user');
const mongoose = require('mongoose');
const router = express.Router();

// Get all Users
router.get('/', (req, res) => {
    User.find()
        .then(users => {
            return res.json(users);
        })
        .catch(err => console.log(err));
});

// Get a specific User
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    User.find({ _id: userId })
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err));
});

// Get a specific User's Todo Lists
router.get('/:userId/lists', (req, res) => {
    return res.json({ message: 'Work in progress' });
});

// Create a new User (login system)
router.post('/', (req, res) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    });

    user.save()
        .then(response => {
            console.log(response);
            res.json({
                message: 'User has been saved successfully',
                userMade: user
            });
        })
        .catch(err => console.log(err));
});

// Edit User details (Update account information)
router.patch('/:userId', (req, res) => {
    const userId = req.params.userId;

    User.findById({ _id: userId })
        .exec()
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            return user.save();
        })
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(err => console.log(err));
});

// Delete your own account
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;

    User.remove({ _id: userId })
        .exec()
        .then(response => res.json(response))
        .catch(err => console.log(err));
});

module.exports = router;
