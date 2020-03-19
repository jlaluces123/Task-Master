require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT || 6767;

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(port, () => console.log(`Server running on ${port}`));
