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
})

ws.on('connection', function (socket) {
    console.log('A user has connected');
    socket.on('disconnect', function () {
        console.log('A user has disconnected');
    });
    socket.on('chat', function (msg) {
        console.log(msg);
    });
})