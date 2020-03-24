require('dotenv').config();
const cors = require('cors');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

server.use(cors());
server.use(bodyParser.json());

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGO_ACCESS_PW}@todo-app-nwxss.mongodb.net/test?retryWrites=true&w=majority`
);

const port = process.env.PORT || 6767;

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/todos', (req, res) => {
    Todo.find()
        .then(todos => {
            return res.json(todos);
        })
        .catch(err => console.log(err));
});

server.post('/todos', (req, res) => {
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

server.delete('/todos/:todoId', (req, res) => {
    let todoId = req.params.todoId;
    Todo.remove({ _id: todoId })
        .exec()
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err));
});

server.listen(port, () => console.log(`Server running on ${port}`));
