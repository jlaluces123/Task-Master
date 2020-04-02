const express = require('express');
const User = require('../../models/user');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            return res.json(users);
        })
        .catch(err => console.log(err));
});

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

module.exports = router;
