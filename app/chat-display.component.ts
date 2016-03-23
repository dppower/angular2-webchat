import {Component, ChangeDetectionStrategy, OnInit, Input} from "angular2/core";
import {AsyncPipe, NgClass} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {AutoScroll} from "./auto-scroll.directive";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";
import {AuthService} from "./auth.service";
import {MessageFilterPipe} from "./message-filter.pipe";
import * as _ from "lodash";

type ChatMessage = { username: string, message: string, direction: string };
type ChatType = { username: string, message: string, direction: string, type: string };

@Component({
    selector: "chat-display",
    template: `
         <div class="chat-box col-xs-8 col-sm-9" autoScroll>
            <p *ngFor="#msg of messages | async | messageFilter:username:inSelectedTarget:inTargetFilter:inDirectionFilter" [ngClass]="msg.type">{{msg.message}}</p>
        </div>
       `,
    styles: [`.whisper {
            color: rosybrown;
        }`],
    directives: [AutoScroll, NgClass],
    pipes: [AsyncPipe, MessageFilterPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDisplay implements OnInit {

    username: string;
    @Input() inSelectedTarget: string;
    @Input() inTargetFilter: boolean;
    @Input() inDirectionFilter: boolean;

    messages: Observable<ChatType[]>;

    constructor(private events_: Event$Service, private socketService_: SocketService, private authService_: AuthService) {
        this.events_.create("auto-scroll");
    };

    ngOnInit() {
        this.username = this.authService_.username;

        let whispers: Observable<ChatType> = this.socketService_.whisper$
            .map<ChatType>(chat => {
                return { username: chat.username, message: "[" + chat.direction + ": " + chat.username + "]: " + chat.message, direction: chat.direction, type: "whisper" };
            });

        let chats: Observable<ChatType> = this.socketService_.chat$
            //.map<ChatType>(chat => _.assign<ChatMessage, {}, ChatType>(chat, { type: "chat" }))
            .map<ChatType>(chat => {
                return { username: chat.username, message: chat.username + ": " + chat.message, direction: chat.direction, type: "chat" };
            });

        this.messages = chats.merge(whispers)
            .map<ChatType[]>((chat: ChatType) => Array(chat))
            .scan<ChatType[]>((i, j) => i.concat(j));
        
        this.messages.subscribe(message => this.events_.emit("auto-scroll"));
    };
}