import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Rx";
import {ChatMessage} from "./chat-message";

@Injectable()
export class SocketService {

    get socketId() { return this.socket_.id; }

    chatStream: Observable<ChatMessage>;
    previousNames: Observable<string[]>;

    constructor() {
        this.socket_ = io.connect();
        this.chatStream = Observable.fromEvent(this.socket_, "chat");
        this.previousNames = Observable.fromEvent(this.socket_, "previous-names");
    };
    
    emitMessage(chat: ChatMessage) { this.socket_.emit("chat", chat); }
    getPreviousNames() { this.socket_.emit("previousNames"); }

    private socket_: SocketIOClient.Socket;
}