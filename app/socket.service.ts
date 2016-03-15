import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Rx";

interface UserAction { action: string; username: string; };
interface ChatMessage { username: string; message: string; };

@Injectable()
export class SocketService {
    
    chat$: Observable<ChatMessage>;
    whisper$: Observable<ChatMessage>;
    userList$: Observable<UserAction>;

    constructor() { };

    connect() {
        this.socket_ = io.connect("/chatroom");
        this.socket_.on("error", (err) => { console.log(err); });

        this.chat$ = Observable.fromEvent(this.socket_, "chat");
        this.whisper$ = Observable.fromEvent(this.socket_, "whisper");

        let userAction$ = new Observable<UserAction>(observer => {
            this.socket_.on("user-action", (action) => observer.next(action));
        });

        this.userList$ = new Observable<UserAction>(observer => {
            this.socket_.on("user-list", data => observer.next(data));
            this.socket_.on("list-completed", () => observer.complete());
        }).concat(userAction$);
    };

    disconnect() {
        this.socket_.disconnect();
    };
    
    emit(event: string, data: Object) { this.socket_.emit(event, data); };

    private socket_: SocketIOClient.Socket;
}