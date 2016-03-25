import {Component, ChangeDetectionStrategy, OnInit, Input, ViewChild, ChangeDetectorRef, AfterViewChecked} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {Observable} from "rxjs/Rx";
import {AutoScrollComponent} from "./auto-scroll.component";
import {ChatMessageComponent} from "./chat-message.component";
import {SocketService} from "./socket.service";
import {Event$Service} from "./event$.service";
import {AuthService} from "./auth.service";
import {MessageFilterPipe} from "./message-filter.pipe";

type ChatMessage = { username: string, message: string, direction: string };
type ChatType = { username: string, message: string, direction: string, type: string };

@Component({
    selector: "chat-display",
    template: `
    <auto-scroll-display>
        <chat-message *ngFor="#chat of chats | async | messageFilter:username:inSelectedTarget:inTargetFilter:inDirectionFilter" [message]="chat.message" [type]="chat.type"></chat-message>
    </auto-scroll-display>
    `,
    directives: [AutoScrollComponent, ChatMessageComponent],
    pipes: [AsyncPipe, MessageFilterPipe]
})
export class ChatDisplay implements OnInit {
    
    username: string;

    @Input() inSelectedTarget: string;
    @Input() inTargetFilter: boolean;
    @Input() inDirectionFilter: boolean;

    chats: Observable<ChatType[]>;

    constructor(private socketService_: SocketService, private authService_: AuthService) {
        this.username = this.authService_.username;
    };
    
    ngOnInit() {
        let whispers: Observable<ChatType> = this.socketService_.whisper$
            .map<ChatType>(chat => {
                let message = "[" + chat.direction + ": " + chat.username + "]: " + chat.message;
                return { username: chat.username, message, direction: chat.direction, type: "whisper" };
            });

        let shouts: Observable<ChatType> = this.socketService_.chat$
            .map<ChatType>(chat => {
                let message = chat.username + ": " + chat.message;
                return { username: chat.username, message, direction: chat.direction, type: "chat" };
            });

        this.chats = shouts.merge(whispers)
            .map<ChatType[]>((chat: ChatType) => Array(chat))
            .scan<ChatType[]>((i, j) => i.concat(j));
    };
}