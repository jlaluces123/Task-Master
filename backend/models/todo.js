const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    completed: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);
