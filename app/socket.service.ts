import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Rx";
import {Event$Service} from "./event$.service";

type UserAction = { action: string; username: string; };
type ChatMessage = { username: string; message: string; direction: string;};

@Injectable()
export class SocketService {
    
    chat$: Observable<ChatMessage>;
    whisper$: Observable<ChatMessage>;
    userList$: Observable<UserAction>;

    constructor(private events_: Event$Service) {
        this.events_.create("socket-disconnect");
    };

    connect() {
        this.socket_ = io.connect("/chatroom", { reconnection: false });
        this.socket_.on("error", (err) => { console.log(err); });

        this.socket_.on("disconnect", () => { this.events_.emit("socket-disconnect"); });

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