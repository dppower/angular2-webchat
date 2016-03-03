import * as express from "express";
import morgan = require("morgan");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import rx = require("rxjs/Rx");
import path = require("path");
import http = require("http");
import * as io from "socket.io";

var app = express();
var server = http.createServer(app);
var wss = io(server);

import {Router} from "./routes";

app.use(Router);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../node_modules")));
app.use(express.static(path.join(__dirname, "/")));

app.set("port", process.env.PORT || 3000);

server.listen(app.get("port"), function () {
    console.log("Server is listening on port " + app.get("port"));
});

var users = [];

wss.on("connection", function (socket) {
    console.log("A user has connected");
    var clientId = socket.id.slice(2);
    var username = "";

    socket.on("login", function (name) {
        username = name;
        var newUser = { name: username, socket: clientId };
        users.push(newUser);

        var userList = rx.Observable.fromArray(users);

        userList.subscribe(
            user => { socket.emit("user-list", user); },
            error => { console.log(error); },
            () => { socket.emit("list-completed"); }
        );

        socket.broadcast.emit("new-user", newUser);
    });

    socket.on("disconnect", function () {
        console.log("A user has disconnected");
        socket.broadcast.emit("user-disconnected", username);
        users = users.filter(obj => obj.name != username);
    });

    socket.on("chat", function (chat) {
        chat.clientId = username;
        socket.emit("chat", chat);
        socket.broadcast.emit("chat", chat);
    });
})