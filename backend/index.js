const express = require('express');
const server = express();
const port = 8887;

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(port, () => console.log(`Server running on ${port}`));
