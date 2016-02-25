import {Injectable} from "angular2/core";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {ChatMessage} from "./chat-message";

@Injectable()
export class SocketService {
    get socketId() { return this.socket_.id; }

    chatStream: Observable<ChatMessage>;
    previousNames: Observable<string[]>;
    userDisconnected: Observable<string>;
    newUser: Observable<{ name: string, socket: string }[]>;

    constructor() {
        this.socket_ = io.connect();
        this.chatStream = Observable.fromEvent(this.socket_, "chat");
        this.previousNames = Observable.fromEvent(this.socket_, "previous-names");
        this.userDisconnected = Observable.fromEvent(this.socket_, "user-disconnected");
        this.newUser = Observable.fromEvent(this.socket_, "new-user");
    };
    
    emitMessage(chat: ChatMessage) { this.socket_.emit("chat", chat); };
    emitName(name: string) { this.socket_.emit("login", name) };

    private socket_: SocketIOClient.Socket;
}