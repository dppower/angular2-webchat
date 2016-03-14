"use strict"
import {Observable, Subject} from "rxjs/Rx";
import * as express from "express";

interface UserList { username: string; socketid: string; };
interface UserAction { username: string; action: string; };
interface ChatMessage { username: string; message: string; };

export class Chatroom {

    chatns: SocketIO.Namespace;
    session: express.RequestHandler;
    passport: any;

    userActionStream: Subject<UserAction>;

    userList: UserList[] = [];
     
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

        let socketid: string = socket.id;
        const username: string = socket.request.username;
        let user: UserList = { username, socketid };

        let userListStream = Observable.fromArray<UserAction>(this.userList.map(userlist => {
            return { action: "add", username: userlist.username };
        }));

        userListStream.subscribe(
            user => { socket.emit("user-list", user); },
            err => { console.log(err); },
            () => { socket.emit("list-completed"); }
        );

        this.userList.push(user);
        this.userActionStream.next({ username: username, action: "add" });

        socket.on("disconnect", () => {
            console.log("A user has disconnected");
            this.userList.filter(user => user.username != username);
            this.userActionStream.next({ username: username, action: "remove" });
        });

        socket.on("chat", (chat) => {
            let chatmessage: ChatMessage = { username, message: chat};
            socket.emit("chat", chatmessage);
            socket.broadcast.emit("chat", chatmessage);
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
        this.userActionStream = new Subject();
        this.userActionStream.subscribe(this.onNextUserAction);
    };
};