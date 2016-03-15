import * as express from "express";
import morgan = require("morgan");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import * as expressSession from "express-session";
import {sessionConnection} from "./db-config";
import * as passport from "passport";
import {passportConfig} from "./passport-config";
import path = require("path");
import http = require("http");
import * as io from "socket.io";

var app = express();
var server = http.createServer(app);
var socketio = io(server);

//app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../node_modules")));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoStore = require("connect-mongo")(expressSession);

var eSession: express.RequestHandler = expressSession({
    secret: "myBigSecret",
    cookie: { maxAge: null, httpOnly: false },
    store: new mongoStore({ mongooseConnection: sessionConnection }),
    resave: false,
    saveUninitialized: false
});
app.use(eSession);

passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

import {Chatroom} from "./socket-setup";
new Chatroom(socketio, eSession, passport);

import {routeConfig} from "./routes";
routeConfig(app, passport);

app.set("port", process.env.PORT || 3000);

server.listen(app.get("port"), function () {
    console.log("Server is listening on port " + app.get("port"));
});

