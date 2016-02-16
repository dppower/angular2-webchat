import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Rx";
import {ChatMessage} from "./chat-message";

@Injectable()
export class SocketService {

    get socketId() { return this.socket_.id; }

    chatStream: Observable<ChatMessage>;

    constructor() {
        this.socket_ = io.connect();
        this.chatStream = Observable.fromEvent(this.socket_, "chat");
    };
    
    emitMessage(chat: ChatMessage) { this.socket_.emit("chat", chat); }

    private socket_: SocketIOClient.Socket;
}