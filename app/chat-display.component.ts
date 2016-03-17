import {Component, ChangeDetectionStrategy, OnInit} from "angular2/core";
import {AsyncPipe, NgClass} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {AutoScroll} from "./auto-scroll.directive";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";

type ChatType = { message: string, type: string };

@Component({
    selector: "chat-display",
    template: `
         <div class="chat-box col-xs-8 col-sm-9" autoScroll>
            <p *ngFor="#msg of messages | async" [ngClass]="msg.type">{{msg.message}}</p>
        </div>
       `,
    styles: [`.whisper {
            color: rosybrown;
        }`],
    directives: [AutoScroll, NgClass],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDisplay implements OnInit {

    messages: Observable<ChatType[]>;

    constructor(private events_: Event$Service, private socketService_: SocketService) {
        this.events_.create("auto-scroll");
    };

    ngOnInit() {
        let whispers: Observable<ChatType> = this.socketService_.whisper$
            .map<ChatType>(chat => { return { message: "[" + chat.username + "]: " + chat.message, type: "whisper" } });

        let chats: Observable<ChatType> = this.socketService_.chat$
            .map<ChatType>(chat => { return { message: chat.username + ": " + chat.message, type: "chat" } });

        this.messages = chats.merge(whispers)
            .map<ChatType[]>((message: ChatType) => Array(message))
            .scan<ChatType[]>((i, j) => i.concat(j));
        
        this.messages.subscribe(message => this.events_.emit("auto-scroll", "scroll"));
    };
}