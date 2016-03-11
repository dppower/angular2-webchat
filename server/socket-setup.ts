import {Observable} from "rxjs/Rx";
import * as express from "express";

export var socketSetup = function (socketServer: SocketIO.Server, session: express.RequestHandler, passport: any) {

    socketServer.use((socket, next) => {
        session(socket.request, socket.request.res, next);
    });

    var getUser = (userId: string) => {
        return new Promise((resolve, reject) => {
            passport.deserializeUser(userId, (err, user) => {
                resolve(user);
                reject(err);
            });
        });
    };

    socketServer.use(async (socket, next) => {
        if (socket.request.session.passport.user)
        {
            await getUser(socket.request.session.passport.user).then((user: any) => {
                socket.request.username = user.username;
                next();
            }, err => console.log(err));
        }
        else
        {
            next();
        }
    });

    socketServer.on("connection", function (socket) {

        console.log("A user has connected");
        console.log("Session id: " + socket.request.sessionID);

        var clientId = socket.id.slice(2);
        var username = socket.request.username;

        //socket.on("login", function (name) {
        //    username = name;
        //    var newUser = { name: username, socket: clientId };
        //    users.push(newUser);

        //    var userList = Observable.fromArray(users);

        //    userList.subscribe(
        //        user => { socket.emit("user-list", user); },
        //        err => { console.log(err); },
        //        () => { socket.emit("list-completed"); }
        //    );

        //    socket.broadcast.emit("new-user", newUser);
        //});

        socket.on("disconnect", function () {
            console.log("A user has disconnected");
            //socket.broadcast.emit("user-disconnected", username);
            //users = users.filter(obj => obj.name != username);
        });

        socket.on("chat", function (chat) {
            var chatmessage = username + ": " + chat;
            socket.emit("chat", chatmessage);
            socket.broadcast.emit("chat", chatmessage);
        });
    })
}
