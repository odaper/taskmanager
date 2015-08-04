var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');

var server = express();

server.all('/*', function(req, res, next) {
    setHeaders(res);
    next();
});

function setHeaders(res) {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Allow", "HEAD,GET,POST,PUT,DELETE,OPTIONS");
    return res;
};

mongoose.connect('mongodb://localhost/taskmanager');

var taskSchema = mongoose.Schema({
    _id: String,
    description: String,
    username: String,
    title: String
});
var Task = mongoose.model('Task', taskSchema);

// TODO store hash for better security
var userSchema = mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    role_id: Number
});
var User = mongoose.model('User', userSchema);

/*
var tasks = [
    {"description":"Task description","_id":"1","username":"tim","title":"Report an issue"},
    {"description":"Task description 2","_id":"2","username":"tim","title":"Code the software"}
]
*/

// All Tokens

server.post("/api/token/", jsonParser, function(req, res) {
    var username = req.body.username;
    // TODO check users in mongo
    var token = jwt.sign({"username": username}, 'secret', {"expiresInMinutes": 60});
    res.setHeader("Content-Type", "text/plain");
    console.log(token);
    res.json(token);
});

// All Tasks for one User

server.get("/api/tasks/:username/", function(req, res) {
    console.log("looking at data for: " + req.params.username);
    Task.find({"username": req.params.username}, function (err, tasks) {
        if (err) {
            console.log(err);
        }
        var tasksResult = {"actionResult": tasks};
        res.json(tasksResult);
        res.end();
    });
});

server.post("/api/tasks/:username/", function(req, res) {
    var task = new Task(req.body);
    task._id = Math.floor(Math.random() * 111111);
    return task.save(function(err) {
        if (!err) {
            console.log("updated " + task._id + " into MongoDB");
        } else {
            console.log(err);
        }
        var obj = {"actionResult":{"_id": "nodejs" + nextId}};
        // TODO FIX cors headers
        res.header("Content-Type", "application/json");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
        res.header("Allow", "HEAD,GET,POST,PUT,DELETE,OPTIONS");
        return res.send(obj);
    });
});

// One Task for one User

server.put("/api/tasks/:username/:id/", jsonParser, function(req, res) {
    console.log(req.body);
    res.end();
});

server.delete("/api/tasks/:username/:id/", jsonParser, function(req, res) {
    console.log(req.body);
    res.end();
});

// All Logitems for all Users

server.post("/api/log/", jsonParser, function(req, res) {
    console.log(req.body);
    res.end();
});

var port = 8080;

server.listen(port);
console.log("Listening on port " + port);
