import {Component, ChangeDetectionStrategy, OnInit, Input} from "angular2/core";
import {AsyncPipe, NgClass} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {AutoScroll} from "./auto-scroll.directive";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";
import {MessageFilterPipe} from "./message-filter.pipe";
import * as _ from "lodash";

type ChatMessage = { username: string, message: string, direction: string, type: string };

@Component({
    selector: "chat-display",
    template: `
         <div class="chat-box col-xs-8 col-sm-9" autoScroll>
            <p *ngFor="#msg of messages | async | messageFilter:inSelectedTarget:inTargetFilter:inDirectionFilter" [ngClass]="msg.type">{{msg.message}}</p>
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

    @Input() inSelectedTarget: string;
    @Input() inTargetFilter: boolean;
    @Input() inDirectionFilter: boolean;

    messages: Observable<ChatMessage[]>;

    constructor(private events_: Event$Service, private socketService_: SocketService) {
        this.events_.create("auto-scroll");
    };

    ngOnInit() {
        let whispers: Observable<ChatMessage> = this.socketService_.whisper$
            .map<ChatMessage>(chat => {
                return { username: chat.username, message: "[" + chat.direction + ": " + chat.username + "]: " + chat.message, direction: chat.direction, type: chat.type };
            });

        let chats: Observable<ChatMessage> = this.socketService_.chat$
            //.map<ChatType>(chat => _.assign<ChatMessage, {}, ChatType>(chat, { type: "chat" }))
            .map<ChatMessage>(chat => {
                return { username: chat.username, message: chat.username + ": " + chat.message, direction: chat.direction, type: chat.type };
            });

        this.messages = chats.merge(whispers)
            .map<ChatMessage[]>((chat: ChatMessage) => Array(chat))
            .scan<ChatMessage[]>((i, j) => i.concat(j));
        
        this.messages.subscribe(message => this.events_.emit("auto-scroll", "scroll"));
    };
}