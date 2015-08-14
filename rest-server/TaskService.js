var db = require("./database");
var q = require("q");

//var _task = new Task();
//_task.save();

exports.findTasks = function(username) {
    var promise = q.defer();
    db.Task.find({username: username}, function (err, tasks) {
        if (!err) {
            promise.resolve(tasks);
        } else {
            console.log(err);
            promise.reject(err);
        }
    });
    return promise.promise;
}

exports.addTask = function(username, task) {
    console.dir(task);
    var promise = q.defer();
    task._id = Math.floor(Math.random() * 111111);
    task.save(function(err, pTask) {
        if (!err) {
            promise.resolve(pTask);
        } else {
            console.log(err);
            promise.reject(err);
        }
    });
    return promise.promise;
}

exports.updateTask = function(username, task) {
    var promise = q.defer();
    // first load task from db, then overwrite
    db.Task.findOne({_id: task.id, username: username}, function (err, foundTask) {
        foundTask.title = task.title;
        foundTask.description = task.description;
        foundTask.save(function(err) {
            if (!err) {
                promise.resolve(foundTask);
            } else {
                console.log(err);
                promise.reject(err);
            }
        });
    });
    return promise.promise;
}

exports.deleteTask = function(username, task) {
    // TODO first load task from db, then overwrite
    var promise = q.defer();
    db.Task.findOne({_id: task.id, username: username}).exec(function (err, task) {
        if (!err) {
            task.remove();
            promise.resolve(id);
        } else {
            console.log(err);
            promise.reject(err);
        }
    });
    return promise.promise;
}
