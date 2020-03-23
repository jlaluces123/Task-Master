const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    completed: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);
