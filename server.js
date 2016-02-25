var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var ws = require('socket.io')(server);

var routes = require('./routes');
app.use(routes);
app.use(express.static(path.join(__dirname, '/')));

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function () {
    console.log('Server is listening on port ' + app.get('port'));
});

var clients = [];

ws.on('connection', function (socket) {
    console.log('A user has connected');
    var clientId = socket.id.slice(2);
    var username = "";
    socket.on("login", function (name) {
        username = name;
        var newUser = { name: username, socket: clientId };
        clients.push(newUser);
        socket.emit("new-user", clients);
        socket.broadcast.emit("new-user", clients);
    });

    socket.on('disconnect', function () {
        console.log('A user has disconnected');
        socket.emit("user-disconnected", username);
        socket.broadcast.emit("user-disconnected", username);
    });
    socket.on('chat', function (chat) {
        console.log("user_id: " + chat.clientId + ", message: " + chat.message);
        socket.emit('chat', chat);
        socket.broadcast.emit('chat', chat);
    });
})