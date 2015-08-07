var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/taskmanager');

var taskSchema = mongoose.Schema({
    _id: String,
    description: String,
    username: String,
    title: String
});
exports.Task = mongoose.model('Task', taskSchema);

// TODO store hash for better security
var userSchema = mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    role_id: Number
});
exports.User = mongoose.model('User', userSchema);