
// based on:
// http://ahoj.io/nodejs-and-websocket-simple-chat-tutorial

var WebSocketServer = require('websocket').server;
var http = require('http');

const PORT = 8081;

var clients = [];

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(PORT, function() {
    console.log((new Date()) + " Server is listening on port " + PORT);
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

var tasks = [
    {"description":"Task description","_id":"1","username":"tim","title":"Report an issue"},
    {"description":"Task description 2","_id":"2","username":"tim","title":"Code the software"}
]

// WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;
    console.log("client has index " + index);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        console.log("connection.on('message');");
        if (message.type === 'utf8') {
            // process WebSocket message
            console.log("onMessage: " + JSON.stringify(message));
            // TODO frontcontroller: check action/request-type and forward to handler

            // broadcast message to all connected clients
            var response = JSON.stringify({"actionResult": tasks});
            for (var i = 0; i < clients.length; i++) {
                console.dir(response);
                clients[i].sendUTF(response);
            }
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
        clients.splice(index, 1);
    });
});

/*
taskService.findTasks(req.params.username).then(function(tasks) {
    var result = {"actionResult": tasks};
    console.dir(result);
    res.end(JSON.stringify(result));
}, function(error) {
    console.log(error);
});
*/