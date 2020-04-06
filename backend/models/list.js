const mongoose = require('mongoose');

/* 

    Create a List Model

    *Purpose*: Users will have a LIST of todos they can click on.
        *This list holds todos (ex. List = 'Monday Tasks' --> 'Walk the dog', 'Read for 20 minutes')

    - List models hold: 
        1: A reference to the owner of the list
        2: Todos inside a list
        3: The name of the list
        4: Its own unique ID
*/

const listSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    listOfTodos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
});

module.exports = mongoose.model('List', listSchema);
