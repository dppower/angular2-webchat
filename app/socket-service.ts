import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Rx";
import {ChatMessage} from "./chat-message";

type userId = { name: string, socket: string };

@Injectable()
export class SocketService {
    get socketId() { return this.socket_.id; };

    chatStream: Observable<ChatMessage>;
    userList: Observable<userId>;
    userDisconnected: Observable<string>;
    listCompleted: Observable<string>;
    newUser: Observable<userId>;

    constructor() {
        this.socket_ = io.connect();
        this.chatStream = Observable.fromEvent(this.socket_, "chat");
        this.userList = Observable.fromEvent(this.socket_, "users-list");
        this.userDisconnected = Observable.fromEvent(this.socket_, "user-disconnected");
        this.listCompleted = Observable.fromEvent(this.socket_, "list-completed");
        this.newUser = Observable.fromEvent(this.socket_, "new-user");
    };
    
    emitMessage(chat: ChatMessage) { this.socket_.emit("chat", chat); };
    emitName(name: string) { this.socket_.emit("login", name) };

    private socket_: SocketIOClient.Socket;
}