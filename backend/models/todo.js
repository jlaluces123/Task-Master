const mongoose = require('mongoose');

/* 

    Create a Todo Model

    *Purpose*: Inside a List, there are Todos. These todos can be tasks (ex. 'Walk the dog')

    - Todo models hold: 
        1: A reference to the list its in
        2: The name of the Todo
        3: Its own unique ID
        4: Field to show if the task has been completed or not
*/

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    completed: Boolean,
    insideList: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
});

module.exports = mongoose.model('Todo', todoSchema);
