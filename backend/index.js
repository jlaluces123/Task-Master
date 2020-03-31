require('dotenv').config();
const cors = require('cors');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

server.use(cors());
server.use(bodyParser.json());
const port = process.env.PORT || 6767;

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGO_ACCESS_PW}@todo-app-nwxss.mongodb.net/test?retryWrites=true&w=majority`
);

const { todosRouter } = require('./api/routes/routes');

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(port, () => console.log(`Server running on ${port}`));
