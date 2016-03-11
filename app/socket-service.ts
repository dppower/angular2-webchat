import {Injectable} from "angular2/core";
import {Observable, ReplaySubject, Subject} from "rxjs/Rx";
import {ChatMessage} from "./chat-message";

@Injectable()
export class SocketService {
    //get socketId() { return this.socket_.id; };

    chatStream: Observable<string>;
    //userList: Observable<{ name: string, socket: string }>;
    //userListrp: ReplaySubject<{ name: string, socket: string }>;
    //userLists: Subject<{ name: string, socket: string }>;
    //userDisconnected: Observable<string>;
    //newUser: Observable<{ name: string, socket: string }>;

    constructor() {
        
        
        ////this.userList = Observable.fromEvent(this.socket_, "user-list");
        //this.userListrp = new ReplaySubject<{ name: string, socket: string }>();
        //this.userList = new Observable(observer => {
        //    this.socket_.on("user-list", data => observer.next(data));
        //    this.socket_.on("list-completed", () => observer.complete());
        //});
        //this.userList.subscribe(this.userListrp);
        //this.userDisconnected = Observable.fromEvent(this.socket_, "user-disconnected");
        //this.newUser = Observable.fromEvent(this.socket_, "new-user");
    };

    connect() {
        this.socket_ = io.connect();
        this.chatStream = Observable.fromEvent(this.socket_, "chat");
    };

    disconnect() {
        this.socket_.disconnect();
    };
    
    emit(event: string, data: Object) { this.socket_.emit(event, data); };

    private socket_: SocketIOClient.Socket;
}