import * as express from "express";
import path = require("path");
import http = require("http");
import * as io from "socket.io";

var app = express();
var server = http.createServer(app);
var wss = io(server);

import {Router} from "./routes";

app.use(Router);
app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../node_modules")));
app.use(express.static(path.join(__dirname, "/")));

app.set("port", process.env.PORT || 3000);

server.listen(app.get("port"), function () {
    console.log("Server is listening on port " + app.get("port"));
});

var clients = [];

wss.on("connection", function (socket) {
    console.log("A user has connected");
    var clientId = socket.id.slice(2);
    var username = "";

    socket.on("login", function (name) {
        username = name;
        var newUser = { name: username, socket: clientId };
        clients.push(newUser);
        socket.emit("new-user", clients);
        socket.broadcast.emit("new-user", clients);
    });

    socket.on("disconnect", function () {
        console.log("A user has disconnected");
        socket.emit("user-disconnected", username);
        socket.broadcast.emit("user-disconnected", username);
        clients = clients.filter(obj => obj.name != username);
    });

    socket.on("chat", function (chat) {
        console.log("user_id: " + chat.clientId + ", message: " + chat.message);
        socket.emit("chat", chat);
        socket.broadcast.emit("chat", chat);
    });
})