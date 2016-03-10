import * as express from "express";
import morgan = require("morgan");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import * as session from "express-session";
import {Observable} from "rxjs/Rx";
import {mongoose, dbConfig} from "./db-config";
import * as passport from "passport";
import {passportConfig} from "./passport-config";
import path = require("path");
import http = require("http");
import * as io from "socket.io";

var app = express();
var server = http.createServer(app);
var wss = io(server);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../node_modules")));

mongoose.connect(dbConfig.url);
passportConfig(passport);

app.use(cookieParser());

app.use(session({ secret: "myBigSecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 3000);

import {routeConfig} from "./routes";
routeConfig(app, passport);


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

        var userList = Observable.fromArray(users);

        userList.subscribe(
            user => { socket.emit("user-list", user); },
            err => { console.log(err); },
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