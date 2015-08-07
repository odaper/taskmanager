var express = require("express");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');
var taskService = require("./TaskService");
//var q = require("q");

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

    taskService.findTasks(req.params.username).then(function(tasks) {
        var result = {"actionResult": tasks};
        console.dir(result);
        res.end(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });
});

server.post("/api/tasks/:username/", jsonParser, function(req, res) {
    var task = new Task(req.body);
    taskService.addTask(req.params.username, task).then(function(pTask) {
        var result = {"actionResult":{"_id": pTask._id}};
        res.end(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });
});

// One Task for one User

server.put("/api/tasks/:username/:id/", jsonParser, function(req, res) {
    var task = new Task(req.body);
    task._id = req.params.id;
    taskService.updateTask(req.params.username, task).then(function(pTask) {
        var result = {"actionResult":{"_id": pTask._id}};
        res.end(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });
});

server.delete("/api/tasks/:username/:id/", jsonParser, function(req, res) {
    console.log(req.body);
    taskService.deleteTask(req.params.username, task).then(function(pTask) {
        var result = {"actionResult":{"_id": req.params._id}};
        res.end(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });
});

// All Logitems for all Users

server.post("/api/log/", jsonParser, function(req, res) {
    console.log(req.body);
    res.end();
});

var port = 8080;

server.listen(port);
console.log("Listening on port " + port);
