require('dotenv').config();
const cors = require('cors');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGO_ACCESS_PW}@todo-app-nwxss.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useMongoClient: true
    }
);

server.use(cors());
server.use(bodyParser.json());

const port = process.env.PORT || 6767;

server.get('/', (req, res) => {
    res.send('Hello World');
});

let todos = ['Clean Room', 'Practice Coding'];

server.get('/todos', (req, res) => {
    return res.json(todos);
});

server.post('/todos', (req, res) => {
    todos.push(req.body.todo);
    return res.json(todos);
});

server.listen(port, () => console.log(`Server running on ${port}`));
