"use strict"
import {Observable, Subject} from "rxjs/Rx";
import * as express from "express";

interface UserSocket { username: string; socketids: string[]; };
interface UserAction { username: string; action: string; };
interface ChatMessage { username: string; message: string; direction: string};

export class Chatroom {

    chatns: SocketIO.Namespace;
    session: express.RequestHandler;
    passport: any;

    userActionStream: Subject<UserAction> = new Subject();;

    userList: UserSocket[] = [];
     
    getUser = (userId: string) => {
        return new Promise((resolve, reject) => {
            this.passport.deserializeUser(userId, (err, user) => {
                resolve(user);
                reject(err);
            });
        });
    };

    onConnection = (socket: SocketIO.Socket) => {

        console.log("A user has connected");
        console.log("Session id: " + socket.request.sessionID);

        var socketid: string = socket.id;
        var username: string = socket.request.username;

        let userList$ = Observable.fromArray<UserAction>(this.userList.map(user => {
            return { action: "add", username: user.username };
        }));

        userList$.subscribe(
            user => { socket.emit("user-list", user); },
            err => { console.log(err); },
            () => { socket.emit("list-completed"); }
        );

        var existingUserIndex = this.userList.findIndex((x) => { return x.username == username; });
        if (existingUserIndex > -1) {
            this.userList[existingUserIndex].socketids.push(socketid);
        } else {
            let user: UserSocket = { username, socketids: [socketid] };
            this.userList.push(user);
            this.userActionStream.next({ username: user.username, action: "add" });
        }

        socket.on("disconnect", () => {
            console.log("A user has disconnected");
            var i = this.userList.findIndex(x => x.username == username);
            if (i > -1) {
                var j = this.userList[i].socketids.findIndex(x => x == socketid);
                this.userList[i].socketids.splice(j, 1);
                
                if (this.userList[i].socketids.length == 0) {
                    this.userList.splice(i, 1);
                    this.userActionStream.next({ username: username, action: "remove" });
                }
            }
        });

        socket.on("chat", (chat) => {
            let messageToTarget: ChatMessage = { username, message: chat.message, direction: "From"};
            let messageToSelf: ChatMessage = { username, message: chat.message, direction: "Self"};
            
            socket.emit("chat", messageToSelf);
            socket.broadcast.emit("chat", messageToTarget);
        });

        socket.on("whisper", (chat) => {
            let target = this.userList.find((x) => { return x.username == chat.target; });
            let messageToTarget: ChatMessage = { username: username, message: chat.message, direction: "From"};
            let selfDirection = (chat.target == username) ? "Self" : "To";
            let messageToSelf: ChatMessage = { username: chat.target, message: chat.message, direction: selfDirection};

            var userSockets: string[] = this.userList.filter(user => user.username == username)
                .map(user => user.socketids)
                .reduce((p, n) => p.concat(n), [])
                .filter(id => id != socketid);
            userSockets.forEach(socketId => socket.to(socketId).emit("whisper", messageToSelf));
            
            socket.emit("whisper", messageToSelf);

            target.socketids.forEach(socketId => {
                socket.to(socketId).emit("whisper", messageToTarget);
            });
        });
    };

    onNextUserAction = (onNext: UserAction) => { this.chatns.emit("user-action", onNext); };

    constructor(socketServer: SocketIO.Server, session: express.RequestHandler, passport: any) {
        this.chatns = socketServer.of("/chatroom");
        this.session = session;
        this.passport = passport;

        this.chatns.use((socket, next) => {
            session(socket.request, socket.request.res, next);
        });
        
        this.chatns.use(async (socket, next) => {
            if (socket.request.session.passport.user) {
                await this.getUser(socket.request.session.passport.user).then((user: any) => {
                    socket.request.username = user.username;
                    next();
                }, err => console.log(err));
            }
            else {
                // Need to handle these errors with socket.on("error") in client.
                next(new Error("User's session was not found."));
            }
        });

        this.chatns.on("connection", this.onConnection);
        this.userActionStream.subscribe(this.onNextUserAction);
    };
};